import { Laptop, Smartphone, Tablet, KeyRound } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Avatar } from "./display";
import { useLaf } from "../i18n";
import { Combobox, type ComboboxOption } from "./combobox";

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
  const limitReached = max !== undefined && value.length >= max;
  const known = React.useRef(new Map<string, User>());
  const toOption = (u: User): ComboboxOption => {
    known.current.set(u.id, u);
    return { value: u.id, label: u.name, description: u.email };
  };
  const search = React.useCallback(
    async (q: string) => (await onSearch(q)).map(toOption),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSearch],
  );
  const opts = value.map(toOption);
  return (
    <Combobox
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      multiple={multiple}
      options={search}
      value={opts}
      emptyText={limitReached ? `Limit of ${max} reached` : undefined}
      renderOption={(o) => (
        <>
          <Avatar name={o.label} />
          <span className="flex flex-col">
            <span>{o.label}</span>
            {o.description && <span className="text-xs text-subtle">{o.description}</span>}
          </span>
        </>
      )}
      onChange={(next) => {
        if (multiple && max !== undefined && next.length > max) return;
        onChange(next.map((o) => known.current.get(o.value)!).filter(Boolean));
      }}
    />
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
