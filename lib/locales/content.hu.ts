import type { contentEn } from "../messages/content.en";

export const contentHu: typeof contentEn = {
  toolbar: {
    selected: (n) => `${n} kijelölve`,
    clearSelection: "Kijelölés törlése",
    activeFilters: "Aktív szűrők",
    removeFilter: (label) => `${label} szűrő eltávolítása`,
    clearAll: "Összes szűrő törlése",
    actions: "Műveletek",
  },
  codeBlock: { label: "Kód", copy: "Kód másolása", copied: "Másolva", wrap: "Sortörés" },
  clipboard: { copy: "Másolás a vágólapra", copied: "Másolva", expand: "Teljes érték megjelenítése", collapse: "Teljes érték elrejtése" },
  form: { required: "kötelező" },
};
