# pilab-laf — Design document: v1 component pack

Status: **Draft** · Owner: pilab · Applies to `@pilab/laf` 0.1 → 1.0
Decided 2026-11-10: the kit is **tree-shakeable** (ADR-1), **`LafProvider`** is accepted (ADR-9, F1), **OIDC is out of scope** (§1.3).
Normative rules still live in [`COMPONENTS.md`](../COMPONENTS.md) (§0 hard rules, §1–3 tokens/states, §6 conventions, §7 DoD).
This document designs **what is missing** to build three products on the kit, and how to build it. Delivery order is in [`roadmap.md`](roadmap.md).

When a component in this document ships, its section moves into `COMPONENTS.md` (§4.62+) and is removed here.

---

## 1. Context

`@pilab/laf` 0.1 implements nearly every component in `COMPONENTS.md` §4.1–4.61, but many are a first cut of their spec, and one target product (the issue tracker) has no spec section at all.

| Product | Short name | What it needs most |
|---|---|---|
| Shadow SSO (auth pages + admin + account self-service) | **SSO** | self-service security pages (MFA, sessions, API keys), user/group/role admin, RBAC, branding |
| Issue tracker | **IT** | rich text, timelines, boards, labels, filtering |
| vSphere/ESXi replacement | **VS** | large virtualized trees and grids, object pages, live tasks, perf charts, console |

### 1.1 Goals
- One kit composes all three products without app-local UI primitives.
- Every component meets `COMPONENTS.md` §7 (keyboard, axe-clean, radius ≤ 4px, tokens only, hu/en, reduced motion).
- Core bundle stays light; heavy engines (charts, editor, drag & drop) are opt-in entry points.
- Data-heavy components scale: 10 000 tree nodes and 50 000 grid rows stay interactive.

### 1.2 Non-goals
- Data fetching, caching, auth flows (app code).
- OIDC in any form (see §1.3).
- A light theme (R5), a second font (R4).
- Generating QR codes, VNC/WebMKS protocol, markdown storage formats.
- Server-rendered auth pages (R9) — they keep using the CSS classes only.

### 1.3 Scope boundary with Shadow SSO
| Concern | Owner | LAF's role |
|---|---|---|
| Sign-in for apps (FedCM, silent login, One Tap, PKCE) | `@pilab/shadow-sso` (`../3so/shadow-sso-client`) | none; replaces the planned `@pilab/auth` (`COMPONENTS.md` §4.G) |
| OIDC client registration, consent/authorized apps, upstream IdP federation, signing keys/JWKS | `shadow-sso-accounts` admin (`apps/admin`, zod schemas in `packages/validation`) | none; those screens compose generic LAF parts (DataGrid, TagInput, KeyValueEditor, SecretDisplay, FormSection) |
| Server-rendered auth/consent pages | Shadow SSO `webauth` | CSS classes only (§4.22, R9), unchanged |
| Account security, sessions, API keys, users/groups/roles, audit, branding | Shadow SSO apps | **LAF components** (§6.4) |

Consequences: `OidcClientList` / `OidcClientForm` (§4.61) are deprecated in 0.1.x and removed in 0.2; the admin app already validates redirect URIs correctly (`redirectUriSchema`: URL parse + exact loopback host).

---

## 2. Architecture decisions

| # | Decision | Rationale | Alternatives rejected |
|---|---|---|---|
| ADR-1 | **Accepted. Tree-shakeable ESM** is the primary guarantee: importing one component ships only that component and what it imports (§2.2). Heavy engines additionally live behind subpath entries `@pilab/laf/charts`, `/editor`, `/dnd` with **optional peer dependencies**, so apps that don't use them don't even install CodeMirror/visx/dnd-kit. | Measured on 0.1: `import { Button }` → 12.4 kB gzip vs 72 kB for everything, so shaking already works; the rules in §2.2 keep it that way. | Single entry with all engines as hard dependencies (forces installs); per-component packages (release overhead). |
| ADR-2 | **Headless table/virtual engine**: `@tanstack/react-table` + `@tanstack/react-virtual` power DataGrid, TreeTable, TreeView, VirtualList, LogViewer. | Spec §4.29 already names them; sort/filter/resize/visibility/grouping/server mode without reinventing. | AG Grid (heavy, own styling), hand-rolled (current; doesn't scale). |
| ADR-3 | **Charts**: `@visx/*` (scale, shape, axis, brush, tooltip, responsive) in `@pilab/laf/charts`. SVG, token classes, LTTB downsampling to pixel width. Existing Sparkline/Gauge/Donut stay in core (dependency-free). | Spec §4.38 says recharts or visx; visx keeps SVG + Tailwind classes and is composable for brush/crosshair. | recharts (styling via props, hard to tokenise), uPlot (canvas: no token classes, separate a11y path). |
| ADR-4 | **Editor engine**: CodeMirror 6 in `@pilab/laf/editor` for CodeEditor (JSON/YAML), MarkdownEditor (source + toolbar) and mentions (autocomplete extension). | One engine for three editors; small, accessible, themeable via CSS vars. | Monaco (huge, worker setup), Tiptap/ProseMirror (WYSIWYG; IT stores Markdown). |
| ADR-5 | **Markdown rendering**: `react-markdown` + `remark-gfm` + `rehype-sanitize` (strict schema) in `@pilab/laf/editor`. | Produces React elements, no `dangerouslySetInnerHTML`; GFM tables/task lists. | markdown-it + DOMPurify (HTML strings). |
| ADR-6 | **Drag & drop**: `@dnd-kit/core` + `@dnd-kit/sortable` in `@pilab/laf/dnd`. | Keyboard sensor + screen-reader announcements built in; works for Kanban, sortable lists, tree moves. | react-beautiful-dnd (unmaintained), native HTML5 DnD (no keyboard/touch). |
| ADR-7 | **Combobox/command engine**: `cmdk` inside Radix Popover/Dialog (spec §4.36, §4.43). All floating lists **portal**. | Fixes clipping inside Drawer/Dialog; fuzzy filtering, groups. | Current hand-rolled listbox. |
| ADR-8 | **More Radix primitives**: `react-select`, `react-toggle-group`, `react-hover-card`, `react-slider`, `react-collapsible`. | §6 rule 3: don't re-implement focus/positioning. | |
| ADR-9 | **Accepted. i18n without a library**: `LafProvider` supplies `locale` + a typed message catalogue (`en` default, `hu` shipped); each component also accepts a `labels` prop that overrides keys. Formatting via `Intl.*`. | Apps may use any i18n stack; LAF just needs strings + locale. | Bundling i18next/react-intl. |
| ADR-10 | **Controlled + uncontrolled** everywhere via one `useControllableState` helper (`value/defaultValue/onValueChange`). | §6 rule 5; today TreeView is controlled-only, Accordion uncontrolled-only. | |
| ADR-11 | **User-defined colours via palette slots**: labels and tags pick one of 12 token slots (`--label-1…12`, each with `-bg`/`-fg` pairs verified for contrast). No free hex. | Keeps R2 and R8 while giving IT coloured labels. | Hex picker per label (breaks contrast guarantees). |
| ADR-12 | **One brand-colour exception**: `ColorField`, only on the branding page, writes the tenant `--primary`; it must pass contrast checks against `--bg-card` and `--on-primary` before saving. | R6 requires tenant re-branding; the check keeps accessibility. | |
| ADR-13 | **Dates**: `react-day-picker` for calendars (spec §4.45); `Intl.DateTimeFormat`/`RelativeTimeFormat` for display. Props take ISO strings or `Date`; time zone is explicit. | | moment/dayjs in the kit. |

### 2.1 Package layout after ADR-1

```
lib/
  index.ts                 core entry
  charts/index.ts          @pilab/laf/charts   (visx)
  editor/index.ts          @pilab/laf/editor   (CodeMirror, react-markdown)
  dnd/index.ts             @pilab/laf/dnd      (dnd-kit)
  foundation/              provider, messages, formatters, hooks
  components/<group>.tsx   existing files; new components follow §6 (one folder each)
```

`package.json` `exports` gains `./charts`, `./editor`, `./dnd` and `./locales/*`; the heavy libraries are only imported from their entry and declared as optional `peerDependencies` (`peerDependenciesMeta.optional`).

### 2.2 Tree-shaking rules
1. **ESM first**: `exports` lists `import` before `require`; ESM output keeps one module per component file (tsup `splitting: true`, or `bundle: false` if shaking regresses) so bundlers drop whole files. CJS is kept for compatibility but is not expected to shake.
2. **`sideEffects`** stays `["**/*.css"]`. No module may do work at import time: no global listeners, no registry mutation, no DOM access, no `console` calls. Top-level `cva(...)`, `createContext(...)` and `new Map()` are allowed (pure).
3. **Registries are explicit**: `ObjectIcon` kinds, hotkey maps and locale catalogues are passed in or registered by the app, never self-registered by importing a module.
4. **Locales are separate imports**: `en` is inlined as defaults; `hu` is `import { hu } from "@pilab/laf/locales/hu"` so English-only apps don't ship it.
5. **No barrel side effects**: `lib/index.ts` only re-exports; providers (`ToastProvider`, `TooltipProvider`) are not pulled in by unrelated components.
6. **Guarded in CI** by `tests/treeshake.test.ts`: bundles single-import fixtures with `bun build --minify` (React external) and asserts budgets, e.g. `Button` ≤ 13 kB gzip, `Badge` ≤ 11 kB, and that a `Button`-only bundle contains no Radix Dialog/Dropdown, cmdk, TanStack or chart code. Of the 12.4 kB baseline, 9.5 kB is `tailwind-merge` via `cn()`; replacing it is out of scope for now (needed for safe `className` overrides).

---

## 3. Foundations (new, shared)

### F1 `LafProvider` (accepted)
```ts
import { LafProvider } from "@pilab/laf";
import { hu } from "@pilab/laf/locales/hu";   // optional, tree-shaken when unused

<LafProvider locale="hu" messages={hu} timeZone="Europe/Budapest">…</LafProvider>

interface LafProviderProps {
  locale?: string;                         // BCP-47; default "en" (drives Intl formatting)
  messages?: Partial<LafMessages>;         // catalogue for the locale; missing keys fall back to built-in en
  timeZone?: string;                       // default: browser
  portalContainer?: HTMLElement;           // overlays inside shadow roots / iframes
  children: React.ReactNode;
}
function useLaf(): {
  locale: string;
  timeZone: string;
  t: (key: keyof LafMessages, vars?: Record<string, string | number>) => string;
  format: Formatters;
};
```
Lean by design (§2.2 rule 5): only locale, messages, time zone, formatters and portal container. `TooltipProvider` and `ToastProvider` stay separate opt-ins. Components still work without the provider (English defaults, browser time zone). Precedence for any string: component `labels` prop → provider `messages` → built-in `en`. `LafMessages` is one flat typed interface with namespaced keys (`"logViewer.search"`, `"dialog.close"`), so a missing `hu` key is a type error in the catalogue test.

### F2 `useControllableState<T>(value, defaultValue, onChange)` — internal and exported.

### F3 Formatters (`format.*`, locale-aware pure functions, also on `useLaf().format`)
| Function | Example | Notes |
|---|---|---|
| `bytes(n, { base: 1024 \| 1000 })` | `4 GiB`, `4.29 GB` | VS uses 1024 with IEC labels |
| `bitrate(n)` | `1.2 Gbit/s` | network perf |
| `frequency(hz)` | `2.6 GHz` | CPU |
| `duration(ms, { style: "short" \| "clock" })` | `3 h 12 min`, `03:12:05` | tasks, uptime |
| `percent(x)` | `73 %` (hu) | |
| `relative(date)` | `3 hours ago` | RelativeTime |
| `dateTime(date, { utc? })` | | audit, tasks |

### F4 Label palette tokens (ADR-11)
`--label-{1..12}`, `--label-{n}-bg`, `--label-{n}-fg` in `src/app.css`; utilities `bg-label-n`, `text-label-n`. Contrast check added to `tests/rules.test.ts`.

### F5 Object icon registry (VS, reused by IT/SSO)
```ts
type ObjectKind = "datacenter" | "cluster" | "host" | "vm" | "template" | "vapp" | "folder"
  | "resource-pool" | "datastore" | "datastore-cluster" | "network" | "dvswitch" | "portgroup"
  | "snapshot" | "user" | "group" | "client" | "issue" | "project";
type ObjectState = "on" | "off" | "suspended" | "maintenance" | "disconnected" | "warning" | "error";
function ObjectIcon(props: { kind: ObjectKind; state?: ObjectState; size?: 16 | 20; label?: string }): JSX.Element;
function registerObjectKind(kind: string, icon: LucideIcon): void;   // apps extend it
```
State is a small corner glyph **plus** a text alternative (R8); `label` makes the icon non-decorative.

### F6 Hotkeys
```ts
function useHotkeys(map: Record<string, (e: KeyboardEvent) => void>, opts?: { scope?: string; enabled?: boolean; allowInInputs?: boolean }): void;
function ShortcutHelp(props: { open: boolean; onOpenChange(open: boolean): void }): JSX.Element; // lists registered keys; "?" opens it
```
Combos are written `mod+k`, `g i` (sequence). `mod` = ⌘ on macOS, Ctrl elsewhere; `Kbd` renders the same mapping. Ignored while typing in inputs unless `allowInInputs`.

---

## 4. Fixes to existing components (ship first)

| # | Component | Defect | Fix |
|---|---|---|---|
| B1 | `OidcClientList`, `OidcClientForm` | out of scope (§1.3); the form's redirect validator (`^http:\/\/localhost`) also accepts `http://localhost.attacker.com` | mark `@deprecated` in 0.1.x pointing to `shadow-sso-accounts`; remove in 0.2. No fix: the admin app's `redirectUriSchema` is already correct |
| B2 | `FileDropzone` | dropped files bypass `accept`; size always shown in KB | validate MIME/extension for drop, paste and pick; use `format.bytes` |
| B3 | `DiffView` | positional compare: one inserted line marks every later line changed | Myers/LCS line diff, unified + split modes, collapsed unchanged hunks |
| B4 | `Combobox` | listbox not portaled → clipped in Drawer/Dialog/SplitPane; manual outside-click handling | rebuild on Radix Popover + cmdk (ADR-7) |
| B5 | `KeyValueEditor` | array index used as React key → focus/value jumps after remove | stable row ids |
| B6 | `SecretDisplay` | acknowledge checkbox uncontrolled; never masks | controlled `acknowledged`; `masked` state renders `••••` + last 4 |
| B7 | many | hardcoded English strings (LogViewer, AlarmList, Drawer "Close", CommandPalette, TimeRangePicker, FileDropzone, MfaEnrolment) | route through `useLaf().t` + `labels` prop (ADR-9) |
| B8 | `TreeView`, `Accordion` | controlled-only / uncontrolled-only | `useControllableState` |

Each fix ships with a regression test that fails on the current code.

---

## 5. Upgrades to existing components

Format: **what changes** → API delta. Unlisted props stay as they are (no breaking change unless marked **BREAKING**).

### U1 DataGrid v2 (§4.29) — SSO, IT, VS
Rebuilt on TanStack Table + Virtual.
```ts
interface DataGridProps<T> {
  columns: GridColumn<T>[];
  rows: T[];
  rowId: (row: T) => string;
  label: string;
  // state (all controllable)
  sort?: GridSort[];            onSortChange?(sort: GridSort[]): void;     // BREAKING: array (Shift = multi-sort)
  selected?: string[];          onSelectedChange?(ids: string[]): void;
  columnVisibility?: Record<string, boolean>; onColumnVisibilityChange?(v: Record<string, boolean>): void;
  columnOrder?: string[];       onColumnOrderChange?(order: string[]): void;
  columnSizing?: Record<string, number>;     onColumnSizingChange?(s: Record<string, number>): void;
  filters?: GridFilter[];       onFiltersChange?(f: GridFilter[]): void;
  // modes
  manual?: boolean;             // server-side sort/filter/page: grid only emits state
  rowCount?: number;            // with manual
  virtual?: boolean | { rowHeight: number; overscan?: number };            // default on above 200 rows
  density?: "compact" | "default";
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  // rows
  onRowActivate?(row: T): void;                    // Enter / double-click → open object
  rowActions?: (row: T) => MenuItemSpec[];         // kebab + context menu, same model as U4
  renderExpanded?: (row: T) => React.ReactNode;
  bulkActions?: (ids: string[]) => React.ReactNode; // sticky bar while selection is non-empty
  // states
  loading?: boolean; error?: React.ReactNode; empty?: React.ReactNode;
  // persistence
  viewKey?: string;                                // persists visibility/order/sizing/density
}
interface GridColumn<T> {
  id: string; header: React.ReactNode; cell(row: T): React.ReactNode; accessor?(row: T): unknown;
  sortable?: boolean; filter?: "text" | "select" | "range" | GridFilterRenderer; numeric?: boolean;
  width?: number; minWidth?: number; hideable?: boolean; pin?: "start";
}
```
Toolbar slot components: `GridColumnsMenu`, `GridDensityToggle`, `GridSearch`. Selection supports Shift-range. `role="grid"` only when cells contain interactive controls; otherwise table semantics. Acceptance: 50 000 rows scroll smoothly in the playground; axe clean; keyboard sort/select/activate.

### U2 TreeView v2 (§4.28) — VS, IT (projects), SSO (realms/groups)
```ts
interface TreeNode {
  id: string; label: React.ReactNode; icon?: React.ReactNode; badge?: React.ReactNode;
  children?: TreeNode[]; hasChildren?: boolean; disabled?: boolean; status?: StatusTone;
}
interface TreeViewProps {
  nodes: TreeNode[]; label: string;
  expanded?: string[]; defaultExpanded?: string[]; onExpandedChange?(ids: string[]): void;
  selection?: "single" | "multiple";
  selected?: string[]; defaultSelected?: string[]; onSelectedChange?(ids: string[]): void;  // BREAKING: array
  onActivate?(id: string): void;
  loadChildren?(id: string): Promise<void>;       // skeleton row while pending; error row with retry
  contextMenu?(id: string): MenuItemSpec[];       // right-click, Shift+F10, Menu key
  onMove?(ids: string[], targetId: string, position: "inside" | "before" | "after"): void; // needs @pilab/laf/dnd
  virtual?: boolean;                              // auto above 500 visible rows
}
```
Adds type-ahead, `*` (expand siblings), Shift/Ctrl multi-select, `aria-multiselectable`, disabled nodes, status dot. Acceptance: 10 000 nodes expanded, ↓ key latency < 16 ms.

### U3 Combobox v2 (§4.43) — all
Radix Popover + cmdk, portaled. Adds: groups (option `group` field), `onCreate?(query)` ("Create “foo”"), clear button, `renderOption`, virtualized list above 200 options, controlled `open`. `UserSelector`, `DeviceSelector`, `TenantSwitcher` become thin wrappers (no API change).

### U4 Menus: DropdownMenu & ContextMenu — all
Shared declarative model so toolbars, row kebabs and context menus use one source:
```ts
type MenuItemSpec =
  | { type?: "item"; id: string; label: string; icon?: React.ReactNode; shortcut?: string; danger?: boolean;
      disabled?: boolean | string /* reason → tooltip */; onSelect(): void }
  | { type: "checkbox"; id: string; label: string; checked: boolean; onCheckedChange(v: boolean): void }
  | { type: "radio"; id: string; value: string; onValueChange(v: string): void; options: { value: string; label: string }[] }
  | { type: "submenu"; id: string; label: string; icon?: React.ReactNode; items: MenuItemSpec[] }
  | { type: "separator" }
  | { type: "label"; label: string };
function Menu(props: { items: MenuItemSpec[]; trigger: React.ReactNode }): JSX.Element;
function ContextMenuFor(props: { items: MenuItemSpec[]; children: React.ReactNode }): JSX.Element;
```
Primitive exports gain `…Sub`, `…SubTrigger`, `…SubContent`, `…CheckboxItem`, `…RadioGroup`, `…RadioItem`, `…Shortcut`.

### U5 Charts (§4.38) → `@pilab/laf/charts`
`TimeSeriesChart` replaces `LineChart` for VS/IT (LineChart stays in core for small static data):
```ts
interface TimeSeriesChartProps {
  series: { id: string; name: string; unit: "%" | "bytes" | "bitrate" | "hz" | "ms" | "count";
            points: [t: number, v: number | null][] }[];
  type?: "line" | "area" | "stacked-area";
  range?: { from: number; to: number }; onRangeChange?(r: { from: number; to: number }): void; // brush zoom
  thresholds?: { value: number; tone: "warn" | "danger" }[];
  hiddenSeries?: string[]; onHiddenSeriesChange?(ids: string[]): void;                       // legend toggle
  loading?: boolean; label: string; height?: number;
}
```
Two y-axes when units differ (max two). Tooltip = Popover look listing all series at the crosshair. Data-table fallback ("Show data") for a11y. `StackedBarChart`, `Heatmap` move here too (re-exported from core for one minor, then removed).

### U6 Date & time (§4.39, §4.45)
`DatePicker` gains `mode: "date" | "datetime" | "range"`, typed entry with format hint, time-zone label, disabled dates, Monday-first per locale (react-day-picker). `TimeRangePicker` gains **Custom…** (opens the range picker), outputs `{ from, to } | { relative: "1h" }`, shows the time zone. `DateTimeInput` (native) is deprecated.

### U7 SplitPane v2 (§4.33)
`orientation: "horizontal" | "vertical"`, n panes via `<SplitPane><Pane minSize collapsible defaultSize/>…</SplitPane>`, collapse to 0 with a reopen handle, `persistKey`. Base: `react-resizable-panels`. Enables the VS layout: tree │ detail, with the task panel as a vertical split below.

### U8 Code & text
- **CodeEditor** → `@pilab/laf/editor` on CodeMirror 6: line numbers, error gutter (`diagnostics: { line, message }[]`), JSON/YAML/shell modes, read-only, Tab indents (Esc then Tab leaves — documented). The current textarea version stays in core as `CodeEditorLite`.
- **DiffView**: see B3; props `mode: "split" | "unified"`, `context = 3`.
- **LogViewer**: always virtualized, follow/pause button (auto-pauses on scroll up), search with match count and next/prev (Enter / Shift+Enter), level filter, line numbers, copy selection, download, `onLoadOlder` for back-paging.

### U9 Forms
- **PasswordField**: `strength?: (v: string) => 0 | 1 | 2 | 3 | 4` (caller-supplied, e.g. zxcvbn) → 4-segment meter + text label; `confirmOf?: string` for match validation.
- **Slider** on Radix: `marks`, `step`, range (two thumbs), paired `NumberInput` via `withInput`.
- **InlineEdit**: `as: "text" | "select" | "number"` with `options`.
- **Chip**: `color?: LabelSlot` (F4).
- **KeyValueEditor**: bulk paste of `k=v` lines, `secretKeys` masking, reorder (dnd entry, optional), `validateKey`.
- **FormField adapter** for react-hook-form: optional `@pilab/laf/rhf` (`<RhfField name control render />`), spec §4.51.

### U10 Feedback & ops
- **TaskPanel**: filter (mine/all, status), expandable row (detail + error + target link), duration (`format.duration`), `onOpenTarget`; `aria-live` only on status change.
- **AlarmList**: selection + bulk acknowledge/reset, `onOpenEntity`, `onReset`, `RelativeTime`.
- **UserMenu**: `impersonating?: { as: string; onStop(): void }`, `expiresAt?` warning row, language submenu (U4).
- **Accordion**: controllable, Radix Collapsible, animated height (off under reduced motion).
- **CommandPalette**: async `search(query)`, group headings, recent items, cmdk (ADR-7).
- **TopologyGraph** (P2): `@xyflow/react` + ELK auto-layout, pan/zoom/minimap, neighbour highlight, list-view alternative. Lives in `@pilab/laf/charts`.

### U11 SSO screens already present
- **MfaEnrolment**: recovery codes download (`.txt`) + print; WebAuthn error reasons (`NotAllowedError` → "Cancelled"); `labels` for every string.
- **OidcClientList / OidcClientForm**: no upgrade; deprecated and removed (B1, §1.3).
- **PermissionMatrix**: `inherited?: Record<roleId, { permission: string; from: string }[]>` (disabled + source badge), search, pending-changes diff with Save/Discard, arrow-key grid navigation.

---

## 6. New components

Numbering continues `COMPONENTS.md` §4. Priority: **P0** blocks first usable screens, **P1** core flows, **P2** later.

### 6.1 Core primitives

| § | Component | P | Users | Design |
|---|---|---|---|---|
| 4.62 | **Select** | P0 | all | Radix Select styled as `.form-input` + `.dropdown-menu`; groups, disabled items, icon + description per option, `invalid`. Native `Select` stays for server-rendered auth pages. |
| 4.63 | **SegmentedControl** | P0 | all | Radix ToggleGroup, single/multiple; `h-8`, items share borders, selected `bg-primary-light text-primary`; icon-only items require `aria-label`. TimeRangePicker presets reuse it. |
| 4.64 | **ButtonGroup / SplitButton** | P1 | VS, IT | Group joins borders (inner radius 0). SplitButton = primary action + chevron DropdownMenu (U4 items); the chevron has its own label ("More power actions"). |
| 4.65 | **IconButton** | P0 | all | `Button` variant with a required `label` prop (type-level), shows a Tooltip with the same text. |
| 4.66 | **StatusDot** | P0 | all | 8px dot (`rounded-xs`, R1) + visible or sr-only text; tones ok/warn/danger/neutral/primary; `pulse` for running (off under reduced motion). |
| 4.67 | **RelativeTime** | P0 | all | `<time dateTime>` with `format.relative`; Tooltip shows absolute local + UTC (as §4.21); refreshes on one shared 30 s ticker. |
| 4.68 | **AvatarGroup** | P1 | IT, SSO | Overlapping `Avatar`s (max N, then `+k` chip with the rest in a Tooltip); square avatars per R1. |
| 4.69 | **HoverCard** | P2 | IT, VS | Radix HoverCard; also opens on focus (no hover-only disclosure, §8). User/object previews. |
| 4.70 | **NotificationCenter** | P1 | IT, SSO | Bell IconButton with unread count → Popover list (`title`, `body`, `time`, `unread`, `href`), mark read / mark all, "View all"; `aria-live` for count changes only. |
| 4.71 | **Hotkeys / ShortcutHelp** | P1 | IT, VS | F6. |

### 6.2 Layout & flows

| § | Component | P | Users | Design |
|---|---|---|---|---|
| 4.72 | **Wizard** | P0 | VS, SSO | Composes `Stepper` + content + footer. `steps: { id, label, render(), validate?(): Promise<string[] \| void>, optional? }[]`, `onFinish`; `WizardReview` helper (DefinitionList of collected values); Cancel confirms when dirty. Renders in a large Dialog or a page. Ctrl+Enter = Next. |
| 4.73 | **FormSection / FormFooter** | P0 | all | Section = heading + description + field grid. Footer = sticky bar (Cancel + Save, pending); `dirty` → `useUnsavedChangesGuard()` (beforeunload + router callback). Implements template §5.4. |
| 4.74 | **Page templates** | P0 | all | `TopBar` (logo slot, global search, task/alarm counters, NotificationCenter, UserMenu); `DetailPage` (breadcrumb, head with ObjectIcon + status + ActionBar, tabs, main/side grid); `FormPage`; `SubNav` (vertical secondary nav for Configure/Settings, groups, `aria-current`); `MobileNav` (sidebar in a Drawer below 860 px). |
| 4.75 | **ErrorPage / ErrorBoundary** | P0 | all | Variants 403, 404, 500, offline, session-expired: icon, title, description, primary action, copyable request id. `LafErrorBoundary` renders the 500 variant with reset. |
| 4.76 | **ActionBar** | P1 | VS, IT | Toolbar fed by `MenuItemSpec[]`; measures width and moves overflow into an "Actions" menu; the same specs feed `ContextMenuFor`, so toolbar and right-click always match. |
| 4.77 | **InfiniteList / LoadMore** | P1 | IT, SSO | Virtualized list with `onEndReached`, `hasMore`, loading row, and a "Load more" button for keyboard users. |
| 4.78 | **SortableList** (`/dnd`) | P1 | IT, SSO | Vertical reorder with drag handle + keyboard (Space lift, ↑↓ move, Space drop) and live announcements. Backlog ranking, claim order, boot order. |

### 6.3 Forms

| § | Component | P | Users | Design |
|---|---|---|---|---|
| 4.79 | **Network inputs** | P1 | VS, SSO | `IpInput` (v4/v6), `CidrInput`, `MacInput` (normalises to `aa:bb:…`), `VlanInput` (0–4094), `HostPortInput`. Mono, validation messages, paste normalisation. SSO uses IP/CIDR for allow-lists. |
| 4.80 | **ColorField** | P1 | SSO | ADR-12. Hex input + swatch + native colour picker; live contrast report against the card background and on-primary text (AA pass/fail with ratios); preview of Button, Badge and focus ring. |
| 4.81 | **TransferList** | P1 | SSO, VS | Two searchable lists (available / selected) with move buttons, multi-select, counts; virtualized. Group membership, role assignment, VM-host rules. |

### 6.4 SSO (Shadow SSO)

| § | Component | P | Design |
|---|---|---|---|
| 4.82 | **SessionList** | P0 | Rows: device icon (DeviceKind), browser/OS, IP + approximate location, last active (`RelativeTime`), "This device" badge; revoke per row; "Sign out other sessions" with ConfirmDialog. Admin variant adds a user column (DataGrid). |
| 4.84 | **ApiKeyManager** | P0 | List (name, prefix `pk_…abcd`, scope chips, created, expires, last used) + Create dialog (name, expiry presets, scopes) → `SecretDisplay` show-once with forced acknowledge → masked row. Revoke, regenerate. Generic: any show-once secret (personal tokens, service accounts). |
| 4.85 | **SecurityFactors** | P0 | Account security page: password (last changed, change), TOTP (enable/disable), passkeys (name, created, last used, rename via InlineEdit, remove), recovery codes (remaining count, regenerate → show once). Entry point to MfaEnrolment. Removing the last factor warns. |
| 4.86 | **ReauthDialog / SessionExpiryDialog** | P0 | Step-up: password or passkey prompt in a Dialog, `onReauth()` promise, error state. Expiry: countdown (`format.duration`, announced only at 60 s and 10 s), Stay signed in / Sign out. |
| 4.89 | **BrandingEditor** | P2 | Logo (FileDropzone), ColorField, product name, live login-page preview (renders §4.22 components in a scaled frame), per-locale texts. |

Withdrawn (OIDC, §1.3): 4.83 AuthorizedApps, 4.87 IdpConfigForm, 4.88 SigningKeys. Numbers are not reused.

### 6.5 Issue tracker

| § | Component | P | Entry | Design |
|---|---|---|---|---|
| 4.90 | **MarkdownEditor** | P0 | editor | CodeMirror Markdown mode + toolbar (bold, italic, code, link, list, task list, quote); Write/Preview tabs (side by side ≥ 1024 px); paste/drop image → `onUpload(file): Promise<url>` inserts `![…](url)` with a progress placeholder; Ctrl/⌘+Enter submits; `mentions` and `references` sources (4.92). |
| 4.91 | **Markdown** (renderer) | P0 | editor | ADR-5; GFM tables, task lists (optionally interactive → `onTaskToggle(index)`), code blocks with highlighting + copy, heading anchors, external links `rel="noopener noreferrer nofollow ugc"`, lazy images capped to width. Typography from §2. |
| 4.92 | **Mentions & references** | P0 | editor | `mentions: (q) => Promise<{ id, label, avatar? }[]>` on `@`; `references: (q) => Promise<{ id, key, title, status }[]>` on `#`; inserted as Markdown links; the renderer turns `@user` / `#KEY-1` into links (HoverCard-able) via `resolveLink`. |
| 4.93 | **ActivityTimeline** | P0 | core | Vertical list mixing `comment` (Avatar, author, RelativeTime, Markdown body, edited marker, actions menu, Reactions) and `event` (compact line: icon + "Anna changed status from Open to Done", RelativeTime). Reuses AuditLog anatomy. Composer at the bottom. Collapses long runs of events ("12 more updates"). |
| 4.94 | **Reactions** | P2 | core | Emoji chips with count + pressed state (`aria-pressed`), add-reaction popover with a small fixed set; tooltip lists who reacted. |
| 4.95 | **Label / LabelPicker** | P0 | core | `Label` = Chip with palette slot (F4) + optional description tooltip; `LabelPicker` = Combobox v2 multi with swatches; create with slot chooser. |
| 4.96 | **OptionPicker** | P0 | core | Generic icon + label single/multi picker used as StatusPicker, PriorityPicker, AssigneePicker, MilestonePicker; compact trigger (icon only in rows, full in the side pane); optional shortcut (e.g. `s` opens status). |
| 4.97 | **IssueRow / IssueCard** | P0 | core | Row: checkbox, priority icon, key (mono), title link, labels, assignee AvatarGroup, due date (warn/danger when overdue), comment count, updated RelativeTime. Card: same data stacked for boards. Both accept `density`. |
| 4.98 | **FilterBar** | P0 | core | Token query bar (`assignee:me label:bug is:open`) with key/value autocomplete (Combobox v2), facet buttons (OptionPicker), clear, **SavedViews** menu (save/rename/delete/share, default view). Emits structured `Filter[]` + raw query, compatible with DataGrid `filters`. Also used by VS (`power:on host:esx-03`) and the SSO audit log. |
| 4.99 | **PropertiesPane** | P1 | core | Side pane of `{ label, value, editor? }` groups where editor is OptionPicker / InlineEdit / DatePicker; pending + error per field; read-only mode. Editable generalisation of DefinitionList (also VS notes, SSO user detail). |
| 4.100 | **KanbanBoard** | P1 | dnd | Columns (title, count, WIP-limit warning, collapse), virtualized card lists, drag across columns + reorder, keyboard move, swimlanes (group by assignee/priority), `onMove(cardId, toColumn, index)` with optimistic UI and rollback when the promise rejects. |
| 4.101 | **ProgressSummary** | P2 | core | Milestone/sprint: segmented bar (todo/doing/done) with counts and %; burndown via `TimeSeriesChart`. |

### 6.6 vSphere/ESXi clone

| § | Component | P | Entry | Design |
|---|---|---|---|---|
| 4.102 | **CapacityBar** | P0 | core | Label, `used`, `total`, `unit` → `format.bytes/frequency`; Progress meter (§4.24) + "used · free · capacity" line; optional `allocated` (overcommit) marker; thresholds. |
| 4.103 | **ObjectPage** | P0 | core | Recipe on DetailPage: header (ObjectIcon with state, name with InlineEdit, StatusDot, ActionBar), tabs (Summary / Monitor / Configure / Permissions / related objects) via OverflowTabs; Configure uses SubNav; Summary uses DefinitionList + CapacityBars + Panels. Shipped as a playground template, not a monolith. |
| 4.104 | **InventoryLayout** | P0 | core | AdminShell variant: TopBar + SplitPane v2 (TreeView v2 │ outlet) + vertical split for DockedTaskPanel / AlarmList; persisted sizes; tree collapses into a Drawer below 860 px. |
| 4.105 | **ConsoleFrame** | P1 | core | Chrome around a VNC/WebMKS canvas the app provides: toolbar (Send Ctrl+Alt+Del, key-combo menu, fullscreen, scale fit / 1:1, screenshot, disconnect), connection states (connecting / connected / disconnected + reconnect / error), keyboard-grab indicator with "Press Ctrl+Alt to release" hint. |
| 4.106 | **HardwareEditor** | P1 | core | Edit settings: Accordion of devices (CPU: count, cores per socket, reservation; Memory: NumberInput with units + reservation; Disk: size, provisioning, controller; NIC: network Select, adapter type, connected Switch; CD/DVD: ISO via DatastoreBrowser picker); "Add device" SplitButton; per-row remove; pending-diff summary before save; hot-add disabled states with reason tooltip. Data-driven: `devices`, `capabilities`, `onChange`. |
| 4.107 | **DatastoreBrowser** | P1 | core | TreeView v2 (folders, lazy) │ DataGrid v2 (name, size, modified, type icon); breadcrumb path; upload (FileDropzone with per-file progress), download, new folder, delete (ConfirmDialog); picker mode (`select: "file" \| "folder"`, `accept: [".iso"]`) for HardwareEditor and wizards. |
| 4.108 | **SnapshotTree** | P2 | core | TreeView v2 with snapshot icon, name, RelativeTime, size, "You are here" node; actions: take, revert (ConfirmDialog), delete, delete children; consolidation Banner. |
| 4.109 | **PermissionAssignDialog** | P1 | core | Principal (Combobox v2 over users + groups), role (Select with description), "Propagate to children" Switch, read-only object path; reused by SSO for realm-level grants. |
| 4.110 | **PerfPanel** | P1 | charts | TimeSeriesChart + TimeRangePicker + metric chooser (Combobox v2 multi, grouped CPU / Memory / Disk / Network) + "Show data" table + CSV export. |
| 4.111 | **EventConsole** | P2 | core | DataGrid v2 + FilterBar + RelativeTime + severity StatusDot + detail Drawer; live-tail toggle. Shares its row model with AuditLog/AlarmList. |

---

## 7. Cross-cutting requirements

1. **Testing** (extends `COMPONENTS.md` §6 rule 6): every new or upgraded component adds tests: axe smoke, keyboard path, controlled/uncontrolled parity, one regression per fixed bug. Data components get a playground benchmark page (`?bench=grid`, `?bench=tree`) checked each release.
2. **Visual regression**: Playwright screenshots of playground sections at 1× and 2× (§7 DoD), introduced in M6; every new component has a playground section from day one.
3. **Tree-shake & bundle budgets** (gzip, React external): per-import budgets from §2.2 rule 6 for every exported component (default ≤ 15 kB unless it lists a heavier base); full entries: core ≤ 80 kB, charts ≤ 70 kB, editor ≤ 180 kB, dnd ≤ 30 kB. CI fails above budget.
4. **i18n**: no string literals in components outside the `en` catalogue; `hu` catalogue complete; tests render under `hu` with long accented strings and at 320 px.
5. **Performance**: virtualization thresholds documented per component; resize/drag handlers use pointer events + `requestAnimationFrame`.
6. **Security**: Markdown is sanitized; user-content links get `rel="noopener noreferrer nofollow ugc"`; secrets never appear in `title` / `aria-label`; secret fields disable autocomplete and spellcheck.
7. **Deprecations**: one minor release with a dev-only `console.warn`, then removal: `DateTimeInput`, `LineChart` for multi-series time data, positional `DiffView`, string `TreeView.selected`, single `DataGrid.sort`, `OidcClientList`, `OidcClientForm`.

---

## 8. Open questions

| # | Question | Default if unanswered |
|---|---|---|
| Q1 | Does the issue tracker store Markdown or a rich JSON document? | Markdown (ADR-4/5). |
| Q2 | VM console protocol: noVNC, WebMKS or SPICE? | noVNC; ConsoleFrame is protocol-agnostic. |
| Q3 | Perf chart sample rate and retention per view? | 20 s samples for 1 h realtime, rollups beyond; LTTB to pixel width. |
| ~~Q4~~ | ~~Where does `@pilab/auth` live?~~ | **Resolved:** not built; apps use `@pilab/shadow-sso` (§1.3). |
| Q5 | Storybook or promote the playground? | Promote the playground + Playwright screenshots (lighter). |
| Q6 | Is the FilterBar query syntax shared with the backends? | Yes: publish the grammar (`key:value`, `-key:value`, quoted values, `is:` / `has:`) when built. |
