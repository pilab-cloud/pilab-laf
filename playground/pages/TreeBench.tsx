import * as React from "react";
import { ActionBar, InfiniteList, TreeView, type TreeNode } from "../../lib";

/** 10 000 nodes: 100 groups × 100 leaves. */
function build(groups = 100, leaves = 100): TreeNode[] {
  return Array.from({ length: groups }, (_, g) => ({
    id: `g${g}`,
    label: `Group ${g}`,
    children: Array.from({ length: leaves }, (_, i) => ({
      id: `g${g}-n${i}`,
      label: `Node ${g}.${i}`,
      disabled: i % 25 === 24,
      status: (i % 10 === 0 ? "danger" : i % 7 === 0 ? "warning" : undefined) as TreeNode["status"],
    })),
  }));
}

export const isTreeBench = () => typeof location !== "undefined" && new URLSearchParams(location.search).get("bench") === "tree";

/** Open with `?bench=tree`. Shows frame-to-frame key latency over 10 000 expanded nodes. */
export default function TreeBench() {
  const nodes = React.useMemo(() => build(), []);
  const allOpen = React.useMemo(() => nodes.map((n) => n.id), [nodes]);
  const [sel, setSel] = React.useState<string[]>([]);
  const [last, setLast] = React.useState(0);
  const [rows, setRows] = React.useState(Array.from({ length: 50 }, (_, i) => `Row ${i}`));
  const [loading, setLoading] = React.useState(false);

  const more = () => {
    setLoading(true);
    setTimeout(() => {
      setRows((r) => [...r, ...Array.from({ length: 50 }, (_, i) => `Row ${r.length + i}`)]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-sm text-muted">
        10 000 nodes · {sel.length} selected · last key handled in {last.toFixed(1)} ms
      </p>
      <div
        onKeyDownCapture={() => {
          const t = performance.now();
          requestAnimationFrame(() => setLast(performance.now() - t));
        }}
      >
        <TreeView
          label="Benchmark tree"
          nodes={nodes}
          selection="multiple"
          defaultExpanded={allOpen}
          selected={sel}
          onSelectedChange={setSel}
          height={480}
          className="rounded-sm border border-line"
          contextMenu={(id) => [{ id: "copy", label: `Copy ${id}`, onSelect: () => navigator.clipboard?.writeText(id) }]}
        />
      </div>
      <ActionBar
        label="Bench actions"
        items={[
          { id: "a", label: "Expand all", onSelect: () => {} },
          { id: "b", label: "Collapse all", onSelect: () => {} },
          { type: "separator" },
          { id: "c", label: "Export", onSelect: () => {} },
        ]}
      />
      <InfiniteList
        label="Infinite rows"
        items={rows}
        rowHeight={28}
        height={200}
        hasMore={rows.length < 300}
        loading={loading}
        onEndReached={more}
        renderRow={(r) => <div className="px-2 text-sm">{r}</div>}
      />
    </div>
  );
}
