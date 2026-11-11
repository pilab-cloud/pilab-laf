import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf } from "../i18n";
import { settingsEn } from "../messages/settings.en";
import { useControllableState } from "../utils";
import { Button } from "./button";
import { Badge, EmptyState } from "./display";
import { Checkbox } from "./form";
import { UnsavedChangesDialog, useUnsavedChangesGuard } from "./layout";
import { Dialog, DialogContent, type DialogSize } from "./overlay";
import { StatusDot } from "./primitives";

type SettingsMessages = typeof settingsEn;

/** English defaults merged with any `components.settings` override from the active locale. */
function useSettingsText(): SettingsMessages {
  const { t } = useLaf();
  const over = (t.components as Record<string, Partial<Record<keyof SettingsMessages, object>> | undefined>).settings;
  return React.useMemo(
    () =>
      Object.fromEntries(
        Object.entries(settingsEn).map(([k, v]) => [k, { ...v, ...over?.[k as keyof SettingsMessages] }]),
      ) as SettingsMessages,
    [over],
  );
}

/* ── SettingsSection ── */
export interface SettingsSectionProps {
  id: string;
  title: string;
  description?: string;
  /** Icon shown in the dialog navigation. */
  icon?: React.ReactNode;
  /** Number of validation errors in this section; shown as a badge on the navigation. */
  errorCount?: number;
  children?: React.ReactNode;
}

/** One titled group of settings; place `SettingRow`s (or any form content) inside. */
export function SettingsSection({ id, title, description, children, className }: Pick<SettingsSectionProps, "id" | "title" | "description" | "children"> & { className?: string }) {
  const headId = `${id}-heading`;
  return (
    <section id={`${id}-panel`} aria-labelledby={headId} className={cn("grid min-w-0 content-start gap-3", className)}>
      <header>
        <h3 id={headId} className="text-base font-semibold text-fg">
          {title}
        </h3>
        {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
      </header>
      <div className="grid min-w-0 divide-y divide-line">{children}</div>
    </section>
  );
}

/* ── SettingRow ── */
export interface SettingRowProps {
  label: string;
  help?: React.ReactNode;
  /** `id` of the control, to associate the visible label with it. */
  htmlFor?: string;
  error?: string;
  /** `true` shows an "Overridden" badge, `false` an "Inherited" one; leave undefined for neither. */
  overridden?: boolean;
  /** Shows a reset-to-default action while the value is overridden. */
  onReset?: () => void;
  /** `auto` puts the control beside the label when the row is wide enough. */
  layout?: "auto" | "inline" | "stacked";
  className?: string;
  children: React.ReactNode;
}

/** Label + help + control row that goes inline or stacked depending on its own width. */
export function SettingRow({ label, help, htmlFor, error, overridden, onReset, layout = "auto", className, children }: SettingRowProps) {
  const t = useSettingsText().row;
  const uid = React.useId();
  const labelId = `${uid}-label`;
  const helpId = `${uid}-help`;
  const errId = `${uid}-err`;
  const describedBy = [help ? helpId : null, error ? errId : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("@container min-w-0 py-3 first:pt-0 last:pb-0", className)}>
      <div
        className={cn(
          "grid min-w-0 gap-2",
          layout === "inline" && "grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-x-4",
          layout === "auto" && "@lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] @lg:items-start @lg:gap-x-4",
        )}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <label id={labelId} htmlFor={htmlFor} className="text-sm font-medium text-fg">
              {label}
            </label>
            {overridden !== undefined && <Badge tone={overridden ? "primary" : "neutral"}>{overridden ? t.overridden : t.inherited}</Badge>}
            {overridden && onReset && (
              <Button variant="ghost" size="sm" aria-label={t.resetNamed(label)} onClick={onReset}>
                {t.resetToDefault}
              </Button>
            )}
          </div>
          {help && (
            <p id={helpId} className="mt-0.5 text-xs text-muted">
              {help}
            </p>
          )}
        </div>
        <div role="group" aria-labelledby={labelId} aria-describedby={describedBy} className="grid min-w-0 gap-1">
          {children}
          {error && (
            <p id={errId} className="field-error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── SettingsDialog ── */
export interface SettingsDialogProps {
  title: string;
  description?: string;
  sections: SettingsSectionProps[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Whether the form differs from its saved state; enables Apply/Reset and the unsaved-changes guard. */
  dirty?: boolean;
  /** Persist the changes. While the promise is pending the footer is busy; a rejection keeps the dialog open. */
  onApply?: () => void | Promise<void>;
  /** Discard edits back to the saved state; the Reset button appears only when provided. */
  onReset?: () => void;
  onCancel?: () => void;
  size?: DialogSize;
  activeSection?: string;
  defaultActiveSection?: string;
  onActiveSectionChange?: (id: string) => void;
  className?: string;
}

export function SettingsDialog({
  title,
  description,
  sections,
  open,
  onOpenChange,
  dirty = false,
  onApply,
  onReset,
  onCancel,
  size = "xl",
  activeSection,
  defaultActiveSection,
  onActiveSectionChange,
  className,
}: SettingsDialogProps) {
  const t = useSettingsText().dialog;
  const [activeId, setActive] = useControllableState({
    value: activeSection,
    defaultValue: defaultActiveSection ?? sections[0]?.id ?? "",
    onChange: onActiveSectionChange,
  });
  const [busy, setBusy] = React.useState(false);
  const guard = useUnsavedChangesGuard(dirty && !!open);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  const close = () => {
    onCancel?.();
    onOpenChange?.(false);
  };
  const cancel = () => guard.guard(close);

  /** Returns false (and jumps to the offending section) when validation errors block saving. */
  const apply = async (): Promise<boolean> => {
    const bad = sections.find((s) => (s.errorCount ?? 0) > 0);
    if (bad) {
      setActive(bad.id);
      return false;
    }
    setBusy(true);
    try {
      await onApply?.();
      return true;
    } catch {
      return false;
    } finally {
      setBusy(false);
    }
  };
  const ok = async () => {
    if (busy) return;
    if (!dirty || (await apply())) onOpenChange?.(false);
  };

  const footer = (
    <div className="flex w-full flex-wrap items-center gap-2">
      {dirty && (
        <span role="status" className="text-xs text-muted">
          {t.unsaved}
        </span>
      )}
      <div className="ms-auto flex flex-wrap justify-end gap-2">
        {onReset && (
          <Button variant="ghost" disabled={!dirty || busy} onClick={onReset}>
            {t.reset}
          </Button>
        )}
        <Button variant="secondary" disabled={busy} onClick={cancel}>
          {t.cancel}
        </Button>
        <Button variant="secondary" disabled={!dirty} loading={busy} onClick={() => void apply()}>
          {t.apply}
        </Button>
        <Button disabled={busy} onClick={() => void ok()}>
          {t.ok}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange?.(true) : cancel())}>
      <DialogContent title={title} description={description} size={size} footer={footer}>
        <div className={cn("@container grid min-w-0 gap-4 @2xl:grid-cols-[13rem_minmax(0,1fr)] @2xl:gap-6", className)}>
          <nav aria-label={t.sections} className="min-w-0 @2xl:sticky @2xl:top-0 @2xl:self-start">
            <ul className="m-0 flex list-none flex-row flex-wrap gap-1 p-0 @2xl:flex-col">
              {sections.map((s) => {
                const current = s.id === active?.id;
                const errs = s.errorCount ?? 0;
                return (
                  <li key={s.id} className="min-w-0">
                    <button
                      type="button"
                      aria-current={current ? "page" : undefined}
                      onClick={() => setActive(s.id)}
                      className={cn(
                        "flex w-full min-w-0 items-center gap-2 rounded-sm border border-transparent bg-transparent px-2.5 py-1.5 text-start text-sm text-fg hover:bg-muted-bg focus-visible:outline-2 focus-visible:outline-primary",
                        current && "border-line bg-muted-bg font-medium",
                      )}
                    >
                      {s.icon && (
                        <span aria-hidden className="inline-flex shrink-0 text-muted">
                          {s.icon}
                        </span>
                      )}
                      <span className="min-w-0 flex-1 truncate">{s.title}</span>
                      {errs > 0 && (
                        <Badge tone="danger">
                          <span aria-hidden>{errs}</span>
                          <span className="sr-only">{t.errors(errs)}</span>
                        </Badge>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          {active && (
            <SettingsSection key={active.id} id={active.id} title={active.title} description={active.description}>
              {active.children}
            </SettingsSection>
          )}
        </div>
        <UnsavedChangesDialog guard={guard} />
      </DialogContent>
    </Dialog>
  );
}

/* ── DeviceList ── */
export interface DeviceColumn<T> {
  id: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  className?: string;
}

export interface DeviceStatus {
  tone: "ok" | "warn" | "danger" | "neutral" | "primary";
  label: string;
}

export interface DeviceListProps<T> {
  /** Accessible name of the list. */
  label: string;
  value: T[];
  onChange: (next: T[]) => void;
  getId: (item: T) => string;
  /** Human-readable name used in row action labels; defaults to the id. */
  getLabel?: (item: T) => string;
  columns: DeviceColumn<T>[];
  /** Per-row status dot. */
  status?: (item: T) => DeviceStatus;
  /** Inline editor shown under the row while it is expanded; call `onItemChange` with the updated item. */
  renderEditor?: (item: T, onItemChange: (next: T) => void) => React.ReactNode;
  /** Creates a new item for the Add button (may be async; resolve `undefined` to cancel). Hides Add when omitted. */
  onAdd?: () => T | undefined | Promise<T | undefined>;
  addLabel?: string;
  /** Show up/down buttons. Defaults to true. */
  reorderable?: boolean;
  /** Show row checkboxes and the bulk remove button. Defaults to true. */
  selectable?: boolean;
  canRemove?: (item: T) => boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

/** Editable, reorderable list of devices (NICs, uplinks, disks, peers) with inline row editing and bulk remove. */
export function DeviceList<T>({
  label,
  value,
  onChange,
  getId,
  getLabel,
  columns,
  status,
  renderEditor,
  onAdd,
  addLabel,
  reorderable = true,
  selectable = true,
  canRemove,
  emptyTitle,
  emptyDescription,
  className,
}: DeviceListProps<T>) {
  const t = useSettingsText().deviceList;
  const [selected, setSelected] = React.useState<string[]>([]);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const nameOf = (item: T) => getLabel?.(item) ?? getId(item);
  const ids = value.map(getId);
  const live = selected.filter((id) => ids.includes(id));
  const removable = (item: T) => canRemove?.(item) ?? true;
  const bulkIds = value.filter((i) => live.includes(getId(i)) && removable(i)).map(getId);

  const move = (index: number, by: -1 | 1) => {
    const next = value.slice();
    const [item] = next.splice(index, 1);
    next.splice(index + by, 0, item!);
    onChange(next);
  };
  const remove = (removeIds: string[]) => {
    onChange(value.filter((i) => !removeIds.includes(getId(i))));
    setSelected((s) => s.filter((id) => !removeIds.includes(id)));
    setExpanded((e) => (e && removeIds.includes(e) ? null : e));
  };
  const add = async () => {
    const item = await onAdd?.();
    if (item === undefined) return;
    onChange([...value, item]);
    if (renderEditor) setExpanded(getId(item));
  };

  const colSpan = columns.length + (selectable ? 1 : 0) + (status ? 1 : 0) + 1;
  const addButton = onAdd && (
    <Button size="sm" variant="secondary" leftIcon={<Plus aria-hidden />} onClick={() => void add()}>
      {addLabel ?? t.add}
    </Button>
  );

  return (
    <div className={cn("grid min-w-0 gap-2", className)}>
      {(addButton || (selectable && value.length > 0)) && (
        <div className="flex flex-wrap items-center gap-2">
          {addButton}
          {selectable && (
            <Button size="sm" variant="danger" disabled={bulkIds.length === 0} leftIcon={<Trash2 aria-hidden />} onClick={() => remove(bulkIds)}>
              {t.removeSelected(bulkIds.length)}
            </Button>
          )}
        </div>
      )}
      {value.length === 0 ? (
        <EmptyState title={emptyTitle ?? t.empty} description={emptyDescription ?? t.emptyHint} action={addButton || undefined} />
      ) : (
        <div className="relative min-w-0 overflow-x-auto rounded-sm border border-line">
          <table className="w-full border-collapse text-sm" aria-label={label}>
            <thead>
              <tr className="border-b border-line text-start text-xs text-muted">
                {selectable && (
                  <th scope="col" className="w-8 p-2 text-start">
                    <Checkbox
                      aria-label={t.selectAll}
                      checked={live.length === value.length}
                      onChange={(e) => setSelected(e.target.checked ? ids : [])}
                    />
                  </th>
                )}
                {status && (
                  <th scope="col" className="w-8 p-2 text-start">
                    <span className="sr-only">{t.status}</span>
                  </th>
                )}
                {columns.map((c) => (
                  <th key={c.id} scope="col" className={cn("p-2 text-start font-medium", c.className)}>
                    {c.header}
                  </th>
                ))}
                <th scope="col" className="p-2 text-end">
                  <span className="sr-only">{t.actions}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {value.map((item, index) => {
                const id = getId(item);
                const name = nameOf(item);
                const open = expanded === id && !!renderEditor;
                const st = status?.(item);
                return (
                  <React.Fragment key={id}>
                    <tr className="border-b border-line last:border-b-0">
                      {selectable && (
                        <td className="p-2">
                          <Checkbox
                            aria-label={t.selectRow(name)}
                            checked={live.includes(id)}
                            onChange={(e) => setSelected((s) => (e.target.checked ? [...s, id] : s.filter((x) => x !== id)))}
                          />
                        </td>
                      )}
                      {st && (
                        <td className="p-2">
                          <StatusDot tone={st.tone} label={st.label} srOnly />
                        </td>
                      )}
                      {columns.map((c) => (
                        <td key={c.id} className={cn("p-2", c.className)}>
                          {c.cell(item)}
                        </td>
                      ))}
                      <td className="p-2">
                        <div className="flex flex-nowrap justify-end gap-0.5">
                          {reorderable && (
                            <>
                              <Button variant="ghost" size="sm" className="px-0" aria-label={t.moveUp(name)} disabled={index === 0} onClick={() => move(index, -1)}>
                                <ChevronUp aria-hidden />
                              </Button>
                              <Button variant="ghost" size="sm" className="px-0" aria-label={t.moveDown(name)} disabled={index === value.length - 1} onClick={() => move(index, 1)}>
                                <ChevronDown aria-hidden />
                              </Button>
                            </>
                          )}
                          {renderEditor && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="px-0"
                              aria-label={t.editNamed(name)}
                              aria-expanded={open}
                              onClick={() => setExpanded(open ? null : id)}
                            >
                              <Pencil aria-hidden />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="px-0" aria-label={t.removeNamed(name)} disabled={!removable(item)} onClick={() => remove([id])}>
                            <Trash2 aria-hidden />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {open && (
                      <tr className="border-b border-line bg-muted-bg/40 last:border-b-0">
                        <td colSpan={colSpan} className="p-3">
                          {renderEditor(item, (next) => onChange(value.map((v, i) => (i === index ? next : v))))}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
