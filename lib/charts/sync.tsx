import * as React from "react";
import type { ChartRange } from "./time-series";

interface GroupState {
  /** Hovered time and the chart that owns it. */
  cursor: { t: number; source: string } | null;
  range: ChartRange | null;
}

interface SyncCtx {
  groups: Record<string, GroupState>;
  setCursor: (group: string, cursor: GroupState["cursor"]) => void;
  setRange: (group: string, range: ChartRange | null) => void;
}

const Ctx = React.createContext<SyncCtx | null>(null);
const EMPTY: GroupState = { cursor: null, range: null };

/** Charts below it that share a `syncGroup` (default `"default"`) share crosshair and zoom range. */
export function ChartSyncProvider({ children }: { children: React.ReactNode }) {
  const [groups, setGroups] = React.useState<Record<string, GroupState>>({});
  const actions = React.useMemo<Omit<SyncCtx, "groups">>(
    () => ({
      setCursor: (g, cursor) =>
        setGroups((s) => {
          const cur = s[g] ?? EMPTY;
          if (cursor === null ? !cur.cursor : cur.cursor?.t === cursor.t && cur.cursor.source === cursor.source) return s;
          return { ...s, [g]: { ...cur, cursor } };
        }),
      setRange: (g, range) =>
        setGroups((s) => {
          const cur = s[g] ?? EMPTY;
          if (cur.range?.from === range?.from && cur.range?.to === range?.to) return s;
          return { ...s, [g]: { ...cur, range } };
        }),
    }),
    [],
  );
  const value = React.useMemo<SyncCtx>(() => ({ groups, ...actions }), [groups, actions]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export interface ChartSync {
  /** Crosshair time set by another chart in the group (null when this chart owns it or nobody hovers). */
  remoteCursor: number | null;
  range: ChartRange | null;
  publishCursor: (t: number | null) => void;
  publishRange: (r: ChartRange | null) => void;
}

/** Join a sync group. Returns `null` outside a `ChartSyncProvider` or when `group` is `false`. */
export function useChartSync(group: string | false = "default"): ChartSync | null {
  const ctx = React.useContext(Ctx);
  const id = React.useId();
  const g = group === false ? null : group;
  const state = (ctx && g !== null ? ctx.groups[g] : undefined) ?? EMPTY;
  const { setCursor, setRange } = ctx ?? { setCursor: undefined, setRange: undefined };
  const publishCursor = React.useCallback((t: number | null) => g !== null && setCursor?.(g, t === null ? null : { t, source: id }), [g, id, setCursor]);
  const publishRange = React.useCallback((r: ChartRange | null) => g !== null && setRange?.(g, r), [g, setRange]);
  if (!ctx || g === null) return null;
  return {
    remoteCursor: state.cursor && state.cursor.source !== id ? state.cursor.t : null,
    range: state.range,
    publishCursor,
    publishRange,
  };
}
