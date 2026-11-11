import { act, render, screen } from "@testing-library/react";
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { backoffDelay, ConnectionBadge, RealtimeProvider, StaleDataBanner, useConnectionState, useRealtimeContext, type ConnectionHandlers, type RealtimeConnection } from "../lib/components/realtime";
import RealtimeDemo from "../playground/pages/Realtime";

function transport() {
  const conns: { h: ConnectionHandlers<string>; close: ReturnType<typeof vi.fn> }[] = [];
  const connect = vi.fn((h: ConnectionHandlers<string>) => {
    const close = vi.fn();
    conns.push({ h, close });
    return { close };
  });
  return { conns, connect, last: () => conns[conns.length - 1]! };
}

let conn: RealtimeConnection<string>;
function Probe(props: Parameters<typeof useConnectionState<string>>[0]) {
  conn = useConnectionState<string>(props);
  return <span data-testid="state">{conn.state}</span>;
}
const state = () => screen.getByTestId("state").textContent;
const setOnline = (v: boolean) => {
  Object.defineProperty(navigator, "onLine", { configurable: true, value: v });
  act(() => void window.dispatchEvent(new Event(v ? "online" : "offline")));
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
});
afterEach(() => {
  setOnline(true);
  vi.useRealTimers();
});

describe("backoffDelay", () => {
  it("grows exponentially, caps, and jitters", () => {
    const o = { initial: 1000, max: 5000, jitter: 0 };
    expect([1, 2, 3, 4, 5].map((a) => backoffDelay(a, o))).toEqual([1000, 2000, 4000, 5000, 5000]);
    expect(backoffDelay(1, { initial: 1000, jitter: 0.5 }, () => 0)).toBe(500);
    expect(backoffDelay(1, { initial: 1000, jitter: 0.5 }, () => 1)).toBe(1000);
  });
});

describe("useConnectionState", () => {
  it("opens, then reconnects with backoff after a drop and resets on open", () => {
    const t = transport();
    render(<Probe connect={t.connect} backoff={{ initial: 1000, jitter: 0 }} />);
    expect(state()).toBe("connecting");
    act(() => t.last().h.open());
    expect(state()).toBe("open");
    act(() => t.last().h.close());
    expect(state()).toBe("reconnecting");
    expect(t.connect).toHaveBeenCalledTimes(1);
    act(() => void vi.advanceTimersByTime(999));
    expect(t.connect).toHaveBeenCalledTimes(1);
    act(() => void vi.advanceTimersByTime(1));
    expect(t.connect).toHaveBeenCalledTimes(2);
    act(() => t.last().h.close());
    expect(conn.attempt).toBe(2);
    act(() => void vi.advanceTimersByTime(1999));
    expect(t.connect).toHaveBeenCalledTimes(2);
    act(() => void vi.advanceTimersByTime(1));
    expect(t.connect).toHaveBeenCalledTimes(3);
    act(() => t.last().h.open());
    expect(conn.attempt).toBe(0);
  });

  it("errors after maxAttempts", () => {
    const t = transport();
    render(<Probe connect={t.connect} backoff={{ initial: 10, jitter: 0, maxAttempts: 1 }} />);
    act(() => t.last().h.close(new Error("x")));
    act(() => void vi.advanceTimersByTime(10));
    act(() => t.last().h.close(new Error("y")));
    expect(state()).toBe("error");
    expect(conn.error).toBeInstanceOf(Error);
  });

  it("tracks lastMessageAt, latency and notifies subscribers", () => {
    const t = transport();
    const onMessage = vi.fn();
    render(<Probe connect={t.connect} onMessage={onMessage} />);
    act(() => t.last().h.open());
    act(() => {
      t.last().h.message("hi");
      t.last().h.latency(42);
    });
    expect(conn.lastMessageAt).toBe(Date.now());
    expect(conn.latency).toBe(42);
    expect(onMessage).toHaveBeenCalledWith("hi");
  });

  it("pauses while offline and reconnects immediately when back online", () => {
    const t = transport();
    render(<Probe connect={t.connect} backoff={{ initial: 1000, jitter: 0 }} />);
    act(() => t.last().h.open());
    const first = t.last();
    setOnline(false);
    expect(first.close).toHaveBeenCalled();
    expect(state()).toBe("reconnecting");
    expect(conn.offline).toBe(true);
    act(() => void vi.advanceTimersByTime(60_000));
    expect(t.connect).toHaveBeenCalledTimes(1);
    setOnline(true);
    expect(t.connect).toHaveBeenCalledTimes(2);
    expect(state()).toBe("connecting");
  });

  it("manual close stays closed and reconnect() restarts at once", () => {
    const t = transport();
    render(<Probe connect={t.connect} />);
    act(() => t.last().h.open());
    act(() => conn.close());
    expect(state()).toBe("closed");
    act(() => void vi.advanceTimersByTime(60_000));
    expect(t.connect).toHaveBeenCalledTimes(1);
    act(() => conn.reconnect());
    expect(t.connect).toHaveBeenCalledTimes(2);
    expect(state()).toBe("connecting");
  });

  it("ignores events from a replaced connection", () => {
    const t = transport();
    render(<Probe connect={t.connect} />);
    const old = t.last();
    act(() => conn.reconnect());
    act(() => old.h.open());
    expect(state()).toBe("connecting");
  });

  it("cleans up on unmount", () => {
    const t = transport();
    const { unmount } = render(<Probe connect={t.connect} backoff={{ initial: 1000, jitter: 0 }} />);
    act(() => t.last().h.open());
    act(() => t.last().h.close());
    unmount();
    act(() => void vi.advanceTimersByTime(60_000));
    expect(t.connect).toHaveBeenCalledTimes(1);

    const t2 = transport();
    const u2 = render(<Probe connect={t2.connect} />);
    u2.unmount();
    expect(t2.last().close).toHaveBeenCalled();
  });
});

describe("ConnectionBadge / StaleDataBanner", () => {
  function Shell({ t }: { t: ReturnType<typeof transport> }) {
    return (
      <RealtimeProvider<string> connect={t.connect} backoff={{ initial: 1000, jitter: 0 }}>
        <ConnectionBadge />
        <StaleDataBanner />
        <Grab />
      </RealtimeProvider>
    );
  }
  function Grab() {
    conn = useRealtimeContext<string>();
    return null;
  }

  it("announces changes politely and offers a working Reconnect", async () => {
    const t = transport();
    render(<Shell t={t} />);
    expect(screen.queryByRole("button", { name: "Reconnect" })).toBeNull();
    act(() => t.last().h.open());
    act(() => t.last().h.message("x"));
    expect(screen.getByText("Live")).toBeTruthy();
    act(() => t.last().h.close());
    expect(screen.getByText("Connection status: Reconnecting").getAttribute("aria-live")).toBe("polite");
    expect(screen.getByText(/Live updates paused — last update just now/)).toBeTruthy();
    act(() => void vi.advanceTimersByTime(125_000));
    expect(screen.getByText(/last update 2 min ago/)).toBeTruthy();
    const buttons = screen.getAllByRole("button", { name: "Reconnect" });
    expect(buttons).toHaveLength(2);
    // the 125 s wait already let one backoff retry through
    expect(t.connect).toHaveBeenCalledTimes(2);
    act(() => buttons[0]!.click());
    expect(t.connect).toHaveBeenCalledTimes(3);
  });

  it("renders the demo", () => {
    vi.useRealTimers();
    render(<RealtimeDemo />);
    expect(screen.getAllByRole("group", { name: "Connection status" })).toHaveLength(2);
  });
});
