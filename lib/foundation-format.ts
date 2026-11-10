/** Locale-aware formatters (design F3). Pure functions; `createFormatters` binds a locale and time zone. */

export interface BytesOptions {
  /** 1024 → IEC labels (KiB), 1000 → SI labels (kB). Omitted: 1024 with legacy KB/MB labels. */
  base?: 1024 | 1000;
  locale?: string;
  maximumFractionDigits?: number;
}
export interface DurationOptions {
  style?: "short" | "clock";
  locale?: string;
}
export interface DateTimeOptions {
  utc?: boolean;
  timeZone?: string;
  locale?: string;
  dateStyle?: "short" | "medium" | "long";
  timeStyle?: "short" | "medium" | "long";
}
export interface RelativeOptions {
  now?: Date | number;
  locale?: string;
}

export interface Formatters {
  /** `bytes(1536)` → "1.5 KB"; `bytes(4 * 2 ** 30, { base: 1024 })` → "4 GiB"; `{ base: 1000 }` → "4.29 GB". */
  bytes(n: number, opts?: BytesOptions | string): string;
  /** Bits per second, SI steps: "1.2 Gbit/s". */
  bitrate(bitsPerSecond: number, opts?: { locale?: string }): string;
  /** Hertz: "2.6 GHz". */
  frequency(hz: number, opts?: { locale?: string }): string;
  /** short: "3 h 12 min"; clock: "03:12:05". */
  duration(ms: number, opts?: DurationOptions): string;
  /** Ratio in 0…1: `percent(0.73)` → "73%". */
  percent(ratio: number, opts?: { locale?: string; fractionDigits?: number }): string;
  /** "3 hours ago", "in 2 days". */
  relative(date: Date | number | string, opts?: RelativeOptions): string;
  dateTime(date: Date | number | string, opts?: DateTimeOptions): string;
}

const LEGACY = ["B", "KB", "MB", "GB", "TB", "PB"];
const IEC = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
const SI = ["B", "kB", "MB", "GB", "TB", "PB"];

function scale(n: number, base: number, units: string[]) {
  let i = 0;
  let v = n;
  while (Math.abs(v) >= base && i < units.length - 1) {
    v /= base;
    i++;
  }
  return { v, unit: units[i]!, i };
}

const toDate = (d: Date | number | string) => (d instanceof Date ? d : new Date(d));

export function createFormatters(defaults: { locale?: string; timeZone?: string } = {}): Formatters {
  const num = (locale: string | undefined, o?: Intl.NumberFormatOptions) => new Intl.NumberFormat(locale ?? defaults.locale, o);
  const pick = (v: number, i: number, locale?: string, max?: number) =>
    num(locale, { maximumFractionDigits: max ?? (i === 0 ? 0 : Math.abs(v) < 10 ? 1 : 0) }).format(v);

  return {
    bytes(n, opts) {
      const o: BytesOptions = typeof opts === "string" ? { locale: opts } : (opts ?? {});
      const base = o.base ?? 1024;
      const { v, unit, i } = scale(n, base, o.base === 1024 ? IEC : o.base === 1000 ? SI : LEGACY);
      const max = o.maximumFractionDigits ?? (o.base === 1000 && i > 0 && Math.abs(v) < 10 ? 2 : undefined);
      return `${pick(v, i, o.locale, max)} ${unit}`;
    },
    bitrate(n, o) {
      const { v, unit, i } = scale(n, 1000, ["bit/s", "kbit/s", "Mbit/s", "Gbit/s", "Tbit/s"]);
      return `${pick(v, i, o?.locale)} ${unit}`;
    },
    frequency(hz, o) {
      const { v, unit, i } = scale(hz, 1000, ["Hz", "kHz", "MHz", "GHz", "THz"]);
      return `${pick(v, i, o?.locale)} ${unit}`;
    },
    duration(ms, o) {
      const total = Math.max(0, Math.round(ms / 1000));
      const d = Math.floor(total / 86400);
      const h = Math.floor((total % 86400) / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      if (o?.style === "clock") {
        const p = (x: number) => String(x).padStart(2, "0");
        return `${p(d * 24 + h)}:${p(m)}:${p(s)}`;
      }
      if (ms > 0 && ms < 1000) return `${num(o?.locale).format(Math.round(ms))} ms`;
      const f = num(o?.locale);
      const parts = ([[d, "d"], [h, "h"], [m, "min"], [s, "s"]] as const).filter(([x]) => x > 0).slice(0, 2);
      return parts.length ? parts.map(([x, u]) => `${f.format(x)} ${u}`).join(" ") : `${f.format(0)} s`;
    },
    percent(ratio, o) {
      return num(o?.locale, { style: "percent", maximumFractionDigits: o?.fractionDigits ?? 0 }).format(ratio);
    },
    relative(date, o) {
      const now = o?.now === undefined ? Date.now() : +toDate(o.now);
      const diff = (+toDate(date) - now) / 1000;
      const steps: [Intl.RelativeTimeFormatUnit, number][] = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
      const rtf = new Intl.RelativeTimeFormat(o?.locale ?? defaults.locale, { numeric: "auto" });
      for (const [unit, secs] of steps) if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
      return rtf.format(Math.round(diff), "second");
    },
    dateTime(date, o) {
      return new Intl.DateTimeFormat(o?.locale ?? defaults.locale, {
        dateStyle: o?.dateStyle ?? "medium",
        timeStyle: o?.timeStyle ?? "medium",
        timeZone: o?.utc ? "UTC" : (o?.timeZone ?? defaults.timeZone),
      }).format(toDate(date));
    },
  };
}
