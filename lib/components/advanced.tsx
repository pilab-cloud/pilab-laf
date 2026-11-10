import * as ContextPrimitive from "@radix-ui/react-context-menu";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { diffLines } from "../utils";
import { Kbd } from "./more";
import { useLaf, usePortalContainer } from "../i18n";

/* ── Context menu ── */
export const ContextMenu = ContextPrimitive.Root;
export const ContextMenuTrigger = ContextPrimitive.Trigger;

export function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextPrimitive.Content>) {
  const container = usePortalContainer();
  return (
    <ContextPrimitive.Portal container={container}>
      <ContextPrimitive.Content className={cn("dropdown-menu relative! top-auto! left-auto! z-30 min-w-48", className)} {...props} />
    </ContextPrimitive.Portal>
  );
}

export function ContextMenuItem({ danger, className, ...props }: React.ComponentProps<typeof ContextPrimitive.Item> & { danger?: boolean }) {
  return (
    <ContextPrimitive.Item
      className={cn("dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg", danger && "danger", className)}
      {...props}
    />
  );
}

export function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextPrimitive.Separator>) {
  return <ContextPrimitive.Separator className={cn("dropdown-sep", className)} {...props} />;
}

/* ── Command palette (⌘/Ctrl+K) ── */
export interface Command {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
  onSelect: () => void;
}

export function CommandPalette({
  commands,
  open,
  onOpenChange,
  placeholder: placeholderProp,
  emptyText: emptyTextProp,
  search,
  recent,
  onCommandRun,
}: {
  commands: Command[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  emptyText?: string;
  /** Async source merged after the local matches; stale responses are dropped. */
  search?: (query: string) => Promise<Command[]>;
  /** Shown under a "Recent" heading while the query is empty. */
  recent?: Command[];
  /** Called after a command ran, e.g. to maintain `recent`. */
  onCommandRun?: (command: Command) => void;
}) {
  const { t } = useLaf();
  const portalContainer = usePortalContainer();
  const placeholder = placeholderProp ?? t.commandPlaceholder;
  const emptyText = emptyTextProp ?? t.noResults;
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [remote, setRemote] = React.useState<{ query: string; items: Command[] } | null>(null);
  const [pending, setPending] = React.useState(false);
  const listId = React.useId();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setRemote(null);
    }
  }, [open]);

  React.useEffect(() => {
    if (!search || !open || !query) {
      setRemote(null);
      setPending(false);
      return;
    }
    let stale = false;
    setPending(true);
    search(query).then(
      (items) => {
        if (stale) return;
        setRemote({ query, items });
        setPending(false);
      },
      () => {
        if (stale) return;
        setRemote({ query, items: [] });
        setPending(false);
      },
    );
    return () => {
      stale = true;
    };
  }, [search, query, open]);

  const q = query.toLowerCase();
  const sections = React.useMemo(() => {
    const out: { heading?: string; items: Command[] }[] = [];
    if (!q) {
      if (recent?.length) out.push({ heading: t.recent, items: recent });
    }
    const seen = new Set<string>();
    const all = [...commands.filter((c) => c.label.toLowerCase().includes(q)), ...(remote?.query === query ? remote.items : [])].filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
    const byGroup = new Map<string | undefined, Command[]>();
    all.forEach((c) => byGroup.set(c.group, [...(byGroup.get(c.group) ?? []), c]));
    const grouped = [...byGroup.keys()].some((g) => g !== undefined);
    byGroup.forEach((items, group) => out.push({ heading: grouped ? group : undefined, items }));
    return out;
  }, [commands, remote, q, query, recent, t.recent]);
  const results = sections.flatMap((s) => s.items.map((c) => ({ c, section: s })));
  React.useEffect(() => setActive(0), [query]);

  const run = (c: Command) => {
    onOpenChange(false);
    c.onSelect();
    onCommandRun?.(c);
  };

  let flat = 0;
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal container={portalContainer}>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="popup fixed top-[20%] left-1/2 z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden p-0"
        >
          <DialogPrimitive.Title className="sr-only">{t.commandPalette}</DialogPrimitive.Title>
          <div className="flex items-center gap-2 border-b border-line px-3">
            <Search className="size-4 text-subtle" aria-hidden />
            <input
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
              aria-label={t.command}
              autoFocus
              placeholder={placeholder}
              className="h-11 flex-1 border-0 bg-transparent text-fg outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, results.length - 1));
                else if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
                else if (e.key === "Enter" && results[active]) run(results[active]!.c);
                else return;
                e.preventDefault();
              }}
            />
          </div>
          <div id={listId} role="listbox" aria-busy={pending} className="m-0 max-h-72 overflow-auto p-1">
            {results.length === 0 && <div className="px-3 py-2 text-sm text-muted">{pending ? t.loading : emptyText}</div>}
            {sections.map((sec, si) => {
              const headId = `${listId}-h${si}`;
              return (
                <div key={si} role="group" aria-labelledby={sec.heading ? headId : undefined}>
                  {sec.heading && (
                    <div id={headId} role="presentation" className="px-3 pt-2 pb-1 text-xs font-medium text-subtle">
                      {sec.heading}
                    </div>
                  )}
                  {sec.items.map((c) => {
                    const i = flat++;
                    return (
                      <div
                        key={`${si}-${c.id}`}
                        id={`${listId}-${i}`}
                        role="option"
                        aria-selected={i === active}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => run(c)}
                        className={cn("flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-muted", i === active && "bg-surface-hover text-fg")}
                      >
                        <span className="flex-1">{c.label}</span>
                        {c.group && !sec.heading && <span className="text-xs text-subtle">{c.group}</span>}
                        {c.shortcut && <Kbd>{c.shortcut}</Kbd>}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/* ── Tree table ── */
export interface TreeTableRow<T> {
  id: string;
  data: T;
  children?: TreeTableRow<T>[];
}

export function TreeTable<T>({
  rows,
  columns,
  label,
}: {
  rows: TreeTableRow<T>[];
  columns: { id: string; header: React.ReactNode; cell: (row: T) => React.ReactNode }[];
  label: string;
}) {
  const [open, setOpen] = React.useState<string[]>([]);
  const flat: { row: TreeTableRow<T>; level: number }[] = [];
  const walk = (list: TreeTableRow<T>[], level: number) =>
    list.forEach((row) => {
      flat.push({ row, level });
      if (row.children?.length && open.includes(row.id)) walk(row.children, level + 1);
    });
  walk(rows, 1);
  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className="table-wrap">
      <table className="table" role="treegrid" aria-label={label}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.id}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flat.map(({ row, level }) => {
            const kids = !!row.children?.length;
            const isOpen = open.includes(row.id);
            return (
              <tr key={row.id} aria-level={level} aria-expanded={kids ? isOpen : undefined}>
                {columns.map((c, ci) => (
                  <td key={c.id}>
                    {ci === 0 ? (
                      // dynamic depth indent
                      <span className="inline-flex items-center gap-1" style={{ paddingInlineStart: `${(level - 1) * 16}px` }}>
                        {kids ? (
                          <button type="button" aria-label={isOpen ? "Collapse" : "Expand"} onClick={() => toggle(row.id)} className="flex size-4 items-center justify-center text-muted hover:text-fg">
                            {isOpen ? <ChevronDown className="size-4" aria-hidden /> : <ChevronRight className="size-4" aria-hidden />}
                          </button>
                        ) : (
                          <span className="size-4" />
                        )}
                        {c.cell(row.data)}
                      </span>
                    ) : (
                      c.cell(row.data)
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Diff viewer (before/after, line-based) ── */
export function DiffView({ before, after, label, mode = "split" }: { before: string; after: string; label: string; mode?: "split" | "unified" }) {
  const ops = React.useMemo(() => diffLines(before, after), [before, after]);
  const wrap = "overflow-auto rounded-md border border-line bg-black/30 font-mono text-[0.8125rem]";
  if (mode === "unified")
    return (
      <div role="group" aria-label={label} className={wrap}>
        {ops.map((op, i) => (
          <div key={i} className={cn("px-3 whitespace-pre", op.type === "del" && "bg-danger-bg text-danger", op.type === "add" && "bg-ok-bg text-ok")}>
            {op.type === "del" ? "- " : op.type === "add" ? "+ " : "  "}
            {op.text}
          </div>
        ))}
      </div>
    );
  const rows: { l?: string; r?: string; kind: "same" | "change" }[] = [];
  for (let i = 0; i < ops.length; ) {
    const op = ops[i]!;
    if (op.type === "same") {
      rows.push({ l: op.text, r: op.text, kind: "same" });
      i++;
      continue;
    }
    const dels: string[] = [];
    const adds: string[] = [];
    while (i < ops.length && ops[i]!.type !== "same") (ops[i]!.type === "del" ? dels : adds).push(ops[i++]!.text);
    for (let k = 0; k < Math.max(dels.length, adds.length); k++) rows.push({ l: dels[k], r: adds[k], kind: "change" });
  }
  return (
    <div role="group" aria-label={label} className={wrap}>
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-2 divide-x divide-line">
          <div className={cn("px-3 whitespace-pre", row.kind === "change" && row.l !== undefined && "bg-danger-bg text-danger")}>{row.l ?? ""}</div>
          <div className={cn("px-3 whitespace-pre", row.kind === "change" && row.r !== undefined && "bg-ok-bg text-ok")}>{row.r ?? ""}</div>
        </div>
      ))}
    </div>
  );
}
