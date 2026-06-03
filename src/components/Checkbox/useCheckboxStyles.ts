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
    alignItems: 'flex-start',
    gap: '0',
    '--vsc-checkbox-control-size': '24px',
    '--vsc-checkbox-indicator-padding': '6px',
    '--vsc-checkbox-indicator-background': checkboxBackground,
    '--vsc-checkbox-indicator-border': checkboxBorder,
    '--vsc-checkbox-indicator-foreground': checkboxForeground,
    '--vsc-checkbox-check-icon-size': '6px',
    '--vsc-checkbox-mixed-icon-size': '6px',

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
        width: 'var(--vsc-checkbox-check-icon-size)',
        height: 'var(--vsc-checkbox-check-icon-size)',
        fontSize: 'var(--vsc-checkbox-check-icon-size)',
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
      width: 'var(--vsc-checkbox-check-icon-size)',
      height: 'var(--vsc-checkbox-check-icon-size)',
      fontSize: 'var(--vsc-checkbox-check-icon-size)',
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

    // Label trailing/leading padding matches the indicator's internal
    // padding (the transparent space inside the 24x24 indicator slot around
    // the 12x12 visible box). This keeps the focus outline equidistant from
    // the visible box on the indicator side and from the text on the label
    // side. `:last-child` covers labelPosition="after" (default) and
    // `:first-child` covers labelPosition="before".
    '& .fui-Checkbox__label': {
      alignSelf: 'flex-start',
      fontFamily: vscFontFamily,
      fontSize: 'var(--fontSizeBase200, 12px)',
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-foreground)',
      marginTop: '0',
      marginRight: '0',
      marginBottom: '0',
      marginLeft: '0',
      paddingTop: '4px',
      paddingRight: '0',
      paddingBottom: '4px',
      paddingLeft: '0',
      cursor: 'pointer',
    },

    '& .fui-Checkbox__label:last-child': {
      paddingRight: 'var(--vsc-checkbox-indicator-padding)',
    },

    '& .fui-Checkbox__label:first-child': {
      paddingLeft: 'var(--vsc-checkbox-indicator-padding)',
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
    '--vsc-checkbox-control-size': '20px',
    '--vsc-checkbox-indicator-padding': '5px',
    '--vsc-checkbox-check-icon-size': '5px',
    '--vsc-checkbox-mixed-icon-size': '5px',

    [`& ${checkboxIndicator}`]: {
      fontSize: '10px',
    },

    '& .fui-Checkbox__label': {
      fontSize: 'var(--fontSizeBase100, 11px)',
      lineHeight: 'var(--lineHeightBase100, 14px)',
      paddingTop: '3px',
      paddingBottom: '3px',
    },
  },

  large: {
    '--vsc-checkbox-control-size': '28px',
    '--vsc-checkbox-indicator-padding': '6px',
    '--vsc-checkbox-check-icon-size': '8px',
    '--vsc-checkbox-mixed-icon-size': '8px',

    [`& ${checkboxIndicator}`]: {
      fontSize: '16px',
    },

    '& .fui-Checkbox__label': {
      fontSize: 'var(--fontSizeBase300, 14px)',
      lineHeight: 'var(--lineHeightBase300, 20px)',
      paddingTop: '4px',
      paddingBottom: '4px',
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
