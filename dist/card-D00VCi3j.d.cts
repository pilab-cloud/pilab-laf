import * as React from 'react';

type CardVariant = "default" | "outlined" | "elevated" | "flat";
type CardStatus = "ok" | "warn" | "danger" | "info" | "neutral";
interface CardProps extends Omit<React.ComponentProps<"div">, "onSelect"> {
    /** Omit for the original centred "auth" card; any value switches to the dashboard card family. */
    variant?: CardVariant;
    compact?: boolean;
    /** Coloured accent on the inline-start edge; the status is never conveyed by colour alone, so add text in the card too. */
    status?: CardStatus;
    /** Toggle-card: renders `role="checkbox"`; do not nest interactive controls inside. */
    selectable?: boolean;
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
    /** Makes the whole card a link. */
    href?: string;
    /** Skeleton instead of the children; sets `aria-busy`. */
    loading?: boolean;
    /** Number of skeleton lines while loading. */
    skeletonLines?: number;
}
declare function Card(props: CardProps): React.JSX.Element;
declare function CardHeader({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function CardTitle({ as: Tag, className, ...props }: React.ComponentProps<"h3"> & {
    as?: "h2" | "h3" | "h4" | "div";
}): React.JSX.Element;
declare function CardDescription({ className, ...props }: React.ComponentProps<"p">): React.JSX.Element;
declare function CardActions({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function CardBody({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function CardFooter({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
/** Responsive grid of cards: as many columns of at least `min` as fit. */
declare function CardGrid({ min, className, style, ...props }: React.ComponentProps<"div"> & {
    min?: string;
}): React.JSX.Element;
interface ExpandableCardProps extends Omit<CardProps, "title" | "onSelect"> {
    title: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    headingLevel?: 2 | 3 | 4;
    footer?: React.ReactNode;
}
/** Card whose body toggles via a disclosure button in the header. */
declare function ExpandableCard({ title, description, actions, open: openProp, defaultOpen, onOpenChange, headingLevel, footer, children, variant, ...props }: ExpandableCardProps): React.JSX.Element;

export { type CardProps as C, ExpandableCard as E, Card as a, CardActions as b, CardBody as c, CardDescription as d, CardFooter as e, CardGrid as f, CardHeader as g, type CardStatus as h, CardTitle as i, type CardVariant as j, type ExpandableCardProps as k };
