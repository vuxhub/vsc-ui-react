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

// Keeps the Fluent indicator element itself visually inert so Fluent's own
// state backgrounds/borders never paint the full control slot. All visuals are
// drawn by the indicator `::before` pseudo-element instead.
const inertSlot = {
  backgroundColor: 'transparent',
  boxShadow: 'none',
  borderTopStyle: 'none',
  borderRightStyle: 'none',
  borderBottomStyle: 'none',
  borderLeftStyle: 'none',
} as const;

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    transition: 'none',
    alignItems: 'center',
    gap: '0',
    '--vsc-checkbox-control-size': '22px',
    '--vsc-checkbox-indicator-padding': '5px',
    '--vsc-checkbox-indicator-background': checkboxBackground,
    '--vsc-checkbox-indicator-border': checkboxBorder,
    '--vsc-checkbox-indicator-foreground': checkboxForeground,
    '--vsc-checkbox-check-icon-size': '12px',
    '--vsc-checkbox-mixed-icon-size': '12px',

    [`& ${checkboxInput}`]: {
      width: 'var(--vsc-checkbox-control-size)',
      height: 'var(--vsc-checkbox-control-size)',
      margin: '0',
      opacity: 0,
      appearance: 'none',
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },

    [`& ${checkboxIndicator}`]: {
      boxSizing: 'border-box',
      display: 'flex',
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      padding: 'var(--vsc-checkbox-indicator-padding)',
      margin: '0',
      position: 'relative',
      ...shorthands.borderStyle('none'),
      backgroundColor: 'transparent',
      color: 'var(--vsc-checkbox-indicator-foreground)',
      fill: 'currentColor',
      boxShadow: 'none',
      transition: 'none',
      width: 'var(--vsc-checkbox-control-size)',
      height: 'var(--vsc-checkbox-control-size)',
      fontSize: '12px',

      '&::before': {
        content: '""',
        boxSizing: 'border-box',
        position: 'absolute',
        inset: 'var(--vsc-checkbox-indicator-padding)',
        ...shorthands.borderStyle('solid'),
        ...shorthands.borderColor('var(--vsc-checkbox-indicator-border)'),
        ...shorthands.borderWidth('1px'),
        ...shorthands.borderRadius('2px'),
        backgroundColor: 'var(--vsc-checkbox-indicator-background)',
        transition: 'none',
      },

      '&::after': {
        display: 'none',
      },

      '& > svg': {
        display: 'block',
        position: 'relative',
        zIndex: 1,
        color: 'inherit',
        fill: 'currentColor',
      },
    },

    [checkedIndicator]: {
      ...inertSlot,
      '--vsc-checkbox-indicator-background': checkboxSelectedBackground,
      '--vsc-checkbox-indicator-border': checkboxSelectedBorder,
      '--vsc-checkbox-indicator-foreground': checkboxSelectedForeground,
    },

    [`${checkedIndicator} > svg`]: {
      width: 'var(--vsc-checkbox-check-icon-width)',
      height: 'var(--vsc-checkbox-check-icon-height)',
      color: 'var(--vsc-checkbox-indicator-foreground)',
      fill: 'currentColor',
    },

    [mixedIndicator]: {
      ...inertSlot,
      '--vsc-checkbox-indicator-background': checkboxBackground,
      '--vsc-checkbox-indicator-border': checkboxSelectedBorder,
      '--vsc-checkbox-indicator-foreground': checkboxSelectedBackground,
    },

    [`${mixedIndicator} > svg`]: {
      width: 'var(--vsc-checkbox-mixed-icon-size)',
      height: 'var(--vsc-checkbox-mixed-icon-size)',
      fontSize: 'var(--vsc-checkbox-mixed-icon-size)',
    },

    [`&:hover ${checkboxIndicator}`]: {
      ...inertSlot,
      '--vsc-checkbox-indicator-background': checkboxBackground,
      '--vsc-checkbox-indicator-border': checkboxHoverBorder,
      '--vsc-checkbox-indicator-foreground': checkboxHoverForeground,
    },

    [checkedIndicatorHover]: {
      ...inertSlot,
      '--vsc-checkbox-indicator-background': checkboxSelectedHoverBackground,
      '--vsc-checkbox-indicator-border': checkboxSelectedHoverBorder,
      '--vsc-checkbox-indicator-foreground': checkboxSelectedForeground,
    },

    [mixedIndicatorHover]: {
      ...inertSlot,
      '--vsc-checkbox-indicator-background': checkboxBackground,
      '--vsc-checkbox-indicator-border': checkboxSelectedHoverBorder,
      '--vsc-checkbox-indicator-foreground': checkboxSelectedHoverBackground,
    },

    '&:hover .fui-Checkbox__label': {
      color: checkboxHoverForeground,
    },

    [`&[data-fui-focus-within]:focus-within ${checkboxIndicator}`]: {
      ...inertSlot,
      '--vsc-checkbox-indicator-border': checkboxHoverBorder,
      '--vsc-checkbox-indicator-foreground': checkboxHoverForeground,
    },

    [`&[data-fui-focus-within]:focus-within ${checkboxInput}:checked ~ ${checkboxIndicator}`]:
      {
        ...inertSlot,
        '--vsc-checkbox-indicator-background': checkboxSelectedHoverBackground,
        '--vsc-checkbox-indicator-border': checkboxSelectedHoverBorder,
        '--vsc-checkbox-indicator-foreground': checkboxSelectedForeground,
      },

    [`&[data-fui-focus-within]:focus-within ${checkboxInput}:indeterminate ~ ${checkboxIndicator}`]:
      {
        ...inertSlot,
        '--vsc-checkbox-indicator-background': checkboxBackground,
        '--vsc-checkbox-indicator-border': checkboxSelectedHoverBorder,
        '--vsc-checkbox-indicator-foreground': checkboxSelectedHoverBackground,
      },

    '&[data-fui-focus-within]:focus-within .fui-Checkbox__label': {
      color: checkboxHoverForeground,
    },

    [disabledIndicator]: {
      ...inertSlot,
      '--vsc-checkbox-indicator-background': checkboxBackground,
      '--vsc-checkbox-indicator-border': checkboxBorder,
      '--vsc-checkbox-indicator-foreground': checkboxForeground,
    },

    [checkedDisabledIndicator]: {
      ...inertSlot,
      '--vsc-checkbox-indicator-background': checkboxSelectedBackground,
      '--vsc-checkbox-indicator-border': checkboxSelectedBorder,
      '--vsc-checkbox-indicator-foreground': checkboxSelectedForeground,
    },

    [mixedDisabledIndicator]: {
      ...inertSlot,
      '--vsc-checkbox-indicator-background': checkboxBackground,
      '--vsc-checkbox-indicator-border': checkboxSelectedBorder,
      '--vsc-checkbox-indicator-foreground': checkboxSelectedBackground,
    },

    '& .fui-Checkbox__label': {
      alignSelf: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      minHeight: 'var(--vsc-checkbox-control-size)',
      fontFamily: vscFontFamily,
      fontSize: 'var(--fontSizeBase200, 12px)',
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-foreground)',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
      paddingTop: '0',
      paddingRight: '8px',
      paddingBottom: '0',
      paddingLeft: '0',
      cursor: 'pointer',
    },

    '&:focus-visible, &[data-fui-focus-within]:focus-within': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '0',
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
    '--vsc-checkbox-control-size': '16px',
    '--vsc-checkbox-indicator-padding': '3px',
    '--vsc-checkbox-mixed-icon-size': '10px',

    [`& ${checkboxIndicator}`]: {
      fontSize: '10px',
    },

    '& .fui-Checkbox__label': {
      fontSize: 'var(--fontSizeBase100, 10px)',
      lineHeight: 'var(--lineHeightBase100, 14px)',
      paddingRight: '4px',
    },
  },

  large: {
    '--vsc-checkbox-control-size': '28px',
    '--vsc-checkbox-indicator-padding': '6px',
    '--vsc-checkbox-mixed-icon-size': '16px',

    [`& ${checkboxIndicator}`]: {
      fontSize: '16px',
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
