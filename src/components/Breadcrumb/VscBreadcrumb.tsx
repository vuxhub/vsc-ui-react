import {
  Breadcrumb,
  type BreadcrumbProps,
  BreadcrumbItem,
  type BreadcrumbItemProps,
  BreadcrumbButton,
  type BreadcrumbButtonProps,
  BreadcrumbDivider,
  type BreadcrumbDividerProps,
} from '@fluentui/react-components';
import React, { forwardRef } from 'react';

import {
  useBreadcrumbStyles,
  useBreadcrumbItemStyles,
  useBreadcrumbButtonStyles,
  useBreadcrumbDividerStyles,
  type VscBreadcrumbSize,
} from './useBreadcrumbStyles';

// ---------------------------------------------------------------------------
//  VscBreadcrumb
// ---------------------------------------------------------------------------

export type VscBreadcrumbProps = Omit<BreadcrumbProps, 'size'> & {
  size?: VscBreadcrumbSize;
};

export const VscBreadcrumb = forwardRef<HTMLElement, VscBreadcrumbProps>(
  ({ className, size = 'medium', focusMode = 'arrow', ...rest }, ref) => {
    const mergedClassName = useBreadcrumbStyles({ className });

    return (
      <Breadcrumb
        ref={ref}
        size={size}
        focusMode={focusMode}
        className={mergedClassName}
        {...rest}
      />
    );
  },
);

VscBreadcrumb.displayName = 'VscBreadcrumb';

// ---------------------------------------------------------------------------
//  VscBreadcrumbItem
// ---------------------------------------------------------------------------

export type VscBreadcrumbItemProps = BreadcrumbItemProps;

export const VscBreadcrumbItem = forwardRef<
  HTMLLIElement,
  VscBreadcrumbItemProps
>(({ className, ...rest }, ref) => {
  const mergedClassName = useBreadcrumbItemStyles({ className });

  return <BreadcrumbItem ref={ref} className={mergedClassName} {...rest} />;
});

VscBreadcrumbItem.displayName = 'VscBreadcrumbItem';

// ---------------------------------------------------------------------------
//  VscBreadcrumbButton
// ---------------------------------------------------------------------------

export type VscBreadcrumbButtonProps = Omit<BreadcrumbButtonProps, 'size'> & {
  size?: VscBreadcrumbSize;
};

export const VscBreadcrumbButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  VscBreadcrumbButtonProps
>(({ size = 'medium', current, className, ...rest }, ref) => {
  const mergedClassName = useBreadcrumbButtonStyles({
    size,
    current,
    className,
  });

  return (
    <BreadcrumbButton
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      size={size}
      current={current}
      className={mergedClassName}
      {...(rest as BreadcrumbButtonProps)}
    />
  );
});

VscBreadcrumbButton.displayName = 'VscBreadcrumbButton';

// ---------------------------------------------------------------------------
//  VscBreadcrumbDivider
// ---------------------------------------------------------------------------

export type VscBreadcrumbDividerProps = BreadcrumbDividerProps & {
  size?: VscBreadcrumbSize;
};

export const VscBreadcrumbDivider = forwardRef<
  HTMLLIElement,
  VscBreadcrumbDividerProps
>(({ size = 'medium', className, ...rest }, ref) => {
  const mergedClassName = useBreadcrumbDividerStyles({ size, className });

  return <BreadcrumbDivider ref={ref} className={mergedClassName} {...rest} />;
});

VscBreadcrumbDivider.displayName = 'VscBreadcrumbDivider';
