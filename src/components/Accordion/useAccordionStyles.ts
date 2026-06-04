import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { vscFontFamily } from '../../styles/tokens';

// ---------------------------------------------------------------------------
//  Types
// ---------------------------------------------------------------------------

export type VscAccordionSize = 'small' | 'medium' | 'large' | 'extra-large';
export type VscAccordionIconPosition = 'before' | 'after';

// ---------------------------------------------------------------------------
//  Base – root override styles via makeStyles
// ---------------------------------------------------------------------------

const useBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    color: 'var(--vscode-foreground)',
    boxShadow: 'none',
    width: '100%',
  },
  summary: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    listStyleType: 'none',
    userSelect: 'none',
    fontFamily: vscFontFamily,
    color: 'var(--vscode-foreground)',
    paddingLeft: '0',
    paddingRight: '0',

    '::-webkit-details-marker': {
      display: 'none',
    },

    ':focus-visible': {
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: 'var(--vscode-focusBorder)',
      outlineOffset: '2px',
    },
  },
  summaryAfter: {
    justifyContent: 'space-between',
  },
  content: {
    paddingTop: '4px',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transitionProperty: 'transform',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'ease',
    transform: 'rotate(-90deg)',
  },
  iconExpanded: {
    transform: 'rotate(0deg)',
  },
  expanded: {
    color: 'var(--vscode-foreground)',
  },
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});

// ---------------------------------------------------------------------------
//  Size permutations
// ---------------------------------------------------------------------------

const useSizeStyles = makeStyles({
  small: {
    height: '16px',
    minHeight: '16px',
    fontSize: '12px',
    gap: '4px',
  },
  medium: {
    height: '20px',
    minHeight: '20px',
    fontSize: '14px',
    gap: '8px',
  },
  large: {
    height: '22px',
    minHeight: '22px',
    fontSize: '16px',
    gap: '8px',
  },
  'extra-large': {
    height: '28px',
    minHeight: '28px',
    fontSize: '20px',
    gap: '8px',
  },
});

const useIconSizeStyles = makeStyles({
  small: { width: '16px', height: '16px' },
  medium: { width: '16px', height: '16px' },
  large: { width: '20px', height: '20px' },
  'extra-large': { width: '20px', height: '20px' },
});

// ---------------------------------------------------------------------------
//  Exported hook
// ---------------------------------------------------------------------------

export interface UseAccordionStylesOptions {
  size?: VscAccordionSize;
  iconPosition?: VscAccordionIconPosition;
  disabled?: boolean;
  open?: boolean;
  className?: string;
}

export function useAccordionStyles(options: UseAccordionStylesOptions) {
  const {
    size = 'medium',
    iconPosition = 'before',
    disabled,
    open,
    className,
  } = options;
  const base = useBaseStyles();
  const sizes = useSizeStyles();
  const iconSizes = useIconSizeStyles();

  const rootClassName = mergeClasses(
    base.root,
    open && base.expanded,
    disabled && base.disabled,
    className,
  );

  const summaryClassName = mergeClasses(
    base.summary,
    sizes[size],
    iconPosition === 'after' && base.summaryAfter,
    open && base.expanded,
    disabled && base.disabled,
  );

  const iconClassName = mergeClasses(
    base.icon,
    iconSizes[size],
    open && base.iconExpanded,
  );

  const contentClassName = base.content;

  return { rootClassName, summaryClassName, iconClassName, contentClassName };
}
