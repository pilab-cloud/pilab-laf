# Icon kit

Gallery: `?demo=vs-objects` (object kinds, states) and `?demo=os-icons` (operating systems, RAID levels).

## `ObjectIcon` kinds (core)

`datacenter`, `cluster`, `host`, `vm`, `template`, `vapp`, `folder`, `resource-pool`, `datastore`, `datastore-cluster`, `network`, `dvswitch`, `portgroup`, `snapshot`, `user`, `group`, `client`, `issue`, `project`, `mailbox`, `shared-mailbox`, `domain`, `mail-queue`, `repository`, `token`, `policy`,
and the storage/network kinds `ssd`, `hdd`, `nvme`, `iscsi`, `san`, `nas`, `vdisk`, `raid`, `disk-array`, `lun`, `volume`, `vswitch`, `vnic`, `vlan`, `firewall`, `load-balancer`, `router`, `uplink`.

Custom glyphs (24×24, `currentColor`, stroke 2, round caps; drawn to stay legible at 16 and 20 px):
`VmGlyph`, `TemplateGlyph`, `ServerGlyph`, `ClusterGlyph`, `DatacenterGlyph`, `SsdGlyph`, `HddGlyph`, `NvmeGlyph`, `IscsiGlyph`, `SanGlyph`, `NasGlyph`, `NfsGlyph`, `VdiskGlyph`, `RaidGlyph` (`level` 0, 1, 5, 6, 10), `DiskArrayGlyph`, `LunGlyph`, `VolumeGlyph`, `VSwitchGlyph`, `VnicGlyph`, `VlanGlyph`, `FirewallGlyph`, `LoadBalancerGlyph`, `RouterGlyph`, `UplinkGlyph`, `VpnGlyph`.
`NfsGlyph` and `VpnGlyph` are exported but not registered as kinds; use `registerObjectKind("nfs", NfsGlyph)` if you need them.

## Operating systems — `@pilab/laf/os-icons`

```tsx
import { OsIcon, VmOsIcon, guestOsToId } from "@pilab/laf/os-icons";

<OsIcon os="ubuntu64Guest" />                       // decorative, brand colour
<OsIcon os="Microsoft Windows 10 (64-bit)" variant="mono" label="Windows 10" />
<VmOsIcon os={vm.guestId} state="running" label={vm.name} />
guestOsToId("rhel9_64Guest"); // "rhel"
```

- `os` accepts an id, a vSphere guest ID or a free-form name; unrecognised values render the `unknown` glyph.
- `variant="brand"` (default) paints the official colour; near-black marks (Apple, AlmaLinux, …) use the theme foreground so they stay visible on dark themes. `variant="mono"` follows `currentColor` (`text-muted` by default).
- Decorative (`aria-hidden`) unless `label` is set (`role="img"`).
- `osList` (`{id, name, family, aliases}`), `osIcons` (id → entry), `osIds`.

Ids: `ubuntu`, `debian`, `arch`, `freebsd`, `kali`, `rhel`, `centos`, `almalinux`, `rocky`, `fedora`, `mint`, `opensuse`, `suse`, `alpine`, `gentoo`, `nixos`, `manjaro`, `oracle-linux`, `amazon-linux`, `linux`, `windows`, `macos`, `android`, `openbsd`, `netbsd`, `solaris`, `esxi`, `photon`, `proxmox`, `ovirt`, `docker`, `kubernetes`, `unknown`.

Generic stand-in glyphs (no brand mark available in simple-icons): `windows`, `oracle-linux`, `amazon-linux`, `solaris`, `ovirt`, `unknown`. `esxi` and `photon` use the VMware mark; `macos` the Apple mark; `rhel` the Red Hat mark.

### Colours and size

Brand hex colours are the only colour exception in the kit, and they are scoped to `lib/os-icons`: they come from the `simple-icons` data at runtime, so there is no hex literal in source (`tests/rules.test.ts` enforces that for `lib/os-icons` and `lib/components`). The entry has its own bundle budget (`tests/treeshake.test.ts`); only the named marks are imported, and the core bundle never contains them.

### Licensing

Logo path data comes from [`simple-icons`](https://simpleicons.org) (CC0 1.0). The logos and names are trademarks of their respective owners; their use here only identifies the guest operating system and implies no endorsement. Generic glyphs are original drawings, not reproductions of any logo.
