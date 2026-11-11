import { useLaf } from './chunk-PTV6E3H5.js';
import { cn } from './chunk-3TRXGDSZ.js';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { CircleX, TriangleAlert, Unplug, Wrench, Moon, Zap, Square, Pause, Play, ShieldCheck, KeyRound, GitBranch, ListOrdered, Globe, Inbox, Mail, FolderKanban, CircleDot, AppWindow, Users, User, Camera, Waypoints, Router, Network, HardDrive, Database, Layers, Folder, Package, Cable } from 'lucide-react';

function glyph(name, children) {
  const G = ({ strokeWidth = 2, ...props }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", ...props, children });
  G.displayName = name;
  return G;
}
var VM_CUBE = /* @__PURE__ */ jsx("path", { d: "M12 6.6 15 8.3v3.4L12 13.4 9 11.7V8.3zM12 10 15 8.3M12 10 9 8.3M12 10v3.4", strokeWidth: "1.5" });
var VmGlyph = glyph(
  "VmGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "3.5", width: "19", height: "13", rx: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M8.5 20.5h7M12 16.5v4" }),
    VM_CUBE
  ] })
);
var TemplateGlyph = glyph(
  "TemplateGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "3.5", width: "19", height: "13", rx: "1.5", strokeDasharray: "3 2.2" }),
    /* @__PURE__ */ jsx("path", { d: "M8.5 20.5h7M12 16.5v4" }),
    VM_CUBE
  ] })
);
var ServerGlyph = glyph(
  "ServerGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "5", y: "2.5", width: "14", height: "19", rx: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M8.5 7h7M8.5 11h7", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M8.5 17h.01M12 17h3.5" })
  ] })
);
var ClusterGlyph = glyph(
  "ClusterGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2", y: "6", width: "6", height: "15.5", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "9", y: "2.5", width: "6", height: "19", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "16", y: "6", width: "6", height: "15.5", rx: "1" }),
    /* @__PURE__ */ jsx("path", { d: "M5 9.5h.01M12 6h.01M19 9.5h.01M5 17.5h.01M12 17.5h.01M19 17.5h.01" })
  ] })
);
var DatacenterGlyph = glyph(
  "DatacenterGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { d: "M3.5 21.5v-15L12 2.5l8.5 4v15M2 21.5h20" }),
    /* @__PURE__ */ jsx("rect", { x: "7.5", y: "9", width: "9", height: "4", rx: ".75", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("rect", { x: "7.5", y: "15", width: "9", height: "4", rx: ".75", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M10 11h.01M10 17h.01" })
  ] })
);
var DASH = "3 2.2";
var CYL = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("ellipse", { cx: "12", cy: "5.5", rx: "8", ry: "3" }),
  /* @__PURE__ */ jsx("path", { d: "M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" })
] });
var SsdGlyph = glyph(
  "SsdGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "5", width: "19", height: "14", rx: "2" }),
    /* @__PURE__ */ jsx("rect", { x: "6.5", y: "9", width: "6", height: "6", rx: "1", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M17 9.5h.01M17 14.5h.01" })
  ] })
);
var HddGlyph = glyph(
  "HddGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "3", y: "3.5", width: "18", height: "17", rx: "2" }),
    /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11.5", r: "4.5", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M11 11.5h.01M17.5 17h.01M15 14.5l2.5 2.5" })
  ] })
);
var NvmeGlyph = glyph(
  "NvmeGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "5", y: "6.5", width: "16.5", height: "11", rx: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M2 9.5v5M13.5 9.5l-3 3h4l-3 3" })
  ] })
);
var IscsiGlyph = glyph(
  "IscsiGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("ellipse", { cx: "12", cy: "5", rx: "6", ry: "2.2" }),
    /* @__PURE__ */ jsx("path", { d: "M6 5v6c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V5" }),
    /* @__PURE__ */ jsx("path", { d: "M12 13.2V17M4.5 17h15M4.5 17v3.5M12 17v3.5M19.5 17v3.5" })
  ] })
);
var SanGlyph = glyph(
  "SanGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "2.5", width: "6", height: "5", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "15.5", y: "2.5", width: "6", height: "5", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "7", y: "10", width: "10", height: "4", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "4", y: "17.5", width: "16", height: "4", rx: "1" }),
    /* @__PURE__ */ jsx("path", { d: "M5.5 7.5V12H7M18.5 7.5V12H17M12 14v3.5M7.5 19.5h.01" })
  ] })
);
var NasGlyph = glyph(
  "NasGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "3", width: "19", height: "18", rx: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M12 3v18M7.25 7v5M16.75 7v5M7.25 17.5h.01M16.75 17.5h.01" })
  ] })
);
var NfsGlyph = glyph(
  "NfsGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" }),
    /* @__PURE__ */ jsx("path", { d: "M12 10v3M8 17v-4h8v4", strokeWidth: "1.5" })
  ] })
);
var VdiskGlyph = glyph(
  "VdiskGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("g", { strokeDasharray: DASH, children: [
      /* @__PURE__ */ jsx("ellipse", { cx: "12", cy: "5.5", rx: "8", ry: "3" }),
      /* @__PURE__ */ jsx("path", { d: "M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" })
    ] }),
    /* @__PURE__ */ jsx("path", { d: "M12 10.6 15 12.3v3.4L12 17.4 9 15.7v-3.4zM12 14l3-1.7M12 14l-3-1.7M12 14v3.4", strokeWidth: "1.5" })
  ] })
);
var DiskArrayGlyph = glyph(
  "DiskArrayGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "3", width: "19", height: "8", rx: "1.5" }),
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "13", width: "19", height: "8", rx: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M6.5 6v2M10 6v2M13.5 6v2M17 6v2M6.5 16v2M10 16v2M13.5 16v2M17 16v2", strokeWidth: "1.5" })
  ] })
);
var LunGlyph = glyph(
  "LunGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "3", y: "3.5", width: "18", height: "17", rx: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M3 9.2h18M3 14.8h18" }),
    /* @__PURE__ */ jsx("path", { d: "M7 12h.01M11 12h6" })
  ] })
);
var VolumeGlyph = glyph(
  "VolumeGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    CYL,
    /* @__PURE__ */ jsx("path", { d: "M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" })
  ] })
);
function drives(n, top, height) {
  const gap = n === 2 ? 3 : 2;
  const w = (19 - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ x: 2.5 + i * (w + gap), w })).map((d) => /* @__PURE__ */ jsx("rect", { x: d.x, y: top, width: d.w, height, rx: "1" }, d.x));
}
var RAID_DRAWINGS = {
  default: /* @__PURE__ */ jsxs(Fragment, { children: [
    drives(3, 4, 16),
    /* @__PURE__ */ jsx("path", { d: "M5.5 16.5h.01M12 16.5h.01M18.5 16.5h.01" })
  ] }),
  0: /* @__PURE__ */ jsxs(Fragment, { children: [
    drives(2, 4, 16),
    /* @__PURE__ */ jsx("path", { d: "M5 9h6M13 9h6M5 13h6M13 13h6", strokeWidth: "1.5" })
  ] }),
  1: /* @__PURE__ */ jsxs(Fragment, { children: [
    drives(2, 3, 12),
    /* @__PURE__ */ jsx("path", { d: "M6.5 15v5.5h11V15M12 20.5V23", strokeWidth: "1.5" })
  ] }),
  5: /* @__PURE__ */ jsxs(Fragment, { children: [
    drives(3, 4, 16),
    /* @__PURE__ */ jsx("path", { d: "M5.5 8h.01M12 12h.01M18.5 16h.01" })
  ] }),
  6: /* @__PURE__ */ jsxs(Fragment, { children: [
    drives(4, 4, 16),
    /* @__PURE__ */ jsx("path", { d: "M4.5 8h.01M9.5 11h.01M14.5 14h.01M19.5 17h.01M4.5 17h.01M19.5 8h.01", strokeWidth: "1.5" })
  ] }),
  10: /* @__PURE__ */ jsxs(Fragment, { children: [
    drives(4, 7, 14),
    /* @__PURE__ */ jsx("path", { d: "M4.5 4.5h6v2.5M13.5 7V4.5h6", strokeWidth: "1.5" })
  ] })
};
var RaidGlyph = ({ level, strokeWidth = 2, ...props }) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", "data-raid-level": level, ...props, children: RAID_DRAWINGS[level ?? "default"] });
RaidGlyph.displayName = "RaidGlyph";
var VSwitchGlyph = glyph(
  "VSwitchGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "8.5", width: "19", height: "7", rx: "1.5", strokeDasharray: DASH }),
    /* @__PURE__ */ jsx("path", { d: "M6.5 12h.01M10 12h.01M14 12h.01M17.5 12h.01" }),
    /* @__PURE__ */ jsx("path", { d: "M7 8.5v-5M12 8.5v-5M17 8.5v-5M12 15.5v5" })
  ] })
);
var VnicGlyph = glyph(
  "VnicGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "3.5", y: "3.5", width: "17", height: "12", rx: "1.5", strokeDasharray: DASH }),
    /* @__PURE__ */ jsx("rect", { x: "8", y: "7", width: "8", height: "4.5", rx: ".75", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M7.5 15.5v5M12 15.5v5M16.5 15.5v5" })
  ] })
);
var VlanGlyph = glyph(
  "VlanGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { d: "M2.5 12H7M7 12l4-6.5h8M7 12h12M7 12l4 6.5h8" }),
    /* @__PURE__ */ jsx("path", { d: "M21.5 5.5h.01M21.5 12h.01M21.5 18.5h.01" })
  ] })
);
var FirewallGlyph = glyph(
  "FirewallGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "3", y: "3.5", width: "18", height: "17", rx: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M3 9.2h18M3 14.8h18M12 3.5v5.7M7.5 9.2v5.6M16.5 9.2v5.6M12 14.8v5.7" })
  ] })
);
var LoadBalancerGlyph = glyph(
  "LoadBalancerGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "8.5", y: "2.5", width: "7", height: "4.5", rx: "1" }),
    /* @__PURE__ */ jsx("path", { d: "M12 7v3.5M5 14V10.5h14V14" }),
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "14", width: "5", height: "5.5", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "9.5", y: "14", width: "5", height: "5.5", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "16.5", y: "14", width: "5", height: "5.5", rx: "1" })
  ] })
);
var RouterGlyph = glyph(
  "RouterGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "2.5" }),
    /* @__PURE__ */ jsx("path", { d: "M12 9.5V3M9.5 5.5 12 3l2.5 2.5M12 14.5V21M9.5 18.5 12 21l2.5-2.5M9.5 12H3M5.5 9.5 3 12l2.5 2.5M14.5 12H21M18.5 9.5 21 12l-2.5 2.5" })
  ] })
);
var UplinkGlyph = glyph(
  "UplinkGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("path", { d: "M12 13.5V3M7.5 7.5 12 3l4.5 4.5" }),
    /* @__PURE__ */ jsx("rect", { x: "3.5", y: "14.5", width: "17", height: "6", rx: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M8 17.5h.01M12 17.5h.01M16 17.5h.01" })
  ] })
);
var VpnGlyph = glyph(
  "VpnGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "6", y: "11", width: "12", height: "9.5", rx: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M8.5 11V8a3.5 3.5 0 0 1 7 0v3M12 15v2M1.5 15.7H6M18 15.7h4.5" })
  ] })
);
var objectStates = ["running", "paused", "stopped", "crashed", "hibernated", "maintenance", "error", "warning", "disconnected"];
var baseKinds = {
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
  ssd: SsdGlyph,
  hdd: HddGlyph,
  nvme: NvmeGlyph,
  iscsi: IscsiGlyph,
  san: SanGlyph,
  nas: NasGlyph,
  vdisk: VdiskGlyph,
  raid: RaidGlyph,
  "disk-array": DiskArrayGlyph,
  lun: LunGlyph,
  volume: VolumeGlyph,
  vswitch: VSwitchGlyph,
  vnic: VnicGlyph,
  vlan: VlanGlyph,
  firewall: FirewallGlyph,
  "load-balancer": LoadBalancerGlyph,
  router: RouterGlyph,
  uplink: UplinkGlyph
};
var custom = /* @__PURE__ */ new Map();
function registerObjectKind(kind, icon) {
  custom.set(kind, icon);
}
var running = { Icon: Play, tone: "text-ok", fill: "bg-ok", text: "stateRunning", base: "normal" };
var paused = { Icon: Pause, tone: "text-warn", fill: "bg-warn", text: "statePaused", base: "normal" };
var stopped = { Icon: Square, tone: "text-subtle", fill: "bg-muted", text: "stateStopped", base: "dim" };
var objectStateMeta = {
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
  error: { Icon: CircleX, tone: "text-danger", fill: "bg-danger", text: "stateError", base: "normal" }
};
var baseTone = {
  normal: "text-muted",
  dim: "text-subtle",
  faded: "text-subtle",
  danger: "text-danger"
};
function StateBadge({ state, px, className }) {
  const m = objectStateMeta[state];
  const size = Math.round(px * 0.8);
  const filled = state === "running" || state === "on" || state === "crashed";
  return /* @__PURE__ */ jsx(
    m.Icon,
    {
      "aria-hidden": true,
      "data-badge": state,
      width: size,
      height: size,
      strokeWidth: 2.75,
      fill: filled ? "currentColor" : "none",
      className: cn("absolute", m.tone, className)
    }
  );
}
function ObjectIcon({ kind, state, overlay, size = 16, label, className }) {
  const { t } = useLaf();
  const Icon = custom.get(kind) ?? baseKinds[kind] ?? Cable;
  const meta = state ? objectStateMeta[state] : void 0;
  const stateText = [state, overlay].filter((x) => !!x).map((x) => t[objectStateMeta[x].text]).join(", ");
  const name = [label, stateText].filter(Boolean).join(", ");
  const px = size === 20 ? 20 : 16;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "data-kind": kind,
      "data-state": state,
      "data-overlay": overlay,
      role: name ? "img" : void 0,
      "aria-label": name || void 0,
      "aria-hidden": name ? void 0 : true,
      className: cn("relative inline-flex shrink-0 items-center justify-center", meta ? baseTone[meta.base] : "text-muted", className),
      style: { width: px, height: px },
      children: [
        /* @__PURE__ */ jsx(Icon, { width: px, height: px, "aria-hidden": true, className: meta?.base === "dim" ? "opacity-70" : meta?.base === "faded" ? "opacity-50" : void 0 }),
        state && /* @__PURE__ */ jsx(StateBadge, { state, px, className: "-end-1 -bottom-1" }),
        overlay && /* @__PURE__ */ jsx(StateBadge, { state: overlay, px, className: "-end-1 -top-1" })
      ]
    }
  );
}
var objectKinds = Object.keys(baseKinds);

export { ClusterGlyph, DatacenterGlyph, DiskArrayGlyph, FirewallGlyph, HddGlyph, IscsiGlyph, LoadBalancerGlyph, LunGlyph, NasGlyph, NfsGlyph, NvmeGlyph, ObjectIcon, RaidGlyph, RouterGlyph, SanGlyph, ServerGlyph, SsdGlyph, StateBadge, TemplateGlyph, UplinkGlyph, VSwitchGlyph, VdiskGlyph, VlanGlyph, VmGlyph, VnicGlyph, VolumeGlyph, VpnGlyph, glyph, objectKinds, objectStateMeta, objectStates, registerObjectKind };
//# sourceMappingURL=chunk-6EDG7MDV.js.map
//# sourceMappingURL=chunk-6EDG7MDV.js.map