import { AlertTriangle, ChevronDown, Info, Minus, Plus, X, XCircle } from "lucide-react";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { Input } from "./form";
import { Combobox, type ComboboxOption } from "./inventory";
import { VirtualList } from "./virtual";
import { useLaf } from "../i18n";

/* ── Banner (global) ── */
const bannerTone = {
  info: { cls: "border-primary/35 bg-primary-light text-primary", Icon: Info },
  warn: { cls: "border-warn-line bg-warn-bg text-warn", Icon: AlertTriangle },
  danger: { cls: "border-danger-line bg-danger-bg text-danger", Icon: XCircle },
};

export function Banner({
  tone = "info",
  action,
  onDismiss,
  dismissLabel = "Dismiss",
  children,
}: {
  tone?: keyof typeof bannerTone;
  action?: React.ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
  children: React.ReactNode;
}) {
  const { cls, Icon } = bannerTone[tone];
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cn("flex items-center gap-2.5 border-b px-4 py-2 text-sm", cls)}>
      <Icon className="size-4 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">{children}</div>
      {action}
      {onDismiss && (
        <button type="button" aria-label={dismissLabel} onClick={onDismiss} className="opacity-80 hover:opacity-100">
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

/* ── Accordion (single or multiple) ── */
export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export function Accordion({
  items,
  multiple,
  defaultOpen = [],
  open: openProp,
  onOpenChange,
  className,
}: {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  /** Controlled open item ids; omit for uncontrolled. */
  open?: string[];
  onOpenChange?: (ids: string[]) => void;
  className?: string;
}) {
  const [open, setOpen] = useControllableState<string[]>({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const uid = React.useId();
  const toggle = (id: string) =>
    setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : multiple ? [...o, id] : [id]));
  return (
    <div className={cn("divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", className)}>
      {items.map((it) => {
        const isOpen = open.includes(it.id);
        return (
          <div key={it.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${it.id}`}
                onClick={() => toggle(it.id)}
                className="flex w-full items-center gap-2 px-4 py-3 text-start text-sm font-medium text-fg hover:bg-surface-hover"
              >
                <span className="flex-1">{it.title}</span>
                <ChevronDown className={cn("size-4 transition-transform motion-reduce:transition-none", isOpen && "rotate-180")} aria-hidden />
              </button>
            </h3>
            <div id={`${uid}-${it.id}`} hidden={!isOpen} className="border-t border-line px-4 py-3 text-sm text-muted">
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Split pane (horizontal, keyboard-resizable) ── */
export function SplitPane({
  start,
  end,
  defaultSize = 280,
  min = 160,
  max = 600,
  label = "Resize panels",
  className,
}: {
  start: React.ReactNode;
  end: React.ReactNode;
  defaultSize?: number;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}) {
  const [size, setSize] = React.useState(defaultSize);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startSize = size;
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    const move = (ev: PointerEvent) => setSize(clamp(startSize + (rtl ? -1 : 1) * (ev.clientX - startX)));
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 50 : 10;
    if (e.key === "ArrowLeft") setSize((s) => clamp(s - step));
    else if (e.key === "ArrowRight") setSize((s) => clamp(s + step));
    else return;
    e.preventDefault();
  };
  return (
    <div className={cn("flex min-h-0 overflow-hidden rounded-lg border border-line bg-surface", className)}>
      {/* dynamic user-resizable width */}
      <div className="shrink-0 overflow-auto" style={{ width: size }}>
        {start}
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={label}
        aria-valuenow={size}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        onDoubleClick={() => setSize(defaultSize)}
        className="w-1 shrink-0 cursor-col-resize touch-none bg-line outline-none hover:bg-primary focus-visible:bg-primary"
      />
      <div className="min-w-0 flex-1 overflow-auto">{end}</div>
    </div>
  );
}

/* ── Drawer ── */
export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

export function DrawerContent({
  title,
  description,
  footer,
  width = "md",
  children,
}: {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  width?: "sm" | "md" | "lg";
  children: React.ReactNode;
}) {
  const { t: laf } = useLaf();
  const w = { sm: "w-[360px]", md: "w-[480px]", lg: "w-[640px]" }[width];
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" />
      <DialogPrimitive.Content
        {...(description ? {} : { "aria-describedby": undefined })}
        className={cn("fixed inset-y-0 end-0 z-50 flex max-w-full flex-col border-s border-line-strong bg-menu", w)}
      >
        <div className="flex items-start gap-3 border-b border-line px-5 py-4">
          <div className="flex-1">
            <DialogPrimitive.Title className="text-base font-semibold text-fg">{title}</DialogPrimitive.Title>
            {description && <DialogPrimitive.Description className="text-sm text-muted">{description}</DialogPrimitive.Description>}
          </div>
          <DialogPrimitive.Close aria-label={laf.close} className="popup-close">
            <X className="size-4" aria-hidden />
          </DialogPrimitive.Close>
        </div>
        <div className="flex-1 overflow-auto px-5 py-4 text-sm text-muted">{children}</div>
        {footer && <div className="flex justify-end gap-2.5 border-t border-line px-5 py-3.5">{footer}</div>}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

/* ── Number & unit input, Slider ── */
export interface UnitOption {
  label: string;
  /** multiplier to the base unit */
  factor: number;
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  units,
  unit,
  onUnitChange,
  label,
}: {
  /** value in the base unit when `units` is used */
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  units?: UnitOption[];
  unit?: string;
  onUnitChange?: (unit: string) => void;
  label: string;
}) {
  const factor = units?.find((u) => u.label === unit)?.factor ?? 1;
  const shown = value / factor;
  const [text, setText] = React.useState(String(shown));
  React.useEffect(() => setText(String(shown)), [shown]);
  const commit = (n: number) => onChange(Math.min(max, Math.max(min, n * factor)));
  const bump = (d: number) => commit(shown + d * step);
  return (
    <div className="inline-flex items-stretch gap-1.5">
      <button type="button" className="btn btn-secondary btn-sm auto" aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => bump(-1)}>
        <Minus aria-hidden />
      </button>
      <Input
        inputMode="decimal"
        aria-label={label}
        className="w-24 text-end font-mono tabular-nums"
        value={text}
        invalid={Number.isNaN(Number(text)) || Number(text) * factor < min || Number(text) * factor > max}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          const n = Number(text);
          if (Number.isNaN(n)) setText(String(shown));
          else commit(n);
        }}
      />
      <button type="button" className="btn btn-secondary btn-sm auto" aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => bump(1)}>
        <Plus aria-hidden />
      </button>
      {units && (
        <select className="form-input w-20" aria-label={`${label} unit`} value={unit} onChange={(e) => onUnitChange?.(e.target.value)}>
          {units.map((u) => (
            <option key={u.label}>{u.label}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export function Slider({ className, ...props }: Omit<React.ComponentProps<"input">, "type">) {
  return <input type="range" className={cn("h-1 w-full cursor-pointer accent-primary", className)} {...props} />;
}

/* ── Tag input & chips ── */
export function Chip({ onRemove, removeLabel, children }: { onRemove?: () => void; removeLabel?: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center gap-1 rounded-sm border border-line bg-muted-bg px-2 text-xs text-fg">
      {children}
      {onRemove && (
        <button type="button" aria-label={removeLabel ?? "Remove"} onClick={onRemove} className="text-muted hover:text-fg">
          <X className="size-3" aria-hidden />
        </button>
      )}
    </span>
  );
}

export function TagInput({
  value,
  onChange,
  label,
  placeholder,
  max,
  validate,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  placeholder?: string;
  max?: number;
  /** Return an error message to reject a tag. */
  validate?: (tag: string) => string | undefined;
}) {
  const { t: laf } = useLaf();
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState<string>();
  const add = (raw: string) => {
    const tags = raw.split(/[,\s]+/).map((t) => t.trim()).filter(Boolean);
    let next = [...value];
    for (const t of tags) {
      const err = next.includes(t) ? `"${t}" already added` : validate?.(t);
      if (err) return setError(err);
      if (max === undefined || next.length < max) next.push(t);
    }
    setError(undefined);
    onChange(next);
    setText("");
  };
  return (
    <div className="grid gap-1">
      <div className={cn("form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary", error && "error")}>
        {value.map((t) => (
          <Chip key={t} removeLabel={laf.removeItem(t)} onRemove={() => onChange(value.filter((v) => v !== t))}>
            {t}
          </Chip>
        ))}
        <input
          aria-label={label}
          aria-invalid={!!error || undefined}
          placeholder={placeholder}
          className="min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === ",") && text) {
              e.preventDefault();
              add(text);
            } else if (e.key === "Backspace" && !text && value.length) onChange(value.slice(0, -1));
          }}
          onPaste={(e) => {
            e.preventDefault();
            add(e.clipboardData.getData("text"));
          }}
        />
      </div>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Key-value editor ── */
export interface KeyValue {
  key: string;
  value: string;
}

export function KeyValueEditor({
  value,
  onChange,
  addLabel = "Add",
  keyLabel = "Key",
  valueLabel = "Value",
  duplicateMessage = "Duplicate key",
}: {
  value: KeyValue[];
  onChange: (value: KeyValue[]) => void;
  addLabel?: string;
  keyLabel?: string;
  valueLabel?: string;
  duplicateMessage?: string;
}) {
  const { t: laf } = useLaf();
  const ids = React.useRef<number[]>([]);
  const next = React.useRef(0);
  while (ids.current.length < value.length) ids.current.push(next.current++);
  ids.current.length = value.length;
  const set = (i: number, patch: Partial<KeyValue>) => onChange(value.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const dup = (i: number) => value[i]!.key !== "" && value.findIndex((r) => r.key === value[i]!.key) !== i;
  return (
    <div className="grid gap-2">
      {value.map((row, i) => (
        <div key={ids.current[i]} className="grid grid-cols-[1fr_1fr_auto] items-start gap-2">
          <div>
            <Input aria-label={`${keyLabel} ${i + 1}`} className="font-mono" invalid={dup(i)} value={row.key} onChange={(e) => set(i, { key: e.target.value })} />
            {dup(i) && <p className="field-error" role="alert">{duplicateMessage}</p>}
          </div>
          <Input aria-label={`${valueLabel} ${i + 1}`} className="font-mono" value={row.value} onChange={(e) => set(i, { value: e.target.value })} />
          <button type="button" className="btn btn-ghost btn-sm auto" aria-label={laf.removeRow(i + 1)} onClick={() => {
              ids.current.splice(i, 1);
              onChange(value.filter((_, j) => j !== i));
            }}>
            <X aria-hidden />
          </button>
        </div>
      ))}
      <div>
        <button type="button" className="btn btn-secondary btn-sm auto" onClick={() => onChange([...value, { key: "", value: "" }])}>
          <Plus aria-hidden />
          {addLabel}
        </button>
      </div>
    </div>
  );
}

/* ── Charts: sparkline & line/area chart (SVG) ── */
export function Sparkline({ data, label, className }: { data: number[]; label: string; className?: string }) {
  const w = 100;
  const h = 24;
  const min = Math.min(...data);
  const span = Math.max(...data) - min || 1;
  const pts = data.map((d, i) => `${(i / Math.max(1, data.length - 1)) * w},${h - 2 - ((d - min) / span) * (h - 4)}`);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className={cn("h-6 w-24 text-primary", className)} preserveAspectRatio="none">
      <polyline points={pts.join(" ")} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export interface ChartSeries {
  name: string;
  data: number[];
}

const SERIES_COLORS = ["text-primary", "text-ok", "text-warn", "text-danger"];
const SERIES_DASH = [undefined, "4 2", "1 3", "6 2 1 2"];

export function LineChart({
  series,
  xLabels,
  label,
  unit = "",
  className,
}: {
  series: ChartSeries[];
  xLabels: string[];
  label: string;
  unit?: string;
  className?: string;
}) {
  const w = 400;
  const h = 160;
  const pad = { l: 36, r: 8, t: 8, b: 20 };
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all, 1);
  const n = xLabels.length;
  const x = (i: number) => pad.l + (i / Math.max(1, n - 1)) * (w - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
  const [hover, setHover] = React.useState<number>();
  const ticks = [0, 0.5, 1].map((t) => t * max);
  return (
    <figure className={cn("m-0 max-w-xl", className)}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={`${label}: ${series.map((s) => `${s.name} latest ${s.data[s.data.length - 1]}${unit}`).join(", ")}`}
        className="w-full"
        onMouseLeave={() => setHover(undefined)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = ((e.clientX - r.left) / r.width) * w;
          setHover(Math.min(n - 1, Math.max(0, Math.round(((px - pad.l) / (w - pad.l - pad.r)) * (n - 1)))));
        }}
      >
        {ticks.map((t) => (
          <g key={t} className="text-subtle">
            <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
            <text x={pad.l - 4} y={y(t) + 3} textAnchor="end" fontSize="9" fill="currentColor">
              {Math.round(t)}
            </text>
          </g>
        ))}
        {xLabels.map((l, i) =>
          i % Math.ceil(n / 6) === 0 ? (
            <text key={i} x={x(i)} y={h - 6} textAnchor={i === n - 1 ? "end" : i === 0 ? "start" : "middle"} fontSize="9" className="fill-subtle">
              {l}
            </text>
          ) : null,
        )}
        {series.map((s, si) => (
          <polyline
            key={s.name}
            className={SERIES_COLORS[si % 4]}
            points={s.data.map((d, i) => `${x(i)},${y(d)}`).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray={SERIES_DASH[si % 4]}
          />
        ))}
        {hover !== undefined && <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={h - pad.b} stroke="var(--border-strong)" />}
      </svg>
      <figcaption className="mt-1 flex flex-wrap items-center gap-x-4 text-xs text-muted" aria-live="off">
        {series.map((s, si) => (
          <span key={s.name} className="inline-flex items-center gap-1.5">
            <svg width="16" height="4" className={SERIES_COLORS[si % 4]} aria-hidden>
              <line x1="0" x2="16" y1="2" y2="2" stroke="currentColor" strokeWidth="2" strokeDasharray={SERIES_DASH[si % 4]} />
            </svg>
            {s.name}
            {hover !== undefined && (
              <b className="font-mono text-fg">
                {s.data[hover]}
                {unit}
              </b>
            )}
          </span>
        ))}
        {hover !== undefined && <span className="ms-auto font-mono text-subtle">{xLabels[hover]}</span>}
      </figcaption>
    </figure>
  );
}

/* ── Time-range picker ── */
export function TimeRangePicker({
  value,
  onChange,
  presets = ["15m", "1h", "24h", "7d"],
  refresh,
  onRefreshChange,
  label = "Time range",
}: {
  value: string;
  onChange: (value: string) => void;
  presets?: string[];
  refresh?: string;
  onRefreshChange?: (value: string) => void;
  label?: string;
}) {
  const { t: laf } = useLaf();
  return (
    <div role="group" aria-label={label} className="inline-flex items-center gap-2">
      <div className="inline-flex overflow-hidden rounded-md border border-line">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={value === p}
            onClick={() => onChange(p)}
            className={cn("border-0 border-e border-line bg-input px-3 py-1.5 text-sm text-muted last:border-e-0 hover:text-fg", value === p && "bg-primary-light text-primary")}
          >
            {p}
          </button>
        ))}
      </div>
      {onRefreshChange && (
        <select className="form-input w-24" aria-label={laf.autoRefresh} value={refresh} onChange={(e) => onRefreshChange(e.target.value)}>
          {["off", "5s", "30s", "1m"].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      )}
    </div>
  );
}

/* ── Log viewer ── */
export interface LogLine {
  time: string;
  level: "info" | "warn" | "error";
  text: string;
}

const levelCls = { info: "text-muted", warn: "text-warn", error: "text-danger" };

export function LogViewer({ lines, label, follow = true, className }: { lines: LogLine[]; label: string; follow?: boolean; className?: string }) {
  const { t: laf } = useLaf();
  const [query, setQuery] = React.useState("");
  const [wrap, setWrap] = React.useState(false);
  const box = React.useRef<HTMLDivElement>(null);
  const shown = query ? lines.filter((l) => l.text.toLowerCase().includes(query.toLowerCase())) : lines;
  React.useEffect(() => {
    if (follow && box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [shown.length, follow]);
  return (
    <div className={cn("overflow-hidden rounded-lg border border-line", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-surface px-3 py-2">
        <input type="search" aria-label={`${laf.search} ${label}`} placeholder={`${laf.search}…`} className="form-input h-8 max-w-xs" value={query} onChange={(e) => setQuery(e.target.value)} />
        <label className="check ms-auto text-xs">
          <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} />
          Wrap
        </label>
      </div>
      {shown.length > 500 && !wrap ? (
        <VirtualList
          label={label}
          items={shown}
          rowHeight={20}
          height={288}
          className="bg-black/30 font-mono text-[0.8125rem]"
          renderRow={(l) => (
            <div className={cn("flex gap-3 px-3 whitespace-nowrap", levelCls[l.level])}>
              <span className="text-subtle select-none">{l.time}</span>
              <span>{l.text}</span>
            </div>
          )}
        />
      ) : (
        <div ref={box} role="log" aria-label={label} tabIndex={0} className="max-h-72 overflow-auto bg-black/30 p-3 font-mono text-[0.8125rem]">
          {shown.map((l, i) => (
            <div key={i} className={cn("flex gap-3", levelCls[l.level], !wrap && "whitespace-nowrap")}>
              <span className="text-subtle select-none">{l.time}</span>
              <span className={wrap ? "break-all" : undefined}>{l.text}</span>
            </div>
          ))}
          {shown.length === 0 && <div className="text-subtle">No lines</div>}
        </div>
      )}
    </div>
  );
}

/* ── Tenant switcher (Combobox wrapper) ── */
export function TenantSwitcher({
  tenants,
  current,
  onSwitch,
  label = "Tenant",
}: {
  tenants: ComboboxOption[];
  current: string;
  onSwitch: (id: string) => void;
  label?: string;
}) {
  const sel = tenants.filter((t) => t.value === current);
  return <Combobox label={label} options={tenants} value={sel} onChange={(v) => v[0] && onSwitch(v[0].value)} />;
}

/* ── Permission matrix (RBAC) ── */
export interface PermissionGroup {
  id: string;
  label: string;
  permissions: { id: string; label: string }[];
}

export function PermissionMatrix({
  roles,
  groups,
  value,
  onChange,
  readOnly,
}: {
  roles: { id: string; label: string }[];
  groups: PermissionGroup[];
  /** role id -> granted permission ids */
  value: Record<string, string[]>;
  onChange: (value: Record<string, string[]>) => void;
  readOnly?: boolean;
}) {
  const has = (r: string, p: string) => value[r]?.includes(p) ?? false;
  const set = (r: string, ps: string[], on: boolean) => {
    const cur = new Set(value[r] ?? []);
    ps.forEach((p) => (on ? cur.add(p) : cur.delete(p)));
    onChange({ ...value, [r]: [...cur] });
  };
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Permission</th>
            {roles.map((r) => (
              <th key={r.id} className="text-center">
                {r.label}
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((g) => {
          const ids = g.permissions.map((p) => p.id);
          return (
            <tbody key={g.id}>
              <tr>
                <th scope="rowgroup" className="bg-muted-bg">
                  {g.label}
                </th>
                {roles.map((r) => {
                  const n = ids.filter((p) => has(r.id, p)).length;
                  return (
                    <td key={r.id} className="bg-muted-bg text-center">
                      <input
                        type="checkbox"
                        aria-label={`${g.label} for ${r.label}`}
                        disabled={readOnly}
                        checked={n === ids.length}
                        ref={(el) => {
                          if (el) el.indeterminate = n > 0 && n < ids.length;
                        }}
                        onChange={(e) => set(r.id, ids, e.target.checked)}
                      />
                    </td>
                  );
                })}
              </tr>
              {g.permissions.map((p) => (
                <tr key={p.id}>
                  <td className="ps-6">{p.label}</td>
                  {roles.map((r) => (
                    <td key={r.id} className="text-center">
                      <input type="checkbox" aria-label={`${p.label} for ${r.label}`} disabled={readOnly} checked={has(r.id, p.id)} onChange={(e) => set(r.id, [p.id], e.target.checked)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
