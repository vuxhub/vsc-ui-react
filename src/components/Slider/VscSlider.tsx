import { Slider, type SliderProps } from '@fluentui/react-components';
import { forwardRef } from 'react';

import { useSliderStyles } from './useSliderStyles';

export type VscSliderProps = SliderProps;

export const VscSlider = forwardRef<HTMLInputElement, VscSliderProps>(
  ({ className, disabled, size, ...rest }, ref) => {
    const { rootClassName } = useSliderStyles({ size, disabled, className });

    return (
      <Slider
        ref={ref}
        size={size}
        disabled={disabled}
        className={rootClassName}
        {...rest}
      />
    );
  },
);

VscSlider.displayName = 'VscSlider';
