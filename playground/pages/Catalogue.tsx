import {
  Activity,
  Cpu,
  Folder,
  Globe,
  Server,
  Settings,
  Box,
  Check,
  KeyRound,
  LayoutGrid,
  LogIn,
  MoreHorizontal,
  Search,
  ShieldAlert,
  Trash2,
  Users,
} from "lucide-react";
import * as React from "react";
import {
  AdminShell,
  Alert,
  Accordion,
  Banner,
  Chip,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  KeyValueEditor,
  LineChart,
  LogViewer,
  NumberInput,
  PermissionMatrix,
  Slider,
  Sparkline,
  SplitPane,
  TagInput,
  TenantSwitcher,
  TimeRangePicker,
  type KeyValue,
  AlarmList,
  BarChart,
  CodeEditor,
  DockedTaskPanel,
  OverflowTabs,
  TopologyGraph,
  DatePicker,
  Heatmap,
  StackedBarChart,
  DateTimeInput,
  Donut,
  ErrorSummary,
  FileDropzone,
  FormField,
  Gauge,
  InlineEdit,
  Kbd,
  type UploadFile,
  CommandPalette,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DiffView,
  TreeTable,
  MfaEnrolment,
  VirtualList,
  AccountItem,
  AccountList,
  AuditLog,
  AuthFooter,
  Avatar,
  BrandHeader,
  ClientInfo,
  CodeDisplay,
  CodeInput,
  Combobox,
  ConfirmDialog,
  CopyButton,
  DataGrid,
  DefinitionList,
  DeviceSteps,
  InfoBox,
  LanguageSwitcher,
  OtpInput,
  PasswordField,
  Progress,
  ScopeList,
  SecretDisplay,
  SocialButton,
  SocialButtons,
  SocialDivider,
  Spinner,
  Skeleton,
  Stepper,
  TaskPanel,
  ToastProvider,
  TreeView,
  UserMenu,
  useToast,
  type ComboboxOption,
  type GridSort,
  type TreeNode,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Device,
  DeviceSelector,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  Field,
  Input,
  NavGroup,
  NavLink,
  PageHead,
  Pagination,
  Panel,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  SearchInput,
  Select,
  Stat,
  StatGrid,
  Switch,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toolbar,
  Tooltip,
  TooltipProvider,
  User,
  UserCell,
  UserSelector,
} from "../../lib";

const USERS: User[] = [
  { id: "1", name: "Anna Kovács", email: "anna@pilab.hu" },
  { id: "2", name: "Béla Nagy", email: "bela@pilab.hu" },
  { id: "3", name: "Csilla Tóth", email: "csilla@example.com" },
  { id: "4", name: "Dénes Szabó", email: "denes@example.com" },
  { id: "5", name: "Ödön Őri", email: "odon@pilab.hu" },
];

const DEVICES: Device[] = [
  { id: "d1", name: "Pixel 9", detail: "Chrome · Android · 2 min ago", kind: "phone", badge: <Badge tone="primary">This device</Badge> },
  { id: "d2", name: "MacBook Pro", detail: "Safari · macOS · Budapest", kind: "laptop", badge: <Badge tone="ok">Trusted</Badge> },
  { id: "d3", name: "YubiKey 5C", detail: "Passkey · last used yesterday", kind: "key" },
  { id: "d4", name: "iPad", detail: "Safari · iPadOS · 3 days ago", kind: "tablet" },
];

const sections = [
  ["buttons", "Buttons"],
  ["forms", "Form fields"],
  ["menus", "Menus & popovers"],
  ["dialog", "Dialog"],
  ["pickers", "User & device selector"],
  ["feedback", "Alerts & badges"],
  ["data", "Table & pagination"],
  ["audit", "Audit log"],
  ["tabs", "Tabs & empty state"],
  ["studio", "Overflow tabs, topology, code editor, docked tasks"],
  ["loading", "Spinner, skeleton, progress"],
  ["toast", "Toast"],
  ["auth", "Auth components"],
  ["helpers", "Copy, password, properties, confirm"],
  ["wizard", "Stepper & MFA enrolment"],
  ["combo", "Combobox"],
  ["tree", "Tree view"],
  ["grid", "Data grid"],
  ["tasks", "Task panel"],
  ["usermenu", "User menu"],
  ["banner", "Banner & accordion"],
  ["layout", "Split pane & drawer"],
  ["inputs", "Number, slider, tags, key-value"],
  ["charts", "Charts & time range"],
  ["logs", "Log viewer"],
  ["rbac", "Tenant switcher & permissions"],
  ["more", "Kbd, inline edit, upload, alarms"],
  ["charts2", "Gauge, donut, bar"],
  ["formwire", "Form field wiring"],
  ["advanced", "Context menu, palette, tree table, diff"],
  ["screens", "MFA enrolment"],
  ["virtual", "Virtual list"],
] as const;

const TREE: TreeNode[] = [
  {
    id: "dc1",
    label: "Budapest DC",
    icon: <Globe />,
    children: [
      {
        id: "cl1",
        label: "Cluster A",
        icon: <Folder />,
        children: [
          { id: "h1", label: "esx-01.pilab.hu", icon: <Server />, badge: <Badge tone="ok" plain>on</Badge> },
          { id: "h2", label: "esx-02.pilab.hu", icon: <Server />, badge: <Badge tone="warn" plain>maint</Badge> },
        ],
      },
      { id: "cl2", label: "Cluster B", icon: <Folder />, children: [{ id: "h3", label: "esx-03.pilab.hu", icon: <Server /> }] },
    ],
  },
  { id: "dc2", label: "Debrecen DC", icon: <Globe /> },
];

const VMS = [
  { id: "vm1", name: "web-01", state: "running", cpu: 4, mem: 8 },
  { id: "vm2", name: "db-01", state: "running", cpu: 16, mem: 64 },
  { id: "vm3", name: "build-07", state: "stopped", cpu: 8, mem: 16 },
];

const FRUITS: ComboboxOption[] = ["Compute", "Storage", "Network", "Security", "Identity"].map((l) => ({ value: l.toLowerCase(), label: l }));

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Row>
      <Button variant="secondary" onClick={() => toast({ tone: "success", title: "Client saved" })}>Success</Button>
      <Button variant="secondary" onClick={() => toast({ tone: "error", title: "Could not reach host" })}>Error</Button>
      <Button variant="secondary" onClick={() => toast({ tone: "info", title: "VM powered off", action: { label: "Undo", onClick: () => {} } })}>With action</Button>
    </Row>
  );
}

function Demo({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-20">
      <h2 className="mb-3 border-b border-line pb-2 text-lg font-semibold text-fg">{title}</h2>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div>
      {label && <div className="mb-2 text-[0.6875rem] font-semibold tracking-wider text-subtle uppercase">{label}</div>}
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </div>
  );
}

export default function Catalogue() {
  const [pickedDate, setPickedDate] = React.useState<string>();
  const [tabVal, setTabVal] = React.useState("Summary");
  const [topoSel, setTopoSel] = React.useState<string>();
  const [code, setCode] = React.useState('{\n  "name": "web-01",\n  "cpus": 4,\n  "powered": true\n}');
  const [radio, setRadio] = React.useState("totp");
  const [device, setDevice] = React.useState("d1");
  const [picked, setPicked] = React.useState<User[]>([USERS[0]!]);
  const [page, setPage] = React.useState(2);
  const [single, setSingle] = React.useState<User[]>([]);
  const search = React.useCallback(
    async (q: string) =>
      USERS.filter((u) => (u.name + u.email).toLowerCase().includes(q.toLowerCase())),
    [],
  );

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [expanded, setExpanded] = React.useState(["dc1", "cl1"]);
  const [treeSel, setTreeSel] = React.useState("h1");
  const [combo, setCombo] = React.useState<ComboboxOption[]>([FRUITS[0]!]);
  const [sort, setSort] = React.useState<GridSort[]>([{ id: "name", dir: "asc" }]);
  const [rowsSel, setRowsSel] = React.useState<string[]>([]);
  const [otp, setOtp] = React.useState("");
  const [lang, setLang] = React.useState("en");
  const [mem, setMem] = React.useState(8192);
  const [memUnit, setMemUnit] = React.useState("MB");
  const [slide, setSlide] = React.useState(4);
  const [tags, setTags] = React.useState(["https://app.pilab.hu/cb"]);
  const [kv, setKv] = React.useState<KeyValue[]>([{ key: "ENV", value: "prod" }, { key: "ENV", value: "dup" }]);
  const [range, setRange] = React.useState("1h");
  const [refresh, setRefresh] = React.useState("off");
  const [tenant, setTenant] = React.useState("pilab");
  const [perms, setPerms] = React.useState<Record<string, string[]>>({ admin: ["vm.read", "vm.write", "user.read"], viewer: ["vm.read"] });
  const [banner, setBanner] = React.useState(true);
  const [vmName, setVmName] = React.useState("web-01");
  const [uploads, setUploads] = React.useState<UploadFile[]>([]);
  const [alarms, setAlarms] = React.useState([
    { id: "1", severity: "critical" as const, name: "Host connection lost", entity: "esx-02", triggered: "14:02" },
    { id: "2", severity: "warning" as const, name: "Datastore usage high", entity: "ds-02", triggered: "13:40" },
  ]);
  const [palette, setPalette] = React.useState(false);
  const bigList = React.useMemo(() => Array.from({ length: 20000 }, (_, i) => `vm-${String(i).padStart(5, "0")}`), []);
  const vms = React.useMemo(
    () => {
      const [first] = sort;
      return first ? [...VMS].sort((a, b) => String(a[first.id as "name"]).localeCompare(String(b[first.id as "name"]), undefined, { numeric: true }) * (first.dir === "asc" ? 1 : -1)) : VMS;
    },
    [sort],
  );

  return (
    <TooltipProvider>
      <ToastProvider>
      <AdminShell
        sidebar={
          <>
            <div className="admin-brand">
              <span className="brand-icon">
                <Box />
              </span>
              Pilab LAF
            </div>
            <NavGroup label="Components" />
            {sections.map(([id, label], i) => (
              <NavLink key={id} href={`#${id}`} icon={<LayoutGrid />} current={i === 0}>
                {label}
              </NavLink>
            ))}
          </>
        }
        topbar={
          <>
            <Breadcrumb label="Page path" items={[{ label: "Pilab", href: "#" }, { label: "Component playground" }]} />
            <div className="ml-auto flex items-center gap-3">
              <Tooltip content="Signed in as Anna">
                <button aria-label="AK: Anna Kovács (account)" className="border-0 bg-transparent p-0">
                  <Avatar name="Anna Kovács" />
                </button>
              </Tooltip>
            </div>
          </>
        }
      >
        <PageHead
          title="Components"
          description="Live, interactive kit — edit lib/ and the page hot-reloads."
          actions={<Button leftIcon={<Check />}>Primary action</Button>}
        />

        <Demo id="buttons" title="Buttons">
          <Row label="Variants">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger" leftIcon={<Trash2 />}>Danger</Button>
          </Row>
          <Row label="Sizes & states">
            <Button size="sm">Small</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Tooltip content="Search">
              <Button variant="secondary" size="sm" aria-label="Search">
                <Search />
              </Button>
            </Tooltip>
          </Row>
          <Row label="Auth layout (full width)">
            <Card className="w-full max-w-sm">
              <Button fullWidth>Sign in</Button>
              <div className="actions">
                <Button variant="secondary" fullWidth>Deny</Button>
                <Button fullWidth>Allow</Button>
              </div>
            </Card>
          </Row>
        </Demo>

        <Demo id="forms" title="Form fields">
          <div className="grid max-w-3xl gap-x-8 md:grid-cols-2">
            <div>
              <Field label="Email" htmlFor="f-email" hint="We never share it.">
                <Input id="f-email" type="email" placeholder="you@example.com" />
              </Field>
              <Field label="Invalid" htmlFor="f-bad" error="Enter a valid e-mail address.">
                <Input id="f-bad" invalid defaultValue="not-an-email" />
              </Field>
              <Field label="Role" htmlFor="f-role">
                <Select id="f-role" defaultValue="admin">
                  <option value="admin">Administrator</option>
                  <option value="viewer">Viewer</option>
                </Select>
              </Field>
              <Field label="Description" htmlFor="f-desc">
                <Textarea id="f-desc" rows={3} placeholder="Optional" />
              </Field>
            </div>
            <div className="flex flex-col gap-3">
              <Checkbox defaultChecked>Remember this device</Checkbox>
              <Switch defaultChecked>Require MFA</Switch>
              <RadioGroup
                name="mfa"
                aria-label="Second factor"
                value={radio}
                onValueChange={setRadio}
                options={[
                  { value: "totp", label: "Authenticator app", hint: "Recommended · works offline" },
                  { value: "passkey", label: "Passkey" },
                  { value: "email", label: "E-mail code" },
                  { value: "sms", label: "SMS", disabled: true },
                ]}
              />
              <p className="text-xs text-subtle">Selected: {radio}</p>
            </div>
          </div>
        </Demo>

        <Demo id="menus" title="Menus & popovers">
          <Row>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" rightIcon={<MoreHorizontal />}>
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>User</DropdownMenuLabel>
                <DropdownMenuItem>View profile</DropdownMenuItem>
                <DropdownMenuItem>Reset password</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem danger>Disable account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="sm">Popover</Button>
              </PopoverTrigger>
              <PopoverContent
                title="Session policy"
                footer={
                  <>
                    <PopoverClose asChild><Button variant="ghost" size="sm">Close</Button></PopoverClose>
                    <Button size="sm">Edit</Button>
                  </>
                }
              >
                Sessions expire after 8 hours of inactivity. MFA is required for admins.
              </PopoverContent>
            </Popover>
          </Row>
        </Demo>

        <Demo id="dialog" title="Dialog">
          <Row>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Rename device</Button>
              </DialogTrigger>
              <DialogContent
                title="Rename device"
                description="Choose a name you will recognise."
                footer={
                  <>
                    <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                    <DialogClose asChild><Button>Save</Button></DialogClose>
                  </>
                }
              >
                <Field label="Device name" htmlFor="d-name">
                  <Input id="d-name" defaultValue="Pixel 9" autoFocus />
                </Field>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="danger" leftIcon={<Trash2 />}>Sign out everywhere</Button>
              </DialogTrigger>
              <DialogContent
                role="alertdialog"
                title="Sign out everywhere?"
                description="All sessions will be revoked."
                footer={
                  <>
                    <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                    <DialogClose asChild><Button variant="danger">Revoke all</Button></DialogClose>
                  </>
                }
              >
                <Alert tone="warning">You will need to sign in again on every device.</Alert>
              </DialogContent>
            </Dialog>
          </Row>
        </Demo>

        <Demo id="pickers" title="User & device selector">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <Row label="User selector (multi)">
                <div className="w-full">
                  <UserSelector value={picked} onChange={setPicked} onSearch={search} max={3} />
                </div>
              </Row>
              <div className="mt-6" />
              <Row label="User selector (single)">
                <div className="w-full">
                  <UserSelector value={single} onChange={setSingle} onSearch={search} multiple placeholder="Assign to…" />
                </div>
              </Row>
            </div>
            <div>
              <Row label="Device selector">
                <div className="w-full">
                  <DeviceSelector name="dev" legend="Choose a device" devices={DEVICES} value={device} onValueChange={setDevice} />
                </div>
              </Row>
            </div>
          </div>
        </Demo>

        <Demo id="feedback" title="Alerts & badges">
          <div className="grid max-w-xl gap-2">
            <Alert tone="error">Invalid username or password.</Alert>
            <Alert tone="success">Your password was updated.</Alert>
            <Alert tone="warning">This code expires in 2 minutes.</Alert>
            <Alert tone="info">New sign-in policy applies on Monday.</Alert>
          </div>
          <Row label="Badges">
            <Badge tone="ok">Active</Badge>
            <Badge tone="warn">Pending</Badge>
            <Badge tone="danger">Locked</Badge>
            <Badge tone="primary">Admin</Badge>
            <Badge>Neutral</Badge>
            <Badge plain>No dot</Badge>
          </Row>
          <StatGrid>
            <Stat label="Active users" value="12,480" delta="▲ 4.2%" />
            <Stat label="Failed logins" value="318" delta="▼ 12%" down />
            <Stat label="MFA coverage" value="87%" delta="▲ 2 pts" />
          </StatGrid>
        </Demo>

        <Demo id="data" title="Table & pagination">
          <Panel title="Users" bodyClassName="p-0!">
            <div className="p-4 pb-0">
              <Toolbar>
                <SearchInput icon={<Search />} placeholder="Search users" aria-label="Search users" />
                <Select aria-label="Status" className="w-40">
                  <option>All statuses</option>
                  <option>Active</option>
                </Select>
                <Button size="sm" leftIcon={<Users />}>Invite</Button>
              </Toolbar>
            </div>
            <Table>
              <thead>
                <tr><th>User</th><th>ID</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr>
              </thead>
              <tbody>
                {USERS.slice(0, 4).map((u, i) => (
                  <tr key={u.id}>
                    <td><UserCell name={u.name} email={u.email} /></td>
                    <td className="mono">usr_{(1000 + i * 37).toString(16)}</td>
                    <td><Badge tone={i === 2 ? "warn" : "ok"}>{i === 2 ? "Pending" : "Active"}</Badge></td>
                    <td className="cell-actions">
                      <Tooltip content="More">
                        <Button variant="ghost" size="sm" aria-label="More actions"><MoreHorizontal /></Button>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="px-4 pb-4">
              <Pagination page={page} pageCount={12} total={312} pageSize={25} onPageChange={setPage} />
            </div>
          </Panel>
        </Demo>

        <Demo id="audit" title="Audit log">
          <AuditLog
            events={[
              { id: "a", day: "Today", time: "14:32", severity: "ok", icon: <LogIn />, actor: "Anna Kovács", action: "signed in", target: "Budapest · 84.2.17.9", result: "Success", details: { "Request ID": "req_8f21c0", "User agent": "Chrome 131 / macOS", Tenant: "pilab" } },
              { id: "b", day: "Today", time: "13:05", severity: "danger", icon: <ShieldAlert />, actor: "Unknown", action: "failed sign-in ×5", target: "bela@pilab.hu · 185.3.4.1", result: "Locked", details: { Reason: "invalid_password", Attempts: "5" } },
              { id: "c", day: "Yesterday", time: "17:48", severity: "warn", icon: <KeyRound />, actor: "Csilla Tóth", action: "reset password", target: "via e-mail link", result: "Warning" },
              { id: "d", day: "Yesterday", time: "09:12", severity: "neutral", icon: <Activity />, actor: "system", action: "rotated signing keys" },
            ]}
          />
        </Demo>

        <Demo id="tabs" title="Tabs & empty state">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"><p className="text-sm text-muted">Overview content.</p></TabsContent>
            <TabsContent value="sessions"><p className="text-sm text-muted">3 active sessions.</p></TabsContent>
            <TabsContent value="security">
              <Alert tone="warning">Passkeys are not enrolled.</Alert>
            </TabsContent>
          </Tabs>
          <Panel>
            <EmptyState
              icon={<Users />}
              title="No users yet"
              description="Invite your first teammate to get started."
              action={<Button size="sm">Invite user</Button>}
            />
          </Panel>
        </Demo>
        <Demo id="loading" title="Spinner, skeleton, progress">
          <Row label="Spinner">
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" />
          </Row>
          <Row label="Skeleton">
            <div className="grid w-64 gap-2">
              <Skeleton />
              <Skeleton className="w-2/3" />
            </div>
          </Row>
          <div className="grid max-w-md gap-3">
            <Progress label="Upload" value={45} />
            <Progress label="Indeterminate" />
            <Progress meter label="Datastore ok" value={40} />
            <Progress meter label="Datastore warn" value={78} />
            <Progress meter label="Datastore full" value={95} />
          </div>
        </Demo>

        <Demo id="toast" title="Toast">
          <ToastDemo />
        </Demo>

        <Demo id="auth" title="Auth components">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <BrandHeader icon={<KeyRound />} name="Shadow SSO" title="Sign in" subtitle="Continue to Pilab" />
              <SocialButtons>
                <SocialButton href="#auth" icon={<Globe />}>Continue with GitHub</SocialButton>
              </SocialButtons>
              <SocialDivider>or continue with</SocialDivider>
              <AccountList>
                <AccountItem name="Anna Kovács" email="anna@pilab.hu" />
                <AccountItem name="Béla Nagy" email="bela@pilab.hu" />
              </AccountList>
              <InfoBox title="Password rules" items={["At least 12 characters", "Not used before"]} />
              <LanguageSwitcher current={lang} languages={[{ code: "en", label: "English", href: "#auth" }, { code: "hu", label: "Magyar", href: "#auth" }]} />
              <AuthFooter>Protected by Shadow SSO</AuthFooter>
            </div>
            <div className="card">
              <ClientInfo name="Pirat CLI" description="wants access to your account" />
              <ScopeList scopes={[{ id: "p", description: "Read your profile" }, { id: "e", description: "See your e-mail address" }]} />
              <DeviceSteps current={1} steps={["Open the app", "Enter the code", "Approve"]} />
              <CodeInput placeholder="ABCD-EFGH" aria-label="Device code" />
              <div className="mt-3"><CodeDisplay code="WDJB-MJHT" /></div>
              <div className="mt-3"><OtpInput value={otp} onChange={setOtp} /></div>
            </div>
          </div>
        </Demo>

        <Demo id="helpers" title="Copy, password, properties, confirm">
          <Row label="Copy button"><code className="font-mono text-sm">vm-0042</code><CopyButton value="vm-0042" /></Row>
          <div className="max-w-sm"><PasswordField placeholder="Password" aria-label="Password" /></div>
          <DefinitionList items={[{ label: "Name", value: "web-01" }, { label: "UUID", value: "5021-ab31-77c0", mono: true, copy: "5021-ab31-77c0" }, { label: "Guest OS", value: "Debian 12" }, { label: "Notes" }]} />
          <Row>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete 2 VMs…</Button>
            <ConfirmDialog
              open={confirmOpen}
              onOpenChange={setConfirmOpen}
              title="Delete 2 VMs?"
              description="This permanently removes the machines and their disks."
              items={["web-01", "db-01"]}
              confirmText="delete"
              confirmLabel="Delete 2 VMs"
              onConfirm={() => setConfirmOpen(false)}
            />
          </Row>
        </Demo>

        <Demo id="wizard" title="Stepper & MFA enrolment">
          <div className="grid gap-6 md:grid-cols-[14rem_1fr]">
            <Stepper
              current={step}
              onStepClick={setStep}
              steps={[{ id: "m", label: "Choose method" }, { id: "q", label: "Scan code" }, { id: "v", label: "Verify" }, { id: "r", label: "Recovery codes" }]}
            />
            <div className="card">
              {step === 0 && <RadioGroup name="mfa" value={radio} onValueChange={setRadio} options={[{ value: "totp", label: "Authenticator app" }, { value: "key", label: "Passkey" }]} />}
              {step === 1 && <SecretDisplay label="Manual secret" value="JBSWY3DPEHPK3PXP" acknowledgeLabel="I added it to my app" />}
              {step === 2 && <OtpInput value={otp} onChange={setOtp} />}
              {step === 3 && <SecretDisplay label="Recovery code" value="7F3K-92QD-LM0A" acknowledgeLabel="I stored these codes" />}
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
                <Button size="sm" disabled={step === 3} onClick={() => setStep(step + 1)}>Next</Button>
              </div>
            </div>
          </div>
        </Demo>

        <Demo id="combo" title="Combobox">
          <div className="grid max-w-md gap-4">
            <Combobox label="Categories" multiple options={FRUITS} value={combo} onChange={setCombo} placeholder="Pick categories…" />
          </div>
        </Demo>

        <Demo id="tree" title="Tree view">
          <Panel>
            <TreeView label="Inventory" nodes={TREE} expanded={expanded} onExpandedChange={setExpanded} selected={treeSel} onSelect={setTreeSel} />
          </Panel>
        </Demo>

        <Demo id="grid" title="Data grid">
          <DataGrid
            label="Virtual machines"
            rows={vms}
            rowId={(r) => r.id}
            sort={sort}
            onSortChange={setSort}
            selected={rowsSel}
            onSelectedChange={setRowsSel}
            columns={[
              { id: "name", header: "Name", sortable: true, cell: (r) => r.name },
              { id: "state", header: "State", sortable: true, cell: (r) => <Badge tone={r.state === "running" ? "ok" : "neutral"}>{r.state}</Badge> },
              { id: "cpu", header: "vCPU", numeric: true, sortable: true, cell: (r) => r.cpu },
              { id: "mem", header: "Mem (GB)", numeric: true, sortable: true, cell: (r) => r.mem },
            ]}
          />
          <DataGrid label="Empty grid" rows={[]} rowId={() => ""} columns={[{ id: "n", header: "Name", cell: () => null }]} empty={<EmptyState title="No VMs" description="Create your first VM." />} />
          <DataGrid label="Loading grid" loading rows={[]} rowId={() => ""} columns={[{ id: "n", header: "Name", cell: () => null }, { id: "s", header: "State", cell: () => null }]} />
        </Demo>

        <Demo id="tasks" title="Task panel">
          <TaskPanel
            onCancel={() => {}}
            onRetry={() => {}}
            tasks={[
              { id: "t1", name: "Clone VM", target: "web-01", initiator: "anna", started: "14:02", status: "running", progress: 62 },
              { id: "t2", name: "Migrate VM", target: "db-01", initiator: "system", started: "13:40", status: "failed", error: "Target host has insufficient memory" },
              { id: "t3", name: "Power on", target: "build-07", initiator: "béla", started: "13:10", status: "ok" },
            ]}
          />
        </Demo>

        <Demo id="studio" title="Overflow tabs, topology, code editor, docked tasks">
          <Tabs value={tabVal} onValueChange={setTabVal}>
            <OverflowTabs maxVisible={3} onSelect={setTabVal} tabs={["Summary", "Monitor", "Configure", "Permissions", "Datastores", "Networks"].map((l) => ({ value: l, label: l }))} />
            {["Summary", "Monitor", "Configure", "Permissions", "Datastores", "Networks"].map((l) => (
              <TabsContent key={l} value={l} className="sr-only">{l} panel</TabsContent>
            ))}
          </Tabs>
          <p className="text-sm text-muted">Selected: {tabVal}</p>
          <TopologyGraph label="Network topology" selectedId={topoSel} onSelect={setTopoSel} nodes={[{ id: "sw", label: "vSwitch0", x: 240, y: 40 }, { id: "a", label: "esx-01", x: 100, y: 150, tone: "ok" }, { id: "b", label: "esx-02", x: 240, y: 150, tone: "warn" }, { id: "c", label: "esx-03", x: 380, y: 150, tone: "danger" }]} edges={[{ from: "sw", to: "a" }, { from: "sw", to: "b" }, { from: "sw", to: "c" }]} />
          <div className="max-w-xl"><CodeEditor label="VM spec" value={code} onChange={setCode} rows={6} /></div>
          <div className="relative h-40 overflow-hidden rounded-lg border border-line">
            <DockedTaskPanel defaultOpen tasks={[{ id: "d1", name: "Clone VM", target: "web-01", status: "running", progress: 40 }]} />
          </div>
        </Demo>

        <Demo id="usermenu" title="User menu">
          <Row>
            <UserMenu name="Anna Kovács" email="anna@pilab.hu" tenant="pilab" onSignOut={() => {}} items={[{ id: "s", label: "Settings", icon: <Settings />, onSelect: () => {} }, { id: "c", label: "Sessions", icon: <Cpu />, onSelect: () => {} }]} />
          </Row>
        </Demo>
        <Demo id="banner" title="Banner & accordion">
          {banner && (
            <Banner tone="warn" onDismiss={() => setBanner(false)} action={<a className="font-medium underline" href="#banner">Renew</a>}>
              Licence expires in 5 days.
            </Banner>
          )}
          <Banner tone="danger">Cluster A is degraded.</Banner>
          <Banner>Maintenance window tonight 22:00.</Banner>
          <Accordion defaultOpen={["a"]} items={[{ id: "a", title: "Hardware", content: "16 cores, 64 GB" }, { id: "b", title: "Networking", content: "2 NICs" }]} />
        </Demo>

        <Demo id="layout" title="Split pane & drawer">
          <SplitPane className="h-40" start={<div className="p-3 text-sm text-muted">Inventory</div>} end={<div className="p-3 text-sm text-muted">Details — drag or use ←/→ on the handle.</div>} />
          <Row>
            <Drawer>
              <DrawerTrigger asChild><Button variant="secondary">Open drawer</Button></DrawerTrigger>
              <DrawerContent title="Edit settings" description="Changes apply immediately." footer={<DrawerClose asChild><Button size="sm">Done</Button></DrawerClose>}>
                Drawer content.
              </DrawerContent>
            </Drawer>
          </Row>
        </Demo>

        <Demo id="inputs" title="Number, slider, tags, key-value">
          <Row label="Number + unit">
            <NumberInput label="Memory" value={mem} onChange={setMem} min={512} max={1048576} step={512} unit={memUnit} onUnitChange={setMemUnit} units={[{ label: "MB", factor: 1 }, { label: "GB", factor: 1024 }]} />
          </Row>
          <div className="max-w-sm"><Slider aria-label="vCPU" min={1} max={16} value={slide} onChange={(e) => setSlide(Number(e.target.value))} /><span className="font-mono text-sm text-muted">{slide} vCPU</span></div>
          <Row label="Chips"><Chip>Compute</Chip><Chip onRemove={() => {}}>Removable</Chip></Row>
          <div className="max-w-md"><TagInput label="Redirect URIs" value={tags} onChange={setTags} placeholder="Add URI…" validate={(t) => (t.startsWith("https://") ? undefined : "Must start with https://")} /></div>
          <div className="max-w-xl"><KeyValueEditor value={kv} onChange={setKv} addLabel="Add attribute" /></div>
        </Demo>

        <Demo id="charts" title="Charts & time range">
          <TimeRangePicker value={range} onChange={setRange} refresh={refresh} onRefreshChange={setRefresh} />
          <Panel title="CPU & memory">
            <LineChart label="Host load" unit="%" xLabels={["10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30"]} series={[{ name: "CPU", data: [20, 35, 30, 55, 48, 70, 62] }, { name: "Memory", data: [40, 42, 45, 44, 50, 52, 58] }]} />
          </Panel>
          <Row label="Sparkline"><Sparkline label="Trend" data={[3, 5, 4, 8, 6, 9, 12]} /></Row>
        </Demo>

        <Demo id="logs" title="Log viewer">
          <LogViewer label="Host log" lines={[{ time: "10:00:01", level: "info", text: "hostd started" }, { time: "10:00:07", level: "warn", text: "datastore ds-02 latency 48ms" }, { time: "10:00:09", level: "error", text: "vmx: failed to open disk /vmfs/volumes/ds-02/db-01.vmdk" }]} />
        </Demo>

        <Demo id="rbac" title="Tenant switcher & permissions">
          <div className="max-w-xs"><TenantSwitcher current={tenant} onSwitch={setTenant} tenants={[{ value: "pilab", label: "Pilab" }, { value: "acme", label: "Acme Corp" }]} /></div>
          <PermissionMatrix
            roles={[{ id: "admin", label: "Admin" }, { id: "viewer", label: "Viewer" }]}
            groups={[{ id: "vm", label: "Virtual machines", permissions: [{ id: "vm.read", label: "View" }, { id: "vm.write", label: "Modify" }] }, { id: "user", label: "Users", permissions: [{ id: "user.read", label: "View" }] }]}
            value={perms}
            onChange={setPerms}
          />
        </Demo>
        <Demo id="more" title="Kbd, inline edit, upload, alarms">
          <Row label="Kbd"><span className="text-sm text-muted">Open palette <Kbd>⌘</Kbd> <Kbd>K</Kbd></span></Row>
          <Row label="Inline edit"><InlineEdit label="VM name" value={vmName} onSave={setVmName} validate={(v) => (v.trim() ? undefined : "Name is required")} /></Row>
          <div className="max-w-md">
            <FileDropzone
              files={uploads}
              maxSize={5_000_000}
              onFiles={(fs) => setUploads((u) => [...u, ...fs.map((f) => ({ id: f.name + f.size, name: f.name, size: f.size, progress: 100 }))])}
              onRemove={(id) => setUploads((u) => u.filter((f) => f.id !== id))}
            />
          </div>
          <AlarmList alarms={alarms} onAcknowledge={(id) => setAlarms((a) => a.map((x) => (x.id === id ? { ...x, acknowledged: true } : x)))} />
        </Demo>

        <Demo id="charts2" title="Gauge, donut, bar">
          <Row>
            <Gauge label="CPU" value={42} />
            <Gauge label="Memory" value={78} />
            <Gauge label="Disk" value={95} />
            <Donut label="VM states" slices={[{ name: "Running", value: 18 }, { name: "Stopped", value: 5 }, { name: "Suspended", value: 2 }]} />
          </Row>
          <div className="max-w-md"><BarChart label="VMs per host" data={[{ name: "esx-01", value: 12 }, { name: "esx-02", value: 7 }, { name: "esx-03", value: 4 }]} /></div>
          <div className="max-w-md"><StackedBarChart label="CPU by state" series={["User", "System", "Idle"]} data={[{ name: "esx-01", values: [40, 20, 40] }, { name: "esx-02", values: [20, 10, 70] }]} /></div>
          <Heatmap label="Load" rows={["esx-01", "esx-02"]} columns={["00", "06", "12", "18"]} values={[[1, 4, 9, 6], [0, 2, 3, 8]]} />
          <Row><DatePicker label="Start date" value={pickedDate} onChange={setPickedDate} /></Row>
          <Breadcrumb maxItems={3} items={[{ label: "DC", href: "#" }, { label: "Cluster", href: "#" }, { label: "Host", href: "#" }, { label: "VM", href: "#" }, { label: "Disk" }]} />
        </Demo>

        <Demo id="formwire" title="Form field wiring">
          <div className="max-w-sm grid gap-3">
            <ErrorSummary errors={[{ id: "fw-date", message: "Date is required" }]} />
            <FormField id="fw-date" label="Start" description="UTC" error="Date is required">
              {(a) => <DateTimeInput {...a} mode="datetime-local" />}
            </FormField>
          </div>
        </Demo>
        <Demo id="advanced" title="Context menu, palette, tree table, diff">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-20 items-center justify-center rounded-md border border-dashed border-line-strong text-sm text-muted">Right-click here</ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Power on</ContextMenuItem>
              <ContextMenuItem>Clone…</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem danger>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <Row>
            <Button variant="secondary" onClick={() => setPalette(true)}>Open palette <Kbd>⌘K</Kbd></Button>
            <CommandPalette open={palette} onOpenChange={setPalette} commands={[{ id: "1", label: "Create VM", group: "Actions", onSelect: () => {} }, { id: "2", label: "Go to Hosts", group: "Navigate", shortcut: "G H", onSelect: () => {} }]} />
          </Row>
          <TreeTable
            label="Snapshots"
            columns={[{ id: "n", header: "Name", cell: (r: { n: string; d: string }) => r.n }, { id: "d", header: "Created", cell: (r: { n: string; d: string }) => r.d }]}
            nodes={[{ id: "s1", data: { n: "baseline", d: "2026-10-01" }, children: [{ id: "s2", data: { n: "pre-upgrade", d: "2026-10-20" } }] }]}
          />
          <DiffView label="Config diff" before={"cpu: 4\nmem: 8192\nnet: vmxnet3"} after={"cpu: 8\nmem: 8192\nnet: e1000"} />
        </Demo>
        <Demo id="screens" title="MFA enrolment">
          <MfaEnrolment
            qr={<div className="grid size-32 place-items-center text-xs">QR placeholder</div>}
            secret="JBSWY3DPEHPK3PXP"
            recoveryCodes={["7F3K-92QD", "LM0A-55XZ", "Q8RT-10PB", "ZZ4C-7HHN"]}
            onVerify={async (c) => c === "123456"}
            onRegisterPasskey={async () => {}}
            onComplete={() => {}}
          />
        </Demo>

        <Demo id="virtual" title="Virtual list">
          <VirtualList label="20 000 VMs" items={bigList} rowHeight={28} height={224} className="rounded-md border border-line" renderRow={(v, i) => <div className="px-3 py-1 font-mono text-sm text-muted">{i + 1}. {v}</div>} />
        </Demo>
      </AdminShell>
      </ToastProvider>
    </TooltipProvider>
  );
}
