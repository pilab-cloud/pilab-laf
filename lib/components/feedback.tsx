import { AlertTriangle, CheckCircle2, Info, Loader2, XCircle } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf } from "../i18n";

export function Spinner({
  size = "md",
  label: labelProp,
  className,
}: {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}) {
  const { t: laf } = useLaf();
  const label = labelProp ?? laf.loading;
  const sizing = size === "sm" ? "size-4" : size === "lg" ? "size-8" : "size-5";
  return (
    <span role="status" className={cn("inline-flex", className)}>
      <Loader2 className={cn("animate-spin text-primary motion-reduce:animate-none", sizing)} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("h-4 animate-pulse rounded-sm bg-muted-bg motion-reduce:animate-none", className)}
      {...props}
    />
  );
}

export type ToastTone = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  tone?: ToastTone;
  title: React.ReactNode;
  action?: { label: string; onClick: () => void };
  /** ms; defaults to 4000 (8000 for errors). 0 keeps the toast until dismissed. */
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

const toastIcon = {
  success: { Icon: CheckCircle2, className: "text-ok" },
  error: { Icon: XCircle, className: "text-danger" },
  warning: { Icon: AlertTriangle, className: "text-warn" },
  info: { Icon: Info, className: "text-primary" },
};

interface ToastContextValue {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

function ToastView({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }) {
  const tone = item.tone ?? "info";
  const duration = item.duration ?? (tone === "error" ? 8000 : 4000);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || duration === 0) return;
    const t = window.setTimeout(() => onDismiss(item.id), duration);
    return () => window.clearTimeout(t);
  }, [paused, duration, item.id, onDismiss]);

  const { Icon, className } = toastIcon[tone];
  return (
    <div
      className="toast pointer-events-auto"
      role={tone === "error" ? "alert" : "status"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Icon className={cn("size-4 shrink-0", className)} aria-hidden />
      <span className="min-w-0 flex-1">{item.title}</span>
      {item.action && (
        <button
          type="button"
          className="font-medium text-primary hover:underline"
          onClick={() => {
            item.action!.onClick();
            onDismiss(item.id);
          }}
        >
          {item.action.label}
        </button>
      )}
    </div>
  );
}

/** Mount once near the app root; render toasts with `useToast().toast(...)`. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const nextId = React.useRef(0);

  const dismiss = React.useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = ++nextId.current;
    setItems((list) => [...list, { ...options, id }]);
    return id;
  }, []);

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
        {items.map((item) => (
          <ToastView key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
