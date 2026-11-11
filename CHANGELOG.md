# Changelog

Follows [semver](https://semver.org). Pre-1.0, minor versions may contain breaking changes; deprecations are announced one minor ahead.

## 1.0.0

See [`docs/MIGRATION.md`](docs/MIGRATION.md).

### Added
- Dialog size variants: `DialogContent`/`Modal` `size` (`xs|sm|md|lg|xl|2xl|full`), viewport-capped with a scrolling body and pinned head/footer; `Wizard` takes `size` (default `xl`), uses container queries (horizontal stepper when narrow) and a full-width wrapping footer row so buttons never overflow.
- OS icons: new subpath `@pilab/laf/os-icons` with `OsIcon` (brand/mono), `VmOsIcon` (OS logo + state badges), `guestOsToId` (vSphere guest IDs and free-form names), `osIcons`/`osList`/`osIds`; brand marks from `simple-icons` (CC0 paths, named imports), neutral generic glyphs where no mark is available (Windows, Oracle Linux, Amazon Linux, Solaris, oVirt, unknown); core bundle unchanged; demo `?demo=os-icons`; docs in `docs/icons.md`.
- Storage & network glyphs (`SsdGlyph`, `HddGlyph`, `NvmeGlyph`, `IscsiGlyph`, `SanGlyph`, `NasGlyph`, `NfsGlyph`, `VdiskGlyph`, `RaidGlyph`, `DiskArrayGlyph`, `LunGlyph`, `VolumeGlyph`, `VSwitchGlyph`, `VnicGlyph`, `VlanGlyph`, `FirewallGlyph`, `LoadBalancerGlyph`, `RouterGlyph`, `UplinkGlyph`, `VpnGlyph`) and `ObjectIcon` kinds `ssd`, `hdd`, `nvme`, `iscsi`, `san`, `nas`, `vdisk`, `raid`, `disk-array`, `lun`, `volume`, `vswitch`, `vnic`, `vlan`, `firewall`, `load-balancer`, `router`, `uplink`; `StateBadge` is now exported.
- Icon kit: custom SVG glyphs `VmGlyph`, `ServerGlyph` (one server), `ClusterGlyph` (several servers), `DatacenterGlyph` (HQ building with racks), `TemplateGlyph`; new `ObjectIcon` kinds `mailbox`, `shared-mailbox`, `domain`, `mail-queue`, `repository`, `token`, `policy`; `objectKinds`; kind/state gallery in `?demo=vs-objects`.
- Composite object icons: `ObjectIcon` states `running`/`paused`/`stopped`/`crashed`/`hibernated` (plus existing `maintenance`/`error`/`warning`/`disconnected`; `on`/`off`/`suspended` kept as aliases) drawn as a coloured badge disc with the base glyph dimmed/faded/red per state, a second `overlay` badge, `objectStateMeta`/`objectStates`; `PowerState` shares the same metadata; en/hu strings. vCenter demo tree shows them.
- Portal kit: `PortalLayout`, `PortalHome`, `AppSwitcher`, route model helpers; `useServerGrid` and `ServerDataGrid`; `DataGrid` `pagination`/`onRetry`/`GridColumn.filterOptions` (manual mode keeps rows while loading, in-grid error row, total/page-size footer, page-scoped select-all); `portal` catalogue group (en/hu); demo `?demo=portal`.
- Dashboard kit: Card v2, `MetricCard`/`MetricGrid`/`RadialGauge`/`GaugeCard`/`ProgressCard`/`StatusSummaryCard`, charts `AreaChart`/`LineChart`/`BarChart`/`DonutChart`/`ChartCard`/`ChartLegend`/`ChartTooltip`, `SegmentedBar`/`ThresholdDonut`/`UtilizationCard`, upgraded `Alert`/`Banner`, `AlertGroup`, toasts (`max`, `position`, `description`, `useToasts`), `UserMenu avatarSrc`, `TimeSeriesChart legend`, `dashboard` catalogue group (en/hu), `docs/charts.md`, demo `?demo=dashboard`. `Gauge` and `Heatmap` already existed and are unchanged; the new gauge is `RadialGauge`.
- App shell: `AppFrame`, `Masthead*`, `ThemeToggle`, `NavTree`/`Sidebar` (nested nav, rail, tree mode), `AppFooter`, `PageHeader`/`PageSection`, inline `DrawerPanel`/`InlineDrawer`; `Breadcrumb` gains `onClick`/`icon`/`render`/`current`/`separator`; `TopBar as="div"`; `Tooltip` `open`/`onOpenChange`. Demo `?demo=app-frame`.
- Mail admin demo `?demo=mail-admin` (Exchange-style panel for pimail over a typed mock API) with new `mail` catalogue group (en/hu) and components `QueueStatusBadge`, `QuotaBar`, `ServiceTile`/`HealthGrid`, `DnsRecordTable`, `TraceTimeline`; see `docs/mail-admin.md`.
- Resource overview kit (`lib/components/overview.tsx`): `ResourceOverviewLayout` (container-query grid, one column below 860 px), `ObjectHeader`, `ActionToolbar` (buttons and split buttons), `IdentityCard`, `DetailsCard`, `SideCard`/`CountCard`, `UtilizationPanel`/`UtilizationColumn` (threshold donut or radial gauge + area sparkline), `PowerState`; new `overview` catalogue group (en/hu); demo `?demo=resource-overview` (oVirt-style VM page and a mailbox variant). `ThresholdDonut` gains `centerText` and `okTone`; `Sparkline` gains `area`.
- `@pilab/laf/topology` entry (`TopologyGraphFlow`, optional peer `@xyflow/react`).
- Per-component label sets (account, admin, tracker, vSphere objects, charts) in `messages.components` with Hungarian translations; `useLafDefaults`.
- Rules tests: logical (RTL-safe) CSS classes, no unguarded fixed widths ≥ 320 px, `hu` long-string sweep, `dir="rtl"` smoke test. `src/app.css` and components use logical properties (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`).

- Chart animation & tooltips: every chart (`AreaChart`, `LineChart`/`TimeSeriesChart`, `BarChart`, `DonutChart`, `SegmentedBar`, `ThresholdDonut`, `UtilizationCard`, `StackedBarChart`, `Heatmap`, `RadialGauge`/`GaugeCard`, `Gauge`, `Sparkline`) takes `animate` (`boolean | {duration, easing, stagger}`, default on; always off under `prefers-reduced-motion`) and `tooltip` (`false | true | render({point, series, index}) | {formatter, header}`; `Sparkline` defaults to off, gauges have no tooltip). Entry draw-in/grow/sweep/fade, smooth value-change tweens, hover/legend emphasis, shared crosshair tooltip for time series, per-segment tooltips elsewhere (hover, tap, focus/arrow keys, Escape, outside press), `role="tooltip"` + `aria-describedby`, viewport-clamped portal that is never clipped by `overflow-hidden` cards. New exports: `ChartTooltipFor`, `useTooltipDismiss`, `useChartMotion`, `usePrefersReducedMotion`, types `ChartAnimate`, `ChartMotion`, `ChartTooltipOption`, `ChartTooltipContext`, `ChartTooltipPoint`, `ChartTooltipSeries`. `ChartTooltip` gains `children`/`id`/`container`/`placement`; `ChartLegend` gains `onHover`; `Heatmap` is now wrapped in a positioned `div`; `Sparkline` is wrapped in a `span` (`className` moves there). Demo section "Animation & tooltips" in `?demo=dashboard`.

### Removed (breaking)
- `DataGridLegacy`, `GridColumnLegacy`, `GridSortLegacy`; the old `TreeTable` (`TreeTableV2` is now `TreeTable`); `DataGrid` single-object `sort` and string `selected` (arrays only).

### Performance (jsdom, keyboard-step median)
- DataGrid, 50 000 rows: about 8–13 ms idle (best run under the 16 ms goal; up to about 19 ms under full parallel test load).
- TreeView, 10 000 nodes: about 4–7 ms.

### Bundle sizes (gzip, React external, minified)
| Entry | Size | Budget |
|---|---|---|
| core (everything) | about 187 kB | ≤ 220 kB |
| `/charts` | 34.5 kB | ≤ 36 kB |
| `/editor` | 18.8 kB | ≤ 24 kB |
| `/dnd` | 16.8 kB | ≤ 30 kB |
| `/topology` | 13.2 kB | ≤ 20 kB |
| `Button` only | 12.0 kB | ≤ 13 kB |

The design's 80 kB core target is not met: Radix, TanStack and lucide are bundled into the core entry.

## 0.1.x

### Added
- `LafProvider` / `useLaf` with a typed `LafMessages` catalogue (English built in, Hungarian at `@pilab/laf/locales/hu`). Hardcoded strings in Pagination, DatePicker, Combobox, DataGrid, CommandPalette, Drawer/Dialog close, TagInput, KeyValueEditor, LogViewer, TimeRangePicker, FileDropzone, AlarmList, PasswordField, CopyButton, Spinner and UserSelector now come from it.
- `useControllableState`, `format.bytes`, `diffLines`, `matchesAccept` utilities.
- `DiffView` `mode="unified"`.
- `TreeView`: `defaultExpanded`, `defaultSelected`; `expanded`/`selected` are now optional (uncontrolled use).
- `Accordion`: controlled `open` / `onOpenChange`.
- `SecretDisplay`: controlled `acknowledged`, `masked`.

- ADR-1 packaging: `@pilab/laf/charts`, `/editor`, `/dnd` entries (stubs for now) and `./locales/*` exports; visx, CodeMirror, react-markdown stack, dnd-kit and xyflow are optional peer dependencies; `tests/treeshake.test.ts` guards per-import bundle budgets.
- `LafProvider`: `timeZone`, `portalContainer` (used by Dialog, Drawer, Popover, Dropdown/Context menus, Tooltip); `useLaf()` exposes `timeZone` and `format`; `usePortalContainer()`.
- More strings routed through the catalogue (MfaEnrolment, ErrorSummary, Breadcrumb, Banner, NumberInput, Slider, PasswordField, ConfirmDialog, TimeRangePicker, LogViewer, Tenant/Permission, TaskPanel, UserMenu, OverflowTabs, DockedTaskPanel…) with Hungarian translations; `tests/rules.test.ts` fails on literal `aria-label`/`placeholder`/`title` strings and on missing `hu` keys.
- Formatters `format.*` / `createFormatters()`: `bytes` (`{ base: 1024 | 1000 }`, IEC/SI labels), `bitrate`, `frequency`, `duration` (short/clock), `percent`, `relative`, `dateTime`. `format.bytes(n)` output is unchanged.
- `ObjectIcon` / `registerObjectKind` object icon registry with state glyph and text alternative.
- Label palette tokens `--label-1…12` (+ `-bg`/`-fg`, `bg-label-n`/`text-label-n` utilities) with contrast tests.

### Fixed
- B2 `FileDropzone` enforces `accept` for drop/paste/pick and formats sizes with `format.bytes`.
- B3 `DiffView` uses an LCS line diff instead of positional comparison.
- B4 `Combobox` listbox is portaled (Radix Popover) so it is no longer clipped.
- B5 `KeyValueEditor` uses stable row keys.

### Removed
- **Breaking:** `OidcClientList`, `OidcClientForm` and the `OidcClient` type (use the OIDC screens in `shadow-sso-accounts`).
