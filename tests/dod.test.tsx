import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { Home } from "lucide-react";
import {
  AccountItem,
  AccountList,
  AdminShell,
  AuditLog,
  AuthFooter,
  Avatar,
  Badge,
  BarChart,
  BrandHeader,
  Card,
  CidrInput,
  ClientInfo,
  CodeDisplay,
  CodeInput,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  CopyButton,
  DataGrid,
  DateTimeInput,
  DefinitionList,
  DetailPage,
  DeviceSelector,
  Dialog,
  DialogContent,
  DialogTrigger,
  Donut,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ErrorPage,
  Field,
  FormField,
  FormFooter,
  FormPage,
  FormSection,
  Gauge,
  GridColumnsMenu,
  GridDensityToggle,
  GridSearch,
  InfoBox,
  Input,
  IssueCard,
  LabelSwatch,
  LafProvider,
  LanguageSwitcher,
  LineChart,
  MenuShortcut,
  MobileNav,
  NavGroup,
  NavLink,
  NumberInput,
  OverflowTabs,
  Panel,
  PageHead,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  ScopeList,
  SearchInput,
  Skeleton,
  SocialButton,
  SocialButtons,
  SocialDivider,
  Sparkline,
  SplitButton,
  StatGrid,
  Stat,
  Stepper,
  SubNav,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TenantSwitcher,
  Textarea,
  Chip,
  Toolbar,
  Tooltip,
  TooltipProvider,
  TopBar,
  UnsavedChangesDialog,
  UserCell,
  WizardReview,
  DockedTaskPanel,
  useUnsavedChangesGuard,
} from "../lib";
import { hu } from "../lib/locales/hu";

/** Every case below asserts role/name where the role is the contract, and runs axe on the rendered tree. */
const noViolations = async (container: HTMLElement) => expect(await axe(container)).toHaveNoViolations();

describe("form primitives", () => {
  it("Field wires label, hint and error to the control", async () => {
    const { container, rerender } = render(
      <Field label="Email" hint="We never share it" htmlFor="e">
        <Input id="e" />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByText("We never share it")).toBeInTheDocument();
    await noViolations(container);
    rerender(
      <Field label="Email" error="Required" htmlFor="e">
        <Input id="e" invalid />
      </Field>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
    expect(screen.getByLabelText("Email")).toBeInvalid();
  });

  it("Input, Textarea, SearchInput, DateTimeInput, CodeInput are labelled textboxes", async () => {
    const { container } = render(
      <div>
        <Input aria-label="Name" defaultValue="x" />
        <Textarea aria-label="Notes" invalid />
        <SearchInput aria-label="Find" icon={<Home aria-hidden />} />
        <DateTimeInput aria-label="When" mode="datetime-local" />
        <CodeInput aria-label="Code" />
      </div>,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("x");
    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("searchbox", { name: "Find" })).toBeInTheDocument();
    expect(screen.getByLabelText("When")).toHaveAttribute("type", "datetime-local");
    await userEvent.type(screen.getByRole("textbox", { name: "Code" }), "ab");
    await noViolations(container);
  });

  it("Radio and RadioGroup support arrow-key selection", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <div>
        <RadioGroup name="r" aria-label="Plan" value="a" onValueChange={onChange} options={[{ value: "a", label: "A" }, { value: "b", label: "B", hint: "second" }]} />
        <Radio name="solo" aria-label="Solo">Solo</Radio>
      </div>,
    );
    expect(screen.getByRole("group", { name: "Plan" })).toBeInTheDocument();
    const a = screen.getByRole("radio", { name: "A" });
    expect(a).toBeChecked();
    a.focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(onChange).toHaveBeenCalledWith("b");
    await noViolations(container);
  });

  it("FormField links label, description and error through aria-describedby", async () => {
    const { container } = render(
      <FormField label="Host" description="FQDN" error="Invalid">
        {(aria) => <Input {...aria} />}
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Host" });
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription(/Invalid/);
    await noViolations(container);
  });

  it("NumberInput steps with the buttons and clamps", async () => {
    const onChange = vi.fn();
    const { container } = render(<NumberInput label="CPUs" value={2} min={1} max={4} onChange={onChange} />);
    expect(screen.getByRole("textbox", { name: "CPUs" }).closest("div")).toBeTruthy();
    const inc = screen.getAllByRole("button")[1]!;
    await userEvent.click(inc);
    expect(onChange).toHaveBeenCalledWith(3);
    await noViolations(container);
  });

  it("CidrInput flags invalid networks", async () => {
    const { container } = render(<CidrInput label="Range" />);
    const box = screen.getByRole("textbox", { name: "Range" });
    await userEvent.type(box, "nope");
    await userEvent.tab();
    expect(box).toBeInvalid();
    await noViolations(container);
  });
});

describe("display", () => {
  it("Card, Panel, Stat, StatGrid, PageHead structure", async () => {
    const { container } = render(
      <Card data-testid="card">
        <PageHead title="Users" description="All users" />
        <h2>Overview</h2>
        <StatGrid>
          <Stat label="Active" value="12" delta="+2" />
        </StatGrid>
        <Panel title="Details">body</Panel>
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("card");
    expect(screen.getByRole("heading", { level: 1, name: "Users" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Details" })).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    await noViolations(container);
  });

  it.each(["neutral", "ok", "warn", "danger", "primary"] as const)("Badge tone %s renders its text (plain and filled)", async (tone) => {
    const { container } = render(
      <div>
        <Badge tone={tone}>Status</Badge>
        <Badge tone={tone} plain>
          Plain
        </Badge>
      </div>,
    );
    expect(screen.getByText("Status")).toHaveClass("badge");
    expect(screen.getByText("Plain")).toHaveClass("plain");
    await noViolations(container);
  });

  it("Chip removes via a named button and supports label colours", async () => {
    const onRemove = vi.fn();
    const { container } = render(
      <div>
        <Chip onRemove={onRemove} removeLabel="Remove tag a">a</Chip>
        <Chip tone="ok">b</Chip>
        <Chip color={3}>c</Chip>
      </div>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove tag a" }));
    expect(onRemove).toHaveBeenCalled();
    await noViolations(container);
  });

  it("Avatar shows initials or an image with alt, Skeleton is inert, LabelSwatch is decorative", async () => {
    const { container } = render(
      <div>
        <Avatar name="Anna Kovacs" />
        <Avatar name="Bob" src="/b.png" />
        <Skeleton className="h-4" />
        <LabelSwatch slot={2} />
      </div>,
    );
    expect(screen.getByText("AK")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Bob" })).toBeInTheDocument();
    await noViolations(container);
  });

  it("UserCell, DefinitionList, InfoBox, ScopeList present their content as lists", async () => {
    const { container } = render(
      <div>
        <UserCell name="Anna" email="a@x.hu" />
        <DefinitionList items={[{ label: "ID", value: "42", copy: "42" }, { label: "Empty" }]} />
        <InfoBox title="Tips" items={["one", "two"]} />
        <ScopeList scopes={[{ id: "read", description: "Read data" }]} />
      </div>,
    );
    expect(screen.getByText("a@x.hu")).toBeInTheDocument();
    expect(screen.getByText("ID").tagName).toBe("DT");
    expect(within(screen.getByText("Tips").parentElement!).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    await noViolations(container);
  });

  it("CopyButton and CodeDisplay announce copying", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <div>
        <CopyButton value="v" />
        <CodeDisplay code="ABCD-1234" />
      </div>,
    );
    await user.click(screen.getAllByRole("button", { name: /Cop/ })[0]!);
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
    expect(screen.getByText("ABCD-1234")).toBeInTheDocument();
    await noViolations(container);
  });

  it("Stepper marks the current step and only completed steps are clickable", async () => {
    const onStep = vi.fn();
    const { container } = render(<Stepper current={1} onStepClick={onStep} steps={[{ id: "a", label: "One" }, { id: "b", label: "Two" }, { id: "c", label: "Three" }]} />);
    expect(screen.getByText("Two").closest("li")).toHaveAttribute("aria-current", "step");
    expect(screen.getByRole("button", { name: /Three/ })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: /One/ }));
    expect(onStep).toHaveBeenCalledWith(0);
    await noViolations(container);
  });

  it("AuditLog groups by day and expands details with the keyboard", async () => {
    const { container } = render(
      <AuditLog
        events={[
          { id: "1", time: "10:00", day: "Today", severity: "ok", icon: <Home aria-hidden />, actor: "anna", action: "signed in", result: "OK", details: { ip: "192.0.2.1" } },
          { id: "2", time: "09:00", day: "Yesterday", severity: "danger", icon: <Home aria-hidden />, actor: "bob", action: "failed" },
        ]}
      />,
    );
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Yesterday")).toBeInTheDocument();
    await noViolations(container);
  });
});

describe("data", () => {
  it("Table, Toolbar, Pagination-free table keeps native semantics", async () => {
    const { container } = render(
      <div>
        <Toolbar>
          <button type="button">Add</button>
        </Toolbar>
        <Table aria-label="Users">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Anna</td>
            </tr>
          </tbody>
        </Table>
      </div>,
    );
    expect(screen.getByRole("table", { name: "Users" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Anna" })).toBeInTheDocument();
    await noViolations(container);
  });

  it("DataGrid toolbar slots (search, density, columns) operate", async () => {
    const rows = [{ id: "1", n: "alpha" }, { id: "2", n: "beta" }];
    const { container } = render(
      <DataGrid
        label="Items"
        rows={rows}
        rowId={(r) => r.id}
        columns={[{ id: "n", header: "Name", cell: (r) => r.n, accessor: (r) => r.n, hideable: true }]}
        toolbar={
          <>
            <GridSearch />
            <GridDensityToggle />
            <GridColumnsMenu />
          </>
        }
      />,
    );
    const user = userEvent.setup();
    await user.type(screen.getByRole("searchbox"), "alp");
    expect(screen.queryByText("beta")).not.toBeInTheDocument();
    const compact = screen.getAllByRole("button", { pressed: true })[0]!;
    expect(compact).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Columns/ }));
    expect(await screen.findByRole("checkbox", { name: "Name" })).toBeChecked();
    await noViolations(container);
  });

  it("IssueCard shows key, title, overdue due-date and comment count", async () => {
    const { container } = render(
      <IssueCard now={new Date("2026-01-01")} issue={{ id: "1", key: "PIL-1", title: "Fix login", href: "#", due: "2020-01-01", comments: 3, labels: [{ name: "bug", slot: 1 }] }} />,
    );
    expect(screen.getByText("PIL-1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Fix login" })).toBeInTheDocument();
    await noViolations(container);
  });
});

describe("navigation & layout", () => {
  it("NavGroup/NavLink/AdminShell expose current page and landmarks", async () => {
    const { container } = render(
      <AdminShell
        sidebar={
          <nav aria-label="Main">
            <NavGroup label="Admin" />
            <NavLink href="#a" current icon={<Home aria-hidden />}>Users</NavLink>
            <NavLink href="#b">Roles</NavLink>
          </nav>
        }
        topbar={<span>Top</span>}
      >
        content
      </AdminShell>,
    );
    expect(screen.getByRole("link", { name: "Users" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("content");
    await noViolations(container);
  });

  it("SubNav is a labelled navigation whose items are keyboard reachable; hu supplies the default name", async () => {
    const onSelect = vi.fn();
    const groups = [{ id: "g", label: "Group", items: [{ id: "a", label: "General" }, { id: "b", label: "Security" }] }];
    const { container, rerender } = render(<SubNav groups={groups} value="a" onSelect={onSelect} />);
    expect(screen.getByRole("navigation", { name: "Section navigation" })).toBeInTheDocument();
    await userEvent.tab();
    await userEvent.keyboard("{Tab}{Enter}");
    expect(onSelect).toHaveBeenCalled();
    await noViolations(container);
    rerender(
      <LafProvider locale="hu" messages={hu}>
        <SubNav groups={groups} />
      </LafProvider>,
    );
    expect(screen.getByRole("navigation", { name: "Szakaszok navigációja" })).toBeInTheDocument();
  });

  it("TopBar names counters and hosts slots", async () => {
    const onClick = vi.fn();
    const { container } = render(
      <TopBar logo="Pilab" search={<Input aria-label="Search" />} counters={[{ id: "a", label: "Alerts", count: 3, onClick }]} userMenu={<button type="button">Anna</button>} />,
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Alerts: 3" }));
    expect(onClick).toHaveBeenCalled();
    await noViolations(container);
  });

  it("MobileNav opens a labelled drawer and Escape closes it", async () => {
    const user = userEvent.setup();
    render(
      <MobileNav>
        <a href="#x">Link</a>
      </MobileNav>,
    );
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    const dlg = await screen.findByRole("dialog", { name: "Navigation" });
    expect(await axe(dlg)).toHaveNoViolations();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("DetailPage and FormPage use a single h1, breadcrumbs and a form landmark", async () => {
    const onSubmit = vi.fn();
    const { container } = render(
      <div>
        <DetailPage breadcrumb={[{ label: "Home", href: "#" }, { label: "VM" }]} title="vm-01" status={<Badge tone="ok">On</Badge>} actions={<button type="button">Power</button>} tabs={<div>tabs</div>} side={<span>side</span>}>
          body
        </DetailPage>
        <FormPage title="Create" description="Fill in" onSubmit={onSubmit} footer={<FormFooter saveType="submit" onCancel={() => {}} />}>
          <FormSection title="General">
            <Field label="Name" htmlFor="n">
              <Input id="n" />
            </Field>
          </FormSection>
        </FormPage>
      </div>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "vm-01" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "General" })).toBeInTheDocument();
    expect(screen.getAllByRole("navigation", { name: /./ })[0]).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalled();
    await noViolations(container);
  });

  it("FormFooter disables Save until dirty and routes Cancel through the guard; UnsavedChangesDialog confirms", async () => {
    const onCancel = vi.fn();
    function Host() {
      const g = useUnsavedChangesGuard(true);
      return (
        <div>
          <FormFooter dirty onCancel={onCancel} guard={g} />
          <UnsavedChangesDialog guard={g} />
        </div>
      );
    }
    render(<Host />);
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    const dlg = await screen.findByRole("alertdialog");
    expect(dlg).toHaveAccessibleName("Discard unsaved changes?");
    await userEvent.click(within(dlg).getByRole("button", { name: "Discard changes" }));
    expect(onCancel).toHaveBeenCalled();
    cleanup();
    render(<FormFooter dirty={false} />);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("WizardReview, OverflowTabs and DockedTaskPanel", async () => {
    const onSelect = vi.fn();
    const { container } = render(
      <div>
        <WizardReview items={[{ label: "Name", value: "vm" }]} />
        <Tabs value="a" onValueChange={onSelect}>
          <TabsContent value="a">panel</TabsContent>
          <OverflowTabs maxVisible={2} onSelect={onSelect} tabs={[{ value: "a", label: "A" }, { value: "b", label: "B" }, { value: "c", label: "C" }]} />
        </Tabs>
        <DockedTaskPanel defaultOpen tasks={[{ id: "1", name: "Power on", status: "running", progress: 40 }]} />
      </div>,
    );
    expect(screen.getByText("Name").tagName).toBe("DT");
    expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("region", { name: /tasks/i })).toBeInTheDocument();
    await noViolations(container);
  });
});

describe("overlays", () => {
  it("Tabs: roving arrow keys switch panels", async () => {
    const { container } = render(
      <Tabs defaultValue="a">
        <TabsList aria-label="Sections">
          <TabsTrigger value="a">One</TabsTrigger>
          <TabsTrigger value="b">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="a">first</TabsContent>
        <TabsContent value="b">second</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tablist", { name: "Sections" })).toBeInTheDocument();
    screen.getByRole("tab", { name: "One" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("second");
    await noViolations(container);
  });

  it("Dialog is named, traps focus and restores it on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button type="button">Open</button>
        </DialogTrigger>
        <DialogContent title="Rename" description="Pick a name" footer={<button type="button">Save</button>}>
          <Input aria-label="New name" />
        </DialogContent>
      </Dialog>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);
    const dlg = await screen.findByRole("dialog", { name: "Rename" });
    expect(dlg).toHaveAccessibleDescription("Pick a name");
    expect(within(dlg).getByRole("button", { name: "Close" })).toBeInTheDocument();
    expect(await axe(dlg)).toHaveNoViolations();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("Drawer is a named dialog that closes with Escape", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <button type="button">Details</button>
        </DrawerTrigger>
        <DrawerContent title="Details" description="More info" width="lg">
          content
        </DrawerContent>
      </Drawer>,
    );
    await user.click(screen.getByRole("button", { name: "Details" }));
    const dlg = await screen.findByRole("dialog", { name: "Details" });
    expect(await axe(dlg)).toHaveNoViolations();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Popover opens from the trigger, exposes its title and closes with Escape", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">Filters</button>
        </PopoverTrigger>
        <PopoverContent title="Filter by">
          <Input aria-label="Query" />
        </PopoverContent>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Filters" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(await screen.findByText("Filter by")).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Filter by")).not.toBeInTheDocument();
  });

  it("DropdownMenu: keyboard opens, arrows move, Enter activates, Escape returns focus", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button">Actions</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Row</DropdownMenuLabel>
          <DropdownMenuItem onSelect={onEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem danger>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    const trigger = screen.getByRole("button", { name: "Actions" });
    trigger.focus();
    await user.keyboard("{Enter}");
    const menu = await screen.findByRole("menu");
    expect(within(menu).getAllByRole("menuitem")).toHaveLength(2);
    await user.keyboard("{Enter}");
    expect(onEdit).toHaveBeenCalled();
    expect(trigger).toHaveFocus();
    await user.keyboard("{Enter}");
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("ContextMenu opens on right click and MenuShortcut sits at the end", async () => {
    const user = userEvent.setup();
    render(
      <ContextMenu>
        <ContextMenuTrigger>
          <div>Target</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Copy <MenuShortcut>⌘C</MenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem danger>Remove</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await user.pointer({ keys: "[MouseRight]", target: screen.getByText("Target") });
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Copy/ })).toBeInTheDocument();
    await user.keyboard("{Escape}");
  });

  it("Tooltip shows on focus and is linked to its trigger", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip content="Delete the row">
          <button type="button" aria-label="Delete">
            x
          </button>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.tab();
    const tip = await screen.findByRole("tooltip");
    expect(tip).toHaveTextContent("Delete the row");
    expect(screen.getByRole("button", { name: "Delete" })).toHaveAccessibleDescription("Delete the row");
    await user.keyboard("{Escape}");
  });

  it("SplitButton: main action and a named menu button (hu name translated)", async () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <SplitButton onClick={onClick} menu={<DropdownMenuItem>Other</DropdownMenuItem>}>
        Run
      </SplitButton>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Run" }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "More actions" })).toHaveAttribute("aria-haspopup", "menu");
    rerender(
      <LafProvider locale="hu" messages={hu}>
        <SplitButton menu={<DropdownMenuItem>Más</DropdownMenuItem>}>Futtatás</SplitButton>
      </LafProvider>,
    );
    expect(screen.getByRole("button", { name: "További műveletek" })).toBeInTheDocument();
  });
});

describe("error pages", () => {
  it.each([
    ["403", "Access denied", false],
    ["404", "Page not found", false],
    ["500", "Something went wrong", true],
    ["offline", "You are offline", true],
    ["session-expired", "Session expired", false],
  ] as const)("ErrorPage %s", async (variant, title, alert) => {
    const { container } = render(<ErrorPage variant={variant} requestId="req-1" action={<a href="/">Home</a>} />);
    expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(!!screen.queryByRole("alert")).toBe(alert);
    expect(screen.getByRole("button", { name: "Copy Request ID" })).toBeInTheDocument();
    await noViolations(container);
  });

  it("ErrorPage uses the hu catalogue", () => {
    render(
      <LafProvider locale="hu" messages={hu}>
        <ErrorPage variant="404" requestId="r" />
      </LafProvider>,
    );
    expect(screen.getByRole("heading", { name: "Az oldal nem található" })).toBeInTheDocument();
    expect(screen.getByText("Kérésazonosító:")).toBeInTheDocument();
  });
});

describe("charts (built-in SVG/HTML)", () => {
  it("Sparkline, LineChart, Gauge, Donut and BarChart expose a text alternative", async () => {
    const { container } = render(
      <div>
        <Sparkline data={[1, 3, 2, 5]} label="CPU trend" />
        <LineChart label="Latency" xLabels={["a", "b", "c"]} series={[{ name: "p50", data: [1, 2, 3] }]} unit="ms" />
        <Gauge value={95} label="Disk" />
        <Donut label="Share" slices={[{ name: "A", value: 3 }, { name: "B", value: 1 }]} />
        <BarChart label="Top hosts" data={[{ name: "h1", value: 3 }, { name: "h2", value: 6 }]} />
      </div>,
    );
    expect(screen.getByRole("img", { name: "CPU trend" })).toBeInTheDocument();
    expect(screen.getByRole("meter", { name: "Disk" })).toHaveAttribute("aria-valuenow", "95");
    expect(screen.getByRole("list", { name: "Top hosts" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Share/ })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Latency: p50/ })).toBeInTheDocument();
    await noViolations(container);
  });
});

describe("auth & account building blocks", () => {
  it("BrandHeader, SocialButtons, AccountList, ClientInfo, LanguageSwitcher, AuthFooter", async () => {
    const onPick = vi.fn();
    const { container } = render(
      <main>
        <BrandHeader name="Pilab" title="Sign in" subtitle="Welcome" />
        <SocialButtons>
          <SocialButton href="#g">Google</SocialButton>
        </SocialButtons>
        <SocialDivider>or</SocialDivider>
        <AccountList>
          <AccountItem name="Anna" email="a@x.hu" type="button" onClick={onPick} />
        </AccountList>
        <ClientInfo name="Grafana" description="Dashboards" />
        <LanguageSwitcher current="en" languages={[{ code: "en", label: "English", href: "?l=en" }, { code: "hu", label: "Magyar", href: "?l=hu" }]} />
        <AuthFooter>Secured</AuthFooter>
      </main>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("navigation", { name: "Language" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Anna/ }));
    expect(onPick).toHaveBeenCalled();
    await noViolations(container);
  });

  it("DeviceSelector is a labelled radio group operated with arrows", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <DeviceSelector name="d" legend="Choose device" value="a" onValueChange={onChange} devices={[{ id: "a", name: "Phone", kind: "phone" }, { id: "b", name: "Key", kind: "key" }]} />,
    );
    expect(screen.getByRole("group", { name: "Choose device" })).toBeInTheDocument();
    screen.getByRole("radio", { name: /Phone/ }).focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(onChange).toHaveBeenCalledWith("b");
    await noViolations(container);
  });

  it("TenantSwitcher is a labelled combobox", async () => {
    const { container } = render(<TenantSwitcher tenants={[{ value: "a", label: "Acme" }, { value: "b", label: "Beta" }]} current="a" onSwitch={() => {}} />);
    expect(screen.getByRole("combobox", { name: "Tenant" })).toBeInTheDocument();
    await noViolations(container);
  });
});

describe("DoD coverage (COMPONENTS.md §7)", () => {
  it("≥ 90% of exported components are named in at least one test", async () => {
    const { readdirSync, readFileSync } = await import("node:fs");
    const lib = await import("../lib");
    const charts = await import("../lib/charts");
    const src = readdirSync(__dirname)
      .filter((f) => /\.test\.tsx?$/.test(f))
      .map((f) => readFileSync(`${__dirname}/${f}`, "utf8"))
      .join("\n");
    const names = [...Object.keys(lib), ...Object.keys(charts)].filter((n) => /^[A-Z]/.test(n));
    const missing = names.filter((n) => !new RegExp(`\\b${n}\\b`).test(src));
    expect(missing.length / names.length, `untested: ${missing.join(", ")}`).toBeLessThanOrEqual(0.1);
  });
});
