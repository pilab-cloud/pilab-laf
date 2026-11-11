# Mail admin demo (`?demo=mail-admin`)

An Exchange-Admin-Center-style panel for the self-hosted **pimail** server, built entirely from LAF components on top of a typed in-memory mock API (`playground/pages/mail-admin/api.ts`). Types in `types.ts` mirror the proto messages in `pimail/api/proto/pimail/*/v1`, so a real app swaps `createMockMailApi()` for connect-rpc clients behind the same `MailApi` interface. Run it with `bun run dev` and open `?demo=mail-admin`.

## New library components (`lib/components/mail.tsx`)

`QueueStatusBadge`, `QuotaBar`, `ServiceTile`, `HealthGrid`, `DnsRecordTable`, `TraceTimeline` (+ types). Strings: `messages.components.mail` (en, hu).

## Page mapping

| UI page | pimail RPCs | LAF components |
|---|---|---|
| Dashboard | `AdminService.GetSystemInfo` (component_status), `MtaService.GetQueueStats`, `StorageService` quota/usage, `TraceService.ListTraces` | `MetricGrid`, `StatusSummaryCard`, `HealthGrid`, `AreaChart`, `DonutChart`, `UtilizationCard`, `AlertGroup` |
| Recipients → Mailboxes | `AccountService.ListAccounts/GetAccount/EnsureAccount/UpdateAccount/DeleteAccount`, `MailboxService` ACL, send-as, app passwords, Sieve, vacation | `ServerDataGrid`, `Wizard`, `DrawerPanel`, `Tabs`, `QuotaBar`, `PermissionMatrix`, `ConfirmDialog` |
| Recipients → Groups | `AccountService` (kind=group), membership via `EnsureAccount`/`UpdateAccount` | `ServerDataGrid`, `TransferList` |
| Recipients → Shared & resources | `AccountService` (shared/room/equipment), `CalendarService` resource policy | `Tabs`, `ServerDataGrid`, form controls |
| Mail flow → Queue | `MtaService.ListOutboundJobs/GetOutboundJob/RetryOutboundJob/FlushQueue/GetQueueStats` | `ServerDataGrid`, `QueueStatusBadge`, `ConfirmDialog`, `DrawerPanel` |
| Mail flow → Message trace | `TraceService.ListTraces/GetTrace` (+ tail by polling) | `ServerDataGrid`, `TraceTimeline`, `EventConsole`, `LogViewer` |
| Mail flow → Domains | `DomainService.List/Create/Delete`, DKIM generate/activate/delete | `Wizard`, `DnsRecordTable`, `CopyButton`, `Tabs` |
| Mail flow → Policies | none (mock) | forms, `Switch`, `Card` |
| Protocols | `AdminService.GetSystemInfo` (status only) | `HealthGrid`, `Switch`, `Card` |
| Storage | `StorageService` GC / repair / purge RPCs | `MetricCard`, `Button`, `ConfirmDialog`, `Progress` |
| Contacts / GAL | `ContactsService` address books, `SearchGAL` | `ServerDataGrid`, `Avatar` |
| Audit log | none (mock) | `ServerDataGrid`, `FilterBar` |
| Settings | `AdminService.GetSystemInfo` | `DescriptionList`, `Card` |

## Backend gaps (pimail)

1. **No list-groups RPC**: groups are accounts with `kind=group`; `ListAccounts` is keyset-only with no search, sort or kind filter.
2. **No audit RPC**: admin actions are not recorded or queryable.
3. **No settings / SystemInfo detail** beyond `component_status`; `uptime` is a Timestamp, no version/config.
4. **No TLS certificate RPC** (subject, expiry, SANs, reload).
5. **No listeners RPC**: per-protocol addresses/ports/TLS mode are not discoverable; services are not enumerable.
6. **No transport-policy RPCs** (rate limits, DNSBL, greylisting, DLP) and **no client-access toggles** (IMAP/POP3/JMAP/EWS/DAV per account or global).
7. **No `DeleteOutboundJob`**; `ListOutboundJobs` has no paging, search or status filter.
8. **`ListTraces`** has an offset but no sort or total.
9. **No SetQuota RPC** and no blob / mailbox statistics.
10. **No live DNS verification RPC** (MX/SPF/DKIM/DMARC/MTA-STS check); the UI helper needs it server-side.
11. **No metrics query RPC** for delivery rate / spam / greylist time series.
12. **No admin GAL list**; only `SearchGAL`.
13. **No admin-UI auth**: gRPC ports are loopback-only. A connect / grpc-web gateway with authentication (and per-RPC authorisation) is required.

## Proposed `../pimail/web`

```
web/
  package.json          # vite, react, @pilab/laf, @connectrpc/connect(-web), @bufbuild/protobuf, @pilab/shadow-sso
  vite.config.ts        # dev proxy /rpc -> gateway
  buf.gen.yaml          # protoc-gen-es + connect-es into src/gen
  src/
    gen/                # generated from api/proto
    api/                # MailApi implementation over connect clients (same interface as the mock)
    auth/               # shadow-sso OIDC session, token interceptor
    pages/              # copied from playground/pages/mail-admin (pages are API-agnostic)
    main.tsx
```

Serve the built bundle from the gateway (`embed.FS`), terminate auth there (validate shadow-sso tokens, map to an admin role), and expose gRPC through connect on the same origin.
