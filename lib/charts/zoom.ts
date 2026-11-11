import type { ChartRange } from "./time-series";

/** Narrowest window a zoom may reach, in ms. */
export const MIN_SPAN = 1;

/** Keep `r` inside `full` without changing its span (unless it is wider than `full`). */
export function clampRange(r: ChartRange, full: ChartRange): ChartRange {
  const span = Math.min(Math.max(r.to - r.from, MIN_SPAN), full.to - full.from);
  const from = Math.min(Math.max(r.from, full.from), full.to - span);
  return { from, to: from + span };
}

/** Scale the window by `factor` (<1 zooms in) keeping the time `at` fixed on screen. */
export function zoomAt(r: ChartRange, full: ChartRange, factor: number, at: number = (r.from + r.to) / 2): ChartRange {
  const span = Math.max((r.to - r.from) * factor, MIN_SPAN);
  const k = r.to === r.from ? 0.5 : (at - r.from) / (r.to - r.from);
  const from = at - span * k;
  return clampRange({ from, to: from + span }, full);
}

/** Shift the window by `dt` ms, stopping at the edges of `full`. */
export function panBy(r: ChartRange, full: ChartRange, dt: number): ChartRange {
  return clampRange({ from: r.from + dt, to: r.to + dt }, full);
}

export const sameRange = (a: ChartRange | null | undefined, b: ChartRange | null | undefined) => (a && b ? a.from === b.from && a.to === b.to : a === b);
