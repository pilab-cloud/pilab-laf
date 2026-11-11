import * as React from "react";
import { cn } from "../cn";
import { ChartLegend, useChartLaf, type LegendItem } from "./chart-kit";

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
export function ThresholdDonut({ value, max = 100, warnAt = 60, dangerAt = 90, subtext, label, size = 160, legend = true, className }: ThresholdDonutProps) {
  const { t, format } = useChartLaf();
  const u = t.components.dashboard.utilization;
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const tone = thresholdTone(pct, warnAt, dangerAt);
  const pctText = format.percent(pct / 100, { fractionDigits: 0 });
  const summary = `${u.donutSummary(label, pctText, typeof subtext === "string" ? subtext : "", format.percent(warnAt / 100, { fractionDigits: 0 }), format.percent(dangerAt / 100, { fractionDigits: 0 }))} ${u.status[tone]}.`.replace(/\s+\./g, ".");
  const c = size / 2;
  const outerW = Math.max(4, size / 20);
  const innerW = Math.max(8, size / 10);
  const rOuter = c - outerW / 2;
  const rInner = rOuter - outerW / 2 - 4 - innerW / 2;
  const arc = (r: number, w: number, from: number, to: number, cls: string, extra?: string) => (
    <circle cx={c} cy={c} r={r} fill="none" stroke="currentColor" strokeWidth={w} pathLength={100} strokeDasharray={`${Math.max(0, to - from)} ${100 - Math.max(0, to - from)}`} strokeDashoffset={-from} transform={`rotate(-90 ${c} ${c})`} className={cn(cls, extra)} />
  );
  const pctOf = (n: number) => format.percent(n / 100, { fractionDigits: 0 });
  const items: LegendItem[] = [
    { id: "warn", name: u.warning, tone: "text-warn opacity-50", value: pctOf(warnAt) },
    { id: "danger", name: u.danger, tone: "text-danger opacity-50", value: pctOf(dangerAt) },
    { id: "usage", name: u.capacity, tone: toneClass[tone], value: pctText },
  ];
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <div dir="ltr" className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} role="img" aria-label={summary} className="block">
          {arc(rOuter, outerW, 0, 100, "text-line")}
          {arc(rOuter, outerW, warnAt, dangerAt, "text-warn opacity-50")}
          {arc(rOuter, outerW, dangerAt, 100, "text-danger opacity-50")}
          {arc(rInner, innerW, 0, 100, "text-muted-bg")}
          {arc(rInner, innerW, 0, pct, toneClass[tone], "motion-safe:transition-[stroke-dasharray] motion-safe:duration-500")}
        </svg>
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
