import * as React from "react";
import { cn } from "../cn";

/** Fixed-row-height windowing for long lists. Rows render with absolute offsets. */
export function VirtualList<T>({
  items,
  rowHeight,
  height,
  overscan = 8,
  renderRow,
  label,
  className,
}: {
  items: T[];
  rowHeight: number;
  height: number;
  overscan?: number;
  renderRow: (item: T, index: number) => React.ReactNode;
  label: string;
  className?: string;
}) {
  const [top, setTop] = React.useState(0);
  const start = Math.max(0, Math.floor(top / rowHeight) - overscan);
  const end = Math.min(items.length, Math.ceil((top + height) / rowHeight) + overscan);
  return (
    <div
      role="list"
      aria-label={label}
      tabIndex={0}
      className={cn("relative overflow-auto", className)}
      // dynamic viewport height
      style={{ height }}
      onScroll={(e) => setTop(e.currentTarget.scrollTop)}
    >
      {/* dynamic total scroll height */}
      <div style={{ height: items.length * rowHeight }}>
        {items.slice(start, end).map((item, i) => (
          <div
            key={start + i}
            role="listitem"
            aria-posinset={start + i + 1}
            aria-setsize={items.length}
            className="absolute inset-x-0"
            style={{ top: (start + i) * rowHeight, height: rowHeight }}
          >
            {renderRow(item, start + i)}
          </div>
        ))}
      </div>
    </div>
  );
}
