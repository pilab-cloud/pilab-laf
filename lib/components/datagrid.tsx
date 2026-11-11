import { type LegacyColumnDef as ColumnDef, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useLegacyTable as useReactTable } from "@tanstack/react-table/legacy";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, ChevronRight, Columns3, Loader2, MoreHorizontal, RefreshCw, Rows3, Search, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { portalEn } from "../messages/portal.en";
import { useControllableState } from "../utils";
import { Button } from "./button";
import { Pagination } from "./data";
import { EmptyState } from "./display";
import { Skeleton } from "./feedback";
import { Select } from "./form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Popover, PopoverContent, PopoverTrigger } from "./overlay";

/* ── Types ── */
export interface GridSort {
  id: string;
  dir: "asc" | "desc";
}

export interface GridFilter {
  id: string;
  value: unknown;
}

export type GridFilterRenderer = (props: { value: unknown; onChange: (value: unknown) => void; label: string }) => React.ReactNode;

export interface GridColumn<T> {
  id: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  accessor?: (row: T) => unknown;
  sortable?: boolean;
  filter?: "text" | "select" | "range" | GridFilterRenderer;
  /** Options of a `select` filter; needed in `manual` mode, where the loaded page is not the whole data set. */
  filterOptions?: string[];
  numeric?: boolean;
  width?: number;
  minWidth?: number;
  hideable?: boolean;
  pin?: "start";
  /** Let rich cell content (chips, badges) wrap onto several lines; the row grows instead of clipping. */
  wrap?: boolean;
  /** Upper bound for double-click auto-fit. Default 640. */
  maxWidth?: number;
}

/** Same shape idea as the shared menu model (U4); kept local until that lands. */
export interface GridMenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  separatorBefore?: boolean;
  onSelect: () => void;
}

export type GridDensity = "compact" | "default";

export interface GridLabels {
  selectAll?: string;
  selectRow?: string;
  actions?: string;
  expand?: string;
  collapse?: string;
  resize?: string;
  columns?: string;
  density?: string;
  compact?: string;
  comfortable?: string;
  search?: string;
  clearSelection?: string;
  selectedCount?: (n: number) => string;
  empty?: string;
  filter?: string;
  retry?: string;
  rowsPerPage?: string;
  loadingData?: string;
  refreshing?: string;
  loadFailed?: string;
  results?: (from: number, to: number, total: number) => string;
  resultsUnknown?: (from: number, to: number) => string;
  page?: (page: number) => string;
}

const defaultLabels: Required<Pick<GridLabels, "actions" | "expand" | "collapse" | "resize" | "columns" | "density" | "compact" | "comfortable" | "search" | "clearSelection" | "selectedCount" | "empty" | "filter">> = {
  actions: "Row actions",
  expand: "Expand row",
  collapse: "Collapse row",
  resize: "Resize column",
  columns: "Columns",
  density: "Density",
  compact: "Compact",
  comfortable: "Default",
  search: "Search",
  clearSelection: "Clear selection",
  selectedCount: (n) => `${n} selected`,
  empty: "Nothing here",
  filter: "Filter",
};

/** Page state of a server-driven grid; renders the footer (summary, page size, previous/next). */
export interface GridPagination {
  /** 1-based. */
  page: number;
  pageSize: number;
  /** Total rows on the server; leave out for cursor/unknown-total APIs. */
  total?: number;
  pageSizes?: number[];
  /** With an unknown `total`: whether a next page exists. */
  hasNext?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface DataGridProps<T> {
  columns: GridColumn<T>[];
  rows: T[];
  rowId: (row: T) => string;
  label: string;
  sort?: GridSort[];
  onSortChange?: (sort: GridSort[]) => void;
  selected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  /** Show the checkbox column. Implied by `selected`, `onSelectedChange` and `bulkActions`. */
  selectable?: boolean;
  columnVisibility?: Record<string, boolean>;
  onColumnVisibilityChange?: (v: Record<string, boolean>) => void;
  columnOrder?: string[];
  onColumnOrderChange?: (order: string[]) => void;
  columnSizing?: Record<string, number>;
  onColumnSizingChange?: (s: Record<string, number>) => void;
  filters?: GridFilter[];
  onFiltersChange?: (f: GridFilter[]) => void;
  search?: string;
  onSearchChange?: (q: string) => void;
  /**
   * Server-side: the grid only emits sort/filter/search state and renders `rows` as given. Rows stay visible
   * (dimmed, `aria-busy`) while `loading` and after an `error`, so a refetch never blanks the table.
   */
  manual?: boolean;
  /** Total rows on the server (`aria-rowcount`); defaults to `pagination.total`, else unknown (-1). */
  rowCount?: number;
  pagination?: GridPagination;
  /** Shows a retry button in the error row. */
  onRetry?: () => void;
  /** Default: on above 200 rows. */
  virtual?: boolean | { rowHeight: number; overscan?: number };
  density?: GridDensity;
  onDensityChange?: (d: GridDensity) => void;
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  /** Scroll viewport height (px or CSS length). Default 480 when sticky/virtual. */
  height?: number | string;
  onRowActivate?: (row: T) => void;
  rowActions?: (row: T) => GridMenuItem[];
  renderExpanded?: (row: T) => React.ReactNode;
  bulkActions?: (ids: string[]) => React.ReactNode;
  toolbar?: React.ReactNode;
  loading?: boolean;
  error?: React.ReactNode;
  empty?: React.ReactNode;
  /** Persists visibility/order/sizing/density in localStorage under this key. */
  viewKey?: string;
  labels?: GridLabels;
  className?: string;
  /** @internal used by TreeTable */
  gridRole?: "grid" | "treegrid";
  /** @internal */
  getRowProps?: (row: T) => React.HTMLAttributes<HTMLDivElement>;
  /** @internal called before default key handling; call preventDefault() to take over */
  onRowKeyDown?: (e: React.KeyboardEvent, row: T) => void;
}

/* ── Helpers ── */

interface PersistedView {
  columnVisibility?: Record<string, boolean>;
  columnOrder?: string[];
  columnSizing?: Record<string, number>;
  density?: GridDensity;
}
const storageKey = (k: string) => `laf:datagrid:${k}`;
function readView(viewKey?: string): PersistedView {
  if (!viewKey || typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(storageKey(viewKey)) ?? "{}") as PersistedView;
  } catch {
    return {};
  }
}

const portalDefaults = { portal: portalEn };

const SELECT_W = 40;
const ACTION_W = 40;
const EXPAND_W = 32;
const interactive = "button,a,input,select,textarea,[role=button],[role=menuitem]";

const textOf = (n: React.ReactNode, fallback: string) => (typeof n === "string" || typeof n === "number" ? String(n) : fallback);

interface GridCtx {
  columns: { id: string; label: string; visible: boolean; hideable: boolean }[];
  setVisible: (id: string, v: boolean) => void;
  moveColumn: (id: string, delta: number) => void;
  density: GridDensity;
  setDensity: (d: GridDensity) => void;
  search: string;
  setSearch: (q: string) => void;
  labels: typeof defaultLabels;
}
const GridContext = React.createContext<GridCtx | null>(null);
function useGrid() {
  const c = React.useContext(GridContext);
  if (!c) throw new Error("Grid toolbar components must be rendered inside <DataGrid toolbar={…}>");
  return c;
}

/* ── Toolbar slots ── */
export function GridSearch({ className, placeholder }: { className?: string; placeholder?: string }) {
  const g = useGrid();
  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <Search className="pointer-events-none absolute start-2 size-3.5 text-subtle" aria-hidden />
      <input
        type="search"
        aria-label={g.labels.search}
        placeholder={placeholder ?? g.labels.search}
        value={g.search}
        onChange={(e) => g.setSearch(e.target.value)}
        className="h-8 w-56 border border-line bg-input ps-7 pe-2 text-sm text-fg"
      />
    </label>
  );
}

export function GridDensityToggle() {
  const g = useGrid();
  return (
    <div role="group" aria-label={g.labels.density} className="inline-flex border border-line">
      {(["compact", "default"] as const).map((d) => (
        <button
          key={d}
          type="button"
          aria-pressed={g.density === d}
          onClick={() => g.setDensity(d)}
          className={cn("inline-flex h-8 items-center gap-1 px-2 text-xs", g.density === d ? "bg-primary/15 text-fg" : "text-muted hover:bg-surface-hover")}
        >
          <Rows3 className="size-3.5" aria-hidden />
          {d === "compact" ? g.labels.compact : g.labels.comfortable}
        </button>
      ))}
    </div>
  );
}

export function GridColumnsMenu() {
  const g = useGrid();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="inline-flex h-8 items-center gap-1 border border-line px-2 text-xs text-muted hover:bg-surface-hover">
          <Columns3 className="size-3.5" aria-hidden />
          {g.labels.columns}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-60 p-2">
        <ul className="flex flex-col gap-0.5">
          {g.columns.map((c, i) => (
            <li key={c.id} className="flex items-center gap-2 px-1 py-0.5 text-sm">
              <label className="flex flex-1 items-center gap-2">
                <input type="checkbox" checked={c.visible} disabled={!c.hideable} onChange={(e) => g.setVisible(c.id, e.target.checked)} />
                <span className="truncate">{c.label}</span>
              </label>
              <button type="button" aria-label={`Move ${c.label} up`} disabled={i === 0} onClick={() => g.moveColumn(c.id, -1)} className="text-muted disabled:opacity-30">
                <ArrowUp className="size-3" aria-hidden />
              </button>
              <button type="button" aria-label={`Move ${c.label} down`} disabled={i === g.columns.length - 1} onClick={() => g.moveColumn(c.id, 1)} className="text-muted disabled:opacity-30">
                <ArrowDown className="size-3" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

/* ── Filter cell ── */
function FilterCell({ column, value, onChange, rows, label }: { column: GridColumn<any>; value: unknown; onChange: (v: unknown) => void; rows: unknown[]; label: string }) {
  const f = column.filter!;
  const name = `${label}: ${textOf(column.header, column.id)}`;
  const base = "h-6 w-full min-w-0 border border-line bg-input px-1 text-xs font-normal normal-case text-fg";
  if (typeof f === "function") return <>{f({ value, onChange, label: name })}</>;
  if (f === "select") {
    const get = column.accessor ?? ((r: any) => r[column.id]);
    const opts = column.filterOptions ?? Array.from(new Set(rows.slice(0, 5000).map((r) => String(get(r) ?? "")))).slice(0, 100).sort();
    return (
      <select aria-label={name} className={base} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value || undefined)}>
        <option value="" />
        {opts.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    );
  }
  if (f === "range") {
    const [min, max] = (value as [number | undefined, number | undefined] | undefined) ?? [undefined, undefined];
    const set = (a: number | undefined, b: number | undefined) => onChange(a === undefined && b === undefined ? undefined : [a, b]);
    const num = (s: string) => (s === "" ? undefined : Number(s));
    return (
      <span className="flex gap-1">
        <input type="number" aria-label={`${name} min`} className={base} value={min ?? ""} onChange={(e) => set(num(e.target.value), max)} />
        <input type="number" aria-label={`${name} max`} className={base} value={max ?? ""} onChange={(e) => set(min, num(e.target.value))} />
      </span>
    );
  }
  return <input type="search" aria-label={name} className={base} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value || undefined)} />;
}

const rangeFilter = (row: any, id: string, value: [number | undefined, number | undefined]) => {
  const v = Number(row.getValue(id));
  const [min, max] = value ?? [];
  return (min === undefined || v >= min) && (max === undefined || v <= max);
};
rangeFilter.autoRemove = (v: unknown) => !v;

/* ── DataGrid ── */
export function DataGrid<T>(props: DataGridProps<T>) {
  const {
    columns,
    rows,
    rowId,
    label,
    manual,
    rowCount,
    virtual,
    stickyHeader = true,
    stickyFirstColumn,
    height,
    onRowActivate,
    rowActions,
    renderExpanded,
    bulkActions,
    toolbar,
    loading,
    error,
    empty,
    pagination: pg,
    onRetry,
    viewKey,
    className,
    gridRole = "grid",
    getRowProps,
    onRowKeyDown,
  } = props;
  const { t: laf } = useLafDefaults(portalDefaults);
  const L = { ...defaultLabels, ...props.labels };
  const SG = { ...laf.components.portal.serverGrid, ...props.labels };
  const selectAllLabel = props.labels?.selectAll ?? laf.selectAllRows;
  const selectRowLabel = props.labels?.selectRow ?? laf.selectRow;
  const uid = React.useId();
  const persisted = React.useMemo(() => readView(viewKey), [viewKey]);

  const [sort, setSort] = useControllableState<GridSort[]>({ value: props.sort, defaultValue: [], onChange: props.onSortChange });
  const [selected, setSelected] = useControllableState<string[]>({ value: props.selected, defaultValue: [], onChange: props.onSelectedChange });
  const [visibility, setVisibility] = useControllableState<Record<string, boolean>>({
    value: props.columnVisibility,
    defaultValue: persisted.columnVisibility ?? {},
    onChange: props.onColumnVisibilityChange,
  });
  const [order, setOrder] = useControllableState<string[]>({ value: props.columnOrder, defaultValue: persisted.columnOrder ?? [], onChange: props.onColumnOrderChange });
  const [sizing, setSizing] = useControllableState<Record<string, number>>({ value: props.columnSizing, defaultValue: persisted.columnSizing ?? {}, onChange: props.onColumnSizingChange });
  const [filters, setFilters] = useControllableState<GridFilter[]>({ value: props.filters, defaultValue: [], onChange: props.onFiltersChange });
  const [search, setSearch] = useControllableState<string>({ value: props.search, defaultValue: "", onChange: props.onSearchChange });
  const [density, setDensity] = useControllableState<GridDensity>({ value: props.density, defaultValue: persisted.density ?? "default", onChange: props.onDensityChange });
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(() => new Set());

  React.useEffect(() => {
    if (!viewKey || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(storageKey(viewKey), JSON.stringify({ columnVisibility: visibility, columnOrder: order, columnSizing: sizing, density } satisfies PersistedView));
    } catch {
      /* storage unavailable */
    }
  }, [viewKey, visibility, order, sizing, density]);

  const selectable = props.selectable ?? (props.selected !== undefined || !!props.onSelectedChange || !!bulkActions);
  const selectedSet = React.useMemo(() => new Set(selected), [selected]);

  const colById = React.useMemo(() => new Map(columns.map((c) => [c.id, c])), [columns]);
  const defs = React.useMemo<ColumnDef<any>[]>(
    () =>
      columns.map((c) => ({
        id: c.id,
        accessorFn: c.accessor ?? ((r: T) => (r as Record<string, unknown>)[c.id]),
        header: () => c.header,
        enableSorting: !!c.sortable,
        enableHiding: c.hideable !== false,
        size: c.width ?? 160,
        minSize: c.minWidth ?? 60,
        filterFn: c.filter === "range" ? (rangeFilter as never) : c.filter === "select" ? "equalsString" : "includesString",
      })),
    [columns],
  );

  type Updater<V> = V | ((prev: V) => V);
  const wrap = <V,>(get: () => V, set: (v: V) => void) => (u: Updater<V>) => set(typeof u === "function" ? (u as (p: V) => V)(get()) : u);
  const sorting = React.useMemo(() => sort.map((s) => ({ id: s.id, desc: s.dir === "desc" })), [sort]);
  const columnFilters = filters;

  const table = useReactTable<any>({
    data: rows,
    columns: defs,
    getRowId: rowId,
    state: { sorting, columnVisibility: visibility, columnOrder: order, columnSizing: sizing, columnFilters, globalFilter: search },
    onColumnVisibilityChange: wrap(() => visibility, setVisibility),
    onColumnOrderChange: wrap(() => order, setOrder),
    onColumnSizingChange: wrap(() => sizing, setSizing),
    columnResizeMode: "onChange",
    manualSorting: manual,
    manualFiltering: manual,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manual ? undefined : getSortedRowModel(),
    getFilteredRowModel: manual ? undefined : getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  const modelRows = table.getRowModel().rows;
  const n = modelRows.length;
  const totalRows = rowCount ?? pg?.total;
  const rowOffset = pg ? (pg.page - 1) * pg.pageSize : 0;
  const skeleton = !!loading && (!manual || n === 0);
  const refreshing = !!loading && !!manual && n > 0;
  const showRows = manual ? !skeleton : !loading && !error;
  const leaf = table.getVisibleLeafColumns();
  const allLeafIds = table.getAllLeafColumns().map((c) => c.id);

  /* sticky offsets */
  const leading = (selectable ? SELECT_W : 0) + (renderExpanded ? EXPAND_W : 0);
  const pinnedLeft = new Map<string, number>();
  {
    let off = leading;
    leaf.forEach((c, i) => {
      const spec = colById.get(c.id);
      if (spec?.pin === "start" || (stickyFirstColumn && i === 0)) {
        pinnedLeft.set(c.id, off);
        off += c.getSize();
      } else off = Number.POSITIVE_INFINITY; // only a contiguous leading run can stick
    });
  }
  const template = [selectable && `${SELECT_W}px`, renderExpanded && `${EXPAND_W}px`, ...leaf.map((c) => `${c.getSize()}px`), rowActions && `minmax(${ACTION_W}px, 1fr)`].filter(Boolean).join(" ");
  const totalWidth = leading + leaf.reduce((a, c) => a + c.getSize(), 0) + (rowActions ? ACTION_W : 0);
  const colCount = leaf.length + (selectable ? 1 : 0) + (renderExpanded ? 1 : 0) + (rowActions ? 1 : 0);

  /* virtualization */
  const rowH = typeof virtual === "object" ? virtual.rowHeight : density === "compact" ? 28 : 36;
  const overscan = typeof virtual === "object" ? (virtual.overscan ?? 8) : 8;
  const virtualOn = virtual === undefined ? n > 200 : virtual !== false;
  const viewportH = height ?? 480;
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const fallbackH = typeof viewportH === "number" ? viewportH : 480;
  const estimate = React.useCallback((i: number) => rowH + (modelRows[i] && expandedIds.has(modelRows[i].id) ? 120 : 0), [rowH, modelRows, expandedIds]);
  const virtualizer = useVirtualizer({
    count: virtualOn ? n : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: estimate,
    overscan,
    scrollMargin: rowH,
    scrollPaddingStart: rowH,
    getItemKey: (i) => modelRows[i]?.id ?? i,
    observeElementRect: (inst, cb) => {
      const el = inst.scrollElement;
      if (!el) return;
      const emit = () => cb({ width: el.clientWidth || 800, height: el.clientHeight || fallbackH });
      emit();
      if (typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver(emit);
      ro.observe(el);
      return () => ro.disconnect();
    },
    measureElement: (el) => {
      const h = el.getBoundingClientRect().height;
      return h > 0 ? h : estimate(Number((el as HTMLElement).dataset.index ?? 0));
    },
  });

  /* active row / keyboard */
  const [active, setActive] = React.useState(-1);
  const anchor = React.useRef(0);
  const [menu, setMenu] = React.useState<{ id: string; x: number; y: number } | null>(null);
  const activeIdx = Math.min(active, n - 1);

  const reveal = (i: number) => {
    if (virtualOn) virtualizer.scrollToIndex(i, { align: "auto" });
    else (scrollRef.current?.querySelector(`[data-row-index="${i}"]`) as HTMLElement | null)?.scrollIntoView?.({ block: "nearest" });
  };

  const ids = React.useMemo(() => modelRows.map((r) => r.id), [modelRows]);
  const select = (i: number, mods: { shift?: boolean; ctrl?: boolean }, checkbox = false) => {
    const id = ids[i];
    if (id === undefined) return;
    if (mods.shift) {
      const [a, b] = [Math.min(anchor.current, i), Math.max(anchor.current, i)];
      const range = ids.slice(a, b + 1);
      setSelected(mods.ctrl || checkbox ? Array.from(new Set([...selected, ...range])) : range);
      return;
    }
    anchor.current = i;
    if (mods.ctrl || checkbox) setSelected(selectedSet.has(id) ? selected.filter((s) => s !== id) : [...selected, id]);
    else setSelected([id]);
  };

  const toggleExpanded = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const openMenuFor = (i: number, el?: Element | null) => {
    const r = (el ?? scrollRef.current?.querySelector(`[data-row-index="${i}"]`))?.getBoundingClientRect();
    setMenu({ id: ids[i]!, x: r?.left ?? 0, y: r?.bottom ?? 0 });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || n === 0) return;
    const cur = activeIdx < 0 ? 0 : activeIdx;
    const original = modelRows[cur]?.original;
    if (original !== undefined) {
      onRowKeyDown?.(e, original);
      if (e.defaultPrevented) return;
    }
    const page = Math.max(1, Math.floor((scrollRef.current?.clientHeight || fallbackH) / rowH) - 1);
    let next = cur;
    switch (e.key) {
      case "ArrowDown": next = Math.min(n - 1, activeIdx < 0 ? 0 : cur + 1); break;
      case "ArrowUp": next = Math.max(0, cur - 1); break;
      case "PageDown": next = Math.min(n - 1, cur + page); break;
      case "PageUp": next = Math.max(0, cur - page); break;
      case "Home": next = 0; break;
      case "End": next = n - 1; break;
      case " ":
        if (selectable) {
          e.preventDefault();
          select(cur, { ctrl: true });
        }
        return;
      case "Enter":
        if (original !== undefined && onRowActivate) {
          e.preventDefault();
          onRowActivate(original);
        }
        return;
      case "ArrowRight":
      case "ArrowLeft": {
        const id = ids[cur];
        if (renderExpanded && id !== undefined && expandedIds.has(id) === (e.key === "ArrowLeft")) {
          e.preventDefault();
          toggleExpanded(id);
        }
        return;
      }
      case "a":
      case "A":
        if ((e.ctrlKey || e.metaKey) && selectable) {
          e.preventDefault();
          setSelected(manual ? Array.from(new Set([...selected, ...ids])) : ids);
        }
        return;
      case "Escape":
        if (selected.length) setSelected([]);
        return;
      case "F10":
      case "ContextMenu":
        if (rowActions && (e.key === "ContextMenu" || e.shiftKey)) {
          e.preventDefault();
          openMenuFor(cur);
        }
        return;
      default:
        return;
    }
    e.preventDefault();
    setActive(next);
    if (e.shiftKey && selectable) select(next, { shift: true });
    else if (!e.ctrlKey) anchor.current = next;
    reveal(next);
  };

  /* header interactions */
  const cycleSort = (id: string, multi: boolean) => {
    const cur = sort.find((s) => s.id === id);
    if (!multi) setSort(!cur ? [{ id, dir: "asc" }] : cur.dir === "asc" ? [{ id, dir: "desc" }] : []);
    else if (!cur) setSort([...sort, { id, dir: "asc" }]);
    else if (cur.dir === "asc") setSort(sort.map((s) => (s.id === id ? { id, dir: "desc" } : s)));
    else setSort(sort.filter((s) => s.id !== id));
  };
  const moveColumn = (id: string, delta: number) => {
    const base = order.length ? [...order, ...allLeafIds.filter((x) => !order.includes(x))] : [...allLeafIds];
    const from = base.indexOf(id);
    const to = Math.max(0, Math.min(base.length - 1, from + delta));
    if (from < 0 || from === to) return;
    base.splice(to, 0, base.splice(from, 1)[0]!);
    setOrder(base);
  };
  const dropColumn = (id: string, target: string) => {
    const base = order.length ? [...order, ...allLeafIds.filter((x) => !order.includes(x))] : [...allLeafIds];
    const from = base.indexOf(id);
    const to = base.indexOf(target);
    if (from < 0 || to < 0 || from === to) return;
    base.splice(to, 0, base.splice(from, 1)[0]!);
    setOrder(base);
  };
  const dragId = React.useRef<string | null>(null);
  const setFilter = (id: string, value: unknown) => setFilters([...filters.filter((f) => f.id !== id), ...(value === undefined || value === "" ? [] : [{ id, value }])]);
  const hasFilters = columns.some((c) => c.filter);

  const ctx: GridCtx = {
    columns: (order.length ? [...order, ...allLeafIds.filter((x) => !order.includes(x))] : allLeafIds)
      .filter((id) => colById.has(id))
      .map((id) => ({ id, label: textOf(colById.get(id)!.header, id), visible: visibility[id] !== false, hideable: colById.get(id)!.hideable !== false })),
    setVisible: (id, v) => setVisibility({ ...visibility, [id]: v }),
    moveColumn,
    density,
    setDensity,
    search,
    setSearch,
    labels: L,
  };

  const anyWrap = leaf.some((c) => colById.get(c.id)?.wrap);
  /** Fit a column to its widest rendered cell (header included), without wrapping; capped by `maxWidth`. */
  const autoFit = (id: string) => {
    const root = scrollRef.current;
    const spec = colById.get(id);
    if (!root || !spec) return;
    let w = 0;
    root.querySelectorAll<HTMLElement>(`[data-col="${CSS.escape(id)}"]`).forEach((cell) => {
      const inner = cell.querySelector<HTMLElement>("[data-cell]") ?? (cell.firstElementChild as HTMLElement | null);
      if (!inner) return;
      const prev = inner.style.cssText;
      inner.style.flexWrap = "nowrap";
      inner.style.whiteSpace = "nowrap";
      inner.style.textOverflow = "clip";
      inner.style.width = "max-content";
      inner.style.maxWidth = "none";
      inner.style.flexShrink = "0";
      w = Math.max(w, inner.getBoundingClientRect().width, inner.scrollWidth);
      inner.style.cssText = prev;
    });
    if (!w) return;
    const next = Math.min(spec.maxWidth ?? 640, Math.max(spec.minWidth ?? 60, Math.ceil(w) + 28));
    setSizing({ ...sizing, [id]: next });
  };

  const cellBase = "flex min-w-0 items-center overflow-hidden px-3 text-sm";
  const stickyCell = "sticky z-[1] bg-surface";
  const renderRow = (index: number, style?: React.CSSProperties, measure?: (el: HTMLElement | null) => void) => {
    const r = modelRows[index];
    if (!r) return null;
    const row = r.original;
    const isSel = selectedSet.has(r.id);
    const isExp = expandedIds.has(r.id);
    const extra = getRowProps?.(row);
    return (
      <div key={r.id} role="none" data-index={index} ref={measure} style={style} className={cn(virtualOn && "absolute inset-x-0 top-0")}>
        <div
          {...extra}
          id={`${uid}-r${index}`}
          role="row"
          data-row-index={index}
          aria-rowindex={rowOffset + index + 2}
          aria-selected={selectable ? isSel : undefined}
          style={{ display: "grid", gridTemplateColumns: template, ...(anyWrap ? { minHeight: rowH } : { height: rowH }), minWidth: totalWidth }}
          className={cn(
            "border-b border-line",
            isSel ? "bg-primary/15" : "hover:bg-surface-hover",
            index === activeIdx && "outline outline-2 -outline-offset-2 outline-primary",
            extra?.className,
          )}
          onClick={(e) => {
            setActive(index);
            if ((e.target as HTMLElement).closest(interactive)) return;
            if (selectable) select(index, { shift: e.shiftKey, ctrl: e.ctrlKey || e.metaKey });
          }}
          onDoubleClick={(e) => {
            if (onRowActivate && !(e.target as HTMLElement).closest(interactive)) onRowActivate(row);
          }}
          onContextMenu={
            rowActions
              ? (e) => {
                  e.preventDefault();
                  setActive(index);
                  setMenu({ id: r.id, x: e.clientX, y: e.clientY });
                }
              : undefined
          }
        >
          {selectable && (
            <div role="gridcell" className={cn(cellBase, "justify-center px-0", stickyCell)} style={{ insetInlineStart: 0 }}>
              <input
                type="checkbox"
                aria-label={selectRowLabel}
                checked={isSel}
                onChange={() => undefined}
                onClick={(e) => select(index, { shift: e.shiftKey }, true)}
              />
            </div>
          )}
          {renderExpanded && (
            <div role="gridcell" className={cn(cellBase, "justify-center px-0", stickyCell)} style={{ insetInlineStart: selectable ? SELECT_W : 0 }}>
              <button type="button" aria-label={isExp ? L.collapse : L.expand} aria-expanded={isExp} onClick={() => toggleExpanded(r.id)} className="text-muted hover:text-fg">
                {isExp ? <ChevronDown className="size-4" aria-hidden /> : <ChevronRight className="size-4" aria-hidden />}
              </button>
            </div>
          )}
          {leaf.map((c) => {
            const spec = colById.get(c.id)!;
            const left = pinnedLeft.get(c.id);
            return (
              <div
                key={c.id}
                role="gridcell"
                data-col={c.id}
                className={cn(cellBase, spec.numeric && "justify-end font-mono", left !== undefined && stickyCell)}
                style={left !== undefined && Number.isFinite(left) ? { insetInlineStart: left } : undefined}
              >
                {spec.wrap ? (
                  <div data-cell className="flex min-w-0 flex-wrap items-center gap-1 py-1">
                    {spec.cell(row)}
                  </div>
                ) : (
                  <span data-cell className="truncate">
                    {spec.cell(row)}
                  </span>
                )}
              </div>
            );
          })}
          {rowActions && (
            <div role="gridcell" className={cn(cellBase, "justify-end px-1")}>
              <button
                type="button"
                aria-label={L.actions}
                aria-haspopup="menu"
                className="inline-flex size-7 items-center justify-center text-muted hover:text-fg"
                onClick={(e) => {
                  const b = e.currentTarget.getBoundingClientRect();
                  setMenu({ id: r.id, x: b.left, y: b.bottom });
                }}
              >
                <MoreHorizontal className="size-4" aria-hidden />
              </button>
            </div>
          )}
        </div>
        {renderExpanded && isExp && (
          <div role="row" style={{ minWidth: totalWidth }} className="border-b border-line bg-muted-bg">
            <div role="gridcell" aria-colspan={colCount} className="p-3 text-sm">
              {renderExpanded(row)}
            </div>
          </div>
        )}
      </div>
    );
  };

  const menuRow = menu ? modelRows.find((r) => r.id === menu.id)?.original : undefined;
  const menuItems = menuRow !== undefined && rowActions ? rowActions(menuRow) : [];
  const showEmpty = !loading && !error && n === 0;
  const skeletonRows = pg ? Math.min(pg.pageSize, 10) : 4;
  const summary = loading
    ? SG.loadingData
    : error
      ? SG.loadFailed
      : totalRows !== undefined
        ? SG.results(n === 0 ? 0 : rowOffset + 1, rowOffset + n, totalRows)
        : SG.resultsUnknown(n === 0 ? 0 : rowOffset + 1, rowOffset + n);
  const scrollStyle: React.CSSProperties = { height: virtualOn || stickyHeader ? viewportH : undefined, maxHeight: virtualOn || stickyHeader ? undefined : viewportH };

  return (
    <GridContext.Provider value={ctx}>
      <div className={cn("flex flex-col", className)}>
        {toolbar && <div className="mb-2 flex flex-wrap items-center gap-2">{toolbar}</div>}
        <div className="relative">
        <div
          ref={scrollRef}
          role={gridRole}
          aria-label={label}
          aria-rowcount={manual && pg && totalRows === undefined ? -1 : (manual && totalRows !== undefined ? totalRows : n) + 1}
          aria-colcount={colCount}
          aria-multiselectable={selectable || undefined}
          aria-busy={loading || undefined}
          aria-activedescendant={activeIdx >= 0 && showRows && n > 0 ? `${uid}-r${activeIdx}` : undefined}
          tabIndex={0}
          style={scrollStyle}
          className={cn("relative overflow-auto border border-line bg-surface text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary", refreshing && "opacity-60")}
          onKeyDown={onKeyDown}
          onFocus={(e) => {
            if (e.target === e.currentTarget && activeIdx < 0 && n > 0) setActive(0);
          }}
        >
          <div role="rowgroup" className={cn(stickyHeader && "sticky top-0 z-10", "bg-surface")} style={{ minWidth: totalWidth }}>
            <div role="row" aria-rowindex={1} style={{ display: "grid", gridTemplateColumns: template, height: rowH, minWidth: totalWidth }} className="border-b border-line-strong text-xs uppercase text-muted">
              {selectable && (
                <div role="columnheader" className={cn(cellBase, "justify-center px-0", stickyCell)} style={{ insetInlineStart: 0 }}>
                  <input
                    type="checkbox"
                    aria-label={selectAllLabel}
                    checked={n > 0 && ids.every((i) => selectedSet.has(i))}
                    ref={(el) => {
                      if (el) el.indeterminate = selected.length > 0 && !ids.every((i) => selectedSet.has(i));
                    }}
                    onChange={() => {
                      const all = ids.every((i) => selectedSet.has(i));
                      // Server pages: selections made on other pages survive a select-all toggle.
                      if (manual) setSelected(all ? selected.filter((x) => !ids.includes(x)) : Array.from(new Set([...selected, ...ids])));
                      else setSelected(all ? [] : ids);
                    }}
                  />
                </div>
              )}
              {renderExpanded && <div role="columnheader" className={cn(stickyCell)} style={{ insetInlineStart: selectable ? SELECT_W : 0 }}>
                  <span className="sr-only">{L.expand}</span>
                </div>}
              {leaf.map((c) => {
                const spec = colById.get(c.id)!;
                const sIdx = sort.findIndex((s) => s.id === c.id);
                const s = sort[sIdx];
                const left = pinnedLeft.get(c.id);
                return (
                  <div
                    key={c.id}
                    role="columnheader"
                    data-col={c.id}
                    aria-sort={s ? (s.dir === "asc" ? "ascending" : "descending") : spec.sortable ? "none" : undefined}
                    draggable
                    onDragStart={(e) => {
                      dragId.current = c.id;
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragOver={(e) => dragId.current && e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragId.current) dropColumn(dragId.current, c.id);
                      dragId.current = null;
                    }}
                    onKeyDown={(e) => {
                      if (e.altKey && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
                        e.preventDefault();
                        const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
                        moveColumn(c.id, (e.key === "ArrowRight") !== rtl ? 1 : -1);
                      }
                    }}
                    className={cn("relative", cellBase, spec.numeric && "justify-end", left !== undefined && stickyCell)}
                    style={left !== undefined && Number.isFinite(left) ? { insetInlineStart: left } : undefined}
                  >
                    {spec.sortable ? (
                      <button
                        type="button"
                        className="inline-flex min-w-0 items-center gap-1 font-[inherit] uppercase hover:text-fg"
                        onClick={(e) => cycleSort(c.id, e.shiftKey)}
                      >
                        <span className="truncate">{spec.header}</span>
                        {s && (s.dir === "asc" ? <ArrowUp className="size-3 shrink-0" aria-hidden /> : <ArrowDown className="size-3 shrink-0" aria-hidden />)}
                        {s && sort.length > 1 && <span className="text-[10px]">{sIdx + 1}</span>}
                      </button>
                    ) : (
                      <span className="truncate">{spec.header}</span>
                    )}
                    {c.getCanResize() && (
                      <div
                        role="separator"
                        aria-orientation="vertical"
                        aria-label={`${L.resize}: ${textOf(spec.header, c.id)}`}
                        aria-valuenow={c.getSize()}
                        aria-valuemin={spec.minWidth ?? 60}
                        tabIndex={0}
                        draggable={false}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          // the header is draggable (reorder); suppress it for the duration of a resize gesture
                          const head = e.currentTarget.parentElement;
                          if (head) {
                            head.draggable = false;
                            window.addEventListener("mouseup", () => (head.draggable = true), { once: true });
                          }
                          table.getHeaderGroups()[0]?.headers.find((h) => h.id === c.id)?.getResizeHandler()(e);
                        }}
                        onDragStart={(e) => e.preventDefault()}
                        onDoubleClick={() => autoFit(c.id)}
                        onKeyDown={(e) => {
                          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
                          e.preventDefault();
                          e.stopPropagation();
                          const step = (e.shiftKey ? 50 : 10) * (e.key === "ArrowRight" ? 1 : -1);
                          setSizing({ ...sizing, [c.id]: Math.max(spec.minWidth ?? 60, c.getSize() + step) });
                        }}
                        className="absolute inset-y-0 end-0 w-1.5 cursor-col-resize touch-none bg-transparent hover:bg-primary focus-visible:bg-primary"
                      />
                    )}
                  </div>
                );
              })}
              {rowActions && (
                <div role="columnheader" className="relative">
                  <span className="sr-only">{L.actions}</span>
                </div>
              )}
            </div>
            {hasFilters && (
              <div role="row" style={{ display: "grid", gridTemplateColumns: template, minWidth: totalWidth }} className="border-b border-line">
                {selectable && <div role="gridcell" className={stickyCell} style={{ insetInlineStart: 0 }} />}
                {renderExpanded && <div role="gridcell" className={stickyCell} style={{ insetInlineStart: selectable ? SELECT_W : 0 }} />}
                {leaf.map((c) => {
                  const spec = colById.get(c.id)!;
                  const left = pinnedLeft.get(c.id);
                  return (
                    <div key={c.id} role="gridcell" className={cn("min-w-0 px-2 py-1", left !== undefined && stickyCell)} style={left !== undefined && Number.isFinite(left) ? { insetInlineStart: left } : undefined}>
                      {spec.filter && <FilterCell column={spec} value={filters.find((f) => f.id === c.id)?.value} onChange={(v) => setFilter(c.id, v)} rows={rows} label={L.filter} />}
                    </div>
                  );
                })}
                {rowActions && <div role="gridcell" />}
              </div>
            )}
          {error && (
            <div role="row" style={{ minWidth: totalWidth }} className="border-b border-danger-line bg-danger-bg">
              <div role="gridcell" aria-colspan={colCount} className="sticky z-[1] flex w-[min(100%,40rem)] items-center gap-3 p-3 text-sm text-danger" style={{ insetInlineStart: 0 }}>
                <div role="alert" className="min-w-0 flex-1">
                  {error}
                </div>
                {onRetry && (
                  <Button variant="secondary" size="sm" leftIcon={<RefreshCw aria-hidden />} onClick={onRetry}>
                    {SG.retry}
                  </Button>
                )}
              </div>
            </div>
          )}
          </div>

          <div role="rowgroup" style={virtualOn ? { height: virtualizer.getTotalSize() - rowH, position: "relative", minWidth: totalWidth } : { minWidth: totalWidth }}>
            {skeleton &&
              Array.from({ length: skeletonRows }, (_, i) => (
                <div key={i} role="row" style={{ display: "grid", gridTemplateColumns: template, height: rowH }} className="border-b border-line">
                  {Array.from({ length: colCount }, (_, j) => (
                    <div key={j} role="gridcell" className="flex items-center px-3">
                      <Skeleton />
                    </div>
                  ))}
                </div>
              ))}
            {showRows && (virtualOn
              ? virtualizer.getVirtualItems().map((v) => renderRow(v.index, { transform: `translateY(${v.start - rowH}px)` }, virtualizer.measureElement))
              : modelRows.map((_, i) => renderRow(i)))}
          </div>
        </div>
        {refreshing && (
          <div aria-hidden className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <span className="flex items-center gap-2 rounded-md border border-line bg-menu px-3 py-1.5 text-sm text-muted">
              <Loader2 className="size-4 animate-spin motion-reduce:animate-none" />
              {SG.refreshing}
            </span>
          </div>
        )}
        </div>
        {pg && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border border-t-0 border-line bg-surface px-3 py-2 text-sm text-muted">
            <div role="status" aria-live="polite" className="sr-only">
              {summary}
            </div>
            {pg.onPageSizeChange && (
              <label className="flex items-center gap-2">
                <span>{SG.rowsPerPage}</span>
                <Select className="h-8 w-20" value={pg.pageSize} onChange={(e) => pg.onPageSizeChange?.(Number(e.target.value))}>
                  {Array.from(new Set([...(pg.pageSizes ?? [10, 25, 50, 100]), pg.pageSize]))
                    .sort((x, y) => x - y)
                    .map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                </Select>
              </label>
            )}
            <div className="ms-auto [&_.pagination]:p-0">
              {totalRows !== undefined ? (
                <Pagination page={pg.page} pageCount={Math.max(1, Math.ceil(totalRows / pg.pageSize))} total={totalRows} pageSize={pg.pageSize} onPageChange={pg.onPageChange} />
              ) : (
                <nav className="pagination p-0" aria-label={laf.pagination}>
                  <span>{SG.page(pg.page)}</span>
                  <div className="pages">
                    <button type="button" className="page-btn" aria-label={laf.previousPage} disabled={pg.page <= 1} onClick={() => pg.onPageChange(pg.page - 1)}>
                      <ChevronLeft className="size-4" aria-hidden />
                    </button>
                    <button type="button" className="page-btn" aria-label={laf.nextPage} disabled={!pg.hasNext} onClick={() => pg.onPageChange(pg.page + 1)}>
                      <ChevronRight className="size-4" aria-hidden />
                    </button>
                  </div>
                </nav>
              )}
            </div>
          </div>
        )}
        {showEmpty && (empty ?? <EmptyState title={L.empty} />)}
        {bulkActions && selected.length > 0 && (
          <div role="toolbar" aria-label={L.selectedCount(selected.length)} className="sticky bottom-0 z-10 flex items-center gap-3 border border-line bg-surface px-3 py-2 text-sm">
            <span className="font-medium">{L.selectedCount(selected.length)}</span>
            {bulkActions(selected)}
            <button type="button" aria-label={L.clearSelection} className="ms-auto text-muted hover:text-fg" onClick={() => setSelected([])}>
              <X className="size-4" aria-hidden />
            </button>
          </div>
        )}
        {rowActions && (
          <DropdownMenu open={!!menu && menuItems.length > 0} onOpenChange={(o) => !o && setMenu(null)}>
            <DropdownMenuTrigger asChild>
              <span aria-hidden className="pointer-events-none fixed size-0" style={menu ? { left: menu.x, top: menu.y } : undefined} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                scrollRef.current?.focus();
              }}
            >
              {menuItems.map((m) => (
                <React.Fragment key={m.id}>
                  {m.separatorBefore && <DropdownMenuSeparator />}
                  <DropdownMenuItem danger={m.danger} disabled={m.disabled} onSelect={() => m.onSelect()}>
                    {m.icon}
                    {m.label}
                  </DropdownMenuItem>
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </GridContext.Provider>
  );
}
