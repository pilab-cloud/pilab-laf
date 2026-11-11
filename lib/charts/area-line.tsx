import { TimeSeriesChart, type TimeSeriesChartProps } from "./time-series";

export type AreaChartProps = Omit<TimeSeriesChartProps, "type"> & {
  /** Stack the series on a shared axis (same unit). */
  stacked?: boolean;
};

/**
 * Time-series area chart: `TimeSeriesChart` with `type="area"` (or `"stacked-area"`), so it keeps LTTB downsampling,
 * brush zoom, keyboard crosshair, threshold lines, the legend toggle and the data-table alternative.
 */
export function AreaChart({ stacked, ...props }: AreaChartProps) {
  return <TimeSeriesChart {...props} type={stacked ? "stacked-area" : "area"} />;
}

export type LineChartProps = Omit<TimeSeriesChartProps, "type">;

/** Time-series line chart (`TimeSeriesChart type="line"`). Not to be confused with the small categorical `LineChart` of the core entry. */
export function LineChart(props: LineChartProps) {
  return <TimeSeriesChart {...props} type="line" />;
}
