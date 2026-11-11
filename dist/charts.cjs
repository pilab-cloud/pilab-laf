'use strict';

var chunkOKADVGBW_cjs = require('./chunk-OKADVGBW.cjs');
var chunk5WBFJQAZ_cjs = require('./chunk-5WBFJQAZ.cjs');
var chunkQ6OCMENQ_cjs = require('./chunk-Q6OCMENQ.cjs');
var chunkIP6HZMS5_cjs = require('./chunk-IP6HZMS5.cjs');
var chunkFTHFEMX6_cjs = require('./chunk-FTHFEMX6.cjs');
var axis = require('@visx/axis');
var group = require('@visx/group');
var scale = require('@visx/scale');
var shape = require('@visx/shape');
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

// lib/charts/lttb.ts
function lttb(points, threshold) {
  const n = points.length;
  if (threshold >= n) return points.slice();
  if (threshold < 3) return [points[0], points[n - 1]];
  const out = [points[0]];
  const every = (n - 2) / (threshold - 2);
  let a = 0;
  for (let i = 0; i < threshold - 2; i++) {
    const nextStart = Math.floor((i + 1) * every) + 1;
    const nextEnd = Math.min(Math.floor((i + 2) * every) + 1, n);
    let avgT = 0;
    let avgV = 0;
    for (let j = nextStart; j < nextEnd; j++) {
      avgT += points[j][0];
      avgV += points[j][1];
    }
    const len = nextEnd - nextStart || 1;
    avgT /= len;
    avgV /= len;
    const start = Math.floor(i * every) + 1;
    const end = Math.floor((i + 1) * every) + 1;
    const [at, av] = points[a];
    let best = -1;
    let pick = start;
    for (let j = start; j < end; j++) {
      const area = Math.abs((at - avgT) * (points[j][1] - av) - (at - points[j][0]) * (avgV - av));
      if (area > best) {
        best = area;
        pick = j;
      }
    }
    out.push(points[pick]);
    a = pick;
  }
  out.push(points[n - 1]);
  return out;
}
function downsample(points, maxPoints) {
  if (points.length <= maxPoints) return points;
  const runs = [];
  let cur = [];
  for (const [t, v] of points) {
    if (v === null || Number.isNaN(v)) {
      if (cur.length) runs.push(cur);
      cur = [];
    } else cur.push([t, v]);
  }
  if (cur.length) runs.push(cur);
  const total = runs.reduce((s, r) => s + r.length, 0) || 1;
  const out = [];
  runs.forEach((run, i) => {
    const budget = Math.max(3, Math.round(run.length / total * maxPoints));
    if (i > 0) out.push([run[0][0], null]);
    out.push(...lttb(run, budget));
  });
  return out;
}

// lib/messages/charts.en.ts
var chartsEn = {
  perfPanel: {
    metrics: "Metrics",
    pickMetrics: "Choose metrics\u2026",
    exportCsv: "Export CSV",
    metric: "Metric",
    latest: "Latest",
    min: "Min",
    avg: "Avg",
    max: "Max",
    summary: "Summary statistics",
    noMetrics: "Select at least one metric"
  },
  timeSeries: {
    showData: "Show data",
    hideData: "Hide data",
    resetZoom: "Reset zoom",
    noData: "No data",
    time: "Time",
    loading: "Loading",
    keyboardHint: "Arrow keys move the crosshair, Shift with arrows selects a range, Enter zooms to the selection, Escape clears it.",
    legend: "Series"
  }
};
var lafDefaults = { charts: chartsEn };
var useLaf = () => chunkQ6OCMENQ_cjs.useLafDefaults(lafDefaults);
var SERIES_TONES = ["text-primary", "text-ok", "text-warn", "text-danger"];
var SERIES_DASH = [void 0, "4 2", "1 3", "6 2 1 2"];
var MARGIN = { top: 8, bottom: 24, left: 56, right: 12, right2: 56 };
function formatUnit(f, unit, v) {
  const r = (n) => Math.round(n * 10) / 10;
  switch (unit) {
    case "%":
      return `${r(v)}%`;
    case "bytes":
      return f.bytes(v, { base: 1024 });
    case "bitrate":
      return f.bitrate(v);
    case "hz":
      return f.frequency(v);
    case "ms":
      return Math.abs(v) < 1e3 ? `${r(v)} ms` : f.duration(v);
    default:
      return Number.isInteger(v) ? String(v) : String(r(v));
  }
}
function useWidth(fixed) {
  const ref = React__namespace.useRef(null);
  const [w, setW] = React__namespace.useState(640);
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
function nearest(points, t) {
  let lo = 0;
  let hi = points.length - 1;
  while (lo < hi) {
    const mid = lo + hi >> 1;
    if (points[mid][0] < t) lo = mid + 1;
    else hi = mid;
  }
  if (lo > 0 && Math.abs(points[lo - 1][0] - t) <= Math.abs(points[lo][0] - t)) return lo - 1;
  return lo;
}
function TimeSeriesChart({
  series,
  type = "line",
  range: rangeProp,
  onRangeChange,
  thresholds = [],
  hiddenSeries: hiddenProp,
  onHiddenSeriesChange,
  loading,
  label,
  height = 240,
  width: widthProp,
  maxTableRows = 200,
  labels: labelsProp,
  className
}) {
  const { format, locale, timeZone, t: laf } = useLaf();
  const l = { ...laf.components.charts.timeSeries, ...labelsProp };
  const uid = React__namespace.useId();
  const [wrap, width] = useWidth(widthProp);
  const [hidden, setHidden] = chunk5WBFJQAZ_cjs.useControllableState({ value: hiddenProp, defaultValue: [], onChange: onHiddenSeriesChange });
  const [zoom, setZoom] = chunk5WBFJQAZ_cjs.useControllableState({ value: rangeProp, defaultValue: null, onChange: (r) => r && onRangeChange?.(r) });
  const [cursor, setCursor] = React__namespace.useState(null);
  const [sel, setSel] = React__namespace.useState(null);
  const [kbd, setKbd] = React__namespace.useState(false);
  const [showTable, setShowTable] = React__namespace.useState(false);
  const drag = React__namespace.useRef(null);
  const anchor = React__namespace.useRef(null);
  const svgRef = React__namespace.useRef(null);
  const full = React__namespace.useMemo(() => {
    let from = Infinity;
    let to = -Infinity;
    for (const s of series) {
      for (const [t] of s.points) {
        if (t < from) from = t;
        if (t > to) to = t;
      }
    }
    return from <= to ? { from, to: to === from ? to + 1 : to } : null;
  }, [series]);
  const domain = zoom ?? full;
  const zoomed = !!zoom && !!full && (zoom.from > full.from || zoom.to < full.to);
  const shown = React__namespace.useMemo(() => series.filter((s) => !hidden.includes(s.id)), [series, hidden]);
  const stacked = type === "stacked-area";
  const units = React__namespace.useMemo(() => {
    const u = [];
    for (const s of shown) if (!u.includes(s.unit)) u.push(s.unit);
    return stacked ? u.slice(0, 1) : u;
  }, [shown, stacked]);
  const axisOf = (u) => stacked ? 0 : Math.min(Math.max(units.indexOf(u), 0), 1);
  const dual = !stacked && units.length > 1;
  const innerW = Math.max(width - MARGIN.left - (dual ? MARGIN.right2 : MARGIN.right), 10);
  const innerH = Math.max(height - MARGIN.top - MARGIN.bottom, 10);
  const visible = React__namespace.useMemo(
    () => shown.map((s) => domain ? s.points.filter(([t]) => t >= domain.from && t <= domain.to) : s.points),
    [shown, domain]
  );
  const stamps = React__namespace.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const pts of visible) for (const [t] of pts) set.add(t);
    return [...set].sort((a, b) => a - b);
  }, [visible]);
  const lookups = React__namespace.useMemo(() => visible.map((pts) => new Map(pts)), [visible]);
  const stackedRows = React__namespace.useMemo(() => {
    if (!stacked) return null;
    const step = Math.max(1, Math.ceil(stamps.length / (innerW * 2)));
    const ts = stamps.filter((_, i) => i % step === 0 || i === stamps.length - 1);
    return ts.map((t) => {
      let acc = 0;
      const layers = lookups.map((m) => {
        const y0 = acc;
        acc += m.get(t) ?? 0;
        return [y0, acc];
      });
      return { t, layers };
    });
  }, [stacked, stamps, lookups, innerW]);
  const lines = React__namespace.useMemo(() => stacked ? [] : visible.map((pts) => downsample(pts, Math.max(Math.floor(innerW), 3))), [stacked, visible, innerW]);
  const x = React__namespace.useMemo(() => scale.scaleLinear({ domain: [domain?.from ?? 0, domain?.to ?? 1], range: [0, innerW] }), [domain, innerW]);
  const ys = React__namespace.useMemo(() => {
    return [0, 1].map((axis) => {
      let min = Infinity;
      let max = -Infinity;
      shown.forEach((s, i) => {
        if (axisOf(s.unit) !== axis) return;
        if (stacked) {
          for (const row of stackedRows ?? []) max = Math.max(max, row.layers[i][1]);
          min = Math.min(min, 0);
        } else for (const [, v] of visible[i]) if (v !== null) min = Math.min(min, v), max = Math.max(max, v);
      });
      if (axis === 0) for (const th of thresholds) min = Math.min(min, th.value), max = Math.max(max, th.value);
      if (!Number.isFinite(max)) min = 0, max = 1;
      const lo = Math.min(min, 0);
      const hi = max <= lo ? lo + 1 : max + (max - lo) * 0.05;
      return scale.scaleLinear({ domain: [lo, hi], range: [innerH, 0], nice: true });
    });
  }, [shown, visible, stackedRows, thresholds, innerH, type, stacked, units]);
  const tickT = React__namespace.useMemo(() => {
    const span = domain ? domain.to - domain.from : 0;
    const dtf = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      ...span > 2 * 864e5 ? { month: "short", day: "numeric" } : span < 12e4 ? { second: "2-digit" } : {}
    });
    return (v) => dtf.format(v);
  }, [domain, locale, timeZone]);
  const fullT = React__namespace.useMemo(() => {
    const dtf = new Intl.DateTimeFormat(locale, { timeZone, dateStyle: "medium", timeStyle: "medium" });
    return (v) => dtf.format(v);
  }, [locale, timeZone]);
  const clampT = (px) => domain ? Math.min(domain.to, Math.max(domain.from, x.invert(px))) : 0;
  const localX = (e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    return e.clientX - (rect?.left ?? 0) - MARGIN.left;
  };
  const applySel = (r) => {
    if (r && r.to > r.from) setZoom({ from: r.from, to: r.to });
    setSel(null);
    anchor.current = null;
  };
  const onPointerDown = (e) => {
    if (!domain || e.button > 0) return;
    const px = localX(e);
    drag.current = { anchor: clampT(px), moved: false };
    setKbd(false);
    try {
      svgRef.current?.setPointerCapture?.(e.pointerId);
    } catch {
    }
  };
  const onPointerMove = (e) => {
    if (!domain || !stamps.length) return;
    const t = clampT(localX(e));
    setCursor(t);
    setKbd(false);
    const d = drag.current;
    if (d) {
      if (Math.abs(x(t) - x(d.anchor)) > 3) d.moved = true;
      if (d.moved) setSel({ from: Math.min(d.anchor, t), to: Math.max(d.anchor, t) });
    }
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved && sel) applySel(sel);
    else setSel(null);
  };
  const onKeyDown = (e) => {
    if (!stamps.length) return;
    const cur = cursor ?? stamps[0];
    const idx = nearest(stamps.map((t) => [t, 0]), cur);
    const go = (i) => {
      const t = stamps[Math.min(stamps.length - 1, Math.max(0, i))];
      if (e.shiftKey) {
        anchor.current ??= cur;
        setSel({ from: Math.min(anchor.current, t), to: Math.max(anchor.current, t) });
      }
      setCursor(t);
      setKbd(true);
      e.preventDefault();
    };
    if (e.key === "ArrowRight") go(cursor === null ? 0 : idx + 1);
    else if (e.key === "ArrowLeft") go(cursor === null ? stamps.length - 1 : idx - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(stamps.length - 1);
    else if (e.key === "Enter" && sel) {
      applySel(sel);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setSel(null);
      setCursor(null);
      anchor.current = null;
    }
  };
  const onKeyUp = (e) => {
    if (e.key === "Shift") anchor.current = null;
  };
  const resetZoom = () => full && setZoom({ ...full });
  const toggle = (id) => setHidden(hidden.includes(id) ? hidden.filter((h) => h !== id) : [...hidden, id]);
  const unitFor = (u) => (v) => formatUnit(format, u, v);
  const axisUnit = (axis) => units[axis] ?? units[0] ?? "count";
  const tip = React__namespace.useMemo(() => {
    if (cursor === null || !stamps.length) return null;
    const t = stamps[nearest(stamps.map((s) => [s, 0]), cursor)];
    const rows = shown.map((s, i) => {
      const pts = visible[i];
      let v = null;
      if (pts.length) {
        const p = pts[nearest(pts, t)];
        const tol = pts.length > 1 ? (pts[pts.length - 1][0] - pts[0][0]) / (pts.length - 1) : Infinity;
        v = Math.abs(p[0] - t) <= tol ? p[1] : null;
      }
      return { s, i, v };
    });
    return { t, rows };
  }, [cursor, stamps, shown, visible]);
  const tipText = tip ? `${fullT(tip.t)}: ${tip.rows.map((r) => `${r.s.name} ${r.v === null ? "\u2013" : formatUnit(format, r.s.unit, r.v)}`).join(", ")}` : "";
  const tableRows = stamps.length > maxTableRows ? stamps.filter((_, i) => i % Math.ceil(stamps.length / maxTableRows) === 0) : stamps;
  const tableId = `${uid}-table`;
  const hintId = `${uid}-hint`;
  const empty = !loading && (!domain || series.every((s) => s.points.length === 0));
  const tipLeft = tip ? MARGIN.left + x(tip.t) : 0;
  return /* @__PURE__ */ jsxRuntime.jsxs("figure", { "aria-label": label, "aria-busy": loading || void 0, className: chunkFTHFEMX6_cjs.cn("m-0 grid grid-cols-1 gap-2", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { ref: wrap, className: "relative min-w-0", style: { height }, children: loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { role: "status", "aria-label": l.loading, className: "size-full animate-pulse rounded-sm bg-muted-bg" }) : empty ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid size-full place-items-center text-sm text-muted", children: l.noData }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "svg",
        {
          ref: svgRef,
          width,
          height,
          role: "img",
          "aria-label": label,
          "aria-describedby": hintId,
          tabIndex: 0,
          className: "touch-none text-muted select-none focus-visible:outline-2 focus-visible:outline-primary",
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onPointerLeave: () => {
            if (!drag.current) setCursor(null);
          },
          onKeyDown,
          onKeyUp,
          onBlur: () => {
            setKbd(false);
            anchor.current = null;
          },
          children: /* @__PURE__ */ jsxRuntime.jsxs(group.Group, { left: MARGIN.left, top: MARGIN.top, children: [
            ys[0].ticks(4).map((tv) => /* @__PURE__ */ jsxRuntime.jsx("line", { x1: 0, x2: innerW, y1: ys[0](tv), y2: ys[0](tv), stroke: "var(--border)" }, tv)),
            thresholds.map((th) => /* @__PURE__ */ jsxRuntime.jsx(
              "line",
              {
                "data-threshold": th.tone,
                x1: 0,
                x2: innerW,
                y1: ys[0](th.value),
                y2: ys[0](th.value),
                stroke: "currentColor",
                strokeDasharray: "6 3",
                className: th.tone === "danger" ? "text-danger" : "text-warn"
              },
              `${th.tone}-${th.value}`
            )),
            stacked ? shown.map((s, i) => /* @__PURE__ */ jsxRuntime.jsx(
              shape.Area,
              {
                data: stackedRows ?? [],
                x: (d) => x(d.t),
                y0: (d) => ys[0](d.layers[i][0]),
                y1: (d) => ys[0](d.layers[i][1]),
                fill: "currentColor",
                fillOpacity: 0.45,
                stroke: "currentColor",
                className: SERIES_TONES[series.indexOf(s) % 4]
              },
              s.id
            )) : shown.map((s, i) => {
              const si = series.indexOf(s);
              const ys_ = ys[axisOf(s.unit)];
              const tone = SERIES_TONES[si % 4];
              return /* @__PURE__ */ jsxRuntime.jsxs("g", { className: tone, "data-series": s.id, children: [
                type === "area" && /* @__PURE__ */ jsxRuntime.jsx(
                  shape.Area,
                  {
                    data: lines[i],
                    defined: (d) => d[1] !== null,
                    x: (d) => x(d[0]),
                    y0: ys_(Math.max(ys_.domain()[0], 0)),
                    y1: (d) => ys_(d[1]),
                    fill: "currentColor",
                    fillOpacity: 0.15
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  shape.LinePath,
                  {
                    data: lines[i],
                    defined: (d) => d[1] !== null,
                    x: (d) => x(d[0]),
                    y: (d) => ys_(d[1]),
                    stroke: "currentColor",
                    strokeWidth: 1.5,
                    strokeDasharray: SERIES_DASH[si % 4]
                  }
                )
              ] }, s.id);
            }),
            /* @__PURE__ */ jsxRuntime.jsx(axis.AxisBottom, { top: innerH, scale: x, numTicks: Math.max(2, Math.floor(innerW / 90)), tickFormat: (v) => tickT(v), stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { fill: "currentColor", fontSize: 10, textAnchor: "middle" } }),
            /* @__PURE__ */ jsxRuntime.jsx(axis.AxisLeft, { scale: ys[0], numTicks: 4, tickFormat: (v) => unitFor(axisUnit(0))(v), stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { fill: "currentColor", fontSize: 10, textAnchor: "end", dy: "0.33em" } }),
            dual && /* @__PURE__ */ jsxRuntime.jsx(axis.AxisRight, { left: innerW, scale: ys[1], numTicks: 4, tickFormat: (v) => unitFor(axisUnit(1))(v), stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { fill: "currentColor", fontSize: 10, textAnchor: "start", dy: "0.33em" } }),
            sel && /* @__PURE__ */ jsxRuntime.jsx("rect", { "data-brush": true, x: x(sel.from), y: 0, width: Math.max(x(sel.to) - x(sel.from), 1), height: innerH, fill: "currentColor", fillOpacity: 0.15, className: "text-primary" }),
            tip && /* @__PURE__ */ jsxRuntime.jsxs("g", { pointerEvents: "none", children: [
              /* @__PURE__ */ jsxRuntime.jsx("line", { x1: x(tip.t), x2: x(tip.t), y1: 0, y2: innerH, stroke: "var(--border-strong)" }),
              tip.rows.map(
                (r) => r.v !== null && /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: x(tip.t), cy: stacked ? ys[0](stackedRows?.find((row) => row.t === tip.t)?.layers[r.i]?.[1] ?? r.v) : ys[axisOf(r.s.unit)](r.v), r: 3, fill: "currentColor", className: SERIES_TONES[series.indexOf(r.s) % 4] }, r.s.id)
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { id: hintId, className: "sr-only", children: l.keyboardHint }),
      tip && /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          role: "tooltip",
          className: "pointer-events-none absolute top-2 z-10 min-w-36 rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-fg shadow-card",
          style: tipLeft > width / 2 ? { insetInlineStart: tipLeft - 8, transform: "translateX(-100%)" } : { insetInlineStart: tipLeft + 8 },
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-1 font-mono text-subtle", children: fullT(tip.t) }),
            tip.rows.map((r) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, className: chunkFTHFEMX6_cjs.cn("inline-block size-2 rounded-sm bg-current", SERIES_TONES[series.indexOf(r.s) % 4]) }),
                r.s.name
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("b", { className: "font-mono", children: r.v === null ? "\u2013" : formatUnit(format, r.s.unit, r.v) })
            ] }, r.s.id))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", "aria-live": "polite", children: kbd ? tipText : "" })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs("figcaption", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { role: "group", "aria-label": l.legend, className: "flex flex-wrap gap-x-3 gap-y-1", children: series.map((s, si) => {
        const on = !hidden.includes(s.id);
        return /* @__PURE__ */ jsxRuntime.jsx(React__namespace.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            "aria-pressed": on,
            onClick: () => toggle(s.id),
            className: chunkFTHFEMX6_cjs.cn("inline-flex cursor-pointer items-center gap-1.5 rounded-sm border-0 bg-transparent p-0 text-xs text-muted hover:text-fg", !on && "opacity-50 line-through"),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("svg", { width: "16", height: "4", "aria-hidden": true, className: SERIES_TONES[si % 4], children: /* @__PURE__ */ jsxRuntime.jsx("line", { x1: "0", x2: "16", y1: "2", y2: "2", stroke: "currentColor", strokeWidth: "2", strokeDasharray: SERIES_DASH[si % 4] }) }),
              s.name
            ]
          }
        ) }, s.id);
      }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ms-auto inline-flex items-center gap-3", children: [
        zoomed && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: "cursor-pointer border-0 bg-transparent p-0 text-xs text-primary hover:underline", onClick: resetZoom, children: l.resetZoom }),
        /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-expanded": showTable, "aria-controls": tableId, className: "cursor-pointer border-0 bg-transparent p-0 text-xs text-primary hover:underline", onClick: () => setShowTable((v) => !v), children: showTable ? l.hideData : l.showData })
      ] })
    ] }),
    showTable && /* @__PURE__ */ jsxRuntime.jsx("div", { id: tableId, tabIndex: 0, role: "region", "aria-label": `${label} \u2014 ${l.showData}`, className: "max-h-60 overflow-auto rounded-md border border-line", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "w-full border-collapse text-start font-mono text-xs", children: [
      /* @__PURE__ */ jsxRuntime.jsx("caption", { className: "sr-only", children: label }),
      /* @__PURE__ */ jsxRuntime.jsx("thead", { className: "sticky top-0 bg-surface", children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "px-2 py-1 text-start font-medium", children: l.time }),
        shown.map((s) => /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "px-2 py-1 text-end font-medium", children: s.name }, s.id))
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: tableRows.map((t) => /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "border-t border-line", children: [
        /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "row", className: "px-2 py-1 text-start font-normal text-subtle", children: fullT(t) }),
        shown.map((s, i) => {
          const v = lookups[i].get(t);
          return /* @__PURE__ */ jsxRuntime.jsx("td", { className: "px-2 py-1 text-end", children: v === null || v === void 0 ? "\u2013" : formatUnit(format, s.unit, v) }, s.id);
        })
      ] }, t)) })
    ] }) })
  ] });
}
var TONES = SERIES_TONES;
function StackedBarChart({
  data,
  series,
  label,
  formatValue = (v) => String(v),
  width = 480,
  barHeight = 14,
  className
}) {
  const nameW = 96;
  const gap = 8;
  const rowH = barHeight + gap;
  const totals = data.map((d) => d.values.reduce((a, b) => a + b, 0));
  const max = Math.max(...totals, 1);
  const x = scale.scaleLinear({ domain: [0, max], range: [0, Math.max(width - nameW - 56, 10)], nice: true });
  return /* @__PURE__ */ jsxRuntime.jsxs("figure", { "aria-label": label, className: chunkFTHFEMX6_cjs.cn("m-0 grid gap-2", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("svg", { role: "img", "aria-label": label, width: "100%", viewBox: `0 0 ${width} ${Math.max(data.length * rowH, 1)}`, className: "text-muted", children: data.map((d, ri) => {
      let acc = 0;
      return /* @__PURE__ */ jsxRuntime.jsxs(group.Group, { top: ri * rowH, children: [
        /* @__PURE__ */ jsxRuntime.jsx("text", { x: nameW - 8, y: barHeight / 2, dy: "0.33em", textAnchor: "end", fontSize: 11, fill: "currentColor", children: d.name }),
        /* @__PURE__ */ jsxRuntime.jsx("rect", { x: nameW, y: 0, width: x.range()[1], height: barHeight, rx: 2, className: "text-muted-bg", fill: "currentColor" }),
        d.values.map((v, i) => {
          const x0 = x(acc);
          acc += v;
          return /* @__PURE__ */ jsxRuntime.jsx(shape.Bar, { x: nameW + x0, y: 0, width: Math.max(x(acc) - x0, 0), height: barHeight, fill: "currentColor", className: TONES[i % TONES.length], children: /* @__PURE__ */ jsxRuntime.jsx("title", { children: `${d.name} \xB7 ${series[i]}: ${formatValue(v)}` }) }, i);
        }),
        /* @__PURE__ */ jsxRuntime.jsx("text", { x: nameW + x(totals[ri]) + 6, y: barHeight / 2, dy: "0.33em", fontSize: 11, fill: "currentColor", className: "font-mono", children: formatValue(totals[ri]) })
      ] }, d.name);
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx("figcaption", { className: "flex flex-wrap gap-3 text-xs text-muted", children: series.map((s, i) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: chunkFTHFEMX6_cjs.cn("size-2 rounded-sm bg-current", TONES[i % TONES.length]), "aria-hidden": true }),
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
  max,
  formatValue = (v) => String(v),
  cell = 28,
  className
}) {
  const top = max ?? Math.max(...values.flat(), 1);
  const headW = 96;
  const headH = 20;
  const [active, setActive] = React__namespace.useState([0, 0]);
  const refs = React__namespace.useRef(/* @__PURE__ */ new Map());
  const move = (r, c) => {
    const nr = Math.min(rows.length - 1, Math.max(0, r));
    const nc = Math.min(columns.length - 1, Math.max(0, c));
    setActive([nr, nc]);
    refs.current.get(`${nr}:${nc}`)?.focus();
  };
  const onKey = (e, r, c) => {
    const d = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    const step = d[e.key];
    if (step) {
      e.preventDefault();
      move(r + step[0], c + step[1]);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(r, 0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(r, columns.length - 1);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      role: "grid",
      "aria-label": label,
      "aria-rowcount": rows.length + 1,
      "aria-colcount": columns.length,
      width: headW + columns.length * cell,
      height: headH + rows.length * cell,
      className: chunkFTHFEMX6_cjs.cn("text-muted", className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("g", { role: "row", "aria-rowindex": 1, children: columns.map((c, ci) => /* @__PURE__ */ jsxRuntime.jsx("text", { role: "columnheader", x: headW + ci * cell + cell / 2, y: headH - 6, textAnchor: "middle", fontSize: 10, fill: "currentColor", children: c }, c)) }),
        rows.map((r, ri) => /* @__PURE__ */ jsxRuntime.jsxs("g", { role: "row", "aria-rowindex": ri + 2, transform: `translate(0 ${headH + ri * cell})`, children: [
          /* @__PURE__ */ jsxRuntime.jsx("text", { role: "rowheader", x: headW - 8, y: cell / 2, dy: "0.33em", textAnchor: "end", fontSize: 11, fill: "currentColor", children: r }),
          columns.map((c, ci) => {
            const v = values[ri]?.[ci] ?? 0;
            const text = `${r} ${c}: ${formatValue(v)}`;
            return /* @__PURE__ */ jsxRuntime.jsxs(
              "g",
              {
                ref: (el) => {
                  if (el) refs.current.set(`${ri}:${ci}`, el);
                  else refs.current.delete(`${ri}:${ci}`);
                },
                role: "gridcell",
                "aria-label": text,
                tabIndex: active[0] === ri && active[1] === ci ? 0 : -1,
                onKeyDown: (e) => onKey(e, ri, ci),
                onFocus: () => setActive([ri, ci]),
                className: "text-primary outline-none [&:focus-visible>rect]:stroke-[var(--primary)] [&:focus-visible>rect]:stroke-2",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("title", { children: text }),
                  /* @__PURE__ */ jsxRuntime.jsx("rect", { x: headW + ci * cell + 1, y: 1, width: cell - 2, height: cell - 2, rx: 2, fill: "currentColor", fillOpacity: 0.1 + 0.9 * Math.min(v / top, 1) })
                ]
              },
              c
            );
          })
        ] }, r))
      ]
    }
  );
}
var lafDefaults2 = { charts: chartsEn };
var useLaf2 = () => chunkQ6OCMENQ_cjs.useLafDefaults(lafDefaults2);
var UNIT_MS = { m: 6e4, h: 36e5, d: 864e5 };
function presetToMs(preset) {
  const m = /^(\d+)([mhd])$/.exec(preset);
  return m ? Number(m[1]) * UNIT_MS[m[2]] : void 0;
}
var csvCell = (v) => /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
function seriesToCsv(series, timeLabel = "time") {
  const maps = series.map((s) => new Map(s.points));
  const stamps = [...new Set(series.flatMap((s) => s.points.map((p) => p[0])))].sort((a, b) => a - b);
  const lines = [[timeLabel, ...series.map((s) => s.name)].map(csvCell).join(",")];
  for (const t of stamps) lines.push([new Date(t).toISOString(), ...maps.map((m) => m.get(t) ?? "")].join(","));
  return lines.join("\n");
}
function PerfPanel({
  metrics,
  selected: selectedProp,
  onSelectedChange,
  timeRange: rangeProp,
  onTimeRangeChange,
  presets = ["15m", "1h", "24h", "7d"],
  now: nowProp,
  label,
  height,
  loading,
  type,
  thresholds,
  onExport,
  labels: labelsProp,
  className
}) {
  const { format, t: laf } = useLaf2();
  const l = { ...laf.components.charts.perfPanel, ...labelsProp };
  const [selected, setSelected] = chunk5WBFJQAZ_cjs.useControllableState({
    value: selectedProp,
    defaultValue: metrics.length ? [metrics[0].id] : [],
    onChange: onSelectedChange
  });
  const [preset, setPreset] = chunk5WBFJQAZ_cjs.useControllableState({ value: rangeProp, defaultValue: presets.includes("1h") ? "1h" : presets[0], onChange: onTimeRangeChange });
  const [custom, setCustom] = React__namespace.useState();
  const newest = React__namespace.useMemo(() => nowProp ?? metrics.reduce((m, s) => s.points.reduce((a, p) => Math.max(a, p[0]), m), -Infinity), [metrics, nowProp]);
  const win = React__namespace.useMemo(() => {
    if (preset === "custom" && custom) return custom;
    const ms = presetToMs(preset);
    return ms && Number.isFinite(newest) ? { from: newest - ms, to: newest } : void 0;
  }, [preset, custom, newest]);
  const options = React__namespace.useMemo(() => metrics.map((m) => ({ value: m.id, label: m.name, group: m.group })), [metrics]);
  const chosen = React__namespace.useMemo(() => options.filter((o) => selected.includes(o.value)), [options, selected]);
  const active = React__namespace.useMemo(() => metrics.filter((m) => selected.includes(m.id)), [metrics, selected]);
  const inWin = (t) => !win || t >= win.from && t <= win.to;
  const stats = React__namespace.useMemo(
    () => active.map((m) => {
      const vs = m.points.filter(([t, v]) => v !== null && inWin(t)).map((p) => p[1]);
      if (!vs.length) return { m, empty: true };
      return { m, empty: false, latest: vs[vs.length - 1], min: Math.min(...vs), max: Math.max(...vs), avg: vs.reduce((a, b) => a + b, 0) / vs.length };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active, win]
  );
  const doExport = () => {
    const csv = seriesToCsv(active.map((m) => ({ ...m, points: m.points.filter(([t]) => inWin(t)) })));
    if (onExport) return onExport(csv);
    if (typeof URL === "undefined" || !URL.createObjectURL) return;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "metrics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const zoomTo = (r) => {
    setCustom(r);
    setPreset("custom");
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("section", { "aria-label": label, className: chunkFTHFEMX6_cjs.cn("grid gap-3", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        chunkOKADVGBW_cjs.Combobox,
        {
          multiple: true,
          label: l.metrics,
          placeholder: l.pickMetrics,
          options,
          value: chosen,
          onChange: (v) => setSelected(v.map((o) => o.value)),
          className: "min-w-56"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(chunkOKADVGBW_cjs.TimeRangePicker, { value: preset, onChange: setPreset, presets, range: win, onRangeChange: zoomTo, showTimeZone: true }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", size: "sm", className: "ms-auto", onClick: doExport, disabled: !active.length, children: l.exportCsv })
    ] }),
    active.length || loading ? /* @__PURE__ */ jsxRuntime.jsx(TimeSeriesChart, { label, series: active, type, thresholds, height, loading, range: win, onRangeChange: zoomTo }) : /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-muted", children: l.noMetrics }),
    stats.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("table", { "aria-label": l.summary, className: "w-full border-collapse text-xs", children: [
      /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "text-muted", children: [
        /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "py-1 text-start font-medium", children: l.metric }),
        [l.latest, l.min, l.avg, l.max].map((h) => /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "col", className: "py-1 text-end font-medium", children: h }, h))
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: stats.map((s) => /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "border-t border-line", children: [
        /* @__PURE__ */ jsxRuntime.jsx("th", { scope: "row", className: "py-1 text-start font-normal", children: s.m.name }),
        s.empty ? /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan: 4, className: "py-1 text-end text-muted", children: "\u2013" }) : [s.latest, s.min, s.avg, s.max].map((v, i) => /* @__PURE__ */ jsxRuntime.jsx("td", { className: "py-1 text-end font-mono", children: formatUnit(format, s.m.unit, v) }, i))
      ] }, s.m.id)) })
    ] })
  ] });
}

exports.Heatmap = Heatmap;
exports.PerfPanel = PerfPanel;
exports.StackedBarChart = StackedBarChart;
exports.TimeSeriesChart = TimeSeriesChart;
exports.downsample = downsample;
exports.formatUnit = formatUnit;
exports.lttb = lttb;
exports.presetToMs = presetToMs;
exports.seriesToCsv = seriesToCsv;
//# sourceMappingURL=charts.cjs.map
//# sourceMappingURL=charts.cjs.map