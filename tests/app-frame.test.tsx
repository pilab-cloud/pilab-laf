import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AppFrameDemo from "../playground/pages/AppFrame";
import {
  AppFooter,
  AppFrame,
  Breadcrumb,
  DrawerPanel,
  InlineDrawer,
  Masthead,
  MastheadActions,
  MastheadBrand,
  MastheadContent,
  MastheadToggle,
  NavTree,
  PageHeader,
  PageSection,
  Sidebar,
  ThemeToggle,
  TopBar,
  TruncatedText,
  type NavEntry,
} from "../lib";

const items: NavEntry[] = [
  { type: "heading", id: "h", label: "Artifacts" },
  { id: "dash", label: "Dashboard", current: true },
  {
    id: "pkgs",
    label: "Packages",
    children: [
      { id: "deb", label: "Debian" },
      { id: "rpm", label: "RPM", children: [{ id: "rpm-x", label: "Fedora" }] },
    ],
  },
  { type: "divider" },
  { id: "off", label: "Offline", disabled: true },
  { id: "tok", label: "Tokens" },
];

function mockMedia(narrow: boolean) {
  window.matchMedia = ((q: string) => ({
    matches: narrow,
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    onchange: null,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  localStorage.clear();
  // @ts-expect-error reset the mock
  delete window.matchMedia;
  document.documentElement.removeAttribute("data-theme");
});

describe("NavTree", () => {
  it("has nav semantics, current page, one tab stop and nested expansion", async () => {
    const user = userEvent.setup();
    const { container } = render(<NavTree items={items} label="Main" />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByText("Dashboard").closest("[aria-current]")).toHaveAttribute("aria-current", "page");
    const group = screen.getByRole("button", { name: /Packages/ });
    expect(group).toHaveAttribute("aria-expanded", "false");
    await user.click(group);
    expect(group).toHaveAttribute("aria-expanded", "true");
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("moves with arrows/Home/End, expands and collapses with Left/Right, skips disabled", async () => {
    const user = userEvent.setup();
    render(<NavTree items={items} label="Main" />);
    await user.tab();
    expect(screen.getByRole("button", { name: "Dashboard" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    const group = screen.getByRole("button", { name: /Packages/ });
    expect(group).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(group).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Debian" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(group).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(group).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{End}");
    expect(screen.getByRole("button", { name: "Tokens" })).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(group).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("button", { name: "Dashboard" })).toHaveFocus();
  });

  it("type-ahead focuses the matching item", async () => {
    const user = userEvent.setup();
    render(<NavTree items={items} label="Main" />);
    await user.tab();
    await user.keyboard("t");
    expect(screen.getByRole("button", { name: "Tokens" })).toHaveFocus();
  });

  it("supports controlled expansion and onSelect", async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    const onSelect = vi.fn();
    render(<NavTree items={[{ id: "g", label: "Group", children: [{ id: "c", label: "Child", onSelect }] }]} label="Main" expanded={[]} onExpandedChange={onExpandedChange} />);
    await user.click(screen.getByRole("button", { name: /Group/ }));
    expect(onExpandedChange).toHaveBeenCalledWith(["g"]);
    expect(screen.getByRole("button", { name: /Group/ })).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Sidebar", () => {
  it("renders an object tree in tree mode and switches views", async () => {
    const user = userEvent.setup();
    render(
      <Sidebar
        items={items}
        label="Main"
        tree={{ label: "Objects", nodes: [{ id: "a", label: "Alpha", children: [{ id: "a1", label: "Alpha one" }] }], defaultExpanded: ["a"] }}
        footer={<span>Local Dev</span>}
      />,
    );
    expect(screen.getByText("Local Dev")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Objects" }));
    expect(screen.getByRole("tree", { name: "Objects" })).toBeInTheDocument();
    expect(screen.getByRole("treeitem", { name: /Alpha one/ })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Navigation" }));
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });
});

function Frame(props: Partial<React.ComponentProps<typeof AppFrame>>) {
  return (
    <AppFrame
      persistKey="t-frame"
      masthead={
        <Masthead>
          <MastheadToggle />
          <MastheadBrand href="/" title="Repisitory" />
          <MastheadContent>search</MastheadContent>
          <MastheadActions>
            <ThemeToggle />
          </MastheadActions>
        </Masthead>
      }
      sidebar={<Sidebar items={items} label="Main" railFooter={<span>rail</span>} />}
      breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Here" }]} />}
      pageHeader={<PageHeader title="Title" subtitle="Sub" />}
      footer={<AppFooter copyright="© Pilab" />}
      {...props}
    >
      <PageSection aria-label="Body">content</PageSection>
    </AppFrame>
  );
}

describe("AppFrame", () => {
  it("has landmarks, a skip link and no axe violations", async () => {
    const { container } = render(<Frame />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("navigation").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", `#${screen.getByRole("main").id}`);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("collapses the sidebar and remembers it", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Frame />);
    const toggle = screen.getByRole("button", { name: "Collapse sidebar" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toHaveAttribute("aria-expanded", "false");
    unmount();
    render(<Frame />);
    expect(screen.getByRole("button", { name: "Expand sidebar" })).toBeInTheDocument();
  });

  it("rail mode keeps the top-level icons labelled", async () => {
    const user = userEvent.setup();
    render(<Frame sidebarCollapse="rail" />);
    await user.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(screen.getByRole("button", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Debian" })).toBeNull();
  });

  it("becomes an overlay drawer on narrow screens, closes with Escape", async () => {
    mockMedia(true);
    const user = userEvent.setup();
    render(<Frame />);
    const open = screen.getByRole("button", { name: "Open navigation" });
    expect(open).toHaveAttribute("aria-expanded", "false");
    await user.click(open);
    expect(screen.getByRole("button", { name: "Dashboard" })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  });

  it("hosts a drawer panel that closes with its button", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Frame drawer={<DrawerPanel open title="Details" onOpenChange={onOpenChange} resizable />} />);
    expect(screen.getByRole("complementary", { name: "Details" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close panel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders the full playground demo accessibly", async () => {
    const { container } = render(<AppFrameDemo />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Masthead", () => {
  it("renders the brand as a link and works standalone", () => {
    render(
      <Masthead>
        <MastheadBrand href="/home" title="Brand" subtitle="Sub" />
        <MastheadActions>
          <TopBar as="div" logo="x" />
        </MastheadActions>
      </Masthead>,
    );
    expect(screen.getByRole("link", { name: /Brand/ })).toHaveAttribute("href", "/home");
    expect(screen.getAllByRole("banner")).toHaveLength(1);
  });
});

describe("ThemeToggle", () => {
  it("is uncontrolled, sets data-theme and persists", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle persistKey="t-theme" variant="segmented" />);
    await user.click(screen.getByRole("button", { name: "Dark" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("t-theme")).toContain("dark");
  });

  it("is controlled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ThemeToggle value="dark" onChange={onChange} variant="segmented" />);
    await user.click(screen.getByRole("button", { name: "System" }));
    expect(onChange).toHaveBeenCalledWith("system");
    expect(screen.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Breadcrumb", () => {
  it("supports onClick, render, current override and a custom separator", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(
      <Breadcrumb
        separator="/"
        items={[
          { label: "A", href: "#a", onClick },
          { label: "B", href: "#b", render: (p) => <a {...p} data-router="1" /> },
          { label: "C", current: true },
          { label: "D" },
        ]}
      />,
    );
    await user.click(screen.getByRole("link", { name: "A" }));
    expect(onClick).toHaveBeenCalled();
    expect(container.querySelector("[data-router]")).not.toBeNull();
    expect(screen.getByText("C").closest("[aria-current]")).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByText("/").length).toBeGreaterThan(0);
  });
});

describe("AppFooter, PageHeader, TruncatedText, InlineDrawer", () => {
  it("renders slots, links, status and build info in a footer", () => {
    render(<AppFooter copyright="© Pilab" version="1.2.3" build={{ commit: "abc123" }} links={[{ label: "Docs", href: "/docs" }]} status={{ tone: "ok", label: "Operational" }} variant="compact" />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent("© Pilab");
    expect(footer).toHaveTextContent("1.2.3");
    expect(footer).toHaveTextContent("abc123");
    expect(footer).toHaveTextContent("Operational");
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
  });

  it("PageHeader renders a heading, subtitle and actions without a banner landmark", () => {
    render(<PageHeader title="Packages" subtitle="All of them" actions={<button>Go</button>} />);
    expect(screen.getByRole("heading", { name: "Packages" })).toBeInTheDocument();
    expect(screen.getByText("All of them")).toBeInTheDocument();
    expect(screen.queryByRole("banner")).toBeNull();
  });

  it("TruncatedText renders its text", () => {
    render(<TruncatedText>Long label</TruncatedText>);
    expect(screen.getByText("Long label")).toBeInTheDocument();
  });

  it("InlineDrawer resizes with the keyboard", async () => {
    const user = userEvent.setup();
    const onSizeChange = vi.fn();
    render(<InlineDrawer open title="Panel" resizable defaultSize={300} onSizeChange={onSizeChange} />);
    const sep = screen.getByRole("separator");
    await act(async () => sep.focus());
    await user.keyboard("{ArrowLeft}");
    await user.keyboard("{ArrowRight}");
    expect(onSizeChange).toHaveBeenCalled();
  });
});
