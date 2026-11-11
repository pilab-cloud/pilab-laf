import * as React from "react";
import { Terminal, VncConsole, type RfbConstructor, type TerminalTransport } from "../../lib/console";
import "@xterm/xterm/css/xterm.css";

/** A fake shell: echoes typed characters, runs a line on Enter, supports backspace. */
function createEchoShell(): TerminalTransport {
  const listeners = new Set<(d: string) => void>();
  let line = "";
  const emit = (s: string) => listeners.forEach((l) => l(s));
  const prompt = () => emit("\r\n$ ");
  queueMicrotask(() => emit("Echo shell. Try: help, date, echo hi\r\n$ "));
  return {
    onData(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    write(d) {
      for (const ch of d) {
        if (ch === "\r") {
          const [cmd, ...rest] = line.trim().split(/\s+/);
          line = "";
          if (cmd === "date") emit(`\r\n${new Date().toString()}`);
          else if (cmd === "echo") emit(`\r\n${rest.join(" ")}`);
          else if (cmd === "help") emit("\r\ncommands: help, date, echo <text>");
          else if (cmd) emit(`\r\n${cmd}: command not found`);
          prompt();
        } else if (ch === "\x7f") {
          if (line) {
            line = line.slice(0, -1);
            emit("\b \b");
          }
        } else if (ch >= " ") {
          line += ch;
          emit(ch);
        }
      }
    },
  };
}

/** Minimal stand-in for noVNC's RFB: paints a canvas and fires `connect`. */
class FakeRfb implements InstanceType<RfbConstructor> {
  viewOnly = false;
  scaleViewport = true;
  clipViewport = false;
  private l = new Map<string, ((e: CustomEvent) => void)[]>();
  constructor(target: HTMLElement) {
    const c = document.createElement("canvas");
    c.width = 320;
    c.height = 180;
    c.style.maxWidth = "100%";
    const g = c.getContext?.("2d");
    if (g) {
      const cs = getComputedStyle(target);
      g.fillStyle = cs.getPropertyValue("--primary-light").trim() || "transparent";
      g.fillRect(0, 0, c.width, c.height);
      g.fillStyle = cs.getPropertyValue("--text").trim() || "currentColor";
      g.fillText("Fake VNC display", 16, 24);
    }
    target.replaceChildren(c);
    setTimeout(() => this.emit("connect"), 300);
  }
  private emit(t: string, detail: unknown = {}) {
    this.l.get(t)?.forEach((f) => f(new CustomEvent(t, { detail })));
  }
  addEventListener(t: string, cb: (e: CustomEvent) => void) {
    this.l.set(t, [...(this.l.get(t) ?? []), cb]);
  }
  disconnect() {
    this.emit("disconnect", { clean: true });
  }
  sendCtrlAltDel() {}
  clipboardPasteFrom() {}
}

const loadFake = async () => ({ default: FakeRfb as unknown as RfbConstructor });

export default function Console() {
  const transport = React.useMemo(createEchoShell, []);
  return (
    <div className="grid max-w-3xl gap-6">
      <h2 className="m-0">Console</h2>
      <section className="grid gap-2">
        <h3 className="m-0">Terminal (echo shell)</h3>
        <Terminal transport={transport} />
      </section>
      <section className="grid gap-2">
        <h3 className="m-0">VNC — no URL (placeholder)</h3>
        <VncConsole />
      </section>
      <section className="grid gap-2">
        <h3 className="m-0">VNC — fake RFB</h3>
        <VncConsole url="ws://fake" loadRfb={loadFake} />
      </section>
    </div>
  );
}
