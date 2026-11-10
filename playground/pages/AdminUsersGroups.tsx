import * as React from "react";
import { AllowListEditor, CidrInput, IpInput, NotificationCenter, TransferList, type NotificationItem } from "../../lib";

const users = Array.from({ length: 200 }, (_, i) => ({ id: `u${i}`, label: `user${i}@example.com` }));

export default function AdminUsersGroups() {
  const [members, setMembers] = React.useState<string[]>(["u1", "u2"]);
  const [notes, setNotes] = React.useState<NotificationItem[]>([
    { id: "1", title: "New sign-in from unknown device", time: Date.now() - 120000, unread: true, group: "Security" },
    { id: "2", title: "Group “Admins” changed", body: "2 members added", time: Date.now() - 3600000, unread: true, group: "Directory" },
    { id: "3", title: "Backup completed", time: Date.now() - 86400000, group: "Directory" },
  ]);
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Users &amp; groups</h2>
        <NotificationCenter
          items={notes}
          onMarkRead={(id) => setNotes((n) => n.map((x) => (x.id === id ? { ...x, unread: false } : x)))}
          onMarkAllRead={() => setNotes((n) => n.map((x) => ({ ...x, unread: false })))}
          onViewAll={() => undefined}
        />
      </div>
      <TransferList items={users} value={members} onChange={setMembers} />
      <div className="grid max-w-xl gap-4">
        <IpInput label="Gateway" defaultValue="192.168.0.1" />
        <CidrInput label="Network" defaultValue="10.0.0.0/8" />
        <AllowListEditor defaultValue={["203.0.113.0/24", "2001:db8::/32"]} />
      </div>
    </section>
  );
}
