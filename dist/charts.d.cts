import { C as ChartTooltipOption, T as TimeSeriesChartProps, a as ChartRange } from './perf-panel-oLl-Txms.cjs';
export { b as ChartTooltip, c as ChartTooltipContext, d as ChartTooltipFor, e as ChartTooltipPoint, f as ChartTooltipSeries, g as ChartUnit, h as ChartsInteractiveLabels, L as LiveOptions, P as PerfMetric, i as PerfPanel, j as PerfPanelLabels, k as PerfPanelProps, l as Point, m as TimeSeries, n as TimeSeriesChart, o as TimeSeriesChartLabels, p as TooltipRow, q as chartsInteractiveEn, r as downsample, s as formatUnit, t as lttb, u as presetToMs, v as seriesToCsv, w as trimWindow, x as useLiveSeries, y as useTooltipDismiss } from './perf-panel-oLl-Txms.cjs';
import * as React from 'react';
import { C as ChartAnimate } from './chart-motion-BTO5GOqJ.cjs';
export { a as ChartMotion, u as useChartMotion, b as usePrefersReducedMotion } from './chart-motion-BTO5GOqJ.cjs';
import { C as CardProps } from './card-D00VCi3j.cjs';

/** Categorical palette: the label colours (`--label-n`) so charts follow the theme and stay ≥ 3:1 on the background. */
declare const CHART_TONES: readonly ["text-label-9", "text-label-5", "text-label-3", "text-label-1", "text-label-7", "text-label-11", "text-label-2", "text-label-6"];
declare const chartTone: (i: number) => "text-label-9" | "text-label-5" | "text-label-3" | "text-label-1" | "text-label-7" | "text-label-11" | "text-label-2" | "text-label-6";
interface LegendItem {
    id: string;
    name: string;
    /** Tailwind `text-*` class used as the swatch colour. */
    tone: string;
    dash?: string;
    value?: React.ReactNode;
}
/** Legend; with `onToggle` the entries are toggle buttons (`aria-pressed`) that hide/show a series. */
declare function ChartLegend({ items, hidden, onToggle, onHover, label, className }: {
    items: LegendItem[];
    hidden?: string[];
    onToggle?: (id: string) => void; /** Called with the entry id on hover/focus and `null` on leave/blur (drives series emphasis). */
    onHover?: (id: string | null) => void;
    label?: string;
    className?: string;
}): React.JSX.Element;

declare function StackedBarChart({ data, series, label, formatValue, width, barHeight, animate, tooltip, className, }: {
    data: {
        name: string;
        values: number[];
    }[];
    series: string[];
    label: string;
    formatValue?: (v: number) => string;
    width?: number;
    barHeight?: number;
    /** Segments grow in (staggered per row) and re-size smoothly; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
    /** Tooltip per segment (hover, tap, arrow keys): `false`, a render function or `{formatter, header}`. Default on. */
    tooltip?: ChartTooltipOption;
    className?: string;
}): React.JSX.Element;
declare function Heatmap({ rows, columns, values, label, max, formatValue, cell, animate, tooltip, className, }: {
    rows: string[];
    columns: string[];
    values: number[][];
    label: string;
    max?: number;
    formatValue?: (v: number) => string;
    cell?: number;
    /** Cells fade in as a diagonal wave and re-tint smoothly; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
    /** Tooltip per cell (hover, tap, focus): `false`, a render function or `{formatter, header}`. Default on. */
    tooltip?: ChartTooltipOption;
    className?: string;
}): React.JSX.Element;

type AreaChartProps = Omit<TimeSeriesChartProps, "type"> & {
    /** Stack the series on a shared axis (same unit). */
    stacked?: boolean;
};
/**
 * Time-series area chart: `TimeSeriesChart` with `type="area"` (or `"stacked-area"`), so it keeps LTTB downsampling,
 * brush zoom, keyboard crosshair, threshold lines, the legend toggle and the data-table alternative.
 */
declare function AreaChart({ stacked, ...props }: AreaChartProps): React.JSX.Element;
type LineChartProps = Omit<TimeSeriesChartProps, "type">;
/** Time-series line chart (`TimeSeriesChart type="line"`). Not to be confused with the small categorical `LineChart` of the core entry. */
declare function LineChart(props: LineChartProps): React.JSX.Element;

interface BarSeries {
    id: string;
    name: string;
    data: number[];
}
interface BarChartProps {
    categories: string[];
    series: BarSeries[];
    /** Stack series on top of each other; default is grouped (side by side). */
    stacked?: boolean;
    orientation?: "vertical" | "horizontal";
    formatValue?: (v: number) => string;
    label: string;
    height?: number;
    /** Fixed width in px; measured from the container when omitted. */
    width?: number;
    /** Show the legend (entries toggle their series); default true. */
    legend?: boolean;
    /** Entry (bars grow from the baseline) and value-change animation; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
    /** Tooltip per category: `false`, a render function or `{formatter, header}`. Default on. */
    tooltip?: ChartTooltipOption;
    loading?: boolean;
    error?: boolean | string;
    onRetry?: () => void;
    className?: string;
}
/** Grouped, stacked, vertical or horizontal bars. Focus the chart and use the arrow keys to walk the categories. */
declare function BarChart({ categories, series, stacked, orientation, formatValue, label, height, width: widthProp, legend, animate, tooltip, loading, error, onRetry, className }: BarChartProps): React.JSX.Element;

interface DonutDatum {
    id: string;
    name: string;
    value: number;
}
interface DonutChartProps {
    data: DonutDatum[];
    /** Text under the centre value; default the localised "Total". */
    centerLabel?: React.ReactNode;
    /** Centre value; default the sum of the (visible) data. */
    centerValue?: React.ReactNode;
    formatValue?: (v: number) => string;
    label: string;
    /** Diameter in px. */
    size?: number;
    /** Ring thickness in px. */
    thickness?: number;
    legend?: boolean;
    /** Arcs sweep in; value changes tween; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
    /** Tooltip per segment: `false`, a render function or `{formatter, header}`. Default on. */
    tooltip?: ChartTooltipOption;
    loading?: boolean;
    error?: boolean | string;
    onRetry?: () => void;
    className?: string;
}
/** Donut with centre label and legend; arrow keys walk the segments, the legend toggles them. */
declare function DonutChart({ data, centerLabel, centerValue, formatValue, label, size, thickness, legend, animate, tooltip, loading, error, onRetry, className }: DonutChartProps): React.JSX.Element;

interface ChartCardRange {
    value: string;
    label: string;
}
interface ChartCardContext {
    range: string | undefined;
    legend: boolean;
}
interface ChartCardProps extends Omit<CardProps, "title" | "children" | "onSelect"> {
    title: string;
    description?: React.ReactNode;
    headingLevel?: 2 | 3 | 4;
    /** Range selector options (rendered as a `SegmentedControl`). */
    ranges?: ChartCardRange[];
    range?: string;
    defaultRange?: string;
    onRangeChange?: (range: string) => void;
    /** Adds a show/hide legend toggle; the chart reads `legend` from the render-prop context. */
    legendToggle?: boolean;
    legend?: boolean;
    onLegendChange?: (legend: boolean) => void;
    onExport?: () => void;
    onRefresh?: () => void;
    /** Spins the refresh icon and disables the button. */
    refreshing?: boolean;
    loading?: boolean;
    error?: boolean | string;
    onRetry?: () => void;
    empty?: boolean;
    /** Extra header actions, before the built-ins. */
    actions?: React.ReactNode;
    footer?: React.ReactNode;
    /** The chart, or a function of the card's range/legend state. */
    children: React.ReactNode | ((ctx: ChartCardContext) => React.ReactNode);
}
/** Card chrome for charts: title, range selector, legend toggle, export/refresh and shared empty/loading/error states. */
declare function ChartCard({ title, description, headingLevel, ranges, range: rangeProp, defaultRange, onRangeChange, legendToggle, legend: legendProp, onLegendChange, onExport, onRefresh, refreshing, loading, error, onRetry, empty, actions, footer, children, className, ...rest }: ChartCardProps): React.JSX.Element;

interface BarSegment {
    id: string;
    name: string;
    value: number;
    /** Tailwind `text-*` class used as the fill colour; default the label palette. */
    tone?: string;
}
interface SegmentedBarProps {
    segments: BarSegment[];
    /** Accessible name; the summary (total and every segment) is appended automatically. */
    label: string;
    formatValue?: (v: number) => string;
    /** Show the legend list below the bar with the values. */
    legend?: boolean;
    /** Bar thickness in px. */
    height?: number;
    /** Segments grow in and re-size smoothly; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
    /** Tooltip per segment (hover, tap, arrow keys): `false`, a render function or `{formatter, header}`. Default on. */
    tooltip?: ChartTooltipOption;
    className?: string;
}
/** One horizontal stacked bar with proportional segments; colours are backed by the legend names and values. Focus it and use the arrow keys to walk the segments. */
declare function SegmentedBar({ segments, label, formatValue, legend, height, animate, tooltip, className }: SegmentedBarProps): React.JSX.Element;

interface ThresholdDonutProps {
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
    /** Centre text instead of the percentage, e.g. "25" with `subtext="GB Used"`. The accessible summary still uses the percentage. */
    centerText?: React.ReactNode;
    /** Colour of the usage arc below `warnAt`: the brand colour (default) or the success colour. */
    okTone?: "primary" | "ok";
    /** The usage arc sweeps in and re-sweeps on change; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
    /** Tooltip with the usage and thresholds (hover, tap, focus): `false`, a render function or `{formatter, header}`. Default on. */
    tooltip?: ChartTooltipOption;
    className?: string;
}
declare function thresholdTone(pct: number, warnAt: number, dangerAt: number): "danger" | "warn" | "ok";
/**
 * Usage ring with the value in the centre. The outer ring shows the warning and critical bands as muted arcs; the
 * inner arc is the usage, coloured by the band it is in. The legend lists the thresholds with numbers, so colour is never alone.
 */
declare function ThresholdDonut({ value, max, warnAt, dangerAt, subtext, label, size, legend, centerText, okTone, animate, tooltip, className }: ThresholdDonutProps): React.JSX.Element;

interface UtilizationBase {
    title: React.ReactNode;
    /** Filter control (e.g. a `Dropdown` with a `MenuToggle`) placed at the end of the header. */
    filter?: React.ReactNode;
    /** "See details" link target; or use `onDetails`. */
    detailsHref?: string;
    onDetails?: () => void;
    headingLevel?: 2 | 3 | 4;
    /** Forwarded to the bar / ring: entry + value-change animation (default on, off under reduced motion). */
    animate?: ChartAnimate;
    /** Forwarded to the bar / ring tooltip. */
    tooltip?: ChartTooltipOption;
    className?: string;
}
interface UtilizationBarCardProps extends UtilizationBase {
    variant?: "bar";
    /** Small heading under the title, e.g. "System". */
    subtitle?: React.ReactNode;
    /** Alert line with a danger icon, e.g. "25 incidents detected". */
    alertText?: React.ReactNode;
    onAlertClick?: () => void;
    alertHref?: string;
    segments: BarSegment[];
    formatValue?: (v: number) => string;
    /** Accessible name of the bar; default the card title when it is a string. */
    chartLabel?: string;
}
interface UtilizationDonutCardProps extends UtilizationBase {
    variant: "donut";
    value: number;
    max?: number;
    warnAt?: number;
    dangerAt?: number;
    subtext?: React.ReactNode;
    chartLabel?: string;
}
type UtilizationCardProps = UtilizationBarCardProps | UtilizationDonutCardProps;
/** PatternFly-style utilization card: `variant="bar"` (segmented severity bar) or `variant="donut"` (threshold ring). */
declare function UtilizationCard(props: UtilizationCardProps): React.JSX.Element;

/** Charts below it that share a `syncGroup` (default `"default"`) share crosshair and zoom range. */
declare function ChartSyncProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
interface ChartSync {
    /** Crosshair time set by another chart in the group (null when this chart owns it or nobody hovers). */
    remoteCursor: number | null;
    range: ChartRange | null;
    publishCursor: (t: number | null) => void;
    publishRange: (r: ChartRange | null) => void;
}
/** Join a sync group. Returns `null` outside a `ChartSyncProvider` or when `group` is `false`. */
declare function useChartSync(group?: string | false): ChartSync | null;

/** Keep `r` inside `full` without changing its span (unless it is wider than `full`). */
declare function clampRange(r: ChartRange, full: ChartRange): ChartRange;
/** Scale the window by `factor` (<1 zooms in) keeping the time `at` fixed on screen. */
declare function zoomAt(r: ChartRange, full: ChartRange, factor: number, at?: number): ChartRange;
/** Shift the window by `dt` ms, stopping at the edges of `full`. */
declare function panBy(r: ChartRange, full: ChartRange, dt: number): ChartRange;

export { AreaChart, type AreaChartProps, BarChart, type BarChartProps, type BarSegment, type BarSeries, CHART_TONES, ChartAnimate, ChartCard, type ChartCardContext, type ChartCardProps, type ChartCardRange, ChartLegend, ChartRange, type ChartSync, ChartSyncProvider, ChartTooltipOption, DonutChart, type DonutChartProps, type DonutDatum, Heatmap, type LegendItem, LineChart, type LineChartProps, SegmentedBar, type SegmentedBarProps, StackedBarChart, ThresholdDonut, type ThresholdDonutProps, TimeSeriesChartProps, type UtilizationBarCardProps, UtilizationCard, type UtilizationCardProps, type UtilizationDonutCardProps, chartTone, clampRange, panBy, thresholdTone, useChartSync, zoomAt };
