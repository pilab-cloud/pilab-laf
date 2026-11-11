# SimpleTable

Source: `lib/components/simple-table.tsx`; demo: `simple-table` (`playground/pages/SimpleTable.tsx`). For small, non-virtualised tables; use `DataGrid`/`TreeTable` for large or interactive data. Strings: `components.simpleTable`.

```tsx
<SimpleTable
  caption="Users"
  columns={[
    { id: "name", header: "Name", sortable: true, rowHeader: true },
    { id: "logins", header: "Logins", align: "end", sortable: true, cell: (r) => r.logins },
  ]}
  rows={rows}
  getRowId={(r) => r.id}
  sort={sort}
  onSortChange={setSort}       // cycles asc → desc → null; reorder `rows` yourself
  selectable selected={ids} onSelectedChange={setIds} getRowLabel={(r) => r.name}
  rowActions={(r) => <Button size="sm" variant="ghost">Edit</Button>}
  pagination={{ page, pageCount, total, pageSize, onPageChange }}
/>
```

- **Columns**: `id`, `header`, `cell?`, `align` (`start|center|end`), `width`, `sortable`, `rowHeader`, `className`. Sortable headers are buttons with `aria-sort` on the `th`.
- **Selection**: header checkbox (indeterminate when partial) selects the visible rows; controlled or uncontrolled.
- **States**: `loading` shows `loadingRows` Skeleton rows (`aria-busy`); no rows shows `empty` (default text from the catalogue).
- **Layout**: `density="dense"`, `stickyHeader` (+ `maxHeight`), `caption` (`captionHidden` for screen readers only). The scroll wrapper is `relative overflow-x-auto`, so wide tables scroll inside it and never widen the page.
- **Footer**: the kit's `Pagination`.
