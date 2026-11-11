import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { s as LafMessages } from './i18n-D7-T2u5f.js';

/** Stroke-based 24×24 glyphs matching the lucide set (currentColor, round caps), drawn for infrastructure objects. */
type ObjectGlyph = React.ComponentType<React.SVGProps<SVGSVGElement>>;
/** Virtual machine: a screen with a cube inside. */
declare const VmGlyph: ObjectGlyph;
/** VM template: the VM glyph with a dashed screen. */
declare const TemplateGlyph: ObjectGlyph;
/** One physical server: a single tower/rack unit with drive bays and a status LED. */
declare const ServerGlyph: ObjectGlyph;
/** Cluster: several servers side by side. */
declare const ClusterGlyph: ObjectGlyph;
/** Data center: a headquarters building with server racks inside. */
declare const DatacenterGlyph: ObjectGlyph;

type ObjectKind = "datacenter" | "cluster" | "host" | "vm" | "template" | "vapp" | "folder" | "resource-pool" | "datastore" | "datastore-cluster" | "network" | "dvswitch" | "portgroup" | "snapshot" | "user" | "group" | "client" | "issue" | "project" | "mailbox" | "shared-mailbox" | "domain" | "mail-queue" | "repository" | "token" | "policy" | "ssd" | "hdd" | "nvme" | "iscsi" | "san" | "nas" | "vdisk" | "raid" | "disk-array" | "lun" | "volume" | "vswitch" | "vnic" | "vlan" | "firewall" | "load-balancer" | "router" | "uplink";
type ObjectState = "on" | "off" | "suspended" | "maintenance" | "disconnected" | "warning" | "error" | "running" | "paused" | "stopped" | "crashed" | "hibernated";
/** Every state, in the order a state picker or legend should list them. */
declare const objectStates: readonly ObjectState[];
/** Register (or override) an icon for an app-specific kind. Call it from app start-up, not at import time of this library. */
declare function registerObjectKind(kind: string, icon: ObjectGlyph | LucideIcon): void;
interface ObjectStateMeta {
    Icon: LucideIcon;
    /** Text colour for inline glyphs. */
    tone: string;
    /** Solid fill for the composite badge disc. */
    fill: string;
    text: keyof LafMessages;
    /** How the base glyph is treated so the state reads even without the badge. */
    base: "normal" | "dim" | "faded" | "danger";
}
declare const objectStateMeta: Record<ObjectState, ObjectStateMeta>;
interface ObjectIconProps {
    kind: ObjectKind | (string & {});
    state?: ObjectState;
    /** Second badge on the opposite corner, e.g. an alarm on a running VM or maintenance on a powered-off host. */
    overlay?: ObjectState;
    size?: 16 | 20;
    /** Accessible name of the object kind/instance; without it (and without a state) the icon is decorative. */
    label?: string;
    className?: string;
}
/** Bare state glyph on the corner (also used by `VmOsIcon` in `@pilab/laf/os-icons`) of the base icon: no chip, no outline. */
declare function StateBadge({ state, px, className }: {
    state: ObjectState;
    px: number;
    className: string;
}): React.JSX.Element;
declare function ObjectIcon({ kind, state, overlay, size, label, className }: ObjectIconProps): React.JSX.Element;
/** Every built-in kind, for galleries, pickers and tests. */
declare const objectKinds: ObjectKind[];

export { ClusterGlyph as C, DatacenterGlyph as D, type ObjectKind as O, ServerGlyph as S, TemplateGlyph as T, VmGlyph as V, type ObjectState as a, type ObjectGlyph as b, ObjectIcon as c, type ObjectIconProps as d, type ObjectStateMeta as e, StateBadge as f, objectStateMeta as g, objectStates as h, objectKinds as o, registerObjectKind as r };
