import { Activity, BookOpen, Box, Gauge, Home, KeyRound, ListChecks, Server, Settings, ShieldCheck, UserPlus, Users } from "lucide-react";
import * as React from "react";
import {
  Avatar,
  Badge,
  Button,
  PageSection,
  Panel,
  PortalHome,
  PortalLayout,
  ServerDataGrid,
  type FilterField,
  type GridColumn,
  type GridFilter,
  type NotificationItem,
  type PortalAnnouncement,
  type PortalApp,
  type PortalRoute,
  type ServerGridController,
  type ServerGridRequest,
  type ServerGridResult,
} from "../../lib";

/* ── Fake directory API ── */
export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  team: string;
  status: "Active" | "Invited" | "Suspended";
  lastActive: number;
  avatar?: string;
}

const NOW = Date.UTC(2026, 5, 1, 12, 0, 0);
const FIRST = ["Anna", "Bence", "Csilla", "Dávid", "Emese", "Ferenc", "Gabriella", "Hunor", "Ildikó", "János", "Kata", "László", "Mária", "Nándor", "Orsolya", "Péter", "Réka", "Sándor", "Tímea", "Zoltán"];
const LAST = ["Nagy", "Kovács", "Tóth", "Szabó", "Horváth", "Varga", "Kiss", "Molnár", "Németh", "Farkas", "Balogh", "Papp", "Takács", "Juhász"];
const TEAMS = ["Platform", "Identity", "Storage", "Networking", "Observability"];
const ROLES: DemoUser["role"][] = ["Admin", "Editor", "Viewer"];
const STATUSES: DemoUser["status"][] = ["Active", "Active", "Active", "Invited", "Suspended"];

const slug = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const ME: DemoUser = { id: "u1", name: "Paál Gyula", email: "gyula@pilab.hu", role: "Admin", team: "Platform", status: "Active", lastActive: NOW - 60_000, avatar: "/paalgyula.jpg" };
const USERS: DemoUser[] = [
  ME,
  ...Array.from({ length: 136 }, (_, i): DemoUser => {
    const first = FIRST[(i * 7) % FIRST.length]!;
    const last = LAST[(i * 5 + 3) % LAST.length]!;
    return {
      id: `u${i + 2}`,
      name: `${last} ${first}`,
      email: `${slug(first)}.${slug(last)}${i}@pilab.hu`,
      role: ROLES[(i * 3) % 3]!,
      team: TEAMS[(i * 2) % TEAMS.length]!,
      status: STATUSES[(i * 11) % STATUSES.length]!,
      lastActive: NOW - ((i * 7919) % 4000) * 3_600_000,
    };
  }),
];

export interface ApiConfig {
  latency: number;
  fail: boolean;
}

const compare = (a: DemoUser, b: DemoUser, id: string) => (id === "lastActive" ? a.lastActive - b.lastActive : String(a[id as keyof DemoUser] ?? "").localeCompare(String(b[id as keyof DemoUser] ?? "")));

function applyFilters(rows: DemoUser[], filters: GridFilter[]) {
  return filters.reduce((acc, f) => {
    const v = f.value as { op?: string; values?: string[]; negated?: boolean } | string;
    const values = typeof v === "string" ? [v] : (v.values ?? []);
    const negated = typeof v === "object" && !!v.negated;
    if (!values.length || f.id === "$text") return acc;
    return acc.filter((u) => values.some((x) => String(u[f.id as keyof DemoUser]).toLowerCase() === x.toLowerCase()) !== negated);
  }, rows);
}

/** Server-side semantics: multi-column sort, filters, search, offset pagination, latency, aborts and failures. */
export function listUsers(req: ServerGridRequest, cfg: ApiConfig): Promise<ServerGridResult<DemoUser>> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (cfg.fail) return reject(new Error("503 Service Unavailable"));
      const q = req.search.trim().toLowerCase();
      let rows = applyFilters(USERS, req.filters).filter((u) => !q || `${u.name} ${u.email} ${u.team}`.toLowerCase().includes(q));
      if (req.sort.length) rows = [...rows].sort((a, b) => req.sort.reduce((r, s) => r || compare(a, b, s.id) * (s.dir === "asc" ? 1 : -1), 0));
      const start = (req.page - 1) * req.pageSize;
      resolve({ rows: rows.slice(start, start + req.pageSize), total: rows.length });
    }, cfg.latency);
    req.signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

const searchUsers = (q: string) => Promise.resolve(USERS.filter((u) => u.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5));

/* ── Users page ── */
const statusTone = { Active: "ok", Invited: "warn", Suspended: "danger" } as const;

const columns: GridColumn<DemoUser>[] = [
  {
    id: "name",
    header: "Name",
    sortable: true,
    width: 240,
    cell: (u) => (
      <span className="flex min-w-0 items-center gap-2">
        <Avatar name={u.name} src={u.avatar} size="sm" />
        <span className="truncate">{u.name}</span>
      </span>
    ),
  },
  { id: "email", header: "Email", sortable: true, width: 260, cell: (u) => u.email },
  { id: "role", header: "Role", sortable: true, width: 110, cell: (u) => u.role },
  { id: "team", header: "Team", sortable: true, width: 150, cell: (u) => u.team },
  { id: "status", header: "Status", sortable: true, width: 120, cell: (u) => <Badge tone={statusTone[u.status]}>{u.status}</Badge> },
  { id: "lastActive", header: "Last active", sortable: true, width: 130, cell: (u) => new Date(u.lastActive).toISOString().slice(0, 10) },
];

const filterFields: FilterField[] = [
  { key: "role", type: "enum", options: ROLES.map((value) => ({ value })) },
  { key: "status", type: "enum", options: ["Active", "Invited", "Suspended"].map((value) => ({ value })) },
  { key: "team", type: "enum", options: TEAMS.map((value) => ({ value })) },
];

function UsersPage({ api, onOpen }: { api: React.MutableRefObject<ApiConfig>; onOpen: (u: DemoUser) => void }) {
  const ctl = React.useRef<ServerGridController<DemoUser>>(null);
  const fetcher = React.useCallback((req: ServerGridRequest) => listUsers(req, api.current), [api]);
  return (
    <PageSection>
      <ServerDataGrid<DemoUser>
        label="Users"
        columns={columns}
        rowId={(u) => u.id}
        fetcher={fetcher}
        controllerRef={ctl}
        initialSort={[{ id: "name", dir: "asc" }]}
        pageSize={10}
        urlSync
        filterFields={filterFields}
        searchPlaceholder="Search name, email or team…"
        onRowActivate={onOpen}
        height={440}
        stickyFirstColumn
      />
    </PageSection>
  );
}

function UserDetail({ id }: { id: string }) {
  const u = USERS.find((x) => x.id === id);
  if (!u) return <PageSection>No such user.</PageSection>;
  return (
    <PageSection>
      <Panel title={u.name} headingLevel={2}>
        <div className="flex items-center gap-4">
          <Avatar name={u.name} src={u.avatar} size="lg" />
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-muted">Email</dt>
            <dd className="m-0">{u.email}</dd>
            <dt className="text-muted">Role</dt>
            <dd className="m-0">{u.role}</dd>
            <dt className="text-muted">Team</dt>
            <dd className="m-0">{u.team}</dd>
          </dl>
        </div>
      </Panel>
    </PageSection>
  );
}

const Stub = ({ text }: { text: string }) => (
  <PageSection>
    <Panel title={text} headingLevel={2}>
      <p className="m-0 text-sm text-muted">Placeholder page of the portal demo.</p>
    </Panel>
  </PageSection>
);

const icon = (I: typeof Home) => <I aria-hidden />;

const apps: PortalApp[] = [
  { id: "repisitory", name: "Repisitory", description: "Packages, OCI images and Go modules.", icon: icon(Box), favourite: true, lastOpened: NOW - 3_600_000 },
  { id: "sso", name: "Shadow SSO", description: "Identity, sessions and API keys.", icon: icon(KeyRound), favourite: true, lastOpened: NOW - 26 * 3_600_000 },
  { id: "vcenter", name: "vCenter console", description: "Hosts, clusters and virtual machines.", icon: icon(Server), lastOpened: NOW - 5 * 24 * 3_600_000 },
  { id: "tracker", name: "Tracker", description: "Issues, boards and releases.", icon: icon(ListChecks) },
  { id: "metrics", name: "Metrics", description: "Dashboards and alerting.", icon: icon(Gauge) },
  { id: "docs", name: "Handbook", description: "Runbooks and design docs.", icon: icon(BookOpen) },
];

const notifications: NotificationItem[] = [
  { id: "n1", title: "Invitation accepted", body: "Kovács Anna joined Platform", time: "2026-05-31T11:40:00Z", unread: true },
  { id: "n2", title: "Policy reloaded", time: "2026-05-30T09:05:00Z" },
];

const routes: PortalRoute[] = [
  { path: "/", title: "Home", icon: icon(Home), header: false },
  {
    path: "/users",
    title: "Users",
    icon: icon(Users),
    section: "Directory",
    description: "Server-side sorted, filtered and paginated. Shift-click a header to sort by several columns.",
    tabs: [
      { path: "/users", title: "All users" },
      { path: "/users/invitations", title: "Invitations", badge: "3" },
    ],
    children: [{ path: "/users/:id", title: "User", hidden: true }],
  },
  { path: "/teams", title: "Teams", icon: icon(Activity), section: "Directory", description: "Teams and their members." },
  {
    path: "/settings",
    title: "Settings",
    icon: icon(Settings),
    section: "Administration",
    children: [
      { path: "/settings/general", title: "General", description: "Portal-wide preferences." },
      { path: "/settings/security", title: "Security", icon: icon(ShieldCheck), description: "Sign-in policies and sessions." },
    ],
  },
];

const pathFromHash = () => (typeof location !== "undefined" && location.hash.startsWith("#/") ? location.hash.slice(1) : "/");

/** Multi-app portal: launchpad home plus a server-driven Users table against a fake async API. */
export default function PortalDemo() {
  const [path, setPath] = React.useState(pathFromHash);
  const [config, setConfig] = React.useState<ApiConfig>({ latency: 400, fail: false });
  const api = React.useRef(config);
  api.current = config;
  const [launched, setLaunched] = React.useState<string>();
  const [openedAt, setOpenedAt] = React.useState<Record<string, number>>({});
  const [dismissed, setDismissed] = React.useState<string[]>([]);

  React.useEffect(() => {
    const onHash = () => setPath(pathFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = React.useCallback((to: string) => {
    history.pushState(history.state, "", `${location.pathname}${location.search}#${to}`);
    setPath(to);
  }, []);

  const withOpened = apps.map((a) => (openedAt[a.id] ? { ...a, lastOpened: openedAt[a.id] } : a));
  const launch = (a: PortalApp) => {
    setLaunched(a.name);
    setOpenedAt((o) => ({ ...o, [a.id]: Date.now() }));
  };
  const userId = path.match(/^\/users\/(u\d+)$/)?.[1];

  const body = (() => {
    if (path === "/") {
      return (
        <>
          <PortalHome
            user={{ name: ME.name }}
            apps={withOpened}
            onAppOpen={launch}
            announcements={([
              { id: "a1", title: "Maintenance window on Saturday", body: "Identity services are read-only between 02:00 and 03:00.", tone: "warn", date: NOW - 7_200_000 },
              { id: "a2", title: "Tracker 2.0 is live", tone: "info", date: NOW - 3 * 86_400_000 },
            ] as PortalAnnouncement[]).filter((n) => !dismissed.includes(n.id))}
            onDismissAnnouncement={(id) => setDismissed((d) => [...d, id])}
            quickActions={[
              { id: "invite", label: "Invite a user", description: "Send an invitation by email", icon: icon(UserPlus), onSelect: () => navigate("/users/invitations") },
              { id: "users", label: "Browse users", icon: icon(Users), onSelect: () => navigate("/users") },
            ]}
          />
          <p role="status" className="px-6 pb-6 text-sm text-muted max-[859px]:px-4">
            {launched ? `Launching ${launched}… (demo)` : ""}
          </p>
        </>
      );
    }
    if (userId) return <UserDetail id={userId} />;
    if (path === "/users") {
      return (
        <>
          <PageSection className="flex flex-wrap items-center gap-4 pb-0">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted">Latency</span>
              <select className="form-input w-28" value={config.latency} onChange={(e) => setConfig({ ...config, latency: Number(e.target.value) })}>
                {[0, 150, 400, 1200, 3000].map((ms) => (
                  <option key={ms} value={ms}>
                    {ms} ms
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={config.fail} onChange={(e) => setConfig({ ...config, fail: e.target.checked })} />
              Fail requests
            </label>
          </PageSection>
          <UsersPage api={api} onOpen={(u) => navigate(`/users/${u.id}`)} />
        </>
      );
    }
    const m = routes.flatMap((r) => [r, ...(r.children ?? [])]).find((r) => r.path === path);
    return <Stub text={typeof m?.title === "string" ? m.title : path === "/users/invitations" ? "Invitations" : "Not found"} />;
  })();

  return (
    <PortalLayout
      className="h-[720px] overflow-hidden rounded-lg border border-line"
      persistKey="laf-demo-portal"
      brand={{ logo: <span className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-on-primary">P</span>, title: "Pilab", subtitle: "Portal" }}
      routes={routes.map((r) => (r.path === "/users" ? { ...r, actions: <Button variant="secondary" leftIcon={<UserPlus aria-hidden />} onClick={() => navigate("/users/invitations")}>Invite</Button> } : r))}
      path={path}
      onNavigate={navigate}
      hrefFor={(p) => `#${p}`}
      apps={withOpened}
      onAppSelect={launch}
      allAppsPath="/"
      currentApp="portal"
      search={{ onSearch: async (q) => (await searchUsers(q)).map((u) => ({ id: `user:${u.id}`, label: u.name, group: "Users", onSelect: () => navigate(`/users/${u.id}`) })) }}
      notifications={{ items: notifications }}
      user={{ name: ME.name, email: ME.email, avatarSrc: ME.avatar, onSignOut: () => setLaunched("sign-out") }}
      footer={{ copyright: "© 2026 Pilab", version: "1.0.0", links: [{ label: "Handbook", href: "#/settings/general" }], status: { tone: "ok", label: "All systems operational" } }}
    >
      {body}
    </PortalLayout>
  );
}
