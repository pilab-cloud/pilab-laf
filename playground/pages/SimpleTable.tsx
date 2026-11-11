import * as React from "react";
import { Button } from "../../lib/components/button";
import { SimpleTable, type SimpleTableColumn, type SortState } from "../../lib/components/simple-table";

interface Row {
  id: string;
  name: string;
  role: string;
  logins: number;
}

const all: Row[] = Array.from({ length: 23 }, (_, i) => ({ id: `u${i + 1}`, name: `User ${String.fromCharCode(65 + (i * 7) % 26)}${i + 1}`, role: ["Admin", "Editor", "Viewer"][i % 3]!, logins: (i * 37) % 101 }));
const pageSize = 5;

const columns: SimpleTableColumn<Row>[] = [
  { id: "name", header: "Name", sortable: true, rowHeader: true },
  { id: "role", header: "Role", sortable: true },
  { id: "logins", header: "Logins", sortable: true, align: "end" },
];

export default function SimpleTableDemo() {
  const [sort, setSort] = React.useState<SortState | null>({ id: "name", direction: "asc" });
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [none, setNone] = React.useState(false);

  const sorted = React.useMemo(() => {
    if (!sort) return all;
    const k = sort.id as keyof Row;
    return [...all].sort((a, b) => (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0) * (sort.direction === "asc" ? 1 : -1));
  }, [sort]);
  const rows = none ? [] : sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="min-w-0 space-y-4">
      <h2 className="text-lg font-semibold">SimpleTable</h2>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => setDense(!dense)}>
          Toggle density
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setLoading(!loading)}>
          Toggle loading
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setNone(!none)}>
          Toggle empty
        </Button>
      </div>
      <SimpleTable
        caption="Users"
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        getRowLabel={(r) => r.name}
        sort={sort}
        onSortChange={setSort}
        selectable
        selected={selected}
        onSelectedChange={setSelected}
        rowActions={(r) => (
          <Button size="sm" variant="ghost" onClick={() => setSelected([r.id])}>
            Pick
          </Button>
        )}
        density={dense ? "dense" : "comfortable"}
        loading={loading}
        pagination={{ page, pageCount: Math.ceil(all.length / pageSize), total: all.length, pageSize, onPageChange: setPage }}
      />
    </section>
  );
}
