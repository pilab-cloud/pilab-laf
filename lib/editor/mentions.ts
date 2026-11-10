import type { Completion, CompletionContext, CompletionResult, CompletionSource } from "@codemirror/autocomplete";

export interface MentionItem {
  id: string;
  label: string;
  avatar?: string;
}
export interface ReferenceItem {
  id: string;
  key: string;
  title: string;
  status?: string;
}
export type MentionSource = (query: string) => Promise<MentionItem[]> | MentionItem[];
export type ReferenceSource = (query: string) => Promise<ReferenceItem[]> | ReferenceItem[];

export interface MarkdownRef {
  kind: "mention" | "issue";
  /** User id / handle, or issue key (`PIL-12`, `123`). */
  id: string;
}
/** Maps a reference to a URL; return `undefined` to render it as a plain chip. */
export type ResolveLink = (ref: MarkdownRef) => string | undefined;

const MENTION = /(^|[\s(])@([A-Za-z0-9][A-Za-z0-9_.-]*)/g;
const ISSUE = /(^|[\s(])#([A-Z][A-Z0-9]*-\d+|\d+)\b/g;

interface Node {
  type: string;
  value?: string;
  url?: string;
  children?: Node[];
  data?: Record<string, unknown>;
}

function splitText(value: string): Node[] | null {
  const hits: { start: number; end: number; kind: MarkdownRef["kind"]; id: string }[] = [];
  for (const [re, kind] of [[MENTION, "mention"], [ISSUE, "issue"]] as const) {
    re.lastIndex = 0;
    for (let m = re.exec(value); m; m = re.exec(value)) {
      const start = m.index + m[1]!.length;
      hits.push({ start, end: m.index + m[0].length, kind, id: m[2]! });
    }
  }
  if (!hits.length) return null;
  hits.sort((a, b) => a.start - b.start);
  const out: Node[] = [];
  let at = 0;
  for (const h of hits) {
    if (h.start < at) continue;
    if (h.start > at) out.push({ type: "text", value: value.slice(at, h.start) });
    const text = value.slice(h.start, h.end);
    out.push({
      type: "link",
      url: `${h.kind}:${h.id}`,
      children: [{ type: "text", value: text }],
      data: { hProperties: { dataLafKind: h.kind, dataLafRef: h.id } },
    });
    at = h.end;
  }
  if (at < value.length) out.push({ type: "text", value: value.slice(at) });
  return out;
}

function walk(node: Node) {
  if (!node.children || node.type === "link" || node.type === "linkReference" || node.type === "inlineCode" || node.type === "code") return;
  const next: Node[] = [];
  for (const child of node.children) {
    if (child.type === "text" && child.value) {
      const parts = splitText(child.value);
      if (parts) next.push(...parts);
      else next.push(child);
    } else {
      walk(child);
      next.push(child);
    }
  }
  node.children = next;
}

/** Remark plugin: turns `@user` and `#KEY-1` / `#123` in prose into `mention:` / `issue:` links. */
export function remarkReferences() {
  return (tree: Node) => walk(tree);
}

/** Numbers GFM task-list items in document order so `onTaskToggle(index)` can address them. */
export function remarkTaskIndex() {
  return (tree: Node) => {
    let n = 0;
    const visit = (node: Node) => {
      if (node.type === "listItem" && (node as { checked?: boolean | null }).checked != null) {
        node.data = { ...node.data, hProperties: { ...(node.data?.hProperties as object), dataLafTask: n++ } };
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

const MENTION_RE = /(?:^|[\s(])@([A-Za-z0-9_.-]*)$/;

/** CodeMirror completion sources for `@` (mentions) and `#` (references). */
export function createMentionCompletion(get: () => { mentions?: MentionSource; references?: ReferenceSource }): CompletionSource {
  return async (ctx: CompletionContext): Promise<CompletionResult | null> => {
    const line = ctx.state.doc.lineAt(ctx.pos);
    const before = line.text.slice(0, ctx.pos - line.from);
    const { mentions, references } = get();

    const at = mentions ? MENTION_RE.exec(before) : null;
    if (at && mentions) {
      const query = at[1]!;
      const items = await mentions(query);
      if (ctx.aborted) return null;
      const from = ctx.pos - query.length - 1;
      const options: Completion[] = items.map((i) => ({
        label: `@${i.label}`,
        detail: i.id === i.label ? undefined : i.id,
        type: "text",
        apply: `[@${i.label}](mention:${i.id})`,
      }));
      return { from, options, filter: false };
    }

    // `#` at the start of a line is a heading, not a reference.
    const hash = references ? /(?:\s)#([A-Za-z0-9-]*)$/.exec(before) : null;
    if (hash && references) {
      const query = hash[1]!;
      const items = await references(query);
      if (ctx.aborted) return null;
      const from = ctx.pos - query.length - 1;
      const options: Completion[] = items.map((i) => ({
        label: `#${i.key}`,
        detail: i.title,
        info: i.status,
        type: "text",
        apply: `[#${i.key}](issue:${i.key})`,
      }));
      return { from, options, filter: false };
    }
    return null;
  };
}
