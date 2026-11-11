import type { autocompleteEn } from "../messages/autocomplete.en";

export const autocompleteHu: typeof autocompleteEn = {
  autocomplete: {
    clear: "Törlés",
    create: (q) => `„${q}” létrehozása`,
    empty: "Nincs találat",
    loading: "Betöltés…",
    error: "A lehetőségek betöltése nem sikerült",
    retry: "Újra",
    remove: (name) => `${name} eltávolítása`,
    toggle: "Lehetőségek megjelenítése",
  },
  chips: {
    duplicate: (tag) => `„${tag}” már hozzá van adva`,
    max: (n) => `Legfeljebb ${n} elem adható meg`,
    invalid: (tag) => `„${tag}” érvénytelen`,
    remove: (tag) => `${tag} eltávolítása`,
  },
  quickSearch: {
    label: "Keresés a leltárban",
    placeholder: "Keresés a leltárban…",
    loading: "Keresés…",
    empty: (q) => `Nincs találat erre: „${q}”`,
    error: "A keresés nem sikerült",
    retry: "Újra",
    recent: "Legutóbbi keresések",
    clearRecent: "Legutóbbi keresések törlése",
    hint: "Írjon be valamit virtuális gépek, hosztok, adattárolók és hálózatok kereséséhez",
    results: (n) => `${n} találat`,
  },
};
