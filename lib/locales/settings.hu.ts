import type { settingsEn } from "../messages/settings.en";

export const settingsHu: typeof settingsEn = {
  dialog: {
    sections: "Szakaszok",
    apply: "Alkalmaz",
    reset: "Visszaállítás",
    cancel: "Mégse",
    ok: "OK",
    errors: (n) => (n === 1 ? "1 hiba" : `${n} hiba`),
    unsaved: "Nem mentett módosítások",
  },
  row: {
    overridden: "Felülírva",
    inherited: "Örökölt",
    resetToDefault: "Alapértelmezés visszaállítása",
    resetNamed: (name) => `${name} visszaállítása alapértelmezettre`,
  },
  deviceList: {
    add: "Hozzáadás",
    edit: "Szerkesztés",
    editNamed: (name) => `${name} szerkesztése`,
    done: "Kész",
    remove: "Eltávolítás",
    removeNamed: (name) => `${name} eltávolítása`,
    removeSelected: (n) => `Kijelöltek eltávolítása (${n})`,
    moveUp: (name) => `${name} feljebb`,
    moveDown: (name) => `${name} lejjebb`,
    selectRow: (name) => `${name} kijelölése`,
    selectAll: "Összes kijelölése",
    actions: "Műveletek",
    status: "Állapot",
    empty: "Nincs eszköz",
    emptyHint: "Adjon hozzá egy eszközt a kezdéshez.",
  },
};
