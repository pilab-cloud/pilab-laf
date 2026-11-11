import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf } from "../i18n";
import { simpleTableEn } from "../messages/simple-table.en";
import { Pagination, type PaginationProps } from "./data";
import { Skeleton } from "./feedback";
import { Checkbox } from "./form";

type TableMessages = typeof simpleTableEn;

/** English defaults merged with any `components.simpleTable` override from the active locale. */
function useTableText(): TableMessages["table"] {
  const { t } = useLaf();
  const over = (t.components as Record<string, Partial<TableMessages> | undefined>).simpleTable;
  return React.useMemo(() => ({ ...simpleTableEn.table, ...over?.table }), [over]);
}

export type SortDirection = "asc" | "desc";
export interface SortState {
  id: string;
  direction: SortDirection;
}

export interface SimpleTableColumn<T> {
  id: string;
  header: React.ReactNode;
  /** Plain-text header used in the sort button's accessible name; defaults to `header` when it is a string. */
  headerText?: string;
  /** Cell renderer; defaults to `row[id]`. */
  cell?: (row: T, index: number) => React.ReactNode;
  align?: "start" | "center" | "end";
  /** Any CSS width (e.g. `8rem`, `20%`); keep it below the container on small screens. */
  width?: string | number;
  sortable?: boolean;
  /** Extra classes for the th and td. */
  className?: string;
  /** Renders the cell as the row header (`th scope="row"`). */
  rowHeader?: boolean;
}

export interface SimpleTableProps<T> {
  columns: SimpleTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  /** Controlled sort; `null` = unsorted. Sorting is the caller's job: reorder `rows` in `onSortChange`. */
  sort?: SortState | null;
  /** Cycles asc → desc → none on repeated activation. */
  onSortChange?: (sort: SortState | null) => void;
  /** Shows a checkbox column. Pass `selected` + `onSelectedChange` to control it. */
  selectable?: boolean;
  selected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  /** Accessible row name used in "Select …". */
  getRowLabel?: (row: T) => string;
  /** Trailing actions cell for each row (buttons, a menu trigger, …). */
  rowActions?: (row: T) => React.ReactNode;
  density?: "dense" | "comfortable";
  stickyHeader?: boolean;
  /** Max height of the scroll area (CSS length); needed for `stickyHeader` to have effect vertically. */
  maxHeight?: string;
  loading?: boolean;
  /** Skeleton rows while loading. Default 5. */
  loadingRows?: number;
  /** Shown when there are no rows. */
  empty?: React.ReactNode;
  caption?: React.ReactNode;
  /** Keeps the caption for screen readers only. */
  captionHidden?: boolean;
  /** Footer pagination, rendered with the kit's `Pagination`. */
  pagination?: PaginationProps;
  /** Accessible name for the table when there is no caption. */
  "aria-label"?: string;
  className?: string;
}

const alignClass = { start: "text-start", center: "text-center", end: "text-end" } as const;

function nextSort(current: SortState | null | undefined, id: string): SortState | null {
  if (current?.id !== id) return { id, direction: "asc" };
  return current.direction === "asc" ? { id, direction: "desc" } : null;
}

export function SimpleTable<T>({
  columns,
  rows,
  getRowId,
  sort,
  onSortChange,
  selectable,
  selected,
  onSelectedChange,
  getRowLabel,
  rowActions,
  density = "comfortable",
  stickyHeader,
  maxHeight,
  loading,
  loadingRows = 5,
  empty,
  caption,
  captionHidden,
  pagination,
  className,
  ...rest
}: SimpleTableProps<T>) {
  const text = useTableText();
  const [inner, setInner] = React.useState<string[]>([]);
  const ids = selected ?? inner;
  const setIds = (next: string[]) => {
    if (selected === undefined) setInner(next);
    onSelectedChange?.(next);
  };
  const rowIds = rows.map(getRowId);
  const chosen = rowIds.filter((id) => ids.includes(id)).length;
  const allRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = chosen > 0 && chosen < rowIds.length;
  });
  const toggleAll = () => setIds(chosen === rowIds.length ? ids.filter((id) => !rowIds.includes(id)) : [...new Set([...ids, ...rowIds])]);
  const toggleRow = (id: string) => setIds(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);

  const span = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);
  const pad = density === "dense" ? "[&_td]:px-3 [&_td]:py-1 [&_th]:px-3 [&_th]:py-1.5" : "";
  const thSticky = stickyHeader && "[&_th]:sticky [&_th]:top-0 [&_th]:z-10";

  return (
    <div className={cn("relative w-full min-w-0", className)}>
      <div className={cn("table-wrap relative overflow-x-auto", maxHeight && "overflow-y-auto")} style={maxHeight ? { maxHeight } : undefined}>
        <table className={cn("table", pad, thSticky)} aria-busy={loading || undefined} aria-label={rest["aria-label"]}>
          {caption && <caption className={cn("px-4 py-2 text-start text-sm text-muted", captionHidden && "sr-only")}>{caption}</caption>}
          <thead>
            <tr>
              {selectable && (
                <th scope="col" className="w-10">
                  <Checkbox ref={allRef} aria-label={text.selectAll} checked={rowIds.length > 0 && chosen === rowIds.length} disabled={rowIds.length === 0} onChange={toggleAll} />
                </th>
              )}
              {columns.map((c) => {
                const active = sort?.id === c.id ? sort : null;
                const name = c.headerText ?? (typeof c.header === "string" ? c.header : c.id);
                return (
                  <th
                    key={c.id}
                    scope="col"
                    aria-sort={c.sortable ? (active ? (active.direction === "asc" ? "ascending" : "descending") : "none") : undefined}
                    className={cn(alignClass[c.align ?? "start"], c.className)}
                    style={c.width !== undefined ? { width: c.width } : undefined}
                  >
                    {c.sortable ? (
                      <button
                        type="button"
                        aria-label={text.sortBy(name)}
                        onClick={() => onSortChange?.(nextSort(sort, c.id))}
                        className={cn("inline-flex items-center gap-1 border-0 bg-transparent p-0 font-[inherit] text-[length:inherit] tracking-[inherit] text-inherit uppercase outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50", c.align === "end" && "flex-row-reverse")}
                      >
                        {c.header}
                        {active ? active.direction === "asc" ? <ArrowUp className="size-3.5" aria-hidden /> : <ArrowDown className="size-3.5" aria-hidden /> : <ChevronsUpDown className="size-3.5 opacity-50" aria-hidden />}
                      </button>
                    ) : (
                      c.header
                    )}
                  </th>
                );
              })}
              {rowActions && (
                <th scope="col" className="w-px">
                  <span className="sr-only">{text.actions}</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: loadingRows }, (_, i) => (
                <tr key={i}>
                  {Array.from({ length: span }, (_, j) => (
                    <td key={j}>
                      <Skeleton className="w-full max-w-40" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={span} className="py-8 text-center text-muted">
                  {empty ?? text.empty}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => {
                const id = rowIds[i]!;
                const isSel = ids.includes(id);
                return (
                  <tr key={id} aria-selected={selectable ? isSel : undefined} className={cn(isSel && "[&_td]:bg-primary-light")}>
                    {selectable && (
                      <td className="w-10">
                        <Checkbox aria-label={text.selectRow(getRowLabel?.(row))} checked={isSel} onChange={() => toggleRow(id)} />
                      </td>
                    )}
                    {columns.map((c) => {
                      const content = c.cell ? c.cell(row, i) : ((row as Record<string, unknown>)[c.id] as React.ReactNode);
                      const cls = cn(alignClass[c.align ?? "start"], c.className);
                      return c.rowHeader ? (
                        <th key={c.id} scope="row" className={cn("border-b border-line bg-transparent px-4 py-3 text-sm font-medium tracking-normal text-fg normal-case", cls)}>
                          {content}
                        </th>
                      ) : (
                        <td key={c.id} className={cls}>
                          {content}
                        </td>
                      );
                    })}
                    {rowActions && <td className="cell-actions text-end whitespace-nowrap">{rowActions(row)}</td>}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {loading && (
        <span role="status" className="sr-only">
          {text.loading}
        </span>
      )}
      {pagination && (
        <div className="mt-3">
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  );
}
