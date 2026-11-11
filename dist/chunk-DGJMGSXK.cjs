'use strict';

var chunk5WBFJQAZ_cjs = require('./chunk-5WBFJQAZ.cjs');
var chunkQ6OCMENQ_cjs = require('./chunk-Q6OCMENQ.cjs');
var chunkIP6HZMS5_cjs = require('./chunk-IP6HZMS5.cjs');
var chunkFTHFEMX6_cjs = require('./chunk-FTHFEMX6.cjs');
var jsxRuntime = require('react/jsx-runtime');
var lucideReact = require('lucide-react');
var React5 = require('react');
var DialogPrimitive = require('@radix-ui/react-dialog');
var DropdownPrimitive = require('@radix-ui/react-dropdown-menu');
var PopoverPrimitive = require('@radix-ui/react-popover');
var TabsPrimitive = require('@radix-ui/react-tabs');
var TooltipPrimitive = require('@radix-ui/react-tooltip');
var cmdk = require('cmdk');
var reactVirtual = require('@tanstack/react-virtual');
var CollapsiblePrimitive = require('@radix-ui/react-collapsible');
var SliderPrimitive = require('@radix-ui/react-slider');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React5__namespace = /*#__PURE__*/_interopNamespace(React5);
var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);
var DropdownPrimitive__namespace = /*#__PURE__*/_interopNamespace(DropdownPrimitive);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);
var TabsPrimitive__namespace = /*#__PURE__*/_interopNamespace(TabsPrimitive);
var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespace(TooltipPrimitive);
var CollapsiblePrimitive__namespace = /*#__PURE__*/_interopNamespace(CollapsiblePrimitive);
var SliderPrimitive__namespace = /*#__PURE__*/_interopNamespace(SliderPrimitive);

function Field({ label, hint, error, htmlFor, className, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("form-group", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("label", { className: "form-label", htmlFor, children: label }),
    children,
    error ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "field-error", role: "alert", children: error }) : hint ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "field-hint", children: hint }) : null
  ] });
}
function Input({ className, invalid, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      className: chunkFTHFEMX6_cjs.cn("form-input", invalid && "error", className),
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "textarea",
    {
      className: chunkFTHFEMX6_cjs.cn("form-input", invalid && "error", className),
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("search", className), children: [
    icon,
    /* @__PURE__ */ jsxRuntime.jsx("input", { type: "search", className: "form-input", ...props })
  ] });
}
function Select({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("select", { className: chunkFTHFEMX6_cjs.cn("form-select", className), ...props });
}
function Checkbox({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("label", { className: chunkFTHFEMX6_cjs.cn("check", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("input", { type: "checkbox", ...props }),
    children
  ] });
}
function Switch({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("label", { className: chunkFTHFEMX6_cjs.cn("check", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "switch", children: [
      /* @__PURE__ */ jsxRuntime.jsx("input", { type: "checkbox", role: "switch", ...props }),
      /* @__PURE__ */ jsxRuntime.jsx("span", {})
    ] }),
    children
  ] });
}
function Radio({ children, hint, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("label", { className: chunkFTHFEMX6_cjs.cn("radio", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("input", { type: "radio", ...props }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "radio-mark" }),
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "radio-text", children: [
      children,
      hint && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "radio-hint", children: hint })
    ] })
  ] });
}
function RadioGroup({ name, value, onValueChange, options, className, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx("fieldset", { className: chunkFTHFEMX6_cjs.cn("radio-group", className), "aria-label": rest["aria-label"], children: options.map((o) => /* @__PURE__ */ jsxRuntime.jsx(
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
var alertIcon = { error: lucideReact.XCircle, success: lucideReact.CheckCircle2, warning: lucideReact.AlertTriangle, info: lucideReact.Info };
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunkFTHFEMX6_cjs.cn("alert", alertClass[tone], className),
      role: tone === "error" || tone === "warning" ? "alert" : "status",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "alert-icon", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { children })
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
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkFTHFEMX6_cjs.cn("badge", badgeClass[tone], plain && "plain", className), children });
}
function Avatar({
  name,
  src,
  size = "md",
  className
}) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  const sizing = size === "sm" ? "size-5 text-[0.625rem]" : size === "lg" ? "size-10 text-base" : "";
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkFTHFEMX6_cjs.cn("avatar", sizing, className), title: name, role: "img", "aria-label": name, children: src ? /* @__PURE__ */ jsxRuntime.jsx("img", { src, alt: "", className: "size-full rounded-[inherit] object-cover" }) : initials });
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("card", className), ...props });
}
function Panel({
  title,
  actions,
  children,
  className,
  bodyClassName,
  headingLevel = 3
}) {
  const Heading = `h${headingLevel}`;
  return /* @__PURE__ */ jsxRuntime.jsxs("section", { className: chunkFTHFEMX6_cjs.cn("panel", className), children: [
    (title || actions) && /* @__PURE__ */ jsxRuntime.jsxs("header", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Heading, { className: "panel-title", children: title }),
      actions
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("panel-body", bodyClassName), children })
  ] });
}
function Stat({
  label,
  value,
  delta,
  down
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "stat", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "stat-label", children: label }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "stat-value", children: value }),
    delta && /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("stat-delta", down && "down"), children: delta })
  ] });
}
function StatGrid({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "stat-grid", children });
}
function EmptyState({
  icon,
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "empty", children: [
    icon,
    /* @__PURE__ */ jsxRuntime.jsx("h3", { children: title }),
    description && /* @__PURE__ */ jsxRuntime.jsx("p", { children: description }),
    action
  ] });
}
function Breadcrumb({ items, maxItems, label }) {
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const [expanded, setExpanded] = React5__namespace.useState(false);
  const collapsed = !expanded && maxItems !== void 0 && maxItems >= 2 && items.length > maxItems;
  const hidden = collapsed ? items.length - (maxItems - 1) : 0;
  return /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "breadcrumb", "aria-label": label ?? laf.breadcrumb, children: items.map((it, i) => {
    if (collapsed && i > 0 && i <= hidden) {
      return i === 1 ? /* @__PURE__ */ jsxRuntime.jsx("span", { children: /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": laf.showHiddenLevels(hidden), onClick: () => setExpanded(true), className: "border-0 bg-transparent p-0 text-muted", children: "\u2026" }) }, "more") : null;
    }
    return i === 0 ? /* @__PURE__ */ jsxRuntime.jsx("a", { href: it.href, children: it.label }, it.label) : i === items.length - 1 ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-fg", "aria-current": "page", children: it.label }, it.label) : /* @__PURE__ */ jsxRuntime.jsx("span", { children: /* @__PURE__ */ jsxRuntime.jsx("a", { href: it.href, children: it.label }) }, it.label);
  }) });
}
function PageHead({
  title,
  description,
  actions,
  breadcrumb
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-6", children: [
    breadcrumb && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-2", children: breadcrumb }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "page-head !mb-0", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("h1", { children: title }),
        description && /* @__PURE__ */ jsxRuntime.jsx("p", { children: description })
      ] }),
      actions && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-2.5", children: actions })
    ] })
  ] });
}
var Dialog = DialogPrimitive__namespace.Root;
var DialogTrigger = DialogPrimitive__namespace.Trigger;
var DialogClose = DialogPrimitive__namespace.Close;
function DialogContent({
  title,
  description,
  footer,
  children,
  className,
  ...props
}) {
  const { t: laf, portalContainer } = chunkQ6OCMENQ_cjs.useLaf();
  return /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive__namespace.Portal, { container: portalContainer, children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive__namespace.Content,
      {
        className: chunkFTHFEMX6_cjs.cn("popup fixed top-1/2 start-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2", className),
        ...description ? {} : { "aria-describedby": void 0 },
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "popup-head", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Title, { className: "popup-title", children: title }),
              description && /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Description, { className: "popup-sub", children: description })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Close, { className: "popup-close", "aria-label": laf.close, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-4", "aria-hidden": true }) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "popup-body", children }),
          footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "popup-foot", children: footer })
        ]
      }
    )
  ] });
}
var Popover = PopoverPrimitive__namespace.Root;
var PopoverTrigger = PopoverPrimitive__namespace.Trigger;
var PopoverClose = PopoverPrimitive__namespace.Close;
function PopoverContent({
  title,
  footer,
  children,
  className,
  align = "start",
  ...props
}) {
  const container = chunkQ6OCMENQ_cjs.usePortalContainer();
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { container, children: /* @__PURE__ */ jsxRuntime.jsxs(
    PopoverPrimitive__namespace.Content,
    {
      align,
      sideOffset: 8,
      className: chunkFTHFEMX6_cjs.cn("popover-panel relative! top-auto! start-auto! z-30", className),
      ...props,
      children: [
        title && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "popover-title", children: title }),
        children,
        footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "popover-foot", children: footer }),
        /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Arrow, { className: "fill-menu stroke-line-strong", width: 12, height: 6 })
      ]
    }
  ) });
}
var DropdownMenu = DropdownPrimitive__namespace.Root;
var DropdownMenuTrigger = DropdownPrimitive__namespace.Trigger;
function DropdownMenuContent({
  className,
  align = "end",
  ...props
}) {
  const container = chunkQ6OCMENQ_cjs.usePortalContainer();
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.Portal, { container, children: /* @__PURE__ */ jsxRuntime.jsx(
    DropdownPrimitive__namespace.Content,
    {
      align,
      sideOffset: 4,
      className: chunkFTHFEMX6_cjs.cn("dropdown-menu relative! top-auto! start-auto! z-30 min-w-48", className),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  danger,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownPrimitive__namespace.Item,
    {
      className: chunkFTHFEMX6_cjs.cn("dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg", danger && "danger", className),
      ...props
    }
  );
}
function DropdownMenuLabel({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.Label, { className: chunkFTHFEMX6_cjs.cn("dropdown-label", className), ...props });
}
function DropdownMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.Separator, { className: chunkFTHFEMX6_cjs.cn("dropdown-sep", className), ...props });
}
var Tabs = TabsPrimitive__namespace.Root;
var TabsContent = TabsPrimitive__namespace.Content;
function TabsList({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(TabsPrimitive__namespace.List, { className: chunkFTHFEMX6_cjs.cn("tabs", className), ...props });
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Trigger,
    {
      className: chunkFTHFEMX6_cjs.cn(
        "tab cursor-pointer border-0 border-b-2 bg-transparent font-[inherit] data-[state=active]:border-primary data-[state=active]:text-fg",
        className
      ),
      ...props
    }
  );
}
var TooltipProvider = TooltipPrimitive__namespace.Provider;
function Tooltip({
  content,
  children,
  side = "top"
}) {
  const container = chunkQ6OCMENQ_cjs.usePortalContainer();
  return /* @__PURE__ */ jsxRuntime.jsxs(TooltipPrimitive__namespace.Root, { delayDuration: 400, children: [
    /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Portal, { container, children: /* @__PURE__ */ jsxRuntime.jsx(
      TooltipPrimitive__namespace.Content,
      {
        side,
        sideOffset: 6,
        className: "z-60 rounded-md border border-line-strong bg-menu px-2 py-1 text-xs text-fg shadow-[0_16px_32px_rgba(0,0,0,0.5)]",
        children: content
      }
    ) })
  ] });
}

// lib/messages/ui.en.ts
var uiEn = {
  combobox: { clear: "Clear", create: (q) => `Create \u201C${q}\u201D` },
  errors: { requestId: "Request ID", copyRequestId: (label) => `Copy ${label}`, tryAgain: "Try again" },
  error403: { title: "Access denied", description: "You don't have permission to view this page." },
  error404: { title: "Page not found", description: "The page you are looking for doesn't exist or was moved." },
  error500: { title: "Something went wrong", description: "An unexpected error occurred. Try again in a moment." },
  errorOffline: { title: "You are offline", description: "Check your connection and try again." },
  errorSessionExpired: { title: "Session expired", description: "Sign in again to continue." },
  unsavedChanges: {
    title: "Discard unsaved changes?",
    description: "You have changes that have not been saved. If you leave now they will be lost.",
    confirm: "Discard changes",
    cancel: "Keep editing"
  },
  formFooter: { save: "Save", cancel: "Cancel" },
  subNav: { label: "Section navigation" },
  mobileNav: { title: "Navigation", trigger: "Open navigation" },
  splitButton: { more: "More actions" },
  wizard: {
    title: "Wizard",
    back: "Back",
    next: "Next",
    finish: "Finish",
    skip: "Skip",
    cancel: "Cancel",
    optional: "optional",
    steps: "Steps"
  }
};
var lafDefaults = { ui: uiEn };
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
  createLabel: createLabelProp,
  clearable,
  clearLabel: clearLabelProp,
  renderOption,
  open: openProp,
  onOpenChange,
  className
}) {
  const { t } = chunkQ6OCMENQ_cjs.useLafDefaults(lafDefaults);
  const createLabel = createLabelProp ?? t.components.ui.combobox.create;
  const clearLabel = clearLabelProp ?? t.components.ui.combobox.clear;
  const emptyText = emptyTextProp ?? t.noResults;
  const loadingText = loadingTextProp ?? `${t.loading}\u2026`;
  const [query, setQuery] = React5__namespace.useState("");
  const [open, setOpen] = chunk5WBFJQAZ_cjs.useControllableState({ value: openProp, defaultValue: false, onChange: onOpenChange });
  const [asyncList, setAsyncList] = React5__namespace.useState([]);
  const [loading, setLoading] = React5__namespace.useState(false);
  const root = React5__namespace.useRef(null);
  const inputRef = React5__namespace.useRef(null);
  React5__namespace.useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.setAttribute("aria-expanded", String(open));
    if (!open) el.removeAttribute("aria-controls");
  });
  const isFn = typeof options === "function";
  const optionsRef = React5__namespace.useRef(options);
  optionsRef.current = options;
  const syncList = React5__namespace.useMemo(() => {
    if (isFn) return [];
    const q2 = query.trim().toLowerCase();
    return options.filter((o) => !q2 || (o.label + " " + (o.description ?? "")).toLowerCase().includes(q2));
  }, [options, query, isFn]);
  React5__namespace.useEffect(() => {
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
  const groups = React5__namespace.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const o of shown) m.set(o.group ?? "", [...m.get(o.group ?? "") ?? [], o]);
    return [...m.entries()];
  }, [shown]);
  const renderRow = (o) => {
    const selected = isSelected(o);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      cmdk.Command.Item,
      {
        value: o.value,
        disabled: o.disabled,
        keywords: [o.label],
        onSelect: () => pick(o),
        onMouseDown: (e) => e.preventDefault(),
        className: chunkFTHFEMX6_cjs.cn("dropdown-item cursor-pointer data-[selected=true]:bg-surface-hover data-[selected=true]:text-fg data-[disabled=true]:opacity-50", selected && "font-semibold"),
        children: [
          renderOption ? renderOption(o, { selected }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: o.label }),
            o.description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-2 text-xs text-subtle", children: o.description })
          ] }),
          selected && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "ms-auto text-primary", children: "\u2713" })
        ]
      },
      o.value
    );
  };
  return /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command, { shouldFilter: false, label, loop: true, className: chunkFTHFEMX6_cjs.cn("contents", className), children: /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref: root, className: "relative", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", children: [
      value.map((v) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex h-6 items-center gap-1 rounded-sm border border-line bg-muted-bg px-2 text-xs", children: [
        v.label,
        multiple && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": t.removeItem(v.label), disabled, className: "text-muted hover:text-fg", onClick: () => pick(v), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-3", "aria-hidden": true }) })
      ] }, v.value)),
      /* @__PURE__ */ jsxRuntime.jsx(
        cmdk.Command.Input,
        {
          ref: inputRef,
          "aria-label": label,
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
      clearable && value.length > 0 && !disabled && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": clearLabel, className: "text-muted hover:text-fg", onClick: () => onChange([]), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-3.5", "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "size-4 text-muted", "aria-hidden": true })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
      PopoverPrimitive__namespace.Content,
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
        children: /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.List, { className: "dropdown-menu max-h-64 w-full overflow-auto", children: loading && !list.length ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-3 py-2 text-sm text-muted", children: loadingText }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          !list.length && !canCreate && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-3 py-2 text-sm text-muted", children: emptyText }),
          groups.map(
            ([g, opts]) => g ? /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.Group, { heading: g, className: "[&_[cmdk-group-heading]]:dropdown-label", children: opts.map(renderRow) }, g) : opts.map(renderRow)
          ),
          list.length > MAX_RENDERED && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "px-3 py-2 text-xs text-subtle", children: [
            list.length - MAX_RENDERED,
            "+ more \u2014 keep typing to refine"
          ] }),
          canCreate && /* @__PURE__ */ jsxRuntime.jsx(
            cmdk.Command.Item,
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
function Spinner({
  size = "md",
  label: labelProp,
  className
}) {
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const label = labelProp ?? laf.loading;
  const sizing = size === "sm" ? "size-4" : size === "lg" ? "size-8" : "size-5";
  return /* @__PURE__ */ jsxRuntime.jsxs("span", { role: "status", className: chunkFTHFEMX6_cjs.cn("inline-flex", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: chunkFTHFEMX6_cjs.cn("animate-spin text-primary motion-reduce:animate-none", sizing), "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: label })
  ] });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "aria-hidden": true,
      className: chunkFTHFEMX6_cjs.cn("h-4 animate-pulse rounded-sm bg-muted-bg motion-reduce:animate-none", className),
      ...props
    }
  );
}
var toastIcon = {
  success: { Icon: lucideReact.CheckCircle2, className: "text-ok" },
  error: { Icon: lucideReact.XCircle, className: "text-danger" },
  warning: { Icon: lucideReact.AlertTriangle, className: "text-warn" },
  info: { Icon: lucideReact.Info, className: "text-primary" }
};
var ToastContext = React5__namespace.createContext(null);
function useToast() {
  const ctx = React5__namespace.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
function ToastView({ item, onDismiss }) {
  const tone = item.tone ?? "info";
  const duration = item.duration ?? (tone === "error" ? 8e3 : 4e3);
  const [paused, setPaused] = React5__namespace.useState(false);
  React5__namespace.useEffect(() => {
    if (paused || duration === 0) return;
    const t = window.setTimeout(() => onDismiss(item.id), duration);
    return () => window.clearTimeout(t);
  }, [paused, duration, item.id, onDismiss]);
  const { Icon, className } = toastIcon[tone];
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: "toast pointer-events-auto",
      role: tone === "error" ? "alert" : "status",
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: () => setPaused(false),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: chunkFTHFEMX6_cjs.cn("size-4 shrink-0", className), "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1", children: item.title }),
        item.action && /* @__PURE__ */ jsxRuntime.jsx(
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
  const [items, setItems] = React5__namespace.useState([]);
  const nextId = React5__namespace.useRef(0);
  const dismiss = React5__namespace.useCallback((id) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);
  const toast = React5__namespace.useCallback((options) => {
    const id = ++nextId.current;
    setItems((list) => [...list, { ...options, id }]);
    return id;
  }, []);
  const value = React5__namespace.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  return /* @__PURE__ */ jsxRuntime.jsxs(ToastContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "pointer-events-none fixed end-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2", children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsx(ToastView, { item, onDismiss: dismiss }, item.id)) })
  ] });
}
function observeRectWithFallback(inst, cb) {
  return reactVirtual.observeElementRect(inst, (rect) => cb(rect.height === 0 ? inst.options.initialRect : rect));
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
  const ref = React5__namespace.useRef(null);
  const virt = reactVirtual.useVirtualizer({
    count: items.length,
    getScrollElement: () => ref.current,
    estimateSize: () => rowHeight,
    overscan,
    initialRect: { width: 0, height },
    observeElementRect: observeRectWithFallback
  });
  const rows = virt.getVirtualItems();
  const last = rows[rows.length - 1]?.index ?? -1;
  React5__namespace.useEffect(() => {
    if (last >= 0) onRangeChange?.(last);
  }, [last, onRangeChange]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      role: "list",
      "aria-label": label,
      tabIndex: 0,
      className: chunkFTHFEMX6_cjs.cn("relative overflow-auto", className),
      style: { height },
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative", style: { height: virt.getTotalSize() }, children: rows.map((r) => /* @__PURE__ */ jsxRuntime.jsx(
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
  const rows = React5__namespace.useMemo(
    () => [...items.map((item) => ({ kind: "item", item })), ...loading ? [{ kind: "loading" }] : []],
    [items, loading]
  );
  const endRef = React5__namespace.useRef(onEndReached);
  endRef.current = onEndReached;
  const onRange = React5__namespace.useCallback(
    (last) => {
      if (hasMore && !loading && last >= items.length - 1) endRef.current();
    },
    [hasMore, loading, items.length]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      VirtualList,
      {
        items: rows,
        rowHeight,
        height,
        overscan,
        label,
        className,
        onRangeChange: onRange,
        renderRow: (r, i) => r.kind === "item" ? renderRow(r.item, i) : /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "status", className: "flex h-full items-center gap-2 px-2 text-sm text-muted", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-3 w-24" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: l.loading })
        ] })
      }
    ),
    hasMore && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "btn btn-secondary btn-sm self-start", disabled: loading, onClick: () => onEndReached(), children: l.loadMore })
  ] });
}

// lib/components/label-slot.ts
var LABEL_SLOTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function labelSlotStyle(slot) {
  return { backgroundColor: `var(--label-${slot}-bg)`, color: `var(--label-${slot}-fg)`, borderColor: `var(--label-${slot})` };
}
var bannerTone = {
  info: { cls: "border-primary/35 bg-primary-light text-primary", Icon: lucideReact.Info },
  warn: { cls: "border-warn-line bg-warn-bg text-warn", Icon: lucideReact.AlertTriangle },
  danger: { cls: "border-danger-line bg-danger-bg text-danger", Icon: lucideReact.XCircle }
};
function Banner({
  tone = "info",
  action,
  onDismiss,
  dismissLabel,
  children
}) {
  const { cls, Icon } = bannerTone[tone];
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: tone === "danger" ? "alert" : "status", className: chunkFTHFEMX6_cjs.cn("flex items-center gap-2.5 border-b px-4 py-2 text-sm", cls), children: [
    /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "size-4 shrink-0", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 flex-1", children }),
    action,
    onDismiss && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": dismissLabel ?? laf.dismiss, onClick: onDismiss, className: "opacity-80 hover:opacity-100", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-4", "aria-hidden": true }) })
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
  const [open, setOpen] = chunk5WBFJQAZ_cjs.useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const setItem = (id, next) => setOpen((o) => next ? multiple ? o.includes(id) ? o : [...o, id] : [id] : o.filter((x) => x !== id));
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", className), children: items.map((it) => {
    const isOpen = open.includes(it.id);
    return /* @__PURE__ */ jsxRuntime.jsxs(CollapsiblePrimitive__namespace.Root, { open: isOpen, onOpenChange: (v) => setItem(it.id, v), children: [
      /* @__PURE__ */ jsxRuntime.jsx("h3", { children: /* @__PURE__ */ jsxRuntime.jsxs(CollapsiblePrimitive__namespace.Trigger, { className: "flex w-full items-center gap-2 px-4 py-3 text-start text-sm font-medium text-fg hover:bg-surface-hover", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children: it.title }),
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: chunkFTHFEMX6_cjs.cn("size-4 transition-transform motion-reduce:transition-none", isOpen && "rotate-180"), "aria-hidden": true })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(CollapsiblePrimitive__namespace.Content, { className: "overflow-hidden border-t border-line text-sm text-muted data-[state=closed]:animate-[laf-collapse-up_150ms_ease-out] data-[state=open]:animate-[laf-collapse-down_150ms_ease-out] motion-reduce:animate-none", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-4 py-3", children: it.content }) })
    ] }, it.id);
  }) });
}
function readStored(key) {
  if (!key || typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(`laf:split:${key}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function SplitPane({
  start,
  end,
  orientation = "horizontal",
  primary = "start",
  defaultSize = 280,
  size: sizeProp,
  onSizeChange,
  min = 160,
  max = 600,
  collapsible,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  persistKey,
  label: labelProp,
  className
}) {
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const label = labelProp ?? laf.resizePanels;
  const stored = React5__namespace.useMemo(() => readStored(persistKey), [persistKey]);
  const clamp = React5__namespace.useCallback((n) => Math.min(max, Math.max(min, n)), [min, max]);
  const [size, setSizeRaw] = chunk5WBFJQAZ_cjs.useControllableState({
    value: sizeProp,
    defaultValue: clamp(stored.size ?? defaultSize),
    onChange: onSizeChange
  });
  const [collapsed, setCollapsed] = chunk5WBFJQAZ_cjs.useControllableState({
    value: collapsedProp,
    defaultValue: collapsible ? stored.collapsed ?? defaultCollapsed : false,
    onChange: onCollapsedChange
  });
  const setSize = (n) => setSizeRaw((p) => clamp(typeof n === "function" ? n(p) : n));
  React5__namespace.useEffect(() => {
    if (!persistKey) return;
    try {
      window.localStorage.setItem(`laf:split:${persistKey}`, JSON.stringify({ size, collapsed }));
    } catch {
    }
  }, [persistKey, size, collapsed]);
  const vertical = orientation === "vertical";
  const sign = primary === "start" ? 1 : -1;
  const dirOf = (el) => !vertical && getComputedStyle(el).direction === "rtl" ? -1 : 1;
  const onPointerDown = (e) => {
    if (collapsed) return;
    const origin = vertical ? e.clientY : e.clientX;
    const startSize = size;
    const dir = dirOf(e.currentTarget);
    const move = (ev) => setSize(startSize + sign * dir * ((vertical ? ev.clientY : ev.clientX) - origin));
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 50 : 10;
    const dir = dirOf(e.currentTarget);
    const grow = vertical ? "ArrowDown" : dir === 1 ? "ArrowRight" : "ArrowLeft";
    const shrink = vertical ? "ArrowUp" : dir === 1 ? "ArrowLeft" : "ArrowRight";
    if (e.key === "Enter" && collapsible) setCollapsed((c) => !c);
    else if (e.key === "Home") setSize(min);
    else if (e.key === "End") setSize(max);
    else if (e.key === grow) setSize((s) => s + sign * step);
    else if (e.key === shrink) setSize((s) => s - sign * step);
    else return;
    e.preventDefault();
  };
  const px = collapsed ? 0 : size;
  const fixedStyle = vertical ? { height: px } : { width: px };
  const Chevron = vertical ? primary === "start" ? lucideReact.ChevronUp : lucideReact.ChevronDown : primary === "start" ? lucideReact.ChevronLeft : lucideReact.ChevronRight;
  const paneCls = (fixed) => chunkFTHFEMX6_cjs.cn("overflow-auto", fixed ? "shrink-0" : vertical ? "min-h-0 flex-1" : "min-w-0 flex-1", fixed && collapsed && "overflow-hidden");
  const fixedPane = (n) => (
    // dynamic user-resizable size
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: paneCls(true), style: fixedStyle, "aria-hidden": collapsed || void 0, inert: collapsed || void 0, children: n })
  );
  const separator = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("relative shrink-0", vertical ? "h-1" : "w-1"), children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        role: "separator",
        "aria-orientation": vertical ? "horizontal" : "vertical",
        "aria-label": label,
        "aria-valuenow": size,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "data-collapsed": collapsible ? collapsed : void 0,
        tabIndex: 0,
        onPointerDown,
        onKeyDown,
        onDoubleClick: () => setSize(defaultSize),
        className: chunkFTHFEMX6_cjs.cn(
          "size-full touch-none bg-line outline-none hover:bg-primary focus-visible:bg-primary",
          vertical ? "cursor-row-resize" : "cursor-col-resize"
        )
      }
    ),
    collapsible && /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        "aria-label": collapsed ? laf.vsExpandPane : laf.vsCollapsePane,
        "aria-expanded": !collapsed,
        onClick: () => setCollapsed((c) => !c),
        className: chunkFTHFEMX6_cjs.cn(
          "absolute z-10 grid size-5 place-items-center rounded-sm border border-line bg-surface text-muted hover:text-fg",
          vertical ? "start-2 -top-2" : "top-2 -start-2"
        ),
        children: /* @__PURE__ */ jsxRuntime.jsx(Chevron, { className: chunkFTHFEMX6_cjs.cn("size-3", collapsed && "rotate-180"), "aria-hidden": true })
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-orientation": orientation,
      className: chunkFTHFEMX6_cjs.cn("flex min-h-0 overflow-hidden rounded-lg border border-line bg-surface", vertical && "flex-col", className),
      children: [
        primary === "start" ? fixedPane(start) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: paneCls(false), children: start }),
        separator,
        primary === "start" ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: paneCls(false), children: end }) : fixedPane(end)
      ]
    }
  );
}
var Drawer = DialogPrimitive__namespace.Root;
var DrawerTrigger = DialogPrimitive__namespace.Trigger;
var DrawerClose = DialogPrimitive__namespace.Close;
function DrawerContent({
  title,
  description,
  footer,
  width = "md",
  children
}) {
  const { t: laf, portalContainer } = chunkQ6OCMENQ_cjs.useLaf();
  const w = { sm: "w-[360px]", md: "w-[480px]", lg: "w-[640px]" }[width];
  return /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive__namespace.Portal, { container: portalContainer, children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive__namespace.Content,
      {
        ...description ? {} : { "aria-describedby": void 0 },
        className: chunkFTHFEMX6_cjs.cn("fixed inset-y-0 end-0 z-50 flex max-w-full flex-col border-s border-line-strong bg-menu", w),
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start gap-3 border-b border-line px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Title, { className: "text-base font-semibold text-fg", children: title }),
              description && /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Description, { className: "text-sm text-muted", children: description })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Close, { "aria-label": laf.close, className: "popup-close", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-4", "aria-hidden": true }) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 overflow-auto px-5 py-4 text-sm text-muted", children }),
          footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end gap-2.5 border-t border-line px-5 py-3.5", children: footer })
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
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const factor = units?.find((u) => u.label === unit)?.factor ?? 1;
  const shown = value / factor;
  const [text, setText] = React5__namespace.useState(String(shown));
  React5__namespace.useEffect(() => setText(String(shown)), [shown]);
  const commit = (n) => onChange(Math.min(max, Math.max(min, n * factor)));
  const bump = (d) => commit(shown + d * step);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "inline-flex items-stretch gap-1.5", children: [
    /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "btn btn-secondary btn-sm auto", "aria-label": laf.decrease(label), disabled: value <= min, onClick: () => bump(-1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Minus, { "aria-hidden": true }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
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
    /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "btn btn-secondary btn-sm auto", "aria-label": laf.increase(label), disabled: value >= max, onClick: () => bump(1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { "aria-hidden": true }) }),
    units && /* @__PURE__ */ jsxRuntime.jsx("select", { className: "form-input w-20", "aria-label": laf.unitOf(label), value: unit, onChange: (e) => onUnitChange?.(e.target.value), children: units.map((u) => /* @__PURE__ */ jsxRuntime.jsx("option", { children: u.label }, u.label)) })
  ] });
}
function Slider({
  value: valueProp,
  defaultValue,
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
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const [value, setValue] = chunk5WBFJQAZ_cjs.useControllableState({
    value: valueProp,
    defaultValue: defaultValue ?? min,
    onChange: (v) => {
      onValueChange?.(v);
      if (typeof v === "number") onChange?.({ target: { value: String(v) } });
    }
  });
  const arr = Array.isArray(value) ? value : [value];
  const pct = (n) => `${(n - min) / (max - min || 1) * 100}%`;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex w-full items-center gap-3", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        SliderPrimitive__namespace.Root,
        {
          className: "relative flex h-5 w-full touch-none items-center select-none data-[disabled]:opacity-50",
          value: arr,
          min,
          max,
          step,
          disabled,
          onValueChange: (v) => setValue(Array.isArray(value) ? [v[0], v[1]] : v[0]),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(SliderPrimitive__namespace.Track, { className: "relative h-1 grow rounded-xs bg-muted-bg", children: /* @__PURE__ */ jsxRuntime.jsx(SliderPrimitive__namespace.Range, { className: "absolute h-full rounded-xs bg-primary" }) }),
            arr.map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(
              SliderPrimitive__namespace.Thumb,
              {
                "aria-label": arr.length > 1 && ariaLabel ? `${ariaLabel} ${i === 0 ? laf.minimum : laf.maximum}` : ariaLabel,
                className: "block size-4 rounded-sm border border-primary bg-surface outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              },
              i
            ))
          ]
        }
      ),
      marks && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative mt-1 h-4 text-xs text-muted", "aria-hidden": true, children: marks.map((m) => /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute -translate-x-1/2 rtl:translate-x-1/2", style: { insetInlineStart: pct(m.value) }, children: m.label ?? m.value }, m.value)) })
    ] }),
    withInput && typeof value === "number" && /* @__PURE__ */ jsxRuntime.jsx(NumberInput, { label: ariaLabel ?? laf.value, value, min, max, step, onChange: (n) => setValue(n) })
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
  color,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      className: chunkFTHFEMX6_cjs.cn("inline-flex h-6 items-center gap-1 rounded-sm border px-2 text-xs", !color && chipTone[tone]),
      style: color ? labelSlotStyle(color) : void 0,
      children: [
        children,
        onRemove && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": removeLabel ?? "Remove", onClick: onRemove, className: "opacity-70 hover:opacity-100", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-3", "aria-hidden": true }) })
      ]
    }
  );
}
function TagInput({
  value,
  onChange,
  label,
  placeholder,
  max,
  validate
}) {
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const [text, setText] = React5__namespace.useState("");
  const [error, setError] = React5__namespace.useState();
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-1", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", error && "error"), children: [
      value.map((t) => /* @__PURE__ */ jsxRuntime.jsx(Chip, { removeLabel: laf.removeItem(t), onRemove: () => onChange(value.filter((v) => v !== t)), children: t }, t)),
      /* @__PURE__ */ jsxRuntime.jsx(
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
    error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "field-error", role: "alert", children: error })
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
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const addLabel = addLabelProp ?? laf.add;
  const keyLabel = keyLabelProp ?? laf.key;
  const valueLabel = valueLabelProp ?? laf.value;
  const duplicateMessage = duplicateMessageProp ?? laf.duplicateKey;
  const ids = React5__namespace.useRef([]);
  const next = React5__namespace.useRef(0);
  while (ids.current.length < value.length) ids.current.push(next.current++);
  ids.current.length = value.length;
  const set = (i, patch) => onChange(value.map((r, j) => j === i ? { ...r, ...patch } : r));
  const dup = (i) => value[i].key !== "" && value.findIndex((r) => r.key === value[i].key) !== i;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
    value.map((row, i) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-[1fr_1fr_auto] items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(Input, { "aria-label": `${keyLabel} ${i + 1}`, className: "font-mono", invalid: dup(i), value: row.key, onChange: (e) => set(i, { key: e.target.value }) }),
        dup(i) && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "field-error", role: "alert", children: duplicateMessage })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(Input, { "aria-label": `${valueLabel} ${i + 1}`, className: "font-mono", value: row.value, onChange: (e) => set(i, { value: e.target.value }) }),
      /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "btn btn-ghost btn-sm auto", "aria-label": laf.removeRow(i + 1), onClick: () => {
        ids.current.splice(i, 1);
        onChange(value.filter((_, j) => j !== i));
      }, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { "aria-hidden": true }) })
    ] }, ids.current[i])),
    /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "button", className: "btn btn-secondary btn-sm auto", onClick: () => onChange([...value, { key: "", value: "" }]), children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { "aria-hidden": true }),
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
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: `0 0 ${w} ${h}`, role: "img", "aria-label": label, className: chunkFTHFEMX6_cjs.cn("h-6 w-24 text-primary", className), preserveAspectRatio: "none", children: /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: pts.join(" "), fill: "none", stroke: "currentColor", strokeWidth: "1.5", vectorEffect: "non-scaling-stroke" }) });
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
  const pad = { l: 36, r: 8, t: 8, b: 20 };
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all, 1);
  const n = xLabels.length;
  const x = (i) => pad.l + i / Math.max(1, n - 1) * (w - pad.l - pad.r);
  const y = (v) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
  const [hover, setHover] = React5__namespace.useState();
  const ticks = [0, 0.5, 1].map((t) => t * max);
  return /* @__PURE__ */ jsxRuntime.jsxs("figure", { className: chunkFTHFEMX6_cjs.cn("m-0 max-w-xl", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
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
          setHover(Math.min(n - 1, Math.max(0, Math.round((px - pad.l) / (w - pad.l - pad.r) * (n - 1)))));
        },
        children: [
          ticks.map((t) => /* @__PURE__ */ jsxRuntime.jsxs("g", { className: "text-subtle", children: [
            /* @__PURE__ */ jsxRuntime.jsx("line", { x1: pad.l, x2: w - pad.r, y1: y(t), y2: y(t), stroke: "var(--border)" }),
            /* @__PURE__ */ jsxRuntime.jsx("text", { x: pad.l - 4, y: y(t) + 3, textAnchor: "end", fontSize: "9", fill: "currentColor", children: Math.round(t) })
          ] }, t)),
          xLabels.map(
            (l, i) => i % Math.ceil(n / 6) === 0 ? /* @__PURE__ */ jsxRuntime.jsx("text", { x: x(i), y: h - 6, textAnchor: i === n - 1 ? "end" : i === 0 ? "start" : "middle", fontSize: "9", className: "fill-subtle", children: l }, i) : null
          ),
          series.map((s, si) => /* @__PURE__ */ jsxRuntime.jsx(
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
          hover !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("line", { x1: x(hover), x2: x(hover), y1: pad.t, y2: h - pad.b, stroke: "var(--border-strong)" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs("figcaption", { className: "mt-1 flex flex-wrap items-center gap-x-4 text-xs text-muted", "aria-live": "off", children: [
      series.map((s, si) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntime.jsx("svg", { width: "16", height: "4", className: SERIES_COLORS[si % 4], "aria-hidden": true, children: /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "0", x2: "16", y1: "2", y2: "2", stroke: "currentColor", strokeWidth: "2", strokeDasharray: SERIES_DASH[si % 4] }) }),
        s.name,
        hover !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("b", { className: "font-mono text-fg", children: [
          s.data[hover],
          unit
        ] })
      ] }, s.name)),
      hover !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-auto font-mono text-subtle", children: xLabels[hover] })
    ] })
  ] });
}
function TimeRangePicker({
  value,
  onChange,
  presets = ["15m", "1h", "24h", "7d"],
  refresh,
  onRefreshChange,
  label: labelProp,
  range,
  onRangeChange,
  showTimeZone
}) {
  const { t: laf, timeZone } = chunkQ6OCMENQ_cjs.useLaf();
  const label = labelProp ?? laf.timeRange;
  const [customOpen, setCustomOpen] = React5__namespace.useState(false);
  const [draft, setDraft] = React5__namespace.useState({ from: "", to: "" });
  const toLocal = (ms) => {
    const d = new Date(ms);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };
  const draftFrom = new Date(draft.from).getTime();
  const draftTo = new Date(draft.to).getTime();
  const draftValid = Number.isFinite(draftFrom) && Number.isFinite(draftTo) && draftFrom < draftTo;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-label": label, className: "inline-flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "inline-flex overflow-hidden rounded-md border border-line", children: [
      presets.map((p) => /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          "aria-pressed": value === p,
          onClick: () => onChange(p),
          className: chunkFTHFEMX6_cjs.cn("border-0 border-e border-line bg-input px-3 py-1.5 text-sm text-muted last:border-e-0 hover:text-fg", value === p && "bg-primary-light text-primary"),
          children: p
        },
        p
      )),
      onRangeChange && /* @__PURE__ */ jsxRuntime.jsxs(
        Popover,
        {
          open: customOpen,
          onOpenChange: (o) => {
            setCustomOpen(o);
            if (o) {
              const now = Date.now();
              setDraft({ from: toLocal(range?.from ?? now - 36e5), to: toLocal(range?.to ?? now) });
            }
          },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                "aria-pressed": value === "custom",
                className: chunkFTHFEMX6_cjs.cn("border-0 bg-input px-3 py-1.5 text-sm text-muted hover:text-fg", value === "custom" && "bg-primary-light text-primary"),
                children: laf.customRange
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(PopoverContent, { className: "w-64", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "grid gap-1", children: [
                laf.rangeFrom,
                /* @__PURE__ */ jsxRuntime.jsx("input", { type: "datetime-local", className: "form-input h-8 font-mono", value: draft.from, onChange: (e) => setDraft({ ...draft, from: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "grid gap-1", children: [
                laf.rangeTo,
                /* @__PURE__ */ jsxRuntime.jsx("input", { type: "datetime-local", className: "form-input h-8 font-mono", value: draft.to, onChange: (e) => setDraft({ ...draft, to: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted", children: timeZone }),
              /* @__PURE__ */ jsxRuntime.jsx(
                chunkIP6HZMS5_cjs.Button,
                {
                  size: "sm",
                  disabled: !draftValid,
                  onClick: () => {
                    onRangeChange({ from: draftFrom, to: draftTo });
                    onChange("custom");
                    setCustomOpen(false);
                  },
                  children: laf.applyRange
                }
              )
            ] }) })
          ]
        }
      )
    ] }),
    showTimeZone && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted", children: timeZone }),
    onRefreshChange && /* @__PURE__ */ jsxRuntime.jsx("select", { className: "form-input w-24", "aria-label": laf.autoRefresh, value: refresh, onChange: (e) => onRefreshChange(e.target.value), children: ["off", "5s", "30s", "1m"].map((r) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: r, children: r === "off" ? laf.off : r }, r)) })
  ] });
}
var levelCls = { info: "text-muted", warn: "text-warn", error: "text-danger" };
var defaultLogLabels = {
  search: "Search",
  level: "Level",
  all: "All levels",
  info: "Info",
  warn: "Warning",
  error: "Error",
  follow: "Follow",
  pause: "Pause",
  wrap: "Wrap",
  download: "Download",
  next: "Next match",
  previous: "Previous match",
  loadOlder: "Load older",
  noLines: "No log lines",
  invalidPattern: "Invalid regular expression",
  matches: (c, t) => `${t === 0 ? 0 : c} / ${t}`
};
function highlight(text, re) {
  if (!re) return text;
  const out = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m[0] === "") continue;
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    out.push(
      /* @__PURE__ */ jsxRuntime.jsx("mark", { className: "rounded-sm bg-warn-bg text-warn", children: m[0] }, i)
    );
    last = i + m[0].length;
  }
  if (last === 0) return text;
  if (last < text.length) out.push(text.slice(last));
  return out;
}
var levelRank = { info: 0, warn: 1, error: 2 };
function LogViewer({
  lines,
  label,
  follow: followProp = true,
  height = 288,
  rowHeight = 20,
  onLoadOlder,
  downloadName = "log.txt",
  labels,
  className
}) {
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const l = { ...defaultLogLabels, search: laf.search, wrap: laf.wrap, noLines: laf.noLines, ...labels };
  const [query, setQuery] = React5__namespace.useState("");
  const [wrap, setWrap] = React5__namespace.useState(false);
  const [minLevel, setMinLevel] = React5__namespace.useState("all");
  const [follow, setFollow] = React5__namespace.useState(followProp);
  const [current, setCurrent] = React5__namespace.useState(0);
  const box = React5__namespace.useRef(null);
  const re = React5__namespace.useMemo(() => {
    if (!query) return { re: null, bad: false };
    try {
      return { re: new RegExp(query, "gi"), bad: false };
    } catch {
      return { re: new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), bad: true };
    }
  }, [query]);
  const shown = React5__namespace.useMemo(
    () => minLevel === "all" ? lines : lines.filter((x) => levelRank[x.level] >= levelRank[minLevel]),
    [lines, minLevel]
  );
  const matchIdx = React5__namespace.useMemo(() => {
    if (!re.re) return [];
    const r = new RegExp(re.re.source, "i");
    const out = [];
    shown.forEach((x, i) => {
      if (r.test(x.text)) out.push(i);
    });
    return out;
  }, [re, shown]);
  const virt = reactVirtual.useVirtualizer({
    count: shown.length,
    getScrollElement: () => box.current,
    estimateSize: () => rowHeight,
    overscan: 10,
    initialRect: { width: 0, height },
    observeElementRect: observeRectWithFallback
  });
  React5__namespace.useEffect(() => {
    if (follow && shown.length > 0) virt.scrollToIndex(shown.length - 1, { align: "end" });
  }, [follow, shown.length, virt]);
  React5__namespace.useEffect(() => setCurrent(0), [query, minLevel]);
  const goto = (n) => {
    if (matchIdx.length === 0) return;
    const next = (n + matchIdx.length) % matchIdx.length;
    setCurrent(next);
    setFollow(false);
    virt.scrollToIndex(matchIdx[next], { align: "center" });
  };
  const onScroll = (e) => {
    const el = e.currentTarget;
    const atEnd = el.scrollHeight - el.scrollTop - el.clientHeight < rowHeight;
    if (!atEnd && follow && el.clientHeight > 0) setFollow(false);
    if (el.scrollTop === 0 && el.clientHeight > 0) onLoadOlder?.();
  };
  const download = () => {
    const blob = new Blob([shown.map((x) => `${x.time} ${x.level.toUpperCase()} ${x.text}`).join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadName;
    a.click();
    URL.revokeObjectURL(url);
  };
  const items = virt.getVirtualItems();
  const width = String(shown.length).length;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("overflow-hidden rounded-lg border border-line", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          type: "search",
          "aria-label": `${l.search} ${label}`,
          placeholder: `${l.search}\u2026`,
          "aria-invalid": re.bad || void 0,
          title: re.bad ? l.invalidPattern : void 0,
          className: "form-input h-8 max-w-xs",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              goto(current + (e.shiftKey ? -1 : 1));
            }
          }
        }
      ),
      query && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted tabular-nums", "aria-live": "polite", children: l.matches(current + 1, matchIdx.length) }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", "aria-label": l.previous, onClick: () => goto(current - 1), disabled: !matchIdx.length, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", "aria-label": l.next, onClick: () => goto(current + 1), disabled: !matchIdx.length, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { "aria-hidden": true }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("select", { "aria-label": l.level, className: "form-select h-8 w-auto", value: minLevel, onChange: (e) => setMinLevel(e.target.value), children: [
        /* @__PURE__ */ jsxRuntime.jsx("option", { value: "all", children: l.all }),
        /* @__PURE__ */ jsxRuntime.jsxs("option", { value: "info", children: [
          l.info,
          "+"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("option", { value: "warn", children: [
          l.warn,
          "+"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("option", { value: "error", children: l.error })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "ms-auto flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "check text-xs", children: [
          /* @__PURE__ */ jsxRuntime.jsx("input", { type: "checkbox", checked: wrap, onChange: (e) => setWrap(e.target.checked) }),
          l.wrap
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", "aria-pressed": follow, onClick: () => setFollow((f) => !f), children: follow ? l.pause : l.follow }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", onClick: download, disabled: shown.length === 0, children: l.download })
      ] })
    ] }),
    onLoadOlder && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "w-full border-b border-line bg-surface px-3 py-1 text-xs text-muted hover:text-fg", onClick: onLoadOlder, children: l.loadOlder }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: box,
        role: "log",
        "aria-label": label,
        tabIndex: 0,
        onScroll,
        className: "overflow-auto bg-black/30 font-mono text-[0.8125rem]",
        style: { height },
        children: shown.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "p-3 text-subtle", children: l.noLines }) : (
          // dynamic total scroll height
          /* @__PURE__ */ jsxRuntime.jsx("div", { role: "list", className: "relative", style: { height: virt.getTotalSize() }, children: items.map((v) => {
            const x = shown[v.index];
            const active = matchIdx[current] === v.index;
            return /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                role: "listitem",
                "data-index": v.index,
                ref: wrap ? virt.measureElement : void 0,
                className: chunkFTHFEMX6_cjs.cn("absolute inset-x-0 flex gap-3 px-3", levelCls[x.level], wrap ? "break-all" : "whitespace-nowrap", active && "bg-primary-light"),
                style: { top: 0, transform: `translateY(${v.start}px)`, ...wrap ? {} : { height: rowHeight } },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-subtle tabular-nums select-none", style: { minWidth: `${width}ch` }, children: v.index + 1 }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-subtle select-none", children: x.time }),
                  /* @__PURE__ */ jsxRuntime.jsx("span", { children: highlight(x.text, re.re) })
                ]
              },
              v.key
            );
          }) })
        )
      }
    )
  ] });
}
function TenantSwitcher({
  tenants,
  current,
  onSwitch,
  label: labelProp
}) {
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const sel = tenants.filter((t) => t.value === current);
  return /* @__PURE__ */ jsxRuntime.jsx(Combobox, { label: labelProp ?? laf.tenant, options: tenants, value: sel, onChange: (v) => v[0] && onSwitch(v[0].value) });
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
  const { t: laf } = chunkQ6OCMENQ_cjs.useLaf();
  const L = { ...pmLabels, ...labelsProp };
  const [query, setQuery] = React5__namespace.useState("");
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
    return /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
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
      src && /* @__PURE__ */ jsxRuntime.jsx(Badge, { tone: "neutral", children: src.from })
    ] });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3", children: [
    (searchable || baseline) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      searchable && /* @__PURE__ */ jsxRuntime.jsx(Input, { type: "search", "aria-label": L.search, placeholder: L.search, value: query, onChange: (e) => setQuery(e.target.value), className: "max-w-xs" }),
      baseline && pending > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "ms-auto flex items-center gap-2 text-sm", role: "status", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted", children: L.pending(pending) }),
        onDiscard && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", onClick: onDiscard, children: L.discard }),
        onSave && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", onClick: onSave, children: L.save })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "table-wrap", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "table", onKeyDown, children: [
        /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: laf.permission }),
          roles.map((r) => /* @__PURE__ */ jsxRuntime.jsx("th", { className: "text-center", children: r.label }, r.id))
        ] }) }),
        shown.map((g) => {
          const ids = g.permissions.map((p) => p.id);
          return /* @__PURE__ */ jsxRuntime.jsxs("tbody", { children: [
            /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "rowgroup", className: "bg-muted-bg", children: g.label }),
              roles.map((r) => /* @__PURE__ */ jsxRuntime.jsx("td", { className: "bg-muted-bg text-center", children: matrixBox(r, g.label, void 0, ids) }, r.id))
            ] }),
            g.permissions.map((p) => /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("td", { className: "ps-6", children: p.label }),
              roles.map((r) => /* @__PURE__ */ jsxRuntime.jsx("td", { className: chunkFTHFEMX6_cjs.cn("text-center", changed(r.id, p.id) && "bg-warn-bg"), "data-changed": changed(r.id, p.id) || void 0, children: matrixBox(r, p.label, p.id, [p.id]) }, r.id))
            ] }, p.id))
          ] }, g.id);
        })
      ] }),
      shown.length === 0 && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "p-4 text-sm text-muted", children: L.noMatch })
    ] })
  ] });
}

exports.Accordion = Accordion;
exports.Alert = Alert;
exports.Avatar = Avatar;
exports.Badge = Badge;
exports.Banner = Banner;
exports.Breadcrumb = Breadcrumb;
exports.Card = Card;
exports.Checkbox = Checkbox;
exports.Chip = Chip;
exports.Combobox = Combobox;
exports.Dialog = Dialog;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogTrigger = DialogTrigger;
exports.Drawer = Drawer;
exports.DrawerClose = DrawerClose;
exports.DrawerContent = DrawerContent;
exports.DrawerTrigger = DrawerTrigger;
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
exports.EmptyState = EmptyState;
exports.Field = Field;
exports.InfiniteList = InfiniteList;
exports.Input = Input;
exports.KeyValueEditor = KeyValueEditor;
exports.LABEL_SLOTS = LABEL_SLOTS;
exports.LineChart = LineChart;
exports.LogViewer = LogViewer;
exports.NumberInput = NumberInput;
exports.PageHead = PageHead;
exports.Panel = Panel;
exports.PermissionMatrix = PermissionMatrix;
exports.Popover = Popover;
exports.PopoverClose = PopoverClose;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.Radio = Radio;
exports.RadioGroup = RadioGroup;
exports.SearchInput = SearchInput;
exports.Select = Select;
exports.Skeleton = Skeleton;
exports.Slider = Slider;
exports.Sparkline = Sparkline;
exports.Spinner = Spinner;
exports.SplitPane = SplitPane;
exports.Stat = Stat;
exports.StatGrid = StatGrid;
exports.Switch = Switch;
exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.TagInput = TagInput;
exports.TenantSwitcher = TenantSwitcher;
exports.Textarea = Textarea;
exports.TimeRangePicker = TimeRangePicker;
exports.ToastProvider = ToastProvider;
exports.Tooltip = Tooltip;
exports.TooltipProvider = TooltipProvider;
exports.VirtualList = VirtualList;
exports.observeRectWithFallback = observeRectWithFallback;
exports.uiEn = uiEn;
exports.useToast = useToast;
//# sourceMappingURL=chunk-DGJMGSXK.cjs.map
//# sourceMappingURL=chunk-DGJMGSXK.cjs.map