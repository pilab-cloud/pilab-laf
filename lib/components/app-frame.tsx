import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ExternalLink, Menu, Monitor, Moon, Sun } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { Breadcrumb, type BreadcrumbItemProps } from "./display";
import { AppFrameContext, NARROW_QUERY, readStored, useAppFrame, useAppFrameLabels, useMediaQuery, writeStored, type AppFrameLabels } from "./frame-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./overlay";
import { StatusDot } from "./primitives";

export { useAppFrame };
export type { AppFrameContextValue, AppFrameLabels } from "./frame-context";

/* ── AppFrame ── */
export type DrawerPlacement = "start" | "end" | "bottom" | "left" | "right";

export interface AppFrameProps {
  /** `Masthead` (or any element rendering a `<header>`); sticky at the top. */
  masthead?: React.ReactNode;
  /** `Sidebar`/`NavTree`; collapsible, an overlay below 860px. */
  sidebar?: React.ReactNode;
  /** Rendered above `<main>`, e.g. a `Breadcrumb`. */
  breadcrumb?: React.ReactNode;
  /** Rendered at the top of `<main>`, e.g. a `PageHeader`. */
  pageHeader?: React.ReactNode;
  /** `AppFooter`; stays at the bottom even with short content. */
  footer?: React.ReactNode;
  /** An inline `DrawerPanel` next to (or under) the content. */
  drawer?: React.ReactNode;
  /** Defaults to the `placement` of the `drawer` element, else `end`. */
  drawerPlacement?: DrawerPlacement;
  /** Controlled desktop sidebar state; omit for uncontrolled. The mobile overlay is always internal. */
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  /** What "collapsed" means on desktop: slide away (`hide`) or shrink to an icon rail. */
  sidebarCollapse?: "hide" | "rail";
  /** localStorage key remembering the desktop sidebar state. Read on first render, never at import. */
  persistKey?: string;
  /** Id of `<main>`; the skip link points at it. */
  mainId?: string;
  labels?: Partial<AppFrameLabels>;
  className?: string;
  children?: React.ReactNode;
}

const placementOf = (p: DrawerPlacement | undefined): "start" | "end" | "bottom" => (p === "left" || p === "start" ? "start" : p === "bottom" ? "bottom" : "end");

export function AppFrame({
  masthead,
  sidebar,
  breadcrumb,
  pageHeader,
  footer,
  drawer,
  drawerPlacement,
  sidebarOpen,
  defaultSidebarOpen = true,
  onSidebarOpenChange,
  sidebarCollapse = "hide",
  persistKey,
  mainId: mainIdProp,
  labels,
  className,
  children,
}: AppFrameProps) {
  const l = useAppFrameLabels(labels);
  const uid = React.useId();
  const mainId = mainIdProp ?? `${uid}-main`;
  const sidebarId = `${uid}-sidebar`;
  const isMobile = useMediaQuery(NARROW_QUERY);
  const storageKey = persistKey ? `${persistKey}:sidebar` : undefined;
  const [initialOpen] = React.useState(() => {
    const stored = readStored(storageKey);
    return stored === null ? defaultSidebarOpen : stored === "1";
  });
  const [desktopOpen, setDesktopOpenRaw] = useControllableState<boolean>({ value: sidebarOpen, defaultValue: initialOpen, onChange: onSidebarOpenChange });
  const setDesktopOpen = React.useCallback(
    (open: boolean) => {
      setDesktopOpenRaw(open);
      writeStored(storageKey, open ? "1" : "0");
    },
    [setDesktopOpenRaw, storageKey],
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  const sidebarRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!isMobile || !mobileOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    sidebarRef.current?.querySelector<HTMLElement>('[tabindex="0"], a[href], button:not([disabled])')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [isMobile, mobileOpen]);

  const open = isMobile ? mobileOpen : desktopOpen;
  const rail = !isMobile && sidebarCollapse === "rail" && !desktopOpen;
  const setOpen = React.useCallback((o: boolean) => (isMobile ? setMobileOpen(o) : setDesktopOpen(o)), [isMobile, setDesktopOpen]);
  const ctx = React.useMemo(
    () => ({
      active: true,
      isMobile,
      sidebarOpen: open,
      setSidebarOpen: setOpen,
      toggleSidebar: () => setOpen(!open),
      rail,
      sidebarId,
      mainId,
      navigated: () => setMobileOpen(false),
    }),
    [isMobile, open, setOpen, rail, sidebarId, mainId],
  );

  const placement = placementOf(drawerPlacement ?? (React.isValidElement(drawer) ? (drawer.props as { placement?: DrawerPlacement }).placement : undefined));
  const sidebarVisible = isMobile ? mobileOpen : desktopOpen || sidebarCollapse === "rail";

  return (
    <AppFrameContext.Provider value={ctx}>
      <div className={cn("relative flex h-dvh min-h-0 flex-col overflow-hidden", className)}>
        <a
          href={`#${mainId}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(mainId)?.focus();
          }}
          className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:z-50 focus:rounded-md focus:border focus:border-line-strong focus:bg-menu focus:px-3 focus:py-2 focus:text-fg focus:ring-2 focus:ring-primary"
        >
          {l.skipToContent}
        </a>
        {masthead && <div className="sticky top-0 z-30 shrink-0">{masthead}</div>}
        <div className="relative flex min-h-0 flex-1">
          {sidebar && isMobile && mobileOpen && <div aria-hidden className="absolute inset-0 z-30 bg-[rgba(5,5,10,0.7)]" onClick={() => setMobileOpen(false)} />}
          {sidebar && (
            <div
              ref={sidebarRef}
              id={sidebarId}
              data-sidebar={isMobile ? "overlay" : rail ? "rail" : desktopOpen ? "open" : "closed"}
              className={cn(
                "z-40 flex min-h-0 shrink-0 flex-col border-e border-line bg-[rgba(12,12,16,0.72)] backdrop-blur-md transition-[width] motion-reduce:transition-none",
                isMobile ? "absolute inset-y-0 start-0 w-72 max-w-[85%]" : rail ? "w-14" : "w-64",
                !sidebarVisible && "hidden",
              )}
            >
              {sidebar}
            </div>
          )}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className={cn("relative flex min-h-0 min-w-0 flex-1", placement === "bottom" && "flex-col")}>
              {placement === "start" && drawer}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
                {breadcrumb && <div className="shrink-0 px-6 pt-4 max-[859px]:px-4">{breadcrumb}</div>}
                <main id={mainId} tabIndex={-1} className="min-w-0 flex-1 outline-none">
                  {pageHeader}
                  {children}
                </main>
                {footer}
              </div>
              {placement !== "start" && drawer}
            </div>
          </div>
        </div>
      </div>
    </AppFrameContext.Provider>
  );
}

/* ── Masthead ── */
export function Masthead({ className, ...props }: React.ComponentProps<"header">) {
  return <header className={cn("flex h-14 w-full items-center gap-3 border-b border-line bg-[rgba(12,12,16,0.72)] px-3 backdrop-blur-md", className)} {...props} />;
}

/** Hamburger wired to the surrounding `AppFrame`; pass `onClick` to use it standalone. */
export function MastheadToggle({ className, onClick, labels, ...props }: React.ComponentProps<"button"> & { labels?: Partial<AppFrameLabels> }) {
  const l = useAppFrameLabels(labels);
  const f = useAppFrame();
  const name = f.isMobile ? (f.sidebarOpen ? l.closeNavigation : l.openNavigation) : f.sidebarOpen ? l.collapseSidebar : l.expandSidebar;
  return (
    <button
      type="button"
      aria-label={name}
      aria-expanded={f.active ? f.sidebarOpen : undefined}
      aria-controls={f.active && f.sidebarId ? f.sidebarId : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) f.toggleSidebar();
      }}
      className={cn("btn btn-ghost btn-sm auto shrink-0", className)}
      {...props}
    >
      <Menu aria-hidden />
    </button>
  );
}

export interface MastheadBrandProps {
  logo?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Router-link escape hatch: spread `props` onto your `<Link>`. */
  render?: (props: { className: string; children: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent<HTMLElement>) => void }) => React.ReactElement;
  className?: string;
}

export function MastheadBrand({ logo, title, subtitle, href, onClick, render, className }: MastheadBrandProps) {
  const cls = cn("flex min-w-0 items-center gap-3 text-fg no-underline", (href || onClick || render) && "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary/50", className);
  const children = (
    <>
      {logo && <span className="flex shrink-0 items-center [&>svg]:size-8">{logo}</span>}
      {(title || subtitle) && (
        <span className="flex min-w-0 flex-col leading-tight">
          {title && <span className="truncate text-lg font-bold tracking-tight">{title}</span>}
          {subtitle && <span className="truncate text-xs text-muted max-[480px]:hidden">{subtitle}</span>}
        </span>
      )}
    </>
  );
  if (render) return render({ className: cls, children, href, onClick });
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls}>
        {children}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(cls, "border-0 bg-transparent p-0 text-start")}>
        {children}
      </button>
    );
  }
  return <div className={cls}>{children}</div>;
}

/** Flexible middle of the masthead (search, host indicator …). */
export function MastheadContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex min-w-0 flex-1 items-center gap-3", className)} {...props} />;
}

/** End-aligned utilities: `ThemeToggle`, `NotificationCenter`, `UserMenu` … */
export function MastheadActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("ms-auto flex shrink-0 items-center gap-1", className)} {...props} />;
}

/* ── ThemeToggle ── */
export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const DARK_QUERY = "(prefers-color-scheme: dark)";
const modeIcon = { light: Sun, dark: Moon, system: Monitor } as const;
const modes: ThemeMode[] = ["light", "dark", "system"];

export interface ThemeToggleProps {
  /** Controlled mode. */
  value?: ThemeMode;
  defaultValue?: ThemeMode;
  onChange?: (mode: ThemeMode) => void;
  /** Called with the effective theme whenever mode or the OS preference changes. */
  onResolvedChange?: (resolved: ResolvedTheme) => void;
  /** localStorage key remembering the choice (uncontrolled). Read on first render. */
  persistKey?: string;
  /**
   * `true` (default) sets `data-theme="light|dark"` on `<html>` after mount; a function takes over applying
   * the theme; `false` leaves the document alone. LAF itself ships the dark palette only, so light tokens come from the app.
   */
  apply?: boolean | ((resolved: ResolvedTheme) => void);
  variant?: "menu" | "segmented";
  labels?: Partial<AppFrameLabels>;
  className?: string;
}

export function ThemeToggle({ value, defaultValue = "system", onChange, onResolvedChange, persistKey, apply = true, variant = "menu", labels, className }: ThemeToggleProps) {
  const l = useAppFrameLabels(labels);
  const [initial] = React.useState<ThemeMode>(() => {
    const s = readStored(persistKey);
    return s === "light" || s === "dark" || s === "system" ? s : defaultValue;
  });
  const [mode, setMode] = useControllableState<ThemeMode>({ value, defaultValue: initial, onChange });
  const systemDark = useMediaQuery(DARK_QUERY);
  const resolved: ResolvedTheme = mode === "system" ? (systemDark ? "dark" : "light") : mode;
  const onResolved = React.useRef(onResolvedChange);
  onResolved.current = onResolvedChange;
  React.useEffect(() => {
    if (typeof apply === "function") apply(resolved);
    else if (apply) document.documentElement.dataset.theme = resolved;
    onResolved.current?.(resolved);
  }, [resolved, apply]);

  const choose = (m: ThemeMode) => {
    setMode(m);
    writeStored(persistKey, m);
  };
  const names: Record<ThemeMode, string> = { light: l.themeLight, dark: l.themeDark, system: l.themeSystem };
  const Icon = modeIcon[mode];

  if (variant === "segmented") {
    return (
      <div role="group" aria-label={l.theme} className={cn("inline-flex rounded-md border border-line", className)}>
        {modes.map((m) => {
          const I = modeIcon[m];
          return (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              aria-label={names[m]}
              onClick={() => choose(m)}
              className="inline-flex items-center px-2.5 py-1.5 text-muted outline-none first:rounded-s-md last:rounded-e-md hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/50 aria-pressed:bg-primary-light aria-pressed:text-primary"
            >
              <I aria-hidden className="size-4" />
            </button>
          );
        })}
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label={l.themeCurrent(names[mode])} className={cn("btn btn-ghost btn-sm auto", className)}>
          <Icon aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownPrimitive.RadioGroup value={mode} onValueChange={(v) => choose(v as ThemeMode)}>
          {modes.map((m) => {
            const I = modeIcon[m];
            return (
              <DropdownPrimitive.RadioItem key={m} value={m} className="dropdown-item outline-none data-[highlighted]:bg-surface-hover data-[highlighted]:text-fg data-[state=checked]:text-fg">
                <I aria-hidden className="size-4" />
                {names[m]}
                <DropdownPrimitive.ItemIndicator className="ms-auto text-primary">
                  <Check aria-hidden className="size-4" />
                </DropdownPrimitive.ItemIndicator>
              </DropdownPrimitive.RadioItem>
            );
          })}
        </DropdownPrimitive.RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ── AppFooter ── */
export interface FooterLink {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Opens in a new tab with an icon and a screen-reader hint. */
  external?: boolean;
}
export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}
export interface AppFooterBuild {
  commit?: string;
  date?: string;
  env?: string;
}

export interface AppFooterProps {
  start?: React.ReactNode;
  center?: React.ReactNode;
  end?: React.ReactNode;
  copyright?: React.ReactNode;
  version?: string;
  build?: string | AppFooterBuild;
  /** Inline link row (default/compact variants). */
  links?: FooterLink[];
  /** Titled link columns (`columns` variant). */
  linkGroups?: FooterLinkGroup[];
  status?: { label: string; tone?: React.ComponentProps<typeof StatusDot>["tone"]; pulse?: boolean };
  variant?: "default" | "compact" | "columns";
  labels?: Partial<AppFrameLabels>;
  className?: string;
}

function FooterAnchor({ link, hint }: { link: FooterLink; hint: string }) {
  return (
    <a
      href={link.href}
      onClick={link.onClick}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-1 rounded-sm text-muted no-underline outline-none hover:text-fg hover:underline focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      {link.label}
      {link.external && (
        <>
          <ExternalLink aria-hidden className="size-3" />
          <span className="sr-only">({hint})</span>
        </>
      )}
    </a>
  );
}

export function AppFooter({ start, center, end, copyright, version, build, links, linkGroups, status, variant = "default", labels, className }: AppFooterProps) {
  const l = useAppFrameLabels(labels);
  const uid = React.useId();
  const b = typeof build === "string" ? { commit: build } : build;
  const buildText = b && [b.env, b.commit, b.date].filter(Boolean).join(" · ");
  const compact = variant === "compact";
  const startItems = (copyright || version || buildText || start) && (
    <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
      {copyright && <span>{copyright}</span>}
      {version && (
        <span>
          {l.version} {version}
        </span>
      )}
      {buildText && (
        <span>
          {l.build} {buildText}
        </span>
      )}
      {start}
    </div>
  );
  const centerItems = ((variant !== "columns" && links?.length) || center) && (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
      {variant !== "columns" && links && links.length > 0 && (
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-1 p-0">
          {links.map((k, i) => (
            <li key={`${i}-${k.label}`}>
              <FooterAnchor link={k} hint={l.opensInNewTab} />
            </li>
          ))}
        </ul>
      )}
      {center}
    </div>
  );
  const endItems = (status || end) && (
    <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
      {status && <StatusDot tone={status.tone} pulse={status.pulse} label={status.label} className="text-[inherit]" />}
      {end}
    </div>
  );
  return (
    <footer className={cn("shrink-0 border-t border-line bg-[rgba(12,12,16,0.72)] text-muted backdrop-blur-md", compact ? "text-[0.8125rem]" : "text-sm", className)}>
      {variant === "columns" && linkGroups && linkGroups.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-6 border-b border-line px-6 py-6 max-[859px]:px-4">
          {linkGroups.map((g, gi) => (
            <div key={`${gi}-${g.title}`}>
              <div id={`${uid}-${gi}`} className="mb-2 text-[0.6875rem] font-semibold tracking-wider text-subtle uppercase">
                {g.title}
              </div>
              <ul aria-labelledby={`${uid}-${gi}`} className="m-0 grid list-none gap-1.5 p-0">
                {g.links.map((k, i) => (
                  <li key={`${i}-${k.label}`}>
                    <FooterAnchor link={k} hint={l.opensInNewTab} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <div className={cn("flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 max-[859px]:px-4", compact ? "py-2" : "py-3")}>
        {startItems}
        {centerItems}
        {endItems}
      </div>
    </footer>
  );
}

/* ── PageHeader & PageSection ── */
export interface PageHeaderProps {
  /** Breadcrumb items, or a ready-made node. */
  breadcrumb?: BreadcrumbItemProps[] | React.ReactNode;
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Labels/badges next to the title. */
  badges?: React.ReactNode;
  actions?: React.ReactNode;
  help?: { href?: string; onClick?: (e: React.MouseEvent<HTMLElement>) => void; label?: string };
  headingLevel?: 1 | 2 | 3;
  labels?: Partial<AppFrameLabels>;
  className?: string;
}

export function PageHeader({ breadcrumb, icon, title, subtitle, badges, actions, help, headingLevel = 1, labels, className }: PageHeaderProps) {
  const l = useAppFrameLabels(labels);
  const Heading = `h${headingLevel}` as const;
  const crumbs = Array.isArray(breadcrumb) ? <Breadcrumb items={breadcrumb as BreadcrumbItemProps[]} /> : breadcrumb;
  return (
    <div className={cn("flex flex-col gap-3 px-6 pt-6 pb-4 max-[859px]:px-4", className)}>
      {crumbs && <div>{crumbs}</div>}
      <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
        {icon && (
          <span aria-hidden className="flex shrink-0 text-primary [&>svg]:size-8">
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1 basis-64">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Heading className="min-w-0 text-2xl font-semibold tracking-tight text-fg">{title}</Heading>
            {badges}
          </div>
          {subtitle && <p className="mt-1 max-w-3xl text-sm text-muted">{subtitle}</p>}
        </div>
        {(actions || help) && (
          <div className="flex shrink-0 flex-wrap items-center gap-2.5">
            {help && (
              <a href={help.href} onClick={help.onClick} className="text-sm text-muted hover:text-fg">
                {help.label ?? l.help}
              </a>
            )}
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

const sectionPad = { none: "", sm: "px-4 py-2", md: "px-6 py-4 max-[859px]:px-4", lg: "px-8 py-8 max-[859px]:px-4 max-[859px]:py-6" } as const;

export interface PageSectionProps extends React.ComponentProps<"section"> {
  padding?: keyof typeof sectionPad;
  /** Translucent surface with a border, for toolbars and grouped content. */
  filled?: boolean;
  /** Sticks to the edge of the scrolling `main`. */
  sticky?: "top" | "bottom";
}

/** A `<section>`; give it an `aria-label` to expose it as a region landmark. */
export function PageSection({ padding = "md", filled, sticky, className, ...props }: PageSectionProps) {
  return (
    <section
      className={cn(
        sectionPad[padding],
        filled && "border-y border-line bg-surface",
        sticky && "z-10 backdrop-blur-md",
        sticky === "top" && "sticky top-0",
        sticky === "bottom" && "sticky bottom-0",
        sticky && !filled && "bg-[rgba(12,12,16,0.72)]",
        className,
      )}
      {...props}
    />
  );
}
