import { ImageOff } from "lucide-react";
import * as React from "react";
import { Avatar, Badge, DefinitionList, PageSection, Panel, ServerDataGrid, Button, useLaf, type FilterField, type GridColumn, type ServerGridRequest } from "../../../lib";
import { Async, useAsync, useMail, useRun } from "./context";
import type { GALEntry } from "./types";

const filterFields: FilterField[] = [{ key: "kind", type: "enum", options: ["user", "shared-mailbox", "room", "equipment", "group"].map((value) => ({ value })) }];

function AddressBooks({ accountId }: { accountId: string }) {
  const state = useAsync((a) => a.contacts.listAddressBooks(accountId), [accountId]);
  const { format } = useLaf();
  return (
    <Async state={state} rows={2}>
      {(books) => (
        <ul className="m-0 grid list-none gap-1 p-0">
          {books.map((b) => (
            <li key={b.id} className="flex justify-between gap-2 rounded-md border border-line px-3 py-1.5 text-sm"><span>{b.name}</span><span className="text-xs text-muted">sync token {b.syncToken} · {format.dateTime(b.createdAt)}</span></li>
          ))}
          {!books.length && <li className="text-sm text-muted">No address books.</li>}
        </ul>
      )}
    </Async>
  );
}

function GalDetail({ entry }: { entry: GALEntry }) {
  const { api } = useMail();
  const run = useRun();
  const [photo, setPhoto] = React.useState(!!entry.photoHash);
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Avatar name={entry.displayName} src={photo && entry.accountId === "acc_gyula" ? "/paalgyula.jpg" : undefined} size="lg" />
        <div className="min-w-0"><div className="font-semibold">{entry.displayName}</div><div className="truncate text-sm text-muted">{entry.title || entry.kind}</div></div>
        <Button className="ms-auto" variant="secondary" disabled={!photo} leftIcon={<ImageOff aria-hidden />} onClick={async () => { await run(() => api.contacts.deleteGALPhoto(entry.accountId), "GAL photo removed"); setPhoto(false); }}>Remove photo</Button>
      </div>
      <DefinitionList items={[{ label: "Email", value: entry.email, copy: entry.email }, { label: "Department", value: entry.department || "—" }, { label: "Office", value: entry.office || "—" }, { label: "Phone", value: entry.phone || "—" }, { label: "Mobile", value: entry.mobile || "—" }, { label: "DN", value: entry.dn, mono: true }]} />
      <section className="grid gap-2"><h3 className="m-0 text-sm font-semibold">Address books</h3><AddressBooks accountId={entry.accountId} /></section>
    </div>
  );
}

export default function ContactsPage() {
  const { api, openDrawer } = useMail();
  const fetcher = React.useCallback((req: ServerGridRequest) => api.contacts.searchGAL(req), [api]);
  const columns: GridColumn<GALEntry>[] = [
    { id: "displayName", header: "Name", sortable: true, width: 220, cell: (e) => <span className="flex min-w-0 items-center gap-2"><Avatar name={e.displayName} size="sm" /><span className="truncate">{e.displayName}</span></span> },
    { id: "email", header: "Email", sortable: true, width: 260, cell: (e) => e.email },
    { id: "kind", header: "Type", sortable: true, width: 120, cell: (e) => e.kind },
    { id: "department", header: "Department", sortable: true, width: 140, cell: (e) => e.department || "—" },
    { id: "photoHash", header: "Photo", width: 90, cell: (e) => (e.photoHash ? <Badge tone="ok">Yes</Badge> : <Badge tone="neutral">No</Badge>) },
  ];
  return (
    <PageSection aria-label="Global address list">
      <Panel title="Global address list" headingLevel={2}>
        <ServerDataGrid<GALEntry>
          label="Global address list"
          columns={columns}
          rowId={(e) => e.accountId}
          fetcher={fetcher}
          initialSort={[{ id: "displayName", dir: "asc" }]}
          pageSize={10}
          filterFields={filterFields}
          searchPlaceholder="Search the address list…"
          onRowActivate={(e) => openDrawer({ key: e.accountId, title: e.displayName, content: <GalDetail entry={e} /> })}
          height={440}
        />
      </Panel>
    </PageSection>
  );
}
