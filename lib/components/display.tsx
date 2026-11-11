import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import * as React from "react";
import { useLaf } from "../i18n";
import { cn } from "../cn";
import { Tooltip, TooltipProvider } from "./overlay";

type Tone = "error" | "success" | "warning" | "info";

const alertIcon = { error: XCircle, success: CheckCircle2, warning: AlertTriangle, info: Info };
const alertClass: Record<Tone, string> = {
  error: "alert-error",
  success: "alert-success",
  warning: "alert-warning",
  info: "border-primary/35 bg-primary-light text-primary",
};

export function Alert({
  tone = "info",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const Icon = alertIcon[tone];
  return (
    <div
      className={cn("alert", alertClass[tone], className)}
      role={tone === "error" || tone === "warning" ? "alert" : "status"}
    >
      <span className="alert-icon">
        <Icon aria-hidden />
      </span>
      <div>{children}</div>
    </div>
  );
}

const badgeClass = {
  neutral: "",
  ok: "badge-ok",
  warn: "badge-warn",
  danger: "badge-danger",
  primary: "badge-primary",
} as const;

export function Badge({
  tone = "neutral",
  plain,
  className,
  children,
}: {
  tone?: keyof typeof badgeClass;
  plain?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn("badge", badgeClass[tone], plain && "plain", className)}>{children}</span>;
}

export function Avatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
  const sizing = size === "sm" ? "size-5 text-[0.625rem]" : size === "lg" ? "size-10 text-base" : "";
  return (
    <span className={cn("avatar", sizing, className)} title={name} role="img" aria-label={name}>
      {src ? <img src={src} alt="" className="size-full rounded-[inherit] object-cover" /> : initials}
    </span>
  );
}

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("card", className)} {...props} />;
}

export function Panel({
  title,
  actions,
  children,
  className,
  bodyClassName,
  headingLevel = 3,
}: {
  /** Heading level of the title; pick the one that follows the page's outline. */
  headingLevel?: 2 | 3 | 4;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <section className={cn("panel", className)}>
      {(title || actions) && (
        <header className="panel-head">
          <Heading className="panel-title">{title}</Heading>
          {actions}
        </header>
      )}
      <div className={cn("panel-body", bodyClassName)}>{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  delta,
  down,
}: {
  label: string;
  value: React.ReactNode;
  delta?: string;
  down?: boolean;
}) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {delta && <div className={cn("stat-delta", down && "down")}>{delta}</div>}
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return <div className="stat-grid">{children}</div>;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="empty">
      {icon}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}

/** Single-line text that shows its full content in a tooltip while it is actually truncated. */
export function TruncatedText({ children, text, className }: { children?: React.ReactNode; text?: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [open, setOpen] = React.useState(false);
  const full = text ?? (typeof children === "string" ? children : undefined);
  const span = (
    <span ref={ref} className={cn("block min-w-0 truncate", className)}>
      {children ?? text}
    </span>
  );
  if (full === undefined) return span;
  return (
    <TooltipProvider>
      <Tooltip content={full} open={open} onOpenChange={(o) => setOpen(o && !!ref.current && ref.current.scrollWidth > ref.current.clientWidth)}>
        {span}
      </Tooltip>
    </TooltipProvider>
  );
}

export interface BreadcrumbItemProps {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  icon?: React.ReactNode;
  /** Router-link escape hatch: return your `<Link>`; spread `props` onto it. */
  render?: (props: { className: string; children: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent<HTMLElement>) => void; "aria-current"?: "page" }) => React.ReactElement;
  /** Overrides the default "last item is the current page". */
  current?: boolean;
}

export function Breadcrumb({
  items,
  maxItems,
  label,
  separator,
}: {
  items: BreadcrumbItemProps[];
  maxItems?: number;
  label?: string;
  /** Replaces the default "/" between items; decorative. */
  separator?: React.ReactNode;
}) {
  const { t: laf } = useLaf();
  const [expanded, setExpanded] = React.useState(false);
  const collapsed = !expanded && maxItems !== undefined && maxItems >= 2 && items.length > maxItems;
  const hidden = collapsed ? items.length - (maxItems - 1) : 0;
  const entry = (it: BreadcrumbItemProps, i: number) => {
    const isCurrent = it.current ?? i === items.length - 1;
    const children = (
      <>
        {it.icon}
        <TruncatedText text={it.label} className="max-w-64" />
      </>
    );
    const cls = "inline-flex min-w-0 items-center gap-1.5";
    const aria = isCurrent ? ({ "aria-current": "page" } as const) : {};
    if (it.render) return it.render({ className: cls, children, href: it.href, onClick: it.onClick, ...aria });
    if (it.href || it.onClick) {
      return (
        <a href={it.href} onClick={it.onClick} className={cn(cls, isCurrent && "text-fg")} {...aria}>
          {children}
        </a>
      );
    }
    return (
      <span className={cn(cls, isCurrent ? "text-fg" : "text-muted")} {...aria}>
        {children}
      </span>
    );
  };
  return (
    <nav className={cn("breadcrumb flex-wrap", separator !== undefined && "[&>span]:before:content-none")} aria-label={label ?? laf.breadcrumb}>
      {items.map((it, i) => {
        if (collapsed && i > 0 && i <= hidden) {
          return i === 1 ? (
            <span key="more">
              {separator !== undefined && <span aria-hidden className="me-1.5 text-subtle">{separator}</span>}
              <button type="button" aria-label={laf.showHiddenLevels(hidden)} onClick={() => setExpanded(true)} className="border-0 bg-transparent p-0 text-muted">
                …
              </button>
            </span>
          ) : null;
        }
        const key = `${i}-${it.label}`;
        return i === 0 ? (
          <React.Fragment key={key}>{entry(it, i)}</React.Fragment>
        ) : (
          <span key={key} className="inline-flex min-w-0 items-center">
            {separator !== undefined && <span aria-hidden className="me-1.5 text-subtle">{separator}</span>}
            {entry(it, i)}
          </span>
        );
      })}
    </nav>
  );
}

export function PageHead({
  title,
  description,
  actions,
  breadcrumb,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
      <div className="page-head !mb-0">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        {actions && <div className="flex gap-2.5">{actions}</div>}
      </div>
    </div>
  );
}
