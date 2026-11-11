import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  ActionToolbar,
  CountCard,
  DetailsCard,
  IdentityCard,
  LafProvider,
  ObjectHeader,
  PowerState,
  ResourceOverviewLayout,
  SideCard,
  TooltipProvider,
  UtilizationColumn,
  UtilizationPanel,
} from "../lib";
import { hu } from "../lib/locales/hu";

const wrap = (ui: React.ReactNode, locale: "en" | "hu" = "en") =>
  render(
    <LafProvider locale={locale} messages={locale === "hu" ? hu : undefined}>
      <TooltipProvider>{ui}</TooltipProvider>
    </LafProvider>,
  );

describe("ResourceOverviewLayout", () => {
  it("places the slots in a container-query grid that collapses to one column", () => {
    const { container } = wrap(<ResourceOverviewLayout identity={<p>id</p>} details={<p>det</p>} utilization={<p>util</p>} aside={<p>side</p>} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("@container");
    const grid = root.firstElementChild as HTMLElement;
    expect(grid.className).toContain("grid-cols-1");
    expect(grid.className).toContain("@min-[860px]:grid-cols-[");
    expect(within(grid).getAllByText(/^(id|det|util|side)$/)).toHaveLength(4);
  });
  it("uses two columns without an aside and lets details fill the row without an identity", () => {
    const { container } = wrap(<ResourceOverviewLayout details={<p>det</p>} />);
    expect((container.firstElementChild!.firstElementChild as HTMLElement).className).not.toContain("0.8fr");
    expect(screen.getByText("det").parentElement!.className).toContain("col-span-2");
  });
});

describe("PowerState", () => {
  it("spells the state out and allows a custom label", () => {
    wrap(
      <>
        <PowerState state="on" />
        <PowerState state="suspended" label="Paused" />
      </>,
    );
    expect(screen.getByText("Powered on")).toBeInTheDocument();
    expect(screen.getByText("Paused").closest("[data-state]")).toHaveAttribute("data-state", "suspended");
  });
});

describe("cards", () => {
  it("IdentityCard: heading, ribbon, status and an edit action", () => {
    const onEdit = vi.fn();
    wrap(<IdentityCard icon={<svg />} name="vm-1" ribbon="Windows 10" status={<PowerState state="on" />} description="desc" onEdit={onEdit} />);
    expect(screen.getByRole("heading", { level: 2, name: "vm-1" })).toBeInTheDocument();
    expect(screen.getByText("Windows 10")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Edit vm-1" }));
    expect(onEdit).toHaveBeenCalled();
  });

  it("DetailsCard: description list split into columns with sub-lines and an edit action", () => {
    const onEdit = vi.fn();
    const items = ["a", "b", "c", "d", "e"].map((k, i) => ({ label: `Label ${k}`, value: `Value ${k}`, sub: i === 0 ? "sub line" : undefined }));
    const { container } = wrap(<DetailsCard items={items} onEdit={onEdit} />);
    expect(container.querySelectorAll("dl")).toHaveLength(2);
    expect(container.querySelectorAll("dt")).toHaveLength(5);
    expect(screen.getByText("sub line")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Details" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Edit Details" }));
    expect(onEdit).toHaveBeenCalled();
  });

  it("CountCard badges the item count; SideCard and an empty CountCard show the empty state", () => {
    wrap(
      <>
        <CountCard title="Snapshots" items={[{ id: "1", content: "one" }, { id: "2", content: "two" }]} />
        <CountCard title="Disks" items={[]} empty="No disks" />
        <SideCard title="Other" />
      </>,
    );
    const snap = screen.getByRole("heading", { name: /Snapshots/ });
    expect(within(snap).getByText("2")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("No disks")).toBeInTheDocument();
    expect(within(screen.getByRole("heading", { name: /Disks/ })).getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Nothing to show")).toBeInTheDocument();
  });
});

describe("UtilizationColumn", () => {
  it("colours the ring by threshold, shows the available caption and the trend range", () => {
    wrap(
      <UtilizationPanel>
        <UtilizationColumn title="CPU" available={50} capacity="1000 MHz" used={95} history={[1, 2, 3, 2]} />
        <UtilizationColumn title="Memory" available={77} capacity="102 GB" used={25} max={102} centerText="25" centerSubtext="GB Used" history={[1, 2, 3]} rangeLabel="Last 24 h" />
        <UtilizationColumn title="Load" available={1} capacity="4 cores" used={70} warnAt={50} dangerAt={95} gauge="radial" />
      </UtilizationPanel>,
    );
    expect(screen.getByRole("heading", { name: "Utilization" })).toBeInTheDocument();
    const cpu = screen.getByRole("group", { name: "CPU" });
    expect(within(cpu).getByText("Available")).toBeInTheDocument();
    expect(within(cpu).getByText("of 1000 MHz")).toBeInTheDocument();
    expect(within(cpu).getByRole("img", { name: /95%.*Critical|Critical/i })).toBeInTheDocument();
    expect(cpu.querySelector(".text-danger")).not.toBeNull();
    expect(within(cpu).getByText("Last 7 days")).toBeInTheDocument();
    const mem = screen.getByRole("group", { name: "Memory" });
    expect(mem.querySelector(".text-ok")).not.toBeNull();
    expect(within(mem).getByText("GB Used")).toBeInTheDocument();
    expect(within(mem).getByText("Last 24 h")).toBeInTheDocument();
    const load = screen.getByRole("group", { name: "Load" });
    expect(within(load).getByRole("meter", { name: "Load" })).toHaveAttribute("aria-valuenow", "70");
    expect(within(load).queryByText(/Last 7/)).toBeNull();
  });

  it("tooltip=false makes the ring and trend plain images and animate=false is forwarded", () => {
    wrap(<UtilizationColumn title="Disk" available={1} capacity="2 GB" used={10} history={[1, 2]} tooltip={false} animate={false} />);
    const group = screen.getByRole("group", { name: "Disk" });
    expect(group.querySelector("svg[tabindex]")).toBeNull();
    expect(group.querySelector('[data-animate="on"]')).toBeNull();
  });

  it("is translated", () => {
    wrap(<UtilizationColumn title="CPU" available={1} capacity="2 GHz" used={10} history={[1, 2]} />, "hu");
    expect(screen.getByText("Szabad")).toBeInTheDocument();
    expect(screen.getByText("összesen 2 GHz")).toBeInTheDocument();
    expect(screen.getByText("Elmúlt 7 nap")).toBeInTheDocument();
  });
});

describe("ObjectHeader + ActionToolbar", () => {
  it("renders breadcrumb, title heading and a labelled switch button", () => {
    const onSwitch = vi.fn();
    wrap(<ObjectHeader breadcrumb={[{ label: "Virtual Machines", href: "#" }]} title="vm-1" onSwitch={onSwitch} actions={<ActionToolbar actions={[{ id: "a", label: "Go" }]} />} />);
    expect(screen.getByRole("heading", { level: 1, name: "vm-1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Virtual Machines" })).not.toHaveAttribute("aria-current");
    fireEvent.click(screen.getByRole("button", { name: "Switch object" }));
    expect(onSwitch).toHaveBeenCalled();
    expect(screen.getByRole("group", { name: "Actions" })).toBeInTheDocument();
  });

  it("split actions: main click, keyboard-opened menu, selection, Escape closes", async () => {
    const user = userEvent.setup();
    const main = vi.fn();
    const select = vi.fn();
    wrap(
      <ActionToolbar
        actions={[
          { id: "console", label: "Console", onClick: main, menu: [{ id: "rdp", label: "Graphical (RDP)", onSelect: select }, { id: "vnc", label: "Graphical (VNC)" }] },
          { id: "suspend", label: "Suspend" },
          { id: "shutdown", label: "Shutdown", variant: "primary", menu: [{ id: "off", label: "Power off" }] },
        ]}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Console" }));
    expect(main).toHaveBeenCalledTimes(1);
    const chevron = screen.getByRole("button", { name: "Console options" });
    chevron.focus();
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("menuitem", { name: "Graphical (RDP)" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menuitem")).toBeNull();
    expect(chevron).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard("{Enter}");
    expect(select).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Shutdown" })).toHaveClass("btn-primary");
    expect(screen.getByRole("button", { name: "Suspend" })).toHaveClass("btn-secondary");
  });
});

describe("a11y", () => {
  it("a composed overview has no axe violations", async () => {
    const { container } = wrap(
      <>
        <ObjectHeader breadcrumb={[{ label: "VMs", href: "#" }]} title="vm-1" onSwitch={() => {}} actions={<ActionToolbar actions={[{ id: "c", label: "Console", menu: [{ id: "r", label: "RDP" }] }]} />} />
        <ResourceOverviewLayout
          identity={<IdentityCard icon={<svg aria-hidden />} name="vm-1" ribbon="Win" status={<PowerState state="on" />} onEdit={() => {}} />}
          details={<DetailsCard items={[{ label: "Host", value: "h1" }]} onEdit={() => {}} />}
          aside={<CountCard title="Disks" items={[]} onEdit={() => {}} />}
          utilization={
            <UtilizationPanel>
              <UtilizationColumn title="CPU" available={5} capacity="10 MHz" used={50} history={[1, 2, 3]} />
              <UtilizationColumn title="Mem" available={5} capacity="10 GB" used={95} gauge="radial" />
            </UtilizationPanel>
          }
        />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
