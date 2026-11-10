import * as React from "react";
import { Compartment, EditorState, type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

/** Theme driven by the runtime CSS variables, so tenants/dark mode apply without rebuilding. */
export const lafTheme: Extension = EditorView.theme({
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
  ".cm-placeholder": { color: "var(--text-subtle)" },
});

export interface CmHostProps {
  value: string;
  onChange?: (value: string) => void;
  extensions: Extension[];
  readOnly?: boolean;
  label: string;
  minHeight: string;
  className?: string;
  onReady?: (view: EditorView | null) => void;
}

const build = (ro: boolean | undefined, label: string, exts: Extension[]): Extension[] => [
  EditorState.readOnly.of(!!ro),
  EditorView.editable.of(!ro),
  EditorView.contentAttributes.of({ "aria-label": label, ...(ro ? { "aria-readonly": "true" } : {}) }),
  ...exts,
];

/** Owns an EditorView; `value` is the source of truth, `extensions` may change between renders. */
export function CmHost({ value, onChange, extensions, readOnly, label, minHeight, className, onReady }: CmHostProps) {
  const host = React.useRef<HTMLDivElement>(null);
  const viewRef = React.useRef<EditorView | null>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const onReadyRef = React.useRef(onReady);
  onReadyRef.current = onReady;
  const dynamic = React.useRef(new Compartment());
  const initial = React.useRef({ value, extensions, readOnly, label, minHeight });

  React.useEffect(() => {
    const init = initial.current;
    const view = new EditorView({
      parent: host.current!,
      state: EditorState.create({
        doc: init.value,
        extensions: [
          lafTheme,
          EditorView.theme({ "&": { minHeight: init.minHeight } }),
          EditorView.updateListener.of((u) => {
            if (u.docChanged) onChangeRef.current?.(u.state.doc.toString());
          }),
          dynamic.current.of(build(init.readOnly, init.label, init.extensions)),
        ],
      }),
    });
    viewRef.current = view;
    onReadyRef.current?.(view);
    return () => {
      onReadyRef.current?.(null);
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    viewRef.current?.dispatch({ effects: dynamic.current.reconfigure(build(readOnly, label, extensions)) });
  }, [extensions, readOnly, label]);

  React.useEffect(() => {
    const view = viewRef.current;
    if (view && view.state.doc.toString() !== value) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
    }
  }, [value]);

  return <div ref={host} className={className} />;
}
