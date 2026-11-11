# Migrating to 1.0

| Before | After |
|---|---|
| `DataGridLegacy`, `GridColumnLegacy`, `GridSortLegacy` | Use `DataGrid` with `GridColumn[]`. |
| old `TreeTable` (advanced) | Removed; use `TreeTable` (formerly `TreeTableV2`, now exported from `components/treetable`). Rename imports `TreeTableV2` → `TreeTable`. |
| `DataGrid sort={{ id, dir }}` | `sort={[{ id, dir }]}` (`GridSort[]`), with `onSortChange` receiving an array. |
| `DataGrid selected="id"` | `selected={["id"]}`. |
| `OidcClientList`, `OidcClientForm` | Removed in 0.x; build from generic components. |
| English default `labels` props in account/admin/tracker/vSphere/charts components | Still overridable via props; defaults now come from `messages.components.<set>` of `LafProvider`, so `hu` (or your own catalogue) translates them. |
| — | `@pilab/laf/topology` entry for `TopologyGraphFlow`; install `@xyflow/react` to use it. |

Still supported: `TreeView` `selected` as `string | string[]` (single-select shorthand).

RTL: components use logical Tailwind classes (`ms-`, `pe-`, `start-`, `text-start`). Custom CSS overriding component classes should use logical properties too.
