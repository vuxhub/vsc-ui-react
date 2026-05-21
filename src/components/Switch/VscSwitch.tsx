import { Switch, type SwitchProps } from '@fluentui/react-components';
import { forwardRef } from 'react';

import { useSwitchStyles } from './useSwitchStyles';

export type VscSwitchProps = Omit<SwitchProps, 'size' | 'labelPosition'> & {
  size?: 'small' | 'medium' | 'large';
  labelPosition?: Exclude<SwitchProps['labelPosition'], 'before'>;
};

export const VscSwitch = forwardRef<HTMLInputElement, VscSwitchProps>(
  ({ size, className, disabled, labelPosition, ...rest }, ref) => {
    const { rootClassName } = useSwitchStyles({
      size,
      disabled,
      labelPosition,
      className,
    });

    return (
      <Switch
        ref={ref}
        disabled={disabled}
        labelPosition={labelPosition}
        className={rootClassName}
        {...rest}
      />
    );
  },
);

VscSwitch.displayName = 'VscSwitch';
