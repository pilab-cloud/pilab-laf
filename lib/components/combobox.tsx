import { Command } from "cmdk";
import { ChevronDown, X } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { useControllableState } from "../utils";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { uiEn } from "../messages/ui.en";

const lafDefaults = { ui: uiEn };

/* ── Combobox v2 (cmdk inside a portaled Radix Popover; single or multi, async) ── */
export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  group?: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[] | ((query: string) => ComboboxOption[] | Promise<ComboboxOption[]>);
  value: ComboboxOption[];
  onChange: (value: ComboboxOption[]) => void;
  multiple?: boolean;
  label: string;
  placeholder?: string;
  emptyText?: string;
  loadingText?: string;
  disabled?: boolean;
  /** Offer a "Create “query”" row; receives the typed text. */
  onCreate?: (query: string) => void;
  createLabel?: (query: string) => string;
  clearable?: boolean;
  clearLabel?: string;
  renderOption?: (option: ComboboxOption, state: { selected: boolean }) => React.ReactNode;
  /** Controlled open state; omit for uncontrolled. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/** Rendered rows are capped so very large option sets stay responsive. */
const MAX_RENDERED = 200;

export function Combobox({
  options,
  value,
  onChange,
  multiple,
  label,
  placeholder,
  emptyText: emptyTextProp,
  loadingText: loadingTextProp,
  disabled,
  onCreate,
  createLabel: createLabelProp,
  clearable,
  clearLabel: clearLabelProp,
  renderOption,
  open: openProp,
  onOpenChange,
  className,
}: ComboboxProps) {
  const { t } = useLafDefaults(lafDefaults);
  const createLabel = createLabelProp ?? t.components.ui.combobox.create;
  const clearLabel = clearLabelProp ?? t.components.ui.combobox.clear;
  const emptyText = emptyTextProp ?? t.noResults;
  const loadingText = loadingTextProp ?? `${t.loading}…`;
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = useControllableState<boolean>({ value: openProp, defaultValue: false, onChange: onOpenChange });
  const [asyncList, setAsyncList] = React.useState<ComboboxOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const root = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  // cmdk hardcodes aria-expanded="true" and aria-controls on its input; the listbox is unmounted while closed.
  React.useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.setAttribute("aria-expanded", String(open));
    if (!open) el.removeAttribute("aria-controls");
  });
  const isFn = typeof options === "function";
  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  const syncList = React.useMemo(() => {
    if (isFn) return [];
    const q = query.trim().toLowerCase();
    return (options as ComboboxOption[]).filter((o) => !q || (o.label + " " + (o.description ?? "")).toLowerCase().includes(q));
  }, [options, query, isFn]);

  React.useEffect(() => {
    if (!open || !isFn) return;
    let cancelled = false;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const res = await (optionsRef.current as (q: string) => ComboboxOption[] | Promise<ComboboxOption[]>)(query);
        if (!cancelled) setAsyncList(res);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, open, isFn]);

  const list = isFn ? asyncList : syncList;
  const shown = list.slice(0, MAX_RENDERED);
  const isSelected = (o: ComboboxOption) => value.some((v) => v.value === o.value);
  const pick = (o: ComboboxOption) => {
    if (isSelected(o)) onChange(value.filter((v) => v.value !== o.value));
    else if (multiple) onChange([...value, o]);
    else {
      onChange([o]);
      setOpen(false);
    }
    setQuery("");
  };

  const q = query.trim();
  const canCreate = !!onCreate && !!q && !list.some((o) => o.label.toLowerCase() === q.toLowerCase());
  const groups = React.useMemo(() => {
    const m = new Map<string, ComboboxOption[]>();
    for (const o of shown) m.set(o.group ?? "", [...(m.get(o.group ?? "") ?? []), o]);
    return [...m.entries()];
  }, [shown]);

  const renderRow = (o: ComboboxOption) => {
    const selected = isSelected(o);
    return (
      <Command.Item
        key={o.value}
        value={o.value}
        disabled={o.disabled}
        keywords={[o.label]}
        onSelect={() => pick(o)}
        onMouseDown={(e) => e.preventDefault()}
        className={cn("dropdown-item cursor-pointer data-[selected=true]:bg-surface-hover data-[selected=true]:text-fg data-[disabled=true]:opacity-50", selected && "font-semibold")}
      >
        {renderOption ? (
          renderOption(o, { selected })
        ) : (
          <>
            <span>{o.label}</span>
            {o.description && <span className="ms-2 text-xs text-subtle">{o.description}</span>}
          </>
        )}
        {selected && <span aria-hidden className="ms-auto text-primary">✓</span>}
      </Command.Item>
    );
  };

  return (
    <Command shouldFilter={false} label={label} loop className={cn("contents", className)}>
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div ref={root} className="relative">
            <div className="form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary">
              {value.map((v) => (
                <span key={v.value} className="inline-flex h-6 items-center gap-1 rounded-sm border border-line bg-muted-bg px-2 text-xs">
                  {v.label}
                  {multiple && (
                    <button type="button" aria-label={t.removeItem(v.label)} disabled={disabled} className="text-muted hover:text-fg" onClick={() => pick(v)}>
                      <X className="size-3" aria-hidden />
                    </button>
                  )}
                </span>
              ))}
              <Command.Input
                ref={inputRef}
                aria-label={label}
                className="min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none"
                placeholder={value.length && multiple ? undefined : placeholder}
                disabled={disabled}
                value={query}
                onValueChange={(v) => {
                  setQuery(v);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpen(false);
                  else if (e.key === "Backspace" && !query && value.length && multiple) onChange(value.slice(0, -1));
                }}
              />
              {clearable && value.length > 0 && !disabled && (
                <button type="button" aria-label={clearLabel} className="text-muted hover:text-fg" onClick={() => onChange([])}>
                  <X className="size-3.5" aria-hidden />
                </button>
              )}
              <ChevronDown className="size-4 text-muted" aria-hidden />
            </div>
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
            <Command.List className="dropdown-menu max-h-64 w-full overflow-auto">
              {loading && !list.length ? (
                <div className="px-3 py-2 text-sm text-muted">{loadingText}</div>
              ) : (
                <>
                  {!list.length && !canCreate && <div className="px-3 py-2 text-sm text-muted">{emptyText}</div>}
                  {groups.map(([g, opts]) =>
                    g ? (
                      <Command.Group key={g} heading={g} className="[&_[cmdk-group-heading]]:dropdown-label">
                        {opts.map(renderRow)}
                      </Command.Group>
                    ) : (
                      opts.map(renderRow)
                    ),
                  )}
                  {list.length > MAX_RENDERED && <div className="px-3 py-2 text-xs text-subtle">{list.length - MAX_RENDERED}+ more — keep typing to refine</div>}
                  {canCreate && (
                    <Command.Item
                      value={`__create__${q}`}
                      onSelect={() => {
                        onCreate!(q);
                        setQuery("");
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      className="dropdown-item cursor-pointer data-[selected=true]:bg-surface-hover data-[selected=true]:text-fg"
                    >
                      {createLabel(q)}
                    </Command.Item>
                  )}
                </>
              )}
            </Command.List>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </Command>
  );
}
