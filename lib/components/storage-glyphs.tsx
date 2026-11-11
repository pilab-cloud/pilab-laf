import * as React from "react";
import { glyph } from "./object-glyphs";

/** Original storage and network glyphs in the same 24×24 stroke style as the object glyphs; legible at 16 and 20 px. */

const DASH = "3 2.2";

/** Cylinder body shared by volume-like glyphs. */
const CYL = (
  <>
    <ellipse cx="12" cy="5.5" rx="8" ry="3" />
    <path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" />
  </>
);

/** Solid-state drive: a board with a controller chip and a status LED. */
export const SsdGlyph = glyph(
  "SsdGlyph",
  <>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <rect x="6.5" y="9" width="6" height="6" rx="1" strokeWidth="1.5" />
    <path d="M17 9.5h.01M17 14.5h.01" />
  </>,
);

/** Hard disk drive: a platter with its spindle and the actuator arm. */
export const HddGlyph = glyph(
  "HddGlyph",
  <>
    <rect x="3" y="3.5" width="18" height="17" rx="2" />
    <circle cx="11" cy="11.5" r="4.5" strokeWidth="1.5" />
    <path d="M11 11.5h.01M17.5 17h.01M15 14.5l2.5 2.5" />
  </>,
);

/** NVMe drive: an M.2 stick with a connector notch and a bolt. */
export const NvmeGlyph = glyph(
  "NvmeGlyph",
  <>
    <rect x="5" y="6.5" width="16.5" height="11" rx="1.5" />
    <path d="M2 9.5v5M13.5 9.5l-3 3h4l-3 3" />
  </>,
);

/** iSCSI target: a disk reached over an IP network. */
export const IscsiGlyph = glyph(
  "IscsiGlyph",
  <>
    <ellipse cx="12" cy="5" rx="6" ry="2.2" />
    <path d="M6 5v6c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V5" />
    <path d="M12 13.2V17M4.5 17h15M4.5 17v3.5M12 17v3.5M19.5 17v3.5" />
  </>,
);

/** SAN: hosts, a fibre-channel switch and an array. */
export const SanGlyph = glyph(
  "SanGlyph",
  <>
    <rect x="2.5" y="2.5" width="6" height="5" rx="1" />
    <rect x="15.5" y="2.5" width="6" height="5" rx="1" />
    <rect x="7" y="10" width="10" height="4" rx="1" />
    <rect x="4" y="17.5" width="16" height="4" rx="1" />
    <path d="M5.5 7.5V12H7M18.5 7.5V12H17M12 14v3.5M7.5 19.5h.01" />
  </>,
);

/** NAS: a two-bay enclosure with handles and activity LEDs. */
export const NasGlyph = glyph(
  "NasGlyph",
  <>
    <rect x="2.5" y="3" width="19" height="18" rx="2" />
    <path d="M12 3v18M7.25 7v5M16.75 7v5M7.25 17.5h.01M16.75 17.5h.01" />
  </>,
);

/** NFS export: a shared folder with network nodes. */
export const NfsGlyph = glyph(
  "NfsGlyph",
  <>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    <path d="M12 10v3M8 17v-4h8v4" strokeWidth="1.5" />
  </>,
);

/** Virtual disk: a dashed disk with a cube. */
export const VdiskGlyph = glyph(
  "VdiskGlyph",
  <>
    <g strokeDasharray={DASH}>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" />
    </g>
    <path d="M12 10.6 15 12.3v3.4L12 17.4 9 15.7v-3.4zM12 14l3-1.7M12 14l-3-1.7M12 14v3.4" strokeWidth="1.5" />
  </>,
);

/** Disk array: two stacked enclosures with drive bays. */
export const DiskArrayGlyph = glyph(
  "DiskArrayGlyph",
  <>
    <rect x="2.5" y="3" width="19" height="8" rx="1.5" />
    <rect x="2.5" y="13" width="19" height="8" rx="1.5" />
    <path d="M6.5 6v2M10 6v2M13.5 6v2M17 6v2M6.5 16v2M10 16v2M13.5 16v2M17 16v2" strokeWidth="1.5" />
  </>,
);

/** LUN: one slice carved out of a storage pool. */
export const LunGlyph = glyph(
  "LunGlyph",
  <>
    <rect x="3" y="3.5" width="18" height="17" rx="2" />
    <path d="M3 9.2h18M3 14.8h18" />
    <path d="M7 12h.01M11 12h6" />
  </>,
);

/** Volume: a cylinder with a partition band. */
export const VolumeGlyph = glyph(
  "VolumeGlyph",
  <>
    {CYL}
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </>,
);

type RaidLevel = 0 | 1 | 5 | 6 | 10;

/** Evenly spaced drive bars between x=2.5 and x=21.5. */
function drives(n: number, top: number, height: number) {
  const gap = n === 2 ? 3 : 2;
  const w = (19 - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ x: 2.5 + i * (w + gap), w }))
    .map((d) => <rect key={d.x} x={d.x} y={top} width={d.w} height={height} rx="1" />);
}

const RAID_DRAWINGS: Record<RaidLevel | "default", React.ReactNode> = {
  default: <>{drives(3, 4, 16)}<path d="M5.5 16.5h.01M12 16.5h.01M18.5 16.5h.01" /></>,
  0: <>{drives(2, 4, 16)}<path d="M5 9h6M13 9h6M5 13h6M13 13h6" strokeWidth="1.5" /></>,
  1: <>{drives(2, 3, 12)}<path d="M6.5 15v5.5h11V15M12 20.5V23" strokeWidth="1.5" /></>,
  5: <>{drives(3, 4, 16)}<path d="M5.5 8h.01M12 12h.01M18.5 16h.01" /></>,
  6: <>{drives(4, 4, 16)}<path d="M4.5 8h.01M9.5 11h.01M14.5 14h.01M19.5 17h.01M4.5 17h.01M19.5 8h.01" strokeWidth="1.5" /></>,
  10: <>{drives(4, 7, 14)}<path d="M4.5 4.5h6v2.5M13.5 7V4.5h6" strokeWidth="1.5" /></>,
};

export interface RaidGlyphProps extends React.SVGProps<SVGSVGElement> {
  /** RAID level; each level has its own drive-bar drawing. Omit for the generic RAID set. */
  level?: RaidLevel;
}

/** RAID set: drive bars, drawn per level (0 striped, 1 mirrored, 5/6 distributed parity, 10 mirrored pairs). */
export const RaidGlyph: React.FC<RaidGlyphProps> = ({ level, strokeWidth = 2, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" data-raid-level={level} {...props}>
    {RAID_DRAWINGS[level ?? "default"]}
  </svg>
);
RaidGlyph.displayName = "RaidGlyph";

/** Virtual switch: a dashed switch with vNIC ports up and an uplink down. */
export const VSwitchGlyph = glyph(
  "VSwitchGlyph",
  <>
    <rect x="2.5" y="8.5" width="19" height="7" rx="1.5" strokeDasharray={DASH} />
    <path d="M6.5 12h.01M10 12h.01M14 12h.01M17.5 12h.01" />
    <path d="M7 8.5v-5M12 8.5v-5M17 8.5v-5M12 15.5v5" />
  </>,
);

/** Virtual NIC: a dashed adapter card with a port and edge connector. */
export const VnicGlyph = glyph(
  "VnicGlyph",
  <>
    <rect x="3.5" y="3.5" width="17" height="12" rx="1.5" strokeDasharray={DASH} />
    <rect x="8" y="7" width="8" height="4.5" rx=".75" strokeWidth="1.5" />
    <path d="M7.5 15.5v5M12 15.5v5M16.5 15.5v5" />
  </>,
);

/** VLAN: a trunk fanning out into separate lanes. */
export const VlanGlyph = glyph(
  "VlanGlyph",
  <>
    <path d="M2.5 12H7M7 12l4-6.5h8M7 12h12M7 12l4 6.5h8" />
    <path d="M21.5 5.5h.01M21.5 12h.01M21.5 18.5h.01" />
  </>,
);

/** Firewall: a brick wall. */
export const FirewallGlyph = glyph(
  "FirewallGlyph",
  <>
    <rect x="3" y="3.5" width="18" height="17" rx="1.5" />
    <path d="M3 9.2h18M3 14.8h18M12 3.5v5.7M7.5 9.2v5.6M16.5 9.2v5.6M12 14.8v5.7" />
  </>,
);

/** Load balancer: one entry point spreading to three targets. */
export const LoadBalancerGlyph = glyph(
  "LoadBalancerGlyph",
  <>
    <rect x="8.5" y="2.5" width="7" height="4.5" rx="1" />
    <path d="M12 7v3.5M5 14V10.5h14V14" />
    <rect x="2.5" y="14" width="5" height="5.5" rx="1" />
    <rect x="9.5" y="14" width="5" height="5.5" rx="1" />
    <rect x="16.5" y="14" width="5" height="5.5" rx="1" />
  </>,
);

/** Router: four arrows leaving a hub. */
export const RouterGlyph = glyph(
  "RouterGlyph",
  <>
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 9.5V3M9.5 5.5 12 3l2.5 2.5M12 14.5V21M9.5 18.5 12 21l2.5-2.5M9.5 12H3M5.5 9.5 3 12l2.5 2.5M14.5 12H21M18.5 9.5 21 12l-2.5 2.5" />
  </>,
);

/** Uplink: an arrow leaving a physical port. */
export const UplinkGlyph = glyph(
  "UplinkGlyph",
  <>
    <path d="M12 13.5V3M7.5 7.5 12 3l4.5 4.5" />
    <rect x="3.5" y="14.5" width="17" height="6" rx="1.5" />
    <path d="M8 17.5h.01M12 17.5h.01M16 17.5h.01" />
  </>,
);

/** VPN: a padlock with a tunnel on each side. */
export const VpnGlyph = glyph(
  "VpnGlyph",
  <>
    <rect x="6" y="11" width="12" height="9.5" rx="2" />
    <path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3M12 15v2M1.5 15.7H6M18 15.7h4.5" />
  </>,
);
