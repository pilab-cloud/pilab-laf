import { ClassValue } from 'clsx';
import { F as Formatters, C as ChartAnimate, a as ChartTooltipOption } from './perf-panel-WnUE1l-N.js';
export { B as BytesOptions, D as DateTimeOptions, z as DurationOptions, R as RelativeOptions, A as createFormatters } from './perf-panel-WnUE1l-N.js';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { C as ComboboxOption, K as Kbd, t as trackerEn, u as uiEn, p as portalEn, N as NotificationCenterProps } from './i18n-CWjDK5Jp.js';
export { A as AccountSession, a as AlarmItem, b as AlarmList, c as AllowListEditor, d as AllowListEditorProps, e as ApiKeyCreateInput, f as ApiKeyItem, g as ApiKeyManager, h as ApiKeyManagerLabels, i as ApiKeyManagerProps, B as BarChart, j as Branding, k as BrandingEditor, l as BrandingEditorLabels, m as BrandingEditorProps, n as CidrInput, o as ColorField, q as ColorFieldLabels, r as ColorFieldProps, s as Combobox, v as ComboboxProps, w as ComponentMessageOverrides, x as ComponentMessages, y as ConsoleEvent, z as ConsoleFrame, D as ConsoleFrameLabels, E as ConsoleFrameProps, F as ConsoleStatus, G as DatastoreBrowser, H as DatastoreBrowserLabels, I as DatastoreBrowserProps, J as DatastoreEntry, L as DateTimeInput, M as Device, O as DeviceKind, P as DeviceSelector, Q as Donut, R as ErrorSummary, S as EventConsole, T as EventConsoleLabels, U as EventConsoleProps, V as EventSeverity, W as FileDropzone, X as FormField, Y as Gauge, Z as HardwareCapabilities, _ as HardwareEditor, $ as HardwareEditorLabels, a0 as HardwareEditorProps, a1 as HwDevice, a2 as HwKind, a3 as InlineEdit, a4 as IpInput, a5 as LafContextValue, a6 as LafMessages, a7 as LafProvider, a8 as NetworkLabels, a9 as NotificationCenter, aa as NotificationCenterLabels, ab as NotificationItem, ac as PasskeyItem, ad as PermissionAssignDialog, ae as PermissionAssignDialogProps, af as PermissionAssignLabels, ag as PermissionAssignment, ah as PermissionRole, ai as ReauthDialog, aj as ReauthDialogLabels, ak as ReauthDialogProps, al as ReauthMethod, am as SecurityFactors, an as SecurityFactorsLabels, ao as SecurityFactorsProps, ap as SessionExpiryDialog, aq as SessionExpiryDialogLabels, ar as SessionExpiryDialogProps, as as SessionList, at as SessionListLabels, au as SessionListProps, av as SnapshotNode, aw as SnapshotTree, ax as SnapshotTreeLabels, ay as SnapshotTreeProps, az as TransferItem, aA as TransferList, aB as TransferListLabels, aC as TransferListProps, aD as UploadFile, aE as User, aF as UserSelector, aG as UserSelectorProps, aH as contrastRatio, aI as en, aJ as isCidr, aK as isIPv4, aL as isIPv6, aM as isIp, aN as normalizeHex, aO as parseCidr, aP as useLaf, aQ as useLafDefaults, aR as usePortalContainer } from './i18n-CWjDK5Jp.js';
import * as ContextPrimitive from '@radix-ui/react-context-menu';
import { Virtualizer } from '@tanstack/react-virtual';
import { O as ObjectKind, a as ObjectState, b as ObjectGlyph } from './object-icon-1uNCkZBX.js';
export { C as ClusterGlyph, D as DatacenterGlyph, c as ObjectIcon, d as ObjectIconProps, e as ObjectStateMeta, S as ServerGlyph, f as StateBadge, T as TemplateGlyph, V as VmGlyph, o as objectKinds, g as objectStateMeta, h as objectStates, r as registerObjectKind } from './object-icon-1uNCkZBX.js';
import { M as MenuItemSpec$1, a as TreeViewProps } from './tree-Cv6L-PZI.js';
export { T as TreeDragAdapter, b as TreeDropPosition, c as TreeNode, d as TreeStatus, e as TreeView } from './tree-Cv6L-PZI.js';
import { C as CardProps } from './card-D00VCi3j.js';
export { a as Card, b as CardActions, c as CardBody, d as CardDescription, e as CardFooter, f as CardGrid, g as CardHeader, h as CardStatus, i as CardTitle, j as CardVariant, E as ExpandableCard, k as ExpandableCardProps } from './card-D00VCi3j.js';
import 'lucide-react';

declare function cn(...inputs: ClassValue[]): string;

/** Works controlled (value !== undefined) or uncontrolled (defaultValue). */
declare function useControllableState<T>({ value, defaultValue, onChange, }: {
    value?: T;
    defaultValue: T;
    onChange?: (next: T) => void;
}): [T, (next: T | ((prev: T) => T)) => void];

/** Default formatters (browser locale/time zone); `useLaf().format` binds the provider's. */
declare const format: Formatters;
/** Line diff via LCS. */
type DiffOp = {
    type: "same" | "add" | "del";
    text: string;
};
declare function diffLines(before: string, after: string): DiffOp[];
/** Whether a file matches an `accept` attribute value (extensions, MIME types, wildcards). */
declare function matchesAccept(file: {
    name: string;
    type: string;
}, accept?: string): boolean;

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "ghost" | "danger" | null | undefined;
    size?: "md" | "sm" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare function Button({ className, variant, size, fullWidth, asChild, loading, leftIcon, rightIcon, disabled, children, type, ...props }: ButtonProps): React.JSX.Element;

interface FieldProps {
    label: string;
    hint?: string;
    error?: string;
    htmlFor?: string;
    className?: string;
    children: React.ReactNode;
}
/** Label + control + hint/error. Pass the same `htmlFor` as the control's `id`. */
declare function Field({ label, hint, error, htmlFor, className, children }: FieldProps): React.JSX.Element;
interface InputProps extends React.ComponentProps<"input"> {
    invalid?: boolean;
}
declare function Input({ className, invalid, ...props }: InputProps): React.JSX.Element;
declare function Textarea({ className, invalid, ...props }: React.ComponentProps<"textarea"> & {
    invalid?: boolean;
}): React.JSX.Element;
/** Search input with a leading icon, e.g. in a Toolbar. */
declare function SearchInput({ className, icon, ...props }: React.ComponentProps<"input"> & {
    icon: React.ReactNode;
}): React.JSX.Element;
/** Native select, restyled. Prefer for short lists and mobile. */
declare function Select({ className, ...props }: React.ComponentProps<"select">): React.JSX.Element;
declare function Checkbox({ children, className, ...props }: React.ComponentProps<"input"> & {
    children?: React.ReactNode;
}): React.JSX.Element;
/** Immediate on/off setting. Use Checkbox for values submitted with a form. */
declare function Switch({ children, className, ...props }: Omit<React.ComponentProps<"input">, "type"> & {
    children?: React.ReactNode;
}): React.JSX.Element;
interface RadioProps extends Omit<React.ComponentProps<"input">, "type"> {
    hint?: string;
}
declare function Radio({ children, hint, className, ...props }: RadioProps): React.JSX.Element;
interface RadioGroupProps {
    name: string;
    value?: string;
    onValueChange?: (value: string) => void;
    options: {
        value: string;
        label: React.ReactNode;
        hint?: string;
        disabled?: boolean;
    }[];
    "aria-label"?: string;
    className?: string;
}
/** Controlled radio group built from native inputs (arrow-key navigation comes from the browser). */
declare function RadioGroup({ name, value, onValueChange, options, className, ...rest }: RadioGroupProps): React.JSX.Element;

/** `error`/`danger` and `warn`/`warning` are aliases (the original `Alert` used `error`/`warning`, `Banner` used `warn`). */
type AlertTone = "info" | "success" | "warning" | "warn" | "danger" | "error" | "neutral";
interface AlertProps {
    tone?: AlertTone;
    /** Alias of `tone`; wins when both are given. */
    variant?: AlertTone;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Buttons/links shown below the text. */
    actions?: React.ReactNode;
    /** Shows a close button. */
    onClose?: () => void;
    closeLabel?: string;
    /** Tighter padding, no icon spacing. */
    compact?: boolean;
    /** No box: just icon and text, for use inside forms and cards. */
    inline?: boolean;
    /** Extra content revealed by a "Show details" disclosure. */
    detail?: React.ReactNode;
    /** Overrides the severity-based role (`alert` for warning/danger, `status` otherwise). */
    role?: "alert" | "status" | "note";
    className?: string;
    children?: React.ReactNode;
}
declare function Alert({ tone, variant, title, description, actions, onClose, closeLabel, compact, inline, detail, role, className, children }: AlertProps): React.JSX.Element;
/** Vertical stack of alerts; with `max`, the rest hide behind a "Show N more" button. */
declare function AlertGroup({ max, label, className, children }: {
    max?: number;
    label?: string;
    className?: string;
    children: React.ReactNode;
}): React.JSX.Element;
/** Page-wide message above the app chrome. `danger` is announced assertively (`role="alert"`), the rest politely. */
declare function Banner({ tone, action, onDismiss, dismissLabel, sticky, className, children, }: {
    tone?: AlertTone;
    action?: React.ReactNode;
    onDismiss?: () => void;
    dismissLabel?: string;
    /** Sticks to the top of the scroll container. */
    sticky?: boolean;
    className?: string;
    children: React.ReactNode;
}): React.JSX.Element;

declare const badgeClass: {
    readonly neutral: "";
    readonly ok: "badge-ok";
    readonly warn: "badge-warn";
    readonly danger: "badge-danger";
    readonly primary: "badge-primary";
};
declare function Badge({ tone, plain, className, children, }: {
    tone?: keyof typeof badgeClass;
    plain?: boolean;
    className?: string;
    children: React.ReactNode;
}): React.JSX.Element;
declare function Avatar({ name, src, size, className, }: {
    name: string;
    src?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}): React.JSX.Element;

declare function Panel({ title, actions, children, className, bodyClassName, headingLevel, }: {
    /** Heading level of the title; pick the one that follows the page's outline. */
    headingLevel?: 2 | 3 | 4;
    title?: React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    bodyClassName?: string;
}): React.JSX.Element;
declare function Stat({ label, value, delta, down, }: {
    label: string;
    value: React.ReactNode;
    delta?: string;
    down?: boolean;
}): React.JSX.Element;
declare function StatGrid({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
declare function EmptyState({ icon, title, description, action, }: {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}): React.JSX.Element;
/** Single-line text that shows its full content in a tooltip while it is actually truncated. */
declare function TruncatedText({ children, text, className }: {
    children?: React.ReactNode;
    text?: string;
    className?: string;
}): React.JSX.Element;
interface BreadcrumbItemProps {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    icon?: React.ReactNode;
    /** Router-link escape hatch: return your `<Link>`; spread `props` onto it. */
    render?: (props: {
        className: string;
        children: React.ReactNode;
        href?: string;
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
        "aria-current"?: "page";
    }) => React.ReactElement;
    /** Overrides the default "last item is the current page". */
    current?: boolean;
}
declare function Breadcrumb({ items, maxItems, label, separator, }: {
    items: BreadcrumbItemProps[];
    maxItems?: number;
    label?: string;
    /** Replaces the default "/" between items; decorative. */
    separator?: React.ReactNode;
}): React.JSX.Element;
declare function PageHead({ title, description, actions, breadcrumb, }: {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    breadcrumb?: React.ReactNode;
}): React.JSX.Element;

declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
/** Width presets for dialogs. `full` fills the viewport; every size shrinks to the viewport on small screens. */
declare const dialogSizes: {
    readonly xs: "max-w-xs";
    readonly sm: "max-w-sm";
    readonly md: "max-w-md";
    readonly lg: "max-w-2xl";
    readonly xl: "max-w-4xl";
    readonly "2xl": "max-w-6xl";
    readonly full: "max-w-none h-[calc(100dvh-2rem)]";
};
type DialogSize = keyof typeof dialogSizes;
declare const dialogBase = "popup fixed top-1/2 start-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col rtl:translate-x-1/2";
declare function DialogContent({ title, description, footer, children, className, size, ...props }: Omit<React.ComponentProps<typeof DialogPrimitive.Content>, "title"> & {
    title: string;
    description?: string;
    footer?: React.ReactNode;
    /** Width preset; defaults to `md`. */
    size?: DialogSize;
}): React.JSX.Element;
declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverClose: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare function PopoverContent({ title, footer, children, className, align, ...props }: Omit<React.ComponentProps<typeof PopoverPrimitive.Content>, "title"> & {
    title?: string;
    footer?: React.ReactNode;
}): React.JSX.Element;
declare const DropdownMenu: React.FC<DropdownPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare function DropdownMenuContent({ className, align, ...props }: React.ComponentProps<typeof DropdownPrimitive.Content>): React.JSX.Element;
declare function DropdownMenuItem({ danger, className, ...props }: React.ComponentProps<typeof DropdownPrimitive.Item> & {
    danger?: boolean;
}): React.JSX.Element;
declare function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof DropdownPrimitive.Label>): React.JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownPrimitive.Separator>): React.JSX.Element;
declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>>;
declare function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>): React.JSX.Element;
declare function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>): React.JSX.Element;
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare function Tooltip({ content, children, side, open, onOpenChange, }: {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    /** Controlled open state, e.g. to show the tooltip only while the text is truncated. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}): React.JSX.Element;

declare function Table({ className, children, ...props }: React.ComponentProps<"table">): React.JSX.Element;
declare function UserCell({ name, email }: {
    name: string;
    email?: string;
}): React.JSX.Element;
interface PaginationProps {
    page: number;
    pageCount: number;
    total?: number;
    pageSize?: number;
    onPageChange: (page: number) => void;
}
declare function Pagination({ page, pageCount, total, pageSize, onPageChange }: PaginationProps): React.JSX.Element;
declare function AdminShell({ sidebar, topbar, children, }: {
    sidebar: React.ReactNode;
    topbar?: React.ReactNode;
    children: React.ReactNode;
}): React.JSX.Element;
declare function NavGroup({ label }: {
    label: string;
}): React.JSX.Element;
declare function NavLink({ icon, current, badge, className, children, ...props }: React.ComponentProps<"a"> & {
    icon?: React.ReactNode;
    current?: boolean;
    badge?: React.ReactNode;
}): React.JSX.Element;

type Severity = "ok" | "warn" | "danger" | "neutral";
interface AuditEvent {
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
declare function AuditLog({ events }: {
    events: AuditEvent[];
}): React.JSX.Element;

declare function Spinner({ size, label: labelProp, className, }: {
    size?: "sm" | "md" | "lg";
    label?: string;
    className?: string;
}): React.JSX.Element;
declare function Skeleton({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
type ToastTone = "success" | "error" | "warning" | "info";
interface ToastOptions {
    tone?: ToastTone;
    title: React.ReactNode;
    /** Secondary line under the title. */
    description?: React.ReactNode;
    /** Close button; default true. */
    dismissible?: boolean;
    /** Called when the toast goes away for any reason (timeout, close button, action, `dismiss`). */
    onClose?: () => void;
    action?: {
        label: string;
        onClick: () => void;
    };
    /** ms; defaults to 4000 (8000 for errors). 0 keeps the toast until dismissed. */
    duration?: number;
}
interface ToastContextValue {
    toast: (options: ToastOptions) => number;
    dismiss: (id: number) => void;
    dismissAll: () => void;
}
/** Alias of `useToast` (same API: `toast`, `dismiss`, `dismissAll`). */
declare function useToasts(): ToastContextValue;
declare function useToast(): ToastContextValue;
declare const positionClass: {
    "bottom-end": string;
    "bottom-start": string;
    "top-end": string;
    "top-start": string;
};
/**
 * Mount once near the app root; render toasts with `useToast().toast(...)`. At most `max` toasts are visible, the rest
 * queue and appear (with a fresh timer) as space frees up. Timers pause while a toast is hovered or focused.
 */
type ToastProviderProps = {
    children: React.ReactNode;
    max?: number;
    position?: keyof typeof positionClass;
    /** Accessible name of the notification region. */
    label?: string;
};
/** A provider nested inside another one reuses the outer region (one live landmark per page). */
declare function ToastProvider(props: ToastProviderProps): React.JSX.Element;

declare function BrandHeader({ icon, logoSrc, name, title, subtitle, className, }: {
    /** Gradient brand tile content (used when no `logoSrc`). */
    icon?: React.ReactNode;
    logoSrc?: string;
    name?: string;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    className?: string;
}): React.JSX.Element;
declare function SocialDivider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
declare function SocialButtons({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function SocialButton({ icon, className, children, ...props }: React.ComponentProps<"a"> & {
    icon?: React.ReactNode;
}): React.JSX.Element;
declare function AccountList({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function AccountItem({ name, email, avatarSrc, className, ...props }: Omit<React.ComponentProps<"button">, "children"> & {
    name: string;
    email: string;
    avatarSrc?: string;
}): React.JSX.Element;
declare function ClientInfo({ name, description, logoSrc, className, }: {
    name: string;
    description?: string;
    logoSrc?: string;
    className?: string;
}): React.JSX.Element;
declare function ScopeList({ scopes, icon, className, }: {
    scopes: {
        id: string;
        description: React.ReactNode;
    }[];
    /** Leading icon; should carry the `scope-icon` class (defaults to a check). */
    icon?: React.ReactNode;
    className?: string;
}): React.JSX.Element;
declare function OtpInput({ length, value, defaultValue, onChange, onComplete, className, ...props }: Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "type" | "maxLength"> & {
    length?: number;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
}): React.JSX.Element;
declare function CodeInput({ className, ...props }: React.ComponentProps<"input">): React.JSX.Element;
declare function CodeDisplay({ code, copyLabel: copyLabelProp, copiedLabel: copiedLabelProp, className, }: {
    code: string;
    copyLabel?: string;
    copiedLabel?: string;
    className?: string;
}): React.JSX.Element;
interface DeviceStepsProps {
    steps: React.ReactNode[];
    /** Zero-based index of the current step; earlier steps render as done. */
    current: number;
    className?: string;
}
declare function DeviceSteps({ steps, current, className }: DeviceStepsProps): React.JSX.Element;
declare function InfoBox({ title, items, className, }: {
    title: React.ReactNode;
    items: React.ReactNode[];
    className?: string;
}): React.JSX.Element;
declare function LanguageSwitcher({ languages, current, className, label, }: {
    languages: {
        code: string;
        label: string;
        href: string;
    }[];
    current: string;
    className?: string;
    label?: string;
}): React.JSX.Element;
declare function AuthFooter({ icon, className, children, }: {
    icon?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
}): React.JSX.Element;

declare function CopyButton({ value, label: labelProp, copiedLabel: copiedLabelProp, className, }: {
    value: string;
    label?: string;
    copiedLabel?: string;
    className?: string;
}): React.JSX.Element;
interface PasswordFieldProps extends Omit<InputProps, "type"> {
    showLabel?: string;
    hideLabel?: string;
    capsLockHint?: string;
    /** Caller-supplied scorer (e.g. zxcvbn); renders a 4-segment meter and a text label. */
    strength?: (value: string) => 0 | 1 | 2 | 3 | 4;
    strengthLabels?: [string, string, string, string, string];
    /** Value this field must match (confirm field); shows an error when different. */
    confirmOf?: string;
    mismatchLabel?: string;
}
declare function PasswordField({ showLabel: showLabelProp, hideLabel: hideLabelProp, capsLockHint: capsLockHintProp, strength, strengthLabels: strengthLabelsProp, confirmOf, mismatchLabel: mismatchLabelProp, className, onKeyUp, onBlur, onChange, ...props }: PasswordFieldProps): React.JSX.Element;
declare function DefinitionList({ items, className, }: {
    items: {
        label: React.ReactNode;
        value?: React.ReactNode;
        mono?: boolean;
        copy?: string;
    }[];
    className?: string;
}): React.JSX.Element;
declare function ConfirmDialog({ open, onOpenChange, title, description, items, confirmLabel, cancelLabel: cancelLabelProp, confirmText, confirmTextLabel: confirmTextLabelProp, pending, onConfirm, }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: React.ReactNode;
    /** Impacted objects listed before the action. */
    items?: string[];
    confirmLabel: string;
    cancelLabel?: string;
    /** When set, the confirm button stays disabled until this exact text is typed. */
    confirmText?: string;
    confirmTextLabel?: string;
    pending?: boolean;
    onConfirm: () => void;
}): React.JSX.Element;
declare function Progress({ value, max, meter, warnAt, dangerAt, label, className, }: {
    /** Omit for indeterminate. */
    value?: number;
    max?: number;
    /** Capacity style: colour shifts at warnAt/dangerAt percent. */
    meter?: boolean;
    warnAt?: number;
    dangerAt?: number;
    label: string;
    className?: string;
}): React.JSX.Element;
interface Step {
    id: string;
    label: React.ReactNode;
    error?: boolean;
}
/** Step indicator for wizards; steps before `current` are done and clickable via `onStepClick`. */
declare function Stepper({ steps, current, onStepClick, className, }: {
    steps: Step[];
    current: number;
    onStepClick?: (index: number) => void;
    className?: string;
}): React.JSX.Element;
declare function SecretDisplay({ value, label, acknowledgeLabel, onAcknowledge, acknowledged, masked, }: {
    value: string;
    label: string;
    acknowledgeLabel: string;
    onAcknowledge?: (ack: boolean) => void;
    /** Controlled state of the acknowledge checkbox. */
    acknowledged?: boolean;
    /** Show `••••` plus the last 4 characters instead of the secret. */
    masked?: boolean;
}): React.JSX.Element;

type TaskStatus = "queued" | "running" | "ok" | "failed" | "cancelled";
interface TaskItem {
    id: string;
    name: string;
    target?: string;
    /** Opaque id passed to `onOpenTarget`. */
    targetId?: string;
    initiator?: string;
    status: TaskStatus;
    /** 0–100 while running */
    progress?: number;
    started?: string;
    /** Elapsed / total time in ms; shown via `format.duration`. */
    durationMs?: number;
    /** Extra detail shown when the row is expanded. */
    detail?: string;
    error?: string;
}
declare function TaskPanel({ tasks, onCancel, onRetry, onOpenTarget, filterable, currentUser, docked, labels: labelsProp, }: {
    tasks: TaskItem[];
    onCancel?: (id: string) => void;
    onRetry?: (id: string) => void;
    /** Makes the target a link-button. */
    onOpenTarget?: (task: TaskItem) => void;
    /** Mine/All and status filters. */
    filterable?: boolean;
    /** Matched against `initiator` for the "Mine" filter. */
    currentUser?: string;
    /** Flat styling for use inside a docked split pane. */
    docked?: boolean;
    labels?: {
        cancel: string;
        retry: string;
        empty: string;
        all?: string;
        mine?: string;
        status?: string;
        details?: string;
        openTarget?: string;
    };
}): React.JSX.Element;
declare function UserMenu({ name, email, tenant, avatarSrc, items, signOutLabel: signOutLabelProp, onSignOut, impersonating, expiresAt, expiryWarnMs, expiryLabel, }: {
    name: string;
    email?: string;
    tenant?: string;
    /** Photo for the trigger; initials of `name` otherwise. */
    avatarSrc?: string;
    items?: {
        id: string;
        label: string;
        icon?: React.ReactNode;
        onSelect: () => void;
    }[];
    signOutLabel?: string;
    onSignOut: () => void;
    /** Admin acting as another user. */
    impersonating?: {
        as: string;
        onStop: () => void;
        stopLabel?: string;
    };
    /** Session expiry; a warning row appears once less than `expiryWarnMs` remain. */
    expiresAt?: Date | string | number;
    expiryWarnMs?: number;
    expiryLabel?: (remaining: string) => string;
}): React.JSX.Element;

/** Palette slot 1–12 (design F4); colours come from the --label-N tokens, never free hex. */
type LabelSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface AccordionItem {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
}
declare function Accordion({ items, multiple, defaultOpen, open: openProp, onOpenChange, className, }: {
    items: AccordionItem[];
    multiple?: boolean;
    defaultOpen?: string[];
    /** Controlled open item ids; omit for uncontrolled. */
    open?: string[];
    onOpenChange?: (ids: string[]) => void;
    className?: string;
}): React.JSX.Element;
declare function SplitPane({ start, end, orientation, primary, defaultSize, size: sizeProp, onSizeChange, min, max, collapsible, collapsed: collapsedProp, defaultCollapsed, onCollapsedChange, persistKey, label: labelProp, className, }: {
    start: React.ReactNode;
    end: React.ReactNode;
    /** `horizontal`: panes side by side; `vertical`: stacked. */
    orientation?: "horizontal" | "vertical";
    /** Which pane holds the fixed size (the other one flexes). */
    primary?: "start" | "end";
    defaultSize?: number;
    size?: number;
    onSizeChange?: (size: number) => void;
    min?: number;
    max?: number;
    /** Adds a toggle that collapses the primary pane to 0 (Enter on the separator does too). */
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** Persists size + collapsed state in localStorage under this key. */
    persistKey?: string;
    label?: string;
    className?: string;
}): React.JSX.Element;
declare const Drawer: React.FC<DialogPrimitive.DialogProps>;
declare const DrawerTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare function DrawerContent({ title, description, footer, width, children, }: {
    title: string;
    description?: string;
    footer?: React.ReactNode;
    width?: "sm" | "md" | "lg";
    children: React.ReactNode;
}): React.JSX.Element;
interface UnitOption {
    label: string;
    /** multiplier to the base unit */
    factor: number;
}
declare function NumberInput({ value, onChange, min, max, step, units, unit, onUnitChange, label, }: {
    /** value in the base unit when `units` is used */
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    units?: UnitOption[];
    unit?: string;
    onUnitChange?: (unit: string) => void;
    label: string;
}): React.JSX.Element;
interface SliderProps {
    /** Single value, or `[min, max]` for a range with two thumbs. */
    value?: number | [number, number];
    defaultValue?: number | [number, number];
    onValueChange?: (value: number | [number, number]) => void;
    /** Single-value compatibility with the former native input: receives `{ target: { value } }`. */
    onChange?: (e: {
        target: {
            value: string;
        };
    }) => void;
    min?: number;
    max?: number;
    step?: number;
    marks?: {
        value: number;
        label?: React.ReactNode;
    }[];
    /** Paired NumberInput (single value only). */
    withInput?: boolean;
    disabled?: boolean;
    "aria-label"?: string;
    className?: string;
}
declare function Slider({ value: valueProp, defaultValue, onValueChange, onChange, min, max, step, marks, withInput, disabled, className, "aria-label": ariaLabel, }: SliderProps): React.JSX.Element;
declare const chipTone: {
    neutral: string;
    primary: string;
    ok: string;
    warn: string;
    danger: string;
};
declare function Chip({ onRemove, removeLabel, tone, color, children, }: {
    onRemove?: () => void;
    removeLabel?: string;
    tone?: keyof typeof chipTone;
    /** Label palette slot; overrides `tone`. */
    color?: LabelSlot;
    children: React.ReactNode;
}): React.JSX.Element;
declare function TagInput({ value, onChange, label, placeholder, max, validate, }: {
    value: string[];
    onChange: (value: string[]) => void;
    label: string;
    placeholder?: string;
    max?: number;
    /** Return an error message to reject a tag. */
    validate?: (tag: string) => string | undefined;
}): React.JSX.Element;
interface KeyValue {
    key: string;
    value: string;
}
declare function KeyValueEditor({ value, onChange, addLabel: addLabelProp, keyLabel: keyLabelProp, valueLabel: valueLabelProp, duplicateMessage: duplicateMessageProp, }: {
    value: KeyValue[];
    onChange: (value: KeyValue[]) => void;
    addLabel?: string;
    keyLabel?: string;
    valueLabel?: string;
    duplicateMessage?: string;
}): React.JSX.Element;
interface SparklineProps {
    data: number[];
    label: string;
    /** Line draws in on mount; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
    /** Tooltip with the nearest value on hover/tap; `false` (default) keeps the sparkline a plain, non-focusable image. */
    tooltip?: ChartTooltipOption;
    /** Formats the tooltip value. */
    formatValue?: (v: number) => string;
    /** Tooltip header per point (default "1", "2", …). */
    xLabels?: string[];
    /** Fills the area under the line with a faint tint. */
    area?: boolean;
    className?: string;
}
declare function Sparkline({ data, label, animate, tooltip, area, formatValue, xLabels, className }: SparklineProps): React.JSX.Element;
interface ChartSeries {
    name: string;
    data: number[];
}
declare function LineChart({ series, xLabels, label, unit, className, }: {
    series: ChartSeries[];
    xLabels: string[];
    label: string;
    unit?: string;
    className?: string;
}): React.JSX.Element;
declare function TimeRangePicker({ value, onChange, presets, refresh, onRefreshChange, label: labelProp, range, onRangeChange, showTimeZone, }: {
    /** A preset (`"1h"`) or `"custom"` while an absolute range is active. */
    value: string;
    onChange: (value: string) => void;
    presets?: string[];
    /** Absolute range (epoch ms) shown in the Custom… popover; providing `onRangeChange` enables Custom…. */
    range?: {
        from: number;
        to: number;
    };
    onRangeChange?: (range: {
        from: number;
        to: number;
    }) => void;
    showTimeZone?: boolean;
    refresh?: string;
    onRefreshChange?: (value: string) => void;
    label?: string;
}): React.JSX.Element;
interface LogLine {
    time: string;
    level: "info" | "warn" | "error";
    text: string;
}
interface LogViewerLabels {
    search: string;
    level: string;
    all: string;
    info: string;
    warn: string;
    error: string;
    follow: string;
    pause: string;
    wrap: string;
    download: string;
    next: string;
    previous: string;
    loadOlder: string;
    noLines: string;
    invalidPattern: string;
    matches: (current: number, total: number) => string;
}
declare function LogViewer({ lines, label, follow: followProp, height, rowHeight, onLoadOlder, downloadName, labels, className, }: {
    lines: LogLine[];
    label: string;
    /** Initial follow state; follow pauses automatically when the user scrolls up. */
    follow?: boolean;
    height?: number;
    rowHeight?: number;
    /** Called when the viewport reaches the top; the caller prepends older lines. */
    onLoadOlder?: () => void;
    downloadName?: string;
    labels?: Partial<LogViewerLabels>;
    className?: string;
}): React.JSX.Element;
declare function TenantSwitcher({ tenants, current, onSwitch, label: labelProp, }: {
    tenants: ComboboxOption[];
    current: string;
    onSwitch: (id: string) => void;
    label?: string;
}): React.JSX.Element;
interface PermissionGroup {
    id: string;
    label: string;
    permissions: {
        id: string;
        label: string;
    }[];
}
interface PermissionMatrixLabels {
    search: string;
    inheritedFrom: (from: string) => string;
    pending: (n: number) => string;
    save: string;
    discard: string;
    noMatch: string;
}
declare function PermissionMatrix({ roles, groups, value, onChange, readOnly, inherited, baseline, searchable, onSave, onDiscard, labels: labelsProp, }: {
    roles: {
        id: string;
        label: string;
    }[];
    groups: PermissionGroup[];
    /** role id -> granted permission ids */
    value: Record<string, string[]>;
    onChange: (value: Record<string, string[]>) => void;
    readOnly?: boolean;
    /** Permissions a role gets from elsewhere: shown checked, disabled, with a source badge. */
    inherited?: Record<string, {
        permission: string;
        from: string;
    }[]>;
    /** Saved state; cells that differ are highlighted and counted in the pending-changes bar. */
    baseline?: Record<string, string[]>;
    searchable?: boolean;
    onSave?: () => void;
    onDiscard?: () => void;
    labels?: Partial<PermissionMatrixLabels>;
}): React.JSX.Element;

declare const ContextMenu: React.FC<ContextPrimitive.ContextMenuProps>;
declare const ContextMenuTrigger: React.ForwardRefExoticComponent<ContextPrimitive.ContextMenuTriggerProps & React.RefAttributes<HTMLSpanElement>>;
declare function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof ContextPrimitive.Content>): React.JSX.Element;
declare function ContextMenuItem({ danger, className, ...props }: React.ComponentProps<typeof ContextPrimitive.Item> & {
    danger?: boolean;
}): React.JSX.Element;
declare function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof ContextPrimitive.Separator>): React.JSX.Element;
interface Command {
    id: string;
    label: string;
    group?: string;
    shortcut?: string;
    onSelect: () => void;
}
declare function CommandPalette({ commands, open, onOpenChange, placeholder: placeholderProp, emptyText: emptyTextProp, search, recent, onCommandRun, }: {
    commands: Command[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    placeholder?: string;
    emptyText?: string;
    /** Async source merged after the local matches; stale responses are dropped. */
    search?: (query: string) => Promise<Command[]>;
    /** Shown under a "Recent" heading while the query is empty. */
    recent?: Command[];
    /** Called after a command ran, e.g. to maintain `recent`. */
    onCommandRun?: (command: Command) => void;
}): React.JSX.Element;
declare function DiffView({ before, after, label, mode }: {
    before: string;
    after: string;
    label: string;
    mode?: "split" | "unified";
}): React.JSX.Element;

/** Falls back to `initialRect` while the element has no layout (hidden or jsdom) so rows still render. */
declare function observeRectWithFallback(inst: Virtualizer<HTMLDivElement, Element>, cb: (rect: {
    width: number;
    height: number;
}) => void): (() => void) | undefined;
/** Fixed-row-height windowing for long lists (TanStack Virtual). Rows render with absolute offsets. */
declare function VirtualList<T>({ items, rowHeight, height, overscan, renderRow, label, className, onRangeChange, }: {
    items: T[];
    rowHeight: number;
    height: number;
    overscan?: number;
    renderRow: (item: T, index: number) => React.ReactNode;
    label: string;
    className?: string;
    /** Called with the last rendered index whenever the window moves. */
    onRangeChange?: (lastIndex: number) => void;
}): React.JSX.Element;
interface InfiniteListProps<T> {
    items: T[];
    rowHeight: number;
    height: number;
    renderRow: (item: T, index: number) => React.ReactNode;
    label: string;
    hasMore: boolean;
    loading?: boolean;
    /** Fired when the last row scrolls into view while `hasMore` and not `loading`. */
    onEndReached: () => void;
    overscan?: number;
    className?: string;
    labels?: {
        loading?: string;
        loadMore?: string;
    };
}
/** Virtualized list with end-reached paging, a loading row and a keyboard-accessible "Load more" button. */
declare function InfiniteList<T>({ items, rowHeight, height, renderRow, label, hasMore, loading, onEndReached, overscan, className, labels, }: InfiniteListProps<T>): React.JSX.Element;

type MfaMethod = "totp" | "passkey";
interface MfaEnrolmentProps {
    /** Rendered QR code (e.g. an <img> or <svg>) for the TOTP URI; LAF does not generate QR codes. */
    qr: React.ReactNode;
    secret: string;
    recoveryCodes: string[];
    /** Resolve true when the code is valid. */
    onVerify: (code: string) => Promise<boolean>;
    /** Start WebAuthn registration; resolve when the authenticator succeeded. */
    onRegisterPasskey?: () => Promise<void>;
    onComplete: () => void;
    labels?: Partial<MfaLabels>;
}
interface MfaLabels {
    method: string;
    scan: string;
    verify: string;
    recovery: string;
    totp: string;
    passkey: string;
    next: string;
    back: string;
    finish: string;
    invalid: string;
    passkeyWaiting: string;
    passkeyFailed: string;
    stored: string;
    manualSecret: string;
    addedToApp: string;
    download: string;
    print: string;
    switchMethod: string;
    genericError: string;
}
declare function MfaEnrolment({ qr, secret, recoveryCodes, onVerify, onRegisterPasskey, onComplete, labels }: MfaEnrolmentProps): React.JSX.Element;

interface DateRangeValue {
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
type DatePickerProps = DatePickerCommon & ({
    mode?: "date";
    value?: string;
    onChange: (value: string) => void;
} | {
    mode: "datetime"; /** `yyyy-mm-ddThh:mm` */
    value?: string;
    onChange: (value: string) => void;
} | {
    mode: "range";
    value?: DateRangeValue;
    onChange: (value: DateRangeValue) => void;
});
declare function DatePicker(props: DatePickerProps): React.JSX.Element;
declare function StackedBarChart({ data, series, label, }: {
    data: {
        name: string;
        values: number[];
    }[];
    series: string[];
    label: string;
}): React.JSX.Element;
declare function Heatmap({ rows, columns, values, label, max, }: {
    rows: string[];
    columns: string[];
    values: number[][];
    label: string;
    max?: number;
}): React.JSX.Element;

declare function OverflowTabs({ tabs, maxVisible, moreLabel: moreLabelProp, onSelect, }: {
    tabs: {
        value: string;
        label: string;
    }[];
    maxVisible?: number;
    moreLabel?: string;
    /** Needed so menu items can switch a controlled <Tabs>. */
    onSelect: (value: string) => void;
}): React.JSX.Element;
declare function DockedTaskPanel({ tasks, onCancel, onRetry, title: titleProp, defaultOpen, }: {
    tasks: TaskItem[];
    onCancel?: (id: string) => void;
    onRetry?: (id: string) => void;
    title?: string;
    defaultOpen?: boolean;
}): React.JSX.Element;
type TopologyNode = {
    id: string;
    label: string;
    x: number;
    y: number;
    tone?: "ok" | "warn" | "danger";
};
type TopologyEdge = {
    from: string;
    to: string;
};
declare function TopologyGraph({ nodes, edges, label, width, height, onSelect, selectedId, }: {
    nodes: TopologyNode[];
    edges: TopologyEdge[];
    label: string;
    width?: number;
    height?: number;
    onSelect?: (id: string) => void;
    selectedId?: string;
}): React.JSX.Element;
declare const rules: Record<string, [RegExp, string][]>;
declare function highlight(code: string, language: keyof typeof rules): {
    text: string;
    cls?: string;
}[];
/** Dependency-free textarea editor; the CodeMirror one lives in `@pilab/laf/editor`. */
declare function CodeEditorLite({ value, onChange, language, label, rows, }: {
    value: string;
    onChange: (value: string) => void;
    language?: keyof typeof rules;
    label: string;
    rows?: number;
}): React.JSX.Element;
/** @deprecated alias kept for compatibility; prefer `CodeEditorLite`. */
declare const CodeEditor: typeof CodeEditorLite;

interface SelectOption {
    value: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
}
interface SelectGroup {
    label: string;
    options: SelectOption[];
}
interface SelectProps {
    options: (SelectOption | SelectGroup)[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    invalid?: boolean;
    disabled?: boolean;
    name?: string;
    id?: string;
    "aria-label"?: string;
    className?: string;
}
declare function SelectMenu({ options, value, defaultValue, onValueChange, placeholder, invalid, disabled, name, id, className, "aria-label": ariaLabel, }: SelectProps): React.JSX.Element;
interface SegmentedItem {
    value: string;
    label?: React.ReactNode;
    icon?: React.ReactNode;
    /** Required for icon-only items. */
    "aria-label"?: string;
    disabled?: boolean;
}
type SegmentedBase = {
    items: SegmentedItem[];
    "aria-label": string;
    className?: string;
    disabled?: boolean;
};
type SegmentedControlProps = SegmentedBase & ({
    type?: "single";
    value?: string;
    defaultValue?: string;
    onValueChange?: (v: string) => void;
} | {
    type: "multiple";
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (v: string[]) => void;
});
declare function SegmentedControl(props: SegmentedControlProps): React.JSX.Element;
type IconButtonProps = Omit<ButtonProps, "children" | "leftIcon" | "rightIcon" | "aria-label"> & {
    /** Accessible name; also shown as the tooltip. */
    label: string;
    icon: React.ReactNode;
};
declare function IconButton({ label, icon, className, ...props }: IconButtonProps): React.JSX.Element;
declare const dotTone: {
    ok: string;
    warn: string;
    danger: string;
    neutral: string;
    primary: string;
};
declare function StatusDot({ tone, pulse, label, srOnly, className, }: {
    tone?: keyof typeof dotTone;
    pulse?: boolean;
    label: string;
    /** Hide the text visually (still announced). */
    srOnly?: boolean;
    className?: string;
}): React.JSX.Element;
declare function formatRelative(date: Date, now: number, locale?: string): string;
declare function RelativeTime({ value, className }: {
    value: Date | string | number;
    className?: string;
}): React.JSX.Element;
declare function ButtonGroup({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function SplitButton({ children, onClick, variant, size, disabled, menuLabel: menuLabelProp, menu, className, }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    disabled?: boolean;
    /** Accessible name of the chevron button. */
    menuLabel?: string;
    /** DropdownMenuItem children. */
    menu: React.ReactNode;
    className?: string;
}): React.JSX.Element;
declare function AvatarGroup({ users, max, size, className, }: {
    users: {
        name: string;
        src?: string;
    }[];
    max?: number;
    size?: "sm" | "md" | "lg";
    className?: string;
}): React.JSX.Element;

type MenuItemSpec = {
    type?: "item";
    id: string;
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    danger?: boolean;
    /** `true`, or a reason string shown as a tooltip. */
    disabled?: boolean | string;
    onSelect(): void;
} | {
    type: "checkbox";
    id: string;
    label: string;
    checked: boolean;
    onCheckedChange(v: boolean): void;
    disabled?: boolean | string;
} | {
    type: "radio";
    id: string;
    value: string;
    onValueChange(v: string): void;
    options: {
        value: string;
        label: string;
    }[];
} | {
    type: "submenu";
    id: string;
    label: string;
    icon?: React.ReactNode;
    items: MenuItemSpec[];
    disabled?: boolean | string;
} | {
    type: "separator";
    id?: string;
} | {
    type: "label";
    id?: string;
    label: string;
};
declare function MenuShortcut({ className, ...props }: React.ComponentProps<typeof Kbd>): React.JSX.Element;
declare function Menu({ items, trigger, align, open, onOpenChange, }: {
    items: MenuItemSpec[];
    /** Element that opens the menu (rendered via asChild). */
    trigger: React.ReactNode;
    align?: "start" | "center" | "end";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}): React.JSX.Element;
declare function ContextMenuFor({ items, children, disabled }: {
    items: MenuItemSpec[];
    children: React.ReactNode;
    disabled?: boolean;
}): React.JSX.Element;

interface UnsavedChangesGuard {
    /** True while a guarded action is waiting for confirmation. */
    pending: boolean;
    dirty: boolean;
    /** Runs `action` now when clean, otherwise asks for confirmation first. Returns true if it ran immediately. */
    guard: (action: () => void) => boolean;
    confirm: () => void;
    cancel: () => void;
}
/**
 * Warns on tab close / reload (beforeunload) while `dirty`, and exposes `guard()` for in-app
 * navigation (router callbacks, Cancel buttons). Pair it with `UnsavedChangesDialog`.
 */
declare function useUnsavedChangesGuard(dirty: boolean): UnsavedChangesGuard;
declare function UnsavedChangesDialog({ guard, title: titleProp, description: descriptionProp, confirmLabel: confirmLabelProp, cancelLabel: cancelLabelProp, }: {
    guard: UnsavedChangesGuard;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}): React.JSX.Element;
declare function FormSection({ title, description, columns, children, className, }: {
    title: React.ReactNode;
    description?: React.ReactNode;
    columns?: 1 | 2;
    children: React.ReactNode;
    className?: string;
}): React.JSX.Element;
declare function FormFooter({ onCancel, onSave, saveLabel: saveLabelProp, cancelLabel: cancelLabelProp, pending, dirty, guard, saveType, sticky, children, className, }: {
    onCancel?: () => void;
    onSave?: () => void;
    saveLabel?: string;
    cancelLabel?: string;
    pending?: boolean;
    /** When set, Save is disabled until the form is dirty. */
    dirty?: boolean;
    /** Routes Cancel through the unsaved-changes guard. */
    guard?: UnsavedChangesGuard;
    saveType?: "button" | "submit";
    sticky?: boolean;
    /** Extra content on the start side (status text, errors). */
    children?: React.ReactNode;
    className?: string;
}): React.JSX.Element;
interface TopBarCounter {
    id: string;
    label: string;
    count: number;
    icon?: React.ReactNode;
    onClick?: () => void;
}
declare function TopBar({ logo, search, counters, notifications, userMenu, start, className, as: Tag, }: {
    /** Use `"div"` when nesting inside a `Masthead` (which is already the page's banner). */
    as?: "header" | "div";
    logo?: React.ReactNode;
    /** Global search slot (e.g. an Input or command-palette trigger). */
    search?: React.ReactNode;
    counters?: TopBarCounter[];
    /** NotificationCenter slot. */
    notifications?: React.ReactNode;
    userMenu?: React.ReactNode;
    /** Slot before the logo, e.g. `MobileNav`. */
    start?: React.ReactNode;
    className?: string;
}): React.JSX.Element;
declare function DetailPage({ breadcrumb, icon, title, status, actions, tabs, side, children, className, }: {
    breadcrumb?: {
        label: string;
        href?: string;
    }[];
    /** ObjectIcon slot. */
    icon?: React.ReactNode;
    title: React.ReactNode;
    /** Status badge / dot slot next to the title. */
    status?: React.ReactNode;
    /** ActionBar slot. */
    actions?: React.ReactNode;
    /** Tabs slot, rendered under the head. */
    tabs?: React.ReactNode;
    side?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}): React.JSX.Element;
declare function FormPage({ breadcrumb, title, description, onSubmit, footer, children, className, }: {
    breadcrumb?: {
        label: string;
        href?: string;
    }[];
    title: React.ReactNode;
    description?: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    /** Usually a `FormFooter`. */
    footer?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}): React.JSX.Element;
interface SubNavItem {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    href?: string;
    disabled?: boolean;
}
interface SubNavGroup {
    id: string;
    label?: string;
    items: SubNavItem[];
}
/** Vertical secondary navigation (Configure / Settings). */
declare function SubNav({ groups, value, onSelect, label: labelProp, className, }: {
    groups: SubNavGroup[];
    value?: string;
    onSelect?: (id: string) => void;
    label?: string;
    className?: string;
}): React.JSX.Element;
/** Hamburger that opens the sidebar in a Drawer; hidden from 860px up. */
declare function MobileNav({ children, title: titleProp, triggerLabel: triggerLabelProp, open, onOpenChange, className, }: {
    children: React.ReactNode;
    title?: string;
    triggerLabel?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}): React.JSX.Element;

interface WizardStep {
    id: string;
    label: React.ReactNode;
    render: () => React.ReactNode;
    /** Return messages to block navigation; return nothing when valid. */
    validate?: () => Promise<string[] | void> | string[] | void;
    /** Optional steps can be skipped without validation. */
    optional?: boolean;
}
interface WizardLabels {
    back: string;
    next: string;
    finish: string;
    skip: string;
    cancel: string;
    optional: string;
    steps: string;
}
interface WizardProps {
    steps: WizardStep[];
    onFinish: () => void | Promise<void>;
    onCancel?: () => void;
    /** When true, cancelling asks for confirmation first. */
    dirty?: boolean;
    title?: string;
    /** "dialog" renders in a large Dialog controlled by `open`; "page" renders inline. */
    mode?: "page" | "dialog";
    /** Dialog width preset (dialog mode only). */
    size?: DialogSize;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    current?: number;
    defaultCurrent?: number;
    onCurrentChange?: (index: number) => void;
    labels?: Partial<WizardLabels>;
    className?: string;
}
declare function Wizard({ steps, onFinish, onCancel, dirty, title: titleProp, mode, size, open, onOpenChange, current: currentProp, defaultCurrent, onCurrentChange, labels: labelsProp, className, }: WizardProps): React.JSX.Element;
/** Review step helper: lists the collected values. */
declare function WizardReview({ items, className, }: {
    items: {
        label: React.ReactNode;
        value?: React.ReactNode;
        mono?: boolean;
    }[];
    className?: string;
}): React.JSX.Element;

type ErrorVariant = "403" | "404" | "500" | "offline" | "session-expired";
declare function ErrorPage({ variant, title, description, action, requestId, requestIdLabel: requestIdLabelProp, className, }: {
    variant: ErrorVariant;
    title?: string;
    description?: React.ReactNode;
    /** Primary action, e.g. a "Back to dashboard" Button. */
    action?: React.ReactNode;
    /** Copyable correlation id for support. */
    requestId?: string;
    requestIdLabel?: string;
    className?: string;
}): React.JSX.Element;
interface BoundaryProps {
    children: React.ReactNode;
    /** Custom fallback; defaults to the 500 ErrorPage with a retry button. */
    fallback?: (error: Error, reset: () => void) => React.ReactNode;
    onError?: (error: Error, info: React.ErrorInfo) => void;
    onReset?: () => void;
    /** Changing any value resets the boundary. */
    resetKeys?: unknown[];
    retryLabel?: string;
    requestId?: (error: Error) => string | undefined;
}
declare class LafErrorBoundary extends React.Component<BoundaryProps, {
    error: Error | null;
}> {
    state: {
        error: Error | null;
    };
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    componentDidCatch(error: Error, info: React.ErrorInfo): void;
    componentDidUpdate(prev: BoundaryProps): void;
    reset: () => void;
    render(): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.JSX.Element | null | undefined;
}

type FilterOp = ":" | ">" | ">=" | "<" | "<=";
interface Filter {
    key: string;
    op: FilterOp;
    /** Comma-separated alternatives (OR). */
    values: string[];
    negated: boolean;
}
interface TextTerm {
    value: string;
    negated: boolean;
}
type FilterToken = ({
    type: "field";
} & Filter) | ({
    type: "text";
} & TextTerm);
interface ParsedFilter {
    tokens: FilterToken[];
    filters: Filter[];
    text: TextTerm[];
}
declare function parseFilter(input: string): ParsedFilter;
declare function serializeToken(t: FilterToken | Filter | TextTerm): string;
/** Accepts `parseFilter()` output, a token list, or `Filter[]` (+ optional free text terms). */
declare function serializeFilter(input: ParsedFilter | Array<FilterToken | Filter | TextTerm>, text?: TextTerm[]): string;
interface FilterOption {
    value: string;
    label?: string;
    description?: string;
}
interface FilterField {
    key: string;
    label?: string;
    type?: "text" | "enum" | "boolean" | "number" | "date";
    /** Static list or (async) lookup used for value autocomplete. */
    options?: FilterOption[] | ((query: string) => FilterOption[] | Promise<FilterOption[]>);
    /** Allow `key:a,b`. Default true. */
    multiple?: boolean;
    /** Allow `>` `>=` `<` `<=` (default for number/date). */
    comparable?: boolean;
    description?: string;
}
interface SavedView {
    id: string;
    name: string;
    query: string;
}
interface SavedViewsStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}
interface SavedViewsLabels {
    views: string;
    saveCurrent: string;
    name: string;
    save: string;
    rename: string;
    remove: (name: string) => string;
    renameView: (name: string) => string;
    setDefault: (name: string) => string;
    unsetDefault: (name: string) => string;
    empty: string;
    confirm: string;
}
interface UseSavedViewsOptions {
    views?: SavedView[];
    defaultViews?: SavedView[];
    onViewsChange?: (views: SavedView[]) => void;
    defaultViewId?: string | null;
    onDefaultViewChange?: (id: string | null) => void;
    /** Persistence adapter; defaults to `localStorage`. Pass `null` to disable. Ignored when `views` is controlled. */
    storage?: SavedViewsStorage | null;
    storageKey?: string;
}
declare function useSavedViews(opts?: UseSavedViewsOptions): {
    views: SavedView[];
    defaultId: string | null;
    defaultView: SavedView | undefined;
    save: (name: string, query: string) => {
        id: string;
        name: string;
        query: string;
    };
    rename: (id: string, name: string) => void;
    update: (id: string, query: string) => void;
    remove: (id: string) => void;
    setDefault: (id: string | null) => void;
};
interface SavedViewsProps extends UseSavedViewsOptions {
    /** Current raw query (used by "save current"). */
    query: string;
    onApply: (query: string, view: SavedView) => void;
    labels?: Partial<SavedViewsLabels>;
    className?: string;
}
declare function SavedViews({ query, onApply, labels: labelsProp, className, ...opts }: SavedViewsProps): React.JSX.Element;
interface FilterBarLabels {
    label: string;
    placeholder: string;
    clear: string;
    removeFilter: (text: string) => string;
    editFilter: (text: string) => string;
    invalid: string;
    noSuggestions: string;
    negate: string;
}
interface FilterBarProps {
    fields: FilterField[];
    /** Raw query string (controlled). */
    value?: string;
    defaultValue?: string;
    onChange?: (query: string, parsed: ParsedFilter) => void;
    /** Saved views: false hides the menu; an object configures persistence. */
    savedViews?: false | UseSavedViewsOptions;
    /** Apply the default saved view on mount when the query is empty. Default true. */
    applyDefaultView?: boolean;
    labels?: Partial<FilterBarLabels> & {
        views?: Partial<SavedViewsLabels>;
    };
    disabled?: boolean;
    className?: string;
}
declare function FilterBar({ fields, value, defaultValue, onChange, savedViews, applyDefaultView, labels: labelsProp, disabled, className, }: FilterBarProps): React.JSX.Element;

interface ActionBarProps {
    items: MenuItemSpec$1[];
    label: string;
    className?: string;
    labels?: {
        actions?: string;
    };
}
/** Toolbar fed by `MenuItemSpec[]`; items that do not fit move into an overflow "Actions" menu. */
declare function ActionBar({ items, label, className, labels }: ActionBarProps): React.JSX.Element;

interface GridSort {
    id: string;
    dir: "asc" | "desc";
}
interface GridFilter {
    id: string;
    value: unknown;
}
type GridFilterRenderer = (props: {
    value: unknown;
    onChange: (value: unknown) => void;
    label: string;
}) => React.ReactNode;
interface GridColumn<T> {
    id: string;
    header: React.ReactNode;
    cell: (row: T) => React.ReactNode;
    accessor?: (row: T) => unknown;
    sortable?: boolean;
    filter?: "text" | "select" | "range" | GridFilterRenderer;
    /** Options of a `select` filter; needed in `manual` mode, where the loaded page is not the whole data set. */
    filterOptions?: string[];
    numeric?: boolean;
    width?: number;
    minWidth?: number;
    hideable?: boolean;
    pin?: "start";
}
/** Same shape idea as the shared menu model (U4); kept local until that lands. */
interface GridMenuItem {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    danger?: boolean;
    disabled?: boolean;
    separatorBefore?: boolean;
    onSelect: () => void;
}
type GridDensity = "compact" | "default";
interface GridLabels {
    selectAll?: string;
    selectRow?: string;
    actions?: string;
    expand?: string;
    collapse?: string;
    resize?: string;
    columns?: string;
    density?: string;
    compact?: string;
    comfortable?: string;
    search?: string;
    clearSelection?: string;
    selectedCount?: (n: number) => string;
    empty?: string;
    filter?: string;
    retry?: string;
    rowsPerPage?: string;
    loadingData?: string;
    refreshing?: string;
    loadFailed?: string;
    results?: (from: number, to: number, total: number) => string;
    resultsUnknown?: (from: number, to: number) => string;
    page?: (page: number) => string;
}
/** Page state of a server-driven grid; renders the footer (summary, page size, previous/next). */
interface GridPagination {
    /** 1-based. */
    page: number;
    pageSize: number;
    /** Total rows on the server; leave out for cursor/unknown-total APIs. */
    total?: number;
    pageSizes?: number[];
    /** With an unknown `total`: whether a next page exists. */
    hasNext?: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
}
interface DataGridProps<T> {
    columns: GridColumn<T>[];
    rows: T[];
    rowId: (row: T) => string;
    label: string;
    sort?: GridSort[];
    onSortChange?: (sort: GridSort[]) => void;
    selected?: string[];
    onSelectedChange?: (ids: string[]) => void;
    /** Show the checkbox column. Implied by `selected`, `onSelectedChange` and `bulkActions`. */
    selectable?: boolean;
    columnVisibility?: Record<string, boolean>;
    onColumnVisibilityChange?: (v: Record<string, boolean>) => void;
    columnOrder?: string[];
    onColumnOrderChange?: (order: string[]) => void;
    columnSizing?: Record<string, number>;
    onColumnSizingChange?: (s: Record<string, number>) => void;
    filters?: GridFilter[];
    onFiltersChange?: (f: GridFilter[]) => void;
    search?: string;
    onSearchChange?: (q: string) => void;
    /**
     * Server-side: the grid only emits sort/filter/search state and renders `rows` as given. Rows stay visible
     * (dimmed, `aria-busy`) while `loading` and after an `error`, so a refetch never blanks the table.
     */
    manual?: boolean;
    /** Total rows on the server (`aria-rowcount`); defaults to `pagination.total`, else unknown (-1). */
    rowCount?: number;
    pagination?: GridPagination;
    /** Shows a retry button in the error row. */
    onRetry?: () => void;
    /** Default: on above 200 rows. */
    virtual?: boolean | {
        rowHeight: number;
        overscan?: number;
    };
    density?: GridDensity;
    onDensityChange?: (d: GridDensity) => void;
    stickyHeader?: boolean;
    stickyFirstColumn?: boolean;
    /** Scroll viewport height (px or CSS length). Default 480 when sticky/virtual. */
    height?: number | string;
    onRowActivate?: (row: T) => void;
    rowActions?: (row: T) => GridMenuItem[];
    renderExpanded?: (row: T) => React.ReactNode;
    bulkActions?: (ids: string[]) => React.ReactNode;
    toolbar?: React.ReactNode;
    loading?: boolean;
    error?: React.ReactNode;
    empty?: React.ReactNode;
    /** Persists visibility/order/sizing/density in localStorage under this key. */
    viewKey?: string;
    labels?: GridLabels;
    className?: string;
    /** @internal used by TreeTable */
    gridRole?: "grid" | "treegrid";
    /** @internal */
    getRowProps?: (row: T) => React.HTMLAttributes<HTMLDivElement>;
    /** @internal called before default key handling; call preventDefault() to take over */
    onRowKeyDown?: (e: React.KeyboardEvent, row: T) => void;
}
declare function GridSearch({ className, placeholder }: {
    className?: string;
    placeholder?: string;
}): React.JSX.Element;
declare function GridDensityToggle(): React.JSX.Element;
declare function GridColumnsMenu(): React.JSX.Element;
declare function DataGrid<T>(props: DataGridProps<T>): React.JSX.Element;

interface TreeTableNode<T> {
    id: string;
    data: T;
    children?: TreeTableNode<T>[];
}
interface TreeTableProps<T> extends Omit<DataGridProps<T>, "rows" | "rowId" | "manual" | "renderExpanded" | "gridRole" | "getRowProps" | "onRowKeyDown" | "onRowActivate" | "rowActions" | "bulkActions" | "columns" | "filters" | "onFiltersChange" | "sort" | "onSortChange"> {
    nodes: TreeTableNode<T>[];
    columns: GridColumn<T>[];
    expanded?: string[];
    defaultExpanded?: string[];
    onExpandedChange?: (ids: string[]) => void;
    /** Column that carries the indent and toggle. Default: first column. */
    treeColumn?: string;
    /** Indent per level in px. */
    indent?: number;
    sort?: GridSort[];
    onSortChange?: (sort: GridSort[]) => void;
    onRowActivate?: (row: T) => void;
    rowActions?: DataGridProps<T>["rowActions"];
    bulkActions?: DataGridProps<T>["bulkActions"];
}
/** Data grid with expandable hierarchy (§4.30): `role="treegrid"`, sorting applies per sibling group. */
declare function TreeTable<T>({ nodes, columns, expanded, defaultExpanded, onExpandedChange, treeColumn, indent, sort: sortProp, onSortChange, onRowActivate, rowActions, bulkActions, ...rest }: TreeTableProps<T>): React.JSX.Element;

interface HotkeyOptions {
    /** Scope this map belongs to; it only fires while the scope is active. Default "global". */
    scope?: string;
    enabled?: boolean;
    /** Also fire while typing in inputs, textareas, selects and contenteditable elements. */
    allowInInputs?: boolean;
    /** Human-readable description per combo, shown in `ShortcutHelp`. */
    descriptions?: Record<string, string>;
}
interface RegisteredHotkey {
    combo: string;
    description?: string;
    scope: string;
}
/** Explicit registry: only hooks rendered below a provider are listed in `ShortcutHelp`. */
declare function HotkeysProvider({ scopes, children }: {
    scopes?: string[];
    children: React.ReactNode;
}): React.JSX.Element;
/** Registered hotkeys under the nearest `HotkeysProvider` (empty without one). */
declare function useRegisteredHotkeys(): RegisteredHotkey[];
declare const isMacPlatform: () => boolean;
interface Stroke {
    ctrl: boolean;
    meta: boolean;
    alt: boolean;
    shift: boolean;
    key: string;
}
/** `"mod+k"` → one stroke; `"g i"` → two strokes. */
declare const parseHotkey: (combo: string, mac?: boolean) => Stroke[];
/**
 * Register keyboard shortcuts. Combos: `mod+k`, `shift+/`, `?`, sequences `g i`.
 * `mod` is ⌘ on macOS and Ctrl elsewhere.
 */
declare function useHotkeys(map: Record<string, (e: KeyboardEvent) => void>, opts?: HotkeyOptions): void;
/** Display form of a combo, e.g. `mod+k` → `⌘K` / `Ctrl+K`, `g i` → `G I`. */
declare function formatHotkey(combo: string, mac?: boolean): string;
/** Dialog listing the hotkeys registered below a `HotkeysProvider`; pressing `?` opens it. */
declare function ShortcutHelp({ open, onOpenChange }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}): React.JSX.Element;

interface CapacityBarProps {
    label: string;
    used: number;
    /** Reserved but not yet used (rendered as a hatched segment after `used`). */
    reserved?: number;
    total: number;
    unit?: "bytes" | "frequency" | "count";
    warnAt?: number;
    dangerAt?: number;
    labels?: {
        used?: string;
        reserved?: string;
        free?: string;
        capacity?: string;
    };
    className?: string;
}
declare function CapacityBar({ label, used, reserved, total, unit, warnAt, dangerAt, labels: labelsProp, className, }: CapacityBarProps): React.JSX.Element;
interface ObjectPageCard {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
}
interface ObjectPageProps {
    kind: ObjectKind;
    state?: ObjectState;
    name: string;
    /** Text next to the name, e.g. "Powered on". */
    statusLabel?: string;
    statusTone?: React.ComponentProps<typeof StatusDot>["tone"];
    actions?: MenuItemSpec$1[];
    actionsLabel?: string;
    /** Summary tab: key/value facts. */
    facts?: {
        label: React.ReactNode;
        value?: React.ReactNode;
        mono?: boolean;
    }[];
    /** Summary tab: cards (CapacityBars, notes, …) shown in a grid. */
    cards?: ObjectPageCard[];
    monitor?: React.ReactNode;
    configure?: React.ReactNode;
    tab?: string;
    defaultTab?: string;
    onTabChange?: (tab: string) => void;
    labels?: {
        summary?: string;
        monitor?: string;
        configure?: string;
    };
    className?: string;
}
declare function ObjectPage({ kind, state, name, statusLabel, statusTone, actions, actionsLabel, facts, cards, monitor, configure, tab: tabProp, defaultTab, onTabChange, labels: labelsProp, className, }: ObjectPageProps): React.JSX.Element;
interface InventoryLayoutProps {
    /** TopBar slot. */
    top?: React.ReactNode;
    /** TreeView slot. */
    tree: React.ReactNode;
    treeLabel?: string;
    children: React.ReactNode;
    /** Docked TaskPanel / AlarmList slot; renders a vertical split under the content. */
    bottom?: React.ReactNode;
    bottomLabel?: string;
    /** Persists the tree and bottom sizes (`<key>:tree`, `<key>:bottom`). */
    persistKey?: string;
    /** Force the drawer mode (otherwise below 860 px). */
    narrow?: boolean;
    defaultTreeSize?: number;
    defaultBottomSize?: number;
    className?: string;
}
declare function InventoryLayout({ top, tree, treeLabel, children, bottom, bottomLabel, persistKey, narrow: narrowProp, defaultTreeSize, defaultBottomSize, className, }: InventoryLayoutProps): React.JSX.Element;

type TrackerEn = typeof trackerEn;
interface LabelDef {
    id: string;
    name: string;
    slot: LabelSlot;
    description?: string;
}
declare function Label({ slot, description, onRemove, removeLabel, children }: {
    slot: LabelSlot;
    description?: string;
    onRemove?: () => void;
    removeLabel?: string;
    children: React.ReactNode;
}): React.JSX.Element;
declare function LabelSwatch({ slot, className }: {
    slot: LabelSlot;
    className?: string;
}): React.JSX.Element;
declare function LabelPicker({ labels, value, onChange, onCreate, text, disabled, }: {
    labels: LabelDef[];
    value: string[];
    onChange: (ids: string[]) => void;
    /** Enables creation; receives the typed name and the chosen palette slot. */
    onCreate?: (label: {
        name: string;
        slot: LabelSlot;
    }) => void;
    text?: Partial<TrackerEn["labelPicker"]>;
    disabled?: boolean;
}): React.JSX.Element;
interface Reaction {
    emoji: string;
    users: string[];
    /** Whether the current user reacted. */
    reacted?: boolean;
}
declare function Reactions({ reactions, onToggle, palette, readOnly, text, }: {
    reactions: Reaction[];
    onToggle: (emoji: string) => void;
    palette?: string[];
    readOnly?: boolean;
    text?: Partial<TrackerEn["reaction"]>;
}): React.JSX.Element;
interface ActivityComment {
    type: "comment";
    id: string;
    author: {
        name: string;
        src?: string;
    };
    at: Date | string | number;
    body: React.ReactNode;
    edited?: boolean;
    actions?: MenuItemSpec[];
    reactions?: Reaction[];
    onToggleReaction?: (emoji: string) => void;
}
interface ActivityEvent {
    type: "event";
    id: string;
    at: Date | string | number;
    icon?: React.ReactNode;
    /** Already-composed sentence, e.g. "Anna changed status from Open to Done". */
    summary: React.ReactNode;
}
type ActivityItem = ActivityComment | ActivityEvent;
declare function ActivityTimeline({ items, composer, collapseAfter, text, }: {
    items: ActivityItem[];
    /** Rendered below the list (e.g. a Textarea + submit button). */
    composer?: React.ReactNode;
    /** Runs of more than this many consecutive events are collapsed behind a toggle. */
    collapseAfter?: number;
    text?: Partial<TrackerEn["timeline"]>;
}): React.JSX.Element;
interface PickerOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
}
interface OptionPickerProps {
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
    text?: Partial<TrackerEn["optionPicker"]>;
    className?: string;
}
declare function OptionPicker({ options, value, onChange, multiple, label, compact, searchable, shortcut, disabled, text, className }: OptionPickerProps): React.JSX.Element;
interface IssueData {
    id: string;
    key: string;
    title: string;
    href?: string;
    priority?: React.ReactNode;
    status?: React.ReactNode;
    labels?: {
        name: string;
        slot: LabelSlot;
        description?: string;
    }[];
    assignees?: {
        name: string;
        src?: string;
    }[];
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
    text?: Partial<TrackerEn["issue"]>;
}
declare function IssueRow({ issue, density, selected, onSelectedChange, now, text, }: IssueViewProps & {
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
}): React.JSX.Element;
declare function IssueCard({ issue, density, now, text }: IssueViewProps): React.JSX.Element;
interface PropertyField {
    id: string;
    label: string;
    /** Read-only rendering (also used when the pane is readOnly). */
    value: React.ReactNode;
    /** OptionPicker, InlineEdit, DatePicker … */
    editor?: React.ReactNode;
    pending?: boolean;
    error?: string;
}
interface PropertyGroup {
    id: string;
    title?: string;
    fields: PropertyField[];
}
declare function PropertiesPane({ groups, readOnly, label, className }: {
    groups: PropertyGroup[];
    readOnly?: boolean;
    label?: string;
    className?: string;
}): React.JSX.Element;
declare function HoverCard({ trigger, children, openDelay, closeDelay, side, className, }: {
    /** Focusable element (rendered via asChild). */
    trigger: React.ReactElement;
    children: React.ReactNode;
    openDelay?: number;
    closeDelay?: number;
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
}): React.JSX.Element;
declare function ProgressSummary({ todo, doing, done, burndown, title, text, }: {
    todo: number;
    doing: number;
    done: number;
    title?: string;
    /** Optional chart (e.g. TimeSeriesChart) rendered under the bar. */
    burndown?: React.ReactNode;
    text?: Partial<TrackerEn["progress"]>;
}): React.JSX.Element;

interface ToolbarProps extends React.ComponentProps<"div"> {
    /** Stick to the top of the scroll container. */
    sticky?: boolean;
    /** Bulk-selection mode: shows the count and `bulkActions` in place of the regular content. */
    selectedCount?: number;
    bulkActions?: React.ReactNode;
    onClearSelection?: () => void;
    labels?: {
        selected?: (n: number) => string;
        clearSelection?: string;
    };
}
/**
 * Flexible, wrapping action row. With an `aria-label` it becomes `role="toolbar"` and ←/→ (mirrored in RTL), Home and End
 * move focus between its controls; text fields keep their own arrow keys.
 */
declare function Toolbar({ className, sticky, selectedCount, bulkActions, onClearSelection, labels, children, onKeyDown, ...props }: ToolbarProps): React.JSX.Element;
/** Single line of toolbar content; use when a toolbar holds several rows (e.g. controls + filter chips). */
declare function ToolbarContent({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
interface ToolbarGroupProps extends React.ComponentProps<"div"> {
    /** `pagination` and `align="end"` push the group to the inline end. */
    variant?: "filter" | "action" | "pagination";
    align?: "start" | "end";
}
declare function ToolbarGroup({ variant, align, className, ...props }: ToolbarGroupProps): React.JSX.Element;
declare function ToolbarItem({ grow, className, ...props }: React.ComponentProps<"div"> & {
    grow?: boolean;
}): React.JSX.Element;
/** Pushes the following items to the inline end. */
declare function ToolbarSpacer({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function ToolbarDivider({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
/** `ActionBar` as a toolbar item: actions that do not fit collapse into an overflow menu. */
declare function ToolbarActions({ className, ...props }: ActionBarProps): React.JSX.Element;
interface ToolbarFilter {
    id: string;
    label: string;
    /** Chips with the same category are grouped under it. */
    category?: string;
}
interface ToolbarFilterChipsProps {
    filters: ToolbarFilter[];
    onRemove?: (filter: ToolbarFilter) => void;
    onClearAll?: () => void;
    className?: string;
    labels?: {
        activeFilters?: string;
        removeFilter?: (label: string) => string;
        clearAll?: string;
    };
}
/** Row of applied filters with a "clear all" action. Renders nothing when empty. */
declare function ToolbarFilterChips({ filters, onRemove, onClearAll, className, labels }: ToolbarFilterChipsProps): React.JSX.Element | null;
interface ToolbarBulkProps {
    count: number;
    onClear?: () => void;
    children?: React.ReactNode;
    className?: string;
    labels?: {
        selected?: (n: number) => string;
        clearSelection?: string;
    };
}
/** Selected-count + actions strip, announced politely as the selection changes. */
declare function ToolbarBulk({ count, onClear, children, className, labels }: ToolbarBulkProps): React.JSX.Element;

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TitleSize = "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
/** Heading with the level (semantics) decoupled from the size (looks), like PatternFly's `Title`. */
declare function Title({ headingLevel: Tag, size, className, ...props }: React.ComponentProps<"h2"> & {
    headingLevel?: HeadingLevel;
    size?: TitleSize;
}): React.JSX.Element;
declare function Divider({ orientation, className, ...props }: Omit<React.ComponentProps<"hr">, "children"> & {
    orientation?: "horizontal" | "vertical";
}): React.JSX.Element;
type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
/** 12-column grid; pair with `GridItem`. `gap` defaults to `md` (PatternFly's `hasGutter`). */
declare function Grid({ gap, className, ...props }: React.ComponentProps<"div"> & {
    gap?: Gap;
}): React.JSX.Element;
interface GridItemProps extends React.ComponentProps<"div"> {
    /** Columns at every width (default 12); the breakpoint props apply from that width up. */
    span?: Span;
    sm?: Span;
    md?: Span;
    lg?: Span;
    xl?: Span;
    xxl?: Span;
    rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
}
declare function GridItem({ span, sm, md, lg, xl, xxl, rowSpan, className, ...props }: GridItemProps): React.JSX.Element;
declare const justify: {
    start: string;
    end: string;
    center: string;
    between: string;
    around: string;
    evenly: string;
};
declare const align: {
    start: string;
    end: string;
    center: string;
    stretch: string;
    baseline: string;
};
declare const selfAlign: {
    start: string;
    end: string;
    center: string;
    stretch: string;
    baseline: string;
};
declare const direction: {
    row: string;
    column: string;
    "row-reverse": string;
    "column-reverse": string;
};
interface FlexProps extends React.ComponentProps<"div"> {
    direction?: keyof typeof direction;
    justify?: keyof typeof justify;
    align?: keyof typeof align;
    gap?: Gap;
    /** `true` wraps; `false` keeps one line. Defaults to wrapping. */
    wrap?: boolean;
    inline?: boolean;
}
declare function Flex({ direction: dir, justify: j, align: a, gap, wrap, inline, className, ...props }: FlexProps): React.JSX.Element;
declare function FlexItem({ grow, shrink, align: a, pushEnd, className, ...props }: React.ComponentProps<"div"> & {
    grow?: boolean;
    shrink?: boolean;
    align?: keyof typeof selfAlign; /** Margin-inline-start: auto. */
    pushEnd?: boolean;
}): React.JSX.Element;
declare function Stack({ gap, className, ...props }: React.ComponentProps<"div"> & {
    gap?: Gap;
}): React.JSX.Element;
declare function StackItem({ fill, className, ...props }: React.ComponentProps<"div"> & {
    fill?: boolean;
}): React.JSX.Element;
type DlLayout = "vertical" | "horizontal" | "grid";
interface DescriptionListProps extends React.ComponentProps<"dl"> {
    /** `vertical` stacks term over description, `horizontal` puts them side by side, `grid` flows groups into columns. */
    layout?: DlLayout;
    /** Columns for `layout="grid"` (collapses on narrow screens). */
    columns?: 1 | 2 | 3 | 4;
    compact?: boolean;
}
declare function DescriptionList({ layout, columns, compact, className, ...props }: DescriptionListProps): React.JSX.Element;
declare function DescriptionListGroup({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function DescriptionListTerm({ icon, className, children, ...props }: React.ComponentProps<"dt"> & {
    icon?: React.ReactNode;
}): React.JSX.Element;
declare function DescriptionListDescription({ mono, className, ...props }: React.ComponentProps<"dd"> & {
    mono?: boolean;
}): React.JSX.Element;
/** Marker for PatternFly-style `<CodeBlock><CodeBlockCode>…</CodeBlockCode></CodeBlock>`; the text is read by `CodeBlock`. */
declare function CodeBlockCode({ children }: {
    children?: React.ReactNode;
}): React.JSX.Element;
interface CodeBlockProps {
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
    labels?: {
        copy?: string;
        copied?: string;
        wrap?: string;
    };
}
declare function CodeBlock({ code, children, language, lineNumbers, wrap, defaultWrap, onWrapChange, wrapToggle, maxHeight, copy, actions, label, className, labels }: CodeBlockProps): React.JSX.Element;
interface ClipboardCopyProps {
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
    labels?: {
        expand?: string;
        collapse?: string;
    };
}
declare function ClipboardCopy({ value, defaultValue, children, onChange, variant, readOnly, expanded, defaultExpanded, onExpandedChange, onCopy, label, hoverTip, clickTip, className, labels, }: ClipboardCopyProps): React.JSX.Element;
declare function Form({ className, ...props }: React.ComponentProps<"form">): React.JSX.Element;
interface FormGroupProps {
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
    labels?: {
        required?: string;
    };
}
declare function FormGroup({ label, fieldId, required, fieldset, labelInfo, className, children, labels }: FormGroupProps): React.JSX.Element;
/** Row for a form's submit/cancel buttons. */
declare function ActionGroup({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function HelperText({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare const helperTone: {
    default: string;
    success: string;
    warning: string;
    error: string;
};
/** One line of helper/validation text; `error` is announced when it appears. */
declare function HelperTextItem({ variant, icon, className, children, ...props }: React.ComponentProps<"p"> & {
    variant?: keyof typeof helperTone;
    icon?: React.ReactNode;
}): React.JSX.Element;
declare function FormHelperText({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;

interface MenuToggleProps extends Omit<ButtonProps, "variant"> {
    variant?: "default" | "plain" | "primary";
    /** Hide the trailing chevron. */
    hideCaret?: boolean;
    expanded?: boolean;
}
declare const MenuToggle: React.ForwardRefExoticComponent<Omit<MenuToggleProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
interface DropdownProps {
    /** Element that opens the menu (rendered via asChild); typically a `MenuToggle`. */
    toggle: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    align?: "start" | "center" | "end";
    className?: string;
    children?: React.ReactNode;
}
declare function Dropdown({ toggle, open, defaultOpen, onOpenChange, align, className, children }: DropdownProps): React.JSX.Element;
declare function DropdownList({ children }: {
    children?: React.ReactNode;
}): React.JSX.Element;
declare function DropdownGroup({ label, children }: {
    label?: string;
    children?: React.ReactNode;
}): React.JSX.Element;
declare function DropdownItem({ icon, description, children, ...props }: React.ComponentProps<typeof DropdownMenuItem> & {
    icon?: React.ReactNode;
    description?: React.ReactNode;
}): React.JSX.Element;
declare const DropdownSeparator: typeof DropdownMenuSeparator;
interface ModalProps {
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
declare function Modal({ open, defaultOpen, onOpenChange, onClose, trigger, size, "aria-label": ariaLabel, className, children }: ModalProps): React.JSX.Element;
declare const ModalTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const ModalClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare function ModalHeader({ title, description, className, children }: {
    title: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}): React.JSX.Element;
declare function ModalBody({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function ModalFooter({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;

/** Catalogue keys of the app-frame family; every component takes `labels` to override single entries. */
type AppFrameLabels = (typeof uiEn)["appFrame"];
interface AppFrameContextValue {
    /** True inside an `AppFrame`. */
    active: boolean;
    /** Viewport is below 860px: the sidebar is an overlay. */
    isMobile: boolean;
    /** Sidebar visible in the current mode (overlay open on mobile, expanded on desktop). */
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
    /** Desktop sidebar is collapsed to the icon rail. */
    rail: boolean;
    sidebarId: string;
    mainId: string;
    /** Call after a navigation so the mobile overlay closes. */
    navigated: () => void;
}
/** State of the surrounding `AppFrame` (sidebar, viewport mode). Safe to call outside one. */
declare function useAppFrame(): AppFrameContextValue;

type DrawerPlacement = "start" | "end" | "bottom" | "left" | "right";
interface AppFrameProps {
    /** `Masthead` (or any element rendering a `<header>`); sticky at the top. */
    masthead?: React.ReactNode;
    /** `Sidebar`/`NavTree`; collapsible, an overlay below 860px. */
    sidebar?: React.ReactNode;
    /** Rendered above `<main>`, e.g. a `Breadcrumb`. */
    breadcrumb?: React.ReactNode;
    /** Rendered at the top of `<main>`, e.g. a `PageHeader`. */
    pageHeader?: React.ReactNode;
    /** `AppFooter`; stays at the bottom even with short content. */
    footer?: React.ReactNode;
    /** An inline `DrawerPanel` next to (or under) the content. */
    drawer?: React.ReactNode;
    /** Defaults to the `placement` of the `drawer` element, else `end`. */
    drawerPlacement?: DrawerPlacement;
    /** Controlled desktop sidebar state; omit for uncontrolled. The mobile overlay is always internal. */
    sidebarOpen?: boolean;
    defaultSidebarOpen?: boolean;
    onSidebarOpenChange?: (open: boolean) => void;
    /** What "collapsed" means on desktop: slide away (`hide`) or shrink to an icon rail. */
    sidebarCollapse?: "hide" | "rail";
    /** localStorage key remembering the desktop sidebar state. Read on first render, never at import. */
    persistKey?: string;
    /** Id of `<main>`; the skip link points at it. */
    mainId?: string;
    labels?: Partial<AppFrameLabels>;
    className?: string;
    children?: React.ReactNode;
}
declare function AppFrame({ masthead, sidebar, breadcrumb, pageHeader, footer, drawer, drawerPlacement, sidebarOpen, defaultSidebarOpen, onSidebarOpenChange, sidebarCollapse, persistKey, mainId: mainIdProp, labels, className, children, }: AppFrameProps): React.JSX.Element;
declare function Masthead({ className, ...props }: React.ComponentProps<"header">): React.JSX.Element;
/** Hamburger wired to the surrounding `AppFrame`; pass `onClick` to use it standalone. */
declare function MastheadToggle({ className, onClick, labels, ...props }: React.ComponentProps<"button"> & {
    labels?: Partial<AppFrameLabels>;
}): React.JSX.Element;
interface MastheadBrandProps {
    logo?: React.ReactNode;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    /** Router-link escape hatch: spread `props` onto your `<Link>`. */
    render?: (props: {
        className: string;
        children: React.ReactNode;
        href?: string;
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    }) => React.ReactElement;
    className?: string;
}
declare function MastheadBrand({ logo, title, subtitle, href, onClick, render, className }: MastheadBrandProps): React.JSX.Element;
/** Flexible middle of the masthead (search, host indicator …). */
declare function MastheadContent({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
/** End-aligned utilities: `ThemeToggle`, `NotificationCenter`, `UserMenu` … */
declare function MastheadActions({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
type ThemeMode = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
interface ThemeToggleProps {
    /** Controlled mode. */
    value?: ThemeMode;
    defaultValue?: ThemeMode;
    onChange?: (mode: ThemeMode) => void;
    /** Called with the effective theme whenever mode or the OS preference changes. */
    onResolvedChange?: (resolved: ResolvedTheme) => void;
    /** localStorage key remembering the choice (uncontrolled). Read on first render. */
    persistKey?: string;
    /**
     * `true` (default) sets `data-theme="light|dark"` on `<html>` after mount; a function takes over applying
     * the theme; `false` leaves the document alone. LAF itself ships the dark palette only, so light tokens come from the app.
     */
    apply?: boolean | ((resolved: ResolvedTheme) => void);
    variant?: "menu" | "segmented";
    labels?: Partial<AppFrameLabels>;
    className?: string;
}
declare function ThemeToggle({ value, defaultValue, onChange, onResolvedChange, persistKey, apply, variant, labels, className }: ThemeToggleProps): React.JSX.Element;
interface FooterLink {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    /** Opens in a new tab with an icon and a screen-reader hint. */
    external?: boolean;
}
interface FooterLinkGroup {
    title: string;
    links: FooterLink[];
}
interface AppFooterBuild {
    commit?: string;
    date?: string;
    env?: string;
}
interface AppFooterProps {
    start?: React.ReactNode;
    center?: React.ReactNode;
    end?: React.ReactNode;
    copyright?: React.ReactNode;
    version?: string;
    build?: string | AppFooterBuild;
    /** Inline link row (default/compact variants). */
    links?: FooterLink[];
    /** Titled link columns (`columns` variant). */
    linkGroups?: FooterLinkGroup[];
    status?: {
        label: string;
        tone?: React.ComponentProps<typeof StatusDot>["tone"];
        pulse?: boolean;
    };
    variant?: "default" | "compact" | "columns";
    labels?: Partial<AppFrameLabels>;
    className?: string;
}
declare function AppFooter({ start, center, end, copyright, version, build, links, linkGroups, status, variant, labels, className }: AppFooterProps): React.JSX.Element;
interface PageHeaderProps {
    /** Breadcrumb items, or a ready-made node. */
    breadcrumb?: BreadcrumbItemProps[] | React.ReactNode;
    icon?: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    /** Labels/badges next to the title. */
    badges?: React.ReactNode;
    actions?: React.ReactNode;
    help?: {
        href?: string;
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
        label?: string;
    };
    headingLevel?: 1 | 2 | 3;
    labels?: Partial<AppFrameLabels>;
    className?: string;
}
declare function PageHeader({ breadcrumb, icon, title, subtitle, badges, actions, help, headingLevel, labels, className }: PageHeaderProps): React.JSX.Element;
declare const sectionPad: {
    readonly none: "";
    readonly sm: "px-4 py-2";
    readonly md: "px-6 py-4 max-[859px]:px-4";
    readonly lg: "px-8 py-8 max-[859px]:px-4 max-[859px]:py-6";
};
interface PageSectionProps extends React.ComponentProps<"section"> {
    padding?: keyof typeof sectionPad;
    /** Translucent surface with a border, for toolbars and grouped content. */
    filled?: boolean;
    /** Sticks to the edge of the scrolling `main`. */
    sticky?: "top" | "bottom";
}
/** A `<section>`; give it an `aria-label` to expose it as a region landmark. */
declare function PageSection({ padding, filled, sticky, className, ...props }: PageSectionProps): React.JSX.Element;

interface NavItem {
    type?: "item";
    id: string;
    label: React.ReactNode;
    /** Plain text for type-ahead and the rail's accessible name when `label` is not a string. */
    textValue?: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    href?: string;
    onSelect?: (id: string) => void;
    /** Overrides the `current` id of the tree. */
    current?: boolean;
    disabled?: boolean;
    /** Nested entries of any depth turn the item into an expandable group. */
    children?: NavEntry[];
    /** Router-link escape hatch: return your `<Link>` spreading `props` (it must forward its ref). */
    render?: (props: NavRenderProps) => React.ReactElement;
}
interface NavHeading {
    type: "heading";
    id: string;
    label: React.ReactNode;
}
interface NavDivider {
    type: "divider";
    id?: string;
}
type NavEntry = NavItem | NavHeading | NavDivider;
interface NavRenderProps extends React.HTMLAttributes<HTMLElement> {
    href?: string;
    "data-nav-id": string;
    "data-nav-text": string;
    "aria-current"?: "page";
    "aria-disabled"?: true;
    tabIndex: number;
}
interface NavTreeProps {
    items: NavEntry[];
    /** Accessible name of the `<nav>`. */
    label?: string;
    /** Id of the current page; an item's own `current` wins. */
    current?: string;
    /** Called for every activated leaf (after the item's own `onSelect`). */
    onSelect?: (id: string, item: NavItem) => void;
    /** Controlled expanded group ids; omit for uncontrolled (ancestors of the current item start open). */
    expanded?: string[];
    defaultExpanded?: string[];
    onExpandedChange?: (ids: string[]) => void;
    /** Icon-rail mode: top-level icons with tooltips. Defaults to the surrounding `AppFrame`'s rail state. */
    collapsed?: boolean;
    labels?: Partial<AppFrameLabels>;
    className?: string;
}
/**
 * Navigation of arbitrary depth: `<nav>` with nested lists, `aria-current` on the current page and
 * `aria-expanded` on groups. One roving tab stop; arrows, Home/End, Left/Right and type-ahead move focus.
 */
declare function NavTree({ items, label, current, onSelect, expanded: expandedProp, defaultExpanded, onExpandedChange, collapsed, labels, className }: NavTreeProps): React.JSX.Element;
interface SidebarProps extends Omit<NavTreeProps, "items"> {
    items?: NavEntry[];
    /** Object tree (TreeView v2) shown in the sidebar; with `items` too, a switch toggles between the two. */
    tree?: TreeViewProps;
    mode?: "nav" | "tree";
    defaultMode?: "nav" | "tree";
    onModeChange?: (mode: "nav" | "tree") => void;
    /** Top slot, e.g. a brand block on mobile. */
    header?: React.ReactNode;
    /** Bottom slot: user info, environment, status. Hidden in the rail unless `railFooter` is given. */
    footer?: React.ReactNode;
    /** Compact footer for the icon rail. */
    railFooter?: React.ReactNode;
}
/** Body of the `AppFrame` sidebar: navigation and/or an object tree, scrolling independently, with header and footer slots. */
declare function Sidebar({ items, tree, mode: modeProp, defaultMode, onModeChange, header, footer, railFooter, collapsed, labels, className, ...nav }: SidebarProps): React.JSX.Element;

interface DrawerPanelProps {
    /** Controlled visibility; omit for uncontrolled. A closed panel renders nothing. */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** `left`/`right` are logical (they follow the writing direction, like `start`/`end`). */
    placement?: DrawerPlacement;
    /** `push` takes space from the content; `overlay` floats above it (always below 860px). */
    mode?: "push" | "overlay";
    title: string;
    icon?: React.ReactNode;
    /** Extra header controls, before the collapse/close buttons. */
    actions?: React.ReactNode;
    footer?: React.ReactNode;
    /** Width (start/end) or height (bottom) in px. */
    size?: number;
    defaultSize?: number;
    onSizeChange?: (size: number) => void;
    minSize?: number;
    maxSize?: number;
    /** Adds a keyboard- and pointer-operable splitter on the inner edge. */
    resizable?: boolean;
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    closable?: boolean;
    /** Moves focus into the panel when it opens and back to the opener when it closes; Escape closes. */
    manageFocus?: boolean;
    labels?: Partial<AppFrameLabels>;
    className?: string;
    children?: React.ReactNode;
}
/**
 * Non-modal panel that lives in the page flow (use the modal `Drawer` for blocking tasks). Inside `AppFrame`
 * pass it as `drawer`; elsewhere place it in a flex row/column, inside a `relative` parent for overlay mode.
 * It renders an `<aside>` landmark, so keep it outside `<main>`.
 */
declare function DrawerPanel({ open: openProp, defaultOpen, onOpenChange, placement: placementProp, mode, title, icon, actions, footer, size: sizeProp, defaultSize, onSizeChange, minSize, maxSize, resizable, collapsible, collapsed: collapsedProp, defaultCollapsed, onCollapsedChange, closable, manageFocus, labels, className, children, }: DrawerPanelProps): React.JSX.Element | null;
/** Alias of `DrawerPanel`, for readers looking for the inline counterpart of the modal `Drawer`. */
declare const InlineDrawer: typeof DrawerPanel;

type MetricTrend = "up" | "down" | "neutral";
type MetricTone = "ok" | "warn" | "danger" | "primary";
interface MetricDelta {
    /** Signed change; the sign decides the trend unless `trend` is given. Shown as a percentage unless `text` is set. */
    value: number;
    text?: string;
    trend?: MetricTrend;
}
interface MetricCardProps extends Omit<CardProps, "title" | "children" | "onSelect"> {
    label: string;
    value: React.ReactNode;
    unit?: string;
    /** Percentage change (`12.5` → "+12.5%") or a full `MetricDelta`. */
    delta?: number | MetricDelta;
    /** Which direction is good news; colours the delta (and adds text, never colour alone). Default `up`. */
    goodWhen?: "up" | "down";
    /** What the delta compares with, e.g. "vs last 7 days". */
    period?: string;
    icon?: React.ReactNode;
    sparkline?: number[];
    loading?: boolean;
    /** `true` or a message. */
    error?: boolean | string;
    onRetry?: () => void;
}
/** KPI tile: label, big value with unit, trend delta, sparkline, loading and error states; a link when `href`/`onClick` is set. */
declare function MetricCard({ label, value, unit, delta, goodWhen, period, icon, sparkline, loading, error, onRetry, className, ...rest }: MetricCardProps): React.JSX.Element;
/** Responsive row/grid of `MetricCard`s. */
declare function MetricGrid({ min, label, className, children }: {
    min?: string;
    label?: string;
    className?: string;
    children: React.ReactNode;
}): React.JSX.Element;
interface GaugeThreshold {
    /** Applies from this value upwards. */
    value: number;
    tone: Exclude<MetricTone, "primary">;
}
declare function gaugeTone(value: number, thresholds?: GaugeThreshold[]): MetricTone;
interface RadialGaugeProps {
    value: number;
    min?: number;
    max?: number;
    unit?: string;
    /** Accessible name. */
    label: string;
    thresholds?: GaugeThreshold[];
    /** Formats the centre value; default plain number. */
    formatValue?: (v: number) => string;
    /** Diameter in px. */
    size?: number;
    /** The arc sweeps in and tweens on value changes; off under `prefers-reduced-motion`. Default on. */
    animate?: ChartAnimate;
    className?: string;
}
/** Radial meter (270° dial; the older half-dial `Gauge` is unchanged); colour follows `thresholds`, and the state is also spelled out as text. */
declare function RadialGauge({ value, min, max, unit, label, thresholds, formatValue, size, animate, className }: RadialGaugeProps): React.JSX.Element;
interface GaugeCardProps extends Omit<CardProps, "title" | "children" | "onSelect">, Omit<RadialGaugeProps, "label" | "className"> {
    title: string;
    description?: React.ReactNode;
    loading?: boolean;
    error?: boolean | string;
    onRetry?: () => void;
}
declare function GaugeCard({ title, description, loading, error, onRetry, value, min, max, unit, thresholds, formatValue, size, animate, className, ...rest }: GaugeCardProps): React.JSX.Element;
interface ProgressCardProps extends Omit<CardProps, "title" | "children" | "onSelect"> {
    title: string;
    description?: React.ReactNode;
    value: number;
    max?: number;
    unit?: string;
    /** Capacity style: colour shifts at `warnAt`/`dangerAt` percent. */
    meter?: boolean;
    warnAt?: number;
    dangerAt?: number;
    formatValue?: (v: number) => string;
    loading?: boolean;
    error?: boolean | string;
    onRetry?: () => void;
    actions?: React.ReactNode;
}
declare function ProgressCard({ title, description, value, max, unit, meter, warnAt, dangerAt, formatValue, loading, error, onRetry, actions, className, ...rest }: ProgressCardProps): React.JSX.Element;
interface StatusSummaryItem {
    id: string;
    label: string;
    count: number;
    tone?: "ok" | "warn" | "danger" | "neutral" | "primary";
    href?: string;
    onClick?: () => void;
}
interface StatusSummaryCardProps extends Omit<CardProps, "title" | "children" | "onSelect"> {
    title: string;
    items: StatusSummaryItem[];
    loading?: boolean;
    headingLevel?: 2 | 3 | 4;
}
/** Counts by status with `StatusDot`s and a proportion bar; each row is a button/link when it has `onClick`/`href`. */
declare function StatusSummaryCard({ title, items, loading, headingLevel, className, ...rest }: StatusSummaryCardProps): React.JSX.Element;

type PortalLabels = (typeof portalEn)["layout"];
type PortalHomeLabels = (typeof portalEn)["home"];
type PortalParams = Record<string, string>;
type Resolvable<T> = T | ((params: PortalParams) => T);
interface PortalTab {
    /** Absolute path; prefix-matched, so `/users/:id/audit/page-2` still lights up `/users/:id/audit`. */
    path: string;
    title: string;
    badge?: React.ReactNode;
    disabled?: boolean;
}
interface PortalRoute {
    /** Absolute path. `:name` matches one segment (`/users/:id`), a trailing `*` matches the rest. */
    path: string;
    /** Page title, nav label and breadcrumb; may depend on route params (`/users/:id` → the user's name). */
    title: Resolvable<string>;
    icon?: React.ReactNode;
    /** `PageHeader` subtitle. */
    description?: Resolvable<string | undefined>;
    /** Sidebar heading this top-level route is grouped under. */
    section?: string;
    /** Keep it out of the sidebar (detail pages); the nearest visible ancestor stays highlighted. */
    hidden?: boolean;
    badge?: React.ReactNode;
    disabled?: boolean;
    /** Nested routes: an expandable nav group and the parents in the breadcrumb. Give the group an overview child to keep its own page reachable. */
    children?: PortalRoute[];
    /** Tabs in the page header; the tab paths belong to this route. */
    tabs?: PortalTab[];
    /** Badges next to the page title / actions at the end of the header. */
    badges?: Resolvable<React.ReactNode>;
    actions?: Resolvable<React.ReactNode>;
    /** `false` renders no `PageHeader` and breadcrumb (the page brings its own, e.g. `PortalHome`). */
    header?: boolean;
}
interface PortalMatch {
    /** Root → leaf routes that contain the path. */
    chain: PortalRoute[];
    route: PortalRoute | undefined;
    tab: PortalTab | undefined;
    params: PortalParams;
}
/** Finds the route (and tab) a pathname belongs to: an exact match wins, else the most specific prefix. The root path only matches exactly. */
declare function resolvePortalRoute(routes: PortalRoute[], path: string): PortalMatch;
/** Links rendered by the layout; spread everything onto your router's `<Link to={to}>`. */
type PortalLinkProps = React.HTMLAttributes<HTMLElement> & {
    to: string;
    href: string;
    className?: string;
    children?: React.ReactNode;
    "aria-current"?: "page";
};
type PortalLinkRenderer = (props: PortalLinkProps) => React.ReactElement;
/** Breadcrumb trail of a match: `home` › parents › current page (› tab). Empty on the home route. */
declare function portalBreadcrumbs(routes: PortalRoute[], path: string, opts: {
    homeLabel: string;
    homePath?: string;
    link?: (to: string) => Omit<BreadcrumbItemProps, "label">;
}): BreadcrumbItemProps[];
/** Sidebar model of a route tree: sections become headings, `current` follows the matched route. */
declare function portalNavEntries(routes: PortalRoute[], path: string, opts?: {
    link?: (route: PortalRoute) => Pick<NavItem, "href" | "onSelect" | "render">;
}): NavEntry[];
interface PortalApp {
    id: string;
    name: string;
    description?: string;
    icon?: React.ReactNode;
    href?: string;
    /** Opens in a new tab. */
    external?: boolean;
    badge?: React.ReactNode;
    /** Initial favourite state for `PortalHome` when `favourites` is not controlled. */
    favourite?: boolean;
    /** When the user last opened it (`PortalHome` › Recent apps). */
    lastOpened?: Date | string | number;
    onSelect?: (app: PortalApp) => void;
}
interface AppSwitcherProps {
    apps: PortalApp[];
    /** Id of the app the user is in now; marked with `aria-current`. */
    current?: string;
    onSelect?: (app: PortalApp) => void;
    /** Footer link to the launchpad. */
    allApps?: {
        href?: string;
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    };
    labels?: Partial<PortalLabels>;
}
/** Masthead grid menu of the portal's apps. */
declare function AppSwitcher({ apps, current, onSelect, allApps, labels }: AppSwitcherProps): React.JSX.Element;
interface PortalUser {
    name: string;
    email?: string;
    tenant?: string;
    avatarSrc?: string;
    items?: {
        id: string;
        label: string;
        icon?: React.ReactNode;
        onSelect: () => void;
    }[];
    onSignOut?: () => void;
}
interface PortalSearch {
    /** Extra commands next to the automatic page and app commands. */
    commands?: Command[];
    /** Async source (people, documents …), merged into the palette results. */
    onSearch?: (query: string) => Promise<Command[]>;
    recent?: Command[];
    placeholder?: string;
}
interface PortalPageContext {
    route: PortalRoute | undefined;
    tab: PortalTab | undefined;
    params: PortalParams;
    breadcrumbs: BreadcrumbItemProps[];
    title: string;
}
interface PortalLayoutProps extends Pick<AppFrameProps, "persistKey" | "sidebarCollapse" | "drawer" | "drawerPlacement" | "className"> {
    brand: {
        logo?: React.ReactNode;
        title: React.ReactNode;
        subtitle?: React.ReactNode;
    };
    routes: PortalRoute[];
    /** Current pathname (`useLocation().pathname`). */
    path: string;
    /** Called for plain left-clicks on links instead of a full page load. Omit to let `href`s navigate normally. */
    onNavigate?: (path: string) => void;
    /** Router `<Link>` escape hatch for nav items, breadcrumbs, tabs and the brand. */
    render?: PortalLinkRenderer;
    /** `path` → `href` (base paths, hash routers …). Default: identity. */
    hrefFor?: (path: string) => string;
    /** Route of the brand link and the first breadcrumb. Default `/`. */
    homePath?: string;
    /** Apps of the switcher (and of the palette). */
    apps?: PortalApp[];
    currentApp?: string;
    onAppSelect?: (app: PortalApp) => void;
    allAppsPath?: string;
    /** `false` removes the search trigger and palette. */
    search?: false | PortalSearch;
    notifications?: NotificationCenterProps;
    user?: PortalUser;
    /** `false` hides the toggle. */
    theme?: false | ThemeToggleProps;
    /** Extra masthead actions before the built-ins. */
    mastheadActions?: React.ReactNode;
    sidebarHeader?: React.ReactNode;
    sidebarFooter?: React.ReactNode;
    /** `AppFooter` props or your own element. */
    footer?: AppFooterProps | React.ReactElement;
    /** Replaces the route-derived `PageHeader`; `false` removes it. */
    pageHeader?: false | React.ReactNode | ((ctx: PortalPageContext) => React.ReactNode);
    /** Page header actions; the route's own `actions` win. */
    pageActions?: React.ReactNode;
    labels?: Partial<PortalLabels>;
    frameLabels?: Partial<AppFrameLabels>;
    children?: React.ReactNode;
}
/**
 * Multi-app portal shell on top of `AppFrame`: masthead (brand, global search palette, app switcher, notifications,
 * theme, user menu), a sidebar built from `routes`, and a `PageHeader` whose breadcrumb, title and tabs follow the
 * current `path`. Router-agnostic: pass `path`, `onNavigate` and optionally `render` for your `<Link>`.
 */
declare function PortalLayout({ brand, routes, path, onNavigate, render, hrefFor, homePath, apps, currentApp, onAppSelect, allAppsPath, search, notifications, user, theme, mastheadActions, sidebarHeader, sidebarFooter, footer, pageHeader, pageActions, labels, frameLabels, persistKey, sidebarCollapse, drawer, drawerPlacement, className, children, }: PortalLayoutProps): React.JSX.Element;
interface PortalAnnouncement {
    id: string;
    title: string;
    body?: React.ReactNode;
    date?: Date | string | number;
    tone?: "info" | "ok" | "warn" | "danger";
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
interface PortalQuickAction {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    href?: string;
    onSelect?: () => void;
}
interface PortalHomeProps {
    /** Greets by name; `title` overrides the greeting. */
    user?: {
        name: string;
    };
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    apps: PortalApp[];
    /** Favourite app ids (controlled); uncontrolled starts from the apps' `favourite` flags. */
    favourites?: string[];
    onFavouritesChange?: (ids: string[]) => void;
    /** Called when an app card is opened (e.g. to record "recent"). */
    onAppOpen?: (app: PortalApp) => void;
    /** Recent apps in display order; default: apps with `lastOpened`, newest first. */
    recent?: PortalApp[];
    announcements?: PortalAnnouncement[];
    onDismissAnnouncement?: (id: string) => void;
    quickActions?: PortalQuickAction[];
    labels?: Partial<PortalHomeLabels>;
    className?: string;
}
/** Launchpad: favourite and recent apps, announcements and quick actions. */
declare function PortalHome({ user, title, subtitle, apps, favourites, onFavouritesChange, onAppOpen, recent, announcements, onDismissAnnouncement, quickActions, labels, className }: PortalHomeProps): React.JSX.Element;

interface ServerGridQuery {
    sort: GridSort[];
    /** 1-based. */
    page: number;
    pageSize: number;
    filters: GridFilter[];
    /** Debounced search text. */
    search: string;
}
interface ServerGridRequest extends ServerGridQuery {
    /** Cursor returned with the previous page (`nextCursor`); undefined for the first page or offset APIs. */
    cursor?: string;
    /** Aborted as soon as a newer request supersedes this one or the grid unmounts. */
    signal: AbortSignal;
}
interface ServerGridResult<T> {
    rows: T[];
    /** Total rows matching the query; leave out for cursor APIs that cannot count. */
    total?: number;
    /** Cursor of the next page; `null` marks the last page. */
    nextCursor?: string | null;
}
type ServerGridFetcher<T> = (request: ServerGridRequest) => Promise<ServerGridResult<T>>;
/** Where the grid state is mirrored: the browser URL by default, or a router's search params. */
interface ServerGridUrlAdapter {
    /** Current search string (with or without the leading `?`). */
    read: () => string;
    write: (search: string, mode: "push" | "replace") => void;
    /** Notify on external changes (back/forward); returns the unsubscribe function. */
    subscribe?: (onChange: () => void) => () => void;
}
interface ServerGridUrlOptions {
    adapter?: ServerGridUrlAdapter;
    /** Namespaces the parameters (`<prefix>sort`, `<prefix>page` …) when several grids share a URL. */
    prefix?: string;
    /** `replace` (default) keeps the back button usable; `push` adds a history entry per change. */
    history?: "push" | "replace";
}
interface UseServerGridOptions<T> {
    fetcher: ServerGridFetcher<T>;
    initialSort?: GridSort[];
    initialFilters?: GridFilter[];
    initialSearch?: string;
    initialPage?: number;
    /** Default 25. */
    pageSize?: number;
    /** Delay before typing in the search box triggers a request. Default 300; 0 disables. */
    debounceMs?: number;
    /** `true` uses the browser URL (`history.replaceState`). */
    urlSync?: boolean | ServerGridUrlOptions;
    /** Hold off fetching (e.g. until a tenant is known). Default true. */
    enabled?: boolean;
    /** Keep showing the previous rows while a new query loads (stale-while-revalidate). Default true. */
    keepPreviousData?: boolean;
    onError?: (error: unknown) => void;
}
interface ServerGridController<T> {
    rows: T[];
    total: number | undefined;
    pageCount: number | undefined;
    hasNext: boolean;
    sort: GridSort[];
    page: number;
    pageSize: number;
    filters: GridFilter[];
    /** Live value of the search box; the request uses the debounced `query.search`. */
    search: string;
    /** What the latest request was (or is being) made with. */
    query: ServerGridQuery;
    /** A request is in flight. */
    loading: boolean;
    /** In flight with nothing to show yet. */
    initialLoading: boolean;
    /** `rows` belong to an earlier query while the current one loads. */
    stale: boolean;
    error: unknown;
    setSort: (sort: GridSort[]) => void;
    setFilters: (filters: GridFilter[]) => void;
    setSearch: (search: string) => void;
    /** Applies the pending search text without waiting for the debounce. */
    flushSearch: () => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    /** Back to the initial sort, filters, search and page. */
    reset: () => void;
    /** Refetches the current query (keeps the rows visible). */
    refresh: () => void;
    /** Spread onto `<DataGrid>`; it already sets `manual`. */
    gridProps: Pick<DataGridProps<T>, "rows" | "manual" | "sort" | "onSortChange" | "filters" | "onFiltersChange" | "search" | "onSearchChange" | "loading" | "error" | "onRetry" | "rowCount" | "pagination">;
}
declare const browserSearchParams: ServerGridUrlAdapter;
/** Reads `q`, `sort` (`name:asc,age:desc`), `page`, `size` and `f.<id>` / `fj.<id>` (JSON) back into grid state. */
declare function serverGridFromSearchParams(search: string | URLSearchParams, defaults?: Partial<ServerGridQuery>, prefix?: string): ServerGridQuery;
/** Inverse of {@link serverGridFromSearchParams}: writes the non-default parts of `state` into `params` (other parameters stay). */
declare function serverGridToSearchParams(state: ServerGridQuery, params?: URLSearchParams, defaults?: Partial<ServerGridQuery>, prefix?: string): URLSearchParams;
/**
 * State and data loading for a server-driven table: sort, page/cursor, page size, filters and debounced search.
 * Every change refetches; the previous request is aborted, stale responses are dropped, and the previous rows
 * stay on screen (`stale`) until the new ones arrive. Changing sort, filters, search or page size returns to page 1.
 */
declare function useServerGrid<T>(options: UseServerGridOptions<T>): ServerGridController<T>;
type Owned = "rows" | "manual" | "sort" | "onSortChange" | "filters" | "onFiltersChange" | "search" | "onSearchChange" | "loading" | "error" | "onRetry" | "rowCount" | "pagination" | "toolbar";
interface ServerDataGridProps<T> extends Omit<DataGridProps<T>, Owned>, UseServerGridOptions<T> {
    /** Page sizes offered in the footer. Default 10/25/50/100. */
    pageSizes?: number[];
    /** Search box above the grid (debounced). Default true. */
    searchable?: boolean;
    searchPlaceholder?: string;
    /** Adds a `FilterBar` whose parsed filters become `filters` in the request. */
    filterFields?: FilterField[];
    filterBar?: Partial<Omit<FilterBarProps, "fields" | "value" | "onChange">>;
    /** Extra toolbar content before / after the built-in controls; inside the grid, so `GridColumnsMenu` & co. work. */
    toolbarStart?: React.ReactNode;
    toolbarEnd?: React.ReactNode;
    /** Show the refresh button. Default true. */
    refreshable?: boolean;
    /** Imperative access to the grid state (e.g. to refresh after a mutation). */
    controllerRef?: React.Ref<ServerGridController<T>>;
}
/** `DataGrid` + `useServerGrid` + `Toolbar`/`SearchInput`/`FilterBar`: a sortable, paginated, searchable server table in one element. */
declare function ServerDataGrid<T>({ fetcher, initialSort, initialFilters, initialSearch, initialPage, pageSize, debounceMs, urlSync, enabled, keepPreviousData, onError, pageSizes, searchable, searchPlaceholder, filterFields, filterBar, toolbarStart, toolbarEnd, refreshable, controllerRef, ...grid }: ServerDataGridProps<T>): React.JSX.Element;

/** Delivery states of an outbound job, as the storage service reports them (`OutboundJob.status`). */
type QueueJobStatus = "PENDING" | "DELIVERED" | "TRANSIENT_FAILURE" | "PERMANENT_FAILURE";
/** Badge for an outbound queue job status; unknown values render as "Unknown" instead of throwing. */
declare function QueueStatusBadge({ status, className }: {
    status: QueueJobStatus | (string & {});
    className?: string;
}): React.JSX.Element;
interface QuotaBarProps {
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
declare function QuotaBar({ usedBytes, quotaBytes, label, warnAt, dangerAt, className }: QuotaBarProps): React.JSX.Element;
type ServiceHealth = "up" | "degraded" | "down" | "unknown";
interface ServiceTileProps {
    name: string;
    status: ServiceHealth;
    /** Secondary line, e.g. listener ports or a version. */
    detail?: React.ReactNode;
    onSelect?: () => void;
    className?: string;
}
/** One daemon in a health overview: name, status dot with text (never colour alone) and a detail line. */
declare function ServiceTile({ name, status, detail, onSelect, className }: ServiceTileProps): React.JSX.Element;
interface HealthGridProps {
    services: (ServiceTileProps & {
        id: string;
    })[];
    label?: string;
    className?: string;
}
/** Responsive grid of `ServiceTile`s. */
declare function HealthGrid({ services, label, className }: HealthGridProps): React.JSX.Element;
type DnsRecordState = "verified" | "missing" | "mismatch" | "optional" | "unknown";
interface DnsRecord {
    id: string;
    type: "MX" | "TXT" | "CNAME" | "A" | "AAAA" | "SRV" | "TLSA" | (string & {});
    host: string;
    value: string;
    /** What the record is for: "SPF", "DKIM", "DMARC", "MTA-STS" … */
    purpose: string;
    state?: DnsRecordState;
}
interface DnsRecordTableProps {
    records: DnsRecord[];
    label?: string;
    className?: string;
}
/** Records a domain must publish, each value with a copy button and a verification badge. */
declare function DnsRecordTable({ records, label, className }: DnsRecordTableProps): React.JSX.Element;
interface TraceHop {
    id: string;
    time: Date | string | number;
    label: React.ReactNode;
    detail?: React.ReactNode;
    tone?: "ok" | "warn" | "danger" | "neutral" | "primary";
    /** Milliseconds since the first hop; shown as "+120 ms". */
    elapsedMs?: number;
}
interface TraceTimelineProps {
    hops: TraceHop[];
    label?: string;
    className?: string;
}
/** Ordered hop list of one message or request (SMTP accept → queue → relay → delivered). */
declare function TraceTimeline({ hops, label, className }: TraceTimelineProps): React.JSX.Element;

type Level = 2 | 3 | 4;
interface ResourceOverviewLayoutProps {
    /** Identity card (top start). */
    identity?: React.ReactNode;
    /** Wide details card (top, beside the identity). */
    details?: React.ReactNode;
    /** Wide utilization panel under the identity/details row. */
    utilization?: React.ReactNode;
    /** Side cards stacked in a column that spans both rows; omit for a two-column grid. */
    aside?: React.ReactNode;
    className?: string;
}
/**
 * Responsive object overview grid. Sized by its own width (container query), so it collapses to a single
 * column below 860 px of available space even inside an `AppFrame` with a sidebar.
 */
declare function ResourceOverviewLayout({ identity, details, utilization, aside, className }: ResourceOverviewLayoutProps): React.JSX.Element;
interface PowerStateProps {
    state: ObjectState;
    /** Replaces the catalogue text for the state (e.g. "Running"). */
    label?: string;
    className?: string;
}
/** Icon + text state indicator; the state is always spelled out, never colour alone. */
declare function PowerState({ state, label, className }: PowerStateProps): React.JSX.Element;
interface IdentityCardProps {
    /** Large logo or icon at the start (e.g. an OS logo). */
    icon?: React.ReactNode;
    name: string;
    /** Power/status line under the name (usually `PowerState`). */
    status?: React.ReactNode;
    description?: React.ReactNode;
    /** Label ribbon on the inline-end top edge, e.g. "WINDOWS 10". */
    ribbon?: string;
    onEdit?: () => void;
    editLabel?: string;
    headingLevel?: Level;
    className?: string;
    children?: React.ReactNode;
}
declare function IdentityCard({ icon, name, status, description, ribbon, onEdit, editLabel, headingLevel, className, children }: IdentityCardProps): React.JSX.Element;
interface CardFrameProps {
    title: string;
    icon?: React.ReactNode;
    count?: number;
    onEdit?: () => void;
    editLabel?: string;
    headingLevel?: Level;
    className?: string;
    bodyClassName?: string;
    children?: React.ReactNode;
}
interface DetailsItem {
    id?: string;
    label: string;
    value: React.ReactNode;
    /** Secondary line under the value (e.g. "97% uptime last 7 days"). */
    sub?: React.ReactNode;
}
interface DetailsCardProps extends Omit<CardFrameProps, "title" | "icon" | "count" | "children"> {
    title?: string;
    items: DetailsItem[];
    /** Columns of term/description pairs (items fill them top to bottom); collapses to one on narrow cards. Default 2. */
    columns?: 1 | 2 | 3;
}
/** Term/description card built on `DescriptionList`; the header carries an optional edit action. */
declare function DetailsCard({ title, items, columns, ...rest }: DetailsCardProps): React.JSX.Element;
interface SideCardProps extends Omit<CardFrameProps, "bodyClassName"> {
    /** Shown instead of the children when there are none. */
    empty?: React.ReactNode;
}
/** Compact side card: icon, title, count badge, edit action and a body with an empty state. */
declare function SideCard({ empty, children, ...rest }: SideCardProps): React.JSX.Element;
interface CountCardItem {
    id: string;
    content: React.ReactNode;
}
interface CountCardProps extends Omit<SideCardProps, "children" | "count"> {
    items: CountCardItem[];
    /** Badge number; defaults to `items.length`. */
    count?: number;
}
/** `SideCard` that renders a list and badges its length. */
declare function CountCard({ items, count, ...rest }: CountCardProps): React.JSX.Element;
interface UtilizationPanelProps {
    title?: string;
    headingLevel?: Level;
    /** Minimum column width before the columns wrap. Default 8rem. */
    min?: string;
    className?: string;
    children?: React.ReactNode;
}
declare function UtilizationPanel({ title, headingLevel, min, className, children }: UtilizationPanelProps): React.JSX.Element;
interface UtilizationColumnProps {
    title: string;
    /** Big number: what is still available, in the unit named by `capacity`. */
    available: React.ReactNode;
    /** Total with unit, shown as "of …" next to the number, e.g. "1000 MHz". */
    capacity: string;
    /** Current usage, in the same unit as `max`. */
    used: number;
    /** Scale of the ring (default 100: `used` is a percentage). */
    max?: number;
    /** Warning / critical thresholds as percentages of `max`. */
    warnAt?: number;
    dangerAt?: number;
    /** Ring centre text instead of the percentage (e.g. "25"). */
    centerText?: React.ReactNode;
    /** Text under the centre value; defaults to "Used". */
    centerSubtext?: React.ReactNode;
    /** `donut` (default, `ThresholdDonut`) or the 270° `radial` gauge. */
    gauge?: "donut" | "radial";
    /** Colour of the ring below `warnAt` (donut and radial). Default `ok`. */
    okTone?: "primary" | "ok";
    /** Last-N samples for the trend line. */
    history?: number[];
    /** Caption under the trend, default "Last 7 days". */
    rangeLabel?: string;
    /** Formats the trend tooltip value. */
    formatValue?: (v: number) => string;
    /** Per-sample tooltip headers for the trend. */
    xLabels?: string[];
    /** Ring size in px. Default 128. */
    size?: number;
    /** Ring entry/change animation and trend draw-in; off under reduced motion. Default on. */
    animate?: ChartAnimate;
    /** Tooltip for the ring and trend (the radial gauge has none). Default on. */
    tooltip?: ChartTooltipOption;
    headingLevel?: 3 | 4 | 5;
    className?: string;
}
/** One resource column: heading, available/capacity, threshold ring and a trend line with its range caption. */
declare function UtilizationColumn({ title, available, capacity, used, max, warnAt, dangerAt, centerText, centerSubtext, gauge, okTone, history, rangeLabel, formatValue, xLabels, size, animate, tooltip, headingLevel, className, }: UtilizationColumnProps): React.JSX.Element;
interface ObjectHeaderProps {
    /** Ancestors of the object, e.g. "Virtual Machines". The object itself is the `title`. */
    breadcrumb?: BreadcrumbItemProps[];
    title: string;
    /** Icon button next to the title (switch / compare object). */
    onSwitch?: () => void;
    switchIcon?: React.ReactNode;
    switchLabel?: string;
    /** Actions row under the breadcrumb, aligned to the inline end; usually an `ActionToolbar`. */
    actions?: React.ReactNode;
    /** Accessible name of the breadcrumb navigation. */
    breadcrumbLabel?: string;
    headingLevel?: 1 | 2;
    className?: string;
}
declare function ObjectHeader({ breadcrumb, title, onSwitch, switchIcon, switchLabel, actions, breadcrumbLabel, headingLevel, className }: ObjectHeaderProps): React.JSX.Element;
interface ToolbarMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onSelect?: () => void;
    disabled?: boolean;
    danger?: boolean;
}
interface ToolbarAction {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonProps["variant"];
    disabled?: boolean;
    /** Turns the action into a split button: the main part runs `onClick`, the chevron opens these items. */
    menu?: ToolbarMenuItem[];
    /** Accessible name of the chevron; default "<label> options". */
    menuLabel?: string;
}
interface ActionToolbarProps {
    actions: ToolbarAction[];
    /** Accessible name of the group; default "Actions". */
    label?: string;
    size?: ButtonProps["size"];
    className?: string;
}
/**
 * Row of buttons and split buttons (menus close on Escape and are fully keyboard operable). The first
 * `variant: "primary"` entry stays the visual call to action; others default to `secondary`.
 */
declare function ActionToolbar({ actions, label, size, className }: ActionToolbarProps): React.JSX.Element;

/** Solid-state drive: a board with a controller chip and a status LED. */
declare const SsdGlyph: ObjectGlyph;
/** Hard disk drive: a platter with its spindle and the actuator arm. */
declare const HddGlyph: ObjectGlyph;
/** NVMe drive: an M.2 stick with a connector notch and a bolt. */
declare const NvmeGlyph: ObjectGlyph;
/** iSCSI target: a disk reached over an IP network. */
declare const IscsiGlyph: ObjectGlyph;
/** SAN: hosts, a fibre-channel switch and an array. */
declare const SanGlyph: ObjectGlyph;
/** NAS: a two-bay enclosure with handles and activity LEDs. */
declare const NasGlyph: ObjectGlyph;
/** NFS export: a shared folder with network nodes. */
declare const NfsGlyph: ObjectGlyph;
/** Virtual disk: a dashed disk with a cube. */
declare const VdiskGlyph: ObjectGlyph;
/** Disk array: two stacked enclosures with drive bays. */
declare const DiskArrayGlyph: ObjectGlyph;
/** LUN: one slice carved out of a storage pool. */
declare const LunGlyph: ObjectGlyph;
/** Volume: a cylinder with a partition band. */
declare const VolumeGlyph: ObjectGlyph;
type RaidLevel = 0 | 1 | 5 | 6 | 10;
interface RaidGlyphProps extends React.SVGProps<SVGSVGElement> {
    /** RAID level; each level has its own drive-bar drawing. Omit for the generic RAID set. */
    level?: RaidLevel;
}
/** RAID set: drive bars, drawn per level (0 striped, 1 mirrored, 5/6 distributed parity, 10 mirrored pairs). */
declare const RaidGlyph: React.FC<RaidGlyphProps>;
/** Virtual switch: a dashed switch with vNIC ports up and an uplink down. */
declare const VSwitchGlyph: ObjectGlyph;
/** Virtual NIC: a dashed adapter card with a port and edge connector. */
declare const VnicGlyph: ObjectGlyph;
/** VLAN: a trunk fanning out into separate lanes. */
declare const VlanGlyph: ObjectGlyph;
/** Firewall: a brick wall. */
declare const FirewallGlyph: ObjectGlyph;
/** Load balancer: one entry point spreading to three targets. */
declare const LoadBalancerGlyph: ObjectGlyph;
/** Router: four arrows leaving a hub. */
declare const RouterGlyph: ObjectGlyph;
/** Uplink: an arrow leaving a physical port. */
declare const UplinkGlyph: ObjectGlyph;
/** VPN: a padlock with a tunnel on each side. */
declare const VpnGlyph: ObjectGlyph;

export { Accordion, type AccordionItem, AccountItem, AccountList, ActionBar, type ActionBarProps, ActionGroup, ActionToolbar, type ActionToolbarProps, type ActivityComment, type ActivityEvent, type ActivityItem, ActivityTimeline, AdminShell, Alert, AlertGroup, type AlertProps, type AlertTone, AppFooter, type AppFooterBuild, type AppFooterProps, AppFrame, type AppFrameContextValue, type AppFrameLabels, type AppFrameProps, AppSwitcher, type AppSwitcherProps, type AuditEvent, AuditLog, AuthFooter, Avatar, AvatarGroup, Badge, Banner, BrandHeader, Breadcrumb, type BreadcrumbItemProps, Button, ButtonGroup, type ButtonProps, CapacityBar, type CapacityBarProps, CardProps, type ChartSeries, Checkbox, Chip, ClientInfo, ClipboardCopy, type ClipboardCopyProps, CodeBlock, CodeBlockCode, type CodeBlockProps, CodeDisplay, CodeEditor, CodeEditorLite, CodeInput, ComboboxOption, type Command, CommandPalette, ConfirmDialog, ContextMenu, ContextMenuContent, ContextMenuFor, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger, CopyButton, CountCard, type CountCardItem, type CountCardProps, DataGrid, type DataGridProps, DatePicker, type DatePickerProps, type DateRangeValue, DefinitionList, DescriptionList, DescriptionListDescription, DescriptionListGroup, type DescriptionListProps, DescriptionListTerm, DetailPage, DetailsCard, type DetailsCardProps, type DetailsItem, DeviceSteps, type DeviceStepsProps, Dialog, DialogClose, DialogContent, type DialogSize, DialogTrigger, type DiffOp, DiffView, DiskArrayGlyph, Divider, type DnsRecord, type DnsRecordState, DnsRecordTable, type DnsRecordTableProps, DockedTaskPanel, Drawer, DrawerClose, DrawerContent, DrawerPanel, type DrawerPanelProps, type DrawerPlacement, DrawerTrigger, Dropdown, DropdownGroup, DropdownItem, DropdownList, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, type DropdownProps, DropdownSeparator, EmptyState, ErrorPage, type ErrorVariant, Field, type FieldProps, type Filter, FilterBar, type FilterBarLabels, type FilterBarProps, type FilterField, type FilterOp, type FilterOption, type FilterToken, FirewallGlyph, Flex, FlexItem, type FlexProps, type FooterLink, type FooterLinkGroup, Form, FormFooter, FormGroup, type FormGroupProps, FormHelperText, FormPage, FormSection, Formatters, type Gap, GaugeCard, type GaugeCardProps, type GaugeThreshold, Grid, type GridColumn, GridColumnsMenu, type GridDensity, GridDensityToggle, type GridFilter, type GridFilterRenderer, GridItem, type GridItemProps, type GridLabels, type GridMenuItem, type GridPagination, GridSearch, type GridSort, HddGlyph, HealthGrid, type HealthGridProps, Heatmap, HelperText, HelperTextItem, type HotkeyOptions, HotkeysProvider, HoverCard, IconButton, type IconButtonProps, IdentityCard, type IdentityCardProps, InfiniteList, type InfiniteListProps, InfoBox, InlineDrawer, Input, type InputProps, InventoryLayout, type InventoryLayoutProps, IscsiGlyph, IssueCard, type IssueData, IssueRow, Kbd, type KeyValue, KeyValueEditor, Label, type LabelDef, LabelPicker, type LabelSlot, LabelSwatch, LafErrorBoundary, LanguageSwitcher, LineChart, LoadBalancerGlyph, type LogLine, LogViewer, type LogViewerLabels, LunGlyph, Masthead, MastheadActions, MastheadBrand, type MastheadBrandProps, MastheadContent, MastheadToggle, Menu, type MenuItemSpec, MenuShortcut, MenuToggle, type MenuToggleProps, MetricCard, type MetricCardProps, type MetricDelta, MetricGrid, type MetricTone, type MetricTrend, MfaEnrolment, type MfaEnrolmentProps, type MfaMethod, MobileNav, Modal, ModalBody, ModalClose, ModalFooter, ModalHeader, type ModalProps, ModalTrigger, NasGlyph, type NavDivider, type NavEntry, NavGroup, type NavHeading, type NavItem, NavLink, type NavRenderProps, NavTree, type NavTreeProps, NfsGlyph, NotificationCenterProps, NumberInput, NvmeGlyph, ObjectGlyph, ObjectHeader, type ObjectHeaderProps, ObjectKind, ObjectPage, type ObjectPageCard, type ObjectPageProps, ObjectState, OptionPicker, type OptionPickerProps, OtpInput, OverflowTabs, PageHead, PageHeader, type PageHeaderProps, PageSection, type PageSectionProps, Pagination, type PaginationProps, Panel, type ParsedFilter, PasswordField, type PasswordFieldProps, type PermissionGroup, PermissionMatrix, type PermissionMatrixLabels, type PickerOption, Popover, PopoverClose, PopoverContent, PopoverTrigger, type PortalAnnouncement, type PortalApp, PortalHome, type PortalHomeLabels, type PortalHomeProps, type PortalLabels, PortalLayout, type PortalLayoutProps, type PortalLinkProps, type PortalLinkRenderer, type PortalMatch, type PortalPageContext, type PortalParams, type PortalQuickAction, type PortalRoute, type PortalSearch, type PortalTab, type PortalUser, PowerState, type PowerStateProps, Progress, ProgressCard, type ProgressCardProps, ProgressSummary, PropertiesPane, type PropertyField, type PropertyGroup, type QueueJobStatus, QueueStatusBadge, QuotaBar, type QuotaBarProps, RadialGauge, type RadialGaugeProps, Radio, RadioGroup, type RadioGroupProps, type RadioProps, RaidGlyph, type RaidGlyphProps, type Reaction, Reactions, type RegisteredHotkey, RelativeTime, type ResolvedTheme, ResourceOverviewLayout, type ResourceOverviewLayoutProps, RouterGlyph, SanGlyph, type SavedView, SavedViews, type SavedViewsLabels, type SavedViewsProps, type SavedViewsStorage, ScopeList, SearchInput, SecretDisplay, SegmentedControl, type SegmentedControlProps, type SegmentedItem, Select, type SelectGroup, SelectMenu, type SelectOption, type SelectProps, ServerDataGrid, type ServerDataGridProps, type ServerGridController, type ServerGridFetcher, type ServerGridQuery, type ServerGridRequest, type ServerGridResult, type ServerGridUrlAdapter, type ServerGridUrlOptions, type ServiceHealth, ServiceTile, type ServiceTileProps, type Severity, ShortcutHelp, SideCard, type SideCardProps, Sidebar, type SidebarProps, Skeleton, Slider, type SliderProps, SocialButton, SocialButtons, SocialDivider, Sparkline, type SparklineProps, Spinner, SplitButton, SplitPane, SsdGlyph, Stack, StackItem, StackedBarChart, Stat, StatGrid, StatusDot, StatusSummaryCard, type StatusSummaryCardProps, type StatusSummaryItem, type Step, Stepper, SubNav, type SubNavGroup, type SubNavItem, Switch, Table, Tabs, TabsContent, TabsList, TabsTrigger, TagInput, type TaskItem, TaskPanel, type TaskStatus, TenantSwitcher, Textarea as TextArea, Input as TextInput, type TextTerm, Textarea, type ThemeMode, ThemeToggle, type ThemeToggleProps, TimeRangePicker, Title, type TitleSize, type ToastOptions, ToastProvider, type ToastTone, Toolbar, type ToolbarAction, ToolbarActions, ToolbarBulk, type ToolbarBulkProps, ToolbarContent, ToolbarDivider, type ToolbarFilter, ToolbarFilterChips, type ToolbarFilterChipsProps, ToolbarGroup, type ToolbarGroupProps, ToolbarItem, type ToolbarMenuItem, type ToolbarProps, ToolbarSpacer, Tooltip, TooltipProvider, TopBar, type TopBarCounter, type TopologyEdge, TopologyGraph, type TopologyNode, type TraceHop, TraceTimeline, type TraceTimelineProps, TreeTable, type TreeTableNode, type TreeTableProps, TreeViewProps, TruncatedText, type UnitOption, UnsavedChangesDialog, type UnsavedChangesGuard, UplinkGlyph, type UseSavedViewsOptions, type UseServerGridOptions, UserCell, UserMenu, UtilizationColumn, type UtilizationColumnProps, UtilizationPanel, type UtilizationPanelProps, VSwitchGlyph, VdiskGlyph, VirtualList, VlanGlyph, VnicGlyph, VolumeGlyph, VpnGlyph, Wizard, type WizardLabels, type WizardProps, WizardReview, type WizardStep, browserSearchParams, buttonVariants, cn, dialogBase, dialogSizes, diffLines, format, formatHotkey, formatRelative, gaugeTone, highlight, isMacPlatform, matchesAccept, observeRectWithFallback, parseFilter, parseHotkey, portalBreadcrumbs, portalNavEntries, resolvePortalRoute, serializeFilter, serializeToken, serverGridFromSearchParams, serverGridToSearchParams, useAppFrame, useControllableState, useHotkeys, useRegisteredHotkeys, useSavedViews, useServerGrid, useToast, useToasts, useUnsavedChangesGuard };
