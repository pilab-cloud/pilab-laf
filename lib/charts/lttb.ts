export type Point = [t: number, v: number | null];

/** Largest-Triangle-Three-Buckets downsampling of gap-free points. Keeps first and last. */
export function lttb(points: [number, number][], threshold: number): [number, number][] {
  const n = points.length;
  if (threshold >= n) return points.slice();
  if (threshold < 3) return [points[0]!, points[n - 1]!];
  const out: [number, number][] = [points[0]!];
  const every = (n - 2) / (threshold - 2);
  let a = 0;
  for (let i = 0; i < threshold - 2; i++) {
    const nextStart = Math.floor((i + 1) * every) + 1;
    const nextEnd = Math.min(Math.floor((i + 2) * every) + 1, n);
    let avgT = 0;
    let avgV = 0;
    for (let j = nextStart; j < nextEnd; j++) {
      avgT += points[j]![0];
      avgV += points[j]![1];
    }
    const len = nextEnd - nextStart || 1;
    avgT /= len;
    avgV /= len;
    const start = Math.floor(i * every) + 1;
    const end = Math.floor((i + 1) * every) + 1;
    const [at, av] = points[a]!;
    let best = -1;
    let pick = start;
    for (let j = start; j < end; j++) {
      const area = Math.abs((at - avgT) * (points[j]![1] - av) - (at - points[j]![0]) * (avgV - av));
      if (area > best) {
        best = area;
        pick = j;
      }
    }
    out.push(points[pick]!);
    a = pick;
  }
  out.push(points[n - 1]!);
  return out;
}

/**
 * Downsample a series to about `maxPoints` points. `null` values are gaps: each contiguous
 * run is reduced separately (budget proportional to its length) and gaps are preserved.
 */
export function downsample(points: Point[], maxPoints: number): Point[] {
  if (points.length <= maxPoints) return points;
  const runs: [number, number][][] = [];
  let cur: [number, number][] = [];
  for (const [t, v] of points) {
    if (v === null || Number.isNaN(v)) {
      if (cur.length) runs.push(cur);
      cur = [];
    } else cur.push([t, v]);
  }
  if (cur.length) runs.push(cur);
  const total = runs.reduce((s, r) => s + r.length, 0) || 1;
  const out: Point[] = [];
  runs.forEach((run, i) => {
    const budget = Math.max(3, Math.round((run.length / total) * maxPoints));
    if (i > 0) out.push([run[0]![0], null]);
    out.push(...lttb(run, budget));
  });
  return out;
}
