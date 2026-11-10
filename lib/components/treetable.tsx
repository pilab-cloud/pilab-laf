import { ChevronDown, ChevronRight } from "lucide-react";
import * as React from "react";
import { useControllableState } from "../utils";
import { DataGrid, type DataGridProps, type GridColumn, type GridSort } from "./datagrid";

export interface TreeTableNode<T> {
  id: string;
  data: T;
  children?: TreeTableNode<T>[];
}

interface FlatNode<T> {
  node: TreeTableNode<T>;
  depth: number;
  setSize: number;
  posInSet: number;
  expandable: boolean;
  open: boolean;
}

export interface TreeTableProps<T>
  extends Omit<
    DataGridProps<T>,
    "rows" | "rowId" | "manual" | "renderExpanded" | "gridRole" | "getRowProps" | "onRowKeyDown" | "onRowActivate" | "rowActions" | "bulkActions" | "columns" | "filters" | "onFiltersChange" | "sort" | "onSortChange"
  > {
  nodes: TreeTableNode<T>[];
  columns: GridColumn<T>[];
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Column that carries the indent and toggle. Default: first column. */
  treeColumn?: string;
  /** Indent per level in px. */
  indent?: number;
  sort?: GridSort[];
  onSortChange?: (sort: GridSort[]) => void;
  onRowActivate?: (row: T) => void;
  rowActions?: DataGridProps<T>["rowActions"];
  bulkActions?: DataGridProps<T>["bulkActions"];
}

function compare(a: unknown, b: unknown) {
  if (a == null) return b == null ? 0 : 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true });
}

/** Data grid with expandable hierarchy (§4.30): `role="treegrid"`, sorting applies per sibling group. */
export function TreeTable<T>({
  nodes,
  columns,
  expanded,
  defaultExpanded,
  onExpandedChange,
  treeColumn,
  indent = 16,
  sort: sortProp,
  onSortChange,
  onRowActivate,
  rowActions,
  bulkActions,
  ...rest
}: TreeTableProps<T>) {
  const [open, setOpen] = useControllableState<string[]>({ value: expanded, defaultValue: defaultExpanded ?? [], onChange: onExpandedChange });
  const [sort, setSort] = useControllableState<GridSort[]>({ value: sortProp, defaultValue: [], onChange: onSortChange });
  const openSet = React.useMemo(() => new Set(open), [open]);
  const treeCol = treeColumn ?? columns[0]?.id;

  const getters = React.useMemo(() => new Map(columns.map((c) => [c.id, c.accessor ?? ((r: T) => (r as Record<string, unknown>)[c.id])])), [columns]);

  const flat = React.useMemo(() => {
    const out: FlatNode<T>[] = [];
    const cmp = (x: TreeTableNode<T>, y: TreeTableNode<T>) => {
      for (const s of sort) {
        const g = getters.get(s.id);
        if (!g) continue;
        const r = compare(g(x.data), g(y.data));
        if (r) return s.dir === "asc" ? r : -r;
      }
      return 0;
    };
    const walk = (list: TreeTableNode<T>[], depth: number) => {
      const sorted = sort.length ? [...list].sort(cmp) : list;
      sorted.forEach((node, i) => {
        const expandable = !!node.children?.length;
        const isOpen = expandable && openSet.has(node.id);
        out.push({ node, depth, setSize: sorted.length, posInSet: i + 1, expandable, open: isOpen });
        if (isOpen) walk(node.children!, depth + 1);
      });
    };
    walk(nodes, 1);
    return out;
  }, [nodes, openSet, sort, getters]);

  const toggle = React.useCallback((id: string) => setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])), [setOpen]);

  const cols = React.useMemo<GridColumn<FlatNode<T>>[]>(
    () =>
      columns.map((c) => {
        const base: GridColumn<FlatNode<T>> = { ...c, cell: (f) => c.cell(f.node.data), accessor: (f) => getters.get(c.id)!(f.node.data), filter: undefined };
        if (c.id !== treeCol) return base;
        return {
          ...base,
          cell: (f) => (
            <span className="flex min-w-0 items-center gap-1" style={{ paddingInlineStart: (f.depth - 1) * indent }}>
              {f.expandable ? (
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={f.open ? "Collapse" : "Expand"}
                  aria-expanded={f.open}
                  className="inline-flex size-4 shrink-0 items-center justify-center text-muted hover:text-fg"
                  onClick={() => toggle(f.node.id)}
                >
                  {f.open ? <ChevronDown className="size-4" aria-hidden /> : <ChevronRight className="size-4" aria-hidden />}
                </button>
              ) : (
                <span className="inline-block size-4 shrink-0" aria-hidden />
              )}
              <span className="truncate">{c.cell(f.node.data)}</span>
            </span>
          ),
        };
      }),
    [columns, treeCol, indent, getters, toggle],
  );

  return (
    <DataGrid<FlatNode<T>>
      {...(rest as Omit<DataGridProps<FlatNode<T>>, "columns" | "rows" | "rowId">)}
      gridRole="treegrid"
      manual
      columns={cols}
      rows={flat}
      rowId={(f) => f.node.id}
      sort={sort}
      onSortChange={setSort}
      onRowActivate={onRowActivate && ((f) => onRowActivate(f.node.data))}
      rowActions={rowActions && ((f) => rowActions(f.node.data))}
      bulkActions={bulkActions}
      getRowProps={(f) => ({
        "aria-level": f.depth,
        "aria-setsize": f.setSize,
        "aria-posinset": f.posInSet,
        "aria-expanded": f.expandable ? f.open : undefined,
      })}
      onRowKeyDown={(e, f) => {
        if (e.key === "ArrowRight" && f.expandable && !f.open) {
          e.preventDefault();
          toggle(f.node.id);
        } else if (e.key === "ArrowLeft" && f.open) {
          e.preventDefault();
          toggle(f.node.id);
        }
      }}
    />
  );
}
