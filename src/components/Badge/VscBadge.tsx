import { Badge, type BadgeProps } from '@fluentui/react-components';
import { forwardRef, type ReactNode } from 'react';

import {
  useBadgeStyles,
  type VscBadgeAppearance,
  type VscBadgeColor,
  type VscBadgeSize,
} from './useBadgeStyles';

export type { VscBadgeAppearance, VscBadgeColor, VscBadgeSize };

const FLUENT_APPEARANCE: Record<
  VscBadgeAppearance,
  NonNullable<BadgeProps['appearance']>
> = {
  filled: 'filled',
  tint: 'tint',
  outline: 'outline',
  subtle: 'ghost',
};

const FLUENT_COLOR: Record<VscBadgeColor, NonNullable<BadgeProps['color']>> = {
  blue: 'brand',
  red: 'danger',
  yellow: 'warning',
  green: 'success',
  neutral: 'subtle',
  neutralContrast: 'subtle',
};

/** Use Fluent `small` for text badges; Griffel sets exact Figma dimensions. */
const FLUENT_SIZE: Record<VscBadgeSize, NonNullable<BadgeProps['size']>> = {
  small: 'tiny',
  medium: 'small',
  large: 'small',
};

export type VscBadgeProps = Omit<
  BadgeProps,
  'appearance' | 'color' | 'size' | 'icon'
> & {
  appearance?: VscBadgeAppearance;
  color?: VscBadgeColor;
  size?: VscBadgeSize;
  icon?: ReactNode;
  className?: string;
};

export const VscBadge = forwardRef<HTMLDivElement, VscBadgeProps>(
  (
    {
      appearance = 'filled',
      color = 'blue',
      size = 'medium',
      icon,
      className,
      children,
      shape = 'rounded',
      ...rest
    },
    ref,
  ) => {
    const { rootClassName, textClassName, iconClassName } = useBadgeStyles({
      appearance,
      color,
      size,
      className,
    });

    const resolvedIcon: BadgeProps['icon'] =
      icon == null || typeof icon === 'boolean'
        ? undefined
        : { children: icon, className: iconClassName };

    const label =
      children != null && children !== false && children !== '' ? (
        <span className={textClassName}>{children}</span>
      ) : (
        children
      );

    return (
      <Badge
        ref={ref}
        appearance={FLUENT_APPEARANCE[appearance]}
        color={FLUENT_COLOR[color]}
        size={FLUENT_SIZE[size]}
        shape={shape}
        icon={resolvedIcon}
        className={rootClassName}
        {...rest}
      >
        {label}
      </Badge>
    );
  },
);

VscBadge.displayName = 'VscBadge';
