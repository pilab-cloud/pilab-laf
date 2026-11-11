import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import {
  DiskArrayGlyph,
  FirewallGlyph,
  HddGlyph,
  IscsiGlyph,
  LoadBalancerGlyph,
  LunGlyph,
  NasGlyph,
  NfsGlyph,
  NvmeGlyph,
  objectKinds,
  ObjectIcon,
  RaidGlyph,
  RouterGlyph,
  SanGlyph,
  SsdGlyph,
  UplinkGlyph,
  VdiskGlyph,
  VlanGlyph,
  VnicGlyph,
  VolumeGlyph,
  VpnGlyph,
  VSwitchGlyph,
} from "../lib";
import { guestOsToId, OsIcon, osIcons, osIds, osList, VmOsIcon } from "../lib/os-icons";

describe("guestOsToId", () => {
  it.each([
    ["ubuntu64Guest", "ubuntu"],
    ["ubuntuGuest", "ubuntu"],
    ["debian11_64Guest", "debian"],
    ["rhel9_64Guest", "rhel"],
    ["centos8_64Guest", "centos"],
    ["almalinux_64Guest", "almalinux"],
    ["rockylinux_64Guest", "rocky"],
    ["fedora64Guest", "fedora"],
    ["oracleLinux8_64Guest", "oracle-linux"],
    ["amazonlinux3_64Guest", "amazon-linux"],
    ["opensuse64Guest", "opensuse"],
    ["sles15_64Guest", "suse"],
    ["windows9Guest", "windows"],
    ["windows2019srv_next_64Guest", "windows"],
    ["winXPProGuest", "windows"],
    ["darwin20_64Guest", "macos"],
    ["freebsd64Guest", "freebsd"],
    ["solaris11_64Guest", "solaris"],
    ["vmwarePhoton64Guest", "photon"],
    ["vmkernel7Guest", "esxi"],
    ["other4xLinux64Guest", "linux"],
    ["coreos64Guest", "linux"],
    ["otherGuest64", "unknown"],
    ["Ubuntu 22.04 LTS", "ubuntu"],
    ["Microsoft Windows 10 (64-bit)", "windows"],
    ["Red Hat Enterprise Linux 9", "rhel"],
    ["Linux Mint 21", "mint"],
    ["Arch Linux", "arch"],
    ["macOS 14 Sonoma", "macos"],
    ["", "unknown"],
    ["something else", "unknown"],
  ])("%s → %s", (input, id) => {
    expect(guestOsToId(input)).toBe(id);
  });

  it("maps every registry id and alias back onto a known id", () => {
    for (const id of osIds) expect(osIcons[id].id).toBe(id);
    expect(osList.map((o) => o.id)).toEqual([...osIds]);
    expect(guestOsToId(null)).toBe("unknown");
  });
});

describe("OsIcon", () => {
  it("is decorative without a label and an image with one", () => {
    const { container, rerender } = render(<OsIcon os="ubuntu" />);
    expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
    rerender(<OsIcon os="ubuntu" label="Ubuntu 22.04" />);
    expect(screen.getByRole("img", { name: "Ubuntu 22.04" })).toBeTruthy();
  });

  it("paints the brand colour or follows currentColor in mono", () => {
    const { container, rerender } = render(<OsIcon os="ubuntu" size={20} />);
    const svg = () => container.querySelector("svg") as SVGSVGElement;
    expect(svg().style.color).not.toBe("");
    expect(svg().getAttribute("width")).toBe("20");
    rerender(<OsIcon os="ubuntu" variant="mono" />);
    expect(svg().style.color).toBe("");
    expect(svg().getAttribute("class")).toContain("text-muted");
  });

  it("uses a theme colour for near-black brand marks", () => {
    const { container } = render(<OsIcon os="macos" />);
    expect(container.querySelector("svg")?.style.color).toBe("");
    expect(container.querySelector("svg")?.getAttribute("class")).toContain("text-fg");
  });

  it("resolves guest ids and falls back to the generic glyph", () => {
    const { container, rerender } = render(<OsIcon os="rhel9_64Guest" />);
    expect(container.querySelector("[data-os]")?.getAttribute("data-os")).toBe("rhel");
    rerender(<OsIcon os="templeos-xyz" />);
    expect(container.querySelector("[data-os]")?.getAttribute("data-os")).toBe("unknown");
    expect(container.querySelector("svg path")).toBeTruthy();
  });

  it("renders every registered OS in both variants without a11y violations", async () => {
    const { container } = render(
      <ul>
        {osIds.map((id) => (
          <li key={id}>
            <OsIcon os={id} label={osIcons[id].name} />
            <OsIcon os={id} variant="mono" label={osIcons[id].name} />
          </li>
        ))}
      </ul>,
    );
    expect(container.querySelectorAll("svg").length).toBe(osIds.length * 2);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("VmOsIcon", () => {
  it("adds the state badges and names them", () => {
    const { container } = render(<VmOsIcon os="debian" state="running" overlay="warning" label="web-01" />);
    expect(screen.getByRole("img", { name: "web-01, Running, Warning" })).toBeTruthy();
    expect(container.querySelector('[data-badge="running"]')).toBeTruthy();
    expect(container.querySelector('[data-badge="warning"]')).toBeTruthy();
  });

  it("is decorative without label and state", () => {
    const { container } = render(<VmOsIcon os="windows" />);
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("storage and network glyphs", () => {
  it("registers the new kinds in ObjectIcon", () => {
    for (const kind of ["ssd", "hdd", "nvme", "iscsi", "san", "nas", "vdisk", "raid", "disk-array", "lun", "volume", "vswitch", "vnic", "vlan", "firewall", "load-balancer", "router", "uplink"]) {
      expect(objectKinds).toContain(kind);
      const { container, unmount } = render(<ObjectIcon kind={kind} size={16} />);
      expect(container.querySelector("svg path, svg rect, svg ellipse, svg circle"), kind).toBeTruthy();
      unmount();
    }
  });

  it("renders every exported glyph at 16 and 20 px", () => {
    const all = [SsdGlyph, HddGlyph, NvmeGlyph, IscsiGlyph, SanGlyph, NasGlyph, NfsGlyph, VdiskGlyph, RaidGlyph, DiskArrayGlyph, LunGlyph, VolumeGlyph, VSwitchGlyph, VnicGlyph, VlanGlyph, FirewallGlyph, LoadBalancerGlyph, RouterGlyph, UplinkGlyph, VpnGlyph];
    for (const G of all) {
      for (const px of [16, 20]) {
        const { container, unmount } = render(<G width={px} height={px} />);
        const svg = container.querySelector("svg")!;
        expect(svg.getAttribute("viewBox"), G.displayName).toBe("0 0 24 24");
        expect(svg.getAttribute("width")).toBe(String(px));
        unmount();
      }
    }
  });

  it("passes SVG props through and draws every RAID level differently", () => {
    const { container } = render(<SsdGlyph width={20} height={20} className="x" />);
    expect(container.querySelector("svg.x")?.getAttribute("stroke")).toBe("currentColor");
    const shapes = [undefined, 0, 1, 5, 6, 10].map((level) => {
      const { container: c, unmount } = render(<RaidGlyph level={level as 0} />);
      const html = c.innerHTML;
      unmount();
      return html;
    });
    expect(new Set(shapes).size).toBe(shapes.length);
    const { container: d } = render(<DiskArrayGlyph />);
    expect(d.querySelectorAll("rect").length).toBe(2);
  });
});
