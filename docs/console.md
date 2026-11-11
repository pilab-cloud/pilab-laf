# Console entry (`@pilab/laf/console`)

Heavy, lazily-loaded engines live outside the core bundle. Optional peer dependencies: `@xterm/xterm` ^6,
`@xterm/addon-fit` (Terminal) and `@novnc/novnc` (VncConsole). Both are dynamic imports, so nothing loads until the
component renders; a Skeleton shows meanwhile. The entry itself is ~4 kB gzip.

**CSS:** tsup does not bundle the xterm stylesheet. Consumers must `import "@xterm/xterm/css/xterm.css"` once.

## `Terminal`
`<Terminal url="wss://…" />` or `<Terminal transport={t} />` where `t` is `{ onData(cb) → unsubscribe, write(d), onState?(cb), close? }`
(used for tests/demos). Fits its container (ResizeObserver + FitAddon); theme is read from the CSS tokens
(`--bg-menu`, `--text`, `--primary`, …) and refreshed when `<html>` attributes change. Toolbar: status badge
(connecting/open/closed/error), Reconnect (when closed/error), copy selection, clear, fullscreen. Props: `onClose`,
`onStateChange`, `fontSize`, `height`.

## `VncConsole`
Wraps noVNC `RFB` inside the existing `ConsoleFrame` (status, Ctrl-Alt-Del, fit/actual scale, fullscreen,
disconnect/reconnect) plus a second toolbar with view-only toggle and paste-to-remote clipboard. Props: `url`, `password`,
`username`, `viewOnly`, `scaleViewport`, `clipViewport`, `onStatusChange`, `frameProps`, and `loadRfb` to replace the
lazy `import("@novnc/novnc")` (custom build, tests, demo fake). Without `url` it stays disconnected.

## i18n
Strings come from `t.components.console` (`lib/messages/console.en.ts`, `lib/locales/console.hu.ts`); English defaults
apply until the group is registered in the locale.

Demo: `?demo=console`. Tests: `tests/console.test.tsx` (xterm mocked; RFB supplied via `loadRfb`).

## Bundler note

`@novnc/novnc` uses top-level `await`. With Vite set `build.target: "esnext"` and `optimizeDeps.esbuildOptions.target: "esnext"`.
