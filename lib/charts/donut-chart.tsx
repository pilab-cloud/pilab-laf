import { Pie } from "@visx/shape";
import * as React from "react";
import { cn } from "../cn";
import { chartTone, ChartFrame, ChartLegend, ChartTooltipFor, entryAnim, motionVars, tweenClass, useActiveIndex, useChartLaf, useChartMotion, useTweenedNumbers, type ChartAnimate, type ChartTooltipContext, type ChartTooltipOption, type LegendItem } from "./chart-kit";

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
  /** Arcs sweep in; value changes tween; off under `prefers-reduced-motion`. Default on. */
  animate?: ChartAnimate;
  /** Tooltip per segment: `false`, a render function or `{formatter, header}`. Default on. */
  tooltip?: ChartTooltipOption;
  loading?: boolean;
  error?: boolean | string;
  onRetry?: () => void;
  className?: string;
}

/** Donut with centre label and legend; arrow keys walk the segments, the legend toggles them. */
export function DonutChart({ data, centerLabel, centerValue, formatValue = (v) => String(Math.round(v * 10) / 10), label, size = 200, thickness = 28, legend = true, animate, tooltip = true, loading, error, onRetry, className }: DonutChartProps) {
  const { t, format } = useChartLaf();
  const c = t.components.dashboard.chart;
  const [hidden, setHidden] = React.useState<string[]>([]);
  const shown = data.filter((d) => !hidden.includes(d.id) && d.value > 0);
  const total = shown.reduce((a, d) => a + d.value, 0);
  const box = React.useRef<HTMLDivElement>(null);
  const nav = useActiveIndex(shown.length, box);
  const motion = useChartMotion(animate);
  const tweened = useTweenedNumbers(shown.map((d) => d.value), motion);
  const drawn = shown.map((d, i) => ({ ...d, value: tweened[i] ?? d.value }));
  const hintId = React.useId();
  const tipId = React.useId();
  const maskId = `${React.useId().replace(/:/g, "")}-sweep`;
  const r = size / 2;
  const line = (d: DonutDatum) => `${d.name}: ${formatValue(d.value)} (${format.percent(total ? d.value / total : 0, { fractionDigits: 1 })})`;
  const active = nav.active === null ? null : shown[nav.active];
  const toneOf = (d: DonutDatum) => chartTone(data.findIndex((x) => x.id === d.id));
  const share = (d: DonutDatum) => format.percent(total ? d.value / total : 0, { fractionDigits: 1 });
  const ctx: ChartTooltipContext | null = active
    ? { point: { label: active.name, x: active.id, value: active.value, formatted: formatValue(active.value) }, index: nav.active!, series: [{ id: active.id, name: c.value, value: active.value, formatted: `${formatValue(active.value)} (${share(active)})`, tone: toneOf(active) }] }
    : null;
  const tipOn = !!ctx && tooltip !== false;
  let before = 0;
  for (let i = 0; i < (nav.active ?? 0); i++) before += shown[i]!.value;
  const mid = active && total ? ((before + active.value / 2) / total) * 2 * Math.PI : 0;
  const rm = r - thickness / 2;
  const legendItems: LegendItem[] = data.map((d, i) => ({ id: d.id, name: d.name, tone: chartTone(i), value: formatValue(d.value) }));

  return (
    <ChartFrame
      label={label}
      className={className}
      height={size}
      animate={motion.enabled}
      loading={loading}
      error={error}
      onRetry={onRetry}
      empty={!data.length || data.every((d) => d.value <= 0)}
      announce={nav.keyboard && active ? line(active) : ""}
      legend={legend && <ChartLegend items={legendItems} hidden={hidden} onToggle={(id) => setHidden((h) => (h.includes(id) ? h.filter((x) => x !== id) : [...h, id]))} />}
      table={{ head: [c.category, c.value, c.share], rows: data.map((d) => [d.name, formatValue(d.value), format.percent(total ? d.value / total : 0, { fractionDigits: 1 })]) }}
      plot={
        <div ref={box} className="relative mx-auto" style={{ width: size, height: size, ...motionVars(motion) }}>
          <svg
            width={size}
            height={size}
            role="img"
            aria-label={label}
            aria-describedby={tipOn ? `${hintId} ${tipId}` : hintId}
            tabIndex={0}
            className="text-muted outline-none focus-visible:outline-2 focus-visible:outline-primary"
            onKeyDown={nav.onKeyDown}
            onBlur={nav.onBlur}
            onPointerLeave={(e) => e.pointerType !== "touch" && !nav.keyboard && nav.setActive(null)}
          >
            {motion.enabled && (
              <defs>
                <mask id={maskId}>
                  <circle r={r / 2} cx={r} cy={r} fill="none" stroke="white" strokeWidth={r + 4} pathLength={100} strokeDasharray="100 100" transform={`rotate(-90 ${r} ${r})`} {...entryAnim(motion, "sweep")} />
                </mask>
              </defs>
            )}
            <g transform={`translate(${r} ${r})`} mask={motion.enabled ? `url(#${maskId})` : undefined}>
              <Pie data={drawn} pieValue={(d) => d.value} outerRadius={r - 2} innerRadius={r - thickness} padAngle={shown.length > 1 ? 0.02 : 0} pieSort={null}>
                {(pie) =>
                  pie.arcs.map((arc, i) => (
                    <path
                      key={arc.data.id}
                      d={pie.path(arc) ?? undefined}
                      fill="currentColor"
                      className={cn(toneOf(arc.data), tweenClass(motion), nav.active !== null && nav.active !== i && "opacity-40")}
                      onPointerEnter={() => (nav.setKeyboard(false), nav.setActive(i))}
                      onPointerDown={() => (nav.setKeyboard(false), nav.setActive(i))}
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
          {tipOn && <ChartTooltipFor option={tooltip} ctx={ctx} x={r + Math.sin(mid) * rm} y={r - Math.cos(mid) * rm} id={tipId} container={box} />}
          <span id={hintId} className="sr-only">{c.keyboardHint}</span>
        </div>
      }
    />
  );
}
