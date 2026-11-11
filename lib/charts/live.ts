import * as React from "react";
import { usePrefersReducedMotion } from "./chart-motion";
import type { Point } from "./lttb";
import type { TimeSeries } from "./time-series";

export interface LiveOptions {
  /** Keep points newer than `latest - windowMs`. Default 60 000. */
  windowMs?: number;
  /** Hard cap per series. Default 600. */
  maxPoints?: number;
}

/** Drop points that fell out of the rolling window and enforce the cap. */
export function trimWindow(points: Point[], { windowMs = 60_000, maxPoints = 600 }: LiveOptions = {}): Point[] {
  if (!points.length) return points;
  const min = points[points.length - 1]![0] - windowMs;
  let i = 0;
  while (i < points.length - 1 && points[i]![0] < min) i++;
  const out = i ? points.slice(i) : points;
  return out.length > maxPoints ? out.slice(out.length - maxPoints) : out;
}

/**
 * Rolling-window series buffer for streaming data. `push` appends one sample per series; the returned `series`
 * can go straight into a chart. Under `prefers-reduced-motion` renders are throttled to once per second.
 */
export function useLiveSeries(meta: Omit<TimeSeries, "points">[], options: LiveOptions = {}) {
  const { windowMs = 60_000, maxPoints = 600 } = options;
  const reduced = usePrefersReducedMotion();
  const buf = React.useRef(new Map<string, Point[]>());
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tick, setTick] = React.useState(0);

  const flush = React.useCallback(() => {
    if (timer.current) return;
    const run = () => {
      timer.current = null;
      setTick((n) => n + 1);
    };
    if (reduced) timer.current = setTimeout(run, 1000);
    else run();
  }, [reduced]);
  React.useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const push = React.useCallback(
    (values: Record<string, number | null>, t: number = Date.now()) => {
      for (const [id, v] of Object.entries(values)) buf.current.set(id, trimWindow([...(buf.current.get(id) ?? []), [t, v]], { windowMs, maxPoints }));
      flush();
    },
    [windowMs, maxPoints, flush],
  );
  const clear = React.useCallback(() => {
    buf.current.clear();
    setTick((n) => n + 1);
  }, []);

  const metaKey = meta.map((m) => `${m.id}|${m.name}|${m.unit}`).join();
  const series = React.useMemo<TimeSeries[]>(
    () => meta.map((m) => ({ ...m, points: buf.current.get(m.id) ?? [] })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [metaKey, tick],
  );
  return { series, push, clear, windowMs, maxPoints };
}

/** Holds the value seen when `frozen` turned true until it turns false again. */
export function useFrozen<T>(value: T, frozen: boolean): T {
  const held = React.useRef(value);
  if (!frozen) held.current = value;
  return held.current;
}
