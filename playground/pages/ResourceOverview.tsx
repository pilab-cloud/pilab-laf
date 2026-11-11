import { Camera, CircleAlert, CircleHelp, Cloud, Database, Info, Mail, Monitor, Network, Server, Users } from "lucide-react";
import * as React from "react";
import {
  ActionToolbar,
  AppFooter,
  AppFrame,
  Badge,
  CountCard,
  DetailsCard,
  IdentityCard,
  Masthead,
  MastheadActions,
  MastheadBrand,
  MastheadContent,
  MastheadToggle,
  ObjectHeader,
  PowerState,
  RelativeTime,
  ResourceOverviewLayout,
  SideCard,
  Sidebar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ThemeToggle,
  Tooltip,
  TooltipProvider,
  UserMenu,
  UtilizationColumn,
  UtilizationPanel,
  type NavEntry,
  type ToolbarAction,
} from "../../lib";

const USER = { name: "Paál Gyula", email: "gyula@pilab.hu", src: "/paalgyula.jpg" };
const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);
const HOUR = 3_600_000;

/** Deterministic 7-day trend with a late bump, like the oVirt mock-up. */
const trend = (seed: number, base: number) => Array.from({ length: 28 }, (_, i) => Math.round((base + (i > 18 ? 18 : 0) + 8 * Math.sin(i / 2 + seed) + (i % 5) * 1.5) * 10) / 10);

const nav: NavEntry[] = [
  { id: "vms", label: "Virtual machines", icon: <Monitor aria-hidden />, current: true, onSelect: () => {} },
  { id: "hosts", label: "Hosts", icon: <Server aria-hidden />, onSelect: () => {} },
  { id: "mail", label: "Mailboxes", icon: <Mail aria-hidden />, onSelect: () => {} },
];

function WindowsLogo() {
  return (
    <svg viewBox="0 0 88 88" fill="currentColor" aria-hidden>
      <path d="M0 12.4 35.7 7.6v34.5H0zM40 7l48-7v42H40zM0 46h35.7v34.6L0 75.7zM40 46h48v42l-48-7z" />
    </svg>
  );
}

const Off = () => (
  <span className="inline-flex items-center gap-1.5">
    <CircleAlert aria-hidden className="size-4 text-danger" />
    Off
  </span>
);

const link = (text: string, onClick: () => void) => (
  <button type="button" onClick={onClick} className="border-0 bg-transparent p-0 text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-primary">
    {text}
  </button>
);

function Snapshot({ name, hoursAgo }: { name: string; hoursAgo: number }) {
  return (
    <span className="flex items-center gap-2">
      <span className="min-w-0 flex-1">
        <strong>{name}</strong> <span className="text-muted">(<RelativeTime value={NOW - hoursAgo * HOUR} />)</span>
      </span>
      <Tooltip content={`${name}: memory not included`}>
        <button type="button" aria-label={`${name} details`} className="inline-flex border-0 bg-transparent p-0 text-muted outline-none focus-visible:outline-2 focus-visible:outline-primary">
          <Info aria-hidden className="size-4" />
        </button>
      </Tooltip>
    </span>
  );
}

function VmPage({ onAction }: { onAction: (text: string) => void }) {
  const say = (text: string) => () => onAction(text);
  const actions: ToolbarAction[] = [
    {
      id: "console",
      label: "Console",
      onClick: say("Console opened"),
      menu: [
        { id: "rdp", label: "Graphical (RDP)", onSelect: say("Console: Graphical (RDP)") },
        { id: "vnc", label: "Graphical (VNC)", onSelect: say("Console: Graphical (VNC)") },
        { id: "serial", label: "Serial (SPICE)", onSelect: say("Console: Serial (SPICE)") },
      ],
    },
    { id: "suspend", label: "Suspend", onClick: say("Suspend requested") },
    { id: "reboot", label: "Reboot", onClick: say("Reboot requested"), menu: [{ id: "force", label: "Force Reboot", onSelect: say("Force reboot requested") }] },
    { id: "shutdown", label: "Shutdown", variant: "primary", onClick: say("Shutdown requested"), menu: [{ id: "poweroff", label: "Power off", danger: true, onSelect: say("Power off requested") }] },
  ];
  return (
    <>
      <ObjectHeader breadcrumb={[{ label: "Virtual Machines", href: "#", onClick: (e) => e.preventDefault() }]} title="0000VDSMPY3" onSwitch={say("Switch VM")} actions={<ActionToolbar actions={actions} label="Virtual machine actions" />} />
      <div className="p-4 sm:p-6">
        <ResourceOverviewLayout
          identity={
            <IdentityCard
              icon={<WindowsLogo />}
              name="0000VDSMPY3"
              ribbon="Windows 10"
              status={<PowerState state="on" />}
              description="Here is the VM description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, purus vel vehicula euismod, magna ex sagittis elit, et fringilla turpis neque ut lorem. In auctor mi non urna sagittis, sit amet efficitur tortor volutpat."
              onEdit={say("Edit VM")}
            />
          }
          details={
            <DetailsCard
              onEdit={say("Edit details")}
              items={[
                { label: "Status", value: <PowerState state="on" label="Running" />, sub: "97% uptime last 7 days" },
                { label: "Host", value: "Host 1" },
                { label: "IP Address", value: "10.9.62.122" },
                { label: "FQDN", value: "Hostname.domainname" },
                { label: "Cluster", value: "Cluster 1" },
                { label: "Data Center", value: "Data Center 1" },
                { label: "Template", value: "Blank" },
                { label: "CD", value: "Empty" },
                { label: "Cloud-Init", value: <Off /> },
                { label: "Boot Menu", value: <Off /> },
                {
                  label: "Console",
                  value: (
                    <span className="inline-flex items-center gap-2">
                      {link("SPICE", say("Console: SPICE"))}
                      <span aria-hidden className="text-subtle">
                        |
                      </span>
                      {link("RDP", say("Console: RDP"))}
                    </span>
                  ),
                },
              ]}
            />
          }
          aside={
            <>
              <CountCard
                title="Snapshots"
                icon={<Camera />}
                onEdit={say("Edit snapshots")}
                items={[
                  { id: "active", content: <strong>Active VM</strong> },
                  { id: "def", content: <Snapshot name="Snapshot_def" hoursAgo={6} /> },
                  { id: "abc", content: <Snapshot name="Snapshot_abc" hoursAgo={24} /> },
                ]}
                count={3}
              />
              <CountCard title="Network Interfaces" icon={<Network />} onEdit={say("Edit network interfaces")} items={[{ id: "nic1", content: <>nic 1 ({link("ovirtmgmt/ovirtmgmt", say("Open network"))})</> }]} />
              <CountCard title="Disks" icon={<Database />} onEdit={say("Edit disks")} items={[]} empty="No disks attached" />
            </>
          }
          utilization={
            <UtilizationPanel>
              <UtilizationColumn title="CPU" available={50} capacity="1000 MHz" used={95} history={trend(1, 40)} formatValue={(v) => `${v}%`} />
              <UtilizationColumn title="Memory" available={77} capacity="102 GB" used={25} centerText="25" centerSubtext="GB Used" max={102} history={trend(2, 30)} formatValue={(v) => `${v} GB`} />
              <UtilizationColumn title="Networking" available={25} capacity="100 Mbps" used={75} history={trend(3, 45)} formatValue={(v) => `${v} Mbps`} />
              <UtilizationColumn title="Disk" available={24} capacity="32 GB" used={8} max={32} centerText="8" centerSubtext="GB Used" history={trend(4, 25)} formatValue={(v) => `${v} GB`} />
            </UtilizationPanel>
          }
        />
      </div>
    </>
  );
}

function MailboxPage({ onAction }: { onAction: (text: string) => void }) {
  const say = (text: string) => () => onAction(text);
  const actions: ToolbarAction[] = [
    {
      id: "reset",
      label: "Reset password",
      menu: [
        { id: "link", label: "Send reset link", onSelect: say("Reset link sent") },
        { id: "temp", label: "Generate temporary password", onSelect: say("Temporary password generated") },
      ],
      onClick: say("Reset password requested"),
    },
    { id: "export", label: "Export mailbox", onClick: say("Export started") },
    { id: "suspend", label: "Suspend", variant: "primary", onClick: say("Suspend requested"), menu: [{ id: "delete", label: "Delete mailbox", danger: true, onSelect: say("Delete requested") }] },
  ];
  return (
    <>
      <ObjectHeader breadcrumb={[{ label: "Mail", href: "#", onClick: (e) => e.preventDefault() }, { label: "Mailboxes", href: "#", onClick: (e) => e.preventDefault() }]} title="gyula@pilab.hu" onSwitch={say("Switch mailbox")} switchLabel="Compare mailbox" actions={<ActionToolbar actions={actions} label="Mailbox actions" />} />
      <div className="p-4 sm:p-6">
        <ResourceOverviewLayout
          identity={<IdentityCard icon={<Mail />} name="Paál Gyula" ribbon="IMAP + SMTP" status={<PowerState state="on" label="Active" />} description="Primary mailbox of the platform owner. Receives alerts, DMARC reports and certificate renewals." onEdit={say("Edit mailbox")} />}
          details={
            <DetailsCard
              title="Mailbox details"
              onEdit={say("Edit mailbox details")}
              items={[
                { label: "Address", value: "gyula@pilab.hu" },
                { label: "Domain", value: "pilab.hu" },
                { label: "Created", value: <RelativeTime value={NOW - 400 * 24 * HOUR} /> },
                { label: "Last login", value: <RelativeTime value={NOW - 2 * HOUR} />, sub: "from 192.0.2.44 (IMAP)" },
                { label: "Two-factor", value: <PowerState state="on" label="Enabled" /> },
                { label: "Forwarding", value: <Off /> },
                { label: "Spam filter", value: "Moderate" },
                { label: "Quota", value: "10 GB" },
              ]}
            />
          }
          aside={
            <>
              <CountCard title="Aliases" icon={<Users />} onEdit={say("Edit aliases")} items={[{ id: "a1", content: "postmaster@pilab.hu" }, { id: "a2", content: "gyula@pilab.example" }]} />
              <CountCard title="Devices" icon={<Cloud />} onEdit={say("Edit devices")} items={[{ id: "d1", content: "Thunderbird · desktop" }, { id: "d2", content: "Fairemail · phone" }]} />
              <SideCard title="Forwarders" icon={<CircleHelp />} count={0} onEdit={say("Edit forwarders")} empty="No forwarders configured" />
            </>
          }
          utilization={
            <UtilizationPanel title="Usage">
              <UtilizationColumn title="Storage" available={6.2} capacity="10 GB" used={38} history={trend(5, 30)} formatValue={(v) => `${v}%`} />
              <UtilizationColumn title="Messages / day" available={1710} capacity="2000 messages" used={86} warnAt={70} dangerAt={95} history={trend(6, 50)} />
              <UtilizationColumn title="IMAP sessions" available={7} capacity="10 sessions" used={30} gauge="radial" history={trend(7, 20)} />
              <UtilizationColumn title="Spam score" available={98} capacity="100 points" used={97} warnAt={50} dangerAt={90} history={trend(8, 10)} />
            </UtilizationPanel>
          }
        />
      </div>
    </>
  );
}

/** Object overview (oVirt-style VM page) built from the generic `ResourceOverviewLayout` family, plus a mailbox variant on the same components. */
export default function ResourceOverviewDemo() {
  const [last, setLast] = React.useState("No action yet");
  return (
    <TooltipProvider>
      <AppFrame
        className="h-[1150px] overflow-hidden rounded-lg border border-line"
        persistKey="laf-demo-resource-overview"
        masthead={
          <Masthead>
            <MastheadToggle />
            <MastheadBrand href="#" onClick={(e) => e.preventDefault()} logo={<span className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-on-primary">P</span>} title="Pilab" subtitle="Resource overview" />
            <MastheadContent>
              <Badge tone="primary">production</Badge>
            </MastheadContent>
            <MastheadActions>
              <ThemeToggle persistKey="laf-demo-theme" />
              <UserMenu name={USER.name} email={USER.email} avatarSrc={USER.src} onSignOut={() => {}} />
            </MastheadActions>
          </Masthead>
        }
        sidebar={<Sidebar items={nav} label="Main navigation" />}
        footer={<AppFooter copyright="© 2026 Pilab" version="1.0.0" />}
      >
        <Tabs defaultValue="vm">
          <div className="flex flex-wrap items-center justify-between gap-x-4 border-b border-line pe-5">
            <TabsList className="border-b-0 px-4">
              <TabsTrigger value="vm">Virtual machine</TabsTrigger>
              <TabsTrigger value="mailbox">Mailbox</TabsTrigger>
            </TabsList>
            <p role="status" className="m-0 py-1 text-xs text-muted">
              Last action: {last}
            </p>
          </div>
          <TabsContent value="vm">
            <VmPage onAction={setLast} />
          </TabsContent>
          <TabsContent value="mailbox">
            <MailboxPage onAction={setLast} />
          </TabsContent>
        </Tabs>
      </AppFrame>
    </TooltipProvider>
  );
}
