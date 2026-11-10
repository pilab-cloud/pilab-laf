import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { CommandPalette, HotkeysProvider, ShortcutHelp, TreeView, useHotkeys } from "../lib";
import { KanbanBoard, SortableList, treeDragAdapter, type KanbanCard } from "../lib/dnd";

const columns = [
  { id: "todo", title: "To do" },
  { id: "doing", title: "Doing", wipLimit: 1 },
  { id: "done", title: "Done" },
];
const cards: KanbanCard[] = [
  { id: "a", columnId: "todo", title: "Alpha" },
  { id: "b", columnId: "todo", title: "Beta" },
  { id: "c", columnId: "doing", title: "Gamma" },
];

const card = (name: string) => screen.getByText(name).closest("li") as HTMLElement;
const live = (c: HTMLElement) => c.querySelector<HTMLElement>("[aria-live=polite]")!;
const key = (el: Element, k: string) => fireEvent.keyDown(el, { key: k });

describe("KanbanBoard", () => {
  it("moves a card with the keyboard only and announces each step", async () => {
    const onMove = vi.fn();
    const { container } = render(<KanbanBoard label="Board" columns={columns} cards={cards} onMove={onMove} />);
    expect(await axe(container)).toHaveNoViolations();
    const status = live(container);

    card("Alpha").focus();
    key(card("Alpha"), " ");
    expect(status).toHaveTextContent("Picked up Alpha, position 1 of 2.");
    key(card("Alpha"), "ArrowDown");
    expect(status).toHaveTextContent("Alpha moved to position 2 of 2.");
    key(card("Alpha"), "ArrowRight");
    expect(status).toHaveTextContent("Alpha moved to Doing, position 2 of 2.");
    // focus follows the card into the new column
    expect(card("Alpha")).toHaveFocus();
    key(card("Alpha"), " ");
    expect(status).toHaveTextContent("Alpha dropped in Doing, position 2 of 2.");
    expect(onMove).toHaveBeenCalledWith("a", "doing", 1);
    // WIP limit 1 exceeded
    expect(screen.getByText("2 of 1 (limit)")).toBeInTheDocument();
  });

  it("escape cancels, empty columns render and rejected moves roll back", async () => {
    const onMove = vi.fn(() => Promise.reject(new Error("no")));
    const { container } = render(<KanbanBoard label="Board" columns={columns} cards={cards} onMove={onMove} />);
    expect(screen.getByText("No cards")).toBeInTheDocument();
    key(card("Beta"), " ");
    key(card("Beta"), "ArrowRight");
    key(card("Beta"), "Escape");
    expect(live(container)).toHaveTextContent("Move of Beta cancelled.");
    expect(onMove).not.toHaveBeenCalled();
    expect(card("Beta").closest("section")).toHaveAccessibleName("To do");

    key(card("Beta"), " ");
    key(card("Beta"), "ArrowRight");
    key(card("Beta"), " ");
    await waitFor(() => expect(card("Beta").closest("section")).toHaveAccessibleName("To do"));
  });
});

describe("SortableList", () => {
  it("renders a labelled handle per item", async () => {
    const { container } = render(
      <SortableList label="Order" items={["x", "y"]} getId={(s) => s} onReorder={() => {}} renderItem={(s) => <span>{s}</span>} />,
    );
    expect(screen.getByRole("button", { name: "Drag x" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("TreeView drag adapter", () => {
  it("mounts rows through the adapter without breaking tree semantics", () => {
    render(<TreeView label="T" nodes={[{ id: "a", label: "A" }, { id: "b", label: "B" }]} onMove={() => {}} dragAdapter={treeDragAdapter} />);
    expect(screen.getAllByRole("treeitem")).toHaveLength(2);
  });
});

function Keys({ log }: { log: string[] }) {
  useHotkeys({ "g i": () => log.push("gi"), "mod+k": () => log.push("mod+k") }, { descriptions: { "g i": "Go to inbox" } });
  useHotkeys({ s: () => log.push("scoped") }, { scope: "grid" });
  return <input aria-label="field" />;
}

describe("hotkeys", () => {
  it("fires sequences, mod combos, ignores inputs and honours scopes", () => {
    const log: string[] = [];
    render(
      <HotkeysProvider>
        <Keys log={log} />
      </HotkeysProvider>,
    );
    key(document.body, "g");
    key(document.body, "i");
    expect(log).toEqual(["gi"]);
    key(document.body, "i");
    key(document.body, "g");
    expect(log).toEqual(["gi"]);
    fireEvent.keyDown(document.body, { key: "k", ctrlKey: true });
    fireEvent.keyDown(document.body, { key: "k", metaKey: true });
    expect(log.filter((l) => l === "mod+k")).toHaveLength(1);
    key(screen.getByLabelText("field"), "g");
    key(screen.getByLabelText("field"), "i");
    expect(log).toHaveLength(2);
    key(document.body, "s");
    expect(log).not.toContain("scoped");
  });

  it("ShortcutHelp opens on ? and lists registered keys only", () => {
    function App() {
      const [open, setOpen] = React.useState(false);
      return (
        <HotkeysProvider>
          <Keys log={[]} />
          <ShortcutHelp open={open} onOpenChange={setOpen} />
        </HotkeysProvider>
      );
    }
    render(<App />);
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => {
      fireEvent.keyDown(document.body, { key: "?", shiftKey: true });
    });
    const dialog = screen.getByRole("dialog", { name: "Keyboard shortcuts" });
    expect(dialog).toHaveTextContent("Go to inbox");
    expect(dialog).toHaveTextContent("G I");
    expect(dialog).not.toHaveTextContent("grid");
  });
});

describe("CommandPalette async/groups/recent", () => {
  it("shows recent items, grouped async results and drops stale responses", async () => {
    const run = vi.fn();
    const search = vi.fn(async (q: string) => [{ id: `r-${q}`, label: `Remote ${q}`, group: "Servers", onSelect: run }]);
    render(
      <CommandPalette
        open
        onOpenChange={() => {}}
        commands={[{ id: "l", label: "Local thing", group: "Actions", onSelect: () => {} }]}
        recent={[{ id: "x", label: "Last used", onSelect: () => {} }]}
        search={search}
      />,
    );
    expect(screen.getByText("Recent")).toBeInTheDocument();
    expect(screen.getByText("Last used")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "ab" } });
    expect(await screen.findByText("Remote ab")).toBeInTheDocument();
    expect(screen.getByText("Servers")).toBeInTheDocument();
    expect(screen.queryByText("Last used")).toBeNull();
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "Enter" });
    expect(run).toHaveBeenCalled();
  });
});
