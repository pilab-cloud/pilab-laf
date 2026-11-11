import * as React from "react";
import {
  Button,
  CapacityBar,
  FormField,
  Input,
  InventoryLayout,
  ObjectIcon,
  ObjectPage,
  Select,
  TaskPanel,
  TreeView,
  Wizard,
  WizardReview,
  type TaskItem,
  type TreeNode,
} from "../../lib";
import { PerfPanel, type PerfMetric } from "../../lib/charts";
import { FakeEventSource } from "./VsLayout";

const GiB = 2 ** 30;
const CLUSTERS = 10;
const HOSTS = 10;
const VMS_PER_HOST = 99;

/** 10 clusters × 10 hosts × (1 host + 99 VMs) = 10 000 inventory objects below the clusters. */
function buildInventory(): TreeNode[] {
  return Array.from({ length: CLUSTERS }, (_, c) => ({
    id: `c${c}`,
    label: `Cluster-${String(c).padStart(2, "0")}`,
    icon: <ObjectIcon kind="cluster" />,
    children: Array.from({ length: HOSTS }, (_, h) => ({
      id: `c${c}-h${h}`,
      label: `esx-${c}-${h}.lab`,
      icon: <ObjectIcon kind="host" state={h % 5 === 4 ? "maintenance" : undefined} />,
      children: Array.from({ length: VMS_PER_HOST }, (_, v) => ({
        id: `c${c}-h${h}-vm${v}`,
        label: `vm-${c}-${h}-${String(v).padStart(2, "0")}`,
        icon: <ObjectIcon kind="vm" state={vmState(v)} overlay={v % 17 === 0 ? "warning" : undefined} />,
        status: (v % 17 === 0 ? "warning" : undefined) as TreeNode["status"],
      })),
    })),
  }));
}

const VM_STATES = ["running", "running", "running", "stopped", "paused", "hibernated", "crashed", "running", "stopped", "error"] as const;
const vmState = (v: number) => VM_STATES[v % VM_STATES.length];

const NOW = Date.UTC(2026, 5, 1, 12, 0, 0);
const STEP = 30_000;
const N = 2880;

function series(seed: number, base: number, amp: number): [number, number][] {
  return Array.from({ length: N }, (_, i) => [NOW - (N - 1 - i) * STEP, Math.max(0, base + amp * Math.sin(i / (10 + seed)) + amp * 0.3 * Math.sin(i * 1.3 + seed))]);
}

function metricsFor(id: string): PerfMetric[] {
  const seed = [...id].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 9;
  return [
    { id: "cpu", group: "CPU", name: "CPU usage", unit: "%", points: series(seed, 40, 25) },
    { id: "mem", group: "Memory", name: "Memory active", unit: "bytes", points: series(seed + 2, 4 * GiB, 1.5 * GiB) },
    { id: "net", group: "Network", name: "Network rx", unit: "bitrate", points: series(seed + 4, 2e8, 1e8) },
  ];
}

interface VmSpec {
  name: string;
  host: string;
  cpus: string;
}

function CreateVmWizard({ open, onOpenChange, onCreate }: { open: boolean; onOpenChange: (o: boolean) => void; onCreate: (spec: VmSpec) => void }) {
  const [spec, setSpec] = React.useState<VmSpec>({ name: "", host: "esx-0-0.lab", cpus: "2" });
  const set = (patch: Partial<VmSpec>) => setSpec((s) => ({ ...s, ...patch }));
  return (
    <Wizard
      mode="dialog"
      open={open}
      onOpenChange={onOpenChange}
      title="Create virtual machine"
      dirty={spec.name !== ""}
      onCancel={() => onOpenChange(false)}
      onFinish={() => {
        onCreate(spec);
        setSpec({ name: "", host: "esx-0-0.lab", cpus: "2" });
        onOpenChange(false);
      }}
      steps={[
        {
          id: "name",
          label: "Name",
          validate: () => (spec.name.trim() ? undefined : ["Name is required."]),
          render: () => <FormField label="Virtual machine name">{(a) => <Input {...a} value={spec.name} onChange={(e) => set({ name: e.target.value })} />}</FormField>,
        },
        {
          id: "compute",
          label: "Compute",
          render: () => (
            <div className="grid gap-3">
              <FormField label="Host">
                {(a) => (
                  <Select {...a} value={spec.host} onChange={(e) => set({ host: e.target.value })}>
                    {["esx-0-0.lab", "esx-0-1.lab", "esx-1-0.lab"].map((h) => (
                      <option key={h}>{h}</option>
                    ))}
                  </Select>
                )}
              </FormField>
              <FormField label="vCPUs">{(a) => <Input {...a} type="number" min={1} max={32} value={spec.cpus} onChange={(e) => set({ cpus: e.target.value })} />}</FormField>
            </div>
          ),
        },
        {
          id: "review",
          label: "Review",
          render: () => <WizardReview items={[{ label: "Name", value: spec.name }, { label: "Host", value: spec.host }, { label: "vCPUs", value: spec.cpus }]} />,
        },
      ]}
    />
  );
}

/**
 * Exit-criteria demo: 10 000-object inventory → VM object page → create-VM wizard →
 * a task in the docked panel driven by a fake SSE stream → perf chart with brush zoom.
 */
export default function VCenter() {
  const base = React.useMemo(() => buildInventory(), []);
  const [created, setCreated] = React.useState<VmSpec[]>([]);
  const [selected, setSelected] = React.useState("c0-h0-vm00");
  const [wizard, setWizard] = React.useState(false);
  const [tasks, setTasks] = React.useState<TaskItem[]>([]);
  const stream = React.useRef<FakeEventSource | undefined>(undefined);

  const nodes = React.useMemo<TreeNode[]>(
    () =>
      created.length
        ? [
            ...base,
            {
              id: "new",
              label: "New VMs",
              icon: <ObjectIcon kind="folder" />,
              children: created.map((v) => ({ id: `new-${v.name}`, label: v.name, icon: <ObjectIcon kind="vm" state="off" /> })),
            },
          ]
        : base,
    [base, created],
  );

  React.useEffect(() => {
    const es = new FakeEventSource(600);
    es.addEventListener("task", (e) => {
      const { id, step } = JSON.parse(e.data) as { id: string; step: number };
      setTasks((ts) =>
        ts.map((t) => {
          if (t.id !== id || (t.status !== "running" && t.status !== "queued")) return t;
          const progress = Math.min(100, (t.progress ?? 0) + step);
          return progress >= 100 ? { ...t, status: "ok", progress: 100, durationMs: 3000 } : { ...t, status: "running", progress };
        }),
      );
    });
    stream.current = es;
    return () => es.close();
  }, []);

  const create = (spec: VmSpec) => {
    const id = `task-${Date.now()}`;
    setCreated((c) => [...c, spec]);
    setTasks((ts) => [{ id, name: "Create virtual machine", target: spec.name, targetId: `new-${spec.name}`, initiator: "root", status: "queued", progress: 0 }, ...ts]);
    let ticks = 0;
    const timer = setInterval(() => {
      ticks++;
      stream.current?.emit("task", { id, step: 25 });
      if (ticks >= 5) clearInterval(timer);
    }, 600);
  };

  const parts = selected.split("-");
  const isVm = selected.includes("vm");
  const isHost = !isVm && parts.length === 2;
  const name = isVm ? (created.find((v) => `new-${v.name}` === selected)?.name ?? `vm-${parts[0]!.slice(1)}-${parts[1]!.slice(1)}-${parts[2]!.slice(2)}`) : selected;
  const metrics = React.useMemo(() => metricsFor(selected), [selected]);

  return (
    <section className="grid gap-3">
      <div className="flex items-center gap-3">
        <h2 className="m-0 text-lg font-semibold">vCenter — 10 000 objects</h2>
        <Button size="sm" onClick={() => setWizard(true)}>
          Create VM…
        </Button>
      </div>
      <CreateVmWizard open={wizard} onOpenChange={setWizard} onCreate={create} />
      <div className="h-[680px] overflow-hidden rounded-lg border border-line">
        <InventoryLayout
          persistKey="playground.vcenter"
          tree={<TreeView label="Inventory" nodes={nodes} defaultExpanded={["c0", "c0-h0"]} selected={selected} onSelect={setSelected} height={420} />}
          bottom={<TaskPanel docked filterable currentUser="root" tasks={tasks} onCancel={(id) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: "cancelled" } : t)))} />}
        >
          <ObjectPage
            key={selected}
            kind={isVm ? "vm" : isHost ? "host" : "cluster"}
            state={isVm ? (selected.startsWith("new-") ? "off" : "on") : undefined}
            name={name}
            statusLabel={isVm ? "Powered on" : "Connected"}
            statusTone="ok"
            actions={[{ id: "create", label: "Create VM…", onSelect: () => setWizard(true) }]}
            facts={[
              { label: "Guest OS", value: "Debian 12" },
              { label: "vCPUs", value: "2" },
              { label: "Host", value: isVm ? `esx-${parts[0]!.slice(1)}-${parts[1]!.slice(1)}.lab` : "—" },
            ]}
            cards={[
              {
                id: "cap",
                title: "Capacity",
                content: (
                  <div className="grid gap-3">
                    <CapacityBar label="Memory" unit="bytes" used={6 * GiB} total={8 * GiB} />
                    <CapacityBar label="Storage" unit="bytes" used={40 * GiB} total={100 * GiB} />
                  </div>
                ),
              },
            ]}
            monitor={<PerfPanel label={`${name} performance`} metrics={metrics} selected={["cpu", "mem"]} />}
            configure={<p className="text-sm text-muted">Hardware and options of {name}.</p>}
          />
        </InventoryLayout>
      </div>
    </section>
  );
}
