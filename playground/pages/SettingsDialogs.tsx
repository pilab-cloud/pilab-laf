import * as React from "react";
import { Gauge, Settings, ShieldCheck, Network, Layers } from "lucide-react";
import { Button, Input, Select, Slider, Switch } from "../../lib";
import { DeviceList, SettingRow, SettingsDialog, type SettingsSectionProps } from "../../lib/components/settings";

interface Uplink {
  id: string;
  nic: string;
  speed: string;
  role: "active" | "standby" | "unused";
  up: boolean;
}

interface VSwitch {
  name: string;
  mtu: number;
  ports: number;
  uplinks: Uplink[];
  loadBalancing: string;
  failback: boolean;
  promiscuous: boolean;
  macChanges: boolean;
  forgedTransmits: boolean;
  shaping: boolean;
  avgBandwidth: number;
  peakBandwidth: number;
  dscp: number;
  priority: string;
}

const SAVED: VSwitch = {
  name: "vSwitch0",
  mtu: 1500,
  ports: 128,
  uplinks: [
    { id: "vmnic0", nic: "vmnic0", speed: "10 Gbps", role: "active" as const, up: true },
    { id: "vmnic1", nic: "vmnic1", speed: "10 Gbps", role: "standby" as const, up: true },
    { id: "vmnic2", nic: "vmnic2", speed: "1 Gbps", role: "unused" as const, up: false },
  ],
  loadBalancing: "port",
  failback: true,
  promiscuous: false,
  macChanges: true,
  forgedTransmits: true,
  shaping: false,
  avgBandwidth: 100000,
  peakBandwidth: 100000,
  dscp: 0,
  priority: "normal",
};

interface Peer {
  id: string;
  name: string;
  endpoint: string;
  allowed: string;
  handshake: boolean;
}

const PEERS: Peer[] = [
  { id: "p1", name: "laptop", endpoint: "198.51.100.7:51820", allowed: "10.8.0.2/32", handshake: true },
  { id: "p2", name: "branch-office", endpoint: "203.0.113.20:51820", allowed: "10.9.0.0/24", handshake: false },
];

export default function SettingsDialogs() {
  const [saved, setSaved] = React.useState<VSwitch>(SAVED);
  const [draft, setDraft] = React.useState<VSwitch>(SAVED);
  const [open, setOpen] = React.useState(false);
  const [peers, setPeers] = React.useState<Peer[]>(PEERS);
  const set = <K extends keyof VSwitch>(k: K, v: VSwitch[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const dirty = JSON.stringify(saved) !== JSON.stringify(draft);
  const nameError = draft.name.trim() === "" ? "Name is required" : undefined;
  const mtuError = draft.mtu < 576 || draft.mtu > 9000 ? "MTU must be between 576 and 9000" : undefined;

  const sections: SettingsSectionProps[] = [
    {
      id: "general",
      title: "General",
      description: "Name, MTU and port count.",
      icon: <Settings className="size-4" />,
      errorCount: (nameError ? 1 : 0) + (mtuError ? 1 : 0),
      children: (
        <>
          <SettingRow label="Name" htmlFor="vs-name" error={nameError}>
            <Input id="vs-name" value={draft.name} invalid={!!nameError} onChange={(e) => set("name", e.target.value)} />
          </SettingRow>
          <SettingRow label="MTU" help="Bytes; 1500 is the standard Ethernet frame." htmlFor="vs-mtu" error={mtuError} overridden={draft.mtu !== 1500} onReset={() => set("mtu", 1500)}>
            <Input id="vs-mtu" type="number" value={draft.mtu} invalid={!!mtuError} onChange={(e) => set("mtu", Number(e.target.value))} />
          </SettingRow>
          <SettingRow label="Number of ports" htmlFor="vs-ports">
            <Select id="vs-ports" value={draft.ports} onChange={(e) => set("ports", Number(e.target.value))}>
              {[64, 128, 256, 512].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Select>
          </SettingRow>
        </>
      ),
    },
    {
      id: "teaming",
      title: "Teaming & failover",
      description: "Physical uplinks and how traffic is balanced across them.",
      icon: <Network className="size-4" />,
      children: (
        <>
          <SettingRow label="Load balancing" htmlFor="vs-lb" layout="stacked">
            <Select id="vs-lb" value={draft.loadBalancing} onChange={(e) => set("loadBalancing", e.target.value)}>
              <option value="port">Route based on originating port</option>
              <option value="hash">Route based on IP hash</option>
              <option value="mac">Route based on source MAC hash</option>
            </Select>
          </SettingRow>
          <SettingRow label="Failback" help="Return to a repaired active uplink automatically." layout="stacked">
            <Switch checked={draft.failback} onChange={(e) => set("failback", e.target.checked)}>
              Enabled
            </Switch>
          </SettingRow>
          <SettingRow label="Uplinks" layout="stacked">
            <DeviceList
              label="Uplinks"
              value={draft.uplinks}
              onChange={(next) => set("uplinks", next)}
              getId={(u) => u.id}
              getLabel={(u) => u.nic}
              columns={[
                { id: "nic", header: "Adapter", cell: (u) => u.nic },
                { id: "speed", header: "Speed", cell: (u) => u.speed },
                { id: "role", header: "Role", cell: (u) => u.role },
              ]}
              status={(u) => (u.up ? { tone: "ok", label: "Link up" } : { tone: "danger", label: "Link down" })}
              renderEditor={(u, change) => (
                <SettingRow label="Role" htmlFor={`role-${u.id}`} layout="stacked">
                  <Select id={`role-${u.id}`} value={u.role} onChange={(e) => change({ ...u, role: e.target.value as Uplink["role"] })}>
                    <option value="active">Active</option>
                    <option value="standby">Standby</option>
                    <option value="unused">Unused</option>
                  </Select>
                </SettingRow>
              )}
              onAdd={() => {
                const n = draft.uplinks.length;
                return { id: `vmnic${n}`, nic: `vmnic${n}`, speed: "10 Gbps", role: "unused" as const, up: true };
              }}
              addLabel="Add uplink"
            />
          </SettingRow>
        </>
      ),
    },
    {
      id: "security",
      title: "Security",
      icon: <ShieldCheck className="size-4" />,
      children: (
        <>
          <SettingRow label="Promiscuous mode" help="Let virtual machines observe all frames on the switch.">
            <Switch checked={draft.promiscuous} onChange={(e) => set("promiscuous", e.target.checked)}>
              Accept
            </Switch>
          </SettingRow>
          <SettingRow label="MAC address changes" overridden={draft.macChanges !== SAVED.macChanges} onReset={() => set("macChanges", SAVED.macChanges)}>
            <Switch checked={draft.macChanges} onChange={(e) => set("macChanges", e.target.checked)}>
              Accept
            </Switch>
          </SettingRow>
          <SettingRow label="Forged transmits">
            <Switch checked={draft.forgedTransmits} onChange={(e) => set("forgedTransmits", e.target.checked)}>
              Accept
            </Switch>
          </SettingRow>
        </>
      ),
    },
    {
      id: "shaping",
      title: "Traffic shaping",
      icon: <Gauge className="size-4" />,
      children: (
        <>
          <SettingRow label="Shaping policy">
            <Switch checked={draft.shaping} onChange={(e) => set("shaping", e.target.checked)}>
              Enabled
            </Switch>
          </SettingRow>
          <SettingRow label="Average bandwidth" help="Kbit/s" layout="stacked">
            <Slider aria-label="Average bandwidth" min={1000} max={1000000} step={1000} withInput disabled={!draft.shaping} value={draft.avgBandwidth} onValueChange={(v) => set("avgBandwidth", v as number)} />
          </SettingRow>
          <SettingRow label="Peak bandwidth" help="Kbit/s" layout="stacked">
            <Slider aria-label="Peak bandwidth" min={1000} max={1000000} step={1000} withInput disabled={!draft.shaping} value={draft.peakBandwidth} onValueChange={(v) => set("peakBandwidth", v as number)} />
          </SettingRow>
        </>
      ),
    },
    {
      id: "qos",
      title: "QoS",
      icon: <Layers className="size-4" />,
      children: (
        <>
          <SettingRow label="Priority" htmlFor="vs-prio">
            <Select id="vs-prio" value={draft.priority} onChange={(e) => set("priority", e.target.value)}>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </Select>
          </SettingRow>
          <SettingRow label="DSCP value" help="0 leaves packets unmarked." layout="stacked">
            <Slider aria-label="DSCP value" min={0} max={63} withInput value={draft.dscp} onValueChange={(v) => set("dscp", v as number)} />
          </SettingRow>
        </>
      ),
    },
  ];

  return (
    <div className="grid max-w-3xl gap-6">
      <div className="grid gap-2">
        <h2 className="m-0">Settings dialogs</h2>
        <div>
          <Button onClick={() => setOpen(true)}>Edit vSwitch settings…</Button>
        </div>
        <p className="m-0 text-sm text-muted">
          {saved.name} · MTU {saved.mtu} · {saved.uplinks.length} uplinks
        </p>
      </div>
      <SettingsDialog
        title={`Edit settings — ${saved.name}`}
        description="Changes apply to the whole virtual switch."
        open={open}
        onOpenChange={setOpen}
        sections={sections}
        dirty={dirty}
        onReset={() => setDraft(saved)}
        onCancel={() => setDraft(saved)}
        onApply={async () => {
          await new Promise((r) => setTimeout(r, 400));
          setSaved(draft);
        }}
      />
      <div className="grid gap-2">
        <h3 className="m-0">WireGuard peers</h3>
        <DeviceList
          label="WireGuard peers"
          value={peers}
          onChange={setPeers}
          getId={(p) => p.id}
          getLabel={(p) => p.name}
          columns={[
            { id: "name", header: "Name", cell: (p) => p.name },
            { id: "endpoint", header: "Endpoint", cell: (p) => <code>{p.endpoint}</code> },
            { id: "allowed", header: "Allowed IPs", cell: (p) => <code>{p.allowed}</code> },
          ]}
          status={(p) => (p.handshake ? { tone: "ok", label: "Handshake complete" } : { tone: "warn", label: "No handshake" })}
          renderEditor={(p, change) => (
            <div className="grid gap-2">
              <SettingRow label="Endpoint" htmlFor={`ep-${p.id}`}>
                <Input id={`ep-${p.id}`} value={p.endpoint} onChange={(e) => change({ ...p, endpoint: e.target.value })} />
              </SettingRow>
              <SettingRow label="Allowed IPs" htmlFor={`al-${p.id}`}>
                <Input id={`al-${p.id}`} value={p.allowed} onChange={(e) => change({ ...p, allowed: e.target.value })} />
              </SettingRow>
            </div>
          )}
          onAdd={() => ({ id: `p${Date.now()}`, name: `peer-${peers.length + 1}`, endpoint: "", allowed: "10.8.0.0/24", handshake: false })}
          addLabel="Add peer"
        />
      </div>
    </div>
  );
}
