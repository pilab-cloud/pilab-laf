import { Clock, Inbox, MailCheck, ShieldAlert } from "lucide-react";
import { Alert, AlertGroup, Button, HealthGrid, MetricCard, MetricGrid, PageSection, StatusSummaryCard, useLaf } from "../../../lib";
import { AreaChart, ChartCard, LineChart, UtilizationCard, type TimeSeries } from "../../../lib/charts";
import { Async, num, useAsync, useMail } from "./context";

const sum = (p: [number, number][]) => p.reduce((a, [, v]) => a + v, 0);

export default function DashboardPage() {
  const { navigate } = useMail();
  const { format } = useLaf();
  const state = useAsync(async (a) => {
    const [metrics, services, queue, certs] = await Promise.all([a.ext.metrics(), a.ext.services(), a.queue.stats(), a.ext.certificates()]);
    return { metrics, services, queue, certs };
  });

  return (
    <Async state={state} rows={6}>
      {({ metrics, services, queue, certs }) => {
        const delivered = sum(metrics.delivered);
        const deferred = sum(metrics.deferred);
        const rate = delivered + deferred ? delivered / (delivered + deferred) : 1;
        const flow: TimeSeries[] = [
          { id: "delivered", name: "Delivered", unit: "count", points: metrics.delivered },
          { id: "deferred", name: "Deferred", unit: "count", points: metrics.deferred },
        ];
        const filtering: TimeSeries[] = [
          { id: "spam", name: "Spam rejected", unit: "count", points: metrics.spamRejected },
          { id: "grey", name: "Greylisted", unit: "count", points: metrics.greylisted },
        ];
        const depth: TimeSeries[] = [{ id: "depth", name: "Queue depth", unit: "count", points: metrics.queueDepth }];
        const msPerDay = 86_400_000;
        const expiring = certs.filter((c) => Date.parse(c.notAfter) - Date.parse("2026-01-15T12:00:00Z") < 30 * msPerDay);
        const down = services.filter((s) => s.health !== "up");
        return (
          <>
            {(expiring.length > 0 || down.length > 0) && (
              <PageSection aria-label="Alerts">
                <AlertGroup label="Alerts">
                  {expiring.map((c) => (
                    <Alert key={c.id} tone={Date.parse(c.notAfter) < Date.parse("2026-01-15T12:00:00Z") ? "danger" : "warning"} title={`Certificate ${Date.parse(c.notAfter) < Date.parse("2026-01-15T12:00:00Z") ? "expired" : "expires soon"}: ${c.subject}`} description={`Valid until ${format.dateTime(c.notAfter)}. Used by ${c.usedBy.join(", ")}.`} actions={<Button size="sm" variant="secondary" onClick={() => navigate("/protocols")}>Open protocols</Button>} />
                  ))}
                  {down.map((s) => (
                    <Alert key={s.id} tone={s.health === "down" ? "danger" : "warning"} title={`${s.name} is ${s.health}`} description={`Ports ${s.ports}`} />
                  ))}
                </AlertGroup>
              </PageSection>
            )}
            <PageSection aria-label="Key metrics">
              <MetricGrid>
                <MetricCard label="Queue depth" value={queue.pendingCount + queue.retryCount} icon={<Inbox aria-hidden />} sparkline={metrics.queueDepth.map(([, v]) => v)} goodWhen="down" />
                <MetricCard label="Delivery rate" value={format.percent(rate, { fractionDigits: 1 })} icon={<MailCheck aria-hidden />} period="last 24 hours" />
                <MetricCard label="Spam rejected" value={num(sum(metrics.spamRejected))} icon={<ShieldAlert aria-hidden />} sparkline={metrics.spamRejected.map(([, v]) => v)} period="last 24 hours" />
                <MetricCard label="Greylisted" value={num(sum(metrics.greylisted))} icon={<Clock aria-hidden />} sparkline={metrics.greylisted.map(([, v]) => v)} period="last 24 hours" />
              </MetricGrid>
            </PageSection>
            <PageSection aria-label="Service health">
              <h2 className="mb-2 mt-0 text-base font-semibold">Service health</h2>
              <HealthGrid services={services.map((s) => ({ id: s.id, name: s.name, status: s.health, detail: s.ports, onSelect: () => navigate("/protocols") }))} />
            </PageSection>
            <PageSection aria-label="Mail flow" className="grid gap-4 lg:grid-cols-2">
              <ChartCard headingLevel={2} title="Delivery" description="Messages per hour">
                {({ legend }) => <AreaChart label="Delivered and deferred messages" series={flow} stacked legend={legend} height={220} />}
              </ChartCard>
              <ChartCard headingLevel={2} title="Spam and greylisting" description="Connections per hour">
                {({ legend }) => <LineChart label="Spam rejected and greylisted" series={filtering} legend={legend} height={220} />}
              </ChartCard>
              <ChartCard headingLevel={2} title="Queue depth" description="Pending and retrying jobs">
                {({ legend }) => <LineChart label="Queue depth" series={depth} legend={legend} height={220} thresholds={[{ value: 40, tone: "warn" }]} />}
              </ChartCard>
              <StatusSummaryCard
                title="Outbound queue"
                headingLevel={2}
                items={[
                  { id: "pending", label: "Pending", count: queue.pendingCount, tone: "primary", onClick: () => navigate("/mail-flow/queue") },
                  { id: "inflight", label: "In flight", count: queue.inFlightCount, tone: "ok", onClick: () => navigate("/mail-flow/queue") },
                  { id: "retry", label: "Retrying", count: queue.retryCount, tone: "warn", onClick: () => navigate("/mail-flow/queue") },
                  { id: "failed", label: "Failed", count: queue.failedCount, tone: "danger", onClick: () => navigate("/mail-flow/queue") },
                ]}
              />
            </PageSection>
            <PageSection aria-label="Utilization" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <UtilizationCard variant="donut" title="Blob storage" headingLevel={2} value={Math.round(metrics.storageUsedBytes / 1024 ** 3)} max={Math.round(metrics.storageCapacityBytes / 1024 ** 3)} warnAt={70} dangerAt={90} subtext={`${format.bytes(metrics.storageUsedBytes)} of ${format.bytes(metrics.storageCapacityBytes)}`} />
              <StatusSummaryCard
                title="Service status"
                headingLevel={2}
                items={[
                  { id: "up", label: "Running", count: services.filter((s) => s.health === "up").length, tone: "ok" },
                  { id: "degraded", label: "Degraded", count: services.filter((s) => s.health === "degraded").length, tone: "warn" },
                  { id: "down", label: "Down", count: services.filter((s) => s.health === "down").length, tone: "danger" },
                ]}
              />
              <MetricCard label="Stored blobs" value={num(metrics.blobCount)} />
            </PageSection>
          </>
        );
      }}
    </Async>
  );
}
