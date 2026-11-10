import * as React from "react";
import { cn } from "../cn";

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label + control + hint/error. Pass the same `htmlFor` as the control's `id`. */
export function Field({ label, hint, error, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cn("form-group", className)}>
      <label className="form-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  );
}

export interface InputProps extends React.ComponentProps<"input"> {
  invalid?: boolean;
}

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      className={cn("form-input", invalid && "error", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function Textarea({
  className,
  invalid,
  ...props
}: React.ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn("form-input", invalid && "error", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

/** Search input with a leading icon, e.g. in a Toolbar. */
export function SearchInput({
  className,
  icon,
  ...props
}: React.ComponentProps<"input"> & { icon: React.ReactNode }) {
  return (
    <div className={cn("search", className)}>
      {icon}
      <input type="search" className="form-input" {...props} />
    </div>
  );
}

/** Native select, restyled. Prefer for short lists and mobile. */
export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return <select className={cn("form-select", className)} {...props} />;
}

export function Checkbox({
  children,
  className,
  ...props
}: React.ComponentProps<"input"> & { children?: React.ReactNode }) {
  return (
    <label className={cn("check", className)}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );
}

/** Immediate on/off setting. Use Checkbox for values submitted with a form. */
export function Switch({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & { children?: React.ReactNode }) {
  return (
    <label className={cn("check", className)}>
      <span className="switch">
        <input type="checkbox" role="switch" {...props} />
        <span />
      </span>
      {children}
    </label>
  );
}

export interface RadioProps extends Omit<React.ComponentProps<"input">, "type"> {
  hint?: string;
}

export function Radio({ children, hint, className, ...props }: RadioProps) {
  return (
    <label className={cn("radio", className)}>
      <input type="radio" {...props} />
      <span className="radio-mark" />
      <span className="radio-text">
        {children}
        {hint && <span className="radio-hint">{hint}</span>}
      </span>
    </label>
  );
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: React.ReactNode; hint?: string; disabled?: boolean }[];
  "aria-label"?: string;
  className?: string;
}

/** Controlled radio group built from native inputs (arrow-key navigation comes from the browser). */
export function RadioGroup({ name, value, onValueChange, options, className, ...rest }: RadioGroupProps) {
  return (
    <fieldset className={cn("radio-group", className)} aria-label={rest["aria-label"]}>
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          value={o.value}
          hint={o.hint}
          disabled={o.disabled}
          checked={value === o.value}
          onChange={() => onValueChange?.(o.value)}
        >
          {o.label}
        </Radio>
      ))}
    </fieldset>
  );
}
