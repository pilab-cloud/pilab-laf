import { Laptop, Smartphone, Tablet, KeyRound, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Avatar } from "./display";
import { useLaf } from "../i18n";

/* ── User selector (ARIA 1.2 combobox, single or multi) ── */
export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface UserSelectorProps {
  value: User[];
  onChange: (value: User[]) => void;
  /** Resolve candidates for a query; may be async. */
  onSearch: (query: string) => User[] | Promise<User[]>;
  multiple?: boolean;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

export function UserSelector({
  value,
  onChange,
  onSearch,
  multiple = true,
  max,
  placeholder: placeholderProp,
  disabled,
  label: labelProp,
}: UserSelectorProps) {
  const { t } = useLaf();
  const placeholder = placeholderProp ?? t.searchUsers;
  const label = labelProp ?? t.users;
  const id = React.useId();
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const root = React.useRef<HTMLDivElement>(null);
  const limitReached = max !== undefined && value.length >= max;

  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    const t = setTimeout(async () => {
      const res = await onSearch(query);
      if (!cancelled) {
        setOptions(res);
        setActive(0);
        setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query, open, onSearch]);

  React.useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const selected = (u: User) => value.some((v) => v.id === u.id);
  const toggle = (u: User) => {
    if (selected(u)) onChange(value.filter((v) => v.id !== u.id));
    else if (!multiple) {
      onChange([u]);
      setOpen(false);
    } else if (!limitReached) onChange([...value, u]);
    setQuery("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && open && options[active]) {
      e.preventDefault();
      toggle(options[active]!);
    } else if (e.key === "Escape") setOpen(false);
    else if (e.key === "Backspace" && !query && value.length) onChange(value.slice(0, -1));
  };

  return (
    <div className="selector" ref={root}>
      <div className="selector-field" onClick={() => setOpen(true)}>
        {value.map((u) => (
          <span key={u.id} className="chip">
            <Avatar name={u.name} size="sm" />
            {u.name}
            <button type="button" aria-label={t.removeItem(u.name)} disabled={disabled} onClick={() => toggle(u)}>
              <X className="size-3" aria-hidden />
            </button>
          </span>
        ))}
        <input
          role="combobox"
          aria-label={label}
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-activedescendant={open && options[active] ? `${id}-${options[active]!.id}` : undefined}
          aria-autocomplete="list"
          disabled={disabled}
          value={query}
          placeholder={value.length ? "" : placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </div>
      {open && (
        <div className="selector-menu" role="listbox" id={`${id}-list`} aria-multiselectable={multiple}>
          {limitReached && <div className="px-3 py-2 text-xs text-warn">Limit of {max} reached</div>}
          {loading && !options.length ? (
            <div className="px-3 py-2 text-sm text-muted">Searching…</div>
          ) : options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted">No users match “{query}”</div>
          ) : (
            options.map((u, i) => (
              <button
                key={u.id}
                id={`${id}-${u.id}`}
                type="button"
                role="option"
                aria-selected={selected(u)}
                className={cn("option", i === active && "is-active")}
                onMouseEnter={() => setActive(i)}
                onClick={() => toggle(u)}
              >
                <Avatar name={u.name} />
                <span className="option-main">
                  <span className="option-title">{u.name}</span>
                  {u.email && <span className="option-sub">{u.email}</span>}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ── Device selector (radio cards) ── */
export type DeviceKind = "phone" | "laptop" | "tablet" | "key";

export interface Device {
  id: string;
  name: string;
  detail?: string;
  kind: DeviceKind;
  badge?: React.ReactNode;
}

const deviceIcon = { phone: Smartphone, laptop: Laptop, tablet: Tablet, key: KeyRound };

export function DeviceSelector({
  devices,
  value,
  onValueChange,
  name,
  legend,
}: {
  devices: Device[];
  value?: string;
  onValueChange: (id: string) => void;
  name: string;
  legend: string;
}) {
  return (
    <fieldset className="device-list border-0 p-0">
      <legend className="sr-only">{legend}</legend>
      {devices.map((d) => {
        const Icon = deviceIcon[d.kind];
        return (
          <label key={d.id} className="device-option">
            <input type="radio" name={name} value={d.id} checked={value === d.id} onChange={() => onValueChange(d.id)} />
            <span className="device-icon">
              <Icon aria-hidden />
            </span>
            <span className="device-meta">
              <span className="device-name">{d.name}</span>
              {d.detail && <span className="device-sub">{d.detail}</span>}
            </span>
            {d.badge}
            <span className="device-radio" aria-hidden />
          </label>
        );
      })}
    </fieldset>
  );
}
