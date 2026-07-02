import {
  Popover,
  type PopoverProps,
  PopoverSurface,
  type PopoverSurfaceProps,
  PopoverTrigger,
  type PopoverTriggerProps,
} from '@fluentui/react-components';
import { forwardRef } from 'react';

import {
  useVscPopoverSurfaceStyles,
  type VscPopoverAppearance,
} from './usePopoverStyles';

export type { VscPopoverAppearance };

/* -------------------------------------------------------------------------- */
/*  Popover (root)                                                            */
/* -------------------------------------------------------------------------- */

export { Popover as VscPopover };
export type VscPopoverProps = PopoverProps;

/* -------------------------------------------------------------------------- */
/*  PopoverTrigger                                                            */
/* -------------------------------------------------------------------------- */

export const VscPopoverTrigger = PopoverTrigger;
export type VscPopoverTriggerProps = PopoverTriggerProps;

/* -------------------------------------------------------------------------- */
/*  PopoverSurface                                                            */
/* -------------------------------------------------------------------------- */

export type VscPopoverSurfaceProps = PopoverSurfaceProps & {
  /**
   * Visual style of the surface.
   * - `default` – neutral hover-widget background.
   * - `brand` – VS Code accent (button) background.
   * @default 'default'
   */
  appearance?: VscPopoverAppearance;
};

export const VscPopoverSurface = forwardRef<
  HTMLDivElement,
  VscPopoverSurfaceProps
>(({ appearance = 'default', className, ...rest }, ref) => {
  const { rootClassName } = useVscPopoverSurfaceStyles({
    appearance,
    className,
  });

  return <PopoverSurface ref={ref} className={rootClassName} {...rest} />;
});

VscPopoverSurface.displayName = 'VscPopoverSurface';
