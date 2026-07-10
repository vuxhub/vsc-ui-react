import { makeStyles, mergeClasses } from '@fluentui/react-components';

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
    boxShadow: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'var(--vscode-input-background)',

    // Fluent paints its border on ::before – retarget it to VS Code tokens.
    '&.fui-SpinButton::before': {
      border: '1px solid var(--vscode-input-border)',
      borderRadius: '2px',
    },

    // No hover effect – keep the border at the VS Code input colour on hover.
    '&.fui-SpinButton:hover::before': {
      border: '1px solid var(--vscode-input-border)',
    },

    // Fluent uses ::after for the animated focus underline – hide it; VS Code
    // uses a flat border colour change for focus instead.
    '&.fui-SpinButton::after': {
      display: 'none' as const,
    },

    '&.fui-SpinButton:focus-within::before': {
      border: '1px solid var(--vscode-focusBorder)',
    },

    '& .fui-SpinButton__input': {
      padding: '4px 6px',
      height: '100%',
      boxSizing: 'border-box',
      fontSize: 'var(--fontSizeBase200, 12px)',
      fontWeight: 'var(--fontWeightRegular, 400)' as unknown as number,
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-input-foreground)',
      backgroundColor: 'transparent',
    },

    '& .fui-SpinButton__input::placeholder': {
      color: 'var(--vscode-input-placeholderForeground)',
      opacity: 1,
    },

    '& .fui-SpinButton__input:focus-visible': {
      outline: 'none',
    },

    // Stepper buttons – flat, transparent, VS Code icon colouring.
    // Layout/sizing is left to Fluent's own styles, which render correctly.
    '& .fui-SpinButton__incrementButton, & .fui-SpinButton__decrementButton': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '13px',
      maxHeight: '13px',
      minHeight: '0',
      padding: '0',
      color: 'var(--vscode-input-foreground)',
      backgroundColor: 'transparent',
      transition: 'none',
    },

    // Chevron icon size.
    '& .fui-SpinButton__incrementButton svg, & .fui-SpinButton__decrementButton svg':
      {
        width: '12px',
        height: '12px',
        fontSize: '12px',
      },

    // Button hover – VS Code stepper hover background.
    '& .fui-SpinButton__incrementButton:enabled:hover, & .fui-SpinButton__decrementButton:enabled:hover':
      {
        color: 'var(--vscode-input-foreground)',
        backgroundColor: 'var(--vscode-scrollbarSlider-hoverBackground)',
      },

    '& .fui-SpinButton__incrementButton:enabled:active, & .fui-SpinButton__decrementButton:enabled:active':
      {
        backgroundColor: 'var(--vscode-toolbar-activeBackground)',
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
    '& .fui-SpinButton__input': {
      cursor: 'default',
    },
    // VS Code read-only spin buttons are non-interactive steppers.
    '& .fui-SpinButton__incrementButton, & .fui-SpinButton__decrementButton': {
      pointerEvents: 'none',
      opacity: 0.4,
    },
  },

  small: {
    height: '24px',
    minHeight: '24px',
    '& .fui-SpinButton__input': {
      padding: '2px 4px',
    },
    // 12px rows – buttons fill them so they touch (no gap).
    '& .fui-SpinButton__incrementButton, & .fui-SpinButton__decrementButton': {
      height: '12px',
      maxHeight: '12px',
    },
  },

  large: {
    height: '28px',
    minHeight: '28px',
    '& .fui-SpinButton__input': {
      padding: '5px 8px',
    },
    // Let the buttons fill their 14px rows so they touch (no gap); the chevron
    // stays centered via the buttons' own flex alignment.
    '& .fui-SpinButton__incrementButton, & .fui-SpinButton__decrementButton': {
      height: '14px',
      maxHeight: '14px',
    },
  },

  error: {
    '&.fui-SpinButton::before': {
      border: '1px solid var(--vscode-inputValidation-errorBorder)',
    },
    '&.fui-SpinButton:hover::before': {
      border: '1px solid var(--vscode-inputValidation-errorBorder)',
    },
  },

  warning: {
    '&.fui-SpinButton::before': {
      border: '1px solid var(--vscode-inputValidation-warningBorder)',
    },
    '&.fui-SpinButton:hover::before': {
      border: '1px solid var(--vscode-inputValidation-warningBorder)',
    },
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseSpinButtonStylesOptions {
  size?: 'small' | 'medium' | 'large';
  validationState?: VscInputValidationState;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

export function useSpinButtonStyles(options: UseSpinButtonStylesOptions) {
  const { size, validationState, disabled, readOnly, className } = options;

  const effectiveValidationState =
    disabled || readOnly ? undefined : validationState;

  const base = useBaseStyles();
  const classes = useStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'small' && classes.small,
    size === 'large' && classes.large,
    effectiveValidationState && classes[effectiveValidationState],
    readOnly && !disabled && classes.readonly,
    disabled && classes.disabled,
    className,
  );

  return { rootClassName };
}
