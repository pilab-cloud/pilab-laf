import {
  closestCorners,
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AlertTriangle } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf } from "../i18n";

export interface KanbanColumn {
  id: string;
  title: string;
  /** Work-in-progress limit; the header warns when the column holds more cards. */
  wipLimit?: number;
}

export interface KanbanCard {
  id: string;
  columnId: string;
  title: string;
  description?: React.ReactNode;
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  /** Cards in display order; per-column order follows array order. */
  cards: KanbanCard[];
  /** Optimistic: the board shows the move immediately and rolls back if the promise rejects. */
  onMove?: (cardId: string, toColumn: string, index: number) => void | Promise<void>;
  renderCard?: (card: KanbanCard) => React.ReactNode;
  /** Accessible name of the board. */
  label: string;
  className?: string;
}

type Layout = Record<string, string[]>;
type Pos = { col: string; index: number };

const layoutOf = (columns: KanbanColumn[], cards: KanbanCard[]): Layout => {
  const out: Layout = {};
  columns.forEach((c) => (out[c.id] = []));
  cards.forEach((c) => (out[c.columnId] ??= []).push(c.id));
  return out;
};

const locate = (layout: Layout, id: string): Pos | null => {
  for (const col of Object.keys(layout)) {
    const index = layout[col]!.indexOf(id);
    if (index >= 0) return { col, index };
  }
  return null;
};

function relocate(layout: Layout, id: string, toCol: string, index: number): Layout {
  const from = locate(layout, id);
  if (!from) return layout;
  const next: Layout = { ...layout, [from.col]: layout[from.col]!.filter((c) => c !== id) };
  const target = [...(next[toCol] ?? [])];
  target.splice(Math.max(0, Math.min(index, target.length)), 0, id);
  next[toCol] = target;
  return next;
}

const cssEscape = (s: string) => s.replace(/["\\]/g, "\\$&");

function CardView({
  card,
  lifted,
  children,
  onKeyDown,
}: {
  card: KanbanCard;
  lifted: boolean;
  children: React.ReactNode;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const s = useSortable({ id: card.id });
  return (
    <li
      ref={s.setNodeRef}
      data-card-id={card.id}
      tabIndex={0}
      aria-roledescription="card"
      aria-grabbed={lifted || undefined}
      onKeyDown={onKeyDown}
      {...s.listeners}
      // dnd-kit drives the transform while dragging
      style={{ transform: CSS.Transform.toString(s.transform), transition: s.transition }}
      className={cn(
        "cursor-grab touch-none rounded-sm border border-line bg-surface p-2 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary",
        (s.isDragging || lifted) && "border-primary shadow-md",
        s.isDragging && "opacity-60",
      )}
    >
      {children}
    </li>
  );
}

function ColumnView({ column, ids, children }: { column: KanbanColumn; ids: string[]; children: React.ReactNode }) {
  const { t } = useLaf();
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const over = column.wipLimit !== undefined && ids.length > column.wipLimit;
  const headId = React.useId();
  return (
    <section
      role="group"
      aria-labelledby={headId}
      className={cn("flex w-72 shrink-0 flex-col gap-2 rounded-sm border border-line bg-muted-bg p-2", isOver && "border-primary")}
    >
      <header className="flex items-center justify-between gap-2 px-1">
        <h3 id={headId} className="m-0 text-sm font-semibold text-fg">
          {column.title}
        </h3>
        <span className={cn("inline-flex items-center gap-1 text-xs", over ? "text-warning" : "text-muted")}>
          {over && <AlertTriangle className="size-3" aria-hidden />}
          {column.wipLimit !== undefined ? t.wipLimit(ids.length, column.wipLimit) : ids.length}
        </span>
      </header>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul ref={setNodeRef} className="m-0 flex min-h-12 list-none flex-col gap-2 p-0">
          {children}
          {ids.length === 0 && <li className="px-1 py-2 text-xs text-subtle">{t.emptyColumn}</li>}
        </ul>
      </SortableContext>
    </section>
  );
}

/**
 * Kanban board. Pointer drag via dnd-kit; keyboard: focus a card, Space lifts it,
 * ←/→ change column, ↑/↓ reorder, Space drops, Escape cancels. Moves are announced politely.
 */
export function KanbanBoard({ columns, cards, onMove, renderCard, label, className }: KanbanBoardProps) {
  const { t } = useLaf();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const source = React.useMemo(() => layoutOf(columns, cards), [columns, cards]);
  const [layout, setLayout] = React.useState<Layout>(source);
  React.useEffect(() => setLayout(source), [source]);
  const byId = React.useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const colTitle = (id: string) => columns.find((c) => c.id === id)?.title ?? id;
  const nameOf = (id: string) => byId.get(id)?.title ?? id;

  const [message, setMessage] = React.useState("");
  const [lifted, setLifted] = React.useState<{ id: string; origin: Pos } | null>(null);
  const dragOrigin = React.useRef<Pos | null>(null);
  const refocus = React.useRef<string | null>(null);
  const root = React.useRef<HTMLDivElement>(null);
  const latest = React.useRef(layout);
  latest.current = layout;

  React.useEffect(() => {
    const id = refocus.current;
    if (!id) return;
    refocus.current = null;
    root.current?.querySelector<HTMLElement>(`[data-card-id="${cssEscape(id)}"]`)?.focus();
  });

  const commit = (id: string, to: Pos, from: Pos, next: Layout) => {
    if (to.col === from.col && to.index === from.index) return;
    const total = next[to.col]!.length;
    setMessage(to.col === from.col ? t.dndDropped(nameOf(id), to.index + 1, total) : t.dndDroppedTo(nameOf(id), colTitle(to.col), to.index + 1, total));
    const res = onMove?.(id, to.col, to.index);
    if (res && typeof res.then === "function") res.then(undefined, () => setLayout(source));
  };

  const onCardKey = (e: React.KeyboardEvent, id: string) => {
    if (e.target !== e.currentTarget) return;
    const pos = locate(latest.current, id);
    if (!pos) return;
    if (lifted?.id !== id) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setLifted({ id, origin: pos });
        setMessage(t.dndLifted(nameOf(id), pos.index + 1, latest.current[pos.col]!.length));
      }
      return;
    }
    let to = pos;
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const index = Math.max(0, Math.min(pos.index + (e.key === "ArrowDown" ? 1 : -1), latest.current[pos.col]!.length - 1));
      to = { col: pos.col, index };
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const rtl = getComputedStyle(e.currentTarget as Element).direction === "rtl";
      const step = (e.key === "ArrowRight" ? 1 : -1) * (rtl ? -1 : 1);
      const target = columns[columns.findIndex((c) => c.id === pos.col) + step];
      if (target) to = { col: target.id, index: Math.min(pos.index, latest.current[target.id]?.length ?? 0) };
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const origin = lifted.origin;
      setLifted(null);
      if (pos.col === origin.col && pos.index === origin.index) setMessage(t.dndCancelled(nameOf(id)));
      else commit(id, pos, origin, latest.current);
      return;
    } else if (e.key === "Escape") {
      e.preventDefault();
      refocus.current = id;
      setLayout(source);
      setLifted(null);
      setMessage(t.dndCancelled(nameOf(id)));
      return;
    } else return;
    e.preventDefault();
    if (to.col === pos.col && to.index === pos.index) return;
    const next = relocate(latest.current, id, to.col, to.index);
    const total = next[to.col]!.length;
    refocus.current = id;
    setLayout(next);
    setMessage(to.col === pos.col ? t.dndMoved(nameOf(id), to.index + 1, total) : t.dndMovedTo(nameOf(id), colTitle(to.col), to.index + 1, total));
  };

  const colOf = (id: string | number) => (columns.some((c) => c.id === id) ? String(id) : locate(latest.current, String(id))?.col);

  const onDragStart = ({ active }: DragStartEvent) => {
    dragOrigin.current = locate(latest.current, String(active.id));
  };
  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const from = locate(latest.current, String(active.id));
    const toCol = colOf(over.id);
    if (!from || !toCol || from.col === toCol) return;
    const overIdx = latest.current[toCol]!.indexOf(String(over.id));
    setLayout((l) => relocate(l, String(active.id), toCol, overIdx >= 0 ? overIdx : l[toCol]!.length));
  };
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const id = String(active.id);
    const origin = dragOrigin.current;
    dragOrigin.current = null;
    if (!origin) return;
    let next = latest.current;
    const cur = locate(next, id);
    if (over && cur) {
      const overIdx = next[cur.col]!.indexOf(String(over.id));
      if (overIdx >= 0 && overIdx !== cur.index) next = relocate(next, id, cur.col, overIdx);
    }
    const to = locate(next, id);
    setLayout(next);
    if (to) commit(id, to, origin, next);
  };

  return (
    <div ref={root} role="region" aria-label={label} className={cn("flex items-start gap-3 overflow-x-auto", className)}>
      <p className="sr-only">{t.dndInstructions}</p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={() => setLayout(source)}
      >
        {columns.map((col) => (
          <ColumnView key={col.id} column={col} ids={layout[col.id] ?? []}>
            {(layout[col.id] ?? []).map((id) => {
              const card = byId.get(id);
              if (!card) return null;
              return (
                <CardView key={id} card={card} lifted={lifted?.id === id} onKeyDown={(e) => onCardKey(e, id)}>
                  {renderCard ? (
                    renderCard(card)
                  ) : (
                    <>
                      <div className="font-medium">{card.title}</div>
                      {card.description && <div className="mt-1 text-xs text-muted">{card.description}</div>}
                    </>
                  )}
                </CardView>
              );
            })}
          </ColumnView>
        ))}
      </DndContext>
      <div role="status" aria-live="polite" aria-atomic className="sr-only">
        {message}
      </div>
    </div>
  );
}
