import * as React from "react";
import { cn } from "../cn";
import { ChartLegend, ChartTooltipFor, chartTone, entryAnim, motionVars, tweenClass, useActiveIndex, useChartLaf, useChartMotion, type ChartAnimate, type ChartTooltipContext, type ChartTooltipOption, type LegendItem } from "./chart-kit";

export interface BarSegment {
  id: string;
  name: string;
  value: number;
  /** Tailwind `text-*` class used as the fill colour; default the label palette. */
  tone?: string;
}

export interface SegmentedBarProps {
  segments: BarSegment[];
  /** Accessible name; the summary (total and every segment) is appended automatically. */
  label: string;
  formatValue?: (v: number) => string;
  /** Show the legend list below the bar with the values. */
  legend?: boolean;
  /** Bar thickness in px. */
  height?: number;
  /** Segments grow in and re-size smoothly; off under `prefers-reduced-motion`. Default on. */
  animate?: ChartAnimate;
  /** Tooltip per segment (hover, tap, arrow keys): `false`, a render function or `{formatter, header}`. Default on. */
  tooltip?: ChartTooltipOption;
  className?: string;
}

/** One horizontal stacked bar with proportional segments; colours are backed by the legend names and values. Focus it and use the arrow keys to walk the segments. */
export function SegmentedBar({ segments, label, formatValue = (v) => String(v), legend = true, height = 16, animate, tooltip = true, className }: SegmentedBarProps) {
  const { t, format } = useChartLaf();
  const u = t.components.dashboard.utilization;
  const c = t.components.dashboard.chart;
  const motion = useChartMotion(animate);
  const box = React.useRef<HTMLDivElement>(null);
  const hintId = React.useId();
  const tipId = React.useId();
  const total = segments.reduce((a, s) => a + Math.max(0, s.value), 0);
  const toneOf = (s: BarSegment, i: number) => s.tone ?? chartTone(i);
  const visible = segments.map((s, i) => ({ s, i })).filter(({ s }) => s.value > 0);
  const nav = useActiveIndex(visible.length, box);
  const cur = nav.active === null ? null : visible[nav.active];
  const share = (v: number) => format.percent(total ? v / total : 0, { fractionDigits: 1 });
  const ctx: ChartTooltipContext | null = cur
    ? { point: { label: cur.s.name, x: cur.s.id, value: cur.s.value, formatted: formatValue(cur.s.value) }, index: nav.active!, series: [{ id: cur.s.id, name: c.value, value: cur.s.value, formatted: `${formatValue(cur.s.value)} (${share(cur.s.value)})`, tone: toneOf(cur.s, cur.i) }] }
    : null;
  const tipOn = !!ctx && tooltip !== false;
  const [anchorX, setAnchorX] = React.useState(0);
  React.useLayoutEffect(() => {
    const el = cur && Array.from(box.current?.querySelectorAll<HTMLElement>("[data-segment]") ?? []).find((e) => e.dataset.segment === cur.s.id);
    if (el) setAnchorX(el.offsetLeft + el.offsetWidth / 2);
  }, [cur]);
  const summary = u.barSummary(label, formatValue(total), segments.map((s) => u.percentLine(s.name, formatValue(s.value))).join(", "));
  const items: LegendItem[] = segments.map((s, i) => ({ id: s.id, name: s.name, tone: toneOf(s, i) }));
  return (
    <div className={cn("grid min-w-0 gap-2", className)} data-animate={motion.enabled ? "on" : "off"} style={motionVars(motion)}>
      <div ref={box} className="relative">
        <div
          role="img"
          aria-label={summary}
          aria-describedby={tipOn ? `${hintId} ${tipId}` : hintId}
          tabIndex={0}
          className="flex w-full overflow-hidden rounded-sm bg-muted-bg outline-none focus-visible:outline-2 focus-visible:outline-primary"
          style={{ height }}
          onKeyDown={nav.onKeyDown}
          onBlur={nav.onBlur}
          onPointerLeave={(e) => e.pointerType !== "touch" && !nav.keyboard && nav.setActive(null)}
        >
          {segments.map((s, i) => {
            if (s.value <= 0) return null;
            const k = visible.findIndex((v) => v.s === s);
            const enter = entryAnim(motion, "grow-x", k);
            return (
              <div
                key={s.id}
                aria-hidden
                data-segment={s.id}
                className={cn("h-full bg-current", toneOf(s, i), tweenClass(motion), enter.className, nav.active !== null && nav.active !== k && "opacity-40")}
                style={{ flexGrow: s.value, flexBasis: 0, ...enter.style }}
                onPointerEnter={() => (nav.setKeyboard(false), nav.setActive(k))}
                onPointerDown={() => (nav.setKeyboard(false), nav.setActive(k))}
              />
            );
          })}
        </div>
        {tipOn && <ChartTooltipFor option={tooltip} ctx={ctx} x={anchorX} y={0} id={tipId} container={box} />}
        <span id={hintId} className="sr-only">{c.keyboardHint}</span>
        <span className="sr-only" role="status" aria-live="polite">
          {nav.keyboard && cur ? `${cur.s.name}: ${formatValue(cur.s.value)} (${share(cur.s.value)})` : ""}
        </span>
      </div>
      {legend && <ChartLegend items={items} label={u.segments} />}
    </div>
  );
}
