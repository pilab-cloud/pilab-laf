import {
  AppWindow,
  Boxes,
  Building2,
  Cable,
  Camera,
  CircleDot,
  CircleX,
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
  | "project";

export type ObjectState = "on" | "off" | "suspended" | "maintenance" | "disconnected" | "warning" | "error";

const baseKinds: Record<ObjectKind, LucideIcon> = {
  datacenter: Building2,
  cluster: Boxes,
  host: Server,
  vm: Monitor,
  template: Copy,
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
};

/** Kinds added by the app; the built-in set above is never mutated. */
const custom = new Map<string, LucideIcon>();

/** Register (or override) an icon for an app-specific kind. Call it from app start-up, not at import time of this library. */
export function registerObjectKind(kind: string, icon: LucideIcon): void {
  custom.set(kind, icon);
}

const stateGlyph: Record<ObjectState, { Icon: LucideIcon; tone: string; text: keyof LafMessages }> = {
  on: { Icon: Play, tone: "text-ok", text: "stateOn" },
  off: { Icon: Square, tone: "text-subtle", text: "stateOff" },
  suspended: { Icon: Pause, tone: "text-warn", text: "stateSuspended" },
  maintenance: { Icon: Wrench, tone: "text-primary", text: "stateMaintenance" },
  disconnected: { Icon: Unplug, tone: "text-muted", text: "stateDisconnected" },
  warning: { Icon: TriangleAlert, tone: "text-warn", text: "stateWarning" },
  error: { Icon: CircleX, tone: "text-danger", text: "stateError" },
};

export interface ObjectIconProps {
  kind: ObjectKind | (string & {});
  state?: ObjectState;
  size?: 16 | 20;
  /** Accessible name of the object kind/instance; without it (and without a state) the icon is decorative. */
  label?: string;
  className?: string;
}

export function ObjectIcon({ kind, state, size = 16, label, className }: ObjectIconProps) {
  const { t } = useLaf();
  const Icon = custom.get(kind) ?? baseKinds[kind as ObjectKind] ?? Cable;
  const glyph = state ? stateGlyph[state] : undefined;
  const stateText = glyph ? (t[glyph.text] as string) : undefined;
  const name = [label, stateText].filter(Boolean).join(", ");
  const px = size === 20 ? 20 : 16;
  const badge = Math.round(px * 0.55);
  return (
    <span
      data-kind={kind}
      data-state={state}
      role={name ? "img" : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
      className={cn("relative inline-flex shrink-0 items-center justify-center text-muted", className)}
      style={{ width: px, height: px }}
    >
      <Icon width={px} height={px} aria-hidden />
      {glyph && (
        <span aria-hidden className="absolute -end-1 -bottom-1 inline-flex rounded-xs bg-menu leading-none">
          <glyph.Icon width={badge} height={badge} className={glyph.tone} fill={state === "on" ? "currentColor" : "none"} />
        </span>
      )}
    </span>
  );
}
