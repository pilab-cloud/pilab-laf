import type { mailEn } from "../messages/mail.en";

export const mailHu: typeof mailEn = {
  queueStatus: { PENDING: "Függőben", DELIVERED: "Kézbesítve", TRANSIENT_FAILURE: "Újrapróbálás", PERMANENT_FAILURE: "Sikertelen", UNKNOWN: "Ismeretlen" },
  quota: {
    label: "Tárhelykvóta",
    usage: (used, total, pct) => `${used} / ${total} (${pct})`,
    unlimited: (used) => `${used} felhasználva, nincs kvóta`,
  },
  health: {
    label: "Szolgáltatások állapota",
    status: { up: "Működik", degraded: "Csökkent teljesítmény", down: "Leállt", unknown: "Ismeretlen" },
  },
  dns: {
    label: "DNS-rekordok",
    type: "Típus",
    host: "Hoszt",
    value: "Érték",
    purpose: "Cél",
    status: "Állapot",
    copy: (host) => `${host} értékének másolása`,
    copied: "Másolva",
    empty: "Nincs DNS-rekord",
    state: { verified: "Ellenőrizve", missing: "Hiányzik", mismatch: "Eltérés", optional: "Opcionális", unknown: "Nincs ellenőrizve" },
  },
  timeline: { label: "Kézbesítési idővonal", elapsed: (ms) => `+${ms}`, empty: "Nincs rögzített lépés" },
};
