import { Activity, Bell, Gauge as GaugeIcon, Gauge, Globe2, HardDrive, Rocket, Server, Timer, Users } from "lucide-react";
import * as React from "react";
import {
  Alert,
  AlertGroup,
  AppFooter,
  AppFrame,
  Avatar,
  Badge,
  Banner,
  Breadcrumb,
  Button,
  GaugeCard,
  Masthead,
  MastheadActions,
  MastheadBrand,
  MastheadContent,
  MastheadToggle,
  MetricCard,
  MetricGrid,
  NotificationCenter,
  PageHeader,
  PageSection,
  Sparkline,
  Switch,
  Dropdown,
  DropdownItem,
  MenuToggle,
  Panel,
  ProgressCard,
  Sidebar,
  StatusSummaryCard,
  ThemeToggle,
  TooltipProvider,
  ToastProvider,
  UserMenu,
  useToasts,
  type NavEntry,
  type NotificationItem,
} from "../../lib";
import { AreaChart, BarChart, ChartCard, DonutChart, Heatmap, LineChart, SegmentedBar, ThresholdDonut, UtilizationCard, type TimeSeries } from "../../lib/charts";

const USER = { name: "Paál Gyula", email: "gyula@pilab.hu", src: "/paalgyula.jpg" };
const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);
const RANGES = [
  { value: "1h", label: "1h", points: 60, step: 60_000 },
  { value: "6h", label: "6h", points: 72, step: 300_000 },
  { value: "24h", label: "24h", points: 96, step: 900_000 },
  { value: "7d", label: "7d", points: 84, step: 7_200_000 },
];

function wave(n: number, step: number, base: number, amp: number, seed: number): [number, number][] {
  return Array.from({ length: n }, (_, i) => [NOW - (n - 1 - i) * step, Math.max(0, base + amp * Math.sin(i / (6 + seed)) + amp * 0.3 * Math.sin(i * 1.7 + seed))]);
}

const spark = (seed: number) => Array.from({ length: 16 }, (_, i) => 50 + 20 * Math.sin(i / 2 + seed) + i * 1.5);

const notifications: NotificationItem[] = [
  { id: "n1", title: "Deploy #482 finished", body: "eu-west · 3 min", time: "2026-01-15T11:50:00Z", unread: true },
  { id: "n2", title: "Certificate renewed", time: "2026-01-15T09:05:00Z" },
];

const activity = [
  { id: "a1", who: USER.name, src: USER.src, what: "promoted build 482 to production", at: "11:50" },
  { id: "a2", who: "Anna Kovács", what: "acknowledged alert “High latency in eu-west”", at: "11:32" },
  { id: "a3", who: "Linus T", what: "scaled worker pool to 12 nodes", at: "10:58" },
  { id: "a4", who: "Grace Hopper", what: "rotated the API signing key", at: "09:41" },
];

const SHIFT = [
  { donut: [540, 310, 190, 60], bars: [[12, 18, 14, 22], [20, 16, 24, 19], [6, 9, 7, 11]], seg: [6, 3, 4, 12], cpu: 62 },
  { donut: [320, 480, 150, 110], bars: [[18, 11, 20, 14], [14, 22, 12, 25], [9, 5, 12, 8]], seg: [2, 9, 8, 5], cpu: 91 },
];

/** Animation & tooltip playground: toggle `animate`, replay the entry animation, and tween between two data sets. */
function MotionSection() {
  const [animate, setAnimate] = React.useState(true);
  const [run, setRun] = React.useState(0);
  const [set, setSet] = React.useState(0);
  const d = SHIFT[set]!;
  return (
    <PageSection aria-label="Animation and tooltips" className="grid gap-4">
      <Panel
        title="Animation & tooltips"
        headingLevel={2}
        actions={
          <div className="flex items-center gap-3">
            <Switch checked={animate} onChange={(e) => setAnimate(e.target.checked)}>
              Animate
            </Switch>
            <Button size="sm" variant="secondary" onClick={() => setRun((n) => n + 1)}>
              Replay
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setSet((n) => (n + 1) % SHIFT.length)}>
              Update data
            </Button>
          </div>
        }
      >
        <p className="mt-0 text-sm text-muted">
          Hover, tap or focus a chart (arrow keys, Escape) for its tooltip. Entry animations replay with “Replay”; “Update data” tweens to new values. Everything stops under reduced motion.
        </p>
        <div key={run} className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <BarChart
            label="Deployments (animated)"
            animate={animate}
            height={180}
            categories={["W1", "W2", "W3", "W4"]}
            series={[
              { id: "plat", name: "Platform", data: d.bars[0]! },
              { id: "apps", name: "Apps", data: d.bars[1]! },
              { id: "data", name: "Data", data: d.bars[2]! },
            ]}
          />
          <DonutChart label="Traffic (animated)" animate={animate} size={160} data={["Europe", "North America", "Asia", "Other"].map((name, i) => ({ id: name, name, value: d.donut[i]! }))} formatValue={(v) => `${v}k`} />
          <div className="grid content-start gap-4">
            <SegmentedBar label="Recommendations" animate={animate} segments={["Low", "Important", "Moderate", "Critical"].map((name, i) => ({ id: name, name, value: d.seg[i]! }))} />
            <div className="flex items-center gap-3 text-sm">
              <Sparkline label="Trend" data={spark(set + 1)} animate={animate} tooltip className="shrink-0" />
              <span className="text-muted">Sparkline with tooltip</span>
            </div>
          </div>
          <ThresholdDonut label="CPU (animated)" animate={animate} value={d.cpu} size={140} />
        </div>
      </Panel>
    </PageSection>
  );
}

function Content() {
  const { toast } = useToasts();
  const [range, setRange] = React.useState("6h");
  const [banner, setBanner] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [metricError, setMetricError] = React.useState(true);
  const r = RANGES.find((x) => x.value === range)!;

  const traffic = React.useMemo<TimeSeries[]>(
    () => [
      { id: "ok", name: "2xx", unit: "count", points: wave(r.points, r.step, 900, 220, 1) },
      { id: "redirect", name: "3xx", unit: "count", points: wave(r.points, r.step, 160, 50, 2) },
      { id: "err", name: "5xx", unit: "count", points: wave(r.points, r.step, 30, 14, 3) },
    ],
    [r],
  );
  const latency = React.useMemo<TimeSeries[]>(
    () => [
      { id: "p50", name: "p50", unit: "ms", points: wave(r.points, r.step, 120, 30, 4) },
      { id: "p95", name: "p95", unit: "ms", points: wave(r.points, r.step, 340, 90, 5) },
    ],
    [r],
  );

  const refresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      toast({ tone: "success", title: "Dashboard refreshed", description: "All panels are up to date." });
    }, 600);
  };

  return (
    <div className="grid gap-4">
      {banner && (
        <Banner tone="warn" sticky onDismiss={() => setBanner(false)} action={<Button size="sm" variant="secondary">View incident</Button>}>
          <strong>Degraded performance in eu-west.</strong> Latency is above the SLO since 11:20.
        </Banner>
      )}
      <PageSection aria-label="Key metrics" className="grid gap-4">
        <MetricGrid label="Key metrics">
          <MetricCard label="Requests per second" icon={<Activity />} value="1,284" unit="req/s" delta={12.4} period="vs last 7 days" sparkline={spark(1)} />
          <MetricCard label="Error rate" icon={<Server />} value="0.42" unit="%" delta={-8.1} goodWhen="down" period="vs last 7 days" sparkline={spark(2)} />
          <MetricCard label="p95 latency" icon={<Timer />} value="342" unit="ms" delta={6.3} goodWhen="down" period="vs last 7 days" sparkline={spark(3)} />
          <MetricCard label="Active sessions" icon={<Users />} value="8,920" delta={0} period="vs yesterday" />
          <MetricCard label="Billing sync" icon={<Globe2 />} value="Synced" error={metricError} onRetry={() => setMetricError(false)} />
        </MetricGrid>
        <AlertGroup label="Alerts">
          <Alert tone="danger" title="Certificate expires in 3 days" description="api.pilab.hu will stop serving HTTPS." actions={<Button size="sm" variant="secondary">Renew</Button>} detail="Issued by the internal CA on 2025-10-17. Renewal is automatic once the DNS challenge succeeds." />
        </AlertGroup>
      </PageSection>
      <PageSection aria-label="Traffic" className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <ChartCard headingLevel={2} title="Traffic" description="HTTP responses by class" ranges={RANGES.map(({ value, label }) => ({ value, label }))} range={range} onRangeChange={setRange} legendToggle onExport={() => toast({ title: "Export started", description: "traffic.csv" })} onRefresh={refresh} refreshing={refreshing}>
          {({ legend }) => <AreaChart label="HTTP responses by class" series={traffic} stacked legend={legend} height={240} />}
        </ChartCard>
        <ChartCard headingLevel={2} title="Traffic by region" description="Share of requests">
          {({ legend }) => (
            <DonutChart
              label="Traffic by region"
              legend={legend}
              size={180}
              data={[
                { id: "eu", name: "Europe", value: 540 },
                { id: "na", name: "North America", value: 310 },
                { id: "as", name: "Asia", value: 190 },
                { id: "other", name: "Other", value: 60 },
              ]}
              formatValue={(v) => `${v}k`}
              centerLabel="requests"
            />
          )}
        </ChartCard>
      </PageSection>
      <PageSection aria-label="Performance" className="grid gap-4 lg:grid-cols-2">
        <ChartCard headingLevel={2} title="Latency" description="Percentiles" ranges={RANGES.map(({ value, label }) => ({ value, label }))} range={range} onRangeChange={setRange}>
          {({ legend }) => <LineChart label="Latency percentiles" series={latency} legend={legend} thresholds={[{ value: 400, tone: "warn" }]} height={220} />}
        </ChartCard>
        <ChartCard headingLevel={2} title="Deployments by team" description="Last 4 weeks">
          {({ legend }) => (
            <BarChart
              label="Deployments by team"
              legend={legend}
              stacked
              height={220}
              categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
              series={[
                { id: "plat", name: "Platform", data: [12, 18, 14, 22] },
                { id: "apps", name: "Apps", data: [20, 16, 24, 19] },
                { id: "data", name: "Data", data: [6, 9, 7, 11] },
              ]}
            />
          )}
        </ChartCard>
      </PageSection>
      <PageSection aria-label="Capacity" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <GaugeCard title="CPU" value={62} unit="%" thresholds={[{ value: 0, tone: "ok" }, { value: 70, tone: "warn" }, { value: 90, tone: "danger" }]} description="12 nodes" />
        <GaugeCard title="Memory" value={83} unit="%" thresholds={[{ value: 0, tone: "ok" }, { value: 70, tone: "warn" }, { value: 90, tone: "danger" }]} description="of 384 GB" />
        <ProgressCard title="Object storage" value={7.2} max={10} unit="TB" meter warnAt={70} dangerAt={90} description="Quota resets monthly" />
        <StatusSummaryCard
          title="Services"
          items={[
            { id: "ok", label: "Healthy", count: 42, tone: "ok", onClick: () => toast({ tone: "info", title: "Filtered by Healthy" }) },
            { id: "warn", label: "Degraded", count: 3, tone: "warn", onClick: () => toast({ tone: "warning", title: "Filtered by Degraded" }) },
            { id: "down", label: "Down", count: 1, tone: "danger", onClick: () => toast({ tone: "error", title: "Filtered by Down", action: { label: "Open", onClick: () => {} } }) },
          ]}
        />
      </PageSection>
      <PageSection aria-label="Utilization" className="grid gap-4 md:grid-cols-2">
        <UtilizationCard
          title="Recommendations"
          headingLevel={2}
          filter={
            <Dropdown align="end" toggle={<MenuToggle size="sm">Filter</MenuToggle>}>
              <DropdownItem>All systems</DropdownItem>
              <DropdownItem>Production</DropdownItem>
              <DropdownItem>Staging</DropdownItem>
            </Dropdown>
          }
          subtitle="System"
          alertText="25 incidents detected"
          onAlertClick={() => toast({ tone: "warning", title: "Showing 25 incidents" })}
          segments={[
            { id: "low", name: "Low", value: 6, tone: "text-label-3 opacity-50" },
            { id: "important", name: "Important", value: 3, tone: "text-label-3" },
            { id: "moderate", name: "Moderate", value: 4, tone: "text-label-2" },
            { id: "critical", name: "Critical", value: 12, tone: "text-danger" },
          ]}
          detailsHref="#details"
        />
        <UtilizationCard variant="donut" title="CPU usage" headingLevel={2} value={80} max={100} warnAt={60} dangerAt={90} subtext="of 100 GBps" detailsHref="#details" />
      </PageSection>
      <MotionSection />
      <PageSection aria-label="Activity" className="grid gap-4 lg:grid-cols-2">
        <ChartCard headingLevel={2} title="Requests by hour" description="Average over the week">
          <div className="overflow-x-auto">
            <Heatmap
              label="Requests by weekday and time of day"
              rows={["Mon", "Tue", "Wed", "Thu", "Fri"]}
              columns={["00", "04", "08", "12", "16", "20"]}
              values={[[1, 2, 6, 9, 8, 4], [1, 3, 7, 10, 8, 3], [2, 3, 8, 9, 9, 5], [1, 2, 6, 8, 7, 4], [1, 2, 5, 7, 5, 2]]}
              cell={32}
            />
          </div>
        </ChartCard>
        <Panel title="Recent activity" headingLevel={2} actions={<Bell aria-hidden className="size-4 text-muted" />}>
          <ul className="m-0 grid list-none gap-3 p-0">
            {activity.map((a) => (
              <li key={a.id} className="flex items-center gap-3 text-sm">
                <Avatar name={a.who} src={a.src} />
                <span className="min-w-0 flex-1">
                  <strong>{a.who}</strong> {a.what}
                </span>
                <span className="text-xs text-muted tabular-nums">{a.at}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Button size="sm" variant="secondary" leftIcon={<Rocket aria-hidden />} onClick={() => toast({ tone: "success", title: "Deploy #483 started", description: "Production · eu-west", action: { label: "Undo", onClick: () => toast({ title: "Deploy cancelled" }) } })}>
              Trigger deploy
            </Button>
          </div>
        </Panel>
      </PageSection>
    </div>
  );
}

const nav: NavEntry[] = [
  { id: "overview", label: "Overview", icon: <GaugeIcon aria-hidden />, current: true, onSelect: () => {} },
  { id: "services", label: "Services", icon: <Server aria-hidden />, badge: <Badge>46</Badge>, onSelect: () => {} },
  { id: "storage", label: "Storage", icon: <HardDrive aria-hidden />, onSelect: () => {} },
];

/** Ops dashboard: KPI cards, charts with range selector, status summary, alerts, toasts and an activity feed in `AppFrame`. */
export default function DashboardDemo() {
  return (
    <TooltipProvider>
      <ToastProvider max={3}>
        <AppFrame
          className="h-[900px] overflow-hidden rounded-lg border border-line"
          persistKey="laf-demo-dashboard"
          masthead={
            <Masthead>
              <MastheadToggle />
              <MastheadBrand href="#" onClick={(e) => e.preventDefault()} logo={<span className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-on-primary">O</span>} title="Ops" subtitle="Platform dashboard" />
              <MastheadContent>
                <Badge tone="primary">production</Badge>
              </MastheadContent>
              <MastheadActions>
                <ThemeToggle persistKey="laf-demo-theme" />
                <NotificationCenter items={notifications} />
                <UserMenu name={USER.name} email={USER.email} avatarSrc={USER.src} onSignOut={() => {}} />
              </MastheadActions>
            </Masthead>
          }
          sidebar={<Sidebar items={nav} label="Main navigation" />}
          breadcrumb={<Breadcrumb items={[{ label: "Ops", href: "#" }, { label: "Overview", current: true }]} />}
          pageHeader={<PageHeader icon={<Gauge />} title="Platform overview" subtitle="Live health, traffic and capacity" badges={<Badge tone="ok">live</Badge>} />}
          footer={<AppFooter copyright="© 2026 Pilab" version="1.0.0" status={{ tone: "warn", label: "Degraded in eu-west" }} />}
        >
          <Content />
        </AppFrame>
      </ToastProvider>
    </TooltipProvider>
  );
}
