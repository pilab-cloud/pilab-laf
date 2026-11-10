import * as React from "react";
import { FilterBar, parseFilter, type FilterField } from "../../lib/components/filterbar";

const fields: FilterField[] = [
  { key: "status", type: "enum", description: "Issue status", options: [{ value: "open" }, { value: "in progress" }, { value: "closed" }] },
  { key: "assignee", description: "Person", options: [{ value: "@me" }, { value: "anna" }, { value: "bela" }] },
  { key: "label", description: "Label", options: [{ value: "bug" }, { value: "bug fix" }, { value: "wontfix" }] },
  { key: "priority", type: "number", description: "1–4" },
  { key: "is", type: "enum", options: [{ value: "open" }, { value: "closed" }, { value: "draft" }] },
];

export default function FilterBarDemo() {
  const [query, setQuery] = React.useState("status:open assignee:@me");
  const parsed = React.useMemo(() => parseFilter(query), [query]);
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">FilterBar + SavedViews</h2>
      <FilterBar fields={fields} value={query} onChange={setQuery} savedViews={{ storageKey: "playground.filterbar.views" }} />
      <p className="text-sm text-muted">
        Raw query: <code>{query || "∅"}</code>
      </p>
      <pre className="overflow-auto rounded-sm border border-line bg-muted-bg p-3 text-xs">{JSON.stringify(parsed.filters, null, 2)}</pre>
    </section>
  );
}
