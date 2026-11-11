'use strict';

var chunkKE2LK6EC_cjs = require('./chunk-KE2LK6EC.cjs');
var chunkPNRO35YW_cjs = require('./chunk-PNRO35YW.cjs');
var chunkGEJA4YGN_cjs = require('./chunk-GEJA4YGN.cjs');
var chunkS4QID4TP_cjs = require('./chunk-S4QID4TP.cjs');
var chunkIP6HZMS5_cjs = require('./chunk-IP6HZMS5.cjs');
var chunkVUZVPUQ7_cjs = require('./chunk-VUZVPUQ7.cjs');
var chunkQQA4GJXV_cjs = require('./chunk-QQA4GJXV.cjs');
var chunkFTHFEMX6_cjs = require('./chunk-FTHFEMX6.cjs');
var lucideReact = require('lucide-react');
var jsxRuntime = require('react/jsx-runtime');
var React31 = require('react');
var ContextPrimitive = require('@radix-ui/react-context-menu');
var DialogPrimitive3 = require('@radix-ui/react-dialog');
var DropdownPrimitive = require('@radix-ui/react-dropdown-menu');
var PopoverPrimitive = require('@radix-ui/react-popover');
var legacy = require('@tanstack/react-table/legacy');
var reactVirtual = require('@tanstack/react-virtual');
var cmdk = require('cmdk');
var HoverCardPrimitive = require('@radix-ui/react-hover-card');
var TooltipPrimitive = require('@radix-ui/react-tooltip');

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

var React31__namespace = /*#__PURE__*/_interopNamespace(React31);
var ContextPrimitive__namespace = /*#__PURE__*/_interopNamespace(ContextPrimitive);
var DialogPrimitive3__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive3);
var DropdownPrimitive__namespace = /*#__PURE__*/_interopNamespace(DropdownPrimitive);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);
var HoverCardPrimitive__namespace = /*#__PURE__*/_interopNamespace(HoverCardPrimitive);
var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespace(TooltipPrimitive);

function Table({ className, children, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ jsxRuntime.jsx("table", { className: chunkFTHFEMX6_cjs.cn("table", className), ...props, children }) });
}
function UserCell({ name, email }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "cell-user", children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Avatar, { name }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { children: name }),
      email && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "cell-sub", children: email })
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
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const from = total && pageSize ? (page - 1) * pageSize + 1 : void 0;
  const to = total && pageSize ? Math.min(page * pageSize, total) : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs("nav", { className: "pagination", "aria-label": t.pagination, children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { children: from !== void 0 ? t.showing(from, to, total) : t.pageOf(page, pageCount) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "pages", children: [
      /* @__PURE__ */ jsxRuntime.jsx("button", { className: "page-btn", "aria-label": t.previousPage, disabled: page <= 1, onClick: () => onPageChange(page - 1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "size-4", "aria-hidden": true }) }),
      pageWindow(page, pageCount).map(
        (p, i) => p === "\u2026" ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "page-btn border-transparent bg-transparent", children: "\u2026" }, `gap${i}`) : /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsx("button", { className: "page-btn", "aria-label": t.nextPage, disabled: page >= pageCount, onClick: () => onPageChange(page + 1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "size-4", "aria-hidden": true }) })
    ] })
  ] });
}
function AdminShell({
  sidebar,
  topbar,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "admin", children: [
    /* @__PURE__ */ jsxRuntime.jsx("aside", { className: "admin-side", children: sidebar }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "admin-main", children: [
      topbar && /* @__PURE__ */ jsxRuntime.jsx("header", { className: "admin-top", children: topbar }),
      /* @__PURE__ */ jsxRuntime.jsx("main", { className: "admin-content", children })
    ] })
  ] });
}
function NavGroup({ label }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "nav-group", children: label });
}
function NavLink({
  icon,
  current,
  badge,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("a", { className: chunkFTHFEMX6_cjs.cn("nav-link", className), "aria-current": current ? "page" : void 0, ...props, children: [
    icon,
    children,
    badge
  ] });
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
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const placeholder = placeholderProp ?? t.searchUsers;
  const label = labelProp ?? t.users;
  const limitReached = max !== void 0 && value.length >= max;
  const known = React31__namespace.useRef(/* @__PURE__ */ new Map());
  const toOption = (u) => {
    known.current.set(u.id, u);
    return { value: u.id, label: u.name, description: u.email };
  };
  const search = React31__namespace.useCallback(
    async (q) => (await onSearch(q)).map(toOption),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSearch]
  );
  const opts = value.map(toOption);
  return /* @__PURE__ */ jsxRuntime.jsx(
    chunkGEJA4YGN_cjs.Combobox,
    {
      label,
      placeholder,
      disabled,
      multiple,
      options: search,
      value: opts,
      emptyText: limitReached ? `Limit of ${max} reached` : void 0,
      renderOption: (o) => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Avatar, { name: o.label }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: o.label }),
          o.description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-subtle", children: o.description })
        ] })
      ] }),
      onChange: (next) => {
        if (multiple && max !== void 0 && next.length > max) return;
        onChange(next.map((o) => known.current.get(o.value)).filter(Boolean));
      }
    }
  );
}
var deviceIcon = { phone: lucideReact.Smartphone, laptop: lucideReact.Laptop, tablet: lucideReact.Tablet, key: lucideReact.KeyRound };
function DeviceSelector({
  devices,
  value,
  onValueChange,
  name,
  legend
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("fieldset", { className: "device-list border-0 p-0", children: [
    /* @__PURE__ */ jsxRuntime.jsx("legend", { className: "sr-only", children: legend }),
    devices.map((d) => {
      const Icon = deviceIcon[d.kind];
      return /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "device-option", children: [
        /* @__PURE__ */ jsxRuntime.jsx("input", { type: "radio", name, value: d.id, checked: value === d.id, onChange: () => onValueChange(d.id) }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "device-icon", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "device-meta", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "device-name", children: d.name }),
          d.detail && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "device-sub", children: d.detail })
        ] }),
        d.badge,
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "device-radio", "aria-hidden": true })
      ] }, d.id);
    })
  ] });
}
var iconTone = { ok: "ok", warn: "warn", danger: "danger", neutral: "" };
var badgeTone = { ok: "ok", warn: "warn", danger: "danger", neutral: "neutral" };
function AuditLog({ events }) {
  const days = [...new Set(events.map((e) => e.day))];
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "audit", children: days.map((day) => /* @__PURE__ */ jsxRuntime.jsxs(React31__namespace.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "audit-day", children: day }),
    events.filter((e) => e.day === day).map((e) => /* @__PURE__ */ jsxRuntime.jsxs("details", { className: "audit-row", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("summary", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "audit-time", children: e.time }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkFTHFEMX6_cjs.cn("audit-icon", iconTone[e.severity]), children: e.icon }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "audit-event", children: [
          /* @__PURE__ */ jsxRuntime.jsx("b", { children: e.actor }),
          " ",
          e.action,
          e.target && /* @__PURE__ */ jsxRuntime.jsx("small", { children: e.target })
        ] }),
        e.result ? /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: badgeTone[e.severity], children: e.result }) : /* @__PURE__ */ jsxRuntime.jsx("span", {})
      ] }),
      e.details && /* @__PURE__ */ jsxRuntime.jsx("dl", { className: "audit-detail", children: Object.entries(e.details).map(([k, v]) => /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("dt", { children: k }),
        /* @__PURE__ */ jsxRuntime.jsx("dd", { children: v })
      ] }, k)) })
    ] }, e.id))
  ] }, day)) });
}
function BrandHeader({
  icon,
  logoSrc,
  name,
  title,
  subtitle,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("header", { className: chunkFTHFEMX6_cjs.cn("header", className), children: [
    logoSrc ? /* @__PURE__ */ jsxRuntime.jsx("img", { src: logoSrc, alt: name ?? "", className: "logo mx-auto" }) : icon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "brand-icon", "aria-hidden": true, children: icon }),
    name && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "brand-name", children: name }),
    title && /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "page-title", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "page-subtitle", children: subtitle })
  ] });
}
function SocialDivider({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "social-divider", role: "separator", children: /* @__PURE__ */ jsxRuntime.jsx("span", { children }) });
}
function SocialButtons({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("social-buttons", className), ...props });
}
function SocialButton({
  icon,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("a", { className: chunkFTHFEMX6_cjs.cn("btn-social", className), ...props, children: [
    icon,
    children
  ] });
}
function AccountList({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("account-list", className), ...props });
}
function AccountItem({
  name,
  email,
  avatarSrc,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "submit", className: chunkFTHFEMX6_cjs.cn("account-item", className), ...props, children: [
    avatarSrc ? /* @__PURE__ */ jsxRuntime.jsx("img", { src: avatarSrc, alt: "", className: "account-avatar" }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "account-avatar account-avatar-initial", "aria-hidden": true, children: name.charAt(0) }),
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "account-details", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "account-name", children: name }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "account-email", children: email })
    ] })
  ] });
}
function ClientInfo({
  name,
  description,
  logoSrc,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("client-info", className), children: [
    logoSrc ? /* @__PURE__ */ jsxRuntime.jsx("img", { src: logoSrc, alt: "", className: "client-logo" }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "client-logo-placeholder", "aria-hidden": true, children: name.charAt(0).toUpperCase() }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "client-details", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "client-name", children: name }),
      description && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "client-description", children: description })
    ] })
  ] });
}
function ScopeList({
  scopes,
  icon,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsx("ul", { className: chunkFTHFEMX6_cjs.cn("scope-list", className), children: scopes.map((s) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "scope-item", children: [
    icon ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "scope-icon", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { children: s.description })
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
  const [inner, setInner] = React31__namespace.useState(defaultValue);
  const current = value ?? inner;
  const { t: laf } = chunkQQA4GJXV_cjs.useLaf();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      type: "text",
      inputMode: "numeric",
      autoComplete: "one-time-code",
      pattern: `[0-9]{${length}}`,
      maxLength: length,
      "aria-label": laf.oneTimeCode,
      className: chunkFTHFEMX6_cjs.cn("form-input otp-input", className),
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      type: "text",
      autoComplete: "off",
      autoCapitalize: "characters",
      spellCheck: false,
      className: chunkFTHFEMX6_cjs.cn("code-input", className),
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
  const { t: laf } = chunkQQA4GJXV_cjs.useLaf();
  const copyLabel = copyLabelProp ?? laf.copyCode;
  const copiedLabel = copiedLabelProp ?? laf.copied;
  const [copied, setCopied] = React31__namespace.useState(false);
  React31__namespace.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex items-stretch gap-2", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("output", { className: "code-display flex-1 select-all", children: code }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        className: "btn btn-secondary auto",
        onClick: copy,
        "aria-label": copied ? copiedLabel : copyLabel,
        children: copied ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Copy, { "aria-hidden": true })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", role: "status", children: copied ? copiedLabel : "" })
  ] });
}
function DeviceSteps({ steps, current, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("ol", { className: chunkFTHFEMX6_cjs.cn("device-steps", className), children: steps.map((step, i) => /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      className: chunkFTHFEMX6_cjs.cn(i < current && "done", i === current && "current"),
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("info-box", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "info-box-title", children: title }),
    /* @__PURE__ */ jsxRuntime.jsx("ul", { children: items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: item }, i)) })
  ] });
}
function LanguageSwitcher({
  languages,
  current,
  className,
  label
}) {
  const { t: laf } = chunkQQA4GJXV_cjs.useLaf();
  return /* @__PURE__ */ jsxRuntime.jsx("nav", { className: chunkFTHFEMX6_cjs.cn("lang-switch", className), "aria-label": label ?? laf.language, children: languages.map((l) => /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx("footer", { className: chunkFTHFEMX6_cjs.cn("footer", className), children: /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "footer-text", children: [
    icon,
    children
  ] }) });
}
var taskTone = { queued: "neutral", running: "primary", ok: "ok", failed: "danger", cancelled: "warn" };
var taskStatuses = ["queued", "running", "ok", "failed", "cancelled"];
function TaskPanel({
  tasks,
  onCancel,
  onRetry,
  onOpenTarget,
  filterable,
  currentUser,
  docked,
  labels: labelsProp
}) {
  const { t: laf, format: format2 } = chunkQQA4GJXV_cjs.useLaf();
  const labels = {
    cancel: laf.cancel,
    retry: laf.retry,
    empty: laf.noRecentTasks,
    all: laf.vsFilterAll,
    mine: laf.vsFilterMine,
    status: laf.vsStatusFilter,
    details: laf.vsDetails,
    openTarget: laf.vsOpenTarget,
    ...labelsProp
  };
  const [scope, setScope] = React31__namespace.useState("all");
  const [status, setStatus] = React31__namespace.useState("all");
  const [open, setOpen] = React31__namespace.useState(() => /* @__PURE__ */ new Set());
  const visible = tasks.filter(
    (t) => (scope === "all" || t.initiator === currentUser) && (status === "all" || t.status === status)
  );
  const toggle = (id) => setOpen((o) => {
    const n = new Set(o);
    if (!n.delete(id)) n.add(id);
    return n;
  });
  const linkBtn = "border-0 bg-transparent p-0 text-primary hover:underline";
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid gap-2", docked && "h-full content-start"), children: [
    filterable && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2 px-1 text-sm", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { role: "group", "aria-label": `${labels.all} / ${labels.mine}`, className: "flex gap-1", children: ["all", "mine"].map((k) => /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          "aria-pressed": scope === k,
          className: chunkFTHFEMX6_cjs.cn("btn btn-ghost btn-sm", scope === k && "bg-primary-light"),
          onClick: () => setScope(k),
          children: labels[k]
        },
        k
      )) }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "select",
        {
          "aria-label": labels.status,
          value: status,
          onChange: (e) => setStatus(e.target.value),
          className: "rounded-sm border border-line bg-surface px-2 py-1 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("option", { value: "all", children: labels.all }),
            taskStatuses.map((st) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: st, children: st }, st))
          ]
        }
      )
    ] }),
    visible.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "px-4 py-6 text-center text-sm text-muted", children: labels.empty }) : /* @__PURE__ */ jsxRuntime.jsx("ul", { className: chunkFTHFEMX6_cjs.cn("divide-y divide-line bg-surface", !docked && "rounded-lg border border-line"), children: visible.map((t) => {
      const expandable = !!(t.detail || t.error);
      const expanded = open.has(t.id);
      return /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "grid gap-1.5 px-4 py-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
          expandable && /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              "aria-expanded": expanded,
              "aria-label": labels.details,
              onClick: () => toggle(t.id),
              className: "border-0 bg-transparent p-0 text-muted",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: chunkFTHFEMX6_cjs.cn("size-4 transition-transform", expanded && "rotate-90"), "aria-hidden": true })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "min-w-0 flex-1 truncate font-medium text-fg", children: [
            t.name,
            t.target && (onOpenTarget ? /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: chunkFTHFEMX6_cjs.cn(linkBtn, "ms-2 font-normal"), onClick: () => onOpenTarget(t), children: t.target }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-2 font-normal text-muted", children: t.target }))
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-live": "polite", children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: taskTone[t.status], children: t.status }) }),
          t.status === "running" && onCancel && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: linkBtn, onClick: () => onCancel(t.id), children: labels.cancel }),
          t.status === "failed" && onRetry && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: linkBtn, onClick: () => onRetry(t.id), children: labels.retry })
        ] }),
        t.status === "running" && /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Progress, { label: t.name, value: t.progress }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-mono text-xs text-subtle", children: [t.initiator, t.started, t.durationMs !== void 0 ? format2.duration(t.durationMs) : void 0].filter(Boolean).join(" \xB7 ") }),
        t.error && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs text-danger", children: t.error }),
        expanded && t.detail && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs text-muted", children: t.detail })
      ] }, t.id);
    }) })
  ] });
}
function UserMenu({
  name,
  email,
  tenant,
  avatarSrc,
  items,
  signOutLabel: signOutLabelProp,
  onSignOut,
  impersonating,
  expiresAt,
  expiryWarnMs = 3e5,
  expiryLabel = (r) => `Session expires in ${r}`
}) {
  const { t: laf, format: format2 } = chunkQQA4GJXV_cjs.useLaf();
  const signOutLabel = signOutLabelProp ?? laf.signOut;
  const remainingMs = expiresAt === void 0 ? void 0 : new Date(expiresAt).getTime() - Date.now();
  const showExpiry = remainingMs !== void 0 && remainingMs <= expiryWarnMs;
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx("button", { className: "border-0 bg-transparent p-0", children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Avatar, { name, src: avatarSrc }) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenuContent, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenuLabel, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-fg", children: name }),
        email && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs font-normal text-muted", children: email }),
        tenant && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs font-normal text-subtle", children: tenant })
      ] }),
      (impersonating || showExpiry) && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuSeparator, {}),
      impersonating && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuItem, { onSelect: impersonating.onStop, children: `${impersonating.stopLabel ?? "Stop impersonating"}: ${impersonating.as}` }),
      showExpiry && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "status", className: "px-2 py-1.5 text-xs text-warn", children: expiryLabel(format2.duration(Math.max(0, remainingMs))) }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuSeparator, {}),
      items?.map((it) => /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenuItem, { onSelect: it.onSelect, children: [
        it.icon,
        it.label
      ] }, it.id)),
      items && items.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenuItem, { danger: true, onSelect: onSignOut, children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.LogOut, { "aria-hidden": true }),
        signOutLabel
      ] })
    ] })
  ] });
}
var ContextMenu = ContextPrimitive__namespace.Root;
var ContextMenuTrigger = ContextPrimitive__namespace.Trigger;
function ContextMenuContent({ className, ...props }) {
  const container = chunkQQA4GJXV_cjs.usePortalContainer();
  return /* @__PURE__ */ jsxRuntime.jsx(ContextPrimitive__namespace.Portal, { container, children: /* @__PURE__ */ jsxRuntime.jsx(ContextPrimitive__namespace.Content, { className: chunkFTHFEMX6_cjs.cn("dropdown-menu relative! top-auto! start-auto! z-30 min-w-48", className), ...props }) });
}
function ContextMenuItem({ danger, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ContextPrimitive__namespace.Item,
    {
      className: chunkFTHFEMX6_cjs.cn("dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg", danger && "danger", className),
      ...props
    }
  );
}
function ContextMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(ContextPrimitive__namespace.Separator, { className: chunkFTHFEMX6_cjs.cn("dropdown-sep", className), ...props });
}
function CommandPalette({
  commands,
  open,
  onOpenChange,
  placeholder: placeholderProp,
  emptyText: emptyTextProp,
  search,
  recent,
  onCommandRun
}) {
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const portalContainer = chunkQQA4GJXV_cjs.usePortalContainer();
  const placeholder = placeholderProp ?? t.commandPlaceholder;
  const emptyText = emptyTextProp ?? t.noResults;
  const [query, setQuery] = React31__namespace.useState("");
  const [active, setActive] = React31__namespace.useState(0);
  const [remote, setRemote] = React31__namespace.useState(null);
  const [pending, setPending] = React31__namespace.useState(false);
  const listId = React31__namespace.useId();
  React31__namespace.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  React31__namespace.useEffect(() => {
    if (!open) {
      setQuery("");
      setRemote(null);
    }
  }, [open]);
  React31__namespace.useEffect(() => {
    if (!search || !open || !query) {
      setRemote(null);
      setPending(false);
      return;
    }
    let stale = false;
    setPending(true);
    search(query).then(
      (items) => {
        if (stale) return;
        setRemote({ query, items });
        setPending(false);
      },
      () => {
        if (stale) return;
        setRemote({ query, items: [] });
        setPending(false);
      }
    );
    return () => {
      stale = true;
    };
  }, [search, query, open]);
  const q = query.toLowerCase();
  const sections = React31__namespace.useMemo(() => {
    const out = [];
    if (!q) {
      if (recent?.length) out.push({ heading: t.recent, items: recent });
    }
    const seen = /* @__PURE__ */ new Set();
    const all = [...commands.filter((c) => c.label.toLowerCase().includes(q)), ...remote?.query === query ? remote.items : []].filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
    const byGroup = /* @__PURE__ */ new Map();
    all.forEach((c) => byGroup.set(c.group, [...byGroup.get(c.group) ?? [], c]));
    const grouped = [...byGroup.keys()].some((g) => g !== void 0);
    byGroup.forEach((items, group) => out.push({ heading: grouped ? group : void 0, items }));
    return out;
  }, [commands, remote, q, query, recent, t.recent]);
  const results = sections.flatMap((s) => s.items.map((c) => ({ c, section: s })));
  React31__namespace.useEffect(() => setActive(0), [query]);
  const run = (c) => {
    onOpenChange(false);
    c.onSelect();
    onCommandRun?.(c);
  };
  let flat = 0;
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive3__namespace.Portal, { container: portalContainer, children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive3__namespace.Content,
      {
        "aria-describedby": void 0,
        className: "popup fixed top-[20%] start-1/2 z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 rtl:translate-x-1/2 overflow-hidden p-0",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Title, { className: "sr-only", children: t.commandPalette }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 border-b border-line px-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "size-4 text-subtle", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntime.jsx(
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
                  else if (e.key === "Enter" && results[active]) run(results[active].c);
                  else return;
                  e.preventDefault();
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { id: listId, role: "listbox", "aria-busy": pending, className: "m-0 max-h-72 overflow-auto p-1", children: [
            results.length === 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-3 py-2 text-sm text-muted", children: pending ? t.loading : emptyText }),
            sections.map((sec, si) => {
              const headId = `${listId}-h${si}`;
              return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-labelledby": sec.heading ? headId : void 0, children: [
                sec.heading && /* @__PURE__ */ jsxRuntime.jsx("div", { id: headId, role: "presentation", className: "px-3 pt-2 pb-1 text-xs font-medium text-subtle", children: sec.heading }),
                sec.items.map((c) => {
                  const i = flat++;
                  return /* @__PURE__ */ jsxRuntime.jsxs(
                    "div",
                    {
                      id: `${listId}-${i}`,
                      role: "option",
                      "aria-selected": i === active,
                      onMouseEnter: () => setActive(i),
                      onClick: () => run(c),
                      className: chunkFTHFEMX6_cjs.cn("flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-muted", i === active && "bg-surface-hover text-fg"),
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children: c.label }),
                        c.group && !sec.heading && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-subtle", children: c.group }),
                        c.shortcut && /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Kbd, { children: c.shortcut })
                      ]
                    },
                    `${si}-${c.id}`
                  );
                })
              ] }, si);
            })
          ] })
        ]
      }
    )
  ] }) });
}
function DiffView({ before, after, label, mode = "split" }) {
  const ops = React31__namespace.useMemo(() => chunkS4QID4TP_cjs.diffLines(before, after), [before, after]);
  const wrap = "overflow-auto rounded-md border border-line bg-black/30 font-mono text-[0.8125rem]";
  if (mode === "unified")
    return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "group", "aria-label": label, className: wrap, children: ops.map((op, i) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("px-3 whitespace-pre", op.type === "del" && "bg-danger-bg text-danger", op.type === "add" && "bg-ok-bg text-ok"), children: [
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "group", "aria-label": label, className: wrap, children: rows.map((row, i) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 divide-x divide-line", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("px-3 whitespace-pre", row.kind === "change" && row.l !== void 0 && "bg-danger-bg text-danger"), children: row.l ?? "" }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("px-3 whitespace-pre", row.kind === "change" && row.r !== void 0 && "bg-ok-bg text-ok"), children: row.r ?? "" })
  ] }, i)) });
}
function MfaEnrolment({ qr, secret, recoveryCodes, onVerify, onRegisterPasskey, onComplete, labels }) {
  const { t: laf } = chunkQQA4GJXV_cjs.useLaf();
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
    download: "Download .txt",
    print: "Print",
    switchMethod: "Use a different method",
    genericError: "Something went wrong. Try again.",
    ...labels
  };
  const [step, setStep] = React31__namespace.useState(0);
  const [method, setMethod] = React31__namespace.useState("totp");
  const [code, setCode] = React31__namespace.useState("");
  const [error, setError] = React31__namespace.useState();
  const [busy, setBusy] = React31__namespace.useState(false);
  const [stored, setStored] = React31__namespace.useState(false);
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
    } catch {
      setError(l.genericError);
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
  const downloadCodes = () => {
    const url = URL.createObjectURL(new Blob([recoveryCodes.join("\n") + "\n"], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  const switchMethod = () => {
    setError(void 0);
    setCode("");
    setMethod(method === "totp" ? "passkey" : "totp");
    setStep(0);
  };
  const canSwitch = !!onRegisterPasskey && (id === "s" || id === "v" || id === "p");
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-6 md:grid-cols-[13rem_1fr]", children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Stepper, { steps, current: step, onStepClick: (i) => setStep(i) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "card", children: [
      id === "m" && /* @__PURE__ */ jsxRuntime.jsx(
        chunkGEJA4YGN_cjs.RadioGroup,
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
      id === "s" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mx-auto rounded-md bg-white p-3 text-black", children: qr }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.SecretDisplay, { label: l.manualSecret, value: secret, acknowledgeLabel: l.addedToApp })
      ] }),
      id === "v" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(OtpInput, { value: code, onChange: setCode, onComplete: () => void 0 }),
        error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "field-error", role: "alert", children: error })
      ] }),
      id === "p" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3 text-sm text-muted", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Fingerprint, { className: "mx-auto size-8 text-primary", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { role: "status", className: "text-center", children: busy ? l.passkeyWaiting : "" }),
        error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "field-error text-center", role: "alert", children: error })
      ] }),
      id === "r" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none grid-cols-2 gap-2 p-0 font-mono text-sm text-fg", children: recoveryCodes.map((c) => /* @__PURE__ */ jsxRuntime.jsx("li", { className: "rounded-sm border border-line bg-muted-bg px-2 py-1", children: c }, c)) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", onClick: downloadCodes, children: l.download }),
          /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", onClick: () => window.print(), children: l.print })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "check text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx("input", { type: "checkbox", checked: stored, onChange: (e) => setStored(e.target.checked) }),
          l.stored
        ] })
      ] }),
      canSwitch && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "mt-3 border-0 bg-transparent p-0 text-sm text-primary hover:underline", disabled: busy, onClick: switchMethod, children: l.switchMethod }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", disabled: step === 0 || busy, onClick: () => setStep(step - 1), children: l.back }),
        id === "v" ? /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", loading: busy, disabled: code.length < 6, onClick: verify, children: l.verify }) : id === "p" ? /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", loading: busy, leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.KeyRound, {}), onClick: register, children: l.passkey }) : id === "r" ? /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", disabled: !stored, onClick: onComplete, children: l.finish }) : /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", onClick: () => setStep(step + 1), children: l.next })
      ] })
    ] })
  ] });
}
var pad = (n) => String(n).padStart(2, "0");
var iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
var ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
function DatePicker(props) {
  const { label: labelProp, placeholder: placeholderProp, min, max, disabledDates, showTimeZone } = props;
  const mode = props.mode ?? "date";
  const { t: laf, timeZone } = chunkQQA4GJXV_cjs.useLaf();
  const label = labelProp ?? laf.chooseDate;
  const placeholder = placeholderProp ?? laf.datePlaceholder;
  const [open, setOpen] = React31__namespace.useState(false);
  const range = mode === "range" ? props.value ?? {} : {};
  const single = mode === "range" ? void 0 : props.value;
  const day = mode === "range" ? range.from : single?.slice(0, 10);
  const time = mode === "datetime" ? single?.slice(11, 16) || "00:00" : "00:00";
  const base = day ? /* @__PURE__ */ new Date(`${day}T00:00:00`) : /* @__PURE__ */ new Date();
  const [view, setView] = React31__namespace.useState({ y: base.getFullYear(), m: base.getMonth() });
  const [typed, setTyped] = React31__namespace.useState(null);
  const first = new Date(view.y, view.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((offset + days) / 7) * 7 }, (_, i) => i - offset + 1);
  const shift = (delta) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const title = first.toLocaleDateString(void 0, { month: "long", year: "numeric" });
  const isDisabled = (v) => min !== void 0 && v < min || max !== void 0 && v > max || !!disabledDates?.(v);
  const commitDay = (v) => {
    if (props.mode === "range") {
      if (!range.from || range.to) {
        props.onChange({ from: v });
      } else {
        props.onChange(v < range.from ? { from: v, to: range.from } : { from: range.from, to: v });
        setOpen(false);
      }
    } else if (props.mode === "datetime") {
      props.onChange(`${v}T${time}`);
    } else {
      props.onChange(v);
      setOpen(false);
    }
  };
  const commitTyped = () => {
    if (typed !== null && ISO_DATE.test(typed) && !isDisabled(typed) && !Number.isNaN((/* @__PURE__ */ new Date(`${typed}T00:00:00`)).getTime())) {
      commitDay(typed);
      const d = /* @__PURE__ */ new Date(`${typed}T00:00:00`);
      setView({ y: d.getFullYear(), m: d.getMonth() });
    }
    setTyped(null);
  };
  const text = mode === "range" ? range.from && `${range.from} \u2013 ${range.to ?? "\u2026"}` : mode === "datetime" ? single && single.replace("T", " ") : single;
  const inRange = (v) => mode === "range" && !!range.from && !!range.to && v >= range.from && v <= range.to;
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": `${label}: ${text || placeholder}`, className: chunkFTHFEMX6_cjs.cn("input inline-flex items-center text-start font-mono", mode === "date" ? "w-44" : "w-56"), children: text || /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted", children: placeholder }) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.PopoverContent, { className: "w-64", children: [
      mode !== "range" && /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": label,
          placeholder: laf.datePlaceholder,
          className: "form-input mb-2 h-8 font-mono",
          value: typed ?? day ?? "",
          onChange: (e) => setTyped(e.target.value),
          onBlur: commitTyped,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitTyped();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", "aria-label": laf.previousMonth, onClick: () => shift(-1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { size: 14 }) }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", "aria-live": "polite", children: title }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", "aria-label": laf.nextMonth, onClick: () => shift(1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 14 }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "grid", "aria-label": title, className: "grid grid-cols-7 gap-0.5 text-center text-xs", children: [
        laf.weekdaysShort.map((d) => /* @__PURE__ */ jsxRuntime.jsx("span", { role: "columnheader", className: "py-1 text-muted", children: d }, d)),
        cells.map((d, i) => {
          if (d < 1 || d > days) return /* @__PURE__ */ jsxRuntime.jsx("span", { role: "gridcell" }, i);
          const v = iso(view.y, view.m, d);
          const selected = v === day || mode === "range" && v === range.to;
          return /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              role: "gridcell",
              disabled: isDisabled(v),
              "aria-selected": selected || inRange(v),
              "aria-label": v,
              onClick: () => commitDay(v),
              className: chunkFTHFEMX6_cjs.cn(
                "h-8 rounded-sm border-0 bg-transparent font-mono text-fg hover:bg-muted-bg disabled:opacity-40",
                inRange(v) && "bg-primary-light",
                selected && "bg-primary text-primary-fg hover:bg-primary"
              ),
              children: d
            },
            i
          );
        })
      ] }),
      mode === "datetime" && /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          type: "time",
          "aria-label": laf.timeOfDay,
          className: "form-input mt-2 h-8 font-mono",
          value: time,
          onChange: (e) => props.onChange(`${day ?? iso(base.getFullYear(), base.getMonth(), base.getDate())}T${e.target.value || "00:00"}`)
        }
      ),
      (showTimeZone ?? mode !== "date") && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-2 text-xs text-muted", children: timeZone })
    ] })
  ] });
}
function StackedBarChart({
  data,
  series,
  label
}) {
  const max = Math.max(...data.map((d) => d.values.reduce((a, b) => a + b, 0)), 1);
  const tones2 = ["bg-primary", "bg-ok", "bg-warn", "bg-danger"];
  return /* @__PURE__ */ jsxRuntime.jsxs("figure", { "aria-label": label, className: "m-0 grid gap-2", children: [
    /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none gap-2 p-0", children: data.map((d) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "grid grid-cols-[6rem_1fr] items-center gap-2 text-xs text-muted", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: d.name }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex h-3 overflow-hidden rounded-sm bg-muted-bg", children: d.values.map((v, i) => /* @__PURE__ */ jsxRuntime.jsx(
        "span",
        {
          title: `${series[i]}: ${v}`,
          className: chunkFTHFEMX6_cjs.cn("block h-full", tones2[i % tones2.length]),
          style: { width: `${v / max * 100}%` }
        },
        i
      )) })
    ] }, d.name)) }),
    /* @__PURE__ */ jsxRuntime.jsx("figcaption", { className: "flex gap-3 text-xs text-muted", children: series.map((s, i) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkFTHFEMX6_cjs.cn("size-2 rounded-sm", tones2[i % tones2.length]), "aria-hidden": true }),
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "table", "aria-label": label, className: "inline-grid gap-0.5 text-xs text-muted", style: { gridTemplateColumns: `6rem repeat(${columns.length}, 2rem)` }, children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "row", className: "contents", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true }),
      columns.map((c) => /* @__PURE__ */ jsxRuntime.jsx("span", { role: "columnheader", className: "text-center", children: c }, c))
    ] }),
    rows.map((r, ri) => /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "row", className: "contents", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { role: "rowheader", className: "truncate", children: r }),
      columns.map((c, ci) => {
        const v = values[ri]?.[ci] ?? 0;
        return /* @__PURE__ */ jsxRuntime.jsx(
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
  const { t: laf } = chunkQQA4GJXV_cjs.useLaf();
  const moreLabel = moreLabelProp ?? laf.moreTabs;
  const visible = tabs.slice(0, maxVisible);
  const rest = tabs.slice(maxVisible);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 flex-wrap items-center", children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.TabsList, { children: visible.map((t) => /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.TabsTrigger, { value: t.value, children: t.label }, t.value)) }),
    rest.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenu, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": moreLabel, className: "ms-1 border-0 bg-transparent px-2 text-muted hover:text-fg", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { size: 16 }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuContent, { children: rest.map((t) => /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuItem, { onSelect: () => onSelect(t.value), children: t.label }, t.value)) })
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
  const { t: laf } = chunkQQA4GJXV_cjs.useLaf();
  const title = titleProp ?? laf.recentTasks;
  const [open, setOpen] = React31__namespace.useState(defaultOpen);
  const running = tasks.filter((t) => t.status === "running").length;
  return /* @__PURE__ */ jsxRuntime.jsxs("section", { "aria-label": title, className: "absolute inset-x-0 bottom-0 border-t border-line bg-surface", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        "aria-expanded": open,
        onClick: () => setOpen((o) => !o),
        className: "flex w-full items-center gap-2 border-0 bg-transparent px-4 py-2 text-start text-sm font-medium text-fg",
        children: [
          open ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { size: 14 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { size: 14 }),
          title,
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ms-auto text-xs font-normal text-muted", "aria-live": "polite", children: [
            running,
            " running"
          ] })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-h-64 overflow-auto", children: /* @__PURE__ */ jsxRuntime.jsx(TaskPanel, { tasks, onCancel, onRetry }) })
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
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { role: "group", "aria-label": label, viewBox: `0 0 ${width} ${height}`, className: "h-auto w-full max-w-2xl rounded-lg border border-line bg-surface", children: [
    edges.map((e) => {
      const a = byId.get(e.from);
      const b = byId.get(e.to);
      if (!a || !b) return null;
      return /* @__PURE__ */ jsxRuntime.jsx("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, className: "stroke-line", strokeWidth: 1.5 }, `${e.from}-${e.to}`);
    }),
    nodes.map((n) => /* @__PURE__ */ jsxRuntime.jsxs(
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
          /* @__PURE__ */ jsxRuntime.jsx(
            "rect",
            {
              x: n.x - 40,
              y: n.y - 14,
              width: 80,
              height: 28,
              rx: 3,
              strokeWidth: selectedId === n.id ? 2 : 1.5,
              className: chunkFTHFEMX6_cjs.cn("fill-muted-bg", n.tone ? tone[n.tone] : "stroke-line")
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("text", { x: n.x, y: n.y + 4, textAnchor: "middle", className: "fill-fg font-mono text-[11px]", children: n.label })
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
function CodeEditorLite({
  value,
  onChange,
  language = "json",
  label,
  rows = 10
}) {
  const layer = "m-0 whitespace-pre-wrap break-words p-3 font-mono text-sm leading-5";
  const height = { minHeight: `${rows * 1.25}rem` };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative rounded-md border border-line bg-surface focus-within:border-primary", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("pre", { "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn(layer, "pointer-events-none"), style: height, children: [
      highlight(value, language).map((t, i) => /* @__PURE__ */ jsxRuntime.jsx("span", { className: t.cls, children: t.text }, i)),
      "\n"
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "textarea",
      {
        "aria-label": label,
        spellCheck: false,
        value,
        onChange: (e) => onChange(e.target.value),
        className: chunkFTHFEMX6_cjs.cn(layer, "absolute inset-0 size-full resize-none border-0 bg-transparent text-transparent caret-fg outline-none")
      }
    )
  ] });
}
var CodeEditor = CodeEditorLite;
var contentCls = "dropdown-menu relative! top-auto! start-auto! z-50 min-w-48";
var itemCls = "dropdown-item cursor-default outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
function MenuShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Kbd, { className: chunkFTHFEMX6_cjs.cn("ms-auto", className), ...props });
}
function disabledProps(d) {
  return d ? { disabled: true, title: typeof d === "string" ? d : void 0 } : {};
}
function renderItems(P, items) {
  const X9 = P;
  return items.map((it, i) => {
    const key = "id" in it && it.id || `${it.type}-${i}`;
    switch (it.type) {
      case "separator":
        return /* @__PURE__ */ jsxRuntime.jsx(X9.Separator, { className: "dropdown-sep" }, key);
      case "label":
        return /* @__PURE__ */ jsxRuntime.jsx(X9.Label, { className: "dropdown-label", children: it.label }, key);
      case "checkbox":
        return /* @__PURE__ */ jsxRuntime.jsxs(X9.CheckboxItem, { className: chunkFTHFEMX6_cjs.cn(itemCls, "relative ps-8"), checked: it.checked, onCheckedChange: it.onCheckedChange, ...disabledProps(it.disabled), children: [
          /* @__PURE__ */ jsxRuntime.jsx(X9.ItemIndicator, { className: "absolute start-3 inline-flex", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "size-3.5", "aria-hidden": true }) }),
          it.label
        ] }, key);
      case "radio":
        return /* @__PURE__ */ jsxRuntime.jsx(X9.RadioGroup, { value: it.value, onValueChange: it.onValueChange, children: it.options.map((o) => /* @__PURE__ */ jsxRuntime.jsxs(X9.RadioItem, { value: o.value, className: chunkFTHFEMX6_cjs.cn(itemCls, "relative ps-8"), children: [
          /* @__PURE__ */ jsxRuntime.jsx(X9.ItemIndicator, { className: "absolute start-3.5 inline-flex", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Circle, { className: "size-2 fill-current", "aria-hidden": true }) }),
          o.label
        ] }, o.value)) }, key);
      case "submenu":
        return /* @__PURE__ */ jsxRuntime.jsxs(X9.Sub, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(X9.SubTrigger, { className: itemCls, ...disabledProps(it.disabled), children: [
            it.icon,
            it.label,
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "ms-auto size-3.5 rtl:rotate-180", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(X9.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(X9.SubContent, { sideOffset: 2, alignOffset: -4, className: contentCls, children: renderItems(P, it.items) }) })
        ] }, key);
      default:
        return /* @__PURE__ */ jsxRuntime.jsxs(X9.Item, { className: chunkFTHFEMX6_cjs.cn(itemCls, it.danger && "danger"), onSelect: () => it.onSelect(), ...disabledProps(it.disabled), children: [
          it.icon,
          it.label,
          it.shortcut && /* @__PURE__ */ jsxRuntime.jsx(MenuShortcut, { children: it.shortcut })
        ] }, key);
    }
  });
}
function Menu({
  items,
  trigger,
  align: align2 = "end",
  open,
  onOpenChange
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(DropdownPrimitive__namespace.Root, { open, onOpenChange, children: [
    /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.Content, { align: align2, sideOffset: 4, collisionPadding: 8, className: contentCls, children: renderItems(DropdownPrimitive__namespace, items) }) })
  ] });
}
function ContextMenuFor({ items, children, disabled }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(ContextPrimitive__namespace.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ContextPrimitive__namespace.Trigger, { asChild: true, disabled, children }),
    /* @__PURE__ */ jsxRuntime.jsx(ContextPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(ContextPrimitive__namespace.Content, { collisionPadding: 8, className: contentCls, children: renderItems(ContextPrimitive__namespace, items) }) })
  ] });
}
function useUnsavedChangesGuard(dirty) {
  const [queued, setQueued] = React31__namespace.useState(null);
  React31__namespace.useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);
  const guard = React31__namespace.useCallback(
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
  const confirm = React31__namespace.useCallback(() => {
    const action = queued;
    setQueued(null);
    action?.();
  }, [queued]);
  const cancel = React31__namespace.useCallback(() => setQueued(null), []);
  return { pending: queued !== null, dirty, guard, confirm, cancel };
}
function UnsavedChangesDialog({
  guard,
  title: titleProp,
  description: descriptionProp,
  confirmLabel: confirmLabelProp,
  cancelLabel: cancelLabelProp
}) {
  const u = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults).t.components.ui.unsavedChanges;
  const title = titleProp ?? u.title;
  const description = descriptionProp ?? u.description;
  const confirmLabel = confirmLabelProp ?? u.confirm;
  const cancelLabel = cancelLabelProp ?? u.cancel;
  return /* @__PURE__ */ jsxRuntime.jsx(
    chunkPNRO35YW_cjs.ConfirmDialog,
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
var lafDefaults = { ui: chunkGEJA4YGN_cjs.uiEn };
function FormSection({
  title,
  description,
  columns = 2,
  children,
  className
}) {
  const id = React31__namespace.useId();
  return /* @__PURE__ */ jsxRuntime.jsxs("section", { "aria-labelledby": `${id}-t`, className: chunkFTHFEMX6_cjs.cn("grid gap-4 border-b border-line py-6 first:pt-0 last:border-b-0", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("h2", { id: `${id}-t`, className: "text-base font-semibold text-fg", children: title }),
      description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-0.5 text-sm text-muted", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("grid grid-cols-1 gap-4", columns === 2 && "md:grid-cols-2"), children })
  ] });
}
function FormFooter({
  onCancel,
  onSave,
  saveLabel: saveLabelProp,
  cancelLabel: cancelLabelProp,
  pending,
  dirty,
  guard,
  saveType = "button",
  sticky = true,
  children,
  className
}) {
  const f = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults).t.components.ui.formFooter;
  const saveLabel = saveLabelProp ?? f.save;
  const cancelLabel = cancelLabelProp ?? f.cancel;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunkFTHFEMX6_cjs.cn(
        "flex items-center gap-2 border-t border-line bg-bg px-4 py-3",
        sticky && "sticky bottom-0 z-10",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 flex-1 text-sm text-muted", role: "status", children }),
        onCancel && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", onClick: () => guard ? guard.guard(onCancel) : onCancel(), children: cancelLabel }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { type: saveType, onClick: onSave, loading: pending, disabled: dirty === false, children: saveLabel })
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
  className,
  as: Tag = "header"
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(Tag, { className: chunkFTHFEMX6_cjs.cn("flex h-12 items-center gap-3 border-b border-line bg-surface px-3", className), children: [
    start,
    logo && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex shrink-0 items-center font-semibold text-fg", children: logo }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mx-auto flex min-w-0 max-w-xl flex-1 items-center", children: search }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "ms-auto flex items-center gap-1", children: [
      counters?.map((c) => /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          onClick: c.onClick,
          "aria-label": `${c.label}: ${c.count}`,
          className: "btn btn-ghost btn-sm gap-1.5",
          children: [
            c.icon,
            /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, children: c.count })
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid gap-4", className), children: [
    breadcrumb && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Breadcrumb, { items: breadcrumb }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      icon,
      /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "min-w-0 text-xl font-semibold text-fg", children: title }),
      status,
      actions && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ms-auto flex items-center gap-2", children: actions })
    ] }),
    tabs,
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid gap-4", side && "lg:grid-cols-[minmax(0,1fr)_20rem]"), children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0", children }),
      side && /* @__PURE__ */ jsxRuntime.jsx("aside", { className: "min-w-0", children: side })
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("mx-auto grid w-full max-w-3xl gap-4", className), children: [
    breadcrumb && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Breadcrumb, { items: breadcrumb }),
    /* @__PURE__ */ jsxRuntime.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-xl font-semibold text-fg", children: title }),
      description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1 text-sm text-muted", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(
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
  label: labelProp,
  className
}) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults);
  const label = labelProp ?? t.components.ui.subNav.label;
  return /* @__PURE__ */ jsxRuntime.jsx("nav", { "aria-label": label, className: chunkFTHFEMX6_cjs.cn("grid w-56 gap-4 text-sm", className), children: groups.map((g) => /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-label": g.label, children: [
    g.label && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-1 px-2 text-[0.6875rem] tracking-wider text-subtle uppercase", "aria-hidden": true, children: g.label }),
    /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "grid gap-0.5", children: g.items.map((it) => {
      const cls = chunkFTHFEMX6_cjs.cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-start text-muted hover:bg-hover hover:text-fg aria-[current=page]:bg-hover aria-[current=page]:text-fg",
        it.disabled && "pointer-events-none opacity-50"
      );
      const current = value === it.id ? "page" : void 0;
      return /* @__PURE__ */ jsxRuntime.jsx("li", { children: it.href ? /* @__PURE__ */ jsxRuntime.jsxs(
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
      ) : /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "button", "aria-current": current, disabled: it.disabled, className: cls, onClick: () => onSelect?.(it.id), children: [
        it.icon,
        it.label
      ] }) }, it.id);
    }) })
  ] }, g.id)) });
}
function MobileNav({
  children,
  title: titleProp,
  triggerLabel: triggerLabelProp,
  open,
  onOpenChange,
  className
}) {
  const m = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults).t.components.ui.mobileNav;
  const title = titleProp ?? m.title;
  const triggerLabel = triggerLabelProp ?? m.trigger;
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Drawer, { open, onOpenChange, children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DrawerTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": triggerLabel, className: chunkFTHFEMX6_cjs.cn("btn btn-ghost btn-sm min-[860px]:hidden", className), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Menu, { "aria-hidden": true }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DrawerContent, { title, width: "sm", children })
  ] });
}
var lafDefaults2 = { ui: chunkGEJA4YGN_cjs.uiEn };
function Wizard({
  steps,
  onFinish,
  onCancel,
  dirty,
  title: titleProp,
  mode = "page",
  size = "xl",
  open,
  onOpenChange,
  current: currentProp,
  defaultCurrent = 0,
  onCurrentChange,
  labels: labelsProp,
  className
}) {
  const { title: defaultTitle, ...defaultLabels3 } = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults2).t.components.ui.wizard;
  const labels = { ...defaultLabels3, ...labelsProp };
  const title = titleProp ?? defaultTitle;
  const [current, setCurrent] = chunkS4QID4TP_cjs.useControllableState({
    value: currentProp,
    defaultValue: defaultCurrent,
    onChange: onCurrentChange
  });
  const [errors, setErrors] = React31__namespace.useState([]);
  const [failed, setFailed] = React31__namespace.useState({});
  const [busy, setBusy] = React31__namespace.useState(false);
  const guard = useUnsavedChangesGuard(!!dirty);
  const headingRef = React31__namespace.useRef(null);
  const mounted = React31__namespace.useRef(false);
  const errId = React31__namespace.useId();
  const step = steps[current];
  const last = current === steps.length - 1;
  React31__namespace.useEffect(() => {
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
  const body = /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunkFTHFEMX6_cjs.cn("@container grid min-w-0 gap-4", className),
      onKeyDown: (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          void advance();
        }
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid min-w-0 gap-5 @2xl:grid-cols-[12rem_minmax(0,1fr)]", children: [
          /* @__PURE__ */ jsxRuntime.jsx("nav", { "aria-label": labels.steps, children: /* @__PURE__ */ jsxRuntime.jsx(
            chunkPNRO35YW_cjs.Stepper,
            {
              className: "flex-row flex-wrap gap-x-4 gap-y-1.5 @2xl:flex-col @2xl:gap-2",
              current,
              onStepClick: goTo,
              steps: steps.map((s) => ({
                id: s.id,
                label: s.optional ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  s.label,
                  " ",
                  /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs text-subtle", children: [
                    "(",
                    labels.optional,
                    ")"
                  ] })
                ] }) : s.label,
                error: failed[s.id]
              }))
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid min-w-0 content-start gap-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "h2",
              {
                ref: headingRef,
                tabIndex: -1,
                className: "text-base font-semibold text-fg outline-none",
                children: step.label
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("div", { role: "alert", id: errId, children: errors.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "list-disc ps-5 text-sm text-danger", children: errors.map((m) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: m }, m)) }) }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { children: step.render() })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-t border-line pt-4", children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", onClick: cancel, children: labels.cancel }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "ms-auto flex flex-wrap justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              chunkIP6HZMS5_cjs.Button,
              {
                variant: "secondary",
                disabled: current === 0 || busy,
                onClick: () => goTo(current - 1),
                children: labels.back
              }
            ),
            step.optional && !last && /* @__PURE__ */ jsxRuntime.jsx(
              chunkIP6HZMS5_cjs.Button,
              {
                variant: "secondary",
                disabled: busy,
                onClick: () => void advance(true),
                children: labels.skip
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { loading: busy, onClick: () => void advance(), children: last ? labels.finish : labels.next })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(UnsavedChangesDialog, { guard })
      ]
    }
  );
  if (mode === "dialog") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      chunkGEJA4YGN_cjs.Dialog,
      {
        open,
        onOpenChange: (o) => o ? onOpenChange?.(true) : cancel(),
        children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DialogContent, { title, size, children: body })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx("section", { "aria-label": title, children: body });
}
function WizardReview({
  items,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.DefinitionList, { items, className });
}
var lafDefaults3 = { ui: chunkGEJA4YGN_cjs.uiEn };
var icons = {
  "403": /* @__PURE__ */ jsxRuntime.jsx(lucideReact.LockKeyhole, {}),
  "404": /* @__PURE__ */ jsxRuntime.jsx(lucideReact.FileQuestion, {}),
  "500": /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ServerCrash, {}),
  offline: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.WifiOff, {}),
  "session-expired": /* @__PURE__ */ jsxRuntime.jsx(lucideReact.TimerOff, {})
};
var textKey = { "403": "error403", "404": "error404", "500": "error500", offline: "errorOffline", "session-expired": "errorSessionExpired" };
function ErrorPage({
  variant,
  title,
  description,
  action,
  requestId,
  requestIdLabel: requestIdLabelProp,
  className
}) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults3);
  const ui = t.components.ui;
  const d = { icon: icons[variant], ...ui[textKey[variant]] };
  const requestIdLabel = requestIdLabelProp ?? ui.errors.requestId;
  const critical = variant === "500" || variant === "offline";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      role: critical ? "alert" : void 0,
      "data-variant": variant,
      className: chunkFTHFEMX6_cjs.cn("mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-16 text-center", className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-subtle [&>svg]:size-10", "aria-hidden": true, children: d.icon }),
        /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-xl font-semibold text-fg", children: title ?? d.title }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted", children: description ?? d.description }),
        action,
        requestId && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1 text-xs text-subtle", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
            requestIdLabel,
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("code", { className: "font-mono", children: requestId }),
          /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.CopyButton, { value: requestId, label: ui.errors.copyRequestId(requestIdLabel) })
        ] })
      ]
    }
  );
}
var LafErrorBoundary = class extends React31__namespace.Component {
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
    return /* @__PURE__ */ jsxRuntime.jsx(BoundaryFallback, { requestId: this.props.requestId?.(error), retryLabel: this.props.retryLabel, reset: this.reset });
  }
};
function BoundaryFallback({ requestId, retryLabel, reset }) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults3);
  return /* @__PURE__ */ jsxRuntime.jsx(ErrorPage, { variant: "500", requestId, action: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { onClick: reset, children: retryLabel ?? t.components.ui.errors.tryAgain }) });
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
  const [initial] = React31__namespace.useState(() => opts.views === void 0 ? readStored(storage, storageKey2) : { views: [] });
  const [views, setViews] = chunkS4QID4TP_cjs.useControllableState({
    value: opts.views,
    defaultValue: opts.defaultViews && initial.views.length === 0 ? opts.defaultViews : initial.views,
    onChange: opts.onViewsChange
  });
  const [defaultId, setDefaultId] = chunkS4QID4TP_cjs.useControllableState({
    value: opts.defaultViewId,
    defaultValue: initial.defaultId ?? null,
    onChange: opts.onDefaultViewChange
  });
  const persist = opts.views === void 0 && !!storage;
  const first = React31__namespace.useRef(true);
  React31__namespace.useEffect(() => {
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
  const [open, setOpen] = React31__namespace.useState(false);
  const [name, setName] = React31__namespace.useState("");
  const [renaming, setRenaming] = React31__namespace.useState(null);
  const [renameValue, setRenameValue] = React31__namespace.useState("");
  const commitRename = () => {
    if (renaming && renameValue.trim()) sv.rename(renaming, renameValue);
    setRenaming(null);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { type: "button", variant: "secondary", size: "sm", leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Bookmark, { className: "size-4", "aria-hidden": true }), className, children: l.views }) }),
    /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Content, { align: "end", sideOffset: 4, collisionPadding: 8, className: "dropdown-menu z-50 w-72 p-2", children: [
      sv.views.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "px-2 py-1.5 text-sm text-muted", children: l.empty }) : /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "max-h-64 overflow-auto", children: sv.views.map((v) => /* @__PURE__ */ jsxRuntime.jsx("li", { className: "flex items-center gap-1", children: renaming === v.id ? /* @__PURE__ */ jsxRuntime.jsxs(
        "form",
        {
          className: "flex flex-1 items-center gap-1",
          onSubmit: (e) => {
            e.preventDefault();
            commitRename();
          },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
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
            /* @__PURE__ */ jsxRuntime.jsx("button", { type: "submit", "aria-label": l.confirm, className: "p-1 text-muted hover:text-fg", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "size-4", "aria-hidden": true }) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: chunkFTHFEMX6_cjs.cn("dropdown-item flex-1 truncate text-start", v.query === query && "font-semibold"),
            "aria-current": v.query === query || void 0,
            title: v.query,
            onClick: () => {
              onApply(v.query, v);
              setOpen(false);
            },
            children: v.name
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": sv.defaultId === v.id ? l.unsetDefault(v.name) : l.setDefault(v.name),
            "aria-pressed": sv.defaultId === v.id,
            className: chunkFTHFEMX6_cjs.cn("p-1 hover:text-fg", sv.defaultId === v.id ? "text-primary" : "text-muted"),
            onClick: () => sv.setDefault(sv.defaultId === v.id ? null : v.id),
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Star, { className: chunkFTHFEMX6_cjs.cn("size-4", sv.defaultId === v.id && "fill-current"), "aria-hidden": true })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": l.renameView(v.name),
            className: "p-1 text-muted hover:text-fg",
            onClick: () => {
              setRenaming(v.id);
              setRenameValue(v.name);
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Pencil, { className: "size-4", "aria-hidden": true })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": l.remove(v.name), className: "p-1 text-muted hover:text-danger", onClick: () => sv.remove(v.id), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "size-4", "aria-hidden": true }) })
      ] }) }, v.id)) }),
      /* @__PURE__ */ jsxRuntime.jsxs(
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
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                "aria-label": l.name,
                placeholder: l.saveCurrent,
                className: "form-input h-8 flex-1",
                value: name,
                onChange: (e) => setName(e.target.value)
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { type: "submit", size: "sm", disabled: !name.trim(), children: l.save })
          ]
        }
      )
    ] }) })
  ] });
}
var defaultLabels = {
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
  defaultValue = "",
  onChange,
  savedViews,
  applyDefaultView = true,
  labels: labelsProp,
  disabled,
  className
}) {
  const { views: viewLabels, ...barLabels } = labelsProp ?? {};
  const l = { ...defaultLabels, ...barLabels };
  const id = React31__namespace.useId();
  const [query, setQuery] = chunkS4QID4TP_cjs.useControllableState({
    value,
    defaultValue,
    onChange: (q) => onChange?.(q, parseFilter(q))
  });
  const [draft, setDraft] = React31__namespace.useState("");
  const [open, setOpen] = React31__namespace.useState(false);
  const [active, setActive] = React31__namespace.useState(0);
  const [asyncOpts, setAsyncOpts] = React31__namespace.useState([]);
  const inputRef = React31__namespace.useRef(null);
  const userNavigated = React31__namespace.useRef(false);
  const root = React31__namespace.useRef(null);
  const parsed = React31__namespace.useMemo(() => parseFilter(query), [query]);
  const tokens = parsed.tokens;
  const svOpts = savedViews === false ? void 0 : savedViews ?? {};
  const defaultViewRef = React31__namespace.useRef(void 0);
  const applyDefault = applyDefaultView && !!svOpts && !query && value === void 0;
  const defaultInit = React31__namespace.useRef(false);
  React31__namespace.useEffect(() => {
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
  React31__namespace.useEffect(() => {
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
  const suggestions = React31__namespace.useMemo(() => {
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
  React31__namespace.useEffect(() => setActive(0), [draft]);
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex items-start gap-2", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open: open && suggestions.length > 0, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
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
              return /* @__PURE__ */ jsxRuntime.jsxs(
                "span",
                {
                  "data-testid": "filter-chip",
                  "data-invalid": bad || void 0,
                  className: chunkFTHFEMX6_cjs.cn(
                    "inline-flex h-6 items-center rounded-sm border text-xs",
                    bad ? "border-danger text-danger" : "border-line bg-muted-bg",
                    t.type === "field" && t.negated && "line-through decoration-1"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
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
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "button",
                      {
                        type: "button",
                        disabled,
                        "aria-label": l.removeFilter(text),
                        className: "pe-1.5 text-muted hover:text-fg",
                        onClick: () => removeToken(i),
                        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-3", "aria-hidden": true })
                      }
                    )
                  ]
                },
                `${i}-${text}`
              );
            }),
            /* @__PURE__ */ jsxRuntime.jsx(
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
            showClear && /* @__PURE__ */ jsxRuntime.jsx(
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
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-4", "aria-hidden": true })
              }
            )
          ]
        }
      ) }),
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
          children: /* @__PURE__ */ jsxRuntime.jsx("ul", { id: listId, role: "listbox", "aria-label": l.label, className: "dropdown-menu max-h-64 w-full overflow-auto", children: suggestions.map((s, i) => /* @__PURE__ */ jsxRuntime.jsxs(
            "li",
            {
              id: `${id}-${i}`,
              role: "option",
              "aria-selected": i === active,
              className: chunkFTHFEMX6_cjs.cn("dropdown-item cursor-pointer", i === active && "bg-surface-hover text-fg"),
              onMouseEnter: () => setActive(i),
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => pick(s),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { children: s.label }),
                s.description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-2 text-xs text-subtle", children: s.description })
              ]
            },
            s.text
          )) })
        }
      ) })
    ] }),
    svOpts && /* @__PURE__ */ jsxRuntime.jsx(
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
var btn = "btn btn-ghost btn-sm shrink-0";
function Menu3({ trigger, items, aria }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(DropdownPrimitive__namespace.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.Trigger, { className: btn, "aria-label": aria, children: trigger }),
    /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.Content, { align: "end", sideOffset: 4, className: "dropdown-menu relative! top-auto! start-auto! z-30 min-w-48", children: /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.MenuSpecItems, { items }) }) })
  ] });
}
function BarItem({ it }) {
  switch (it.type) {
    case "separator":
      return /* @__PURE__ */ jsxRuntime.jsx("span", { role: "separator", "aria-orientation": "vertical", className: "mx-1 h-5 w-px shrink-0 bg-line" });
    case "label":
      return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 px-1 text-xs text-muted", children: it.label });
    case "checkbox":
      return /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-pressed": it.checked, className: chunkFTHFEMX6_cjs.cn(btn, it.checked && "bg-primary-light"), onClick: () => it.onCheckedChange(!it.checked), children: it.label });
    case "radio":
      return /* @__PURE__ */ jsxRuntime.jsx("span", { role: "group", className: "flex shrink-0 gap-0.5", children: it.options.map((o) => /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: btn, "aria-pressed": false, onClick: () => it.onValueChange(o.value), children: o.label }, o.value)) });
    case "submenu":
      return /* @__PURE__ */ jsxRuntime.jsx(Menu3, { items: it.items, trigger: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        it.icon,
        it.label
      ] }) });
    default:
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          className: chunkFTHFEMX6_cjs.cn(btn, it.danger && "text-danger"),
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
  const ref = React31__namespace.useRef(null);
  const widths = React31__namespace.useRef([]);
  const moreW = React31__namespace.useRef(0);
  const [visible, setVisible] = React31__namespace.useState(items.length);
  const measure = React31__namespace.useCallback(() => {
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
  React31__namespace.useLayoutEffect(() => {
    widths.current = [];
    setVisible(items.length);
  }, [items]);
  React31__namespace.useLayoutEffect(() => {
    measure();
  });
  React31__namespace.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setVisible(items.length));
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);
  const shown = items.slice(0, visible);
  const hidden = items.slice(visible);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, role: "toolbar", "aria-label": label, className: chunkFTHFEMX6_cjs.cn("flex min-w-0 items-center gap-1 overflow-hidden", className), children: [
    shown.map((it, i) => /* @__PURE__ */ jsxRuntime.jsx("span", { "data-ab": i, className: "flex shrink-0 items-center", children: /* @__PURE__ */ jsxRuntime.jsx(BarItem, { it }) }, keyOf(it, i))),
    hidden.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { "data-ab-more": true, className: "ms-auto flex shrink-0", children: /* @__PURE__ */ jsxRuntime.jsx(Menu3, { aria: actions, trigger: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { className: "size-4", "aria-hidden": true }),
      actions
    ] }), items: hidden }) })
  ] });
}

// lib/messages/portal.en.ts
var portalEn = {
  layout: {
    home: "Home",
    search: "Search",
    searchPlaceholder: "Search apps, pages and people\u2026",
    appSwitcher: "Apps",
    appSwitcherTitle: "Switch app",
    currentApp: "Current app",
    allApps: "All apps",
    noApps: "No apps available",
    navigation: "Portal navigation",
    pageSections: "Page sections",
    external: "opens in a new tab",
    pages: "Pages",
    apps: "Apps",
    goTo: (title) => `Go to ${title}`,
    openApp: (name) => `Open ${name}`
  },
  home: {
    welcome: (name) => `Welcome back, ${name}`,
    welcomeAnonymous: "Welcome back",
    subtitle: "Pick up where you left off or jump to any app.",
    favourites: "Favourite apps",
    recent: "Recent apps",
    allApps: "All apps",
    announcements: "Announcements",
    quickActions: "Quick actions",
    noFavourites: "Star an app to pin it here.",
    noRecent: "Apps you open show up here.",
    noAnnouncements: "No announcements right now.",
    addFavourite: (name) => `Add ${name} to favourites`,
    removeFavourite: (name) => `Remove ${name} from favourites`,
    lastOpened: (when) => `Opened ${when}`,
    dismiss: (title) => `Dismiss announcement: ${title}`
  },
  serverGrid: {
    retry: "Retry",
    loadFailed: "The data could not be loaded.",
    rowsPerPage: "Rows per page",
    loadingData: "Loading data",
    refreshing: "Refreshing\u2026",
    results: (from, to, total) => `Showing ${from}\u2013${to} of ${total}`,
    resultsUnknown: (from, to) => `Showing ${from}\u2013${to}`,
    noResults: "No results",
    search: "Search",
    page: (page) => `Page ${page}`,
    clearFilters: "Clear filters",
    refresh: "Refresh"
  }
};
var defaultLabels2 = {
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
var storageKey = (k) => `laf:datagrid:${k}`;
function readView(viewKey) {
  if (!viewKey || typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(storageKey(viewKey)) ?? "{}");
  } catch {
    return {};
  }
}
var portalDefaults = { portal: portalEn };
var SELECT_W = 40;
var ACTION_W = 40;
var EXPAND_W = 32;
var interactive = "button,a,input,select,textarea,[role=button],[role=menuitem]";
var textOf = (n, fallback) => typeof n === "string" || typeof n === "number" ? String(n) : fallback;
var GridContext = React31__namespace.createContext(null);
function useGrid() {
  const c = React31__namespace.useContext(GridContext);
  if (!c) throw new Error("Grid toolbar components must be rendered inside <DataGrid toolbar={\u2026}>");
  return c;
}
function GridSearch({ className, placeholder }) {
  const g = useGrid();
  return /* @__PURE__ */ jsxRuntime.jsxs("label", { className: chunkFTHFEMX6_cjs.cn("relative inline-flex items-center", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "pointer-events-none absolute start-2 size-3.5 text-subtle", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "group", "aria-label": g.labels.density, className: "inline-flex border border-line", children: ["compact", "default"].map((d) => /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      type: "button",
      "aria-pressed": g.density === d,
      onClick: () => g.setDensity(d),
      className: chunkFTHFEMX6_cjs.cn("inline-flex h-8 items-center gap-1 px-2 text-xs", g.density === d ? "bg-primary/15 text-fg" : "text-muted hover:bg-surface-hover"),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Rows3, { className: "size-3.5", "aria-hidden": true }),
        d === "compact" ? g.labels.compact : g.labels.comfortable
      ]
    },
    d
  )) });
}
function GridColumnsMenu() {
  const g = useGrid();
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Popover, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "button", className: "inline-flex h-8 items-center gap-1 border border-line px-2 text-xs text-muted hover:bg-surface-hover", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Columns3, { className: "size-3.5", "aria-hidden": true }),
      g.labels.columns
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.PopoverContent, { align: "end", className: "w-60 p-2", children: /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "flex flex-col gap-0.5", children: g.columns.map((c, i) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-center gap-2 px-1 py-0.5 text-sm", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "flex flex-1 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx("input", { type: "checkbox", checked: c.visible, disabled: !c.hideable, onChange: (e) => g.setVisible(c.id, e.target.checked) }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: c.label })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": `Move ${c.label} up`, disabled: i === 0, onClick: () => g.moveColumn(c.id, -1), className: "text-muted disabled:opacity-30", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUp, { className: "size-3", "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": `Move ${c.label} down`, disabled: i === g.columns.length - 1, onClick: () => g.moveColumn(c.id, 1), className: "text-muted disabled:opacity-30", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowDown, { className: "size-3", "aria-hidden": true }) })
    ] }, c.id)) }) })
  ] });
}
function FilterCell({ column, value, onChange, rows, label }) {
  const f = column.filter;
  const name = `${label}: ${textOf(column.header, column.id)}`;
  const base = "h-6 w-full min-w-0 border border-line bg-input px-1 text-xs font-normal normal-case text-fg";
  if (typeof f === "function") return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: f({ value, onChange, label: name }) });
  if (f === "select") {
    const get = column.accessor ?? ((r) => r[column.id]);
    const opts = column.filterOptions ?? Array.from(new Set(rows.slice(0, 5e3).map((r) => String(get(r) ?? "")))).slice(0, 100).sort();
    return /* @__PURE__ */ jsxRuntime.jsxs("select", { "aria-label": name, className: base, value: value ?? "", onChange: (e) => onChange(e.target.value || void 0), children: [
      /* @__PURE__ */ jsxRuntime.jsx("option", { value: "" }),
      opts.map((o) => /* @__PURE__ */ jsxRuntime.jsx("option", { children: o }, o))
    ] });
  }
  if (f === "range") {
    const [min, max] = value ?? [void 0, void 0];
    const set = (a, b) => onChange(a === void 0 && b === void 0 ? void 0 : [a, b]);
    const num = (s) => s === "" ? void 0 : Number(s);
    return /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsxRuntime.jsx("input", { type: "number", "aria-label": `${name} min`, className: base, value: min ?? "", onChange: (e) => set(num(e.target.value), max) }),
      /* @__PURE__ */ jsxRuntime.jsx("input", { type: "number", "aria-label": `${name} max`, className: base, value: max ?? "", onChange: (e) => set(min, num(e.target.value)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("input", { type: "search", "aria-label": name, className: base, value: value ?? "", onChange: (e) => onChange(e.target.value || void 0) });
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
    pagination: pg,
    onRetry,
    viewKey,
    className,
    gridRole = "grid",
    getRowProps,
    onRowKeyDown
  } = props;
  const { t: laf } = chunkQQA4GJXV_cjs.useLafDefaults(portalDefaults);
  const L = { ...defaultLabels2, ...props.labels };
  const SG = { ...laf.components.portal.serverGrid, ...props.labels };
  const selectAllLabel = props.labels?.selectAll ?? laf.selectAllRows;
  const selectRowLabel = props.labels?.selectRow ?? laf.selectRow;
  const uid = React31__namespace.useId();
  const persisted = React31__namespace.useMemo(() => readView(viewKey), [viewKey]);
  const [sort, setSort] = chunkS4QID4TP_cjs.useControllableState({ value: props.sort, defaultValue: [], onChange: props.onSortChange });
  const [selected, setSelected] = chunkS4QID4TP_cjs.useControllableState({ value: props.selected, defaultValue: [], onChange: props.onSelectedChange });
  const [visibility, setVisibility] = chunkS4QID4TP_cjs.useControllableState({
    value: props.columnVisibility,
    defaultValue: persisted.columnVisibility ?? {},
    onChange: props.onColumnVisibilityChange
  });
  const [order, setOrder] = chunkS4QID4TP_cjs.useControllableState({ value: props.columnOrder, defaultValue: persisted.columnOrder ?? [], onChange: props.onColumnOrderChange });
  const [sizing, setSizing] = chunkS4QID4TP_cjs.useControllableState({ value: props.columnSizing, defaultValue: persisted.columnSizing ?? {}, onChange: props.onColumnSizingChange });
  const [filters, setFilters] = chunkS4QID4TP_cjs.useControllableState({ value: props.filters, defaultValue: [], onChange: props.onFiltersChange });
  const [search, setSearch] = chunkS4QID4TP_cjs.useControllableState({ value: props.search, defaultValue: "", onChange: props.onSearchChange });
  const [density, setDensity] = chunkS4QID4TP_cjs.useControllableState({ value: props.density, defaultValue: persisted.density ?? "default", onChange: props.onDensityChange });
  const [expandedIds, setExpandedIds] = React31__namespace.useState(() => /* @__PURE__ */ new Set());
  React31__namespace.useEffect(() => {
    if (!viewKey || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(storageKey(viewKey), JSON.stringify({ columnVisibility: visibility, columnOrder: order, columnSizing: sizing, density }));
    } catch {
    }
  }, [viewKey, visibility, order, sizing, density]);
  const selectable = props.selectable ?? (props.selected !== void 0 || !!props.onSelectedChange || !!bulkActions);
  const selectedSet = React31__namespace.useMemo(() => new Set(selected), [selected]);
  const colById = React31__namespace.useMemo(() => new Map(columns.map((c) => [c.id, c])), [columns]);
  const defs = React31__namespace.useMemo(
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
  const sorting = React31__namespace.useMemo(() => sort.map((s) => ({ id: s.id, desc: s.dir === "desc" })), [sort]);
  const columnFilters = filters;
  const table = legacy.useLegacyTable({
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
    getCoreRowModel: legacy.getCoreRowModel(),
    getSortedRowModel: manual ? void 0 : legacy.getSortedRowModel(),
    getFilteredRowModel: manual ? void 0 : legacy.getFilteredRowModel(),
    globalFilterFn: "includesString"
  });
  const modelRows = table.getRowModel().rows;
  const n = modelRows.length;
  const totalRows = rowCount ?? pg?.total;
  const rowOffset = pg ? (pg.page - 1) * pg.pageSize : 0;
  const skeleton = !!loading && (!manual || n === 0);
  const refreshing = !!loading && !!manual && n > 0;
  const showRows = manual ? !skeleton : !loading && !error;
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
  const scrollRef = React31__namespace.useRef(null);
  const fallbackH = typeof viewportH === "number" ? viewportH : 480;
  const estimate = React31__namespace.useCallback((i) => rowH + (modelRows[i] && expandedIds.has(modelRows[i].id) ? 120 : 0), [rowH, modelRows, expandedIds]);
  const virtualizer = reactVirtual.useVirtualizer({
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
  const [active, setActive] = React31__namespace.useState(-1);
  const anchor = React31__namespace.useRef(0);
  const [menu, setMenu] = React31__namespace.useState(null);
  const activeIdx = Math.min(active, n - 1);
  const reveal = (i) => {
    if (virtualOn) virtualizer.scrollToIndex(i, { align: "auto" });
    else scrollRef.current?.querySelector(`[data-row-index="${i}"]`)?.scrollIntoView?.({ block: "nearest" });
  };
  const ids = React31__namespace.useMemo(() => modelRows.map((r) => r.id), [modelRows]);
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
          setSelected(manual ? Array.from(/* @__PURE__ */ new Set([...selected, ...ids])) : ids);
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
  const dragId = React31__namespace.useRef(null);
  const setFilter = (id, value) => setFilters([...filters.filter((f) => f.id !== id), ...value === void 0 || value === "" ? [] : [{ id, value }]]);
  const hasFilters = columns.some((c) => c.filter);
  const ctx = {
    columns: (order.length ? [...order, ...allLeafIds.filter((x) => !order.includes(x))] : allLeafIds).filter((id) => colById.has(id)).map((id) => ({ id, label: textOf(colById.get(id).header, id), visible: visibility[id] !== false, hideable: colById.get(id).hideable !== false })),
    setVisible: (id, v) => setVisibility({ ...visibility, [id]: v }),
    moveColumn,
    density,
    setDensity,
    search,
    setSearch,
    labels: L
  };
  const anyWrap = leaf.some((c) => colById.get(c.id)?.wrap);
  const autoFit = (id) => {
    const root = scrollRef.current;
    const spec = colById.get(id);
    if (!root || !spec) return;
    let w = 0;
    root.querySelectorAll(`[data-col="${CSS.escape(id)}"]`).forEach((cell) => {
      const inner = cell.querySelector("[data-cell]") ?? cell.firstElementChild;
      if (!inner) return;
      const prev = inner.style.cssText;
      inner.style.flexWrap = "nowrap";
      inner.style.whiteSpace = "nowrap";
      inner.style.textOverflow = "clip";
      inner.style.width = "max-content";
      inner.style.maxWidth = "none";
      inner.style.flexShrink = "0";
      w = Math.max(w, inner.getBoundingClientRect().width, inner.scrollWidth);
      inner.style.cssText = prev;
    });
    if (!w) return;
    const next = Math.min(spec.maxWidth ?? 640, Math.max(spec.minWidth ?? 60, Math.ceil(w) + 28));
    setSizing({ ...sizing, [id]: next });
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
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "none", "data-index": index, ref: measure, style, className: chunkFTHFEMX6_cjs.cn(virtualOn && "absolute inset-x-0 top-0"), children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ...extra,
          id: `${uid}-r${index}`,
          role: "row",
          "data-row-index": index,
          "aria-rowindex": rowOffset + index + 2,
          "aria-selected": selectable ? isSel : void 0,
          style: { display: "grid", gridTemplateColumns: template, ...anyWrap ? { minHeight: rowH } : { height: rowH }, minWidth: totalWidth },
          className: chunkFTHFEMX6_cjs.cn(
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
            selectable && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "gridcell", className: chunkFTHFEMX6_cjs.cn(cellBase, "justify-center px-0", stickyCell), style: { insetInlineStart: 0 }, children: /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                type: "checkbox",
                "aria-label": selectRowLabel,
                checked: isSel,
                onChange: () => void 0,
                onClick: (e) => select(index, { shift: e.shiftKey }, true)
              }
            ) }),
            renderExpanded && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "gridcell", className: chunkFTHFEMX6_cjs.cn(cellBase, "justify-center px-0", stickyCell), style: { insetInlineStart: selectable ? SELECT_W : 0 }, children: /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": isExp ? L.collapse : L.expand, "aria-expanded": isExp, onClick: () => toggleExpanded(r.id), className: "text-muted hover:text-fg", children: isExp ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "size-4", "aria-hidden": true }) }) }),
            leaf.map((c) => {
              const spec = colById.get(c.id);
              const left = pinnedLeft.get(c.id);
              return /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  role: "gridcell",
                  "data-col": c.id,
                  className: chunkFTHFEMX6_cjs.cn(cellBase, spec.numeric && "justify-end font-mono", left !== void 0 && stickyCell),
                  style: left !== void 0 && Number.isFinite(left) ? { insetInlineStart: left } : void 0,
                  children: spec.wrap ? /* @__PURE__ */ jsxRuntime.jsx("div", { "data-cell": true, className: "flex min-w-0 flex-wrap items-center gap-1 py-1", children: spec.cell(row) }) : /* @__PURE__ */ jsxRuntime.jsx("span", { "data-cell": true, className: "truncate", children: spec.cell(row) })
                },
                c.id
              );
            }),
            rowActions && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "gridcell", className: chunkFTHFEMX6_cjs.cn(cellBase, "justify-center px-0"), children: /* @__PURE__ */ jsxRuntime.jsx(
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
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { className: "size-4", "aria-hidden": true })
              }
            ) })
          ]
        }
      ),
      renderExpanded && isExp && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "row", style: { minWidth: totalWidth }, className: "border-b border-line bg-muted-bg", children: /* @__PURE__ */ jsxRuntime.jsx("div", { role: "gridcell", "aria-colspan": colCount, className: "p-3 text-sm", children: renderExpanded(row) }) })
    ] }, r.id);
  };
  const menuRow = menu ? modelRows.find((r) => r.id === menu.id)?.original : void 0;
  const menuItems = menuRow !== void 0 && rowActions ? rowActions(menuRow) : [];
  const showEmpty = !loading && !error && n === 0;
  const skeletonRows = pg ? Math.min(pg.pageSize, 10) : 4;
  const summary = loading ? SG.loadingData : error ? SG.loadFailed : totalRows !== void 0 ? SG.results(n === 0 ? 0 : rowOffset + 1, rowOffset + n, totalRows) : SG.resultsUnknown(n === 0 ? 0 : rowOffset + 1, rowOffset + n);
  const scrollStyle = { height: virtualOn || stickyHeader ? viewportH : void 0, maxHeight: virtualOn || stickyHeader ? void 0 : viewportH };
  return /* @__PURE__ */ jsxRuntime.jsx(GridContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex flex-col", className), children: [
    toolbar && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-2 flex flex-wrap items-center gap-2", children: toolbar }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref: scrollRef,
          role: gridRole,
          "aria-label": label,
          "aria-rowcount": manual && pg && totalRows === void 0 ? -1 : (manual && totalRows !== void 0 ? totalRows : n) + 1,
          "aria-colcount": colCount,
          "aria-multiselectable": selectable || void 0,
          "aria-busy": loading || void 0,
          "aria-activedescendant": activeIdx >= 0 && showRows && n > 0 ? `${uid}-r${activeIdx}` : void 0,
          tabIndex: 0,
          style: scrollStyle,
          className: chunkFTHFEMX6_cjs.cn("relative overflow-auto border border-line bg-surface text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary", refreshing && "opacity-60"),
          onKeyDown,
          onFocus: (e) => {
            if (e.target === e.currentTarget && activeIdx < 0 && n > 0) setActive(0);
          },
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "rowgroup", className: chunkFTHFEMX6_cjs.cn(stickyHeader && "sticky top-0 z-10", "bg-surface"), style: { minWidth: totalWidth }, children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "row", "aria-rowindex": 1, style: { display: "grid", gridTemplateColumns: template, height: rowH, minWidth: totalWidth }, className: "border-b border-line-strong text-xs uppercase text-muted", children: [
                selectable && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "columnheader", className: chunkFTHFEMX6_cjs.cn(cellBase, "justify-center px-0", stickyCell), style: { insetInlineStart: 0 }, children: /* @__PURE__ */ jsxRuntime.jsx(
                  "input",
                  {
                    type: "checkbox",
                    "aria-label": selectAllLabel,
                    checked: n > 0 && ids.every((i) => selectedSet.has(i)),
                    ref: (el) => {
                      if (el) el.indeterminate = selected.length > 0 && !ids.every((i) => selectedSet.has(i));
                    },
                    onChange: () => {
                      const all = ids.every((i) => selectedSet.has(i));
                      if (manual) setSelected(all ? selected.filter((x) => !ids.includes(x)) : Array.from(/* @__PURE__ */ new Set([...selected, ...ids])));
                      else setSelected(all ? [] : ids);
                    }
                  }
                ) }),
                renderExpanded && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "columnheader", className: chunkFTHFEMX6_cjs.cn(stickyCell), style: { insetInlineStart: selectable ? SELECT_W : 0 }, children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: L.expand }) }),
                leaf.map((c) => {
                  const spec = colById.get(c.id);
                  const sIdx = sort.findIndex((s2) => s2.id === c.id);
                  const s = sort[sIdx];
                  const left = pinnedLeft.get(c.id);
                  return /* @__PURE__ */ jsxRuntime.jsxs(
                    "div",
                    {
                      role: "columnheader",
                      "data-col": c.id,
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
                      className: chunkFTHFEMX6_cjs.cn("relative", cellBase, spec.numeric && "justify-end", left !== void 0 && stickyCell),
                      style: left !== void 0 && Number.isFinite(left) ? { insetInlineStart: left } : void 0,
                      children: [
                        spec.sortable ? /* @__PURE__ */ jsxRuntime.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "inline-flex min-w-0 items-center gap-1 font-[inherit] uppercase hover:text-fg",
                            onClick: (e) => cycleSort(c.id, e.shiftKey),
                            children: [
                              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: spec.header }),
                              s && (s.dir === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUp, { className: "size-3 shrink-0", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowDown, { className: "size-3 shrink-0", "aria-hidden": true })),
                              s && sort.length > 1 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-[10px]", children: sIdx + 1 })
                            ]
                          }
                        ) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: spec.header }),
                        c.getCanResize() && /* @__PURE__ */ jsxRuntime.jsx(
                          "div",
                          {
                            role: "separator",
                            "aria-orientation": "vertical",
                            "aria-label": `${L.resize}: ${textOf(spec.header, c.id)}`,
                            "aria-valuenow": c.getSize(),
                            "aria-valuemin": spec.minWidth ?? 60,
                            tabIndex: 0,
                            draggable: false,
                            onMouseDown: (e) => {
                              e.stopPropagation();
                              const head = e.currentTarget.parentElement;
                              if (head) {
                                head.draggable = false;
                                window.addEventListener("mouseup", () => head.draggable = true, { once: true });
                              }
                              table.getHeaderGroups()[0]?.headers.find((h) => h.id === c.id)?.getResizeHandler()(e);
                            },
                            onDragStart: (e) => e.preventDefault(),
                            onDoubleClick: () => autoFit(c.id),
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
                rowActions && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "columnheader", className: "relative", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: L.actions }) })
              ] }),
              hasFilters && /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "row", style: { display: "grid", gridTemplateColumns: template, minWidth: totalWidth }, className: "border-b border-line", children: [
                selectable && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "gridcell", className: stickyCell, style: { insetInlineStart: 0 } }),
                renderExpanded && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "gridcell", className: stickyCell, style: { insetInlineStart: selectable ? SELECT_W : 0 } }),
                leaf.map((c) => {
                  const spec = colById.get(c.id);
                  const left = pinnedLeft.get(c.id);
                  return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "gridcell", className: chunkFTHFEMX6_cjs.cn("min-w-0 px-2 py-1", left !== void 0 && stickyCell), style: left !== void 0 && Number.isFinite(left) ? { insetInlineStart: left } : void 0, children: spec.filter && /* @__PURE__ */ jsxRuntime.jsx(FilterCell, { column: spec, value: filters.find((f) => f.id === c.id)?.value, onChange: (v) => setFilter(c.id, v), rows, label: L.filter }) }, c.id);
                }),
                rowActions && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "gridcell" })
              ] }),
              error && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "row", style: { minWidth: totalWidth }, className: "border-b border-danger-line bg-danger-bg", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "gridcell", "aria-colspan": colCount, className: "sticky z-[1] flex w-[min(100%,40rem)] items-center gap-3 p-3 text-sm text-danger", style: { insetInlineStart: 0 }, children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { role: "alert", className: "min-w-0 flex-1", children: error }),
                onRetry && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RefreshCw, { "aria-hidden": true }), onClick: onRetry, children: SG.retry })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "rowgroup", style: virtualOn ? { height: virtualizer.getTotalSize() - rowH, position: "relative", minWidth: totalWidth } : { minWidth: totalWidth }, children: [
              skeleton && Array.from({ length: skeletonRows }, (_, i) => /* @__PURE__ */ jsxRuntime.jsx("div", { role: "row", style: { display: "grid", gridTemplateColumns: template, height: rowH }, className: "border-b border-line", children: Array.from({ length: colCount }, (_2, j) => /* @__PURE__ */ jsxRuntime.jsx("div", { role: "gridcell", className: "flex items-center px-3", children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, {}) }, j)) }, i)),
              showRows && (virtualOn ? virtualizer.getVirtualItems().map((v) => renderRow(v.index, { transform: `translateY(${v.start - rowH}px)` }, virtualizer.measureElement)) : modelRows.map((_, i) => renderRow(i)))
            ] })
          ]
        }
      ),
      refreshing && /* @__PURE__ */ jsxRuntime.jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2 rounded-md border border-line bg-menu px-3 py-1.5 text-sm text-muted", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "size-4 animate-spin motion-reduce:animate-none" }),
        SG.refreshing
      ] }) })
    ] }),
    pg && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 border border-t-0 border-line bg-surface px-3 py-2 text-sm text-muted", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { role: "status", "aria-live": "polite", className: "sr-only", children: summary }),
      pg.onPageSizeChange && /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: SG.rowsPerPage }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Select, { className: "h-8 w-20", value: pg.pageSize, onChange: (e) => pg.onPageSizeChange?.(Number(e.target.value)), children: Array.from(/* @__PURE__ */ new Set([...pg.pageSizes ?? [10, 25, 50, 100], pg.pageSize])).sort((x, y) => x - y).map((size) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: size, children: size }, size)) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ms-auto [&_.pagination]:p-0", children: totalRows !== void 0 ? /* @__PURE__ */ jsxRuntime.jsx(Pagination, { page: pg.page, pageCount: Math.max(1, Math.ceil(totalRows / pg.pageSize)), total: totalRows, pageSize: pg.pageSize, onPageChange: pg.onPageChange }) : /* @__PURE__ */ jsxRuntime.jsxs("nav", { className: "pagination p-0", "aria-label": laf.pagination, children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: SG.page(pg.page) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "pages", children: [
          /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "page-btn", "aria-label": laf.previousPage, disabled: pg.page <= 1, onClick: () => pg.onPageChange(pg.page - 1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "size-4", "aria-hidden": true }) }),
          /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "page-btn", "aria-label": laf.nextPage, disabled: !pg.hasNext, onClick: () => pg.onPageChange(pg.page + 1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "size-4", "aria-hidden": true }) })
        ] })
      ] }) })
    ] }),
    showEmpty && (empty ?? /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.EmptyState, { title: L.empty })),
    bulkActions && selected.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "toolbar", "aria-label": L.selectedCount(selected.length), className: "sticky bottom-0 z-10 flex items-center gap-3 border border-line bg-surface px-3 py-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: L.selectedCount(selected.length) }),
      bulkActions(selected),
      /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": L.clearSelection, className: "ms-auto text-muted hover:text-fg", onClick: () => setSelected([]), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-4", "aria-hidden": true }) })
    ] }),
    rowActions && /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenu, { open: !!menu && menuItems.length > 0, onOpenChange: (o) => !o && setMenu(null), children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed size-0", style: menu ? { left: menu.x, top: menu.y } : void 0 }) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        chunkGEJA4YGN_cjs.DropdownMenuContent,
        {
          align: "start",
          onCloseAutoFocus: (e) => {
            e.preventDefault();
            scrollRef.current?.focus();
          },
          children: menuItems.map((m) => /* @__PURE__ */ jsxRuntime.jsxs(React31__namespace.Fragment, { children: [
            m.separatorBefore && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenuItem, { danger: m.danger, disabled: m.disabled, onSelect: () => m.onSelect(), children: [
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
function TreeTable({
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
  const [open, setOpen] = chunkS4QID4TP_cjs.useControllableState({ value: expanded, defaultValue: defaultExpanded ?? [], onChange: onExpandedChange });
  const [sort, setSort] = chunkS4QID4TP_cjs.useControllableState({ value: sortProp, defaultValue: [], onChange: onSortChange });
  const openSet = React31__namespace.useMemo(() => new Set(open), [open]);
  const treeCol = treeColumn ?? columns[0]?.id;
  const getters = React31__namespace.useMemo(() => new Map(columns.map((c) => [c.id, c.accessor ?? ((r) => r[c.id])])), [columns]);
  const flat = React31__namespace.useMemo(() => {
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
        const expandable = !!node.children?.length;
        const isOpen = expandable && openSet.has(node.id);
        out.push({ node, depth, setSize: sorted.length, posInSet: i + 1, expandable, open: isOpen });
        if (isOpen) walk(node.children, depth + 1);
      });
    };
    walk(nodes, 1);
    return out;
  }, [nodes, openSet, sort, getters]);
  const toggle = React31__namespace.useCallback((id) => setOpen((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]), [setOpen]);
  const cols = React31__namespace.useMemo(
    () => columns.map((c) => {
      const base = { ...c, cell: (f) => c.cell(f.node.data), accessor: (f) => getters.get(c.id)(f.node.data), filter: void 0 };
      if (c.id !== treeCol) return base;
      return {
        ...base,
        cell: (f) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex min-w-0 items-center gap-1", style: { paddingInlineStart: (f.depth - 1) * indent }, children: [
          f.expandable ? /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": f.open ? "Collapse" : "Expand",
              "aria-expanded": f.open,
              className: "inline-flex size-4 shrink-0 items-center justify-center text-muted hover:text-fg",
              onClick: () => toggle(f.node.id),
              children: f.open ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "size-4", "aria-hidden": true })
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-block size-4 shrink-0", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: c.cell(f.node.data) })
        ] })
      };
    }),
    [columns, treeCol, indent, getters, toggle]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
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

// lib/messages/account.en.ts
var accountEn = {
  sessions: {
    thisDevice: "This device",
    revoke: "Revoke session",
    revokeOthers: "Sign out other sessions",
    revokeOthersTitle: "Sign out other sessions?",
    revokeOthersBody: "Every session except this device will be signed out.",
    lastActive: "Last active",
    user: "User",
    empty: "No active sessions",
    cancel: "Cancel"
  },
  apiKeys: {
    create: "Create key",
    createTitle: "Create API key",
    name: "Name",
    expiry: "Expiry",
    scopes: "Scopes",
    never: "Never",
    days: (n) => `${n} days`,
    created: "Created",
    expires: "Expires",
    lastUsed: "Last used",
    neverUsed: "Never used",
    revoke: "Revoke",
    revoked: "Revoked",
    rotate: "Rotate",
    secretLabel: "Your new secret",
    secretNotice: "Copy this secret now. It will not be shown again.",
    acknowledge: "I have stored this secret",
    done: "Done",
    cancel: "Cancel",
    empty: "No keys yet",
    revokeTitle: "Revoke key?",
    revokeBody: "Applications using this key will stop working immediately.",
    error: "Something went wrong. Try again."
  },
  factors: {
    password: "Password",
    passwordChanged: "Last changed",
    passwordNever: "Never changed",
    changePassword: "Change password",
    totp: "Authenticator app (TOTP)",
    totpOn: "Enabled",
    totpOff: "Not set up",
    enable: "Enable",
    disable: "Disable",
    passkeys: "Passkeys",
    addPasskey: "Add passkey",
    renamePasskey: "Passkey name",
    removePasskey: "Remove passkey",
    created: "Created",
    lastUsed: "Last used",
    neverUsed: "Never used",
    noPasskeys: "No passkeys registered",
    recovery: "Recovery codes",
    recoveryRemaining: (n) => `${n} remaining`,
    regenerate: "Regenerate",
    recoveryTitle: "New recovery codes",
    recoveryNotice: "Store these codes safely. They will not be shown again.",
    acknowledge: "I have stored these codes",
    done: "Done",
    cancel: "Cancel",
    removeTitle: "Remove second factor?",
    removeBody: "This second factor will no longer protect the account.",
    removeLastWarning: "This is your last second factor. Your account will be protected by the password only.",
    remove: "Remove"
  },
  reauth: {
    title: "Confirm it's you",
    description: "This action requires you to verify your identity.",
    password: "Password",
    confirm: "Confirm",
    usePasskey: "Use a passkey",
    usePassword: "Use password instead",
    cancel: "Cancel",
    failed: "Verification failed. Try again."
  },
  expiry: {
    title: "Your session is about to expire",
    remaining: (t) => `You will be signed out in ${t}.`,
    stay: "Stay signed in",
    signOut: "Sign out",
    announce: (t) => `Session expires in ${t}`
  }
};
var lafDefaults4 = { account: accountEn };
var useLaf2 = () => chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults4);
var deviceIcon2 = { phone: lucideReact.Smartphone, laptop: lucideReact.Laptop, tablet: lucideReact.Tablet, key: lucideReact.KeyRound };
function SessionList({ sessions, onRevoke, onRevokeOthers, showUser, labels }) {
  const l = { ...useLaf2().t.components.account.sessions, ...labels };
  const [confirm, setConfirm] = React31__namespace.useState(false);
  const [pending, setPending] = React31__namespace.useState(false);
  const others = sessions.filter((s) => !s.current).length;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3", children: [
    onRevokeOthers && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.LogOut, {}), disabled: others === 0, onClick: () => setConfirm(true), children: l.revokeOthers }) }),
    sessions.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted", children: l.empty }) : /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none gap-2 p-0", children: sessions.map((s) => {
      const Icon = deviceIcon2[s.device];
      const title = [s.browser, s.os].filter(Boolean).join(" \xB7 ");
      return /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "card flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "size-5 shrink-0 text-muted", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-fg", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: title }),
            s.current && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: "primary", children: l.thisDevice })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted", children: [
            showUser && s.user && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
                l.user,
                ": "
              ] }),
              s.user,
              " \xB7",
              " "
            ] }),
            [s.ip, s.location].filter(Boolean).join(" \xB7 "),
            (s.ip || s.location) && " \xB7 ",
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
              l.lastActive,
              ": "
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: s.lastActive })
          ] })
        ] }),
        !s.current && /* @__PURE__ */ jsxRuntime.jsx(
          chunkGEJA4YGN_cjs.IconButton,
          {
            label: `${l.revoke}: ${title}`,
            size: "sm",
            icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "size-4" }),
            onClick: () => void onRevoke(s.id)
          }
        )
      ] }, s.id);
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      chunkPNRO35YW_cjs.ConfirmDialog,
      {
        open: confirm,
        onOpenChange: setConfirm,
        title: l.revokeOthersTitle,
        description: l.revokeOthersBody,
        confirmLabel: l.revokeOthers,
        cancelLabel: l.cancel,
        pending,
        onConfirm: async () => {
          setPending(true);
          try {
            await onRevokeOthers?.();
            setConfirm(false);
          } finally {
            setPending(false);
          }
        }
      }
    )
  ] });
}
function ApiKeyManager({ keys, scopes, expiryPresets = [30, 90, 365, null], onCreate, onRevoke, onRotate, labels }) {
  const l = { ...useLaf2().t.components.account.apiKeys, ...labels };
  const [form, setForm] = React31__namespace.useState(false);
  const [name, setName] = React31__namespace.useState("");
  const [expiry, setExpiry] = React31__namespace.useState(expiryPresets[0] ?? null);
  const [picked, setPicked] = React31__namespace.useState([]);
  const [busy, setBusy] = React31__namespace.useState(false);
  const [error, setError] = React31__namespace.useState();
  const [secret, setSecret] = React31__namespace.useState();
  const [ack, setAck] = React31__namespace.useState(false);
  const [revoking, setRevoking] = React31__namespace.useState();
  const nameId = React31__namespace.useId();
  const expId = React31__namespace.useId();
  const reveal = (s) => {
    setSecret(s);
    setAck(false);
  };
  const submit = async () => {
    setBusy(true);
    setError(void 0);
    try {
      const r = await onCreate({ name: name.trim(), expiresInDays: expiry, scopes: picked });
      setForm(false);
      setName("");
      setPicked([]);
      reveal(r.secret);
    } catch {
      setError(l.error);
    } finally {
      setBusy(false);
    }
  };
  const rotate = async (id) => {
    try {
      reveal((await onRotate(id)).secret);
    } catch {
      setError(l.error);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, {}), onClick: () => setForm(true), children: l.create }) }),
    error && !form && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Alert, { tone: "error", children: /* @__PURE__ */ jsxRuntime.jsx("span", { role: "alert", children: error }) }),
    keys.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted", children: l.empty }) : /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none gap-2 p-0", children: keys.map((k) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "card grid gap-1.5", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-fg", children: k.name }),
        /* @__PURE__ */ jsxRuntime.jsx("code", { className: "font-mono text-xs text-muted", children: k.prefix }),
        k.revoked && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: "danger", children: l.revoked }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ms-auto flex gap-1", children: [
          onRotate && !k.revoked && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.IconButton, { label: `${l.rotate}: ${k.name}`, size: "sm", icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RefreshCw, { className: "size-4" }), onClick: () => void rotate(k.id) }),
          !k.revoked && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.IconButton, { label: `${l.revoke}: ${k.name}`, size: "sm", icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "size-4" }), onClick: () => setRevoking(k) })
        ] })
      ] }),
      k.scopes.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 flex list-none flex-wrap gap-1 p-0", "aria-label": l.scopes, children: k.scopes.map((s) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { plain: true, children: s }) }, s)) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap gap-x-4 text-xs text-muted", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          l.created,
          " ",
          /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: k.createdAt })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          l.expires,
          ": ",
          k.expiresAt ? /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: k.expiresAt }) : l.never
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          l.lastUsed,
          ": ",
          k.lastUsedAt ? /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: k.lastUsedAt }) : l.neverUsed
        ] })
      ] })
    ] }, k.id)) }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Dialog, { open: form, onOpenChange: setForm, children: /* @__PURE__ */ jsxRuntime.jsx(
      chunkGEJA4YGN_cjs.DialogContent,
      {
        title: l.createTitle,
        footer: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", children: l.cancel }) }),
          /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", loading: busy, disabled: !name.trim(), onClick: submit, children: l.create })
        ] }),
        children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Field, { label: l.name, htmlFor: nameId, children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Input, { id: nameId, value: name, onChange: (e) => setName(e.target.value), autoComplete: "off" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx("label", { className: "form-label", htmlFor: expId, children: l.expiry }),
            /* @__PURE__ */ jsxRuntime.jsx("select", { id: expId, className: "form-select", value: String(expiry), onChange: (e) => setExpiry(e.target.value === "null" ? null : Number(e.target.value)), children: expiryPresets.map((p) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: String(p), children: p === null ? l.never : l.days(p) }, String(p))) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("fieldset", { className: "m-0 grid gap-1 border-0 p-0", children: [
            /* @__PURE__ */ jsxRuntime.jsx("legend", { className: "form-label", children: l.scopes }),
            scopes.map((s) => /* @__PURE__ */ jsxRuntime.jsx(
              chunkGEJA4YGN_cjs.Checkbox,
              {
                checked: picked.includes(s.value),
                onChange: (e) => setPicked((p) => e.target.checked ? [...p, s.value] : p.filter((x) => x !== s.value)),
                children: s.label ?? s.value
              },
              s.value
            ))
          ] }),
          error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "field-error", role: "alert", children: error })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Dialog, { open: secret !== void 0, onOpenChange: (o) => ack && !o && setSecret(void 0), children: /* @__PURE__ */ jsxRuntime.jsx(
      chunkGEJA4YGN_cjs.DialogContent,
      {
        title: l.secretLabel,
        description: l.secretNotice,
        onInteractOutside: (e) => e.preventDefault(),
        onEscapeKeyDown: (e) => !ack && e.preventDefault(),
        footer: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", disabled: !ack, onClick: () => setSecret(void 0), children: l.done }),
        children: secret !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.SecretDisplay, { value: secret, label: l.secretLabel, acknowledgeLabel: l.acknowledge, acknowledged: ack, onAcknowledge: setAck })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      chunkPNRO35YW_cjs.ConfirmDialog,
      {
        open: !!revoking,
        onOpenChange: (o) => !o && setRevoking(void 0),
        title: l.revokeTitle,
        description: l.revokeBody,
        items: revoking ? [revoking.name] : void 0,
        confirmLabel: l.revoke,
        cancelLabel: l.cancel,
        onConfirm: async () => {
          if (revoking) await onRevoke(revoking.id);
          setRevoking(void 0);
        }
      }
    )
  ] });
}
function SecurityFactors({ password, totp, passkeys, recovery, labels }) {
  const l = { ...useLaf2().t.components.account.factors, ...labels };
  const [removal, setRemoval] = React31__namespace.useState();
  const [codes, setCodes] = React31__namespace.useState();
  const [ack, setAck] = React31__namespace.useState(false);
  const factorCount = (totp?.enabled ? 1 : 0) + (passkeys?.items.length ?? 0);
  const last = factorCount === 1;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4", children: [
    password && /* @__PURE__ */ jsxRuntime.jsxs("section", { className: "card flex items-center gap-3", "aria-label": l.password, children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.KeyRound, { className: "size-5 text-muted", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "m-0 text-sm text-fg", children: l.password }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-xs text-muted", children: password.changedAt ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          l.passwordChanged,
          " ",
          /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: password.changedAt })
        ] }) : l.passwordNever })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", onClick: password.onChange, children: l.changePassword })
    ] }),
    totp && /* @__PURE__ */ jsxRuntime.jsxs("section", { className: "card flex items-center gap-3", "aria-label": l.totp, children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ShieldCheck, { className: "size-5 text-muted", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "m-0 text-sm text-fg", children: l.totp }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-xs text-muted", children: totp.enabled ? l.totpOn : l.totpOff })
      ] }),
      totp.enabled ? /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", onClick: () => setRemoval({ title: l.totp, run: totp.onDisable }), children: l.disable }) : /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", onClick: totp.onEnable, children: l.enable })
    ] }),
    passkeys && /* @__PURE__ */ jsxRuntime.jsxs("section", { className: "card grid gap-2", "aria-label": l.passkeys, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Fingerprint, { className: "size-5 text-muted", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "m-0 flex-1 text-sm text-fg", children: l.passkeys }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, {}), onClick: passkeys.onAdd, children: l.addPasskey })
      ] }),
      passkeys.items.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-xs text-muted", children: l.noPasskeys }) : /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none gap-1 p-0", children: passkeys.items.map((p) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-center gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.InlineEdit, { label: l.renamePasskey, value: p.name, onSave: (v) => passkeys.onRename(p.id, v) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted", children: [
            l.created,
            " ",
            /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: p.createdAt }),
            " \xB7 ",
            l.lastUsed,
            ":",
            " ",
            p.lastUsedAt ? /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: p.lastUsedAt }) : l.neverUsed
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          chunkGEJA4YGN_cjs.IconButton,
          {
            label: `${l.removePasskey}: ${p.name}`,
            size: "sm",
            icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "size-4" }),
            onClick: () => setRemoval({ title: p.name, run: () => passkeys.onRemove(p.id) })
          }
        )
      ] }, p.id)) })
    ] }),
    recovery && /* @__PURE__ */ jsxRuntime.jsxs("section", { className: "card flex items-center gap-3", "aria-label": l.recovery, children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RefreshCw, { className: "size-5 text-muted", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "m-0 text-sm text-fg", children: l.recovery }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-xs text-muted", children: l.recoveryRemaining(recovery.remaining) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        chunkIP6HZMS5_cjs.Button,
        {
          variant: "secondary",
          size: "sm",
          onClick: async () => {
            setAck(false);
            setCodes(await recovery.onRegenerate());
          },
          children: l.regenerate
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      chunkPNRO35YW_cjs.ConfirmDialog,
      {
        open: !!removal,
        onOpenChange: (o) => !o && setRemoval(void 0),
        title: l.removeTitle,
        description: last ? `${l.removeBody} ${l.removeLastWarning}` : l.removeBody,
        items: removal ? [removal.title] : void 0,
        confirmLabel: removal?.title === l.totp ? l.disable : l.remove,
        cancelLabel: l.cancel,
        onConfirm: async () => {
          await removal?.run();
          setRemoval(void 0);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Dialog, { open: !!codes, onOpenChange: (o) => ack && !o && setCodes(void 0), children: /* @__PURE__ */ jsxRuntime.jsx(
      chunkGEJA4YGN_cjs.DialogContent,
      {
        title: l.recoveryTitle,
        description: l.recoveryNotice,
        onInteractOutside: (e) => e.preventDefault(),
        onEscapeKeyDown: (e) => !ack && e.preventDefault(),
        footer: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", disabled: !ack, onClick: () => setCodes(void 0), children: l.done }),
        children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none grid-cols-2 gap-2 p-0 font-mono text-sm text-fg", children: codes?.map((c) => /* @__PURE__ */ jsxRuntime.jsx("li", { className: "rounded-sm border border-line bg-muted-bg px-2 py-1", children: c }, c)) }),
          /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Checkbox, { checked: ack, onChange: (e) => setAck(e.target.checked), children: l.acknowledge })
        ] })
      }
    ) })
  ] });
}
function ReauthDialog({ open, onOpenChange, onReauth, passkey, labels }) {
  const l = { ...useLaf2().t.components.account.reauth, ...labels };
  const [method, setMethod] = React31__namespace.useState(passkey ? "passkey" : "password");
  const [pw, setPw] = React31__namespace.useState("");
  const [busy, setBusy] = React31__namespace.useState(false);
  const [error, setError] = React31__namespace.useState();
  const id = React31__namespace.useId();
  React31__namespace.useEffect(() => {
    if (!open) {
      setPw("");
      setError(void 0);
    }
  }, [open]);
  const run = async () => {
    setBusy(true);
    setError(void 0);
    try {
      const ok = await onReauth(method === "password" ? { method, password: pw } : { method });
      if (ok === false) setError(l.failed);
      else onOpenChange(false);
    } catch {
      setError(l.failed);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsx(
    chunkGEJA4YGN_cjs.DialogContent,
    {
      title: l.title,
      description: l.description,
      footer: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", children: l.cancel }) }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", loading: busy, disabled: method === "password" && !pw, form: `${id}-f`, type: "submit", children: method === "passkey" ? l.usePasskey : l.confirm })
      ] }),
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        "form",
        {
          id: `${id}-f`,
          className: "grid gap-3",
          onSubmit: (e) => {
            e.preventDefault();
            if (!busy && (method === "passkey" || pw)) void run();
          },
          children: [
            method === "password" ? /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Field, { label: l.password, htmlFor: `${id}-pw`, error, children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Input, { id: `${id}-pw`, type: "password", autoComplete: "current-password", autoFocus: true, value: pw, invalid: !!error, onChange: (e) => setPw(e.target.value) }) }) : error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "field-error", role: "alert", children: error }),
            passkey && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "justify-self-start border-0 bg-transparent p-0 text-sm text-primary hover:underline",
                onClick: () => {
                  setError(void 0);
                  setMethod(method === "password" ? "passkey" : "password");
                },
                children: method === "password" ? l.usePasskey : l.usePassword
              }
            )
          ]
        }
      )
    }
  ) });
}
function SessionExpiryDialog({ expiresAt, warnBeforeMs = 3e5, onStay, onSignOut, onExpire, labels }) {
  const { format: format2, t: laf } = useLaf2();
  const l = { ...laf.components.account.expiry, ...labels };
  const target = new Date(expiresAt).getTime();
  const [now, setNow] = React31__namespace.useState(() => Date.now());
  const expired = React31__namespace.useRef(false);
  React31__namespace.useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(t);
  }, [target]);
  const left = Math.max(0, target - now);
  React31__namespace.useEffect(() => {
    if (left > 0) expired.current = false;
    else if (!expired.current && now >= target) {
      expired.current = true;
      onExpire?.();
    }
  }, [left, now, target, onExpire]);
  const open = left <= warnBeforeMs;
  const secs = Math.ceil(left / 1e3);
  const mark = secs <= 10 ? 10 : secs <= 60 ? 60 : 0;
  const announcement = open && left > 0 && mark ? l.announce(format2.duration(mark * 1e3)) : "";
  return /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Dialog, { open, onOpenChange: () => void 0, children: /* @__PURE__ */ jsxRuntime.jsxs(
    chunkGEJA4YGN_cjs.DialogContent,
    {
      title: l.title,
      onInteractOutside: (e) => e.preventDefault(),
      onEscapeKeyDown: (e) => e.preventDefault(),
      footer: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", onClick: onSignOut, children: l.signOut }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", autoFocus: true, onClick: () => void onStay(), children: l.stay })
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0", children: l.remaining(format2.duration(left)) }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: announcement })
      ]
    }
  ) });
}

// lib/messages/admin.en.ts
var adminEn = {
  network: {
    invalidIp: "Enter a valid IPv4 or IPv6 address",
    invalidCidr: "Enter a valid CIDR block, e.g. 10.0.0.0/8",
    invalidEntry: "Enter a valid IP address or CIDR block",
    duplicate: "Already in the list",
    add: "Add",
    remove: (e) => `Remove ${e}`,
    empty: "No entries"
  },
  allowList: "Allowed addresses",
  transfer: {
    available: "Available",
    selected: "Selected",
    search: (l) => `Search ${l.toLowerCase()}`,
    count: (c, t) => c ? `${c} of ${t} selected` : `${t} items`,
    moveRight: "Add selected",
    moveLeft: "Remove selected",
    moveAllRight: "Add all",
    moveAllLeft: "Remove all",
    empty: "No items"
  },
  color: {
    label: "Brand colour",
    colorPicker: "Pick colour",
    invalidHex: "Enter a hex colour (3 or 6 digits)",
    onCard: "Against card background",
    onPrimary: "Button text on colour",
    pass: "AA pass",
    fail: "AA fail",
    rejected: "Colour does not meet the contrast requirements",
    contrast: "Contrast",
    preview: "Preview",
    sampleButton: "Button",
    sampleBadge: "Badge"
  },
  branding: {
    productName: "Product name",
    logo: "Logo",
    dropLogo: "Drop a logo here or click to browse",
    preview: "Login page preview",
    signIn: "Sign in",
    username: "Username",
    password: "Password",
    removeLogo: "Remove logo"
  },
  notifications: {
    bell: "Notifications",
    title: "Notifications",
    unreadCount: (n) => n === 0 ? "No unread notifications" : `${n} unread notification${n === 1 ? "" : "s"}`,
    markRead: (t) => `Mark "${t}" as read`,
    markAllRead: "Mark all as read",
    viewAll: "View all",
    empty: "You're all caught up"
  }
};
var lafDefaults5 = { admin: adminEn };
var useLaf3 = () => chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults5);
function isIPv4(s) {
  const parts = s.split(".");
  return parts.length === 4 && parts.every((p) => /^\d{1,3}$/.test(p) && (p === "0" || !p.startsWith("0")) && Number(p) <= 255);
}
function isIPv6(s) {
  if (!s || /[^0-9a-fA-F:.]/.test(s) || s.includes(":::")) return false;
  const halves = s.split("::");
  if (halves.length > 2) return false;
  const groups = (h) => h === "" ? [] : h.split(":");
  const all = halves.flatMap(groups);
  let count = all.length;
  const last = all[all.length - 1];
  if (last?.includes(".")) {
    if (!isIPv4(last)) return false;
    all.pop();
    count += 1;
  }
  if (!all.every((g) => /^[0-9a-fA-F]{1,4}$/.test(g))) return false;
  return halves.length === 2 ? count <= 7 : count === 8;
}
function isIp(s) {
  return isIPv4(s) || isIPv6(s);
}
function parseCidr(s) {
  const m = /^([^/]+)\/(\d{1,3})$/.exec(s.trim());
  if (!m) return null;
  const address = m[1];
  const prefix = Number(m[2]);
  if (isIPv4(address) && prefix <= 32) return { address, prefix, version: 4 };
  if (isIPv6(address) && prefix <= 128) return { address, prefix, version: 6 };
  return null;
}
function isCidr(s) {
  return parseCidr(s) !== null;
}
function NetInput({ validate, message, label, hint, errorMessage, value, defaultValue = "", onChange, className, id, ...rest }) {
  const auto = React31__namespace.useId();
  const inputId = id ?? auto;
  const [val, setVal] = chunkS4QID4TP_cjs.useControllableState({ value, defaultValue, onChange });
  const [touched, setTouched] = React31__namespace.useState(false);
  const invalid = touched && val !== "" && !validate(val);
  const input = /* @__PURE__ */ jsxRuntime.jsx(
    chunkGEJA4YGN_cjs.Input,
    {
      ...rest,
      id: inputId,
      value: val,
      invalid,
      spellCheck: false,
      autoComplete: "off",
      className: chunkFTHFEMX6_cjs.cn("font-mono", className),
      onChange: (e) => setVal(e.target.value),
      onBlur: (e) => {
        setTouched(true);
        const t = e.target.value.trim();
        if (t !== e.target.value) setVal(t);
        rest.onBlur?.(e);
      },
      onPaste: (e) => {
        const text = e.clipboardData.getData("text");
        if (text.trim() !== text) {
          e.preventDefault();
          setVal(text.trim());
        }
        rest.onPaste?.(e);
      }
    }
  );
  if (!label) return input;
  return /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Field, { label, hint, htmlFor: inputId, error: invalid ? errorMessage ?? message : void 0, children: input });
}
function IpInput(props) {
  const L = useLaf3().t.components.admin.network;
  return /* @__PURE__ */ jsxRuntime.jsx(NetInput, { placeholder: "192.0.2.1", validate: isIp, message: L.invalidIp, ...props });
}
function CidrInput(props) {
  const L = useLaf3().t.components.admin.network;
  return /* @__PURE__ */ jsxRuntime.jsx(NetInput, { placeholder: "10.0.0.0/8", validate: isCidr, message: L.invalidCidr, ...props });
}
function AllowListEditor({ value, defaultValue = [], onChange, label: labelProp, labels: l, disabled }) {
  const { t: laf } = useLaf3();
  const label = labelProp ?? laf.components.admin.allowList;
  const L = { ...laf.components.admin.network, ...l };
  const id = React31__namespace.useId();
  const [list, setList] = chunkS4QID4TP_cjs.useControllableState({ value, defaultValue, onChange });
  const [draft, setDraft] = React31__namespace.useState("");
  const [error, setError] = React31__namespace.useState();
  const add = () => {
    const entry = draft.trim();
    if (!entry) return;
    if (!isIp(entry) && !isCidr(entry)) return setError(L.invalidEntry);
    if (list.includes(entry)) return setError(L.duplicate);
    setList([...list, entry]);
    setDraft("");
    setError(void 0);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Field, { label, htmlFor: id, error, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        chunkGEJA4YGN_cjs.Input,
        {
          id,
          value: draft,
          invalid: !!error,
          disabled,
          spellCheck: false,
          autoComplete: "off",
          placeholder: "203.0.113.0/24",
          className: "font-mono",
          onChange: (e) => {
            setDraft(e.target.value);
            setError(void 0);
          },
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", disabled, leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, {}), onClick: add, children: L.add })
    ] }) }),
    list.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted", children: L.empty }) : /* @__PURE__ */ jsxRuntime.jsx("ul", { "aria-label": label, className: "divide-y divide-line rounded-md border border-line text-sm", children: list.map((entry) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-center gap-3 px-3 py-1.5", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 font-mono", children: entry }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: "neutral", children: isCidr(entry) ? "CIDR" : isIPv6(entry) ? "IPv6" : "IPv4" }),
      /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", disabled, "aria-label": L.remove(entry), className: "text-muted hover:text-fg", onClick: () => setList(list.filter((x) => x !== entry)), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-4", "aria-hidden": true }) })
    ] }, entry)) })
  ] });
}
var ROW = 32;
function TransferColumn({ title, items, checked, setChecked, L, height }) {
  const [q, setQ] = React31__namespace.useState("");
  const needle = q.trim().toLowerCase();
  const shown = needle ? items.filter((i) => i.label.toLowerCase().includes(needle)) : items;
  const n = items.filter((i) => checked.has(i.id)).length;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid min-w-0 flex-1 gap-2 rounded-md border border-line p-2", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold text-fg", children: title }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted", "aria-live": "polite", children: L.count(n, items.length) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Input, { type: "search", "aria-label": L.search(title), placeholder: L.search(title), value: q, onChange: (e) => setQ(e.target.value) }),
    shown.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "px-1 py-2 text-sm text-muted", children: L.empty }) : /* @__PURE__ */ jsxRuntime.jsx(
      chunkGEJA4YGN_cjs.VirtualList,
      {
        items: shown,
        rowHeight: ROW,
        height,
        label: title,
        renderRow: (item) => /* @__PURE__ */ jsxRuntime.jsxs("label", { className: chunkFTHFEMX6_cjs.cn("flex h-full items-center gap-2 px-2 text-sm hover:bg-card-hover", item.disabled && "opacity-50"), children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              type: "checkbox",
              disabled: item.disabled,
              checked: checked.has(item.id),
              onChange: (e) => {
                const next = new Set(checked);
                if (e.target.checked) next.add(item.id);
                else next.delete(item.id);
                setChecked(next);
              }
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: item.label })
        ] })
      }
    )
  ] });
}
function TransferList({ items, value, defaultValue = [], onChange, labels, height = 224 }) {
  const L = { ...useLaf3().t.components.admin.transfer, ...labels };
  const [sel, setSel] = chunkS4QID4TP_cjs.useControllableState({ value, defaultValue, onChange });
  const [leftChecked, setLeftChecked] = React31__namespace.useState(/* @__PURE__ */ new Set());
  const [rightChecked, setRightChecked] = React31__namespace.useState(/* @__PURE__ */ new Set());
  const chosen = new Set(sel);
  const left = items.filter((i) => !chosen.has(i.id));
  const right = sel.map((id) => items.find((i) => i.id === id)).filter((i) => !!i);
  const move = (ids, toRight) => {
    const set = new Set(ids);
    setSel(toRight ? [...sel, ...ids.filter((id) => !chosen.has(id))] : sel.filter((id) => !set.has(id)));
    setLeftChecked(/* @__PURE__ */ new Set());
    setRightChecked(/* @__PURE__ */ new Set());
  };
  const movable = (list) => list.filter((i) => !i.disabled).map((i) => i.id);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-label": `${L.available} / ${L.selected}`, className: "flex items-stretch gap-3", children: [
    /* @__PURE__ */ jsxRuntime.jsx(TransferColumn, { title: L.available, items: left, checked: leftChecked, setChecked: setLeftChecked, L, height }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", "aria-label": L.moveAllRight, disabled: movable(left).length === 0, onClick: () => move(movable(left), true), children: "\xBB" }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", "aria-label": L.moveRight, disabled: leftChecked.size === 0, onClick: () => move([...leftChecked], true), children: "\u203A" }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", "aria-label": L.moveLeft, disabled: rightChecked.size === 0, onClick: () => move([...rightChecked], false), children: "\u2039" }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", "aria-label": L.moveAllLeft, disabled: movable(right).length === 0, onClick: () => move(movable(right), false), children: "\xAB" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(TransferColumn, { title: L.selected, items: right, checked: rightChecked, setChecked: setRightChecked, L, height })
  ] });
}
var fromRgb = (n) => `#${n.toString(16).padStart(6, "0")}`;
var DEFAULT_PRIMARY = fromRgb(5546751);
var DEFAULT_CARD = fromRgb(1579035);
var DEFAULT_ON_PRIMARY = fromRgb(723725);
var HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
function normalizeHex(input) {
  const m = HEX.exec(input.trim());
  if (!m) return null;
  let h = m[1].toLowerCase();
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  return `#${h}`;
}
function luminance(hex) {
  const h = normalizeHex(hex);
  if (!h) throw new Error(`Invalid hex colour: ${hex}`);
  const ch = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}
function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
function ColorField({ value, defaultValue = DEFAULT_PRIMARY, onChange, cardColor = DEFAULT_CARD, onPrimaryColor = DEFAULT_ON_PRIMARY, minCardRatio = 3, minTextRatio = 4.5, labels }) {
  const L = { ...useLaf3().t.components.admin.color, ...labels };
  const id = React31__namespace.useId();
  const [accepted, setAccepted] = chunkS4QID4TP_cjs.useControllableState({ value, defaultValue, onChange });
  const [draft, setDraft] = React31__namespace.useState(accepted);
  React31__namespace.useEffect(() => setDraft(accepted), [accepted]);
  const hex = normalizeHex(draft);
  const onCard = hex ? contrastRatio(hex, cardColor) : 0;
  const onText = hex ? contrastRatio(hex, onPrimaryColor) : 0;
  const passes = !!hex && onCard >= minCardRatio && onText >= minTextRatio;
  const error = !hex ? L.invalidHex : !passes ? L.rejected : void 0;
  const update = (next, final = true) => {
    setDraft(next);
    const h = final || next.replace("#", "").length === 6 ? normalizeHex(next) : null;
    if (h && contrastRatio(h, cardColor) >= minCardRatio && contrastRatio(h, onPrimaryColor) >= minTextRatio) setAccepted(h);
  };
  const row = (name, ratio, min) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { children: name }),
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-mono text-xs", children: hex ? `${ratio.toFixed(2)}:1` : "\u2013" }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: hex && ratio >= min ? "ok" : "danger", children: hex && ratio >= min ? L.pass : L.fail })
    ] })
  ] });
  const shown = passes ? hex : accepted;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3", children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Field, { label: L.label, htmlFor: id, error, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx("input", { type: "color", "aria-label": L.colorPicker, value: normalizeHex(accepted) ?? fromRgb(0), onChange: (e) => update(e.target.value), className: "h-8 w-10 rounded-sm border border-line bg-transparent p-0.5" }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Input, { id, value: draft, invalid: !!error, spellCheck: false, maxLength: 7, className: "max-w-32 font-mono", onChange: (e) => update(e.target.value, false), onBlur: (e) => update(e.target.value) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { "aria-label": L.contrast, className: "grid gap-1 text-sm", children: [
      row(L.onCard, onCard, minCardRatio),
      row(L.onPrimary, onText, minTextRatio)
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { "aria-label": L.preview, role: "group", className: "flex items-center gap-3 rounded-md border border-line p-3", style: { "--primary": shown, "--primary-hover": shown }, children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "btn btn-primary pointer-events-none", "aria-hidden": true, children: L.sampleButton }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: "primary", children: L.sampleBadge }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "inline-block size-6 rounded-sm bg-card outline-2 outline-offset-2 outline-primary" })
    ] })
  ] });
}
function BrandingEditor({ value, defaultValue = { productName: "", primary: DEFAULT_PRIMARY }, onChange, maxLogoSize = 512 * 1024, cardColor, onPrimaryColor, labels }) {
  const L = { ...useLaf3().t.components.admin.branding, ...labels };
  const [b, setB] = chunkS4QID4TP_cjs.useControllableState({ value, defaultValue, onChange });
  const nameId = React31__namespace.useId();
  const [files, setFiles] = React31__namespace.useState([]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid content-start gap-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Field, { label: L.productName, htmlFor: nameId, children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Input, { id: nameId, value: b.productName, onChange: (e) => setB({ ...b, productName: e.target.value }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(ColorField, { value: b.primary, onChange: (primary) => setB({ ...b, primary }), cardColor, onPrimaryColor, labels: labels?.color }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "form-label", children: L.logo }),
        /* @__PURE__ */ jsxRuntime.jsx(
          chunkPNRO35YW_cjs.FileDropzone,
          {
            multiple: false,
            accept: "image/png,image/svg+xml,image/jpeg",
            maxSize: maxLogoSize,
            label: L.dropLogo,
            files,
            onRemove: () => {
              setFiles([]);
              setB({ ...b, logoUrl: void 0 });
            },
            onFiles: (list) => {
              const f = list[0];
              if (!f) return;
              setFiles([{ id: f.name, name: f.name, size: f.size }]);
              setB({ ...b, logoUrl: URL.createObjectURL(f) });
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("figure", { className: "m-0 grid gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx("figcaption", { className: "form-label", children: L.preview }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ...{ inert: true },
          className: "overflow-hidden rounded-md border border-line bg-bg p-6",
          style: { "--primary": b.primary, "--primary-hover": b.primary },
          children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mx-auto grid w-64 origin-top gap-3 rounded-md border border-line bg-card p-5", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
              b.logoUrl && /* @__PURE__ */ jsxRuntime.jsx("img", { src: b.logoUrl, alt: "", className: "size-8 object-contain" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-base font-semibold text-fg", children: b.productName })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "h-8 rounded-sm border border-line bg-input" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "h-8 rounded-sm border border-line bg-input" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "btn btn-primary justify-center", children: L.signIn })
          ] })
        }
      )
    ] })
  ] });
}
function NotificationCenter({ items, onMarkRead, onMarkAllRead, onViewAll, onOpen, labels }) {
  const L = { ...useLaf3().t.components.admin.notifications, ...labels };
  const unread = items.filter((i) => i.unread).length;
  const groups = /* @__PURE__ */ new Map();
  for (const i of items) groups.set(i.group, [...groups.get(i.group) ?? [], i]);
  const bellLabel = unread ? `${L.bell} (${unread})` : L.bell;
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Popover, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "relative inline-flex", children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.IconButton, { label: bellLabel, icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Bell, { className: "size-4" }) }) }),
      unread > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "pointer-events-none absolute -end-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-sm bg-danger px-1 text-[0.625rem] leading-4 font-bold text-on-primary", children: unread > 99 ? "99+" : unread }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", "aria-live": "polite", children: L.unreadCount(unread) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.PopoverContent, { title: L.title, align: "end", className: "w-80 max-w-[calc(100vw-2rem)] p-0", footer: onViewAll && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", onClick: onViewAll, children: L.viewAll }), children: [
      unread > 0 && onMarkAllRead && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end px-3 pb-1", children: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", onClick: onMarkAllRead, children: L.markAllRead }) }),
      items.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "px-3 py-6 text-center text-sm text-muted", children: L.empty }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-h-80 overflow-auto", children: [...groups].map(([group, list]) => /* @__PURE__ */ jsxRuntime.jsxs("section", { "aria-label": group, children: [
        group && /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "bg-muted-bg px-3 py-1 text-xs font-semibold text-muted uppercase", children: group }),
        /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "divide-y divide-line", children: list.map((n) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-start gap-2 px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn("mt-1.5 size-2 shrink-0 rounded-full", n.unread ? "bg-primary" : "bg-transparent") }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1", children: [
            n.href ? /* @__PURE__ */ jsxRuntime.jsx("a", { href: n.href, className: chunkFTHFEMX6_cjs.cn("block truncate hover:underline", n.unread ? "font-semibold text-fg" : "text-muted"), onClick: () => onOpen?.(n), children: n.title }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkFTHFEMX6_cjs.cn("block truncate", n.unread ? "font-semibold text-fg" : "text-muted"), children: n.title }),
            n.body && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-xs text-muted", children: n.body }),
            /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: n.time, className: "text-xs text-subtle" })
          ] }),
          n.unread && onMarkRead && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": L.markRead(n.title), className: "text-xs text-primary hover:underline", onClick: () => onMarkRead(n.id), children: "\u2713" })
        ] }, n.id)) })
      ] }, group ?? "_")) })
    ] })
  ] });
}
var HotkeysContext = React31__namespace.createContext(null);
function HotkeysProvider({ scopes = ["global"], children }) {
  const store = React31__namespace.useRef({ items: /* @__PURE__ */ new Set(), subs: /* @__PURE__ */ new Set() });
  const value = React31__namespace.useMemo(
    () => ({
      scopes,
      register(entry) {
        store.current.items.add(entry);
        store.current.subs.forEach((f) => f());
        return () => {
          store.current.items.delete(entry);
          store.current.subs.forEach((f) => f());
        };
      },
      list: () => [...store.current.items],
      subscribe(cb) {
        store.current.subs.add(cb);
        return () => void store.current.subs.delete(cb);
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scopes.join("\0")]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(HotkeysContext.Provider, { value, children });
}
function useRegisteredHotkeys() {
  const ctx = React31__namespace.useContext(HotkeysContext);
  const [, bump] = React31__namespace.useReducer((n) => n + 1, 0);
  React31__namespace.useEffect(() => {
    bump();
    return ctx?.subscribe(bump);
  }, [ctx]);
  return ctx?.list() ?? [];
}
var isMacPlatform = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || "");
var aliases = { esc: "escape", space: " ", spacebar: " ", up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright", return: "enter", plus: "+" };
function parseStroke(src, mac) {
  const parts = src.split("+").filter(Boolean);
  if (src.endsWith("++")) parts.push("+");
  const s = { ctrl: false, meta: false, alt: false, shift: false, key: "" };
  for (const raw of parts) {
    const p = raw.toLowerCase();
    if (p === "mod") mac ? s.meta = true : s.ctrl = true;
    else if (p === "ctrl" || p === "control") s.ctrl = true;
    else if (p === "meta" || p === "cmd" || p === "command") s.meta = true;
    else if (p === "alt" || p === "option") s.alt = true;
    else if (p === "shift") s.shift = true;
    else s.key = aliases[p] ?? p;
  }
  return s;
}
var parseHotkey = (combo, mac = isMacPlatform()) => combo.trim().split(/\s+/).map((s) => parseStroke(s, mac));
function strokeMatches(e, s) {
  if (e.ctrlKey !== s.ctrl || e.metaKey !== s.meta || e.altKey !== s.alt) return false;
  const key = e.key.toLowerCase();
  const shiftOk = s.shift ? e.shiftKey : !e.shiftKey || !/^[a-z0-9]$/.test(key) ? true : false;
  return shiftOk && key === s.key;
}
var isTypingTarget = (t) => {
  const el = t;
  if (!el || !el.tagName) return false;
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
};
var SEQUENCE_TIMEOUT = 1e3;
function useHotkeys(map, opts = {}) {
  const { scope = "global", enabled = true, allowInInputs = false, descriptions } = opts;
  const ctx = React31__namespace.useContext(HotkeysContext);
  const mapRef = React31__namespace.useRef(map);
  mapRef.current = map;
  const descRef = React31__namespace.useRef(descriptions);
  descRef.current = descriptions;
  const active = scope === "global" || (ctx?.scopes ?? ["global"]).includes(scope);
  const keys = Object.keys(map).join("\0");
  React31__namespace.useEffect(() => {
    if (!enabled || !active) return;
    const offs = keys.split("\0").filter(Boolean).map((combo) => ctx?.register({ combo, description: descRef.current?.[combo], scope }));
    const mac = isMacPlatform();
    const parsed = keys.split("\0").filter(Boolean).map((combo) => ({ combo, steps: parseHotkey(combo, mac) }));
    let buffer = [];
    let timer;
    const reset = () => {
      buffer = [];
      clearTimeout(timer);
    };
    const onKey = (e) => {
      if (e.defaultPrevented || e.repeat || ["shift", "control", "alt", "meta"].includes(e.key.toLowerCase())) return;
      if (!allowInInputs && isTypingTarget(e.target)) return reset();
      buffer = [...buffer, e].slice(-4);
      clearTimeout(timer);
      timer = setTimeout(reset, SEQUENCE_TIMEOUT);
      for (const { combo, steps } of parsed) {
        const tail = buffer.slice(-steps.length);
        if (tail.length === steps.length && tail.every((ev, i) => strokeMatches(ev, steps[i]))) {
          e.preventDefault();
          reset();
          mapRef.current[combo]?.(e);
          return;
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer);
      offs.forEach((off) => off?.());
    };
  }, [keys, enabled, active, allowInInputs, scope, ctx]);
}
var symbols = { mod: "mod", ctrl: "Ctrl", meta: "\u2318", alt: "Alt", shift: "Shift", escape: "Esc", arrowup: "\u2191", arrowdown: "\u2193", arrowleft: "\u2190", arrowright: "\u2192", " ": "Space" };
function formatHotkey(combo, mac = isMacPlatform()) {
  return combo.trim().split(/\s+/).map(
    (step) => step.split("+").filter(Boolean).map((p) => {
      const k = aliases[p.toLowerCase()] ?? p.toLowerCase();
      if (k === "mod") return mac ? "\u2318" : "Ctrl";
      const sym = symbols[k];
      return sym ?? (k.length === 1 ? k.toUpperCase() : p);
    }).join(mac ? "" : "+")
  ).join(" ");
}
function ShortcutHelp({ open, onOpenChange }) {
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const container = chunkQQA4GJXV_cjs.usePortalContainer();
  const items = useRegisteredHotkeys().filter((h) => h.combo !== "?");
  useHotkeys({ "?": () => onOpenChange(true) });
  const groups = /* @__PURE__ */ new Map();
  items.forEach((h) => groups.set(h.scope, [...groups.get(h.scope) ?? [], h]));
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Root, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive3__namespace.Portal, { container, children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive3__namespace.Content,
      {
        "aria-describedby": void 0,
        className: "popup fixed top-[15%] start-1/2 z-50 max-h-[70vh] w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 rtl:translate-x-1/2 overflow-auto p-4",
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Title, { className: "m-0 text-base font-semibold text-fg", children: t.shortcuts }),
            /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Close, { className: "btn btn-ghost btn-sm", "aria-label": t.close, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-4", "aria-hidden": true }) })
          ] }),
          items.length === 0 && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted", children: t.noShortcuts }),
          [...groups].map(([scope, list]) => /* @__PURE__ */ jsxRuntime.jsxs("section", { className: "mb-3", children: [
            groups.size > 1 && /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "mb-1 text-xs font-medium uppercase text-subtle", children: scope }),
            /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 list-none p-0", children: list.map((h) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-center justify-between gap-3 py-1 text-sm text-muted", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: h.description ?? h.combo }),
              /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Kbd, { children: formatHotkey(h.combo) })
            ] }, `${h.scope}:${h.combo}`)) })
          ] }, scope))
        ]
      }
    )
  ] }) });
}
function CapacityBar({
  label,
  used,
  reserved = 0,
  total,
  unit = "count",
  warnAt = 70,
  dangerAt = 90,
  labels: labelsProp,
  className
}) {
  const { t: laf, format: format2 } = chunkQQA4GJXV_cjs.useLaf();
  const l = { used: laf.vsUsed, reserved: laf.vsReserved, free: laf.vsFree, capacity: laf.vsCapacity, ...labelsProp };
  const fmt = (n) => unit === "bytes" ? format2.bytes(n, { base: 1024 }) : unit === "frequency" ? format2.frequency(n) : String(n);
  const safeTotal = total > 0 ? total : 1;
  const usedPct = Math.min(100, Math.max(0, used / safeTotal * 100));
  const resPct = Math.min(100 - usedPct, Math.max(0, reserved / safeTotal * 100));
  const free = Math.max(0, total - used - reserved);
  const tone = usedPct >= dangerAt ? "bg-danger" : usedPct >= warnAt ? "bg-warn" : "bg-ok";
  const text = [
    `${fmt(used)} ${l.used}`,
    reserved > 0 ? `${fmt(reserved)} ${l.reserved}` : void 0,
    `${fmt(free)} ${l.free}`,
    `${fmt(total)} ${l.capacity}`
  ].filter(Boolean).join(" \xB7 ");
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid gap-1", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-baseline justify-between gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium text-fg", children: label }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-mono text-xs text-muted", children: format2.percent(usedPct / 100) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        role: "img",
        "aria-label": `${label}: ${text}`,
        className: "flex h-2.5 overflow-hidden rounded-sm bg-muted-bg",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkFTHFEMX6_cjs.cn("h-full", tone), style: { width: `${usedPct}%` }, "data-segment": "used" }),
          resPct > 0 && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: "h-full bg-primary/40",
              style: { width: `${resPct}%` },
              "data-segment": "reserved"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("div", { "aria-hidden": true, className: "text-xs text-muted", children: text })
  ] });
}
function ObjectPage({
  kind,
  state,
  name,
  statusLabel,
  statusTone,
  actions,
  actionsLabel,
  facts,
  cards,
  monitor,
  configure,
  tab: tabProp,
  defaultTab = "summary",
  onTabChange,
  labels: labelsProp,
  className
}) {
  const { t: laf } = chunkQQA4GJXV_cjs.useLaf();
  const l = { summary: laf.vsSummary, monitor: laf.vsMonitor, configure: laf.vsConfigure, ...labelsProp };
  const [tab, setTab] = chunkS4QID4TP_cjs.useControllableState({ value: tabProp, defaultValue: defaultTab, onChange: onTabChange });
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid gap-4", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkVUZVPUQ7_cjs.ObjectIcon, { kind, state, size: 20 }),
      /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "min-w-0 text-xl font-semibold text-fg", children: name }),
      statusLabel && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.StatusDot, { tone: statusTone, label: statusLabel }),
      actions && actions.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ms-auto", children: /* @__PURE__ */ jsxRuntime.jsx(ActionBar, { items: actions, label: actionsLabel ?? name }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Tabs, { value: tab, onValueChange: setTab, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.TabsList, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.TabsTrigger, { value: "summary", children: l.summary }),
        monitor !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.TabsTrigger, { value: "monitor", children: l.monitor }),
        configure !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.TabsTrigger, { value: "configure", children: l.configure })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.TabsContent, { value: "summary", className: "grid gap-4 pt-4", children: [
        facts && /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.DefinitionList, { items: facts }),
        cards && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: cards.map((c) => /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Panel, { title: c.title, headingLevel: 2, children: c.content }, c.id)) })
      ] }),
      monitor !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.TabsContent, { value: "monitor", className: "pt-4", children: monitor }),
      configure !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.TabsContent, { value: "configure", className: "pt-4", children: configure })
    ] })
  ] });
}
var NARROW = "(max-width: 859px)";
function useNarrow() {
  return React31__namespace.useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {
      };
      const mq = window.matchMedia(NARROW);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => typeof window !== "undefined" && !!window.matchMedia ? window.matchMedia(NARROW).matches : false,
    () => false
  );
}
function InventoryLayout({
  top,
  tree,
  treeLabel,
  children,
  bottom,
  bottomLabel,
  persistKey,
  narrow: narrowProp,
  defaultTreeSize = 280,
  defaultBottomSize = 220,
  className
}) {
  const { t: laf } = chunkQQA4GJXV_cjs.useLaf();
  const mqNarrow = useNarrow();
  const narrow = narrowProp ?? mqNarrow;
  const [drawer, setDrawer] = React31__namespace.useState(false);
  const treeTitle = treeLabel ?? laf.vsInventoryTree;
  const main = bottom ? /* @__PURE__ */ jsxRuntime.jsx(
    chunkGEJA4YGN_cjs.SplitPane,
    {
      orientation: "vertical",
      primary: "end",
      collapsible: true,
      label: bottomLabel ?? laf.vsRecentTasks,
      persistKey: persistKey && `${persistKey}:bottom`,
      defaultSize: defaultBottomSize,
      min: 80,
      max: 600,
      className: "h-full rounded-none border-0",
      start: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "p-4", children }),
      end: /* @__PURE__ */ jsxRuntime.jsx("div", { role: "region", "aria-label": bottomLabel ?? laf.vsRecentTasks, className: "h-full", children: bottom })
    }
  ) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-full overflow-auto p-4", children });
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex h-full min-h-0 flex-col", className), children: [
    top,
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-0 flex-1", children: narrow ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center border-b border-line px-2 py-1", children: /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Drawer, { open: drawer, onOpenChange: setDrawer, children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DrawerTrigger, { className: "btn btn-ghost btn-sm", "aria-label": treeTitle, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.PanelLeft, { className: "size-4", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DrawerContent, { title: treeTitle, width: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("div", { onClickCapture: (e) => e.target.closest('[role="treeitem"]') && setDrawer(false), children: tree }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-0 flex-1", children: main })
    ] }) : /* @__PURE__ */ jsxRuntime.jsx(
      chunkGEJA4YGN_cjs.SplitPane,
      {
        collapsible: true,
        label: treeTitle,
        persistKey: persistKey && `${persistKey}:tree`,
        defaultSize: defaultTreeSize,
        min: 160,
        max: 600,
        className: "h-full rounded-none border-0",
        start: /* @__PURE__ */ jsxRuntime.jsx("nav", { "aria-label": treeTitle, className: "h-full p-1", children: tree }),
        end: main
      }
    ) })
  ] });
}

// lib/messages/tracker.en.ts
var trackerEn = {
  labelPicker: {
    label: "Labels",
    placeholder: "Filter labels\u2026",
    newColour: "New label colour",
    colour: (n) => `Colour ${n}`,
    create: (q) => `Create label \u201C${q}\u201D`
  },
  reaction: {
    add: "Add reaction",
    reactedBy: (emoji, users) => `${emoji} ${users.join(", ")}`,
    toggle: (emoji, n) => `${emoji} ${n}`
  },
  timeline: {
    edited: "edited",
    actions: "Comment actions",
    more: (n) => `${n} more updates`,
    fewer: "Show fewer updates",
    timeline: "Activity"
  },
  optionPicker: { search: "Search\u2026", empty: "No results", none: "None" },
  issue: { select: (key) => `Select ${key}`, overdue: "Overdue", comments: (n) => `${n} comments`, due: "Due" },
  progress: { todo: "To do", doing: "In progress", done: "Done", summary: (pct) => `${pct}% complete` }
};
var lafDefaults6 = { tracker: trackerEn };
var useLaf4 = () => chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults6);
function Tip({ content, children }) {
  return /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Provider, { delayDuration: 300, children: /* @__PURE__ */ jsxRuntime.jsxs(TooltipPrimitive__namespace.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Content, { sideOffset: 6, className: "z-60 rounded-md border border-line-strong bg-menu px-2 py-1 text-xs text-fg", children: content }) })
  ] }) });
}
var withLabels = (defaults, labels) => ({ ...defaults, ...labels });
function Label({ slot, description, onRemove, removeLabel, children }) {
  const chip = /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Chip, { color: slot, onRemove, removeLabel, children });
  return description ? /* @__PURE__ */ jsxRuntime.jsx(Tip, { content: description, children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex", children: chip }) }) : chip;
}
function LabelSwatch({ slot, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn("inline-block size-3 shrink-0 rounded-xs", className), style: { backgroundColor: `var(--label-${slot})` } });
}
function LabelPicker({
  labels,
  value,
  onChange,
  onCreate,
  text,
  disabled
}) {
  const l = withLabels(useLaf4().t.components.tracker.labelPicker, text);
  const [slot, setSlot] = React31__namespace.useState(1);
  const byId = React31__namespace.useMemo(() => new Map(labels.map((x) => [x.id, x])), [labels]);
  const options = labels.map((x) => ({ value: x.id, label: x.name, description: x.description }));
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      chunkGEJA4YGN_cjs.Combobox,
      {
        multiple: true,
        label: l.label,
        placeholder: l.placeholder,
        options,
        value: options.filter((o) => value.includes(o.value)),
        onChange: (v) => onChange(v.map((o) => o.value)),
        disabled,
        onCreate: onCreate ? (name) => onCreate({ name, slot }) : void 0,
        createLabel: l.create,
        renderOption: (o) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(LabelSwatch, { slot: byId.get(o.value)?.slot ?? 1 }),
          o.label
        ] })
      }
    ),
    onCreate && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "radiogroup", "aria-label": l.newColour, className: "flex flex-wrap gap-1", children: chunkGEJA4YGN_cjs.LABEL_SLOTS.map((s) => /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": slot === s,
        "aria-label": l.colour(s),
        disabled,
        onClick: () => setSlot(s),
        className: chunkFTHFEMX6_cjs.cn("grid size-6 place-items-center rounded-sm border bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary", slot === s ? "border-fg" : "border-transparent"),
        children: /* @__PURE__ */ jsxRuntime.jsx(LabelSwatch, { slot: s, className: "size-4" })
      },
      s
    )) })
  ] });
}
var DEFAULT_EMOJI = ["\u{1F44D}", "\u{1F44E}", "\u{1F604}", "\u{1F389}", "\u2764\uFE0F", "\u{1F440}"];
function Reactions({
  reactions,
  onToggle,
  palette = DEFAULT_EMOJI,
  readOnly,
  text
}) {
  const l = withLabels(useLaf4().t.components.tracker.reaction, text);
  const [open, setOpen] = React31__namespace.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-1", children: [
    reactions.map((r) => /* @__PURE__ */ jsxRuntime.jsx(Tip, { content: l.reactedBy(r.emoji, r.users), children: /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        "aria-pressed": !!r.reacted,
        "aria-label": l.toggle(r.emoji, r.users.length),
        disabled: readOnly,
        onClick: () => onToggle(r.emoji),
        className: chunkFTHFEMX6_cjs.cn(
          "inline-flex h-6 items-center gap-1 rounded-sm border px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary",
          r.reacted ? "border-primary/35 bg-primary-light text-primary" : "border-line bg-muted-bg text-fg"
        ),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, children: r.emoji }),
          r.users.length
        ]
      }
    ) }, r.emoji)),
    !readOnly && /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        PopoverPrimitive__namespace.Trigger,
        {
          "aria-label": l.add,
          className: "inline-flex size-6 items-center justify-center rounded-sm border border-line bg-transparent text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.SmilePlus, { className: "size-3.5", "aria-hidden": true })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Content, { sideOffset: 4, align: "start", className: "z-50 flex gap-1 rounded-md border border-line-strong bg-menu p-1", children: palette.map((e) => /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          "aria-label": e,
          className: "size-7 rounded-sm border-0 bg-transparent hover:bg-surface-hover",
          onClick: () => {
            onToggle(e);
            setOpen(false);
          },
          children: e
        },
        e
      )) }) })
    ] })
  ] });
}
function ActivityTimeline({
  items,
  composer,
  collapseAfter = 3,
  text
}) {
  const l = withLabels(useLaf4().t.components.tracker.timeline, text);
  const [expanded, setExpanded] = React31__namespace.useState(/* @__PURE__ */ new Set());
  const rows = React31__namespace.useMemo(() => {
    const out = [];
    let run = [];
    const flush = () => {
      if (run.length > collapseAfter) out.push({ type: "run", id: `run-${run[0].id}`, events: run });
      else out.push(...run);
      run = [];
    };
    for (const it of items) {
      if (it.type === "event") run.push(it);
      else {
        flush();
        out.push(it);
      }
    }
    flush();
    return out;
  }, [items, collapseAfter]);
  const eventRow = (e) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-center gap-2 ps-1 text-xs text-muted", children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "grid size-5 shrink-0 place-items-center text-subtle", children: e.icon }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0", children: e.summary }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: e.at, className: "ms-auto shrink-0 text-subtle" })
  ] }, e.id);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-3", children: [
    /* @__PURE__ */ jsxRuntime.jsx("ol", { "aria-label": l.timeline, className: "m-0 grid list-none gap-3 p-0", children: rows.map((r) => {
      if (r.type === "event") return eventRow(r);
      if (r.type === "run") {
        const open = expanded.has(r.id);
        return /* @__PURE__ */ jsxRuntime.jsxs(React31__namespace.Fragment, { children: [
          open && r.events.map(eventRow),
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              "aria-expanded": open,
              className: "border-0 bg-transparent p-0 text-xs text-primary hover:underline",
              onClick: () => setExpanded((s) => {
                const n = new Set(s);
                if (!n.delete(r.id)) n.add(r.id);
                return n;
              }),
              children: open ? l.fewer : l.more(r.events.length)
            }
          ) })
        ] }, r.id);
      }
      return /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Avatar, { name: r.author.name, src: r.author.src }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1 rounded-md border border-line bg-surface", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 border-b border-line px-3 py-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntime.jsx("strong", { className: "text-fg", children: r.author.name }),
            /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: r.at, className: "text-muted" }),
            r.edited && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-subtle", children: [
              "(",
              l.edited,
              ")"
            ] }),
            r.actions && r.actions.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-auto", children: /* @__PURE__ */ jsxRuntime.jsx(
              Menu,
              {
                items: r.actions,
                trigger: /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": l.actions, className: "grid size-6 place-items-center rounded-sm border-0 bg-transparent text-muted hover:text-fg", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { className: "size-4", "aria-hidden": true }) })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-3 py-2 text-sm whitespace-pre-wrap text-fg", children: r.body }),
          r.reactions && r.onToggleReaction && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-3 pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(Reactions, { reactions: r.reactions, onToggle: r.onToggleReaction }) })
        ] })
      ] }, r.id);
    }) }),
    composer && /* @__PURE__ */ jsxRuntime.jsx("div", { children: composer })
  ] });
}
function OptionPicker({ options, value, onChange, multiple, label, compact, searchable = true, shortcut, disabled, text, className }) {
  const l = withLabels(useLaf4().t.components.tracker.optionPicker, text);
  const [open, setOpen] = React31__namespace.useState(false);
  const trigger = React31__namespace.useRef(null);
  const selected = options.filter((o) => value.includes(o.value));
  React31__namespace.useEffect(() => {
    if (!shortcut || disabled) return;
    const onKey = (e) => {
      if (e.key !== shortcut || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shortcut, disabled]);
  const pick = (o) => {
    if (multiple) onChange(value.includes(o.value) ? value.filter((v) => v !== o.value) : [...value, o.value]);
    else {
      onChange([o.value]);
      setOpen(false);
    }
  };
  const text1 = selected.length ? selected.map((o) => o.label).join(", ") : l.none;
  const iconOf = selected[0]?.icon;
  return /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      PopoverPrimitive__namespace.Trigger,
      {
        ref: trigger,
        disabled,
        "aria-label": compact ? `${label}: ${text1}` : void 0,
        "aria-haspopup": "listbox",
        className: chunkFTHFEMX6_cjs.cn(
          "inline-flex items-center gap-1.5 rounded-sm border border-transparent bg-transparent text-sm text-fg outline-none hover:border-line focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50",
          compact ? "size-7 justify-center" : "h-8 w-full px-2",
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "grid size-4 shrink-0 place-items-center", children: iconOf }),
          !compact && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1 truncate text-start", children: text1 }),
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "size-3.5 text-muted", "aria-hidden": true })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Content, { sideOffset: 4, align: "start", collisionPadding: 8, className: "z-50", children: /* @__PURE__ */ jsxRuntime.jsxs(cmdk.Command, { label, loop: true, className: "dropdown-menu min-w-52", children: [
      searchable && /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.Input, { "aria-label": l.search, placeholder: l.search, className: "w-full border-0 border-b border-line bg-transparent px-3 py-2 text-sm text-fg outline-none" }),
      /* @__PURE__ */ jsxRuntime.jsxs(cmdk.Command.List, { className: "max-h-64 overflow-auto", children: [
        /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.Empty, { className: "px-3 py-2 text-sm text-muted", children: l.empty }),
        options.map((o) => /* @__PURE__ */ jsxRuntime.jsxs(
          cmdk.Command.Item,
          {
            value: o.value,
            keywords: [o.label, o.description ?? ""],
            onSelect: () => pick(o),
            className: "dropdown-item cursor-pointer data-[selected=true]:bg-surface-hover data-[selected=true]:text-fg",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "grid size-4 place-items-center", children: o.icon }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: o.label }),
              o.description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-2 text-xs text-subtle", children: o.description }),
              value.includes(o.value) && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { "aria-hidden": true, className: "ms-auto size-3.5 text-primary" })
            ]
          },
          o.value
        ))
      ] })
    ] }) }) })
  ] });
}
function DueDate({ due, now, text }) {
  const d = new Date(due);
  const overdue = d.getTime() < (now ? new Date(now).getTime() : Date.now());
  return /* @__PURE__ */ jsxRuntime.jsxs("time", { dateTime: d.toISOString(), className: chunkFTHFEMX6_cjs.cn("text-xs", overdue ? "text-danger" : "text-muted"), children: [
    overdue && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
      text.overdue,
      ": "
    ] }),
    d.toLocaleDateString()
  ] });
}
function IssueLabels({ labels }) {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: labels.map((x) => /* @__PURE__ */ jsxRuntime.jsx(Label, { slot: x.slot, description: x.description, children: x.name }, x.name)) });
}
function IssueTitle({ issue }) {
  return issue.href ? /* @__PURE__ */ jsxRuntime.jsx("a", { href: issue.href, className: "truncate text-fg no-underline hover:underline", children: issue.title }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: issue.title });
}
function IssueRow({
  issue,
  density = "comfortable",
  selected,
  onSelectedChange,
  now,
  text
}) {
  const l = withLabels(useLaf4().t.components.tracker.issue, text);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex items-center gap-3 border-b border-line px-3 text-sm", density === "compact" ? "py-1" : "py-2.5", selected && "bg-surface-hover"), children: [
    onSelectedChange && /* @__PURE__ */ jsxRuntime.jsx("input", { type: "checkbox", "aria-label": l.select(issue.key), checked: !!selected, onChange: (e) => onSelectedChange(e.target.checked) }),
    issue.priority && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "grid size-4 shrink-0 place-items-center", children: issue.priority }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 font-mono text-xs text-muted", children: issue.key }),
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(IssueTitle, { issue }),
      issue.labels && /* @__PURE__ */ jsxRuntime.jsx(IssueLabels, { labels: issue.labels })
    ] }),
    issue.assignees && issue.assignees.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.AvatarGroup, { users: issue.assignees, size: "sm", max: 3 }),
    issue.due && /* @__PURE__ */ jsxRuntime.jsx(DueDate, { due: issue.due, now, text: l }),
    !!issue.comments && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted", "aria-label": l.comments(issue.comments), children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MessageSquare, { className: "size-3.5", "aria-hidden": true }),
      issue.comments
    ] }),
    issue.updated && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: issue.updated, className: "text-xs text-subtle" })
  ] });
}
function IssueCard({ issue, density = "comfortable", now, text }) {
  const l = withLabels(useLaf4().t.components.tracker.issue, text);
  return /* @__PURE__ */ jsxRuntime.jsxs("article", { className: chunkFTHFEMX6_cjs.cn("grid rounded-md border border-line bg-surface text-sm", density === "compact" ? "gap-1 p-2" : "gap-2 p-3"), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
      issue.priority && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "grid size-4 place-items-center", children: issue.priority }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-mono text-xs text-muted", children: issue.key }),
      issue.status && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-auto", children: issue.status })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex min-w-0", children: /* @__PURE__ */ jsxRuntime.jsx(IssueTitle, { issue }) }),
    issue.labels && issue.labels.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-1", children: /* @__PURE__ */ jsxRuntime.jsx(IssueLabels, { labels: issue.labels }) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
      issue.assignees && issue.assignees.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.AvatarGroup, { users: issue.assignees, size: "sm", max: 3 }),
      issue.due && /* @__PURE__ */ jsxRuntime.jsx(DueDate, { due: issue.due, now, text: l }),
      !!issue.comments && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted", "aria-label": l.comments(issue.comments), children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MessageSquare, { className: "size-3.5", "aria-hidden": true }),
        issue.comments
      ] }),
      issue.updated && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.RelativeTime, { value: issue.updated, className: "ms-auto text-xs text-subtle" })
    ] })
  ] });
}
function PropertiesPane({ groups, readOnly, label, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("section", { "aria-label": label, className: chunkFTHFEMX6_cjs.cn("grid gap-4 text-sm", className), children: groups.map((g) => /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-label": g.title, className: "grid gap-2", children: [
    g.title && /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "m-0 text-[0.6875rem] font-normal tracking-wider text-subtle uppercase", children: g.title }),
    /* @__PURE__ */ jsxRuntime.jsx("dl", { className: "m-0 grid gap-2", children: g.fields.map((f) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-[7rem_1fr] items-start gap-2", "aria-busy": f.pending || void 0, children: [
      /* @__PURE__ */ jsxRuntime.jsx("dt", { className: "pt-1 text-muted", children: f.label }),
      /* @__PURE__ */ jsxRuntime.jsxs("dd", { className: chunkFTHFEMX6_cjs.cn("m-0 grid min-w-0 gap-1", f.pending && "opacity-60"), children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 pt-1", children: !readOnly && f.editor ? f.editor : f.value ?? "\u2014" }),
        f.error && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "field-error", role: "alert", children: f.error })
      ] })
    ] }, f.id)) })
  ] }, g.id)) });
}
function HoverCard({
  trigger,
  children,
  openDelay = 300,
  closeDelay = 150,
  side = "bottom",
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(HoverCardPrimitive__namespace.Root, { openDelay, closeDelay, children: [
    /* @__PURE__ */ jsxRuntime.jsx(HoverCardPrimitive__namespace.Trigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntime.jsx(HoverCardPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(HoverCardPrimitive__namespace.Content, { side, sideOffset: 6, collisionPadding: 8, className: chunkFTHFEMX6_cjs.cn("z-50 w-72 rounded-md border border-line-strong bg-menu p-3 text-sm text-fg", className), children }) })
  ] });
}
function ProgressSummary({
  todo,
  doing,
  done,
  burndown,
  title,
  text
}) {
  const l = withLabels(useLaf4().t.components.tracker.progress, text);
  const total = todo + doing + done;
  const pct = total ? Math.round(done / total * 100) : 0;
  const seg = (n, cls) => n > 0 ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: cls, style: { width: `${n / total * 100}%` } }) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-2", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-baseline justify-between gap-2 text-sm", children: [
      title && /* @__PURE__ */ jsxRuntime.jsx("strong", { className: "text-fg", children: title }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-auto text-muted", children: l.summary(pct) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "progressbar", "aria-label": title ?? l.summary(pct), "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, "aria-valuetext": l.summary(pct), className: "flex h-2 overflow-hidden rounded-xs bg-muted-bg", children: [
      seg(done, "bg-ok"),
      seg(doing, "bg-primary")
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "m-0 flex list-none gap-4 p-0 text-xs text-muted", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        l.done,
        ": ",
        done
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        l.doing,
        ": ",
        doing
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        l.todo,
        ": ",
        todo
      ] })
    ] }),
    burndown
  ] });
}

// lib/messages/content.en.ts
var contentEn = {
  toolbar: {
    selected: (n) => `${n} selected`,
    clearSelection: "Clear selection",
    activeFilters: "Active filters",
    removeFilter: (label) => `Remove filter ${label}`,
    clearAll: "Clear all filters",
    actions: "Actions"
  },
  codeBlock: { label: "Code", copy: "Copy code", copied: "Copied", wrap: "Wrap lines" },
  clipboard: { copy: "Copy to clipboard", copied: "Copied", expand: "Show full value", collapse: "Hide full value" },
  form: { required: "required" }
};
var lafDefaults7 = { content: contentEn };
var FOCUSABLE = 'a[href],button,input:not([type="hidden"]),select,textarea,[role="button"],[role="combobox"],[role="radio"],[role="switch"],[role="checkbox"],[role="tab"],[tabindex]';
var TEXT_ENTRY = 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]),textarea,select,[contenteditable="true"]';
function navigable(root) {
  return [...root.querySelectorAll(FOCUSABLE)].filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-disabled") !== "true" && !el.closest("[hidden],[aria-hidden='true']") && el.closest('[role="toolbar"]') === root
  );
}
function Toolbar({ className, sticky, selectedCount = 0, bulkActions, onClearSelection, labels, children, onKeyDown, ...props }) {
  const isToolbar = !!props["aria-label"] || !!props["aria-labelledby"];
  const bulk = selectedCount > 0;
  const keyDown = (e) => {
    onKeyDown?.(e);
    const root = e.currentTarget;
    if (!isToolbar || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const target = e.target;
    if (!root.contains(target) || target.closest('[role="toolbar"]') !== root || target.matches(TEXT_ENTRY)) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    const items = navigable(root);
    const i = items.indexOf(target.closest(FOCUSABLE) ?? target);
    if (i < 0) return;
    const rtl = getComputedStyle(root).direction === "rtl";
    const step = e.key === "ArrowRight" ? rtl ? -1 : 1 : e.key === "ArrowLeft" ? rtl ? 1 : -1 : 0;
    const next = e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : (i + step + items.length) % items.length;
    e.preventDefault();
    items[next]?.focus();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      role: isToolbar ? "toolbar" : void 0,
      className: chunkFTHFEMX6_cjs.cn("toolbar", sticky && "sticky top-0 z-10 border-b border-line bg-[var(--bg)] py-2", bulk && "bg-primary-light", className),
      onKeyDown: keyDown,
      ...props,
      children: [
        bulk && /* @__PURE__ */ jsxRuntime.jsx(ToolbarBulk, { count: selectedCount, onClear: onClearSelection, labels, children: bulkActions }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { hidden: bulk, className: "contents [&[hidden]]:hidden", children })
      ]
    }
  );
}
function ToolbarContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("flex w-full min-w-0 flex-wrap items-center gap-2.5", className), ...props });
}
function ToolbarGroup({ variant, align: align2, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-variant": variant,
      className: chunkFTHFEMX6_cjs.cn(
        "flex min-w-0 flex-wrap items-center gap-2",
        (variant === "pagination" || align2 === "end") && "ms-auto",
        variant === "pagination" && "[&_.pagination]:p-0",
        className
      ),
      ...props
    }
  );
}
function ToolbarItem({ grow, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("flex min-w-0 items-center", grow && "min-w-56 flex-1", className), ...props });
}
function ToolbarSpacer({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn("flex-1", className), ...props });
}
function ToolbarDivider({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "separator", "aria-orientation": "vertical", className: chunkFTHFEMX6_cjs.cn("h-5 w-px shrink-0 self-center bg-line", className), ...props });
}
function ToolbarActions({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(ActionBar, { className: chunkFTHFEMX6_cjs.cn("min-w-0 flex-1", className), ...props });
}
function ToolbarFilterChips({ filters, onRemove, onClearAll, className, labels }) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults7);
  const m = t.components.content.toolbar;
  if (filters.length === 0) return null;
  const groups = /* @__PURE__ */ new Map();
  for (const f of filters) groups.set(f.category ?? "", [...groups.get(f.category ?? "") ?? [], f]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-label": labels?.activeFilters ?? m.activeFilters, className: chunkFTHFEMX6_cjs.cn("flex w-full flex-wrap items-center gap-x-4 gap-y-2", className), children: [
    [...groups].map(([category, list]) => /* @__PURE__ */ jsxRuntime.jsxs("div", { role: category ? "group" : void 0, "aria-label": category || void 0, className: "flex flex-wrap items-center gap-1.5", children: [
      category && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "text-xs text-muted", children: category }),
      list.map((f) => /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Chip, { onRemove: onRemove ? () => onRemove(f) : void 0, removeLabel: (labels?.removeFilter ?? m.removeFilter)(f.label), children: f.label }, f.id))
    ] }, category)),
    onClearAll && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", onClick: onClearAll, children: labels?.clearAll ?? m.clearAll })
  ] });
}
function ToolbarBulk({ count, onClear, children, className, labels }) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults7);
  const m = t.components.content.toolbar;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex w-full min-w-0 flex-wrap items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { role: "status", className: "me-1 text-sm font-medium text-fg", children: (labels?.selected ?? m.selected)(count) }),
    children,
    onClear && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", className: "ms-auto", onClick: onClear, children: labels?.clearSelection ?? m.clearSelection })
  ] });
}
var lafDefaults8 = { content: contentEn };
var titleSize = { md: "text-base", lg: "text-lg", xl: "text-xl", "2xl": "text-2xl", "3xl": "text-3xl", "4xl": "text-4xl" };
var defaultTitleSize = { h1: "2xl", h2: "xl", h3: "lg", h4: "md", h5: "md", h6: "md" };
function Title4({ headingLevel: Tag = "h2", size, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(Tag, { className: chunkFTHFEMX6_cjs.cn("font-semibold text-fg", titleSize[size ?? defaultTitleSize[Tag]], className), ...props });
}
function Divider({ orientation = "horizontal", className, ...props }) {
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "separator", "aria-orientation": "vertical", className: chunkFTHFEMX6_cjs.cn("w-px shrink-0 self-stretch bg-line", className), ...props });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("hr", { className: chunkFTHFEMX6_cjs.cn("m-0 h-px w-full shrink-0 border-0 bg-line", className), ...props });
}
var gapClass = { none: "gap-0", xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" };
var spans = {
  base: "col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12".split(" "),
  sm: "sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12".split(" "),
  md: "md:col-span-1 md:col-span-2 md:col-span-3 md:col-span-4 md:col-span-5 md:col-span-6 md:col-span-7 md:col-span-8 md:col-span-9 md:col-span-10 md:col-span-11 md:col-span-12".split(" "),
  lg: "lg:col-span-1 lg:col-span-2 lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 lg:col-span-10 lg:col-span-11 lg:col-span-12".split(" "),
  xl: "xl:col-span-1 xl:col-span-2 xl:col-span-3 xl:col-span-4 xl:col-span-5 xl:col-span-6 xl:col-span-7 xl:col-span-8 xl:col-span-9 xl:col-span-10 xl:col-span-11 xl:col-span-12".split(" "),
  xxl: "2xl:col-span-1 2xl:col-span-2 2xl:col-span-3 2xl:col-span-4 2xl:col-span-5 2xl:col-span-6 2xl:col-span-7 2xl:col-span-8 2xl:col-span-9 2xl:col-span-10 2xl:col-span-11 2xl:col-span-12".split(" ")
};
var rowSpans = "row-span-1 row-span-2 row-span-3 row-span-4 row-span-5 row-span-6".split(" ");
function Grid({ gap = "md", className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("grid grid-cols-12", gapClass[gap], className), ...props });
}
function GridItem({ span = 12, sm, md, lg, xl, xxl, rowSpan, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: chunkFTHFEMX6_cjs.cn(
        "min-w-0",
        spans.base[span - 1],
        sm && spans.sm[sm - 1],
        md && spans.md[md - 1],
        lg && spans.lg[lg - 1],
        xl && spans.xl[xl - 1],
        xxl && spans.xxl[xxl - 1],
        rowSpan && rowSpans[rowSpan - 1],
        className
      ),
      ...props
    }
  );
}
var justify = { start: "justify-start", end: "justify-end", center: "justify-center", between: "justify-between", around: "justify-around", evenly: "justify-evenly" };
var align = { start: "items-start", end: "items-end", center: "items-center", stretch: "items-stretch", baseline: "items-baseline" };
var selfAlign = { start: "self-start", end: "self-end", center: "self-center", stretch: "self-stretch", baseline: "self-baseline" };
var direction = { row: "flex-row", column: "flex-col", "row-reverse": "flex-row-reverse", "column-reverse": "flex-col-reverse" };
function Flex({ direction: dir = "row", justify: j, align: a, gap = "sm", wrap = true, inline, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn(inline ? "inline-flex" : "flex", direction[dir], wrap ? "flex-wrap" : "flex-nowrap", j && justify[j], a && align[a], gapClass[gap], className), ...props });
}
function FlexItem({ grow, shrink = true, align: a, pushEnd, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("min-w-0", grow && "grow", !shrink && "shrink-0", a && selfAlign[a], pushEnd && "ms-auto", className), ...props });
}
function Stack({ gap = "md", className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("flex flex-col", gapClass[gap], className), ...props });
}
function StackItem({ fill, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn(fill && "flex-1", className), ...props });
}
var DlContext = React31__namespace.createContext({ layout: "vertical", compact: false });
var gridCols = { 1: "grid-cols-1", 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" };
function DescriptionList({ layout = "vertical", columns = 2, compact = false, className, ...props }) {
  const ctx = React31__namespace.useMemo(() => ({ layout, compact }), [layout, compact]);
  return /* @__PURE__ */ jsxRuntime.jsx(DlContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsx("dl", { className: chunkFTHFEMX6_cjs.cn("m-0 grid", compact ? "gap-x-4 gap-y-2" : "gap-x-6 gap-y-3.5", layout === "grid" ? gridCols[columns] : "grid-cols-1", className), ...props }) });
}
function DescriptionListGroup({ className, ...props }) {
  const { layout } = React31__namespace.useContext(DlContext);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("min-w-0", layout === "horizontal" && "grid grid-cols-[minmax(6rem,12rem)_1fr] gap-x-4", className), ...props });
}
function DescriptionListTerm({ icon, className, children, ...props }) {
  const { layout, compact } = React31__namespace.useContext(DlContext);
  return /* @__PURE__ */ jsxRuntime.jsxs("dt", { className: chunkFTHFEMX6_cjs.cn("flex items-center gap-1.5 text-[0.6875rem] tracking-wider text-subtle uppercase", layout !== "horizontal" && (compact ? "mb-0" : "mb-0.5"), className), ...props, children: [
    icon,
    children
  ] });
}
function DescriptionListDescription({ mono, className, ...props }) {
  const { compact } = React31__namespace.useContext(DlContext);
  return /* @__PURE__ */ jsxRuntime.jsx("dd", { className: chunkFTHFEMX6_cjs.cn("m-0 min-w-0 break-words text-fg", compact ? "text-xs" : "text-sm", mono && "font-mono break-all", className), ...props });
}
function nodeText(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (React31__namespace.isValidElement(node)) return nodeText(node.props.children);
  return "";
}
function CodeBlockCode({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
}
function CodeBlock({ code, children, language, lineNumbers, wrap, defaultWrap = false, onWrapChange, wrapToggle, maxHeight, copy = true, actions, label, className, labels }) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults8);
  const m = t.components.content.codeBlock;
  const text = code ?? nodeText(children);
  const [wrapped, setWrapped] = chunkS4QID4TP_cjs.useControllableState({ value: wrap, defaultValue: defaultWrap, onChange: onWrapChange });
  const lines = text.replace(/\n$/, "").split("\n");
  const hasHeader = !!language || copy || !!actions || wrapToggle;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("min-w-0 overflow-hidden rounded-md border border-line bg-input", className), children: [
    hasHeader && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1 border-b border-line ps-3 pe-1 py-0.5", children: [
      language && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs tracking-wider text-subtle uppercase", children: language }),
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ms-auto flex items-center gap-0.5", children: [
        wrapToggle && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", "aria-pressed": wrapped, onClick: () => setWrapped(!wrapped), children: labels?.wrap ?? m.wrap }),
        actions,
        copy && /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.CopyButton, { value: text, label: labels?.copy ?? m.copy, copiedLabel: labels?.copied ?? m.copied })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "pre",
      {
        tabIndex: 0,
        role: "region",
        "aria-label": label ?? language ?? m.label,
        style: maxHeight === void 0 ? void 0 : { maxBlockSize: maxHeight },
        className: chunkFTHFEMX6_cjs.cn("m-0 overflow-auto p-3 font-mono text-[0.8125rem] leading-relaxed text-fg [tab-size:4]", wrapped ? "break-words whitespace-pre-wrap" : "whitespace-pre"),
        children: /* @__PURE__ */ jsxRuntime.jsx("code", { children: lines.map((line, i) => /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            "data-n": i + 1,
            className: chunkFTHFEMX6_cjs.cn("block", lineNumbers && "before:me-4 before:inline-block before:w-[3ch] before:text-end before:text-subtle before:content-[attr(data-n)] before:select-none"),
            children: line === "" ? " " : line
          },
          i
        )) })
      }
    )
  ] });
}
function ClipboardCopy({
  value,
  defaultValue,
  children,
  onChange,
  variant = "inline",
  readOnly,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  onCopy,
  label,
  hoverTip,
  clickTip,
  className,
  labels
}) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults8);
  const m = t.components.content.clipboard;
  const [text, setText] = chunkS4QID4TP_cjs.useControllableState({ value, defaultValue: defaultValue ?? nodeText(children), onChange });
  const [open, setOpen] = chunkS4QID4TP_cjs.useControllableState({ value: expanded, defaultValue: defaultExpanded, onChange: onExpandedChange });
  const id = React31__namespace.useId();
  const copyProps = { value: text, label: hoverTip ?? m.copy, copiedLabel: clickTip ?? m.copied };
  const report = onCopy ? { onClickCapture: () => onCopy(text) } : {};
  if (variant === "inline-compact") {
    return /* @__PURE__ */ jsxRuntime.jsxs("span", { className: chunkFTHFEMX6_cjs.cn("inline-flex max-w-full items-center rounded-sm border border-line bg-muted-bg ps-1.5 align-middle", className), ...report, children: [
      /* @__PURE__ */ jsxRuntime.jsx("code", { className: "min-w-0 truncate font-mono text-xs", children: text }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.CopyButton, { ...copyProps })
    ] });
  }
  const fieldLabel = label ?? t.value;
  const expandable = variant === "expandable";
  const toggle = open ? labels?.collapse ?? m.collapse : labels?.expand ?? m.expand;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("min-w-0", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", ...report, children: [
      expandable && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", "aria-expanded": open, "aria-controls": `${id}-full`, "aria-label": toggle, onClick: () => setOpen(!open), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: chunkFTHFEMX6_cjs.cn("size-4 transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90"), "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Input, { readOnly, "aria-label": fieldLabel, value: expandable && open ? text.split("\n")[0] : text, onChange: (e) => setText(e.target.value), className: "min-w-0 flex-1 font-mono text-[0.8125rem]" }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.CopyButton, { ...copyProps })
    ] }),
    expandable && open && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Textarea, { id: `${id}-full`, readOnly, "aria-label": fieldLabel, value: text, rows: Math.min(12, text.split("\n").length + 1), onChange: (e) => setText(e.target.value), className: "mt-1 w-full font-mono text-[0.8125rem]" })
  ] });
}
function Form({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("form", { className: chunkFTHFEMX6_cjs.cn("grid gap-4", className), ...props });
}
function FormGroup({ label, fieldId, required, fieldset, labelInfo, className, children, labels }) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults8);
  const mark = required && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", className: "ms-0.5 text-danger", children: "*" }),
    " ",
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
      "(",
      labels?.required ?? t.components.content.form.required,
      ")"
    ] })
  ] });
  const head = label && (fieldset ? (
    // A legend must be a direct child of its fieldset to name it.
    /* @__PURE__ */ jsxRuntime.jsxs("legend", { className: "form-label flex w-full items-baseline justify-between gap-2 p-0", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
        label,
        mark
      ] }),
      labelInfo
    ] })
  ) : /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-baseline justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "form-label", htmlFor: fieldId, children: [
      label,
      mark
    ] }),
    labelInfo
  ] }));
  if (fieldset) {
    return /* @__PURE__ */ jsxRuntime.jsxs("fieldset", { className: chunkFTHFEMX6_cjs.cn("form-group m-0 min-w-0 border-0 p-0", className), children: [
      head,
      children
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("form-group", className), children: [
    head,
    children
  ] });
}
function ActionGroup({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("flex flex-wrap items-center gap-2.5 pt-2", className), ...props });
}
function HelperText({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("flex flex-col gap-0.5", className), ...props });
}
var helperTone = { default: "text-muted", success: "text-ok", warning: "text-warn", error: "text-danger" };
var helperIcon = { default: null, success: lucideReact.CheckCircle2, warning: lucideReact.TriangleAlert, error: lucideReact.AlertCircle };
function HelperTextItem({ variant = "default", icon, className, children, ...props }) {
  const Icon = helperIcon[variant];
  return /* @__PURE__ */ jsxRuntime.jsxs("p", { role: variant === "error" ? "alert" : void 0, className: chunkFTHFEMX6_cjs.cn("m-0 flex items-center gap-1.5 text-xs", helperTone[variant], className), ...props, children: [
    icon ?? (Icon && /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "size-3.5 shrink-0", "aria-hidden": true })),
    /* @__PURE__ */ jsxRuntime.jsx("span", { children })
  ] });
}
function FormHelperText({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("mt-1", className), ...props });
}
var MenuToggle = React31__namespace.forwardRef(function MenuToggle2({ variant = "default", hideCaret, expanded, children, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkIP6HZMS5_cjs.Button, { ref, type: "button", variant: variant === "primary" ? "primary" : variant === "plain" ? "ghost" : "secondary", "aria-expanded": expanded, ...props, children: [
    children,
    !hideCaret && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "size-4", "aria-hidden": true })
  ] });
});
function Dropdown({ toggle, open, defaultOpen, onOpenChange, align: align2 = "start", className, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenu, { open, defaultOpen, onOpenChange, children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuTrigger, { asChild: true, children: toggle }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuContent, { align: align2, className, children })
  ] });
}
function DropdownList({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
}
function DropdownGroup({ label, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-label": label, children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuLabel, { children: label }),
    children
  ] });
}
function DropdownItem({ icon, description, children, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenuItem, { ...props, children: [
    icon,
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "min-w-0 flex-1", children: [
      children,
      description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "block text-xs text-muted", children: description })
    ] })
  ] });
}
var DropdownSeparator = chunkGEJA4YGN_cjs.DropdownMenuSeparator;
var ModalContext = React31__namespace.createContext({ setHasDescription() {
} });
function Modal({ open, defaultOpen, onOpenChange, onClose, trigger, size = "md", "aria-label": ariaLabel, className, children }) {
  const { portalContainer } = chunkQQA4GJXV_cjs.useLaf();
  const [hasDescription, setHasDescription] = React31__namespace.useState(false);
  const ctx = React31__namespace.useMemo(() => ({ setHasDescription }), []);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    DialogPrimitive3__namespace.Root,
    {
      open,
      defaultOpen,
      onOpenChange: (o) => {
        onOpenChange?.(o);
        if (!o) onClose?.();
      },
      children: [
        trigger,
        /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive3__namespace.Portal, { container: portalContainer, children: [
          /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Overlay, { className: "fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            DialogPrimitive3__namespace.Content,
            {
              "aria-label": ariaLabel,
              ...hasDescription ? {} : { "aria-describedby": void 0 },
              className: chunkFTHFEMX6_cjs.cn(chunkGEJA4YGN_cjs.dialogBase, chunkGEJA4YGN_cjs.dialogSizes[size], className),
              children: /* @__PURE__ */ jsxRuntime.jsx(ModalContext.Provider, { value: ctx, children })
            }
          )
        ] })
      ]
    }
  );
}
var ModalTrigger = DialogPrimitive3__namespace.Trigger;
var ModalClose = DialogPrimitive3__namespace.Close;
function ModalHeader({ title, description, className, children }) {
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const { setHasDescription } = React31__namespace.useContext(ModalContext);
  const has = !!description;
  React31__namespace.useEffect(() => {
    setHasDescription(has);
    return () => setHasDescription(false);
  }, [has, setHasDescription]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("popup-head shrink-0", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Title, { className: "popup-title", children: title }),
      description && /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Description, { className: "popup-sub", children: description }),
      children
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive3__namespace.Close, { className: "popup-close", "aria-label": t.close, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-4", "aria-hidden": true }) })
  ] });
}
function ModalBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("popup-body min-h-0 overflow-auto", className), ...props });
}
function ModalFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("popup-foot shrink-0", className), ...props });
}
var lafDefaults9 = { ui: chunkGEJA4YGN_cjs.uiEn };
function useAppFrameLabels(labels) {
  const ui = chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults9).t.components.ui.appFrame;
  return React31__namespace.useMemo(() => ({ ...ui, ...labels }), [ui, labels]);
}
var NARROW_QUERY = "(max-width: 859px)";
function useMediaQuery(query) {
  return React31__namespace.useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {
      };
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => typeof window !== "undefined" && !!window.matchMedia ? window.matchMedia(query).matches : false,
    () => false
  );
}
function readStored2(key) {
  if (!key || typeof localStorage === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStored(key, value) {
  if (!key || typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}
var noop = () => {
};
var AppFrameContext = React31__namespace.createContext({
  active: false,
  isMobile: false,
  sidebarOpen: true,
  setSidebarOpen: noop,
  toggleSidebar: noop,
  rail: false,
  sidebarId: "",
  mainId: "",
  navigated: noop
});
function useAppFrame() {
  return React31__namespace.useContext(AppFrameContext);
}
var placementOf = (p) => p === "left" || p === "start" ? "start" : p === "bottom" ? "bottom" : "end";
function AppFrame({
  masthead,
  sidebar,
  breadcrumb,
  pageHeader,
  footer,
  drawer,
  drawerPlacement,
  sidebarOpen,
  defaultSidebarOpen = true,
  onSidebarOpenChange,
  sidebarCollapse = "hide",
  persistKey,
  mainId: mainIdProp,
  labels,
  className,
  children
}) {
  const l = useAppFrameLabels(labels);
  const uid = React31__namespace.useId();
  const mainId = mainIdProp ?? `${uid}-main`;
  const sidebarId = `${uid}-sidebar`;
  const isMobile = useMediaQuery(NARROW_QUERY);
  const storageKey2 = persistKey ? `${persistKey}:sidebar` : void 0;
  const [initialOpen] = React31__namespace.useState(() => {
    const stored = readStored2(storageKey2);
    return stored === null ? defaultSidebarOpen : stored === "1";
  });
  const [desktopOpen, setDesktopOpenRaw] = chunkS4QID4TP_cjs.useControllableState({ value: sidebarOpen, defaultValue: initialOpen, onChange: onSidebarOpenChange });
  const setDesktopOpen = React31__namespace.useCallback(
    (open2) => {
      setDesktopOpenRaw(open2);
      writeStored(storageKey2, open2 ? "1" : "0");
    },
    [setDesktopOpenRaw, storageKey2]
  );
  const [mobileOpen, setMobileOpen] = React31__namespace.useState(false);
  React31__namespace.useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);
  const sidebarRef = React31__namespace.useRef(null);
  React31__namespace.useEffect(() => {
    if (!isMobile || !mobileOpen) return;
    const opener = document.activeElement;
    sidebarRef.current?.querySelector('[tabindex="0"], a[href], button:not([disabled])')?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [isMobile, mobileOpen]);
  const open = isMobile ? mobileOpen : desktopOpen;
  const rail = !isMobile && sidebarCollapse === "rail" && !desktopOpen;
  const setOpen = React31__namespace.useCallback((o) => isMobile ? setMobileOpen(o) : setDesktopOpen(o), [isMobile, setDesktopOpen]);
  const ctx = React31__namespace.useMemo(
    () => ({
      active: true,
      isMobile,
      sidebarOpen: open,
      setSidebarOpen: setOpen,
      toggleSidebar: () => setOpen(!open),
      rail,
      sidebarId,
      mainId,
      navigated: () => setMobileOpen(false)
    }),
    [isMobile, open, setOpen, rail, sidebarId, mainId]
  );
  const placement = placementOf(drawerPlacement ?? (React31__namespace.isValidElement(drawer) ? drawer.props.placement : void 0));
  const sidebarVisible = isMobile ? mobileOpen : desktopOpen || sidebarCollapse === "rail";
  return /* @__PURE__ */ jsxRuntime.jsx(AppFrameContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("relative flex h-dvh min-h-0 flex-col overflow-hidden", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        href: `#${mainId}`,
        onClick: (e) => {
          e.preventDefault();
          document.getElementById(mainId)?.focus();
        },
        className: "sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:z-50 focus:rounded-md focus:border focus:border-line-strong focus:bg-menu focus:px-3 focus:py-2 focus:text-fg focus:ring-2 focus:ring-primary",
        children: l.skipToContent
      }
    ),
    masthead && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "sticky top-0 z-30 shrink-0", children: masthead }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative flex min-h-0 flex-1", children: [
      sidebar && isMobile && mobileOpen && /* @__PURE__ */ jsxRuntime.jsx("div", { "aria-hidden": true, className: "absolute inset-0 z-30 bg-[rgba(5,5,10,0.7)]", onClick: () => setMobileOpen(false) }),
      sidebar && /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref: sidebarRef,
          id: sidebarId,
          "data-sidebar": isMobile ? "overlay" : rail ? "rail" : desktopOpen ? "open" : "closed",
          className: chunkFTHFEMX6_cjs.cn(
            "z-40 flex min-h-0 shrink-0 flex-col border-e border-line bg-[rgba(12,12,16,0.72)] backdrop-blur-md transition-[width] motion-reduce:transition-none",
            isMobile ? "absolute inset-y-0 start-0 w-72 max-w-[85%]" : rail ? "w-14" : "w-64",
            !sidebarVisible && "hidden"
          ),
          children: sidebar
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("relative flex min-h-0 min-w-0 flex-1", placement === "bottom" && "flex-col"), children: [
        placement === "start" && drawer,
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto", children: [
          breadcrumb && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "shrink-0 px-6 pt-4 max-[859px]:px-4", children: breadcrumb }),
          /* @__PURE__ */ jsxRuntime.jsxs("main", { id: mainId, tabIndex: -1, className: "min-w-0 flex-1 outline-none", children: [
            pageHeader,
            children
          ] }),
          footer
        ] }),
        placement !== "start" && drawer
      ] }) })
    ] })
  ] }) });
}
function Masthead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("header", { className: chunkFTHFEMX6_cjs.cn("flex h-14 w-full items-center gap-3 border-b border-line bg-[rgba(12,12,16,0.72)] px-3 backdrop-blur-md", className), ...props });
}
function MastheadToggle({ className, onClick, labels, ...props }) {
  const l = useAppFrameLabels(labels);
  const f = useAppFrame();
  const name = f.isMobile ? f.sidebarOpen ? l.closeNavigation : l.openNavigation : f.sidebarOpen ? l.collapseSidebar : l.expandSidebar;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      "aria-label": name,
      "aria-expanded": f.active ? f.sidebarOpen : void 0,
      "aria-controls": f.active && f.sidebarId ? f.sidebarId : void 0,
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) f.toggleSidebar();
      },
      className: chunkFTHFEMX6_cjs.cn("btn btn-ghost btn-sm auto shrink-0", className),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Menu, { "aria-hidden": true })
    }
  );
}
function MastheadBrand({ logo, title, subtitle, href, onClick, render, className }) {
  const cls = chunkFTHFEMX6_cjs.cn("flex min-w-0 items-center gap-3 text-fg no-underline", (href || onClick || render) && "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary/50", className);
  const children = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    logo && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex shrink-0 items-center [&>svg]:size-8", children: logo }),
    (title || subtitle) && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex min-w-0 flex-col leading-tight", children: [
      title && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate text-lg font-bold tracking-tight", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate text-xs text-muted max-[480px]:hidden", children: subtitle })
    ] })
  ] });
  if (render) return render({ className: cls, children, href, onClick });
  if (href) {
    return /* @__PURE__ */ jsxRuntime.jsx("a", { href, onClick, className: cls, children });
  }
  if (onClick) {
    return /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", onClick, className: chunkFTHFEMX6_cjs.cn(cls, "border-0 bg-transparent p-0 text-start"), children });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cls, children });
}
function MastheadContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("flex min-w-0 flex-1 items-center gap-3", className), ...props });
}
function MastheadActions({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("ms-auto flex shrink-0 items-center gap-1", className), ...props });
}
var DARK_QUERY = "(prefers-color-scheme: dark)";
var modeIcon = { light: lucideReact.Sun, dark: lucideReact.Moon, system: lucideReact.Monitor };
var modes = ["light", "dark", "system"];
function ThemeToggle({ value, defaultValue = "system", onChange, onResolvedChange, persistKey, apply = true, variant = "menu", labels, className }) {
  const l = useAppFrameLabels(labels);
  const [initial] = React31__namespace.useState(() => {
    const s = readStored2(persistKey);
    return s === "light" || s === "dark" || s === "system" ? s : defaultValue;
  });
  const [mode, setMode] = chunkS4QID4TP_cjs.useControllableState({ value, defaultValue: initial, onChange });
  const systemDark = useMediaQuery(DARK_QUERY);
  const resolved = mode === "system" ? systemDark ? "dark" : "light" : mode;
  const onResolved = React31__namespace.useRef(onResolvedChange);
  onResolved.current = onResolvedChange;
  React31__namespace.useEffect(() => {
    if (typeof apply === "function") apply(resolved);
    else if (apply) document.documentElement.dataset.theme = resolved;
    onResolved.current?.(resolved);
  }, [resolved, apply]);
  const choose = (m) => {
    setMode(m);
    writeStored(persistKey, m);
  };
  const names = { light: l.themeLight, dark: l.themeDark, system: l.themeSystem };
  const Icon = modeIcon[mode];
  if (variant === "segmented") {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "group", "aria-label": l.theme, className: chunkFTHFEMX6_cjs.cn("inline-flex rounded-md border border-line", className), children: modes.map((m) => {
      const I = modeIcon[m];
      return /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          "aria-pressed": mode === m,
          "aria-label": names[m],
          onClick: () => choose(m),
          className: "inline-flex items-center px-2.5 py-1.5 text-muted outline-none first:rounded-s-md last:rounded-e-md hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50 aria-pressed:bg-primary-light aria-pressed:text-primary",
          children: /* @__PURE__ */ jsxRuntime.jsx(I, { "aria-hidden": true, className: "size-4" })
        },
        m
      );
    }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-label": l.themeCurrent(names[mode]), className: chunkFTHFEMX6_cjs.cn("btn btn-ghost btn-sm auto", className), children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { "aria-hidden": true }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.DropdownMenuContent, { children: /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.RadioGroup, { value: mode, onValueChange: (v) => choose(v), children: modes.map((m) => {
      const I = modeIcon[m];
      return /* @__PURE__ */ jsxRuntime.jsxs(DropdownPrimitive__namespace.RadioItem, { value: m, className: "dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg data-[state=checked]:text-fg", children: [
        /* @__PURE__ */ jsxRuntime.jsx(I, { "aria-hidden": true, className: "size-4" }),
        names[m],
        /* @__PURE__ */ jsxRuntime.jsx(DropdownPrimitive__namespace.ItemIndicator, { className: "ms-auto text-primary", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { "aria-hidden": true, className: "size-4" }) })
      ] }, m);
    }) }) })
  ] });
}
function FooterAnchor({ link, hint }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "a",
    {
      href: link.href,
      onClick: link.onClick,
      ...link.external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      className: "inline-flex items-center gap-1 rounded-sm text-muted no-underline outline-none hover:text-fg hover:underline focus-visible:ring-2 focus-visible:ring-primary/50",
      children: [
        link.label,
        link.external && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ExternalLink, { "aria-hidden": true, className: "size-3" }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
            "(",
            hint,
            ")"
          ] })
        ] })
      ]
    }
  );
}
function AppFooter({ start, center, end, copyright, version, build, links, linkGroups, status, variant = "default", labels, className }) {
  const l = useAppFrameLabels(labels);
  const uid = React31__namespace.useId();
  const b = typeof build === "string" ? { commit: build } : build;
  const buildText = b && [b.env, b.commit, b.date].filter(Boolean).join(" \xB7 ");
  const compact = variant === "compact";
  const startItems = (copyright || version || buildText || start) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1", children: [
    copyright && /* @__PURE__ */ jsxRuntime.jsx("span", { children: copyright }),
    version && /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
      l.version,
      " ",
      version
    ] }),
    buildText && /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
      l.build,
      " ",
      buildText
    ] }),
    start
  ] });
  const centerItems = (variant !== "columns" && links?.length || center) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-4 gap-y-1", children: [
    variant !== "columns" && links && links.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-1 p-0", children: links.map((k, i) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(FooterAnchor, { link: k, hint: l.opensInNewTab }) }, `${i}-${k.label}`)) }),
    center
  ] });
  const endItems = (status || end) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center justify-end gap-x-4 gap-y-1", children: [
    status && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.StatusDot, { tone: status.tone, pulse: status.pulse, label: status.label, className: "text-[inherit]" }),
    end
  ] });
  return /* @__PURE__ */ jsxRuntime.jsxs("footer", { className: chunkFTHFEMX6_cjs.cn("shrink-0 border-t border-line bg-[rgba(12,12,16,0.72)] text-muted backdrop-blur-md", compact ? "text-[0.8125rem]" : "text-sm", className), children: [
    variant === "columns" && linkGroups && linkGroups.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-6 border-b border-line px-6 py-6 max-[859px]:px-4", children: linkGroups.map((g, gi) => /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { id: `${uid}-${gi}`, className: "mb-2 text-[0.6875rem] font-semibold tracking-wider text-subtle uppercase", children: g.title }),
      /* @__PURE__ */ jsxRuntime.jsx("ul", { "aria-labelledby": `${uid}-${gi}`, className: "m-0 grid list-none gap-1.5 p-0", children: g.links.map((k, i) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(FooterAnchor, { link: k, hint: l.opensInNewTab }) }, `${i}-${k.label}`)) })
    ] }, `${gi}-${g.title}`)) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 max-[859px]:px-4", compact ? "py-2" : "py-3"), children: [
      startItems,
      centerItems,
      endItems
    ] })
  ] });
}
function PageHeader({ breadcrumb, icon, title, subtitle, badges, actions, help, headingLevel = 1, labels, className }) {
  const l = useAppFrameLabels(labels);
  const Heading = `h${headingLevel}`;
  const crumbs = Array.isArray(breadcrumb) ? /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Breadcrumb, { items: breadcrumb }) : breadcrumb;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex flex-col gap-3 px-6 pt-6 pb-4 max-[859px]:px-4", className), children: [
    crumbs && /* @__PURE__ */ jsxRuntime.jsx("div", { children: crumbs }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-start gap-x-4 gap-y-3", children: [
      icon && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "flex shrink-0 text-primary [&>svg]:size-8", children: icon }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1 basis-64", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Heading, { className: "min-w-0 text-2xl font-semibold tracking-tight text-fg", children: title }),
          badges
        ] }),
        subtitle && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-1 max-w-3xl text-sm text-muted", children: subtitle })
      ] }),
      (actions || help) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex shrink-0 flex-wrap items-center gap-2.5", children: [
        help && /* @__PURE__ */ jsxRuntime.jsx("a", { href: help.href, onClick: help.onClick, className: "text-sm text-muted hover:text-fg", children: help.label ?? l.help }),
        actions
      ] })
    ] })
  ] });
}
var sectionPad = { none: "", sm: "px-4 py-2", md: "px-6 py-4 max-[859px]:px-4", lg: "px-8 py-8 max-[859px]:px-4 max-[859px]:py-6" };
function PageSection({ padding = "md", filled, sticky, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "section",
    {
      className: chunkFTHFEMX6_cjs.cn(
        sectionPad[padding],
        filled && "border-y border-line bg-surface",
        sticky && "z-10 backdrop-blur-md",
        sticky === "top" && "sticky top-0",
        sticky === "bottom" && "sticky bottom-0",
        sticky && !filled && "bg-[rgba(12,12,16,0.72)]",
        className
      ),
      ...props
    }
  );
}
var isItem = (e) => !e.type || e.type === "item";
var textOf2 = (it) => it.textValue ?? (typeof it.label === "string" ? it.label : it.id);
var isGroup = (it) => !!it.children?.some(isItem);
var safeId = (s) => s.replace(/\s+/g, "_");
function visibleRows(entries, expanded, rail, parent, out = []) {
  for (const e of entries) {
    if (!isItem(e)) continue;
    if (!e.disabled) out.push({ item: e, parent });
    if (!rail && isGroup(e) && expanded.has(e.id)) visibleRows(e.children, expanded, rail, e, out);
  }
  return out;
}
function ancestorsOf(entries, id, path = []) {
  for (const e of entries) {
    if (!isItem(e)) continue;
    if (e.id === id) return path;
    const found = e.children && ancestorsOf(e.children, id, [...path, e.id]);
    if (found) return found;
  }
  return null;
}
function currentOf(entries, current) {
  for (const e of entries) {
    if (!isItem(e)) continue;
    if (e.current) return e.id;
    const c = e.children && currentOf(e.children);
    if (c) return c;
  }
  return current;
}
var rowCls = "flex w-full min-w-0 items-center gap-2.5 rounded-md px-2.5 py-2 text-start text-sm font-medium text-muted no-underline outline-none transition hover:bg-surface-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50 aria-[current=page]:bg-primary-light aria-[current=page]:text-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[within=true]:text-fg";
function NavTree({ items, label, current, onSelect, expanded: expandedProp, defaultExpanded, onExpandedChange, collapsed, labels, className }) {
  const l = useAppFrameLabels(labels);
  const frame = useAppFrame();
  const rail = collapsed ?? frame.rail;
  const uid = React31__namespace.useId();
  const currentId = currentOf(items, current);
  const [expandedIds, setExpanded] = chunkS4QID4TP_cjs.useControllableState({
    value: expandedProp,
    defaultValue: defaultExpanded ?? (currentId ? ancestorsOf(items, currentId) ?? [] : []),
    onChange: onExpandedChange
  });
  const expanded = React31__namespace.useMemo(() => new Set(expandedIds), [expandedIds]);
  const [activeId, setActiveId] = React31__namespace.useState();
  const rows = visibleRows(items, expanded, rail);
  const active = rows.find((r) => r.item.id === activeId)?.item.id ?? rows.find((r) => r.item.id === currentId)?.item.id ?? rows[0]?.item.id;
  const rootRef = React31__namespace.useRef(null);
  const typed = React31__namespace.useRef({ text: "", timer: 0 });
  React31__namespace.useEffect(() => () => clearTimeout(typed.current.timer), []);
  const focusRow = (id) => {
    setActiveId(id);
    [...rootRef.current?.querySelectorAll("[data-nav-id]") ?? []].find((el) => el.dataset.navId === id)?.focus();
  };
  const setOpen = (id, open) => setExpanded((prev) => open ? prev.includes(id) ? prev : [...prev, id] : prev.filter((x) => x !== id));
  const onKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const id = e.target.closest("[data-nav-id]")?.dataset.navId;
    const i = rows.findIndex((r) => r.item.id === id);
    if (i < 0) return;
    const row = rows[i];
    const go = (n) => {
      const r = rows[n];
      if (r) focusRow(r.item.id);
    };
    switch (e.key) {
      case "ArrowDown":
        go(i + 1);
        break;
      case "ArrowUp":
        go(i - 1);
        break;
      case "Home":
        go(0);
        break;
      case "End":
        go(rows.length - 1);
        break;
      case "ArrowRight":
      case "ArrowLeft": {
        const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
        const forward = e.key === "ArrowRight" !== rtl;
        if (forward) {
          if (!isGroup(row.item) || rail) return;
          if (!expanded.has(row.item.id)) setOpen(row.item.id, true);
          else go(i + 1);
        } else if (isGroup(row.item) && expanded.has(row.item.id) && !rail) setOpen(row.item.id, false);
        else if (row.parent) focusRow(row.parent.id);
        else return;
        break;
      }
      default: {
        if (e.key.length !== 1 || e.key === " " && !typed.current.text) return;
        clearTimeout(typed.current.timer);
        typed.current.text += e.key.toLowerCase();
        typed.current.timer = setTimeout(() => typed.current.text = "", 500);
        const q = typed.current.text;
        const from = q.length === 1 ? i + 1 : i;
        const hit = [...rows.slice(from), ...rows.slice(0, from)].find((r) => textOf2(r.item).toLowerCase().startsWith(q));
        if (!hit) return;
        focusRow(hit.item.id);
      }
    }
    e.preventDefault();
  };
  const activate = (it, e) => {
    if (it.disabled) {
      e.preventDefault();
      return;
    }
    if (isGroup(it)) {
      if (rail) {
        frame.setSidebarOpen(true);
        setOpen(it.id, true);
      } else setOpen(it.id, !expanded.has(it.id));
      return;
    }
    it.onSelect?.(it.id);
    onSelect?.(it.id, it);
    if (it.href && !it.render && (it.onSelect || onSelect) && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) e.preventDefault();
    frame.navigated();
  };
  const renderItem = (it) => {
    const group = isGroup(it);
    const open = group && expanded.has(it.id);
    const isCurrent = !group && (it.current ?? it.id === current);
    const within = group && currentId !== void 0 && !open && !!ancestorsOf(items, currentId)?.includes(it.id);
    const text = textOf2(it);
    const childId = `${uid}-c-${safeId(it.id)}`;
    const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      it.icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "flex shrink-0 [&>svg]:size-4", children: it.icon }) : rail && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "flex size-4 shrink-0 items-center justify-center text-xs font-semibold uppercase", children: text.charAt(0) }),
      !rail && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.TruncatedText, { className: "flex-1", children: it.label }),
        it.badge && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-auto shrink-0", children: it.badge }),
        group && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn("size-4 shrink-0 transition-transform motion-reduce:transition-none", open && "rotate-180") })
      ] })
    ] });
    const props = {
      "data-nav-id": it.id,
      "data-nav-text": text.toLowerCase(),
      tabIndex: it.id === active ? 0 : -1,
      className: chunkFTHFEMX6_cjs.cn(rowCls, rail && "justify-center px-0"),
      onClick: (e) => activate(it, e),
      children: content,
      ...it.disabled ? { "aria-disabled": true } : {},
      ...isCurrent ? { "aria-current": "page" } : {},
      ...rail ? { "aria-label": text } : {}
    };
    let el;
    if (group) {
      el = /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-expanded": open, "aria-controls": childId, "data-within": within, ...props });
    } else if (it.render) el = it.render({ ...props, href: it.disabled ? void 0 : it.href });
    else if (it.href && !it.disabled) el = /* @__PURE__ */ jsxRuntime.jsx("a", { href: it.href, ...props });
    else el = /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", ...props });
    if (rail) {
      el = /* @__PURE__ */ jsxRuntime.jsx(
        chunkGEJA4YGN_cjs.Tooltip,
        {
          side: "right",
          content: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2", children: [
            it.label,
            it.badge
          ] }),
          children: el
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
      el,
      group && !rail && /* @__PURE__ */ jsxRuntime.jsx("div", { id: childId, hidden: !open, className: "ms-4 border-s border-line ps-1", children: renderEntries(it.children, safeId(it.id)) })
    ] }, it.id);
  };
  const renderEntries = (entries, scope) => {
    const sections = [{ key: "first", items: [] }];
    entries.forEach((e, n) => {
      if (isItem(e)) sections[sections.length - 1].items.push(e);
      else if (e.type === "heading") sections.push({ key: `h-${e.id}`, heading: e, items: [] });
      else sections.push({ key: `d-${e.id ?? n}`, divider: true, items: [] });
    });
    return sections.filter((s) => s.items.length > 0 || s.heading && !rail).map((s) => {
      const hid = s.heading ? `${uid}-${scope}-${safeId(s.heading.id)}` : void 0;
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn(s.divider && "mt-2 border-t border-line pt-2"), children: [
        s.heading && !rail && /* @__PURE__ */ jsxRuntime.jsx("div", { id: hid, className: "nav-group", children: s.heading.label }),
        s.items.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("ul", { "aria-labelledby": s.heading && !rail ? hid : void 0, className: "m-0 grid list-none gap-0.5 p-0", children: s.items.map(renderItem) })
      ] }, s.key);
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.TooltipProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(
    "nav",
    {
      ref: rootRef,
      "aria-label": label ?? l.mainNavigation,
      onKeyDown,
      onFocus: (e) => {
        const id = e.target.closest("[data-nav-id]")?.dataset.navId;
        if (id) setActiveId(id);
      },
      className: chunkFTHFEMX6_cjs.cn("min-w-0", className),
      children: renderEntries(items, "root")
    }
  ) });
}
function hasChildren(nodes, id) {
  for (const n of nodes) {
    if (n.id === id) return !!n.children?.length || !!n.hasChildren;
    if (n.children && hasChildren(n.children, id)) return true;
  }
  return false;
}
function Sidebar({ items, tree, mode: modeProp, defaultMode, onModeChange, header, footer, railFooter, collapsed, labels, className, ...nav }) {
  const l = useAppFrameLabels(labels);
  const frame = useAppFrame();
  const rail = collapsed ?? frame.rail;
  const [mode, setMode] = chunkS4QID4TP_cjs.useControllableState({ value: modeProp, defaultValue: defaultMode ?? (items ? "nav" : "tree"), onChange: onModeChange });
  const both = !!items && !!tree;
  const shown = items && (mode === "nav" || !tree || rail) ? "nav" : tree && !rail ? "tree" : void 0;
  const switchBtn = (m, text) => /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      "aria-pressed": mode === m,
      onClick: () => setMode(m),
      className: "flex-1 rounded-sm px-2 py-1 text-[0.8125rem] font-semibold text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50 aria-pressed:bg-primary-light aria-pressed:text-primary",
      children: text
    }
  );
  const foot = rail ? railFooter : footer;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex min-h-0 flex-1 flex-col", className), children: [
    header && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "shrink-0 border-b border-line p-3", children: header }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("min-h-0 flex-1 overflow-y-auto", rail ? "p-2" : "p-3"), children: [
      both && !rail && /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-label": l.sidebarView, className: "mb-3 flex gap-1 rounded-md border border-line p-0.5", children: [
        switchBtn("nav", l.navigationView),
        switchBtn("tree", l.treeView)
      ] }),
      shown === "nav" && items && /* @__PURE__ */ jsxRuntime.jsx(NavTree, { items, collapsed: rail, labels, ...nav }),
      shown === "tree" && tree && /* @__PURE__ */ jsxRuntime.jsx("nav", { "aria-label": tree.label, children: /* @__PURE__ */ jsxRuntime.jsx(
        chunkPNRO35YW_cjs.TreeView,
        {
          ...tree,
          onSelect: (id) => {
            tree.onSelect?.(id);
            if (!hasChildren(tree.nodes, id)) frame.navigated();
          }
        }
      ) })
    ] }),
    foot && /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("shrink-0 border-t border-line text-sm text-muted", rail ? "flex justify-center p-2" : "p-4"), children: foot })
  ] });
}
var STEP = 16;
var STEP_LARGE = 64;
function DrawerPanel({
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  placement: placementProp = "end",
  mode = "push",
  title,
  icon,
  actions,
  footer,
  size: sizeProp,
  defaultSize = 360,
  onSizeChange,
  minSize = 240,
  maxSize = 640,
  resizable,
  collapsible,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  closable = true,
  manageFocus,
  labels,
  className,
  children
}) {
  const l = useAppFrameLabels(labels);
  const placement = placementProp === "left" ? "start" : placementProp === "right" ? "end" : placementProp;
  const bottom = placement === "bottom";
  const narrow = useMediaQuery(NARROW_QUERY);
  const overlay = mode === "overlay" || narrow;
  const [open, setOpen] = chunkS4QID4TP_cjs.useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const [collapsed, setCollapsed] = chunkS4QID4TP_cjs.useControllableState({ value: collapsedProp, defaultValue: defaultCollapsed, onChange: onCollapsedChange });
  const [size, setSize] = chunkS4QID4TP_cjs.useControllableState({ value: sizeProp, defaultValue: defaultSize, onChange: onSizeChange });
  const clamp = (n) => Math.min(maxSize, Math.max(minSize, n));
  const titleId = React31__namespace.useId();
  const ref = React31__namespace.useRef(null);
  const wasOpen = React31__namespace.useRef(open);
  const opener = React31__namespace.useRef(null);
  React31__namespace.useEffect(() => {
    if (!manageFocus) return;
    if (open && !wasOpen.current) {
      opener.current = document.activeElement;
      ref.current?.focus();
    } else if (!open && wasOpen.current) {
      opener.current?.focus?.();
    }
    wasOpen.current = open;
  }, [open, manageFocus]);
  const drag = React31__namespace.useRef(null);
  const isRtl = () => !!ref.current && getComputedStyle(ref.current).direction === "rtl";
  const grow = (dx, dy) => {
    if (bottom) return -dy;
    const towardStart = isRtl() ? dx : -dx;
    return placement === "end" ? towardStart : -towardStart;
  };
  const onKeyDown = (e) => {
    const step = e.shiftKey ? STEP_LARGE : STEP;
    const outward = bottom ? "ArrowUp" : placement === "end" !== isRtl() ? "ArrowLeft" : "ArrowRight";
    const inward = bottom ? "ArrowDown" : outward === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
    if (e.key === outward) setSize(clamp(size + step));
    else if (e.key === inward) setSize(clamp(size - step));
    else if (e.key === "Home") setSize(minSize);
    else if (e.key === "End") setSize(maxSize);
    else return;
    e.preventDefault();
  };
  if (!open) return null;
  const CollapseIcon = bottom ? collapsed ? lucideReact.ChevronsUp : lucideReact.ChevronsDown : placement === "end" !== !!collapsed ? lucideReact.ChevronsRight : lucideReact.ChevronsLeft;
  const toggle = collapsible && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", onClick: () => setCollapsed(!collapsed), "aria-expanded": !collapsed, "aria-label": collapsed ? l.expandPanel : l.collapsePanel, className: "popup-close", children: /* @__PURE__ */ jsxRuntime.jsx(CollapseIcon, { "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn("size-4", !bottom && "rtl:rotate-180") }) });
  const edge = bottom ? "border-t" : placement === "end" ? "border-s" : "border-e";
  const where = bottom ? "inset-x-0 bottom-0" : placement === "end" ? "inset-y-0 end-0" : "inset-y-0 start-0";
  const surface = overlay ? "bg-menu shadow-[0_16px_32px_rgba(0,0,0,0.5)]" : "bg-[rgba(12,12,16,0.72)] backdrop-blur-md";
  const base = chunkFTHFEMX6_cjs.cn("flex min-h-0 min-w-0 shrink-0 flex-col border-line-strong outline-none", edge, surface, overlay ? chunkFTHFEMX6_cjs.cn("absolute z-20", where) : "relative", placement === "start" && "order-first");
  if (collapsed) {
    return /* @__PURE__ */ jsxRuntime.jsxs("aside", { ref, tabIndex: -1, "aria-label": title, className: chunkFTHFEMX6_cjs.cn(base, bottom ? "h-10 flex-row items-center gap-2 px-3" : "w-10 items-center py-2", className), children: [
      toggle,
      bottom && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate text-sm text-muted", children: title })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "aside",
    {
      ref,
      tabIndex: -1,
      "aria-labelledby": titleId,
      "data-placement": placement,
      style: { "--drawer-size": `${clamp(size)}px` },
      onKeyDown: (e) => {
        if (manageFocus && closable && e.key === "Escape" && !e.defaultPrevented) setOpen(false);
      },
      className: chunkFTHFEMX6_cjs.cn(base, bottom ? "h-(--drawer-size) max-h-full w-full" : "w-(--drawer-size) max-w-full", className),
      children: [
        resizable && /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            role: "separator",
            tabIndex: 0,
            "aria-orientation": bottom ? "horizontal" : "vertical",
            "aria-label": l.resizePanel,
            "aria-valuemin": minSize,
            "aria-valuemax": maxSize,
            "aria-valuenow": clamp(size),
            onKeyDown,
            onPointerDown: (e) => {
              e.currentTarget.setPointerCapture?.(e.pointerId);
              drag.current = { x: e.clientX, y: e.clientY, size: clamp(size) };
            },
            onPointerMove: (e) => {
              const d = drag.current;
              if (d) setSize(clamp(d.size + grow(e.clientX - d.x, e.clientY - d.y)));
            },
            onPointerUp: () => drag.current = null,
            onPointerCancel: () => drag.current = null,
            className: chunkFTHFEMX6_cjs.cn(
              "absolute z-10 touch-none outline-none hover:bg-primary-light focus-visible:bg-primary-light focus-visible:ring-2 focus-visible:ring-primary/50",
              bottom ? "inset-x-0 -top-1 h-2 cursor-row-resize" : chunkFTHFEMX6_cjs.cn("inset-y-0 w-2 cursor-col-resize", placement === "end" ? "-start-1" : "-end-1")
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex shrink-0 items-center gap-2 border-b border-line px-4 py-3", children: [
          icon && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "flex shrink-0 text-muted", children: icon }),
          /* @__PURE__ */ jsxRuntime.jsx("h2", { id: titleId, className: "min-w-0 flex-1 truncate text-base font-semibold text-fg", children: title }),
          actions,
          toggle,
          closable && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", onClick: () => setOpen(false), "aria-label": l.closePanel, className: "popup-close", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { "aria-hidden": true, className: "size-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-0 flex-1 overflow-auto px-4 py-3 text-sm text-muted", children }),
        footer && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex shrink-0 justify-end gap-2.5 border-t border-line px-4 py-3", children: footer })
      ]
    }
  );
}
var InlineDrawer = DrawerPanel;
var lafDefaults10 = { dashboard: chunkGEJA4YGN_cjs.dashboardEn };
var useLaf5 = () => chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults10);
function ErrorBlock({ message, onRetry }) {
  const { t } = useLaf5();
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "alert", className: "flex flex-wrap items-center gap-2 text-sm text-danger", children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0", children: message }),
    onRetry && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", onClick: onRetry, children: t.components.dashboard.metric.retry })
  ] });
}
function Delta({ delta, goodWhen, period }) {
  const { t, format: format2 } = useLaf5();
  const d = typeof delta === "number" ? { value: delta } : delta;
  const trend = d.trend ?? (d.value > 0 ? "up" : d.value < 0 ? "down" : "neutral");
  const text = d.text ?? `${d.value > 0 ? "+" : ""}${format2.percent(d.value / 100, { fractionDigits: 1 })}`;
  const good = trend === "neutral" ? void 0 : trend === goodWhen;
  const m = t.components.dashboard.metric;
  const Icon = trend === "up" ? lucideReact.ArrowUp : trend === "down" ? lucideReact.ArrowDown : lucideReact.Minus;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-x-1.5 text-xs", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("span", { "data-trend": trend, "data-good": good === void 0 ? void 0 : String(good), className: chunkFTHFEMX6_cjs.cn("inline-flex items-center gap-0.5 font-medium", good === void 0 ? "text-muted" : good ? "text-ok" : "text-danger"), children: [
      /* @__PURE__ */ jsxRuntime.jsx(Icon, { "aria-hidden": true, className: "size-3.5" }),
      text,
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
        trend === "up" ? m.increase(text) : trend === "down" ? m.decrease(text) : m.unchanged,
        good !== void 0 && `, ${good ? m.good : m.bad}`
      ] })
    ] }),
    period && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted", children: period })
  ] });
}
function MetricCard({ label, value, unit, delta, goodWhen = "up", period, icon, sparkline, loading, error, onRetry, className, ...rest }) {
  const { t } = useLaf5();
  const id = React31__namespace.useId();
  const m = t.components.dashboard.metric;
  const interactive2 = !!rest.href || !!rest.onClick;
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Card, { variant: "default", compact: true, ...rest, loading: false, "aria-busy": loading || void 0, ...interactive2 ? {} : { role: "group", "aria-labelledby": id }, className: chunkFTHFEMX6_cjs.cn("gap-1.5", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted", children: [
      icon && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "inline-flex shrink-0 [&_svg]:size-4", children: icon }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { id, className: "min-w-0 truncate", children: label })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "status", "aria-label": m.loading, className: "grid gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, { className: "h-7 w-24" }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, { className: "h-3 w-32" })
    ] }) : error ? /* @__PURE__ */ jsxRuntime.jsx(ErrorBlock, { message: typeof error === "string" ? error : m.error, onRetry }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-end justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 text-2xl leading-tight font-semibold tabular-nums", children: [
          value,
          unit && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-1 text-sm font-normal text-muted", children: unit })
        ] }),
        sparkline && sparkline.length > 1 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Sparkline, { data: sparkline, label: m.trend(label), className: "shrink-0" })
      ] }),
      delta !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(Delta, { delta, goodWhen, period }),
      delta === void 0 && period && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted", children: period })
    ] })
  ] });
}
function MetricGrid({ min = "13rem", label, className, children }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { role: label ? "group" : void 0, "aria-label": label, className: chunkFTHFEMX6_cjs.cn("grid gap-3", className), style: { gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))` }, children });
}
var toneStroke = { ok: "text-ok", warn: "text-warn", danger: "text-danger", primary: "text-primary" };
function gaugeTone(value, thresholds = []) {
  let tone = "primary";
  for (const th of [...thresholds].sort((a, b) => a.value - b.value)) if (value >= th.value) tone = th.tone;
  return tone;
}
var ARC = 0.75;
var R = 42;
var C = 2 * Math.PI * R;
function RadialGauge({ value, min = 0, max = 100, unit, label, thresholds, formatValue = (v) => String(Math.round(v * 10) / 10), size = 128, animate, className }) {
  const motion = chunkGEJA4YGN_cjs.useChartMotion(animate);
  const sweep = chunkGEJA4YGN_cjs.entryAnim(motion, "sweep");
  const { t } = useLaf5();
  const g = t.components.dashboard.gauge;
  const frac = max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0;
  const tone = gaugeTone(value, thresholds);
  const stateText = thresholds?.length && tone !== "primary" ? g[tone] : void 0;
  const text = `${formatValue(value)}${unit ?? ""}`;
  const mark = (v) => {
    const a = (135 + 270 * ((v - min) / (max - min))) * Math.PI / 180;
    return { x1: 50 + (R - 6) * Math.cos(a), y1: 50 + (R - 6) * Math.sin(a), x2: 50 + (R + 6) * Math.cos(a), y2: 50 + (R + 6) * Math.sin(a) };
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      role: "meter",
      "aria-label": label,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": `${g.valueText(text, `${formatValue(max)}${unit ?? ""}`)}${stateText ? `, ${stateText}` : ""}`,
      "data-animate": motion.enabled ? "on" : "off",
      className: chunkFTHFEMX6_cjs.cn("relative inline-grid shrink-0 place-items-center", className),
      style: { width: size, height: size, ...chunkGEJA4YGN_cjs.motionVars(motion) },
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("svg", { viewBox: "0 0 100 100", "aria-hidden": true, className: "absolute inset-0 size-full", "data-tone": tone, children: [
          /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "50", cy: "50", r: R, fill: "none", stroke: "var(--bg-muted)", strokeWidth: "8", strokeLinecap: "butt", strokeDasharray: `${ARC * C} ${C}`, transform: "rotate(135 50 50)" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "circle",
            {
              cx: "50",
              cy: "50",
              r: R,
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "8",
              strokeLinecap: "butt",
              strokeDasharray: `${ARC * C * frac} ${C}`,
              transform: "rotate(135 50 50)",
              className: chunkFTHFEMX6_cjs.cn(toneStroke[tone], chunkGEJA4YGN_cjs.tweenClass(motion), sweep.className),
              style: sweep.style
            }
          ),
          thresholds?.map((th) => /* @__PURE__ */ jsxRuntime.jsx("line", { ...mark(th.value), stroke: "var(--border-strong)", strokeWidth: "1.5" }, `${th.tone}-${th.value}`))
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative grid place-items-center text-center leading-tight", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xl font-semibold tabular-nums", children: text }),
          stateText && /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkFTHFEMX6_cjs.cn("text-xs font-medium", toneStroke[tone]), children: stateText })
        ] })
      ]
    }
  );
}
function GaugeCard({ title, description, loading, error, onRetry, value, min, max, unit, thresholds, formatValue, size, animate, className, ...rest }) {
  const { t } = useLaf5();
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Card, { variant: "default", compact: true, ...rest, className, "aria-busy": loading || void 0, children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.CardTitle, { children: title }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.CardBody, { className: "grid place-items-center gap-2", children: [
      loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { role: "status", "aria-label": t.components.dashboard.metric.loading, children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, { className: "size-28 rounded-full" }) }) : error ? /* @__PURE__ */ jsxRuntime.jsx(ErrorBlock, { message: typeof error === "string" ? error : t.components.dashboard.metric.error, onRetry }) : /* @__PURE__ */ jsxRuntime.jsx(RadialGauge, { value, min, max, unit, label: title, thresholds, formatValue, size, animate }),
      description && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.CardDescription, { className: "text-center", children: description })
    ] })
  ] });
}
function ProgressCard({ title, description, value, max = 100, unit, meter, warnAt, dangerAt, formatValue = (v) => String(Math.round(v * 10) / 10), loading, error, onRetry, actions, className, ...rest }) {
  const { t, format: format2 } = useLaf5();
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Card, { variant: "default", compact: true, ...rest, className, "aria-busy": loading || void 0, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.CardHeader, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.CardTitle, { children: title }),
      actions
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.CardBody, { className: "grid gap-2", children: [
      loading ? /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "status", "aria-label": t.components.dashboard.metric.loading, className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, { className: "h-6 w-32" }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, { className: "h-1.5 w-full" })
      ] }) : error ? /* @__PURE__ */ jsxRuntime.jsx(ErrorBlock, { message: typeof error === "string" ? error : t.components.dashboard.metric.error, onRetry }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-baseline justify-between gap-2 tabular-nums", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xl font-semibold", children: [
            formatValue(value),
            unit && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-1 text-sm font-normal text-muted", children: unit })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs text-muted", children: [
            max > 0 ? format2.percent(value / max, { fractionDigits: 0 }) : "",
            " \xB7 ",
            formatValue(max),
            unit ? ` ${unit}` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Progress, { label: title, value, max, meter, warnAt, dangerAt })
      ] }),
      description && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.CardDescription, { children: description })
    ] })
  ] });
}
var barTone = { ok: "bg-ok", warn: "bg-warn", danger: "bg-danger", neutral: "bg-muted", primary: "bg-primary" };
function StatusSummaryCard({ title, items, loading, headingLevel = 3, className, ...rest }) {
  const { t } = useLaf5();
  const total = items.reduce((a, i) => a + i.count, 0);
  const rowCls2 = "flex w-full items-center justify-between gap-3 rounded-sm px-1.5 py-1 text-sm";
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Card, { variant: "default", compact: true, ...rest, className, "aria-busy": loading || void 0, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.CardHeader, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.CardTitle, { as: `h${headingLevel}`, children: title }),
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs text-muted tabular-nums", children: [
        t.components.dashboard.status.total,
        ": ",
        /* @__PURE__ */ jsxRuntime.jsx("b", { className: "text-fg", children: total })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.CardBody, { className: "grid gap-2", children: loading ? /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "status", "aria-label": t.components.dashboard.metric.loading, className: "grid gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, { className: "h-2 w-full" }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, { className: "w-2/3" }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, { className: "w-1/2" })
    ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { "aria-hidden": true, className: "flex h-2 overflow-hidden rounded-sm bg-muted-bg", children: items.map((i) => i.count > 0 ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: barTone[i.tone ?? "neutral"], style: { width: `${i.count / total * 100}%` } }, i.id) : null) }),
      /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none gap-0.5 p-0", children: items.map((i) => {
        const inner = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.StatusDot, { tone: i.tone, label: i.label }),
          /* @__PURE__ */ jsxRuntime.jsx("b", { className: "tabular-nums", children: i.count })
        ] });
        const action = "border-0 bg-transparent text-fg no-underline hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary/50 outline-none";
        return /* @__PURE__ */ jsxRuntime.jsx("li", { children: i.href ? /* @__PURE__ */ jsxRuntime.jsx("a", { href: i.href, className: chunkFTHFEMX6_cjs.cn(rowCls2, action), onClick: i.onClick, children: inner }) : i.onClick ? /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: chunkFTHFEMX6_cjs.cn(rowCls2, action), onClick: i.onClick, children: inner }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: rowCls2, children: inner }) }, i.id);
      }) })
    ] }) })
  ] });
}
var portalDefaults2 = { portal: portalEn };
var segmentsOf = (p) => p.split(/[?#]/)[0].split("/").filter(Boolean);
function matchPattern(pattern, path, end) {
  const pat = segmentsOf(pattern);
  const seg = segmentsOf(path);
  const params = {};
  for (let i = 0; i < pat.length; i++) {
    const p = pat[i];
    if (p === "*") return params;
    const s = seg[i];
    if (s === void 0) return null;
    if (p.startsWith(":")) {
      try {
        params[p.slice(1)] = decodeURIComponent(s);
      } catch {
        params[p.slice(1)] = s;
      }
    } else if (p !== s) return null;
  }
  return end && seg.length !== pat.length ? null : params;
}
function resolvePortalRoute(routes, path) {
  const all = [];
  const walk = (list, parents) => {
    for (const r of list) {
      const chain = [...parents, r];
      all.push({ chain, pattern: r.path });
      r.tabs?.forEach((tab) => all.push({ chain, tab, pattern: tab.path }));
      if (r.children) walk(r.children, chain);
    }
  };
  walk(routes, []);
  const depth = (c) => segmentsOf(c.pattern).length;
  let best;
  for (const c of all) {
    const exactParams = matchPattern(c.pattern, path, true);
    const params = exactParams ?? (depth(c) > 0 ? matchPattern(c.pattern, path, false) : null);
    if (!params) continue;
    const exact = exactParams !== null;
    if (!best || exact && !best.exact || exact === best.exact && depth(c) > depth(best.c)) best = { c, params, exact };
  }
  if (!best) return { chain: [], route: void 0, tab: void 0, params: {} };
  return { chain: best.c.chain, route: best.c.chain[best.c.chain.length - 1], tab: best.c.tab, params: best.params };
}
var resolve = (v, params) => typeof v === "function" ? v(params) : v;
var plainClick = (e) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
function portalBreadcrumbs(routes, path, opts) {
  const m = resolvePortalRoute(routes, path);
  const homePath = opts.homePath ?? "/";
  const link = (to, label) => ({ label, ...opts.link?.(to) });
  const crumbs = [];
  const rootIsHome = m.chain[0]?.path === homePath;
  if (!rootIsHome) crumbs.push(link(homePath, opts.homeLabel));
  m.chain.forEach((r, i) => {
    const last = i === m.chain.length - 1 && !(m.tab && m.tab.path !== r.path);
    const label = resolve(r.title, m.params);
    crumbs.push(last ? { label } : link(concretePath(r.path, m.params), label));
  });
  if (m.tab && m.route && m.tab.path !== m.route.path) crumbs.push({ label: m.tab.title });
  return crumbs.length > 1 ? crumbs : [];
}
var concretePath = (pattern, params) => "/" + segmentsOf(pattern).filter((s) => s !== "*").map((s) => s.startsWith(":") ? encodeURIComponent(params[s.slice(1)] ?? s) : s).join("/");
function portalNavEntries(routes, path, opts = {}) {
  const m = resolvePortalRoute(routes, path);
  const currentRoute = [...m.chain].reverse().find((r) => !r.hidden);
  const build = (r) => {
    const kids = r.children?.filter((c) => !c.hidden).map(build);
    const title = resolve(r.title, {});
    return {
      id: r.path,
      label: title,
      textValue: title,
      icon: r.icon,
      badge: r.badge,
      disabled: r.disabled,
      current: r === currentRoute,
      ...kids?.length ? { children: kids } : opts.link?.(r)
    };
  };
  const out = [];
  let section;
  routes.filter((r) => !r.hidden).forEach((r, i) => {
    if (r.section !== section) {
      if (r.section) out.push({ type: "heading", id: `section-${r.section}`, label: r.section });
      else if (i > 0) out.push({ type: "divider" });
      section = r.section;
    }
    out.push(build(r));
  });
  return out;
}
function appLink(app, onOpen) {
  const handler = (e) => {
    app.onSelect?.(app);
    onOpen?.(app);
    if ((app.onSelect || onOpen) && !app.href && !e.defaultPrevented) e.preventDefault();
  };
  return {
    href: app.href,
    onClick: handler,
    ...app.external ? { target: "_blank", rel: "noopener noreferrer" } : {}
  };
}
function AppSwitcher({ apps, current, onSelect, allApps, labels }) {
  const L = { ...chunkQQA4GJXV_cjs.useLafDefaults(portalDefaults2).t.components.portal.layout, ...labels };
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Popover, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.IconButton, { label: L.appSwitcher, icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.LayoutGrid, { className: "size-4" }) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.PopoverContent, { align: "end", title: L.appSwitcherTitle, className: "w-[min(26rem,calc(100vw-2rem))] p-3", children: [
      apps.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-muted", children: L.noApps }) : /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none grid-cols-2 gap-1 p-0 min-[480px]:grid-cols-3", children: apps.map((app) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.PopoverClose, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
        "a",
        {
          ...appLink(app, onSelect),
          "aria-current": app.id === current ? "true" : void 0,
          className: "flex h-full flex-col items-start gap-1.5 rounded-md border border-transparent p-2.5 text-start text-fg no-underline outline-none hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary/50 aria-[current=true]:border-line-strong aria-[current=true]:bg-primary-light",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "flex text-primary [&>svg]:size-6", children: app.icon }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-semibold", children: app.name }),
            app.description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted", children: app.description }),
            app.id === current && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
              "(",
              L.currentApp,
              ")"
            ] }),
            app.external && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
              "(",
              L.external,
              ")"
            ] })
          ]
        }
      ) }) }, app.id)) }),
      allApps && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-2 border-t border-line pt-2 text-sm", children: /* @__PURE__ */ jsxRuntime.jsx("a", { href: allApps.href, onClick: allApps.onClick, className: "rounded-sm text-primary no-underline hover:underline focus-visible:ring-2 focus-visible:ring-primary/50", children: L.allApps }) })
    ] })
  ] });
}
function PortalLayout({
  brand,
  routes,
  path,
  onNavigate,
  render,
  hrefFor = (p) => p,
  homePath = "/",
  apps,
  currentApp,
  onAppSelect,
  allAppsPath,
  search,
  notifications,
  user,
  theme,
  mastheadActions,
  sidebarHeader,
  sidebarFooter,
  footer,
  pageHeader,
  pageActions,
  labels,
  frameLabels,
  persistKey,
  sidebarCollapse,
  drawer,
  drawerPlacement,
  className,
  children
}) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(portalDefaults2);
  const L = { ...t.components.portal.layout, ...labels };
  const [paletteOpen, setPaletteOpen] = React31__namespace.useState(false);
  const go = React31__namespace.useCallback(
    (to, e) => {
      if (!onNavigate) return;
      if (e) {
        if (!plainClick(e)) return;
        e.preventDefault();
      }
      onNavigate(to);
    },
    [onNavigate]
  );
  const linkProps = (to) => ({ href: hrefFor(to), onClick: (e) => go(to, e) });
  const link = (to) => ({
    ...linkProps(to),
    ...render ? { render: (p) => render({ ...p, to, href: hrefFor(to) }) } : {}
  });
  const match = React31__namespace.useMemo(() => resolvePortalRoute(routes, path), [routes, path]);
  const breadcrumbs = React31__namespace.useMemo(() => portalBreadcrumbs(routes, path, { homeLabel: L.home, homePath, link }), [routes, path, L.home, homePath, hrefFor, render, onNavigate]);
  const navItems = React31__namespace.useMemo(
    () => portalNavEntries(routes, path, {
      link: (r) => ({
        href: hrefFor(r.path),
        onSelect: () => go(r.path),
        ...render ? { render: (p) => render({ ...p, to: r.path, href: p.href ?? hrefFor(r.path) }) } : {}
      })
    }),
    [routes, path, hrefFor, go, render]
  );
  const title = match.route ? resolve(match.route.title, match.params) : "";
  const ctx = { route: match.route, tab: match.tab, params: match.params, breadcrumbs, title };
  const commands = React31__namespace.useMemo(() => {
    const flat = [];
    const walk = (list) => list.forEach((r) => r.disabled || (!r.path.includes(":") && !r.path.includes("*") && flat.push(r), r.children && walk(r.children)));
    walk(routes);
    return [
      ...flat.map((r) => ({ id: `page:${r.path}`, label: resolve(r.title, {}), group: L.pages, onSelect: () => onNavigate ? onNavigate(r.path) : window.location.assign(hrefFor(r.path)) })),
      ...(apps ?? []).map((a) => ({
        id: `app:${a.id}`,
        label: a.name,
        group: L.apps,
        onSelect: () => {
          a.onSelect?.(a);
          onAppSelect?.(a);
          if (!a.onSelect && !onAppSelect && a.href) window.location.assign(a.href);
        }
      })),
      ...search ? search.commands ?? [] : []
    ];
  }, [routes, apps, search, L.pages, L.apps, onNavigate, onAppSelect, hrefFor]);
  const mastheadBrand = /* @__PURE__ */ jsxRuntime.jsx(
    MastheadBrand,
    {
      logo: brand.logo,
      title: brand.title,
      subtitle: brand.subtitle,
      href: hrefFor(homePath),
      onClick: onNavigate ? (e) => go(homePath, e) : void 0,
      render: render ? (p) => render({ ...p, to: homePath, href: p.href ?? hrefFor(homePath) }) : void 0
    }
  );
  const shortcut = formatHotkey("mod+k");
  const placeholder = search && search.placeholder || L.searchPlaceholder;
  const masthead = /* @__PURE__ */ jsxRuntime.jsxs(Masthead, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(MastheadToggle, { labels: frameLabels }),
    mastheadBrand,
    /* @__PURE__ */ jsxRuntime.jsx(MastheadContent, { children: search !== false && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          "aria-keyshortcuts": "Control+K Meta+K",
          onClick: () => setPaletteOpen(true),
          className: "mx-auto hidden w-full max-w-md items-center gap-2 rounded-md border border-line bg-input px-3 py-1.5 text-start text-sm text-muted outline-none hover:border-line-strong focus-visible:ring-2 focus-visible:ring-primary/50 min-[720px]:flex",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { "aria-hidden": true, className: "size-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1 truncate", children: placeholder }),
            /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Kbd, { "aria-hidden": true, children: shortcut })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-auto min-[720px]:hidden", children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.IconButton, { label: L.search, icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "size-4" }), onClick: () => setPaletteOpen(true) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(MastheadActions, { className: search === false ? void 0 : "ms-0", children: [
      mastheadActions,
      apps && apps.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
        AppSwitcher,
        {
          apps,
          current: currentApp,
          onSelect: onAppSelect,
          labels,
          allApps: allAppsPath ? { href: hrefFor(allAppsPath), onClick: (e) => go(allAppsPath, e) } : void 0
        }
      ),
      theme !== false && /* @__PURE__ */ jsxRuntime.jsx(ThemeToggle, { persistKey: persistKey ? `${persistKey}:theme` : void 0, labels: frameLabels, ...theme }),
      notifications && /* @__PURE__ */ jsxRuntime.jsx(NotificationCenter, { ...notifications }),
      user && /* @__PURE__ */ jsxRuntime.jsx(UserMenu, { name: user.name, email: user.email, tenant: user.tenant, avatarSrc: user.avatarSrc, items: user.items, onSignOut: user.onSignOut ?? (() => {
      }) })
    ] })
  ] });
  const route = match.route;
  const tabs = route?.tabs;
  const header = (() => {
    if (pageHeader === false || route?.header === false) return null;
    if (pageHeader !== void 0) return typeof pageHeader === "function" ? pageHeader(ctx) : pageHeader;
    if (!route) return null;
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        PageHeader,
        {
          breadcrumb: breadcrumbs.length ? breadcrumbs : void 0,
          icon: route.icon,
          title,
          subtitle: resolve(route.description, match.params),
          badges: resolve(route.badges, match.params),
          actions: resolve(route.actions, match.params) ?? pageActions,
          className: tabs?.length ? "pb-2" : void 0
        }
      ),
      tabs && tabs.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(PortalTabs, { tabs, current: match.tab?.path ?? route.path, linkProps, render, label: L.pageSections })
    ] });
  })();
  const footerNode = footer && (React31__namespace.isValidElement(footer) ? footer : /* @__PURE__ */ jsxRuntime.jsx(AppFooter, { ...footer }));
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      AppFrame,
      {
        className,
        persistKey,
        sidebarCollapse,
        drawer,
        drawerPlacement,
        labels: frameLabels,
        masthead,
        sidebar: /* @__PURE__ */ jsxRuntime.jsx(Sidebar, { items: navItems, label: L.navigation, header: sidebarHeader, footer: sidebarFooter, labels: frameLabels }),
        pageHeader: header,
        footer: footerNode || void 0,
        children
      }
    ),
    search !== false && /* @__PURE__ */ jsxRuntime.jsx(CommandPalette, { commands, open: paletteOpen, onOpenChange: setPaletteOpen, placeholder, search: search?.onSearch, recent: search?.recent })
  ] });
}
function PortalTabs({ tabs, current, linkProps, render, label }) {
  return /* @__PURE__ */ jsxRuntime.jsx("nav", { "aria-label": label, className: "px-6 max-[859px]:px-4", children: /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 flex list-none gap-1 overflow-x-auto border-b border-line p-0", children: tabs.map((tab) => {
    const p = linkProps(tab.path);
    const props = {
      ...p,
      className: "-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted no-underline outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50 aria-[current=page]:border-primary aria-[current=page]:text-fg aria-disabled:pointer-events-none aria-disabled:opacity-50",
      children: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        tab.title,
        tab.badge && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { children: tab.badge })
      ] }),
      ...tab.path === current ? { "aria-current": "page" } : {},
      ...tab.disabled ? { "aria-disabled": true } : {}
    };
    return /* @__PURE__ */ jsxRuntime.jsx("li", { children: render ? render({ ...props, to: tab.path }) : /* @__PURE__ */ jsxRuntime.jsx("a", { ...props }) }, tab.path);
  }) }) });
}
var toneBorder = { info: "border-s-primary", ok: "border-s-ok", warn: "border-s-warn", danger: "border-s-danger" };
function AppCard({ app, favourite, onToggle, onOpen, L, opened }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "relative flex min-w-0 items-start gap-3 rounded-md border border-line bg-surface p-4 hover:bg-surface-hover", children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "flex shrink-0 text-primary [&>svg]:size-8", children: app.icon }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1 pe-8", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "a",
        {
          ...appLink(app, onOpen),
          className: "text-base font-semibold text-fg no-underline outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-primary/50 hover:underline",
          children: [
            app.name,
            app.external && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
              " (",
              L.openApp(app.name),
              ")"
            ] })
          ]
        }
      ),
      app.description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 mt-1 text-sm text-muted", children: app.description }),
      opened && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 mt-1 text-xs text-subtle", children: opened })
    ] }),
    app.badge && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: app.badge }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        "aria-pressed": favourite,
        "aria-label": favourite ? L.removeFavourite(app.name) : L.addFavourite(app.name),
        onClick: onToggle,
        className: "absolute end-2 top-2 z-10 inline-flex size-7 items-center justify-center rounded-sm border-0 bg-transparent text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50 aria-pressed:text-warn",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Star, { "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn("size-4", favourite && "fill-current") })
      }
    )
  ] });
}
function PortalHome({ user, title, subtitle, apps, favourites, onFavouritesChange, onAppOpen, recent, announcements, onDismissAnnouncement, quickActions, labels, className }) {
  const { format: format2 } = chunkQQA4GJXV_cjs.useLaf();
  const defaults = chunkQQA4GJXV_cjs.useLafDefaults(portalDefaults2).t.components.portal;
  const L = { ...defaults.home, openApp: defaults.layout.openApp, ...labels };
  const [favIds, setFavIds] = chunkS4QID4TP_cjs.useControllableState({ value: favourites, defaultValue: apps.filter((a) => a.favourite).map((a) => a.id), onChange: onFavouritesChange });
  const favSet = new Set(favIds);
  const toggle = (id) => setFavIds(favSet.has(id) ? favIds.filter((x) => x !== id) : [...favIds, id]);
  const time = (a) => a.lastOpened !== void 0 ? L.lastOpened(format2.relative(a.lastOpened)) : void 0;
  const recentApps = recent ?? apps.filter((a) => a.lastOpened !== void 0).sort((a, b) => new Date(b.lastOpened).getTime() - new Date(a.lastOpened).getTime()).slice(0, 4);
  const favApps = favIds.map((id) => apps.find((a) => a.id === id)).filter((a) => !!a);
  const grid = "m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3 p-0";
  const heading = "m-0 mb-3 text-base font-semibold text-fg";
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PageHeader, { title: title ?? (user ? L.welcome(user.name) : L.welcomeAnonymous), subtitle: subtitle ?? L.subtitle }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-x-8 gap-y-6 px-6 pb-8 max-[859px]:px-4 min-[1100px]:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid min-w-0 content-start gap-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(PageSection, { padding: "none", "aria-labelledby": "portal-fav", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { id: "portal-fav", className: heading, children: L.favourites }),
          favApps.length ? /* @__PURE__ */ jsxRuntime.jsx("ul", { className: grid, children: favApps.map((a) => /* @__PURE__ */ jsxRuntime.jsx(AppCard, { app: a, favourite: true, onToggle: () => toggle(a.id), onOpen: onAppOpen, L }, a.id)) }) : /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-muted", children: L.noFavourites })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(PageSection, { padding: "none", "aria-labelledby": "portal-recent", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { id: "portal-recent", className: heading, children: L.recent }),
          recentApps.length ? /* @__PURE__ */ jsxRuntime.jsx("ul", { className: grid, children: recentApps.map((a) => /* @__PURE__ */ jsxRuntime.jsx(AppCard, { app: a, favourite: favSet.has(a.id), onToggle: () => toggle(a.id), onOpen: onAppOpen, L, opened: time(a) }, a.id)) }) : /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-muted", children: L.noRecent })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(PageSection, { padding: "none", "aria-labelledby": "portal-all", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { id: "portal-all", className: heading, children: L.allApps }),
          /* @__PURE__ */ jsxRuntime.jsx("ul", { className: grid, children: apps.map((a) => /* @__PURE__ */ jsxRuntime.jsx(AppCard, { app: a, favourite: favSet.has(a.id), onToggle: () => toggle(a.id), onOpen: onAppOpen, L }, a.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid min-w-0 content-start gap-6", children: [
        quickActions && quickActions.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(PageSection, { padding: "none", "aria-labelledby": "portal-quick", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { id: "portal-quick", className: heading, children: L.quickActions }),
          /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none gap-2 p-0", children: quickActions.map((q) => {
            const body = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              q.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "flex shrink-0 text-primary [&>svg]:size-5", children: q.icon }),
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "block text-sm font-medium text-fg", children: q.label }),
                q.description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "block text-xs text-muted", children: q.description })
              ] })
            ] });
            const cls = "flex w-full items-center gap-3 rounded-md border border-line bg-surface p-3 text-start no-underline outline-none hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary/50";
            return /* @__PURE__ */ jsxRuntime.jsx("li", { children: q.href ? /* @__PURE__ */ jsxRuntime.jsx("a", { href: q.href, onClick: q.onSelect, className: cls, children: body }) : /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", onClick: q.onSelect, className: cls, children: body }) }, q.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(PageSection, { padding: "none", "aria-labelledby": "portal-news", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { id: "portal-news", className: heading, children: L.announcements }),
          announcements && announcements.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none gap-2 p-0", children: announcements.map((n) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: chunkFTHFEMX6_cjs.cn("relative rounded-md border border-s-4 border-line bg-surface p-3", toneBorder[n.tone ?? "info"]), children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("flex items-start gap-2", onDismissAnnouncement && "pe-8"), children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm font-semibold text-fg", children: n.href || n.onClick ? /* @__PURE__ */ jsxRuntime.jsx("a", { href: n.href, onClick: n.onClick, className: "text-fg", children: n.title }) : n.title }),
              n.body && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-1 text-sm text-muted", children: n.body }),
              n.date !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("time", { dateTime: new Date(n.date).toISOString(), className: "mt-1 block text-xs text-subtle", children: format2.relative(n.date) })
            ] }) }),
            onDismissAnnouncement && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                "aria-label": L.dismiss(n.title),
                onClick: () => onDismissAnnouncement(n.id),
                className: "absolute end-2 top-2 inline-flex size-6 items-center justify-center rounded-sm border-0 bg-transparent text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50",
                children: /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, children: "\xD7" })
              }
            )
          ] }, n.id)) }) : /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-muted", children: L.noAnnouncements })
        ] })
      ] })
    ] })
  ] });
}
var portalDefaults3 = { portal: portalEn };
var browserSearchParams = {
  read: () => typeof location === "undefined" ? "" : location.search,
  write: (search, mode) => {
    if (typeof history === "undefined") return;
    const url = `${location.pathname}${search ? `?${search}` : ""}${location.hash}`;
    if (mode === "push") history.pushState(history.state, "", url);
    else history.replaceState(history.state, "", url);
  },
  subscribe: (onChange) => {
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }
};
var own = (key, prefix) => key === `${prefix}q` || key === `${prefix}sort` || key === `${prefix}page` || key === `${prefix}size` || key.startsWith(`${prefix}f.`) || key.startsWith(`${prefix}fj.`);
var positive = (v) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : void 0;
};
function serverGridFromSearchParams(search, defaults = {}, prefix = "") {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  const sort = [];
  for (const part of (params.get(`${prefix}sort`) ?? "").split(",").filter(Boolean)) {
    const i = part.lastIndexOf(":");
    const dir = part.slice(i + 1);
    if (i > 0 && (dir === "asc" || dir === "desc")) sort.push({ id: decodeURIComponent(part.slice(0, i)), dir });
  }
  const filters = [];
  params.forEach((value, key) => {
    if (key.startsWith(`${prefix}f.`)) filters.push({ id: key.slice(prefix.length + 2), value });
    else if (key.startsWith(`${prefix}fj.`)) {
      try {
        filters.push({ id: key.slice(prefix.length + 3), value: JSON.parse(value) });
      } catch {
      }
    }
  });
  return {
    sort: params.has(`${prefix}sort`) ? sort : defaults.sort ?? [],
    filters: filters.length ? filters : defaults.filters ?? [],
    search: params.get(`${prefix}q`) ?? defaults.search ?? "",
    page: positive(params.get(`${prefix}page`)) ?? defaults.page ?? 1,
    pageSize: positive(params.get(`${prefix}size`)) ?? defaults.pageSize ?? 25
  };
}
function serverGridToSearchParams(state, params = new URLSearchParams(), defaults = {}, prefix = "") {
  for (const key of [...params.keys()]) if (own(key, prefix)) params.delete(key);
  if (state.search) params.set(`${prefix}q`, state.search);
  const defaultSort = (defaults.sort ?? []).map((s) => `${s.id}:${s.dir}`).join(",");
  const sort = state.sort.map((s) => `${encodeURIComponent(s.id)}:${s.dir}`).join(",");
  if (sort !== defaultSort) params.set(`${prefix}sort`, sort);
  if (state.page > 1) params.set(`${prefix}page`, String(state.page));
  if (state.pageSize !== (defaults.pageSize ?? 25)) params.set(`${prefix}size`, String(state.pageSize));
  for (const f of state.filters) {
    if (typeof f.value === "string") params.append(`${prefix}f.${f.id}`, f.value);
    else params.append(`${prefix}fj.${f.id}`, JSON.stringify(f.value));
  }
  return params;
}
var isAbort = (e) => typeof e === "object" && e !== null && e.name === "AbortError";
var sameQuery = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function useServerGrid(options) {
  const { fetcher, initialSort, initialFilters, initialSearch, initialPage, pageSize: pageSizeOption = 25, debounceMs = 300, urlSync, enabled = true, keepPreviousData = true } = options;
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(portalDefaults3);
  const SG = t.components.portal.serverGrid;
  const urlOpts = urlSync ? urlSync === true ? {} : urlSync : void 0;
  const adapter = urlOpts?.adapter ?? browserSearchParams;
  const prefix = urlOpts?.prefix ?? "";
  const urlMode = urlOpts?.history ?? "replace";
  const defaults = React31__namespace.useRef({ sort: initialSort ?? [], filters: initialFilters ?? [], search: initialSearch ?? "", page: initialPage ?? 1, pageSize: pageSizeOption });
  const [core, setCore] = React31__namespace.useState(() => urlOpts ? serverGridFromSearchParams(adapter.read(), defaults.current, prefix) : defaults.current);
  const [input, setInput] = React31__namespace.useState(core.search);
  const [tick, setTick] = React31__namespace.useState(0);
  const [data, setData] = React31__namespace.useState(null);
  const [status, setStatus] = React31__namespace.useState({ loading: enabled, error: null });
  const fetcherRef = React31__namespace.useRef(fetcher);
  fetcherRef.current = fetcher;
  const onErrorRef = React31__namespace.useRef(options.onError);
  onErrorRef.current = options.onError;
  const timer = React31__namespace.useRef(void 0);
  const pending = React31__namespace.useRef(input);
  const cursors = React31__namespace.useRef({ key: "", byPage: {} });
  React31__namespace.useEffect(() => () => clearTimeout(timer.current), []);
  const commitSearch = React31__namespace.useCallback((value) => {
    clearTimeout(timer.current);
    setCore((c) => c.search === value ? c : { ...c, search: value, page: 1 });
  }, []);
  const setSearch = React31__namespace.useCallback(
    (value) => {
      setInput(value);
      pending.current = value;
      clearTimeout(timer.current);
      if (debounceMs <= 0) commitSearch(value);
      else timer.current = setTimeout(() => commitSearch(value), debounceMs);
    },
    [debounceMs, commitSearch]
  );
  const flushSearch = React31__namespace.useCallback(() => commitSearch(pending.current), [commitSearch]);
  const setSort = React31__namespace.useCallback((sort) => setCore((c) => ({ ...c, sort, page: 1 })), []);
  const setFilters = React31__namespace.useCallback((filters) => setCore((c) => ({ ...c, filters, page: 1 })), []);
  const setPageSize = React31__namespace.useCallback((pageSize) => setCore((c) => c.pageSize === pageSize ? c : { ...c, pageSize, page: 1 }), []);
  const setPage = React31__namespace.useCallback((page) => setCore((c) => page < 1 || c.page === page ? c : { ...c, page }), []);
  const refresh = React31__namespace.useCallback(() => setTick((n) => n + 1), []);
  const reset = React31__namespace.useCallback(() => {
    clearTimeout(timer.current);
    const d = defaults.current;
    pending.current = d.search;
    setInput(d.search);
    setCore({ ...d });
  }, []);
  const queryKey = JSON.stringify([core.sort, core.pageSize, core.filters, core.search]);
  const requestKey = `${queryKey}|${core.page}`;
  React31__namespace.useEffect(() => {
    if (!enabled) return;
    if (cursors.current.key !== queryKey) cursors.current = { key: queryKey, byPage: {} };
    const ac = new AbortController();
    setStatus((s) => s.loading && s.error === null ? s : { loading: true, error: null });
    let promise;
    try {
      promise = Promise.resolve(fetcherRef.current({ ...core, cursor: cursors.current.byPage[core.page], signal: ac.signal }));
    } catch (e) {
      promise = Promise.reject(e);
    }
    promise.then(
      (res) => {
        if (ac.signal.aborted) return;
        if (res.nextCursor) cursors.current.byPage[core.page + 1] = res.nextCursor;
        setData({ rows: res.rows, total: res.total, nextCursor: res.nextCursor, key: requestKey });
        setStatus({ loading: false, error: null });
      },
      (error) => {
        if (ac.signal.aborted || isAbort(error)) return;
        setStatus({ loading: false, error });
        onErrorRef.current?.(error);
      }
    );
    return () => ac.abort();
  }, [core, tick, enabled]);
  const total = data?.total;
  const pageCount = total === void 0 ? void 0 : Math.max(1, Math.ceil(total / core.pageSize));
  React31__namespace.useEffect(() => {
    if (data?.key === requestKey && pageCount !== void 0 && core.page > pageCount) setCore((c) => ({ ...c, page: pageCount }));
  }, [data, requestKey, pageCount, core.page]);
  const urlRef = React31__namespace.useRef({ adapter, prefix, urlMode });
  urlRef.current = { adapter, prefix, urlMode };
  React31__namespace.useEffect(() => {
    if (!urlOpts) return;
    const params = serverGridToSearchParams(core, new URLSearchParams(adapter.read()), defaults.current, prefix);
    const next = params.toString();
    if (next !== new URLSearchParams(adapter.read()).toString()) adapter.write(next, urlMode);
  }, [core]);
  React31__namespace.useEffect(() => {
    if (!urlOpts || !adapter.subscribe) return;
    return adapter.subscribe(() => {
      const { adapter: a, prefix: p } = urlRef.current;
      const parsed = serverGridFromSearchParams(a.read(), defaults.current, p);
      pending.current = parsed.search;
      setInput(parsed.search);
      setCore((c) => sameQuery(c, parsed) ? c : parsed);
    });
  }, [!!urlOpts, adapter]);
  const stale = data !== null && data.key !== requestKey;
  const rows = React31__namespace.useMemo(() => data && (keepPreviousData || !stale) ? data.rows : [], [data, keepPreviousData, stale]);
  const hasNext = total !== void 0 ? core.page < (pageCount ?? 1) : data?.nextCursor !== void 0 ? !!data.nextCursor : rows.length >= core.pageSize;
  const errorText = status.error === null ? void 0 : `${SG.loadFailed} ${status.error instanceof Error ? status.error.message : ""}`.trim();
  const pagination = {
    page: core.page,
    pageSize: core.pageSize,
    total,
    hasNext,
    onPageChange: setPage,
    onPageSizeChange: setPageSize
  };
  return {
    rows,
    total,
    pageCount,
    hasNext,
    sort: core.sort,
    page: core.page,
    pageSize: core.pageSize,
    filters: core.filters,
    search: input,
    query: core,
    loading: status.loading,
    initialLoading: status.loading && data === null,
    stale,
    error: status.error,
    setSort,
    setFilters,
    setSearch,
    flushSearch,
    setPage,
    setPageSize,
    reset,
    refresh,
    gridProps: {
      rows,
      manual: true,
      sort: core.sort,
      onSortChange: setSort,
      filters: core.filters,
      onFiltersChange: setFilters,
      search: input,
      onSearchChange: setSearch,
      loading: status.loading,
      error: errorText,
      onRetry: refresh,
      rowCount: total,
      pagination
    }
  };
}
var TEXT_ID = "$text";
var isBarFilter = (f) => f.id === TEXT_ID || typeof f.value === "object" && f.value !== null && Array.isArray(f.value.values);
function barFilters(parsed) {
  const out = parsed.filters.map((f) => ({ id: f.key, value: { op: f.op, values: f.values, negated: f.negated } }));
  if (parsed.text.length) out.push({ id: TEXT_ID, value: parsed.text });
  return out;
}
function barQuery(filters) {
  const tokens = filters.filter(isBarFilter).flatMap(
    (f) => f.id === TEXT_ID ? f.value.map((t) => ({ type: "text", ...t })) : [{ type: "field", key: f.id, ...f.value }]
  );
  return serializeFilter(tokens);
}
function ServerDataGrid({
  fetcher,
  initialSort,
  initialFilters,
  initialSearch,
  initialPage,
  pageSize,
  debounceMs,
  urlSync,
  enabled,
  keepPreviousData,
  onError,
  pageSizes,
  searchable = true,
  searchPlaceholder,
  filterFields,
  filterBar,
  toolbarStart,
  toolbarEnd,
  refreshable = true,
  controllerRef,
  ...grid
}) {
  const { t } = chunkQQA4GJXV_cjs.useLafDefaults(portalDefaults3);
  const SG = { ...t.components.portal.serverGrid, ...grid.labels };
  const ctl = useServerGrid({ fetcher, initialSort, initialFilters, initialSearch, initialPage, pageSize, debounceMs, urlSync, enabled, keepPreviousData, onError });
  React31__namespace.useImperativeHandle(controllerRef, () => ctl);
  const { gridProps } = ctl;
  const pagination = pageSizes ? { ...gridProps.pagination, pageSizes } : gridProps.pagination;
  const hasToolbar = searchable || !!filterFields || !!toolbarStart || !!toolbarEnd || refreshable;
  const toolbar = hasToolbar && /* @__PURE__ */ jsxRuntime.jsx(Toolbar, { "aria-label": grid.label, className: "w-full", children: /* @__PURE__ */ jsxRuntime.jsxs(ToolbarContent, { children: [
    searchable && /* @__PURE__ */ jsxRuntime.jsx(ToolbarItem, { grow: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      chunkGEJA4YGN_cjs.SearchInput,
      {
        icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { "aria-hidden": true }),
        "aria-label": SG.search,
        placeholder: searchPlaceholder ?? SG.search,
        value: ctl.search,
        onChange: (e) => ctl.setSearch(e.target.value),
        onKeyDown: (e) => e.key === "Enter" && ctl.flushSearch(),
        className: "w-full"
      }
    ) }),
    filterFields && /* @__PURE__ */ jsxRuntime.jsx(ToolbarItem, { grow: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      FilterBar,
      {
        savedViews: false,
        ...filterBar,
        fields: filterFields,
        value: barQuery(ctl.filters),
        onChange: (_q, parsed) => ctl.setFilters([...ctl.filters.filter((f) => !isBarFilter(f)), ...barFilters(parsed)])
      }
    ) }),
    toolbarStart,
    /* @__PURE__ */ jsxRuntime.jsxs(ToolbarGroup, { align: "end", children: [
      toolbarEnd,
      refreshable && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.IconButton, { label: SG.refresh, icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RefreshCw, { className: "size-4" }), onClick: ctl.refresh })
    ] })
  ] }) });
  return /* @__PURE__ */ jsxRuntime.jsx(DataGrid, { ...grid, ...gridProps, pagination, toolbar: toolbar || void 0 });
}

// lib/messages/mail.en.ts
var mailEn = {
  queueStatus: { PENDING: "Pending", DELIVERED: "Delivered", TRANSIENT_FAILURE: "Retrying", PERMANENT_FAILURE: "Failed", UNKNOWN: "Unknown" },
  quota: {
    label: "Storage quota",
    usage: (used, total, pct) => `${used} of ${total} (${pct})`,
    unlimited: (used) => `${used} used, no quota`
  },
  health: {
    label: "Service health",
    status: { up: "Operational", degraded: "Degraded", down: "Down", unknown: "Unknown" }
  },
  dns: {
    label: "DNS records",
    type: "Type",
    host: "Host",
    value: "Value",
    purpose: "Purpose",
    status: "Status",
    copy: (host) => `Copy value of ${host}`,
    copied: "Copied",
    empty: "No DNS records",
    state: { verified: "Verified", missing: "Missing", mismatch: "Mismatch", optional: "Optional", unknown: "Not checked" }
  },
  timeline: { label: "Delivery timeline", elapsed: (ms) => `+${ms}`, empty: "No hops recorded" }
};
var lafDefaults11 = { mail: mailEn };
var useLaf6 = () => chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults11);
var queueTone = { PENDING: "primary", DELIVERED: "ok", TRANSIENT_FAILURE: "warn", PERMANENT_FAILURE: "danger", UNKNOWN: "neutral" };
function QueueStatusBadge({ status, className }) {
  const { t } = useLaf6();
  const key = status in queueTone ? status : "UNKNOWN";
  return /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: queueTone[key], className, children: t.components.mail.queueStatus[key] });
}
function QuotaBar({ usedBytes, quotaBytes = 0, label, warnAt = 80, dangerAt = 95, className }) {
  const { t, format: format2 } = useLaf6();
  const m = t.components.mail.quota;
  const limited = quotaBytes > 0;
  const name = label ?? m.label;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid gap-1", className), children: [
    limited ? /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Progress, { meter: true, label: name, value: usedBytes, max: quotaBytes, warnAt, dangerAt }) : /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Progress, { meter: true, label: name, value: 0, max: 1 }),
    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-xs text-muted tabular-nums", children: limited ? m.usage(format2.bytes(usedBytes), format2.bytes(quotaBytes), format2.percent(Math.min(1, usedBytes / quotaBytes), { fractionDigits: 0 })) : m.unlimited(format2.bytes(usedBytes)) })
  ] });
}
var healthTone = { up: "ok", degraded: "warn", down: "danger", unknown: "neutral" };
function ServiceTile({ name, status, detail, onSelect, className }) {
  const { t } = useLaf6();
  const body = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 truncate font-semibold text-fg", children: name }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.StatusDot, { tone: healthTone[status], label: t.components.mail.health.status[status], pulse: status === "down", className: "text-xs text-muted" }),
    detail !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 truncate text-xs text-subtle", children: detail })
  ] });
  const cls = chunkFTHFEMX6_cjs.cn("grid min-w-0 gap-0.5 rounded-md border border-line bg-card px-3 py-2 text-start", onSelect && "cursor-pointer hover:bg-card-hover", className);
  return onSelect ? /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: cls, onClick: onSelect, children: body }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: cls, children: body });
}
function HealthGrid({ services, label, className }) {
  const { t } = useLaf6();
  return /* @__PURE__ */ jsxRuntime.jsx("ul", { "aria-label": label ?? t.components.mail.health.label, className: chunkFTHFEMX6_cjs.cn("m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,11rem),1fr))] gap-2 p-0", className), children: services.map(({ id, ...s }) => /* @__PURE__ */ jsxRuntime.jsx("li", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntime.jsx(ServiceTile, { ...s }) }, id)) });
}
var dnsTone = { verified: "ok", missing: "danger", mismatch: "warn", optional: "neutral", unknown: "neutral" };
function DnsRecordTable({ records, label, className }) {
  const { t } = useLaf6();
  const m = t.components.mail.dns;
  if (!records.length) return /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-muted", children: m.empty });
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("table-wrap", className), children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "table", "aria-label": label ?? m.label, children: [
    /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", children: m.purpose }),
      /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", children: m.type }),
      /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", children: m.host }),
      /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", children: m.value }),
      /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", children: m.status })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: records.map((r) => {
      const state = r.state ?? "unknown";
      return /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "row", className: "font-semibold", children: r.purpose }),
        /* @__PURE__ */ jsxRuntime.jsx("td", { className: "font-mono text-xs", children: r.type }),
        /* @__PURE__ */ jsxRuntime.jsx("td", { className: "font-mono text-xs break-all", children: r.host }),
        /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex min-w-0 items-start gap-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx("code", { className: "min-w-0 max-w-xs break-all text-xs", children: r.value }),
          /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.CopyButton, { value: r.value, label: m.copy(r.host), copiedLabel: m.copied })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: dnsTone[state], children: m.state[state] }) })
      ] }, r.id);
    }) })
  ] }) });
}
function TraceTimeline({ hops, label, className }) {
  const { t, format: format2 } = useLaf6();
  const m = t.components.mail.timeline;
  if (!hops.length) return /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-muted", children: m.empty });
  return /* @__PURE__ */ jsxRuntime.jsx("ol", { "aria-label": label ?? m.label, className: chunkFTHFEMX6_cjs.cn("m-0 grid list-none gap-0 p-0", className), children: hops.map((h, i) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "relative grid grid-cols-[auto_1fr] gap-x-3 pb-3 last:pb-0", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex flex-col items-center", "aria-hidden": true, children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkFTHFEMX6_cjs.cn("mt-1.5 size-2.5 shrink-0 rounded-xs", { ok: "bg-ok", warn: "bg-warn", danger: "bg-danger", neutral: "bg-muted", primary: "bg-primary" }[h.tone ?? "primary"]) }),
      i < hops.length - 1 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mt-1 w-px flex-1 bg-line" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-baseline gap-x-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold text-fg", children: h.label }),
        /* @__PURE__ */ jsxRuntime.jsx("time", { className: "text-xs text-subtle tabular-nums", dateTime: new Date(h.time).toISOString(), children: format2.dateTime(h.time, { timeStyle: "medium" }) }),
        h.elapsedMs !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted tabular-nums", children: m.elapsed(format2.duration(h.elapsedMs)) })
      ] }),
      h.detail !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs break-words text-muted", children: h.detail })
    ] })
  ] }, h.id)) });
}

// lib/messages/overview.en.ts
var overviewEn = {
  edit: (title) => `Edit ${title}`,
  details: "Details",
  empty: "Nothing to show",
  actions: "Actions",
  actionOptions: (label) => `${label} options`,
  switchObject: "Switch object",
  utilization: {
    title: "Utilization",
    available: "Available",
    ofTotal: (capacity) => `of ${capacity}`,
    used: "Used",
    range: "Last 7 days",
    trend: (title) => `${title} trend`
  }
};
var lafDefaults12 = { overview: overviewEn };
var useLaf7 = () => chunkQQA4GJXV_cjs.useLafDefaults(lafDefaults12);
function ResourceOverviewLayout({ identity, details, utilization, aside, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("@container min-w-0", className), children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid grid-cols-1 gap-4", aside ? "@min-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(15rem,0.8fr)]" : "@min-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"), children: [
    identity && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 [&>*]:h-full", children: identity }),
    details && /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("min-w-0 [&>*]:h-full", !identity && "@min-[860px]:col-span-2"), children: details }),
    aside && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex min-w-0 flex-col gap-4 @min-[860px]:col-start-3 @min-[860px]:row-span-2 @min-[860px]:row-start-1 @min-[860px]:[&>*]:flex-1", children: aside }),
    utilization && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 @min-[860px]:col-span-2", children: utilization })
  ] }) });
}
function PowerState({ state, label, className }) {
  const { t } = useLaf7();
  const v = chunkVUZVPUQ7_cjs.objectStateMeta[state];
  return /* @__PURE__ */ jsxRuntime.jsxs("span", { "data-state": state, className: chunkFTHFEMX6_cjs.cn("inline-flex items-center gap-1.5 text-sm text-fg", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(v.Icon, { "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn("size-4 shrink-0", v.tone) }),
    label ?? t[v.text]
  ] });
}
function EditButton({ title, label, onClick }) {
  const { t } = useLaf7();
  return /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.IconButton, { size: "sm", label: label ?? t.components.overview.edit(title), icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Pencil, { className: "size-4" }), onClick });
}
function IdentityCard({ icon, name, status, description, ribbon, onEdit, editLabel, headingLevel = 2, className, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Card, { variant: "default", className: chunkFTHFEMX6_cjs.cn("relative gap-0 overflow-hidden p-0", className), children: [
    ribbon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute end-0 top-0 bg-muted-bg px-3 py-1 text-xs font-semibold tracking-wide text-muted uppercase", children: ribbon }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 flex-wrap items-start gap-5 p-5 pt-9", children: [
      icon && /* @__PURE__ */ jsxRuntime.jsx("div", { "aria-hidden": true, className: "grid size-24 shrink-0 place-items-center text-primary [&>svg]:size-full", children: icon }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid min-w-0 flex-1 basis-48 gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.CardTitle, { as: `h${headingLevel}`, className: "min-w-0 flex-1 text-2xl font-normal break-words", children: name }),
          onEdit && /* @__PURE__ */ jsxRuntime.jsx(EditButton, { title: name, label: editLabel, onClick: onEdit })
        ] }),
        status,
        description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-muted", children: description }),
        children
      ] })
    ] })
  ] });
}
function CardFrame({ title, icon, count, onEdit, editLabel, headingLevel = 3, className, bodyClassName, children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Card, { variant: "default", className: chunkFTHFEMX6_cjs.cn("gap-0 p-0", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 items-center gap-2 border-b border-line px-4 py-2.5", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.CardTitle, { as: `h${headingLevel}`, className: "flex min-w-0 flex-1 flex-wrap items-center gap-x-2 text-base font-normal", children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "inline-flex shrink-0 text-muted [&>svg]:size-5", children: icon }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: title }),
        count !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { className: "shrink-0", children: count })
      ] }),
      onEdit && /* @__PURE__ */ jsxRuntime.jsx(EditButton, { title, label: editLabel, onClick: onEdit })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("min-w-0 flex-1 p-4", bodyClassName), children })
  ] });
}
function DetailsCard({ title, items, columns = 2, ...rest }) {
  const { t } = useLaf7();
  const per = Math.ceil(items.length / columns) || 1;
  const cols = Array.from({ length: columns }, (_, i) => items.slice(i * per, (i + 1) * per)).filter((c) => c.length);
  return /* @__PURE__ */ jsxRuntime.jsx(CardFrame, { title: title ?? t.components.overview.details, ...rest, children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "@container", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("grid grid-cols-1 gap-x-8 gap-y-3.5", columns === 2 && "@min-[34rem]:grid-cols-2", columns === 3 && "@min-[34rem]:grid-cols-2 @min-[52rem]:grid-cols-3"), children: cols.map((col, i) => /* @__PURE__ */ jsxRuntime.jsx(DescriptionList, { layout: "horizontal", compact: false, className: "content-start", children: col.map((it) => /* @__PURE__ */ jsxRuntime.jsxs(DescriptionListGroup, { className: "items-baseline grid-cols-[minmax(5rem,8rem)_minmax(0,1fr)]", children: [
    /* @__PURE__ */ jsxRuntime.jsx(DescriptionListTerm, { className: "text-sm font-semibold tracking-normal text-fg normal-case", children: it.label }),
    /* @__PURE__ */ jsxRuntime.jsxs(DescriptionListDescription, { children: [
      it.value,
      it.sub && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "block text-xs text-muted italic", children: it.sub })
    ] })
  ] }, it.id ?? it.label)) }, i)) }) }) });
}
function SideCard({ empty, children, ...rest }) {
  const { t } = useLaf7();
  const hasContent = React31__namespace.Children.toArray(children).length > 0;
  return /* @__PURE__ */ jsxRuntime.jsx(CardFrame, { ...rest, children: hasContent ? children : /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-muted", children: empty ?? t.components.overview.empty }) });
}
function CountCard({ items, count, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(SideCard, { count: count ?? items.length, ...rest, children: items.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 grid list-none gap-1.5 p-0 text-sm", children: items.map((it) => /* @__PURE__ */ jsxRuntime.jsx("li", { className: "min-w-0 break-words", children: it.content }, it.id)) }) });
}
function UtilizationPanel({ title, headingLevel = 3, min = "8rem", className, children }) {
  const { t } = useLaf7();
  return /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Card, { variant: "default", className: chunkFTHFEMX6_cjs.cn("gap-0 p-0", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border-b border-line px-5 py-3", children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.CardTitle, { as: `h${headingLevel}`, className: "text-base font-normal", children: title ?? t.components.overview.utilization.title }) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-x-6 gap-y-6 p-5", style: { gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))` }, children })
  ] });
}
function UtilizationColumn({
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
  history: history2,
  rangeLabel,
  formatValue,
  xLabels,
  size = 128,
  animate,
  tooltip = true,
  headingLevel = 4,
  className
}) {
  const { t } = useLaf7();
  const m = t.components.overview.utilization;
  const Heading = `h${headingLevel}`;
  const id = React31__namespace.useId();
  const used$ = centerSubtext ?? m.used;
  const thresholds = [
    ...okTone === "ok" ? [{ value: 0, tone: "ok" }] : [],
    { value: warnAt / 100 * max, tone: "warn" },
    { value: dangerAt / 100 * max, tone: "danger" }
  ];
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-labelledby": id, className: chunkFTHFEMX6_cjs.cn("grid min-w-0 content-start gap-3", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(Heading, { id, className: "m-0 text-base font-normal text-fg", children: title }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-end gap-2 border-b border-line pb-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-3xl leading-none font-light text-fg tabular-nums", children: available }),
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "pb-0.5 text-xs leading-tight text-muted", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "block", children: m.available }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "block", children: m.ofTotal(capacity) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid place-items-center py-1", children: gauge === "radial" ? /* @__PURE__ */ jsxRuntime.jsx(RadialGauge, { label: title, value: used, max, size, thresholds, formatValue: (v) => String(Math.round(v)), unit: max === 100 ? "%" : void 0, animate }) : /* @__PURE__ */ jsxRuntime.jsx(
      chunkKE2LK6EC_cjs.ThresholdDonut,
      {
        label: title,
        value: used,
        max,
        warnAt,
        dangerAt,
        okTone,
        size,
        legend: false,
        centerText,
        subtext: used$,
        animate,
        tooltip
      }
    ) }),
    history2 && history2.length > 1 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-1", children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Sparkline, { data: history2, label: m.trend(title), area: true, animate, tooltip, formatValue, xLabels, className: "h-12 w-full" }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted", children: rangeLabel ?? m.range })
    ] })
  ] });
}
function ObjectHeader({ breadcrumb = [], title, onSwitch, switchIcon, switchLabel, actions, breadcrumbLabel, headingLevel = 1, className }) {
  const { t } = useLaf7();
  const H = `h${headingLevel}`;
  return /* @__PURE__ */ jsxRuntime.jsxs("header", { className: chunkFTHFEMX6_cjs.cn("border-b border-line bg-surface", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 px-5 py-3", children: [
      breadcrumb.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Breadcrumb, { items: breadcrumb.map((b) => ({ ...b, current: false })), label: breadcrumbLabel }),
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { "aria-hidden": true, className: "size-4 shrink-0 text-subtle rtl:rotate-180" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(H, { className: "m-0 min-w-0 text-2xl leading-tight font-normal break-words text-fg", children: title }),
      onSwitch && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.IconButton, { variant: "secondary", size: "sm", label: switchLabel ?? t.components.overview.switchObject, icon: switchIcon ?? /* @__PURE__ */ jsxRuntime.jsx(SwitchGlyph, {}), onClick: onSwitch })
    ] }),
    actions && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex min-w-0 justify-end border-t border-line px-5 py-3", children: actions })
  ] });
}
function SwitchGlyph() {
  return /* @__PURE__ */ jsxRuntime.jsx("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "square", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M4 8h15m-4-4 4 4-4 4M20 16H5m4-4-4 4 4 4" }) });
}
function ActionToolbar({ actions, label, size, className }) {
  const { t } = useLaf7();
  return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "group", "aria-label": label ?? t.components.overview.actions, className: chunkFTHFEMX6_cjs.cn("flex min-w-0 flex-wrap items-center justify-end gap-2", className), children: actions.map((a) => {
    const variant = a.variant ?? "secondary";
    const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      a.icon,
      a.label
    ] });
    return a.menu ? /* @__PURE__ */ jsxRuntime.jsx(
      chunkGEJA4YGN_cjs.SplitButton,
      {
        variant,
        size,
        disabled: a.disabled,
        onClick: () => a.onClick?.(),
        menuLabel: a.menuLabel ?? t.components.overview.actionOptions(a.label),
        menu: a.menu.map((m) => /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DropdownMenuItem, { danger: m.danger, disabled: m.disabled, onSelect: () => m.onSelect?.(), children: [
          m.icon,
          m.label
        ] }, m.id)),
        children: content
      },
      a.id
    ) : /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant, size, disabled: a.disabled, onClick: () => a.onClick?.(), children: content }, a.id);
  }) });
}

// lib/messages/settings.en.ts
var settingsEn = {
  dialog: {
    sections: "Sections",
    apply: "Apply",
    reset: "Reset",
    cancel: "Cancel",
    ok: "OK",
    errors: (n) => n === 1 ? "1 error" : `${n} errors`,
    unsaved: "Unsaved changes"
  },
  row: {
    overridden: "Overridden",
    inherited: "Inherited",
    resetToDefault: "Reset to default",
    resetNamed: (name) => `Reset ${name} to default`
  },
  deviceList: {
    add: "Add",
    edit: "Edit",
    editNamed: (name) => `Edit ${name}`,
    done: "Done",
    remove: "Remove",
    removeNamed: (name) => `Remove ${name}`,
    removeSelected: (n) => `Remove selected (${n})`,
    moveUp: (name) => `Move ${name} up`,
    moveDown: (name) => `Move ${name} down`,
    selectRow: (name) => `Select ${name}`,
    selectAll: "Select all",
    actions: "Actions",
    status: "Status",
    empty: "No devices",
    emptyHint: "Add a device to get started."
  }
};
function useSettingsText() {
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const over = t.components.settings;
  return React31__namespace.useMemo(
    () => Object.fromEntries(
      Object.entries(settingsEn).map(([k, v]) => [k, { ...v, ...over?.[k] }])
    ),
    [over]
  );
}
function SettingsSection({ id, title, description, children, className }) {
  const headId = `${id}-heading`;
  return /* @__PURE__ */ jsxRuntime.jsxs("section", { id: `${id}-panel`, "aria-labelledby": headId, className: chunkFTHFEMX6_cjs.cn("grid min-w-0 content-start gap-3", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("h3", { id: headId, className: "text-base font-semibold text-fg", children: title }),
      description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-0.5 text-sm text-muted", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid min-w-0 divide-y divide-line", children })
  ] });
}
function SettingRow({ label, help, htmlFor, error, overridden, onReset, layout = "auto", className, children }) {
  const t = useSettingsText().row;
  const uid = React31__namespace.useId();
  const labelId = `${uid}-label`;
  const helpId = `${uid}-help`;
  const errId = `${uid}-err`;
  const describedBy = [help ? helpId : null, error ? errId : null].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("@container min-w-0 py-3 first:pt-0 last:pb-0", className), children: /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: chunkFTHFEMX6_cjs.cn(
        "grid min-w-0 gap-2",
        layout === "inline" && "grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-x-4",
        layout === "auto" && "@lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] @lg:items-start @lg:gap-x-4"
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx("label", { id: labelId, htmlFor, className: "text-sm font-medium text-fg", children: label }),
            overridden !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Badge, { tone: overridden ? "primary" : "neutral", children: overridden ? t.overridden : t.inherited }),
            overridden && onReset && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", "aria-label": t.resetNamed(label), onClick: onReset, children: t.resetToDefault })
          ] }),
          help && /* @__PURE__ */ jsxRuntime.jsx("p", { id: helpId, className: "mt-0.5 text-xs text-muted", children: help })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-labelledby": labelId, "aria-describedby": describedBy, className: "grid min-w-0 gap-1", children: [
          children,
          error && /* @__PURE__ */ jsxRuntime.jsx("p", { id: errId, className: "field-error", role: "alert", children: error })
        ] })
      ]
    }
  ) });
}
function SettingsDialog({
  title,
  description,
  sections,
  open,
  onOpenChange,
  dirty = false,
  onApply,
  onReset,
  onCancel,
  size = "xl",
  activeSection,
  defaultActiveSection,
  onActiveSectionChange,
  className
}) {
  const t = useSettingsText().dialog;
  const [activeId, setActive] = chunkS4QID4TP_cjs.useControllableState({
    value: activeSection,
    defaultValue: defaultActiveSection ?? sections[0]?.id ?? "",
    onChange: onActiveSectionChange
  });
  const [busy, setBusy] = React31__namespace.useState(false);
  const guard = useUnsavedChangesGuard(dirty && !!open);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];
  const close = () => {
    onCancel?.();
    onOpenChange?.(false);
  };
  const cancel = () => guard.guard(close);
  const apply = async () => {
    const bad = sections.find((s) => (s.errorCount ?? 0) > 0);
    if (bad) {
      setActive(bad.id);
      return false;
    }
    setBusy(true);
    try {
      await onApply?.();
      return true;
    } catch {
      return false;
    } finally {
      setBusy(false);
    }
  };
  const ok = async () => {
    if (busy) return;
    if (!dirty || await apply()) onOpenChange?.(false);
  };
  const footer = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex w-full flex-wrap items-center gap-2", children: [
    dirty && /* @__PURE__ */ jsxRuntime.jsx("span", { role: "status", className: "text-xs text-muted", children: t.unsaved }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "ms-auto flex flex-wrap justify-end gap-2", children: [
      onReset && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", disabled: !dirty || busy, onClick: onReset, children: t.reset }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", disabled: busy, onClick: cancel, children: t.cancel }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", disabled: !dirty, loading: busy, onClick: () => void apply(), children: t.apply }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { disabled: busy, onClick: () => void ok(), children: t.ok })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Dialog, { open, onOpenChange: (o) => o ? onOpenChange?.(true) : cancel(), children: /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.DialogContent, { title, description, size, footer, children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("@container grid min-w-0 gap-4 @2xl:grid-cols-[13rem_minmax(0,1fr)] @2xl:gap-6", className), children: [
      /* @__PURE__ */ jsxRuntime.jsx("nav", { "aria-label": t.sections, className: "min-w-0 @2xl:sticky @2xl:top-0 @2xl:self-start", children: /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "m-0 flex list-none flex-row flex-wrap gap-1 p-0 @2xl:flex-col", children: sections.map((s) => {
        const current = s.id === active?.id;
        const errs = s.errorCount ?? 0;
        return /* @__PURE__ */ jsxRuntime.jsx("li", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            "aria-current": current ? "page" : void 0,
            onClick: () => setActive(s.id),
            className: chunkFTHFEMX6_cjs.cn(
              "flex w-full min-w-0 items-center gap-2 rounded-sm border border-transparent bg-transparent px-2.5 py-1.5 text-start text-sm text-fg hover:bg-muted-bg focus-visible:outline-2 focus-visible:outline-primary",
              current && "border-line bg-muted-bg font-medium"
            ),
            children: [
              s.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: "inline-flex shrink-0 text-muted", children: s.icon }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1 truncate", children: s.title }),
              errs > 0 && /* @__PURE__ */ jsxRuntime.jsxs(chunkGEJA4YGN_cjs.Badge, { tone: "danger", children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, children: errs }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: t.errors(errs) })
              ] })
            ]
          }
        ) }, s.id);
      }) }) }),
      active && /* @__PURE__ */ jsxRuntime.jsx(SettingsSection, { id: active.id, title: active.title, description: active.description, children: active.children }, active.id)
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(UnsavedChangesDialog, { guard })
  ] }) });
}
function DeviceList({
  label,
  value,
  onChange,
  getId,
  getLabel,
  columns,
  status,
  renderEditor,
  onAdd,
  addLabel,
  reorderable = true,
  selectable = true,
  canRemove,
  emptyTitle,
  emptyDescription,
  className
}) {
  const t = useSettingsText().deviceList;
  const [selected, setSelected] = React31__namespace.useState([]);
  const [expanded, setExpanded] = React31__namespace.useState(null);
  const nameOf = (item) => getLabel?.(item) ?? getId(item);
  const ids = value.map(getId);
  const live = selected.filter((id) => ids.includes(id));
  const removable = (item) => canRemove?.(item) ?? true;
  const bulkIds = value.filter((i) => live.includes(getId(i)) && removable(i)).map(getId);
  const move = (index, by) => {
    const next = value.slice();
    const [item] = next.splice(index, 1);
    next.splice(index + by, 0, item);
    onChange(next);
  };
  const remove = (removeIds) => {
    onChange(value.filter((i) => !removeIds.includes(getId(i))));
    setSelected((s) => s.filter((id) => !removeIds.includes(id)));
    setExpanded((e) => e && removeIds.includes(e) ? null : e);
  };
  const add = async () => {
    const item = await onAdd?.();
    if (item === void 0) return;
    onChange([...value, item]);
    if (renderEditor) setExpanded(getId(item));
  };
  const colSpan = columns.length + (selectable ? 1 : 0) + (status ? 1 : 0) + 1;
  const addButton = onAdd && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { "aria-hidden": true }), onClick: () => void add(), children: addLabel ?? t.add });
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid min-w-0 gap-2", className), children: [
    (addButton || selectable && value.length > 0) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      addButton,
      selectable && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "danger", disabled: bulkIds.length === 0, leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { "aria-hidden": true }), onClick: () => remove(bulkIds), children: t.removeSelected(bulkIds.length) })
    ] }),
    value.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.EmptyState, { title: emptyTitle ?? t.empty, description: emptyDescription ?? t.emptyHint, action: addButton || void 0 }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative min-w-0 overflow-x-auto rounded-sm border border-line", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "w-full border-collapse text-sm", "aria-label": label, children: [
      /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "border-b border-line text-start text-xs text-muted", children: [
        selectable && /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "w-8 p-2 text-start", children: /* @__PURE__ */ jsxRuntime.jsx(
          chunkGEJA4YGN_cjs.Checkbox,
          {
            "aria-label": t.selectAll,
            checked: live.length === value.length,
            onChange: (e) => setSelected(e.target.checked ? ids : [])
          }
        ) }),
        status && /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "w-8 p-2 text-start", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: t.status }) }),
        columns.map((c) => /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: chunkFTHFEMX6_cjs.cn("p-2 text-start font-medium", c.className), children: c.header }, c.id)),
        /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "p-2 text-end", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: t.actions }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: value.map((item, index) => {
        const id = getId(item);
        const name = nameOf(item);
        const open = expanded === id && !!renderEditor;
        const st = status?.(item);
        return /* @__PURE__ */ jsxRuntime.jsxs(React31__namespace.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "border-b border-line last:border-b-0", children: [
            selectable && /* @__PURE__ */ jsxRuntime.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntime.jsx(
              chunkGEJA4YGN_cjs.Checkbox,
              {
                "aria-label": t.selectRow(name),
                checked: live.includes(id),
                onChange: (e) => setSelected((s) => e.target.checked ? [...s, id] : s.filter((x) => x !== id))
              }
            ) }),
            st && /* @__PURE__ */ jsxRuntime.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.StatusDot, { tone: st.tone, label: st.label, srOnly: true }) }),
            columns.map((c) => /* @__PURE__ */ jsxRuntime.jsx("td", { className: chunkFTHFEMX6_cjs.cn("p-2", c.className), children: c.cell(item) }, c.id)),
            /* @__PURE__ */ jsxRuntime.jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-nowrap justify-end gap-0.5", children: [
              reorderable && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", className: "px-0", "aria-label": t.moveUp(name), disabled: index === 0, onClick: () => move(index, -1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { "aria-hidden": true }) }),
                /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", className: "px-0", "aria-label": t.moveDown(name), disabled: index === value.length - 1, onClick: () => move(index, 1), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { "aria-hidden": true }) })
              ] }),
              renderEditor && /* @__PURE__ */ jsxRuntime.jsx(
                chunkIP6HZMS5_cjs.Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "px-0",
                  "aria-label": t.editNamed(name),
                  "aria-expanded": open,
                  onClick: () => setExpanded(open ? null : id),
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Pencil, { "aria-hidden": true })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", className: "px-0", "aria-label": t.removeNamed(name), disabled: !removable(item), onClick: () => remove([id]), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { "aria-hidden": true }) })
            ] }) })
          ] }),
          open && /* @__PURE__ */ jsxRuntime.jsx("tr", { className: "border-b border-line bg-muted-bg/40 last:border-b-0", children: /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan, className: "p-3", children: renderEditor(item, (next) => onChange(value.map((v, i) => i === index ? next : v))) }) })
        ] }, id);
      }) })
    ] }) })
  ] });
}

// lib/messages/autocomplete.en.ts
var autocompleteEn = {
  autocomplete: {
    clear: "Clear",
    create: (q) => `Create \u201C${q}\u201D`,
    empty: "No results",
    loading: "Loading\u2026",
    error: "Couldn't load options",
    retry: "Retry",
    remove: (name) => `Remove ${name}`,
    toggle: "Show options"
  },
  chips: {
    duplicate: (tag) => `\u201C${tag}\u201D is already added`,
    max: (n) => `At most ${n} items allowed`,
    invalid: (tag) => `\u201C${tag}\u201D is not valid`,
    remove: (tag) => `Remove ${tag}`
  },
  quickSearch: {
    label: "Search inventory",
    placeholder: "Search inventory\u2026",
    loading: "Searching\u2026",
    empty: (q) => `No results for \u201C${q}\u201D`,
    error: "Search failed",
    retry: "Retry",
    recent: "Recent searches",
    clearRecent: "Clear recent searches",
    hint: "Type to search VMs, hosts, datastores and networks",
    results: (n) => n === 1 ? "1 result" : `${n} results`
  }
};
function useMessages() {
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const over = t.components.autocomplete;
  return React31__namespace.useMemo(() => Object.fromEntries(Object.entries(autocompleteEn).map(([k, v]) => [k, { ...v, ...over?.[k] }])), [over]);
}
function useAsyncSource(load, query, enabled, debounceMs) {
  const [state, setState] = React31__namespace.useState({ items: [], loading: false, error: null });
  const [attempt, setAttempt] = React31__namespace.useState(0);
  const loadRef = React31__namespace.useRef(load);
  loadRef.current = load;
  const active = !!load && enabled;
  React31__namespace.useEffect(() => {
    if (!active) {
      setState((s) => s.loading || s.error ? { ...s, loading: false, error: null } : s);
      return;
    }
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    const timer = window.setTimeout(async () => {
      try {
        const items = await loadRef.current(query, controller.signal);
        if (!controller.signal.aborted) setState({ items, loading: false, error: null });
      } catch (error) {
        if (!controller.signal.aborted) setState((s) => ({ ...s, loading: false, error }));
      }
    }, debounceMs);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [active, query, debounceMs, attempt]);
  const retry = React31__namespace.useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}
var optionId = (listId, i) => `${listId}-opt-${i}`;
function Popup({ open, onOpenChange, anchor, anchorRef, children, className }) {
  const container = chunkQQA4GJXV_cjs.usePortalContainer();
  return /* @__PURE__ */ jsxRuntime.jsxs(PopoverPrimitive__namespace.Root, { open, onOpenChange, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { asChild: true, children: anchor }),
    /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { container, children: /* @__PURE__ */ jsxRuntime.jsx(
      PopoverPrimitive__namespace.Content,
      {
        sideOffset: 4,
        align: "start",
        collisionPadding: 8,
        onOpenAutoFocus: (e) => e.preventDefault(),
        onCloseAutoFocus: (e) => e.preventDefault(),
        onInteractOutside: (e) => {
          if (anchorRef.current?.contains(e.target)) e.preventDefault();
        },
        className: chunkFTHFEMX6_cjs.cn("z-50 min-w-(--radix-popover-trigger-width) max-w-[min(32rem,calc(100vw-1rem))]", className),
        children
      }
    ) })
  ] });
}
function ListboxBody({
  listId,
  label,
  sections,
  active,
  onActive,
  multiselectable,
  busy,
  status,
  footer
}) {
  let index = 0;
  const hasEntries = sections.some((s) => s.entries.length);
  const renderEntry = (e) => {
    const i = index++;
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        id: optionId(listId, i),
        role: "option",
        "aria-selected": e.selected ?? false,
        "aria-disabled": e.disabled || void 0,
        "data-active": i === active || void 0,
        onMouseDown: (ev) => ev.preventDefault(),
        onMouseMove: () => i !== active && !e.disabled && onActive(i),
        onClick: () => !e.disabled && e.onPick(),
        className: "dropdown-item cursor-pointer py-1.5 data-[active]:bg-surface-hover data-[active]:text-fg aria-disabled:cursor-default aria-disabled:opacity-50",
        children: e.node
      },
      e.key
    );
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "dropdown-menu max-h-72 w-full overflow-auto", children: [
    hasEntries && /* @__PURE__ */ jsxRuntime.jsx("div", { id: listId, role: "listbox", "aria-label": label, "aria-multiselectable": multiselectable || void 0, "aria-busy": busy || void 0, children: sections.map(
      (s) => s.heading ? /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-labelledby": `${listId}-h-${s.key}`, children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { id: `${listId}-h-${s.key}`, role: "presentation", className: "dropdown-label", children: s.heading }),
        s.entries.map(renderEntry)
      ] }, s.key) : s.entries.map(renderEntry)
    ) }),
    status && /* @__PURE__ */ jsxRuntime.jsxs("div", { role: status.kind === "error" ? "alert" : "status", className: chunkFTHFEMX6_cjs.cn("flex items-center gap-2 px-3 py-2 text-sm", status.kind === "error" ? "text-danger" : "text-muted"), children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: status.text }),
      status.retry && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "ms-auto text-primary hover:underline", onMouseDown: (e) => e.preventDefault(), onClick: status.retry.onClick, children: status.retry.label })
    ] }),
    footer
  ] });
}
var flatten = (sections) => sections.flatMap((s) => s.entries);
function scrollActiveIntoView(listId, active) {
  if (active >= 0) document.getElementById(optionId(listId, active))?.scrollIntoView?.({ block: "nearest" });
}
var defaultFilter = (o, q) => !q || `${o.label} ${o.description ?? ""}`.toLowerCase().includes(q.toLowerCase());
function Autocomplete(props) {
  const { label, options = [], loadOptions, debounceMs = 250, minChars = 0, filter = defaultFilter, freeSolo, onCreate, clearable, placeholder, disabled, invalid, renderOption, open: openProp, onOpenChange, id, className, multiple } = props;
  const m = useMessages().autocomplete;
  const listId = React31__namespace.useId();
  const anchorRef = React31__namespace.useRef(null);
  const inputRef = React31__namespace.useRef(null);
  const [raw, setRaw] = chunkS4QID4TP_cjs.useControllableState({
    value: props.value,
    defaultValue: props.defaultValue ?? (multiple ? [] : null),
    onChange: props.onChange
  });
  const selected = React31__namespace.useMemo(() => multiple ? raw ?? [] : raw ? [raw] : [], [raw, multiple]);
  const commit = (list2) => setRaw(multiple ? list2 : list2[0] ?? null);
  const [open, setOpen] = chunkS4QID4TP_cjs.useControllableState({ value: openProp, defaultValue: false, onChange: onOpenChange });
  const [text, setText] = React31__namespace.useState("");
  const [typing, setTyping] = React31__namespace.useState(false);
  const [active, setActive] = React31__namespace.useState(0);
  const query = typing ? text.trim() : "";
  const inputValue = typing ? text : multiple ? "" : selected[0]?.label ?? "";
  const canCreate = !!freeSolo || !!onCreate;
  const remote = useAsyncSource(loadOptions, query, open && query.length >= minChars, debounceMs);
  const list = React31__namespace.useMemo(() => loadOptions ? remote.items : options.filter((o) => filter(o, query)), [loadOptions, remote.items, options, filter, query]);
  const isSelected = (o) => selected.some((s) => s.value === o.value);
  const closeAndReset = () => {
    setOpen(false);
    setTyping(false);
    setText("");
  };
  const pick = (o) => {
    if (o.disabled) return;
    if (multiple) {
      commit(isSelected(o) ? selected.filter((s) => s.value !== o.value) : [...selected, o]);
      setText("");
      setTyping(false);
    } else {
      commit([o]);
      closeAndReset();
    }
  };
  const create = (q) => {
    const existing = list.find((o) => o.label.toLowerCase() === q.toLowerCase());
    if (existing) return pick(existing);
    const made = onCreate?.(q) ?? { value: q, label: q };
    if (multiple && isSelected(made)) return setText("");
    pick(made);
  };
  const showCreate = canCreate && !!query && !list.some((o) => o.label.toLowerCase() === query.toLowerCase());
  const sections = React31__namespace.useMemo(() => {
    const groups = /* @__PURE__ */ new Map();
    for (const o of list) {
      const g = o.group ?? "";
      const sel = isSelected(o);
      const entry = {
        key: o.value,
        disabled: o.disabled,
        selected: sel,
        onPick: () => pick(o),
        node: renderOption ? renderOption(o, { selected: sel }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: o.label }),
          o.description && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-2 text-xs text-subtle", children: o.description })
        ] })
      };
      groups.set(g, [...groups.get(g) ?? [], entry]);
    }
    const out = [...groups.entries()].map(([g, entries2]) => ({ key: g || "_", heading: g || void 0, entries: entries2 }));
    if (showCreate) out.push({ key: "__create", entries: [{ key: "__create", onPick: () => create(query), node: m.create(query) }] });
    return out;
  }, [list, showCreate, query, selected, renderOption, m]);
  const entries = flatten(sections);
  React31__namespace.useEffect(() => {
    setActive(freeSolo && query ? -1 : 0);
  }, [query, freeSolo, open]);
  React31__namespace.useEffect(() => {
    if (active >= entries.length) setActive(entries.length - 1);
  }, [active, entries.length]);
  React31__namespace.useEffect(() => scrollActiveIntoView(listId, active), [listId, active]);
  const loading = !!loadOptions && remote.loading;
  const status = remote.error ? { kind: "error", text: m.error, retry: { label: m.retry, onClick: remote.retry } } : loading && !entries.length ? { kind: "loading", text: m.loading } : !entries.length ? { kind: "empty", text: m.empty } : null;
  const move = (delta) => {
    if (!open) return setOpen(true);
    if (!entries.length) return;
    const len = entries.length;
    let i = active === -1 && delta < 0 ? len : active;
    for (let n = 0; n < len; n++) {
      i = (i + delta + len) % len;
      if (!entries[i].disabled) break;
    }
    setActive(i);
  };
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        return move(1);
      case "ArrowUp":
        e.preventDefault();
        return move(-1);
      case "Home":
      case "End":
        if (!open || !entries.length) return;
        e.preventDefault();
        return setActive(e.key === "Home" ? 0 : entries.length - 1);
      case "Enter":
        if (open && active >= 0 && entries[active]) {
          e.preventDefault();
          entries[active].onPick();
        } else if (freeSolo && query) {
          e.preventDefault();
          create(query);
        }
        return;
      case "Escape":
        if (open) {
          e.preventDefault();
          closeAndReset();
        }
        return;
      case "Backspace":
        if (multiple && !text && selected.length) commit(selected.slice(0, -1));
        return;
    }
  };
  const hasValue = selected.length > 0 || !!text;
  const expanded = open && (entries.length > 0 || !!status);
  return /* @__PURE__ */ jsxRuntime.jsx(
    Popup,
    {
      open: expanded,
      onOpenChange: (o) => !o && closeAndReset(),
      anchorRef,
      anchor: /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: anchorRef, className: chunkFTHFEMX6_cjs.cn("form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", invalid && "error", disabled && "opacity-60", className), children: [
        multiple && selected.map((s) => /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Chip, { removeLabel: m.remove(s.label), onRemove: disabled ? void 0 : () => commit(selected.filter((x) => x.value !== s.value)), children: s.label }, s.value)),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref: inputRef,
            id,
            role: "combobox",
            "aria-label": label,
            "aria-autocomplete": "list",
            "aria-haspopup": "listbox",
            "aria-expanded": expanded,
            "aria-controls": expanded && entries.length ? listId : void 0,
            "aria-activedescendant": expanded && active >= 0 && entries[active] ? optionId(listId, active) : void 0,
            "aria-invalid": invalid || void 0,
            autoComplete: "off",
            className: "min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none",
            placeholder: multiple && selected.length ? void 0 : placeholder,
            disabled,
            value: inputValue,
            onChange: (e) => {
              setText(e.target.value);
              setTyping(true);
              setOpen(true);
            },
            onFocus: () => setOpen(true),
            onBlur: closeAndReset,
            onKeyDown
          }
        ),
        clearable && hasValue && !disabled && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": m.clear,
            className: "text-muted hover:text-fg",
            onMouseDown: (e) => e.preventDefault(),
            onClick: () => {
              commit([]);
              setText("");
              setTyping(false);
              inputRef.current?.focus();
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-3.5", "aria-hidden": true })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            tabIndex: -1,
            "aria-label": m.toggle,
            disabled,
            className: "text-muted",
            onMouseDown: (e) => e.preventDefault(),
            onClick: () => {
              inputRef.current?.focus();
              setOpen(!open);
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "size-4", "aria-hidden": true })
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntime.jsx(ListboxBody, { listId, label, sections, active, onActive: setActive, multiselectable: multiple, busy: loading, status })
    }
  );
}
function ChipsInput({
  value: valueProp,
  defaultValue,
  onChange,
  label,
  placeholder,
  max,
  validate,
  keepInvalid,
  duplicates = "reject",
  delimiters = ["Enter", ","],
  splitPattern = /[,\s]+/,
  addOnBlur = true,
  icon,
  normalize,
  disabled,
  className
}) {
  const m = useMessages().chips;
  const [value, setValue] = chunkS4QID4TP_cjs.useControllableState({ value: valueProp, defaultValue: defaultValue ?? [], onChange });
  const [text, setText] = React31__namespace.useState("");
  const [error, setError] = React31__namespace.useState();
  const errorId = React31__namespace.useId();
  const invalidMsg = (chip) => validate?.(chip);
  const add = (raw) => {
    const chips = raw.split(splitPattern).map((c) => normalize ? normalize(c.trim()) : c.trim()).filter(Boolean);
    if (!chips.length) return setText("");
    const next = [...value];
    for (const c of chips) {
      if (next.includes(c) && duplicates !== "allow") {
        if (duplicates === "ignore") continue;
        return setError(m.duplicate(c));
      }
      const err = invalidMsg(c);
      if (err && !keepInvalid) return setError(err);
      if (max !== void 0 && next.length >= max) return setError(m.max(max));
      next.push(c);
    }
    setError(void 0);
    setValue(next);
    setText("");
  };
  const remove = (i) => {
    setError(void 0);
    setValue(value.filter((_, j) => j !== i));
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid gap-1", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", error && "error", disabled && "opacity-60"), children: [
      value.map((c, i) => {
        const err = invalidMsg(c);
        return /* @__PURE__ */ jsxRuntime.jsx("span", { title: err, "data-invalid": err ? "" : void 0, className: "inline-flex", children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Chip, { tone: err ? "danger" : "neutral", icon: icon?.(c), removeLabel: m.remove(c), onRemove: disabled ? void 0 : () => remove(i), children: c }) }, `${c}-${i}`);
      }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          "aria-label": label,
          "aria-invalid": !!error || void 0,
          "aria-describedby": error ? errorId : void 0,
          placeholder,
          disabled,
          className: "min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none",
          value: text,
          onChange: (e) => {
            setText(e.target.value);
            if (error) setError(void 0);
          },
          onBlur: () => addOnBlur && text.trim() && add(text),
          onKeyDown: (e) => {
            if (delimiters.includes(e.key) && text.trim()) {
              e.preventDefault();
              add(text);
            } else if (e.key === "Backspace" && !text && value.length) remove(value.length - 1);
          },
          onPaste: (e) => {
            const pasted = e.clipboardData.getData("text");
            if (!pasted) return;
            e.preventDefault();
            add(text + pasted);
          }
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntime.jsx("p", { id: errorId, className: "field-error", role: "alert", children: error })
  ] });
}
function QuickSearch({ search, onSelect, recent: recentProp, onRecentChange, maxRecent = 5, debounceMs = 200, hotkey = true, label: labelProp, placeholder, className }) {
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const m = useMessages().quickSearch;
  const label = labelProp ?? m.label;
  const listId = React31__namespace.useId();
  const anchorRef = React31__namespace.useRef(null);
  const inputRef = React31__namespace.useRef(null);
  const [query, setQuery] = React31__namespace.useState("");
  const [open, setOpen] = React31__namespace.useState(false);
  const [active, setActive] = React31__namespace.useState(0);
  const [recent, setRecent] = chunkS4QID4TP_cjs.useControllableState({ value: recentProp, defaultValue: [], onChange: onRecentChange });
  const [shortcut, setShortcut] = React31__namespace.useState("Ctrl K");
  React31__namespace.useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("\u2318K");
  }, []);
  React31__namespace.useEffect(() => {
    if (!hotkey) return;
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotkey]);
  const q = query.trim();
  const remote = useAsyncSource(search, q, open && !!q, debounceMs);
  const results = q ? remote.items : [];
  const choose = (r) => {
    setRecent([r, ...recent.filter((x) => x.id !== r.id)].slice(0, maxRecent));
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
    onSelect(r);
  };
  const sections = React31__namespace.useMemo(() => {
    const toEntry = (r) => ({
      key: r.id,
      onPick: () => choose(r),
      node: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkVUZVPUQ7_cjs.ObjectIcon, { kind: r.kind, state: r.state }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 truncate font-medium", children: r.name }),
        r.path && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 truncate text-xs text-subtle", children: r.path }),
        r.state && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ms-auto shrink-0 text-xs text-muted", children: t[chunkVUZVPUQ7_cjs.objectStateMeta[r.state].text] })
      ] })
    });
    if (!q) return recent.length ? [{ key: "recent", heading: m.recent, entries: recent.map(toEntry) }] : [];
    const groups = /* @__PURE__ */ new Map();
    for (const r of results) groups.set(r.group ?? r.kind, [...groups.get(r.group ?? r.kind) ?? [], r]);
    return [...groups.entries()].map(([g, items]) => ({ key: g, heading: g, entries: items.map(toEntry) }));
  }, [q, recent, results, m, t]);
  const entries = flatten(sections);
  React31__namespace.useEffect(() => setActive(0), [q, open]);
  React31__namespace.useEffect(() => {
    if (active >= entries.length) setActive(Math.max(0, entries.length - 1));
  }, [active, entries.length]);
  React31__namespace.useEffect(() => scrollActiveIntoView(listId, active), [listId, active]);
  const loading = !!q && remote.loading;
  const status = q ? remote.error ? { kind: "error", text: m.error, retry: { label: m.retry, onClick: remote.retry } } : loading && !entries.length ? { kind: "loading", text: m.loading } : !entries.length ? { kind: "empty", text: m.empty(q) } : null : entries.length ? null : { kind: "empty", text: m.hint };
  const expanded = open;
  const onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!open) return setOpen(true);
        if (entries.length) setActive((i) => (i + (e.key === "ArrowDown" ? 1 : -1) + entries.length) % entries.length);
        return;
      }
      case "Enter":
        if (open && entries[active]) {
          e.preventDefault();
          entries[active].onPick();
        }
        return;
      case "Escape":
        if (open) setOpen(false);
        else if (query) setQuery("");
        else inputRef.current?.blur();
        e.preventDefault();
        return;
    }
  };
  const footer = !q && recent.length ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border-t border-line px-3 py-1.5", children: /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "text-xs text-primary hover:underline", onMouseDown: (e) => e.preventDefault(), onClick: () => setRecent([]), children: m.clearRecent }) }) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Popup,
    {
      open: expanded,
      onOpenChange: setOpen,
      anchorRef,
      anchor: /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: anchorRef, role: "search", className: chunkFTHFEMX6_cjs.cn("form-input flex w-full max-w-full items-center gap-2 transition-[width] focus-within:border-primary sm:w-48 sm:focus-within:w-72", className), children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "size-4 shrink-0 text-muted", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref: inputRef,
            role: "combobox",
            "aria-label": label,
            "aria-autocomplete": "list",
            "aria-haspopup": "listbox",
            "aria-expanded": expanded,
            "aria-controls": expanded && entries.length ? listId : void 0,
            "aria-activedescendant": expanded && entries[active] ? optionId(listId, active) : void 0,
            autoComplete: "off",
            className: "min-w-0 flex-1 border-0 bg-transparent p-0 text-fg outline-none",
            placeholder: placeholder ?? m.placeholder,
            value: query,
            onChange: (e) => {
              setQuery(e.target.value);
              setOpen(true);
            },
            onFocus: () => setOpen(true),
            onBlur: () => setOpen(false),
            onKeyDown
          }
        ),
        hotkey && !open && !query && /* @__PURE__ */ jsxRuntime.jsx(chunkPNRO35YW_cjs.Kbd, { "aria-hidden": true, children: shortcut })
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ListboxBody, { listId, label, sections, active, onActive: setActive, busy: loading, status, footer }),
        q && !loading && !remote.error && entries.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", role: "status", children: m.results(entries.length) })
      ]
    }
  );
}

// lib/messages/realtime.en.ts
var realtimeEn = {
  state: {
    connecting: "Connecting",
    open: "Live",
    reconnecting: "Reconnecting",
    closed: "Disconnected",
    error: "Connection failed"
  },
  badge: {
    group: "Connection status",
    reconnect: "Reconnect",
    announce: (state) => `Connection status: ${state}`,
    offline: "Offline"
  },
  stale: {
    paused: "Live updates paused",
    pausedSince: (ago) => `Live updates paused \u2014 last update ${ago}`,
    reconnect: "Reconnect",
    justNow: "just now",
    seconds: (n) => `${n} s ago`,
    minutes: (n) => `${n} min ago`,
    hours: (n) => `${n} h ago`
  }
};
function useRealtimeText() {
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const over = t.components.realtime;
  return React31__namespace.useMemo(
    () => Object.fromEntries(Object.entries(realtimeEn).map(([k, v]) => [k, { ...v, ...over?.[k] }])),
    [over]
  );
}
function backoffDelay(attempt, { initial = 1e3, max = 3e4, factor = 2, jitter = 0.5 } = {}, random = Math.random) {
  const base = Math.min(max, initial * factor ** Math.max(0, attempt - 1));
  return Math.round(base * (1 - jitter) + base * jitter * random());
}
var isOffline = () => typeof navigator !== "undefined" && navigator.onLine === false;
var isHidden = () => typeof document !== "undefined" && document.visibilityState === "hidden";
function useConnectionState(options) {
  const { enabled = true, pauseWhenHidden = false } = options;
  const opts = React31__namespace.useRef(options);
  opts.current = options;
  const [view, setView] = React31__namespace.useState(() => ({
    state: enabled ? "connecting" : "closed",
    attempt: 0,
    offline: isOffline()
  }));
  const stateRef = React31__namespace.useRef(view.state);
  const listeners = React31__namespace.useRef(/* @__PURE__ */ new Set());
  const api = React31__namespace.useRef({ start() {
  }, stop() {
  } });
  React31__namespace.useEffect(() => {
    let gen = 0;
    let conn;
    let timer;
    let attempt = 0;
    let manualClosed = !enabled;
    let alive = true;
    const patch = (p) => {
      if (!alive) return;
      if (p.state && p.state !== stateRef.current) {
        const prev = stateRef.current;
        stateRef.current = p.state;
        opts.current.onStateChange?.(p.state, prev);
      }
      setView((v) => ({ ...v, ...p }));
    };
    const teardown = () => {
      gen++;
      if (timer !== void 0) clearTimeout(timer);
      timer = void 0;
      const c = conn;
      conn = void 0;
      try {
        c?.close();
      } catch {
      }
    };
    const paused = () => pauseWhenHidden && isHidden();
    const schedule = (error) => {
      attempt += 1;
      const max = opts.current.backoff?.maxAttempts;
      if (max !== void 0 && attempt > max) {
        patch({ state: "error", attempt, nextRetryAt: void 0, error });
        return;
      }
      if (isOffline() || paused()) {
        patch({ state: paused() && !isOffline() ? "closed" : "reconnecting", attempt, nextRetryAt: void 0, error });
        return;
      }
      const delay = backoffDelay(attempt, opts.current.backoff, opts.current.random);
      patch({ state: "reconnecting", attempt, nextRetryAt: Date.now() + delay, error });
      timer = setTimeout(() => {
        timer = void 0;
        start("reconnecting");
      }, delay);
    };
    function start(initial = "connecting") {
      teardown();
      const mine = gen;
      patch({ state: initial, nextRetryAt: void 0 });
      const handlers = {
        open() {
          if (mine !== gen) return;
          attempt = 0;
          patch({ state: "open", attempt: 0, nextRetryAt: void 0, error: void 0 });
          opts.current.onOpen?.();
        },
        message(data) {
          if (mine !== gen) return;
          patch({ lastMessageAt: Date.now() });
          for (const l of [...listeners.current]) l(data);
          opts.current.onMessage?.(data);
        },
        close(error) {
          if (mine !== gen) return;
          teardown();
          opts.current.onClose?.(error);
          schedule(error);
        },
        latency(ms) {
          if (mine === gen) patch({ latency: ms });
        }
      };
      try {
        const c = opts.current.connect(handlers);
        if (mine !== gen) c?.close();
        else conn = c || void 0;
      } catch (e) {
        handlers.close(e);
      }
    }
    const resume = () => {
      if (manualClosed || paused()) return;
      attempt = 0;
      start("connecting");
    };
    const onOffline = () => {
      patch({ offline: true });
      if (manualClosed) return;
      teardown();
      patch({ state: "reconnecting", nextRetryAt: void 0 });
    };
    const onOnline = () => {
      patch({ offline: false });
      resume();
    };
    const onVisibility = () => {
      if (!pauseWhenHidden || manualClosed) return;
      if (isHidden()) {
        teardown();
        patch({ state: "closed", nextRetryAt: void 0 });
      } else if (!isOffline()) resume();
    };
    api.current = {
      start: () => {
        manualClosed = false;
        attempt = 0;
        start("connecting");
      },
      stop: (state) => {
        manualClosed = true;
        teardown();
        patch({ state, nextRetryAt: void 0 });
      }
    };
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    document.addEventListener("visibilitychange", onVisibility);
    if (!manualClosed) {
      if (isOffline()) patch({ state: "reconnecting" });
      else if (paused()) patch({ state: "closed" });
      else start("connecting");
    }
    return () => {
      alive = false;
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
      document.removeEventListener("visibilitychange", onVisibility);
      teardown();
    };
  }, [enabled, pauseWhenHidden]);
  const reconnect = React31__namespace.useCallback(() => api.current.start(), []);
  const close = React31__namespace.useCallback(() => api.current.stop("closed"), []);
  const subscribe = React31__namespace.useCallback((l) => {
    listeners.current.add(l);
    return () => void listeners.current.delete(l);
  }, []);
  return { ...view, reconnect, close, subscribe };
}
var useRealtime = useConnectionState;
var RealtimeContext = React31__namespace.createContext(null);
function RealtimeProvider({ children, ...options }) {
  const value = useConnectionState(options);
  return /* @__PURE__ */ jsxRuntime.jsx(RealtimeContext.Provider, { value, children });
}
function useRealtimeContext() {
  const ctx = React31__namespace.useContext(RealtimeContext);
  if (!ctx) throw new Error("useRealtimeContext must be used inside <RealtimeProvider>");
  return ctx;
}
function useRealtimeMessage(listener) {
  const { subscribe } = useRealtimeContext();
  const ref = React31__namespace.useRef(listener);
  ref.current = listener;
  React31__namespace.useEffect(() => subscribe((d) => ref.current(d)), [subscribe]);
}
var tones = { connecting: "primary", open: "ok", reconnecting: "warn", closed: "neutral", error: "danger" };
function ConnectionBadge({ connection, compact, className }) {
  const text = useRealtimeText();
  const ctx = React31__namespace.useContext(RealtimeContext);
  const conn = connection ?? ctx;
  if (!conn) throw new Error("ConnectionBadge needs a `connection` prop or a <RealtimeProvider>");
  const { state, offline } = conn;
  const label = offline && state !== "open" ? text.badge.offline : text.state[state];
  const [announced, setAnnounced] = React31__namespace.useState("");
  const first = React31__namespace.useRef(true);
  React31__namespace.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setAnnounced(text.badge.announce(text.state[state]));
  }, [state, text]);
  const canReconnect = state !== "open" && state !== "connecting";
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "group", "aria-label": text.badge.group, className: chunkFTHFEMX6_cjs.cn("relative inline-flex items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.StatusDot, { tone: tones[state], pulse: state === "connecting" || state === "reconnecting", label, srOnly: compact }),
    canReconnect && (compact ? /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", "aria-label": text.badge.reconnect, onClick: conn.reconnect, leftIcon: offline ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.WifiOff, { className: "size-4", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RefreshCw, { className: "size-4", "aria-hidden": true }) }) : /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", onClick: conn.reconnect, leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RefreshCw, { className: "size-4", "aria-hidden": true }), children: text.badge.reconnect })),
    /* @__PURE__ */ jsxRuntime.jsx("span", { role: "status", "aria-live": "polite", className: "sr-only", children: announced })
  ] });
}
function useAgo(at, text) {
  const [, tick] = React31__namespace.useReducer((n) => n + 1, 0);
  React31__namespace.useEffect(() => {
    const id = setInterval(tick, 15e3);
    return () => clearInterval(id);
  }, []);
  if (at === void 0) return void 0;
  const s = Math.max(0, Math.round((Date.now() - at) / 1e3));
  if (s < 5) return text.justNow;
  if (s < 60) return text.seconds(s);
  if (s < 3600) return text.minutes(Math.floor(s / 60));
  return text.hours(Math.floor(s / 3600));
}
function StaleDataBanner({ connection, banner, className }) {
  const text = useRealtimeText();
  const ctx = React31__namespace.useContext(RealtimeContext);
  const conn = connection ?? ctx;
  if (!conn) throw new Error("StaleDataBanner needs a `connection` prop or a <RealtimeProvider>");
  const ago = useAgo(conn.lastMessageAt, text.stale);
  if (conn.state === "open" || conn.state === "connecting" && conn.lastMessageAt === void 0) return null;
  const message = ago ? text.stale.pausedSince(ago) : text.stale.paused;
  const action = /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "secondary", size: "sm", onClick: conn.reconnect, leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RefreshCw, { className: "size-4", "aria-hidden": true }), children: text.stale.reconnect });
  const tone = conn.state === "error" ? "danger" : "warning";
  return banner ? /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Banner, { tone, action, className, children: message }) : /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Alert, { tone, role: "status", actions: action, className, children: message });
}

// lib/messages/simple-table.en.ts
var simpleTableEn = {
  table: {
    sortBy: (column) => `Sort by ${column}`,
    selectAll: "Select all rows",
    selectRow: (label) => label ? `Select ${label}` : "Select row",
    actions: "Actions",
    empty: "No rows to show",
    loading: "Loading rows"
  }
};
function useTableText() {
  const { t } = chunkQQA4GJXV_cjs.useLaf();
  const over = t.components.simpleTable;
  return React31__namespace.useMemo(() => ({ ...simpleTableEn.table, ...over?.table }), [over]);
}
var alignClass = { start: "text-start", center: "text-center", end: "text-end" };
function nextSort(current, id) {
  if (current?.id !== id) return { id, direction: "asc" };
  return current.direction === "asc" ? { id, direction: "desc" } : null;
}
function SimpleTable({
  columns,
  rows,
  getRowId,
  sort,
  onSortChange,
  selectable,
  selected,
  onSelectedChange,
  getRowLabel,
  rowActions,
  density = "comfortable",
  stickyHeader,
  maxHeight,
  loading,
  loadingRows = 5,
  empty,
  caption,
  captionHidden,
  pagination,
  className,
  ...rest
}) {
  const text = useTableText();
  const [inner, setInner] = React31__namespace.useState([]);
  const ids = selected ?? inner;
  const setIds = (next) => {
    if (selected === void 0) setInner(next);
    onSelectedChange?.(next);
  };
  const rowIds = rows.map(getRowId);
  const chosen = rowIds.filter((id) => ids.includes(id)).length;
  const allRef = React31__namespace.useRef(null);
  React31__namespace.useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = chosen > 0 && chosen < rowIds.length;
  });
  const toggleAll = () => setIds(chosen === rowIds.length ? ids.filter((id) => !rowIds.includes(id)) : [.../* @__PURE__ */ new Set([...ids, ...rowIds])]);
  const toggleRow = (id) => setIds(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
  const span = columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0);
  const pad2 = density === "dense" ? "[&_td]:px-3 [&_td]:py-1 [&_th]:px-3 [&_th]:py-1.5" : "";
  const thSticky = stickyHeader && "[&_th]:sticky [&_th]:top-0 [&_th]:z-10";
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("relative w-full min-w-0", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("table-wrap relative overflow-x-auto", maxHeight && "overflow-y-auto"), style: maxHeight ? { maxHeight } : void 0, children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: chunkFTHFEMX6_cjs.cn("table", pad2, thSticky), "aria-busy": loading || void 0, "aria-label": rest["aria-label"], children: [
      caption && /* @__PURE__ */ jsxRuntime.jsx("caption", { className: chunkFTHFEMX6_cjs.cn("px-4 py-2 text-start text-sm text-muted", captionHidden && "sr-only"), children: caption }),
      /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
        selectable && /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "w-10", children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Checkbox, { ref: allRef, "aria-label": text.selectAll, checked: rowIds.length > 0 && chosen === rowIds.length, disabled: rowIds.length === 0, onChange: toggleAll }) }),
        columns.map((c) => {
          const active = sort?.id === c.id ? sort : null;
          const name = c.headerText ?? (typeof c.header === "string" ? c.header : c.id);
          return /* @__PURE__ */ jsxRuntime.jsx(
            "th",
            {
              scope: "col",
              "aria-sort": c.sortable ? active ? active.direction === "asc" ? "ascending" : "descending" : "none" : void 0,
              className: chunkFTHFEMX6_cjs.cn(alignClass[c.align ?? "start"], c.className),
              style: c.width !== void 0 ? { width: c.width } : void 0,
              children: c.sortable ? /* @__PURE__ */ jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  "aria-label": text.sortBy(name),
                  onClick: () => onSortChange?.(nextSort(sort, c.id)),
                  className: chunkFTHFEMX6_cjs.cn("inline-flex items-center gap-1 border-0 bg-transparent p-0 font-[inherit] text-[length:inherit] tracking-[inherit] text-inherit uppercase outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50", c.align === "end" && "flex-row-reverse"),
                  children: [
                    c.header,
                    active ? active.direction === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUp, { className: "size-3.5", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowDown, { className: "size-3.5", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsUpDown, { className: "size-3.5 opacity-50", "aria-hidden": true })
                  ]
                }
              ) : c.header
            },
            c.id
          );
        }),
        rowActions && /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "w-px", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: text.actions }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: loading ? Array.from({ length: loadingRows }, (_, i) => /* @__PURE__ */ jsxRuntime.jsx("tr", { children: Array.from({ length: span }, (_2, j) => /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Skeleton, { className: "w-full max-w-40" }) }, j)) }, i)) : rows.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("tr", { children: /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan: span, className: "py-8 text-center text-muted", children: empty ?? text.empty }) }) : rows.map((row, i) => {
        const id = rowIds[i];
        const isSel = ids.includes(id);
        return /* @__PURE__ */ jsxRuntime.jsxs("tr", { "aria-selected": selectable ? isSel : void 0, className: chunkFTHFEMX6_cjs.cn(isSel && "[&_td]:bg-primary-light"), children: [
          selectable && /* @__PURE__ */ jsxRuntime.jsx("td", { className: "w-10", children: /* @__PURE__ */ jsxRuntime.jsx(chunkGEJA4YGN_cjs.Checkbox, { "aria-label": text.selectRow(getRowLabel?.(row)), checked: isSel, onChange: () => toggleRow(id) }) }),
          columns.map((c) => {
            const content = c.cell ? c.cell(row, i) : row[c.id];
            const cls = chunkFTHFEMX6_cjs.cn(alignClass[c.align ?? "start"], c.className);
            return c.rowHeader ? /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "row", className: chunkFTHFEMX6_cjs.cn("border-b border-line bg-transparent px-4 py-3 text-sm font-medium tracking-normal text-fg normal-case", cls), children: content }, c.id) : /* @__PURE__ */ jsxRuntime.jsx("td", { className: cls, children: content }, c.id);
          }),
          rowActions && /* @__PURE__ */ jsxRuntime.jsx("td", { className: "cell-actions text-end whitespace-nowrap", children: rowActions(row) })
        ] }, id);
      }) })
    ] }) }),
    loading && /* @__PURE__ */ jsxRuntime.jsx("span", { role: "status", className: "sr-only", children: text.loading }),
    pagination && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntime.jsx(Pagination, { ...pagination }) })
  ] });
}

Object.defineProperty(exports, "AlarmList", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.AlarmList; }
});
Object.defineProperty(exports, "BarChart", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.BarChart; }
});
Object.defineProperty(exports, "ConfirmDialog", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.ConfirmDialog; }
});
Object.defineProperty(exports, "ConsoleFrame", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.ConsoleFrame; }
});
Object.defineProperty(exports, "CopyButton", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.CopyButton; }
});
Object.defineProperty(exports, "DatastoreBrowser", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.DatastoreBrowser; }
});
Object.defineProperty(exports, "DateTimeInput", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.DateTimeInput; }
});
Object.defineProperty(exports, "DefinitionList", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.DefinitionList; }
});
Object.defineProperty(exports, "Donut", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.Donut; }
});
Object.defineProperty(exports, "ErrorSummary", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.ErrorSummary; }
});
Object.defineProperty(exports, "EventConsole", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.EventConsole; }
});
Object.defineProperty(exports, "FileDropzone", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.FileDropzone; }
});
Object.defineProperty(exports, "FormField", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.FormField; }
});
Object.defineProperty(exports, "Gauge", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.Gauge; }
});
Object.defineProperty(exports, "HardwareEditor", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.HardwareEditor; }
});
Object.defineProperty(exports, "InlineEdit", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.InlineEdit; }
});
Object.defineProperty(exports, "Kbd", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.Kbd; }
});
Object.defineProperty(exports, "PasswordField", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.PasswordField; }
});
Object.defineProperty(exports, "PermissionAssignDialog", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.PermissionAssignDialog; }
});
Object.defineProperty(exports, "Progress", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.Progress; }
});
Object.defineProperty(exports, "SecretDisplay", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.SecretDisplay; }
});
Object.defineProperty(exports, "SnapshotTree", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.SnapshotTree; }
});
Object.defineProperty(exports, "Stepper", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.Stepper; }
});
Object.defineProperty(exports, "TreeView", {
  enumerable: true,
  get: function () { return chunkPNRO35YW_cjs.TreeView; }
});
Object.defineProperty(exports, "Accordion", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Accordion; }
});
Object.defineProperty(exports, "Alert", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Alert; }
});
Object.defineProperty(exports, "AlertGroup", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.AlertGroup; }
});
Object.defineProperty(exports, "Avatar", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Avatar; }
});
Object.defineProperty(exports, "AvatarGroup", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.AvatarGroup; }
});
Object.defineProperty(exports, "Badge", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Badge; }
});
Object.defineProperty(exports, "Banner", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Banner; }
});
Object.defineProperty(exports, "Breadcrumb", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Breadcrumb; }
});
Object.defineProperty(exports, "ButtonGroup", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.ButtonGroup; }
});
Object.defineProperty(exports, "Card", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Card; }
});
Object.defineProperty(exports, "CardActions", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.CardActions; }
});
Object.defineProperty(exports, "CardBody", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.CardBody; }
});
Object.defineProperty(exports, "CardDescription", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.CardDescription; }
});
Object.defineProperty(exports, "CardFooter", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.CardFooter; }
});
Object.defineProperty(exports, "CardGrid", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.CardGrid; }
});
Object.defineProperty(exports, "CardHeader", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.CardHeader; }
});
Object.defineProperty(exports, "CardTitle", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.CardTitle; }
});
Object.defineProperty(exports, "Checkbox", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Checkbox; }
});
Object.defineProperty(exports, "Chip", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Chip; }
});
Object.defineProperty(exports, "Combobox", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Combobox; }
});
Object.defineProperty(exports, "Dialog", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Dialog; }
});
Object.defineProperty(exports, "DialogClose", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DialogClose; }
});
Object.defineProperty(exports, "DialogContent", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DialogContent; }
});
Object.defineProperty(exports, "DialogTrigger", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DialogTrigger; }
});
Object.defineProperty(exports, "Drawer", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Drawer; }
});
Object.defineProperty(exports, "DrawerClose", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DrawerClose; }
});
Object.defineProperty(exports, "DrawerContent", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DrawerContent; }
});
Object.defineProperty(exports, "DrawerTrigger", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DrawerTrigger; }
});
Object.defineProperty(exports, "DropdownMenu", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DropdownMenu; }
});
Object.defineProperty(exports, "DropdownMenuContent", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DropdownMenuContent; }
});
Object.defineProperty(exports, "DropdownMenuItem", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DropdownMenuItem; }
});
Object.defineProperty(exports, "DropdownMenuLabel", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DropdownMenuLabel; }
});
Object.defineProperty(exports, "DropdownMenuSeparator", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DropdownMenuSeparator; }
});
Object.defineProperty(exports, "DropdownMenuTrigger", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.DropdownMenuTrigger; }
});
Object.defineProperty(exports, "EmptyState", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.EmptyState; }
});
Object.defineProperty(exports, "ExpandableCard", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.ExpandableCard; }
});
Object.defineProperty(exports, "Field", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Field; }
});
Object.defineProperty(exports, "IconButton", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.IconButton; }
});
Object.defineProperty(exports, "InfiniteList", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.InfiniteList; }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Input; }
});
Object.defineProperty(exports, "KeyValueEditor", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.KeyValueEditor; }
});
Object.defineProperty(exports, "LineChart", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.LineChart; }
});
Object.defineProperty(exports, "LogViewer", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.LogViewer; }
});
Object.defineProperty(exports, "NumberInput", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.NumberInput; }
});
Object.defineProperty(exports, "PageHead", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.PageHead; }
});
Object.defineProperty(exports, "Panel", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Panel; }
});
Object.defineProperty(exports, "PermissionMatrix", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.PermissionMatrix; }
});
Object.defineProperty(exports, "Popover", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Popover; }
});
Object.defineProperty(exports, "PopoverClose", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.PopoverClose; }
});
Object.defineProperty(exports, "PopoverContent", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.PopoverContent; }
});
Object.defineProperty(exports, "PopoverTrigger", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.PopoverTrigger; }
});
Object.defineProperty(exports, "Radio", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Radio; }
});
Object.defineProperty(exports, "RadioGroup", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.RadioGroup; }
});
Object.defineProperty(exports, "RelativeTime", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.RelativeTime; }
});
Object.defineProperty(exports, "SearchInput", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.SearchInput; }
});
Object.defineProperty(exports, "SegmentedControl", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.SegmentedControl; }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Select; }
});
Object.defineProperty(exports, "SelectMenu", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.SelectMenu; }
});
Object.defineProperty(exports, "Skeleton", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Skeleton; }
});
Object.defineProperty(exports, "Slider", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Slider; }
});
Object.defineProperty(exports, "Sparkline", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Sparkline; }
});
Object.defineProperty(exports, "Spinner", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Spinner; }
});
Object.defineProperty(exports, "SplitButton", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.SplitButton; }
});
Object.defineProperty(exports, "SplitPane", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.SplitPane; }
});
Object.defineProperty(exports, "Stat", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Stat; }
});
Object.defineProperty(exports, "StatGrid", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.StatGrid; }
});
Object.defineProperty(exports, "StatusDot", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.StatusDot; }
});
Object.defineProperty(exports, "Switch", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Switch; }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Tabs; }
});
Object.defineProperty(exports, "TabsContent", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.TabsContent; }
});
Object.defineProperty(exports, "TabsList", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.TabsList; }
});
Object.defineProperty(exports, "TabsTrigger", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.TabsTrigger; }
});
Object.defineProperty(exports, "TagInput", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.TagInput; }
});
Object.defineProperty(exports, "TenantSwitcher", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.TenantSwitcher; }
});
Object.defineProperty(exports, "TextArea", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Textarea; }
});
Object.defineProperty(exports, "TextInput", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Input; }
});
Object.defineProperty(exports, "Textarea", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Textarea; }
});
Object.defineProperty(exports, "TimeRangePicker", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.TimeRangePicker; }
});
Object.defineProperty(exports, "ToastProvider", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.ToastProvider; }
});
Object.defineProperty(exports, "Tooltip", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.Tooltip; }
});
Object.defineProperty(exports, "TooltipProvider", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.TooltipProvider; }
});
Object.defineProperty(exports, "TruncatedText", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.TruncatedText; }
});
Object.defineProperty(exports, "VirtualList", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.VirtualList; }
});
Object.defineProperty(exports, "dialogBase", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.dialogBase; }
});
Object.defineProperty(exports, "dialogSizes", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.dialogSizes; }
});
Object.defineProperty(exports, "formatRelative", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.formatRelative; }
});
Object.defineProperty(exports, "observeRectWithFallback", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.observeRectWithFallback; }
});
Object.defineProperty(exports, "useToast", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.useToast; }
});
Object.defineProperty(exports, "useToasts", {
  enumerable: true,
  get: function () { return chunkGEJA4YGN_cjs.useToasts; }
});
Object.defineProperty(exports, "diffLines", {
  enumerable: true,
  get: function () { return chunkS4QID4TP_cjs.diffLines; }
});
Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function () { return chunkS4QID4TP_cjs.format; }
});
Object.defineProperty(exports, "matchesAccept", {
  enumerable: true,
  get: function () { return chunkS4QID4TP_cjs.matchesAccept; }
});
Object.defineProperty(exports, "useControllableState", {
  enumerable: true,
  get: function () { return chunkS4QID4TP_cjs.useControllableState; }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () { return chunkIP6HZMS5_cjs.Button; }
});
Object.defineProperty(exports, "buttonVariants", {
  enumerable: true,
  get: function () { return chunkIP6HZMS5_cjs.buttonVariants; }
});
Object.defineProperty(exports, "ClusterGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.ClusterGlyph; }
});
Object.defineProperty(exports, "DatacenterGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.DatacenterGlyph; }
});
Object.defineProperty(exports, "DiskArrayGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.DiskArrayGlyph; }
});
Object.defineProperty(exports, "FirewallGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.FirewallGlyph; }
});
Object.defineProperty(exports, "HddGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.HddGlyph; }
});
Object.defineProperty(exports, "IscsiGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.IscsiGlyph; }
});
Object.defineProperty(exports, "LoadBalancerGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.LoadBalancerGlyph; }
});
Object.defineProperty(exports, "LunGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.LunGlyph; }
});
Object.defineProperty(exports, "NasGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.NasGlyph; }
});
Object.defineProperty(exports, "NfsGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.NfsGlyph; }
});
Object.defineProperty(exports, "NvmeGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.NvmeGlyph; }
});
Object.defineProperty(exports, "ObjectIcon", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.ObjectIcon; }
});
Object.defineProperty(exports, "RaidGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.RaidGlyph; }
});
Object.defineProperty(exports, "RouterGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.RouterGlyph; }
});
Object.defineProperty(exports, "SanGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.SanGlyph; }
});
Object.defineProperty(exports, "ServerGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.ServerGlyph; }
});
Object.defineProperty(exports, "SsdGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.SsdGlyph; }
});
Object.defineProperty(exports, "StateBadge", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.StateBadge; }
});
Object.defineProperty(exports, "TemplateGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.TemplateGlyph; }
});
Object.defineProperty(exports, "UplinkGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.UplinkGlyph; }
});
Object.defineProperty(exports, "VSwitchGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.VSwitchGlyph; }
});
Object.defineProperty(exports, "VdiskGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.VdiskGlyph; }
});
Object.defineProperty(exports, "VlanGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.VlanGlyph; }
});
Object.defineProperty(exports, "VmGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.VmGlyph; }
});
Object.defineProperty(exports, "VnicGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.VnicGlyph; }
});
Object.defineProperty(exports, "VolumeGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.VolumeGlyph; }
});
Object.defineProperty(exports, "VpnGlyph", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.VpnGlyph; }
});
Object.defineProperty(exports, "objectKinds", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.objectKinds; }
});
Object.defineProperty(exports, "objectStateMeta", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.objectStateMeta; }
});
Object.defineProperty(exports, "objectStates", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.objectStates; }
});
Object.defineProperty(exports, "registerObjectKind", {
  enumerable: true,
  get: function () { return chunkVUZVPUQ7_cjs.registerObjectKind; }
});
Object.defineProperty(exports, "LafProvider", {
  enumerable: true,
  get: function () { return chunkQQA4GJXV_cjs.LafProvider; }
});
Object.defineProperty(exports, "createFormatters", {
  enumerable: true,
  get: function () { return chunkQQA4GJXV_cjs.createFormatters; }
});
Object.defineProperty(exports, "en", {
  enumerable: true,
  get: function () { return chunkQQA4GJXV_cjs.en; }
});
Object.defineProperty(exports, "useLaf", {
  enumerable: true,
  get: function () { return chunkQQA4GJXV_cjs.useLaf; }
});
Object.defineProperty(exports, "useLafDefaults", {
  enumerable: true,
  get: function () { return chunkQQA4GJXV_cjs.useLafDefaults; }
});
Object.defineProperty(exports, "usePortalContainer", {
  enumerable: true,
  get: function () { return chunkQQA4GJXV_cjs.usePortalContainer; }
});
Object.defineProperty(exports, "cn", {
  enumerable: true,
  get: function () { return chunkFTHFEMX6_cjs.cn; }
});
exports.AccountItem = AccountItem;
exports.AccountList = AccountList;
exports.ActionBar = ActionBar;
exports.ActionGroup = ActionGroup;
exports.ActionToolbar = ActionToolbar;
exports.ActivityTimeline = ActivityTimeline;
exports.AdminShell = AdminShell;
exports.AllowListEditor = AllowListEditor;
exports.ApiKeyManager = ApiKeyManager;
exports.AppFooter = AppFooter;
exports.AppFrame = AppFrame;
exports.AppSwitcher = AppSwitcher;
exports.AuditLog = AuditLog;
exports.AuthFooter = AuthFooter;
exports.Autocomplete = Autocomplete;
exports.BrandHeader = BrandHeader;
exports.BrandingEditor = BrandingEditor;
exports.CapacityBar = CapacityBar;
exports.ChipsInput = ChipsInput;
exports.CidrInput = CidrInput;
exports.ClientInfo = ClientInfo;
exports.ClipboardCopy = ClipboardCopy;
exports.CodeBlock = CodeBlock;
exports.CodeBlockCode = CodeBlockCode;
exports.CodeDisplay = CodeDisplay;
exports.CodeEditor = CodeEditor;
exports.CodeEditorLite = CodeEditorLite;
exports.CodeInput = CodeInput;
exports.ColorField = ColorField;
exports.CommandPalette = CommandPalette;
exports.ConnectionBadge = ConnectionBadge;
exports.ContextMenu = ContextMenu;
exports.ContextMenuContent = ContextMenuContent;
exports.ContextMenuFor = ContextMenuFor;
exports.ContextMenuItem = ContextMenuItem;
exports.ContextMenuSeparator = ContextMenuSeparator;
exports.ContextMenuTrigger = ContextMenuTrigger;
exports.CountCard = CountCard;
exports.DataGrid = DataGrid;
exports.DatePicker = DatePicker;
exports.DescriptionList = DescriptionList;
exports.DescriptionListDescription = DescriptionListDescription;
exports.DescriptionListGroup = DescriptionListGroup;
exports.DescriptionListTerm = DescriptionListTerm;
exports.DetailPage = DetailPage;
exports.DetailsCard = DetailsCard;
exports.DeviceList = DeviceList;
exports.DeviceSelector = DeviceSelector;
exports.DeviceSteps = DeviceSteps;
exports.DiffView = DiffView;
exports.Divider = Divider;
exports.DnsRecordTable = DnsRecordTable;
exports.DockedTaskPanel = DockedTaskPanel;
exports.DrawerPanel = DrawerPanel;
exports.Dropdown = Dropdown;
exports.DropdownGroup = DropdownGroup;
exports.DropdownItem = DropdownItem;
exports.DropdownList = DropdownList;
exports.DropdownSeparator = DropdownSeparator;
exports.ErrorPage = ErrorPage;
exports.FilterBar = FilterBar;
exports.Flex = Flex;
exports.FlexItem = FlexItem;
exports.Form = Form;
exports.FormFooter = FormFooter;
exports.FormGroup = FormGroup;
exports.FormHelperText = FormHelperText;
exports.FormPage = FormPage;
exports.FormSection = FormSection;
exports.GaugeCard = GaugeCard;
exports.Grid = Grid;
exports.GridColumnsMenu = GridColumnsMenu;
exports.GridDensityToggle = GridDensityToggle;
exports.GridItem = GridItem;
exports.GridSearch = GridSearch;
exports.HealthGrid = HealthGrid;
exports.Heatmap = Heatmap;
exports.HelperText = HelperText;
exports.HelperTextItem = HelperTextItem;
exports.HotkeysProvider = HotkeysProvider;
exports.HoverCard = HoverCard;
exports.IdentityCard = IdentityCard;
exports.InfoBox = InfoBox;
exports.InlineDrawer = InlineDrawer;
exports.InventoryLayout = InventoryLayout;
exports.IpInput = IpInput;
exports.IssueCard = IssueCard;
exports.IssueRow = IssueRow;
exports.Label = Label;
exports.LabelPicker = LabelPicker;
exports.LabelSwatch = LabelSwatch;
exports.LafErrorBoundary = LafErrorBoundary;
exports.LanguageSwitcher = LanguageSwitcher;
exports.Masthead = Masthead;
exports.MastheadActions = MastheadActions;
exports.MastheadBrand = MastheadBrand;
exports.MastheadContent = MastheadContent;
exports.MastheadToggle = MastheadToggle;
exports.Menu = Menu;
exports.MenuShortcut = MenuShortcut;
exports.MenuToggle = MenuToggle;
exports.MetricCard = MetricCard;
exports.MetricGrid = MetricGrid;
exports.MfaEnrolment = MfaEnrolment;
exports.MobileNav = MobileNav;
exports.Modal = Modal;
exports.ModalBody = ModalBody;
exports.ModalClose = ModalClose;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
exports.ModalTrigger = ModalTrigger;
exports.NavGroup = NavGroup;
exports.NavLink = NavLink;
exports.NavTree = NavTree;
exports.NotificationCenter = NotificationCenter;
exports.ObjectHeader = ObjectHeader;
exports.ObjectPage = ObjectPage;
exports.OptionPicker = OptionPicker;
exports.OtpInput = OtpInput;
exports.OverflowTabs = OverflowTabs;
exports.PageHeader = PageHeader;
exports.PageSection = PageSection;
exports.Pagination = Pagination;
exports.PortalHome = PortalHome;
exports.PortalLayout = PortalLayout;
exports.PowerState = PowerState;
exports.ProgressCard = ProgressCard;
exports.ProgressSummary = ProgressSummary;
exports.PropertiesPane = PropertiesPane;
exports.QueueStatusBadge = QueueStatusBadge;
exports.QuickSearch = QuickSearch;
exports.QuotaBar = QuotaBar;
exports.RadialGauge = RadialGauge;
exports.Reactions = Reactions;
exports.RealtimeProvider = RealtimeProvider;
exports.ReauthDialog = ReauthDialog;
exports.ResourceOverviewLayout = ResourceOverviewLayout;
exports.SavedViews = SavedViews;
exports.ScopeList = ScopeList;
exports.SecurityFactors = SecurityFactors;
exports.ServerDataGrid = ServerDataGrid;
exports.ServiceTile = ServiceTile;
exports.SessionExpiryDialog = SessionExpiryDialog;
exports.SessionList = SessionList;
exports.SettingRow = SettingRow;
exports.SettingsDialog = SettingsDialog;
exports.SettingsSection = SettingsSection;
exports.ShortcutHelp = ShortcutHelp;
exports.SideCard = SideCard;
exports.Sidebar = Sidebar;
exports.SimpleTable = SimpleTable;
exports.SocialButton = SocialButton;
exports.SocialButtons = SocialButtons;
exports.SocialDivider = SocialDivider;
exports.Stack = Stack;
exports.StackItem = StackItem;
exports.StackedBarChart = StackedBarChart;
exports.StaleDataBanner = StaleDataBanner;
exports.StatusSummaryCard = StatusSummaryCard;
exports.SubNav = SubNav;
exports.Table = Table;
exports.TaskPanel = TaskPanel;
exports.ThemeToggle = ThemeToggle;
exports.Title = Title4;
exports.Toolbar = Toolbar;
exports.ToolbarActions = ToolbarActions;
exports.ToolbarBulk = ToolbarBulk;
exports.ToolbarContent = ToolbarContent;
exports.ToolbarDivider = ToolbarDivider;
exports.ToolbarFilterChips = ToolbarFilterChips;
exports.ToolbarGroup = ToolbarGroup;
exports.ToolbarItem = ToolbarItem;
exports.ToolbarSpacer = ToolbarSpacer;
exports.TopBar = TopBar;
exports.TopologyGraph = TopologyGraph;
exports.TraceTimeline = TraceTimeline;
exports.TransferList = TransferList;
exports.TreeTable = TreeTable;
exports.UnsavedChangesDialog = UnsavedChangesDialog;
exports.UserCell = UserCell;
exports.UserMenu = UserMenu;
exports.UserSelector = UserSelector;
exports.UtilizationColumn = UtilizationColumn;
exports.UtilizationPanel = UtilizationPanel;
exports.Wizard = Wizard;
exports.WizardReview = WizardReview;
exports.backoffDelay = backoffDelay;
exports.browserSearchParams = browserSearchParams;
exports.contrastRatio = contrastRatio;
exports.formatHotkey = formatHotkey;
exports.gaugeTone = gaugeTone;
exports.highlight = highlight;
exports.isCidr = isCidr;
exports.isIPv4 = isIPv4;
exports.isIPv6 = isIPv6;
exports.isIp = isIp;
exports.isMacPlatform = isMacPlatform;
exports.normalizeHex = normalizeHex;
exports.parseCidr = parseCidr;
exports.parseFilter = parseFilter;
exports.parseHotkey = parseHotkey;
exports.portalBreadcrumbs = portalBreadcrumbs;
exports.portalNavEntries = portalNavEntries;
exports.resolvePortalRoute = resolvePortalRoute;
exports.serializeFilter = serializeFilter;
exports.serializeToken = serializeToken;
exports.serverGridFromSearchParams = serverGridFromSearchParams;
exports.serverGridToSearchParams = serverGridToSearchParams;
exports.useAppFrame = useAppFrame;
exports.useConnectionState = useConnectionState;
exports.useHotkeys = useHotkeys;
exports.useRealtime = useRealtime;
exports.useRealtimeContext = useRealtimeContext;
exports.useRealtimeMessage = useRealtimeMessage;
exports.useRegisteredHotkeys = useRegisteredHotkeys;
exports.useSavedViews = useSavedViews;
exports.useServerGrid = useServerGrid;
exports.useUnsavedChangesGuard = useUnsavedChangesGuard;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map