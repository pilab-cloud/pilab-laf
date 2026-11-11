import { HardDrive, Trash2, Wrench } from "lucide-react";
import * as React from "react";
import { Alert, Button, ConfirmDialog, Field, Input, MetricCard, MetricGrid, PageSection, Panel, Switch, useLaf } from "../../../lib";
import { UtilizationCard } from "../../../lib/charts";
import { Async, num, useAsync, useMail, useRun } from "./context";

type Result = { title: string; items: { label: string; value: string }[] };

export default function StoragePage() {
  const { api } = useMail();
  const { format } = useLaf();
  const run = useRun();
  const stats = useAsync((a) => a.storage.stats(), [], { live: true });
  const [result, setResult] = React.useState<Result>();
  const [gc, setGc] = React.useState({ olderThanDays: "7", apply: false });
  const [repair, setRepair] = React.useState({ accountId: "acc_gyula", dryRun: true });
  const [purge, setPurge] = React.useState({ olderThan: "30", dryRun: true });
  const [confirmGc, setConfirmGc] = React.useState(false);

  const runGc = async () => {
    const r = await run(() => api.storage.runGC({ olderThanSeconds: Number(gc.olderThanDays) * 86400, limit: 10_000, apply: gc.apply }), gc.apply ? "Garbage collection applied" : "Dry run finished");
    if (r) setResult({ title: gc.apply ? "Garbage collection" : "Garbage collection (dry run)", items: [{ label: "Candidates", value: num(r.candidates) }, { label: "Purged", value: num(r.purged) }, { label: "Freed", value: format.bytes(r.freedBytes) }] });
  };

  return (
    <>
      <PageSection aria-label="Storage usage">
        <Async state={stats} rows={2}>
          {(s) => (
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_2fr]">
              <UtilizationCard variant="donut" title="Blob store" headingLevel={2} value={Math.round(s.usedBytes / 1024 ** 3)} max={Math.round(s.capacityBytes / 1024 ** 3)} warnAt={70} dangerAt={90} subtext={`${format.bytes(s.usedBytes)} of ${format.bytes(s.capacityBytes)}`} />
              <MetricGrid>
                <MetricCard label="Blobs" value={num(s.blobCount)} icon={<HardDrive aria-hidden />} />
                <MetricCard label="Messages" value={num(s.messageCount)} />
                <MetricCard label="Tombstones" value={num(s.tombstones)} goodWhen="down" />
              </MetricGrid>
            </div>
          )}
        </Async>
      </PageSection>
      {result && (
        <PageSection aria-label="Last result">
          <Alert tone="success" title={result.title} onClose={() => setResult(undefined)} description={result.items.map((i) => `${i.label}: ${i.value}`).join(" · ")} />
        </PageSection>
      )}
      <PageSection aria-label="Maintenance" className="grid gap-4 lg:grid-cols-3">
        <Panel title="Garbage collection" headingLevel={2}>
          <div className="grid gap-3">
            <p className="m-0 text-sm text-muted">Removes blobs no message references. Run a dry run first.</p>
            <Field label="Older than (days)" htmlFor="gc-days"><Input id="gc-days" type="number" min={0} value={gc.olderThanDays} onChange={(e) => setGc({ ...gc, olderThanDays: e.target.value })} /></Field>
            <Switch checked={gc.apply} onChange={(e) => setGc({ ...gc, apply: e.target.checked })}>Apply changes (otherwise dry run)</Switch>
            <div><Button leftIcon={<Trash2 aria-hidden />} onClick={() => (gc.apply ? setConfirmGc(true) : void runGc())}>{gc.apply ? "Run garbage collection" : "Run dry run"}</Button>{" "}
              <Button
                variant="secondary"
                onClick={async () => {
                  const r = await run(() => api.admin.triggerGarbageCollection({ force: false, gracePeriodDays: Number(gc.olderThanDays) }), "Blob collection triggered");
                  if (r) setResult({ title: "Blob collection", items: [{ label: "Purged blobs", value: num(r.purgedBlobsCount) }, { label: "Freed", value: format.bytes(r.freedBytes) }] });
                }}
              >
                Trigger blob GC
              </Button></div>
          </div>
        </Panel>
        <Panel title="Repair threads" headingLevel={2}>
          <div className="grid gap-3">
            <p className="m-0 text-sm text-muted">Rebuilds conversation threading for one account.</p>
            <Field label="Account ID" htmlFor="rt-acc"><Input id="rt-acc" value={repair.accountId} onChange={(e) => setRepair({ ...repair, accountId: e.target.value })} /></Field>
            <Switch checked={repair.dryRun} onChange={(e) => setRepair({ ...repair, dryRun: e.target.checked })}>Dry run</Switch>
            <div>
              <Button
                variant="secondary"
                leftIcon={<Wrench aria-hidden />}
                onClick={async () => {
                  const r = await run(() => api.storage.repairThreads({ accountId: repair.accountId, dryRun: repair.dryRun }), "Thread repair finished");
                  if (r) setResult({ title: "Thread repair", items: [{ label: "Scanned", value: num(r.scanned) }, { label: "Updated", value: num(r.updated) }, { label: "Unresolved", value: num(r.unresolved) }, { label: "Split", value: num(r.splitThreads) }, { label: "Backfilled", value: num(r.backfilled) }] });
                }}
              >
                Repair threads
              </Button>
            </div>
          </div>
        </Panel>
        <Panel title="Purge expired messages" headingLevel={2}>
          <div className="grid gap-3">
            <p className="m-0 text-sm text-muted">Permanently removes trashed messages past retention.</p>
            <Field label="Older than (days)" htmlFor="pe-days"><Input id="pe-days" type="number" min={0} value={purge.olderThan} onChange={(e) => setPurge({ ...purge, olderThan: e.target.value })} /></Field>
            <Switch checked={purge.dryRun} onChange={(e) => setPurge({ ...purge, dryRun: e.target.checked })}>Dry run</Switch>
            <div>
              <Button
                variant="secondary"
                onClick={async () => {
                  const r = await run(() => api.storage.purgeExpired({ olderThan: new Date(Date.parse("2026-01-15T12:00:00Z") - Number(purge.olderThan) * 86_400_000).toISOString(), limit: 10_000, dryRun: purge.dryRun }), "Purge finished");
                  if (r) setResult({ title: "Purge expired messages", items: [{ label: "Mappings", value: num(r.purgedMappings) }, { label: "Messages", value: num(r.purgedMessages) }] });
                }}
              >
                Purge expired
              </Button>
            </div>
          </div>
        </Panel>
      </PageSection>
      <ConfirmDialog open={confirmGc} onOpenChange={setConfirmGc} title="Apply garbage collection" description="Unreferenced blobs older than the grace period are deleted from disk." items={[`Older than ${gc.olderThanDays} days`]} confirmLabel="Delete blobs" onConfirm={async () => { setConfirmGc(false); await runGc(); }} />
    </>
  );
}
