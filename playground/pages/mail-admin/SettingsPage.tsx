import * as React from "react";
import { Badge, Button, DefinitionList, Field, Input, PageSection, Panel, StatusDot, useLaf } from "../../../lib";
import { Async, useAsync, useMail, useRun } from "./context";
import type { MailSettings } from "./types";

const MB = 1024 ** 2;
const tone = (s: string) => (s === "SERVING" ? "ok" : s === "DEGRADED" ? "warn" : "danger");
const text = (s: string) => (s === "SERVING" ? "Serving" : s === "DEGRADED" ? "Degraded" : "Not serving");

function SettingsForm({ initial }: { initial: MailSettings }) {
  const { api } = useMail();
  const run = useRun();
  const [s, setS] = React.useState(initial);
  const n = (v: string) => Math.max(0, Number(v) || 0);
  return (
    <form className="grid gap-3 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); void run(() => api.ext.setSettings(s), "Settings saved"); }}>
      <Field label="System name" htmlFor="st-name"><Input id="st-name" value={s.systemName} onChange={(e) => setS({ ...s, systemName: e.target.value })} /></Field>
      <Field label="Default domain" htmlFor="st-domain"><Input id="st-domain" value={s.defaultDomain} onChange={(e) => setS({ ...s, defaultDomain: e.target.value })} /></Field>
      <Field label="Maximum message size (MB)" htmlFor="st-max"><Input id="st-max" type="number" min={1} value={Math.round(s.maxMessageBytes / MB)} onChange={(e) => setS({ ...s, maxMessageBytes: n(e.target.value) * MB })} /></Field>
      <Field label="Message retention (days, 0 = forever)" htmlFor="st-ret"><Input id="st-ret" type="number" min={0} value={s.retentionDays} onChange={(e) => setS({ ...s, retentionDays: n(e.target.value) })} /></Field>
      <Field label="Trash retention (days)" htmlFor="st-trash"><Input id="st-trash" type="number" min={0} value={s.trashRetentionDays} onChange={(e) => setS({ ...s, trashRetentionDays: n(e.target.value) })} /></Field>
      <div className="sm:col-span-2"><Button type="submit">Save settings</Button></div>
    </form>
  );
}

export default function SettingsPage() {
  const { format } = useLaf();
  const state = useAsync(async (a) => ({ info: await a.admin.systemInfo(), settings: await a.ext.settings() }), []);
  return (
    <Async state={state} rows={6}>
      {({ info, settings }) => (
        <PageSection aria-label="Settings" className="grid gap-4 lg:grid-cols-2">
          <Panel title="System information" headingLevel={2}>
            <DefinitionList items={[{ label: "Version", value: info.version }, { label: "Commit", value: info.commit, mono: true, copy: info.commit }, { label: "Running since", value: format.dateTime(info.uptime) }, { label: "Uptime", value: format.duration(Date.parse("2026-01-15T12:00:00Z") - Date.parse(info.uptime)) }]} />
          </Panel>
          <Panel title="Components" headingLevel={2}>
            <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 text-sm">
              {Object.entries(info.componentStatus).map(([name, st]) => (
                <li key={name} className="flex items-center justify-between gap-2"><span>{name}</span><StatusDot tone={tone(st)} label={text(st)} /></li>
              ))}
            </ul>
            <p className="mb-0 mt-3 text-xs text-muted"><Badge tone="neutral">GetSystemInfo</Badge> reports status per component.</p>
          </Panel>
          <Panel title="Global settings" headingLevel={2} className="lg:col-span-2">
            <SettingsForm initial={settings} />
          </Panel>
        </PageSection>
      )}
    </Async>
  );
}
