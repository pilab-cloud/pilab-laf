import { FileQuestion, LockKeyhole, ServerCrash, TimerOff, WifiOff } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { uiEn } from "../messages/ui.en";
import { Button } from "./button";
import { CopyButton } from "./helpers";

export type ErrorVariant = "403" | "404" | "500" | "offline" | "session-expired";

const lafDefaults = { ui: uiEn };

const icons: Record<ErrorVariant, React.ReactNode> = {
  "403": <LockKeyhole />,
  "404": <FileQuestion />,
  "500": <ServerCrash />,
  offline: <WifiOff />,
  "session-expired": <TimerOff />,
};
const textKey = { "403": "error403", "404": "error404", "500": "error500", offline: "errorOffline", "session-expired": "errorSessionExpired" } as const;

export function ErrorPage({
  variant,
  title,
  description,
  action,
  requestId,
  requestIdLabel: requestIdLabelProp,
  className,
}: {
  variant: ErrorVariant;
  title?: string;
  description?: React.ReactNode;
  /** Primary action, e.g. a "Back to dashboard" Button. */
  action?: React.ReactNode;
  /** Copyable correlation id for support. */
  requestId?: string;
  requestIdLabel?: string;
  className?: string;
}) {
  const { t } = useLafDefaults(lafDefaults);
  const ui = t.components.ui;
  const d = { icon: icons[variant], ...ui[textKey[variant]] };
  const requestIdLabel = requestIdLabelProp ?? ui.errors.requestId;
  const critical = variant === "500" || variant === "offline";
  return (
    <div
      role={critical ? "alert" : undefined}
      data-variant={variant}
      className={cn("mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-16 text-center", className)}
    >
      <span className="text-subtle [&>svg]:size-10" aria-hidden>
        {d.icon}
      </span>
      <h1 className="text-xl font-semibold text-fg">{title ?? d.title}</h1>
      <p className="text-sm text-muted">{description ?? d.description}</p>
      {action}
      {requestId && (
        <div className="flex items-center gap-1 text-xs text-subtle">
          <span>{requestIdLabel}:</span>
          <code className="font-mono">{requestId}</code>
          <CopyButton value={requestId} label={ui.errors.copyRequestId(requestIdLabel)} />
        </div>
      )}
    </div>
  );
}

interface BoundaryProps {
  children: React.ReactNode;
  /** Custom fallback; defaults to the 500 ErrorPage with a retry button. */
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  onReset?: () => void;
  /** Changing any value resets the boundary. */
  resetKeys?: unknown[];
  retryLabel?: string;
  requestId?: (error: Error) => string | undefined;
}

export class LafErrorBoundary extends React.Component<BoundaryProps, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prev: BoundaryProps) {
    const a = prev.resetKeys ?? [];
    const b = this.props.resetKeys ?? [];
    if (this.state.error && (a.length !== b.length || a.some((v, i) => !Object.is(v, b[i])))) this.reset();
  }

  reset = () => {
    this.props.onReset?.();
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(error, this.reset);
    return <BoundaryFallback requestId={this.props.requestId?.(error)} retryLabel={this.props.retryLabel} reset={this.reset} />;
  }
}

function BoundaryFallback({ requestId, retryLabel, reset }: { requestId?: string; retryLabel?: string; reset: () => void }) {
  const { t } = useLafDefaults(lafDefaults);
  return <ErrorPage variant="500" requestId={requestId} action={<Button onClick={reset}>{retryLabel ?? t.components.ui.errors.tryAgain}</Button>} />;
}
