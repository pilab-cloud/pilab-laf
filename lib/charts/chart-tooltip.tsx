import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../cn";
import { usePortalContainer } from "../i18n";

export interface TooltipRow {
  name: string;
  value: React.ReactNode;
  tone?: string;
}

export interface ChartTooltipPoint {
  /** Header text: the category, the formatted time, the cell name … */
  label: string;
  /** Raw x (time, category name, column) when it has one. */
  x?: number | string;
  /** Value of the hovered/focused datum for single-valued charts (donut, segmented bar, heatmap). */
  value?: number | null;
  formatted?: string;
}

export interface ChartTooltipSeries {
  id: string;
  name: string;
  value: number | null;
  /** Locale-formatted value (the chart's `formatValue` / `useLaf` formatters). */
  formatted: string;
  /** Tailwind `text-*` class of the swatch. */
  tone?: string;
}

export interface ChartTooltipContext {
  point: ChartTooltipPoint;
  /** One entry per series at the point (a single entry for donut / segmented bar / heatmap). */
  series: ChartTooltipSeries[];
  /** Index of the point (category, stamp, segment, cell). */
  index: number;
}

/** `tooltip` prop of every chart: off, default content, a render function, or tweaks for the default content. */
export type ChartTooltipOption =
  | boolean
  | ((ctx: ChartTooltipContext) => React.ReactNode)
  | {
      /** Renders the value of one row. */
      formatter?: (series: ChartTooltipSeries, ctx: ChartTooltipContext) => React.ReactNode;
      /** Replaces the header (default `point.label`). */
      header?: React.ReactNode | ((ctx: ChartTooltipContext) => React.ReactNode);
    };

export const tooltipEnabled = (o: ChartTooltipOption | undefined) => o !== false;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(v, Math.max(lo, hi)));

/**
 * Visual tooltip. With `container` (the chart's positioned wrapper) it is portalled to `<body>` and placed with fixed
 * coordinates, so it is never clipped by an `overflow-hidden` card; it flips and clamps to stay inside the viewport.
 * `x`/`y` are relative to `container`. Without `container` it is absolutely positioned inside the nearest positioned parent.
 * `pointer-events: none`, so it never steals the hover and cannot flicker.
 */
export function ChartTooltip({
  x,
  y,
  title,
  rows = [],
  children,
  id,
  container,
  placement = "top",
  className,
}: {
  x: number;
  y: number;
  title?: React.ReactNode;
  rows?: TooltipRow[];
  /** Custom body; replaces `title`/`rows`. */
  children?: React.ReactNode;
  id?: string;
  container?: React.RefObject<HTMLElement | null>;
  /** `top`: above the anchor (flips below); `side`: beside it (flips to the other side), for crosshairs. */
  placement?: "top" | "side";
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const portal = usePortalContainer();
  const [pos, setPos] = React.useState<{ left: number; top: number } | null>(null);
  const [, setTick] = React.useState(0);
  const portalled = !!container;

  React.useEffect(() => {
    if (!portalled) return;
    const bump = () => setTick((t) => t + 1);
    window.addEventListener("scroll", bump, true);
    window.addEventListener("resize", bump);
    return () => {
      window.removeEventListener("scroll", bump, true);
      window.removeEventListener("resize", bump);
    };
  }, [portalled]);

  React.useLayoutEffect(() => {
    const el = ref.current;
    const box = container?.current;
    if (!el || !box) return;
    const r = box.getBoundingClientRect();
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const gap = 10;
    const ax = r.left + x;
    const ay = r.top + y;
    let left: number;
    let top: number;
    if (placement === "side") {
      left = ax + gap + w + 4 > vw ? ax - gap - w : ax + gap;
      top = ay;
    } else {
      left = ax - w / 2;
      top = ay - h - gap;
      if (top < 4) top = ay + gap;
    }
    const next = { left: clamp(left, 4, vw - w - 4), top: clamp(top, 4, vh - h - 4) };
    setPos((p) => (p && p.left === next.left && p.top === next.top ? p : next));
  });

  const body = (
    <div
      ref={ref}
      id={id}
      role="tooltip"
      dir={portalled && typeof document !== "undefined" ? document.documentElement.dir || undefined : undefined}
      data-chart-tooltip=""
      className={cn(
        "pointer-events-none z-50 min-w-28 max-w-[min(20rem,calc(100vw-1rem))] rounded-sm border border-line-strong bg-menu px-2 py-1.5 text-xs text-fg shadow-(--shadow-card)",
        portalled ? "fixed" : "absolute -translate-x-1/2",
        className,
      )}
      style={portalled ? { left: pos?.left ?? 0, top: pos?.top ?? 0, visibility: pos ? "visible" : "hidden" } : { insetInlineStart: x, top: y }}
    >
      {children ?? (
        <>
          {title && <div className="mb-1 font-medium">{title}</div>}
          {rows.map((r) => (
            <div key={r.name} className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-muted">
                {r.tone && <span aria-hidden className={cn("size-2 rounded-xs bg-current", r.tone)} />}
                {r.name}
              </span>
              <b className="font-mono">{r.value}</b>
            </div>
          ))}
        </>
      )}
    </div>
  );
  return portalled && typeof document !== "undefined" ? createPortal(body, portal ?? document.body) : body;
}

/** Resolves a `tooltip` option against a context: custom render, `{formatter, header}`, or the default header + one row per series. */
export function ChartTooltipFor({
  option,
  ctx,
  x,
  y,
  id,
  container,
  placement,
}: {
  option: ChartTooltipOption | undefined;
  ctx: ChartTooltipContext | null;
  x: number;
  y: number;
  id?: string;
  container?: React.RefObject<HTMLElement | null>;
  placement?: "top" | "side";
}) {
  if (!ctx || !tooltipEnabled(option)) return null;
  const common = { x, y, id, container, placement };
  if (typeof option === "function") return <ChartTooltip {...common}>{option(ctx)}</ChartTooltip>;
  const o = typeof option === "object" ? option : {};
  const title = typeof o.header === "function" ? o.header(ctx) : (o.header ?? ctx.point.label);
  return <ChartTooltip {...common} title={title} rows={ctx.series.map((s) => ({ name: s.name, value: o.formatter ? o.formatter(s, ctx) : s.formatted, tone: s.tone }))} />;
}

/** Hides the tooltip on Escape and on a pointer press outside `ref` (how a tap-opened tooltip on touch is dismissed). */
export function useTooltipDismiss(open: boolean, ref: React.RefObject<Element | null>, dismiss: () => void) {
  const fn = React.useRef(dismiss);
  fn.current = dismiss;
  React.useEffect(() => {
    if (!open) return;
    const down = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) fn.current();
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && fn.current();
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open, ref]);
}
