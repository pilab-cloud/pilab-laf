import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./overlay";
import { useLaf } from "../i18n";

/* ── Calendar-popover date picker (value is ISO yyyy-mm-dd) ── */
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

export interface DateRangeValue {
  from?: string;
  to?: string;
}

interface DatePickerCommon {
  label?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  /** Extra disabled days, given as `yyyy-mm-dd`. */
  disabledDates?: (date: string) => boolean;
  /** Show the active time-zone label (default: on for datetime/range). */
  showTimeZone?: boolean;
}
export type DatePickerProps = DatePickerCommon &
  (
    | { mode?: "date"; value?: string; onChange: (value: string) => void }
    | { mode: "datetime"; /** `yyyy-mm-ddThh:mm` */ value?: string; onChange: (value: string) => void }
    | { mode: "range"; value?: DateRangeValue; onChange: (value: DateRangeValue) => void }
  );

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function DatePicker(props: DatePickerProps) {
  const { label: labelProp, placeholder: placeholderProp, min, max, disabledDates, showTimeZone } = props;
  const mode = props.mode ?? "date";
  const { t: laf, timeZone } = useLaf();
  const label = labelProp ?? laf.chooseDate;
  const placeholder = placeholderProp ?? laf.datePlaceholder;
  const [open, setOpen] = React.useState(false);
  const range: DateRangeValue = mode === "range" ? ((props.value as DateRangeValue | undefined) ?? {}) : {};
  const single = mode === "range" ? undefined : (props.value as string | undefined);
  const day = mode === "range" ? range.from : single?.slice(0, 10);
  const time = mode === "datetime" ? (single?.slice(11, 16) || "00:00") : "00:00";
  const base = day ? new Date(`${day}T00:00:00`) : new Date();
  const [view, setView] = React.useState({ y: base.getFullYear(), m: base.getMonth() });
  const [typed, setTyped] = React.useState<string | null>(null);
  const first = new Date(view.y, view.m, 1);
  const offset = (first.getDay() + 6) % 7; // Monday first
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((offset + days) / 7) * 7 }, (_, i) => i - offset + 1);
  const shift = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const title = first.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const isDisabled = (v: string) => (min !== undefined && v < min) || (max !== undefined && v > max) || !!disabledDates?.(v);

  const commitDay = (v: string) => {
    if (props.mode === "range") {
      if (!range.from || range.to) {
        props.onChange({ from: v });
      } else {
        props.onChange(v < range.from ? { from: v, to: range.from } : { from: range.from, to: v });
        setOpen(false);
      }
    } else if (props.mode === "datetime") {
      props.onChange(`${v}T${time}`);
    } else {
      props.onChange(v);
      setOpen(false);
    }
  };
  const commitTyped = () => {
    if (typed !== null && ISO_DATE.test(typed) && !isDisabled(typed) && !Number.isNaN(new Date(`${typed}T00:00:00`).getTime())) {
      commitDay(typed);
      const d = new Date(`${typed}T00:00:00`);
      setView({ y: d.getFullYear(), m: d.getMonth() });
    }
    setTyped(null);
  };
  const text =
    mode === "range"
      ? range.from && `${range.from} – ${range.to ?? "…"}`
      : mode === "datetime"
        ? single && single.replace("T", " ")
        : single;
  const inRange = (v: string) => mode === "range" && !!range.from && !!range.to && v >= range.from && v <= range.to;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" aria-label={label} className={cn("input inline-flex items-center text-start font-mono", mode === "date" ? "w-44" : "w-56")}>
          {text || <span className="text-muted">{placeholder}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        {mode !== "range" && (
          <input
            type="text"
            inputMode="numeric"
            aria-label={label}
            placeholder={laf.datePlaceholder}
            className="form-input mb-2 h-8 font-mono"
            value={typed ?? day ?? ""}
            onChange={(e) => setTyped(e.target.value)}
            onBlur={commitTyped}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitTyped();
              }
            }}
          />
        )}
        <div className="mb-2 flex items-center justify-between">
          <Button variant="ghost" size="sm" aria-label={laf.previousMonth} onClick={() => shift(-1)}>
            <ChevronLeft size={14} />
          </Button>
          <span className="text-sm font-medium" aria-live="polite">{title}</span>
          <Button variant="ghost" size="sm" aria-label={laf.nextMonth} onClick={() => shift(1)}>
            <ChevronRight size={14} />
          </Button>
        </div>
        <div role="grid" aria-label={title} className="grid grid-cols-7 gap-0.5 text-center text-xs">
          {laf.weekdaysShort.map((d) => (
            <span key={d} role="columnheader" className="py-1 text-muted">{d}</span>
          ))}
          {cells.map((d, i) => {
            if (d < 1 || d > days) return <span key={i} role="gridcell" />;
            const v = iso(view.y, view.m, d);
            const selected = v === day || (mode === "range" && v === range.to);
            return (
              <button
                key={i}
                type="button"
                role="gridcell"
                disabled={isDisabled(v)}
                aria-selected={selected || inRange(v)}
                aria-label={v}
                onClick={() => commitDay(v)}
                className={cn(
                  "h-8 rounded-sm border-0 bg-transparent font-mono text-fg hover:bg-muted-bg disabled:opacity-40",
                  inRange(v) && "bg-primary-light",
                  selected && "bg-primary text-primary-fg hover:bg-primary",
                )}
              >
                {d}
              </button>
            );
          })}
        </div>
        {mode === "datetime" && (
          <input
            type="time"
            aria-label={laf.timeOfDay}
            className="form-input mt-2 h-8 font-mono"
            value={time}
            onChange={(e) => props.onChange(`${day ?? iso(base.getFullYear(), base.getMonth(), base.getDate())}T${e.target.value || "00:00"}`)}
          />
        )}
        {(showTimeZone ?? mode !== "date") && <div className="mt-2 text-xs text-muted">{timeZone}</div>}
      </PopoverContent>
    </Popover>
  );
}

/* ── Stacked bar chart ── */
export function StackedBarChart({
  data,
  series,
  label,
}: {
  data: { name: string; values: number[] }[];
  series: string[];
  label: string;
}) {
  const max = Math.max(...data.map((d) => d.values.reduce((a, b) => a + b, 0)), 1);
  const tones = ["bg-primary", "bg-ok", "bg-warn", "bg-danger"];
  return (
    <figure aria-label={label} className="m-0 grid gap-2">
      <ul className="m-0 grid list-none gap-2 p-0">
        {data.map((d) => (
          <li key={d.name} className="grid grid-cols-[6rem_1fr] items-center gap-2 text-xs text-muted">
            <span className="truncate">{d.name}</span>
            <span className="flex h-3 overflow-hidden rounded-sm bg-muted-bg">
              {d.values.map((v, i) => (
                <span
                  key={i}
                  title={`${series[i]}: ${v}`}
                  className={cn("block h-full", tones[i % tones.length])}
                  style={{ width: `${(v / max) * 100}%` }}
                />
              ))}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="flex gap-3 text-xs text-muted">
        {series.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-1">
            <span className={cn("size-2 rounded-sm", tones[i % tones.length])} aria-hidden /> {s}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

/* ── Heatmap (values 0..max) ── */
export function Heatmap({
  rows,
  columns,
  values,
  label,
  max,
}: {
  rows: string[];
  columns: string[];
  values: number[][];
  label: string;
  max?: number;
}) {
  const top = max ?? Math.max(...values.flat(), 1);
  return (
    <div role="table" aria-label={label} className="inline-grid gap-0.5 text-xs text-muted" style={{ gridTemplateColumns: `6rem repeat(${columns.length}, 2rem)` }}>
      <span />
      {columns.map((c) => (
        <span key={c} role="columnheader" className="text-center">{c}</span>
      ))}
      {rows.map((r, ri) => (
        <React.Fragment key={r}>
          <span role="rowheader" className="truncate">{r}</span>
          {columns.map((c, ci) => {
            const v = values[ri]?.[ci] ?? 0;
            return (
              <span
                key={c}
                role="cell"
                title={`${r} ${c}: ${v}`}
                aria-label={`${r} ${c}: ${v}`}
                className="h-6 rounded-sm bg-primary"
                style={{ opacity: 0.1 + 0.9 * (v / top) }}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
