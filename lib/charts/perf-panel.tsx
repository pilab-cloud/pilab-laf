import * as React from "react";
import { Button } from "../components/button";
import { Combobox, type ComboboxOption } from "../components/combobox";
import { TimeRangePicker } from "../components/extras";
import { useLafDefaults } from "../i18n";
import { chartsEn } from "../messages/charts.en";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { formatUnit, TimeSeriesChart, type ChartRange, type TimeSeries, type TimeSeriesChartProps } from "./time-series";

const lafDefaults = { charts: chartsEn };
const useLaf = () => useLafDefaults(lafDefaults);

export interface PerfMetric extends TimeSeries {
  /** Picker group, e.g. "CPU", "Memory", "Disk", "Network". */
  group: string;
}

export interface PerfPanelLabels {
  metrics: string;
  pickMetrics: string;
  exportCsv: string;
  metric: string;
  latest: string;
  min: string;
  avg: string;
  max: string;
  summary: string;
  noMetrics: string;
}

const UNIT_MS: Record<string, number> = { m: 60_000, h: 3_600_000, d: 86_400_000 };
export function presetToMs(preset: string): number | undefined {
  const m = /^(\d+)([mhd])$/.exec(preset);
  return m ? Number(m[1]) * UNIT_MS[m[2]!]! : undefined;
}

const csvCell = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/** CSV of the given series (union of timestamps, ISO times, blank for missing). */
export function seriesToCsv(series: TimeSeries[], timeLabel = "time"): string {
  const maps = series.map((s) => new Map(s.points));
  const stamps = [...new Set(series.flatMap((s) => s.points.map((p) => p[0])))].sort((a, b) => a - b);
  const lines = [[timeLabel, ...series.map((s) => s.name)].map(csvCell).join(",")];
  for (const t of stamps) lines.push([new Date(t).toISOString(), ...maps.map((m) => m.get(t) ?? "")].join(","));
  return lines.join("\n");
}

export interface PerfPanelProps {
  metrics: PerfMetric[];
  /** Selected metric ids; uncontrolled starts with the first metric. */
  selected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  /** Preset ("1h") or "custom". */
  timeRange?: string;
  onTimeRangeChange?: (value: string) => void;
  presets?: string[];
  /** Right edge of the window for presets; defaults to the newest sample. */
  now?: number;
  label: string;
  height?: number;
  loading?: boolean;
  type?: TimeSeriesChartProps["type"];
  thresholds?: TimeSeriesChartProps["thresholds"];
  /** Replaces the default file download. */
  onExport?: (csv: string) => void;
  labels?: Partial<PerfPanelLabels>;
  className?: string;
}

export function PerfPanel({
  metrics,
  selected: selectedProp,
  onSelectedChange,
  timeRange: rangeProp,
  onTimeRangeChange,
  presets = ["15m", "1h", "24h", "7d"],
  now: nowProp,
  label,
  height,
  loading,
  type,
  thresholds,
  onExport,
  labels: labelsProp,
  className,
}: PerfPanelProps) {
  const { format, t: laf } = useLaf();
  const l = { ...laf.components.charts.perfPanel, ...labelsProp };
  const [selected, setSelected] = useControllableState<string[]>({
    value: selectedProp,
    defaultValue: metrics.length ? [metrics[0]!.id] : [],
    onChange: onSelectedChange,
  });
  const [preset, setPreset] = useControllableState<string>({ value: rangeProp, defaultValue: presets.includes("1h") ? "1h" : presets[0]!, onChange: onTimeRangeChange });
  const [custom, setCustom] = React.useState<ChartRange | undefined>();

  const newest = React.useMemo(() => nowProp ?? metrics.reduce((m, s) => s.points.reduce((a, p) => Math.max(a, p[0]), m), -Infinity), [metrics, nowProp]);
  const win = React.useMemo<ChartRange | undefined>(() => {
    if (preset === "custom" && custom) return custom;
    const ms = presetToMs(preset);
    return ms && Number.isFinite(newest) ? { from: newest - ms, to: newest } : undefined;
  }, [preset, custom, newest]);

  const options = React.useMemo<ComboboxOption[]>(() => metrics.map((m) => ({ value: m.id, label: m.name, group: m.group })), [metrics]);
  const chosen = React.useMemo(() => options.filter((o) => selected.includes(o.value)), [options, selected]);
  const active = React.useMemo(() => metrics.filter((m) => selected.includes(m.id)), [metrics, selected]);
  const inWin = (t: number) => !win || (t >= win.from && t <= win.to);

  const stats = React.useMemo(
    () =>
      active.map((m) => {
        const vs = m.points.filter(([t, v]) => v !== null && inWin(t)).map((p) => p[1] as number);
        if (!vs.length) return { m, empty: true as const };
        return { m, empty: false as const, latest: vs[vs.length - 1]!, min: Math.min(...vs), max: Math.max(...vs), avg: vs.reduce((a, b) => a + b, 0) / vs.length };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, win],
  );

  const doExport = () => {
    const csv = seriesToCsv(active.map((m) => ({ ...m, points: m.points.filter(([t]) => inWin(t)) })));
    if (onExport) return onExport(csv);
    if (typeof URL === "undefined" || !URL.createObjectURL) return;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "metrics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const zoomTo = (r: ChartRange) => {
    setCustom(r);
    setPreset("custom");
  };

  return (
    <section aria-label={label} className={cn("grid gap-3", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <Combobox
          multiple
          label={l.metrics}
          placeholder={l.pickMetrics}
          options={options}
          value={chosen}
          onChange={(v) => setSelected(v.map((o) => o.value))}
          className="min-w-56"
        />
        <TimeRangePicker value={preset} onChange={setPreset} presets={presets} range={win} onRangeChange={zoomTo} showTimeZone />
        <Button variant="ghost" size="sm" className="ms-auto" onClick={doExport} disabled={!active.length}>
          {l.exportCsv}
        </Button>
      </div>
      {active.length || loading ? (
        <TimeSeriesChart label={label} series={active} type={type} thresholds={thresholds} height={height} loading={loading} range={win} onRangeChange={zoomTo} />
      ) : (
        <p className="m-0 text-sm text-muted">{l.noMetrics}</p>
      )}
      {stats.length > 0 && (
        <table aria-label={l.summary} className="w-full border-collapse text-xs">
          <thead>
            <tr className="text-muted">
              <th scope="col" className="py-1 text-start font-medium">{l.metric}</th>
              {[l.latest, l.min, l.avg, l.max].map((h) => (
                <th key={h} scope="col" className="py-1 text-end font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.m.id} className="border-t border-line">
                <th scope="row" className="py-1 text-start font-normal">{s.m.name}</th>
                {s.empty ? (
                  <td colSpan={4} className="py-1 text-end text-muted">–</td>
                ) : (
                  [s.latest, s.min, s.avg, s.max].map((v, i) => (
                    <td key={i} className="py-1 text-end font-mono">{formatUnit(format, s.m.unit, v)}</td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
