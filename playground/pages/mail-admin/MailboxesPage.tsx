import * as React from "react";
import { ConfirmDialog, Field, Input, PageSection, Select, Switch, Wizard, WizardReview } from "../../../lib";
import { AccountsGrid } from "./AccountsGrid";
import { useMail, useRun } from "./context";
import { MailboxDrawer } from "./MailboxDrawer";
import type { AccountInfo } from "./types";

const GB = 1024 ** 3;
const DOMAINS = ["pilab.hu", "pilab.example"];

function CreateWizard({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { api, openDrawer } = useMail();
  const run = useRun();
  const [f, setF] = React.useState({ local: "", domain: DOMAINS[0]!, displayName: "", department: "", quotaGb: "10", internalOnly: false });
  const reset = () => setF({ local: "", domain: DOMAINS[0]!, displayName: "", department: "", quotaGb: "10", internalOnly: false });
  const email = `${f.local.trim().toLowerCase()}@${f.domain}`;
  return (
    <Wizard
      mode="dialog"
      title="New mailbox"
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) reset();
      }}
      dirty={!!f.local || !!f.displayName}
      onFinish={async () => {
        const res = await run(() => api.accounts.ensure({ accountId: "", sourceRef: "admin-ui", email, kind: "user", quotaBytes: Math.round(Number(f.quotaGb) * GB), displayName: f.displayName }), `Mailbox ${email} created`);
        if (!res) return;
        if (f.internalOnly) await run(() => api.accounts.setPolicy(res.accountId, true));
        onOpenChange(false);
        reset();
        openDrawer({ key: res.accountId, title: f.displayName || email, content: <MailboxDrawer id={res.accountId} /> });
      }}
      steps={[
        {
          id: "identity",
          label: "Identity",
          validate: () => {
            const errs: string[] = [];
            if (!/^[a-z0-9._-]+$/i.test(f.local.trim())) errs.push("Enter a valid address (letters, digits, dot, dash, underscore).");
            if (!f.displayName.trim()) errs.push("Enter a display name.");
            return errs;
          },
          render: () => (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Display name" htmlFor="nm-name"><Input id="nm-name" value={f.displayName} onChange={(e) => setF({ ...f, displayName: e.target.value })} /></Field>
              <Field label="Department" htmlFor="nm-dept"><Input id="nm-dept" value={f.department} onChange={(e) => setF({ ...f, department: e.target.value })} /></Field>
              <Field label="Address" htmlFor="nm-local"><Input id="nm-local" value={f.local} onChange={(e) => setF({ ...f, local: e.target.value })} /></Field>
              <Field label="Domain" htmlFor="nm-domain">
                <Select id="nm-domain" value={f.domain} onChange={(e) => setF({ ...f, domain: e.target.value })}>
                  {DOMAINS.map((d) => <option key={d} value={d}>@{d}</option>)}
                </Select>
              </Field>
            </div>
          ),
        },
        {
          id: "limits",
          label: "Quota & policy",
          validate: () => (Number(f.quotaGb) >= 0 ? undefined : ["Quota cannot be negative."]),
          render: () => (
            <div className="grid gap-3">
              <Field label="Quota (GB, 0 = unlimited)" htmlFor="nm-quota"><Input id="nm-quota" type="number" min={0} value={f.quotaGb} onChange={(e) => setF({ ...f, quotaGb: e.target.value })} /></Field>
              <Switch checked={f.internalOnly} onChange={(e) => setF({ ...f, internalOnly: e.target.checked })}>Accept internal senders only</Switch>
            </div>
          ),
        },
        {
          id: "review",
          label: "Review",
          render: () => (
            <WizardReview items={[{ label: "Address", value: email }, { label: "Display name", value: f.displayName }, { label: "Department", value: f.department || "—" }, { label: "Quota", value: Number(f.quotaGb) ? `${f.quotaGb} GB` : "Unlimited" }, { label: "Internal senders only", value: f.internalOnly ? "Yes" : "No" }]} />
          ),
        },
      ]}
    />
  );
}

export default function MailboxesPage() {
  const { api, openDrawer, closeDrawer } = useMail();
  const run = useRun();
  const [creating, setCreating] = React.useState(false);
  const [deleting, setDeleting] = React.useState<AccountInfo>();
  const open = (a: AccountInfo) => openDrawer({ key: a.id, title: a.displayName, content: <MailboxDrawer id={a.id} /> });
  return (
    <PageSection aria-label="Mailboxes">
      <AccountsGrid label="Mailboxes" kinds={["user"]} onOpen={open} onCreate={() => setCreating(true)} createLabel="New mailbox" onDelete={setDeleting} />
      <CreateWizard open={creating} onOpenChange={setCreating} />
      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(undefined)}
        title="Delete mailbox"
        description="All messages, calendars and contacts of this account are scheduled for removal. This cannot be undone."
        items={deleting ? [deleting.email] : []}
        confirmLabel="Delete mailbox"
        confirmText={deleting?.email}
        onConfirm={async () => {
          if (deleting) await run(() => api.accounts.delete(deleting.id), "Mailbox deleted");
          setDeleting(undefined);
          closeDrawer();
        }}
      />
    </PageSection>
  );
}
