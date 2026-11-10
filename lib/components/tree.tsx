import { defaultRangeExtractor, useVirtualizer, type Range } from "@tanstack/react-virtual";
import { ChevronDown, ChevronRight, RotateCw } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { Skeleton } from "./feedback";
import { observeRectWithFallback } from "./virtual";
import { PointMenu, type MenuItemSpec } from "./menu-spec";

/* ── Tree view v2 (WAI-ARIA tree) ── */
export type TreeStatus = "success" | "warning" | "danger" | "info" | "neutral";

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  children?: TreeNode[];
  /** Children exist but are not loaded yet; expanding calls `loadChildren`. */
  hasChildren?: boolean;
  disabled?: boolean;
  /** Renders a status dot. */
  status?: TreeStatus;
  /** Plain-text label used for type-ahead when `label` is not a string. */
  textValue?: string;
}

export interface TreeViewProps {
  nodes: TreeNode[];
  label: string;
  /** Controlled expanded ids; omit for uncontrolled. */
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Controlled selection (a string in single mode, string[] also accepted); omit for uncontrolled. */
  selected?: string | string[];
  defaultSelected?: string | string[];
  /** Called with the id that was just selected (single mode: the selected id). */
  onSelect?: (id: string) => void;
  selection?: "single" | "multiple";
  onSelectedChange?: (ids: string[]) => void;
  /** Enter / double-click on an enabled node. */
  onActivate?: (id: string) => void;
  /** Lazily load children of a node with `hasChildren`; the parent should then update `nodes`. */
  loadChildren?: (id: string) => Promise<void>;
  /** Right-click, Shift+F10 and the Menu key. */
  contextMenu?: (id: string) => MenuItemSpec[];
  /** Force (true) or disable (false) virtualization; automatic above 500 visible rows. */
  virtual?: boolean;
  /** Viewport height in px when virtualized. */
  height?: number;
  rowHeight?: number;
  labels?: { loading?: string; error?: string; retry?: string; contextMenu?: string };
  className?: string;
}

type Row =
  | { kind: "node"; node: TreeNode; level: number; set: number; pos: number; parent: number }
  | { kind: "loading" | "error"; id: string; level: number; parent: number };

const toArr = (v: string | string[] | undefined): string[] | undefined =>
  v === undefined ? undefined : Array.isArray(v) ? v : [v];

const dot: Record<TreeStatus, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-primary",
  neutral: "bg-muted",
};

const textOf = (n: TreeNode) => (n.textValue ?? (typeof n.label === "string" ? n.label : n.id)).toLowerCase();
const isLazy = (n: TreeNode) => !!n.hasChildren && !n.children?.length;
const expandable = (n: TreeNode) => !!n.children?.length || !!n.hasChildren;

export function TreeView({
  nodes,
  label,
  expanded: expandedProp,
  defaultExpanded = [],
  onExpandedChange,
  selected: selectedProp,
  defaultSelected,
  onSelect: onSelectProp,
  selection = "single",
  onSelectedChange,
  onActivate,
  loadChildren,
  contextMenu,
  virtual,
  height = 400,
  rowHeight = 28,
  labels,
  className,
}: TreeViewProps) {
  const l = { loading: "Loading…", error: "Failed to load", retry: "Retry", contextMenu: "Actions", ...labels };
  const multi = selection === "multiple";
  const [expanded, setExpanded] = useControllableState<string[]>({
    value: expandedProp,
    defaultValue: defaultExpanded,
    onChange: onExpandedChange,
  });
  const [selectedIds, setSelectedIds] = useControllableState<string[]>({
    value: toArr(selectedProp),
    defaultValue: toArr(defaultSelected) ?? [],
    onChange: onSelectedChange,
  });
  const open = React.useMemo(() => new Set(expanded), [expanded]);
  const chosen = React.useMemo(() => new Set(selectedIds), [selectedIds]);

  const [loadState, setLoadState] = React.useState<Record<string, "loading" | "error">>({});

  const rows = React.useMemo(() => {
    const out: Row[] = [];
    const walk = (list: TreeNode[], level: number, parent: number) => {
      list.forEach((node, i) => {
        const idx = out.length;
        out.push({ kind: "node", node, level, set: list.length, pos: i + 1, parent });
        if (!open.has(node.id)) return;
        if (node.children?.length) walk(node.children, level + 1, idx);
        else if (loadState[node.id]) out.push({ kind: loadState[node.id]!, id: node.id, level: level + 1, parent: idx });
      });
    };
    walk(nodes, 1, -1);
    return out;
  }, [nodes, open, loadState]);

  const indexOf = React.useMemo(() => {
    const m = new Map<string, number>();
    rows.forEach((r, i) => r.kind === "node" && m.set(r.node.id, i));
    return m;
  }, [rows]);

  const [focusId, setFocusId] = React.useState<string | undefined>(selectedIds[0] ?? (rows[0] as { node: TreeNode } | undefined)?.node?.id);
  const focusIdx = focusId !== undefined ? (indexOf.get(focusId) ?? 0) : 0;
  const anchor = React.useRef<string | undefined>(undefined);
  const pendingFocus = React.useRef<string | undefined>(undefined);
  const refs = React.useRef(new Map<string, HTMLDivElement>());
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [menu, setMenu] = React.useState<{ id: string; x: number; y: number } | null>(null);

  const useVirt = virtual ?? rows.length > 500;
  const focusIdxRef = React.useRef(focusIdx);
  focusIdxRef.current = focusIdx;
  const virt = useVirtualizer({
    count: useVirt ? rows.length : 0,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan: 8,
    initialRect: { width: 0, height },
    observeElementRect: observeRectWithFallback,
    // keep the roving-tabindex row mounted so the tree stays reachable by Tab
    rangeExtractor: (range: Range) => {
      const base = defaultRangeExtractor(range);
      const f = focusIdxRef.current;
      return f < range.count && !base.includes(f) ? [...base, f].sort((a, b) => a - b) : base;
    },
  });

  const load = React.useCallback(
    (id: string) => {
      if (!loadChildren) return;
      setLoadState((s) => ({ ...s, [id]: "loading" }));
      loadChildren(id).then(
        () =>
          setLoadState((s) => {
            const { [id]: _drop, ...rest } = s;
            return rest;
          }),
        () => setLoadState((s) => ({ ...s, [id]: "error" })),
      );
    },
    [loadChildren],
  );

  const setOpen = (node: TreeNode, to: boolean) => {
    if (to === open.has(node.id)) return;
    if (to) {
      setExpanded([...expanded, node.id]);
      if (isLazy(node) && loadState[node.id] !== "loading") load(node.id);
    } else setExpanded(expanded.filter((e) => e !== node.id));
  };

  const move = (idx: number) => {
    const r = rows[idx];
    if (!r || r.kind !== "node") return;
    setFocusId(r.node.id);
    pendingFocus.current = r.node.id;
    if (useVirt) virt.scrollToIndex(idx);
  };

  React.useEffect(() => {
    const id = pendingFocus.current;
    if (id === undefined) return;
    const el = refs.current.get(id);
    if (el) {
      pendingFocus.current = undefined;
      el.focus();
    }
  });

  const commit = (ids: string[], id: string) => {
    setSelectedIds(ids);
    onSelectProp?.(id);
  };

  const select = (idx: number, mode: "replace" | "toggle" | "range") => {
    const r = rows[idx];
    if (!r || r.kind !== "node" || r.node.disabled) return;
    const id = r.node.id;
    if (!multi || mode === "replace") {
      anchor.current = id;
      commit([id], id);
    } else if (mode === "toggle") {
      anchor.current = id;
      commit(chosen.has(id) ? selectedIds.filter((s) => s !== id) : [...selectedIds, id], id);
    } else {
      const a = indexOf.get(anchor.current ?? id) ?? idx;
      const [from, to] = a < idx ? [a, idx] : [idx, a];
      const ids = rows
        .slice(from, to + 1)
        .flatMap((x) => (x.kind === "node" && !x.node.disabled ? [x.node.id] : []));
      commit(ids, id);
    }
  };

  const typed = React.useRef({ buf: "", t: 0 as ReturnType<typeof setTimeout> | 0 });
  const typeAhead = (ch: string, from: number) => {
    const ta = typed.current;
    if (ta.t) clearTimeout(ta.t);
    ta.buf += ch.toLowerCase();
    ta.t = setTimeout(() => {
      ta.buf = "";
      ta.t = 0;
    }, 700);
    const single = ta.buf.split("").every((c) => c === ta.buf[0]);
    const q = single ? ta.buf[0]! : ta.buf;
    const start = single ? from + 1 : from;
    for (let k = 0; k < rows.length; k++) {
      const i = (start + k) % rows.length;
      const r = rows[i]!;
      if (r.kind === "node" && textOf(r.node).startsWith(q)) return move(i);
    }
  };

  const openMenuAt = (id: string, x: number, y: number) => {
    if (contextMenu && contextMenu(id).length) setMenu({ id, x, y });
  };

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const r = rows[idx]!;
    if (r.kind !== "node") {
      if (e.key === "ArrowLeft") move(r.parent);
      else if (e.key === "ArrowDown") move(idx + 1);
      else if (e.key === "ArrowUp") move(idx - 1);
      else if ((e.key === "Enter" || e.key === " ") && r.kind === "error") load(r.id);
      else return;
      e.preventDefault();
      return;
    }
    const { node } = r;
    const can = expandable(node);
    const key = e.key;
    if (key === "ArrowDown" || key === "ArrowUp") {
      const to = Math.min(Math.max(idx + (key === "ArrowDown" ? 1 : -1), 0), rows.length - 1);
      const t = rows[to];
      if (e.shiftKey && multi && t?.kind === "node") {
        anchor.current ??= node.id;
        select(to, "range");
        move(to);
      } else if (t?.kind === "node") move(to);
      else if (t) move(to + (key === "ArrowDown" ? 1 : -1));
    } else if (key === "Home") move(0);
    else if (key === "End") move(rows.length - 1);
    else if (key === "ArrowRight") {
      if (can && !open.has(node.id)) setOpen(node, true);
      else if (can && rows[idx + 1]?.kind === "node" && (rows[idx + 1] as { level: number }).level > r.level) move(idx + 1);
    } else if (key === "ArrowLeft") {
      if (can && open.has(node.id)) setOpen(node, false);
      else if (r.parent >= 0) move(r.parent);
    } else if (key === "*") {
      const sibs = r.parent < 0 ? nodes : (rows[r.parent] as { node: TreeNode }).node.children ?? [];
      const add = sibs.filter((s) => expandable(s) && !open.has(s.id));
      if (add.length) {
        setExpanded([...expanded, ...add.map((s) => s.id)]);
        add.filter(isLazy).forEach((s) => load(s.id));
      }
    } else if (key === "Enter") {
      if (node.disabled) return e.preventDefault();
      select(idx, "replace");
      onActivate?.(node.id);
    } else if (key === " ") {
      if (!node.disabled) select(idx, multi ? "toggle" : "replace");
    } else if (key === "a" && multi && (e.ctrlKey || e.metaKey)) {
      const ids = rows.flatMap((x) => (x.kind === "node" && !x.node.disabled ? [x.node.id] : []));
      setSelectedIds(ids);
    } else if (key === "F10" && e.shiftKey || key === "ContextMenu") {
      const b = e.currentTarget.getBoundingClientRect();
      openMenuAt(node.id, b.left + 16, b.bottom);
    } else if (key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typeAhead(key, idx);
    } else return;
    e.preventDefault();
  };

  const renderRow = (idx: number, style?: React.CSSProperties) => {
    const r = rows[idx]!;
    const indent = (r.level - 1) * 16 + 4;
    if (r.kind !== "node") {
      return (
        <div
          key={`${r.kind}-${r.id}`}
          role="treeitem"
          aria-level={r.level}
          aria-selected={false}
          aria-disabled
          aria-busy={r.kind === "loading"}
          tabIndex={-1}
          ref={(el) => {
            const k = `${r.kind}-${r.id}`;
            if (el) refs.current.set(k, el);
            else refs.current.delete(k);
          }}
          onKeyDown={(e) => onKeyDown(e, idx)}
          className="flex h-7 items-center gap-2 pe-2 text-sm text-muted outline-none"
          style={{ ...style, paddingInlineStart: `${indent + 20}px` }}
        >
          {r.kind === "loading" ? (
            <>
              <Skeleton className="h-3 w-24" />
              <span className="sr-only">{l.loading}</span>
            </>
          ) : (
            <>
              <span className="text-danger">{l.error}</span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => load(r.id)}>
                <RotateCw className="size-3" aria-hidden />
                {l.retry}
              </button>
            </>
          )}
        </div>
      );
    }
    const { node } = r;
    const can = expandable(node);
    const isOpen = open.has(node.id);
    const isSel = chosen.has(node.id);
    return (
      <div
        key={node.id}
        ref={(el) => {
          if (el) refs.current.set(node.id, el);
          else refs.current.delete(node.id);
        }}
        role="treeitem"
        aria-level={r.level}
        aria-setsize={r.set}
        aria-posinset={r.pos}
        aria-expanded={can ? isOpen : undefined}
        aria-selected={isSel}
        aria-disabled={node.disabled || undefined}
        tabIndex={focusId === node.id ? 0 : -1}
        onFocus={() => setFocusId(node.id)}
        onKeyDown={(e) => onKeyDown(e, idx)}
        onClick={(e) => {
          if (node.disabled) return;
          select(idx, e.shiftKey ? "range" : e.metaKey || e.ctrlKey ? "toggle" : "replace");
        }}
        onDoubleClick={() => !node.disabled && onActivate?.(node.id)}
        onContextMenu={(e) => {
          if (!contextMenu) return;
          e.preventDefault();
          openMenuAt(node.id, e.clientX, e.clientY);
        }}
        className={cn(
          "flex h-7 cursor-pointer items-center gap-1.5 rounded-sm border-s-2 border-transparent pe-2 text-sm text-muted outline-none hover:bg-surface-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-primary",
          isSel && "border-primary bg-primary-light text-fg",
          node.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-muted",
        )}
        // dynamic depth indent / virtual offset
        style={{ ...style, paddingInlineStart: `${indent}px` }}
      >
        <span
          className="flex size-4 shrink-0 items-center justify-center"
          onClick={(e) => {
            if (!can) return;
            e.stopPropagation();
            if (!node.disabled) setOpen(node, !isOpen);
          }}
        >
          {can && (isOpen ? <ChevronDown className="size-4" aria-hidden /> : <ChevronRight className="size-4 rtl:rotate-180" aria-hidden />)}
        </span>
        {node.icon && <span className="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">{node.icon}</span>}
        <span className="min-w-0 flex-1 truncate">{node.label}</span>
        {node.status && <span aria-hidden className={cn("size-2 shrink-0 rounded-full", dot[node.status])} />}
        {node.status && <span className="sr-only">{node.status}</span>}
        {node.badge}
      </div>
    );
  };

  const menuItems = menu && contextMenu ? contextMenu(menu.id) : [];
  const menuEl = menu && (
    <PointMenu
      x={menu.x}
      y={menu.y}
      items={menuItems}
      label={l.contextMenu}
      onClose={() => {
        const el = refs.current.get(menu.id);
        setMenu(null);
        el?.focus();
      }}
    />
  );

  if (!useVirt) {
    return (
      <>
        <div role="tree" aria-label={label} aria-multiselectable={multi || undefined} className={className}>
          {rows.map((_, i) => renderRow(i))}
        </div>
        {menuEl}
      </>
    );
  }

  return (
    <>
      <div
        ref={scrollRef}
        role="tree"
        aria-label={label}
        aria-multiselectable={multi || undefined}
        className={cn("relative overflow-auto", className)}
        // dynamic viewport height
        style={{ height }}
      >
        {/* dynamic total scroll height */}
        <div className="relative w-full" style={{ height: virt.getTotalSize() }}>
          {virt.getVirtualItems().map((v) =>
            renderRow(v.index, { position: "absolute", insetInline: 0, top: v.start, height: v.size }),
          )}
        </div>
      </div>
      {menuEl}
    </>
  );
}
