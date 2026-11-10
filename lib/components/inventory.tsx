import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, LogOut, X } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { useControllableState } from "../utils";
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

/* ── Combobox (generic, single or multi, async) ── */
export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[] | ((query: string) => ComboboxOption[] | Promise<ComboboxOption[]>);
  value: ComboboxOption[];
  onChange: (value: ComboboxOption[]) => void;
  multiple?: boolean;
  label: string;
  placeholder?: string;
  emptyText?: string;
  loadingText?: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  multiple,
  label,
  placeholder,
  emptyText: emptyTextProp,
  loadingText: loadingTextProp,
  disabled,
}: ComboboxProps) {
  const { t } = useLaf();
  const emptyText = emptyTextProp ?? t.noResults;
  const loadingText = loadingTextProp ?? `${t.loading}…`;
  const id = React.useId();
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState<ComboboxOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    const t = window.setTimeout(
      async () => {
        const res =
          typeof options === "function"
            ? await options(query)
            : options.filter((o) => (o.label + (o.description ?? "")).toLowerCase().includes(query.toLowerCase()));
        if (!cancelled) {
          setList(res);
          setActive(0);
          setLoading(false);
        }
      },
      typeof options === "function" ? 250 : 0,
    );
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [query, open, options]);

  const isSelected = (o: ComboboxOption) => value.some((v) => v.value === o.value);
  const pick = (o: ComboboxOption) => {
    if (isSelected(o)) onChange(value.filter((v) => v.value !== o.value));
    else if (multiple) onChange([...value, o]);
    else {
      onChange([o]);
      setOpen(false);
    }
    setQuery("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && open && list[active]) {
      e.preventDefault();
      pick(list[active]!);
    } else if (e.key === "Escape") setOpen(false);
    else if (e.key === "Backspace" && !query && value.length) onChange(value.slice(0, -1));
  };

  const listId = `${id}-list`;
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
    <PopoverPrimitive.Anchor asChild>
    <div ref={root} className="relative">
      <div className="form-input flex flex-wrap items-center gap-1.5 focus-within:border-primary">
        {value.map((v) => (
          <span key={v.value} className="inline-flex h-6 items-center gap-1 rounded-sm border border-line bg-muted-bg px-2 text-xs">
            {v.label}
            {multiple && (
              <button type="button" aria-label={t.removeItem(v.label)} className="text-muted hover:text-fg" onClick={() => pick(v)}>
                <X className="size-3" aria-hidden />
              </button>
            )}
          </span>
        ))}
        <input
          role="combobox"
          aria-label={label}
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && list[active] ? `${id}-${active}` : undefined}
          className="min-w-24 flex-1 border-0 bg-transparent p-0 text-fg outline-none"
          placeholder={value.length && multiple ? undefined : placeholder}
          disabled={disabled}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
    </PopoverPrimitive.Anchor>
      <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={4}
        align="start"
        collisionPadding={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          if (root.current?.contains(e.target as Node)) e.preventDefault();
        }}
        className="z-50 w-(--radix-popover-trigger-width)"
      >
        <ul id={listId} role="listbox" aria-multiselectable={multiple || undefined} className="dropdown-menu max-h-64 w-full overflow-auto">
          {loading ? (
            <li className="px-3 py-2 text-sm text-muted">{loadingText}</li>
          ) : list.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted">{emptyText}</li>
          ) : (
            list.map((o, i) => (
              <li
                key={o.value}
                id={`${id}-${i}`}
                role="option"
                aria-selected={isSelected(o)}
                className={cn("dropdown-item cursor-pointer", i === active && "bg-surface-hover text-fg", isSelected(o) && "font-semibold")}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(o)}
              >
                <span>{o.label}</span>
                {o.description && <span className="ms-2 text-xs text-subtle">{o.description}</span>}
              </li>
            ))
          )}
        </ul>
      </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

/* ── Tree view (WAI-ARIA tree) ── */
export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps {
  nodes: TreeNode[];
  label: string;
  /** Controlled expanded ids; omit for uncontrolled. */
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Controlled selection; omit for uncontrolled. */
  selected?: string;
  defaultSelected?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

function flatten(nodes: TreeNode[], expanded: Set<string>, level = 1, out: { node: TreeNode; level: number; set: number; pos: number }[] = []) {
  nodes.forEach((node, i) => {
    out.push({ node, level, set: nodes.length, pos: i + 1 });
    if (node.children?.length && expanded.has(node.id)) flatten(node.children, expanded, level + 1, out);
  });
  return out;
}

export function TreeView({ nodes, label, expanded: expandedProp, defaultExpanded = [], onExpandedChange, selected: selectedProp, defaultSelected, onSelect: onSelectProp, className }: TreeViewProps) {
  const [expanded, setExpanded] = useControllableState<string[]>({ value: expandedProp, defaultValue: defaultExpanded, onChange: onExpandedChange });
  const [selected, setSelected] = useControllableState<string | undefined>({ value: selectedProp, defaultValue: defaultSelected });
  const onSelect = (id: string) => {
    setSelected(id);
    onSelectProp?.(id);
  };
  const open = React.useMemo(() => new Set(expanded), [expanded]);
  const rows = React.useMemo(() => flatten(nodes, open), [nodes, open]);
  const [focusId, setFocusId] = React.useState(selected ?? rows[0]?.node.id);
  const refs = React.useRef(new Map<string, HTMLDivElement>());

  const parentOf = (id: string) => {
    const find = (list: TreeNode[], parent?: TreeNode): TreeNode | undefined => {
      for (const n of list) {
        if (n.id === id) return parent;
        const r = n.children && find(n.children, n);
        if (r) return r;
      }
    };
    return find(nodes);
  };

  const toggle = (id: string, to: boolean) =>
    setExpanded(to ? [...new Set([...expanded, id])] : expanded.filter((e) => e !== id));
  const move = (id: string) => {
    setFocusId(id);
    refs.current.get(id)?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const { node } = rows[idx]!;
    const hasKids = !!node.children?.length;
    if (e.key === "ArrowDown") move(rows[Math.min(idx + 1, rows.length - 1)]!.node.id);
    else if (e.key === "ArrowUp") move(rows[Math.max(idx - 1, 0)]!.node.id);
    else if (e.key === "Home") move(rows[0]!.node.id);
    else if (e.key === "End") move(rows[rows.length - 1]!.node.id);
    else if (e.key === "ArrowRight") {
      if (hasKids && !open.has(node.id)) toggle(node.id, true);
      else if (hasKids) move(node.children![0]!.id);
    } else if (e.key === "ArrowLeft") {
      if (hasKids && open.has(node.id)) toggle(node.id, false);
      else {
        const p = parentOf(node.id);
        if (p) move(p.id);
      }
    } else if (e.key === "Enter" || e.key === " ") onSelect?.(node.id);
    else return;
    e.preventDefault();
  };

  return (
    <div role="tree" aria-label={label} className={className}>
      {rows.map(({ node, level, set, pos }, idx) => {
        const hasKids = !!node.children?.length;
        const isOpen = open.has(node.id);
        return (
          <div
            key={node.id}
            ref={(el) => {
              if (el) refs.current.set(node.id, el);
              else refs.current.delete(node.id);
            }}
            role="treeitem"
            aria-level={level}
            aria-setsize={set}
            aria-posinset={pos}
            aria-expanded={hasKids ? isOpen : undefined}
            aria-selected={selected === node.id}
            tabIndex={focusId === node.id ? 0 : -1}
            onFocus={() => setFocusId(node.id)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            onClick={() => onSelect?.(node.id)}
            className={cn(
              "flex h-7 cursor-pointer items-center gap-1.5 rounded-sm border-s-2 border-transparent pe-2 text-sm text-muted outline-none hover:bg-surface-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary",
              selected === node.id && "border-primary bg-primary-light text-fg",
            )}
            // dynamic depth indent
            style={{ paddingInlineStart: `${(level - 1) * 16 + 4}px` }}
          >
            <span
              className="flex size-4 shrink-0 items-center justify-center"
              onClick={(e) => {
                if (!hasKids) return;
                e.stopPropagation();
                toggle(node.id, !isOpen);
              }}
            >
              {hasKids && (isOpen ? <ChevronDown className="size-4" aria-hidden /> : <ChevronRight className="size-4" aria-hidden />)}
            </span>
            {node.icon && <span className="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">{node.icon}</span>}
            <span className="min-w-0 flex-1 truncate">{node.label}</span>
            {node.badge}
          </div>
        );
      })}
    </div>
  );
}

/* ── Data grid (sortable, selectable) ── */
export interface GridColumn<T> {
  id: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  numeric?: boolean;
}

export interface GridSort {
  id: string;
  dir: "asc" | "desc";
}

export interface DataGridProps<T> {
  columns: GridColumn<T>[];
  rows: T[];
  rowId: (row: T) => string;
  sort?: GridSort;
  onSortChange?: (sort: GridSort | undefined) => void;
  selected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataGrid<T>({
  columns,
  rows,
  rowId,
  sort,
  onSortChange,
  selected,
  onSelectedChange,
  loading,
  emptyTitle = "Nothing here",
  emptyDescription,
}: DataGridProps<T>) {
  const { t: laf } = useLaf();
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
  labels = { cancel: "Cancel", retry: "Retry", empty: "No recent tasks" },
}: {
  tasks: TaskItem[];
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
  labels?: { cancel: string; retry: string; empty: string };
}) {
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
  signOutLabel = "Sign out",
  onSignOut,
}: {
  name: string;
  email?: string;
  tenant?: string;
  items?: { id: string; label: string; icon?: React.ReactNode; onSelect: () => void }[];
  signOutLabel?: string;
  onSignOut: () => void;
}) {
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
