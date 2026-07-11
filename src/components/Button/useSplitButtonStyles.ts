import {
  makeStyles,
  mergeClasses,
  shorthands,
  typographyStyles,
} from '@fluentui/react-components';

const vscFontFamily =
  'var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif)';

// ---------------------------------------------------------------------------
//  Base – shared structural styles for the SplitButton wrapper
//
//  SplitButton is a compound component whose children (primary action button
//  and menu button) can only be styled through nested selectors targeting
//  Fluent UI internal class names.  This is an acceptable use of nested
//  selectors per the handbook ("use nested selectors with pseudo classes" and
//  when direct class application is impossible).
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,

    '& .fui-SplitButton__primaryActionButton': {
      ...typographyStyles.body1,
      height: '28px',
      minHeight: '28px',
      minWidth: 'auto',
      borderRadius: '4px',
      padding: '4px 8px',
      gap: '4px',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },

    '& .fui-SplitButton__menuButton': {
      ...typographyStyles.body1,
      height: '28px',
      minHeight: '28px',
      borderRadius: '4px',
      width: '24px',
      minWidth: '24px',
      padding: '8px 6px',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },

    '& .fui-SplitButton__menuButton .fui-MenuButton__menuIcon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      lineHeight: '1',
      padding: '0',
      margin: '0',
    },

    '& .fui-SplitButton__menuButton svg': {
      display: 'block',
      width: '14px',
      height: '14px',
    },

    '& .fui-SplitButton__primaryActionButton:focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
      zIndex: 1,
    },

    '& .fui-SplitButton__menuButton:focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
    },

    "& .fui-SplitButton__primaryActionButton[aria-pressed='true']": {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
      zIndex: 1,
    },

    "& .fui-SplitButton__menuButton[aria-pressed='true']": {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
    },

    '& .fui-SplitButton__primaryActionButton:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },

    '& .fui-SplitButton__menuButton:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },

    // Icon sizing – default (16px)
    '& .fui-SplitButton__primaryActionButton .fui-Button__icon': {
      fontSize: '16px',
      width: '16px',
      height: '16px',
      margin: '0',
    },
  },
});

// ---------------------------------------------------------------------------
//  Appearance permutations
// ---------------------------------------------------------------------------

const useAppearanceStyles = makeStyles({
  primary: {
    '& .fui-SplitButton__primaryActionButton': {
      backgroundColor: 'var(--vscode-button-background)',
      color: 'var(--vscode-button-foreground)',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor('var(--vscode-button-border)'),
      borderRightWidth: '0',
    },
    '& .fui-SplitButton__menuButton': {
      backgroundColor: 'var(--vscode-button-background)',
      color: 'var(--vscode-button-foreground)',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor('var(--vscode-button-border)'),
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'var(--vscode-button-separator)',
    },
    '& .fui-SplitButton__primaryActionButton:hover': {
      backgroundColor: 'var(--vscode-button-hoverBackground)',
      color: 'var(--vscode-button-foreground)',

      '& .fui-Button__icon': {
        color: 'var(--vscode-button-foreground)',
      },
    },
    '& .fui-SplitButton__menuButton:hover': {
      backgroundColor: 'var(--vscode-button-hoverBackground)',
      color: 'var(--vscode-button-foreground)',

      '& .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-button-foreground)',
      },
    },
  },

  secondary: {
    '& .fui-SplitButton__primaryActionButton': {
      backgroundColor: 'var(--vscode-button-secondaryBackground)',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor('var(--vscode-button-border)'),
      borderRightWidth: '0',
    },
    '& .fui-SplitButton__menuButton': {
      backgroundColor: 'var(--vscode-button-secondaryBackground)',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor('var(--vscode-button-border)'),
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'var(--vscode-button-separator)',
    },
    '& .fui-SplitButton__primaryActionButton:hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',

      '& .fui-Button__icon': {
        color: 'var(--vscode-button-secondaryForeground)',
      },
    },
    '& .fui-SplitButton__menuButton:hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',

      '& .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-button-secondaryForeground)',
      },
    },
  },

  outline: {
    '& .fui-SplitButton__primaryActionButton': {
      backgroundColor: 'transparent',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor('var(--vscode-button-border)'),
      borderRightWidth: '0',
    },
    '& .fui-SplitButton__menuButton': {
      backgroundColor: 'transparent',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor('var(--vscode-button-border)'),
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'var(--vscode-button-separator)',
    },
    '& .fui-SplitButton__primaryActionButton:hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',

      '& .fui-Button__icon': {
        color: 'var(--vscode-button-secondaryForeground)',
      },
    },
    '& .fui-SplitButton__menuButton:hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',

      '& .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-button-secondaryForeground)',
      },
    },
  },

  subtle: {
    '& .fui-SplitButton__primaryActionButton': {
      backgroundColor: 'transparent',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor('transparent'),
    },
    '& .fui-SplitButton__menuButton': {
      backgroundColor: 'transparent',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      ...shorthands.borderColor('transparent'),
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'var(--vscode-button-separator)',
    },
    '& .fui-SplitButton__primaryActionButton:hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderColor('var(--vscode-button-border)'),
    },
    '& .fui-SplitButton__menuButton:hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderColor('var(--vscode-button-border)'),

      '& .fui-MenuButton__menuIcon': {
        color: 'var(--vscode-button-secondaryForeground)',
      },
    },
  },

  transparent: {
    '& .fui-SplitButton__primaryActionButton': {
      backgroundColor: 'transparent',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderWidth('0'),
      ...shorthands.borderStyle('none'),
    },
    '& .fui-SplitButton__menuButton': {
      backgroundColor: 'transparent',
      color: 'var(--vscode-button-secondaryForeground)',
      ...shorthands.borderWidth('0'),
      ...shorthands.borderStyle('none'),
      borderLeftWidth: '1px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'var(--vscode-button-separator)',
    },
    '& .fui-SplitButton__primaryActionButton:hover': {
      backgroundColor: 'transparent',
      color: 'var(--vscode-textLink-foreground)',

      '& .fui-Button__icon': {
        color: 'var(--vscode-textLink-foreground)',
      },
    },
    '& .fui-SplitButton__menuButton:hover': {
      backgroundColor: 'transparent',
      color: 'var(--vscode-textLink-foreground)',

      '& .fui-MenuButton__menuIcon': {
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
    '& .fui-SplitButton__primaryActionButton': {
      ...typographyStyles.caption1,
      height: '22px',
      minHeight: '22px',
      minWidth: 'auto',
      gap: '3px',
      padding: '3px 6px',
    },
    '& .fui-SplitButton__menuButton': {
      ...typographyStyles.caption1,
      height: '22px',
      minHeight: '22px',
      gap: '3px',
      width: '20px',
      minWidth: '20px',
      padding: '5px 6px',
    },
    // Icon sizing – small (14px)
    '& .fui-SplitButton__primaryActionButton .fui-Button__icon': {
      fontSize: '14px',
      width: '14px',
      height: '14px',
      margin: '0',
    },
    '& .fui-SplitButton__menuButton svg': {
      width: '12px',
      height: '12px',
    },
  },

  compact: {
    '& .fui-SplitButton__primaryActionButton': {
      ...typographyStyles.caption2,
      height: '16px',
      minHeight: '16px',
      minWidth: 'auto',
      gap: '2px',
      padding: '0 4px',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
    '& .fui-SplitButton__menuButton': {
      ...typographyStyles.caption2,
      height: '16px',
      minHeight: '16px',
      gap: '2px',
      width: '16px',
      minWidth: '16px',
      padding: '1.5px',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },
    // Icon sizing – compact (12px)
    '& .fui-SplitButton__primaryActionButton .fui-Button__icon': {
      fontSize: '12px',
      width: '12px',
      height: '12px',
      margin: '0',
    },
    '& .fui-SplitButton__menuButton svg': {
      width: '10px',
      height: '10px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Icon‑only modifier
// ---------------------------------------------------------------------------

const useIconOnlyStyles = makeStyles({
  base: {
    '& .fui-SplitButton__primaryActionButton': {
      width: '28px',
      minWidth: '28px',
      padding: '6px',
      borderRadius: '4px',
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
    '& .fui-SplitButton__menuButton': {
      borderRadius: '4px',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
    },
    '& .fui-SplitButton__primaryActionButton:disabled': {
      opacity: 0.5,
    },
    '& .fui-SplitButton__menuButton:disabled': {
      opacity: 0.5,
    },
  },

  small: {
    '& .fui-SplitButton__primaryActionButton': {
      width: '22px',
      minWidth: '22px',
      padding: '4px',
    },
  },

  compact: {
    '& .fui-SplitButton__primaryActionButton': {
      width: '15px',
      minWidth: '15px',
      padding: '1.5px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

type SplitButtonAppearance =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'subtle'
  | 'transparent';
type SplitButtonSize = 'small' | 'medium' | 'large' | 'compact';

export interface UseSplitButtonStylesOptions {
  appearance?: SplitButtonAppearance;
  size?: SplitButtonSize;
  iconOnly?: boolean;
  className?: string;
}

export function useSplitButtonStylesHook(
  options: UseSplitButtonStylesOptions,
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
