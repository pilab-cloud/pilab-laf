'use strict';

var chunkIP6HZMS5_cjs = require('./chunk-IP6HZMS5.cjs');
var chunkFTHFEMX6_cjs = require('./chunk-FTHFEMX6.cjs');
var react = require('@xyflow/react');
var React = require('react');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var defaults = {
  graph: "Topology graph",
  list: "Topology list",
  showList: "List view",
  showGraph: "Graph view",
  connections: "Connections"
};
var toneCls = { ok: "border-ok", warn: "border-warn", danger: "border-danger" };
function layoutLayers(nodes, edges, gap = { x: 200, y: 90 }) {
  const depth = new Map(nodes.map((n) => [n.id, 0]));
  for (let pass = 0; pass < nodes.length; pass++) {
    let changed = false;
    for (const e of edges) {
      const d = (depth.get(e.from) ?? 0) + 1;
      if (depth.has(e.to) && d > depth.get(e.to) && d < nodes.length) {
        depth.set(e.to, d);
        changed = true;
      }
    }
    if (!changed) break;
  }
  const rows = /* @__PURE__ */ new Map();
  return new Map(
    nodes.map((n) => {
      const d = depth.get(n.id) ?? 0;
      const r = rows.get(d) ?? 0;
      rows.set(d, r + 1);
      return [n.id, { x: n.x ?? d * gap.x, y: n.y ?? r * gap.y }];
    })
  );
}
function Inner({ nodes, edges, label, height = 320, selectedId, onSelect, minimap = true, labels, className }) {
  const l = { ...defaults, ...labels };
  const [asList, setAsList] = React__namespace.useState(false);
  const [hover, setHover] = React__namespace.useState(null);
  const focus = hover ?? selectedId ?? null;
  const neighbours = React__namespace.useMemo(() => {
    const s = /* @__PURE__ */ new Set();
    if (focus) {
      s.add(focus);
      for (const e of edges) {
        if (e.from === focus) s.add(e.to);
        if (e.to === focus) s.add(e.from);
      }
    }
    return s;
  }, [focus, edges]);
  const pos = React__namespace.useMemo(() => layoutLayers(nodes, edges), [nodes, edges]);
  const rfNodes = nodes.map((n) => ({
    id: n.id,
    position: pos.get(n.id),
    data: { label: n.label },
    selected: n.id === selectedId,
    className: chunkFTHFEMX6_cjs.cn("rounded-md border bg-surface px-2 py-1 text-xs text-fg", n.tone ? toneCls[n.tone] : "border-line", focus && !neighbours.has(n.id) && "opacity-40")
  }));
  const rfEdges = edges.map((e) => ({
    id: `${e.from}->${e.to}`,
    source: e.from,
    target: e.to,
    style: { opacity: focus && !(e.from === focus || e.to === focus) ? 0.2 : 1 }
  }));
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("overflow-hidden rounded-lg border border-line bg-surface", className), children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end border-b border-line px-2 py-1", children: /* @__PURE__ */ jsxRuntime.jsx(chunkIP6HZMS5_cjs.Button, { size: "sm", variant: "ghost", "aria-pressed": asList, onClick: () => setAsList((v) => !v), children: asList ? l.showGraph : l.showList }) }),
    asList ? /* @__PURE__ */ jsxRuntime.jsx("ul", { "aria-label": l.list, className: "grid gap-1 p-3 text-sm", children: nodes.map((n) => {
      const out = edges.filter((e) => e.from === n.id).map((e) => nodes.find((x) => x.id === e.to)?.label ?? e.to);
      return /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", "aria-current": n.id === selectedId || void 0, className: "text-primary hover:underline", onClick: () => onSelect?.(n.id), children: n.label }),
        out.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-muted", children: [
          " ",
          "\u2192 ",
          out.join(", ")
        ] })
      ] }, n.id);
    }) }) : /* @__PURE__ */ jsxRuntime.jsx("div", { role: "group", "aria-label": label ?? l.graph, style: { height }, children: /* @__PURE__ */ jsxRuntime.jsxs(
      react.ReactFlow,
      {
        nodes: rfNodes,
        edges: rfEdges,
        fitView: true,
        nodesConnectable: false,
        nodesDraggable: false,
        onNodeClick: (_, n) => onSelect?.(n.id),
        onNodeMouseEnter: (_, n) => setHover(n.id),
        onNodeMouseLeave: () => setHover(null),
        proOptions: { hideAttribution: true },
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(react.Background, {}),
          /* @__PURE__ */ jsxRuntime.jsx(react.Controls, { showInteractive: false }),
          minimap && /* @__PURE__ */ jsxRuntime.jsx(react.MiniMap, { pannable: true, zoomable: true })
        ]
      }
    ) })
  ] });
}
function TopologyGraphFlow(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(react.ReactFlowProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(Inner, { ...props }) });
}

exports.TopologyGraphFlow = TopologyGraphFlow;
exports.layoutLayers = layoutLayers;
//# sourceMappingURL=topology.cjs.map
//# sourceMappingURL=topology.cjs.map