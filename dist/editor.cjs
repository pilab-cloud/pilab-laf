'use strict';

var chunkYGX6XE22_cjs = require('./chunk-YGX6XE22.cjs');
var chunkE6JUACLJ_cjs = require('./chunk-E6JUACLJ.cjs');
var chunkFTHFEMX6_cjs = require('./chunk-FTHFEMX6.cjs');
var React3 = require('react');
var commands = require('@codemirror/commands');
var langJson = require('@codemirror/lang-json');
var langYaml = require('@codemirror/lang-yaml');
var language = require('@codemirror/language');
var state = require('@codemirror/state');
var view = require('@codemirror/view');
var jsxRuntime = require('react/jsx-runtime');
var ReactMarkdown = require('react-markdown');
var remarkGfm = require('remark-gfm');
var rehypeSanitize = require('rehype-sanitize');
var autocomplete = require('@codemirror/autocomplete');
var langMarkdown = require('@codemirror/lang-markdown');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

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

var React3__namespace = /*#__PURE__*/_interopNamespace(React3);
var ReactMarkdown__default = /*#__PURE__*/_interopDefault(ReactMarkdown);
var remarkGfm__default = /*#__PURE__*/_interopDefault(remarkGfm);
var rehypeSanitize__default = /*#__PURE__*/_interopDefault(rehypeSanitize);

var lafTheme = view.EditorView.theme({
  "&": { color: "var(--text)", backgroundColor: "var(--bg-input)", fontSize: "0.875rem" },
  "&.cm-focused": { outline: "none" },
  ".cm-content": { fontFamily: "var(--font-mono, ui-monospace, monospace)", caretColor: "var(--text)", padding: "0.5rem 0" },
  ".cm-scroller": { fontFamily: "inherit", lineHeight: "1.25rem" },
  ".cm-cursor": { borderInlineStartColor: "var(--text)" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": { backgroundColor: "var(--primary-light)" },
  ".cm-gutters": { backgroundColor: "var(--bg-muted)", color: "var(--text-subtle)", border: "none", borderInlineEnd: "1px solid var(--border)" },
  ".cm-activeLine": { backgroundColor: "transparent" },
  ".cm-activeLineGutter": { backgroundColor: "var(--bg-card-hover)" },
  ".cm-tooltip": { backgroundColor: "var(--bg-menu)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "4px" },
  ".cm-tooltip-autocomplete ul li[aria-selected]": { backgroundColor: "var(--primary-light)", color: "var(--text)" },
  ".cm-placeholder": { color: "var(--text-subtle)" }
});
var build = (ro, label, exts) => [
  state.EditorState.readOnly.of(!!ro),
  view.EditorView.editable.of(!ro),
  view.EditorView.contentAttributes.of({ "aria-label": label, ...ro ? { "aria-readonly": "true" } : {} }),
  ...exts
];
function CmHost({ value, onChange, extensions, readOnly, label, minHeight, className, onReady }) {
  const host = React3__namespace.useRef(null);
  const viewRef = React3__namespace.useRef(null);
  const onChangeRef = React3__namespace.useRef(onChange);
  onChangeRef.current = onChange;
  const onReadyRef = React3__namespace.useRef(onReady);
  onReadyRef.current = onReady;
  const dynamic = React3__namespace.useRef(new state.Compartment());
  const initial = React3__namespace.useRef({ value, extensions, readOnly, label, minHeight });
  React3__namespace.useEffect(() => {
    const init = initial.current;
    const view$1 = new view.EditorView({
      parent: host.current,
      state: state.EditorState.create({
        doc: init.value,
        extensions: [
          lafTheme,
          view.EditorView.theme({ "&": { minHeight: init.minHeight } }),
          view.EditorView.updateListener.of((u) => {
            if (u.docChanged) onChangeRef.current?.(u.state.doc.toString());
          }),
          dynamic.current.of(build(init.readOnly, init.label, init.extensions))
        ]
      })
    });
    viewRef.current = view$1;
    onReadyRef.current?.(view$1);
    return () => {
      onReadyRef.current?.(null);
      view$1.destroy();
      viewRef.current = null;
    };
  }, []);
  React3__namespace.useEffect(() => {
    viewRef.current?.dispatch({ effects: dynamic.current.reconfigure(build(readOnly, label, extensions)) });
  }, [extensions, readOnly, label]);
  React3__namespace.useEffect(() => {
    const view = viewRef.current;
    if (view && view.state.doc.toString() !== value) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
    }
  }, [value]);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ref: host, className });
}
var setDiagnostics = state.StateEffect.define();
var diagnosticField = state.StateField.define({
  create: () => [],
  update: (v, tr) => {
    for (const e of tr.effects) if (e.is(setDiagnostics)) return e.value;
    return v;
  }
});
var ErrorMarker = class extends view.GutterMarker {
  constructor(message) {
    super();
    this.message = message;
  }
  message;
  eq(o) {
    return o.message === this.message;
  }
  toDOM() {
    const el = document.createElement("span");
    el.textContent = "\u25CF";
    el.title = this.message;
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", this.message);
    el.style.color = "var(--error)";
    return el;
  }
};
var errorLines = view.EditorView.decorations.compute([diagnosticField], (state) => {
  const ranges = state.field(diagnosticField).flatMap((d) => {
    if (d.line < 1 || d.line > state.doc.lines) return [];
    return [view.Decoration.line({ attributes: { style: "background-color: var(--error-bg)" } }).range(state.doc.line(d.line).from)];
  });
  return view.Decoration.set(ranges, true);
});
var errorGutter = view.gutter({
  class: "cm-laf-errors",
  lineMarker(view, line) {
    const n = view.state.doc.lineAt(line.from).number;
    const d = view.state.field(diagnosticField).find((x) => x.line === n);
    return d ? new ErrorMarker(d.message) : null;
  },
  lineMarkerChange: (u) => u.transactions.some((t) => t.effects.some((e) => e.is(setDiagnostics))),
  initialSpacer: () => new ErrorMarker("")
});
function jsonDiagnostics(text) {
  if (!text.trim()) return [];
  try {
    JSON.parse(text);
    return [];
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const pos = /position (\d+)/.exec(message)?.[1];
    const line = pos ? text.slice(0, Number(pos)).split("\n").length : Number(/line (\d+)/.exec(message)?.[1] ?? 1);
    return [{ line, message }];
  }
}
function tabKeymap() {
  let escaped = false;
  const leave = () => {
    if (!escaped) return false;
    escaped = false;
    return true;
  };
  return [
    view.EditorView.domEventHandlers({ blur: () => void (escaped = false) }),
    view.keymap.of([
      {
        key: "Escape",
        run: () => {
          escaped = true;
          return false;
        }
      },
      { key: "Tab", run: (v) => leave() ? false : commands.indentMore(v), shift: (v) => leave() ? false : commands.indentLess(v) }
    ])
  ];
}
var languages = { json: () => langJson.json(), yaml: () => langYaml.yaml(), text: () => [] };
function CodeEditor({ value, onChange, language: language$1 = "json", label, rows = 10, readOnly, diagnostics, className }) {
  const { t } = chunkE6JUACLJ_cjs.useLaf();
  const view$1 = React3__namespace.useRef(null);
  const diagRef = React3__namespace.useRef(diagnostics);
  diagRef.current = diagnostics;
  const extensions = React3__namespace.useMemo(
    () => [
      view.lineNumbers(),
      diagnosticField,
      errorGutter,
      errorLines,
      commands.history(),
      view.drawSelection(),
      language.indentOnInput(),
      language.bracketMatching(),
      view.highlightActiveLine(),
      language.syntaxHighlighting(language.defaultHighlightStyle, { fallback: true }),
      tabKeymap(),
      view.keymap.of([...commands.defaultKeymap, ...commands.historyKeymap]),
      languages[language$1]()
    ],
    [language$1]
  );
  const onReady = React3__namespace.useCallback((v) => {
    view$1.current = v;
    v?.dispatch({ effects: setDiagnostics.of(diagRef.current ?? []) });
  }, []);
  React3__namespace.useEffect(() => {
    view$1.current?.dispatch({ effects: setDiagnostics.of(diagnostics ?? []) });
  }, [diagnostics, extensions]);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("overflow-hidden rounded-md border border-line bg-input focus-within:border-primary", className), "data-language": language$1, children: /* @__PURE__ */ jsxRuntime.jsx(CmHost, { value, onChange, extensions, readOnly, label: label || t.editorCodeEditor, minHeight: `${rows * 1.25 + 1}rem`, onReady }) });
}
var SAFE_HREF_PROTOCOLS = ["http", "https", "mailto", "mention", "issue"];
var SAFE_SRC_PROTOCOLS = ["http", "https"];
var markdownSchema = {
  ...rehypeSanitize.defaultSchema,
  tagNames: [
    "p",
    "br",
    "hr",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "pre",
    "code",
    "em",
    "strong",
    "del",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "input",
    "span"
  ],
  protocols: { href: SAFE_HREF_PROTOCOLS, src: SAFE_SRC_PROTOCOLS },
  attributes: {
    a: ["href", "title", "dataLafKind", "dataLafRef"],
    span: ["dataLafKind", "dataLafRef"],
    img: ["src", "alt", "title", "width", "height"],
    code: [["className", /^language-[\w+#.-]+$/]],
    li: [["className", "task-list-item"], "dataLafTask"],
    ul: [["className", "contains-task-list"]],
    ol: [["className", "contains-task-list"]],
    input: [["type", "checkbox"], "checked", "disabled"],
    th: [["align", /^(left|right|center)$/]],
    td: [["align", /^(left|right|center)$/]]
  },
  strip: ["script", "style", "iframe", "object", "embed", "svg", "math", "form", "textarea", "select", "button"]
};
function safeUrl(url, allowed = SAFE_HREF_PROTOCOLS) {
  const trimmed = url.trim();
  const compact = trimmed.replace(/[\u0000-\u0020\u007f-\u009f]/g, "");
  const m = /^([a-z][a-z0-9+.-]*):/i.exec(compact);
  if (!m) return compact.startsWith("//") ? "" : trimmed;
  return allowed.includes(m[1].toLowerCase()) ? trimmed : "";
}

// lib/editor/mentions.ts
var MENTION = /(^|[\s(])@([A-Za-z0-9][A-Za-z0-9_.-]*)/g;
var ISSUE = /(^|[\s(])#([A-Z][A-Z0-9]*-\d+|\d+)\b/g;
function splitText(value) {
  const hits = [];
  for (const [re, kind] of [[MENTION, "mention"], [ISSUE, "issue"]]) {
    re.lastIndex = 0;
    for (let m = re.exec(value); m; m = re.exec(value)) {
      const start = m.index + m[1].length;
      hits.push({ start, end: m.index + m[0].length, kind, id: m[2] });
    }
  }
  if (!hits.length) return null;
  hits.sort((a, b) => a.start - b.start);
  const out = [];
  let at = 0;
  for (const h of hits) {
    if (h.start < at) continue;
    if (h.start > at) out.push({ type: "text", value: value.slice(at, h.start) });
    const text = value.slice(h.start, h.end);
    out.push({
      type: "link",
      url: `${h.kind}:${h.id}`,
      children: [{ type: "text", value: text }],
      data: { hProperties: { dataLafKind: h.kind, dataLafRef: h.id } }
    });
    at = h.end;
  }
  if (at < value.length) out.push({ type: "text", value: value.slice(at) });
  return out;
}
function walk(node) {
  if (!node.children || node.type === "link" || node.type === "linkReference" || node.type === "inlineCode" || node.type === "code") return;
  const next = [];
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
function remarkReferences() {
  return (tree) => walk(tree);
}
function remarkTaskIndex() {
  return (tree) => {
    let n = 0;
    const visit = (node) => {
      if (node.type === "listItem" && node.checked != null) {
        node.data = { ...node.data, hProperties: { ...node.data?.hProperties, dataLafTask: n++ } };
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
var MENTION_RE = /(?:^|[\s(])@([A-Za-z0-9_.-]*)$/;
function createMentionCompletion(get) {
  return async (ctx) => {
    const line = ctx.state.doc.lineAt(ctx.pos);
    const before = line.text.slice(0, ctx.pos - line.from);
    const { mentions, references } = get();
    const at = mentions ? MENTION_RE.exec(before) : null;
    if (at && mentions) {
      const query = at[1];
      const items = await mentions(query);
      if (ctx.aborted) return null;
      const from = ctx.pos - query.length - 1;
      const options = items.map((i) => ({
        label: `@${i.label}`,
        detail: i.id === i.label ? void 0 : i.id,
        type: "text",
        apply: `[@${i.label}](mention:${i.id})`
      }));
      return { from, options, filter: false };
    }
    const hash = references ? /(?:\s)#([A-Za-z0-9-]*)$/.exec(before) : null;
    if (hash && references) {
      const query = hash[1];
      const items = await references(query);
      if (ctx.aborted) return null;
      const from = ctx.pos - query.length - 1;
      const options = items.map((i) => ({
        label: `#${i.key}`,
        detail: i.title,
        info: i.status,
        type: "text",
        apply: `[#${i.key}](issue:${i.key})`
      }));
      return { from, options, filter: false };
    }
    return null;
  };
}
var slug = (text) => text.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");
var textOf = (node) => typeof node === "string" || typeof node === "number" ? String(node) : Array.isArray(node) ? node.map(textOf).join("") : React3__namespace.isValidElement(node) ? textOf(node.props.children) : "";
var TOKEN = /(\/\/[^\n]*|#[^\n]*|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|\b-?\d+(?:\.\d+)?\b|\b(?:true|false|null|const|let|var|function|return|if|else|for|while|import|export|from|class|new|async|await|def|fi|then|do|done|echo)\b)/g;
function highlightCode(code) {
  const out = [];
  let at = 0;
  let k = 0;
  for (const m of code.matchAll(TOKEN)) {
    const tok = m[0];
    if (m.index > at) out.push(code.slice(at, m.index));
    const cls = /^(\/\/|#)/.test(tok) ? "text-subtle" : /^["']/.test(tok) ? "text-ok" : /^-?\d/.test(tok) ? "text-warn" : "text-primary";
    out.push(/* @__PURE__ */ jsxRuntime.jsx("span", { className: cls, children: tok }, k++));
    at = m.index + tok.length;
  }
  if (at < code.length) out.push(code.slice(at));
  return out;
}
function CodeBlock({ language, code }) {
  const { t } = chunkE6JUACLJ_cjs.useLaf();
  const [copied, setCopied] = React3__namespace.useState(false);
  const timer = React3__namespace.useRef(void 0);
  React3__namespace.useEffect(() => () => clearTimeout(timer.current), []);
  const copy = () => {
    void navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "my-3 overflow-hidden rounded-md border border-line bg-muted-bg", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between border-b border-line px-3 py-1 text-xs text-muted", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: language ?? "" }),
      /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", onClick: copy, className: "rounded-sm px-1.5 py-0.5 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-primary", children: copied ? t.copied : t.copy })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("pre", { className: "m-0 overflow-x-auto p-3 font-mono text-sm leading-5", children: /* @__PURE__ */ jsxRuntime.jsx("code", { children: highlightCode(code) }) })
  ] });
}
var TaskContext = React3__namespace.createContext(void 0);
function heading(Tag, cls, anchors, label) {
  return function Heading({ children, node: _node, ...rest }) {
    const id = slug(textOf(children));
    return /* @__PURE__ */ jsxRuntime.jsxs(Tag, { ...rest, id: id || void 0, className: chunkFTHFEMX6_cjs.cn("group mb-2 mt-5 font-semibold text-fg", cls), children: [
      children,
      anchors && id && /* @__PURE__ */ jsxRuntime.jsx("a", { href: `#${id}`, "aria-label": label, className: "ms-1.5 text-subtle no-underline opacity-0 focus-visible:opacity-100 group-hover:opacity-100", children: "#" })
    ] });
  };
}
function Markdown({ children, className, resolveLink, renderReference, onTaskToggle, headingAnchors = true }) {
  const { t } = chunkE6JUACLJ_cjs.useLaf();
  const resolveRef = React3__namespace.useRef(resolveLink);
  resolveRef.current = resolveLink;
  const toggleRef = React3__namespace.useRef(onTaskToggle);
  toggleRef.current = onTaskToggle;
  const wrapRef = React3__namespace.useRef(renderReference);
  wrapRef.current = renderReference;
  const components = React3__namespace.useMemo(() => {
    const h = (tag, cls) => heading(tag, cls, headingAnchors, t.editorLink);
    return {
      h1: h("h1", "text-2xl"),
      h2: h("h2", "text-xl border-b border-line pb-1"),
      h3: h("h3", "text-lg"),
      h4: h("h4", "text-base"),
      h5: h("h5", "text-sm"),
      h6: h("h6", "text-sm text-muted"),
      p: ({ node: _n, ...p }) => /* @__PURE__ */ jsxRuntime.jsx("p", { ...p, className: "my-2 leading-6" }),
      ul: ({ node: _n, className: c, ...p }) => /* @__PURE__ */ jsxRuntime.jsx("ul", { ...p, className: chunkFTHFEMX6_cjs.cn("my-2 ps-6", c?.includes("contains-task-list") ? "list-none ps-1" : "list-disc") }),
      ol: ({ node: _n, ...p }) => /* @__PURE__ */ jsxRuntime.jsx("ol", { ...p, className: "my-2 list-decimal ps-6" }),
      li: ({ node: _n, ...p }) => {
        const idx = p["data-laf-task"];
        const { ["data-laf-task"]: _t, ...rest } = p;
        return /* @__PURE__ */ jsxRuntime.jsx(TaskContext.Provider, { value: idx === void 0 ? void 0 : { index: Number(idx), label: textOf(p.children).trim() }, children: /* @__PURE__ */ jsxRuntime.jsx("li", { ...rest, className: chunkFTHFEMX6_cjs.cn("my-0.5", idx !== void 0 && "flex items-start gap-2") }) });
      },
      input: function TaskInput({ node: _n, checked }) {
        const task = React3__namespace.useContext(TaskContext);
        const idx = task?.index;
        const interactive = !!toggleRef.current && idx !== void 0;
        return /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            type: "checkbox",
            "aria-label": task?.label || t.editorTaskList,
            checked: !!checked,
            disabled: !interactive,
            readOnly: !interactive,
            onChange: (e) => idx !== void 0 && toggleRef.current?.(idx, e.target.checked),
            className: "mt-1.5 accent-primary"
          }
        );
      },
      blockquote: ({ node: _n, ...p }) => /* @__PURE__ */ jsxRuntime.jsx("blockquote", { ...p, className: "my-3 border-s-4 border-line-strong ps-3 text-muted" }),
      hr: () => /* @__PURE__ */ jsxRuntime.jsx("hr", { className: "my-4 border-line" }),
      table: ({ node: _n, ...p }) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "my-3 overflow-x-auto", children: /* @__PURE__ */ jsxRuntime.jsx("table", { ...p, className: "w-full border-collapse text-sm" }) }),
      th: ({ node: _n, ...p }) => /* @__PURE__ */ jsxRuntime.jsx("th", { ...p, className: "border border-line bg-muted-bg px-2 py-1 text-start font-semibold" }),
      td: ({ node: _n, ...p }) => /* @__PURE__ */ jsxRuntime.jsx("td", { ...p, className: "border border-line px-2 py-1" }),
      img: ({ node: _n, src, alt, title }) => /* @__PURE__ */ jsxRuntime.jsx("img", { src: typeof src === "string" ? src : void 0, alt: alt ?? "", title, loading: "lazy", decoding: "async", className: "my-2 h-auto max-w-full" }),
      pre: ({ node: _n, children: kids }) => {
        const code = React3__namespace.Children.toArray(kids)[0];
        const props = React3__namespace.isValidElement(code) ? code.props : {};
        const language = /language-([\w+#.-]+)/.exec(props.className ?? "")?.[1];
        return /* @__PURE__ */ jsxRuntime.jsx(CodeBlock, { language, code: textOf(props.children).replace(/\n$/, "") });
      },
      code: ({ node: _n, className: c, children: kids }) => /* @__PURE__ */ jsxRuntime.jsx("code", { className: chunkFTHFEMX6_cjs.cn(c, "rounded-sm bg-muted-bg px-1 py-0.5 font-mono text-[0.9em]"), children: kids }),
      a: ({ node: _n, href, children: kids, ...p }) => {
        const props = p;
        const kind = props["data-laf-kind"];
        const internal = href && /^(mention|issue):/.exec(href);
        if (internal || kind) {
          const ref = { kind: internal ? internal[1] : kind, id: href ? href.slice(href.indexOf(":") + 1) : String(props["data-laf-ref"] ?? "") };
          const target = resolveRef.current?.(ref);
          const chip = "rounded-sm bg-primary-light px-1 font-medium text-primary";
          const el = target ? /* @__PURE__ */ jsxRuntime.jsx("a", { href: safeUrl(target, ["http", "https", "mailto"]), className: chunkFTHFEMX6_cjs.cn(chip, "no-underline hover:underline"), "data-kind": ref.kind, children: kids }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: chip, "data-kind": ref.kind, children: kids });
          return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: wrapRef.current ? wrapRef.current(ref, el) : el });
        }
        const external = !!href && /^(https?:)?\/\//i.test(href);
        return /* @__PURE__ */ jsxRuntime.jsx(
          "a",
          {
            href,
            title: typeof props.title === "string" ? props.title : void 0,
            className: "text-primary underline",
            ...external ? { target: "_blank" } : {},
            rel: "noopener noreferrer nofollow ugc",
            children: kids
          }
        );
      }
    };
  }, [headingAnchors, t.editorLink]);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: chunkFTHFEMX6_cjs.cn("text-sm text-fg [overflow-wrap:anywhere]", className), children: /* @__PURE__ */ jsxRuntime.jsx(
    ReactMarkdown__default.default,
    {
      remarkPlugins: [remarkGfm__default.default, remarkReferences, remarkTaskIndex],
      rehypePlugins: [[rehypeSanitize__default.default, markdownSchema]],
      urlTransform: (url, key) => safeUrl(url, key === "src" ? ["http", "https"] : void 0),
      components,
      skipHtml: true,
      children
    }
  ) });
}
function wrap(view, before, after, fallback) {
  const sel = view.state.selection.main;
  const text = sel.empty ? fallback : view.state.sliceDoc(sel.from, sel.to);
  view.dispatch({
    changes: { from: sel.from, to: sel.to, insert: before + text + after },
    selection: { anchor: sel.from + before.length, head: sel.from + before.length + text.length }
  });
  view.focus();
}
function prefixLines(view, prefix) {
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
function run(view, action) {
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
        selection: { anchor: sel.from + text.length + 3, head: sel.from + text.length + 3 + url.length }
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
var TOOLS = [
  { action: "bold", key: "bold", glyph: /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "B" }), hint: "Mod-b" },
  { action: "italic", key: "italic", glyph: /* @__PURE__ */ jsxRuntime.jsx("em", { children: "I" }), hint: "Mod-i" },
  { action: "code", key: "code", glyph: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-mono", children: "</>" }) },
  { action: "link", key: "link", glyph: /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": true, children: "\u{1F517}\uFE0E" }), hint: "Mod-k" },
  { action: "list", key: "list", glyph: /* @__PURE__ */ jsxRuntime.jsx("span", { children: "\u2022\u2261" }) },
  { action: "taskList", key: "taskList", glyph: /* @__PURE__ */ jsxRuntime.jsx("span", { children: "\u2611" }) },
  { action: "quote", key: "quote", glyph: /* @__PURE__ */ jsxRuntime.jsx("span", { children: "\u275D" }) }
];
var uploadSeq = 0;
function MarkdownEditor({
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
  className
}) {
  const { t } = chunkE6JUACLJ_cjs.useLaf();
  const L = {
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
    ...labels
  };
  const [text, setText] = chunkYGX6XE22_cjs.useControllableState({ value, defaultValue, onChange });
  const [tab, setTab] = React3__namespace.useState("write");
  const view$1 = React3__namespace.useRef(null);
  const textRef = React3__namespace.useRef(text);
  textRef.current = text;
  const live = React3__namespace.useRef({ onSubmit, onUpload, uploadAccept, mentions, references, uploading: L.uploading, setText });
  live.current = { onSubmit, onUpload, uploadAccept, mentions, references, uploading: L.uploading, setText };
  const upload = React3__namespace.useCallback((files, at) => {
    const v = view$1.current;
    const { onUpload: up, uploadAccept: ok, uploading } = live.current;
    if (!v || !up) return false;
    const accepted = files.filter(ok);
    if (!accepted.length) return false;
    let pos = at ?? v.state.selection.main.head;
    for (const file of accepted) {
      const id2 = ++uploadSeq;
      const marker = (pct) => `![${uploading}${pct == null ? "\u2026" : ` ${pct}%`} ${file.name}](upload:${id2})`;
      let current = marker();
      v.dispatch({ changes: { from: pos, insert: current + "\n" } });
      pos += current.length + 1;
      const replace = (next) => {
        const doc = v.state.doc.toString();
        const i = doc.indexOf(current);
        if (i < 0) return;
        v.dispatch({ changes: { from: i, to: i + current.length + (next ? 0 : 1), insert: next } });
        current = next;
      };
      up(file, (p) => replace(marker(Math.round(p)))).then((url) => replace(`![${file.name}](${url})`)).catch(() => replace(""));
    }
    return true;
  }, []);
  const extensions = React3__namespace.useMemo(() => {
    const complete = createMentionCompletion(() => ({ mentions: live.current.mentions, references: live.current.references }));
    return [
      commands.history(),
      view.drawSelection(),
      autocomplete.closeBrackets(),
      view.EditorView.lineWrapping,
      langMarkdown.markdown(),
      autocomplete.autocompletion({ override: [complete], icons: false }),
      tabKeymap(),
      state.Prec.highest(
        view.keymap.of([
          { key: "Mod-Enter", run: (v) => (live.current.onSubmit?.(v.state.doc.toString()), true) },
          { key: "Mod-b", run: (v) => (run(v, "bold"), true) },
          { key: "Mod-i", run: (v) => (run(v, "italic"), true) },
          { key: "Mod-k", run: (v) => (run(v, "link"), true) }
        ])
      ),
      view.keymap.of([...commands.defaultKeymap, ...commands.historyKeymap]),
      view.EditorView.domEventHandlers({
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
          if (files.length && upload(files, v.posAtCoords({ x: e.clientX, y: e.clientY }) ?? void 0)) {
            e.preventDefault();
            return true;
          }
          return false;
        }
      }),
      ...placeholder ? [view.placeholder(placeholder)] : []
    ];
  }, [placeholder, upload]);
  const onReady = React3__namespace.useCallback((v) => {
    view$1.current = v;
  }, []);
  const id = React3__namespace.useId();
  const tabId = (n) => `${id}-${n}`;
  const onTabKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const next = tab === "write" ? "preview" : "write";
      setTab(next);
      document.getElementById(tabId(next))?.focus();
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn("rounded-md border border-line bg-surface focus-within:border-primary", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-line px-2 py-1", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { role: "tablist", "aria-label": L.editor, className: chunkFTHFEMX6_cjs.cn("flex gap-1", split && "lg:invisible"), onKeyDown: onTabKey, children: ["write", "preview"].map((n) => /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          id: tabId(n),
          type: "button",
          role: "tab",
          "aria-selected": tab === n,
          "aria-controls": tabId(`${n}-panel`),
          tabIndex: tab === n ? 0 : -1,
          onClick: () => setTab(n),
          className: chunkFTHFEMX6_cjs.cn("rounded-sm px-2 py-1 text-sm focus-visible:outline-2 focus-visible:outline-primary", tab === n ? "bg-primary-light font-medium text-primary" : "text-muted hover:bg-surface-hover"),
          children: L[n]
        },
        n
      )) }),
      !readOnly && /* @__PURE__ */ jsxRuntime.jsx("div", { role: "toolbar", "aria-label": L.toolbar, className: chunkFTHFEMX6_cjs.cn("flex gap-0.5", tab === "preview" && "invisible lg:visible"), children: TOOLS.map((tool) => /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          "aria-label": L[tool.key],
          title: L[tool.key],
          tabIndex: tab === "preview" ? -1 : 0,
          onMouseDown: (e) => e.preventDefault(),
          onClick: () => view$1.current && run(view$1.current, tool.action),
          className: "inline-flex size-7 items-center justify-center rounded-sm text-sm text-muted hover:bg-surface-hover hover:text-fg focus-visible:outline-2 focus-visible:outline-primary",
          children: tool.glyph
        },
        tool.action
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: chunkFTHFEMX6_cjs.cn(split && "lg:grid lg:grid-cols-2 lg:divide-x lg:divide-line rtl:lg:divide-x-reverse"), children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { id: tabId("write-panel"), role: "tabpanel", "aria-labelledby": tabId("write"), className: chunkFTHFEMX6_cjs.cn(tab === "write" ? "block" : split ? "hidden lg:block" : "hidden", "min-w-0"), children: /* @__PURE__ */ jsxRuntime.jsx(CmHost, { value: text, onChange: setText, extensions, readOnly, label: L.editor, minHeight: `${rows * 1.25 + 1}rem`, onReady }) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { id: tabId("preview-panel"), role: "tabpanel", "aria-labelledby": tabId("preview"), className: chunkFTHFEMX6_cjs.cn("min-w-0 p-3", tab === "preview" ? "block" : split ? "hidden lg:block" : "hidden"), children: text.trim() ? /* @__PURE__ */ jsxRuntime.jsx(Markdown, { resolveLink, renderReference, children: text }) : /* @__PURE__ */ jsxRuntime.jsx("p", { className: "m-0 text-sm text-subtle", children: L.nothingToPreview }) })
    ] })
  ] });
}

exports.CodeEditor = CodeEditor;
exports.Markdown = Markdown;
exports.MarkdownEditor = MarkdownEditor;
exports.createMentionCompletion = createMentionCompletion;
exports.jsonDiagnostics = jsonDiagnostics;
exports.markdownSchema = markdownSchema;
exports.safeUrl = safeUrl;
//# sourceMappingURL=editor.cjs.map
//# sourceMappingURL=editor.cjs.map