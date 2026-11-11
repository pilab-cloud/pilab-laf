import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { LafProvider } from "../lib";
import { DeviceList, SettingRow, SettingsDialog } from "../lib/components/settings";
import SettingsDialogs from "../playground/pages/SettingsDialogs";

describe("SettingRow", () => {
  it("shows overridden badge and resets", async () => {
    const onReset = vi.fn();
    render(
      <SettingRow label="MTU" help="Bytes" overridden onReset={onReset}>
        <input aria-label="mtu" />
      </SettingRow>,
    );
    expect(screen.getByText("Overridden")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Reset MTU to default" }));
    expect(onReset).toHaveBeenCalled();
    expect(screen.getByRole("group", { name: "MTU" }).getAttribute("aria-describedby")).toBeTruthy();
  });
});

function Harness({ onApply = vi.fn(), errors = 0 }: { onApply?: () => Promise<void> | void; errors?: number }) {
  const [open, setOpen] = React.useState(true);
  const [dirty, setDirty] = React.useState(false);
  return (
    <SettingsDialog
      title="Settings"
      open={open}
      onOpenChange={setOpen}
      dirty={dirty}
      onApply={async () => {
        await onApply();
        setDirty(false);
      }}
      onReset={() => setDirty(false)}
      sections={[
        { id: "a", title: "Alpha", children: <button onClick={() => setDirty(true)}>edit</button> },
        { id: "b", title: "Beta", errorCount: errors, children: <p>beta body</p> },
      ]}
    />
  );
}

describe("SettingsDialog", () => {
  it("navigates sections and tracks dirty state", async () => {
    const onApply = vi.fn();
    render(<Harness onApply={onApply} />);
    expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "Beta" }));
    expect(screen.getByText("beta body")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Alpha" }));
    await userEvent.click(screen.getByRole("button", { name: "edit" }));
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    await waitFor(() => expect(onApply).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled());
  });

  it("badges sections with errors and blocks apply", async () => {
    const onApply = vi.fn();
    render(<Harness onApply={onApply} errors={2} />);
    expect(screen.getByText("2 errors")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "edit" }));
    await userEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(onApply).not.toHaveBeenCalled();
    expect(screen.getByText("beta body")).toBeTruthy();
  });

  it("guards Cancel when dirty", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "edit" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(await screen.findByText("Discard unsaved changes?")).toBeTruthy();
  });

  it("OK applies then closes", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "edit" }));
    await userEvent.click(screen.getByRole("button", { name: "OK" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});

interface Dev {
  id: string;
  n: string;
}
function Devices({ initial = [{ id: "a", n: "A" }, { id: "b", n: "B" }, { id: "c", n: "C" }] }: { initial?: Dev[] }) {
  const [v, setV] = React.useState<Dev[]>(initial);
  return (
    <DeviceList
      label="Devs"
      value={v}
      onChange={setV}
      getId={(d) => d.id}
      columns={[{ id: "n", header: "Name", cell: (d) => d.n }]}
      status={() => ({ tone: "ok", label: "Up" })}
      onAdd={() => ({ id: "z", n: "Z" })}
      renderEditor={(d, change) => <input aria-label="edit name" value={d.n} onChange={(e) => change({ ...d, n: e.target.value })} />}
    />
  );
}

describe("DeviceList", () => {
  const names = () => within(screen.getByRole("table")).getAllByRole("row").slice(1).map((r) => r.querySelectorAll("td")[2]?.textContent);

  it("reorders, adds, removes and bulk-removes", async () => {
    render(<Devices />);
    await userEvent.click(screen.getByRole("button", { name: "Move c up" }));
    expect(names()).toEqual(["A", "C", "B"]);
    await userEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByLabelText("edit name")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Remove a" }));
    expect(names().filter(Boolean)).toHaveLength(3);
    await userEvent.click(screen.getByLabelText("Select all"));
    await userEvent.click(screen.getByRole("button", { name: "Remove selected (3)" }));
    expect(screen.getByText("No devices")).toBeTruthy();
  });

  it("edits inline", async () => {
    render(<Devices />);
    await userEvent.click(screen.getByRole("button", { name: "Edit a" }));
    await userEvent.type(screen.getByLabelText("edit name"), "x");
    expect(screen.getByText("Ax")).toBeTruthy();
  });
});

describe("SettingsDialogs demo", () => {
  it("opens the dialog, has no axe violations and Hungarian-free English defaults", async () => {
    const { container } = render(
      <LafProvider>
        <SettingsDialogs />
      </LafProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
    await userEvent.click(screen.getByRole("button", { name: "Edit vSwitch settings…" }));
    const dlg = await screen.findByRole("dialog");
    await userEvent.click(within(dlg).getByRole("button", { name: "Teaming & failover" }));
    expect(within(dlg).getByRole("table", { name: "Uplinks" })).toBeTruthy();
    expect(await axe(dlg)).toHaveNoViolations();
  });
});
