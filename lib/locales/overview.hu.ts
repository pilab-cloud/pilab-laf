import type { overviewEn } from "../messages/overview.en";

export const overviewHu: typeof overviewEn = {
  edit: (title) => `${title} szerkesztése`,
  details: "Részletek",
  empty: "Nincs megjeleníthető elem",
  actions: "Műveletek",
  actionOptions: (label) => `${label} – további lehetőségek`,
  switchObject: "Objektum váltása",
  utilization: {
    title: "Kihasználtság",
    available: "Szabad",
    ofTotal: (capacity) => `összesen ${capacity}`,
    used: "Használt",
    range: "Elmúlt 7 nap",
    trend: (title) => `${title} alakulása`,
  },
};
