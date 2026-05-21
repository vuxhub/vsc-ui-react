import {
  Dialog,
  DialogActions,
  type DialogActionsProps,
  DialogBody,
  type DialogBodyProps,
  DialogContent,
  type DialogContentProps,
  DialogSurface,
  type DialogSurfaceProps,
  DialogTitle,
  type DialogTitleProps,
  DialogTrigger,
  type DialogTriggerProps,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import {
  useVscDialogActionsStyles,
  useVscDialogBodyStyles,
  useVscDialogCloseButtonStyles,
  useVscDialogContentStyles,
  useVscDialogDescriptionStyles,
  useVscDialogSeparatorStyles,
  useVscDialogSurfaceStyles,
  useVscDialogTitleStyles,
  type VscDialogSize,
} from './useDialogStyles';

export type { VscDialogSize };

/* -------------------------------------------------------------------------- */
/*  Dialog (root)                                                             */
/* -------------------------------------------------------------------------- */

export { Dialog as VscDialog };
export type { DialogProps as VscDialogProps } from '@fluentui/react-components';

/* -------------------------------------------------------------------------- */
/*  DialogTrigger                                                             */
/* -------------------------------------------------------------------------- */

export const VscDialogTrigger = DialogTrigger;
export type VscDialogTriggerProps = DialogTriggerProps;

/* -------------------------------------------------------------------------- */
/*  DialogSurface                                                             */
/* -------------------------------------------------------------------------- */

export type VscDialogSurfaceProps = DialogSurfaceProps & {
  /** Dialog width layout – wide (600px) or narrow (320px). @default 'wide' */
  size?: VscDialogSize;
};

export const VscDialogSurface = forwardRef<
  HTMLDivElement,
  VscDialogSurfaceProps
>(({ size = 'wide', className, backdrop, ...rest }, ref) => {
  const { rootClassName, backdropClassName } = useVscDialogSurfaceStyles({
    size,
    className,
  });

  const backdropProps =
    backdrop !== undefined &&
    typeof backdrop === 'object' &&
    backdrop !== null &&
    !Array.isArray(backdrop) &&
    'className' in backdrop
      ? {
          ...backdrop,
          className: backdrop.className
            ? `${backdropClassName} ${String(backdrop.className)}`
            : backdropClassName,
        }
      : backdrop !== undefined
        ? backdrop
        : { className: backdropClassName };

  return (
    <DialogSurface
      ref={ref}
      className={rootClassName}
      backdrop={backdropProps}
      {...rest}
    />
  );
});
VscDialogSurface.displayName = 'VscDialogSurface';

/* -------------------------------------------------------------------------- */
/*  DialogBody                                                                */
/* -------------------------------------------------------------------------- */

export type VscDialogBodyProps = DialogBodyProps;

export const VscDialogBody = forwardRef<HTMLDivElement, VscDialogBodyProps>(
  ({ className, ...rest }, ref) => {
    const { rootClassName } = useVscDialogBodyStyles({ className });
    return <DialogBody ref={ref} className={rootClassName} {...rest} />;
  },
);
VscDialogBody.displayName = 'VscDialogBody';

/* -------------------------------------------------------------------------- */
/*  DialogTitle                                                               */
/* -------------------------------------------------------------------------- */

export type VscDialogTitleProps = DialogTitleProps & {
  /**
   * Title action slot. Pass `null` to hide the close control.
   * When omitted, a default close button is rendered.
   */
  action?: ReactNode | null;
};

export const VscDialogTitle = forwardRef<
  HTMLHeadingElement,
  VscDialogTitleProps
>(({ className, action, children, ...rest }, ref) => {
  const { rootClassName, actionClassName } = useVscDialogTitleStyles({
    className,
  });

  const resolvedAction =
    action === null ? undefined : (action ?? <VscDialogCloseButton />);

  return (
    <DialogTitle
      ref={ref}
      className={rootClassName}
      action={
        resolvedAction ? (
          <DialogTitleAction className={actionClassName}>
            {resolvedAction}
          </DialogTitleAction>
        ) : undefined
      }
      {...rest}
    >
      {children}
    </DialogTitle>
  );
});
VscDialogTitle.displayName = 'VscDialogTitle';

function DialogTitleAction({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/*  DialogCloseButton                                                         */
/* -------------------------------------------------------------------------- */

export type VscDialogCloseButtonProps = HTMLAttributes<HTMLButtonElement>;

export const VscDialogCloseButton = forwardRef<
  HTMLButtonElement,
  VscDialogCloseButtonProps
>(({ className, children, ...rest }, ref) => {
  const { rootClassName, iconClassName } =
    useVscDialogCloseButtonStyles(className);

  return (
    <DialogTrigger action="close" disableButtonEnhancement>
      <button
        ref={ref}
        type="button"
        className={rootClassName}
        aria-label="Close dialog"
        {...rest}
      >
        {children ?? (
          <span className={iconClassName} aria-hidden="true">
            <DismissRegular />
          </span>
        )}
      </button>
    </DialogTrigger>
  );
});
VscDialogCloseButton.displayName = 'VscDialogCloseButton';

/* -------------------------------------------------------------------------- */
/*  DialogDescription                                                         */
/* -------------------------------------------------------------------------- */

export type VscDialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const VscDialogDescription = forwardRef<
  HTMLParagraphElement,
  VscDialogDescriptionProps
>(({ className, ...rest }, ref) => {
  const { rootClassName } = useVscDialogDescriptionStyles(className);
  return <p ref={ref} className={rootClassName} {...rest} />;
});
VscDialogDescription.displayName = 'VscDialogDescription';

/* -------------------------------------------------------------------------- */
/*  DialogSeparator                                                           */
/* -------------------------------------------------------------------------- */

export type VscDialogSeparatorProps = HTMLAttributes<HTMLHRElement>;

export const VscDialogSeparator = forwardRef<
  HTMLHRElement,
  VscDialogSeparatorProps
>(({ className, ...rest }, ref) => {
  const { rootClassName } = useVscDialogSeparatorStyles(className);
  return <hr ref={ref} className={rootClassName} {...rest} />;
});
VscDialogSeparator.displayName = 'VscDialogSeparator';

/* -------------------------------------------------------------------------- */
/*  DialogContent                                                             */
/* -------------------------------------------------------------------------- */

export type VscDialogContentProps = DialogContentProps;

export const VscDialogContent = forwardRef<
  HTMLDivElement,
  VscDialogContentProps
>(({ className, ...rest }, ref) => {
  const { rootClassName } = useVscDialogContentStyles(className);
  return <DialogContent ref={ref} className={rootClassName} {...rest} />;
});
VscDialogContent.displayName = 'VscDialogContent';

/* -------------------------------------------------------------------------- */
/*  DialogActions                                                             */
/* -------------------------------------------------------------------------- */

export type VscDialogActionsProps = Omit<DialogActionsProps, 'fluid'> & {
  /** Matches surface width layout for button stacking. @default 'wide' */
  size?: VscDialogSize;
};

export const VscDialogActions = forwardRef<
  HTMLDivElement,
  VscDialogActionsProps
>(({ size = 'wide', className, position = 'end', ...rest }, ref) => {
  const { rootClassName, fluid } = useVscDialogActionsStyles({
    size,
    className,
  });
  return (
    <DialogActions
      ref={ref}
      className={rootClassName}
      position={position}
      fluid={fluid}
      {...rest}
    />
  );
});
VscDialogActions.displayName = 'VscDialogActions';
