import { useChartMotion, useTooltipDismiss, useTweenProgress, entryAnim, tweenClass, ChartTooltipFor, motionVars, Combobox, TimeRangePicker, useTweenedNumbers, Card, CardHeader, CardTitle, CardDescription, CardActions, SegmentedControl, CardBody, CardFooter, dashboardEn } from './chunk-KVFEYZK4.js';
export { ChartTooltip, ChartTooltipFor, useChartMotion, usePrefersReducedMotion, useTooltipDismiss } from './chunk-KVFEYZK4.js';
import { useControllableState } from './chunk-2AHMKLOE.js';
import { useLafDefaults } from './chunk-3FIUWOWG.js';
import { Button } from './chunk-2O5Y6D5F.js';
import { cn } from './chunk-3TRXGDSZ.js';
import { AxisBottom, AxisLeft, AxisRight } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleLinear, scaleBand } from '@visx/scale';
import { Area, LinePath, Bar, Pie } from '@visx/shape';
import * as React from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { Eye, EyeOff, RefreshCw, Download, AlertCircle, BarChart3, TableProperties } from 'lucide-react';

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
var useLaf = () => useLafDefaults(lafDefaults);
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
  const ref = React.useRef(null);
  const [w, setW] = React.useState(640);
  React.useEffect(() => {
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
  legend = true,
  label,
  height = 240,
  width: widthProp,
  maxTableRows = 200,
  animate,
  tooltip = true,
  labels: labelsProp,
  className
}) {
  const { format, locale, timeZone, t: laf } = useLaf();
  const l = { ...laf.components.charts.timeSeries, ...labelsProp };
  const uid = React.useId();
  const [wrap, width] = useWidth(widthProp);
  const [hidden, setHidden] = useControllableState({ value: hiddenProp, defaultValue: [], onChange: onHiddenSeriesChange });
  const [zoom, setZoom] = useControllableState({ value: rangeProp, defaultValue: null, onChange: (r) => r && onRangeChange?.(r) });
  const [cursor, setCursor] = React.useState(null);
  const [sel, setSel] = React.useState(null);
  const [kbd, setKbd] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false);
  const drag = React.useRef(null);
  const anchor = React.useRef(null);
  const svgRef = React.useRef(null);
  const motion = useChartMotion(animate);
  const [legendEmph, setLegendEmph] = React.useState(null);
  const [ptrY, setPtrY] = React.useState(null);
  const tipId = `${uid}-tip`;
  useTooltipDismiss(cursor !== null, wrap, () => (setCursor(null), setPtrY(null)));
  const sig = React.useMemo(
    () => `${type}|${hidden.join()}|${zoom?.from}-${zoom?.to}|${series.map((s) => `${s.id}:${s.points.length}:${s.points.reduce((a, p) => a + (p[1] ?? 0) * (p[0] % 97 + 1), 0)}`).join()}`,
    [series, hidden, zoom, type]
  );
  const progress = useTweenProgress(sig, motion);
  const settled = React.useRef(/* @__PURE__ */ new Map());
  const fromPx = React.useRef(/* @__PURE__ */ new Map());
  const lastSig = React.useRef(sig);
  if (lastSig.current !== sig) {
    fromPx.current = settled.current;
    lastSig.current = sig;
  }
  const rendered = /* @__PURE__ */ new Map();
  const lerp = (id, to) => {
    const f = fromPx.current.get(id);
    const out = progress < 1 && f && f.length === to.length ? to.map((v, i) => f[i] + (v - f[i]) * progress) : to;
    rendered.set(id, out);
    return out;
  };
  React.useLayoutEffect(() => {
    settled.current = rendered;
  });
  const full = React.useMemo(() => {
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
  const shown = React.useMemo(() => series.filter((s) => !hidden.includes(s.id)), [series, hidden]);
  const stacked = type === "stacked-area";
  const units = React.useMemo(() => {
    const u = [];
    for (const s of shown) if (!u.includes(s.unit)) u.push(s.unit);
    return stacked ? u.slice(0, 1) : u;
  }, [shown, stacked]);
  const axisOf = (u) => stacked ? 0 : Math.min(Math.max(units.indexOf(u), 0), 1);
  const dual = !stacked && units.length > 1;
  const innerW = Math.max(width - MARGIN.left - (dual ? MARGIN.right2 : MARGIN.right), 10);
  const innerH = Math.max(height - MARGIN.top - MARGIN.bottom, 10);
  const visible = React.useMemo(
    () => shown.map((s) => domain ? s.points.filter(([t]) => t >= domain.from && t <= domain.to) : s.points),
    [shown, domain]
  );
  const stamps = React.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    for (const pts of visible) for (const [t] of pts) set.add(t);
    return [...set].sort((a, b) => a - b);
  }, [visible]);
  const lookups = React.useMemo(() => visible.map((pts) => new Map(pts)), [visible]);
  const stackedRows = React.useMemo(() => {
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
  const lines = React.useMemo(() => stacked ? [] : visible.map((pts) => downsample(pts, Math.max(Math.floor(innerW), 3))), [stacked, visible, innerW]);
  const x = React.useMemo(() => scaleLinear({ domain: [domain?.from ?? 0, domain?.to ?? 1], range: [0, innerW] }), [domain, innerW]);
  const ys = React.useMemo(() => {
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
      return scaleLinear({ domain: [lo, hi], range: [innerH, 0], nice: true });
    });
  }, [shown, visible, stackedRows, thresholds, innerH, type, stacked, units]);
  const tickT = React.useMemo(() => {
    const span = domain ? domain.to - domain.from : 0;
    const dtf = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      ...span > 2 * 864e5 ? { month: "short", day: "numeric" } : span < 12e4 ? { second: "2-digit" } : {}
    });
    return (v) => dtf.format(v);
  }, [domain, locale, timeZone]);
  const fullT = React.useMemo(() => {
    const dtf = new Intl.DateTimeFormat(locale, { timeZone, dateStyle: "medium", timeStyle: "medium" });
    return (v) => dtf.format(v);
  }, [locale, timeZone]);
  const clampT = (px) => domain ? Math.min(domain.to, Math.max(domain.from, x.invert(px))) : 0;
  const localX = (e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    return e.clientX - (rect?.left ?? 0) - MARGIN.left;
  };
  const localY = (e) => e.clientY - (svgRef.current?.getBoundingClientRect().top ?? 0) - MARGIN.top;
  const applySel = (r) => {
    if (r && r.to > r.from) setZoom({ from: r.from, to: r.to });
    setSel(null);
    anchor.current = null;
  };
  const onPointerDown = (e) => {
    if (!domain || e.button > 0) return;
    const px = localX(e);
    drag.current = { anchor: clampT(px), moved: false };
    setCursor(clampT(px));
    setPtrY(localY(e));
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
    setPtrY(localY(e));
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
      setPtrY(null);
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
      setPtrY(null);
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
  const tip = React.useMemo(() => {
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
  const nearestId = tip && ptrY !== null && !stacked ? tip.rows.reduce((best, r) => {
    if (r.v === null) return best;
    const d = Math.abs(ys[axisOf(r.s.unit)](r.v) - ptrY);
    return !best || d < best.d ? { id: r.s.id, d } : best;
  }, null)?.id : void 0;
  const emph = legendEmph ?? nearestId ?? null;
  const tipCtx = tip ? {
    point: { label: fullT(tip.t), x: tip.t },
    index: stamps.indexOf(tip.t),
    series: tip.rows.map((r) => ({ id: r.s.id, name: r.s.name, value: r.v, formatted: r.v === null ? "\u2013" : formatUnit(format, r.s.unit, r.v), tone: SERIES_TONES[series.indexOf(r.s) % 4] }))
  } : null;
  const tipOn = !!tipCtx && tooltip !== false;
  const tipText = tip ? `${fullT(tip.t)}: ${tip.rows.map((r) => `${r.s.name} ${r.v === null ? "\u2013" : formatUnit(format, r.s.unit, r.v)}`).join(", ")}` : "";
  const tableRows = stamps.length > maxTableRows ? stamps.filter((_, i) => i % Math.ceil(stamps.length / maxTableRows) === 0) : stamps;
  const tableId = `${uid}-table`;
  const hintId = `${uid}-hint`;
  const empty = !loading && (!domain || series.every((s) => s.points.length === 0));
  const tipLeft = tip ? MARGIN.left + x(tip.t) : 0;
  return /* @__PURE__ */ jsxs("figure", { "aria-label": label, "aria-busy": loading || void 0, "data-animate": motion.enabled ? "on" : "off", className: cn("m-0 grid grid-cols-1 gap-2", className), children: [
    /* @__PURE__ */ jsx("div", { ref: wrap, className: "relative min-w-0", style: { height, ...motionVars(motion) }, children: loading ? /* @__PURE__ */ jsx("div", { role: "status", "aria-label": l.loading, className: "size-full animate-pulse rounded-sm bg-muted-bg" }) : empty ? /* @__PURE__ */ jsx("div", { className: "grid size-full place-items-center text-sm text-muted", children: l.noData }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          ref: svgRef,
          width,
          height,
          role: "img",
          "aria-label": label,
          "aria-describedby": tipOn ? `${hintId} ${tipId}` : hintId,
          tabIndex: 0,
          className: "touch-none text-muted select-none focus-visible:outline-2 focus-visible:outline-primary",
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onPointerLeave: (e) => {
            if (!drag.current && e.pointerType !== "touch") setCursor(null), setPtrY(null);
          },
          onKeyDown,
          onKeyUp,
          onBlur: () => {
            setKbd(false);
            anchor.current = null;
          },
          children: /* @__PURE__ */ jsxs(Group, { left: MARGIN.left, top: MARGIN.top, children: [
            ys[0].ticks(4).map((tv) => /* @__PURE__ */ jsx("line", { x1: 0, x2: innerW, y1: ys[0](tv), y2: ys[0](tv), stroke: "var(--border)" }, tv)),
            thresholds.map((th) => /* @__PURE__ */ jsx(
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
            stacked ? shown.map((s, i) => {
              const rows = stackedRows ?? [];
              const lo = lerp(`${s.id}:lo`, rows.map((d) => ys[0](d.layers[i][0])));
              const hi = lerp(`${s.id}:hi`, rows.map((d) => ys[0](d.layers[i][1])));
              const enter = entryAnim(motion, "reveal", i);
              return /* @__PURE__ */ jsx(
                Area,
                {
                  data: rows,
                  x: (d) => x(d.t),
                  y0: (_, k) => lo[k],
                  y1: (_, k) => hi[k],
                  fill: "currentColor",
                  fillOpacity: 0.45,
                  stroke: "currentColor",
                  className: cn(SERIES_TONES[series.indexOf(s) % 4], tweenClass(motion), enter.className, emph !== null && emph !== s.id && "opacity-40"),
                  style: enter.style
                },
                s.id
              );
            }) : shown.map((s, i) => {
              const si = series.indexOf(s);
              const ys_ = ys[axisOf(s.unit)];
              const tone = SERIES_TONES[si % 4];
              const py = lerp(s.id, lines[i].map((d) => d[1] === null ? 0 : ys_(d[1])));
              const enter = entryAnim(motion, "reveal", i);
              const fade = entryAnim(motion, "fade", i);
              return /* @__PURE__ */ jsxs("g", { className: cn(tone, tweenClass(motion), enter.className, emph !== null && emph !== s.id && "opacity-30"), style: enter.style, "data-series": s.id, children: [
                type === "area" && /* @__PURE__ */ jsx(
                  Area,
                  {
                    data: lines[i],
                    defined: (d) => d[1] !== null,
                    x: (d) => x(d[0]),
                    y0: ys_(Math.max(ys_.domain()[0], 0)),
                    y1: (_, k) => py[k],
                    fill: "currentColor",
                    fillOpacity: 0.15,
                    className: fade.className,
                    style: fade.style
                  }
                ),
                /* @__PURE__ */ jsx(
                  LinePath,
                  {
                    data: lines[i],
                    defined: (d) => d[1] !== null,
                    x: (d) => x(d[0]),
                    y: (_, k) => py[k],
                    stroke: "currentColor",
                    strokeWidth: emph === s.id ? 2.5 : 1.5,
                    strokeDasharray: SERIES_DASH[si % 4]
                  }
                )
              ] }, s.id);
            }),
            /* @__PURE__ */ jsx(AxisBottom, { top: innerH, scale: x, numTicks: Math.max(2, Math.floor(innerW / 90)), tickFormat: (v) => tickT(v), stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { fill: "currentColor", fontSize: 10, textAnchor: "middle" } }),
            /* @__PURE__ */ jsx(AxisLeft, { scale: ys[0], numTicks: 4, tickFormat: (v) => unitFor(axisUnit(0))(v), stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { fill: "currentColor", fontSize: 10, textAnchor: "end", dy: "0.33em" } }),
            dual && /* @__PURE__ */ jsx(AxisRight, { left: innerW, scale: ys[1], numTicks: 4, tickFormat: (v) => unitFor(axisUnit(1))(v), stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { fill: "currentColor", fontSize: 10, textAnchor: "start", dy: "0.33em" } }),
            sel && /* @__PURE__ */ jsx("rect", { "data-brush": true, x: x(sel.from), y: 0, width: Math.max(x(sel.to) - x(sel.from), 1), height: innerH, fill: "currentColor", fillOpacity: 0.15, className: "text-primary" }),
            tip && /* @__PURE__ */ jsxs("g", { pointerEvents: "none", children: [
              /* @__PURE__ */ jsx("line", { x1: x(tip.t), x2: x(tip.t), y1: 0, y2: innerH, stroke: "var(--border-strong)" }),
              tip.rows.map(
                (r) => r.v !== null && /* @__PURE__ */ jsx("circle", { cx: x(tip.t), cy: stacked ? ys[0](stackedRows?.find((row) => row.t === tip.t)?.layers[r.i]?.[1] ?? r.v) : ys[axisOf(r.s.unit)](r.v), r: 3, fill: "currentColor", className: SERIES_TONES[series.indexOf(r.s) % 4] }, r.s.id)
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("span", { id: hintId, className: "sr-only", children: l.keyboardHint }),
      tipOn && /* @__PURE__ */ jsx(ChartTooltipFor, { option: tooltip, ctx: tipCtx, x: tipLeft, y: MARGIN.top + 4, id: tipId, container: wrap, placement: "side" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", "aria-live": "polite", children: kbd ? tipText : "" })
    ] }) }),
    /* @__PURE__ */ jsxs("figcaption", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted", children: [
      legend && /* @__PURE__ */ jsx("div", { role: "group", "aria-label": l.legend, className: "flex flex-wrap gap-x-3 gap-y-1", children: series.map((s, si) => {
        const on = !hidden.includes(s.id);
        return /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-pressed": on,
            onPointerEnter: () => setLegendEmph(s.id),
            onPointerLeave: () => setLegendEmph(null),
            onFocus: () => setLegendEmph(s.id),
            onBlur: () => setLegendEmph(null),
            onClick: () => toggle(s.id),
            className: cn("inline-flex cursor-pointer items-center gap-1.5 rounded-sm border-0 bg-transparent p-0 text-xs text-muted hover:text-fg", !on && "opacity-50 line-through"),
            children: [
              /* @__PURE__ */ jsx("svg", { width: "16", height: "4", "aria-hidden": true, className: SERIES_TONES[si % 4], children: /* @__PURE__ */ jsx("line", { x1: "0", x2: "16", y1: "2", y2: "2", stroke: "currentColor", strokeWidth: "2", strokeDasharray: SERIES_DASH[si % 4] }) }),
              s.name
            ]
          }
        ) }, s.id);
      }) }),
      /* @__PURE__ */ jsxs("span", { className: "ms-auto inline-flex items-center gap-3", children: [
        zoomed && /* @__PURE__ */ jsx("button", { type: "button", className: "cursor-pointer border-0 bg-transparent p-0 text-xs text-primary hover:underline", onClick: resetZoom, children: l.resetZoom }),
        /* @__PURE__ */ jsx("button", { type: "button", "aria-expanded": showTable, "aria-controls": tableId, className: "cursor-pointer border-0 bg-transparent p-0 text-xs text-primary hover:underline", onClick: () => setShowTable((v) => !v), children: showTable ? l.hideData : l.showData })
      ] })
    ] }),
    showTable && /* @__PURE__ */ jsx("div", { id: tableId, tabIndex: 0, role: "region", "aria-label": `${label} \u2014 ${l.showData}`, className: "max-h-60 overflow-auto rounded-md border border-line", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-start font-mono text-xs", children: [
      /* @__PURE__ */ jsx("caption", { className: "sr-only", children: label }),
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-surface", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { scope: "col", className: "px-2 py-1 text-start font-medium", children: l.time }),
        shown.map((s) => /* @__PURE__ */ jsx("th", { scope: "col", className: "px-2 py-1 text-end font-medium", children: s.name }, s.id))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: tableRows.map((t) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-line", children: [
        /* @__PURE__ */ jsx("th", { scope: "row", className: "px-2 py-1 text-start font-normal text-subtle", children: fullT(t) }),
        shown.map((s, i) => {
          const v = lookups[i].get(t);
          return /* @__PURE__ */ jsx("td", { className: "px-2 py-1 text-end", children: v === null || v === void 0 ? "\u2013" : formatUnit(format, s.unit, v) }, s.id);
        })
      ] }, t)) })
    ] }) })
  ] });
}
var lafDefaults2 = { dashboard: dashboardEn };
var useChartLaf = () => useLafDefaults(lafDefaults2);
var CHART_TONES = ["text-label-9", "text-label-5", "text-label-3", "text-label-1", "text-label-7", "text-label-11", "text-label-2", "text-label-6"];
var chartTone = (i) => CHART_TONES[i % CHART_TONES.length];
function useChartWidth(fixed, initial = 480) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(initial);
  React.useEffect(() => {
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
  const [active, setActive] = React.useState(null);
  const [keyboard, setKeyboard] = React.useState(false);
  const fallback = React.useRef(null);
  useTooltipDismiss(active !== null, containerRef ?? fallback, () => (setActive(null), setKeyboard(false)));
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
  return /* @__PURE__ */ jsx("ul", { "aria-label": label ?? c.legend, className: cn("m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-1 p-0 text-xs text-muted", className), children: items.map((it) => {
    const off = hidden.includes(it.id);
    const swatch = /* @__PURE__ */ jsx("svg", { width: "14", height: "8", "aria-hidden": true, className: cn(it.tone, off && "opacity-40"), children: it.dash ? /* @__PURE__ */ jsx("line", { x1: "0", x2: "14", y1: "4", y2: "4", stroke: "currentColor", strokeWidth: "2.5", strokeDasharray: it.dash }) : /* @__PURE__ */ jsx("rect", { width: "14", height: "8", rx: "2", fill: "currentColor" }) });
    return /* @__PURE__ */ jsx("li", { children: onToggle ? /* @__PURE__ */ jsxs("button", { type: "button", onPointerEnter: () => onHover?.(it.id), onPointerLeave: () => onHover?.(null), onFocus: () => onHover?.(it.id), onBlur: () => onHover?.(null), "aria-pressed": !off, "aria-label": c.toggleSeries(it.name), onClick: () => onToggle(it.id), className: cn("inline-flex items-center gap-1.5 rounded-sm border-0 bg-transparent p-0.5 text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50", off && "line-through opacity-70"), children: [
      swatch,
      /* @__PURE__ */ jsx("span", { children: it.name }),
      it.value !== void 0 && /* @__PURE__ */ jsx("b", { className: "font-mono text-fg", children: it.value })
    ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
      swatch,
      /* @__PURE__ */ jsx("span", { children: it.name }),
      it.value !== void 0 && /* @__PURE__ */ jsx("b", { className: "font-mono text-fg", children: it.value })
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
  const [showTable, setShowTable] = React.useState(false);
  const id = React.useId();
  const status = loading ? /* @__PURE__ */ jsx("div", { role: "status", "aria-label": c.loading, className: "size-full animate-pulse rounded-sm bg-muted-bg motion-reduce:animate-none" }) : error ? /* @__PURE__ */ jsxs("div", { role: "alert", className: "grid size-full place-content-center justify-items-center gap-2 text-sm text-danger", children: [
    /* @__PURE__ */ jsx("span", { children: typeof error === "string" ? error : c.error }),
    onRetry && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", onClick: onRetry, children: c.retry })
  ] }) : empty ? /* @__PURE__ */ jsx("div", { className: "grid size-full place-items-center text-sm text-muted", children: c.empty }) : null;
  return /* @__PURE__ */ jsxs("figure", { "aria-label": label, "aria-busy": loading || void 0, "data-animate": animate === void 0 ? void 0 : animate ? "on" : "off", className: cn("m-0 grid min-w-0 grid-cols-1 gap-2", className), children: [
    /* @__PURE__ */ jsx("div", { ref: plotRef, dir: "ltr", className: "relative min-w-0", style: { height }, children: status ?? plot }),
    !status && legend,
    !status && table && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("button", { type: "button", "aria-expanded": showTable, "aria-controls": `${id}-table`, onClick: () => setShowTable((v) => !v), className: "inline-flex items-center gap-1.5 justify-self-start border-0 bg-transparent p-0.5 text-xs text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50", children: [
        showTable ? /* @__PURE__ */ jsx(BarChart3, { "aria-hidden": true, className: "size-3.5" }) : /* @__PURE__ */ jsx(TableProperties, { "aria-hidden": true, className: "size-3.5" }),
        showTable ? c.hideData : c.showData
      ] }),
      /* @__PURE__ */ jsx("div", { id: `${id}-table`, hidden: !showTable, className: "max-h-60 overflow-auto", children: showTable && /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse text-xs tabular-nums", children: [
        /* @__PURE__ */ jsx("caption", { className: "sr-only", children: label }),
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: table.head.map((h) => /* @__PURE__ */ jsx("th", { scope: "col", className: "border-b border-line px-2 py-1 text-start font-medium text-muted", children: h }, h)) }) }),
        /* @__PURE__ */ jsx("tbody", { children: table.rows.map((r, i) => /* @__PURE__ */ jsx("tr", { children: r.map(
          (cell, j) => j === 0 ? /* @__PURE__ */ jsx("th", { scope: "row", className: "border-b border-line px-2 py-1 text-start font-normal", children: cell }, j) : /* @__PURE__ */ jsx("td", { className: "border-b border-line px-2 py-1 text-start", children: cell }, j)
        ) }, i)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "sr-only", role: "status", "aria-live": "polite", children: announce })
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
  animate,
  tooltip = true,
  className
}) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  const motion = useChartMotion(animate);
  const box = React.useRef(null);
  const hintId = React.useId();
  const tipId = React.useId();
  const cells = data.flatMap((d, ri) => d.values.map((v, si) => ({ ri, si, v })));
  const nav = useActiveIndex(cells.length, box);
  const nameW = 96;
  const gap = 8;
  const rowH = barHeight + gap;
  const totals = data.map((d) => d.values.reduce((a, b) => a + b, 0));
  const max = Math.max(...totals, 1);
  const x = scaleLinear({ domain: [0, max], range: [0, Math.max(width - nameW - 56, 10)], nice: true });
  const cur = nav.active === null ? null : cells[nav.active];
  let tipX = 0;
  if (cur) {
    let acc = 0;
    for (let k = 0; k < cur.si; k++) acc += data[cur.ri].values[k];
    tipX = (nameW + (x(acc) + x(acc + cur.v)) / 2) * ((box.current?.clientWidth || width) / width);
  }
  const segName = cur ? `${data[cur.ri].name} \xB7 ${series[cur.si]}` : "";
  const ctx = cur ? { point: { label: segName, x: data[cur.ri].name, value: cur.v, formatted: formatValue(cur.v) }, index: nav.active, series: [{ id: String(cur.si), name: String(series[cur.si]), value: cur.v, formatted: formatValue(cur.v), tone: TONES[cur.si % TONES.length] }] } : null;
  const tipOn = !!ctx && tooltip !== false;
  return /* @__PURE__ */ jsxs("figure", { "aria-label": label, "data-animate": motion.enabled ? "on" : "off", className: cn("m-0 grid gap-2", className), children: [
    /* @__PURE__ */ jsxs("div", { ref: box, className: "relative", style: motionVars(motion), children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          role: "img",
          "aria-label": label,
          "aria-describedby": tipOn ? `${hintId} ${tipId}` : hintId,
          tabIndex: 0,
          width: "100%",
          viewBox: `0 0 ${width} ${Math.max(data.length * rowH, 1)}`,
          className: "block text-muted outline-none focus-visible:outline-2 focus-visible:outline-primary",
          onKeyDown: nav.onKeyDown,
          onBlur: nav.onBlur,
          onPointerLeave: (e) => e.pointerType !== "touch" && !nav.keyboard && nav.setActive(null),
          children: data.map((d, ri) => {
            let acc = 0;
            return /* @__PURE__ */ jsxs(Group, { top: ri * rowH, children: [
              /* @__PURE__ */ jsx("text", { x: nameW - 8, y: barHeight / 2, dy: "0.33em", textAnchor: "end", fontSize: 11, fill: "currentColor", children: d.name }),
              /* @__PURE__ */ jsx("rect", { x: nameW, y: 0, width: x.range()[1], height: barHeight, rx: 2, className: "text-muted-bg", fill: "currentColor" }),
              d.values.map((v, i) => {
                const x0 = x(acc);
                acc += v;
                const flat = cells.findIndex((cc) => cc.ri === ri && cc.si === i);
                const enter = entryAnim(motion, "grow-x", ri);
                return /* @__PURE__ */ jsx(
                  Bar,
                  {
                    x: nameW + x0,
                    y: 0,
                    width: Math.max(x(acc) - x0, 0),
                    height: barHeight,
                    fill: "currentColor",
                    className: cn(TONES[i % TONES.length], tweenClass(motion), enter.className, nav.active !== null && nav.active !== flat && "opacity-40"),
                    style: enter.style,
                    onPointerEnter: () => (nav.setKeyboard(false), nav.setActive(flat)),
                    onPointerDown: () => (nav.setKeyboard(false), nav.setActive(flat)),
                    children: tooltip === false && /* @__PURE__ */ jsx("title", { children: `${d.name} \xB7 ${series[i]}: ${formatValue(v)}` })
                  },
                  i
                );
              }),
              /* @__PURE__ */ jsx("text", { x: nameW + x(totals[ri]) + 6, y: barHeight / 2, dy: "0.33em", fontSize: 11, fill: "currentColor", className: "font-mono", children: formatValue(totals[ri]) })
            ] }, d.name);
          })
        }
      ),
      tipOn && /* @__PURE__ */ jsx(ChartTooltipFor, { option: tooltip, ctx, x: tipX, y: (cur.ri + 0.5) * rowH, id: tipId, container: box }),
      /* @__PURE__ */ jsx("span", { id: hintId, className: "sr-only", children: c.keyboardHint })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "sr-only", role: "status", "aria-live": "polite", children: nav.keyboard && cur ? `${segName}: ${formatValue(cur.v)}` : "" }),
    /* @__PURE__ */ jsx("figcaption", { className: "flex flex-wrap gap-3 text-xs text-muted", children: series.map((s, i) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("span", { className: cn("size-2 rounded-sm bg-current", TONES[i % TONES.length]), "aria-hidden": true }),
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
  animate,
  tooltip = true,
  className
}) {
  const motion = useChartMotion(animate);
  const box = React.useRef(null);
  const tipId = React.useId();
  const [tip, setTip] = React.useState(null);
  useTooltipDismiss(tip !== null, box, () => setTip(null));
  const top = max ?? Math.max(...values.flat(), 1);
  const headW = 96;
  const headH = 20;
  const [active, setActive] = React.useState([0, 0]);
  const refs = React.useRef(/* @__PURE__ */ new Map());
  const move = (r, c) => {
    const nr = Math.min(rows.length - 1, Math.max(0, r));
    const nc = Math.min(columns.length - 1, Math.max(0, c));
    setActive([nr, nc]);
    refs.current.get(`${nr}:${nc}`)?.focus();
  };
  const onKey = (e, r, c) => {
    const d = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    const step = d[e.key];
    if (e.key === "Escape") setTip(null);
    else if (step) {
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
  const tipValue = tip ? values[tip[0]]?.[tip[1]] ?? 0 : 0;
  const ctx = tip ? { point: { label: `${rows[tip[0]]} \xB7 ${columns[tip[1]]}`, x: columns[tip[1]], value: tipValue, formatted: formatValue(tipValue) }, index: tip[0] * columns.length + tip[1], series: [{ id: `${tip[0]}:${tip[1]}`, name: String(rows[tip[0]]), value: tipValue, formatted: formatValue(tipValue), tone: "text-primary" }] } : null;
  const tipOn = !!ctx && tooltip !== false;
  return /* @__PURE__ */ jsxs("div", { ref: box, className: "relative inline-block max-w-full align-top", style: motionVars(motion), "data-animate": motion.enabled ? "on" : "off", children: [
    /* @__PURE__ */ jsxs(
      "svg",
      {
        role: "grid",
        "aria-label": label,
        "aria-rowcount": rows.length + 1,
        "aria-colcount": columns.length,
        width: headW + columns.length * cell,
        height: headH + rows.length * cell,
        className: cn("block text-muted", className),
        children: [
          /* @__PURE__ */ jsx("g", { role: "row", "aria-rowindex": 1, children: columns.map((c, ci) => /* @__PURE__ */ jsx("text", { role: "columnheader", x: headW + ci * cell + cell / 2, y: headH - 6, textAnchor: "middle", fontSize: 10, fill: "currentColor", children: c }, c)) }),
          rows.map((r, ri) => /* @__PURE__ */ jsxs("g", { role: "row", "aria-rowindex": ri + 2, transform: `translate(0 ${headH + ri * cell})`, children: [
            /* @__PURE__ */ jsx("text", { role: "rowheader", x: headW - 8, y: cell / 2, dy: "0.33em", textAnchor: "end", fontSize: 11, fill: "currentColor", children: r }),
            columns.map((c, ci) => {
              const v = values[ri]?.[ci] ?? 0;
              const text = `${r} ${c}: ${formatValue(v)}`;
              return /* @__PURE__ */ jsxs(
                "g",
                {
                  ref: (el) => {
                    if (el) refs.current.set(`${ri}:${ci}`, el);
                    else refs.current.delete(`${ri}:${ci}`);
                  },
                  role: "gridcell",
                  "aria-label": text,
                  "aria-describedby": tipOn && tip[0] === ri && tip[1] === ci ? tipId : void 0,
                  tabIndex: active[0] === ri && active[1] === ci ? 0 : -1,
                  onKeyDown: (e) => onKey(e, ri, ci),
                  onFocus: () => (setActive([ri, ci]), setTip([ri, ci])),
                  onBlur: () => setTip(null),
                  onPointerEnter: () => setTip([ri, ci]),
                  onPointerDown: () => setTip([ri, ci]),
                  onPointerLeave: (e) => e.pointerType !== "touch" && setTip(null),
                  className: "text-primary outline-none [&:focus-visible>rect]:stroke-[var(--primary)] [&:focus-visible>rect]:stroke-2",
                  children: [
                    tooltip === false && /* @__PURE__ */ jsx("title", { children: text }),
                    /* @__PURE__ */ jsx(
                      "rect",
                      {
                        x: headW + ci * cell + 1,
                        y: 1,
                        width: cell - 2,
                        height: cell - 2,
                        rx: 2,
                        fill: "currentColor",
                        fillOpacity: 0.1 + 0.9 * Math.min(v / top, 1),
                        className: cn(tweenClass(motion), entryAnim(motion, "fade", ri + ci).className, tip && !(tip[0] === ri && tip[1] === ci) && "opacity-60"),
                        style: entryAnim(motion, "fade", ri + ci).style
                      }
                    )
                  ]
                },
                c
              );
            })
          ] }, r))
        ]
      }
    ),
    tipOn && /* @__PURE__ */ jsx(ChartTooltipFor, { option: tooltip, ctx, x: headW + tip[1] * cell + cell / 2, y: headH + tip[0] * cell, id: tipId, container: box })
  ] });
}
var lafDefaults3 = { charts: chartsEn };
var useLaf2 = () => useLafDefaults(lafDefaults3);
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
  const [selected, setSelected] = useControllableState({
    value: selectedProp,
    defaultValue: metrics.length ? [metrics[0].id] : [],
    onChange: onSelectedChange
  });
  const [preset, setPreset] = useControllableState({ value: rangeProp, defaultValue: presets.includes("1h") ? "1h" : presets[0], onChange: onTimeRangeChange });
  const [custom, setCustom] = React.useState();
  const newest = React.useMemo(() => nowProp ?? metrics.reduce((m, s) => s.points.reduce((a, p) => Math.max(a, p[0]), m), -Infinity), [metrics, nowProp]);
  const win = React.useMemo(() => {
    if (preset === "custom" && custom) return custom;
    const ms = presetToMs(preset);
    return ms && Number.isFinite(newest) ? { from: newest - ms, to: newest } : void 0;
  }, [preset, custom, newest]);
  const options = React.useMemo(() => metrics.map((m) => ({ value: m.id, label: m.name, group: m.group })), [metrics]);
  const chosen = React.useMemo(() => options.filter((o) => selected.includes(o.value)), [options, selected]);
  const active = React.useMemo(() => metrics.filter((m) => selected.includes(m.id)), [metrics, selected]);
  const inWin = (t) => !win || t >= win.from && t <= win.to;
  const stats = React.useMemo(
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
  return /* @__PURE__ */ jsxs("section", { "aria-label": label, className: cn("grid gap-3", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        Combobox,
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
      /* @__PURE__ */ jsx(TimeRangePicker, { value: preset, onChange: setPreset, presets, range: win, onRangeChange: zoomTo, showTimeZone: true }),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "ms-auto", onClick: doExport, disabled: !active.length, children: l.exportCsv })
    ] }),
    active.length || loading ? /* @__PURE__ */ jsx(TimeSeriesChart, { label, series: active, type, thresholds, height, loading, range: win, onRangeChange: zoomTo }) : /* @__PURE__ */ jsx("p", { className: "m-0 text-sm text-muted", children: l.noMetrics }),
    stats.length > 0 && /* @__PURE__ */ jsxs("table", { "aria-label": l.summary, className: "w-full border-collapse text-xs", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-muted", children: [
        /* @__PURE__ */ jsx("th", { scope: "col", className: "py-1 text-start font-medium", children: l.metric }),
        [l.latest, l.min, l.avg, l.max].map((h) => /* @__PURE__ */ jsx("th", { scope: "col", className: "py-1 text-end font-medium", children: h }, h))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: stats.map((s) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-line", children: [
        /* @__PURE__ */ jsx("th", { scope: "row", className: "py-1 text-start font-normal", children: s.m.name }),
        s.empty ? /* @__PURE__ */ jsx("td", { colSpan: 4, className: "py-1 text-end text-muted", children: "\u2013" }) : [s.latest, s.min, s.avg, s.max].map((v, i) => /* @__PURE__ */ jsx("td", { className: "py-1 text-end font-mono", children: formatUnit(format, s.m.unit, v) }, i))
      ] }, s.m.id)) })
    ] })
  ] });
}
function AreaChart({ stacked, ...props }) {
  return /* @__PURE__ */ jsx(TimeSeriesChart, { ...props, type: stacked ? "stacked-area" : "area" });
}
function LineChart(props) {
  return /* @__PURE__ */ jsx(TimeSeriesChart, { ...props, type: "line" });
}
var M = { top: 8, right: 12, bottom: 24, left: 44 };
var tick = { fill: "currentColor", fontSize: 10 };
function BarChart({ categories, series, stacked, orientation = "vertical", formatValue = (v) => String(Math.round(v * 10) / 10), label, height = 240, width: widthProp, legend = true, animate, tooltip = true, loading, error, onRetry, className }) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  const [wrap, width] = useChartWidth(widthProp);
  const [hidden, setHidden] = React.useState([]);
  const svgRef = React.useRef(null);
  const hintId = React.useId();
  const nav = useActiveIndex(categories.length, wrap);
  const motion = useChartMotion(animate);
  const [emph, setEmph] = React.useState(null);
  const tipId = React.useId();
  const horizontal = orientation === "horizontal";
  const margin = { ...M, left: horizontal ? 72 : M.left };
  const shown = series.filter((s) => !hidden.includes(s.id));
  const innerW = Math.max(width - margin.left - margin.right, 10);
  const innerH = Math.max(height - margin.top - margin.bottom, 10);
  const along = horizontal ? innerH : innerW;
  const across = horizontal ? innerW : innerH;
  const totals = categories.map((_, i) => shown.reduce((a, s) => a + (s.data[i] ?? 0), 0));
  const maxV = Math.max(1, ...stacked ? totals : shown.flatMap((s) => s.data));
  const band = scaleBand({ domain: categories, range: [0, along], padding: 0.25 });
  const inner = scaleBand({ domain: shown.map((s) => s.id), range: [0, band.bandwidth()], padding: 0.1 });
  const val = scaleLinear({ domain: [0, maxV], range: horizontal ? [0, across] : [across, 0], nice: true });
  const tones = (s) => chartTone(series.indexOf(s));
  const rects = categories.flatMap((cat2, ci) => {
    let acc = 0;
    return shown.map((s, si) => {
      const v = s.data[ci] ?? 0;
      const lo = stacked ? acc : 0;
      if (stacked) acc += v;
      const hi = lo + v;
      const pos = band(cat2) + (stacked ? 0 : inner(s.id) ?? 0);
      const thick = stacked ? band.bandwidth() : inner.bandwidth();
      const a = val(lo);
      const b = val(hi);
      return {
        key: `${cat2}-${s.id}`,
        s,
        si,
        ci,
        v,
        x: horizontal ? Math.min(a, b) : pos,
        y: horizontal ? pos : Math.min(a, b),
        w: horizontal ? Math.abs(b - a) : thick,
        h: horizontal ? thick : Math.abs(b - a)
      };
    });
  });
  const rows = (i) => shown.map((s) => ({ name: s.name, value: formatValue(s.data[i] ?? 0), tone: tones(s) }));
  const cat = nav.active === null ? null : categories[nav.active];
  const announce = cat === null || cat === void 0 ? "" : `${cat}: ${rows(nav.active).map((r) => c.point(r.name, r.value)).join(", ")}`;
  const ctx = nav.active === null || cat === null || cat === void 0 ? null : {
    point: { label: cat, x: cat },
    index: nav.active,
    series: shown.map((s) => ({ id: s.id, name: s.name, value: s.data[nav.active] ?? 0, formatted: formatValue(s.data[nav.active] ?? 0), tone: tones(s) }))
  };
  const tipOn = !!ctx && tooltip !== false;
  const bandCenter = nav.active === null ? 0 : (band(categories[nav.active]) ?? 0) + band.bandwidth() / 2;
  const tipX = horizontal ? margin.left + innerW / 2 : margin.left + bandCenter;
  const tipY = horizontal ? margin.top + bandCenter + 8 : margin.top;
  const onPointerMove = (e) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return;
    const p = horizontal ? e.clientY - r.top - margin.top : e.clientX - r.left - margin.left;
    const i = Math.floor(p / (along / categories.length));
    nav.setKeyboard(false);
    nav.setActive(i >= 0 && i < categories.length ? i : null);
  };
  const legendItems = series.map((s, i) => ({ id: s.id, name: s.name, tone: chartTone(i) }));
  return /* @__PURE__ */ jsx(
    ChartFrame,
    {
      label,
      className,
      height,
      plotRef: wrap,
      animate: motion.enabled,
      loading,
      error,
      onRetry,
      empty: !categories.length || !series.length,
      announce: nav.keyboard ? announce : "",
      legend: legend && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems, hidden, onHover: setEmph, onToggle: (id) => setHidden((h) => h.includes(id) ? h.filter((x) => x !== id) : [...h, id]) }),
      table: { head: [c.category, ...series.map((s) => s.name)], rows: categories.map((name, i) => [name, ...series.map((s) => formatValue(s.data[i] ?? 0))]) },
      plot: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            ref: svgRef,
            width,
            height,
            role: "img",
            "aria-label": label,
            "aria-describedby": tipOn ? `${hintId} ${tipId}` : hintId,
            tabIndex: 0,
            style: motionVars(motion),
            className: "text-muted outline-none select-none focus-visible:outline-2 focus-visible:outline-primary",
            onKeyDown: nav.onKeyDown,
            onBlur: nav.onBlur,
            onPointerDown: onPointerMove,
            onPointerMove,
            onPointerLeave: (e) => e.pointerType !== "touch" && !nav.keyboard && nav.setActive(null),
            children: /* @__PURE__ */ jsxs(Group, { left: margin.left, top: margin.top, children: [
              val.ticks(4).map((tv) => /* @__PURE__ */ jsx("line", { x1: horizontal ? val(tv) : 0, x2: horizontal ? val(tv) : innerW, y1: horizontal ? 0 : val(tv), y2: horizontal ? innerH : val(tv), stroke: "var(--border)" }, tv)),
              nav.active !== null && /* @__PURE__ */ jsx("rect", { "data-active": categories[nav.active], x: horizontal ? 0 : band(categories[nav.active]) - 2, y: horizontal ? band(categories[nav.active]) - 2 : 0, width: horizontal ? innerW : band.bandwidth() + 4, height: horizontal ? band.bandwidth() + 4 : innerH, fill: "var(--bg-muted)", opacity: 0.6 }),
              rects.map((r) => {
                const enter = entryAnim(motion, horizontal ? "grow-x" : "grow-y", r.ci);
                const dim = nav.active !== null && nav.active !== r.ci || emph !== null && emph !== r.s.id;
                return /* @__PURE__ */ jsx("rect", { "data-bar": r.key, x: r.x, y: r.y, width: Math.max(r.w, 0), height: Math.max(r.h, 0), rx: 1, fill: "currentColor", className: cn(tones(r.s), tweenClass(motion), enter.className, dim && "opacity-40"), style: enter.style }, r.key);
              }),
              horizontal ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(AxisLeft, { scale: band, stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { ...tick, textAnchor: "end", dy: "0.33em" } }),
                /* @__PURE__ */ jsx(AxisBottom, { top: innerH, scale: val, numTicks: 4, tickFormat: (v) => formatValue(v), stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { ...tick, textAnchor: "middle" } })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(AxisBottom, { top: innerH, scale: band, stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { ...tick, textAnchor: "middle" } }),
                /* @__PURE__ */ jsx(AxisLeft, { scale: val, numTicks: 4, tickFormat: (v) => formatValue(v), stroke: "var(--border-strong)", tickStroke: "var(--border-strong)", tickLabelProps: { ...tick, textAnchor: "end", dy: "0.33em" } })
              ] })
            ] })
          }
        ),
        tipOn && /* @__PURE__ */ jsx(ChartTooltipFor, { option: tooltip, ctx, x: tipX, y: tipY, id: tipId, container: wrap }),
        /* @__PURE__ */ jsx("span", { id: hintId, className: "sr-only", children: c.keyboardHint })
      ] })
    }
  );
}
function DonutChart({ data, centerLabel, centerValue, formatValue = (v) => String(Math.round(v * 10) / 10), label, size = 200, thickness = 28, legend = true, animate, tooltip = true, loading, error, onRetry, className }) {
  const { t, format } = useChartLaf();
  const c = t.components.dashboard.chart;
  const [hidden, setHidden] = React.useState([]);
  const shown = data.filter((d) => !hidden.includes(d.id) && d.value > 0);
  const total = shown.reduce((a, d) => a + d.value, 0);
  const box = React.useRef(null);
  const nav = useActiveIndex(shown.length, box);
  const motion = useChartMotion(animate);
  const tweened = useTweenedNumbers(shown.map((d) => d.value), motion);
  const drawn = shown.map((d, i) => ({ ...d, value: tweened[i] ?? d.value }));
  const hintId = React.useId();
  const tipId = React.useId();
  const maskId = `${React.useId().replace(/:/g, "")}-sweep`;
  const r = size / 2;
  const line = (d) => `${d.name}: ${formatValue(d.value)} (${format.percent(total ? d.value / total : 0, { fractionDigits: 1 })})`;
  const active = nav.active === null ? null : shown[nav.active];
  const toneOf = (d) => chartTone(data.findIndex((x) => x.id === d.id));
  const share = (d) => format.percent(total ? d.value / total : 0, { fractionDigits: 1 });
  const ctx = active ? { point: { label: active.name, x: active.id, value: active.value, formatted: formatValue(active.value) }, index: nav.active, series: [{ id: active.id, name: c.value, value: active.value, formatted: `${formatValue(active.value)} (${share(active)})`, tone: toneOf(active) }] } : null;
  const tipOn = !!ctx && tooltip !== false;
  let before = 0;
  for (let i = 0; i < (nav.active ?? 0); i++) before += shown[i].value;
  const mid = active && total ? (before + active.value / 2) / total * 2 * Math.PI : 0;
  const rm = r - thickness / 2;
  const legendItems = data.map((d, i) => ({ id: d.id, name: d.name, tone: chartTone(i), value: formatValue(d.value) }));
  return /* @__PURE__ */ jsx(
    ChartFrame,
    {
      label,
      className,
      height: size,
      animate: motion.enabled,
      loading,
      error,
      onRetry,
      empty: !data.length || data.every((d) => d.value <= 0),
      announce: nav.keyboard && active ? line(active) : "",
      legend: legend && /* @__PURE__ */ jsx(ChartLegend, { items: legendItems, hidden, onToggle: (id) => setHidden((h) => h.includes(id) ? h.filter((x) => x !== id) : [...h, id]) }),
      table: { head: [c.category, c.value, c.share], rows: data.map((d) => [d.name, formatValue(d.value), format.percent(total ? d.value / total : 0, { fractionDigits: 1 })]) },
      plot: /* @__PURE__ */ jsxs("div", { ref: box, className: "relative mx-auto", style: { width: size, height: size, ...motionVars(motion) }, children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            width: size,
            height: size,
            role: "img",
            "aria-label": label,
            "aria-describedby": tipOn ? `${hintId} ${tipId}` : hintId,
            tabIndex: 0,
            className: "text-muted outline-none focus-visible:outline-2 focus-visible:outline-primary",
            onKeyDown: nav.onKeyDown,
            onBlur: nav.onBlur,
            onPointerLeave: (e) => e.pointerType !== "touch" && !nav.keyboard && nav.setActive(null),
            children: [
              motion.enabled && /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("mask", { id: maskId, children: /* @__PURE__ */ jsx("circle", { r: r / 2, cx: r, cy: r, fill: "none", stroke: "white", strokeWidth: r + 4, pathLength: 100, strokeDasharray: "100 100", transform: `rotate(-90 ${r} ${r})`, ...entryAnim(motion, "sweep") }) }) }),
              /* @__PURE__ */ jsx("g", { transform: `translate(${r} ${r})`, mask: motion.enabled ? `url(#${maskId})` : void 0, children: /* @__PURE__ */ jsx(Pie, { data: drawn, pieValue: (d) => d.value, outerRadius: r - 2, innerRadius: r - thickness, padAngle: shown.length > 1 ? 0.02 : 0, pieSort: null, children: (pie) => pie.arcs.map((arc, i) => /* @__PURE__ */ jsx(
                "path",
                {
                  d: pie.path(arc) ?? void 0,
                  fill: "currentColor",
                  className: cn(toneOf(arc.data), tweenClass(motion), nav.active !== null && nav.active !== i && "opacity-40"),
                  onPointerEnter: () => (nav.setKeyboard(false), nav.setActive(i)),
                  onPointerDown: () => (nav.setKeyboard(false), nav.setActive(i))
                },
                arc.data.id
              )) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 grid place-content-center text-center leading-tight", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl font-semibold tabular-nums", children: active ? formatValue(active.value) : centerValue ?? formatValue(total) }),
          /* @__PURE__ */ jsx("span", { className: "max-w-24 truncate text-xs text-muted", children: active ? active.name : centerLabel ?? c.total })
        ] }),
        tipOn && /* @__PURE__ */ jsx(ChartTooltipFor, { option: tooltip, ctx, x: r + Math.sin(mid) * rm, y: r - Math.cos(mid) * rm, id: tipId, container: box }),
        /* @__PURE__ */ jsx("span", { id: hintId, className: "sr-only", children: c.keyboardHint })
      ] })
    }
  );
}
function ChartCard({
  title,
  description,
  headingLevel = 3,
  ranges,
  range: rangeProp,
  defaultRange,
  onRangeChange,
  legendToggle,
  legend: legendProp,
  onLegendChange,
  onExport,
  onRefresh,
  refreshing,
  loading,
  error,
  onRetry,
  empty,
  actions,
  footer,
  children,
  className,
  ...rest
}) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  const [range, setRange] = useControllableState({ value: rangeProp, defaultValue: defaultRange ?? ranges?.[0]?.value, onChange: (v) => v !== void 0 && onRangeChange?.(v) });
  const [legend, setLegend] = useControllableState({ value: legendProp, defaultValue: true, onChange: onLegendChange });
  const state = loading ? /* @__PURE__ */ jsx("div", { role: "status", "aria-label": c.loading, className: "h-48 animate-pulse rounded-sm bg-muted-bg motion-reduce:animate-none" }) : error ? /* @__PURE__ */ jsxs("div", { role: "alert", className: "grid h-48 place-content-center justify-items-center gap-2 text-sm text-danger", children: [
    /* @__PURE__ */ jsx("span", { children: typeof error === "string" ? error : c.error }),
    onRetry && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", onClick: onRetry, children: c.retry })
  ] }) : empty ? /* @__PURE__ */ jsx("div", { className: "grid h-48 place-items-center text-sm text-muted", children: c.empty }) : null;
  return /* @__PURE__ */ jsxs(Card, { variant: "default", ...rest, className: cn("gap-3", className), "aria-busy": loading || void 0, children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex-wrap", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx(CardTitle, { as: `h${headingLevel}`, children: title }),
        description && /* @__PURE__ */ jsx(CardDescription, { className: "mt-0.5", children: description })
      ] }),
      /* @__PURE__ */ jsxs(CardActions, { className: "flex-wrap", children: [
        actions,
        ranges && ranges.length > 0 && /* @__PURE__ */ jsx(SegmentedControl, { "aria-label": c.range, items: ranges.map((r) => ({ value: r.value, label: r.label })), value: range, onValueChange: setRange, className: "h-7" }),
        legendToggle && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", "aria-pressed": legend, "aria-label": legend ? c.hideLegend : c.showLegend, onClick: () => setLegend(!legend), className: "px-0 w-7", children: legend ? /* @__PURE__ */ jsx(Eye, { "aria-hidden": true }) : /* @__PURE__ */ jsx(EyeOff, { "aria-hidden": true }) }),
        onRefresh && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", "aria-label": c.refresh, disabled: refreshing, onClick: onRefresh, className: "px-0 w-7", children: /* @__PURE__ */ jsx(RefreshCw, { "aria-hidden": true, className: cn(refreshing && "animate-spin motion-reduce:animate-none") }) }),
        onExport && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", "aria-label": c.export, onClick: onExport, className: "px-0 w-7", children: /* @__PURE__ */ jsx(Download, { "aria-hidden": true }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardBody, { children: state ?? (typeof children === "function" ? children({ range, legend }) : children) }),
    footer && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted", children: footer })
  ] });
}
function SegmentedBar({ segments, label, formatValue = (v) => String(v), legend = true, height = 16, animate, tooltip = true, className }) {
  const { t, format } = useChartLaf();
  const u = t.components.dashboard.utilization;
  const c = t.components.dashboard.chart;
  const motion = useChartMotion(animate);
  const box = React.useRef(null);
  const hintId = React.useId();
  const tipId = React.useId();
  const total = segments.reduce((a, s) => a + Math.max(0, s.value), 0);
  const toneOf = (s, i) => s.tone ?? chartTone(i);
  const visible = segments.map((s, i) => ({ s, i })).filter(({ s }) => s.value > 0);
  const nav = useActiveIndex(visible.length, box);
  const cur = nav.active === null ? null : visible[nav.active];
  const share = (v) => format.percent(total ? v / total : 0, { fractionDigits: 1 });
  const ctx = cur ? { point: { label: cur.s.name, x: cur.s.id, value: cur.s.value, formatted: formatValue(cur.s.value) }, index: nav.active, series: [{ id: cur.s.id, name: c.value, value: cur.s.value, formatted: `${formatValue(cur.s.value)} (${share(cur.s.value)})`, tone: toneOf(cur.s, cur.i) }] } : null;
  const tipOn = !!ctx && tooltip !== false;
  const [anchorX, setAnchorX] = React.useState(0);
  React.useLayoutEffect(() => {
    const el = cur && Array.from(box.current?.querySelectorAll("[data-segment]") ?? []).find((e) => e.dataset.segment === cur.s.id);
    if (el) setAnchorX(el.offsetLeft + el.offsetWidth / 2);
  }, [cur]);
  const summary = u.barSummary(label, formatValue(total), segments.map((s) => u.percentLine(s.name, formatValue(s.value))).join(", "));
  const items = segments.map((s, i) => ({ id: s.id, name: s.name, tone: toneOf(s, i) }));
  return /* @__PURE__ */ jsxs("div", { className: cn("grid min-w-0 gap-2", className), "data-animate": motion.enabled ? "on" : "off", style: motionVars(motion), children: [
    /* @__PURE__ */ jsxs("div", { ref: box, className: "relative", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          role: "img",
          "aria-label": summary,
          "aria-describedby": tipOn ? `${hintId} ${tipId}` : hintId,
          tabIndex: 0,
          className: "flex w-full overflow-hidden rounded-sm bg-muted-bg outline-none focus-visible:outline-2 focus-visible:outline-primary",
          style: { height },
          onKeyDown: nav.onKeyDown,
          onBlur: nav.onBlur,
          onPointerLeave: (e) => e.pointerType !== "touch" && !nav.keyboard && nav.setActive(null),
          children: segments.map((s, i) => {
            if (s.value <= 0) return null;
            const k = visible.findIndex((v) => v.s === s);
            const enter = entryAnim(motion, "grow-x", k);
            return /* @__PURE__ */ jsx(
              "div",
              {
                "aria-hidden": true,
                "data-segment": s.id,
                className: cn("h-full bg-current", toneOf(s, i), tweenClass(motion), enter.className, nav.active !== null && nav.active !== k && "opacity-40"),
                style: { flexGrow: s.value, flexBasis: 0, ...enter.style },
                onPointerEnter: () => (nav.setKeyboard(false), nav.setActive(k)),
                onPointerDown: () => (nav.setKeyboard(false), nav.setActive(k))
              },
              s.id
            );
          })
        }
      ),
      tipOn && /* @__PURE__ */ jsx(ChartTooltipFor, { option: tooltip, ctx, x: anchorX, y: 0, id: tipId, container: box }),
      /* @__PURE__ */ jsx("span", { id: hintId, className: "sr-only", children: c.keyboardHint }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", role: "status", "aria-live": "polite", children: nav.keyboard && cur ? `${cur.s.name}: ${formatValue(cur.s.value)} (${share(cur.s.value)})` : "" })
    ] }),
    legend && /* @__PURE__ */ jsx(ChartLegend, { items, label: u.segments })
  ] });
}
function thresholdTone(pct, warnAt, dangerAt) {
  return pct >= dangerAt ? "danger" : pct >= warnAt ? "warn" : "ok";
}
var toneClass = { ok: "text-primary", warn: "text-warn", danger: "text-danger" };
function ThresholdDonut({ value, max = 100, warnAt = 60, dangerAt = 90, subtext, label, size = 160, legend = true, animate, tooltip = true, className }) {
  const { t, format } = useChartLaf();
  const u = t.components.dashboard.utilization;
  const pct = max > 0 ? Math.min(100, Math.max(0, value / max * 100)) : 0;
  const tone = thresholdTone(pct, warnAt, dangerAt);
  const pctText = format.percent(pct / 100, { fractionDigits: 0 });
  const summary = `${u.donutSummary(label, pctText, typeof subtext === "string" ? subtext : "", format.percent(warnAt / 100, { fractionDigits: 0 }), format.percent(dangerAt / 100, { fractionDigits: 0 }))} ${u.status[tone]}.`.replace(/\s+\./g, ".");
  const motion = useChartMotion(animate);
  const box = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  useTooltipDismiss(open, box, () => setOpen(false));
  const tipId = React.useId();
  const c = size / 2;
  const outerW = Math.max(4, size / 20);
  const innerW = Math.max(8, size / 10);
  const rOuter = c - outerW / 2;
  const rInner = rOuter - outerW / 2 - 4 - innerW / 2;
  const arc = (r, w, from, to, cls, anim) => /* @__PURE__ */ jsx("circle", { cx: c, cy: c, r, fill: "none", stroke: "currentColor", strokeWidth: w, pathLength: 100, strokeDasharray: `${Math.max(0, to - from)} ${100 - Math.max(0, to - from)}`, strokeDashoffset: -from, transform: `rotate(-90 ${c} ${c})`, className: cn(cls, anim?.className), style: anim?.style });
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
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-wrap items-center gap-4", className), children: [
    /* @__PURE__ */ jsxs("div", { ref: box, dir: "ltr", "data-animate": motion.enabled ? "on" : "off", className: "relative shrink-0", style: { width: size, height: size, ...motionVars(motion) }, children: [
      /* @__PURE__ */ jsxs(
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
            arc(rOuter, outerW, warnAt, dangerAt, "text-warn opacity-50", entryAnim(motion, "fade", 1)),
            arc(rOuter, outerW, dangerAt, 100, "text-danger opacity-50", entryAnim(motion, "fade", 2)),
            arc(rInner, innerW, 0, 100, "text-muted-bg"),
            arc(rInner, innerW, 0, pct, toneClass[tone], { ...entryAnim(motion, "sweep"), className: cn(tweenClass(motion), entryAnim(motion, "sweep").className) })
          ]
        }
      ),
      tipOn && /* @__PURE__ */ jsx(ChartTooltipFor, { option: tooltip, ctx, x: c, y: 0, id: tipId, container: box }),
      /* @__PURE__ */ jsxs("div", { "aria-hidden": true, className: "absolute inset-0 grid place-content-center text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl leading-tight text-fg tabular-nums", children: pctText }),
        subtext && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted", children: subtext })
      ] })
    ] }),
    legend && /* @__PURE__ */ jsx(
      ChartLegend,
      {
        items: items.map((i) => ({ ...i, name: `${i.name}:`, value: i.value })),
        label: u.segments,
        className: "flex-col items-start"
      }
    )
  ] });
}
var linkClass = "text-sm text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-primary";
function DetailsLink({ href, onClick, children }) {
  if (!href && !onClick) return null;
  return href ? /* @__PURE__ */ jsx("a", { href, onClick, className: linkClass, children }) : /* @__PURE__ */ jsx("button", { type: "button", onClick, className: `${linkClass} cursor-pointer border-0 bg-transparent p-0`, children });
}
function UtilizationCard(props) {
  const { t } = useChartLaf();
  const u = t.components.dashboard.utilization;
  const { title, filter, detailsHref, onDetails, headingLevel = 3, animate, tooltip, className } = props;
  const label = props.chartLabel ?? (typeof title === "string" ? title : u.segments);
  return /* @__PURE__ */ jsxs(Card, { className, children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { as: `h${headingLevel}`, className: "flex-1", children: title }),
      filter && /* @__PURE__ */ jsx(CardActions, { children: filter })
    ] }),
    /* @__PURE__ */ jsx(CardBody, { className: "grid gap-2", children: props.variant === "donut" ? /* @__PURE__ */ jsx(ThresholdDonut, { value: props.value, max: props.max, warnAt: props.warnAt, dangerAt: props.dangerAt, subtext: props.subtext, label, animate, tooltip }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      props.subtitle && /* @__PURE__ */ jsx("div", { className: "text-fg", children: props.subtitle }),
      props.alertText && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(AlertCircle, { "aria-hidden": true, className: "size-4 shrink-0 text-danger" }),
        props.alertHref || props.onAlertClick ? /* @__PURE__ */ jsx(DetailsLink, { href: props.alertHref, onClick: props.onAlertClick, children: props.alertText }) : /* @__PURE__ */ jsx("span", { children: props.alertText })
      ] }),
      /* @__PURE__ */ jsx(SegmentedBar, { segments: props.segments, label, formatValue: props.formatValue, animate, tooltip })
    ] }) }),
    (detailsHref || onDetails) && /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(DetailsLink, { href: detailsHref, onClick: onDetails, children: u.seeDetails }) })
  ] });
}

export { AreaChart, BarChart, CHART_TONES, ChartCard, ChartLegend, DonutChart, Heatmap, LineChart, PerfPanel, SegmentedBar, StackedBarChart, ThresholdDonut, TimeSeriesChart, UtilizationCard, chartTone, downsample, formatUnit, lttb, presetToMs, seriesToCsv, thresholdTone };
//# sourceMappingURL=charts.js.map
//# sourceMappingURL=charts.js.map