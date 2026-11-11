import * as React from "react";
import { Badge, DefinitionList, EventConsole, LogViewer, PageSection, ServerDataGrid, Tabs, TabsContent, TabsList, TabsTrigger, TraceTimeline, useLaf, type ConsoleEvent, type FilterField, type GridColumn, type LogLine, type ServerGridRequest, type TraceHop } from "../../../lib";
import { Async, useAsync, useMail } from "./context";
import type { HTTPExchange, TraceSummary } from "./types";

const PROTOCOLS = ["smtp", "imap", "jmap", "dav", "exchange", "pop3"];
const filterFields: FilterField[] = [
  { key: "protocol", type: "enum", options: PROTOCOLS.map((value) => ({ value })) },
  { key: "status", type: "enum", options: [{ value: "ok" }, { value: "error" }] },
];

function hopsOf(x: HTTPExchange): TraceHop[] {
  const s = x.summary;
  const start = Date.parse(s.startedAt);
  const failed = s.status >= 400 || !!s.error;
  return [
    { id: "accept", time: start, label: `${s.protocol.toUpperCase()} connection accepted`, detail: `${s.clientIp} · ${s.userAgent || "unknown client"}`, tone: "neutral", elapsedMs: 0 },
    { id: "auth", time: start + 2, label: s.principal ? `Authenticated as ${s.principal}` : "Anonymous", detail: s.accountId || undefined, tone: s.principal ? "ok" : "warn", elapsedMs: 2 },
    { id: "op", time: start + Math.round(s.durationMs / 2), label: `${s.method} ${s.operation || s.path}`, detail: `${s.requestBytes} B in`, tone: "primary", elapsedMs: Math.round(s.durationMs / 2) },
    { id: "done", time: start + s.durationMs, label: failed ? `Failed with ${s.status}` : `Completed with ${s.status}`, detail: s.error || s.responseCodes.join(", ") || `${s.responseBytes} B out`, tone: failed ? "danger" : "ok", elapsedMs: s.durationMs },
  ];
}

function TraceDetail({ id }: { id: string }) {
  const state = useAsync((a) => a.trace.get(id), [id]);
  const { format } = useLaf();
  return (
    <Async state={state} rows={5}>
      {(x) => (
        <div className="grid gap-4">
          <TraceTimeline hops={hopsOf(x)} />
          <DefinitionList
            items={[
              { label: "Trace ID", value: x.summary.traceId, mono: true, copy: x.summary.traceId },
              { label: "Session", value: `${x.summary.sessionId} #${x.summary.sessionSeq}`, mono: true },
              { label: "Started", value: format.dateTime(x.summary.startedAt) },
              { label: "Duration", value: `${x.summary.durationMs} ms` },
              { label: "Path", value: x.summary.path, mono: true },
            ]}
          />
          <section className="grid gap-1"><h3 className="m-0 text-sm font-semibold">Request headers</h3><pre className="m-0 overflow-x-auto rounded-md bg-muted-bg p-2 text-xs">{x.requestHeaders.map((h) => `${h.name}: ${h.value}`).join("\n") || "—"}</pre></section>
          <section className="grid gap-1"><h3 className="m-0 text-sm font-semibold">Response body</h3><pre className="m-0 max-h-48 overflow-auto rounded-md bg-muted-bg p-2 text-xs">{x.responseBody || "—"}</pre></section>
        </div>
      )}
    </Async>
  );
}

function LiveTail() {
  const { api } = useMail();
  const { format } = useLaf();
  const [live, setLive] = React.useState(false);
  const [rows, setRows] = React.useState<TraceSummary[]>([]);
  React.useEffect(() => {
    if (!live) return;
    return api.trace.tail((t) => setRows((r) => [t, ...r].slice(0, 200)), { backlog: 10 });
  }, [api, live]);
  const events = React.useMemo<ConsoleEvent[]>(
    () => rows.map((t) => ({ id: `${t.traceId}-${t.sessionSeq}`, time: t.startedAt, severity: t.status >= 500 ? "error" : t.status >= 400 ? "warning" : "info", message: `${t.method} ${t.operation || t.path} → ${t.status}`, source: t.protocol, user: t.principal, details: `${t.clientIp} · ${t.durationMs} ms · ${t.userAgent}` })),
    [rows],
  );
  const lines = React.useMemo<LogLine[]>(
    () => [...rows].reverse().map((t) => ({ time: format.dateTime(t.startedAt), level: t.status >= 500 ? "error" : t.status >= 400 ? "warn" : "info", text: `[${t.protocol}] ${t.principal || "-"} ${t.method} ${t.path} ${t.status} ${t.durationMs}ms` })),
    [rows, format],
  );
  return (
    <div className="grid gap-4">
      <EventConsole events={events} liveTail={live} onLiveTailChange={setLive} />
      <LogViewer label="Trace log" lines={lines} height={200} downloadName="traces.log" />
    </div>
  );
}

export default function TracePage() {
  const { api, openDrawer } = useMail();
  const { format } = useLaf();
  const fetcher = React.useCallback((req: ServerGridRequest) => api.trace.list(req), [api]);
  const columns: GridColumn<TraceSummary>[] = [
    { id: "startedAt", header: "Time", sortable: true, width: 160, cell: (t) => format.dateTime(t.startedAt) },
    { id: "protocol", header: "Protocol", sortable: true, width: 100, cell: (t) => t.protocol.toUpperCase() },
    { id: "operation", header: "Operation", sortable: true, width: 200, cell: (t) => t.operation || t.path },
    { id: "principal", header: "Principal", sortable: true, width: 200, cell: (t) => t.principal || "—" },
    { id: "status", header: "Status", sortable: true, width: 100, cell: (t) => <Badge tone={t.status >= 500 ? "danger" : t.status >= 400 ? "warn" : "ok"}>{t.status}</Badge> },
    { id: "durationMs", header: "Duration", sortable: true, numeric: true, width: 100, cell: (t) => `${t.durationMs} ms` },
  ];
  return (
    <PageSection aria-label="Message trace">
      <Tabs defaultValue="search">
        <TabsList aria-label="Trace views">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="live">Live tail</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <ServerDataGrid<TraceSummary>
            label="Traces"
            columns={columns}
            rowId={(t) => t.traceId}
            fetcher={fetcher}
            initialSort={[{ id: "startedAt", dir: "desc" }]}
            pageSize={10}
            filterFields={filterFields}
            searchPlaceholder="Search path, principal or trace ID…"
            onRowActivate={(t) => openDrawer({ key: t.traceId, title: `Trace ${t.traceId.slice(0, 8)}`, size: 640, content: <TraceDetail id={t.traceId} /> })}
            height={440}
          />
        </TabsContent>
        <TabsContent value="live"><LiveTail /></TabsContent>
      </Tabs>
    </PageSection>
  );
}
