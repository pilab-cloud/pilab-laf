import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf } from "../i18n";

export interface SortableItemState {
  index: number;
  dragging: boolean;
  /** Spread on the element that should start the drag (the handle). */
  handleProps: React.HTMLAttributes<HTMLElement> & { ref: (el: HTMLElement | null) => void };
}

export interface SortableListProps<T> {
  items: T[];
  getId: (item: T) => string;
  /** Plain-text name used in screen-reader announcements and the handle label. */
  getLabel?: (item: T) => string;
  onReorder: (items: T[], move: { id: string; from: number; to: number }) => void;
  renderItem: (item: T, state: SortableItemState) => React.ReactNode;
  /** Accessible name of the list. */
  label: string;
  /** Use a dedicated grip button (default) instead of making the whole row the drag target. */
  handle?: boolean;
  className?: string;
}

function Row<T>({
  item,
  id,
  index,
  name,
  handle,
  renderItem,
}: {
  item: T;
  id: string;
  index: number;
  name: string;
  handle: boolean;
  renderItem: SortableListProps<T>["renderItem"];
}) {
  const { t } = useLaf();
  const s = useSortable({ id });
  const drag = { ...s.attributes, ...s.listeners } as React.HTMLAttributes<HTMLElement>;
  const gripProps = { ...drag, ref: s.setActivatorNodeRef } as SortableItemState["handleProps"];
  return (
    <li
      ref={s.setNodeRef}
      // dnd-kit drives the transform while dragging
      style={{ transform: CSS.Transform.toString(s.transform), transition: s.transition }}
      className={cn("flex items-center gap-2 rounded-sm border border-line bg-surface px-2 py-1.5", s.isDragging && "relative z-10 opacity-80 shadow-md")}
      {...(handle ? {} : drag)}
    >
      {handle && (
        <button type="button" {...gripProps} aria-label={t.dragHandle(name)} className="btn btn-ghost btn-sm w-auto shrink-0 cursor-grab touch-none px-1">
          <GripVertical className="size-4" aria-hidden />
        </button>
      )}
      <div className="min-w-0 flex-1">{renderItem(item, { index, dragging: s.isDragging, handleProps: gripProps })}</div>
    </li>
  );
}

/** Vertical reorder list: drag handle, keyboard (Space lift, ↑↓ move, Space drop) and live announcements. */
export function SortableList<T>({ items, getId, getLabel, onReorder, renderItem, label, handle = true, className }: SortableListProps<T>) {
  const { t } = useLaf();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const ids = items.map(getId);
  const nameOf = (id: string | number) => {
    const it = items.find((x) => getId(x) === id);
    return it ? (getLabel ? getLabel(it) : String(id)) : String(id);
  };
  const posOf = (id: string | number | undefined) => ids.indexOf(String(id)) + 1;

  const announcements: Announcements = {
    onDragStart: ({ active }) => t.dndLifted(nameOf(active.id), posOf(active.id), ids.length),
    onDragOver: ({ active, over }) => (over ? t.dndMoved(nameOf(active.id), posOf(over.id), ids.length) : undefined),
    onDragEnd: ({ active, over }) => t.dndDropped(nameOf(active.id), posOf(over?.id ?? active.id), ids.length),
    onDragCancel: ({ active }) => t.dndCancelled(nameOf(active.id)),
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from < 0 || to < 0) return;
    onReorder(arrayMove(items, from, to), { id: String(active.id), from, to });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      accessibility={{ announcements, screenReaderInstructions: { draggable: t.dndInstructions } }}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul aria-label={label} className={cn("m-0 flex list-none flex-col gap-1 p-0", className)}>
          {items.map((item, i) => (
            <Row key={ids[i]} item={item} id={ids[i]!} index={i} name={nameOf(ids[i]!)} handle={handle} renderItem={renderItem} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
