import { RefreshCw, RotateCcw, Send, Trash2 } from "lucide-react";
import * as React from "react";
import { Alert, Button, ConfirmDialog, DefinitionList, MetricCard, MetricGrid, PageSection, QueueStatusBadge, ServerDataGrid, useLaf, type FilterField, type GridColumn, type ServerGridController, type ServerGridRequest } from "../../../lib";
import { Async, num, useAsync, useMail, useRun } from "./context";
import type { OutboundJob, OutboundStatus } from "./types";

const STATUSES: OutboundStatus[] = ["PENDING", "TRANSIENT_FAILURE", "PERMANENT_FAILURE", "DELIVERED"];
const filterFields: FilterField[] = [{ key: "status", type: "enum", options: STATUSES.map((value) => ({ value })) }];

function JobDetail({ id }: { id: string }) {
  const { api } = useMail();
  const { format } = useLaf();
  const run = useRun();
  const state = useAsync((a) => a.queue.get(id), [id], { live: true });
  return (
    <Async state={state} rows={5}>
      {(j) => (
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center gap-2"><QueueStatusBadge status={j.status} /><span className="text-sm text-muted">{j.attempts} attempt{j.attempts === 1 ? "" : "s"}</span></div>
          {j.status === "TRANSIENT_FAILURE" && <Alert tone="warning" title="Delivery is being retried" description={j.smtpResponse} />}
          {j.status === "PERMANENT_FAILURE" && <Alert tone="danger" title="Delivery failed permanently" description={j.smtpResponse} />}
          <DefinitionList
            items={[
              { label: "Job ID", value: j.id, mono: true, copy: j.id },
              { label: "Sender", value: j.sender },
              { label: "Recipients", value: j.recipients.join(", ") },
              { label: "Remote MTA", value: j.remoteMta || "—" },
              { label: "SMTP response", value: j.smtpResponse || "—", mono: true },
              { label: "Size", value: format.bytes(j.size) },
              { label: "Created", value: format.dateTime(j.createdAt) },
              { label: "Next retry", value: j.nextRetry ? format.dateTime(j.nextRetry) : "—" },
            ]}
          />
          <div className="flex gap-2">
            <Button leftIcon={<RotateCcw aria-hidden />} disabled={j.status === "DELIVERED"} onClick={() => run(() => api.queue.retry(j.id), "Retry scheduled")}>Retry now</Button>
          </div>
        </div>
      )}
    </Async>
  );
}

export default function QueuePage() {
  const { api, openDrawer, closeDrawer, version } = useMail();
  const { format } = useLaf();
  const run = useRun();
  const ctl = React.useRef<ServerGridController<OutboundJob>>(null);
  const stats = useAsync((a) => a.queue.stats(), [], { live: true });
  const [flushing, setFlushing] = React.useState(false);
  const [removing, setRemoving] = React.useState<OutboundJob>();
  const fetcher = React.useCallback((req: ServerGridRequest) => api.queue.list(req), [api]);
  React.useEffect(() => {
    if (version > 0) ctl.current?.refresh();
  }, [version]);

  const columns: GridColumn<OutboundJob>[] = [
    { id: "id", header: "Job", sortable: true, width: 120, cell: (j) => <code>{j.id}</code> },
    { id: "sender", header: "Sender", sortable: true, width: 200, cell: (j) => j.sender },
    { id: "recipients", header: "Recipients", sortable: true, width: 220, cell: (j) => (j.recipients.length > 1 ? `${j.recipients[0]} +${j.recipients.length - 1}` : j.recipients[0]) },
    { id: "status", header: "Status", sortable: true, width: 160, cell: (j) => <QueueStatusBadge status={j.status} /> },
    { id: "attempts", header: "Attempts", sortable: true, numeric: true, width: 100, cell: (j) => j.attempts },
    { id: "size", header: "Size", sortable: true, numeric: true, width: 100, cell: (j) => format.bytes(j.size) },
    { id: "createdAt", header: "Created", sortable: true, width: 160, cell: (j) => format.dateTime(j.createdAt) },
  ];

  return (
    <>
      <PageSection aria-label="Queue statistics">
        <Async state={stats} rows={1}>
          {(s) => (
            <MetricGrid>
              <MetricCard label="Pending" value={num(s.pendingCount)} />
              <MetricCard label="In flight" value={num(s.inFlightCount)} />
              <MetricCard label="Retrying" value={num(s.retryCount)} goodWhen="down" />
              <MetricCard label="Failed" value={num(s.failedCount)} goodWhen="down" />
            </MetricGrid>
          )}
        </Async>
      </PageSection>
      <PageSection aria-label="Outbound jobs">
        <ServerDataGrid<OutboundJob>
          label="Outbound jobs"
          columns={columns}
          rowId={(j) => j.id}
          fetcher={fetcher}
          controllerRef={ctl}
          initialSort={[{ id: "createdAt", dir: "desc" }]}
          pageSize={10}
          filterFields={filterFields}
          searchPlaceholder="Search sender, recipient or response…"
          onRowActivate={(j) => openDrawer({ key: j.id, title: `Job ${j.id}`, content: <JobDetail id={j.id} /> })}
          height={440}
          toolbarEnd={
            <>
              <Button variant="secondary" leftIcon={<RefreshCw aria-hidden />} onClick={() => ctl.current?.refresh()}>Refresh</Button>
              <Button leftIcon={<Send aria-hidden />} onClick={() => setFlushing(true)}>Flush queue</Button>
            </>
          }
          rowActions={(j) => [
            { id: "retry", label: "Retry now", icon: <RotateCcw aria-hidden />, disabled: j.status === "DELIVERED", onSelect: () => void run(() => api.queue.retry(j.id), "Retry scheduled") },
            { id: "remove", label: "Remove…", icon: <Trash2 aria-hidden />, danger: true, separatorBefore: true, onSelect: () => setRemoving(j) },
          ]}
        />
      </PageSection>
      <ConfirmDialog
        open={flushing}
        onOpenChange={setFlushing}
        title="Flush queue"
        description="Every pending and retrying job is attempted immediately, ignoring its backoff."
        confirmLabel="Flush"
        onConfirm={async () => {
          const r = await run(() => api.queue.flush(), "Queue flushed");
          if (r) setFlushing(false);
        }}
      />
      <ConfirmDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(undefined)}
        title="Remove job"
        description="The message is dropped without a bounce to the sender."
        items={removing ? [`${removing.id} → ${removing.recipients.join(", ")}`] : []}
        confirmLabel="Remove job"
        onConfirm={async () => {
          if (removing) await run(() => api.queue.remove(removing.id), "Job removed");
          setRemoving(undefined);
          closeDrawer();
        }}
      />
    </>
  );
}
