import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import * as React from "react";
import { cn } from "../cn";
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
  className,
}: {
  data: { name: string; values: number[] }[];
  series: string[];
  label: string;
  formatValue?: (v: number) => string;
  width?: number;
  barHeight?: number;
  className?: string;
}) {
  const nameW = 96;
  const gap = 8;
  const rowH = barHeight + gap;
  const totals = data.map((d) => d.values.reduce((a, b) => a + b, 0));
  const max = Math.max(...totals, 1);
  const x = scaleLinear<number>({ domain: [0, max], range: [0, Math.max(width - nameW - 56, 10)], nice: true });
  return (
    <figure aria-label={label} className={cn("m-0 grid gap-2", className)}>
      <svg role="img" aria-label={label} width="100%" viewBox={`0 0 ${width} ${Math.max(data.length * rowH, 1)}`} className="text-muted">
        {data.map((d, ri) => {
          let acc = 0;
          return (
            <Group key={d.name} top={ri * rowH}>
              <text x={nameW - 8} y={barHeight / 2} dy="0.33em" textAnchor="end" fontSize={11} fill="currentColor">{d.name}</text>
              <rect x={nameW} y={0} width={x.range()[1]!} height={barHeight} rx={2} className="text-muted-bg" fill="currentColor" />
              {d.values.map((v, i) => {
                const x0 = x(acc);
                acc += v;
                return (
                  <Bar key={i} x={nameW + x0} y={0} width={Math.max(x(acc) - x0, 0)} height={barHeight} fill="currentColor" className={TONES[i % TONES.length]}>
                    <title>{`${d.name} · ${series[i]}: ${formatValue(v)}`}</title>
                  </Bar>
                );
              })}
              <text x={nameW + x(totals[ri]!) + 6} y={barHeight / 2} dy="0.33em" fontSize={11} fill="currentColor" className="font-mono">{formatValue(totals[ri]!)}</text>
            </Group>
          );
        })}
      </svg>
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
  className,
}: {
  rows: string[];
  columns: string[];
  values: number[][];
  label: string;
  max?: number;
  formatValue?: (v: number) => string;
  cell?: number;
  className?: string;
}) {
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
  return (
    <svg
      role="grid"
      aria-label={label}
      aria-rowcount={rows.length + 1}
      aria-colcount={columns.length}
      width={headW + columns.length * cell}
      height={headH + rows.length * cell}
      className={cn("text-muted", className)}
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
                tabIndex={active[0] === ri && active[1] === ci ? 0 : -1}
                onKeyDown={(e) => onKey(e, ri, ci)}
                onFocus={() => setActive([ri, ci])}
                className="text-primary outline-none [&:focus-visible>rect]:stroke-[var(--primary)] [&:focus-visible>rect]:stroke-2"
              >
                <title>{text}</title>
                <rect x={headW + ci * cell + 1} y={1} width={cell - 2} height={cell - 2} rx={2} fill="currentColor" fillOpacity={0.1 + 0.9 * Math.min(v / top, 1)} />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
