import type { realtimeEn } from "../messages/realtime.en";

export const realtimeHu: typeof realtimeEn = {
  state: {
    connecting: "Kapcsolódás",
    open: "Élő",
    reconnecting: "Újrakapcsolódás",
    closed: "Szétkapcsolva",
    error: "A kapcsolat sikertelen",
  },
  badge: {
    group: "Kapcsolat állapota",
    reconnect: "Újrakapcsolódás",
    announce: (state) => `Kapcsolat állapota: ${state}`,
    offline: "Nincs hálózat",
  },
  stale: {
    paused: "Az élő frissítések szünetelnek",
    pausedSince: (ago) => `Az élő frissítések szünetelnek — utolsó frissítés ${ago}`,
    reconnect: "Újrakapcsolódás",
    justNow: "épp most",
    seconds: (n) => `${n} mp-e`,
    minutes: (n) => `${n} perce`,
    hours: (n) => `${n} órája`,
  },
};
