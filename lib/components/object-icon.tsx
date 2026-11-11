import {
  AppWindow,
  Boxes,
  Building2,
  Cable,
  Camera,
  GitBranch,
  Globe,
  Inbox,
  KeyRound,
  ListOrdered,
  Mail,
  ShieldCheck,
  CircleDot,
  CircleX,
  Moon,
  Zap,
  Copy,
  Database,
  Folder,
  FolderKanban,
  Layers,
  Monitor,
  Network,
  Package,
  Pause,
  Play,
  Router,
  Server,
  Square,
  TriangleAlert,
  Unplug,
  User,
  Users,
  Waypoints,
  Wrench,
  HardDrive,
  type LucideIcon,
} from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf, type LafMessages } from "../i18n";
import { ClusterGlyph, DatacenterGlyph, ServerGlyph, TemplateGlyph, VmGlyph, type ObjectGlyph } from "./object-glyphs";

export type ObjectKind =
  | "datacenter"
  | "cluster"
  | "host"
  | "vm"
  | "template"
  | "vapp"
  | "folder"
  | "resource-pool"
  | "datastore"
  | "datastore-cluster"
  | "network"
  | "dvswitch"
  | "portgroup"
  | "snapshot"
  | "user"
  | "group"
  | "client"
  | "issue"
  | "project"
  | "mailbox"
  | "shared-mailbox"
  | "domain"
  | "mail-queue"
  | "repository"
  | "token"
  | "policy";

export type ObjectState =
  | "on"
  | "off"
  | "suspended"
  | "maintenance"
  | "disconnected"
  | "warning"
  | "error"
  | "running"
  | "paused"
  | "stopped"
  | "crashed"
  | "hibernated";

/** Every state, in the order a state picker or legend should list them. */
export const objectStates: readonly ObjectState[] = ["running", "paused", "stopped", "crashed", "hibernated", "maintenance", "error", "warning", "disconnected"];

const baseKinds: Record<ObjectKind, ObjectGlyph | LucideIcon> = {
  datacenter: DatacenterGlyph,
  cluster: ClusterGlyph,
  host: ServerGlyph,
  vm: VmGlyph,
  template: TemplateGlyph,
  vapp: Package,
  folder: Folder,
  "resource-pool": Layers,
  datastore: Database,
  "datastore-cluster": HardDrive,
  network: Network,
  dvswitch: Router,
  portgroup: Waypoints,
  snapshot: Camera,
  user: User,
  group: Users,
  client: AppWindow,
  issue: CircleDot,
  project: FolderKanban,
  mailbox: Mail,
  "shared-mailbox": Inbox,
  domain: Globe,
  "mail-queue": ListOrdered,
  repository: GitBranch,
  token: KeyRound,
  policy: ShieldCheck,
};

/** Kinds added by the app; the built-in set above is never mutated. */
const custom = new Map<string, ObjectGlyph | LucideIcon>();

/** Register (or override) an icon for an app-specific kind. Call it from app start-up, not at import time of this library. */
export function registerObjectKind(kind: string, icon: ObjectGlyph | LucideIcon): void {
  custom.set(kind, icon);
}

export interface ObjectStateMeta {
  Icon: LucideIcon;
  /** Text colour for inline glyphs. */
  tone: string;
  /** Solid fill for the composite badge disc. */
  fill: string;
  text: keyof LafMessages;
  /** How the base glyph is treated so the state reads even without the badge. */
  base: "normal" | "dim" | "faded" | "danger";
}

const running: ObjectStateMeta = { Icon: Play, tone: "text-ok", fill: "bg-ok", text: "stateRunning", base: "normal" };
const paused: ObjectStateMeta = { Icon: Pause, tone: "text-warn", fill: "bg-warn", text: "statePaused", base: "normal" };
const stopped: ObjectStateMeta = { Icon: Square, tone: "text-subtle", fill: "bg-muted", text: "stateStopped", base: "dim" };

export const objectStateMeta: Record<ObjectState, ObjectStateMeta> = {
  running,
  on: { ...running, text: "stateOn" },
  paused,
  suspended: { ...paused, text: "stateSuspended" },
  stopped,
  off: { ...stopped, text: "stateOff" },
  crashed: { Icon: Zap, tone: "text-danger", fill: "bg-danger", text: "stateCrashed", base: "danger" },
  hibernated: { Icon: Moon, tone: "text-primary", fill: "bg-primary", text: "stateHibernated", base: "faded" },
  maintenance: { Icon: Wrench, tone: "text-primary", fill: "bg-primary", text: "stateMaintenance", base: "normal" },
  disconnected: { Icon: Unplug, tone: "text-muted", fill: "bg-muted", text: "stateDisconnected", base: "faded" },
  warning: { Icon: TriangleAlert, tone: "text-warn", fill: "bg-warn", text: "stateWarning", base: "normal" },
  error: { Icon: CircleX, tone: "text-danger", fill: "bg-danger", text: "stateError", base: "normal" },
};

const baseTone: Record<ObjectStateMeta["base"], string> = {
  normal: "text-muted",
  dim: "text-subtle",
  faded: "text-subtle",
  danger: "text-danger",
};

export interface ObjectIconProps {
  kind: ObjectKind | (string & {});
  state?: ObjectState;
  /** Second badge on the opposite corner, e.g. an alarm on a running VM or maintenance on a powered-off host. */
  overlay?: ObjectState;
  size?: 16 | 20;
  /** Accessible name of the object kind/instance; without it (and without a state) the icon is decorative. */
  label?: string;
  className?: string;
}

/** Bare state glyph on the corner of the base icon: no chip, no outline. */
function StateBadge({ state, px, className }: { state: ObjectState; px: number; className: string }) {
  const m = objectStateMeta[state];
  const size = Math.round(px * 0.8);
  const filled = state === "running" || state === "on" || state === "crashed";
  return (
    <m.Icon
      aria-hidden
      data-badge={state}
      width={size}
      height={size}
      strokeWidth={2.75}
      fill={filled ? "currentColor" : "none"}
      className={cn("absolute", m.tone, className)}
    />
  );
}

export function ObjectIcon({ kind, state, overlay, size = 16, label, className }: ObjectIconProps) {
  const { t } = useLaf();
  const Icon = custom.get(kind) ?? baseKinds[kind as ObjectKind] ?? Cable;
  const meta = state ? objectStateMeta[state] : undefined;
  const stateText = [state, overlay].filter((x): x is ObjectState => !!x).map((x) => t[objectStateMeta[x].text] as string).join(", ");
  const name = [label, stateText].filter(Boolean).join(", ");
  const px = size === 20 ? 20 : 16;
  return (
    <span
      data-kind={kind}
      data-state={state}
      data-overlay={overlay}
      role={name ? "img" : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
      className={cn("relative inline-flex shrink-0 items-center justify-center", meta ? baseTone[meta.base] : "text-muted", className)}
      style={{ width: px, height: px }}
    >
      <Icon width={px} height={px} aria-hidden className={meta?.base === "dim" ? "opacity-70" : meta?.base === "faded" ? "opacity-50" : undefined} />
      {state && <StateBadge state={state} px={px} className="-end-1 -bottom-1" />}
      {overlay && <StateBadge state={overlay} px={px} className="-end-1 -top-1" />}
    </span>
  );
}

/** Every built-in kind, for galleries, pickers and tests. */
export const objectKinds = Object.keys(baseKinds) as ObjectKind[];
