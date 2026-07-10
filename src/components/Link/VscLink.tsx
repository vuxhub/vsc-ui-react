import { Link, type LinkProps } from '@fluentui/react-components';
import { forwardRef, type ReactNode } from 'react';

import { useLinkStyles, type VscLinkSize } from './useLinkStyles';

export type VscLinkProps = LinkProps & {
  /** Link size. */
  size?: VscLinkSize;
  /** When true, the link shows an underline at rest. */
  underline?: boolean;
  /** Optional trailing icon (e.g. an external-link glyph). */
  icon?: ReactNode;
};

export const VscLink = forwardRef<HTMLAnchorElement, VscLinkProps>(
  ({ size, underline, disabled, icon, className, children, ...rest }, ref) => {
    const { rootClassName, iconClassName } = useLinkStyles({
      size,
      underline,
      disabled,
      className,
    });

    return (
      <Link ref={ref} className={rootClassName} disabled={disabled} {...rest}>
        {children}
        {icon && (
          <span className={iconClassName} aria-hidden="true">
            {icon}
          </span>
        )}
      </Link>
    );
  },
);

VscLink.displayName = 'VscLink';
