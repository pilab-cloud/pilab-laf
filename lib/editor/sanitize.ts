import { defaultSchema, type Options as Schema } from "rehype-sanitize";

/** Link schemes kept by the renderer; `mention:` / `issue:` are internal references resolved by `resolveLink`. */
export const SAFE_HREF_PROTOCOLS = ["http", "https", "mailto", "mention", "issue"];
export const SAFE_SRC_PROTOCOLS = ["http", "https"];

/**
 * Strict rehype-sanitize schema (ADR-5). Raw HTML is never parsed (no rehype-raw), so this is
 * defence in depth: anything that is not on the list below is dropped.
 */
export const markdownSchema: Schema = {
  ...defaultSchema,
  tagNames: [
    "p", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "code", "em", "strong", "del",
    "ul", "ol", "li", "a", "img", "table", "thead", "tbody", "tr", "th", "td", "input", "span",
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
    td: [["align", /^(left|right|center)$/]],
  },
  strip: ["script", "style", "iframe", "object", "embed", "svg", "math", "form", "textarea", "select", "button"],
};

/** URL filter applied by the renderer after sanitising (relative URLs pass). */
export function safeUrl(url: string, allowed: readonly string[] = SAFE_HREF_PROTOCOLS): string {
  const trimmed = url.trim();
  // eslint-disable-next-line no-control-regex
  const compact = trimmed.replace(/[\u0000-\u0020\u007f-\u009f]/g, "");
  const m = /^([a-z][a-z0-9+.-]*):/i.exec(compact);
  if (!m) return compact.startsWith("//") ? "" : trimmed;
  return allowed.includes(m[1]!.toLowerCase()) ? trimmed : "";
}
