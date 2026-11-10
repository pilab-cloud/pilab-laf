import { Bell, Box, Settings, Wand2 } from "lucide-react";
import * as React from "react";
import {
  Button,
  DetailPage,
  ErrorPage,
  FormField,
  FormFooter,
  FormPage,
  FormSection,
  Input,
  LafErrorBoundary,
  MobileNav,
  SubNav,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TopBar,
  UnsavedChangesDialog,
  Wizard,
  WizardReview,
  useUnsavedChangesGuard,
  type SubNavGroup,
} from "../../lib";

const groups: SubNavGroup[] = [
  {
    id: "main",
    label: "Inventory",
    items: [
      { id: "detail", label: "Overview", icon: <Box aria-hidden className="size-4" /> },
      { id: "edit", label: "Edit settings", icon: <Settings aria-hidden className="size-4" /> },
      { id: "wizard", label: "New virtual machine", icon: <Wand2 aria-hidden className="size-4" /> },
      { id: "missing", label: "Missing page" },
    ],
  },
];

function EditForm({ onDone }: { onDone: () => void }) {
  const [name, setName] = React.useState("web-01");
  const [saved, setSaved] = React.useState("web-01");
  const [pending, setPending] = React.useState(false);
  const dirty = name !== saved;
  const guard = useUnsavedChangesGuard(dirty);
  const save = () => {
    setPending(true);
    setTimeout(() => {
      setSaved(name);
      setPending(false);
    }, 300);
  };
  return (
    <FormPage
      title="Edit settings"
      description="Change the virtual machine configuration."
      breadcrumb={[{ label: "Inventory", href: "#" }, { label: "web-01" }]}
      onSubmit={save}
      footer={
        <FormFooter saveType="submit" pending={pending} dirty={dirty} guard={guard} onCancel={onDone}>
          {dirty ? "Unsaved changes" : "All changes saved"}
        </FormFooter>
      }
    >
      <FormSection title="General" description="Identity of the machine.">
        <FormField label="Name">{(aria) => <Input {...aria} value={name} onChange={(e) => setName(e.target.value)} />}</FormField>
      </FormSection>
      <UnsavedChangesDialog guard={guard} />
    </FormPage>
  );
}

function CreateWizard() {
  const [name, setName] = React.useState("");
  const [note, setNote] = React.useState("");
  const [done, setDone] = React.useState(false);
  if (done) return <p role="status">Created {name}.</p>;
  return (
    <Wizard
      title="New virtual machine"
      dirty={name !== "" || note !== ""}
      onFinish={() => setDone(true)}
      steps={[
        {
          id: "name",
          label: "Name",
          validate: () => (name.trim() ? undefined : ["Name is required."]),
          render: () => <FormField label="Machine name">{(aria) => <Input {...aria} value={name} onChange={(e) => setName(e.target.value)} />}</FormField>,
        },
        {
          id: "note",
          label: "Notes",
          optional: true,
          render: () => <FormField label="Note">{(aria) => <Input {...aria} value={note} onChange={(e) => setNote(e.target.value)} />}</FormField>,
        },
        {
          id: "review",
          label: "Review",
          render: () => <WizardReview items={[{ label: "Name", value: name }, { label: "Note", value: note }]} />,
        },
      ]}
    />
  );
}

export default function AppShell() {
  const [view, setView] = React.useState("detail");
  const nav = <SubNav groups={groups} value={view} onSelect={setView} />;
  let content: React.ReactNode;
  if (view === "detail")
    content = (
      <DetailPage
        breadcrumb={[{ label: "Inventory", href: "#" }, { label: "web-01" }]}
        title="web-01"
        status={<span className="badge">Running</span>}
        actions={<Button variant="secondary" onClick={() => setView("edit")}>Edit</Button>}
        tabs={
          <Tabs defaultValue="summary">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="monitor">Monitor</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">Summary content</TabsContent>
            <TabsContent value="monitor">Monitor content</TabsContent>
          </Tabs>
        }
        side={<p className="text-sm text-muted">Related objects</p>}
      >
        <p className="text-sm">Main panel</p>
      </DetailPage>
    );
  else if (view === "edit") content = <EditForm onDone={() => setView("detail")} />;
  else if (view === "wizard") content = <CreateWizard />;
  else content = <ErrorPage variant="404" requestId="req-7f3a91" action={<Button onClick={() => setView("detail")}>Back to overview</Button>} />;

  return (
    <div className="min-h-screen bg-bg">
      <TopBar
        start={<MobileNav>{nav}</MobileNav>}
        logo="Pilab"
        search={<Input type="search" aria-label="Global search" placeholder="Search…" />}
        counters={[{ id: "alarms", label: "Alarms", count: 3, icon: <Bell aria-hidden className="size-4" /> }]}
      />
      <div className="flex gap-6 p-4">
        <div className="hidden min-[860px]:block">{nav}</div>
        <main className="min-w-0 flex-1">
          <LafErrorBoundary>{content}</LafErrorBoundary>
        </main>
      </div>
    </div>
  );
}
