import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { LafProvider } from "../lib";
import { DEMOS, App, demoFromLocation } from "../playground/App";

const Wrap = ({ children }: { children: React.ReactNode }) => <LafProvider>{children}</LafProvider>;

describe("playground demos", () => {
  afterEach(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
  });

  it.each(DEMOS.map((d) => [d.id, d] as const))("%s mounts", async (_id, demo) => {
    const { container } = render(
      <Wrap>
        <React.Suspense fallback={null}>
          <demo.Component />
        </React.Suspense>
      </Wrap>,
    );
    await waitFor(() => expect(container.children.length).toBeGreaterThan(0), { timeout: 8000 });
    await new Promise((r) => setTimeout(r, 50));
    expect(container.textContent?.length).toBeGreaterThan(0);
  }, 20000);

  it("routes by ?demo= and ?bench=", () => {
    expect(demoFromLocation("?demo=vcenter")).toBe("vcenter");
    expect(demoFromLocation("?bench=grid")).toBe("datagrid");
    expect(demoFromLocation("?bench=tree")).toBe("tree");
    expect(demoFromLocation("?demo=nope")).toBe("catalogue");
  });

  it("switches demo, language and direction", async () => {
    history.replaceState(null, "", "/?demo=filterbar");
    render(<App />);
    await screen.findByText(/FilterBar \+ SavedViews/, undefined, { timeout: 8000 });
    fireEvent.change(screen.getByLabelText("Direction"), { target: { value: "rtl" } });
    expect(document.documentElement.dir).toBe("rtl");
    fireEvent.change(screen.getByLabelText("Language"), { target: { value: "hu" } });
    expect(document.documentElement.lang).toBe("hu");
    fireEvent.change(screen.getByLabelText("Demo"), { target: { value: "tracker" } });
    await screen.findByRole("heading", { name: "Tracker" }, { timeout: 8000 });
  }, 30000);

  it("tracker: opens an issue and moves a card with the keyboard", async () => {
    const Tracker = (await import("../playground/pages/Tracker")).default;
    const { container } = render(
      <Wrap>
        <Tracker />
      </Wrap>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Board" }));
    const card = () => screen.getByText("PIL-1 Login redirect loops").closest("li") as HTMLElement;
    card().focus();
    fireEvent.keyDown(card(), { key: " " });
    fireEvent.keyDown(card(), { key: "ArrowRight" });
    fireEvent.keyDown(card(), { key: " " });
    await waitFor(() => expect(card().closest("section")).toHaveAccessibleName("In progress"));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("vcenter: opens the create wizard and a task appears", async () => {
    const VCenter = (await import("../playground/pages/VCenter")).default;
    render(
      <Wrap>
        <VCenter />
      </Wrap>,
    );
    fireEvent.click(screen.getAllByRole("button", { name: "Create VM…" })[0]!);
    const input = await screen.findByLabelText("Virtual machine name");
    fireEvent.change(input, { target: { value: "demo-vm" } });
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await screen.findByLabelText("vCPUs");
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(await screen.findByRole("button", { name: "Finish" }));
    await waitFor(() => expect(screen.getAllByText("demo-vm").length).toBeGreaterThan(0), { timeout: 3000 });
    await waitFor(() => expect(screen.getByText("Create virtual machine", { selector: "*" })).toBeInTheDocument());
  }, 20000);
  it("content: bulk mode, filter chips and the modal work", async () => {
    const Content = (await import("../playground/pages/Content")).default;
    const { container } = render(
      <Wrap>
        <Content />
      </Wrap>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Remove filter eu-west" }));
    expect(screen.queryByRole("button", { name: "Remove filter eu-west" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Select 3" }));
    expect(screen.getByText("3 selected")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open modal" }));
    await screen.findByRole("dialog", { name: "Create token" });
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect((await axe(container)).violations).toEqual([]);
  });
});
