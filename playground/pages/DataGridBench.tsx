import * as React from "react";
import { DataGrid, GridColumnsMenu, GridDensityToggle, GridSearch, TreeTableV2 as TreeTable, type GridColumn, type GridFilter, type GridSort } from "../../lib";

interface Row {
  id: string;
  name: string;
  host: string;
  cpu: number;
  state: "on" | "off";
}

const makeRows = (n: number): Row[] =>
  Array.from({ length: n }, (_, i) => ({ id: `vm-${i}`, name: `vm-${String(i).padStart(5, "0")}`, host: `esx-${i % 40}`, cpu: (i * 7) % 100, state: i % 3 ? "on" : "off" }));

const columns: GridColumn<Row>[] = [
  { id: "name", header: "Name", sortable: true, filter: "text", cell: (r) => r.name, pin: "start", width: 180 },
  { id: "host", header: "Host", sortable: true, filter: "select", cell: (r) => r.host },
  { id: "cpu", header: "CPU %", sortable: true, numeric: true, filter: "range", cell: (r) => r.cpu },
  { id: "state", header: "State", sortable: true, cell: (r) => r.state },
];

const flag = (name: string) => (typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get(name));

function ServerDemo() {
  const all = React.useMemo(() => makeRows(2000), []);
  const [sort, setSort] = React.useState<GridSort[]>([]);
  const [filters, setFilters] = React.useState<GridFilter[]>([]);
  const [search, setSearch] = React.useState("");
  const [state, setState] = React.useState<{ rows: Row[]; total: number; loading: boolean }>({ rows: [], total: 0, loading: true });

  React.useEffect(() => {
    setState((s) => ({ ...s, loading: true }));
    const timer = setTimeout(() => {
      let out = all.filter((r) => !search || r.name.includes(search));
      for (const f of filters) {
        if (f.id === "name") out = out.filter((r) => r.name.includes(String(f.value)));
        if (f.id === "host") out = out.filter((r) => r.host === f.value);
        if (f.id === "cpu") {
          const [min, max] = f.value as [number?, number?];
          out = out.filter((r) => (min === undefined || r.cpu >= min) && (max === undefined || r.cpu <= max));
        }
      }
      out = [...out].sort((a, b) => {
        for (const s of sort) {
          const x = a[s.id as keyof Row];
          const y = b[s.id as keyof Row];
          if (x !== y) return (x < y ? -1 : 1) * (s.dir === "asc" ? 1 : -1);
        }
        return 0;
      });
      setState({ rows: out.slice(0, 50), total: out.length, loading: false });
    }, 600);
    return () => clearTimeout(timer);
  }, [all, sort, filters, search]);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg">Server-side (manual) — 600 ms fake latency, first 50 of {state.total}</h2>
      <DataGrid
        label="Virtual machines (server)"
        manual
        rowCount={state.total}
        columns={columns}
        rows={state.rows}
        rowId={(r) => r.id}
        loading={state.loading}
        sort={sort}
        onSortChange={setSort}
        filters={filters}
        onFiltersChange={setFilters}
        search={search}
        onSearchChange={setSearch}
        toolbar={
          <>
            <GridSearch />
            <GridColumnsMenu />
            <GridDensityToggle />
          </>
        }
        height={360}
      />
    </section>
  );
}

function TreeDemo() {
  const nodes = React.useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: `p${i}`,
        data: { name: `Pool ${i}`, cpu: i * 10 },
        children: Array.from({ length: 4 }, (_, j) => ({ id: `p${i}-${j}`, data: { name: `VM ${i}.${j}`, cpu: j * 3 }, children: j === 0 ? [{ id: `p${i}-${j}-s`, data: { name: "Snapshot", cpu: 0 } }] : undefined })),
      })),
    [],
  );
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg">TreeTable</h2>
      <TreeTable
        label="Resource pools"
        nodes={nodes}
        defaultExpanded={["p0"]}
        height={260}
        columns={[
          { id: "name", header: "Name", sortable: true, cell: (r: { name: string }) => r.name, width: 260 },
          { id: "cpu", header: "CPU", sortable: true, numeric: true, cell: (r: { cpu: number }) => r.cpu },
        ]}
      />
    </section>
  );
}

export default function DataGridBench() {
  const bench = flag("bench") === "grid";
  const rows = React.useMemo(() => makeRows(bench ? 50_000 : 1_000), [bench]);
  const [selected, setSelected] = React.useState<string[]>([]);
  return (
    <div className="flex flex-col gap-8 p-4">
      <section className="flex flex-col gap-2">
        <h2 className="text-lg">DataGrid — {rows.length.toLocaleString()} rows{bench ? " (?bench=grid)" : " (add ?bench=grid for 50 000)"}</h2>
        <DataGrid
          label="Virtual machines"
          viewKey="playground-bench"
          columns={columns}
          rows={rows}
          rowId={(r) => r.id}
          selected={selected}
          onSelectedChange={setSelected}
          stickyFirstColumn
          height={480}
          onRowActivate={(r) => alert(`Open ${r.name}`)}
          rowActions={(r) => [
            { id: "open", label: "Open", onSelect: () => alert(`Open ${r.name}`) },
            { id: "del", label: "Delete", danger: true, separatorBefore: true, onSelect: () => alert(`Delete ${r.name}`) },
          ]}
          renderExpanded={(r) => <span>Details for {r.name}</span>}
          bulkActions={(ids) => <button type="button" className="border border-line px-2 py-1" onClick={() => setSelected([])}>Power off {ids.length}</button>}
          toolbar={
            <>
              <GridSearch />
              <GridColumnsMenu />
              <GridDensityToggle />
            </>
          }
        />
      </section>
      {!bench && <ServerDemo />}
      {!bench && <TreeDemo />}
    </div>
  );
}
