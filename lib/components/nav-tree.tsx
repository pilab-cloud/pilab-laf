import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { TruncatedText } from "./display";
import { useAppFrame, useAppFrameLabels, type AppFrameLabels } from "./frame-context";
import { Tooltip, TooltipProvider } from "./overlay";
import { TreeView, type TreeNode, type TreeViewProps } from "./tree";

/* ── Navigation model ── */
export interface NavItem {
  type?: "item";
  id: string;
  label: React.ReactNode;
  /** Plain text for type-ahead and the rail's accessible name when `label` is not a string. */
  textValue?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  href?: string;
  onSelect?: (id: string) => void;
  /** Overrides the `current` id of the tree. */
  current?: boolean;
  disabled?: boolean;
  /** Nested entries of any depth turn the item into an expandable group. */
  children?: NavEntry[];
  /** Router-link escape hatch: return your `<Link>` spreading `props` (it must forward its ref). */
  render?: (props: NavRenderProps) => React.ReactElement;
}
export interface NavHeading {
  type: "heading";
  id: string;
  label: React.ReactNode;
}
export interface NavDivider {
  type: "divider";
  id?: string;
}
export type NavEntry = NavItem | NavHeading | NavDivider;

export interface NavRenderProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  "data-nav-id": string;
  "data-nav-text": string;
  "aria-current"?: "page";
  "aria-disabled"?: true;
  tabIndex: number;
}

const isItem = (e: NavEntry): e is NavItem => !e.type || e.type === "item";
const textOf = (it: NavItem) => it.textValue ?? (typeof it.label === "string" ? it.label : it.id);
const isGroup = (it: NavItem) => !!it.children?.some(isItem);
const safeId = (s: string) => s.replace(/\s+/g, "_");

interface Flat {
  item: NavItem;
  parent?: NavItem;
}

/** Focusable rows in document order: enabled items whose ancestors are all expanded. */
function visibleRows(entries: NavEntry[], expanded: Set<string>, rail: boolean, parent?: NavItem, out: Flat[] = []): Flat[] {
  for (const e of entries) {
    if (!isItem(e)) continue;
    if (!e.disabled) out.push({ item: e, parent });
    if (!rail && isGroup(e) && expanded.has(e.id)) visibleRows(e.children!, expanded, rail, e, out);
  }
  return out;
}

function ancestorsOf(entries: NavEntry[], id: string, path: string[] = []): string[] | null {
  for (const e of entries) {
    if (!isItem(e)) continue;
    if (e.id === id) return path;
    const found = e.children && ancestorsOf(e.children, id, [...path, e.id]);
    if (found) return found;
  }
  return null;
}

function currentOf(entries: NavEntry[], current?: string): string | undefined {
  for (const e of entries) {
    if (!isItem(e)) continue;
    if (e.current) return e.id;
    const c = e.children && currentOf(e.children);
    if (c) return c;
  }
  return current;
}

const rowCls =
  "flex w-full min-w-0 items-center gap-2.5 rounded-md px-2.5 py-2 text-start text-sm font-medium text-muted no-underline outline-none transition hover:bg-surface-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50 aria-[current=page]:bg-primary-light aria-[current=page]:text-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[within=true]:text-fg";

export interface NavTreeProps {
  items: NavEntry[];
  /** Accessible name of the `<nav>`. */
  label?: string;
  /** Id of the current page; an item's own `current` wins. */
  current?: string;
  /** Called for every activated leaf (after the item's own `onSelect`). */
  onSelect?: (id: string, item: NavItem) => void;
  /** Controlled expanded group ids; omit for uncontrolled (ancestors of the current item start open). */
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Icon-rail mode: top-level icons with tooltips. Defaults to the surrounding `AppFrame`'s rail state. */
  collapsed?: boolean;
  labels?: Partial<AppFrameLabels>;
  className?: string;
}

/**
 * Navigation of arbitrary depth: `<nav>` with nested lists, `aria-current` on the current page and
 * `aria-expanded` on groups. One roving tab stop; arrows, Home/End, Left/Right and type-ahead move focus.
 */
export function NavTree({ items, label, current, onSelect, expanded: expandedProp, defaultExpanded, onExpandedChange, collapsed, labels, className }: NavTreeProps) {
  const l = useAppFrameLabels(labels);
  const frame = useAppFrame();
  const rail = collapsed ?? frame.rail;
  const uid = React.useId();
  const currentId = currentOf(items, current);
  const [expandedIds, setExpanded] = useControllableState<string[]>({
    value: expandedProp,
    defaultValue: defaultExpanded ?? (currentId ? (ancestorsOf(items, currentId) ?? []) : []),
    onChange: onExpandedChange,
  });
  const expanded = React.useMemo(() => new Set(expandedIds), [expandedIds]);
  const [activeId, setActiveId] = React.useState<string>();
  const rows = visibleRows(items, expanded, rail);
  const active = rows.find((r) => r.item.id === activeId)?.item.id ?? rows.find((r) => r.item.id === currentId)?.item.id ?? rows[0]?.item.id;
  const rootRef = React.useRef<HTMLElement>(null);
  const typed = React.useRef({ text: "", timer: 0 as unknown as ReturnType<typeof setTimeout> });
  React.useEffect(() => () => clearTimeout(typed.current.timer), []);

  const focusRow = (id: string) => {
    setActiveId(id);
    [...(rootRef.current?.querySelectorAll<HTMLElement>("[data-nav-id]") ?? [])].find((el) => el.dataset.navId === id)?.focus();
  };
  const setOpen = (id: string, open: boolean) => setExpanded((prev) => (open ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id)));

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const id = (e.target as HTMLElement).closest<HTMLElement>("[data-nav-id]")?.dataset.navId;
    const i = rows.findIndex((r) => r.item.id === id);
    if (i < 0) return;
    const row = rows[i]!;
    const go = (n: number) => {
      const r = rows[n];
      if (r) focusRow(r.item.id);
    };
    switch (e.key) {
      case "ArrowDown":
        go(i + 1);
        break;
      case "ArrowUp":
        go(i - 1);
        break;
      case "Home":
        go(0);
        break;
      case "End":
        go(rows.length - 1);
        break;
      case "ArrowRight":
      case "ArrowLeft": {
        const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
        const forward = (e.key === "ArrowRight") !== rtl;
        if (forward) {
          if (!isGroup(row.item) || rail) return;
          if (!expanded.has(row.item.id)) setOpen(row.item.id, true);
          else go(i + 1);
        } else if (isGroup(row.item) && expanded.has(row.item.id) && !rail) setOpen(row.item.id, false);
        else if (row.parent) focusRow(row.parent.id);
        else return;
        break;
      }
      default: {
        if (e.key.length !== 1 || (e.key === " " && !typed.current.text)) return;
        clearTimeout(typed.current.timer);
        typed.current.text += e.key.toLowerCase();
        typed.current.timer = setTimeout(() => (typed.current.text = ""), 500);
        const q = typed.current.text;
        const from = q.length === 1 ? i + 1 : i;
        const hit = [...rows.slice(from), ...rows.slice(0, from)].find((r) => textOf(r.item).toLowerCase().startsWith(q));
        if (!hit) return;
        focusRow(hit.item.id);
      }
    }
    e.preventDefault();
  };

  const activate = (it: NavItem, e: React.MouseEvent<HTMLElement>) => {
    if (it.disabled) {
      e.preventDefault();
      return;
    }
    if (isGroup(it)) {
      if (rail) {
        frame.setSidebarOpen(true);
        setOpen(it.id, true);
      } else setOpen(it.id, !expanded.has(it.id));
      return;
    }
    it.onSelect?.(it.id);
    onSelect?.(it.id, it);
    if (it.href && !it.render && (it.onSelect || onSelect) && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) e.preventDefault();
    frame.navigated();
  };

  const renderItem = (it: NavItem): React.ReactNode => {
    const group = isGroup(it);
    const open = group && expanded.has(it.id);
    const isCurrent = !group && (it.current ?? it.id === current);
    const within = group && currentId !== undefined && !open && !!ancestorsOf(items, currentId)?.includes(it.id);
    const text = textOf(it);
    const childId = `${uid}-c-${safeId(it.id)}`;
    const content = (
      <>
        {it.icon ? (
          <span aria-hidden className="flex shrink-0 [&>svg]:size-4">
            {it.icon}
          </span>
        ) : (
          rail && (
            <span aria-hidden className="flex size-4 shrink-0 items-center justify-center text-xs font-semibold uppercase">
              {text.charAt(0)}
            </span>
          )
        )}
        {!rail && (
          <>
            <TruncatedText className="flex-1">{it.label}</TruncatedText>
            {it.badge && <span className="ms-auto shrink-0">{it.badge}</span>}
            {group && <ChevronDown aria-hidden className={cn("size-4 shrink-0 transition-transform motion-reduce:transition-none", open && "rotate-180")} />}
          </>
        )}
      </>
    );
    const props: NavRenderProps = {
      "data-nav-id": it.id,
      "data-nav-text": text.toLowerCase(),
      tabIndex: it.id === active ? 0 : -1,
      className: cn(rowCls, rail && "justify-center px-0"),
      onClick: (e: React.MouseEvent<HTMLElement>) => activate(it, e),
      children: content,
      ...(it.disabled ? { "aria-disabled": true as const } : {}),
      ...(isCurrent ? { "aria-current": "page" as const } : {}),
      ...(rail ? { "aria-label": text } : {}),
    };
    let el: React.ReactElement;
    if (group) {
      el = (
        <button type="button" aria-expanded={open} aria-controls={childId} data-within={within} {...(props as React.ComponentProps<"button">)} />
      );
    } else if (it.render) el = it.render({ ...props, href: it.disabled ? undefined : it.href });
    else if (it.href && !it.disabled) el = <a href={it.href} {...(props as React.ComponentProps<"a">)} />;
    else el = <button type="button" {...(props as React.ComponentProps<"button">)} />;
    if (rail) {
      el = (
        <Tooltip
          side="right"
          content={
            <span className="flex items-center gap-2">
              {it.label}
              {it.badge}
            </span>
          }
        >
          {el}
        </Tooltip>
      );
    }
    return (
      <li key={it.id}>
        {el}
        {group && !rail && (
          <div id={childId} hidden={!open} className="ms-4 border-s border-line ps-1">
            {renderEntries(it.children!, safeId(it.id))}
          </div>
        )}
      </li>
    );
  };

  const renderEntries = (entries: NavEntry[], scope: string): React.ReactNode => {
    const sections: { key: string; divider?: boolean; heading?: NavHeading; items: NavItem[] }[] = [{ key: "first", items: [] }];
    entries.forEach((e, n) => {
      if (isItem(e)) sections[sections.length - 1]!.items.push(e);
      else if (e.type === "heading") sections.push({ key: `h-${e.id}`, heading: e, items: [] });
      else sections.push({ key: `d-${e.id ?? n}`, divider: true, items: [] });
    });
    return sections
      .filter((s) => s.items.length > 0 || (s.heading && !rail))
      .map((s) => {
        const hid = s.heading ? `${uid}-${scope}-${safeId(s.heading.id)}` : undefined;
        return (
          <div key={s.key} className={cn(s.divider && "mt-2 border-t border-line pt-2")}>
            {s.heading && !rail && (
              <div id={hid} className="nav-group">
                {s.heading.label}
              </div>
            )}
            {s.items.length > 0 && (
              <ul aria-labelledby={s.heading && !rail ? hid : undefined} className="m-0 grid list-none gap-0.5 p-0">
                {s.items.map(renderItem)}
              </ul>
            )}
          </div>
        );
      });
  };

  return (
    <TooltipProvider>
      <nav
        ref={rootRef}
        aria-label={label ?? l.mainNavigation}
        onKeyDown={onKeyDown}
        onFocus={(e) => {
          const id = (e.target as HTMLElement).closest<HTMLElement>("[data-nav-id]")?.dataset.navId;
          if (id) setActiveId(id);
        }}
        className={cn("min-w-0", className)}
      >
        {renderEntries(items, "root")}
      </nav>
    </TooltipProvider>
  );
}

/* ── Sidebar ── */
export interface SidebarProps extends Omit<NavTreeProps, "items"> {
  items?: NavEntry[];
  /** Object tree (TreeView v2) shown in the sidebar; with `items` too, a switch toggles between the two. */
  tree?: TreeViewProps;
  mode?: "nav" | "tree";
  defaultMode?: "nav" | "tree";
  onModeChange?: (mode: "nav" | "tree") => void;
  /** Top slot, e.g. a brand block on mobile. */
  header?: React.ReactNode;
  /** Bottom slot: user info, environment, status. Hidden in the rail unless `railFooter` is given. */
  footer?: React.ReactNode;
  /** Compact footer for the icon rail. */
  railFooter?: React.ReactNode;
}

function hasChildren(nodes: TreeNode[], id: string): boolean {
  for (const n of nodes) {
    if (n.id === id) return !!n.children?.length || !!n.hasChildren;
    if (n.children && hasChildren(n.children, id)) return true;
  }
  return false;
}

/** Body of the `AppFrame` sidebar: navigation and/or an object tree, scrolling independently, with header and footer slots. */
export function Sidebar({ items, tree, mode: modeProp, defaultMode, onModeChange, header, footer, railFooter, collapsed, labels, className, ...nav }: SidebarProps) {
  const l = useAppFrameLabels(labels);
  const frame = useAppFrame();
  const rail = collapsed ?? frame.rail;
  const [mode, setMode] = useControllableState<"nav" | "tree">({ value: modeProp, defaultValue: defaultMode ?? (items ? "nav" : "tree"), onChange: onModeChange });
  const both = !!items && !!tree;
  const shown = items && (mode === "nav" || !tree || rail) ? "nav" : tree && !rail ? "tree" : undefined;
  const switchBtn = (m: "nav" | "tree", text: string) => (
    <button
      type="button"
      aria-pressed={mode === m}
      onClick={() => setMode(m)}
      className="flex-1 rounded-sm px-2 py-1 text-[0.8125rem] font-semibold text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50 aria-pressed:bg-primary-light aria-pressed:text-primary"
    >
      {text}
    </button>
  );
  const foot = rail ? railFooter : footer;
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      {header && <div className="shrink-0 border-b border-line p-3">{header}</div>}
      <div className={cn("min-h-0 flex-1 overflow-y-auto", rail ? "p-2" : "p-3")}>
        {both && !rail && (
          <div role="group" aria-label={l.sidebarView} className="mb-3 flex gap-1 rounded-md border border-line p-0.5">
            {switchBtn("nav", l.navigationView)}
            {switchBtn("tree", l.treeView)}
          </div>
        )}
        {shown === "nav" && items && <NavTree items={items} collapsed={rail} labels={labels} {...nav} />}
        {shown === "tree" && tree && (
          <nav aria-label={tree.label}>
            <TreeView
              {...tree}
              onSelect={(id) => {
                tree.onSelect?.(id);
                if (!hasChildren(tree.nodes, id)) frame.navigated();
              }}
            />
          </nav>
        )}
      </div>
      {foot && <div className={cn("shrink-0 border-t border-line text-sm text-muted", rail ? "flex justify-center p-2" : "p-4")}>{foot}</div>}
    </div>
  );
}
