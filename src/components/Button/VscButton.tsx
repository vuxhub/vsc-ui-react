import { Button, type ButtonProps } from '@fluentui/react-components';
import { forwardRef } from 'react';

import { useButtonStylesHook, type VscButtonSize } from './useButtonStyles';

export type VscButtonProps = Omit<ButtonProps, 'size'> & {
  size?: VscButtonSize;
};

export const VscButton = forwardRef<HTMLButtonElement, VscButtonProps>(
  ({ appearance, size, icon, className, children, ...rest }, ref) => {
    const isCompact = size === 'compact';
    const fluentSize = isCompact ? undefined : size;

    const mergedClassName = useButtonStylesHook({
      appearance: appearance as VscButtonProps['appearance'],
      size,
      iconOnly: !!icon && !children,
      className,
    });

    return (
      <Button
        ref={ref}
        appearance={appearance}
        size={fluentSize}
        icon={icon}
        className={mergedClassName}
        {...(rest as ButtonProps)}
      >
        {children}
      </Button>
    );
  },
);

VscButton.displayName = 'VscButton';
