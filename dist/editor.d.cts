import * as React from 'react';
import { CompletionSource } from '@codemirror/autocomplete';
import { Options } from 'rehype-sanitize';

interface CodeDiagnostic {
    /** 1-based line. */
    line: number;
    message: string;
}
type CodeLanguage = "json" | "yaml" | "text";
interface CodeEditorProps {
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
/** Parse error of a JSON document as a diagnostic (line is best effort from the engine's position hint). */
declare function jsonDiagnostics(text: string): CodeDiagnostic[];
/** CodeMirror 6 code editor (JSON / YAML / plain text), themed via CSS variables. */
declare function CodeEditor({ value, onChange, language, label, rows, readOnly, diagnostics, className }: CodeEditorProps): React.JSX.Element;

interface MentionItem {
    id: string;
    label: string;
    avatar?: string;
}
interface ReferenceItem {
    id: string;
    key: string;
    title: string;
    status?: string;
}
type MentionSource = (query: string) => Promise<MentionItem[]> | MentionItem[];
type ReferenceSource = (query: string) => Promise<ReferenceItem[]> | ReferenceItem[];
interface MarkdownRef {
    kind: "mention" | "issue";
    /** User id / handle, or issue key (`PIL-12`, `123`). */
    id: string;
}
/** Maps a reference to a URL; return `undefined` to render it as a plain chip. */
type ResolveLink = (ref: MarkdownRef) => string | undefined;
/** CodeMirror completion sources for `@` (mentions) and `#` (references). */
declare function createMentionCompletion(get: () => {
    mentions?: MentionSource;
    references?: ReferenceSource;
}): CompletionSource;

interface MarkdownProps {
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
/** Sanitised Markdown renderer (ADR-5): React elements only, never raw HTML. */
declare function Markdown({ children, className, resolveLink, renderReference, onTaskToggle, headingAnchors }: MarkdownProps): React.JSX.Element;

interface MarkdownEditorLabels {
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
interface MarkdownEditorProps {
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
/** Markdown editor on CodeMirror 6: toolbar, Write/Preview, mentions/references, paste & drop uploads. */
declare function MarkdownEditor({ value, defaultValue, onChange, onSubmit, onUpload, uploadAccept, mentions, references, resolveLink, renderReference, placeholder, rows, readOnly, split, labels, className, }: MarkdownEditorProps): React.JSX.Element;

/**
 * Strict rehype-sanitize schema (ADR-5). Raw HTML is never parsed (no rehype-raw), so this is
 * defence in depth: anything that is not on the list below is dropped.
 */
declare const markdownSchema: Options;
/** URL filter applied by the renderer after sanitising (relative URLs pass). */
declare function safeUrl(url: string, allowed?: readonly string[]): string;

export { type CodeDiagnostic, CodeEditor, type CodeEditorProps, type CodeLanguage, Markdown, MarkdownEditor, type MarkdownEditorLabels, type MarkdownEditorProps, type MarkdownProps, type MarkdownRef, type MentionItem, type MentionSource, type ReferenceItem, type ReferenceSource, type ResolveLink, createMentionCompletion, jsonDiagnostics, markdownSchema, safeUrl };
