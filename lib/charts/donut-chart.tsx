import { Pie } from "@visx/shape";
import * as React from "react";
import { cn } from "../cn";
import { chartTone, ChartFrame, ChartLegend, ChartTooltip, useActiveIndex, useChartLaf, type LegendItem } from "./chart-kit";

export interface DonutDatum {
  id: string;
  name: string;
  value: number;
}

export interface DonutChartProps {
  data: DonutDatum[];
  /** Text under the centre value; default the localised "Total". */
  centerLabel?: React.ReactNode;
  /** Centre value; default the sum of the (visible) data. */
  centerValue?: React.ReactNode;
  formatValue?: (v: number) => string;
  label: string;
  /** Diameter in px. */
  size?: number;
  /** Ring thickness in px. */
  thickness?: number;
  legend?: boolean;
  loading?: boolean;
  error?: boolean | string;
  onRetry?: () => void;
  className?: string;
}

/** Donut with centre label and legend; arrow keys walk the segments, the legend toggles them. */
export function DonutChart({ data, centerLabel, centerValue, formatValue = (v) => String(Math.round(v * 10) / 10), label, size = 200, thickness = 28, legend = true, loading, error, onRetry, className }: DonutChartProps) {
  const { t, format } = useChartLaf();
  const c = t.components.dashboard.chart;
  const [hidden, setHidden] = React.useState<string[]>([]);
  const shown = data.filter((d) => !hidden.includes(d.id) && d.value > 0);
  const total = shown.reduce((a, d) => a + d.value, 0);
  const nav = useActiveIndex(shown.length);
  const hintId = React.useId();
  const r = size / 2;
  const line = (d: DonutDatum) => `${d.name}: ${formatValue(d.value)} (${format.percent(total ? d.value / total : 0, { fractionDigits: 1 })})`;
  const active = nav.active === null ? null : shown[nav.active];
  const toneOf = (d: DonutDatum) => chartTone(data.indexOf(d));
  const legendItems: LegendItem[] = data.map((d, i) => ({ id: d.id, name: d.name, tone: chartTone(i), value: formatValue(d.value) }));

  return (
    <ChartFrame
      label={label}
      className={className}
      height={size}
      loading={loading}
      error={error}
      onRetry={onRetry}
      empty={!data.length || data.every((d) => d.value <= 0)}
      announce={nav.keyboard && active ? line(active) : ""}
      legend={legend && <ChartLegend items={legendItems} hidden={hidden} onToggle={(id) => setHidden((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]))} />}
      table={{ head: [c.category, c.value, c.share], rows: data.map((d) => [d.name, formatValue(d.value), format.percent(total ? d.value / total : 0, { fractionDigits: 1 })]) }}
      plot={
        <div className="relative mx-auto" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            role="img"
            aria-label={label}
            aria-describedby={hintId}
            tabIndex={0}
            className="text-muted outline-none focus-visible:outline-2 focus-visible:outline-primary"
            onKeyDown={nav.onKeyDown}
            onBlur={nav.onBlur}
            onPointerLeave={() => !nav.keyboard && nav.setActive(null)}
          >
            <g transform={`translate(${r} ${r})`}>
              <Pie data={shown} pieValue={(d) => d.value} outerRadius={r - 2} innerRadius={r - thickness} padAngle={shown.length > 1 ? 0.02 : 0} pieSort={null}>
                {(pie) =>
                  pie.arcs.map((arc, i) => (
                    <path
                      key={arc.data.id}
                      d={pie.path(arc) ?? undefined}
                      fill="currentColor"
                      className={cn(toneOf(arc.data), "motion-safe:transition-opacity motion-safe:duration-200", nav.active !== null && nav.active !== i && "opacity-50")}
                      onPointerEnter={() => (nav.setKeyboard(false), nav.setActive(i))}
                    />
                  ))
                }
              </Pie>
            </g>
          </svg>
          <div aria-hidden className="pointer-events-none absolute inset-0 grid place-content-center text-center leading-tight">
            <span className="text-xl font-semibold tabular-nums">{active ? formatValue(active.value) : (centerValue ?? formatValue(total))}</span>
            <span className="max-w-24 truncate text-xs text-muted">{active ? active.name : (centerLabel ?? c.total)}</span>
          </div>
          {active && <ChartTooltip x={r} y={-4} title={active.name} rows={[{ name: c.value, value: formatValue(active.value), tone: toneOf(active) }, { name: c.share, value: format.percent(total ? active.value / total : 0, { fractionDigits: 1 }) }]} className="-translate-y-full" />}
          <span id={hintId} className="sr-only">{c.keyboardHint}</span>
        </div>
      }
    />
  );
}
