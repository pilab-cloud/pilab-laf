import {
  siAlmalinux,
  siAlpinelinux,
  siAndroid,
  siApple,
  siArchlinux,
  siCentos,
  siDebian,
  siDocker,
  siFedora,
  siFreebsd,
  siGentoo,
  siKalilinux,
  siKubernetes,
  siLinux,
  siLinuxmint,
  siManjaro,
  siNetbsd,
  siNixos,
  siOpenbsd,
  siOpensuse,
  siProxmox,
  siRedhat,
  siRockylinux,
  siSuse,
  siUbuntu,
  siVmware,
} from "simple-icons";
import { glyph, type ObjectGlyph } from "../components/object-glyphs";

export type OsFamily = "linux" | "bsd" | "windows" | "apple" | "unix" | "mobile" | "hypervisor" | "container" | "other";

/**
 * Neutral stand-ins for systems whose brand mark is not in simple-icons: generic drawings in the
 * kit's stroke style, never a reproduction of the real logo.
 */
const WindowsGlyph = glyph(
  "WindowsGlyph",
  <>
    <rect x="3" y="3.5" width="8" height="8" rx="1" />
    <rect x="13" y="3.5" width="8" height="8" rx="1" />
    <rect x="3" y="13.5" width="8" height="7" rx="1" />
    <rect x="13" y="13.5" width="8" height="7" rx="1" />
  </>,
);
const OracleLinuxGlyph = glyph(
  "OracleLinuxGlyph",
  <>
    <rect x="3" y="7" width="18" height="10" rx="5" />
    <path d="M9 9.5v5h4.5" />
  </>,
);
const AmazonLinuxGlyph = glyph("AmazonLinuxGlyph", <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" />);
const SolarisGlyph = glyph(
  "SolarisGlyph",
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
  </>,
);
const OvirtGlyph = glyph(
  "OvirtGlyph",
  <>
    <rect x="3" y="4" width="18" height="7" rx="1.5" />
    <rect x="3" y="13" width="18" height="7" rx="1.5" />
    <path d="M7 7.5h.01M7 16.5h.01M12 7.5h5M12 16.5h5" />
  </>,
);
/** Fallback for anything unrecognised: a plain window with a question mark. */
const UnknownOsGlyph = glyph(
  "UnknownOsGlyph",
  <>
    <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
    <path d="M2.5 8.5h19M9.5 12.8a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.7M12 18.5h.01" />
  </>,
);

export const osIds = [
  "ubuntu",
  "debian",
  "arch",
  "freebsd",
  "kali",
  "rhel",
  "centos",
  "almalinux",
  "rocky",
  "fedora",
  "mint",
  "opensuse",
  "suse",
  "alpine",
  "gentoo",
  "nixos",
  "manjaro",
  "oracle-linux",
  "amazon-linux",
  "linux",
  "windows",
  "macos",
  "android",
  "openbsd",
  "netbsd",
  "solaris",
  "esxi",
  "photon",
  "proxmox",
  "ovirt",
  "docker",
  "kubernetes",
  "unknown",
] as const;

export type OsId = (typeof osIds)[number];

/** A brand mark (simple-icons path + official hex, supplied by the package) or a neutral stroke glyph. */
export type OsArt = { path: string; hex: string } | { glyph: ObjectGlyph };

export interface OsEntry {
  id: OsId;
  name: string;
  family: OsFamily;
  aliases: readonly string[];
  art: OsArt;
}

const brand = (i: { path: string; hex: string }): OsArt => ({ path: i.path, hex: i.hex });
const generic = (g: ObjectGlyph): OsArt => ({ glyph: g });

export const osIcons: Record<OsId, OsEntry> = {
  ubuntu: { id: "ubuntu", name: "Ubuntu", family: "linux", aliases: ["canonical"], art: brand(siUbuntu) },
  debian: { id: "debian", name: "Debian", family: "linux", aliases: ["debian gnu/linux"], art: brand(siDebian) },
  arch: { id: "arch", name: "Arch Linux", family: "linux", aliases: ["archlinux"], art: brand(siArchlinux) },
  freebsd: { id: "freebsd", name: "FreeBSD", family: "bsd", aliases: [], art: brand(siFreebsd) },
  kali: { id: "kali", name: "Kali Linux", family: "linux", aliases: ["kalilinux"], art: brand(siKalilinux) },
  rhel: { id: "rhel", name: "Red Hat Enterprise Linux", family: "linux", aliases: ["rhel", "red hat", "redhat"], art: brand(siRedhat) },
  centos: { id: "centos", name: "CentOS", family: "linux", aliases: ["centos stream"], art: brand(siCentos) },
  almalinux: { id: "almalinux", name: "AlmaLinux", family: "linux", aliases: ["alma"], art: brand(siAlmalinux) },
  rocky: { id: "rocky", name: "Rocky Linux", family: "linux", aliases: ["rockylinux"], art: brand(siRockylinux) },
  fedora: { id: "fedora", name: "Fedora", family: "linux", aliases: [], art: brand(siFedora) },
  mint: { id: "mint", name: "Linux Mint", family: "linux", aliases: ["linuxmint"], art: brand(siLinuxmint) },
  opensuse: { id: "opensuse", name: "openSUSE", family: "linux", aliases: ["leap", "tumbleweed"], art: brand(siOpensuse) },
  suse: { id: "suse", name: "SUSE Linux Enterprise", family: "linux", aliases: ["sles", "sled"], art: brand(siSuse) },
  alpine: { id: "alpine", name: "Alpine Linux", family: "linux", aliases: ["alpinelinux"], art: brand(siAlpinelinux) },
  gentoo: { id: "gentoo", name: "Gentoo", family: "linux", aliases: [], art: brand(siGentoo) },
  nixos: { id: "nixos", name: "NixOS", family: "linux", aliases: ["nix"], art: brand(siNixos) },
  manjaro: { id: "manjaro", name: "Manjaro", family: "linux", aliases: [], art: brand(siManjaro) },
  "oracle-linux": { id: "oracle-linux", name: "Oracle Linux", family: "linux", aliases: ["oraclelinux", "ol"], art: generic(OracleLinuxGlyph) },
  "amazon-linux": { id: "amazon-linux", name: "Amazon Linux", family: "linux", aliases: ["amazonlinux", "amzn"], art: generic(AmazonLinuxGlyph) },
  linux: { id: "linux", name: "Linux", family: "linux", aliases: ["gnu/linux", "tux"], art: brand(siLinux) },
  windows: { id: "windows", name: "Windows", family: "windows", aliases: ["microsoft windows", "win"], art: generic(WindowsGlyph) },
  macos: { id: "macos", name: "macOS", family: "apple", aliases: ["mac os x", "os x", "darwin", "apple"], art: brand(siApple) },
  android: { id: "android", name: "Android", family: "mobile", aliases: [], art: brand(siAndroid) },
  openbsd: { id: "openbsd", name: "OpenBSD", family: "bsd", aliases: [], art: brand(siOpenbsd) },
  netbsd: { id: "netbsd", name: "NetBSD", family: "bsd", aliases: [], art: brand(siNetbsd) },
  solaris: { id: "solaris", name: "Solaris", family: "unix", aliases: ["sunos", "illumos"], art: generic(SolarisGlyph) },
  esxi: { id: "esxi", name: "VMware ESXi", family: "hypervisor", aliases: ["esx", "vmkernel", "vmware"], art: brand(siVmware) },
  photon: { id: "photon", name: "VMware Photon OS", family: "linux", aliases: ["photon os"], art: brand(siVmware) },
  proxmox: { id: "proxmox", name: "Proxmox VE", family: "hypervisor", aliases: ["pve"], art: brand(siProxmox) },
  ovirt: { id: "ovirt", name: "oVirt", family: "hypervisor", aliases: ["rhv"], art: generic(OvirtGlyph) },
  docker: { id: "docker", name: "Docker", family: "container", aliases: ["container"], art: brand(siDocker) },
  kubernetes: { id: "kubernetes", name: "Kubernetes", family: "container", aliases: ["k8s"], art: brand(siKubernetes) },
  unknown: { id: "unknown", name: "Unknown OS", family: "other", aliases: ["other"], art: generic(UnknownOsGlyph) },
};

export interface OsListItem {
  id: OsId;
  name: string;
  family: OsFamily;
  aliases: readonly string[];
}

/** Every known OS as plain data for pickers and galleries. */
export const osList: readonly OsListItem[] = osIds.map((id) => ({ id, name: osIcons[id].name, family: osIcons[id].family, aliases: osIcons[id].aliases }));
