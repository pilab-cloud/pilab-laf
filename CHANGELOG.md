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

### Fixed
- B2 `FileDropzone` enforces `accept` for drop/paste/pick and formats sizes with `format.bytes`.
- B3 `DiffView` uses an LCS line diff instead of positional comparison.
- B4 `Combobox` listbox is portaled (Radix Popover) so it is no longer clipped.
- B5 `KeyValueEditor` uses stable row keys.

### Deprecated
- `OidcClientList`, `OidcClientForm` (use `shadow-sso-accounts`; removed in 0.2).
