import { PanelLeft } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { useLaf } from "../i18n";
import { Panel } from "./display";
import { Drawer, DrawerContent, DrawerTrigger, SplitPane } from "./extras";
import { DefinitionList } from "./helpers";
import { ActionBar } from "./action-bar";
import type { MenuItemSpec } from "./menu-spec";
import { ObjectIcon, type ObjectKind, type ObjectState } from "./object-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./overlay";
import { StatusDot } from "./primitives";

/* ── CapacityBar (§4.102) ── */
export interface CapacityBarProps {
  label: string;
  used: number;
  /** Reserved but not yet used (rendered as a hatched segment after `used`). */
  reserved?: number;
  total: number;
  unit?: "bytes" | "frequency" | "count";
  warnAt?: number;
  dangerAt?: number;
  labels?: { used?: string; reserved?: string; free?: string; capacity?: string };
  className?: string;
}

export function CapacityBar({
  label,
  used,
  reserved = 0,
  total,
  unit = "count",
  warnAt = 70,
  dangerAt = 90,
  labels: labelsProp,
  className,
}: CapacityBarProps) {
  const { t: laf, format } = useLaf();
  const l = { used: laf.vsUsed, reserved: laf.vsReserved, free: laf.vsFree, capacity: laf.vsCapacity, ...labelsProp };
  const fmt = (n: number) => (unit === "bytes" ? format.bytes(n, { base: 1024 }) : unit === "frequency" ? format.frequency(n) : String(n));
  const safeTotal = total > 0 ? total : 1;
  const usedPct = Math.min(100, Math.max(0, (used / safeTotal) * 100));
  const resPct = Math.min(100 - usedPct, Math.max(0, (reserved / safeTotal) * 100));
  const free = Math.max(0, total - used - reserved);
  const tone = usedPct >= dangerAt ? "bg-danger" : usedPct >= warnAt ? "bg-warn" : "bg-ok";
  const text = [
    `${fmt(used)} ${l.used}`,
    reserved > 0 ? `${fmt(reserved)} ${l.reserved}` : undefined,
    `${fmt(free)} ${l.free}`,
    `${fmt(total)} ${l.capacity}`,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <div className={cn("grid gap-1", className)}>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-fg">{label}</span>
        <span className="font-mono text-xs text-muted">{format.percent(usedPct / 100)}</span>
      </div>
      <div
        role="img"
        aria-label={`${label}: ${text}`}
        className="flex h-2.5 overflow-hidden rounded-sm bg-muted-bg"
      >
        {/* dynamic data-driven widths */}
        <span className={cn("h-full", tone)} style={{ width: `${usedPct}%` }} data-segment="used" />
        {resPct > 0 && (
          <span
            className="h-full bg-primary/40"
            style={{ width: `${resPct}%` }}
            data-segment="reserved"
          />
        )}
      </div>
      <div aria-hidden className="text-xs text-muted">
        {text}
      </div>
    </div>
  );
}

/* ── ObjectPage (§4.103) ── */
export interface ObjectPageCard {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface ObjectPageProps {
  kind: ObjectKind;
  state?: ObjectState;
  name: string;
  /** Text next to the name, e.g. "Powered on". */
  statusLabel?: string;
  statusTone?: React.ComponentProps<typeof StatusDot>["tone"];
  actions?: MenuItemSpec[];
  actionsLabel?: string;
  /** Summary tab: key/value facts. */
  facts?: { label: React.ReactNode; value?: React.ReactNode; mono?: boolean }[];
  /** Summary tab: cards (CapacityBars, notes, …) shown in a grid. */
  cards?: ObjectPageCard[];
  monitor?: React.ReactNode;
  configure?: React.ReactNode;
  tab?: string;
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
  labels?: { summary?: string; monitor?: string; configure?: string };
  className?: string;
}

export function ObjectPage({
  kind,
  state,
  name,
  statusLabel,
  statusTone,
  actions,
  actionsLabel,
  facts,
  cards,
  monitor,
  configure,
  tab: tabProp,
  defaultTab = "summary",
  onTabChange,
  labels: labelsProp,
  className,
}: ObjectPageProps) {
  const { t: laf } = useLaf();
  const l = { summary: laf.vsSummary, monitor: laf.vsMonitor, configure: laf.vsConfigure, ...labelsProp };
  const [tab, setTab] = useControllableState<string>({ value: tabProp, defaultValue: defaultTab, onChange: onTabChange });
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <ObjectIcon kind={kind} state={state} size={20} />
        <h1 className="min-w-0 text-xl font-semibold text-fg">{name}</h1>
        {statusLabel && <StatusDot tone={statusTone} label={statusLabel} />}
        {actions && actions.length > 0 && (
          <div className="ms-auto">
            <ActionBar items={actions} label={actionsLabel ?? name} />
          </div>
        )}
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="summary">{l.summary}</TabsTrigger>
          {monitor !== undefined && <TabsTrigger value="monitor">{l.monitor}</TabsTrigger>}
          {configure !== undefined && <TabsTrigger value="configure">{l.configure}</TabsTrigger>}
        </TabsList>
        <TabsContent value="summary" className="grid gap-4 pt-4">
          {facts && <DefinitionList items={facts} />}
          {cards && (
            <div className="grid gap-4 md:grid-cols-2">
              {cards.map((c) => (
                <Panel key={c.id} title={c.title} headingLevel={2}>
                  {c.content}
                </Panel>
              ))}
            </div>
          )}
        </TabsContent>
        {monitor !== undefined && (
          <TabsContent value="monitor" className="pt-4">
            {monitor}
          </TabsContent>
        )}
        {configure !== undefined && (
          <TabsContent value="configure" className="pt-4">
            {configure}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

/* ── InventoryLayout (§4.104) ── */
const NARROW = "(max-width: 859px)";

function useNarrow(): boolean {
  return React.useSyncExternalStore(
    (cb) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const mq = window.matchMedia(NARROW);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => (typeof window !== "undefined" && !!window.matchMedia ? window.matchMedia(NARROW).matches : false),
    () => false,
  );
}

export interface InventoryLayoutProps {
  /** TopBar slot. */
  top?: React.ReactNode;
  /** TreeView slot. */
  tree: React.ReactNode;
  treeLabel?: string;
  children: React.ReactNode;
  /** Docked TaskPanel / AlarmList slot; renders a vertical split under the content. */
  bottom?: React.ReactNode;
  bottomLabel?: string;
  /** Persists the tree and bottom sizes (`<key>:tree`, `<key>:bottom`). */
  persistKey?: string;
  /** Force the drawer mode (otherwise below 860 px). */
  narrow?: boolean;
  defaultTreeSize?: number;
  defaultBottomSize?: number;
  className?: string;
}

export function InventoryLayout({
  top,
  tree,
  treeLabel,
  children,
  bottom,
  bottomLabel,
  persistKey,
  narrow: narrowProp,
  defaultTreeSize = 280,
  defaultBottomSize = 220,
  className,
}: InventoryLayoutProps) {
  const { t: laf } = useLaf();
  const mqNarrow = useNarrow();
  const narrow = narrowProp ?? mqNarrow;
  const [drawer, setDrawer] = React.useState(false);
  const treeTitle = treeLabel ?? laf.vsInventoryTree;
  const main = bottom ? (
    <SplitPane
      orientation="vertical"
      primary="end"
      collapsible
      label={bottomLabel ?? laf.vsRecentTasks}
      persistKey={persistKey && `${persistKey}:bottom`}
      defaultSize={defaultBottomSize}
      min={80}
      max={600}
      className="h-full rounded-none border-0"
      start={<div className="p-4">{children}</div>}
      end={<div role="region" aria-label={bottomLabel ?? laf.vsRecentTasks} className="h-full">{bottom}</div>}
    />
  ) : (
    <div className="h-full overflow-auto p-4">{children}</div>
  );
  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      {top}
      <div className="min-h-0 flex-1">
        {narrow ? (
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-center border-b border-line px-2 py-1">
              <Drawer open={drawer} onOpenChange={setDrawer}>
                <DrawerTrigger className="btn btn-ghost btn-sm" aria-label={treeTitle}>
                  <PanelLeft className="size-4" aria-hidden />
                </DrawerTrigger>
                <DrawerContent title={treeTitle} width="sm">
                  <div onClickCapture={(e) => (e.target as HTMLElement).closest('[role="treeitem"]') && setDrawer(false)}>{tree}</div>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="min-h-0 flex-1">{main}</div>
          </div>
        ) : (
          <SplitPane
            collapsible
            label={treeTitle}
            persistKey={persistKey && `${persistKey}:tree`}
            defaultSize={defaultTreeSize}
            min={160}
            max={600}
            className="h-full rounded-none border-0"
            start={<nav aria-label={treeTitle} className="h-full p-1">{tree}</nav>}
            end={main}
          />
        )}
      </div>
    </div>
  );
}
