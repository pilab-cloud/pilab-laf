<div align="center">

# @pilab/laf

**Pilab Look & Feel: a dark, dense, accessible React component kit for admin UIs.**

[![npm version](https://img.shields.io/npm/v/@pilab/laf.svg?logo=npm&color=54a2ff)](https://www.npmjs.com/package/@pilab/laf)
[![npm downloads](https://img.shields.io/npm/dm/@pilab/laf.svg?color=22d3ee)](https://www.npmjs.com/package/@pilab/laf)
[![CI](https://github.com/pilab-cloud/pilab-laf/actions/workflows/ci.yml/badge.svg)](https://github.com/pilab-cloud/pilab-laf/actions/workflows/ci.yml)
[![types](https://img.shields.io/npm/types/@pilab/laf.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%2B-61dafb.svg?logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![a11y](https://img.shields.io/badge/axe-0%20violations-brightgreen.svg)](./docs/a11y-audit.md)
[![license](https://img.shields.io/npm/l/@pilab/laf.svg)](./LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/pilab-cloud/pilab-laf/pulls)

</div>

## About

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
| `@pilab/laf/os-icons` | OS / distro icon set | — |
| `@pilab/laf/console` | `Terminal` (xterm) and `VncConsole` (noVNC); see `docs/console.md` | `@xterm/*`, `@novnc/novnc` |
| `@pilab/laf/locales/hu` | Hungarian catalogue | — |

Install only the peers of the entries you import. Bundle budgets are enforced in `tests/treeshake.test.ts`.
Run `bun run dev` for the playground (every component, three demo apps). Upgrading: see `docs/MIGRATION.md`.

## Releasing

Releases are published to npm by `.github/workflows/publish.yml` when a GitHub release is created. See [`RELEASE.md`](RELEASE.md) for the checklist and [`CHANGELOG.md`](CHANGELOG.md) for history.

## Contributing

PRs are welcome. CI runs typecheck, unit tests, build and Playwright (visual + axe) checks; run the same locally before opening a PR. Follow the rules in `COMPONENTS.md` (tokens only, radius ≤ 4px, no hard-coded strings).

## License

[MIT](./LICENSE) © Progressive Innovation LAB
