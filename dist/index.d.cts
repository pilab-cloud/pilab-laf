import { ClassValue } from 'clsx';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as lucide_react from 'lucide-react';
import * as ContextPrimitive from '@radix-ui/react-context-menu';
export { L as LafMessages, a as LafProvider, e as en, u as useLaf } from './i18n-_Wsnj9t7.cjs';

declare function cn(...inputs: ClassValue[]): string;

/** Works controlled (value !== undefined) or uncontrolled (defaultValue). */
declare function useControllableState<T>({ value, defaultValue, onChange, }: {
    value?: T;
    defaultValue: T;
    onChange?: (next: T) => void;
}): [T, (next: T | ((prev: T) => T)) => void];
declare const format: {
    bytes(n: number, locale?: string): string;
};
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
declare function Breadcrumb({ items, maxItems }: {
    items: {
        label: string;
        href?: string;
    }[];
    maxItems?: number;
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
declare function CodeDisplay({ code, copyLabel, copiedLabel, className, }: {
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
declare function LanguageSwitcher({ languages, current, className, }: {
    languages: {
        code: string;
        label: string;
        href: string;
    }[];
    current: string;
    className?: string;
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
}
declare function PasswordField({ showLabel: showLabelProp, hideLabel: hideLabelProp, capsLockHint: capsLockHintProp, className, onKeyUp, onBlur, ...props }: PasswordFieldProps): React.JSX.Element;
declare function DefinitionList({ items, className, }: {
    items: {
        label: React.ReactNode;
        value?: React.ReactNode;
        mono?: boolean;
        copy?: string;
    }[];
    className?: string;
}): React.JSX.Element;
declare function ConfirmDialog({ open, onOpenChange, title, description, items, confirmLabel, cancelLabel, confirmText, confirmTextLabel, pending, onConfirm, }: {
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

interface ComboboxOption {
    value: string;
    label: string;
    description?: string;
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
}
declare function Combobox({ options, value, onChange, multiple, label, placeholder, emptyText: emptyTextProp, loadingText: loadingTextProp, disabled, }: ComboboxProps): React.JSX.Element;
interface TreeNode {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    children?: TreeNode[];
}
interface TreeViewProps {
    nodes: TreeNode[];
    label: string;
    /** Controlled expanded ids; omit for uncontrolled. */
    expanded?: string[];
    defaultExpanded?: string[];
    onExpandedChange?: (ids: string[]) => void;
    /** Controlled selection; omit for uncontrolled. */
    selected?: string;
    defaultSelected?: string;
    onSelect?: (id: string) => void;
    className?: string;
}
declare function TreeView({ nodes, label, expanded: expandedProp, defaultExpanded, onExpandedChange, selected: selectedProp, defaultSelected, onSelect: onSelectProp, className }: TreeViewProps): React.JSX.Element;
interface GridColumn<T> {
    id: string;
    header: React.ReactNode;
    cell: (row: T) => React.ReactNode;
    sortable?: boolean;
    numeric?: boolean;
}
interface GridSort {
    id: string;
    dir: "asc" | "desc";
}
interface DataGridProps<T> {
    columns: GridColumn<T>[];
    rows: T[];
    rowId: (row: T) => string;
    sort?: GridSort;
    onSortChange?: (sort: GridSort | undefined) => void;
    selected?: string[];
    onSelectedChange?: (ids: string[]) => void;
    loading?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
}
declare function DataGrid<T>({ columns, rows, rowId, sort, onSortChange, selected, onSelectedChange, loading, emptyTitle, emptyDescription, }: DataGridProps<T>): React.JSX.Element;
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
declare function TaskPanel({ tasks, onCancel, onRetry, labels, }: {
    tasks: TaskItem[];
    onCancel?: (id: string) => void;
    onRetry?: (id: string) => void;
    labels?: {
        cancel: string;
        retry: string;
        empty: string;
    };
}): React.JSX.Element;
declare function UserMenu({ name, email, tenant, items, signOutLabel, onSignOut, }: {
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
declare function SplitPane({ start, end, defaultSize, min, max, label, className, }: {
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
declare function Slider({ className, ...props }: Omit<React.ComponentProps<"input">, "type">): React.JSX.Element;
declare function Chip({ onRemove, removeLabel, children }: {
    onRemove?: () => void;
    removeLabel?: string;
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
declare function KeyValueEditor({ value, onChange, addLabel, keyLabel, valueLabel, duplicateMessage, }: {
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
declare function TimeRangePicker({ value, onChange, presets, refresh, onRefreshChange, label, }: {
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
declare function TenantSwitcher({ tenants, current, onSwitch, label, }: {
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
declare function PermissionMatrix({ roles, groups, value, onChange, readOnly, }: {
    roles: {
        id: string;
        label: string;
    }[];
    groups: PermissionGroup[];
    /** role id -> granted permission ids */
    value: Record<string, string[]>;
    onChange: (value: Record<string, string[]>) => void;
    readOnly?: boolean;
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
declare function FileDropzone({ files, onFiles, onRemove, accept, maxSize, multiple, label, }: {
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
declare function AlarmList({ alarms, onAcknowledge, empty, }: {
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
declare function ErrorSummary({ errors, title }: {
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
declare function TreeTable<T>({ rows, columns, label, }: {
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

/** Fixed-row-height windowing for long lists. Rows render with absolute offsets. */
declare function VirtualList<T>({ items, rowHeight, height, overscan, renderRow, label, className, }: {
    items: T[];
    rowHeight: number;
    height: number;
    overscan?: number;
    renderRow: (item: T, index: number) => React.ReactNode;
    label: string;
    className?: string;
}): React.JSX.Element;

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
    labels?: Partial<typeof defaultLabels>;
}
declare const defaultLabels: {
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
};
declare function MfaEnrolment({ qr, secret, recoveryCodes, onVerify, onRegisterPasskey, onComplete, labels }: MfaEnrolmentProps): React.JSX.Element;
interface OidcClient {
    id: string;
    name: string;
    clientId: string;
    redirectUris: string[];
    scopes: string[];
    pkce: boolean;
    claimMappings: KeyValue[];
}
/** @deprecated Use the OIDC screens in `shadow-sso-accounts`. Removed in 0.2. */
declare function OidcClientList({ clients, selected, onSelect, }: {
    clients: OidcClient[];
    selected?: string;
    onSelect: (id: string) => void;
}): React.JSX.Element;
/** @deprecated Use the OIDC screens in `shadow-sso-accounts`. Removed in 0.2. */
declare function OidcClientForm({ client, onChange, onRotateSecret, }: {
    client: OidcClient;
    onChange: (client: OidcClient) => void;
    onRotateSecret?: () => void;
}): React.JSX.Element;

declare function DatePicker({ value, onChange, label, placeholder, min, max, }: {
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

declare function OverflowTabs({ tabs, maxVisible, moreLabel, onSelect, }: {
    tabs: {
        value: string;
        label: string;
    }[];
    maxVisible?: number;
    moreLabel?: string;
    /** Needed so menu items can switch a controlled <Tabs>. */
    onSelect: (value: string) => void;
}): React.JSX.Element;
declare function DockedTaskPanel({ tasks, onCancel, onRetry, title, defaultOpen, }: {
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

export { Accordion, type AccordionItem, AccountItem, AccountList, AdminShell, type AlarmItem, AlarmList, Alert, type AuditEvent, AuditLog, AuthFooter, Avatar, Badge, Banner, BarChart, BrandHeader, Breadcrumb, Button, type ButtonProps, Card, type ChartSeries, Checkbox, Chip, ClientInfo, CodeDisplay, CodeEditor, CodeInput, Combobox, type ComboboxOption, type ComboboxProps, type Command, CommandPalette, ConfirmDialog, ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger, CopyButton, DataGrid, type DataGridProps, DatePicker, DateTimeInput, DefinitionList, type Device, type DeviceKind, DeviceSelector, DeviceSteps, type DeviceStepsProps, Dialog, DialogClose, DialogContent, DialogTrigger, type DiffOp, DiffView, DockedTaskPanel, Donut, Drawer, DrawerClose, DrawerContent, DrawerTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, EmptyState, ErrorSummary, Field, type FieldProps, FileDropzone, FormField, Gauge, type GridColumn, type GridSort, Heatmap, InfoBox, InlineEdit, Input, type InputProps, Kbd, type KeyValue, KeyValueEditor, LanguageSwitcher, LineChart, type LogLine, LogViewer, MfaEnrolment, type MfaEnrolmentProps, type MfaMethod, NavGroup, NavLink, NumberInput, type OidcClient, OidcClientForm, OidcClientList, OtpInput, OverflowTabs, PageHead, Pagination, type PaginationProps, Panel, PasswordField, type PasswordFieldProps, type PermissionGroup, PermissionMatrix, Popover, PopoverClose, PopoverContent, PopoverTrigger, Progress, Radio, RadioGroup, type RadioGroupProps, type RadioProps, ScopeList, SearchInput, SecretDisplay, Select, type Severity, Skeleton, Slider, SocialButton, SocialButtons, SocialDivider, Sparkline, Spinner, SplitPane, StackedBarChart, Stat, StatGrid, type Step, Stepper, Switch, Table, Tabs, TabsContent, TabsList, TabsTrigger, TagInput, type TaskItem, TaskPanel, type TaskStatus, TenantSwitcher, Textarea, TimeRangePicker, type ToastOptions, ToastProvider, type ToastTone, Toolbar, Tooltip, TooltipProvider, type TopologyEdge, TopologyGraph, type TopologyNode, type TreeNode, TreeTable, type TreeTableRow, TreeView, type TreeViewProps, type UnitOption, type UploadFile, type User, UserCell, UserMenu, UserSelector, type UserSelectorProps, VirtualList, buttonVariants, cn, diffLines, format, highlight, matchesAccept, useControllableState, useToast };
