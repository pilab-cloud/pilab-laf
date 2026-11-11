import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ChevronDown, Search, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf, usePortalContainer } from "../i18n";
import { autocompleteEn } from "../messages/autocomplete.en";
import { useControllableState } from "../utils";
import type { ComboboxOption } from "./combobox";
import { Chip } from "./extras";
import { Kbd } from "./more";
import { ObjectIcon, objectStateMeta, type ObjectKind, type ObjectState } from "./object-icon";

/*
 * Autocomplete, ChipsInput and QuickSearch.
 *
 * `Combobox` (cmdk) is a fine fit for plain pick-lists but cannot cancel in-flight loads, show error states,
 * accept free text, or expose a roving ARIA combobox for non-cmdk rows, so these components share a small
 * WAI-ARIA 1.2 combobox/listbox core (below) and reuse `ComboboxOption`, `Chip` and the `dropdown-*` styles.
 */

type Messages = typeof autocompleteEn;

/** English defaults overlaid with `t.components.autocomplete` (one level deep), so it works before the locale is wired. */
function useMessages(): Messages {
  const { t } = useLaf();
  const over = (t.components as unknown as { autocomplete?: Record<string, object | undefined> }).autocomplete;
  return React.useMemo(() => Object.fromEntries(Object.entries(autocompleteEn).map(([k, v]) => [k, { ...v, ...over?.[k] }])) as Messages, [over]);
}

/* ── shared: debounced, abortable async source ── */
interface AsyncState<T> {
  items: T[];
  loading: boolean;
  error: unknown;
  retry: () => void;
}

function useAsyncSource<T>(load: ((query: string, signal: AbortSignal) => Promise<T[]>) | undefined, query: string, enabled: boolean, debounceMs: number): AsyncState<T> {
  const [state, setState] = React.useState<{ items: T[]; loading: boolean; error: unknown }>({ items: [], loading: false, error: null });
  const [attempt, setAttempt] = React.useState(0);
  const loadRef = React.useRef(load);
  loadRef.current = load;
  const active = !!load && enabled;
  React.useEffect(() => {
    if (!active) {
      setState((s) => (s.loading || s.error ? { ...s, loading: false, error: null } : s));
      return;
    }
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    const timer = window.setTimeout(async () => {
      try {
        const items = await loadRef.current!(query, controller.signal);
        if (!controller.signal.aborted) setState({ items, loading: false, error: null });
      } catch (error) {
        if (!controller.signal.aborted) setState((s) => ({ ...s, loading: false, error }));
      }
    }, debounceMs);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [active, query, debounceMs, attempt]);
  const retry = React.useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}

/* ── shared: popup with a listbox ── */
interface ListEntry {
  key: string;
  node: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  onPick: () => void;
}
interface ListSection {
  key: string;
  heading?: string;
  entries: ListEntry[];
}
interface ListStatus {
  kind: "loading" | "empty" | "error";
  text: string;
  retry?: { label: string; onClick: () => void };
}

const optionId = (listId: string, i: number) => `${listId}-opt-${i}`;

function Popup({ open, onOpenChange, anchor, anchorRef, children, className }: { open: boolean; onOpenChange: (open: boolean) => void; anchor: React.ReactNode; anchorRef: React.RefObject<HTMLElement | null>; children: React.ReactNode; className?: string }) {
  const container = usePortalContainer();
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Anchor asChild>{anchor as React.ReactElement}</PopoverPrimitive.Anchor>
      <PopoverPrimitive.Portal container={container}>
        <PopoverPrimitive.Content
          sideOffset={4}
          align="start"
          collisionPadding={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (anchorRef.current?.contains(e.target as Node)) e.preventDefault();
          }}
          className={cn("z-50 min-w-(--radix-popover-trigger-width) max-w-[min(32rem,calc(100vw-1rem))]", className)}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

function ListboxBody({
  listId,
  label,
  sections,
  active,
  onActive,
  multiselectable,
  busy,
  status,
  footer,
}: {
  listId: string;
  label: string;
  sections: ListSection[];
  active: number;
  onActive: (i: number) => void;
  multiselectable?: boolean;
  busy?: boolean;
  status?: ListStatus | null;
  footer?: React.ReactNode;
}) {
  let index = 0;
  const hasEntries = sections.some((s) => s.entries.length);
  const renderEntry = (e: ListEntry) => {
    const i = index++;
    return (
      <div
        key={e.key}
        id={optionId(listId, i)}
        role="option"
        aria-selected={e.selected ?? false}
        aria-disabled={e.disabled || undefined}
        data-active={i === active || undefined}
        onMouseDown={(ev) => ev.preventDefault()}
        onMouseMove={() => i !== active && !e.disabled && onActive(i)}
        onClick={() => !e.disabled && e.onPick()}
        className={cn("dropdown-item cursor-pointer data-[active]:bg-surface-hover data-[active]:text-fg aria-disabled:cursor-default aria-disabled:opacity-50", e.selected && "font-semibold")}
      >
        {e.node}
        {e.selected && (
          <span aria-hidden className="ms-auto text-primary">
            ✓
          </span>
        )}
      </div>
    );
  };
  return (
    <div className="dropdown-menu max-h-72 w-full overflow-auto">
      {hasEntries && (
        <div id={listId} role="listbox" aria-label={label} aria-multiselectable={multiselectable || undefined} aria-busy={busy || undefined}>
          {sections.map((s) =>
            s.heading ? (
              <div key={s.key} role="group" aria-labelledby={`${listId}-h-${s.key}`}>
                <div id={`${listId}-h-${s.key}`} role="presentation" className="dropdown-label">
                  {s.heading}
                </div>
                {s.entries.map(renderEntry)}
              </div>
            ) : (
              s.entries.map(renderEntry)
            ),
          )}
        </div>
      )}
      {status && (
        <div role={status.kind === "error" ? "alert" : "status"} className={cn("flex items-center gap-2 px-3 py-2 text-sm", status.kind === "error" ? "text-danger" : "text-muted")}>
          <span>{status.text}</span>
          {status.retry && (
            <button type="button" className="ms-auto text-primary hover:underline" onMouseDown={(e) => e.preventDefault()} onClick={status.retry.onClick}>
              {status.retry.label}
            </button>
          )}
        </div>
      )}
      {footer}
    </div>
  );
}

const flatten = (sections: ListSection[]) => sections.flatMap((s) => s.entries);

function scrollActiveIntoView(listId: string, active: number) {
  if (active >= 0) document.getElementById(optionId(listId, active))?.scrollIntoView?.({ block: "nearest" });
}

const defaultFilter = (o: ComboboxOption, q: string) => !q || `${o.label} ${o.description ?? ""}`.toLowerCase().includes(q.toLowerCase());

/* ── 1. Autocomplete ── */
export type AutocompleteOption = ComboboxOption;

interface AutocompleteBase {
  /** Accessible name of the combobox. */
  label: string;
  /** Static options, filtered locally. Ignored when `loadOptions` is set. */
  options?: AutocompleteOption[];
  /** Async source; the signal aborts when the query changes, the popup closes or the component unmounts. */
  loadOptions?: (query: string, signal: AbortSignal) => Promise<AutocompleteOption[]>;
  /** Debounce before `loadOptions` runs (default 250 ms). */
  debounceMs?: number;
  /** Minimum query length before `loadOptions` runs (default 0). */
  minChars?: number;
  /** Local filter for static options. */
  filter?: (option: AutocompleteOption, query: string) => boolean;
  /** Allow values that are not in the list: Enter commits the typed text and a "Create" row is offered. */
  freeSolo?: boolean;
  /** Builds the option for a typed value; defaults to `{ value: text, label: text }`. Implies the Create row. */
  onCreate?: (text: string) => AutocompleteOption | void;
  clearable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  renderOption?: (option: AutocompleteOption, state: { selected: boolean }) => React.ReactNode;
  /** Controlled open state; omit for uncontrolled. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  className?: string;
}
interface AutocompleteSingle extends AutocompleteBase {
  multiple?: false;
  value?: AutocompleteOption | null;
  defaultValue?: AutocompleteOption | null;
  onChange?: (value: AutocompleteOption | null) => void;
}
interface AutocompleteMulti extends AutocompleteBase {
  multiple: true;
  value?: AutocompleteOption[];
  defaultValue?: AutocompleteOption[];
  onChange?: (value: AutocompleteOption[]) => void;
}
export type AutocompleteProps = AutocompleteSingle | AutocompleteMulti;

export function Autocomplete(props: AutocompleteProps) {
  const { label, options = [], loadOptions, debounceMs = 250, minChars = 0, filter = defaultFilter, freeSolo, onCreate, clearable, placeholder, disabled, invalid, renderOption, open: openProp, onOpenChange, id, className, multiple } = props;
  const m = useMessages().autocomplete;
  const listId = React.useId();
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [raw, setRaw] = useControllableState<AutocompleteOption | AutocompleteOption[] | null>({
    value: props.value,
    defaultValue: props.defaultValue ?? (multiple ? [] : null),
    onChange: props.onChange as ((v: AutocompleteOption | AutocompleteOption[] | null) => void) | undefined,
  });
  const selected = React.useMemo(() => (multiple ? ((raw as AutocompleteOption[] | null) ?? []) : raw ? [raw as AutocompleteOption] : []), [raw, multiple]);
  const commit = (list: AutocompleteOption[]) => setRaw(multiple ? list : (list[0] ?? null));

  const [open, setOpen] = useControllableState<boolean>({ value: openProp, defaultValue: false, onChange: onOpenChange });
  const [text, setText] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const query = typing ? text.trim() : "";
  const inputValue = typing ? text : multiple ? "" : (selected[0]?.label ?? "");
  const canCreate = !!freeSolo || !!onCreate;

  const remote = useAsyncSource(loadOptions, query, open && query.length >= minChars, debounceMs);
  const list = React.useMemo(() => (loadOptions ? remote.items : options.filter((o) => filter(o, query))), [loadOptions, remote.items, options, filter, query]);
  const isSelected = (o: AutocompleteOption) => selected.some((s) => s.value === o.value);

  const closeAndReset = () => {
    setOpen(false);
    setTyping(false);
    setText("");
  };
  const pick = (o: AutocompleteOption) => {
    if (o.disabled) return;
    if (multiple) {
      commit(isSelected(o) ? selected.filter((s) => s.value !== o.value) : [...selected, o]);
      setText("");
      setTyping(false);
    } else {
      commit([o]);
      closeAndReset();
    }
  };
  const create = (q: string) => {
    const existing = list.find((o) => o.label.toLowerCase() === q.toLowerCase());
    if (existing) return pick(existing);
    const made = onCreate?.(q) ?? { value: q, label: q };
    if (multiple && isSelected(made)) return setText("");
    pick(made);
  };

  const showCreate = canCreate && !!query && !list.some((o) => o.label.toLowerCase() === query.toLowerCase());
  const sections = React.useMemo<ListSection[]>(() => {
    const groups = new Map<string, ListEntry[]>();
    for (const o of list) {
      const g = o.group ?? "";
      const sel = isSelected(o);
      const entry: ListEntry = {
        key: o.value,
        disabled: o.disabled,
        selected: sel,
        onPick: () => pick(o),
        node: renderOption ? (
          renderOption(o, { selected: sel })
        ) : (
          <>
            <span>{o.label}</span>
            {o.description && <span className="ms-2 text-xs text-subtle">{o.description}</span>}
          </>
        ),
      };
      groups.set(g, [...(groups.get(g) ?? []), entry]);
    }
    const out: ListSection[] = [...groups.entries()].map(([g, entries]) => ({ key: g || "_", heading: g || undefined, entries }));
    if (showCreate) out.push({ key: "__create", entries: [{ key: "__create", onPick: () => create(query), node: m.create(query) }] });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, showCreate, query, selected, renderOption, m]);
  const entries = flatten(sections);

  React.useEffect(() => {
    setActive(freeSolo && query ? -1 : 0);
  }, [query, freeSolo, open]);
  React.useEffect(() => {
    if (active >= entries.length) setActive(entries.length - 1);
  }, [active, entries.length]);
  React.useEffect(() => scrollActiveIntoView(listId, active), [listId, active]);

  const loading = !!loadOptions && remote.loading;
  const status: ListStatus | null = remote.error
    ? { kind: "error", text: m.error, retry: { label: m.retry, onClick: remote.retry } }
    : loading && !entries.length
      ? { kind: "loading", text: m.loading }
      : !entries.length
        ? { kind: "empty", text: m.empty }
        : null;

  const move = (delta: number) => {
    if (!open) return setOpen(true);
    if (!entries.length) return;
    const len = entries.length;
    let i = active === -1 && delta < 0 ? len : active;
    for (let n = 0; n < len; n++) {
      i = (i + delta + len) % len;
      if (!entries[i]!.disabled) break;
    }
    setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        return move(1);
      case "ArrowUp":
        e.preventDefault();
        return move(-1);
      case "Home":
      case "End":
        if (!open || !entries.length) return;
        e.preventDefault();
        return setActive(e.key === "Home" ? 0 : entries.length - 1);
      case "Enter":
        if (open && active >= 0 && entries[active]) {
          e.preventDefault();
          entries[active]!.onPick();
        } else if (freeSolo && query) {
          e.preventDefault();
          create(query);
        }
        return;
      case "Escape":
        if (open) {
          e.preventDefault();
          closeAndReset();
        }
        return;
      case "Backspace":
        if (multiple && !text && selected.length) commit(selected.slice(0, -1));
        return;
    }
  };

  const hasValue = selected.length > 0 || !!text;
  const expanded = open && (entries.length > 0 || !!status);
  return (
    <Popup
      open={expanded}
      onOpenChange={(o) => !o && closeAndReset()}
      anchorRef={anchorRef}
      anchor={
        <div ref={anchorRef} className={cn("form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", invalid && "error", disabled && "opacity-60", className)}>
          {multiple &&
            selected.map((s) => (
              <Chip key={s.value} removeLabel={m.remove(s.label)} onRemove={disabled ? undefined : () => commit(selected.filter((x) => x.value !== s.value))}>
                {s.label}
              </Chip>
            ))}
          <input
            ref={inputRef}
            id={id}
            role="combobox"
            aria-label={label}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded={expanded}
            aria-controls={expanded && entries.length ? listId : undefined}
            aria-activedescendant={expanded && active >= 0 && entries[active] ? optionId(listId, active) : undefined}
            aria-invalid={invalid || undefined}
            autoComplete="off"
            className="min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none"
            placeholder={multiple && selected.length ? undefined : placeholder}
            disabled={disabled}
            value={inputValue}
            onChange={(e) => {
              setText(e.target.value);
              setTyping(true);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={closeAndReset}
            onKeyDown={onKeyDown}
          />
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              aria-label={m.clear}
              className="text-muted hover:text-fg"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                commit([]);
                setText("");
                setTyping(false);
                inputRef.current?.focus();
              }}
            >
              <X className="size-3.5" aria-hidden />
            </button>
          )}
          <button
            type="button"
            tabIndex={-1}
            aria-label={m.toggle}
            disabled={disabled}
            className="text-muted"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              inputRef.current?.focus();
              setOpen(!open);
            }}
          >
            <ChevronDown className="size-4" aria-hidden />
          </button>
        </div>
      }
    >
      <ListboxBody listId={listId} label={label} sections={sections} active={active} onActive={setActive} multiselectable={multiple} busy={loading} status={status} />
    </Popup>
  );
}

/* ── 2. ChipsInput (superset of TagInput) ── */
export interface ChipsInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** Accessible name of the text field. */
  label: string;
  placeholder?: string;
  max?: number;
  /** Return an error message to mark a chip invalid. */
  validate?: (chip: string) => string | undefined;
  /** `false` (default, like TagInput): invalid input is rejected and the message shown. `true`: it is added as a chip in the danger tone. */
  keepInvalid?: boolean;
  /** `reject` (default) shows an error, `ignore` skips silently, `allow` keeps repeats. */
  duplicates?: "reject" | "ignore" | "allow";
  /** Keys that commit the typed text (default Enter and comma). */
  delimiters?: string[];
  /** Splits pasted/typed text into several chips (default commas and whitespace). */
  splitPattern?: RegExp;
  /** Commit pending text when the field loses focus (default true). */
  addOnBlur?: boolean;
  /** Leading icon per chip. */
  icon?: (chip: string) => React.ReactNode;
  /** Normalise a chip before validation, e.g. lower-casing. */
  normalize?: (chip: string) => string;
  disabled?: boolean;
  className?: string;
}

export function ChipsInput({
  value: valueProp,
  defaultValue,
  onChange,
  label,
  placeholder,
  max,
  validate,
  keepInvalid,
  duplicates = "reject",
  delimiters = ["Enter", ","],
  splitPattern = /[,\s]+/,
  addOnBlur = true,
  icon,
  normalize,
  disabled,
  className,
}: ChipsInputProps) {
  const m = useMessages().chips;
  const [value, setValue] = useControllableState<string[]>({ value: valueProp, defaultValue: defaultValue ?? [], onChange });
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState<string>();
  const errorId = React.useId();
  const invalidMsg = (chip: string) => validate?.(chip);

  const add = (raw: string) => {
    const chips = raw
      .split(splitPattern)
      .map((c) => (normalize ? normalize(c.trim()) : c.trim()))
      .filter(Boolean);
    if (!chips.length) return setText("");
    const next = [...value];
    for (const c of chips) {
      if (next.includes(c) && duplicates !== "allow") {
        if (duplicates === "ignore") continue;
        return setError(m.duplicate(c));
      }
      const err = invalidMsg(c);
      if (err && !keepInvalid) return setError(err);
      if (max !== undefined && next.length >= max) return setError(m.max(max));
      next.push(c);
    }
    setError(undefined);
    setValue(next);
    setText("");
  };
  const remove = (i: number) => {
    setError(undefined);
    setValue(value.filter((_, j) => j !== i));
  };

  return (
    <div className={cn("grid gap-1", className)}>
      <div className={cn("form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", error && "error", disabled && "opacity-60")}>
        {value.map((c, i) => {
          const err = invalidMsg(c);
          return (
            <span key={`${c}-${i}`} title={err} data-invalid={err ? "" : undefined} className="inline-flex">
              <Chip tone={err ? "danger" : "neutral"} icon={icon?.(c)} removeLabel={m.remove(c)} onRemove={disabled ? undefined : () => remove(i)}>
                {c}
              </Chip>
            </span>
          );
        })}
        <input
          aria-label={label}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          placeholder={placeholder}
          disabled={disabled}
          className="min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(undefined);
          }}
          onBlur={() => addOnBlur && text.trim() && add(text)}
          onKeyDown={(e) => {
            if (delimiters.includes(e.key) && text.trim()) {
              e.preventDefault();
              add(text);
            } else if (e.key === "Backspace" && !text && value.length) remove(value.length - 1);
          }}
          onPaste={(e) => {
            const pasted = e.clipboardData.getData("text");
            if (!pasted) return;
            e.preventDefault();
            add(text + pasted);
          }}
        />
      </div>
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── 3. QuickSearch ── */
export interface QuickSearchResult {
  id: string;
  /** Inventory kind; picks the `ObjectIcon`. */
  kind: ObjectKind | (string & {});
  name: string;
  /** Inventory path, e.g. `dc-1 / cluster-a`. */
  path?: string;
  state?: ObjectState;
  /** Section heading; defaults to the kind. */
  group?: string;
}

export interface QuickSearchProps {
  search: (query: string, signal: AbortSignal) => Promise<QuickSearchResult[]>;
  onSelect: (result: QuickSearchResult) => void;
  /** Recent selections shown while the query is empty. Controlled when set; otherwise kept in memory. */
  recent?: QuickSearchResult[];
  onRecentChange?: (recent: QuickSearchResult[]) => void;
  maxRecent?: number;
  debounceMs?: number;
  /** Ctrl/Cmd+K focuses the box (default true). Turn off where a `CommandPalette` owns the shortcut. */
  hotkey?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function QuickSearch({ search, onSelect, recent: recentProp, onRecentChange, maxRecent = 5, debounceMs = 200, hotkey = true, label: labelProp, placeholder, className }: QuickSearchProps) {
  const { t } = useLaf();
  const m = useMessages().quickSearch;
  const label = labelProp ?? m.label;
  const listId = React.useId();
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [recent, setRecent] = useControllableState<QuickSearchResult[]>({ value: recentProp, defaultValue: [], onChange: onRecentChange });
  const [shortcut, setShortcut] = React.useState("Ctrl K");
  React.useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("⌘K");
  }, []);

  React.useEffect(() => {
    if (!hotkey) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotkey]);

  const q = query.trim();
  const remote = useAsyncSource(search, q, open && !!q, debounceMs);
  const results = q ? remote.items : [];

  const choose = (r: QuickSearchResult) => {
    setRecent([r, ...recent.filter((x) => x.id !== r.id)].slice(0, maxRecent));
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
    onSelect(r);
  };

  const sections = React.useMemo<ListSection[]>(() => {
    const toEntry = (r: QuickSearchResult): ListEntry => ({
      key: r.id,
      onPick: () => choose(r),
      node: (
        <>
          <ObjectIcon kind={r.kind} state={r.state} />
          <span className="min-w-0 truncate font-medium">{r.name}</span>
          {r.path && <span className="min-w-0 truncate text-xs text-subtle">{r.path}</span>}
          {r.state && <span className="ms-auto shrink-0 text-xs text-muted">{t[objectStateMeta[r.state].text] as string}</span>}
        </>
      ),
    });
    if (!q) return recent.length ? [{ key: "recent", heading: m.recent, entries: recent.map(toEntry) }] : [];
    const groups = new Map<string, QuickSearchResult[]>();
    for (const r of results) groups.set(r.group ?? r.kind, [...(groups.get(r.group ?? r.kind) ?? []), r]);
    return [...groups.entries()].map(([g, items]) => ({ key: g, heading: g, entries: items.map(toEntry) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, recent, results, m, t]);
  const entries = flatten(sections);

  React.useEffect(() => setActive(0), [q, open]);
  React.useEffect(() => {
    if (active >= entries.length) setActive(Math.max(0, entries.length - 1));
  }, [active, entries.length]);
  React.useEffect(() => scrollActiveIntoView(listId, active), [listId, active]);

  const loading = !!q && remote.loading;
  const status: ListStatus | null = q
    ? remote.error
      ? { kind: "error", text: m.error, retry: { label: m.retry, onClick: remote.retry } }
      : loading && !entries.length
        ? { kind: "loading", text: m.loading }
        : !entries.length
          ? { kind: "empty", text: m.empty(q) }
          : null
    : entries.length
      ? null
      : { kind: "empty", text: m.hint };

  const expanded = open;
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!open) return setOpen(true);
        if (entries.length) setActive((i) => (i + (e.key === "ArrowDown" ? 1 : -1) + entries.length) % entries.length);
        return;
      }
      case "Enter":
        if (open && entries[active]) {
          e.preventDefault();
          entries[active]!.onPick();
        }
        return;
      case "Escape":
        if (open) setOpen(false);
        else if (query) setQuery("");
        else inputRef.current?.blur();
        e.preventDefault();
        return;
    }
  };

  const footer =
    !q && recent.length ? (
      <div className="border-t border-line px-3 py-1.5">
        <button type="button" className="text-xs text-primary hover:underline" onMouseDown={(e) => e.preventDefault()} onClick={() => setRecent([])}>
          {m.clearRecent}
        </button>
      </div>
    ) : null;

  return (
    <Popup
      open={expanded}
      onOpenChange={setOpen}
      anchorRef={anchorRef}
      anchor={
        <div ref={anchorRef} role="search" className={cn("form-input flex w-full max-w-full items-center gap-2 transition-[width] focus-within:border-primary sm:w-48 sm:focus-within:w-72", className)}>
          <Search className="size-4 shrink-0 text-muted" aria-hidden />
          <input
            ref={inputRef}
            role="combobox"
            aria-label={label}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded={expanded}
            aria-controls={expanded && entries.length ? listId : undefined}
            aria-activedescendant={expanded && entries[active] ? optionId(listId, active) : undefined}
            autoComplete="off"
            className="min-w-0 flex-1 border-0 bg-transparent p-0 text-fg outline-none"
            placeholder={placeholder ?? m.placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={onKeyDown}
          />
          {hotkey && !open && !query && <Kbd aria-hidden>{shortcut}</Kbd>}
        </div>
      }
    >
      <ListboxBody listId={listId} label={label} sections={sections} active={active} onActive={setActive} busy={loading} status={status} footer={footer} />
      {q && !loading && !remote.error && entries.length > 0 && (
        <span className="sr-only" role="status">
          {m.results(entries.length)}
        </span>
      )}
    </Popup>
  );
}
