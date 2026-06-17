import { makeStyles, mergeClasses } from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

export type VscTagAppearance = 'default' | 'outline' | 'brand';
export type VscTagSize = 'small' | 'medium' | 'large';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    transition: 'none',
    boxShadow: 'none',
    borderRadius: '9999px',
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: 'default',
    userSelect: 'none',
    maxWidth: '100%',

    '::after': {
      display: 'none',
    },
  },
});

// ---------------------------------------------------------------------------
//  Size styles
// ---------------------------------------------------------------------------

const useSizeStyles = makeStyles({
  small: {
    height: '16px',
    fontSize: '10px',
    lineHeight: '14px',
    paddingLeft: '4px',
    paddingRight: '4px',
    gap: '2px',
  },
  medium: {
    height: '20px',
    fontSize: '12px',
    lineHeight: '16px',
    paddingLeft: '4px',
    paddingRight: '4px',
    gap: '4px',
  },
  large: {
    height: '24px',
    fontSize: '12px',
    lineHeight: '16px',
    paddingLeft: '6px',
    paddingRight: '6px',
    gap: '4px',
  },
});

// ---------------------------------------------------------------------------
//  Two-line (secondary text) height override – large only
// ---------------------------------------------------------------------------

const useTwoLineStyles = makeStyles({
  large: {
    height: '32px',
    paddingBlock: '4px',
  },
});

// ---------------------------------------------------------------------------
//  Appearance styles
// ---------------------------------------------------------------------------

const useAppearanceStyles = makeStyles({
  default: {
    backgroundColor: 'var(--vscode-badge-neutralContrastBackground)',
    color: 'var(--vscode-foreground)',
    border: '1px solid var(--vscode-badge-neutralContrastForeground)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-foreground)',
    border:
      '1px solid var(--vscode-badge-neutralContrastForeground)',
  },
  brand: {
    backgroundColor: 'var(--vscode-button-background)',
    color: 'var(--vscode-button-foreground)',
    border: '1px solid transparent',
  },
});

// ---------------------------------------------------------------------------
//  Disabled state
// ---------------------------------------------------------------------------

const useDisabledStyles = makeStyles({
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});

// ---------------------------------------------------------------------------
//  Icon styles
// ---------------------------------------------------------------------------

const useIconStyles = makeStyles({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    lineHeight: 0,
  },
  small: {
    width: '12px',
    height: '12px',
    fontSize: '12px',
  },
  medium: {
    width: '12px',
    height: '12px',
    fontSize: '12px',
  },
  large: {
    width: '16px',
    height: '16px',
    fontSize: '16px',
  },
});

// ---------------------------------------------------------------------------
//  Text styles
// ---------------------------------------------------------------------------

const useTextStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: '1.2',
  },
  primary: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 400,
  },
  secondary: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 400,
    opacity: 0.7,
    color: 'var(--vscode-foreground)',
  },
  secondarySmall: {
    fontSize: '8px',
    lineHeight: '1',
  },
  secondaryMedium: {
    fontSize: '9px',
    lineHeight: '1',
  },
  secondaryLarge: {
    fontSize: '10px',
    lineHeight: '1',
  },
  secondaryBrand: {
    color: 'var(--vscode-button-foreground)',
  },
});

// ---------------------------------------------------------------------------
//  Dismiss button styles
// ---------------------------------------------------------------------------

const useDismissStyles = makeStyles({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: 'none',
    background: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '0',
    lineHeight: 0,
    borderRadius: '9999px',
    transition: 'none',

    ':focus-visible': {
      outline: '1px solid var(--vscode-focusBorder)',
      outlineOffset: '1px',
    },
  },
  hoverAccent: {
    ':hover': {
      color: 'var(--vscode-textLink-foreground)',
    },
  },
  small: {
    width: '12px',
    height: '12px',
    fontSize: '12px',
  },
  medium: {
    width: '12px',
    height: '12px',
    fontSize: '12px',
  },
  large: {
    width: '12px',
    height: '12px',
    fontSize: '12px',
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseTagStylesOptions {
  appearance?: VscTagAppearance;
  size?: VscTagSize;
  disabled?: boolean;
  hasSecondaryText?: boolean;
  className?: string;
}

export function useTagStyles(options: UseTagStylesOptions) {
  const {
    appearance = 'default',
    size = 'medium',
    disabled,
    hasSecondaryText,
    className,
  } = options;

  const base = useBaseStyles();
  const sizes = useSizeStyles();
  const twoLine = useTwoLineStyles();
  const appearances = useAppearanceStyles();
  const disabledStyles = useDisabledStyles();
  const iconClasses = useIconStyles();
  const textClasses = useTextStyles();
  const dismissClasses = useDismissStyles();

  const rootClassName = mergeClasses(
    base.root,
    sizes[size],
    hasSecondaryText && size === 'large' && twoLine.large,
    appearances[appearance],
    disabled && disabledStyles.disabled,
    className,
  );

  const iconClassName = mergeClasses(iconClasses.base, iconClasses[size]);

  const textContainerClassName = textClasses.base;

  const primaryTextClassName = textClasses.primary;

  const secondaryTextClassName = mergeClasses(
    textClasses.secondary,
    size === 'small' && textClasses.secondarySmall,
    size === 'medium' && textClasses.secondaryMedium,
    size === 'large' && textClasses.secondaryLarge,
    appearance === 'brand' && textClasses.secondaryBrand,
  );

  const dismissClassName = mergeClasses(
    dismissClasses.base,
    appearance !== 'brand' && dismissClasses.hoverAccent,
    dismissClasses[size],
  );

  return {
    rootClassName,
    iconClassName,
    textContainerClassName,
    primaryTextClassName,
    secondaryTextClassName,
    dismissClassName,
  };
}
