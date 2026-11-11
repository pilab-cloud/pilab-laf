import * as React from "react";
import { cn } from "../cn";
import { useLafDefaults } from "../i18n";
import { mailEn } from "../messages/mail.en";
import { Badge } from "./display";
import { CopyButton, Progress } from "./helpers";
import { StatusDot } from "./primitives";

const lafDefaults = { mail: mailEn };
const useLaf = () => useLafDefaults(lafDefaults);

/* ── QueueStatusBadge ── */
/** Delivery states of an outbound job, as the storage service reports them (`OutboundJob.status`). */
export type QueueJobStatus = "PENDING" | "DELIVERED" | "TRANSIENT_FAILURE" | "PERMANENT_FAILURE";

const queueTone = { PENDING: "primary", DELIVERED: "ok", TRANSIENT_FAILURE: "warn", PERMANENT_FAILURE: "danger", UNKNOWN: "neutral" } as const;

/** Badge for an outbound queue job status; unknown values render as "Unknown" instead of throwing. */
export function QueueStatusBadge({ status, className }: { status: QueueJobStatus | (string & {}); className?: string }) {
  const { t } = useLaf();
  const key = (status in queueTone ? status : "UNKNOWN") as keyof typeof queueTone;
  return (
    <Badge tone={queueTone[key]} className={className}>
      {t.components.mail.queueStatus[key]}
    </Badge>
  );
}

/* ── QuotaBar ── */
export interface QuotaBarProps {
  usedBytes: number;
  /** 0 (or omitted) means no quota. */
  quotaBytes?: number;
  /** Accessible name of the meter. */
  label?: string;
  warnAt?: number;
  dangerAt?: number;
  className?: string;
}

/** Mailbox storage meter with "x of y (z%)" text; the colour shifts at `warnAt`/`dangerAt` percent. */
export function QuotaBar({ usedBytes, quotaBytes = 0, label, warnAt = 80, dangerAt = 95, className }: QuotaBarProps) {
  const { t, format } = useLaf();
  const m = t.components.mail.quota;
  const limited = quotaBytes > 0;
  const name = label ?? m.label;
  return (
    <div className={cn("grid gap-1", className)}>
      {limited ? <Progress meter label={name} value={usedBytes} max={quotaBytes} warnAt={warnAt} dangerAt={dangerAt} /> : <Progress meter label={name} value={0} max={1} />}
      <p className="m-0 text-xs text-muted tabular-nums">{limited ? m.usage(format.bytes(usedBytes), format.bytes(quotaBytes), format.percent(Math.min(1, usedBytes / quotaBytes), { fractionDigits: 0 })) : m.unlimited(format.bytes(usedBytes))}</p>
    </div>
  );
}

/* ── ServiceTile / HealthGrid ── */
export type ServiceHealth = "up" | "degraded" | "down" | "unknown";

const healthTone = { up: "ok", degraded: "warn", down: "danger", unknown: "neutral" } as const;

export interface ServiceTileProps {
  name: string;
  status: ServiceHealth;
  /** Secondary line, e.g. listener ports or a version. */
  detail?: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}

/** One daemon in a health overview: name, status dot with text (never colour alone) and a detail line. */
export function ServiceTile({ name, status, detail, onSelect, className }: ServiceTileProps) {
  const { t } = useLaf();
  const body = (
    <>
      <span className="min-w-0 truncate font-semibold text-fg">{name}</span>
      <StatusDot tone={healthTone[status]} label={t.components.mail.health.status[status]} pulse={status === "down"} className="text-xs text-muted" />
      {detail !== undefined && <span className="min-w-0 truncate text-xs text-subtle">{detail}</span>}
    </>
  );
  const cls = cn("grid min-w-0 gap-0.5 rounded-md border border-line bg-card px-3 py-2 text-start", onSelect && "cursor-pointer hover:bg-card-hover", className);
  return onSelect ? (
    <button type="button" className={cls} onClick={onSelect}>
      {body}
    </button>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export interface HealthGridProps {
  services: (ServiceTileProps & { id: string })[];
  label?: string;
  className?: string;
}

/** Responsive grid of `ServiceTile`s. */
export function HealthGrid({ services, label, className }: HealthGridProps) {
  const { t } = useLaf();
  return (
    <ul aria-label={label ?? t.components.mail.health.label} className={cn("m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,11rem),1fr))] gap-2 p-0", className)}>
      {services.map(({ id, ...s }) => (
        <li key={id} className="min-w-0">
          <ServiceTile {...s} />
        </li>
      ))}
    </ul>
  );
}

/* ── DnsRecordTable ── */
export type DnsRecordState = "verified" | "missing" | "mismatch" | "optional" | "unknown";

export interface DnsRecord {
  id: string;
  type: "MX" | "TXT" | "CNAME" | "A" | "AAAA" | "SRV" | "TLSA" | (string & {});
  host: string;
  value: string;
  /** What the record is for: "SPF", "DKIM", "DMARC", "MTA-STS" … */
  purpose: string;
  state?: DnsRecordState;
}

const dnsTone = { verified: "ok", missing: "danger", mismatch: "warn", optional: "neutral", unknown: "neutral" } as const;

export interface DnsRecordTableProps {
  records: DnsRecord[];
  label?: string;
  className?: string;
}

/** Records a domain must publish, each value with a copy button and a verification badge. */
export function DnsRecordTable({ records, label, className }: DnsRecordTableProps) {
  const { t } = useLaf();
  const m = t.components.mail.dns;
  if (!records.length) return <p className="m-0 text-sm text-muted">{m.empty}</p>;
  return (
    <div className={cn("table-wrap", className)}>
      <table className="table" aria-label={label ?? m.label}>
        <thead>
          <tr>
            <th scope="col">{m.purpose}</th>
            <th scope="col">{m.type}</th>
            <th scope="col">{m.host}</th>
            <th scope="col">{m.value}</th>
            <th scope="col">{m.status}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => {
            const state = r.state ?? "unknown";
            return (
              <tr key={r.id}>
                <th scope="row" className="font-semibold">
                  {r.purpose}
                </th>
                <td className="font-mono text-xs">{r.type}</td>
                <td className="font-mono text-xs break-all">{r.host}</td>
                <td>
                  <span className="flex min-w-0 items-start gap-1">
                    <code className="min-w-0 max-w-xs break-all text-xs">{r.value}</code>
                    <CopyButton value={r.value} label={m.copy(r.host)} copiedLabel={m.copied} />
                  </span>
                </td>
                <td>
                  <Badge tone={dnsTone[state]}>{m.state[state]}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── TraceTimeline ── */
export interface TraceHop {
  id: string;
  time: Date | string | number;
  label: React.ReactNode;
  detail?: React.ReactNode;
  tone?: "ok" | "warn" | "danger" | "neutral" | "primary";
  /** Milliseconds since the first hop; shown as "+120 ms". */
  elapsedMs?: number;
}

export interface TraceTimelineProps {
  hops: TraceHop[];
  label?: string;
  className?: string;
}

/** Ordered hop list of one message or request (SMTP accept → queue → relay → delivered). */
export function TraceTimeline({ hops, label, className }: TraceTimelineProps) {
  const { t, format } = useLaf();
  const m = t.components.mail.timeline;
  if (!hops.length) return <p className="m-0 text-sm text-muted">{m.empty}</p>;
  return (
    <ol aria-label={label ?? m.label} className={cn("m-0 grid list-none gap-0 p-0", className)}>
      {hops.map((h, i) => (
        <li key={h.id} className="relative grid grid-cols-[auto_1fr] gap-x-3 pb-3 last:pb-0">
          <span className="flex flex-col items-center" aria-hidden>
            <span className={cn("mt-1.5 size-2.5 shrink-0 rounded-xs", { ok: "bg-ok", warn: "bg-warn", danger: "bg-danger", neutral: "bg-muted", primary: "bg-primary" }[h.tone ?? "primary"])} />
            {i < hops.length - 1 && <span className="mt-1 w-px flex-1 bg-line" />}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
              <span className="font-semibold text-fg">{h.label}</span>
              <time className="text-xs text-subtle tabular-nums" dateTime={new Date(h.time).toISOString()}>
                {format.dateTime(h.time, { timeStyle: "medium" })}
              </time>
              {h.elapsedMs !== undefined && <span className="text-xs text-muted tabular-nums">{m.elapsed(format.duration(h.elapsedMs))}</span>}
            </div>
            {h.detail !== undefined && <div className="text-xs break-words text-muted">{h.detail}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
