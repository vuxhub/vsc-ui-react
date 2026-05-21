import {
  makeStyles,
  mergeClasses,
  shorthands,
  typographyStyles,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

export type VscDialogSize = 'wide' | 'narrow';

// ---------------------------------------------------------------------------
// Surface + backdrop
// ---------------------------------------------------------------------------

const useSurfaceBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    backgroundColor: 'var(--vscode-editorWidget-background)',
    color: 'var(--vscode-editorWidget-foreground)',
    ...shorthands.border('1px', 'solid', 'var(--vscode-widget-border)'),
    borderRadius: '4px',
    boxShadow: '0 2px 16px 0 var(--vscode-widget-shadow)',
    padding: '24px',
    boxSizing: 'border-box',
    transition: 'none',
    maxHeight: 'calc(100dvh - 48px)',

    '::after': {
      display: 'none' as const,
    },

    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
    },
  },
});

const useSurfaceSizeStyles = makeStyles({
  wide: {
    width: '600px',
    maxWidth: 'min(600px, calc(100vw - 48px))',
  },
  narrow: {
    width: '320px',
    maxWidth: 'min(320px, calc(100vw - 48px))',
  },
});

const useBackdropStyles = makeStyles({
  root: {
    backgroundColor: 'var(--vscode-dialog-overlay)',
    transition: 'none',
  },
});

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

const useBodyBaseStyles = makeStyles({
  root: {
    gap: '8px',
    maxHeight: 'inherit',
  },
});

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

const useTitleBaseStyles = makeStyles({
  root: {
    ...typographyStyles.subtitle2,
    fontFamily: vscFontFamily,
    color: 'var(--vscode-foreground)',
    paddingBottom: '0',
  },
  action: {
    alignSelf: 'start',
  },
});

// ---------------------------------------------------------------------------
// Close button (title action slot)
// ---------------------------------------------------------------------------

const useCloseButtonStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    padding: '4px',
    margin: '0',
    boxSizing: 'border-box',
    ...shorthands.border('1px', 'solid', 'var(--vscode-button-border)'),
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--vscode-icon-foreground)',
    cursor: 'pointer',
    transition: 'none',
    lineHeight: 0,

    '::after': {
      display: 'none' as const,
    },

    ':hover': {
      backgroundColor:
        'var(--vscode-toolbar-hoverBackground, rgba(90, 93, 94, 0.31))',
    },

    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
    },
  },
  icon: {
    fontSize: '14px',
    width: '14px',
    height: '14px',
  },
});

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------

const useDescriptionStyles = makeStyles({
  root: {
    ...typographyStyles.caption1,
    fontFamily: vscFontFamily,
    color: 'var(--vscode-descriptionForeground)',
    marginTop: '0',
    marginBottom: '0',
  },
});

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

const useSeparatorStyles = makeStyles({
  root: {
    height: '0',
    margin: '0',
    ...shorthands.borderTop('1px', 'solid', 'var(--vscode-widget-border)'),
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
  },
});

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const useContentBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    color: 'var(--vscode-foreground)',
    fontSize: 'var(--fontSizeBase300, 13px)',
    lineHeight: 'var(--lineHeightBase300, 18px)',
    padding: '0',
    margin: '0',
    minHeight: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowY: 'auto',
  },
});

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

const useActionsBaseStyles = makeStyles({
  root: {
    gap: '8px',
    marginTop: '8px',
  },
  wide: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& > .fui-Button': {
      width: 'auto',
    },
  },
  narrow: {
    flexDirection: 'column',
    justifyContent: 'stretch',
    alignItems: 'stretch',
    justifySelf: 'stretch',
    width: '100%',
    gridColumnStart: '1',
    gridColumnEnd: '-1',

    '& > .fui-Button': {
      width: '100%',
      minWidth: '0',
      maxWidth: 'none',
    },
  },
});

// ---------------------------------------------------------------------------
// Exported hooks
// ---------------------------------------------------------------------------

export interface UseVscDialogSurfaceStylesOptions {
  size?: VscDialogSize;
  className?: string;
}

export function useVscDialogSurfaceStyles(
  options: UseVscDialogSurfaceStylesOptions = {},
) {
  const { size = 'wide', className } = options;
  const base = useSurfaceBaseStyles();
  const sizes = useSurfaceSizeStyles();
  const backdrop = useBackdropStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'narrow' ? sizes.narrow : sizes.wide,
    className,
  );

  const backdropClassName = backdrop.root;

  return { rootClassName, backdropClassName };
}

export interface UseVscDialogBodyStylesOptions {
  className?: string;
}

export function useVscDialogBodyStyles(
  options: UseVscDialogBodyStylesOptions = {},
) {
  const base = useBodyBaseStyles();
  return { rootClassName: mergeClasses(base.root, options.className) };
}

export interface UseVscDialogTitleStylesOptions {
  className?: string;
  actionClassName?: string;
}

export function useVscDialogTitleStyles(
  options: UseVscDialogTitleStylesOptions = {},
) {
  const base = useTitleBaseStyles();
  return {
    rootClassName: mergeClasses(base.root, options.className),
    actionClassName: mergeClasses(base.action, options.actionClassName),
  };
}

export function useVscDialogCloseButtonStyles(className?: string) {
  const styles = useCloseButtonStyles();
  return {
    rootClassName: mergeClasses(styles.root, className),
    iconClassName: styles.icon,
  };
}

export function useVscDialogDescriptionStyles(className?: string) {
  const styles = useDescriptionStyles();
  return { rootClassName: mergeClasses(styles.root, className) };
}

export function useVscDialogSeparatorStyles(className?: string) {
  const styles = useSeparatorStyles();
  return { rootClassName: mergeClasses(styles.root, className) };
}

export function useVscDialogContentStyles(className?: string) {
  const base = useContentBaseStyles();
  return { rootClassName: mergeClasses(base.root, className) };
}

export interface UseVscDialogActionsStylesOptions {
  size?: VscDialogSize;
  className?: string;
}

export function useVscDialogActionsStyles(
  options: UseVscDialogActionsStylesOptions = {},
) {
  const { size = 'wide', className } = options;
  const base = useActionsBaseStyles();
  const rootClassName = mergeClasses(
    base.root,
    size === 'narrow' ? base.narrow : base.wide,
    className,
  );
  return { rootClassName, fluid: size === 'narrow' };
}
