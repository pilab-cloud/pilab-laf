import * as React from 'react';
import { C as ChartAnimate } from './chart-motion-BTO5GOqJ.js';

interface ComboboxOption {
    value: string;
    label: string;
    description?: string;
    group?: string;
    disabled?: boolean;
}
interface ComboboxProps {
    options: ComboboxOption[] | ((query: string) => ComboboxOption[] | Promise<ComboboxOption[]>);
    value: ComboboxOption[];
    onChange: (value: ComboboxOption[]) => void;
    multiple?: boolean;
    label: string;
    placeholder?: string;
    emptyText?: string;
    loadingText?: string;
    disabled?: boolean;
    /** Offer a "Create “query”" row; receives the typed text. */
    onCreate?: (query: string) => void;
    createLabel?: (query: string) => string;
    clearable?: boolean;
    clearLabel?: string;
    renderOption?: (option: ComboboxOption, state: {
        selected: boolean;
    }) => React.ReactNode;
    /** Controlled open state; omit for uncontrolled. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}
declare function Combobox({ options, value, onChange, multiple, label, placeholder, emptyText: emptyTextProp, loadingText: loadingTextProp, disabled, onCreate, createLabel: createLabelProp, clearable, clearLabel: clearLabelProp, renderOption, open: openProp, onOpenChange, className, }: ComboboxProps): React.JSX.Element;

declare function Kbd({ className, ...props }: React.ComponentProps<"kbd">): React.JSX.Element;
declare function InlineEdit({ value, onSave, label, validate, as, options, min, max, }: {
    value: string;
    onSave: (value: string) => void | Promise<void>;
    label: string;
    validate?: (value: string) => string | undefined;
    /** Editor kind; `select` needs `options`, `number` honours `min`/`max`. */
    as?: "text" | "select" | "number";
    options?: {
        value: string;
        label: string;
    }[];
    min?: number;
    max?: number;
}): React.JSX.Element;
interface UploadFile {
    id: string;
    name: string;
    size: number;
    progress?: number;
    error?: string;
}
declare function FileDropzone({ files, onFiles, onRemove, accept, maxSize, multiple, label: labelProp, }: {
    files: UploadFile[];
    onFiles: (files: File[]) => void;
    onRemove?: (id: string) => void;
    accept?: string;
    /** bytes */
    maxSize?: number;
    multiple?: boolean;
    label?: string;
}): React.JSX.Element;
interface AlarmItem {
    id: string;
    severity: "critical" | "warning" | "info";
    name: string;
    entity: string;
    /** Pre-formatted text; ignored when `triggeredAt` is set. */
    triggered: string;
    triggeredAt?: Date | string | number;
    entityId?: string;
    acknowledged?: boolean;
}
declare function AlarmList({ alarms, onAcknowledge, onReset, onOpenEntity, selectable, empty: emptyProp, }: {
    alarms: AlarmItem[];
    onAcknowledge?: (id: string) => void;
    /** Reset to green. */
    onReset?: (id: string) => void;
    onOpenEntity?: (alarm: AlarmItem) => void;
    /** Checkboxes plus bulk acknowledge/reset (ids are passed one call per alarm). */
    selectable?: boolean;
    empty?: string;
}): React.JSX.Element;
declare function Gauge({ value, max, label, warnAt, dangerAt, animate }: {
    value: number;
    max?: number;
    label: string;
    warnAt?: number;
    dangerAt?: number; /** Arc sweeps in and tweens on change; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
}): React.JSX.Element;
declare function Donut({ slices, label }: {
    slices: {
        name: string;
        value: number;
    }[];
    label: string;
}): React.JSX.Element;
declare function BarChart({ data, label }: {
    data: {
        name: string;
        value: number;
    }[];
    label: string;
}): React.JSX.Element;
declare function DateTimeInput({ mode, className, ...props }: Omit<React.ComponentProps<"input">, "type"> & {
    mode?: "date" | "datetime-local" | "time";
}): React.JSX.Element;
declare function FormField({ id: idProp, label, description, error, children, }: {
    /** Fixed control id, e.g. so an ErrorSummary can link to it. */
    id?: string;
    label: string;
    description?: string;
    error?: string;
    children: (aria: {
        id: string;
        "aria-invalid"?: boolean;
        "aria-describedby"?: string;
    }) => React.ReactNode;
}): React.JSX.Element;
declare function ErrorSummary({ errors, title: titleProp }: {
    errors: {
        id: string;
        message: string;
    }[];
    title?: string;
}): React.JSX.Element | null;

type ConsoleStatus = "connecting" | "connected" | "disconnected" | "error";
interface ConsoleFrameLabels {
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
interface ConsoleFrameProps {
    /** The canvas / video element supplied by the app (noVNC, WebMKS, …). */
    children?: React.ReactNode;
    status: ConsoleStatus;
    errorMessage?: string;
    /** Called with a key-combo id; "ctrl-alt-del" for the primary button. */
    onSendKeys?: (combo: string) => void;
    /** Extra combos for the "Send keys" menu. */
    keyCombos?: {
        id: string;
        label: string;
    }[];
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
declare function ConsoleFrame({ children, status, errorMessage, onSendKeys, keyCombos, scale: scaleProp, onScaleChange, onScreenshot, onDisconnect, onReconnect, keyboardGrabbed, labels, className, }: ConsoleFrameProps): React.JSX.Element;
type HwDevice = {
    id: string;
    kind: "cpu";
    count: number;
    coresPerSocket: number;
    reservationMhz: number;
} | {
    id: string;
    kind: "memory";
    sizeMb: number;
    reservationMb: number;
} | {
    id: string;
    kind: "disk";
    name: string;
    sizeGb: number;
    provisioning: "thin" | "thick-lazy" | "thick-eager";
    controller: string;
} | {
    id: string;
    kind: "nic";
    name: string;
    network: string;
    adapter: string;
    connected: boolean;
} | {
    id: string;
    kind: "cdrom";
    name: string;
    iso?: string;
    connected: boolean;
};
type HwKind = HwDevice["kind"];
interface HardwareCapabilities {
    /** Whether the VM is running; hot-add rules only apply then. */
    poweredOn?: boolean;
    hotAdd?: Partial<Record<HwKind, boolean>>;
    networks: string[];
    controllers?: string[];
    adapters?: string[];
    maxCpu?: number;
    maxMemoryMb?: number;
}
interface HardwareEditorLabels {
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
interface HardwareEditorProps {
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
declare function HardwareEditor({ devices: devicesProp, defaultDevices, onChange, baseline, capabilities: cap, onSave, renderIsoPicker, labels, className }: HardwareEditorProps): React.JSX.Element;
interface DatastoreEntry {
    /** Absolute path, e.g. "/iso/win.iso"; the root is "/". */
    path: string;
    type: "folder" | "file";
    size?: number;
    modified?: Date | string | number;
}
interface DatastoreBrowserLabels {
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
interface DatastoreBrowserProps {
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
declare function DatastoreBrowser({ entries, path: pathProp, defaultPath, onPathChange, onLoadFolder, uploads, onUpload, onDownload, onCreateFolder, onDelete, select, accept, onSelect, onCancel, labels, className, }: DatastoreBrowserProps): React.JSX.Element;
interface PermissionRole {
    id: string;
    name: string;
    description?: string;
}
interface PermissionAssignment {
    principal: ComboboxOption;
    roleId: string;
    propagate: boolean;
}
interface PermissionAssignLabels {
    title: string;
    principal: string;
    role: string;
    propagate: string;
    object: string;
    assign: string;
    cancel: string;
}
interface PermissionAssignDialogProps {
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
declare function PermissionAssignDialog({ open, onOpenChange, principals, roles, objectPath, defaultRoleId, defaultPropagate, onAssign, labels }: PermissionAssignDialogProps): React.JSX.Element;
interface SnapshotNode {
    id: string;
    name: string;
    createdAt: Date | string | number;
    sizeBytes?: number;
    description?: string;
    children?: SnapshotNode[];
}
interface SnapshotTreeLabels {
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
interface SnapshotTreeProps {
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
declare function SnapshotTree({ snapshots, currentId, onTake, onRevert, onDelete, onDeleteChildren, needsConsolidation, onConsolidate, labels, className }: SnapshotTreeProps): React.JSX.Element;
type EventSeverity = "info" | "warning" | "error";
interface ConsoleEvent {
    id: string;
    time: Date | string | number;
    severity: EventSeverity;
    message: string;
    source?: string;
    user?: string;
    details?: string;
}
interface EventConsoleLabels {
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
interface EventConsoleProps {
    events: ConsoleEvent[];
    liveTail?: boolean;
    onLiveTailChange?: (live: boolean) => void;
    labels?: Partial<EventConsoleLabels>;
    className?: string;
}
declare function EventConsole({ events, liveTail: liveProp, onLiveTailChange, labels, className }: EventConsoleProps): React.JSX.Element;

export { type AlarmItem as A, BarChart as B, type ConsoleStatus as C, DatastoreBrowser as D, ErrorSummary as E, FileDropzone as F, Gauge as G, type HardwareCapabilities as H, InlineEdit as I, type PermissionRole as J, Kbd as K, SnapshotTree as L, type SnapshotTreeLabels as M, type SnapshotTreeProps as N, PermissionAssignDialog as P, type SnapshotNode as S, type UploadFile as U, type ConsoleFrameProps as a, type ComboboxOption as b, AlarmList as c, Combobox as d, type ComboboxProps as e, type ConsoleEvent as f, ConsoleFrame as g, type ConsoleFrameLabels as h, type DatastoreBrowserLabels as i, type DatastoreBrowserProps as j, type DatastoreEntry as k, DateTimeInput as l, Donut as m, EventConsole as n, type EventConsoleLabels as o, type EventConsoleProps as p, type EventSeverity as q, FormField as r, HardwareEditor as s, type HardwareEditorLabels as t, type HardwareEditorProps as u, type HwDevice as v, type HwKind as w, type PermissionAssignDialogProps as x, type PermissionAssignLabels as y, type PermissionAssignment as z };
