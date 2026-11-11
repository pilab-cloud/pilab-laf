import { Check, Copy, Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Button } from "./button";
import { Input, type InputProps } from "./form";
import { Dialog, DialogClose, DialogContent } from "./overlay";
import { useLaf } from "../i18n";

export function CopyButton({
  value,
  label: labelProp,
  copiedLabel: copiedLabelProp,
  className,
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const { t } = useLaf();
  const label = labelProp ?? t.copy;
  const copiedLabel = copiedLabelProp ?? t.copied;
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* clipboard unavailable; value stays selectable */
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={cn("shrink-0", className)}
        onClick={copy}
        aria-label={copied ? copiedLabel : label}
      >
        {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      </Button>
      <span className="sr-only" role="status">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}

export interface PasswordFieldProps extends Omit<InputProps, "type"> {
  showLabel?: string;
  hideLabel?: string;
  capsLockHint?: string;
  /** Caller-supplied scorer (e.g. zxcvbn); renders a 4-segment meter and a text label. */
  strength?: (value: string) => 0 | 1 | 2 | 3 | 4;
  strengthLabels?: [string, string, string, string, string];
  /** Value this field must match (confirm field); shows an error when different. */
  confirmOf?: string;
  mismatchLabel?: string;
}

const strengthTone = ["bg-danger", "bg-danger", "bg-warn", "bg-ok", "bg-ok"];

export function PasswordField({
  showLabel: showLabelProp,
  hideLabel: hideLabelProp,
  capsLockHint: capsLockHintProp,
  strength,
  strengthLabels: strengthLabelsProp,
  confirmOf,
  mismatchLabel: mismatchLabelProp,
  className,
  onKeyUp,
  onBlur,
  onChange,
  ...props
}: PasswordFieldProps) {
  const [text, setText] = React.useState(String(props.value ?? props.defaultValue ?? ""));
  const current = props.value !== undefined ? String(props.value) : text;
  const score = strength ? strength(current) : 0;
  const mismatch = confirmOf !== undefined && current !== "" && current !== confirmOf;
  const uid = React.useId();
  const { t } = useLaf();
  const showLabel = showLabelProp ?? t.showPassword;
  const hideLabel = hideLabelProp ?? t.hidePassword;
  const strengthLabels = strengthLabelsProp ?? t.passwordStrength;
  const mismatchLabel = mismatchLabelProp ?? t.passwordMismatch;
  const capsLockHint = capsLockHintProp ?? t.capsLock;
  const [visible, setVisible] = React.useState(false);
  const [caps, setCaps] = React.useState(false);
  return (
    <div className="grid gap-1">
      <div className="relative">
        <Input
          {...props}
          type={visible ? "text" : "password"}
          className={cn("pe-10", className)}
          invalid={mismatch || props.invalid}
          aria-describedby={cn(mismatch && `${uid}-mismatch`, strength && `${uid}-strength`, props["aria-describedby"]) || undefined}
          onChange={(e) => {
            setText(e.target.value);
            onChange?.(e);
          }}
          onKeyUp={(e) => {
            setCaps(e.getModifierState("CapsLock"));
            onKeyUp?.(e);
          }}
          onBlur={(e) => {
            setCaps(false);
            onBlur?.(e);
          }}
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex w-10 items-center justify-center text-muted hover:text-fg"
          aria-pressed={visible}
          aria-label={visible ? hideLabel : showLabel}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
        </button>
      </div>
      {strength && current !== "" && (
        <div id={`${uid}-strength`} className="grid gap-1">
          <div className="grid grid-cols-4 gap-1" aria-hidden>
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className={cn("h-1 rounded-xs", n <= score ? strengthTone[score] : "bg-muted-bg")} />
            ))}
          </div>
          <p className="field-hint" role="status">
            {strengthLabels[score]}
          </p>
        </div>
      )}
      {mismatch && (
        <p id={`${uid}-mismatch`} className="field-hint text-danger" role="alert">
          {mismatchLabel}
        </p>
      )}
      {caps && (
        <p className="field-hint" role="status">
          {capsLockHint}
        </p>
      )}
    </div>
  );
}

export function DefinitionList({
  items,
  className,
}: {
  items: { label: React.ReactNode; value?: React.ReactNode; mono?: boolean; copy?: string }[];
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2", className)}>
      {items.map((it, i) => (
        <div key={i} className="min-w-0">
          <dt className="mb-0.5 text-[0.6875rem] tracking-wider text-subtle uppercase">{it.label}</dt>
          <dd className={cn("flex items-center gap-1 text-sm text-fg", it.mono && "font-mono break-all")}>
            <span className="min-w-0">{it.value ?? "—"}</span>
            {it.copy && <CopyButton value={it.copy} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  items,
  confirmLabel,
  cancelLabel: cancelLabelProp,
  confirmText,
  confirmTextLabel: confirmTextLabelProp,
  pending,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  /** Impacted objects listed before the action. */
  items?: string[];
  confirmLabel: string;
  cancelLabel?: string;
  /** When set, the confirm button stays disabled until this exact text is typed. */
  confirmText?: string;
  confirmTextLabel?: string;
  pending?: boolean;
  onConfirm: () => void;
}) {
  const { t: laf } = useLaf();
  const cancelLabel = cancelLabelProp ?? laf.cancel;
  const confirmTextLabel = confirmTextLabelProp ?? laf.typeToConfirm;
  const [typed, setTyped] = React.useState("");
  React.useEffect(() => {
    if (!open) setTyped("");
  }, [open]);
  const blocked = confirmText !== undefined && typed !== confirmText;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        role="alertdialog"
        title={title}
        footer={
          <>
            <DialogClose asChild>
              <Button variant="secondary" size="sm" autoFocus>
                {cancelLabel}
              </Button>
            </DialogClose>
            <Button variant="danger" size="sm" loading={pending} disabled={blocked} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </>
        }
      >
        <p>{description}</p>
        {items && items.length > 0 && (
          <ul className="mt-3 max-h-32 list-disc overflow-auto ps-5 text-fg">
            {items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        )}
        {confirmText !== undefined && (
          <label className="mt-3 grid gap-1">
            <span className="form-label">
              {confirmTextLabel}: <b className="font-mono text-fg">{confirmText}</b>
            </span>
            <Input value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" />
          </label>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Progress({
  value,
  max = 100,
  meter,
  warnAt = 70,
  dangerAt = 90,
  label,
  className,
}: {
  /** Omit for indeterminate. */
  value?: number;
  max?: number;
  /** Capacity style: colour shifts at warnAt/dangerAt percent. */
  meter?: boolean;
  warnAt?: number;
  dangerAt?: number;
  label: string;
  className?: string;
}) {
  const pct = value === undefined ? undefined : Math.min(100, Math.max(0, (value / max) * 100));
  const tone =
    meter && pct !== undefined ? (pct >= dangerAt ? "bg-danger" : pct >= warnAt ? "bg-warn" : "bg-ok") : "bg-primary";
  return (
    <div
      role={meter ? "meter" : "progressbar"}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn("h-1.5 overflow-hidden rounded-sm bg-muted-bg", className)}
    >
      <div
        className={cn(
          "h-full rounded-sm transition-[width]",
          tone,
          pct === undefined && "w-1/3 animate-pulse motion-reduce:animate-none",
        )}
        style={pct === undefined ? undefined : { width: `${pct}%` }}
      />
    </div>
  );
}

export interface Step {
  id: string;
  label: React.ReactNode;
  error?: boolean;
}

/** Step indicator for wizards; steps before `current` are done and clickable via `onStepClick`. */
export function Stepper({
  steps,
  current,
  onStepClick,
  className,
}: {
  steps: Step[];
  current: number;
  onStepClick?: (index: number) => void;
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-col gap-2", className)}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.id} aria-current={active ? "step" : undefined}>
            <button
              type="button"
              disabled={!done || !onStepClick}
              onClick={() => onStepClick?.(i)}
              className={cn(
                "flex items-center gap-2.5 text-start text-sm",
                active ? "text-fg" : done ? "text-muted hover:text-fg" : "text-subtle",
              )}
            >
              <span
                className={cn(
                  "flex size-5.5 shrink-0 items-center justify-center rounded-sm border text-xs font-semibold",
                  s.error
                    ? "border-danger text-danger"
                    : done
                      ? "border-primary bg-primary text-on-primary"
                      : active
                        ? "border-primary text-primary"
                        : "border-line-strong",
                )}
              >
                {done && !s.error ? <Check className="size-3.5" aria-hidden /> : i + 1}
              </span>
              {s.label}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function SecretDisplay({
  value,
  label,
  acknowledgeLabel,
  onAcknowledge,
  acknowledged,
  masked = false,
}: {
  value: string;
  label: string;
  acknowledgeLabel: string;
  onAcknowledge?: (ack: boolean) => void;
  /** Controlled state of the acknowledge checkbox. */
  acknowledged?: boolean;
  /** Show `••••` plus the last 4 characters instead of the secret. */
  masked?: boolean;
}) {
  const { t: laf } = useLaf();
  const shown = masked ? `${"•".repeat(Math.max(0, Math.min(value.length - 4, 12)))}${value.slice(-4)}` : value;
  return (
    <div className="grid gap-2.5">
      <span className="form-label">{label}</span>
      <div className="flex items-center gap-2">
        <output className="code-display min-w-0 flex-1 text-base tracking-normal break-all select-all">
          {shown}
        </output>
        <CopyButton value={value} label={`${laf.copy} ${label}`} />
      </div>
      <label className="flex items-center gap-2 text-sm text-muted">
        <input type="checkbox" checked={acknowledged} onChange={(e) => onAcknowledge?.(e.target.checked)} />
        {acknowledgeLabel}
      </label>
    </div>
  );
}
