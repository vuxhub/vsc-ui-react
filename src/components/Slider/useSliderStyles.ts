import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const thumbColor = 'var(--vscode-textLink-foreground)';
const railColor = 'var(--vscode-slider-railBackground)';
const progressColor = 'var(--vscode-slider-progressBackground)';

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    transition: 'none',

    '&.fui-Slider': {
      '--fui-Slider__thumb--color': thumbColor,
      '--fui-Slider__rail--color': railColor,
      '--fui-Slider__progress--color': progressColor,
    },

    '&.fui-Slider:hover': {
      '--fui-Slider__thumb--color': thumbColor,
      '--fui-Slider__progress--color': progressColor,
    },

    '&.fui-Slider:has(.fui-Slider__input:active)': {
      '--fui-Slider__thumb--color': thumbColor,
      '--fui-Slider__progress--color': progressColor,
    },

    '& .fui-Slider__rail': {
      transition: 'none',
    },

    '& .fui-Slider__thumb': {
      transition: 'none',
      boxShadow:
        '0 0 0 calc(var(--fui-Slider__thumb--size) * 0.2) var(--vscode-editor-background) inset',
    },

    '& .fui-Slider__thumb::before': {
      ...shorthands.borderColor('var(--vscode-descriptionForeground)'),
    },

    '&.fui-Slider[data-fui-focus-within]:focus-within::after': {
      ...shorthands.borderColor('var(--vscode-focusBorder)'),
      ...shorthands.borderWidth('1px'),
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

  // Thumb sizes (qualified with the real root class to win over Fluent's
  // single-class size variable).
  small: {
    '&.fui-Slider': {
      '--fui-Slider__thumb--size': '14px',
    },
  },

  medium: {
    '&.fui-Slider': {
      '--fui-Slider__thumb--size': '18px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseSliderStylesOptions {
  size?: 'small' | 'medium';
  disabled?: boolean;
  className?: string;
}

export function useSliderStyles(options: UseSliderStylesOptions) {
  const { size, disabled, className } = options;
  const base = useBaseStyles();
  const classes = useStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'small' ? classes.small : classes.medium,
    disabled && classes.disabled,
    className,
  );

  return { rootClassName };
}
