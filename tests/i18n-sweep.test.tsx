import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert, Badge, Button, Card, Checkbox, DataGrid, EmptyState, Input, LafProvider, Pagination, Stat, Switch, Tabs, TabsContent, TabsList, TabsTrigger, en, type LafMessages } from "../lib";
import { hu } from "../lib/locales/hu";

// Deep-inflate every string by ~40% to emulate long translations.
const inflate = <T,>(v: T): T => {
  if (typeof v === "string") return (v + v.slice(0, Math.ceil(v.length * 0.4))) as T;
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, inflate(x)])) as T;
  return v;
};
const keys = (o: object, p = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" ? keys(v, `${p}${k}.`) : [`${p}${k}`]));

const sample = (
  <div>
    <Button>Save</Button>
    <Badge>New</Badge>
    <Input aria-label="name" />
    <Checkbox aria-label="c" />
    <Switch aria-label="s" />
    <Card>body</Card>
    <Alert>msg</Alert>
    <Stat label="CPU" value="42" />
    <EmptyState title="None" />
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">A</TabsTrigger>
      </TabsList>
      <TabsContent value="a">a</TabsContent>
    </Tabs>
    <Pagination page={1} pageCount={5} onPageChange={() => {}} />
    <DataGrid label="Rows" rows={[{ id: "1", n: "x" }]} columns={[{ id: "n", header: "N", cell: (r: { n: string }) => r.n }]} rowId={(r) => r.id} />
  </div>
);

describe("hu catalogue sweep (design §7.4)", () => {
  it("defines every English catalogue key, including per-component sets once translated", () => {
    const missing = keys(en).filter((k) => !keys(hu).includes(k));
    expect(missing).toEqual([]);
    expect(Object.keys(hu.components ?? {}).length).toBeGreaterThan(0);
  });
  it("renders key components with 40% longer hu strings without throwing", () => {
    const long = inflate(hu) as LafMessages;
    expect(() => render(<LafProvider locale="hu" messages={long}>{sample}</LafProvider>)).not.toThrow();
  });
  it("renders under dir=rtl", () => {
    const { container } = render(<div dir="rtl"><LafProvider locale="ar">{sample}</LafProvider></div>);
    expect(container.querySelector("[dir=rtl]")).not.toBeNull();
    expect(container.innerHTML).not.toMatch(/class="(?:[^"]* )?(?:[a-z0-9-]+:)*(?:m[lr]-|p[lr]-|text-left|text-right)/);
  });
});
