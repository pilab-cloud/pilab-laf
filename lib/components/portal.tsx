import { LayoutGrid, Search, Star } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { portalEn } from "../messages/portal.en";
import { useControllableState } from "../utils";
import { NotificationCenter, type NotificationCenterProps } from "./admin";
import { CommandPalette, type Command } from "./advanced";
import { Badge, type BreadcrumbItemProps } from "./display";
import { AppFooter, AppFrame, Masthead, MastheadActions, MastheadBrand, MastheadContent, MastheadToggle, PageHeader, PageSection, ThemeToggle, type AppFooterProps, type AppFrameProps, type ThemeToggleProps } from "./app-frame";
import { type AppFrameLabels } from "./frame-context";
import { formatHotkey } from "./hotkeys";
import { UserMenu } from "./inventory";
import { Kbd } from "./more";
import { Sidebar, type NavEntry, type NavItem, type NavRenderProps } from "./nav-tree";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./overlay";
import { IconButton } from "./primitives";
import { useLaf } from "../i18n";

const portalDefaults = { portal: portalEn };
export type PortalLabels = (typeof portalEn)["layout"];
export type PortalHomeLabels = (typeof portalEn)["home"];

/* ── Route model ── */
export type PortalParams = Record<string, string>;
type Resolvable<T> = T | ((params: PortalParams) => T);

export interface PortalTab {
  /** Absolute path; prefix-matched, so `/users/:id/audit/page-2` still lights up `/users/:id/audit`. */
  path: string;
  title: string;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface PortalRoute {
  /** Absolute path. `:name` matches one segment (`/users/:id`), a trailing `*` matches the rest. */
  path: string;
  /** Page title, nav label and breadcrumb; may depend on route params (`/users/:id` → the user's name). */
  title: Resolvable<string>;
  icon?: React.ReactNode;
  /** `PageHeader` subtitle. */
  description?: Resolvable<string | undefined>;
  /** Sidebar heading this top-level route is grouped under. */
  section?: string;
  /** Keep it out of the sidebar (detail pages); the nearest visible ancestor stays highlighted. */
  hidden?: boolean;
  badge?: React.ReactNode;
  disabled?: boolean;
  /** Nested routes: an expandable nav group and the parents in the breadcrumb. Give the group an overview child to keep its own page reachable. */
  children?: PortalRoute[];
  /** Tabs in the page header; the tab paths belong to this route. */
  tabs?: PortalTab[];
  /** Badges next to the page title / actions at the end of the header. */
  badges?: Resolvable<React.ReactNode>;
  actions?: Resolvable<React.ReactNode>;
  /** `false` renders no `PageHeader` and breadcrumb (the page brings its own, e.g. `PortalHome`). */
  header?: boolean;
}

export interface PortalMatch {
  /** Root → leaf routes that contain the path. */
  chain: PortalRoute[];
  route: PortalRoute | undefined;
  tab: PortalTab | undefined;
  params: PortalParams;
}

const segmentsOf = (p: string) => p.split(/[?#]/)[0]!.split("/").filter(Boolean);

function matchPattern(pattern: string, path: string, end: boolean): PortalParams | null {
  const pat = segmentsOf(pattern);
  const seg = segmentsOf(path);
  const params: PortalParams = {};
  for (let i = 0; i < pat.length; i++) {
    const p = pat[i]!;
    if (p === "*") return params;
    const s = seg[i];
    if (s === undefined) return null;
    if (p.startsWith(":")) {
      try {
        params[p.slice(1)] = decodeURIComponent(s);
      } catch {
        params[p.slice(1)] = s;
      }
    } else if (p !== s) return null;
  }
  return end && seg.length !== pat.length ? null : params;
}

/** Finds the route (and tab) a pathname belongs to: an exact match wins, else the most specific prefix. The root path only matches exactly. */
export function resolvePortalRoute(routes: PortalRoute[], path: string): PortalMatch {
  interface Candidate {
    chain: PortalRoute[];
    tab?: PortalTab;
    pattern: string;
  }
  const all: Candidate[] = [];
  const walk = (list: PortalRoute[], parents: PortalRoute[]) => {
    for (const r of list) {
      const chain = [...parents, r];
      all.push({ chain, pattern: r.path });
      r.tabs?.forEach((tab) => all.push({ chain, tab, pattern: tab.path }));
      if (r.children) walk(r.children, chain);
    }
  };
  walk(routes, []);
  const depth = (c: Candidate) => segmentsOf(c.pattern).length;
  let best: { c: Candidate; params: PortalParams; exact: boolean } | undefined;
  for (const c of all) {
    const exactParams = matchPattern(c.pattern, path, true);
    const params = exactParams ?? (depth(c) > 0 ? matchPattern(c.pattern, path, false) : null);
    if (!params) continue;
    const exact = exactParams !== null;
    if (!best || (exact && !best.exact) || (exact === best.exact && depth(c) > depth(best.c))) best = { c, params, exact };
  }
  if (!best) return { chain: [], route: undefined, tab: undefined, params: {} };
  return { chain: best.c.chain, route: best.c.chain[best.c.chain.length - 1], tab: best.c.tab, params: best.params };
}

const resolve = <T,>(v: Resolvable<T>, params: PortalParams): T => (typeof v === "function" ? (v as (p: PortalParams) => T)(params) : v);

/** Links rendered by the layout; spread everything onto your router's `<Link to={to}>`. */
export type PortalLinkProps = React.HTMLAttributes<HTMLElement> & { to: string; href: string; className?: string; children?: React.ReactNode; "aria-current"?: "page" };
export type PortalLinkRenderer = (props: PortalLinkProps) => React.ReactElement;

const plainClick = (e: React.MouseEvent) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

/** Breadcrumb trail of a match: `home` › parents › current page (› tab). Empty on the home route. */
export function portalBreadcrumbs(
  routes: PortalRoute[],
  path: string,
  opts: { homeLabel: string; homePath?: string; link?: (to: string) => Omit<BreadcrumbItemProps, "label"> },
): BreadcrumbItemProps[] {
  const m = resolvePortalRoute(routes, path);
  const homePath = opts.homePath ?? "/";
  const link = (to: string, label: string): BreadcrumbItemProps => ({ label, ...opts.link?.(to) });
  const crumbs: BreadcrumbItemProps[] = [];
  const rootIsHome = m.chain[0]?.path === homePath;
  if (!rootIsHome) crumbs.push(link(homePath, opts.homeLabel));
  m.chain.forEach((r, i) => {
    const last = i === m.chain.length - 1 && !(m.tab && m.tab.path !== r.path);
    const label = resolve(r.title, m.params);
    crumbs.push(last ? { label } : link(concretePath(r.path, m.params), label));
  });
  if (m.tab && m.route && m.tab.path !== m.route.path) crumbs.push({ label: m.tab.title });
  return crumbs.length > 1 ? crumbs : [];
}

/** Fills `:param` segments from the matched params; wildcard routes link to their static prefix. */
const concretePath = (pattern: string, params: PortalParams) =>
  "/" +
  segmentsOf(pattern)
    .filter((s) => s !== "*")
    .map((s) => (s.startsWith(":") ? encodeURIComponent(params[s.slice(1)] ?? s) : s))
    .join("/");

/** Sidebar model of a route tree: sections become headings, `current` follows the matched route. */
export function portalNavEntries(routes: PortalRoute[], path: string, opts: { link?: (route: PortalRoute) => Pick<NavItem, "href" | "onSelect" | "render"> } = {}): NavEntry[] {
  const m = resolvePortalRoute(routes, path);
  const currentRoute = [...m.chain].reverse().find((r) => !r.hidden);
  const build = (r: PortalRoute): NavItem => {
    const kids = r.children?.filter((c) => !c.hidden).map(build);
    const title = resolve(r.title, {});
    return {
      id: r.path,
      label: title,
      textValue: title,
      icon: r.icon,
      badge: r.badge,
      disabled: r.disabled,
      current: r === currentRoute,
      ...(kids?.length ? { children: kids } : opts.link?.(r)),
    };
  };
  const out: NavEntry[] = [];
  let section: string | undefined;
  routes
    .filter((r) => !r.hidden)
    .forEach((r, i) => {
      if (r.section !== section) {
        if (r.section) out.push({ type: "heading", id: `section-${r.section}`, label: r.section });
        else if (i > 0) out.push({ type: "divider" });
        section = r.section;
      }
      out.push(build(r));
    });
  return out;
}

/* ── App model ── */
export interface PortalApp {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  /** Opens in a new tab. */
  external?: boolean;
  badge?: React.ReactNode;
  /** Initial favourite state for `PortalHome` when `favourites` is not controlled. */
  favourite?: boolean;
  /** When the user last opened it (`PortalHome` › Recent apps). */
  lastOpened?: Date | string | number;
  onSelect?: (app: PortalApp) => void;
}

function appLink(app: PortalApp, onOpen?: (app: PortalApp) => void) {
  const handler = (e: React.MouseEvent<HTMLElement>) => {
    app.onSelect?.(app);
    onOpen?.(app);
    if ((app.onSelect || onOpen) && !app.href && !e.defaultPrevented) e.preventDefault();
  };
  return {
    href: app.href,
    onClick: handler,
    ...(app.external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };
}

/* ── AppSwitcher ── */
export interface AppSwitcherProps {
  apps: PortalApp[];
  /** Id of the app the user is in now; marked with `aria-current`. */
  current?: string;
  onSelect?: (app: PortalApp) => void;
  /** Footer link to the launchpad. */
  allApps?: { href?: string; onClick?: (e: React.MouseEvent<HTMLElement>) => void };
  labels?: Partial<PortalLabels>;
}

/** Masthead grid menu of the portal's apps. */
export function AppSwitcher({ apps, current, onSelect, allApps, labels }: AppSwitcherProps) {
  const L = { ...useLafDefaults(portalDefaults).t.components.portal.layout, ...labels };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton label={L.appSwitcher} icon={<LayoutGrid className="size-4" />} />
      </PopoverTrigger>
      <PopoverContent align="end" title={L.appSwitcherTitle} className="w-[min(26rem,calc(100vw-2rem))] p-3">
        {apps.length === 0 ? (
          <p className="m-0 text-sm text-muted">{L.noApps}</p>
        ) : (
          <ul className="m-0 grid list-none grid-cols-2 gap-1 p-0 min-[480px]:grid-cols-3">
            {apps.map((app) => (
              <li key={app.id}>
                <PopoverClose asChild>
                  <a
                    {...appLink(app, onSelect)}
                    aria-current={app.id === current ? "true" : undefined}
                    className="flex h-full flex-col items-start gap-1.5 rounded-md border border-transparent p-2.5 text-start text-fg no-underline outline-none hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary/50 aria-[current=true]:border-line-strong aria-[current=true]:bg-primary-light"
                  >
                    <span aria-hidden className="flex text-primary [&>svg]:size-6">
                      {app.icon}
                    </span>
                    <span className="text-sm font-semibold">{app.name}</span>
                    {app.description && <span className="text-xs text-muted">{app.description}</span>}
                    {app.id === current && <span className="sr-only">({L.currentApp})</span>}
                    {app.external && <span className="sr-only">({L.external})</span>}
                  </a>
                </PopoverClose>
              </li>
            ))}
          </ul>
        )}
        {allApps && (
          <div className="mt-2 border-t border-line pt-2 text-sm">
            <a href={allApps.href} onClick={allApps.onClick} className="rounded-sm text-primary no-underline hover:underline focus-visible:ring-2 focus-visible:ring-primary/50">
              {L.allApps}
            </a>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

/* ── PortalLayout ── */
export interface PortalUser {
  name: string;
  email?: string;
  tenant?: string;
  avatarSrc?: string;
  items?: { id: string; label: string; icon?: React.ReactNode; onSelect: () => void }[];
  onSignOut?: () => void;
}

export interface PortalSearch {
  /** Extra commands next to the automatic page and app commands. */
  commands?: Command[];
  /** Async source (people, documents …), merged into the palette results. */
  onSearch?: (query: string) => Promise<Command[]>;
  recent?: Command[];
  placeholder?: string;
}

export interface PortalPageContext {
  route: PortalRoute | undefined;
  tab: PortalTab | undefined;
  params: PortalParams;
  breadcrumbs: BreadcrumbItemProps[];
  title: string;
}

export interface PortalLayoutProps extends Pick<AppFrameProps, "persistKey" | "sidebarCollapse" | "drawer" | "drawerPlacement" | "className"> {
  brand: { logo?: React.ReactNode; title: React.ReactNode; subtitle?: React.ReactNode };
  routes: PortalRoute[];
  /** Current pathname (`useLocation().pathname`). */
  path: string;
  /** Called for plain left-clicks on links instead of a full page load. Omit to let `href`s navigate normally. */
  onNavigate?: (path: string) => void;
  /** Router `<Link>` escape hatch for nav items, breadcrumbs, tabs and the brand. */
  render?: PortalLinkRenderer;
  /** `path` → `href` (base paths, hash routers …). Default: identity. */
  hrefFor?: (path: string) => string;
  /** Route of the brand link and the first breadcrumb. Default `/`. */
  homePath?: string;
  /** Apps of the switcher (and of the palette). */
  apps?: PortalApp[];
  currentApp?: string;
  onAppSelect?: (app: PortalApp) => void;
  allAppsPath?: string;
  /** `false` removes the search trigger and palette. */
  search?: false | PortalSearch;
  notifications?: NotificationCenterProps;
  user?: PortalUser;
  /** `false` hides the toggle. */
  theme?: false | ThemeToggleProps;
  /** Extra masthead actions before the built-ins. */
  mastheadActions?: React.ReactNode;
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  /** `AppFooter` props or your own element. */
  footer?: AppFooterProps | React.ReactElement;
  /** Replaces the route-derived `PageHeader`; `false` removes it. */
  pageHeader?: false | React.ReactNode | ((ctx: PortalPageContext) => React.ReactNode);
  /** Page header actions; the route's own `actions` win. */
  pageActions?: React.ReactNode;
  labels?: Partial<PortalLabels>;
  frameLabels?: Partial<AppFrameLabels>;
  children?: React.ReactNode;
}

/**
 * Multi-app portal shell on top of `AppFrame`: masthead (brand, global search palette, app switcher, notifications,
 * theme, user menu), a sidebar built from `routes`, and a `PageHeader` whose breadcrumb, title and tabs follow the
 * current `path`. Router-agnostic: pass `path`, `onNavigate` and optionally `render` for your `<Link>`.
 */
export function PortalLayout({
  brand,
  routes,
  path,
  onNavigate,
  render,
  hrefFor = (p) => p,
  homePath = "/",
  apps,
  currentApp,
  onAppSelect,
  allAppsPath,
  search,
  notifications,
  user,
  theme,
  mastheadActions,
  sidebarHeader,
  sidebarFooter,
  footer,
  pageHeader,
  pageActions,
  labels,
  frameLabels,
  persistKey,
  sidebarCollapse,
  drawer,
  drawerPlacement,
  className,
  children,
}: PortalLayoutProps) {
  const { t } = useLafDefaults(portalDefaults);
  const L = { ...t.components.portal.layout, ...labels };
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  const go = React.useCallback(
    (to: string, e?: React.MouseEvent) => {
      if (!onNavigate) return;
      if (e) {
        if (!plainClick(e)) return;
        e.preventDefault();
      }
      onNavigate(to);
    },
    [onNavigate],
  );
  const linkProps = (to: string) => ({ href: hrefFor(to), onClick: (e: React.MouseEvent<HTMLElement>) => go(to, e) });
  const link = (to: string): Omit<BreadcrumbItemProps, "label"> => ({
    ...linkProps(to),
    ...(render ? { render: (p) => render({ ...p, to, href: hrefFor(to) }) } : {}),
  });

  const match = React.useMemo(() => resolvePortalRoute(routes, path), [routes, path]);
  const breadcrumbs = React.useMemo(() => portalBreadcrumbs(routes, path, { homeLabel: L.home, homePath, link }), [routes, path, L.home, homePath, hrefFor, render, onNavigate]); // eslint-disable-line react-hooks/exhaustive-deps
  const navItems = React.useMemo(
    () =>
      portalNavEntries(routes, path, {
        link: (r) => ({
          href: hrefFor(r.path),
          onSelect: () => go(r.path),
          ...(render ? { render: (p: NavRenderProps) => render({ ...p, to: r.path, href: p.href ?? hrefFor(r.path) } as PortalLinkProps) } : {}),
        }),
      }),
    [routes, path, hrefFor, go, render],
  );

  const title = match.route ? resolve(match.route.title, match.params) : "";
  const ctx: PortalPageContext = { route: match.route, tab: match.tab, params: match.params, breadcrumbs, title };

  const commands = React.useMemo<Command[]>(() => {
    const flat: PortalRoute[] = [];
    const walk = (list: PortalRoute[]) => list.forEach((r) => (r.disabled || (!r.path.includes(":") && !r.path.includes("*") && flat.push(r), r.children && walk(r.children))));
    walk(routes);
    return [
      ...flat.map((r) => ({ id: `page:${r.path}`, label: resolve(r.title, {}), group: L.pages, onSelect: () => (onNavigate ? onNavigate(r.path) : window.location.assign(hrefFor(r.path))) })),
      ...(apps ?? []).map((a) => ({
        id: `app:${a.id}`,
        label: a.name,
        group: L.apps,
        onSelect: () => {
          a.onSelect?.(a);
          onAppSelect?.(a);
          if (!a.onSelect && !onAppSelect && a.href) window.location.assign(a.href);
        },
      })),
      ...(search ? (search.commands ?? []) : []),
    ];
  }, [routes, apps, search, L.pages, L.apps, onNavigate, onAppSelect, hrefFor]);

  const mastheadBrand = (
    <MastheadBrand
      logo={brand.logo}
      title={brand.title}
      subtitle={brand.subtitle}
      href={hrefFor(homePath)}
      onClick={onNavigate ? (e) => go(homePath, e) : undefined}
      render={render ? (p) => render({ ...p, to: homePath, href: p.href ?? hrefFor(homePath) }) : undefined}
    />
  );

  const shortcut = formatHotkey("mod+k");
  const placeholder = (search && search.placeholder) || L.searchPlaceholder;
  const masthead = (
    <Masthead>
      <MastheadToggle labels={frameLabels} />
      {mastheadBrand}
      <MastheadContent>
        {search !== false && (
          <>
            <button
              type="button"
              aria-keyshortcuts="Control+K Meta+K"
              onClick={() => setPaletteOpen(true)}
              className="mx-auto hidden w-full max-w-md items-center gap-2 rounded-md border border-line bg-input px-3 py-1.5 text-start text-sm text-muted outline-none hover:border-line-strong focus-visible:ring-2 focus-visible:ring-primary/50 min-[720px]:flex"
            >
              <Search aria-hidden className="size-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{placeholder}</span>
              <Kbd aria-hidden>{shortcut}</Kbd>
            </button>
            <span className="ms-auto min-[720px]:hidden">
              <IconButton label={L.search} icon={<Search className="size-4" />} onClick={() => setPaletteOpen(true)} />
            </span>
          </>
        )}
      </MastheadContent>
      <MastheadActions className={search === false ? undefined : "ms-0"}>
        {mastheadActions}
        {apps && apps.length > 0 && (
          <AppSwitcher
            apps={apps}
            current={currentApp}
            onSelect={onAppSelect}
            labels={labels}
            allApps={allAppsPath ? { href: hrefFor(allAppsPath), onClick: (e) => go(allAppsPath, e) } : undefined}
          />
        )}
        {theme !== false && <ThemeToggle persistKey={persistKey ? `${persistKey}:theme` : undefined} labels={frameLabels} {...theme} />}
        {notifications && <NotificationCenter {...notifications} />}
        {user && <UserMenu name={user.name} email={user.email} tenant={user.tenant} avatarSrc={user.avatarSrc} items={user.items} onSignOut={user.onSignOut ?? (() => {})} />}
      </MastheadActions>
    </Masthead>
  );

  const route = match.route;
  const tabs = route?.tabs;
  const header = (() => {
    if (pageHeader === false || route?.header === false) return null;
    if (pageHeader !== undefined) return typeof pageHeader === "function" ? pageHeader(ctx) : pageHeader;
    if (!route) return null;
    return (
      <>
        <PageHeader
          breadcrumb={breadcrumbs.length ? breadcrumbs : undefined}
          icon={route.icon}
          title={title}
          subtitle={resolve(route.description, match.params)}
          badges={resolve(route.badges, match.params)}
          actions={resolve(route.actions, match.params) ?? pageActions}
          className={tabs?.length ? "pb-2" : undefined}
        />
        {tabs && tabs.length > 0 && <PortalTabs tabs={tabs} current={match.tab?.path ?? route.path} linkProps={linkProps} render={render} label={L.pageSections} />}
      </>
    );
  })();

  const footerNode = footer && (React.isValidElement(footer) ? footer : <AppFooter {...(footer as AppFooterProps)} />);

  return (
    <>
      <AppFrame
        className={className}
        persistKey={persistKey}
        sidebarCollapse={sidebarCollapse}
        drawer={drawer}
        drawerPlacement={drawerPlacement}
        labels={frameLabels}
        masthead={masthead}
        sidebar={<Sidebar items={navItems} label={L.navigation} header={sidebarHeader} footer={sidebarFooter} labels={frameLabels} />}
        pageHeader={header}
        footer={footerNode || undefined}
      >
        {children}
      </AppFrame>
      {search !== false && <CommandPalette commands={commands} open={paletteOpen} onOpenChange={setPaletteOpen} placeholder={placeholder} search={search?.onSearch} recent={search?.recent} />}
    </>
  );
}

/** Route tabs: links (not an ARIA tablist) so they stay real navigation; the current one carries `aria-current`. */
function PortalTabs({ tabs, current, linkProps, render, label }: { tabs: PortalTab[]; current: string; linkProps: (to: string) => { href: string; onClick: (e: React.MouseEvent<HTMLElement>) => void }; render?: PortalLinkRenderer; label: string }) {
  return (
    <nav aria-label={label} className="px-6 max-[859px]:px-4">
      <ul className="m-0 flex list-none gap-1 overflow-x-auto border-b border-line p-0">
        {tabs.map((tab) => {
          const p = linkProps(tab.path);
          const props = {
            ...p,
            className: "-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted no-underline outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50 aria-[current=page]:border-primary aria-[current=page]:text-fg aria-disabled:pointer-events-none aria-disabled:opacity-50",
            children: (
              <>
                {tab.title}
                {tab.badge && <Badge>{tab.badge}</Badge>}
              </>
            ),
            ...(tab.path === current ? { "aria-current": "page" as const } : {}),
            ...(tab.disabled ? { "aria-disabled": true } : {}),
          };
          return <li key={tab.path}>{render ? render({ ...props, to: tab.path }) : <a {...props} />}</li>;
        })}
      </ul>
    </nav>
  );
}

/* ── PortalHome ── */
export interface PortalAnnouncement {
  id: string;
  title: string;
  body?: React.ReactNode;
  date?: Date | string | number;
  tone?: "info" | "ok" | "warn" | "danger";
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface PortalQuickAction {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  onSelect?: () => void;
}

export interface PortalHomeProps {
  /** Greets by name; `title` overrides the greeting. */
  user?: { name: string };
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  apps: PortalApp[];
  /** Favourite app ids (controlled); uncontrolled starts from the apps' `favourite` flags. */
  favourites?: string[];
  onFavouritesChange?: (ids: string[]) => void;
  /** Called when an app card is opened (e.g. to record "recent"). */
  onAppOpen?: (app: PortalApp) => void;
  /** Recent apps in display order; default: apps with `lastOpened`, newest first. */
  recent?: PortalApp[];
  announcements?: PortalAnnouncement[];
  onDismissAnnouncement?: (id: string) => void;
  quickActions?: PortalQuickAction[];
  labels?: Partial<PortalHomeLabels>;
  className?: string;
}

const toneBorder = { info: "border-s-primary", ok: "border-s-ok", warn: "border-s-warn", danger: "border-s-danger" } as const;

function AppCard({ app, favourite, onToggle, onOpen, L, opened }: { app: PortalApp; favourite: boolean; onToggle: () => void; onOpen?: (app: PortalApp) => void; L: PortalHomeLabels & { openApp: (name: string) => string }; opened?: string }) {
  return (
    <li className="relative flex min-w-0 items-start gap-3 rounded-md border border-line bg-surface p-4 hover:bg-surface-hover">
      <span aria-hidden className="flex shrink-0 text-primary [&>svg]:size-8">
        {app.icon}
      </span>
      <div className="min-w-0 flex-1 pe-8">
        <a
          {...appLink(app, onOpen)}
          className="text-base font-semibold text-fg no-underline outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-primary/50 hover:underline"
        >
          {app.name}
          {app.external && <span className="sr-only"> ({L.openApp(app.name)})</span>}
        </a>
        {app.description && <p className="m-0 mt-1 text-sm text-muted">{app.description}</p>}
        {opened && <p className="m-0 mt-1 text-xs text-subtle">{opened}</p>}
      </div>
      {app.badge && <span className="shrink-0">{app.badge}</span>}
      <button
        type="button"
        aria-pressed={favourite}
        aria-label={favourite ? L.removeFavourite(app.name) : L.addFavourite(app.name)}
        onClick={onToggle}
        className="absolute end-2 top-2 z-10 inline-flex size-7 items-center justify-center rounded-sm border-0 bg-transparent text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50 aria-pressed:text-warn"
      >
        <Star aria-hidden className={cn("size-4", favourite && "fill-current")} />
      </button>
    </li>
  );
}

/** Launchpad: favourite and recent apps, announcements and quick actions. */
export function PortalHome({ user, title, subtitle, apps, favourites, onFavouritesChange, onAppOpen, recent, announcements, onDismissAnnouncement, quickActions, labels, className }: PortalHomeProps) {
  const { format } = useLaf();
  const defaults = useLafDefaults(portalDefaults).t.components.portal;
  const L = { ...defaults.home, openApp: defaults.layout.openApp, ...labels };
  const [favIds, setFavIds] = useControllableState<string[]>({ value: favourites, defaultValue: apps.filter((a) => a.favourite).map((a) => a.id), onChange: onFavouritesChange });
  const favSet = new Set(favIds);
  const toggle = (id: string) => setFavIds(favSet.has(id) ? favIds.filter((x) => x !== id) : [...favIds, id]);
  const time = (a: PortalApp) => (a.lastOpened !== undefined ? L.lastOpened(format.relative(a.lastOpened)) : undefined);
  const recentApps = recent ?? apps.filter((a) => a.lastOpened !== undefined).sort((a, b) => new Date(b.lastOpened!).getTime() - new Date(a.lastOpened!).getTime()).slice(0, 4);
  const favApps = favIds.map((id) => apps.find((a) => a.id === id)).filter((a): a is PortalApp => !!a);
  const grid = "m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3 p-0";
  const heading = "m-0 mb-3 text-base font-semibold text-fg";

  return (
    <div className={className}>
      <PageHeader title={title ?? (user ? L.welcome(user.name) : L.welcomeAnonymous)} subtitle={subtitle ?? L.subtitle} />
      <div className="grid gap-x-8 gap-y-6 px-6 pb-8 max-[859px]:px-4 min-[1100px]:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-6">
          <PageSection padding="none" aria-labelledby="portal-fav">
            <h2 id="portal-fav" className={heading}>
              {L.favourites}
            </h2>
            {favApps.length ? (
              <ul className={grid}>
                {favApps.map((a) => (
                  <AppCard key={a.id} app={a} favourite onToggle={() => toggle(a.id)} onOpen={onAppOpen} L={L} />
                ))}
              </ul>
            ) : (
              <p className="m-0 text-sm text-muted">{L.noFavourites}</p>
            )}
          </PageSection>
          <PageSection padding="none" aria-labelledby="portal-recent">
            <h2 id="portal-recent" className={heading}>
              {L.recent}
            </h2>
            {recentApps.length ? (
              <ul className={grid}>
                {recentApps.map((a) => (
                  <AppCard key={a.id} app={a} favourite={favSet.has(a.id)} onToggle={() => toggle(a.id)} onOpen={onAppOpen} L={L} opened={time(a)} />
                ))}
              </ul>
            ) : (
              <p className="m-0 text-sm text-muted">{L.noRecent}</p>
            )}
          </PageSection>
          <PageSection padding="none" aria-labelledby="portal-all">
            <h2 id="portal-all" className={heading}>
              {L.allApps}
            </h2>
            <ul className={grid}>
              {apps.map((a) => (
                <AppCard key={a.id} app={a} favourite={favSet.has(a.id)} onToggle={() => toggle(a.id)} onOpen={onAppOpen} L={L} />
              ))}
            </ul>
          </PageSection>
        </div>
        <div className="grid min-w-0 content-start gap-6">
          {quickActions && quickActions.length > 0 && (
            <PageSection padding="none" aria-labelledby="portal-quick">
              <h2 id="portal-quick" className={heading}>
                {L.quickActions}
              </h2>
              <ul className="m-0 grid list-none gap-2 p-0">
                {quickActions.map((q) => {
                  const body = (
                    <>
                      {q.icon && (
                        <span aria-hidden className="flex shrink-0 text-primary [&>svg]:size-5">
                          {q.icon}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-fg">{q.label}</span>
                        {q.description && <span className="block text-xs text-muted">{q.description}</span>}
                      </span>
                    </>
                  );
                  const cls = "flex w-full items-center gap-3 rounded-md border border-line bg-surface p-3 text-start no-underline outline-none hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-primary/50";
                  return (
                    <li key={q.id}>
                      {q.href ? (
                        <a href={q.href} onClick={q.onSelect} className={cls}>
                          {body}
                        </a>
                      ) : (
                        <button type="button" onClick={q.onSelect} className={cls}>
                          {body}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </PageSection>
          )}
          <PageSection padding="none" aria-labelledby="portal-news">
            <h2 id="portal-news" className={heading}>
              {L.announcements}
            </h2>
            {announcements && announcements.length > 0 ? (
              <ul className="m-0 grid list-none gap-2 p-0">
                {announcements.map((n) => (
                  <li key={n.id} className={cn("relative rounded-md border border-s-4 border-line bg-surface p-3", toneBorder[n.tone ?? "info"])}>
                    <div className={cn("flex items-start gap-2", onDismissAnnouncement && "pe-8")}>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-fg">
                          {n.href || n.onClick ? (
                            <a href={n.href} onClick={n.onClick} className="text-fg">
                              {n.title}
                            </a>
                          ) : (
                            n.title
                          )}
                        </div>
                        {n.body && <div className="mt-1 text-sm text-muted">{n.body}</div>}
                        {n.date !== undefined && (
                          <time dateTime={new Date(n.date).toISOString()} className="mt-1 block text-xs text-subtle">
                            {format.relative(n.date)}
                          </time>
                        )}
                      </div>
                    </div>
                    {onDismissAnnouncement && (
                      <button
                        type="button"
                        aria-label={L.dismiss(n.title)}
                        onClick={() => onDismissAnnouncement(n.id)}
                        className="absolute end-2 top-2 inline-flex size-6 items-center justify-center rounded-sm border-0 bg-transparent text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50"
                      >
                        <span aria-hidden>×</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="m-0 text-sm text-muted">{L.noAnnouncements}</p>
            )}
          </PageSection>
        </div>
      </div>
    </div>
  );
}
