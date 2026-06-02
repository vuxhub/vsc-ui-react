import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { vscFontFamily } from '../../styles/tokens';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    position: 'relative',

    '::before': {
      boxSizing: 'border-box',
      display: 'flex',
      flexGrow: 1,
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: 'var(--vscode-divider-background)',
      content: '""',
    },

    '::after': {
      boxSizing: 'border-box',
      display: 'flex',
      flexGrow: 1,
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: 'var(--vscode-divider-background)',
      content: '""',
    },
  },
});

// ---------------------------------------------------------------------------
//  Orientation – horizontal vs vertical
// ---------------------------------------------------------------------------

const useOrientationStyles = makeStyles({
  horizontal: {
    width: '100%',
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
    minHeight: '20px',

    '::before': {
      borderTopStyle: 'none',
      borderRightStyle: 'none',
      borderBottomStyle: 'none',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1px',
      borderLeftColor: 'var(--vscode-divider-background)',
      minHeight: '8px',
    },

    '::after': {
      borderTopStyle: 'none',
      borderRightStyle: 'none',
      borderBottomStyle: 'none',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1px',
      borderLeftColor: 'var(--vscode-divider-background)',
      minHeight: '8px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Size – small vs large
// ---------------------------------------------------------------------------

const useSizeStyles = makeStyles({
  small: {
    '& > span': {
      paddingLeft: '4px',
      paddingRight: '4px',
      fontSize: '14px',
    },
  },
  large: {
    '& > span': {
      paddingLeft: '4px',
      paddingRight: '4px',
      fontSize: '16px',
    },
  },
});

const useVerticalSizeStyles = makeStyles({
  small: {
    '& > span': {
      paddingTop: '4px',
      paddingBottom: '4px',
      fontSize: '14px',
    },
  },
  large: {
    '& > span': {
      paddingTop: '8px',
      paddingBottom: '8px',
      fontSize: '16px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Text alignment – start, center, end
// ---------------------------------------------------------------------------

const useAlignStyles = makeStyles({
  start: {
    '::before': {
      flexGrow: 0,
      flexBasis: '8px',
    },
    '::after': {
      flexGrow: 1,
    },
  },
  center: {
    '::before': {
      flexGrow: 1,
    },
    '::after': {
      flexGrow: 1,
    },
  },
  end: {
    '::before': {
      flexGrow: 1,
    },
    '::after': {
      flexGrow: 0,
      flexBasis: '8px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Vertical text alignment
// ---------------------------------------------------------------------------

const useVerticalAlignStyles = makeStyles({
  start: {
    '::before': {
      flexGrow: 0,
      flexBasis: '8px',
    },
    '::after': {
      flexGrow: 1,
    },
  },
  center: {
    '::before': {
      flexGrow: 1,
    },
    '::after': {
      flexGrow: 1,
    },
  },
  end: {
    '::before': {
      flexGrow: 1,
    },
    '::after': {
      flexGrow: 0,
      flexBasis: '8px',
    },
  },
});

// ---------------------------------------------------------------------------
//  Text wrapper
// ---------------------------------------------------------------------------

const useWrapperStyles = makeStyles({
  wrapper: {
    color: 'var(--vscode-divider-foreground)',
    fontSize: '12px',
    lineHeight: '1',
    whiteSpace: 'nowrap',
  },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export type VscDividerOrientation = 'horizontal' | 'vertical';
export type VscDividerSize = 'small' | 'large';
export type VscDividerAlignContent = 'start' | 'center' | 'end';

export interface UseDividerStylesOptions {
  orientation?: VscDividerOrientation;
  size?: VscDividerSize;
  alignContent?: VscDividerAlignContent;
  className?: string;
}

export function useDividerStyles(options: UseDividerStylesOptions) {
  const {
    orientation = 'horizontal',
    size = 'large',
    alignContent = 'center',
    className,
  } = options;

  const base = useBaseStyles();
  const orientationClasses = useOrientationStyles();
  const sizeClasses = useSizeStyles();
  const verticalSizeClasses = useVerticalSizeStyles();
  const alignClasses = useAlignStyles();
  const verticalAlignClasses = useVerticalAlignStyles();
  const wrapperClasses = useWrapperStyles();

  const rootClassName = mergeClasses(
    base.root,
    orientationClasses[orientation],
    orientation === 'horizontal'
      ? sizeClasses[size]
      : verticalSizeClasses[size],
    orientation === 'horizontal'
      ? alignClasses[alignContent]
      : verticalAlignClasses[alignContent],
    className,
  );

  return { rootClassName, wrapperClassName: wrapperClasses.wrapper };
}
