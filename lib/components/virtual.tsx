import { observeElementRect, useVirtualizer, type Virtualizer } from "@tanstack/react-virtual";
import * as React from "react";
import { cn } from "../cn";
import { Skeleton } from "./feedback";

/** Falls back to `initialRect` while the element has no layout (hidden or jsdom) so rows still render. */
export function observeRectWithFallback(inst: Virtualizer<HTMLDivElement, Element>, cb: (rect: { width: number; height: number }) => void) {
  return observeElementRect(inst, (rect) => cb(rect.height === 0 ? inst.options.initialRect : rect));
}

/** Fixed-row-height windowing for long lists (TanStack Virtual). Rows render with absolute offsets. */
export function VirtualList<T>({
  items,
  rowHeight,
  height,
  overscan = 8,
  renderRow,
  label,
  className,
  onRangeChange,
}: {
  items: T[];
  rowHeight: number;
  height: number;
  overscan?: number;
  renderRow: (item: T, index: number) => React.ReactNode;
  label: string;
  className?: string;
  /** Called with the last rendered index whenever the window moves. */
  onRangeChange?: (lastIndex: number) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const virt = useVirtualizer({
    count: items.length,
    getScrollElement: () => ref.current,
    estimateSize: () => rowHeight,
    overscan,
    initialRect: { width: 0, height },
    observeElementRect: observeRectWithFallback,
  });
  const rows = virt.getVirtualItems();
  const last = rows[rows.length - 1]?.index ?? -1;
  React.useEffect(() => {
    if (last >= 0) onRangeChange?.(last);
  }, [last, onRangeChange]);
  return (
    <div
      ref={ref}
      role="list"
      aria-label={label}
      tabIndex={0}
      className={cn("relative overflow-auto", className)}
      // dynamic viewport height
      style={{ height }}
    >
      {/* dynamic total scroll height */}
      <div className="relative" style={{ height: virt.getTotalSize() }}>
        {rows.map((r) => (
          <div
            key={r.key}
            role="listitem"
            aria-posinset={r.index + 1}
            aria-setsize={items.length}
            className="absolute inset-x-0"
            style={{ top: r.start, height: r.size }}
          >
            {renderRow(items[r.index] as T, r.index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface InfiniteListProps<T> {
  items: T[];
  rowHeight: number;
  height: number;
  renderRow: (item: T, index: number) => React.ReactNode;
  label: string;
  hasMore: boolean;
  loading?: boolean;
  /** Fired when the last row scrolls into view while `hasMore` and not `loading`. */
  onEndReached: () => void;
  overscan?: number;
  className?: string;
  labels?: { loading?: string; loadMore?: string };
}

/** Virtualized list with end-reached paging, a loading row and a keyboard-accessible "Load more" button. */
export function InfiniteList<T>({
  items,
  rowHeight,
  height,
  renderRow,
  label,
  hasMore,
  loading = false,
  onEndReached,
  overscan,
  className,
  labels,
}: InfiniteListProps<T>) {
  const l = { loading: "Loading…", loadMore: "Load more", ...labels };
  type Row = { kind: "item"; item: T } | { kind: "loading" };
  const rows = React.useMemo<Row[]>(
    () => [...items.map((item): Row => ({ kind: "item", item })), ...(loading ? [{ kind: "loading" } as Row] : [])],
    [items, loading],
  );
  const endRef = React.useRef(onEndReached);
  endRef.current = onEndReached;
  const onRange = React.useCallback(
    (last: number) => {
      if (hasMore && !loading && last >= items.length - 1) endRef.current();
    },
    [hasMore, loading, items.length],
  );
  return (
    <div className="flex flex-col gap-2">
      <VirtualList
        items={rows}
        rowHeight={rowHeight}
        height={height}
        overscan={overscan}
        label={label}
        className={className}
        onRangeChange={onRange}
        renderRow={(r, i) =>
          r.kind === "item" ? (
            renderRow(r.item, i)
          ) : (
            <div role="status" className="flex h-full items-center gap-2 px-2 text-sm text-muted">
              <Skeleton className="h-3 w-24" />
              <span className="sr-only">{l.loading}</span>
            </div>
          )
        }
      />
      {hasMore && (
        <button type="button" className="btn btn-secondary btn-sm self-start" disabled={loading} onClick={() => onEndReached()}>
          {l.loadMore}
        </button>
      )}
    </div>
  );
}
