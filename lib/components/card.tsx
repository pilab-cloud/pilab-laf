import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { dashboardEn } from "../messages/dashboard.en";
import { useControllableState } from "../utils";
import { Skeleton } from "./feedback";

const lafDefaults = { dashboard: dashboardEn };
const useLaf = () => useLafDefaults(lafDefaults);

export type CardVariant = "default" | "outlined" | "elevated" | "flat";
export type CardStatus = "ok" | "warn" | "danger" | "info" | "neutral";

const variantClass: Record<CardVariant, string> = {
  default: "border border-line bg-surface",
  outlined: "border border-line-strong bg-transparent",
  elevated: "border border-line bg-surface shadow-(--shadow-card)",
  flat: "border border-transparent bg-muted-bg",
};

const accentClass: Record<CardStatus, string> = {
  ok: "border-s-4 border-s-ok",
  warn: "border-s-4 border-s-warn",
  danger: "border-s-4 border-s-danger",
  info: "border-s-4 border-s-primary",
  neutral: "border-s-4 border-s-line-strong",
};

export interface CardProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
  /** Omit for the original centred "auth" card; any value switches to the dashboard card family. */
  variant?: CardVariant;
  compact?: boolean;
  /** Coloured accent on the inline-start edge; the status is never conveyed by colour alone, so add text in the card too. */
  status?: CardStatus;
  /** Toggle-card: renders `role="checkbox"`; do not nest interactive controls inside. */
  selectable?: boolean;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  /** Makes the whole card a link. */
  href?: string;
  /** Skeleton instead of the children; sets `aria-busy`. */
  loading?: boolean;
  /** Number of skeleton lines while loading. */
  skeletonLines?: number;
}

const isNew = (p: CardProps) =>
  p.variant !== undefined || p.compact !== undefined || p.status !== undefined || p.selectable !== undefined || p.href !== undefined || p.loading !== undefined;

export function Card(props: CardProps) {
  const { variant, compact, status, selectable, selected, onSelectedChange, href, loading, skeletonLines = 3, className, children, onClick, onKeyDown, ...rest } = props;
  const { t } = useLaf();
  if (!isNew(props)) {
    return (
      <div className={cn("card", className)} onClick={onClick} onKeyDown={onKeyDown} {...rest}>
        {children}
      </div>
    );
  }
  const interactive = !!onClick || !!selectable;
  const classes = cn(
    "group/card relative flex min-w-0 flex-col rounded-md text-fg",
    variantClass[variant ?? "default"],
    status && accentClass[status],
    compact ? "gap-2 p-3" : "gap-4 p-4",
    (interactive || href) && "cursor-pointer outline-none transition-colors hover:border-line-strong hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary/50 motion-reduce:transition-none",
    selected && "border-primary bg-primary-light",
    className,
  );
  const body = loading ? (
    <div className="grid gap-2" role="status" aria-label={t.components.dashboard.card.loading}>
      {Array.from({ length: skeletonLines }, (_, i) => (
        <Skeleton key={i} className={i === 0 ? "h-5 w-1/2" : i === skeletonLines - 1 ? "w-2/3" : "w-full"} />
      ))}
    </div>
  ) : (
    children
  );
  if (href) {
    return (
      <a href={href} className={classes} aria-busy={loading || undefined} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
        {body}
      </a>
    );
  }
  const activate = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (selectable) onSelectedChange?.(!selected);
    if (onClick) (onClick as (e: React.SyntheticEvent<HTMLDivElement>) => void)(e);
  };
  return (
    <div
      {...rest}
      className={classes}
      aria-busy={loading || undefined}
      role={selectable ? "checkbox" : onClick ? "button" : rest.role}
      aria-checked={selectable ? !!selected : undefined}
      tabIndex={interactive ? 0 : rest.tabIndex}
      onClick={interactive ? activate : undefined}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (interactive && !e.defaultPrevented && e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          activate(e);
        }
      }}
    >
      {body}
    </div>
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex min-w-0 items-start justify-between gap-3", className)} {...props} />;
}

export function CardTitle({ as: Tag = "h3", className, ...props }: React.ComponentProps<"h3"> & { as?: "h2" | "h3" | "h4" | "div" }) {
  return <Tag className={cn("m-0 min-w-0 text-sm font-semibold text-fg", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("m-0 text-xs text-muted", className)} {...props} />;
}

export function CardActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("ms-auto flex shrink-0 items-center gap-1.5", className)} {...props} />;
}

export function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("min-w-0 flex-1", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-center gap-2 border-t border-line pt-3 text-xs text-muted", className)} {...props} />;
}

/** Responsive grid of cards: as many columns of at least `min` as fit. */
export function CardGrid({ min = "16rem", className, style, ...props }: React.ComponentProps<"div"> & { min?: string }) {
  return (
    <div
      className={cn("grid gap-4", className)}
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${min}), 1fr))`, ...style }}
      {...props}
    />
  );
}

export interface ExpandableCardProps extends Omit<CardProps, "title" | "onSelect"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  headingLevel?: 2 | 3 | 4;
  footer?: React.ReactNode;
}

/** Card whose body toggles via a disclosure button in the header. */
export function ExpandableCard({ title, description, actions, open: openProp, defaultOpen = false, onOpenChange, headingLevel = 3, footer, children, variant = "default", ...props }: ExpandableCardProps) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const uid = React.useId();
  return (
    <Card variant={variant} {...props}>
      <CardHeader>
        <CardTitle as={`h${headingLevel}` as "h3"} className="flex-1">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={`${uid}-body`}
            onClick={() => setOpen(!open)}
            className="flex w-full min-w-0 items-start gap-2 border-0 bg-transparent p-0 text-start font-[inherit] text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <ChevronDown aria-hidden className={cn("mt-0.5 size-4 shrink-0 text-muted transition-transform motion-reduce:transition-none", !open && "-rotate-90 rtl:rotate-90")} />
            <span className="min-w-0">{title}</span>
          </button>
        </CardTitle>
        {actions && <CardActions>{actions}</CardActions>}
      </CardHeader>
      {description && <CardDescription className="-mt-2 ps-6">{description}</CardDescription>}
      <div id={`${uid}-body`} hidden={!open}>
        {open && <CardBody>{children}</CardBody>}
        {open && footer && <CardFooter className="mt-3">{footer}</CardFooter>}
      </div>
    </Card>
  );
}
