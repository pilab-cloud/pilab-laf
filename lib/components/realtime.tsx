import { RefreshCw, WifiOff } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf } from "../i18n";
import { realtimeEn } from "../messages/realtime.en";
import { Alert, Banner } from "./alerts";
import { Button } from "./button";
import { StatusDot } from "./primitives";

type RealtimeMessages = typeof realtimeEn;

/** English defaults merged with any `components.realtime` override from the active locale. */
function useRealtimeText(): RealtimeMessages {
  const { t } = useLaf();
  const over = (t.components as Record<string, Partial<Record<keyof RealtimeMessages, object>> | undefined>).realtime;
  return React.useMemo(
    () => Object.fromEntries(Object.entries(realtimeEn).map(([k, v]) => [k, { ...v, ...over?.[k as keyof RealtimeMessages] }])) as RealtimeMessages,
    [over],
  );
}

export type ConnectionState = "connecting" | "open" | "reconnecting" | "closed" | "error";

/** Passed to the `connect` factory; call these from the transport (WebSocket, SSE, polling, …). */
export interface ConnectionHandlers<M = unknown> {
  /** The transport is ready; resets the backoff. */
  open: () => void;
  /** A message arrived; updates `lastMessageAt` and notifies subscribers. */
  message: (data?: M) => void;
  /** The transport dropped. Pass an error to record it. Triggers backoff reconnects. */
  close: (error?: unknown) => void;
  /** Report a round-trip time in milliseconds. */
  latency: (ms: number) => void;
}

export interface BackoffOptions {
  /** First retry delay (ms). Default 1000. */
  initial?: number;
  /** Delay ceiling (ms). Default 30000. */
  max?: number;
  /** Growth per attempt. Default 2. */
  factor?: number;
  /** 0–1: fraction of the delay that is randomised. Default 0.5. */
  jitter?: number;
  /** Give up (state `error`) after this many failed attempts. Default unlimited. */
  maxAttempts?: number;
}

/** Delay before retry number `attempt` (1-based): exponential, capped, with "equal" jitter. */
export function backoffDelay(attempt: number, { initial = 1000, max = 30000, factor = 2, jitter = 0.5 }: BackoffOptions = {}, random: () => number = Math.random): number {
  const base = Math.min(max, initial * factor ** Math.max(0, attempt - 1));
  return Math.round(base * (1 - jitter) + base * jitter * random());
}

export interface UseRealtimeOptions<M = unknown> {
  /** Opens one connection. Return `{ close }`; it is called on cleanup, manual close, offline and before retries. */
  connect: (handlers: ConnectionHandlers<M>) => { close: () => void } | void;
  /** Set false to stay `closed`. Default true. */
  enabled?: boolean;
  backoff?: BackoffOptions;
  /** Close while the tab is hidden and reconnect when visible again. Default false. */
  pauseWhenHidden?: boolean;
  /** Injectable for deterministic tests. */
  random?: () => number;
  onOpen?: () => void;
  onMessage?: (data: M) => void;
  onClose?: (error?: unknown) => void;
  onStateChange?: (state: ConnectionState, previous: ConnectionState) => void;
}

export interface RealtimeConnection<M = unknown> {
  state: ConnectionState;
  /** Failed attempts since the last successful open. */
  attempt: number;
  /** Timestamp (ms) of the next retry while waiting, else undefined. */
  nextRetryAt?: number;
  lastMessageAt?: number;
  /** Last reported round-trip time (ms). */
  latency?: number;
  error?: unknown;
  /** True while the browser reports no network. */
  offline: boolean;
  /** Drops the current connection (if any) and connects right now, resetting the backoff. */
  reconnect: () => void;
  /** Closes for good until `reconnect()` is called. */
  close: () => void;
  subscribe: (listener: (data: M) => void) => () => void;
}

const isOffline = () => typeof navigator !== "undefined" && navigator.onLine === false;
const isHidden = () => typeof document !== "undefined" && document.visibilityState === "hidden";

export function useConnectionState<M = unknown>(options: UseRealtimeOptions<M>): RealtimeConnection<M> {
  const { enabled = true, pauseWhenHidden = false } = options;
  const opts = React.useRef(options);
  opts.current = options;

  const [view, setView] = React.useState<Pick<RealtimeConnection<M>, "state" | "attempt" | "nextRetryAt" | "lastMessageAt" | "latency" | "error" | "offline">>(() => ({
    state: enabled ? "connecting" : "closed",
    attempt: 0,
    offline: isOffline(),
  }));
  const stateRef = React.useRef<ConnectionState>(view.state);
  const listeners = React.useRef(new Set<(data: M) => void>());
  const api = React.useRef<{ start: () => void; stop: (state: ConnectionState) => void }>({ start() {}, stop() {} });

  React.useEffect(() => {
    let gen = 0;
    let conn: { close: () => void } | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempt = 0;
    let manualClosed = !enabled;
    let alive = true;

    const patch = (p: Partial<typeof view>) => {
      if (!alive) return;
      if (p.state && p.state !== stateRef.current) {
        const prev = stateRef.current;
        stateRef.current = p.state;
        opts.current.onStateChange?.(p.state, prev);
      }
      setView((v) => ({ ...v, ...p }));
    };
    const teardown = () => {
      gen++;
      if (timer !== undefined) clearTimeout(timer);
      timer = undefined;
      const c = conn;
      conn = undefined;
      try {
        c?.close();
      } catch {
        /* a failing close must not break cleanup */
      }
    };
    const paused = () => pauseWhenHidden && isHidden();

    const schedule = (error?: unknown) => {
      attempt += 1;
      const max = opts.current.backoff?.maxAttempts;
      if (max !== undefined && attempt > max) {
        patch({ state: "error", attempt, nextRetryAt: undefined, error });
        return;
      }
      if (isOffline() || paused()) {
        patch({ state: paused() && !isOffline() ? "closed" : "reconnecting", attempt, nextRetryAt: undefined, error });
        return;
      }
      const delay = backoffDelay(attempt, opts.current.backoff, opts.current.random);
      patch({ state: "reconnecting", attempt, nextRetryAt: Date.now() + delay, error });
      timer = setTimeout(() => {
        timer = undefined;
        start("reconnecting");
      }, delay);
    };

    function start(initial: ConnectionState = "connecting") {
      teardown();
      const mine = gen;
      patch({ state: initial, nextRetryAt: undefined });
      const handlers: ConnectionHandlers<M> = {
        open() {
          if (mine !== gen) return;
          attempt = 0;
          patch({ state: "open", attempt: 0, nextRetryAt: undefined, error: undefined });
          opts.current.onOpen?.();
        },
        message(data) {
          if (mine !== gen) return;
          patch({ lastMessageAt: Date.now() });
          for (const l of [...listeners.current]) l(data as M);
          opts.current.onMessage?.(data as M);
        },
        close(error) {
          if (mine !== gen) return;
          teardown();
          opts.current.onClose?.(error);
          schedule(error);
        },
        latency(ms) {
          if (mine === gen) patch({ latency: ms });
        },
      };
      try {
        const c = opts.current.connect(handlers);
        if (mine !== gen) c?.close();
        else conn = c || undefined;
      } catch (e) {
        handlers.close(e);
      }
    }

    const resume = () => {
      if (manualClosed || paused()) return;
      attempt = 0;
      start("connecting");
    };
    const onOffline = () => {
      patch({ offline: true });
      if (manualClosed) return;
      teardown();
      patch({ state: "reconnecting", nextRetryAt: undefined });
    };
    const onOnline = () => {
      patch({ offline: false });
      resume();
    };
    const onVisibility = () => {
      if (!pauseWhenHidden || manualClosed) return;
      if (isHidden()) {
        teardown();
        patch({ state: "closed", nextRetryAt: undefined });
      } else if (!isOffline()) resume();
    };

    api.current = {
      start: () => {
        manualClosed = false;
        attempt = 0;
        start("connecting");
      },
      stop: (state) => {
        manualClosed = true;
        teardown();
        patch({ state, nextRetryAt: undefined });
      },
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    document.addEventListener("visibilitychange", onVisibility);
    if (!manualClosed) {
      if (isOffline()) patch({ state: "reconnecting" });
      else if (paused()) patch({ state: "closed" });
      else start("connecting");
    }
    return () => {
      alive = false;
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
      document.removeEventListener("visibilitychange", onVisibility);
      teardown();
    };
  }, [enabled, pauseWhenHidden]);

  const reconnect = React.useCallback(() => api.current.start(), []);
  const close = React.useCallback(() => api.current.stop("closed"), []);
  const subscribe = React.useCallback((l: (data: M) => void) => {
    listeners.current.add(l);
    return () => void listeners.current.delete(l);
  }, []);

  return { ...view, reconnect, close, subscribe };
}

export const useRealtime = useConnectionState;

/* ── Provider ── */
const RealtimeContext = React.createContext<RealtimeConnection<any> | null>(null);

/** Owns one connection and shares it with every descendant. */
export function RealtimeProvider<M = unknown>({ children, ...options }: UseRealtimeOptions<M> & { children?: React.ReactNode }) {
  const value = useConnectionState<M>(options);
  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>;
}

export function useRealtimeContext<M = unknown>(): RealtimeConnection<M> {
  const ctx = React.useContext(RealtimeContext);
  if (!ctx) throw new Error("useRealtimeContext must be used inside <RealtimeProvider>");
  return ctx as RealtimeConnection<M>;
}

/** Subscribes to messages of the surrounding `RealtimeProvider` for the component's lifetime. */
export function useRealtimeMessage<M = unknown>(listener: (data: M) => void): void {
  const { subscribe } = useRealtimeContext<M>();
  const ref = React.useRef(listener);
  ref.current = listener;
  React.useEffect(() => subscribe((d) => ref.current(d)), [subscribe]);
}

const tones = { connecting: "primary", open: "ok", reconnecting: "warn", closed: "neutral", error: "danger" } as const;

/* ── ConnectionBadge ── */
export interface ConnectionBadgeProps {
  /** Defaults to the surrounding `RealtimeProvider`. */
  connection?: RealtimeConnection<any>;
  /** Dot + icon-only reconnect, for the masthead. */
  compact?: boolean;
  className?: string;
}

export function ConnectionBadge({ connection, compact, className }: ConnectionBadgeProps) {
  const text = useRealtimeText();
  const ctx = React.useContext(RealtimeContext);
  const conn = connection ?? ctx;
  if (!conn) throw new Error("ConnectionBadge needs a `connection` prop or a <RealtimeProvider>");
  const { state, offline } = conn;
  const label = offline && state !== "open" ? text.badge.offline : text.state[state];
  const [announced, setAnnounced] = React.useState("");
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setAnnounced(text.badge.announce(text.state[state]));
  }, [state, text]);
  const canReconnect = state !== "open" && state !== "connecting";
  return (
    <div role="group" aria-label={text.badge.group} className={cn("relative inline-flex items-center gap-2", className)}>
      <StatusDot tone={tones[state]} pulse={state === "connecting" || state === "reconnecting"} label={label} srOnly={compact} />
      {canReconnect &&
        (compact ? (
          <Button variant="ghost" size="sm" aria-label={text.badge.reconnect} onClick={conn.reconnect} leftIcon={offline ? <WifiOff className="size-4" aria-hidden /> : <RefreshCw className="size-4" aria-hidden />} />
        ) : (
          <Button variant="secondary" size="sm" onClick={conn.reconnect} leftIcon={<RefreshCw className="size-4" aria-hidden />}>
            {text.badge.reconnect}
          </Button>
        ))}
      <span role="status" aria-live="polite" className="sr-only">
        {announced}
      </span>
    </div>
  );
}

/* ── StaleDataBanner ── */
export interface StaleDataBannerProps {
  connection?: RealtimeConnection<any>;
  /** Render as a page-wide `Banner` instead of an inline `Alert`. */
  banner?: boolean;
  className?: string;
}

function useAgo(at: number | undefined, text: RealtimeMessages["stale"]): string | undefined {
  const [, tick] = React.useReducer((n: number) => n + 1, 0);
  React.useEffect(() => {
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  if (at === undefined) return undefined;
  const s = Math.max(0, Math.round((Date.now() - at) / 1000));
  if (s < 5) return text.justNow;
  if (s < 60) return text.seconds(s);
  if (s < 3600) return text.minutes(Math.floor(s / 60));
  return text.hours(Math.floor(s / 3600));
}

/** Shown while live updates are not flowing (reconnecting, closed or failed); renders nothing when open or first connecting. */
export function StaleDataBanner({ connection, banner, className }: StaleDataBannerProps) {
  const text = useRealtimeText();
  const ctx = React.useContext(RealtimeContext);
  const conn = connection ?? ctx;
  if (!conn) throw new Error("StaleDataBanner needs a `connection` prop or a <RealtimeProvider>");
  const ago = useAgo(conn.lastMessageAt, text.stale);
  if (conn.state === "open" || (conn.state === "connecting" && conn.lastMessageAt === undefined)) return null;
  const message = ago ? text.stale.pausedSince(ago) : text.stale.paused;
  const action = (
    <Button variant="secondary" size="sm" onClick={conn.reconnect} leftIcon={<RefreshCw className="size-4" aria-hidden />}>
      {text.stale.reconnect}
    </Button>
  );
  const tone = conn.state === "error" ? "danger" : "warning";
  return banner ? (
    <Banner tone={tone} action={action} className={className}>
      {message}
    </Banner>
  ) : (
    <Alert tone={tone} role="status" actions={action} className={className}>
      {message}
    </Alert>
  );
}
