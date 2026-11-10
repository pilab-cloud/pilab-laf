import * as React from "react";

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
};

interface LafContextValue {
  locale: string;
  t: LafMessages;
}

const LafContext = React.createContext<LafContextValue>({ locale: "en", t: en });

export function LafProvider({
  locale = "en",
  messages,
  children,
}: {
  locale?: string;
  /** Partial overrides on top of the English catalogue, e.g. `hu` from `@pilab/laf/locales/hu`. */
  messages?: Partial<LafMessages>;
  children: React.ReactNode;
}) {
  const value = React.useMemo(() => ({ locale, t: { ...en, ...messages } }), [locale, messages]);
  return <LafContext.Provider value={value}>{children}</LafContext.Provider>;
}

export function useLaf(): LafContextValue {
  return React.useContext(LafContext);
}
