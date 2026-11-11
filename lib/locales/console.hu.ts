import type { consoleEn } from "../messages/console.en";

export const consoleHu: typeof consoleEn = {
  terminal: {
    terminal: "Terminál",
    toolbar: "Terminálműveletek",
    connecting: "Csatlakozás",
    open: "Csatlakoztatva",
    closed: "Lecsatlakozva",
    error: "Kapcsolati hiba",
    reconnect: "Újracsatlakozás",
    copy: "Kijelölés másolása",
    clear: "Törlés",
    fullscreen: "Teljes képernyő",
    exitFullscreen: "Kilépés a teljes képernyőből",
    loading: "Terminál betöltése",
  },
  vnc: {
    console: "Távoli konzol",
    viewOnly: "Csak megtekintés",
    interactive: "Interaktív",
    paste: "Beillesztés a távoli gépre",
    pasteDialog: "A távoli vágólapra küldendő szöveg",
    pastePlaceholder: "Küldendő szöveg",
    send: "Küldés",
    cancel: "Mégse",
    credentialsRequired: "Hitelesítő adatok szükségesek",
    loadError: "A konzol nem tölthető be",
    extraTools: "Konzol beviteli eszközök",
  },
};
