import { Background, Controls, MiniMap, ReactFlow, ReactFlowProvider, type Edge, type Node } from "@xyflow/react";
import * as React from "react";
import { cn } from "../cn";
import { Button } from "./button";

/*
 * xyflow-based topology graph. Kept out of lib/index.ts so the core bundle stays free of @xyflow;
 * import it from its own file (lib/components/topology.tsx); a "./topology" tsup entry is a pending lead decision.
 */
export interface FlowTopologyNode {
  id: string;
  label: string;
  tone?: "ok" | "warn" | "danger";
  /** Optional fixed position; otherwise a simple layered layout is computed. */
  x?: number;
  y?: number;
}
export interface FlowTopologyEdge {
  from: string;
  to: string;
}

export interface TopologyFlowLabels {
  graph: string;
  list: string;
  showList: string;
  showGraph: string;
  connections: string;
}

const defaults: TopologyFlowLabels = {
  graph: "Topology graph",
  list: "Topology list",
  showList: "List view",
  showGraph: "Graph view",
  connections: "Connections",
};

const toneCls = { ok: "border-ok", warn: "border-warn", danger: "border-danger" } as const;

/** Layers nodes by longest path from the roots (nodes without incoming edges). */
export function layoutLayers(nodes: FlowTopologyNode[], edges: FlowTopologyEdge[], gap = { x: 200, y: 90 }) {
  const depth = new Map<string, number>(nodes.map((n) => [n.id, 0]));
  for (let pass = 0; pass < nodes.length; pass++) {
    let changed = false;
    for (const e of edges) {
      const d = (depth.get(e.from) ?? 0) + 1;
      if (depth.has(e.to) && d > depth.get(e.to)! && d < nodes.length) {
        depth.set(e.to, d);
        changed = true;
      }
    }
    if (!changed) break;
  }
  const rows = new Map<number, number>();
  return new Map(
    nodes.map((n) => {
      const d = depth.get(n.id) ?? 0;
      const r = rows.get(d) ?? 0;
      rows.set(d, r + 1);
      return [n.id, { x: n.x ?? d * gap.x, y: n.y ?? r * gap.y }] as const;
    }),
  );
}

export interface TopologyGraphFlowProps {
  nodes: FlowTopologyNode[];
  edges: FlowTopologyEdge[];
  label?: string;
  height?: number;
  selectedId?: string;
  onSelect?: (id: string) => void;
  minimap?: boolean;
  labels?: Partial<TopologyFlowLabels>;
  className?: string;
}

function Inner({ nodes, edges, label, height = 320, selectedId, onSelect, minimap = true, labels, className }: TopologyGraphFlowProps) {
  const l = { ...defaults, ...labels };
  const [asList, setAsList] = React.useState(false);
  const [hover, setHover] = React.useState<string | null>(null);
  const focus = hover ?? selectedId ?? null;
  const neighbours = React.useMemo(() => {
    const s = new Set<string>();
    if (focus) {
      s.add(focus);
      for (const e of edges) {
        if (e.from === focus) s.add(e.to);
        if (e.to === focus) s.add(e.from);
      }
    }
    return s;
  }, [focus, edges]);

  const pos = React.useMemo(() => layoutLayers(nodes, edges), [nodes, edges]);
  const rfNodes: Node[] = nodes.map((n) => ({
    id: n.id,
    position: pos.get(n.id)!,
    data: { label: n.label },
    selected: n.id === selectedId,
    className: cn("rounded-md border bg-surface px-2 py-1 text-xs text-fg", n.tone ? toneCls[n.tone] : "border-line", focus && !neighbours.has(n.id) && "opacity-40"),
  }));
  const rfEdges: Edge[] = edges.map((e) => ({
    id: `${e.from}->${e.to}`,
    source: e.from,
    target: e.to,
    style: { opacity: focus && !(e.from === focus || e.to === focus) ? 0.2 : 1 },
  }));

  return (
    <div className={cn("overflow-hidden rounded-lg border border-line bg-surface", className)}>
      <div className="flex justify-end border-b border-line px-2 py-1">
        <Button size="sm" variant="ghost" aria-pressed={asList} onClick={() => setAsList((v) => !v)}>
          {asList ? l.showGraph : l.showList}
        </Button>
      </div>
      {asList ? (
        <ul aria-label={l.list} className="grid gap-1 p-3 text-sm">
          {nodes.map((n) => {
            const out = edges.filter((e) => e.from === n.id).map((e) => nodes.find((x) => x.id === e.to)?.label ?? e.to);
            return (
              <li key={n.id}>
                <button type="button" aria-current={n.id === selectedId || undefined} className="text-primary hover:underline" onClick={() => onSelect?.(n.id)}>
                  {n.label}
                </button>
                {out.length > 0 && (
                  <span className="text-muted">
                    {" "}
                    → {out.join(", ")}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div role="group" aria-label={label ?? l.graph} /* dynamic canvas height */ style={{ height }}>
          <ReactFlow
            nodes={rfNodes}
            edges={rfEdges}
            fitView
            nodesConnectable={false}
            nodesDraggable={false}
            onNodeClick={(_, n) => onSelect?.(n.id)}
            onNodeMouseEnter={(_, n) => setHover(n.id)}
            onNodeMouseLeave={() => setHover(null)}
            proOptions={{ hideAttribution: true }}
          >
            <Background />
            <Controls showInteractive={false} />
            {minimap && <MiniMap pannable zoomable />}
          </ReactFlow>
        </div>
      )}
    </div>
  );
}

export function TopologyGraphFlow(props: TopologyGraphFlowProps) {
  return (
    <ReactFlowProvider>
      <Inner {...props} />
    </ReactFlowProvider>
  );
}
