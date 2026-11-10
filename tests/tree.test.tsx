import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { ActionBar, InfiniteList, TreeView, VirtualList, type TreeNode } from "../lib";

const nodes: TreeNode[] = [
  {
    id: "fruit",
    label: "Fruit",
    children: [
      { id: "apple", label: "Apple" },
      { id: "apricot", label: "Apricot" },
      { id: "banana", label: "Banana", disabled: true },
    ],
  },
  { id: "veg", label: "Vegetables", hasChildren: true },
  { id: "nuts", label: "Nuts" },
];

const item = (name: string) => screen.getByRole("treeitem", { name });

describe("TreeView v2", () => {
  it("has ARIA tree semantics and is axe clean", async () => {
    const { container } = render(<TreeView label="Food" nodes={nodes} defaultExpanded={["fruit"]} selection="multiple" />);
    const tree = screen.getByRole("tree", { name: "Food" });
    expect(tree).toHaveAttribute("aria-multiselectable", "true");
    const apple = item("Apple");
    expect(apple).toHaveAttribute("aria-level", "2");
    expect(apple).toHaveAttribute("aria-posinset", "1");
    expect(apple).toHaveAttribute("aria-setsize", "3");
    expect(item("Fruit")).toHaveAttribute("aria-expanded", "true");
    expect(item("Banana")).toHaveAttribute("aria-disabled", "true");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("navigates with arrows, Home/End and expands/collapses", () => {
    render(<TreeView label="Food" nodes={nodes} />);
    const fruit = item("Fruit");
    fruit.focus();
    fireEvent.keyDown(fruit, { key: "ArrowRight" });
    expect(fruit).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(fruit, { key: "ArrowRight" });
    expect(item("Apple")).toHaveFocus();
    fireEvent.keyDown(item("Apple"), { key: "ArrowDown" });
    expect(item("Apricot")).toHaveFocus();
    fireEvent.keyDown(item("Apricot"), { key: "ArrowLeft" });
    expect(item("Fruit")).toHaveFocus();
    fireEvent.keyDown(item("Fruit"), { key: "End" });
    expect(item("Nuts")).toHaveFocus();
    fireEvent.keyDown(item("Nuts"), { key: "Home" });
    expect(item("Fruit")).toHaveFocus();
    fireEvent.keyDown(item("Fruit"), { key: "ArrowLeft" });
    expect(item("Fruit")).toHaveAttribute("aria-expanded", "false");
  });

  it("supports type-ahead and * to expand siblings", async () => {
    render(<TreeView label="Food" nodes={nodes} defaultExpanded={["fruit"]} />);
    const fruit = item("Fruit");
    fruit.focus();
    fireEvent.keyDown(fruit, { key: "n" });
    expect(item("Nuts")).toHaveFocus();
    await new Promise((r) => setTimeout(r, 750)); // type-ahead buffer resets
    fireEvent.keyDown(item("Nuts"), { key: "f" });
    expect(item("Fruit")).toHaveFocus();
    await new Promise((r) => setTimeout(r, 750));
    fireEvent.keyDown(item("Fruit"), { key: "a" });
    fireEvent.keyDown(item("Apple"), { key: "p" });
    expect(item("Apple")).toHaveFocus();
    fireEvent.keyDown(item("Apple"), { key: "r" });
    expect(item("Apricot")).toHaveFocus();
    fireEvent.keyDown(item("Fruit"), { key: "*" });
    expect(item("Vegetables")).toHaveAttribute("aria-expanded", "true");
  });

  it("selects: single, multi toggle and shift range; skips disabled", () => {
    const onSelect = vi.fn();
    const onSelectedChange = vi.fn();
    render(<TreeView label="Food" nodes={nodes} defaultExpanded={["fruit"]} selection="multiple" onSelect={onSelect} onSelectedChange={onSelectedChange} />);
    fireEvent.click(item("Apple"));
    expect(item("Apple")).toHaveAttribute("aria-selected", "true");
    fireEvent.click(item("Nuts"), { ctrlKey: true });
    expect(onSelectedChange).toHaveBeenLastCalledWith(["apple", "nuts"]);
    fireEvent.click(item("Apple"));
    fireEvent.click(item("Vegetables"), { shiftKey: true });
    expect(onSelectedChange).toHaveBeenLastCalledWith(["apple", "apricot", "veg"]);
    fireEvent.click(item("Banana"));
    expect(item("Banana")).toHaveAttribute("aria-selected", "false");
    expect(onSelect).toHaveBeenCalled();
  });

  it("keeps the legacy single-string selected/onSelect API", () => {
    const onSelect = vi.fn();
    render(<TreeView label="Food" nodes={nodes} selected="nuts" onSelect={onSelect} />);
    expect(item("Nuts")).toHaveAttribute("aria-selected", "true");
    fireEvent.click(item("Fruit"));
    expect(onSelect).toHaveBeenCalledWith("fruit");
  });

  it("lazy-loads children with a loading row, and shows a retry row on failure", async () => {
    let n = 0;
    function Host() {
      const [tree, setTree] = React.useState(nodes);
      const loadChildren = async (id: string) => {
        n++;
        await new Promise((r) => setTimeout(r, 5));
        if (n === 1) throw new Error("boom");
        setTree((t) => t.map((x) => (x.id === id ? { ...x, children: [{ id: "kale", label: "Kale" }] } : x)));
      };
      return <TreeView label="Food" nodes={tree} loadChildren={loadChildren} />;
    }
    render(<Host />);
    fireEvent.keyDown(item("Vegetables"), { key: "ArrowRight" });
    expect(screen.getByText("Loading…")).toBeInTheDocument();
    const retry = await screen.findByRole("button", { name: /Retry/ });
    fireEvent.click(retry);
    expect(await screen.findByRole("treeitem", { name: "Kale" })).toHaveAttribute("aria-level", "2");
    expect(n).toBe(2);
  });

  it("opens the context menu with Shift+F10", async () => {
    const onSelect = vi.fn();
    render(<TreeView label="Food" nodes={nodes} contextMenu={(id) => [{ id: "x", label: `Rename ${id}`, onSelect }]} />);
    const nuts = item("Nuts");
    nuts.focus();
    fireEvent.keyDown(nuts, { key: "F10", shiftKey: true });
    fireEvent.click(await screen.findByRole("menuitem", { name: "Rename nuts" }));
    expect(onSelect).toHaveBeenCalled();
  });

  it("steps through 10 000 expanded nodes in under 16 ms", () => {
    const big: TreeNode[] = Array.from({ length: 100 }, (_, g) => ({
      id: `g${g}`,
      label: `G${g}`,
      children: Array.from({ length: 99 }, (_, i) => ({ id: `g${g}-${i}`, label: `N${g}.${i}` })),
    }));
    const open = big.map((b) => b.id);
    render(<TreeView label="Big" nodes={big} defaultExpanded={open} height={400} />);
    expect(screen.getAllByRole("treeitem").length).toBeLessThan(100);
    let cur = item("G0");
    cur.focus();
    const times: number[] = [];
    for (let i = 0; i < 20; i++) {
      const t = performance.now();
      act(() => {
        fireEvent.keyDown(cur, { key: "ArrowDown" });
      });
      times.push(performance.now() - t);
      cur = document.activeElement as HTMLElement;
    }
    times.sort((a, b) => a - b);
    expect(cur).toHaveAttribute("aria-posinset", "20");
    expect(times[Math.floor(times.length / 2)]).toBeLessThan(16);
  });
});

describe("VirtualList / InfiniteList / ActionBar", () => {
  it("windows rows", () => {
    render(<VirtualList label="l" items={Array.from({ length: 5000 }, (_, i) => i)} rowHeight={20} height={200} renderRow={(i) => <span>r{i}</span>} />);
    expect(screen.getAllByRole("listitem").length).toBeLessThan(30);
    expect(screen.getByText("r0")).toBeInTheDocument();
  });

  it("InfiniteList fires onEndReached and offers Load more", async () => {
    const onEnd = vi.fn();
    render(<InfiniteList label="l" items={["a", "b"]} rowHeight={20} height={200} hasMore onEndReached={onEnd} renderRow={(r) => <span>{r}</span>} />);
    await waitFor(() => expect(onEnd).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: "Load more" }));
    expect(onEnd).toHaveBeenCalledTimes(2);
  });

  it("ActionBar renders item specs in a toolbar", () => {
    const onSelect = vi.fn();
    render(<ActionBar label="Bar" items={[{ id: "a", label: "Run", onSelect }, { type: "separator" }, { id: "b", label: "Stop", onSelect, disabled: "busy" }]} />);
    fireEvent.click(screen.getByRole("button", { name: "Run" }));
    expect(onSelect).toHaveBeenCalled();
    expect(screen.getByRole("toolbar", { name: "Bar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Stop" })).toBeDisabled();
  });
});
