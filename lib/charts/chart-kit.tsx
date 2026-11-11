import { BarChart3, TableProperties } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Button } from "../components/button";
import { useLafDefaults } from "../i18n";
import { dashboardEn } from "../messages/dashboard.en";
import { useTooltipDismiss } from "./chart-tooltip";

export * from "./chart-motion";
export * from "./chart-tooltip";

const lafDefaults = { dashboard: dashboardEn };
export const useChartLaf = () => useLafDefaults(lafDefaults);

/** Categorical palette: the label colours (`--label-n`) so charts follow the theme and stay ≥ 3:1 on the background. */
export const CHART_TONES = ["text-label-9", "text-label-5", "text-label-3", "text-label-1", "text-label-7", "text-label-11", "text-label-2", "text-label-6"] as const;
export const chartTone = (i: number) => CHART_TONES[i % CHART_TONES.length]!;
/** Second, non-colour cue for series (SVG dash patterns), reused by the legend swatches. */
export const CHART_DASH = [undefined, "6 3", "2 3", "8 3 2 3"] as const;

export function useChartWidth(fixed: number | undefined, initial = 480) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [w, setW] = React.useState(initial);
  React.useEffect(() => {
    const el = ref.current;
    if (fixed !== undefined || !el || typeof ResizeObserver === "undefined") return;
    const apply = () => el.clientWidth > 0 && setW(el.clientWidth);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fixed]);
  return [ref, fixed ?? w] as const;
}

/** Roving "active datum" for charts: arrows/Home/End move it, Escape clears it, hover sets it. */
export function useActiveIndex(count: number, containerRef?: React.RefObject<Element | null>) {
  const [active, setActive] = React.useState<number | null>(null);
  const [keyboard, setKeyboard] = React.useState(false);
  const fallback = React.useRef<Element>(null);
  useTooltipDismiss(active !== null, containerRef ?? fallback, () => (setActive(null), setKeyboard(false)));
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!count) return;
    const cur = active ?? -1;
    const go = (i: number) => {
      e.preventDefault();
      setKeyboard(true);
      setActive(Math.min(count - 1, Math.max(0, i)));
    };
    // the plot is always left-to-right, so the keys follow the screen, not the document direction
    const next = e.key === "ArrowDown" || e.key === "ArrowRight";
    const prev = e.key === "ArrowUp" || e.key === "ArrowLeft";
    if (next) go(cur + 1);
    else if (prev) go(cur < 0 ? count - 1 : cur - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(count - 1);
    else if (e.key === "Escape") setActive(null);
  };
  return { active, setActive, keyboard, setKeyboard, onKeyDown, onBlur: () => (setActive(null), setKeyboard(false)) };
}

export interface LegendItem {
  id: string;
  name: string;
  /** Tailwind `text-*` class used as the swatch colour. */
  tone: string;
  dash?: string;
  value?: React.ReactNode;
}

/** Legend; with `onToggle` the entries are toggle buttons (`aria-pressed`) that hide/show a series. */
export function ChartLegend({ items, hidden = [], onToggle, onHover, label, className }: { items: LegendItem[]; hidden?: string[]; onToggle?: (id: string) => void; /** Called with the entry id on hover/focus and `null` on leave/blur (drives series emphasis). */ onHover?: (id: string | null) => void; label?: string; className?: string }) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  return (
    <ul aria-label={label ?? c.legend} className={cn("m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-1 p-0 text-xs text-muted", className)}>
      {items.map((it) => {
        const off = hidden.includes(it.id);
        const swatch = (
          <svg width="14" height="8" aria-hidden className={cn(it.tone, off && "opacity-40")}>
            {it.dash ? <line x1="0" x2="14" y1="4" y2="4" stroke="currentColor" strokeWidth="2.5" strokeDasharray={it.dash} /> : <rect width="14" height="8" rx="2" fill="currentColor" />}
          </svg>
        );
        return (
          <li key={it.id}>
            {onToggle ? (
              <button type="button" onPointerEnter={() => onHover?.(it.id)} onPointerLeave={() => onHover?.(null)} onFocus={() => onHover?.(it.id)} onBlur={() => onHover?.(null)} aria-pressed={!off} aria-label={c.toggleSeries(it.name)} onClick={() => onToggle(it.id)} className={cn("inline-flex items-center gap-1.5 rounded-sm border-0 bg-transparent p-0.5 text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50", off && "line-through opacity-70")}>
                {swatch}
                <span>{it.name}</span>
                {it.value !== undefined && <b className="font-mono text-fg">{it.value}</b>}
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                {swatch}
                <span>{it.name}</span>
                {it.value !== undefined && <b className="font-mono text-fg">{it.value}</b>}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export interface ChartTable {
  head: string[];
  rows: (string | number)[][];
}

/**
 * Shared figure for the plot-based charts: plot slot, legend, "Show data table" fallback, status states and a polite
 * live region that announces the focused datum. The plot is kept left-to-right (axes read like numbers in RTL too).
 */
export function ChartFrame({
  label,
  plot,
  legend,
  table,
  announce,
  loading,
  empty,
  error,
  onRetry,
  height,
  plotRef,
  animate,
  className,
}: {
  label: string;
  plot: React.ReactNode;
  legend?: React.ReactNode;
  table?: ChartTable;
  announce?: string;
  loading?: boolean;
  empty?: boolean;
  error?: boolean | string;
  onRetry?: () => void;
  height: number;
  plotRef?: React.Ref<HTMLDivElement>;
  /** Resolved motion state, exposed as `data-animate` for styling and tests. */
  animate?: boolean;
  className?: string;
}) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  const [showTable, setShowTable] = React.useState(false);
  const id = React.useId();
  const status = loading ? (
    <div role="status" aria-label={c.loading} className="size-full animate-pulse rounded-sm bg-muted-bg motion-reduce:animate-none" />
  ) : error ? (
    <div role="alert" className="grid size-full place-content-center justify-items-center gap-2 text-sm text-danger">
      <span>{typeof error === "string" ? error : c.error}</span>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry}>
          {c.retry}
        </Button>
      )}
    </div>
  ) : empty ? (
    <div className="grid size-full place-items-center text-sm text-muted">{c.empty}</div>
  ) : null;
  return (
    <figure aria-label={label} aria-busy={loading || undefined} data-animate={animate === undefined ? undefined : animate ? "on" : "off"} className={cn("m-0 grid min-w-0 grid-cols-1 gap-2", className)}>
      <div ref={plotRef} dir="ltr" className="relative min-w-0" style={{ height }}>
        {status ?? plot}
      </div>
      {!status && legend}
      {!status && table && (
        <>
          <button type="button" aria-expanded={showTable} aria-controls={`${id}-table`} onClick={() => setShowTable((v) => !v)} className="inline-flex items-center gap-1.5 justify-self-start border-0 bg-transparent p-0.5 text-xs text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50">
            {showTable ? <BarChart3 aria-hidden className="size-3.5" /> : <TableProperties aria-hidden className="size-3.5" />}
            {showTable ? c.hideData : c.showData}
          </button>
          <div id={`${id}-table`} hidden={!showTable} className="max-h-60 overflow-auto">
            {showTable && (
              <table className="w-full border-collapse text-xs tabular-nums">
                <caption className="sr-only">{label}</caption>
                <thead>
                  <tr>
                    {table.head.map((h) => (
                      <th key={h} scope="col" className="border-b border-line px-2 py-1 text-start font-medium text-muted">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((r, i) => (
                    <tr key={i}>
                      {r.map((cell, j) =>
                        j === 0 ? (
                          <th key={j} scope="row" className="border-b border-line px-2 py-1 text-start font-normal">
                            {cell}
                          </th>
                        ) : (
                          <td key={j} className="border-b border-line px-2 py-1 text-start">
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
      <div className="sr-only" role="status" aria-live="polite">
        {announce}
      </div>
    </figure>
  );
}
