# pilab-laf — Component Specification

Normative spec for the Pilab Look & Feel. Written for **agentic coding**: every rule is testable, every component lists anatomy, variants, states, tokens, accessibility and a React API.

- Visual reference (live): `styleguide.html`. Source of truth for values: `src/app.css` (tokens + auth components) and `src/admin.css` (admin components).
- Target: React + TypeScript + Tailwind v4 + shadcn/ui (Radix). Components must render **pixel-identical** to the CSS classes named in each section.
- If this document and the CSS disagree, the CSS wins; fix the document in the same change.

---

## 0. Hard rules (never violate)

| # | Rule | Check |
|---|------|-------|
| R1 | **Border radius ≤ 4px.** Allowed: `rounded-none/xs/sm/md/lg` (0/2/2/3/4px). `rounded-full` is clamped to 4px and **must not** be used for circles. | grep for `rounded-(xl|2xl|3xl|full)` and `border-radius` > 4px |
| R2 | **No hex/rgb colours in components.** Use token utilities only (`bg-primary`, `text-muted`, `border-line`). | grep `#[0-9a-f]{3,8}` in `*.tsx` |
| R3 | **No inline `style=`** except to inject a CSS variable (`style={{"--primary": brand}}`). | grep `style=` |
| R4 | **Font is Lato** (400/700/900 only). Lato has no 500/600, so `font-medium` renders as 400 and `font-semibold` as 700 (§2.2); use `font-semibold` for emphasis. Never import another family. | |
| R5 | **Dark only.** No light theme, no `dark:` variants. | |
| R6 | **Primary colour comes from `--primary`** so tenants can re-brand. Never hardcode `#54a2ff`. Text on primary is `text-on-primary`. | |
| R7 | **Every interactive element has a visible focus state** (`focus-visible` ring, §3.4) and a keyboard path. | |
| R8 | **Never convey state by colour alone** — pair with icon or text (badges have a dot + label, alerts have an icon). | |
| R9 | **Server-rendered auth pages run no framework JS** (CSP `script-src 'self'`). They use the compiled CSS classes only. React is for the admin panel. | |
| R10 | **Spacing is on the 4px grid** (Tailwind `1 = 4px`). Half steps (`0.5`, `1.5`, `2.5`, `3.5`) are allowed; arbitrary px values are not, except the documented font sizes in §2.2. | |

---

## 1. Foundations: tokens

All colours are runtime CSS variables on `:root`; Tailwind utilities map to them (`@theme inline`). In React, **only reference the utility names**.

### 1.1 Colour tokens

| Utility | CSS var | Value | Use |
|---------|---------|-------|-----|
| `bg-primary` / `text-primary` / `border-primary` | `--primary` | `#54a2ff` (tenant override) | Brand, primary action, focus, selection |
| `bg-primary-hover` | `--primary-hover` | 82% primary + black | Hover of primary fill |
| `bg-primary-light` | `--primary-light` | 15% primary, transparent | Selected/active tint, focus halo |
| `text-on-primary` | `--on-primary` | `#0b0b0d` | Text/icons on a primary fill |
| `bg-surface` | `--bg-card` | `rgba(24,24,27,.78)` | Cards, panels (with blur) |
| `bg-surface-hover` | `--bg-card-hover` | `rgba(255,255,255,.08)` | Hover fill for any row/item/control |
| `bg-input` | `--bg-input` | `rgba(255,255,255,.06)` | Input, select, secondary button fill |
| `bg-muted-bg` | `--bg-muted` | `rgba(255,255,255,.04)` | Table header, zebra hover, chips, group headers |
| `bg-menu` | `--bg-menu` | `#1c1c20` | **Opaque** floating surfaces: menus, popovers, dialogs, toasts |
| `border-line` | `--border` | `rgba(255,255,255,.10)` | Default 1px border/divider |
| `border-line-strong` | `--border-strong` | `rgba(255,255,255,.18)` | Hover border, floating-surface border |
| `text-fg` | `--text` | `#f3f4f6` | Primary text |
| `text-muted` | `--text-muted` | `#99a1af` | Secondary text, labels, inactive nav |
| `text-subtle` | `--text-subtle` | `#64748b` | Placeholders, hints, captions, group headings |
| `text-ok` `bg-ok-bg` `border-ok-line` | `--success*` | `#34d399` / 10% / 30% | Success |
| `text-warn` `bg-warn-bg` `border-warn-line` | `--warning*` | `#fbbf24` / 10% / 30% | Warning |
| `text-danger` `bg-danger-bg` `border-danger-line` | `--error*` | `#f87171` / 10% / 30% | Error, destructive |

**Page background:** `body` uses `--bg` + `--bg-image` (blue→crimson gradient, `background-attachment: fixed`). Never paint an opaque full-page colour over it; panels are translucent `bg-surface`.

**Surface ladder** (back → front): page gradient → `bg-surface` (card/panel, blurred) → `bg-input` / `bg-muted-bg` (inset controls) → `bg-menu` (floating, opaque). A floating element is always `bg-menu` + `border-line-strong` + shadow (§1.5).

### 1.2 Contrast pairs (verified usage)

`text-fg` on `bg-surface` ✔ · `text-muted` on `bg-surface` ✔ (body copy ≥ 14px only) · `text-subtle` is for placeholders/captions only, never for actionable text · `text-on-primary` on `bg-primary` ✔ · status text on its `*-bg` ✔.

### 1.3 Radius

`xs 2px · sm 2px · md 3px · lg 4px` (xl/2xl/3xl/full = 4px). Convention:

| Element | Class |
|---------|-------|
| Checkbox, switch thumb, chip close, status dot | `rounded-xs` |
| Badge, switch track, chip | `rounded-sm` |
| Buttons, inputs, selects, menus, alerts, nav links, avatars | `rounded-md` |
| Cards, panels, tables, dialogs, popovers, stat tiles | `rounded-lg` |

### 1.4 Spacing & layout

- Grid: 4px. Page padding `p-6` (admin), card padding `36px 32px` (auth, `28px 22px` ≤480px).
- Form group gap `mb-4.5` (18px). Toolbar gap `gap-2.5`. Panel padding `p-4`. Table cell `px-4 py-3`.
- Auth container `max-w-[420px]`. Admin content `max-w-6xl`. Admin sidebar `240px`. Dialog `max-w-md` (448px). Popover `w-72` (288px).

### 1.5 Elevation (shadows)

| Level | Used by | Value |
|-------|---------|-------|
| Card | auth card | `0 24px 48px rgba(0,0,0,.4), 0 0 0 1px var(--border)` |
| Menu | dropdown, selector menu, toast | `0 16px 32px rgba(0,0,0,.5)` |
| Popover | popover panel | `0 16px 40px rgba(0,0,0,.55)` |
| Dialog | modal, popup | `0 24px 64px rgba(0,0,0,.6)` |
| Glow | primary button, brand icon | `0 4px 16px var(--primary-glow)` |

Panels/tables have **no** shadow (flat, border only).

### 1.6 Z-index scale

`10` sticky top bar · `20` dropdown/selector menu · `30` popover · `50` dialog/backdrop · toasts `60`. Do not invent other values.

### 1.7 Motion

- Default transition: Tailwind `transition` (150ms, colours/transform/shadow). Never animate layout properties.
- Press feedback: `active:scale-[0.97]` on buttons.
- Card entrance: 220ms `cubic-bezier(.4,0,.2,1)` fade+rise (`card-in`).
- Chevrons rotate 180° on open. Dialogs: 150ms fade/zoom-95. Respect `prefers-reduced-motion` (disable the above).

---

## 2. Typography

### 2.1 Family

`Lato` → system fallback. Mono (`font-mono`): `"SF Mono","Fira Code",monospace`, used for IDs, timestamps, codes, log values.

### 2.2 Scale (exact)

| Role | Size | Weight | Class |
|------|------|--------|-------|
| Admin page title (h1) | 24px | 600→700 | `text-2xl font-semibold tracking-tight text-fg` |
| Brand name | 20px | 700 | `text-xl font-bold tracking-tight` |
| Dialog title | 16px | 700 | `text-base font-semibold` |
| Panel title / empty title / stat large body | 15px | 700 | `text-[0.9375rem] font-semibold` |
| Auth page title | 17px | 700 | `text-[1.0625rem] font-semibold` |
| Body / input / button | 15px | 400/700 | `text-[0.9375rem]` |
| Secondary body, table cell, menu item | 14px | 400 | `text-sm` |
| Form label, breadcrumb, small control | 13px | 500→400 | `text-[0.8125rem]` |
| Caption, hint, error, badge, table header | 12px | 400–700 | `text-xs` |
| Group heading (uppercase) | 11px | 700 | `text-[0.6875rem] font-semibold tracking-wider uppercase` |
| Stat value | 24px | 700 | `text-2xl font-semibold tracking-tight` |
| Auth stat/code display | 28–32px mono | 700 | `.code-display` |

> **Lato has no 500/600.** Browsers snap `font-medium` → 400 and `font-semibold` → 700. Use `font-semibold` for emphasis; treat `font-medium` as "regular". Do not rely on a visible medium step.

Line height: body `1.6`; controls `leading-normal`; headings `tight`.
Uppercase micro-labels always carry `tracking-wider` (`0.05em`+).
Truncate with `truncate` (single line); never wrap table IDs.

### 2.3 Links

`.link`: `text-sm font-medium text-primary`, no underline; hover = lighter primary + underline. In-text links inherit this. Navigation (breadcrumb/nav) uses `text-muted` → `text-fg` on hover, no underline.

---

## 3. Interaction states (global contract)

Every interactive component implements these, in this order of precedence: **disabled > error > focus > active/open > hover > rest**.

### 3.1 Hover
Neutral controls: `border-line-strong` + `bg-surface-hover`. Primary: `bg-primary-hover` + stronger glow. Ghost/menu/nav: `bg-surface-hover text-fg`.

### 3.2 Active / pressed
`active:scale-[0.97]` for buttons only. Others have no pressed style.

### 3.3 Selected / current
Tint, not fill: `bg-primary-light text-primary` (nav, pagination current, selected device) with `border-primary`. Menu items show a trailing `✓` in `text-primary` (`aria-selected="true"`). Tabs use a 2px `border-primary` underline.

### 3.4 Focus
Inputs / open controls: `border-primary` + `box-shadow: 0 0 0 3px var(--primary-light)` (Tailwind: `focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary-light`). Never `outline` removed without this replacement. Focus ring is **3px, primary at 15%**, identical everywhere.

### 3.5 Disabled
`opacity-50` (inputs) / `opacity-45` (buttons), `cursor-not-allowed`, no hover, no press transform.

### 3.6 Error
`border-danger` on the control, `.field-error` (`text-xs text-danger mt-1.5`) below, `aria-invalid="true"` + `aria-describedby` to the message.

### 3.7 Loading
Buttons: replace leading icon with a 16px spinner, keep width, set `aria-busy`, disable. Lists/tables: skeleton rows (`bg-muted-bg`, `rounded-md`, pulse). Never show an empty state while loading.

---

## 4. Components

Format for each: **Purpose · Anatomy · Variants/props · States · Tokens (classes) · A11y · shadcn mapping · Do/Don't · Example.**

### 4.1 Button

**Purpose:** trigger an action. One `primary` per view region.

**Anatomy:** `[icon?] label [icon?]`, 16px icons, `gap-2`, centred.

**Variants:** `primary` · `secondary` · `ghost` · `danger`. **Sizes:** `md` (default), `sm`. **Width:** full by default in auth cards; `auto` in admin.

| Variant | Classes |
|---------|---------|
| base | `inline-flex items-center justify-center gap-2 rounded-md px-4.5 py-2.5 text-[0.9375rem] font-semibold transition active:scale-[0.97]` |
| primary | `bg-primary text-on-primary` + glow shadow; hover `bg-primary-hover` |
| secondary | `border border-line bg-input text-fg`; hover `border-line-strong bg-surface-hover` |
| ghost | `bg-transparent text-muted`; hover `bg-surface-hover text-fg` |
| danger | gradient `#ef4444→#dc2626`, `text-white`, red glow |
| sm | `px-3 py-1.5 text-[0.8125rem]` |

**Props:** `variant`, `size`, `loading`, `leftIcon`, `rightIcon`, `asChild`, `fullWidth` (default `false` in the kit; auth templates set it).
**States:** §3. Disabled keeps its variant look at 45% opacity.
**A11y:** `<button type="button">` unless submit. Icon-only buttons require `aria-label` and are `size-8` (sm) / `size-9`.
**shadcn:** `Button` — override `cva` variants to the table above; remove `rounded-xl`, `shadow-xs`.
**Do:** Approve = primary, Deny = secondary side by side (`.actions`, equal width). Destructive confirmation = `danger`.
**Don't:** two primaries together; ghost for the main CTA; text-only danger without confirmation.

```tsx
<Button variant="primary" leftIcon={<Check />}>Approve</Button>
<Button variant="secondary">Deny</Button>
<Button variant="danger" size="sm">Revoke</Button>
```

### 4.2 Text input

**Anatomy:** `Label` (above) · control · `Hint` or `Error` (below).
**Classes:** control `w-full rounded-md border border-line bg-input px-3.5 py-2.5 text-[0.9375rem] text-fg placeholder:text-subtle transition`; label `mb-1.5 block text-[0.8125rem] font-medium tracking-wide text-muted`; hint `mt-1.5 text-xs text-subtle`; error `mt-1.5 text-xs text-danger`.
**States:** hover (border-strong + hover fill) · focus (§3.4, `bg-surface-hover`) · error · disabled.
**Variants:** `default`; `code` (device code: centred, mono, uppercase, `tracking-[0.3em]`, large); `otp` (digit boxes, `text-center`, mono); `search` (adds `pl-9` + 16px leading icon in `text-subtle`, `py-2`).
**A11y:** `<label htmlFor>` always; `autoComplete` set correctly (`username`, `current-password`, `one-time-code`); `inputMode` for numeric.
**shadcn:** `Input` + `Label` + `Field` (compose `FormField` from react-hook-form). Remove default `h-9`, `rounded-md` → ours, `shadow-xs`, `dark:bg-input/30`.
**Do:** one field per row; hint for format, error replaces hint.
**Don't:** placeholder as label; floating labels.

```tsx
<Field label="Email" hint="We never share it." error={errors.email?.message}>
  <Input type="email" autoComplete="username" />
</Field>
```

### 4.3 Select (native) & Dropdown (custom)

**Select (native)** `.form-select`: same box as input, chevron `bg-right 12px`, `pr-9`, `appearance-none`; `<option>` uses `bg-menu text-fg`. Prefer for short lists (≤ 7) and mobile.

**Dropdown / Select menu** (custom, `.dropdown`): trigger looks like an input and shows the current value + chevron; open = `border-primary` + focus halo + chevron rotated 180°. Menu: `absolute top-[calc(100%+4px)] min-w-full rounded-md border border-line-strong bg-menu py-1 z-20` + menu shadow.
- **Item:** `px-3.5 py-2 text-sm text-muted`, hover `bg-surface-hover text-fg`, selected shows `✓` (`text-primary`, `ml-auto`), `danger` item = `text-danger`.
- **Parts:** `Label` (11px uppercase `text-subtle`), `Separator` (`my-1 h-px bg-line`), `Item`.
- **Align:** `left` default; `align-right` (`min-w-48`) for action menus in table/toolbars.
**A11y:** `role="listbox"`/`option` for selects, `role="menu"`/`menuitem` for action menus; arrow keys, Home/End, type-ahead, Esc closes and returns focus to trigger.
**shadcn:** `Select` (value pick) and `DropdownMenu` (actions). Restyle `SelectContent`/`DropdownMenuContent` to `bg-menu border-line-strong rounded-md py-1`, items as above; drop the check-in-left default (ours is trailing).

### 4.4 Checkbox, radio & switch

- **Checkbox** `.check`: 16px box, `rounded-xs`, accent = primary; label `text-sm text-muted`, gap `2.5`; whole row clickable.
- **Switch** `.switch`: 36×20 track `rounded-sm border-line-strong bg-input`, 14px thumb `rounded-xs bg-muted`; checked = track `bg-primary border-primary`, thumb `bg-on-primary` translated 16px; focus-visible halo. Use for **immediate** settings; checkbox for form-submitted choices.
- **Radio** `.radio` / `.radio-group`: single choice from 2–6 options. Mark `.radio-mark` is an **18px box, `rounded-lg` (4px), `border-line-strong bg-input`** — never a circle (R1). Inner dot is an 8px `rounded-xs` square (`bg-on-primary`) scaling in (150ms) on check. Checked: `border-primary bg-primary`, label `text-fg`. Hover: `border-primary`. Focus-visible: 3px primary-light halo on the mark. Disabled: 50% opacity, `cursor-not-allowed`. Optional `.radio-hint` (12px `text-subtle`) under the label. Group gap `gap-2.5`, wrapped in `<fieldset>` with `legend` or `aria-label`. Distinguish from checkbox by the dot (vs check) and by usage: radio = exactly one, checkbox = any.
  - Use the **Device option** card (§4.20) when choices need icons/metadata; use a **Select** (§4.3) for > 6 options.
**A11y:** native `input[type=radio]` (visually hidden, still focusable); arrow keys move + select within a group, Tab enters/leaves the group; `role="switch"` + `aria-checked` for switches; label association mandatory.
**shadcn:** `Checkbox`, `Switch`, `RadioGroup`/`RadioGroupItem` (restyle indicator: square dot, 18px, `rounded-lg`).
```tsx
<RadioGroup value={v} onValueChange={setV} aria-label="Second factor">
  <Radio value="totp" hint="Recommended · works offline">Authenticator app</Radio>
  <Radio value="passkey">Passkey</Radio>
  <Radio value="sms" disabled>SMS</Radio>
</RadioGroup>
```

### 4.5 Alert (inline)

Anatomy: `[icon] message` — `flex gap-2.5 rounded-md border px-3.5 py-3 text-sm`, icon 16px `mt-px`. Variants `error | success | warning` → `border-*-line bg-*-bg text-*`. (Add `info` = primary tint if needed: `border-primary/35 bg-primary-light text-primary`.)
**A11y:** `role="alert"` for error/warning that appears after an action; `role="status"` for success/info.
**shadcn:** `Alert` + `AlertDescription` (variants above). **Don't** use for transient feedback — use Toast.

### 4.6 Badge / status

`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs font-medium`, leading 6px square dot (`.badge::before`, hide with `plain`). Variants: `neutral` (default) · `ok` · `warn` · `danger` · `primary`.
**Mapping (use consistently):** Active/Verified/Success → `ok` · Pending/Expiring/Unverified → `warn` · Disabled/Locked/Failed/Revoked → `danger` · Role/Tenant/Type → `primary` or `neutral`.
Count badge in nav: `ml-auto`, `plain`.
**shadcn:** `Badge` (variant cva). Text is sentence case, 1–2 words.

### 4.7 Card (auth) & Panel (admin)

- **Card** `.card`: auth container. `rounded-lg border border-line`, blur 20px, card shadow, padding `36/32`, entrance animation. Width capped by `.container` (420px).
- **Panel** `.panel`: `rounded-lg border border-line bg-surface` + blur; `PanelHead` (`flex justify-between px-4 py-3 border-b`, title 15px bold + actions) · `PanelBody` (`p-4`).
- **Stat tile** `.stat`: `rounded-lg border p-4`; label (12px uppercase muted) · value (24px semibold) · delta (12px, `text-ok` up / `text-danger` down).
No nested cards. Max one elevation level inside a panel (use `bg-muted-bg` insets).
**shadcn:** `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` → map to Panel parts.

### 4.8 Tabs

Underline tabs: container `flex gap-1 border-b border-line mb-5`; tab `px-3.5 py-2.5 text-sm font-medium text-muted -mb-px border-b-2 border-transparent`, hover `text-fg`, selected `text-fg border-primary`.
**A11y:** `role="tablist"/"tab"/"tabpanel"`, arrow-key roving focus, `aria-selected`.
**shadcn:** `Tabs` — restyle `TabsList` (no pill bg), `TabsTrigger` (underline).

### 4.9 Table

`.table-wrap` (`overflow-x-auto rounded-lg border bg-surface`) > `.table`. `th`: `bg-muted-bg px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-muted whitespace-nowrap`; `td`: `px-4 py-3 text-sm text-fg border-b border-line`; last row no border; row hover `bg-muted-bg`.
- **Cell patterns:** user (`.cell-user`: avatar + name/`cell-sub` email), mono ID (`.mono` 13px), badge, date (relative + `title` absolute), actions (`.cell-actions` right-aligned, ghost icon buttons or a `⋯` dropdown).
- **Sorting:** header button with 12px chevron, `aria-sort`.
- **Selection:** leading checkbox column `w-10`; selected row `bg-primary-light`.
- **Empty/loading/error:** §4.15 inside the wrapper; skeleton rows while loading.
- **Responsive:** horizontal scroll, never wrap IDs; hide secondary columns < 860px.
**shadcn:** `Table` + TanStack Table `DataTable` pattern.

### 4.10 Pagination

`flex items-center justify-between pt-4 text-[0.8125rem] text-muted`: left = "Showing 1–25 of 312"; right = page buttons (`.page-btn`: `h-8 min-w-8 rounded-md border bg-input px-2`); current = `border-primary bg-primary-light text-primary` + `aria-current="page"`. Show first, last, current ±1, ellipsis. Prev/Next as icon buttons. Page-size select (`10/25/50/100`) optional on the left.
**shadcn:** `Pagination`.

### 4.11 Toolbar & search

`.toolbar`: `flex flex-wrap items-center gap-2.5 mb-4`. Order: search (`flex-1 min-w-56`) · filter dropdowns · bulk actions · primary "Create" button (right). Search: input with 16px icon, debounce 250ms, `type="search"`, clear on `Esc`.

### 4.12 Navigation (admin shell)

- **Shell** `.admin`: grid `240px 1fr`; collapses to one column < 860px.
- **Sidebar** `.admin-side`: sticky full-height, `border-r`, `p-4`, translucent `rgba(12,12,16,.72)` + blur 14px. Brand block (32px gradient icon + name) · groups.
- **Nav group label:** 11px uppercase `text-subtle`, `mt-3 mb-1 px-2`.
- **Nav link:** `flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-muted`; hover `bg-surface-hover text-fg`; current (`aria-current="page"`) `bg-primary-light text-primary`; 16px leading icon; optional trailing badge.
- **Top bar** `.admin-top`: sticky `h-14`, `border-b`, `px-6`, blur 14px; contains breadcrumb (left), global search, user menu (right).
- **Page head:** breadcrumb above; `h1` + description (left), page actions (right).
- **Breadcrumb:** 13px, links `text-muted`→`text-fg`, `/` separators in `text-subtle`, last item plain `text-fg`.
**shadcn:** `Sidebar` (restyled), `Breadcrumb`.

### 4.13 Avatar

`size-8 rounded-md` (chips `size-5`, large `size-10`), gradient primary→deep-crimson, initials 13px bold `text-on-primary` (1–2 letters, uppercase). If image: `object-cover`, same radius. Never circles (R1).
**shadcn:** `Avatar` (radius override).

### 4.14 Modal / Popup (dialog)

Use native-quality dialog: **backdrop** `rgba(5,5,10,.7)` + 4px blur; **surface** `bg-menu border-line-strong rounded-lg` dialog shadow, `w-full max-w-md` (sizes: `sm 384`, `md 448`, `lg 640`).
- **Head:** `px-5 py-4 border-b`; title 16px bold, optional sub 13px muted, close icon button (`size-7`, ghost) top-right.
- **Body:** `px-5 py-4 text-sm text-muted` (scroll inside, head/foot fixed, `max-h-[85vh]`).
- **Foot:** `px-5 py-3.5 border-t flex justify-end gap-2.5`; **cancel left of primary**, primary on the right; destructive dialogs use `danger` and state the object name.
**Behaviour:** focus trap, initial focus on first field (or Cancel for destructive), Esc/backdrop click close (except when form is dirty → confirm), restore focus to opener, lock body scroll.
**A11y:** `role="dialog"` `aria-modal` `aria-labelledby`; `role="alertdialog"` for destructive confirmation.
**shadcn:** `Dialog` / `AlertDialog` (restyle `DialogContent` → `rounded-lg bg-menu p-0`, slots as above).

### 4.15 Popover

Non-modal anchored panel for contextual info/small forms. `w-72 rounded-lg border-line-strong bg-menu p-3.5 text-sm text-muted`, popover shadow, 8px offset, 8px rotated-square arrow (`bg-menu`, top+left border). `align-right` flips the arrow. Anatomy: `PopoverTitle` (13px semibold `text-fg`) · content · `PopoverFoot` (`border-t pt-3 flex justify-end gap-2`).
**Behaviour:** opens on click (not hover); Esc and outside-click close; focus moves in when it contains controls; no nested popovers.
**shadcn:** `Popover` (+ `PopoverArrow` styled as above). For hover hints use `Tooltip` (§4.18).

### 4.16 Toast

`rounded-md border-line-strong bg-menu px-4 py-3 text-sm text-fg` + menu shadow, bottom-right stack, 4s auto-dismiss (8s for errors, pause on hover), leading 16px status icon in status colour, optional action link. `role="status"` (`alert` for errors).
**shadcn:** `Sonner` themed via `toastOptions.classNames`.

### 4.17 Empty state

`flex flex-col items-center gap-2 px-6 py-12 text-center`: 32px icon `text-subtle` · title 15px semibold · description 14px muted `max-w-xs` · optional primary button. Distinct copy for "nothing yet" (with create CTA) vs "no results" (with clear-filters).

### 4.18 Tooltip

`bg-menu border-line-strong rounded-md px-2 py-1 text-xs text-fg`, 400ms delay, shows keyboard shortcut in `text-subtle`. Only for icon-only controls and truncated text.
**shadcn:** `Tooltip`.

### 4.19 User selector (combobox)

Single or multi user picker. **Field** `.selector-field`: `min-h-11 flex-wrap gap-1.5 rounded-md border bg-input px-2.5 py-1.5`, focus-within = primary border + halo. Inside: **chips** (`.chip`: `rounded-sm border-line-strong bg-muted-bg py-0.5 pr-1 pl-0.5 text-[0.8125rem]`, 20px avatar, name, 16px remove button) + borderless text input (`min-w-24 flex-1`).
**Menu** `.selector-menu`: `bg-menu border-line-strong rounded-md py-1 max-h-72 overflow-y-auto`, below the field, `z-20`. **Option** `.option`: `px-3 py-2 gap-3` — 32px avatar · title (14px medium, truncate) + sub (12px muted, e.g. email) · trailing `✓` if selected. Active option (keyboard) = `bg-surface-hover`.
**Behaviour:** async search with debounce 250ms; loading row + empty row ("No users match “q”"); `Backspace` on empty input removes the last chip; selected users stay in the menu with `✓` (toggle); `Esc` closes; `max` prop shows "limit reached".
**A11y:** ARIA 1.2 combobox: input `role="combobox" aria-expanded aria-controls aria-activedescendant`, menu `role="listbox"`, options `role="option" aria-selected`; chips are a labelled list.
**shadcn:** `Command` + `Popover` (the shadcn “Combobox / multi-select” recipe).
**Props:** `value: User[]`, `onChange`, `onSearch(q): Promise<User[]>`, `multiple`, `max`, `placeholder`, `disabled`, `renderOption?`.

### 4.20 Device selector

Radio-group of cards for choosing a device/session. **Card** `.device-option`: `rounded-md border bg-muted-bg p-3.5 gap-3.5`; 40px icon tile (`border bg-input text-muted`, 20px glyph by type: phone/laptop/key/tablet) · name (14px semibold, truncate) + sub (12px muted: browser · OS · last seen / IP) · trailing 18px square check (`.device-radio`, checked = primary fill + `✓`).
Hover `border-line-strong bg-surface-hover`; **checked** `border-primary bg-primary-light`, icon tile `border-primary text-primary`; focus-visible halo.
Optional trailing badge (`This device` → `primary`, `Trusted` → `ok`). Stack with `gap-2.5`. Group in a `fieldset` with `legend`.
**A11y:** real `input[type=radio]` stretched over the card (`absolute inset-0 opacity-0`), arrow keys move selection.
**shadcn:** `RadioGroup` + `RadioGroupItem` (visually hidden) in the card shell.

### 4.21 Audit log

Chronological, grouped by day; each row expandable. **Container** `.audit` (`rounded-lg border bg-surface overflow-hidden`). **Day header** `.audit-day` (`bg-muted-bg px-4 py-2 11px uppercase text-subtle`; sticky within the scroll area).
**Row summary** (grid `72px 28px 1fr auto 16px`, `gap-3.5 px-4 py-3`): time (mono 12px `text-subtle`, tabular) · status icon tile (`size-7 rounded-md`, `ok/warn/danger/neutral` tint) · event (`<b>` actor + action, `small` target/IP 12px muted, truncate) · badge (result) · chevron (rotates on open). < 860px: drop time and badge.
**Detail** `.audit-detail` (`bg-black/20 px-4 py-3.5 border-t`, auto-fit 200px grid): `dt` 11px uppercase `text-subtle` · `dd` mono 13px `text-muted` break-all (request id, IP, user agent, tenant, before/after).
**Severity mapping:** login ok / create → `ok` · password reset, role change, unusual location → `warn` · failed login, lockout, revoke, delete → `danger` · read/other → neutral.
**Behaviour:** filter bar above (search, event type dropdown, user selector, date range popover, severity); infinite scroll or "Load more"; live-tail toggle (switch); export (CSV/JSON); deep-linkable row id. Times in the user's timezone with UTC on hover.
**A11y:** disclosure pattern (`<details>` or button with `aria-expanded`); list semantics.
**shadcn:** no direct equivalent — build with `Collapsible` + the classes above.

### 4.22 Auth-only components

| Component | Spec |
|-----------|------|
| **Brand header** `.header` | centred; 56px gradient `brand-icon` (`rounded-lg`) with glow or tenant `logo` (`max-h-14` + primary drop-shadow), `brand-name` 20px bold, `page-title`, `page-subtitle` |
| **Social divider** | hairline · uppercase 12px `text-subtle` text · hairline |
| **Social button** `.btn-social` | secondary look, 18px provider icon, `font-medium`, stacked `gap-2.5` |
| **Account chooser** `.account-item` | row card: avatar · name/email · hover `bg-surface-hover`; whole row is a submit button |
| **Scope list** `.scope-item` | icon · scope description; separators `border-line`; consent card shows client logo + name + description first |
| **Device code** `.code-input/.code-display` | mono, centred, uppercase, `tracking-[0.3em]`; display variant is read-only large with copy button |
| **Device steps** `.device-steps` | numbered list; `done` = ok, `current` = primary |
| **OTP input** `.otp-input` | digit boxes, mono, `inputmode=numeric`, `autocomplete=one-time-code`, auto-advance, paste fills |
| **Info box** `.info-box` | `bg-muted-bg border rounded-md p-3.5` title + disc list |
| **Language switcher** `.lang-switch` | centred row of 12px links under the card; current = `aria-current` `text-fg`; **must be placed after the card in a column layout** (the original two-column glitch) |
| **Footer** | `footer-text` 12px `text-subtle`, 14px icon |

### Planned components (4.23+)

> Components beyond §4.61 (and upgrades of shipped ones) are designed in [`docs/design.md`](docs/design.md) and scheduled in [`docs/roadmap.md`](docs/roadmap.md). Sections move here when they ship.

Status: all P0 and most dependency-free P1 items are implemented in `lib/` and shown in `playground/`. Still **not implemented**: react-hook-form adapter (4.51; `FormField` is library-agnostic and works with any form library). `OverflowTabs` (4.37), `TopologyGraph` (4.40, caller-supplied layout), `CodeEditor` (4.42, JSON/YAML highlighting), `DockedTaskPanel` (4.26), `DatePicker`, `Heatmap`, `StackedBarChart`, `MfaEnrolment`, `OidcClientList`/`OidcClientForm`, `VirtualList` and the design-rule tests (`tests/rules.test.ts`) are in. Each follows §3 states, §6 conventions and §7 DoD. "Base" = the primitive to wrap. Priority: **P0** blocks the SSO UI / first vSphere screens, **P1** needed for core inventory/ops, **P2** later.

#### A. Feedback & status

### 4.23 Spinner & Skeleton — P0
Spinner: 16/20/32px, `border-2 border-line border-t-primary`, `animate-spin`, `role="status"` + sr-only label; inline in Button (§3.7). Skeleton: `bg-muted-bg rounded-sm`, shimmer disabled under reduced motion; mirrors Table row / Card / Stat shapes. Never block the whole page for partial loads.

### 4.24 Progress & meter — P1
`h-1.5 rounded-sm bg-muted-bg`, fill `bg-primary`. Variants: determinate, indeterminate, **meter** (capacity: ok < 70%, warn 70–90%, danger > 90%; thresholds are props). Optional label + `used / total` mono text. `role="progressbar"` with `aria-valuenow/min/max`; meter uses `role="meter"`. Base: `@radix-ui/react-progress`.

### 4.25 Banner (global) — P1
Full-width strip above the shell: info / warn / danger (maintenance, licence expiry, degraded cluster). Same tints as Alert (§4.5), `px-4 py-2`, optional action + dismiss (persisted per id). `role="status"`; `alert` for danger.

### 4.26 Task panel (recent tasks) — P0 (vSphere)
Docked bottom panel/popover listing async operations: name · target · initiator · status badge (queued/running/ok/failed/cancelled) · progress · start/duration (mono). Row expands to detail + error. Filters (mine/all, status), cancel/retry actions, live updates (polling or SSE), `aria-live="polite"` for status changes only.

### 4.27 Alarm & event list — P1
Reuses Audit log row anatomy (§4.21) with severity tile, entity link, triggered time, acknowledge/reset actions, bulk select. Severity: critical=`danger`, warning=`warn`, info=neutral.

#### B. Data & navigation

### 4.28 Tree view — P0
Inventory tree (datacenter → cluster → host → VM / datastore / network). Row `h-7`, indent 16px/level, chevron 16px, type icon, label (truncate), optional badge/status dot. States: hover, selected (`bg-primary/15` + 2px left accent), focused (ring), disabled, loading (lazy children skeleton). Multi-select with Shift/Ctrl, drag & drop optional. Keyboard per WAI-ARIA tree: ↑↓ move, →/← expand/collapse, Home/End, type-ahead, `*` expand siblings. `role="tree"/"treeitem"`, `aria-expanded/level/setsize/posinset`. Virtualized above ~500 rows. Context menu (4.31) on right-click / Shift+F10.

### 4.29 Data grid — P0
Extends Table (§4.9): sortable headers (`aria-sort`), resizable & reorderable columns, column-visibility menu, sticky header/first column, row selection checkbox + bulk-action Toolbar, inline filters, density (compact/default), saved views, virtualized rows, empty/loading/error states, server-side mode (sort/filter/page callbacks). Numeric cells right-aligned mono. Base: headless `@tanstack/react-table` + `@tanstack/react-virtual`. `role="grid"` only when cells are interactive.

### 4.30 Tree table — P2
Data grid with expandable rows (resource pools, snapshots). Indent in the first column, `aria-level`, `role="treegrid"`.

### 4.31 Context menu — P1
Same look as DropdownMenu (§4.3); opens at pointer or via Shift+F10/Menu key; supports submenus, check/radio items, shortcuts column, destructive items in `text-err`. Base: `@radix-ui/react-context-menu`.

### 4.32 Accordion / Collapsible — P1
Header button `px-4 py-3` with chevron (rotates), content `border-t`. Single/multiple modes, `aria-expanded/controls`, animated height unless reduced motion. Audit log (§4.21) should reuse it. Base: `@radix-ui/react-accordion` / `react-collapsible`.

### 4.33 Split pane — P1
Resizable panels (tree | details | tasks). Handle 4px hit-area 8px, `bg-line` → `bg-primary` on hover/drag, `role="separator"` `aria-valuenow`, arrow-key resize (10px, Shift = 50px), double-click resets, min/max, collapse, persisted size. Base: `react-resizable-panels`.

### 4.34 Stepper & Wizard — P0 (create VM / onboarding)
Vertical (side) or horizontal step list; states done (ok) / current (primary) / upcoming (subtle) / error; clickable only for visited steps. Footer: Back · Next · Cancel, final step "Finish" with review summary. Per-step validation blocks Next; `aria-current="step"`; content in a Dialog (large) or page. Shares styling with Device steps (§4.22).

### 4.35 Drawer / side panel — P1
Dialog variant anchored to the end edge, widths 360/480/640px, full-height, header · scroll body · sticky footer actions. Focus trap, Esc closes, no radius on the anchored edge. Base: Radix Dialog.

### 4.36 Command palette — P2
Dialog + combobox (`Ctrl/⌘K`): grouped results (navigation, objects, actions), fuzzy match, recent items, shortcut hints. Base: `cmdk`. `role="combobox"` + listbox.

### 4.37 Tabs overflow & Breadcrumb overflow — P2
Collapse excess items into a "…" DropdownMenu based on measured width; the current item always stays visible; keyboard and `aria-current` unchanged.

#### C. Visualisation

### 4.38 Chart kit — P1
Line/area, stacked bar, donut, **sparkline** (inline in table/Stat), **gauge**, heatmap. Colours from a fixed 8-step categorical palette derived from tokens (primary first; ok/warn/danger reserved for status meaning); never rely on colour alone (dash patterns/labels). Gridlines `border-line`, axis text 11px `text-subtle` tabular, tooltip = Popover look with all series at the x-position, legend toggles series, crosshair, brush-zoom, no-data and loading states, `prefers-reduced-motion` disables animation (`animate` prop: entry draw/grow/sweep/fade, value-change tweens, hover emphasis; `tooltip` prop: shared crosshair / per-segment tooltip with hover, tap, focus + arrow keys, Escape; see `docs/charts.md`). Accessible: `role="img"` + `aria-label` summary and data-table fallback. Base: `recharts` or `visx` (decide once; wrap behind LAF props so it is swappable).

### 4.38b Dashboard kit — shipped
Card v2 (`Card` variants default/outlined/elevated/flat, `compact`, `status`, `selectable`/`onClick`/`href`, `loading`; `CardHeader/Title/Description/Actions/Body/Footer`, `CardGrid`, `ExpandableCard`) · metrics (`MetricCard`, `MetricGrid`, `RadialGauge`, `GaugeCard`, `ProgressCard`, `StatusSummaryCard`) · charts entry (`AreaChart`, `LineChart`, `BarChart`, `DonutChart`, `ChartCard`, `ChartLegend`, `ChartTooltip`, `SegmentedBar`, `ThresholdDonut`, `UtilizationCard` (bar/donut variants); existing `Heatmap`; all take `animate` and `tooltip`, shared `ChartTooltipFor`/`useChartMotion`) · alerts (`Alert` title/description/actions/onClose/compact/inline/detail, `AlertGroup`, sticky `Banner`) · toasts (`ToastProvider max/position`, `useToasts`). Labels in `messages.components.ui.dashboard`. See `docs/charts.md`, `?demo=dashboard`.

### 4.39 Time-range picker — P1
Presets (15m, 1h, 24h, 7d, custom) + absolute from/to + auto-refresh interval (off/5s/30s/1m). Output is ISO range or relative token; timezone shown, UTC on hover (as §4.21). Feeds charts, audit and tasks. Composes 4.45.

### 4.40 Topology graph — P2
Pannable/zoomable node-link view (host ↔ network ↔ datastore); nodes = icon + label + status dot, selected highlights neighbours; minimap, list-view alternative for a11y. Base: `@xyflow/react`.

### 4.41 Console & log viewer — P1
Monospace 13px on `bg-black/30`, virtualized, line numbers, follow/pause tail, search with next/prev, level colouring (ok/warn/danger), wrap toggle, copy/download. VM console (VNC/WebMKS) is a hosted canvas with toolbar (send Ctrl+Alt+Del, fullscreen, keyboard grab indicator); not a LAF concern beyond chrome.

### 4.42 Code editor & diff — P2
YAML/JSON editor with syntax tokens mapped to colour tokens, line errors in `text-err` with gutter marker, side-by-side/inline diff for before/after (audit §4.21). Base: CodeMirror 6 or Monaco, lazy-loaded.

#### D. Form controls

### 4.43 Combobox / multi-select — P0
Generic form of User selector (§4.19): single or multi, async search with debounce, groups, create-new option, chips for selected (with remove), clear button, loading/empty states, virtualized list. `role="combobox"` + `aria-activedescendant`; Backspace removes the last chip. UserSelector/DeviceSelector become thin wrappers. Base: Popover + `cmdk`.

### 4.44 Number & unit input / Slider — P1
Number input: stepper buttons, min/max/step, mono tabular, unit suffix select (MHz/GHz, MB/GB/TB), converts and clamps on blur, error on out-of-range. Slider: 4px track, 16px thumb (square-ish, radius ≤ 4px), paired with number input for resource allocation, ticks/marks. Base: `@radix-ui/react-slider`.

### 4.45 Date / time / range picker — P1
Input with calendar Popover; date, datetime, range modes; typed entry with format hint, Monday-first by locale, min/max, disabled dates, timezone label. Keyboard grid per APG date picker. Base: `react-day-picker`.

### 4.46 Tag / chip & tag input — P1
Chip `h-6 rounded-sm bg-muted-bg border px-2 text-xs` with optional remove (×); tag input adds on Enter/comma/paste-split, validation, max count, duplicates rejected with message. Used for VM tags, labels, redirect URIs, scopes.

### 4.47 Password field — P0
Input + reveal toggle (`aria-pressed`, no autofocus loss), caps-lock hint, optional strength meter (4 steps, text label not colour only), `autocomplete` (`current-password`/`new-password`), confirm-match validation. Never logs/echoes value.

### 4.48 File upload / dropzone — P2
Dashed `border-line-strong` zone, click/drag/paste, type and size limits, per-file progress/remove/retry, error rows; keyboard-operable hidden input. Used for ISO/OVA upload, logos, certs.

### 4.49 Key-value editor — P1
Rows of key + value inputs with add/remove/reorder, duplicate-key validation, bulk paste (`k=v` lines), optional secret masking. Used for env vars, annotations, custom attributes, claims mapping.

### 4.50 Inline edit — P2
Text that turns into an input on click/Enter; Enter saves, Esc cancels, blur saves, pending and error states; pencil affordance on hover and focus. Rename VM/folder.

### 4.51 Form integration — P1
`Field` (§4.2) wired to `react-hook-form` (+ `zod` resolver) via `<FormField>` helper: label/description/error ids, `aria-invalid`, `aria-describedby`, error summary at the form top with links, submit-disabled while pending. Library-agnostic core; adapter is optional.

#### E. Display helpers

### 4.52 Definition list / properties pane — P0
`dl` in 2-column grid (`dt` 11px uppercase `text-subtle`, `dd` 14px; mono for ids/IPs), group headings, per-value copy button, empty value "—", responsive 1-column < 640px. Core of every vSphere object "Summary" tab.

### 4.53 Copy to clipboard — P0
Icon button; success state 2s (icon → check, `aria-live` "Copied"), fallback when the Clipboard API is unavailable; `sr-only` label. Used in 4.52, 4.56, 4.22 device code.

### 4.54 Confirm dialog — P0
Dialog preset: title, consequence text, impacted-object list, destructive button (`danger`) with verb ("Delete 3 VMs"), optional **type-to-confirm** (enabled only when the typed name matches), default focus on Cancel, pending state. `role="alertdialog"`.

### 4.55 Kbd — P2
`h-5 min-w-5 rounded-sm border bg-muted-bg px-1 font-mono text-[11px]`; renders ⌘/Ctrl per platform; used in menus, palette, tooltips.

#### F. SSO-specific (beyond §4.22)

### 4.56 Token & API-key display — P0
Show-once secret: mono value in `code-display`, copy, "I have stored this" checkbox before closing, masked afterwards (`••••` + last 4), created/expires/last-used metadata, revoke action with Confirm dialog (4.54).

### 4.57 MFA enrolment — P0
Steps via 4.34: choose method (TOTP / WebAuthn passkey / recovery codes) → QR (+ manual secret with copy) → verify with OTP input (§4.22) → recovery codes (download/print, show once). WebAuthn states: waiting for authenticator, failed, success. Contrast-safe QR on a light tile (documented exception to dark-only; the tile only).

### 4.58 Session / user menu — P0
Avatar button → DropdownMenu: name/email/tenant header, profile, security, sessions, theme-free (dark only), language, sign out. Shows impersonation and session-expiry warnings.

### 4.59 Tenant / realm switcher — P1
Header combobox (4.43) listing tenants with logo/avatar, search, recent, current marked `aria-current`; switching confirms when unsaved changes exist.

### 4.60 Role & permission editor (RBAC matrix) — P1
Matrix: rows = resources/privileges (tree-grouped), columns = roles or actions; tri-state checkboxes (all/some/none) at group level, inherited permissions shown disabled with source badge, search/filter, diff of pending changes with Save/Discard, read-only mode. Keyboard: arrow navigation in the grid.

### 4.61 OIDC client & consent management — out of scope
OIDC is not a LAF concern ([`docs/design.md`](docs/design.md) §1.3): client registration, consent, IdP federation and keys are built in `shadow-sso-accounts` from generic components (Data grid, Properties pane 4.52, Key-value 4.49, Tag input 4.46, Token display 4.56). `OidcClientList`/`OidcClientForm` are deprecated and will be removed in 0.2.

### 4.62 Shipped in 1.0 — foundations, data and domain packs
Concise entries for what `docs/design.md` specified and 1.0 ships. Per-prop detail lives in the TSDoc of `lib/`; every entry follows §7 DoD (tests, axe, tokens only, logical CSS properties for RTL, catalogue strings).

**Foundations.** `LafProvider` / `useLaf` — typed `LafMessages` catalogue (`en` built in, `hu` at `@pilab/laf/locales/hu`, per-component sets under `messages.components`), `timeZone`, `portalContainer`. `useControllableState`, `format.*` / `createFormatters()` (bytes, bitrate, frequency, duration, percent, relative, dateTime), `ObjectIcon` / `registerObjectKind`, label palette `--label-1…12`, `useHotkeys`.

**DataGrid** — virtualised (50 000 rows), sortable (`sort: GridSort[]`, multi-sort), selectable (`selected: string[]`), resizable/reorderable/pinnable columns, density, column menu, search, saved views, row expand. a11y: `role="grid"`, `aria-rowcount/colcount/sort/selected`, roving tabindex. Keyboard: arrows, Home/End, PageUp/Down, Space select, Shift+arrows range, Ctrl+A.

**TreeView / TreeTable** — virtualised tree (10 000 nodes), `expanded`, `selected` (`string | string[]`), lazy children, drag hooks; `TreeTable` is the tree-grid variant. a11y: `role="tree"`/`treegrid`, `aria-level/posinset/setsize/expanded`. Keyboard: arrows, →/← expand/collapse, Home/End, type-ahead, `*` expand siblings.

**Combobox / menus** — single/multi, async, create option, clear; DropdownMenu/ContextMenu with a declarative menu spec, sub-menus, checkable items, shortcuts. Keyboard per ARIA APG combobox/menu.

**FilterBar** — typed query grammar (design §9), chips, saved filters, hu/en strings. **Wizard** — step flow with validation, review step, dialog/page mode, unsaved-changes guard. **Layout** — `PageHead`, `FormPage`, `DetailPage`, `SubNav`, `MobileNav`, `FormFooter`, `UnsavedChangesDialog`, `SplitPane`.

**Charts (`@pilab/laf/charts`)** — Sparkline, Line/Bar/Donut/Gauge, TimeSeries, PerfPanel; text alternative and data-table fallback; tokens for colours. **Editor (`/editor`)** — CodeMirror editor, Markdown editor/renderer, diff view. **DnD (`/dnd`)** — sortable lists/boards with keyboard sensor and live-region announcements. **Topology (`/topology`)** — `TopologyGraphFlow` (xyflow), keyboard-navigable nodes, `aria-label`ed.

**SSO pack** — account (sessions, devices, MFA, tokens, audit), admin (shell, notifications, allow-list editor, audit log). **Tracker pack** — issue card, board, comments, labels, priorities. **vSphere pack** — inventory tree, object pages, `ObjectIcon`, console/performance panels.

#### G. Packages beyond LAF (not styled components)
- **App sign-in:** out of scope; apps use `@pilab/shadow-sso` (`../3so/shadow-sso-client`: FedCM, silent login, One Tap, PKCE). No `@pilab/auth` package.
- **Heavy engines:** charts, editor and drag & drop ship as tree-shakeable subpath entries (`@pilab/laf/charts`, `/editor`, `/dnd`) with optional peer dependencies ([`docs/design.md`](docs/design.md) ADR-1).
- **i18n:** `LafProvider` + typed string catalogue (§6 rule 8), `hu`/`en` baseline, RTL smoke test ([`docs/design.md`](docs/design.md) F1).

#### H. Infrastructure (required by §6/§7, currently absent)
Unit + keyboard tests (Testing Library), `jest-axe`, radius ≤ 4px computed-style test, Storybook (or promote `playground/`), visual snapshots, CI (typecheck/build/test), changelog + semver release, commit history/tagging, README refresh (still says "React kit to come").

---

## 5. Page templates

1. **Auth page** — `body` is a centred **column** (`flex-col items-center justify-center`), `.container` (420px) > `.card`; language switcher is a sibling *after* the card. Never a row flex.
2. **Admin page** — `.admin` grid: sidebar · (`top bar` + `content` with `page-head`, optional `stat-grid`, `tabs`, `toolbar`, `table-wrap` + `pagination`).
3. **Detail page** — breadcrumb, `page-head` with status badge and actions, two-column grid (`2fr 1fr`) of panels; side column holds metadata and danger zone (`border-danger-line`, danger button).
4. **Form page** — single column `max-w-2xl` panel(s); sticky footer bar with Cancel (secondary) + Save (primary); unsaved-changes guard.

Responsive breakpoints: `480px` (auth card padding), `860px` (admin collapses, audit/table secondary columns hidden).

---

## 6. React kit conventions (for agents)

**Package layout**
```
packages/ui/
  src/styles/tokens.css      ← :root tokens + @theme inline + radius clamp (copy of src/app.css sections)
  src/components/<name>/     ← <name>.tsx, <name>.stories.tsx, <name>.test.tsx
  src/index.ts               ← named exports only
```
**Rules**
1. One component per folder; **named exports**; props typed with an exported `<Name>Props`; extend native element props (`React.ComponentProps<'button'>`) and forward `ref`/`className`.
2. Style with `cva` for variants + `cn()` (`clsx` + `tailwind-merge`); **no CSS-in-JS**, no component-level `.css` files.
3. Wrap Radix primitives (shadcn style); do not re-implement focus traps, positioning or roving focus.
4. Tokens only (R2); `className` override must not be able to break the radius cap — lint with a custom rule or a test that renders each component and asserts computed `border-radius ≤ 4px`.
5. Controlled **and** uncontrolled where shadcn supports it (`value/defaultValue/onValueChange`).
6. Every component ships: Storybook story per variant × state, a11y test (`jest-axe`), keyboard test (Testing Library `user-event`), and a visual snapshot.
7. Icons: `lucide-react`, 16px default (`size-4`), stroke 2, `aria-hidden` unless standalone.
8. Copy: sentence case, no trailing periods on buttons/labels, verbs on buttons ("Revoke access", not "OK"). All strings come from props or i18n keys — never hardcoded.
9. i18n/RTL: use logical properties (`ms-*`, `ps-*`, `text-start`) in new code; locale switch must not change layout (§4.22 switcher).

**shadcn theming snippet (`tokens.css`)**
```css
@theme inline {
  --color-background: transparent;        /* body paints the gradient */
  --color-foreground: var(--text);
  --color-card: var(--bg-card);
  --color-popover: var(--bg-menu);
  --color-primary-foreground: var(--on-primary);
  --color-secondary: var(--bg-input);
  --color-muted: var(--bg-muted);
  --color-muted-foreground: var(--text-muted);
  --color-accent: var(--bg-card-hover);
  --color-destructive: var(--error);
  --color-border: var(--border);
  --color-input: var(--bg-input);
  --color-ring: var(--primary-light);
  --radius: 4px;
}
```
> Name collision: in `app.css` the utilities `text-muted`/`bg-input` map to *our* tokens. When adopting shadcn's names, keep **one** mapping per name; the table in §1.1 is canonical for the kit and the shadcn variables above are aliases only.

---

## 7. Definition of done (per component)

- [ ] Matches §4 spec & the class table; verified against `styleguide.html` at 1× and 2×.
- [ ] All states in §3 implemented and shown in Storybook.
- [ ] Radius ≤ 4px, tokens only, no inline style (R1–R3).
- [ ] Keyboard operable; axe has 0 violations; focus visible.
- [ ] Works at 320px wide and with long/RTL/Hungarian-accented text (`ő ű á é`).
- [ ] Reduced-motion respected.
- [ ] Exported from `index.ts`, documented props, no hardcoded strings.

### App shell

`AppFrame` (masthead · sidebar · breadcrumb · `PageHeader` · content · `AppFooter` · optional `DrawerPanel`) with `Masthead`/`MastheadToggle`/`MastheadBrand`/`MastheadContent`/`MastheadActions`, `ThemeToggle`, `Sidebar`/`NavTree` (arbitrary depth, `aria-current`/`aria-expanded`, roving tabindex, icon rail, `tree` slot using TreeView) and `PageSection`. The sidebar overlays below 860 px; `persistKey` remembers collapse state. Labels live in `messages.components.ui.appFrame`. See `?demo=app-frame`.

### Portal & server-side tables

`PortalLayout` (on `AppFrame`): masthead with brand, global search (`CommandPalette`), `AppSwitcher` grid menu, notifications, `ThemeToggle`, `UserMenu`; sidebar sections, `PageHeader` and breadcrumb derived from a `routes` model (`resolvePortalRoute`, `portalBreadcrumbs`, `portalNavEntries`; router-agnostic through `path` + `onNavigate`/`render`/`hrefFor`); `route.tabs` render in the header; `AppFooter` via `footer`. `PortalHome` is the launchpad (favourite/recent app cards, announcements, quick actions).

`useServerGrid({ fetcher, initialSort, pageSize, debounceMs, urlSync })` owns sort, page/cursor, page size, filters and debounced search; the previous request is aborted (`signal`), old rows stay while loading (`stale`), errors expose `refresh()`. `fetcher({ sort, page, pageSize, filters, search, signal })` returns `{ rows, total }`. `ServerDataGrid` wires it into `DataGrid` (manual mode: `aria-sort`, skeleton/overlay loading, in-grid error row with retry, footer with total and page size, `aria-rowcount`) plus `Toolbar`/`SearchInput`/`FilterBar`. `DataGrid` also accepts `pagination` and `onRetry` directly. Strings live in `messages.components.portal`. See `?demo=portal`.

## 8. Anti-patterns (reject in review)

Pill buttons or circular avatars · gradients other than brand/page · coloured text on coloured fill without a token pair · more than one primary button per region · tooltips as the only label · modals opening modals · hover-only disclosure · hardcoded `#54a2ff` · `font-weight: 500/600` expectations with Lato · centring the whole admin table layout · a second font.
