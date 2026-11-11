import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Alert,
  AlertGroup,
  Banner,
  Card,
  CardBody,
  CardGrid,
  CardHeader,
  CardTitle,
  ExpandableCard,
  LafProvider,
  MetricCard,
  MetricGrid,
  ProgressCard,
  RadialGauge,
  GaugeCard,
  StatusSummaryCard,
  ToastProvider,
  gaugeTone,
  useToasts,
  type ToastOptions,
} from "../lib";
import { hu } from "../lib/locales/hu";
import { AreaChart, BarChart, ChartCard, DonutChart, Heatmap, SegmentedBar, ThresholdDonut, UtilizationCard } from "../lib/charts";

const wrap = (ui: React.ReactNode, locale: "en" | "hu" = "en") => render(<LafProvider locale={locale} messages={locale === "hu" ? hu : undefined}>{ui}</LafProvider>);

describe("Card v2", () => {
  it("keeps the original card for plain usage and the new family for variants", () => {
    wrap(
      <>
        <Card data-testid="legacy">x</Card>
        <Card data-testid="v2" variant="outlined" status="danger">
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardBody>Body</CardBody>
        </Card>
      </>,
    );
    expect(screen.getByTestId("legacy")).toHaveClass("card");
    expect(screen.getByTestId("v2")).not.toHaveClass("card");
    expect(screen.getByTestId("v2").className).toMatch(/border-s-danger/);
  });

  it("clickable and selectable cards expose proper semantics and keyboard activation", () => {
    const onClick = vi.fn();
    const onSel = vi.fn();
    wrap(
      <>
        <Card variant="default" onClick={onClick}>
          Open
        </Card>
        <Card variant="default" selectable selected={false} onSelectedChange={onSel} aria-label="Plan">
          Plan
        </Card>
      </>,
    );
    const btn = screen.getByRole("button", { name: "Open" });
    btn.focus();
    fireEvent.keyDown(btn, { key: "Enter" });
    fireEvent.keyDown(btn, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(2);
    const box = screen.getByRole("checkbox", { name: "Plan" });
    expect(box).toHaveAttribute("aria-checked", "false");
    fireEvent.click(box);
    expect(onSel).toHaveBeenCalledWith(true);
  });

  it("shows a skeleton while loading and expands/collapses", async () => {
    const { container } = wrap(
      <>
        <Card variant="default" loading>
          secret
        </Card>
        <ExpandableCard title="Details" description="More">
          <p>Hidden body</p>
        </ExpandableCard>
        <CardGrid>
          <Card variant="flat" compact>
            a
          </Card>
        </CardGrid>
      </>,
    );
    expect(screen.queryByText("secret")).toBeNull();
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "Details" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Hidden body")).toBeVisible();
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("metrics", () => {
  it("MetricCard spells out trend and good/bad semantics (not colour alone)", async () => {
    const { container } = wrap(
      <MetricGrid label="KPIs">
        <MetricCard label="Error rate" value="0.4" unit="%" delta={-8.1} goodWhen="down" period="vs last week" sparkline={[1, 2, 3, 2]} />
        <MetricCard label="Latency" value="340" unit="ms" delta={6} goodWhen="down" />
        <MetricCard label="Sessions" value="10" delta={0} />
      </MetricGrid>,
    );
    const err = screen.getByRole("group", { name: "Error rate" });
    expect(err.querySelector("[data-trend=down]")).toHaveAttribute("data-good", "true");
    expect(within(err).getByText(/Decreased by.*favourable/)).toBeInTheDocument();
    expect(within(screen.getByRole("group", { name: "Latency" })).getByText(/Increased by.*unfavourable/)).toBeInTheDocument();
    expect(within(screen.getByRole("group", { name: "Sessions" })).getByText("No change")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("MetricCard loading and error states, error retry, and link", () => {
    const retry = vi.fn();
    wrap(
      <>
        <MetricCard label="A" value="1" loading />
        <MetricCard label="B" value="1" error onRetry={retry} />
        <MetricCard label="C" value="3" href="/c" />
      </>,
    );
    expect(screen.getByRole("status", { name: "Loading metric" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(retry).toHaveBeenCalled();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/c");
  });

  it("gauge is a labelled meter with a text state; thresholds pick the tone", async () => {
    expect(gaugeTone(75, [{ value: 0, tone: "ok" }, { value: 70, tone: "warn" }, { value: 90, tone: "danger" }])).toBe("warn");
    const { container } = wrap(
      <>
        <RadialGauge label="CPU" value={92} unit="%" thresholds={[{ value: 0, tone: "ok" }, { value: 90, tone: "danger" }]} />
        <GaugeCard title="Memory" value={30} />
        <ProgressCard title="Storage" value={9} max={10} unit="TB" meter />
      </>,
    );
    const meter = screen.getByRole("meter", { name: "CPU" });
    expect(meter).toHaveAttribute("aria-valuenow", "92");
    expect(meter.getAttribute("aria-valuetext")).toMatch(/Critical/);
    expect(meter.querySelector("circle:last-of-type")?.getAttribute("class")).toMatch(/laf-tween/);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("StatusSummaryCard rows are buttons and report clicks", () => {
    const onClick = vi.fn();
    wrap(<StatusSummaryCard title="Services" items={[{ id: "ok", label: "Healthy", count: 4, tone: "ok", onClick }, { id: "x", label: "Down", count: 1, tone: "danger" }]} />);
    fireEvent.click(screen.getByRole("button", { name: /Healthy/ }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByText("Down")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});

describe("alerts", () => {
  it("uses live-region roles by severity and supports title/description/actions/close/detail", async () => {
    const onClose = vi.fn();
    const { container } = wrap(
      <AlertGroup label="Alerts">
        <Alert tone="danger" title="Down" description="Service is down" onClose={onClose} actions={<button>Fix</button>} detail="Stack trace" />
        <Alert tone="warning">Warn</Alert>
        <Alert tone="success">Ok</Alert>
        <Alert variant="neutral" compact inline>
          Note
        </Alert>
      </AlertGroup>,
    );
    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(screen.getAllByRole("status")).toHaveLength(2);
    const more = screen.getByRole("button", { name: "Show details" });
    expect(more).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(more);
    expect(screen.getByText("Stack trace")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalled();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("legacy Alert and Banner (warn alias, sticky, dismiss) keep working", () => {
    const onDismiss = vi.fn();
    wrap(
      <>
        <Alert tone="error">Legacy</Alert>
        <Banner tone="warn" sticky onDismiss={onDismiss}>
          Heads up
        </Banner>
      </>,
    );
    expect(screen.getByText("Legacy").closest(".alert")).toHaveClass("alert-error");
    const banner = screen.getByText("Heads up").closest("[role=status]")!;
    expect(banner.className).toMatch(/sticky/);
    fireEvent.click(within(banner as HTMLElement).getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalled();
  });
});

describe("toasts", () => {
  afterEach(() => vi.useRealTimers());

  const Harness = ({ opts }: { opts: ToastOptions[] }) => {
    const { toast, dismissAll } = useToasts();
    return (
      <>
        <button onClick={() => opts.forEach((o) => toast(o))}>fire</button>
        <button onClick={dismissAll}>clear</button>
      </>
    );
  };

  it("announces via status/alert roles, caps visible toasts, pauses on hover, runs actions", () => {
    vi.useFakeTimers();
    const onAction = vi.fn();
    const onClose = vi.fn();
    wrap(
      <ToastProvider max={2}>
        <Harness
          opts={[
            { tone: "success", title: "One", duration: 1000, onClose },
            { tone: "error", title: "Two", description: "bad", action: { label: "Retry", onClick: onAction } },
            { tone: "info", title: "Three" },
          ]}
        />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("fire"));
    const region = screen.getByRole("region", { name: "Notifications" });
    expect(within(region).getAllByRole("status")).toHaveLength(1);
    expect(within(region).getAllByRole("alert")).toHaveLength(1);
    expect(screen.queryByText("Three")).toBeNull();
    const one = screen.getByText("One").closest("[role=status]")!;
    fireEvent.mouseEnter(one);
    act(() => void vi.advanceTimersByTime(5000));
    expect(screen.getByText("One")).toBeInTheDocument();
    fireEvent.mouseLeave(one);
    act(() => void vi.advanceTimersByTime(1100));
    expect(screen.queryByText("One")).toBeNull();
    expect(onClose).toHaveBeenCalled();
    expect(screen.getByText("Three")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(onAction).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(screen.queryByText("Three")).toBeNull();
  });
});

describe("charts", () => {
  const bar = { categories: ["A", "B", "C"], series: [{ id: "x", name: "Alpha", data: [1, 2, 3] }, { id: "y", name: "Beta", data: [3, 2, 1] }] };

  it("BarChart: role=img, keyboard-focus tooltip with live announcement, data table fallback, legend toggle", async () => {
    const { container } = wrap(<BarChart label="Deploys" {...bar} stacked />);
    const svg = screen.getByRole("img", { name: "Deploys" });
    svg.focus();
    fireEvent.keyDown(svg, { key: "ArrowRight" });
    fireEvent.keyDown(svg, { key: "ArrowRight" });
    expect(screen.getAllByText("B: Alpha: 2, Beta: 2").length).toBeGreaterThan(0);
    fireEvent.keyDown(svg, { key: "Escape" });
    expect(container.querySelector("[data-active]")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Show data table" }));
    expect(screen.getByRole("table", { name: "Deploys" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Beta" })).toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "Toggle Alpha" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("BarChart horizontal/grouped and DonutChart render; donut announces share and shows centre label", async () => {
    const { container } = wrap(
      <>
        <BarChart label="Horizontal" {...bar} orientation="horizontal" />
        <DonutChart label="Regions" data={[{ id: "a", name: "EU", value: 60 }, { id: "b", name: "US", value: 40 }]} centerLabel="requests" />
      </>,
    );
    const donut = screen.getByRole("img", { name: "Regions" });
    expect(screen.getByText("100")).toBeInTheDocument();
    donut.focus();
    fireEvent.keyDown(donut, { key: "ArrowRight" });
    expect(screen.getAllByText("EU: 60 (60%)").length).toBeGreaterThan(0);
    expect(container.querySelectorAll("rect.laf-tween.laf-anim-grow-x").length).toBeGreaterThan(0);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("ChartCard: range selector, legend toggle, refresh/export and empty/loading/error states", async () => {
    const onRange = vi.fn();
    const onExport = vi.fn();
    const onRefresh = vi.fn();
    const seen: unknown[] = [];
    const { container, rerender } = wrap(
      <ChartCard title="Traffic" ranges={[{ value: "1h", label: "1h" }, { value: "24h", label: "24h" }]} onRangeChange={onRange} legendToggle onExport={onExport} onRefresh={onRefresh}>
        {(ctx) => (seen.push(ctx), <span>chart legend={String(ctx.legend)}</span>)}
      </ChartCard>,
    );
    fireEvent.click(screen.getByRole("radio", { name: "24h" }));
    expect(onRange).toHaveBeenCalledWith("24h");
    fireEvent.click(screen.getByRole("button", { name: "Hide legend" }));
    expect(screen.getByText("chart legend=false")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Export" }));
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(onExport).toHaveBeenCalled();
    expect(onRefresh).toHaveBeenCalled();
    expect(await axe(container)).toHaveNoViolations();
    const states = [{ empty: true }, { loading: true }, { error: true }] as const;
    for (const st of states) {
      rerender(
        <LafProvider>
          <ChartCard title="Traffic" {...st}>
            <span>chart</span>
          </ChartCard>
        </LafProvider>,
      );
      expect(screen.queryByText("chart")).toBeNull();
    }
    expect(screen.getByRole("alert")).toHaveTextContent("Could not load the chart");
  });

  it("AreaChart reuses the time-series engine (reduced-motion safe, data table alternative)", async () => {
    const T0 = Date.UTC(2026, 0, 1);
    const points = Array.from({ length: 10 }, (_, i) => [T0 + i * 60_000, i] as [number, number]);
    const { container } = wrap(<AreaChart label="Traffic" stacked legend={false} series={[{ id: "a", name: "A", unit: "count", points }, { id: "b", name: "B", unit: "count", points }]} />);
    expect(screen.getByRole("img", { name: "Traffic" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "A" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Show data" }));
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders Hungarian strings and an RTL page without violations", async () => {
    document.documentElement.dir = "rtl";
    const { container } = wrap(<ChartCard title="Forgalom" onRefresh={() => {}}><BarChart label="Üzemelések" {...bar} /></ChartCard>, "hu");
    expect(screen.getByRole("button", { name: "Frissítés" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Adattábla megjelenítése" })).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
    document.documentElement.dir = "ltr";
  });
});

describe("chart animation & tooltips", () => {
  const bar = { categories: ["A", "B", "C"], series: [{ id: "x", name: "Alpha", data: [1, 2, 3] }, { id: "y", name: "Beta", data: [3, 2, 1] }] };
  const donut = [{ id: "a", name: "EU", value: 60 }, { id: "b", name: "US", value: 40 }];
  const segments = [{ id: "low", name: "Low", value: 6 }, { id: "crit", name: "Critical", value: 12 }];
  const T0 = Date.UTC(2026, 0, 1);
  const points = Array.from({ length: 5 }, (_, i) => [T0 + i * 60_000, i + 1] as [number, number]);
  const series = [{ id: "a", name: "Alpha", unit: "count" as const, points }, { id: "b", name: "Beta", unit: "count" as const, points }];
  const matchMedia = window.matchMedia;
  afterEach(() => {
    window.matchMedia = matchMedia;
  });
  const reduceMotion = () => {
    window.matchMedia = ((q: string) => ({ matches: q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {} })) as never;
  };
  const all = (animate?: boolean) => (
    <>
      <BarChart label="Bars" {...bar} animate={animate} />
      <DonutChart label="Donut" data={donut} animate={animate} />
      <SegmentedBar label="Seg" segments={segments} animate={animate} />
      <ThresholdDonut label="Ring" value={50} animate={animate} />
      <RadialGauge label="Gauge" value={50} animate={animate} />
      <Heatmap label="Heat" rows={["Mon"]} columns={["00", "12"]} values={[[1, 9]]} animate={animate} />
      <AreaChart label="Area" series={series} animate={animate} />
    </>
  );

  it("animates by default (entry classes, data-animate=on) and a custom config sets the timing", () => {
    const { container } = wrap(all());
    expect(container.querySelectorAll('[data-animate="off"]').length).toBe(0);
    expect(container.querySelectorAll(".laf-anim").length).toBeGreaterThan(10);
    const timed = wrap(<BarChart label="Timed" {...bar} animate={{ duration: 900, stagger: 100, easing: "linear" }} />);
    expect(timed.container.querySelector<SVGElement>("svg")!.style.getPropertyValue("--laf-dur")).toBe("900ms");
    expect(timed.container.querySelector("rect.laf-anim-grow-y")).not.toBeNull();
    expect(timed.container.querySelectorAll<SVGElement>("rect.laf-anim-grow-y")[2]!.style.getPropertyValue("--laf-delay")).toBe("100ms");
  });

  it("animate={false} and prefers-reduced-motion turn every animation off", () => {
    const off = wrap(all(false));
    expect(off.container.querySelectorAll(".laf-anim, .laf-tween").length).toBe(0);
    expect(off.container.querySelectorAll('[data-animate="on"]').length).toBe(0);
    off.unmount();
    reduceMotion();
    const rm = wrap(all(true));
    expect(rm.container.querySelectorAll(".laf-anim, .laf-tween").length).toBe(0);
    expect(rm.container.querySelectorAll('[data-animate="off"]').length).toBeGreaterThan(5);
  });

  it("hover shows a per-segment tooltip (role=tooltip, linked by aria-describedby), dims the others and clears on leave / outside press", () => {
    wrap(<DonutChart label="Regions" data={donut} />);
    const svg = screen.getByRole("img", { name: "Regions" });
    const arcs = svg.querySelectorAll("path");
    fireEvent.pointerEnter(arcs[0]!);
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("EU");
    expect(tip).toHaveTextContent("60 (60%)");
    expect(tip.className).toMatch(/pointer-events-none/);
    expect(svg.getAttribute("aria-describedby")).toContain(tip.id);
    expect(arcs[1]).toHaveClass("opacity-40");
    fireEvent.pointerLeave(svg);
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.pointerEnter(arcs[1]!);
    expect(screen.getByRole("tooltip")).toHaveTextContent("US");
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("keyboard: arrows move the tooltip between segments, it is announced, Escape dismisses", () => {
    wrap(<SegmentedBar label="Severity" segments={segments} />);
    const bar = screen.getByRole("img", { name: /Severity/ });
    bar.focus();
    fireEvent.keyDown(bar, { key: "ArrowRight" });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Low");
    expect(screen.getAllByText(/Low: 6 \(33\.3%\)/).length).toBeGreaterThan(0);
    fireEvent.keyDown(bar, { key: "ArrowRight" });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Critical");
    fireEvent.keyDown(bar, { key: "Home" });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Low");
    fireEvent.keyDown(bar, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("custom render function, {formatter, header} and tooltip={false}", () => {
    const render = vi.fn(({ point, series: rows, index }: { point: { label: string }; series: { name: string }[]; index: number }) => <span>{`custom ${point.label} #${index} ${rows.map((r) => r.name).join("+")}`}</span>);
    const { rerender } = wrap(<BarChart label="Deploys" {...bar} tooltip={render} />);
    const svg = screen.getByRole("img", { name: "Deploys" });
    fireEvent.keyDown(svg, { key: "ArrowRight" });
    fireEvent.keyDown(svg, { key: "ArrowRight" });
    expect(screen.getByRole("tooltip")).toHaveTextContent("custom B #1 Alpha+Beta");
    const again = (tooltip: React.ComponentProps<typeof BarChart>["tooltip"]) => rerender(<LafProvider><BarChart label="Deploys" {...bar} tooltip={tooltip} /></LafProvider>);
    again({ header: (c) => `Week ${c.point.label}`, formatter: (r) => `${r.formatted}!` });
    expect(screen.getByRole("tooltip")).toHaveTextContent("Week B");
    expect(screen.getByRole("tooltip")).toHaveTextContent("2!");
    again(false);
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(screen.getByRole("img", { name: "Deploys" }).getAttribute("aria-describedby")).not.toMatch(/tip/);
  });

  it("time series: keyboard crosshair shows a shared multi-series tooltip, Escape dismisses, data table fallback stays", async () => {
    const { container } = wrap(<AreaChart label="Traffic" series={series} />);
    const svg = screen.getByRole("img", { name: "Traffic" });
    svg.focus();
    fireEvent.keyDown(svg, { key: "ArrowRight" });
    fireEvent.keyDown(svg, { key: "ArrowRight" });
    const tip = screen.getByRole("tooltip");
    expect(tip).toHaveTextContent("Alpha");
    expect(tip).toHaveTextContent("Beta");
    fireEvent.keyDown(svg, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Show data" }));
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("heatmap cells show a tooltip on focus and Escape hides it", () => {
    wrap(<Heatmap label="Load" rows={["Mon"]} columns={["00", "12"]} values={[[1, 9]]} />);
    const cell = screen.getByRole("gridcell", { name: "Mon 00: 1" });
    fireEvent.focus(cell);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Mon · 00");
    expect(cell.getAttribute("aria-describedby")).toBe(screen.getByRole("tooltip").id);
    fireEvent.keyDown(cell, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("ThresholdDonut and UtilizationCard forward the props and stay axe clean with an open tooltip", async () => {
    const { container } = wrap(<UtilizationCard variant="donut" title="CPU" value={80} animate={false} />);
    const ring = screen.getByRole("img", { name: /CPU/ });
    fireEvent.focus(ring);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Warning");
    expect(container.querySelector(".laf-anim")).toBeNull();
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("utilization", () => {
  const segments = [
    { id: "low", name: "Low", value: 6 },
    { id: "crit", name: "Critical", value: 12 },
    { id: "zero", name: "None", value: 0 },
  ];

  it("SegmentedBar sizes segments proportionally and exposes a text summary and list legend", () => {
    const { container } = wrap(<SegmentedBar label="Recommendations" segments={segments} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("aria-label", expect.stringContaining("Critical: 12"));
    const flex = [...container.querySelectorAll<HTMLElement>("[data-segment]")].map((e) => e.style.flexGrow);
    expect(flex).toEqual(["6", "12"]);
    expect(within(screen.getByRole("list", { name: "Segments" })).getAllByRole("listitem")).toHaveLength(3);
  });

  it("ThresholdDonut picks the tone by threshold and lists thresholds in text", () => {
    const { rerender } = wrap(<ThresholdDonut label="CPU" value={80} subtext="of 100 GBps" />);
    expect(screen.getByRole("img")).toHaveAttribute("aria-label", expect.stringMatching(/80%.*60%.*90%.*Above the warning threshold/));
    expect(screen.getByText("Warning:")).toBeInTheDocument();
    expect(screen.getByText("Critical:")).toBeInTheDocument();
    expect(document.querySelector("circle.text-warn:not(.opacity-50)")).not.toBeNull();
    rerender(<LafProvider><ThresholdDonut label="CPU" value={95} /></LafProvider>);
    expect(document.querySelector("circle.text-danger:not(.opacity-50)")).not.toBeNull();
  });

  it("UtilizationCard bar + donut: clickable alert and details link, axe clean, hu", async () => {
    const onAlert = vi.fn();
    const onDetails = vi.fn();
    const { container } = wrap(
      <>
        <UtilizationCard title="Recommendations" headingLevel={2} subtitle="System" alertText="25 incidents detected" onAlertClick={onAlert} segments={segments} onDetails={onDetails} />
        <UtilizationCard variant="donut" title="CPU usage" headingLevel={2} value={80} subtext="of 100 GBps" detailsHref="#d" />
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "25 incidents detected" }));
    fireEvent.click(screen.getByRole("button", { name: "See details" }));
    expect(onAlert).toHaveBeenCalledOnce();
    expect(onDetails).toHaveBeenCalledOnce();
    expect(screen.getByRole("link", { name: "See details" })).toHaveAttribute("href", "#d");
    expect((await axe(container)).violations).toEqual([]);
  });

  it("is localised", () => {
    wrap(<UtilizationCard variant="donut" title="CPU" value={50} detailsHref="#" />, "hu");
    expect(screen.getByRole("link", { name: "Részletek" })).toBeInTheDocument();
    expect(screen.getByText("Figyelmeztetés:")).toBeInTheDocument();
  });
});

describe("dashboard demo", () => {
  it("renders with the user's avatar, switches range, raises toasts and has no a11y violations", async () => {
    const Dashboard = (await import("../playground/pages/Dashboard")).default;
    const { container } = wrap(<Dashboard />);
    const avatars = container.querySelectorAll('img[src="/paalgyula.jpg"]');
    expect(avatars.length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByRole("img", { name: "Paál Gyula" }).length).toBeGreaterThanOrEqual(2);
    fireEvent.click(screen.getAllByRole("radio", { name: "24h" })[0]!);
    expect(screen.getAllByRole("radio", { name: "24h" })[0]).toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "Trigger deploy" }));
    expect(screen.getByRole("region", { name: "Notifications" })).toHaveTextContent("Deploy #483 started");
    fireEvent.click(screen.getByRole("button", { name: /Healthy/ }));
    expect((await axe(container)).violations).toEqual([]);
  }, 20000);
});
