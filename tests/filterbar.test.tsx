import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { FilterBar, SavedViews, parseFilter, serializeFilter, type FilterField, type SavedView, type SavedViewsStorage } from "../lib/components/filterbar";

describe("parseFilter / serializeFilter", () => {
  it("parses the documented example", () => {
    const p = parseFilter('status:open assignee:@me label:"bug fix" -label:wontfix hello');
    expect(p.filters).toEqual([
      { key: "status", op: ":", values: ["open"], negated: false },
      { key: "assignee", op: ":", values: ["@me"], negated: false },
      { key: "label", op: ":", values: ["bug fix"], negated: false },
      { key: "label", op: ":", values: ["wontfix"], negated: true },
    ]);
    expect(p.text).toEqual([{ value: "hello", negated: false }]);
  });
  it("handles lists, operators and escapes", () => {
    const p = parseFilter('status:open,"in progress" priority:>=2 title:"say \\"hi\\""');
    expect(p.filters[0]!.values).toEqual(["open", "in progress"]);
    expect(p.filters[1]).toMatchObject({ key: "priority", op: ">=", values: ["2"] });
    expect(p.filters[2]!.values).toEqual(['say "hi"']);
  });
  it("treats negated/quoted free text, dangling keys and lone dash as text", () => {
    const p = parseFilter('-foo "two words" status: - -"a b"');
    expect(p.filters).toEqual([]);
    expect(p.text).toEqual([
      { value: "foo", negated: true },
      { value: "two words", negated: false },
      { value: "status:", negated: false },
      { value: "-", negated: false },
      { value: "a b", negated: true },
    ]);
  });
  it("tolerates unterminated quotes and whitespace", () => {
    expect(parseFilter('   label:"open end').filters[0]!.values).toEqual(["open end"]);
    expect(parseFilter("").tokens).toEqual([]);
    expect(parseFilter("   ").tokens).toEqual([]);
  });
  it("keeps token order", () => {
    expect(parseFilter("a x:1 b").tokens.map((t) => t.type)).toEqual(["text", "field", "text"]);
  });
  it("round-trips tricky values", () => {
    const qs = [
      'status:open assignee:@me label:"bug fix" -label:wontfix text',
      'a:"x,y" b:">5" c:"" d:"back\\\\slash" -e:1,2,3',
      "n:<=3 m:<4 k:>9",
      '"status:open" "-x" -"y z" plain',
    ];
    for (const q of qs) {
      const p = parseFilter(q);
      expect(parseFilter(serializeFilter(p))).toEqual(p);
    }
    expect(serializeFilter(parseFilter('status:open   label:"bug fix"'))).toBe('status:open label:"bug fix"');
  });
  it("serializes Filter[] plus text", () => {
    expect(
      serializeFilter([{ key: "a", op: ":", values: ["b c"], negated: true }], [{ value: "x y", negated: false }]),
    ).toBe('-a:"b c" "x y"');
  });
});

const fields: FilterField[] = [
  { key: "status", type: "enum", options: [{ value: "open" }, { value: "closed" }, { value: "in progress" }] },
  { key: "assignee", options: [{ value: "@me" }, { value: "anna" }] },
  { key: "label", type: "text" },
  { key: "priority", type: "number" },
];

const memStorage = (init?: string): SavedViewsStorage & { data: Record<string, string> } => {
  const data: Record<string, string> = init ? { k: init } : {};
  return { data, getItem: (k) => data[k] ?? null, setItem: (k, v) => void (data[k] = v) };
};

describe("FilterBar", () => {
  it("commits typed tokens as chips and emits the query", async () => {
    const onChange = vi.fn();
    render(<FilterBar fields={fields} savedViews={false} onChange={onChange} />);
    const input = screen.getByRole("combobox", { name: "Filter" });
    await userEvent.type(input, 'status:open{Enter}');
    expect(onChange).toHaveBeenLastCalledWith("status:open", expect.objectContaining({ filters: expect.any(Array) }));
    await userEvent.type(input, "bug{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("status:open bug", expect.anything());
    expect(screen.getAllByTestId("filter-chip")).toHaveLength(2);
  });

  it("autocompletes field names then values with the keyboard", async () => {
    const onChange = vi.fn();
    render(<FilterBar fields={fields} savedViews={false} onChange={onChange} />);
    const input = screen.getByRole("combobox", { name: "Filter" });
    await userEvent.type(input, "sta");
    expect(screen.getByRole("option", { name: /status:/ })).toBeTruthy();
    await userEvent.keyboard("{Tab}");
    expect((input as HTMLInputElement).value).toBe("status:");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["open", "closed", "in progress"]);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith('status:closed', expect.anything());
    await userEvent.type(input, "status:in");
    await userEvent.click(screen.getByRole("option", { name: "in progress" }));
    expect(onChange).toHaveBeenLastCalledWith('status:closed status:"in progress"', expect.anything());
  });

  it("Backspace on empty input pulls the last chip back for editing; chip remove works", async () => {
    render(<FilterBar fields={fields} savedViews={false} defaultValue="status:open label:x" />);
    const input = screen.getByRole("combobox", { name: "Filter" }) as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.keyboard("{Backspace}");
    expect(input.value).toBe("label:x");
    expect(screen.getAllByTestId("filter-chip")).toHaveLength(1);
    await userEvent.keyboard("{Enter}");
    await userEvent.click(screen.getByRole("button", { name: "Remove filter status:open" }));
    expect(screen.getAllByTestId("filter-chip").map((c) => c.textContent)).toEqual(["label:x"]);
  });

  it("flags unknown/invalid chips", () => {
    render(<FilterBar fields={fields} savedViews={false} defaultValue="status:nope foo:1 priority:abc status:open" />);
    const chips = screen.getAllByTestId("filter-chip");
    expect(chips.map((c) => c.hasAttribute("data-invalid"))).toEqual([true, true, true, false]);
  });

  it("supports controlled usage and clear", async () => {
    const onChange = vi.fn();
    const { rerender } = render(<FilterBar fields={fields} savedViews={false} value="status:open" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear filter" }));
    expect(onChange).toHaveBeenCalledWith("", expect.anything());
    expect(screen.getAllByTestId("filter-chip")).toHaveLength(1);
    rerender(<FilterBar fields={fields} savedViews={false} value="" onChange={onChange} />);
    expect(screen.queryAllByTestId("filter-chip")).toHaveLength(0);
  });

  it("loads async value options", async () => {
    const f: FilterField[] = [{ key: "user", options: async (q) => [{ value: `${q}-1` }] }];
    render(<FilterBar fields={f} savedViews={false} />);
    await userEvent.type(screen.getByRole("combobox", { name: "Filter" }), "user:an");
    expect(await screen.findByRole("option", { name: "an-1" })).toBeTruthy();
  });

  it("has no axe violations", async () => {
    const { container } = render(<FilterBar fields={fields} savedViews={false} defaultValue="status:open" />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("SavedViews", () => {
  it("saves, applies, renames, sets default and deletes, persisting to storage", async () => {
    const storage = memStorage();
    const onApply = vi.fn();
    render(<SavedViews query="status:open" onApply={onApply} storage={storage} storageKey="k" />);
    await userEvent.click(screen.getByRole("button", { name: "Views" }));
    await userEvent.type(screen.getByRole("textbox", { name: "View name" }), "Open{Enter}");
    expect(JSON.parse(storage.data.k!).views[0]).toMatchObject({ name: "Open", query: "status:open" });

    await userEvent.click(screen.getByRole("button", { name: "Make Open the default view" }));
    expect(JSON.parse(storage.data.k!).defaultId).toBe(JSON.parse(storage.data.k!).views[0].id);

    await userEvent.click(screen.getByRole("button", { name: "Rename view Open" }));
    const box = screen.getByRole("textbox", { name: "Rename view Open" });
    await userEvent.clear(box);
    await userEvent.type(box, "Mine{Enter}");
    expect(JSON.parse(storage.data.k!).views[0].name).toBe("Mine");

    await userEvent.click(screen.getByRole("button", { name: "Delete view Mine" }));
    expect(JSON.parse(storage.data.k!)).toMatchObject({ views: [], defaultId: null });
  });

  it("applies a view and closes", async () => {
    const onApply = vi.fn();
    const views: SavedView[] = [{ id: "1", name: "Bugs", query: "label:bug" }];
    render(<SavedViews query="" onApply={onApply} views={views} />);
    await userEvent.click(screen.getByRole("button", { name: "Views" }));
    await userEvent.click(screen.getByRole("button", { name: "Bugs" }));
    expect(onApply).toHaveBeenCalledWith("label:bug", views[0]);
  });

  it("is controllable", async () => {
    const onViewsChange = vi.fn();
    render(<SavedViews query="a:b" onApply={() => {}} views={[]} onViewsChange={onViewsChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Views" }));
    await userEvent.type(screen.getByRole("textbox", { name: "View name" }), "X{Enter}");
    expect(onViewsChange).toHaveBeenCalledWith([expect.objectContaining({ name: "X", query: "a:b" })]);
    expect(screen.getByText("No saved views")).toBeTruthy();
  });

  it("FilterBar applies the default view on mount and via the menu", async () => {
    const storage = memStorage(JSON.stringify({ views: [{ id: "1", name: "Bugs", query: "label:bug" }, { id: "2", name: "Done", query: "status:closed" }], defaultId: "1" }));
    render(<FilterBar fields={fields} savedViews={{ storage, storageKey: "k" }} />);
    expect(screen.getAllByTestId("filter-chip").map((c) => c.textContent)).toEqual(["label:bug"]);
    await userEvent.click(screen.getByRole("button", { name: "Views" }));
    await userEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(screen.getAllByTestId("filter-chip").map((c) => c.textContent)).toEqual(["status:closed"]);
  });
});
