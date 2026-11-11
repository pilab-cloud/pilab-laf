import { Bell, Box, Code2, KeyRound, Lock, Package, PlusCircle, RefreshCw, Search, ServerCog, ShieldCheck, Gauge } from "lucide-react";
import * as React from "react";
import {
  AppFooter,
  AppFrame,
  Badge,
  Breadcrumb,
  Button,
  DrawerPanel,
  Masthead,
  MastheadActions,
  MastheadBrand,
  MastheadContent,
  MastheadToggle,
  NotificationCenter,
  PageHeader,
  PageSection,
  Panel,
  SearchInput,
  Sidebar,
  StatusDot,
  ThemeToggle,
  UserMenu,
  type NavEntry,
  type NotificationItem,
  type TreeNode,
} from "../../lib";

type Tab = "dashboard" | "repos" | "packages" | "oci" | "tokens" | "acl" | "audit";

const icon = (I: typeof Box) => <I aria-hidden />;

const titles: Record<Tab, { title: string; subtitle: string; badge: string; icon: typeof Box }> = {
  dashboard: { title: "Observability & Metrics Dashboard", subtitle: "Platform telemetry and storage accounting with on-upload deduplication.", badge: "prometheus live", icon: Gauge },
  repos: { title: "Go Vanity Repositories", subtitle: "Configured Go module vanity paths hosted via the proxy (go.pilab.hu).", badge: "vanity", icon: Code2 },
  packages: { title: "Software Packages", subtitle: "Packages published across Debian, RPM, Arch Linux and Alpine repositories.", badge: "multi-distro", icon: Package },
  oci: { title: "OCI & Helm Registry", subtitle: "OCI Distribution Spec registry for container images and Helm 3 charts.", badge: "v2 distribution", icon: Box },
  tokens: { title: "Personal Access Tokens", subtitle: "Manage tokens for API operations, Git authentication and CI/CD pipelines.", badge: "security", icon: KeyRound },
  acl: { title: "Access Control Lists (ACL)", subtitle: "Granular authorization policies with instant dynamic reload.", badge: "dynamic engine", icon: ShieldCheck },
  audit: { title: "Security Audit Log (SIEM)", subtitle: "Structured audit stream with real-time filtering and violation telemetry.", badge: "siem stream", icon: Lock },
};

const formats = [
  { id: "packages-all", label: "All formats" },
  { id: "packages-deb", label: "Debian / Ubuntu (.deb)" },
  { id: "packages-rpm", label: "RPM / RHEL / Fedora (.rpm)" },
  { id: "packages-arch", label: "Arch Linux (.pkg.tar.zst)" },
  { id: "packages-alpine", label: "Alpine Linux (.apk)" },
];

const objects: TreeNode[] = [
  { id: "go", label: "go.pilab.hu", icon: icon(Code2), children: [{ id: "go-laf", label: "pilab/laf" }, { id: "go-sso", label: "pilab/shadow-sso" }] },
  { id: "pkg", label: "Packages", icon: icon(Package), children: [{ id: "pkg-deb", label: "deb", children: [{ id: "pkg-deb-1", label: "repisitory_1.4.0_amd64.deb" }] }, { id: "pkg-rpm", label: "rpm" }] },
  { id: "oci", label: "OCI", icon: icon(Box), status: "success", children: [{ id: "oci-1", label: "pilab/repisitory:1.4.0", status: "success" }, { id: "oci-2", label: "pilab/gateway:0.9.2", status: "warning" }] },
];

const notifications: NotificationItem[] = [
  { id: "n1", title: "Denied push to go.pilab.hu/pilab/laf", body: "token ci-runner lacks write scope", time: "2026-01-15T11:40:00Z", unread: true },
  { id: "n2", title: "Policy reloaded", time: "2026-01-15T09:05:00Z" },
];

/** Repisitory-style console: masthead, collapsible sidebar (nav + object tree), page header, footer and a side drawer. */
export default function AppFrameDemo() {
  const [tab, setTab] = React.useState<Tab>("packages");
  const [format, setFormat] = React.useState("packages-all");
  const [detail, setDetail] = React.useState(false);
  const page = titles[tab];
  const PageIcon = page.icon;

  const go = (t: Tab) => setTab(t);
  const items: NavEntry[] = [
    { type: "heading", id: "artifacts", label: "Artifacts" },
    { id: "dashboard", label: "Dashboard", icon: icon(Gauge), badge: <Badge tone="primary">Live</Badge>, current: tab === "dashboard", onSelect: () => go("dashboard") },
    { id: "repos", label: "Go Repositories", icon: icon(Code2), badge: <Badge>3</Badge>, current: tab === "repos", onSelect: () => go("repos") },
    {
      id: "packages",
      label: "Software Packages",
      icon: icon(Package),
      badge: <Badge>12</Badge>,
      children: formats.map((f) => ({
        id: f.id,
        label: f.label,
        current: tab === "packages" && format === f.id,
        onSelect: () => {
          go("packages");
          setFormat(f.id);
        },
      })),
    },
    { id: "oci", label: "OCI & Helm Charts", icon: icon(Box), badge: <Badge>7</Badge>, current: tab === "oci", onSelect: () => go("oci") },
    { type: "divider" },
    { type: "heading", id: "security", label: "Security" },
    { id: "tokens", label: "Personal Access Tokens", icon: icon(KeyRound), badge: <Badge>4</Badge>, current: tab === "tokens", onSelect: () => go("tokens") },
    { id: "acl", label: "Access Control (ACL)", icon: icon(ShieldCheck), badge: <Badge>18</Badge>, current: tab === "acl", onSelect: () => go("acl") },
    { id: "audit", label: "Security Audit (SIEM)", icon: icon(Lock), badge: <Badge>126</Badge>, current: tab === "audit", onSelect: () => go("audit") },
    { id: "docs", label: "Archived mirror", icon: icon(ServerCog), disabled: true },
  ];

  return (
    <AppFrame
      className="h-[720px] overflow-hidden rounded-lg border border-line"
      persistKey="laf-demo-app-frame"
      sidebarCollapse="rail"
      masthead={
        <Masthead>
          <MastheadToggle />
          <MastheadBrand
            href="#"
            onClick={(e) => {
              e.preventDefault();
              go("dashboard");
            }}
            logo={<span className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-on-primary">R</span>}
            title="Repisitory"
            subtitle="PiLab Artifact Platform"
          />
          <MastheadContent>
            <Badge tone="primary" className="max-[640px]:hidden">
              repo.pilab.hu
            </Badge>
            <SearchInput icon={<Search aria-hidden />} placeholder="Search artifacts…" aria-label="Search artifacts" className="mx-auto hidden max-w-md min-[640px]:block" />
          </MastheadContent>
          <MastheadActions>
            <ThemeToggle persistKey="laf-demo-theme" />
            <NotificationCenter items={notifications} />
            <UserMenu name="Gyula Paal" email="gyula@pilab.hu" onSignOut={() => {}} />
          </MastheadActions>
        </Masthead>
      }
      sidebar={
        <Sidebar
          items={items}
          label="Main navigation"
          tree={{ label: "Object tree", nodes: objects, defaultExpanded: ["go", "oci"] }}
          footer={
            <div className="grid gap-1 text-xs">
              <span>
                Environment: <strong className="text-fg">Local Dev</strong>
              </span>
              <span>
                API: <strong className="text-fg">ConnectRPC (v1)</strong>
              </span>
            </div>
          }
          railFooter={<StatusDot tone="ok" label="Local Dev" srOnly />}
        />
      }
      breadcrumb={
        <Breadcrumb
          items={[
            { label: "Repisitory", href: "#", onClick: (e) => (e.preventDefault(), go("dashboard")) },
            { label: page.title.replace(" Dashboard", ""), current: true },
          ]}
        />
      }
      pageHeader={
        <PageHeader
          icon={<PageIcon />}
          title={page.title}
          subtitle={page.subtitle}
          badges={<Badge tone="primary">{page.badge}</Badge>}
          help={{ href: "#help" }}
          actions={
            <>
              <Button variant="secondary" leftIcon={<RefreshCw aria-hidden />}>
                Refresh
              </Button>
              <Button leftIcon={<PlusCircle aria-hidden />} onClick={() => setDetail(true)}>
                Details
              </Button>
            </>
          }
        />
      }
      footer={<AppFooter copyright="© 2026 Pilab" version="1.4.0" build={{ commit: "a1b2c3d", env: "dev" }} links={[{ label: "Docs", href: "#docs" }, { label: "OCI spec", href: "#oci", external: true }]} status={{ tone: "ok", label: "All systems operational" }} />}
      drawer={
        <DrawerPanel open={detail} onOpenChange={setDetail} title="Package details" icon={<Package aria-hidden className="size-4" />} resizable collapsible manageFocus>
          <p>Select a row to inspect checksums, upload history and dependants.</p>
        </DrawerPanel>
      }
    >
      <PageSection aria-label="Overview">
        <Panel title="Recent activity" headingLevel={2} actions={<Bell aria-hidden className="size-4 text-muted" />}>
          <p className="text-sm text-muted">Showing {page.title.toLowerCase()} for the Local Dev environment.</p>
        </Panel>
      </PageSection>
    </AppFrame>
  );
}
