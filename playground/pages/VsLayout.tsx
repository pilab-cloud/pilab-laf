import * as React from "react";
import {
  AlarmList,
  CapacityBar,
  InventoryLayout,
  ObjectPage,
  TaskPanel,
  TreeView,
  type AlarmItem,
  type TaskItem,
  type TreeNode,
} from "../../lib";

/** EventSource-like emitter: `addEventListener`, `close`, and an `emit` for the demo ticker. */
export class FakeEventSource {
  private listeners = new Map<string, Set<(e: { data: string }) => void>>();
  private timer: ReturnType<typeof setInterval> | undefined;
  closed = false;

  constructor(intervalMs = 1000, private produce: () => { type: string; data: unknown } | undefined = () => undefined) {
    this.timer = setInterval(() => {
      const ev = this.produce();
      if (ev) this.emit(ev.type, ev.data);
    }, intervalMs);
  }
  addEventListener(type: string, fn: (e: { data: string }) => void) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(fn);
  }
  removeEventListener(type: string, fn: (e: { data: string }) => void) {
    this.listeners.get(type)?.delete(fn);
  }
  emit(type: string, data: unknown) {
    if (this.closed) return;
    this.listeners.get(type)?.forEach((fn) => fn({ data: JSON.stringify(data) }));
  }
  close() {
    this.closed = true;
    clearInterval(this.timer);
  }
}

const nodes: TreeNode[] = [
  {
    id: "dc",
    label: "Datacenter",
    children: [
      { id: "cl", label: "Cluster-01", children: [{ id: "h1", label: "esx01.lab" }, { id: "h2", label: "esx02.lab", status: "warning" }] },
      { id: "ds", label: "datastore1" },
    ],
  },
];

const GiB = 2 ** 30;

export default function VsLayoutDemo() {
  const [tasks, setTasks] = React.useState<TaskItem[]>([
    { id: "t1", name: "Power on VM", target: "web-01", targetId: "vm1", initiator: "root", status: "running", progress: 10 },
    { id: "t2", name: "Create snapshot", target: "db-01", initiator: "anna", status: "failed", error: "Disk locked", detail: "Retry after unmounting." },
  ]);
  const [alarms, setAlarms] = React.useState<AlarmItem[]>([
    { id: "a1", severity: "warning", name: "Datastore usage", entity: "datastore1", triggered: "", triggeredAt: Date.now() - 600_000 },
  ]);
  const [selected, setSelected] = React.useState("h1");
  const [bottom, setBottom] = React.useState<"tasks" | "alarms">("tasks");

  React.useEffect(() => {
    let n = 0;
    const es = new FakeEventSource(1000, () => {
      n++;
      return n % 5 === 0
        ? { type: "alarm", data: { id: `a${n}`, severity: "critical", name: "Host unreachable", entity: "esx02.lab", triggered: "", triggeredAt: Date.now() } }
        : { type: "task-progress", data: { step: 15 } };
    });
    es.addEventListener("task-progress", (e) => {
      const { step } = JSON.parse(e.data) as { step: number };
      setTasks((ts) =>
        ts.map((t) =>
          t.status === "running" ? ((t.progress ?? 0) + step >= 100 ? { ...t, status: "ok", progress: 100 } : { ...t, progress: (t.progress ?? 0) + step }) : t,
        ),
      );
    });
    es.addEventListener("alarm", (e) => setAlarms((a) => [JSON.parse(e.data) as AlarmItem, ...a].slice(0, 20)));
    return () => es.close();
  }, []);

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Inventory layout + live updates (fake SSE)</h2>
      <div className="flex gap-2 text-sm">
        <button className="btn btn-ghost btn-sm" onClick={() => setBottom("tasks")}>
          Tasks
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => setBottom("alarms")}>
          Alarms
        </button>
      </div>
      <div className="h-[560px] overflow-hidden rounded-lg border border-line">
        <InventoryLayout
          persistKey="playground.vs"
          tree={<TreeView label="Inventory" nodes={nodes} defaultExpanded={["dc", "cl"]} selected={selected} onSelect={setSelected} />}
          bottom={
            bottom === "tasks" ? (
              <TaskPanel
                docked
                filterable
                currentUser="root"
                tasks={tasks}
                onCancel={(id) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: "cancelled" } : t)))}
                onRetry={(id) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: "running", progress: 0, error: undefined } : t)))}
              />
            ) : (
              <AlarmList
                selectable
                alarms={alarms}
                onAcknowledge={(id) => setAlarms((a) => a.map((x) => (x.id === id ? { ...x, acknowledged: true } : x)))}
                onReset={(id) => setAlarms((a) => a.filter((x) => x.id !== id))}
              />
            )
          }
        >
          <ObjectPage
            kind="host"
            state="on"
            name={selected}
            statusLabel="Connected"
            statusTone="ok"
            actions={[{ id: "mm", label: "Enter maintenance", onSelect: () => {} }]}
            facts={[{ label: "Version", value: "8.0.2" }, { label: "Cluster", value: "Cluster-01" }]}
            cards={[
              {
                id: "cap",
                title: "Capacity",
                content: (
                  <div className="grid gap-3">
                    <CapacityBar label="Memory" unit="bytes" used={96 * GiB} reserved={16 * GiB} total={128 * GiB} />
                    <CapacityBar label="CPU" unit="frequency" used={12e9} total={20e9} />
                  </div>
                ),
              },
            ]}
            monitor={<p className="text-sm text-muted">Charts go here.</p>}
            configure={<p className="text-sm text-muted">Settings go here.</p>}
          />
        </InventoryLayout>
      </div>
    </section>
  );
}
