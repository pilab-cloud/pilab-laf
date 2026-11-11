# pilab-laf — Pilab Look & Feel

Design system for Shadow SSO auth pages and the admin panel, and the vSphere-replacement frontend (React kit in `lib/`; components are specified in `COMPONENTS.md`).

| File | What |
|------|------|
| [`COMPONENTS.md`](COMPONENTS.md) | **Normative per-component spec** (tokens, states, a11y, React/shadcn mapping, rules for agents). Start here. |
| [`docs/design.md`](docs/design.md) | Design rationale for the v1 pack (shipped entries: `COMPONENTS.md` §4.62). |
| [`docs/MIGRATION.md`](docs/MIGRATION.md) | Upgrading to 1.0. |
| [`docs/roadmap.md`](docs/roadmap.md) | Milestones M0–M6 to 1.0 with exit criteria. |
| [`styleguide.html`](styleguide.html) | Live visual reference; open in a browser. |
| `src/app.css`, `src/admin.css` | Tokens + component CSS (Tailwind v4). Source of truth for values. |
| `src/guide.css` | Chrome for the styleguide page only. |
| `dist/` | Built CSS (committed). |
| `fonts/` | Self-hosted Lato (OFL). |

Core rules: dark only · Lato · border radius ≤ 4px · tokens only, no inline styles · primary comes from `--primary`.

## Develop (bun)

```bash
bun install
bun run dev        # CSS watcher + Vite playground → http://localhost:5173
bun run build      # CSS + tsup → dist/index.{js,cjs,d.ts}, dist/app.css
bun run typecheck
bun run test       # vitest + axe smoke/keyboard tests (tests/)
bun run sync       # build CSS and copy app.css + fonts into shadow-sso webauth/static
```

Kit: `lib/` (`@pilab/laf`, React 18+; Radix for dialog/popover/menu/tabs/tooltip, `cva` + `cn`).
Playground: `playground/` (aliases `@pilab/laf` to `lib/`, hot reload). Consumers import
`@pilab/laf/styles.css` once. Components render the CSS classes from `src/`; specs in `COMPONENTS.md`.

## Install & use

```bash
bun add @pilab/laf react react-dom
```

```tsx
import "@pilab/laf/styles.css";
import { LafProvider, Button } from "@pilab/laf";
import { hu } from "@pilab/laf/locales/hu";

<LafProvider locale="hu" messages={hu} timeZone="Europe/Budapest">
  <Button>Mentés</Button>
</LafProvider>
```

### Entries

| Import | Contents | Optional peer deps |
|---|---|---|
| `@pilab/laf` | core components, `LafProvider`, formatters | — |
| `@pilab/laf/charts` | Sparkline, Line/Bar/Donut/Gauge, TimeSeries, PerfPanel | `@visx/*` |
| `@pilab/laf/editor` | code/Markdown editor, diff view | `@codemirror/*`, markdown stack |
| `@pilab/laf/dnd` | sortable lists and boards | `@dnd-kit/*` |
| `@pilab/laf/topology` | `TopologyGraphFlow` | `@xyflow/react` |
| `@pilab/laf/locales/hu` | Hungarian catalogue | — |

Install only the peers of the entries you import. Bundle budgets are enforced in `tests/treeshake.test.ts`.
Run `bun run dev` for the playground (every component, three demo apps). Upgrading: see `docs/MIGRATION.md`.
