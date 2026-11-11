import { ChevronRight, LogOut, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Badge } from "./display";
import { Progress } from "./helpers";
import { Avatar } from "./display";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./overlay";
import { useLaf } from "../i18n";

/* ── Task panel (async operations) ── */
export type TaskStatus = "queued" | "running" | "ok" | "failed" | "cancelled";

export interface TaskItem {
  id: string;
  name: string;
  target?: string;
  /** Opaque id passed to `onOpenTarget`. */
  targetId?: string;
  initiator?: string;
  status: TaskStatus;
  /** 0–100 while running */
  progress?: number;
  started?: string;
  /** Elapsed / total time in ms; shown via `format.duration`. */
  durationMs?: number;
  /** Extra detail shown when the row is expanded. */
  detail?: string;
  error?: string;
}

const taskTone = { queued: "neutral", running: "primary", ok: "ok", failed: "danger", cancelled: "warn" } as const;
const taskStatuses: TaskStatus[] = ["queued", "running", "ok", "failed", "cancelled"];

export function TaskPanel({
  tasks,
  onCancel,
  onRetry,
  onOpenTarget,
  filterable,
  currentUser,
  docked,
  labels: labelsProp,
}: {
  tasks: TaskItem[];
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
  /** Makes the target a link-button. */
  onOpenTarget?: (task: TaskItem) => void;
  /** Mine/All and status filters. */
  filterable?: boolean;
  /** Matched against `initiator` for the "Mine" filter. */
  currentUser?: string;
  /** Flat styling for use inside a docked split pane. */
  docked?: boolean;
  labels?: {
    cancel: string;
    retry: string;
    empty: string;
    all?: string;
    mine?: string;
    status?: string;
    details?: string;
    openTarget?: string;
  };
}) {
  const { t: laf, format } = useLaf();
  const labels = {
    cancel: laf.cancel,
    retry: laf.retry,
    empty: laf.noRecentTasks,
    all: laf.vsFilterAll,
    mine: laf.vsFilterMine,
    status: laf.vsStatusFilter,
    details: laf.vsDetails,
    openTarget: laf.vsOpenTarget,
    ...labelsProp,
  };
  const [scope, setScope] = React.useState<"all" | "mine">("all");
  const [status, setStatus] = React.useState<TaskStatus | "all">("all");
  const [open, setOpen] = React.useState<Set<string>>(() => new Set());
  const visible = tasks.filter(
    (t) => (scope === "all" || t.initiator === currentUser) && (status === "all" || t.status === status),
  );
  const toggle = (id: string) =>
    setOpen((o) => {
      const n = new Set(o);
      if (!n.delete(id)) n.add(id);
      return n;
    });
  const linkBtn = "border-0 bg-transparent p-0 text-primary hover:underline";
  return (
    <div className={cn("grid gap-2", docked && "h-full content-start")}>
      {filterable && (
        <div className="flex flex-wrap items-center gap-2 px-1 text-sm">
          <div role="group" aria-label={`${labels.all} / ${labels.mine}`} className="flex gap-1">
            {(["all", "mine"] as const).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={scope === k}
                className={cn("btn btn-ghost btn-sm", scope === k && "bg-primary-light")}
                onClick={() => setScope(k)}
              >
                {labels[k]}
              </button>
            ))}
          </div>
          <select
            aria-label={labels.status}
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus | "all")}
            className="rounded-sm border border-line bg-surface px-2 py-1 text-sm"
          >
            <option value="all">{labels.all}</option>
            {taskStatuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      )}
      {visible.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-muted">{labels.empty}</p>
      ) : (
        <ul className={cn("divide-y divide-line bg-surface", !docked && "rounded-lg border border-line")}>
          {visible.map((t) => {
            const expandable = !!(t.detail || t.error);
            const expanded = open.has(t.id);
            return (
              <li key={t.id} className="grid gap-1.5 px-4 py-3 text-sm">
                <div className="flex items-center gap-3">
                  {expandable && (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-label={labels.details}
                      onClick={() => toggle(t.id)}
                      className="border-0 bg-transparent p-0 text-muted"
                    >
                      <ChevronRight className={cn("size-4 transition-transform", expanded && "rotate-90")} aria-hidden />
                    </button>
                  )}
                  <span className="min-w-0 flex-1 truncate font-medium text-fg">
                    {t.name}
                    {t.target &&
                      (onOpenTarget ? (
                        <button type="button" className={cn(linkBtn, "ms-2 font-normal")} onClick={() => onOpenTarget(t)}>
                          {t.target}
                        </button>
                      ) : (
                        <span className="ms-2 font-normal text-muted">{t.target}</span>
                      ))}
                  </span>
                  <span aria-live="polite">
                    <Badge tone={taskTone[t.status]}>{t.status}</Badge>
                  </span>
                  {t.status === "running" && onCancel && (
                    <button type="button" className={linkBtn} onClick={() => onCancel(t.id)}>
                      {labels.cancel}
                    </button>
                  )}
                  {t.status === "failed" && onRetry && (
                    <button type="button" className={linkBtn} onClick={() => onRetry(t.id)}>
                      {labels.retry}
                    </button>
                  )}
                </div>
                {t.status === "running" && <Progress label={t.name} value={t.progress} />}
                <div className="font-mono text-xs text-subtle">
                  {[t.initiator, t.started, t.durationMs !== undefined ? format.duration(t.durationMs) : undefined]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
                {t.error && <div className="text-xs text-danger">{t.error}</div>}
                {expanded && t.detail && <div className="text-xs text-muted">{t.detail}</div>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ── User menu (session) ── */
export function UserMenu({
  name,
  email,
  tenant,
  items,
  signOutLabel: signOutLabelProp,
  onSignOut,
  impersonating,
  expiresAt,
  expiryWarnMs = 300_000,
  expiryLabel = (r) => `Session expires in ${r}`,
}: {
  name: string;
  email?: string;
  tenant?: string;
  items?: { id: string; label: string; icon?: React.ReactNode; onSelect: () => void }[];
  signOutLabel?: string;
  onSignOut: () => void;
  /** Admin acting as another user. */
  impersonating?: { as: string; onStop: () => void; stopLabel?: string };
  /** Session expiry; a warning row appears once less than `expiryWarnMs` remain. */
  expiresAt?: Date | string | number;
  expiryWarnMs?: number;
  expiryLabel?: (remaining: string) => string;
}) {
  const { t: laf, format } = useLaf();
  const signOutLabel = signOutLabelProp ?? laf.signOut;
  const remainingMs = expiresAt === undefined ? undefined : new Date(expiresAt).getTime() - Date.now();
  const showExpiry = remainingMs !== undefined && remainingMs <= expiryWarnMs;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="border-0 bg-transparent p-0">
          <Avatar name={name} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="text-fg">{name}</div>
          {email && <div className="text-xs font-normal text-muted">{email}</div>}
          {tenant && <div className="text-xs font-normal text-subtle">{tenant}</div>}
        </DropdownMenuLabel>
        {(impersonating || showExpiry) && <DropdownMenuSeparator />}
        {impersonating && (
          <DropdownMenuItem onSelect={impersonating.onStop}>
            {`${impersonating.stopLabel ?? "Stop impersonating"}: ${impersonating.as}`}
          </DropdownMenuItem>
        )}
        {showExpiry && (
          <div role="status" className="px-2 py-1.5 text-xs text-warn">
            {expiryLabel(format.duration(Math.max(0, remainingMs!)))}
          </div>
        )}
        <DropdownMenuSeparator />
        {items?.map((it) => (
          <DropdownMenuItem key={it.id} onSelect={it.onSelect}>
            {it.icon}
            {it.label}
          </DropdownMenuItem>
        ))}
        {items && items.length > 0 && <DropdownMenuSeparator />}
        <DropdownMenuItem danger onSelect={onSignOut}>
          <LogOut aria-hidden />
          {signOutLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
