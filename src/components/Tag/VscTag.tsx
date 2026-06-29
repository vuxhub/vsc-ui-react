import { forwardRef, type ReactNode, type MouseEventHandler } from 'react';

import {
  useTagStyles,
  type VscTagAppearance,
  type VscTagSize,
} from './useTagStyles';

export type { VscTagAppearance, VscTagSize };

export type VscTagProps = {
  /** Visual style variant. */
  appearance?: VscTagAppearance;
  /** Size of the tag. */
  size?: VscTagSize;
  /** Whether the tag is disabled. */
  disabled?: boolean;
  /** Primary text content. */
  children: ReactNode;
  /** Optional secondary text below primary. */
  secondaryText?: ReactNode;
  /** Optional icon shown before text. */
  icon?: ReactNode;
  /** If true a dismiss (×) button is shown. */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  /** Additional class name for the root element. */
  className?: string;
};

/** A dismissible tag/chip styled to match VS Code. */
export const VscTag = forwardRef<HTMLSpanElement, VscTagProps>(
  (
    {
      appearance = 'default',
      size = 'medium',
      disabled,
      children,
      secondaryText,
      icon,
      dismissible = true,
      onDismiss,
      className,
    },
    ref,
  ) => {
    const {
      rootClassName,
      iconClassName,
      textContainerClassName,
      primaryTextClassName,
      secondaryTextClassName,
      dismissClassName,
    } = useTagStyles({
      appearance,
      size,
      disabled,
      hasSecondaryText: !!secondaryText,
      className,
    });

    return (
      <span ref={ref} className={rootClassName}>
        {icon && <span className={iconClassName}>{icon}</span>}
        <span className={textContainerClassName}>
          <span className={primaryTextClassName}>{children}</span>
          {secondaryText && (
            <span className={secondaryTextClassName}>{secondaryText}</span>
          )}
        </span>
        {dismissible && (
          <button
            type="button"
            className={dismissClassName}
            onClick={onDismiss}
            disabled={disabled}
            aria-label="Dismiss"
            tabIndex={disabled ? -1 : 0}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2.59 2.59a.5.5 0 0 1 .7 0L6 5.3l2.71-2.71a.5.5 0 0 1 .7.7L6.71 6l2.7 2.71a.5.5 0 0 1-.7.7L6 6.71 3.29 9.41a.5.5 0 0 1-.7-.7L5.3 6 2.59 3.29a.5.5 0 0 1 0-.7Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </span>
    );
  },
);

VscTag.displayName = 'VscTag';
