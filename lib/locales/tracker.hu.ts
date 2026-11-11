import type { trackerEn } from "../messages/tracker.en";

export const trackerHu: typeof trackerEn = {
  labelPicker: {
    label: "Címkék",
    placeholder: "Címkék szűrése…",
    newColour: "Új címke színe",
    colour: (n) => `${n}. szín`,
    create: (q) => `„${q}” címke létrehozása`,
  },
  reaction: {
    add: "Reakció hozzáadása",
    reactedBy: (emoji, users) => `${emoji} ${users.join(", ")}`,
    toggle: (emoji, n) => `${emoji} ${n}`,
  },
  timeline: {
    edited: "szerkesztve",
    actions: "Megjegyzés műveletei",
    more: (n) => `${n} további frissítés`,
    fewer: "Kevesebb frissítés mutatása",
    timeline: "Tevékenység",
  },
  optionPicker: { search: "Keresés…", empty: "Nincs találat", none: "Nincs" },
  issue: { select: (key) => `${key} kijelölése`, overdue: "Lejárt", comments: (n) => `${n} megjegyzés`, due: "Határidő" },
  progress: { todo: "Teendő", doing: "Folyamatban", done: "Kész", summary: (pct) => `${pct}% kész` },
};
