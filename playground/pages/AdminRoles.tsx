import * as React from "react";
import { PermissionMatrix, TransferList } from "../../lib";

const roles = [
  { id: "admin", label: "Admin" },
  { id: "editor", label: "Editor" },
  { id: "viewer", label: "Viewer" },
];
const groups = [
  { id: "users", label: "Users", permissions: [{ id: "users.read", label: "Read users" }, { id: "users.write", label: "Edit users" }] },
  { id: "apps", label: "Applications", permissions: [{ id: "apps.read", label: "Read apps" }, { id: "apps.write", label: "Edit apps" }] },
];
const saved = { admin: ["users.read", "users.write", "apps.read", "apps.write"], editor: ["users.read"], viewer: [] as string[] };
const inherited = { editor: [{ permission: "apps.read", from: "Viewer" }] };

export default function AdminRoles() {
  const [base, setBase] = React.useState<Record<string, string[]>>(saved);
  const [value, setValue] = React.useState<Record<string, string[]>>(saved);
  const [assigned, setAssigned] = React.useState<string[]>(["editor"]);
  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">Roles</h2>
      <PermissionMatrix roles={roles} groups={groups} value={value} onChange={setValue} inherited={inherited} baseline={base} searchable onSave={() => setBase(value)} onDiscard={() => setValue(base)} />
      <TransferList items={roles} value={assigned} onChange={setAssigned} height={120} />
    </section>
  );
}
