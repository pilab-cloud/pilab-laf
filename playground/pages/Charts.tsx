import * as React from "react";
import { Heatmap, PerfPanel, StackedBarChart, TimeSeriesChart, type PerfMetric } from "../../lib/charts";
import { DatePicker, type DateRangeValue } from "../../lib/components/calendar";

const NOW = Date.UTC(2026, 5, 1, 12, 0, 0);
const STEP = 30_000;

function wave(n: number, base: number, amp: number, seed: number, gapAt?: number): [number, number | null][] {
  return Array.from({ length: n }, (_, i) => {
    if (gapAt !== undefined && i >= gapAt && i < gapAt + 20) return [NOW - (n - 1 - i) * STEP, null];
    const v = base + amp * Math.sin(i / (12 + seed)) + amp * 0.3 * Math.sin(i * 1.7 + seed);
    return [NOW - (n - 1 - i) * STEP, Math.max(0, v)];
  });
}

const N = 5760; // 48 h of 30 s samples → exercises LTTB
const metrics: PerfMetric[] = [
  { id: "cpu", group: "CPU", name: "CPU usage", unit: "%", points: wave(N, 45, 30, 1, 2000) },
  { id: "ready", group: "CPU", name: "CPU ready", unit: "ms", points: wave(N, 120, 80, 3) },
  { id: "mem", group: "Memory", name: "Memory active", unit: "bytes", points: wave(N, 6 * 2 ** 30, 2 * 2 ** 30, 2) },
  { id: "disk", group: "Disk", name: "Disk throughput", unit: "bitrate", points: wave(N, 4e8, 2e8, 4) },
  { id: "net", group: "Network", name: "Network rx", unit: "bitrate", points: wave(N, 2e8, 1.5e8, 5) },
];

export default function ChartsDemo() {
  const [range, setRange] = React.useState<DateRangeValue>({});
  const [dt, setDt] = React.useState<string | undefined>();
  const [type, setType] = React.useState<"line" | "area" | "stacked-area">("line");
  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">Charts (@pilab/laf/charts)</h2>
      <div className="flex items-center gap-3 text-sm">
        <select aria-label="Chart type" className="form-input w-40" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
          <option value="line">line</option>
          <option value="area">area</option>
          <option value="stacked-area">stacked-area</option>
        </select>
        <span className="text-muted">Drag to zoom · ←/→ crosshair · Shift+←/→ then Enter to zoom</span>
      </div>
      <TimeSeriesChart
        label="CPU and memory"
        type={type}
        series={[metrics[0]!, metrics[2]!].map((m) => ({ ...m }))}
        thresholds={[{ value: 80, tone: "danger" }]}
      />
      <PerfPanel label="VM performance" metrics={metrics} thresholds={[{ value: 80, tone: "warn" }]} />
      <div className="grid gap-6 md:grid-cols-2">
        <StackedBarChart label="Datastore usage" series={["VMs", "Snapshots", "Free"]} data={[{ name: "ds-01", values: [40, 10, 50] }, { name: "ds-02", values: [70, 5, 25] }]} formatValue={(v) => `${v} GB`} />
        <Heatmap label="Load by hour" rows={["Mon", "Tue", "Wed"]} columns={["00", "06", "12", "18"]} values={[[1, 4, 9, 5], [2, 6, 8, 3], [0, 3, 10, 7]]} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <DatePicker mode="range" value={range} onChange={setRange} />
        <DatePicker mode="datetime" value={dt} onChange={setDt} />
      </div>
    </section>
  );
}
