import { Circle, CircleDot, Flag } from "lucide-react";
import * as React from "react";
import { ActivityTimeline, HoverCard, InlineEdit, IssueCard, IssueRow, LabelPicker, OptionPicker, ProgressSummary, PropertiesPane, Reactions, Textarea, Button, type LabelDef, type Reaction } from "../../lib";

const LABELS: LabelDef[] = [
  { id: "bug", name: "bug", slot: 1, description: "Something is broken" },
  { id: "ui", name: "ui", slot: 8 },
  { id: "docs", name: "docs", slot: 5 },
];
const STATUS = [
  { value: "open", label: "Open", icon: <Circle className="size-4" /> },
  { value: "done", label: "Done", icon: <CircleDot className="size-4" /> },
];

export default function TrackerParts() {
  const [labels, setLabels] = React.useState<string[]>(["bug"]);
  const [status, setStatus] = React.useState(["open"]);
  const [prio, setPrio] = React.useState("3");
  const [reactions, setReactions] = React.useState<Reaction[]>([{ emoji: "👍", users: ["Anna"], reacted: false }]);
  const toggle = (emoji: string) =>
    setReactions((rs) => {
      const r = rs.find((x) => x.emoji === emoji);
      if (!r) return [...rs, { emoji, users: ["You"], reacted: true }];
      return rs.map((x) => (x === r ? { ...x, reacted: !x.reacted, users: x.reacted ? x.users.filter((u) => u !== "You") : [...x.users, "You"] } : x)).filter((x) => x.users.length);
    });
  const issue = { id: "1", key: "PIL-12", title: "Fix login redirect", href: "#", priority: <Flag className="size-4" />, labels: LABELS.slice(0, 2), assignees: [{ name: "Anna Kovacs" }], due: "2020-01-01", comments: 3, updated: Date.now() - 3600_000 };
  return (
    <div className="grid gap-6">
      <IssueRow issue={issue} onSelectedChange={() => {}} />
      <div className="max-w-sm">
        <IssueCard issue={issue} />
      </div>
      <ActivityTimeline
        items={[
          { type: "comment", id: "c1", author: { name: "Anna Kovacs" }, at: Date.now() - 86400_000, body: "Looks good.", reactions, onToggleReaction: toggle },
          ...[1, 2, 3, 4].map((i) => ({ type: "event" as const, id: `e${i}`, at: Date.now() - i * 60_000, summary: `Anna changed status (${i})` })),
        ]}
        composer={
          <div className="grid gap-2">
            <Textarea aria-label="Comment" />
            <Button>Comment</Button>
          </div>
        }
      />
      <Reactions reactions={reactions} onToggle={toggle} />
      <LabelPicker labels={LABELS} value={labels} onChange={setLabels} onCreate={(l) => console.log(l)} />
      <PropertiesPane
        groups={[
          {
            id: "g",
            fields: [
              { id: "s", label: "Status", value: status[0], editor: <OptionPicker label="Status" options={STATUS} value={status} onChange={setStatus} shortcut="s" /> },
              { id: "p", label: "Priority", value: prio, editor: <InlineEdit as="number" label="Priority" value={prio} onSave={setPrio} min={1} max={5} /> },
            ],
          },
        ]}
      />
      <HoverCard trigger={<a href="#">@anna</a>}>Anna Kovacs — maintainer</HoverCard>
      <ProgressSummary title="Sprint 4" todo={4} doing={2} done={6} />
    </div>
  );
}
