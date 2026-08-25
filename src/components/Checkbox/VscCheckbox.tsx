import {
  Checkbox,
  useId,
  type CheckboxProps,
} from '@fluentui/react-components';
import { forwardRef, type ReactNode } from 'react';

import { useCheckboxStyles } from './useCheckboxStyles';

export type VscCheckboxProps = Omit<CheckboxProps, 'size'> & {
  size?: 'small' | 'medium' | 'large';
  /** Secondary description text rendered below the checkbox label. */
  subtext?: ReactNode;
};

export const VscCheckbox = forwardRef<HTMLInputElement, VscCheckboxProps>(
  (
    {
      size,
      className,
      disabled,
      subtext,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const hasSubtext = Boolean(subtext);
    const subtextId = useId('vsc-checkbox-subtext');
    const { rootClassName, wrapperClassName, subtextClassName } =
      useCheckboxStyles({ size, disabled, className, hasSubtext });
    const fluentSize = size === 'small' ? 'medium' : size;
    const mergedAriaDescribedBy =
      [ariaDescribedBy, hasSubtext ? subtextId : undefined]
        .filter(Boolean)
        .join(' ') || undefined;

    const checkbox = (
      <Checkbox
        ref={ref}
        size={fluentSize}
        disabled={disabled}
        className={rootClassName}
        aria-describedby={mergedAriaDescribedBy}
        {...rest}
      />
    );

    if (!hasSubtext) {
      return checkbox;
    }

    return (
      <span className={wrapperClassName}>
        {checkbox}
        <span id={subtextId} className={subtextClassName}>
          {subtext}
        </span>
      </span>
    );
  },
);

VscCheckbox.displayName = 'VscCheckbox';
