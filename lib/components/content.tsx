import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlertCircle, CheckCircle2, ChevronDown, ChevronRight, TriangleAlert, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useLaf, useLafDefaults } from "../i18n";
import { contentEn } from "../messages/content.en";
import { useControllableState } from "../utils";
import { Button, type ButtonProps } from "./button";
import { Input, Textarea } from "./form";
import { CopyButton } from "./helpers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, dialogBase, dialogSizes, type DialogSize } from "./overlay";

const lafDefaults = { content: contentEn };

/* ── Title ── */
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TitleSize = "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
const titleSize: Record<TitleSize, string> = { md: "text-base", lg: "text-lg", xl: "text-xl", "2xl": "text-2xl", "3xl": "text-3xl", "4xl": "text-4xl" };
const defaultTitleSize: Record<HeadingLevel, TitleSize> = { h1: "2xl", h2: "xl", h3: "lg", h4: "md", h5: "md", h6: "md" };

/** Heading with the level (semantics) decoupled from the size (looks), like PatternFly's `Title`. */
export function Title({ headingLevel: Tag = "h2", size, className, ...props }: React.ComponentProps<"h2"> & { headingLevel?: HeadingLevel; size?: TitleSize }) {
  return <Tag className={cn("font-semibold text-fg", titleSize[size ?? defaultTitleSize[Tag]], className)} {...props} />;
}

/* ── Divider ── */
export function Divider({ orientation = "horizontal", className, ...props }: Omit<React.ComponentProps<"hr">, "children"> & { orientation?: "horizontal" | "vertical" }) {
  if (orientation === "vertical") {
    return <div role="separator" aria-orientation="vertical" className={cn("w-px shrink-0 self-stretch bg-line", className)} {...(props as React.ComponentProps<"div">)} />;
  }
  return <hr className={cn("m-0 h-px w-full shrink-0 border-0 bg-line", className)} {...props} />;
}

/* ── Layout primitives: Grid / Flex / Stack ── */
export type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
const gapClass: Record<Gap, string> = { none: "gap-0", xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" };

type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
// Literal class names so Tailwind's scanner sees every utility.
const spans = {
  base: "col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6 col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12".split(" "),
  sm: "sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12".split(" "),
  md: "md:col-span-1 md:col-span-2 md:col-span-3 md:col-span-4 md:col-span-5 md:col-span-6 md:col-span-7 md:col-span-8 md:col-span-9 md:col-span-10 md:col-span-11 md:col-span-12".split(" "),
  lg: "lg:col-span-1 lg:col-span-2 lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 lg:col-span-10 lg:col-span-11 lg:col-span-12".split(" "),
  xl: "xl:col-span-1 xl:col-span-2 xl:col-span-3 xl:col-span-4 xl:col-span-5 xl:col-span-6 xl:col-span-7 xl:col-span-8 xl:col-span-9 xl:col-span-10 xl:col-span-11 xl:col-span-12".split(" "),
  xxl: "2xl:col-span-1 2xl:col-span-2 2xl:col-span-3 2xl:col-span-4 2xl:col-span-5 2xl:col-span-6 2xl:col-span-7 2xl:col-span-8 2xl:col-span-9 2xl:col-span-10 2xl:col-span-11 2xl:col-span-12".split(" "),
};
const rowSpans = "row-span-1 row-span-2 row-span-3 row-span-4 row-span-5 row-span-6".split(" ");

/** 12-column grid; pair with `GridItem`. `gap` defaults to `md` (PatternFly's `hasGutter`). */
export function Grid({ gap = "md", className, ...props }: React.ComponentProps<"div"> & { gap?: Gap }) {
  return <div className={cn("grid grid-cols-12", gapClass[gap], className)} {...props} />;
}

export interface GridItemProps extends React.ComponentProps<"div"> {
  /** Columns at every width (default 12); the breakpoint props apply from that width up. */
  span?: Span;
  sm?: Span;
  md?: Span;
  lg?: Span;
  xl?: Span;
  xxl?: Span;
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function GridItem({ span = 12, sm, md, lg, xl, xxl, rowSpan, className, ...props }: GridItemProps) {
  return (
    <div
      className={cn(
        "min-w-0",
        spans.base[span - 1],
        sm && spans.sm[sm - 1],
        md && spans.md[md - 1],
        lg && spans.lg[lg - 1],
        xl && spans.xl[xl - 1],
        xxl && spans.xxl[xxl - 1],
        rowSpan && rowSpans[rowSpan - 1],
        className,
      )}
      {...props}
    />
  );
}

const justify = { start: "justify-start", end: "justify-end", center: "justify-center", between: "justify-between", around: "justify-around", evenly: "justify-evenly" };
const align = { start: "items-start", end: "items-end", center: "items-center", stretch: "items-stretch", baseline: "items-baseline" };
const selfAlign = { start: "self-start", end: "self-end", center: "self-center", stretch: "self-stretch", baseline: "self-baseline" };
const direction = { row: "flex-row", column: "flex-col", "row-reverse": "flex-row-reverse", "column-reverse": "flex-col-reverse" };

export interface FlexProps extends React.ComponentProps<"div"> {
  direction?: keyof typeof direction;
  justify?: keyof typeof justify;
  align?: keyof typeof align;
  gap?: Gap;
  /** `true` wraps; `false` keeps one line. Defaults to wrapping. */
  wrap?: boolean;
  inline?: boolean;
}

export function Flex({ direction: dir = "row", justify: j, align: a, gap = "sm", wrap = true, inline, className, ...props }: FlexProps) {
  return <div className={cn(inline ? "inline-flex" : "flex", direction[dir], wrap ? "flex-wrap" : "flex-nowrap", j && justify[j], a && align[a], gapClass[gap], className)} {...props} />;
}

export function FlexItem({ grow, shrink = true, align: a, pushEnd, className, ...props }: React.ComponentProps<"div"> & { grow?: boolean; shrink?: boolean; align?: keyof typeof selfAlign; /** Margin-inline-start: auto. */ pushEnd?: boolean }) {
  return <div className={cn("min-w-0", grow && "grow", !shrink && "shrink-0", a && selfAlign[a], pushEnd && "ms-auto", className)} {...props} />;
}

export function Stack({ gap = "md", className, ...props }: React.ComponentProps<"div"> & { gap?: Gap }) {
  return <div className={cn("flex flex-col", gapClass[gap], className)} {...props} />;
}

export function StackItem({ fill, className, ...props }: React.ComponentProps<"div"> & { /** Take the remaining height. */ fill?: boolean }) {
  return <div className={cn(fill && "flex-1", className)} {...props} />;
}

/* ── DescriptionList ── */
type DlLayout = "vertical" | "horizontal" | "grid";
const DlContext = React.createContext<{ layout: DlLayout; compact: boolean }>({ layout: "vertical", compact: false });
const gridCols = { 1: "grid-cols-1", 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" };

export interface DescriptionListProps extends React.ComponentProps<"dl"> {
  /** `vertical` stacks term over description, `horizontal` puts them side by side, `grid` flows groups into columns. */
  layout?: DlLayout;
  /** Columns for `layout="grid"` (collapses on narrow screens). */
  columns?: 1 | 2 | 3 | 4;
  compact?: boolean;
}

export function DescriptionList({ layout = "vertical", columns = 2, compact = false, className, ...props }: DescriptionListProps) {
  const ctx = React.useMemo(() => ({ layout, compact }), [layout, compact]);
  return (
    <DlContext.Provider value={ctx}>
      <dl className={cn("m-0 grid", compact ? "gap-x-4 gap-y-2" : "gap-x-6 gap-y-3.5", layout === "grid" ? gridCols[columns] : "grid-cols-1", className)} {...props} />
    </DlContext.Provider>
  );
}

export function DescriptionListGroup({ className, ...props }: React.ComponentProps<"div">) {
  const { layout } = React.useContext(DlContext);
  return <div className={cn("min-w-0", layout === "horizontal" && "grid grid-cols-[minmax(6rem,12rem)_1fr] gap-x-4", className)} {...props} />;
}

export function DescriptionListTerm({ icon, className, children, ...props }: React.ComponentProps<"dt"> & { icon?: React.ReactNode }) {
  const { layout, compact } = React.useContext(DlContext);
  return (
    <dt className={cn("flex items-center gap-1.5 text-[0.6875rem] tracking-wider text-subtle uppercase", layout !== "horizontal" && (compact ? "mb-0" : "mb-0.5"), className)} {...props}>
      {icon}
      {children}
    </dt>
  );
}

export function DescriptionListDescription({ mono, className, ...props }: React.ComponentProps<"dd"> & { mono?: boolean }) {
  const { compact } = React.useContext(DlContext);
  return <dd className={cn("m-0 min-w-0 break-words text-fg", compact ? "text-xs" : "text-sm", mono && "font-mono break-all", className)} {...props} />;
}

/* ── CodeBlock ── */
function nodeText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (React.isValidElement(node)) return nodeText((node.props as { children?: React.ReactNode }).children);
  return "";
}

/** Marker for PatternFly-style `<CodeBlock><CodeBlockCode>…</CodeBlockCode></CodeBlock>`; the text is read by `CodeBlock`. */
export function CodeBlockCode({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export interface CodeBlockProps {
  /** Source text; alternatively pass it as children (strings or `CodeBlockCode`). */
  code?: string;
  children?: React.ReactNode;
  language?: string;
  lineNumbers?: boolean;
  /** Controlled wrapping; omit for uncontrolled (`defaultWrap`). */
  wrap?: boolean;
  defaultWrap?: boolean;
  onWrapChange?: (wrap: boolean) => void;
  /** Show a toggle for line wrapping. */
  wrapToggle?: boolean;
  /** Max block size before the code scrolls (any CSS length). */
  maxHeight?: string | number;
  /** Set `false` to hide the copy button. */
  copy?: boolean;
  /** Extra header actions (buttons), shown before copy. */
  actions?: React.ReactNode;
  /** Accessible name of the scrollable region; defaults to the language or "Code". */
  label?: string;
  className?: string;
  labels?: { copy?: string; copied?: string; wrap?: string };
}

export function CodeBlock({ code, children, language, lineNumbers, wrap, defaultWrap = false, onWrapChange, wrapToggle, maxHeight, copy = true, actions, label, className, labels }: CodeBlockProps) {
  const { t } = useLafDefaults(lafDefaults);
  const m = t.components.content.codeBlock;
  const text = code ?? nodeText(children);
  const [wrapped, setWrapped] = useControllableState({ value: wrap, defaultValue: defaultWrap, onChange: onWrapChange });
  const lines = text.replace(/\n$/, "").split("\n");
  const hasHeader = !!language || copy || !!actions || wrapToggle;
  return (
    <div className={cn("min-w-0 overflow-hidden rounded-md border border-line bg-input", className)}>
      {hasHeader && (
        <div className="flex items-center gap-1 border-b border-line ps-3 pe-1 py-0.5">
          {language && <span className="text-xs tracking-wider text-subtle uppercase">{language}</span>}
          <span className="ms-auto flex items-center gap-0.5">
            {wrapToggle && (
              <Button variant="ghost" size="sm" aria-pressed={wrapped} onClick={() => setWrapped(!wrapped)}>
                {labels?.wrap ?? m.wrap}
              </Button>
            )}
            {actions}
            {copy && <CopyButton value={text} label={labels?.copy ?? m.copy} copiedLabel={labels?.copied ?? m.copied} />}
          </span>
        </div>
      )}
      <pre
        // Scrollable regions must be keyboard reachable.
        tabIndex={0}
        role="region"
        aria-label={label ?? language ?? m.label}
        style={maxHeight === undefined ? undefined : { maxBlockSize: maxHeight }}
        className={cn("m-0 overflow-auto p-3 font-mono text-[0.8125rem] leading-relaxed text-fg [tab-size:4]", wrapped ? "break-words whitespace-pre-wrap" : "whitespace-pre")}
      >
        <code>
          {lines.map((line, i) => (
            <span
              key={i}
              data-n={i + 1}
              className={cn("block", lineNumbers && "before:me-4 before:inline-block before:w-[3ch] before:text-end before:text-subtle before:content-[attr(data-n)] before:select-none")}
            >
              {line === "" ? " " : line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* ── ClipboardCopy ── */
export interface ClipboardCopyProps {
  /** Text to copy; alternatively pass it as string children. */
  value?: string;
  defaultValue?: string;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
  /** `expandable` reveals the full (multi-line) value; `inline-compact` renders as inline code. */
  variant?: "inline" | "expandable" | "inline-compact";
  readOnly?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onCopy?: (value: string) => void;
  /** Accessible name of the text field. */
  label?: string;
  /** Accessible name of the copy button. */
  hoverTip?: string;
  /** Announced after copying. */
  clickTip?: string;
  className?: string;
  labels?: { expand?: string; collapse?: string };
}

export function ClipboardCopy({
  value,
  defaultValue,
  children,
  onChange,
  variant = "inline",
  readOnly,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  onCopy,
  label,
  hoverTip,
  clickTip,
  className,
  labels,
}: ClipboardCopyProps) {
  const { t } = useLafDefaults(lafDefaults);
  const m = t.components.content.clipboard;
  const [text, setText] = useControllableState({ value, defaultValue: defaultValue ?? nodeText(children), onChange });
  const [open, setOpen] = useControllableState({ value: expanded, defaultValue: defaultExpanded, onChange: onExpandedChange });
  const id = React.useId();
  const copyProps = { value: text, label: hoverTip ?? m.copy, copiedLabel: clickTip ?? m.copied };
  // CopyButton owns the clipboard write; the capture listener reports it without wrapping the component.
  const report = onCopy ? { onClickCapture: () => onCopy(text) } : {};

  if (variant === "inline-compact") {
    return (
      <span className={cn("inline-flex max-w-full items-center rounded-sm border border-line bg-muted-bg ps-1.5 align-middle", className)} {...report}>
        <code className="min-w-0 truncate font-mono text-xs">{text}</code>
        <CopyButton {...copyProps} />
      </span>
    );
  }
  const fieldLabel = label ?? t.value;
  const expandable = variant === "expandable";
  const toggle = open ? (labels?.collapse ?? m.collapse) : (labels?.expand ?? m.expand);
  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-center gap-1" {...report}>
        {expandable && (
          <Button variant="ghost" size="sm" aria-expanded={open} aria-controls={`${id}-full`} aria-label={toggle} onClick={() => setOpen(!open)}>
            <ChevronRight className={cn("size-4 transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90")} aria-hidden />
          </Button>
        )}
        <Input readOnly={readOnly} aria-label={fieldLabel} value={expandable && open ? text.split("\n")[0] : text} onChange={(e) => setText(e.target.value)} className="min-w-0 flex-1 font-mono text-[0.8125rem]" />
        <CopyButton {...copyProps} />
      </div>
      {expandable && open && (
        <Textarea id={`${id}-full`} readOnly={readOnly} aria-label={fieldLabel} value={text} rows={Math.min(12, text.split("\n").length + 1)} onChange={(e) => setText(e.target.value)} className="mt-1 w-full font-mono text-[0.8125rem]" />
      )}
    </div>
  );
}

/* ── Forms: thin wrappers over the existing form styles ── */
export function Form({ className, ...props }: React.ComponentProps<"form">) {
  return <form className={cn("grid gap-4", className)} {...props} />;
}

export interface FormGroupProps {
  label?: React.ReactNode;
  /** Id of the control the label points at. */
  fieldId?: string;
  required?: boolean;
  /** Render a `<fieldset>` + `<legend>` for radio/checkbox groups instead of a `<label>`. */
  fieldset?: boolean;
  /** Content next to the label (help link, optional hint). */
  labelInfo?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  labels?: { required?: string };
}

export function FormGroup({ label, fieldId, required, fieldset, labelInfo, className, children, labels }: FormGroupProps) {
  const { t } = useLafDefaults(lafDefaults);
  const mark = required && (
    <>
      <span aria-hidden="true" className="ms-0.5 text-danger">
        *
      </span>
      {" "}
      <span className="sr-only">({labels?.required ?? t.components.content.form.required})</span>
    </>
  );
  const head =
    label &&
    (fieldset ? (
      // A legend must be a direct child of its fieldset to name it.
      <legend className="form-label flex w-full items-baseline justify-between gap-2 p-0">
        <span>
          {label}
          {mark}
        </span>
        {labelInfo}
      </legend>
    ) : (
      <span className="flex items-baseline justify-between gap-2">
        <label className="form-label" htmlFor={fieldId}>
          {label}
          {mark}
        </label>
        {labelInfo}
      </span>
    ));
  if (fieldset) {
    return (
      <fieldset className={cn("form-group m-0 min-w-0 border-0 p-0", className)}>
        {head}
        {children}
      </fieldset>
    );
  }
  return (
    <div className={cn("form-group", className)}>
      {head}
      {children}
    </div>
  );
}

/** Row for a form's submit/cancel buttons. */
export function ActionGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-wrap items-center gap-2.5 pt-2", className)} {...props} />;
}

export function HelperText({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-0.5", className)} {...props} />;
}

const helperTone = { default: "text-muted", success: "text-ok", warning: "text-warn", error: "text-danger" };
const helperIcon = { default: null, success: CheckCircle2, warning: TriangleAlert, error: AlertCircle };

/** One line of helper/validation text; `error` is announced when it appears. */
export function HelperTextItem({ variant = "default", icon, className, children, ...props }: React.ComponentProps<"p"> & { variant?: keyof typeof helperTone; icon?: React.ReactNode }) {
  const Icon = helperIcon[variant];
  return (
    <p role={variant === "error" ? "alert" : undefined} className={cn("m-0 flex items-center gap-1.5 text-xs", helperTone[variant], className)} {...props}>
      {icon ?? (Icon && <Icon className="size-3.5 shrink-0" aria-hidden />)}
      <span>{children}</span>
    </p>
  );
}

export function FormHelperText({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-1", className)} {...props} />;
}

/** Same controls as `Input` / `Textarea`, under their PatternFly names. */
export { Input as TextInput, Textarea as TextArea } from "./form";

/* ── Dropdown: toggle + items, PatternFly-style composition over the Radix menu ── */
export interface MenuToggleProps extends Omit<ButtonProps, "variant"> {
  variant?: "default" | "plain" | "primary";
  /** Hide the trailing chevron. */
  hideCaret?: boolean;
  expanded?: boolean;
}

export const MenuToggle = React.forwardRef<HTMLButtonElement, MenuToggleProps>(function MenuToggle({ variant = "default", hideCaret, expanded, children, ...props }, ref) {
  return (
    <Button ref={ref} type="button" variant={variant === "primary" ? "primary" : variant === "plain" ? "ghost" : "secondary"} aria-expanded={expanded} {...props}>
      {children}
      {!hideCaret && <ChevronDown className="size-4" aria-hidden />}
    </Button>
  );
});

export interface DropdownProps {
  /** Element that opens the menu (rendered via asChild); typically a `MenuToggle`. */
  toggle: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
  className?: string;
  children?: React.ReactNode;
}

export function Dropdown({ toggle, open, defaultOpen, onOpenChange, align = "start", className, children }: DropdownProps) {
  return (
    <DropdownMenu open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{toggle}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={className}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownList({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function DropdownGroup({ label, children }: { label?: string; children?: React.ReactNode }) {
  return (
    <div role="group" aria-label={label}>
      {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
      {children}
    </div>
  );
}

export function DropdownItem({ icon, description, children, ...props }: React.ComponentProps<typeof DropdownMenuItem> & { icon?: React.ReactNode; description?: React.ReactNode }) {
  return (
    <DropdownMenuItem {...props}>
      {icon}
      <span className="min-w-0 flex-1">
        {children}
        {description && <span className="block text-xs text-muted">{description}</span>}
      </span>
    </DropdownMenuItem>
  );
}

export const DropdownSeparator = DropdownMenuSeparator;

/* ── Modal: Dialog with header/body/footer parts so PatternFly modals port mechanically ── */
const ModalContext = React.createContext<{ setHasDescription(v: boolean): void }>({ setHasDescription() {} });

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called when the modal is dismissed (Escape, overlay, close button). */
  onClose?: () => void;
  size?: DialogSize;
  /** Accessible name when there is no `ModalHeader`. */
  "aria-label"?: string;
  /** Rendered outside the portal; usually a `ModalTrigger asChild` button. */
  trigger?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function Modal({ open, defaultOpen, onOpenChange, onClose, trigger, size = "md", "aria-label": ariaLabel, className, children }: ModalProps) {
  const { portalContainer } = useLaf();
  const [hasDescription, setHasDescription] = React.useState(false);
  const ctx = React.useMemo(() => ({ setHasDescription }), []);
  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(o) => {
        onOpenChange?.(o);
        if (!o) onClose?.();
      }}
    >
      {trigger}
      <DialogPrimitive.Portal container={portalContainer}>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[rgba(5,5,10,0.7)] backdrop-blur-xs" />
        <DialogPrimitive.Content
          aria-label={ariaLabel}
          {...(hasDescription ? {} : { "aria-describedby": undefined })}
          className={cn(dialogBase, dialogSizes[size], className)}
        >
          <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

export function ModalHeader({ title, description, className, children }: { title: React.ReactNode; description?: React.ReactNode; className?: string; children?: React.ReactNode }) {
  const { t } = useLaf();
  const { setHasDescription } = React.useContext(ModalContext);
  const has = !!description;
  React.useEffect(() => {
    setHasDescription(has);
    return () => setHasDescription(false);
  }, [has, setHasDescription]);
  return (
    <div className={cn("popup-head shrink-0", className)}>
      <div className="min-w-0">
        <DialogPrimitive.Title className="popup-title">{title}</DialogPrimitive.Title>
        {description && <DialogPrimitive.Description className="popup-sub">{description}</DialogPrimitive.Description>}
        {children}
      </div>
      <DialogPrimitive.Close className="popup-close" aria-label={t.close}>
        <X className="size-4" aria-hidden />
      </DialogPrimitive.Close>
    </div>
  );
}

export function ModalBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("popup-body min-h-0 overflow-auto", className)} {...props} />;
}

export function ModalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("popup-foot shrink-0", className)} {...props} />;
}
