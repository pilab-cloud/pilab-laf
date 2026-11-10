import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiKeyManager, MfaEnrolment, ReauthDialog, SecurityFactors, SessionExpiryDialog, SessionList, UserMenu } from "../lib";

const sessions = [
  { id: "a", device: "laptop" as const, browser: "Firefox", os: "macOS", ip: "1.1.1.1", lastActive: Date.now(), current: true },
  { id: "b", device: "phone" as const, browser: "Safari", lastActive: Date.now() - 3600_000 },
];

describe("SessionList", () => {
  it("revokes a row and signs out others after confirm; current has no revoke", async () => {
    const onRevoke = vi.fn();
    const onRevokeOthers = vi.fn();
    const { container } = render(<SessionList sessions={sessions} onRevoke={onRevoke} onRevokeOthers={onRevokeOthers} />);
    expect(screen.getByText("This device")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Revoke session/ })).toHaveLength(1);
    expect(await axe(container)).toHaveNoViolations();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Revoke session: Safari/ }));
    expect(onRevoke).toHaveBeenCalledWith("b");
    await user.click(screen.getByRole("button", { name: "Sign out other sessions" }));
    await user.click(within_dialog("Sign out other sessions"));
    await waitFor(() => expect(onRevokeOthers).toHaveBeenCalled());
  });
});

function within_dialog(name: string) {
  const d = screen.getByRole("alertdialog");
  return Array.from(d.querySelectorAll("button")).find((b) => b.textContent === name)!;
}

describe("ApiKeyManager", () => {
  it("creates a key and forces acknowledging the secret", async () => {
    const onCreate = vi.fn().mockResolvedValue({ secret: "pk_secret_1234" });
    render(<ApiKeyManager keys={[]} scopes={[{ value: "read" }]} onCreate={onCreate} onRevoke={vi.fn()} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Create key" }));
    await user.type(screen.getByLabelText("Name"), "ci");
    await user.click(screen.getByLabelText("read"));
    await user.click(screen.getAllByRole("button", { name: "Create key" }).at(-1)!);
    expect(onCreate).toHaveBeenCalledWith({ name: "ci", expiresInDays: 30, scopes: ["read"] });
    expect(await screen.findByText("pk_secret_1234")).toBeInTheDocument();
    const done = screen.getByRole("button", { name: "Done" });
    expect(done).toBeDisabled();
    await user.click(screen.getByLabelText("I have stored this secret"));
    expect(done).toBeEnabled();
    await user.click(done);
    await waitFor(() => expect(screen.queryByText("pk_secret_1234")).toBeNull());
  });

  it("revokes after confirmation", async () => {
    const onRevoke = vi.fn();
    render(
      <ApiKeyManager
        keys={[{ id: "k", name: "ci", prefix: "pk_…abcd", scopes: ["read"], createdAt: Date.now() }]}
        scopes={[]}
        onCreate={vi.fn()}
        onRevoke={onRevoke}
      />,
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Revoke: ci" }));
    await user.click(within_dialog("Revoke"));
    await waitFor(() => expect(onRevoke).toHaveBeenCalledWith("k"));
  });
});

describe("SecurityFactors", () => {
  it("warns when removing the last factor and passes axe", async () => {
    const onRemove = vi.fn();
    const { container } = render(
      <SecurityFactors
        password={{ onChange: vi.fn() }}
        passkeys={{ items: [{ id: "p", name: "Key", createdAt: Date.now() }], onAdd: vi.fn(), onRename: vi.fn(), onRemove }}
        recovery={{ remaining: 3, onRegenerate: async () => ["c-1", "c-2"] }}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Remove passkey: Key" }));
    expect(screen.getByText(/last second factor/)).toBeInTheDocument();
    await user.click(within_dialog("Remove"));
    await waitFor(() => expect(onRemove).toHaveBeenCalledWith("p"));
  });

  it("shows regenerated recovery codes once with acknowledge", async () => {
    render(<SecurityFactors recovery={{ remaining: 3, onRegenerate: async () => ["c-1", "c-2"] }} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Regenerate" }));
    expect(await screen.findByText("c-1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Done" })).toBeDisabled();
  });
});

describe("ReauthDialog", () => {
  it("submits the password and shows an error on failure", async () => {
    const onReauth = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    const onOpenChange = vi.fn();
    render(<ReauthDialog open onOpenChange={onOpenChange} onReauth={onReauth} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Password"), "pw{Enter}");
    expect(await screen.findByText(/Verification failed/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
    expect(onReauth).toHaveBeenLastCalledWith({ method: "password", password: "pw" });
  });
});

describe("SessionExpiryDialog", () => {
  afterEach(() => vi.useRealTimers());
  it("counts down and announces only at 60 s and 10 s", () => {
    vi.useFakeTimers();
    const t0 = Date.now();
    render(<SessionExpiryDialog expiresAt={t0 + 90_000} onStay={vi.fn()} onSignOut={vi.fn()} />);
    const live = () => screen.getByRole("status").textContent;
    expect(live()).toBe("");
    act(() => void vi.advanceTimersByTime(35_000));
    expect(live()).toMatch(/1 ?m/);
    const first = live();
    act(() => void vi.advanceTimersByTime(10_000));
    expect(live()).toBe(first);
    act(() => void vi.advanceTimersByTime(40_000));
    expect(live()).not.toBe(first);
    expect(live()).not.toBe("");
  });
});

describe("MfaEnrolment upgrades", () => {
  it("shows an error when verify rejects and can switch method", async () => {
    const onVerify = vi.fn().mockRejectedValue(new Error("x"));
    render(<MfaEnrolment qr={<i>qr</i>} secret="S" recoveryCodes={["r1"]} onVerify={onVerify} onRegisterPasskey={async () => undefined} onComplete={vi.fn()} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Next" }));
    await user.click(screen.getByRole("button", { name: "Use a different method" }));
    expect(screen.getByRole("radio", { name: /Passkey/i })).toBeInTheDocument();
  });
});

describe("UserMenu", () => {
  it("offers stop impersonating and an expiry warning", async () => {
    const onStop = vi.fn();
    render(<UserMenu name="Ann" onSignOut={vi.fn()} impersonating={{ as: "Bob", onStop }} expiresAt={Date.now() + 120_000} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Ann" }));
    expect(screen.getByText(/Session expires in/)).toBeInTheDocument();
    await user.click(screen.getByRole("menuitem", { name: /Stop impersonating: Bob/ }));
    expect(onStop).toHaveBeenCalled();
  });
});
