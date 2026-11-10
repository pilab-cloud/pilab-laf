import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { DataGrid, type GridColumn, type GridSort } from "../lib";
import { TreeTable } from "../lib/components/treetable";

interface R {
  id: string;
  n: string;
  v: number;
}
const mk = (count: number): R[] => Array.from({ length: count }, (_, i) => ({ id: `r${i}`, n: `name ${i}`, v: i % 7 }));
const cols: GridColumn<R>[] = [
  { id: "n", header: "Name", sortable: true, cell: (r) => r.n },
  { id: "v", header: "Value", sortable: true, numeric: true, cell: (r) => r.v },
];
const dataRows = () => screen.getAllByRole("row").filter((r) => r.hasAttribute("data-row-index"));

describe("DataGrid v2", () => {
  it("multi-sorts with shift and emits arrays", async () => {
    const onSort = vi.fn();
    function Host() {
      const [s, setS] = React.useState<GridSort[]>([]);
      return <DataGrid label="g" rows={mk(5)} rowId={(r) => r.id} columns={cols} sort={s} onSortChange={(x) => (onSort(x), setS(x))} />;
    }
    render(<Host />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Name" }));
    await user.keyboard("{Shift>}");
    await user.click(screen.getByRole("button", { name: /Value/ }));
    await user.keyboard("{/Shift}");
    expect(onSort).toHaveBeenLastCalledWith([
      { id: "n", dir: "asc" },
      { id: "v", dir: "asc" },
    ]);
    expect(screen.getByRole("columnheader", { name: /Name/ })).toHaveAttribute("aria-sort", "ascending");
  });

  it("sorts client-side and leaves order to the server in manual mode", async () => {
    const rows = [{ id: "a", n: "b", v: 1 }, { id: "b", n: "a", v: 2 }];
    const { unmount } = render(<DataGrid label="g" rows={rows} rowId={(r) => r.id} columns={cols} />);
    await userEvent.click(screen.getByRole("button", { name: "Name" }));
    expect(dataRows()[0]).toHaveTextContent("a");
    unmount();
    const onSort = vi.fn();
    render(<DataGrid label="g" manual rows={rows} rowId={(r) => r.id} columns={cols} onSortChange={onSort} />);
    await userEvent.click(screen.getByRole("button", { name: "Name" }));
    expect(onSort).toHaveBeenCalled();
    expect(dataRows()[0]).toHaveTextContent("b");
  });

  it("selects ranges with shift and toggles with ctrl", async () => {
    const onSel = vi.fn();
    function Host() {
      const [s, setS] = React.useState<string[]>([]);
      return <DataGrid label="g" rows={mk(10)} rowId={(r) => r.id} columns={cols} selected={s} onSelectedChange={(x) => (onSel(x), setS(x))} />;
    }
    render(<Host />);
    const user = userEvent.setup();
    await user.click(within(dataRows()[1]!).getByText("name 1"));
    await user.keyboard("{Shift>}");
    await user.click(within(dataRows()[4]!).getByText("name 4"));
    await user.keyboard("{/Shift}");
    expect(onSel).toHaveBeenLastCalledWith(["r1", "r2", "r3", "r4"]);
    await user.keyboard("{Control>}");
    await user.click(within(dataRows()[2]!).getByText("name 2"));
    await user.keyboard("{/Control}");
    expect(onSel).toHaveBeenLastCalledWith(["r1", "r3", "r4"]);
  });

  it("navigates with the keyboard, selects with space and activates with enter", async () => {
    const onActivate = vi.fn();
    const onSel = vi.fn();
    render(<DataGrid label="g" rows={mk(5)} rowId={(r) => r.id} columns={cols} selected={[]} onSelectedChange={onSel} onRowActivate={onActivate} />);
    const grid = screen.getByRole("grid");
    grid.focus();
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    expect(grid.getAttribute("aria-activedescendant")).toBe(dataRows()[2]!.id);
    await userEvent.keyboard(" ");
    expect(onSel).toHaveBeenCalledWith(["r2"]);
    await userEvent.keyboard("{Enter}");
    expect(onActivate).toHaveBeenCalledWith(expect.objectContaining({ id: "r2" }));
  });

  it("toggles expandable rows and shows the bulk bar", async () => {
    render(
      <DataGrid
        label="g"
        rows={mk(3)}
        rowId={(r) => r.id}
        columns={cols}
        renderExpanded={(r) => <p>detail {r.id}</p>}
        selected={["r0", "r1"]}
        bulkActions={(ids) => <button type="button">Do {ids.length}</button>}
      />,
    );
    await userEvent.click(screen.getAllByRole("button", { name: "Expand row" })[0]!);
    expect(screen.getByText("detail r0")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Do 2" })).toBeInTheDocument();
  });

  it("opens row actions from the kebab", async () => {
    const run = vi.fn();
    render(<DataGrid label="g" rows={mk(2)} rowId={(r) => r.id} columns={cols} rowActions={() => [{ id: "x", label: "Do it", onSelect: run }]} />);
    await userEvent.click(screen.getAllByRole("button", { name: "Row actions" })[0]!);
    await userEvent.click(await screen.findByRole("menuitem", { name: "Do it" }));
    expect(run).toHaveBeenCalled();
  });

  it("persists visibility, order and density under viewKey", () => {
    window.localStorage.clear();
    const { unmount } = render(<DataGrid label="g" viewKey="t" rows={mk(2)} rowId={(r) => r.id} columns={cols} density="compact" />);
    expect(JSON.parse(window.localStorage.getItem("laf:datagrid:t")!).density).toBe("compact");
    unmount();
    window.localStorage.setItem("laf:datagrid:t", JSON.stringify({ columnVisibility: { v: false } }));
    render(<DataGrid label="g" viewKey="t" rows={mk(2)} rowId={(r) => r.id} columns={cols} />);
    expect(screen.queryByRole("columnheader", { name: /Value/ })).toBeNull();
  });

  it("warns once in dev for single sort and string selected, not at import", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(warn).not.toHaveBeenCalled();
    const el = <DataGrid label="g" rows={mk(2)} rowId={(r) => r.id} columns={cols} sort={{ id: "n", dir: "asc" }} selected="r1" />;
    const a = render(el);
    expect(screen.getAllByRole("row", { selected: true })).toHaveLength(1);
    a.unmount();
    render(el);
    expect(warn).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  it("has no axe violations", async () => {
    const { container } = render(<DataGrid label="g" rows={mk(5)} rowId={(r) => r.id} columns={cols} selected={[]} onSelectedChange={() => {}} />);
    expect((await axe(container)).violations).toEqual([]);
  });

  it("virtualizes large datasets and keeps keyboard steps under 16 ms", async () => {
    render(<DataGrid label="big" rows={mk(50_000)} rowId={(r) => r.id} columns={cols} selected={[]} onSelectedChange={() => {}} />);
    expect(dataRows().length).toBeLessThan(60);
    const grid = screen.getByRole("grid");
    grid.focus();
    const user = userEvent.setup({ delay: null });
    await user.keyboard("{ArrowDown}");
    const steps = 30;
    const t: number[] = [];
    for (let i = 0; i < steps; i++) {
      const s = performance.now();
      await user.keyboard("{ArrowDown}");
      t.push(performance.now() - s);
    }
    t.sort((a, b) => a - b);
    const median = t[Math.floor(steps / 2)]!;
    expect(grid.getAttribute("aria-activedescendant")).toBeTruthy();
    expect(median).toBeLessThan(16);
  });
});

describe("TreeTable", () => {
  const nodes = [
    { id: "a", data: { n: "A", v: 2 }, children: [{ id: "a1", data: { n: "A1", v: 1 } }] },
    { id: "b", data: { n: "B", v: 1 } },
  ];
  const tc: GridColumn<{ n: string; v: number }>[] = [
    { id: "n", header: "Name", sortable: true, cell: (r) => r.n },
    { id: "v", header: "V", cell: (r) => r.v },
  ];
  it("expands with ArrowRight and exposes treegrid levels", async () => {
    render(<TreeTable label="t" nodes={nodes} columns={tc} />);
    expect(screen.getByRole("treegrid")).toBeInTheDocument();
    expect(dataRows()).toHaveLength(2);
    screen.getByRole("treegrid").focus();
    await userEvent.keyboard("{ArrowRight}");
    const rows = dataRows();
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveAttribute("aria-expanded", "true");
    expect(rows[1]).toHaveAttribute("aria-level", "2");
    await userEvent.keyboard("{ArrowLeft}");
    expect(dataRows()).toHaveLength(2);
  });
});
