import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';
import type { VscInputValidationState } from '../../types';
import type { VscTextareaResize } from './VscTextarea';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    borderRadius: '2px',
    border: '1px solid var(--vscode-input-border)',
    boxShadow: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'var(--vscode-input-background)',
    transition: 'none',

    '::after': {
      display: 'none' as const,
    },

    '& .fui-Textarea__textarea': {
      padding: '4px 6px',
      minHeight: '52px',
      fontSize: 'var(--fontSizeBase200, 12px)',
      fontWeight: 'var(--fontWeightRegular, 400)' as unknown as number,
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-input-foreground)',
      backgroundColor: 'transparent',
    },

    '& .fui-Textarea__textarea::placeholder': {
      color: 'var(--vscode-input-placeholderForeground)',
      opacity: 1,
    },

    '& .fui-Textarea__textarea:focus-visible': {
      outline: 'none',
    },

    ':hover': {
      ...shorthands.borderColor('var(--vscode-input-border)'),
    },

    '&.fui-Textarea:focus-within': {
      ...shorthands.borderColor('var(--vscode-focusBorder)'),
      outline: 'none',
    },
  },
});

// ---------------------------------------------------------------------------
//  Resize styles – padding to prevent focus indicator overlapping the grip
// ---------------------------------------------------------------------------

const useResizeStyles = makeStyles({
  resizable: {
    // Bottom padding prevents the focus border from overlapping the resize grip
    paddingBottom: '2px',
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
    '& .fui-Textarea__textarea': {
      cursor: 'default',
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
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseTextareaStylesOptions {
  validationState?: VscInputValidationState;
  resize?: VscTextareaResize;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

export function useTextareaStyles(options: UseTextareaStylesOptions): string {
  const { validationState, resize, disabled, readOnly, className } = options;

  const effectiveValidationState =
    disabled || readOnly ? undefined : validationState;

  const base = useBaseStyles();
  const classes = useStyles();
  const resizeClasses = useResizeStyles();

  const isResizable = resize && resize !== 'none';

  return mergeClasses(
    base.root,
    isResizable && resizeClasses.resizable,
    effectiveValidationState && classes[effectiveValidationState],
    disabled && classes.disabled,
    readOnly && !disabled && classes.readonly,
    className,
  );
}
