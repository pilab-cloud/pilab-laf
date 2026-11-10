import * as React from "react";
import { defaultKeymap, history, historyKeymap, indentLess, indentMore } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import { StateEffect, StateField, type Extension } from "@codemirror/state";
import { Decoration, EditorView, GutterMarker, drawSelection, gutter, highlightActiveLine, keymap, lineNumbers } from "@codemirror/view";
import { cn } from "../cn";
import { useLaf } from "../i18n";
import { CmHost } from "./cm";

export interface CodeDiagnostic {
  /** 1-based line. */
  line: number;
  message: string;
}

export type CodeLanguage = "json" | "yaml" | "text";

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: CodeLanguage;
  /** Accessible name of the editing surface. */
  label: string;
  rows?: number;
  readOnly?: boolean;
  /** Error gutter markers + line highlight. */
  diagnostics?: CodeDiagnostic[];
  className?: string;
}

const setDiagnostics = StateEffect.define<CodeDiagnostic[]>();
const diagnosticField = StateField.define<CodeDiagnostic[]>({
  create: () => [],
  update: (v, tr) => {
    for (const e of tr.effects) if (e.is(setDiagnostics)) return e.value;
    return v;
  },
});

class ErrorMarker extends GutterMarker {
  constructor(readonly message: string) {
    super();
  }
  eq(o: ErrorMarker) {
    return o.message === this.message;
  }
  toDOM() {
    const el = document.createElement("span");
    el.textContent = "●";
    el.title = this.message;
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", this.message);
    el.style.color = "var(--error)";
    return el;
  }
}

const errorLines = EditorView.decorations.compute([diagnosticField], (state) => {
  const ranges = state.field(diagnosticField).flatMap((d) => {
    if (d.line < 1 || d.line > state.doc.lines) return [];
    return [Decoration.line({ attributes: { style: "background-color: var(--error-bg)" } }).range(state.doc.line(d.line).from)];
  });
  return Decoration.set(ranges, true);
});

const errorGutter = gutter({
  class: "cm-laf-errors",
  lineMarker(view, line) {
    const n = view.state.doc.lineAt(line.from).number;
    const d = view.state.field(diagnosticField).find((x) => x.line === n);
    return d ? new ErrorMarker(d.message) : null;
  },
  lineMarkerChange: (u) => u.transactions.some((t) => t.effects.some((e) => e.is(setDiagnostics))),
  initialSpacer: () => new ErrorMarker(""),
});

/** Parse error of a JSON document as a diagnostic (line is best effort from the engine's position hint). */
export function jsonDiagnostics(text: string): CodeDiagnostic[] {
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

/** Tab indents; Esc then Tab leaves the editor (keyboard-trap escape hatch). */
export function tabKeymap(): Extension {
  let escaped = false;
  const leave = () => {
    if (!escaped) return false;
    escaped = false;
    return true;
  };
  return [
    EditorView.domEventHandlers({ blur: () => void (escaped = false) }),
    keymap.of([
      {
        key: "Escape",
        run: () => {
          escaped = true;
          return false;
        },
      },
      { key: "Tab", run: (v) => (leave() ? false : indentMore(v)), shift: (v) => (leave() ? false : indentLess(v)) },
    ]),
  ];
}

const languages: Record<CodeLanguage, () => Extension> = { json: () => json(), yaml: () => yaml(), text: () => [] };

/** CodeMirror 6 code editor (JSON / YAML / plain text), themed via CSS variables. */
export function CodeEditor({ value, onChange, language = "json", label, rows = 10, readOnly, diagnostics, className }: CodeEditorProps) {
  const { t } = useLaf();
  const view = React.useRef<EditorView | null>(null);
  const diagRef = React.useRef(diagnostics);
  diagRef.current = diagnostics;
  const extensions = React.useMemo<Extension[]>(
    () => [
      lineNumbers(),
      diagnosticField,
      errorGutter,
      errorLines,
      history(),
      drawSelection(),
      indentOnInput(),
      bracketMatching(),
      highlightActiveLine(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      tabKeymap(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      languages[language](),
    ],
    [language],
  );
  const onReady = React.useCallback((v: EditorView | null) => {
    view.current = v;
    v?.dispatch({ effects: setDiagnostics.of(diagRef.current ?? []) });
  }, []);
  React.useEffect(() => {
    view.current?.dispatch({ effects: setDiagnostics.of(diagnostics ?? []) });
  }, [diagnostics, extensions]);
  return (
    <div className={cn("overflow-hidden rounded-md border border-line bg-input focus-within:border-primary", className)} data-language={language}>
      <CmHost value={value} onChange={onChange} extensions={extensions} readOnly={readOnly} label={label || t.editorCodeEditor} minHeight={`${rows * 1.25 + 1}rem`} onReady={onReady} />
    </div>
  );
}
