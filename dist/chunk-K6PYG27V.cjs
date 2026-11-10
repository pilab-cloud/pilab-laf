'use strict';

var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var React = require('react');
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

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

// lib/foundation-format.ts
var LEGACY = ["B", "KB", "MB", "GB", "TB", "PB"];
var IEC = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
var SI = ["B", "kB", "MB", "GB", "TB", "PB"];
function scale(n, base, units) {
  let i = 0;
  let v = n;
  while (Math.abs(v) >= base && i < units.length - 1) {
    v /= base;
    i++;
  }
  return { v, unit: units[i], i };
}
var toDate = (d) => d instanceof Date ? d : new Date(d);
function createFormatters(defaults = {}) {
  const num = (locale, o) => new Intl.NumberFormat(locale ?? defaults.locale, o);
  const pick = (v, i, locale, max) => num(locale, { maximumFractionDigits: max ?? (i === 0 ? 0 : Math.abs(v) < 10 ? 1 : 0) }).format(v);
  return {
    bytes(n, opts) {
      const o = typeof opts === "string" ? { locale: opts } : opts ?? {};
      const base = o.base ?? 1024;
      const { v, unit, i } = scale(n, base, o.base === 1024 ? IEC : o.base === 1e3 ? SI : LEGACY);
      const max = o.maximumFractionDigits ?? (o.base === 1e3 && i > 0 && Math.abs(v) < 10 ? 2 : void 0);
      return `${pick(v, i, o.locale, max)} ${unit}`;
    },
    bitrate(n, o) {
      const { v, unit, i } = scale(n, 1e3, ["bit/s", "kbit/s", "Mbit/s", "Gbit/s", "Tbit/s"]);
      return `${pick(v, i, o?.locale)} ${unit}`;
    },
    frequency(hz, o) {
      const { v, unit, i } = scale(hz, 1e3, ["Hz", "kHz", "MHz", "GHz", "THz"]);
      return `${pick(v, i, o?.locale)} ${unit}`;
    },
    duration(ms, o) {
      const total = Math.max(0, Math.round(ms / 1e3));
      const d = Math.floor(total / 86400);
      const h = Math.floor(total % 86400 / 3600);
      const m = Math.floor(total % 3600 / 60);
      const s = total % 60;
      if (o?.style === "clock") {
        const p = (x) => String(x).padStart(2, "0");
        return `${p(d * 24 + h)}:${p(m)}:${p(s)}`;
      }
      if (ms > 0 && ms < 1e3) return `${num(o?.locale).format(Math.round(ms))} ms`;
      const f = num(o?.locale);
      const parts = [[d, "d"], [h, "h"], [m, "min"], [s, "s"]].filter(([x]) => x > 0).slice(0, 2);
      return parts.length ? parts.map(([x, u]) => `${f.format(x)} ${u}`).join(" ") : `${f.format(0)} s`;
    },
    percent(ratio, o) {
      return num(o?.locale, { style: "percent", maximumFractionDigits: o?.fractionDigits ?? 0 }).format(ratio);
    },
    relative(date, o) {
      const now = o?.now === void 0 ? Date.now() : +toDate(o.now);
      const diff = (+toDate(date) - now) / 1e3;
      const steps = [["year", 31536e3], ["month", 2592e3], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
      const rtf = new Intl.RelativeTimeFormat(o?.locale ?? defaults.locale, { numeric: "auto" });
      for (const [unit, secs] of steps) if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
      return rtf.format(Math.round(diff), "second");
    },
    dateTime(date, o) {
      return new Intl.DateTimeFormat(o?.locale ?? defaults.locale, {
        dateStyle: o?.dateStyle ?? "medium",
        timeStyle: o?.timeStyle ?? "medium",
        timeZone: o?.utc ? "UTC" : o?.timeZone ?? defaults.timeZone
      }).format(toDate(date));
    }
  };
}
var en = {
  close: "Close",
  noResults: "No results",
  loading: "Loading",
  search: "Search",
  commandPalette: "Command palette",
  command: "Command",
  commandPlaceholder: "Type a command\u2026",
  searchUsers: "Search users\u2026",
  users: "Users",
  showPassword: "Show password",
  hidePassword: "Hide password",
  capsLock: "Caps Lock is on",
  copy: "Copy",
  copied: "Copied",
  removeItem: (name) => `Remove ${name}`,
  removeRow: (n) => `Remove row ${n}`,
  previousMonth: "Previous month",
  nextMonth: "Next month",
  pagination: "Pagination",
  previousPage: "Previous page",
  nextPage: "Next page",
  showing: (from, to, total) => `Showing ${from}\u2013${to} of ${total}`,
  pageOf: (page, count) => `Page ${page} of ${count}`,
  selectAllRows: "Select all rows",
  selectRow: "Select row",
  acknowledge: "Acknowledge",
  unsupportedType: (n) => `${n} file(s) have an unsupported type`,
  exceedsSize: (n) => `${n} file(s) exceed the size limit`,
  autoRefresh: "Auto refresh",
  oneTimeCode: "One-time code",
  copyCode: "Copy code",
  language: "Language",
  chooseDate: "Choose date",
  datePlaceholder: "yyyy-mm-dd",
  weekdaysShort: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  breadcrumb: "Breadcrumb",
  showHiddenLevels: (n) => `Show ${n} hidden levels`,
  dismiss: "Dismiss",
  resizePanels: "Resize panels",
  increase: (l) => `Increase ${l}`,
  decrease: (l) => `Decrease ${l}`,
  unitOf: (l) => `${l} unit`,
  value: "Value",
  add: "Add",
  key: "Key",
  duplicateKey: "Duplicate key",
  timeRange: "Time range",
  off: "off",
  wrap: "Wrap",
  noLines: "No lines",
  tenant: "Tenant",
  permission: "Permission",
  passwordStrength: ["Very weak", "Weak", "Fair", "Good", "Strong"],
  passwordMismatch: "Passwords do not match",
  cancel: "Cancel",
  retry: "Retry",
  typeToConfirm: "Type to confirm",
  nothingHere: "Nothing here",
  noRecentTasks: "No recent tasks",
  recentTasks: "Recent tasks",
  signOut: "Sign out",
  dropFiles: "Drop files here or click to browse",
  noActiveAlarms: "No active alarms",
  vsCollapsePane: "Collapse pane",
  vsExpandPane: "Expand pane",
  vsSummary: "Summary",
  vsMonitor: "Monitor",
  vsConfigure: "Configure",
  vsUsed: "used",
  vsReserved: "reserved",
  vsFree: "free",
  vsCapacity: "capacity",
  vsFilterAll: "All",
  vsFilterMine: "Mine",
  vsStatusFilter: "Status",
  vsDetails: "Details",
  vsResetAlarm: "Reset to green",
  vsSelectAlarm: "Select alarm",
  vsAcknowledgeSelected: "Acknowledge selected",
  vsOpenTarget: "Open target",
  vsInventoryTree: "Inventory",
  vsRecentTasks: "Recent tasks",
  vsSelectAllAlarms: "Select all alarms",
  vsDuration: "Duration",
  fixFollowing: "Fix the following",
  moreTabs: "More tabs",
  next: "Next",
  back: "Back",
  finish: "Finish",
  minimum: "minimum",
  maximum: "maximum",
  edit: "Edit",
  stateOn: "Powered on",
  stateOff: "Powered off",
  stateSuspended: "Suspended",
  stateMaintenance: "In maintenance",
  stateDisconnected: "Disconnected",
  stateWarning: "Warning",
  stateError: "Error",
  mfaMethod: "Choose method",
  mfaScan: "Scan code",
  mfaVerify: "Verify",
  mfaRecovery: "Recovery codes",
  mfaTotp: "Authenticator app",
  mfaPasskey: "Passkey",
  mfaInvalid: "That code is not valid. Try again.",
  mfaPasskeyWaiting: "Waiting for your authenticator\u2026",
  mfaPasskeyFailed: "Passkey registration failed.",
  mfaStored: "I stored these codes",
  manualSecret: "Manual secret",
  addedToApp: "I added it to my app",
  editorWrite: "Write",
  editorPreview: "Preview",
  editorToolbar: "Formatting",
  editorBold: "Bold",
  editorItalic: "Italic",
  editorCode: "Code",
  editorLink: "Link",
  editorList: "Bulleted list",
  editorTaskList: "Task list",
  editorQuote: "Quote",
  editorUploading: "Uploading",
  editorNothingToPreview: "Nothing to preview",
  editorMentions: "Suggestions",
  editorCodeEditor: "Code editor",
  editorMarkdownEditor: "Markdown editor",
  editorProblem: "Problem",
  recent: "Recent",
  shortcuts: "Keyboard shortcuts",
  noShortcuts: "No shortcuts registered",
  dragHandle: (name) => `Drag ${name}`,
  dndInstructions: "Press Space to lift, arrow keys to move, Space to drop, Escape to cancel.",
  dndLifted: (name, pos, total) => `Picked up ${name}, position ${pos} of ${total}.`,
  dndMoved: (name, pos, total) => `${name} moved to position ${pos} of ${total}.`,
  dndMovedTo: (name, column, pos, total) => `${name} moved to ${column}, position ${pos} of ${total}.`,
  dndDropped: (name, pos, total) => `${name} dropped at position ${pos} of ${total}.`,
  dndDroppedTo: (name, column, pos, total) => `${name} dropped in ${column}, position ${pos} of ${total}.`,
  dndCancelled: (name) => `Move of ${name} cancelled.`,
  wipLimit: (count, limit) => `${count} of ${limit} (limit)`,
  emptyColumn: "No cards",
  customRange: "Custom\u2026",
  rangeFrom: "From",
  rangeTo: "To",
  applyRange: "Apply",
  timeOfDay: "Time"
};
var browserTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
};
var defaultValue = { locale: "en", timeZone: /* @__PURE__ */ browserTimeZone(), t: en, format: /* @__PURE__ */ createFormatters({ locale: "en" }) };
var LafContext = React__namespace.createContext(defaultValue);
function LafProvider({
  locale = "en",
  messages,
  timeZone,
  portalContainer,
  children
}) {
  const value = React__namespace.useMemo(() => {
    const tz = timeZone ?? browserTimeZone();
    return { locale, timeZone: tz, t: { ...en, ...messages }, format: createFormatters({ locale, timeZone: tz }), portalContainer };
  }, [locale, messages, timeZone, portalContainer]);
  return /* @__PURE__ */ jsxRuntime.jsx(LafContext.Provider, { value, children });
}
function useLaf() {
  return React__namespace.useContext(LafContext);
}
function usePortalContainer() {
  return React__namespace.useContext(LafContext).portalContainer;
}

exports.LafProvider = LafProvider;
exports.cn = cn;
exports.createFormatters = createFormatters;
exports.en = en;
exports.useLaf = useLaf;
exports.usePortalContainer = usePortalContainer;
//# sourceMappingURL=chunk-K6PYG27V.cjs.map
//# sourceMappingURL=chunk-K6PYG27V.cjs.map