import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import {
  ConsoleFrame,
  DatastoreBrowser,
  EventConsole,
  HardwareEditor,
  LogViewer,
  PermissionAssignDialog,
  SnapshotTree,
  type DatastoreEntry,
  type HwDevice,
} from "../lib";
import { TopologyGraphFlow } from "../lib/components/topology";

describe("LogViewer", () => {
  const lines = Array.from({ length: 3000 }, (_, i) => ({ time: "t", level: (i % 100 === 0 ? "error" : "info") as "error" | "info", text: `line ${i}` }));
  it("virtualizes, filters by level and counts regex matches", async () => {
    render(<LogViewer label="log" lines={lines} />);
    expect(screen.getAllByRole("listitem").length).toBeLessThan(60);
    await userEvent.type(screen.getByRole("searchbox"), "line 1\\d$");
    expect(screen.getByText("1 / 10", { exact: false })).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "Level" }), { target: { value: "error" } });
    await waitFor(() => expect(screen.getAllByRole("listitem").length).toBeLessThanOrEqual(30));
  });
  it("tolerates invalid regex and pauses follow on demand", async () => {
    render(<LogViewer label="log" lines={lines.slice(0, 5)} />);
    await userEvent.type(screen.getByRole("searchbox"), "(");
    expect(screen.getByRole("searchbox")).toHaveAttribute("aria-invalid", "true");
    const btn = screen.getByRole("button", { name: "Pause" });
    await userEvent.click(btn);
    expect(screen.getByRole("button", { name: "Follow" })).toBeInTheDocument();
  });
  it("highlights matches", async () => {
    render(<LogViewer label="log" lines={lines.slice(0, 5)} />);
    await userEvent.type(screen.getByRole("searchbox"), "ine 2");
    expect(document.querySelector("mark")?.textContent).toBe("ine 2");
  });
});

describe("ConsoleFrame", () => {
  it("sends ctrl-alt-del only when connected and offers reconnect", async () => {
    const send = vi.fn();
    const re = vi.fn();
    const { rerender } = render(<ConsoleFrame status="connected" onSendKeys={send} onReconnect={re} keyboardGrabbed><canvas /></ConsoleFrame>);
    await userEvent.click(screen.getByRole("button", { name: "Send Ctrl+Alt+Del" }));
    expect(send).toHaveBeenCalledWith("ctrl-alt-del");
    expect(screen.getByText("Press Ctrl+Alt to release")).toBeInTheDocument();
    rerender(<ConsoleFrame status="disconnected" onSendKeys={send} onReconnect={re} />);
    expect(screen.getByRole("button", { name: "Send Ctrl+Alt+Del" })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "Reconnect" }));
    expect(re).toHaveBeenCalled();
  });
});

const devices: HwDevice[] = [
  { id: "cpu", kind: "cpu", count: 2, coresPerSocket: 1, reservationMhz: 0 },
  { id: "mem", kind: "memory", sizeMb: 4096, reservationMb: 0 },
  { id: "d1", kind: "disk", name: "Hard disk 1", sizeGb: 40, provisioning: "thin", controller: "SCSI 0" },
  { id: "n1", kind: "nic", name: "NIC 1", network: "VM Network", adapter: "vmxnet3", connected: true },
];

describe("HardwareEditor", () => {
  const cap = { networks: ["VM Network", "DMZ"], controllers: ["SCSI 0"], adapters: ["vmxnet3"], hotAdd: { nic: true } };
  it("validates, shows the pending diff and saves", async () => {
    const save = vi.fn();
    render(<HardwareEditor defaultDevices={devices} capabilities={cap} onSave={save} />);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    const cpu = screen.getByLabelText("CPU count");
    fireEvent.change(cpu, { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Cores per socket"), { target: { value: "2" } });
    expect(screen.getByText("Must divide the CPU count")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    fireEvent.change(screen.getByLabelText("Cores per socket"), { target: { value: "3" } });
    expect(screen.getByText(/CPU — coresPerSocket: 1 → 3/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(save).toHaveBeenCalled();
  });
  it("adds and removes devices; refuses shrinking disks", async () => {
    render(<HardwareEditor defaultDevices={devices} capabilities={cap} />);
    await userEvent.click(screen.getByRole("button", { name: "Add device" }));
    await userEvent.click(await screen.findByRole("menuitem", { name: "Network adapter" }));
    expect(screen.getByText(/Added: Network adapter 2/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove Network adapter 2" }));
    expect(screen.queryByText(/Added:/)).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Size (GB)"), { target: { value: "10" } });
    expect(screen.getByText("A disk cannot be shrunk")).toBeInTheDocument();
  });
  it("locks CPU edits without hot-add when powered on", () => {
    render(<HardwareEditor defaultDevices={devices} capabilities={{ ...cap, poweredOn: true }} />);
    expect(screen.getByLabelText("CPU count")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Remove Hard disk 1" })).toBeDisabled();
  });
});

const entries: DatastoreEntry[] = [
  { path: "/iso", type: "folder" },
  { path: "/iso/win.iso", type: "file", size: 2 ** 30, modified: "2026-01-01" },
  { path: "/iso/notes.txt", type: "file", size: 10 },
  { path: "/vm", type: "folder" },
];

describe("DatastoreBrowser", () => {
  it("navigates folders and breadcrumb", async () => {
    render(<DatastoreBrowser entries={entries} />);
    const grid = screen.getByRole("grid", { name: "Files" });
    fireEvent.keyDown(within(grid).getByText("iso").closest("tr")!, { key: "Enter" });
    expect(within(grid).getByText("win.iso")).toBeInTheDocument();
    await userEvent.click(within(screen.getByRole("navigation", { name: "Path" })).getByRole("button", { name: "Datastore" }));
    expect(within(grid).queryByText("win.iso")).not.toBeInTheDocument();
  });
  it("picker mode respects accept and returns the chosen file", async () => {
    const pick = vi.fn();
    render(<DatastoreBrowser entries={entries} defaultPath="/iso" select="file" accept={[".iso"]} onSelect={pick} />);
    const txt = screen.getByText("notes.txt").closest("tr")!;
    expect(txt).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Select" })).toBeDisabled();
    await userEvent.click(screen.getByText("win.iso"));
    await userEvent.click(screen.getByRole("button", { name: "Select" }));
    expect(pick).toHaveBeenCalledWith(expect.objectContaining({ path: "/iso/win.iso" }));
  });
  it("confirms before delete", async () => {
    const del = vi.fn();
    render(<DatastoreBrowser entries={entries} defaultPath="/iso" onDelete={del} />);
    await userEvent.click(screen.getByRole("button", { name: "Delete: win.iso" }));
    expect(del).not.toHaveBeenCalled();
    await userEvent.click(within(await screen.findByRole("alertdialog")).getByRole("button", { name: "Delete" }));
    expect(del).toHaveBeenCalledWith(expect.objectContaining({ path: "/iso/win.iso" }));
  });
});

describe("PermissionAssignDialog", () => {
  it("assigns principal, role and propagate flag", async () => {
    const assign = vi.fn();
    render(
      <PermissionAssignDialog
        open
        onOpenChange={() => {}}
        objectPath="/dc/cluster/vm-1"
        principals={[{ value: "alice", label: "alice", group: "Users" }, { value: "ops", label: "ops", group: "Groups" }]}
        roles={[{ id: "ro", name: "Read-only", description: "View only" }, { id: "admin", name: "Admin" }]}
        onAssign={assign}
      />,
    );
    expect(screen.getByDisplayValue("/dc/cluster/vm-1")).toHaveAttribute("readonly");
    expect(screen.getByText("View only")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Assign" })).toBeDisabled();
    await userEvent.click(screen.getByRole("combobox", { name: "User or group" }));
    await userEvent.click(await screen.findByText("ops"));
    await userEvent.selectOptions(screen.getByLabelText("Role"), "admin");
    await userEvent.click(screen.getByRole("switch", { name: "Propagate to children" }));
    await userEvent.click(screen.getByRole("button", { name: "Assign" }));
    await waitFor(() => expect(assign).toHaveBeenCalledWith(expect.objectContaining({ roleId: "admin", propagate: false, principal: expect.objectContaining({ value: "ops" }) })));
  });
});

describe("SnapshotTree", () => {
  const snaps = [{ id: "s1", name: "Base", createdAt: "2026-01-01", children: [{ id: "s2", name: "Patched", createdAt: "2026-02-01" }] }];
  it("marks the current node and confirms revert", async () => {
    const revert = vi.fn();
    render(<SnapshotTree snapshots={snaps} currentId="s2" onRevert={revert} needsConsolidation onConsolidate={() => {}} />);
    expect(screen.getByText("You are here")).toBeInTheDocument();
    expect(screen.getByText("Disk consolidation is needed")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("treeitem", { name: /Base/ }));
    await userEvent.click(screen.getByRole("button", { name: "Revert to" }));
    await userEvent.click(within(await screen.findByRole("alertdialog")).getByRole("button", { name: "Revert to" }));
    expect(revert).toHaveBeenCalledWith("s1");
  });
});

describe("EventConsole", () => {
  it("filters by severity and opens details", async () => {
    const events = [
      { id: "1", time: Date.now() - 5000, severity: "error" as const, message: "Disk failed", details: "trace-xyz" },
      { id: "2", time: Date.now() - 9000, severity: "info" as const, message: "Powered on" },
    ];
    render(<EventConsole events={events} />);
    fireEvent.change(screen.getByLabelText("Severity", { selector: "select" }), { target: { value: "error" } });
    expect(screen.queryByText("Powered on")).not.toBeInTheDocument();
    await userEvent.click(screen.getByText("Disk failed"));
    expect(await screen.findByText("trace-xyz")).toBeInTheDocument();
  });
});

describe("TopologyGraphFlow", () => {
  it("offers a list alternative", async () => {
    globalThis.ResizeObserver ??= class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as never;
    const sel = vi.fn();
    render(<TopologyGraphFlow nodes={[{ id: "a", label: "host-a" }, { id: "b", label: "vm-b" }]} edges={[{ from: "a", to: "b" }]} onSelect={sel} />);
    await userEvent.click(screen.getByRole("button", { name: "List view" }));
    await userEvent.click(screen.getByRole("button", { name: "vm-b" }));
    expect(sel).toHaveBeenCalledWith("b");
  });
});

describe("a11y", () => {
  it("HardwareEditor is axe clean", async () => {
    const { container } = render(<HardwareEditor defaultDevices={devices} capabilities={{ networks: ["VM Network"] }} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
