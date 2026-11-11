# Migrating `repisitory/web` from PatternFly to LAF

Scope: every `@patternfly/*` import in `repisitory/web/src` (React 19 app, 6 views, 2 form modals, masthead/shell) — 81 `react-core`
components, 1 `react-component-groups`, 6 `react-table`, 33 `react-icons`. Everything imports from `@pilab/laf` unless noted.
Components marked **new** were added with this guide (`lib/components/{toolbar,content}.tsx`); **shell** components come from the
app-frame work (`lib/components/app-frame.tsx`, `drawer-panel.tsx`).

Conventions to know before porting:

- LAF takes **plain values**, not PatternFly's `(event, value)` callbacks: `onChange={(v) => …}` for `SelectMenu`/`SegmentedControl`/`Tabs`;
  `Input`/`Textarea` keep the native `onChange(event)`.
- Layout props are plain unions (`gap="sm"`, `justify="between"`), not responsive objects (`{{ default: 'justifyContentSpaceBetween' }}`).
- Colours are tokens/label slots, never inline hex (`style={{ color: '#c9190b' }}` → `text-danger`, `text-ok`).
- Visible labels live in the catalogue (`LafProvider messages={hu}`); every label-like prop is an optional override.
- No `@patternfly/react-core/dist/styles/base.css` import: remove it from `main.tsx` and import `@pilab/laf/app.css` once.

## 1. Components (`@patternfly/react-core`)

| PatternFly | LAF replacement | Props / porting notes |
|---|---|---|
| `ActionGroup` | `ActionGroup` (**new**) | Same role: row of submit/cancel buttons inside `Form`. |
| `Alert` | `Alert` | `variant="danger"→tone="error"`, `success→"ok"`, `warning→"warning"`, `info→"info"`; `title` → put it in a `<strong>` in the children; `isInline`/`isLiveRegion` are implied (role switches to `alert` for error/warning). |
| `AlertActionCloseButton` / `actionClose` | `IconButton` (`X` icon, `label={t.dismiss}`) inside the Alert children, or `Banner` for page-level notices | `Alert` has no built-in dismiss slot (gap §4). |
| `Avatar` | `Avatar` | `alt`→`name` (also the accessible name), `src` kept. |
| `Badge` | `Badge` | `isRead`→`plain`; count badges: `tone="neutral"`. |
| `Breadcrumb`, `BreadcrumbItem` | `Breadcrumb` (items array) — or the `PageHeader` `breadcrumb` slot (**shell**) | `<BreadcrumbItem to>` → `{ label, href }`; last item (no `href`) is the current page. `maxItems` collapses long trails. |
| `Button` | `Button` | `variant`: `primary→primary`, `secondary→secondary`, `tertiary/link/plain→ghost`, `danger→danger`; `isSmall`/`size="sm"→size="sm"`; `icon`→`leftIcon`/`rightIcon`; `isLoading→loading`; `isDisabled→disabled`; `component="a"` → `asChild`. Icon-only: `IconButton label icon`. |
| `Card`, `CardBody`, `CardFooter`, `CardHeader`, `CardTitle` | `Panel` (title/actions header + body) or `Card` for a bare surface | `<Card><CardTitle>` → `<Panel title actions headingLevel>`; `CardFooter` → a `<div className="mt-3 flex justify-end gap-2">` inside the body; `isCompact` → `bodyClassName="p-3"`; `isFullHeight` → `className="h-full"`. Stat cards (DashboardView) → `Stat` + `StatGrid`. |
| `Checkbox` | `Checkbox` | `label`→children; `isChecked`→`checked`; `onChange(event, checked)` → native `onChange(e)` (`e.target.checked`); `id`/`name` unchanged. |
| `ClipboardCopy` | `ClipboardCopy` (**new**) | `isReadOnly→readOnly`, `hoverTip→hoverTip` (button name), `clickTip→clickTip`, `variant="expansion"→"expandable"`, `variant="inline-compact"` kept; `isExpanded→expanded`/`defaultExpanded`; text may be `children` or `value`; `onCopy(value)` (no event). |
| `CodeBlock`, `CodeBlockCode` | `CodeBlock` (**new**) | `CodeBlockCode` is kept as a transparent child so the PF tree ports unchanged; or pass `code="…"`. Extras: `language`, `lineNumbers`, `wrapToggle`/`wrap`, `maxHeight`, `actions`. `actions={<CodeBlockAction>…}` → plain buttons. |
| `DescriptionList` (+`Group`/`Term`/`Description`) | `DescriptionList` (+`Group`/`Term`/`Description`) (**new**) | `isHorizontal→layout="horizontal"`, `columnModifier={{default:'2Col'}}→layout="grid" columns={2}`, `isCompact→compact`. For a quick key/value list from data use `DefinitionList items`. Term `icon` slot replaces `DescriptionListTermHelpText`. |
| `Divider` | `Divider` (**new**) | `orientation={{default:'vertical'}}→orientation="vertical"`; `component="li"` → wrap yourself. |
| `Dropdown`, `DropdownList`, `DropdownItem` | `Dropdown`, `DropdownList`, `DropdownItem` (**new**) — or `Menu items={MenuItemSpec[]}` for data-driven menus | `toggle={(ref)=>…}` → `toggle={<MenuToggle>…</MenuToggle>}` (no ref juggling, Radix attaches it); `isOpen`/`onOpenChange(open)` → `open`/`onOpenChange(open)`; `onSelect` moves to each item; `isDanger → danger`; `isDisabled → disabled`; `<Divider/>` → `DropdownSeparator`; `description` slot kept. The masthead user menu: `Menu` with `MenuItemSpec` (labels, icons, separator) is shorter. |
| `EmptyState`, `EmptyStateBody`, `EmptyStateActions`, `EmptyStateFooter` | `EmptyState` | One component: `icon`, `title`, `description`, `action` (put `EmptyStateActions`/`Footer` buttons in a fragment/`Flex` and pass as `action`). `titleText`/`headingLevel` not needed. |
| `Flex`, `FlexItem` | `Flex`, `FlexItem` (**new**) | `justifyContent={{default:'justifyContentSpaceBetween'}}→justify="between"`; `alignItems={{default:'alignItemsCenter'}}→align="center"`; `spaceItems={{default:'spaceItemsSm'}}→gap="sm"` (`xs sm md lg xl none`); `direction={{default:'column'}}→direction="column"`; `flexWrap`→`wrap`; `FlexItem` `flex={{default:'flex_1'}}→grow`, `align={{default:'alignRight'}}→pushEnd`, `spacer`→use `gap`. |
| `Form`, `FormGroup`, `FormHelperText` | `Form`, `FormGroup`, `FormHelperText` (**new**) | `FormGroup`: `label`, `fieldId`, `isRequired→required` (asterisk + SR "required" from the catalogue), `role="radiogroup"`/`isInline`→`fieldset` (renders `<legend>`), `labelHelp→labelInfo`. For label/description/error ids wired by render-prop use `FormField`; validation summary: `ErrorSummary`. |
| `Grid`, `GridItem` | `Grid`, `GridItem` (**new**) | `hasGutter→gap="md"` (default; `gap="none"` to disable); `span={3}` as is; `md={6}`/`lg`/`xl`/`xxl`/`sm` per breakpoint; `rowSpan`. 12 columns, items default to 12. |
| `HelperText`, `HelperTextItem` | `HelperText`, `HelperTextItem` (**new**) | `variant="error"|"success"|"warning"|"default"`; error items are `role="alert"`; `isDynamic`/`icon` → `icon` prop. |
| `Label` | `Chip` with `color` (label slot 1–12) for coloured tags; `Badge` for status; `StatusDot` for state | `isCompact` is the default size. Colour map: `red→1`, `orange→2`, `yellow/gold→3`, `green→5`, `teal→6`, `cyan→7`, `blue→8`, `purple→10`, `grey→Badge tone="neutral"`. `icon` → put the icon in the children. `onClose`→`onRemove`. Status colours: `green→Badge tone="ok"`, `red→"danger"`, `orange→"warn"`, `blue→"primary"`. `getEcoColor(...)` → return a `LabelSlot` number. `style={{textTransform}}` → `className="uppercase"`. |
| `Masthead`, `MastheadMain`, `MastheadToggle`, `MastheadBrand`, `MastheadLogo`, `MastheadContent`, `PageToggleButton` | `Masthead`, `MastheadToggle`, `MastheadBrand`, `MastheadContent`, `MastheadActions` (**shell**) | `MastheadMain`+`MastheadBrand`+`MastheadLogo` collapse into `MastheadBrand logo title href`; `PageToggleButton` = `MastheadToggle` (wired to `AppFrame`). |
| `MenuToggle`, `MenuToggleElement` | `MenuToggle` (**new**) for `Dropdown`; `SelectMenu`/`Combobox` own their trigger | `variant="plain"→"plain"`, `isExpanded→expanded`; `type MenuToggleElement`/`ref` plumbing disappears. |
| `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter` | `Modal`, `ModalHeader`, `ModalBody`, `ModalFooter` (**new**) | `isOpen→open`, `onClose` kept (also `onOpenChange`), `variant="small|medium|large"→size="sm|md|lg"` (`xl` extra); `ModalHeader title description` (+ built-in close button); `help`/`labelId` not needed (Radix wires `aria-labelledby`). Confirmations: `ConfirmDialog`; unsaved forms: `useUnsavedChangesGuard`. Triggerless use is the norm; `ModalTrigger`/`ModalClose` exist. |
| `Nav`, `NavList`, `NavItem`, `NavExpandable` | `NavTree` / `Sidebar` (**shell**); simple lists: `NavGroup` + `NavLink`, section nav: `SubNav` | `isActive→current`, `NavExpandable title` → group with `items`; icons via `icon`. |
| `Page`, `PageSidebar`, `PageSidebarBody` | `AppFrame` (`masthead`, `sidebar`, `footer`) (**shell**) | Sidebar collapse state/skip link/landmarks are handled by the frame. |
| `PageSection` | `PageSection` (**shell**) | `variant="secondary"→filled`, `isFilled`, `padding`, `stickyTop→sticky`. |
| `PageHeader` (`react-component-groups`) | `PageHeader` (**shell**) | `title`, `subtitle`, `breadcrumb`, `actionMenu`→`actions`, `icon`, `badges`. |
| `Progress`, `ProgressMeasureLocation` | `Progress` | `value`, `max` (PF `min` fixed at 0), `title`→`label` (aria-label); `measureLocation` → render the value text yourself next to it; `variant="danger|warning|success"` → `meter` (auto green/amber/red via `warnAt`/`dangerAt`). Capacity gauges: `Gauge`. |
| `SearchInput` | `SearchInput icon={<Search />}` (plain), `FilterBar` (field:value queries) or `GridSearch` (inside DataGrid) | `onChange(event, value)` → native `onChange(e)`; `onClear` → controlled `value` + a clear `IconButton`, or use `FilterBar`. `aria-label` is now required. |
| `Select`, `SelectList`, `SelectOption` (+ `MenuToggle`) | `SelectMenu options` (single); `Combobox` (typeahead, multi, async, create) | `onSelect(_, v)` → `onValueChange(v)`; `selected`→`value`; `<SelectOption value description isDisabled>` → `{ value, label, description, disabled }`; the whole `toggle` render-prop disappears. Multi/typeahead was **not** added to `SelectMenu`: `Combobox multiple` already covers it. |
| `Spinner` | `Spinner` | `size="sm"→"sm"`, `md→"md"`, `lg→"lg"`, `xl→"lg"`; `aria-label`→`label`. |
| `Tab`, `Tabs`, `TabTitleIcon`, `TabTitleText` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `activeKey`/`onSelect(_, key)` → `value`/`onValueChange(key)` (uncontrolled: `defaultValue`); `eventKey`→`value`; title icon/text → children of `TabsTrigger`; `ouiaId`, `mountOnEnter` dropped (Radix unmounts inactive content). Many tabs: `moreTabs` overflow is in the catalogue. |
| `TextArea` | `TextArea` (**new** alias of `Textarea`) | `onChange(event, value)` → `onChange(e)`; `validated="error"→invalid`; `resizeOrientation` → class. |
| `TextInput` | `TextInput` (**new** alias of `Input`) | `onChange(event, value)` → `onChange(e)`; `validated="error"→invalid`; `isRequired→required`; passwords: `PasswordField`; dates: `DateTimeInput`. |
| `Title` | `Title` (**new**) | `headingLevel` and `size` (`md…4xl`) kept; default size follows the level. Coloured titles: `className="text-danger"`/`text-ok`. |
| `ToggleGroup`, `ToggleGroupItem` | `SegmentedControl items` | `isSelected`/`onChange` per item → one `value`/`onValueChange` (`type="multiple"` for multi-select); `text`/`icon` → `label`/`icon` (icon-only needs `aria-label`); `aria-label` required on the group. |
| `Toolbar`, `ToolbarContent`, `ToolbarItem`, `ToolbarGroup` | `Toolbar`, `ToolbarContent`, `ToolbarItem`, `ToolbarGroup` (**new**, v2) | `variant="filter-group"→<ToolbarGroup variant="filter">`, `align={{default:'alignEnd'}}→align="end"` (or `variant="pagination"`), `ToolbarItem` `variant="separator"→ToolbarDivider`, `style={{flexGrow:1,minWidth,maxWidth}}→<ToolbarItem grow>` (`className="max-w-md"`); `isStatic`/`isFullHeight` (masthead) → `Masthead`/`MastheadActions` (**shell**); `clearAllFilters`/`ToolbarFilter` chips → `ToolbarFilterChips`; selected-count/bulk → `Toolbar selectedCount bulkActions`. Add `aria-label` for `role="toolbar"` + arrow keys. |
| `Tooltip` | `Tooltip content side` | Wrap the trigger directly (no `triggerRef`); mount a `TooltipProvider` once (the playground does). Icon-only controls should prefer `IconButton label` (accessible name) + `Tooltip`. |

## 2. Tables (`@patternfly/react-table`)

| PatternFly | LAF replacement | Notes |
|---|---|---|
| `Table` (`variant="compact"`) | `Table` (native semantics, `.table` styling) for small static lists; `DataGrid` for sort/filter/selection/virtual rows | Default to `DataGrid` for TokensView, PackagesView, OCIView, RepositoriesView, ACLView and AuditView; `Table` is enough for the dashboard's "Top consumers"/"Recent events". `variant="compact"` → `density="compact"`. |
| `Thead`, `Tr`, `Th` | `GridColumn[]` (`id`, `header`, `sortable`, `numeric`, `width`) | `sort={{ sortBy, onSort }}` → `sort={[{ id, dir }]}` + `onSortChange`; `Th width` → `width`; hidden columns → column visibility menu. With `Table`: plain `<thead><tr><th>`. |
| `Tbody`, `Td` | `cell: (row) => ReactNode` per column | `Td dataLabel` not needed (grid cells expose their column header); `Td isActionCell`/`ActionsColumn` → `rowActions={(row) => GridMenuItem[]}` (kebab); `expand` → `renderExpanded`; row click → `onRowActivate`. |
| Selection (`isSelected`, `onSelect`) | `selected`, `onSelectedChange`, `bulkActions={(ids) => …}` | Pair with `<Toolbar selectedCount>` when bulk actions live in a page toolbar. |
| `EmptyState` inside tables | `DataGrid empty={<EmptyState …/>}`, `loading`, `error` | `Spinner` rows → `loading`. |
| Streaming log (`Security Audit Log Stream`) | `DataGrid` with `virtual` or `LogViewer` | The event stream is append-only; `LogViewer` if it is text lines. |

## 3. Icons (`@patternfly/react-icons` → `lucide-react`)

Use `<Icon aria-hidden />` (LAF components already do); size via `className="size-4"`; colour inherits `currentColor` (`text-ok`, `text-danger`).

| PatternFly | lucide-react | PatternFly | lucide-react |
|---|---|---|---|
| `AdjustIcon` | `SlidersHorizontal` | `PlayIcon` | `Play` |
| `ArrowRightIcon` | `ArrowRight` | `PlusCircleIcon` | `CirclePlus` |
| `BellIcon` | `Bell` | `QuestionCircleIcon` | `CircleHelp` |
| `BoltIcon` | `Zap` | `SearchIcon` | `Search` |
| `BookOpenIcon` | `BookOpen` | `ServerIcon` | `Server` |
| `CheckCircleIcon` | `CircleCheck` | `ShieldAltIcon` | `Shield` |
| `CodeIcon` | `Code` | `SignInAltIcon` | `LogIn` |
| `CubeIcon` | `Box` | `SignOutAltIcon` | `LogOut` |
| `DownloadIcon` | `Download` | `SunIcon` | `Sun` |
| `ExclamationCircleIcon` | `CircleAlert` | `SyncAltIcon` | `RefreshCw` |
| `ExternalLinkAltIcon` | `ExternalLink` | `TachometerAltIcon` | `Gauge` |
| `HelpIcon` | `CircleHelp` | `TagIcon` | `Tag` |
| `KeyIcon` | `Key` (`KeyRound` for tokens) | `TrashIcon` | `Trash2` |
| `LayerGroupIcon` | `Layers` | `UploadIcon` | `Upload` |
| `LockIcon` | `Lock` | `UserIcon` | `User` |
| `MoonIcon` | `Moon` | `PencilAltIcon` | `Pencil` |
| `PackageIcon` | `Package` | `HelmWheelIcon` (local SVG in `OCIView`) | keep the local SVG (lucide has no Helm mark) or `Ship` |

`MoonIcon`/`SunIcon` in the masthead are replaced entirely by `ThemeToggle` (**shell**; light/dark/system, persisted).
The app already depends on `lucide-react`, so no new dependency.

## 4. Remaining gaps and proposed solutions

| Gap | Proposal |
|---|---|
| **`@pilab/shadow-sso`** (`src/auth/shadowsso.ts`: FedCM, One Tap, silent login) and `AuthModal` | Logic is framework-free and stays as is. Rebuild `AuthModal` on `Modal` + `FormGroup` + `PasswordField`, and render the One Tap/FedCM prompt with the LAF auth building blocks (`BrandHeader`, `SocialButtons`, `AccountList`, `OtpInput` in `auth.tsx`) once the SSO tenant theme is shared (`BrandColor` overrides `--primary`). |
| **formik + zod forms** (`CreateRuleModal`, `CreateTokenModal`, `ruleSchema`/`tokenSchema`) | Keep formik and zod. Replace only the view layer: `<Form onSubmit={formik.handleSubmit}>`, `FormGroup`/`FormField`, `Input`/`Textarea` (`invalid={!!formik.errors.x}`), `HelperTextItem variant="error"`, `ErrorSummary` for the submit-time list, `useUnsavedChangesGuard(formik.dirty)` for close-while-dirty. |
| **zustand stores** (`useACLStore` … `useThemeStore`) | Unchanged. `useThemeStore` can drive `ThemeToggle value onChange` (controlled), or be replaced by `ThemeToggle persistKey`. |
| **Alert dismiss / title / actions** | `Alert` is a plain message box. Add `onDismiss`, `title` and `actions` props (small follow-up) — until then compose with `IconButton` in the children (TokensView's "token created" notice). |
| **Card header/footer parts** | `Panel` covers title+actions+body; a footer slot (`footer` prop) and compact/full-height variants are cheap additions to `display.tsx`. |
| **Coloured `Label` with icon + compact** | `Chip color={slot}` covers colour and size; add an optional `icon` prop and a non-removable `Tag` alias so `<Label>` ports 1:1. `getEcoColor` must return label slots. |
| **`Select` multi/typeahead with PF API** | Use `Combobox` (`multiple`, async, create). No PF-shaped wrapper was added to avoid a second typeahead implementation. |
| **Toolbar focus model** | `role="toolbar"` supports arrow/Home/End navigation but every control stays a Tab stop (a true single-tab-stop roving index would fight Radix triggers and text fields inside the bar). Responsive collapsing is provided by `ToolbarActions` (an `ActionBar`); filter groups simply wrap. |
| **Table sticky columns / column management modal** | Covered by `DataGrid` (`stickyHeader`, `stickyFirstColumn`, column visibility/order/sizing with `viewKey`); PF's "manage columns" modal is not needed. |
| **PF utility/CSS tokens** (`--pf-t--global--*`, `pf-v6-u-*` classes, inline `style`) | Search the app for `pf-` and `--pf`; map to Tailwind utilities and LAF tokens (`text-muted`, `border-line`, `bg-surface`). |
| **Responsive PF props** (`{{ default, md, lg }}` objects) | Only `Grid` has per-breakpoint props; other layout switches should use Tailwind prefixes (`md:flex-row`) through `className`. |
| **Tests** | PF queries like `getByRole('button', { name })` mostly keep working; `data-ouia-*` selectors do not. LAF components are axe-clean (`jest-axe`) and RTL-safe by test. |

## 5. Suggested order

1. Swap `main.tsx` CSS import; wrap the app in `LafProvider` + `TooltipProvider` + `ToastProvider`; build the frame (`AppFrame`, `Masthead`, `NavTree`, `PageHeader`).
2. Leaf swaps with identical semantics: `Button`, `Badge`, `Chip`/`Badge` (labels), `Spinner`, icons, `Title`, `Divider`, `Flex`/`Grid`.
3. Toolbars + `SearchInput`/`FilterBar` + `SegmentedControl`; then `ClipboardCopy`/`CodeBlock`/`DescriptionList`.
4. Modals and forms (`Modal*`, `Form*`, `TextInput`) keeping formik/zod.
5. Tables → `DataGrid`; delete `@patternfly/*` from `package.json`.
