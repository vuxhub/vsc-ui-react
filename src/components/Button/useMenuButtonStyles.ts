import {
  makeStyles,
  mergeClasses,
  shorthands,
  typographyStyles,
} from '@fluentui/react-components';

const vscFontFamily =
  'var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif)';

// ---------------------------------------------------------------------------
//  Base – shared structural styles for MenuButton
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    ...typographyStyles.body1,
    fontFamily: vscFontFamily,
    height: '28px',
    minHeight: '28px',
    minWidth: 'auto',
    paddingTop: '4px',
    paddingRight: '8px',
    paddingBottom: '4px',
    paddingLeft: '8px',
    borderRadius: '4px',
    gap: '4px',
    boxShadow: 'none',

    '& .fui-MenuButton__menuIcon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      lineHeight: '1',
      padding: '0',
      margin: '0',
    },

    '& .fui-Button__icon': {
      fontSize: '16px',
      width: '16px',
      height: '16px',
      margin: '0',
    },

    '& .fui-MenuButton__menuIcon svg': {
      display: 'block',
      width: '14px',
      height: '14px',
    },

    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
    },

    "[aria-pressed='true']": {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
    },

    ':disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },

    "[aria-disabled='true']": {
      opacity: 0.4,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
});

// ---------------------------------------------------------------------------
//  Appearance permutations
// ---------------------------------------------------------------------------

const useAppearanceStyles = makeStyles({
  primary: {
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-button-border)'),
    backgroundColor: 'var(--vscode-button-background)',
    color: 'var(--vscode-button-foreground)',

    ':hover': {
      backgroundColor: 'var(--vscode-button-hoverBackground)',
      color: 'var(--vscode-button-foreground)',

      '& .fui-Button__icon, & .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-button-foreground)',
      },
    },
  },

  secondary: {
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-button-border)'),
    backgroundColor: 'var(--vscode-button-secondaryBackground)',
    color: 'var(--vscode-button-secondaryForeground)',

    ':hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',

      '& .fui-Button__icon, & .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-button-secondaryForeground)',
      },
    },
  },

  outline: {
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('var(--vscode-button-border)'),
    backgroundColor: 'transparent',
    color: 'var(--vscode-button-secondaryForeground)',

    ':hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',

      '& .fui-Button__icon, & .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-button-secondaryForeground)',
      },
    },
  },

  subtle: {
    ...shorthands.borderWidth('1px'),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderColor('transparent'),
    backgroundColor: 'transparent',
    color: 'var(--vscode-button-secondaryForeground)',

    ':hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderColor('var(--vscode-button-border)'),

      '& .fui-Button__icon, & .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-button-secondaryForeground)',
      },
    },

    ':active': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',

      '& .fui-Button__icon, & .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-button-secondaryForeground)',
      },
    },
  },

  transparent: {
    ...shorthands.borderWidth('0'),
    ...shorthands.borderStyle('none'),
    ...shorthands.borderColor('transparent'),
    backgroundColor: 'transparent',
    color: 'var(--vscode-button-secondaryForeground)',

    ':hover': {
      backgroundColor: 'transparent',
      color: 'var(--vscode-textLink-foreground)',

      '& .fui-Button__icon, & .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-textLink-foreground)',
      },
    },
  },
});

// ---------------------------------------------------------------------------
//  Size permutations
// ---------------------------------------------------------------------------

const useSizeStyles = makeStyles({
  small: {
    ...typographyStyles.caption1,
    height: '22px',
    minHeight: '22px',
    paddingTop: '3px',
    paddingRight: '6px',
    paddingBottom: '3px',
    paddingLeft: '6px',
    gap: '3px',

    '& .fui-MenuButton__menuIcon': {
      fontSize: '12px',
    },

    '& .fui-MenuButton__menuIcon svg': {
      width: '12px',
      height: '12px',
    },

    '& .fui-Button__icon': {
      fontSize: '14px',
      width: '14px',
      height: '14px',
      margin: '0',
    },
  },

  compact: {
    ...typographyStyles.caption2,
    height: '16px',
    minHeight: '16px',
    paddingTop: '0',
    paddingRight: '4px',
    paddingBottom: '0',
    paddingLeft: '4px',
    gap: '2px',

    '& .fui-MenuButton__menuIcon': {
      fontSize: '10px',
    },

    '& .fui-MenuButton__menuIcon svg': {
      width: '10px',
      height: '10px',
    },

    '& .fui-Button__icon': {
      fontSize: '12px',
      width: '12px',
      height: '12px',
      margin: '0',
    },
  },
});

// ---------------------------------------------------------------------------
//  Icon‑only modifier
// ---------------------------------------------------------------------------

const useIconOnlyStyles = makeStyles({
  base: {
    width: '28px',
    maxWidth: '28px',
    minWidth: '28px',
    height: '28px',
    maxHeight: '28px',
    minHeight: '28px',
    boxSizing: 'border-box',
    ...shorthands.padding('6px'),
    gap: '2px',

    ':disabled': {
      opacity: 0.5,
    },

    "[aria-disabled='true']": {
      opacity: 0.5,
    },
  },

  small: {
    width: '22px',
    maxWidth: '22px',
    minWidth: '22px',
    height: '22px',
    maxHeight: '22px',
    minHeight: '22px',
    ...shorthands.padding('4px'),
  },

  compact: {
    width: '16px',
    maxWidth: '16px',
    minWidth: '16px',
    height: '16px',
    maxHeight: '16px',
    minHeight: '16px',
    paddingTop: '1.5px',
    paddingRight: '1.5px',
    paddingBottom: '1.5px',
    paddingLeft: '1.5px',
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

type MenuButtonAppearance =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'subtle'
  | 'transparent';
type MenuButtonSize = 'small' | 'medium' | 'large' | 'compact';

export interface UseMenuButtonStylesOptions {
  appearance?: MenuButtonAppearance;
  size?: MenuButtonSize;
  iconOnly?: boolean;
  className?: string;
}

export function useMenuButtonStylesHook(
  options: UseMenuButtonStylesOptions,
): string {
  const {
    appearance = 'secondary',
    size,
    iconOnly = false,
    className,
  } = options;

  const base = useBaseStyles();
  const appearanceClasses = useAppearanceStyles();
  const sizeClasses = useSizeStyles();
  const iconOnlyClasses = useIconOnlyStyles();

  return mergeClasses(
    base.root,
    appearanceClasses[appearance],
    (size === 'small' || size === 'compact') && sizeClasses[size],
    iconOnly && iconOnlyClasses.base,
    iconOnly && size === 'small' && iconOnlyClasses.small,
    iconOnly && size === 'compact' && iconOnlyClasses.compact,
    className,
  );
}
