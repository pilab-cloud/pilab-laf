import * as React from "react";
import { cn } from "../cn";
import { ChartLegend, chartTone, useChartLaf, type LegendItem } from "./chart-kit";

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
  className?: string;
}

/** One horizontal stacked bar with proportional segments; colours are backed by the legend names and values. */
export function SegmentedBar({ segments, label, formatValue = (v) => String(v), legend = true, height = 16, className }: SegmentedBarProps) {
  const { t } = useChartLaf();
  const u = t.components.dashboard.utilization;
  const total = segments.reduce((a, s) => a + Math.max(0, s.value), 0);
  const toneOf = (s: BarSegment, i: number) => s.tone ?? chartTone(i);
  const summary = u.barSummary(label, formatValue(total), segments.map((s) => u.percentLine(s.name, formatValue(s.value))).join(", "));
  const items: LegendItem[] = segments.map((s, i) => ({ id: s.id, name: s.name, tone: toneOf(s, i) }));
  return (
    <div className={cn("grid min-w-0 gap-2", className)}>
      <div role="img" aria-label={summary} className="flex w-full overflow-hidden rounded-sm bg-muted-bg" style={{ height }}>
        {segments.map((s, i) =>
          s.value > 0 ? <div key={s.id} aria-hidden title={undefined} data-segment={s.id} className={cn("h-full bg-current motion-safe:transition-[flex-grow] motion-safe:duration-300", toneOf(s, i))} style={{ flexGrow: s.value, flexBasis: 0 }} /> : null,
        )}
      </div>
      {legend && <ChartLegend items={items} label={u.segments} />}
    </div>
  );
}
