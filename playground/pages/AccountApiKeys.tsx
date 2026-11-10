import * as React from "react";
import { ApiKeyManager, type ApiKeyItem } from "../../lib";

const secretFor = () => `pk_live_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;

export default function AccountApiKeys() {
  const [keys, setKeys] = React.useState<ApiKeyItem[]>([
    { id: "k1", name: "CI deploy", prefix: "pk_…a1b2", scopes: ["read", "deploy"], createdAt: Date.now() - 20 * 86400_000, expiresAt: Date.now() + 70 * 86400_000, lastUsedAt: Date.now() - 3600_000 },
  ]);
  return (
    <div className="grid max-w-2xl gap-4">
      <h2 className="m-0">API keys</h2>
      <ApiKeyManager
        keys={keys}
        scopes={[{ value: "read" }, { value: "write" }, { value: "deploy" }]}
        onCreate={async (i) => {
          const secret = secretFor();
          setKeys((k) => [
            ...k,
            { id: crypto.randomUUID(), name: i.name, prefix: `pk_…${secret.slice(-4)}`, scopes: i.scopes, createdAt: Date.now(), expiresAt: i.expiresInDays ? Date.now() + i.expiresInDays * 86400_000 : null },
          ]);
          return { secret };
        }}
        onRotate={async () => ({ secret: secretFor() })}
        onRevoke={(id) => setKeys((k) => k.map((x) => (x.id === id ? { ...x, revoked: true } : x)))}
      />
    </div>
  );
}
