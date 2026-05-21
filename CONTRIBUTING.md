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

| File                           | Purpose                                              |
| ------------------------------ | ---------------------------------------------------- |
| `.storybook/themes.ts`         | Fluent theme composition with VS Code token overrides |
| `.storybook/ThemeEffect.tsx`   | Sets body class + CSS vars for canvas backgrounds     |
| `.storybook/DocsContainer.tsx` | Dynamic docs theme switching based on scheme global   |
| `.storybook/manager.ts`        | Switches sidebar/toolbar theme on toggle              |
| `.storybook/preview-head.html` | Minimal CSS overrides for docs chrome                 |

## Publishing

The package is published to npm automatically via GitHub Actions. No manual `npm publish` is needed.

### How it works

1. The workflow is defined in `.github/workflows/publish.yml`.
2. When a push to `main` changes `package.json`, it compares the version field to the previous commit.
3. If the version has changed, it runs `npm ci` and `npm publish` using the `NPM_TOKEN` secret.
4. The `prepublishOnly` script automatically runs `build`, `typecheck`, `lint`, and `test` before publishing.

### Release steps

1. Bump the `version` in `package.json`.
2. Commit and push to `main`.
3. The GitHub Actions workflow handles the rest.
