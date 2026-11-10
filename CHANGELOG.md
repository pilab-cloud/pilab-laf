# Changelog

Follows [semver](https://semver.org). Pre-1.0, minor versions may contain breaking changes; deprecations are announced one minor ahead.

## 0.1.x (unreleased)

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
