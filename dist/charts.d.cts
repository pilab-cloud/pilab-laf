export { C as ChartRange, a as ChartUnit, P as PerfMetric, b as PerfPanel, c as PerfPanelLabels, d as PerfPanelProps, e as Point, T as TimeSeries, f as TimeSeriesChart, g as TimeSeriesChartLabels, h as TimeSeriesChartProps, i as downsample, j as formatUnit, l as lttb, p as presetToMs, s as seriesToCsv } from './perf-panel-CcKCFsOd.cjs';
import * as React from 'react';

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

export { Heatmap, StackedBarChart };
