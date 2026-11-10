import * as React from 'react';
import { F as Formatters } from './foundation-format-DlHPXhrg.cjs';

type Point = [t: number, v: number | null];
/** Largest-Triangle-Three-Buckets downsampling of gap-free points. Keeps first and last. */
declare function lttb(points: [number, number][], threshold: number): [number, number][];
/**
 * Downsample a series to about `maxPoints` points. `null` values are gaps: each contiguous
 * run is reduced separately (budget proportional to its length) and gaps are preserved.
 */
declare function downsample(points: Point[], maxPoints: number): Point[];

type ChartUnit = "%" | "bytes" | "bitrate" | "hz" | "ms" | "count";
interface TimeSeries {
    id: string;
    name: string;
    unit: ChartUnit;
    points: Point[];
}
interface ChartRange {
    from: number;
    to: number;
}
interface TimeSeriesChartLabels {
    showData: string;
    hideData: string;
    resetZoom: string;
    noData: string;
    time: string;
    loading: string;
    keyboardHint: string;
    legend: string;
}
interface TimeSeriesChartProps {
    series: TimeSeries[];
    type?: "line" | "area" | "stacked-area";
    /** Visible time window (epoch ms); omit for uncontrolled (full extent, brush zoom updates it). */
    range?: ChartRange;
    onRangeChange?: (range: ChartRange) => void;
    thresholds?: {
        value: number;
        tone: "warn" | "danger";
    }[];
    hiddenSeries?: string[];
    onHiddenSeriesChange?: (ids: string[]) => void;
    loading?: boolean;
    label: string;
    height?: number;
    /** Fixed width in px; measured from the container when omitted. */
    width?: number;
    /** Rows shown in the data-table alternative. */
    maxTableRows?: number;
    labels?: Partial<TimeSeriesChartLabels>;
    className?: string;
}
declare function formatUnit(f: Formatters, unit: ChartUnit, v: number): string;
declare function TimeSeriesChart({ series, type, range: rangeProp, onRangeChange, thresholds, hiddenSeries: hiddenProp, onHiddenSeriesChange, loading, label, height, width: widthProp, maxTableRows, labels: labelsProp, className, }: TimeSeriesChartProps): React.JSX.Element;

declare function StackedBarChart({ data, series, label, formatValue, width, barHeight, className, }: {
    data: {
        name: string;
        values: number[];
    }[];
    series: string[];
    label: string;
    formatValue?: (v: number) => string;
    width?: number;
    barHeight?: number;
    className?: string;
}): React.JSX.Element;
declare function Heatmap({ rows, columns, values, label, max, formatValue, cell, className, }: {
    rows: string[];
    columns: string[];
    values: number[][];
    label: string;
    max?: number;
    formatValue?: (v: number) => string;
    cell?: number;
    className?: string;
}): React.JSX.Element;

interface PerfMetric extends TimeSeries {
    /** Picker group, e.g. "CPU", "Memory", "Disk", "Network". */
    group: string;
}
interface PerfPanelLabels {
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
declare function presetToMs(preset: string): number | undefined;
/** CSV of the given series (union of timestamps, ISO times, blank for missing). */
declare function seriesToCsv(series: TimeSeries[], timeLabel?: string): string;
interface PerfPanelProps {
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
declare function PerfPanel({ metrics, selected: selectedProp, onSelectedChange, timeRange: rangeProp, onTimeRangeChange, presets, now: nowProp, label, height, loading, type, thresholds, onExport, labels: labelsProp, className, }: PerfPanelProps): React.JSX.Element;

export { type ChartRange, type ChartUnit, Heatmap, type PerfMetric, PerfPanel, type PerfPanelLabels, type PerfPanelProps, type Point, StackedBarChart, type TimeSeries, TimeSeriesChart, type TimeSeriesChartLabels, type TimeSeriesChartProps, downsample, formatUnit, lttb, presetToMs, seriesToCsv };
