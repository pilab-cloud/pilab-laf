import { ConsoleFrame } from './chunk-AUBFJ3N2.js';
import { StatusDot, Skeleton, Dialog, DialogContent, Textarea } from './chunk-GG3HQY6A.js';
import './chunk-S3G7Q24I.js';
import { Button } from './chunk-2O5Y6D5F.js';
import './chunk-ZV7VBOGZ.js';
import { useLaf } from './chunk-IIQMUFUD.js';
import { cn } from './chunk-3TRXGDSZ.js';
import { RotateCw, Copy, Eraser, Minimize2, Maximize2 } from 'lucide-react';
import * as React3 from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

// lib/messages/console.en.ts
var consoleEn = {
  terminal: {
    terminal: "Terminal",
    toolbar: "Terminal actions",
    connecting: "Connecting",
    open: "Connected",
    closed: "Disconnected",
    error: "Connection error",
    reconnect: "Reconnect",
    copy: "Copy selection",
    clear: "Clear",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit fullscreen",
    loading: "Loading terminal"
  },
  vnc: {
    console: "Remote console",
    viewOnly: "View only",
    interactive: "Interactive",
    paste: "Paste to remote",
    pasteDialog: "Paste text to send to the remote clipboard",
    pastePlaceholder: "Text to send",
    send: "Send",
    cancel: "Cancel",
    credentialsRequired: "Credentials required",
    loadError: "Could not load the console",
    extraTools: "Console input tools"
  }
};

// lib/console/messages.ts
function useConsoleMessages() {
  const over = useLaf().t.components.console;
  return React3.useMemo(() => ({ terminal: { ...consoleEn.terminal, ...over?.terminal }, vnc: { ...consoleEn.vnc, ...over?.vnc } }), [over]);
}
var token = (cs, name) => cs.getPropertyValue(name).trim() || void 0;
function themeFrom(el) {
  const cs = getComputedStyle(el);
  return {
    background: token(cs, "--bg-menu"),
    foreground: token(cs, "--text"),
    cursor: token(cs, "--primary"),
    selectionBackground: token(cs, "--primary-glow"),
    red: token(cs, "--error"),
    green: token(cs, "--success"),
    yellow: token(cs, "--warning"),
    blue: token(cs, "--primary")
  };
}
var tone = { connecting: "warn", open: "ok", closed: "neutral", error: "danger" };
function Terminal({ url, transport, onClose, onStateChange, fontSize = 13, className, height = "20rem" }) {
  const l = useConsoleMessages().terminal;
  const root = React3.useRef(null);
  const host = React3.useRef(null);
  const [term, setTerm] = React3.useState(null);
  const [state, setStateRaw] = React3.useState("connecting");
  const [attempt, setAttempt] = React3.useState(0);
  const [full, setFull] = React3.useState(false);
  const cbs = React3.useRef({ onClose, onStateChange });
  cbs.current = { onClose, onStateChange };
  const setState = React3.useCallback((s) => {
    setStateRaw(s);
    cbs.current.onStateChange?.(s);
  }, []);
  React3.useEffect(() => {
    let disposed = false;
    let cleanup = () => {
    };
    void Promise.all([import('@xterm/xterm'), import('@xterm/addon-fit')]).then(([x, f]) => {
      const el = host.current;
      if (disposed || !el) return;
      const t = new x.Terminal({ fontSize, cursorBlink: true, convertEol: true, theme: themeFrom(el), fontFamily: "ui-monospace, monospace" });
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
        }
      };
      doFit();
      const ro = typeof ResizeObserver === "undefined" ? void 0 : new ResizeObserver(doFit);
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
  React3.useEffect(() => {
    if (!term || !host.current || typeof MutationObserver === "undefined") return;
    const mo = new MutationObserver(() => {
      if (host.current) term.options.theme = themeFrom(host.current);
    });
    mo.observe(document.documentElement, { attributes: true });
    return () => mo.disconnect();
  }, [term]);
  React3.useEffect(() => {
    if (!term) return;
    setState("connecting");
    let ws;
    let write = () => {
    };
    const subs = [];
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
      ws.onmessage = (e) => term.write(typeof e.data === "string" ? e.data : new Uint8Array(e.data));
      ws.onerror = () => setState("error");
      ws.onclose = (e) => {
        setStateRaw((s) => s === "error" ? s : "closed");
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
  React3.useEffect(() => {
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
  return /* @__PURE__ */ jsxs("div", { ref: root, className: cn("flex flex-col overflow-hidden rounded-md border border-line bg-menu", className), children: [
    /* @__PURE__ */ jsxs("div", { role: "toolbar", "aria-label": l.toolbar, className: "flex flex-wrap items-center gap-2 border-b border-line px-3 py-1.5", children: [
      /* @__PURE__ */ jsx("span", { role: "status", children: /* @__PURE__ */ jsx(StatusDot, { tone: tone[state], pulse: state === "connecting", label: l[state] }) }),
      (state === "closed" || state === "error") && /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", leftIcon: /* @__PURE__ */ jsx(RotateCw, { "aria-hidden": true }), onClick: () => setAttempt((n) => n + 1), children: l.reconnect }),
      /* @__PURE__ */ jsxs("div", { className: "ms-auto flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", leftIcon: /* @__PURE__ */ jsx(Copy, { "aria-hidden": true }), disabled: !term, onClick: copy, children: l.copy }),
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", leftIcon: /* @__PURE__ */ jsx(Eraser, { "aria-hidden": true }), disabled: !term, onClick: () => term?.clear(), children: l.clear }),
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", "aria-pressed": full, leftIcon: full ? /* @__PURE__ */ jsx(Minimize2, { "aria-hidden": true }) : /* @__PURE__ */ jsx(Maximize2, { "aria-hidden": true }), onClick: toggleFull, children: full ? l.exitFullscreen : l.fullscreen })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative min-h-0 flex-1 p-2", style: { height: full ? void 0 : height }, children: [
      /* @__PURE__ */ jsx("div", { ref: host, role: "group", "aria-label": l.terminal, className: "size-full" }),
      !term && /* @__PURE__ */ jsxs("div", { role: "status", "aria-label": l.loading, className: "absolute inset-2 grid content-start gap-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/3" })
      ] })
    ] })
  ] });
}
var defaultLoader = () => import('@novnc/novnc');
function VncConsole({ url, password, username, viewOnly: viewOnlyProp = false, scaleViewport = true, clipViewport = false, onStatusChange, loadRfb = defaultLoader, frameProps, className }) {
  const l = useConsoleMessages().vnc;
  const target = React3.useRef(null);
  const rfb = React3.useRef(null);
  const [status, setStatusRaw] = React3.useState("disconnected");
  const [error, setError] = React3.useState();
  const [attempt, setAttempt] = React3.useState(0);
  const [wantConnected, setWantConnected] = React3.useState(true);
  const [scale, setScale] = React3.useState(scaleViewport ? "fit" : "actual");
  const [viewOnly, setViewOnly] = React3.useState(viewOnlyProp);
  const [pasteOpen, setPasteOpen] = React3.useState(false);
  const [pasteText, setPasteText] = React3.useState("");
  const cb = React3.useRef(onStatusChange);
  cb.current = onStatusChange;
  const live = React3.useRef({ viewOnly, scale, clipViewport });
  live.current = { viewOnly, scale, clipViewport };
  const creds = React3.useRef({ password, username });
  creds.current = { password, username };
  const setStatus = React3.useCallback((s) => {
    setStatusRaw(s);
    cb.current?.(s);
  }, []);
  React3.useEffect(() => {
    const el = target.current;
    if (!url || !wantConnected || !el) {
      setStatus("disconnected");
      return;
    }
    let disposed = false;
    let inst = null;
    setStatus("connecting");
    setError(void 0);
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
          if (p !== void 0) inst?.sendCredentials?.({ password: p, username: u });
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
      }
    );
    return () => {
      disposed = true;
      rfb.current = null;
      try {
        inst?.disconnect();
      } catch {
      }
    };
  }, [url, attempt, wantConnected, loadRfb, setStatus, l.loadError, l.credentialsRequired]);
  React3.useEffect(() => {
    if (rfb.current) rfb.current.scaleViewport = scale === "fit";
  }, [scale]);
  React3.useEffect(() => {
    if (rfb.current) rfb.current.viewOnly = viewOnly;
  }, [viewOnly]);
  React3.useEffect(() => {
    if (rfb.current) rfb.current.clipViewport = clipViewport;
  }, [clipViewport]);
  const live_ = status === "connected";
  const send = () => {
    rfb.current?.clipboardPasteFrom?.(pasteText);
    setPasteOpen(false);
    setPasteText("");
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("grid gap-2", className), children: [
    /* @__PURE__ */ jsx(
      ConsoleFrame,
      {
        status,
        errorMessage: error,
        scale,
        onScaleChange: setScale,
        onSendKeys: (id) => id === "ctrl-alt-del" && rfb.current?.sendCtrlAltDel(),
        onDisconnect: () => setWantConnected(false),
        onReconnect: () => (setWantConnected(true), setAttempt((n) => n + 1)),
        ...frameProps,
        children: /* @__PURE__ */ jsx("div", { ref: target, className: "size-full" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { role: "toolbar", "aria-label": l.extraTools, className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", "aria-pressed": viewOnly, onClick: () => setViewOnly((v) => !v), children: viewOnly ? l.interactive : l.viewOnly }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", disabled: !live_ || viewOnly, onClick: () => setPasteOpen(true), children: l.paste })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: pasteOpen, onOpenChange: setPasteOpen, children: /* @__PURE__ */ jsx(
      DialogContent,
      {
        title: l.paste,
        size: "sm",
        footer: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => setPasteOpen(false), children: l.cancel }),
          /* @__PURE__ */ jsx(Button, { onClick: send, disabled: !pasteText, children: l.send })
        ] }),
        children: /* @__PURE__ */ jsx(Textarea, { "aria-label": l.pasteDialog, placeholder: l.pastePlaceholder, value: pasteText, onChange: (e) => setPasteText(e.target.value) })
      }
    ) })
  ] });
}

export { Terminal, VncConsole };
//# sourceMappingURL=console.js.map
//# sourceMappingURL=console.js.map