# Settings dialogs

Patterns for hypervisor-console style "edit settings" dialogs (vSwitch, storage pool, WireGuard, …). Source: `lib/components/settings.tsx`; demo: `settings-dialog` (`playground/pages/SettingsDialogs.tsx`).

## SettingsDialog

A `Dialog` (`size` reuses the `DialogContent` presets, default `xl`) with a section nav and one `SettingsSection` visible at a time. The nav is a left column when the dialog body is ≥ `@2xl` wide and wraps into a row of tabs above the panel when narrow (container query, like `Wizard`).

```tsx
<SettingsDialog
  title="Edit settings — vSwitch0"
  open={open}
  onOpenChange={setOpen}
  dirty={dirty}                 // you compare draft vs saved
  onApply={async () => save(draft)}
  onReset={() => setDraft(saved)}
  sections={[{ id: "general", title: "General", icon, errorCount: 1, children: … }]}
/>
```

- **Footer** (wraps on small screens): Reset (only when `onReset` is given), Cancel, Apply, OK. Apply/Reset are disabled while not `dirty`; Apply shows a pending state while `onApply` is awaited. A rejected `onApply` keeps the dialog open. OK applies (when dirty) and then closes.
- **Validation**: `errorCount` on a section renders a danger badge on its nav item (announced as "N errors"). Apply/OK with any error does not call `onApply`; it jumps to the first section with errors.
- **Unsaved changes**: closing (Cancel, Esc, ×) while `dirty` opens the existing `UnsavedChangesDialog`; `beforeunload` is guarded too. `onCancel` runs when the dialog is dismissed.
- `activeSection` / `defaultActiveSection` / `onActiveSectionChange` control the visible section.

`SettingsSection` ({`id`, `title`, `description?`, `icon?`, `errorCount?`, `children`}) can also be used standalone.

## SettingRow

Label + help + control. `layout="auto"` (default) places the control beside the label when the row itself is ≥ `@lg`, otherwise stacks; force with `inline` / `stacked`. The control is wrapped in a `role="group"` labelled by the label and described by help/error text; pass `htmlFor` to also bind the label to an input. `overridden` (`true` → "Overridden", `false` → "Inherited") shows a badge, and `onReset` adds a reset-to-default action while overridden. Compose with `Input`, `Select`, `Switch`, `Slider` from the kit.

## DeviceList

Controlled editable table for NICs, uplinks, disks and peers: `value` / `onChange`, `getId`, `columns` (`{id, header, cell}`), optional `status` (per-row `StatusDot`), `renderEditor(item, onItemChange)` (inline row expansion via the Edit button), `onAdd` (returns the new item; hides Add when omitted), up/down reorder buttons, row checkboxes with bulk "Remove selected", `canRemove`, and an empty state. The table scrolls horizontally on narrow screens.

Reordering uses up/down buttons: `SortableList` lives in the separate `@pilab/laf/dnd` entry (dnd-kit), which the core entry must not import.

## Messages

Strings come from `lib/messages/settings.en.ts` (`components.settings`) with Hungarian in `lib/locales/settings.hu.ts`; override per locale via `LafProvider` messages. Components fall back to English when the group is not wired into the locale.
