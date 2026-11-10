import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  TopologyGraph,
  highlight,
  Breadcrumb,
  DatePicker,
  Combobox,
  DataGrid,
  DeviceSteps,
  OtpInput,
  PasswordField,
  Progress,
  ToastProvider,
  TreeView,
  useToast,
  type TreeNode,
} from "../lib";

describe("a11y smoke", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <PasswordField aria-label="Password" />
        <OtpInput />
        <Progress label="Upload" value={30} />
        <DeviceSteps current={1} steps={["a", "b", "c"]} />
      </div>,
    );
    const results = await axe(container);
    expect(results.violations).toEqual([]);
  });
});

describe("OtpInput", () => {
  it("keeps digits only and reports completion", async () => {
    const done = vi.fn();
    render(<OtpInput onComplete={done} />);
    await userEvent.type(screen.getByLabelText("One-time code"), "12ab3456");
    expect(done).toHaveBeenCalledWith("123456");
  });
});

describe("PasswordField", () => {
  it("toggles visibility", async () => {
    render(<PasswordField aria-label="Password" />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(input).toHaveAttribute("type", "text");
  });
});

describe("Toast", () => {
  it("shows an error toast with alert role", async () => {
    function Btn() {
      const { toast } = useToast();
      return <button onClick={() => toast({ tone: "error", title: "Boom" })}>go</button>;
    }
    render(
      <ToastProvider>
        <Btn />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByText("go"));
    expect(screen.getByRole("alert")).toHaveTextContent("Boom");
  });
});

describe("TreeView", () => {
  const nodes: TreeNode[] = [{ id: "a", label: "A", children: [{ id: "b", label: "B" }] }];
  it("expands with ArrowRight and exposes aria state", async () => {
    function T() {
      const [exp, setExp] = React.useState<string[]>([]);
      return <TreeView label="Inv" nodes={nodes} expanded={exp} onExpandedChange={setExp} />;
    }
    render(<T />);
    const a = screen.getByRole("treeitem", { name: "A" });
    expect(a).toHaveAttribute("aria-expanded", "false");
    a.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("treeitem", { name: "B" })).toHaveAttribute("aria-level", "2");
  });
});

describe("DataGrid", () => {
  it("cycles sort and selects all rows", async () => {
    const onSort = vi.fn();
    const onSel = vi.fn();
    render(
      <DataGrid
        rows={[{ id: "1", n: "x" }, { id: "2", n: "y" }]}
        rowId={(r) => r.id}
        onSortChange={onSort}
        onSelectedChange={onSel}
        selected={[]}
        columns={[{ id: "n", header: "Name", sortable: true, cell: (r) => r.n }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Name" }));
    expect(onSort).toHaveBeenCalledWith({ id: "n", dir: "asc" });
    await userEvent.click(screen.getByLabelText("Select all rows"));
    expect(onSel).toHaveBeenCalledWith(["1", "2"]);
  });
});

describe("Combobox", () => {
  it("filters and picks with the keyboard", async () => {
    const onChange = vi.fn();
    render(
      <Combobox
        label="Cat"
        options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]}
        value={[]}
        onChange={onChange}
      />,
    );
    await userEvent.type(screen.getByRole("combobox"), "be");
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith([{ value: "b", label: "Beta" }]);
  });
});

import { Banner, ConfirmDialog, KeyValueEditor, LogViewer, MfaEnrolment, TagInput, VirtualList } from "../lib";

describe("VirtualList", () => {
  it("renders only a window of rows", () => {
    render(<VirtualList label="L" items={Array.from({ length: 10000 }, (_, i) => i)} rowHeight={20} height={200} renderRow={(i) => <span>row {i}</span>} />);
    expect(screen.getAllByRole("listitem").length).toBeLessThan(40);
  });
  it("LogViewer virtualizes long logs", () => {
    const lines = Array.from({ length: 2000 }, (_, i) => ({ time: "t", level: "info" as const, text: `line ${i}` }));
    render(<LogViewer label="log" lines={lines} />);
    expect(screen.getAllByRole("listitem").length).toBeLessThan(60);
  });
});

describe("ConfirmDialog", () => {
  it("requires typed confirmation", async () => {
    const ok = vi.fn();
    render(<ConfirmDialog open onOpenChange={() => {}} title="Delete" description="Sure?" confirmText="delete" confirmLabel="Delete it" onConfirm={ok} />);
    const btn = screen.getByRole("button", { name: "Delete it" });
    expect(btn).toBeDisabled();
    await userEvent.type(screen.getByRole("textbox"), "delete");
    expect(btn).toBeEnabled();
  });
});

describe("TagInput / KeyValueEditor", () => {
  it("rejects invalid and duplicate tags", async () => {
    function T() {
      const [v, setV] = React.useState<string[]>([]);
      return <TagInput label="URIs" value={v} onChange={setV} validate={(t) => (t.startsWith("https") ? undefined : "bad")} />;
    }
    render(<T />);
    await userEvent.type(screen.getByLabelText("URIs"), "http://x{Enter}");
    expect(screen.getByRole("alert")).toHaveTextContent("bad");
  });
  it("flags duplicate keys", () => {
    render(<KeyValueEditor value={[{ key: "a", value: "1" }, { key: "a", value: "2" }]} onChange={() => {}} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Duplicate key");
  });
});

describe("Banner", () => {
  it("uses alert role for danger", () => {
    render(<Banner tone="danger">down</Banner>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});

describe("MfaEnrolment", () => {
  it("blocks on invalid code then reaches recovery codes", async () => {
    const verify = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    const done = vi.fn();
    render(<MfaEnrolment qr={<i>qr</i>} secret="SECRET" recoveryCodes={["AAAA-1111"]} onVerify={verify} onComplete={done} />);
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    await userEvent.type(screen.getByLabelText("One-time code"), "123456");
    await userEvent.click(screen.getByRole("button", { name: "Verify" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("not valid");
    await userEvent.click(screen.getByRole("button", { name: "Verify" }));
    expect(await screen.findByText("AAAA-1111")).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("I stored these codes"));
    await userEvent.click(screen.getByRole("button", { name: "Finish" }));
    expect(done).toHaveBeenCalled();
  });
});

describe("calendar & charts", () => {
  it("DatePicker selects a day", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DatePicker value="2026-03-10" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: "Choose date" }));
    await user.click(screen.getByRole("gridcell", { name: "2026-03-15" }));
    expect(onChange).toHaveBeenCalledWith("2026-03-15");
  });

  it("Breadcrumb collapses and expands middle levels", async () => {
    const user = userEvent.setup();
    const items = ["A", "B", "C", "D", "E"].map((label) => ({ label, href: "#" }));
    render(<Breadcrumb items={items} maxItems={3} />);
    expect(screen.queryByText("B")).toBeNull();
    await user.click(screen.getByRole("button", { name: /hidden levels/ }));
    expect(screen.getByText("B")).toBeTruthy();
  });
});

describe("studio", () => {
  it("highlight tokenizes JSON keys and strings", () => {
    const t = highlight('{"a": "b", "n": 1}', "json");
    expect(t.filter((x) => x.cls === "text-primary").map((x) => x.text)).toEqual(['"a"', '"n"']);
    expect(t.some((x) => x.cls === "text-ok" && x.text === '"b"')).toBe(true);
  });

  it("TopologyGraph nodes are keyboard-selectable", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<TopologyGraph label="t" onSelect={onSelect} nodes={[{ id: "a", label: "esx", x: 50, y: 50 }]} edges={[]} />);
    screen.getByRole("button", { name: "esx" }).focus();
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith("a");
  });
});
