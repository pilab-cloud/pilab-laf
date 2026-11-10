import * as React from "react";
import { CommandPalette, HotkeysProvider, ShortcutHelp, TreeView, useHotkeys, type Command, type TreeNode } from "../../lib";
import { KanbanBoard, SortableList, treeDragAdapter, type KanbanCard } from "../../lib/dnd";

const initialCards: KanbanCard[] = [
  { id: "1", columnId: "todo", title: "Provision VM", description: "web-01" },
  { id: "2", columnId: "todo", title: "Rotate keys" },
  { id: "3", columnId: "doing", title: "Patch hosts" },
];

const initialTree: TreeNode[] = [
  { id: "dc", label: "Datacenter", children: [{ id: "h1", label: "host-1" }, { id: "h2", label: "host-2" }] },
  { id: "unassigned", label: "Unassigned", children: [{ id: "h3", label: "host-3" }] },
];

function moveNode(nodes: TreeNode[], ids: string[], target: string, pos: "inside" | "before" | "after"): TreeNode[] {
  const taken: TreeNode[] = [];
  const strip = (list: TreeNode[]): TreeNode[] =>
    list.flatMap((n) => (ids.includes(n.id) ? (taken.push(n), []) : [{ ...n, children: n.children && strip(n.children) }]));
  const rest = strip(nodes);
  const put = (list: TreeNode[]): TreeNode[] =>
    list.flatMap((n) => {
      const self = { ...n, children: n.children && put(n.children) };
      if (n.id !== target) return [self];
      if (pos === "before") return [...taken, self];
      if (pos === "after") return [self, ...taken];
      return [{ ...self, children: [...(self.children ?? []), ...taken] }];
    });
  return put(rest);
}

function Demo() {
  const [cards, setCards] = React.useState(initialCards);
  const [tree, setTree] = React.useState(initialTree);
  const [list, setList] = React.useState(["Backlog", "Sprint", "Release"]);
  const [palette, setPalette] = React.useState(false);
  const [help, setHelp] = React.useState(false);
  const [recent, setRecent] = React.useState<Command[]>([]);
  const [last, setLast] = React.useState("");

  useHotkeys(
    { "mod+k": () => setPalette(true), "g i": () => setLast("Go to inbox"), "g d": () => setLast("Go to dashboard") },
    { descriptions: { "mod+k": "Command palette", "g i": "Go to inbox", "g d": "Go to dashboard" } },
  );

  const commands: Command[] = [
    { id: "vm", label: "Create VM", group: "Actions", onSelect: () => setLast("Create VM") },
    { id: "hosts", label: "Go to Hosts", group: "Navigate", onSelect: () => setLast("Hosts") },
  ];

  return (
    <div className="grid gap-6">
      <h2 className="m-0">Drag & drop and hotkeys</h2>
      <p className="m-0 text-sm text-muted">
        Try ⌘/Ctrl+K, “g i”, “?”. Last action: {last || "–"}
      </p>
      <KanbanBoard
        label="Work board"
        columns={[{ id: "todo", title: "To do" }, { id: "doing", title: "Doing", wipLimit: 2 }, { id: "done", title: "Done" }]}
        cards={cards}
        onMove={(id, col, index) => {
          setCards((cs) => {
            const moving = cs.find((c) => c.id === id)!;
            const rest = cs.filter((c) => c.id !== id);
            const inCol = rest.filter((c) => c.columnId === col);
            const before = inCol[index];
            const at = before ? rest.indexOf(before) : rest.length;
            return [...rest.slice(0, at), { ...moving, columnId: col }, ...rest.slice(at)];
          });
        }}
      />
      <div className="grid max-w-md gap-4 md:grid-cols-2">
        <SortableList label="Boot order" items={list} getId={(s) => s} onReorder={setList} renderItem={(s) => s} />
        <TreeView label="Hosts" nodes={tree} defaultExpanded={["dc", "unassigned"]} onMove={(ids, t, p) => setTree((n) => moveNode(n, ids, t, p))} dragAdapter={treeDragAdapter} />
      </div>
      <CommandPalette open={palette} onOpenChange={setPalette} commands={commands} recent={recent} onCommandRun={(c) => setRecent((r) => [c, ...r.filter((x) => x.id !== c.id)].slice(0, 3))} />
      <ShortcutHelp open={help} onOpenChange={setHelp} />
    </div>
  );
}

export default function DndHotkeys() {
  return (
    <HotkeysProvider>
      <Demo />
    </HotkeysProvider>
  );
}
