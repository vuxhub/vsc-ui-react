import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';

export type VscMessageBarIntent =
  | 'default'
  | 'info'
  | 'warning'
  | 'error'
  | 'success';
export type VscMessageBarLayout = 'auto' | 'multiline' | 'singleline';
export type VscMessageBarShape = 'rounded' | 'square';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    transition: 'none',
    boxShadow: 'none',
    minHeight: '36px',
    color: 'var(--vscode-foreground)',

    // Qualify with the real root class so these win over Fluent's per-intent
    // background / border atomic rules regardless of stylesheet insertion order.
    '&.fui-MessageBar': {
      backgroundColor: 'transparent',
      ...shorthands.borderWidth('1px'),
      ...shorthands.borderStyle('solid'),
      borderRadius: '4px',
    },

    '& a': {
      color: 'var(--vscode-textLink-foreground)',
    },

    '& a:active, & a:hover': {
      color: 'var(--vscode-textLink-activeForeground)',
    },

    // Dismiss (container action) button — 22px instead of Fluent's 28px.
    '& .fui-MessageBarActions__containerAction .fui-Button': {
      minWidth: '22px',
      maxWidth: '22px',
      height: '22px',
      minHeight: '22px',
      maxHeight: '22px',
      padding: '0',
    },

    // Dismiss icon — 14px per Figma (Fluent's default is 16px).
    '& .fui-MessageBarActions__containerAction .fui-Button__icon': {
      fontSize: '14px',
      width: '14px',
      height: '14px',
    },

    '& .fui-MessageBarActions__containerAction .fui-Button__icon svg': {
      width: '14px',
      height: '14px',
    },

    // In multiline (incl. auto-reflow) Fluent uses 12px actions padding-right;
    // restore it over our 8px singleline value. The bottomReflowSpacer is only
    // rendered when the bar is multiline, so it's a reliable runtime marker.
    '&:has(.fui-MessageBar__bottomReflowSpacer) .fui-MessageBarActions': {
      paddingRight: '12px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Intent permutations – border color + icon color
// ---------------------------------------------------------------------------

const useIntentStyles = makeStyles({
  default: {
    '&.fui-MessageBar': {
      ...shorthands.borderColor('var(--vscode-descriptionForeground)'),
    },
    '& .fui-MessageBar__icon': {
      color: 'var(--vscode-icon-foreground)',
    },
  },
  info: {
    '&.fui-MessageBar': {
      ...shorthands.borderColor('var(--vscode-inputValidation-infoBorder)'),
    },
    '& .fui-MessageBar__icon': {
      color: 'var(--vscode-editorInfo-foreground)',
    },
  },
  warning: {
    '&.fui-MessageBar': {
      ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),
    },
    '& .fui-MessageBar__icon': {
      color: 'var(--vscode-editorWarning-foreground)',
    },
  },
  error: {
    '&.fui-MessageBar': {
      ...shorthands.borderColor('var(--vscode-inputValidation-errorBorder)'),
    },
    '& .fui-MessageBar__icon': {
      color: 'var(--vscode-errorForeground)',
    },
  },
  success: {
    '&.fui-MessageBar': {
      ...shorthands.borderColor('var(--vscode-badge-successBackground)'),
    },
    '& .fui-MessageBar__icon': {
      color: 'var(--vscode-badge-successForeground)',
    },
  },
});

// ---------------------------------------------------------------------------
//  Shape permutation
// ---------------------------------------------------------------------------

const useShapeStyles = makeStyles({
  square: {
    '&.fui-MessageBar': {
      borderRadius: '0',
    },
  },
});

// ---------------------------------------------------------------------------
//  Body / Title / Actions slot styles
// ---------------------------------------------------------------------------

const useBodyStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    fontSize: '12px',
    lineHeight: '16px',
    color: 'var(--vscode-foreground)',
  },
});

const useTitleStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    fontSize: '12px',
    lineHeight: '16px',
    color: 'var(--vscode-foreground)',
    fontWeight: 600,
  },
});

const useActionsStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,

    // Tighten the gap between secondary action buttons (Fluent default 12px).
    '&.fui-MessageBarActions': {
      columnGap: '8px',
      paddingRight: '8px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Exported hooks
// ---------------------------------------------------------------------------

export interface UseMessageBarStylesOptions {
  intent?: VscMessageBarIntent;
  shape?: VscMessageBarShape;
  className?: string;
}

export function useMessageBarStyles(options: UseMessageBarStylesOptions) {
  const { intent = 'default', shape = 'rounded', className } = options;
  const base = useBaseStyles();
  const intents = useIntentStyles();
  const shapes = useShapeStyles();

  const rootClassName = mergeClasses(
    base.root,
    intents[intent],
    shape === 'square' && shapes.square,
    className, // always last — allows consumer overrides
  );

  return { rootClassName };
}

export function useMessageBarBodyStyles(className?: string) {
  const styles = useBodyStyles();
  return { rootClassName: mergeClasses(styles.root, className) };
}

export function useMessageBarTitleStyles(className?: string) {
  const styles = useTitleStyles();
  return { rootClassName: mergeClasses(styles.root, className) };
}

export function useMessageBarActionsStyles(className?: string) {
  const styles = useActionsStyles();
  return { rootClassName: mergeClasses(styles.root, className) };
}
