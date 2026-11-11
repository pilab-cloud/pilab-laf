import type { uiEn } from "../messages/ui.en";

export const uiHu: typeof uiEn = {
  combobox: { clear: "Törlés", create: (q) => `„${q}” létrehozása` },
  errors: { requestId: "Kérésazonosító", copyRequestId: (label) => `${label} másolása`, tryAgain: "Újrapróbálás" },
  error403: { title: "Hozzáférés megtagadva", description: "Nincs jogosultsága az oldal megtekintéséhez." },
  error404: { title: "Az oldal nem található", description: "A keresett oldal nem létezik, vagy áthelyezték." },
  error500: { title: "Valami elromlott", description: "Váratlan hiba történt. Próbálja újra egy pillanat múlva." },
  errorOffline: { title: "Nincs internetkapcsolat", description: "Ellenőrizze a kapcsolatot, majd próbálja újra." },
  errorSessionExpired: { title: "A munkamenet lejárt", description: "A folytatáshoz jelentkezzen be újra." },
  unsavedChanges: {
    title: "Elveti a nem mentett módosításokat?",
    description: "Nem mentett módosításai vannak. Ha most elhagyja az oldalt, elvesznek.",
    confirm: "Módosítások elvetése",
    cancel: "Szerkesztés folytatása",
  },
  formFooter: { save: "Mentés", cancel: "Mégse" },
  subNav: { label: "Szakaszok navigációja" },
  mobileNav: { title: "Navigáció", trigger: "Navigáció megnyitása" },
  splitButton: { more: "További műveletek" },
  wizard: {
    title: "Varázsló",
    back: "Vissza",
    next: "Tovább",
    finish: "Befejezés",
    skip: "Kihagyás",
    cancel: "Mégse",
    optional: "nem kötelező",
    steps: "Lépések",
  },
};
