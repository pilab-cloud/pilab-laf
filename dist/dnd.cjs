'use strict';

var chunkQ6OCMENQ_cjs = require('./chunk-Q6OCMENQ.cjs');
var chunkFTHFEMX6_cjs = require('./chunk-FTHFEMX6.cjs');
var core = require('@dnd-kit/core');
var sortable = require('@dnd-kit/sortable');
var utilities = require('@dnd-kit/utilities');
var lucideReact = require('lucide-react');
var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function Row({
  item,
  id,
  index,
  name,
  handle,
  renderItem
}) {
  const { t } = chunkQ6OCMENQ_cjs.useLaf();
  const s = sortable.useSortable({ id });
  const drag = { ...s.attributes, ...s.listeners };
  const gripProps = { ...drag, ref: s.setActivatorNodeRef };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "li",
    {
      ref: s.setNodeRef,
      style: { transform: utilities.CSS.Transform.toString(s.transform), transition: s.transition },
      className: chunkFTHFEMX6_cjs.cn("flex items-center gap-2 rounded-sm border border-line bg-surface px-2 py-1.5", s.isDragging && "relative z-10 opacity-80 shadow-md"),
      ...handle ? {} : drag,
      children: [
        handle && /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", ...gripProps, "aria-label": t.dragHandle(name), className: "btn btn-ghost btn-sm w-auto shrink-0 cursor-grab touch-none px-1", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.GripVertical, { className: "size-4", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 flex-1", children: renderItem(item, { index, dragging: s.isDragging, handleProps: gripProps }) })
      ]
    }
  );
}
function SortableList({ items, getId, getLabel, onReorder, renderItem, label, handle = true, className }) {
  const { t } = chunkQ6OCMENQ_cjs.useLaf();
  const sensors = core.useSensors(
    core.useSensor(core.PointerSensor, { activationConstraint: { distance: 4 } }),
    core.useSensor(core.KeyboardSensor, { coordinateGetter: sortable.sortableKeyboardCoordinates })
  );
  const ids = items.map(getId);
  const nameOf = (id) => {
    const it = items.find((x) => getId(x) === id);
    return it ? getLabel ? getLabel(it) : String(id) : String(id);
  };
  const posOf = (id) => ids.indexOf(String(id)) + 1;
  const announcements = {
    onDragStart: ({ active }) => t.dndLifted(nameOf(active.id), posOf(active.id), ids.length),
    onDragOver: ({ active, over }) => over ? t.dndMoved(nameOf(active.id), posOf(over.id), ids.length) : void 0,
    onDragEnd: ({ active, over }) => t.dndDropped(nameOf(active.id), posOf(over?.id ?? active.id), ids.length),
    onDragCancel: ({ active }) => t.dndCancelled(nameOf(active.id))
  };
  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from < 0 || to < 0) return;
    onReorder(sortable.arrayMove(items, from, to), { id: String(active.id), from, to });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    core.DndContext,
    {
      sensors,
      collisionDetection: core.closestCenter,
      onDragEnd,
      accessibility: { announcements, screenReaderInstructions: { draggable: t.dndInstructions } },
      children: /* @__PURE__ */ jsxRuntime.jsx(sortable.SortableContext, { items: ids, strategy: sortable.verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntime.jsx("ul", { "aria-label": label, className: chunkFTHFEMX6_cjs.cn("m-0 flex list-none flex-col gap-1 p-0", className), children: items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsx(Row, { item, id: ids[i], index: i, name: nameOf(ids[i]), handle, renderItem }, ids[i])) }) })
    }
  );
}
var layoutOf = (columns, cards) => {
  const out = {};
  columns.forEach((c) => out[c.id] = []);
  cards.forEach((c) => (out[c.columnId] ??= []).push(c.id));
  return out;
};
var locate = (layout, id) => {
  for (const col of Object.keys(layout)) {
    const index = layout[col].indexOf(id);
    if (index >= 0) return { col, index };
  }
  return null;
};
function relocate(layout, id, toCol, index) {
  const from = locate(layout, id);
  if (!from) return layout;
  const next = { ...layout, [from.col]: layout[from.col].filter((c) => c !== id) };
  const target = [...next[toCol] ?? []];
  target.splice(Math.max(0, Math.min(index, target.length)), 0, id);
  next[toCol] = target;
  return next;
}
var cssEscape = (s) => s.replace(/["\\]/g, "\\$&");
function CardView({
  card,
  lifted,
  children,
  onKeyDown
}) {
  const s = sortable.useSortable({ id: card.id });
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      ref: s.setNodeRef,
      "data-card-id": card.id,
      tabIndex: 0,
      "aria-roledescription": "card",
      "aria-grabbed": lifted || void 0,
      onKeyDown,
      ...s.listeners,
      style: { transform: utilities.CSS.Transform.toString(s.transform), transition: s.transition },
      className: chunkFTHFEMX6_cjs.cn(
        "cursor-grab touch-none rounded-sm border border-line bg-surface p-2 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary",
        (s.isDragging || lifted) && "border-primary shadow-md",
        s.isDragging && "opacity-60"
      ),
      children
    }
  );
}
function ColumnView({ column, ids, children }) {
  const { t } = chunkQ6OCMENQ_cjs.useLaf();
  const { setNodeRef, isOver } = core.useDroppable({ id: column.id });
  const over = column.wipLimit !== void 0 && ids.length > column.wipLimit;
  const headId = React__namespace.useId();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "section",
    {
      role: "group",
      "aria-labelledby": headId,
      className: chunkFTHFEMX6_cjs.cn("flex w-72 shrink-0 flex-col gap-2 rounded-sm border border-line bg-muted-bg p-2", isOver && "border-primary"),
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("header", { className: "flex items-center justify-between gap-2 px-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { id: headId, className: "m-0 text-sm font-semibold text-fg", children: column.title }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: chunkFTHFEMX6_cjs.cn("inline-flex items-center gap-1 text-xs", over ? "text-warning" : "text-muted"), children: [
            over && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertTriangle, { className: "size-3", "aria-hidden": true }),
            column.wipLimit !== void 0 ? t.wipLimit(ids.length, column.wipLimit) : ids.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(sortable.SortableContext, { items: ids, strategy: sortable.verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntime.jsxs("ul", { ref: setNodeRef, className: "m-0 flex min-h-12 list-none flex-col gap-2 p-0", children: [
          children,
          ids.length === 0 && /* @__PURE__ */ jsxRuntime.jsx("li", { className: "px-1 py-2 text-xs text-subtle", children: t.emptyColumn })
        ] }) })
      ]
    }
  );
}
function KanbanBoard({ columns, cards, onMove, renderCard, label, className }) {
  const { t } = chunkQ6OCMENQ_cjs.useLaf();
  const sensors = core.useSensors(core.useSensor(core.PointerSensor, { activationConstraint: { distance: 5 } }));
  const source = React__namespace.useMemo(() => layoutOf(columns, cards), [columns, cards]);
  const [layout, setLayout] = React__namespace.useState(source);
  React__namespace.useEffect(() => setLayout(source), [source]);
  const byId = React__namespace.useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const colTitle = (id) => columns.find((c) => c.id === id)?.title ?? id;
  const nameOf = (id) => byId.get(id)?.title ?? id;
  const [message, setMessage] = React__namespace.useState("");
  const [lifted, setLifted] = React__namespace.useState(null);
  const dragOrigin = React__namespace.useRef(null);
  const refocus = React__namespace.useRef(null);
  const root = React__namespace.useRef(null);
  const latest = React__namespace.useRef(layout);
  latest.current = layout;
  React__namespace.useEffect(() => {
    const id = refocus.current;
    if (!id) return;
    refocus.current = null;
    root.current?.querySelector(`[data-card-id="${cssEscape(id)}"]`)?.focus();
  });
  const commit = (id, to, from, next) => {
    if (to.col === from.col && to.index === from.index) return;
    const total = next[to.col].length;
    setMessage(to.col === from.col ? t.dndDropped(nameOf(id), to.index + 1, total) : t.dndDroppedTo(nameOf(id), colTitle(to.col), to.index + 1, total));
    const res = onMove?.(id, to.col, to.index);
    if (res && typeof res.then === "function") res.then(void 0, () => setLayout(source));
  };
  const onCardKey = (e, id) => {
    if (e.target !== e.currentTarget) return;
    const pos = locate(latest.current, id);
    if (!pos) return;
    if (lifted?.id !== id) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setLifted({ id, origin: pos });
        setMessage(t.dndLifted(nameOf(id), pos.index + 1, latest.current[pos.col].length));
      }
      return;
    }
    let to = pos;
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const index = Math.max(0, Math.min(pos.index + (e.key === "ArrowDown" ? 1 : -1), latest.current[pos.col].length - 1));
      to = { col: pos.col, index };
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
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
    const total = next[to.col].length;
    refocus.current = id;
    setLayout(next);
    setMessage(to.col === pos.col ? t.dndMoved(nameOf(id), to.index + 1, total) : t.dndMovedTo(nameOf(id), colTitle(to.col), to.index + 1, total));
  };
  const colOf = (id) => columns.some((c) => c.id === id) ? String(id) : locate(latest.current, String(id))?.col;
  const onDragStart = ({ active }) => {
    dragOrigin.current = locate(latest.current, String(active.id));
  };
  const onDragOver = ({ active, over }) => {
    if (!over) return;
    const from = locate(latest.current, String(active.id));
    const toCol = colOf(over.id);
    if (!from || !toCol || from.col === toCol) return;
    const overIdx = latest.current[toCol].indexOf(String(over.id));
    setLayout((l) => relocate(l, String(active.id), toCol, overIdx >= 0 ? overIdx : l[toCol].length));
  };
  const onDragEnd = ({ active, over }) => {
    const id = String(active.id);
    const origin = dragOrigin.current;
    dragOrigin.current = null;
    if (!origin) return;
    let next = latest.current;
    const cur = locate(next, id);
    if (over && cur) {
      const overIdx = next[cur.col].indexOf(String(over.id));
      if (overIdx >= 0 && overIdx !== cur.index) next = relocate(next, id, cur.col, overIdx);
    }
    const to = locate(next, id);
    setLayout(next);
    if (to) commit(id, to, origin, next);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: root, role: "region", "aria-label": label, className: chunkFTHFEMX6_cjs.cn("flex items-start gap-3 overflow-x-auto", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("p", { className: "sr-only", children: t.dndInstructions }),
    /* @__PURE__ */ jsxRuntime.jsx(
      core.DndContext,
      {
        sensors,
        collisionDetection: core.closestCorners,
        onDragStart,
        onDragOver,
        onDragEnd,
        onDragCancel: () => setLayout(source),
        children: columns.map((col) => /* @__PURE__ */ jsxRuntime.jsx(ColumnView, { column: col, ids: layout[col.id] ?? [], children: (layout[col.id] ?? []).map((id) => {
          const card = byId.get(id);
          if (!card) return null;
          return /* @__PURE__ */ jsxRuntime.jsx(CardView, { card, lifted: lifted?.id === id, onKeyDown: (e) => onCardKey(e, id), children: renderCard ? renderCard(card) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium", children: card.title }),
            card.description && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-1 text-xs text-muted", children: card.description })
          ] }) }, id);
        }) }, col.id))
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("div", { role: "status", "aria-live": "polite", "aria-atomic": true, className: "sr-only", children: message })
  ] });
}
var DropContext = React__namespace.createContext({ overId: null, position: "inside" });
function positionOf(e) {
  const { over, active } = e;
  if (!over) return { overId: null, position: "inside" };
  const rect = active.rect.current.translated;
  const mid = rect ? rect.top + rect.height / 2 : over.rect.top + over.rect.height / 2;
  const rel = (mid - over.rect.top) / Math.max(over.rect.height, 1);
  return { overId: String(over.id), position: rel < 0.25 ? "before" : rel > 0.75 ? "after" : "inside" };
}
function Root({ children, selectedIds, onMove }) {
  const sensors = core.useSensors(core.useSensor(core.PointerSensor, { activationConstraint: { distance: 6 } }));
  const [drop, setDrop] = React__namespace.useState({ overId: null, position: "inside" });
  const last = React__namespace.useRef(drop);
  const update = (e) => {
    const next = positionOf(e);
    last.current = next;
    setDrop((d) => d.overId === next.overId && d.position === next.position ? d : next);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    core.DndContext,
    {
      sensors,
      onDragMove: update,
      onDragOver: update,
      onDragEnd: ({ active, over }) => {
        const { position } = last.current;
        setDrop({ overId: null, position: "inside" });
        if (!over || over.id === active.id) return;
        const id = String(active.id);
        const ids = selectedIds.includes(id) ? selectedIds : [id];
        if (ids.includes(String(over.id))) return;
        onMove(ids, String(over.id), position);
      },
      onDragCancel: () => setDrop({ overId: null, position: "inside" }),
      children: /* @__PURE__ */ jsxRuntime.jsx(DropContext.Provider, { value: drop, children })
    }
  );
}
var Row2 = React__namespace.forwardRef(function DndTreeRow({ className, ...props }, ref) {
  const id = props["data-tree-id"];
  const drag = core.useDraggable({ id });
  const drop = core.useDroppable({ id });
  const state = React__namespace.useContext(DropContext);
  const over = state.overId === id && !drag.isDragging;
  const merged = (el) => {
    drag.setNodeRef(el);
    drop.setNodeRef(el);
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ...props,
      ...drag.listeners,
      ref: merged,
      className: chunkFTHFEMX6_cjs.cn(
        className,
        drag.isDragging && "opacity-50",
        over && state.position === "inside" && "bg-primary-light",
        over && state.position === "before" && "shadow-[inset_0_2px_0_0_var(--primary)]",
        over && state.position === "after" && "shadow-[inset_0_-2px_0_0_var(--primary)]"
      )
    }
  );
});
var treeDragAdapter = { Root, Row: Row2 };

exports.KanbanBoard = KanbanBoard;
exports.SortableList = SortableList;
exports.treeDragAdapter = treeDragAdapter;
//# sourceMappingURL=dnd.cjs.map
//# sourceMappingURL=dnd.cjs.map