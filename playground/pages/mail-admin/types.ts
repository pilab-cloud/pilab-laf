/**
 * Types mirroring the pimail protobuf messages (api/proto/pimail/**), in the camelCase shape protoc-gen-es / connect-es
 * generates. Differences from generated code, all deliberate so a real client can be swapped in behind `MailApi`:
 *  - `Timestamp` is an ISO-8601 string (connect-es: `{ seconds: bigint, nanos: number }`; convert in the adapter).
 *  - 64-bit integers are `number` (connect-es: `bigint`).
 *  - enums are string unions of the value names without their prefix.
 * Types under "GAP" have NO counterpart in the current protos; they are what a real UI needs the backend to add.
 */
export type Timestamp = string;

/* ── pimail.storage.v1 · AccountService ── */
export type AccountKind = "user" | "shared-mailbox" | "room" | "equipment" | "group";
export type AccountStatus = "active" | "suspended";

/** AccountInfo (ListAccounts) merged with the ResolveRecipientResponse fields. */
export interface AccountInfo {
  id: string;
  kind: AccountKind;
  status: AccountStatus;
  email: string;
  updatedAt: Timestamp;
  displayName: string;
  aliases: string[];
  title: string;
  department: string;
  company: string;
  office: string;
  phone: string;
  mobile: string;
  managerId: string;
  members: string[];
  internalOnly: boolean;
  imAddress: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  homePhone: string;
  businessPhone2: string;
  fax: string;
  assistant: string;
  webPage: string;
}

export interface EnsureAccountRequest {
  accountId: string;
  sourceRef: string;
  email: string;
  kind: AccountKind;
  quotaBytes: number;
}
export interface GetQuotaResponse {
  quotaBytes: number;
  usedBytes: number;
}
export type SetAccountProfileRequest = Partial<Omit<AccountInfo, "id" | "kind" | "status" | "email" | "updatedAt" | "aliases" | "members" | "internalOnly">> & { accountId: string };

export interface SendAsGrant {
  principalId: string;
  fromAddress: string;
  kind: "send-as" | "on-behalf";
  createdAt: Timestamp;
}
export interface AppPasswordInfo {
  id: string;
  accountId: string;
  label: string;
  scopes: string[];
  createdAt: Timestamp;
  lastUsedAt?: Timestamp;
  revokedAt?: Timestamp;
}
export interface CreateAppPasswordResponse {
  id: string;
  secret: string;
}
export interface SieveScript {
  id: string;
  accountId: string;
  name: string;
  body: string;
  active: boolean;
  updatedAt: Timestamp;
}
export interface VacationResponse {
  accountId: string;
  isEnabled: boolean;
  fromDate?: Timestamp;
  toDate?: Timestamp;
  subject: string;
  textBody: string;
  htmlBody: string;
  updatedAt?: Timestamp;
}

/* ── pimail.storage.v1 · MailboxService ── */
export interface MailboxACLGrant {
  accountId: string;
  mailboxId?: string;
  granteeId: string;
  rights: string[];
  granteeEmail: string;
  granteeDisplayName: string;
}

/* ── pimail.storage.v1 · DomainService ── */
export type DomainKind = "PRIMARY" | "ALIAS";
export interface Domain {
  name: string;
  kind: DomainKind;
  aliasOf: string;
  isDefault: boolean;
  status: string;
  createdAt: Timestamp;
  activeDkimSelector: string;
}
export interface DKIMKey {
  domain: string;
  selector: string;
  publicKeyPem: string;
  active: boolean;
  createdAt: Timestamp;
  retiredAt?: Timestamp;
}
export interface GenerateDKIMKeyResponse {
  key: DKIMKey;
  dnsName: string;
  dnsValue: string;
}
export interface GetDKIMDNSRecordResponse {
  domain: string;
  selector: string;
  dnsName: string;
  dnsValue: string;
}

/* ── pimail.storage.v1 · StorageService (queue, GC, maintenance) ── */
export type OutboundStatus = "PENDING" | "DELIVERED" | "TRANSIENT_FAILURE" | "PERMANENT_FAILURE";
export interface OutboundJob {
  id: string;
  accountId: string;
  sender: string;
  recipients: string[];
  status: OutboundStatus;
  attempts: number;
  remoteMta: string;
  smtpResponse: string;
  nextRetry?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  size: number;
}
export interface RunGCResponse {
  candidates: number;
  purged: number;
  freedBytes: number;
  applied: boolean;
}
export interface PurgeExpiredMessagesResponse {
  purgedMappings: number;
  purgedMessages: number;
}
export interface RepairThreadsResponse {
  scanned: number;
  updated: number;
  unresolved: number;
  splitThreads: number;
  backfilled: number;
}

/* ── pimail.mta.v1 ── */
export interface GetQueueStatsResponse {
  pendingCount: number;
  inFlightCount: number;
  retryCount: number;
  failedCount: number;
}

/* ── pimail.trace.v1 ── */
export interface TraceSummary {
  traceId: string;
  startedAt: Timestamp;
  durationMs: number;
  protocol: string;
  operation: string;
  accountId: string;
  principal: string;
  method: string;
  path: string;
  status: number;
  requestBytes: number;
  responseBytes: number;
  userAgent: string;
  clientIp: string;
  responseCodes: string[];
  sessionId: string;
  sessionSeq: number;
  error: string;
  streamed: boolean;
}
export interface Header {
  name: string;
  value: string;
}
/** HTTPExchange with bodies as text (the wire type is `bytes`). */
export interface HTTPExchange {
  summary: TraceSummary;
  query: string;
  contentType: string;
  requestHeaders: Header[];
  responseHeaders: Header[];
  requestBody: string;
  responseBody: string;
}

/* ── pimail.admin.v1 ── */
export interface GetSystemInfoResponse {
  version: string;
  commit: string;
  /** Proto declares this a Timestamp: the process start time, not a duration. */
  uptime: Timestamp;
  componentStatus: Record<string, string>;
}
export interface TriggerGarbageCollectionResponse {
  purgedBlobsCount: number;
  freedBytes: number;
}

/* ── pimail.calendar.v1 / pimail.contacts.v1 ── */
export interface Calendar {
  id: string;
  accountId: string;
  name: string;
  color: string;
  role: string;
  syncToken: number;
  createdAt: Timestamp;
}
export interface ResourcePolicy {
  accountId: string;
  autoAccept: boolean;
  allowConflicts: boolean;
  maxDurationMin: number;
  approverGroup: string;
}
export interface AddressBook {
  id: string;
  accountId: string;
  name: string;
  syncToken: number;
  createdAt: Timestamp;
}
export interface GALEntry {
  accountId: string;
  dn: string;
  kind: string;
  displayName: string;
  email: string;
  aliases: string[];
  title: string;
  department: string;
  company: string;
  office: string;
  phone: string;
  mobile: string;
  photoHash: string;
  hidden: boolean;
  disabled: boolean;
  syncedAt: Timestamp;
}

/* ── GAP: no RPC today ── */
/** GAP: no audit RPC or table exists. */
export interface AuditEvent {
  id: string;
  time: Timestamp;
  actor: string;
  action: string;
  target: string;
  result: "success" | "failure";
  detail: string;
  sourceIp: string;
}
/** GAP: per-daemon listeners live only in config/systemd. */
export interface ServiceListener {
  service: string;
  address: string;
  protocol: string;
  tls: "implicit" | "starttls" | "none";
  status: "up" | "degraded" | "down";
  connections: number;
}
/** GAP: certificates are loaded from disk by each daemon; no RPC reports them. */
export interface TlsCertificate {
  id: string;
  subject: string;
  sans: string[];
  issuer: string;
  notAfter: Timestamp;
  usedBy: string[];
}
/** GAP: rate limits, DNSBL, greylisting and DLP are daemon config. */
export interface TransportPolicy {
  rateLimit: { perMinute: number; perHour: number; burst: number };
  dnsbl: { enabled: boolean; zones: string[]; rejectScore: number };
  greylist: { enabled: boolean; delaySeconds: number; whitelistTrusted: boolean };
  dlp: { enabled: boolean; mode: "monitor" | "block"; patterns: string[] };
}
/** GAP: per-protocol client access is config only. */
export interface ClientAccess {
  imap: boolean;
  pop3: boolean;
  jmap: boolean;
  ews: boolean;
  dav: boolean;
}
export interface MailSettings {
  systemName: string;
  defaultDomain: string;
  maxMessageBytes: number;
  retentionDays: number;
  trashRetentionDays: number;
}
/** GAP: metrics come from Prometheus today; the UI needs a query surface (or a pre-aggregated RPC). */
export interface DashboardMetrics {
  queueDepth: [number, number][];
  delivered: [number, number][];
  deferred: [number, number][];
  spamRejected: [number, number][];
  greylisted: [number, number][];
  storageUsedBytes: number;
  storageCapacityBytes: number;
  blobCount: number;
}
export interface ServiceStatus {
  id: string;
  name: string;
  health: "up" | "degraded" | "down" | "unknown";
  ports: string;
  version: string;
}
