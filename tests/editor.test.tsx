import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { EditorView } from "@codemirror/view";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { CodeEditor, CodeEditorLite } from "../lib";
import { CodeEditor as CmCodeEditor, jsonDiagnostics, Markdown, MarkdownEditor, safeUrl } from "../lib/editor";

// jsdom lacks layout APIs CodeMirror measures with.
Range.prototype.getClientRects ??= () => ({ length: 0, item: () => null, [Symbol.iterator]: function* () {} }) as unknown as DOMRectList;
Range.prototype.getBoundingClientRect ??= () => new DOMRect();

const md = (src: string, props: Partial<React.ComponentProps<typeof Markdown>> = {}) => render(<Markdown {...props}>{src}</Markdown>).container;

describe("Markdown renderer – sanitisation (ADR-5)", () => {
  const payloads: [string, string][] = [
    ["script tag", `<script>window.__xss=1</script>hello`],
    ["javascript: link", `[x](javascript:alert(1))`],
    ["mixed-case javascript: link", `[x](JaVaScRiPt:alert(1))`],
    ["whitespace-obfuscated javascript:", `[x](java\tscript:alert(1))`],
    ["entity-encoded javascript:", `[x](&#106;avascript:alert(1))`],
    ["img onerror", `<img src=x onerror="window.__xss=1">`],
    ["on* handler on element", `<a href="#" onclick="window.__xss=1">c</a><div onmouseover="window.__xss=1">m</div>`],
    ["svg onload", `<svg onload="window.__xss=1"><circle/></svg>`],
    ["data: image", `![x](data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=)`],
    ["data: link", `[x](data:text/html,<script>alert(1)</script>)`],
    ["vbscript link", `[x](vbscript:msgbox(1))`],
    ["protocol-relative link", `[x](//evil.example/x)`],
    ["nested html in blockquote/list", `> - <iframe src="https://evil.example"></iframe>\n> - <img src=x onerror=alert(1)>`],
    ["html in table cell", `| a |\n|---|\n| <script>alert(1)</script><b onclick=alert(1)>x</b> |`],
    ["html in link text", `[<img src=x onerror=alert(1)>](https://ok.example)`],
    ["style tag", `<style>*{background:url(javascript:alert(1))}</style>`],
    ["reference-style javascript link", `[x][1]\n\n[1]: javascript:alert(1)`],
    ["autolink javascript", `<javascript:alert(1)>`],
  ];

  it.each(payloads)("neutralises %s", (_name, src) => {
    const root = md(src);
    expect(root.querySelector("script, iframe, svg, style, object, embed")).toBeNull();
    for (const el of root.querySelectorAll("*")) {
      for (const attr of Array.from(el.attributes)) {
        expect(attr.name, `${el.tagName}[${attr.name}]`).not.toMatch(/^on/i);
        if (["href", "src"].includes(attr.name)) {
          expect(attr.value.replace(/\s/g, ""), `${el.tagName}[${attr.name}]`).not.toMatch(/^(javascript|vbscript|data):/i);
          expect(attr.value).not.toMatch(/^\/\//);
        }
      }
    }
    expect((window as unknown as { __xss?: number }).__xss).toBeUndefined();
  });

  it("shows raw HTML as text instead of executing it", () => {
    const root = md(`<b>bold</b>`);
    expect(root.querySelector("b")).toBeNull();
  });

  it("safeUrl keeps http(s)/mailto/relative and drops the rest", () => {
    expect(safeUrl("https://a.example/x")).toBe("https://a.example/x");
    expect(safeUrl("/issues/1")).toBe("/issues/1");
    expect(safeUrl("mailto:a@b.c")).toBe("mailto:a@b.c");
    expect(safeUrl("javascript:alert(1)")).toBe("");
    expect(safeUrl(" java\nscript:alert(1)")).toBe("");
    expect(safeUrl("data:text/html,x")).toBe("");
  });
});

describe("Markdown renderer – features", () => {
  it("renders external links with safe rel and target", () => {
    md(`[ext](https://example.com) [rel](/docs)`);
    const ext = screen.getByRole("link", { name: "ext" });
    expect(ext).toHaveAttribute("rel", "noopener noreferrer nofollow ugc");
    expect(ext).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "rel" })).not.toHaveAttribute("target");
  });

  it("renders GFM tables, lazy capped images, heading anchors and code blocks with copy", async () => {
    const root = md("# Hello World\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n![alt](https://x.example/i.png)\n\n```json\n{\"a\": 1}\n```");
    expect(screen.getByRole("heading", { name: /Hello World/ })).toHaveAttribute("id", "hello-world");
    expect(root.querySelector("table")).not.toBeNull();
    const img = root.querySelector("img")!;
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img.className).toContain("max-w-full");
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    await userEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith('{"a": 1}');
  });

  it("task lists are read-only unless onTaskToggle is given, and report their index", async () => {
    const src = "- [ ] one\n- [x] two\n\n  - [ ] nested";
    const { unmount } = render(<Markdown>{src}</Markdown>);
    for (const box of screen.getAllByRole("checkbox")) expect(box).toBeDisabled();
    unmount();
    const onTaskToggle = vi.fn();
    render(<Markdown onTaskToggle={onTaskToggle}>{src}</Markdown>);
    const boxes = screen.getAllByRole("checkbox");
    expect(boxes).toHaveLength(3);
    await userEvent.click(boxes[1]!);
    expect(onTaskToggle).toHaveBeenCalledWith(1, false);
  });

  it("turns @user and #KEY-1 into resolved links, unresolved ones into chips", () => {
    const resolveLink = vi.fn((ref: { kind: string; id: string }) => (ref.kind === "mention" ? `/users/${ref.id}` : undefined));
    md("ping @alice about #PIL-12 `@code`", { resolveLink });
    expect(screen.getByRole("link", { name: "@alice" })).toHaveAttribute("href", "/users/alice");
    expect(screen.getByText("#PIL-12").tagName).toBe("SPAN");
    expect(resolveLink).toHaveBeenCalledWith({ kind: "issue", id: "PIL-12" });
  });

  it("resolves internal mention:/issue: links written by the editor and never lets them leak as hrefs", () => {
    md("[@Bob](mention:bob) [#PIL-3](issue:PIL-3)", { resolveLink: (r) => `/${r.kind}/${r.id}` });
    expect(screen.getByRole("link", { name: "@Bob" })).toHaveAttribute("href", "/mention/bob");
    expect(screen.getByRole("link", { name: "#PIL-3" })).toHaveAttribute("href", "/issue/PIL-3");
  });

  it("has no axe violations", async () => {
    const root = md("# T\n\n- [ ] a\n\n[l](https://x.example)\n\n```\ncode\n```");
    expect(await axe(root)).toHaveNoViolations();
  });
});

describe("MarkdownEditor", () => {
  it("edits, previews and submits with Ctrl+Enter", async () => {
    const onSubmit = vi.fn();
    render(<MarkdownEditor defaultValue="**hi**" onSubmit={onSubmit} />);
    const editor = screen.getByRole("textbox", { name: "Markdown editor" });
    expect(editor.textContent).toContain("**hi**");
    await userEvent.click(editor);
    await userEvent.keyboard("{Control>}{Enter}{/Control}");
    expect(onSubmit).toHaveBeenCalledWith("**hi**");
    await userEvent.click(screen.getByRole("tab", { name: "Preview" }));
    expect(within(screen.getByRole("tabpanel", { name: "Preview" })).getByText("hi").tagName).toBe("STRONG");
  });

  it("toolbar formats the selection", async () => {
    const onChange = vi.fn();
    render(<MarkdownEditor defaultValue="" onChange={onChange} />);
    await userEvent.click(screen.getByRole("textbox", { name: "Markdown editor" }));
    await userEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(onChange).toHaveBeenLastCalledWith("**bold**");
    await userEvent.click(screen.getByRole("button", { name: "Task list" }));
    expect(onChange.mock.lastCall![0]).toMatch(/^- \[ \] /);
  });

  it("suggests mentions on @ and inserts a markdown link", async () => {
    const mentions = vi.fn(async (q: string) => [{ id: "u1", label: "alice" }].filter((u) => u.label.startsWith(q)));
    const onChange = vi.fn();
    render(<MarkdownEditor defaultValue="" mentions={mentions} onChange={onChange} />);
    const content = screen.getByRole("textbox", { name: "Markdown editor" });
    await userEvent.click(content);
    const view = EditorView.findFromDOM(content.closest(".cm-editor") as HTMLElement)!;
    view.dispatch({ changes: { from: 0, insert: "hi @al" }, selection: { anchor: 6 }, userEvent: "input.type" });
    await waitFor(() => expect(mentions).toHaveBeenCalledWith("al"));
    const option = await screen.findByRole("option", { name: /@alice/ });
    expect(option).toBeInTheDocument();
    await new Promise((r) => setTimeout(r, 120)); // autocomplete ignores Enter during its interaction delay
    fireEvent.keyDown(content, { key: "Enter", keyCode: 13 });
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith("hi [@alice](mention:u1)"));
  });

  it("uploads pasted images and swaps the placeholder for the URL", async () => {
    let resolve!: (url: string) => void;
    const onUpload = vi.fn(() => new Promise<string>((r) => (resolve = r)));
    const onChange = vi.fn();
    render(<MarkdownEditor defaultValue="" onUpload={onUpload} onChange={onChange} />);
    const content = screen.getByRole("textbox", { name: "Markdown editor" });
    const file = new File(["x"], "shot.png", { type: "image/png" });
    const evt = new Event("paste", { bubbles: true, cancelable: true }) as Event & { clipboardData?: unknown };
    evt.clipboardData = { files: [file] };
    content.dispatchEvent(evt);
    expect(onUpload).toHaveBeenCalledWith(file, expect.any(Function));
    await waitFor(() => expect(onChange.mock.lastCall![0]).toContain("Uploading"));
    resolve("https://cdn.example/shot.png");
    await waitFor(() => expect(onChange.mock.lastCall![0]).toContain("![shot.png](https://cdn.example/shot.png)"));
  });

  it("has no axe violations", async () => {
    const { container } = render(<MarkdownEditor defaultValue="x" />);
    expect(await axe(container, { rules: { "aria-allowed-role": { enabled: false } } })).toHaveNoViolations();
  });
});

describe("CodeEditor (CodeMirror)", () => {
  it("is controlled, read-only capable and marks diagnostics", async () => {
    const { container, rerender } = render(<CmCodeEditor label="Spec" value='{"a": 1}' />);
    expect(screen.getByRole("textbox", { name: "Spec" }).textContent).toContain('"a"');
    rerender(<CmCodeEditor label="Spec" value='{"a": 2}' diagnostics={[{ line: 1, message: "bad" }]} />);
    await waitFor(() => expect(screen.getByRole("textbox", { name: "Spec" }).textContent).toContain("2"));
    await waitFor(() => expect(container.querySelector('[aria-label="bad"]')).not.toBeNull());
    rerender(<CmCodeEditor label="Spec" value="x" readOnly />);
    await waitFor(() => expect(screen.getByRole("textbox", { name: "Spec" })).toHaveAttribute("aria-readonly", "true"));
  });

  it("jsonDiagnostics reports parse errors", () => {
    expect(jsonDiagnostics('{"a":1}')).toEqual([]);
    expect(jsonDiagnostics('{"a":')).toHaveLength(1);
  });

  it("keeps the textarea variant in core as CodeEditorLite (CodeEditor stays an alias)", () => {
    expect(CodeEditor).toBe(CodeEditorLite);
  });
});
