import { ChevronRight, CircleX, Pause, Pencil, Power, Unplug, Wrench, TriangleAlert, type LucideIcon } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { ThresholdDonut } from "../charts/threshold-donut";
import type { ChartAnimate, ChartTooltipOption } from "../charts/chart-kit";
import { useLafDefaults } from "../i18n";
import { overviewEn } from "../messages/overview.en";
import { Button, type ButtonProps } from "./button";
import { Card, CardTitle } from "./card";
import { DescriptionList, DescriptionListDescription, DescriptionListGroup, DescriptionListTerm } from "./content";
import { Breadcrumb, Badge, type BreadcrumbItemProps } from "./display";
import { Sparkline } from "./extras";
import { RadialGauge, type GaugeThreshold } from "./metrics";
import { DropdownMenuItem } from "./overlay";
import type { ObjectState } from "./object-icon";
import { IconButton, SplitButton } from "./primitives";

const lafDefaults = { overview: overviewEn };
const useLaf = () => useLafDefaults(lafDefaults);

type Level = 2 | 3 | 4;

/* ── ResourceOverviewLayout ── */
export interface ResourceOverviewLayoutProps {
  /** Identity card (top start). */
  identity?: React.ReactNode;
  /** Wide details card (top, beside the identity). */
  details?: React.ReactNode;
  /** Wide utilization panel under the identity/details row. */
  utilization?: React.ReactNode;
  /** Side cards stacked in a column that spans both rows; omit for a two-column grid. */
  aside?: React.ReactNode;
  className?: string;
}

/**
 * Responsive object overview grid. Sized by its own width (container query), so it collapses to a single
 * column below 860 px of available space even inside an `AppFrame` with a sidebar.
 */
export function ResourceOverviewLayout({ identity, details, utilization, aside, className }: ResourceOverviewLayoutProps) {
  return (
    <div className={cn("@container min-w-0", className)}>
      <div className={cn("grid grid-cols-1 gap-4", aside ? "@min-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(15rem,0.8fr)]" : "@min-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]")}>
        {identity && <div className="min-w-0 [&>*]:h-full">{identity}</div>}
        {details && <div className={cn("min-w-0 [&>*]:h-full", !identity && "@min-[860px]:col-span-2")}>{details}</div>}
        {aside && <div className="flex min-w-0 flex-col gap-4 @min-[860px]:col-start-3 @min-[860px]:row-span-2 @min-[860px]:row-start-1 @min-[860px]:[&>*]:flex-1">{aside}</div>}
        {utilization && <div className="min-w-0 @min-[860px]:col-span-2">{utilization}</div>}
      </div>
    </div>
  );
}

/* ── PowerState ── */
const stateView: Record<ObjectState, { Icon: LucideIcon; tone: string; text: "stateOn" | "stateOff" | "stateSuspended" | "stateMaintenance" | "stateDisconnected" | "stateWarning" | "stateError" }> = {
  on: { Icon: Power, tone: "text-ok", text: "stateOn" },
  off: { Icon: Power, tone: "text-muted", text: "stateOff" },
  suspended: { Icon: Pause, tone: "text-warn", text: "stateSuspended" },
  maintenance: { Icon: Wrench, tone: "text-warn", text: "stateMaintenance" },
  disconnected: { Icon: Unplug, tone: "text-muted", text: "stateDisconnected" },
  warning: { Icon: TriangleAlert, tone: "text-warn", text: "stateWarning" },
  error: { Icon: CircleX, tone: "text-danger", text: "stateError" },
};

export interface PowerStateProps {
  state: ObjectState;
  /** Replaces the catalogue text for the state (e.g. "Running"). */
  label?: string;
  className?: string;
}

/** Icon + text state indicator; the state is always spelled out, never colour alone. */
export function PowerState({ state, label, className }: PowerStateProps) {
  const { t } = useLaf();
  const v = stateView[state];
  return (
    <span data-state={state} className={cn("inline-flex items-center gap-1.5 text-sm text-fg", className)}>
      <v.Icon aria-hidden className={cn("size-4 shrink-0", v.tone)} />
      {label ?? (t[v.text] as string)}
    </span>
  );
}

/* ── Cards ── */
function EditButton({ title, label, onClick }: { title: string; label?: string; onClick?: () => void }) {
  const { t } = useLaf();
  return <IconButton size="sm" label={label ?? t.components.overview.edit(title)} icon={<Pencil className="size-4" />} onClick={onClick} />;
}

export interface IdentityCardProps {
  /** Large logo or icon at the start (e.g. an OS logo). */
  icon?: React.ReactNode;
  name: string;
  /** Power/status line under the name (usually `PowerState`). */
  status?: React.ReactNode;
  description?: React.ReactNode;
  /** Label ribbon on the inline-end top edge, e.g. "WINDOWS 10". */
  ribbon?: string;
  onEdit?: () => void;
  editLabel?: string;
  headingLevel?: Level;
  className?: string;
  children?: React.ReactNode;
}

export function IdentityCard({ icon, name, status, description, ribbon, onEdit, editLabel, headingLevel = 2, className, children }: IdentityCardProps) {
  return (
    <Card variant="default" className={cn("relative gap-0 overflow-hidden p-0", className)}>
      {ribbon && <span className="absolute end-0 top-0 bg-muted-bg px-3 py-1 text-xs font-semibold tracking-wide text-muted uppercase">{ribbon}</span>}
      <div className="flex min-w-0 flex-wrap items-start gap-5 p-5 pt-9">
        {icon && (
          <div aria-hidden className="grid size-24 shrink-0 place-items-center text-primary [&>svg]:size-full">
            {icon}
          </div>
        )}
        <div className="grid min-w-0 flex-1 basis-48 gap-2">
          <div className="flex items-start gap-2">
            <CardTitle as={`h${headingLevel}` as "h2"} className="min-w-0 flex-1 text-2xl font-normal break-words">
              {name}
            </CardTitle>
            {onEdit && <EditButton title={name} label={editLabel} onClick={onEdit} />}
          </div>
          {status}
          {description && <p className="m-0 text-sm text-muted">{description}</p>}
          {children}
        </div>
      </div>
    </Card>
  );
}

interface CardFrameProps {
  title: string;
  icon?: React.ReactNode;
  count?: number;
  onEdit?: () => void;
  editLabel?: string;
  headingLevel?: Level;
  className?: string;
  bodyClassName?: string;
  children?: React.ReactNode;
}

function CardFrame({ title, icon, count, onEdit, editLabel, headingLevel = 3, className, bodyClassName, children }: CardFrameProps) {
  return (
    <Card variant="default" className={cn("gap-0 p-0", className)}>
      <div className="flex min-w-0 items-center gap-2 border-b border-line px-4 py-2.5">
        <CardTitle as={`h${headingLevel}` as "h3"} className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 text-base font-normal">
          {icon && (
            <span aria-hidden className="inline-flex shrink-0 text-muted [&>svg]:size-5">
              {icon}
            </span>
          )}
          <span>{title}</span>
          {count !== undefined && <Badge className="shrink-0">{count}</Badge>}
        </CardTitle>
        {onEdit && <EditButton title={title} label={editLabel} onClick={onEdit} />}
      </div>
      <div className={cn("min-w-0 flex-1 p-4", bodyClassName)}>{children}</div>
    </Card>
  );
}

export interface DetailsItem {
  id?: string;
  label: string;
  value: React.ReactNode;
  /** Secondary line under the value (e.g. "97% uptime last 7 days"). */
  sub?: React.ReactNode;
}

export interface DetailsCardProps extends Omit<CardFrameProps, "title" | "icon" | "count" | "children"> {
  title?: string;
  items: DetailsItem[];
  /** Columns of term/description pairs (items fill them top to bottom); collapses to one on narrow cards. Default 2. */
  columns?: 1 | 2 | 3;
}

/** Term/description card built on `DescriptionList`; the header carries an optional edit action. */
export function DetailsCard({ title, items, columns = 2, ...rest }: DetailsCardProps) {
  const { t } = useLaf();
  const per = Math.ceil(items.length / columns) || 1;
  const cols = Array.from({ length: columns }, (_, i) => items.slice(i * per, (i + 1) * per)).filter((c) => c.length);
  return (
    <CardFrame title={title ?? t.components.overview.details} {...rest}>
      <div className="@container">
        <div className={cn("grid grid-cols-1 gap-x-8 gap-y-3.5", columns === 2 && "@min-[34rem]:grid-cols-2", columns === 3 && "@min-[34rem]:grid-cols-2 @min-[52rem]:grid-cols-3")}>
          {cols.map((col, i) => (
            <DescriptionList key={i} layout="horizontal" compact={false} className="content-start">
              {col.map((it) => (
                <DescriptionListGroup key={it.id ?? it.label} className="items-baseline grid-cols-[minmax(5rem,8rem)_minmax(0,1fr)]">
                  <DescriptionListTerm className="text-sm font-semibold tracking-normal text-fg normal-case">{it.label}</DescriptionListTerm>
                  <DescriptionListDescription>
                    {it.value}
                    {it.sub && <span className="block text-xs text-muted italic">{it.sub}</span>}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              ))}
            </DescriptionList>
          ))}
        </div>
      </div>
    </CardFrame>
  );
}

export interface SideCardProps extends Omit<CardFrameProps, "bodyClassName"> {
  /** Shown instead of the children when there are none. */
  empty?: React.ReactNode;
}

/** Compact side card: icon, title, count badge, edit action and a body with an empty state. */
export function SideCard({ empty, children, ...rest }: SideCardProps) {
  const { t } = useLaf();
  const hasContent = React.Children.toArray(children).length > 0;
  return <CardFrame {...rest}>{hasContent ? children : <p className="m-0 text-sm text-muted">{empty ?? t.components.overview.empty}</p>}</CardFrame>;
}

export interface CountCardItem {
  id: string;
  content: React.ReactNode;
}

export interface CountCardProps extends Omit<SideCardProps, "children" | "count"> {
  items: CountCardItem[];
  /** Badge number; defaults to `items.length`. */
  count?: number;
}

/** `SideCard` that renders a list and badges its length. */
export function CountCard({ items, count, ...rest }: CountCardProps) {
  return (
    <SideCard count={count ?? items.length} {...rest}>
      {items.length > 0 && (
        <ul className="m-0 grid list-none gap-1.5 p-0 text-sm">
          {items.map((it) => (
            <li key={it.id} className="min-w-0 break-words">
              {it.content}
            </li>
          ))}
        </ul>
      )}
    </SideCard>
  );
}

/* ── Utilization ── */
export interface UtilizationPanelProps {
  title?: string;
  headingLevel?: Level;
  /** Minimum column width before the columns wrap. Default 8rem. */
  min?: string;
  className?: string;
  children?: React.ReactNode;
}

export function UtilizationPanel({ title, headingLevel = 3, min = "8rem", className, children }: UtilizationPanelProps) {
  const { t } = useLaf();
  return (
    <Card variant="default" className={cn("gap-0 p-0", className)}>
      <div className="border-b border-line px-5 py-3">
        <CardTitle as={`h${headingLevel}` as "h3"} className="text-base font-normal">
          {title ?? t.components.overview.utilization.title}
        </CardTitle>
      </div>
      <div className="grid gap-x-6 gap-y-6 p-5" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))` }}>
        {children}
      </div>
    </Card>
  );
}

export interface UtilizationColumnProps {
  title: string;
  /** Big number: what is still available, in the unit named by `capacity`. */
  available: React.ReactNode;
  /** Total with unit, shown as "of …" next to the number, e.g. "1000 MHz". */
  capacity: string;
  /** Current usage, in the same unit as `max`. */
  used: number;
  /** Scale of the ring (default 100: `used` is a percentage). */
  max?: number;
  /** Warning / critical thresholds as percentages of `max`. */
  warnAt?: number;
  dangerAt?: number;
  /** Ring centre text instead of the percentage (e.g. "25"). */
  centerText?: React.ReactNode;
  /** Text under the centre value; defaults to "Used". */
  centerSubtext?: React.ReactNode;
  /** `donut` (default, `ThresholdDonut`) or the 270° `radial` gauge. */
  gauge?: "donut" | "radial";
  /** Colour of the ring below `warnAt` (donut and radial). Default `ok`. */
  okTone?: "primary" | "ok";
  /** Last-N samples for the trend line. */
  history?: number[];
  /** Caption under the trend, default "Last 7 days". */
  rangeLabel?: string;
  /** Formats the trend tooltip value. */
  formatValue?: (v: number) => string;
  /** Per-sample tooltip headers for the trend. */
  xLabels?: string[];
  /** Ring size in px. Default 128. */
  size?: number;
  /** Ring entry/change animation and trend draw-in; off under reduced motion. Default on. */
  animate?: ChartAnimate;
  /** Tooltip for the ring and trend (the radial gauge has none). Default on. */
  tooltip?: ChartTooltipOption;
  headingLevel?: 3 | 4 | 5;
  className?: string;
}

/** One resource column: heading, available/capacity, threshold ring and a trend line with its range caption. */
export function UtilizationColumn({
  title,
  available,
  capacity,
  used,
  max = 100,
  warnAt = 60,
  dangerAt = 90,
  centerText,
  centerSubtext,
  gauge = "donut",
  okTone = "ok",
  history,
  rangeLabel,
  formatValue,
  xLabels,
  size = 128,
  animate,
  tooltip = true,
  headingLevel = 4,
  className,
}: UtilizationColumnProps) {
  const { t } = useLaf();
  const m = t.components.overview.utilization;
  const Heading = `h${headingLevel}` as "h4";
  const id = React.useId();
  const used$ = centerSubtext ?? m.used;
  const thresholds: GaugeThreshold[] = [
    ...(okTone === "ok" ? [{ value: 0, tone: "ok" as const }] : []),
    { value: (warnAt / 100) * max, tone: "warn" },
    { value: (dangerAt / 100) * max, tone: "danger" },
  ];
  return (
    <div role="group" aria-labelledby={id} className={cn("grid min-w-0 content-start gap-3", className)}>
      <Heading id={id} className="m-0 text-base font-normal text-fg">
        {title}
      </Heading>
      <div className="flex items-end gap-2 border-b border-line pb-2">
        <span className="text-3xl leading-none font-light text-fg tabular-nums">{available}</span>
        <span className="pb-0.5 text-xs leading-tight text-muted">
          <span className="block">{m.available}</span>
          <span className="block">{m.ofTotal(capacity)}</span>
        </span>
      </div>
      <div className="grid place-items-center py-1">
        {gauge === "radial" ? (
          <RadialGauge label={title} value={used} max={max} size={size} thresholds={thresholds} formatValue={(v) => String(Math.round(v))} unit={max === 100 ? "%" : undefined} animate={animate} />
        ) : (
          <ThresholdDonut
            label={title}
            value={used}
            max={max}
            warnAt={warnAt}
            dangerAt={dangerAt}
            okTone={okTone}
            size={size}
            legend={false}
            centerText={centerText}
            subtext={used$}
            animate={animate}
            tooltip={tooltip}
          />
        )}
      </div>
      {history && history.length > 1 && (
        <div className="grid gap-1">
          <Sparkline data={history} label={m.trend(title)} area animate={animate} tooltip={tooltip} formatValue={formatValue} xLabels={xLabels} className="h-12 w-full" />
          <span className="text-xs text-muted">{rangeLabel ?? m.range}</span>
        </div>
      )}
    </div>
  );
}

/* ── ObjectHeader ── */
export interface ObjectHeaderProps {
  /** Ancestors of the object, e.g. "Virtual Machines". The object itself is the `title`. */
  breadcrumb?: BreadcrumbItemProps[];
  title: string;
  /** Icon button next to the title (switch / compare object). */
  onSwitch?: () => void;
  switchIcon?: React.ReactNode;
  switchLabel?: string;
  /** Actions row under the breadcrumb, aligned to the inline end; usually an `ActionToolbar`. */
  actions?: React.ReactNode;
  /** Accessible name of the breadcrumb navigation. */
  breadcrumbLabel?: string;
  headingLevel?: 1 | 2;
  className?: string;
}

export function ObjectHeader({ breadcrumb = [], title, onSwitch, switchIcon, switchLabel, actions, breadcrumbLabel, headingLevel = 1, className }: ObjectHeaderProps) {
  const { t } = useLaf();
  const H = `h${headingLevel}` as "h1";
  return (
    <header className={cn("border-b border-line bg-surface", className)}>
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 px-5 py-3">
        {breadcrumb.length > 0 && (
          <>
            <Breadcrumb items={breadcrumb.map((b) => ({ ...b, current: false }))} label={breadcrumbLabel} />
            <ChevronRight aria-hidden className="size-4 shrink-0 text-subtle rtl:rotate-180" />
          </>
        )}
        <H className="m-0 min-w-0 text-2xl leading-tight font-normal break-words text-fg">{title}</H>
        {onSwitch && <IconButton variant="secondary" size="sm" label={switchLabel ?? t.components.overview.switchObject} icon={switchIcon ?? <SwitchGlyph />} onClick={onSwitch} />}
      </div>
      {actions && <div className="flex min-w-0 justify-end border-t border-line px-5 py-3">{actions}</div>}
    </header>
  );
}

function SwitchGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
      <path d="M4 8h15m-4-4 4 4-4 4M20 16H5m4-4-4 4 4 4" />
    </svg>
  );
}

/* ── ActionToolbar ── */
export interface ToolbarMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export interface ToolbarAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonProps["variant"];
  disabled?: boolean;
  /** Turns the action into a split button: the main part runs `onClick`, the chevron opens these items. */
  menu?: ToolbarMenuItem[];
  /** Accessible name of the chevron; default "<label> options". */
  menuLabel?: string;
}

export interface ActionToolbarProps {
  actions: ToolbarAction[];
  /** Accessible name of the group; default "Actions". */
  label?: string;
  size?: ButtonProps["size"];
  className?: string;
}

/**
 * Row of buttons and split buttons (menus close on Escape and are fully keyboard operable). The first
 * `variant: "primary"` entry stays the visual call to action; others default to `secondary`.
 */
export function ActionToolbar({ actions, label, size, className }: ActionToolbarProps) {
  const { t } = useLaf();
  return (
    <div role="group" aria-label={label ?? t.components.overview.actions} className={cn("flex min-w-0 flex-wrap items-center justify-end gap-2", className)}>
      {actions.map((a) => {
        const variant = a.variant ?? "secondary";
        const content = (
          <>
            {a.icon}
            {a.label}
          </>
        );
        return a.menu ? (
          <SplitButton
            key={a.id}
            variant={variant}
            size={size}
            disabled={a.disabled}
            onClick={() => a.onClick?.()}
            menuLabel={a.menuLabel ?? t.components.overview.actionOptions(a.label)}
            menu={a.menu.map((m) => (
              <DropdownMenuItem key={m.id} danger={m.danger} disabled={m.disabled} onSelect={() => m.onSelect?.()}>
                {m.icon}
                {m.label}
              </DropdownMenuItem>
            ))}
          >
            {content}
          </SplitButton>
        ) : (
          <Button key={a.id} variant={variant} size={size} disabled={a.disabled} onClick={() => a.onClick?.()}>
            {content}
          </Button>
        );
      })}
    </div>
  );
}
