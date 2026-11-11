import * as React from "react";
import { cn } from "../cn";
import { ChartLegend, ChartTooltipFor, entryAnim, motionVars, tweenClass, useChartLaf, useChartMotion, useTooltipDismiss, type ChartAnimate, type ChartTooltipContext, type ChartTooltipOption, type LegendItem } from "./chart-kit";

export interface ThresholdDonutProps {
  /** Current usage in the same unit as `max`. */
  value: number;
  max?: number;
  /** Warning / critical thresholds as percentages of `max`. */
  warnAt?: number;
  dangerAt?: number;
  /** Text under the centre value, e.g. "of 100 GBps". */
  subtext?: React.ReactNode;
  label: string;
  /** Diameter in px. */
  size?: number;
  /** Show the legend list beside the ring. */
  legend?: boolean;
  /** The usage arc sweeps in and re-sweeps on change; off under `prefers-reduced-motion`. Default on. */
  animate?: ChartAnimate;
  /** Tooltip with the usage and thresholds (hover, tap, focus): `false`, a render function or `{formatter, header}`. Default on. */
  tooltip?: ChartTooltipOption;
  className?: string;
}

export function thresholdTone(pct: number, warnAt: number, dangerAt: number) {
  return pct >= dangerAt ? "danger" : pct >= warnAt ? "warn" : "ok";
}

const toneClass = { ok: "text-primary", warn: "text-warn", danger: "text-danger" } as const;

/**
 * Usage ring with the value in the centre. The outer ring shows the warning and critical bands as muted arcs; the
 * inner arc is the usage, coloured by the band it is in. The legend lists the thresholds with numbers, so colour is never alone.
 */
export function ThresholdDonut({ value, max = 100, warnAt = 60, dangerAt = 90, subtext, label, size = 160, legend = true, animate, tooltip = true, className }: ThresholdDonutProps) {
  const { t, format } = useChartLaf();
  const u = t.components.dashboard.utilization;
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const tone = thresholdTone(pct, warnAt, dangerAt);
  const pctText = format.percent(pct / 100, { fractionDigits: 0 });
  const summary = `${u.donutSummary(label, pctText, typeof subtext === "string" ? subtext : "", format.percent(warnAt / 100, { fractionDigits: 0 }), format.percent(dangerAt / 100, { fractionDigits: 0 }))} ${u.status[tone]}.`.replace(/\s+\./g, ".");
  const motion = useChartMotion(animate);
  const box = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  useTooltipDismiss(open, box, () => setOpen(false));
  const tipId = React.useId();
  const c = size / 2;
  const outerW = Math.max(4, size / 20);
  const innerW = Math.max(8, size / 10);
  const rOuter = c - outerW / 2;
  const rInner = rOuter - outerW / 2 - 4 - innerW / 2;
  const arc = (r: number, w: number, from: number, to: number, cls: string, anim?: { className?: string; style?: React.CSSProperties }) => (
    <circle cx={c} cy={c} r={r} fill="none" stroke="currentColor" strokeWidth={w} pathLength={100} strokeDasharray={`${Math.max(0, to - from)} ${100 - Math.max(0, to - from)}`} strokeDashoffset={-from} transform={`rotate(-90 ${c} ${c})`} className={cn(cls, anim?.className)} style={anim?.style} />
  );
  const pctOf = (n: number) => format.percent(n / 100, { fractionDigits: 0 });
  const ctx: ChartTooltipContext = {
    point: { label, value: pct, formatted: pctText },
    index: 0,
    series: [
      { id: "usage", name: u.capacity, value: pct, formatted: pctText, tone: toneClass[tone] },
      { id: "warn", name: u.warning, value: warnAt, formatted: pctOf(warnAt), tone: "text-warn" },
      { id: "danger", name: u.danger, value: dangerAt, formatted: pctOf(dangerAt), tone: "text-danger" },
    ],
  };
  const tipOn = open && tooltip !== false;
  const items: LegendItem[] = [
    { id: "warn", name: u.warning, tone: "text-warn opacity-50", value: pctOf(warnAt) },
    { id: "danger", name: u.danger, tone: "text-danger opacity-50", value: pctOf(dangerAt) },
    { id: "usage", name: u.capacity, tone: toneClass[tone], value: pctText },
  ];
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <div ref={box} dir="ltr" data-animate={motion.enabled ? "on" : "off"} className="relative shrink-0" style={{ width: size, height: size, ...motionVars(motion) }}>
        <svg
          width={size}
          height={size}
          role="img"
          aria-label={summary}
          aria-describedby={tipOn ? tipId : undefined}
          tabIndex={tooltip === false ? undefined : 0}
          className="block outline-none focus-visible:outline-2 focus-visible:outline-primary"
          onPointerEnter={() => setOpen(true)}
          onPointerDown={() => setOpen(true)}
          onPointerLeave={(e) => e.pointerType !== "touch" && setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          {arc(rOuter, outerW, 0, 100, "text-line")}
          {arc(rOuter, outerW, warnAt, dangerAt, "text-warn opacity-50", entryAnim(motion, "fade", 1))}
          {arc(rOuter, outerW, dangerAt, 100, "text-danger opacity-50", entryAnim(motion, "fade", 2))}
          {arc(rInner, innerW, 0, 100, "text-muted-bg")}
          {arc(rInner, innerW, 0, pct, toneClass[tone], { ...entryAnim(motion, "sweep"), className: cn(tweenClass(motion), entryAnim(motion, "sweep").className) })}
        </svg>
        {tipOn && <ChartTooltipFor option={tooltip} ctx={ctx} x={c} y={0} id={tipId} container={box} />}
        <div aria-hidden className="absolute inset-0 grid place-content-center text-center">
          <span className="text-2xl leading-tight text-fg tabular-nums">{pctText}</span>
          {subtext && <span className="text-xs text-muted">{subtext}</span>}
        </div>
      </div>
      {legend && (
        <ChartLegend
          items={items.map((i) => ({ ...i, name: `${i.name}:`, value: i.value }))}
          label={u.segments}
          className="flex-col items-start"
        />
      )}
    </div>
  );
}
