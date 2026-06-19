import { makeStyles, mergeClasses } from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

export type VscLinkSize = 'small' | 'medium' | 'large';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    color: 'var(--vscode-textLink-foreground)',
    display: 'inline-flex',
    alignItems: 'center',
    columnGap: '2px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'none',
    ':hover': {
      color: 'var(--vscode-textLink-foreground)',
      textDecorationColor: 'var(--vscode-textLink-foreground)',
    },
    ':active': {
      color: 'var(--vscode-textLink-foreground)',
      textDecorationColor: 'var(--vscode-textLink-foreground)',
    },
    ':focus-visible': {
      textDecorationColor: 'var(--vscode-textLink-foreground)',
    },
  },
});

// ---------------------------------------------------------------------------
//  Variant permutations
// ---------------------------------------------------------------------------

const useVariantStyles = makeStyles({
  // Rest state with a persistent underline.
  underline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});

// ---------------------------------------------------------------------------
//  Size permutations
// ---------------------------------------------------------------------------

const useSizeStyles = makeStyles({
  small: {
    fontSize: '10px',
    lineHeight: '14px',
  },
  medium: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  large: {
    fontSize: '14px',
    lineHeight: '20px',
  },
});

// ---------------------------------------------------------------------------
//  State permutations
// ---------------------------------------------------------------------------

const useStateStyles = makeStyles({
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});

// ---------------------------------------------------------------------------
//  Sub-element styles
// ---------------------------------------------------------------------------

const useElementStyles = makeStyles({
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});

// ---------------------------------------------------------------------------
//  Icon size permutations
// ---------------------------------------------------------------------------

const useIconSizeStyles = makeStyles({
  small: {
    '& svg': {
      width: '12px',
      height: '12px',
    },
  },
  medium: {
    '& svg': {
      width: '14px',
      height: '14px',
    },
  },
  large: {
    '& svg': {
      width: '16px',
      height: '16px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseLinkStylesOptions {
  size?: VscLinkSize;
  /** When true, the link shows an underline at rest. */
  underline?: boolean;
  disabled?: boolean;
  className?: string;
}

export function useLinkStyles(options: UseLinkStylesOptions) {
  const { size = 'medium', underline, disabled, className } = options;

  const base = useBaseStyles();
  const variants = useVariantStyles();
  const sizes = useSizeStyles();
  const states = useStateStyles();
  const elements = useElementStyles();
  const iconSizes = useIconSizeStyles();

  const rootClassName = mergeClasses(
    base.root,
    sizes[size],
    underline && variants.underline,
    disabled && states.disabled,
    className,
  );

  return {
    rootClassName,
    iconClassName: mergeClasses(elements.icon, iconSizes[size]),
  };
}
