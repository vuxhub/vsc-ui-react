import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

const checkboxIndicator = '.fui-Checkbox__indicator.fui-Checkbox__indicator';
const checkboxInput = 'input.fui-Checkbox__input';
const checkedIndicator = `& ${checkboxInput}:checked ~ ${checkboxIndicator}`;
const mixedIndicator = `& ${checkboxInput}:indeterminate ~ ${checkboxIndicator}`;
const checkedIndicatorHover = `&:hover ${checkboxInput}:checked ~ ${checkboxIndicator}`;
const mixedIndicatorHover = `&:hover ${checkboxInput}:indeterminate ~ ${checkboxIndicator}`;
const disabledIndicator = `& ${checkboxInput}:disabled ~ ${checkboxIndicator}, & ${checkboxInput}[aria-disabled='true'] ~ ${checkboxIndicator}`;
const checkedDisabledIndicator = `& ${checkboxInput}:disabled:checked ~ ${checkboxIndicator}, & ${checkboxInput}[aria-disabled='true']:checked ~ ${checkboxIndicator}`;
const mixedDisabledIndicator = `& ${checkboxInput}:disabled:indeterminate ~ ${checkboxIndicator}, & ${checkboxInput}[aria-disabled='true']:indeterminate ~ ${checkboxIndicator}`;

const checkboxBackground = 'var(--vscode-checkbox-background, transparent)';
const checkboxBorder =
  'var(--vscode-checkbox-border, var(--vscode-input-border, var(--vscode-foreground)))';
const checkboxForeground =
  'var(--vscode-checkbox-foreground, var(--vscode-foreground))';
const checkboxHoverForeground =
  'var(--vscode-checkbox-hoverForeground, var(--vscode-list-hoverForeground, var(--vscode-checkbox-foreground, var(--vscode-foreground))))';
const checkboxHoverBorder =
  'var(--vscode-checkbox-hoverBorder, var(--vscode-checkbox-hoverForeground, var(--vscode-list-hoverForeground, var(--vscode-checkbox-border, var(--vscode-foreground)))))';
const checkboxSelectedBackground =
  'var(--vscode-checkbox-selectBackground, var(--vscode-button-background))';
const checkboxSelectedBorder =
  'var(--vscode-checkbox-selectBorder, var(--vscode-checkbox-selectBackground, var(--vscode-button-background)))';
const checkboxSelectedForeground =
  'var(--vscode-checkbox-selectForeground, var(--vscode-button-foreground))';
const checkboxSelectedHoverBackground =
  'var(--vscode-checkbox-selectHoverBackground, var(--vscode-checkbox-selectBackground, var(--vscode-button-background)))';
const checkboxSelectedHoverBorder =
  'var(--vscode-checkbox-selectHoverBorder, var(--vscode-checkbox-selectHoverBackground, var(--vscode-checkbox-selectBorder, var(--vscode-checkbox-selectBackground, var(--vscode-button-background)))))';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    transition: 'none',
    alignItems: 'center',
    gap: '6px',

    [`& ${checkboxIndicator}`]: {
      boxSizing: 'border-box',
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      padding: '0',
      margin: '0',
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor(checkboxBorder),
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderRadius('2px'),
      backgroundColor: checkboxBackground,
      color: checkboxForeground,
      fill: 'currentColor',
      boxShadow: 'none',
      transition: 'none',
      width: '12px',
      height: '12px',
      fontSize: '12px',
      '--vsc-checkbox-check-icon-size': '12px',
      '--vsc-checkbox-mixed-icon-size': '6px',

      '& > svg': {
        display: 'block',
        width: 'var(--vsc-checkbox-check-icon-size)',
        height: 'var(--vsc-checkbox-check-icon-size)',
        fontSize: 'var(--vsc-checkbox-check-icon-size)',
        color: 'inherit',
        fill: 'currentColor',
      },
    },

    [checkedIndicator]: {
      backgroundColor: checkboxSelectedBackground,
      ...shorthands.borderColor(checkboxSelectedBorder),
      color: checkboxSelectedForeground,
    },

    [`${checkedIndicator} > svg`]: {
      width: 'var(--vsc-checkbox-check-icon-size)',
      height: 'var(--vsc-checkbox-check-icon-size)',
      fontSize: 'var(--vsc-checkbox-check-icon-size)',
    },

    [mixedIndicator]: {
      backgroundColor: checkboxBackground,
      ...shorthands.borderColor(checkboxSelectedBorder),
      color: checkboxSelectedBackground,
    },

    [`${mixedIndicator} > svg`]: {
      width: 'var(--vsc-checkbox-mixed-icon-size)',
      height: 'var(--vsc-checkbox-mixed-icon-size)',
      fontSize: 'var(--vsc-checkbox-mixed-icon-size)',
    },

    [`&:hover ${checkboxIndicator}`]: {
      ...shorthands.borderColor(checkboxHoverBorder),
      backgroundColor: checkboxBackground,
      color: checkboxHoverForeground,
    },

    [checkedIndicatorHover]: {
      backgroundColor: checkboxSelectedHoverBackground,
      ...shorthands.borderColor(checkboxSelectedHoverBorder),
      color: checkboxSelectedForeground,
    },

    [mixedIndicatorHover]: {
      backgroundColor: checkboxBackground,
      ...shorthands.borderColor(checkboxSelectedHoverBorder),
      color: checkboxSelectedHoverBackground,
    },

    '&:hover .fui-Checkbox__label': {
      color: checkboxHoverForeground,
    },

    [`&[data-fui-focus-within]:focus-within ${checkboxIndicator}`]: {
      ...shorthands.borderColor(checkboxHoverBorder),
      color: checkboxHoverForeground,
    },

    [`&[data-fui-focus-within]:focus-within ${checkboxInput}:checked ~ ${checkboxIndicator}`]:
      {
        backgroundColor: checkboxSelectedHoverBackground,
        ...shorthands.borderColor(checkboxSelectedHoverBorder),
        color: checkboxSelectedForeground,
      },

    [`&[data-fui-focus-within]:focus-within ${checkboxInput}:indeterminate ~ ${checkboxIndicator}`]:
      {
        backgroundColor: checkboxBackground,
        ...shorthands.borderColor(checkboxSelectedHoverBorder),
        color: checkboxSelectedHoverBackground,
      },

    '&[data-fui-focus-within]:focus-within .fui-Checkbox__label': {
      color: checkboxHoverForeground,
    },

    [disabledIndicator]: {
      backgroundColor: checkboxBackground,
      ...shorthands.borderColor(checkboxBorder),
      color: checkboxForeground,
    },

    [checkedDisabledIndicator]: {
      backgroundColor: checkboxSelectedBackground,
      ...shorthands.borderColor(checkboxSelectedBorder),
      color: checkboxSelectedForeground,
    },

    [mixedDisabledIndicator]: {
      backgroundColor: checkboxBackground,
      ...shorthands.borderColor(checkboxSelectedBorder),
      color: checkboxSelectedBackground,
    },

    '& .fui-Checkbox__label': {
      alignSelf: 'center',
      fontFamily: vscFontFamily,
      fontSize: 'var(--fontSizeBase200, 12px)',
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-foreground)',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
      paddingTop: '0',
      paddingRight: '0',
      paddingBottom: '0',
      paddingLeft: '0',
      cursor: 'pointer',
    },

    '&:focus-visible, &[data-fui-focus-within]:focus-within': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
      borderRadius: '4px',
    },

    [`& ${checkboxInput}:focus-visible ~ ${checkboxIndicator}`]: {
      outlineStyle: 'none',
    },

    '::after': {
      display: 'none' as const,
    },

    '::before': {
      display: 'none' as const,
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

    '& .fui-Checkbox__label': {
      cursor: 'not-allowed',
    },
  },

  small: {
    gap: '4px',

    [`& ${checkboxIndicator}`]: {
      width: '10px',
      height: '10px',
      fontSize: '10px',
      '--vsc-checkbox-check-icon-size': '10px',
      '--vsc-checkbox-mixed-icon-size': '5px',
    },

    '& .fui-Checkbox__label': {
      fontSize: 'var(--fontSizeBase100, 11px)',
      lineHeight: 'var(--lineHeightBase100, 14px)',
    },
  },

  large: {
    gap: '8px',

    [`& ${checkboxIndicator}`]: {
      width: '16px',
      height: '16px',
      fontSize: '16px',
      '--vsc-checkbox-check-icon-size': '16px',
      '--vsc-checkbox-mixed-icon-size': '8px',
    },

    '& .fui-Checkbox__label': {
      fontSize: 'var(--fontSizeBase300, 14px)',
      lineHeight: 'var(--lineHeightBase300, 20px)',
    },
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseCheckboxStylesOptions {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export function useCheckboxStyles(options: UseCheckboxStylesOptions) {
  const { size, disabled, className } = options;
  const base = useBaseStyles();
  const classes = useStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'small' && classes.small,
    size === 'large' && classes.large,
    disabled && classes.disabled,
    className,
  );

  return { rootClassName };
}
