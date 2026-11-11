import { RefreshCw, Search } from "lucide-react";
import * as React from "react";
import { useLafDefaults } from "../i18n";
import { portalEn } from "../messages/portal.en";
import { DataGrid, type DataGridProps, type GridFilter, type GridPagination, type GridSort } from "./datagrid";
import { FilterBar, serializeFilter, type FilterBarProps, type FilterField, type FilterToken, type ParsedFilter } from "./filterbar";
import { SearchInput } from "./form";
import { IconButton } from "./primitives";
import { Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem } from "./toolbar";

const portalDefaults = { portal: portalEn };

/* ── Types ── */
export interface ServerGridQuery {
  sort: GridSort[];
  /** 1-based. */
  page: number;
  pageSize: number;
  filters: GridFilter[];
  /** Debounced search text. */
  search: string;
}

export interface ServerGridRequest extends ServerGridQuery {
  /** Cursor returned with the previous page (`nextCursor`); undefined for the first page or offset APIs. */
  cursor?: string;
  /** Aborted as soon as a newer request supersedes this one or the grid unmounts. */
  signal: AbortSignal;
}

export interface ServerGridResult<T> {
  rows: T[];
  /** Total rows matching the query; leave out for cursor APIs that cannot count. */
  total?: number;
  /** Cursor of the next page; `null` marks the last page. */
  nextCursor?: string | null;
}

export type ServerGridFetcher<T> = (request: ServerGridRequest) => Promise<ServerGridResult<T>>;

/** Where the grid state is mirrored: the browser URL by default, or a router's search params. */
export interface ServerGridUrlAdapter {
  /** Current search string (with or without the leading `?`). */
  read: () => string;
  write: (search: string, mode: "push" | "replace") => void;
  /** Notify on external changes (back/forward); returns the unsubscribe function. */
  subscribe?: (onChange: () => void) => () => void;
}

export interface ServerGridUrlOptions {
  adapter?: ServerGridUrlAdapter;
  /** Namespaces the parameters (`<prefix>sort`, `<prefix>page` …) when several grids share a URL. */
  prefix?: string;
  /** `replace` (default) keeps the back button usable; `push` adds a history entry per change. */
  history?: "push" | "replace";
}

export interface UseServerGridOptions<T> {
  fetcher: ServerGridFetcher<T>;
  initialSort?: GridSort[];
  initialFilters?: GridFilter[];
  initialSearch?: string;
  initialPage?: number;
  /** Default 25. */
  pageSize?: number;
  /** Delay before typing in the search box triggers a request. Default 300; 0 disables. */
  debounceMs?: number;
  /** `true` uses the browser URL (`history.replaceState`). */
  urlSync?: boolean | ServerGridUrlOptions;
  /** Hold off fetching (e.g. until a tenant is known). Default true. */
  enabled?: boolean;
  /** Keep showing the previous rows while a new query loads (stale-while-revalidate). Default true. */
  keepPreviousData?: boolean;
  onError?: (error: unknown) => void;
}

export interface ServerGridController<T> {
  rows: T[];
  total: number | undefined;
  pageCount: number | undefined;
  hasNext: boolean;
  sort: GridSort[];
  page: number;
  pageSize: number;
  filters: GridFilter[];
  /** Live value of the search box; the request uses the debounced `query.search`. */
  search: string;
  /** What the latest request was (or is being) made with. */
  query: ServerGridQuery;
  /** A request is in flight. */
  loading: boolean;
  /** In flight with nothing to show yet. */
  initialLoading: boolean;
  /** `rows` belong to an earlier query while the current one loads. */
  stale: boolean;
  error: unknown;
  setSort: (sort: GridSort[]) => void;
  setFilters: (filters: GridFilter[]) => void;
  setSearch: (search: string) => void;
  /** Applies the pending search text without waiting for the debounce. */
  flushSearch: () => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  /** Back to the initial sort, filters, search and page. */
  reset: () => void;
  /** Refetches the current query (keeps the rows visible). */
  refresh: () => void;
  /** Spread onto `<DataGrid>`; it already sets `manual`. */
  gridProps: Pick<
    DataGridProps<T>,
    "rows" | "manual" | "sort" | "onSortChange" | "filters" | "onFiltersChange" | "search" | "onSearchChange" | "loading" | "error" | "onRetry" | "rowCount" | "pagination"
  >;
}

/* ── URL state ── */
export const browserSearchParams: ServerGridUrlAdapter = {
  read: () => (typeof location === "undefined" ? "" : location.search),
  write: (search, mode) => {
    if (typeof history === "undefined") return;
    const url = `${location.pathname}${search ? `?${search}` : ""}${location.hash}`;
    if (mode === "push") history.pushState(history.state, "", url);
    else history.replaceState(history.state, "", url);
  },
  subscribe: (onChange) => {
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  },
};

interface CoreState {
  sort: GridSort[];
  page: number;
  pageSize: number;
  filters: GridFilter[];
  search: string;
}

const own = (key: string, prefix: string) => key === `${prefix}q` || key === `${prefix}sort` || key === `${prefix}page` || key === `${prefix}size` || key.startsWith(`${prefix}f.`) || key.startsWith(`${prefix}fj.`);
const positive = (v: string | null) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : undefined;
};

/** Reads `q`, `sort` (`name:asc,age:desc`), `page`, `size` and `f.<id>` / `fj.<id>` (JSON) back into grid state. */
export function serverGridFromSearchParams(search: string | URLSearchParams, defaults: Partial<ServerGridQuery> = {}, prefix = ""): ServerGridQuery {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  const sort: GridSort[] = [];
  for (const part of (params.get(`${prefix}sort`) ?? "").split(",").filter(Boolean)) {
    const i = part.lastIndexOf(":");
    const dir = part.slice(i + 1);
    if (i > 0 && (dir === "asc" || dir === "desc")) sort.push({ id: decodeURIComponent(part.slice(0, i)), dir });
  }
  const filters: GridFilter[] = [];
  params.forEach((value, key) => {
    if (key.startsWith(`${prefix}f.`)) filters.push({ id: key.slice(prefix.length + 2), value });
    else if (key.startsWith(`${prefix}fj.`)) {
      try {
        filters.push({ id: key.slice(prefix.length + 3), value: JSON.parse(value) });
      } catch {
        /* malformed parameter: ignore */
      }
    }
  });
  return {
    sort: params.has(`${prefix}sort`) ? sort : (defaults.sort ?? []),
    filters: filters.length ? filters : (defaults.filters ?? []),
    search: params.get(`${prefix}q`) ?? defaults.search ?? "",
    page: positive(params.get(`${prefix}page`)) ?? defaults.page ?? 1,
    pageSize: positive(params.get(`${prefix}size`)) ?? defaults.pageSize ?? 25,
  };
}

/** Inverse of {@link serverGridFromSearchParams}: writes the non-default parts of `state` into `params` (other parameters stay). */
export function serverGridToSearchParams(state: ServerGridQuery, params = new URLSearchParams(), defaults: Partial<ServerGridQuery> = {}, prefix = ""): URLSearchParams {
  for (const key of [...params.keys()]) if (own(key, prefix)) params.delete(key);
  if (state.search) params.set(`${prefix}q`, state.search);
  const defaultSort = (defaults.sort ?? []).map((s) => `${s.id}:${s.dir}`).join(",");
  const sort = state.sort.map((s) => `${encodeURIComponent(s.id)}:${s.dir}`).join(",");
  if (sort !== defaultSort) params.set(`${prefix}sort`, sort);
  if (state.page > 1) params.set(`${prefix}page`, String(state.page));
  if (state.pageSize !== (defaults.pageSize ?? 25)) params.set(`${prefix}size`, String(state.pageSize));
  for (const f of state.filters) {
    if (typeof f.value === "string") params.append(`${prefix}f.${f.id}`, f.value);
    else params.append(`${prefix}fj.${f.id}`, JSON.stringify(f.value));
  }
  return params;
}

const isAbort = (e: unknown) => typeof e === "object" && e !== null && (e as { name?: string }).name === "AbortError";
const sameQuery = (a: CoreState, b: CoreState) => JSON.stringify(a) === JSON.stringify(b);

/**
 * State and data loading for a server-driven table: sort, page/cursor, page size, filters and debounced search.
 * Every change refetches; the previous request is aborted, stale responses are dropped, and the previous rows
 * stay on screen (`stale`) until the new ones arrive. Changing sort, filters, search or page size returns to page 1.
 */
export function useServerGrid<T>(options: UseServerGridOptions<T>): ServerGridController<T> {
  const { fetcher, initialSort, initialFilters, initialSearch, initialPage, pageSize: pageSizeOption = 25, debounceMs = 300, urlSync, enabled = true, keepPreviousData = true } = options;
  const { t } = useLafDefaults(portalDefaults);
  const SG = t.components.portal.serverGrid;

  const urlOpts = urlSync ? (urlSync === true ? {} : urlSync) : undefined;
  const adapter = urlOpts?.adapter ?? browserSearchParams;
  const prefix = urlOpts?.prefix ?? "";
  const urlMode = urlOpts?.history ?? "replace";
  const defaults = React.useRef<Partial<ServerGridQuery>>({ sort: initialSort ?? [], filters: initialFilters ?? [], search: initialSearch ?? "", page: initialPage ?? 1, pageSize: pageSizeOption });

  const [core, setCore] = React.useState<CoreState>(() => (urlOpts ? serverGridFromSearchParams(adapter.read(), defaults.current, prefix) : (defaults.current as CoreState)));
  const [input, setInput] = React.useState(core.search);
  const [tick, setTick] = React.useState(0);
  const [data, setData] = React.useState<{ rows: T[]; total?: number; nextCursor?: string | null; key: string } | null>(null);
  const [status, setStatus] = React.useState<{ loading: boolean; error: unknown }>({ loading: enabled, error: null });

  const fetcherRef = React.useRef(fetcher);
  fetcherRef.current = fetcher;
  const onErrorRef = React.useRef(options.onError);
  onErrorRef.current = options.onError;
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pending = React.useRef(input);
  const cursors = React.useRef<{ key: string; byPage: Record<number, string> }>({ key: "", byPage: {} });

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const commitSearch = React.useCallback((value: string) => {
    clearTimeout(timer.current);
    setCore((c) => (c.search === value ? c : { ...c, search: value, page: 1 }));
  }, []);
  const setSearch = React.useCallback(
    (value: string) => {
      setInput(value);
      pending.current = value;
      clearTimeout(timer.current);
      if (debounceMs <= 0) commitSearch(value);
      else timer.current = setTimeout(() => commitSearch(value), debounceMs);
    },
    [debounceMs, commitSearch],
  );
  const flushSearch = React.useCallback(() => commitSearch(pending.current), [commitSearch]);

  const setSort = React.useCallback((sort: GridSort[]) => setCore((c) => ({ ...c, sort, page: 1 })), []);
  const setFilters = React.useCallback((filters: GridFilter[]) => setCore((c) => ({ ...c, filters, page: 1 })), []);
  const setPageSize = React.useCallback((pageSize: number) => setCore((c) => (c.pageSize === pageSize ? c : { ...c, pageSize, page: 1 })), []);
  const setPage = React.useCallback((page: number) => setCore((c) => (page < 1 || c.page === page ? c : { ...c, page })), []);
  const refresh = React.useCallback(() => setTick((n) => n + 1), []);
  const reset = React.useCallback(() => {
    clearTimeout(timer.current);
    const d = defaults.current as CoreState;
    pending.current = d.search;
    setInput(d.search);
    setCore({ ...d });
  }, []);

  const queryKey = JSON.stringify([core.sort, core.pageSize, core.filters, core.search]);
  const requestKey = `${queryKey}|${core.page}`;

  React.useEffect(() => {
    if (!enabled) return;
    if (cursors.current.key !== queryKey) cursors.current = { key: queryKey, byPage: {} };
    const ac = new AbortController();
    setStatus((s) => (s.loading && s.error === null ? s : { loading: true, error: null }));
    let promise: Promise<ServerGridResult<T>>;
    try {
      promise = Promise.resolve(fetcherRef.current({ ...core, cursor: cursors.current.byPage[core.page], signal: ac.signal }));
    } catch (e) {
      promise = Promise.reject(e);
    }
    promise.then(
      (res) => {
        if (ac.signal.aborted) return;
        if (res.nextCursor) cursors.current.byPage[core.page + 1] = res.nextCursor;
        setData({ rows: res.rows, total: res.total, nextCursor: res.nextCursor, key: requestKey });
        setStatus({ loading: false, error: null });
      },
      (error) => {
        if (ac.signal.aborted || isAbort(error)) return;
        setStatus({ loading: false, error });
        onErrorRef.current?.(error);
      },
    );
    return () => ac.abort();
    // `core` identity changes exactly when the query does.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [core, tick, enabled]);

  // Rows were removed elsewhere and the page no longer exists.
  const total = data?.total;
  const pageCount = total === undefined ? undefined : Math.max(1, Math.ceil(total / core.pageSize));
  React.useEffect(() => {
    if (data?.key === requestKey && pageCount !== undefined && core.page > pageCount) setCore((c) => ({ ...c, page: pageCount }));
  }, [data, requestKey, pageCount, core.page]);

  /* URL mirror */
  const urlRef = React.useRef({ adapter, prefix, urlMode });
  urlRef.current = { adapter, prefix, urlMode };
  React.useEffect(() => {
    if (!urlOpts) return;
    const params = serverGridToSearchParams(core, new URLSearchParams(adapter.read()), defaults.current, prefix);
    const next = params.toString();
    if (next !== new URLSearchParams(adapter.read()).toString()) adapter.write(next, urlMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [core]);
  React.useEffect(() => {
    if (!urlOpts || !adapter.subscribe) return;
    return adapter.subscribe(() => {
      const { adapter: a, prefix: p } = urlRef.current;
      const parsed = serverGridFromSearchParams(a.read(), defaults.current, p);
      pending.current = parsed.search;
      setInput(parsed.search);
      setCore((c) => (sameQuery(c, parsed) ? c : parsed));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!urlOpts, adapter]);

  const stale = data !== null && data.key !== requestKey;
  const rows = React.useMemo(() => (data && (keepPreviousData || !stale) ? data.rows : ([] as T[])), [data, keepPreviousData, stale]);
  const hasNext = total !== undefined ? core.page < (pageCount ?? 1) : data?.nextCursor !== undefined ? !!data.nextCursor : rows.length >= core.pageSize;
  const errorText = status.error === null ? undefined : `${SG.loadFailed} ${status.error instanceof Error ? status.error.message : ""}`.trim();

  const pagination: GridPagination = {
    page: core.page,
    pageSize: core.pageSize,
    total,
    hasNext,
    onPageChange: setPage,
    onPageSizeChange: setPageSize,
  };

  return {
    rows,
    total,
    pageCount,
    hasNext,
    sort: core.sort,
    page: core.page,
    pageSize: core.pageSize,
    filters: core.filters,
    search: input,
    query: core,
    loading: status.loading,
    initialLoading: status.loading && data === null,
    stale,
    error: status.error,
    setSort,
    setFilters,
    setSearch,
    flushSearch,
    setPage,
    setPageSize,
    reset,
    refresh,
    gridProps: {
      rows,
      manual: true,
      sort: core.sort,
      onSortChange: setSort,
      filters: core.filters,
      onFiltersChange: setFilters,
      search: input,
      onSearchChange: setSearch,
      loading: status.loading,
      error: errorText,
      onRetry: refresh,
      rowCount: total,
      pagination,
    },
  };
}

/* ── FilterBar ↔ grid filters ── */
const TEXT_ID = "$text";
const isBarFilter = (f: GridFilter) => f.id === TEXT_ID || (typeof f.value === "object" && f.value !== null && Array.isArray((f.value as { values?: unknown }).values));

function barFilters(parsed: ParsedFilter): GridFilter[] {
  const out: GridFilter[] = parsed.filters.map((f) => ({ id: f.key, value: { op: f.op, values: f.values, negated: f.negated } }));
  if (parsed.text.length) out.push({ id: TEXT_ID, value: parsed.text });
  return out;
}

function barQuery(filters: GridFilter[]): string {
  const tokens: FilterToken[] = filters.filter(isBarFilter).flatMap((f): FilterToken[] =>
    f.id === TEXT_ID ? (f.value as { value: string; negated: boolean }[]).map((t) => ({ type: "text", ...t })) : [{ type: "field", key: f.id, ...(f.value as { op: ":"; values: string[]; negated: boolean }) }],
  );
  return serializeFilter(tokens);
}

/* ── ServerDataGrid ── */
type Owned = "rows" | "manual" | "sort" | "onSortChange" | "filters" | "onFiltersChange" | "search" | "onSearchChange" | "loading" | "error" | "onRetry" | "rowCount" | "pagination" | "toolbar";

export interface ServerDataGridProps<T> extends Omit<DataGridProps<T>, Owned>, UseServerGridOptions<T> {
  /** Page sizes offered in the footer. Default 10/25/50/100. */
  pageSizes?: number[];
  /** Search box above the grid (debounced). Default true. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Adds a `FilterBar` whose parsed filters become `filters` in the request. */
  filterFields?: FilterField[];
  filterBar?: Partial<Omit<FilterBarProps, "fields" | "value" | "onChange">>;
  /** Extra toolbar content before / after the built-in controls; inside the grid, so `GridColumnsMenu` & co. work. */
  toolbarStart?: React.ReactNode;
  toolbarEnd?: React.ReactNode;
  /** Show the refresh button. Default true. */
  refreshable?: boolean;
  /** Imperative access to the grid state (e.g. to refresh after a mutation). */
  controllerRef?: React.Ref<ServerGridController<T>>;
}

/** `DataGrid` + `useServerGrid` + `Toolbar`/`SearchInput`/`FilterBar`: a sortable, paginated, searchable server table in one element. */
export function ServerDataGrid<T>({
  fetcher,
  initialSort,
  initialFilters,
  initialSearch,
  initialPage,
  pageSize,
  debounceMs,
  urlSync,
  enabled,
  keepPreviousData,
  onError,
  pageSizes,
  searchable = true,
  searchPlaceholder,
  filterFields,
  filterBar,
  toolbarStart,
  toolbarEnd,
  refreshable = true,
  controllerRef,
  ...grid
}: ServerDataGridProps<T>) {
  const { t } = useLafDefaults(portalDefaults);
  const SG = { ...t.components.portal.serverGrid, ...grid.labels };
  const ctl = useServerGrid<T>({ fetcher, initialSort, initialFilters, initialSearch, initialPage, pageSize, debounceMs, urlSync, enabled, keepPreviousData, onError });
  React.useImperativeHandle(controllerRef, () => ctl);

  const { gridProps } = ctl;
  const pagination = pageSizes ? { ...gridProps.pagination!, pageSizes } : gridProps.pagination;
  const hasToolbar = searchable || !!filterFields || !!toolbarStart || !!toolbarEnd || refreshable;

  const toolbar = hasToolbar && (
    <Toolbar aria-label={grid.label} className="w-full">
      <ToolbarContent>
        {searchable && (
          <ToolbarItem grow>
            <SearchInput
              icon={<Search aria-hidden />}
              aria-label={SG.search}
              placeholder={searchPlaceholder ?? SG.search}
              value={ctl.search}
              onChange={(e) => ctl.setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ctl.flushSearch()}
              className="w-full"
            />
          </ToolbarItem>
        )}
        {filterFields && (
          <ToolbarItem grow>
            <FilterBar
              savedViews={false}
              {...filterBar}
              fields={filterFields}
              value={barQuery(ctl.filters)}
              onChange={(_q, parsed) => ctl.setFilters([...ctl.filters.filter((f) => !isBarFilter(f)), ...barFilters(parsed)])}
            />
          </ToolbarItem>
        )}
        {toolbarStart}
        <ToolbarGroup align="end">
          {toolbarEnd}
          {refreshable && <IconButton label={SG.refresh} icon={<RefreshCw className="size-4" />} onClick={ctl.refresh} />}
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );

  return <DataGrid<T> {...grid} {...gridProps} pagination={pagination} toolbar={toolbar || undefined} />;
}
