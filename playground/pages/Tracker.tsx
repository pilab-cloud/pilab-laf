import * as React from "react";
import { ActivityTimeline, Button, FilterBar, IssueRow, OptionPicker, parseFilter, PropertiesPane, type FilterField, type IssueData } from "../../lib";
import { KanbanBoard, type KanbanCard } from "../../lib/dnd";
import { Markdown, MarkdownEditor } from "../../lib/editor";

type Status = "open" | "doing" | "closed";
interface Issue {
  id: string;
  key: string;
  title: string;
  status: Status;
  assignee: string;
  label: string;
  body: string;
}

const PEOPLE = ["anna", "bela", "csilla"];
const STATUSES: { value: Status; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "doing", label: "In progress" },
  { value: "closed", label: "Closed" },
];

const SEED: Issue[] = [
  { id: "1", key: "PIL-1", title: "Login redirect loops", status: "open", assignee: "anna", label: "bug", body: "## Steps\n\n1. Sign in\n2. Observe the loop\n\ncc @bela, related to #PIL-4.\n\n- [x] reproduce\n- [ ] fix" },
  { id: "2", key: "PIL-2", title: "Dark mode contrast", status: "doing", assignee: "bela", label: "ui", body: "Contrast of **muted** text is below 4.5:1.\n\n```css\ncolor: var(--muted);\n```" },
  { id: "3", key: "PIL-3", title: "Document the DataGrid", status: "open", assignee: "csilla", label: "docs", body: "Write the migration guide. Owner: @csilla." },
  { id: "4", key: "PIL-4", title: "Session expiry toast", status: "closed", assignee: "anna", label: "bug", body: "Fixed in the last release." },
  { id: "5", key: "PIL-5", title: "Keyboard move for cards", status: "doing", assignee: "anna", label: "ui", body: "Space lifts a card, arrows move it, Space drops." },
];

const fields: FilterField[] = [
  { key: "status", type: "enum", options: STATUSES.map((s) => ({ value: s.value })) },
  { key: "assignee", options: PEOPLE.map((p) => ({ value: p })) },
  { key: "label", options: [{ value: "bug" }, { value: "ui" }, { value: "docs" }] },
];

const SLOT: Record<string, 1 | 5 | 8> = { bug: 1, docs: 5, ui: 8 };
const mentions = (q: string) => PEOPLE.filter((p) => p.includes(q.toLowerCase())).map((p) => ({ id: p, label: p }));
const references = (q: string) => SEED.filter((i) => i.key.toLowerCase().includes(q.toLowerCase())).map((i) => ({ id: i.id, key: i.key, title: i.title }));
const resolveLink = (r: { kind: string; id: string }) => `#/${r.kind}/${r.id}`;

function IssuePage({ issue, onChange, onBack }: { issue: Issue; onChange: (patch: Partial<Issue>) => void; onBack: () => void }) {
  const [comments, setComments] = React.useState<{ id: string; body: string; at: number }[]>([]);
  const [draft, setDraft] = React.useState("");
  const post = (v: string) => {
    if (!v.trim()) return;
    setComments((c) => [...c, { id: `c${c.length}`, body: v, at: Date.now() }]);
    setDraft("");
  };
  return (
    <article className="grid gap-4" aria-label={issue.key}>
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" onClick={onBack}>
          ← Issues
        </Button>
        <h3 className="m-0 text-base font-semibold">
          <span className="font-mono text-muted">{issue.key}</span> {issue.title}
        </h3>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
        <div className="grid gap-4">
          <div className="rounded-md border border-line p-3">
            <Markdown resolveLink={resolveLink}>{issue.body}</Markdown>
          </div>
          <ActivityTimeline
            items={[
              { type: "event", id: "e0", at: Date.now() - 86_400_000, summary: `${issue.assignee} opened this issue` },
              ...comments.map((c) => ({
                type: "comment" as const,
                id: c.id,
                author: { name: "You" },
                at: c.at,
                body: <Markdown resolveLink={resolveLink}>{c.body}</Markdown>,
              })),
            ]}
            composer={
              <div className="grid gap-2">
                <MarkdownEditor value={draft} onChange={setDraft} onSubmit={post} mentions={mentions} references={references} resolveLink={resolveLink} rows={4} placeholder="Leave a comment — @ mentions, # references" />
                <div>
                  <Button onClick={() => post(draft)}>Comment</Button>
                </div>
              </div>
            }
          />
        </div>
        <PropertiesPane
          label="Properties"
          groups={[
            {
              id: "g",
              fields: [
                {
                  id: "status",
                  label: "Status",
                  value: STATUSES.find((s) => s.value === issue.status)?.label,
                  editor: <OptionPicker label="Status" options={STATUSES} value={[issue.status]} onChange={([v]) => v && onChange({ status: v as Status })} shortcut="s" />,
                },
                {
                  id: "assignee",
                  label: "Assignee",
                  value: issue.assignee,
                  editor: <OptionPicker label="Assignee" options={PEOPLE.map((p) => ({ value: p, label: p }))} value={[issue.assignee]} onChange={([v]) => v && onChange({ assignee: v })} shortcut="a" />,
                },
                { id: "label", label: "Label", value: issue.label },
              ],
            },
          ]}
        />
      </div>
    </article>
  );
}

/** Exit-criteria demo: filtered list (FilterBar + SavedViews) → issue page → Kanban board with keyboard card moves. */
export default function Tracker() {
  const [issues, setIssues] = React.useState(SEED);
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState<"list" | "board">("list");
  const [open, setOpen] = React.useState<string>();

  const parsed = React.useMemo(() => parseFilter(query), [query]);
  const visible = React.useMemo(
    () =>
      issues.filter((i) => {
        const fieldsOk = parsed.filters.every((f) => {
          const v = String(i[f.key as keyof Issue] ?? "").toLowerCase();
          const hit = f.values.some((x) => x.toLowerCase() === v);
          return f.negated ? !hit : hit;
        });
        const textOk = parsed.text.every((t) => `${i.key} ${i.title}`.toLowerCase().includes(t.value.toLowerCase()) !== t.negated);
        return fieldsOk && textOk;
      }),
    [issues, parsed],
  );
  const patch = (id: string, p: Partial<Issue>) => setIssues((is) => is.map((i) => (i.id === id ? { ...i, ...p } : i)));
  const current = issues.find((i) => i.id === open);

  const data = (i: Issue): IssueData => ({
    id: i.id,
    key: i.key,
    title: i.title,
    href: `#issue-${i.key}`,
    labels: [{ name: i.label, slot: SLOT[i.label] ?? 1 }],
    assignees: [{ name: i.assignee }],
    updated: Date.now() - 3_600_000,
  });
  const cards: KanbanCard[] = visible.map((i) => ({ id: i.id, columnId: i.status, title: `${i.key} ${i.title}` }));

  return (
    <section className="grid gap-4">
      <h2 className="m-0 text-lg font-semibold">Tracker</h2>
      {current ? (
        <IssuePage issue={current} onChange={(p) => patch(current.id, p)} onBack={() => setOpen(undefined)} />
      ) : (
        <>
          <FilterBar fields={fields} value={query} onChange={setQuery} savedViews={{ storageKey: "playground.tracker.views" }} />
          <div role="group" aria-label="View" className="flex gap-2">
            <Button variant={view === "list" ? "primary" : "secondary"} size="sm" aria-pressed={view === "list"} onClick={() => setView("list")}>
              List
            </Button>
            <Button variant={view === "board" ? "primary" : "secondary"} size="sm" aria-pressed={view === "board"} onClick={() => setView("board")}>
              Board
            </Button>
          </div>
          {view === "list" ? (
            <div role="list" aria-label="Issues" className="rounded-md border border-line">
              {visible.map((i) => (
                <div
                  role="listitem"
                  key={i.id}
                  onClickCapture={(e) => {
                    if ((e.target as HTMLElement).closest("a")) {
                      e.preventDefault();
                      setOpen(i.id);
                    }
                  }}
                >
                  <IssueRow issue={data(i)} />
                </div>
              ))}
              {visible.length === 0 && <p className="m-0 p-3 text-sm text-muted">No issues match.</p>}
            </div>
          ) : (
            <KanbanBoard
              label="Issue board"
              columns={STATUSES.map((s) => ({ id: s.value, title: s.label, wipLimit: s.value === "doing" ? 3 : undefined }))}
              cards={cards}
              onMove={(id, to) => patch(id, { status: to as Status })}
            />
          )}
        </>
      )}
    </section>
  );
}
