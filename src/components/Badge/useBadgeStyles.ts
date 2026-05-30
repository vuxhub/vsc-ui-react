import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

export type VscBadgeAppearance = 'filled' | 'tint' | 'outline' | 'subtle';
export type VscBadgeColor =
  | 'blue'
  | 'red'
  | 'yellow'
  | 'green'
  | 'neutral'
  | 'neutralContrast';
export type VscBadgeSize = 'small' | 'medium' | 'large';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    transition: 'none',
    boxShadow: 'none',
    borderRadius: '9999px',
    fontWeight: 400,
    width: 'auto',
    minWidth: 'auto',
    maxWidth: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'flex-start',

    // Override Fluent's asymmetric padding (extra inset for text + negative icon margin).
    '&.fui-Badge.fui-Badge': {
      padding: '0',
    },

    '& .fui-Badge__icon.fui-Badge__icon': {
      marginTop: '0',
      marginBottom: '0',
      marginLeft: '0',
      marginRight: '0',
    },

    '::after': {
      display: 'none',
    },
  },
});

// ---------------------------------------------------------------------------
//  Icon slot – centered in fixed-size container
// ---------------------------------------------------------------------------

const useIconStyles = makeStyles({
  base: {
    position: 'relative',
    display: 'block',
    flexShrink: 0,
    margin: '0',
    padding: '0',
    lineHeight: 0,
    boxSizing: 'border-box',

    '& svg': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'block',
      margin: '0',
    },
  },
  small: {
    width: '12px',
    height: '12px',
    minWidth: '12px',
    maxWidth: '12px',
    minHeight: '12px',
    maxHeight: '12px',
    fontSize: '8px',

    '& svg': {
      width: '8px',
      height: '8px',
    },
  },
  medium: {
    width: '12px',
    height: '12px',
    minWidth: '12px',
    maxWidth: '12px',
    minHeight: '12px',
    maxHeight: '12px',
    fontSize: '8px',

    '& svg': {
      width: '8px',
      height: '8px',
    },
  },
  large: {
    width: '16px',
    height: '16px',
    minWidth: '16px',
    maxWidth: '16px',
    minHeight: '16px',
    maxHeight: '16px',
    fontSize: '14px',

    '& svg': {
      width: '14px',
      height: '14px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Text label spacing
// ---------------------------------------------------------------------------

const useTextStyles = makeStyles({
  root: {
    display: 'inline-block',
    lineHeight: 'inherit',
  },
  small: {
    paddingLeft: '1px',
    paddingRight: '1px',
  },
  medium: {
    paddingLeft: '2px',
    paddingRight: '2px',
  },
  large: {
    paddingLeft: '3px',
    paddingRight: '3px',
  },
});

// ---------------------------------------------------------------------------
//  Size permutations
// ---------------------------------------------------------------------------

const useSizeStyles = makeStyles({
  /** Figma: 48 × 16 (width hugs content) */
  small: {
    '&.fui-Badge.fui-Badge': {
      height: '16px',
      minHeight: '16px',
      maxHeight: '16px',
      width: 'auto',
      minWidth: 'auto',
      paddingTop: '2px',
      paddingBottom: '2px',
      paddingLeft: '1px',
      paddingRight: '2px',
      fontSize: '10px',
      lineHeight: '14px',
    },
  },

  /** Figma: 58 × 20 (width hugs content) */
  medium: {
    '&.fui-Badge.fui-Badge': {
      height: '20px',
      minHeight: '20px',
      maxHeight: '20px',
      width: 'auto',
      minWidth: 'auto',
      paddingTop: '3px',
      paddingBottom: '3px',
      paddingLeft: '4px',
      paddingRight: '4px',
      fontSize: '12px',
      lineHeight: '16px',
    },
  },

  /** Figma: 64 × 24 (width hugs content) */
  large: {
    '&.fui-Badge.fui-Badge': {
      height: '24px',
      minHeight: '24px',
      maxHeight: '24px',
      width: 'auto',
      minWidth: 'auto',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingLeft: '4px',
      paddingRight: '4px',
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Color × appearance permutations
// ---------------------------------------------------------------------------

const useColorAppearanceStyles = makeStyles({
  // Blue
  blueFilled: {
    backgroundColor: 'var(--vscode-badge-background)',
    color: 'var(--vscode-button-foreground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('--vscode-badge-background'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-foreground)',
    },
  },
  blueTint: {
    backgroundColor:
      'color-mix(in srgb, var(--vscode-badge-background) 10%, transparent)',
    color: 'var(--vscode-textLink-foreground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-textLink-foreground)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-textLink-foreground)',
    },
  },
  blueOutline: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-textLink-foreground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-textLink-foreground)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-textLink-foreground)',
    },
  },
  blueSubtle: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-textLink-foreground)',
    ...shorthands.borderColor('transparent'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-textLink-foreground)',
    },
  },

  // Red
  redFilled: {
    backgroundColor: 'var(--vscode-badge-errorBackground)',
    color: 'var(--vscode-button-foreground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-badge-errorBackground)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-foreground)',
    },
  },
  redTint: {
    backgroundColor:
      'color-mix(in srgb, var(--vscode-badge-errorBackground) 10%, transparent)',
    color: 'var(--vscode-badge-errorBackground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-badge-errorBackground)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-badge-errorBackground)',
    },
  },
  redOutline: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-badge-errorBackground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-badge-errorBackground)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-badge-errorBackground)',
    },
  },
  redSubtle: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-badge-errorBackground)',
    ...shorthands.borderColor('transparent'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-badge-errorBackground)',
    },
  },

  // Yellow
  yellowFilled: {
    backgroundColor: 'var(--vscode-inputValidation-warningBorder)',
    color: 'var(--vscode-button-foreground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-foreground)',
    },
  },
  yellowTint: {
    backgroundColor:
      'color-mix(in srgb, var(--vscode-editorWarning-foreground) 10.2%, transparent)',
    color: 'var(--vscode-inputValidation-warningBorder)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-inputValidation-warningBorder)',
    },
  },
  yellowOutline: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-inputValidation-warningBorder)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-inputValidation-warningBorder)',
    },
  },
  yellowSubtle: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-inputValidation-warningBorder)',
    ...shorthands.borderColor('transparent'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-inputValidation-warningBorder)',
    },
  },

  // Green
  greenFilled: {
    backgroundColor: 'var(--vscode-badge-successBackground)',
    color: 'var(--vscode-button-foreground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor(
      'var(--vscode-badge-successBackground)',
    ),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-foreground)',
    },
  },
  greenTint: {
    backgroundColor:
      'color-mix(in srgb, var(--vscode-badge-successForeground) 10%, transparent)',
    color: 'var(--vscode-badge-successForeground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor(
      'var(--vscode-badge-successForeground)',
    ),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-badge-successForeground)',
    },
  },
  greenOutline: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-badge-successForeground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor(
      'var(--vscode-badge-successForeground)',
    ),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-badge-successForeground)',
    },
  },
  greenSubtle: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-badge-successForeground)',
    ...shorthands.borderColor('transparent'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-badge-successForeground)',
    },
  },

  // Neutral
  neutralFilled: {
    backgroundColor: 'var(--vscode-badge-neutralBackground)',
    color: 'var(--vscode-badge-neutralForeground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-badge-neutralForeground)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-badge-neutralForeground)',
    },
  },
  neutralTint: {
    backgroundColor: 'var(--vscode-badge-neutralForeground)',
    color: 'var(--vscode-button-secondaryForeground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-descriptionForeground)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-secondaryForeground)',
    },
  },
  neutralOutline: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-button-secondaryForeground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-button-secondaryForeground)'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-secondaryForeground)',
    },
  },
  neutralSubtle: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-button-secondaryForeground)',
    ...shorthands.borderColor('transparent'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-secondaryForeground)',
    },
  },

  // Neutral contrast (white/dark pill per theme)
  neutralContrastFilled: {
    backgroundColor: 'var(--vscode-badge-neutralContrastBackground)',
    color: 'var(--vscode-button-secondaryForeground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor(
      'var(--vscode-badge-neutralContrastBackground)',
    ),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-secondaryForeground)',
    },
  },
  neutralContrastTint: {
    backgroundColor: 'var(--vscode-badge-neutralContrastBackground)',
    color: 'var(--vscode-button-secondaryForeground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor(
      'var(--vscode-badge-neutralContrastForeground)',
    ),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-secondaryForeground)',
    },
  },
  neutralContrastOutline: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-button-secondaryForeground)',
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor(
      'var(--vscode-badge-neutralContrastForeground)',
    ),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-secondaryForeground)',
    },
  },
  neutralContrastSubtle: {
    backgroundColor: 'transparent',
    color: 'var(--vscode-button-secondaryForeground)',
    ...shorthands.borderColor('transparent'),

    '& .fui-Badge__icon': {
      color: 'var(--vscode-button-secondaryForeground)',
    },
  },
});

function getColorAppearanceClass(
  color: VscBadgeColor,
  appearance: VscBadgeAppearance,
  classes: ReturnType<typeof useColorAppearanceStyles>,
): string | false {
  const map: Record<string, keyof ReturnType<typeof useColorAppearanceStyles>> =
    {
      bluefilled: 'blueFilled',
      bluetint: 'blueTint',
      blueoutline: 'blueOutline',
      bluesubtle: 'blueSubtle',
      redfilled: 'redFilled',
      redtint: 'redTint',
      redoutline: 'redOutline',
      redsubtle: 'redSubtle',
      yellowfilled: 'yellowFilled',
      yellowtint: 'yellowTint',
      yellowoutline: 'yellowOutline',
      yellowsubtle: 'yellowSubtle',
      greenfilled: 'greenFilled',
      greentint: 'greenTint',
      greenoutline: 'greenOutline',
      greensubtle: 'greenSubtle',
      neutralfilled: 'neutralFilled',
      neutraltint: 'neutralTint',
      neutraloutline: 'neutralOutline',
      neutralsubtle: 'neutralSubtle',
      neutralcontrastfilled: 'neutralContrastFilled',
      neutralcontrasttint: 'neutralContrastTint',
      neutralcontrastoutline: 'neutralContrastOutline',
      neutralcontrastsubtle: 'neutralContrastSubtle',
    };

  const key = `${color}${appearance}`;
  const classKey = map[key.toLowerCase()];
  return classKey ? classes[classKey] : false;
}

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseBadgeStylesOptions {
  appearance?: VscBadgeAppearance;
  color?: VscBadgeColor;
  size?: VscBadgeSize;
  className?: string;
}

export function useBadgeStyles(options: UseBadgeStylesOptions) {
  const {
    appearance = 'filled',
    color = 'blue',
    size = 'medium',
    className,
  } = options;

  const base = useBaseStyles();
  const sizes = useSizeStyles();
  const icons = useIconStyles();
  const text = useTextStyles();
  const colorAppearance = useColorAppearanceStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'small' && sizes.small,
    size === 'medium' && sizes.medium,
    size === 'large' && sizes.large,
    getColorAppearanceClass(color, appearance, colorAppearance),
    className,
  );

  const iconClassName = mergeClasses(
    icons.base,
    size === 'small' && icons.small,
    size === 'medium' && icons.medium,
    size === 'large' && icons.large,
  );

  const textClassName = mergeClasses(
    text.root,
    size === 'small' && text.small,
    size === 'medium' && text.medium,
    size === 'large' && text.large,
  );

  return { rootClassName, textClassName, iconClassName };
}
