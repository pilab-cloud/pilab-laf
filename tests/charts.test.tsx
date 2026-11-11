import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { DatePicker, type DateRangeValue } from "../lib/components/calendar";
import { TimeRangePicker } from "../lib/components/extras";
import { Heatmap, PerfPanel, StackedBarChart, TimeSeriesChart, type TimeSeriesChartProps, downsample, lttb, seriesToCsv, type Point } from "../lib/charts";

const T0 = Date.UTC(2026, 0, 1);
const mk = (n: number, f: (i: number) => number | null): Point[] => Array.from({ length: n }, (_, i) => [T0 + i * 60_000, f(i)]);
const cpu = { id: "cpu", name: "CPU", unit: "%" as const, points: mk(10, (i) => i * 10) };
const mem = { id: "mem", name: "Memory", unit: "bytes" as const, points: mk(10, (i) => (i + 1) * 2 ** 20) };

describe("LTTB", () => {
  it("returns input when under threshold and keeps endpoints otherwise", () => {
    const pts = mk(1000, (i) => Math.sin(i / 10)) as [number, number][];
    expect(lttb(pts.slice(0, 5), 10)).toHaveLength(5);
    const out = lttb(pts, 100);
    expect(out).toHaveLength(100);
    expect(out[0]).toEqual(pts[0]);
    expect(out[99]).toEqual(pts[999]);
  });

  it("preserves spikes", () => {
    const pts = mk(1000, (i) => (i === 500 ? 100 : 1)) as [number, number][];
    expect(lttb(pts, 50).some(([, v]) => v === 100)).toBe(true);
  });

  it("keeps null gaps and reduces each run", () => {
    const pts = mk(600, (i) => (i >= 300 && i < 310 ? null : i % 7));
    const out = downsample(pts, 60);
    expect(out.length).toBeLessThan(100);
    expect(out.some(([, v]) => v === null)).toBe(true);
  });
});

describe("TimeSeriesChart", () => {
  const props: TimeSeriesChartProps = { label: "CPU & memory", series: [cpu, mem], width: 600 };

  it("renders legend, toggles series and uses two axes for two units", async () => {
    const onHidden = vi.fn();
    const { container } = render(<TimeSeriesChart {...props} onHiddenSeriesChange={onHidden} thresholds={[{ value: 80, tone: "danger" }]} />);
    expect(container.querySelectorAll("[data-series]")).toHaveLength(2);
    expect(container.querySelector("[data-threshold=danger]")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Memory" }));
    expect(onHidden).toHaveBeenCalledWith(["mem"]);
    expect(container.querySelectorAll("[data-series]")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Memory" })).toHaveAttribute("aria-pressed", "false");
  });

  it("keyboard moves the crosshair and Shift+arrows then Enter zooms", async () => {
    const onRange = vi.fn();
    const { container } = render(<TimeSeriesChart {...props} onRangeChange={onRange} />);
    const svg = screen.getByRole("img", { name: "CPU & memory" });
    svg.focus();
    fireEvent.keyDown(svg, { key: "ArrowRight" });
    expect(screen.getByRole("tooltip")).toHaveTextContent("CPU");
    fireEvent.keyDown(svg, { key: "ArrowRight" });
    fireEvent.keyDown(svg, { key: "ArrowRight", shiftKey: true });
    fireEvent.keyDown(svg, { key: "ArrowRight", shiftKey: true });
    expect(container.querySelector("[data-brush]")).toBeTruthy();
    fireEvent.keyDown(svg, { key: "Enter" });
    expect(onRange).toHaveBeenCalledWith({ from: T0 + 60_000, to: T0 + 3 * 60_000 });
    expect(screen.getByRole("button", { name: "Reset zoom" })).toBeTruthy();
    fireEvent.keyDown(svg, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("brush by pointer drag zooms", () => {
    const onRange = vi.fn();
    render(<TimeSeriesChart {...props} onRangeChange={onRange} />);
    const svg = screen.getByRole("img", { name: "CPU & memory" });
    svg.getBoundingClientRect = () => ({ left: 0, top: 0, right: 600, bottom: 240, width: 600, height: 240, x: 0, y: 0, toJSON() {} });
    fireEvent.pointerDown(svg, { clientX: 56, button: 0 });
    fireEvent.pointerMove(svg, { clientX: 300 });
    fireEvent.pointerUp(svg, { clientX: 300 });
    expect(onRange).toHaveBeenCalledTimes(1);
    const r = onRange.mock.calls[0]![0];
    expect(r.from).toBe(T0);
    expect(r.to).toBeGreaterThan(T0);
    expect(r.to).toBeLessThan(T0 + 9 * 60_000);
  });

  it("offers a keyboard-reachable data table alternative", async () => {
    const user = userEvent.setup();
    render(<TimeSeriesChart {...props} />);
    await user.click(screen.getByRole("button", { name: "Show data" }));
    const table = screen.getByRole("table", { name: "CPU & memory" });
    expect(table.querySelectorAll("tbody tr")).toHaveLength(10);
    expect(screen.getByRole("region", { name: /Show data/ })).toHaveAttribute("tabindex", "0");
  });

  it("has no axe violations (chart + table)", async () => {
    const { container } = render(<TimeSeriesChart {...props} />);
    await userEvent.click(screen.getByRole("button", { name: "Show data" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("shows loading and empty states", () => {
    const { rerender } = render(<TimeSeriesChart label="x" series={[]} loading />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeTruthy();
    rerender(<TimeSeriesChart label="x" series={[]} />);
    expect(screen.getByText("No data")).toBeTruthy();
  });
});

describe("StackedBarChart & Heatmap", () => {
  it("render accessibly and heatmap supports arrow navigation", async () => {
    const { container } = render(
      <>
        <StackedBarChart label="Usage" series={["a", "b"]} data={[{ name: "r1", values: [1, 2] }]} />
        <Heatmap label="Load" rows={["r1", "r2"]} columns={["c1", "c2"]} values={[[1, 2], [3, 4]]} />
      </>,
    );
    const cell = screen.getByRole("gridcell", { name: "r1 c1: 1" });
    cell.focus();
    fireEvent.keyDown(cell, { key: "ArrowDown" });
    expect(screen.getByRole("gridcell", { name: "r2 c1: 3" })).toHaveFocus();
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("PerfPanel", () => {
  it("shows summary stats, switches range and exports CSV", async () => {
    const onExport = vi.fn();
    render(<PerfPanel label="Performance" metrics={[{ ...cpu, group: "CPU" }, { ...mem, group: "Memory" }]} presets={["5m", "1h"]} onExport={onExport} />);
    const row = screen.getByRole("row", { name: /CPU/ });
    expect(row).toHaveTextContent("90%");
    await userEvent.click(screen.getByRole("button", { name: "5m" }));
    expect(screen.getByRole("row", { name: /CPU/ })).toHaveTextContent("40%");
    await userEvent.click(screen.getByRole("button", { name: "Export CSV" }));
    expect(onExport.mock.calls[0]![0]).toMatch(/^time,CPU\n/);
  });

  it("seriesToCsv joins timestamps", () => {
    expect(seriesToCsv([cpu, mem]).split("\n")).toHaveLength(11);
  });
});

describe("DatePicker modes & TimeRangePicker custom", () => {
  it("range mode selects from then to", async () => {
    const user = userEvent.setup();
    const Harness = () => {
      const [v, setV] = React.useState<DateRangeValue>({});
      return <DatePicker mode="range" value={v} onChange={setV} />;
    };
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: /^Choose date/ }));
    const today = new Date();
    const ym = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
    await user.click(screen.getByRole("gridcell", { name: `${ym}-20` }));
    await user.click(screen.getByRole("gridcell", { name: `${ym}-05` }));
    expect(screen.getByRole("button", { name: /^Choose date/ })).toHaveTextContent(`${ym}-05 – ${ym}-20`);
  });

  it("datetime mode keeps the time and disabledDates are honoured", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DatePicker mode="datetime" value="2026-03-10T14:30" onChange={onChange} disabledDates={(d) => d === "2026-03-11"} />);
    await user.click(screen.getByRole("button", { name: /^Choose date/ }));
    expect(screen.getByRole("gridcell", { name: "2026-03-11" })).toBeDisabled();
    await user.click(screen.getByRole("gridcell", { name: "2026-03-12" }));
    expect(onChange).toHaveBeenCalledWith("2026-03-12T14:30");
  });

  it("Custom… applies an absolute range", async () => {
    const onRange = vi.fn();
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimeRangePicker value="1h" onChange={onChange} onRangeChange={onRange} range={{ from: Date.UTC(2026, 0, 1), to: Date.UTC(2026, 0, 2) }} />);
    await user.click(screen.getByRole("button", { name: "Custom…" }));
    await user.click(screen.getByRole("button", { name: "Apply" }));
    expect(onRange).toHaveBeenCalledWith({ from: expect.any(Number), to: expect.any(Number) });
    expect(onChange).toHaveBeenCalledWith("custom");
  });
});
