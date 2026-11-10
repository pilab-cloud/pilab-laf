import { FileQuestion, LockKeyhole, ServerCrash, TimerOff, WifiOff } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Button } from "./button";
import { CopyButton } from "./helpers";

export type ErrorVariant = "403" | "404" | "500" | "offline" | "session-expired";

const defaults: Record<ErrorVariant, { icon: React.ReactNode; title: string; description: string }> = {
  "403": { icon: <LockKeyhole />, title: "Access denied", description: "You don't have permission to view this page." },
  "404": { icon: <FileQuestion />, title: "Page not found", description: "The page you are looking for doesn't exist or was moved." },
  "500": { icon: <ServerCrash />, title: "Something went wrong", description: "An unexpected error occurred. Try again in a moment." },
  offline: { icon: <WifiOff />, title: "You are offline", description: "Check your connection and try again." },
  "session-expired": { icon: <TimerOff />, title: "Session expired", description: "Sign in again to continue." },
};

export function ErrorPage({
  variant,
  title,
  description,
  action,
  requestId,
  requestIdLabel = "Request ID",
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
  const d = defaults[variant];
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
          <CopyButton value={requestId} label={`Copy ${requestIdLabel}`} />
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
    return (
      <ErrorPage
        variant="500"
        requestId={this.props.requestId?.(error)}
        action={<Button onClick={this.reset}>{this.props.retryLabel ?? "Try again"}</Button>}
      />
    );
  }
}
