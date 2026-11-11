/** `animate` prop of every chart: on/off or tuned timing. Always off under `prefers-reduced-motion`. */
type ChartAnimate = boolean | {
    duration?: number;
    easing?: string;
    stagger?: number;
};
interface ChartMotion {
    enabled: boolean;
    /** Entry duration in ms (value-change tweens run at 60 % of it). */
    duration: number;
    easing: string;
    /** Delay in ms between consecutive items (bars, segments, series, cells). */
    stagger: number;
}
declare function usePrefersReducedMotion(): boolean;
/** Resolves the `animate` prop (default on) against the user's reduced-motion preference. */
declare function useChartMotion(animate?: ChartAnimate): ChartMotion;

export { type ChartAnimate as C, type ChartMotion as a, usePrefersReducedMotion as b, useChartMotion as u };
