import * as React from "react";
import { cn } from "../cn";
import { useLaf } from "../i18n";
import { objectStateMeta, StateBadge, type ObjectState } from "../components/object-icon";
import { guestOsToId } from "./guest";
import { osIcons, type OsId } from "./registry";

export interface OsIconProps {
  /** An {@link OsId}, a vSphere guest ID or a free-form OS name; anything unrecognised renders the generic glyph. */
  os: OsId | (string & {}) | null | undefined;
  size?: number;
  /** `brand` paints the official colour, `mono` follows `currentColor`. */
  variant?: "brand" | "mono";
  /** Accessible name; without it the icon is decorative (aria-hidden). */
  label?: string;
  className?: string;
}

export function resolveOsId(os: string | null | undefined): OsId {
  return os && Object.prototype.hasOwnProperty.call(osIcons, os) ? (os as OsId) : guestOsToId(os);
}

/** Relative luminance of a 6-digit hex colour. */
function luminance(hex: string): number {
  const c = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!;
}

/** Operating-system logo for a VM guest OS. */
export function OsIcon({ os, size = 16, variant = "brand", label, className }: OsIconProps) {
  const id = resolveOsId(os);
  const { art } = osIcons[id];
  const a11y = label ? ({ role: "img", "aria-label": label } as const) : ({ "aria-hidden": true } as const);
  if ("glyph" in art) {
    const G = art.glyph;
    return <G data-os={id} data-variant={variant} width={size} height={size} className={cn("shrink-0 text-muted", className)} {...a11y} />;
  }
  const brand = variant === "brand";
  // Near-black marks would vanish on a dark theme, so they follow the foreground colour instead of the brand colour.
  const themed = !brand || luminance(art.hex) < 0.06;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      data-os={id}
      data-variant={variant}
      width={size}
      height={size}
      className={cn("shrink-0", brand ? (themed ? "text-fg" : undefined) : "text-muted", className)}
      style={brand && !themed ? { color: `#${art.hex}` } : undefined}
      {...a11y}
    >
      <path d={art.path} />
    </svg>
  );
}

export interface VmOsIconProps extends Omit<OsIconProps, "label"> {
  state?: ObjectState;
  /** Second badge on the opposite corner, as on `ObjectIcon`. */
  overlay?: ObjectState;
  /** Accessible name of the VM; the state texts are appended. Without a label and state the icon is decorative. */
  label?: string;
}

/** OS logo with the `ObjectIcon` state badges, for VM rows in trees and lists. */
export function VmOsIcon({ os, size = 16, variant = "brand", state, overlay, label, className }: VmOsIconProps) {
  const { t } = useLaf();
  const stateText = [state, overlay].filter((x): x is ObjectState => !!x).map((x) => t[objectStateMeta[x].text] as string).join(", ");
  const name = [label, stateText].filter(Boolean).join(", ");
  const meta = state ? objectStateMeta[state] : undefined;
  return (
    <span
      data-state={state}
      data-overlay={overlay}
      role={name ? "img" : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <OsIcon os={os} size={size} variant={variant} className={meta?.base === "dim" ? "opacity-70" : meta?.base === "faded" ? "opacity-50" : undefined} />
      {state && <StateBadge state={state} px={size} className="-end-1 -bottom-1" />}
      {overlay && <StateBadge state={overlay} px={size} className="-end-1 -top-1" />}
    </span>
  );
}
