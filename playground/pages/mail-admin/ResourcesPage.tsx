import * as React from "react";
import { Button, DefinitionList, Field, Input, PageSection, Select, Switch, Tabs, TabsContent, TabsList, TabsTrigger } from "../../../lib";
import { AccountsGrid } from "./AccountsGrid";
import { Async, useAsync, useMail, useRun } from "./context";
import { MailboxDrawer } from "./MailboxDrawer";
import type { AccountInfo, ResourcePolicy } from "./types";

function PolicyForm({ initial, groups }: { initial: ResourcePolicy; groups: AccountInfo[] }) {
  const { api } = useMail();
  const run = useRun();
  const [p, setP] = React.useState(initial);
  return (
    <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); void run(() => api.calendar.setResourcePolicy(p), "Booking policy saved"); }}>
      <Switch checked={p.autoAccept} onChange={(e) => setP({ ...p, autoAccept: e.target.checked })}>Automatically accept booking requests</Switch>
      <Switch checked={p.allowConflicts} onChange={(e) => setP({ ...p, allowConflicts: e.target.checked })}>Allow conflicting bookings</Switch>
      <Field label="Maximum duration (minutes)" htmlFor="rp-max"><Input id="rp-max" type="number" min={15} step={15} value={p.maxDurationMin} onChange={(e) => setP({ ...p, maxDurationMin: Number(e.target.value) })} /></Field>
      <Field label="Approver group" htmlFor="rp-group" hint="Requests that are not auto-accepted go to this group.">
        <Select id="rp-group" value={p.approverGroup} onChange={(e) => setP({ ...p, approverGroup: e.target.value })}>
          <option value="">None</option>
          {groups.map((g) => <option key={g.id} value={g.id}>{g.displayName}</option>)}
        </Select>
      </Field>
      <div><Button type="submit">Save policy</Button></div>
    </form>
  );
}

function ResourceDrawer({ account }: { account: AccountInfo }) {
  const state = useAsync(async (a) => ({ policy: await a.calendar.getResourcePolicy(account.id), groups: (await a.accounts.list({ page: 1, pageSize: 100, filters: [{ id: "kind", value: "group" }] })).rows }), [account.id]);
  return (
    <div className="grid gap-4">
      <DefinitionList items={[{ label: "Address", value: account.email, copy: account.email }, { label: "Type", value: account.kind === "room" ? "Room" : "Equipment" }]} />
      <Async state={state} rows={4}>{({ policy, groups }) => <PolicyForm initial={policy} groups={groups} />}</Async>
    </div>
  );
}

export default function ResourcesPage() {
  const { openDrawer } = useMail();
  return (
    <PageSection aria-label="Shared and resource mailboxes">
      <Tabs defaultValue="shared">
        <TabsList aria-label="Recipient type">
          <TabsTrigger value="shared">Shared mailboxes</TabsTrigger>
          <TabsTrigger value="resources">Rooms & equipment</TabsTrigger>
        </TabsList>
        <TabsContent value="shared">
          <AccountsGrid label="Shared mailboxes" kinds={["shared-mailbox"]} onOpen={(a) => openDrawer({ key: a.id, title: a.displayName, content: <MailboxDrawer id={a.id} /> })} />
        </TabsContent>
        <TabsContent value="resources">
          <AccountsGrid label="Rooms and equipment" kinds={["room", "equipment"]} withStatus={false} onOpen={(a) => openDrawer({ key: a.id, title: a.displayName, content: <ResourceDrawer account={a} /> })} />
        </TabsContent>
      </Tabs>
    </PageSection>
  );
}
