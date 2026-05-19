import { Switch, type SwitchProps } from '@fluentui/react-components';
import { forwardRef } from 'react';

import { useSwitchStyles } from './useSwitchStyles';

export type VscSwitchProps = Omit<SwitchProps, 'size'> & {
  size?: 'small' | 'medium' | 'large';
};

export const VscSwitch = forwardRef<HTMLInputElement, VscSwitchProps>(
  ({ size, className, disabled, ...rest }, ref) => {
    const { rootClassName } = useSwitchStyles({ size, disabled, className });

    return (
      <Switch
        ref={ref}
        disabled={disabled}
        className={rootClassName}
        {...rest}
      />
    );
  },
);

VscSwitch.displayName = 'VscSwitch';
