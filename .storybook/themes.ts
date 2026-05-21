import type { FontFamilyTokens, Theme } from '@fluentui/react-components';

import { webDarkTheme, webLightTheme } from '@fluentui/react-components';

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
 * These let Fluent components render with VS Code's theme colors at runtime.
 */
const vscodeTokenOverrides: Partial<Theme> = {
  // Typography
  fontSizeBase100: '10px',
  fontSizeBase200: '12px',
  fontSizeBase300: '14px',
  lineHeightBase100: '14px',
  lineHeightBase200: '16px',
  lineHeightBase300: '20px',

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

/* ── Exported themes ─────────────────────────────────────────────── */

export type VscTheme = Theme;

export const darkTheme: VscTheme = {
  ...webDarkTheme,
  ...fontFamilyTokens,
  ...vscodeTokenOverrides,
};

export const lightTheme: VscTheme = {
  ...webLightTheme,
  ...fontFamilyTokens,
  ...vscodeTokenOverrides,
};
