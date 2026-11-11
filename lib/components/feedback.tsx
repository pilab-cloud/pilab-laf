import { AlertTriangle, CheckCircle2, Info, Loader2, X, XCircle } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf, useLafDefaults } from "../i18n";
import { dashboardEn } from "../messages/dashboard.en";

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
  /** Secondary line under the title. */
  description?: React.ReactNode;
  /** Close button; default true. */
  dismissible?: boolean;
  /** Called when the toast goes away for any reason (timeout, close button, action, `dismiss`). */
  onClose?: () => void;
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
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/** Alias of `useToast` (same API: `toast`, `dismiss`, `dismissAll`). */
export function useToasts(): ToastContextValue {
  return useToast();
}

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

const toastDefaults = { dashboard: dashboardEn };

const positionClass = {
  "bottom-end": "end-4 bottom-4 flex-col",
  "bottom-start": "start-4 bottom-4 flex-col",
  "top-end": "end-4 top-4 flex-col-reverse",
  "top-start": "start-4 top-4 flex-col-reverse",
};

function ToastView({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }) {
  const tone = item.tone ?? "info";
  const duration = item.duration ?? (tone === "error" ? 8000 : 4000);
  const [paused, setPaused] = React.useState(false);
  const { t } = useLafDefaults(toastDefaults);

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
      <span className="min-w-0 flex-1">
        <span className="block">{item.title}</span>
        {item.description && <span className="mt-0.5 block text-xs text-muted">{item.description}</span>}
      </span>
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
      {item.dismissible !== false && (
        <button type="button" aria-label={t.components.dashboard.toast.dismiss} className="shrink-0 border-0 bg-transparent p-0.5 text-muted hover:text-fg" onClick={() => onDismiss(item.id)}>
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

/**
 * Mount once near the app root; render toasts with `useToast().toast(...)`. At most `max` toasts are visible, the rest
 * queue and appear (with a fresh timer) as space frees up. Timers pause while a toast is hovered or focused.
 */
type ToastProviderProps = {
  children: React.ReactNode;
  max?: number;
  position?: keyof typeof positionClass;
  /** Accessible name of the notification region. */
  label?: string;
};

/** A provider nested inside another one reuses the outer region (one live landmark per page). */
export function ToastProvider(props: ToastProviderProps) {
  const parent = React.useContext(ToastContext);
  return parent ? <>{props.children}</> : <ToastProviderRoot {...props} />;
}

function ToastProviderRoot({
  children,
  max = 5,
  position = "bottom-end",
  label,
}: ToastProviderProps) {
  const { t } = useLafDefaults(toastDefaults);
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const nextId = React.useRef(0);
  const closers = React.useRef(new Map<number, (() => void) | undefined>());

  const dismiss = React.useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
    const cb = closers.current.get(id);
    closers.current.delete(id);
    cb?.();
  }, []);

  const dismissAll = React.useCallback(() => {
    setItems([]);
    const all = [...closers.current.values()];
    closers.current.clear();
    all.forEach((cb) => cb?.());
  }, []);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = ++nextId.current;
    closers.current.set(id, options.onClose);
    setItems((list) => [...list, { ...options, id }]);
    return id;
  }, []);

  const value = React.useMemo(() => ({ toast, dismiss, dismissAll }), [toast, dismiss, dismissAll]);
  const visible = items.slice(0, Math.max(1, max));

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div role="region" aria-label={label ?? t.components.dashboard.toast.region} className={cn("pointer-events-none fixed z-50 flex w-80 max-w-[calc(100vw-2rem)] gap-2", positionClass[position])}>
        {visible.map((item) => (
          <ToastView key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
