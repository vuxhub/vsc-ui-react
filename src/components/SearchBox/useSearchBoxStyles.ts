import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

export type VscSearchBoxAppearance = 'outline' | 'transparent';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    height: '24px',
    minHeight: '24px',
    padding: '0 8px',
    borderRadius: '2px',
    border: '1px solid #3C3C3C',
    backgroundColor: '#313131',
    boxShadow: 'none',
    boxSizing: 'border-box',
    transition: 'none',

    '& .fui-Input__input': {
      alignSelf: 'center',
      padding: '0',
      height: 'auto',
      boxSizing: 'border-box',
      fontSize: 'var(--fontSizeBase200, 12px)',
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-input-foreground)',
      backgroundColor: 'transparent',
    },

    '& .fui-Input__input::placeholder': {
      color: 'var(--vscode-input-placeholderForeground)',
      opacity: 1,
    },

    '& .fui-Input__contentBefore': {
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--vscode-input-placeholderForeground)',
      fontSize: '14px',
      lineHeight: '1',
      width: '14px',
      height: '14px',
      marginRight: '6px',
      padding: '0',
    },

    '& .fui-Input__contentBefore > svg, & .fui-Input__contentAfter > svg, & .fui-SearchBox__contentAfter > svg':
      {
        width: '14px',
        height: '14px',
      },

    '& .fui-SearchBox__dismiss': {
      fontSize: '14px',
      width: '14px',
      height: '14px',
      visibility: 'hidden' as const,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: '1',
    },

    '& .fui-SearchBox__dismiss > svg': {
      width: '14px',
      height: '14px',
    },

    '& .fui-Input__contentAfter': {
      visibility: 'hidden' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: '14px',
      lineHeight: '1',
      width: '14px',
      height: '14px',
      marginLeft: '6px',
      padding: '0',
      color: 'var(--vscode-input-foreground)',
      cursor: 'pointer',
    },

    ':hover': {
      ...shorthands.borderColor('var(--vscode-input-border)'),
    },

    '&.fui-Input:focus-within': {
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',

      '& .fui-SearchBox__dismiss': {
        visibility: 'visible' as const,
      },
      '& .fui-Input__contentAfter': {
        visibility: 'visible' as const,
      },
    },
  },
});

// ---------------------------------------------------------------------------
//  Appearance styles via makeStyles
// ---------------------------------------------------------------------------

const useAppearanceStyles = makeStyles({
  outline: {
    backgroundColor: '#313131',
    border: '1px solid #3C3C3C',
    borderRadius: '2px',
  },

  transparent: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #3C3C3C',
    borderRadius: '0',
  },
});

// ---------------------------------------------------------------------------
//  Permutation styles via makeStyles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  medium: {
    height: '26px',
    minHeight: '26px',
    '& .fui-Input__input': {
      ...shorthands.padding('0'),
    },
    '& .fui-Input__contentBefore': {
      fontSize: '14px',
      width: '14px',
      height: '14px',
      marginRight: '6px',
      ...shorthands.padding('0'),
    },
    '& .fui-Input__contentAfter': {
      fontSize: '14px',
      width: '14px',
      height: '14px',
      marginRight: '0',
      marginLeft: '6px',
      ...shorthands.padding('0'),
    },
    '& .fui-Input__contentBefore > svg, & .fui-Input__contentAfter > svg, & .fui-SearchBox__contentAfter > svg':
      {
        width: '14px',
        height: '14px',
      },
    '& .fui-SearchBox__dismiss': {
      fontSize: '14px',
      width: '14px',
      height: '14px',
    },
    '& .fui-SearchBox__dismiss > svg': {
      width: '14px',
      height: '14px',
    },
  },

  large: {
    height: '28px',
    minHeight: '28px',
    '& .fui-Input__input': {
      ...shorthands.padding('0'),
    },
    '& .fui-Input__contentBefore': {
      fontSize: '16px',
      width: '16px',
      height: '16px',
      marginRight: '8px',
      ...shorthands.padding('0'),
    },
    '& .fui-Input__contentAfter': {
      fontSize: '16px',
      width: '16px',
      height: '16px',
      marginRight: '0',
      marginLeft: '8px',
      ...shorthands.padding('0'),
    },
    '& .fui-Input__contentBefore > svg, & .fui-Input__contentAfter > svg, & .fui-SearchBox__contentAfter > svg':
      {
        width: '16px',
        height: '16px',
      },
    '& .fui-SearchBox__dismiss': {
      fontSize: '16px',
      width: '16px',
      height: '16px',
    },
    '& .fui-SearchBox__dismiss > svg': {
      width: '16px',
      height: '16px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseSearchBoxStylesOptions {
  size?: 'small' | 'medium' | 'large';
  appearance?: VscSearchBoxAppearance;
  disabled?: boolean;
  className?: string;
}

export function useSearchBoxStyles(options: UseSearchBoxStylesOptions): string {
  const {
    size = 'small',
    appearance = 'outline',
    disabled,
    className,
  } = options;

  const base = useBaseStyles();
  const classes = useStyles();
  const appearanceClasses = useAppearanceStyles();

  return mergeClasses(
    base.root,
    appearance === 'outline' && appearanceClasses.outline,
    appearance === 'transparent' && appearanceClasses.transparent,
    size === 'medium' && classes.medium,
    size === 'large' && classes.large,
    disabled && classes.disabled,
    className,
  );
}
