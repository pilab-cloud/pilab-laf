import { AlertCircle } from "lucide-react";
import * as React from "react";
import { Card, CardActions, CardBody, CardFooter, CardHeader, CardTitle } from "../components/card";
import { SegmentedBar, type BarSegment } from "./segmented-bar";
import { ThresholdDonut } from "./threshold-donut";
import { useChartLaf, type ChartAnimate, type ChartTooltipOption } from "./chart-kit";

interface UtilizationBase {
  title: React.ReactNode;
  /** Filter control (e.g. a `Dropdown` with a `MenuToggle`) placed at the end of the header. */
  filter?: React.ReactNode;
  /** "See details" link target; or use `onDetails`. */
  detailsHref?: string;
  onDetails?: () => void;
  headingLevel?: 2 | 3 | 4;
  /** Forwarded to the bar / ring: entry + value-change animation (default on, off under reduced motion). */
  animate?: ChartAnimate;
  /** Forwarded to the bar / ring tooltip. */
  tooltip?: ChartTooltipOption;
  className?: string;
}

export interface UtilizationBarCardProps extends UtilizationBase {
  variant?: "bar";
  /** Small heading under the title, e.g. "System". */
  subtitle?: React.ReactNode;
  /** Alert line with a danger icon, e.g. "25 incidents detected". */
  alertText?: React.ReactNode;
  onAlertClick?: () => void;
  alertHref?: string;
  segments: BarSegment[];
  formatValue?: (v: number) => string;
  /** Accessible name of the bar; default the card title when it is a string. */
  chartLabel?: string;
}

export interface UtilizationDonutCardProps extends UtilizationBase {
  variant: "donut";
  value: number;
  max?: number;
  warnAt?: number;
  dangerAt?: number;
  subtext?: React.ReactNode;
  chartLabel?: string;
}

export type UtilizationCardProps = UtilizationBarCardProps | UtilizationDonutCardProps;

const linkClass = "text-sm text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-primary";

function DetailsLink({ href, onClick, children }: { href?: string; onClick?: () => void; children: React.ReactNode }) {
  if (!href && !onClick) return null;
  return href ? (
    <a href={href} onClick={onClick} className={linkClass}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={`${linkClass} cursor-pointer border-0 bg-transparent p-0`}>
      {children}
    </button>
  );
}

/** PatternFly-style utilization card: `variant="bar"` (segmented severity bar) or `variant="donut"` (threshold ring). */
export function UtilizationCard(props: UtilizationCardProps) {
  const { t } = useChartLaf();
  const u = t.components.dashboard.utilization;
  const { title, filter, detailsHref, onDetails, headingLevel = 3, animate, tooltip, className } = props;
  const label = props.chartLabel ?? (typeof title === "string" ? title : u.segments);
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle as={`h${headingLevel}` as "h3"} className="flex-1">
          {title}
        </CardTitle>
        {filter && <CardActions>{filter}</CardActions>}
      </CardHeader>
      <CardBody className="grid gap-2">
        {props.variant === "donut" ? (
          <ThresholdDonut value={props.value} max={props.max} warnAt={props.warnAt} dangerAt={props.dangerAt} subtext={props.subtext} label={label} animate={animate} tooltip={tooltip} />
        ) : (
          <>
            {props.subtitle && <div className="text-fg">{props.subtitle}</div>}
            {props.alertText && (
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle aria-hidden className="size-4 shrink-0 text-danger" />
                {props.alertHref || props.onAlertClick ? (
                  <DetailsLink href={props.alertHref} onClick={props.onAlertClick}>
                    {props.alertText}
                  </DetailsLink>
                ) : (
                  <span>{props.alertText}</span>
                )}
              </div>
            )}
            <SegmentedBar segments={props.segments} label={label} formatValue={props.formatValue} animate={animate} tooltip={tooltip} />
          </>
        )}
      </CardBody>
      {(detailsHref || onDetails) && (
        <CardFooter>
          <DetailsLink href={detailsHref} onClick={onDetails}>
            {u.seeDetails}
          </DetailsLink>
        </CardFooter>
      )}
    </Card>
  );
}
