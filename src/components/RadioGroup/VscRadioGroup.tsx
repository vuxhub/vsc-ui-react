import { forwardRef, type ReactNode } from 'react';
import {
  Radio,
  RadioGroup,
  useId,
  type RadioProps,
  type RadioGroupProps,
} from '@fluentui/react-components';

import { useRadioGroupStyles, useRadioStyles } from './useRadioGroupStyles';

export type VscRadioGroupProps = Omit<RadioGroupProps, 'layout'> & {
  layout?: 'horizontal' | 'vertical';
};

export const VscRadioGroup = forwardRef<HTMLDivElement, VscRadioGroupProps>(
  ({ layout, disabled, className, ...rest }, ref) => {
    const { rootClassName } = useRadioGroupStyles({
      layout,
      disabled,
      className,
    });

    return (
      <RadioGroup
        ref={ref}
        layout={layout}
        disabled={disabled}
        className={rootClassName}
        {...rest}
      />
    );
  },
);

VscRadioGroup.displayName = 'VscRadioGroup';

export type VscRadioProps = Omit<RadioProps, 'labelPosition' | 'indicator'> & {
  size?: 'small' | 'medium' | 'large';
  /** Secondary description text rendered below the radio label. */
  subtext?: ReactNode;
};

export const VscRadio = forwardRef<HTMLInputElement, VscRadioProps>(
  (
    {
      size,
      disabled,
      className,
      subtext,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const hasSubtext = Boolean(subtext);
    const subtextId = useId('vsc-radio-subtext');

    const { rootClassName, wrapperClassName, subtextClassName } = useRadioStyles({
      size,
      disabled,
      className,
      hasSubtext,
    });

    const mergedAriaDescribedBy = [ariaDescribedBy, hasSubtext ? subtextId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

    const radio = (
      <Radio
        ref={ref}
        disabled={disabled}
        className={rootClassName}
        aria-describedby={mergedAriaDescribedBy}
        {...rest}
      />
    );

    if (!hasSubtext) {
      return radio;
    }

    return (
      <span className={wrapperClassName}>
        {radio}
        <span id={subtextId} className={subtextClassName}>
          {subtext}
        </span>
      </span>
    );
  },
);

VscRadio.displayName = 'VscRadio';