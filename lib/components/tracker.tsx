import { Command } from "cmdk";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Check, ChevronDown, MessageSquare, MoreHorizontal, SmilePlus } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Avatar } from "./display";
import { Chip } from "./extras";
import { Combobox, type ComboboxOption } from "./combobox";
import { Menu, type MenuItemSpec } from "./menu";
import { AvatarGroup, RelativeTime } from "./primitives";
import { LABEL_SLOTS, type LabelSlot } from "./label-slot";

export type { LabelSlot };

/** Tooltip that works without an app-level provider. */
function Tip({ content, children }: { content: React.ReactNode; children: React.ReactElement }) {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content sideOffset={6} className="z-60 rounded-md border border-line-strong bg-menu px-2 py-1 text-xs text-fg">
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

const withLabels = <T extends object>(defaults: T, labels?: Partial<T>): T => ({ ...defaults, ...labels });

/* ── 4.95 Label / LabelPicker ── */
export interface LabelDef {
  id: string;
  name: string;
  slot: LabelSlot;
  description?: string;
}

export function Label({ slot, description, onRemove, removeLabel, children }: { slot: LabelSlot; description?: string; onRemove?: () => void; removeLabel?: string; children: React.ReactNode }) {
  const chip = (
    <Chip color={slot} onRemove={onRemove} removeLabel={removeLabel}>
      {children}
    </Chip>
  );
  return description ? (
    <Tip content={description}>
      <span className="inline-flex">{chip}</span>
    </Tip>
  ) : (
    chip
  );
}

export function LabelSwatch({ slot, className }: { slot: LabelSlot; className?: string }) {
  return <span aria-hidden className={cn("inline-block size-3 shrink-0 rounded-xs", className)} style={{ backgroundColor: `var(--label-${slot})` }} />;
}

const labelPickerLabels = { label: "Labels", placeholder: "Filter labels…", newColour: "New label colour", colour: (n: number) => `Colour ${n}`, create: (q: string) => `Create label “${q}”` };

export function LabelPicker({
  labels,
  value,
  onChange,
  onCreate,
  text,
  disabled,
}: {
  labels: LabelDef[];
  value: string[];
  onChange: (ids: string[]) => void;
  /** Enables creation; receives the typed name and the chosen palette slot. */
  onCreate?: (label: { name: string; slot: LabelSlot }) => void;
  text?: Partial<typeof labelPickerLabels>;
  disabled?: boolean;
}) {
  const l = withLabels(labelPickerLabels, text);
  const [slot, setSlot] = React.useState<LabelSlot>(1);
  const byId = React.useMemo(() => new Map(labels.map((x) => [x.id, x])), [labels]);
  const options: ComboboxOption[] = labels.map((x) => ({ value: x.id, label: x.name, description: x.description }));
  return (
    <div className="grid gap-2">
      <Combobox
        multiple
        label={l.label}
        placeholder={l.placeholder}
        options={options}
        value={options.filter((o) => value.includes(o.value))}
        onChange={(v) => onChange(v.map((o) => o.value))}
        disabled={disabled}
        onCreate={onCreate ? (name) => onCreate({ name, slot }) : undefined}
        createLabel={l.create}
        renderOption={(o) => (
          <span className="flex items-center gap-2">
            <LabelSwatch slot={byId.get(o.value)?.slot ?? 1} />
            {o.label}
          </span>
        )}
      />
      {onCreate && (
        <div role="radiogroup" aria-label={l.newColour} className="flex flex-wrap gap-1">
          {LABEL_SLOTS.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={slot === s}
              aria-label={l.colour(s)}
              disabled={disabled}
              onClick={() => setSlot(s)}
              className={cn("grid size-6 place-items-center rounded-sm border bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary", slot === s ? "border-fg" : "border-transparent")}
            >
              <LabelSwatch slot={s} className="size-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── 4.94 Reactions ── */
export interface Reaction {
  emoji: string;
  users: string[];
  /** Whether the current user reacted. */
  reacted?: boolean;
}

const reactionLabels = {
  add: "Add reaction",
  reactedBy: (emoji: string, users: string[]) => `${emoji} ${users.join(", ")}`,
  toggle: (emoji: string, n: number) => `${emoji} ${n}`,
};
const DEFAULT_EMOJI = ["👍", "👎", "😄", "🎉", "❤️", "👀"];

export function Reactions({
  reactions,
  onToggle,
  palette = DEFAULT_EMOJI,
  readOnly,
  text,
}: {
  reactions: Reaction[];
  onToggle: (emoji: string) => void;
  palette?: string[];
  readOnly?: boolean;
  text?: Partial<typeof reactionLabels>;
}) {
  const l = withLabels(reactionLabels, text);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-wrap items-center gap-1">
      {reactions.map((r) => (
        <Tip key={r.emoji} content={l.reactedBy(r.emoji, r.users)}>
          <button
            type="button"
            aria-pressed={!!r.reacted}
            aria-label={l.toggle(r.emoji, r.users.length)}
            disabled={readOnly}
            onClick={() => onToggle(r.emoji)}
            className={cn(
              "inline-flex h-6 items-center gap-1 rounded-sm border px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary",
              r.reacted ? "border-primary/35 bg-primary-light text-primary" : "border-line bg-muted-bg text-fg",
            )}
          >
            <span aria-hidden>{r.emoji}</span>
            {r.users.length}
          </button>
        </Tip>
      ))}
      {!readOnly && (
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
          <PopoverPrimitive.Trigger
            aria-label={l.add}
            className="inline-flex size-6 items-center justify-center rounded-sm border border-line bg-transparent text-muted outline-none hover:text-fg focus-visible:ring-2 focus-visible:ring-primary"
          >
            <SmilePlus className="size-3.5" aria-hidden />
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content sideOffset={4} align="start" className="z-50 flex gap-1 rounded-md border border-line-strong bg-menu p-1">
              {palette.map((e) => (
                <button
                  key={e}
                  type="button"
                  aria-label={e}
                  className="size-7 rounded-sm border-0 bg-transparent hover:bg-surface-hover"
                  onClick={() => {
                    onToggle(e);
                    setOpen(false);
                  }}
                >
                  {e}
                </button>
              ))}
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      )}
    </div>
  );
}

/* ── 4.93 ActivityTimeline ── */
export interface ActivityComment {
  type: "comment";
  id: string;
  author: { name: string; src?: string };
  at: Date | string | number;
  body: React.ReactNode;
  edited?: boolean;
  actions?: MenuItemSpec[];
  reactions?: Reaction[];
  onToggleReaction?: (emoji: string) => void;
}
export interface ActivityEvent {
  type: "event";
  id: string;
  at: Date | string | number;
  icon?: React.ReactNode;
  /** Already-composed sentence, e.g. "Anna changed status from Open to Done". */
  summary: React.ReactNode;
}
export type ActivityItem = ActivityComment | ActivityEvent;

const timelineLabels = { edited: "edited", actions: "Comment actions", more: (n: number) => `${n} more updates`, fewer: "Show fewer updates", timeline: "Activity" };

export function ActivityTimeline({
  items,
  composer,
  collapseAfter = 3,
  text,
}: {
  items: ActivityItem[];
  /** Rendered below the list (e.g. a Textarea + submit button). */
  composer?: React.ReactNode;
  /** Runs of more than this many consecutive events are collapsed behind a toggle. */
  collapseAfter?: number;
  text?: Partial<typeof timelineLabels>;
}) {
  const l = withLabels(timelineLabels, text);
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  const rows = React.useMemo(() => {
    const out: (ActivityItem | { type: "run"; id: string; events: ActivityEvent[] })[] = [];
    let run: ActivityEvent[] = [];
    const flush = () => {
      if (run.length > collapseAfter) out.push({ type: "run", id: `run-${run[0]!.id}`, events: run });
      else out.push(...run);
      run = [];
    };
    for (const it of items) {
      if (it.type === "event") run.push(it);
      else {
        flush();
        out.push(it);
      }
    }
    flush();
    return out;
  }, [items, collapseAfter]);

  const eventRow = (e: ActivityEvent) => (
    <li key={e.id} className="flex items-center gap-2 ps-1 text-xs text-muted">
      <span aria-hidden className="grid size-5 shrink-0 place-items-center text-subtle">
        {e.icon}
      </span>
      <span className="min-w-0">{e.summary}</span>
      <RelativeTime value={e.at} className="ms-auto shrink-0 text-subtle" />
    </li>
  );

  return (
    <div className="grid gap-3">
      <ol aria-label={l.timeline} className="m-0 grid list-none gap-3 p-0">
        {rows.map((r) => {
          if (r.type === "event") return eventRow(r);
          if (r.type === "run") {
            const open = expanded.has(r.id);
            return (
              <React.Fragment key={r.id}>
                {open && r.events.map(eventRow)}
                <li>
                  <button
                    type="button"
                    aria-expanded={open}
                    className="border-0 bg-transparent p-0 text-xs text-primary hover:underline"
                    onClick={() =>
                      setExpanded((s) => {
                        const n = new Set(s);
                        if (!n.delete(r.id)) n.add(r.id);
                        return n;
                      })
                    }
                  >
                    {open ? l.fewer : l.more(r.events.length)}
                  </button>
                </li>
              </React.Fragment>
            );
          }
          return (
            <li key={r.id} className="flex gap-3">
              <Avatar name={r.author.name} src={r.author.src} />
              <div className="min-w-0 flex-1 rounded-md border border-line bg-surface">
                <div className="flex items-center gap-2 border-b border-line px-3 py-1.5 text-xs">
                  <strong className="text-fg">{r.author.name}</strong>
                  <RelativeTime value={r.at} className="text-muted" />
                  {r.edited && <span className="text-subtle">({l.edited})</span>}
                  {r.actions && r.actions.length > 0 && (
                    <span className="ms-auto">
                      <Menu
                        items={r.actions}
                        trigger={
                          <button type="button" aria-label={l.actions} className="grid size-6 place-items-center rounded-sm border-0 bg-transparent text-muted hover:text-fg">
                            <MoreHorizontal className="size-4" aria-hidden />
                          </button>
                        }
                      />
                    </span>
                  )}
                </div>
                <div className="px-3 py-2 text-sm whitespace-pre-wrap text-fg">{r.body}</div>
                {r.reactions && r.onToggleReaction && (
                  <div className="px-3 pb-2">
                    <Reactions reactions={r.reactions} onToggle={r.onToggleReaction} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {composer && <div>{composer}</div>}
    </div>
  );
}

/* ── 4.96 OptionPicker ── */
export interface PickerOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

const optionPickerLabels = { search: "Search…", empty: "No results", none: "None" };

export interface OptionPickerProps {
  options: PickerOption[];
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  /** Accessible name, e.g. "Status". */
  label: string;
  /** Icon-only trigger for rows; the full trigger is for the properties pane. */
  compact?: boolean;
  searchable?: boolean;
  /** Single key (e.g. "s") that opens the picker while focus is not in a text field. */
  shortcut?: string;
  disabled?: boolean;
  text?: Partial<typeof optionPickerLabels>;
  className?: string;
}

export function OptionPicker({ options, value, onChange, multiple, label, compact, searchable = true, shortcut, disabled, text, className }: OptionPickerProps) {
  const l = withLabels(optionPickerLabels, text);
  const [open, setOpen] = React.useState(false);
  const trigger = React.useRef<HTMLButtonElement>(null);
  const selected = options.filter((o) => value.includes(o.value));

  React.useEffect(() => {
    if (!shortcut || disabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== shortcut || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shortcut, disabled]);

  const pick = (o: PickerOption) => {
    if (multiple) onChange(value.includes(o.value) ? value.filter((v) => v !== o.value) : [...value, o.value]);
    else {
      onChange([o.value]);
      setOpen(false);
    }
  };
  const text1 = selected.length ? selected.map((o) => o.label).join(", ") : l.none;
  const iconOf = selected[0]?.icon;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        ref={trigger}
        disabled={disabled}
        aria-label={compact ? `${label}: ${text1}` : undefined}
        aria-haspopup="listbox"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-sm border border-transparent bg-transparent text-sm text-fg outline-none hover:border-line focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50",
          compact ? "size-7 justify-center" : "h-8 w-full px-2",
          className,
        )}
      >
        <span aria-hidden className="grid size-4 shrink-0 place-items-center">
          {iconOf}
        </span>
        {!compact && (
          <>
            <span className="min-w-0 flex-1 truncate text-start">{text1}</span>
            <ChevronDown className="size-3.5 text-muted" aria-hidden />
          </>
        )}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content sideOffset={4} align="start" collisionPadding={8} className="z-50">
          <Command label={label} loop className="dropdown-menu min-w-52">
            {searchable && <Command.Input aria-label={l.search} placeholder={l.search} className="w-full border-0 border-b border-line bg-transparent px-3 py-2 text-sm text-fg outline-none" />}
            <Command.List className="max-h-64 overflow-auto">
              <Command.Empty className="px-3 py-2 text-sm text-muted">{l.empty}</Command.Empty>
              {options.map((o) => (
                <Command.Item
                  key={o.value}
                  value={o.value}
                  keywords={[o.label, o.description ?? ""]}
                  onSelect={() => pick(o)}
                  className="dropdown-item cursor-pointer data-[selected=true]:bg-surface-hover data-[selected=true]:text-fg"
                >
                  <span aria-hidden className="grid size-4 place-items-center">
                    {o.icon}
                  </span>
                  <span>{o.label}</span>
                  {o.description && <span className="ms-2 text-xs text-subtle">{o.description}</span>}
                  {value.includes(o.value) && <Check aria-hidden className="ms-auto size-3.5 text-primary" />}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

/* ── 4.97 IssueRow / IssueCard ── */
export interface IssueData {
  id: string;
  key: string;
  title: string;
  href?: string;
  priority?: React.ReactNode;
  status?: React.ReactNode;
  labels?: { name: string; slot: LabelSlot; description?: string }[];
  assignees?: { name: string; src?: string }[];
  /** ISO date or timestamp. */
  due?: Date | string | number;
  comments?: number;
  updated?: Date | string | number;
}

interface IssueViewProps {
  issue: IssueData;
  density?: "compact" | "comfortable";
  /** Overrides "now" for the overdue check (tests, server-rendering). */
  now?: Date | number;
  text?: Partial<typeof issueLabels>;
}
const issueLabels = { select: (key: string) => `Select ${key}`, overdue: "Overdue", comments: (n: number) => `${n} comments`, due: "Due" };

function DueDate({ due, now, text }: { due: NonNullable<IssueData["due"]>; now?: Date | number; text: typeof issueLabels }) {
  const d = new Date(due);
  const overdue = d.getTime() < (now ? new Date(now).getTime() : Date.now());
  return (
    <time dateTime={d.toISOString()} className={cn("text-xs", overdue ? "text-danger" : "text-muted")}>
      {overdue && <span className="sr-only">{text.overdue}: </span>}
      {d.toLocaleDateString()}
    </time>
  );
}

function IssueLabels({ labels }: { labels: NonNullable<IssueData["labels"]> }) {
  return (
    <>
      {labels.map((x) => (
        <Label key={x.name} slot={x.slot} description={x.description}>
          {x.name}
        </Label>
      ))}
    </>
  );
}

function IssueTitle({ issue }: { issue: IssueData }) {
  return issue.href ? (
    <a href={issue.href} className="truncate text-fg no-underline hover:underline">
      {issue.title}
    </a>
  ) : (
    <span className="truncate">{issue.title}</span>
  );
}

export function IssueRow({
  issue,
  density = "comfortable",
  selected,
  onSelectedChange,
  now,
  text,
}: IssueViewProps & { selected?: boolean; onSelectedChange?: (selected: boolean) => void }) {
  const l = withLabels(issueLabels, text);
  return (
    <div className={cn("flex items-center gap-3 border-b border-line px-3 text-sm", density === "compact" ? "py-1" : "py-2.5", selected && "bg-surface-hover")}>
      {onSelectedChange && (
        <input type="checkbox" aria-label={l.select(issue.key)} checked={!!selected} onChange={(e) => onSelectedChange(e.target.checked)} />
      )}
      {issue.priority && <span className="grid size-4 shrink-0 place-items-center">{issue.priority}</span>}
      <span className="shrink-0 font-mono text-xs text-muted">{issue.key}</span>
      <span className="flex min-w-0 flex-1 items-center gap-2">
        <IssueTitle issue={issue} />
        {issue.labels && <IssueLabels labels={issue.labels} />}
      </span>
      {issue.assignees && issue.assignees.length > 0 && <AvatarGroup users={issue.assignees} size="sm" max={3} />}
      {issue.due && <DueDate due={issue.due} now={now} text={l} />}
      {!!issue.comments && (
        <span className="inline-flex items-center gap-1 text-xs text-muted" aria-label={l.comments(issue.comments)}>
          <MessageSquare className="size-3.5" aria-hidden />
          {issue.comments}
        </span>
      )}
      {issue.updated && <RelativeTime value={issue.updated} className="text-xs text-subtle" />}
    </div>
  );
}

export function IssueCard({ issue, density = "comfortable", now, text }: IssueViewProps) {
  const l = withLabels(issueLabels, text);
  return (
    <article className={cn("grid rounded-md border border-line bg-surface text-sm", density === "compact" ? "gap-1 p-2" : "gap-2 p-3")}>
      <div className="flex items-center gap-2">
        {issue.priority && <span className="grid size-4 place-items-center">{issue.priority}</span>}
        <span className="font-mono text-xs text-muted">{issue.key}</span>
        {issue.status && <span className="ms-auto">{issue.status}</span>}
      </div>
      <div className="flex min-w-0">
        <IssueTitle issue={issue} />
      </div>
      {issue.labels && issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <IssueLabels labels={issue.labels} />
        </div>
      )}
      <div className="flex items-center gap-3">
        {issue.assignees && issue.assignees.length > 0 && <AvatarGroup users={issue.assignees} size="sm" max={3} />}
        {issue.due && <DueDate due={issue.due} now={now} text={l} />}
        {!!issue.comments && (
          <span className="inline-flex items-center gap-1 text-xs text-muted" aria-label={l.comments(issue.comments)}>
            <MessageSquare className="size-3.5" aria-hidden />
            {issue.comments}
          </span>
        )}
        {issue.updated && <RelativeTime value={issue.updated} className="ms-auto text-xs text-subtle" />}
      </div>
    </article>
  );
}

/* ── 4.99 PropertiesPane ── */
export interface PropertyField {
  id: string;
  label: string;
  /** Read-only rendering (also used when the pane is readOnly). */
  value: React.ReactNode;
  /** OptionPicker, InlineEdit, DatePicker … */
  editor?: React.ReactNode;
  pending?: boolean;
  error?: string;
}
export interface PropertyGroup {
  id: string;
  title?: string;
  fields: PropertyField[];
}

export function PropertiesPane({ groups, readOnly, label, className }: { groups: PropertyGroup[]; readOnly?: boolean; label?: string; className?: string }) {
  return (
    <section aria-label={label} className={cn("grid gap-4 text-sm", className)}>
      {groups.map((g) => (
        <div key={g.id} role="group" aria-label={g.title} className="grid gap-2">
          {g.title && <h3 className="m-0 text-[0.6875rem] font-normal tracking-wider text-subtle uppercase">{g.title}</h3>}
          <dl className="m-0 grid gap-2">
            {g.fields.map((f) => (
              <div key={f.id} className="grid grid-cols-[7rem_1fr] items-start gap-2" aria-busy={f.pending || undefined}>
                <dt className="pt-1 text-muted">{f.label}</dt>
                <dd className={cn("m-0 grid min-w-0 gap-1", f.pending && "opacity-60")}>
                  <div className="min-w-0 pt-1">{!readOnly && f.editor ? f.editor : (f.value ?? "—")}</div>
                  {f.error && (
                    <span className="field-error" role="alert">
                      {f.error}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </section>
  );
}

/* ── 4.69 HoverCard (also opens on keyboard focus) ── */
export function HoverCard({
  trigger,
  children,
  openDelay = 300,
  closeDelay = 150,
  side = "bottom",
  className,
}: {
  /** Focusable element (rendered via asChild). */
  trigger: React.ReactElement;
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}) {
  return (
    <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardPrimitive.Trigger asChild>{trigger}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content side={side} sideOffset={6} collisionPadding={8} className={cn("z-50 w-72 rounded-md border border-line-strong bg-menu p-3 text-sm text-fg", className)}>
          {children}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}

/* ── 4.101 ProgressSummary ── */
const progressLabels = { todo: "To do", doing: "In progress", done: "Done", summary: (pct: number) => `${pct}% complete` };

export function ProgressSummary({
  todo,
  doing,
  done,
  burndown,
  title,
  text,
}: {
  todo: number;
  doing: number;
  done: number;
  title?: string;
  /** Optional chart (e.g. TimeSeriesChart) rendered under the bar. */
  burndown?: React.ReactNode;
  text?: Partial<typeof progressLabels>;
}) {
  const l = withLabels(progressLabels, text);
  const total = todo + doing + done;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const seg = (n: number, cls: string) => (n > 0 ? <span className={cls} style={{ width: `${(n / total) * 100}%` }} /> : null);
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        {title && <strong className="text-fg">{title}</strong>}
        <span className="ms-auto text-muted">{l.summary(pct)}</span>
      </div>
      <div role="progressbar" aria-label={title ?? l.summary(pct)} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-valuetext={l.summary(pct)} className="flex h-2 overflow-hidden rounded-xs bg-muted-bg">
        {seg(done, "bg-ok")}
        {seg(doing, "bg-primary")}
      </div>
      <ul className="m-0 flex list-none gap-4 p-0 text-xs text-muted">
        <li>{l.done}: {done}</li>
        <li>{l.doing}: {doing}</li>
        <li>{l.todo}: {todo}</li>
      </ul>
      {burndown}
    </div>
  );
}
