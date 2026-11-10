import * as React from "react";
import { SessionList, type AccountSession } from "../../lib";

const initial: AccountSession[] = [
  { id: "1", device: "laptop", browser: "Firefox 130", os: "macOS", ip: "192.0.2.10", location: "Budapest, HU", lastActive: Date.now() - 60_000, current: true, user: "anna" },
  { id: "2", device: "phone", browser: "Safari", os: "iOS 18", ip: "198.51.100.7", location: "Vienna, AT", lastActive: Date.now() - 3 * 3600_000, user: "anna" },
  { id: "3", device: "tablet", browser: "Chrome", os: "Android", ip: "203.0.113.4", lastActive: Date.now() - 2 * 86400_000, user: "anna" },
];

export default function AccountSessions() {
  const [sessions, setSessions] = React.useState(initial);
  return (
    <div className="grid max-w-2xl gap-4">
      <h2 className="m-0">Active sessions</h2>
      <SessionList
        sessions={sessions}
        onRevoke={(id) => setSessions((s) => s.filter((x) => x.id !== id))}
        onRevokeOthers={() => setSessions((s) => s.filter((x) => x.current))}
      />
    </div>
  );
}
