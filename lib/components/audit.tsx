import * as React from "react";
import { cn } from "../cn";
import { Badge } from "./display";

export type Severity = "ok" | "warn" | "danger" | "neutral";

export interface AuditEvent {
  id: string;
  time: string;
  /** Group heading, e.g. "Today". Events with the same day are grouped. */
  day: string;
  severity: Severity;
  icon: React.ReactNode;
  actor: string;
  action: string;
  target?: string;
  result?: string;
  details?: Record<string, string>;
}

const iconTone: Record<Severity, string> = { ok: "ok", warn: "warn", danger: "danger", neutral: "" };
const badgeTone = { ok: "ok", warn: "warn", danger: "danger", neutral: "neutral" } as const;

export function AuditLog({ events }: { events: AuditEvent[] }) {
  const days = [...new Set(events.map((e) => e.day))];
  return (
    <div className="audit">
      {days.map((day) => (
        <React.Fragment key={day}>
          <div className="audit-day">{day}</div>
          {events
            .filter((e) => e.day === day)
            .map((e) => (
              <details key={e.id} className="audit-row">
                <summary>
                  <span className="audit-time">{e.time}</span>
                  <span className={cn("audit-icon", iconTone[e.severity])}>{e.icon}</span>
                  <span className="audit-event">
                    <b>{e.actor}</b> {e.action}
                    {e.target && <small>{e.target}</small>}
                  </span>
                  {e.result ? <Badge tone={badgeTone[e.severity]}>{e.result}</Badge> : <span />}
                </summary>
                {e.details && (
                  <dl className="audit-detail">
                    {Object.entries(e.details).map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </details>
            ))}
        </React.Fragment>
      ))}
    </div>
  );
}
