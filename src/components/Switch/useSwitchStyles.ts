import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

/** Checked track — matches Fluent input:checked selector specificity */
const checkedInput =
  '& input.fui-Switch__input:enabled:checked:not([aria-disabled="true"])';
const checkedIndicator = `${checkedInput} ~ .fui-Switch__indicator.fui-Switch__indicator`;
const checkedIndicatorHover = `${checkedInput}:hover ~ .fui-Switch__indicator.fui-Switch__indicator`;
const checkedIndicatorActive = `${checkedInput}:active ~ .fui-Switch__indicator.fui-Switch__indicator`;
const checkedTrackBackground = 'var(--vscode-checkbox-selectBackground)';
const checkedTrackBorder = 'var(--vscode-checkbox-selectBorder)';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles (medium / default size)
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    transition: 'none',
    alignItems: 'center',
    gap: '6px',

    '& .fui-Switch__indicator.fui-Switch__indicator': {
      position: 'relative',
      display: 'block',
      boxSizing: 'border-box',
      width: '32px',
      height: '16px',
      borderRadius: '8px',
      padding: '0',
      margin: '0',
      flexShrink: 0,
      overflow: 'visible',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor(
        'var(--vscode-settings-checkboxBorder, var(--vscode-checkbox-border))',
      ),
      backgroundColor:
        'var(--vscode-settings-checkboxBackground, var(--vscode-checkbox-background))',
      boxShadow: 'none',
      transition: 'none',

      // Medium: 11.2px thumb in 16px track
      '--vsc-switch-thumb-size': '11.2px',
      '--vsc-switch-thumb-inset': '2.4px',

      '& > *': {
        display: 'none' as const,
      },

      '::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: 'var(--vsc-switch-thumb-inset)',
        transform: 'translateY(-50%)',
        width: 'var(--vsc-switch-thumb-size)',
        height: 'var(--vsc-switch-thumb-size)',
        borderRadius: '50%',
        boxSizing: 'border-box',
        backgroundColor:
          'var(--vscode-settings-checkboxForeground, var(--vscode-checkbox-foreground, var(--vscode-foreground)))',
        transition: 'none',
        pointerEvents: 'none',
      },
    },

    [checkedIndicator]: {
      backgroundColor: checkedTrackBackground,
      ...shorthands.borderColor(checkedTrackBorder),

      '::after': {
        left: 'auto',
        right: 'var(--vsc-switch-thumb-inset)',
        // Switch thumb on selected track is always white (distinct from checkbox checkmark token)
        backgroundColor: '#ffffff',
      },
    },

    '& .fui-Switch__label': {
      fontFamily: vscFontFamily,
      fontSize: 'var(--fontSizeBase200, 12px)',
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-foreground)',
      paddingTop: '0',
      paddingBottom: '0',
      cursor: 'pointer',
    },

    ':hover .fui-Switch__indicator.fui-Switch__indicator': {
      backgroundColor:
        'var(--vscode-settings-checkboxBackground, var(--vscode-checkbox-background))',
      ...shorthands.borderColor(
        'var(--vscode-settings-checkboxBorder, var(--vscode-checkbox-border))',
      ),
    },

    [checkedIndicatorHover]: {
      backgroundColor: checkedTrackBackground,
      ...shorthands.borderColor(checkedTrackBorder),
    },

    [checkedIndicatorActive]: {
      backgroundColor: checkedTrackBackground,
      ...shorthands.borderColor(checkedTrackBorder),
    },

    '&:focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
      borderRadius: '4px',
    },

    '& input:focus-visible ~ .fui-Switch__indicator.fui-Switch__indicator': {
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

    '& .fui-Switch__label': {
      cursor: 'not-allowed',
    },
  },

  small: {
    '& .fui-Switch__indicator.fui-Switch__indicator': {
      width: '26px',
      height: '13px',
      borderRadius: '6.5px',
      '--vsc-switch-thumb-size': '9.1px',
      '--vsc-switch-thumb-inset': '1.95px',
    },
  },

  large: {
    '& .fui-Switch__indicator.fui-Switch__indicator': {
      width: '40px',
      height: '20px',
      borderRadius: '10px',
      '--vsc-switch-thumb-size': '14px',
      '--vsc-switch-thumb-inset': '3px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseSwitchStylesOptions {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export function useSwitchStyles(options: UseSwitchStylesOptions) {
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
