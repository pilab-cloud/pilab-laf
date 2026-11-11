import type {
  AccountInfo,
  AccountKind,
  AddressBook,
  AppPasswordInfo,
  AuditEvent,
  Calendar,
  ClientAccess,
  CreateAppPasswordResponse,
  DashboardMetrics,
  DKIMKey,
  Domain,
  DomainKind,
  EnsureAccountRequest,
  GALEntry,
  GenerateDKIMKeyResponse,
  GetDKIMDNSRecordResponse,
  GetQuotaResponse,
  GetQueueStatsResponse,
  GetSystemInfoResponse,
  HTTPExchange,
  MailboxACLGrant,
  MailSettings,
  OutboundJob,
  OutboundStatus,
  PurgeExpiredMessagesResponse,
  RepairThreadsResponse,
  ResourcePolicy,
  RunGCResponse,
  SendAsGrant,
  ServiceListener,
  ServiceStatus,
  SetAccountProfileRequest,
  SieveScript,
  TlsCertificate,
  TraceSummary,
  TransportPolicy,
  TriggerGarbageCollectionResponse,
  VacationResponse,
} from "./types";

/** Fixed "now" so every run (and every e2e baseline) renders the same data. */
export const NOW = Date.parse("2026-01-15T12:00:00Z");
const iso = (ms: number) => new Date(ms).toISOString();
const MIN = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;
const GB = 1024 ** 3;
const MB = 1024 ** 2;

/** Server-side paging contract. `ServerGridRequest` satisfies it structurally. */
export interface PageQuery {
  search?: string;
  sort?: { id: string; dir: "asc" | "desc" }[];
  filters?: { id: string; value: unknown }[];
  page: number;
  pageSize: number;
  signal?: AbortSignal;
}
export interface Page<T> {
  rows: T[];
  total: number;
}

/** Values of one filter, whether the FilterBar produced `"x"` or `{ op, values, negated }`. */
export function filterValues(filters: PageQuery["filters"], id: string): string[] {
  const f = filters?.find((x) => x.id === id);
  if (!f) return [];
  const v = f.value as string | { values?: string[] };
  return typeof v === "string" ? [v] : (v.values ?? []);
}

export interface MailApi {
  accounts: {
    /** GAP: ListAccounts is a keyset scan (`afterId`, `limit`) without search, sort, kind or status filters. */
    list(q: PageQuery): Promise<Page<AccountInfo>>;
    get(id: string): Promise<AccountInfo>;
    ensure(req: EnsureAccountRequest & { displayName?: string }): Promise<{ accountId: string; created: boolean }>;
    setAliases(accountId: string, aliases: string[]): Promise<string[]>;
    setStatus(accountId: string, status: "active" | "suspended"): Promise<void>;
    setProfile(req: SetAccountProfileRequest): Promise<void>;
    setPolicy(accountId: string, internalOnly: boolean): Promise<void>;
    setGroupMembers(groupId: string, members: string[]): Promise<string[]>;
    delete(accountId: string): Promise<boolean>;
    getQuota(accountId: string): Promise<GetQuotaResponse>;
    /** GAP: there is no SetQuota RPC; quota is only set by EnsureAccount. */
    setQuota(accountId: string, quotaBytes: number): Promise<void>;
    listSendAsGrants(principalId: string): Promise<SendAsGrant[]>;
    grantSendAs(principalId: string, fromAddress: string, kind: SendAsGrant["kind"]): Promise<SendAsGrant>;
    revokeSendAs(principalId: string, fromAddress: string): Promise<void>;
    getMailboxACL(accountId: string): Promise<MailboxACLGrant[]>;
    setMailboxACL(grant: MailboxACLGrant): Promise<void>;
    deleteMailboxACL(accountId: string, granteeId: string): Promise<void>;
    listAppPasswords(accountId: string, includeRevoked?: boolean): Promise<AppPasswordInfo[]>;
    createAppPassword(accountId: string, label: string, scopes: string[]): Promise<CreateAppPasswordResponse>;
    revokeAppPassword(accountId: string, id: string): Promise<void>;
    listSieveScripts(accountId: string): Promise<SieveScript[]>;
    putSieveScript(accountId: string, name: string, body: string, active: boolean): Promise<SieveScript>;
    setActiveSieveScript(accountId: string, name: string): Promise<void>;
    deleteSieveScript(accountId: string, name: string): Promise<void>;
    getVacation(accountId: string): Promise<VacationResponse>;
    setVacation(v: VacationResponse): Promise<VacationResponse>;
  };
  domains: {
    list(): Promise<Domain[]>;
    create(req: { name: string; kind: DomainKind; aliasOf?: string; isDefault?: boolean }): Promise<Domain>;
    delete(name: string): Promise<void>;
    generateDKIMKey(domain: string, selector: string, bits?: number): Promise<GenerateDKIMKeyResponse>;
    listDKIMKeys(domain: string): Promise<DKIMKey[]>;
    activateDKIMKey(domain: string, selector: string): Promise<DKIMKey>;
    deleteDKIMKey(domain: string, selector: string): Promise<void>;
    getDKIMDNSRecord(domain: string, selector?: string): Promise<GetDKIMDNSRecordResponse>;
    /** GAP: no RPC resolves the domain's live DNS; verification state comes from a resolver the UI cannot reach. */
    checkDns(domain: string): Promise<Record<string, "verified" | "missing" | "mismatch">>;
  };
  queue: {
    stats(): Promise<GetQueueStatsResponse>;
    /** GAP: ListOutboundJobs has `status` and `limit` only; paging, sorting and search are client side today. */
    list(q: PageQuery): Promise<Page<OutboundJob>>;
    get(id: string): Promise<OutboundJob>;
    retry(id: string): Promise<OutboundJob>;
    flush(recipientDomain?: string): Promise<{ flushedJobs: number }>;
    /** GAP: there is no DeleteOutboundJob RPC. */
    remove(id: string): Promise<void>;
  };
  trace: {
    list(q: PageQuery): Promise<Page<TraceSummary>>;
    get(traceId: string): Promise<HTTPExchange>;
    /** TailTraces is a server stream; `onTrace` stands in for iterating it. Returns the unsubscribe function. */
    tail(onTrace: (t: TraceSummary) => void, opts?: { protocol?: string; backlog?: number }): () => void;
  };
  admin: {
    systemInfo(): Promise<GetSystemInfoResponse>;
    triggerGarbageCollection(req: { force: boolean; gracePeriodDays: number }): Promise<TriggerGarbageCollectionResponse>;
  };
  storage: {
    runGC(req: { olderThanSeconds: number; limit: number; apply: boolean }): Promise<RunGCResponse>;
    purgeExpired(req: { olderThan: string; limit: number; dryRun: boolean }): Promise<PurgeExpiredMessagesResponse>;
    repairThreads(req: { accountId: string; dryRun: boolean }): Promise<RepairThreadsResponse>;
    /** GAP: blob and mailbox totals are not exposed by any RPC. */
    stats(): Promise<{ usedBytes: number; capacityBytes: number; blobCount: number; tombstones: number; messageCount: number }>;
  };
  calendar: {
    listResources(kind?: "room" | "equipment"): Promise<Calendar[]>;
    getResourcePolicy(accountId: string): Promise<ResourcePolicy>;
    setResourcePolicy(policy: ResourcePolicy): Promise<ResourcePolicy>;
  };
  contacts: {
    listAddressBooks(accountId: string): Promise<AddressBook[]>;
    searchGAL(q: PageQuery): Promise<Page<GALEntry>>;
    /** DeleteGALPhoto. */
    deleteGALPhoto(accountId: string): Promise<void>;
  };
  ext: {
    audit(q: PageQuery): Promise<Page<AuditEvent>>;
    settings(): Promise<MailSettings>;
    setSettings(s: MailSettings): Promise<MailSettings>;
    listeners(): Promise<ServiceListener[]>;
    certificates(): Promise<TlsCertificate[]>;
    transportPolicy(): Promise<TransportPolicy>;
    setTransportPolicy(p: TransportPolicy): Promise<TransportPolicy>;
    clientAccess(): Promise<ClientAccess>;
    setClientAccess(c: ClientAccess): Promise<ClientAccess>;
    services(): Promise<ServiceStatus[]>;
    metrics(): Promise<DashboardMetrics>;
  };
}

/* ───────────────────────── seed data ───────────────────────── */
const FIRST = ["Anna", "Bence", "Csilla", "Dávid", "Emese", "Ferenc", "Gabriella", "Hunor", "Ildikó", "János", "Kata", "László", "Mária", "Nándor", "Orsolya", "Péter", "Réka", "Sándor", "Tímea", "Zoltán"];
const LAST = ["Nagy", "Kovács", "Tóth", "Szabó", "Horváth", "Varga", "Kiss", "Molnár", "Németh", "Farkas", "Balogh", "Papp"];
const DEPTS = ["Platform", "Identity", "Storage", "Networking", "Support", "Finance"];
const TITLES = ["Engineer", "Senior engineer", "Team lead", "Analyst", "Administrator", "Manager"];
const slug = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const DOMAINS = ["pilab.hu", "pilab.example", "mail.pilab.hu"];

const blank = (): Omit<AccountInfo, "id" | "kind" | "status" | "email" | "updatedAt" | "displayName" | "aliases" | "members" | "internalOnly"> => ({
  title: "",
  department: "",
  company: "PiLab Kft.",
  office: "",
  phone: "",
  mobile: "",
  managerId: "",
  imAddress: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  homePhone: "",
  businessPhone2: "",
  fax: "",
  assistant: "",
  webPage: "",
});

function seedAccounts(): { accounts: AccountInfo[]; quotas: Map<string, GetQuotaResponse> } {
  const accounts: AccountInfo[] = [];
  const quotas = new Map<string, GetQuotaResponse>();
  const add = (a: Partial<AccountInfo> & Pick<AccountInfo, "id" | "kind" | "email" | "displayName">, quota: number, used: number) => {
    accounts.push({ ...blank(), status: "active", updatedAt: iso(NOW - (accounts.length % 40) * DAY), aliases: [], members: [], internalOnly: false, ...a });
    quotas.set(a.id, { quotaBytes: quota, usedBytes: used });
  };
  add({ id: "acc_gyula", kind: "user", email: "gyula@pilab.hu", displayName: "Paál Gyula", title: "Founder", department: "Platform", aliases: ["postmaster@pilab.hu", "abuse@pilab.hu"], office: "Budapest", phone: "+36 1 555 0100" }, 50 * GB, 12.4 * GB);
  FIRST.slice(0, 20).forEach((first, i) => {
    const last = LAST[(i * 5 + 3) % LAST.length]!;
    const email = `${slug(first)}.${slug(last)}@${DOMAINS[i % 2]}`;
    const quota = [5, 10, 20, 0][i % 4]! * GB;
    const used = quota ? Math.round(quota * (((i * 37) % 100) / 100) ** 1.2) : (i + 1) * 300 * MB;
    add(
      {
        id: `acc_${String(i + 1).padStart(3, "0")}`,
        kind: "user",
        email,
        displayName: `${last} ${first}`,
        status: i % 9 === 4 ? "suspended" : "active",
        department: DEPTS[i % DEPTS.length]!,
        title: TITLES[(i * 2) % TITLES.length]!,
        aliases: i % 3 === 0 ? [`${slug(first)}@${DOMAINS[i % 2]}`] : [],
        internalOnly: i % 7 === 2,
        office: ["Budapest", "Debrecen", "Remote"][i % 3]!,
        phone: `+36 1 555 ${String(1000 + i * 17).slice(-4)}`,
        managerId: i > 3 ? "acc_gyula" : "",
        imAddress: `sip:${email}`,
      },
      quota,
      used,
    );
  });
  // Pad with deterministic extra users so server-side paging has several pages.
  for (let i = 20; i < 56; i++) {
    const first = FIRST[(i * 7) % FIRST.length]!;
    const last = LAST[(i * 5 + 1) % LAST.length]!;
    add(
      { id: `acc_${String(i + 1).padStart(3, "0")}`, kind: "user", email: `${slug(first)}.${slug(last)}${i}@pilab.hu`, displayName: `${last} ${first}`, department: DEPTS[i % DEPTS.length]!, title: TITLES[i % TITLES.length]!, status: i % 11 === 0 ? "suspended" : "active" },
      [5, 10, 20][i % 3]! * GB,
      Math.round(((i * 53) % 90) / 100 * [5, 10, 20][i % 3]! * GB),
    );
  }
  add({ id: "acc_support", kind: "shared-mailbox", email: "support@pilab.hu", displayName: "Support", department: "Support", aliases: ["help@pilab.hu"] }, 50 * GB, 8.2 * GB);
  add({ id: "acc_billing", kind: "shared-mailbox", email: "billing@pilab.hu", displayName: "Billing", department: "Finance" }, 20 * GB, 2.1 * GB);
  add({ id: "acc_noc", kind: "shared-mailbox", email: "noc@pilab.hu", displayName: "NOC alerts", department: "Platform" }, 10 * GB, 9.7 * GB);
  add({ id: "acc_room_a", kind: "room", email: "room.alpha@pilab.hu", displayName: "Room Alpha (12 seats)", office: "Budapest 3F" }, 1 * GB, 20 * MB);
  add({ id: "acc_room_b", kind: "room", email: "room.beta@pilab.hu", displayName: "Room Beta (6 seats)", office: "Budapest 3F" }, 1 * GB, 14 * MB);
  add({ id: "acc_room_c", kind: "room", email: "room.gamma@pilab.hu", displayName: "Room Gamma (4 seats)", office: "Debrecen 1F" }, 1 * GB, 6 * MB);
  add({ id: "acc_eq_proj", kind: "equipment", email: "projector@pilab.hu", displayName: "Projector kit", office: "Budapest 3F" }, 1 * GB, 3 * MB);
  add({ id: "acc_eq_car", kind: "equipment", email: "poolcar@pilab.hu", displayName: "Pool car", office: "Garage" }, 1 * GB, 9 * MB);
  add({ id: "acc_grp_all", kind: "group", email: "all@pilab.hu", displayName: "Everyone", members: accounts.filter((a) => a.kind === "user" && a.status === "active").slice(0, 18).map((a) => a.id) }, 0, 0);
  add({ id: "acc_grp_eng", kind: "group", email: "engineering@pilab.hu", displayName: "Engineering", members: ["acc_gyula", "acc_001", "acc_002", "acc_003", "acc_005", "acc_008"] }, 0, 0);
  add({ id: "acc_grp_ops", kind: "group", email: "ops@pilab.hu", displayName: "Operations", members: ["acc_gyula", "acc_004", "acc_006"] }, 0, 0);
  add({ id: "acc_grp_fin", kind: "group", email: "finance@pilab.hu", displayName: "Finance", members: ["acc_007", "acc_009"] }, 0, 0);
  return { accounts, quotas };
}

const SMTP = ["250 2.0.0 OK queued as 4F2A91", "421 4.7.0 Try again later, greylisted", "451 4.3.0 Temporary local problem", "550 5.1.1 Recipient address rejected: user unknown", "554 5.7.1 Rejected by policy", "452 4.2.2 Mailbox full"];
const REMOTE = ["gmail-smtp-in.l.google.com", "mx.outlook.com", "mx1.partner.example", "mail.protection.example", "mx.freemail.hu"];
const EXT_DOMAINS = ["gmail.com", "outlook.com", "partner.example", "customer.example", "freemail.hu"];

function seedJobs(accounts: AccountInfo[]): OutboundJob[] {
  const users = accounts.filter((a) => a.kind === "user");
  const statuses: OutboundStatus[] = ["DELIVERED", "DELIVERED", "DELIVERED", "PENDING", "TRANSIENT_FAILURE", "DELIVERED", "PERMANENT_FAILURE", "PENDING"];
  return Array.from({ length: 84 }, (_, i): OutboundJob => {
    const u = users[(i * 3) % users.length]!;
    const status = statuses[(i * 5) % statuses.length]!;
    const d = EXT_DOMAINS[(i * 2) % EXT_DOMAINS.length]!;
    const created = NOW - ((i * 7) % 600) * MIN - 2 * MIN;
    return {
      id: `ob_${(0x1a00 + i * 97).toString(16)}`,
      accountId: u.id,
      sender: u.email,
      recipients: i % 6 === 0 ? [`team@${d}`, `ops@${d}`] : [`user${i}@${d}`],
      status,
      attempts: status === "PENDING" ? i % 2 : status === "DELIVERED" ? 1 : 2 + (i % 5),
      remoteMta: status === "PENDING" ? "" : REMOTE[i % REMOTE.length]!,
      smtpResponse: status === "DELIVERED" ? SMTP[0]! : status === "PENDING" ? "" : status === "TRANSIENT_FAILURE" ? SMTP[[1, 2, 5][i % 3]!]! : SMTP[[3, 4][i % 2]!]!,
      nextRetry: status === "TRANSIENT_FAILURE" ? iso(NOW + ((i % 9) + 1) * 5 * MIN) : undefined,
      createdAt: iso(created),
      updatedAt: iso(created + 90_000),
      size: 4_000 + ((i * 7919) % 900_000),
    };
  });
}

const PROTOCOLS = ["ews", "jmap", "dav", "eas", "autodiscover"];
const OPS: Record<string, string[]> = {
  ews: ["FindItem", "GetItem", "SyncFolderItems", "GetStreamingEvents"],
  jmap: ["Email/query", "Email/get", "Mailbox/get", "Email/set"],
  dav: ["PROPFIND", "REPORT", "PUT", "GET"],
  eas: ["Sync", "Ping", "FolderSync"],
  autodiscover: ["Autodiscover"],
};
const UA = ["Microsoft Office/16.0 (Windows NT 10.0; Microsoft Outlook 16.0)", "Thunderbird/128.0", "DAVx5/4.4.2", "pilab-web/1.0", "Apple-iPhone15C1/2201"];

function seedTraces(accounts: AccountInfo[]): TraceSummary[] {
  const users = accounts.filter((a) => a.kind === "user");
  return Array.from({ length: 140 }, (_, i): TraceSummary => {
    const protocol = PROTOCOLS[(i * 3) % PROTOCOLS.length]!;
    const op = OPS[protocol]![i % OPS[protocol]!.length]!;
    const u = users[(i * 5) % users.length]!;
    const status = i % 23 === 0 ? 500 : i % 13 === 0 ? 401 : 200;
    return {
      traceId: `tr_${(0x9000 + i * 31).toString(16)}`,
      startedAt: iso(NOW - i * 47_000),
      durationMs: 12 + ((i * 53) % 480),
      protocol,
      operation: op,
      accountId: u.id,
      principal: u.email,
      method: protocol === "dav" ? op : "POST",
      path: protocol === "ews" ? "/EWS/Exchange.asmx" : protocol === "jmap" ? "/jmap" : protocol === "dav" ? `/dav/calendars/${u.email}/` : protocol === "eas" ? "/Microsoft-Server-ActiveSync" : "/autodiscover/autodiscover.xml",
      status,
      requestBytes: 400 + ((i * 131) % 4000),
      responseBytes: 800 + ((i * 977) % 60_000),
      userAgent: UA[i % UA.length]!,
      clientIp: `203.0.113.${(i * 7) % 250}`,
      responseCodes: status === 200 ? ["NoError"] : status === 401 ? ["ErrorUnauthorized"] : ["ErrorInternalServerError"],
      sessionId: `ses_${(i % 11).toString(16)}${u.id.slice(-3)}`,
      sessionSeq: Math.floor(i / 11) + 1,
      error: status === 500 ? "storage: deadline exceeded" : "",
      streamed: op === "GetStreamingEvents",
    };
  });
}

function seedAudit(): AuditEvent[] {
  const acts: [string, string, string][] = [
    ["account.create", "acc_012", "Created mailbox"],
    ["account.suspend", "acc_005", "Status set to suspended"],
    ["domain.dkim.generate", "pilab.hu", "selector 2026a (2048 bit)"],
    ["domain.dkim.activate", "pilab.hu", "selector 2026a"],
    ["queue.flush", "partner.example", "flushed 4 jobs"],
    ["sendas.grant", "acc_support", "send-as support@pilab.hu"],
    ["gc.run", "storage", "purged 312 blobs"],
    ["policy.update", "greylisting", "delay 300s → 180s"],
    ["acl.set", "acc_support", "grantee acc_003: read, write"],
    ["apppassword.revoke", "acc_007", "label Phone"],
  ];
  return Array.from({ length: 64 }, (_, i): AuditEvent => {
    const [action, target, detail] = acts[(i * 3) % acts.length]!;
    return { id: `au_${i + 1}`, time: iso(NOW - i * 41 * MIN), actor: i % 5 === 0 ? "system" : "gyula@pilab.hu", action, target, result: i % 17 === 0 ? "failure" : "success", detail, sourceIp: i % 5 === 0 ? "127.0.0.1" : "10.0.0.14" };
  });
}

const wave = (n: number, step: number, base: number, amp: number, seed: number): [number, number][] =>
  Array.from({ length: n }, (_, i) => [NOW - (n - 1 - i) * step, Math.max(0, Math.round(base + amp * Math.sin(i / (4 + seed)) + amp * 0.35 * Math.sin(i * 1.9 + seed)))]);

const PEM = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvX2p5Zr3m0kP1m8cQ7wR\nJ1o3m0aTz9eYq4bXc5uVh2n8kLw0sF7dGa3PzQ1rNy6tEoIu2cJ9xWb4HfMl5Aq8\nIDAQAB\n-----END PUBLIC KEY-----";
export const dkimTxt = (pem: string) => `v=DKIM1; k=rsa; p=${pem.replace(/-----[A-Z ]+-----|\s/g, "")}`;

const notFound = (what: string) => new Error(`not found: ${what}`);

/* ───────────────────────── implementation ───────────────────────── */
export interface MockOptions {
  /** Simulated round-trip time in ms; 0 resolves on the next microtask. */
  latency?: number;
  /** Rejects every call when set, to exercise error states. */
  fail?: () => boolean;
}

function matchText(parts: (string | undefined)[], q?: string) {
  const s = q?.trim().toLowerCase();
  return !s || parts.some((p) => p?.toLowerCase().includes(s));
}

function sortRows<T>(rows: T[], sort: PageQuery["sort"], get: (row: T, id: string) => string | number) {
  if (!sort?.length) return rows;
  return [...rows].sort((a, b) =>
    sort.reduce((r, s) => {
      if (r) return r;
      const x = get(a, s.id);
      const y = get(b, s.id);
      const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return c * (s.dir === "asc" ? 1 : -1);
    }, 0),
  );
}

const paginate = <T>(rows: T[], q: PageQuery): Page<T> => ({ rows: rows.slice((q.page - 1) * q.pageSize, q.page * q.pageSize), total: rows.length });

/** In-memory implementation of `MailApi`: same call shapes as the connect-rpc services, mutable state per instance. */
export function createMockMailApi(opts: MockOptions = {}): MailApi {
  const { latency = 120 } = opts;
  const seeded = seedAccounts();
  const accounts = seeded.accounts;
  const quotas = seeded.quotas;
  const jobs = seedJobs(accounts);
  const traces = seedTraces(accounts);
  const audit = seedAudit();
  let auditSeq = audit.length;

  const sendAs = new Map<string, SendAsGrant[]>([
    ["acc_001", [{ principalId: "acc_001", fromAddress: "support@pilab.hu", kind: "send-as", createdAt: iso(NOW - 20 * DAY) }]],
    ["acc_002", [{ principalId: "acc_002", fromAddress: "billing@pilab.hu", kind: "on-behalf", createdAt: iso(NOW - 9 * DAY) }]],
  ]);
  const acls: MailboxACLGrant[] = [
    { accountId: "acc_support", granteeId: "acc_001", rights: ["lookup", "read", "write", "insert"], granteeEmail: "kovacs.anna@pilab.hu", granteeDisplayName: "Kovács Anna" },
    { accountId: "acc_support", granteeId: "acc_002", rights: ["lookup", "read"], granteeEmail: "nagy.bence@pilab.example", granteeDisplayName: "Nagy Bence" },
  ];
  const appPasswords: AppPasswordInfo[] = [
    { id: "ap_1", accountId: "acc_gyula", label: "iPhone Mail", scopes: ["imap", "smtp"], createdAt: iso(NOW - 80 * DAY), lastUsedAt: iso(NOW - 2 * HOUR) },
    { id: "ap_2", accountId: "acc_gyula", label: "Thunderbird", scopes: ["imap", "smtp", "dav"], createdAt: iso(NOW - 200 * DAY), lastUsedAt: iso(NOW - 3 * DAY) },
    { id: "ap_3", accountId: "acc_gyula", label: "Old tablet", scopes: ["pop3"], createdAt: iso(NOW - 400 * DAY), revokedAt: iso(NOW - 30 * DAY) },
  ];
  const sieve: SieveScript[] = [
    { id: "sv_1", accountId: "acc_gyula", name: "filters", active: true, updatedAt: iso(NOW - 12 * DAY), body: 'require ["fileinto"];\nif header :contains "subject" "[alerts]" {\n  fileinto "Alerts";\n}\n' },
    { id: "sv_2", accountId: "acc_gyula", name: "newsletters", active: false, updatedAt: iso(NOW - 40 * DAY), body: 'require ["fileinto"];\nif address :domain "from" "news.example" { fileinto "News"; }\n' },
  ];
  const vacations = new Map<string, VacationResponse>();
  const dkim: DKIMKey[] = [
    { domain: "pilab.hu", selector: "2025a", publicKeyPem: PEM, active: false, createdAt: iso(NOW - 300 * DAY), retiredAt: iso(NOW - 20 * DAY) },
    { domain: "pilab.hu", selector: "2026a", publicKeyPem: PEM, active: true, createdAt: iso(NOW - 25 * DAY) },
    { domain: "pilab.example", selector: "s1", publicKeyPem: PEM, active: true, createdAt: iso(NOW - 90 * DAY) },
  ];
  const domains: Domain[] = [
    { name: "pilab.hu", kind: "PRIMARY", aliasOf: "", isDefault: true, status: "active", createdAt: iso(NOW - 500 * DAY), activeDkimSelector: "2026a" },
    { name: "pilab.example", kind: "PRIMARY", aliasOf: "", isDefault: false, status: "active", createdAt: iso(NOW - 200 * DAY), activeDkimSelector: "s1" },
    { name: "pilab.eu", kind: "ALIAS", aliasOf: "pilab.hu", isDefault: false, status: "active", createdAt: iso(NOW - 100 * DAY), activeDkimSelector: "" },
  ];
  const resourcePolicies = new Map<string, ResourcePolicy>([
    ["acc_room_a", { accountId: "acc_room_a", autoAccept: true, allowConflicts: false, maxDurationMin: 240, approverGroup: "" }],
    ["acc_eq_car", { accountId: "acc_eq_car", autoAccept: false, allowConflicts: false, maxDurationMin: 1440, approverGroup: "acc_grp_ops" }],
  ]);
  let settings: MailSettings = { systemName: "PiMail", defaultDomain: "pilab.hu", maxMessageBytes: 50 * MB, retentionDays: 30, trashRetentionDays: 14 };
  let transport: TransportPolicy = {
    rateLimit: { perMinute: 60, perHour: 600, burst: 20 },
    dnsbl: { enabled: true, zones: ["zen.spamhaus.org", "bl.spamcop.net"], rejectScore: 2 },
    greylist: { enabled: true, delaySeconds: 300, whitelistTrusted: true },
    dlp: { enabled: false, mode: "monitor", patterns: ["\\b\\d{4}[ -]?\\d{4}[ -]?\\d{4}[ -]?\\d{4}\\b"] },
  };
  let access: ClientAccess = { imap: true, pop3: false, jmap: true, ews: true, dav: true };
  let gcTombstones = 312;
  let tailSeq = 0;

  const wait = <T>(f: () => T): Promise<T> =>
    new Promise((resolve, reject) => {
      const run = () => {
        try {
          if (opts.fail?.()) throw new Error("503 Service Unavailable");
          resolve(f());
        } catch (e) {
          reject(e);
        }
      };
      if (latency > 0) setTimeout(run, latency);
      else queueMicrotask(run);
    });
  const clone = <T>(v: T): T => structuredClone(v);
  const record = (action: string, target: string, detail = "") => audit.unshift({ id: `au_${++auditSeq}`, time: iso(Date.now()), actor: "gyula@pilab.hu", action, target, result: "success", detail, sourceIp: "10.0.0.14" });
  const acc = (id: string) => accounts.find((a) => a.id === id) ?? (() => { throw notFound(id); })();
  const touch = (a: AccountInfo) => (a.updatedAt = iso(Date.now()));

  const stats = () => ({
    pendingCount: jobs.filter((j) => j.status === "PENDING").length,
    inFlightCount: jobs.filter((j) => j.status === "PENDING" && j.attempts > 0).length,
    retryCount: jobs.filter((j) => j.status === "TRANSIENT_FAILURE").length,
    failedCount: jobs.filter((j) => j.status === "PERMANENT_FAILURE").length,
  });

  const exchange = (s: TraceSummary): HTTPExchange => ({
    summary: s,
    query: "",
    contentType: s.protocol === "jmap" ? "application/json" : "text/xml; charset=utf-8",
    requestHeaders: [
      { name: "Content-Type", value: s.protocol === "jmap" ? "application/json" : "text/xml" },
      { name: "User-Agent", value: s.userAgent },
      { name: "X-Forwarded-For", value: s.clientIp },
    ],
    responseHeaders: [{ name: "Content-Type", value: "text/xml" }, { name: "X-Trace-Id", value: s.traceId }],
    requestBody: s.protocol === "jmap" ? `{"using":["urn:ietf:params:jmap:mail"],"methodCalls":[["${s.operation}",{"accountId":"${s.accountId}"},"c1"]]}` : `<m:${s.operation} xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages"/>`,
    responseBody: s.error ? `{"error":"${s.error}"}` : `<ResponseCode>${s.responseCodes[0]}</ResponseCode>`,
  });

  return {
    accounts: {
      list: (q) =>
        wait(() => {
          const kinds = filterValues(q.filters, "kind");
          const statuses = filterValues(q.filters, "status");
          const depts = filterValues(q.filters, "department");
          const rows = accounts.filter((a) => (!kinds.length || kinds.includes(a.kind)) && (!statuses.length || statuses.includes(a.status)) && (!depts.length || depts.includes(a.department)) && matchText([a.displayName, a.email, a.department, ...a.aliases], q.search));
          const sorted = sortRows(rows, q.sort, (a, id) => (id === "quota" ? (quotas.get(a.id)?.usedBytes ?? 0) : (a[id as keyof AccountInfo] as string)));
          return clone(paginate(sorted, q));
        }),
      get: (id) => wait(() => clone(acc(id))),
      ensure: (r) =>
        wait(() => {
          const existing = accounts.find((a) => a.email.toLowerCase() === r.email.toLowerCase());
          if (existing) return { accountId: existing.id, created: false };
          const id = r.accountId || `acc_${Math.random().toString(36).slice(2, 8)}`;
          accounts.push({ ...blank(), id, kind: r.kind, status: "active", email: r.email, updatedAt: iso(Date.now()), displayName: r.displayName ?? r.email.split("@")[0]!, aliases: [], members: [], internalOnly: false });
          quotas.set(id, { quotaBytes: r.quotaBytes, usedBytes: 0 });
          record("account.create", id, r.email);
          return { accountId: id, created: true };
        }),
      setAliases: (id, aliases) =>
        wait(() => {
          const a = acc(id);
          a.aliases = [...new Set(aliases.map((x) => x.trim()).filter(Boolean))];
          touch(a);
          record("account.aliases", id, a.aliases.join(", "));
          return [...a.aliases];
        }),
      setStatus: (id, status) =>
        wait(() => {
          const a = acc(id);
          a.status = status;
          touch(a);
          record(status === "active" ? "account.enable" : "account.suspend", id);
        }),
      setProfile: (r) =>
        wait(() => {
          const { accountId, ...fields } = r;
          const a = acc(accountId);
          for (const [k, v] of Object.entries(fields)) if (v !== undefined && v !== "") (a as unknown as Record<string, unknown>)[k] = v;
          touch(a);
          record("account.profile", accountId);
        }),
      setPolicy: (id, internalOnly) =>
        wait(() => {
          acc(id).internalOnly = internalOnly;
          record("account.policy", id, `internalOnly=${internalOnly}`);
        }),
      setGroupMembers: (id, members) =>
        wait(() => {
          const g = acc(id);
          g.members = [...members];
          record("group.members", id, `${members.length} members`);
          return [...g.members];
        }),
      delete: (id) =>
        wait(() => {
          const i = accounts.findIndex((a) => a.id === id);
          if (i < 0) return false;
          accounts.splice(i, 1);
          quotas.delete(id);
          record("account.delete", id);
          return true;
        }),
      getQuota: (id) => wait(() => ({ ...(quotas.get(id) ?? { quotaBytes: 0, usedBytes: 0 }) })),
      setQuota: (id, quotaBytes) =>
        wait(() => {
          const q = quotas.get(id) ?? { quotaBytes: 0, usedBytes: 0 };
          quotas.set(id, { ...q, quotaBytes });
          record("account.quota", id, `${quotaBytes} bytes`);
        }),
      listSendAsGrants: (id) => wait(() => clone(sendAs.get(id) ?? [])),
      grantSendAs: (principalId, fromAddress, kind) =>
        wait(() => {
          const g: SendAsGrant = { principalId, fromAddress, kind, createdAt: iso(Date.now()) };
          sendAs.set(principalId, [...(sendAs.get(principalId) ?? []).filter((x) => x.fromAddress !== fromAddress), g]);
          record("sendas.grant", principalId, `${kind} ${fromAddress}`);
          return clone(g);
        }),
      revokeSendAs: (principalId, fromAddress) =>
        wait(() => {
          sendAs.set(principalId, (sendAs.get(principalId) ?? []).filter((x) => x.fromAddress !== fromAddress));
          record("sendas.revoke", principalId, fromAddress);
        }),
      getMailboxACL: (id) => wait(() => clone(acls.filter((g) => g.accountId === id))),
      setMailboxACL: (g) =>
        wait(() => {
          const who = acc(g.granteeId);
          const i = acls.findIndex((x) => x.accountId === g.accountId && x.granteeId === g.granteeId);
          const next = { ...g, granteeEmail: who.email, granteeDisplayName: who.displayName };
          if (i >= 0) acls[i] = next;
          else acls.push(next);
          record("acl.set", g.accountId, `${g.granteeId}: ${g.rights.join(", ")}`);
        }),
      deleteMailboxACL: (accountId, granteeId) =>
        wait(() => {
          const i = acls.findIndex((x) => x.accountId === accountId && x.granteeId === granteeId);
          if (i >= 0) acls.splice(i, 1);
          record("acl.delete", accountId, granteeId);
        }),
      listAppPasswords: (id, includeRevoked) => wait(() => clone(appPasswords.filter((p) => p.accountId === id && (includeRevoked || !p.revokedAt)))),
      createAppPassword: (accountId, label, scopes) =>
        wait(() => {
          const id = `ap_${appPasswords.length + 1}`;
          appPasswords.push({ id, accountId, label, scopes, createdAt: iso(Date.now()) });
          record("apppassword.create", accountId, label);
          return { id, secret: "wxyz-3f9k-q2mt-8hcd" };
        }),
      revokeAppPassword: (accountId, id) =>
        wait(() => {
          const p = appPasswords.find((x) => x.id === id && x.accountId === accountId);
          if (p) p.revokedAt = iso(Date.now());
          record("apppassword.revoke", accountId, p?.label ?? id);
        }),
      listSieveScripts: (id) => wait(() => clone(sieve.filter((s) => s.accountId === id))),
      putSieveScript: (accountId, name, body, active) =>
        wait(() => {
          let s = sieve.find((x) => x.accountId === accountId && x.name === name);
          if (!s) sieve.push((s = { id: `sv_${sieve.length + 1}`, accountId, name, body, active: false, updatedAt: "" }));
          s.body = body;
          s.updatedAt = iso(Date.now());
          if (active) sieve.filter((x) => x.accountId === accountId).forEach((x) => (x.active = x === s));
          record("sieve.put", accountId, name);
          return clone(s);
        }),
      setActiveSieveScript: (accountId, name) =>
        wait(() => {
          sieve.filter((x) => x.accountId === accountId).forEach((x) => (x.active = x.name === name));
          record("sieve.activate", accountId, name);
        }),
      deleteSieveScript: (accountId, name) =>
        wait(() => {
          const i = sieve.findIndex((x) => x.accountId === accountId && x.name === name);
          if (i >= 0) sieve.splice(i, 1);
          record("sieve.delete", accountId, name);
        }),
      getVacation: (id) => wait(() => clone(vacations.get(id) ?? { accountId: id, isEnabled: false, subject: "", textBody: "", htmlBody: "" })),
      setVacation: (v) =>
        wait(() => {
          const next = { ...v, updatedAt: iso(Date.now()) };
          vacations.set(v.accountId, next);
          record("vacation.set", v.accountId, v.isEnabled ? "enabled" : "disabled");
          return clone(next);
        }),
    },
    domains: {
      list: () => wait(() => clone(domains)),
      create: (r) =>
        wait(() => {
          const name = r.name.trim().toLowerCase();
          if (domains.some((d) => d.name === name)) throw new Error(`domain ${name} already exists`);
          if (r.kind === "ALIAS" && !domains.some((d) => d.name === r.aliasOf && d.kind === "PRIMARY")) throw new Error("alias_of must name a primary domain");
          if (r.isDefault) domains.forEach((d) => (d.isDefault = false));
          const d: Domain = { name, kind: r.kind, aliasOf: r.kind === "ALIAS" ? (r.aliasOf ?? "") : "", isDefault: !!r.isDefault, status: "active", createdAt: iso(Date.now()), activeDkimSelector: "" };
          domains.push(d);
          record("domain.create", name, r.kind);
          return clone(d);
        }),
      delete: (name) =>
        wait(() => {
          if (accounts.some((a) => a.email.endsWith(`@${name}`))) throw new Error("domain is still used by accounts");
          if (domains.some((d) => d.aliasOf === name)) throw new Error("another domain aliases this domain");
          const i = domains.findIndex((d) => d.name === name);
          if (i >= 0) domains.splice(i, 1);
          record("domain.delete", name);
        }),
      generateDKIMKey: (domain, selector, bits = 2048) =>
        wait(() => {
          if (dkim.some((k) => k.domain === domain && k.selector === selector)) throw new Error("selector already exists");
          const key: DKIMKey = { domain, selector, publicKeyPem: PEM, active: false, createdAt: iso(Date.now()) };
          dkim.push(key);
          record("domain.dkim.generate", domain, `selector ${selector} (${bits} bit)`);
          return { key: clone(key), dnsName: `${selector}._domainkey.${domain}`, dnsValue: dkimTxt(PEM) };
        }),
      listDKIMKeys: (domain) => wait(() => clone(dkim.filter((k) => k.domain === domain))),
      activateDKIMKey: (domain, selector) =>
        wait(() => {
          const key = dkim.find((k) => k.domain === domain && k.selector === selector);
          if (!key) throw notFound(selector);
          dkim.filter((k) => k.domain === domain && k.active).forEach((k) => ((k.active = false), (k.retiredAt = iso(Date.now()))));
          key.active = true;
          key.retiredAt = undefined;
          const d = domains.find((x) => x.name === domain);
          if (d) d.activeDkimSelector = selector;
          record("domain.dkim.activate", domain, `selector ${selector}`);
          return clone(key);
        }),
      deleteDKIMKey: (domain, selector) =>
        wait(() => {
          const i = dkim.findIndex((k) => k.domain === domain && k.selector === selector);
          if (i < 0) return;
          if (dkim[i]!.active) throw new Error("the active key cannot be deleted");
          dkim.splice(i, 1);
          record("domain.dkim.delete", domain, selector);
        }),
      getDKIMDNSRecord: (domain, selector) =>
        wait(() => {
          const key = dkim.find((k) => k.domain === domain && (selector ? k.selector === selector : k.active));
          if (!key) throw notFound(`DKIM key for ${domain}`);
          return { domain, selector: key.selector, dnsName: `${key.selector}._domainkey.${domain}`, dnsValue: dkimTxt(key.publicKeyPem) };
        }),
      checkDns: (domain) =>
        wait(() => {
          const d = domains.find((x) => x.name === domain);
          const hasKey = !!d?.activeDkimSelector;
          return { MX: "verified", SPF: "verified", DKIM: hasKey ? "verified" : "missing", DMARC: domain === "pilab.example" ? "mismatch" : "verified", "MTA-STS": domain === "pilab.hu" ? "verified" : "missing" } as const;
        }),
    },
    queue: {
      stats: () => wait(stats),
      list: (q) =>
        wait(() => {
          const st = filterValues(q.filters, "status");
          const rows = jobs.filter((j) => (!st.length || st.includes(j.status)) && matchText([j.id, j.sender, j.smtpResponse, j.remoteMta, ...j.recipients], q.search));
          const sorted = sortRows(rows, q.sort ?? [{ id: "createdAt", dir: "desc" }], (j, id) => (id === "recipients" ? j.recipients[0]! : (j[id as keyof OutboundJob] as string | number)));
          return clone(paginate(sorted, q));
        }),
      get: (id) => wait(() => clone(jobs.find((j) => j.id === id) ?? (() => { throw notFound(id); })())),
      retry: (id) =>
        wait(() => {
          const j = jobs.find((x) => x.id === id);
          if (!j) throw notFound(id);
          j.status = "PENDING";
          j.nextRetry = iso(Date.now());
          j.updatedAt = iso(Date.now());
          record("queue.retry", id);
          return clone(j);
        }),
      flush: (domain) =>
        wait(() => {
          const hit = jobs.filter((j) => j.status === "TRANSIENT_FAILURE" && (!domain || j.recipients.some((r) => r.endsWith(`@${domain}`))));
          hit.forEach((j) => ((j.status = "PENDING"), (j.nextRetry = iso(Date.now()))));
          record("queue.flush", domain ?? "all", `flushed ${hit.length} jobs`);
          return { flushedJobs: hit.length };
        }),
      remove: (id) =>
        wait(() => {
          const i = jobs.findIndex((j) => j.id === id);
          if (i >= 0) jobs.splice(i, 1);
          record("queue.delete", id);
        }),
    },
    trace: {
      list: (q) =>
        wait(() => {
          const protocols = filterValues(q.filters, "protocol");
          const statuses = filterValues(q.filters, "status");
          const rows = traces.filter((t) => (!protocols.length || protocols.includes(t.protocol)) && (!statuses.length || statuses.some((s) => (s === "error" ? t.status >= 400 : t.status < 400))) && matchText([t.path, t.operation, t.userAgent, t.principal, t.traceId, ...t.responseCodes], q.search));
          const sorted = sortRows(rows, q.sort ?? [{ id: "startedAt", dir: "desc" }], (t, id) => t[id as keyof TraceSummary] as string | number);
          return clone(paginate(sorted, q));
        }),
      get: (id) => wait(() => exchange(traces.find((t) => t.traceId === id) ?? (() => { throw notFound(id); })())),
      tail: (onTrace, o) => {
        const proto = o?.protocol;
        (o?.backlog ? traces.filter((t) => !proto || t.protocol === proto).slice(0, o.backlog).reverse() : []).forEach((t) => queueMicrotask(() => onTrace(clone(t))));
        const timer = setInterval(() => {
          const base = traces[tailSeq++ % traces.length]!;
          const t: TraceSummary = { ...base, traceId: `tr_live_${tailSeq}`, startedAt: iso(Date.now()) };
          if (!proto || t.protocol === proto) onTrace(t);
        }, 1500);
        return () => clearInterval(timer);
      },
    },
    admin: {
      systemInfo: () => wait(() => ({ version: "0.9.3", commit: "a1b2c3d", uptime: iso(NOW - 9 * DAY - 4 * HOUR), componentStatus: { smtp: "SERVING", submission: "SERVING", imap: "SERVING", pop3: "NOT_SERVING", jmap: "SERVING", dav: "SERVING", exchange: "SERVING", storage: "SERVING", calendar: "SERVING", contacts: "SERVING", mta: "DEGRADED" } })),
      triggerGarbageCollection: (r) =>
        wait(() => {
          const purged = r.force ? gcTombstones : Math.floor(gcTombstones / 2);
          gcTombstones -= purged;
          record("gc.run", "storage", `purged ${purged} blobs`);
          return { purgedBlobsCount: purged, freedBytes: purged * 84_000 };
        }),
    },
    storage: {
      runGC: (r) =>
        wait(() => {
          const candidates = gcTombstones;
          if (r.apply) gcTombstones = 0;
          record("gc.run", "storage", r.apply ? `purged ${candidates}` : "dry run");
          return { candidates, purged: r.apply ? candidates : 0, freedBytes: r.apply ? candidates * 84_000 : 0, applied: r.apply };
        }),
      purgeExpired: (r) =>
        wait(() => {
          record("storage.purge", "messages", r.dryRun ? "dry run" : "applied");
          return { purgedMappings: r.dryRun ? 0 : 1_284, purgedMessages: r.dryRun ? 0 : 1_102 };
        }),
      repairThreads: (r) =>
        wait(() => {
          record("storage.repair-threads", r.accountId || "all", r.dryRun ? "dry run" : "applied");
          return { scanned: 18_402, updated: r.dryRun ? 0 : 37, unresolved: 2, splitThreads: 5, backfilled: 0 };
        }),
      stats: () => wait(() => ({ usedBytes: 312.4 * GB, capacityBytes: 500 * GB, blobCount: 1_284_330, tombstones: gcTombstones, messageCount: 2_948_113 })),
    },
    calendar: {
      listResources: (kind) =>
        wait(() =>
          accounts
            .filter((a) => (kind ? a.kind === kind : a.kind === "room" || a.kind === "equipment"))
            .map((a): Calendar => ({ id: `cal_${a.id}`, accountId: a.id, name: a.displayName, color: a.kind === "room" ? "#54a2ff" : "#9b59b6", role: "resource", syncToken: 12, createdAt: iso(NOW - 120 * DAY) })),
        ),
      getResourcePolicy: (id) => wait(() => clone(resourcePolicies.get(id) ?? { accountId: id, autoAccept: true, allowConflicts: false, maxDurationMin: 480, approverGroup: "" })),
      setResourcePolicy: (p) =>
        wait(() => {
          resourcePolicies.set(p.accountId, { ...p });
          record("resource.policy", p.accountId);
          return clone(p);
        }),
    },
    contacts: {
      listAddressBooks: (id) =>
        wait(() => [
          { id: `ab_${id}_1`, accountId: id, name: "Contacts", syncToken: 41, createdAt: iso(NOW - 300 * DAY) },
          { id: `ab_${id}_2`, accountId: id, name: "Customers", syncToken: 7, createdAt: iso(NOW - 120 * DAY) },
        ]),
      searchGAL: (q) =>
        wait(() => {
          const kinds = filterValues(q.filters, "kind");
          const rows = accounts
            .filter((a) => (!kinds.length || kinds.includes(a.kind)) && matchText([a.displayName, a.email, a.department, a.title, ...a.aliases], q.search))
            .map((a, i): GALEntry => ({ accountId: a.id, dn: `CN=${a.displayName},OU=${a.kind},DC=pilab,DC=hu`, kind: a.kind, displayName: a.displayName, email: a.email, aliases: a.aliases, title: a.title, department: a.department, company: a.company, office: a.office, phone: a.phone, mobile: a.mobile, photoHash: a.id === "acc_gyula" || i % 4 === 0 ? `sha256:${(0xabc000 + i * 4099).toString(16)}` : "", hidden: false, disabled: a.status === "suspended", syncedAt: iso(NOW - 15 * MIN) }));
          return clone(paginate(sortRows(rows, q.sort ?? [{ id: "displayName", dir: "asc" }], (e, id) => e[id as keyof GALEntry] as string), q));
        }),
      deleteGALPhoto: (id) =>
        wait(() => {
          record("gal.photo.delete", id);
        }),
    },
    ext: {
      audit: (q) =>
        wait(() => {
          const res = filterValues(q.filters, "result");
          const rows = audit.filter((e) => (!res.length || res.includes(e.result)) && matchText([e.actor, e.action, e.target, e.detail], q.search));
          return clone(paginate(sortRows(rows, q.sort ?? [{ id: "time", dir: "desc" }], (e, id) => e[id as keyof AuditEvent]), q));
        }),
      settings: () => wait(() => ({ ...settings })),
      setSettings: (s) =>
        wait(() => {
          settings = { ...s };
          record("settings.update", "system");
          return { ...settings };
        }),
      listeners: () =>
        wait((): ServiceListener[] => [
          { service: "smtp", address: ":25", protocol: "SMTP", tls: "starttls", status: "up", connections: 14 },
          { service: "submission", address: ":587", protocol: "SMTP submission", tls: "starttls", status: "up", connections: 31 },
          { service: "submission", address: ":465", protocol: "SMTPS", tls: "implicit", status: "up", connections: 9 },
          { service: "imap", address: ":143", protocol: "IMAP4rev2", tls: "starttls", status: "up", connections: 212 },
          { service: "imap", address: ":993", protocol: "IMAPS", tls: "implicit", status: "up", connections: 388 },
          { service: "pop3", address: ":110", protocol: "POP3", tls: "starttls", status: "down", connections: 0 },
          { service: "pop3", address: ":995", protocol: "POP3S", tls: "implicit", status: "down", connections: 0 },
          { service: "jmap", address: ":8085", protocol: "JMAP + SSE", tls: "none", status: "up", connections: 76 },
          { service: "dav", address: ":8443", protocol: "CalDAV / CardDAV", tls: "implicit", status: "up", connections: 23 },
          { service: "exchange", address: ":8445", protocol: "EWS / Autodiscover", tls: "implicit", status: "up", connections: 57 },
        ]),
      certificates: () =>
        wait((): TlsCertificate[] => [
          { id: "cert_1", subject: "mail.pilab.hu", sans: ["mail.pilab.hu", "imap.pilab.hu", "smtp.pilab.hu"], issuer: "Let's Encrypt R11", notAfter: iso(NOW + 62 * DAY), usedBy: ["smtp", "submission", "imap", "pop3"] },
          { id: "cert_2", subject: "autodiscover.pilab.hu", sans: ["autodiscover.pilab.hu", "ews.pilab.hu"], issuer: "Let's Encrypt R11", notAfter: iso(NOW + 9 * DAY), usedBy: ["exchange", "dav"] },
          { id: "cert_3", subject: "jmap.pilab.hu", sans: ["jmap.pilab.hu"], issuer: "PiLab internal CA", notAfter: iso(NOW - 3 * DAY), usedBy: ["jmap"] },
        ]),
      transportPolicy: () => wait(() => clone(transport)),
      setTransportPolicy: (p) =>
        wait(() => {
          transport = clone(p);
          record("policy.update", "transport");
          return clone(transport);
        }),
      clientAccess: () => wait(() => ({ ...access })),
      setClientAccess: (c) =>
        wait(() => {
          access = { ...c };
          record("policy.update", "client-access", Object.entries(c).filter(([, v]) => v).map(([k]) => k).join(", "));
          return { ...access };
        }),
      services: () =>
        wait((): ServiceStatus[] => [
          { id: "smtp", name: "SMTP (MX)", health: "up", ports: "25", version: "0.9.3" },
          { id: "submission", name: "Submission", health: "up", ports: "587, 465", version: "0.9.3" },
          { id: "imap", name: "IMAP", health: "up", ports: "143, 993", version: "0.9.3" },
          { id: "pop3", name: "POP3", health: "down", ports: "110, 995", version: "0.9.3" },
          { id: "jmap", name: "JMAP", health: "up", ports: "8085", version: "0.9.3" },
          { id: "dav", name: "CalDAV / CardDAV", health: "up", ports: "8443", version: "0.9.3" },
          { id: "exchange", name: "EWS", health: "up", ports: "8445", version: "0.9.3" },
          { id: "storage", name: "Storage", health: "up", ports: "9090", version: "0.9.3" },
          { id: "calendar", name: "Calendar", health: "up", ports: "9094", version: "0.9.3" },
          { id: "contacts", name: "Contacts", health: "up", ports: "9096", version: "0.9.3" },
          { id: "mta", name: "MTA", health: "degraded", ports: "—", version: "0.9.3" },
        ]),
      metrics: () =>
        wait(() => ({
          queueDepth: wave(48, 30 * MIN, 14, 9, 1),
          delivered: wave(48, 30 * MIN, 220, 90, 2),
          deferred: wave(48, 30 * MIN, 12, 8, 3),
          spamRejected: wave(48, 30 * MIN, 85, 40, 4),
          greylisted: wave(48, 30 * MIN, 30, 14, 5),
          storageUsedBytes: 312.4 * GB,
          storageCapacityBytes: 500 * GB,
          blobCount: 1_284_330,
        })),
    },
  };
}
