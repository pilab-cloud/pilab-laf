import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  Accordion,
  Combobox,
  DiffView,
  FileDropzone,
  KeyValueEditor,
  SecretDisplay,
  TreeView,
  diffLines,
  format,
  matchesAccept,
  type KeyValue,
} from "../lib";

describe("diffLines (B3)", () => {
  it("marks only the inserted line", () => {
    const ops = diffLines("a\nb\nc", "a\nX\nb\nc");
    expect(ops.filter((o) => o.type !== "same")).toEqual([{ type: "add", text: "X" }]);
  });
  it("renders unified mode", () => {
    render(<DiffView label="d" mode="unified" before={"a\nb"} after={"a\nc"} />);
    expect(screen.getByText("b", { exact: false }).textContent).toBe("- b");
  });
});

describe("FileDropzone (B2)", () => {
  it("formats bytes and rejects dropped files that do not match accept", () => {
    expect(format.bytes(1536)).toBe("1.5 KB");
    expect(matchesAccept({ name: "a.png", type: "image/png" }, "image/*")).toBe(true);
    expect(matchesAccept({ name: "a.exe", type: "" }, ".png,image/*")).toBe(false);
    const onFiles = vi.fn();
    render(<FileDropzone files={[]} onFiles={onFiles} accept="image/*" />);
    const bad = new File(["x"], "a.txt", { type: "text/plain" });
    fireEvent.drop(screen.getByRole("button"), { dataTransfer: { files: [bad] } });
    expect(onFiles).not.toHaveBeenCalled();
    expect(screen.getByRole("alert").textContent).toMatch(/unsupported type/);
  });
});

describe("KeyValueEditor (B5)", () => {
  it("keeps the remaining row's DOM node after removing another", async () => {
    function Host() {
      const [v, setV] = React.useState<KeyValue[]>([{ key: "a", value: "1" }, { key: "b", value: "2" }]);
      return <KeyValueEditor value={v} onChange={setV} />;
    }
    render(<Host />);
    const second = screen.getByDisplayValue("b");
    await userEvent.click(screen.getByLabelText("Remove row 1"));
    expect(screen.getByDisplayValue("b")).toBe(second);
  });
});

describe("SecretDisplay (B6)", () => {
  it("masks all but the last 4 and supports a controlled checkbox", () => {
    render(<SecretDisplay value="supersecret1234" label="Key" acknowledgeLabel="ok" masked acknowledged />);
    expect(screen.getByText(/1234$/).textContent).toMatch(/^•+1234$/);
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
  });
});

describe("TreeView / Accordion uncontrolled (B8)", () => {
  it("works without state props", async () => {
    render(<TreeView label="t" nodes={[{ id: "r", label: "Root", children: [{ id: "c", label: "Child" }] }]} />);
    expect(screen.queryByText("Child")).toBeNull();
    await userEvent.click(screen.getByText("Root"));
    expect(screen.getByRole("treeitem", { name: /Root/ }).getAttribute("aria-selected")).toBe("true");
  });
  it("accordion can be controlled", async () => {
    const onOpenChange = vi.fn();
    render(<Accordion items={[{ id: "a", title: "A", content: "x" }]} open={[]} onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByText("A"));
    expect(onOpenChange).toHaveBeenCalledWith(["a"]);
    expect(screen.getByRole("button", { name: "A" }).getAttribute("aria-expanded")).toBe("false");
  });
});

describe("Combobox portal (B4)", () => {
  it("renders the listbox outside the combobox container", async () => {
    const { container } = render(<Combobox label="c" value={[]} onChange={() => {}} options={[{ value: "1", label: "One" }]} />);
    await userEvent.click(screen.getByRole("combobox"));
    const list = await screen.findByRole("listbox");
    expect(container.contains(list)).toBe(false);
  });
});

import { LafProvider, Pagination } from "../lib";
import { hu } from "../lib/locales/hu";

describe("LafProvider (F1/B7)", () => {
  it("defaults to English and switches to hu", () => {
    const { rerender } = render(<Pagination page={1} pageCount={3} onPageChange={() => {}} />);
    expect(screen.getByLabelText("Next page")).toBeTruthy();
    rerender(
      <LafProvider locale="hu" messages={hu}>
        <Pagination page={1} pageCount={3} onPageChange={() => {}} />
      </LafProvider>,
    );
    expect(screen.getByLabelText("Következő oldal")).toBeTruthy();
  });
});
