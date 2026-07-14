# Contributing

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

```bash
npm install
```

## Development

### Run Storybook

```bash
npm run storybook
```

Opens at `http://localhost:6007`. Stories are co-located with components at `src/components/<Name>/<Name>.stories.tsx`.

### Run tests

```bash
npm test
```

### Lint & format

```bash
npm run lint
npm run format:check
```

### Build the library

```bash
npm run build
```

Outputs to `dist/`. Only the public API from `src/index.ts` is included — stories and tests are excluded.

## Adding a Component

See [AGENTS.md](AGENTS.md) for the full component authoring guide, including file structure, style hooks, and testing patterns.

## Adding a Story

Create `src/components/<Name>/<Name>.stories.tsx`. Use the existing Button stories as a reference:

- Use `satisfies Meta<typeof VscComponent>` for type-safe meta.
- Add `tags: ['autodocs']` to generate a docs page automatically.
- Use the args pattern for the primary story so controls work in the docs page.
- Use gallery-style stories (no args) for showcasing variants.

## Storybook Theming

The Storybook instance supports dark/light theme switching via a toolbar toggle. Key files:

| File                           | Purpose                                               |
| ------------------------------ | ----------------------------------------------------- |
| `.storybook/themes.ts`         | Fluent theme composition with VS Code token overrides |
| `.storybook/ThemeEffect.tsx`   | Sets body class + CSS vars for canvas backgrounds     |
| `.storybook/DocsContainer.tsx` | Dynamic docs theme switching based on scheme global   |
| `.storybook/manager.ts`        | Switches sidebar/toolbar theme on toggle              |
| `.storybook/preview-head.html` | Minimal CSS overrides for docs chrome                 |

## Publishing

The package is published to npm by GitHub Actions. The release runs at
18:00 Beijing time every Thursday. It can also be started manually.

### How it works

1. The workflow is defined in `.github/workflows/publish.yml`.
2. It compares `main` with the latest `vX.Y.Z` release tag.
3. It exits without publishing when there are no changes.
4. Changes in two or more component folders trigger a minor bump.
5. All other changes trigger a patch bump.
6. It validates the package and opens a version bump pull request.
7. It merges the pull request, creates the tag, and publishes to npm.

The minor rule counts unique folders under `src/components`. A minor
bump resets the patch number to zero.

The first run can bootstrap a repository without tags. It finds the
commit that introduced the version currently published to npm and uses
that commit as the comparison base.

If npm publishing fails after the release tag is pushed, rerun the
workflow manually. It detects the unpublished tag and retries that exact
release instead of bumping again.

If the version pull request merges before another release step fails,
the rerun detects the unpublished version on `main` and resumes without
creating another version bump.

### Repository setup

Configure an npm trusted publisher for this GitHub repository and set
the workflow filename to `publish.yml`. The workflow authenticates with
OIDC, so an `NPM_TOKEN` secret is not required.

Add a `RELEASE_TOKEN` repository secret containing a fine-grained
personal access token. Grant it read and write access to repository
contents and pull requests. The token owner must be able to merge pull
requests into `main`.
