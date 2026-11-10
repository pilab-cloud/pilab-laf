import { AlertTriangle, ChevronDown, Info, Minus, Plus, X, XCircle } from "lucide-react";
import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { Input } from "./form";
import { Badge } from "./display";
import { Button } from "./button";
import { Combobox, type ComboboxOption } from "./combobox";
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
  dismissLabel,
  children,
}: {
  tone?: keyof typeof bannerTone;
  action?: React.ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
  children: React.ReactNode;
}) {
  const { cls, Icon } = bannerTone[tone];
  const { t: laf } = useLaf();
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cn("flex items-center gap-2.5 border-b px-4 py-2 text-sm", cls)}>
      <Icon className="size-4 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">{children}</div>
      {action}
      {onDismiss && (
        <button type="button" aria-label={dismissLabel ?? laf.dismiss} onClick={onDismiss} className="opacity-80 hover:opacity-100">
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
  const setItem = (id: string, next: boolean) =>
    setOpen((o) => (next ? (multiple ? (o.includes(id) ? o : [...o, id]) : [id]) : o.filter((x) => x !== id)));
  return (
    <div className={cn("divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", className)}>
      {items.map((it) => {
        const isOpen = open.includes(it.id);
        return (
          <CollapsiblePrimitive.Root key={it.id} open={isOpen} onOpenChange={(v) => setItem(it.id, v)}>
            <h3>
              <CollapsiblePrimitive.Trigger className="flex w-full items-center gap-2 px-4 py-3 text-start text-sm font-medium text-fg hover:bg-surface-hover">
                <span className="flex-1">{it.title}</span>
                <ChevronDown className={cn("size-4 transition-transform motion-reduce:transition-none", isOpen && "rotate-180")} aria-hidden />
              </CollapsiblePrimitive.Trigger>
            </h3>
            <CollapsiblePrimitive.Content className="overflow-hidden border-t border-line text-sm text-muted data-[state=closed]:animate-[laf-collapse-up_150ms_ease-out] data-[state=open]:animate-[laf-collapse-down_150ms_ease-out] motion-reduce:animate-none">
              <div className="px-4 py-3">{it.content}</div>
            </CollapsiblePrimitive.Content>
          </CollapsiblePrimitive.Root>
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
  label: labelProp,
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
  const { t: laf } = useLaf();
  const label = labelProp ?? laf.resizePanels;
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
  const { t: laf, portalContainer } = useLaf();
  const w = { sm: "w-[360px]", md: "w-[480px]", lg: "w-[640px]" }[width];
  return (
    <DialogPrimitive.Portal container={portalContainer}>
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
  const { t: laf } = useLaf();
  const factor = units?.find((u) => u.label === unit)?.factor ?? 1;
  const shown = value / factor;
  const [text, setText] = React.useState(String(shown));
  React.useEffect(() => setText(String(shown)), [shown]);
  const commit = (n: number) => onChange(Math.min(max, Math.max(min, n * factor)));
  const bump = (d: number) => commit(shown + d * step);
  return (
    <div className="inline-flex items-stretch gap-1.5">
      <button type="button" className="btn btn-secondary btn-sm auto" aria-label={laf.decrease(label)} disabled={value <= min} onClick={() => bump(-1)}>
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
      <button type="button" className="btn btn-secondary btn-sm auto" aria-label={laf.increase(label)} disabled={value >= max} onClick={() => bump(1)}>
        <Plus aria-hidden />
      </button>
      {units && (
        <select className="form-input w-20" aria-label={laf.unitOf(label)} value={unit} onChange={(e) => onUnitChange?.(e.target.value)}>
          {units.map((u) => (
            <option key={u.label}>{u.label}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export interface SliderProps {
  /** Single value, or `[min, max]` for a range with two thumbs. */
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onValueChange?: (value: number | [number, number]) => void;
  /** Single-value compatibility with the former native input: receives `{ target: { value } }`. */
  onChange?: (e: { target: { value: string } }) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: { value: number; label?: React.ReactNode }[];
  /** Paired NumberInput (single value only). */
  withInput?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

export function Slider({
  value: valueProp,
  defaultValue,
  onValueChange,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks,
  withInput,
  disabled,
  className,
  "aria-label": ariaLabel,
}: SliderProps) {
  const { t: laf } = useLaf();
  const [value, setValue] = useControllableState<number | [number, number]>({
    value: valueProp,
    defaultValue: defaultValue ?? min,
    onChange: (v) => {
      onValueChange?.(v);
      if (typeof v === "number") onChange?.({ target: { value: String(v) } });
    },
  });
  const arr = Array.isArray(value) ? value : [value];
  const pct = (n: number) => `${((n - min) / (max - min || 1)) * 100}%`;
  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      <div className="min-w-0 flex-1">
        <SliderPrimitive.Root
          className="relative flex h-5 w-full touch-none items-center select-none data-[disabled]:opacity-50"
          value={arr}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onValueChange={(v) => setValue(Array.isArray(value) ? ([v[0]!, v[1]!] as [number, number]) : v[0]!)}
        >
          <SliderPrimitive.Track className="relative h-1 grow rounded-xs bg-muted-bg">
            <SliderPrimitive.Range className="absolute h-full rounded-xs bg-primary" />
          </SliderPrimitive.Track>
          {arr.map((_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              aria-label={arr.length > 1 && ariaLabel ? `${ariaLabel} ${i === 0 ? laf.minimum : laf.maximum}` : ariaLabel}
              className="block size-4 rounded-sm border border-primary bg-surface outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            />
          ))}
        </SliderPrimitive.Root>
        {marks && (
          <div className="relative mt-1 h-4 text-xs text-muted" aria-hidden>
            {marks.map((m) => (
              <span key={m.value} className="absolute -translate-x-1/2 rtl:translate-x-1/2" style={{ insetInlineStart: pct(m.value) }}>
                {m.label ?? m.value}
              </span>
            ))}
          </div>
        )}
      </div>
      {withInput && typeof value === "number" && (
        <NumberInput label={ariaLabel ?? laf.value} value={value} min={min} max={max} step={step} onChange={(n) => setValue(n)} />
      )}
    </div>
  );
}

/* ── Tag input & chips ── */
const chipTone = {
  neutral: "border-line bg-muted-bg text-fg",
  primary: "border-primary/35 bg-primary-light text-primary",
  ok: "border-ok-line bg-ok-bg text-ok",
  warn: "border-warn-line bg-warn-bg text-warn",
  danger: "border-danger-line bg-danger-bg text-danger",
};

export function Chip({
  onRemove,
  removeLabel,
  tone = "neutral",
  children,
}: {
  onRemove?: () => void;
  removeLabel?: string;
  tone?: keyof typeof chipTone;
  children: React.ReactNode;
}) {
  return (
    <span className={cn("inline-flex h-6 items-center gap-1 rounded-sm border px-2 text-xs", chipTone[tone])}>
      {children}
      {onRemove && (
        <button type="button" aria-label={removeLabel ?? "Remove"} onClick={onRemove} className="opacity-70 hover:opacity-100">
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
  addLabel: addLabelProp,
  keyLabel: keyLabelProp,
  valueLabel: valueLabelProp,
  duplicateMessage: duplicateMessageProp,
}: {
  value: KeyValue[];
  onChange: (value: KeyValue[]) => void;
  addLabel?: string;
  keyLabel?: string;
  valueLabel?: string;
  duplicateMessage?: string;
}) {
  const { t: laf } = useLaf();
  const addLabel = addLabelProp ?? laf.add;
  const keyLabel = keyLabelProp ?? laf.key;
  const valueLabel = valueLabelProp ?? laf.value;
  const duplicateMessage = duplicateMessageProp ?? laf.duplicateKey;
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
  label: labelProp,
}: {
  value: string;
  onChange: (value: string) => void;
  presets?: string[];
  refresh?: string;
  onRefreshChange?: (value: string) => void;
  label?: string;
}) {
  const { t: laf } = useLaf();
  const label = labelProp ?? laf.timeRange;
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
            <option key={r} value={r}>{r === "off" ? laf.off : r}</option>
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
          {laf.wrap}
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
          {shown.length === 0 && <div className="text-subtle">{laf.noLines}</div>}
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
  label: labelProp,
}: {
  tenants: ComboboxOption[];
  current: string;
  onSwitch: (id: string) => void;
  label?: string;
}) {
  const { t: laf } = useLaf();
  const sel = tenants.filter((t) => t.value === current);
  return <Combobox label={labelProp ?? laf.tenant} options={tenants} value={sel} onChange={(v) => v[0] && onSwitch(v[0].value)} />;
}

/* ── Permission matrix (RBAC) ── */
export interface PermissionGroup {
  id: string;
  label: string;
  permissions: { id: string; label: string }[];
}

export interface PermissionMatrixLabels {
  search: string;
  inheritedFrom: (from: string) => string;
  pending: (n: number) => string;
  save: string;
  discard: string;
  noMatch: string;
}
const pmLabels: PermissionMatrixLabels = {
  search: "Search permissions",
  inheritedFrom: (from) => `Inherited from ${from}`,
  pending: (n) => `${n} pending change${n === 1 ? "" : "s"}`,
  save: "Save",
  discard: "Discard",
  noMatch: "No matching permissions",
};

export function PermissionMatrix({
  roles,
  groups,
  value,
  onChange,
  readOnly,
  inherited,
  baseline,
  searchable,
  onSave,
  onDiscard,
  labels: labelsProp,
}: {
  roles: { id: string; label: string }[];
  groups: PermissionGroup[];
  /** role id -> granted permission ids */
  value: Record<string, string[]>;
  onChange: (value: Record<string, string[]>) => void;
  readOnly?: boolean;
  /** Permissions a role gets from elsewhere: shown checked, disabled, with a source badge. */
  inherited?: Record<string, { permission: string; from: string }[]>;
  /** Saved state; cells that differ are highlighted and counted in the pending-changes bar. */
  baseline?: Record<string, string[]>;
  searchable?: boolean;
  onSave?: () => void;
  onDiscard?: () => void;
  labels?: Partial<PermissionMatrixLabels>;
}) {
  const { t: laf } = useLaf();
  const L = { ...pmLabels, ...labelsProp };
  const [query, setQuery] = React.useState("");
  const inh = (r: string, p: string) => inherited?.[r]?.find((x) => x.permission === p);
  const has = (r: string, p: string) => (value[r]?.includes(p) ?? false) || !!inh(r, p);
  const was = (r: string, p: string) => baseline?.[r]?.includes(p) ?? false;
  const changed = (r: string, p: string) => !!baseline && (value[r]?.includes(p) ?? false) !== was(r, p);
  const set = (r: string, ps: string[], on: boolean) => {
    const cur = new Set(value[r] ?? []);
    ps.forEach((p) => (on ? cur.add(p) : cur.delete(p)));
    onChange({ ...value, [r]: [...cur] });
  };
  const pending = baseline
    ? roles.reduce((n, r) => n + groups.reduce((m, g) => m + g.permissions.filter((p) => changed(r.id, p.id)).length, 0), 0)
    : 0;
  const q = query.trim().toLowerCase();
  const shown = groups
    .map((g) => ({ ...g, permissions: q && !g.label.toLowerCase().includes(q) ? g.permissions.filter((p) => p.label.toLowerCase().includes(q)) : g.permissions }))
    .filter((g) => g.permissions.length > 0);
  const onKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
    const dx = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const dy = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    const cell = (e.target as HTMLElement).closest("td");
    if ((!dx && !dy) || !cell || !(e.target as HTMLElement).matches("input[type=checkbox]")) return;
    const rows = [...e.currentTarget.querySelectorAll("tbody tr")];
    const row = cell.parentElement as HTMLTableRowElement;
    const ri = rows.indexOf(row);
    const ci = [...row.children].indexOf(cell);
    const next = (rows[ri + dy] as HTMLTableRowElement | undefined)?.children[ci + dx]?.querySelector<HTMLInputElement>("input[type=checkbox]");
    if (next) {
      e.preventDefault();
      next.focus();
    }
  };
  const matrixBox = (r: { id: string; label: string }, label: string, p: string | undefined, ids: string[]) => {
    const src = p ? inh(r.id, p) : undefined;
    const n = ids.filter((x) => has(r.id, x)).length;
    return (
      <span className="inline-flex items-center gap-1">
        <input
          type="checkbox"
          aria-label={`${label} for ${r.label}`}
          title={src ? L.inheritedFrom(src.from) : undefined}
          disabled={readOnly || !!src}
          checked={p ? has(r.id, p) : n === ids.length}
          ref={(el) => {
            if (el && !p) el.indeterminate = n > 0 && n < ids.length;
          }}
          onChange={(e) => set(r.id, ids, e.target.checked)}
        />
        {src && <Badge tone="neutral">{src.from}</Badge>}
      </span>
    );
  };
  return (
    <div className="grid gap-3">
      {(searchable || baseline) && (
        <div className="flex flex-wrap items-center gap-3">
          {searchable && <Input type="search" aria-label={L.search} placeholder={L.search} value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-xs" />}
          {baseline && pending > 0 && (
            <div className="ms-auto flex items-center gap-2 text-sm" role="status">
              <span className="text-muted">{L.pending(pending)}</span>
              {onDiscard && (
                <Button size="sm" variant="ghost" onClick={onDiscard}>
                  {L.discard}
                </Button>
              )}
              {onSave && (
                <Button size="sm" onClick={onSave}>
                  {L.save}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      <div className="table-wrap">
        <table className="table" onKeyDown={onKeyDown}>
          <thead>
            <tr>
              <th>{laf.permission}</th>
              {roles.map((r) => (
                <th key={r.id} className="text-center">
                  {r.label}
                </th>
              ))}
            </tr>
          </thead>
          {shown.map((g) => {
            const ids = g.permissions.map((p) => p.id);
            return (
              <tbody key={g.id}>
                <tr>
                  <th scope="rowgroup" className="bg-muted-bg">
                    {g.label}
                  </th>
                  {roles.map((r) => (
                    <td key={r.id} className="bg-muted-bg text-center">
                      {matrixBox(r, g.label, undefined, ids)}
                    </td>
                  ))}
                </tr>
                {g.permissions.map((p) => (
                  <tr key={p.id}>
                    <td className="ps-6">{p.label}</td>
                    {roles.map((r) => (
                      <td key={r.id} className={cn("text-center", changed(r.id, p.id) && "bg-warn-bg")} data-changed={changed(r.id, p.id) || undefined}>
                        {matrixBox(r, p.label, p.id, [p.id])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            );
          })}
        </table>
        {shown.length === 0 && <p className="p-4 text-sm text-muted">{L.noMatch}</p>}
      </div>
    </div>
  );
}
