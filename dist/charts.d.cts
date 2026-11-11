import { T as TimeSeriesChartProps } from './perf-panel-uUu6HJmZ.cjs';
export { C as ChartRange, a as ChartUnit, P as PerfMetric, b as PerfPanel, c as PerfPanelLabels, d as PerfPanelProps, e as Point, f as TimeSeries, g as TimeSeriesChart, h as TimeSeriesChartLabels, i as downsample, j as formatUnit, l as lttb, p as presetToMs, s as seriesToCsv } from './perf-panel-uUu6HJmZ.cjs';
import * as React from 'react';
import { C as CardProps } from './card-D00VCi3j.cjs';

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
    loading?: boolean;
    error?: boolean | string;
    onRetry?: () => void;
    className?: string;
}
/** Grouped, stacked, vertical or horizontal bars. Focus the chart and use the arrow keys to walk the categories. */
declare function BarChart({ categories, series, stacked, orientation, formatValue, label, height, width: widthProp, legend, loading, error, onRetry, className }: BarChartProps): React.JSX.Element;

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
    loading?: boolean;
    error?: boolean | string;
    onRetry?: () => void;
    className?: string;
}
/** Donut with centre label and legend; arrow keys walk the segments, the legend toggles them. */
declare function DonutChart({ data, centerLabel, centerValue, formatValue, label, size, thickness, legend, loading, error, onRetry, className }: DonutChartProps): React.JSX.Element;

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
declare function ChartLegend({ items, hidden, onToggle, label, className }: {
    items: LegendItem[];
    hidden?: string[];
    onToggle?: (id: string) => void;
    label?: string;
    className?: string;
}): React.JSX.Element;
interface TooltipRow {
    name: string;
    value: string;
    tone?: string;
}
/** Visual tooltip (hidden from AT: the same text is announced through the chart's live region). */
declare function ChartTooltip({ x, y, title, rows, className }: {
    x: number;
    y: number;
    title?: React.ReactNode;
    rows: TooltipRow[];
    className?: string;
}): React.JSX.Element;

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
    className?: string;
}
/** One horizontal stacked bar with proportional segments; colours are backed by the legend names and values. */
declare function SegmentedBar({ segments, label, formatValue, legend, height, className }: SegmentedBarProps): React.JSX.Element;

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
    className?: string;
}
declare function thresholdTone(pct: number, warnAt: number, dangerAt: number): "danger" | "warn" | "ok";
/**
 * Usage ring with the value in the centre. The outer ring shows the warning and critical bands as muted arcs; the
 * inner arc is the usage, coloured by the band it is in. The legend lists the thresholds with numbers, so colour is never alone.
 */
declare function ThresholdDonut({ value, max, warnAt, dangerAt, subtext, label, size, legend, className }: ThresholdDonutProps): React.JSX.Element;

interface UtilizationBase {
    title: React.ReactNode;
    /** Filter control (e.g. a `Dropdown` with a `MenuToggle`) placed at the end of the header. */
    filter?: React.ReactNode;
    /** "See details" link target; or use `onDetails`. */
    detailsHref?: string;
    onDetails?: () => void;
    headingLevel?: 2 | 3 | 4;
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

export { AreaChart, type AreaChartProps, BarChart, type BarChartProps, type BarSegment, type BarSeries, CHART_TONES, ChartCard, type ChartCardContext, type ChartCardProps, type ChartCardRange, ChartLegend, ChartTooltip, DonutChart, type DonutChartProps, type DonutDatum, Heatmap, type LegendItem, LineChart, type LineChartProps, SegmentedBar, type SegmentedBarProps, StackedBarChart, ThresholdDonut, type ThresholdDonutProps, TimeSeriesChartProps, type TooltipRow, type UtilizationBarCardProps, UtilizationCard, type UtilizationCardProps, type UtilizationDonutCardProps, chartTone, thresholdTone };
