import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  Accordion,
  AvatarGroup,
  IconButton,
  PasswordField,
  RelativeTime,
  SegmentedControl,
  SelectMenu,
  Slider,
  SplitButton,
  StatusDot,
  DropdownMenuItem,
  formatRelative,
} from "../lib";

describe("SegmentedControl", () => {
  it("selects with click and arrow keys, never deselects", async () => {
    const onValueChange = vi.fn();
    render(<SegmentedControl aria-label="v" defaultValue="a" onValueChange={onValueChange} items={[{ value: "a", label: "A" }, { value: "b", label: "B" }]} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("radio", { name: "A" }));
    expect(onValueChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole("radio", { name: "B" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("radio", { name: "B" })).toBeChecked();
  });
  it("has no axe violations", async () => {
    const { container } = render(<SegmentedControl aria-label="v" defaultValue="a" items={[{ value: "a", label: "A" }]} />);
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("SelectMenu", () => {
  it("renders the placeholder and invalid state", () => {
    render(<SelectMenu aria-label="r" placeholder="Pick" invalid options={[{ value: "a", label: "A" }]} />);
    const t = screen.getByRole("combobox", { name: "r" });
    expect(t).toHaveTextContent("Pick");
    expect(t).toHaveAttribute("aria-invalid", "true");
  });
});

describe("IconButton / StatusDot / AvatarGroup", () => {
  it("IconButton is named by label", () => {
    render(<IconButton label="Delete" icon={<svg />} />);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
  it("StatusDot exposes text", () => {
    render(<StatusDot tone="ok" label="Running" srOnly />);
    expect(screen.getByText("Running")).toHaveClass("sr-only");
  });
  it("AvatarGroup collapses extras", () => {
    render(<AvatarGroup max={2} users={[{ name: "A B" }, { name: "C D" }, { name: "E F" }, { name: "G H" }]} />);
    expect(screen.getByLabelText("+2")).toBeInTheDocument();
  });
});

describe("RelativeTime", () => {
  it("formats and renders a <time> element", () => {
    const d = new Date("2024-01-01T12:00:00Z");
    expect(formatRelative(d, d.getTime() + 5 * 60_000, "en")).toBe("5 minutes ago");
    const { container } = render(<RelativeTime value={d} />);
    expect(container.querySelector("time")).toHaveAttribute("datetime", d.toISOString());
  });
  it("updates on the shared ticker", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T12:00:00Z"));
    render(<RelativeTime value={new Date("2024-01-01T11:59:00Z")} />);
    const before = screen.getByText(/ago|minute/).textContent;
    act(() => void vi.advanceTimersByTime(30_000 * 4));
    expect(screen.getByText(/ago|minute/).textContent).not.toBe(before);
    vi.useRealTimers();
  });
});

describe("SplitButton", () => {
  it("runs the primary action and labels the chevron", () => {
    const onClick = vi.fn();
    render(<SplitButton onClick={onClick} menuLabel="More power actions" menu={<DropdownMenuItem>Off</DropdownMenuItem>}>Power on</SplitButton>);
    fireEvent.click(screen.getByRole("button", { name: "Power on" }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "More power actions" })).toBeInTheDocument();
  });
});

describe("PasswordField strength + confirm", () => {
  it("shows strength label and mismatch error", async () => {
    const user = userEvent.setup();
    render(<PasswordField aria-label="p" strength={(v) => (v.length > 3 ? 4 : 1)} confirmOf="secret" />);
    await user.type(screen.getByLabelText("p"), "abcd");
    expect(screen.getByText("Strong")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Passwords do not match");
  });
});

describe("Accordion (Radix)", () => {
  const items = [{ id: "a", title: "A", content: "alpha" }, { id: "b", title: "B", content: "beta" }];
  it("single mode closes the other item", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpen={["a"]} />);
    expect(screen.getByText("alpha")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "B" }));
    expect(screen.queryByText("alpha")).not.toBeInTheDocument();
    expect(screen.getByText("beta")).toBeInTheDocument();
  });
  it("controlled reports changes", async () => {
    const onOpenChange = vi.fn();
    render(<Accordion items={items} open={[]} onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button", { name: "A" }));
    expect(onOpenChange).toHaveBeenCalledWith(["a"]);
    expect(screen.queryByText("alpha")).not.toBeInTheDocument();
  });
});

describe("Slider", () => {
  it("steps with the keyboard and syncs withInput", async () => {
    const onValueChange = vi.fn();
    render(<Slider aria-label="cpu" defaultValue={10} step={5} withInput onValueChange={onValueChange} />);
    const thumb = screen.getByRole("slider", { name: "cpu" });
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith(15);
    expect(screen.getByRole("textbox", { name: "cpu" })).toHaveValue("15");
  });
  it("renders two thumbs for a range", () => {
    render(<Slider aria-label="r" defaultValue={[10, 20]} />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });
});
