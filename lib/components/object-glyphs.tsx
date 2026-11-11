import * as React from "react";

/** Stroke-based 24×24 glyphs matching the lucide set (currentColor, round caps), drawn for infrastructure objects. */
export type ObjectGlyph = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/** Builds a glyph component from static SVG children. */
export function glyph(name: string, children: React.ReactNode): ObjectGlyph {
  const G: ObjectGlyph = ({ strokeWidth = 2, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
  G.displayName = name;
  return G;
}

const VM_CUBE = <path d="M12 6.6 15 8.3v3.4L12 13.4 9 11.7V8.3zM12 10 15 8.3M12 10 9 8.3M12 10v3.4" strokeWidth="1.5" />;

/** Virtual machine: a screen with a cube inside. */
export const VmGlyph = glyph(
  "VmGlyph",
  <>
    <rect x="2.5" y="3.5" width="19" height="13" rx="1.5" />
    <path d="M8.5 20.5h7M12 16.5v4" />
    {VM_CUBE}
  </>,
);

/** VM template: the VM glyph with a dashed screen. */
export const TemplateGlyph = glyph(
  "TemplateGlyph",
  <>
    <rect x="2.5" y="3.5" width="19" height="13" rx="1.5" strokeDasharray="3 2.2" />
    <path d="M8.5 20.5h7M12 16.5v4" />
    {VM_CUBE}
  </>,
);

/** One physical server: a single tower/rack unit with drive bays and a status LED. */
export const ServerGlyph = glyph(
  "ServerGlyph",
  <>
    <rect x="5" y="2.5" width="14" height="19" rx="1.5" />
    <path d="M8.5 7h7M8.5 11h7" strokeWidth="1.5" />
    <path d="M8.5 17h.01M12 17h3.5" />
  </>,
);

/** Cluster: several servers side by side. */
export const ClusterGlyph = glyph(
  "ClusterGlyph",
  <>
    <rect x="2" y="6" width="6" height="15.5" rx="1" />
    <rect x="9" y="2.5" width="6" height="19" rx="1" />
    <rect x="16" y="6" width="6" height="15.5" rx="1" />
    <path d="M5 9.5h.01M12 6h.01M19 9.5h.01M5 17.5h.01M12 17.5h.01M19 17.5h.01" />
  </>,
);

/** Data center: a headquarters building with server racks inside. */
export const DatacenterGlyph = glyph(
  "DatacenterGlyph",
  <>
    <path d="M3.5 21.5v-15L12 2.5l8.5 4v15M2 21.5h20" />
    <rect x="7.5" y="9" width="9" height="4" rx=".75" strokeWidth="1.5" />
    <rect x="7.5" y="15" width="9" height="4" rx=".75" strokeWidth="1.5" />
    <path d="M10 11h.01M10 17h.01" />
  </>,
);
