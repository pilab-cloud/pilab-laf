import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import VsLayoutDemo, { FakeEventSource } from "../playground/pages/VsLayout";
import { AlarmList, CapacityBar, InventoryLayout, ObjectPage, SplitPane, TaskPanel, type TaskItem } from "../lib";

afterEach(() => window.localStorage.clear());

describe("SplitPane v2", () => {
  it("resizes by keyboard on both orientations and clamps", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<SplitPane start="a" end="b" defaultSize={200} min={100} max={220} />);
    const sep = screen.getByRole("separator");
    sep.focus();
    await user.keyboard("{ArrowRight}");
    expect(sep).toHaveAttribute("aria-valuenow", "210");
    await user.keyboard("{Shift>}{ArrowRight}{/Shift}");
    expect(sep).toHaveAttribute("aria-valuenow", "220");
    await user.keyboard("{Home}");
    expect(sep).toHaveAttribute("aria-valuenow", "100");
    rerender(<SplitPane start="a" end="b" orientation="vertical" primary="end" min={50} defaultSize={100} />);
    const v = screen.getByRole("separator");
    expect(v).toHaveAttribute("aria-orientation", "horizontal");
    v.focus();
    await user.keyboard("{ArrowUp}");
    expect(v).toHaveAttribute("aria-valuenow", "110");
  });
  it("collapses, reopens and persists", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<SplitPane start="left" end="right" collapsible persistKey="k" defaultSize={250} />);
    await user.click(screen.getByRole("button", { name: "Collapse pane" }));
    expect(screen.getByRole("separator")).toHaveAttribute("data-collapsed", "true");
    unmount();
    render(<SplitPane start="left" end="right" collapsible persistKey="k" />);
    expect(screen.getByRole("separator")).toHaveAttribute("data-collapsed", "true");
    await user.click(screen.getByRole("button", { name: "Expand pane" }));
    expect(screen.getByRole("separator")).toHaveAttribute("data-collapsed", "false");
  });
});

describe("CapacityBar", () => {
  it("exposes a text alternative", async () => {
    const { container } = render(<CapacityBar label="Memory" unit="bytes" used={2 ** 30} reserved={2 ** 30} total={4 * 2 ** 30} />);
    expect(screen.getByRole("img")).toHaveAccessibleName(/Memory: 1 GiB used · 1 GiB reserved · 2 GiB free/);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("TaskPanel", () => {
  const tasks: TaskItem[] = [
    { id: "1", name: "Power on", initiator: "root", status: "running", progress: 40, target: "vm1" },
    { id: "2", name: "Clone", initiator: "anna", status: "failed", error: "Boom", detail: "More info" },
  ];
  it("filters, expands, opens target and cancels", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    const onOpenTarget = vi.fn();
    render(<TaskPanel tasks={tasks} filterable currentUser="root" onCancel={onCancel} onOpenTarget={onOpenTarget} />);
    await user.click(screen.getByRole("button", { name: "vm1" }));
    expect(onOpenTarget).toHaveBeenCalledWith(tasks[0]);
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalledWith("1");
    await user.click(screen.getByRole("button", { name: "Details" }));
    expect(screen.getByText("More info")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Mine" }));
    expect(screen.queryByText("Clone")).toBeNull();
    await user.click(screen.getByRole("button", { name: "All" }));
    await user.selectOptions(screen.getByRole("combobox", { name: "Status" }), "failed");
    expect(screen.queryByText("Power on")).toBeNull();
  });
});

describe("AlarmList", () => {
  it("bulk acknowledges selected alarms", async () => {
    const user = userEvent.setup();
    const onAck = vi.fn();
    render(
      <AlarmList
        selectable
        onAcknowledge={onAck}
        alarms={[
          { id: "a", severity: "critical", name: "A", entity: "e1", triggered: "now" },
          { id: "b", severity: "info", name: "B", entity: "e2", triggered: "now" },
        ]}
      />,
    );
    await user.click(screen.getByRole("checkbox", { name: "Select all alarms" }));
    await user.click(screen.getByRole("button", { name: "Acknowledge selected" }));
    expect(onAck.mock.calls.map((c) => c[0])).toEqual(["a", "b"]);
  });
});

describe("ObjectPage + InventoryLayout", () => {
  it("switches tabs and renders the docked panel", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <InventoryLayout tree={<ul><li>node</li></ul>} bottom={<p>docked</p>}>
        <ObjectPage kind="host" state="on" name="esx01" monitor={<p>mon</p>} facts={[{ label: "V", value: "8" }]} />
      </InventoryLayout>,
    );
    expect(screen.getByText("docked")).toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Monitor" }));
    expect(screen.getByText("mon")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("FakeEventSource", () => {
  it("emits to listeners until closed", () => {
    vi.useFakeTimers();
    const es = new FakeEventSource(100, () => ({ type: "x", data: 1 }));
    const fn = vi.fn();
    es.addEventListener("x", fn);
    act(() => void vi.advanceTimersByTime(250));
    expect(fn).toHaveBeenCalledTimes(2);
    es.close();
    act(() => void vi.advanceTimersByTime(250));
    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
  it("demo renders", () => {
    render(<VsLayoutDemo />);
    expect(screen.getByText("Power on VM")).toBeInTheDocument();
  });
});
