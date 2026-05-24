import { forwardRef } from 'react';
import {
  Radio,
  RadioGroup,
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
};

export const VscRadio = forwardRef<HTMLInputElement, VscRadioProps>(
  ({ size, disabled, className, ...rest }, ref) => {
    const { rootClassName } = useRadioStyles({ size, disabled, className });

    return (
      <Radio
        ref={ref}
        disabled={disabled}
        className={rootClassName}
        {...rest}
      />
    );
  },
);

VscRadio.displayName = 'VscRadio';
