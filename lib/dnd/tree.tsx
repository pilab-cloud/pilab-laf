import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors, type DragMoveEvent } from "@dnd-kit/core";
import * as React from "react";
import type { TreeDragAdapter, TreeDropPosition } from "../components/tree";
import { cn } from "../cn";

interface DropState {
  overId: string | null;
  position: TreeDropPosition;
}

const DropContext = React.createContext<DropState>({ overId: null, position: "inside" });

function positionOf(e: DragMoveEvent): DropState {
  const { over, active } = e;
  if (!over) return { overId: null, position: "inside" };
  const rect = active.rect.current.translated;
  const mid = rect ? rect.top + rect.height / 2 : over.rect.top + over.rect.height / 2;
  const rel = (mid - over.rect.top) / Math.max(over.rect.height, 1);
  return { overId: String(over.id), position: rel < 0.25 ? "before" : rel > 0.75 ? "after" : "inside" };
}

function Root({ children, selectedIds, onMove }: React.ComponentProps<TreeDragAdapter["Root"]>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const [drop, setDrop] = React.useState<DropState>({ overId: null, position: "inside" });
  const last = React.useRef(drop);
  const update = (e: DragMoveEvent) => {
    const next = positionOf(e);
    last.current = next;
    setDrop((d) => (d.overId === next.overId && d.position === next.position ? d : next));
  };
  return (
    <DndContext
      sensors={sensors}
      onDragMove={update}
      onDragOver={update}
      onDragEnd={({ active, over }) => {
        const { position } = last.current;
        setDrop({ overId: null, position: "inside" });
        if (!over || over.id === active.id) return;
        const id = String(active.id);
        const ids = selectedIds.includes(id) ? selectedIds : [id];
        if (ids.includes(String(over.id))) return;
        onMove(ids, String(over.id), position);
      }}
      onDragCancel={() => setDrop({ overId: null, position: "inside" })}
    >
      <DropContext.Provider value={drop}>{children}</DropContext.Provider>
    </DndContext>
  );
}

const Row = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { "data-tree-id": string }>(function DndTreeRow(
  { className, ...props },
  ref,
) {
  const id = props["data-tree-id"];
  const drag = useDraggable({ id });
  const drop = useDroppable({ id });
  const state = React.useContext(DropContext);
  const over = state.overId === id && !drag.isDragging;
  const merged = (el: HTMLElement | null) => {
    drag.setNodeRef(el);
    drop.setNodeRef(el);
    if (typeof ref === "function") ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
  };
  return (
    <div
      {...props}
      {...drag.listeners}
      ref={merged}
      className={cn(
        className,
        drag.isDragging && "opacity-50",
        over && state.position === "inside" && "bg-primary-light",
        over && state.position === "before" && "shadow-[inset_0_2px_0_0_var(--primary)]",
        over && state.position === "after" && "shadow-[inset_0_-2px_0_0_var(--primary)]",
      )}
    />
  );
});

/** Pass as `dragAdapter` together with `onMove` to enable pointer drag-move in `TreeView`. */
export const treeDragAdapter: TreeDragAdapter = { Root, Row };
