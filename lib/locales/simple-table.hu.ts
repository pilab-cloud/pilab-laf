import type { simpleTableEn } from "../messages/simple-table.en";

export const simpleTableHu: typeof simpleTableEn = {
  table: {
    sortBy: (column) => `Rendezés: ${column}`,
    selectAll: "Összes sor kijelölése",
    selectRow: (label) => (label ? `${label} kijelölése` : "Sor kijelölése"),
    actions: "Műveletek",
    empty: "Nincs megjeleníthető sor",
    loading: "Sorok betöltése",
  },
};
