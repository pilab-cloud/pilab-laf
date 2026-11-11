# Realtime connection state

Source: `lib/components/realtime.tsx`; demo: `realtime` (`playground/pages/Realtime.tsx`). Strings: `components.realtime` (`lib/messages/realtime.en.ts`, `lib/locales/realtime.hu.ts`); components merge them over the English defaults.

## `useConnectionState(options)` / `useRealtime`

A transport-agnostic state machine: `connecting → open → reconnecting → … → closed | error`.

```tsx
const conn = useConnectionState<Msg>({
  connect: ({ open, message, close, latency }) => {
    const ws = new WebSocket(url);
    ws.onopen = open;
    ws.onmessage = (e) => message(JSON.parse(e.data));
    ws.onclose = () => close();
    ws.onerror = (e) => close(e);
    return { close: () => ws.close() };
  },
  backoff: { initial: 1000, max: 30000, factor: 2, jitter: 0.5, maxAttempts: 10 },
  pauseWhenHidden: true,
  onMessage: (m) => …,
});
```

- Retries use exponential backoff with jitter (`backoffDelay`); a successful `open()` resets it. After `maxAttempts` failures the state is `error`.
- `offline`/`online` window events: going offline drops the connection and waits (`reconnecting`, `offline: true`); coming back reconnects immediately.
- `pauseWhenHidden`: closes while the tab is hidden, reconnects when visible.
- Returns `state`, `attempt`, `nextRetryAt`, `lastMessageAt`, `latency`, `error`, `offline`, `reconnect()` (immediate, resets backoff), `close()` (stays closed until `reconnect()`), `subscribe(listener)`.
- Stale events from a previous connection are ignored; unmount closes the connection and clears timers.

## `RealtimeProvider` / `useRealtimeContext` / `useRealtimeMessage`

One provider owns the connection (same options as the hook); descendants read it with `useRealtimeContext()` or listen with `useRealtimeMessage(fn)`.

## `ConnectionBadge`

`StatusDot` + label + Reconnect button (shown when `closed`/`reconnecting`/`error`). `compact` renders only the dot (label for screen readers) and an icon-only reconnect, for the masthead. A visually hidden `role="status"` live region announces state changes politely (not the initial state). Takes `connection` or reads the context.

## `StaleDataBanner`

"Live updates paused — last update 2 min ago [Reconnect]". Renders nothing while `open` (or during the very first connect). An `Alert` by default, `banner` for the page-wide `Banner`; `error` state uses the danger tone. The relative time refreshes every 15 s.
