import {
  MessageBar,
  type MessageBarProps,
  MessageBarActions,
  type MessageBarActionsProps,
  MessageBarBody,
  type MessageBarBodyProps,
  MessageBarGroup,
  type MessageBarGroupProps,
  MessageBarTitle,
  type MessageBarTitleProps,
} from '@fluentui/react-components';
import { forwardRef } from 'react';

import {
  useMessageBarActionsStyles,
  useMessageBarBodyStyles,
  useMessageBarStyles,
  useMessageBarTitleStyles,
  type VscMessageBarIntent,
  type VscMessageBarLayout,
  type VscMessageBarShape,
} from './useMessageBarStyles';

export type { VscMessageBarIntent, VscMessageBarLayout, VscMessageBarShape };

/* -------------------------------------------------------------------------- */
/*  MessageBar (root)                                                         */
/* -------------------------------------------------------------------------- */

/** Maps the VS Code intent to the Fluent intent that drives the slot icon. */
const FLUENT_INTENT: Record<
  VscMessageBarIntent,
  NonNullable<MessageBarProps['intent']>
> = {
  default: 'info',
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success',
};

export type VscMessageBarProps = Omit<MessageBarProps, 'intent'> & {
  /** Announcement / design preset. @default 'default' */
  intent?: VscMessageBarIntent;
};

export const VscMessageBar = forwardRef<HTMLDivElement, VscMessageBarProps>(
  ({ intent = 'default', shape = 'rounded', className, ...rest }, ref) => {
    const { rootClassName } = useMessageBarStyles({ intent, shape, className });

    return (
      <MessageBar
        ref={ref}
        intent={FLUENT_INTENT[intent]}
        shape={shape}
        className={rootClassName}
        {...rest}
      />
    );
  },
);

VscMessageBar.displayName = 'VscMessageBar';

/* -------------------------------------------------------------------------- */
/*  MessageBarBody                                                            */
/* -------------------------------------------------------------------------- */

export type VscMessageBarBodyProps = MessageBarBodyProps;

export const VscMessageBarBody = forwardRef<
  HTMLDivElement,
  VscMessageBarBodyProps
>(({ className, ...rest }, ref) => {
  const { rootClassName } = useMessageBarBodyStyles(className);
  return <MessageBarBody ref={ref} className={rootClassName} {...rest} />;
});

VscMessageBarBody.displayName = 'VscMessageBarBody';

/* -------------------------------------------------------------------------- */
/*  MessageBarTitle                                                           */
/* -------------------------------------------------------------------------- */

export type VscMessageBarTitleProps = MessageBarTitleProps;

export const VscMessageBarTitle = forwardRef<
  HTMLSpanElement,
  VscMessageBarTitleProps
>(({ className, ...rest }, ref) => {
  const { rootClassName } = useMessageBarTitleStyles(className);
  return <MessageBarTitle ref={ref} className={rootClassName} {...rest} />;
});

VscMessageBarTitle.displayName = 'VscMessageBarTitle';

/* -------------------------------------------------------------------------- */
/*  MessageBarActions                                                         */
/* -------------------------------------------------------------------------- */

export type VscMessageBarActionsProps = MessageBarActionsProps;

export const VscMessageBarActions = forwardRef<
  HTMLDivElement,
  VscMessageBarActionsProps
>(({ className, ...rest }, ref) => {
  const { rootClassName } = useMessageBarActionsStyles(className);
  return <MessageBarActions ref={ref} className={rootClassName} {...rest} />;
});

VscMessageBarActions.displayName = 'VscMessageBarActions';

/* -------------------------------------------------------------------------- */
/*  MessageBarGroup                                                           */
/* -------------------------------------------------------------------------- */

export type VscMessageBarGroupProps = MessageBarGroupProps;

export const VscMessageBarGroup = forwardRef<
  HTMLDivElement,
  VscMessageBarGroupProps
>((props, ref) => <MessageBarGroup ref={ref} {...props} />);

VscMessageBarGroup.displayName = 'VscMessageBarGroup';
