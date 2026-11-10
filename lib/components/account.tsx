import { Fingerprint, KeyRound, Laptop, LogOut, ShieldCheck, Smartphone, Tablet, Trash2, RefreshCw, Plus } from "lucide-react";
import * as React from "react";
import { useLaf } from "../i18n";
import { Button } from "./button";
import { Badge, Alert } from "./display";
import { Checkbox, Field, Input } from "./form";
import { ConfirmDialog, SecretDisplay } from "./helpers";
import { InlineEdit } from "./more";
import { Dialog, DialogContent, DialogClose } from "./overlay";
import type { DeviceKind } from "./pickers";
import { IconButton, RelativeTime } from "./primitives";

const deviceIcon: Record<DeviceKind, typeof Laptop> = { phone: Smartphone, laptop: Laptop, tablet: Tablet, key: KeyRound };
type Time = Date | string | number;

/* ── 4.82 SessionList ── */
export interface AccountSession {
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

export interface SessionListLabels {
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

const sessionLabels: SessionListLabels = {
  thisDevice: "This device",
  revoke: "Revoke session",
  revokeOthers: "Sign out other sessions",
  revokeOthersTitle: "Sign out other sessions?",
  revokeOthersBody: "Every session except this device will be signed out.",
  lastActive: "Last active",
  user: "User",
  empty: "No active sessions",
  cancel: "Cancel",
};

export interface SessionListProps {
  sessions: AccountSession[];
  onRevoke: (id: string) => void | Promise<void>;
  onRevokeOthers?: () => void | Promise<void>;
  /** Admin variant: adds a user column. */
  showUser?: boolean;
  labels?: Partial<SessionListLabels>;
}

export function SessionList({ sessions, onRevoke, onRevokeOthers, showUser, labels }: SessionListProps) {
  const l = { ...sessionLabels, ...labels };
  const [confirm, setConfirm] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const others = sessions.filter((s) => !s.current).length;
  return (
    <div className="grid gap-3">
      {onRevokeOthers && (
        <div className="flex justify-end">
          <Button variant="secondary" size="sm" leftIcon={<LogOut />} disabled={others === 0} onClick={() => setConfirm(true)}>
            {l.revokeOthers}
          </Button>
        </div>
      )}
      {sessions.length === 0 ? (
        <p className="text-sm text-muted">{l.empty}</p>
      ) : (
        <ul className="m-0 grid list-none gap-2 p-0">
          {sessions.map((s) => {
            const Icon = deviceIcon[s.device];
            const title = [s.browser, s.os].filter(Boolean).join(" · ");
            return (
              <li key={s.id} className="card flex items-center gap-3">
                <Icon className="size-5 shrink-0 text-muted" aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-fg">
                    <span>{title}</span>
                    {s.current && <Badge tone="primary">{l.thisDevice}</Badge>}
                  </div>
                  <div className="text-xs text-muted">
                    {showUser && s.user && (
                      <>
                        <span className="sr-only">{l.user}: </span>
                        {s.user} ·{" "}
                      </>
                    )}
                    {[s.ip, s.location].filter(Boolean).join(" · ")}
                    {(s.ip || s.location) && " · "}
                    <span className="sr-only">{l.lastActive}: </span>
                    <RelativeTime value={s.lastActive} />
                  </div>
                </div>
                {!s.current && (
                  <IconButton
                    label={`${l.revoke}: ${title}`}
                    size="sm"
                    icon={<Trash2 className="size-4" />}
                    onClick={() => void onRevoke(s.id)}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title={l.revokeOthersTitle}
        description={l.revokeOthersBody}
        confirmLabel={l.revokeOthers}
        cancelLabel={l.cancel}
        pending={pending}
        onConfirm={async () => {
          setPending(true);
          try {
            await onRevokeOthers?.();
            setConfirm(false);
          } finally {
            setPending(false);
          }
        }}
      />
    </div>
  );
}

/* ── 4.84 ApiKeyManager ── */
export interface ApiKeyItem {
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

export interface ApiKeyCreateInput {
  name: string;
  /** Days until expiry; `null` = never. */
  expiresInDays: number | null;
  scopes: string[];
}

export interface ApiKeyManagerLabels {
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

const apiKeyLabels: ApiKeyManagerLabels = {
  create: "Create key",
  createTitle: "Create API key",
  name: "Name",
  expiry: "Expiry",
  scopes: "Scopes",
  never: "Never",
  days: (n) => `${n} days`,
  created: "Created",
  expires: "Expires",
  lastUsed: "Last used",
  neverUsed: "Never used",
  revoke: "Revoke",
  revoked: "Revoked",
  rotate: "Rotate",
  secretLabel: "Your new secret",
  secretNotice: "Copy this secret now. It will not be shown again.",
  acknowledge: "I have stored this secret",
  done: "Done",
  cancel: "Cancel",
  empty: "No keys yet",
  revokeTitle: "Revoke key?",
  revokeBody: "Applications using this key will stop working immediately.",
  error: "Something went wrong. Try again.",
};

export interface ApiKeyManagerProps {
  keys: ApiKeyItem[];
  /** Available scopes. */
  scopes: { value: string; label?: string }[];
  expiryPresets?: (number | null)[];
  /** Resolve with the clear-text secret; it is shown once. */
  onCreate: (input: ApiKeyCreateInput) => Promise<{ secret: string }>;
  onRevoke: (id: string) => void | Promise<void>;
  /** Regenerate a key; resolves with the new secret (shown once). */
  onRotate?: (id: string) => Promise<{ secret: string }>;
  labels?: Partial<ApiKeyManagerLabels>;
}

export function ApiKeyManager({ keys, scopes, expiryPresets = [30, 90, 365, null], onCreate, onRevoke, onRotate, labels }: ApiKeyManagerProps) {
  const l = { ...apiKeyLabels, ...labels };
  const [form, setForm] = React.useState(false);
  const [name, setName] = React.useState("");
  const [expiry, setExpiry] = React.useState<number | null>(expiryPresets[0] ?? null);
  const [picked, setPicked] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const [secret, setSecret] = React.useState<string>();
  const [ack, setAck] = React.useState(false);
  const [revoking, setRevoking] = React.useState<ApiKeyItem>();
  const nameId = React.useId();
  const expId = React.useId();

  const reveal = (s: string) => {
    setSecret(s);
    setAck(false);
  };
  const submit = async () => {
    setBusy(true);
    setError(undefined);
    try {
      const r = await onCreate({ name: name.trim(), expiresInDays: expiry, scopes: picked });
      setForm(false);
      setName("");
      setPicked([]);
      reveal(r.secret);
    } catch {
      setError(l.error);
    } finally {
      setBusy(false);
    }
  };
  const rotate = async (id: string) => {
    try {
      reveal((await onRotate!(id)).secret);
    } catch {
      setError(l.error);
    }
  };

  return (
    <div className="grid gap-3">
      <div className="flex justify-end">
        <Button size="sm" leftIcon={<Plus />} onClick={() => setForm(true)}>
          {l.create}
        </Button>
      </div>
      {error && !form && (
        <Alert tone="error">
          <span role="alert">{error}</span>
        </Alert>
      )}
      {keys.length === 0 ? (
        <p className="text-sm text-muted">{l.empty}</p>
      ) : (
        <ul className="m-0 grid list-none gap-2 p-0">
          {keys.map((k) => (
            <li key={k.id} className="card grid gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-fg">{k.name}</span>
                <code className="font-mono text-xs text-muted">{k.prefix}</code>
                {k.revoked && <Badge tone="danger">{l.revoked}</Badge>}
                <span className="ms-auto flex gap-1">
                  {onRotate && !k.revoked && (
                    <IconButton label={`${l.rotate}: ${k.name}`} size="sm" icon={<RefreshCw className="size-4" />} onClick={() => void rotate(k.id)} />
                  )}
                  {!k.revoked && (
                    <IconButton label={`${l.revoke}: ${k.name}`} size="sm" icon={<Trash2 className="size-4" />} onClick={() => setRevoking(k)} />
                  )}
                </span>
              </div>
              {k.scopes.length > 0 && (
                <ul className="m-0 flex list-none flex-wrap gap-1 p-0" aria-label={l.scopes}>
                  {k.scopes.map((s) => (
                    <li key={s}>
                      <Badge plain>{s}</Badge>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-x-4 text-xs text-muted">
                <span>
                  {l.created} <RelativeTime value={k.createdAt} />
                </span>
                <span>
                  {l.expires}: {k.expiresAt ? <RelativeTime value={k.expiresAt} /> : l.never}
                </span>
                <span>
                  {l.lastUsed}: {k.lastUsedAt ? <RelativeTime value={k.lastUsedAt} /> : l.neverUsed}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={form} onOpenChange={setForm}>
        <DialogContent
          title={l.createTitle}
          footer={
            <>
              <DialogClose asChild>
                <Button variant="secondary" size="sm">
                  {l.cancel}
                </Button>
              </DialogClose>
              <Button size="sm" loading={busy} disabled={!name.trim()} onClick={submit}>
                {l.create}
              </Button>
            </>
          }
        >
          <div className="grid gap-3">
            <Field label={l.name} htmlFor={nameId}>
              <Input id={nameId} value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
            </Field>
            <div className="grid gap-1">
              <label className="form-label" htmlFor={expId}>
                {l.expiry}
              </label>
              <select id={expId} className="form-select" value={String(expiry)} onChange={(e) => setExpiry(e.target.value === "null" ? null : Number(e.target.value))}>
                {expiryPresets.map((p) => (
                  <option key={String(p)} value={String(p)}>
                    {p === null ? l.never : l.days(p)}
                  </option>
                ))}
              </select>
            </div>
            <fieldset className="m-0 grid gap-1 border-0 p-0">
              <legend className="form-label">{l.scopes}</legend>
              {scopes.map((s) => (
                <Checkbox
                  key={s.value}
                  checked={picked.includes(s.value)}
                  onChange={(e) => setPicked((p) => (e.target.checked ? [...p, s.value] : p.filter((x) => x !== s.value)))}
                >
                  {s.label ?? s.value}
                </Checkbox>
              ))}
            </fieldset>
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={secret !== undefined} onOpenChange={(o) => ack && !o && setSecret(undefined)}>
        <DialogContent
          title={l.secretLabel}
          description={l.secretNotice}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => !ack && e.preventDefault()}
          footer={
            <Button size="sm" disabled={!ack} onClick={() => setSecret(undefined)}>
              {l.done}
            </Button>
          }
        >
          {secret !== undefined && (
            <SecretDisplay value={secret} label={l.secretLabel} acknowledgeLabel={l.acknowledge} acknowledged={ack} onAcknowledge={setAck} />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!revoking}
        onOpenChange={(o) => !o && setRevoking(undefined)}
        title={l.revokeTitle}
        description={l.revokeBody}
        items={revoking ? [revoking.name] : undefined}
        confirmLabel={l.revoke}
        cancelLabel={l.cancel}
        onConfirm={async () => {
          if (revoking) await onRevoke(revoking.id);
          setRevoking(undefined);
        }}
      />
    </div>
  );
}

/* ── 4.85 SecurityFactors ── */
export interface PasskeyItem {
  id: string;
  name: string;
  createdAt: Time;
  lastUsedAt?: Time | null;
}

export interface SecurityFactorsLabels {
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

const factorLabels: SecurityFactorsLabels = {
  password: "Password",
  passwordChanged: "Last changed",
  passwordNever: "Never changed",
  changePassword: "Change password",
  totp: "Authenticator app (TOTP)",
  totpOn: "Enabled",
  totpOff: "Not set up",
  enable: "Enable",
  disable: "Disable",
  passkeys: "Passkeys",
  addPasskey: "Add passkey",
  renamePasskey: "Passkey name",
  removePasskey: "Remove passkey",
  created: "Created",
  lastUsed: "Last used",
  neverUsed: "Never used",
  noPasskeys: "No passkeys registered",
  recovery: "Recovery codes",
  recoveryRemaining: (n) => `${n} remaining`,
  regenerate: "Regenerate",
  recoveryTitle: "New recovery codes",
  recoveryNotice: "Store these codes safely. They will not be shown again.",
  acknowledge: "I have stored these codes",
  done: "Done",
  cancel: "Cancel",
  removeTitle: "Remove second factor?",
  removeBody: "This second factor will no longer protect the account.",
  removeLastWarning: "This is your last second factor. Your account will be protected by the password only.",
  remove: "Remove",
};

export interface SecurityFactorsProps {
  password?: { changedAt?: Time | null; onChange: () => void };
  totp?: { enabled: boolean; onEnable: () => void; onDisable: () => void | Promise<void> };
  passkeys?: {
    items: PasskeyItem[];
    onAdd: () => void;
    onRename: (id: string, name: string) => void | Promise<void>;
    onRemove: (id: string) => void | Promise<void>;
  };
  recovery?: { remaining: number; onRegenerate: () => Promise<string[]> };
  labels?: Partial<SecurityFactorsLabels>;
}

export function SecurityFactors({ password, totp, passkeys, recovery, labels }: SecurityFactorsProps) {
  const l = { ...factorLabels, ...labels };
  const [removal, setRemoval] = React.useState<{ title: string; run: () => void | Promise<void> }>();
  const [codes, setCodes] = React.useState<string[]>();
  const [ack, setAck] = React.useState(false);
  const factorCount = (totp?.enabled ? 1 : 0) + (passkeys?.items.length ?? 0);
  const last = factorCount === 1;

  return (
    <div className="grid gap-4">
      {password && (
        <section className="card flex items-center gap-3" aria-label={l.password}>
          <KeyRound className="size-5 text-muted" aria-hidden />
          <div className="flex-1">
            <h3 className="m-0 text-sm text-fg">{l.password}</h3>
            <p className="m-0 text-xs text-muted">
              {password.changedAt ? (
                <>
                  {l.passwordChanged} <RelativeTime value={password.changedAt} />
                </>
              ) : (
                l.passwordNever
              )}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={password.onChange}>
            {l.changePassword}
          </Button>
        </section>
      )}
      {totp && (
        <section className="card flex items-center gap-3" aria-label={l.totp}>
          <ShieldCheck className="size-5 text-muted" aria-hidden />
          <div className="flex-1">
            <h3 className="m-0 text-sm text-fg">{l.totp}</h3>
            <p className="m-0 text-xs text-muted">{totp.enabled ? l.totpOn : l.totpOff}</p>
          </div>
          {totp.enabled ? (
            <Button variant="secondary" size="sm" onClick={() => setRemoval({ title: l.totp, run: totp.onDisable })}>
              {l.disable}
            </Button>
          ) : (
            <Button size="sm" onClick={totp.onEnable}>
              {l.enable}
            </Button>
          )}
        </section>
      )}
      {passkeys && (
        <section className="card grid gap-2" aria-label={l.passkeys}>
          <div className="flex items-center gap-3">
            <Fingerprint className="size-5 text-muted" aria-hidden />
            <h3 className="m-0 flex-1 text-sm text-fg">{l.passkeys}</h3>
            <Button variant="secondary" size="sm" leftIcon={<Plus />} onClick={passkeys.onAdd}>
              {l.addPasskey}
            </Button>
          </div>
          {passkeys.items.length === 0 ? (
            <p className="m-0 text-xs text-muted">{l.noPasskeys}</p>
          ) : (
            <ul className="m-0 grid list-none gap-1 p-0">
              {passkeys.items.map((p) => (
                <li key={p.id} className="flex items-center gap-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <InlineEdit label={l.renamePasskey} value={p.name} onSave={(v) => passkeys.onRename(p.id, v)} />
                    <div className="text-xs text-muted">
                      {l.created} <RelativeTime value={p.createdAt} /> · {l.lastUsed}:{" "}
                      {p.lastUsedAt ? <RelativeTime value={p.lastUsedAt} /> : l.neverUsed}
                    </div>
                  </div>
                  <IconButton
                    label={`${l.removePasskey}: ${p.name}`}
                    size="sm"
                    icon={<Trash2 className="size-4" />}
                    onClick={() => setRemoval({ title: p.name, run: () => passkeys.onRemove(p.id) })}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      {recovery && (
        <section className="card flex items-center gap-3" aria-label={l.recovery}>
          <RefreshCw className="size-5 text-muted" aria-hidden />
          <div className="flex-1">
            <h3 className="m-0 text-sm text-fg">{l.recovery}</h3>
            <p className="m-0 text-xs text-muted">{l.recoveryRemaining(recovery.remaining)}</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={async () => {
              setAck(false);
              setCodes(await recovery.onRegenerate());
            }}
          >
            {l.regenerate}
          </Button>
        </section>
      )}

      <ConfirmDialog
        open={!!removal}
        onOpenChange={(o) => !o && setRemoval(undefined)}
        title={l.removeTitle}
        description={last ? `${l.removeBody} ${l.removeLastWarning}` : l.removeBody}
        items={removal ? [removal.title] : undefined}
        confirmLabel={removal?.title === l.totp ? l.disable : l.remove}
        cancelLabel={l.cancel}
        onConfirm={async () => {
          await removal?.run();
          setRemoval(undefined);
        }}
      />
      <Dialog open={!!codes} onOpenChange={(o) => ack && !o && setCodes(undefined)}>
        <DialogContent
          title={l.recoveryTitle}
          description={l.recoveryNotice}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => !ack && e.preventDefault()}
          footer={
            <Button size="sm" disabled={!ack} onClick={() => setCodes(undefined)}>
              {l.done}
            </Button>
          }
        >
          <div className="grid gap-3">
            <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 font-mono text-sm text-fg">
              {codes?.map((c) => (
                <li key={c} className="rounded-sm border border-line bg-muted-bg px-2 py-1">
                  {c}
                </li>
              ))}
            </ul>
            <Checkbox checked={ack} onChange={(e) => setAck(e.target.checked)}>
              {l.acknowledge}
            </Checkbox>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ── 4.86 ReauthDialog ── */
export type ReauthMethod = "password" | "passkey";

export interface ReauthDialogLabels {
  title: string;
  description: string;
  password: string;
  confirm: string;
  usePasskey: string;
  usePassword: string;
  cancel: string;
  failed: string;
}

const reauthLabels: ReauthDialogLabels = {
  title: "Confirm it's you",
  description: "This action requires you to verify your identity.",
  password: "Password",
  confirm: "Confirm",
  usePasskey: "Use a passkey",
  usePassword: "Use password instead",
  cancel: "Cancel",
  failed: "Verification failed. Try again.",
};

export interface ReauthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Reject (or resolve false) to show the error state. */
  onReauth: (credential: { method: "password"; password: string } | { method: "passkey" }) => Promise<boolean | void>;
  /** Show the passkey option. */
  passkey?: boolean;
  labels?: Partial<ReauthDialogLabels>;
}

export function ReauthDialog({ open, onOpenChange, onReauth, passkey, labels }: ReauthDialogProps) {
  const l = { ...reauthLabels, ...labels };
  const [method, setMethod] = React.useState<ReauthMethod>(passkey ? "passkey" : "password");
  const [pw, setPw] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const id = React.useId();
  React.useEffect(() => {
    if (!open) {
      setPw("");
      setError(undefined);
    }
  }, [open]);

  const run = async () => {
    setBusy(true);
    setError(undefined);
    try {
      const ok = await onReauth(method === "password" ? { method, password: pw } : { method });
      if (ok === false) setError(l.failed);
      else onOpenChange(false);
    } catch {
      setError(l.failed);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={l.title}
        description={l.description}
        footer={
          <>
            <DialogClose asChild>
              <Button variant="secondary" size="sm">
                {l.cancel}
              </Button>
            </DialogClose>
            <Button size="sm" loading={busy} disabled={method === "password" && !pw} form={`${id}-f`} type="submit">
              {method === "passkey" ? l.usePasskey : l.confirm}
            </Button>
          </>
        }
      >
        <form
          id={`${id}-f`}
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!busy && (method === "passkey" || pw)) void run();
          }}
        >
          {method === "password" ? (
            <Field label={l.password} htmlFor={`${id}-pw`} error={error}>
              <Input id={`${id}-pw`} type="password" autoComplete="current-password" autoFocus value={pw} invalid={!!error} onChange={(e) => setPw(e.target.value)} />
            </Field>
          ) : (
            error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )
          )}
          {passkey && (
            <button
              type="button"
              className="justify-self-start border-0 bg-transparent p-0 text-sm text-primary hover:underline"
              onClick={() => {
                setError(undefined);
                setMethod(method === "password" ? "passkey" : "password");
              }}
            >
              {method === "password" ? l.usePasskey : l.usePassword}
            </button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ── 4.86 SessionExpiryDialog ── */
export interface SessionExpiryDialogLabels {
  title: string;
  remaining: (time: string) => string;
  stay: string;
  signOut: string;
  announce: (time: string) => string;
}

const expiryLabels: SessionExpiryDialogLabels = {
  title: "Your session is about to expire",
  remaining: (t) => `You will be signed out in ${t}.`,
  stay: "Stay signed in",
  signOut: "Sign out",
  announce: (t) => `Session expires in ${t}`,
};

export interface SessionExpiryDialogProps {
  /** Dialog is shown while the remaining time is within `warnBeforeMs` (default 5 min). */
  expiresAt: Time;
  warnBeforeMs?: number;
  onStay: () => void | Promise<void>;
  onSignOut: () => void;
  /** Called once when the countdown reaches zero. */
  onExpire?: () => void;
  labels?: Partial<SessionExpiryDialogLabels>;
}

export function SessionExpiryDialog({ expiresAt, warnBeforeMs = 300_000, onStay, onSignOut, onExpire, labels }: SessionExpiryDialogProps) {
  const l = { ...expiryLabels, ...labels };
  const { format } = useLaf();
  const target = new Date(expiresAt).getTime();
  const [now, setNow] = React.useState(() => Date.now());
  const expired = React.useRef(false);
  React.useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const left = Math.max(0, target - now);
  React.useEffect(() => {
    if (left > 0) expired.current = false;
    else if (!expired.current && now >= target) {
      expired.current = true;
      onExpire?.();
    }
  }, [left, now, target, onExpire]);
  const open = left <= warnBeforeMs;
  // Announce only at the 60 s and 10 s marks.
  const secs = Math.ceil(left / 1000);
  const mark = secs <= 10 ? 10 : secs <= 60 ? 60 : 0;
  const announcement = open && left > 0 && mark ? l.announce(format.duration(mark * 1000)) : "";

  return (
    <Dialog open={open} onOpenChange={() => undefined}>
      <DialogContent
        title={l.title}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={onSignOut}>
              {l.signOut}
            </Button>
            <Button size="sm" autoFocus onClick={() => void onStay()}>
              {l.stay}
            </Button>
          </>
        }
      >
        <p className="m-0">{l.remaining(format.duration(left))}</p>
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </DialogContent>
    </Dialog>
  );
}
