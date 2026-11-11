import { glyph, objectStateMeta, StateBadge } from './chunk-6EDG7MDV.js';
import { useLaf } from './chunk-PTV6E3H5.js';
import { cn } from './chunk-3TRXGDSZ.js';
import { siKubernetes, siDocker, siProxmox, siVmware, siNetbsd, siOpenbsd, siAndroid, siApple, siLinux, siManjaro, siNixos, siGentoo, siAlpinelinux, siSuse, siOpensuse, siLinuxmint, siFedora, siRockylinux, siAlmalinux, siCentos, siRedhat, siKalilinux, siFreebsd, siArchlinux, siDebian, siUbuntu } from 'simple-icons';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

// lib/os-icons/guest.ts
var RULES = [
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
  [/linux|coreos|asianux|mandriva|turbolinux/, "linux"]
];
function guestOsToId(guestId) {
  const s = (guestId ?? "").trim().toLowerCase();
  if (!s) return "unknown";
  for (const [re, id] of RULES) if (re.test(s)) return id;
  return "unknown";
}
var WindowsGlyph = glyph(
  "WindowsGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "3", y: "3.5", width: "8", height: "8", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "13", y: "3.5", width: "8", height: "8", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "3", y: "13.5", width: "8", height: "7", rx: "1" }),
    /* @__PURE__ */ jsx("rect", { x: "13", y: "13.5", width: "8", height: "7", rx: "1" })
  ] })
);
var OracleLinuxGlyph = glyph(
  "OracleLinuxGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "3", y: "7", width: "18", height: "10", rx: "5" }),
    /* @__PURE__ */ jsx("path", { d: "M9 9.5v5h4.5" })
  ] })
);
var AmazonLinuxGlyph = glyph("AmazonLinuxGlyph", /* @__PURE__ */ jsx("path", { d: "M12 3 20 7.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" }));
var SolarisGlyph = glyph(
  "SolarisGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ jsx("path", { d: "M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" })
  ] })
);
var OvirtGlyph = glyph(
  "OvirtGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "3", y: "4", width: "18", height: "7", rx: "1.5" }),
    /* @__PURE__ */ jsx("rect", { x: "3", y: "13", width: "18", height: "7", rx: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M7 7.5h.01M7 16.5h.01M12 7.5h5M12 16.5h5" })
  ] })
);
var UnknownOsGlyph = glyph(
  "UnknownOsGlyph",
  /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "3.5", width: "19", height: "17", rx: "2" }),
    /* @__PURE__ */ jsx("path", { d: "M2.5 8.5h19M9.5 12.8a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.7M12 18.5h.01" })
  ] })
);
var osIds = [
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
  "unknown"
];
var brand = (i) => ({ path: i.path, hex: i.hex });
var generic = (g) => ({ glyph: g });
var osIcons = {
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
  unknown: { id: "unknown", name: "Unknown OS", family: "other", aliases: ["other"], art: generic(UnknownOsGlyph) }
};
var osList = osIds.map((id) => ({ id, name: osIcons[id].name, family: osIcons[id].family, aliases: osIcons[id].aliases }));
function resolveOsId(os) {
  return os && Object.prototype.hasOwnProperty.call(osIcons, os) ? os : guestOsToId(os);
}
function luminance(hex) {
  const c = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function OsIcon({ os, size = 16, variant = "brand", label, className }) {
  const id = resolveOsId(os);
  const { art } = osIcons[id];
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  if ("glyph" in art) {
    const G = art.glyph;
    return /* @__PURE__ */ jsx(G, { "data-os": id, "data-variant": variant, width: size, height: size, className: cn("shrink-0 text-muted", className), ...a11y });
  }
  const brand2 = variant === "brand";
  const themed = !brand2 || luminance(art.hex) < 0.06;
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "data-os": id,
      "data-variant": variant,
      width: size,
      height: size,
      className: cn("shrink-0", brand2 ? themed ? "text-fg" : void 0 : "text-muted", className),
      style: brand2 && !themed ? { color: `#${art.hex}` } : void 0,
      ...a11y,
      children: /* @__PURE__ */ jsx("path", { d: art.path })
    }
  );
}
function VmOsIcon({ os, size = 16, variant = "brand", state, overlay, label, className }) {
  const { t } = useLaf();
  const stateText = [state, overlay].filter((x) => !!x).map((x) => t[objectStateMeta[x].text]).join(", ");
  const name = [label, stateText].filter(Boolean).join(", ");
  const meta = state ? objectStateMeta[state] : void 0;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      "data-state": state,
      "data-overlay": overlay,
      role: name ? "img" : void 0,
      "aria-label": name || void 0,
      "aria-hidden": name ? void 0 : true,
      className: cn("relative inline-flex shrink-0 items-center justify-center", className),
      style: { width: size, height: size },
      children: [
        /* @__PURE__ */ jsx(OsIcon, { os, size, variant, className: meta?.base === "dim" ? "opacity-70" : meta?.base === "faded" ? "opacity-50" : void 0 }),
        state && /* @__PURE__ */ jsx(StateBadge, { state, px: size, className: "-end-1 -bottom-1" }),
        overlay && /* @__PURE__ */ jsx(StateBadge, { state: overlay, px: size, className: "-end-1 -top-1" })
      ]
    }
  );
}

export { OsIcon, VmOsIcon, guestOsToId, osIcons, osIds, osList, resolveOsId };
//# sourceMappingURL=os-icons.js.map
//# sourceMappingURL=os-icons.js.map