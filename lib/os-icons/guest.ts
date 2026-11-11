import type { OsId } from "./registry";

/** First match wins, so more specific names come before their parents (openSUSE before SUSE, Oracle Linux before generic Linux). */
const RULES: readonly (readonly [RegExp, OsId])[] = [
  [/freebsd/, "freebsd"],
  [/openbsd/, "openbsd"],
  [/netbsd/, "netbsd"],
  [/solaris|sunos|illumos/, "solaris"],
  [/darwin|mac ?os|\bos ?x\b|\bapple\b/, "macos"],
  [/^win|windows/, "windows"],
  [/android/, "android"],
  [/photon/, "photon"],
  [/vmkernel|\besxi?\b|vmware/, "esxi"],
  [/proxmox|\bpve\b/, "proxmox"],
  [/ovirt|\brhv\b/, "ovirt"],
  [/docker/, "docker"],
  [/kubernetes|\bk8s\b/, "kubernetes"],
  [/ubuntu/, "ubuntu"],
  [/kali/, "kali"],
  [/debian/, "debian"],
  [/linux ?mint|\bmint\b/, "mint"],
  [/manjaro/, "manjaro"],
  [/\barch(?: ?linux)?\b|archlinux/, "arch"],
  [/alpine/, "alpine"],
  [/gentoo/, "gentoo"],
  [/nixos/, "nixos"],
  [/oracle ?linux|\bol\d/, "oracle-linux"],
  [/amazon ?linux|amzn/, "amazon-linux"],
  [/rocky/, "rocky"],
  [/alma/, "almalinux"],
  [/centos/, "centos"],
  [/fedora/, "fedora"],
  [/opensuse/, "opensuse"],
  [/sles|sled|suse/, "suse"],
  [/rhel|red ?hat/, "rhel"],
  [/linux|coreos|asianux|mandriva|turbolinux/, "linux"],
];

/**
 * Maps a vSphere guest ID (`ubuntu64Guest`, `rhel9_64Guest`, `windows9Guest`, …) or a free-form OS name
 * (`Ubuntu 22.04 LTS`, `Microsoft Windows 10 (64-bit)`) to an {@link OsId}; `"unknown"` when nothing matches.
 */
export function guestOsToId(guestId: string | null | undefined): OsId {
  const s = (guestId ?? "").trim().toLowerCase();
  if (!s) return "unknown";
  for (const [re, id] of RULES) if (re.test(s)) return id;
  return "unknown";
}
