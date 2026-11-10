import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, TabsList, TabsTrigger } from "./overlay";
import { TaskPanel, type TaskItem } from "./inventory";

/* ── Tabs list that moves trailing tabs into a "More" menu (use inside <Tabs>) ── */
export function OverflowTabs({
  tabs,
  maxVisible = 4,
  moreLabel = "More tabs",
  onSelect,
}: {
  tabs: { value: string; label: string }[];
  maxVisible?: number;
  moreLabel?: string;
  /** Needed so menu items can switch a controlled <Tabs>. */
  onSelect: (value: string) => void;
}) {
  const visible = tabs.slice(0, maxVisible);
  const rest = tabs.slice(maxVisible);
  return (
    <div className="flex items-center">
      <TabsList>
        {visible.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {rest.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" aria-label={moreLabel} className="ms-1 border-0 bg-transparent px-2 text-muted hover:text-fg">
              <MoreHorizontal size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {rest.map((t) => (
              <DropdownMenuItem key={t.value} onSelect={() => onSelect(t.value)}>
                {t.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

/* ── Task panel docked to the bottom of its positioned parent ── */
export function DockedTaskPanel({
  tasks,
  onCancel,
  onRetry,
  title = "Recent tasks",
  defaultOpen = false,
}: {
  tasks: TaskItem[];
  onCancel?: (id: string) => void;
  onRetry?: (id: string) => void;
  title?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const running = tasks.filter((t) => t.status === "running").length;
  return (
    <section aria-label={title} className="absolute inset-x-0 bottom-0 border-t border-line bg-surface">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 border-0 bg-transparent px-4 py-2 text-start text-sm font-medium text-fg"
      >
        {open ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        {title}
        <span className="ms-auto text-xs font-normal text-muted" aria-live="polite">
          {running} running
        </span>
      </button>
      {open && (
        <div className="max-h-64 overflow-auto">
          <TaskPanel tasks={tasks} onCancel={onCancel} onRetry={onRetry} />
        </div>
      )}
    </section>
  );
}

/* ── Topology graph (static SVG layout supplied by the caller) ── */
export type TopologyNode = { id: string; label: string; x: number; y: number; tone?: "ok" | "warn" | "danger" };
export type TopologyEdge = { from: string; to: string };

export function TopologyGraph({
  nodes,
  edges,
  label,
  width = 480,
  height = 240,
  onSelect,
  selectedId,
}: {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  label: string;
  width?: number;
  height?: number;
  onSelect?: (id: string) => void;
  selectedId?: string;
}) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const tone = { ok: "stroke-ok", warn: "stroke-warn", danger: "stroke-danger" } as const;
  return (
    <svg role="group" aria-label={label} viewBox={`0 0 ${width} ${height}`} className="h-auto w-full max-w-2xl rounded-lg border border-line bg-surface">
      {edges.map((e) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        return <line key={`${e.from}-${e.to}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="stroke-line" strokeWidth={1.5} />;
      })}
      {nodes.map((n) => (
        <g
          key={n.id}
          role="button"
          tabIndex={0}
          aria-label={n.label}
          aria-pressed={selectedId === n.id}
          onClick={() => onSelect?.(n.id)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              onSelect?.(n.id);
            }
          }}
          className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-primary"
        >
          <rect
            x={n.x - 40}
            y={n.y - 14}
            width={80}
            height={28}
            rx={3}
            strokeWidth={selectedId === n.id ? 2 : 1.5}
            className={cn("fill-muted-bg", n.tone ? tone[n.tone] : "stroke-line")}
          />
          <text x={n.x} y={n.y + 4} textAnchor="middle" className="fill-fg font-mono text-[11px]">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── Code editor: textarea over a highlighted layer (JSON / YAML / shell-ish) ── */
const rules: Record<string, [RegExp, string][]> = {
  json: [
    [/"(?:[^"\\]|\\.)*"(?=\s*:)/y, "text-primary"],
    [/"(?:[^"\\]|\\.)*"/y, "text-ok"],
    [/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/y, "text-warn"],
    [/\b(?:true|false|null)\b/y, "text-danger"],
  ],
  yaml: [
    [/#.*/y, "text-muted"],
    [/[\w.-]+(?=\s*:)/y, "text-primary"],
    [/"(?:[^"\\]|\\.)*"|'[^']*'/y, "text-ok"],
    [/-?\d+(?:\.\d+)?\b/y, "text-warn"],
    [/\b(?:true|false|null)\b/y, "text-danger"],
  ],
};

export function highlight(code: string, language: keyof typeof rules): { text: string; cls?: string }[] {
  const out: { text: string; cls?: string }[] = [];
  let plain = "";
  let i = 0;
  while (i < code.length) {
    let hit: { text: string; cls: string } | undefined;
    for (const [re, cls] of rules[language] ?? []) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m[0].length > 0) {
        hit = { text: m[0], cls };
        break;
      }
    }
    if (hit) {
      if (plain) out.push({ text: plain });
      plain = "";
      out.push(hit);
      i += hit.text.length;
    } else {
      plain += code.charAt(i++);
    }
  }
  if (plain) out.push({ text: plain });
  return out;
}

export function CodeEditor({
  value,
  onChange,
  language = "json",
  label,
  rows = 10,
}: {
  value: string;
  onChange: (value: string) => void;
  language?: keyof typeof rules;
  label: string;
  rows?: number;
}) {
  const layer = "m-0 whitespace-pre-wrap break-words p-3 font-mono text-sm leading-5";
  const height = { minHeight: `${rows * 1.25}rem` };
  return (
    <div className="relative rounded-md border border-line bg-surface focus-within:border-primary">
      <pre aria-hidden className={cn(layer, "pointer-events-none")} style={height}>
        {highlight(value, language).map((t, i) => (
          <span key={i} className={t.cls}>
            {t.text}
          </span>
        ))}
        {"\n"}
      </pre>
      <textarea
        aria-label={label}
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(layer, "absolute inset-0 size-full resize-none border-0 bg-transparent text-transparent caret-fg outline-none")}
      />
    </div>
  );
}
