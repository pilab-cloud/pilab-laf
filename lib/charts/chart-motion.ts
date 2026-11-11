import * as React from "react";

/** `animate` prop of every chart: on/off or tuned timing. Always off under `prefers-reduced-motion`. */
export type ChartAnimate = boolean | { duration?: number; easing?: string; stagger?: number };

export interface ChartMotion {
  enabled: boolean;
  /** Entry duration in ms (value-change tweens run at 60 % of it). */
  duration: number;
  easing: string;
  /** Delay in ms between consecutive items (bars, segments, series, cells). */
  stagger: number;
}

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const m = typeof window !== "undefined" ? window.matchMedia?.(QUERY) : undefined;
  m?.addEventListener?.("change", cb);
  return () => m?.removeEventListener?.("change", cb);
}

export function usePrefersReducedMotion(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => typeof window !== "undefined" && !!window.matchMedia?.(QUERY)?.matches,
    () => false,
  );
}

/** Resolves the `animate` prop (default on) against the user's reduced-motion preference. */
export function useChartMotion(animate: ChartAnimate = true): ChartMotion {
  const reduced = usePrefersReducedMotion();
  const o = typeof animate === "object" ? animate : {};
  const { duration = 600, easing = "cubic-bezier(0.2, 0.7, 0.2, 1)", stagger = 40 } = o;
  const enabled = animate !== false && !reduced;
  return React.useMemo(() => ({ enabled, duration, easing, stagger }), [enabled, duration, easing, stagger]);
}

/** Custom properties the `.laf-anim` / `.laf-tween` classes of the stylesheet read; put them on the chart root. */
export function motionVars(m: ChartMotion): React.CSSProperties | undefined {
  return m.enabled ? ({ "--laf-dur": `${m.duration}ms`, "--laf-ease": m.easing } as React.CSSProperties) : undefined;
}

export type EntryKind = "fade" | "grow-y" | "grow-x" | "reveal" | "sweep";

/** className/style for an entry animation of item `i` (staggered, capped so long lists do not drag). Empty when disabled. */
export function entryAnim(m: ChartMotion, kind: EntryKind, i = 0): { className?: string; style?: React.CSSProperties } {
  if (!m.enabled) return {};
  return { className: `laf-anim laf-anim-${kind}`, style: { "--laf-delay": `${Math.min(i * m.stagger, 800)}ms` } as React.CSSProperties };
}

/** Class that transitions geometry/opacity changes (value-change tween done by the browser). */
export const tweenClass = (m: ChartMotion) => (m.enabled ? "laf-tween" : undefined);

export const easeOut = (t: number) => 1 - (1 - t) ** 3;

/** 0 → 1 (eased) progress that restarts whenever `sig` changes; 1 when idle or disabled. */
export function useTweenProgress(sig: string, m: ChartMotion): number {
  const [state, setState] = React.useState({ sig, p: 1 });
  let p = state.p;
  if (state.sig !== sig) {
    p = m.enabled ? 0 : 1;
    setState({ sig, p });
  }
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!m.enabled || typeof requestAnimationFrame === "undefined") return;
    const dur = Math.max(1, m.duration * 0.6);
    const start = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setState((s) => (s.sig === sig ? { sig, p: easeOut(t) } : s));
      if (t < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [sig, m.enabled, m.duration]);
  return m.enabled ? p : 1;
}

/** Tweens a list of numbers toward `target` (JS, for geometry CSS cannot transition such as arc paths). Snaps when the length changes. */
export function useTweenedNumbers(target: number[], m: ChartMotion): number[] {
  const key = target.join(",");
  const [cur, setCur] = React.useState(target);
  const curRef = React.useRef(target);
  React.useEffect(() => {
    const to = key === "" ? [] : key.split(",").map(Number);
    const from = curRef.current;
    if (!m.enabled || from.length !== to.length || typeof requestAnimationFrame === "undefined") {
      curRef.current = to;
      setCur(to);
      return;
    }
    const dur = Math.max(1, m.duration * 0.6);
    const start = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = easeOut(t);
      const next = to.map((v, i) => from[i]! + (v - from[i]!) * e);
      curRef.current = next;
      setCur(next);
      if (t < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [key, m.enabled, m.duration]);
  return m.enabled && cur.length === target.length ? cur : target;
}
