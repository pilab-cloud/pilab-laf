import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as React21 from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { Loader2, Info, AlertTriangle, CheckCircle2, XCircle, X, ChevronLeft, ChevronRight, ChevronDown, KeyRound, Tablet, Laptop, Smartphone, Check, Copy, EyeOff, Eye, ArrowUp, ArrowDown, LogOut, Minus, Plus, Pencil, UploadCloud, Search, Fingerprint, MoreHorizontal, ChevronUp, Menu as Menu$1, FolderKanban, CircleDot, AppWindow, Users, User, Camera, Waypoints, Router, Network, HardDrive, Database, Layers, Folder, Package, Monitor, Server, Boxes, Building2, Cable, CircleX, TriangleAlert, Unplug, Wrench, Pause, Square, Play, Bookmark, Star, Trash2, Rows3, Columns3, RotateCw, Circle, TimerOff, WifiOff, ServerCrash, FileQuestion, LockKeyhole } from 'lucide-react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownPrimitive3 from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive3 from '@radix-ui/react-popover';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Command } from 'cmdk';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { observeElementRect, useVirtualizer, defaultRangeExtractor } from '@tanstack/react-virtual';
import * as ContextPrimitive from '@radix-ui/react-context-menu';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { useLegacyTable, getFilteredRowModel, getSortedRowModel, getCoreRowModel } from '@tanstack/react-table/legacy';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// lib/foundation-format.ts
var LEGACY = ["B", "KB", "MB", "GB", "TB", "PB"];
var IEC = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
var SI = ["B", "kB", "MB", "GB", "TB", "PB"];
function scale(n, base, units) {
  let i = 0;
  let v = n;
  while (Math.abs(v) >= base && i < units.length - 1) {
    v /= base;
    i++;
  }
  return { v, unit: units[i], i };
}
var toDate = (d) => d instanceof Date ? d : new Date(d);
function createFormatters(defaults2 = {}) {
  const num = (locale, o) => new Intl.NumberFormat(locale ?? defaults2.locale, o);
  const pick = (v, i, locale, max) => num(locale, { maximumFractionDigits: max ?? (i === 0 ? 0 : Math.abs(v) < 10 ? 1 : 0) }).format(v);
  return {
    bytes(n, opts) {
      const o = typeof opts === "string" ? { locale: opts } : opts ?? {};
      const base = o.base ?? 1024;
      const { v, unit, i } = scale(n, base, o.base === 1024 ? IEC : o.base === 1e3 ? SI : LEGACY);
      const max = o.maximumFractionDigits ?? (o.base === 1e3 && i > 0 && Math.abs(v) < 10 ? 2 : void 0);
      return `${pick(v, i, o.locale, max)} ${unit}`;
    },
    bitrate(n, o) {
      const { v, unit, i } = scale(n, 1e3, ["bit/s", "kbit/s", "Mbit/s", "Gbit/s", "Tbit/s"]);
      return `${pick(v, i, o?.locale)} ${unit}`;
    },
    frequency(hz, o) {
      const { v, unit, i } = scale(hz, 1e3, ["Hz", "kHz", "MHz", "GHz", "THz"]);
      return `${pick(v, i, o?.locale)} ${unit}`;
    },
    duration(ms, o) {
      const total = Math.max(0, Math.round(ms / 1e3));
      const d = Math.floor(total / 86400);
      const h = Math.floor(total % 86400 / 3600);
      const m = Math.floor(total % 3600 / 60);
      const s = total % 60;
      if (o?.style === "clock") {
        const p = (x) => String(x).padStart(2, "0");
        return `${p(d * 24 + h)}:${p(m)}:${p(s)}`;
      }
      if (ms > 0 && ms < 1e3) return `${num(o?.locale).format(Math.round(ms))} ms`;
      const f = num(o?.locale);
      const parts = [[d, "d"], [h, "h"], [m, "min"], [s, "s"]].filter(([x]) => x > 0).slice(0, 2);
      return parts.length ? parts.map(([x, u]) => `${f.format(x)} ${u}`).join(" ") : `${f.format(0)} s`;
    },
    percent(ratio, o) {
      return num(o?.locale, { style: "percent", maximumFractionDigits: o?.fractionDigits ?? 0 }).format(ratio);
    },
    relative(date, o) {
      const now = o?.now === void 0 ? Date.now() : +toDate(o.now);
      const diff = (+toDate(date) - now) / 1e3;
      const steps = [["year", 31536e3], ["month", 2592e3], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
      const rtf = new Intl.RelativeTimeFormat(o?.locale ?? defaults2.locale, { numeric: "auto" });
      for (const [unit, secs] of steps) if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
      return rtf.format(Math.round(diff), "second");
    },
    dateTime(date, o) {
      return new Intl.DateTimeFormat(o?.locale ?? defaults2.locale, {
        dateStyle: o?.dateStyle ?? "medium",
        timeStyle: o?.timeStyle ?? "medium",
        timeZone: o?.utc ? "UTC" : o?.timeZone ?? defaults2.timeZone
      }).format(toDate(date));
    }
  };
}

// lib/utils.ts
function useControllableState({
  value,
  defaultValue: defaultValue2,
  onChange
}) {
  const [inner, setInner] = React21.useState(defaultValue2);
  const controlled = value !== void 0;
  const current = controlled ? value : inner;
  const ref = React21.useRef(current);
  ref.current = current;
  const set = React21.useCallback(
    (next) => {
      const v = typeof next === "function" ? next(ref.current) : next;
      if (!controlled) setInner(v);
      ref.current = v;
      onChange?.(v);
    },
    [controlled, onChange]
  );
  return [current, set];
}
var format = /* @__PURE__ */ createFormatters();
function diffLines(before, after) {
  const a = before.split("\n");
  const b = after.split("\n");
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i2 = a.length - 1; i2 >= 0; i2--)
    for (let j2 = b.length - 1; j2 >= 0; j2--) dp[i2][j2] = a[i2] === b[j2] ? dp[i2 + 1][j2 + 1] + 1 : Math.max(dp[i2 + 1][j2], dp[i2][j2 + 1]);
  const out = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) out.push({ type: "same", text: a[i++] }), j++;
    else if (dp[i + 1][j] >= dp[i][j + 1]) out.push({ type: "del", text: a[i++] });
    else out.push({ type: "add", text: b[j++] });
  }
  while (i < a.length) out.push({ type: "del", text: a[i++] });
  while (j < b.length) out.push({ type: "add", text: b[j++] });
  return out;
}
function matchesAccept(file, accept) {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  return accept.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean).some((t) => t.startsWith(".") ? name.endsWith(t) : t.endsWith("/*") ? file.type.toLowerCase().startsWith(t.slice(0, -1)) : file.type.toLowerCase() === t);
}
var buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      danger: "btn-danger"
    },
    size: { md: "", sm: "btn-sm" },
    fullWidth: { true: "", false: "auto" }
  },
  defaultVariants: { variant: "primary", size: "md", fullWidth: false }
});
function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild,
  loading,
  leftIcon,
  rightIcon,
  disabled,
  children,
  type = "button",
  ...props
}) {
  const classes = cn(buttonVariants({ variant, size, fullWidth }), className);
  if (asChild) {
    return /* @__PURE__ */ jsx(Slot, { className: classes, ...props, children });
  }
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type,
      className: classes,
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      ...props,
      children: [
        loading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", "aria-hidden": true }) : leftIcon,
        children,
        rightIcon
      ]
    }
  );
}
function Field({ label, hint, error, htmlFor, className, children }) {
  return /* @__PURE__ */ jsxs("div", { className: cn("form-group", className), children: [
    /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor, children: label }),
    children,
    error ? /* @__PURE__ */ jsx("p", { className: "field-error", role: "alert", children: error }) : hint ? /* @__PURE__ */ jsx("p", { className: "field-hint", children: hint }) : null
  ] });
}
function Input({ className, invalid, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: cn("form-input", invalid && "error", className),
      "aria-invalid": invalid || void 0,
      ...props
    }
  );
}
function Textarea({
  className,
  invalid,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn("form-input", invalid && "error", className),
      "aria-invalid": invalid || void 0,
      ...props
    }
  );
}
function SearchInput({
  className,
  icon,
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("search", className), children: [
    icon,
    /* @__PURE__ */ jsx("input", { type: "search", className: "form-input", ...props })
  ] });
}
function Select({ className, ...props }) {
  return /* @__PURE__ */ jsx("select", { className: cn("form-select", className), ...props });
}
function Checkbox({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs("label", { className: cn("check", className), children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", ...props }),
    children
  ] });
}
function Switch({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs("label", { className: cn("check", className), children: [
    /* @__PURE__ */ jsxs("span", { className: "switch", children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", role: "switch", ...props }),
      /* @__PURE__ */ jsx("span", {})
    ] }),
    children
  ] });
}
function Radio({ children, hint, className, ...props }) {
  return /* @__PURE__ */ jsxs("label", { className: cn("radio", className), children: [
    /* @__PURE__ */ jsx("input", { type: "radio", ...props }),
    /* @__PURE__ */ jsx("span", { className: "radio-mark" }),
    /* @__PURE__ */ jsxs("span", { className: "radio-text", children: [
      children,
      hint && /* @__PURE__ */ jsx("span", { className: "radio-hint", children: hint })
    ] })
  ] });
}
function RadioGroup({ name, value, onValueChange, options, className, ...rest }) {
  return /* @__PURE__ */ jsx("fieldset", { className: cn("radio-group", className), "aria-label": rest["aria-label"], children: options.map((o) => /* @__PURE__ */ jsx(
    Radio,
    {
      name,
      value: o.value,
      hint: o.hint,
      disabled: o.disabled,
      checked: value === o.value,
      onChange: () => onValueChange?.(o.value),
      children: o.label
    },
    o.value
  )) });
}
var en = {
  close: "Close",
  noResults: "No results",
  loading: "Loading",
  search: "Search",
  commandPalette: "Command palette",
  command: "Command",
  commandPlaceholder: "Type a command\u2026",
  searchUsers: "Search users\u2026",
  users: "Users",
  showPassword: "Show password",
  hidePassword: "Hide password",
  capsLock: "Caps Lock is on",
  copy: "Copy",
  copied: "Copied",
  removeItem: (name) => `Remove ${name}`,
  removeRow: (n) => `Remove row ${n}`,
  previousMonth: "Previous month",
  nextMonth: "Next month",
  pagination: "Pagination",
  previousPage: "Previous page",
  nextPage: "Next page",
  showing: (from, to, total) => `Showing ${from}\u2013${to} of ${total}`,
  pageOf: (page, count) => `Page ${page} of ${count}`,
  selectAllRows: "Select all rows",
  selectRow: "Select row",
  acknowledge: "Acknowledge",
  unsupportedType: (n) => `${n} file(s) have an unsupported type`,
  exceedsSize: (n) => `${n} file(s) exceed the size limit`,
  autoRefresh: "Auto refresh",
  oneTimeCode: "One-time code",
  copyCode: "Copy code",
  language: "Language",
  chooseDate: "Choose date",
  datePlaceholder: "yyyy-mm-dd",
  weekdaysShort: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  breadcrumb: "Breadcrumb",
  showHiddenLevels: (n) => `Show ${n} hidden levels`,
  dismiss: "Dismiss",
  resizePanels: "Resize panels",
  increase: (l) => `Increase ${l}`,
  decrease: (l) => `Decrease ${l}`,
  unitOf: (l) => `${l} unit`,
  value: "Value",
  add: "Add",
  key: "Key",
  duplicateKey: "Duplicate key",
  timeRange: "Time range",
  off: "off",
  wrap: "Wrap",
  noLines: "No lines",
  tenant: "Tenant",
  permission: "Permission",
  passwordStrength: ["Very weak", "Weak", "Fair", "Good", "Strong"],
  passwordMismatch: "Passwords do not match",
  cancel: "Cancel",
  retry: "Retry",
  typeToConfirm: "Type to confirm",
  nothingHere: "Nothing here",
  noRecentTasks: "No recent tasks",
  recentTasks: "Recent tasks",
  signOut: "Sign out",
  dropFiles: "Drop files here or click to browse",
  noActiveAlarms: "No active alarms",
  fixFollowing: "Fix the following",
  moreTabs: "More tabs",
  next: "Next",
  back: "Back",
  finish: "Finish",
  minimum: "minimum",
  maximum: "maximum",
  edit: "Edit",
  stateOn: "Powered on",
  stateOff: "Powered off",
  stateSuspended: "Suspended",
  stateMaintenance: "In maintenance",
  stateDisconnected: "Disconnected",
  stateWarning: "Warning",
  stateError: "Error",
  mfaMethod: "Choose method",
  mfaScan: "Scan code",
  mfaVerify: "Verify",
  mfaRecovery: "Recovery codes",
  mfaTotp: "Authenticator app",
  mfaPasskey: "Passkey",
  mfaInvalid: "That code is not valid. Try again.",
  mfaPasskeyWaiting: "Waiting for your authenticator\u2026",
  mfaPasskeyFailed: "Passkey registration failed.",
  mfaStored: "I stored these codes",
  manualSecret: "Manual secret",
  addedToApp: "I added it to my app"
};
var browserTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
};
var defaultValue = { locale: "en", timeZone: /* @__PURE__ */ browserTimeZone(), t: en, format: /* @__PURE__ */ createFormatters({ locale: "en" }) };
var LafContext = React21.createContext(defaultValue);
function LafProvider({
  locale = "en",
  messages,
  timeZone,
  portalContainer,
  children
}) {
  const value = React21.useMemo(() => {
    const tz = timeZone ?? browserTimeZone();
    return { locale, timeZone: tz, t: { ...en, ...messages }, format: createFormatters({ locale, timeZone: tz }), portalContainer };
  }, [locale, messages, timeZone, portalContainer]);
  return /* @__PURE__ */ jsx(LafContext.Provider, { value, children });
}
function useLaf() {
  return React21.useContext(LafContext);
}
function usePortalContainer() {
  return React21.useContext(LafContext).portalContainer;
}
var alertIcon = { error: XCircle, success: CheckCircle2, warning: AlertTriangle, info: Info };
var alertClass = {
  error: "alert-error",
  success: "alert-success",
  warning: "alert-warning",
  info: "border-primary/35 bg-primary-light text-primary"
};
function Alert({
  tone = "info",
  className,
  children
}) {
  const Icon2 = alertIcon[tone];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("alert", alertClass[tone], className),
      role: tone === "error" || tone === "warning" ? "alert" : "status",
      children: [
        /* @__PURE__ */ jsx("span", { className: "alert-icon", children: /* @__PURE__ */ jsx(Icon2, { "aria-hidden": true }) }),
        /* @__PURE__ */ jsx("div", { children })
      ]
    }
  );
}
var badgeClass = {
  neutral: "",
  ok: "badge-ok",
  warn: "badge-warn",
  danger: "badge-danger",
  primary: "badge-primary"
};
function Badge({
  tone = "neutral",
  plain,
  className,
  children
}) {
  return /* @__PURE__ */ jsx("span", { className: cn("badge", badgeClass[tone], plain && "plain", className), children });
}
function Avatar({
  name,
  src,
  size = "md",
  className
}) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  const sizing = size === "sm" ? "size-5 text-[0.625rem]" : size === "lg" ? "size-10 text-base" : "";
  return /* @__PURE__ */ jsx("span", { className: cn("avatar", sizing, className), title: name, children: src ? /* @__PURE__ */ jsx("img", { src, alt: name, className: "size-full rounded-[inherit] object-cover" }) : initials });
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("card", className), ...props });
}
function Panel({
  title,
  actions,
  children,
  className,
  bodyClassName
}) {
  return /* @__PURE__ */ jsxs("section", { className: cn("panel", className), children: [
    (title || actions) && /* @__PURE__ */ jsxs("header", { className: "panel-head", children: [
      /* @__PURE__ */ jsx("h3", { className: "panel-title", children: title }),
      actions
    ] }),
    /* @__PURE__ */ jsx("div", { className: cn("panel-body", bodyClassName), children })
  ] });
}
function Stat({
  label,
  value,
  delta,
  down
}) {
  return /* @__PURE__ */ jsxs("div", { className: "stat", children: [
    /* @__PURE__ */ jsx("div", { className: "stat-label", children: label }),
    /* @__PURE__ */ jsx("div", { className: "stat-value", children: value }),
    delta && /* @__PURE__ */ jsx("div", { className: cn("stat-delta", down && "down"), children: delta })
  ] });
}
function StatGrid({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "stat-grid", children });
}
function EmptyState({
  icon,
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxs("div", { className: "empty", children: [
    icon,
    /* @__PURE__ */ jsx("h3", { children: title }),
    description && /* @__PURE__ */ jsx("p", { children: description }),
    action
  ] });
}
function Breadcrumb({ items, maxItems, label }) {
  const { t: laf } = useLaf();
  const [expanded, setExpanded] = React21.useState(false);
  const collapsed = !expanded && maxItems !== void 0 && maxItems >= 2 && items.length > maxItems;
  const hidden = collapsed ? items.length - (maxItems - 1) : 0;
  return /* @__PURE__ */ jsx("nav", { className: "breadcrumb", "aria-label": label ?? laf.breadcrumb, children: items.map((it, i) => {
    if (collapsed && i > 0 && i <= hidden) {
      return i === 1 ? /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("button", { type: "button", "aria-label": laf.showHiddenLevels(hidden), onClick: () => setExpanded(true), className: "border-0 bg-transparent p-0 text-muted", children: "\u2026" }) }, "more") : null;
    }
    return i === 0 ? /* @__PURE__ */ jsx("a", { href: it.href, children: it.label }, it.label) : i === items.length - 1 ? /* @__PURE__ */ jsx("span", { className: "text-fg", "aria-current": "page", children: it.label }, it.label) : /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("a", { href: it.href, children: it.label }) }, it.label);
  }) });
}
function PageHead({
  title,
  description,
  actions,
  breadcrumb
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    breadcrumb && /* @__PURE__ */ jsx("div", { className: "mb-2", children: breadcrumb }),
    /* @__PURE__ */ jsxs("div", { className: "page-head !mb-0", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { children: title }),
        description && /* @__PURE__ */ jsx("p", { children: description })
      ] }),
      actions && /* @__PURE__ */ jsx("div", { className: "flex gap-2.5", children: actions })
    ] })
  ] });
}
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogClose = DialogPrimitive.Close;
function DialogContent({
  title,
  description,
  footer,
  children,
  className,
  ...props
}) {
  const { t: laf, portalContainer } = useLaf();
  return /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { container: portalContainer, children: [
    /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        className: cn("popup fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2", className),
        ...description ? {} : { "aria-describedby": void 0 },
        ...props,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "popup-head", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(DialogPrimitive.Title, { className: "popup-title", children: title }),
              description && /* @__PURE__ */ jsx(DialogPrimitive.Description, { className: "popup-sub", children: description })
            ] }),
            /* @__PURE__ */ jsx(DialogPrimitive.Close, { className: "popup-close", "aria-label": laf.close, children: /* @__PURE__ */ jsx(X, { className: "size-4", "aria-hidden": true }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "popup-body", children }),
          footer && /* @__PURE__ */ jsx("div", { className: "popup-foot", children: footer })
        ]
      }
    )
  ] });
}
var Popover = PopoverPrimitive3.Root;
var PopoverTrigger = PopoverPrimitive3.Trigger;
var PopoverClose = PopoverPrimitive3.Close;
function PopoverContent({
  title,
  footer,
  children,
  className,
  align = "start",
  ...props
}) {
  const container = usePortalContainer();
  return /* @__PURE__ */ jsx(PopoverPrimitive3.Portal, { container, children: /* @__PURE__ */ jsxs(
    PopoverPrimitive3.Content,
    {
      align,
      sideOffset: 8,
      className: cn("popover-panel relative! top-auto! left-auto! z-30", className),
      ...props,
      children: [
        title && /* @__PURE__ */ jsx("div", { className: "popover-title", children: title }),
        children,
        footer && /* @__PURE__ */ jsx("div", { className: "popover-foot", children: footer }),
        /* @__PURE__ */ jsx(PopoverPrimitive3.Arrow, { className: "fill-menu stroke-line-strong", width: 12, height: 6 })
      ]
    }
  ) });
}
var DropdownMenu = DropdownPrimitive3.Root;
var DropdownMenuTrigger = DropdownPrimitive3.Trigger;
function DropdownMenuContent({
  className,
  align = "end",
  ...props
}) {
  const container = usePortalContainer();
  return /* @__PURE__ */ jsx(DropdownPrimitive3.Portal, { container, children: /* @__PURE__ */ jsx(
    DropdownPrimitive3.Content,
    {
      align,
      sideOffset: 4,
      className: cn("dropdown-menu relative! top-auto! left-auto! z-30 min-w-48", className),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  danger,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownPrimitive3.Item,
    {
      className: cn("dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg", danger && "danger", className),
      ...props
    }
  );
}
function DropdownMenuLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx(DropdownPrimitive3.Label, { className: cn("dropdown-label", className), ...props });
}
function DropdownMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx(DropdownPrimitive3.Separator, { className: cn("dropdown-sep", className), ...props });
}
var Tabs = TabsPrimitive.Root;
var TabsContent = TabsPrimitive.Content;
function TabsList({ className, ...props }) {
  return /* @__PURE__ */ jsx(TabsPrimitive.List, { className: cn("tabs", className), ...props });
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      className: cn(
        "tab cursor-pointer border-0 border-b-2 bg-transparent font-[inherit] data-[state=active]:border-primary data-[state=active]:text-fg",
        className
      ),
      ...props
    }
  );
}
var TooltipProvider = TooltipPrimitive.Provider;
function Tooltip({
  content,
  children,
  side = "top"
}) {
  const container = usePortalContainer();
  return /* @__PURE__ */ jsxs(TooltipPrimitive.Root, { delayDuration: 400, children: [
    /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { container, children: /* @__PURE__ */ jsx(
      TooltipPrimitive.Content,
      {
        side,
        sideOffset: 6,
        className: "z-60 rounded-md border border-line-strong bg-menu px-2 py-1 text-xs text-fg shadow-[0_16px_32px_rgba(0,0,0,0.5)]",
        children: content
      }
    ) })
  ] });
}
function Toolbar({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("toolbar", className), ...props });
}
function Table({ className, children, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: "table-wrap", children: /* @__PURE__ */ jsx("table", { className: cn("table", className), ...props, children }) });
}
function UserCell({ name, email }) {
  return /* @__PURE__ */ jsxs("div", { className: "cell-user", children: [
    /* @__PURE__ */ jsx(Avatar, { name }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { children: name }),
      email && /* @__PURE__ */ jsx("div", { className: "cell-sub", children: email })
    ] })
  ] });
}
function pageWindow(page, count) {
  const set = new Set([1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count));
  const sorted = [...set].sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("\u2026");
    out.push(p);
  });
  return out;
}
function Pagination({ page, pageCount, total, pageSize, onPageChange }) {
  const { t } = useLaf();
  const from = total && pageSize ? (page - 1) * pageSize + 1 : void 0;
  const to = total && pageSize ? Math.min(page * pageSize, total) : void 0;
  return /* @__PURE__ */ jsxs("nav", { className: "pagination", "aria-label": t.pagination, children: [
    /* @__PURE__ */ jsx("span", { children: from !== void 0 ? t.showing(from, to, total) : t.pageOf(page, pageCount) }),
    /* @__PURE__ */ jsxs("div", { className: "pages", children: [
      /* @__PURE__ */ jsx("button", { className: "page-btn", "aria-label": t.previousPage, disabled: page <= 1, onClick: () => onPageChange(page - 1), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4", "aria-hidden": true }) }),
      pageWindow(page, pageCount).map(
        (p, i) => p === "\u2026" ? /* @__PURE__ */ jsx("span", { className: "page-btn border-transparent bg-transparent", children: "\u2026" }, `gap${i}`) : /* @__PURE__ */ jsx(
          "button",
          {
            className: "page-btn",
            "aria-current": p === page ? "page" : void 0,
            onClick: () => onPageChange(p),
            children: p
          },
          p
        )
      ),
      /* @__PURE__ */ jsx("button", { className: "page-btn", "aria-label": t.nextPage, disabled: page >= pageCount, onClick: () => onPageChange(page + 1), children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-4", "aria-hidden": true }) })
    ] })
  ] });
}
function AdminShell({
  sidebar,
  topbar,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "admin", children: [
    /* @__PURE__ */ jsx("aside", { className: "admin-side", children: sidebar }),
    /* @__PURE__ */ jsxs("div", { className: "admin-main", children: [
      topbar && /* @__PURE__ */ jsx("header", { className: "admin-top", children: topbar }),
      /* @__PURE__ */ jsx("main", { className: "admin-content", children })
    ] })
  ] });
}
function NavGroup({ label }) {
  return /* @__PURE__ */ jsx("div", { className: "nav-group", children: label });
}
function NavLink({
  icon,
  current,
  badge,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs("a", { className: cn("nav-link", className), "aria-current": current ? "page" : void 0, ...props, children: [
    icon,
    children,
    badge
  ] });
}
var MAX_RENDERED = 200;
function Combobox({
  options,
  value,
  onChange,
  multiple,
  label,
  placeholder,
  emptyText: emptyTextProp,
  loadingText: loadingTextProp,
  disabled,
  onCreate,
  createLabel = (q) => `Create \u201C${q}\u201D`,
  clearable,
  clearLabel = "Clear",
  renderOption,
  open: openProp,
  onOpenChange,
  className
}) {
  const { t } = useLaf();
  const emptyText = emptyTextProp ?? t.noResults;
  const loadingText = loadingTextProp ?? `${t.loading}\u2026`;
  const [query, setQuery] = React21.useState("");
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: false, onChange: onOpenChange });
  const [asyncList, setAsyncList] = React21.useState([]);
  const [loading, setLoading] = React21.useState(false);
  const root = React21.useRef(null);
  const isFn = typeof options === "function";
  const optionsRef = React21.useRef(options);
  optionsRef.current = options;
  const syncList = React21.useMemo(() => {
    if (isFn) return [];
    const q2 = query.trim().toLowerCase();
    return options.filter((o) => !q2 || (o.label + " " + (o.description ?? "")).toLowerCase().includes(q2));
  }, [options, query, isFn]);
  React21.useEffect(() => {
    if (!open || !isFn) return;
    let cancelled = false;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const res = await optionsRef.current(query);
        if (!cancelled) setAsyncList(res);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, open, isFn]);
  const list = isFn ? asyncList : syncList;
  const shown = list.slice(0, MAX_RENDERED);
  const isSelected = (o) => value.some((v) => v.value === o.value);
  const pick = (o) => {
    if (isSelected(o)) onChange(value.filter((v) => v.value !== o.value));
    else if (multiple) onChange([...value, o]);
    else {
      onChange([o]);
      setOpen(false);
    }
    setQuery("");
  };
  const q = query.trim();
  const canCreate = !!onCreate && !!q && !list.some((o) => o.label.toLowerCase() === q.toLowerCase());
  const groups = React21.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const o of shown) m.set(o.group ?? "", [...m.get(o.group ?? "") ?? [], o]);
    return [...m.entries()];
  }, [shown]);
  const renderRow = (o) => {
    const selected = isSelected(o);
    return /* @__PURE__ */ jsxs(
      Command.Item,
      {
        value: o.value,
        disabled: o.disabled,
        keywords: [o.label],
        onSelect: () => pick(o),
        onMouseDown: (e) => e.preventDefault(),
        className: cn("dropdown-item cursor-pointer data-[selected=true]:bg-surface-hover data-[selected=true]:text-fg data-[disabled=true]:opacity-50", selected && "font-semibold"),
        children: [
          renderOption ? renderOption(o, { selected }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: o.label }),
            o.description && /* @__PURE__ */ jsx("span", { className: "ms-2 text-xs text-subtle", children: o.description })
          ] }),
          selected && /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "ms-auto text-primary", children: "\u2713" })
        ]
      },
      o.value
    );
  };
  return /* @__PURE__ */ jsx(Command, { shouldFilter: false, label, loop: true, className: cn("contents", className), children: /* @__PURE__ */ jsxs(PopoverPrimitive3.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverPrimitive3.Anchor, { asChild: true, children: /* @__PURE__ */ jsx("div", { ref: root, className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", children: [
      value.map((v) => /* @__PURE__ */ jsxs("span", { className: "inline-flex h-6 items-center gap-1 rounded-sm border border-line bg-muted-bg px-2 text-xs", children: [
        v.label,
        multiple && /* @__PURE__ */ jsx("button", { type: "button", "aria-label": t.removeItem(v.label), disabled, className: "text-muted hover:text-fg", onClick: () => pick(v), children: /* @__PURE__ */ jsx(X, { className: "size-3", "aria-hidden": true }) })
      ] }, v.value)),
      /* @__PURE__ */ jsx(
        Command.Input,
        {
          "aria-label": label,
          "aria-expanded": open,
          className: "min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none",
          placeholder: value.length && multiple ? void 0 : placeholder,
          disabled,
          value: query,
          onValueChange: (v) => {
            setQuery(v);
            setOpen(true);
          },
          onFocus: () => setOpen(true),
          onKeyDown: (e) => {
            if (e.key === "Escape") setOpen(false);
            else if (e.key === "Backspace" && !query && value.length && multiple) onChange(value.slice(0, -1));
          }
        }
      ),
      clearable && value.length > 0 && !disabled && /* @__PURE__ */ jsx("button", { type: "button", "aria-label": clearLabel, className: "text-muted hover:text-fg", onClick: () => onChange([]), children: /* @__PURE__ */ jsx(X, { className: "size-3.5", "aria-hidden": true }) }),
      /* @__PURE__ */ jsx(ChevronDown, { className: "size-4 text-muted", "aria-hidden": true })
    ] }) }) }),
    /* @__PURE__ */ jsx(PopoverPrimitive3.Portal, { children: /* @__PURE__ */ jsx(
      PopoverPrimitive3.Content,
      {
        sideOffset: 4,
        align: "start",
        collisionPadding: 8,
        onOpenAutoFocus: (e) => e.preventDefault(),
        onCloseAutoFocus: (e) => e.preventDefault(),
        onInteractOutside: (e) => {
          if (root.current?.contains(e.target)) e.preventDefault();
        },
        className: "z-50 w-(--radix-popover-trigger-width)",
        children: /* @__PURE__ */ jsx(Command.List, { className: "dropdown-menu max-h-64 w-full overflow-auto", children: loading && !list.length ? /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-sm text-muted", children: loadingText }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          !list.length && !canCreate && /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-sm text-muted", children: emptyText }),
          groups.map(
            ([g, opts]) => g ? /* @__PURE__ */ jsx(Command.Group, { heading: g, className: "[&_[cmdk-group-heading]]:dropdown-label", children: opts.map(renderRow) }, g) : opts.map(renderRow)
          ),
          list.length > MAX_RENDERED && /* @__PURE__ */ jsxs("div", { className: "px-3 py-2 text-xs text-subtle", children: [
            list.length - MAX_RENDERED,
            "+ more \u2014 keep typing to refine"
          ] }),
          canCreate && /* @__PURE__ */ jsx(
            Command.Item,
            {
              value: `__create__${q}`,
              onSelect: () => {
                onCreate(q);
                setQuery("");
              },
              onMouseDown: (e) => e.preventDefault(),
              className: "dropdown-item cursor-pointer data-[selected=true]:bg-surface-hover data-[selected=true]:text-fg",
              children: createLabel(q)
            }
          )
        ] }) })
      }
    ) })
  ] }) });
}
function UserSelector({
  value,
  onChange,
  onSearch,
  multiple = true,
  max,
  placeholder: placeholderProp,
  disabled,
  label: labelProp
}) {
  const { t } = useLaf();
  const placeholder = placeholderProp ?? t.searchUsers;
  const label = labelProp ?? t.users;
  const limitReached = max !== void 0 && value.length >= max;
  const known = React21.useRef(/* @__PURE__ */ new Map());
  const toOption = (u) => {
    known.current.set(u.id, u);
    return { value: u.id, label: u.name, description: u.email };
  };
  const search = React21.useCallback(
    async (q) => (await onSearch(q)).map(toOption),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSearch]
  );
  const opts = value.map(toOption);
  return /* @__PURE__ */ jsx(
    Combobox,
    {
      label,
      placeholder,
      disabled,
      multiple,
      options: search,
      value: opts,
      emptyText: limitReached ? `Limit of ${max} reached` : void 0,
      renderOption: (o) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Avatar, { name: o.label }),
        /* @__PURE__ */ jsxs("span", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { children: o.label }),
          o.description && /* @__PURE__ */ jsx("span", { className: "text-xs text-subtle", children: o.description })
        ] })
      ] }),
      onChange: (next) => {
        if (multiple && max !== void 0 && next.length > max) return;
        onChange(next.map((o) => known.current.get(o.value)).filter(Boolean));
      }
    }
  );
}
var deviceIcon = { phone: Smartphone, laptop: Laptop, tablet: Tablet, key: KeyRound };
function DeviceSelector({
  devices,
  value,
  onValueChange,
  name,
  legend
}) {
  return /* @__PURE__ */ jsxs("fieldset", { className: "device-list border-0 p-0", children: [
    /* @__PURE__ */ jsx("legend", { className: "sr-only", children: legend }),
    devices.map((d) => {
      const Icon2 = deviceIcon[d.kind];
      return /* @__PURE__ */ jsxs("label", { className: "device-option", children: [
        /* @__PURE__ */ jsx("input", { type: "radio", name, value: d.id, checked: value === d.id, onChange: () => onValueChange(d.id) }),
        /* @__PURE__ */ jsx("span", { className: "device-icon", children: /* @__PURE__ */ jsx(Icon2, { "aria-hidden": true }) }),
        /* @__PURE__ */ jsxs("span", { className: "device-meta", children: [
          /* @__PURE__ */ jsx("span", { className: "device-name", children: d.name }),
          d.detail && /* @__PURE__ */ jsx("span", { className: "device-sub", children: d.detail })
        ] }),
        d.badge,
        /* @__PURE__ */ jsx("span", { className: "device-radio", "aria-hidden": true })
      ] }, d.id);
    })
  ] });
}
var iconTone = { ok: "ok", warn: "warn", danger: "danger", neutral: "" };
var badgeTone = { ok: "ok", warn: "warn", danger: "danger", neutral: "neutral" };
function AuditLog({ events }) {
  const days = [...new Set(events.map((e) => e.day))];
  return /* @__PURE__ */ jsx("div", { className: "audit", children: days.map((day) => /* @__PURE__ */ jsxs(React21.Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "audit-day", children: day }),
    events.filter((e) => e.day === day).map((e) => /* @__PURE__ */ jsxs("details", { className: "audit-row", children: [
      /* @__PURE__ */ jsxs("summary", { children: [
        /* @__PURE__ */ jsx("span", { className: "audit-time", children: e.time }),
        /* @__PURE__ */ jsx("span", { className: cn("audit-icon", iconTone[e.severity]), children: e.icon }),
        /* @__PURE__ */ jsxs("span", { className: "audit-event", children: [
          /* @__PURE__ */ jsx("b", { children: e.actor }),
          " ",
          e.action,
          e.target && /* @__PURE__ */ jsx("small", { children: e.target })
        ] }),
        e.result ? /* @__PURE__ */ jsx(Badge, { tone: badgeTone[e.severity], children: e.result }) : /* @__PURE__ */ jsx("span", {})
      ] }),
      e.details && /* @__PURE__ */ jsx("dl", { className: "audit-detail", children: Object.entries(e.details).map(([k, v]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("dt", { children: k }),
        /* @__PURE__ */ jsx("dd", { children: v })
      ] }, k)) })
    ] }, e.id))
  ] }, day)) });
}
function Spinner({
  size = "md",
  label: labelProp,
  className
}) {
  const { t: laf } = useLaf();
  const label = labelProp ?? laf.loading;
  const sizing = size === "sm" ? "size-4" : size === "lg" ? "size-8" : "size-5";
  return /* @__PURE__ */ jsxs("span", { role: "status", className: cn("inline-flex", className), children: [
    /* @__PURE__ */ jsx(Loader2, { className: cn("animate-spin text-primary motion-reduce:animate-none", sizing), "aria-hidden": true }),
    /* @__PURE__ */ jsx("span", { className: "sr-only", children: label })
  ] });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": true,
      className: cn("h-4 animate-pulse rounded-sm bg-muted-bg motion-reduce:animate-none", className),
      ...props
    }
  );
}
var toastIcon = {
  success: { Icon: CheckCircle2, className: "text-ok" },
  error: { Icon: XCircle, className: "text-danger" },
  warning: { Icon: AlertTriangle, className: "text-warn" },
  info: { Icon: Info, className: "text-primary" }
};
var ToastContext = React21.createContext(null);
function useToast() {
  const ctx = React21.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
function ToastView({ item, onDismiss }) {
  const tone = item.tone ?? "info";
  const duration = item.duration ?? (tone === "error" ? 8e3 : 4e3);
  const [paused, setPaused] = React21.useState(false);
  React21.useEffect(() => {
    if (paused || duration === 0) return;
    const t = window.setTimeout(() => onDismiss(item.id), duration);
    return () => window.clearTimeout(t);
  }, [paused, duration, item.id, onDismiss]);
  const { Icon: Icon2, className } = toastIcon[tone];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "toast pointer-events-auto",
      role: tone === "error" ? "alert" : "status",
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: () => setPaused(false),
      children: [
        /* @__PURE__ */ jsx(Icon2, { className: cn("size-4 shrink-0", className), "aria-hidden": true }),
        /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1", children: item.title }),
        item.action && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "font-medium text-primary hover:underline",
            onClick: () => {
              item.action.onClick();
              onDismiss(item.id);
            },
            children: item.action.label
          }
        )
      ]
    }
  );
}
function ToastProvider({ children }) {
  const [items, setItems] = React21.useState([]);
  const nextId = React21.useRef(0);
  const dismiss = React21.useCallback((id) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);
  const toast = React21.useCallback((options) => {
    const id = ++nextId.current;
    setItems((list) => [...list, { ...options, id }]);
    return id;
  }, []);
  const value = React21.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed right-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2", children: items.map((item) => /* @__PURE__ */ jsx(ToastView, { item, onDismiss: dismiss }, item.id)) })
  ] });
}
function BrandHeader({
  icon,
  logoSrc,
  name,
  title,
  subtitle,
  className
}) {
  return /* @__PURE__ */ jsxs("header", { className: cn("header", className), children: [
    logoSrc ? /* @__PURE__ */ jsx("img", { src: logoSrc, alt: name ?? "", className: "logo mx-auto" }) : icon && /* @__PURE__ */ jsx("div", { className: "brand-icon", "aria-hidden": true, children: icon }),
    name && /* @__PURE__ */ jsx("div", { className: "brand-name", children: name }),
    title && /* @__PURE__ */ jsx("h1", { className: "page-title", children: title }),
    subtitle && /* @__PURE__ */ jsx("p", { className: "page-subtitle", children: subtitle })
  ] });
}
function SocialDivider({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "social-divider", role: "separator", children: /* @__PURE__ */ jsx("span", { children }) });
}
function SocialButtons({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("social-buttons", className), ...props });
}
function SocialButton({
  icon,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs("a", { className: cn("btn-social", className), ...props, children: [
    icon,
    children
  ] });
}
function AccountList({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("account-list", className), ...props });
}
function AccountItem({
  name,
  email,
  avatarSrc,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs("button", { type: "submit", className: cn("account-item", className), ...props, children: [
    avatarSrc ? /* @__PURE__ */ jsx("img", { src: avatarSrc, alt: "", className: "account-avatar" }) : /* @__PURE__ */ jsx("span", { className: "account-avatar account-avatar-initial", "aria-hidden": true, children: name.charAt(0) }),
    /* @__PURE__ */ jsxs("span", { className: "account-details", children: [
      /* @__PURE__ */ jsx("span", { className: "account-name", children: name }),
      /* @__PURE__ */ jsx("span", { className: "account-email", children: email })
    ] })
  ] });
}
function ClientInfo({
  name,
  description,
  logoSrc,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("client-info", className), children: [
    logoSrc ? /* @__PURE__ */ jsx("img", { src: logoSrc, alt: "", className: "client-logo" }) : /* @__PURE__ */ jsx("span", { className: "client-logo-placeholder", "aria-hidden": true, children: name.charAt(0).toUpperCase() }),
    /* @__PURE__ */ jsxs("div", { className: "client-details", children: [
      /* @__PURE__ */ jsx("div", { className: "client-name", children: name }),
      description && /* @__PURE__ */ jsx("div", { className: "client-description", children: description })
    ] })
  ] });
}
function ScopeList({
  scopes,
  icon,
  className
}) {
  return /* @__PURE__ */ jsx("ul", { className: cn("scope-list", className), children: scopes.map((s) => /* @__PURE__ */ jsxs("li", { className: "scope-item", children: [
    icon ?? /* @__PURE__ */ jsx(Check, { className: "scope-icon", "aria-hidden": true }),
    /* @__PURE__ */ jsx("span", { children: s.description })
  ] }, s.id)) });
}
function OtpInput({
  length = 6,
  value,
  defaultValue: defaultValue2 = "",
  onChange,
  onComplete,
  className,
  ...props
}) {
  const [inner, setInner] = React21.useState(defaultValue2);
  const current = value ?? inner;
  const { t: laf } = useLaf();
  return /* @__PURE__ */ jsx(
    "input",
    {
      type: "text",
      inputMode: "numeric",
      autoComplete: "one-time-code",
      pattern: `[0-9]{${length}}`,
      maxLength: length,
      "aria-label": laf.oneTimeCode,
      className: cn("form-input otp-input", className),
      value: current,
      onChange: (e) => {
        const next = e.target.value.replace(/\D/g, "").slice(0, length);
        setInner(next);
        onChange?.(next);
        if (next.length === length) onComplete?.(next);
      },
      ...props
    }
  );
}
function CodeInput({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type: "text",
      autoComplete: "off",
      autoCapitalize: "characters",
      spellCheck: false,
      className: cn("code-input", className),
      ...props
    }
  );
}
function CodeDisplay({
  code,
  copyLabel: copyLabelProp,
  copiedLabel: copiedLabelProp,
  className
}) {
  const { t: laf } = useLaf();
  const copyLabel = copyLabelProp ?? laf.copyCode;
  const copiedLabel = copiedLabelProp ?? laf.copied;
  const [copied, setCopied] = React21.useState(false);
  React21.useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2e3);
    return () => window.clearTimeout(t);
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-stretch gap-2", className), children: [
    /* @__PURE__ */ jsx("output", { className: "code-display flex-1 select-all", children: code }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "btn btn-secondary auto",
        onClick: copy,
        "aria-label": copied ? copiedLabel : copyLabel,
        children: copied ? /* @__PURE__ */ jsx(Check, { "aria-hidden": true }) : /* @__PURE__ */ jsx(Copy, { "aria-hidden": true })
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "sr-only", role: "status", children: copied ? copiedLabel : "" })
  ] });
}
function DeviceSteps({ steps, current, className }) {
  return /* @__PURE__ */ jsx("ol", { className: cn("device-steps", className), children: steps.map((step, i) => /* @__PURE__ */ jsx(
    "li",
    {
      className: cn(i < current && "done", i === current && "current"),
      "aria-current": i === current ? "step" : void 0,
      children: step
    },
    i
  )) });
}
function InfoBox({
  title,
  items,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("info-box", className), children: [
    /* @__PURE__ */ jsx("div", { className: "info-box-title", children: title }),
    /* @__PURE__ */ jsx("ul", { children: items.map((item, i) => /* @__PURE__ */ jsx("li", { children: item }, i)) })
  ] });
}
function LanguageSwitcher({
  languages,
  current,
  className,
  label
}) {
  const { t: laf } = useLaf();
  return /* @__PURE__ */ jsx("nav", { className: cn("lang-switch", className), "aria-label": label ?? laf.language, children: languages.map((l) => /* @__PURE__ */ jsx(
    "a",
    {
      href: l.href,
      lang: l.code,
      hrefLang: l.code,
      "aria-current": l.code === current ? "true" : void 0,
      children: l.label
    },
    l.code
  )) });
}
function AuthFooter({
  icon,
  className,
  children
}) {
  return /* @__PURE__ */ jsx("footer", { className: cn("footer", className), children: /* @__PURE__ */ jsxs("p", { className: "footer-text", children: [
    icon,
    children
  ] }) });
}
function CopyButton({
  value,
  label: labelProp,
  copiedLabel: copiedLabelProp,
  className
}) {
  const { t } = useLaf();
  const label = labelProp ?? t.copy;
  const copiedLabel = copiedLabelProp ?? t.copied;
  const [copied, setCopied] = React21.useState(false);
  React21.useEffect(() => {
    if (!copied) return;
    const t2 = window.setTimeout(() => setCopied(false), 2e3);
    return () => window.clearTimeout(t2);
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: cn("shrink-0", className),
        onClick: copy,
        "aria-label": copied ? copiedLabel : label,
        children: copied ? /* @__PURE__ */ jsx(Check, { "aria-hidden": true }) : /* @__PURE__ */ jsx(Copy, { "aria-hidden": true })
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "sr-only", role: "status", children: copied ? copiedLabel : "" })
  ] });
}
var strengthTone = ["bg-danger", "bg-danger", "bg-warn", "bg-ok", "bg-ok"];
function PasswordField({
  showLabel: showLabelProp,
  hideLabel: hideLabelProp,
  capsLockHint: capsLockHintProp,
  strength,
  strengthLabels: strengthLabelsProp,
  confirmOf,
  mismatchLabel: mismatchLabelProp,
  className,
  onKeyUp,
  onBlur,
  onChange,
  ...props
}) {
  const [text, setText] = React21.useState(String(props.value ?? props.defaultValue ?? ""));
  const current = props.value !== void 0 ? String(props.value) : text;
  const score = strength ? strength(current) : 0;
  const mismatch = confirmOf !== void 0 && current !== "" && current !== confirmOf;
  const uid = React21.useId();
  const { t } = useLaf();
  const showLabel = showLabelProp ?? t.showPassword;
  const hideLabel = hideLabelProp ?? t.hidePassword;
  const strengthLabels = strengthLabelsProp ?? t.passwordStrength;
  const mismatchLabel = mismatchLabelProp ?? t.passwordMismatch;
  const capsLockHint = capsLockHintProp ?? t.capsLock;
  const [visible, setVisible] = React21.useState(false);
  const [caps, setCaps] = React21.useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          ...props,
          type: visible ? "text" : "password",
          className: cn("pe-10", className),
          invalid: mismatch || props.invalid,
          "aria-describedby": cn(mismatch && `${uid}-mismatch`, strength && `${uid}-strength`, props["aria-describedby"]) || void 0,
          onChange: (e) => {
            setText(e.target.value);
            onChange?.(e);
          },
          onKeyUp: (e) => {
            setCaps(e.getModifierState("CapsLock"));
            onKeyUp?.(e);
          },
          onBlur: (e) => {
            setCaps(false);
            onBlur?.(e);
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "absolute inset-y-0 end-0 flex w-10 items-center justify-center text-muted hover:text-fg",
          "aria-pressed": visible,
          "aria-label": visible ? hideLabel : showLabel,
          onClick: () => setVisible((v) => !v),
          children: visible ? /* @__PURE__ */ jsx(EyeOff, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ jsx(Eye, { className: "size-4", "aria-hidden": true })
        }
      )
    ] }),
    strength && current !== "" && /* @__PURE__ */ jsxs("div", { id: `${uid}-strength`, className: "grid gap-1", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-1", "aria-hidden": true, children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsx("span", { className: cn("h-1 rounded-xs", n <= score ? strengthTone[score] : "bg-muted-bg") }, n)) }),
      /* @__PURE__ */ jsx("p", { className: "field-hint", role: "status", children: strengthLabels[score] })
    ] }),
    mismatch && /* @__PURE__ */ jsx("p", { id: `${uid}-mismatch`, className: "field-hint text-danger", role: "alert", children: mismatchLabel }),
    caps && /* @__PURE__ */ jsx("p", { className: "field-hint", role: "status", children: capsLockHint })
  ] });
}
function DefinitionList({
  items,
  className
}) {
  return /* @__PURE__ */ jsx("dl", { className: cn("grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2", className), children: items.map((it, i) => /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
    /* @__PURE__ */ jsx("dt", { className: "mb-0.5 text-[0.6875rem] tracking-wider text-subtle uppercase", children: it.label }),
    /* @__PURE__ */ jsxs("dd", { className: cn("flex items-center gap-1 text-sm text-fg", it.mono && "font-mono break-all"), children: [
      /* @__PURE__ */ jsx("span", { className: "min-w-0", children: it.value ?? "\u2014" }),
      it.copy && /* @__PURE__ */ jsx(CopyButton, { value: it.copy })
    ] })
  ] }, i)) });
}
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  items,
  confirmLabel,
  cancelLabel: cancelLabelProp,
  confirmText,
  confirmTextLabel: confirmTextLabelProp,
  pending,
  onConfirm
}) {
  const { t: laf } = useLaf();
  const cancelLabel = cancelLabelProp ?? laf.cancel;
  const confirmTextLabel = confirmTextLabelProp ?? laf.typeToConfirm;
  const [typed, setTyped] = React21.useState("");
  React21.useEffect(() => {
    if (!open) setTyped("");
  }, [open]);
  const blocked = confirmText !== void 0 && typed !== confirmText;
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(
    DialogContent,
    {
      role: "alertdialog",
      title,
      footer: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", autoFocus: true, children: cancelLabel }) }),
        /* @__PURE__ */ jsx(Button, { variant: "danger", size: "sm", loading: pending, disabled: blocked, onClick: onConfirm, children: confirmLabel })
      ] }),
      children: [
        /* @__PURE__ */ jsx("p", { children: description }),
        items && items.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-3 max-h-32 list-disc overflow-auto ps-5 text-fg", children: items.map((it) => /* @__PURE__ */ jsx("li", { children: it }, it)) }),
        confirmText !== void 0 && /* @__PURE__ */ jsxs("label", { className: "mt-3 grid gap-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "form-label", children: [
            confirmTextLabel,
            ": ",
            /* @__PURE__ */ jsx("b", { className: "font-mono text-fg", children: confirmText })
          ] }),
          /* @__PURE__ */ jsx(Input, { value: typed, onChange: (e) => setTyped(e.target.value), autoComplete: "off" })
        ] })
      ]
    }
  ) });
}
function Progress({
  value,
  max = 100,
  meter,
  warnAt = 70,
  dangerAt = 90,
  label,
  className
}) {
  const pct = value === void 0 ? void 0 : Math.min(100, Math.max(0, value / max * 100));
  const tone = meter && pct !== void 0 ? pct >= dangerAt ? "bg-danger" : pct >= warnAt ? "bg-warn" : "bg-ok" : "bg-primary";
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: meter ? "meter" : "progressbar",
      "aria-label": label,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuenow": value,
      className: cn("h-1.5 overflow-hidden rounded-sm bg-muted-bg", className),
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "h-full rounded-sm transition-[width]",
            tone,
            pct === void 0 && "w-1/3 animate-pulse motion-reduce:animate-none"
          ),
          style: pct === void 0 ? void 0 : { width: `${pct}%` }
        }
      )
    }
  );
}
function Stepper({
  steps,
  current,
  onStepClick,
  className
}) {
  return /* @__PURE__ */ jsx("ol", { className: cn("flex flex-col gap-2", className), children: steps.map((s, i) => {
    const done = i < current;
    const active = i === current;
    return /* @__PURE__ */ jsx("li", { "aria-current": active ? "step" : void 0, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        disabled: !done || !onStepClick,
        onClick: () => onStepClick?.(i),
        className: cn(
          "flex w-full items-center gap-2.5 text-start text-sm",
          active ? "text-fg" : done ? "text-muted hover:text-fg" : "text-subtle"
        ),
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "flex size-5.5 shrink-0 items-center justify-center rounded-sm border text-xs font-semibold",
                s.error ? "border-danger text-danger" : done ? "border-primary bg-primary text-on-primary" : active ? "border-primary text-primary" : "border-line-strong"
              ),
              children: done && !s.error ? /* @__PURE__ */ jsx(Check, { className: "size-3.5", "aria-hidden": true }) : i + 1
            }
          ),
          s.label
        ]
      }
    ) }, s.id);
  }) });
}
function SecretDisplay({
  value,
  label,
  acknowledgeLabel,
  onAcknowledge,
  acknowledged,
  masked = false
}) {
  const { t: laf } = useLaf();
  const shown = masked ? `${"\u2022".repeat(Math.max(0, Math.min(value.length - 4, 12)))}${value.slice(-4)}` : value;
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-2.5", children: [
    /* @__PURE__ */ jsx("span", { className: "form-label", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("output", { className: "code-display min-w-0 flex-1 text-base tracking-normal break-all select-all", children: shown }),
      /* @__PURE__ */ jsx(CopyButton, { value, label: `${laf.copy} ${label}` })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-muted", children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked: acknowledged, onChange: (e) => onAcknowledge?.(e.target.checked) }),
      acknowledgeLabel
    ] })
  ] });
}
function DataGridLegacy({
  columns,
  rows,
  rowId,
  sort,
  onSortChange,
  selected,
  onSelectedChange,
  loading,
  emptyTitle: emptyTitleProp,
  emptyDescription
}) {
  const { t: laf } = useLaf();
  const emptyTitle = emptyTitleProp ?? laf.nothingHere;
  const selectable = !!onSelectedChange;
  const ids = rows.map(rowId);
  const sel = new Set(selected);
  const allOn = ids.length > 0 && ids.every((i) => sel.has(i));
  const someOn = ids.some((i) => sel.has(i));
  const cycle = (id) => {
    if (sort?.id !== id) onSortChange?.({ id, dir: "asc" });
    else if (sort.dir === "asc") onSortChange?.({ id, dir: "desc" });
    else onSortChange?.(void 0);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        selectable && /* @__PURE__ */ jsx("th", { className: "w-10", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            "aria-label": laf.selectAllRows,
            checked: allOn,
            ref: (el) => {
              if (el) el.indeterminate = !allOn && someOn;
            },
            onChange: () => onSelectedChange(allOn ? [] : ids)
          }
        ) }),
        columns.map((c) => /* @__PURE__ */ jsx(
          "th",
          {
            className: cn(c.numeric && "text-end"),
            "aria-sort": sort?.id === c.id ? sort.dir === "asc" ? "ascending" : "descending" : c.sortable ? "none" : void 0,
            children: c.sortable ? /* @__PURE__ */ jsxs("button", { type: "button", className: "inline-flex items-center gap-1 font-[inherit] uppercase hover:text-fg", onClick: () => cycle(c.id), children: [
              c.header,
              sort?.id === c.id && (sort.dir === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "size-3", "aria-hidden": true }) : /* @__PURE__ */ jsx(ArrowDown, { className: "size-3", "aria-hidden": true }))
            ] }) : c.header
          },
          c.id
        ))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { "aria-busy": loading || void 0, children: loading ? Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ jsx("tr", { children: Array.from({ length: columns.length + (selectable ? 1 : 0) }, (_2, j) => /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Skeleton, {}) }, j)) }, i)) : rows.map((row) => {
        const id = rowId(row);
        return /* @__PURE__ */ jsxs("tr", { "aria-selected": selectable ? sel.has(id) : void 0, children: [
          selectable && /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              "aria-label": laf.selectRow,
              checked: sel.has(id),
              onChange: () => onSelectedChange(sel.has(id) ? selected.filter((s) => s !== id) : [...selected ?? [], id])
            }
          ) }),
          columns.map((c) => /* @__PURE__ */ jsx("td", { className: cn(c.numeric && "text-end font-mono"), children: c.cell(row) }, c.id))
        ] }, id);
      }) })
    ] }),
    !loading && rows.length === 0 && /* @__PURE__ */ jsx(EmptyState, { title: emptyTitle, description: emptyDescription })
  ] });
}
var taskTone = { queued: "neutral", running: "primary", ok: "ok", failed: "danger", cancelled: "warn" };
function TaskPanel({
  tasks,
  onCancel,
  onRetry,
  labels: labelsProp
}) {
  const { t: laf } = useLaf();
  const labels = labelsProp ?? { cancel: laf.cancel, retry: laf.retry, empty: laf.noRecentTasks };
  if (tasks.length === 0) return /* @__PURE__ */ jsx("p", { className: "px-4 py-6 text-center text-sm text-muted", children: labels.empty });
  return /* @__PURE__ */ jsx("ul", { className: "divide-y divide-line rounded-lg border border-line bg-surface", children: tasks.map((t) => /* @__PURE__ */ jsxs("li", { className: "grid gap-1.5 px-4 py-3 text-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1 truncate font-medium text-fg", children: [
        t.name,
        t.target && /* @__PURE__ */ jsx("span", { className: "ms-2 font-normal text-muted", children: t.target })
      ] }),
      /* @__PURE__ */ jsx("span", { "aria-live": "polite", children: /* @__PURE__ */ jsx(Badge, { tone: taskTone[t.status], children: t.status }) }),
      t.status === "running" && onCancel && /* @__PURE__ */ jsx("button", { type: "button", className: "text-primary hover:underline", onClick: () => onCancel(t.id), children: labels.cancel }),
      t.status === "failed" && onRetry && /* @__PURE__ */ jsx("button", { type: "button", className: "text-primary hover:underline", onClick: () => onRetry(t.id), children: labels.retry })
    ] }),
    t.status === "running" && /* @__PURE__ */ jsx(Progress, { label: t.name, value: t.progress }),
    /* @__PURE__ */ jsx("div", { className: "font-mono text-xs text-subtle", children: [t.initiator, t.started].filter(Boolean).join(" \xB7 ") }),
    t.error && /* @__PURE__ */ jsx("div", { className: "text-xs text-danger", children: t.error })
  ] }, t.id)) });
}
function UserMenu({
  name,
  email,
  tenant,
  items,
  signOutLabel: signOutLabelProp,
  onSignOut
}) {
  const { t: laf } = useLaf();
  const signOutLabel = signOutLabelProp ?? laf.signOut;
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { "aria-label": name, className: "border-0 bg-transparent p-0", children: /* @__PURE__ */ jsx(Avatar, { name }) }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { children: [
      /* @__PURE__ */ jsxs(DropdownMenuLabel, { children: [
        /* @__PURE__ */ jsx("div", { className: "text-fg", children: name }),
        email && /* @__PURE__ */ jsx("div", { className: "text-xs font-normal text-muted", children: email }),
        tenant && /* @__PURE__ */ jsx("div", { className: "text-xs font-normal text-subtle", children: tenant })
      ] }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      items?.map((it) => /* @__PURE__ */ jsxs(DropdownMenuItem, { onSelect: it.onSelect, children: [
        it.icon,
        it.label
      ] }, it.id)),
      items && items.length > 0 && /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs(DropdownMenuItem, { danger: true, onSelect: onSignOut, children: [
        /* @__PURE__ */ jsx(LogOut, { "aria-hidden": true }),
        signOutLabel
      ] })
    ] })
  ] });
}
function observeRectWithFallback(inst, cb) {
  return observeElementRect(inst, (rect) => cb(rect.height === 0 ? inst.options.initialRect : rect));
}
function VirtualList({
  items,
  rowHeight,
  height,
  overscan = 8,
  renderRow,
  label,
  className,
  onRangeChange
}) {
  const ref = React21.useRef(null);
  const virt = useVirtualizer({
    count: items.length,
    getScrollElement: () => ref.current,
    estimateSize: () => rowHeight,
    overscan,
    initialRect: { width: 0, height },
    observeElementRect: observeRectWithFallback
  });
  const rows = virt.getVirtualItems();
  const last = rows[rows.length - 1]?.index ?? -1;
  React21.useEffect(() => {
    if (last >= 0) onRangeChange?.(last);
  }, [last, onRangeChange]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "list",
      "aria-label": label,
      tabIndex: 0,
      className: cn("relative overflow-auto", className),
      style: { height },
      children: /* @__PURE__ */ jsx("div", { className: "relative", style: { height: virt.getTotalSize() }, children: rows.map((r) => /* @__PURE__ */ jsx(
        "div",
        {
          role: "listitem",
          "aria-posinset": r.index + 1,
          "aria-setsize": items.length,
          className: "absolute inset-x-0",
          style: { top: r.start, height: r.size },
          children: renderRow(items[r.index], r.index)
        },
        r.key
      )) })
    }
  );
}
function InfiniteList({
  items,
  rowHeight,
  height,
  renderRow,
  label,
  hasMore,
  loading = false,
  onEndReached,
  overscan,
  className,
  labels
}) {
  const l = { loading: "Loading\u2026", loadMore: "Load more", ...labels };
  const rows = React21.useMemo(
    () => [...items.map((item) => ({ kind: "item", item })), ...loading ? [{ kind: "loading" }] : []],
    [items, loading]
  );
  const endRef = React21.useRef(onEndReached);
  endRef.current = onEndReached;
  const onRange = React21.useCallback(
    (last) => {
      if (hasMore && !loading && last >= items.length - 1) endRef.current();
    },
    [hasMore, loading, items.length]
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx(
      VirtualList,
      {
        items: rows,
        rowHeight,
        height,
        overscan,
        label,
        className,
        onRangeChange: onRange,
        renderRow: (r, i) => r.kind === "item" ? renderRow(r.item, i) : /* @__PURE__ */ jsxs("div", { role: "status", className: "flex h-full items-center gap-2 px-2 text-sm text-muted", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: l.loading })
        ] })
      }
    ),
    hasMore && /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-secondary btn-sm self-start", disabled: loading, onClick: () => onEndReached(), children: l.loadMore })
  ] });
}
var bannerTone = {
  info: { cls: "border-primary/35 bg-primary-light text-primary", Icon: Info },
  warn: { cls: "border-warn-line bg-warn-bg text-warn", Icon: AlertTriangle },
  danger: { cls: "border-danger-line bg-danger-bg text-danger", Icon: XCircle }
};
function Banner({
  tone = "info",
  action,
  onDismiss,
  dismissLabel,
  children
}) {
  const { cls, Icon: Icon2 } = bannerTone[tone];
  const { t: laf } = useLaf();
  return /* @__PURE__ */ jsxs("div", { role: tone === "danger" ? "alert" : "status", className: cn("flex items-center gap-2.5 border-b px-4 py-2 text-sm", cls), children: [
    /* @__PURE__ */ jsx(Icon2, { className: "size-4 shrink-0", "aria-hidden": true }),
    /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1", children }),
    action,
    onDismiss && /* @__PURE__ */ jsx("button", { type: "button", "aria-label": dismissLabel ?? laf.dismiss, onClick: onDismiss, className: "opacity-80 hover:opacity-100", children: /* @__PURE__ */ jsx(X, { className: "size-4", "aria-hidden": true }) })
  ] });
}
function Accordion({
  items,
  multiple,
  defaultOpen = [],
  open: openProp,
  onOpenChange,
  className
}) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const setItem = (id, next) => setOpen((o) => next ? multiple ? o.includes(id) ? o : [...o, id] : [id] : o.filter((x) => x !== id));
  return /* @__PURE__ */ jsx("div", { className: cn("divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", className), children: items.map((it) => {
    const isOpen = open.includes(it.id);
    return /* @__PURE__ */ jsxs(CollapsiblePrimitive.Root, { open: isOpen, onOpenChange: (v) => setItem(it.id, v), children: [
      /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsxs(CollapsiblePrimitive.Trigger, { className: "flex w-full items-center gap-2 px-4 py-3 text-start text-sm font-medium text-fg hover:bg-surface-hover", children: [
        /* @__PURE__ */ jsx("span", { className: "flex-1", children: it.title }),
        /* @__PURE__ */ jsx(ChevronDown, { className: cn("size-4 transition-transform motion-reduce:transition-none", isOpen && "rotate-180"), "aria-hidden": true })
      ] }) }),
      /* @__PURE__ */ jsx(CollapsiblePrimitive.Content, { className: "overflow-hidden border-t border-line text-sm text-muted data-[state=closed]:animate-[laf-collapse-up_150ms_ease-out] data-[state=open]:animate-[laf-collapse-down_150ms_ease-out] motion-reduce:animate-none", children: /* @__PURE__ */ jsx("div", { className: "px-4 py-3", children: it.content }) })
    ] }, it.id);
  }) });
}
function SplitPane({
  start,
  end,
  defaultSize = 280,
  min = 160,
  max = 600,
  label: labelProp,
  className
}) {
  const { t: laf } = useLaf();
  const label = labelProp ?? laf.resizePanels;
  const [size, setSize] = React21.useState(defaultSize);
  const clamp = (n) => Math.min(max, Math.max(min, n));
  const onPointerDown = (e) => {
    const startX = e.clientX;
    const startSize = size;
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const move = (ev) => setSize(clamp(startSize + (rtl ? -1 : 1) * (ev.clientX - startX)));
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 50 : 10;
    if (e.key === "ArrowLeft") setSize((s) => clamp(s - step));
    else if (e.key === "ArrowRight") setSize((s) => clamp(s + step));
    else return;
    e.preventDefault();
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("flex min-h-0 overflow-hidden rounded-lg border border-line bg-surface", className), children: [
    /* @__PURE__ */ jsx("div", { className: "shrink-0 overflow-auto", style: { width: size }, children: start }),
    /* @__PURE__ */ jsx(
      "div",
      {
        role: "separator",
        "aria-orientation": "vertical",
        "aria-label": label,
        "aria-valuenow": size,
        "aria-valuemin": min,
        "aria-valuemax": max,
        tabIndex: 0,
        onPointerDown,
        onKeyDown,
        onDoubleClick: () => setSize(defaultSize),
        className: "w-1 shrink-0 cursor-col-resize touch-none bg-line outline-none hover:bg-primary focus-visible:bg-primary"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1 overflow-auto", children: end })
  ] });
}
var Drawer = DialogPrimitive.Root;
var DrawerTrigger = DialogPrimitive.Trigger;
var DrawerClose = DialogPrimitive.Close;
function DrawerContent({
  title,
  description,
  footer,
  width = "md",
  children
}) {
  const { t: laf, portalContainer } = useLaf();
  const w = { sm: "w-[360px]", md: "w-[480px]", lg: "w-[640px]" }[width];
  return /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { container: portalContainer, children: [
    /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        ...description ? {} : { "aria-describedby": void 0 },
        className: cn("fixed inset-y-0 end-0 z-50 flex max-w-full flex-col border-s border-line-strong bg-menu", w),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 border-b border-line px-5 py-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx(DialogPrimitive.Title, { className: "text-base font-semibold text-fg", children: title }),
              description && /* @__PURE__ */ jsx(DialogPrimitive.Description, { className: "text-sm text-muted", children: description })
            ] }),
            /* @__PURE__ */ jsx(DialogPrimitive.Close, { "aria-label": laf.close, className: "popup-close", children: /* @__PURE__ */ jsx(X, { className: "size-4", "aria-hidden": true }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto px-5 py-4 text-sm text-muted", children }),
          footer && /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-2.5 border-t border-line px-5 py-3.5", children: footer })
        ]
      }
    )
  ] });
}
function NumberInput({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  units,
  unit,
  onUnitChange,
  label
}) {
  const { t: laf } = useLaf();
  const factor = units?.find((u) => u.label === unit)?.factor ?? 1;
  const shown = value / factor;
  const [text, setText] = React21.useState(String(shown));
  React21.useEffect(() => setText(String(shown)), [shown]);
  const commit = (n) => onChange(Math.min(max, Math.max(min, n * factor)));
  const bump = (d) => commit(shown + d * step);
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex items-stretch gap-1.5", children: [
    /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-secondary btn-sm auto", "aria-label": laf.decrease(label), disabled: value <= min, onClick: () => bump(-1), children: /* @__PURE__ */ jsx(Minus, { "aria-hidden": true }) }),
    /* @__PURE__ */ jsx(
      Input,
      {
        inputMode: "decimal",
        "aria-label": label,
        className: "w-24 text-end font-mono tabular-nums",
        value: text,
        invalid: Number.isNaN(Number(text)) || Number(text) * factor < min || Number(text) * factor > max,
        onChange: (e) => setText(e.target.value),
        onBlur: () => {
          const n = Number(text);
          if (Number.isNaN(n)) setText(String(shown));
          else commit(n);
        }
      }
    ),
    /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-secondary btn-sm auto", "aria-label": laf.increase(label), disabled: value >= max, onClick: () => bump(1), children: /* @__PURE__ */ jsx(Plus, { "aria-hidden": true }) }),
    units && /* @__PURE__ */ jsx("select", { className: "form-input w-20", "aria-label": laf.unitOf(label), value: unit, onChange: (e) => onUnitChange?.(e.target.value), children: units.map((u) => /* @__PURE__ */ jsx("option", { children: u.label }, u.label)) })
  ] });
}
function Slider({
  value: valueProp,
  defaultValue: defaultValue2,
  onValueChange,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks,
  withInput,
  disabled,
  className,
  "aria-label": ariaLabel
}) {
  const { t: laf } = useLaf();
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue2 ?? min,
    onChange: (v) => {
      onValueChange?.(v);
      if (typeof v === "number") onChange?.({ target: { value: String(v) } });
    }
  });
  const arr = Array.isArray(value) ? value : [value];
  const pct = (n) => `${(n - min) / (max - min || 1) * 100}%`;
  return /* @__PURE__ */ jsxs("div", { className: cn("flex w-full items-center gap-3", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxs(
        SliderPrimitive.Root,
        {
          className: "relative flex h-5 w-full touch-none items-center select-none data-[disabled]:opacity-50",
          value: arr,
          min,
          max,
          step,
          disabled,
          onValueChange: (v) => setValue(Array.isArray(value) ? [v[0], v[1]] : v[0]),
          children: [
            /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1 grow rounded-xs bg-muted-bg", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full rounded-xs bg-primary" }) }),
            arr.map((_, i) => /* @__PURE__ */ jsx(
              SliderPrimitive.Thumb,
              {
                "aria-label": arr.length > 1 && ariaLabel ? `${ariaLabel} ${i === 0 ? laf.minimum : laf.maximum}` : ariaLabel,
                className: "block size-4 rounded-sm border border-primary bg-surface outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              },
              i
            ))
          ]
        }
      ),
      marks && /* @__PURE__ */ jsx("div", { className: "relative mt-1 h-4 text-xs text-muted", "aria-hidden": true, children: marks.map((m) => /* @__PURE__ */ jsx("span", { className: "absolute -translate-x-1/2 rtl:translate-x-1/2", style: { insetInlineStart: pct(m.value) }, children: m.label ?? m.value }, m.value)) })
    ] }),
    withInput && typeof value === "number" && /* @__PURE__ */ jsx(NumberInput, { label: ariaLabel ?? laf.value, value, min, max, step, onChange: (n) => setValue(n) })
  ] });
}
var chipTone = {
  neutral: "border-line bg-muted-bg text-fg",
  primary: "border-primary/35 bg-primary-light text-primary",
  ok: "border-ok-line bg-ok-bg text-ok",
  warn: "border-warn-line bg-warn-bg text-warn",
  danger: "border-danger-line bg-danger-bg text-danger"
};
function Chip({
  onRemove,
  removeLabel,
  tone = "neutral",
  children
}) {
  return /* @__PURE__ */ jsxs("span", { className: cn("inline-flex h-6 items-center gap-1 rounded-sm border px-2 text-xs", chipTone[tone]), children: [
    children,
    onRemove && /* @__PURE__ */ jsx("button", { type: "button", "aria-label": removeLabel ?? "Remove", onClick: onRemove, className: "opacity-70 hover:opacity-100", children: /* @__PURE__ */ jsx(X, { className: "size-3", "aria-hidden": true }) })
  ] });
}
function TagInput({
  value,
  onChange,
  label,
  placeholder,
  max,
  validate
}) {
  const { t: laf } = useLaf();
  const [text, setText] = React21.useState("");
  const [error, setError] = React21.useState();
  const add = (raw) => {
    const tags = raw.split(/[,\s]+/).map((t) => t.trim()).filter(Boolean);
    let next = [...value];
    for (const t of tags) {
      const err = next.includes(t) ? `"${t}" already added` : validate?.(t);
      if (err) return setError(err);
      if (max === void 0 || next.length < max) next.push(t);
    }
    setError(void 0);
    onChange(next);
    setText("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
    /* @__PURE__ */ jsxs("div", { className: cn("form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", error && "error"), children: [
      value.map((t) => /* @__PURE__ */ jsx(Chip, { removeLabel: laf.removeItem(t), onRemove: () => onChange(value.filter((v) => v !== t)), children: t }, t)),
      /* @__PURE__ */ jsx(
        "input",
        {
          "aria-label": label,
          "aria-invalid": !!error || void 0,
          placeholder,
          className: "min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none",
          value: text,
          onChange: (e) => setText(e.target.value),
          onKeyDown: (e) => {
            if ((e.key === "Enter" || e.key === ",") && text) {
              e.preventDefault();
              add(text);
            } else if (e.key === "Backspace" && !text && value.length) onChange(value.slice(0, -1));
          },
          onPaste: (e) => {
            e.preventDefault();
            add(e.clipboardData.getData("text"));
          }
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "field-error", role: "alert", children: error })
  ] });
}
function KeyValueEditor({
  value,
  onChange,
  addLabel: addLabelProp,
  keyLabel: keyLabelProp,
  valueLabel: valueLabelProp,
  duplicateMessage: duplicateMessageProp
}) {
  const { t: laf } = useLaf();
  const addLabel = addLabelProp ?? laf.add;
  const keyLabel = keyLabelProp ?? laf.key;
  const valueLabel = valueLabelProp ?? laf.value;
  const duplicateMessage = duplicateMessageProp ?? laf.duplicateKey;
  const ids = React21.useRef([]);
  const next = React21.useRef(0);
  while (ids.current.length < value.length) ids.current.push(next.current++);
  ids.current.length = value.length;
  const set = (i, patch) => onChange(value.map((r, j) => j === i ? { ...r, ...patch } : r));
  const dup = (i) => value[i].key !== "" && value.findIndex((r) => r.key === value[i].key) !== i;
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
    value.map((row, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_1fr_auto] items-start gap-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Input, { "aria-label": `${keyLabel} ${i + 1}`, className: "font-mono", invalid: dup(i), value: row.key, onChange: (e) => set(i, { key: e.target.value }) }),
        dup(i) && /* @__PURE__ */ jsx("p", { className: "field-error", role: "alert", children: duplicateMessage })
      ] }),
      /* @__PURE__ */ jsx(Input, { "aria-label": `${valueLabel} ${i + 1}`, className: "font-mono", value: row.value, onChange: (e) => set(i, { value: e.target.value }) }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-ghost btn-sm auto", "aria-label": laf.removeRow(i + 1), onClick: () => {
        ids.current.splice(i, 1);
        onChange(value.filter((_, j) => j !== i));
      }, children: /* @__PURE__ */ jsx(X, { "aria-hidden": true }) })
    ] }, ids.current[i])),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("button", { type: "button", className: "btn btn-secondary btn-sm auto", onClick: () => onChange([...value, { key: "", value: "" }]), children: [
      /* @__PURE__ */ jsx(Plus, { "aria-hidden": true }),
      addLabel
    ] }) })
  ] });
}
function Sparkline({ data, label, className }) {
  const w = 100;
  const h = 24;
  const min = Math.min(...data);
  const span = Math.max(...data) - min || 1;
  const pts = data.map((d, i) => `${i / Math.max(1, data.length - 1) * w},${h - 2 - (d - min) / span * (h - 4)}`);
  return /* @__PURE__ */ jsx("svg", { viewBox: `0 0 ${w} ${h}`, role: "img", "aria-label": label, className: cn("h-6 w-24 text-primary", className), preserveAspectRatio: "none", children: /* @__PURE__ */ jsx("polyline", { points: pts.join(" "), fill: "none", stroke: "currentColor", strokeWidth: "1.5", vectorEffect: "non-scaling-stroke" }) });
}
var SERIES_COLORS = ["text-primary", "text-ok", "text-warn", "text-danger"];
var SERIES_DASH = [void 0, "4 2", "1 3", "6 2 1 2"];
function LineChart({
  series,
  xLabels,
  label,
  unit = "",
  className
}) {
  const w = 400;
  const h = 160;
  const pad2 = { l: 36, r: 8, t: 8, b: 20 };
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all, 1);
  const n = xLabels.length;
  const x = (i) => pad2.l + i / Math.max(1, n - 1) * (w - pad2.l - pad2.r);
  const y = (v) => pad2.t + (1 - v / max) * (h - pad2.t - pad2.b);
  const [hover, setHover] = React21.useState();
  const ticks = [0, 0.5, 1].map((t) => t * max);
  return /* @__PURE__ */ jsxs("figure", { className: cn("m-0 max-w-xl", className), children: [
    /* @__PURE__ */ jsxs(
      "svg",
      {
        viewBox: `0 0 ${w} ${h}`,
        role: "img",
        "aria-label": `${label}: ${series.map((s) => `${s.name} latest ${s.data[s.data.length - 1]}${unit}`).join(", ")}`,
        className: "w-full",
        onMouseLeave: () => setHover(void 0),
        onMouseMove: (e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width * w;
          setHover(Math.min(n - 1, Math.max(0, Math.round((px - pad2.l) / (w - pad2.l - pad2.r) * (n - 1)))));
        },
        children: [
          ticks.map((t) => /* @__PURE__ */ jsxs("g", { className: "text-subtle", children: [
            /* @__PURE__ */ jsx("line", { x1: pad2.l, x2: w - pad2.r, y1: y(t), y2: y(t), stroke: "var(--border)" }),
            /* @__PURE__ */ jsx("text", { x: pad2.l - 4, y: y(t) + 3, textAnchor: "end", fontSize: "9", fill: "currentColor", children: Math.round(t) })
          ] }, t)),
          xLabels.map(
            (l, i) => i % Math.ceil(n / 6) === 0 ? /* @__PURE__ */ jsx("text", { x: x(i), y: h - 6, textAnchor: i === n - 1 ? "end" : i === 0 ? "start" : "middle", fontSize: "9", className: "fill-subtle", children: l }, i) : null
          ),
          series.map((s, si) => /* @__PURE__ */ jsx(
            "polyline",
            {
              className: SERIES_COLORS[si % 4],
              points: s.data.map((d, i) => `${x(i)},${y(d)}`).join(" "),
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeDasharray: SERIES_DASH[si % 4]
            },
            s.name
          )),
          hover !== void 0 && /* @__PURE__ */ jsx("line", { x1: x(hover), x2: x(hover), y1: pad2.t, y2: h - pad2.b, stroke: "var(--border-strong)" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("figcaption", { className: "mt-1 flex flex-wrap items-center gap-x-4 text-xs text-muted", "aria-live": "off", children: [
      series.map((s, si) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("svg", { width: "16", height: "4", className: SERIES_COLORS[si % 4], "aria-hidden": true, children: /* @__PURE__ */ jsx("line", { x1: "0", x2: "16", y1: "2", y2: "2", stroke: "currentColor", strokeWidth: "2", strokeDasharray: SERIES_DASH[si % 4] }) }),
        s.name,
        hover !== void 0 && /* @__PURE__ */ jsxs("b", { className: "font-mono text-fg", children: [
          s.data[hover],
          unit
        ] })
      ] }, s.name)),
      hover !== void 0 && /* @__PURE__ */ jsx("span", { className: "ms-auto font-mono text-subtle", children: xLabels[hover] })
    ] })
  ] });
}
function TimeRangePicker({
  value,
  onChange,
  presets = ["15m", "1h", "24h", "7d"],
  refresh,
  onRefreshChange,
  label: labelProp
}) {
  const { t: laf } = useLaf();
  const label = labelProp ?? laf.timeRange;
  return /* @__PURE__ */ jsxs("div", { role: "group", "aria-label": label, className: "inline-flex items-center gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-flex overflow-hidden rounded-md border border-line", children: presets.map((p) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "aria-pressed": value === p,
        onClick: () => onChange(p),
        className: cn("border-0 border-e border-line bg-input px-3 py-1.5 text-sm text-muted last:border-e-0 hover:text-fg", value === p && "bg-primary-light text-primary"),
        children: p
      },
      p
    )) }),
    onRefreshChange && /* @__PURE__ */ jsx("select", { className: "form-input w-24", "aria-label": laf.autoRefresh, value: refresh, onChange: (e) => onRefreshChange(e.target.value), children: ["off", "5s", "30s", "1m"].map((r) => /* @__PURE__ */ jsx("option", { value: r, children: r === "off" ? laf.off : r }, r)) })
  ] });
}
var levelCls = { info: "text-muted", warn: "text-warn", error: "text-danger" };
function LogViewer({ lines, label, follow = true, className }) {
  const { t: laf } = useLaf();
  const [query, setQuery] = React21.useState("");
  const [wrap, setWrap] = React21.useState(false);
  const box = React21.useRef(null);
  const shown = query ? lines.filter((l) => l.text.toLowerCase().includes(query.toLowerCase())) : lines;
  React21.useEffect(() => {
    if (follow && box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [shown.length, follow]);
  return /* @__PURE__ */ jsxs("div", { className: cn("overflow-hidden rounded-lg border border-line", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 border-b border-line bg-surface px-3 py-2", children: [
      /* @__PURE__ */ jsx("input", { type: "search", "aria-label": `${laf.search} ${label}`, placeholder: `${laf.search}\u2026`, className: "form-input h-8 max-w-xs", value: query, onChange: (e) => setQuery(e.target.value) }),
      /* @__PURE__ */ jsxs("label", { className: "check ms-auto text-xs", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: wrap, onChange: (e) => setWrap(e.target.checked) }),
        laf.wrap
      ] })
    ] }),
    shown.length > 500 && !wrap ? /* @__PURE__ */ jsx(
      VirtualList,
      {
        label,
        items: shown,
        rowHeight: 20,
        height: 288,
        className: "bg-black/30 font-mono text-[0.8125rem]",
        renderRow: (l) => /* @__PURE__ */ jsxs("div", { className: cn("flex gap-3 px-3 whitespace-nowrap", levelCls[l.level]), children: [
          /* @__PURE__ */ jsx("span", { className: "text-subtle select-none", children: l.time }),
          /* @__PURE__ */ jsx("span", { children: l.text })
        ] })
      }
    ) : /* @__PURE__ */ jsxs("div", { ref: box, role: "log", "aria-label": label, tabIndex: 0, className: "max-h-72 overflow-auto bg-black/30 p-3 font-mono text-[0.8125rem]", children: [
      shown.map((l, i) => /* @__PURE__ */ jsxs("div", { className: cn("flex gap-3", levelCls[l.level], !wrap && "whitespace-nowrap"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-subtle select-none", children: l.time }),
        /* @__PURE__ */ jsx("span", { className: wrap ? "break-all" : void 0, children: l.text })
      ] }, i)),
      shown.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-subtle", children: laf.noLines })
    ] })
  ] });
}
function TenantSwitcher({
  tenants,
  current,
  onSwitch,
  label: labelProp
}) {
  const { t: laf } = useLaf();
  const sel = tenants.filter((t) => t.value === current);
  return /* @__PURE__ */ jsx(Combobox, { label: labelProp ?? laf.tenant, options: tenants, value: sel, onChange: (v) => v[0] && onSwitch(v[0].value) });
}
var pmLabels = {
  search: "Search permissions",
  inheritedFrom: (from) => `Inherited from ${from}`,
  pending: (n) => `${n} pending change${n === 1 ? "" : "s"}`,
  save: "Save",
  discard: "Discard",
  noMatch: "No matching permissions"
};
function PermissionMatrix({
  roles,
  groups,
  value,
  onChange,
  readOnly,
  inherited,
  baseline,
  searchable,
  onSave,
  onDiscard,
  labels: labelsProp
}) {
  const { t: laf } = useLaf();
  const L = { ...pmLabels, ...labelsProp };
  const [query, setQuery] = React21.useState("");
  const inh = (r, p) => inherited?.[r]?.find((x) => x.permission === p);
  const has = (r, p) => (value[r]?.includes(p) ?? false) || !!inh(r, p);
  const was = (r, p) => baseline?.[r]?.includes(p) ?? false;
  const changed = (r, p) => !!baseline && (value[r]?.includes(p) ?? false) !== was(r, p);
  const set = (r, ps, on) => {
    const cur = new Set(value[r] ?? []);
    ps.forEach((p) => on ? cur.add(p) : cur.delete(p));
    onChange({ ...value, [r]: [...cur] });
  };
  const pending = baseline ? roles.reduce((n, r) => n + groups.reduce((m, g) => m + g.permissions.filter((p) => changed(r.id, p.id)).length, 0), 0) : 0;
  const q = query.trim().toLowerCase();
  const shown = groups.map((g) => ({ ...g, permissions: q && !g.label.toLowerCase().includes(q) ? g.permissions.filter((p) => p.label.toLowerCase().includes(q)) : g.permissions })).filter((g) => g.permissions.length > 0);
  const onKeyDown = (e) => {
    const dx = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const dy = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    const cell = e.target.closest("td");
    if (!dx && !dy || !cell || !e.target.matches("input[type=checkbox]")) return;
    const rows = [...e.currentTarget.querySelectorAll("tbody tr")];
    const row = cell.parentElement;
    const ri = rows.indexOf(row);
    const ci = [...row.children].indexOf(cell);
    const next = rows[ri + dy]?.children[ci + dx]?.querySelector("input[type=checkbox]");
    if (next) {
      e.preventDefault();
      next.focus();
    }
  };
  const matrixBox = (r, label, p, ids) => {
    const src = p ? inh(r.id, p) : void 0;
    const n = ids.filter((x) => has(r.id, x)).length;
    return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          "aria-label": `${label} for ${r.label}`,
          title: src ? L.inheritedFrom(src.from) : void 0,
          disabled: readOnly || !!src,
          checked: p ? has(r.id, p) : n === ids.length,
          ref: (el) => {
            if (el && !p) el.indeterminate = n > 0 && n < ids.length;
          },
          onChange: (e) => set(r.id, ids, e.target.checked)
        }
      ),
      src && /* @__PURE__ */ jsx(Badge, { tone: "neutral", children: src.from })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
    (searchable || baseline) && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      searchable && /* @__PURE__ */ jsx(Input, { type: "search", "aria-label": L.search, placeholder: L.search, value: query, onChange: (e) => setQuery(e.target.value), className: "max-w-xs" }),
      baseline && pending > 0 && /* @__PURE__ */ jsxs("div", { className: "ms-auto flex items-center gap-2 text-sm", role: "status", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted", children: L.pending(pending) }),
        onDiscard && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: onDiscard, children: L.discard }),
        onSave && /* @__PURE__ */ jsx(Button, { size: "sm", onClick: onSave, children: L.save })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "table-wrap", children: [
      /* @__PURE__ */ jsxs("table", { className: "table", onKeyDown, children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: laf.permission }),
          roles.map((r) => /* @__PURE__ */ jsx("th", { className: "text-center", children: r.label }, r.id))
        ] }) }),
        shown.map((g) => {
          const ids = g.permissions.map((p) => p.id);
          return /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { scope: "rowgroup", className: "bg-muted-bg", children: g.label }),
              roles.map((r) => /* @__PURE__ */ jsx("td", { className: "bg-muted-bg text-center", children: matrixBox(r, g.label, void 0, ids) }, r.id))
            ] }),
            g.permissions.map((p) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "ps-6", children: p.label }),
              roles.map((r) => /* @__PURE__ */ jsx("td", { className: cn("text-center", changed(r.id, p.id) && "bg-warn-bg"), "data-changed": changed(r.id, p.id) || void 0, children: matrixBox(r, p.label, p.id, [p.id]) }, r.id))
            ] }, p.id))
          ] }, g.id);
        })
      ] }),
      shown.length === 0 && /* @__PURE__ */ jsx("p", { className: "p-4 text-sm text-muted", children: L.noMatch })
    ] })
  ] });
}
function Kbd({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "kbd",
    {
      className: cn("inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-line bg-muted-bg px-1 font-mono text-[0.6875rem] text-muted", className),
      ...props
    }
  );
}
function InlineEdit({
  value,
  onSave,
  label,
  validate
}) {
  const { t: laf } = useLaf();
  const [editing, setEditing] = React21.useState(false);
  const [text, setText] = React21.useState(value);
  const [error, setError] = React21.useState();
  const [pending, setPending] = React21.useState(false);
  const cancelled = React21.useRef(false);
  const save = async () => {
    if (cancelled.current) return;
    if (text === value) return setEditing(false);
    const err = validate?.(text);
    if (err) return setError(err);
    setPending(true);
    try {
      await onSave(text);
      setEditing(false);
    } finally {
      setPending(false);
    }
  };
  if (!editing) {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-label": `${label}: ${value}. ${laf.edit}`,
        className: "group inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-fg",
        onClick: () => {
          cancelled.current = false;
          setText(value);
          setError(void 0);
          setEditing(true);
        },
        children: [
          value,
          /* @__PURE__ */ jsx(Pencil, { className: "size-3.5 text-subtle opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100", "aria-hidden": true })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs("span", { className: "inline-grid gap-1", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        autoFocus: true,
        "aria-label": label,
        value: text,
        invalid: !!error,
        disabled: pending,
        "aria-busy": pending || void 0,
        onChange: (e) => setText(e.target.value),
        onBlur: save,
        onKeyDown: (e) => {
          if (e.key === "Enter") save();
          else if (e.key === "Escape") {
            cancelled.current = true;
            setEditing(false);
          }
        }
      }
    ),
    error && /* @__PURE__ */ jsx("span", { className: "field-error", role: "alert", children: error })
  ] });
}
function FileDropzone({
  files,
  onFiles,
  onRemove,
  accept,
  maxSize,
  multiple = true,
  label: labelProp
}) {
  const { t: laf } = useLaf();
  const label = labelProp ?? laf.dropFiles;
  const input = React21.useRef(null);
  const [over, setOver] = React21.useState(false);
  const [rejected, setRejected] = React21.useState();
  const take = (list) => {
    if (!list) return;
    const all = [...list];
    const typed = all.filter((f) => matchesAccept(f, accept));
    const ok = maxSize ? typed.filter((f) => f.size <= maxSize) : typed;
    const badType = all.length - typed.length;
    const tooBig = typed.length - ok.length;
    setRejected(
      [badType && laf.unsupportedType(badType), tooBig && laf.exceedsSize(tooBig)].filter(Boolean).join("; ") || void 0
    );
    if (ok.length) onFiles(ok);
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => input.current?.click(),
        onDragOver: (e) => {
          e.preventDefault();
          setOver(true);
        },
        onDragLeave: () => setOver(false),
        onDrop: (e) => {
          e.preventDefault();
          setOver(false);
          take(e.dataTransfer.files);
        },
        className: cn(
          "flex flex-col items-center gap-2 rounded-md border border-dashed border-line-strong bg-muted-bg px-6 py-8 text-sm text-muted hover:text-fg",
          over && "border-primary bg-primary-light text-fg"
        ),
        children: [
          /* @__PURE__ */ jsx(UploadCloud, { className: "size-6", "aria-hidden": true }),
          label
        ]
      }
    ),
    /* @__PURE__ */ jsx("input", { ref: input, type: "file", hidden: true, accept, multiple, onChange: (e) => take(e.target.files) }),
    rejected && /* @__PURE__ */ jsx("p", { className: "field-error", role: "alert", children: rejected }),
    files.length > 0 && /* @__PURE__ */ jsx("ul", { className: "divide-y divide-line rounded-md border border-line text-sm", children: files.map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 px-3 py-2", children: [
      /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-fg", children: f.name }),
      /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-subtle", children: format.bytes(f.size) }),
      f.error ? /* @__PURE__ */ jsx("span", { className: "text-xs text-danger", children: f.error }) : f.progress !== void 0 && f.progress < 100 ? /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs text-muted", children: [
        f.progress,
        "%"
      ] }) : null,
      onRemove && /* @__PURE__ */ jsx("button", { type: "button", "aria-label": laf.removeItem(f.name), onClick: () => onRemove(f.id), className: "text-muted hover:text-fg", children: /* @__PURE__ */ jsx(X, { className: "size-4", "aria-hidden": true }) })
    ] }, f.id)) })
  ] });
}
var alarmTone = { critical: "danger", warning: "warn", info: "neutral" };
function AlarmList({
  alarms,
  onAcknowledge,
  empty: emptyProp
}) {
  const { t: laf } = useLaf();
  const empty = emptyProp ?? laf.noActiveAlarms;
  if (alarms.length === 0) return /* @__PURE__ */ jsx("p", { className: "px-4 py-6 text-center text-sm text-muted", children: empty });
  return /* @__PURE__ */ jsx("ul", { className: "divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", children: alarms.map((a) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 px-4 py-3 text-sm", children: [
    /* @__PURE__ */ jsx(Badge, { tone: alarmTone[a.severity], children: a.severity }),
    /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("b", { className: "font-semibold text-fg", children: a.name }),
      /* @__PURE__ */ jsx("span", { className: "ms-2 text-muted", children: a.entity })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-subtle", children: a.triggered }),
    onAcknowledge && !a.acknowledged && /* @__PURE__ */ jsx("button", { type: "button", className: "text-primary hover:underline", onClick: () => onAcknowledge(a.id), children: laf.acknowledge })
  ] }, a.id)) });
}
function Gauge({ value, max = 100, label, warnAt = 70, dangerAt = 90 }) {
  const pct = Math.min(100, Math.max(0, value / max * 100));
  const tone = pct >= dangerAt ? "text-danger" : pct >= warnAt ? "text-warn" : "text-ok";
  const r = 40;
  const c = Math.PI * r;
  return /* @__PURE__ */ jsxs("figure", { className: "m-0 inline-block text-center", children: [
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 56", role: "meter", "aria-label": label, "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": max, className: "w-32", children: [
      /* @__PURE__ */ jsx("path", { d: "M10 50 A40 40 0 0 1 90 50", fill: "none", stroke: "var(--bg-muted)", strokeWidth: "8" }),
      /* @__PURE__ */ jsx("path", { d: "M10 50 A40 40 0 0 1 90 50", fill: "none", stroke: "currentColor", strokeWidth: "8", strokeDasharray: `${pct / 100 * c} ${c}`, className: tone })
    ] }),
    /* @__PURE__ */ jsxs("figcaption", { className: "-mt-3 font-mono text-lg text-fg", children: [
      Math.round(pct),
      "%"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: label })
  ] });
}
var SLICE = ["text-primary", "text-ok", "text-warn", "text-danger", "text-muted"];
function Donut({ slices, label }) {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const r = 15.9155;
  let offset = 25;
  return /* @__PURE__ */ jsxs("figure", { className: "m-0 flex items-center gap-4", children: [
    /* @__PURE__ */ jsx("svg", { viewBox: "0 0 42 42", role: "img", "aria-label": `${label}: ${slices.map((s) => `${s.name} ${s.value}`).join(", ")}`, className: "size-28", children: slices.map((s, i) => {
      const len = s.value / total * 100;
      const el = /* @__PURE__ */ jsx("circle", { cx: "21", cy: "21", r, fill: "none", stroke: "currentColor", strokeWidth: "5", strokeDasharray: `${len} ${100 - len}`, strokeDashoffset: offset, className: SLICE[i % 5] }, s.name);
      offset -= len;
      return el;
    }) }),
    /* @__PURE__ */ jsx("figcaption", { className: "grid gap-1 text-xs text-muted", children: slices.map((s, i) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx("span", { className: cn("size-2.5 rounded-sm bg-current", SLICE[i % 5]), "aria-hidden": true }),
      s.name,
      " ",
      /* @__PURE__ */ jsx("b", { className: "font-mono text-fg", children: s.value })
    ] }, s.name)) })
  ] });
}
function BarChart({ data, label }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return /* @__PURE__ */ jsx("ul", { "aria-label": label, className: "m-0 grid list-none gap-2 p-0", children: data.map((d) => /* @__PURE__ */ jsxs("li", { className: "grid grid-cols-[6rem_1fr_3rem] items-center gap-2 text-xs text-muted", children: [
    /* @__PURE__ */ jsx("span", { className: "truncate", children: d.name }),
    /* @__PURE__ */ jsx("span", { className: "h-3 overflow-hidden rounded-sm bg-muted-bg", children: /* @__PURE__ */ jsx("span", { className: "block h-full rounded-sm bg-primary", style: { width: `${d.value / max * 100}%` } }) }),
    /* @__PURE__ */ jsx("span", { className: "text-end font-mono text-fg", children: d.value })
  ] }, d.name)) });
}
function DateTimeInput({ mode = "date", className, ...props }) {
  return /* @__PURE__ */ jsx(Input, { type: mode, className: cn("font-mono [color-scheme:dark]", className), ...props });
}
function FormField({
  id: idProp,
  label,
  description,
  error,
  children
}) {
  const generated = React21.useId();
  const id = idProp ?? generated;
  const descId = `${id}-d`;
  const errId = `${id}-e`;
  const describedBy = [error && errId, description && descId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
    /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: id, children: label }),
    children({ id, "aria-invalid": error ? true : void 0, "aria-describedby": describedBy }),
    description && /* @__PURE__ */ jsx("p", { id: descId, className: "field-hint", children: description }),
    error && /* @__PURE__ */ jsx("p", { id: errId, className: "field-error", role: "alert", children: error })
  ] });
}
function ErrorSummary({ errors, title: titleProp }) {
  const { t: laf } = useLaf();
  const title = titleProp ?? laf.fixFollowing;
  if (errors.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { role: "alert", className: "alert alert-error", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("b", { children: title }),
    /* @__PURE__ */ jsx("ul", { className: "m-0 ps-5", children: errors.map((e) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `#${e.id}`, children: e.message }) }, e.id)) })
  ] }) });
}
var ContextMenu = ContextPrimitive.Root;
var ContextMenuTrigger = ContextPrimitive.Trigger;
function ContextMenuContent({ className, ...props }) {
  const container = usePortalContainer();
  return /* @__PURE__ */ jsx(ContextPrimitive.Portal, { container, children: /* @__PURE__ */ jsx(ContextPrimitive.Content, { className: cn("dropdown-menu relative! top-auto! left-auto! z-30 min-w-48", className), ...props }) });
}
function ContextMenuItem({ danger, className, ...props }) {
  return /* @__PURE__ */ jsx(
    ContextPrimitive.Item,
    {
      className: cn("dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg", danger && "danger", className),
      ...props
    }
  );
}
function ContextMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx(ContextPrimitive.Separator, { className: cn("dropdown-sep", className), ...props });
}
function CommandPalette({
  commands,
  open,
  onOpenChange,
  placeholder: placeholderProp,
  emptyText: emptyTextProp
}) {
  const { t } = useLaf();
  const portalContainer = usePortalContainer();
  const placeholder = placeholderProp ?? t.commandPlaceholder;
  const emptyText = emptyTextProp ?? t.noResults;
  const [query, setQuery] = React21.useState("");
  const [active, setActive] = React21.useState(0);
  const listId = React21.useId();
  React21.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  React21.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);
  const q = query.toLowerCase();
  const results = commands.filter((c) => c.label.toLowerCase().includes(q));
  React21.useEffect(() => setActive(0), [query]);
  const run = (c) => {
    onOpenChange(false);
    c.onSelect();
  };
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { container: portalContainer, children: [
    /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "aria-describedby": void 0,
        className: "popup fixed top-[20%] left-1/2 z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden p-0",
        children: [
          /* @__PURE__ */ jsx(DialogPrimitive.Title, { className: "sr-only", children: t.commandPalette }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b border-line px-3", children: [
            /* @__PURE__ */ jsx(Search, { className: "size-4 text-subtle", "aria-hidden": true }),
            /* @__PURE__ */ jsx(
              "input",
              {
                role: "combobox",
                "aria-expanded": true,
                "aria-controls": listId,
                "aria-activedescendant": results[active] ? `${listId}-${active}` : void 0,
                "aria-label": t.command,
                autoFocus: true,
                placeholder,
                className: "h-11 flex-1 border-0 bg-transparent text-fg outline-none",
                value: query,
                onChange: (e) => setQuery(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, results.length - 1));
                  else if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
                  else if (e.key === "Enter" && results[active]) run(results[active]);
                  else return;
                  e.preventDefault();
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("ul", { id: listId, role: "listbox", className: "m-0 max-h-72 list-none overflow-auto p-1", children: [
            results.length === 0 && /* @__PURE__ */ jsx("li", { className: "px-3 py-2 text-sm text-muted", children: emptyText }),
            results.map((c, i) => /* @__PURE__ */ jsxs(
              "li",
              {
                id: `${listId}-${i}`,
                role: "option",
                "aria-selected": i === active,
                onMouseEnter: () => setActive(i),
                onClick: () => run(c),
                className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-muted", i === active && "bg-surface-hover text-fg"),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "flex-1", children: c.label }),
                  c.group && /* @__PURE__ */ jsx("span", { className: "text-xs text-subtle", children: c.group }),
                  c.shortcut && /* @__PURE__ */ jsx(Kbd, { children: c.shortcut })
                ]
              },
              c.id
            ))
          ] })
        ]
      }
    )
  ] }) });
}
function TreeTable({
  rows,
  columns,
  label
}) {
  const [open, setOpen] = React21.useState([]);
  const flat = [];
  const walk = (list, level) => list.forEach((row) => {
    flat.push({ row, level });
    if (row.children?.length && open.includes(row.id)) walk(row.children, level + 1);
  });
  walk(rows, 1);
  const toggle = (id) => setOpen((o) => o.includes(id) ? o.filter((x) => x !== id) : [...o, id]);
  return /* @__PURE__ */ jsx("div", { className: "table-wrap", children: /* @__PURE__ */ jsxs("table", { className: "table", role: "treegrid", "aria-label": label, children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((c) => /* @__PURE__ */ jsx("th", { children: c.header }, c.id)) }) }),
    /* @__PURE__ */ jsx("tbody", { children: flat.map(({ row, level }) => {
      const kids = !!row.children?.length;
      const isOpen = open.includes(row.id);
      return /* @__PURE__ */ jsx("tr", { "aria-level": level, "aria-expanded": kids ? isOpen : void 0, children: columns.map((c, ci) => /* @__PURE__ */ jsx("td", { children: ci === 0 ? (
        // dynamic depth indent
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", style: { paddingInlineStart: `${(level - 1) * 16}px` }, children: [
          kids ? /* @__PURE__ */ jsx("button", { type: "button", "aria-label": isOpen ? "Collapse" : "Expand", onClick: () => toggle(row.id), className: "flex size-4 items-center justify-center text-muted hover:text-fg", children: isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ jsx(ChevronRight, { className: "size-4", "aria-hidden": true }) }) : /* @__PURE__ */ jsx("span", { className: "size-4" }),
          c.cell(row.data)
        ] })
      ) : c.cell(row.data) }, c.id)) }, row.id);
    }) })
  ] }) });
}
function DiffView({ before, after, label, mode = "split" }) {
  const ops = React21.useMemo(() => diffLines(before, after), [before, after]);
  const wrap = "overflow-auto rounded-md border border-line bg-black/30 font-mono text-[0.8125rem]";
  if (mode === "unified")
    return /* @__PURE__ */ jsx("div", { role: "group", "aria-label": label, className: wrap, children: ops.map((op, i) => /* @__PURE__ */ jsxs("div", { className: cn("px-3 whitespace-pre", op.type === "del" && "bg-danger-bg text-danger", op.type === "add" && "bg-ok-bg text-ok"), children: [
      op.type === "del" ? "- " : op.type === "add" ? "+ " : "  ",
      op.text
    ] }, i)) });
  const rows = [];
  for (let i = 0; i < ops.length; ) {
    const op = ops[i];
    if (op.type === "same") {
      rows.push({ l: op.text, r: op.text, kind: "same" });
      i++;
      continue;
    }
    const dels = [];
    const adds = [];
    while (i < ops.length && ops[i].type !== "same") (ops[i].type === "del" ? dels : adds).push(ops[i++].text);
    for (let k = 0; k < Math.max(dels.length, adds.length); k++) rows.push({ l: dels[k], r: adds[k], kind: "change" });
  }
  return /* @__PURE__ */ jsx("div", { role: "group", "aria-label": label, className: wrap, children: rows.map((row, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 divide-x divide-line", children: [
    /* @__PURE__ */ jsx("div", { className: cn("px-3 whitespace-pre", row.kind === "change" && row.l !== void 0 && "bg-danger-bg text-danger"), children: row.l ?? "" }),
    /* @__PURE__ */ jsx("div", { className: cn("px-3 whitespace-pre", row.kind === "change" && row.r !== void 0 && "bg-ok-bg text-ok"), children: row.r ?? "" })
  ] }, i)) });
}
function MfaEnrolment({ qr, secret, recoveryCodes, onVerify, onRegisterPasskey, onComplete, labels }) {
  const { t: laf } = useLaf();
  const l = {
    method: laf.mfaMethod,
    scan: laf.mfaScan,
    verify: laf.mfaVerify,
    recovery: laf.mfaRecovery,
    totp: laf.mfaTotp,
    passkey: laf.mfaPasskey,
    next: laf.next,
    back: laf.back,
    finish: laf.finish,
    invalid: laf.mfaInvalid,
    passkeyWaiting: laf.mfaPasskeyWaiting,
    passkeyFailed: laf.mfaPasskeyFailed,
    stored: laf.mfaStored,
    manualSecret: laf.manualSecret,
    addedToApp: laf.addedToApp,
    ...labels
  };
  const [step, setStep] = React21.useState(0);
  const [method, setMethod] = React21.useState("totp");
  const [code, setCode] = React21.useState("");
  const [error, setError] = React21.useState();
  const [busy, setBusy] = React21.useState(false);
  const [stored, setStored] = React21.useState(false);
  const steps = [
    { id: "m", label: l.method },
    ...method === "totp" ? [
      { id: "s", label: l.scan },
      { id: "v", label: l.verify }
    ] : [{ id: "p", label: l.passkey }],
    { id: "r", label: l.recovery }
  ];
  const id = steps[step].id;
  const verify = async () => {
    setBusy(true);
    setError(void 0);
    try {
      if (await onVerify(code)) setStep(step + 1);
      else setError(l.invalid);
    } finally {
      setBusy(false);
    }
  };
  const register = async () => {
    setBusy(true);
    setError(void 0);
    try {
      await onRegisterPasskey?.();
      setStep(step + 1);
    } catch {
      setError(l.passkeyFailed);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-[13rem_1fr]", children: [
    /* @__PURE__ */ jsx(Stepper, { steps, current: step, onStepClick: (i) => setStep(i) }),
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      id === "m" && /* @__PURE__ */ jsx(
        RadioGroup,
        {
          name: "mfa-method",
          value: method,
          onValueChange: (v) => setMethod(v),
          "aria-label": l.method,
          options: [
            { value: "totp", label: l.totp },
            ...onRegisterPasskey ? [{ value: "passkey", label: l.passkey }] : []
          ]
        }
      ),
      id === "s" && /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto rounded-md bg-white p-3 text-black", children: qr }),
        /* @__PURE__ */ jsx(SecretDisplay, { label: l.manualSecret, value: secret, acknowledgeLabel: l.addedToApp })
      ] }),
      id === "v" && /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsx(OtpInput, { value: code, onChange: setCode, onComplete: () => void 0 }),
        error && /* @__PURE__ */ jsx("p", { className: "field-error", role: "alert", children: error })
      ] }),
      id === "p" && /* @__PURE__ */ jsxs("div", { className: "grid gap-3 text-sm text-muted", children: [
        /* @__PURE__ */ jsx(Fingerprint, { className: "mx-auto size-8 text-primary", "aria-hidden": true }),
        /* @__PURE__ */ jsx("p", { role: "status", className: "text-center", children: busy ? l.passkeyWaiting : "" }),
        error && /* @__PURE__ */ jsx("p", { className: "field-error text-center", role: "alert", children: error })
      ] }),
      id === "r" && /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsx("ul", { className: "m-0 grid list-none grid-cols-2 gap-2 p-0 font-mono text-sm text-fg", children: recoveryCodes.map((c) => /* @__PURE__ */ jsx("li", { className: "rounded-sm border border-line bg-muted-bg px-2 py-1", children: c }, c)) }),
        /* @__PURE__ */ jsxs("label", { className: "check text-sm", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: stored, onChange: (e) => setStored(e.target.checked) }),
          l.stored
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", disabled: step === 0 || busy, onClick: () => setStep(step - 1), children: l.back }),
        id === "v" ? /* @__PURE__ */ jsx(Button, { size: "sm", loading: busy, disabled: code.length < 6, onClick: verify, children: l.verify }) : id === "p" ? /* @__PURE__ */ jsx(Button, { size: "sm", loading: busy, leftIcon: /* @__PURE__ */ jsx(KeyRound, {}), onClick: register, children: l.passkey }) : id === "r" ? /* @__PURE__ */ jsx(Button, { size: "sm", disabled: !stored, onClick: onComplete, children: l.finish }) : /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => setStep(step + 1), children: l.next })
      ] })
    ] })
  ] });
}
var pad = (n) => String(n).padStart(2, "0");
var iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
function DatePicker({
  value,
  onChange,
  label: labelProp,
  placeholder: placeholderProp,
  min,
  max
}) {
  const { t: laf } = useLaf();
  const label = labelProp ?? laf.chooseDate;
  const placeholder = placeholderProp ?? laf.datePlaceholder;
  const [open, setOpen] = React21.useState(false);
  const base = value ? /* @__PURE__ */ new Date(`${value}T00:00:00`) : /* @__PURE__ */ new Date();
  const [view, setView] = React21.useState({ y: base.getFullYear(), m: base.getMonth() });
  const first = new Date(view.y, view.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((offset + days) / 7) * 7 }, (_, i) => i - offset + 1);
  const shift = (delta) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const title = first.toLocaleDateString(void 0, { month: "long", year: "numeric" });
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { type: "button", "aria-label": label, className: "input inline-flex w-44 items-center text-start font-mono", children: value ?? /* @__PURE__ */ jsx("span", { className: "text-muted", children: placeholder }) }) }),
    /* @__PURE__ */ jsxs(PopoverContent, { className: "w-64", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", "aria-label": laf.previousMonth, onClick: () => shift(-1), children: /* @__PURE__ */ jsx(ChevronLeft, { size: 14 }) }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", "aria-live": "polite", children: title }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", "aria-label": laf.nextMonth, onClick: () => shift(1), children: /* @__PURE__ */ jsx(ChevronRight, { size: 14 }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { role: "grid", "aria-label": title, className: "grid grid-cols-7 gap-0.5 text-center text-xs", children: [
        laf.weekdaysShort.map((d) => /* @__PURE__ */ jsx("span", { role: "columnheader", className: "py-1 text-muted", children: d }, d)),
        cells.map((d, i) => {
          if (d < 1 || d > days) return /* @__PURE__ */ jsx("span", { role: "gridcell" }, i);
          const v = iso(view.y, view.m, d);
          const disabled = min !== void 0 && v < min || max !== void 0 && v > max;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "gridcell",
              disabled,
              "aria-selected": v === value,
              "aria-label": v,
              onClick: () => {
                onChange(v);
                setOpen(false);
              },
              className: cn(
                "h-8 rounded-sm border-0 bg-transparent font-mono text-fg hover:bg-muted-bg disabled:opacity-40",
                v === value && "bg-primary text-primary-fg hover:bg-primary"
              ),
              children: d
            },
            i
          );
        })
      ] })
    ] })
  ] });
}
function StackedBarChart({
  data,
  series,
  label
}) {
  const max = Math.max(...data.map((d) => d.values.reduce((a, b) => a + b, 0)), 1);
  const tones = ["bg-primary", "bg-ok", "bg-warn", "bg-danger"];
  return /* @__PURE__ */ jsxs("figure", { "aria-label": label, className: "m-0 grid gap-2", children: [
    /* @__PURE__ */ jsx("ul", { className: "m-0 grid list-none gap-2 p-0", children: data.map((d) => /* @__PURE__ */ jsxs("li", { className: "grid grid-cols-[6rem_1fr] items-center gap-2 text-xs text-muted", children: [
      /* @__PURE__ */ jsx("span", { className: "truncate", children: d.name }),
      /* @__PURE__ */ jsx("span", { className: "flex h-3 overflow-hidden rounded-sm bg-muted-bg", children: d.values.map((v, i) => /* @__PURE__ */ jsx(
        "span",
        {
          title: `${series[i]}: ${v}`,
          className: cn("block h-full", tones[i % tones.length]),
          style: { width: `${v / max * 100}%` }
        },
        i
      )) })
    ] }, d.name)) }),
    /* @__PURE__ */ jsx("figcaption", { className: "flex gap-3 text-xs text-muted", children: series.map((s, i) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("span", { className: cn("size-2 rounded-sm", tones[i % tones.length]), "aria-hidden": true }),
      " ",
      s
    ] }, s)) })
  ] });
}
function Heatmap({
  rows,
  columns,
  values,
  label,
  max
}) {
  const top = max ?? Math.max(...values.flat(), 1);
  return /* @__PURE__ */ jsxs("div", { role: "table", "aria-label": label, className: "inline-grid gap-0.5 text-xs text-muted", style: { gridTemplateColumns: `6rem repeat(${columns.length}, 2rem)` }, children: [
    /* @__PURE__ */ jsx("span", {}),
    columns.map((c) => /* @__PURE__ */ jsx("span", { role: "columnheader", className: "text-center", children: c }, c)),
    rows.map((r, ri) => /* @__PURE__ */ jsxs(React21.Fragment, { children: [
      /* @__PURE__ */ jsx("span", { role: "rowheader", className: "truncate", children: r }),
      columns.map((c, ci) => {
        const v = values[ri]?.[ci] ?? 0;
        return /* @__PURE__ */ jsx(
          "span",
          {
            role: "cell",
            title: `${r} ${c}: ${v}`,
            "aria-label": `${r} ${c}: ${v}`,
            className: "h-6 rounded-sm bg-primary",
            style: { opacity: 0.1 + 0.9 * (v / top) }
          },
          c
        );
      })
    ] }, r))
  ] });
}
function OverflowTabs({
  tabs,
  maxVisible = 4,
  moreLabel: moreLabelProp,
  onSelect
}) {
  const { t: laf } = useLaf();
  const moreLabel = moreLabelProp ?? laf.moreTabs;
  const visible = tabs.slice(0, maxVisible);
  const rest = tabs.slice(maxVisible);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsx(TabsList, { children: visible.map((t) => /* @__PURE__ */ jsx(TabsTrigger, { value: t.value, children: t.label }, t.value)) }),
    rest.length > 0 && /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { type: "button", "aria-label": moreLabel, className: "ms-1 border-0 bg-transparent px-2 text-muted hover:text-fg", children: /* @__PURE__ */ jsx(MoreHorizontal, { size: 16 }) }) }),
      /* @__PURE__ */ jsx(DropdownMenuContent, { children: rest.map((t) => /* @__PURE__ */ jsx(DropdownMenuItem, { onSelect: () => onSelect(t.value), children: t.label }, t.value)) })
    ] })
  ] });
}
function DockedTaskPanel({
  tasks,
  onCancel,
  onRetry,
  title: titleProp,
  defaultOpen = false
}) {
  const { t: laf } = useLaf();
  const title = titleProp ?? laf.recentTasks;
  const [open, setOpen] = React21.useState(defaultOpen);
  const running = tasks.filter((t) => t.status === "running").length;
  return /* @__PURE__ */ jsxs("section", { "aria-label": title, className: "absolute inset-x-0 bottom-0 border-t border-line bg-surface", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-expanded": open,
        onClick: () => setOpen((o) => !o),
        className: "flex w-full items-center gap-2 border-0 bg-transparent px-4 py-2 text-start text-sm font-medium text-fg",
        children: [
          open ? /* @__PURE__ */ jsx(ChevronDown, { size: 14 }) : /* @__PURE__ */ jsx(ChevronUp, { size: 14 }),
          title,
          /* @__PURE__ */ jsxs("span", { className: "ms-auto text-xs font-normal text-muted", "aria-live": "polite", children: [
            running,
            " running"
          ] })
        ]
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "max-h-64 overflow-auto", children: /* @__PURE__ */ jsx(TaskPanel, { tasks, onCancel, onRetry }) })
  ] });
}
function TopologyGraph({
  nodes,
  edges,
  label,
  width = 480,
  height = 240,
  onSelect,
  selectedId
}) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const tone = { ok: "stroke-ok", warn: "stroke-warn", danger: "stroke-danger" };
  return /* @__PURE__ */ jsxs("svg", { role: "group", "aria-label": label, viewBox: `0 0 ${width} ${height}`, className: "h-auto w-full max-w-2xl rounded-lg border border-line bg-surface", children: [
    edges.map((e) => {
      const a = byId.get(e.from);
      const b = byId.get(e.to);
      if (!a || !b) return null;
      return /* @__PURE__ */ jsx("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, className: "stroke-line", strokeWidth: 1.5 }, `${e.from}-${e.to}`);
    }),
    nodes.map((n) => /* @__PURE__ */ jsxs(
      "g",
      {
        role: "button",
        tabIndex: 0,
        "aria-label": n.label,
        "aria-pressed": selectedId === n.id,
        onClick: () => onSelect?.(n.id),
        onKeyDown: (ev) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            onSelect?.(n.id);
          }
        },
        className: "cursor-pointer outline-none [&:focus-visible>rect]:stroke-primary",
        children: [
          /* @__PURE__ */ jsx(
            "rect",
            {
              x: n.x - 40,
              y: n.y - 14,
              width: 80,
              height: 28,
              rx: 3,
              strokeWidth: selectedId === n.id ? 2 : 1.5,
              className: cn("fill-muted-bg", n.tone ? tone[n.tone] : "stroke-line")
            }
          ),
          /* @__PURE__ */ jsx("text", { x: n.x, y: n.y + 4, textAnchor: "middle", className: "fill-fg font-mono text-[11px]", children: n.label })
        ]
      },
      n.id
    ))
  ] });
}
var rules = {
  json: [
    [/"(?:[^"\\]|\\.)*"(?=\s*:)/y, "text-primary"],
    [/"(?:[^"\\]|\\.)*"/y, "text-ok"],
    [/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/y, "text-warn"],
    [/\b(?:true|false|null)\b/y, "text-danger"]
  ],
  yaml: [
    [/#.*/y, "text-muted"],
    [/[\w.-]+(?=\s*:)/y, "text-primary"],
    [/"(?:[^"\\]|\\.)*"|'[^']*'/y, "text-ok"],
    [/-?\d+(?:\.\d+)?\b/y, "text-warn"],
    [/\b(?:true|false|null)\b/y, "text-danger"]
  ]
};
function highlight(code, language) {
  const out = [];
  let plain = "";
  let i = 0;
  while (i < code.length) {
    let hit;
    for (const [re, cls] of rules[language] ?? []) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m[0].length > 0) {
        hit = { text: m[0], cls };
        break;
      }
    }
    if (hit) {
      if (plain) out.push({ text: plain });
      plain = "";
      out.push(hit);
      i += hit.text.length;
    } else {
      plain += code.charAt(i++);
    }
  }
  if (plain) out.push({ text: plain });
  return out;
}
function CodeEditor({
  value,
  onChange,
  language = "json",
  label,
  rows = 10
}) {
  const layer = "m-0 whitespace-pre-wrap break-words p-3 font-mono text-sm leading-5";
  const height = { minHeight: `${rows * 1.25}rem` };
  return /* @__PURE__ */ jsxs("div", { className: "relative rounded-md border border-line bg-surface focus-within:border-primary", children: [
    /* @__PURE__ */ jsxs("pre", { "aria-hidden": true, className: cn(layer, "pointer-events-none"), style: height, children: [
      highlight(value, language).map((t, i) => /* @__PURE__ */ jsx("span", { className: t.cls, children: t.text }, i)),
      "\n"
    ] }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        "aria-label": label,
        spellCheck: false,
        value,
        onChange: (e) => onChange(e.target.value),
        className: cn(layer, "absolute inset-0 size-full resize-none border-0 bg-transparent text-transparent caret-fg outline-none")
      }
    )
  ] });
}
function Tip({ content, children }) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Provider, { delayDuration: 400, children: /* @__PURE__ */ jsxs(TooltipPrimitive.Root, { children: [
    /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
      TooltipPrimitive.Content,
      {
        sideOffset: 6,
        className: "z-60 rounded-md border border-line-strong bg-menu px-2 py-1 text-xs text-fg shadow-[0_16px_32px_rgba(0,0,0,0.5)]",
        children: content
      }
    ) })
  ] }) });
}
var isGroup = (o) => "options" in o;
function SelectItem({ o }) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      value: o.value,
      disabled: o.disabled,
      textValue: typeof o.label === "string" ? o.label : void 0,
      className: "dropdown-item outline-none data-[disabled]:opacity-50 data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg",
      children: [
        o.icon,
        /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children: o.label }),
          o.description && /* @__PURE__ */ jsx("span", { className: "block text-xs text-muted", children: o.description })
        ] }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4", "aria-hidden": true }) })
      ]
    }
  );
}
function SelectMenu({
  options,
  value,
  defaultValue: defaultValue2,
  onValueChange,
  placeholder,
  invalid,
  disabled,
  name,
  id,
  className,
  "aria-label": ariaLabel
}) {
  return /* @__PURE__ */ jsxs(SelectPrimitive.Root, { value, defaultValue: defaultValue2, onValueChange, disabled, name, children: [
    /* @__PURE__ */ jsxs(
      SelectPrimitive.Trigger,
      {
        id,
        "aria-label": ariaLabel,
        "aria-invalid": invalid || void 0,
        className: cn("form-input flex items-center justify-between gap-2 text-start", invalid && "error", className),
        children: [
          /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: /* @__PURE__ */ jsx(SelectPrimitive.Value, { placeholder }) }),
          /* @__PURE__ */ jsx(SelectPrimitive.Icon, { children: /* @__PURE__ */ jsx(ChevronDown, { className: "size-4 text-muted", "aria-hidden": true }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
      SelectPrimitive.Content,
      {
        position: "popper",
        sideOffset: 4,
        className: "dropdown-menu relative! top-auto! left-auto! z-60 max-h-72 min-w-(--radix-select-trigger-width) overflow-auto",
        children: /* @__PURE__ */ jsx(SelectPrimitive.Viewport, { children: options.map(
          (o, i) => isGroup(o) ? /* @__PURE__ */ jsxs(SelectPrimitive.Group, { children: [
            /* @__PURE__ */ jsx(SelectPrimitive.Label, { className: "dropdown-label", children: o.label }),
            o.options.map((c) => /* @__PURE__ */ jsx(SelectItem, { o: c }, c.value))
          ] }, `${o.label}-${i}`) : /* @__PURE__ */ jsx(SelectItem, { o }, o.value)
        ) })
      }
    ) })
  ] });
}
function SegmentedControl(props) {
  const { items, className, disabled, "aria-label": ariaLabel } = props;
  const common = {
    "aria-label": ariaLabel,
    disabled,
    className: cn("inline-flex h-8 items-stretch rounded-md border border-line", className)
  };
  const children = items.map((it) => /* @__PURE__ */ jsxs(
    ToggleGroupPrimitive.Item,
    {
      value: it.value,
      disabled: it.disabled,
      "aria-label": it["aria-label"],
      className: "inline-flex items-center gap-1.5 border-s border-line px-3 text-sm text-muted outline-none first:border-s-0 first:rounded-s-md last:rounded-e-md hover:text-fg focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 data-[state=on]:bg-primary-light data-[state=on]:text-primary",
      children: [
        it.icon,
        it.label
      ]
    },
    it.value
  ));
  if (props.type === "multiple") {
    return /* @__PURE__ */ jsx(ToggleGroupPrimitive.Root, { type: "multiple", value: props.value, defaultValue: props.defaultValue, onValueChange: props.onValueChange, ...common, children });
  }
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Root,
    {
      type: "single",
      value: props.value,
      defaultValue: props.defaultValue,
      onValueChange: (v) => v && props.onValueChange?.(v),
      ...common,
      children
    }
  );
}
function IconButton({ label, icon, className, ...props }) {
  return /* @__PURE__ */ jsx(Tip, { content: label, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", "aria-label": label, className: cn("px-0", props.size === "sm" ? "w-7" : "w-8", className), ...props, children: /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "inline-flex", children: icon }) }) });
}
var dotTone = {
  ok: "bg-ok",
  warn: "bg-warn",
  danger: "bg-danger",
  neutral: "bg-muted",
  primary: "bg-primary"
};
function StatusDot({
  tone = "neutral",
  pulse,
  label,
  srOnly,
  className
}) {
  return /* @__PURE__ */ jsxs("span", { className: cn("inline-flex items-center gap-1.5 text-sm", className), children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": true,
        className: cn("inline-block size-2 shrink-0 rounded-xs", dotTone[tone], pulse && "animate-pulse motion-reduce:animate-none")
      }
    ),
    /* @__PURE__ */ jsx("span", { className: cn(srOnly && "sr-only"), children: label })
  ] });
}
var tickListeners = /* @__PURE__ */ new Set();
var tickTimer;
var tickNow = 0;
function subscribeTick(fn) {
  tickListeners.add(fn);
  if (!tickTimer) {
    tickTimer = setInterval(() => {
      tickNow = Date.now();
      tickListeners.forEach((l) => l());
    }, 3e4);
  }
  return () => {
    tickListeners.delete(fn);
    if (!tickListeners.size && tickTimer) {
      clearInterval(tickTimer);
      tickTimer = void 0;
    }
  };
}
var getTick = () => tickNow ||= Date.now();
var relUnits = [
  ["year", 31536e3],
  ["month", 2592e3],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1]
];
function formatRelative(date, now, locale) {
  const diff = Math.round((date.getTime() - now) / 1e3);
  const abs = Math.abs(diff);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (abs < 45) return rtf.format(0, "second");
  const [unit, secs] = relUnits.find(([, s]) => abs >= s) ?? relUnits[relUnits.length - 1];
  return rtf.format(Math.round(diff / secs), unit);
}
function RelativeTime({ value, className }) {
  const { locale } = useLaf();
  const now = React21.useSyncExternalStore(subscribeTick, getTick, getTick);
  const date = new Date(value);
  const local = date.toLocaleString(locale);
  const utc = date.toLocaleString(locale, { timeZone: "UTC", timeZoneName: "short" });
  return /* @__PURE__ */ jsx(
    Tip,
    {
      content: /* @__PURE__ */ jsxs("span", { className: "grid gap-0.5", children: [
        /* @__PURE__ */ jsx("span", { children: local }),
        /* @__PURE__ */ jsx("span", { className: "text-muted", children: utc })
      ] }),
      children: /* @__PURE__ */ jsx("time", { dateTime: date.toISOString(), className, children: formatRelative(date, now, locale) })
    }
  );
}
function ButtonGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "group",
      className: cn(
        "inline-flex items-stretch [&>*:not(:first-child)]:-ms-px [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none",
        className
      ),
      ...props
    }
  );
}
function SplitButton({
  children,
  onClick,
  variant = "primary",
  size,
  disabled,
  menuLabel = "More actions",
  menu,
  className
}) {
  return /* @__PURE__ */ jsxs(ButtonGroup, { className, children: [
    /* @__PURE__ */ jsx(Button, { variant, size, disabled, onClick, children }),
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant, size, disabled, "aria-label": menuLabel, className: "px-2", children: /* @__PURE__ */ jsx(ChevronDown, { "aria-hidden": true }) }) }),
      /* @__PURE__ */ jsx(DropdownMenuContent, { children: menu })
    ] })
  ] });
}
function AvatarGroup({
  users,
  max = 4,
  size = "md",
  className
}) {
  const shown = users.slice(0, max);
  const rest = users.slice(max);
  const ring = "ring-2 ring-surface";
  return /* @__PURE__ */ jsxs("div", { role: "group", "aria-label": users.map((u) => u.name).join(", "), className: cn("flex items-center", className), children: [
    shown.map((u, i) => /* @__PURE__ */ jsx(Avatar, { name: u.name, src: u.src, size, className: cn(ring, i > 0 && "-ms-2") }, `${u.name}-${i}`)),
    rest.length > 0 && /* @__PURE__ */ jsx(Tip, { content: rest.map((u) => u.name).join(", "), children: /* @__PURE__ */ jsxs(
      "span",
      {
        tabIndex: 0,
        "aria-label": `+${rest.length}`,
        className: cn("avatar -ms-2 outline-none focus-visible:ring-primary", ring, size === "sm" ? "size-5 text-[0.625rem]" : size === "lg" ? "size-10 text-base" : ""),
        children: [
          "+",
          rest.length
        ]
      }
    ) })
  ] });
}
var contentCls = "dropdown-menu relative! top-auto! left-auto! z-50 min-w-48";
var itemCls = "dropdown-item cursor-default outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
function MenuShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx(Kbd, { className: cn("ms-auto", className), ...props });
}
function disabledProps(d) {
  return d ? { disabled: true, title: typeof d === "string" ? d : void 0 } : {};
}
function renderItems(P, items) {
  const X8 = P;
  return items.map((it, i) => {
    const key = "id" in it && it.id || `${it.type}-${i}`;
    switch (it.type) {
      case "separator":
        return /* @__PURE__ */ jsx(X8.Separator, { className: "dropdown-sep" }, key);
      case "label":
        return /* @__PURE__ */ jsx(X8.Label, { className: "dropdown-label", children: it.label }, key);
      case "checkbox":
        return /* @__PURE__ */ jsxs(X8.CheckboxItem, { className: cn(itemCls, "relative ps-8"), checked: it.checked, onCheckedChange: it.onCheckedChange, ...disabledProps(it.disabled), children: [
          /* @__PURE__ */ jsx(X8.ItemIndicator, { className: "absolute start-3 inline-flex", children: /* @__PURE__ */ jsx(Check, { className: "size-3.5", "aria-hidden": true }) }),
          it.label
        ] }, key);
      case "radio":
        return /* @__PURE__ */ jsx(X8.RadioGroup, { value: it.value, onValueChange: it.onValueChange, children: it.options.map((o) => /* @__PURE__ */ jsxs(X8.RadioItem, { value: o.value, className: cn(itemCls, "relative ps-8"), children: [
          /* @__PURE__ */ jsx(X8.ItemIndicator, { className: "absolute start-3.5 inline-flex", children: /* @__PURE__ */ jsx(Circle, { className: "size-2 fill-current", "aria-hidden": true }) }),
          o.label
        ] }, o.value)) }, key);
      case "submenu":
        return /* @__PURE__ */ jsxs(X8.Sub, { children: [
          /* @__PURE__ */ jsxs(X8.SubTrigger, { className: itemCls, ...disabledProps(it.disabled), children: [
            it.icon,
            it.label,
            /* @__PURE__ */ jsx(ChevronRight, { className: "ms-auto size-3.5 rtl:rotate-180", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsx(X8.Portal, { children: /* @__PURE__ */ jsx(X8.SubContent, { sideOffset: 2, alignOffset: -4, className: contentCls, children: renderItems(P, it.items) }) })
        ] }, key);
      default:
        return /* @__PURE__ */ jsxs(X8.Item, { className: cn(itemCls, it.danger && "danger"), onSelect: () => it.onSelect(), ...disabledProps(it.disabled), children: [
          it.icon,
          it.label,
          it.shortcut && /* @__PURE__ */ jsx(MenuShortcut, { children: it.shortcut })
        ] }, key);
    }
  });
}
function Menu({
  items,
  trigger,
  align = "end",
  open,
  onOpenChange
}) {
  return /* @__PURE__ */ jsxs(DropdownPrimitive3.Root, { open, onOpenChange, children: [
    /* @__PURE__ */ jsx(DropdownPrimitive3.Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx(DropdownPrimitive3.Portal, { children: /* @__PURE__ */ jsx(DropdownPrimitive3.Content, { align, sideOffset: 4, collisionPadding: 8, className: contentCls, children: renderItems(DropdownPrimitive3, items) }) })
  ] });
}
function ContextMenuFor({ items, children, disabled }) {
  return /* @__PURE__ */ jsxs(ContextPrimitive.Root, { children: [
    /* @__PURE__ */ jsx(ContextPrimitive.Trigger, { asChild: true, disabled, children }),
    /* @__PURE__ */ jsx(ContextPrimitive.Portal, { children: /* @__PURE__ */ jsx(ContextPrimitive.Content, { collisionPadding: 8, className: contentCls, children: renderItems(ContextPrimitive, items) }) })
  ] });
}
function useUnsavedChangesGuard(dirty) {
  const [queued, setQueued] = React21.useState(null);
  React21.useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);
  const guard = React21.useCallback(
    (action) => {
      if (!dirty) {
        action();
        return true;
      }
      setQueued(() => action);
      return false;
    },
    [dirty]
  );
  const confirm = React21.useCallback(() => {
    const action = queued;
    setQueued(null);
    action?.();
  }, [queued]);
  const cancel = React21.useCallback(() => setQueued(null), []);
  return { pending: queued !== null, dirty, guard, confirm, cancel };
}
function UnsavedChangesDialog({
  guard,
  title = "Discard unsaved changes?",
  description = "You have changes that have not been saved. If you leave now they will be lost.",
  confirmLabel = "Discard changes",
  cancelLabel = "Keep editing"
}) {
  return /* @__PURE__ */ jsx(
    ConfirmDialog,
    {
      open: guard.pending,
      onOpenChange: (o) => !o && guard.cancel(),
      title,
      description,
      confirmLabel,
      cancelLabel,
      onConfirm: guard.confirm
    }
  );
}
function FormSection({
  title,
  description,
  columns = 2,
  children,
  className
}) {
  const id = React21.useId();
  return /* @__PURE__ */ jsxs("section", { "aria-labelledby": `${id}-t`, className: cn("grid gap-4 border-b border-line py-6 first:pt-0 last:border-b-0", className), children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { id: `${id}-t`, className: "text-base font-semibold text-fg", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-muted", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: cn("grid grid-cols-1 gap-4", columns === 2 && "md:grid-cols-2"), children })
  ] });
}
function FormFooter({
  onCancel,
  onSave,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  pending,
  dirty,
  guard,
  saveType = "button",
  sticky = true,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-2 border-t border-line bg-bg px-4 py-3",
        sticky && "sticky bottom-0 z-10",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1 text-sm text-muted", role: "status", children }),
        onCancel && /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: () => guard ? guard.guard(onCancel) : onCancel(), children: cancelLabel }),
        /* @__PURE__ */ jsx(Button, { type: saveType, onClick: onSave, loading: pending, disabled: dirty === false, children: saveLabel })
      ]
    }
  );
}
function TopBar({
  logo,
  search,
  counters,
  notifications,
  userMenu,
  start,
  className
}) {
  return /* @__PURE__ */ jsxs("header", { className: cn("flex h-12 items-center gap-3 border-b border-line bg-surface px-3", className), children: [
    start,
    logo && /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center font-semibold text-fg", children: logo }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto flex min-w-0 max-w-xl flex-1 items-center", children: search }),
    /* @__PURE__ */ jsxs("div", { className: "ms-auto flex items-center gap-1", children: [
      counters?.map((c) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: c.onClick,
          "aria-label": `${c.label}: ${c.count}`,
          className: "btn btn-ghost btn-sm gap-1.5",
          children: [
            c.icon,
            /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: c.count })
          ]
        },
        c.id
      )),
      notifications,
      userMenu
    ] })
  ] });
}
function DetailPage({
  breadcrumb,
  icon,
  title,
  status,
  actions,
  tabs,
  side,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("grid gap-4", className), children: [
    breadcrumb && /* @__PURE__ */ jsx(Breadcrumb, { items: breadcrumb }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      icon,
      /* @__PURE__ */ jsx("h1", { className: "min-w-0 text-xl font-semibold text-fg", children: title }),
      status,
      actions && /* @__PURE__ */ jsx("div", { className: "ms-auto flex items-center gap-2", children: actions })
    ] }),
    tabs,
    /* @__PURE__ */ jsxs("div", { className: cn("grid gap-4", side && "lg:grid-cols-[minmax(0,1fr)_20rem]"), children: [
      /* @__PURE__ */ jsx("div", { className: "min-w-0", children }),
      side && /* @__PURE__ */ jsx("aside", { className: "min-w-0", children: side })
    ] })
  ] });
}
function FormPage({
  breadcrumb,
  title,
  description,
  onSubmit,
  footer,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("mx-auto grid w-full max-w-3xl gap-4", className), children: [
    breadcrumb && /* @__PURE__ */ jsx(Breadcrumb, { items: breadcrumb }),
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-fg", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted", children: description })
    ] }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        noValidate: true,
        onSubmit: (e) => {
          e.preventDefault();
          onSubmit?.(e);
        },
        children: [
          children,
          footer
        ]
      }
    )
  ] });
}
function SubNav({
  groups,
  value,
  onSelect,
  label = "Section navigation",
  className
}) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": label, className: cn("grid w-56 gap-4 text-sm", className), children: groups.map((g) => /* @__PURE__ */ jsxs("div", { role: "group", "aria-label": g.label, children: [
    g.label && /* @__PURE__ */ jsx("div", { className: "mb-1 px-2 text-[0.6875rem] tracking-wider text-subtle uppercase", "aria-hidden": true, children: g.label }),
    /* @__PURE__ */ jsx("ul", { className: "grid gap-0.5", children: g.items.map((it) => {
      const cls = cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-start text-muted hover:bg-hover hover:text-fg aria-[current=page]:bg-hover aria-[current=page]:text-fg",
        it.disabled && "pointer-events-none opacity-50"
      );
      const current = value === it.id ? "page" : void 0;
      return /* @__PURE__ */ jsx("li", { children: it.href ? /* @__PURE__ */ jsxs(
        "a",
        {
          href: it.href,
          "aria-current": current,
          className: cls,
          onClick: (e) => {
            if (onSelect) {
              e.preventDefault();
              onSelect(it.id);
            }
          },
          children: [
            it.icon,
            it.label
          ]
        }
      ) : /* @__PURE__ */ jsxs("button", { type: "button", "aria-current": current, disabled: it.disabled, className: cls, onClick: () => onSelect?.(it.id), children: [
        it.icon,
        it.label
      ] }) }, it.id);
    }) })
  ] }, g.id)) });
}
function MobileNav({
  children,
  title = "Navigation",
  triggerLabel = "Open navigation",
  open,
  onOpenChange,
  className
}) {
  return /* @__PURE__ */ jsxs(Drawer, { open, onOpenChange, children: [
    /* @__PURE__ */ jsx(DrawerTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { type: "button", "aria-label": triggerLabel, className: cn("btn btn-ghost btn-sm min-[860px]:hidden", className), children: /* @__PURE__ */ jsx(Menu$1, { "aria-hidden": true }) }) }),
    /* @__PURE__ */ jsx(DrawerContent, { title, width: "sm", children })
  ] });
}
var defaultLabels = {
  back: "Back",
  next: "Next",
  finish: "Finish",
  skip: "Skip",
  cancel: "Cancel",
  optional: "optional",
  steps: "Steps"
};
function Wizard({
  steps,
  onFinish,
  onCancel,
  dirty,
  title = "Wizard",
  mode = "page",
  open,
  onOpenChange,
  current: currentProp,
  defaultCurrent = 0,
  onCurrentChange,
  labels: labelsProp,
  className
}) {
  const labels = { ...defaultLabels, ...labelsProp };
  const [current, setCurrent] = useControllableState({ value: currentProp, defaultValue: defaultCurrent, onChange: onCurrentChange });
  const [errors, setErrors] = React21.useState([]);
  const [failed, setFailed] = React21.useState({});
  const [busy, setBusy] = React21.useState(false);
  const guard = useUnsavedChangesGuard(!!dirty);
  const headingRef = React21.useRef(null);
  const mounted = React21.useRef(false);
  const errId = React21.useId();
  const step = steps[current];
  const last = current === steps.length - 1;
  React21.useEffect(() => {
    if (mounted.current) headingRef.current?.focus();
    mounted.current = true;
  }, [current]);
  const goTo = (i) => {
    setErrors([]);
    setCurrent(i);
  };
  const validate = async () => {
    const result = await step.validate?.() ?? [];
    setFailed((f) => ({ ...f, [step.id]: result.length > 0 }));
    setErrors(result);
    return result.length === 0;
  };
  const advance = async (skip = false) => {
    if (busy) return;
    if (!skip) {
      setBusy(true);
      try {
        if (!await validate()) return;
      } finally {
        setBusy(false);
      }
    } else {
      setErrors([]);
    }
    if (last) {
      setBusy(true);
      try {
        await onFinish();
      } finally {
        setBusy(false);
      }
    } else goTo(current + 1);
  };
  const cancel = () => guard.guard(() => {
    onCancel?.();
    onOpenChange?.(false);
  });
  const body = /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("grid gap-5 md:grid-cols-[14rem_minmax(0,1fr)]", className),
      onKeyDown: (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          void advance();
        }
      },
      children: [
        /* @__PURE__ */ jsx("nav", { "aria-label": labels.steps, children: /* @__PURE__ */ jsx(
          Stepper,
          {
            current,
            onStepClick: goTo,
            steps: steps.map((s) => ({
              id: s.id,
              label: s.optional ? /* @__PURE__ */ jsxs(Fragment, { children: [
                s.label,
                " ",
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-subtle", children: [
                  "(",
                  labels.optional,
                  ")"
                ] })
              ] }) : s.label,
              error: failed[s.id]
            }))
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "grid min-w-0 content-start gap-4", children: [
          /* @__PURE__ */ jsx("h2", { ref: headingRef, tabIndex: -1, className: "text-base font-semibold text-fg outline-none", children: step.label }),
          /* @__PURE__ */ jsx("div", { role: "alert", id: errId, children: errors.length > 0 && /* @__PURE__ */ jsx("ul", { className: "list-disc ps-5 text-sm text-danger", children: errors.map((m) => /* @__PURE__ */ jsx("li", { children: m }, m)) }) }),
          /* @__PURE__ */ jsx("div", { children: step.render() }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-t border-line pt-4", children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: cancel, children: labels.cancel }),
            /* @__PURE__ */ jsxs("div", { className: "ms-auto flex gap-2", children: [
              /* @__PURE__ */ jsx(Button, { variant: "secondary", disabled: current === 0 || busy, onClick: () => goTo(current - 1), children: labels.back }),
              step.optional && !last && /* @__PURE__ */ jsx(Button, { variant: "secondary", disabled: busy, onClick: () => void advance(true), children: labels.skip }),
              /* @__PURE__ */ jsx(Button, { loading: busy, onClick: () => void advance(), children: last ? labels.finish : labels.next })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(UnsavedChangesDialog, { guard })
      ]
    }
  );
  if (mode === "dialog") {
    return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: (o) => o ? onOpenChange?.(true) : cancel(), children: /* @__PURE__ */ jsx(DialogContent, { title, className: "w-[min(56rem,95vw)]", children: body }) });
  }
  return /* @__PURE__ */ jsx("section", { "aria-label": title, children: body });
}
function WizardReview({
  items,
  className
}) {
  return /* @__PURE__ */ jsx(DefinitionList, { items, className });
}
var defaults = {
  "403": { icon: /* @__PURE__ */ jsx(LockKeyhole, {}), title: "Access denied", description: "You don't have permission to view this page." },
  "404": { icon: /* @__PURE__ */ jsx(FileQuestion, {}), title: "Page not found", description: "The page you are looking for doesn't exist or was moved." },
  "500": { icon: /* @__PURE__ */ jsx(ServerCrash, {}), title: "Something went wrong", description: "An unexpected error occurred. Try again in a moment." },
  offline: { icon: /* @__PURE__ */ jsx(WifiOff, {}), title: "You are offline", description: "Check your connection and try again." },
  "session-expired": { icon: /* @__PURE__ */ jsx(TimerOff, {}), title: "Session expired", description: "Sign in again to continue." }
};
function ErrorPage({
  variant,
  title,
  description,
  action,
  requestId,
  requestIdLabel = "Request ID",
  className
}) {
  const d = defaults[variant];
  const critical = variant === "500" || variant === "offline";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: critical ? "alert" : void 0,
      "data-variant": variant,
      className: cn("mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-16 text-center", className),
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-subtle [&>svg]:size-10", "aria-hidden": true, children: d.icon }),
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-fg", children: title ?? d.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted", children: description ?? d.description }),
        action,
        requestId && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs text-subtle", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            requestIdLabel,
            ":"
          ] }),
          /* @__PURE__ */ jsx("code", { className: "font-mono", children: requestId }),
          /* @__PURE__ */ jsx(CopyButton, { value: requestId, label: `Copy ${requestIdLabel}` })
        ] })
      ]
    }
  );
}
var LafErrorBoundary = class extends React21.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    this.props.onError?.(error, info);
  }
  componentDidUpdate(prev) {
    const a = prev.resetKeys ?? [];
    const b = this.props.resetKeys ?? [];
    if (this.state.error && (a.length !== b.length || a.some((v, i) => !Object.is(v, b[i])))) this.reset();
  }
  reset = () => {
    this.props.onReset?.();
    this.setState({ error: null });
  };
  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(error, this.reset);
    return /* @__PURE__ */ jsx(
      ErrorPage,
      {
        variant: "500",
        requestId: this.props.requestId?.(error),
        action: /* @__PURE__ */ jsx(Button, { onClick: this.reset, children: this.props.retryLabel ?? "Try again" })
      }
    );
  }
};
var baseKinds = {
  datacenter: Building2,
  cluster: Boxes,
  host: Server,
  vm: Monitor,
  template: Copy,
  vapp: Package,
  folder: Folder,
  "resource-pool": Layers,
  datastore: Database,
  "datastore-cluster": HardDrive,
  network: Network,
  dvswitch: Router,
  portgroup: Waypoints,
  snapshot: Camera,
  user: User,
  group: Users,
  client: AppWindow,
  issue: CircleDot,
  project: FolderKanban
};
var custom = /* @__PURE__ */ new Map();
function registerObjectKind(kind, icon) {
  custom.set(kind, icon);
}
var stateGlyph = {
  on: { Icon: Play, tone: "text-ok", text: "stateOn" },
  off: { Icon: Square, tone: "text-subtle", text: "stateOff" },
  suspended: { Icon: Pause, tone: "text-warn", text: "stateSuspended" },
  maintenance: { Icon: Wrench, tone: "text-primary", text: "stateMaintenance" },
  disconnected: { Icon: Unplug, tone: "text-muted", text: "stateDisconnected" },
  warning: { Icon: TriangleAlert, tone: "text-warn", text: "stateWarning" },
  error: { Icon: CircleX, tone: "text-danger", text: "stateError" }
};
function ObjectIcon({ kind, state, size = 16, label, className }) {
  const { t } = useLaf();
  const Icon2 = custom.get(kind) ?? baseKinds[kind] ?? Cable;
  const glyph = state ? stateGlyph[state] : void 0;
  const stateText = glyph ? t[glyph.text] : void 0;
  const name = [label, stateText].filter(Boolean).join(", ");
  const px = size === 20 ? 20 : 16;
  const badge = Math.round(px * 0.55);
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "data-kind": kind,
      "data-state": state,
      role: name ? "img" : void 0,
      "aria-label": name || void 0,
      "aria-hidden": name ? void 0 : true,
      className: cn("relative inline-flex shrink-0 items-center justify-center text-muted", className),
      style: { width: px, height: px },
      children: [
        /* @__PURE__ */ jsx(Icon2, { width: px, height: px, "aria-hidden": true }),
        glyph && /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "absolute -end-1 -bottom-1 inline-flex rounded-xs bg-menu leading-none", children: /* @__PURE__ */ jsx(glyph.Icon, { width: badge, height: badge, className: glyph.tone, fill: state === "on" ? "currentColor" : "none" }) })
      ]
    }
  );
}
var KEY_RE = /^[A-Za-z_][\w.-]*:/;
var OP_RE = /^(>=|<=|>|<)/;
var isWs = (c) => c !== void 0 && /\s/.test(c);
function readQuoted(s, start) {
  let out = "";
  let i = start + 1;
  while (i < s.length) {
    const c = s[i];
    if (c === "\\" && (s[i + 1] === '"' || s[i + 1] === "\\")) {
      out += s[i + 1];
      i += 2;
    } else if (c === '"') return [out, i + 1];
    else {
      out += c;
      i++;
    }
  }
  return [out, i];
}
function parseFilter(input) {
  const tokens = [];
  const n = input.length;
  let i = 0;
  while (i < n) {
    while (i < n && isWs(input[i])) i++;
    if (i >= n) break;
    const begin = i;
    let negated = false;
    if (input[i] === "-" && i + 1 < n && !isWs(input[i + 1])) {
      negated = true;
      i++;
    }
    const km = KEY_RE.exec(input.slice(i));
    if (km) {
      const key = km[0].slice(0, -1);
      let j = i + km[0].length;
      const om = OP_RE.exec(input.slice(j));
      const op = om ? om[0] : ":";
      if (om) j += om[0].length;
      const values = [];
      for (; ; ) {
        if (input[j] === '"') {
          const [v, next] = readQuoted(input, j);
          values.push(v);
          j = next;
        } else {
          const s = j;
          while (j < n && !isWs(input[j]) && input[j] !== ",") j++;
          if (j > s) values.push(input.slice(s, j));
        }
        if (input[j] === ",") j++;
        else break;
      }
      if (values.length > 0) {
        tokens.push({ type: "field", key, op, values, negated });
        i = j;
        continue;
      }
    }
    i = begin;
    if (input[i] === "-" && negated) i++;
    if (input[i] === '"') {
      const [v, next] = readQuoted(input, i);
      i = next;
      tokens.push({ type: "text", value: v, negated });
    } else {
      while (i < n && !isWs(input[i])) i++;
      const raw = input.slice(begin, i);
      tokens.push({ type: "text", value: negated ? raw.slice(1) : raw, negated });
    }
  }
  return {
    tokens,
    filters: tokens.filter((t) => t.type === "field").map(({ type: _t, ...f }) => f),
    text: tokens.filter((t) => t.type === "text").map(({ type: _t, ...x }) => x)
  };
}
var quote = (v) => `"${v.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
function serializeValue(v) {
  return v === "" || /[\s,"\\]/.test(v) || /^[<>]/.test(v) ? quote(v) : v;
}
function serializeText(t) {
  const v = t.value;
  const needs = v === "" || /[\s"\\]/.test(v) || KEY_RE.test(v) || !t.negated && v.startsWith("-");
  return (t.negated ? "-" : "") + (needs ? quote(v) : v);
}
function serializeToken(t) {
  if ("key" in t) {
    return `${t.negated ? "-" : ""}${t.key}:${t.op === ":" ? "" : t.op}${t.values.map(serializeValue).join(",")}`;
  }
  return serializeText(t);
}
function serializeFilter(input, text) {
  const list = Array.isArray(input) ? [...input, ...text ?? []] : input.tokens;
  return list.map(serializeToken).join(" ");
}
var findField = (fields, key) => fields.find((f) => f.key.toLowerCase() === key.toLowerCase());
function fieldOptions(f) {
  if (f.type === "boolean") return [{ value: "true" }, { value: "false" }];
  return Array.isArray(f.options) ? f.options : void 0;
}
function tokenInvalid(t, fields) {
  if (t.type !== "field") return false;
  const f = findField(fields, t.key);
  if (!f) return true;
  if (t.op !== ":" && !(f.comparable ?? (f.type === "number" || f.type === "date"))) return true;
  if (f.type === "number" && t.values.some((v) => Number.isNaN(Number(v)))) return true;
  if ((f.type === "enum" || f.type === "boolean") && fieldOptions(f)) {
    const allowed = fieldOptions(f).map((o) => o.value.toLowerCase());
    return t.values.some((v) => !allowed.includes(v.toLowerCase()));
  }
  return false;
}
var defaultViewLabels = {
  views: "Views",
  saveCurrent: "Save current filter as view",
  name: "View name",
  save: "Save",
  rename: "Rename",
  remove: (n) => `Delete view ${n}`,
  renameView: (n) => `Rename view ${n}`,
  setDefault: (n) => `Make ${n} the default view`,
  unsetDefault: (n) => `Remove ${n} as default view`,
  empty: "No saved views",
  confirm: "Confirm"
};
function localStorageAdapter() {
  try {
    return typeof window !== "undefined" ? window.localStorage : void 0;
  } catch {
    return void 0;
  }
}
function readStored(storage, key) {
  try {
    const raw = storage?.getItem(key);
    if (!raw) return { views: [] };
    const p = JSON.parse(raw);
    return {
      views: Array.isArray(p.views) ? p.views.filter((v) => v && typeof v.id === "string" && typeof v.name === "string" && typeof v.query === "string") : [],
      defaultId: typeof p.defaultId === "string" ? p.defaultId : null
    };
  } catch {
    return { views: [] };
  }
}
var newId = () => typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
function useSavedViews(opts = {}) {
  const { storageKey: storageKey2 = "pilab.savedViews", storage: storageProp } = opts;
  const storage = storageProp === null ? void 0 : storageProp ?? localStorageAdapter();
  const [initial] = React21.useState(() => opts.views === void 0 ? readStored(storage, storageKey2) : { views: [] });
  const [views, setViews] = useControllableState({
    value: opts.views,
    defaultValue: opts.defaultViews && initial.views.length === 0 ? opts.defaultViews : initial.views,
    onChange: opts.onViewsChange
  });
  const [defaultId, setDefaultId] = useControllableState({
    value: opts.defaultViewId,
    defaultValue: initial.defaultId ?? null,
    onChange: opts.onDefaultViewChange
  });
  const persist = opts.views === void 0 && !!storage;
  const first = React21.useRef(true);
  React21.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!persist) return;
    try {
      storage.setItem(storageKey2, JSON.stringify({ views, defaultId }));
    } catch {
    }
  }, [views, defaultId, persist, storage, storageKey2]);
  return {
    views,
    defaultId,
    defaultView: views.find((v) => v.id === defaultId),
    save: (name, query) => {
      const view = { id: newId(), name: name.trim(), query };
      setViews((vs) => [...vs, view]);
      return view;
    },
    rename: (id, name) => setViews((vs) => vs.map((v) => v.id === id ? { ...v, name: name.trim() } : v)),
    update: (id, query) => setViews((vs) => vs.map((v) => v.id === id ? { ...v, query } : v)),
    remove: (id) => {
      setViews((vs) => vs.filter((v) => v.id !== id));
      if (defaultId === id) setDefaultId(null);
    },
    setDefault: (id) => setDefaultId(id)
  };
}
function SavedViews({ query, onApply, labels: labelsProp, className, ...opts }) {
  const l = { ...defaultViewLabels, ...labelsProp };
  const sv = useSavedViews(opts);
  const [open, setOpen] = React21.useState(false);
  const [name, setName] = React21.useState("");
  const [renaming, setRenaming] = React21.useState(null);
  const [renameValue, setRenameValue] = React21.useState("");
  const commitRename = () => {
    if (renaming && renameValue.trim()) sv.rename(renaming, renameValue);
    setRenaming(null);
  };
  return /* @__PURE__ */ jsxs(PopoverPrimitive3.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverPrimitive3.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "secondary", size: "sm", leftIcon: /* @__PURE__ */ jsx(Bookmark, { className: "size-4", "aria-hidden": true }), className, children: l.views }) }),
    /* @__PURE__ */ jsx(PopoverPrimitive3.Portal, { children: /* @__PURE__ */ jsxs(PopoverPrimitive3.Content, { align: "end", sideOffset: 4, collisionPadding: 8, className: "dropdown-menu z-50 w-72 p-2", children: [
      sv.views.length === 0 ? /* @__PURE__ */ jsx("p", { className: "px-2 py-1.5 text-sm text-muted", children: l.empty }) : /* @__PURE__ */ jsx("ul", { className: "max-h-64 overflow-auto", children: sv.views.map((v) => /* @__PURE__ */ jsx("li", { className: "flex items-center gap-1", children: renaming === v.id ? /* @__PURE__ */ jsxs(
        "form",
        {
          className: "flex flex-1 items-center gap-1",
          onSubmit: (e) => {
            e.preventDefault();
            commitRename();
          },
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                autoFocus: true,
                "aria-label": l.renameView(v.name),
                className: "form-input h-8 flex-1",
                value: renameValue,
                onChange: (e) => setRenameValue(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Escape") {
                    e.stopPropagation();
                    setRenaming(null);
                  }
                }
              }
            ),
            /* @__PURE__ */ jsx("button", { type: "submit", "aria-label": l.confirm, className: "p-1 text-muted hover:text-fg", children: /* @__PURE__ */ jsx(Check, { className: "size-4", "aria-hidden": true }) })
          ]
        }
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: cn("dropdown-item flex-1 truncate text-start", v.query === query && "font-semibold"),
            "aria-current": v.query === query || void 0,
            title: v.query,
            onClick: () => {
              onApply(v.query, v);
              setOpen(false);
            },
            children: v.name
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": sv.defaultId === v.id ? l.unsetDefault(v.name) : l.setDefault(v.name),
            "aria-pressed": sv.defaultId === v.id,
            className: cn("p-1 hover:text-fg", sv.defaultId === v.id ? "text-primary" : "text-muted"),
            onClick: () => sv.setDefault(sv.defaultId === v.id ? null : v.id),
            children: /* @__PURE__ */ jsx(Star, { className: cn("size-4", sv.defaultId === v.id && "fill-current"), "aria-hidden": true })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": l.renameView(v.name),
            className: "p-1 text-muted hover:text-fg",
            onClick: () => {
              setRenaming(v.id);
              setRenameValue(v.name);
            },
            children: /* @__PURE__ */ jsx(Pencil, { className: "size-4", "aria-hidden": true })
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "button", "aria-label": l.remove(v.name), className: "p-1 text-muted hover:text-danger", onClick: () => sv.remove(v.id), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4", "aria-hidden": true }) })
      ] }) }, v.id)) }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          className: "mt-2 flex items-center gap-1 border-t border-line pt-2",
          onSubmit: (e) => {
            e.preventDefault();
            if (!name.trim()) return;
            sv.save(name, query);
            setName("");
          },
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                "aria-label": l.name,
                placeholder: l.saveCurrent,
                className: "form-input h-8 flex-1",
                value: name,
                onChange: (e) => setName(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(Button, { type: "submit", size: "sm", disabled: !name.trim(), children: l.save })
          ]
        }
      )
    ] }) })
  ] });
}
var defaultLabels2 = {
  label: "Filter",
  placeholder: "Filter\u2026 (e.g. status:open -label:wontfix)",
  clear: "Clear filter",
  removeFilter: (t) => `Remove filter ${t}`,
  editFilter: (t) => `Edit filter ${t}`,
  invalid: "Unknown or invalid filter",
  noSuggestions: "No suggestions",
  negate: "exclude"
};
function chipText(t) {
  return serializeToken(t);
}
function FilterBar({
  fields,
  value,
  defaultValue: defaultValue2 = "",
  onChange,
  savedViews,
  applyDefaultView = true,
  labels: labelsProp,
  disabled,
  className
}) {
  const { views: viewLabels, ...barLabels } = labelsProp ?? {};
  const l = { ...defaultLabels2, ...barLabels };
  const id = React21.useId();
  const [query, setQuery] = useControllableState({
    value,
    defaultValue: defaultValue2,
    onChange: (q) => onChange?.(q, parseFilter(q))
  });
  const [draft, setDraft] = React21.useState("");
  const [open, setOpen] = React21.useState(false);
  const [active, setActive] = React21.useState(0);
  const [asyncOpts, setAsyncOpts] = React21.useState([]);
  const inputRef = React21.useRef(null);
  const userNavigated = React21.useRef(false);
  const root = React21.useRef(null);
  const parsed = React21.useMemo(() => parseFilter(query), [query]);
  const tokens = parsed.tokens;
  const svOpts = savedViews === false ? void 0 : savedViews ?? {};
  const defaultViewRef = React21.useRef(void 0);
  const applyDefault = applyDefaultView && !!svOpts && !query && value === void 0;
  const defaultInit = React21.useRef(false);
  React21.useEffect(() => {
    if (defaultInit.current || !applyDefault) return;
    defaultInit.current = true;
    const st = svOpts?.storage === null ? void 0 : svOpts?.storage ?? localStorageAdapter();
    const stored = readStored(st, svOpts?.storageKey ?? "pilab.savedViews");
    const views = svOpts?.views ?? stored.views;
    const did = svOpts?.defaultViewId !== void 0 ? svOpts.defaultViewId : stored.defaultId;
    defaultViewRef.current = views.find((v) => v.id === did);
    if (defaultViewRef.current) setQuery(defaultViewRef.current.query);
  }, []);
  const emit = (list) => setQuery(serializeFilter(list));
  const neg = draft.startsWith("-") && draft.length > 0;
  const body = neg ? draft.slice(1) : draft;
  const colon = body.indexOf(":");
  const field = colon > 0 ? findField(fields, body.slice(0, colon)) : void 0;
  const valuePart = colon > 0 ? body.slice(colon + 1) : "";
  const lastSegment = field && (field.multiple ?? true) ? valuePart.slice(valuePart.lastIndexOf(",") + 1) : valuePart;
  const lastQuery = lastSegment.replace(/^(>=|<=|>|<)/, "").replace(/^"/, "");
  React21.useEffect(() => {
    if (!field || typeof field.options !== "function") {
      setAsyncOpts([]);
      return;
    }
    let cancelled = false;
    const h = window.setTimeout(async () => {
      const r = await field.options(lastQuery);
      if (!cancelled) setAsyncOpts(r);
    }, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(h);
    };
  }, [field, lastQuery]);
  const suggestions = React21.useMemo(() => {
    if (!open) return [];
    const prefix = neg ? "-" : "";
    if (colon < 0) {
      const q2 = body.toLowerCase();
      return fields.filter((f) => !q2 || f.key.toLowerCase().includes(q2) || (f.label ?? "").toLowerCase().includes(q2)).map((f) => ({ text: `${prefix}${f.key}:`, label: `${f.key}:`, description: f.description ?? f.label, commit: false }));
    }
    if (!field) return [];
    const opts = fieldOptions(field) ?? asyncOpts;
    const q = lastQuery.toLowerCase();
    const head = draft.slice(0, draft.length - lastSegment.length);
    return opts.filter((o) => !q || o.value.toLowerCase().includes(q) || (o.label ?? "").toLowerCase().includes(q)).map((o) => ({
      text: `${head}${serializeValue(o.value)}`,
      label: o.label ?? o.value,
      description: o.description,
      commit: true
    }));
  }, [open, fields, body, colon, field, asyncOpts, lastQuery, lastSegment, draft, neg]);
  React21.useEffect(() => setActive(0), [draft]);
  const commitDraft = (text) => {
    const add = parseFilter(text).tokens;
    if (add.length) emit([...tokens, ...add]);
    setDraft("");
    setOpen(false);
  };
  const pick = (s) => {
    if (s.commit) commitDraft(s.text);
    else {
      setDraft(s.text);
      setOpen(true);
      inputRef.current?.focus();
    }
  };
  const onKeyDown = (e) => {
    const sug = suggestions[active];
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, Math.max(suggestions.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Tab" && open && sug && draft && !e.shiftKey) {
      e.preventDefault();
      pick(sug);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && sug && userNavigated.current) {
        userNavigated.current = false;
        pick(sug);
        return;
      }
      if (draft.trim()) commitDraft(draft);
    } else if (e.key === " " && colon > 0 && field && !/"[^"]*$/.test(draft) && lastSegment) {
      e.preventDefault();
      commitDraft(draft);
    } else if (e.key === "Escape") {
      if (open) {
        e.stopPropagation();
        setOpen(false);
      } else if (draft) setDraft("");
    } else if (e.key === "Backspace" && !draft && tokens.length) {
      e.preventDefault();
      const last = tokens[tokens.length - 1];
      emit(tokens.slice(0, -1));
      setDraft(chipText(last));
    }
  };
  const editToken = (i) => {
    const t = tokens[i];
    emit(tokens.filter((_, j) => j !== i));
    setDraft(chipText(t));
    setOpen(true);
    inputRef.current?.focus();
  };
  const removeToken = (i) => {
    emit(tokens.filter((_, j) => j !== i));
    inputRef.current?.focus();
  };
  const listId = `${id}-list`;
  const showClear = (tokens.length > 0 || draft) && !disabled;
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-start gap-2", className), children: [
    /* @__PURE__ */ jsxs(PopoverPrimitive3.Root, { open: open && suggestions.length > 0, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(PopoverPrimitive3.Anchor, { asChild: true, children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: root,
          role: "group",
          "aria-label": l.label,
          className: "form-input flex min-h-9 flex-1 flex-wrap items-center gap-1.5 focus-within:border-primary",
          onClick: (e) => {
            if (e.target === e.currentTarget) inputRef.current?.focus();
          },
          children: [
            tokens.map((t, i) => {
              const text = chipText(t);
              const bad = tokenInvalid(t, fields);
              return /* @__PURE__ */ jsxs(
                "span",
                {
                  "data-testid": "filter-chip",
                  "data-invalid": bad || void 0,
                  className: cn(
                    "inline-flex h-6 items-center rounded-sm border text-xs",
                    bad ? "border-danger text-danger" : "border-line bg-muted-bg",
                    t.type === "field" && t.negated && "line-through decoration-1"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        disabled,
                        "aria-label": l.editFilter(text),
                        title: bad ? l.invalid : void 0,
                        className: "px-2 outline-none focus-visible:underline",
                        onClick: () => editToken(i),
                        children: text
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        disabled,
                        "aria-label": l.removeFilter(text),
                        className: "pe-1.5 text-muted hover:text-fg",
                        onClick: () => removeToken(i),
                        children: /* @__PURE__ */ jsx(X, { className: "size-3", "aria-hidden": true })
                      }
                    )
                  ]
                },
                `${i}-${text}`
              );
            }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: inputRef,
                role: "combobox",
                "aria-label": l.label,
                "aria-expanded": open && suggestions.length > 0,
                "aria-controls": listId,
                "aria-autocomplete": "list",
                "aria-activedescendant": open && suggestions[active] ? `${id}-${active}` : void 0,
                autoComplete: "off",
                spellCheck: false,
                disabled,
                className: "min-w-32 flex-1 border-0 bg-transparent p-0 text-fg outline-none",
                placeholder: tokens.length ? void 0 : l.placeholder,
                value: draft,
                onChange: (e) => {
                  userNavigated.current = false;
                  setDraft(e.target.value);
                  setOpen(true);
                },
                onFocus: () => setOpen(true),
                onBlur: () => {
                  if (draft.trim()) commitDraft(draft);
                  setOpen(false);
                },
                onKeyDownCapture: (e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") userNavigated.current = true;
                },
                onKeyDown
              }
            ),
            showClear && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": l.clear,
                className: "text-muted hover:text-fg",
                onClick: () => {
                  setQuery("");
                  setDraft("");
                  inputRef.current?.focus();
                },
                children: /* @__PURE__ */ jsx(X, { className: "size-4", "aria-hidden": true })
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(PopoverPrimitive3.Portal, { children: /* @__PURE__ */ jsx(
        PopoverPrimitive3.Content,
        {
          sideOffset: 4,
          align: "start",
          collisionPadding: 8,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          onInteractOutside: (e) => {
            if (root.current?.contains(e.target)) e.preventDefault();
          },
          className: "z-50 w-(--radix-popover-trigger-width)",
          children: /* @__PURE__ */ jsx("ul", { id: listId, role: "listbox", "aria-label": l.label, className: "dropdown-menu max-h-64 w-full overflow-auto", children: suggestions.map((s, i) => /* @__PURE__ */ jsxs(
            "li",
            {
              id: `${id}-${i}`,
              role: "option",
              "aria-selected": i === active,
              className: cn("dropdown-item cursor-pointer", i === active && "bg-surface-hover text-fg"),
              onMouseEnter: () => setActive(i),
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => pick(s),
              children: [
                /* @__PURE__ */ jsx("span", { children: s.label }),
                s.description && /* @__PURE__ */ jsx("span", { className: "ms-2 text-xs text-subtle", children: s.description })
              ]
            },
            s.text
          )) })
        }
      ) })
    ] }),
    svOpts && /* @__PURE__ */ jsx(
      SavedViews,
      {
        ...svOpts,
        labels: viewLabels,
        query,
        onApply: (q) => {
          setQuery(q);
          setDraft("");
        }
      }
    )
  ] });
}
var itemCls2 = "dropdown-item flex items-center gap-2 outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg data-[disabled]:opacity-50";
function MenuSpecItems({ items }) {
  return /* @__PURE__ */ jsx(Fragment, { children: items.map((it, i) => {
    switch (it.type) {
      case "separator":
        return /* @__PURE__ */ jsx(DropdownPrimitive3.Separator, { className: "dropdown-sep" }, `sep-${i}`);
      case "label":
        return /* @__PURE__ */ jsx(DropdownPrimitive3.Label, { className: "dropdown-label", children: it.label }, `lbl-${i}`);
      case "checkbox":
        return /* @__PURE__ */ jsxs(DropdownPrimitive3.CheckboxItem, { checked: it.checked, onCheckedChange: it.onCheckedChange, className: itemCls2, children: [
          /* @__PURE__ */ jsx("span", { className: "flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownPrimitive3.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4", "aria-hidden": true }) }) }),
          it.label
        ] }, it.id);
      case "radio":
        return /* @__PURE__ */ jsx(DropdownPrimitive3.RadioGroup, { onValueChange: it.onValueChange, children: it.options.map((o) => /* @__PURE__ */ jsxs(DropdownPrimitive3.RadioItem, { value: o.value, className: itemCls2, children: [
          /* @__PURE__ */ jsx("span", { className: "flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownPrimitive3.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4", "aria-hidden": true }) }) }),
          o.label
        ] }, o.value)) }, it.id);
      case "submenu":
        return /* @__PURE__ */ jsxs(DropdownPrimitive3.Sub, { children: [
          /* @__PURE__ */ jsxs(DropdownPrimitive3.SubTrigger, { className: itemCls2, children: [
            it.icon,
            it.label
          ] }),
          /* @__PURE__ */ jsx(DropdownPrimitive3.Portal, { children: /* @__PURE__ */ jsx(DropdownPrimitive3.SubContent, { className: "dropdown-menu relative! top-auto! left-auto! z-40 min-w-40", children: /* @__PURE__ */ jsx(MenuSpecItems, { items: it.items }) }) })
        ] }, it.id);
      default:
        return /* @__PURE__ */ jsxs(
          DropdownPrimitive3.Item,
          {
            disabled: !!it.disabled,
            title: typeof it.disabled === "string" ? it.disabled : void 0,
            onSelect: () => it.onSelect(),
            className: cn(itemCls2, it.danger && "danger"),
            children: [
              it.icon && /* @__PURE__ */ jsx("span", { className: "flex size-4 items-center justify-center [&>svg]:size-4", children: it.icon }),
              /* @__PURE__ */ jsx("span", { className: "flex-1", children: it.label }),
              it.shortcut && /* @__PURE__ */ jsx("kbd", { className: "ms-4 text-xs text-muted", children: it.shortcut })
            ]
          },
          it.id
        );
    }
  }) });
}
function PointMenu({
  x,
  y,
  items,
  onClose,
  label
}) {
  return /* @__PURE__ */ jsxs(DropdownPrimitive3.Root, { open: true, onOpenChange: (o) => !o && onClose(), modal: false, children: [
    /* @__PURE__ */ jsx(DropdownPrimitive3.Trigger, { asChild: true, children: /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed size-0", style: { left: x, top: y } }) }),
    /* @__PURE__ */ jsx(DropdownPrimitive3.Portal, { children: /* @__PURE__ */ jsx(
      DropdownPrimitive3.Content,
      {
        "aria-label": label,
        align: "start",
        sideOffset: 0,
        onCloseAutoFocus: (e) => e.preventDefault(),
        className: "dropdown-menu relative! top-auto! left-auto! z-30 min-w-48",
        children: /* @__PURE__ */ jsx(MenuSpecItems, { items })
      }
    ) })
  ] });
}
var toArr = (v) => v === void 0 ? void 0 : Array.isArray(v) ? v : [v];
var dot = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-primary",
  neutral: "bg-muted"
};
var textOf = (n) => (n.textValue ?? (typeof n.label === "string" ? n.label : n.id)).toLowerCase();
var isLazy = (n) => !!n.hasChildren && !n.children?.length;
var expandable = (n) => !!n.children?.length || !!n.hasChildren;
function TreeView({
  nodes,
  label,
  expanded: expandedProp,
  defaultExpanded = [],
  onExpandedChange,
  selected: selectedProp,
  defaultSelected,
  onSelect: onSelectProp,
  selection = "single",
  onSelectedChange,
  onActivate,
  loadChildren,
  contextMenu,
  virtual,
  height = 400,
  rowHeight = 28,
  labels,
  className
}) {
  const l = { loading: "Loading\u2026", error: "Failed to load", retry: "Retry", contextMenu: "Actions", ...labels };
  const multi = selection === "multiple";
  const [expanded, setExpanded] = useControllableState({
    value: expandedProp,
    defaultValue: defaultExpanded,
    onChange: onExpandedChange
  });
  const [selectedIds, setSelectedIds] = useControllableState({
    value: toArr(selectedProp),
    defaultValue: toArr(defaultSelected) ?? [],
    onChange: onSelectedChange
  });
  const open = React21.useMemo(() => new Set(expanded), [expanded]);
  const chosen = React21.useMemo(() => new Set(selectedIds), [selectedIds]);
  const [loadState, setLoadState] = React21.useState({});
  const rows = React21.useMemo(() => {
    const out = [];
    const walk = (list, level, parent) => {
      list.forEach((node, i) => {
        const idx = out.length;
        out.push({ kind: "node", node, level, set: list.length, pos: i + 1, parent });
        if (!open.has(node.id)) return;
        if (node.children?.length) walk(node.children, level + 1, idx);
        else if (loadState[node.id]) out.push({ kind: loadState[node.id], id: node.id, level: level + 1, parent: idx });
      });
    };
    walk(nodes, 1, -1);
    return out;
  }, [nodes, open, loadState]);
  const indexOf = React21.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    rows.forEach((r, i) => r.kind === "node" && m.set(r.node.id, i));
    return m;
  }, [rows]);
  const [focusId, setFocusId] = React21.useState(selectedIds[0] ?? rows[0]?.node?.id);
  const focusIdx = focusId !== void 0 ? indexOf.get(focusId) ?? 0 : 0;
  const anchor = React21.useRef(void 0);
  const pendingFocus = React21.useRef(void 0);
  const refs = React21.useRef(/* @__PURE__ */ new Map());
  const scrollRef = React21.useRef(null);
  const [menu, setMenu] = React21.useState(null);
  const useVirt = virtual ?? rows.length > 500;
  const focusIdxRef = React21.useRef(focusIdx);
  focusIdxRef.current = focusIdx;
  const virt = useVirtualizer({
    count: useVirt ? rows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan: 8,
    initialRect: { width: 0, height },
    observeElementRect: observeRectWithFallback,
    // keep the roving-tabindex row mounted so the tree stays reachable by Tab
    rangeExtractor: (range) => {
      const base = defaultRangeExtractor(range);
      const f = focusIdxRef.current;
      return f < range.count && !base.includes(f) ? [...base, f].sort((a, b) => a - b) : base;
    }
  });
  const load = React21.useCallback(
    (id) => {
      if (!loadChildren) return;
      setLoadState((s) => ({ ...s, [id]: "loading" }));
      loadChildren(id).then(
        () => setLoadState((s) => {
          const { [id]: _drop, ...rest } = s;
          return rest;
        }),
        () => setLoadState((s) => ({ ...s, [id]: "error" }))
      );
    },
    [loadChildren]
  );
  const setOpen = (node, to) => {
    if (to === open.has(node.id)) return;
    if (to) {
      setExpanded([...expanded, node.id]);
      if (isLazy(node) && loadState[node.id] !== "loading") load(node.id);
    } else setExpanded(expanded.filter((e) => e !== node.id));
  };
  const move = (idx) => {
    const r = rows[idx];
    if (!r || r.kind !== "node") return;
    setFocusId(r.node.id);
    pendingFocus.current = r.node.id;
    if (useVirt) virt.scrollToIndex(idx);
  };
  React21.useEffect(() => {
    const id = pendingFocus.current;
    if (id === void 0) return;
    const el = refs.current.get(id);
    if (el) {
      pendingFocus.current = void 0;
      el.focus();
    }
  });
  const commit = (ids, id) => {
    setSelectedIds(ids);
    onSelectProp?.(id);
  };
  const select = (idx, mode) => {
    const r = rows[idx];
    if (!r || r.kind !== "node" || r.node.disabled) return;
    const id = r.node.id;
    if (!multi || mode === "replace") {
      anchor.current = id;
      commit([id], id);
    } else if (mode === "toggle") {
      anchor.current = id;
      commit(chosen.has(id) ? selectedIds.filter((s) => s !== id) : [...selectedIds, id], id);
    } else {
      const a = indexOf.get(anchor.current ?? id) ?? idx;
      const [from, to] = a < idx ? [a, idx] : [idx, a];
      const ids = rows.slice(from, to + 1).flatMap((x) => x.kind === "node" && !x.node.disabled ? [x.node.id] : []);
      commit(ids, id);
    }
  };
  const typed = React21.useRef({ buf: "", t: 0 });
  const typeAhead = (ch, from) => {
    const ta = typed.current;
    if (ta.t) clearTimeout(ta.t);
    ta.buf += ch.toLowerCase();
    ta.t = setTimeout(() => {
      ta.buf = "";
      ta.t = 0;
    }, 700);
    const single = ta.buf.split("").every((c) => c === ta.buf[0]);
    const q = single ? ta.buf[0] : ta.buf;
    const start = single ? from + 1 : from;
    for (let k = 0; k < rows.length; k++) {
      const i = (start + k) % rows.length;
      const r = rows[i];
      if (r.kind === "node" && textOf(r.node).startsWith(q)) return move(i);
    }
  };
  const openMenuAt = (id, x, y) => {
    if (contextMenu && contextMenu(id).length) setMenu({ id, x, y });
  };
  const onKeyDown = (e, idx) => {
    const r = rows[idx];
    if (r.kind !== "node") {
      if (e.key === "ArrowLeft") move(r.parent);
      else if (e.key === "ArrowDown") move(idx + 1);
      else if (e.key === "ArrowUp") move(idx - 1);
      else if ((e.key === "Enter" || e.key === " ") && r.kind === "error") load(r.id);
      else return;
      e.preventDefault();
      return;
    }
    const { node } = r;
    const can = expandable(node);
    const key = e.key;
    if (key === "ArrowDown" || key === "ArrowUp") {
      const to = Math.min(Math.max(idx + (key === "ArrowDown" ? 1 : -1), 0), rows.length - 1);
      const t = rows[to];
      if (e.shiftKey && multi && t?.kind === "node") {
        anchor.current ??= node.id;
        select(to, "range");
        move(to);
      } else if (t?.kind === "node") move(to);
      else if (t) move(to + (key === "ArrowDown" ? 1 : -1));
    } else if (key === "Home") move(0);
    else if (key === "End") move(rows.length - 1);
    else if (key === "ArrowRight") {
      if (can && !open.has(node.id)) setOpen(node, true);
      else if (can && rows[idx + 1]?.kind === "node" && rows[idx + 1].level > r.level) move(idx + 1);
    } else if (key === "ArrowLeft") {
      if (can && open.has(node.id)) setOpen(node, false);
      else if (r.parent >= 0) move(r.parent);
    } else if (key === "*") {
      const sibs = r.parent < 0 ? nodes : rows[r.parent].node.children ?? [];
      const add = sibs.filter((s) => expandable(s) && !open.has(s.id));
      if (add.length) {
        setExpanded([...expanded, ...add.map((s) => s.id)]);
        add.filter(isLazy).forEach((s) => load(s.id));
      }
    } else if (key === "Enter") {
      if (node.disabled) return e.preventDefault();
      select(idx, "replace");
      onActivate?.(node.id);
    } else if (key === " ") {
      if (!node.disabled) select(idx, multi ? "toggle" : "replace");
    } else if (key === "a" && multi && (e.ctrlKey || e.metaKey)) {
      const ids = rows.flatMap((x) => x.kind === "node" && !x.node.disabled ? [x.node.id] : []);
      setSelectedIds(ids);
    } else if (key === "F10" && e.shiftKey || key === "ContextMenu") {
      const b = e.currentTarget.getBoundingClientRect();
      openMenuAt(node.id, b.left + 16, b.bottom);
    } else if (key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typeAhead(key, idx);
    } else return;
    e.preventDefault();
  };
  const renderRow = (idx, style) => {
    const r = rows[idx];
    const indent = (r.level - 1) * 16 + 4;
    if (r.kind !== "node") {
      return /* @__PURE__ */ jsx(
        "div",
        {
          role: "treeitem",
          "aria-level": r.level,
          "aria-selected": false,
          "aria-disabled": true,
          "aria-busy": r.kind === "loading",
          tabIndex: -1,
          ref: (el) => {
            const k = `${r.kind}-${r.id}`;
            if (el) refs.current.set(k, el);
            else refs.current.delete(k);
          },
          onKeyDown: (e) => onKeyDown(e, idx),
          className: "flex h-7 items-center gap-2 pe-2 text-sm text-muted outline-none",
          style: { ...style, paddingInlineStart: `${indent + 20}px` },
          children: r.kind === "loading" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: l.loading })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "text-danger", children: l.error }),
            /* @__PURE__ */ jsxs("button", { type: "button", className: "btn btn-ghost btn-sm", onClick: () => load(r.id), children: [
              /* @__PURE__ */ jsx(RotateCw, { className: "size-3", "aria-hidden": true }),
              l.retry
            ] })
          ] })
        },
        `${r.kind}-${r.id}`
      );
    }
    const { node } = r;
    const can = expandable(node);
    const isOpen = open.has(node.id);
    const isSel = chosen.has(node.id);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref: (el) => {
          if (el) refs.current.set(node.id, el);
          else refs.current.delete(node.id);
        },
        role: "treeitem",
        "aria-level": r.level,
        "aria-setsize": r.set,
        "aria-posinset": r.pos,
        "aria-expanded": can ? isOpen : void 0,
        "aria-selected": isSel,
        "aria-disabled": node.disabled || void 0,
        tabIndex: focusId === node.id ? 0 : -1,
        onFocus: () => setFocusId(node.id),
        onKeyDown: (e) => onKeyDown(e, idx),
        onClick: (e) => {
          if (node.disabled) return;
          select(idx, e.shiftKey ? "range" : e.metaKey || e.ctrlKey ? "toggle" : "replace");
        },
        onDoubleClick: () => !node.disabled && onActivate?.(node.id),
        onContextMenu: (e) => {
          if (!contextMenu) return;
          e.preventDefault();
          openMenuAt(node.id, e.clientX, e.clientY);
        },
        className: cn(
          "flex h-7 cursor-pointer items-center gap-1.5 rounded-sm border-s-2 border-transparent pe-2 text-sm text-muted outline-none hover:bg-surface-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary",
          isSel && "border-primary bg-primary-light text-fg",
          node.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-muted"
        ),
        style: { ...style, paddingInlineStart: `${indent}px` },
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "flex size-4 shrink-0 items-center justify-center",
              onClick: (e) => {
                if (!can) return;
                e.stopPropagation();
                if (!node.disabled) setOpen(node, !isOpen);
              },
              children: can && (isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ jsx(ChevronRight, { className: "size-4 rtl:rotate-180", "aria-hidden": true }))
            }
          ),
          node.icon && /* @__PURE__ */ jsx("span", { className: "flex size-4 shrink-0 items-center justify-center [&>svg]:size-4", children: node.icon }),
          /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: node.label }),
          node.status && /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: cn("size-2 shrink-0 rounded-full", dot[node.status]) }),
          node.status && /* @__PURE__ */ jsx("span", { className: "sr-only", children: node.status }),
          node.badge
        ]
      },
      node.id
    );
  };
  const menuItems = menu && contextMenu ? contextMenu(menu.id) : [];
  const menuEl = menu && /* @__PURE__ */ jsx(
    PointMenu,
    {
      x: menu.x,
      y: menu.y,
      items: menuItems,
      label: l.contextMenu,
      onClose: () => {
        const el = refs.current.get(menu.id);
        setMenu(null);
        el?.focus();
      }
    }
  );
  if (!useVirt) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { role: "tree", "aria-label": label, "aria-multiselectable": multi || void 0, className, children: rows.map((_, i) => renderRow(i)) }),
      menuEl
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        role: "tree",
        "aria-label": label,
        "aria-multiselectable": multi || void 0,
        className: cn("relative overflow-auto", className),
        style: { height },
        children: /* @__PURE__ */ jsx("div", { className: "relative w-full", style: { height: virt.getTotalSize() }, children: virt.getVirtualItems().map(
          (v) => renderRow(v.index, { position: "absolute", insetInline: 0, top: v.start, height: v.size })
        ) })
      }
    ),
    menuEl
  ] });
}
var btn = "btn btn-ghost btn-sm shrink-0";
function Menu3({ trigger, items, aria }) {
  return /* @__PURE__ */ jsxs(DropdownPrimitive3.Root, { children: [
    /* @__PURE__ */ jsx(DropdownPrimitive3.Trigger, { className: btn, "aria-label": aria, children: trigger }),
    /* @__PURE__ */ jsx(DropdownPrimitive3.Portal, { children: /* @__PURE__ */ jsx(DropdownPrimitive3.Content, { align: "end", sideOffset: 4, className: "dropdown-menu relative! top-auto! left-auto! z-30 min-w-48", children: /* @__PURE__ */ jsx(MenuSpecItems, { items }) }) })
  ] });
}
function BarItem({ it }) {
  switch (it.type) {
    case "separator":
      return /* @__PURE__ */ jsx("span", { role: "separator", "aria-orientation": "vertical", className: "mx-1 h-5 w-px shrink-0 bg-line" });
    case "label":
      return /* @__PURE__ */ jsx("span", { className: "shrink-0 px-1 text-xs text-muted", children: it.label });
    case "checkbox":
      return /* @__PURE__ */ jsx("button", { type: "button", "aria-pressed": it.checked, className: cn(btn, it.checked && "bg-primary-light"), onClick: () => it.onCheckedChange(!it.checked), children: it.label });
    case "radio":
      return /* @__PURE__ */ jsx("span", { role: "group", className: "flex shrink-0 gap-0.5", children: it.options.map((o) => /* @__PURE__ */ jsx("button", { type: "button", className: btn, "aria-pressed": false, onClick: () => it.onValueChange(o.value), children: o.label }, o.value)) });
    case "submenu":
      return /* @__PURE__ */ jsx(Menu3, { items: it.items, trigger: /* @__PURE__ */ jsxs(Fragment, { children: [
        it.icon,
        it.label
      ] }) });
    default:
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          className: cn(btn, it.danger && "text-danger"),
          disabled: !!it.disabled,
          title: typeof it.disabled === "string" ? it.disabled : void 0,
          onClick: () => it.onSelect(),
          children: [
            it.icon,
            it.label
          ]
        }
      );
  }
}
var keyOf = (it, i) => "id" in it ? it.id : `${it.type}-${i}`;
function ActionBar({ items, label, className, labels }) {
  const actions = labels?.actions ?? "Actions";
  const ref = React21.useRef(null);
  const widths = React21.useRef([]);
  const moreW = React21.useRef(0);
  const [visible, setVisible] = React21.useState(items.length);
  const measure = React21.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll("[data-ab]").forEach((c) => {
      widths.current[Number(c.dataset.ab)] = c.offsetWidth;
    });
    const more = el.querySelector("[data-ab-more]");
    if (more) moreW.current = more.offsetWidth;
    const avail = el.clientWidth;
    const total = widths.current.slice(0, items.length).reduce((a, b) => a + b + 4, 0);
    if (total <= avail || avail === 0) return setVisible(items.length);
    let used = moreW.current + 4;
    let n = 0;
    for (; n < items.length; n++) {
      used += (widths.current[n] ?? 0) + 4;
      if (used > avail) break;
    }
    setVisible(n);
  }, [items.length]);
  React21.useLayoutEffect(() => {
    widths.current = [];
    setVisible(items.length);
  }, [items]);
  React21.useLayoutEffect(() => {
    measure();
  });
  React21.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setVisible(items.length));
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);
  const shown = items.slice(0, visible);
  const hidden = items.slice(visible);
  return /* @__PURE__ */ jsxs("div", { ref, role: "toolbar", "aria-label": label, className: cn("flex min-w-0 items-center gap-1 overflow-hidden", className), children: [
    shown.map((it, i) => /* @__PURE__ */ jsx("span", { "data-ab": i, className: "flex shrink-0 items-center", children: /* @__PURE__ */ jsx(BarItem, { it }) }, keyOf(it, i))),
    hidden.length > 0 && /* @__PURE__ */ jsx("span", { "data-ab-more": true, className: "ms-auto flex shrink-0", children: /* @__PURE__ */ jsx(Menu3, { aria: actions, trigger: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(MoreHorizontal, { className: "size-4", "aria-hidden": true }),
      actions
    ] }), items: hidden }) })
  ] });
}
var defaultLabels3 = {
  actions: "Row actions",
  expand: "Expand row",
  collapse: "Collapse row",
  resize: "Resize column",
  columns: "Columns",
  density: "Density",
  compact: "Compact",
  comfortable: "Default",
  search: "Search",
  clearSelection: "Clear selection",
  selectedCount: (n) => `${n} selected`,
  empty: "Nothing here",
  filter: "Filter"
};
var warned = /* @__PURE__ */ new Set();
function warnOnce(key, message) {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") return;
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(`[pilab-laf] ${message}`);
}
var storageKey = (k) => `laf:datagrid:${k}`;
function readView(viewKey) {
  if (!viewKey || typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(storageKey(viewKey)) ?? "{}");
  } catch {
    return {};
  }
}
var SELECT_W = 40;
var ACTION_W = 40;
var EXPAND_W = 32;
var interactive = "button,a,input,select,textarea,[role=button],[role=menuitem]";
var textOf2 = (n, fallback) => typeof n === "string" || typeof n === "number" ? String(n) : fallback;
var GridContext = React21.createContext(null);
function useGrid() {
  const c = React21.useContext(GridContext);
  if (!c) throw new Error("Grid toolbar components must be rendered inside <DataGrid toolbar={\u2026}>");
  return c;
}
function GridSearch({ className, placeholder }) {
  const g = useGrid();
  return /* @__PURE__ */ jsxs("label", { className: cn("relative inline-flex items-center", className), children: [
    /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute start-2 size-3.5 text-subtle", "aria-hidden": true }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "search",
        "aria-label": g.labels.search,
        placeholder: placeholder ?? g.labels.search,
        value: g.search,
        onChange: (e) => g.setSearch(e.target.value),
        className: "h-8 w-56 border border-line bg-input ps-7 pe-2 text-sm text-fg"
      }
    )
  ] });
}
function GridDensityToggle() {
  const g = useGrid();
  return /* @__PURE__ */ jsx("div", { role: "group", "aria-label": g.labels.density, className: "inline-flex border border-line", children: ["compact", "default"].map((d) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      "aria-pressed": g.density === d,
      onClick: () => g.setDensity(d),
      className: cn("inline-flex h-8 items-center gap-1 px-2 text-xs", g.density === d ? "bg-primary/15 text-fg" : "text-muted hover:bg-surface-hover"),
      children: [
        /* @__PURE__ */ jsx(Rows3, { className: "size-3.5", "aria-hidden": true }),
        d === "compact" ? g.labels.compact : g.labels.comfortable
      ]
    },
    d
  )) });
}
function GridColumnsMenu() {
  const g = useGrid();
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { type: "button", className: "inline-flex h-8 items-center gap-1 border border-line px-2 text-xs text-muted hover:bg-surface-hover", children: [
      /* @__PURE__ */ jsx(Columns3, { className: "size-3.5", "aria-hidden": true }),
      g.labels.columns
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { align: "end", className: "w-60 p-2", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-0.5", children: g.columns.map((c, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 px-1 py-0.5 text-sm", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex flex-1 items-center gap-2", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: c.visible, disabled: !c.hideable, onChange: (e) => g.setVisible(c.id, e.target.checked) }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: c.label })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", "aria-label": `Move ${c.label} up`, disabled: i === 0, onClick: () => g.moveColumn(c.id, -1), className: "text-muted disabled:opacity-30", children: /* @__PURE__ */ jsx(ArrowUp, { className: "size-3", "aria-hidden": true }) }),
      /* @__PURE__ */ jsx("button", { type: "button", "aria-label": `Move ${c.label} down`, disabled: i === g.columns.length - 1, onClick: () => g.moveColumn(c.id, 1), className: "text-muted disabled:opacity-30", children: /* @__PURE__ */ jsx(ArrowDown, { className: "size-3", "aria-hidden": true }) })
    ] }, c.id)) }) })
  ] });
}
function FilterCell({ column, value, onChange, rows, label }) {
  const f = column.filter;
  const name = `${label}: ${textOf2(column.header, column.id)}`;
  const base = "h-6 w-full min-w-0 border border-line bg-input px-1 text-xs font-normal normal-case text-fg";
  if (typeof f === "function") return /* @__PURE__ */ jsx(Fragment, { children: f({ value, onChange, label: name }) });
  if (f === "select") {
    const get = column.accessor ?? ((r) => r[column.id]);
    const opts = Array.from(new Set(rows.slice(0, 5e3).map((r) => String(get(r) ?? "")))).slice(0, 100).sort();
    return /* @__PURE__ */ jsxs("select", { "aria-label": name, className: base, value: value ?? "", onChange: (e) => onChange(e.target.value || void 0), children: [
      /* @__PURE__ */ jsx("option", { value: "" }),
      opts.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o))
    ] });
  }
  if (f === "range") {
    const [min, max] = value ?? [void 0, void 0];
    const set = (a, b) => onChange(a === void 0 && b === void 0 ? void 0 : [a, b]);
    const num = (s) => s === "" ? void 0 : Number(s);
    return /* @__PURE__ */ jsxs("span", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsx("input", { type: "number", "aria-label": `${name} min`, className: base, value: min ?? "", onChange: (e) => set(num(e.target.value), max) }),
      /* @__PURE__ */ jsx("input", { type: "number", "aria-label": `${name} max`, className: base, value: max ?? "", onChange: (e) => set(min, num(e.target.value)) })
    ] });
  }
  return /* @__PURE__ */ jsx("input", { type: "search", "aria-label": name, className: base, value: value ?? "", onChange: (e) => onChange(e.target.value || void 0) });
}
var rangeFilter = (row, id, value) => {
  const v = Number(row.getValue(id));
  const [min, max] = value ?? [];
  return (min === void 0 || v >= min) && (max === void 0 || v <= max);
};
rangeFilter.autoRemove = (v) => !v;
function DataGrid(props) {
  const {
    columns,
    rows,
    rowId,
    label,
    manual,
    rowCount,
    virtual,
    stickyHeader = true,
    stickyFirstColumn,
    height,
    onRowActivate,
    rowActions,
    renderExpanded,
    bulkActions,
    toolbar,
    loading,
    error,
    empty,
    viewKey,
    className,
    gridRole = "grid",
    getRowProps,
    onRowKeyDown
  } = props;
  const { t: laf } = useLaf();
  const L = { ...defaultLabels3, ...props.labels };
  const selectAllLabel = props.labels?.selectAll ?? laf.selectAllRows;
  const selectRowLabel = props.labels?.selectRow ?? laf.selectRow;
  const uid = React21.useId();
  const persisted = React21.useMemo(() => readView(viewKey), [viewKey]);
  const legacySort = props.sort !== void 0 && !Array.isArray(props.sort);
  const legacySelected = typeof props.selected === "string";
  React21.useEffect(() => {
    if (legacySort) warnOnce("sort", "DataGrid: a single `sort` object is deprecated; pass an array of { id, dir } (Shift+click multi-sorts).");
    if (legacySelected) warnOnce("selected", "DataGrid: a string `selected` is deprecated; pass an array of row ids.");
  }, [legacySort, legacySelected]);
  const sortValue = props.sort === void 0 ? void 0 : Array.isArray(props.sort) ? props.sort : [props.sort];
  const selValue = props.selected === void 0 ? void 0 : Array.isArray(props.selected) ? props.selected : props.selected ? [props.selected] : [];
  const [sort, setSort] = useControllableState({ value: sortValue, defaultValue: [], onChange: props.onSortChange });
  const [selected, setSelected] = useControllableState({ value: selValue, defaultValue: [], onChange: props.onSelectedChange });
  const [visibility, setVisibility] = useControllableState({
    value: props.columnVisibility,
    defaultValue: persisted.columnVisibility ?? {},
    onChange: props.onColumnVisibilityChange
  });
  const [order, setOrder] = useControllableState({ value: props.columnOrder, defaultValue: persisted.columnOrder ?? [], onChange: props.onColumnOrderChange });
  const [sizing, setSizing] = useControllableState({ value: props.columnSizing, defaultValue: persisted.columnSizing ?? {}, onChange: props.onColumnSizingChange });
  const [filters, setFilters] = useControllableState({ value: props.filters, defaultValue: [], onChange: props.onFiltersChange });
  const [search, setSearch] = useControllableState({ value: props.search, defaultValue: "", onChange: props.onSearchChange });
  const [density, setDensity] = useControllableState({ value: props.density, defaultValue: persisted.density ?? "default", onChange: props.onDensityChange });
  const [expandedIds, setExpandedIds] = React21.useState(() => /* @__PURE__ */ new Set());
  React21.useEffect(() => {
    if (!viewKey || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(storageKey(viewKey), JSON.stringify({ columnVisibility: visibility, columnOrder: order, columnSizing: sizing, density }));
    } catch {
    }
  }, [viewKey, visibility, order, sizing, density]);
  const selectable = props.selectable ?? (props.selected !== void 0 || !!props.onSelectedChange || !!bulkActions);
  const selectedSet = React21.useMemo(() => new Set(selected), [selected]);
  const colById = React21.useMemo(() => new Map(columns.map((c) => [c.id, c])), [columns]);
  const defs = React21.useMemo(
    () => columns.map((c) => ({
      id: c.id,
      accessorFn: c.accessor ?? ((r) => r[c.id]),
      header: () => c.header,
      enableSorting: !!c.sortable,
      enableHiding: c.hideable !== false,
      size: c.width ?? 160,
      minSize: c.minWidth ?? 60,
      filterFn: c.filter === "range" ? rangeFilter : c.filter === "select" ? "equalsString" : "includesString"
    })),
    [columns]
  );
  const wrap = (get, set) => (u) => set(typeof u === "function" ? u(get()) : u);
  const sorting = React21.useMemo(() => sort.map((s) => ({ id: s.id, desc: s.dir === "desc" })), [sort]);
  const columnFilters = filters;
  const table = useLegacyTable({
    data: rows,
    columns: defs,
    getRowId: rowId,
    state: { sorting, columnVisibility: visibility, columnOrder: order, columnSizing: sizing, columnFilters, globalFilter: search },
    onColumnVisibilityChange: wrap(() => visibility, setVisibility),
    onColumnOrderChange: wrap(() => order, setOrder),
    onColumnSizingChange: wrap(() => sizing, setSizing),
    columnResizeMode: "onChange",
    manualSorting: manual,
    manualFiltering: manual,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manual ? void 0 : getSortedRowModel(),
    getFilteredRowModel: manual ? void 0 : getFilteredRowModel(),
    globalFilterFn: "includesString"
  });
  const modelRows = table.getRowModel().rows;
  const n = modelRows.length;
  const leaf = table.getVisibleLeafColumns();
  const allLeafIds = table.getAllLeafColumns().map((c) => c.id);
  const leading = (selectable ? SELECT_W : 0) + (renderExpanded ? EXPAND_W : 0);
  const pinnedLeft = /* @__PURE__ */ new Map();
  {
    let off = leading;
    leaf.forEach((c, i) => {
      const spec = colById.get(c.id);
      if (spec?.pin === "start" || stickyFirstColumn && i === 0) {
        pinnedLeft.set(c.id, off);
        off += c.getSize();
      } else off = Number.POSITIVE_INFINITY;
    });
  }
  const template = [selectable && `${SELECT_W}px`, renderExpanded && `${EXPAND_W}px`, ...leaf.map((c) => `${c.getSize()}px`), rowActions && `${ACTION_W}px`].filter(Boolean).join(" ");
  const totalWidth = leading + leaf.reduce((a, c) => a + c.getSize(), 0) + (rowActions ? ACTION_W : 0);
  const colCount = leaf.length + (selectable ? 1 : 0) + (renderExpanded ? 1 : 0) + (rowActions ? 1 : 0);
  const rowH = typeof virtual === "object" ? virtual.rowHeight : density === "compact" ? 28 : 36;
  const overscan = typeof virtual === "object" ? virtual.overscan ?? 8 : 8;
  const virtualOn = virtual === void 0 ? n > 200 : virtual !== false;
  const viewportH = height ?? 480;
  const scrollRef = React21.useRef(null);
  const fallbackH = typeof viewportH === "number" ? viewportH : 480;
  const estimate = React21.useCallback((i) => rowH + (modelRows[i] && expandedIds.has(modelRows[i].id) ? 120 : 0), [rowH, modelRows, expandedIds]);
  const virtualizer = useVirtualizer({
    count: virtualOn ? n : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: estimate,
    overscan,
    scrollMargin: rowH,
    scrollPaddingStart: rowH,
    getItemKey: (i) => modelRows[i]?.id ?? i,
    observeElementRect: (inst, cb) => {
      const el = inst.scrollElement;
      if (!el) return;
      const emit = () => cb({ width: el.clientWidth || 800, height: el.clientHeight || fallbackH });
      emit();
      if (typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver(emit);
      ro.observe(el);
      return () => ro.disconnect();
    },
    measureElement: (el) => {
      const h = el.getBoundingClientRect().height;
      return h > 0 ? h : estimate(Number(el.dataset.index ?? 0));
    }
  });
  const [active, setActive] = React21.useState(-1);
  const anchor = React21.useRef(0);
  const [menu, setMenu] = React21.useState(null);
  const activeIdx = Math.min(active, n - 1);
  const reveal = (i) => {
    if (virtualOn) virtualizer.scrollToIndex(i, { align: "auto" });
    else scrollRef.current?.querySelector(`[data-row-index="${i}"]`)?.scrollIntoView?.({ block: "nearest" });
  };
  const ids = React21.useMemo(() => modelRows.map((r) => r.id), [modelRows]);
  const select = (i, mods, checkbox = false) => {
    const id = ids[i];
    if (id === void 0) return;
    if (mods.shift) {
      const [a, b] = [Math.min(anchor.current, i), Math.max(anchor.current, i)];
      const range = ids.slice(a, b + 1);
      setSelected(mods.ctrl || checkbox ? Array.from(/* @__PURE__ */ new Set([...selected, ...range])) : range);
      return;
    }
    anchor.current = i;
    if (mods.ctrl || checkbox) setSelected(selectedSet.has(id) ? selected.filter((s) => s !== id) : [...selected, id]);
    else setSelected([id]);
  };
  const toggleExpanded = (id) => setExpandedIds((prev) => {
    const next = new Set(prev);
    if (!next.delete(id)) next.add(id);
    return next;
  });
  const openMenuFor = (i, el) => {
    const r = (scrollRef.current?.querySelector(`[data-row-index="${i}"]`))?.getBoundingClientRect();
    setMenu({ id: ids[i], x: r?.left ?? 0, y: r?.bottom ?? 0 });
  };
  const onKeyDown = (e) => {
    if (e.target !== e.currentTarget || n === 0) return;
    const cur = activeIdx < 0 ? 0 : activeIdx;
    const original = modelRows[cur]?.original;
    if (original !== void 0) {
      onRowKeyDown?.(e, original);
      if (e.defaultPrevented) return;
    }
    const page = Math.max(1, Math.floor((scrollRef.current?.clientHeight || fallbackH) / rowH) - 1);
    let next = cur;
    switch (e.key) {
      case "ArrowDown":
        next = Math.min(n - 1, activeIdx < 0 ? 0 : cur + 1);
        break;
      case "ArrowUp":
        next = Math.max(0, cur - 1);
        break;
      case "PageDown":
        next = Math.min(n - 1, cur + page);
        break;
      case "PageUp":
        next = Math.max(0, cur - page);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = n - 1;
        break;
      case " ":
        if (selectable) {
          e.preventDefault();
          select(cur, { ctrl: true });
        }
        return;
      case "Enter":
        if (original !== void 0 && onRowActivate) {
          e.preventDefault();
          onRowActivate(original);
        }
        return;
      case "ArrowRight":
      case "ArrowLeft": {
        const id = ids[cur];
        if (renderExpanded && id !== void 0 && expandedIds.has(id) === (e.key === "ArrowLeft")) {
          e.preventDefault();
          toggleExpanded(id);
        }
        return;
      }
      case "a":
      case "A":
        if ((e.ctrlKey || e.metaKey) && selectable) {
          e.preventDefault();
          setSelected(ids);
        }
        return;
      case "Escape":
        if (selected.length) setSelected([]);
        return;
      case "F10":
      case "ContextMenu":
        if (rowActions && (e.key === "ContextMenu" || e.shiftKey)) {
          e.preventDefault();
          openMenuFor(cur);
        }
        return;
      default:
        return;
    }
    e.preventDefault();
    setActive(next);
    if (e.shiftKey && selectable) select(next, { shift: true });
    else if (!e.ctrlKey) anchor.current = next;
    reveal(next);
  };
  const cycleSort = (id, multi) => {
    const cur = sort.find((s) => s.id === id);
    if (!multi) setSort(!cur ? [{ id, dir: "asc" }] : cur.dir === "asc" ? [{ id, dir: "desc" }] : []);
    else if (!cur) setSort([...sort, { id, dir: "asc" }]);
    else if (cur.dir === "asc") setSort(sort.map((s) => s.id === id ? { id, dir: "desc" } : s));
    else setSort(sort.filter((s) => s.id !== id));
  };
  const moveColumn = (id, delta) => {
    const base = order.length ? [...order, ...allLeafIds.filter((x) => !order.includes(x))] : [...allLeafIds];
    const from = base.indexOf(id);
    const to = Math.max(0, Math.min(base.length - 1, from + delta));
    if (from < 0 || from === to) return;
    base.splice(to, 0, base.splice(from, 1)[0]);
    setOrder(base);
  };
  const dropColumn = (id, target) => {
    const base = order.length ? [...order, ...allLeafIds.filter((x) => !order.includes(x))] : [...allLeafIds];
    const from = base.indexOf(id);
    const to = base.indexOf(target);
    if (from < 0 || to < 0 || from === to) return;
    base.splice(to, 0, base.splice(from, 1)[0]);
    setOrder(base);
  };
  const dragId = React21.useRef(null);
  const setFilter = (id, value) => setFilters([...filters.filter((f) => f.id !== id), ...value === void 0 || value === "" ? [] : [{ id, value }]]);
  const hasFilters = columns.some((c) => c.filter);
  const ctx = {
    columns: (order.length ? [...order, ...allLeafIds.filter((x) => !order.includes(x))] : allLeafIds).filter((id) => colById.has(id)).map((id) => ({ id, label: textOf2(colById.get(id).header, id), visible: visibility[id] !== false, hideable: colById.get(id).hideable !== false })),
    setVisible: (id, v) => setVisibility({ ...visibility, [id]: v }),
    moveColumn,
    density,
    setDensity,
    search,
    setSearch,
    labels: L
  };
  const cellBase = "flex min-w-0 items-center overflow-hidden px-3 text-sm";
  const stickyCell = "sticky z-[1] bg-surface";
  const renderRow = (index, style, measure) => {
    const r = modelRows[index];
    if (!r) return null;
    const row = r.original;
    const isSel = selectedSet.has(r.id);
    const isExp = expandedIds.has(r.id);
    const extra = getRowProps?.(row);
    return /* @__PURE__ */ jsxs("div", { role: "none", "data-index": index, ref: measure, style, className: cn(virtualOn && "absolute inset-x-0 top-0"), children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          ...extra,
          id: `${uid}-r${index}`,
          role: "row",
          "data-row-index": index,
          "aria-rowindex": index + 2,
          "aria-selected": selectable ? isSel : void 0,
          style: { display: "grid", gridTemplateColumns: template, height: rowH, minWidth: totalWidth },
          className: cn(
            "border-b border-line",
            isSel ? "bg-primary/15" : "hover:bg-surface-hover",
            index === activeIdx && "outline outline-2 -outline-offset-2 outline-primary",
            extra?.className
          ),
          onClick: (e) => {
            setActive(index);
            if (e.target.closest(interactive)) return;
            if (selectable) select(index, { shift: e.shiftKey, ctrl: e.ctrlKey || e.metaKey });
          },
          onDoubleClick: (e) => {
            if (onRowActivate && !e.target.closest(interactive)) onRowActivate(row);
          },
          onContextMenu: rowActions ? (e) => {
            e.preventDefault();
            setActive(index);
            setMenu({ id: r.id, x: e.clientX, y: e.clientY });
          } : void 0,
          children: [
            selectable && /* @__PURE__ */ jsx("div", { role: "gridcell", className: cn(cellBase, "justify-center px-0", stickyCell), style: { insetInlineStart: 0 }, children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                "aria-label": selectRowLabel,
                checked: isSel,
                onChange: () => void 0,
                onClick: (e) => select(index, { shift: e.shiftKey }, true)
              }
            ) }),
            renderExpanded && /* @__PURE__ */ jsx("div", { role: "gridcell", className: cn(cellBase, "justify-center px-0", stickyCell), style: { insetInlineStart: selectable ? SELECT_W : 0 }, children: /* @__PURE__ */ jsx("button", { type: "button", "aria-label": isExp ? L.collapse : L.expand, "aria-expanded": isExp, onClick: () => toggleExpanded(r.id), className: "text-muted hover:text-fg", children: isExp ? /* @__PURE__ */ jsx(ChevronDown, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ jsx(ChevronRight, { className: "size-4", "aria-hidden": true }) }) }),
            leaf.map((c) => {
              const spec = colById.get(c.id);
              const left = pinnedLeft.get(c.id);
              return /* @__PURE__ */ jsx(
                "div",
                {
                  role: "gridcell",
                  className: cn(cellBase, spec.numeric && "justify-end font-mono", left !== void 0 && stickyCell),
                  style: left !== void 0 && Number.isFinite(left) ? { insetInlineStart: left } : void 0,
                  children: /* @__PURE__ */ jsx("span", { className: "truncate", children: spec.cell(row) })
                },
                c.id
              );
            }),
            rowActions && /* @__PURE__ */ jsx("div", { role: "gridcell", className: cn(cellBase, "justify-center px-0"), children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": L.actions,
                "aria-haspopup": "menu",
                className: "inline-flex size-7 items-center justify-center text-muted hover:text-fg",
                onClick: (e) => {
                  const b = e.currentTarget.getBoundingClientRect();
                  setMenu({ id: r.id, x: b.left, y: b.bottom });
                },
                children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "size-4", "aria-hidden": true })
              }
            ) })
          ]
        }
      ),
      renderExpanded && isExp && /* @__PURE__ */ jsx("div", { role: "row", style: { minWidth: totalWidth }, className: "border-b border-line bg-muted-bg", children: /* @__PURE__ */ jsx("div", { role: "gridcell", "aria-colspan": colCount, className: "p-3 text-sm", children: renderExpanded(row) }) })
    ] }, r.id);
  };
  const menuRow = menu ? modelRows.find((r) => r.id === menu.id)?.original : void 0;
  const menuItems = menuRow !== void 0 && rowActions ? rowActions(menuRow) : [];
  const showEmpty = !loading && !error && n === 0;
  const scrollStyle = { height: virtualOn || stickyHeader ? viewportH : void 0, maxHeight: virtualOn || stickyHeader ? void 0 : viewportH };
  return /* @__PURE__ */ jsx(GridContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", className), children: [
    toolbar && /* @__PURE__ */ jsx("div", { className: "mb-2 flex flex-wrap items-center gap-2", children: toolbar }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: scrollRef,
        role: gridRole,
        "aria-label": label,
        "aria-rowcount": (manual && rowCount !== void 0 ? rowCount : n) + 1,
        "aria-colcount": colCount,
        "aria-multiselectable": selectable || void 0,
        "aria-busy": loading || void 0,
        "aria-activedescendant": activeIdx >= 0 && !loading && n > 0 ? `${uid}-r${activeIdx}` : void 0,
        tabIndex: 0,
        style: scrollStyle,
        className: "relative overflow-auto border border-line bg-surface text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary",
        onKeyDown,
        onFocus: (e) => {
          if (e.target === e.currentTarget && activeIdx < 0 && n > 0) setActive(0);
        },
        children: [
          /* @__PURE__ */ jsxs("div", { role: "rowgroup", className: cn(stickyHeader && "sticky top-0 z-10", "bg-surface"), style: { minWidth: totalWidth }, children: [
            /* @__PURE__ */ jsxs("div", { role: "row", "aria-rowindex": 1, style: { display: "grid", gridTemplateColumns: template, height: rowH, minWidth: totalWidth }, className: "border-b border-line-strong text-xs uppercase text-muted", children: [
              selectable && /* @__PURE__ */ jsx("div", { role: "columnheader", className: cn(cellBase, "justify-center px-0", stickyCell), style: { insetInlineStart: 0 }, children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  "aria-label": selectAllLabel,
                  checked: n > 0 && ids.every((i) => selectedSet.has(i)),
                  ref: (el) => {
                    if (el) el.indeterminate = selected.length > 0 && !ids.every((i) => selectedSet.has(i));
                  },
                  onChange: () => setSelected(ids.every((i) => selectedSet.has(i)) ? [] : ids)
                }
              ) }),
              renderExpanded && /* @__PURE__ */ jsx("div", { role: "columnheader", "aria-label": L.expand, className: cn(stickyCell), style: { insetInlineStart: selectable ? SELECT_W : 0 } }),
              leaf.map((c) => {
                const spec = colById.get(c.id);
                const sIdx = sort.findIndex((s2) => s2.id === c.id);
                const s = sort[sIdx];
                const left = pinnedLeft.get(c.id);
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    role: "columnheader",
                    "aria-sort": s ? s.dir === "asc" ? "ascending" : "descending" : spec.sortable ? "none" : void 0,
                    draggable: true,
                    onDragStart: (e) => {
                      dragId.current = c.id;
                      e.dataTransfer.effectAllowed = "move";
                    },
                    onDragOver: (e) => dragId.current && e.preventDefault(),
                    onDrop: (e) => {
                      e.preventDefault();
                      if (dragId.current) dropColumn(dragId.current, c.id);
                      dragId.current = null;
                    },
                    onKeyDown: (e) => {
                      if (e.altKey && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
                        e.preventDefault();
                        const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
                        moveColumn(c.id, e.key === "ArrowRight" !== rtl ? 1 : -1);
                      }
                    },
                    className: cn("relative", cellBase, spec.numeric && "justify-end", left !== void 0 && stickyCell),
                    style: left !== void 0 && Number.isFinite(left) ? { insetInlineStart: left } : void 0,
                    children: [
                      spec.sortable ? /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          className: "inline-flex min-w-0 items-center gap-1 font-[inherit] uppercase hover:text-fg",
                          onClick: (e) => cycleSort(c.id, e.shiftKey),
                          children: [
                            /* @__PURE__ */ jsx("span", { className: "truncate", children: spec.header }),
                            s && (s.dir === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "size-3 shrink-0", "aria-hidden": true }) : /* @__PURE__ */ jsx(ArrowDown, { className: "size-3 shrink-0", "aria-hidden": true })),
                            s && sort.length > 1 && /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: sIdx + 1 })
                          ]
                        }
                      ) : /* @__PURE__ */ jsx("span", { className: "truncate", children: spec.header }),
                      c.getCanResize() && /* @__PURE__ */ jsx(
                        "div",
                        {
                          role: "separator",
                          "aria-orientation": "vertical",
                          "aria-label": `${L.resize}: ${textOf2(spec.header, c.id)}`,
                          "aria-valuenow": c.getSize(),
                          "aria-valuemin": spec.minWidth ?? 60,
                          tabIndex: 0,
                          draggable: false,
                          onMouseDown: (e) => {
                            e.stopPropagation();
                            table.getHeaderGroups()[0]?.headers.find((h) => h.id === c.id)?.getResizeHandler()(e);
                          },
                          onDragStart: (e) => e.preventDefault(),
                          onDoubleClick: () => {
                            const { [c.id]: _, ...rest } = sizing;
                            setSizing(rest);
                          },
                          onKeyDown: (e) => {
                            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
                            e.preventDefault();
                            e.stopPropagation();
                            const step = (e.shiftKey ? 50 : 10) * (e.key === "ArrowRight" ? 1 : -1);
                            setSizing({ ...sizing, [c.id]: Math.max(spec.minWidth ?? 60, c.getSize() + step) });
                          },
                          className: "absolute inset-y-0 end-0 w-1.5 cursor-col-resize touch-none bg-transparent hover:bg-primary focus-visible:bg-primary"
                        }
                      )
                    ]
                  },
                  c.id
                );
              }),
              rowActions && /* @__PURE__ */ jsx("div", { role: "columnheader", className: "relative", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: L.actions }) })
            ] }),
            hasFilters && /* @__PURE__ */ jsxs("div", { role: "row", style: { display: "grid", gridTemplateColumns: template, minWidth: totalWidth }, className: "border-b border-line", children: [
              selectable && /* @__PURE__ */ jsx("div", { role: "gridcell", className: stickyCell, style: { insetInlineStart: 0 } }),
              renderExpanded && /* @__PURE__ */ jsx("div", { role: "gridcell", className: stickyCell, style: { insetInlineStart: selectable ? SELECT_W : 0 } }),
              leaf.map((c) => {
                const spec = colById.get(c.id);
                const left = pinnedLeft.get(c.id);
                return /* @__PURE__ */ jsx("div", { role: "gridcell", className: cn("min-w-0 px-2 py-1", left !== void 0 && stickyCell), style: left !== void 0 && Number.isFinite(left) ? { insetInlineStart: left } : void 0, children: spec.filter && /* @__PURE__ */ jsx(FilterCell, { column: spec, value: filters.find((f) => f.id === c.id)?.value, onChange: (v) => setFilter(c.id, v), rows, label: L.filter }) }, c.id);
              }),
              rowActions && /* @__PURE__ */ jsx("div", { role: "gridcell" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { role: "rowgroup", style: virtualOn ? { height: virtualizer.getTotalSize() - rowH, position: "relative", minWidth: totalWidth } : { minWidth: totalWidth }, children: [
            loading && Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ jsx("div", { role: "row", style: { display: "grid", gridTemplateColumns: template, height: rowH }, className: "border-b border-line", children: Array.from({ length: colCount }, (_2, j) => /* @__PURE__ */ jsx("div", { role: "gridcell", className: "flex items-center px-3", children: /* @__PURE__ */ jsx(Skeleton, {}) }, j)) }, i)),
            !loading && !error && (virtualOn ? virtualizer.getVirtualItems().map((v) => renderRow(v.index, { transform: `translateY(${v.start - rowH}px)` }, virtualizer.measureElement)) : modelRows.map((_, i) => renderRow(i)))
          ] })
        ]
      }
    ),
    error && /* @__PURE__ */ jsx("div", { role: "alert", className: "border border-danger-line bg-danger-bg p-3 text-sm text-danger", children: error }),
    showEmpty && (empty ?? /* @__PURE__ */ jsx(EmptyState, { title: L.empty })),
    bulkActions && selected.length > 0 && /* @__PURE__ */ jsxs("div", { role: "toolbar", "aria-label": L.selectedCount(selected.length), className: "sticky bottom-0 z-10 flex items-center gap-3 border border-line bg-surface px-3 py-2 text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: L.selectedCount(selected.length) }),
      bulkActions(selected),
      /* @__PURE__ */ jsx("button", { type: "button", "aria-label": L.clearSelection, className: "ms-auto text-muted hover:text-fg", onClick: () => setSelected([]), children: /* @__PURE__ */ jsx(X, { className: "size-4", "aria-hidden": true }) })
    ] }),
    rowActions && /* @__PURE__ */ jsxs(DropdownMenu, { open: !!menu && menuItems.length > 0, onOpenChange: (o) => !o && setMenu(null), children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed size-0", style: menu ? { left: menu.x, top: menu.y } : void 0 }) }),
      /* @__PURE__ */ jsx(
        DropdownMenuContent,
        {
          align: "start",
          onCloseAutoFocus: (e) => {
            e.preventDefault();
            scrollRef.current?.focus();
          },
          children: menuItems.map((m) => /* @__PURE__ */ jsxs(React21.Fragment, { children: [
            m.separatorBefore && /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxs(DropdownMenuItem, { danger: m.danger, disabled: m.disabled, onSelect: () => m.onSelect(), children: [
              m.icon,
              m.label
            ] })
          ] }, m.id))
        }
      )
    ] })
  ] }) });
}
function compare(a, b) {
  if (a == null) return b == null ? 0 : 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), void 0, { numeric: true });
}
function TreeTable2({
  nodes,
  columns,
  expanded,
  defaultExpanded,
  onExpandedChange,
  treeColumn,
  indent = 16,
  sort: sortProp,
  onSortChange,
  onRowActivate,
  rowActions,
  bulkActions,
  ...rest
}) {
  const [open, setOpen] = useControllableState({ value: expanded, defaultValue: defaultExpanded ?? [], onChange: onExpandedChange });
  const [sort, setSort] = useControllableState({ value: sortProp, defaultValue: [], onChange: onSortChange });
  const openSet = React21.useMemo(() => new Set(open), [open]);
  const treeCol = treeColumn ?? columns[0]?.id;
  const getters = React21.useMemo(() => new Map(columns.map((c) => [c.id, c.accessor ?? ((r) => r[c.id])])), [columns]);
  const flat = React21.useMemo(() => {
    const out = [];
    const cmp = (x, y) => {
      for (const s of sort) {
        const g = getters.get(s.id);
        if (!g) continue;
        const r = compare(g(x.data), g(y.data));
        if (r) return s.dir === "asc" ? r : -r;
      }
      return 0;
    };
    const walk = (list, depth) => {
      const sorted = sort.length ? [...list].sort(cmp) : list;
      sorted.forEach((node, i) => {
        const expandable2 = !!node.children?.length;
        const isOpen = expandable2 && openSet.has(node.id);
        out.push({ node, depth, setSize: sorted.length, posInSet: i + 1, expandable: expandable2, open: isOpen });
        if (isOpen) walk(node.children, depth + 1);
      });
    };
    walk(nodes, 1);
    return out;
  }, [nodes, openSet, sort, getters]);
  const toggle = React21.useCallback((id) => setOpen((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]), [setOpen]);
  const cols = React21.useMemo(
    () => columns.map((c) => {
      const base = { ...c, cell: (f) => c.cell(f.node.data), accessor: (f) => getters.get(c.id)(f.node.data), filter: void 0 };
      if (c.id !== treeCol) return base;
      return {
        ...base,
        cell: (f) => /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-1", style: { paddingInlineStart: (f.depth - 1) * indent }, children: [
          f.expandable ? /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": f.open ? "Collapse" : "Expand",
              "aria-expanded": f.open,
              className: "inline-flex size-4 shrink-0 items-center justify-center text-muted hover:text-fg",
              onClick: () => toggle(f.node.id),
              children: f.open ? /* @__PURE__ */ jsx(ChevronDown, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ jsx(ChevronRight, { className: "size-4", "aria-hidden": true })
            }
          ) : /* @__PURE__ */ jsx("span", { className: "inline-block size-4 shrink-0", "aria-hidden": true }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: c.cell(f.node.data) })
        ] })
      };
    }),
    [columns, treeCol, indent, getters, toggle]
  );
  return /* @__PURE__ */ jsx(
    DataGrid,
    {
      ...rest,
      gridRole: "treegrid",
      manual: true,
      columns: cols,
      rows: flat,
      rowId: (f) => f.node.id,
      sort,
      onSortChange: setSort,
      onRowActivate: onRowActivate && ((f) => onRowActivate(f.node.data)),
      rowActions: rowActions && ((f) => rowActions(f.node.data)),
      bulkActions,
      getRowProps: (f) => ({
        "aria-level": f.depth,
        "aria-setsize": f.setSize,
        "aria-posinset": f.posInSet,
        "aria-expanded": f.expandable ? f.open : void 0
      }),
      onRowKeyDown: (e, f) => {
        if (e.key === "ArrowRight" && f.expandable && !f.open) {
          e.preventDefault();
          toggle(f.node.id);
        } else if (e.key === "ArrowLeft" && f.open) {
          e.preventDefault();
          toggle(f.node.id);
        }
      }
    }
  );
}

export { Accordion, AccountItem, AccountList, ActionBar, AdminShell, AlarmList, Alert, AuditLog, AuthFooter, Avatar, AvatarGroup, Badge, Banner, BarChart, BrandHeader, Breadcrumb, Button, ButtonGroup, Card, Checkbox, Chip, ClientInfo, CodeDisplay, CodeEditor, CodeInput, Combobox, CommandPalette, ConfirmDialog, ContextMenu, ContextMenuContent, ContextMenuFor, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger, CopyButton, DataGrid, DataGridLegacy, DatePicker, DateTimeInput, DefinitionList, DetailPage, DeviceSelector, DeviceSteps, Dialog, DialogClose, DialogContent, DialogTrigger, DiffView, DockedTaskPanel, Donut, Drawer, DrawerClose, DrawerContent, DrawerTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, EmptyState, ErrorPage, ErrorSummary, Field, FileDropzone, FilterBar, FormField, FormFooter, FormPage, FormSection, Gauge, GridColumnsMenu, GridDensityToggle, GridSearch, Heatmap, IconButton, InfiniteList, InfoBox, InlineEdit, Input, Kbd, KeyValueEditor, LafErrorBoundary, LafProvider, LanguageSwitcher, LineChart, LogViewer, Menu, MenuShortcut, MfaEnrolment, MobileNav, NavGroup, NavLink, NumberInput, ObjectIcon, OtpInput, OverflowTabs, PageHead, Pagination, Panel, PasswordField, PermissionMatrix, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, Radio, RadioGroup, RelativeTime, SavedViews, ScopeList, SearchInput, SecretDisplay, SegmentedControl, Select, SelectMenu, Skeleton, Slider, SocialButton, SocialButtons, SocialDivider, Sparkline, Spinner, SplitButton, SplitPane, StackedBarChart, Stat, StatGrid, StatusDot, Stepper, SubNav, Switch, Table, Tabs, TabsContent, TabsList, TabsTrigger, TagInput, TaskPanel, TenantSwitcher, Textarea, TimeRangePicker, ToastProvider, Toolbar, Tooltip, TooltipProvider, TopBar, TopologyGraph, TreeTable, TreeTable2 as TreeTableV2, TreeView, UnsavedChangesDialog, UserCell, UserMenu, UserSelector, VirtualList, Wizard, WizardReview, buttonVariants, cn, createFormatters, diffLines, en, format, formatRelative, highlight, matchesAccept, observeRectWithFallback, parseFilter, registerObjectKind, serializeFilter, serializeToken, useControllableState, useLaf, usePortalContainer, useSavedViews, useToast, useUnsavedChangesGuard };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map