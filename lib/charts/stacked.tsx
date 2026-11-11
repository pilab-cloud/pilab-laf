import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import * as React from "react";
import { cn } from "../cn";
import { ChartTooltipFor, entryAnim, motionVars, tweenClass, useActiveIndex, useChartLaf, useChartMotion, useTooltipDismiss, type ChartAnimate, type ChartTooltipContext, type ChartTooltipOption } from "./chart-kit";
import { SERIES_TONES } from "./time-series";

const TONES = SERIES_TONES;

/* ── Stacked bar chart (horizontal, SVG) — same props as the core component, plus value formatting ── */
export function StackedBarChart({
  data,
  series,
  label,
  formatValue = (v) => String(v),
  width = 480,
  barHeight = 14,
  animate,
  tooltip = true,
  className,
}: {
  data: { name: string; values: number[] }[];
  series: string[];
  label: string;
  formatValue?: (v: number) => string;
  width?: number;
  barHeight?: number;
  /** Segments grow in (staggered per row) and re-size smoothly; off under `prefers-reduced-motion`. Default on. */
  animate?: ChartAnimate;
  /** Tooltip per segment (hover, tap, arrow keys): `false`, a render function or `{formatter, header}`. Default on. */
  tooltip?: ChartTooltipOption;
  className?: string;
}) {
  const { t } = useChartLaf();
  const c = t.components.dashboard.chart;
  const motion = useChartMotion(animate);
  const box = React.useRef<HTMLDivElement>(null);
  const hintId = React.useId();
  const tipId = React.useId();
  const cells = data.flatMap((d, ri) => d.values.map((v, si) => ({ ri, si, v })));
  const nav = useActiveIndex(cells.length, box);
  const nameW = 96;
  const gap = 8;
  const rowH = barHeight + gap;
  const totals = data.map((d) => d.values.reduce((a, b) => a + b, 0));
  const max = Math.max(...totals, 1);
  const x = scaleLinear<number>({ domain: [0, max], range: [0, Math.max(width - nameW - 56, 10)], nice: true });
  const cur = nav.active === null ? null : cells[nav.active];
  let tipX = 0;
  if (cur) {
    let acc = 0;
    for (let k = 0; k < cur.si; k++) acc += data[cur.ri]!.values[k]!;
    tipX = (nameW + (x(acc) + x(acc + cur.v)) / 2) * ((box.current?.clientWidth || width) / width);
  }
  const segName = cur ? `${data[cur.ri]!.name} · ${series[cur.si]}` : "";
  const ctx: ChartTooltipContext | null = cur ? { point: { label: segName, x: data[cur.ri]!.name, value: cur.v, formatted: formatValue(cur.v) }, index: nav.active!, series: [{ id: String(cur.si), name: String(series[cur.si]), value: cur.v, formatted: formatValue(cur.v), tone: TONES[cur.si % TONES.length] }] } : null;
  const tipOn = !!ctx && tooltip !== false;
  return (
    <figure aria-label={label} data-animate={motion.enabled ? "on" : "off"} className={cn("m-0 grid gap-2", className)}>
      <div ref={box} className="relative" style={motionVars(motion)}>
      <svg
        role="img"
        aria-label={label}
        aria-describedby={tipOn ? `${hintId} ${tipId}` : hintId}
        tabIndex={0}
        width="100%"
        viewBox={`0 0 ${width} ${Math.max(data.length * rowH, 1)}`}
        className="block text-muted outline-none focus-visible:outline-2 focus-visible:outline-primary"
        onKeyDown={nav.onKeyDown}
        onBlur={nav.onBlur}
        onPointerLeave={(e) => e.pointerType !== "touch" && !nav.keyboard && nav.setActive(null)}
      >
        {data.map((d, ri) => {
          let acc = 0;
          return (
            <Group key={d.name} top={ri * rowH}>
              <text x={nameW - 8} y={barHeight / 2} dy="0.33em" textAnchor="end" fontSize={11} fill="currentColor">{d.name}</text>
              <rect x={nameW} y={0} width={x.range()[1]!} height={barHeight} rx={2} className="text-muted-bg" fill="currentColor" />
              {d.values.map((v, i) => {
                const x0 = x(acc);
                acc += v;
                const flat = cells.findIndex((cc) => cc.ri === ri && cc.si === i);
                const enter = entryAnim(motion, "grow-x", ri);
                return (
                  <Bar
                    key={i}
                    x={nameW + x0}
                    y={0}
                    width={Math.max(x(acc) - x0, 0)}
                    height={barHeight}
                    fill="currentColor"
                    className={cn(TONES[i % TONES.length], tweenClass(motion), enter.className, nav.active !== null && nav.active !== flat && "opacity-40")}
                    style={enter.style}
                    onPointerEnter={() => (nav.setKeyboard(false), nav.setActive(flat))}
                    onPointerDown={() => (nav.setKeyboard(false), nav.setActive(flat))}
                  >
                    {tooltip === false && <title>{`${d.name} · ${series[i]}: ${formatValue(v)}`}</title>}
                  </Bar>
                );
              })}
              <text x={nameW + x(totals[ri]!) + 6} y={barHeight / 2} dy="0.33em" fontSize={11} fill="currentColor" className="font-mono">{formatValue(totals[ri]!)}</text>
            </Group>
          );
        })}
      </svg>
      {tipOn && <ChartTooltipFor option={tooltip} ctx={ctx} x={tipX} y={(cur!.ri + 0.5) * rowH} id={tipId} container={box} />}
      <span id={hintId} className="sr-only">{c.keyboardHint}</span>
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        {nav.keyboard && cur ? `${segName}: ${formatValue(cur.v)}` : ""}
      </div>
      <figcaption className="flex flex-wrap gap-3 text-xs text-muted">
        {series.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-1">
            <span className={cn("size-2 rounded-sm bg-current", TONES[i % TONES.length])} aria-hidden /> {s}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

/* ── Heatmap (values 0..max, SVG, keyboard-navigable cells) ── */
export function Heatmap({
  rows,
  columns,
  values,
  label,
  max,
  formatValue = (v) => String(v),
  cell = 28,
  animate,
  tooltip = true,
  className,
}: {
  rows: string[];
  columns: string[];
  values: number[][];
  label: string;
  max?: number;
  formatValue?: (v: number) => string;
  cell?: number;
  /** Cells fade in as a diagonal wave and re-tint smoothly; off under `prefers-reduced-motion`. Default on. */
  animate?: ChartAnimate;
  /** Tooltip per cell (hover, tap, focus): `false`, a render function or `{formatter, header}`. Default on. */
  tooltip?: ChartTooltipOption;
  className?: string;
}) {
  const motion = useChartMotion(animate);
  const box = React.useRef<HTMLDivElement>(null);
  const tipId = React.useId();
  const [tip, setTip] = React.useState<[number, number] | null>(null);
  useTooltipDismiss(tip !== null, box, () => setTip(null));
  const top = max ?? Math.max(...values.flat(), 1);
  const headW = 96;
  const headH = 20;
  const [active, setActive] = React.useState<[number, number]>([0, 0]);
  const refs = React.useRef(new Map<string, SVGGElement>());
  const move = (r: number, c: number) => {
    const nr = Math.min(rows.length - 1, Math.max(0, r));
    const nc = Math.min(columns.length - 1, Math.max(0, c));
    setActive([nr, nc]);
    refs.current.get(`${nr}:${nc}`)?.focus();
  };
  const onKey = (e: React.KeyboardEvent, r: number, c: number) => {
    const d: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
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
  const tipValue = tip ? (values[tip[0]]?.[tip[1]] ?? 0) : 0;
  const ctx: ChartTooltipContext | null = tip
    ? { point: { label: `${rows[tip[0]]} · ${columns[tip[1]]}`, x: columns[tip[1]], value: tipValue, formatted: formatValue(tipValue) }, index: tip[0] * columns.length + tip[1], series: [{ id: `${tip[0]}:${tip[1]}`, name: String(rows[tip[0]]), value: tipValue, formatted: formatValue(tipValue), tone: "text-primary" }] }
    : null;
  const tipOn = !!ctx && tooltip !== false;
  return (
    <div ref={box} className="relative inline-block max-w-full align-top" style={motionVars(motion)} data-animate={motion.enabled ? "on" : "off"}>
    <svg
      role="grid"
      aria-label={label}
      aria-rowcount={rows.length + 1}
      aria-colcount={columns.length}
      width={headW + columns.length * cell}
      height={headH + rows.length * cell}
      className={cn("block text-muted", className)}
    >
      <g role="row" aria-rowindex={1}>
        {columns.map((c, ci) => (
          <text key={c} role="columnheader" x={headW + ci * cell + cell / 2} y={headH - 6} textAnchor="middle" fontSize={10} fill="currentColor">{c}</text>
        ))}
      </g>
      {rows.map((r, ri) => (
        <g key={r} role="row" aria-rowindex={ri + 2} transform={`translate(0 ${headH + ri * cell})`}>
          <text role="rowheader" x={headW - 8} y={cell / 2} dy="0.33em" textAnchor="end" fontSize={11} fill="currentColor">{r}</text>
          {columns.map((c, ci) => {
            const v = values[ri]?.[ci] ?? 0;
            const text = `${r} ${c}: ${formatValue(v)}`;
            return (
              <g
                key={c}
                ref={(el) => {
                  if (el) refs.current.set(`${ri}:${ci}`, el);
                  else refs.current.delete(`${ri}:${ci}`);
                }}
                role="gridcell"
                aria-label={text}
                aria-describedby={tipOn && tip![0] === ri && tip![1] === ci ? tipId : undefined}
                tabIndex={active[0] === ri && active[1] === ci ? 0 : -1}
                onKeyDown={(e) => onKey(e, ri, ci)}
                onFocus={() => (setActive([ri, ci]), setTip([ri, ci]))}
                onBlur={() => setTip(null)}
                onPointerEnter={() => setTip([ri, ci])}
                onPointerDown={() => setTip([ri, ci])}
                onPointerLeave={(e) => e.pointerType !== "touch" && setTip(null)}
                className="text-primary outline-none [&:focus-visible>rect]:stroke-[var(--primary)] [&:focus-visible>rect]:stroke-2"
              >
                {tooltip === false && <title>{text}</title>}
                <rect
                  x={headW + ci * cell + 1}
                  y={1}
                  width={cell - 2}
                  height={cell - 2}
                  rx={2}
                  fill="currentColor"
                  fillOpacity={0.1 + 0.9 * Math.min(v / top, 1)}
                  className={cn(tweenClass(motion), entryAnim(motion, "fade", ri + ci).className, tip && !(tip[0] === ri && tip[1] === ci) && "opacity-60")}
                  style={entryAnim(motion, "fade", ri + ci).style}
                />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
    {tipOn && <ChartTooltipFor option={tooltip} ctx={ctx} x={headW + tip![1] * cell + cell / 2} y={headH + tip![0] * cell} id={tipId} container={box} />}
    </div>
  );
}