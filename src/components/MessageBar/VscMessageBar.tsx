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

/** VS Code error glyph. Uses `currentColor` so the intent color applies. */
const ErrorIcon = () => (
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.88 2.88a3 3 0 0 1 4.24 0l5 5a3 3 0 0 1 0 4.24l-5 5a3 3 0 0 1-4.24 0l-5-5a3 3 0 0 1 0-4.24l5-5Zm-.03 4.27a.5.5 0 1 0-.7.7L9.29 10l-2.14 2.15a.5.5 0 0 0 .7.7L10 10.71l2.15 2.14a.5.5 0 0 0 .7-.7L10.71 10l2.14-2.15a.5.5 0 0 0-.7-.7L10 9.29 7.85 7.15Z" />
  </svg>
);

export const VscMessageBar = forwardRef<HTMLDivElement, VscMessageBarProps>(
  ({ intent = 'default', shape = 'rounded', className, icon, ...rest }, ref) => {
    const { rootClassName } = useMessageBarStyles({ intent, shape, className });

    // Override the error glyph; a caller-supplied `icon` always wins.
    const resolvedIcon =
      icon ?? (intent === 'error' ? <ErrorIcon /> : undefined);

    return (
      <MessageBar
        ref={ref}
        intent={FLUENT_INTENT[intent]}
        shape={shape}
        icon={resolvedIcon}
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
