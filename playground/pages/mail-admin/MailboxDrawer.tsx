import { KeyRound, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import {
  Alert,
  Badge,
  Button,
  ConfirmDialog,
  DefinitionList,
  Field,
  Input,
  PermissionMatrix,
  Select,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  useLaf,
  CopyButton,
  QuotaBar,
} from "../../../lib";
import { Async, useAsync, useMail, useRun } from "./context";
import type { AccountInfo, MailboxACLGrant, SendAsGrant, VacationResponse } from "./types";

const GB = 1024 ** 3;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 border-b border-line pb-4 last:border-0">
      <h3 className="m-0 text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function ProfileTab({ account, onChanged }: { account: AccountInfo; onChanged: () => void }) {
  const { api } = useMail();
  const run = useRun();
  const [f, setF] = React.useState({ displayName: account.displayName, title: account.title, department: account.department, office: account.office, phone: account.phone, mobile: account.mobile });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((x) => ({ ...x, [k]: e.target.value }));
  const quota = useAsync((a) => a.accounts.getQuota(account.id), [account.id], { live: true });
  const [quotaGb, setQuotaGb] = React.useState<string>();
  const active = account.status === "active";
  return (
    <div className="grid gap-4">
      <Section title="Profile">
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await run(() => api.accounts.setProfile({ accountId: account.id, ...f }), "Profile saved");
            onChanged();
          }}
        >
          <Field label="Display name" htmlFor="mb-name"><Input id="mb-name" value={f.displayName} onChange={set("displayName")} required /></Field>
          <Field label="Job title" htmlFor="mb-title"><Input id="mb-title" value={f.title} onChange={set("title")} /></Field>
          <Field label="Department" htmlFor="mb-dept"><Input id="mb-dept" value={f.department} onChange={set("department")} /></Field>
          <Field label="Office" htmlFor="mb-office"><Input id="mb-office" value={f.office} onChange={set("office")} /></Field>
          <Field label="Phone" htmlFor="mb-phone"><Input id="mb-phone" value={f.phone} onChange={set("phone")} /></Field>
          <Field label="Mobile" htmlFor="mb-mobile"><Input id="mb-mobile" value={f.mobile} onChange={set("mobile")} /></Field>
          <div className="sm:col-span-2"><Button type="submit">Save profile</Button></div>
        </form>
      </Section>
      <Section title="Sign-in">
        <Switch
          checked={active}
          onChange={async (e) => {
            await run(() => api.accounts.setStatus(account.id, e.target.checked ? "active" : "suspended"), e.target.checked ? "Mailbox enabled" : "Mailbox suspended");
            onChanged();
          }}
        >
          Mailbox enabled
        </Switch>
        <Switch
          checked={account.internalOnly}
          onChange={async (e) => {
            await run(() => api.accounts.setPolicy(account.id, e.target.checked), "Policy updated");
            onChanged();
          }}
        >
          Accept internal senders only
        </Switch>
      </Section>
      <Section title="Storage quota">
        <Async state={quota} rows={1}>
          {(q) => (
            <>
              <QuotaBar usedBytes={q.usedBytes} quotaBytes={q.quotaBytes} />
              <form
                className="flex items-end gap-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  await run(() => api.accounts.setQuota(account.id, Math.round(Number(quotaGb ?? q.quotaBytes / GB) * GB)), "Quota updated");
                }}
              >
                <Field label="Quota (GB, 0 = unlimited)" htmlFor="mb-quota">
                  <Input id="mb-quota" type="number" min={0} step={1} value={quotaGb ?? String(Math.round(q.quotaBytes / GB))} onChange={(e) => setQuotaGb(e.target.value)} />
                </Field>
                <Button type="submit" variant="secondary">Set quota</Button>
              </form>
            </>
          )}
        </Async>
      </Section>
    </div>
  );
}

function AliasesTab({ account, onChanged }: { account: AccountInfo; onChanged: () => void }) {
  const { api } = useMail();
  const run = useRun();
  const [draft, setDraft] = React.useState("");
  const save = async (next: string[]) => {
    await run(() => api.accounts.setAliases(account.id, next), "Aliases saved");
    onChanged();
  };
  return (
    <Section title="Email aliases">
      <p className="m-0 text-sm text-muted">Primary address: <strong className="text-fg">{account.email}</strong></p>
      <ul className="m-0 grid list-none gap-1 p-0">
        {account.aliases.map((al) => (
          <li key={al} className="flex items-center justify-between gap-2 rounded-md border border-line px-3 py-1.5 text-sm">
            <span className="min-w-0 truncate">{al}</span>
            <Button size="sm" variant="ghost" aria-label={`Remove alias ${al}`} onClick={() => save(account.aliases.filter((x) => x !== al))}><Trash2 aria-hidden /></Button>
          </li>
        ))}
        {!account.aliases.length && <li className="text-sm text-muted">No aliases.</li>}
      </ul>
      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const v = draft.trim().toLowerCase();
          if (v && !account.aliases.includes(v)) void save([...account.aliases, v]);
          setDraft("");
        }}
      >
        <Field label="Add alias" htmlFor="mb-alias" className="grow"><Input id="mb-alias" type="email" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="name@pilab.hu" /></Field>
        <Button type="submit" variant="secondary" leftIcon={<Plus aria-hidden />}>Add</Button>
      </form>
    </Section>
  );
}

const RIGHTS = [
  { id: "lookup", label: "Lookup" },
  { id: "read", label: "Read" },
  { id: "write", label: "Write" },
  { id: "insert", label: "Insert" },
  { id: "delete", label: "Delete" },
];

function AclEditor({ account, grants, reload }: { account: AccountInfo; grants: MailboxACLGrant[]; reload: () => void }) {
  const { api } = useMail();
  const run = useRun();
  const toValue = (g: MailboxACLGrant[]) => Object.fromEntries(g.map((x) => [x.granteeId, x.rights]));
  const [value, setValue] = React.useState(() => toValue(grants));
  const baseline = React.useMemo(() => toValue(grants), [grants]);
  const roles = grants.map((g) => ({ id: g.granteeId, label: g.granteeDisplayName }));
  if (!grants.length) return <p className="m-0 text-sm text-muted">No delegates have access to this mailbox.</p>;
  return (
    <PermissionMatrix
      roles={roles}
      groups={[{ id: "mailbox", label: "Mailbox rights", permissions: RIGHTS }]}
      value={value}
      baseline={baseline}
      onChange={setValue}
      onDiscard={() => setValue(baseline)}
      onSave={async () => {
        for (const g of grants) {
          const rights = value[g.granteeId] ?? [];
          if (rights.join() !== g.rights.join()) await run(() => (rights.length ? api.accounts.setMailboxACL({ ...g, rights }) : api.accounts.deleteMailboxACL(account.id, g.granteeId)), `Rights for ${g.granteeDisplayName} saved`);
        }
        reload();
      }}
    />
  );
}

function DelegationTab({ account }: { account: AccountInfo }) {
  const { api } = useMail();
  const run = useRun();
  const grants = useAsync((a) => a.accounts.listSendAsGrants(account.id), [account.id], { live: true });
  const acl = useAsync((a) => a.accounts.getMailboxACL(account.id), [account.id], { live: true });
  const [from, setFrom] = React.useState("");
  const [kind, setKind] = React.useState<SendAsGrant["kind"]>("send-as");
  return (
    <div className="grid gap-4">
      <Section title="Send as / on behalf of">
        <p className="m-0 text-sm text-muted">Addresses this account may use in the From header.</p>
        <Async state={grants} rows={2}>
          {(list) => (
            <ul className="m-0 grid list-none gap-1 p-0">
              {list.map((g) => (
                <li key={g.fromAddress} className="flex items-center justify-between gap-2 rounded-md border border-line px-3 py-1.5 text-sm">
                  <span className="min-w-0 truncate">{g.fromAddress}</span>
                  <Badge tone={g.kind === "send-as" ? "primary" : "neutral"}>{g.kind === "send-as" ? "Send as" : "On behalf"}</Badge>
                  <Button size="sm" variant="ghost" aria-label={`Revoke ${g.fromAddress}`} onClick={() => run(() => api.accounts.revokeSendAs(account.id, g.fromAddress), "Grant revoked")}><Trash2 aria-hidden /></Button>
                </li>
              ))}
              {!list.length && <li className="text-sm text-muted">No grants.</li>}
            </ul>
          )}
        </Async>
        <form
          className="flex flex-wrap items-end gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!from.trim()) return;
            await run(() => api.accounts.grantSendAs(account.id, from.trim(), kind), "Grant added");
            setFrom("");
          }}
        >
          <Field label="From address" htmlFor="sa-from" className="grow"><Input id="sa-from" type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="support@pilab.hu" /></Field>
          <Field label="Permission" htmlFor="sa-kind"><Select id="sa-kind" value={kind} onChange={(e) => setKind(e.target.value as SendAsGrant["kind"])}><option value="send-as">Send as</option><option value="on-behalf">Send on behalf</option></Select></Field>
          <Button type="submit" variant="secondary">Grant</Button>
        </form>
      </Section>
      <Section title="Mailbox delegates">
        <Async state={acl} rows={3}>{(g) => <AclEditor key={g.map((x) => x.granteeId + x.rights.join()).join("|")} account={account} grants={g} reload={acl.reload} />}</Async>
      </Section>
    </div>
  );
}

function AppPasswordsTab({ account }: { account: AccountInfo }) {
  const { api } = useMail();
  const { format } = useLaf();
  const run = useRun();
  const list = useAsync((a) => a.accounts.listAppPasswords(account.id), [account.id], { live: true });
  const [label, setLabel] = React.useState("");
  const [secret, setSecret] = React.useState<string>();
  return (
    <Section title="App passwords">
      <p className="m-0 text-sm text-muted">Per-device credentials for IMAP, SMTP and DAV clients that cannot use single sign-on.</p>
      {secret && (
        <Alert tone="success" title="Copy this password now" description="It is shown only once." actions={<><code className="me-2">{secret}</code><CopyButton value={secret} label="Copy password" /></>} onClose={() => setSecret(undefined)} />
      )}
      <Async state={list} rows={2}>
        {(rows) => (
          <ul className="m-0 grid list-none gap-1 p-0">
            {rows.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2 rounded-md border border-line px-3 py-1.5 text-sm">
                <span className="min-w-0"><span className="block truncate font-medium">{p.label}</span><span className="block text-xs text-muted">{p.scopes.join(", ")} · {p.lastUsedAt ? `used ${format.relative(p.lastUsedAt)}` : "never used"}</span></span>
                {p.revokedAt ? <Badge tone="neutral">Revoked</Badge> : <Button size="sm" variant="secondary" onClick={() => run(() => api.accounts.revokeAppPassword(account.id, p.id), "App password revoked")}>Revoke</Button>}
              </li>
            ))}
            {!rows.length && <li className="text-sm text-muted">No app passwords.</li>}
          </ul>
        )}
      </Async>
      <form
        className="flex items-end gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!label.trim()) return;
          const res = await run(() => api.accounts.createAppPassword(account.id, label.trim(), ["imap", "smtp"]), "App password created");
          if (res) setSecret(res.secret);
          setLabel("");
        }}
      >
        <Field label="Device label" htmlFor="ap-label" className="grow"><Input id="ap-label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Thunderbird laptop" /></Field>
        <Button type="submit" variant="secondary" leftIcon={<KeyRound aria-hidden />}>Create</Button>
      </form>
    </Section>
  );
}

function SieveBlock({ account }: { account: AccountInfo }) {
  const { api } = useMail();
  const run = useRun();
  const scripts = useAsync((a) => a.accounts.listSieveScripts(account.id), [account.id], { live: true });
  const [name, setName] = React.useState("");
  const [body, setBody] = React.useState("");
  const [editing, setEditing] = React.useState<string>();
  return (
    <Section title="Sieve scripts">
      <Async state={scripts} rows={2}>
        {(rows) => (
          <ul className="m-0 grid list-none gap-1 p-0">
            {rows.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-line px-3 py-1.5 text-sm">
                <span className="min-w-0 truncate font-medium">{s.name}</span>
                {s.active && <Badge tone="ok">Active</Badge>}
                <span className="flex gap-1">
                  <Button size="sm" variant="secondary" onClick={() => { setEditing(s.name); setName(s.name); setBody(s.body); }}>Edit</Button>
                  {!s.active && <Button size="sm" variant="secondary" onClick={() => run(() => api.accounts.setActiveSieveScript(account.id, s.name), `${s.name} activated`)}>Activate</Button>}
                  <Button size="sm" variant="ghost" aria-label={`Delete script ${s.name}`} onClick={() => run(() => api.accounts.deleteSieveScript(account.id, s.name), "Script deleted")}><Trash2 aria-hidden /></Button>
                </span>
              </li>
            ))}
            {!rows.length && <li className="text-sm text-muted">No scripts.</li>}
          </ul>
        )}
      </Async>
      <form
        className="grid gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!name.trim()) return;
          await run(() => api.accounts.putSieveScript(account.id, name.trim(), body, false), "Script saved");
          setEditing(undefined);
          setName("");
          setBody("");
        }}
      >
        <Field label="Script name" htmlFor="sv-name"><Input id="sv-name" value={name} onChange={(e) => setName(e.target.value)} readOnly={!!editing} /></Field>
        <Field label="Script body" htmlFor="sv-body"><Textarea id="sv-body" rows={6} className="font-mono" value={body} onChange={(e) => setBody(e.target.value)} /></Field>
        <div><Button type="submit" variant="secondary">{editing ? "Save script" : "Add script"}</Button></div>
      </form>
    </Section>
  );
}

function VacationBlock({ account }: { account: AccountInfo }) {
  const { api } = useMail();
  const run = useRun();
  const state = useAsync((a) => a.accounts.getVacation(account.id), [account.id]);
  return (
    <Section title="Vacation response">
      <Async state={state} rows={3}>{(v) => <VacationForm key={account.id} initial={v} onSave={(x) => run(() => api.accounts.setVacation(x), "Vacation response saved")} />}</Async>
    </Section>
  );
}

function VacationForm({ initial, onSave }: { initial: VacationResponse; onSave: (v: VacationResponse) => Promise<unknown> }) {
  const [v, setV] = React.useState(initial);
  const day = (iso?: string) => (iso ? iso.slice(0, 10) : "");
  const toIso = (d: string) => (d ? `${d}T00:00:00.000Z` : undefined);
  return (
    <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); void onSave(v); }}>
      <Switch checked={v.isEnabled} onChange={(e) => setV({ ...v, isEnabled: e.target.checked })}>Send automatic replies</Switch>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="From" htmlFor="vc-from"><Input id="vc-from" type="date" value={day(v.fromDate)} onChange={(e) => setV({ ...v, fromDate: toIso(e.target.value) })} /></Field>
        <Field label="Until" htmlFor="vc-to"><Input id="vc-to" type="date" value={day(v.toDate)} onChange={(e) => setV({ ...v, toDate: toIso(e.target.value) })} /></Field>
      </div>
      <Field label="Subject" htmlFor="vc-subject"><Input id="vc-subject" value={v.subject} onChange={(e) => setV({ ...v, subject: e.target.value })} /></Field>
      <Field label="Message" htmlFor="vc-body"><Textarea id="vc-body" rows={4} value={v.textBody} onChange={(e) => setV({ ...v, textBody: e.target.value })} /></Field>
      <div><Button type="submit" variant="secondary">Save vacation response</Button></div>
    </form>
  );
}

export function MailboxDrawer({ id, onDeleted }: { id: string; onDeleted?: () => void }) {
  const { api, closeDrawer } = useMail();
  const run = useRun();
  const state = useAsync((a) => a.accounts.get(id), [id], { live: true });
  const [confirm, setConfirm] = React.useState(false);
  return (
    <Async state={state} rows={6}>
      {(account) => (
        <div className="grid gap-4">
          <DefinitionList items={[{ label: "Address", value: account.email, copy: account.email }, { label: "Account ID", value: account.id, mono: true }, { label: "Status", value: <Badge tone={account.status === "active" ? "ok" : "warn"}>{account.status === "active" ? "Active" : "Suspended"}</Badge> }]} />
          <Tabs defaultValue="general">
            <TabsList aria-label="Mailbox settings">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="aliases">Aliases</TabsTrigger>
              <TabsTrigger value="delegation">Delegation</TabsTrigger>
              <TabsTrigger value="passwords">App passwords</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
            </TabsList>
            <TabsContent value="general"><ProfileTab key={account.updatedAt} account={account} onChanged={state.reload} /></TabsContent>
            <TabsContent value="aliases"><AliasesTab account={account} onChanged={state.reload} /></TabsContent>
            <TabsContent value="delegation"><DelegationTab account={account} /></TabsContent>
            <TabsContent value="passwords"><AppPasswordsTab account={account} /></TabsContent>
            <TabsContent value="rules"><div className="grid gap-4"><SieveBlock account={account} /><VacationBlock account={account} /></div></TabsContent>
          </Tabs>
          <div className="border-t border-line pt-3">
            <Button variant="danger" leftIcon={<Trash2 aria-hidden />} onClick={() => setConfirm(true)}>Delete mailbox…</Button>
          </div>
          <ConfirmDialog
            open={confirm}
            onOpenChange={setConfirm}
            title="Delete mailbox"
            description="All messages, calendars and contacts of this account are scheduled for removal. This cannot be undone."
            items={[account.email]}
            confirmLabel="Delete mailbox"
            confirmText={account.email}
            onConfirm={async () => {
              await run(() => api.accounts.delete(account.id), "Mailbox deleted");
              setConfirm(false);
              closeDrawer();
              onDeleted?.();
            }}
          />
        </div>
      )}
    </Async>
  );
}
