import { KeyRound, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { Alert, Badge, Button, ConfirmDialog, DnsRecordTable, Field, Input, PageSection, Select, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Wizard, WizardReview, useLaf, type DnsRecord } from "../../../lib";
import { dkimTxt } from "./api";
import { Async, useAsync, useMail, useRun } from "./context";
import type { DKIMKey, Domain, DomainKind } from "./types";

const MAIL_HOST = "mail.pilab.hu";

function DnsTab({ domain }: { domain: Domain }) {
  const state = useAsync(
    async (a) => {
      const keys = await a.domains.listDKIMKeys(domain.name);
      const active = keys.find((k) => k.active);
      const [check, dkim] = await Promise.all([a.domains.checkDns(domain.name), active ? a.domains.getDKIMDNSRecord(domain.name, active.selector) : Promise.resolve(undefined)]);
      return { check, dkim };
    },
    [domain.name],
    { live: true },
  );
  return (
    <Async state={state} rows={5}>
      {({ check, dkim }) => {
        const records: DnsRecord[] = [
          { id: "mx", type: "MX", host: domain.name, value: `10 ${MAIL_HOST}.`, purpose: "MX", state: check.MX },
          { id: "spf", type: "TXT", host: domain.name, value: `v=spf1 mx a:${MAIL_HOST} -all`, purpose: "SPF", state: check.SPF },
          { id: "dkim", type: "TXT", host: dkim?.dnsName ?? `<selector>._domainkey.${domain.name}`, value: dkim?.dnsValue ?? "Generate and activate a DKIM key first.", purpose: "DKIM", state: check.DKIM },
          { id: "dmarc", type: "TXT", host: `_dmarc.${domain.name}`, value: `v=DMARC1; p=quarantine; rua=mailto:dmarc@${domain.name}`, purpose: "DMARC", state: check.DMARC },
          { id: "mtasts", type: "TXT", host: `_mta-sts.${domain.name}`, value: "v=STSv1; id=20260115T000000", purpose: "MTA-STS", state: check["MTA-STS"] },
        ];
        const bad = records.filter((r) => r.state !== "verified");
        return (
          <div className="grid gap-3">
            {bad.length ? <Alert tone="warning" title={`${bad.length} record${bad.length === 1 ? "" : "s"} need attention`} description="Publish the values below at your DNS provider, then reload." /> : <Alert tone="success" title="All records verified" />}
            <DnsRecordTable records={records} />
          </div>
        );
      }}
    </Async>
  );
}

function DkimTab({ domain }: { domain: Domain }) {
  const { api } = useMail();
  const { format } = useLaf();
  const run = useRun();
  const keys = useAsync((a) => a.domains.listDKIMKeys(domain.name), [domain.name], { live: true });
  const [selector, setSelector] = React.useState("");
  const [removing, setRemoving] = React.useState<DKIMKey>();
  return (
    <div className="grid gap-4">
      <Async state={keys} rows={2}>
        {(list) => (
          <ul className="m-0 grid list-none gap-2 p-0">
            {list.map((k) => (
              <li key={k.selector} className="grid gap-1 rounded-md border border-line px-3 py-2 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <strong>{k.selector}</strong>
                  {k.active ? <Badge tone="ok">Active</Badge> : k.retiredAt ? <Badge tone="neutral">Retired</Badge> : <Badge tone="warn">Inactive</Badge>}
                  <span className="text-xs text-muted">created {format.dateTime(k.createdAt)}</span>
                  <span className="ms-auto flex gap-1">
                    {!k.active && <Button size="sm" variant="secondary" onClick={() => run(() => api.domains.activateDKIMKey(domain.name, k.selector), `${k.selector} activated`)}>Activate</Button>}
                    <Button size="sm" variant="ghost" aria-label={`Delete key ${k.selector}`} disabled={k.active} onClick={() => setRemoving(k)}><Trash2 aria-hidden /></Button>
                  </span>
                </div>
                <code className="block truncate text-xs text-muted">{dkimTxt(k.publicKeyPem)}</code>
              </li>
            ))}
            {!list.length && <li className="text-sm text-muted">No DKIM keys yet.</li>}
          </ul>
        )}
      </Async>
      <form
        className="flex items-end gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!selector.trim()) return;
          await run(() => api.domains.generateDKIMKey(domain.name, selector.trim()), "DKIM key generated");
          setSelector("");
        }}
      >
        <Field label="New selector" htmlFor="dk-selector" className="grow"><Input id="dk-selector" value={selector} onChange={(e) => setSelector(e.target.value)} placeholder="2026a" /></Field>
        <Button type="submit" leftIcon={<KeyRound aria-hidden />}>Generate key</Button>
      </form>
      <ConfirmDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(undefined)}
        title="Delete DKIM key"
        description="Messages signed with this selector can no longer be verified once the DNS record is removed."
        items={removing ? [`${removing.selector}._domainkey.${domain.name}`] : []}
        confirmLabel="Delete key"
        onConfirm={async () => {
          if (removing) await run(() => api.domains.deleteDKIMKey(domain.name, removing.selector), "DKIM key deleted");
          setRemoving(undefined);
        }}
      />
    </div>
  );
}

function DomainDrawer({ domain }: { domain: Domain }) {
  return (
    <Tabs defaultValue="dns">
      <TabsList aria-label="Domain settings">
        <TabsTrigger value="dns">DNS records</TabsTrigger>
        <TabsTrigger value="dkim">DKIM</TabsTrigger>
      </TabsList>
      <TabsContent value="dns"><DnsTab domain={domain} /></TabsContent>
      <TabsContent value="dkim"><DkimTab domain={domain} /></TabsContent>
    </Tabs>
  );
}

function AddDomainWizard({ open, onOpenChange, domains }: { open: boolean; onOpenChange: (o: boolean) => void; domains: Domain[] }) {
  const { api, openDrawer } = useMail();
  const run = useRun();
  const [f, setF] = React.useState<{ name: string; kind: DomainKind; aliasOf: string; isDefault: boolean }>({ name: "", kind: "PRIMARY", aliasOf: "", isDefault: false });
  const primaries = domains.filter((d) => d.kind === "PRIMARY");
  return (
    <Wizard
      mode="dialog"
      title="Add domain"
      open={open}
      onOpenChange={onOpenChange}
      dirty={!!f.name}
      onFinish={async () => {
        const d = await run(() => api.domains.create({ name: f.name.trim().toLowerCase(), kind: f.kind, aliasOf: f.kind === "ALIAS" ? f.aliasOf : undefined, isDefault: f.isDefault }), `Domain ${f.name} added`);
        if (!d) return;
        onOpenChange(false);
        setF({ name: "", kind: "PRIMARY", aliasOf: "", isDefault: false });
        openDrawer({ key: d.name, title: d.name, size: 720, content: <DomainDrawer domain={d} /> });
      }}
      steps={[
        {
          id: "name",
          label: "Domain",
          validate: () => {
            const errs: string[] = [];
            if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(f.name.trim())) errs.push("Enter a valid domain name, e.g. example.org.");
            if (domains.some((d) => d.name === f.name.trim().toLowerCase())) errs.push("This domain already exists.");
            return errs;
          },
          render: () => (
            <div className="grid gap-3">
              <Field label="Domain name" htmlFor="ad-name"><Input id="ad-name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="example.org" /></Field>
              <Field label="Type" htmlFor="ad-kind">
                <Select id="ad-kind" value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value as DomainKind })}>
                  <option value="PRIMARY">Primary (own mailboxes)</option>
                  <option value="ALIAS">Alias (delivers to another domain)</option>
                </Select>
              </Field>
            </div>
          ),
        },
        {
          id: "options",
          label: "Options",
          validate: () => (f.kind === "ALIAS" && !f.aliasOf ? ["Choose the domain this alias delivers to."] : undefined),
          render: () => (
            <div className="grid gap-3">
              {f.kind === "ALIAS" && (
                <Field label="Alias of" htmlFor="ad-alias">
                  <Select id="ad-alias" value={f.aliasOf} onChange={(e) => setF({ ...f, aliasOf: e.target.value })}>
                    <option value="">Select a domain…</option>
                    {primaries.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
                  </Select>
                </Field>
              )}
              <Switch checked={f.isDefault} onChange={(e) => setF({ ...f, isDefault: e.target.checked })} disabled={f.kind === "ALIAS"}>Use as default domain for new mailboxes</Switch>
            </div>
          ),
        },
        { id: "review", label: "Review", render: () => <WizardReview items={[{ label: "Domain", value: f.name }, { label: "Type", value: f.kind === "PRIMARY" ? "Primary" : `Alias of ${f.aliasOf}` }, { label: "Default", value: f.isDefault ? "Yes" : "No" }]} /> },
      ]}
    />
  );
}

export default function DomainsPage() {
  const { api, openDrawer } = useMail();
  const run = useRun();
  const state = useAsync((a) => a.domains.list(), [], { live: true });
  const [adding, setAdding] = React.useState(false);
  const [removing, setRemoving] = React.useState<Domain>();
  return (
    <PageSection aria-label="Domains">
      <Async state={state} rows={4}>
        {(domains) => (
          <div className="grid gap-3">
            <div className="flex justify-end"><Button leftIcon={<Plus aria-hidden />} onClick={() => setAdding(true)}>Add domain</Button></div>
            <div className="table-wrap">
              <table className="table" aria-label="Domains">
                <thead><tr><th scope="col">Domain</th><th scope="col">Type</th><th scope="col">DKIM selector</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>
                  {domains.map((d) => (
                    <tr key={d.name}>
                      <td><strong>{d.name}</strong> {d.isDefault && <Badge tone="primary">Default</Badge>}</td>
                      <td>{d.kind === "PRIMARY" ? "Primary" : `Alias of ${d.aliasOf}`}</td>
                      <td>{d.activeDkimSelector || <Badge tone="warn">No active key</Badge>}</td>
                      <td className="text-end">
                        <Button size="sm" variant="secondary" aria-label={`Manage ${d.name}`} onClick={() => openDrawer({ key: d.name, title: d.name, size: 720, content: <DomainDrawer domain={d} /> })}>Manage</Button>{" "}
                        <Button size="sm" variant="ghost" aria-label={`Delete ${d.name}`} disabled={d.isDefault} onClick={() => setRemoving(d)}><Trash2 aria-hidden /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AddDomainWizard open={adding} onOpenChange={setAdding} domains={domains} />
          </div>
        )}
      </Async>
      <ConfirmDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(undefined)}
        title="Delete domain"
        description="Mail for this domain is rejected after deletion. Existing mailboxes keep their data."
        items={removing ? [removing.name] : []}
        confirmLabel="Delete domain"
        confirmText={removing?.name}
        onConfirm={async () => {
          if (removing) await run(() => api.domains.delete(removing.name), "Domain deleted");
          setRemoving(undefined);
        }}
      />
    </PageSection>
  );
}
