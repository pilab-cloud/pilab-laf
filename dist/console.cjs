'use strict';

var chunkPJNERQD3_cjs = require('./chunk-PJNERQD3.cjs');
var chunkRVZRTG5N_cjs = require('./chunk-RVZRTG5N.cjs');
require('./chunk-S4QID4TP.cjs');
var chunkIP6HZMS5_cjs = require('./chunk-IP6HZMS5.cjs');
require('./chunk-VUZVPUQ7.cjs');
var chunkQQA4GJXV_cjs = require('./chunk-QQA4GJXV.cjs');
var chunkFTHFEMX6_cjs = require('./chunk-FTHFEMX6.cjs');
var lucideReact = require('lucide-react');
var React3 = require('react');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React3__namespace = /*#__PURE__*/_interopNamespace(React3);

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
  const over = chunkQQA4GJXV_cjs.useLaf().t.components.console;
  return React3__namespace.useMemo(() => ({ terminal: { ...consoleEn.terminal, ...over?.terminal }, vnc: { ...consoleEn.vnc, ...over?.vnc } }), [over]);
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
  const root = React3__namespace.useRef(null);
  const host = React3__namespace.useRef(null);
  const [term, setTerm] = React3__namespace.useState(null);
  const [state, setStateRaw] = React3__namespace.useState("connecting");
  const [attempt, setAttempt] = React3__namespace.useState(0);
  const [full, setFull] = React3__namespace.useState(false);
  const cbs = React3__namespace.useRef({ onClose, onStateChange });
  cbs.current = { onClose, onStateChange };
  const setState = React3__namespace.useCallback((s) => {
    setStateRaw(s);
    cbs.current.onStateChange?.(s);
  }, []);
  React3__namespace.useEffect(() => {
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
  React3__namespace.useEffect(() => {
    if (!term || !host.current || typeof MutationObserver === "undefined") return;
    const mo = new MutationObserver(() => {
      if (host.current) term.options.theme = themeFrom(host.current);
    });
    mo.observe(document.documentElement, { attributes: true });
    return () => mo.disconnect();
  }, [term]);
  React3__namespace.useEffect(() => {
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
  React3__namespace.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: root, className: chunkFTHFEMX6_cjs.cn("flex flex-col overflow-hidden rounded-md border border-line bg-menu", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "toolbar", "aria-label": l.toolbar, className: "flex flex-wrap items-center gap-2 border-b border-line px-3 py-1.5", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { role: "status", children: /* @__PURE__ */ jsxRuntime.jsx(chunkRVZRTG5N_cjs.StatusDot, { tone: tone[state], pulse: state === "connecting", label: l[state] }) }),
      (state === "closed" || state === "error") && /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "secondary", leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RotateCw, { "aria-hidden": true }), onClick: () => setAttempt((n) => n + 1), children: l.reconnect }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "ms-auto flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Copy, { "aria-hidden": true }), disabled: !term, onClick: copy, children: l.copy }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", leftIcon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Eraser, { "aria-hidden": true }), disabled: !term, onClick: () => term?.clear(), children: l.clear }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", "aria-pressed": full, leftIcon: full ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Minimize2, { "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Maximize2, { "aria-hidden": true }), onClick: toggleFull, children: full ? l.exitFullscreen : l.fullscreen })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative min-h-0 flex-1 p-2", style: { height: full ? void 0 : height }, children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { ref: host, role: "group", "aria-label": l.terminal, className: "size-full" }),
      !term && /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "status", "aria-label": l.loading, className: "absolute inset-2 grid content-start gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(chunkRVZRTG5N_cjs.Skeleton, { className: "h-4 w-1/2" }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkRVZRTG5N_cjs.Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntime.jsx(chunkRVZRTG5N_cjs.Skeleton, { className: "h-4 w-1/3" })
      ] })
    ] })
  ] });
}
var defaultLoader = () => import('@novnc/novnc');
function VncConsole({ url, password, username, viewOnly: viewOnlyProp = false, scaleViewport = true, clipViewport = false, onStatusChange, loadRfb = defaultLoader, frameProps, className }) {
  const l = useConsoleMessages().vnc;
  const target = React3__namespace.useRef(null);
  const rfb = React3__namespace.useRef(null);
  const [status, setStatusRaw] = React3__namespace.useState("disconnected");
  const [error, setError] = React3__namespace.useState();
  const [attempt, setAttempt] = React3__namespace.useState(0);
  const [wantConnected, setWantConnected] = React3__namespace.useState(true);
  const [scale, setScale] = React3__namespace.useState(scaleViewport ? "fit" : "actual");
  const [viewOnly, setViewOnly] = React3__namespace.useState(viewOnlyProp);
  const [pasteOpen, setPasteOpen] = React3__namespace.useState(false);
  const [pasteText, setPasteText] = React3__namespace.useState("");
  const cb = React3__namespace.useRef(onStatusChange);
  cb.current = onStatusChange;
  const live = React3__namespace.useRef({ viewOnly, scale, clipViewport });
  live.current = { viewOnly, scale, clipViewport };
  const creds = React3__namespace.useRef({ password, username });
  creds.current = { password, username };
  const setStatus = React3__namespace.useCallback((s) => {
    setStatusRaw(s);
    cb.current?.(s);
  }, []);
  React3__namespace.useEffect(() => {
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
  React3__namespace.useEffect(() => {
    if (rfb.current) rfb.current.scaleViewport = scale === "fit";
  }, [scale]);
  React3__namespace.useEffect(() => {
    if (rfb.current) rfb.current.viewOnly = viewOnly;
  }, [viewOnly]);
  React3__namespace.useEffect(() => {
    if (rfb.current) rfb.current.clipViewport = clipViewport;
  }, [clipViewport]);
  const live_ = status === "connected";
  const send = () => {
    rfb.current?.clipboardPasteFrom?.(pasteText);
    setPasteOpen(false);
    setPasteText("");
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("grid gap-2", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      chunkPJNERQD3_cjs.ConsoleFrame,
      {
        status,
        errorMessage: error,
        scale,
        onScaleChange: setScale,
        onSendKeys: (id) => id === "ctrl-alt-del" && rfb.current?.sendCtrlAltDel(),
        onDisconnect: () => setWantConnected(false),
        onReconnect: () => (setWantConnected(true), setAttempt((n) => n + 1)),
        ...frameProps,
        children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref: target, className: "size-full" })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "toolbar", "aria-label": l.extraTools, className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", "aria-pressed": viewOnly, onClick: () => setViewOnly((v) => !v), children: viewOnly ? l.interactive : l.viewOnly }),
      /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", disabled: !live_ || viewOnly, onClick: () => setPasteOpen(true), children: l.paste })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(chunkRVZRTG5N_cjs.Dialog, { open: pasteOpen, onOpenChange: setPasteOpen, children: /* @__PURE__ */ jsxRuntime.jsx(
      chunkRVZRTG5N_cjs.DialogContent,
      {
        title: l.paste,
        size: "sm",
        footer: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { variant: "ghost", onClick: () => setPasteOpen(false), children: l.cancel }),
          /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { onClick: send, disabled: !pasteText, children: l.send })
        ] }),
        children: /* @__PURE__ */ jsxRuntime.jsx(chunkRVZRTG5N_cjs.Textarea, { "aria-label": l.pasteDialog, placeholder: l.pastePlaceholder, value: pasteText, onChange: (e) => setPasteText(e.target.value) })
      }
    ) })
  ] });
}

exports.Terminal = Terminal;
exports.VncConsole = VncConsole;
//# sourceMappingURL=console.cjs.map
//# sourceMappingURL=console.cjs.map