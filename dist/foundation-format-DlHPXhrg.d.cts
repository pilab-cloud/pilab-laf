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

export { type BytesOptions as B, type DateTimeOptions as D, type Formatters as F, type RelativeOptions as R, type DurationOptions as a, createFormatters as c };
