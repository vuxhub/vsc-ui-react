import { makeStyles, mergeClasses } from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

export type VscPopoverAppearance = 'default' | 'brand';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useSurfaceBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    borderRadius: '4px',
    boxSizing: 'border-box',
    // Cancel Fluent's transition + @keyframes enter/exit motion to match
    // VS Code's snappy, motionless widgets. This makes the Fluent
    // `surfaceMotion` prop a no-op for VscPopover by design.
    transition: 'none',
    animation: 'none',
    // Ambient + key drop shadow (matches VS Code widget elevation).
    filter:
      'drop-shadow(0 0 2px var(--vscode-widget-shadow)) drop-shadow(0 8px 16px var(--vscode-widget-shadow))',

    '::after': {
      display: 'none' as const,
    },

    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Permutations – appearance variants via makeStyles
// ---------------------------------------------------------------------------
//
//  The `withArrow` beak inherits its fill from the surface: Fluent's arrow
//  element (and its ::before tip) use `background-color: inherit`, so setting
//  `backgroundColor` on the surface root below propagates to the arrow. This
//  is verified for both appearances — the brand arrow computes to
//  `--vscode-button-background` (#0078D4), matching the surface.

const useSurfaceAppearanceStyles = makeStyles({
  default: {
    backgroundColor: 'var(--vscode-editorHoverWidget-background)',
    color: 'var(--vscode-editorHoverWidget-foreground)',
    border: '1px solid var(--vscode-editorHoverWidget-border)',
  },
  brand: {
    backgroundColor: 'var(--vscode-button-background)',
    color: 'var(--vscode-button-foreground)',
    border: '1px solid var(--vscode-button-border)',
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseVscPopoverSurfaceStylesOptions {
  appearance?: VscPopoverAppearance;
  className?: string;
}

export function useVscPopoverSurfaceStyles(
  options: UseVscPopoverSurfaceStylesOptions = {},
) {
  const { appearance = 'default', className } = options;
  const base = useSurfaceBaseStyles();
  const appearances = useSurfaceAppearanceStyles();

  const rootClassName = mergeClasses(
    base.root,
    appearance === 'brand' ? appearances.brand : appearances.default,
    className, // always last — allows consumer overrides
  );

  return { rootClassName };
}
