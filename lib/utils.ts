import * as React from "react";
import { createFormatters, type BytesOptions, type DateTimeOptions, type DurationOptions, type Formatters, type RelativeOptions } from "./foundation-format";

/** Works controlled (value !== undefined) or uncontrolled (defaultValue). */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (next: T) => void;
}): [T, (next: T | ((prev: T) => T)) => void] {
  const [inner, setInner] = React.useState<T>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const ref = React.useRef(current);
  ref.current = current;
  const set = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const v = typeof next === "function" ? (next as (p: T) => T)(ref.current) : next;
      if (!controlled) setInner(v);
      ref.current = v;
      onChange?.(v);
    },
    [controlled, onChange],
  );
  return [current, set];
}

export { createFormatters };
export type { Formatters, BytesOptions, DurationOptions, DateTimeOptions, RelativeOptions };

/** Default formatters (browser locale/time zone); `useLaf().format` binds the provider's. */
export const format: Formatters = /* @__PURE__ */ createFormatters();

/** Line diff via LCS. */
export type DiffOp = { type: "same" | "add" | "del"; text: string };
export function diffLines(before: string, after: string): DiffOp[] {
  const a = before.split("\n");
  const b = after.split("\n");
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--) dp[i]![j] = a[i] === b[j] ? dp[i + 1]![j + 1]! + 1 : Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
  const out: DiffOp[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) out.push({ type: "same", text: a[i++]! }), j++;
    else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) out.push({ type: "del", text: a[i++]! });
    else out.push({ type: "add", text: b[j++]! });
  }
  while (i < a.length) out.push({ type: "del", text: a[i++]! });
  while (j < b.length) out.push({ type: "add", text: b[j++]! });
  return out;
}

/** Whether a file matches an `accept` attribute value (extensions, MIME types, wildcards). */
export function matchesAccept(file: { name: string; type: string }, accept?: string): boolean {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  return accept
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .some((t) => (t.startsWith(".") ? name.endsWith(t) : t.endsWith("/*") ? file.type.toLowerCase().startsWith(t.slice(0, -1)) : file.type.toLowerCase() === t));
}
