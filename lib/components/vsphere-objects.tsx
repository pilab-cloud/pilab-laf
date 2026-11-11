import { ChevronRight, Download, FolderPlus, Maximize2, Minimize2, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { vsphereObjectsEn } from "../messages/vsphere-objects.en";
import { useControllableState } from "../utils";
import { Button } from "./button";
import { Combobox, type ComboboxOption } from "./combobox";
import { StatusDot, RelativeTime } from "./primitives";
import { Badge } from "./display";
import { Banner, Drawer, DrawerContent } from "./extras";
import { Field, Input, Switch } from "./form";
import { ConfirmDialog } from "./helpers";
import { FileDropzone, type UploadFile } from "./more";
import { Dialog, DialogContent, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./overlay";
import { ObjectIcon } from "./object-icon";
import { TreeView, type TreeNode } from "./tree";

const lafDefaults = { vsphereObjects: vsphereObjectsEn };
const useLaf = () => useLafDefaults(lafDefaults);

/* ───────────────────────── ConsoleFrame (4.105) ───────────────────────── */
export type ConsoleStatus = "connecting" | "connected" | "disconnected" | "error";

export interface ConsoleFrameLabels {
  console: string;
  sendCad: string;
  keys: string;
  fullscreen: string;
  exitFullscreen: string;
  fit: string;
  actual: string;
  screenshot: string;
  disconnect: string;
  reconnect: string;
  connecting: string;
  connected: string;
  disconnected: string;
  error: string;
  releaseHint: string;
}

export interface ConsoleFrameProps {
  /** The canvas / video element supplied by the app (noVNC, WebMKS, …). */
  children?: React.ReactNode;
  status: ConsoleStatus;
  errorMessage?: string;
  /** Called with a key-combo id; "ctrl-alt-del" for the primary button. */
  onSendKeys?: (combo: string) => void;
  /** Extra combos for the "Send keys" menu. */
  keyCombos?: { id: string; label: string }[];
  scale?: "fit" | "actual";
  onScaleChange?: (scale: "fit" | "actual") => void;
  onScreenshot?: () => void;
  onDisconnect?: () => void;
  onReconnect?: () => void;
  /** Show the keyboard-grab indicator with the release hint. */
  keyboardGrabbed?: boolean;
  labels?: Partial<ConsoleFrameLabels>;
  className?: string;
}

const statusTone = { connecting: "warn", connected: "ok", disconnected: "neutral", error: "danger" } as const;

export function ConsoleFrame({
  children,
  status,
  errorMessage,
  onSendKeys,
  keyCombos,
  scale: scaleProp,
  onScaleChange,
  onScreenshot,
  onDisconnect,
  onReconnect,
  keyboardGrabbed,
  labels,
  className,
}: ConsoleFrameProps) {
  const { t: laf } = useLaf();
  const l = { ...laf.components.vsphereObjects.console, ...labels };
  const root = React.useRef<HTMLDivElement>(null);
  const [full, setFull] = React.useState(false);
  const [scale, setScale] = useControllableState<"fit" | "actual">({ value: scaleProp, defaultValue: "fit", onChange: onScaleChange });
  React.useEffect(() => {
    const on = () => setFull(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", on);
    return () => document.removeEventListener("fullscreenchange", on);
  }, []);
  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void root.current?.requestFullscreen?.();
  };
  const live = status === "connected";
  return (
    <div ref={root} className={cn("flex flex-col overflow-hidden rounded-lg border border-line bg-surface", className)}>
      <div role="toolbar" aria-label={l.console} className="flex flex-wrap items-center gap-2 border-b border-line px-3 py-2">
        <Button size="sm" variant="secondary" disabled={!live} onClick={() => onSendKeys?.("ctrl-alt-del")}>
          {l.sendCad}
        </Button>
        {keyCombos && keyCombos.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" disabled={!live}>
                {l.keys}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {keyCombos.map((k) => (
                <DropdownMenuItem key={k.id} onSelect={() => onSendKeys?.(k.id)}>
                  {k.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button size="sm" variant="ghost" aria-pressed={scale === "actual"} onClick={() => setScale(scale === "fit" ? "actual" : "fit")}>
          {scale === "fit" ? l.actual : l.fit}
        </Button>
        {onScreenshot && (
          <Button size="sm" variant="ghost" disabled={!live} onClick={onScreenshot}>
            {l.screenshot}
          </Button>
        )}
        <Button size="sm" variant="ghost" aria-pressed={full} leftIcon={full ? <Minimize2 aria-hidden /> : <Maximize2 aria-hidden />} onClick={toggleFull}>
          {full ? l.exitFullscreen : l.fullscreen}
        </Button>
        <div className="ms-auto flex items-center gap-3">
          {keyboardGrabbed && live && <span className="text-xs text-muted">{l.releaseHint}</span>}
          <span role="status">
            <StatusDot tone={statusTone[status]} pulse={status === "connecting"} label={l[status]} />
          </span>
          {live && onDisconnect && (
            <Button size="sm" variant="ghost" onClick={onDisconnect}>
              {l.disconnect}
            </Button>
          )}
          {(status === "disconnected" || status === "error") && onReconnect && (
            <Button size="sm" variant="secondary" onClick={onReconnect}>
              {l.reconnect}
            </Button>
          )}
        </div>
      </div>
      <div className={cn("relative grid min-h-48 flex-1 place-items-center bg-black/60", scale === "actual" ? "overflow-auto" : "overflow-hidden [&>*]:max-h-full [&>*]:max-w-full")}>
        {children}
        {!live && (
          <div className="absolute inset-0 grid place-items-center bg-black/50 text-sm text-fg">
            <div className="grid gap-1 text-center">
              <span>{l[status]}</span>
              {status === "error" && errorMessage && <span className="text-danger">{errorMessage}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── HardwareEditor (4.106) ───────────────────────── */
export type HwDevice =
  | { id: string; kind: "cpu"; count: number; coresPerSocket: number; reservationMhz: number }
  | { id: string; kind: "memory"; sizeMb: number; reservationMb: number }
  | { id: string; kind: "disk"; name: string; sizeGb: number; provisioning: "thin" | "thick-lazy" | "thick-eager"; controller: string }
  | { id: string; kind: "nic"; name: string; network: string; adapter: string; connected: boolean }
  | { id: string; kind: "cdrom"; name: string; iso?: string; connected: boolean };

export type HwKind = HwDevice["kind"];

export interface HardwareCapabilities {
  /** Whether the VM is running; hot-add rules only apply then. */
  poweredOn?: boolean;
  hotAdd?: Partial<Record<HwKind, boolean>>;
  networks: string[];
  controllers?: string[];
  adapters?: string[];
  maxCpu?: number;
  maxMemoryMb?: number;
}

export interface HardwareEditorLabels {
  title: string;
  cpu: string;
  memory: string;
  disk: string;
  nic: string;
  cdrom: string;
  cpuCount: string;
  coresPerSocket: string;
  reservationMhz: string;
  memorySize: string;
  reservationMb: string;
  diskSize: string;
  provisioning: string;
  thin: string;
  thickLazy: string;
  thickEager: string;
  controller: string;
  network: string;
  adapter: string;
  connected: string;
  iso: string;
  noIso: string;
  chooseIso: string;
  addDevice: string;
  remove: (name: string) => string;
  hotAddDisabled: string;
  pendingChanges: string;
  noChanges: string;
  save: string;
  discard: string;
  errCpu: string;
  errCores: string;
  errMemory: string;
  errDisk: string;
  errShrink: string;
  errNetwork: string;
  added: string;
  removed: string;
  changed: (field: string, from: string, to: string) => string;
}

const nameOf = (d: HwDevice, l: HardwareEditorLabels) => (d.kind === "cpu" || d.kind === "memory" ? l[d.kind] : d.name);

function validateDevice(d: HwDevice, base: HwDevice | undefined, cap: HardwareCapabilities, l: HardwareEditorLabels): Record<string, string> {
  const e: Record<string, string> = {};
  if (d.kind === "cpu") {
    if (!Number.isInteger(d.count) || d.count < 1 || d.count > (cap.maxCpu ?? Infinity)) e.count = l.errCpu;
    if (d.coresPerSocket < 1 || d.count % d.coresPerSocket !== 0) e.coresPerSocket = l.errCores;
  } else if (d.kind === "memory") {
    if (d.sizeMb < 4 || d.sizeMb % 4 !== 0 || d.sizeMb > (cap.maxMemoryMb ?? Infinity)) e.sizeMb = l.errMemory;
  } else if (d.kind === "disk") {
    if (!(d.sizeGb >= 1)) e.sizeGb = l.errDisk;
    else if (base?.kind === "disk" && d.sizeGb < base.sizeGb) e.sizeGb = l.errShrink;
  } else if (d.kind === "nic" && !d.network) e.network = l.errNetwork;
  return e;
}

function describeDiff(devices: HwDevice[], base: HwDevice[], l: HardwareEditorLabels): string[] {
  const out: string[] = [];
  const byId = new Map(base.map((d) => [d.id, d]));
  for (const d of devices) {
    const b = byId.get(d.id);
    if (!b) {
      out.push(`${l.added}: ${nameOf(d, l)}`);
      continue;
    }
    for (const k of Object.keys(d) as (keyof HwDevice)[]) {
      if (k === "id" || k === "kind") continue;
      const from = (b as Record<string, unknown>)[k];
      const to = (d as Record<string, unknown>)[k];
      if (from !== to) out.push(`${nameOf(d, l)} — ${l.changed(String(k), String(from ?? "—"), String(to ?? "—"))}`);
    }
  }
  for (const b of base) if (!devices.some((d) => d.id === b.id)) out.push(`${l.removed}: ${nameOf(b, l)}`);
  return out;
}

export interface HardwareEditorProps {
  devices?: HwDevice[];
  defaultDevices?: HwDevice[];
  onChange?: (devices: HwDevice[]) => void;
  /** The saved configuration the pending diff is computed against; defaults to the initial devices. */
  baseline?: HwDevice[];
  capabilities: HardwareCapabilities;
  onSave?: (devices: HwDevice[]) => void;
  /** Render a picker (e.g. DatastoreBrowser in a dialog) for CD/DVD media. */
  renderIsoPicker?: (apply: (iso: string) => void, close: () => void) => React.ReactNode;
  labels?: Partial<HardwareEditorLabels>;
  className?: string;
}

export function HardwareEditor({ devices: devicesProp, defaultDevices = [], onChange, baseline, capabilities: cap, onSave, renderIsoPicker, labels, className }: HardwareEditorProps) {
  const { t: laf } = useLaf();
  const l = { ...laf.components.vsphereObjects.hardware, ...labels };
  const initial = React.useRef(devicesProp ?? defaultDevices);
  const base = baseline ?? initial.current;
  const [devices, setDevices] = useControllableState<HwDevice[]>({ value: devicesProp, defaultValue: defaultDevices, onChange });
  const [pickFor, setPickFor] = React.useState<string | null>(null);
  const counter = React.useRef(0);

  const update = (id: string, patch: Record<string, unknown>) => setDevices(devices.map((d) => (d.id === id ? ({ ...d, ...patch } as HwDevice) : d)));
  const locked = (kind: HwKind) => !!cap.poweredOn && !cap.hotAdd?.[kind];
  const add = (kind: Exclude<HwKind, "cpu" | "memory">) => {
    const id = `new-${kind}-${++counter.current}`;
    const n = devices.filter((d) => d.kind === kind).length + 1;
    const dev: HwDevice =
      kind === "disk"
        ? { id, kind, name: `${l.disk} ${n}`, sizeGb: 16, provisioning: "thin", controller: cap.controllers?.[0] ?? "" }
        : kind === "nic"
          ? { id, kind, name: `${l.nic} ${n}`, network: cap.networks[0] ?? "", adapter: cap.adapters?.[0] ?? "", connected: true }
          : { id, kind, name: `${l.cdrom} ${n}`, connected: false };
    setDevices([...devices, dev]);
  };

  const errors = devices.map((d) => validateDevice(d, base.find((b) => b.id === d.id), cap, l));
  const invalid = errors.some((e) => Object.keys(e).length > 0);
  const diff = describeDiff(devices, base, l);

  const num = (d: HwDevice, field: string, text: string, value: number, err: string | undefined, disabled?: boolean) => (
    <Field label={text} error={err} htmlFor={`${d.id}-${field}`}>
      <Input
        id={`${d.id}-${field}`}
        type="number"
        value={Number.isNaN(value) ? "" : value}
        invalid={!!err}
        disabled={disabled}
        title={disabled ? l.hotAddDisabled : undefined}
        onChange={(e) => update(d.id, { [field]: e.target.valueAsNumber })}
      />
    </Field>
  );

  const body = (d: HwDevice, e: Record<string, string>) => {
    switch (d.kind) {
      case "cpu":
        return (
          <div className="grid gap-3 sm:grid-cols-3">
            {num(d, "count", l.cpuCount, d.count, e.count, locked("cpu"))}
            {num(d, "coresPerSocket", l.coresPerSocket, d.coresPerSocket, e.coresPerSocket, locked("cpu"))}
            {num(d, "reservationMhz", l.reservationMhz, d.reservationMhz, undefined)}
          </div>
        );
      case "memory":
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {num(d, "sizeMb", l.memorySize, d.sizeMb, e.sizeMb, locked("memory"))}
            {num(d, "reservationMb", l.reservationMb, d.reservationMb, undefined)}
          </div>
        );
      case "disk":
        return (
          <div className="grid gap-3 sm:grid-cols-3">
            {num(d, "sizeGb", l.diskSize, d.sizeGb, e.sizeGb)}
            <Field label={l.provisioning} htmlFor={`${d.id}-prov`}>
              <select id={`${d.id}-prov`} className="form-select" value={d.provisioning} onChange={(ev) => update(d.id, { provisioning: ev.target.value })}>
                <option value="thin">{l.thin}</option>
                <option value="thick-lazy">{l.thickLazy}</option>
                <option value="thick-eager">{l.thickEager}</option>
              </select>
            </Field>
            <Field label={l.controller} htmlFor={`${d.id}-ctl`}>
              <select id={`${d.id}-ctl`} className="form-select" value={d.controller} onChange={(ev) => update(d.id, { controller: ev.target.value })}>
                {(cap.controllers ?? [d.controller]).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
        );
      case "nic":
        return (
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label={l.network} error={e.network} htmlFor={`${d.id}-net`}>
              <select id={`${d.id}-net`} className="form-select" aria-invalid={!!e.network || undefined} value={d.network} onChange={(ev) => update(d.id, { network: ev.target.value })}>
                <option value="" />
                {cap.networks.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </Field>
            <Field label={l.adapter} htmlFor={`${d.id}-ad`}>
              <select id={`${d.id}-ad`} className="form-select" value={d.adapter} onChange={(ev) => update(d.id, { adapter: ev.target.value })}>
                {(cap.adapters ?? [d.adapter]).map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </Field>
            <Switch checked={d.connected} onChange={(ev) => update(d.id, { connected: ev.target.checked })}>
              {l.connected}
            </Switch>
          </div>
        );
      case "cdrom":
        return (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted">
              {l.iso}: <span className="text-fg">{d.iso ?? l.noIso}</span>
            </span>
            {renderIsoPicker && (
              <Button size="sm" variant="secondary" onClick={() => setPickFor(d.id)}>
                {l.chooseIso}
              </Button>
            )}
            <Switch checked={d.connected} onChange={(ev) => update(d.id, { connected: ev.target.checked })}>
              {l.connected}
            </Switch>
          </div>
        );
    }
  };

  const addable: Exclude<HwKind, "cpu" | "memory">[] = ["disk", "nic", "cdrom"];
  return (
    <section aria-label={l.title} className={cn("grid gap-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{l.title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="secondary" leftIcon={<Plus aria-hidden />}>
              {l.addDevice}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {addable.map((k) => (
              <DropdownMenuItem key={k} disabled={locked(k)} title={locked(k) ? l.hotAddDisabled : undefined} onSelect={() => add(k)}>
                {l[k]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ul className="grid gap-2">
        {devices.map((d, i) => (
          <li key={d.id} className="relative rounded-md border border-line bg-surface">
            <details open={d.kind === "cpu" || d.kind === "memory" || d.id.startsWith("new-")} className="group">
              <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium">
                <ChevronRight className="size-4 transition-transform group-open:rotate-90 rtl:-scale-x-100" aria-hidden />
                <span>{nameOf(d, l)}</span>
                {Object.keys(errors[i]!).length > 0 && <Badge tone="danger">!</Badge>}
              </summary>
              <div className="border-t border-line p-3">{body(d, errors[i]!)}</div>
            </details>
            {d.kind !== "cpu" && d.kind !== "memory" && (
                  <button
                    type="button"
                    aria-label={l.remove(nameOf(d, l))}
                    disabled={locked(d.kind)}
                    title={locked(d.kind) ? l.hotAddDisabled : undefined}
                    className="absolute end-3 top-2 text-muted hover:text-danger disabled:opacity-40"
                    onClick={() => setDevices(devices.filter((x) => x.id !== d.id))}
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                )}
          </li>
        ))}
      </ul>
      <div className="rounded-md border border-line bg-surface p-3">
        <h4 className="mb-1 text-xs font-semibold text-muted uppercase">{l.pendingChanges}</h4>
        {diff.length === 0 ? (
          <p className="text-sm text-subtle">{l.noChanges}</p>
        ) : (
          <ul aria-label={l.pendingChanges} className="list-disc ps-5 text-sm">
            {diff.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" disabled={diff.length === 0} onClick={() => setDevices(base)}>
          {l.discard}
        </Button>
        <Button disabled={diff.length === 0 || invalid} onClick={() => onSave?.(devices)}>
          {l.save}
        </Button>
      </div>
      {renderIsoPicker && (
        <Dialog open={pickFor !== null} onOpenChange={(o) => !o && setPickFor(null)}>
          <DialogContent title={l.chooseIso} className="w-[min(56rem,95vw)]">
            {renderIsoPicker(
              (iso) => {
                if (pickFor) update(pickFor, { iso });
                setPickFor(null);
              },
              () => setPickFor(null),
            )}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}

/* ───────────────────────── DatastoreBrowser (4.107) ───────────────────────── */
export interface DatastoreEntry {
  /** Absolute path, e.g. "/iso/win.iso"; the root is "/". */
  path: string;
  type: "folder" | "file";
  size?: number;
  modified?: Date | string | number;
}

export interface DatastoreBrowserLabels {
  tree: string;
  files: string;
  path: string;
  name: string;
  size: string;
  modified: string;
  type: string;
  folder: string;
  file: string;
  root: string;
  empty: string;
  upload: string;
  download: string;
  newFolder: string;
  folderName: string;
  create: string;
  delete: string;
  deleteTitle: string;
  deleteDescription: (name: string) => string;
  select: string;
  cancel: string;
}

const parentOf = (p: string) => (p.lastIndexOf("/") <= 0 ? "/" : p.slice(0, p.lastIndexOf("/")));
const baseName = (p: string) => p.slice(p.lastIndexOf("/") + 1);

export interface DatastoreBrowserProps {
  entries: DatastoreEntry[];
  path?: string;
  defaultPath?: string;
  onPathChange?: (path: string) => void;
  /** Lazy folders: called when an unloaded folder is expanded/opened; the parent then adds entries. */
  onLoadFolder?: (path: string) => Promise<void>;
  uploads?: UploadFile[];
  onUpload?: (files: File[], folder: string) => void;
  onDownload?: (entry: DatastoreEntry) => void;
  onCreateFolder?: (name: string, parent: string) => void;
  onDelete?: (entry: DatastoreEntry) => void;
  /** Picker mode: choose a file or a folder. */
  select?: "file" | "folder";
  /** Extensions accepted in picker mode, e.g. [".iso"]. */
  accept?: string[];
  onSelect?: (entry: DatastoreEntry) => void;
  onCancel?: () => void;
  labels?: Partial<DatastoreBrowserLabels>;
  className?: string;
}

export function DatastoreBrowser({
  entries,
  path: pathProp,
  defaultPath = "/",
  onPathChange,
  onLoadFolder,
  uploads = [],
  onUpload,
  onDownload,
  onCreateFolder,
  onDelete,
  select,
  accept,
  onSelect,
  onCancel,
  labels,
  className,
}: DatastoreBrowserProps) {
  const { format, t: laf } = useLaf();
  const l = { ...laf.components.vsphereObjects.datastore, ...labels };
  const [path, setPath] = useControllableState<string>({ value: pathProp, defaultValue: defaultPath, onChange: onPathChange });
  const [chosen, setChosen] = React.useState<string | null>(null);
  const [toDelete, setToDelete] = React.useState<DatastoreEntry | null>(null);
  const [naming, setNaming] = React.useState(false);
  const [folderName, setFolderName] = React.useState("");
  const loaded = React.useRef(new Set<string>());

  const matches = (e: DatastoreEntry) => e.type === "folder" || !accept || accept.some((a) => e.path.toLowerCase().endsWith(a.toLowerCase()));
  const children = React.useMemo(
    () => entries.filter((e) => parentOf(e.path) === path && e.path !== "/").sort((a, b) => (a.type === b.type ? baseName(a.path).localeCompare(baseName(b.path)) : a.type === "folder" ? -1 : 1)),
    [entries, path],
  );

  const nodes = React.useMemo(() => {
    const build = (parent: string): TreeNode[] =>
      entries
        .filter((e) => e.type === "folder" && parentOf(e.path) === parent && e.path !== "/")
        .map((e) => {
          const kids = build(e.path);
          return { id: e.path, label: baseName(e.path), icon: <ObjectIcon kind="folder" />, children: kids, hasChildren: !!onLoadFolder && kids.length === 0 };
        });
    return [{ id: "/", label: l.root, icon: <ObjectIcon kind="datastore" />, children: build("/") }];
  }, [entries, onLoadFolder, l.root]);

  const load = async (p: string) => {
    if (!onLoadFolder || loaded.current.has(p)) return;
    loaded.current.add(p);
    await onLoadFolder(p);
  };
  const open = (p: string) => {
    setPath(p);
    setChosen(null);
    void load(p);
  };
  const crumbs = path === "/" ? [] : path.split("/").filter(Boolean);
  const chosenEntry = entries.find((e) => e.path === chosen);
  const canPick = select === "folder" ? true : !!chosenEntry && chosenEntry.type === "file";

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <nav aria-label={l.path} className="flex min-w-0 flex-1 items-center gap-1 text-sm">
          <button type="button" className="text-primary hover:underline" onClick={() => open("/")}>
            {l.root}
          </button>
          {crumbs.map((c, i) => {
            const p = `/${crumbs.slice(0, i + 1).join("/")}`;
            return (
              <React.Fragment key={p}>
                <ChevronRight className="size-3 text-subtle rtl:-scale-x-100" aria-hidden />
                <button type="button" aria-current={p === path ? "location" : undefined} className={cn("hover:underline", p === path ? "text-fg" : "text-primary")} onClick={() => open(p)}>
                  {c}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
        {onCreateFolder && (
          <Button size="sm" variant="secondary" leftIcon={<FolderPlus aria-hidden />} onClick={() => setNaming(true)}>
            {l.newFolder}
          </Button>
        )}
      </div>
      {naming && (
        <form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const n = folderName.trim();
            if (!n) return;
            onCreateFolder?.(n, path);
            setFolderName("");
            setNaming(false);
          }}
        >
          <Field label={l.folderName} htmlFor="ds-new-folder">
            <Input id="ds-new-folder" autoFocus value={folderName} onChange={(e) => setFolderName(e.target.value)} />
          </Field>
          <Button type="submit" size="sm">
            {l.create}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setNaming(false)}>
            {l.cancel}
          </Button>
        </form>
      )}
      <div className="grid gap-3 md:grid-cols-[14rem_1fr]">
        <div className="rounded-md border border-line bg-surface p-1">
          <TreeView
            label={l.tree}
            nodes={nodes}
            defaultExpanded={["/"]}
            selected={path}
            onSelect={(id) => open(id)}
            loadChildren={onLoadFolder ? async (id) => load(id) : undefined}
            virtual={false}
          />
        </div>
        <div className="min-w-0 rounded-md border border-line bg-surface">
          <table role="grid" aria-label={l.files} className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-start text-xs text-muted">
                <th scope="col" className="px-3 py-2 text-start font-medium">
                  {l.name}
                </th>
                <th scope="col" className="px-3 py-2 text-start font-medium">
                  {l.size}
                </th>
                <th scope="col" className="px-3 py-2 text-start font-medium">
                  {l.modified}
                </th>
                <th scope="col" className="w-20">
                  <span className="sr-only">{l.download} / {l.delete}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {children.map((e) => {
                const ok = matches(e);
                const selectable = select === "folder" ? e.type === "folder" : select === "file" ? e.type === "file" && ok : false;
                return (
                  <tr
                    key={e.path}
                    tabIndex={0}
                    aria-selected={select ? chosen === e.path : undefined}
                    aria-disabled={select && e.type === "file" && !ok ? true : undefined}
                    className={cn("cursor-default border-b border-line outline-none last:border-0 hover:bg-surface-hover focus-visible:bg-surface-hover", chosen === e.path && "bg-primary-light", select && e.type === "file" && !ok && "opacity-40")}
                    onClick={() => selectable && setChosen(e.path)}
                    onDoubleClick={() => (e.type === "folder" ? open(e.path) : selectable && onSelect?.(e))}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter") {
                        if (e.type === "folder") open(e.path);
                        else if (selectable) onSelect?.(e);
                      } else if (ev.key === " " && selectable) {
                        ev.preventDefault();
                        setChosen(e.path);
                      }
                    }}
                  >
                    <td role="gridcell" className="px-3 py-1.5">
                      <span className="inline-flex items-center gap-2">
                        <ObjectIcon kind={e.type === "folder" ? "folder" : "template"} label={e.type === "folder" ? l.folder : l.file} />
                        {baseName(e.path)}
                      </span>
                    </td>
                    <td role="gridcell" className="px-3 py-1.5 text-muted tabular-nums">
                      {e.type === "file" && e.size !== undefined ? format.bytes(e.size, { base: 1024 }) : ""}
                    </td>
                    <td role="gridcell" className="px-3 py-1.5 text-muted">
                      {e.modified !== undefined ? <RelativeTime value={e.modified} /> : ""}
                    </td>
                    <td role="gridcell" className="px-3 py-1.5 text-end">
                      {!select && e.type === "file" && onDownload && (
                        <button type="button" aria-label={`${l.download}: ${baseName(e.path)}`} className="me-2 text-muted hover:text-fg" onClick={(ev) => (ev.stopPropagation(), onDownload(e))}>
                          <Download className="size-4" aria-hidden />
                        </button>
                      )}
                      {!select && onDelete && (
                        <button type="button" aria-label={`${l.delete}: ${baseName(e.path)}`} className="text-muted hover:text-danger" onClick={(ev) => (ev.stopPropagation(), setToDelete(e))}>
                          <Trash2 className="size-4" aria-hidden />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {children.length === 0 && <p className="p-4 text-center text-sm text-subtle">{l.empty}</p>}
        </div>
      </div>
      {onUpload && !select && <FileDropzone files={uploads} onFiles={(f) => onUpload(f, path)} label={l.upload} />}
      {select && (
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              {l.cancel}
            </Button>
          )}
          <Button
            disabled={!canPick}
            onClick={() => {
              const target = select === "folder" ? (chosenEntry ?? entries.find((e) => e.path === path) ?? { path, type: "folder" as const }) : chosenEntry;
              if (target) onSelect?.(target);
            }}
          >
            {l.select}
          </Button>
        </div>
      )}
      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => !o && setToDelete(null)}
        title={l.deleteTitle}
        description={toDelete ? l.deleteDescription(baseName(toDelete.path)) : ""}
        confirmLabel={l.delete}
        onConfirm={() => {
          if (toDelete) onDelete?.(toDelete);
          setToDelete(null);
        }}
      />
    </div>
  );
}

/* ───────────────────────── PermissionAssignDialog (4.109) ───────────────────────── */
export interface PermissionRole {
  id: string;
  name: string;
  description?: string;
}

export interface PermissionAssignment {
  principal: ComboboxOption;
  roleId: string;
  propagate: boolean;
}

export interface PermissionAssignLabels {
  title: string;
  principal: string;
  role: string;
  propagate: string;
  object: string;
  assign: string;
  cancel: string;
}

export interface PermissionAssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Users and groups; set `group` to "Users" / "Groups" to separate them. */
  principals: ComboboxOption[] | ((query: string) => ComboboxOption[] | Promise<ComboboxOption[]>);
  roles: PermissionRole[];
  objectPath: string;
  defaultRoleId?: string;
  defaultPropagate?: boolean;
  onAssign: (assignment: PermissionAssignment) => void | Promise<void>;
  labels?: Partial<PermissionAssignLabels>;
}

export function PermissionAssignDialog({ open, onOpenChange, principals, roles, objectPath, defaultRoleId, defaultPropagate = true, onAssign, labels }: PermissionAssignDialogProps) {
  const { t: laf } = useLaf();
  const l = { ...laf.components.vsphereObjects.permission, ...labels };
  const [principal, setPrincipal] = React.useState<ComboboxOption[]>([]);
  const [roleId, setRoleId] = React.useState(defaultRoleId ?? roles[0]?.id ?? "");
  const [propagate, setPropagate] = React.useState(defaultPropagate);
  const [pending, setPending] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setPrincipal([]);
      setRoleId(defaultRoleId ?? roles[0]?.id ?? "");
      setPropagate(defaultPropagate);
    }
  }, [open, defaultRoleId, defaultPropagate, roles]);
  const role = roles.find((r) => r.id === roleId);
  const submit = async () => {
    if (!principal[0] || !roleId) return;
    setPending(true);
    try {
      await onAssign({ principal: principal[0], roleId, propagate });
      onOpenChange(false);
    } finally {
      setPending(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={l.title}
        footer={
          <>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              {l.cancel}
            </Button>
            <Button loading={pending} disabled={!principal[0] || !roleId} onClick={submit}>
              {l.assign}
            </Button>
          </>
        }
      >
        <div className="grid gap-4">
          <Field label={l.object} htmlFor="perm-object">
            <Input id="perm-object" readOnly value={objectPath} />
          </Field>
          <div className="grid gap-1">
            <span className="text-sm font-medium">{l.principal}</span>
            <Combobox label={l.principal} options={principals} value={principal} onChange={setPrincipal} />
          </div>
          <Field label={l.role} htmlFor="perm-role" hint={role?.description}>
            <select id="perm-role" className="form-select" value={roleId} onChange={(e) => setRoleId(e.target.value)}>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </Field>
          <Switch checked={propagate} onChange={(e) => setPropagate(e.target.checked)}>
            {l.propagate}
          </Switch>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ───────────────────────── SnapshotTree (4.108) ───────────────────────── */
export interface SnapshotNode {
  id: string;
  name: string;
  createdAt: Date | string | number;
  sizeBytes?: number;
  description?: string;
  children?: SnapshotNode[];
}

export interface SnapshotTreeLabels {
  tree: string;
  take: string;
  revert: string;
  delete: string;
  deleteChildren: string;
  youAreHere: string;
  consolidationNeeded: string;
  consolidate: string;
  confirmRevert: (name: string) => string;
  confirmDelete: (name: string) => string;
  confirmDeleteChildren: (name: string) => string;
  cancel: string;
}

export interface SnapshotTreeProps {
  snapshots: SnapshotNode[];
  /** Id of the snapshot the running state descends from; rendered as the "You are here" node. */
  currentId?: string;
  onTake?: () => void;
  onRevert?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDeleteChildren?: (id: string) => void;
  needsConsolidation?: boolean;
  onConsolidate?: () => void;
  labels?: Partial<SnapshotTreeLabels>;
  className?: string;
}

export function SnapshotTree({ snapshots, currentId, onTake, onRevert, onDelete, onDeleteChildren, needsConsolidation, onConsolidate, labels, className }: SnapshotTreeProps) {
  const { format, t: laf } = useLaf();
  const l = { ...laf.components.vsphereObjects.snapshots, ...labels };
  const [selected, setSelected] = React.useState<string>();
  const [confirm, setConfirm] = React.useState<{ kind: "revert" | "delete" | "children"; node: SnapshotNode } | null>(null);
  const index = React.useMemo(() => {
    const m = new Map<string, SnapshotNode>();
    const walk = (n: SnapshotNode) => (m.set(n.id, n), n.children?.forEach(walk));
    snapshots.forEach(walk);
    return m;
  }, [snapshots]);
  const toNode = (s: SnapshotNode): TreeNode => ({
    id: s.id,
    textValue: s.name,
    icon: <ObjectIcon kind="snapshot" />,
    label: (
      <span className="inline-flex items-center gap-2">
        <span>{s.name}</span>
        <span className="text-xs text-muted">
          <RelativeTime value={s.createdAt} />
        </span>
        {s.sizeBytes !== undefined && <span className="text-xs text-muted">{format.bytes(s.sizeBytes, { base: 1024 })}</span>}
        {s.id === currentId && <Badge tone="primary">{l.youAreHere}</Badge>}
      </span>
    ),
    children: s.children?.map(toNode),
  });
  const nodes = React.useMemo(() => snapshots.map(toNode), [snapshots, currentId, format]);
  const allIds = React.useMemo(() => [...index.keys()], [index]);
  const sel = selected ? index.get(selected) : undefined;
  const confirmText = confirm ? (confirm.kind === "revert" ? l.confirmRevert : confirm.kind === "delete" ? l.confirmDelete : l.confirmDeleteChildren)(confirm.node.name) : "";
  return (
    <div className={cn("grid gap-3", className)}>
      {needsConsolidation && (
        <Banner tone="warn" action={onConsolidate && <Button size="sm" variant="secondary" onClick={onConsolidate}>{l.consolidate}</Button>}>
          {l.consolidationNeeded}
        </Banner>
      )}
      <div className="flex flex-wrap gap-2">
        {onTake && (
          <Button size="sm" onClick={onTake}>
            {l.take}
          </Button>
        )}
        <Button size="sm" variant="secondary" disabled={!sel} onClick={() => sel && setConfirm({ kind: "revert", node: sel })}>
          {l.revert}
        </Button>
        <Button size="sm" variant="secondary" disabled={!sel} onClick={() => sel && setConfirm({ kind: "delete", node: sel })}>
          {l.delete}
        </Button>
        <Button size="sm" variant="secondary" disabled={!sel?.children?.length} onClick={() => sel && setConfirm({ kind: "children", node: sel })}>
          {l.deleteChildren}
        </Button>
      </div>
      <div className="rounded-md border border-line bg-surface p-1">
        <TreeView label={l.tree} nodes={nodes} defaultExpanded={allIds} selected={selected} onSelectedChange={(ids) => setSelected(ids[0])} virtual={false} />
      </div>
      <ConfirmDialog
        open={confirm !== null}
        onOpenChange={(o) => !o && setConfirm(null)}
        title={confirm ? l[confirm.kind === "children" ? "deleteChildren" : confirm.kind] : ""}
        description={confirmText}
        confirmLabel={confirm ? l[confirm.kind === "children" ? "deleteChildren" : confirm.kind] : ""}
        cancelLabel={l.cancel}
        onConfirm={() => {
          if (confirm?.kind === "revert") onRevert?.(confirm.node.id);
          else if (confirm?.kind === "delete") onDelete?.(confirm.node.id);
          else if (confirm) onDeleteChildren?.(confirm.node.id);
          setConfirm(null);
        }}
      />
    </div>
  );
}

/* ───────────────────────── EventConsole (4.111) ───────────────────────── */
export type EventSeverity = "info" | "warning" | "error";

export interface ConsoleEvent {
  id: string;
  time: Date | string | number;
  severity: EventSeverity;
  message: string;
  source?: string;
  user?: string;
  details?: string;
}

export interface EventConsoleLabels {
  title: string;
  search: string;
  severity: string;
  all: string;
  info: string;
  warning: string;
  error: string;
  liveTail: string;
  time: string;
  message: string;
  source: string;
  user: string;
  empty: string;
  details: string;
}

const sevTone = { info: "primary", warning: "warn", error: "danger" } as const;

export interface EventConsoleProps {
  events: ConsoleEvent[];
  liveTail?: boolean;
  onLiveTailChange?: (live: boolean) => void;
  labels?: Partial<EventConsoleLabels>;
  className?: string;
}

export function EventConsole({ events, liveTail: liveProp, onLiveTailChange, labels, className }: EventConsoleProps) {
  const { t: laf } = useLaf();
  const l = { ...laf.components.vsphereObjects.events, ...labels };
  const [live, setLive] = useControllableState<boolean>({ value: liveProp, defaultValue: false, onChange: onLiveTailChange });
  const [query, setQuery] = React.useState("");
  const [sev, setSev] = React.useState<"all" | EventSeverity>("all");
  const [open, setOpen] = React.useState<ConsoleEvent | null>(null);
  const rows = React.useMemo(() => {
    const q = query.toLowerCase();
    return events
      .filter((e) => (sev === "all" || e.severity === sev) && (!q || [e.message, e.source, e.user].some((v) => v?.toLowerCase().includes(q))))
      .sort((a, b) => +new Date(b.time) - +new Date(a.time));
  }, [events, query, sev]);
  return (
    <section aria-label={l.title} className={cn("grid gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Input type="search" className="max-w-xs" aria-label={l.search} placeholder={`${l.search}…`} value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label={l.severity} className="form-select w-auto" value={sev} onChange={(e) => setSev(e.target.value as typeof sev)}>
          <option value="all">{l.all}</option>
          <option value="info">{l.info}</option>
          <option value="warning">{l.warning}</option>
          <option value="error">{l.error}</option>
        </select>
        <Switch className="ms-auto" checked={live} onChange={(e) => setLive(e.target.checked)}>
          {l.liveTail}
        </Switch>
      </div>
      <div className="overflow-auto rounded-md border border-line bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-xs text-muted">
              <th scope="col" className="px-3 py-2 text-start font-medium">
                {l.severity}
              </th>
              <th scope="col" className="px-3 py-2 text-start font-medium">
                {l.time}
              </th>
              <th scope="col" className="px-3 py-2 text-start font-medium">
                {l.message}
              </th>
              <th scope="col" className="px-3 py-2 text-start font-medium">
                {l.source}
              </th>
              <th scope="col" className="px-3 py-2 text-start font-medium">
                {l.user}
              </th>
            </tr>
          </thead>
          <tbody aria-live={live ? "polite" : "off"}>
            {rows.map((e) => (
              <tr
                key={e.id}
                tabIndex={0}
                className="cursor-pointer border-b border-line outline-none last:border-0 hover:bg-surface-hover focus-visible:bg-surface-hover"
                onClick={() => setOpen(e)}
                onKeyDown={(ev) => ev.key === "Enter" && setOpen(e)}
              >
                <td className="px-3 py-1.5">
                  <StatusDot tone={sevTone[e.severity]} label={l[e.severity]} />
                </td>
                <td className="px-3 py-1.5 whitespace-nowrap text-muted">
                  <RelativeTime value={e.time} />
                </td>
                <td className="px-3 py-1.5">{e.message}</td>
                <td className="px-3 py-1.5 text-muted">{e.source}</td>
                <td className="px-3 py-1.5 text-muted">{e.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-4 text-center text-sm text-subtle">{l.empty}</p>}
      </div>
      <Drawer open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DrawerContent title={l.details} description={open?.message}>
          {open && (
            <dl className="grid gap-2 text-sm">
              <dt className="text-muted">{l.severity}</dt>
              <dd>{l[open.severity]}</dd>
              <dt className="text-muted">{l.time}</dt>
              <dd>{new Date(open.time).toISOString()}</dd>
              {open.source && (
                <>
                  <dt className="text-muted">{l.source}</dt>
                  <dd>{open.source}</dd>
                </>
              )}
              {open.user && (
                <>
                  <dt className="text-muted">{l.user}</dt>
                  <dd>{open.user}</dd>
                </>
              )}
              {open.details && <pre className="overflow-auto rounded-sm bg-black/30 p-2 font-mono text-xs">{open.details}</pre>}
            </dl>
          )}
        </DrawerContent>
      </Drawer>
    </section>
  );
}
