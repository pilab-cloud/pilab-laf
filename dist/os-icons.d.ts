import * as React from 'react';
import { b as ObjectGlyph, a as ObjectState } from './object-icon-BJ0r6e2e.js';
import 'lucide-react';
import './i18n-D7-T2u5f.js';
import './perf-panel-BIwzrNjF.js';
import './chart-motion-BTO5GOqJ.js';
import './vsphere-objects-CWkhU0R6.js';

type OsFamily = "linux" | "bsd" | "windows" | "apple" | "unix" | "mobile" | "hypervisor" | "container" | "other";
declare const osIds: readonly ["ubuntu", "debian", "arch", "freebsd", "kali", "rhel", "centos", "almalinux", "rocky", "fedora", "mint", "opensuse", "suse", "alpine", "gentoo", "nixos", "manjaro", "oracle-linux", "amazon-linux", "linux", "windows", "macos", "android", "openbsd", "netbsd", "solaris", "esxi", "photon", "proxmox", "ovirt", "docker", "kubernetes", "unknown"];
type OsId = (typeof osIds)[number];
/** A brand mark (simple-icons path + official hex, supplied by the package) or a neutral stroke glyph. */
type OsArt = {
    path: string;
    hex: string;
} | {
    glyph: ObjectGlyph;
};
interface OsEntry {
    id: OsId;
    name: string;
    family: OsFamily;
    aliases: readonly string[];
    art: OsArt;
}
declare const osIcons: Record<OsId, OsEntry>;
interface OsListItem {
    id: OsId;
    name: string;
    family: OsFamily;
    aliases: readonly string[];
}
/** Every known OS as plain data for pickers and galleries. */
declare const osList: readonly OsListItem[];

interface OsIconProps {
    /** An {@link OsId}, a vSphere guest ID or a free-form OS name; anything unrecognised renders the generic glyph. */
    os: OsId | (string & {}) | null | undefined;
    size?: number;
    /** `brand` paints the official colour, `mono` follows `currentColor`. */
    variant?: "brand" | "mono";
    /** Accessible name; without it the icon is decorative (aria-hidden). */
    label?: string;
    className?: string;
}
declare function resolveOsId(os: string | null | undefined): OsId;
/** Operating-system logo for a VM guest OS. */
declare function OsIcon({ os, size, variant, label, className }: OsIconProps): React.JSX.Element;
interface VmOsIconProps extends Omit<OsIconProps, "label"> {
    state?: ObjectState;
    /** Second badge on the opposite corner, as on `ObjectIcon`. */
    overlay?: ObjectState;
    /** Accessible name of the VM; the state texts are appended. Without a label and state the icon is decorative. */
    label?: string;
}
/** OS logo with the `ObjectIcon` state badges, for VM rows in trees and lists. */
declare function VmOsIcon({ os, size, variant, state, overlay, label, className }: VmOsIconProps): React.JSX.Element;

/**
 * Maps a vSphere guest ID (`ubuntu64Guest`, `rhel9_64Guest`, `windows9Guest`, …) or a free-form OS name
 * (`Ubuntu 22.04 LTS`, `Microsoft Windows 10 (64-bit)`) to an {@link OsId}; `"unknown"` when nothing matches.
 */
declare function guestOsToId(guestId: string | null | undefined): OsId;

export { type OsEntry, type OsFamily, OsIcon, type OsIconProps, type OsId, type OsListItem, VmOsIcon, type VmOsIconProps, guestOsToId, osIcons, osIds, osList, resolveOsId };
