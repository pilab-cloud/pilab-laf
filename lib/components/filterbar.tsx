import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Bookmark, Check, Pencil, Star, Trash2, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { Button } from "./button";

/* ── Grammar (design.md §6.5.1) ── */
export type FilterOp = ":" | ">" | ">=" | "<" | "<=";

export interface Filter {
  key: string;
  op: FilterOp;
  /** Comma-separated alternatives (OR). */
  values: string[];
  negated: boolean;
}

export interface TextTerm {
  value: string;
  negated: boolean;
}

export type FilterToken = ({ type: "field" } & Filter) | ({ type: "text" } & TextTerm);

export interface ParsedFilter {
  tokens: FilterToken[];
  filters: Filter[];
  text: TextTerm[];
}

const KEY_RE = /^[A-Za-z_][\w.-]*:/;
const OP_RE = /^(>=|<=|>|<)/;
const isWs = (c: string | undefined) => c !== undefined && /\s/.test(c);

function readQuoted(s: string, start: number): [string, number] {
  let out = "";
  let i = start + 1;
  while (i < s.length) {
    const c = s[i]!;
    if (c === "\\" && (s[i + 1] === '"' || s[i + 1] === "\\")) {
      out += s[i + 1];
      i += 2;
    } else if (c === '"') return [out, i + 1];
    else {
      out += c;
      i++;
    }
  }
  return [out, i];
}

export function parseFilter(input: string): ParsedFilter {
  const tokens: FilterToken[] = [];
  const n = input.length;
  let i = 0;
  while (i < n) {
    while (i < n && isWs(input[i])) i++;
    if (i >= n) break;
    const begin = i;
    let negated = false;
    if (input[i] === "-" && i + 1 < n && !isWs(input[i + 1])) {
      negated = true;
      i++;
    }
    const km = KEY_RE.exec(input.slice(i));
    if (km) {
      const key = km[0].slice(0, -1);
      let j = i + km[0].length;
      const om = OP_RE.exec(input.slice(j));
      const op = (om ? om[0] : ":") as FilterOp;
      if (om) j += om[0].length;
      const values: string[] = [];
      for (;;) {
        if (input[j] === '"') {
          const [v, next] = readQuoted(input, j);
          values.push(v);
          j = next;
        } else {
          const s = j;
          while (j < n && !isWs(input[j]) && input[j] !== ",") j++;
          if (j > s) values.push(input.slice(s, j));
        }
        if (input[j] === ",") j++;
        else break;
      }
      if (values.length > 0) {
        tokens.push({ type: "field", key, op, values, negated });
        i = j;
        continue;
      }
    }
    i = begin;
    if (input[i] === "-" && negated) i++;
    if (input[i] === '"') {
      const [v, next] = readQuoted(input, i);
      i = next;
      tokens.push({ type: "text", value: v, negated });
    } else {
      while (i < n && !isWs(input[i])) i++;
      const raw = input.slice(begin, i);
      tokens.push({ type: "text", value: negated ? raw.slice(1) : raw, negated });
    }
  }
  return {
    tokens,
    filters: tokens.filter((t): t is { type: "field" } & Filter => t.type === "field").map(({ type: _t, ...f }) => f),
    text: tokens.filter((t): t is { type: "text" } & TextTerm => t.type === "text").map(({ type: _t, ...x }) => x),
  };
}

const quote = (v: string) => `"${v.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

function serializeValue(v: string): string {
  return v === "" || /[\s,"\\]/.test(v) || /^[<>]/.test(v) ? quote(v) : v;
}

function serializeText(t: TextTerm): string {
  const v = t.value;
  const needs = v === "" || /[\s"\\]/.test(v) || KEY_RE.test(v) || (!t.negated && v.startsWith("-"));
  return (t.negated ? "-" : "") + (needs ? quote(v) : v);
}

export function serializeToken(t: FilterToken | Filter | TextTerm): string {
  if ("key" in t) {
    return `${t.negated ? "-" : ""}${t.key}:${t.op === ":" ? "" : t.op}${t.values.map(serializeValue).join(",")}`;
  }
  return serializeText(t);
}

/** Accepts `parseFilter()` output, a token list, or `Filter[]` (+ optional free text terms). */
export function serializeFilter(input: ParsedFilter | Array<FilterToken | Filter | TextTerm>, text?: TextTerm[]): string {
  const list = Array.isArray(input) ? [...input, ...(text ?? [])] : input.tokens;
  return list.map(serializeToken).join(" ");
}

/* ── Field definitions ── */
export interface FilterOption {
  value: string;
  label?: string;
  description?: string;
}

export interface FilterField {
  key: string;
  label?: string;
  type?: "text" | "enum" | "boolean" | "number" | "date";
  /** Static list or (async) lookup used for value autocomplete. */
  options?: FilterOption[] | ((query: string) => FilterOption[] | Promise<FilterOption[]>);
  /** Allow `key:a,b`. Default true. */
  multiple?: boolean;
  /** Allow `>` `>=` `<` `<=` (default for number/date). */
  comparable?: boolean;
  description?: string;
}

const findField = (fields: FilterField[], key: string) => fields.find((f) => f.key.toLowerCase() === key.toLowerCase());

function fieldOptions(f: FilterField): FilterOption[] | undefined {
  if (f.type === "boolean") return [{ value: "true" }, { value: "false" }];
  return Array.isArray(f.options) ? f.options : undefined;
}

function tokenInvalid(t: FilterToken, fields: FilterField[]): boolean {
  if (t.type !== "field") return false;
  const f = findField(fields, t.key);
  if (!f) return true;
  if (t.op !== ":" && !(f.comparable ?? (f.type === "number" || f.type === "date"))) return true;
  if (f.type === "number" && t.values.some((v) => Number.isNaN(Number(v)))) return true;
  if ((f.type === "enum" || f.type === "boolean") && fieldOptions(f)) {
    const allowed = fieldOptions(f)!.map((o) => o.value.toLowerCase());
    return t.values.some((v) => !allowed.includes(v.toLowerCase()));
  }
  return false;
}

/* ── Saved views ── */
export interface SavedView {
  id: string;
  name: string;
  query: string;
}

export interface SavedViewsStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface SavedViewsLabels {
  views: string;
  saveCurrent: string;
  name: string;
  save: string;
  rename: string;
  remove: (name: string) => string;
  renameView: (name: string) => string;
  setDefault: (name: string) => string;
  unsetDefault: (name: string) => string;
  empty: string;
  confirm: string;
}

const defaultViewLabels: SavedViewsLabels = {
  views: "Views",
  saveCurrent: "Save current filter as view",
  name: "View name",
  save: "Save",
  rename: "Rename",
  remove: (n) => `Delete view ${n}`,
  renameView: (n) => `Rename view ${n}`,
  setDefault: (n) => `Make ${n} the default view`,
  unsetDefault: (n) => `Remove ${n} as default view`,
  empty: "No saved views",
  confirm: "Confirm",
};

function localStorageAdapter(): SavedViewsStorage | undefined {
  try {
    return typeof window !== "undefined" ? window.localStorage : undefined;
  } catch {
    return undefined;
  }
}

interface StoredViews {
  views: SavedView[];
  defaultId?: string | null;
}

function readStored(storage: SavedViewsStorage | undefined, key: string): StoredViews {
  try {
    const raw = storage?.getItem(key);
    if (!raw) return { views: [] };
    const p = JSON.parse(raw) as StoredViews;
    return {
      views: Array.isArray(p.views)
        ? p.views.filter((v) => v && typeof v.id === "string" && typeof v.name === "string" && typeof v.query === "string")
        : [],
      defaultId: typeof p.defaultId === "string" ? p.defaultId : null,
    };
  } catch {
    return { views: [] };
  }
}

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export interface UseSavedViewsOptions {
  views?: SavedView[];
  defaultViews?: SavedView[];
  onViewsChange?: (views: SavedView[]) => void;
  defaultViewId?: string | null;
  onDefaultViewChange?: (id: string | null) => void;
  /** Persistence adapter; defaults to `localStorage`. Pass `null` to disable. Ignored when `views` is controlled. */
  storage?: SavedViewsStorage | null;
  storageKey?: string;
}

export function useSavedViews(opts: UseSavedViewsOptions = {}) {
  const { storageKey = "pilab.savedViews", storage: storageProp } = opts;
  const storage = storageProp === null ? undefined : (storageProp ?? localStorageAdapter());
  const [initial] = React.useState(() => (opts.views === undefined ? readStored(storage, storageKey) : { views: [] as SavedView[] }));
  const [views, setViews] = useControllableState<SavedView[]>({
    value: opts.views,
    defaultValue: opts.defaultViews && initial.views.length === 0 ? opts.defaultViews : initial.views,
    onChange: opts.onViewsChange,
  });
  const [defaultId, setDefaultId] = useControllableState<string | null>({
    value: opts.defaultViewId,
    defaultValue: (initial as StoredViews).defaultId ?? null,
    onChange: opts.onDefaultViewChange,
  });
  const persist = opts.views === undefined && !!storage;
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!persist) return;
    try {
      storage!.setItem(storageKey, JSON.stringify({ views, defaultId }));
    } catch {
      /* quota or privacy mode: keep in-memory state */
    }
  }, [views, defaultId, persist, storage, storageKey]);

  return {
    views,
    defaultId,
    defaultView: views.find((v) => v.id === defaultId),
    save: (name: string, query: string) => {
      const view = { id: newId(), name: name.trim(), query };
      setViews((vs) => [...vs, view]);
      return view;
    },
    rename: (id: string, name: string) => setViews((vs) => vs.map((v) => (v.id === id ? { ...v, name: name.trim() } : v))),
    update: (id: string, query: string) => setViews((vs) => vs.map((v) => (v.id === id ? { ...v, query } : v))),
    remove: (id: string) => {
      setViews((vs) => vs.filter((v) => v.id !== id));
      if (defaultId === id) setDefaultId(null);
    },
    setDefault: (id: string | null) => setDefaultId(id),
  };
}

export interface SavedViewsProps extends UseSavedViewsOptions {
  /** Current raw query (used by "save current"). */
  query: string;
  onApply: (query: string, view: SavedView) => void;
  labels?: Partial<SavedViewsLabels>;
  className?: string;
}

export function SavedViews({ query, onApply, labels: labelsProp, className, ...opts }: SavedViewsProps) {
  const l = { ...defaultViewLabels, ...labelsProp };
  const sv = useSavedViews(opts);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [renaming, setRenaming] = React.useState<string | null>(null);
  const [renameValue, setRenameValue] = React.useState("");

  const commitRename = () => {
    if (renaming && renameValue.trim()) sv.rename(renaming, renameValue);
    setRenaming(null);
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button type="button" variant="secondary" size="sm" leftIcon={<Bookmark className="size-4" aria-hidden />} className={className}>
          {l.views}
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content align="end" sideOffset={4} collisionPadding={8} className="dropdown-menu z-50 w-72 p-2">
          {sv.views.length === 0 ? (
            <p className="px-2 py-1.5 text-sm text-muted">{l.empty}</p>
          ) : (
            <ul className="max-h-64 overflow-auto">
              {sv.views.map((v) => (
                <li key={v.id} className="flex items-center gap-1">
                  {renaming === v.id ? (
                    <form
                      className="flex flex-1 items-center gap-1"
                      onSubmit={(e) => {
                        e.preventDefault();
                        commitRename();
                      }}
                    >
                      <input
                        autoFocus
                        aria-label={l.renameView(v.name)}
                        className="form-input h-8 flex-1"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            e.stopPropagation();
                            setRenaming(null);
                          }
                        }}
                      />
                      <button type="submit" aria-label={l.confirm} className="p-1 text-muted hover:text-fg">
                        <Check className="size-4" aria-hidden />
                      </button>
                    </form>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={cn("dropdown-item flex-1 truncate text-start", v.query === query && "font-semibold")}
                        aria-current={v.query === query || undefined}
                        title={v.query}
                        onClick={() => {
                          onApply(v.query, v);
                          setOpen(false);
                        }}
                      >
                        {v.name}
                      </button>
                      <button
                        type="button"
                        aria-label={sv.defaultId === v.id ? l.unsetDefault(v.name) : l.setDefault(v.name)}
                        aria-pressed={sv.defaultId === v.id}
                        className={cn("p-1 hover:text-fg", sv.defaultId === v.id ? "text-primary" : "text-muted")}
                        onClick={() => sv.setDefault(sv.defaultId === v.id ? null : v.id)}
                      >
                        <Star className={cn("size-4", sv.defaultId === v.id && "fill-current")} aria-hidden />
                      </button>
                      <button
                        type="button"
                        aria-label={l.renameView(v.name)}
                        className="p-1 text-muted hover:text-fg"
                        onClick={() => {
                          setRenaming(v.id);
                          setRenameValue(v.name);
                        }}
                      >
                        <Pencil className="size-4" aria-hidden />
                      </button>
                      <button type="button" aria-label={l.remove(v.name)} className="p-1 text-muted hover:text-danger" onClick={() => sv.remove(v.id)}>
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          <form
            className="mt-2 flex items-center gap-1 border-t border-line pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              sv.save(name, query);
              setName("");
            }}
          >
            <input
              aria-label={l.name}
              placeholder={l.saveCurrent}
              className="form-input h-8 flex-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" size="sm" disabled={!name.trim()}>
              {l.save}
            </Button>
          </form>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

/* ── FilterBar ── */
export interface FilterBarLabels {
  label: string;
  placeholder: string;
  clear: string;
  removeFilter: (text: string) => string;
  editFilter: (text: string) => string;
  invalid: string;
  noSuggestions: string;
  negate: string;
}

const defaultLabels: FilterBarLabels = {
  label: "Filter",
  placeholder: "Filter… (e.g. status:open -label:wontfix)",
  clear: "Clear filter",
  removeFilter: (t) => `Remove filter ${t}`,
  editFilter: (t) => `Edit filter ${t}`,
  invalid: "Unknown or invalid filter",
  noSuggestions: "No suggestions",
  negate: "exclude",
};

export interface FilterBarProps {
  fields: FilterField[];
  /** Raw query string (controlled). */
  value?: string;
  defaultValue?: string;
  onChange?: (query: string, parsed: ParsedFilter) => void;
  /** Saved views: false hides the menu; an object configures persistence. */
  savedViews?: false | UseSavedViewsOptions;
  /** Apply the default saved view on mount when the query is empty. Default true. */
  applyDefaultView?: boolean;
  labels?: Partial<FilterBarLabels> & { views?: Partial<SavedViewsLabels> };
  disabled?: boolean;
  className?: string;
}

interface Suggestion {
  text: string;
  label: string;
  description?: string;
  commit: boolean;
}

function chipText(t: FilterToken): string {
  return serializeToken(t);
}

export function FilterBar({
  fields,
  value,
  defaultValue = "",
  onChange,
  savedViews,
  applyDefaultView = true,
  labels: labelsProp,
  disabled,
  className,
}: FilterBarProps) {
  const { views: viewLabels, ...barLabels } = labelsProp ?? {};
  const l = { ...defaultLabels, ...barLabels };
  const id = React.useId();
  const [query, setQuery] = useControllableState<string>({
    value,
    defaultValue,
    onChange: (q) => onChange?.(q, parseFilter(q)),
  });
  const [draft, setDraft] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [asyncOpts, setAsyncOpts] = React.useState<FilterOption[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const userNavigated = React.useRef(false);
  const root = React.useRef<HTMLDivElement>(null);

  const parsed = React.useMemo(() => parseFilter(query), [query]);
  const tokens = parsed.tokens;

  const svOpts = savedViews === false ? undefined : (savedViews ?? {});
  const defaultViewRef = React.useRef<SavedView | undefined>(undefined);
  const applyDefault = applyDefaultView && !!svOpts && !query && value === undefined;
  const defaultInit = React.useRef(false);
  React.useEffect(() => {
    if (defaultInit.current || !applyDefault) return;
    defaultInit.current = true;
    const st = svOpts?.storage === null ? undefined : (svOpts?.storage ?? localStorageAdapter());
    const stored = readStored(st, svOpts?.storageKey ?? "pilab.savedViews");
    const views = svOpts?.views ?? stored.views;
    const did = svOpts?.defaultViewId !== undefined ? svOpts.defaultViewId : stored.defaultId;
    defaultViewRef.current = views.find((v) => v.id === did);
    if (defaultViewRef.current) setQuery(defaultViewRef.current.query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = (list: FilterToken[]) => setQuery(serializeFilter(list));

  // Draft analysis
  const neg = draft.startsWith("-") && draft.length > 0;
  const body = neg ? draft.slice(1) : draft;
  const colon = body.indexOf(":");
  const field = colon > 0 ? findField(fields, body.slice(0, colon)) : undefined;
  const valuePart = colon > 0 ? body.slice(colon + 1) : "";
  const lastSegment = field && (field.multiple ?? true) ? valuePart.slice(valuePart.lastIndexOf(",") + 1) : valuePart;
  const lastQuery = lastSegment.replace(/^(>=|<=|>|<)/, "").replace(/^"/, "");

  React.useEffect(() => {
    if (!field || typeof field.options !== "function") {
      setAsyncOpts([]);
      return;
    }
    let cancelled = false;
    const h = window.setTimeout(async () => {
      const r = await (field.options as (q: string) => FilterOption[] | Promise<FilterOption[]>)(lastQuery);
      if (!cancelled) setAsyncOpts(r);
    }, 150);
    return () => {
      cancelled = true;
      window.clearTimeout(h);
    };
  }, [field, lastQuery]);

  const suggestions: Suggestion[] = React.useMemo(() => {
    if (!open) return [];
    const prefix = neg ? "-" : "";
    if (colon < 0) {
      const q = body.toLowerCase();
      return fields
        .filter((f) => !q || f.key.toLowerCase().includes(q) || (f.label ?? "").toLowerCase().includes(q))
        .map((f) => ({ text: `${prefix}${f.key}:`, label: `${f.key}:`, description: f.description ?? f.label, commit: false }));
    }
    if (!field) return [];
    const opts = fieldOptions(field) ?? asyncOpts;
    const q = lastQuery.toLowerCase();
    const head = draft.slice(0, draft.length - lastSegment.length);
    return opts
      .filter((o) => !q || o.value.toLowerCase().includes(q) || (o.label ?? "").toLowerCase().includes(q))
      .map((o) => ({
        text: `${head}${serializeValue(o.value)}`,
        label: o.label ?? o.value,
        description: o.description,
        commit: true,
      }));
  }, [open, fields, body, colon, field, asyncOpts, lastQuery, lastSegment, draft, neg]);

  React.useEffect(() => setActive(0), [draft]);

  const commitDraft = (text: string) => {
    const add = parseFilter(text).tokens;
    if (add.length) emit([...tokens, ...add]);
    setDraft("");
    setOpen(false);
  };

  const pick = (s: Suggestion) => {
    if (s.commit) commitDraft(s.text);
    else {
      setDraft(s.text);
      setOpen(true);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const sug = suggestions[active];
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, Math.max(suggestions.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Tab" && open && sug && draft && !e.shiftKey) {
      e.preventDefault();
      pick(sug);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && sug && userNavigated.current) {
        userNavigated.current = false;
        pick(sug);
        return;
      }
      if (draft.trim()) commitDraft(draft);
    } else if (e.key === " " && colon > 0 && field && !/"[^"]*$/.test(draft) && lastSegment) {
      e.preventDefault();
      commitDraft(draft);
    } else if (e.key === "Escape") {
      if (open) {
        e.stopPropagation();
        setOpen(false);
      } else if (draft) setDraft("");
    } else if (e.key === "Backspace" && !draft && tokens.length) {
      e.preventDefault();
      const last = tokens[tokens.length - 1]!;
      emit(tokens.slice(0, -1));
      setDraft(chipText(last));
    }
  };

  const editToken = (i: number) => {
    const t = tokens[i]!;
    emit(tokens.filter((_, j) => j !== i));
    setDraft(chipText(t));
    setOpen(true);
    inputRef.current?.focus();
  };
  const removeToken = (i: number) => {
    emit(tokens.filter((_, j) => j !== i));
    inputRef.current?.focus();
  };

  const listId = `${id}-list`;
  const showClear = (tokens.length > 0 || draft) && !disabled;

  return (
    <div className={cn("flex items-start gap-2", className)}>
      <PopoverPrimitive.Root open={open && suggestions.length > 0} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div
            ref={root}
            role="group"
            aria-label={l.label}
            className="form-input flex min-h-9 flex-1 flex-wrap items-center gap-1.5 focus-within:border-primary"
            onClick={(e) => {
              if (e.target === e.currentTarget) inputRef.current?.focus();
            }}
          >
            {tokens.map((t, i) => {
              const text = chipText(t);
              const bad = tokenInvalid(t, fields);
              return (
                <span
                  key={`${i}-${text}`}
                  data-testid="filter-chip"
                  data-invalid={bad || undefined}
                  className={cn(
                    "inline-flex h-6 items-center rounded-sm border text-xs",
                    bad ? "border-danger text-danger" : "border-line bg-muted-bg",
                    t.type === "field" && t.negated && "line-through decoration-1",
                  )}
                >
                  <button
                    type="button"
                    disabled={disabled}
                    aria-label={l.editFilter(text)}
                    title={bad ? l.invalid : undefined}
                    className="px-2 outline-none focus-visible:underline"
                    onClick={() => editToken(i)}
                  >
                    {text}
                  </button>
                  <button
                    type="button"
                    disabled={disabled}
                    aria-label={l.removeFilter(text)}
                    className="pe-1.5 text-muted hover:text-fg"
                    onClick={() => removeToken(i)}
                  >
                    <X className="size-3" aria-hidden />
                  </button>
                </span>
              );
            })}
            <input
              ref={inputRef}
              role="combobox"
              aria-label={l.label}
              aria-expanded={open && suggestions.length > 0}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={open && suggestions[active] ? `${id}-${active}` : undefined}
              autoComplete="off"
              spellCheck={false}
              disabled={disabled}
              className="min-w-32 flex-1 border-0 bg-transparent p-0 text-fg outline-none"
              placeholder={tokens.length ? undefined : l.placeholder}
              value={draft}
              onChange={(e) => {
                userNavigated.current = false;
                setDraft(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => {
                if (draft.trim()) commitDraft(draft);
                setOpen(false);
              }}
              onKeyDownCapture={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") userNavigated.current = true;
              }}
              onKeyDown={onKeyDown}
            />
            {showClear && (
              <button
                type="button"
                aria-label={l.clear}
                className="text-muted hover:text-fg"
                onClick={() => {
                  setQuery("");
                  setDraft("");
                  inputRef.current?.focus();
                }}
              >
                <X className="size-4" aria-hidden />
              </button>
            )}
          </div>
        </PopoverPrimitive.Anchor>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            sideOffset={4}
            align="start"
            collisionPadding={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (root.current?.contains(e.target as Node)) e.preventDefault();
            }}
            className="z-50 w-(--radix-popover-trigger-width)"
          >
            <ul id={listId} role="listbox" aria-label={l.label} className="dropdown-menu max-h-64 w-full overflow-auto">
              {suggestions.map((s, i) => (
                <li
                  key={s.text}
                  id={`${id}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={cn("dropdown-item cursor-pointer", i === active && "bg-surface-hover text-fg")}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(s)}
                >
                  <span>{s.label}</span>
                  {s.description && <span className="ms-2 text-xs text-subtle">{s.description}</span>}
                </li>
              ))}
            </ul>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
      {svOpts && (
        <SavedViews
          {...svOpts}
          labels={viewLabels}
          query={query}
          onApply={(q) => {
            setQuery(q);
            setDraft("");
          }}
        />
      )}
    </div>
  );
}
