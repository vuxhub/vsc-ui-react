import type { FontFamilyTokens, Theme } from '@fluentui/react-components';

import { webDarkTheme } from '@fluentui/react-components';

/* ── Font family ─────────────────────────────────────────────────── */

const fontFamilyTokens: FontFamilyTokens = {
  fontFamilyBase:
    'var(--vscode-font-family, "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
  fontFamilyMonospace:
    '"SF Mono", Monaco, Menlo, Consolas, "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
  fontFamilyNumeric:
    'var(--vscode-font-family, "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
};

/* ── VS Code token overrides ─────────────────────────────────────── */

/**
 * Fluent token → VS Code CSS variable mappings.
 *
 * All color tokens resolve to var(--vscode-*) custom properties, which
 * switch values at runtime via CSS class selectors (:root.theme-dark /
 * :root.theme-light) in vscode-tokens.css. This means a SINGLE Fluent
 * theme object works for both dark and light — no React re-render needed
 * on theme switch, just a CSS class toggle.
 */
const vscodeTokenOverrides: Partial<Theme> = {
  // Typography
  fontSizeBase100: '10px',
  fontSizeBase200: '12px',
  fontSizeBase300: '14px',
  lineHeightBase100: '14px',
  lineHeightBase200: '16px',
  lineHeightBase300: '20px',

  // FluentProvider root element tokens
  colorNeutralForeground1: 'var(--vscode-foreground)',
  colorNeutralBackground1: 'var(--vscode-editor-background)',

  // Brand / Primary button
  colorBrandBackground: 'var(--vscode-button-background)',
  colorBrandBackgroundHover: 'var(--vscode-button-hoverBackground)',
  colorBrandBackgroundPressed: 'var(--vscode-button-hoverBackground)',
  colorNeutralForegroundOnBrand: 'var(--vscode-button-foreground)',

  // Secondary button / neutral foreground
  colorNeutralForeground2: 'var(--vscode-button-secondaryForeground)',
  colorNeutralForeground2Hover: 'var(--vscode-button-secondaryForeground)',
  colorNeutralForeground2Pressed: 'var(--vscode-button-secondaryForeground)',
  colorNeutralForeground2BrandHover: 'var(--vscode-textLink-foreground)',
  colorNeutralForeground2BrandPressed:
    'var(--vscode-textLink-activeForeground)',

  // Subtle / Transparent backgrounds
  colorSubtleBackground: 'transparent',
  colorSubtleBackgroundHover: 'var(--vscode-button-secondaryHoverBackground)',
  colorSubtleBackgroundPressed: 'var(--vscode-button-secondaryHoverBackground)',
  colorTransparentBackgroundHover: 'var(--vscode-toolbar-hoverBackground)',
  colorTransparentBackgroundPressed: 'var(--vscode-toolbar-activeBackground)',

  // Focus
  colorStrokeFocus2: 'var(--vscode-focusBorder)',

  // Disabled
  colorNeutralForegroundDisabled: 'var(--vscode-disabledForeground)',
};

/* ── Exported theme ──────────────────────────────────────────────── */

export type VscTheme = Theme;

/**
 * Unified Fluent theme for VS Code components. Uses webDarkTheme as a
 * structural base — the base color values are irrelevant because all
 * component styles override them with var(--vscode-*) CSS variables.
 * Non-color tokens (typography, spacing, border-radius) are identical
 * between dark and light Fluent themes.
 */
export const vscTheme: VscTheme = {
  ...webDarkTheme,
  ...fontFamilyTokens,
  ...vscodeTokenOverrides,
};
