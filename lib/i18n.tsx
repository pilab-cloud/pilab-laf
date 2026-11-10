import * as React from "react";
import { createFormatters, type Formatters } from "./foundation-format";

export interface LafMessages {
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
}

export const en: LafMessages = {
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

/** Container for Radix `Portal`s; `undefined` means document.body. */
export function usePortalContainer(): HTMLElement | undefined {
  return React.useContext(LafContext).portalContainer;
}
