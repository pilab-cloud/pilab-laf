import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  AllowListEditor,
  BrandingEditor,
  ColorField,
  IpInput,
  NotificationCenter,
  PermissionMatrix,
  TransferList,
  contrastRatio,
  isCidr,
  isIPv4,
  isIPv6,
} from "../lib";

describe("contrastRatio", () => {
  it("matches WCAG reference values", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#fff", "#fff")).toBeCloseTo(1, 5);
    expect(contrastRatio("#777777", "#ffffff")).toBeCloseTo(4.48, 1);
  });
});

describe("network validation", () => {
  it("validates IPv4", () => {
    expect(["10.0.0.1", "255.255.255.255"].every(isIPv4)).toBe(true);
    expect(["256.1.1.1", "1.2.3", "01.2.3.4", "a.b.c.d"].some(isIPv4)).toBe(false);
  });
  it("validates IPv6", () => {
    expect(["::1", "::", "2001:db8::ff00:42:8329", "::ffff:192.0.2.1", "1:2:3:4:5:6:7:8"].every(isIPv6)).toBe(true);
    expect(["1:2:3:4:5:6:7", "1::2::3", "12345::1", "g::1", ":::"].some(isIPv6)).toBe(false);
  });
  it("validates CIDR", () => {
    expect(["10.0.0.0/8", "0.0.0.0/0", "2001:db8::/32", "::/128"].every(isCidr)).toBe(true);
    expect(["10.0.0.0/33", "10.0.0.0", "::/129", "1.2.3.4/"].some(isCidr)).toBe(false);
  });
});

describe("AllowListEditor / IpInput", () => {
  it("adds valid entries, rejects invalid and duplicates", async () => {
    const onChange = vi.fn();
    render(<AllowListEditor defaultValue={["10.0.0.0/8"]} onChange={onChange} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "nope{Enter}");
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.clear(input);
    await user.type(input, "10.0.0.0/8{Enter}");
    expect(screen.getByRole("alert")).toHaveTextContent("Already");
    await user.clear(input);
    await user.type(input, "2001:db8::1{Enter}");
    expect(onChange).toHaveBeenCalledWith(["10.0.0.0/8", "2001:db8::1"]);
    await user.click(screen.getByRole("button", { name: "Remove 10.0.0.0/8" }));
    expect(onChange).toHaveBeenLastCalledWith(["2001:db8::1"]);
  });
  it("shows an error on blur for an invalid IP", async () => {
    render(<IpInput label="IP" defaultValue="" />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("IP"), "999.1.1.1");
    await user.tab();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
  it("has no axe violations", async () => {
    const { container } = render(<AllowListEditor defaultValue={["10.0.0.1"]} />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("ColorField", () => {
  it("accepts a passing colour and rejects a low-contrast one", async () => {
    const onChange = vi.fn();
    render(<ColorField defaultValue="#54a2ff" onChange={onChange} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "#1a1a1a");
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent("contrast");
    await user.clear(input);
    await user.type(input, "#ffcc00");
    expect(onChange).toHaveBeenLastCalledWith("#ffcc00");
  });
  it("has no axe violations", async () => {
    const { container } = render(<ColorField defaultValue="#54a2ff" />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("TransferList", () => {
  const items = Array.from({ length: 5 }, (_, i) => ({ id: `i${i}`, label: `Item ${i}` }));
  it("moves checked and all items, and filters by search", async () => {
    const onChange = vi.fn();
    render(<TransferList items={items} defaultValue={["i0"]} onChange={onChange} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("checkbox", { name: "Item 2" }));
    await user.click(screen.getByRole("button", { name: "Add selected" }));
    expect(onChange).toHaveBeenCalledWith(["i0", "i2"]);
    await user.type(screen.getByRole("searchbox", { name: "Search available" }), "Item 4");
    expect(screen.queryByRole("checkbox", { name: "Item 1" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Remove all" }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });
  it("has no axe violations", async () => {
    const { container } = render(<TransferList items={items} />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("PermissionMatrix", () => {
  const roles = [{ id: "a", label: "A" }, { id: "b", label: "B" }];
  const groups = [{ id: "g", label: "Users", permissions: [{ id: "r", label: "Read" }, { id: "w", label: "Write" }] }];
  const Harness = ({ onSave }: { onSave?: () => void }) => {
    const [v, setV] = React.useState<Record<string, string[]>>({ a: ["r"], b: [] });
    return <PermissionMatrix roles={roles} groups={groups} value={v} onChange={setV} baseline={{ a: ["r"], b: [] }} inherited={{ b: [{ permission: "r", from: "Base" }] }} searchable onSave={onSave} onDiscard={() => setV({ a: ["r"], b: [] })} />;
  };
  it("shows inherited cells disabled with source, diffs and filters", async () => {
    const onSave = vi.fn();
    render(<Harness onSave={onSave} />);
    const user = userEvent.setup();
    const inh = screen.getByRole("checkbox", { name: "Read for B" });
    expect(inh).toBeDisabled();
    expect(inh).toBeChecked();
    expect(screen.getByText("Base")).toBeInTheDocument();
    await user.click(screen.getByRole("checkbox", { name: "Write for A" }));
    expect(screen.getByRole("status")).toHaveTextContent("1 pending change");
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onSave).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Discard" }));
    expect(screen.queryByRole("status")).toBeNull();
    await user.type(screen.getByRole("searchbox"), "zzz");
    expect(screen.getByText("No matching permissions")).toBeInTheDocument();
  });
  it("navigates with arrow keys", async () => {
    render(<Harness />);
    const user = userEvent.setup();
    screen.getByRole("checkbox", { name: "Read for A" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("checkbox", { name: "Read for A" })).not.toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("checkbox", { name: "Write for B" })).toHaveFocus();
  });
  it("has no axe violations", async () => {
    const { container } = render(<Harness />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("NotificationCenter", () => {
  const items = [
    { id: "1", title: "Alpha", time: Date.now(), unread: true, group: "G1" },
    { id: "2", title: "Beta", time: Date.now(), group: "G2" },
  ];
  it("shows unread count, marks read, groups", async () => {
    const onMarkRead = vi.fn();
    const onMarkAllRead = vi.fn();
    render(<NotificationCenter items={items} onMarkRead={onMarkRead} onMarkAllRead={onMarkAllRead} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Notifications (1)" }));
    expect(screen.getByRole("heading", { name: "G1" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: 'Mark "Alpha" as read' }));
    expect(onMarkRead).toHaveBeenCalledWith("1");
    await user.click(screen.getByRole("button", { name: "Mark all as read" }));
    expect(onMarkAllRead).toHaveBeenCalled();
  });
  it("has no axe violations (closed)", async () => {
    const { container } = render(<NotificationCenter items={items} />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("BrandingEditor", () => {
  it("renders live preview with product name and has no axe violations", async () => {
    const { container } = render(<BrandingEditor defaultValue={{ productName: "Acme ID", primary: "#54a2ff" }} />);
    const preview = screen.getByText("Login page preview").parentElement as HTMLElement;
    expect(within(preview).getByText("Acme ID")).toBeInTheDocument();
    expect((await axe(container)).violations).toEqual([]);
  });
});
