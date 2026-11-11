import { AlertTriangle, CheckCircle2, ChevronDown, Info, Megaphone, X, XCircle } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { dashboardEn } from "../messages/dashboard.en";
import { useControllableState } from "../utils";

const lafDefaults = { dashboard: dashboardEn };
const useLaf = () => useLafDefaults(lafDefaults);

/** `error`/`danger` and `warn`/`warning` are aliases (the original `Alert` used `error`/`warning`, `Banner` used `warn`). */
export type AlertTone = "info" | "success" | "warning" | "warn" | "danger" | "error" | "neutral";
type Canon = "info" | "success" | "warning" | "danger" | "neutral";

const canon = (t: AlertTone): Canon => (t === "error" ? "danger" : t === "warn" ? "warning" : t);

const icons = { info: Info, success: CheckCircle2, warning: AlertTriangle, danger: XCircle, neutral: Megaphone };
const toneClass: Record<Canon, string> = {
  info: "border-primary/35 bg-primary-light text-primary",
  success: "alert-success",
  warning: "alert-warning",
  danger: "alert-error",
  neutral: "border-line bg-muted-bg text-fg",
};

export interface AlertProps {
  tone?: AlertTone;
  /** Alias of `tone`; wins when both are given. */
  variant?: AlertTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons/links shown below the text. */
  actions?: React.ReactNode;
  /** Shows a close button. */
  onClose?: () => void;
  closeLabel?: string;
  /** Tighter padding, no icon spacing. */
  compact?: boolean;
  /** No box: just icon and text, for use inside forms and cards. */
  inline?: boolean;
  /** Extra content revealed by a "Show details" disclosure. */
  detail?: React.ReactNode;
  /** Overrides the severity-based role (`alert` for warning/danger, `status` otherwise). */
  role?: "alert" | "status" | "note";
  className?: string;
  children?: React.ReactNode;
}

export function Alert({ tone = "info", variant, title, description, actions, onClose, closeLabel, compact, inline, detail, role, className, children }: AlertProps) {
  const { t } = useLaf();
  const c = canon(variant ?? tone);
  const Icon = icons[c];
  const [open, setOpen] = useControllableState({ defaultValue: false });
  const uid = React.useId();
  const text = t.components.dashboard.alert;
  return (
    <div
      className={cn("alert", toneClass[c], compact && "px-2.5 py-1.5 text-xs", inline && "mb-0! border-0 bg-transparent px-0 py-1", className)}
      role={role ?? (c === "danger" || c === "warning" ? "alert" : "status")}
    >
      <span className="alert-icon">
        <Icon aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        {title && <div className="font-semibold">{title}</div>}
        {description && <div className={cn(title && "mt-0.5", "text-fg/90")}>{description}</div>}
        {children && <div className={cn((title || description) && "mt-0.5")}>{children}</div>}
        {detail && (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${uid}-detail`}
              onClick={() => setOpen(!open)}
              className="mt-1 inline-flex items-center gap-1 border-0 bg-transparent p-0 text-xs font-medium text-inherit underline outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <ChevronDown aria-hidden className={cn("size-3.5 transition-transform motion-reduce:transition-none", open && "rotate-180")} />
              {open ? text.hideDetails : text.showDetails}
            </button>
            <div id={`${uid}-detail`} hidden={!open} className="mt-1.5 text-fg/90">
              {detail}
            </div>
          </>
        )}
        {actions && <div className="mt-2 flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {onClose && (
        <button type="button" aria-label={closeLabel ?? t.dismiss} onClick={onClose} className="shrink-0 border-0 bg-transparent p-0.5 text-inherit opacity-80 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-primary/50">
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

/** Vertical stack of alerts; with `max`, the rest hide behind a "Show N more" button. */
export function AlertGroup({ max, label, className, children }: { max?: number; label?: string; className?: string; children: React.ReactNode }) {
  const { t } = useLaf();
  const [all, setAll] = React.useState(false);
  const items = React.Children.toArray(children);
  const limited = max !== undefined && !all && items.length > max;
  return (
    <div role="group" aria-label={label} className={cn("grid gap-2 [&_.alert]:mb-0", className)}>
      {limited ? items.slice(0, max) : items}
      {max !== undefined && items.length > max && (
        <button type="button" onClick={() => setAll(!all)} className="justify-self-start border-0 bg-transparent p-0 text-xs font-medium text-primary hover:underline">
          {all ? t.components.dashboard.alert.less : t.components.dashboard.alert.more(items.length - max)}
        </button>
      )}
    </div>
  );
}

const bannerTone: Record<Canon, string> = {
  info: "border-primary/35 bg-primary-light text-primary",
  success: "border-ok-line bg-ok-bg text-ok",
  warning: "border-warn-line bg-warn-bg text-warn",
  danger: "border-danger-line bg-danger-bg text-danger",
  neutral: "border-line bg-muted-bg text-fg",
};

/** Page-wide message above the app chrome. `danger` is announced assertively (`role="alert"`), the rest politely. */
export function Banner({
  tone = "info",
  action,
  onDismiss,
  dismissLabel,
  sticky,
  className,
  children,
}: {
  tone?: AlertTone;
  action?: React.ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
  /** Sticks to the top of the scroll container. */
  sticky?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const c = canon(tone);
  const Icon = icons[c];
  const { t } = useLaf();
  return (
    <div role={c === "danger" ? "alert" : "status"} className={cn("flex items-center gap-2.5 border-b px-4 py-2 text-sm", bannerTone[c], sticky && "sticky top-0 z-40", className)}>
      <Icon className="size-4 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">{children}</div>
      {action}
      {onDismiss && (
        <button type="button" aria-label={dismissLabel ?? t.dismiss} onClick={onDismiss} className="opacity-80 hover:opacity-100">
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
