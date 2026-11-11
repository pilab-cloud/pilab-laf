# Charts catalogue (`@pilab/laf/charts`)

Visx-based, SVG, theme-aware (label palette via `--label-n`, so light/dark and custom themes just work), tree-shakeable
(entry budget: 36 kB gzip, visx/radix external). Every chart follows the same accessibility contract:

- the plot is `role="img"` with an `aria-label` and is focusable; arrow keys / Home / End move a tooltip between data
  points, Escape hides it, and the focused datum is announced through a polite live region;
- a "Show data table" toggle renders the same data as a real `<table>` (also reachable without a pointer);
- animations are on by default and off under `prefers-reduced-motion` or `animate={false}`; loading/empty/error states are shared;
- plots are always laid out left-to-right (numbers and time axes do not mirror); legends, cards and text follow `dir`.

Status: ✅ shipped · 🟡 partial · 🗺 planned

| Chart | Status | Component | Notes |
|---|---|---|---|
| Sparkline | ✅ | `Sparkline` (core), `MetricCard sparkline` | Tiny trend line, no axes. |
| Area (single/stacked) | ✅ | `AreaChart` | `TimeSeriesChart type="area"`; LTTB, brush zoom, thresholds. |
| Line | ✅ | `LineChart` | `TimeSeriesChart type="line"`; multi-unit dual axis. |
| Bar: grouped / stacked / horizontal | ✅ | `BarChart` | Categorical; legend toggles series. |
| Donut | ✅ | `DonutChart` | Centre label/value, legend, segment toggle. |
| Gauge (radial, thresholds) | ✅ | `RadialGauge`, `GaugeCard` (core) | Older half-dial `Gauge` kept for compatibility. |
| Heatmap | ✅ | `Heatmap` | `role="grid"`, roving-tabindex cells. |
| Stacked horizontal bars | ✅ | `StackedBarChart` | Capacity breakdowns. |
| Perf panel (multi-metric) | ✅ | `PerfPanel` | Metric picker + summary + CSV. |
| Segmented bar | ✅ | `SegmentedBar` | One proportional stacked bar + legend list with values. |
| Threshold donut | ✅ | `ThresholdDonut` | Centre value, warning/critical bands on an outer ring, tone by threshold. |
| Utilization card | ✅ | `UtilizationCard variant="bar"\|"donut"` | PatternFly utilization card patterns. |
| Chart card chrome | ✅ | `ChartCard` | Range selector, legend toggle, export/refresh, states. |
| Histogram | 🗺 | `Histogram` | Binned `BarChart` with `bins`/`thresholds`; value-axis log option. |
| Treemap | 🗺 | `Treemap` | `@visx/hierarchy`; keyboard tree walk; size = value, tone = group. |
| Funnel | 🗺 | `FunnelChart` | Ordered steps with conversion %; table fallback lists drop-off. |
| Calendar heatmap | 🗺 | `CalendarHeatmap` | Day grid by week (GitHub style) reusing `Heatmap` cell semantics. |
| Status timeline | 🗺 | `StatusTimeline` | Lanes of `ok/warn/danger/unknown` spans over time (uptime). |
| Scatter / bubble | 🗺 | `ScatterChart` | Quadtree hit-testing for keyboard-free pointer, arrow-key nearest-point walk. |
| Sankey / flow | 🗺 | `FlowChart` | Likely lives with `/topology`. |
| Box plot | 🗺 | `BoxPlot` | Percentile summaries per category. |
| Bullet / target | 🟡 | `ProgressCard` | Thresholded progress today; true bullet chart planned. |

## Sample API

```tsx
import { AreaChart, BarChart, ChartCard, DonutChart, Heatmap } from "@pilab/laf/charts";

<ChartCard
  title="Traffic"
  ranges={[{ value: "1h", label: "1h" }, { value: "24h", label: "24h" }]}
  range={range} onRangeChange={setRange}
  legendToggle onRefresh={reload} onExport={exportCsv}
  loading={isLoading} error={error} onRetry={reload} empty={!series.length}
>
  {({ legend }) => <AreaChart label="Requests by class" series={series} stacked legend={legend} />}
</ChartCard>

<BarChart label="Deploys" categories={["W1", "W2"]} series={[{ id: "a", name: "Apps", data: [4, 6] }]} stacked orientation="horizontal" />
<DonutChart label="By region" data={[{ id: "eu", name: "Europe", value: 540 }]} centerLabel="requests" />
<Heatmap label="Load" rows={["Mon"]} columns={["00", "12"]} values={[[1, 9]]} />
```

Planned shape for the missing charts (same contract: `label`, `loading`/`error`/`empty`, `legend`, `formatValue`):

```tsx
<Histogram label="Latency" values={samples} bins={20} />
<Treemap label="Disk usage" data={tree} formatValue={bytes} />
<FunnelChart label="Signup" steps={[{ id: "visit", name: "Visit", value: 1000 }, { id: "signup", name: "Sign up", value: 120 }]} />
<CalendarHeatmap label="Deploys" from="2026-01-01" to="2026-12-31" values={byDay} />
<StatusTimeline label="Uptime" lanes={[{ id: "api", name: "API", spans: [{ from, to, status: "ok" }] }]} />
```

```tsx
<UtilizationCard title="Recommendations" subtitle="System" alertText="25 incidents detected" onAlertClick={open}
  segments={[{ id: "low", name: "Low", value: 6, tone: "text-label-3" }, { id: "crit", name: "Critical", value: 12, tone: "text-danger" }]}
  filter={<Dropdown toggle={<MenuToggle size="sm">Filter</MenuToggle>}>…</Dropdown>} detailsHref="/incidents" />
<UtilizationCard variant="donut" title="CPU usage" value={80} max={100} warnAt={60} dangerAt={90} subtext="of 100 GBps" detailsHref="/cpu" />
```

Shared building blocks (exported): `ChartLegend`, `ChartTooltip`, `chartTone(i)` / `CHART_TONES`.

## Animation

Every chart (`AreaChart`, `LineChart`, `TimeSeriesChart`, `BarChart`, `DonutChart`, `SegmentedBar`, `ThresholdDonut`, `UtilizationCard`, `StackedBarChart`, `Heatmap`, `RadialGauge`, `GaugeCard`, `Gauge`, `Sparkline`) takes `animate?: boolean | { duration?: number; easing?: string; stagger?: number }` (default `true`; duration 600 ms, stagger 40 ms).

| Effect | Charts |
|---|---|
| Entry: left-to-right reveal of lines/areas (staggered per series) | `AreaChart`, `LineChart`, `Sparkline` |
| Entry: bars grow from the baseline, segments grow from their start (staggered) | `BarChart`, `StackedBarChart`, `SegmentedBar` |
| Entry: arcs sweep | `DonutChart`, `ThresholdDonut`, `RadialGauge`, `Gauge` |
| Entry: cell fade as a diagonal wave | `Heatmap` |
| Value change: tween between data updates (bar/segment geometry and arcs; line/area points when the point count is unchanged) | all |
| Hover emphasis: others are dimmed (hovered category/segment/cell, legend-hovered or pointer-nearest series) | all with a legend or tooltip |

It is CSS/SVG based (`.laf-anim*` / `.laf-tween` in `app.css`, driven by `--laf-dur`, `--laf-ease`, `--laf-delay`), only moves transforms, opacity and stroke dashes (no layout shift) and needs no extra dependency. `animate={false}` and `prefers-reduced-motion: reduce` remove the classes entirely (`data-animate="off"` on the chart). Hooks: `useChartMotion(animate)`, `usePrefersReducedMotion()`.

## Tooltips

`tooltip?: false | true | ((ctx) => ReactNode) | { formatter?, header? }` (default on; `Sparkline` default off, gauges have none).

```tsx
<BarChart tooltip={({ point, series, index }) => <b>{point.label}: {series.map((s) => s.formatted).join(" / ")}</b>} … />
<AreaChart tooltip={{ header: (c) => `At ${c.point.label}`, formatter: (s) => `${s.formatted} req` }} … />
<DonutChart tooltip={false} … />
```

`ctx` is `{ point: { label, x?, value?, formatted? }, series: { id, name, value, formatted, tone }[], index }`; values are already formatted with the chart's `formatValue` / the `useLaf` locale formatters.

- Time/line/area: crosshair plus one shared tooltip listing every series at the nearest point by x; bar, donut, segmented bar, stacked bar, heatmap and threshold donut: one tooltip per category/segment/cell.
- Input: hover, tap (touch: stays until an outside press), keyboard (focus the chart, ← → ↑ ↓ / Home / End move between points; heatmap cells are individually focusable), Escape dismisses. The focused datum is also announced in a polite live region and the "Show data table" fallback is unchanged.
- The tooltip is `role="tooltip"`, referenced by the chart's `aria-describedby` while open, `pointer-events: none` (no flicker), portalled to `<body>` (or the `LafProvider` portal container) with fixed coordinates, so an `overflow-hidden` card never clips it; it flips above/below (side/side for crosshairs) and is clamped to the viewport.
- Exports: `ChartTooltip` (low-level, `container` enables the portal/clamping), `ChartTooltipFor`, `useTooltipDismiss`, types `ChartTooltipOption`, `ChartTooltipContext`, `ChartTooltipPoint`, `ChartTooltipSeries`, `ChartAnimate`, `ChartMotion`.
