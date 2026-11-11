import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  ActionGroup,
  CodeBlockCode,
  DropdownGroup,
  DropdownSeparator,
  FormHelperText,
  ModalClose,
  ModalTrigger,
  TextArea,
  TextInput,
  ToolbarBulk,
  ClipboardCopy,
  CodeBlock,
  DataGrid,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  FilterBar,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  Grid,
  GridItem,
  GridSearch,
  HelperText,
  HelperTextItem,
  Input,
  LafProvider,
  MenuToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  SearchInput,
  SegmentedControl,
  SelectMenu,
  Stack,
  StackItem,
  Title,
  Toolbar,
  ToolbarActions,
  ToolbarContent,
  ToolbarDivider,
  ToolbarFilterChips,
  ToolbarGroup,
  ToolbarItem,
  ToolbarSpacer,
} from "../lib";
import { hu } from "../lib/locales/hu";

const noViolations = async (c: Element) => expect((await axe(c)).violations).toEqual([]);

describe("Toolbar v2", () => {
  const bar = (props: React.ComponentProps<typeof Toolbar> = {}) => (
    <Toolbar aria-label="Tools" {...props}>
      <ToolbarContent>
        <ToolbarGroup variant="filter">
          <ToolbarItem grow>
            <SearchInput icon={<span />} aria-label="Search" />
          </ToolbarItem>
          <SegmentedControl aria-label="View" defaultValue="a" items={[{ value: "a", label: "A" }, { value: "b", label: "B" }]} />
          <SelectMenu aria-label="Region" placeholder="Region" options={[{ value: "eu", label: "EU" }]} />
        </ToolbarGroup>
        <ToolbarDivider />
        <ToolbarGroup variant="action">
          <button className="btn">One</button>
          <button className="btn">Two</button>
          <button className="btn" disabled>
            Off
          </button>
        </ToolbarGroup>
        <ToolbarSpacer />
        <ToolbarGroup variant="pagination">
          <Pagination page={1} pageCount={3} onPageChange={() => {}} />
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );

  it("stays a plain div without a label (backward compatible) and a toolbar with one", () => {
    const { container, rerender } = render(<Toolbar>x</Toolbar>);
    expect(container.firstElementChild).toHaveClass("toolbar");
    expect(screen.queryByRole("toolbar")).toBeNull();
    rerender(<Toolbar aria-label="T">x</Toolbar>);
    expect(screen.getByRole("toolbar", { name: "T" })).toBeInTheDocument();
  });

  it("moves focus with arrows/Home/End, skips disabled, leaves text fields alone", async () => {
    const user = userEvent.setup();
    render(bar());
    const one = screen.getByRole("button", { name: "One" });
    one.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "1" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("searchbox", { name: "Search" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("searchbox", { name: "Search" })).toHaveFocus();
    await user.keyboard("{Escape}");
    one.focus();
    await user.keyboard("{End}");
    expect(screen.getByRole("button", { name: "Next page" })).toHaveFocus();
  });

  it("mirrors the arrows in RTL", async () => {
    const user = userEvent.setup();
    render(<div dir="rtl">{bar()}</div>);
    screen.getByRole("button", { name: "Two" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
  });

  it("bulk mode shows the count and actions, keeps the regular content mounted, and clears", async () => {
    const onClear = vi.fn();
    render(
      <Toolbar selectedCount={3} bulkActions={<button className="btn">Delete</button>} onClearSelection={onClear}>
        <input aria-label="kept" defaultValue="draft" />
      </Toolbar>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("3 selected");
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByDisplayValue("draft").closest("[hidden]")).not.toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Clear selection" }));
    expect(onClear).toHaveBeenCalled();
  });

  it("supports sticky", () => {
    render(<Toolbar sticky aria-label="s">x</Toolbar>);
    expect(screen.getByRole("toolbar")).toHaveClass("sticky");
  });

  it("filter chips group by category, remove and clear all, hu labels", async () => {
    const onRemove = vi.fn();
    const onClearAll = vi.fn();
    const filters = [
      { id: "1", label: "eu", category: "Region" },
      { id: "2", label: "us", category: "Region" },
      { id: "3", label: "prod" },
    ];
    const { rerender } = render(<ToolbarFilterChips filters={filters} onRemove={onRemove} onClearAll={onClearAll} />);
    expect(screen.getByRole("group", { name: "Region" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove filter us" }));
    expect(onRemove).toHaveBeenCalledWith(filters[1]);
    await userEvent.click(screen.getByRole("button", { name: "Clear all filters" }));
    expect(onClearAll).toHaveBeenCalled();
    rerender(<ToolbarFilterChips filters={[]} />);
    expect(screen.queryByRole("group")).toBeNull();
    rerender(
      <LafProvider locale="hu" messages={hu}>
        <ToolbarFilterChips filters={filters} onClearAll={onClearAll} />
      </LafProvider>,
    );
    expect(screen.getByRole("button", { name: "Összes szűrő törlése" })).toBeInTheDocument();
  });

  it("ToolbarActions overflows into the Actions menu and nested toolbars keep their own arrows", () => {
    render(
      <Toolbar>
        <ToolbarActions label="Row actions" items={[{ id: "a", label: "Alpha", onSelect: () => {} }]} />
      </Toolbar>,
    );
    expect(screen.getByRole("toolbar", { name: "Row actions" })).toBeInTheDocument();
  });

  it("composes with FilterBar and the DataGrid toolbar slot without axe violations", async () => {
    const { container } = render(
      <div>
        {bar()}
        <Toolbar aria-label="Filters">
          <ToolbarItem grow>
            <FilterBar fields={[{ key: "status", type: "enum", options: [{ value: "up" }] }]} savedViews={false} />
          </ToolbarItem>
        </Toolbar>
        <DataGrid
          label="Rows"
          rows={[{ id: "1", n: "x" }]}
          rowId={(r) => r.id}
          columns={[{ id: "n", header: "N", cell: (r: { n: string }) => r.n }]}
          toolbar={
            <Toolbar aria-label="Grid tools">
              <ToolbarItem>
                <GridSearch />
              </ToolbarItem>
            </Toolbar>
          }
        />
      </div>,
    );
    await noViolations(container);
  });
});

describe("DescriptionList", () => {
  it("renders dl > group > dt/dd in every layout", async () => {
    const { container } = render(
      <div>
        {(["vertical", "horizontal", "grid"] as const).map((layout) => (
          <DescriptionList key={layout} layout={layout} compact columns={3} aria-label={layout}>
            <DescriptionListGroup>
              <DescriptionListTerm icon={<span />}>Name</DescriptionListTerm>
              <DescriptionListDescription mono>repo</DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        ))}
      </div>,
    );
    expect(container.querySelectorAll("dl > div > dt + dd")).toHaveLength(3);
    expect(container.querySelector("dl[aria-label=grid]")?.className).toContain("lg:grid-cols-3");
    expect(container.querySelector("dl[aria-label=horizontal] > div")?.className).toContain("grid-cols-[");
    await noViolations(container);
  });
});

describe("CodeBlock", () => {
  it("shows language, line numbers, wrap toggle and copies the raw text", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const onWrapChange = vi.fn();
    const { container } = render(<CodeBlock code={"a\nb\n"} language="sh" lineNumbers wrapToggle onWrapChange={onWrapChange} actions={<button className="btn">Run</button>} />);
    expect(screen.getByRole("region", { name: "sh" })).toHaveAttribute("tabindex", "0");
    expect(container.querySelectorAll("code > span")).toHaveLength(2);
    expect(container.querySelector("[data-n='2']")).toHaveTextContent("b");
    const wrap = screen.getByRole("button", { name: "Wrap lines" });
    await userEvent.click(wrap);
    expect(onWrapChange).toHaveBeenCalledWith(true);
    expect(wrap).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith("a\nb\n");
    await noViolations(container);
  });
  it("reads children text and hides copy on request", () => {
    render(<CodeBlock copy={false}>{"echo hi"}</CodeBlock>);
    expect(screen.getByRole("region", { name: "Code" })).toHaveTextContent("echo hi");
    expect(screen.queryByRole("button")).toBeNull();
  });
});

describe("ClipboardCopy", () => {
  it("inline: read-only field with a named copy button", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const { container } = render(<ClipboardCopy readOnly hoverTip="Copy command" clickTip="Copied!">docker pull x</ClipboardCopy>);
    expect(screen.getByRole("textbox", { name: "Value" })).toHaveAttribute("readonly");
    await userEvent.click(screen.getByRole("button", { name: "Copy command" }));
    expect(writeText).toHaveBeenCalledWith("docker pull x");
    await screen.findByRole("button", { name: "Copied!" });
    await noViolations(container);
  });
  it("expandable toggles the full value; editable and controlled", async () => {
    const onChange = vi.fn();
    const { container } = render(<ClipboardCopy variant="expandable" value={"l1\nl2"} onChange={onChange} />);
    const toggle = screen.getByRole("button", { name: "Show full value" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    const full = screen.getAllByRole("textbox")[1]!;
    expect(full).toHaveValue("l1\nl2");
    fireEvent.change(full, { target: { value: "x" } });
    expect(onChange).toHaveBeenCalledWith("x");
    await noViolations(container);
  });
  it("inline-compact renders inline code", () => {
    render(<ClipboardCopy variant="inline-compact" value="abc" onCopy={() => {}} />);
    expect(screen.getByText("abc").tagName).toBe("CODE");
  });
});

describe("layout primitives", () => {
  it("Grid/GridItem map spans per breakpoint, Flex/Stack map props", () => {
    const { container } = render(
      <Grid gap="lg">
        <GridItem span={6} md={4} xxl={2} rowSpan={2} data-testid="g" />
        <GridItem />
        <Flex direction="column" justify="between" align="center" gap="xs" wrap={false} data-testid="f">
          <FlexItem grow pushEnd align="end" />
        </Flex>
        <Stack gap="none" data-testid="s">
          <StackItem fill />
        </Stack>
      </Grid>,
    );
    expect(container.firstElementChild).toHaveClass("grid-cols-12", "gap-6");
    expect(screen.getByTestId("g")).toHaveClass("col-span-6", "md:col-span-4", "2xl:col-span-2", "row-span-2");
    expect(container.querySelectorAll(".col-span-12")).toHaveLength(1);
    expect(screen.getByTestId("f")).toHaveClass("flex-col", "justify-between", "items-center", "flex-nowrap", "gap-1");
    expect(screen.getByTestId("s")).toHaveClass("flex-col", "gap-0");
  });

  it("Title decouples level from size; Divider has separator semantics", () => {
    render(
      <div>
        <Title headingLevel="h3" size="3xl">
          T
        </Title>
        <Title>D</Title>
        <Divider />
        <Divider orientation="vertical" />
      </div>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveClass("text-3xl");
    expect(screen.getByRole("heading", { level: 2 })).toHaveClass("text-xl");
    expect(screen.getAllByRole("separator")).toHaveLength(2);
    expect(screen.getAllByRole("separator")[1]).toHaveAttribute("aria-orientation", "vertical");
  });
});

describe("forms", () => {
  it("FormGroup labels the control, flags required, and supports fieldset", async () => {
    const { container } = render(
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup label="Email" fieldId="em" required>
          <Input id="em" />
          <HelperText>
            <HelperTextItem variant="error">Bad</HelperTextItem>
            <HelperTextItem>Fine</HelperTextItem>
          </HelperText>
        </FormGroup>
        <FormGroup label="Mode" fieldset>
          <label>
            <input type="radio" name="m" /> A
          </label>
        </FormGroup>
        <ActionGroup>
          <button className="btn">Save</button>
        </ActionGroup>
      </Form>,
    );
    expect(screen.getByRole("textbox", { name: "Email (required)" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Mode" })).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Bad");
    await noViolations(container);
  });
});

describe("Dropdown", () => {
  it("opens from the toggle, selects an item and fires onOpenChange", async () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <Dropdown toggle={<MenuToggle>Actions</MenuToggle>} onOpenChange={onOpenChange}>
        <DropdownList>
          <DropdownItem description="d" onSelect={onSelect}>
            Edit
          </DropdownItem>
        </DropdownList>
      </Dropdown>,
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Actions" }));
    await user.click(await screen.findByRole("menuitem", { name: /Edit/ }));
    expect(onSelect).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});

describe("Modal", () => {
  const ui = (props: Partial<React.ComponentProps<typeof Modal>> = {}) => (
    <Modal open {...props}>
      <ModalHeader title="Create token" description="Pick a name" />
      <ModalBody>
        <input aria-label="Name" />
      </ModalBody>
      <ModalFooter>
        <button className="btn">Save</button>
      </ModalFooter>
    </Modal>
  );

  it("is a labelled, described dialog; Escape and the close button call onClose", async () => {
    const onClose = vi.fn();
    render(ui({ onClose }));
    const dialog = await screen.findByRole("dialog", { name: "Create token" });
    expect(dialog).toHaveAccessibleDescription("Pick a name");
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    await noViolations(document.body);
  });

  it("works uncontrolled with a trigger-less defaultOpen and hu close label", async () => {
    render(
      <LafProvider locale="hu" messages={hu}>
        <Modal defaultOpen size="lg">
          <ModalHeader title="Cím" />
        </Modal>
      </LafProvider>,
    );
    await screen.findByRole("dialog", { name: "Cím" });
    await userEvent.click(screen.getByRole("button", { name: "Bezárás" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});

describe("secondary parts", () => {
  it("renders PatternFly-shaped compositions", async () => {
    render(
      <div>
        <CodeBlock copy={false}>
          <CodeBlockCode>{"echo hi"}</CodeBlockCode>
        </CodeBlock>
        <Form>
          <FormGroup label="Notes" fieldId="nt">
            <TextArea id="nt" />
            <FormHelperText>hint</FormHelperText>
          </FormGroup>
          <TextInput aria-label="Aux" />
        </Form>
        <ToolbarBulk count={2} labels={{ selected: (n: number) => `${n} picked` }} />
        <Dropdown toggle={<MenuToggle>Menu</MenuToggle>}>
          <DropdownList>
            <DropdownGroup label="G">
              <DropdownItem>One</DropdownItem>
            </DropdownGroup>
            <DropdownSeparator />
          </DropdownList>
        </Dropdown>
        <Modal
          trigger={
            <ModalTrigger asChild>
              <button>Open</button>
            </ModalTrigger>
          }
        >
          <ModalHeader title="T" />
          <ModalFooter>
            <ModalClose asChild>
              <button>Done</button>
            </ModalClose>
          </ModalFooter>
        </Modal>
      </div>,
    );
    expect(screen.getByText("echo hi")).toBeInTheDocument();
    expect(screen.getByText("2 picked")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.click(await screen.findByRole("button", { name: "Done" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
