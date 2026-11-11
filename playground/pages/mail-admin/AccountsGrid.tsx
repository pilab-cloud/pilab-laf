import { Ban, CheckCircle2, Pencil, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { Avatar, Badge, Button, ServerDataGrid, type FilterField, type GridColumn, type ServerGridController, type ServerGridRequest } from "../../../lib";
import type { AccountInfo, AccountKind } from "./types";
import { useMail, useRun } from "./context";

const kindLabel: Record<AccountKind, string> = { user: "User", "shared-mailbox": "Shared", room: "Room", equipment: "Equipment", group: "Group" };

export interface AccountsGridProps {
  label: string;
  kinds: AccountKind[];
  onOpen: (a: AccountInfo) => void;
  onCreate?: () => void;
  createLabel?: string;
  onDelete?: (a: AccountInfo) => void;
  /** Hide the status column and enable/disable actions (groups have no sign-in). */
  withStatus?: boolean;
}

/** Server-side account table shared by the recipient pages. */
export function AccountsGrid({ label, kinds, onOpen, onCreate, createLabel = "New", onDelete, withStatus = true }: AccountsGridProps) {
  const { api, version } = useMail();
  const run = useRun();
  const ctl = React.useRef<ServerGridController<AccountInfo>>(null);
  const kindKey = kinds.join(",");

  const fetcher = React.useCallback(
    (req: ServerGridRequest) => api.accounts.list({ ...req, filters: [...req.filters.filter((f) => f.id !== "kind"), { id: "kind", value: { values: kindKey.split(",") } }] }),
    [api, kindKey],
  );
  React.useEffect(() => {
    if (version > 0) ctl.current?.refresh();
  }, [version]);

  const columns = React.useMemo<GridColumn<AccountInfo>[]>(
    () => [
      {
        id: "displayName",
        header: "Display name",
        sortable: true,
        width: 240,
        cell: (a) => (
          <span className="flex min-w-0 items-center gap-2">
            <Avatar name={a.displayName} src={a.id === "acc_gyula" ? "/paalgyula.jpg" : undefined} size="sm" />
            <span className="truncate">{a.displayName}</span>
          </span>
        ),
      },
      { id: "email", header: "Email address", sortable: true, width: 260, cell: (a) => a.email },
      ...(kinds.length > 1 ? [{ id: "kind", header: "Type", sortable: true, width: 110, cell: (a: AccountInfo) => kindLabel[a.kind] } satisfies GridColumn<AccountInfo>] : []),
      { id: "department", header: "Department", sortable: true, width: 140, cell: (a) => a.department || "—" },
      ...(withStatus ? [{ id: "status", header: "Status", sortable: true, width: 110, cell: (a: AccountInfo) => <Badge tone={a.status === "active" ? "ok" : "warn"}>{a.status === "active" ? "Active" : "Suspended"}</Badge> } satisfies GridColumn<AccountInfo>] : []),
      { id: "updatedAt", header: "Updated", sortable: true, width: 130, cell: (a) => a.updatedAt.slice(0, 10) },
    ],
    [kinds.length, withStatus],
  );

  const filterFields = React.useMemo<FilterField[]>(
    () => (withStatus ? [{ key: "status", type: "enum", options: [{ value: "active" }, { value: "suspended" }] }] : []),
    [withStatus],
  );

  return (
    <ServerDataGrid<AccountInfo>
      label={label}
      columns={columns}
      rowId={(a) => a.id}
      fetcher={fetcher}
      controllerRef={ctl}
      initialSort={[{ id: "displayName", dir: "asc" }]}
      pageSize={10}
      filterFields={filterFields}
      searchPlaceholder="Search name, address or department…"
      onRowActivate={onOpen}
      height={460}
      stickyFirstColumn
      toolbarEnd={
        onCreate && (
          <Button leftIcon={<Plus aria-hidden />} onClick={onCreate}>
            {createLabel}
          </Button>
        )
      }
      rowActions={(a) => [
        { id: "edit", label: "Edit", icon: <Pencil aria-hidden />, onSelect: () => onOpen(a) },
        ...(withStatus
          ? [
              a.status === "active"
                ? { id: "suspend", label: "Suspend", icon: <Ban aria-hidden />, onSelect: () => void run(() => api.accounts.setStatus(a.id, "suspended"), `${a.email} suspended`) }
                : { id: "enable", label: "Enable", icon: <CheckCircle2 aria-hidden />, onSelect: () => void run(() => api.accounts.setStatus(a.id, "active"), `${a.email} enabled`) },
            ]
          : []),
        ...(onDelete ? [{ id: "delete", label: "Delete…", icon: <Trash2 aria-hidden />, danger: true, separatorBefore: true, onSelect: () => onDelete(a) }] : []),
      ]}
    />
  );
}
