import * as React from 'react';

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
}
declare const en: LafMessages;
interface LafContextValue {
    locale: string;
    t: LafMessages;
}
declare function LafProvider({ locale, messages, children, }: {
    locale?: string;
    /** Partial overrides on top of the English catalogue, e.g. `hu` from `@pilab/laf/locales/hu`. */
    messages?: Partial<LafMessages>;
    children: React.ReactNode;
}): React.JSX.Element;
declare function useLaf(): LafContextValue;

export { type LafMessages as L, LafProvider as a, en as e, useLaf as u };
