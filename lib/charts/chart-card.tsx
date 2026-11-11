import { Download, Eye, EyeOff, RefreshCw } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Button } from "../components/button";
import { Card, CardActions, CardBody, CardDescription, CardHeader, CardTitle, type CardProps } from "../components/card";
import { SegmentedControl } from "../components/primitives";
import { useControllableState } from "../utils";
import { useChartLaf } from "./chart-kit";

export interface ChartCardRange {
  value: string;
  label: string;
}

export interface ChartCardContext {
  range: string | undefined;
  legend: boolean;
}

export interface ChartCardProps extends Omit<CardProps, "title" | "children" | "onSelect"> {
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
export function ChartCard({
  title,
  description,
  headingLevel = 3,
  ranges,
  range: rangeProp,
  defaultRange,
  onRangeChange,
  legendToggle,
  legend: legendProp,
  onLegendChange,
  onExport,
  onRefresh,
  refreshing,
  loading,
  error,
  onRetry,
  empty,
  actions,
  footer,
  children,
  className,
  ...rest
}: ChartCardProps) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  const [range, setRange] = useControllableState<string | undefined>({ value: rangeProp, defaultValue: defaultRange ?? ranges?.[0]?.value, onChange: (v) => v !== undefined && onRangeChange?.(v) });
  const [legend, setLegend] = useControllableState({ value: legendProp, defaultValue: true, onChange: onLegendChange });
  const state = loading ? (
    <div role="status" aria-label={c.loading} className="h-48 animate-pulse rounded-sm bg-muted-bg motion-reduce:animate-none" />
  ) : error ? (
    <div role="alert" className="grid h-48 place-content-center justify-items-center gap-2 text-sm text-danger">
      <span>{typeof error === "string" ? error : c.error}</span>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry}>
          {c.retry}
        </Button>
      )}
    </div>
  ) : empty ? (
    <div className="grid h-48 place-items-center text-sm text-muted">{c.empty}</div>
  ) : null;
  return (
    <Card variant="default" {...rest} className={cn("gap-3", className)} aria-busy={loading || undefined}>
      <CardHeader className="flex-wrap">
        <div className="min-w-0">
          <CardTitle as={`h${headingLevel}` as "h3"}>{title}</CardTitle>
          {description && <CardDescription className="mt-0.5">{description}</CardDescription>}
        </div>
        <CardActions className="flex-wrap">
          {actions}
          {ranges && ranges.length > 0 && <SegmentedControl aria-label={c.range} items={ranges.map((r) => ({ value: r.value, label: r.label }))} value={range} onValueChange={setRange} className="h-7" />}
          {legendToggle && (
            <Button size="sm" variant="ghost" aria-pressed={legend} aria-label={legend ? c.hideLegend : c.showLegend} onClick={() => setLegend(!legend)} className="px-0 w-7">
              {legend ? <Eye aria-hidden /> : <EyeOff aria-hidden />}
            </Button>
          )}
          {onRefresh && (
            <Button size="sm" variant="ghost" aria-label={c.refresh} disabled={refreshing} onClick={onRefresh} className="px-0 w-7">
              <RefreshCw aria-hidden className={cn(refreshing && "animate-spin motion-reduce:animate-none")} />
            </Button>
          )}
          {onExport && (
            <Button size="sm" variant="ghost" aria-label={c.export} onClick={onExport} className="px-0 w-7">
              <Download aria-hidden />
            </Button>
          )}
        </CardActions>
      </CardHeader>
      <CardBody>{state ?? (typeof children === "function" ? children({ range, legend }) : children)}</CardBody>
      {footer && <div className="text-xs text-muted">{footer}</div>}
    </Card>
  );
}
