import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { entryAnim, motionVars, tweenClass, useChartMotion, type ChartAnimate } from "../charts/chart-motion";
import { useLafDefaults } from "../i18n";
import { dashboardEn } from "../messages/dashboard.en";
import { Button } from "./button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle, type CardProps } from "./card";
import { Sparkline } from "./extras";
import { Skeleton } from "./feedback";
import { Progress } from "./helpers";
import { StatusDot } from "./primitives";

const lafDefaults = { dashboard: dashboardEn };
const useLaf = () => useLafDefaults(lafDefaults);

export type MetricTrend = "up" | "down" | "neutral";
export type MetricTone = "ok" | "warn" | "danger" | "primary";

export interface MetricDelta {
  /** Signed change; the sign decides the trend unless `trend` is given. Shown as a percentage unless `text` is set. */
  value: number;
  text?: string;
  trend?: MetricTrend;
}

export interface MetricCardProps extends Omit<CardProps, "title" | "children" | "onSelect"> {
  label: string;
  value: React.ReactNode;
  unit?: string;
  /** Percentage change (`12.5` → "+12.5%") or a full `MetricDelta`. */
  delta?: number | MetricDelta;
  /** Which direction is good news; colours the delta (and adds text, never colour alone). Default `up`. */
  goodWhen?: "up" | "down";
  /** What the delta compares with, e.g. "vs last 7 days". */
  period?: string;
  icon?: React.ReactNode;
  sparkline?: number[];
  loading?: boolean;
  /** `true` or a message. */
  error?: boolean | string;
  onRetry?: () => void;
}

function ErrorBlock({ message, onRetry }: { message: string; onRetry?: () => void }) {
  const { t } = useLaf();
  return (
    <div role="alert" className="flex flex-wrap items-center gap-2 text-sm text-danger">
      <span className="min-w-0">{message}</span>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry}>
          {t.components.dashboard.metric.retry}
        </Button>
      )}
    </div>
  );
}

function Delta({ delta, goodWhen, period }: { delta: number | MetricDelta; goodWhen: "up" | "down"; period?: string }) {
  const { t, format } = useLaf();
  const d = typeof delta === "number" ? { value: delta } : delta;
  const trend: MetricTrend = d.trend ?? (d.value > 0 ? "up" : d.value < 0 ? "down" : "neutral");
  const text = d.text ?? `${d.value > 0 ? "+" : ""}${format.percent(d.value / 100, { fractionDigits: 1 })}`;
  const good = trend === "neutral" ? undefined : trend === goodWhen;
  const m = t.components.dashboard.metric;
  const Icon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 text-xs">
      <span data-trend={trend} data-good={good === undefined ? undefined : String(good)} className={cn("inline-flex items-center gap-0.5 font-medium", good === undefined ? "text-muted" : good ? "text-ok" : "text-danger")}>
        <Icon aria-hidden className="size-3.5" />
        {text}
        <span className="sr-only">
          {trend === "up" ? m.increase(text) : trend === "down" ? m.decrease(text) : m.unchanged}
          {good !== undefined && `, ${good ? m.good : m.bad}`}
        </span>
      </span>
      {period && <span className="text-muted">{period}</span>}
    </div>
  );
}

/** KPI tile: label, big value with unit, trend delta, sparkline, loading and error states; a link when `href`/`onClick` is set. */
export function MetricCard({ label, value, unit, delta, goodWhen = "up", period, icon, sparkline, loading, error, onRetry, className, ...rest }: MetricCardProps) {
  const { t } = useLaf();
  const id = React.useId();
  const m = t.components.dashboard.metric;
  const interactive = !!rest.href || !!rest.onClick;
  return (
    <Card variant="default" compact {...rest} loading={false} aria-busy={loading || undefined} {...(interactive ? {} : { role: "group", "aria-labelledby": id })} className={cn("gap-1.5", className)}>
      <div className="flex items-center gap-2 text-xs text-muted">
        {icon && (
          <span aria-hidden className="inline-flex shrink-0 [&_svg]:size-4">
            {icon}
          </span>
        )}
        <span id={id} className="min-w-0 truncate">
          {label}
        </span>
      </div>
      {loading ? (
        <div role="status" aria-label={m.loading} className="grid gap-2">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      ) : error ? (
        <ErrorBlock message={typeof error === "string" ? error : m.error} onRetry={onRetry} />
      ) : (
        <>
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 text-2xl leading-tight font-semibold tabular-nums">
              {value}
              {unit && <span className="ms-1 text-sm font-normal text-muted">{unit}</span>}
            </div>
            {sparkline && sparkline.length > 1 && <Sparkline data={sparkline} label={m.trend(label)} className="shrink-0" />}
          </div>
          {delta !== undefined && <Delta delta={delta} goodWhen={goodWhen} period={period} />}
          {delta === undefined && period && <span className="text-xs text-muted">{period}</span>}
        </>
      )}
    </Card>
  );
}

/** Responsive row/grid of `MetricCard`s. */
export function MetricGrid({ min = "13rem", label, className, children }: { min?: string; label?: string; className?: string; children: React.ReactNode }) {
  return (
    <div role={label ? "group" : undefined} aria-label={label} className={cn("grid gap-3", className)} style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))` }}>
      {children}
    </div>
  );
}

/* ── Gauge ── */
export interface GaugeThreshold {
  /** Applies from this value upwards. */
  value: number;
  tone: Exclude<MetricTone, "primary">;
}

const toneStroke: Record<MetricTone, string> = { ok: "text-ok", warn: "text-warn", danger: "text-danger", primary: "text-primary" };

export function gaugeTone(value: number, thresholds: GaugeThreshold[] = []): MetricTone {
  let tone: MetricTone = "primary";
  for (const th of [...thresholds].sort((a, b) => a.value - b.value)) if (value >= th.value) tone = th.tone;
  return tone;
}

const ARC = 0.75; // 270° dial
const R = 42;
const C = 2 * Math.PI * R;

export interface RadialGaugeProps {
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  /** Accessible name. */
  label: string;
  thresholds?: GaugeThreshold[];
  /** Formats the centre value; default plain number. */
  formatValue?: (v: number) => string;
  /** Diameter in px. */
  size?: number;
  /** The arc sweeps in and tweens on value changes; off under `prefers-reduced-motion`. Default on. */
  animate?: ChartAnimate;
  className?: string;
}

/** Radial meter (270° dial; the older half-dial `Gauge` is unchanged); colour follows `thresholds`, and the state is also spelled out as text. */
export function RadialGauge({ value, min = 0, max = 100, unit, label, thresholds, formatValue = (v) => String(Math.round(v * 10) / 10), size = 128, animate, className }: RadialGaugeProps) {
  const motion = useChartMotion(animate);
  const sweep = entryAnim(motion, "sweep");
  const { t } = useLaf();
  const g = t.components.dashboard.gauge;
  const frac = max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0;
  const tone = gaugeTone(value, thresholds);
  const stateText = thresholds?.length && tone !== "primary" ? g[tone] : undefined;
  const text = `${formatValue(value)}${unit ?? ""}`;
  const mark = (v: number) => {
    const a = ((135 + 270 * ((v - min) / (max - min))) * Math.PI) / 180;
    return { x1: 50 + (R - 6) * Math.cos(a), y1: 50 + (R - 6) * Math.sin(a), x2: 50 + (R + 6) * Math.cos(a), y2: 50 + (R + 6) * Math.sin(a) };
  };
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${g.valueText(text, `${formatValue(max)}${unit ?? ""}`)}${stateText ? `, ${stateText}` : ""}`}
      data-animate={motion.enabled ? "on" : "off"}
      className={cn("relative inline-grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size, ...motionVars(motion) }}
    >
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full" data-tone={tone}>
        <circle cx="50" cy="50" r={R} fill="none" stroke="var(--bg-muted)" strokeWidth="8" strokeLinecap="butt" strokeDasharray={`${ARC * C} ${C}`} transform="rotate(135 50 50)" />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="butt"
          strokeDasharray={`${ARC * C * frac} ${C}`}
          transform="rotate(135 50 50)"
          className={cn(toneStroke[tone], tweenClass(motion), sweep.className)}
          style={sweep.style}
        />
        {thresholds?.map((th) => (
          <line key={`${th.tone}-${th.value}`} {...mark(th.value)} stroke="var(--border-strong)" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="relative grid place-items-center text-center leading-tight">
        <span className="text-xl font-semibold tabular-nums">{text}</span>
        {stateText && <span className={cn("text-xs font-medium", toneStroke[tone])}>{stateText}</span>}
      </div>
    </div>
  );
}

export interface GaugeCardProps extends Omit<CardProps, "title" | "children" | "onSelect">, Omit<RadialGaugeProps, "label" | "className"> {
  title: string;
  description?: React.ReactNode;
  loading?: boolean;
  error?: boolean | string;
  onRetry?: () => void;
}

export function GaugeCard({ title, description, loading, error, onRetry, value, min, max, unit, thresholds, formatValue, size, animate, className, ...rest }: GaugeCardProps) {
  const { t } = useLaf();
  return (
    <Card variant="default" compact {...rest} className={className} aria-busy={loading || undefined}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody className="grid place-items-center gap-2">
        {loading ? (
          <div role="status" aria-label={t.components.dashboard.metric.loading}>
            <Skeleton className="size-28 rounded-full" />
          </div>
        ) : error ? (
          <ErrorBlock message={typeof error === "string" ? error : t.components.dashboard.metric.error} onRetry={onRetry} />
        ) : (
          <RadialGauge value={value} min={min} max={max} unit={unit} label={title} thresholds={thresholds} formatValue={formatValue} size={size} animate={animate} />
        )}
        {description && <CardDescription className="text-center">{description}</CardDescription>}
      </CardBody>
    </Card>
  );
}

/* ── ProgressCard ── */
export interface ProgressCardProps extends Omit<CardProps, "title" | "children" | "onSelect"> {
  title: string;
  description?: React.ReactNode;
  value: number;
  max?: number;
  unit?: string;
  /** Capacity style: colour shifts at `warnAt`/`dangerAt` percent. */
  meter?: boolean;
  warnAt?: number;
  dangerAt?: number;
  formatValue?: (v: number) => string;
  loading?: boolean;
  error?: boolean | string;
  onRetry?: () => void;
  actions?: React.ReactNode;
}

export function ProgressCard({ title, description, value, max = 100, unit, meter, warnAt, dangerAt, formatValue = (v) => String(Math.round(v * 10) / 10), loading, error, onRetry, actions, className, ...rest }: ProgressCardProps) {
  const { t, format } = useLaf();
  return (
    <Card variant="default" compact {...rest} className={className} aria-busy={loading || undefined}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {actions}
      </CardHeader>
      <CardBody className="grid gap-2">
        {loading ? (
          <div role="status" aria-label={t.components.dashboard.metric.loading} className="grid gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-1.5 w-full" />
          </div>
        ) : error ? (
          <ErrorBlock message={typeof error === "string" ? error : t.components.dashboard.metric.error} onRetry={onRetry} />
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-2 tabular-nums">
              <span className="text-xl font-semibold">
                {formatValue(value)}
                {unit && <span className="ms-1 text-sm font-normal text-muted">{unit}</span>}
              </span>
              <span className="text-xs text-muted">
                {max > 0 ? format.percent(value / max, { fractionDigits: 0 }) : ""} · {formatValue(max)}
                {unit ? ` ${unit}` : ""}
              </span>
            </div>
            <Progress label={title} value={value} max={max} meter={meter} warnAt={warnAt} dangerAt={dangerAt} />
          </>
        )}
        {description && <CardDescription>{description}</CardDescription>}
      </CardBody>
    </Card>
  );
}

/* ── StatusSummaryCard ── */
export interface StatusSummaryItem {
  id: string;
  label: string;
  count: number;
  tone?: "ok" | "warn" | "danger" | "neutral" | "primary";
  href?: string;
  onClick?: () => void;
}

const barTone = { ok: "bg-ok", warn: "bg-warn", danger: "bg-danger", neutral: "bg-muted", primary: "bg-primary" };

export interface StatusSummaryCardProps extends Omit<CardProps, "title" | "children" | "onSelect"> {
  title: string;
  items: StatusSummaryItem[];
  loading?: boolean;
  headingLevel?: 2 | 3 | 4;
}

/** Counts by status with `StatusDot`s and a proportion bar; each row is a button/link when it has `onClick`/`href`. */
export function StatusSummaryCard({ title, items, loading, headingLevel = 3, className, ...rest }: StatusSummaryCardProps) {
  const { t } = useLaf();
  const total = items.reduce((a, i) => a + i.count, 0);
  const rowCls = "flex w-full items-center justify-between gap-3 rounded-sm px-1.5 py-1 text-sm";
  return (
    <Card variant="default" compact {...rest} className={className} aria-busy={loading || undefined}>
      <CardHeader>
        <CardTitle as={`h${headingLevel}` as "h3"}>{title}</CardTitle>
        <span className="text-xs text-muted tabular-nums">
          {t.components.dashboard.status.total}: <b className="text-fg">{total}</b>
        </span>
      </CardHeader>
      <CardBody className="grid gap-2">
        {loading ? (
          <div role="status" aria-label={t.components.dashboard.metric.loading} className="grid gap-2">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="w-2/3" />
            <Skeleton className="w-1/2" />
          </div>
        ) : (
          <>
            <div aria-hidden className="flex h-2 overflow-hidden rounded-sm bg-muted-bg">
              {items.map((i) => (i.count > 0 ? <span key={i.id} className={barTone[i.tone ?? "neutral"]} style={{ width: `${(i.count / total) * 100}%` }} /> : null))}
            </div>
            <ul className="m-0 grid list-none gap-0.5 p-0">
              {items.map((i) => {
                const inner = (
                  <>
                    <StatusDot tone={i.tone} label={i.label} />
                    <b className="tabular-nums">{i.count}</b>
                  </>
                );
                const action = "border-0 bg-transparent text-fg no-underline hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary/50 outline-none";
                return (
                  <li key={i.id}>
                    {i.href ? (
                      <a href={i.href} className={cn(rowCls, action)} onClick={i.onClick}>
                        {inner}
                      </a>
                    ) : i.onClick ? (
                      <button type="button" className={cn(rowCls, action)} onClick={i.onClick}>
                        {inner}
                      </button>
                    ) : (
                      <div className={rowCls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </CardBody>
    </Card>
  );
}
