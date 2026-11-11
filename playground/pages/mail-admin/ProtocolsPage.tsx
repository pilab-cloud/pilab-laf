import * as React from "react";
import { Alert, AlertGroup, Badge, PageSection, Panel, StatusDot, Switch, useLaf } from "../../../lib";
import { NOW } from "./api";
import { Async, useAsync, useMail, useRun } from "./context";
import type { ClientAccess } from "./types";

const tone = { up: "ok", degraded: "warn", down: "danger" } as const;
const ACCESS: { key: keyof ClientAccess; label: string; hint: string }[] = [
  { key: "imap", label: "IMAP", hint: "Desktop and mobile mail clients" },
  { key: "pop3", label: "POP3", hint: "Legacy download-and-delete clients" },
  { key: "jmap", label: "JMAP", hint: "Modern HTTP mail API" },
  { key: "ews", label: "Exchange Web Services / ActiveSync", hint: "Outlook and native phone clients" },
  { key: "dav", label: "CalDAV / CardDAV", hint: "Calendar and contact sync" },
];
const DAY = 86_400_000;

export default function ProtocolsPage() {
  const { api } = useMail();
  const { format } = useLaf();
  const run = useRun();
  const state = useAsync(async (a) => ({ listeners: await a.ext.listeners(), certs: await a.ext.certificates(), access: await a.ext.clientAccess() }), [], { live: true });
  return (
    <Async state={state} rows={6}>
      {({ listeners, certs, access }) => (
        <>
          <PageSection aria-label="Certificate alerts">
            <AlertGroup label="Certificate alerts">
              {certs.map((c) => {
                const days = Math.floor((Date.parse(c.notAfter) - NOW) / DAY);
                if (days > 30) return null;
                return <Alert key={c.id} tone={days < 0 ? "danger" : "warning"} title={days < 0 ? `${c.subject} expired ${-days} days ago` : `${c.subject} expires in ${days} days`} description={`Used by ${c.usedBy.join(", ")}. Renew the certificate and reload the daemons.`} />;
              })}
            </AlertGroup>
          </PageSection>
          <PageSection aria-label="Listeners">
            <Panel title="Listeners" headingLevel={2}>
              <div className="table-wrap">
                <table className="table" aria-label="Listeners">
                  <thead><tr><th scope="col">Service</th><th scope="col">Address</th><th scope="col">Protocol</th><th scope="col">TLS</th><th scope="col">Status</th><th scope="col" className="text-end">Connections</th></tr></thead>
                  <tbody>
                    {listeners.map((l) => (
                      <tr key={`${l.service}-${l.address}`}>
                        <td>{l.service}</td>
                        <td><code>{l.address}</code></td>
                        <td>{l.protocol}</td>
                        <td>{l.tls === "implicit" ? "Implicit TLS" : l.tls === "starttls" ? "STARTTLS" : <Badge tone="warn">None</Badge>}</td>
                        <td><StatusDot tone={tone[l.status]} label={l.status === "up" ? "Listening" : l.status === "degraded" ? "Degraded" : "Down"} /></td>
                        <td className="text-end tabular-nums">{l.connections}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </PageSection>
          <PageSection aria-label="Certificates and access" className="grid gap-4 lg:grid-cols-2">
            <Panel title="TLS certificates" headingLevel={2}>
              <ul className="m-0 grid list-none gap-2 p-0">
                {certs.map((c) => {
                  const days = Math.floor((Date.parse(c.notAfter) - NOW) / DAY);
                  return (
                    <li key={c.id} className="grid gap-0.5 rounded-md border border-line px-3 py-2 text-sm">
                      <div className="flex flex-wrap items-center gap-2"><strong>{c.subject}</strong><Badge tone={days < 0 ? "danger" : days <= 30 ? "warn" : "ok"}>{days < 0 ? "Expired" : `${days} days left`}</Badge></div>
                      <span className="text-xs text-muted">Issuer {c.issuer} · valid until {format.dateTime(c.notAfter)}</span>
                      <span className="text-xs text-muted">SANs: {c.sans.join(", ")}</span>
                    </li>
                  );
                })}
              </ul>
            </Panel>
            <Panel title="Client access" headingLevel={2}>
              <ul className="m-0 grid list-none gap-3 p-0">
                {ACCESS.map((a) => (
                  <li key={a.key}>
                    <Switch checked={access[a.key]} onChange={(e) => run(() => api.ext.setClientAccess({ ...access, [a.key]: e.target.checked }), `${a.label} ${e.target.checked ? "enabled" : "disabled"}`)}>
                      <span><span className="block font-medium">{a.label}</span><span className="block text-xs text-muted">{a.hint}</span></span>
                    </Switch>
                  </li>
                ))}
              </ul>
            </Panel>
          </PageSection>
        </>
      )}
    </Async>
  );
}
