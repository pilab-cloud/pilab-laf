import * as React from "react";
import { cn } from "../cn";
import { Button } from "../components/button";
import { type ConsoleStatus, ConsoleFrame, type ConsoleFrameProps } from "../components/vsphere-objects";
import { Dialog, DialogContent } from "../components/overlay";
import { Textarea } from "../components/form";
import { useConsoleMessages } from "./messages";

/** The subset of the noVNC `RFB` instance this wrapper drives. */
export interface RfbInstance {
  viewOnly: boolean;
  scaleViewport: boolean;
  clipViewport: boolean;
  addEventListener(type: string, cb: (e: CustomEvent) => void): void;
  removeEventListener?(type: string, cb: (e: CustomEvent) => void): void;
  disconnect(): void;
  sendCtrlAltDel(): void;
  sendKey?(keysym: number, code: string | null, down?: boolean): void;
  sendCredentials?(c: { username?: string; password?: string }): void;
  clipboardPasteFrom?(text: string): void;
  toBlob?(cb: (b: Blob | null) => void, type?: string): void;
}
export type RfbConstructor = new (target: HTMLElement, urlOrChannel: string | WebSocket, options?: Record<string, unknown>) => RfbInstance;
export type RfbLoader = () => Promise<{ default: RfbConstructor }>;

export interface VncConsoleProps {
  url?: string;
  password?: string;
  username?: string;
  viewOnly?: boolean;
  scaleViewport?: boolean;
  clipViewport?: boolean;
  onStatusChange?: (status: ConsoleStatus) => void;
  /** Replace the lazy `@novnc/novnc` import (custom builds, tests, demos). */
  loadRfb?: RfbLoader;
  /** Forwarded to the surrounding ConsoleFrame (e.g. `keyCombos`, `labels`). */
  frameProps?: Pick<ConsoleFrameProps, "keyCombos" | "labels">;
  className?: string;
}

const defaultLoader: RfbLoader = () => import("@novnc/novnc");

export function VncConsole({ url, password, username, viewOnly: viewOnlyProp = false, scaleViewport = true, clipViewport = false, onStatusChange, loadRfb = defaultLoader, frameProps, className }: VncConsoleProps) {
  const l = useConsoleMessages().vnc;
  const target = React.useRef<HTMLDivElement>(null);
  const rfb = React.useRef<RfbInstance | null>(null);
  const [status, setStatusRaw] = React.useState<ConsoleStatus>("disconnected");
  const [error, setError] = React.useState<string>();
  const [attempt, setAttempt] = React.useState(0);
  const [wantConnected, setWantConnected] = React.useState(true);
  const [scale, setScale] = React.useState<"fit" | "actual">(scaleViewport ? "fit" : "actual");
  const [viewOnly, setViewOnly] = React.useState(viewOnlyProp);
  const [pasteOpen, setPasteOpen] = React.useState(false);
  const [pasteText, setPasteText] = React.useState("");
  const cb = React.useRef(onStatusChange);
  cb.current = onStatusChange;
  const live = React.useRef({ viewOnly, scale, clipViewport });
  live.current = { viewOnly, scale, clipViewport };
  const creds = React.useRef({ password, username });
  creds.current = { password, username };

  const setStatus = React.useCallback((s: ConsoleStatus) => {
    setStatusRaw(s);
    cb.current?.(s);
  }, []);

  React.useEffect(() => {
    const el = target.current;
    if (!url || !wantConnected || !el) {
      setStatus("disconnected");
      return;
    }
    let disposed = false;
    let inst: RfbInstance | null = null;
    setStatus("connecting");
    setError(undefined);
    loadRfb().then(
      ({ default: RFB }) => {
        if (disposed) return;
        const { password: pw, username: un } = creds.current;
        inst = new RFB(el, url, { credentials: { password: pw, username: un } });
        inst.viewOnly = live.current.viewOnly;
        inst.scaleViewport = live.current.scale === "fit";
        inst.clipViewport = live.current.clipViewport;
        inst.addEventListener("connect", () => setStatus("connected"));
        inst.addEventListener("disconnect", (e) => setStatus(e.detail?.clean === false ? "error" : "disconnected"));
        inst.addEventListener("securityfailure", (e) => {
          setError(String(e.detail?.reason ?? ""));
          setStatus("error");
        });
        inst.addEventListener("credentialsrequired", () => {
          const { password: p, username: u } = creds.current;
          if (p !== undefined) inst?.sendCredentials?.({ password: p, username: u });
          else {
            setError(l.credentialsRequired);
            setStatus("error");
          }
        });
        rfb.current = inst;
      },
      () => {
        if (disposed) return;
        setError(l.loadError);
        setStatus("error");
      },
    );
    return () => {
      disposed = true;
      rfb.current = null;
      try {
        inst?.disconnect();
      } catch {
        /* already closed */
      }
    };
    // Credentials, view mode and scaling are applied live; only the connection identity restarts the session.
  }, [url, attempt, wantConnected, loadRfb, setStatus, l.loadError, l.credentialsRequired]);

  React.useEffect(() => {
    if (rfb.current) rfb.current.scaleViewport = scale === "fit";
  }, [scale]);
  React.useEffect(() => {
    if (rfb.current) rfb.current.viewOnly = viewOnly;
  }, [viewOnly]);
  React.useEffect(() => {
    if (rfb.current) rfb.current.clipViewport = clipViewport;
  }, [clipViewport]);

  const live_ = status === "connected";
  const send = () => {
    rfb.current?.clipboardPasteFrom?.(pasteText);
    setPasteOpen(false);
    setPasteText("");
  };
  return (
    <div className={cn("grid gap-2", className)}>
      <ConsoleFrame
        status={status}
        errorMessage={error}
        scale={scale}
        onScaleChange={setScale}
        onSendKeys={(id) => id === "ctrl-alt-del" && rfb.current?.sendCtrlAltDel()}
        onDisconnect={() => setWantConnected(false)}
        onReconnect={() => (setWantConnected(true), setAttempt((n) => n + 1))}
        {...frameProps}
      >
        <div ref={target} className="size-full" />
      </ConsoleFrame>
      <div role="toolbar" aria-label={l.extraTools} className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="ghost" aria-pressed={viewOnly} onClick={() => setViewOnly((v) => !v)}>
          {viewOnly ? l.interactive : l.viewOnly}
        </Button>
        <Button size="sm" variant="ghost" disabled={!live_ || viewOnly} onClick={() => setPasteOpen(true)}>
          {l.paste}
        </Button>
      </div>
      <Dialog open={pasteOpen} onOpenChange={setPasteOpen}>
        <DialogContent
          title={l.paste}
          size="sm"
          footer={
            <>
              <Button variant="ghost" onClick={() => setPasteOpen(false)}>
                {l.cancel}
              </Button>
              <Button onClick={send} disabled={!pasteText}>
                {l.send}
              </Button>
            </>
          }
        >
          <Textarea aria-label={l.pasteDialog} placeholder={l.pastePlaceholder} value={pasteText} onChange={(e) => setPasteText(e.target.value)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
