import { Menu } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Button } from "./button";
import { Breadcrumb } from "./display";
import { Drawer, DrawerContent, DrawerTrigger } from "./extras";
import { ConfirmDialog } from "./helpers";

/* ── Unsaved-changes guard ── */
export interface UnsavedChangesGuard {
  /** True while a guarded action is waiting for confirmation. */
  pending: boolean;
  dirty: boolean;
  /** Runs `action` now when clean, otherwise asks for confirmation first. Returns true if it ran immediately. */
  guard: (action: () => void) => boolean;
  confirm: () => void;
  cancel: () => void;
}

/**
 * Warns on tab close / reload (beforeunload) while `dirty`, and exposes `guard()` for in-app
 * navigation (router callbacks, Cancel buttons). Pair it with `UnsavedChangesDialog`.
 */
export function useUnsavedChangesGuard(dirty: boolean): UnsavedChangesGuard {
  const [queued, setQueued] = React.useState<(() => void) | null>(null);

  React.useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const guard = React.useCallback(
    (action: () => void) => {
      if (!dirty) {
        action();
        return true;
      }
      setQueued(() => action);
      return false;
    },
    [dirty],
  );
  const confirm = React.useCallback(() => {
    const action = queued;
    setQueued(null);
    action?.();
  }, [queued]);
  const cancel = React.useCallback(() => setQueued(null), []);

  return { pending: queued !== null, dirty, guard, confirm, cancel };
}

export function UnsavedChangesDialog({
  guard,
  title = "Discard unsaved changes?",
  description = "You have changes that have not been saved. If you leave now they will be lost.",
  confirmLabel = "Discard changes",
  cancelLabel = "Keep editing",
}: {
  guard: UnsavedChangesGuard;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}) {
  return (
    <ConfirmDialog
      open={guard.pending}
      onOpenChange={(o) => !o && guard.cancel()}
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
      onConfirm={guard.confirm}
    />
  );
}

/* ── FormSection / FormFooter ── */
export function FormSection({
  title,
  description,
  columns = 2,
  children,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  columns?: 1 | 2;
  children: React.ReactNode;
  className?: string;
}) {
  const id = React.useId();
  return (
    <section aria-labelledby={`${id}-t`} className={cn("grid gap-4 border-b border-line py-6 first:pt-0 last:border-b-0", className)}>
      <header>
        <h2 id={`${id}-t`} className="text-base font-semibold text-fg">
          {title}
        </h2>
        {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
      </header>
      <div className={cn("grid grid-cols-1 gap-4", columns === 2 && "md:grid-cols-2")}>{children}</div>
    </section>
  );
}

export function FormFooter({
  onCancel,
  onSave,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  pending,
  dirty,
  guard,
  saveType = "button",
  sticky = true,
  children,
  className,
}: {
  onCancel?: () => void;
  onSave?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  pending?: boolean;
  /** When set, Save is disabled until the form is dirty. */
  dirty?: boolean;
  /** Routes Cancel through the unsaved-changes guard. */
  guard?: UnsavedChangesGuard;
  saveType?: "button" | "submit";
  sticky?: boolean;
  /** Extra content on the start side (status text, errors). */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t border-line bg-bg px-4 py-3",
        sticky && "sticky bottom-0 z-10",
        className,
      )}
    >
      <div className="min-w-0 flex-1 text-sm text-muted" role="status">
        {children}
      </div>
      {onCancel && (
        <Button variant="secondary" onClick={() => (guard ? guard.guard(onCancel) : onCancel())}>
          {cancelLabel}
        </Button>
      )}
      <Button type={saveType} onClick={onSave} loading={pending} disabled={dirty === false}>
        {saveLabel}
      </Button>
    </div>
  );
}

/* ── Page templates ── */
export interface TopBarCounter {
  id: string;
  label: string;
  count: number;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function TopBar({
  logo,
  search,
  counters,
  notifications,
  userMenu,
  start,
  className,
}: {
  logo?: React.ReactNode;
  /** Global search slot (e.g. an Input or command-palette trigger). */
  search?: React.ReactNode;
  counters?: TopBarCounter[];
  /** NotificationCenter slot. */
  notifications?: React.ReactNode;
  userMenu?: React.ReactNode;
  /** Slot before the logo, e.g. `MobileNav`. */
  start?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex h-12 items-center gap-3 border-b border-line bg-surface px-3", className)}>
      {start}
      {logo && <div className="flex shrink-0 items-center font-semibold text-fg">{logo}</div>}
      <div className="mx-auto flex min-w-0 max-w-xl flex-1 items-center">{search}</div>
      <div className="ms-auto flex items-center gap-1">
        {counters?.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={c.onClick}
            aria-label={`${c.label}: ${c.count}`}
            className="btn btn-ghost btn-sm gap-1.5"
          >
            {c.icon}
            <span aria-hidden>{c.count}</span>
          </button>
        ))}
        {notifications}
        {userMenu}
      </div>
    </header>
  );
}

export function DetailPage({
  breadcrumb,
  icon,
  title,
  status,
  actions,
  tabs,
  side,
  children,
  className,
}: {
  breadcrumb?: { label: string; href?: string }[];
  /** ObjectIcon slot. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Status badge / dot slot next to the title. */
  status?: React.ReactNode;
  /** ActionBar slot. */
  actions?: React.ReactNode;
  /** Tabs slot, rendered under the head. */
  tabs?: React.ReactNode;
  side?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4", className)}>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <div className="flex flex-wrap items-center gap-3">
        {icon}
        <h1 className="min-w-0 text-xl font-semibold text-fg">{title}</h1>
        {status}
        {actions && <div className="ms-auto flex items-center gap-2">{actions}</div>}
      </div>
      {tabs}
      <div className={cn("grid gap-4", side && "lg:grid-cols-[minmax(0,1fr)_20rem]")}>
        <div className="min-w-0">{children}</div>
        {side && <aside className="min-w-0">{side}</aside>}
      </div>
    </div>
  );
}

export function FormPage({
  breadcrumb,
  title,
  description,
  onSubmit,
  footer,
  children,
  className,
}: {
  breadcrumb?: { label: string; href?: string }[];
  title: React.ReactNode;
  description?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Usually a `FormFooter`. */
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto grid w-full max-w-3xl gap-4", className)}>
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <header>
        <h1 className="text-xl font-semibold text-fg">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </header>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
      >
        {children}
        {footer}
      </form>
    </div>
  );
}

export interface SubNavItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  disabled?: boolean;
}
export interface SubNavGroup {
  id: string;
  label?: string;
  items: SubNavItem[];
}

/** Vertical secondary navigation (Configure / Settings). */
export function SubNav({
  groups,
  value,
  onSelect,
  label = "Section navigation",
  className,
}: {
  groups: SubNavGroup[];
  value?: string;
  onSelect?: (id: string) => void;
  label?: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={cn("grid w-56 gap-4 text-sm", className)}>
      {groups.map((g) => (
        <div key={g.id} role="group" aria-label={g.label}>
          {g.label && <div className="mb-1 px-2 text-[0.6875rem] tracking-wider text-subtle uppercase" aria-hidden>{g.label}</div>}
          <ul className="grid gap-0.5">
            {g.items.map((it) => {
              const cls = cn(
                "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-start text-muted hover:bg-hover hover:text-fg aria-[current=page]:bg-hover aria-[current=page]:text-fg",
                it.disabled && "pointer-events-none opacity-50",
              );
              const current = value === it.id ? ("page" as const) : undefined;
              return (
                <li key={it.id}>
                  {it.href ? (
                    <a
                      href={it.href}
                      aria-current={current}
                      className={cls}
                      onClick={(e) => {
                        if (onSelect) {
                          e.preventDefault();
                          onSelect(it.id);
                        }
                      }}
                    >
                      {it.icon}
                      {it.label}
                    </a>
                  ) : (
                    <button type="button" aria-current={current} disabled={it.disabled} className={cls} onClick={() => onSelect?.(it.id)}>
                      {it.icon}
                      {it.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** Hamburger that opens the sidebar in a Drawer; hidden from 860px up. */
export function MobileNav({
  children,
  title = "Navigation",
  triggerLabel = "Open navigation",
  open,
  onOpenChange,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  triggerLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <button type="button" aria-label={triggerLabel} className={cn("btn btn-ghost btn-sm min-[860px]:hidden", className)}>
          <Menu aria-hidden />
        </button>
      </DrawerTrigger>
      <DrawerContent title={title} width="sm">
        {children}
      </DrawerContent>
    </Drawer>
  );
}
