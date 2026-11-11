import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import * as React from "react";
import { cn } from "../cn";
import { chartTone, ChartFrame, ChartLegend, ChartTooltip, useActiveIndex, useChartLaf, useChartWidth, type LegendItem } from "./chart-kit";

export interface BarSeries {
  id: string;
  name: string;
  data: number[];
}

export interface BarChartProps {
  categories: string[];
  series: BarSeries[];
  /** Stack series on top of each other; default is grouped (side by side). */
  stacked?: boolean;
  orientation?: "vertical" | "horizontal";
  formatValue?: (v: number) => string;
  label: string;
  height?: number;
  /** Fixed width in px; measured from the container when omitted. */
  width?: number;
  /** Show the legend (entries toggle their series); default true. */
  legend?: boolean;
  loading?: boolean;
  error?: boolean | string;
  onRetry?: () => void;
  className?: string;
}

const M = { top: 8, right: 12, bottom: 24, left: 44 };

const tick = { fill: "currentColor", fontSize: 10 } as const;

/** Grouped, stacked, vertical or horizontal bars. Focus the chart and use the arrow keys to walk the categories. */
export function BarChart({ categories, series, stacked, orientation = "vertical", formatValue = (v) => String(Math.round(v * 10) / 10), label, height = 240, width: widthProp, legend = true, loading, error, onRetry, className }: BarChartProps) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  const [wrap, width] = useChartWidth(widthProp);
  const [hidden, setHidden] = React.useState<string[]>([]);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const hintId = React.useId();
  const nav = useActiveIndex(categories.length);
  const horizontal = orientation === "horizontal";
  const margin = { ...M, left: horizontal ? 72 : M.left };
  const shown = series.filter((s) => !hidden.includes(s.id));
  const innerW = Math.max(width - margin.left - margin.right, 10);
  const innerH = Math.max(height - margin.top - margin.bottom, 10);
  const along = horizontal ? innerH : innerW;
  const across = horizontal ? innerW : innerH;

  const totals = categories.map((_, i) => shown.reduce((a, s) => a + (s.data[i] ?? 0), 0));
  const maxV = Math.max(1, ...(stacked ? totals : shown.flatMap((s) => s.data)));
  const band = scaleBand<string>({ domain: categories, range: [0, along], padding: 0.25 });
  const inner = scaleBand<string>({ domain: shown.map((s) => s.id), range: [0, band.bandwidth()], padding: 0.1 });
  const val = scaleLinear<number>({ domain: [0, maxV], range: horizontal ? [0, across] : [across, 0], nice: true });
  const tones = (s: BarSeries) => chartTone(series.indexOf(s));

  const rects = categories.flatMap((cat, ci) => {
    let acc = 0;
    return shown.map((s, si) => {
      const v = s.data[ci] ?? 0;
      const lo = stacked ? acc : 0;
      if (stacked) acc += v;
      const hi = lo + v;
      const pos = band(cat)! + (stacked ? 0 : (inner(s.id) ?? 0));
      const thick = stacked ? band.bandwidth() : inner.bandwidth();
      const a = val(lo);
      const b = val(hi);
      return {
        key: `${cat}-${s.id}`,
        s,
        si,
        ci,
        v,
        x: horizontal ? Math.min(a, b) : pos,
        y: horizontal ? pos : Math.min(a, b),
        w: horizontal ? Math.abs(b - a) : thick,
        h: horizontal ? thick : Math.abs(b - a),
      };
    });
  });

  const rows = (i: number) => shown.map((s) => ({ name: s.name, value: formatValue(s.data[i] ?? 0), tone: tones(s) }));
  const cat = nav.active === null ? null : categories[nav.active];
  const announce = cat === null || cat === undefined ? "" : `${cat}: ${rows(nav.active!).map((r) => c.point(r.name, r.value)).join(", ")}`;
  const bandCenter = nav.active === null ? 0 : (band(categories[nav.active]!) ?? 0) + band.bandwidth() / 2;
  const tipX = horizontal ? margin.left + innerW / 2 : margin.left + bandCenter;
  const tipY = horizontal ? margin.top + bandCenter + 8 : margin.top;

  const onPointerMove = (e: React.PointerEvent) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const p = horizontal ? e.clientY - r.top - margin.top : e.clientX - r.left - margin.left;
    const i = Math.floor(p / (along / categories.length));
    nav.setKeyboard(false);
    nav.setActive(i >= 0 && i < categories.length ? i : null);
  };

  const legendItems: LegendItem[] = series.map((s, i) => ({ id: s.id, name: s.name, tone: chartTone(i) }));

  return (
    <ChartFrame
      label={label}
      className={className}
      height={height}
      plotRef={wrap}
      loading={loading}
      error={error}
      onRetry={onRetry}
      empty={!categories.length || !series.length}
      announce={nav.keyboard ? announce : ""}
      legend={legend && <ChartLegend items={legendItems} hidden={hidden} onToggle={(id) => setHidden((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]))} />}
      table={{ head: [c.category, ...series.map((s) => s.name)], rows: categories.map((name, i) => [name, ...series.map((s) => formatValue(s.data[i] ?? 0))]) }}
      plot={
        <>
          <svg
            ref={svgRef}
            width={width}
            height={height}
            role="img"
            aria-label={label}
            aria-describedby={hintId}
            tabIndex={0}
            className="text-muted outline-none select-none focus-visible:outline-2 focus-visible:outline-primary"
            onKeyDown={nav.onKeyDown}
            onBlur={nav.onBlur}
            onPointerMove={onPointerMove}
            onPointerLeave={() => !nav.keyboard && nav.setActive(null)}
          >
            <Group left={margin.left} top={margin.top}>
              {val.ticks(4).map((tv) => (
                <line key={tv} x1={horizontal ? val(tv) : 0} x2={horizontal ? val(tv) : innerW} y1={horizontal ? 0 : val(tv)} y2={horizontal ? innerH : val(tv)} stroke="var(--border)" />
              ))}
              {nav.active !== null && (
                <rect data-active={categories[nav.active]} x={horizontal ? 0 : band(categories[nav.active]!)! - 2} y={horizontal ? band(categories[nav.active]!)! - 2 : 0} width={horizontal ? innerW : band.bandwidth() + 4} height={horizontal ? band.bandwidth() + 4 : innerH} fill="var(--bg-muted)" opacity={0.6} />
              )}
              {rects.map((r) => (
                <rect key={r.key} x={r.x} y={r.y} width={Math.max(r.w, 0)} height={Math.max(r.h, 0)} rx={1} fill="currentColor" className={cn(tones(r.s), "motion-safe:transition-[height,width,y,x] motion-safe:duration-300")} />
              ))}
              {horizontal ? (
                <>
                  <AxisLeft scale={band} stroke="var(--border-strong)" tickStroke="var(--border-strong)" tickLabelProps={{ ...tick, textAnchor: "end", dy: "0.33em" }} />
                  <AxisBottom top={innerH} scale={val} numTicks={4} tickFormat={(v) => formatValue(v as number)} stroke="var(--border-strong)" tickStroke="var(--border-strong)" tickLabelProps={{ ...tick, textAnchor: "middle" }} />
                </>
              ) : (
                <>
                  <AxisBottom top={innerH} scale={band} stroke="var(--border-strong)" tickStroke="var(--border-strong)" tickLabelProps={{ ...tick, textAnchor: "middle" }} />
                  <AxisLeft scale={val} numTicks={4} tickFormat={(v) => formatValue(v as number)} stroke="var(--border-strong)" tickStroke="var(--border-strong)" tickLabelProps={{ ...tick, textAnchor: "end", dy: "0.33em" }} />
                </>
              )}
            </Group>
          </svg>
          {nav.active !== null && <ChartTooltip x={tipX} y={tipY} title={categories[nav.active]} rows={rows(nav.active)} />}
          <span id={hintId} className="sr-only">{c.keyboardHint}</span>
        </>
      }
    />
  );
}
