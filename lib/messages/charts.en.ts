import type { PerfPanelLabels } from "../charts/perf-panel";
import type { TimeSeriesChartLabels } from "../charts/time-series";

export const chartsEn: { perfPanel: PerfPanelLabels; timeSeries: TimeSeriesChartLabels } = {
  perfPanel: {
    metrics: "Metrics",
    pickMetrics: "Choose metrics…",
    exportCsv: "Export CSV",
    metric: "Metric",
    latest: "Latest",
    min: "Min",
    avg: "Avg",
    max: "Max",
    summary: "Summary statistics",
    noMetrics: "Select at least one metric",
  },
  timeSeries: {
    showData: "Show data",
    hideData: "Hide data",
    resetZoom: "Reset zoom",
    noData: "No data",
    time: "Time",
    loading: "Loading",
    keyboardHint: "Arrow keys move the crosshair, Shift with arrows selects a range, Enter zooms to the selection, Escape clears it.",
    legend: "Series",
  },
};
