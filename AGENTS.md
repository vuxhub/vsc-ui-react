# Agent Instructions

This project provides VS Code–styled React components built on top of **Fluent UI React v9** (`@fluentui/react-components`). Components wrap Fluent primitives and override their styles with VS Code design tokens (`--vscode-*` CSS custom properties) using **Griffel CSS-in-JS** (`makeStyles` / `mergeClasses`).

## Directory Structure

```
src/
├── index.ts                  # Public barrel – exports all components & types
├── types.ts                  # Shared type aliases (e.g. VscValidationState)
├── global.d.ts               # Global type declarations (currently empty)
├── styles/
│   └── tokens.ts             # Shared design tokens (vscFontFamily, etc.)
└── components/
    └── <ComponentName>/      # One folder per component group
        ├── index.ts          # Barrel re-exports for the folder
        ├── Vsc<Name>.tsx     # React component(s)
        ├── use<Name>Styles.ts  # Griffel style hooks
        └── <Name>.stories.tsx  # Storybook stories (co-located)

.storybook/                   # Storybook configuration
├── main.ts                   # Framework, addons, story globs
├── preview.tsx               # Decorators, globals, parameters
├── manager.ts                # Manager theme switching
├── themes.ts                 # Fluent themes composed with VS Code tokens
├── ThemeEffect.tsx           # Body class + CSS var injection for canvas
├── DocsContainer.tsx         # Dynamic docs theme based on scheme global
├── DocsPage.tsx              # Custom docs page layout
├── preview-head.html         # Minimal CSS overrides for docs chrome
└── theme-tokens.css          # VS Code design token CSS variables

test/
├── setupTests.ts             # Vitest setup (imports jest-dom matchers)
└── Vsc<Name>.test.tsx        # Unit tests per component

playground/                   # Dev playground (Vite)
```

## Adding a New Component

Follow these steps when creating a new component named `Foo`:

### 1. Create the folder

```
src/components/Foo/
├── index.ts
├── VscFoo.tsx
└── useFooStyles.ts
```

### 2. Style hook — `useFooStyles.ts`

The style hook encapsulates all Griffel style logic. It **must**:

- Use `makeStyles` from `@fluentui/react-components` to define atomic class groups.
- Organise styles into logical sections with comment banners:
  - **Base** — root override styles applied to every instance.
  - **Permutations** — appearance, size, state variants (one `makeStyles` call per group or combined).
- Use `mergeClasses` to compose the final className based on props.
- Use VS Code CSS custom properties (`--vscode-*`) for all colors, borders, backgrounds, and focus rings. **Never** hardcode color values.
- Import shared tokens from `../../styles/tokens` (e.g. `vscFontFamily`).
- Import shared types from `../../types` when needed.
- Export a **typed options interface** and a **named hook function** that returns one or more className strings.

**Pattern:**

```ts
import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';
import { vscFontFamily } from '../../styles/tokens';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    // ... base overrides using --vscode-* tokens
  },
});

// ---------------------------------------------------------------------------
//  Permutation styles via makeStyles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  someVariant: {
    /* ... */
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseFooStylesOptions {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export function useFooStyles(options: UseFooStylesOptions) {
  const { size, disabled, className } = options;
  const base = useBaseStyles();
  const classes = useStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'small' && classes.someVariant,
    disabled && classes.disabled,
    className, // always last — allows consumer overrides
  );

  return { rootClassName };
}
```

### 3. Component — `VscFoo.tsx`

- Wrap the corresponding Fluent UI component (e.g. `Button`, `Input`, `Dropdown`).
- Use `forwardRef` to expose the underlying DOM element ref.
- Define a `VscFooProps` type that extends Fluent's props type (use `Omit` if you need to override a prop like `size`).
- Call the style hook to compute className(s) and pass them to the Fluent component via `className`.
- Set `displayName` on the component.

**Pattern:**

```tsx
import {
  SomeFluentComponent,
  type SomeFluentComponentProps,
} from '@fluentui/react-components';
import { forwardRef } from 'react';
import { useFooStyles } from './useFooStyles';

export type VscFooProps = SomeFluentComponentProps & {
  // Additional VS Code–specific props
};

export const VscFoo = forwardRef<HTMLElement, VscFooProps>(
  ({ size, className, disabled, ...rest }, ref) => {
    const { rootClassName } = useFooStyles({ size, disabled, className });

    return (
      <SomeFluentComponent
        ref={ref}
        size={size}
        disabled={disabled}
        className={rootClassName}
        {...rest}
      />
    );
  },
);

VscFoo.displayName = 'VscFoo';
```

### 4. Barrel — `index.ts`

```ts
export { VscFoo } from './VscFoo';
export type { VscFooProps } from './VscFoo';
```

### 5. Register in root barrel — `src/index.ts`

Add exports with a section comment:

```ts
// Foo
export { VscFoo } from './components/Foo';
export type { VscFooProps } from './components/Foo';
```

### 6. Unit test — `test/VscFoo.test.tsx`

- Use `vitest` (`describe`, `it`, `expect`, `vi`).
- Use `@testing-library/react` (`render`, `screen`, `fireEvent`).
- If the component requires Fluent context, wrap with `FluentProvider`:
  ```tsx
  import { FluentProvider, webLightTheme } from '@fluentui/react-components';
  const wrapper = ({ children }) => (
    <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
  );
  render(<VscFoo />, { wrapper });
  ```
- Test these concerns at minimum:
  - Renders the expected DOM element.
  - Forwards `ref`.
  - Merges custom `className`.
  - Produces distinct class names for different variants/states.
  - Handles `disabled` state.

## Style Conventions

| Rule                 | Detail                                                                    |
| -------------------- | ------------------------------------------------------------------------- |
| Colors               | Always use `--vscode-*` CSS variables. Never hardcode hex/rgb.            |
| Font                 | Use `vscFontFamily` from `src/styles/tokens.ts`.                          |
| Focus ring           | `outline: 1px solid var(--vscode-focusBorder); outline-offset: 2px;`      |
| Disabled             | `opacity: 0.4; cursor: not-allowed; pointer-events: none;`                |
| Transition           | Set `transition: none` to match VS Code's snappy feel.                    |
| Pseudo-element reset | Hide Fluent's `::after` focus indicator: `'::after': { display: 'none' }` |
| Border radius        | Typically `2px` for inputs, `4px` for buttons.                            |
| Box shadow           | `boxShadow: 'none'` — VS Code doesn't use shadows on form controls.       |

## Naming Conventions

- Component: `Vsc<Name>` (e.g. `VscButton`, `VscDropdown`).
- Props type: `Vsc<Name>Props`.
- Style hook: `use<Name>Styles` (exported function) / `use<Name>StylesHook`.
- Style hook options: `Use<Name>StylesOptions`.
- Folder: `src/components/<Name>/`.
- Test file: `test/Vsc<Name>.test.tsx`.

## Post-Task Verification

After completing **every** task (adding a component, modifying styles, fixing a bug, etc.), **always** run the following command to check and auto-fix lint/formatting issues:

```bash
npm run lint:fix && npm run format
```

If there are remaining errors that cannot be auto-fixed, resolve them before considering the task done.

For tasks that involve adding or modifying components, also run:

```bash
npm run typecheck && npm run test
```

This ensures all code committed to the repo is lint-clean, well-formatted, type-safe, and passes tests.

## Tech Stack Quick Reference

| Concern           | Tool                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| UI framework      | React 18/19                                                                 |
| Component library | Fluent UI React v9 (`@fluentui/react-components`)                           |
| CSS-in-JS         | Griffel (via Fluent's `makeStyles`, `mergeClasses`, `shorthands`)           |
| Icons             | Codicon (`@vscode/codicons`) preferred, fallback to `@fluentui/react-icons` |
| Build             | Vite (library mode) + TypeScript declaration emit                           |
| Test              | Vitest + happy-dom + @testing-library/react + jest-dom                      |
| Lint              | ESLint 9 flat config + Prettier                                             |
| Docs              | Storybook 10 (`@storybook/react-vite`)                                      |

## Storybook

### Running

```bash
npm run storybook        # dev server on port 6007
npm run build-storybook  # static build to storybook-static/
```

### Story Conventions

Stories are co-located with their components at `src/components/<Name>/<Name>.stories.tsx`.

- Use `satisfies Meta<typeof VscComponent>` for type-safe meta.
- Add `tags: ['autodocs']` to get an auto-generated docs page.
- Use the **args pattern** for the primary/default story so controls appear in the docs.
- Use **gallery-style stories** (no args, hardcoded props) for showcasing variant grids.
- Import `fn()` from `storybook/test` for action args (e.g. `onClick: fn()`).

### Theming Architecture

The toolbar toggle switches between dark and light themes. The scheme is propagated through:

1. **`preview.tsx`** — `withFluent` decorator reads `context.globals.scheme`, selects the matching Fluent theme from `themes.ts`, and wraps every story in `<FluentProvider>`.
2. **`themes.ts`** — Composes Fluent's `webDarkTheme`/`webLightTheme` with VS Code CSS variable overrides for brand colors, foregrounds, and fonts.
3. **`ThemeEffect.tsx`** — Sets `vscode-dark`/`vscode-light` body class and `--sb-docs-bg` CSS var.
4. **`DocsContainer.tsx`** — Dynamically passes `themes.dark`/`themes.light` to Storybook's `ThemeProvider` for the docs page.
5. **`manager.ts`** — Listens for `GLOBALS_UPDATED` events and switches the sidebar/toolbar theme.

### CSS Override Rules

`preview-head.html` contains minimal CSS. When adding overrides:

- **Only target specific docs chrome elements** (e.g. `.sbdocs.sbdocs-preview`, `#storybook-docs > div`).
- **Never use broad selectors** like `span`, `code`, `*` with `!important` — they break Storybook's syntax highlighting and Fluent's icon coloring.
- Let Storybook and Fluent handle their own styling natively.
