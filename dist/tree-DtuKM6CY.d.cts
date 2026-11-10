import * as React from 'react';

/**
 * Local, structurally compatible copy of the design.md U4 `MenuItemSpec`.
 * Internal to tree/action-bar until lib/components/menu.tsx lands; not re-exported from lib/index.ts.
 */
type MenuItemSpec = {
    type?: "item";
    id: string;
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    danger?: boolean;
    disabled?: boolean | string;
    onSelect(): void;
} | {
    type: "checkbox";
    id: string;
    label: string;
    checked: boolean;
    onCheckedChange(v: boolean): void;
} | {
    type: "radio";
    id: string;
    value: string;
    onValueChange(v: string): void;
    options: {
        value: string;
        label: string;
    }[];
} | {
    type: "submenu";
    id: string;
    label: string;
    icon?: React.ReactNode;
    items: MenuItemSpec[];
} | {
    type: "separator";
} | {
    type: "label";
    label: string;
};

type TreeStatus = "success" | "warning" | "danger" | "info" | "neutral";
interface TreeNode {
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
interface TreeViewProps {
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
    /** Move request produced by a drag adapter (see `treeDragAdapter` in `@pilab/laf/dnd`). */
    onMove?: (ids: string[], targetId: string, position: "inside" | "before" | "after") => void;
    /** Hook point for drag & drop; keeps dnd-kit out of the core entry. */
    dragAdapter?: TreeDragAdapter;
    /** Force (true) or disable (false) virtualization; automatic above 500 visible rows. */
    virtual?: boolean;
    /** Viewport height in px when virtualized. */
    height?: number;
    rowHeight?: number;
    labels?: {
        loading?: string;
        error?: string;
        retry?: string;
        contextMenu?: string;
    };
    className?: string;
}
type TreeDropPosition = "inside" | "before" | "after";
interface TreeDragAdapter {
    /** Wraps the tree; receives the move callback and the current selection. */
    Root: React.ComponentType<{
        children: React.ReactNode;
        selectedIds: string[];
        onMove: (ids: string[], targetId: string, position: TreeDropPosition) => void;
    }>;
    /** Rendered instead of the treeitem `div`; identifies the node through `data-tree-id`. */
    Row: React.ElementType;
}
declare function TreeView({ nodes, label, expanded: expandedProp, defaultExpanded, onExpandedChange, selected: selectedProp, defaultSelected, onSelect: onSelectProp, selection, onSelectedChange, onActivate, loadChildren, contextMenu, onMove, dragAdapter, virtual, height, rowHeight, labels, className, }: TreeViewProps): React.JSX.Element;

export { type MenuItemSpec as M, type TreeDragAdapter as T, type TreeDropPosition as a, type TreeNode as b, type TreeStatus as c, TreeView as d, type TreeViewProps as e };
