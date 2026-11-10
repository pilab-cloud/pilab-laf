import { ClassValue } from 'clsx';
import { F as Formatters } from './i18n-BlMqNcgW.js';
export { B as BytesOptions, D as DateTimeOptions, a as DurationOptions, b as LafContextValue, L as LafMessages, c as LafProvider, R as RelativeOptions, d as createFormatters, e as en, u as useLaf, f as usePortalContainer } from './i18n-BlMqNcgW.js';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as lucide_react from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import * as ContextPrimitive from '@radix-ui/react-context-menu';
import { Virtualizer } from '@tanstack/react-virtual';

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
declare function Panel({ title, actions, children, className, bodyClassName, }: {
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

interface User {
    id: string;
    name: string;
    email?: string;
}
interface UserSelectorProps {
    value: User[];
    onChange: (value: User[]) => void;
    /** Resolve candidates for a query; may be async. */
    onSearch: (query: string) => User[] | Promise<User[]>;
    multiple?: boolean;
    max?: number;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
}
declare function UserSelector({ value, onChange, onSearch, multiple, max, placeholder: placeholderProp, disabled, label: labelProp, }: UserSelectorProps): React.JSX.Element;
type DeviceKind = "phone" | "laptop" | "tablet" | "key";
interface Device {
    id: string;
    name: string;
    detail?: string;
    kind: DeviceKind;
    badge?: React.ReactNode;
}
declare function DeviceSelector({ devices, value, onValueChange, name, legend, }: {
    devices: Device[];
    value?: string;
    onValueChange: (id: string) => void;
    name: string;
    legend: string;
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

interface GridColumnLegacy<T> {
    id: string;
    header: React.ReactNode;
    cell: (row: T) => React.ReactNode;
    sortable?: boolean;
    numeric?: boolean;
}
interface GridSortLegacy {
    id: string;
    dir: "asc" | "desc";
}
interface DataGridLegacyProps<T> {
    columns: GridColumnLegacy<T>[];
    rows: T[];
    rowId: (row: T) => string;
    sort?: GridSortLegacy;
    onSortChange?: (sort: GridSortLegacy | undefined) => void;
    selected?: string[];
    onSelectedChange?: (ids: string[]) => void;
    loading?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
}
declare function DataGridLegacy<T>({ columns, rows, rowId, sort, onSortChange, selected, onSelectedChange, loading, emptyTitle: emptyTitleProp, emptyDescription, }: DataGridLegacyProps<T>): React.JSX.Element;
type TaskStatus = "queued" | "running" | "ok" | "failed" | "cancelled";
interface TaskItem {
    id: string;
    name: string;
    target?: string;
    initiator?: string;
    status: TaskStatus;
    /** 0–100 while running */
    progress?: number;
    started?: string;
    error?: string;
}
declare function TaskPanel({ tasks, onCancel, onRetry, labels: labelsProp, }: {
    tasks: TaskItem[];
    onCancel?: (id: string) => void;
    onRetry?: (id: string) => void;
    labels?: {
        cancel: string;
        retry: string;
        empty: string;
    };
}): React.JSX.Element;
declare function UserMenu({ name, email, tenant, items, signOutLabel: signOutLabelProp, onSignOut, }: {
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
}): React.JSX.Element;

interface ComboboxOption {
    value: string;
    label: string;
    description?: string;
    group?: string;
    disabled?: boolean;
}
interface ComboboxProps {
    options: ComboboxOption[] | ((query: string) => ComboboxOption[] | Promise<ComboboxOption[]>);
    value: ComboboxOption[];
    onChange: (value: ComboboxOption[]) => void;
    multiple?: boolean;
    label: string;
    placeholder?: string;
    emptyText?: string;
    loadingText?: string;
    disabled?: boolean;
    /** Offer a "Create “query”" row; receives the typed text. */
    onCreate?: (query: string) => void;
    createLabel?: (query: string) => string;
    clearable?: boolean;
    clearLabel?: string;
    renderOption?: (option: ComboboxOption, state: {
        selected: boolean;
    }) => React.ReactNode;
    /** Controlled open state; omit for uncontrolled. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}
declare function Combobox({ options, value, onChange, multiple, label, placeholder, emptyText: emptyTextProp, loadingText: loadingTextProp, disabled, onCreate, createLabel, clearable, clearLabel, renderOption, open: openProp, onOpenChange, className, }: ComboboxProps): React.JSX.Element;

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
declare function SplitPane({ start, end, defaultSize, min, max, label: labelProp, className, }: {
    start: React.ReactNode;
    end: React.ReactNode;
    defaultSize?: number;
    min?: number;
    max?: number;
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
declare function Chip({ onRemove, removeLabel, tone, children, }: {
    onRemove?: () => void;
    removeLabel?: string;
    tone?: keyof typeof chipTone;
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
declare function TimeRangePicker({ value, onChange, presets, refresh, onRefreshChange, label: labelProp, }: {
    value: string;
    onChange: (value: string) => void;
    presets?: string[];
    refresh?: string;
    onRefreshChange?: (value: string) => void;
    label?: string;
}): React.JSX.Element;
interface LogLine {
    time: string;
    level: "info" | "warn" | "error";
    text: string;
}
declare function LogViewer({ lines, label, follow, className }: {
    lines: LogLine[];
    label: string;
    follow?: boolean;
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

declare function Kbd({ className, ...props }: React.ComponentProps<"kbd">): React.JSX.Element;
declare function InlineEdit({ value, onSave, label, validate, }: {
    value: string;
    onSave: (value: string) => void | Promise<void>;
    label: string;
    validate?: (value: string) => string | undefined;
}): React.JSX.Element;
interface UploadFile {
    id: string;
    name: string;
    size: number;
    progress?: number;
    error?: string;
}
declare function FileDropzone({ files, onFiles, onRemove, accept, maxSize, multiple, label: labelProp, }: {
    files: UploadFile[];
    onFiles: (files: File[]) => void;
    onRemove?: (id: string) => void;
    accept?: string;
    /** bytes */
    maxSize?: number;
    multiple?: boolean;
    label?: string;
}): React.JSX.Element;
interface AlarmItem {
    id: string;
    severity: "critical" | "warning" | "info";
    name: string;
    entity: string;
    triggered: string;
    acknowledged?: boolean;
}
declare function AlarmList({ alarms, onAcknowledge, empty: emptyProp, }: {
    alarms: AlarmItem[];
    onAcknowledge?: (id: string) => void;
    empty?: string;
}): React.JSX.Element;
declare function Gauge({ value, max, label, warnAt, dangerAt }: {
    value: number;
    max?: number;
    label: string;
    warnAt?: number;
    dangerAt?: number;
}): React.JSX.Element;
declare function Donut({ slices, label }: {
    slices: {
        name: string;
        value: number;
    }[];
    label: string;
}): React.JSX.Element;
declare function BarChart({ data, label }: {
    data: {
        name: string;
        value: number;
    }[];
    label: string;
}): React.JSX.Element;
declare function DateTimeInput({ mode, className, ...props }: Omit<React.ComponentProps<"input">, "type"> & {
    mode?: "date" | "datetime-local" | "time";
}): React.JSX.Element;
declare function FormField({ id: idProp, label, description, error, children, }: {
    /** Fixed control id, e.g. so an ErrorSummary can link to it. */
    id?: string;
    label: string;
    description?: string;
    error?: string;
    children: (aria: {
        id: string;
        "aria-invalid"?: boolean;
        "aria-describedby"?: string;
    }) => React.ReactNode;
}): React.JSX.Element;
declare function ErrorSummary({ errors, title: titleProp }: {
    errors: {
        id: string;
        message: string;
    }[];
    title?: string;
}): React.JSX.Element | null;

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
declare function CommandPalette({ commands, open, onOpenChange, placeholder: placeholderProp, emptyText: emptyTextProp, }: {
    commands: Command[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    placeholder?: string;
    emptyText?: string;
}): React.JSX.Element;
interface TreeTableRow<T> {
    id: string;
    data: T;
    children?: TreeTableRow<T>[];
}
declare function TreeTable$1<T>({ rows, columns, label, }: {
    rows: TreeTableRow<T>[];
    columns: {
        id: string;
        header: React.ReactNode;
        cell: (row: T) => React.ReactNode;
    }[];
    label: string;
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
}
declare function MfaEnrolment({ qr, secret, recoveryCodes, onVerify, onRegisterPasskey, onComplete, labels }: MfaEnrolmentProps): React.JSX.Element;

declare function DatePicker({ value, onChange, label: labelProp, placeholder: placeholderProp, min, max, }: {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    min?: string;
    max?: string;
}): React.JSX.Element;
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
declare function CodeEditor({ value, onChange, language, label, rows, }: {
    value: string;
    onChange: (value: string) => void;
    language?: keyof typeof rules;
    label: string;
    rows?: number;
}): React.JSX.Element;

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
declare function SplitButton({ children, onClick, variant, size, disabled, menuLabel, menu, className, }: {
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

type MenuItemSpec$1 = {
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
    items: MenuItemSpec$1[];
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
    items: MenuItemSpec$1[];
    /** Element that opens the menu (rendered via asChild). */
    trigger: React.ReactNode;
    align?: "start" | "center" | "end";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}): React.JSX.Element;
declare function ContextMenuFor({ items, children, disabled }: {
    items: MenuItemSpec$1[];
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
declare function UnsavedChangesDialog({ guard, title, description, confirmLabel, cancelLabel, }: {
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
declare function FormFooter({ onCancel, onSave, saveLabel, cancelLabel, pending, dirty, guard, saveType, sticky, children, className, }: {
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
declare function SubNav({ groups, value, onSelect, label, className, }: {
    groups: SubNavGroup[];
    value?: string;
    onSelect?: (id: string) => void;
    label?: string;
    className?: string;
}): React.JSX.Element;
/** Hamburger that opens the sidebar in a Drawer; hidden from 860px up. */
declare function MobileNav({ children, title, triggerLabel, open, onOpenChange, className, }: {
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
declare function Wizard({ steps, onFinish, onCancel, dirty, title, mode, open, onOpenChange, current: currentProp, defaultCurrent, onCurrentChange, labels: labelsProp, className, }: WizardProps): React.JSX.Element;
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
declare function ErrorPage({ variant, title, description, action, requestId, requestIdLabel, className, }: {
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

/**
 * Local, structurally compatible copy of the design.md U4 `MenuItemSpec`.
 * Internal to tree/action-bar until lib/components/menu.tsx lands; not re-exported from lib/index.ts.
 */
type MenuItemSpec = {
    type?: "item";
    id: string;
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    danger?: boolean;
    disabled?: boolean | string;
    onSelect(): void;
} | {
    type: "checkbox";
    id: string;
    label: string;
    checked: boolean;
    onCheckedChange(v: boolean): void;
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
} | {
    type: "separator";
} | {
    type: "label";
    label: string;
};

type TreeStatus = "success" | "warning" | "danger" | "info" | "neutral";
interface TreeNode {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    children?: TreeNode[];
    /** Children exist but are not loaded yet; expanding calls `loadChildren`. */
    hasChildren?: boolean;
    disabled?: boolean;
    /** Renders a status dot. */
    status?: TreeStatus;
    /** Plain-text label used for type-ahead when `label` is not a string. */
    textValue?: string;
}
interface TreeViewProps {
    nodes: TreeNode[];
    label: string;
    /** Controlled expanded ids; omit for uncontrolled. */
    expanded?: string[];
    defaultExpanded?: string[];
    onExpandedChange?: (ids: string[]) => void;
    /** Controlled selection (a string in single mode, string[] also accepted); omit for uncontrolled. */
    selected?: string | string[];
    defaultSelected?: string | string[];
    /** Called with the id that was just selected (single mode: the selected id). */
    onSelect?: (id: string) => void;
    selection?: "single" | "multiple";
    onSelectedChange?: (ids: string[]) => void;
    /** Enter / double-click on an enabled node. */
    onActivate?: (id: string) => void;
    /** Lazily load children of a node with `hasChildren`; the parent should then update `nodes`. */
    loadChildren?: (id: string) => Promise<void>;
    /** Right-click, Shift+F10 and the Menu key. */
    contextMenu?: (id: string) => MenuItemSpec[];
    /** Force (true) or disable (false) virtualization; automatic above 500 visible rows. */
    virtual?: boolean;
    /** Viewport height in px when virtualized. */
    height?: number;
    rowHeight?: number;
    labels?: {
        loading?: string;
        error?: string;
        retry?: string;
        contextMenu?: string;
    };
    className?: string;
}
declare function TreeView({ nodes, label, expanded: expandedProp, defaultExpanded, onExpandedChange, selected: selectedProp, defaultSelected, onSelect: onSelectProp, selection, onSelectedChange, onActivate, loadChildren, contextMenu, virtual, height, rowHeight, labels, className, }: TreeViewProps): React.JSX.Element;

interface ActionBarProps {
    items: MenuItemSpec[];
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
    /** Array. A single object is accepted for backwards compatibility (deprecated, warns once in dev). */
    sort?: GridSort[] | GridSort;
    onSortChange?: (sort: GridSort[]) => void;
    /** Array. A string is accepted for backwards compatibility (deprecated, warns once in dev). */
    selected?: string[] | string;
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

export { Accordion, type AccordionItem, AccountItem, AccountList, ActionBar, type ActionBarProps, AdminShell, type AlarmItem, AlarmList, Alert, type AuditEvent, AuditLog, AuthFooter, Avatar, AvatarGroup, Badge, Banner, BarChart, BrandHeader, Breadcrumb, Button, ButtonGroup, type ButtonProps, Card, type ChartSeries, Checkbox, Chip, ClientInfo, CodeDisplay, CodeEditor, CodeInput, Combobox, type ComboboxOption, type ComboboxProps, type Command, CommandPalette, ConfirmDialog, ContextMenu, ContextMenuContent, ContextMenuFor, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger, CopyButton, DataGrid, DataGridLegacy, type DataGridLegacyProps, type DataGridProps, DatePicker, DateTimeInput, DefinitionList, DetailPage, type Device, type DeviceKind, DeviceSelector, DeviceSteps, type DeviceStepsProps, Dialog, DialogClose, DialogContent, DialogTrigger, type DiffOp, DiffView, DockedTaskPanel, Donut, Drawer, DrawerClose, DrawerContent, DrawerTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, EmptyState, ErrorPage, ErrorSummary, type ErrorVariant, Field, type FieldProps, FileDropzone, type Filter, FilterBar, type FilterBarLabels, type FilterBarProps, type FilterField, type FilterOp, type FilterOption, type FilterToken, FormField, FormFooter, FormPage, FormSection, Formatters, Gauge, type GridColumn, type GridColumnLegacy, GridColumnsMenu, type GridDensity, GridDensityToggle, type GridFilter, type GridFilterRenderer, type GridLabels, type GridMenuItem, GridSearch, type GridSort, type GridSortLegacy, Heatmap, IconButton, type IconButtonProps, InfiniteList, type InfiniteListProps, InfoBox, InlineEdit, Input, type InputProps, Kbd, type KeyValue, KeyValueEditor, LafErrorBoundary, LanguageSwitcher, LineChart, type LogLine, LogViewer, Menu, type MenuItemSpec$1 as MenuItemSpec, MenuShortcut, MfaEnrolment, type MfaEnrolmentProps, type MfaMethod, MobileNav, NavGroup, NavLink, NumberInput, ObjectIcon, type ObjectIconProps, type ObjectKind, type ObjectState, OtpInput, OverflowTabs, PageHead, Pagination, type PaginationProps, Panel, type ParsedFilter, PasswordField, type PasswordFieldProps, type PermissionGroup, PermissionMatrix, type PermissionMatrixLabels, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, Radio, RadioGroup, type RadioGroupProps, type RadioProps, RelativeTime, type SavedView, SavedViews, type SavedViewsLabels, type SavedViewsProps, type SavedViewsStorage, ScopeList, SearchInput, SecretDisplay, SegmentedControl, type SegmentedControlProps, type SegmentedItem, Select, type SelectGroup, SelectMenu, type SelectOption, type SelectProps, type Severity, Skeleton, Slider, type SliderProps, SocialButton, SocialButtons, SocialDivider, Sparkline, Spinner, SplitButton, SplitPane, StackedBarChart, Stat, StatGrid, StatusDot, type Step, Stepper, SubNav, type SubNavGroup, type SubNavItem, Switch, Table, Tabs, TabsContent, TabsList, TabsTrigger, TagInput, type TaskItem, TaskPanel, type TaskStatus, TenantSwitcher, type TextTerm, Textarea, TimeRangePicker, type ToastOptions, ToastProvider, type ToastTone, Toolbar, Tooltip, TooltipProvider, TopBar, type TopBarCounter, type TopologyEdge, TopologyGraph, type TopologyNode, type TreeNode, type TreeStatus, TreeTable$1 as TreeTable, type TreeTableNode, type TreeTableProps, type TreeTableRow, TreeTable as TreeTableV2, TreeView, type TreeViewProps, type UnitOption, UnsavedChangesDialog, type UnsavedChangesGuard, type UploadFile, type UseSavedViewsOptions, type User, UserCell, UserMenu, UserSelector, type UserSelectorProps, VirtualList, Wizard, type WizardLabels, type WizardProps, WizardReview, type WizardStep, buttonVariants, cn, diffLines, format, formatRelative, highlight, matchesAccept, observeRectWithFallback, parseFilter, registerObjectKind, serializeFilter, serializeToken, useControllableState, useSavedViews, useToast, useUnsavedChangesGuard };
