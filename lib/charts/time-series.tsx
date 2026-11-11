import { AxisBottom, AxisLeft, AxisRight } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Area, LinePath } from "@visx/shape";
import * as React from "react";
import { cn } from "../cn";
import type { Formatters } from "../foundation-format";
import { useLafDefaults } from "../i18n";
import { chartsEn } from "../messages/charts.en";
import { useControllableState } from "../utils";
import { downsample, type Point } from "./lttb";

const lafDefaults = { charts: chartsEn };
const useLaf = () => useLafDefaults(lafDefaults);

export type ChartUnit = "%" | "bytes" | "bitrate" | "hz" | "ms" | "count";

export interface TimeSeries {
  id: string;
  name: string;
  unit: ChartUnit;
  points: Point[];
}

export interface ChartRange {
  from: number;
  to: number;
}

export interface TimeSeriesChartLabels {
  showData: string;
  hideData: string;
  resetZoom: string;
  noData: string;
  time: string;
  loading: string;
  keyboardHint: string;
  legend: string;
}

export interface TimeSeriesChartProps {
  series: TimeSeries[];
  type?: "line" | "area" | "stacked-area";
  /** Visible time window (epoch ms); omit for uncontrolled (full extent, brush zoom updates it). */
  range?: ChartRange;
  onRangeChange?: (range: ChartRange) => void;
  thresholds?: { value: number; tone: "warn" | "danger" }[];
  hiddenSeries?: string[];
  onHiddenSeriesChange?: (ids: string[]) => void;
  loading?: boolean;
  label: string;
  height?: number;
  /** Fixed width in px; measured from the container when omitted. */
  width?: number;
  /** Rows shown in the data-table alternative. */
  maxTableRows?: number;
  labels?: Partial<TimeSeriesChartLabels>;
  className?: string;
}

export const SERIES_TONES = ["text-primary", "text-ok", "text-warn", "text-danger"] as const;
export const SERIES_DASH = [undefined, "4 2", "1 3", "6 2 1 2"] as const;

const MARGIN = { top: 8, bottom: 24, left: 56, right: 12, right2: 56 };

export function formatUnit(f: Formatters, unit: ChartUnit, v: number): string {
  const r = (n: number) => Math.round(n * 10) / 10;
  switch (unit) {
    case "%":
      return `${r(v)}%`;
    case "bytes":
      return f.bytes(v, { base: 1024 });
    case "bitrate":
      return f.bitrate(v);
    case "hz":
      return f.frequency(v);
    case "ms":
      return Math.abs(v) < 1000 ? `${r(v)} ms` : f.duration(v);
    default:
      return Number.isInteger(v) ? String(v) : String(r(v));
  }
}

function useWidth(fixed: number | undefined) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [w, setW] = React.useState(640);
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

/** Index of the point whose time is closest to `t` (points sorted by time, non-empty). */
function nearest(points: Point[], t: number): number {
  let lo = 0;
  let hi = points.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (points[mid]![0] < t) lo = mid + 1;
    else hi = mid;
  }
  if (lo > 0 && Math.abs(points[lo - 1]![0] - t) <= Math.abs(points[lo]![0] - t)) return lo - 1;
  return lo;
}

export function TimeSeriesChart({
  series,
  type = "line",
  range: rangeProp,
  onRangeChange,
  thresholds = [],
  hiddenSeries: hiddenProp,
  onHiddenSeriesChange,
  loading,
  label,
  height = 240,
  width: widthProp,
  maxTableRows = 200,
  labels: labelsProp,
  className,
}: TimeSeriesChartProps) {
  const { format, locale, timeZone, t: laf } = useLaf();
  const l = { ...laf.components.charts.timeSeries, ...labelsProp };
  const uid = React.useId();
  const [wrap, width] = useWidth(widthProp);
  const [hidden, setHidden] = useControllableState<string[]>({ value: hiddenProp, defaultValue: [], onChange: onHiddenSeriesChange });
  const [zoom, setZoom] = useControllableState<ChartRange | null>({ value: rangeProp, defaultValue: null, onChange: (r) => r && onRangeChange?.(r) });
  const [cursor, setCursor] = React.useState<number | null>(null);
  const [sel, setSel] = React.useState<ChartRange | null>(null);
  const [kbd, setKbd] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false);
  const drag = React.useRef<{ anchor: number; moved: boolean } | null>(null);
  const anchor = React.useRef<number | null>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const full = React.useMemo<ChartRange | null>(() => {
    let from = Infinity;
    let to = -Infinity;
    for (const s of series) {
      for (const [t] of s.points) {
        if (t < from) from = t;
        if (t > to) to = t;
      }
    }
    return from <= to ? { from, to: to === from ? to + 1 : to } : null;
  }, [series]);
  const domain = zoom ?? full;
  const zoomed = !!zoom && !!full && (zoom.from > full.from || zoom.to < full.to);

  const shown = React.useMemo(() => series.filter((s) => !hidden.includes(s.id)), [series, hidden]);
  const stacked = type === "stacked-area";
  const units = React.useMemo(() => {
    const u: ChartUnit[] = [];
    for (const s of shown) if (!u.includes(s.unit)) u.push(s.unit);
    return stacked ? u.slice(0, 1) : u;
  }, [shown, stacked]);
  const axisOf = (u: ChartUnit) => (stacked ? 0 : Math.min(Math.max(units.indexOf(u), 0), 1));
  const dual = !stacked && units.length > 1;

  const innerW = Math.max(width - MARGIN.left - (dual ? MARGIN.right2 : MARGIN.right), 10);
  const innerH = Math.max(height - MARGIN.top - MARGIN.bottom, 10);

  // Visible (range-clipped) raw points per series.
  const visible = React.useMemo(
    () => shown.map((s) => (domain ? s.points.filter(([t]) => t >= domain.from && t <= domain.to) : s.points)),
    [shown, domain],
  );

  // Union of timestamps, used for the crosshair, stacking and the table.
  const stamps = React.useMemo(() => {
    const set = new Set<number>();
    for (const pts of visible) for (const [t] of pts) set.add(t);
    return [...set].sort((a, b) => a - b);
  }, [visible]);

  const lookups = React.useMemo(() => visible.map((pts) => new Map(pts)), [visible]);

  const stackedRows = React.useMemo(() => {
    if (!stacked) return null;
    const step = Math.max(1, Math.ceil(stamps.length / (innerW * 2)));
    const ts = stamps.filter((_, i) => i % step === 0 || i === stamps.length - 1);
    return ts.map((t) => {
      let acc = 0;
      const layers = lookups.map((m) => {
        const y0 = acc;
        acc += m.get(t) ?? 0;
        return [y0, acc] as const;
      });
      return { t, layers };
    });
  }, [stacked, stamps, lookups, innerW]);

  const lines = React.useMemo(() => (stacked ? [] : visible.map((pts) => downsample(pts, Math.max(Math.floor(innerW), 3)))), [stacked, visible, innerW]);

  const x = React.useMemo(() => scaleLinear<number>({ domain: [domain?.from ?? 0, domain?.to ?? 1], range: [0, innerW] }), [domain, innerW]);

  const ys = React.useMemo(() => {
    return [0, 1].map((axis) => {
      let min = Infinity;
      let max = -Infinity;
      shown.forEach((s, i) => {
        if (axisOf(s.unit) !== axis) return;
        if (stacked) {
          for (const row of stackedRows ?? []) max = Math.max(max, row.layers[i]![1]);
          min = Math.min(min, 0);
        } else for (const [, v] of visible[i]!) if (v !== null) (min = Math.min(min, v)), (max = Math.max(max, v));
      });
      if (axis === 0) for (const th of thresholds) (min = Math.min(min, th.value)), (max = Math.max(max, th.value));
      if (!Number.isFinite(max)) (min = 0), (max = 1);
      const lo = Math.min(min, 0);
      const hi = max <= lo ? lo + 1 : max + (max - lo) * 0.05;
      return scaleLinear<number>({ domain: [lo, hi], range: [innerH, 0], nice: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, visible, stackedRows, thresholds, innerH, type, stacked, units]);

  const tickT = React.useMemo(() => {
    const span = domain ? domain.to - domain.from : 0;
    const dtf = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      ...(span > 2 * 86_400_000 ? { month: "short", day: "numeric" } : span < 120_000 ? { second: "2-digit" } : {}),
    });
    return (v: number) => dtf.format(v);
  }, [domain, locale, timeZone]);
  const fullT = React.useMemo(() => {
    const dtf = new Intl.DateTimeFormat(locale, { timeZone, dateStyle: "medium", timeStyle: "medium" });
    return (v: number) => dtf.format(v);
  }, [locale, timeZone]);

  const clampT = (px: number) => (domain ? Math.min(domain.to, Math.max(domain.from, x.invert(px))) : 0);
  const localX = (e: React.PointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    return e.clientX - (rect?.left ?? 0) - MARGIN.left;
  };

  const applySel = (r: ChartRange | null) => {
    if (r && r.to > r.from) setZoom({ from: r.from, to: r.to });
    setSel(null);
    anchor.current = null;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!domain || e.button > 0) return;
    const px = localX(e);
    drag.current = { anchor: clampT(px), moved: false };
    setKbd(false);
    try {
      svgRef.current?.setPointerCapture?.(e.pointerId);
    } catch {
      /* not capturable */
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!domain || !stamps.length) return;
    const t = clampT(localX(e));
    setCursor(t);
    setKbd(false);
    const d = drag.current;
    if (d) {
      if (Math.abs(x(t) - x(d.anchor)) > 3) d.moved = true;
      if (d.moved) setSel({ from: Math.min(d.anchor, t), to: Math.max(d.anchor, t) });
    }
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved && sel) applySel(sel);
    else setSel(null);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!stamps.length) return;
    const cur = cursor ?? stamps[0]!;
    const idx = nearest(stamps.map((t) => [t, 0] as Point), cur);
    const go = (i: number) => {
      const t = stamps[Math.min(stamps.length - 1, Math.max(0, i))]!;
      if (e.shiftKey) {
        anchor.current ??= cur;
        setSel({ from: Math.min(anchor.current, t), to: Math.max(anchor.current, t) });
      }
      setCursor(t);
      setKbd(true);
      e.preventDefault();
    };
    if (e.key === "ArrowRight") go(cursor === null ? 0 : idx + 1);
    else if (e.key === "ArrowLeft") go(cursor === null ? stamps.length - 1 : idx - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(stamps.length - 1);
    else if (e.key === "Enter" && sel) {
      applySel(sel);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setSel(null);
      setCursor(null);
      anchor.current = null;
    }
  };
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Shift") anchor.current = null;
  };

  const resetZoom = () => full && setZoom({ ...full });

  const toggle = (id: string) => setHidden(hidden.includes(id) ? hidden.filter((h) => h !== id) : [...hidden, id]);

  const unitFor = (u: ChartUnit) => (v: number) => formatUnit(format, u, v);
  const axisUnit = (axis: number) => units[axis] ?? units[0] ?? "count";

  // Tooltip rows at the cursor.
  const tip = React.useMemo(() => {
    if (cursor === null || !stamps.length) return null;
    const t = stamps[nearest(stamps.map((s) => [s, 0] as Point), cursor)]!;
    const rows = shown.map((s, i) => {
      const pts = visible[i]!;
      let v: number | null = null;
      if (pts.length) {
        const p = pts[nearest(pts, t)]!;
        const tol = pts.length > 1 ? (pts[pts.length - 1]![0] - pts[0]![0]) / (pts.length - 1) : Infinity;
        v = Math.abs(p[0] - t) <= tol ? p[1] : null;
      }
      return { s, i, v };
    });
    return { t, rows };
  }, [cursor, stamps, shown, visible]);
  const tipText = tip ? `${fullT(tip.t)}: ${tip.rows.map((r) => `${r.s.name} ${r.v === null ? "–" : formatUnit(format, r.s.unit, r.v)}`).join(", ")}` : "";

  const tableRows = stamps.length > maxTableRows ? stamps.filter((_, i) => i % Math.ceil(stamps.length / maxTableRows) === 0) : stamps;
  const tableId = `${uid}-table`;
  const hintId = `${uid}-hint`;
  const empty = !loading && (!domain || series.every((s) => s.points.length === 0));
  const tipLeft = tip ? MARGIN.left + x(tip.t) : 0;

  return (
    <figure aria-label={label} aria-busy={loading || undefined} className={cn("m-0 grid grid-cols-1 gap-2", className)}>
      <div ref={wrap} className="relative min-w-0" style={{ height }}>
        {loading ? (
          <div role="status" aria-label={l.loading} className="size-full animate-pulse rounded-sm bg-muted-bg" />
        ) : empty ? (
          <div className="grid size-full place-items-center text-sm text-muted">{l.noData}</div>
        ) : (
          <>
            <svg
              ref={svgRef}
              width={width}
              height={height}
              role="img"
              aria-label={label}
              aria-describedby={hintId}
              tabIndex={0}
              className="touch-none text-muted select-none focus-visible:outline-2 focus-visible:outline-primary"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={() => {
                if (!drag.current) setCursor(null);
              }}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              onBlur={() => {
                setKbd(false);
                anchor.current = null;
              }}
            >
              <Group left={MARGIN.left} top={MARGIN.top}>
                {ys[0]!.ticks(4).map((tv) => (
                  <line key={tv} x1={0} x2={innerW} y1={ys[0]!(tv)} y2={ys[0]!(tv)} stroke="var(--border)" />
                ))}
                {thresholds.map((th) => (
                  <line
                    key={`${th.tone}-${th.value}`}
                    data-threshold={th.tone}
                    x1={0}
                    x2={innerW}
                    y1={ys[0]!(th.value)}
                    y2={ys[0]!(th.value)}
                    stroke="currentColor"
                    strokeDasharray="6 3"
                    className={th.tone === "danger" ? "text-danger" : "text-warn"}
                  />
                ))}
                {stacked
                  ? shown.map((s, i) => (
                      <Area
                        key={s.id}
                        data={stackedRows ?? []}
                        x={(d) => x(d.t)}
                        y0={(d) => ys[0]!(d.layers[i]![0])}
                        y1={(d) => ys[0]!(d.layers[i]![1])}
                        fill="currentColor"
                        fillOpacity={0.45}
                        stroke="currentColor"
                        className={SERIES_TONES[series.indexOf(s) % 4]}
                      />
                    ))
                  : shown.map((s, i) => {
                      const si = series.indexOf(s);
                      const ys_ = ys[axisOf(s.unit)]!;
                      const tone = SERIES_TONES[si % 4];
                      return (
                        <g key={s.id} className={tone} data-series={s.id}>
                          {type === "area" && (
                            <Area<Point>
                              data={lines[i]!}
                              defined={(d) => d[1] !== null}
                              x={(d) => x(d[0])}
                              y0={ys_(Math.max(ys_.domain()[0]!, 0))}
                              y1={(d) => ys_(d[1] as number)}
                              fill="currentColor"
                              fillOpacity={0.15}
                            />
                          )}
                          <LinePath<Point>
                            data={lines[i]!}
                            defined={(d) => d[1] !== null}
                            x={(d) => x(d[0])}
                            y={(d) => ys_(d[1] as number)}
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeDasharray={SERIES_DASH[si % 4]}
                          />
                        </g>
                      );
                    })}
                <AxisBottom top={innerH} scale={x} numTicks={Math.max(2, Math.floor(innerW / 90))} tickFormat={(v) => tickT(v as number)} stroke="var(--border-strong)" tickStroke="var(--border-strong)" tickLabelProps={{ fill: "currentColor", fontSize: 10, textAnchor: "middle" }} />
                <AxisLeft scale={ys[0]!} numTicks={4} tickFormat={(v) => unitFor(axisUnit(0))(v as number)} stroke="var(--border-strong)" tickStroke="var(--border-strong)" tickLabelProps={{ fill: "currentColor", fontSize: 10, textAnchor: "end", dy: "0.33em" }} />
                {dual && <AxisRight left={innerW} scale={ys[1]!} numTicks={4} tickFormat={(v) => unitFor(axisUnit(1))(v as number)} stroke="var(--border-strong)" tickStroke="var(--border-strong)" tickLabelProps={{ fill: "currentColor", fontSize: 10, textAnchor: "start", dy: "0.33em" }} />}
                {sel && <rect data-brush x={x(sel.from)} y={0} width={Math.max(x(sel.to) - x(sel.from), 1)} height={innerH} fill="currentColor" fillOpacity={0.15} className="text-primary" />}
                {tip && (
                  <g pointerEvents="none">
                    <line x1={x(tip.t)} x2={x(tip.t)} y1={0} y2={innerH} stroke="var(--border-strong)" />
                    {tip.rows.map(
                      (r) =>
                        r.v !== null && (
                          <circle key={r.s.id} cx={x(tip.t)} cy={stacked ? ys[0]!(stackedRows?.find((row) => row.t === tip.t)?.layers[r.i]?.[1] ?? r.v) : ys[axisOf(r.s.unit)]!(r.v)} r={3} fill="currentColor" className={SERIES_TONES[series.indexOf(r.s) % 4]} />
                        ),
                    )}
                  </g>
                )}
              </Group>
            </svg>
            <span id={hintId} className="sr-only">{l.keyboardHint}</span>
            {tip && (
              <div
                role="tooltip"
                className="pointer-events-none absolute top-2 z-10 min-w-36 rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-fg shadow-card"
                style={tipLeft > width / 2 ? { insetInlineStart: tipLeft - 8, transform: "translateX(-100%)" } : { insetInlineStart: tipLeft + 8 }}
              >
                <div className="mb-1 font-mono text-subtle">{fullT(tip.t)}</div>
                {tip.rows.map((r) => (
                  <div key={r.s.id} className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden className={cn("inline-block size-2 rounded-sm bg-current", SERIES_TONES[series.indexOf(r.s) % 4])} />
                      {r.s.name}
                    </span>
                    <b className="font-mono">{r.v === null ? "–" : formatUnit(format, r.s.unit, r.v)}</b>
                  </div>
                ))}
              </div>
            )}
            <span className="sr-only" aria-live="polite">{kbd ? tipText : ""}</span>
          </>
        )}
      </div>
      <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <div role="group" aria-label={l.legend} className="flex flex-wrap gap-x-3 gap-y-1">
          {series.map((s, si) => {
            const on = !hidden.includes(s.id);
            return (
              <React.Fragment key={s.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s.id)}
                  className={cn("inline-flex cursor-pointer items-center gap-1.5 rounded-sm border-0 bg-transparent p-0 text-xs text-muted hover:text-fg", !on && "opacity-50 line-through")}
                >
                  <svg width="16" height="4" aria-hidden className={SERIES_TONES[si % 4]}>
                    <line x1="0" x2="16" y1="2" y2="2" stroke="currentColor" strokeWidth="2" strokeDasharray={SERIES_DASH[si % 4]} />
                  </svg>
                  {s.name}
                </button>
              </React.Fragment>
            );
          })}
        </div>
        <span className="ms-auto inline-flex items-center gap-3">
          {zoomed && (
            <button type="button" className="cursor-pointer border-0 bg-transparent p-0 text-xs text-primary hover:underline" onClick={resetZoom}>
              {l.resetZoom}
            </button>
          )}
          <button type="button" aria-expanded={showTable} aria-controls={tableId} className="cursor-pointer border-0 bg-transparent p-0 text-xs text-primary hover:underline" onClick={() => setShowTable((v) => !v)}>
            {showTable ? l.hideData : l.showData}
          </button>
        </span>
      </figcaption>
      {showTable && (
        <div id={tableId} tabIndex={0} role="region" aria-label={`${label} — ${l.showData}`} className="max-h-60 overflow-auto rounded-md border border-line">
          <table className="w-full border-collapse text-start font-mono text-xs">
            <caption className="sr-only">{label}</caption>
            <thead className="sticky top-0 bg-surface">
              <tr>
                <th scope="col" className="px-2 py-1 text-start font-medium">{l.time}</th>
                {shown.map((s) => (
                  <th key={s.id} scope="col" className="px-2 py-1 text-end font-medium">{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((t) => (
                <tr key={t} className="border-t border-line">
                  <th scope="row" className="px-2 py-1 text-start font-normal text-subtle">{fullT(t)}</th>
                  {shown.map((s, i) => {
                    const v = lookups[i]!.get(t);
                    return (
                      <td key={s.id} className="px-2 py-1 text-end">{v === null || v === undefined ? "–" : formatUnit(format, s.unit, v)}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </figure>
  );
}
