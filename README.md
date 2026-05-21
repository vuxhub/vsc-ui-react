# vsc-ui-react

VS Code styled Fluent UI components for React. Wraps Fluent UI v9 components and applies VS Code theme-based styling using Griffel CSS-in-JS.

## Install

```bash
npm install vsc-ui-react
```

## Usage

```tsx
import { VscButton } from 'vsc-ui-react';

export function Example() {
  return (
    <VscButton appearance="primary" size="compact">
      Save
    </VscButton>
  );
}
```

## Components

### Button

| Component        | Description                                         |
| ---------------- | --------------------------------------------------- |
| `VscButton`      | Standard button with VS Code styling                |
| `VscSplitButton` | Button with a primary action and a dropdown trigger |
| `VscMenuButton`  | Button that opens a menu                            |

### Input & Textarea

| Component      | Description                                       |
| -------------- | ------------------------------------------------- |
| `VscInput`     | Text input with validation state and icon support |
| `VscTextarea`  | Multi-line text input                             |
| `VscSearchBox` | Search-specific input with built-in icon styling  |

### Field

| Component  | Description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| `VscField` | Wrapper providing label, validation message, and hint for form controls |

### Dropdown / Combobox / Listbox

| Component               | Description                                   |
| ----------------------- | --------------------------------------------- |
| `VscDropdown`           | Select-style dropdown                         |
| `VscCombobox`           | Editable combobox with filtering              |
| `VscListbox`            | Inline listbox                                |
| `VscOption`             | Option item                                   |
| `VscOptionGroup`        | Grouped options                               |
| `VscTriggerLabel`       | Label portion inside a dropdown trigger       |
| `VscTriggerDescription` | Description portion inside a dropdown trigger |
| `VscOptionSeparator`    | Visual separator between options              |

### Menu

| Component             | Description             |
| --------------------- | ----------------------- |
| `VscMenuPopover`      | Menu popover container  |
| `VscMenuList`         | Menu list wrapper       |
| `VscMenuItem`         | Standard menu item      |
| `VscMenuItemCheckbox` | Checkbox menu item      |
| `VscMenuItemRadio`    | Radio menu item         |
| `VscMenuDivider`      | Menu divider            |
| `VscMenuGroup`        | Grouped menu items      |
| `VscMenuGroupHeader`  | Header for a menu group |

Also re-exports `Menu`, `MenuTrigger`, and `MenuSplitGroup` from Fluent UI for convenience.

### TabList

| Component    | Description         |
| ------------ | ------------------- |
| `VscTabList` | Tab strip container |
| `VscTab`     | Individual tab      |

## Storybook

Interactive component documentation is built in. To run locally:

```bash
npm run storybook
```

This starts Storybook at `http://localhost:6007`. Use the toolbar toggle to switch between dark and light themes.

To build a static Storybook site:

```bash
npm run build-storybook
```

Stories live alongside their components in `src/components/<Name>/<Name>.stories.tsx`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and publishing instructions.
