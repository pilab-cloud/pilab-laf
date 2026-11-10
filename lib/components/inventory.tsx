import { ArrowDown, ArrowUp, LogOut, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Badge } from "./display";
import { EmptyState } from "./display";
import { Skeleton } from "./feedback";
import { Progress } from "./helpers";
import { Table } from "./data";
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

/* ── Legacy data grid (sortable, selectable) — superseded by DataGrid in datagrid.tsx; kept for one minor ── */
export interface GridColumnLegacy<T> {
  id: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  numeric?: boolean;
}

export interface GridSortLegacy {
  id: string;
  dir: "asc" | "desc";
}

export interface DataGridLegacyProps<T> {
  columns: GridColumnLegacy<T>[];
  rows: T[];
  rowId: (row: T) => string;
  sort?: GridSortLegacy;
  onSortChange?: (sort: GridSortLegacy | undefined) => void;
  selected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataGridLegacy<T>({
  columns,
  rows,
  rowId,
  sort,
  onSortChange,
  selected,
  onSelectedChange,
  loading,
  emptyTitle: emptyTitleProp,
  emptyDescription,
}: DataGridLegacyProps<T>) {
  const { t: laf } = useLaf();
  const emptyTitle = emptyTitleProp ?? laf.nothingHere;
  const selectable = !!onSelectedChange;
  const ids = rows.map(rowId);
  const sel = new Set(selected);
  const allOn = ids.length > 0 && ids.every((i) => sel.has(i));
  const someOn = ids.some((i) => sel.has(i));

  const cycle = (id: string) => {
    if (sort?.id !== id) onSortChange?.({ id, dir: "asc" });
    else if (sort.dir === "asc") onSortChange?.({ id, dir: "desc" });
    else onSortChange?.(undefined);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            {selectable && (
              <th className="w-10">
                <input
                  type="checkbox"
                  aria-label={laf.selectAllRows}
                  checked={allOn}
                  ref={(el) => {
                    if (el) el.indeterminate = !allOn && someOn;
                  }}
                  onChange={() => onSelectedChange!(allOn ? [] : ids)}
                />
              </th>
            )}
            {columns.map((c) => (
              <th
                key={c.id}
                className={cn(c.numeric && "text-end")}
                aria-sort={sort?.id === c.id ? (sort.dir === "asc" ? "ascending" : "descending") : c.sortable ? "none" : undefined}
              >
                {c.sortable ? (
                  <button type="button" className="inline-flex items-center gap-1 font-[inherit] uppercase hover:text-fg" onClick={() => cycle(c.id)}>
                    {c.header}
                    {sort?.id === c.id && (sort.dir === "asc" ? <ArrowUp className="size-3" aria-hidden /> : <ArrowDown className="size-3" aria-hidden />)}
                  </button>
                ) : (
                  c.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody aria-busy={loading || undefined}>
          {loading
            ? Array.from({ length: 4 }, (_, i) => (
                <tr key={i}>
                  {Array.from({ length: columns.length + (selectable ? 1 : 0) }, (_, j) => (
                    <td key={j}>
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((row) => {
                const id = rowId(row);
                return (
                  <tr key={id} aria-selected={selectable ? sel.has(id) : undefined}>
                    {selectable && (
                      <td>
                        <input
                          type="checkbox"
                          aria-label={laf.selectRow}
                          checked={sel.has(id)}
                          onChange={() => onSelectedChange!(sel.has(id) ? selected!.filter((s) => s !== id) : [...(selected ?? []), id])}
                        />
                      </td>
                    )}
                    {columns.map((c) => (
                      <td key={c.id} className={cn(c.numeric && "text-end font-mono")}>
                        {c.cell(row)}
                      </td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </Table>
      {!loading && rows.length === 0 && <EmptyState title={emptyTitle} description={emptyDescription} />}
    </>
  );
}

/* ── Task panel (async operations) ── */
export type TaskStatus = "queued" | "running" | "ok" | "failed" | "cancelled";

export interface TaskItem {
  id: string;
  name: string;
  target?: string;
  initiator?: string;
  status: TaskStatus;
  /** 0–100 while running */
  progress?: number;
  started?: string;
  error?: string;
}

const taskTone = { queued: "neutral", running: "primary", ok: "ok", failed: "danger", cancelled: "warn" } as const;

export function TaskPanel({
  tasks,
  onCancel,
  onRetry,
  labels: labelsProp,
}: {
  tasks: TaskItem[];
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
  labels?: { cancel: string; retry: string; empty: string };
}) {
  const { t: laf } = useLaf();
  const labels = labelsProp ?? { cancel: laf.cancel, retry: laf.retry, empty: laf.noRecentTasks };
  if (tasks.length === 0) return <p className="px-4 py-6 text-center text-sm text-muted">{labels.empty}</p>;
  return (
    <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
      {tasks.map((t) => (
        <li key={t.id} className="grid gap-1.5 px-4 py-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="min-w-0 flex-1 truncate font-medium text-fg">
              {t.name}
              {t.target && <span className="ms-2 font-normal text-muted">{t.target}</span>}
            </span>
            <span aria-live="polite">
              <Badge tone={taskTone[t.status]}>{t.status}</Badge>
            </span>
            {t.status === "running" && onCancel && (
              <button type="button" className="text-primary hover:underline" onClick={() => onCancel(t.id)}>
                {labels.cancel}
              </button>
            )}
            {t.status === "failed" && onRetry && (
              <button type="button" className="text-primary hover:underline" onClick={() => onRetry(t.id)}>
                {labels.retry}
              </button>
            )}
          </div>
          {t.status === "running" && <Progress label={t.name} value={t.progress} />}
          <div className="font-mono text-xs text-subtle">
            {[t.initiator, t.started].filter(Boolean).join(" · ")}
          </div>
          {t.error && <div className="text-xs text-danger">{t.error}</div>}
        </li>
      ))}
    </ul>
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
        <button aria-label={name} className="border-0 bg-transparent p-0">
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
