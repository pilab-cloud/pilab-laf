import * as React from 'react';
import { C as ChartAnimate } from './chart-motion-BTO5GOqJ.js';

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

interface ChartsInteractiveLabels {
    paused: string;
    resume: string;
    live: string;
    pause: string;
    zoomHint: string;
}
declare const chartsInteractiveEn: ChartsInteractiveLabels;

interface TooltipRow {
    name: string;
    value: React.ReactNode;
    tone?: string;
}
interface ChartTooltipPoint {
    /** Header text: the category, the formatted time, the cell name … */
    label: string;
    /** Raw x (time, category name, column) when it has one. */
    x?: number | string;
    /** Value of the hovered/focused datum for single-valued charts (donut, segmented bar, heatmap). */
    value?: number | null;
    formatted?: string;
}
interface ChartTooltipSeries {
    id: string;
    name: string;
    value: number | null;
    /** Locale-formatted value (the chart's `formatValue` / `useLaf` formatters). */
    formatted: string;
    /** Tailwind `text-*` class of the swatch. */
    tone?: string;
}
interface ChartTooltipContext {
    point: ChartTooltipPoint;
    /** One entry per series at the point (a single entry for donut / segmented bar / heatmap). */
    series: ChartTooltipSeries[];
    /** Index of the point (category, stamp, segment, cell). */
    index: number;
}
/** `tooltip` prop of every chart: off, default content, a render function, or tweaks for the default content. */
type ChartTooltipOption = boolean | ((ctx: ChartTooltipContext) => React.ReactNode) | {
    /** Renders the value of one row. */
    formatter?: (series: ChartTooltipSeries, ctx: ChartTooltipContext) => React.ReactNode;
    /** Replaces the header (default `point.label`). */
    header?: React.ReactNode | ((ctx: ChartTooltipContext) => React.ReactNode);
};
/**
 * Visual tooltip. With `container` (the chart's positioned wrapper) it is portalled to `<body>` and placed with fixed
 * coordinates, so it is never clipped by an `overflow-hidden` card; it flips and clamps to stay inside the viewport.
 * `x`/`y` are relative to `container`. Without `container` it is absolutely positioned inside the nearest positioned parent.
 * `pointer-events: none`, so it never steals the hover and cannot flicker.
 */
declare function ChartTooltip({ x, y, title, rows, children, id, container, placement, className, }: {
    x: number;
    y: number;
    title?: React.ReactNode;
    rows?: TooltipRow[];
    /** Custom body; replaces `title`/`rows`. */
    children?: React.ReactNode;
    id?: string;
    container?: React.RefObject<HTMLElement | null>;
    /** `top`: above the anchor (flips below); `side`: beside it (flips to the other side), for crosshairs. */
    placement?: "top" | "side";
    className?: string;
}): React.JSX.Element;
/** Resolves a `tooltip` option against a context: custom render, `{formatter, header}`, or the default header + one row per series. */
declare function ChartTooltipFor({ option, ctx, x, y, id, container, placement, }: {
    option: ChartTooltipOption | undefined;
    ctx: ChartTooltipContext | null;
    x: number;
    y: number;
    id?: string;
    container?: React.RefObject<HTMLElement | null>;
    placement?: "top" | "side";
}): React.JSX.Element | null;
/** Hides the tooltip on Escape and on a pointer press outside `ref` (how a tap-opened tooltip on touch is dismissed). */
declare function useTooltipDismiss(open: boolean, ref: React.RefObject<Element | null>, dismiss: () => void): void;

interface LiveOptions {
    /** Keep points newer than `latest - windowMs`. Default 60 000. */
    windowMs?: number;
    /** Hard cap per series. Default 600. */
    maxPoints?: number;
}
/** Drop points that fell out of the rolling window and enforce the cap. */
declare function trimWindow(points: Point[], { windowMs, maxPoints }?: LiveOptions): Point[];
/**
 * Rolling-window series buffer for streaming data. `push` appends one sample per series; the returned `series`
 * can go straight into a chart. Under `prefers-reduced-motion` renders are throttled to once per second.
 */
declare function useLiveSeries(meta: Omit<TimeSeries, "points">[], options?: LiveOptions): {
    series: TimeSeries[];
    push: (values: Record<string, number | null>, t?: number) => void;
    clear: () => void;
    windowMs: number;
    maxPoints: number;
};

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
    /** Show the (toggleable) legend; default true. */
    legend?: boolean;
    label: string;
    height?: number;
    /** Fixed width in px; measured from the container when omitted. */
    width?: number;
    /** Line/area draw-in on mount, smooth tween between data updates, series emphasis on hover; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
    /** Shared crosshair tooltip (nearest point by x, all series): `false`, a render function or `{formatter, header}`. Default on. */
    tooltip?: ChartTooltipOption;
    /** Rows shown in the data-table alternative. */
    maxTableRows?: number;
    /** Group id for the crosshair and zoom range shared with other charts under a `ChartSyncProvider` (default `"default"`); `false` opts out. */
    syncGroup?: string | false;
    /** Zoom with the mouse wheel / trackpad pinch and two-finger touch pinch. Default off. */
    wheelZoom?: boolean;
    /** Streaming mode: show only the latest `windowMs` of the data and follow new points. Pauses while hovered, focused or zoomed. */
    live?: boolean | Pick<LiveOptions, "windowMs">;
    labels?: Partial<TimeSeriesChartLabels & ChartsInteractiveLabels>;
    className?: string;
}
declare function formatUnit(f: Formatters, unit: ChartUnit, v: number): string;
declare function TimeSeriesChart({ series: seriesProp, type, range: rangeProp, onRangeChange, thresholds, hiddenSeries: hiddenProp, onHiddenSeriesChange, loading, legend, label, height, width: widthProp, maxTableRows, animate, tooltip, syncGroup, wheelZoom, live, labels: labelsProp, className, }: TimeSeriesChartProps): React.JSX.Element;

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

export { createFormatters as A, type BytesOptions as B, type ChartTooltipOption as C, type DateTimeOptions as D, type Formatters as F, type LiveOptions as L, type PerfMetric as P, type RelativeOptions as R, type TimeSeriesChartProps as T, type ChartRange as a, ChartTooltip as b, type ChartTooltipContext as c, ChartTooltipFor as d, type ChartTooltipPoint as e, type ChartTooltipSeries as f, type ChartUnit as g, type ChartsInteractiveLabels as h, PerfPanel as i, type PerfPanelLabels as j, type PerfPanelProps as k, type Point as l, type TimeSeries as m, TimeSeriesChart as n, type TimeSeriesChartLabels as o, type TooltipRow as p, chartsInteractiveEn as q, downsample as r, formatUnit as s, lttb as t, presetToMs as u, seriesToCsv as v, trimWindow as w, useLiveSeries as x, useTooltipDismiss as y, type DurationOptions as z };
