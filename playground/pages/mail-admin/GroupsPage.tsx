import * as React from "react";
import { Button, DefinitionList, PageSection, TransferList } from "../../../lib";
import { AccountsGrid } from "./AccountsGrid";
import { Async, useAsync, useMail, useRun } from "./context";
import type { AccountInfo } from "./types";

function MembersEditor({ group }: { group: AccountInfo }) {
  const { api } = useMail();
  const run = useRun();
  const users = useAsync((a) => a.accounts.list({ page: 1, pageSize: 500, filters: [{ id: "kind", value: { values: ["user"] } }], sort: [{ id: "displayName", dir: "asc" }] }));
  const [members, setMembers] = React.useState(group.members);
  const dirty = members.slice().sort().join() !== group.members.slice().sort().join();
  return (
    <div className="grid gap-4">
      <DefinitionList items={[{ label: "Address", value: group.email, copy: group.email }, { label: "Members", value: String(members.length) }]} />
      <Async state={users} rows={4}>
        {(page) => <TransferList items={page.rows.map((u) => ({ id: u.id, label: `${u.displayName} <${u.email}>` }))} value={members} onChange={setMembers} labels={{ available: "Available users", selected: "Group members" }} />}
      </Async>
      <div>
        <Button disabled={!dirty} onClick={() => run(() => api.accounts.setGroupMembers(group.id, members), "Members saved")}>Save members</Button>
      </div>
    </div>
  );
}

export default function GroupsPage() {
  const { openDrawer } = useMail();
  return (
    <PageSection aria-label="Groups">
      <p className="mt-0 text-sm text-muted">Distribution lists deliver to every direct member. Click a group to edit its membership.</p>
      <AccountsGrid label="Groups" kinds={["group"]} withStatus={false} onOpen={(g) => openDrawer({ key: g.id, title: g.displayName, size: 720, content: <MembersEditor group={g} /> })} />
    </PageSection>
  );
}
