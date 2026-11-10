import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import AppShell from "../playground/pages/AppShell";
import { ErrorPage, LafErrorBoundary, Wizard, useUnsavedChangesGuard } from "../lib";

describe("Wizard", () => {
  const make = (onFinish = vi.fn(), validate?: () => string[]) => (
    <Wizard
      onFinish={onFinish}
      steps={[
        { id: "a", label: "First", validate, render: () => <input aria-label="f" /> },
        { id: "b", label: "Second", optional: true, render: () => <p>second body</p> },
        { id: "c", label: "Third", render: () => <p>third body</p> },
      ]}
    />
  );
  it("blocks Next on validation errors", async () => {
    const user = userEvent.setup();
    render(make(vi.fn(), () => ["Bad value"]));
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(await screen.findByText("Bad value")).toBeInTheDocument();
    expect(screen.queryByText("second body")).toBeNull();
  });
  it("skips optional steps, Ctrl+Enter advances, finishes", async () => {
    const onFinish = vi.fn();
    const user = userEvent.setup();
    render(make(onFinish));
    await user.click(screen.getByLabelText("f"));
    await user.keyboard("{Control>}{Enter}{/Control}");
    await screen.findByText("second body");
    await user.click(screen.getByRole("button", { name: "Skip" }));
    await screen.findByText("third body");
    await user.click(screen.getByRole("button", { name: "Finish" }));
    await waitFor(() => expect(onFinish).toHaveBeenCalled());
  });
  it("confirms cancel when dirty", async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    render(<Wizard dirty onCancel={onCancel} onFinish={() => {}} steps={[{ id: "a", label: "A", render: () => null }]} />);
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).not.toHaveBeenCalled();
    await user.click(await screen.findByRole("button", { name: "Discard changes" }));
    expect(onCancel).toHaveBeenCalled();
  });
});

describe("useUnsavedChangesGuard", () => {
  it("registers beforeunload only while dirty", () => {
    const add = vi.spyOn(window, "addEventListener");
    const Probe = ({ dirty }: { dirty: boolean }) => (useUnsavedChangesGuard(dirty), null);
    const { rerender } = render(<Probe dirty={false} />);
    expect(add.mock.calls.some((c) => c[0] === "beforeunload")).toBe(false);
    rerender(<Probe dirty />);
    expect(add.mock.calls.some((c) => c[0] === "beforeunload")).toBe(true);
    add.mockRestore();
  });
});

describe("errors", () => {
  it("renders the 404 variant", () => {
    render(<ErrorPage variant="404" requestId="r-1" />);
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(screen.getByText("r-1")).toBeInTheDocument();
  });
  it("boundary shows 500 and resets", async () => {
    const user = userEvent.setup();
    let fail = true;
    const Bomb = () => {
      if (fail) throw new Error("boom");
      return <p>ok</p>;
    };
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <LafErrorBoundary>
        <Bomb />
      </LafErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    fail = false;
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByText("ok")).toBeInTheDocument();
    spy.mockRestore();
  });
});

describe("App shell (M1 exit)", () => {
  it("is keyboard-navigable end to end and passes axe", async () => {
    const user = userEvent.setup();
    const { container } = render(<AppShell />);
    expect(await axe(container)).toHaveNoViolations();

    const edit = screen.getByRole("button", { name: "Edit settings" });
    edit.focus();
    await user.keyboard("{Enter}");
    const name = await screen.findByLabelText("Name");
    await user.type(name, "x");
    await user.tab();
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("alertdialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.getByLabelText("Name")).toHaveValue("web-01x");

    screen.getByRole("button", { name: "New virtual machine" }).focus();
    await user.keyboard("{Enter}");
    await user.click(await screen.findByRole("button", { name: "Next" }));
    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Machine name"));
    await user.keyboard("vm1{Control>}{Enter}{/Control}");
    await user.click(await screen.findByRole("button", { name: "Skip" }));
    expect(await screen.findByText("vm1")).toBeInTheDocument();
    await user.keyboard("{Control>}{Enter}{/Control}");
    expect(await screen.findByRole("status")).toHaveTextContent("Created vm1");
    expect(await axe(container)).toHaveNoViolations();
  });
});
