import { makeStyles, mergeClasses } from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

// ============================================================================
//  TAB LIST — container
// ============================================================================

const useTabListBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    gap: '0',

    /* Horizontal indicator — inset 8px from tab edges */
    '&:not([aria-orientation="vertical"]) [role="tab"]::after': {
      position: 'absolute' as const,
      left: '8px' as const,
      right: '8px' as const,
      bottom: '0' as const,
      top: 'auto' as const,
    },

    /* Vertical indicator — on the left edge */
    '&[aria-orientation="vertical"] [role="tab"][aria-selected="true"]::after':
      {
        content: '""' as const,
        display: 'block' as const,
        position: 'absolute' as const,
        left: '0' as const,
        top: '25%' as const,
        bottom: '25%' as const,
        width: '2px' as const,
        height: 'auto' as const,
        right: 'auto' as const,
        backgroundColor: 'var(--vscode-tab-activeBorderTop)' as 'inherit',
        borderRadius: 'var(--borderRadiusCircular, 9999px)' as '0',
        opacity: '1' as const,
        transform: 'none' as const,
      },
  },
});

// ---------------------------------------------------------------------------
//  Appearance — primary (accent) variant applied to all descendant tabs
// ---------------------------------------------------------------------------

const useTabListAppearanceStyles = makeStyles({
  primary: {
    /* All non-disabled tabs use accent blue; line indicator kept from base. */
    '& [role="tab"]': {
      color: 'var(--vscode-textLink-foreground)',
    },
    '& [role="tab"] .fui-Tab__content': {
      color: 'var(--vscode-textLink-foreground)' as 'inherit',
    },
    '& [role="tab"] .fui-Tab__icon': {
      color: 'var(--vscode-textLink-foreground)' as 'inherit',
    },
    '& [role="tab"]:hover': {
      color: 'var(--vscode-textLink-foreground)',
    },
    '& [role="tab"]:hover .fui-Tab__content': {
      color: 'var(--vscode-textLink-foreground)' as 'inherit',
    },
    '& [role="tab"]:hover .fui-Tab__icon': {
      color: 'var(--vscode-textLink-foreground)' as 'inherit',
    },
    '& [role="tab"][aria-selected="true"]': {
      color: 'var(--vscode-textLink-foreground)',
    },
    '& [role="tab"][aria-selected="true"] .fui-Tab__content': {
      color: 'var(--vscode-textLink-foreground)' as 'inherit',
    },
    '& [role="tab"][aria-selected="true"] .fui-Tab__icon': {
      color: 'var(--vscode-textLink-foreground)' as 'inherit',
    },

    /* Disabled tabs stay neutral gray, matching base treatment. */
    '& [role="tab"][aria-disabled="true"], & [role="tab"]:disabled': {
      color: 'var(--vscode-disabledForeground)',
    },
    '& [role="tab"][aria-disabled="true"] .fui-Tab__content, & [role="tab"]:disabled .fui-Tab__content':
      {
        color: 'var(--vscode-disabledForeground)' as 'inherit',
      },
    '& [role="tab"][aria-disabled="true"] .fui-Tab__icon, & [role="tab"]:disabled .fui-Tab__icon':
      {
        color: 'var(--vscode-disabledForeground)' as 'inherit',
      },
  },
});

const useTabListSizeStyles = makeStyles({
  small: {
    '& [role="tab"]': {
      height: '22px',
      minHeight: '22px',
      padding: '4px 6px' as const,
      columnGap: '2px' as const,
    },
    '& [role="tab"]::after': {
      left: '6px' as const,
      right: '6px' as const,
    },
    '& [role="tab"] .fui-Tab__content': {
      fontSize: 'var(--fontSizeBase200, 12px)',
      fontWeight: 'var(--fontWeightRegular, 400)' as unknown as number,
      lineHeight: 'var(--lineHeightBase200, 16px)',
      padding: '0 2px',
    },
    '& [role="tab"] .fui-Tab__content--reserved-space': {
      fontSize: 'var(--fontSizeBase200, 12px)',
      fontWeight: 'var(--fontWeightRegular, 400)' as unknown as number,
      lineHeight: 'var(--lineHeightBase200, 16px)',
      padding: '0 2px',
    },
    '& [role="tab"] .fui-Tab__icon': {
      fontSize: '16px' as const,
      width: '16px' as const,
      height: '16px' as const,
    },
    '& [role="tab"] .fui-Tab__icon > svg': {
      width: '16px' as const,
      height: '16px' as const,
    },
    '& [role="tab"][aria-selected=\'true\'] .fui-Tab__content': {
      fontWeight: 'var(--fontWeightSemibold, 600)' as unknown as number,
    },
  },
});

// ============================================================================
//  TAB — individual tab button
// ============================================================================

const useTabBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    height: '28px',
    minHeight: '28px',
    boxSizing: 'border-box',
    color: 'var(--vscode-tab-inactiveForeground)',
    padding: '4px 8px' as const,
    borderRadius: '0',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    columnGap: '2px' as const,
    alignItems: 'center' as const,
    transition: 'none',

    '::after': {
      transition: 'none',
      animation: 'none',
    },

    '& .fui-Tab__content': {
      fontSize: 'var(--fontSizeBase300, 14px)',
      fontWeight: 'var(--fontWeightRegular, 400)' as unknown as number,
      lineHeight: 'var(--lineHeightBase300, 20px)',
      padding: '0 2px',
    },

    '& .fui-Tab__content--reserved-space': {
      fontSize: 'var(--fontSizeBase300, 14px)',
      fontWeight: 'var(--fontWeightRegular, 400)' as unknown as number,
      lineHeight: 'var(--lineHeightBase300, 20px)',
      padding: '0 2px',
    },

    '& .fui-Tab__icon': {
      fontSize: '20px' as const,
      width: '20px' as const,
      height: '20px' as const,
    },

    '& .fui-Tab__icon > svg': {
      width: '20px' as const,
      height: '20px' as const,
    },

    ':hover': {
      color: 'var(--vscode-tab-activeForeground)',
      backgroundColor: 'transparent',
      '& .fui-Tab__content': {
        color: 'var(--vscode-tab-activeForeground)' as 'inherit',
      },
      '& .fui-Tab__icon': {
        color: 'var(--vscode-tab-activeForeground)' as 'inherit',
      },
    },

    "&[aria-selected='true']": {
      color: 'var(--vscode-tab-activeForeground)',
    },

    "&[aria-selected='true'] .fui-Tab__content": {
      fontWeight: 'var(--fontWeightSemibold, 600)' as unknown as number,
    },

    "&[aria-disabled='true'], &:disabled": {
      cursor: 'default',
      pointerEvents: 'none',
    },

    "&[aria-disabled='true'] .fui-Tab__content, &:disabled .fui-Tab__content": {
      color: 'var(--vscode-disabledForeground)' as 'inherit',
    },

    "&[aria-disabled='true'] .fui-Tab__content--reserved-space, &:disabled .fui-Tab__content--reserved-space":
      {
        color: 'var(--vscode-disabledForeground)' as 'inherit',
      },

    "&[aria-disabled='true'] .fui-Tab__icon, &:disabled .fui-Tab__icon": {
      color: 'var(--vscode-disabledForeground)' as 'inherit',
    },
  },
});

// ============================================================================
//  Exported hooks
// ============================================================================

export type VscTabListAppearance = 'default' | 'primary';

export function useVscTabListStyles(options: {
  size?: 'small' | 'medium' | 'large';
  appearance?: VscTabListAppearance;
  className?: string;
}): string {
  const { size, appearance, className } = options;

  const base = useTabListBaseStyles();
  const sizeClasses = useTabListSizeStyles();
  const appearanceClasses = useTabListAppearanceStyles();

  return mergeClasses(
    base.root,
    size === 'small' && sizeClasses.small,
    appearance === 'primary' && appearanceClasses.primary,
    className,
  );
}

export function useVscTabStyles(className?: string): string {
  const base = useTabBaseStyles();
  return mergeClasses(base.root, className);
}
