import * as React from 'react';
import { T as TreeDragAdapter } from './tree-Cv6L-PZI.js';

interface SortableItemState {
    index: number;
    dragging: boolean;
    /** Spread on the element that should start the drag (the handle). */
    handleProps: React.HTMLAttributes<HTMLElement> & {
        ref: (el: HTMLElement | null) => void;
    };
}
interface SortableListProps<T> {
    items: T[];
    getId: (item: T) => string;
    /** Plain-text name used in screen-reader announcements and the handle label. */
    getLabel?: (item: T) => string;
    onReorder: (items: T[], move: {
        id: string;
        from: number;
        to: number;
    }) => void;
    renderItem: (item: T, state: SortableItemState) => React.ReactNode;
    /** Accessible name of the list. */
    label: string;
    /** Use a dedicated grip button (default) instead of making the whole row the drag target. */
    handle?: boolean;
    className?: string;
}
/** Vertical reorder list: drag handle, keyboard (Space lift, ↑↓ move, Space drop) and live announcements. */
declare function SortableList<T>({ items, getId, getLabel, onReorder, renderItem, label, handle, className }: SortableListProps<T>): React.JSX.Element;

interface KanbanColumn {
    id: string;
    title: string;
    /** Work-in-progress limit; the header warns when the column holds more cards. */
    wipLimit?: number;
}
interface KanbanCard {
    id: string;
    columnId: string;
    title: string;
    description?: React.ReactNode;
}
interface KanbanBoardProps {
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
/**
 * Kanban board. Pointer drag via dnd-kit; keyboard: focus a card, Space lifts it,
 * ←/→ change column, ↑/↓ reorder, Space drops, Escape cancels. Moves are announced politely.
 */
declare function KanbanBoard({ columns, cards, onMove, renderCard, label, className }: KanbanBoardProps): React.JSX.Element;

/** Pass as `dragAdapter` together with `onMove` to enable pointer drag-move in `TreeView`. */
declare const treeDragAdapter: TreeDragAdapter;

export { KanbanBoard, type KanbanBoardProps, type KanbanCard, type KanbanColumn, type SortableItemState, SortableList, type SortableListProps, treeDragAdapter };
