import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LafProvider } from "../lib";
import MailAdmin from "../playground/pages/MailAdmin";
import { createMockMailApi, type MailApi } from "../playground/pages/mail-admin/api";

vi.setConfig({ testTimeout: 30000 });

afterEach(() => window.history.replaceState(null, "", "/"));

function setup(initialPath = "/", api: MailApi = createMockMailApi({ latency: 0 })) {
  const user = userEvent.setup();
  const view = render(
    <LafProvider>
      <MailAdmin api={api} initialPath={initialPath} className="" />
    </LafProvider>,
  );
  return { user, api, ...view };
}

async function openMailbox(user: ReturnType<typeof userEvent.setup>, name: string) {
  const g = await grid("Mailboxes");
  await user.type(screen.getByRole("searchbox"), name);
  await user.dblClick(await within(g).findByText(name, undefined, { timeout: 5000 }));
}

const grid = (name: string) => screen.findByRole("grid", { name }, { timeout: 5000 });

describe("mail admin: navigation", () => {
  it("shows the dashboard with a health tile for every daemon", async () => {
    setup();
    const health = await screen.findByRole("list", { name: "Service health" }, { timeout: 5000 });
    const tiles = within(health).getAllByRole("listitem");
    expect(tiles).toHaveLength(11);
    for (const n of ["SMTP", "Submission", "IMAP", "POP3", "JMAP", "CalDAV", "EWS", "Storage", "Calendar", "Contacts", "MTA"]) expect(tiles.some((t) => t.textContent?.startsWith(n))).toBe(true);
    expect(within(health).getByText("Down")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Dashboard", level: 1 })).toBeInTheDocument();
  });

  it("navigates through the sidebar and updates the hash, breadcrumb and heading", async () => {
    const { user } = setup();
    await user.click(await screen.findByRole("link", { name: /Message trace/ }));
    expect(await screen.findByRole("heading", { name: "Message trace", level: 1 })).toBeInTheDocument();
    expect(window.location.hash).toBe("#/mail-flow/trace");
    expect(within(screen.getByRole("navigation", { name: /breadcrumb/i })).getByText("Mail flow")).toBeInTheDocument();
  });
});

describe("mail admin: mailboxes", () => {
  it("lists, searches and creates a mailbox with the wizard", async () => {
    const { user, api } = setup("/recipients/mailboxes");
    await grid("Mailboxes");
    await user.type(screen.getByRole("searchbox"), "Paál");
    await within(await grid("Mailboxes")).findByText("Paál Gyula", undefined, { timeout: 5000 });
    await user.clear(screen.getByRole("searchbox"));

    await user.click(screen.getByRole("button", { name: "New mailbox" }));
    const dialog = await screen.findByRole("dialog", { name: "New mailbox" });
    await user.type(within(dialog).getByLabelText("Display name"), "Teszt Elek");
    await user.type(within(dialog).getByLabelText("Address"), "teszt.elek");
    await user.click(within(dialog).getByRole("button", { name: "Next" }));
    await user.click(within(dialog).getByRole("button", { name: "Next" }));
    await user.click(within(dialog).getByRole("button", { name: "Finish" }));

    await waitFor(async () => expect((await api.accounts.list({ page: 1, pageSize: 5, search: "teszt.elek" })).total).toBe(1));
    expect(await screen.findByRole("tab", { name: "Aliases" })).toBeInTheDocument();
  });

  it("validates the wizard before moving on", async () => {
    const { user } = setup("/recipients/mailboxes");
    await grid("Mailboxes");
    await user.click(screen.getByRole("button", { name: "New mailbox" }));
    const dialog = await screen.findByRole("dialog", { name: "New mailbox" });
    await user.click(within(dialog).getByRole("button", { name: "Next" }));
    expect(await within(dialog).findByText(/Enter a display name/)).toBeInTheDocument();
  });

  it("suspends a mailbox from the edit drawer", async () => {
    const { user, api } = setup("/recipients/mailboxes");
    await openMailbox(user, "Paál Gyula");
    const toggle = await screen.findByRole("switch", { name: "Mailbox enabled" });
    expect(toggle).toBeChecked();
    await user.click(toggle);
    await waitFor(async () => expect((await api.accounts.get("acc_gyula")).status).toBe("suspended"));
  });

  it("adds an alias", async () => {
    const { user, api } = setup("/recipients/mailboxes");
    await openMailbox(user, "Paál Gyula");
    await user.click(await screen.findByRole("tab", { name: "Aliases" }));
    await user.type(await screen.findByLabelText("Add alias"), "boss@pilab.hu");
    await user.click(screen.getByRole("button", { name: "Add" }));
    await waitFor(async () => expect((await api.accounts.get("acc_gyula")).aliases).toContain("boss@pilab.hu"));
  });
});

describe("mail admin: mail flow", () => {
  it("filters the queue and retries a job", async () => {
    const { user, api } = setup("/mail-flow/queue");
    const g = await grid("Outbound jobs");
    await waitFor(() => expect(within(g).getAllByRole("row").length).toBeGreaterThan(5));
    const row = within(g).getAllByRole("row").slice(1).find((r) => !/delivered/i.test(r.textContent ?? ""))!;
    await user.dblClick(row);
    await user.click(await screen.findByRole("button", { name: "Retry now" }));
    await waitFor(async () => expect((await api.ext.audit({ page: 1, pageSize: 5, search: "queue.retry" })).total).toBe(1));
  });

  it("flushes the queue after confirmation", async () => {
    const { user, api } = setup("/mail-flow/queue");
    await grid("Outbound jobs");
    expect((await api.queue.stats()).retryCount).toBeGreaterThan(0);
    await user.click(screen.getByRole("button", { name: "Flush queue" }));
    const dialog = await screen.findByRole("alertdialog", { name: "Flush queue" });
    await user.click(within(dialog).getByRole("button", { name: "Flush" }));
    await waitFor(async () => expect((await api.queue.stats()).retryCount).toBe(0));
  });

  it("generates and activates a DKIM key and shows DNS records", async () => {
    const { user, api } = setup("/mail-flow/domains");
    await user.click(await screen.findByRole("button", { name: "Manage pilab.example" }, { timeout: 5000 }));
    const table = await screen.findByRole("table", { name: "DNS records" }, { timeout: 5000 });
    for (const p of ["MX", "SPF", "DKIM", "DMARC", "MTA-STS"]) expect(within(table).getAllByText(p).length).toBeGreaterThan(0);
    await user.click(screen.getByRole("tab", { name: "DKIM" }));
    await user.type(await screen.findByLabelText("New selector"), "2026z");
    await user.click(screen.getByRole("button", { name: "Generate key" }));
    await waitFor(async () => expect((await api.domains.listDKIMKeys("pilab.example")).some((k) => k.selector === "2026z")).toBe(true));
    await user.click(await screen.findByRole("button", { name: "Activate" }));
    await waitFor(async () => expect((await api.domains.listDKIMKeys("pilab.example")).find((k) => k.selector === "2026z")?.active).toBe(true));
  });

  it("adds a domain with the wizard", async () => {
    const { user, api } = setup("/mail-flow/domains");
    await user.click(await screen.findByRole("button", { name: "Add domain" }, { timeout: 5000 }));
    const dialog = await screen.findByRole("dialog", { name: "Add domain" });
    await user.type(within(dialog).getByLabelText("Domain name"), "new.example");
    await user.click(within(dialog).getByRole("button", { name: "Next" }));
    await user.click(within(dialog).getByRole("button", { name: "Next" }));
    await user.click(within(dialog).getByRole("button", { name: "Finish" }));
    await waitFor(async () => expect((await api.domains.list()).some((d) => d.name === "new.example")).toBe(true));
  });
});

describe("mail admin: protocols and storage", () => {
  it("toggles client access", async () => {
    const { user, api } = setup("/protocols");
    await user.click(await screen.findByRole("switch", { name: /^POP3/ }, { timeout: 5000 }));
    await waitFor(async () => expect((await api.ext.clientAccess()).pop3).toBe(true));
  });

  it("runs a garbage collection dry run", async () => {
    const { user } = setup("/storage");
    await user.click(await screen.findByRole("button", { name: "Run dry run" }, { timeout: 5000 }));
    expect(await screen.findByText(/Candidates:/)).toBeInTheDocument();
  });
});

describe("mail admin: errors", () => {
  it("shows a retryable error when the backend fails", async () => {
    const { user } = setup("/mail-flow/policies", createMockMailApi({ latency: 0, fail: () => true }));
    expect(await screen.findByText("Could not load data", undefined, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    void user;
  });
});

describe("mail admin: accessibility", () => {
  it.each([
    ["/", "Service health"],
    ["/recipients/mailboxes", "Mailboxes"],
    ["/mail-flow/domains", "Domains"],
    ["/protocols", "Listeners"],
  ])("%s has no axe violations", async (path, ready) => {
    const { container } = setup(path);
    await screen.findByRole(path === "/" ? "list" : path === "/protocols" ? "table" : path === "/mail-flow/domains" ? "table" : "grid", { name: ready }, { timeout: 5000 });
    expect(await axe(container, { rules: { region: { enabled: false }, "landmark-one-main": { enabled: false }, "page-has-heading-one": { enabled: false } } })).toHaveNoViolations();
  }, 20000);
});
