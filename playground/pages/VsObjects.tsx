import * as React from "react";
import {
  Button,
  ConsoleFrame,
  DatastoreBrowser,
  EventConsole,
  HardwareEditor,
  LogViewer,
  PermissionAssignDialog,
  SnapshotTree,
  type ConsoleStatus,
  type DatastoreEntry,
  type HwDevice,
  type LogLine,
} from "../../lib";
import { TopologyGraphFlow } from "../../lib/components/topology";

/** noVNC-style demo: a canvas that paints a fake desktop; protocol stays in app code. */
function DemoCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const c = ref.current?.getContext("2d");
    if (!c) return;
    c.fillStyle = "#1f2430";
    c.fillRect(0, 0, 640, 400);
    c.fillStyle = "#cdd6f4";
    c.font = "14px monospace";
    c.fillText("vm-web-01 login:", 24, 40);
  }, []);
  return <canvas ref={ref} width={640} height={400} className="h-auto w-full" />;
}

const initialDevices: HwDevice[] = [
  { id: "cpu", kind: "cpu", count: 2, coresPerSocket: 1, reservationMhz: 0 },
  { id: "mem", kind: "memory", sizeMb: 4096, reservationMb: 0 },
  { id: "d1", kind: "disk", name: "Hard disk 1", sizeGb: 40, provisioning: "thin", controller: "SCSI 0" },
  { id: "n1", kind: "nic", name: "Network adapter 1", network: "VM Network", adapter: "vmxnet3", connected: true },
  { id: "cd", kind: "cdrom", name: "CD/DVD drive 1", connected: false },
];

const files: DatastoreEntry[] = [
  { path: "/iso", type: "folder" },
  { path: "/iso/ubuntu-24.04.iso", type: "file", size: 6 * 2 ** 30, modified: "2026-05-01" },
  { path: "/iso/notes.txt", type: "file", size: 120, modified: "2026-05-02" },
  { path: "/vm-web-01", type: "folder" },
  { path: "/vm-web-01/disk.vmdk", type: "file", size: 40 * 2 ** 30, modified: Date.now() - 3600_000 },
];

export default function VsObjects() {
  const [status, setStatus] = React.useState<ConsoleStatus>("connected");
  const [open, setOpen] = React.useState(false);
  const [ds, setDs] = React.useState(files);
  const [logs, setLogs] = React.useState<LogLine[]>(() =>
    Array.from({ length: 2000 }, (_, i) => ({ time: `10:${String(i % 60).padStart(2, "0")}`, level: i % 97 === 0 ? "error" : i % 13 === 0 ? "warn" : "info", text: `hostd[${i}] request completed` })),
  );
  React.useEffect(() => {
    const t = setInterval(() => setLogs((l) => [...l, { time: "now", level: "info", text: `live line ${l.length}` }]), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="grid gap-8 p-6">
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">LogViewer</h2>
        <LogViewer label="hostd log" lines={logs} />
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">ConsoleFrame</h2>
        <ConsoleFrame status={status} keyboardGrabbed onSendKeys={() => {}} onDisconnect={() => setStatus("disconnected")} onReconnect={() => setStatus("connected")} keyCombos={[{ id: "ctrl-alt-f1", label: "Ctrl+Alt+F1" }]}>
          <DemoCanvas />
        </ConsoleFrame>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">HardwareEditor</h2>
        <HardwareEditor
          defaultDevices={initialDevices}
          capabilities={{ networks: ["VM Network", "DMZ"], controllers: ["SCSI 0", "NVMe 0"], adapters: ["vmxnet3", "e1000e"], maxCpu: 16, maxMemoryMb: 65536 }}
          renderIsoPicker={(apply) => <DatastoreBrowser entries={files} select="file" accept={[".iso"]} onSelect={(e) => apply(e.path)} />}
        />
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">DatastoreBrowser</h2>
        <DatastoreBrowser
          entries={ds}
          onCreateFolder={(n, p) => setDs((d) => [...d, { path: `${p === "/" ? "" : p}/${n}`, type: "folder" }])}
          onDelete={(e) => setDs((d) => d.filter((x) => !x.path.startsWith(e.path)))}
          onUpload={() => {}}
          onDownload={() => {}}
        />
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">PermissionAssignDialog</h2>
        <Button onClick={() => setOpen(true)}>Add permission…</Button>
        <PermissionAssignDialog
          open={open}
          onOpenChange={setOpen}
          objectPath="/Datacenter/Cluster/vm-web-01"
          principals={[{ value: "alice", label: "alice", group: "Users" }, { value: "ops", label: "ops", group: "Groups" }]}
          roles={[{ id: "ro", name: "Read-only", description: "View the object, no changes" }, { id: "admin", name: "Administrator", description: "Full control" }]}
          onAssign={() => {}}
        />
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">SnapshotTree</h2>
        <SnapshotTree
          currentId="s2"
          needsConsolidation
          onTake={() => {}}
          snapshots={[{ id: "s1", name: "Clean install", createdAt: Date.now() - 86400_000 * 20, sizeBytes: 2 ** 31, children: [{ id: "s2", name: "Before upgrade", createdAt: Date.now() - 86400_000 * 2, sizeBytes: 2 ** 29 }] }]}
        />
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">EventConsole</h2>
        <EventConsole
          events={[
            { id: "1", time: Date.now() - 60_000, severity: "info", message: "VM powered on", source: "vm-web-01", user: "alice" },
            { id: "2", time: Date.now() - 3600_000, severity: "error", message: "Disk latency exceeded", source: "ds-02", details: "latency=480ms" },
            { id: "3", time: Date.now() - 7200_000, severity: "warning", message: "Snapshot is old", source: "vm-web-01" },
          ]}
        />
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">TopologyGraphFlow (xyflow)</h2>
        <TopologyGraphFlow
          nodes={[{ id: "h", label: "esx-01" }, { id: "v1", label: "vm-web-01" }, { id: "v2", label: "vm-db-01", tone: "warn" }, { id: "n", label: "VM Network" }]}
          edges={[{ from: "h", to: "v1" }, { from: "h", to: "v2" }, { from: "v1", to: "n" }, { from: "v2", to: "n" }]}
        />
      </section>
    </div>
  );
}
