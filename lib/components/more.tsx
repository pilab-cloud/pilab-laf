import { Pencil, UploadCloud, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { format, matchesAccept } from "../utils";
import { Badge } from "./display";
import { Input } from "./form";
import { useLaf } from "../i18n";

/* ── Kbd ── */
export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn("inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-line bg-muted-bg px-1 font-mono text-[0.6875rem] text-muted", className)}
      {...props}
    />
  );
}

/* ── Inline edit ── */
export function InlineEdit({
  value,
  onSave,
  label,
  validate,
}: {
  value: string;
  onSave: (value: string) => void | Promise<void>;
  label: string;
  validate?: (value: string) => string | undefined;
}) {
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState(value);
  const [error, setError] = React.useState<string>();
  const [pending, setPending] = React.useState(false);
  const cancelled = React.useRef(false);

  const save = async () => {
    if (cancelled.current) return;
    if (text === value) return setEditing(false);
    const err = validate?.(text);
    if (err) return setError(err);
    setPending(true);
    try {
      await onSave(text);
      setEditing(false);
    } finally {
      setPending(false);
    }
  };

  if (!editing) {
    return (
      <button
        type="button"
        aria-label={`${label}: ${value}. Edit`}
        className="group inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-fg"
        onClick={() => {
          cancelled.current = false;
          setText(value);
          setError(undefined);
          setEditing(true);
        }}
      >
        {value}
        <Pencil className="size-3.5 text-subtle opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
      </button>
    );
  }
  return (
    <span className="inline-grid gap-1">
      <Input
        autoFocus
        aria-label={label}
        value={text}
        invalid={!!error}
        disabled={pending}
        aria-busy={pending || undefined}
        onChange={(e) => setText(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          else if (e.key === "Escape") {
            cancelled.current = true;
            setEditing(false);
          }
        }}
      />
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </span>
  );
}

/* ── File dropzone ── */
export interface UploadFile {
  id: string;
  name: string;
  size: number;
  progress?: number;
  error?: string;
}

export function FileDropzone({
  files,
  onFiles,
  onRemove,
  accept,
  maxSize,
  multiple = true,
  label = "Drop files here or click to browse",
}: {
  files: UploadFile[];
  onFiles: (files: File[]) => void;
  onRemove?: (id: string) => void;
  accept?: string;
  /** bytes */
  maxSize?: number;
  multiple?: boolean;
  label?: string;
}) {
  const { t: laf } = useLaf();
  const input = React.useRef<HTMLInputElement>(null);
  const [over, setOver] = React.useState(false);
  const [rejected, setRejected] = React.useState<string>();
  const take = (list: FileList | null) => {
    if (!list) return;
    const all = [...list];
    const typed = all.filter((f) => matchesAccept(f, accept));
    const ok = maxSize ? typed.filter((f) => f.size <= maxSize) : typed;
    const badType = all.length - typed.length;
    const tooBig = typed.length - ok.length;
    setRejected(
      [badType && laf.unsupportedType(badType), tooBig && laf.exceedsSize(tooBig)].filter(Boolean).join("; ") || undefined,
    );
    if (ok.length) onFiles(ok);
  };
  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          take(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center gap-2 rounded-md border border-dashed border-line-strong bg-muted-bg px-6 py-8 text-sm text-muted hover:text-fg",
          over && "border-primary bg-primary-light text-fg",
        )}
      >
        <UploadCloud className="size-6" aria-hidden />
        {label}
      </button>
      <input ref={input} type="file" hidden accept={accept} multiple={multiple} onChange={(e) => take(e.target.files)} />
      {rejected && (
        <p className="field-error" role="alert">
          {rejected}
        </p>
      )}
      {files.length > 0 && (
        <ul className="divide-y divide-line rounded-md border border-line text-sm">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-3 px-3 py-2">
              <span className="min-w-0 flex-1 truncate text-fg">{f.name}</span>
              <span className="font-mono text-xs text-subtle">{format.bytes(f.size)}</span>
              {f.error ? <span className="text-xs text-danger">{f.error}</span> : f.progress !== undefined && f.progress < 100 ? <span className="font-mono text-xs text-muted">{f.progress}%</span> : null}
              {onRemove && (
                <button type="button" aria-label={laf.removeItem(f.name)} onClick={() => onRemove(f.id)} className="text-muted hover:text-fg">
                  <X className="size-4" aria-hidden />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Alarm list ── */
export interface AlarmItem {
  id: string;
  severity: "critical" | "warning" | "info";
  name: string;
  entity: string;
  triggered: string;
  acknowledged?: boolean;
}

const alarmTone = { critical: "danger", warning: "warn", info: "neutral" } as const;

export function AlarmList({
  alarms,
  onAcknowledge,
  empty = "No active alarms",
}: {
  alarms: AlarmItem[];
  onAcknowledge?: (id: string) => void;
  empty?: string;
}) {
  const { t: laf } = useLaf();
  if (alarms.length === 0) return <p className="px-4 py-6 text-center text-sm text-muted">{empty}</p>;
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
      {alarms.map((a) => (
        <li key={a.id} className="flex items-center gap-3 px-4 py-3 text-sm">
          <Badge tone={alarmTone[a.severity]}>{a.severity}</Badge>
          <span className="min-w-0 flex-1">
            <b className="font-semibold text-fg">{a.name}</b>
            <span className="ms-2 text-muted">{a.entity}</span>
          </span>
          <span className="font-mono text-xs text-subtle">{a.triggered}</span>
          {onAcknowledge && !a.acknowledged && (
            <button type="button" className="text-primary hover:underline" onClick={() => onAcknowledge(a.id)}>
              {laf.acknowledge}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ── Charts: gauge, donut, bar ── */
export function Gauge({ value, max = 100, label, warnAt = 70, dangerAt = 90 }: { value: number; max?: number; label: string; warnAt?: number; dangerAt?: number }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const tone = pct >= dangerAt ? "text-danger" : pct >= warnAt ? "text-warn" : "text-ok";
  const r = 40;
  const c = Math.PI * r;
  return (
    <figure className="m-0 inline-block text-center">
      <svg viewBox="0 0 100 56" role="meter" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} className="w-32">
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="var(--bg-muted)" strokeWidth="8" />
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${(pct / 100) * c} ${c}`} className={tone} />
      </svg>
      <figcaption className="-mt-3 font-mono text-lg text-fg">{Math.round(pct)}%</figcaption>
      <div className="text-xs text-muted">{label}</div>
    </figure>
  );
}

const SLICE = ["text-primary", "text-ok", "text-warn", "text-danger", "text-muted"];

export function Donut({ slices, label }: { slices: { name: string; value: number }[]; label: string }) {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const r = 15.9155;
  let offset = 25;
  return (
    <figure className="m-0 flex items-center gap-4">
      <svg viewBox="0 0 42 42" role="img" aria-label={`${label}: ${slices.map((s) => `${s.name} ${s.value}`).join(", ")}`} className="size-28">
        {slices.map((s, i) => {
          const len = (s.value / total) * 100;
          const el = (
            <circle key={s.name} cx="21" cy="21" r={r} fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray={`${len} ${100 - len}`} strokeDashoffset={offset} className={SLICE[i % 5]} />
          );
          offset -= len;
          return el;
        })}
      </svg>
      <figcaption className="grid gap-1 text-xs text-muted">
        {slices.map((s, i) => (
          <span key={s.name} className="inline-flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-sm bg-current", SLICE[i % 5])} aria-hidden />
            {s.name} <b className="font-mono text-fg">{s.value}</b>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

export function BarChart({ data, label }: { data: { name: string; value: number }[]; label: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ul aria-label={label} className="m-0 grid list-none gap-2 p-0">
      {data.map((d) => (
        <li key={d.name} className="grid grid-cols-[6rem_1fr_3rem] items-center gap-2 text-xs text-muted">
          <span className="truncate">{d.name}</span>
          <span className="h-3 overflow-hidden rounded-sm bg-muted-bg">
            {/* dynamic data-driven width */}
            <span className="block h-full rounded-sm bg-primary" style={{ width: `${(d.value / max) * 100}%` }} />
          </span>
          <span className="text-end font-mono text-fg">{d.value}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Date / time input (native picker, token-styled) ── */
export function DateTimeInput({ mode = "date", className, ...props }: Omit<React.ComponentProps<"input">, "type"> & { mode?: "date" | "datetime-local" | "time" }) {
  return <Input type={mode} className={cn("font-mono [color-scheme:dark]", className)} {...props} />;
}

/* ── Form field wiring: label/description/error ids and aria ── */
export function FormField({
  id: idProp,
  label,
  description,
  error,
  children,
}: {
  /** Fixed control id, e.g. so an ErrorSummary can link to it. */
  id?: string;
  label: string;
  description?: string;
  error?: string;
  children: (aria: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const generated = React.useId();
  const id = idProp ?? generated;
  const descId = `${id}-d`;
  const errId = `${id}-e`;
  const describedBy = [error && errId, description && descId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
      {description && (
        <p id={descId} className="field-hint">
          {description}
        </p>
      )}
      {error && (
        <p id={errId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ErrorSummary({ errors, title = "Fix the following" }: { errors: { id: string; message: string }[]; title?: string }) {
  if (errors.length === 0) return null;
  return (
    <div role="alert" className="alert alert-error">
      <div>
        <b>{title}</b>
        <ul className="m-0 ps-5">
          {errors.map((e) => (
            <li key={e.id}>
              <a href={`#${e.id}`}>{e.message}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
