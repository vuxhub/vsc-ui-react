import { forwardRef } from 'react';

import {
  useDividerStyles,
  type VscDividerAlignContent,
  type VscDividerOrientation,
  type VscDividerSize,
} from './useDividerStyles';

export interface VscDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientation of the divider line. @default 'horizontal' */
  orientation?: VscDividerOrientation;
  /** Size variant affecting text padding. @default 'large' */
  size?: VscDividerSize;
  /** Position of the text content along the divider. @default 'center' */
  alignContent?: VscDividerAlignContent;
}

export const VscDivider = forwardRef<HTMLDivElement, VscDividerProps>(
  (
    {
      orientation = 'horizontal',
      size = 'large',
      alignContent = 'center',
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const { rootClassName, wrapperClassName } = useDividerStyles({
      orientation,
      size,
      alignContent,
      className,
    });

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={rootClassName}
        {...rest}
      >
        {children && <span className={wrapperClassName}>{children}</span>}
      </div>
    );
  },
);

VscDivider.displayName = 'VscDivider';
