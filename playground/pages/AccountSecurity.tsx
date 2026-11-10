import * as React from "react";
import { MfaEnrolment, ReauthDialog, SecurityFactors, SessionExpiryDialog, Button, type PasskeyItem } from "../../lib";

export default function AccountSecurity() {
  const [totp, setTotp] = React.useState(false);
  const [enrolling, setEnrolling] = React.useState(false);
  const [reauth, setReauth] = React.useState(false);
  const [passkeys, setPasskeys] = React.useState<PasskeyItem[]>([{ id: "p1", name: "MacBook Touch ID", createdAt: Date.now() - 40 * 86400_000, lastUsedAt: Date.now() - 86400_000 }]);
  const [expiresAt, setExpiresAt] = React.useState(() => Date.now() + 3600_000);

  if (enrolling)
    return (
      <MfaEnrolment
        qr={<span>QR</span>}
        secret="JBSWY3DPEHPK3PXP"
        recoveryCodes={["a1b2-c3d4", "e5f6-g7h8", "i9j0-k1l2", "m3n4-o5p6"]}
        onVerify={async (c) => c === "123456"}
        onRegisterPasskey={async () => undefined}
        onComplete={() => {
          setTotp(true);
          setEnrolling(false);
        }}
      />
    );
  return (
    <div className="grid max-w-2xl gap-4">
      <h2 className="m-0">Security</h2>
      <SecurityFactors
        password={{ changedAt: Date.now() - 90 * 86400_000, onChange: () => setReauth(true) }}
        totp={{ enabled: totp, onEnable: () => setEnrolling(true), onDisable: () => setTotp(false) }}
        passkeys={{
          items: passkeys,
          onAdd: () => setPasskeys((p) => [...p, { id: crypto.randomUUID(), name: "New passkey", createdAt: Date.now() }]),
          onRename: (id, name) => setPasskeys((p) => p.map((x) => (x.id === id ? { ...x, name } : x))),
          onRemove: (id) => setPasskeys((p) => p.filter((x) => x.id !== id)),
        }}
        recovery={{ remaining: 8, onRegenerate: async () => ["x1y2-z3a4", "b5c6-d7e8", "f9g0-h1i2", "j3k4-l5m6"] }}
      />
      <Button variant="secondary" size="sm" onClick={() => setExpiresAt(Date.now() + 70_000)}>
        Simulate session expiry
      </Button>
      <ReauthDialog open={reauth} onOpenChange={setReauth} passkey onReauth={async (c) => c.method === "passkey" || c.password === "secret"} />
      <SessionExpiryDialog expiresAt={expiresAt} onStay={() => setExpiresAt(Date.now() + 3600_000)} onSignOut={() => setExpiresAt(Date.now() + 3600_000)} />
    </div>
  );
}
