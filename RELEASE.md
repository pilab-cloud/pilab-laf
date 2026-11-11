# Release checklist

## Prerequisites

- npm user with publish access to the `@pilab` scope
- `bun` and Node 22
- Clean working tree on `main`, CI green

## Local release

```bash
bun install --frozen-lockfile
bun run typecheck
bun run test
bun run build          # dist/ is committed; include it in the release commit
bun run e2e            # visual + a11y checks (Playwright)
bun run pack           # inspect the tarball
```

Log in to npm and publish:

```bash
npm login              # use the npm user with @pilab access
npm publish --access public
```

`prepublishOnly` runs typecheck, tests and build before publishing.

## Versioning

Move the `## Unreleased` entries of `CHANGELOG.md` under the new version
heading first, then:

```bash
npm version patch      # or minor / major; creates the commit and v* tag
git push --follow-tags
```

Breaking changes need a note in `docs/MIGRATION.md`.

## GitHub Actions release

`.github/workflows/publish.yml` runs on a published GitHub release or a
manual dispatch.

1. Add the npm automation token as the `NPM_TOKEN` repository secret:
   **Settings → Secrets and variables → Actions → New repository secret**.
2. Create a GitHub release for the `vX.Y.Z` tag. The workflow checks the tag
   matches `package.json`, runs typecheck, tests and build, then publishes with
   npm provenance.
3. A manual run from the Actions tab publishes the current `main`.

Never commit an npm token to the repository.

## npm scope

```
@pilab/laf
```

The authenticated npm user must have publish rights to the `@pilab` scope.
