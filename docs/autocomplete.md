# Autocomplete, ChipsInput, QuickSearch

All three live in `lib/components/autocomplete.tsx` (demo: `playground/pages/Inputs.tsx`, id `inputs`). Strings come from `t.components.autocomplete.{autocomplete,chips,quickSearch}` and fall back to the bundled English (`lib/messages/autocomplete.en.ts`; Hungarian in `lib/locales/autocomplete.hu.ts`).

## Autocomplete

`<Autocomplete label options | loadOptions … />` — a WAI-ARIA 1.2 combobox (`role="combobox"` input, `aria-activedescendant`, `role="listbox"` popup in a portaled Radix Popover).

- **Value**: single (`value: Option | null`) or `multiple` (`Option[]`, shown as `Chip`s; Backspace removes the last). Controlled via `value`/`onChange`, or `defaultValue`.
- **Options**: `ComboboxOption` (`value`, `label`, `description`, `group`, `disabled`). Static `options` are filtered locally (`filter` to override); groups render as `role="group"` sections.
- **Async**: `loadOptions(query, signal)`, debounced (`debounceMs`, default 250), `minChars`. The previous request's `signal` is aborted on every new query, on close and on unmount. Loading, empty and error (with Retry) states are announced via `role="status"`/`alert`.
- **Free solo**: `freeSolo` (Enter commits the typed text, plus a "Create “q”" row) or `onCreate(text)` to build the option yourself.
- `clearable`, `renderOption`, `invalid`, `disabled`, controlled `open`.
- **Keys**: ↓/↑ move (open when closed), Home/End, Enter picks (or creates in free-solo with nothing highlighted), Esc closes.

### vs `Combobox`
`Combobox` (cmdk) stays the choice for simple pick-lists. Autocomplete shares its `ComboboxOption` type, `Chip` and `dropdown-*` styling but needs its own core for abortable loads, error state and free-solo.

## ChipsInput

A superset of `TagInput` (`value`, `onChange`, `label`, `placeholder`, `max`, `validate` are identical), so it is a drop-in replacement.

- Add on Enter / comma (`delimiters`), paste (split by `splitPattern`, default commas + whitespace) and blur (`addOnBlur`).
- Remove with Backspace on empty text or the chip's ✕.
- `validate(chip)` → message. Default: rejected with an inline error (as `TagInput`). `keepInvalid`: added as a chip in the `danger` tone (tooltip = message) so the form can block submit.
- `duplicates`: `reject` (default) / `ignore` / `allow`. `max` shows an error instead of silently dropping.
- `icon(chip)` → leading icon via the `Chip` `icon` prop; `normalize(chip)`; uncontrolled via `defaultValue`.

## QuickSearch

A masthead search box: inline, `w-48` → `w-72` on focus (full width below `sm`), Ctrl/⌘+K focuses it (`hotkey={false}` to disable).

- `search(query, signal)` → `QuickSearchResult[]` (`id`, `kind`, `name`, `path`, `state`, `group`); debounced (`debounceMs`, 200) and abortable. Results are grouped by `group ?? kind`; each row shows an `ObjectIcon`, the name, path and state text.
- ↓/↑ navigate, Enter → `onSelect(result)`, Esc closes → clears → blurs.
- Recent selections (max `maxRecent`, 5) show while the query is empty; controlled with `recent`/`onRecentChange`, with a "Clear recent searches" action.
- Loading / empty / error / hint states.

### vs `CommandPalette`
`CommandPalette` is a modal, command-oriented launcher (⌘K). `QuickSearch` is a non-modal inline box for inventory objects. Both bind Ctrl/⌘+K — set `hotkey={false}` on one when they share a page (or have the palette's `search` call the same source).
