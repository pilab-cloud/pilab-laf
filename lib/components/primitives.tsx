import * as SelectPrimitive from "@radix-ui/react-select";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf } from "../i18n";
import { Button, type ButtonProps } from "./button";
import { Avatar } from "./display";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./overlay";

/** Tooltip that works without an app-level provider. */
function Tip({ content, children }: { content: React.ReactNode; children: React.ReactElement }) {
  return (
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={6}
            className="z-60 rounded-md border border-line-strong bg-menu px-2 py-1 text-xs text-fg shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

/* ── Select (Radix); named SelectMenu because core already exports the native `Select` ── */
export interface SelectOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}
export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  options: (SelectOption | SelectGroup)[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  "aria-label"?: string;
  className?: string;
}

const isGroup = (o: SelectOption | SelectGroup): o is SelectGroup => "options" in o;

function SelectItem({ o }: { o: SelectOption }) {
  return (
    <SelectPrimitive.Item
      value={o.value}
      disabled={o.disabled}
      textValue={typeof o.label === "string" ? o.label : undefined}
      className="dropdown-item outline-none data-[disabled]:opacity-50 data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg"
    >
      {o.icon}
      <span className="min-w-0 flex-1">
        <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
        {o.description && <span className="block text-xs text-muted">{o.description}</span>}
      </span>
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4" aria-hidden />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export function SelectMenu({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  invalid,
  disabled,
  name,
  id,
  className,
  "aria-label": ariaLabel,
}: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} name={name}>
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        className={cn("form-input flex items-center justify-between gap-2 text-start", invalid && "error", className)}
      >
        <span className="min-w-0 flex-1 truncate">
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>
        <SelectPrimitive.Icon>
          <ChevronDown className="size-4 text-muted" aria-hidden />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className="dropdown-menu relative! top-auto! left-auto! z-60 max-h-72 min-w-(--radix-select-trigger-width) overflow-auto"
        >
          <SelectPrimitive.Viewport>
            {options.map((o, i) =>
              isGroup(o) ? (
                <SelectPrimitive.Group key={`${o.label}-${i}`}>
                  <SelectPrimitive.Label className="dropdown-label">{o.label}</SelectPrimitive.Label>
                  {o.options.map((c) => (
                    <SelectItem key={c.value} o={c} />
                  ))}
                </SelectPrimitive.Group>
              ) : (
                <SelectItem key={o.value} o={o} />
              ),
            )}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

/* ── SegmentedControl (Radix ToggleGroup) ── */
export interface SegmentedItem {
  value: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  /** Required for icon-only items. */
  "aria-label"?: string;
  disabled?: boolean;
}

type SegmentedBase = { items: SegmentedItem[]; "aria-label": string; className?: string; disabled?: boolean };
export type SegmentedControlProps = SegmentedBase &
  (
    | { type?: "single"; value?: string; defaultValue?: string; onValueChange?: (v: string) => void }
    | { type: "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?: (v: string[]) => void }
  );

export function SegmentedControl(props: SegmentedControlProps) {
  const { items, className, disabled, "aria-label": ariaLabel } = props;
  const common = {
    "aria-label": ariaLabel,
    disabled,
    className: cn("inline-flex h-8 items-stretch rounded-md border border-line", className),
  };
  const children = items.map((it) => (
    <ToggleGroupPrimitive.Item
      key={it.value}
      value={it.value}
      disabled={it.disabled}
      aria-label={it["aria-label"]}
      className="inline-flex items-center gap-1.5 border-s border-line px-3 text-sm text-muted outline-none first:border-s-0 first:rounded-s-md last:rounded-e-md hover:text-fg focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 data-[state=on]:bg-primary-light data-[state=on]:text-primary"
    >
      {it.icon}
      {it.label}
    </ToggleGroupPrimitive.Item>
  ));
  if (props.type === "multiple") {
    return (
      <ToggleGroupPrimitive.Root type="multiple" value={props.value} defaultValue={props.defaultValue} onValueChange={props.onValueChange} {...common}>
        {children}
      </ToggleGroupPrimitive.Root>
    );
  }
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={props.value}
      defaultValue={props.defaultValue}
      // an empty string means the selected item was toggled off; single mode keeps one selected
      onValueChange={(v) => v && props.onValueChange?.(v)}
      {...common}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

/* ── IconButton ── */
export type IconButtonProps = Omit<ButtonProps, "children" | "leftIcon" | "rightIcon" | "aria-label"> & {
  /** Accessible name; also shown as the tooltip. */
  label: string;
  icon: React.ReactNode;
};

export function IconButton({ label, icon, className, ...props }: IconButtonProps) {
  return (
    <Tip content={label}>
      <Button variant="ghost" aria-label={label} className={cn("px-0", props.size === "sm" ? "w-7" : "w-8", className)} {...props}>
        <span aria-hidden className="inline-flex">
          {icon}
        </span>
      </Button>
    </Tip>
  );
}

/* ── StatusDot ── */
const dotTone = {
  ok: "bg-ok",
  warn: "bg-warn",
  danger: "bg-danger",
  neutral: "bg-muted",
  primary: "bg-primary",
};

export function StatusDot({
  tone = "neutral",
  pulse,
  label,
  srOnly,
  className,
}: {
  tone?: keyof typeof dotTone;
  pulse?: boolean;
  label: string;
  /** Hide the text visually (still announced). */
  srOnly?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <span
        aria-hidden
        className={cn("inline-block size-2 shrink-0 rounded-xs", dotTone[tone], pulse && "animate-pulse motion-reduce:animate-none")}
      />
      <span className={cn(srOnly && "sr-only")}>{label}</span>
    </span>
  );
}

/* ── RelativeTime ── */
const tickListeners = new Set<() => void>();
let tickTimer: ReturnType<typeof setInterval> | undefined;
let tickNow = 0;

function subscribeTick(fn: () => void) {
  tickListeners.add(fn);
  if (!tickTimer) {
    tickTimer = setInterval(() => {
      tickNow = Date.now();
      tickListeners.forEach((l) => l());
    }, 30_000);
  }
  return () => {
    tickListeners.delete(fn);
    if (!tickListeners.size && tickTimer) {
      clearInterval(tickTimer);
      tickTimer = undefined;
    }
  };
}
const getTick = () => (tickNow ||= Date.now());

const relUnits: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
  ["second", 1],
];

export function formatRelative(date: Date, now: number, locale?: string): string {
  const diff = Math.round((date.getTime() - now) / 1000);
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (abs < 45) return rtf.format(0, "second");
  const [unit, secs] = relUnits.find(([, s]) => abs >= s) ?? relUnits[relUnits.length - 1]!;
  return rtf.format(Math.round(diff / secs), unit);
}

export function RelativeTime({ value, className }: { value: Date | string | number; className?: string }) {
  const { locale } = useLaf();
  const now = React.useSyncExternalStore(subscribeTick, getTick, getTick);
  const date = new Date(value);
  const local = date.toLocaleString(locale);
  const utc = date.toLocaleString(locale, { timeZone: "UTC", timeZoneName: "short" });
  return (
    <Tip
      content={
        <span className="grid gap-0.5">
          <span>{local}</span>
          <span className="text-muted">{utc}</span>
        </span>
      }
    >
      <time dateTime={date.toISOString()} className={className}>
        {formatRelative(date, now, locale)}
      </time>
    </Tip>
  );
}

/* ── ButtonGroup / SplitButton ── */
export function ButtonGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-stretch [&>*:not(:first-child)]:-ms-px [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none",
        className,
      )}
      {...props}
    />
  );
}

export function SplitButton({
  children,
  onClick,
  variant = "primary",
  size,
  disabled,
  menuLabel = "More actions",
  menu,
  className,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  disabled?: boolean;
  /** Accessible name of the chevron button. */
  menuLabel?: string;
  /** DropdownMenuItem children. */
  menu: React.ReactNode;
  className?: string;
}) {
  return (
    <ButtonGroup className={className}>
      <Button variant={variant} size={size} disabled={disabled} onClick={onClick}>
        {children}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size={size} disabled={disabled} aria-label={menuLabel} className="px-2">
            <ChevronDown aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{menu}</DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}

/* ── AvatarGroup ── */
export function AvatarGroup({
  users,
  max = 4,
  size = "md",
  className,
}: {
  users: { name: string; src?: string }[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const shown = users.slice(0, max);
  const rest = users.slice(max);
  const ring = "ring-2 ring-surface";
  return (
    <div role="group" aria-label={users.map((u) => u.name).join(", ")} className={cn("flex items-center", className)}>
      {shown.map((u, i) => (
        <Avatar key={`${u.name}-${i}`} name={u.name} src={u.src} size={size} className={cn(ring, i > 0 && "-ms-2")} />
      ))}
      {rest.length > 0 && (
        <Tip content={rest.map((u) => u.name).join(", ")}>
          <span
            tabIndex={0}
            aria-label={`+${rest.length}`}
            className={cn("avatar -ms-2 outline-none focus-visible:ring-primary", ring, size === "sm" ? "size-5 text-[0.625rem]" : size === "lg" ? "size-10 text-base" : "")}
          >
            +{rest.length}
          </span>
        </Tip>
      )}
    </div>
  );
}
