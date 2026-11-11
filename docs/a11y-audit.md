# Accessibility audit

## 1. Automated pass (axe-core) — performed

`tests-e2e/checks.spec.ts` runs `@axe-core/playwright` against every playground demo (`/?demo=<id>`, ids read from
`playground/App.tsx`) in Chromium with tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` and `best-practice`.
The suite fails on any violation. Run it with `bun run e2e` (or `bun run e2e --project=checks`).

Disabled rules (page-level; the demos are fragments, the consuming app owns them): `landmark-one-main`,
`page-has-heading-one`, `region`.

Result of the last run: **21 demos, 0 violations.** The 320 px column is the horizontal-overflow sweep from the same spec
(no page-level horizontal scroll at a 320 px viewport; content inside a self-scrolling container is allowed).

| Demo id | Demo | axe violations | axe | 320 px sweep |
|---|---|---|---|---|
| `catalogue` | Catalogue | 0 | pass | pass |
| `app-shell` | App shell | 0 | pass | pass |
| `primitives` | Primitives | 0 | pass | pass |
| `combo-menus` | Combo & menus | 0 | pass | pass |
| `datagrid` | DataGrid | 0 | pass | pass |
| `tree` | Tree | 0 | pass | pass |
| `filterbar` | FilterBar | 0 | pass | pass |
| `account-security` | Account › Security | 0 | pass | pass |
| `account-sessions` | Account › Sessions | 0 | pass | pass |
| `account-api-keys` | Account › API keys | 0 | pass | pass |
| `admin-users` | Admin › Users & groups | 0 | pass | pass |
| `admin-roles` | Admin › Roles | 0 | pass | pass |
| `admin-branding` | Admin › Branding | 0 | pass | pass |
| `vcenter` | vCenter | 0 | pass | pass |
| `tracker` | Tracker | 0 | pass | pass |
| `charts` | Charts | 0 | pass | pass |
| `editor` | Editor | 0 | pass | pass |
| `dnd` | Dnd & hotkeys | 0 | pass | pass |
| `vs-layout` | VS layout | 0 | pass | pass |
| `vs-objects` | VS objects | 0 | pass | pass |
| `tracker-parts` | Tracker parts | 0 | pass | pass |

Automated tooling finds roughly a third of WCAG issues at best. It does **not** replace section 2.

### Violations found and fixed while introducing the suite

- `label-content-name-mismatch` — `UserMenu` trigger had `aria-label={name}` while showing initials; the label was removed so the
  name comes from the avatar image role. The playground account button now has a label that contains the visible initials.
- `DatePicker` trigger label now includes the current value (`Choose date: 2026-03-10`) instead of a generic label.
- `Heatmap` now exposes proper `row` structure inside its `role="table"`.
- Overflow at 320 px: chart figure and `TimeRangePicker` (wrap instead of fixed width), sortable drag handle (`.btn` is
  `w-full` by default), `.device-list`, `.pagination` wrapping, `.table-wrap` is now a positioning context so its
  `sr-only` children can't widen the page, OverflowTabs wrapper.

### 320 px exceptions

None: `OVERFLOW_EXCEPTIONS` in `tests-e2e/checks.spec.ts` is empty. The playground applies `.grid > * { min-width: 0 }`
(`playground/harness.css`) because the demos use implicit `grid` tracks; apps that place wide content in an auto-column
grid need the same (`grid-cols-1` or `min-w-0`).

## 2. Manual screen-reader pass — NOT PERFORMED

> **Status: not performed.** No VoiceOver, NVDA or JAWS testing has been done by the automated agent or anyone else.
> This is a checklist for a human tester. Do not record any item as passed until it was actually exercised.

Test matrix (fill in tester, date, versions):

| Combination | Tester | Date | Result |
|---|---|---|---|
| VoiceOver + Safari (macOS) | | | NOT PERFORMED |
| NVDA + Firefox (Windows) | | | NOT PERFORMED |
| NVDA + Chrome (Windows) | | | NOT PERFORMED |
| VoiceOver + Safari (iOS) | | | NOT PERFORMED |
| TalkBack + Chrome (Android) | | | NOT PERFORMED |

Demos to cover (roadmap M6: the three product demos first): `vcenter`, `tracker`, `account-security` /
`admin-users`; then the rest of the table above.

Checklist per demo (all items NOT PERFORMED):

- [ ] Page/landmark structure is announced sensibly (navigation, main, complementary); headings give a usable outline.
- [ ] Every interactive control has a meaningful name, role and state announced (expanded, selected, pressed, checked, disabled).
- [ ] Tab order follows reading order; no keyboard traps; focus is always visible.
- [ ] Dialogs, drawers, popovers, menus and the command palette: focus moves in, is trapped, returns to the trigger on close; Esc closes.
- [ ] Menus, listbox/combobox, tabs, tree, grid: arrow-key, Home/End, type-ahead behave per the ARIA APG and are announced.
- [ ] DataGrid: row/column counts, header association, sort state, selection changes, and virtualised rows are announced correctly.
- [ ] TreeView: level, position, expanded state; drag and drop has a keyboard alternative with announcements.
- [ ] Kanban/SortableList: keyboard pick-up, move and drop are announced via the live region.
- [ ] Toasts, banners, `ErrorSummary` and async status use polite/assertive live regions appropriately and are not repeated.
- [ ] Form fields: labels, descriptions and errors are associated; required/invalid state announced; error summary links move focus.
- [ ] Charts: label and data alternative are available; keyboard crosshair/brush instructions are announced.
- [ ] Icon-only buttons and avatars announce a name; decorative icons are silent.
- [ ] `hu` locale: announcements are in Hungarian and pronounced acceptably.
- [ ] RTL (`dir="rtl"`): reading and arrow-key directions are correct.
- [ ] 200 % zoom / 320 px reflow: nothing is lost, and reading order is preserved.
- [ ] Windows High Contrast / forced-colors and `prefers-reduced-motion` are honoured.
