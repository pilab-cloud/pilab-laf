import { Mail } from "lucide-react";
import * as React from "react";
import {
  AppFooter,
  AppFrame,
  Badge,
  Breadcrumb,
  DrawerPanel,
  Masthead,
  MastheadActions,
  MastheadBrand,
  MastheadContent,
  MastheadToggle,
  NotificationCenter,
  PageHeader,
  PageSection,
  Sidebar,
  Skeleton,
  ThemeToggle,
  ToastProvider,
  TooltipProvider,
  UserMenu,
  type NavEntry,
  type NotificationItem,
} from "../../lib";
import { createMockMailApi, type MailApi } from "./mail-admin/api";
import { MailAdminContext, type DrawerSpec } from "./mail-admin/context";
import { ROUTES, routeFor } from "./mail-admin/routes";

const pages: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "/": React.lazy(() => import("./mail-admin/DashboardPage")),
  "/recipients/mailboxes": React.lazy(
    () => import("./mail-admin/MailboxesPage"),
  ),
  "/recipients/groups": React.lazy(() => import("./mail-admin/GroupsPage")),
  "/recipients/resources": React.lazy(
    () => import("./mail-admin/ResourcesPage"),
  ),
  "/mail-flow/queue": React.lazy(() => import("./mail-admin/QueuePage")),
  "/mail-flow/trace": React.lazy(() => import("./mail-admin/TracePage")),
  "/mail-flow/domains": React.lazy(() => import("./mail-admin/DomainsPage")),
  "/mail-flow/policies": React.lazy(() => import("./mail-admin/PoliciesPage")),
  "/protocols": React.lazy(() => import("./mail-admin/ProtocolsPage")),
  "/storage": React.lazy(() => import("./mail-admin/StoragePage")),
  "/contacts": React.lazy(() => import("./mail-admin/ContactsPage")),
  "/audit": React.lazy(() => import("./mail-admin/AuditPage")),
  "/settings": React.lazy(() => import("./mail-admin/SettingsPage")),
};

const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "TLS certificate expires in 9 days",
    body: "mail.pilab.example",
    time: "2026-01-15T08:00:00Z",
    unread: true,
  },
  { id: "n2", title: "Outbound queue drained", time: "2026-01-14T22:10:00Z" },
];

const readPath = () =>
  typeof window === "undefined"
    ? "/"
    : window.location.hash.replace(/^#/, "") || "/";

export interface MailAdminProps {
  /** Backend; defaults to a fresh in-memory mock. Pass connect-rpc backed clients in a real app. */
  api?: MailApi;
  /** Initial route when the URL carries no hash. */
  initialPath?: string;
  className?: string;
}

export default function MailAdmin({
  api: apiProp,
  initialPath,
  className = "h-[760px] overflow-hidden rounded-lg border border-line",
}: MailAdminProps) {
  const api = React.useMemo(() => apiProp ?? createMockMailApi(), [apiProp]);
  const [path, setPath] = React.useState(() =>
    typeof window !== "undefined" && window.location.hash
      ? readPath()
      : (initialPath ?? "/"),
  );
  const [drawer, setDrawer] = React.useState<DrawerSpec | null>(null);
  const [version, setVersion] = React.useState(0);

  React.useEffect(() => {
    const onHash = () => setPath(readPath());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = React.useCallback((to: string) => {
    setDrawer(null);
    setPath(to);
    window.history.pushState(null, "", `#${to}`);
  }, []);
  const bump = React.useCallback(() => setVersion((v) => v + 1), []);
  const closeDrawer = React.useCallback(() => setDrawer(null), []);

  const ctx = React.useMemo(
    () => ({
      api,
      path,
      navigate,
      openDrawer: setDrawer,
      closeDrawer,
      version,
      bump,
    }),
    [api, path, navigate, closeDrawer, version, bump],
  );

  const route = routeFor(path);
  const Page = pages[route.path]!;

  const items = React.useMemo<NavEntry[]>(() => {
    const out: NavEntry[] = [];
    let section = "";
    for (const r of ROUTES) {
      if (r.section !== section) {
        section = r.section;
        out.push({ type: "heading", id: `h-${section}`, label: section });
      }
      out.push({
        id: r.path,
        label: r.title,
        icon: r.icon,
        href: `#${r.path}`,
        onSelect: () => navigate(r.path),
      });
    }
    return out;
  }, [navigate]);

  return (
    <TooltipProvider>
      <ToastProvider max={3}>
        <MailAdminContext.Provider value={ctx}>
          <AppFrame
            className={className}
            persistKey="laf-demo-mail-admin"
            sidebarCollapse="rail"
            masthead={
              <Masthead>
                <MastheadToggle />
                <MastheadBrand
                  href="#/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  logo={
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary text-on-primary">
                      <Mail aria-hidden className="size-4" />
                    </span>
                  }
                  title="PiMail Admin"
                  subtitle="mail.pilab.hu"
                />
                <MastheadContent>
                  <Badge tone="primary" className="max-[640px]:hidden">
                    Production
                  </Badge>
                </MastheadContent>
                <MastheadActions>
                  <ThemeToggle persistKey="laf-demo-theme" />
                  <NotificationCenter items={notifications} />
                  <UserMenu
                    name="Paál Gyula"
                    email="gyula@pilab.hu"
                    avatarSrc="/paalgyula.jpg"
                    onSignOut={() => {}}
                  />
                </MastheadActions>
              </Masthead>
            }
            sidebar={
              <Sidebar
                items={items}
                current={route.path}
                label="Mail administration"
              />
            }
            breadcrumb={
              <Breadcrumb
                items={[
                  {
                    label: "PiMail",
                    href: "#/",
                    onClick: (e) => (e.preventDefault(), navigate("/")),
                  },
                  ...(route.path === "/" ? [] : [{ label: route.section }]),
                  { label: route.title, current: true },
                ]}
              />
            }
            pageHeader={
              <PageHeader
                icon={route.icon}
                title={route.title}
                subtitle={route.subtitle}
              />
            }
            footer={
              <AppFooter
                copyright="© 2026 Pilab"
                version="0.1.0"
                status={{ tone: "ok", label: "All daemons running" }}
              />
            }
            drawer={
              drawer && (
                <DrawerPanel
                  key={drawer.key}
                  open
                  onOpenChange={(o) => !o && setDrawer(null)}
                  title={drawer.title}
                  icon={drawer.icon}
                  size={drawer.size ?? 560}
                  resizable
                  manageFocus
                >
                  {drawer.content}
                </DrawerPanel>
              )
            }
          >
            <React.Suspense
              fallback={
                <PageSection aria-label="Loading">
                  <Skeleton className="h-40 w-full" />
                </PageSection>
              }
            >
              <Page key={route.path} />
            </React.Suspense>
          </AppFrame>
        </MailAdminContext.Provider>
      </ToastProvider>
    </TooltipProvider>
  );
}
