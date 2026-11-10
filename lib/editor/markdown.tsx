import * as React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { cn } from "../cn";
import { useLaf } from "../i18n";
import { markdownSchema, safeUrl } from "./sanitize";
import { remarkReferences, remarkTaskIndex, type MarkdownRef, type ResolveLink } from "./mentions";

export interface MarkdownProps {
  children: string;
  className?: string;
  /** Resolves `@user` / `#KEY-1` to a URL; unresolved references render as plain chips. */
  resolveLink?: ResolveLink;
  /** Wrap a reference element, e.g. in a HoverCard. */
  renderReference?: (ref: MarkdownRef, element: React.ReactElement) => React.ReactNode;
  /** Makes task-list checkboxes interactive; `index` counts task items in document order. */
  onTaskToggle?: (index: number, checked: boolean) => void;
  /** Heading anchors (`#slug`); default true. */
  headingAnchors?: boolean;
}

const slug = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");

const textOf = (node: React.ReactNode): string =>
  typeof node === "string" || typeof node === "number"
    ? String(node)
    : Array.isArray(node)
      ? node.map(textOf).join("")
      : React.isValidElement<{ children?: React.ReactNode }>(node)
        ? textOf(node.props.children)
        : "";

const TOKEN = /(\/\/[^\n]*|#[^\n]*|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|\b-?\d+(?:\.\d+)?\b|\b(?:true|false|null|const|let|var|function|return|if|else|for|while|import|export|from|class|new|async|await|def|fi|then|do|done|echo)\b)/g;

/** Small dependency-free tokenizer: comments, strings, numbers, keywords. */
function highlightCode(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let at = 0;
  let k = 0;
  for (const m of code.matchAll(TOKEN)) {
    const tok = m[0];
    if (m.index > at) out.push(code.slice(at, m.index));
    const cls = /^(\/\/|#)/.test(tok) ? "text-subtle" : /^["']/.test(tok) ? "text-ok" : /^-?\d/.test(tok) ? "text-warn" : "text-primary";
    out.push(<span key={k++} className={cls}>{tok}</span>);
    at = m.index + tok.length;
  }
  if (at < code.length) out.push(code.slice(at));
  return out;
}

function CodeBlock({ language, code }: { language?: string; code: string }) {
  const { t } = useLaf();
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const copy = () => {
    void navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div className="my-3 overflow-hidden rounded-md border border-line bg-muted-bg">
      <div className="flex items-center justify-between border-b border-line px-3 py-1 text-xs text-muted">
        <span>{language ?? ""}</span>
        <button type="button" onClick={copy} className="rounded-sm px-1.5 py-0.5 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-primary">
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto p-3 font-mono text-sm leading-5">
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}

const TaskContext = React.createContext<{ index: number; label: string } | undefined>(undefined);

function heading(Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", cls: string, anchors: boolean, label: string): React.FC<React.ComponentProps<"h1">> {
  return function Heading({ children, node: _node, ...rest }: React.ComponentProps<"h1"> & { node?: unknown }) {
    const id = slug(textOf(children));
    return (
      <Tag {...rest} id={id || undefined} className={cn("group mb-2 mt-5 font-semibold text-fg", cls)}>
        {children}
        {anchors && id && (
          <a href={`#${id}`} aria-label={label} className="ms-1.5 text-subtle no-underline opacity-0 focus-visible:opacity-100 group-hover:opacity-100">
            #
          </a>
        )}
      </Tag>
    );
  };
}

/** Sanitised Markdown renderer (ADR-5): React elements only, never raw HTML. */
export function Markdown({ children, className, resolveLink, renderReference, onTaskToggle, headingAnchors = true }: MarkdownProps) {
  const { t } = useLaf();
  const resolveRef = React.useRef(resolveLink);
  resolveRef.current = resolveLink;
  const toggleRef = React.useRef(onTaskToggle);
  toggleRef.current = onTaskToggle;
  const wrapRef = React.useRef(renderReference);
  wrapRef.current = renderReference;

  const components = React.useMemo<Components>(() => {
    const h = (tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", cls: string) => heading(tag, cls, headingAnchors, t.editorLink);
    return {
      h1: h("h1", "text-2xl"),
      h2: h("h2", "text-xl border-b border-line pb-1"),
      h3: h("h3", "text-lg"),
      h4: h("h4", "text-base"),
      h5: h("h5", "text-sm"),
      h6: h("h6", "text-sm text-muted"),
      p: ({ node: _n, ...p }) => <p {...p} className="my-2 leading-6" />,
      ul: ({ node: _n, className: c, ...p }) => <ul {...p} className={cn("my-2 ps-6", c?.includes("contains-task-list") ? "list-none ps-1" : "list-disc")} />,
      ol: ({ node: _n, ...p }) => <ol {...p} className="my-2 list-decimal ps-6" />,
      li: ({ node: _n, ...p }) => {
        const idx = (p as Record<string, unknown>)["data-laf-task"];
        const { ["data-laf-task" as string]: _t, ...rest } = p as Record<string, unknown>;
        return (
          <TaskContext.Provider value={idx === undefined ? undefined : { index: Number(idx), label: textOf(p.children).trim() }}>
            <li {...(rest as React.ComponentProps<"li">)} className={cn("my-0.5", idx !== undefined && "flex items-start gap-2")} />
          </TaskContext.Provider>
        );
      },
      input: function TaskInput({ node: _n, checked }) {
        const task = React.useContext(TaskContext);
        const idx = task?.index;
        const interactive = !!toggleRef.current && idx !== undefined;
        return (
          <input
            type="checkbox"
            aria-label={task?.label || t.editorTaskList}
            checked={!!checked}
            disabled={!interactive}
            readOnly={!interactive}
            onChange={(e) => idx !== undefined && toggleRef.current?.(idx, e.target.checked)}
            className="mt-1.5 accent-primary"
          />
        );
      },
      blockquote: ({ node: _n, ...p }) => <blockquote {...p} className="my-3 border-s-4 border-line-strong ps-3 text-muted" />,
      hr: () => <hr className="my-4 border-line" />,
      table: ({ node: _n, ...p }) => (
        <div className="my-3 overflow-x-auto">
          <table {...p} className="w-full border-collapse text-sm" />
        </div>
      ),
      th: ({ node: _n, ...p }) => <th {...p} className="border border-line bg-muted-bg px-2 py-1 text-start font-semibold" />,
      td: ({ node: _n, ...p }) => <td {...p} className="border border-line px-2 py-1" />,
      img: ({ node: _n, src, alt, title }) => (
        <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} title={title} loading="lazy" decoding="async" className="my-2 h-auto max-w-full" />
      ),
      pre: ({ node: _n, children: kids }) => {
        const code = React.Children.toArray(kids)[0];
        const props = React.isValidElement<{ className?: string; children?: React.ReactNode }>(code) ? code.props : {};
        const language = /language-([\w+#.-]+)/.exec(props.className ?? "")?.[1];
        return <CodeBlock language={language} code={textOf(props.children).replace(/\n$/, "")} />;
      },
      code: ({ node: _n, className: c, children: kids }) => (
        <code className={cn(c, "rounded-sm bg-muted-bg px-1 py-0.5 font-mono text-[0.9em]")}>{kids}</code>
      ),
      a: ({ node: _n, href, children: kids, ...p }) => {
        const props = p as Record<string, unknown>;
        const kind = props["data-laf-kind"] as MarkdownRef["kind"] | undefined;
        const internal = href && /^(mention|issue):/.exec(href);
        if (internal || kind) {
          const ref: MarkdownRef = { kind: (internal ? (internal[1] as MarkdownRef["kind"]) : kind)!, id: href ? href.slice(href.indexOf(":") + 1) : String(props["data-laf-ref"] ?? "") };
          const target = resolveRef.current?.(ref);
          const chip = "rounded-sm bg-primary-light px-1 font-medium text-primary";
          const el = target ? (
            <a href={safeUrl(target, ["http", "https", "mailto"])} className={cn(chip, "no-underline hover:underline")} data-kind={ref.kind}>
              {kids}
            </a>
          ) : (
            <span className={chip} data-kind={ref.kind}>
              {kids}
            </span>
          );
          return <>{wrapRef.current ? wrapRef.current(ref, el) : el}</>;
        }
        const external = !!href && /^(https?:)?\/\//i.test(href);
        return (
          <a
            href={href}
            title={typeof props.title === "string" ? props.title : undefined}
            className="text-primary underline"
            {...(external ? { target: "_blank" } : {})}
            rel="noopener noreferrer nofollow ugc"
          >
            {kids}
          </a>
        );
      },
    };
  }, [headingAnchors, t.editorLink]);

  return (
    <div className={cn("text-sm text-fg [overflow-wrap:anywhere]", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkReferences, remarkTaskIndex]}
        rehypePlugins={[[rehypeSanitize, markdownSchema]]}
        urlTransform={(url, key) => safeUrl(url, key === "src" ? ["http", "https"] : undefined)}
        components={components}
        skipHtml
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
