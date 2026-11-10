import { Bell, Plus, X } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { useControllableState } from "../utils";
import { Button } from "./button";
import { Badge } from "./display";
import { Field, Input } from "./form";
import { FileDropzone, type UploadFile } from "./more";
import { Popover, PopoverContent, PopoverTrigger } from "./overlay";
import { IconButton, RelativeTime } from "./primitives";
import { VirtualList } from "./virtual";

/* ── Network validation helpers ── */
export function isIPv4(s: string): boolean {
  const parts = s.split(".");
  return parts.length === 4 && parts.every((p) => /^\d{1,3}$/.test(p) && (p === "0" || !p.startsWith("0")) && Number(p) <= 255);
}

export function isIPv6(s: string): boolean {
  if (!s || /[^0-9a-fA-F:.]/.test(s) || s.includes(":::")) return false;
  const halves = s.split("::");
  if (halves.length > 2) return false;
  const groups = (h: string) => (h === "" ? [] : h.split(":"));
  const all = halves.flatMap(groups);
  let count = all.length;
  const last = all[all.length - 1];
  if (last?.includes(".")) {
    if (!isIPv4(last)) return false;
    all.pop();
    count += 1; // an embedded IPv4 occupies two groups
  }
  if (!all.every((g) => /^[0-9a-fA-F]{1,4}$/.test(g))) return false;
  return halves.length === 2 ? count <= 7 : count === 8;
}

export function isIp(s: string): boolean {
  return isIPv4(s) || isIPv6(s);
}

/** Returns the parsed parts of `address/prefix`, or `null` when invalid. */
export function parseCidr(s: string): { address: string; prefix: number; version: 4 | 6 } | null {
  const m = /^([^/]+)\/(\d{1,3})$/.exec(s.trim());
  if (!m) return null;
  const address = m[1] as string;
  const prefix = Number(m[2]);
  if (isIPv4(address) && prefix <= 32) return { address, prefix, version: 4 };
  if (isIPv6(address) && prefix <= 128) return { address, prefix, version: 6 };
  return null;
}

export function isCidr(s: string): boolean {
  return parseCidr(s) !== null;
}

export interface NetworkLabels {
  invalidIp: string;
  invalidCidr: string;
  invalidEntry: string;
  duplicate: string;
  add: string;
  remove: (entry: string) => string;
  empty: string;
}
const netLabels: NetworkLabels = {
  invalidIp: "Enter a valid IPv4 or IPv6 address",
  invalidCidr: "Enter a valid CIDR block, e.g. 10.0.0.0/8",
  invalidEntry: "Enter a valid IP address or CIDR block",
  duplicate: "Already in the list",
  add: "Add",
  remove: (e) => `Remove ${e}`,
  empty: "No entries",
};

/* ── IpInput / CidrInput ── */
type NetInputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange"> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  /** Message shown when the (non-empty) value is invalid. */
  errorMessage?: string;
};

function NetInput({ validate, message, label, hint, errorMessage, value, defaultValue = "", onChange, className, id, ...rest }: NetInputProps & { validate: (v: string) => boolean; message: string }) {
  const auto = React.useId();
  const inputId = id ?? auto;
  const [val, setVal] = useControllableState({ value, defaultValue, onChange });
  const [touched, setTouched] = React.useState(false);
  const invalid = touched && val !== "" && !validate(val);
  const input = (
    <Input
      {...rest}
      id={inputId}
      value={val}
      invalid={invalid}
      spellCheck={false}
      autoComplete="off"
      className={cn("font-mono", className)}
      onChange={(e) => setVal(e.target.value)}
      onBlur={(e) => {
        setTouched(true);
        const t = e.target.value.trim();
        if (t !== e.target.value) setVal(t);
        rest.onBlur?.(e);
      }}
      onPaste={(e) => {
        const text = e.clipboardData.getData("text");
        if (text.trim() !== text) {
          e.preventDefault();
          setVal(text.trim());
        }
        rest.onPaste?.(e);
      }}
    />
  );
  if (!label) return input;
  return (
    <Field label={label} hint={hint} htmlFor={inputId} error={invalid ? (errorMessage ?? message) : undefined}>
      {input}
    </Field>
  );
}

export function IpInput(props: NetInputProps) {
  return <NetInput placeholder="192.0.2.1" validate={isIp} message={netLabels.invalidIp} {...props} />;
}

export function CidrInput(props: NetInputProps) {
  return <NetInput placeholder="10.0.0.0/8" validate={isCidr} message={netLabels.invalidCidr} {...props} />;
}

/* ── AllowListEditor ── */
export interface AllowListEditorProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  labels?: Partial<NetworkLabels>;
  disabled?: boolean;
}

export function AllowListEditor({ value, defaultValue = [], onChange, label = "Allowed addresses", labels: l, disabled }: AllowListEditorProps) {
  const L = { ...netLabels, ...l };
  const id = React.useId();
  const [list, setList] = useControllableState({ value, defaultValue, onChange });
  const [draft, setDraft] = React.useState("");
  const [error, setError] = React.useState<string>();
  const add = () => {
    const entry = draft.trim();
    if (!entry) return;
    if (!isIp(entry) && !isCidr(entry)) return setError(L.invalidEntry);
    if (list.includes(entry)) return setError(L.duplicate);
    setList([...list, entry]);
    setDraft("");
    setError(undefined);
  };
  return (
    <div className="grid gap-2">
      <Field label={label} htmlFor={id} error={error}>
        <div className="flex gap-2">
          <Input
            id={id}
            value={draft}
            invalid={!!error}
            disabled={disabled}
            spellCheck={false}
            autoComplete="off"
            placeholder="203.0.113.0/24"
            className="font-mono"
            onChange={(e) => {
              setDraft(e.target.value);
              setError(undefined);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
          />
          <Button variant="secondary" disabled={disabled} leftIcon={<Plus />} onClick={add}>
            {L.add}
          </Button>
        </div>
      </Field>
      {list.length === 0 ? (
        <p className="text-sm text-muted">{L.empty}</p>
      ) : (
        <ul aria-label={label} className="divide-y divide-line rounded-md border border-line text-sm">
          {list.map((entry) => (
            <li key={entry} className="flex items-center gap-3 px-3 py-1.5">
              <span className="flex-1 font-mono">{entry}</span>
              <Badge tone="neutral">{isCidr(entry) ? "CIDR" : isIPv6(entry) ? "IPv6" : "IPv4"}</Badge>
              <button type="button" disabled={disabled} aria-label={L.remove(entry)} className="text-muted hover:text-fg" onClick={() => setList(list.filter((x) => x !== entry))}>
                <X className="size-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── TransferList ── */
export interface TransferItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TransferListLabels {
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
const transferLabels: TransferListLabels = {
  available: "Available",
  selected: "Selected",
  search: (l) => `Search ${l.toLowerCase()}`,
  count: (c, t) => (c ? `${c} of ${t} selected` : `${t} items`),
  moveRight: "Add selected",
  moveLeft: "Remove selected",
  moveAllRight: "Add all",
  moveAllLeft: "Remove all",
  empty: "No items",
};

export interface TransferListProps {
  items: TransferItem[];
  /** Ids on the right-hand list. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  labels?: Partial<TransferListLabels>;
  /** Viewport height of each list in px. */
  height?: number;
}

const ROW = 32;

function TransferColumn({ title, items, checked, setChecked, L, height }: { title: string; items: TransferItem[]; checked: Set<string>; setChecked: (s: Set<string>) => void; L: TransferListLabels; height: number }) {
  const [q, setQ] = React.useState("");
  const needle = q.trim().toLowerCase();
  const shown = needle ? items.filter((i) => i.label.toLowerCase().includes(needle)) : items;
  const n = items.filter((i) => checked.has(i.id)).length;
  return (
    <div className="grid min-w-0 flex-1 gap-2 rounded-md border border-line p-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-semibold text-fg">{title}</span>
        <span className="text-xs text-muted" aria-live="polite">
          {L.count(n, items.length)}
        </span>
      </div>
      <Input type="search" aria-label={L.search(title)} placeholder={L.search(title)} value={q} onChange={(e) => setQ(e.target.value)} />
      {shown.length === 0 ? (
        <p className="px-1 py-2 text-sm text-muted">{L.empty}</p>
      ) : (
        <VirtualList
          items={shown}
          rowHeight={ROW}
          height={height}
          label={title}
          renderRow={(item) => (
            <label className={cn("flex h-full items-center gap-2 px-2 text-sm hover:bg-card-hover", item.disabled && "opacity-50")}>
              <input
                type="checkbox"
                disabled={item.disabled}
                checked={checked.has(item.id)}
                onChange={(e) => {
                  const next = new Set(checked);
                  if (e.target.checked) next.add(item.id);
                  else next.delete(item.id);
                  setChecked(next);
                }}
              />
              <span className="truncate">{item.label}</span>
            </label>
          )}
        />
      )}
    </div>
  );
}

export function TransferList({ items, value, defaultValue = [], onChange, labels, height = 224 }: TransferListProps) {
  const L = { ...transferLabels, ...labels };
  const [sel, setSel] = useControllableState({ value, defaultValue, onChange });
  const [leftChecked, setLeftChecked] = React.useState<Set<string>>(new Set());
  const [rightChecked, setRightChecked] = React.useState<Set<string>>(new Set());
  const chosen = new Set(sel);
  const left = items.filter((i) => !chosen.has(i.id));
  const right = sel.map((id) => items.find((i) => i.id === id)).filter((i): i is TransferItem => !!i);
  const move = (ids: string[], toRight: boolean) => {
    const set = new Set(ids);
    setSel(toRight ? [...sel, ...ids.filter((id) => !chosen.has(id))] : sel.filter((id) => !set.has(id)));
    setLeftChecked(new Set());
    setRightChecked(new Set());
  };
  const movable = (list: TransferItem[]) => list.filter((i) => !i.disabled).map((i) => i.id);
  return (
    <div role="group" aria-label={`${L.available} / ${L.selected}`} className="flex items-stretch gap-3">
      <TransferColumn title={L.available} items={left} checked={leftChecked} setChecked={setLeftChecked} L={L} height={height} />
      <div className="flex flex-col justify-center gap-2">
        <Button size="sm" variant="secondary" aria-label={L.moveAllRight} disabled={movable(left).length === 0} onClick={() => move(movable(left), true)}>
          »
        </Button>
        <Button size="sm" variant="secondary" aria-label={L.moveRight} disabled={leftChecked.size === 0} onClick={() => move([...leftChecked], true)}>
          ›
        </Button>
        <Button size="sm" variant="secondary" aria-label={L.moveLeft} disabled={rightChecked.size === 0} onClick={() => move([...rightChecked], false)}>
          ‹
        </Button>
        <Button size="sm" variant="secondary" aria-label={L.moveAllLeft} disabled={movable(right).length === 0} onClick={() => move(movable(right), false)}>
          «
        </Button>
      </div>
      <TransferColumn title={L.selected} items={right} checked={rightChecked} setChecked={setRightChecked} L={L} height={height} />
    </div>
  );
}

/* ── Contrast + ColorField (ADR-12) ── */
// Token defaults mirror --primary, --bg-card (opaque) and --on-primary; encoded numerically so no colour literals live in components.
const fromRgb = (n: number) => `#${n.toString(16).padStart(6, "0")}`;
const DEFAULT_PRIMARY = fromRgb(0x54a2ff);
const DEFAULT_CARD = fromRgb(0x18181b);
const DEFAULT_ON_PRIMARY = fromRgb(0x0b0b0d);

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Normalises `#abc`/`abc`/long form to six-digit hex, or `null` when not a hex colour. */
export function normalizeHex(input: string): string | null {
  const m = HEX.exec(input.trim());
  if (!m) return null;
  let h = (m[1] as string).toLowerCase();
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  return `#${h}`;
}

function luminance(hex: string): number {
  const h = normalizeHex(hex);
  if (!h) throw new Error(`Invalid hex colour: ${hex}`);
  const ch = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * (ch[0] as number) + 0.7152 * (ch[1] as number) + 0.0722 * (ch[2] as number);
}

/** WCAG 2.x contrast ratio (1–21) between two hex colours. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

export interface ColorFieldLabels {
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
const colorLabels: ColorFieldLabels = {
  label: "Brand colour",
  colorPicker: "Pick colour",
  invalidHex: "Enter a hex colour (3 or 6 digits)",
  onCard: "Against card background",
  onPrimary: "Button text on colour",
  pass: "AA pass",
  fail: "AA fail",
  rejected: "Colour does not meet the contrast requirements",
  contrast: "Contrast",
  preview: "Preview",
  sampleButton: "Button",
  sampleBadge: "Badge",
};

export interface ColorFieldProps {
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

export function ColorField({ value, defaultValue = DEFAULT_PRIMARY, onChange, cardColor = DEFAULT_CARD, onPrimaryColor = DEFAULT_ON_PRIMARY, minCardRatio = 3, minTextRatio = 4.5, labels }: ColorFieldProps) {
  const L = { ...colorLabels, ...labels };
  const id = React.useId();
  const [accepted, setAccepted] = useControllableState({ value, defaultValue, onChange });
  const [draft, setDraft] = React.useState(accepted);
  React.useEffect(() => setDraft(accepted), [accepted]);
  const hex = normalizeHex(draft);
  const onCard = hex ? contrastRatio(hex, cardColor) : 0;
  const onText = hex ? contrastRatio(hex, onPrimaryColor) : 0;
  const passes = !!hex && onCard >= minCardRatio && onText >= minTextRatio;
  const error = !hex ? L.invalidHex : !passes ? L.rejected : undefined;
  const update = (next: string, final = true) => {
    setDraft(next);
    // 3-digit shorthand is only accepted on blur so partial typing never commits
    const h = final || next.replace("#", "").length === 6 ? normalizeHex(next) : null;
    if (h && contrastRatio(h, cardColor) >= minCardRatio && contrastRatio(h, onPrimaryColor) >= minTextRatio) setAccepted(h);
  };
  const row = (name: string, ratio: number, min: number) => (
    <li className="flex items-center justify-between gap-3">
      <span>{name}</span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-xs">{hex ? `${ratio.toFixed(2)}:1` : "–"}</span>
        <Badge tone={hex && ratio >= min ? "ok" : "danger"}>{hex && ratio >= min ? L.pass : L.fail}</Badge>
      </span>
    </li>
  );
  const shown = passes ? (hex as string) : accepted;
  return (
    <div className="grid gap-3">
      <Field label={L.label} htmlFor={id} error={error}>
        <div className="flex items-center gap-2">
          <input type="color" aria-label={L.colorPicker} value={normalizeHex(accepted) ?? fromRgb(0)} onChange={(e) => update(e.target.value)} className="h-8 w-10 rounded-sm border border-line bg-transparent p-0.5" />
          <Input id={id} value={draft} invalid={!!error} spellCheck={false} maxLength={7} className="max-w-32 font-mono" onChange={(e) => update(e.target.value, false)} onBlur={(e) => update(e.target.value)} />
        </div>
      </Field>
      <ul aria-label={L.contrast} className="grid gap-1 text-sm">
        {row(L.onCard, onCard, minCardRatio)}
        {row(L.onPrimary, onText, minTextRatio)}
      </ul>
      <div aria-label={L.preview} role="group" className="flex items-center gap-3 rounded-md border border-line p-3" style={{ "--primary": shown, "--primary-hover": shown } as React.CSSProperties}>
        <span className="btn btn-primary pointer-events-none" aria-hidden>
          {L.sampleButton}
        </span>
        <Badge tone="primary">{L.sampleBadge}</Badge>
        <span aria-hidden className="inline-block size-6 rounded-sm bg-card outline-2 outline-offset-2 outline-primary" />
      </div>
    </div>
  );
}

/* ── BrandingEditor ── */
export interface Branding {
  productName: string;
  primary: string;
  logoUrl?: string;
}

export interface BrandingEditorLabels {
  productName: string;
  logo: string;
  dropLogo: string;
  preview: string;
  signIn: string;
  username: string;
  password: string;
  removeLogo: string;
}
const brandingLabels: BrandingEditorLabels = {
  productName: "Product name",
  logo: "Logo",
  dropLogo: "Drop a logo here or click to browse",
  preview: "Login page preview",
  signIn: "Sign in",
  username: "Username",
  password: "Password",
  removeLogo: "Remove logo",
};

export interface BrandingEditorProps {
  value?: Branding;
  defaultValue?: Branding;
  onChange?: (value: Branding) => void;
  /** Max logo size in bytes. */
  maxLogoSize?: number;
  cardColor?: string;
  onPrimaryColor?: string;
  labels?: Partial<BrandingEditorLabels> & { color?: Partial<ColorFieldLabels> };
}

export function BrandingEditor({ value, defaultValue = { productName: "", primary: DEFAULT_PRIMARY }, onChange, maxLogoSize = 512 * 1024, cardColor, onPrimaryColor, labels }: BrandingEditorProps) {
  const L = { ...brandingLabels, ...labels };
  const [b, setB] = useControllableState({ value, defaultValue, onChange });
  const nameId = React.useId();
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid content-start gap-4">
        <Field label={L.productName} htmlFor={nameId}>
          <Input id={nameId} value={b.productName} onChange={(e) => setB({ ...b, productName: e.target.value })} />
        </Field>
        <ColorField value={b.primary} onChange={(primary) => setB({ ...b, primary })} cardColor={cardColor} onPrimaryColor={onPrimaryColor} labels={labels?.color} />
        <div className="grid gap-1.5">
          <span className="form-label">{L.logo}</span>
          <FileDropzone
            multiple={false}
            accept="image/png,image/svg+xml,image/jpeg"
            maxSize={maxLogoSize}
            label={L.dropLogo}
            files={files}
            onRemove={() => {
              setFiles([]);
              setB({ ...b, logoUrl: undefined });
            }}
            onFiles={(list) => {
              const f = list[0];
              if (!f) return;
              setFiles([{ id: f.name, name: f.name, size: f.size }]);
              setB({ ...b, logoUrl: URL.createObjectURL(f) });
            }}
          />
        </div>
      </div>
      <figure className="m-0 grid gap-2">
        <figcaption className="form-label">{L.preview}</figcaption>
        <div
          // scaled, non-interactive replica of the login card using the candidate colour
          {...({ inert: true } as object)}
          className="overflow-hidden rounded-md border border-line bg-bg p-6"
          style={{ "--primary": b.primary, "--primary-hover": b.primary } as React.CSSProperties}
        >
          <div className="mx-auto grid w-64 origin-top gap-3 rounded-md border border-line bg-card p-5">
            <div className="flex items-center gap-2">
              {b.logoUrl && <img src={b.logoUrl} alt="" className="size-8 object-contain" />}
              <span className="text-base font-semibold text-fg">{b.productName}</span>
            </div>
            <span className="h-8 rounded-sm border border-line bg-input" />
            <span className="h-8 rounded-sm border border-line bg-input" />
            <span className="btn btn-primary justify-center">{L.signIn}</span>
          </div>
        </div>
      </figure>
    </div>
  );
}

/* ── NotificationCenter ── */
export interface NotificationItem {
  id: string;
  title: string;
  body?: string;
  time: Date | string | number;
  unread?: boolean;
  href?: string;
  group?: string;
}

export interface NotificationCenterLabels {
  bell: string;
  title: string;
  unreadCount: (n: number) => string;
  markRead: (title: string) => string;
  markAllRead: string;
  viewAll: string;
  empty: string;
}
const notifLabels: NotificationCenterLabels = {
  bell: "Notifications",
  title: "Notifications",
  unreadCount: (n) => (n === 0 ? "No unread notifications" : `${n} unread notification${n === 1 ? "" : "s"}`),
  markRead: (t) => `Mark "${t}" as read`,
  markAllRead: "Mark all as read",
  viewAll: "View all",
  empty: "You're all caught up",
};

export interface NotificationCenterProps {
  items: NotificationItem[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onViewAll?: () => void;
  onOpen?: (item: NotificationItem) => void;
  labels?: Partial<NotificationCenterLabels>;
}

export function NotificationCenter({ items, onMarkRead, onMarkAllRead, onViewAll, onOpen, labels }: NotificationCenterProps) {
  const L = { ...notifLabels, ...labels };
  const unread = items.filter((i) => i.unread).length;
  const groups = new Map<string | undefined, NotificationItem[]>();
  for (const i of items) groups.set(i.group, [...(groups.get(i.group) ?? []), i]);
  const bellLabel = unread ? `${L.bell} (${unread})` : L.bell;
  return (
    <Popover>
      <span className="relative inline-flex">
        <PopoverTrigger asChild>
          <IconButton label={bellLabel} icon={<Bell className="size-4" />} />
        </PopoverTrigger>
        {unread > 0 && (
          <span aria-hidden className="pointer-events-none absolute -end-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-sm bg-danger px-1 text-[0.625rem] leading-4 font-bold text-on-primary">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
        <span className="sr-only" aria-live="polite">
          {L.unreadCount(unread)}
        </span>
      </span>
      <PopoverContent title={L.title} align="end" className="w-80 p-0" footer={onViewAll && <Button variant="ghost" size="sm" onClick={onViewAll}>{L.viewAll}</Button>}>
        {unread > 0 && onMarkAllRead && (
          <div className="flex justify-end px-3 pb-1">
            <Button size="sm" variant="ghost" onClick={onMarkAllRead}>
              {L.markAllRead}
            </Button>
          </div>
        )}
        {items.length === 0 ? (
          <p className="px-3 py-6 text-center text-sm text-muted">{L.empty}</p>
        ) : (
          <div className="max-h-80 overflow-auto">
            {[...groups].map(([group, list]) => (
              <section key={group ?? "_"} aria-label={group}>
                {group && <h3 className="bg-muted-bg px-3 py-1 text-xs font-semibold text-muted uppercase">{group}</h3>}
                <ul className="divide-y divide-line">
                  {list.map((n) => (
                    <li key={n.id} className="flex items-start gap-2 px-3 py-2 text-sm">
                      <span aria-hidden className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.unread ? "bg-primary" : "bg-transparent")} />
                      <div className="min-w-0 flex-1">
                        {n.href ? (
                          <a href={n.href} className={cn("block truncate hover:underline", n.unread ? "font-semibold text-fg" : "text-muted")} onClick={() => onOpen?.(n)}>
                            {n.title}
                          </a>
                        ) : (
                          <span className={cn("block truncate", n.unread ? "font-semibold text-fg" : "text-muted")}>{n.title}</span>
                        )}
                        {n.body && <p className="m-0 text-xs text-muted">{n.body}</p>}
                        <RelativeTime value={n.time} className="text-xs text-subtle" />
                      </div>
                      {n.unread && onMarkRead && (
                        <button type="button" aria-label={L.markRead(n.title)} className="text-xs text-primary hover:underline" onClick={() => onMarkRead(n.id)}>
                          ✓
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
