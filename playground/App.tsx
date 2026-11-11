import * as React from "react";
import { LafProvider, ToastProvider, TooltipProvider } from "../lib";
import { hu } from "../lib/locales/hu";

const page = <T extends React.ComponentType>(load: () => Promise<{ default: T }>) => React.lazy(load);

export const DEMOS = [
  { id: "catalogue", label: "Catalogue", Component: page(() => import("./pages/Catalogue")) },
  { id: "app-shell", label: "App shell", Component: page(() => import("./pages/AppShell")) },
  { id: "primitives", label: "Primitives", Component: page(() => import("./pages/Primitives")) },
  { id: "combo-menus", label: "Combo & menus", Component: page(() => import("./pages/ComboMenus")) },
  { id: "datagrid", label: "DataGrid", Component: page(() => import("./pages/DataGridBench")) },
  { id: "tree", label: "Tree", Component: page(() => import("./pages/TreeBench")) },
  { id: "filterbar", label: "FilterBar", Component: page(() => import("./pages/FilterBar")) },
  { id: "account-security", label: "Account › Security", Component: page(() => import("./pages/AccountSecurity")) },
  { id: "account-sessions", label: "Account › Sessions", Component: page(() => import("./pages/AccountSessions")) },
  { id: "account-api-keys", label: "Account › API keys", Component: page(() => import("./pages/AccountApiKeys")) },
  { id: "admin-users", label: "Admin › Users & groups", Component: page(() => import("./pages/AdminUsersGroups")) },
  { id: "admin-roles", label: "Admin › Roles", Component: page(() => import("./pages/AdminRoles")) },
  { id: "admin-branding", label: "Admin › Branding", Component: page(() => import("./pages/AdminBranding")) },
  { id: "vcenter", label: "vCenter", Component: page(() => import("./pages/VCenter")) },
  { id: "tracker", label: "Tracker", Component: page(() => import("./pages/Tracker")) },
  { id: "charts", label: "Charts", Component: page(() => import("./pages/Charts")) },
  { id: "editor", label: "Editor", Component: page(() => import("./pages/Editor")) },
  { id: "dnd", label: "Dnd & hotkeys", Component: page(() => import("./pages/DndHotkeys")) },
  { id: "vs-layout", label: "VS layout", Component: page(() => import("./pages/VsLayout")) },
  { id: "vs-objects", label: "VS objects", Component: page(() => import("./pages/VsObjects")) },
  { id: "os-icons", label: "OS icons", Component: page(() => import("./pages/OsIcons")) },
  { id: "tracker-parts", label: "Tracker parts", Component: page(() => import("./pages/TrackerParts")) },
  { id: "content", label: "Content & toolbar", Component: page(() => import("./pages/Content")) },
  { id: "app-frame", label: "AppFrame", Component: page(() => import("./pages/AppFrame")) },
  { id: "dashboard", label: "Dashboard", Component: page(() => import("./pages/Dashboard")) },
  { id: "portal", label: "Portal", Component: page(() => import("./pages/Portal")) },
  { id: "mail-admin", label: "Mail admin", Component: page(() => import("./pages/MailAdmin")) },
  { id: "resource-overview", label: "Resource overview", Component: page(() => import("./pages/ResourceOverview")) },
];

/** `?demo=<id>` wins; otherwise `?bench=grid|tree` picks the benchmark demo. */
export function demoFromLocation(search: string): string {
  const q = new URLSearchParams(search);
  const demo = q.get("demo");
  if (demo && DEMOS.some((d) => d.id === demo)) return demo;
  const bench = q.get("bench");
  if (bench === "grid") return "datagrid";
  if (bench === "tree") return "tree";
  return "catalogue";
}

export function App() {
  const [demo, setDemo] = React.useState(() => demoFromLocation(location.search));
  const [lang, setLang] = React.useState<"en" | "hu">("en");
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr");

  React.useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);
  React.useEffect(() => {
    const onPop = () => setDemo(demoFromLocation(location.search));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = (id: string) => {
    const url = new URL(location.href);
    url.searchParams.set("demo", id);
    url.searchParams.delete("bench");
    history.pushState(null, "", url);
    setDemo(id);
  };

  const current = DEMOS.find((d) => d.id === demo) ?? DEMOS[0]!;
  const Page = current.Component;

  return (
    <LafProvider locale={lang} messages={lang === "hu" ? hu : undefined}>
      <TooltipProvider>
        <ToastProvider>
          <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-2 text-sm">
            <strong>Pilab LAF</strong>
            <label className="flex items-center gap-2">
              <span className="text-muted">Demo</span>
              <select className="form-input w-56" value={current.id} onChange={(e) => go(e.target.value)}>
                {DEMOS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="ms-auto flex items-center gap-2">
              <span className="text-muted">Language</span>
              <select className="form-input w-24" value={lang} onChange={(e) => setLang(e.target.value as "en" | "hu")}>
                <option value="en">en</option>
                <option value="hu">hu</option>
              </select>
            </label>
            <label className="flex items-center gap-2">
              <span className="text-muted">Direction</span>
              <select className="form-input w-24" value={dir} onChange={(e) => setDir(e.target.value as "ltr" | "rtl")}>
                <option value="ltr">ltr</option>
                <option value="rtl">rtl</option>
              </select>
            </label>
          </div>
          <div className={current.id === "catalogue" ? undefined : "p-4"}>
            <React.Suspense fallback={<p className="p-4 text-muted" role="status">Loading…</p>}>
              <Page />
            </React.Suspense>
          </div>
        </ToastProvider>
      </TooltipProvider>
    </LafProvider>
  );
}
