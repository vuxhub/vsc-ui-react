import { SpinButton, type SpinButtonProps } from '@fluentui/react-components';
import { forwardRef } from 'react';

import type { VscInputValidationState } from '../../types';
import { useSpinButtonStyles } from './useSpinButtonStyles';

export type VscSpinButtonProps = Omit<SpinButtonProps, 'size'> & {
  /** Size of the spin button. `small` = 24px, `medium` = 26px, `large` = 28px. */
  size?: 'small' | 'medium' | 'large';
  /** Applies VS Code validation border color. */
  validationState?: VscInputValidationState;
  /** Renders the spin button as read-only (non-interactive steppers + input). */
  readOnly?: boolean;
};

export const VscSpinButton = forwardRef<HTMLInputElement, VscSpinButtonProps>(
  (
    {
      size = 'medium',
      validationState,
      className,
      disabled,
      readOnly,
      ...rest
    },
    ref,
  ) => {
    const { rootClassName } = useSpinButtonStyles({
      size,
      validationState,
      disabled,
      readOnly,
      className,
    });

    return (
      <SpinButton
        ref={ref}
        // Fluent only supports 'small' | 'medium'; 'large' is styled via class.
        size={size === 'small' ? 'small' : 'medium'}
        disabled={disabled}
        className={rootClassName}
        data-validation-state={validationState}
        input={{ readOnly }}
        {...rest}
      />
    );
  },
);

VscSpinButton.displayName = 'VscSpinButton';
