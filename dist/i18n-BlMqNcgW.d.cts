import * as React from 'react';

/** Locale-aware formatters (design F3). Pure functions; `createFormatters` binds a locale and time zone. */
interface BytesOptions {
    /** 1024 → IEC labels (KiB), 1000 → SI labels (kB). Omitted: 1024 with legacy KB/MB labels. */
    base?: 1024 | 1000;
    locale?: string;
    maximumFractionDigits?: number;
}
interface DurationOptions {
    style?: "short" | "clock";
    locale?: string;
}
interface DateTimeOptions {
    utc?: boolean;
    timeZone?: string;
    locale?: string;
    dateStyle?: "short" | "medium" | "long";
    timeStyle?: "short" | "medium" | "long";
}
interface RelativeOptions {
    now?: Date | number;
    locale?: string;
}
interface Formatters {
    /** `bytes(1536)` → "1.5 KB"; `bytes(4 * 2 ** 30, { base: 1024 })` → "4 GiB"; `{ base: 1000 }` → "4.29 GB". */
    bytes(n: number, opts?: BytesOptions | string): string;
    /** Bits per second, SI steps: "1.2 Gbit/s". */
    bitrate(bitsPerSecond: number, opts?: {
        locale?: string;
    }): string;
    /** Hertz: "2.6 GHz". */
    frequency(hz: number, opts?: {
        locale?: string;
    }): string;
    /** short: "3 h 12 min"; clock: "03:12:05". */
    duration(ms: number, opts?: DurationOptions): string;
    /** Ratio in 0…1: `percent(0.73)` → "73%". */
    percent(ratio: number, opts?: {
        locale?: string;
        fractionDigits?: number;
    }): string;
    /** "3 hours ago", "in 2 days". */
    relative(date: Date | number | string, opts?: RelativeOptions): string;
    dateTime(date: Date | number | string, opts?: DateTimeOptions): string;
}
declare function createFormatters(defaults?: {
    locale?: string;
    timeZone?: string;
}): Formatters;

interface LafMessages {
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
declare const en: LafMessages;
interface LafContextValue {
    locale: string;
    timeZone: string;
    /** Message catalogue: strings and formatting functions, keyed by `LafMessages`. */
    t: LafMessages;
    format: Formatters;
    portalContainer?: HTMLElement;
}
declare function LafProvider({ locale, messages, timeZone, portalContainer, children, }: {
    /** BCP-47 tag; drives `Intl` formatting. */
    locale?: string;
    /** Partial overrides on top of the English catalogue, e.g. `hu` from `@pilab/laf/locales/hu`. */
    messages?: Partial<LafMessages>;
    /** IANA time zone; defaults to the browser's. */
    timeZone?: string;
    /** Overlays (dialogs, popovers, menus) portal here, e.g. inside a shadow root or iframe. */
    portalContainer?: HTMLElement;
    children: React.ReactNode;
}): React.JSX.Element;
declare function useLaf(): LafContextValue;
/** Container for Radix `Portal`s; `undefined` means document.body. */
declare function usePortalContainer(): HTMLElement | undefined;

export { type BytesOptions as B, type DateTimeOptions as D, type Formatters as F, type LafMessages as L, type RelativeOptions as R, type DurationOptions as a, type LafContextValue as b, LafProvider as c, createFormatters as d, en as e, usePortalContainer as f, useLaf as u };
