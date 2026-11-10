import * as React from "react";
import { CodeEditor, Markdown, MarkdownEditor, jsonDiagnostics } from "../../lib/editor";

const USERS = [
  { id: "alice", label: "alice" },
  { id: "bob", label: "bob" },
  { id: "carol", label: "carol" },
];
const ISSUES = [
  { id: "1", key: "PIL-12", title: "Datastore latency alert", status: "Open" },
  { id: "2", key: "PIL-31", title: "Rotate API keys", status: "In progress" },
];

const SAMPLE = `# Release notes

Ping @alice about #PIL-12.

- [x] Draft
- [ ] Review

| Name | Status |
|------|--------|
| api  | ok     |

\`\`\`json
{ "replicas": 3 }
\`\`\`

<script>alert(1)</script> [bad](javascript:alert(1))`;

export default function Editor() {
  const [md, setMd] = React.useState(SAMPLE);
  const [json, setJson] = React.useState('{\n  "name": "vm-01",\n  "cpu": 2,\n}');
  const diagnostics = React.useMemo(() => jsonDiagnostics(json), [json]);
  const resolveLink = (r: { kind: string; id: string }) => `#/${r.kind}/${r.id}`;
  return (
    <div className="grid max-w-4xl gap-6">
      <section className="grid gap-2">
        <h2 className="m-0">MarkdownEditor</h2>
        <p className="m-0 text-sm text-muted">Type @ for people, # for issues; paste or drop an image; Ctrl/⌘+Enter submits.</p>
        <MarkdownEditor
          value={md}
          onChange={setMd}
          onSubmit={(v) => alert(`Submitted ${v.length} chars`)}
          mentions={(q) => USERS.filter((u) => u.label.includes(q.toLowerCase()))}
          references={(q) => ISSUES.filter((i) => i.key.toLowerCase().includes(q.toLowerCase()))}
          onUpload={async (file, report) => {
            for (const p of [25, 60, 100]) {
              report(p);
              await new Promise((r) => setTimeout(r, 400));
            }
            return URL.createObjectURL(file);
          }}
          resolveLink={resolveLink}
        />
      </section>
      <section className="grid gap-2">
        <h2 className="m-0">Markdown renderer</h2>
        <div className="rounded-md border border-line p-3">
          <Markdown resolveLink={resolveLink} onTaskToggle={(i, checked) => setMd((s) => toggleTask(s, i, checked))}>
            {md}
          </Markdown>
        </div>
      </section>
      <section className="grid gap-2">
        <h2 className="m-0">CodeEditor (CodeMirror)</h2>
        <CodeEditor label="Spec" language="json" value={json} onChange={setJson} diagnostics={diagnostics} rows={6} />
        <CodeEditor label="Read-only YAML" language="yaml" value={"name: vm-01\ncpu: 2\n"} readOnly rows={3} />
      </section>
    </div>
  );
}

function toggleTask(src: string, index: number, checked: boolean) {
  let n = -1;
  return src.replace(/^(\s*[-*+] )\[( |x|X)\]/gm, (m, pre: string) => (++n === index ? `${pre}[${checked ? "x" : " "}]` : m));
}
