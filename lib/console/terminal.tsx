import { Copy, Eraser, Maximize2, Minimize2, RotateCw } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Button } from "../components/button";
import { Skeleton } from "../components/feedback";
import { StatusDot } from "../components/primitives";
import { useConsoleMessages } from "./messages";

export type TerminalState = "connecting" | "open" | "closed" | "error";

/** Byte/text pipe used instead of a WebSocket (tests, demos, custom protocols). */
export interface TerminalTransport {
  /** Subscribe to output from the remote side; returns an unsubscribe function. */
  onData(cb: (data: string | Uint8Array) => void): () => void;
  /** Send keystrokes to the remote side. */
  write(data: string): void;
  /** Optional lifecycle hook; call `cb("closed")` / `cb("error")` when the remote goes away. */
  onState?(cb: (state: TerminalState) => void): () => void;
  close?(): void;
}

export interface TerminalProps {
  /** WebSocket URL (ignored when `transport` is given). */
  url?: string;
  transport?: TerminalTransport;
  onClose?: (event?: { code?: number; reason?: string }) => void;
  onStateChange?: (state: TerminalState) => void;
  fontSize?: number;
  className?: string;
  /** Height of the terminal viewport; defaults to 20rem. */
  height?: string;
}

interface XTermLike {
  loadAddon(a: unknown): void;
  open(el: HTMLElement): void;
  write(d: string | Uint8Array): void;
  clear(): void;
  dispose(): void;
  getSelection(): string;
  onData(cb: (d: string) => void): { dispose(): void };
  options: Record<string, unknown>;
}

const token = (cs: CSSStyleDeclaration, name: string) => cs.getPropertyValue(name).trim() || undefined;

function themeFrom(el: HTMLElement) {
  const cs = getComputedStyle(el);
  return {
    background: token(cs, "--bg-menu"),
    foreground: token(cs, "--text"),
    cursor: token(cs, "--primary"),
    selectionBackground: token(cs, "--primary-glow"),
    red: token(cs, "--error"),
    green: token(cs, "--success"),
    yellow: token(cs, "--warning"),
    blue: token(cs, "--primary"),
  };
}

const tone = { connecting: "warn", open: "ok", closed: "neutral", error: "danger" } as const;

export function Terminal({ url, transport, onClose, onStateChange, fontSize = 13, className, height = "20rem" }: TerminalProps) {
  const l = useConsoleMessages().terminal;
  const root = React.useRef<HTMLDivElement>(null);
  const host = React.useRef<HTMLDivElement>(null);
  const [term, setTerm] = React.useState<XTermLike | null>(null);
  const [state, setStateRaw] = React.useState<TerminalState>("connecting");
  const [attempt, setAttempt] = React.useState(0);
  const [full, setFull] = React.useState(false);
  const cbs = React.useRef({ onClose, onStateChange });
  cbs.current = { onClose, onStateChange };

  const setState = React.useCallback((s: TerminalState) => {
    setStateRaw(s);
    cbs.current.onStateChange?.(s);
  }, []);

  // Lazy-load xterm and mount it; it is not needed (nor bundled) until the component renders.
  React.useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("@xterm/xterm"), import("@xterm/addon-fit")]).then(([x, f]) => {
      const el = host.current;
      if (disposed || !el) return;
      const t = new x.Terminal({ fontSize, cursorBlink: true, convertEol: true, theme: themeFrom(el), fontFamily: "ui-monospace, monospace" }) as unknown as XTermLike;
      const fit = new f.FitAddon();
      t.loadAddon(fit);
      try {
        t.open(el);
      } catch {
        t.dispose();
        setState("error");
        return;
      }
      const doFit = () => {
        try {
          fit.fit();
        } catch {
          /* hidden or zero-sized container */
        }
      };
      doFit();
      const ro = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(doFit);
      ro?.observe(el);
      cleanup = () => {
        ro?.disconnect();
        t.dispose();
      };
      setTerm(t);
    }).catch(() => {
      if (!disposed) setState("error");
    });
    return () => {
      disposed = true;
      cleanup();
      setTerm(null);
    };
  }, [fontSize]);

  // Re-read the tokens when the theme class/attributes on <html> change.
  React.useEffect(() => {
    if (!term || !host.current || typeof MutationObserver === "undefined") return;
    const mo = new MutationObserver(() => {
      if (host.current) term.options.theme = themeFrom(host.current);
    });
    mo.observe(document.documentElement, { attributes: true });
    return () => mo.disconnect();
  }, [term]);

  React.useEffect(() => {
    if (!term) return;
    setState("connecting");
    let ws: WebSocket | undefined;
    let write: (d: string) => void = () => {};
    const subs: (() => void)[] = [];
    const input = term.onData((d) => write(d));
    if (transport) {
      subs.push(transport.onData((d) => term.write(d)));
      if (transport.onState) subs.push(transport.onState((s) => (setState(s), s === "closed" && cbs.current.onClose?.())));
      write = (d) => transport.write(d);
      setState("open");
    } else if (url) {
      ws = new WebSocket(url);
      ws.binaryType = "arraybuffer";
      ws.onopen = () => setState("open");
      ws.onmessage = (e) => term.write(typeof e.data === "string" ? e.data : new Uint8Array(e.data as ArrayBuffer));
      ws.onerror = () => setState("error");
      ws.onclose = (e) => {
        setStateRaw((s) => (s === "error" ? s : "closed"));
        cbs.current.onStateChange?.("closed");
        cbs.current.onClose?.({ code: e.code, reason: e.reason });
      };
      const sock = ws;
      write = (d) => sock.readyState === 1 && sock.send(d);
    } else {
      setState("closed");
    }
    return () => {
      input.dispose();
      for (const u of subs) u();
      if (ws) {
        ws.onclose = ws.onerror = ws.onmessage = ws.onopen = null;
        ws.close();
      }
    };
  }, [term, url, transport, attempt, setState]);

  React.useEffect(() => {
    const on = () => setFull(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", on);
    return () => document.removeEventListener("fullscreenchange", on);
  }, []);

  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void root.current?.requestFullscreen?.();
  };
  const copy = () => {
    const s = term?.getSelection();
    if (s) void navigator.clipboard?.writeText(s);
  };

  return (
    <div ref={root} className={cn("flex flex-col overflow-hidden rounded-md border border-line bg-menu", className)}>
      <div role="toolbar" aria-label={l.toolbar} className="flex flex-wrap items-center gap-2 border-b border-line px-3 py-1.5">
        <span role="status">
          <StatusDot tone={tone[state]} pulse={state === "connecting"} label={l[state]} />
        </span>
        {(state === "closed" || state === "error") && (
          <Button size="sm" variant="secondary" leftIcon={<RotateCw aria-hidden />} onClick={() => setAttempt((n) => n + 1)}>
            {l.reconnect}
          </Button>
        )}
        <div className="ms-auto flex items-center gap-1">
          <Button size="sm" variant="ghost" leftIcon={<Copy aria-hidden />} disabled={!term} onClick={copy}>
            {l.copy}
          </Button>
          <Button size="sm" variant="ghost" leftIcon={<Eraser aria-hidden />} disabled={!term} onClick={() => term?.clear()}>
            {l.clear}
          </Button>
          <Button size="sm" variant="ghost" aria-pressed={full} leftIcon={full ? <Minimize2 aria-hidden /> : <Maximize2 aria-hidden />} onClick={toggleFull}>
            {full ? l.exitFullscreen : l.fullscreen}
          </Button>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 p-2" style={{ height: full ? undefined : height }}>
        <div ref={host} role="group" aria-label={l.terminal} className="size-full" />
        {!term && (
          <div role="status" aria-label={l.loading} className="absolute inset-2 grid content-start gap-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        )}
      </div>
    </div>
  );
}
