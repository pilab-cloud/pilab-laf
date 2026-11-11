import * as React from "react";
import { createFormatters, type Formatters } from "./foundation-format";
import type { accountEn } from "./messages/account.en";
import type { adminEn } from "./messages/admin.en";
import type { chartsEn } from "./messages/charts.en";
import type { contentEn } from "./messages/content.en";
import type { trackerEn } from "./messages/tracker.en";
import type { uiEn } from "./messages/ui.en";
import type { vsphereObjectsEn } from "./messages/vsphere-objects.en";

/**
 * Per-domain label groups for the heavier components. English defaults live in `lib/messages/*.en.ts` and are
 * imported by the components themselves (so they tree-shake with them); `hu` and other locales fill this in.
 */
export interface ComponentMessages {
  account: typeof accountEn;
  admin: typeof adminEn;
  tracker: typeof trackerEn;
  vsphereObjects: typeof vsphereObjectsEn;
  charts: typeof chartsEn;
  ui: typeof uiEn;
  content: typeof contentEn;
}
type Overrides<G> = { [S in keyof G]?: G[S] extends string ? string : Partial<G[S]> };
export type ComponentMessageOverrides = { [K in keyof ComponentMessages]?: Overrides<ComponentMessages[K]> };

export interface LafMessages {
  components: ComponentMessageOverrides;
  close: string;
  noResults: string;
  loading: string;
  search: string;
  commandPalette: string;
  command: string;
  commandPlaceholder: string;
  searchUsers: string;
  users: string;
  showPassword: string;
  hidePassword: string;
  capsLock: string;
  copy: string;
  copied: string;
  removeItem: (name: string) => string;
  removeRow: (n: number) => string;
  previousMonth: string;
  nextMonth: string;
  pagination: string;
  previousPage: string;
  nextPage: string;
  showing: (from: number, to: number, total: number) => string;
  pageOf: (page: number, count: number) => string;
  selectAllRows: string;
  selectRow: string;
  acknowledge: string;
  unsupportedType: (count: number) => string;
  exceedsSize: (count: number) => string;
  autoRefresh: string;
  oneTimeCode: string;
  copyCode: string;
  language: string;
  chooseDate: string;
  datePlaceholder: string;
  /** Monday-first short weekday names. */
  weekdaysShort: string[];
  breadcrumb: string;
  showHiddenLevels: (n: number) => string;
  dismiss: string;
  resizePanels: string;
  increase: (label: string) => string;
  decrease: (label: string) => string;
  unitOf: (label: string) => string;
  value: string;
  add: string;
  key: string;
  duplicateKey: string;
  timeRange: string;
  off: string;
  wrap: string;
  noLines: string;
  tenant: string;
  permission: string;
  /** Five password strength levels, weakest first. */
  passwordStrength: string[];
  passwordMismatch: string;
  cancel: string;
  retry: string;
  typeToConfirm: string;
  nothingHere: string;
  noRecentTasks: string;
  recentTasks: string;
  signOut: string;
  dropFiles: string;
  noActiveAlarms: string;
  vsCollapsePane: string;
  vsExpandPane: string;
  vsSummary: string;
  vsMonitor: string;
  vsConfigure: string;
  vsUsed: string;
  vsReserved: string;
  vsFree: string;
  vsCapacity: string;
  vsFilterAll: string;
  vsFilterMine: string;
  vsStatusFilter: string;
  vsDetails: string;
  vsResetAlarm: string;
  vsSelectAlarm: string;
  vsAcknowledgeSelected: string;
  vsOpenTarget: string;
  vsInventoryTree: string;
  vsRecentTasks: string;
  vsSelectAllAlarms: string;
  vsDuration: string;
  fixFollowing: string;
  moreTabs: string;
  next: string;
  back: string;
  finish: string;
  minimum: string;
  maximum: string;
  edit: string;
  stateOn: string;
  stateOff: string;
  stateSuspended: string;
  stateMaintenance: string;
  stateDisconnected: string;
  stateWarning: string;
  stateError: string;
  mfaMethod: string;
  mfaScan: string;
  mfaVerify: string;
  mfaRecovery: string;
  mfaTotp: string;
  mfaPasskey: string;
  mfaInvalid: string;
  mfaPasskeyWaiting: string;
  mfaPasskeyFailed: string;
  mfaStored: string;
  manualSecret: string;
  addedToApp: string;
  editorWrite: string;
  editorPreview: string;
  editorToolbar: string;
  editorBold: string;
  editorItalic: string;
  editorCode: string;
  editorLink: string;
  editorList: string;
  editorTaskList: string;
  editorQuote: string;
  editorUploading: string;
  editorNothingToPreview: string;
  editorMentions: string;
  editorCodeEditor: string;
  editorMarkdownEditor: string;
  editorProblem: string;
  recent: string;
  shortcuts: string;
  noShortcuts: string;
  dragHandle: (name: string) => string;
  dndInstructions: string;
  dndLifted: (name: string, pos: number, total: number) => string;
  dndMoved: (name: string, pos: number, total: number) => string;
  dndMovedTo: (name: string, column: string, pos: number, total: number) => string;
  dndDropped: (name: string, pos: number, total: number) => string;
  dndDroppedTo: (name: string, column: string, pos: number, total: number) => string;
  dndCancelled: (name: string) => string;
  wipLimit: (count: number, limit: number) => string;
  emptyColumn: string;
  customRange: string;
  rangeFrom: string;
  rangeTo: string;
  applyRange: string;
  timeOfDay: string;
}

export const en: LafMessages = {
  components: {},
  close: "Close",
  noResults: "No results",
  loading: "Loading",
  search: "Search",
  commandPalette: "Command palette",
  command: "Command",
  commandPlaceholder: "Type a command…",
  searchUsers: "Search users…",
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
  showing: (from, to, total) => `Showing ${from}–${to} of ${total}`,
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
  mfaPasskeyWaiting: "Waiting for your authenticator…",
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
  customRange: "Custom…",
  rangeFrom: "From",
  rangeTo: "To",
  applyRange: "Apply",
  timeOfDay: "Time",
};

export interface LafContextValue {
  locale: string;
  timeZone: string;
  /** Message catalogue: strings and formatting functions, keyed by `LafMessages`. */
  t: LafMessages;
  format: Formatters;
  portalContainer?: HTMLElement;
}

const browserTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
};

const defaultValue: LafContextValue = { locale: "en", timeZone: /* @__PURE__ */ browserTimeZone(), t: en, format: /* @__PURE__ */ createFormatters({ locale: "en" }) };
const LafContext = React.createContext<LafContextValue>(defaultValue);

export function LafProvider({
  locale = "en",
  messages,
  timeZone,
  portalContainer,
  children,
}: {
  /** BCP-47 tag; drives `Intl` formatting. */
  locale?: string;
  /** Partial overrides on top of the English catalogue, e.g. `hu` from `@pilab/laf/locales/hu`. */
  messages?: Partial<LafMessages>;
  /** IANA time zone; defaults to the browser's. */
  timeZone?: string;
  /** Overlays (dialogs, popovers, menus) portal here, e.g. inside a shadow root or iframe. */
  portalContainer?: HTMLElement;
  children: React.ReactNode;
}) {
  const value = React.useMemo<LafContextValue>(() => {
    const tz = timeZone ?? browserTimeZone();
    return { locale, timeZone: tz, t: { ...en, ...messages }, format: createFormatters({ locale, timeZone: tz }), portalContainer };
  }, [locale, messages, timeZone, portalContainer]);
  return <LafContext.Provider value={value}>{children}</LafContext.Provider>;
}

export function useLaf(): LafContextValue {
  return React.useContext(LafContext);
}

/**
 * `useLaf()` whose `t.components` is complete for the given groups: the component's bundled English defaults
 * overlaid with whatever the active locale provides (merged one level deep, e.g. per label set).
 */
export function useLafDefaults<K extends keyof ComponentMessages>(defaults: Pick<ComponentMessages, K>): Omit<LafContextValue, "t"> & { t: Omit<LafMessages, "components"> & { components: Pick<ComponentMessages, K> } } {
  const ctx = useLaf();
  const over = ctx.t.components;
  return React.useMemo(() => {
    const components: Record<string, Record<string, unknown>> = {};
    for (const [group, sets] of Object.entries(defaults) as [string, Record<string, unknown>][]) {
      const o = (over as Record<string, Record<string, unknown> | undefined>)[group];
      components[group] = Object.fromEntries(Object.entries(sets).map(([k, v]) => [k, v !== null && typeof v === "object" ? { ...v, ...(o?.[k] as object) } : (o?.[k] ?? v)]));
    }
    return { ...ctx, t: { ...ctx.t, components } } as never;
  }, [ctx, over, defaults]);
}

/** Container for Radix `Portal`s; `undefined` means document.body. */
export function usePortalContainer(): HTMLElement | undefined {
  return React.useContext(LafContext).portalContainer;
}
