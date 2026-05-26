import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';
import type { VscInputValidationState } from '../../types';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    height: '26px',
    minHeight: '26px',
    padding: '0',
    borderRadius: '2px',
    border: '1px solid var(--vscode-input-border)',
    boxShadow: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'var(--vscode-input-background)',
    transition: 'none',

    '&::after, &.fui-Input::after, &.fui-Input:focus-within::after': {
      display: 'none' as const,
    },

    '& .fui-Input__input': {
      padding: '4px 6px',
      height: '100%',
      boxSizing: 'border-box',
      fontSize: 'var(--fontSizeBase200, 12px)',
      fontWeight: 'var(--fontWeightRegular, 400)' as unknown as number,
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-input-foreground)',
      backgroundColor: 'transparent',
    },

    '& .fui-Input__input::placeholder': {
      color: 'var(--vscode-input-placeholderForeground)',
      opacity: 1,
    },

    '& .fui-Input__input:focus-visible': {
      outline: 'none',
    },

    '& .fui-Input__contentBefore': {
      padding: '0 4px',
      color: 'var(--vscode-input-foreground)',
      fontSize: '16px',
    },

    '& .fui-Input__contentAfter': {
      padding: '0 4px',
      color: 'var(--vscode-input-foreground)',
      fontSize: '16px',
    },

    ':hover': {
      ...shorthands.borderColor('var(--vscode-input-border)'),
    },

    '&.fui-Input:focus-within': {
      ...shorthands.borderColor('var(--vscode-focusBorder)'),
      outline: 'none',
    },
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

  readonly: {
    ...shorthands.borderColor('var(--vscode-input-border)'),
    backgroundColor: 'transparent',
    '& .fui-Input__input': {
      cursor: 'default',
    },
  },

  small: {
    height: '24px',
    minHeight: '24px',
    '& .fui-Input__input': {
      ...shorthands.padding('2px', '4px'),
      fontSize: 'var(--fontSizeBase200, 12px)',
      lineHeight: 'var(--lineHeightBase200, 16px)',
    },
    '& .fui-Input__contentBefore': {
      fontSize: '14px',
      ...shorthands.padding('0', '3px'),
    },
    '& .fui-Input__contentAfter': {
      fontSize: '14px',
      ...shorthands.padding('0', '3px'),
    },
  },

  large: {
    height: '28px',
    minHeight: '28px',
    '& .fui-Input__input': {
      ...shorthands.padding('5px', '8px'),
      fontSize: 'var(--fontSizeBase200, 12px)',
      lineHeight: 'var(--lineHeightBase200, 16px)',
    },
  },

  error: {
    ...shorthands.borderColor('var(--vscode-inputValidation-errorBorder)'),
    ':hover': {
      ...shorthands.borderColor('var(--vscode-inputValidation-errorBorder)'),
    },
    ':focus-within': {
      ...shorthands.borderColor('var(--vscode-inputValidation-errorBorder)'),
    },
  },

  warning: {
    ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),
    ':hover': {
      ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),
    },
    ':focus-within': {
      ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),
    },
  },

  withIcon: {
    '& .fui-Input__contentBefore': {
      color: 'var(--vscode-input-placeholderForeground)',
      fontSize: '16px',
      paddingLeft: '6px',
      paddingRight: '2px',
    },
    '& .fui-Input__contentAfter': {
      color: 'var(--vscode-input-foreground)',
      fontSize: '16px',
      paddingLeft: '2px',
      paddingRight: '6px',
      cursor: 'pointer',
    },
    '& .fui-Input__contentAfter:hover': {
      color: 'var(--vscode-foreground)',
    },
  },

  validationError: {
    backgroundColor: 'var(--vscode-inputValidation-errorBackground)',
    ...shorthands.border('0'),
    color: 'var(--vscode-inputValidation-errorForeground)',
    ...shorthands.padding('4px', '6px'),
    fontSize: 'var(--fontSizeBase200, 12px)',
    lineHeight: 'var(--lineHeightBase200, 16px)',
    ...shorthands.borderRadius('0', '0', '2px', '2px'),
    marginTop: '-1px',
    width: '100%',
    boxSizing: 'border-box' as const,
  },

  validationWarning: {
    backgroundColor: 'var(--vscode-inputValidation-warningBackground)',
    ...shorthands.border('0'),
    color: 'var(--vscode-inputValidation-warningForeground)',
    ...shorthands.padding('4px', '6px'),
    fontSize: 'var(--fontSizeBase200, 12px)',
    lineHeight: 'var(--lineHeightBase200, 16px)',
    ...shorthands.borderRadius('0', '0', '2px', '2px'),
    marginTop: '-1px',
    width: '100%',
    boxSizing: 'border-box' as const,
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseInputStylesOptions {
  size?: 'small' | 'medium' | 'large';
  validationState?: VscInputValidationState;
  withIcon?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

const validationMsgMap: Record<
  VscInputValidationState,
  'validationError' | 'validationWarning'
> = {
  error: 'validationError',
  warning: 'validationWarning',
};

export function useInputStyles(options: UseInputStylesOptions) {
  const { size, validationState, withIcon, disabled, readOnly, className } =
    options;

  const effectiveValidationState =
    disabled || readOnly ? undefined : validationState;

  const base = useBaseStyles();
  const classes = useStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'small' && classes.small,
    size === 'large' && classes.large,
    effectiveValidationState && classes[effectiveValidationState],
    withIcon && classes.withIcon,
    disabled && classes.disabled,
    readOnly && !disabled && classes.readonly,
    className,
  );

  return {
    rootClassName,
    wrapperClassName: classes.wrapper,
    validationMsgClassName: effectiveValidationState
      ? classes[validationMsgMap[effectiveValidationState]]
      : undefined,
  };
}
