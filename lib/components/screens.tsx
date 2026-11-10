import { Fingerprint, KeyRound, Smartphone } from "lucide-react";
import * as React from "react";
import { cn } from "../cn";
import { Button } from "./button";
import { Badge } from "./display";
import { Input } from "./form";
import { OtpInput } from "./auth";
import { RadioGroup } from "./form";
import { SecretDisplay, Stepper } from "./helpers";
import { KeyValueEditor, TagInput, type KeyValue } from "./extras";
import { DefinitionList } from "./helpers";

/* ── MFA enrolment flow ── */
export type MfaMethod = "totp" | "passkey";

export interface MfaEnrolmentProps {
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

const defaultLabels = {
  method: "Choose method",
  scan: "Scan code",
  verify: "Verify",
  recovery: "Recovery codes",
  totp: "Authenticator app",
  passkey: "Passkey",
  next: "Next",
  back: "Back",
  finish: "Finish",
  invalid: "That code is not valid. Try again.",
  passkeyWaiting: "Waiting for your authenticator…",
  passkeyFailed: "Passkey registration failed.",
  stored: "I stored these codes",
};

export function MfaEnrolment({ qr, secret, recoveryCodes, onVerify, onRegisterPasskey, onComplete, labels }: MfaEnrolmentProps) {
  const l = { ...defaultLabels, ...labels };
  const [step, setStep] = React.useState(0);
  const [method, setMethod] = React.useState<MfaMethod>("totp");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState<string>();
  const [busy, setBusy] = React.useState(false);
  const [stored, setStored] = React.useState(false);

  const steps = [
    { id: "m", label: l.method },
    ...(method === "totp"
      ? [
          { id: "s", label: l.scan },
          { id: "v", label: l.verify },
        ]
      : [{ id: "p", label: l.passkey }]),
    { id: "r", label: l.recovery },
  ];
  const id = steps[step]!.id;

  const verify = async () => {
    setBusy(true);
    setError(undefined);
    try {
      if (await onVerify(code)) setStep(step + 1);
      else setError(l.invalid);
    } finally {
      setBusy(false);
    }
  };
  const register = async () => {
    setBusy(true);
    setError(undefined);
    try {
      await onRegisterPasskey?.();
      setStep(step + 1);
    } catch {
      setError(l.passkeyFailed);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[13rem_1fr]">
      <Stepper steps={steps} current={step} onStepClick={(i) => setStep(i)} />
      <div className="card">
        {id === "m" && (
          <RadioGroup
            name="mfa-method"
            value={method}
            onValueChange={(v) => setMethod(v as MfaMethod)}
            aria-label={l.method}
            options={[
              { value: "totp", label: l.totp },
              ...(onRegisterPasskey ? [{ value: "passkey", label: l.passkey }] : []),
            ]}
          />
        )}
        {id === "s" && (
          <div className="grid gap-4">
            <div className="mx-auto rounded-md bg-white p-3 text-black">{qr}</div>
            <SecretDisplay label="Manual secret" value={secret} acknowledgeLabel="I added it to my app" />
          </div>
        )}
        {id === "v" && (
          <div className="grid gap-3">
            <OtpInput value={code} onChange={setCode} onComplete={() => void 0} />
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
        {id === "p" && (
          <div className="grid gap-3 text-sm text-muted">
            <Fingerprint className="mx-auto size-8 text-primary" aria-hidden />
            <p role="status" className="text-center">
              {busy ? l.passkeyWaiting : ""}
            </p>
            {error && (
              <p className="field-error text-center" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
        {id === "r" && (
          <div className="grid gap-3">
            <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 font-mono text-sm text-fg">
              {recoveryCodes.map((c) => (
                <li key={c} className="rounded-sm border border-line bg-muted-bg px-2 py-1">
                  {c}
                </li>
              ))}
            </ul>
            <label className="check text-sm">
              <input type="checkbox" checked={stored} onChange={(e) => setStored(e.target.checked)} />
              {l.stored}
            </label>
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" size="sm" disabled={step === 0 || busy} onClick={() => setStep(step - 1)}>
            {l.back}
          </Button>
          {id === "v" ? (
            <Button size="sm" loading={busy} disabled={code.length < 6} onClick={verify}>
              {l.verify}
            </Button>
          ) : id === "p" ? (
            <Button size="sm" loading={busy} leftIcon={<KeyRound />} onClick={register}>
              {l.passkey}
            </Button>
          ) : id === "r" ? (
            <Button size="sm" disabled={!stored} onClick={onComplete}>
              {l.finish}
            </Button>
          ) : (
            <Button size="sm" onClick={() => setStep(step + 1)}>
              {l.next}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── OIDC client management ── */
export interface OidcClient {
  id: string;
  name: string;
  clientId: string;
  redirectUris: string[];
  scopes: string[];
  pkce: boolean;
  claimMappings: KeyValue[];
}

/** @deprecated Use the OIDC screens in `shadow-sso-accounts`. Removed in 0.2. */
export function OidcClientList({
  clients,
  selected,
  onSelect,
}: {
  clients: OidcClient[];
  selected?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
      {clients.map((c) => (
        <li key={c.id}>
          <button
            type="button"
            aria-current={selected === c.id ? "true" : undefined}
            onClick={() => onSelect(c.id)}
            className={cn("flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-start text-sm hover:bg-surface-hover", selected === c.id && "bg-primary-light")}
          >
            <Smartphone className="size-4 text-subtle" aria-hidden />
            <span className="flex-1 font-medium text-fg">{c.name}</span>
            {c.pkce && <Badge tone="ok">PKCE</Badge>}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** @deprecated Use the OIDC screens in `shadow-sso-accounts`. Removed in 0.2. */
export function OidcClientForm({
  client,
  onChange,
  onRotateSecret,
}: {
  client: OidcClient;
  onChange: (client: OidcClient) => void;
  onRotateSecret?: () => void;
}) {
  const set = (patch: Partial<OidcClient>) => onChange({ ...client, ...patch });
  const https = (t: string) => (/^https:\/\/|^http:\/\/localhost/.test(t) ? undefined : "Must be https:// (or http://localhost)");
  return (
    <div className="grid gap-5">
      <DefinitionList items={[{ label: "Client ID", value: client.clientId, mono: true, copy: client.clientId }]} />
      <div className="form-group">
        <label className="form-label" htmlFor={`${client.id}-name`}>
          Name
        </label>
        <Input id={`${client.id}-name`} value={client.name} onChange={(e) => set({ name: e.target.value })} />
      </div>
      <div className="form-group">
        <span className="form-label">Redirect URIs</span>
        <TagInput label="Redirect URIs" value={client.redirectUris} onChange={(v) => set({ redirectUris: v })} validate={https} />
      </div>
      <div className="form-group">
        <span className="form-label">Scopes</span>
        <TagInput label="Scopes" value={client.scopes} onChange={(v) => set({ scopes: v })} />
      </div>
      <label className="check text-sm">
        <input type="checkbox" checked={client.pkce} onChange={(e) => set({ pkce: e.target.checked })} />
        Require PKCE
      </label>
      <div className="form-group">
        <span className="form-label">Claim mappings</span>
        <KeyValueEditor value={client.claimMappings} onChange={(v) => set({ claimMappings: v })} addLabel="Add mapping" keyLabel="Claim" valueLabel="Source" />
      </div>
      {onRotateSecret && (
        <div>
          <Button variant="danger" size="sm" onClick={onRotateSecret}>
            Rotate client secret
          </Button>
        </div>
      )}
    </div>
  );
}
