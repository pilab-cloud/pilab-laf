export const realtimeEn = {
  state: {
    connecting: "Connecting",
    open: "Live",
    reconnecting: "Reconnecting",
    closed: "Disconnected",
    error: "Connection failed",
  },
  badge: {
    group: "Connection status",
    reconnect: "Reconnect",
    announce: (state: string) => `Connection status: ${state}`,
    offline: "Offline",
  },
  stale: {
    paused: "Live updates paused",
    pausedSince: (ago: string) => `Live updates paused — last update ${ago}`,
    reconnect: "Reconnect",
    justNow: "just now",
    seconds: (n: number) => `${n} s ago`,
    minutes: (n: number) => `${n} min ago`,
    hours: (n: number) => `${n} h ago`,
  },
};
