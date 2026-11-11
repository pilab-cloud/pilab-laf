import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LafProvider } from "../lib";
import { Terminal, VncConsole, type RfbConstructor, type TerminalTransport } from "../lib/console";

const h = vi.hoisted(() => ({ writes: [] as string[], cleared: 0, dataCb: undefined as undefined | ((d: string) => void), disposed: 0 }));

vi.mock("@xterm/xterm", () => ({
  Terminal: class {
    options = {};
    loadAddon() {}
    open() {}
    write(d: string) {
      h.writes.push(String(d));
    }
    clear() {
      h.cleared++;
    }
    dispose() {
      h.disposed++;
    }
    getSelection() {
      return "sel";
    }
    onData(cb: (d: string) => void) {
      h.dataCb = cb;
      return { dispose() {} };
    }
  },
}));
vi.mock("@xterm/addon-fit", () => ({ FitAddon: class { fit() {} } }));

const wrap = (ui: React.ReactNode) => render(<LafProvider>{ui}</LafProvider>);

function transport() {
  const sent: string[] = [];
  let push: (d: string) => void = () => {};
  let state: (s: "closed") => void = () => {};
  const t: TerminalTransport = {
    onData: (cb) => ((push = cb), () => {}),
    write: (d) => sent.push(d),
    onState: (cb) => ((state = cb as never), () => {}),
  };
  return { t, sent, push: (d: string) => push(d), close: () => state("closed") };
}

beforeEach(() => {
  h.writes.length = 0;
  h.cleared = 0;
});

describe("Terminal", () => {
  it("pipes transport output and input, clear works, and reconnect appears on close", async () => {
    const tr = transport();
    const onClose = vi.fn();
    wrap(<Terminal transport={tr.t} onClose={onClose} />);
    await screen.findByText("Connected");
    act(() => tr.push("hello"));
    expect(h.writes).toContain("hello");
    h.dataCb?.("ls");
    expect(tr.sent).toEqual(["ls"]);
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(h.cleared).toBe(1);
    expect(screen.queryByRole("button", { name: "Reconnect" })).toBeNull();
    act(() => tr.close());
    expect(onClose).toHaveBeenCalled();
    expect(screen.getByText("Disconnected")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Reconnect" }));
    await screen.findByText("Connected");
  });

  it("localises the toolbar", async () => {
    const { hu } = await import("../lib/locales/hu");
    const { consoleHu } = await import("../lib/locales/console.hu");
    render(
      <LafProvider locale="hu" messages={{ ...hu, components: { ...hu.components, console: consoleHu } } as never}>
        <Terminal transport={transport().t} />
      </LafProvider>,
    );
    expect(await screen.findByText("Csatlakoztatva")).toBeTruthy();
  });
});

function fakeRfb() {
  const inst: Record<string, unknown> = { viewOnly: false, scaleViewport: true, clipViewport: false, cad: 0, pasted: "", listeners: {} as Record<string, (e: CustomEvent) => void> };
  class Fake {
    constructor() {
      Object.assign(this, inst);
      Object.assign(inst, { self: this });
    }
    addEventListener(t: string, cb: (e: CustomEvent) => void) {
      (inst.listeners as Record<string, unknown>)[t] = cb;
    }
    disconnect() {}
    sendCtrlAltDel() {
      inst.cad = (inst.cad as number) + 1;
    }
    clipboardPasteFrom(t: string) {
      inst.pasted = t;
    }
  }
  return { inst, load: async () => ({ default: Fake as unknown as RfbConstructor }) };
}

describe("VncConsole", () => {
  it("is disconnected without a url", () => {
    wrap(<VncConsole />);
    expect(screen.getAllByText("Disconnected").length).toBeGreaterThan(0);
  });

  it("connects, sends Ctrl-Alt-Del and pastes to the remote", async () => {
    const f = fakeRfb();
    wrap(<VncConsole url="ws://x" loadRfb={f.load} />);
    await waitFor(() => expect(Object.keys(f.inst.listeners as object)).toContain("connect"));
    act(() => (f.inst.listeners as Record<string, (e: CustomEvent) => void>).connect!(new CustomEvent("connect")));
    const cad = await screen.findByRole("button", { name: /ctrl/i });
    await userEvent.click(cad);
    const self = f.inst.self as { cad?: number };
    expect(f.inst.cad).toBe(1);
    expect(self).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Paste to remote" }));
    await userEvent.type(screen.getByLabelText("Paste text to send to the remote clipboard"), "abc");
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(f.inst.pasted).toBe("abc");
  });

  it("reports a load failure as an error", async () => {
    wrap(<VncConsole url="ws://x" loadRfb={() => Promise.reject(new Error("x"))} />);
    expect(await screen.findByText("Could not load the console")).toBeTruthy();
  });
});
