import { Input, Dialog, DialogContent, DialogClose, Badge, RelativeTime, useChartMotion, entryAnim, tweenClass, motionVars, observeRectWithFallback, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, StatusDot, Field, Combobox, Switch, Banner, Drawer, DrawerContent, Skeleton } from './chunk-GG3HQY6A.js';
import { format, useControllableState, matchesAccept } from './chunk-S3G7Q24I.js';
import { Button } from './chunk-2O5Y6D5F.js';
import { ObjectIcon } from './chunk-ZV7VBOGZ.js';
import { useLaf, useLafDefaults } from './chunk-IIQMUFUD.js';
import { cn } from './chunk-3TRXGDSZ.js';
import { Check, Copy, EyeOff, Eye, Pencil, UploadCloud, X, Minimize2, Maximize2, Plus, ChevronRight, Trash2, FolderPlus, Download, RotateCw, ChevronDown } from 'lucide-react';
import * as React4 from 'react';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useVirtualizer, defaultRangeExtractor } from '@tanstack/react-virtual';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';

function CopyButton({
  value,
  label: labelProp,
  copiedLabel: copiedLabelProp,
  className
}) {
  const { t } = useLaf();
  const label = labelProp ?? t.copy;
  const copiedLabel = copiedLabelProp ?? t.copied;
  const [copied, setCopied] = React4.useState(false);
  React4.useEffect(() => {
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
  const [text, setText] = React4.useState(String(props.value ?? props.defaultValue ?? ""));
  const current = props.value !== void 0 ? String(props.value) : text;
  const score = strength ? strength(current) : 0;
  const mismatch = confirmOf !== void 0 && current !== "" && current !== confirmOf;
  const uid = React4.useId();
  const { t } = useLaf();
  const showLabel = showLabelProp ?? t.showPassword;
  const hideLabel = hideLabelProp ?? t.hidePassword;
  const strengthLabels = strengthLabelsProp ?? t.passwordStrength;
  const mismatchLabel = mismatchLabelProp ?? t.passwordMismatch;
  const capsLockHint = capsLockHintProp ?? t.capsLock;
  const [visible, setVisible] = React4.useState(false);
  const [caps, setCaps] = React4.useState(false);
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
  const [typed, setTyped] = React4.useState("");
  React4.useEffect(() => {
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
          "flex items-center gap-2.5 text-start text-sm",
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
  validate,
  as = "text",
  options,
  min,
  max
}) {
  const { t: laf } = useLaf();
  const [editing, setEditing] = React4.useState(false);
  const [text, setText] = React4.useState(value);
  const [error, setError] = React4.useState();
  const [pending, setPending] = React4.useState(false);
  const cancelled = React4.useRef(false);
  const saving = React4.useRef(false);
  const shown = as === "select" ? options?.find((o) => o.value === value)?.label ?? value : value;
  const save = async (next = text) => {
    if (cancelled.current || saving.current) return;
    if (next === value) return setEditing(false);
    const err = validate?.(next);
    if (err) return setError(err);
    setPending(true);
    saving.current = true;
    try {
      await onSave(next);
      setEditing(false);
    } finally {
      saving.current = false;
      setPending(false);
    }
  };
  if (!editing) {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-label": `${label}: ${shown}. ${laf.edit}`,
        className: "group inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-fg",
        onClick: () => {
          cancelled.current = false;
          setText(value);
          setError(void 0);
          setEditing(true);
        },
        children: [
          shown,
          /* @__PURE__ */ jsx(Pencil, { className: "size-3.5 text-subtle opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100", "aria-hidden": true })
        ]
      }
    );
  }
  const onKeyDown = (e) => {
    if (e.key === "Enter") save();
    else if (e.key === "Escape") {
      cancelled.current = true;
      setEditing(false);
    }
  };
  return /* @__PURE__ */ jsxs("span", { className: "inline-grid gap-1", children: [
    as === "select" ? /* @__PURE__ */ jsx(
      "select",
      {
        autoFocus: true,
        "aria-label": label,
        className: "form-select",
        value: text,
        disabled: pending,
        "aria-busy": pending || void 0,
        "aria-invalid": !!error || void 0,
        onChange: (e) => {
          setText(e.target.value);
          void save(e.target.value);
        },
        onBlur: () => void save(),
        onKeyDown: (e) => e.key === "Escape" && onKeyDown(e),
        children: options?.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value))
      }
    ) : /* @__PURE__ */ jsx(
      Input,
      {
        autoFocus: true,
        "aria-label": label,
        type: as === "number" ? "number" : void 0,
        min: as === "number" ? min : void 0,
        max: as === "number" ? max : void 0,
        value: text,
        invalid: !!error,
        disabled: pending,
        "aria-busy": pending || void 0,
        onChange: (e) => setText(e.target.value),
        onBlur: () => void save(),
        onKeyDown
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
  const input = React4.useRef(null);
  const [over, setOver] = React4.useState(false);
  const [rejected, setRejected] = React4.useState();
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
  onReset,
  onOpenEntity,
  selectable,
  empty: emptyProp
}) {
  const { t: laf } = useLaf();
  const empty = emptyProp ?? laf.noActiveAlarms;
  const [selected, setSelected] = React4.useState(() => /* @__PURE__ */ new Set());
  const chosen = alarms.filter((a) => selected.has(a.id));
  const toggle = (id) => setSelected((s) => {
    const n = new Set(s);
    if (!n.delete(id)) n.add(id);
    return n;
  });
  const allOn = alarms.length > 0 && chosen.length === alarms.length;
  if (alarms.length === 0) return /* @__PURE__ */ jsx("p", { className: "px-4 py-6 text-center text-sm text-muted", children: empty });
  const linkBtn = "border-0 bg-transparent p-0 text-primary hover:underline";
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
    selectable && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-1 text-sm", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          "aria-label": laf.vsSelectAllAlarms,
          checked: allOn,
          onChange: () => setSelected(allOn ? /* @__PURE__ */ new Set() : new Set(alarms.map((a) => a.id)))
        }
      ),
      onAcknowledge && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "btn btn-ghost btn-sm",
          disabled: chosen.length === 0,
          onClick: () => chosen.filter((a) => !a.acknowledged).forEach((a) => onAcknowledge(a.id)),
          children: laf.vsAcknowledgeSelected
        }
      ),
      onReset && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "btn btn-ghost btn-sm",
          disabled: chosen.length === 0,
          onClick: () => chosen.forEach((a) => onReset(a.id)),
          children: laf.vsResetAlarm
        }
      )
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", children: alarms.map((a) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 px-4 py-3 text-sm", children: [
      selectable && /* @__PURE__ */ jsx("input", { type: "checkbox", "aria-label": `${laf.vsSelectAlarm}: ${a.name}`, checked: selected.has(a.id), onChange: () => toggle(a.id) }),
      /* @__PURE__ */ jsx(Badge, { tone: alarmTone[a.severity], children: a.severity }),
      /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("b", { className: "font-semibold text-fg", children: a.name }),
        onOpenEntity ? /* @__PURE__ */ jsx("button", { type: "button", className: cn(linkBtn, "ms-2"), onClick: () => onOpenEntity(a), children: a.entity }) : /* @__PURE__ */ jsx("span", { className: "ms-2 text-muted", children: a.entity })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-subtle", children: a.triggeredAt !== void 0 ? /* @__PURE__ */ jsx(RelativeTime, { value: a.triggeredAt }) : a.triggered }),
      onAcknowledge && !a.acknowledged && /* @__PURE__ */ jsx("button", { type: "button", className: linkBtn, onClick: () => onAcknowledge(a.id), children: laf.acknowledge }),
      onReset && /* @__PURE__ */ jsx("button", { type: "button", className: linkBtn, onClick: () => onReset(a.id), children: laf.vsResetAlarm })
    ] }, a.id)) })
  ] });
}
function Gauge({ value, max = 100, label, warnAt = 70, dangerAt = 90, animate }) {
  const motion = useChartMotion(animate);
  const sweep = entryAnim(motion, "sweep");
  const pct = Math.min(100, Math.max(0, value / max * 100));
  const tone = pct >= dangerAt ? "text-danger" : pct >= warnAt ? "text-warn" : "text-ok";
  const r = 40;
  const c = Math.PI * r;
  return /* @__PURE__ */ jsxs("figure", { className: "m-0 inline-block text-center", children: [
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 56", style: motionVars(motion), "data-animate": motion.enabled ? "on" : "off", role: "meter", "aria-label": label, "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": max, className: "w-32", children: [
      /* @__PURE__ */ jsx("path", { d: "M10 50 A40 40 0 0 1 90 50", fill: "none", stroke: "var(--bg-muted)", strokeWidth: "8" }),
      /* @__PURE__ */ jsx("path", { d: "M10 50 A40 40 0 0 1 90 50", fill: "none", stroke: "currentColor", strokeWidth: "8", strokeDasharray: `${pct / 100 * c} ${c}`, className: cn(tone, tweenClass(motion), sweep.className), style: sweep.style })
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
  const generated = React4.useId();
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
var itemCls = "dropdown-item flex items-center gap-2 outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg data-[disabled]:opacity-50";
function MenuSpecItems({ items }) {
  return /* @__PURE__ */ jsx(Fragment, { children: items.map((it, i) => {
    switch (it.type) {
      case "separator":
        return /* @__PURE__ */ jsx(DropdownPrimitive.Separator, { className: "dropdown-sep" }, `sep-${i}`);
      case "label":
        return /* @__PURE__ */ jsx(DropdownPrimitive.Label, { className: "dropdown-label", children: it.label }, `lbl-${i}`);
      case "checkbox":
        return /* @__PURE__ */ jsxs(DropdownPrimitive.CheckboxItem, { checked: it.checked, onCheckedChange: it.onCheckedChange, className: itemCls, children: [
          /* @__PURE__ */ jsx("span", { className: "flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4", "aria-hidden": true }) }) }),
          it.label
        ] }, it.id);
      case "radio":
        return /* @__PURE__ */ jsx(DropdownPrimitive.RadioGroup, { onValueChange: it.onValueChange, children: it.options.map((o) => /* @__PURE__ */ jsxs(DropdownPrimitive.RadioItem, { value: o.value, className: itemCls, children: [
          /* @__PURE__ */ jsx("span", { className: "flex size-4 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4", "aria-hidden": true }) }) }),
          o.label
        ] }, o.value)) }, it.id);
      case "submenu":
        return /* @__PURE__ */ jsxs(DropdownPrimitive.Sub, { children: [
          /* @__PURE__ */ jsxs(DropdownPrimitive.SubTrigger, { className: itemCls, children: [
            it.icon,
            it.label
          ] }),
          /* @__PURE__ */ jsx(DropdownPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownPrimitive.SubContent, { className: "dropdown-menu relative! top-auto! start-auto! z-40 min-w-40", children: /* @__PURE__ */ jsx(MenuSpecItems, { items: it.items }) }) })
        ] }, it.id);
      default:
        return /* @__PURE__ */ jsxs(
          DropdownPrimitive.Item,
          {
            disabled: !!it.disabled,
            title: typeof it.disabled === "string" ? it.disabled : void 0,
            onSelect: () => it.onSelect(),
            className: cn(itemCls, it.danger && "danger"),
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
  return /* @__PURE__ */ jsxs(DropdownPrimitive.Root, { open: true, onOpenChange: (o) => !o && onClose(), modal: false, children: [
    /* @__PURE__ */ jsx(DropdownPrimitive.Trigger, { asChild: true, children: /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "pointer-events-none fixed size-0", style: { left: x, top: y } }) }),
    /* @__PURE__ */ jsx(DropdownPrimitive.Portal, { children: /* @__PURE__ */ jsx(
      DropdownPrimitive.Content,
      {
        "aria-label": label,
        align: "start",
        sideOffset: 0,
        onCloseAutoFocus: (e) => e.preventDefault(),
        className: "dropdown-menu relative! top-auto! start-auto! z-30 min-w-48",
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
  onMove,
  dragAdapter,
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
  const open = React4.useMemo(() => new Set(expanded), [expanded]);
  const chosen = React4.useMemo(() => new Set(selectedIds), [selectedIds]);
  const [loadState, setLoadState] = React4.useState({});
  const rows = React4.useMemo(() => {
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
  const indexOf = React4.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    rows.forEach((r, i) => r.kind === "node" && m.set(r.node.id, i));
    return m;
  }, [rows]);
  const [focusId, setFocusId] = React4.useState(selectedIds[0] ?? rows[0]?.node?.id);
  const focusIdx = focusId !== void 0 ? indexOf.get(focusId) ?? 0 : 0;
  const anchor = React4.useRef(void 0);
  const pendingFocus = React4.useRef(void 0);
  const refs = React4.useRef(/* @__PURE__ */ new Map());
  const scrollRef = React4.useRef(null);
  const [menu, setMenu] = React4.useState(null);
  const useVirt = virtual ?? rows.length > 500;
  const focusIdxRef = React4.useRef(focusIdx);
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
  const load = React4.useCallback(
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
  React4.useEffect(() => {
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
  const typed = React4.useRef({ buf: "", t: 0 });
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
    const RowEl = dragAdapter && onMove && !node.disabled ? dragAdapter.Row : "div";
    return /* @__PURE__ */ jsxs(
      RowEl,
      {
        "data-tree-id": node.id,
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
  const Root2 = dragAdapter && onMove ? dragAdapter.Root : null;
  const wrap = (el) => Root2 ? /* @__PURE__ */ jsx(Root2, { selectedIds, onMove, children: el }) : el;
  if (!useVirt) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      wrap(
        /* @__PURE__ */ jsx("div", { role: "tree", "aria-label": label, "aria-multiselectable": multi || void 0, className, children: rows.map((_, i) => renderRow(i)) })
      ),
      menuEl
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    wrap(
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
      )
    ),
    menuEl
  ] });
}

// lib/messages/vsphere-objects.en.ts
var vsphereObjectsEn = {
  console: {
    console: "Console",
    sendCad: "Send Ctrl+Alt+Del",
    keys: "Send keys",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit fullscreen",
    fit: "Fit to window",
    actual: "Actual size (1:1)",
    screenshot: "Screenshot",
    disconnect: "Disconnect",
    reconnect: "Reconnect",
    connecting: "Connecting\u2026",
    connected: "Connected",
    disconnected: "Disconnected",
    error: "Connection error",
    releaseHint: "Press Ctrl+Alt to release"
  },
  hardware: {
    title: "Virtual hardware",
    cpu: "CPU",
    memory: "Memory",
    disk: "Hard disk",
    nic: "Network adapter",
    cdrom: "CD/DVD drive",
    cpuCount: "CPU count",
    coresPerSocket: "Cores per socket",
    reservationMhz: "Reservation (MHz)",
    memorySize: "Memory size (MB)",
    reservationMb: "Reservation (MB)",
    diskSize: "Size (GB)",
    provisioning: "Provisioning",
    thin: "Thin",
    thickLazy: "Thick, lazily zeroed",
    thickEager: "Thick, eagerly zeroed",
    controller: "Controller",
    network: "Network",
    adapter: "Adapter type",
    connected: "Connected",
    iso: "ISO image",
    noIso: "Client device",
    chooseIso: "Choose ISO\u2026",
    addDevice: "Add device",
    remove: (n) => `Remove ${n}`,
    hotAddDisabled: "Cannot be changed while the VM is powered on",
    pendingChanges: "Pending changes",
    noChanges: "No pending changes",
    save: "Save",
    discard: "Discard",
    errCpu: "Between 1 and the host maximum",
    errCores: "Must divide the CPU count",
    errMemory: "Multiple of 4 MB, at least 4",
    errDisk: "At least 1 GB",
    errShrink: "A disk cannot be shrunk",
    errNetwork: "Select a network",
    added: "Added",
    removed: "Removed",
    changed: (f, a, b) => `${f}: ${a} \u2192 ${b}`
  },
  datastore: {
    tree: "Folders",
    files: "Files",
    path: "Path",
    name: "Name",
    size: "Size",
    modified: "Modified",
    type: "Type",
    folder: "Folder",
    file: "File",
    root: "Datastore",
    empty: "This folder is empty",
    upload: "Upload",
    download: "Download",
    newFolder: "New folder",
    folderName: "Folder name",
    create: "Create",
    delete: "Delete",
    deleteTitle: "Delete item",
    deleteDescription: (n) => `Permanently delete ${n}?`,
    select: "Select",
    cancel: "Cancel"
  },
  permission: {
    title: "Add permission",
    principal: "User or group",
    role: "Role",
    propagate: "Propagate to children",
    object: "Object",
    assign: "Assign",
    cancel: "Cancel"
  },
  snapshots: {
    tree: "Snapshots",
    take: "Take snapshot",
    revert: "Revert to",
    delete: "Delete",
    deleteChildren: "Delete children",
    youAreHere: "You are here",
    consolidationNeeded: "Disk consolidation is needed",
    consolidate: "Consolidate",
    confirmRevert: (n) => `Revert the VM to snapshot \u201C${n}\u201D? Changes since then are lost.`,
    confirmDelete: (n) => `Delete snapshot \u201C${n}\u201D?`,
    confirmDeleteChildren: (n) => `Delete all snapshots below \u201C${n}\u201D?`,
    cancel: "Cancel"
  },
  events: {
    title: "Events",
    search: "Filter events",
    severity: "Severity",
    all: "All severities",
    info: "Info",
    warning: "Warning",
    error: "Error",
    liveTail: "Live tail",
    time: "Time",
    message: "Message",
    source: "Source",
    user: "User",
    empty: "No events",
    details: "Event details"
  }
};
var lafDefaults = { vsphereObjects: vsphereObjectsEn };
var useLaf2 = () => useLafDefaults(lafDefaults);
var statusTone = { connecting: "warn", connected: "ok", disconnected: "neutral", error: "danger" };
function ConsoleFrame({
  children,
  status,
  errorMessage,
  onSendKeys,
  keyCombos,
  scale: scaleProp,
  onScaleChange,
  onScreenshot,
  onDisconnect,
  onReconnect,
  keyboardGrabbed,
  labels,
  className
}) {
  const { t: laf } = useLaf2();
  const l = { ...laf.components.vsphereObjects.console, ...labels };
  const root = React4.useRef(null);
  const [full, setFull] = React4.useState(false);
  const [scale, setScale] = useControllableState({ value: scaleProp, defaultValue: "fit", onChange: onScaleChange });
  React4.useEffect(() => {
    const on = () => setFull(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", on);
    return () => document.removeEventListener("fullscreenchange", on);
  }, []);
  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void root.current?.requestFullscreen?.();
  };
  const live = status === "connected";
  return /* @__PURE__ */ jsxs("div", { ref: root, className: cn("flex flex-col overflow-hidden rounded-lg border border-line bg-surface", className), children: [
    /* @__PURE__ */ jsxs("div", { role: "toolbar", "aria-label": l.console, className: "flex flex-wrap items-center gap-2 border-b border-line px-3 py-2", children: [
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", disabled: !live, onClick: () => onSendKeys?.("ctrl-alt-del"), children: l.sendCad }),
      keyCombos && keyCombos.length > 0 && /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", disabled: !live, children: l.keys }) }),
        /* @__PURE__ */ jsx(DropdownMenuContent, { align: "start", children: keyCombos.map((k) => /* @__PURE__ */ jsx(DropdownMenuItem, { onSelect: () => onSendKeys?.(k.id), children: k.label }, k.id)) })
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", "aria-pressed": scale === "actual", onClick: () => setScale(scale === "fit" ? "actual" : "fit"), children: scale === "fit" ? l.actual : l.fit }),
      onScreenshot && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", disabled: !live, onClick: onScreenshot, children: l.screenshot }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", "aria-pressed": full, leftIcon: full ? /* @__PURE__ */ jsx(Minimize2, { "aria-hidden": true }) : /* @__PURE__ */ jsx(Maximize2, { "aria-hidden": true }), onClick: toggleFull, children: full ? l.exitFullscreen : l.fullscreen }),
      /* @__PURE__ */ jsxs("div", { className: "ms-auto flex items-center gap-3", children: [
        keyboardGrabbed && live && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted", children: l.releaseHint }),
        /* @__PURE__ */ jsx("span", { role: "status", children: /* @__PURE__ */ jsx(StatusDot, { tone: statusTone[status], pulse: status === "connecting", label: l[status] }) }),
        live && onDisconnect && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: onDisconnect, children: l.disconnect }),
        (status === "disconnected" || status === "error") && onReconnect && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", onClick: onReconnect, children: l.reconnect })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: cn("relative grid min-h-48 flex-1 place-items-center bg-black/60", scale === "actual" ? "overflow-auto" : "overflow-hidden [&>*]:max-h-full [&>*]:max-w-full"), children: [
      children,
      !live && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center bg-black/50 text-sm text-fg", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-1 text-center", children: [
        /* @__PURE__ */ jsx("span", { children: l[status] }),
        status === "error" && errorMessage && /* @__PURE__ */ jsx("span", { className: "text-danger", children: errorMessage })
      ] }) })
    ] })
  ] });
}
var nameOf = (d, l) => d.kind === "cpu" || d.kind === "memory" ? l[d.kind] : d.name;
function validateDevice(d, base, cap, l) {
  const e = {};
  if (d.kind === "cpu") {
    if (!Number.isInteger(d.count) || d.count < 1 || d.count > (cap.maxCpu ?? Infinity)) e.count = l.errCpu;
    if (d.coresPerSocket < 1 || d.count % d.coresPerSocket !== 0) e.coresPerSocket = l.errCores;
  } else if (d.kind === "memory") {
    if (d.sizeMb < 4 || d.sizeMb % 4 !== 0 || d.sizeMb > (cap.maxMemoryMb ?? Infinity)) e.sizeMb = l.errMemory;
  } else if (d.kind === "disk") {
    if (!(d.sizeGb >= 1)) e.sizeGb = l.errDisk;
    else if (base?.kind === "disk" && d.sizeGb < base.sizeGb) e.sizeGb = l.errShrink;
  } else if (d.kind === "nic" && !d.network) e.network = l.errNetwork;
  return e;
}
function describeDiff(devices, base, l) {
  const out = [];
  const byId = new Map(base.map((d) => [d.id, d]));
  for (const d of devices) {
    const b = byId.get(d.id);
    if (!b) {
      out.push(`${l.added}: ${nameOf(d, l)}`);
      continue;
    }
    for (const k of Object.keys(d)) {
      if (k === "id" || k === "kind") continue;
      const from = b[k];
      const to = d[k];
      if (from !== to) out.push(`${nameOf(d, l)} \u2014 ${l.changed(String(k), String(from ?? "\u2014"), String(to ?? "\u2014"))}`);
    }
  }
  for (const b of base) if (!devices.some((d) => d.id === b.id)) out.push(`${l.removed}: ${nameOf(b, l)}`);
  return out;
}
function HardwareEditor({ devices: devicesProp, defaultDevices = [], onChange, baseline, capabilities: cap, onSave, renderIsoPicker, labels, className }) {
  const { t: laf } = useLaf2();
  const l = { ...laf.components.vsphereObjects.hardware, ...labels };
  const initial = React4.useRef(devicesProp ?? defaultDevices);
  const base = baseline ?? initial.current;
  const [devices, setDevices] = useControllableState({ value: devicesProp, defaultValue: defaultDevices, onChange });
  const [pickFor, setPickFor] = React4.useState(null);
  const counter = React4.useRef(0);
  const update = (id, patch) => setDevices(devices.map((d) => d.id === id ? { ...d, ...patch } : d));
  const locked = (kind) => !!cap.poweredOn && !cap.hotAdd?.[kind];
  const add = (kind) => {
    const id = `new-${kind}-${++counter.current}`;
    const n = devices.filter((d) => d.kind === kind).length + 1;
    const dev = kind === "disk" ? { id, kind, name: `${l.disk} ${n}`, sizeGb: 16, provisioning: "thin", controller: cap.controllers?.[0] ?? "" } : kind === "nic" ? { id, kind, name: `${l.nic} ${n}`, network: cap.networks[0] ?? "", adapter: cap.adapters?.[0] ?? "", connected: true } : { id, kind, name: `${l.cdrom} ${n}`, connected: false };
    setDevices([...devices, dev]);
  };
  const errors = devices.map((d) => validateDevice(d, base.find((b) => b.id === d.id), cap, l));
  const invalid = errors.some((e) => Object.keys(e).length > 0);
  const diff = describeDiff(devices, base, l);
  const num = (d, field, text, value, err, disabled) => /* @__PURE__ */ jsx(Field, { label: text, error: err, htmlFor: `${d.id}-${field}`, children: /* @__PURE__ */ jsx(
    Input,
    {
      id: `${d.id}-${field}`,
      type: "number",
      value: Number.isNaN(value) ? "" : value,
      invalid: !!err,
      disabled,
      title: disabled ? l.hotAddDisabled : void 0,
      onChange: (e) => update(d.id, { [field]: e.target.valueAsNumber })
    }
  ) });
  const body = (d, e) => {
    switch (d.kind) {
      case "cpu":
        return /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
          num(d, "count", l.cpuCount, d.count, e.count, locked("cpu")),
          num(d, "coresPerSocket", l.coresPerSocket, d.coresPerSocket, e.coresPerSocket, locked("cpu")),
          num(d, "reservationMhz", l.reservationMhz, d.reservationMhz, void 0)
        ] });
      case "memory":
        return /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          num(d, "sizeMb", l.memorySize, d.sizeMb, e.sizeMb, locked("memory")),
          num(d, "reservationMb", l.reservationMb, d.reservationMb, void 0)
        ] });
      case "disk":
        return /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
          num(d, "sizeGb", l.diskSize, d.sizeGb, e.sizeGb),
          /* @__PURE__ */ jsx(Field, { label: l.provisioning, htmlFor: `${d.id}-prov`, children: /* @__PURE__ */ jsxs("select", { id: `${d.id}-prov`, className: "form-select", value: d.provisioning, onChange: (ev) => update(d.id, { provisioning: ev.target.value }), children: [
            /* @__PURE__ */ jsx("option", { value: "thin", children: l.thin }),
            /* @__PURE__ */ jsx("option", { value: "thick-lazy", children: l.thickLazy }),
            /* @__PURE__ */ jsx("option", { value: "thick-eager", children: l.thickEager })
          ] }) }),
          /* @__PURE__ */ jsx(Field, { label: l.controller, htmlFor: `${d.id}-ctl`, children: /* @__PURE__ */ jsx("select", { id: `${d.id}-ctl`, className: "form-select", value: d.controller, onChange: (ev) => update(d.id, { controller: ev.target.value }), children: (cap.controllers ?? [d.controller]).map((c) => /* @__PURE__ */ jsx("option", { children: c }, c)) }) })
        ] });
      case "nic":
        return /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsx(Field, { label: l.network, error: e.network, htmlFor: `${d.id}-net`, children: /* @__PURE__ */ jsxs("select", { id: `${d.id}-net`, className: "form-select", "aria-invalid": !!e.network || void 0, value: d.network, onChange: (ev) => update(d.id, { network: ev.target.value }), children: [
            /* @__PURE__ */ jsx("option", { value: "" }),
            cap.networks.map((n) => /* @__PURE__ */ jsx("option", { children: n }, n))
          ] }) }),
          /* @__PURE__ */ jsx(Field, { label: l.adapter, htmlFor: `${d.id}-ad`, children: /* @__PURE__ */ jsx("select", { id: `${d.id}-ad`, className: "form-select", value: d.adapter, onChange: (ev) => update(d.id, { adapter: ev.target.value }), children: (cap.adapters ?? [d.adapter]).map((a) => /* @__PURE__ */ jsx("option", { children: a }, a)) }) }),
          /* @__PURE__ */ jsx(Switch, { checked: d.connected, onChange: (ev) => update(d.id, { connected: ev.target.checked }), children: l.connected })
        ] });
      case "cdrom":
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted", children: [
            l.iso,
            ": ",
            /* @__PURE__ */ jsx("span", { className: "text-fg", children: d.iso ?? l.noIso })
          ] }),
          renderIsoPicker && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", onClick: () => setPickFor(d.id), children: l.chooseIso }),
          /* @__PURE__ */ jsx(Switch, { checked: d.connected, onChange: (ev) => update(d.id, { connected: ev.target.checked }), children: l.connected })
        ] });
    }
  };
  const addable = ["disk", "nic", "cdrom"];
  return /* @__PURE__ */ jsxs("section", { "aria-label": l.title, className: cn("grid gap-3", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children: l.title }),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", leftIcon: /* @__PURE__ */ jsx(Plus, { "aria-hidden": true }), children: l.addDevice }) }),
        /* @__PURE__ */ jsx(DropdownMenuContent, { children: addable.map((k) => /* @__PURE__ */ jsx(DropdownMenuItem, { disabled: locked(k), title: locked(k) ? l.hotAddDisabled : void 0, onSelect: () => add(k), children: l[k] }, k)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "grid gap-2", children: devices.map((d, i) => /* @__PURE__ */ jsxs("li", { className: "relative rounded-md border border-line bg-surface", children: [
      /* @__PURE__ */ jsxs("details", { open: d.kind === "cpu" || d.kind === "memory" || d.id.startsWith("new-"), className: "group", children: [
        /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium", children: [
          /* @__PURE__ */ jsx(ChevronRight, { className: "size-4 transition-transform group-open:rotate-90 rtl:-scale-x-100", "aria-hidden": true }),
          /* @__PURE__ */ jsx("span", { children: nameOf(d, l) }),
          Object.keys(errors[i]).length > 0 && /* @__PURE__ */ jsx(Badge, { tone: "danger", children: "!" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-line p-3", children: body(d, errors[i]) })
      ] }),
      d.kind !== "cpu" && d.kind !== "memory" && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": l.remove(nameOf(d, l)),
          disabled: locked(d.kind),
          title: locked(d.kind) ? l.hotAddDisabled : void 0,
          className: "absolute end-3 top-2 text-muted hover:text-danger disabled:opacity-40",
          onClick: () => setDevices(devices.filter((x) => x.id !== d.id)),
          children: /* @__PURE__ */ jsx(Trash2, { className: "size-4", "aria-hidden": true })
        }
      )
    ] }, d.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-line bg-surface p-3", children: [
      /* @__PURE__ */ jsx("h4", { className: "mb-1 text-xs font-semibold text-muted uppercase", children: l.pendingChanges }),
      diff.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-subtle", children: l.noChanges }) : /* @__PURE__ */ jsx("ul", { "aria-label": l.pendingChanges, className: "list-disc ps-5 text-sm", children: diff.map((x) => /* @__PURE__ */ jsx("li", { children: x }, x)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", disabled: diff.length === 0, onClick: () => setDevices(base), children: l.discard }),
      /* @__PURE__ */ jsx(Button, { disabled: diff.length === 0 || invalid, onClick: () => onSave?.(devices), children: l.save })
    ] }),
    renderIsoPicker && /* @__PURE__ */ jsx(Dialog, { open: pickFor !== null, onOpenChange: (o) => !o && setPickFor(null), children: /* @__PURE__ */ jsx(DialogContent, { title: l.chooseIso, className: "w-[min(56rem,95vw)]", children: renderIsoPicker(
      (iso) => {
        if (pickFor) update(pickFor, { iso });
        setPickFor(null);
      },
      () => setPickFor(null)
    ) }) })
  ] });
}
var parentOf = (p) => p.lastIndexOf("/") <= 0 ? "/" : p.slice(0, p.lastIndexOf("/"));
var baseName = (p) => p.slice(p.lastIndexOf("/") + 1);
function DatastoreBrowser({
  entries,
  path: pathProp,
  defaultPath = "/",
  onPathChange,
  onLoadFolder,
  uploads = [],
  onUpload,
  onDownload,
  onCreateFolder,
  onDelete,
  select,
  accept,
  onSelect,
  onCancel,
  labels,
  className
}) {
  const { format: format2, t: laf } = useLaf2();
  const l = { ...laf.components.vsphereObjects.datastore, ...labels };
  const [path, setPath] = useControllableState({ value: pathProp, defaultValue: defaultPath, onChange: onPathChange });
  const [chosen, setChosen] = React4.useState(null);
  const [toDelete, setToDelete] = React4.useState(null);
  const [naming, setNaming] = React4.useState(false);
  const [folderName, setFolderName] = React4.useState("");
  const loaded = React4.useRef(/* @__PURE__ */ new Set());
  const matches = (e) => e.type === "folder" || !accept || accept.some((a) => e.path.toLowerCase().endsWith(a.toLowerCase()));
  const children = React4.useMemo(
    () => entries.filter((e) => parentOf(e.path) === path && e.path !== "/").sort((a, b) => a.type === b.type ? baseName(a.path).localeCompare(baseName(b.path)) : a.type === "folder" ? -1 : 1),
    [entries, path]
  );
  const nodes = React4.useMemo(() => {
    const build = (parent) => entries.filter((e) => e.type === "folder" && parentOf(e.path) === parent && e.path !== "/").map((e) => {
      const kids = build(e.path);
      return { id: e.path, label: baseName(e.path), icon: /* @__PURE__ */ jsx(ObjectIcon, { kind: "folder" }), children: kids, hasChildren: !!onLoadFolder && kids.length === 0 };
    });
    return [{ id: "/", label: l.root, icon: /* @__PURE__ */ jsx(ObjectIcon, { kind: "datastore" }), children: build("/") }];
  }, [entries, onLoadFolder, l.root]);
  const load = async (p) => {
    if (!onLoadFolder || loaded.current.has(p)) return;
    loaded.current.add(p);
    await onLoadFolder(p);
  };
  const open = (p) => {
    setPath(p);
    setChosen(null);
    void load(p);
  };
  const crumbs = path === "/" ? [] : path.split("/").filter(Boolean);
  const chosenEntry = entries.find((e) => e.path === chosen);
  const canPick = select === "folder" ? true : !!chosenEntry && chosenEntry.type === "file";
  return /* @__PURE__ */ jsxs("div", { className: cn("grid gap-3", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxs("nav", { "aria-label": l.path, className: "flex min-w-0 flex-1 items-center gap-1 text-sm", children: [
        /* @__PURE__ */ jsx("button", { type: "button", className: "text-primary hover:underline", onClick: () => open("/"), children: l.root }),
        crumbs.map((c, i) => {
          const p = `/${crumbs.slice(0, i + 1).join("/")}`;
          return /* @__PURE__ */ jsxs(React4.Fragment, { children: [
            /* @__PURE__ */ jsx(ChevronRight, { className: "size-3 text-subtle rtl:-scale-x-100", "aria-hidden": true }),
            /* @__PURE__ */ jsx("button", { type: "button", "aria-current": p === path ? "location" : void 0, className: cn("hover:underline", p === path ? "text-fg" : "text-primary"), onClick: () => open(p), children: c })
          ] }, p);
        })
      ] }),
      onCreateFolder && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", leftIcon: /* @__PURE__ */ jsx(FolderPlus, { "aria-hidden": true }), onClick: () => setNaming(true), children: l.newFolder })
    ] }),
    naming && /* @__PURE__ */ jsxs(
      "form",
      {
        className: "flex items-end gap-2",
        onSubmit: (e) => {
          e.preventDefault();
          const n = folderName.trim();
          if (!n) return;
          onCreateFolder?.(n, path);
          setFolderName("");
          setNaming(false);
        },
        children: [
          /* @__PURE__ */ jsx(Field, { label: l.folderName, htmlFor: "ds-new-folder", children: /* @__PURE__ */ jsx(Input, { id: "ds-new-folder", autoFocus: true, value: folderName, onChange: (e) => setFolderName(e.target.value) }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", size: "sm", children: l.create }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => setNaming(false), children: l.cancel })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-[14rem_1fr]", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-md border border-line bg-surface p-1", children: /* @__PURE__ */ jsx(
        TreeView,
        {
          label: l.tree,
          nodes,
          defaultExpanded: ["/"],
          selected: path,
          onSelect: (id) => open(id),
          loadChildren: onLoadFolder ? async (id) => load(id) : void 0,
          virtual: false
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 rounded-md border border-line bg-surface", children: [
        /* @__PURE__ */ jsxs("table", { role: "grid", "aria-label": l.files, className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-line text-start text-xs text-muted", children: [
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-2 text-start font-medium", children: l.name }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-2 text-start font-medium", children: l.size }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-2 text-start font-medium", children: l.modified }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "w-20", children: /* @__PURE__ */ jsxs("span", { className: "sr-only", children: [
              l.download,
              " / ",
              l.delete
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: children.map((e) => {
            const ok = matches(e);
            const selectable = select === "folder" ? e.type === "folder" : select === "file" ? e.type === "file" && ok : false;
            return /* @__PURE__ */ jsxs(
              "tr",
              {
                tabIndex: 0,
                "aria-selected": select ? chosen === e.path : void 0,
                "aria-disabled": select && e.type === "file" && !ok ? true : void 0,
                className: cn("cursor-default border-b border-line outline-none last:border-0 hover:bg-surface-hover focus-visible:bg-surface-hover", chosen === e.path && "bg-primary-light", select && e.type === "file" && !ok && "opacity-40"),
                onClick: () => selectable && setChosen(e.path),
                onDoubleClick: () => e.type === "folder" ? open(e.path) : selectable && onSelect?.(e),
                onKeyDown: (ev) => {
                  if (ev.key === "Enter") {
                    if (e.type === "folder") open(e.path);
                    else if (selectable) onSelect?.(e);
                  } else if (ev.key === " " && selectable) {
                    ev.preventDefault();
                    setChosen(e.path);
                  }
                },
                children: [
                  /* @__PURE__ */ jsx("td", { role: "gridcell", className: "px-3 py-1.5", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(ObjectIcon, { kind: e.type === "folder" ? "folder" : "template", label: e.type === "folder" ? l.folder : l.file }),
                    baseName(e.path)
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { role: "gridcell", className: "px-3 py-1.5 text-muted tabular-nums", children: e.type === "file" && e.size !== void 0 ? format2.bytes(e.size, { base: 1024 }) : "" }),
                  /* @__PURE__ */ jsx("td", { role: "gridcell", className: "px-3 py-1.5 text-muted", children: e.modified !== void 0 ? /* @__PURE__ */ jsx(RelativeTime, { value: e.modified }) : "" }),
                  /* @__PURE__ */ jsxs("td", { role: "gridcell", className: "px-3 py-1.5 text-end", children: [
                    !select && e.type === "file" && onDownload && /* @__PURE__ */ jsx("button", { type: "button", "aria-label": `${l.download}: ${baseName(e.path)}`, className: "me-2 text-muted hover:text-fg", onClick: (ev) => (ev.stopPropagation(), onDownload(e)), children: /* @__PURE__ */ jsx(Download, { className: "size-4", "aria-hidden": true }) }),
                    !select && onDelete && /* @__PURE__ */ jsx("button", { type: "button", "aria-label": `${l.delete}: ${baseName(e.path)}`, className: "text-muted hover:text-danger", onClick: (ev) => (ev.stopPropagation(), setToDelete(e)), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4", "aria-hidden": true }) })
                  ] })
                ]
              },
              e.path
            );
          }) })
        ] }),
        children.length === 0 && /* @__PURE__ */ jsx("p", { className: "p-4 text-center text-sm text-subtle", children: l.empty })
      ] })
    ] }),
    onUpload && !select && /* @__PURE__ */ jsx(FileDropzone, { files: uploads, onFiles: (f) => onUpload(f, path), label: l.upload }),
    select && /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      onCancel && /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: onCancel, children: l.cancel }),
      /* @__PURE__ */ jsx(
        Button,
        {
          disabled: !canPick,
          onClick: () => {
            const target = select === "folder" ? chosenEntry ?? entries.find((e) => e.path === path) ?? { path, type: "folder" } : chosenEntry;
            if (target) onSelect?.(target);
          },
          children: l.select
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        open: toDelete !== null,
        onOpenChange: (o) => !o && setToDelete(null),
        title: l.deleteTitle,
        description: toDelete ? l.deleteDescription(baseName(toDelete.path)) : "",
        confirmLabel: l.delete,
        onConfirm: () => {
          if (toDelete) onDelete?.(toDelete);
          setToDelete(null);
        }
      }
    )
  ] });
}
function PermissionAssignDialog({ open, onOpenChange, principals, roles, objectPath, defaultRoleId, defaultPropagate = true, onAssign, labels }) {
  const { t: laf } = useLaf2();
  const l = { ...laf.components.vsphereObjects.permission, ...labels };
  const [principal, setPrincipal] = React4.useState([]);
  const [roleId, setRoleId] = React4.useState(defaultRoleId ?? roles[0]?.id ?? "");
  const [propagate, setPropagate] = React4.useState(defaultPropagate);
  const [pending, setPending] = React4.useState(false);
  React4.useEffect(() => {
    if (open) {
      setPrincipal([]);
      setRoleId(defaultRoleId ?? roles[0]?.id ?? "");
      setPropagate(defaultPropagate);
    }
  }, [open, defaultRoleId, defaultPropagate, roles]);
  const role = roles.find((r) => r.id === roleId);
  const submit = async () => {
    if (!principal[0] || !roleId) return;
    setPending(true);
    try {
      await onAssign({ principal: principal[0], roleId, propagate });
      onOpenChange(false);
    } finally {
      setPending(false);
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsx(
    DialogContent,
    {
      title: l.title,
      footer: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => onOpenChange(false), children: l.cancel }),
        /* @__PURE__ */ jsx(Button, { loading: pending, disabled: !principal[0] || !roleId, onClick: submit, children: l.assign })
      ] }),
      children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsx(Field, { label: l.object, htmlFor: "perm-object", children: /* @__PURE__ */ jsx(Input, { id: "perm-object", readOnly: true, value: objectPath }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: l.principal }),
          /* @__PURE__ */ jsx(Combobox, { label: l.principal, options: principals, value: principal, onChange: setPrincipal })
        ] }),
        /* @__PURE__ */ jsx(Field, { label: l.role, htmlFor: "perm-role", hint: role?.description, children: /* @__PURE__ */ jsx("select", { id: "perm-role", className: "form-select", value: roleId, onChange: (e) => setRoleId(e.target.value), children: roles.map((r) => /* @__PURE__ */ jsx("option", { value: r.id, children: r.name }, r.id)) }) }),
        /* @__PURE__ */ jsx(Switch, { checked: propagate, onChange: (e) => setPropagate(e.target.checked), children: l.propagate })
      ] })
    }
  ) });
}
function SnapshotTree({ snapshots, currentId, onTake, onRevert, onDelete, onDeleteChildren, needsConsolidation, onConsolidate, labels, className }) {
  const { format: format2, t: laf } = useLaf2();
  const l = { ...laf.components.vsphereObjects.snapshots, ...labels };
  const [selected, setSelected] = React4.useState();
  const [confirm, setConfirm] = React4.useState(null);
  const index = React4.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    const walk = (n) => (m.set(n.id, n), n.children?.forEach(walk));
    snapshots.forEach(walk);
    return m;
  }, [snapshots]);
  const toNode = (s) => ({
    id: s.id,
    textValue: s.name,
    icon: /* @__PURE__ */ jsx(ObjectIcon, { kind: "snapshot" }),
    label: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { children: s.name }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted", children: /* @__PURE__ */ jsx(RelativeTime, { value: s.createdAt }) }),
      s.sizeBytes !== void 0 && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted", children: format2.bytes(s.sizeBytes, { base: 1024 }) }),
      s.id === currentId && /* @__PURE__ */ jsx(Badge, { tone: "primary", children: l.youAreHere })
    ] }),
    children: s.children?.map(toNode)
  });
  const nodes = React4.useMemo(() => snapshots.map(toNode), [snapshots, currentId, format2]);
  const allIds = React4.useMemo(() => [...index.keys()], [index]);
  const sel = selected ? index.get(selected) : void 0;
  const confirmText = confirm ? (confirm.kind === "revert" ? l.confirmRevert : confirm.kind === "delete" ? l.confirmDelete : l.confirmDeleteChildren)(confirm.node.name) : "";
  return /* @__PURE__ */ jsxs("div", { className: cn("grid gap-3", className), children: [
    needsConsolidation && /* @__PURE__ */ jsx(Banner, { tone: "warn", action: onConsolidate && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", onClick: onConsolidate, children: l.consolidate }), children: l.consolidationNeeded }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      onTake && /* @__PURE__ */ jsx(Button, { size: "sm", onClick: onTake, children: l.take }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", disabled: !sel, onClick: () => sel && setConfirm({ kind: "revert", node: sel }), children: l.revert }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", disabled: !sel, onClick: () => sel && setConfirm({ kind: "delete", node: sel }), children: l.delete }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", disabled: !sel?.children?.length, onClick: () => sel && setConfirm({ kind: "children", node: sel }), children: l.deleteChildren })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border border-line bg-surface p-1", children: /* @__PURE__ */ jsx(TreeView, { label: l.tree, nodes, defaultExpanded: allIds, selected, onSelectedChange: (ids) => setSelected(ids[0]), virtual: false }) }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        open: confirm !== null,
        onOpenChange: (o) => !o && setConfirm(null),
        title: confirm ? l[confirm.kind === "children" ? "deleteChildren" : confirm.kind] : "",
        description: confirmText,
        confirmLabel: confirm ? l[confirm.kind === "children" ? "deleteChildren" : confirm.kind] : "",
        cancelLabel: l.cancel,
        onConfirm: () => {
          if (confirm?.kind === "revert") onRevert?.(confirm.node.id);
          else if (confirm?.kind === "delete") onDelete?.(confirm.node.id);
          else if (confirm) onDeleteChildren?.(confirm.node.id);
          setConfirm(null);
        }
      }
    )
  ] });
}
var sevTone = { info: "primary", warning: "warn", error: "danger" };
function EventConsole({ events, liveTail: liveProp, onLiveTailChange, labels, className }) {
  const { t: laf } = useLaf2();
  const l = { ...laf.components.vsphereObjects.events, ...labels };
  const [live, setLive] = useControllableState({ value: liveProp, defaultValue: false, onChange: onLiveTailChange });
  const [query, setQuery] = React4.useState("");
  const [sev, setSev] = React4.useState("all");
  const [open, setOpen] = React4.useState(null);
  const rows = React4.useMemo(() => {
    const q = query.toLowerCase();
    return events.filter((e) => (sev === "all" || e.severity === sev) && (!q || [e.message, e.source, e.user].some((v) => v?.toLowerCase().includes(q)))).sort((a, b) => +new Date(b.time) - +new Date(a.time));
  }, [events, query, sev]);
  return /* @__PURE__ */ jsxs("section", { "aria-label": l.title, className: cn("grid gap-3", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx(Input, { type: "search", className: "max-w-xs", "aria-label": l.search, placeholder: `${l.search}\u2026`, value: query, onChange: (e) => setQuery(e.target.value) }),
      /* @__PURE__ */ jsxs("select", { "aria-label": l.severity, className: "form-select w-auto", value: sev, onChange: (e) => setSev(e.target.value), children: [
        /* @__PURE__ */ jsx("option", { value: "all", children: l.all }),
        /* @__PURE__ */ jsx("option", { value: "info", children: l.info }),
        /* @__PURE__ */ jsx("option", { value: "warning", children: l.warning }),
        /* @__PURE__ */ jsx("option", { value: "error", children: l.error })
      ] }),
      /* @__PURE__ */ jsx(Switch, { className: "ms-auto", checked: live, onChange: (e) => setLive(e.target.checked), children: l.liveTail })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-auto rounded-md border border-line bg-surface", children: [
      /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-line text-xs text-muted", children: [
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-2 text-start font-medium", children: l.severity }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-2 text-start font-medium", children: l.time }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-2 text-start font-medium", children: l.message }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-2 text-start font-medium", children: l.source }),
          /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-2 text-start font-medium", children: l.user })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { "aria-live": live ? "polite" : "off", children: rows.map((e) => /* @__PURE__ */ jsxs(
          "tr",
          {
            tabIndex: 0,
            className: "cursor-pointer border-b border-line outline-none last:border-0 hover:bg-surface-hover focus-visible:bg-surface-hover",
            onClick: () => setOpen(e),
            onKeyDown: (ev) => ev.key === "Enter" && setOpen(e),
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5", children: /* @__PURE__ */ jsx(StatusDot, { tone: sevTone[e.severity], label: l[e.severity] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5 whitespace-nowrap text-muted", children: /* @__PURE__ */ jsx(RelativeTime, { value: e.time }) }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5", children: e.message }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5 text-muted", children: e.source }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5 text-muted", children: e.user })
            ]
          },
          e.id
        )) })
      ] }),
      rows.length === 0 && /* @__PURE__ */ jsx("p", { className: "p-4 text-center text-sm text-subtle", children: l.empty })
    ] }),
    /* @__PURE__ */ jsx(Drawer, { open: open !== null, onOpenChange: (o) => !o && setOpen(null), children: /* @__PURE__ */ jsx(DrawerContent, { title: l.details, description: open?.message, children: open && /* @__PURE__ */ jsxs("dl", { className: "grid gap-2 text-sm", children: [
      /* @__PURE__ */ jsx("dt", { className: "text-muted", children: l.severity }),
      /* @__PURE__ */ jsx("dd", { children: l[open.severity] }),
      /* @__PURE__ */ jsx("dt", { className: "text-muted", children: l.time }),
      /* @__PURE__ */ jsx("dd", { children: new Date(open.time).toISOString() }),
      open.source && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("dt", { className: "text-muted", children: l.source }),
        /* @__PURE__ */ jsx("dd", { children: open.source })
      ] }),
      open.user && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("dt", { className: "text-muted", children: l.user }),
        /* @__PURE__ */ jsx("dd", { children: open.user })
      ] }),
      open.details && /* @__PURE__ */ jsx("pre", { className: "overflow-auto rounded-sm bg-black/30 p-2 font-mono text-xs", children: open.details })
    ] }) }) })
  ] });
}

export { AlarmList, BarChart, ConfirmDialog, ConsoleFrame, CopyButton, DatastoreBrowser, DateTimeInput, DefinitionList, Donut, ErrorSummary, EventConsole, FileDropzone, FormField, Gauge, HardwareEditor, InlineEdit, Kbd, MenuSpecItems, PasswordField, PermissionAssignDialog, Progress, SecretDisplay, SnapshotTree, Stepper, TreeView };
//# sourceMappingURL=chunk-AUBFJ3N2.js.map
//# sourceMappingURL=chunk-AUBFJ3N2.js.map