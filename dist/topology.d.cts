import * as React from 'react';

interface FlowTopologyNode {
    id: string;
    label: string;
    tone?: "ok" | "warn" | "danger";
    /** Optional fixed position; otherwise a simple layered layout is computed. */
    x?: number;
    y?: number;
}
interface FlowTopologyEdge {
    from: string;
    to: string;
}
interface TopologyFlowLabels {
    graph: string;
    list: string;
    showList: string;
    showGraph: string;
    connections: string;
}
/** Layers nodes by longest path from the roots (nodes without incoming edges). */
declare function layoutLayers(nodes: FlowTopologyNode[], edges: FlowTopologyEdge[], gap?: {
    x: number;
    y: number;
}): Map<string, {
    readonly x: number;
    readonly y: number;
}>;
interface TopologyGraphFlowProps {
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
declare function TopologyGraphFlow(props: TopologyGraphFlowProps): React.JSX.Element;

export { type FlowTopologyEdge, type FlowTopologyNode, type TopologyFlowLabels, TopologyGraphFlow, type TopologyGraphFlowProps, layoutLayers };
