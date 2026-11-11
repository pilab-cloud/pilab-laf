import * as React from "react";
import { objectStates, RaidGlyph } from "../../lib";
import { OsIcon, osList, VmOsIcon, guestOsToId } from "../../lib/os-icons";

const guests = ["ubuntu64Guest", "debian11_64Guest", "rhel9_64Guest", "windows9Guest", "darwin20_64Guest", "other4xLinux64Guest", "Microsoft Windows 10 (64-bit)", "???"];

export default function OsIcons() {
  return (
    <div className="grid gap-8 p-6">
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">Operating systems</h2>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-3 p-0">
          {osList.map((o) => (
            <li key={o.id} className="grid gap-1 text-sm">
              <span>{o.name} <span className="text-muted">({o.family})</span></span>
              <span className="flex items-center gap-3"><OsIcon os={o.id} size={16} /><OsIcon os={o.id} size={20} /><OsIcon os={o.id} size={32} /></span>
              <span className="flex items-center gap-3"><OsIcon os={o.id} size={16} variant="mono" /><OsIcon os={o.id} size={20} variant="mono" /><OsIcon os={o.id} size={32} variant="mono" /></span>
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">VmOsIcon states</h2>
        <ul className="m-0 flex list-none flex-wrap gap-6 p-0">
          {objectStates.map((st) => (
            <li key={st} className="flex items-center gap-2 text-sm">
              <VmOsIcon os="ubuntu" size={20} state={st} />
              <VmOsIcon os="windows" size={20} state={st} />
              <VmOsIcon os="debian" size={16} state={st} />
              {st}
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">Guest ID mapping</h2>
        <ul className="m-0 flex list-none flex-wrap gap-6 p-0">
          {guests.map((g) => (
            <li key={g} className="flex items-center gap-2 text-sm">
              <OsIcon os={g} size={20} />
              <code>{g}</code> → {guestOsToId(g)}
            </li>
          ))}
        </ul>
      </section>
      <section className="grid gap-2">
        <h2 className="text-lg font-semibold">RAID levels</h2>
        <ul className="m-0 flex list-none flex-wrap gap-6 p-0 text-muted">
          {([undefined, 0, 1, 5, 6, 10] as const).map((l) => (
            <li key={String(l)} className="flex items-center gap-2 text-sm">
              <RaidGlyph level={l} width={16} height={16} />
              <RaidGlyph level={l} width={20} height={20} />
              <RaidGlyph level={l} width={32} height={32} />
              {l === undefined ? "RAID" : `RAID ${l}`}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
