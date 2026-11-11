export const mailEn = {
  queueStatus: { PENDING: "Pending", DELIVERED: "Delivered", TRANSIENT_FAILURE: "Retrying", PERMANENT_FAILURE: "Failed", UNKNOWN: "Unknown" },
  quota: {
    label: "Storage quota",
    usage: (used: string, total: string, pct: string) => `${used} of ${total} (${pct})`,
    unlimited: (used: string) => `${used} used, no quota`,
  },
  health: {
    label: "Service health",
    status: { up: "Operational", degraded: "Degraded", down: "Down", unknown: "Unknown" },
  },
  dns: {
    label: "DNS records",
    type: "Type",
    host: "Host",
    value: "Value",
    purpose: "Purpose",
    status: "Status",
    copy: (host: string) => `Copy value of ${host}`,
    copied: "Copied",
    empty: "No DNS records",
    state: { verified: "Verified", missing: "Missing", mismatch: "Mismatch", optional: "Optional", unknown: "Not checked" },
  },
  timeline: { label: "Delivery timeline", elapsed: (ms: string) => `+${ms}`, empty: "No hops recorded" },
};
