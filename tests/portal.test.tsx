import { act, render, renderHook, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";
import PortalDemo from "../playground/pages/Portal";
import {
  PortalHome,
  PortalLayout,
  ServerDataGrid,
  portalBreadcrumbs,
  portalNavEntries,
  resolvePortalRoute,
  serverGridFromSearchParams,
  serverGridToSearchParams,
  useServerGrid,
  type PortalRoute,
  type ServerGridFetcher,
  type ServerGridRequest,
} from "../lib";

afterEach(() => {
  vi.useRealTimers();
  window.history.replaceState(null, "", "/");
});

interface Row {
  id: number;
}

function deferred() {
  const calls: { req: ServerGridRequest; resolve: (rows: Row[], total?: number) => void; reject: (e: unknown) => void }[] = [];
  const fetcher: ServerGridFetcher<Row> = (req) =>
    new Promise((resolve, reject) => {
      calls.push({ req, resolve: (rows, total = rows.length) => resolve({ rows, total }), reject });
      req.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    });
  return { calls, fetcher };
}

describe("useServerGrid", () => {
  it("fetches, sorts and resets to page 1 on sort", async () => {
    const { calls, fetcher } = deferred();
    const { result } = renderHook(() => useServerGrid<Row>({ fetcher, pageSize: 5 }));
    expect(result.current.initialLoading).toBe(true);
    await act(async () => calls[0]!.resolve([{ id: 1 }], 20));
    expect(result.current.rows).toEqual([{ id: 1 }]);
    expect(result.current.total).toBe(20);
    act(() => result.current.setPage(3));
    expect(calls.at(-1)!.req.page).toBe(3);
    await act(async () => calls.at(-1)!.resolve([{ id: 2 }], 20));
    act(() => result.current.setSort([{ id: "a", dir: "asc" }, { id: "b", dir: "desc" }]));
    const last = calls.at(-1)!.req;
    expect(last.page).toBe(1);
    expect(last.sort).toEqual([{ id: "a", dir: "asc" }, { id: "b", dir: "desc" }]);
  });

  it("keeps previous rows while loading (stale)", async () => {
    const { calls, fetcher } = deferred();
    const { result } = renderHook(() => useServerGrid<Row>({ fetcher }));
    await act(async () => calls[0]!.resolve([{ id: 1 }]));
    act(() => result.current.setSort([{ id: "a", dir: "asc" }]));
    expect(result.current.loading).toBe(true);
    expect(result.current.rows).toEqual([{ id: 1 }]);
    expect(result.current.stale).toBe(true);
  });

  it("aborts the previous request and ignores its late result", async () => {
    const { calls, fetcher } = deferred();
    const { result } = renderHook(() => useServerGrid<Row>({ fetcher }));
    const first = calls[0]!;
    act(() => result.current.setPage(2));
    expect(first.req.signal.aborted).toBe(true);
    await act(async () => calls.at(-1)!.resolve([{ id: 2 }]));
    await act(async () => first.resolve([{ id: 1 }]));
    expect(result.current.rows).toEqual([{ id: 2 }]);
    expect(result.current.error).toBeFalsy();
  });

  it("surfaces errors and recovers on refresh", async () => {
    const { calls, fetcher } = deferred();
    const { result } = renderHook(() => useServerGrid<Row>({ fetcher }));
    await act(async () => calls[0]!.reject(new Error("boom")));
    expect(result.current.error).toBeTruthy();
    act(() => result.current.refresh());
    await act(async () => calls.at(-1)!.resolve([{ id: 7 }]));
    expect(result.current.error).toBeFalsy();
    expect(result.current.rows).toEqual([{ id: 7 }]);
  });

  it("debounces search and resets the page", async () => {
    vi.useFakeTimers();
    const { calls, fetcher } = deferred();
    const { result } = renderHook(() => useServerGrid<Row>({ fetcher, debounceMs: 300 }));
    await act(async () => calls[0]!.resolve([]));
    const before = calls.length;
    act(() => result.current.setSearch("a"));
    act(() => result.current.setSearch("ab"));
    act(() => void vi.advanceTimersByTime(299));
    expect(calls.length).toBe(before);
    act(() => void vi.advanceTimersByTime(2));
    expect(calls.length).toBe(before + 1);
    expect(calls.at(-1)!.req.search).toBe("ab");
  });

  it("round-trips state through search params", () => {
    const q = { sort: [{ id: "a", dir: "desc" as const }], page: 2, pageSize: 25, filters: [], search: "x y" };
    const sp = serverGridToSearchParams(q, new URLSearchParams(), { pageSize: 10, sort: [] });
    expect(serverGridFromSearchParams(sp, { pageSize: 10 })).toMatchObject(q);
  });
});

const routes: PortalRoute[] = [
  { path: "/", title: "Home" },
  {
    path: "/users",
    title: "Users",
    section: "Directory",
    tabs: [
      { path: "/users", title: "All" },
      { path: "/users/invites", title: "Invitations" },
    ],
    children: [{ path: "/users/:id", title: "User", hidden: true }],
  },
  { path: "/settings", title: "Settings", section: "Admin", children: [{ path: "/settings/security", title: "Security" }] },
];

describe("portal routes", () => {
  it("resolves params, tabs and prefixes", () => {
    expect(resolvePortalRoute(routes, "/users/u3").params).toEqual({ id: "u3" });
    expect(resolvePortalRoute(routes, "/users/invites").tab?.title).toBe("Invitations");
    expect(resolvePortalRoute(routes, "/settings/security").route?.title).toBe("Security");
    expect(resolvePortalRoute(routes, "/nope").route).toBeUndefined();
  });

  it("derives breadcrumbs", () => {
    const labels = (p: string) => portalBreadcrumbs(routes, p, { homeLabel: "Home" }).map((c) => c.label);
    expect(labels("/")).toEqual([]);
    expect(labels("/settings/security")).toEqual(["Home", "Settings", "Security"]);
    expect(labels("/users/invites")).toEqual(["Home", "Users", "Invitations"]);
  });

  it("marks the nav entry of the current route", () => {
    const flat = (p: string) => JSON.stringify(portalNavEntries(routes, p));
    expect(flat("/settings/security")).toContain('"current":true');
    expect(flat("/users/u3")).toContain("Users");
  });
});

describe("PortalLayout", () => {
  const apps = [{ id: "a", name: "Alpha app", description: "First" }];
  it("renders breadcrumb, current nav item and navigates", async () => {
    const onNavigate = vi.fn();
    render(
      <PortalLayout brand={{ title: "Pilab" }} routes={routes} path="/settings/security" onNavigate={onNavigate} apps={apps} user={{ name: "Paál Gyula" }}>
        <p>content</p>
      </PortalLayout>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Security" })).toBeTruthy();
    expect(document.querySelector('[aria-current="page"]')).toBeTruthy();
    await userEvent.click(screen.getAllByRole("link", { name: "Settings" })[0]!);
    expect(onNavigate).toHaveBeenCalledWith("/settings");
  });

  it("has no a11y violations", async () => {
    const { container } = render(
      <PortalLayout brand={{ title: "Pilab" }} routes={routes} path="/users/invites" onNavigate={() => {}} apps={apps} user={{ name: "Paál Gyula" }}>
        <PortalHome apps={apps} user={{ name: "Paál Gyula" }} announcements={[{ id: "x", title: "Hello" }]} quickActions={[{ id: "q", label: "Do it", onSelect: () => {} }]} />
      </PortalLayout>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("ServerDataGrid", () => {
  const columns = [{ id: "id", header: "Id", sortable: true, cell: (r: Row) => String(r.id) }];

  it("shows aria-sort, total footer, error row with retry", async () => {
    let fail = true;
    const fetcher: ServerGridFetcher<Row> = async () => {
      if (fail) throw new Error("down");
      return { rows: [{ id: 1 }, { id: 2 }], total: 42 };
    };
    render(<ServerDataGrid<Row> label="Rows" columns={columns} rowId={(r) => String(r.id)} fetcher={fetcher} pageSize={10} />);
    const retry = await screen.findByRole("button", { name: /retry|try again/i });
    fail = false;
    await userEvent.click(retry);
    await waitFor(() => expect(screen.getByRole("grid").getAttribute("aria-rowcount")).toBe("43"));
    await userEvent.click(within(screen.getByRole("columnheader", { name: /Id/ })).getByRole("button"));
    await waitFor(() => expect(screen.getByRole("columnheader", { name: /Id/ }).getAttribute("aria-sort")).toBe("ascending"));
  });
});

describe("Portal demo", () => {
  it("renders the Users table from the fake API", async () => {
    window.history.replaceState(null, "", "/#/users");
    const { container } = render(<PortalDemo />);
    await waitFor(() => expect(screen.getAllByRole("row").length).toBeGreaterThan(5), { timeout: 3000 });
    expect(container.querySelector('img[src="/paalgyula.jpg"]')).toBeTruthy();
  });
});
