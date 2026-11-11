import * as React from "react";
import { Autocomplete, ChipsInput, QuickSearch, type AutocompleteOption, type QuickSearchResult } from "../../lib/components/autocomplete";
import type { ObjectKind, ObjectState } from "../../lib";

const INVENTORY: { id: string; kind: ObjectKind; name: string; path: string; state?: ObjectState; group: string }[] = [
  ...["web-01", "web-02", "db-primary", "db-replica", "build-agent"].map((n, i) => ({ id: `vm-${n}`, kind: "vm" as const, name: n, path: `dc-1 / cluster-a / ${n}`, state: (["running", "running", "running", "paused", "stopped"] as ObjectState[])[i], group: "Virtual machines" })),
  ...["esx-01.lab", "esx-02.lab", "esx-03.lab"].map((n, i) => ({ id: `host-${n}`, kind: "host" as const, name: n, path: `dc-1 / cluster-a`, state: (i === 2 ? "maintenance" : "running") as ObjectState, group: "Hosts" })),
  ...["ds-nvme-01", "ds-sata-02", "ds-vsan"].map((n) => ({ id: `ds-${n}`, kind: "datastore" as const, name: n, path: "dc-1", group: "Datastores" })),
  ...["vm-network", "storage-vlan-20", "mgmt-vlan-10"].map((n) => ({ id: `net-${n}`, kind: "network" as const, name: n, path: "dc-1 / networks", group: "Networks" })),
];

/** Mock backend: resolves after a delay, rejects when aborted. */
function delay<T>(value: T, signal: AbortSignal, ms = 350): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(value), ms);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

const searchInventory = (q: string, signal: AbortSignal): Promise<QuickSearchResult[]> =>
  delay(INVENTORY.filter((r) => `${r.name} ${r.path}`.toLowerCase().includes(q.toLowerCase())), signal);

const loadOptions = (q: string, signal: AbortSignal): Promise<AutocompleteOption[]> =>
  delay(INVENTORY.filter((r) => r.name.toLowerCase().includes(q.toLowerCase())).map((r) => ({ value: r.id, label: r.name, description: r.path, group: r.group })), signal);

export default function Inputs() {
  const [one, setOne] = React.useState<AutocompleteOption | null>(null);
  const [many, setMany] = React.useState<AutocompleteOption[]>([]);
  const [free, setFree] = React.useState<AutocompleteOption[]>([]);
  const [hosts, setHosts] = React.useState<string[]>(["esx-01.lab"]);
  const [emails, setEmails] = React.useState<string[]>(["ops@example.com"]);
  const [picked, setPicked] = React.useState<string>("");

  return (
    <div className="grid max-w-xl gap-8">
      <section className="grid gap-2">
        <h2 className="text-sm font-semibold">QuickSearch</h2>
        <QuickSearch search={searchInventory} onSelect={(r) => setPicked(`${r.kind}: ${r.name}`)} />
        <p className="text-xs text-muted" aria-live="polite">
          {picked ? `Selected ${picked}` : "Press Ctrl/⌘K, then type “esx” or “vm”."}
        </p>
      </section>
      <section className="grid gap-2">
        <h2 className="text-sm font-semibold">Autocomplete — async, grouped, single</h2>
        <Autocomplete label="Inventory object" placeholder="Search objects…" loadOptions={loadOptions} value={one} onChange={setOne} clearable />
      </section>
      <section className="grid gap-2">
        <h2 className="text-sm font-semibold">Autocomplete — multiple</h2>
        <Autocomplete multiple label="Datastores" placeholder="Pick datastores…" options={INVENTORY.filter((r) => r.kind === "datastore").map((r) => ({ value: r.id, label: r.name, description: r.path }))} value={many} onChange={setMany} clearable />
      </section>
      <section className="grid gap-2">
        <h2 className="text-sm font-semibold">Autocomplete — free solo (create)</h2>
        <Autocomplete multiple freeSolo label="Tags" placeholder="Type and press Enter…" options={[{ value: "prod", label: "prod" }, { value: "staging", label: "staging" }]} value={free} onChange={setFree} />
      </section>
      <section className="grid gap-2">
        <h2 className="text-sm font-semibold">ChipsInput</h2>
        <ChipsInput label="Hosts" placeholder="Add hosts…" value={hosts} onChange={setHosts} max={6} validate={(c) => (/^[a-z0-9.-]+$/.test(c) ? undefined : "Invalid host name")} />
        <ChipsInput label="Recipients" placeholder="Paste e-mail addresses…" value={emails} onChange={setEmails} keepInvalid duplicates="ignore" validate={(c) => (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c) ? undefined : "Not an e-mail address")} />
      </section>
    </div>
  );
}
