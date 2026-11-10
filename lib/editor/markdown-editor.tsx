import * as React from "react";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown as markdownLang } from "@codemirror/lang-markdown";
import { Prec, type Extension } from "@codemirror/state";
import { EditorView, drawSelection, keymap, placeholder as cmPlaceholder } from "@codemirror/view";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { useLaf } from "../i18n";
import { CmHost } from "./cm";
import { tabKeymap } from "./code-editor";
import { Markdown, type MarkdownProps } from "./markdown";
import { createMentionCompletion, type MentionSource, type ReferenceSource } from "./mentions";

export interface MarkdownEditorLabels {
  write: string;
  preview: string;
  toolbar: string;
  bold: string;
  italic: string;
  code: string;
  link: string;
  list: string;
  taskList: string;
  quote: string;
  uploading: string;
  nothingToPreview: string;
  suggestions: string;
  editor: string;
}

export interface MarkdownEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Ctrl/⌘+Enter. */
  onSubmit?: (value: string) => void;
  /** Pasted / dropped files; resolve to the URL to embed as `![name](url)`. `report` updates the placeholder's progress (0–100). */
  onUpload?: (file: File, report: (percent: number) => void) => Promise<string>;
  /** Which dropped/pasted files go to `onUpload`; default images only. */
  uploadAccept?: (file: File) => boolean;
  mentions?: MentionSource;
  references?: ReferenceSource;
  resolveLink?: MarkdownProps["resolveLink"];
  renderReference?: MarkdownProps["renderReference"];
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  /** Show Write and Preview side by side from 1024 px up; default true. */
  split?: boolean;
  labels?: Partial<MarkdownEditorLabels>;
  className?: string;
}

type Action = "bold" | "italic" | "code" | "link" | "list" | "taskList" | "quote";

function wrap(view: EditorView, before: string, after: string, fallback: string) {
  const sel = view.state.selection.main;
  const text = sel.empty ? fallback : view.state.sliceDoc(sel.from, sel.to);
  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert: before + text + after },
    selection: { anchor: sel.from + before.length, head: sel.from + before.length + text.length },
  });
  view.focus();
}

function prefixLines(view: EditorView, prefix: string) {
  const { from, to } = view.state.selection.main;
  const first = view.state.doc.lineAt(from);
  const last = view.state.doc.lineAt(to);
  const changes = [];
  for (let n = first.number; n <= last.number; n++) {
    const line = view.state.doc.line(n);
    if (!line.text.startsWith(prefix)) changes.push({ from: line.from, insert: prefix });
  }
  view.dispatch({ changes });
  view.focus();
}

function run(view: EditorView, action: Action) {
  switch (action) {
    case "bold":
      return wrap(view, "**", "**", "bold");
    case "italic":
      return wrap(view, "_", "_", "italic");
    case "code": {
      const multi = view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to).includes("\n");
      return multi ? wrap(view, "```\n", "\n```", "") : wrap(view, "`", "`", "code");
    }
    case "link": {
      const sel = view.state.selection.main;
      const text = sel.empty ? "text" : view.state.sliceDoc(sel.from, sel.to);
      const url = "https://";
      view.dispatch({
        changes: { from: sel.from, to: sel.to, insert: `[${text}](${url})` },
        selection: { anchor: sel.from + text.length + 3, head: sel.from + text.length + 3 + url.length },
      });
      return view.focus();
    }
    case "list":
      return prefixLines(view, "- ");
    case "taskList":
      return prefixLines(view, "- [ ] ");
    case "quote":
      return prefixLines(view, "> ");
  }
}

const TOOLS: { action: Action; key: keyof MarkdownEditorLabels; glyph: React.ReactNode; hint?: string }[] = [
  { action: "bold", key: "bold", glyph: <strong>B</strong>, hint: "Mod-b" },
  { action: "italic", key: "italic", glyph: <em>I</em>, hint: "Mod-i" },
  { action: "code", key: "code", glyph: <span className="font-mono">{"</>"}</span> },
  { action: "link", key: "link", glyph: <span aria-hidden>🔗︎</span>, hint: "Mod-k" },
  { action: "list", key: "list", glyph: <span>•≡</span> },
  { action: "taskList", key: "taskList", glyph: <span>☑</span> },
  { action: "quote", key: "quote", glyph: <span>❝</span> },
];

let uploadSeq = 0;

/** Markdown editor on CodeMirror 6: toolbar, Write/Preview, mentions/references, paste & drop uploads. */
export function MarkdownEditor({
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  onUpload,
  uploadAccept = (f) => f.type.startsWith("image/"),
  mentions,
  references,
  resolveLink,
  renderReference,
  placeholder,
  rows = 8,
  readOnly,
  split = true,
  labels,
  className,
}: MarkdownEditorProps) {
  const { t } = useLaf();
  const L: MarkdownEditorLabels = {
    write: t.editorWrite,
    preview: t.editorPreview,
    toolbar: t.editorToolbar,
    bold: t.editorBold,
    italic: t.editorItalic,
    code: t.editorCode,
    link: t.editorLink,
    list: t.editorList,
    taskList: t.editorTaskList,
    quote: t.editorQuote,
    uploading: t.editorUploading,
    nothingToPreview: t.editorNothingToPreview,
    suggestions: t.editorMentions,
    editor: t.editorMarkdownEditor,
    ...labels,
  };
  const [text, setText] = useControllableState({ value, defaultValue, onChange });
  const [tab, setTab] = React.useState<"write" | "preview">("write");
  const view = React.useRef<EditorView | null>(null);
  const textRef = React.useRef(text);
  textRef.current = text;

  const live = React.useRef({ onSubmit, onUpload, uploadAccept, mentions, references, uploading: L.uploading, setText });
  live.current = { onSubmit, onUpload, uploadAccept, mentions, references, uploading: L.uploading, setText };

  const upload = React.useCallback((files: File[], at?: number) => {
    const v = view.current;
    const { onUpload: up, uploadAccept: ok, uploading } = live.current;
    if (!v || !up) return false;
    const accepted = files.filter(ok);
    if (!accepted.length) return false;
    let pos = at ?? v.state.selection.main.head;
    for (const file of accepted) {
      const id = ++uploadSeq;
      const marker = (pct?: number) => `![${uploading}${pct == null ? "…" : ` ${pct}%`} ${file.name}](upload:${id})`;
      let current = marker();
      v.dispatch({ changes: { from: pos, insert: current + "\n" } });
      pos += current.length + 1;
      const replace = (next: string) => {
        const doc = v.state.doc.toString();
        const i = doc.indexOf(current);
        if (i < 0) return;
        v.dispatch({ changes: { from: i, to: i + current.length + (next ? 0 : 1), insert: next } });
        current = next;
      };
      up(file, (p) => replace(marker(Math.round(p))))
        .then((url) => replace(`![${file.name}](${url})`))
        .catch(() => replace(""));
    }
    return true;
  }, []);

  const extensions = React.useMemo<Extension[]>(() => {
    const complete = createMentionCompletion(() => ({ mentions: live.current.mentions, references: live.current.references }));
    return [
      history(),
      drawSelection(),
      closeBrackets(),
      EditorView.lineWrapping,
      markdownLang(),
      autocompletion({ override: [complete], icons: false }),
      tabKeymap(),
      Prec.highest(
        keymap.of([
          { key: "Mod-Enter", run: (v) => (live.current.onSubmit?.(v.state.doc.toString()), true) },
          { key: "Mod-b", run: (v) => (run(v, "bold"), true) },
          { key: "Mod-i", run: (v) => (run(v, "italic"), true) },
          { key: "Mod-k", run: (v) => (run(v, "link"), true) },
        ]),
      ),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.domEventHandlers({
        paste(e) {
          const files = Array.from(e.clipboardData?.files ?? []);
          if (files.length && upload(files)) {
            e.preventDefault();
            return true;
          }
          return false;
        },
        drop(e, v) {
          const files = Array.from(e.dataTransfer?.files ?? []);
          if (files.length && upload(files, v.posAtCoords({ x: e.clientX, y: e.clientY }) ?? undefined)) {
            e.preventDefault();
            return true;
          }
          return false;
        },
      }),
      ...(placeholder ? [cmPlaceholder(placeholder)] : []),
    ];
  }, [placeholder, upload]);

  const onReady = React.useCallback((v: EditorView | null) => {
    view.current = v;
  }, []);

  const id = React.useId();
  const tabId = (n: string) => `${id}-${n}`;
  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const next = tab === "write" ? "preview" : "write";
      setTab(next);
      document.getElementById(tabId(next))?.focus();
    }
  };

  return (
    <div className={cn("rounded-md border border-line bg-surface focus-within:border-primary", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-2 py-1">
        <div role="tablist" aria-label={L.editor} className={cn("flex gap-1", split && "lg:invisible")} onKeyDown={onTabKey}>
          {(["write", "preview"] as const).map((n) => (
            <button
              key={n}
              id={tabId(n)}
              type="button"
              role="tab"
              aria-selected={tab === n}
              aria-controls={tabId(`${n}-panel`)}
              tabIndex={tab === n ? 0 : -1}
              onClick={() => setTab(n)}
              className={cn("rounded-sm px-2 py-1 text-sm focus-visible:outline-2 focus-visible:outline-primary", tab === n ? "bg-primary-light font-medium text-primary" : "text-muted hover:bg-surface-hover")}
            >
              {L[n]}
            </button>
          ))}
        </div>
        {!readOnly && (
          <div role="toolbar" aria-label={L.toolbar} className={cn("flex gap-0.5", tab === "preview" && "invisible lg:visible")}>
            {TOOLS.map((tool) => (
              <button
                key={tool.action}
                type="button"
                aria-label={L[tool.key]}
                title={L[tool.key]}
                tabIndex={tab === "preview" ? -1 : 0}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => view.current && run(view.current, tool.action)}
                className="inline-flex size-7 items-center justify-center rounded-sm text-sm text-muted hover:bg-surface-hover hover:text-fg focus-visible:outline-2 focus-visible:outline-primary"
              >
                {tool.glyph}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={cn(split && "lg:grid lg:grid-cols-2 lg:divide-x lg:divide-line rtl:lg:divide-x-reverse")}>
        <div id={tabId("write-panel")} role="tabpanel" aria-labelledby={tabId("write")} className={cn(tab === "write" ? "block" : split ? "hidden lg:block" : "hidden", "min-w-0")}>
          <CmHost value={text} onChange={setText} extensions={extensions} readOnly={readOnly} label={L.editor} minHeight={`${rows * 1.25 + 1}rem`} onReady={onReady} />
        </div>
        <div id={tabId("preview-panel")} role="tabpanel" aria-labelledby={tabId("preview")} className={cn("min-w-0 p-3", tab === "preview" ? "block" : split ? "hidden lg:block" : "hidden")}>
          {text.trim() ? (
            <Markdown resolveLink={resolveLink} renderReference={renderReference}>
              {text}
            </Markdown>
          ) : (
            <p className="m-0 text-sm text-subtle">{L.nothingToPreview}</p>
          )}
        </div>
      </div>
    </div>
  );
}
