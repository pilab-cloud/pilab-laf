import * as React from "react";
import { Alert, Badge, PageSection, ServerDataGrid, useLaf, type FilterField, type GridColumn, type ServerGridController, type ServerGridRequest } from "../../../lib";
import { useMail } from "./context";
import type { AuditEvent } from "./types";

const filterFields: FilterField[] = [{ key: "result", type: "enum", options: [{ value: "success" }, { value: "failure" }] }];

export default function AuditPage() {
  const { api, version } = useMail();
  const { format } = useLaf();
  const ctl = React.useRef<ServerGridController<AuditEvent>>(null);
  const fetcher = React.useCallback((req: ServerGridRequest) => api.ext.audit(req), [api]);
  React.useEffect(() => {
    if (version > 0) ctl.current?.refresh();
  }, [version]);
  const columns: GridColumn<AuditEvent>[] = [
    { id: "time", header: "Time", sortable: true, width: 170, cell: (e) => format.dateTime(e.time) },
    { id: "actor", header: "Actor", sortable: true, width: 180, cell: (e) => e.actor },
    { id: "action", header: "Action", sortable: true, width: 190, cell: (e) => <code>{e.action}</code> },
    { id: "target", header: "Target", sortable: true, width: 200, cell: (e) => e.target },
    { id: "result", header: "Result", sortable: true, width: 100, cell: (e) => <Badge tone={e.result === "success" ? "ok" : "danger"}>{e.result === "success" ? "Success" : "Failure"}</Badge> },
    { id: "detail", header: "Detail", width: 260, cell: (e) => e.detail },
  ];
  return (
    <PageSection aria-label="Audit log">
      <Alert tone="info" inline title="Backend gap" description="The pimail API has no audit RPC yet; this table shows the mock audit stream." className="mb-3" />
      <ServerDataGrid<AuditEvent> label="Audit log" columns={columns} rowId={(e) => e.id} fetcher={fetcher} controllerRef={ctl} initialSort={[{ id: "time", dir: "desc" }]} pageSize={10} filterFields={filterFields} searchPlaceholder="Search actor, action or target…" height={460} />
    </PageSection>
  );
}
