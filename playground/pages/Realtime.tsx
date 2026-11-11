import * as React from "react";
import { Button } from "../../lib/components/button";
import { ConnectionBadge, RealtimeProvider, StaleDataBanner, useRealtimeContext, useRealtimeMessage, type ConnectionHandlers } from "../../lib/components/realtime";

/** Fake transport: opens after 600 ms, ticks every 2 s and drops after a few ticks. `failing` refuses to open. */
function makeFlakyConnect(failing: React.RefObject<boolean>) {
  return (h: ConnectionHandlers<number>) => {
    let n = 0;
    let tick: ReturnType<typeof setInterval> | undefined;
    const open = setTimeout(() => {
      if (failing.current) return h.close(new Error("refused"));
      h.open();
      tick = setInterval(() => {
        n += 1;
        h.message(n);
        h.latency(20 + Math.round(Math.random() * 80));
        if (n >= 4) h.close();
      }, 2000);
    }, 600);
    return {
      close: () => {
        clearTimeout(open);
        clearInterval(tick);
      },
    };
  };
}

function Panel({ failing }: { failing: React.RefObject<boolean> }) {
  const conn = useRealtimeContext<number>();
  const [log, setLog] = React.useState<number[]>([]);
  useRealtimeMessage<number>((n) => setLog((l) => [n, ...l].slice(0, 5)));
  return (
    <div className="space-y-3">
      <StaleDataBanner />
      <div className="flex flex-wrap items-center gap-3">
        <ConnectionBadge />
        <ConnectionBadge compact />
        <Button variant="secondary" size="sm" onClick={() => (failing.current = !failing.current)}>
          Toggle refusing connections
        </Button>
        <Button variant="ghost" size="sm" onClick={conn.close}>
          Close
        </Button>
        <Button variant="ghost" size="sm" onClick={conn.reconnect}>
          Connect
        </Button>
      </div>
      <div className="grid gap-1 text-sm">
        <div>State: <code>{conn.state}</code> (failed attempts {conn.attempt})</div>
        <div>Latency: {conn.latency ?? "–"} ms</div>
        <div>Messages: {log.join(", ") || "–"}</div>
      </div>
    </div>
  );
}

export default function RealtimeDemo() {
  const failing = React.useRef(false);
  const connect = React.useMemo(() => makeFlakyConnect(failing), []);
  return (
    <section className="min-w-0 space-y-4">
      <h2 className="text-lg font-semibold">Realtime connection state</h2>
      <p className="text-sm text-muted">A flaky fake transport shared through one provider. Go offline in devtools to see the offline/online handling.</p>
      <RealtimeProvider<number> connect={connect} backoff={{ initial: 1000, max: 8000 }}>
        <Panel failing={failing} />
      </RealtimeProvider>
    </section>
  );
}
