import * as React from "react";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { contentEn } from "../messages/content.en";
import { Button } from "./button";
import { Chip } from "./extras";
import { ActionBar, type ActionBarProps } from "./action-bar";

const lafDefaults = { content: contentEn };

const FOCUSABLE =
  'a[href],button,input:not([type="hidden"]),select,textarea,[role="button"],[role="combobox"],[role="radio"],[role="switch"],[role="checkbox"],[role="tab"],[tabindex]';
const TEXT_ENTRY = 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]),textarea,select,[contenteditable="true"]';

/** Items that take part in arrow-key navigation: enabled, not hidden, not in a nested toolbar. */
function navigable(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-disabled") !== "true" && !el.closest("[hidden],[aria-hidden='true']") && el.closest('[role="toolbar"]') === root,
  );
}

export interface ToolbarProps extends React.ComponentProps<"div"> {
  /** Stick to the top of the scroll container. */
  sticky?: boolean;
  /** Bulk-selection mode: shows the count and `bulkActions` in place of the regular content. */
  selectedCount?: number;
  bulkActions?: React.ReactNode;
  onClearSelection?: () => void;
  labels?: { selected?: (n: number) => string; clearSelection?: string };
}

/**
 * Flexible, wrapping action row. With an `aria-label` it becomes `role="toolbar"` and ←/→ (mirrored in RTL), Home and End
 * move focus between its controls; text fields keep their own arrow keys.
 */
export function Toolbar({ className, sticky, selectedCount = 0, bulkActions, onClearSelection, labels, children, onKeyDown, ...props }: ToolbarProps) {
  const isToolbar = !!props["aria-label"] || !!props["aria-labelledby"];
  const bulk = selectedCount > 0;

  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    const root = e.currentTarget;
    if (!isToolbar || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const target = e.target as HTMLElement;
    if (!root.contains(target) || target.closest('[role="toolbar"]') !== root || target.matches(TEXT_ENTRY)) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    const items = navigable(root);
    const i = items.indexOf(target.closest<HTMLElement>(FOCUSABLE) ?? target);
    if (i < 0) return;
    const rtl = getComputedStyle(root).direction === "rtl";
    const step = e.key === "ArrowRight" ? (rtl ? -1 : 1) : e.key === "ArrowLeft" ? (rtl ? 1 : -1) : 0;
    const next = e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : (i + step + items.length) % items.length;
    e.preventDefault();
    items[next]?.focus();
  };

  return (
    <div
      role={isToolbar ? "toolbar" : undefined}
      className={cn("toolbar", sticky && "sticky top-0 z-10 border-b border-line bg-[var(--bg)] py-2", bulk && "bg-primary-light", className)}
      onKeyDown={keyDown}
      {...props}
    >
      {bulk && <ToolbarBulk count={selectedCount} onClear={onClearSelection} labels={labels}>{bulkActions}</ToolbarBulk>}
      <div hidden={bulk} className="contents [&[hidden]]:hidden">
        {children}
      </div>
    </div>
  );
}

/** Single line of toolbar content; use when a toolbar holds several rows (e.g. controls + filter chips). */
export function ToolbarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex w-full min-w-0 flex-wrap items-center gap-2.5", className)} {...props} />;
}

export interface ToolbarGroupProps extends React.ComponentProps<"div"> {
  /** `pagination` and `align="end"` push the group to the inline end. */
  variant?: "filter" | "action" | "pagination";
  align?: "start" | "end";
}

export function ToolbarGroup({ variant, align, className, ...props }: ToolbarGroupProps) {
  return (
    <div
      data-variant={variant}
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-2",
        (variant === "pagination" || align === "end") && "ms-auto",
        variant === "pagination" && "[&_.pagination]:p-0",
        className,
      )}
      {...props}
    />
  );
}

export function ToolbarItem({ grow, className, ...props }: React.ComponentProps<"div"> & { /** Fill the available width (search fields). */ grow?: boolean }) {
  return <div className={cn("flex min-w-0 items-center", grow && "min-w-56 flex-1", className)} {...props} />;
}

/** Pushes the following items to the inline end. */
export function ToolbarSpacer({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden className={cn("flex-1", className)} {...props} />;
}

export function ToolbarDivider({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="separator" aria-orientation="vertical" className={cn("h-5 w-px shrink-0 self-center bg-line", className)} {...props} />;
}

/** `ActionBar` as a toolbar item: actions that do not fit collapse into an overflow menu. */
export function ToolbarActions({ className, ...props }: ActionBarProps) {
  return <ActionBar className={cn("min-w-0 flex-1", className)} {...props} />;
}

export interface ToolbarFilter {
  id: string;
  label: string;
  /** Chips with the same category are grouped under it. */
  category?: string;
}

export interface ToolbarFilterChipsProps {
  filters: ToolbarFilter[];
  onRemove?: (filter: ToolbarFilter) => void;
  onClearAll?: () => void;
  className?: string;
  labels?: { activeFilters?: string; removeFilter?: (label: string) => string; clearAll?: string };
}

/** Row of applied filters with a "clear all" action. Renders nothing when empty. */
export function ToolbarFilterChips({ filters, onRemove, onClearAll, className, labels }: ToolbarFilterChipsProps) {
  const { t } = useLafDefaults(lafDefaults);
  const m = t.components.content.toolbar;
  if (filters.length === 0) return null;
  const groups = new Map<string, ToolbarFilter[]>();
  for (const f of filters) groups.set(f.category ?? "", [...(groups.get(f.category ?? "") ?? []), f]);
  return (
    <div role="group" aria-label={labels?.activeFilters ?? m.activeFilters} className={cn("flex w-full flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {[...groups].map(([category, list]) => (
        <div key={category} role={category ? "group" : undefined} aria-label={category || undefined} className="flex flex-wrap items-center gap-1.5">
          {category && (
            <span aria-hidden className="text-xs text-muted">
              {category}
            </span>
          )}
          {list.map((f) => (
            <Chip key={f.id} onRemove={onRemove ? () => onRemove(f) : undefined} removeLabel={(labels?.removeFilter ?? m.removeFilter)(f.label)}>
              {f.label}
            </Chip>
          ))}
        </div>
      ))}
      {onClearAll && (
        <Button variant="ghost" size="sm" onClick={onClearAll}>
          {labels?.clearAll ?? m.clearAll}
        </Button>
      )}
    </div>
  );
}

export interface ToolbarBulkProps {
  count: number;
  onClear?: () => void;
  children?: React.ReactNode;
  className?: string;
  labels?: { selected?: (n: number) => string; clearSelection?: string };
}

/** Selected-count + actions strip, announced politely as the selection changes. */
export function ToolbarBulk({ count, onClear, children, className, labels }: ToolbarBulkProps) {
  const { t } = useLafDefaults(lafDefaults);
  const m = t.components.content.toolbar;
  return (
    <div className={cn("flex w-full min-w-0 flex-wrap items-center gap-2", className)}>
      <span role="status" className="me-1 text-sm font-medium text-fg">
        {(labels?.selected ?? m.selected)(count)}
      </span>
      {children}
      {onClear && (
        <Button variant="ghost" size="sm" className="ms-auto" onClick={onClear}>
          {labels?.clearSelection ?? m.clearSelection}
        </Button>
      )}
    </div>
  );
}
