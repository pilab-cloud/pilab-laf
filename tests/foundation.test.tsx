import { render, screen } from "@testing-library/react";
import { Star } from "lucide-react";
import { describe, expect, it } from "vitest";
import { createFormatters, format, LafProvider, ObjectIcon, registerObjectKind, useLaf } from "../lib";
import { hu } from "../lib/locales/hu";

describe("format (F3)", () => {
  const f = createFormatters({ locale: "en" });

  it("bytes stays backward compatible and supports IEC/SI bases", () => {
    expect(format.bytes(1536)).toBe("1.5 KB");
    expect(f.bytes(512)).toBe("512 B");
    expect(f.bytes(4 * 2 ** 30, { base: 1024 })).toBe("4 GiB");
    expect(f.bytes(4 * 2 ** 30, { base: 1000 })).toBe("4.29 GB");
    expect(f.bytes(1_500_000, { base: 1000 })).toBe("1.5 MB");
  });
  it("bitrate and frequency", () => {
    expect(f.bitrate(1_200_000_000)).toBe("1.2 Gbit/s");
    expect(f.bitrate(950)).toBe("950 bit/s");
    expect(f.frequency(2_600_000_000)).toBe("2.6 GHz");
  });
  it("duration short and clock", () => {
    const ms = ((3 * 60 + 12) * 60 + 5) * 1000;
    expect(f.duration(ms)).toBe("3 h 12 min");
    expect(f.duration(ms, { style: "clock" })).toBe("03:12:05");
    expect(f.duration(90_000_000, { style: "clock" })).toBe("25:00:00");
    expect(f.duration(0)).toBe("0 s");
    expect(f.duration(250)).toBe("250 ms");
  });
  it("percent is locale-aware", () => {
    expect(f.percent(0.73)).toBe("73%");
    expect(createFormatters({ locale: "hu" }).percent(0.731, { fractionDigits: 1 })).toMatch(/^73,1\s?%$/);
  });
  it("relative", () => {
    const now = Date.UTC(2026, 0, 1, 12);
    expect(f.relative(now - 3 * 3600_000, { now })).toBe("3 hours ago");
    expect(f.relative(now + 2 * 86400_000, { now })).toBe("in 2 days");
  });
  it("dateTime honours time zone and utc", () => {
    const d = new Date(Date.UTC(2026, 0, 1, 23, 30));
    expect(f.dateTime(d, { utc: true, dateStyle: "short", timeStyle: "short" })).toContain("11:30");
    expect(f.dateTime(d, { timeZone: "Europe/Budapest", dateStyle: "short", timeStyle: "short" })).toContain("12:30");
  });
});

describe("LafProvider (F1)", () => {
  function Probe() {
    const { locale, timeZone, format: fmt, t } = useLaf();
    return <p>{`${locale}|${timeZone}|${fmt.percent(0.5)}|${t.close}`}</p>;
  }
  it("exposes timeZone and locale-bound formatters", () => {
    render(
      <LafProvider locale="hu" messages={hu} timeZone="Europe/Budapest">
        <Probe />
      </LafProvider>,
    );
    expect(screen.getByText(/^hu\|Europe\/Budapest\|50\s?%\|Bezárás$/)).toBeTruthy();
  });
  it("works without a provider", () => {
    render(<Probe />);
    expect(screen.getByText(/^en\|.+\|50%\|Close$/)).toBeTruthy();
  });
  it("translates routed strings", async () => {
    const { ErrorSummary } = await import("../lib");
    render(
      <LafProvider messages={hu}>
        <ErrorSummary errors={[{ id: "a", message: "x" }]} />
      </LafProvider>,
    );
    expect(screen.getByText("Javítsa a következőket")).toBeTruthy();
  });
});

describe("ObjectIcon (F5)", () => {
  it("is decorative without label or state", () => {
    const { container } = render(<ObjectIcon kind="vm" />);
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });
  it("gives state a text alternative", () => {
    render(<ObjectIcon kind="host" state="maintenance" label="esx-01" />);
    expect(screen.getByRole("img", { name: "esx-01, In maintenance" })).toBeTruthy();
  });
  it("state alone is announced", () => {
    render(
      <LafProvider messages={hu}>
        <ObjectIcon kind="vm" state="off" />
      </LafProvider>,
    );
    expect(screen.getByRole("img", { name: "Kikapcsolva" })).toBeTruthy();
  });
  it("announces each composite VM state and an overlay", () => {
    const names = { running: "Running", paused: "Paused", stopped: "Stopped", crashed: "Crashed", hibernated: "Hibernated", maintenance: "In maintenance", error: "Error" } as const;
    for (const [state, text] of Object.entries(names)) {
      const { unmount } = render(<ObjectIcon kind="vm" state={state as keyof typeof names} label="vm-1" />);
      expect(screen.getByRole("img", { name: `vm-1, ${text}` })).toBeTruthy();
      unmount();
    }
    render(<ObjectIcon kind="vm" state="running" overlay="warning" label="vm-2" />);
    expect(screen.getByRole("img", { name: "vm-2, Running, Warning" })).toBeTruthy();
  });
  it("renders every built-in kind and supports registered kinds", () => {
    const kinds = ["datacenter", "cluster", "host", "vm", "template", "vapp", "folder", "resource-pool", "datastore", "datastore-cluster", "network", "dvswitch", "portgroup", "snapshot", "user", "group", "client", "issue", "project", "mailbox", "shared-mailbox", "domain", "mail-queue", "repository", "token", "policy"] as const;
    for (const kind of kinds) {
      const { container, unmount } = render(<ObjectIcon kind={kind} size={20} />);
      expect(container.querySelector("svg"), kind).toBeTruthy();
      unmount();
    }
    registerObjectKind("star", Star);
    const { container } = render(<ObjectIcon kind="star" />);
    expect(container.querySelector("svg.lucide-star")).toBeTruthy();
  });
});
