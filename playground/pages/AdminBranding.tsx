import * as React from "react";
import { BrandingEditor, type Branding } from "../../lib";

export default function AdminBranding() {
  const [b, setB] = React.useState<Branding>({ productName: "Shadow SSO", primary: "#54a2ff" });
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Branding</h2>
      <BrandingEditor value={b} onChange={setB} />
    </section>
  );
}
