import { BookUser, Building2, Gauge, Globe2, HardDrive, ListOrdered, Mail, Network, ScrollText, Search, Settings, ShieldCheck, Users } from "lucide-react";
import * as React from "react";

export interface MailRoute {
  path: string;
  title: string;
  subtitle: string;
  section: string;
  icon: React.ReactNode;
}

const i = (I: typeof Mail) => <I aria-hidden />;

export const ROUTES: MailRoute[] = [
  { path: "/", title: "Dashboard", subtitle: "Queue, delivery, spam filtering, storage and daemon health at a glance.", section: "Overview", icon: i(Gauge) },
  { path: "/recipients/mailboxes", title: "Mailboxes", subtitle: "User accounts: profile, aliases, quota, delegation, app passwords, Sieve and vacation.", section: "Recipients", icon: i(Mail) },
  { path: "/recipients/groups", title: "Groups", subtitle: "Distribution lists and their direct members.", section: "Recipients", icon: i(Users) },
  { path: "/recipients/resources", title: "Shared & resource mailboxes", subtitle: "Shared mailboxes, rooms and equipment with booking policy.", section: "Recipients", icon: i(Building2) },
  { path: "/mail-flow/queue", title: "Outbound queue", subtitle: "Jobs the MTA is delivering, retrying or has given up on.", section: "Mail flow", icon: i(ListOrdered) },
  { path: "/mail-flow/trace", title: "Message trace", subtitle: "Recorded protocol exchanges with live tail.", section: "Mail flow", icon: i(Search) },
  { path: "/mail-flow/domains", title: "Domains", subtitle: "Hosted domains, DKIM keys and the DNS records to publish.", section: "Mail flow", icon: i(Globe2) },
  { path: "/mail-flow/policies", title: "Transport policies", subtitle: "Rate limits, DNSBL, greylisting and data-loss prevention.", section: "Mail flow", icon: i(ShieldCheck) },
  { path: "/protocols", title: "Protocols", subtitle: "Listeners, TLS certificates and client access per protocol.", section: "Servers", icon: i(Network) },
  { path: "/storage", title: "Storage", subtitle: "Blob store, garbage collection, thread repair and retention.", section: "Servers", icon: i(HardDrive) },
  { path: "/contacts", title: "Contacts & GAL", subtitle: "Address books and the global address list.", section: "Directory", icon: i(BookUser) },
  { path: "/audit", title: "Audit log", subtitle: "Administrative actions on this server.", section: "System", icon: i(ScrollText) },
  { path: "/settings", title: "Settings", subtitle: "System information and global settings.", section: "System", icon: i(Settings) },
];

export const routeFor = (path: string): MailRoute => ROUTES.find((r) => r.path === path) ?? ROUTES[0]!;
