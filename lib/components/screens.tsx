import { Fingerprint, KeyRound } from "lucide-react";
import * as React from "react";
import { useLaf } from "../i18n";
import { Button } from "./button";
import { OtpInput } from "./auth";
import { RadioGroup } from "./form";
import { SecretDisplay, Stepper } from "./helpers";

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

export function MfaEnrolment({ qr, secret, recoveryCodes, onVerify, onRegisterPasskey, onComplete, labels }: MfaEnrolmentProps) {
  const { t: laf } = useLaf();
  const l: MfaLabels = {
    method: laf.mfaMethod,
    scan: laf.mfaScan,
    verify: laf.mfaVerify,
    recovery: laf.mfaRecovery,
    totp: laf.mfaTotp,
    passkey: laf.mfaPasskey,
    next: laf.next,
    back: laf.back,
    finish: laf.finish,
    invalid: laf.mfaInvalid,
    passkeyWaiting: laf.mfaPasskeyWaiting,
    passkeyFailed: laf.mfaPasskeyFailed,
    stored: laf.mfaStored,
    manualSecret: laf.manualSecret,
    addedToApp: laf.addedToApp,
    download: "Download .txt",
    print: "Print",
    switchMethod: "Use a different method",
    genericError: "Something went wrong. Try again.",
    ...labels,
  };
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
    } catch {
      setError(l.genericError);
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

  const downloadCodes = () => {
    const url = URL.createObjectURL(new Blob([recoveryCodes.join("\n") + "\n"], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  const switchMethod = () => {
    setError(undefined);
    setCode("");
    setMethod(method === "totp" ? "passkey" : "totp");
    setStep(0);
  };
  const canSwitch = !!onRegisterPasskey && (id === "s" || id === "v" || id === "p");

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
            <SecretDisplay label={l.manualSecret} value={secret} acknowledgeLabel={l.addedToApp} />
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
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={downloadCodes}>
                {l.download}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => window.print()}>
                {l.print}
              </Button>
            </div>
            <label className="check text-sm">
              <input type="checkbox" checked={stored} onChange={(e) => setStored(e.target.checked)} />
              {l.stored}
            </label>
          </div>
        )}
        {canSwitch && (
          <button type="button" className="mt-3 border-0 bg-transparent p-0 text-sm text-primary hover:underline" disabled={busy} onClick={switchMethod}>
            {l.switchMethod}
          </button>
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
