import { makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
import { vscFontFamily } from '../../styles/tokens';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
  },
});

// ---------------------------------------------------------------------------
//  BreadcrumbButton styles
// ---------------------------------------------------------------------------

const useButtonBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    fontWeight: 400,
    borderRadius: '4px',
    ...shorthands.borderColor('transparent'),
    boxShadow: 'none',
    backgroundColor: 'transparent',
    color: 'var(--vscode-descriptionForeground)',
    minWidth: 'auto',
    transitionProperty: 'none',
    gap: '4px',

    '& .fui-Button__icon': {
      marginRight: '0',
      marginLeft: '0',
    },

    ':hover': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-descriptionForeground)',
    },

    ':active': {
      backgroundColor: 'var(--vscode-button-secondaryHoverBackground)',
      color: 'var(--vscode-descriptionForeground)',
    },

    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '-1px',
      ...shorthands.borderColor('transparent'),
    },

    '::after': {
      display: 'none',
    },

    ':disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
});

const useButtonSizeStyles = makeStyles({
  small: {
    height: '22px',
    minHeight: '22px',
    fontSize: '12px',
    lineHeight: '22px',
    paddingTop: '0',
    paddingBottom: '0',
  },
  medium: {
    height: '28px',
    minHeight: '28px',
    fontSize: '14px',
    lineHeight: '28px',
    paddingTop: '0',
    paddingBottom: '0',

    '& .fui-Button__icon': {
      fontSize: '20px',
      width: '20px',
      height: '20px',
    },
  },
});

const useButtonCurrentStyles = makeStyles({
  current: {
    color: 'var(--vscode-inputOption-activeForeground)',
    fontWeight: 600,

    ':hover': {
      color: 'var(--vscode-inputOption-activeForeground)',
    },

    ':active': {
      color: 'var(--vscode-inputOption-activeForeground)',
    },
  },
});

// ---------------------------------------------------------------------------
//  BreadcrumbItem styles
// ---------------------------------------------------------------------------

const useItemBaseStyles = makeStyles({
  root: {
    ':focus-visible': {
      outlineStyle: 'none',
      outlineWidth: '0',
      outlineColor: 'transparent',
    },
    ':focus': {
      outlineStyle: 'none',
      outlineWidth: '0',
      outlineColor: 'transparent',
    },
  },
});

// ---------------------------------------------------------------------------
//  BreadcrumbDivider styles
// ---------------------------------------------------------------------------

const useDividerBaseStyles = makeStyles({
  root: {
    color: 'var(--vscode-descriptionForeground)',
    display: 'inline-flex',
    alignItems: 'center',
  },
});

const useDividerSizeStyles = makeStyles({
  small: {
    fontSize: '12px',
  },
  medium: {
    fontSize: '14px',
  },
});

// ---------------------------------------------------------------------------
//  Exported types and hooks
// ---------------------------------------------------------------------------

export type VscBreadcrumbSize = 'small' | 'medium';

export interface UseBreadcrumbStylesOptions {
  className?: string;
}

export function useBreadcrumbStyles(options: UseBreadcrumbStylesOptions) {
  const { className } = options;
  const base = useBaseStyles();

  const rootClassName = mergeClasses(base.root, className);

  return rootClassName;
}

export interface UseBreadcrumbItemStylesOptions {
  className?: string;
}

export function useBreadcrumbItemStyles(
  options: UseBreadcrumbItemStylesOptions,
) {
  const { className } = options;
  const base = useItemBaseStyles();

  const rootClassName = mergeClasses(base.root, className);

  return rootClassName;
}

export interface UseBreadcrumbButtonStylesOptions {
  size?: VscBreadcrumbSize;
  current?: boolean;
  className?: string;
}

export function useBreadcrumbButtonStyles(
  options: UseBreadcrumbButtonStylesOptions,
) {
  const { size = 'medium', current, className } = options;
  const base = useButtonBaseStyles();
  const sizeStyles = useButtonSizeStyles();
  const currentStyles = useButtonCurrentStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'small' && sizeStyles.small,
    size === 'medium' && sizeStyles.medium,
    current && currentStyles.current,
    className,
  );

  return rootClassName;
}

export interface UseBreadcrumbDividerStylesOptions {
  size?: VscBreadcrumbSize;
  className?: string;
}

export function useBreadcrumbDividerStyles(
  options: UseBreadcrumbDividerStylesOptions,
) {
  const { size = 'medium', className } = options;
  const base = useDividerBaseStyles();
  const sizeStyles = useDividerSizeStyles();

  const rootClassName = mergeClasses(
    base.root,
    size === 'small' && sizeStyles.small,
    size === 'medium' && sizeStyles.medium,
    className,
  );

  return rootClassName;
}
