'use strict';

var chunkKSR6EHJ3_cjs = require('./chunk-KSR6EHJ3.cjs');
var chunkIP6HZMS5_cjs = require('./chunk-IP6HZMS5.cjs');
var chunkRDHTRBBP_cjs = require('./chunk-RDHTRBBP.cjs');
var chunkFTHFEMX6_cjs = require('./chunk-FTHFEMX6.cjs');
var lucideReact = require('lucide-react');
var React = require('react');
var jsxRuntime = require('react/jsx-runtime');

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

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var lafDefaults = { dashboard: chunkKSR6EHJ3_cjs.dashboardEn };
var useChartLaf = () => chunkRDHTRBBP_cjs.useLafDefaults(lafDefaults);
var CHART_TONES = ["text-label-9", "text-label-5", "text-label-3", "text-label-1", "text-label-7", "text-label-11", "text-label-2", "text-label-6"];
var chartTone = (i) => CHART_TONES[i % CHART_TONES.length];
function useChartWidth(fixed, initial = 480) {
  const ref = React__namespace.useRef(null);
  const [w, setW] = React__namespace.useState(initial);
  React__namespace.useEffect(() => {
    const el = ref.current;
    if (fixed !== void 0 || !el || typeof ResizeObserver === "undefined") return;
    const apply = () => el.clientWidth > 0 && setW(el.clientWidth);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fixed]);
  return [ref, fixed ?? w];
}
function useActiveIndex(count, containerRef) {
  const [active, setActive] = React__namespace.useState(null);
  const [keyboard, setKeyboard] = React__namespace.useState(false);
  const fallback = React__namespace.useRef(null);
  chunkKSR6EHJ3_cjs.useTooltipDismiss(active !== null, containerRef ?? fallback, () => (setActive(null), setKeyboard(false)));
  const onKeyDown = (e) => {
    if (!count) return;
    const cur = active ?? -1;
    const go = (i) => {
      e.preventDefault();
      setKeyboard(true);
      setActive(Math.min(count - 1, Math.max(0, i)));
    };
    const next = e.key === "ArrowDown" || e.key === "ArrowRight";
    const prev = e.key === "ArrowUp" || e.key === "ArrowLeft";
    if (next) go(cur + 1);
    else if (prev) go(cur < 0 ? count - 1 : cur - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(count - 1);
    else if (e.key === "Escape") setActive(null);
  };
  return { active, setActive, keyboard, setKeyboard, onKeyDown, onBlur: () => (setActive(null), setKeyboard(false)) };
}
function ChartLegend({ items, hidden = [], onToggle, onHover, label, className }) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  return /* @__PURE__ */ jsxRuntime.jsx("ul", { "aria-label": label ?? c.legend, className: chunkFTHFEMX6_cjs.cn("m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-1 p-0 text-xs text-muted", className), children: items.map((it) => {
    const off = hidden.includes(it.id);
    const swatch = /* @__PURE__ */ jsxRuntime.jsx("svg", { width: "14", height: "8", "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn(it.tone, off && "opacity-40"), children: it.dash ? /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "0", x2: "14", y1: "4", y2: "4", stroke: "currentColor", strokeWidth: "2.5", strokeDasharray: it.dash }) : /* @__PURE__ */ jsxRuntime.jsx("rect", { width: "14", height: "8", rx: "2", fill: "currentColor" }) });
    return /* @__PURE__ */ jsxRuntime.jsx("li", { children: onToggle ? /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "button", onPointerEnter: () => onHover?.(it.id), onPointerLeave: () => onHover?.(null), onFocus: () => onHover?.(it.id), onBlur: () => onHover?.(null), "aria-pressed": !off, "aria-label": c.toggleSeries(it.name), onClick: () => onToggle(it.id), className: chunkFTHFEMX6_cjs.cn("inline-flex items-center gap-1.5 rounded-sm border-0 bg-transparent p-0.5 text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50", off && "line-through opacity-70"), children: [
      swatch,
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: it.name }),
      it.value !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("b", { className: "font-mono text-fg", children: it.value })
    ] }) : /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
      swatch,
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: it.name }),
      it.value !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("b", { className: "font-mono text-fg", children: it.value })
    ] }) }, it.id);
  }) });
}
function ChartFrame({
  label,
  plot,
  legend,
  table,
  announce,
  loading,
  empty,
  error,
  onRetry,
  height,
  plotRef,
  animate,
  className
}) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  const [showTable, setShowTable] = React__namespace.useState(false);
  const id = React__namespace.useId();
  const status = loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { role: "status", "aria-label": c.loading, className: "size-full animate-pulse rounded-sm bg-muted-bg motion-reduce:animate-none" }) : error ? /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "alert", className: "grid size-full place-content-center justify-items-center gap-2 text-sm text-danger", children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { children: typeof error === "string" ? error : c.error }),
    onRetry && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", onClick: onRetry, children: c.retry })
  ] }) : empty ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid size-full place-items-center text-sm text-muted", children: c.empty }) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("figure", { "aria-label": label, "aria-busy": loading || void 0, "data-animate": animate === void 0 ? void 0 : animate ? "on" : "off", className: chunkFTHFEMX6_cjs.cn("m-0 grid min-w-0 grid-cols-1 gap-2", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { ref: plotRef, dir: "ltr", className: "relative min-w-0", style: { height }, children: status ?? plot }),
    !status && legend,
    !status && table && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "button", "aria-expanded": showTable, "aria-controls": `${id}-table`, onClick: () => setShowTable((v) => !v), className: "inline-flex items-center gap-1.5 justify-self-start border-0 bg-transparent p-0.5 text-xs text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50", children: [
        showTable ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.BarChart3, { "aria-hidden": true, className: "size-3.5" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.TableProperties, { "aria-hidden": true, className: "size-3.5" }),
        showTable ? c.hideData : c.showData
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { id: `${id}-table`, hidden: !showTable, className: "max-h-60 overflow-auto", children: showTable && /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "w-full border-collapse text-xs tabular-nums", children: [
        /* @__PURE__ */ jsxRuntime.jsx("caption", { className: "sr-only", children: label }),
        /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsx("tr", { children: table.head.map((h) => /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "border-b border-line px-2 py-1 text-start font-medium text-muted", children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: table.rows.map((r, i) => /* @__PURE__ */ jsxRuntime.jsx("tr", { children: r.map(
          (cell, j) => j === 0 ? /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "row", className: "border-b border-line px-2 py-1 text-start font-normal", children: cell }, j) : /* @__PURE__ */ jsxRuntime.jsx("td", { className: "border-b border-line px-2 py-1 text-start", children: cell }, j)
        ) }, i)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "sr-only", role: "status", "aria-live": "polite", children: announce })
  ] });
}
function thresholdTone(pct, warnAt, dangerAt) {
  return pct >= dangerAt ? "danger" : pct >= warnAt ? "warn" : "ok";
}
var toneClasses = { primary: { ok: "text-primary", warn: "text-warn", danger: "text-danger" }, ok: { ok: "text-ok", warn: "text-warn", danger: "text-danger" } };
function ThresholdDonut({ value, max = 100, warnAt = 60, dangerAt = 90, subtext, label, size = 160, legend = true, centerText, okTone = "primary", animate, tooltip = true, className }) {
  const { t, format } = useChartLaf();
  const toneClass = toneClasses[okTone];
  const u = t.components.dashboard.utilization;
  const pct = max > 0 ? Math.min(100, Math.max(0, value / max * 100)) : 0;
  const tone = thresholdTone(pct, warnAt, dangerAt);
  const pctText = format.percent(pct / 100, { fractionDigits: 0 });
  const summary = `${u.donutSummary(label, pctText, typeof subtext === "string" ? subtext : "", format.percent(warnAt / 100, { fractionDigits: 0 }), format.percent(dangerAt / 100, { fractionDigits: 0 }))} ${u.status[tone]}.`.replace(/\s+\./g, ".");
  const motion = chunkKSR6EHJ3_cjs.useChartMotion(animate);
  const box = React__namespace.useRef(null);
  const [open, setOpen] = React__namespace.useState(false);
  chunkKSR6EHJ3_cjs.useTooltipDismiss(open, box, () => setOpen(false));
  const tipId = React__namespace.useId();
  const c = size / 2;
  const outerW = Math.max(4, size / 20);
  const innerW = Math.max(8, size / 10);
  const rOuter = c - outerW / 2;
  const rInner = rOuter - outerW / 2 - 4 - innerW / 2;
  const arc = (r, w, from, to, cls, anim) => /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: c, cy: c, r, fill: "none", stroke: "currentColor", strokeWidth: w, pathLength: 100, strokeDasharray: `${Math.max(0, to - from)} ${100 - Math.max(0, to - from)}`, strokeDashoffset: -from, transform: `rotate(-90 ${c} ${c})`, className: chunkFTHFEMX6_cjs.cn(cls, anim?.className), style: anim?.style });
  const pctOf = (n) => format.percent(n / 100, { fractionDigits: 0 });
  const ctx = {
    point: { label, value: pct, formatted: pctText },
    index: 0,
    series: [
      { id: "usage", name: u.capacity, value: pct, formatted: pctText, tone: toneClass[tone] },
      { id: "warn", name: u.warning, value: warnAt, formatted: pctOf(warnAt), tone: "text-warn" },
      { id: "danger", name: u.danger, value: dangerAt, formatted: pctOf(dangerAt), tone: "text-danger" }
    ]
  };
  const tipOn = open && tooltip !== false;
  const items = [
    { id: "warn", name: u.warning, tone: "text-warn opacity-50", value: pctOf(warnAt) },
    { id: "danger", name: u.danger, tone: "text-danger opacity-50", value: pctOf(dangerAt) },
    { id: "usage", name: u.capacity, tone: toneClass[tone], value: pctText }
  ];
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("flex flex-wrap items-center gap-4", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: box, dir: "ltr", "data-animate": motion.enabled ? "on" : "off", className: "relative shrink-0", style: { width: size, height: size, ...chunkKSR6EHJ3_cjs.motionVars(motion) }, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "svg",
        {
          width: size,
          height: size,
          role: "img",
          "aria-label": summary,
          "aria-describedby": tipOn ? tipId : void 0,
          tabIndex: tooltip === false ? void 0 : 0,
          className: "block outline-none focus-visible:outline-2 focus-visible:outline-primary",
          onPointerEnter: () => setOpen(true),
          onPointerDown: () => setOpen(true),
          onPointerLeave: (e) => e.pointerType !== "touch" && setOpen(false),
          onFocus: () => setOpen(true),
          onBlur: () => setOpen(false),
          children: [
            arc(rOuter, outerW, 0, 100, "text-line"),
            arc(rOuter, outerW, warnAt, dangerAt, "text-warn opacity-50", chunkKSR6EHJ3_cjs.entryAnim(motion, "fade", 1)),
            arc(rOuter, outerW, dangerAt, 100, "text-danger opacity-50", chunkKSR6EHJ3_cjs.entryAnim(motion, "fade", 2)),
            arc(rInner, innerW, 0, 100, "text-muted-bg"),
            arc(rInner, innerW, 0, pct, toneClass[tone], { ...chunkKSR6EHJ3_cjs.entryAnim(motion, "sweep"), className: chunkFTHFEMX6_cjs.cn(chunkKSR6EHJ3_cjs.tweenClass(motion), chunkKSR6EHJ3_cjs.entryAnim(motion, "sweep").className) })
          ]
        }
      ),
      tipOn && /* @__PURE__ */ jsxRuntime.jsx(chunkKSR6EHJ3_cjs.ChartTooltipFor, { option: tooltip, ctx, x: c, y: 0, id: tipId, container: box }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { "aria-hidden": true, className: "absolute inset-0 grid place-content-center text-center", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-2xl leading-tight text-fg tabular-nums", children: centerText ?? pctText }),
        subtext && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted", children: subtext })
      ] })
    ] }),
    legend && /* @__PURE__ */ jsxRuntime.jsx(
      ChartLegend,
      {
        items: items.map((i) => ({ ...i, name: `${i.name}:`, value: i.value })),
        label: u.segments,
        className: "flex-col items-start"
      }
    )
  ] });
}

exports.CHART_TONES = CHART_TONES;
exports.ChartFrame = ChartFrame;
exports.ChartLegend = ChartLegend;
exports.ThresholdDonut = ThresholdDonut;
exports.chartTone = chartTone;
exports.thresholdTone = thresholdTone;
exports.useActiveIndex = useActiveIndex;
exports.useChartLaf = useChartLaf;
exports.useChartWidth = useChartWidth;
//# sourceMappingURL=chunk-POS2KJDE.cjs.map
//# sourceMappingURL=chunk-POS2KJDE.cjs.map