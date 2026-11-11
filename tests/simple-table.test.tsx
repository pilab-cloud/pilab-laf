import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { SimpleTable, type SimpleTableColumn } from "../lib/components/simple-table";
import SimpleTableDemo from "../playground/pages/SimpleTable";

interface R {
  id: string;
  name: string;
  n: number;
}
const rows: R[] = [
  { id: "a", name: "Alpha", n: 1 },
  { id: "b", name: "Beta", n: 2 },
];
const columns: SimpleTableColumn<R>[] = [
  { id: "name", header: "Name", sortable: true },
  { id: "n", header: "Count", align: "end" },
];

describe("SimpleTable", () => {
  it("renders, wraps in a relative overflow-x-auto container and has no axe violations", async () => {
    const { container } = render(<SimpleTable caption="People" columns={columns} rows={rows} getRowId={(r) => r.id} selectable rowActions={() => <button>Edit</button>} />);
    expect(screen.getByRole("table", { name: "People" })).toBeTruthy();
    expect(container.querySelector(".relative.overflow-x-auto")).toBeTruthy();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("cycles sort with aria-sort", async () => {
    const onSortChange = vi.fn();
    const { rerender } = render(<SimpleTable columns={columns} rows={rows} getRowId={(r) => r.id} sort={null} onSortChange={onSortChange} />);
    const th = screen.getByRole("columnheader", { name: /Name/ });
    expect(th.getAttribute("aria-sort")).toBe("none");
    await userEvent.click(screen.getByRole("button", { name: "Sort by Name" }));
    expect(onSortChange).toHaveBeenLastCalledWith({ id: "name", direction: "asc" });
    rerender(<SimpleTable columns={columns} rows={rows} getRowId={(r) => r.id} sort={{ id: "name", direction: "asc" }} onSortChange={onSortChange} />);
    expect(th.getAttribute("aria-sort")).toBe("ascending");
    await userEvent.click(screen.getByRole("button", { name: "Sort by Name" }));
    expect(onSortChange).toHaveBeenLastCalledWith({ id: "name", direction: "desc" });
    rerender(<SimpleTable columns={columns} rows={rows} getRowId={(r) => r.id} sort={{ id: "name", direction: "desc" }} onSortChange={onSortChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Sort by Name" }));
    expect(onSortChange).toHaveBeenLastCalledWith(null);
  });

  it("selects rows and all rows", async () => {
    const onSelectedChange = vi.fn();
    render(<SimpleTable columns={columns} rows={rows} getRowId={(r) => r.id} getRowLabel={(r) => r.name} selectable onSelectedChange={onSelectedChange} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Select Alpha" }));
    expect(onSelectedChange).toHaveBeenLastCalledWith(["a"]);
    expect((screen.getByRole("checkbox", { name: "Select all rows" }) as HTMLInputElement).indeterminate).toBe(true);
    await userEvent.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    expect(onSelectedChange).toHaveBeenLastCalledWith(["a", "b"]);
  });

  it("shows empty and loading states", () => {
    const { rerender } = render(<SimpleTable columns={columns} rows={[]} getRowId={(r) => r.id} />);
    expect(screen.getByText("No rows to show")).toBeTruthy();
    rerender(<SimpleTable columns={columns} rows={[]} getRowId={(r) => r.id} loading loadingRows={3} />);
    expect(screen.getByRole("table").getAttribute("aria-busy")).toBe("true");
    expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(4);
  });

  it("pages through the demo", async () => {
    render(<SimpleTableDemo />);
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(screen.getByRole("button", { name: "2" }).getAttribute("aria-current")).toBe("page");
  });
});
