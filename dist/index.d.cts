import { ClassValue } from 'clsx';
import { F as Formatters } from './perf-panel-CcKCFsOd.cjs';
export { B as BytesOptions, D as DateTimeOptions, k as DurationOptions, R as RelativeOptions, m as createFormatters } from './perf-panel-CcKCFsOd.cjs';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { C as ComboboxOption, K as Kbd, t as trackerEn } from './i18n-irBAIN8C.cjs';
export { A as AccountSession, a as AlarmItem, b as AlarmList, c as AllowListEditor, d as AllowListEditorProps, e as ApiKeyCreateInput, f as ApiKeyItem, g as ApiKeyManager, h as ApiKeyManagerLabels, i as ApiKeyManagerProps, B as BarChart, j as Branding, k as BrandingEditor, l as BrandingEditorLabels, m as BrandingEditorProps, n as CidrInput, o as ColorField, p as ColorFieldLabels, q as ColorFieldProps, r as Combobox, s as ComboboxProps, u as ComponentMessageOverrides, v as ComponentMessages, w as ConsoleEvent, x as ConsoleFrame, y as ConsoleFrameLabels, z as ConsoleFrameProps, D as ConsoleStatus, E as DatastoreBrowser, F as DatastoreBrowserLabels, G as DatastoreBrowserProps, H as DatastoreEntry, I as DateTimeInput, J as Device, L as DeviceKind, M as DeviceSelector, N as Donut, O as ErrorSummary, P as EventConsole, Q as EventConsoleLabels, R as EventConsoleProps, S as EventSeverity, T as FileDropzone, U as FormField, V as Gauge, W as HardwareCapabilities, X as HardwareEditor, Y as HardwareEditorLabels, Z as HardwareEditorProps, _ as HwDevice, $ as HwKind, a0 as InlineEdit, a1 as IpInput, a2 as LafContextValue, a3 as LafMessages, a4 as LafProvider, a5 as NetworkLabels, a6 as NotificationCenter, a7 as NotificationCenterLabels, a8 as NotificationCenterProps, a9 as NotificationItem, aa as PasskeyItem, ab as PermissionAssignDialog, ac as PermissionAssignDialogProps, ad as PermissionAssignLabels, ae as PermissionAssignment, af as PermissionRole, ag as ReauthDialog, ah as ReauthDialogLabels, ai as ReauthDialogProps, aj as ReauthMethod, ak as SecurityFactors, al as SecurityFactorsLabels, am as SecurityFactorsProps, an as SessionExpiryDialog, ao as SessionExpiryDialogLabels, ap as SessionExpiryDialogProps, aq as SessionList, ar as SessionListLabels, as as SessionListProps, at as SnapshotNode, au as SnapshotTree, av as SnapshotTreeLabels, aw as SnapshotTreeProps, ax as TransferItem, ay as TransferList, az as TransferListLabels, aA as TransferListProps, aB as UploadFile, aC as User, aD as UserSelector, aE as UserSelectorProps, aF as contrastRatio, aG as en, aH as isCidr, aI as isIPv4, aJ as isIPv6, aK as isIp, aL as normalizeHex, aM as parseCidr, aN as useLaf, aO as useLafDefaults, aP as usePortalContainer } from './i18n-irBAIN8C.cjs';
import * as lucide_react from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import * as ContextPrimitive from '@radix-ui/react-context-menu';
import { Virtualizer } from '@tanstack/react-virtual';
import { M as MenuItemSpec$1 } from './tree-DtuKM6CY.cjs';
export { T as TreeDragAdapter, a as TreeDropPosition, b as TreeNode, c as TreeStatus, d as TreeView, e as TreeViewProps } from './tree-DtuKM6CY.cjs';

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

type Tone = "error" | "success" | "warning" | "info";
declare function Alert({ tone, className, children, }: {
    tone?: Tone;
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
declare function Card({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
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
declare function Breadcrumb({ items, maxItems, label }: {
    items: {
        label: string;
        href?: string;
    }[];
    maxItems?: number;
    label?: string;
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
declare function DialogContent({ title, description, footer, children, className, ...props }: Omit<React.ComponentProps<typeof DialogPrimitive.Content>, "title"> & {
    title: string;
    description?: string;
    footer?: React.ReactNode;
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
declare function Tooltip({ content, children, side, }: {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
}): React.JSX.Element;

declare function Toolbar({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
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
}
declare function useToast(): ToastContextValue;
/** Mount once near the app root; render toasts with `useToast().toast(...)`. */
declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;

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
declare function UserMenu({ name, email, tenant, items, signOutLabel: signOutLabelProp, onSignOut, impersonating, expiresAt, expiryWarnMs, expiryLabel, }: {
    name: string;
    email?: string;
    tenant?: string;
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

declare const bannerTone: {
    info: {
        cls: string;
        Icon: lucide_react.LucideIcon;
    };
    warn: {
        cls: string;
        Icon: lucide_react.LucideIcon;
    };
    danger: {
        cls: string;
        Icon: lucide_react.LucideIcon;
    };
};
declare function Banner({ tone, action, onDismiss, dismissLabel, children, }: {
    tone?: keyof typeof bannerTone;
    action?: React.ReactNode;
    onDismiss?: () => void;
    dismissLabel?: string;
    children: React.ReactNode;
}): React.JSX.Element;
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
declare function Sparkline({ data, label, className }: {
    data: number[];
    label: string;
    className?: string;
}): React.JSX.Element;
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
declare function TopBar({ logo, search, counters, notifications, userMenu, start, className, }: {
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
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    current?: number;
    defaultCurrent?: number;
    onCurrentChange?: (index: number) => void;
    labels?: Partial<WizardLabels>;
    className?: string;
}
declare function Wizard({ steps, onFinish, onCancel, dirty, title: titleProp, mode, open, onOpenChange, current: currentProp, defaultCurrent, onCurrentChange, labels: labelsProp, className, }: WizardProps): React.JSX.Element;
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

type ObjectKind = "datacenter" | "cluster" | "host" | "vm" | "template" | "vapp" | "folder" | "resource-pool" | "datastore" | "datastore-cluster" | "network" | "dvswitch" | "portgroup" | "snapshot" | "user" | "group" | "client" | "issue" | "project";
type ObjectState = "on" | "off" | "suspended" | "maintenance" | "disconnected" | "warning" | "error";
/** Register (or override) an icon for an app-specific kind. Call it from app start-up, not at import time of this library. */
declare function registerObjectKind(kind: string, icon: LucideIcon): void;
interface ObjectIconProps {
    kind: ObjectKind | (string & {});
    state?: ObjectState;
    size?: 16 | 20;
    /** Accessible name of the object kind/instance; without it (and without a state) the icon is decorative. */
    label?: string;
    className?: string;
}
declare function ObjectIcon({ kind, state, size, label, className }: ObjectIconProps): React.JSX.Element;

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
    /** Server-side: the grid only emits sort/filter/search state and renders `rows` as given. */
    manual?: boolean;
    rowCount?: number;
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

export { Accordion, type AccordionItem, AccountItem, AccountList, ActionBar, type ActionBarProps, type ActivityComment, type ActivityEvent, type ActivityItem, ActivityTimeline, AdminShell, Alert, type AuditEvent, AuditLog, AuthFooter, Avatar, AvatarGroup, Badge, Banner, BrandHeader, Breadcrumb, Button, ButtonGroup, type ButtonProps, CapacityBar, type CapacityBarProps, Card, type ChartSeries, Checkbox, Chip, ClientInfo, CodeDisplay, CodeEditor, CodeEditorLite, CodeInput, ComboboxOption, type Command, CommandPalette, ConfirmDialog, ContextMenu, ContextMenuContent, ContextMenuFor, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger, CopyButton, DataGrid, type DataGridProps, DatePicker, type DatePickerProps, type DateRangeValue, DefinitionList, DetailPage, DeviceSteps, type DeviceStepsProps, Dialog, DialogClose, DialogContent, DialogTrigger, type DiffOp, DiffView, DockedTaskPanel, Drawer, DrawerClose, DrawerContent, DrawerTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, EmptyState, ErrorPage, type ErrorVariant, Field, type FieldProps, type Filter, FilterBar, type FilterBarLabels, type FilterBarProps, type FilterField, type FilterOp, type FilterOption, type FilterToken, FormFooter, FormPage, FormSection, Formatters, type GridColumn, GridColumnsMenu, type GridDensity, GridDensityToggle, type GridFilter, type GridFilterRenderer, type GridLabels, type GridMenuItem, GridSearch, type GridSort, Heatmap, type HotkeyOptions, HotkeysProvider, HoverCard, IconButton, type IconButtonProps, InfiniteList, type InfiniteListProps, InfoBox, Input, type InputProps, InventoryLayout, type InventoryLayoutProps, IssueCard, type IssueData, IssueRow, Kbd, type KeyValue, KeyValueEditor, Label, type LabelDef, LabelPicker, type LabelSlot, LabelSwatch, LafErrorBoundary, LanguageSwitcher, LineChart, type LogLine, LogViewer, type LogViewerLabels, Menu, type MenuItemSpec, MenuShortcut, MfaEnrolment, type MfaEnrolmentProps, type MfaMethod, MobileNav, NavGroup, NavLink, NumberInput, ObjectIcon, type ObjectIconProps, type ObjectKind, ObjectPage, type ObjectPageCard, type ObjectPageProps, type ObjectState, OptionPicker, type OptionPickerProps, OtpInput, OverflowTabs, PageHead, Pagination, type PaginationProps, Panel, type ParsedFilter, PasswordField, type PasswordFieldProps, type PermissionGroup, PermissionMatrix, type PermissionMatrixLabels, type PickerOption, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, ProgressSummary, PropertiesPane, type PropertyField, type PropertyGroup, Radio, RadioGroup, type RadioGroupProps, type RadioProps, type Reaction, Reactions, type RegisteredHotkey, RelativeTime, type SavedView, SavedViews, type SavedViewsLabels, type SavedViewsProps, type SavedViewsStorage, ScopeList, SearchInput, SecretDisplay, SegmentedControl, type SegmentedControlProps, type SegmentedItem, Select, type SelectGroup, SelectMenu, type SelectOption, type SelectProps, type Severity, ShortcutHelp, Skeleton, Slider, type SliderProps, SocialButton, SocialButtons, SocialDivider, Sparkline, Spinner, SplitButton, SplitPane, StackedBarChart, Stat, StatGrid, StatusDot, type Step, Stepper, SubNav, type SubNavGroup, type SubNavItem, Switch, Table, Tabs, TabsContent, TabsList, TabsTrigger, TagInput, type TaskItem, TaskPanel, type TaskStatus, TenantSwitcher, type TextTerm, Textarea, TimeRangePicker, type ToastOptions, ToastProvider, type ToastTone, Toolbar, Tooltip, TooltipProvider, TopBar, type TopBarCounter, type TopologyEdge, TopologyGraph, type TopologyNode, TreeTable, type TreeTableNode, type TreeTableProps, type UnitOption, UnsavedChangesDialog, type UnsavedChangesGuard, type UseSavedViewsOptions, UserCell, UserMenu, VirtualList, Wizard, type WizardLabels, type WizardProps, WizardReview, type WizardStep, buttonVariants, cn, diffLines, format, formatHotkey, formatRelative, highlight, isMacPlatform, matchesAccept, observeRectWithFallback, parseFilter, parseHotkey, registerObjectKind, serializeFilter, serializeToken, useControllableState, useHotkeys, useRegisteredHotkeys, useSavedViews, useToast, useUnsavedChangesGuard };
