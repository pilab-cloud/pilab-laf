import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { ActivityTimeline, Chip, HoverCard, InlineEdit, IssueRow, LabelPicker, OptionPicker, ProgressSummary, PropertiesPane, Reactions } from "../lib";

Element.prototype.scrollIntoView ??= () => {};
globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} } as never;

describe("tracker parts", () => {
  it("Chip colours through label slot tokens", () => {
    render(<Chip color={3}>x</Chip>);
    expect(screen.getByText("x").getAttribute("style")).toContain("--label-3-bg");
  });

  it("ActivityTimeline collapses event runs and toggles", async () => {
    const events = [1, 2, 3, 4].map((i) => ({ type: "event" as const, id: `e${i}`, at: 0, summary: `ev${i}` }));
    render(<ActivityTimeline items={events} composer={<textarea aria-label="c" />} />);
    expect(screen.queryByText("ev1")).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "4 more updates" }));
    expect(screen.getByText("ev1")).toBeTruthy();
    expect(screen.getByLabelText("c")).toBeTruthy();
  });

  it("Reactions toggles with aria-pressed", async () => {
    const onToggle = vi.fn();
    render(<Reactions reactions={[{ emoji: "👍", users: ["A"], reacted: true }]} onToggle={onToggle} />);
    const b = screen.getByRole("button", { name: "👍 1" });
    expect(b.getAttribute("aria-pressed")).toBe("true");
    await userEvent.click(b);
    await userEvent.click(screen.getByRole("button", { name: "Add reaction" }));
    await userEvent.click(await screen.findByRole("button", { name: "🎉" }));
    expect(onToggle).toHaveBeenLastCalledWith("🎉");
  });

  it("OptionPicker selects, searches and opens via shortcut", async () => {
    const onChange = vi.fn();
    const options = [{ value: "open", label: "Open" }, { value: "done", label: "Done" }];
    render(<OptionPicker label="Status" options={options} value={["open"]} onChange={onChange} shortcut="s" />);
    await userEvent.keyboard("s");
    await userEvent.keyboard("Don");
    await userEvent.click(await screen.findByRole("option", { name: /Done/ }));
    expect(onChange).toHaveBeenCalledWith(["done"]);
  });

  it("LabelPicker creates with the chosen slot", async () => {
    const onCreate = vi.fn();
    render(<LabelPicker labels={[{ id: "a", name: "bug", slot: 1 }]} value={[]} onChange={() => {}} onCreate={onCreate} />);
    await userEvent.click(screen.getByRole("radio", { name: "Colour 5" }));
    await userEvent.type(screen.getByRole("combobox"), "new");
    await userEvent.click(await screen.findByText("Create label “new”"));
    expect(onCreate).toHaveBeenCalledWith({ name: "new", slot: 5 });
  });

  it("IssueRow marks overdue dates", () => {
    render(<IssueRow issue={{ id: "1", key: "P-1", title: "T", due: "2020-01-01" }} now={new Date("2021-01-01")} />);
    expect(screen.getByText(/Overdue/)).toBeTruthy();
  });

  it("InlineEdit number and select variants save", async () => {
    const onSave = vi.fn();
    const { unmount } = render(<InlineEdit as="number" label="Pts" value="1" onSave={onSave} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.clear(screen.getByLabelText("Pts"));
    await userEvent.type(screen.getByLabelText("Pts"), "5{Enter}");
    expect(onSave).toHaveBeenCalledWith("5");
    unmount();
    const save2 = vi.fn();
    render(<InlineEdit as="select" label="Sz" value="a" options={[{ value: "a", label: "Small" }, { value: "b", label: "Big" }]} onSave={save2} />);
    await userEvent.click(screen.getByRole("button", { name: /Small/ }));
    await userEvent.selectOptions(screen.getByLabelText("Sz"), "b");
    await waitFor(() => expect(save2).toHaveBeenCalledTimes(1));
    expect(save2).toHaveBeenCalledWith("b");
  });

  it("PropertiesPane read-only hides editors and shows errors", () => {
    const groups = [{ id: "g", fields: [{ id: "s", label: "Status", value: "Open", editor: <button>edit</button>, error: "bad" }] }];
    const { rerender } = render(<PropertiesPane groups={groups} />);
    expect(screen.getByText("edit")).toBeTruthy();
    expect(screen.getByRole("alert").textContent).toBe("bad");
    rerender(<PropertiesPane groups={groups} readOnly />);
    expect(screen.queryByText("edit")).toBeNull();
  });

  it("HoverCard opens on focus", async () => {
    render(<HoverCard trigger={<a href="#x">anna</a>}>Preview</HoverCard>);
    await userEvent.tab();
    expect(await screen.findByText("Preview")).toBeTruthy();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <ProgressSummary title="Sprint" todo={1} doing={1} done={2} />
        <IssueRow issue={{ id: "1", key: "P-1", title: "T", href: "#", labels: [{ name: "bug", slot: 1 }], comments: 2 }} onSelectedChange={() => {}} />
        <Reactions reactions={[{ emoji: "👍", users: ["A"] }]} onToggle={() => {}} />
        <OptionPicker label="Status" compact options={[{ value: "a", label: "A" }]} value={["a"]} onChange={() => {}} />
        <ActivityTimeline items={[{ type: "comment", id: "c", author: { name: "Anna" }, at: 0, body: "hi" }]} />
      </div>,
    );
    expect((await axe(container)).violations).toEqual([]);
  });
});
