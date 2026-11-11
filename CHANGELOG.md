# Changelog

Follows [semver](https://semver.org). Pre-1.0, minor versions may contain breaking changes; deprecations are announced one minor ahead.

## 1.0.0

See [`docs/MIGRATION.md`](docs/MIGRATION.md).

### Added
- App shell: `AppFrame`, `Masthead*`, `ThemeToggle`, `NavTree`/`Sidebar` (nested nav, rail, tree mode), `AppFooter`, `PageHeader`/`PageSection`, inline `DrawerPanel`/`InlineDrawer`; `Breadcrumb` gains `onClick`/`icon`/`render`/`current`/`separator`; `TopBar as="div"`; `Tooltip` `open`/`onOpenChange`. Demo `?demo=app-frame`.
- `@pilab/laf/topology` entry (`TopologyGraphFlow`, optional peer `@xyflow/react`).
- Per-component label sets (account, admin, tracker, vSphere objects, charts) in `messages.components` with Hungarian translations; `useLafDefaults`.
- Rules tests: logical (RTL-safe) CSS classes, no unguarded fixed widths ≥ 320 px, `hu` long-string sweep, `dir="rtl"` smoke test. `src/app.css` and components use logical properties (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`).

### Removed (breaking)
- `DataGridLegacy`, `GridColumnLegacy`, `GridSortLegacy`; the old `TreeTable` (`TreeTableV2` is now `TreeTable`); `DataGrid` single-object `sort` and string `selected` (arrays only).

### Performance (jsdom, keyboard-step median)
- DataGrid, 50 000 rows: about 8–13 ms idle (best run under the 16 ms goal; up to about 19 ms under full parallel test load).
- TreeView, 10 000 nodes: about 4–7 ms.

### Bundle sizes (gzip, React external, minified)
| Entry | Size | Budget |
|---|---|---|
| core (everything) | about 187 kB | ≤ 220 kB |
| `/charts` | 21.7 kB | ≤ 30 kB |
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
