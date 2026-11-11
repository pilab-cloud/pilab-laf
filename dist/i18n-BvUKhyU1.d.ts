import * as React from 'react';
import { c as PerfPanelLabels, h as TimeSeriesChartLabels, F as Formatters } from './perf-panel-uUu6HJmZ.js';

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

type Time = Date | string | number;
interface AccountSession {
    id: string;
    device: DeviceKind;
    browser: string;
    os?: string;
    ip?: string;
    location?: string;
    lastActive: Time;
    current?: boolean;
    /** Shown in the admin variant (`showUser`). */
    user?: string;
}
interface SessionListLabels {
    thisDevice: string;
    revoke: string;
    revokeOthers: string;
    revokeOthersTitle: string;
    revokeOthersBody: string;
    lastActive: string;
    user: string;
    empty: string;
    cancel: string;
}
interface SessionListProps {
    sessions: AccountSession[];
    onRevoke: (id: string) => void | Promise<void>;
    onRevokeOthers?: () => void | Promise<void>;
    /** Admin variant: adds a user column. */
    showUser?: boolean;
    labels?: Partial<SessionListLabels>;
}
declare function SessionList({ sessions, onRevoke, onRevokeOthers, showUser, labels }: SessionListProps): React.JSX.Element;
interface ApiKeyItem {
    id: string;
    name: string;
    /** Visible prefix, e.g. `pk_…abcd`. */
    prefix: string;
    scopes: string[];
    createdAt: Time;
    expiresAt?: Time | null;
    lastUsedAt?: Time | null;
    revoked?: boolean;
}
interface ApiKeyCreateInput {
    name: string;
    /** Days until expiry; `null` = never. */
    expiresInDays: number | null;
    scopes: string[];
}
interface ApiKeyManagerLabels {
    create: string;
    createTitle: string;
    name: string;
    expiry: string;
    scopes: string;
    never: string;
    days: (n: number) => string;
    created: string;
    expires: string;
    lastUsed: string;
    neverUsed: string;
    revoke: string;
    revoked: string;
    rotate: string;
    secretLabel: string;
    secretNotice: string;
    acknowledge: string;
    done: string;
    cancel: string;
    empty: string;
    revokeTitle: string;
    revokeBody: string;
    error: string;
}
interface ApiKeyManagerProps {
    keys: ApiKeyItem[];
    /** Available scopes. */
    scopes: {
        value: string;
        label?: string;
    }[];
    expiryPresets?: (number | null)[];
    /** Resolve with the clear-text secret; it is shown once. */
    onCreate: (input: ApiKeyCreateInput) => Promise<{
        secret: string;
    }>;
    onRevoke: (id: string) => void | Promise<void>;
    /** Regenerate a key; resolves with the new secret (shown once). */
    onRotate?: (id: string) => Promise<{
        secret: string;
    }>;
    labels?: Partial<ApiKeyManagerLabels>;
}
declare function ApiKeyManager({ keys, scopes, expiryPresets, onCreate, onRevoke, onRotate, labels }: ApiKeyManagerProps): React.JSX.Element;
interface PasskeyItem {
    id: string;
    name: string;
    createdAt: Time;
    lastUsedAt?: Time | null;
}
interface SecurityFactorsLabels {
    password: string;
    passwordChanged: string;
    passwordNever: string;
    changePassword: string;
    totp: string;
    totpOn: string;
    totpOff: string;
    enable: string;
    disable: string;
    passkeys: string;
    addPasskey: string;
    renamePasskey: string;
    removePasskey: string;
    created: string;
    lastUsed: string;
    neverUsed: string;
    noPasskeys: string;
    recovery: string;
    recoveryRemaining: (n: number) => string;
    regenerate: string;
    recoveryTitle: string;
    recoveryNotice: string;
    acknowledge: string;
    done: string;
    cancel: string;
    removeTitle: string;
    removeBody: string;
    removeLastWarning: string;
    remove: string;
}
interface SecurityFactorsProps {
    password?: {
        changedAt?: Time | null;
        onChange: () => void;
    };
    totp?: {
        enabled: boolean;
        onEnable: () => void;
        onDisable: () => void | Promise<void>;
    };
    passkeys?: {
        items: PasskeyItem[];
        onAdd: () => void;
        onRename: (id: string, name: string) => void | Promise<void>;
        onRemove: (id: string) => void | Promise<void>;
    };
    recovery?: {
        remaining: number;
        onRegenerate: () => Promise<string[]>;
    };
    labels?: Partial<SecurityFactorsLabels>;
}
declare function SecurityFactors({ password, totp, passkeys, recovery, labels }: SecurityFactorsProps): React.JSX.Element;
type ReauthMethod = "password" | "passkey";
interface ReauthDialogLabels {
    title: string;
    description: string;
    password: string;
    confirm: string;
    usePasskey: string;
    usePassword: string;
    cancel: string;
    failed: string;
}
interface ReauthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Reject (or resolve false) to show the error state. */
    onReauth: (credential: {
        method: "password";
        password: string;
    } | {
        method: "passkey";
    }) => Promise<boolean | void>;
    /** Show the passkey option. */
    passkey?: boolean;
    labels?: Partial<ReauthDialogLabels>;
}
declare function ReauthDialog({ open, onOpenChange, onReauth, passkey, labels }: ReauthDialogProps): React.JSX.Element;
interface SessionExpiryDialogLabels {
    title: string;
    remaining: (time: string) => string;
    stay: string;
    signOut: string;
    announce: (time: string) => string;
}
interface SessionExpiryDialogProps {
    /** Dialog is shown while the remaining time is within `warnBeforeMs` (default 5 min). */
    expiresAt: Time;
    warnBeforeMs?: number;
    onStay: () => void | Promise<void>;
    onSignOut: () => void;
    /** Called once when the countdown reaches zero. */
    onExpire?: () => void;
    labels?: Partial<SessionExpiryDialogLabels>;
}
declare function SessionExpiryDialog({ expiresAt, warnBeforeMs, onStay, onSignOut, onExpire, labels }: SessionExpiryDialogProps): React.JSX.Element;

declare const accountEn: {
    sessions: SessionListLabels;
    apiKeys: ApiKeyManagerLabels;
    factors: SecurityFactorsLabels;
    reauth: ReauthDialogLabels;
    expiry: SessionExpiryDialogLabels;
};

declare function isIPv4(s: string): boolean;
declare function isIPv6(s: string): boolean;
declare function isIp(s: string): boolean;
/** Returns the parsed parts of `address/prefix`, or `null` when invalid. */
declare function parseCidr(s: string): {
    address: string;
    prefix: number;
    version: 4 | 6;
} | null;
declare function isCidr(s: string): boolean;
interface NetworkLabels {
    invalidIp: string;
    invalidCidr: string;
    invalidEntry: string;
    duplicate: string;
    add: string;
    remove: (entry: string) => string;
    empty: string;
}
type NetInputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange"> & {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    label?: string;
    hint?: string;
    /** Message shown when the (non-empty) value is invalid. */
    errorMessage?: string;
};
declare function IpInput(props: NetInputProps): React.JSX.Element;
declare function CidrInput(props: NetInputProps): React.JSX.Element;
interface AllowListEditorProps {
    value?: string[];
    defaultValue?: string[];
    onChange?: (value: string[]) => void;
    label?: string;
    labels?: Partial<NetworkLabels>;
    disabled?: boolean;
}
declare function AllowListEditor({ value, defaultValue, onChange, label: labelProp, labels: l, disabled }: AllowListEditorProps): React.JSX.Element;
interface TransferItem {
    id: string;
    label: string;
    disabled?: boolean;
}
interface TransferListLabels {
    available: string;
    selected: string;
    search: (list: string) => string;
    count: (checked: number, total: number) => string;
    moveRight: string;
    moveLeft: string;
    moveAllRight: string;
    moveAllLeft: string;
    empty: string;
}
interface TransferListProps {
    items: TransferItem[];
    /** Ids on the right-hand list. */
    value?: string[];
    defaultValue?: string[];
    onChange?: (value: string[]) => void;
    labels?: Partial<TransferListLabels>;
    /** Viewport height of each list in px. */
    height?: number;
}
declare function TransferList({ items, value, defaultValue, onChange, labels, height }: TransferListProps): React.JSX.Element;
/** Normalises `#abc`/`abc`/long form to six-digit hex, or `null` when not a hex colour. */
declare function normalizeHex(input: string): string | null;
/** WCAG 2.x contrast ratio (1–21) between two hex colours. */
declare function contrastRatio(a: string, b: string): number;
interface ColorFieldLabels {
    label: string;
    colorPicker: string;
    invalidHex: string;
    onCard: string;
    onPrimary: string;
    pass: string;
    fail: string;
    rejected: string;
    contrast: string;
    preview: string;
    sampleButton: string;
    sampleBadge: string;
}
interface ColorFieldProps {
    value?: string;
    defaultValue?: string;
    /** Called only with a valid hex that passes both contrast checks. */
    onChange?: (hex: string) => void;
    /** Resolved `--bg-card` colour (opaque hex). */
    cardColor?: string;
    /** Resolved `--on-primary` colour (opaque hex). */
    onPrimaryColor?: string;
    /** Minimum ratio against the card (non-text UI: 3). */
    minCardRatio?: number;
    /** Minimum ratio for text on the colour (AA: 4.5). */
    minTextRatio?: number;
    labels?: Partial<ColorFieldLabels>;
}
declare function ColorField({ value, defaultValue, onChange, cardColor, onPrimaryColor, minCardRatio, minTextRatio, labels }: ColorFieldProps): React.JSX.Element;
interface Branding {
    productName: string;
    primary: string;
    logoUrl?: string;
}
interface BrandingEditorLabels {
    productName: string;
    logo: string;
    dropLogo: string;
    preview: string;
    signIn: string;
    username: string;
    password: string;
    removeLogo: string;
}
interface BrandingEditorProps {
    value?: Branding;
    defaultValue?: Branding;
    onChange?: (value: Branding) => void;
    /** Max logo size in bytes. */
    maxLogoSize?: number;
    cardColor?: string;
    onPrimaryColor?: string;
    labels?: Partial<BrandingEditorLabels> & {
        color?: Partial<ColorFieldLabels>;
    };
}
declare function BrandingEditor({ value, defaultValue, onChange, maxLogoSize, cardColor, onPrimaryColor, labels }: BrandingEditorProps): React.JSX.Element;
interface NotificationItem {
    id: string;
    title: string;
    body?: string;
    time: Date | string | number;
    unread?: boolean;
    href?: string;
    group?: string;
}
interface NotificationCenterLabels {
    bell: string;
    title: string;
    unreadCount: (n: number) => string;
    markRead: (title: string) => string;
    markAllRead: string;
    viewAll: string;
    empty: string;
}
interface NotificationCenterProps {
    items: NotificationItem[];
    onMarkRead?: (id: string) => void;
    onMarkAllRead?: () => void;
    onViewAll?: () => void;
    onOpen?: (item: NotificationItem) => void;
    labels?: Partial<NotificationCenterLabels>;
}
declare function NotificationCenter({ items, onMarkRead, onMarkAllRead, onViewAll, onOpen, labels }: NotificationCenterProps): React.JSX.Element;

declare const adminEn: {
    network: NetworkLabels;
    allowList: string;
    transfer: TransferListLabels;
    color: ColorFieldLabels;
    branding: BrandingEditorLabels;
    notifications: NotificationCenterLabels;
};

declare const chartsEn: {
    perfPanel: PerfPanelLabels;
    timeSeries: TimeSeriesChartLabels;
};

declare const contentEn: {
    toolbar: {
        selected: (n: number) => string;
        clearSelection: string;
        activeFilters: string;
        removeFilter: (label: string) => string;
        clearAll: string;
        actions: string;
    };
    codeBlock: {
        label: string;
        copy: string;
        copied: string;
        wrap: string;
    };
    clipboard: {
        copy: string;
        copied: string;
        expand: string;
        collapse: string;
    };
    form: {
        required: string;
    };
};

declare const dashboardEn: {
    card: {
        loading: string;
    };
    metric: {
        loading: string;
        error: string;
        retry: string;
        increase: (v: string) => string;
        decrease: (v: string) => string;
        unchanged: string;
        good: string;
        bad: string;
        trend: (name: string) => string;
    };
    gauge: {
        valueText: (value: string, max: string) => string;
        ok: string;
        warn: string;
        danger: string;
    };
    status: {
        total: string;
        showStatus: (name: string, n: number) => string;
    };
    alert: {
        showDetails: string;
        hideDetails: string;
        more: (n: number) => string;
        less: string;
    };
    toast: {
        region: string;
        dismiss: string;
    };
    chart: {
        range: string;
        showLegend: string;
        hideLegend: string;
        export: string;
        refresh: string;
        empty: string;
        error: string;
        retry: string;
        loading: string;
        showData: string;
        hideData: string;
        category: string;
        value: string;
        share: string;
        total: string;
        legend: string;
        toggleSeries: (name: string) => string;
        keyboardHint: string;
        point: (name: string, value: string) => string;
    };
    utilization: {
        seeDetails: string;
        filter: string;
        capacity: string;
        warning: string;
        danger: string;
        segments: string;
        percentLine: (name: string, pct: string) => string;
        barSummary: (label: string, total: string, parts: string) => string;
        donutSummary: (label: string, value: string, of: string, warn: string, danger: string) => string;
        status: {
            ok: string;
            warn: string;
            danger: string;
        };
    };
};

declare const portalEn: {
    layout: {
        home: string;
        search: string;
        searchPlaceholder: string;
        appSwitcher: string;
        appSwitcherTitle: string;
        currentApp: string;
        allApps: string;
        noApps: string;
        navigation: string;
        pageSections: string;
        external: string;
        pages: string;
        apps: string;
        goTo: (title: string) => string;
        openApp: (name: string) => string;
    };
    home: {
        welcome: (name: string) => string;
        welcomeAnonymous: string;
        subtitle: string;
        favourites: string;
        recent: string;
        allApps: string;
        announcements: string;
        quickActions: string;
        noFavourites: string;
        noRecent: string;
        noAnnouncements: string;
        addFavourite: (name: string) => string;
        removeFavourite: (name: string) => string;
        lastOpened: (when: string) => string;
        dismiss: (title: string) => string;
    };
    serverGrid: {
        retry: string;
        loadFailed: string;
        rowsPerPage: string;
        loadingData: string;
        refreshing: string;
        results: (from: number, to: number, total: number) => string;
        resultsUnknown: (from: number, to: number) => string;
        noResults: string;
        search: string;
        page: (page: number) => string;
        clearFilters: string;
        refresh: string;
    };
};

declare const trackerEn: {
    labelPicker: {
        label: string;
        placeholder: string;
        newColour: string;
        colour: (n: number) => string;
        create: (q: string) => string;
    };
    reaction: {
        add: string;
        reactedBy: (emoji: string, users: string[]) => string;
        toggle: (emoji: string, n: number) => string;
    };
    timeline: {
        edited: string;
        actions: string;
        more: (n: number) => string;
        fewer: string;
        timeline: string;
    };
    optionPicker: {
        search: string;
        empty: string;
        none: string;
    };
    issue: {
        select: (key: string) => string;
        overdue: string;
        comments: (n: number) => string;
        due: string;
    };
    progress: {
        todo: string;
        doing: string;
        done: string;
        summary: (pct: number) => string;
    };
};

declare const uiEn: {
    combobox: {
        clear: string;
        create: (q: string) => string;
    };
    errors: {
        requestId: string;
        copyRequestId: (label: string) => string;
        tryAgain: string;
    };
    error403: {
        title: string;
        description: string;
    };
    error404: {
        title: string;
        description: string;
    };
    error500: {
        title: string;
        description: string;
    };
    errorOffline: {
        title: string;
        description: string;
    };
    errorSessionExpired: {
        title: string;
        description: string;
    };
    unsavedChanges: {
        title: string;
        description: string;
        confirm: string;
        cancel: string;
    };
    formFooter: {
        save: string;
        cancel: string;
    };
    subNav: {
        label: string;
    };
    mobileNav: {
        title: string;
        trigger: string;
    };
    splitButton: {
        more: string;
    };
    appFrame: {
        skipToContent: string;
        openNavigation: string;
        closeNavigation: string;
        collapseSidebar: string;
        expandSidebar: string;
        mainNavigation: string;
        sidebarView: string;
        navigationView: string;
        treeView: string;
        theme: string;
        themeLight: string;
        themeDark: string;
        themeSystem: string;
        themeCurrent: (mode: string) => string;
        panel: string;
        closePanel: string;
        collapsePanel: string;
        expandPanel: string;
        resizePanel: string;
        version: string;
        build: string;
        opensInNewTab: string;
        help: string;
    };
    wizard: {
        title: string;
        back: string;
        next: string;
        finish: string;
        skip: string;
        cancel: string;
        optional: string;
        steps: string;
    };
};

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
declare function Combobox({ options, value, onChange, multiple, label, placeholder, emptyText: emptyTextProp, loadingText: loadingTextProp, disabled, onCreate, createLabel: createLabelProp, clearable, clearLabel: clearLabelProp, renderOption, open: openProp, onOpenChange, className, }: ComboboxProps): React.JSX.Element;

declare function Kbd({ className, ...props }: React.ComponentProps<"kbd">): React.JSX.Element;
declare function InlineEdit({ value, onSave, label, validate, as, options, min, max, }: {
    value: string;
    onSave: (value: string) => void | Promise<void>;
    label: string;
    validate?: (value: string) => string | undefined;
    /** Editor kind; `select` needs `options`, `number` honours `min`/`max`. */
    as?: "text" | "select" | "number";
    options?: {
        value: string;
        label: string;
    }[];
    min?: number;
    max?: number;
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
    /** Pre-formatted text; ignored when `triggeredAt` is set. */
    triggered: string;
    triggeredAt?: Date | string | number;
    entityId?: string;
    acknowledged?: boolean;
}
declare function AlarmList({ alarms, onAcknowledge, onReset, onOpenEntity, selectable, empty: emptyProp, }: {
    alarms: AlarmItem[];
    onAcknowledge?: (id: string) => void;
    /** Reset to green. */
    onReset?: (id: string) => void;
    onOpenEntity?: (alarm: AlarmItem) => void;
    /** Checkboxes plus bulk acknowledge/reset (ids are passed one call per alarm). */
    selectable?: boolean;
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

type ConsoleStatus = "connecting" | "connected" | "disconnected" | "error";
interface ConsoleFrameLabels {
    console: string;
    sendCad: string;
    keys: string;
    fullscreen: string;
    exitFullscreen: string;
    fit: string;
    actual: string;
    screenshot: string;
    disconnect: string;
    reconnect: string;
    connecting: string;
    connected: string;
    disconnected: string;
    error: string;
    releaseHint: string;
}
interface ConsoleFrameProps {
    /** The canvas / video element supplied by the app (noVNC, WebMKS, …). */
    children?: React.ReactNode;
    status: ConsoleStatus;
    errorMessage?: string;
    /** Called with a key-combo id; "ctrl-alt-del" for the primary button. */
    onSendKeys?: (combo: string) => void;
    /** Extra combos for the "Send keys" menu. */
    keyCombos?: {
        id: string;
        label: string;
    }[];
    scale?: "fit" | "actual";
    onScaleChange?: (scale: "fit" | "actual") => void;
    onScreenshot?: () => void;
    onDisconnect?: () => void;
    onReconnect?: () => void;
    /** Show the keyboard-grab indicator with the release hint. */
    keyboardGrabbed?: boolean;
    labels?: Partial<ConsoleFrameLabels>;
    className?: string;
}
declare function ConsoleFrame({ children, status, errorMessage, onSendKeys, keyCombos, scale: scaleProp, onScaleChange, onScreenshot, onDisconnect, onReconnect, keyboardGrabbed, labels, className, }: ConsoleFrameProps): React.JSX.Element;
type HwDevice = {
    id: string;
    kind: "cpu";
    count: number;
    coresPerSocket: number;
    reservationMhz: number;
} | {
    id: string;
    kind: "memory";
    sizeMb: number;
    reservationMb: number;
} | {
    id: string;
    kind: "disk";
    name: string;
    sizeGb: number;
    provisioning: "thin" | "thick-lazy" | "thick-eager";
    controller: string;
} | {
    id: string;
    kind: "nic";
    name: string;
    network: string;
    adapter: string;
    connected: boolean;
} | {
    id: string;
    kind: "cdrom";
    name: string;
    iso?: string;
    connected: boolean;
};
type HwKind = HwDevice["kind"];
interface HardwareCapabilities {
    /** Whether the VM is running; hot-add rules only apply then. */
    poweredOn?: boolean;
    hotAdd?: Partial<Record<HwKind, boolean>>;
    networks: string[];
    controllers?: string[];
    adapters?: string[];
    maxCpu?: number;
    maxMemoryMb?: number;
}
interface HardwareEditorLabels {
    title: string;
    cpu: string;
    memory: string;
    disk: string;
    nic: string;
    cdrom: string;
    cpuCount: string;
    coresPerSocket: string;
    reservationMhz: string;
    memorySize: string;
    reservationMb: string;
    diskSize: string;
    provisioning: string;
    thin: string;
    thickLazy: string;
    thickEager: string;
    controller: string;
    network: string;
    adapter: string;
    connected: string;
    iso: string;
    noIso: string;
    chooseIso: string;
    addDevice: string;
    remove: (name: string) => string;
    hotAddDisabled: string;
    pendingChanges: string;
    noChanges: string;
    save: string;
    discard: string;
    errCpu: string;
    errCores: string;
    errMemory: string;
    errDisk: string;
    errShrink: string;
    errNetwork: string;
    added: string;
    removed: string;
    changed: (field: string, from: string, to: string) => string;
}
interface HardwareEditorProps {
    devices?: HwDevice[];
    defaultDevices?: HwDevice[];
    onChange?: (devices: HwDevice[]) => void;
    /** The saved configuration the pending diff is computed against; defaults to the initial devices. */
    baseline?: HwDevice[];
    capabilities: HardwareCapabilities;
    onSave?: (devices: HwDevice[]) => void;
    /** Render a picker (e.g. DatastoreBrowser in a dialog) for CD/DVD media. */
    renderIsoPicker?: (apply: (iso: string) => void, close: () => void) => React.ReactNode;
    labels?: Partial<HardwareEditorLabels>;
    className?: string;
}
declare function HardwareEditor({ devices: devicesProp, defaultDevices, onChange, baseline, capabilities: cap, onSave, renderIsoPicker, labels, className }: HardwareEditorProps): React.JSX.Element;
interface DatastoreEntry {
    /** Absolute path, e.g. "/iso/win.iso"; the root is "/". */
    path: string;
    type: "folder" | "file";
    size?: number;
    modified?: Date | string | number;
}
interface DatastoreBrowserLabels {
    tree: string;
    files: string;
    path: string;
    name: string;
    size: string;
    modified: string;
    type: string;
    folder: string;
    file: string;
    root: string;
    empty: string;
    upload: string;
    download: string;
    newFolder: string;
    folderName: string;
    create: string;
    delete: string;
    deleteTitle: string;
    deleteDescription: (name: string) => string;
    select: string;
    cancel: string;
}
interface DatastoreBrowserProps {
    entries: DatastoreEntry[];
    path?: string;
    defaultPath?: string;
    onPathChange?: (path: string) => void;
    /** Lazy folders: called when an unloaded folder is expanded/opened; the parent then adds entries. */
    onLoadFolder?: (path: string) => Promise<void>;
    uploads?: UploadFile[];
    onUpload?: (files: File[], folder: string) => void;
    onDownload?: (entry: DatastoreEntry) => void;
    onCreateFolder?: (name: string, parent: string) => void;
    onDelete?: (entry: DatastoreEntry) => void;
    /** Picker mode: choose a file or a folder. */
    select?: "file" | "folder";
    /** Extensions accepted in picker mode, e.g. [".iso"]. */
    accept?: string[];
    onSelect?: (entry: DatastoreEntry) => void;
    onCancel?: () => void;
    labels?: Partial<DatastoreBrowserLabels>;
    className?: string;
}
declare function DatastoreBrowser({ entries, path: pathProp, defaultPath, onPathChange, onLoadFolder, uploads, onUpload, onDownload, onCreateFolder, onDelete, select, accept, onSelect, onCancel, labels, className, }: DatastoreBrowserProps): React.JSX.Element;
interface PermissionRole {
    id: string;
    name: string;
    description?: string;
}
interface PermissionAssignment {
    principal: ComboboxOption;
    roleId: string;
    propagate: boolean;
}
interface PermissionAssignLabels {
    title: string;
    principal: string;
    role: string;
    propagate: string;
    object: string;
    assign: string;
    cancel: string;
}
interface PermissionAssignDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Users and groups; set `group` to "Users" / "Groups" to separate them. */
    principals: ComboboxOption[] | ((query: string) => ComboboxOption[] | Promise<ComboboxOption[]>);
    roles: PermissionRole[];
    objectPath: string;
    defaultRoleId?: string;
    defaultPropagate?: boolean;
    onAssign: (assignment: PermissionAssignment) => void | Promise<void>;
    labels?: Partial<PermissionAssignLabels>;
}
declare function PermissionAssignDialog({ open, onOpenChange, principals, roles, objectPath, defaultRoleId, defaultPropagate, onAssign, labels }: PermissionAssignDialogProps): React.JSX.Element;
interface SnapshotNode {
    id: string;
    name: string;
    createdAt: Date | string | number;
    sizeBytes?: number;
    description?: string;
    children?: SnapshotNode[];
}
interface SnapshotTreeLabels {
    tree: string;
    take: string;
    revert: string;
    delete: string;
    deleteChildren: string;
    youAreHere: string;
    consolidationNeeded: string;
    consolidate: string;
    confirmRevert: (name: string) => string;
    confirmDelete: (name: string) => string;
    confirmDeleteChildren: (name: string) => string;
    cancel: string;
}
interface SnapshotTreeProps {
    snapshots: SnapshotNode[];
    /** Id of the snapshot the running state descends from; rendered as the "You are here" node. */
    currentId?: string;
    onTake?: () => void;
    onRevert?: (id: string) => void;
    onDelete?: (id: string) => void;
    onDeleteChildren?: (id: string) => void;
    needsConsolidation?: boolean;
    onConsolidate?: () => void;
    labels?: Partial<SnapshotTreeLabels>;
    className?: string;
}
declare function SnapshotTree({ snapshots, currentId, onTake, onRevert, onDelete, onDeleteChildren, needsConsolidation, onConsolidate, labels, className }: SnapshotTreeProps): React.JSX.Element;
type EventSeverity = "info" | "warning" | "error";
interface ConsoleEvent {
    id: string;
    time: Date | string | number;
    severity: EventSeverity;
    message: string;
    source?: string;
    user?: string;
    details?: string;
}
interface EventConsoleLabels {
    title: string;
    search: string;
    severity: string;
    all: string;
    info: string;
    warning: string;
    error: string;
    liveTail: string;
    time: string;
    message: string;
    source: string;
    user: string;
    empty: string;
    details: string;
}
interface EventConsoleProps {
    events: ConsoleEvent[];
    liveTail?: boolean;
    onLiveTailChange?: (live: boolean) => void;
    labels?: Partial<EventConsoleLabels>;
    className?: string;
}
declare function EventConsole({ events, liveTail: liveProp, onLiveTailChange, labels, className }: EventConsoleProps): React.JSX.Element;

declare const vsphereObjectsEn: {
    console: ConsoleFrameLabels;
    hardware: HardwareEditorLabels;
    datastore: DatastoreBrowserLabels;
    permission: PermissionAssignLabels;
    snapshots: SnapshotTreeLabels;
    events: EventConsoleLabels;
};

/**
 * Per-domain label groups for the heavier components. English defaults live in `lib/messages/*.en.ts` and are
 * imported by the components themselves (so they tree-shake with them); `hu` and other locales fill this in.
 */
interface ComponentMessages {
    account: typeof accountEn;
    admin: typeof adminEn;
    tracker: typeof trackerEn;
    vsphereObjects: typeof vsphereObjectsEn;
    charts: typeof chartsEn;
    ui: typeof uiEn;
    content: typeof contentEn;
    dashboard: typeof dashboardEn;
    portal: typeof portalEn;
}
type Overrides<G> = {
    [S in keyof G]?: G[S] extends string ? string : Partial<G[S]>;
};
type ComponentMessageOverrides = {
    [K in keyof ComponentMessages]?: Overrides<ComponentMessages[K]>;
};
interface LafMessages {
    components: ComponentMessageOverrides;
    close: string;
    noResults: string;
    loading: string;
    search: string;
    commandPalette: string;
    command: string;
    commandPlaceholder: string;
    searchUsers: string;
    users: string;
    showPassword: string;
    hidePassword: string;
    capsLock: string;
    copy: string;
    copied: string;
    removeItem: (name: string) => string;
    removeRow: (n: number) => string;
    previousMonth: string;
    nextMonth: string;
    pagination: string;
    previousPage: string;
    nextPage: string;
    showing: (from: number, to: number, total: number) => string;
    pageOf: (page: number, count: number) => string;
    selectAllRows: string;
    selectRow: string;
    acknowledge: string;
    unsupportedType: (count: number) => string;
    exceedsSize: (count: number) => string;
    autoRefresh: string;
    oneTimeCode: string;
    copyCode: string;
    language: string;
    chooseDate: string;
    datePlaceholder: string;
    /** Monday-first short weekday names. */
    weekdaysShort: string[];
    breadcrumb: string;
    showHiddenLevels: (n: number) => string;
    dismiss: string;
    resizePanels: string;
    increase: (label: string) => string;
    decrease: (label: string) => string;
    unitOf: (label: string) => string;
    value: string;
    add: string;
    key: string;
    duplicateKey: string;
    timeRange: string;
    off: string;
    wrap: string;
    noLines: string;
    tenant: string;
    permission: string;
    /** Five password strength levels, weakest first. */
    passwordStrength: string[];
    passwordMismatch: string;
    cancel: string;
    retry: string;
    typeToConfirm: string;
    nothingHere: string;
    noRecentTasks: string;
    recentTasks: string;
    signOut: string;
    dropFiles: string;
    noActiveAlarms: string;
    vsCollapsePane: string;
    vsExpandPane: string;
    vsSummary: string;
    vsMonitor: string;
    vsConfigure: string;
    vsUsed: string;
    vsReserved: string;
    vsFree: string;
    vsCapacity: string;
    vsFilterAll: string;
    vsFilterMine: string;
    vsStatusFilter: string;
    vsDetails: string;
    vsResetAlarm: string;
    vsSelectAlarm: string;
    vsAcknowledgeSelected: string;
    vsOpenTarget: string;
    vsInventoryTree: string;
    vsRecentTasks: string;
    vsSelectAllAlarms: string;
    vsDuration: string;
    fixFollowing: string;
    moreTabs: string;
    next: string;
    back: string;
    finish: string;
    minimum: string;
    maximum: string;
    edit: string;
    stateOn: string;
    stateOff: string;
    stateSuspended: string;
    stateMaintenance: string;
    stateDisconnected: string;
    stateWarning: string;
    stateError: string;
    mfaMethod: string;
    mfaScan: string;
    mfaVerify: string;
    mfaRecovery: string;
    mfaTotp: string;
    mfaPasskey: string;
    mfaInvalid: string;
    mfaPasskeyWaiting: string;
    mfaPasskeyFailed: string;
    mfaStored: string;
    manualSecret: string;
    addedToApp: string;
    editorWrite: string;
    editorPreview: string;
    editorToolbar: string;
    editorBold: string;
    editorItalic: string;
    editorCode: string;
    editorLink: string;
    editorList: string;
    editorTaskList: string;
    editorQuote: string;
    editorUploading: string;
    editorNothingToPreview: string;
    editorMentions: string;
    editorCodeEditor: string;
    editorMarkdownEditor: string;
    editorProblem: string;
    recent: string;
    shortcuts: string;
    noShortcuts: string;
    dragHandle: (name: string) => string;
    dndInstructions: string;
    dndLifted: (name: string, pos: number, total: number) => string;
    dndMoved: (name: string, pos: number, total: number) => string;
    dndMovedTo: (name: string, column: string, pos: number, total: number) => string;
    dndDropped: (name: string, pos: number, total: number) => string;
    dndDroppedTo: (name: string, column: string, pos: number, total: number) => string;
    dndCancelled: (name: string) => string;
    wipLimit: (count: number, limit: number) => string;
    emptyColumn: string;
    customRange: string;
    rangeFrom: string;
    rangeTo: string;
    applyRange: string;
    timeOfDay: string;
}
declare const en: LafMessages;
interface LafContextValue {
    locale: string;
    timeZone: string;
    /** Message catalogue: strings and formatting functions, keyed by `LafMessages`. */
    t: LafMessages;
    format: Formatters;
    portalContainer?: HTMLElement;
}
declare function LafProvider({ locale, messages, timeZone, portalContainer, children, }: {
    /** BCP-47 tag; drives `Intl` formatting. */
    locale?: string;
    /** Partial overrides on top of the English catalogue, e.g. `hu` from `@pilab/laf/locales/hu`. */
    messages?: Partial<LafMessages>;
    /** IANA time zone; defaults to the browser's. */
    timeZone?: string;
    /** Overlays (dialogs, popovers, menus) portal here, e.g. inside a shadow root or iframe. */
    portalContainer?: HTMLElement;
    children: React.ReactNode;
}): React.JSX.Element;
declare function useLaf(): LafContextValue;
/**
 * `useLaf()` whose `t.components` is complete for the given groups: the component's bundled English defaults
 * overlaid with whatever the active locale provides (merged one level deep, e.g. per label set).
 */
declare function useLafDefaults<K extends keyof ComponentMessages>(defaults: Pick<ComponentMessages, K>): Omit<LafContextValue, "t"> & {
    t: Omit<LafMessages, "components"> & {
        components: Pick<ComponentMessages, K>;
    };
};
/** Container for Radix `Portal`s; `undefined` means document.body. */
declare function usePortalContainer(): HTMLElement | undefined;

export { type HardwareEditorLabels as $, type AccountSession as A, BarChart as B, type ComboboxOption as C, type ConsoleFrameLabels as D, type ConsoleFrameProps as E, type ConsoleStatus as F, DatastoreBrowser as G, type DatastoreBrowserLabels as H, type DatastoreBrowserProps as I, type DatastoreEntry as J, Kbd as K, DateTimeInput as L, type Device as M, type NotificationCenterProps as N, type DeviceKind as O, DeviceSelector as P, Donut as Q, ErrorSummary as R, EventConsole as S, type EventConsoleLabels as T, type EventConsoleProps as U, type EventSeverity as V, FileDropzone as W, FormField as X, Gauge as Y, type HardwareCapabilities as Z, HardwareEditor as _, type AlarmItem as a, type HardwareEditorProps as a0, type HwDevice as a1, type HwKind as a2, InlineEdit as a3, IpInput as a4, type LafContextValue as a5, type LafMessages as a6, LafProvider as a7, type NetworkLabels as a8, NotificationCenter as a9, TransferList as aA, type TransferListLabels as aB, type TransferListProps as aC, type UploadFile as aD, type User as aE, UserSelector as aF, type UserSelectorProps as aG, contrastRatio as aH, en as aI, isCidr as aJ, isIPv4 as aK, isIPv6 as aL, isIp as aM, normalizeHex as aN, parseCidr as aO, useLaf as aP, useLafDefaults as aQ, usePortalContainer as aR, type NotificationCenterLabels as aa, type NotificationItem as ab, type PasskeyItem as ac, PermissionAssignDialog as ad, type PermissionAssignDialogProps as ae, type PermissionAssignLabels as af, type PermissionAssignment as ag, type PermissionRole as ah, ReauthDialog as ai, type ReauthDialogLabels as aj, type ReauthDialogProps as ak, type ReauthMethod as al, SecurityFactors as am, type SecurityFactorsLabels as an, type SecurityFactorsProps as ao, SessionExpiryDialog as ap, type SessionExpiryDialogLabels as aq, type SessionExpiryDialogProps as ar, SessionList as as, type SessionListLabels as at, type SessionListProps as au, type SnapshotNode as av, SnapshotTree as aw, type SnapshotTreeLabels as ax, type SnapshotTreeProps as ay, type TransferItem as az, AlarmList as b, AllowListEditor as c, type AllowListEditorProps as d, type ApiKeyCreateInput as e, type ApiKeyItem as f, ApiKeyManager as g, type ApiKeyManagerLabels as h, type ApiKeyManagerProps as i, type Branding as j, BrandingEditor as k, type BrandingEditorLabels as l, type BrandingEditorProps as m, CidrInput as n, ColorField as o, portalEn as p, type ColorFieldLabels as q, type ColorFieldProps as r, Combobox as s, trackerEn as t, uiEn as u, type ComboboxProps as v, type ComponentMessageOverrides as w, type ComponentMessages as x, type ConsoleEvent as y, ConsoleFrame as z };
