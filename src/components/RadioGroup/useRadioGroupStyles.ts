import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useRadioGroupBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    transition: 'none',
  },
});

// ---------------------------------------------------------------------------
//  Radio – Base styles
// ---------------------------------------------------------------------------

const useRadioBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    transition: 'none',
    alignItems: 'center',

    // --- Indicator (circle) ---
    // Override Fluent's default 8px indicator margin to match VS Code spacing.
    '& .fui-Radio__indicator.fui-Radio__indicator': {
      ...shorthands.borderColor(
        'var(--vscode-radio-border, var(--vscode-checkbox-border))',
      ),
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderRadius('50%'),
      margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
      backgroundColor:
        'var(--vscode-radio-background, var(--vscode-checkbox-background))',
      color: 'transparent',
      boxShadow: 'none',
      transition: 'none',
      width: '16px',
      height: '16px',
    },

    '& .fui-Radio__indicator.fui-Radio__indicator::after': {
      width: '100%',
      height: '100%',
    },

    // --- Checked state: inner dot via SVG fill (color) ---
    '& input:checked ~ .fui-Radio__indicator.fui-Radio__indicator': {
      color:
        'var(--vscode-radio-selectBackground, var(--vscode-checkbox-selectBackground))',
      ...shorthands.borderColor(
        'var(--vscode-radio-selectBorder, var(--vscode-checkbox-selectBorder, var(--vscode-radio-border, var(--vscode-checkbox-border))))',
      ),
    },

    // --- Label ---
    '& .fui-Radio__label': {
      fontFamily: vscFontFamily,
      fontSize: '14px',
      lineHeight: '20px',
      color: 'var(--vscode-foreground)',
      paddingTop: '0',
      paddingBottom: '0',
    },

    // --- Hover: checked radios shift to the hover border + dot color ---
    ':hover input:checked ~ .fui-Radio__indicator.fui-Radio__indicator': {
      color:
        'var(--vscode-radio-selectHoverBackground, var(--vscode-radio-selectBackground, var(--vscode-checkbox-selectBackground)))',

      ...shorthands.borderColor(
        'var(--vscode-radio-hoverBorder, var(--vscode-checkbox-hoverBorder, var(--vscode-radio-selectBorder, var(--vscode-checkbox-selectBorder, var(--vscode-radio-border, var(--vscode-checkbox-border))))))',
      ),
    },

    // --- Hover: label color change (VS Code-specific) ---
    ':hover .fui-Radio__label': {
      color: 'var(--vscode-inputOption-activeForeground)',
    },

    // --- Focus: use :focus-within since focus is on the child <input> ---
    '&:focus-within': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
      ...shorthands.borderRadius('4px'),
    },

    '& input:focus-visible ~ .fui-Radio__indicator.fui-Radio__indicator': {
      outlineStyle: 'none',
    },

    // --- Kill Fluent's pseudo-element focus indicators ---
    '::after': {
      display: 'none' as const,
    },

    '::before': {
      display: 'none' as const,
    },
  },
});

// ---------------------------------------------------------------------------
//  RadioGroup – Permutation styles
// ---------------------------------------------------------------------------

const useRadioGroupStyles_ = makeStyles({
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});

// ---------------------------------------------------------------------------
//  Radio – Permutation styles
// ---------------------------------------------------------------------------

const useRadioPermStyles = makeStyles({
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  small: {
    '& .fui-Radio__indicator.fui-Radio__indicator': {
      width: '8px',
      height: '8px',
      margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
    },

    '& .fui-Radio__label': {
      fontSize: '10px',
      lineHeight: '14px',
    },
  },

  medium: {
    '& .fui-Radio__indicator.fui-Radio__indicator': {
      width: '12px',
      height: '12px',
      margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
    },

    '& .fui-Radio__label': {
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Exported hooks
// ---------------------------------------------------------------------------

export interface UseRadioGroupStylesOptions {
  layout?: 'horizontal' | 'vertical';
  disabled?: boolean;
  className?: string;
}

export function useRadioGroupStyles(options: UseRadioGroupStylesOptions) {
  const { disabled, className } = options;
  const base = useRadioGroupBaseStyles();
  const classes = useRadioGroupStyles_();

  const rootClassName = mergeClasses(
    base.root,
    disabled && classes.disabled,
    className,
  );

  return { rootClassName };
}

export interface UseRadioStylesOptions {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export function useRadioStyles(options: UseRadioStylesOptions) {
  const { size, disabled, className } = options;
  const base = useRadioBaseStyles();
  const classes = useRadioPermStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'small' && classes.small,
    size === 'medium' && classes.medium,
    disabled && classes.disabled,
    className,
  );

  return { rootClassName };
}
