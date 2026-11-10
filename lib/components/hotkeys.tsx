import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import { useLaf, usePortalContainer } from "../i18n";
import { Kbd } from "./more";

/* ── Hotkeys (design F6) ── */
export interface HotkeyOptions {
  /** Scope this map belongs to; it only fires while the scope is active. Default "global". */
  scope?: string;
  enabled?: boolean;
  /** Also fire while typing in inputs, textareas, selects and contenteditable elements. */
  allowInInputs?: boolean;
  /** Human-readable description per combo, shown in `ShortcutHelp`. */
  descriptions?: Record<string, string>;
}

export interface RegisteredHotkey {
  combo: string;
  description?: string;
  scope: string;
}

interface HotkeysContextValue {
  scopes: string[];
  register(entry: RegisteredHotkey): () => void;
  list(): RegisteredHotkey[];
  subscribe(cb: () => void): () => void;
}

const HotkeysContext = React.createContext<HotkeysContextValue | null>(null);

/** Explicit registry: only hooks rendered below a provider are listed in `ShortcutHelp`. */
export function HotkeysProvider({ scopes = ["global"], children }: { scopes?: string[]; children: React.ReactNode }) {
  const store = React.useRef<{ items: Set<RegisteredHotkey>; subs: Set<() => void> }>({ items: new Set(), subs: new Set() });
  const value = React.useMemo<HotkeysContextValue>(
    () => ({
      scopes,
      register(entry) {
        store.current.items.add(entry);
        store.current.subs.forEach((f) => f());
        return () => {
          store.current.items.delete(entry);
          store.current.subs.forEach((f) => f());
        };
      },
      list: () => [...store.current.items],
      subscribe(cb) {
        store.current.subs.add(cb);
        return () => void store.current.subs.delete(cb);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scopes.join("\u0000")],
  );
  return <HotkeysContext.Provider value={value}>{children}</HotkeysContext.Provider>;
}

/** Registered hotkeys under the nearest `HotkeysProvider` (empty without one). */
export function useRegisteredHotkeys(): RegisteredHotkey[] {
  const ctx = React.useContext(HotkeysContext);
  const [, bump] = React.useReducer((n: number) => n + 1, 0);
  React.useEffect(() => {
    bump();
    return ctx?.subscribe(bump);
  }, [ctx]);
  return ctx?.list() ?? [];
}

export const isMacPlatform = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || "");

interface Stroke {
  ctrl: boolean;
  meta: boolean;
  alt: boolean;
  shift: boolean;
  key: string;
}

const aliases: Record<string, string> = { esc: "escape", space: " ", spacebar: " ", up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright", return: "enter", plus: "+" };

function parseStroke(src: string, mac: boolean): Stroke {
  const parts = src.split("+").filter(Boolean);
  if (src.endsWith("++")) parts.push("+");
  const s: Stroke = { ctrl: false, meta: false, alt: false, shift: false, key: "" };
  for (const raw of parts) {
    const p = raw.toLowerCase();
    if (p === "mod") mac ? (s.meta = true) : (s.ctrl = true);
    else if (p === "ctrl" || p === "control") s.ctrl = true;
    else if (p === "meta" || p === "cmd" || p === "command") s.meta = true;
    else if (p === "alt" || p === "option") s.alt = true;
    else if (p === "shift") s.shift = true;
    else s.key = aliases[p] ?? p;
  }
  return s;
}

/** `"mod+k"` → one stroke; `"g i"` → two strokes. */
export const parseHotkey = (combo: string, mac = isMacPlatform()): Stroke[] =>
  combo.trim().split(/\s+/).map((s) => parseStroke(s, mac));

function strokeMatches(e: KeyboardEvent, s: Stroke): boolean {
  if (e.ctrlKey !== s.ctrl || e.metaKey !== s.meta || e.altKey !== s.alt) return false;
  const key = e.key.toLowerCase();
  // Shifted punctuation (e.g. "?") is already encoded in `key`.
  const shiftOk = s.shift ? e.shiftKey : !e.shiftKey || !/^[a-z0-9]$/.test(key) ? true : false;
  return shiftOk && key === s.key;
}

const isTypingTarget = (t: EventTarget | null) => {
  const el = t as HTMLElement | null;
  if (!el || !el.tagName) return false;
  return el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
};

const SEQUENCE_TIMEOUT = 1000;

/**
 * Register keyboard shortcuts. Combos: `mod+k`, `shift+/`, `?`, sequences `g i`.
 * `mod` is ⌘ on macOS and Ctrl elsewhere.
 */
export function useHotkeys(map: Record<string, (e: KeyboardEvent) => void>, opts: HotkeyOptions = {}): void {
  const { scope = "global", enabled = true, allowInInputs = false, descriptions } = opts;
  const ctx = React.useContext(HotkeysContext);
  const mapRef = React.useRef(map);
  mapRef.current = map;
  const descRef = React.useRef(descriptions);
  descRef.current = descriptions;
  const active = scope === "global" || (ctx?.scopes ?? ["global"]).includes(scope);
  const keys = Object.keys(map).join("\u0000");

  React.useEffect(() => {
    if (!enabled || !active) return;
    const offs = keys
      .split("\u0000")
      .filter(Boolean)
      .map((combo) => ctx?.register({ combo, description: descRef.current?.[combo], scope }));
    const mac = isMacPlatform();
    const parsed = keys.split("\u0000").filter(Boolean).map((combo) => ({ combo, steps: parseHotkey(combo, mac) }));
    let buffer: KeyboardEvent[] = [];
    let timer: ReturnType<typeof setTimeout> | undefined;
    const reset = () => {
      buffer = [];
      clearTimeout(timer);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat || ["shift", "control", "alt", "meta"].includes(e.key.toLowerCase())) return;
      if (!allowInInputs && isTypingTarget(e.target)) return reset();
      buffer = [...buffer, e].slice(-4);
      clearTimeout(timer);
      timer = setTimeout(reset, SEQUENCE_TIMEOUT);
      for (const { combo, steps } of parsed) {
        const tail = buffer.slice(-steps.length);
        if (tail.length === steps.length && tail.every((ev, i) => strokeMatches(ev, steps[i]!))) {
          e.preventDefault();
          reset();
          mapRef.current[combo]?.(e);
          return;
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer);
      offs.forEach((off) => off?.());
    };
  }, [keys, enabled, active, allowInInputs, scope, ctx]);
}

const symbols: Record<string, string> = { mod: "mod", ctrl: "Ctrl", meta: "⌘", alt: "Alt", shift: "Shift", escape: "Esc", arrowup: "↑", arrowdown: "↓", arrowleft: "←", arrowright: "→", " ": "Space" };

/** Display form of a combo, e.g. `mod+k` → `⌘K` / `Ctrl+K`, `g i` → `G I`. */
export function formatHotkey(combo: string, mac = isMacPlatform()): string {
  return combo
    .trim()
    .split(/\s+/)
    .map((step) =>
      step
        .split("+")
        .filter(Boolean)
        .map((p) => {
          const k = (aliases[p.toLowerCase()] ?? p.toLowerCase());
          if (k === "mod") return mac ? "⌘" : "Ctrl";
          const sym = symbols[k];
          return sym ?? (k.length === 1 ? k.toUpperCase() : p);
        })
        .join(mac ? "" : "+"),
    )
    .join(" ");
}

/** Dialog listing the hotkeys registered below a `HotkeysProvider`; pressing `?` opens it. */
export function ShortcutHelp({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { t } = useLaf();
  const container = usePortalContainer();
  const items = useRegisteredHotkeys().filter((h) => h.combo !== "?");
  useHotkeys({ "?": () => onOpenChange(true) });
  const groups = new Map<string, RegisteredHotkey[]>();
  items.forEach((h) => groups.set(h.scope, [...(groups.get(h.scope) ?? []), h]));
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal container={container}>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="popup fixed top-[15%] left-1/2 z-50 max-h-[70vh] w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 overflow-auto p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <DialogPrimitive.Title className="m-0 text-base font-semibold text-fg">{t.shortcuts}</DialogPrimitive.Title>
            <DialogPrimitive.Close className="btn btn-ghost btn-sm" aria-label={t.close}>
              <X className="size-4" aria-hidden />
            </DialogPrimitive.Close>
          </div>
          {items.length === 0 && <p className="text-sm text-muted">{t.noShortcuts}</p>}
          {[...groups].map(([scope, list]) => (
            <section key={scope} className="mb-3">
              {groups.size > 1 && <h3 className="mb-1 text-xs font-medium uppercase text-subtle">{scope}</h3>}
              <ul className="m-0 list-none p-0">
                {list.map((h) => (
                  <li key={`${h.scope}:${h.combo}`} className="flex items-center justify-between gap-3 py-1 text-sm text-muted">
                    <span>{h.description ?? h.combo}</span>
                    <Kbd>{formatHotkey(h.combo)}</Kbd>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
