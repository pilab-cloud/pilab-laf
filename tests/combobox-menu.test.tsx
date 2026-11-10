import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox, ContextMenuFor, Menu, UserSelector, type ComboboxOption, type MenuItemSpec } from "../lib";

Element.prototype.scrollIntoView ??= () => {};

const OPTS: ComboboxOption[] = [
  { value: "a", label: "Alpha", group: "Greek" },
  { value: "b", label: "Beta", group: "Greek" },
  { value: "c", label: "Charlie", group: "NATO" },
];

describe("Combobox v2", () => {
  it("portals the listbox and navigates with the keyboard", async () => {
    const onChange = vi.fn();
    const { container } = render(<Combobox label="c" options={OPTS} value={[]} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    const list = await screen.findByRole("listbox");
    expect(container.contains(list)).toBe(false);
    expect(screen.getByText("NATO")).toBeTruthy();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith([OPTS[1]]);
  });

  it("supports multi-select toggling and chip removal", async () => {
    const onChange = vi.fn();
    render(<Combobox label="c" multiple options={OPTS} value={[OPTS[0]!]} onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(await screen.findByRole("option", { name: /Charlie/ }));
    expect(onChange).toHaveBeenLastCalledWith([OPTS[0], OPTS[2]]);
    await userEvent.click(screen.getByRole("button", { name: /Alpha/ }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it("loads async options", async () => {
    const load = vi.fn(async (q: string) => OPTS.filter((o) => o.label.toLowerCase().includes(q)));
    render(<Combobox label="c" options={load} value={[]} onChange={() => {}} loadingText="Loading" />);
    await userEvent.type(screen.getByRole("combobox"), "ch");
    expect(await screen.findByRole("option", { name: /Charlie/ })).toBeTruthy();
    expect(screen.queryByRole("option", { name: /Alpha/ })).toBeNull();
    expect(load).toHaveBeenLastCalledWith("ch");
  });

  it("offers create and clear", async () => {
    const onCreate = vi.fn();
    const onChange = vi.fn();
    render(<Combobox label="c" options={OPTS} value={[OPTS[0]!]} onChange={onChange} onCreate={onCreate} clearable />);
    await userEvent.type(screen.getByRole("combobox"), "zed");
    await userEvent.click(await screen.findByRole("option", { name: "Create “zed”" }));
    expect(onCreate).toHaveBeenCalledWith("zed");
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("UserSelector wraps it", async () => {
    const onChange = vi.fn();
    render(<UserSelector value={[]} onChange={onChange} onSearch={() => [{ id: "u1", name: "Anna", email: "a@x.io" }]} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(await screen.findByRole("option", { name: /Anna/ }));
    expect(onChange).toHaveBeenCalledWith([{ id: "u1", name: "Anna", email: "a@x.io" }]);
  });
});

function specs(h: { sel: () => void; check: (v: boolean) => void; radio: (v: string) => void }): MenuItemSpec[] {
  return [
    { id: "open", label: "Open", shortcut: "⌘O", onSelect: h.sel },
    { id: "del", label: "Delete", danger: true, disabled: "No permission", onSelect: () => {} },
    { type: "separator" },
    { type: "checkbox", id: "pin", label: "Pinned", checked: false, onCheckedChange: h.check },
    { type: "radio", id: "r", value: "a", onValueChange: h.radio, options: [{ value: "a", label: "Asc" }, { value: "d", label: "Desc" }] },
    { type: "submenu", id: "more", label: "More", items: [{ id: "x", label: "Extra", onSelect: h.sel }] },
  ];
}

describe("Menu model", () => {
  it("renders items, shortcuts, checkbox, radio, submenu from specs", async () => {
    const h = { sel: vi.fn(), check: vi.fn(), radio: vi.fn() };
    render(<Menu items={specs(h)} trigger={<button>Actions</button>} />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(screen.getByText("⌘O").tagName).toBe("KBD");
    expect(screen.getByRole("menuitem", { name: "Delete" }).getAttribute("aria-disabled")).toBe("true");
    await userEvent.click(screen.getByRole("menuitemcheckbox", { name: "Pinned" }));
    expect(h.check).toHaveBeenCalledWith(true);
  });

  it("radio and submenu items fire callbacks", async () => {
    const h = { sel: vi.fn(), check: vi.fn(), radio: vi.fn() };
    render(<Menu items={specs(h)} trigger={<button>Actions</button>} />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.click(screen.getByRole("menuitemradio", { name: "Desc" }));
    expect(h.radio).toHaveBeenCalledWith("d");
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowRight}");
    const sub = await screen.findByRole("menuitem", { name: "Extra" });
    await userEvent.click(sub);
    expect(h.sel).toHaveBeenCalled();
  });

  it("ContextMenuFor opens on right-click", async () => {
    const h = { sel: vi.fn(), check: vi.fn(), radio: vi.fn() };
    render(
      <ContextMenuFor items={specs(h)}>
        <div>Row</div>
      </ContextMenuFor>,
    );
    await userEvent.pointer({ keys: "[MouseRight]", target: screen.getByText("Row") });
    await waitFor(() => expect(screen.getByRole("menuitem", { name: /Open/ })).toBeTruthy());
    await userEvent.click(screen.getByRole("menuitem", { name: /Open/ }));
    expect(h.sel).toHaveBeenCalled();
  });
});
