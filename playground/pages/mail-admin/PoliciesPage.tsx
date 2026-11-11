import * as React from "react";
import { Button, Field, Input, Panel, PageSection, Select, Switch, Textarea } from "../../../lib";
import { Async, useAsync, useMail, useRun } from "./context";
import type { TransportPolicy } from "./types";

const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

function PolicyForm({ initial }: { initial: TransportPolicy }) {
  const { api } = useMail();
  const run = useRun();
  const [p, setP] = React.useState(initial);
  const dirty = JSON.stringify(p) !== JSON.stringify(initial);
  const num = (v: string) => Math.max(0, Number(v) || 0);
  return (
    <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); void run(() => api.ext.setTransportPolicy(p), "Transport policies saved"); }}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Rate limits" headingLevel={2}>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Per minute" htmlFor="rl-min"><Input id="rl-min" type="number" value={p.rateLimit.perMinute} onChange={(e) => setP({ ...p, rateLimit: { ...p.rateLimit, perMinute: num(e.target.value) } })} /></Field>
            <Field label="Per hour" htmlFor="rl-hour"><Input id="rl-hour" type="number" value={p.rateLimit.perHour} onChange={(e) => setP({ ...p, rateLimit: { ...p.rateLimit, perHour: num(e.target.value) } })} /></Field>
            <Field label="Burst" htmlFor="rl-burst"><Input id="rl-burst" type="number" value={p.rateLimit.burst} onChange={(e) => setP({ ...p, rateLimit: { ...p.rateLimit, burst: num(e.target.value) } })} /></Field>
          </div>
          <p className="mb-0 text-xs text-muted">Messages a single authenticated sender may submit.</p>
        </Panel>
        <Panel title="Greylisting" headingLevel={2}>
          <div className="grid gap-3">
            <Switch checked={p.greylist.enabled} onChange={(e) => setP({ ...p, greylist: { ...p.greylist, enabled: e.target.checked } })}>Enable greylisting</Switch>
            <Field label="Initial delay (seconds)" htmlFor="gl-delay"><Input id="gl-delay" type="number" value={p.greylist.delaySeconds} disabled={!p.greylist.enabled} onChange={(e) => setP({ ...p, greylist: { ...p.greylist, delaySeconds: num(e.target.value) } })} /></Field>
            <Switch checked={p.greylist.whitelistTrusted} disabled={!p.greylist.enabled} onChange={(e) => setP({ ...p, greylist: { ...p.greylist, whitelistTrusted: e.target.checked } })}>Skip for senders that already delivered before</Switch>
          </div>
        </Panel>
        <Panel title="DNS blocklists" headingLevel={2}>
          <div className="grid gap-3">
            <Switch checked={p.dnsbl.enabled} onChange={(e) => setP({ ...p, dnsbl: { ...p.dnsbl, enabled: e.target.checked } })}>Check connecting IPs against DNSBLs</Switch>
            <Field label="Zones (one per line)" htmlFor="bl-zones"><Textarea id="bl-zones" rows={3} disabled={!p.dnsbl.enabled} value={p.dnsbl.zones.join("\n")} onChange={(e) => setP({ ...p, dnsbl: { ...p.dnsbl, zones: lines(e.target.value) } })} /></Field>
            <Field label="Reject at score" htmlFor="bl-score"><Input id="bl-score" type="number" value={p.dnsbl.rejectScore} disabled={!p.dnsbl.enabled} onChange={(e) => setP({ ...p, dnsbl: { ...p.dnsbl, rejectScore: num(e.target.value) } })} /></Field>
          </div>
        </Panel>
        <Panel title="Data loss prevention" headingLevel={2}>
          <div className="grid gap-3">
            <Switch checked={p.dlp.enabled} onChange={(e) => setP({ ...p, dlp: { ...p.dlp, enabled: e.target.checked } })}>Scan outbound messages</Switch>
            <Field label="Action" htmlFor="dlp-mode">
              <Select id="dlp-mode" value={p.dlp.mode} disabled={!p.dlp.enabled} onChange={(e) => setP({ ...p, dlp: { ...p.dlp, mode: e.target.value as TransportPolicy["dlp"]["mode"] } })}>
                <option value="monitor">Monitor only</option>
                <option value="block">Block and notify sender</option>
              </Select>
            </Field>
            <Field label="Patterns (regular expressions, one per line)" htmlFor="dlp-patterns"><Textarea id="dlp-patterns" rows={3} className="font-mono" disabled={!p.dlp.enabled} value={p.dlp.patterns.join("\n")} onChange={(e) => setP({ ...p, dlp: { ...p.dlp, patterns: lines(e.target.value) } })} /></Field>
          </div>
        </Panel>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={!dirty}>Save policies</Button>
        <Button type="button" variant="secondary" disabled={!dirty} onClick={() => setP(initial)}>Discard</Button>
      </div>
    </form>
  );
}

export default function PoliciesPage() {
  const state = useAsync((a) => a.ext.transportPolicy(), []);
  return (
    <PageSection aria-label="Transport policies">
      <Async state={state} rows={6}>{(p) => <PolicyForm key={JSON.stringify(p)} initial={p} />}</Async>
    </PageSection>
  );
}
