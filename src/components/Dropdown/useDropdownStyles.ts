import {
  makeResetStyles,
  makeStyles,
  mergeClasses,
  shorthands,
} from '@fluentui/react-components';

import { vscFontFamily } from '../../styles/tokens';
import type { VscValidationState } from '../../types';
import type { VscSelectionIndicator } from './VscDropdown';

// ---------------------------------------------------------------------------
//  Shared constants
// ---------------------------------------------------------------------------

const chevronDownSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z'/%3E%3C/svg%3E")`;

// ============================================================================
//  DROPDOWN — trigger
// ============================================================================

const useDropdownBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    height: '26px',
    minHeight: '26px',
    minWidth: '0',
    borderRadius: '2px',
    border: '1px solid var(--vscode-dropdown-border)',
    boxShadow: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'var(--vscode-dropdown-background)',
    transition: 'none',

    '&::after, &.fui-Dropdown::after, &.fui-Dropdown:focus-within::after': {
      display: 'none' as const,
    },

    '& .fui-Dropdown__button': {
      padding: '4px 8px 4px 6px',
      fontSize: 'var(--fontSizeBase200, 12px)',
      fontWeight: 'var(--fontWeightRegular, 400)' as unknown as number,
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-input-foreground)',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      minHeight: 'unset',
    },

    '& .fui-Dropdown__button::after': {
      display: 'none' as const,
    },

    '& .fui-Dropdown__button[data-placeholder]': {
      color: 'var(--vscode-input-placeholderForeground)',
    },

    '& .fui-Dropdown__expandIcon': {
      fontSize: 0,
      width: '14px',
      height: '14px',
      minWidth: '14px',
      color: 'var(--vscode-input-foreground)',
      padding: '0',
      margin: '0',
      marginRight: '0',
      marginLeft: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },

    '& .fui-Dropdown__expandIcon svg': {
      display: 'none' as const,
    },

    '& .fui-Dropdown__expandIcon.fui-Dropdown__expandIcon::after': {
      content: '""',
      display: 'block',
      width: '14px',
      height: '14px',
      backgroundColor: 'currentColor',
      WebkitMaskImage: chevronDownSvg,
      maskImage: chevronDownSvg,
      WebkitMaskSize: '14px 14px',
      maskSize: '14px 14px',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
    },

    ':hover': {
      ...shorthands.borderColor('var(--vscode-dropdown-border)'),
    },

    '&.fui-Dropdown:focus-within': {
      ...shorthands.borderColor('var(--vscode-focusBorder)'),
      outline: 'none',
    },
  },
});

const useDropdownStyles = makeStyles({
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  readonly: {
    ...shorthands.borderColor('var(--vscode-dropdown-border)'),
    backgroundColor: 'transparent',
    '& .fui-Dropdown__button': {
      cursor: 'default',
    },
    '& .fui-Dropdown__expandIcon': {
      display: 'none' as const,
    },
  },

  small: {
    height: '24px',
    minHeight: '24px',
    '& .fui-Dropdown__button': {
      padding: '2px 8px 2px 6px',
      fontSize: 'var(--fontSizeBase100, 10px)',
      lineHeight: 'var(--lineHeightBase100, 14px)',
    },
    '& .fui-Dropdown__expandIcon': {
      fontSize: 0,
      width: '14px',
      height: '14px',
      minWidth: '14px',
    },
    '& .fui-Dropdown__expandIcon.fui-Dropdown__expandIcon::after': {
      width: '14px',
      height: '14px',
      WebkitMaskSize: '14px 14px',
      maskSize: '14px 14px',
    },
  },

  large: {
    height: '28px',
    minHeight: '28px',
    '& .fui-Dropdown__button': {
      ...shorthands.padding('5px', '8px'),
      fontSize: 'var(--fontSizeBase300, 14px)',
      lineHeight: 'var(--lineHeightBase300, 20px)',
    },
    '& .fui-Dropdown__expandIcon': {
      width: '16px',
      height: '16px',
      minWidth: '16px',
      marginRight: '0',
      marginLeft: '0',
    },
    '& .fui-Dropdown__expandIcon.fui-Dropdown__expandIcon::after': {
      width: '16px',
      height: '16px',
      WebkitMaskSize: '16px 16px',
      maskSize: '16px 16px',
    },
  },

  withDescription: {
    '& .fui-Dropdown__button': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      flex: '1',
      minWidth: '0',
      gap: '0',
    },
  },

  truncate: {
    display: 'inline-grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    minWidth: '0',
    width: '100%',
    overflow: 'hidden',

    '&.fui-Dropdown .fui-Dropdown__button': {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 14px',
      alignItems: 'center',
      minWidth: '0',
      maxWidth: '100%',
      width: '100%',
      overflow: 'hidden',
    },

    '&.fui-Dropdown .fui-Dropdown__expandIcon': {
      display: 'flex',
      gridColumn: '2 / 3',
      flexShrink: 0,
      justifySelf: 'end',
      width: '14px',
      minWidth: '14px',
    },
  },

  triggerText: {
    display: 'block',
    gridColumn: '1 / 2',
    justifySelf: 'stretch',
    minWidth: '0',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  error: {
    ...shorthands.borderColor('var(--vscode-inputValidation-errorBorder)'),
    ':hover': {
      ...shorthands.borderColor('var(--vscode-inputValidation-errorBorder)'),
    },
    ':focus-within': {
      ...shorthands.borderColor('var(--vscode-inputValidation-errorBorder)'),
    },
  },

  warning: {
    ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),
    ':hover': {
      ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),
    },
    ':focus-within': {
      ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),
    },
  },

  info: {
    ...shorthands.borderColor('var(--vscode-inputValidation-infoBorder)'),
    ':hover': {
      ...shorthands.borderColor('var(--vscode-inputValidation-infoBorder)'),
    },
    ':focus-within': {
      ...shorthands.borderColor('var(--vscode-inputValidation-infoBorder)'),
    },
  },
});

// ============================================================================
//  COMBOBOX — trigger (editable input)
// ============================================================================

const useComboboxBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    height: '26px',
    minHeight: '26px',
    borderRadius: '2px',
    border: '1px solid var(--vscode-dropdown-border)',
    boxShadow: 'none',
    boxSizing: 'border-box',
    backgroundColor: 'var(--vscode-dropdown-background)',
    transition: 'none',

    '&::after, &.fui-Combobox::after, &.fui-Combobox:focus-within::after': {
      display: 'none' as const,
    },

    '& .fui-Combobox__input': {
      padding: '4px 8px 4px 6px',
      fontSize: 'var(--fontSizeBase200, 12px)',
      fontWeight: 'var(--fontWeightRegular, 400)' as unknown as number,
      lineHeight: 'var(--lineHeightBase200, 16px)',
      color: 'var(--vscode-input-foreground)',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
    },

    '& .fui-Combobox__input::placeholder': {
      color: 'var(--vscode-input-placeholderForeground)',
      opacity: 1,
    },

    '& .fui-Combobox__expandIcon': {
      fontSize: 0,
      width: '14px',
      height: '14px',
      minWidth: '14px',
      color: 'var(--vscode-input-foreground)',
      padding: '0',
      margin: '0',
      marginRight: '0',
      marginLeft: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },

    '& .fui-Combobox__expandIcon svg': {
      display: 'none' as const,
    },

    '& .fui-Combobox__expandIcon.fui-Combobox__expandIcon::after': {
      content: '""',
      display: 'block',
      width: '14px',
      height: '14px',
      backgroundColor: 'currentColor',
      WebkitMaskImage: chevronDownSvg,
      maskImage: chevronDownSvg,
      WebkitMaskSize: '14px 14px',
      maskSize: '14px 14px',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
    },

    ':hover': {
      ...shorthands.borderColor('var(--vscode-dropdown-border)'),
    },

    '&.fui-Combobox:focus-within': {
      ...shorthands.borderColor('var(--vscode-focusBorder)'),
      outline: 'none',
    },
  },
});

const useComboboxStyles = makeStyles({
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  readonly: {
    ...shorthands.borderColor('var(--vscode-dropdown-border)'),
    backgroundColor: 'transparent',
    '& .fui-Combobox__input': {
      cursor: 'default',
    },
    '& .fui-Combobox__expandIcon': {
      display: 'none' as const,
    },
  },

  small: {
    height: '24px',
    minHeight: '24px',
    '& .fui-Combobox__input': {
      padding: '2px 8px 2px 6px',
      fontSize: 'var(--fontSizeBase100, 10px)',
      lineHeight: 'var(--lineHeightBase100, 14px)',
    },
    '& .fui-Combobox__expandIcon': {
      fontSize: 0,
      width: '14px',
      height: '14px',
      minWidth: '14px',
    },
    '& .fui-Combobox__expandIcon.fui-Combobox__expandIcon::after': {
      width: '14px',
      height: '14px',
      WebkitMaskSize: '14px 14px',
      maskSize: '14px 14px',
    },
  },

  large: {
    height: '28px',
    minHeight: '28px',
    '& .fui-Combobox__input': {
      ...shorthands.padding('5px', '8px'),
      fontSize: 'var(--fontSizeBase300, 14px)',
      lineHeight: 'var(--lineHeightBase300, 20px)',
    },
    '& .fui-Combobox__expandIcon': {
      width: '16px',
      height: '16px',
      minWidth: '16px',
      marginRight: '0',
      marginLeft: '0',
    },
    '& .fui-Combobox__expandIcon.fui-Combobox__expandIcon::after': {
      width: '16px',
      height: '16px',
      WebkitMaskSize: '16px 16px',
      maskSize: '16px 16px',
    },
  },

  error: {
    ...shorthands.borderColor('var(--vscode-inputValidation-errorBorder)'),
    ':focus-within': {
      ...shorthands.borderColor('var(--vscode-inputValidation-errorBorder)'),
    },
  },

  warning: {
    ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),
    ':focus-within': {
      ...shorthands.borderColor('var(--vscode-inputValidation-warningBorder)'),
    },
  },

  info: {
    ...shorthands.borderColor('var(--vscode-inputValidation-infoBorder)'),
    ':focus-within': {
      ...shorthands.borderColor('var(--vscode-inputValidation-infoBorder)'),
    },
  },
});

// ============================================================================
//  LISTBOX — popup container (shared by Dropdown + Combobox)
// ============================================================================

const useListboxBaseStyles = makeStyles({
  root: {
    fontFamily: vscFontFamily,
    backgroundColor:
      'var(--vscode-dropdown-listBackground, var(--vscode-dropdown-background))',
    border: '1px solid var(--vscode-dropdown-border)',
    borderRadius: '2px',
    boxShadow: 'none',
    boxSizing: 'border-box',
    padding: '2px',
    animation: 'none',
  },
});

const useListboxStyles = makeStyles({
  selectionIndicatorNone: {
    '& .fui-Option__checkIcon': {
      display: 'none' as const,
    },
  },
});

// ============================================================================
//  OPTION — individual list item
// ============================================================================

const useOptionBaseStyles = makeStyles({
  root: {
    minHeight: '22px',
    padding: '2px 8px',
    fontSize: 'var(--fontSizeBase200, 12px)',
    lineHeight: 'var(--lineHeightBase200, 16px)',
    color: 'var(--vscode-input-foreground)',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: '0',
    rowGap: '0',
    borderRadius: '2px',
    transition: 'none',
    cursor: 'pointer',

    "&:hover:not([aria-selected='true']):not([aria-checked='true']):not(.fui-Option--selected)":
      {
        backgroundColor: 'var(--vscode-list-hoverBackground)',
        color:
          'var(--vscode-list-hoverForeground, var(--vscode-input-foreground))',
      },

    '&:focus, &:focus-visible, &:focus-within': {
      backgroundColor:
        'var(--vscode-list-activeSelectionBackground, var(--vscode-list-hoverBackground))',
      color:
        'var(--vscode-list-activeSelectionForeground, var(--vscode-input-foreground))',
    },

    "&[aria-selected='true'], &[aria-checked='true'], &.fui-Option--selected": {
      backgroundColor:
        'var(--vscode-list-inactiveSelectionBackground, var(--vscode-list-hoverBackground))',
      color:
        'var(--vscode-list-inactiveSelectionForeground, var(--vscode-input-foreground))',
    },

    '& .fui-Option__checkIcon': {
      color: 'var(--vscode-input-foreground)',
      fontSize: '14px',
      width: '14px',
      height: '14px',
      marginRight: '4px',
    },
  },
});

const useOptionStyles = makeStyles({
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  icon: {
    width: '16px',
    height: '16px',
    marginRight: '6px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
    flexShrink: 0,
    '& > svg': {
      width: '16px',
      height: '16px',
    },
    '& .codicon': {
      fontSize: '16px',
      lineHeight: '16px',
    },
  },

  label: {
    flex: '0 1 auto',
    minWidth: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  detail: {
    color: 'var(--vscode-descriptionForeground)',
    opacity: 0.7,
    fontSize: 'var(--fontSizeBase200, 12px)',
    lineHeight: 'var(--lineHeightBase200, 16px)',
    paddingLeft: '6px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  description: {
    color: 'var(--vscode-descriptionForeground)',
    opacity: 0.7,
    fontSize: 'var(--fontSizeBase200, 12px)',
    lineHeight: 'var(--lineHeightBase200, 16px)',
    display: 'block',
    marginTop: '1px',
    width: '100%',
    flexBasis: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  descriptionWithIcon: {
    flexBasis: 'calc(100% - 22px)',
    width: 'calc(100% - 22px)',
    marginLeft: '22px',
  },
});

// ============================================================================
//  OPTION GROUP
// ============================================================================

const useOptionGroupBaseStyles = makeStyles({
  root: {
    '&::after, &.fui-OptionGroup::after': {
      display: 'none' as const,
      borderBottom: 'none',
      content: 'none',
    },

    '& .fui-OptionGroup__label': {
      fontSize: 'var(--fontSizeBase200, 12px)',
      lineHeight: 'var(--lineHeightBase200, 16px)',
      fontWeight: 600 as unknown as number,
      color: 'var(--vscode-descriptionForeground)',
      padding: '4px 6px',
    },
  },
});

// ============================================================================
//  TRIGGER LABEL / DESCRIPTION
// ============================================================================

const useTriggerLabelBaseClassName = makeResetStyles({
  color: 'inherit',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: '0 0 auto',
  maxWidth: '100%',
});

const useTriggerDescriptionBaseClassName = makeResetStyles({
  color: 'var(--vscode-descriptionForeground)',
  opacity: 0.7,
  fontSize: '0.9em',
  whiteSpace: 'nowrap',
  marginLeft: '0.5em',
  flex: '0 0 auto',
});

// ============================================================================
//  OPTION SEPARATOR
// ============================================================================

const useOptionSeparatorBaseClassName = makeResetStyles({
  position: 'relative',
  cursor: 'default',
  pointerEvents: 'none',
  boxSizing: 'border-box',

  '::after': {
    content: '""',
    position: 'absolute',
    left: '0',
    right: '0',
    top: '50%',
    height: '1px',
    backgroundColor: 'var(--vscode-menu-separatorBackground)',
  },
});

// ============================================================================
//  Exported hooks
// ============================================================================

export interface UseVscDropdownStylesOptions {
  validationState?: VscValidationState;
  readOnly?: boolean;
  withDescription?: boolean;
  truncate?: boolean;
  selectionIndicator?: VscSelectionIndicator;
  size?: string;
  disabled?: boolean;
  className?: string;
  listboxClassName?: string;
}

export function useVscDropdownStyles(options: UseVscDropdownStylesOptions) {
  const {
    validationState,
    readOnly,
    withDescription,
    truncate,
    selectionIndicator = 'none',
    size,
    disabled,
    className,
    listboxClassName,
  } = options;

  const base = useDropdownBaseStyles();
  const classes = useDropdownStyles();
  const listboxBase = useListboxBaseStyles();
  const listboxClasses = useListboxStyles();
  const effectiveValidationState =
    disabled || readOnly ? undefined : validationState;

  return {
    rootClassName: mergeClasses(
      base.root,
      size === 'small' && classes.small,
      size === 'large' && classes.large,
      effectiveValidationState === 'error' && classes.error,
      effectiveValidationState === 'warning' && classes.warning,
      effectiveValidationState === 'info' && classes.info,
      disabled && classes.disabled,
      readOnly && classes.readonly,
      withDescription && classes.withDescription,
      truncate && classes.truncate,
      className,
    ),
    listboxClassName: mergeClasses(
      listboxBase.root,
      selectionIndicator === 'none' && listboxClasses.selectionIndicatorNone,
      listboxClassName,
    ),
    triggerTextClassName: classes.triggerText,
  };
}

export interface UseVscComboboxStylesOptions {
  validationState?: VscValidationState;
  readOnly?: boolean;
  selectionIndicator?: VscSelectionIndicator;
  size?: string;
  disabled?: boolean;
  className?: string;
  listboxClassName?: string;
}

export function useVscComboboxStyles(options: UseVscComboboxStylesOptions) {
  const {
    validationState,
    readOnly,
    selectionIndicator = 'none',
    size,
    disabled,
    className,
    listboxClassName,
  } = options;

  const base = useComboboxBaseStyles();
  const classes = useComboboxStyles();
  const listboxBase = useListboxBaseStyles();
  const listboxClasses = useListboxStyles();
  const effectiveValidationState =
    disabled || readOnly ? undefined : validationState;

  return {
    rootClassName: mergeClasses(
      base.root,
      size === 'small' && classes.small,
      size === 'large' && classes.large,
      effectiveValidationState === 'error' && classes.error,
      effectiveValidationState === 'warning' && classes.warning,
      effectiveValidationState === 'info' && classes.info,
      disabled && classes.disabled,
      readOnly && classes.readonly,
      className,
    ),
    listboxClassName: mergeClasses(
      listboxBase.root,
      selectionIndicator === 'none' && listboxClasses.selectionIndicatorNone,
      listboxClassName,
    ),
  };
}

export function useVscListboxStyles(options: {
  selectionIndicator?: VscSelectionIndicator;
  className?: string;
}): string {
  const { selectionIndicator = 'none', className } = options;

  const base = useListboxBaseStyles();
  const classes = useListboxStyles();

  return mergeClasses(
    base.root,
    selectionIndicator === 'none' && classes.selectionIndicatorNone,
    className,
  );
}

export interface UseVscOptionStylesOptions {
  icon?: boolean;
  disabled?: boolean;
  hasDescription?: boolean;
  hasIcon?: boolean;
  className?: string;
}

export function useVscOptionStyles(options: UseVscOptionStylesOptions) {
  const { disabled, className } = options;

  const base = useOptionBaseStyles();
  const classes = useOptionStyles();

  return {
    rootClassName: mergeClasses(
      base.root,
      disabled && classes.disabled,
      className,
    ),
    iconClassName: classes.icon,
    labelClassName: classes.label,
    detailClassName: classes.detail,
    descriptionClassName: classes.description,
    descriptionWithIconClassName: classes.descriptionWithIcon,
  };
}

export function useVscOptionGroupStyles(className?: string): string {
  const base = useOptionGroupBaseStyles();
  return mergeClasses(base.root, className);
}

export function useVscTriggerLabelStyles(className?: string): string {
  const baseClassName = useTriggerLabelBaseClassName();
  return mergeClasses(baseClassName, className);
}

export function useVscTriggerDescriptionStyles(className?: string): string {
  const baseClassName = useTriggerDescriptionBaseClassName();
  return mergeClasses(baseClassName, className);
}

export function useVscOptionSeparatorStyles(className?: string): string {
  const baseClassName = useOptionSeparatorBaseClassName();
  return mergeClasses(baseClassName, className);
}
