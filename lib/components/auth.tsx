import { Check, Copy } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";

export function BrandHeader({
  icon,
  logoSrc,
  name,
  title,
  subtitle,
  className,
}: {
  /** Gradient brand tile content (used when no `logoSrc`). */
  icon?: React.ReactNode;
  logoSrc?: string;
  name?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("header", className)}>
      {logoSrc ? (
        <img src={logoSrc} alt={name ?? ""} className="logo mx-auto" />
      ) : (
        icon && (
          <div className="brand-icon" aria-hidden>
            {icon}
          </div>
        )
      )}
      {name && <div className="brand-name">{name}</div>}
      {title && <h1 className="page-title">{title}</h1>}
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </header>
  );
}

export function SocialDivider({ children }: { children: React.ReactNode }) {
  return (
    <div className="social-divider" role="separator">
      <span>{children}</span>
    </div>
  );
}

export function SocialButtons({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("social-buttons", className)} {...props} />;
}

export function SocialButton({
  icon,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & { icon?: React.ReactNode }) {
  return (
    <a className={cn("btn-social", className)} {...props}>
      {icon}
      {children}
    </a>
  );
}

export function AccountList({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("account-list", className)} {...props} />;
}

export function AccountItem({
  name,
  email,
  avatarSrc,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  name: string;
  email: string;
  avatarSrc?: string;
}) {
  return (
    <button type="submit" className={cn("account-item", className)} {...props}>
      {avatarSrc ? (
        <img src={avatarSrc} alt="" className="account-avatar" />
      ) : (
        <span className="account-avatar account-avatar-initial" aria-hidden>
          {name.charAt(0)}
        </span>
      )}
      <span className="account-details">
        <span className="account-name">{name}</span>
        <span className="account-email">{email}</span>
      </span>
    </button>
  );
}

export function ClientInfo({
  name,
  description,
  logoSrc,
  className,
}: {
  name: string;
  description?: string;
  logoSrc?: string;
  className?: string;
}) {
  return (
    <div className={cn("client-info", className)}>
      {logoSrc ? (
        <img src={logoSrc} alt="" className="client-logo" />
      ) : (
        <span className="client-logo-placeholder" aria-hidden>
          {name.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="client-details">
        <div className="client-name">{name}</div>
        {description && <div className="client-description">{description}</div>}
      </div>
    </div>
  );
}

export function ScopeList({
  scopes,
  icon,
  className,
}: {
  scopes: { id: string; description: React.ReactNode }[];
  /** Leading icon; should carry the `scope-icon` class (defaults to a check). */
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <ul className={cn("scope-list", className)}>
      {scopes.map((s) => (
        <li key={s.id} className="scope-item">
          {icon ?? <Check className="scope-icon" aria-hidden />}
          <span>{s.description}</span>
        </li>
      ))}
    </ul>
  );
}

export function OtpInput({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "type" | "maxLength"> & {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;

  return (
    <input
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern={`[0-9]{${length}}`}
      maxLength={length}
      aria-label="One-time code"
      className={cn("form-input otp-input", className)}
      value={current}
      onChange={(e) => {
        const next = e.target.value.replace(/\D/g, "").slice(0, length);
        setInner(next);
        onChange?.(next);
        if (next.length === length) onComplete?.(next);
      }}
      {...props}
    />
  );
}

export function CodeInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="text"
      autoComplete="off"
      autoCapitalize="characters"
      spellCheck={false}
      className={cn("code-input", className)}
      {...props}
    />
  );
}

export function CodeDisplay({
  code,
  copyLabel = "Copy code",
  copiedLabel = "Copied",
  className,
}: {
  code: string;
  copyLabel?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      /* clipboard unavailable; the code stays selectable */
    }
  };

  return (
    <div className={cn("flex items-stretch gap-2", className)}>
      <output className="code-display flex-1 select-all">{code}</output>
      <button
        type="button"
        className="btn btn-secondary auto"
        onClick={copy}
        aria-label={copied ? copiedLabel : copyLabel}
      >
        {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      </button>
      <span className="sr-only" role="status">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  );
}

export interface DeviceStepsProps {
  steps: React.ReactNode[];
  /** Zero-based index of the current step; earlier steps render as done. */
  current: number;
  className?: string;
}

export function DeviceSteps({ steps, current, className }: DeviceStepsProps) {
  return (
    <ol className={cn("device-steps", className)}>
      {steps.map((step, i) => (
        <li
          key={i}
          className={cn(i < current && "done", i === current && "current")}
          aria-current={i === current ? "step" : undefined}
        >
          {step}
        </li>
      ))}
    </ol>
  );
}

export function InfoBox({
  title,
  items,
  className,
}: {
  title: React.ReactNode;
  items: React.ReactNode[];
  className?: string;
}) {
  return (
    <div className={cn("info-box", className)}>
      <div className="info-box-title">{title}</div>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function LanguageSwitcher({
  languages,
  current,
  className,
}: {
  languages: { code: string; label: string; href: string }[];
  current: string;
  className?: string;
}) {
  return (
    <nav className={cn("lang-switch", className)} aria-label="Language">
      {languages.map((l) => (
        <a
          key={l.code}
          href={l.href}
          lang={l.code}
          hrefLang={l.code}
          aria-current={l.code === current ? "true" : undefined}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

export function AuthFooter({
  icon,
  className,
  children,
}: {
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <footer className={cn("footer", className)}>
      <p className="footer-text">
        {icon}
        {children}
      </p>
    </footer>
  );
}
