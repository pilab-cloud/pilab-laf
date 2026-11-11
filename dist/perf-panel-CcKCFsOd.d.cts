import * as React from 'react';

type Point = [t: number, v: number | null];
/** Largest-Triangle-Three-Buckets downsampling of gap-free points. Keeps first and last. */
declare function lttb(points: [number, number][], threshold: number): [number, number][];
/**
 * Downsample a series to about `maxPoints` points. `null` values are gaps: each contiguous
 * run is reduced separately (budget proportional to its length) and gaps are preserved.
 */
declare function downsample(points: Point[], maxPoints: number): Point[];

/** Locale-aware formatters (design F3). Pure functions; `createFormatters` binds a locale and time zone. */
interface BytesOptions {
    /** 1024 → IEC labels (KiB), 1000 → SI labels (kB). Omitted: 1024 with legacy KB/MB labels. */
    base?: 1024 | 1000;
    locale?: string;
    maximumFractionDigits?: number;
}
interface DurationOptions {
    style?: "short" | "clock";
    locale?: string;
}
interface DateTimeOptions {
    utc?: boolean;
    timeZone?: string;
    locale?: string;
    dateStyle?: "short" | "medium" | "long";
    timeStyle?: "short" | "medium" | "long";
}
interface RelativeOptions {
    now?: Date | number;
    locale?: string;
}
interface Formatters {
    /** `bytes(1536)` → "1.5 KB"; `bytes(4 * 2 ** 30, { base: 1024 })` → "4 GiB"; `{ base: 1000 }` → "4.29 GB". */
    bytes(n: number, opts?: BytesOptions | string): string;
    /** Bits per second, SI steps: "1.2 Gbit/s". */
    bitrate(bitsPerSecond: number, opts?: {
        locale?: string;
    }): string;
    /** Hertz: "2.6 GHz". */
    frequency(hz: number, opts?: {
        locale?: string;
    }): string;
    /** short: "3 h 12 min"; clock: "03:12:05". */
    duration(ms: number, opts?: DurationOptions): string;
    /** Ratio in 0…1: `percent(0.73)` → "73%". */
    percent(ratio: number, opts?: {
        locale?: string;
        fractionDigits?: number;
    }): string;
    /** "3 hours ago", "in 2 days". */
    relative(date: Date | number | string, opts?: RelativeOptions): string;
    dateTime(date: Date | number | string, opts?: DateTimeOptions): string;
}
declare function createFormatters(defaults?: {
    locale?: string;
    timeZone?: string;
}): Formatters;

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

export { type BytesOptions as B, type ChartRange as C, type DateTimeOptions as D, type Formatters as F, type PerfMetric as P, type RelativeOptions as R, type TimeSeries as T, type ChartUnit as a, PerfPanel as b, type PerfPanelLabels as c, type PerfPanelProps as d, type Point as e, TimeSeriesChart as f, type TimeSeriesChartLabels as g, type TimeSeriesChartProps as h, downsample as i, formatUnit as j, type DurationOptions as k, lttb as l, createFormatters as m, presetToMs as p, seriesToCsv as s };
