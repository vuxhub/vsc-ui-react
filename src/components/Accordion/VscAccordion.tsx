import React, { forwardRef } from 'react';
import {
  useAccordionStyles,
  type VscAccordionSize,
  type VscAccordionIconPosition,
} from './useAccordionStyles';

export interface VscAccordionProps extends Omit<
  React.DetailsHTMLAttributes<HTMLDetailsElement>,
  'size'
> {
  /** The header/title content displayed in the summary */
  header: React.ReactNode;
  /** Size variant */
  size?: VscAccordionSize;
  /** Position of the expand/collapse icon */
  iconPosition?: VscAccordionIconPosition;
  /** Whether the accordion is disabled */
  disabled?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onToggle?: (event: React.SyntheticEvent<HTMLDetailsElement>) => void;
  /** Custom expand/collapse icon */
  icon?: React.ReactNode;
  /** Additional class name */
  className?: string;
  /** Content to display when expanded */
  children?: React.ReactNode;
}

const SmallChevron = () => (
  <svg
    width="10"
    height="5.5"
    viewBox="0 0 10 5.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1 0.5L5 4.5L9 0.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const LargeChevron = () => (
  <svg
    width="12"
    height="6.5"
    viewBox="0 0 12 6.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1 0.5L6 5.5L11 0.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const VscAccordion = forwardRef<HTMLDetailsElement, VscAccordionProps>(
  (
    {
      header,
      size = 'medium',
      iconPosition = 'before',
      disabled,
      open,
      defaultOpen,
      onToggle,
      icon,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(
      defaultOpen ?? false,
    );
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const { rootClassName, summaryClassName, iconClassName, contentClassName } =
      useAccordionStyles({
        size,
        iconPosition,
        disabled,
        open: isOpen,
        className,
      });

    const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      const details = event.currentTarget;
      if (!isControlled) {
        setInternalOpen(details.open);
      }
      onToggle?.(event);
    };

    const defaultIcon =
      size === 'large' || size === 'extra-large' ? (
        <LargeChevron />
      ) : (
        <SmallChevron />
      );

    const iconElement = (
      <span className={iconClassName}>{icon ?? defaultIcon}</span>
    );

    return (
      <details
        ref={ref}
        className={rootClassName}
        open={isOpen}
        onToggle={handleToggle}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        <summary className={summaryClassName}>
          {iconPosition === 'before' && iconElement}
          <span>{header}</span>
          {iconPosition === 'after' && iconElement}
        </summary>
        <div className={contentClassName}>{children}</div>
      </details>
    );
  },
);

VscAccordion.displayName = 'VscAccordion';
