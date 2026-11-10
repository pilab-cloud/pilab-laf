"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  Accordion: () => Accordion,
  AccountItem: () => AccountItem,
  AccountList: () => AccountList,
  AdminShell: () => AdminShell,
  AlarmList: () => AlarmList,
  Alert: () => Alert,
  AuditLog: () => AuditLog,
  AuthFooter: () => AuthFooter,
  Avatar: () => Avatar,
  Badge: () => Badge,
  Banner: () => Banner,
  BarChart: () => BarChart,
  BrandHeader: () => BrandHeader,
  Breadcrumb: () => Breadcrumb,
  Button: () => Button,
  Card: () => Card,
  Checkbox: () => Checkbox,
  Chip: () => Chip,
  ClientInfo: () => ClientInfo,
  CodeDisplay: () => CodeDisplay,
  CodeEditor: () => CodeEditor,
  CodeInput: () => CodeInput,
  Combobox: () => Combobox,
  CommandPalette: () => CommandPalette,
  ConfirmDialog: () => ConfirmDialog,
  ContextMenu: () => ContextMenu,
  ContextMenuContent: () => ContextMenuContent,
  ContextMenuItem: () => ContextMenuItem,
  ContextMenuSeparator: () => ContextMenuSeparator,
  ContextMenuTrigger: () => ContextMenuTrigger,
  CopyButton: () => CopyButton,
  DataGrid: () => DataGrid,
  DatePicker: () => DatePicker,
  DateTimeInput: () => DateTimeInput,
  DefinitionList: () => DefinitionList,
  DeviceSelector: () => DeviceSelector,
  DeviceSteps: () => DeviceSteps,
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogTrigger: () => DialogTrigger,
  DiffView: () => DiffView,
  DockedTaskPanel: () => DockedTaskPanel,
  Donut: () => Donut,
  Drawer: () => Drawer,
  DrawerClose: () => DrawerClose,
  DrawerContent: () => DrawerContent,
  DrawerTrigger: () => DrawerTrigger,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuLabel: () => DropdownMenuLabel,
  DropdownMenuSeparator: () => DropdownMenuSeparator,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  EmptyState: () => EmptyState,
  ErrorSummary: () => ErrorSummary,
  Field: () => Field,
  FileDropzone: () => FileDropzone,
  FormField: () => FormField,
  Gauge: () => Gauge,
  Heatmap: () => Heatmap,
  InfoBox: () => InfoBox,
  InlineEdit: () => InlineEdit,
  Input: () => Input,
  Kbd: () => Kbd,
  KeyValueEditor: () => KeyValueEditor,
  LafProvider: () => LafProvider,
  LanguageSwitcher: () => LanguageSwitcher,
  LineChart: () => LineChart,
  LogViewer: () => LogViewer,
  MfaEnrolment: () => MfaEnrolment,
  NavGroup: () => NavGroup,
  NavLink: () => NavLink,
  NumberInput: () => NumberInput,
  OidcClientForm: () => OidcClientForm,
  OidcClientList: () => OidcClientList,
  OtpInput: () => OtpInput,
  OverflowTabs: () => OverflowTabs,
  PageHead: () => PageHead,
  Pagination: () => Pagination,
  Panel: () => Panel,
  PasswordField: () => PasswordField,
  PermissionMatrix: () => PermissionMatrix,
  Popover: () => Popover,
  PopoverClose: () => PopoverClose,
  PopoverContent: () => PopoverContent,
  PopoverTrigger: () => PopoverTrigger,
  Progress: () => Progress,
  Radio: () => Radio,
  RadioGroup: () => RadioGroup,
  ScopeList: () => ScopeList,
  SearchInput: () => SearchInput,
  SecretDisplay: () => SecretDisplay,
  Select: () => Select,
  Skeleton: () => Skeleton,
  Slider: () => Slider,
  SocialButton: () => SocialButton,
  SocialButtons: () => SocialButtons,
  SocialDivider: () => SocialDivider,
  Sparkline: () => Sparkline,
  Spinner: () => Spinner,
  SplitPane: () => SplitPane,
  StackedBarChart: () => StackedBarChart,
  Stat: () => Stat,
  StatGrid: () => StatGrid,
  Stepper: () => Stepper,
  Switch: () => Switch,
  Table: () => Table,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  TagInput: () => TagInput,
  TaskPanel: () => TaskPanel,
  TenantSwitcher: () => TenantSwitcher,
  Textarea: () => Textarea,
  TimeRangePicker: () => TimeRangePicker,
  ToastProvider: () => ToastProvider,
  Toolbar: () => Toolbar,
  Tooltip: () => Tooltip,
  TooltipProvider: () => TooltipProvider,
  TopologyGraph: () => TopologyGraph,
  TreeTable: () => TreeTable,
  TreeView: () => TreeView,
  UserCell: () => UserCell,
  UserMenu: () => UserMenu,
  UserSelector: () => UserSelector,
  VirtualList: () => VirtualList,
  buttonVariants: () => buttonVariants,
  cn: () => cn,
  diffLines: () => diffLines,
  en: () => en,
  format: () => format,
  highlight: () => highlight,
  matchesAccept: () => matchesAccept,
  useControllableState: () => useControllableState,
  useLaf: () => useLaf,
  useToast: () => useToast
});
module.exports = __toCommonJS(lib_exports);

// lib/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// lib/utils.ts
var React = __toESM(require("react"), 1);
function useControllableState({
  value,
  defaultValue,
  onChange
}) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== void 0;
  const current = controlled ? value : inner;
  const ref = React.useRef(current);
  ref.current = current;
  const set = React.useCallback(
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
var format = {
  bytes(n, locale) {
    const units = ["B", "KB", "MB", "GB", "TB", "PB"];
    let i = 0;
    let v = n;
    while (Math.abs(v) >= 1024 && i < units.length - 1) {
      v /= 1024;
      i++;
    }
    const num = new Intl.NumberFormat(locale, { maximumFractionDigits: i === 0 ? 0 : v < 10 ? 1 : 0 }).format(v);
    return `${num} ${units[i]}`;
  }
};
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

// lib/components/button.tsx
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)("btn", {
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_slot.Slot, { className: classes, ...props, children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type,
      className: classes,
      disabled: disabled || loading,
      "aria-busy": loading || void 0,
      ...props,
      children: [
        loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Loader2, { className: "animate-spin", "aria-hidden": true }) : leftIcon,
        children,
        rightIcon
      ]
    }
  );
}

// lib/components/form.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Field({ label, hint, error, htmlFor, className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: cn("form-group", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label", htmlFor, children: label }),
    children,
    error ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "field-error", role: "alert", children: error }) : hint ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "field-hint", children: hint }) : null
  ] });
}
function Input({ className, invalid, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: cn("search", className), children: [
    icon,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "search", className: "form-input", ...props })
  ] });
}
function Select({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("select", { className: cn("form-select", className), ...props });
}
function Checkbox({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: cn("check", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", ...props }),
    children
  ] });
}
function Switch({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: cn("check", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "switch", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", role: "switch", ...props }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", {})
    ] }),
    children
  ] });
}
function Radio({ children, hint, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: cn("radio", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "radio", ...props }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "radio-mark" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "radio-text", children: [
      children,
      hint && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "radio-hint", children: hint })
    ] })
  ] });
}
function RadioGroup({ name, value, onValueChange, options, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("fieldset", { className: cn("radio-group", className), "aria-label": rest["aria-label"], children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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

// lib/components/display.tsx
var import_lucide_react2 = require("lucide-react");
var React2 = __toESM(require("react"), 1);
var import_jsx_runtime3 = require("react/jsx-runtime");
var alertIcon = { error: import_lucide_react2.XCircle, success: import_lucide_react2.CheckCircle2, warning: import_lucide_react2.AlertTriangle, info: import_lucide_react2.Info };
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
  const Icon = alertIcon[tone];
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      className: cn("alert", alertClass[tone], className),
      role: tone === "error" || tone === "warning" ? "alert" : "status",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "alert-icon", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { "aria-hidden": true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children })
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: cn("badge", badgeClass[tone], plain && "plain", className), children });
}
function Avatar({
  name,
  src,
  size = "md",
  className
}) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  const sizing = size === "sm" ? "size-5 text-[0.625rem]" : size === "lg" ? "size-10 text-base" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: cn("avatar", sizing, className), title: name, children: src ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src, alt: name, className: "size-full rounded-[inherit] object-cover" }) : initials });
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: cn("card", className), ...props });
}
function Panel({
  title,
  actions,
  children,
  className,
  bodyClassName
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: cn("panel", className), children: [
    (title || actions) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { className: "panel-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "panel-title", children: title }),
      actions
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: cn("panel-body", bodyClassName), children })
  ] });
}
function Stat({
  label,
  value,
  delta,
  down
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "stat", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "stat-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "stat-value", children: value }),
    delta && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: cn("stat-delta", down && "down"), children: delta })
  ] });
}
function StatGrid({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "stat-grid", children });
}
function EmptyState({
  icon,
  title,
  description,
  action
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "empty", children: [
    icon,
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: title }),
    description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: description }),
    action
  ] });
}
function Breadcrumb({ items, maxItems }) {
  const [expanded, setExpanded] = React2.useState(false);
  const collapsed = !expanded && maxItems !== void 0 && maxItems >= 2 && items.length > maxItems;
  const hidden = collapsed ? items.length - (maxItems - 1) : 0;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("nav", { className: "breadcrumb", "aria-label": "Breadcrumb", children: items.map((it, i) => {
    if (collapsed && i > 0 && i <= hidden) {
      return i === 1 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", "aria-label": `Show ${hidden} hidden levels`, onClick: () => setExpanded(true), className: "border-0 bg-transparent p-0 text-muted", children: "\u2026" }) }, "more") : null;
    }
    return i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: it.href, children: it.label }, it.label) : i === items.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-fg", "aria-current": "page", children: it.label }, it.label) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: it.href, children: it.label }) }, it.label);
  }) });
}
function PageHead({
  title,
  description,
  actions,
  breadcrumb
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mb-6", children: [
    breadcrumb && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mb-2", children: breadcrumb }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "page-head !mb-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", { children: title }),
        description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: description })
      ] }),
      actions && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex gap-2.5", children: actions })
    ] })
  ] });
}

// lib/components/overlay.tsx
var DialogPrimitive = __toESM(require("@radix-ui/react-dialog"), 1);
var DropdownPrimitive = __toESM(require("@radix-ui/react-dropdown-menu"), 1);
var PopoverPrimitive = __toESM(require("@radix-ui/react-popover"), 1);
var TabsPrimitive = __toESM(require("@radix-ui/react-tabs"), 1);
var TooltipPrimitive = __toESM(require("@radix-ui/react-tooltip"), 1);
var import_lucide_react3 = require("lucide-react");

// lib/i18n.tsx
var React3 = __toESM(require("react"), 1);
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  autoRefresh: "Auto refresh"
};
var LafContext = React3.createContext({ locale: "en", t: en });
function LafProvider({
  locale = "en",
  messages,
  children
}) {
  const value = React3.useMemo(() => ({ locale, t: { ...en, ...messages } }), [locale, messages]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LafContext.Provider, { value, children });
}
function useLaf() {
  return React3.useContext(LafContext);
}

// lib/components/overlay.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
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
  const { t: laf } = useLaf();
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(DialogPrimitive.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DialogPrimitive.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      DialogPrimitive.Content,
      {
        className: cn("popup fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2", className),
        ...description ? {} : { "aria-describedby": void 0 },
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "popup-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DialogPrimitive.Title, { className: "popup-title", children: title }),
              description && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DialogPrimitive.Description, { className: "popup-sub", children: description })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DialogPrimitive.Close, { className: "popup-close", "aria-label": laf.close, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react3.X, { className: "size-4", "aria-hidden": true }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "popup-body", children }),
          footer && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "popup-foot", children: footer })
        ]
      }
    )
  ] });
}
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverClose = PopoverPrimitive.Close;
function PopoverContent({
  title,
  footer,
  children,
  className,
  align = "start",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PopoverPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    PopoverPrimitive.Content,
    {
      align,
      sideOffset: 8,
      className: cn("popover-panel relative! top-auto! left-auto! z-30", className),
      ...props,
      children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "popover-title", children: title }),
        children,
        footer && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "popover-foot", children: footer }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PopoverPrimitive.Arrow, { className: "fill-menu stroke-line-strong", width: 12, height: 6 })
      ]
    }
  ) });
}
var DropdownMenu = DropdownPrimitive.Root;
var DropdownMenuTrigger = DropdownPrimitive.Trigger;
function DropdownMenuContent({
  className,
  align = "end",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DropdownPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    DropdownPrimitive.Content,
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    DropdownPrimitive.Item,
    {
      className: cn("dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg", danger && "danger", className),
      ...props
    }
  );
}
function DropdownMenuLabel({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DropdownPrimitive.Label, { className: cn("dropdown-label", className), ...props });
}
function DropdownMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DropdownPrimitive.Separator, { className: cn("dropdown-sep", className), ...props });
}
var Tabs = TabsPrimitive.Root;
var TabsContent = TabsPrimitive.Content;
function TabsList({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TabsPrimitive.List, { className: cn("tabs", className), ...props });
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(TooltipPrimitive.Root, { delayDuration: 400, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TooltipPrimitive.Trigger, { asChild: true, children }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TooltipPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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

// lib/components/data.tsx
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime6 = require("react/jsx-runtime");
function Toolbar({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cn("toolbar", className), ...props });
}
function Table({ className, children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "table-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("table", { className: cn("table", className), ...props, children }) });
}
function UserCell({ name, email }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "cell-user", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Avatar, { name }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: name }),
      email && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "cell-sub", children: email })
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("nav", { className: "pagination", "aria-label": t.pagination, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: from !== void 0 ? t.showing(from, to, total) : t.pageOf(page, pageCount) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "pages", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "page-btn", "aria-label": t.previousPage, disabled: page <= 1, onClick: () => onPageChange(page - 1), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react4.ChevronLeft, { className: "size-4", "aria-hidden": true }) }),
      pageWindow(page, pageCount).map(
        (p, i) => p === "\u2026" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "page-btn border-transparent bg-transparent", children: "\u2026" }, `gap${i}`) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "page-btn", "aria-label": t.nextPage, disabled: page >= pageCount, onClick: () => onPageChange(page + 1), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react4.ChevronRight, { className: "size-4", "aria-hidden": true }) })
    ] })
  ] });
}
function AdminShell({
  sidebar,
  topbar,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "admin", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("aside", { className: "admin-side", children: sidebar }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "admin-main", children: [
      topbar && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("header", { className: "admin-top", children: topbar }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("main", { className: "admin-content", children })
    ] })
  ] });
}
function NavGroup({ label }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "nav-group", children: label });
}
function NavLink({
  icon,
  current,
  badge,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("a", { className: cn("nav-link", className), "aria-current": current ? "page" : void 0, ...props, children: [
    icon,
    children,
    badge
  ] });
}

// lib/components/pickers.tsx
var import_lucide_react5 = require("lucide-react");
var React4 = __toESM(require("react"), 1);
var import_jsx_runtime7 = require("react/jsx-runtime");
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
  const id = React4.useId();
  const [query, setQuery] = React4.useState("");
  const [open, setOpen] = React4.useState(false);
  const [options, setOptions] = React4.useState([]);
  const [loading, setLoading] = React4.useState(false);
  const [active, setActive] = React4.useState(0);
  const root = React4.useRef(null);
  const limitReached = max !== void 0 && value.length >= max;
  React4.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    const t2 = setTimeout(async () => {
      const res = await onSearch(query);
      if (!cancelled) {
        setOptions(res);
        setActive(0);
        setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t2);
    };
  }, [query, open, onSearch]);
  React4.useEffect(() => {
    const close = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const selected = (u) => value.some((v) => v.id === u.id);
  const toggle = (u) => {
    if (selected(u)) onChange(value.filter((v) => v.id !== u.id));
    else if (!multiple) {
      onChange([u]);
      setOpen(false);
    } else if (!limitReached) onChange([...value, u]);
    setQuery("");
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && open && options[active]) {
      e.preventDefault();
      toggle(options[active]);
    } else if (e.key === "Escape") setOpen(false);
    else if (e.key === "Backspace" && !query && value.length) onChange(value.slice(0, -1));
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "selector", ref: root, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "selector-field", onClick: () => setOpen(true), children: [
      value.map((u) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "chip", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Avatar, { name: u.name, size: "sm" }),
        u.name,
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", "aria-label": t.removeItem(u.name), disabled, onClick: () => toggle(u), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react5.X, { className: "size-3", "aria-hidden": true }) })
      ] }, u.id)),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "input",
        {
          role: "combobox",
          "aria-label": label,
          "aria-expanded": open,
          "aria-controls": `${id}-list`,
          "aria-activedescendant": open && options[active] ? `${id}-${options[active].id}` : void 0,
          "aria-autocomplete": "list",
          disabled,
          value: query,
          placeholder: value.length ? "" : placeholder,
          onChange: (e) => {
            setQuery(e.target.value);
            setOpen(true);
          },
          onFocus: () => setOpen(true),
          onKeyDown
        }
      )
    ] }),
    open && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "selector-menu", role: "listbox", id: `${id}-list`, "aria-multiselectable": multiple, children: [
      limitReached && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "px-3 py-2 text-xs text-warn", children: [
        "Limit of ",
        max,
        " reached"
      ] }),
      loading && !options.length ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "px-3 py-2 text-sm text-muted", children: "Searching\u2026" }) : options.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "px-3 py-2 text-sm text-muted", children: [
        "No users match \u201C",
        query,
        "\u201D"
      ] }) : options.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
        "button",
        {
          id: `${id}-${u.id}`,
          type: "button",
          role: "option",
          "aria-selected": selected(u),
          className: cn("option", i === active && "is-active"),
          onMouseEnter: () => setActive(i),
          onClick: () => toggle(u),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Avatar, { name: u.name }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "option-main", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "option-title", children: u.name }),
              u.email && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "option-sub", children: u.email })
            ] })
          ]
        },
        u.id
      ))
    ] })
  ] });
}
var deviceIcon = { phone: import_lucide_react5.Smartphone, laptop: import_lucide_react5.Laptop, tablet: import_lucide_react5.Tablet, key: import_lucide_react5.KeyRound };
function DeviceSelector({
  devices,
  value,
  onValueChange,
  name,
  legend
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("fieldset", { className: "device-list border-0 p-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("legend", { className: "sr-only", children: legend }),
    devices.map((d) => {
      const Icon = deviceIcon[d.kind];
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "device-option", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", { type: "radio", name, value: d.id, checked: value === d.id, onChange: () => onValueChange(d.id) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "device-icon", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { "aria-hidden": true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "device-meta", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "device-name", children: d.name }),
          d.detail && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "device-sub", children: d.detail })
        ] }),
        d.badge,
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "device-radio", "aria-hidden": true })
      ] }, d.id);
    })
  ] });
}

// lib/components/audit.tsx
var React5 = __toESM(require("react"), 1);
var import_jsx_runtime8 = require("react/jsx-runtime");
var iconTone = { ok: "ok", warn: "warn", danger: "danger", neutral: "" };
var badgeTone = { ok: "ok", warn: "warn", danger: "danger", neutral: "neutral" };
function AuditLog({ events }) {
  const days = [...new Set(events.map((e) => e.day))];
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "audit", children: days.map((day) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(React5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "audit-day", children: day }),
    events.filter((e) => e.day === day).map((e) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("details", { className: "audit-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("summary", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "audit-time", children: e.time }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: cn("audit-icon", iconTone[e.severity]), children: e.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "audit-event", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("b", { children: e.actor }),
          " ",
          e.action,
          e.target && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("small", { children: e.target })
        ] }),
        e.result ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Badge, { tone: badgeTone[e.severity], children: e.result }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", {})
      ] }),
      e.details && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("dl", { className: "audit-detail", children: Object.entries(e.details).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("dt", { children: k }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("dd", { children: v })
      ] }, k)) })
    ] }, e.id))
  ] }, day)) });
}

// lib/components/feedback.tsx
var import_lucide_react6 = require("lucide-react");
var React6 = __toESM(require("react"), 1);
var import_jsx_runtime9 = require("react/jsx-runtime");
function Spinner({
  size = "md",
  label: labelProp,
  className
}) {
  const { t: laf } = useLaf();
  const label = labelProp ?? laf.loading;
  const sizing = size === "sm" ? "size-4" : size === "lg" ? "size-8" : "size-5";
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { role: "status", className: cn("inline-flex", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react6.Loader2, { className: cn("animate-spin text-primary motion-reduce:animate-none", sizing), "aria-hidden": true }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "sr-only", children: label })
  ] });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      "aria-hidden": true,
      className: cn("h-4 animate-pulse rounded-sm bg-muted-bg motion-reduce:animate-none", className),
      ...props
    }
  );
}
var toastIcon = {
  success: { Icon: import_lucide_react6.CheckCircle2, className: "text-ok" },
  error: { Icon: import_lucide_react6.XCircle, className: "text-danger" },
  warning: { Icon: import_lucide_react6.AlertTriangle, className: "text-warn" },
  info: { Icon: import_lucide_react6.Info, className: "text-primary" }
};
var ToastContext = React6.createContext(null);
function useToast() {
  const ctx = React6.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
function ToastView({ item, onDismiss }) {
  const tone = item.tone ?? "info";
  const duration = item.duration ?? (tone === "error" ? 8e3 : 4e3);
  const [paused, setPaused] = React6.useState(false);
  React6.useEffect(() => {
    if (paused || duration === 0) return;
    const t = window.setTimeout(() => onDismiss(item.id), duration);
    return () => window.clearTimeout(t);
  }, [paused, duration, item.id, onDismiss]);
  const { Icon, className } = toastIcon[tone];
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "div",
    {
      className: "toast pointer-events-auto",
      role: tone === "error" ? "alert" : "status",
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: () => setPaused(false),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { className: cn("size-4 shrink-0", className), "aria-hidden": true }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "min-w-0 flex-1", children: item.title }),
        item.action && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  const [items, setItems] = React6.useState([]);
  const nextId = React6.useRef(0);
  const dismiss = React6.useCallback((id) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);
  const toast = React6.useCallback((options) => {
    const id = ++nextId.current;
    setItems((list) => [...list, { ...options, id }]);
    return id;
  }, []);
  const value = React6.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ToastContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "pointer-events-none fixed right-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ToastView, { item, onDismiss: dismiss }, item.id)) })
  ] });
}

// lib/components/auth.tsx
var import_lucide_react7 = require("lucide-react");
var React7 = __toESM(require("react"), 1);
var import_jsx_runtime10 = require("react/jsx-runtime");
function BrandHeader({
  icon,
  logoSrc,
  name,
  title,
  subtitle,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("header", { className: cn("header", className), children: [
    logoSrc ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("img", { src: logoSrc, alt: name ?? "", className: "logo mx-auto" }) : icon && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "brand-icon", "aria-hidden": true, children: icon }),
    name && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "brand-name", children: name }),
    title && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h1", { className: "page-title", children: title }),
    subtitle && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "page-subtitle", children: subtitle })
  ] });
}
function SocialDivider({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "social-divider", role: "separator", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children }) });
}
function SocialButtons({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cn("social-buttons", className), ...props });
}
function SocialButton({
  icon,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("a", { className: cn("btn-social", className), ...props, children: [
    icon,
    children
  ] });
}
function AccountList({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cn("account-list", className), ...props });
}
function AccountItem({
  name,
  email,
  avatarSrc,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("button", { type: "submit", className: cn("account-item", className), ...props, children: [
    avatarSrc ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("img", { src: avatarSrc, alt: "", className: "account-avatar" }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "account-avatar account-avatar-initial", "aria-hidden": true, children: name.charAt(0) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "account-details", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "account-name", children: name }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "account-email", children: email })
    ] })
  ] });
}
function ClientInfo({
  name,
  description,
  logoSrc,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: cn("client-info", className), children: [
    logoSrc ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("img", { src: logoSrc, alt: "", className: "client-logo" }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "client-logo-placeholder", "aria-hidden": true, children: name.charAt(0).toUpperCase() }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "client-details", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "client-name", children: name }),
      description && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "client-description", children: description })
    ] })
  ] });
}
function ScopeList({
  scopes,
  icon,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ul", { className: cn("scope-list", className), children: scopes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("li", { className: "scope-item", children: [
    icon ?? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react7.Check, { className: "scope-icon", "aria-hidden": true }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { children: s.description })
  ] }, s.id)) });
}
function OtpInput({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  className,
  ...props
}) {
  const [inner, setInner] = React7.useState(defaultValue);
  const current = value ?? inner;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "input",
    {
      type: "text",
      inputMode: "numeric",
      autoComplete: "one-time-code",
      pattern: `[0-9]{${length}}`,
      maxLength: length,
      "aria-label": "One-time code",
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
  copyLabel = "Copy code",
  copiedLabel = "Copied",
  className
}) {
  const [copied, setCopied] = React7.useState(false);
  React7.useEffect(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: cn("flex items-stretch gap-2", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("output", { className: "code-display flex-1 select-all", children: code }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "button",
      {
        type: "button",
        className: "btn btn-secondary auto",
        onClick: copy,
        "aria-label": copied ? copiedLabel : copyLabel,
        children: copied ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react7.Check, { "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react7.Copy, { "aria-hidden": true })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "sr-only", role: "status", children: copied ? copiedLabel : "" })
  ] });
}
function DeviceSteps({ steps, current, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ol", { className: cn("device-steps", className), children: steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: cn("info-box", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "info-box-title", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ul", { children: items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("li", { children: item }, i)) })
  ] });
}
function LanguageSwitcher({
  languages,
  current,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("nav", { className: cn("lang-switch", className), "aria-label": "Language", children: languages.map((l) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("footer", { className: cn("footer", className), children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { className: "footer-text", children: [
    icon,
    children
  ] }) });
}

// lib/components/helpers.tsx
var import_lucide_react8 = require("lucide-react");
var React8 = __toESM(require("react"), 1);
var import_jsx_runtime11 = require("react/jsx-runtime");
function CopyButton({
  value,
  label: labelProp,
  copiedLabel: copiedLabelProp,
  className
}) {
  const { t } = useLaf();
  const label = labelProp ?? t.copy;
  const copiedLabel = copiedLabelProp ?? t.copied;
  const [copied, setCopied] = React8.useState(false);
  React8.useEffect(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: cn("shrink-0", className),
        onClick: copy,
        "aria-label": copied ? copiedLabel : label,
        children: copied ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react8.Check, { "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react8.Copy, { "aria-hidden": true })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "sr-only", role: "status", children: copied ? copiedLabel : "" })
  ] });
}
function PasswordField({
  showLabel: showLabelProp,
  hideLabel: hideLabelProp,
  capsLockHint: capsLockHintProp,
  className,
  onKeyUp,
  onBlur,
  ...props
}) {
  const { t } = useLaf();
  const showLabel = showLabelProp ?? t.showPassword;
  const hideLabel = hideLabelProp ?? t.hidePassword;
  const capsLockHint = capsLockHintProp ?? t.capsLock;
  const [visible, setVisible] = React8.useState(false);
  const [caps, setCaps] = React8.useState(false);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "grid gap-1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        Input,
        {
          type: visible ? "text" : "password",
          className: cn("pe-10", className),
          onKeyUp: (e) => {
            setCaps(e.getModifierState("CapsLock"));
            onKeyUp?.(e);
          },
          onBlur: (e) => {
            setCaps(false);
            onBlur?.(e);
          },
          ...props
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "button",
        {
          type: "button",
          className: "absolute inset-y-0 end-0 flex w-10 items-center justify-center text-muted hover:text-fg",
          "aria-pressed": visible,
          "aria-label": visible ? hideLabel : showLabel,
          onClick: () => setVisible((v) => !v),
          children: visible ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react8.EyeOff, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react8.Eye, { className: "size-4", "aria-hidden": true })
        }
      )
    ] }),
    caps && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "field-hint", role: "status", children: capsLockHint })
  ] });
}
function DefinitionList({
  items,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dl", { className: cn("grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2", className), children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "min-w-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dt", { className: "mb-0.5 text-[0.6875rem] tracking-wider text-subtle uppercase", children: it.label }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("dd", { className: cn("flex items-center gap-1 text-sm text-fg", it.mono && "font-mono break-all"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "min-w-0", children: it.value ?? "\u2014" }),
      it.copy && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(CopyButton, { value: it.copy })
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
  cancelLabel = "Cancel",
  confirmText,
  confirmTextLabel = "Type to confirm",
  pending,
  onConfirm
}) {
  const [typed, setTyped] = React8.useState("");
  React8.useEffect(() => {
    if (!open) setTyped("");
  }, [open]);
  const blocked = confirmText !== void 0 && typed !== confirmText;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Dialog, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    DialogContent,
    {
      role: "alertdialog",
      title,
      footer: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DialogClose, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Button, { variant: "secondary", size: "sm", autoFocus: true, children: cancelLabel }) }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Button, { variant: "danger", size: "sm", loading: pending, disabled: blocked, onClick: onConfirm, children: confirmLabel })
      ] }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: description }),
        items && items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ul", { className: "mt-3 max-h-32 list-disc overflow-auto ps-5 text-fg", children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("li", { children: it }, it)) }),
        confirmText !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("label", { className: "mt-3 grid gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "form-label", children: [
            confirmTextLabel,
            ": ",
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("b", { className: "font-mono text-fg", children: confirmText })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Input, { value: typed, onChange: (e) => setTyped(e.target.value), autoComplete: "off" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "div",
    {
      role: meter ? "meter" : "progressbar",
      "aria-label": label,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuenow": value,
      className: cn("h-1.5 overflow-hidden rounded-sm bg-muted-bg", className),
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("ol", { className: cn("flex flex-col gap-2", className), children: steps.map((s, i) => {
    const done = i < current;
    const active = i === current;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("li", { "aria-current": active ? "step" : void 0, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "span",
            {
              className: cn(
                "flex size-5.5 shrink-0 items-center justify-center rounded-sm border text-xs font-semibold",
                s.error ? "border-danger text-danger" : done ? "border-primary bg-primary text-on-primary" : active ? "border-primary text-primary" : "border-line-strong"
              ),
              children: done && !s.error ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react8.Check, { className: "size-3.5", "aria-hidden": true }) : i + 1
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "grid gap-2.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "form-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("output", { className: "code-display min-w-0 flex-1 text-base tracking-normal break-all select-all", children: shown }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(CopyButton, { value, label: `${laf.copy} ${label}` })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("label", { className: "flex items-center gap-2 text-sm text-muted", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("input", { type: "checkbox", checked: acknowledged, onChange: (e) => onAcknowledge?.(e.target.checked) }),
      acknowledgeLabel
    ] })
  ] });
}

// lib/components/inventory.tsx
var import_lucide_react9 = require("lucide-react");
var PopoverPrimitive2 = __toESM(require("@radix-ui/react-popover"), 1);
var React9 = __toESM(require("react"), 1);
var import_jsx_runtime12 = require("react/jsx-runtime");
function Combobox({
  options,
  value,
  onChange,
  multiple,
  label,
  placeholder,
  emptyText: emptyTextProp,
  loadingText: loadingTextProp,
  disabled
}) {
  const { t } = useLaf();
  const emptyText = emptyTextProp ?? t.noResults;
  const loadingText = loadingTextProp ?? `${t.loading}\u2026`;
  const id = React9.useId();
  const [query, setQuery] = React9.useState("");
  const [open, setOpen] = React9.useState(false);
  const [list, setList] = React9.useState([]);
  const [loading, setLoading] = React9.useState(false);
  const [active, setActive] = React9.useState(0);
  const root = React9.useRef(null);
  React9.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    const t2 = window.setTimeout(
      async () => {
        const res = typeof options === "function" ? await options(query) : options.filter((o) => (o.label + (o.description ?? "")).toLowerCase().includes(query.toLowerCase()));
        if (!cancelled) {
          setList(res);
          setActive(0);
          setLoading(false);
        }
      },
      typeof options === "function" ? 250 : 0
    );
    return () => {
      cancelled = true;
      window.clearTimeout(t2);
    };
  }, [query, open, options]);
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
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && open && list[active]) {
      e.preventDefault();
      pick(list[active]);
    } else if (e.key === "Escape") setOpen(false);
    else if (e.key === "Backspace" && !query && value.length) onChange(value.slice(0, -1));
  };
  const listId = `${id}-list`;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(PopoverPrimitive2.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(PopoverPrimitive2.Anchor, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { ref: root, className: "relative", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", children: [
      value.map((v) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "inline-flex h-6 items-center gap-1 rounded-sm border border-line bg-muted-bg px-2 text-xs", children: [
        v.label,
        multiple && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", "aria-label": t.removeItem(v.label), className: "text-muted hover:text-fg", onClick: () => pick(v), children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react9.X, { className: "size-3", "aria-hidden": true }) })
      ] }, v.value)),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "input",
        {
          role: "combobox",
          "aria-label": label,
          "aria-expanded": open,
          "aria-controls": listId,
          "aria-autocomplete": "list",
          "aria-activedescendant": open && list[active] ? `${id}-${active}` : void 0,
          className: "min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none",
          placeholder: value.length && multiple ? void 0 : placeholder,
          disabled,
          value: query,
          onChange: (e) => {
            setQuery(e.target.value);
            setOpen(true);
          },
          onFocus: () => setOpen(true),
          onKeyDown
        }
      )
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(PopoverPrimitive2.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      PopoverPrimitive2.Content,
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
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("ul", { id: listId, role: "listbox", "aria-multiselectable": multiple || void 0, className: "dropdown-menu max-h-64 w-full overflow-auto", children: loading ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("li", { className: "px-3 py-2 text-sm text-muted", children: loadingText }) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("li", { className: "px-3 py-2 text-sm text-muted", children: emptyText }) : list.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
          "li",
          {
            id: `${id}-${i}`,
            role: "option",
            "aria-selected": isSelected(o),
            className: cn("dropdown-item cursor-pointer", i === active && "bg-surface-hover text-fg", isSelected(o) && "font-semibold"),
            onMouseEnter: () => setActive(i),
            onMouseDown: (e) => e.preventDefault(),
            onClick: () => pick(o),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: o.label }),
              o.description && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "ms-2 text-xs text-subtle", children: o.description })
            ]
          },
          o.value
        )) })
      }
    ) })
  ] });
}
function flatten(nodes, expanded, level = 1, out = []) {
  nodes.forEach((node, i) => {
    out.push({ node, level, set: nodes.length, pos: i + 1 });
    if (node.children?.length && expanded.has(node.id)) flatten(node.children, expanded, level + 1, out);
  });
  return out;
}
function TreeView({ nodes, label, expanded: expandedProp, defaultExpanded = [], onExpandedChange, selected: selectedProp, defaultSelected, onSelect: onSelectProp, className }) {
  const [expanded, setExpanded] = useControllableState({ value: expandedProp, defaultValue: defaultExpanded, onChange: onExpandedChange });
  const [selected, setSelected] = useControllableState({ value: selectedProp, defaultValue: defaultSelected });
  const onSelect = (id) => {
    setSelected(id);
    onSelectProp?.(id);
  };
  const open = React9.useMemo(() => new Set(expanded), [expanded]);
  const rows = React9.useMemo(() => flatten(nodes, open), [nodes, open]);
  const [focusId, setFocusId] = React9.useState(selected ?? rows[0]?.node.id);
  const refs = React9.useRef(/* @__PURE__ */ new Map());
  const parentOf = (id) => {
    const find = (list, parent) => {
      for (const n of list) {
        if (n.id === id) return parent;
        const r = n.children && find(n.children, n);
        if (r) return r;
      }
    };
    return find(nodes);
  };
  const toggle = (id, to) => setExpanded(to ? [.../* @__PURE__ */ new Set([...expanded, id])] : expanded.filter((e) => e !== id));
  const move = (id) => {
    setFocusId(id);
    refs.current.get(id)?.focus();
  };
  const onKeyDown = (e, idx) => {
    const { node } = rows[idx];
    const hasKids = !!node.children?.length;
    if (e.key === "ArrowDown") move(rows[Math.min(idx + 1, rows.length - 1)].node.id);
    else if (e.key === "ArrowUp") move(rows[Math.max(idx - 1, 0)].node.id);
    else if (e.key === "Home") move(rows[0].node.id);
    else if (e.key === "End") move(rows[rows.length - 1].node.id);
    else if (e.key === "ArrowRight") {
      if (hasKids && !open.has(node.id)) toggle(node.id, true);
      else if (hasKids) move(node.children[0].id);
    } else if (e.key === "ArrowLeft") {
      if (hasKids && open.has(node.id)) toggle(node.id, false);
      else {
        const p = parentOf(node.id);
        if (p) move(p.id);
      }
    } else if (e.key === "Enter" || e.key === " ") onSelect?.(node.id);
    else return;
    e.preventDefault();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { role: "tree", "aria-label": label, className, children: rows.map(({ node, level, set, pos }, idx) => {
    const hasKids = !!node.children?.length;
    const isOpen = open.has(node.id);
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      "div",
      {
        ref: (el) => {
          if (el) refs.current.set(node.id, el);
          else refs.current.delete(node.id);
        },
        role: "treeitem",
        "aria-level": level,
        "aria-setsize": set,
        "aria-posinset": pos,
        "aria-expanded": hasKids ? isOpen : void 0,
        "aria-selected": selected === node.id,
        tabIndex: focusId === node.id ? 0 : -1,
        onFocus: () => setFocusId(node.id),
        onKeyDown: (e) => onKeyDown(e, idx),
        onClick: () => onSelect?.(node.id),
        className: cn(
          "flex h-7 cursor-pointer items-center gap-1.5 rounded-sm border-s-2 border-transparent pe-2 text-sm text-muted outline-none hover:bg-surface-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary",
          selected === node.id && "border-primary bg-primary-light text-fg"
        ),
        style: { paddingInlineStart: `${(level - 1) * 16 + 4}px` },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "span",
            {
              className: "flex size-4 shrink-0 items-center justify-center",
              onClick: (e) => {
                if (!hasKids) return;
                e.stopPropagation();
                toggle(node.id, !isOpen);
              },
              children: hasKids && (isOpen ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react9.ChevronDown, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react9.ChevronRight, { className: "size-4", "aria-hidden": true }))
            }
          ),
          node.icon && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "flex size-4 shrink-0 items-center justify-center [&>svg]:size-4", children: node.icon }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "min-w-0 flex-1 truncate", children: node.label }),
          node.badge
        ]
      },
      node.id
    );
  }) });
}
function DataGrid({
  columns,
  rows,
  rowId,
  sort,
  onSortChange,
  selected,
  onSelectedChange,
  loading,
  emptyTitle = "Nothing here",
  emptyDescription
}) {
  const { t: laf } = useLaf();
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
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(Table, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("tr", { children: [
        selectable && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { className: "w-10", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
        columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "th",
          {
            className: cn(c.numeric && "text-end"),
            "aria-sort": sort?.id === c.id ? sort.dir === "asc" ? "ascending" : "descending" : c.sortable ? "none" : void 0,
            children: c.sortable ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("button", { type: "button", className: "inline-flex items-center gap-1 font-[inherit] uppercase hover:text-fg", onClick: () => cycle(c.id), children: [
              c.header,
              sort?.id === c.id && (sort.dir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react9.ArrowUp, { className: "size-3", "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react9.ArrowDown, { className: "size-3", "aria-hidden": true }))
            ] }) : c.header
          },
          c.id
        ))
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("tbody", { "aria-busy": loading || void 0, children: loading ? Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("tr", { children: Array.from({ length: columns.length + (selectable ? 1 : 0) }, (_2, j) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Skeleton, {}) }, j)) }, i)) : rows.map((row) => {
        const id = rowId(row);
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("tr", { "aria-selected": selectable ? sel.has(id) : void 0, children: [
          selectable && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "input",
            {
              type: "checkbox",
              "aria-label": laf.selectRow,
              checked: sel.has(id),
              onChange: () => onSelectedChange(sel.has(id) ? selected.filter((s) => s !== id) : [...selected ?? [], id])
            }
          ) }),
          columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { className: cn(c.numeric && "text-end font-mono"), children: c.cell(row) }, c.id))
        ] }, id);
      }) })
    ] }),
    !loading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(EmptyState, { title: emptyTitle, description: emptyDescription })
  ] });
}
var taskTone = { queued: "neutral", running: "primary", ok: "ok", failed: "danger", cancelled: "warn" };
function TaskPanel({
  tasks,
  onCancel,
  onRetry,
  labels = { cancel: "Cancel", retry: "Retry", empty: "No recent tasks" }
}) {
  if (tasks.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "px-4 py-6 text-center text-sm text-muted", children: labels.empty });
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("ul", { className: "divide-y divide-line rounded-lg border border-line bg-surface", children: tasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("li", { className: "grid gap-1.5 px-4 py-3 text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "min-w-0 flex-1 truncate font-medium text-fg", children: [
        t.name,
        t.target && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "ms-2 font-normal text-muted", children: t.target })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { "aria-live": "polite", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Badge, { tone: taskTone[t.status], children: t.status }) }),
      t.status === "running" && onCancel && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", className: "text-primary hover:underline", onClick: () => onCancel(t.id), children: labels.cancel }),
      t.status === "failed" && onRetry && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", className: "text-primary hover:underline", onClick: () => onRetry(t.id), children: labels.retry })
    ] }),
    t.status === "running" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Progress, { label: t.name, value: t.progress }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "font-mono text-xs text-subtle", children: [t.initiator, t.started].filter(Boolean).join(" \xB7 ") }),
    t.error && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "text-xs text-danger", children: t.error })
  ] }, t.id)) });
}
function UserMenu({
  name,
  email,
  tenant,
  items,
  signOutLabel = "Sign out",
  onSignOut
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(DropdownMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { "aria-label": name, className: "border-0 bg-transparent p-0", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Avatar, { name }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(DropdownMenuContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(DropdownMenuLabel, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "text-fg", children: name }),
        email && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "text-xs font-normal text-muted", children: email }),
        tenant && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "text-xs font-normal text-subtle", children: tenant })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(DropdownMenuSeparator, {}),
      items?.map((it) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(DropdownMenuItem, { onSelect: it.onSelect, children: [
        it.icon,
        it.label
      ] }, it.id)),
      items && items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(DropdownMenuSeparator, {}),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(DropdownMenuItem, { danger: true, onSelect: onSignOut, children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react9.LogOut, { "aria-hidden": true }),
        signOutLabel
      ] })
    ] })
  ] });
}

// lib/components/extras.tsx
var import_lucide_react10 = require("lucide-react");
var React11 = __toESM(require("react"), 1);
var DialogPrimitive2 = __toESM(require("@radix-ui/react-dialog"), 1);

// lib/components/virtual.tsx
var React10 = __toESM(require("react"), 1);
var import_jsx_runtime13 = require("react/jsx-runtime");
function VirtualList({
  items,
  rowHeight,
  height,
  overscan = 8,
  renderRow,
  label,
  className
}) {
  const [top, setTop] = React10.useState(0);
  const start = Math.max(0, Math.floor(top / rowHeight) - overscan);
  const end = Math.min(items.length, Math.ceil((top + height) / rowHeight) + overscan);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "div",
    {
      role: "list",
      "aria-label": label,
      tabIndex: 0,
      className: cn("relative overflow-auto", className),
      style: { height },
      onScroll: (e) => setTop(e.currentTarget.scrollTop),
      children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { style: { height: items.length * rowHeight }, children: items.slice(start, end).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        "div",
        {
          role: "listitem",
          "aria-posinset": start + i + 1,
          "aria-setsize": items.length,
          className: "absolute inset-x-0",
          style: { top: (start + i) * rowHeight, height: rowHeight },
          children: renderRow(item, start + i)
        },
        start + i
      )) })
    }
  );
}

// lib/components/extras.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var bannerTone = {
  info: { cls: "border-primary/35 bg-primary-light text-primary", Icon: import_lucide_react10.Info },
  warn: { cls: "border-warn-line bg-warn-bg text-warn", Icon: import_lucide_react10.AlertTriangle },
  danger: { cls: "border-danger-line bg-danger-bg text-danger", Icon: import_lucide_react10.XCircle }
};
function Banner({
  tone = "info",
  action,
  onDismiss,
  dismissLabel = "Dismiss",
  children
}) {
  const { cls, Icon } = bannerTone[tone];
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { role: tone === "danger" ? "alert" : "status", className: cn("flex items-center gap-2.5 border-b px-4 py-2 text-sm", cls), children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { className: "size-4 shrink-0", "aria-hidden": true }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "min-w-0 flex-1", children }),
    action,
    onDismiss && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { type: "button", "aria-label": dismissLabel, onClick: onDismiss, className: "opacity-80 hover:opacity-100", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react10.X, { className: "size-4", "aria-hidden": true }) })
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
  const uid = React11.useId();
  const toggle = (id) => setOpen((o) => o.includes(id) ? o.filter((x) => x !== id) : multiple ? [...o, id] : [id]);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: cn("divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", className), children: items.map((it) => {
    const isOpen = open.includes(it.id);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
        "button",
        {
          type: "button",
          "aria-expanded": isOpen,
          "aria-controls": `${uid}-${it.id}`,
          onClick: () => toggle(it.id),
          className: "flex w-full items-center gap-2 px-4 py-3 text-start text-sm font-medium text-fg hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "flex-1", children: it.title }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react10.ChevronDown, { className: cn("size-4 transition-transform motion-reduce:transition-none", isOpen && "rotate-180"), "aria-hidden": true })
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { id: `${uid}-${it.id}`, hidden: !isOpen, className: "border-t border-line px-4 py-3 text-sm text-muted", children: it.content })
    ] }, it.id);
  }) });
}
function SplitPane({
  start,
  end,
  defaultSize = 280,
  min = 160,
  max = 600,
  label = "Resize panels",
  className
}) {
  const [size, setSize] = React11.useState(defaultSize);
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
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: cn("flex min-h-0 overflow-hidden rounded-lg border border-line bg-surface", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "shrink-0 overflow-auto", style: { width: size }, children: start }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "min-w-0 flex-1 overflow-auto", children: end })
  ] });
}
var Drawer = DialogPrimitive2.Root;
var DrawerTrigger = DialogPrimitive2.Trigger;
var DrawerClose = DialogPrimitive2.Close;
function DrawerContent({
  title,
  description,
  footer,
  width = "md",
  children
}) {
  const { t: laf } = useLaf();
  const w = { sm: "w-[360px]", md: "w-[480px]", lg: "w-[640px]" }[width];
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(DialogPrimitive2.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DialogPrimitive2.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      DialogPrimitive2.Content,
      {
        ...description ? {} : { "aria-describedby": void 0 },
        className: cn("fixed inset-y-0 end-0 z-50 flex max-w-full flex-col border-s border-line-strong bg-menu", w),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-start gap-3 border-b border-line px-5 py-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DialogPrimitive2.Title, { className: "text-base font-semibold text-fg", children: title }),
              description && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DialogPrimitive2.Description, { className: "text-sm text-muted", children: description })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(DialogPrimitive2.Close, { "aria-label": laf.close, className: "popup-close", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react10.X, { className: "size-4", "aria-hidden": true }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex-1 overflow-auto px-5 py-4 text-sm text-muted", children }),
          footer && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex justify-end gap-2.5 border-t border-line px-5 py-3.5", children: footer })
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
  const factor = units?.find((u) => u.label === unit)?.factor ?? 1;
  const shown = value / factor;
  const [text, setText] = React11.useState(String(shown));
  React11.useEffect(() => setText(String(shown)), [shown]);
  const commit = (n) => onChange(Math.min(max, Math.max(min, n * factor)));
  const bump = (d) => commit(shown + d * step);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "inline-flex items-stretch gap-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { type: "button", className: "btn btn-secondary btn-sm auto", "aria-label": `Decrease ${label}`, disabled: value <= min, onClick: () => bump(-1), children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react10.Minus, { "aria-hidden": true }) }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { type: "button", className: "btn btn-secondary btn-sm auto", "aria-label": `Increase ${label}`, disabled: value >= max, onClick: () => bump(1), children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react10.Plus, { "aria-hidden": true }) }),
    units && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("select", { className: "form-input w-20", "aria-label": `${label} unit`, value: unit, onChange: (e) => onUnitChange?.(e.target.value), children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("option", { children: u.label }, u.label)) })
  ] });
}
function Slider({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("input", { type: "range", className: cn("h-1 w-full cursor-pointer accent-primary", className), ...props });
}
function Chip({ onRemove, removeLabel, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "inline-flex h-6 items-center gap-1 rounded-sm border border-line bg-muted-bg px-2 text-xs text-fg", children: [
    children,
    onRemove && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { type: "button", "aria-label": removeLabel ?? "Remove", onClick: onRemove, className: "text-muted hover:text-fg", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react10.X, { className: "size-3", "aria-hidden": true }) })
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
  const [text, setText] = React11.useState("");
  const [error, setError] = React11.useState();
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
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "grid gap-1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: cn("form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", error && "error"), children: [
      value.map((t) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Chip, { removeLabel: laf.removeItem(t), onRemove: () => onChange(value.filter((v) => v !== t)), children: t }, t)),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
    error && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "field-error", role: "alert", children: error })
  ] });
}
function KeyValueEditor({
  value,
  onChange,
  addLabel = "Add",
  keyLabel = "Key",
  valueLabel = "Value",
  duplicateMessage = "Duplicate key"
}) {
  const { t: laf } = useLaf();
  const ids = React11.useRef([]);
  const next = React11.useRef(0);
  while (ids.current.length < value.length) ids.current.push(next.current++);
  ids.current.length = value.length;
  const set = (i, patch) => onChange(value.map((r, j) => j === i ? { ...r, ...patch } : r));
  const dup = (i) => value[i].key !== "" && value.findIndex((r) => r.key === value[i].key) !== i;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "grid gap-2", children: [
    value.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "grid grid-cols-[1fr_1fr_auto] items-start gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Input, { "aria-label": `${keyLabel} ${i + 1}`, className: "font-mono", invalid: dup(i), value: row.key, onChange: (e) => set(i, { key: e.target.value }) }),
        dup(i) && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "field-error", role: "alert", children: duplicateMessage })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Input, { "aria-label": `${valueLabel} ${i + 1}`, className: "font-mono", value: row.value, onChange: (e) => set(i, { value: e.target.value }) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { type: "button", className: "btn btn-ghost btn-sm auto", "aria-label": laf.removeRow(i + 1), onClick: () => {
        ids.current.splice(i, 1);
        onChange(value.filter((_, j) => j !== i));
      }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react10.X, { "aria-hidden": true }) })
    ] }, ids.current[i])),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { type: "button", className: "btn btn-secondary btn-sm auto", onClick: () => onChange([...value, { key: "", value: "" }]), children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react10.Plus, { "aria-hidden": true }),
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
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("svg", { viewBox: `0 0 ${w} ${h}`, role: "img", "aria-label": label, className: cn("h-6 w-24 text-primary", className), preserveAspectRatio: "none", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("polyline", { points: pts.join(" "), fill: "none", stroke: "currentColor", strokeWidth: "1.5", vectorEffect: "non-scaling-stroke" }) });
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
  const [hover, setHover] = React11.useState();
  const ticks = [0, 0.5, 1].map((t) => t * max);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("figure", { className: cn("m-0 max-w-xl", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
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
          ticks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("g", { className: "text-subtle", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("line", { x1: pad2.l, x2: w - pad2.r, y1: y(t), y2: y(t), stroke: "var(--border)" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("text", { x: pad2.l - 4, y: y(t) + 3, textAnchor: "end", fontSize: "9", fill: "currentColor", children: Math.round(t) })
          ] }, t)),
          xLabels.map(
            (l, i) => i % Math.ceil(n / 6) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("text", { x: x(i), y: h - 6, textAnchor: i === n - 1 ? "end" : i === 0 ? "start" : "middle", fontSize: "9", className: "fill-subtle", children: l }, i) : null
          ),
          series.map((s, si) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
          hover !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("line", { x1: x(hover), x2: x(hover), y1: pad2.t, y2: h - pad2.b, stroke: "var(--border-strong)" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("figcaption", { className: "mt-1 flex flex-wrap items-center gap-x-4 text-xs text-muted", "aria-live": "off", children: [
      series.map((s, si) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("svg", { width: "16", height: "4", className: SERIES_COLORS[si % 4], "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("line", { x1: "0", x2: "16", y1: "2", y2: "2", stroke: "currentColor", strokeWidth: "2", strokeDasharray: SERIES_DASH[si % 4] }) }),
        s.name,
        hover !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("b", { className: "font-mono text-fg", children: [
          s.data[hover],
          unit
        ] })
      ] }, s.name)),
      hover !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "ms-auto font-mono text-subtle", children: xLabels[hover] })
    ] })
  ] });
}
function TimeRangePicker({
  value,
  onChange,
  presets = ["15m", "1h", "24h", "7d"],
  refresh,
  onRefreshChange,
  label = "Time range"
}) {
  const { t: laf } = useLaf();
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { role: "group", "aria-label": label, className: "inline-flex items-center gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "inline-flex overflow-hidden rounded-md border border-line", children: presets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
    onRefreshChange && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("select", { className: "form-input w-24", "aria-label": laf.autoRefresh, value: refresh, onChange: (e) => onRefreshChange(e.target.value), children: ["off", "5s", "30s", "1m"].map((r) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("option", { children: r }, r)) })
  ] });
}
var levelCls = { info: "text-muted", warn: "text-warn", error: "text-danger" };
function LogViewer({ lines, label, follow = true, className }) {
  const { t: laf } = useLaf();
  const [query, setQuery] = React11.useState("");
  const [wrap, setWrap] = React11.useState(false);
  const box = React11.useRef(null);
  const shown = query ? lines.filter((l) => l.text.toLowerCase().includes(query.toLowerCase())) : lines;
  React11.useEffect(() => {
    if (follow && box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [shown.length, follow]);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: cn("overflow-hidden rounded-lg border border-line", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-3 border-b border-line bg-surface px-3 py-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("input", { type: "search", "aria-label": `${laf.search} ${label}`, placeholder: `${laf.search}\u2026`, className: "form-input h-8 max-w-xs", value: query, onChange: (e) => setQuery(e.target.value) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("label", { className: "check ms-auto text-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("input", { type: "checkbox", checked: wrap, onChange: (e) => setWrap(e.target.checked) }),
        "Wrap"
      ] })
    ] }),
    shown.length > 500 && !wrap ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      VirtualList,
      {
        label,
        items: shown,
        rowHeight: 20,
        height: 288,
        className: "bg-black/30 font-mono text-[0.8125rem]",
        renderRow: (l) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: cn("flex gap-3 px-3 whitespace-nowrap", levelCls[l.level]), children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-subtle select-none", children: l.time }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: l.text })
        ] })
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { ref: box, role: "log", "aria-label": label, tabIndex: 0, className: "max-h-72 overflow-auto bg-black/30 p-3 font-mono text-[0.8125rem]", children: [
      shown.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: cn("flex gap-3", levelCls[l.level], !wrap && "whitespace-nowrap"), children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-subtle select-none", children: l.time }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: wrap ? "break-all" : void 0, children: l.text })
      ] }, i)),
      shown.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "text-subtle", children: "No lines" })
    ] })
  ] });
}
function TenantSwitcher({
  tenants,
  current,
  onSwitch,
  label = "Tenant"
}) {
  const sel = tenants.filter((t) => t.value === current);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Combobox, { label, options: tenants, value: sel, onChange: (v) => v[0] && onSwitch(v[0].value) });
}
function PermissionMatrix({
  roles,
  groups,
  value,
  onChange,
  readOnly
}) {
  const has = (r, p) => value[r]?.includes(p) ?? false;
  const set = (r, ps, on) => {
    const cur = new Set(value[r] ?? []);
    ps.forEach((p) => on ? cur.add(p) : cur.delete(p));
    onChange({ ...value, [r]: [...cur] });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "table-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("table", { className: "table", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("tr", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("th", { children: "Permission" }),
      roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("th", { className: "text-center", children: r.label }, r.id))
    ] }) }),
    groups.map((g) => {
      const ids = g.permissions.map((p) => p.id);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("tbody", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("th", { scope: "rowgroup", className: "bg-muted-bg", children: g.label }),
          roles.map((r) => {
            const n = ids.filter((p) => has(r.id, p)).length;
            return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("td", { className: "bg-muted-bg text-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "input",
              {
                type: "checkbox",
                "aria-label": `${g.label} for ${r.label}`,
                disabled: readOnly,
                checked: n === ids.length,
                ref: (el) => {
                  if (el) el.indeterminate = n > 0 && n < ids.length;
                },
                onChange: (e) => set(r.id, ids, e.target.checked)
              }
            ) }, r.id);
          })
        ] }),
        g.permissions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("td", { className: "ps-6", children: p.label }),
          roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("td", { className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("input", { type: "checkbox", "aria-label": `${p.label} for ${r.label}`, disabled: readOnly, checked: has(r.id, p.id), onChange: (e) => set(r.id, [p.id], e.target.checked) }) }, r.id))
        ] }, p.id))
      ] }, g.id);
    })
  ] }) });
}

// lib/components/more.tsx
var import_lucide_react11 = require("lucide-react");
var React12 = __toESM(require("react"), 1);
var import_jsx_runtime15 = require("react/jsx-runtime");
function Kbd({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
  const [editing, setEditing] = React12.useState(false);
  const [text, setText] = React12.useState(value);
  const [error, setError] = React12.useState();
  const [pending, setPending] = React12.useState(false);
  const cancelled = React12.useRef(false);
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
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
      "button",
      {
        type: "button",
        "aria-label": `${label}: ${value}. Edit`,
        className: "group inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-fg",
        onClick: () => {
          cancelled.current = false;
          setText(value);
          setError(void 0);
          setEditing(true);
        },
        children: [
          value,
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react11.Pencil, { className: "size-3.5 text-subtle opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100", "aria-hidden": true })
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: "inline-grid gap-1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
    error && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "field-error", role: "alert", children: error })
  ] });
}
function FileDropzone({
  files,
  onFiles,
  onRemove,
  accept,
  maxSize,
  multiple = true,
  label = "Drop files here or click to browse"
}) {
  const { t: laf } = useLaf();
  const input = React12.useRef(null);
  const [over, setOver] = React12.useState(false);
  const [rejected, setRejected] = React12.useState();
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "grid gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react11.UploadCloud, { className: "size-6", "aria-hidden": true }),
          label
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("input", { ref: input, type: "file", hidden: true, accept, multiple, onChange: (e) => take(e.target.files) }),
    rejected && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "field-error", role: "alert", children: rejected }),
    files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "divide-y divide-line rounded-md border border-line text-sm", children: files.map((f) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("li", { className: "flex items-center gap-3 px-3 py-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "min-w-0 flex-1 truncate text-fg", children: f.name }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "font-mono text-xs text-subtle", children: format.bytes(f.size) }),
      f.error ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "text-xs text-danger", children: f.error }) : f.progress !== void 0 && f.progress < 100 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: "font-mono text-xs text-muted", children: [
        f.progress,
        "%"
      ] }) : null,
      onRemove && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { type: "button", "aria-label": laf.removeItem(f.name), onClick: () => onRemove(f.id), className: "text-muted hover:text-fg", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react11.X, { className: "size-4", "aria-hidden": true }) })
    ] }, f.id)) })
  ] });
}
var alarmTone = { critical: "danger", warning: "warn", info: "neutral" };
function AlarmList({
  alarms,
  onAcknowledge,
  empty = "No active alarms"
}) {
  const { t: laf } = useLaf();
  if (alarms.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "px-4 py-6 text-center text-sm text-muted", children: empty });
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", children: alarms.map((a) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("li", { className: "flex items-center gap-3 px-4 py-3 text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Badge, { tone: alarmTone[a.severity], children: a.severity }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("b", { className: "font-semibold text-fg", children: a.name }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "ms-2 text-muted", children: a.entity })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "font-mono text-xs text-subtle", children: a.triggered }),
    onAcknowledge && !a.acknowledged && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("button", { type: "button", className: "text-primary hover:underline", onClick: () => onAcknowledge(a.id), children: laf.acknowledge })
  ] }, a.id)) });
}
function Gauge({ value, max = 100, label, warnAt = 70, dangerAt = 90 }) {
  const pct = Math.min(100, Math.max(0, value / max * 100));
  const tone = pct >= dangerAt ? "text-danger" : pct >= warnAt ? "text-warn" : "text-ok";
  const r = 40;
  const c = Math.PI * r;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("figure", { className: "m-0 inline-block text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("svg", { viewBox: "0 0 100 56", role: "meter", "aria-label": label, "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": max, className: "w-32", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M10 50 A40 40 0 0 1 90 50", fill: "none", stroke: "var(--bg-muted)", strokeWidth: "8" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M10 50 A40 40 0 0 1 90 50", fill: "none", stroke: "currentColor", strokeWidth: "8", strokeDasharray: `${pct / 100 * c} ${c}`, className: tone })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("figcaption", { className: "-mt-3 font-mono text-lg text-fg", children: [
      Math.round(pct),
      "%"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "text-xs text-muted", children: label })
  ] });
}
var SLICE = ["text-primary", "text-ok", "text-warn", "text-danger", "text-muted"];
function Donut({ slices, label }) {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const r = 15.9155;
  let offset = 25;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("figure", { className: "m-0 flex items-center gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("svg", { viewBox: "0 0 42 42", role: "img", "aria-label": `${label}: ${slices.map((s) => `${s.name} ${s.value}`).join(", ")}`, className: "size-28", children: slices.map((s, i) => {
      const len = s.value / total * 100;
      const el = /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("circle", { cx: "21", cy: "21", r, fill: "none", stroke: "currentColor", strokeWidth: "5", strokeDasharray: `${len} ${100 - len}`, strokeDashoffset: offset, className: SLICE[i % 5] }, s.name);
      offset -= len;
      return el;
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("figcaption", { className: "grid gap-1 text-xs text-muted", children: slices.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: "inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: cn("size-2.5 rounded-sm bg-current", SLICE[i % 5]), "aria-hidden": true }),
      s.name,
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("b", { className: "font-mono text-fg", children: s.value })
    ] }, s.name)) })
  ] });
}
function BarChart({ data, label }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { "aria-label": label, className: "m-0 grid list-none gap-2 p-0", children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("li", { className: "grid grid-cols-[6rem_1fr_3rem] items-center gap-2 text-xs text-muted", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "truncate", children: d.name }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "h-3 overflow-hidden rounded-sm bg-muted-bg", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "block h-full rounded-sm bg-primary", style: { width: `${d.value / max * 100}%` } }) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "text-end font-mono text-fg", children: d.value })
  ] }, d.name)) });
}
function DateTimeInput({ mode = "date", className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Input, { type: mode, className: cn("font-mono [color-scheme:dark]", className), ...props });
}
function FormField({
  id: idProp,
  label,
  description,
  error,
  children
}) {
  const generated = React12.useId();
  const id = idProp ?? generated;
  const descId = `${id}-d`;
  const errId = `${id}-e`;
  const describedBy = [error && errId, description && descId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "form-group", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("label", { className: "form-label", htmlFor: id, children: label }),
    children({ id, "aria-invalid": error ? true : void 0, "aria-describedby": describedBy }),
    description && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { id: descId, className: "field-hint", children: description }),
    error && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { id: errId, className: "field-error", role: "alert", children: error })
  ] });
}
function ErrorSummary({ errors, title = "Fix the following" }) {
  if (errors.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { role: "alert", className: "alert alert-error", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("b", { children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "m-0 ps-5", children: errors.map((e) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("a", { href: `#${e.id}`, children: e.message }) }, e.id)) })
  ] }) });
}

// lib/components/advanced.tsx
var ContextPrimitive = __toESM(require("@radix-ui/react-context-menu"), 1);
var DialogPrimitive3 = __toESM(require("@radix-ui/react-dialog"), 1);
var import_lucide_react12 = require("lucide-react");
var React13 = __toESM(require("react"), 1);
var import_jsx_runtime16 = require("react/jsx-runtime");
var ContextMenu = ContextPrimitive.Root;
var ContextMenuTrigger = ContextPrimitive.Trigger;
function ContextMenuContent({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ContextPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ContextPrimitive.Content, { className: cn("dropdown-menu relative! top-auto! left-auto! z-30 min-w-48", className), ...props }) });
}
function ContextMenuItem({ danger, className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    ContextPrimitive.Item,
    {
      className: cn("dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg", danger && "danger", className),
      ...props
    }
  );
}
function ContextMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ContextPrimitive.Separator, { className: cn("dropdown-sep", className), ...props });
}
function CommandPalette({
  commands,
  open,
  onOpenChange,
  placeholder: placeholderProp,
  emptyText: emptyTextProp
}) {
  const { t } = useLaf();
  const placeholder = placeholderProp ?? t.commandPlaceholder;
  const emptyText = emptyTextProp ?? t.noResults;
  const [query, setQuery] = React13.useState("");
  const [active, setActive] = React13.useState(0);
  const listId = React13.useId();
  React13.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  React13.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);
  const q = query.toLowerCase();
  const results = commands.filter((c) => c.label.toLowerCase().includes(q));
  React13.useEffect(() => setActive(0), [query]);
  const run = (c) => {
    onOpenChange(false);
    c.onSelect();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DialogPrimitive3.Root, { open, onOpenChange, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(DialogPrimitive3.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DialogPrimitive3.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      DialogPrimitive3.Content,
      {
        "aria-describedby": void 0,
        className: "popup fixed top-[20%] left-1/2 z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden p-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(DialogPrimitive3.Title, { className: "sr-only", children: t.commandPalette }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex items-center gap-2 border-b border-line px-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react12.Search, { className: "size-4 text-subtle", "aria-hidden": true }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("ul", { id: listId, role: "listbox", className: "m-0 max-h-72 list-none overflow-auto p-1", children: [
            results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("li", { className: "px-3 py-2 text-sm text-muted", children: emptyText }),
            results.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
              "li",
              {
                id: `${listId}-${i}`,
                role: "option",
                "aria-selected": i === active,
                onMouseEnter: () => setActive(i),
                onClick: () => run(c),
                className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-muted", i === active && "bg-surface-hover text-fg"),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "flex-1", children: c.label }),
                  c.group && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "text-xs text-subtle", children: c.group }),
                  c.shortcut && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Kbd, { children: c.shortcut })
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
  const [open, setOpen] = React13.useState([]);
  const flat = [];
  const walk = (list, level) => list.forEach((row) => {
    flat.push({ row, level });
    if (row.children?.length && open.includes(row.id)) walk(row.children, level + 1);
  });
  walk(rows, 1);
  const toggle = (id) => setOpen((o) => o.includes(id) ? o.filter((x) => x !== id) : [...o, id]);
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "table-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("table", { className: "table", role: "treegrid", "aria-label": label, children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("tr", { children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("th", { children: c.header }, c.id)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("tbody", { children: flat.map(({ row, level }) => {
      const kids = !!row.children?.length;
      const isOpen = open.includes(row.id);
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("tr", { "aria-level": level, "aria-expanded": kids ? isOpen : void 0, children: columns.map((c, ci) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { children: ci === 0 ? (
        // dynamic depth indent
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("span", { className: "inline-flex items-center gap-1", style: { paddingInlineStart: `${(level - 1) * 16}px` }, children: [
          kids ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("button", { type: "button", "aria-label": isOpen ? "Collapse" : "Expand", onClick: () => toggle(row.id), className: "flex size-4 items-center justify-center text-muted hover:text-fg", children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react12.ChevronDown, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react12.ChevronRight, { className: "size-4", "aria-hidden": true }) }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "size-4" }),
          c.cell(row.data)
        ] })
      ) : c.cell(row.data) }, c.id)) }, row.id);
    }) })
  ] }) });
}
function DiffView({ before, after, label, mode = "split" }) {
  const ops = React13.useMemo(() => diffLines(before, after), [before, after]);
  const wrap = "overflow-auto rounded-md border border-line bg-black/30 font-mono text-[0.8125rem]";
  if (mode === "unified")
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { role: "group", "aria-label": label, className: wrap, children: ops.map((op, i) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: cn("px-3 whitespace-pre", op.type === "del" && "bg-danger-bg text-danger", op.type === "add" && "bg-ok-bg text-ok"), children: [
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
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { role: "group", "aria-label": label, className: wrap, children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "grid grid-cols-2 divide-x divide-line", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: cn("px-3 whitespace-pre", row.kind === "change" && row.l !== void 0 && "bg-danger-bg text-danger"), children: row.l ?? "" }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: cn("px-3 whitespace-pre", row.kind === "change" && row.r !== void 0 && "bg-ok-bg text-ok"), children: row.r ?? "" })
  ] }, i)) });
}

// lib/components/screens.tsx
var import_lucide_react13 = require("lucide-react");
var React14 = __toESM(require("react"), 1);
var import_jsx_runtime17 = require("react/jsx-runtime");
var defaultLabels = {
  method: "Choose method",
  scan: "Scan code",
  verify: "Verify",
  recovery: "Recovery codes",
  totp: "Authenticator app",
  passkey: "Passkey",
  next: "Next",
  back: "Back",
  finish: "Finish",
  invalid: "That code is not valid. Try again.",
  passkeyWaiting: "Waiting for your authenticator\u2026",
  passkeyFailed: "Passkey registration failed.",
  stored: "I stored these codes"
};
function MfaEnrolment({ qr, secret, recoveryCodes, onVerify, onRegisterPasskey, onComplete, labels }) {
  const l = { ...defaultLabels, ...labels };
  const [step, setStep] = React14.useState(0);
  const [method, setMethod] = React14.useState("totp");
  const [code, setCode] = React14.useState("");
  const [error, setError] = React14.useState();
  const [busy, setBusy] = React14.useState(false);
  const [stored, setStored] = React14.useState(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "grid gap-6 md:grid-cols-[13rem_1fr]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Stepper, { steps, current: step, onStepClick: (i) => setStep(i) }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "card", children: [
      id === "m" && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
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
      id === "s" && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "mx-auto rounded-md bg-white p-3 text-black", children: qr }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(SecretDisplay, { label: "Manual secret", value: secret, acknowledgeLabel: "I added it to my app" })
      ] }),
      id === "v" && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(OtpInput, { value: code, onChange: setCode, onComplete: () => void 0 }),
        error && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "field-error", role: "alert", children: error })
      ] }),
      id === "p" && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "grid gap-3 text-sm text-muted", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react13.Fingerprint, { className: "mx-auto size-8 text-primary", "aria-hidden": true }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { role: "status", className: "text-center", children: busy ? l.passkeyWaiting : "" }),
        error && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "field-error text-center", role: "alert", children: error })
      ] }),
      id === "r" && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ul", { className: "m-0 grid list-none grid-cols-2 gap-2 p-0 font-mono text-sm text-fg", children: recoveryCodes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("li", { className: "rounded-sm border border-line bg-muted-bg px-2 py-1", children: c }, c)) }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("label", { className: "check text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("input", { type: "checkbox", checked: stored, onChange: (e) => setStored(e.target.checked) }),
          l.stored
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Button, { variant: "secondary", size: "sm", disabled: step === 0 || busy, onClick: () => setStep(step - 1), children: l.back }),
        id === "v" ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Button, { size: "sm", loading: busy, disabled: code.length < 6, onClick: verify, children: l.verify }) : id === "p" ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Button, { size: "sm", loading: busy, leftIcon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react13.KeyRound, {}), onClick: register, children: l.passkey }) : id === "r" ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Button, { size: "sm", disabled: !stored, onClick: onComplete, children: l.finish }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Button, { size: "sm", onClick: () => setStep(step + 1), children: l.next })
      ] })
    ] })
  ] });
}
function OidcClientList({
  clients,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("ul", { className: "divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    "button",
    {
      type: "button",
      "aria-current": selected === c.id ? "true" : void 0,
      onClick: () => onSelect(c.id),
      className: cn("flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-start text-sm hover:bg-surface-hover", selected === c.id && "bg-primary-light"),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react13.Smartphone, { className: "size-4 text-subtle", "aria-hidden": true }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "flex-1 font-medium text-fg", children: c.name }),
        c.pkce && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Badge, { tone: "ok", children: "PKCE" })
      ]
    }
  ) }, c.id)) });
}
function OidcClientForm({
  client,
  onChange,
  onRotateSecret
}) {
  const set = (patch) => onChange({ ...client, ...patch });
  const https = (t) => /^https:\/\/|^http:\/\/localhost/.test(t) ? void 0 : "Must be https:// (or http://localhost)";
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "grid gap-5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DefinitionList, { items: [{ label: "Client ID", value: client.clientId, mono: true, copy: client.clientId }] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "form-group", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("label", { className: "form-label", htmlFor: `${client.id}-name`, children: "Name" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Input, { id: `${client.id}-name`, value: client.name, onChange: (e) => set({ name: e.target.value }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "form-group", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "form-label", children: "Redirect URIs" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(TagInput, { label: "Redirect URIs", value: client.redirectUris, onChange: (v) => set({ redirectUris: v }), validate: https })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "form-group", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "form-label", children: "Scopes" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(TagInput, { label: "Scopes", value: client.scopes, onChange: (v) => set({ scopes: v }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("label", { className: "check text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("input", { type: "checkbox", checked: client.pkce, onChange: (e) => set({ pkce: e.target.checked }) }),
      "Require PKCE"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "form-group", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "form-label", children: "Claim mappings" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(KeyValueEditor, { value: client.claimMappings, onChange: (v) => set({ claimMappings: v }), addLabel: "Add mapping", keyLabel: "Claim", valueLabel: "Source" })
    ] }),
    onRotateSecret && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Button, { variant: "danger", size: "sm", onClick: onRotateSecret, children: "Rotate client secret" }) })
  ] });
}

// lib/components/calendar.tsx
var import_lucide_react14 = require("lucide-react");
var React15 = __toESM(require("react"), 1);
var import_jsx_runtime18 = require("react/jsx-runtime");
var pad = (n) => String(n).padStart(2, "0");
var iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
function DatePicker({
  value,
  onChange,
  label = "Choose date",
  placeholder = "yyyy-mm-dd",
  min,
  max
}) {
  const { t: laf } = useLaf();
  const [open, setOpen] = React15.useState(false);
  const base = value ? /* @__PURE__ */ new Date(`${value}T00:00:00`) : /* @__PURE__ */ new Date();
  const [view, setView] = React15.useState({ y: base.getFullYear(), m: base.getMonth() });
  const first = new Date(view.y, view.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((offset + days) / 7) * 7 }, (_, i) => i - offset + 1);
  const shift = (delta) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const title = first.toLocaleDateString(void 0, { month: "long", year: "numeric" });
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("button", { type: "button", "aria-label": label, className: "input inline-flex w-44 items-center text-start font-mono", children: value ?? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-muted", children: placeholder }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(PopoverContent, { className: "w-64", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Button, { variant: "ghost", size: "sm", "aria-label": laf.previousMonth, onClick: () => shift(-1), children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react14.ChevronLeft, { size: 14 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-sm font-medium", "aria-live": "polite", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Button, { variant: "ghost", size: "sm", "aria-label": laf.nextMonth, onClick: () => shift(1), children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react14.ChevronRight, { size: 14 }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { role: "grid", "aria-label": title, className: "grid grid-cols-7 gap-0.5 text-center text-xs", children: [
        ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { role: "columnheader", className: "py-1 text-muted", children: d }, d)),
        cells.map((d, i) => {
          if (d < 1 || d > days) return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { role: "gridcell" }, i);
          const v = iso(view.y, view.m, d);
          const disabled = min !== void 0 && v < min || max !== void 0 && v > max;
          return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("figure", { "aria-label": label, className: "m-0 grid gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("ul", { className: "m-0 grid list-none gap-2 p-0", children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("li", { className: "grid grid-cols-[6rem_1fr] items-center gap-2 text-xs text-muted", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "truncate", children: d.name }),
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "flex h-3 overflow-hidden rounded-sm bg-muted-bg", children: d.values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        "span",
        {
          title: `${series[i]}: ${v}`,
          className: cn("block h-full", tones[i % tones.length]),
          style: { width: `${v / max * 100}%` }
        },
        i
      )) })
    ] }, d.name)) }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("figcaption", { className: "flex gap-3 text-xs text-muted", children: series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: cn("size-2 rounded-sm", tones[i % tones.length]), "aria-hidden": true }),
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
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { role: "table", "aria-label": label, className: "inline-grid gap-0.5 text-xs text-muted", style: { gridTemplateColumns: `6rem repeat(${columns.length}, 2rem)` }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", {}),
    columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { role: "columnheader", className: "text-center", children: c }, c)),
    rows.map((r, ri) => /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(React15.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { role: "rowheader", className: "truncate", children: r }),
      columns.map((c, ci) => {
        const v = values[ri]?.[ci] ?? 0;
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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

// lib/components/studio.tsx
var import_lucide_react15 = require("lucide-react");
var React16 = __toESM(require("react"), 1);
var import_jsx_runtime19 = require("react/jsx-runtime");
function OverflowTabs({
  tabs,
  maxVisible = 4,
  moreLabel = "More tabs",
  onSelect
}) {
  const visible = tabs.slice(0, maxVisible);
  const rest = tabs.slice(maxVisible);
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(TabsList, { children: visible.map((t) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(TabsTrigger, { value: t.value, children: t.label }, t.value)) }),
    rest.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(DropdownMenu, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("button", { type: "button", "aria-label": moreLabel, className: "ms-1 border-0 bg-transparent px-2 text-muted hover:text-fg", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react15.MoreHorizontal, { size: 16 }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(DropdownMenuContent, { children: rest.map((t) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(DropdownMenuItem, { onSelect: () => onSelect(t.value), children: t.label }, t.value)) })
    ] })
  ] });
}
function DockedTaskPanel({
  tasks,
  onCancel,
  onRetry,
  title = "Recent tasks",
  defaultOpen = false
}) {
  const [open, setOpen] = React16.useState(defaultOpen);
  const running = tasks.filter((t) => t.status === "running").length;
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("section", { "aria-label": title, className: "absolute inset-x-0 bottom-0 border-t border-line bg-surface", children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
      "button",
      {
        type: "button",
        "aria-expanded": open,
        onClick: () => setOpen((o) => !o),
        className: "flex w-full items-center gap-2 border-0 bg-transparent px-4 py-2 text-start text-sm font-medium text-fg",
        children: [
          open ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react15.ChevronDown, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react15.ChevronUp, { size: 14 }),
          title,
          /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { className: "ms-auto text-xs font-normal text-muted", "aria-live": "polite", children: [
            running,
            " running"
          ] })
        ]
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "max-h-64 overflow-auto", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(TaskPanel, { tasks, onCancel, onRetry }) })
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
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("svg", { role: "group", "aria-label": label, viewBox: `0 0 ${width} ${height}`, className: "h-auto w-full max-w-2xl rounded-lg border border-line bg-surface", children: [
    edges.map((e) => {
      const a = byId.get(e.from);
      const b = byId.get(e.to);
      if (!a || !b) return null;
      return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, className: "stroke-line", strokeWidth: 1.5 }, `${e.from}-${e.to}`);
    }),
    nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("text", { x: n.x, y: n.y + 4, textAnchor: "middle", className: "fill-fg font-mono text-[11px]", children: n.label })
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
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "relative rounded-md border border-line bg-surface focus-within:border-primary", children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("pre", { "aria-hidden": true, className: cn(layer, "pointer-events-none"), style: height, children: [
      highlight(value, language).map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: t.cls, children: t.text }, i)),
      "\n"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccountItem,
  AccountList,
  AdminShell,
  AlarmList,
  Alert,
  AuditLog,
  AuthFooter,
  Avatar,
  Badge,
  Banner,
  BarChart,
  BrandHeader,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Chip,
  ClientInfo,
  CodeDisplay,
  CodeEditor,
  CodeInput,
  Combobox,
  CommandPalette,
  ConfirmDialog,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  CopyButton,
  DataGrid,
  DatePicker,
  DateTimeInput,
  DefinitionList,
  DeviceSelector,
  DeviceSteps,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DiffView,
  DockedTaskPanel,
  Donut,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  ErrorSummary,
  Field,
  FileDropzone,
  FormField,
  Gauge,
  Heatmap,
  InfoBox,
  InlineEdit,
  Input,
  Kbd,
  KeyValueEditor,
  LafProvider,
  LanguageSwitcher,
  LineChart,
  LogViewer,
  MfaEnrolment,
  NavGroup,
  NavLink,
  NumberInput,
  OidcClientForm,
  OidcClientList,
  OtpInput,
  OverflowTabs,
  PageHead,
  Pagination,
  Panel,
  PasswordField,
  PermissionMatrix,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  ScopeList,
  SearchInput,
  SecretDisplay,
  Select,
  Skeleton,
  Slider,
  SocialButton,
  SocialButtons,
  SocialDivider,
  Sparkline,
  Spinner,
  SplitPane,
  StackedBarChart,
  Stat,
  StatGrid,
  Stepper,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TagInput,
  TaskPanel,
  TenantSwitcher,
  Textarea,
  TimeRangePicker,
  ToastProvider,
  Toolbar,
  Tooltip,
  TooltipProvider,
  TopologyGraph,
  TreeTable,
  TreeView,
  UserCell,
  UserMenu,
  UserSelector,
  VirtualList,
  buttonVariants,
  cn,
  diffLines,
  en,
  format,
  highlight,
  matchesAccept,
  useControllableState,
  useLaf,
  useToast
});
//# sourceMappingURL=index.cjs.map