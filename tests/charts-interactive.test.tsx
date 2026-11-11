import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChartSyncProvider, LineChart, TimeSeriesChart, clampRange, panBy, trimWindow, useLiveSeries, zoomAt, type Point } from "../lib/charts";

const T0 = Date.UTC(2026, 0, 1);
const mk = (n: number): Point[] => Array.from({ length: n }, (_, i) => [T0 + i * 60_000, i * 10]);
const cpu = { id: "cpu", name: "CPU", unit: "%" as const, points: mk(10) };
const rect = { left: 0, top: 0, right: 600, bottom: 240, width: 600, height: 240, x: 0, y: 0, toJSON() {} };
const plot = (name: string) => {
  const svg = screen.getByRole("img", { name });
  svg.getBoundingClientRect = () => rect;
  return svg;
};

describe("zoom helpers", () => {
  const full = { from: 0, to: 100 };
  it("zooms around a point, pans and clamps", () => {
    expect(zoomAt(full, full, 0.5, 50)).toEqual({ from: 25, to: 75 });
    expect(zoomAt({ from: 25, to: 75 }, full, 4)).toEqual(full);
    expect(panBy({ from: 25, to: 75 }, full, 100)).toEqual({ from: 50, to: 100 });
    expect(clampRange({ from: -10, to: 10 }, full)).toEqual({ from: 0, to: 20 });
  });
});

describe("synced crosshair and range", () => {
  const two = () => (
    <ChartSyncProvider>
      <TimeSeriesChart label="A" series={[cpu]} width={600} />
      <LineChart label="B" series={[{ ...cpu, id: "b", name: "Other" }]} width={600} />
    </ChartSyncProvider>
  );

  it("hovering one chart shows the crosshair and tooltip on the other", () => {
    render(two());
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.pointerMove(plot("A"), { clientX: 56 + 270 });
    expect(screen.getAllByRole("tooltip")).toHaveLength(2);
    fireEvent.pointerLeave(plot("A"));
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("zoom range is shared and reset clears it everywhere", () => {
    const { container } = render(two());
    const a = plot("A");
    fireEvent.pointerDown(a, { clientX: 56, button: 0 });
    fireEvent.pointerMove(a, { clientX: 300 });
    fireEvent.pointerUp(a, { clientX: 300 });
    expect(screen.getAllByRole("button", { name: "Reset zoom" })).toHaveLength(2);
    fireEvent.doubleClick(a);
    expect(screen.queryByRole("button", { name: "Reset zoom" })).toBeNull();
    expect(container.querySelectorAll("svg[role=img]")).toHaveLength(2);
  });

  it("does not sync with syncGroup={false}", () => {
    render(
      <ChartSyncProvider>
        <TimeSeriesChart label="A" series={[cpu]} width={600} />
        <TimeSeriesChart label="B" series={[cpu]} width={600} syncGroup={false} />
      </ChartSyncProvider>,
    );
    fireEvent.pointerMove(plot("A"), { clientX: 300 });
    expect(screen.getAllByRole("tooltip")).toHaveLength(1);
  });
});

describe("zoom & pan on TimeSeriesChart", () => {
  it("keyboard +/- zooms, Alt+arrows pans, Alt+Home resets", () => {
    const onRange = vi.fn();
    render(<TimeSeriesChart label="Z" series={[cpu]} width={600} onRangeChange={onRange} />);
    const svg = plot("Z");
    fireEvent.keyDown(svg, { key: "+" });
    const r1 = onRange.mock.calls[0]![0];
    expect(r1.to - r1.from).toBe(4.5 * 60_000);
    fireEvent.keyDown(svg, { key: "ArrowRight", altKey: true });
    expect(onRange.mock.calls[1]![0].from).toBeGreaterThan(r1.from);
    fireEvent.keyDown(svg, { key: "Home", altKey: true });
    expect(screen.queryByRole("button", { name: "Reset zoom" })).toBeNull();
  });

  it("wheel zoom is opt-in; shift-drag pans a zoomed chart", () => {
    const onRange = vi.fn();
    render(<TimeSeriesChart label="W" series={[cpu]} width={600} onRangeChange={onRange} wheelZoom />);
    const svg = plot("W");
    fireEvent.wheel(svg, { deltaY: -200, clientX: 300 });
    expect(onRange).toHaveBeenCalledTimes(1);
    const z = onRange.mock.calls[0]![0];
    fireEvent.pointerDown(svg, { clientX: 300, button: 0, shiftKey: true });
    fireEvent.pointerMove(svg, { clientX: 200 });
    fireEvent.pointerUp(svg, { clientX: 200 });
    const p = onRange.mock.calls.at(-1)![0];
    expect(p.from).toBeGreaterThan(z.from);
    expect(p.to - p.from).toBeCloseTo(z.to - z.from);
  });

  it("controlled range is respected", () => {
    render(<TimeSeriesChart label="C" series={[cpu]} width={600} range={{ from: T0, to: T0 + 2 * 60_000 }} />);
    expect(screen.getByRole("button", { name: "Reset zoom" })).toBeTruthy();
  });
});

describe("live mode", () => {
  it("trims by window and cap", () => {
    expect(trimWindow(mk(10), { windowMs: 2 * 60_000 })).toHaveLength(3);
    expect(trimWindow(mk(10), { windowMs: 1e9, maxPoints: 4 })).toHaveLength(4);
  });

  it("useLiveSeries keeps a rolling window", () => {
    const { result } = renderHook(() => useLiveSeries([{ id: "cpu", name: "CPU", unit: "%" }], { windowMs: 3000 }));
    act(() => {
      for (let i = 0; i < 10; i++) result.current.push({ cpu: i }, T0 + i * 1000);
    });
    expect(result.current.series[0]!.points).toHaveLength(4);
  });

  it("pauses on hover, shows Paused/Resume after zoom, resumes", () => {
    const { container } = render(<TimeSeriesChart label="L" series={[cpu]} width={600} live={{ windowMs: 3 * 60_000 }} />);
    const status = () => container.querySelector("[data-live]")!.getAttribute("data-live");
    expect(status()).toBe("running");
    const svg = plot("L");
    fireEvent.pointerEnter(svg);
    expect(status()).toBe("paused");
    fireEvent.pointerLeave(svg);
    expect(status()).toBe("running");
    fireEvent.keyDown(svg, { key: "+" });
    expect(status()).toBe("paused");
    fireEvent.click(screen.getByRole("button", { name: "Resume" }));
    expect(status()).toBe("running");
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    expect(screen.getByText("Paused")).toBeTruthy();
  });

  it("renders only the live window", () => {
    render(<TimeSeriesChart label="L" series={[cpu]} width={600} live={{ windowMs: 2 * 60_000 }} animate={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Show data" }));
    expect(screen.getByRole("table").querySelectorAll("tbody tr")).toHaveLength(3);
  });
});
