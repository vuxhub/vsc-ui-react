import { SearchBox, type SearchBoxProps } from '@fluentui/react-components';
import { forwardRef, useCallback, useRef } from 'react';

import {
  useSearchBoxStyles,
  type VscSearchBoxAppearance,
} from './useSearchBoxStyles';

export type VscSearchBoxProps = Omit<SearchBoxProps, 'appearance'> & {
  /** Visual style: outline (bordered) or transparent (underline only). */
  appearance?: VscSearchBoxAppearance;
};

export const VscSearchBox = forwardRef<HTMLInputElement, VscSearchBoxProps>(
  (
    { size = 'small', appearance = 'outline', disabled, className, ...rest },
    ref,
  ) => {
    const mergedClass = useSearchBoxStyles({
      size,
      appearance,
      disabled,
      className,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const handleRootMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        // Clicking anywhere in the root (icons, etc.) that isn't the input
        // should not blur the input — prevent default and refocus.
        if ((e.target as HTMLElement).tagName !== 'INPUT') {
          e.preventDefault();
          inputRef.current?.focus();
        }
      },
      [],
    );

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseDown={handleRootMouseDown} style={{ display: 'contents' }}>
        <SearchBox
          ref={(node) => {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }}
          size={size}
          disabled={disabled}
          className={mergedClass}
          {...rest}
        />
      </div>
    );
  },
);

VscSearchBox.displayName = 'VscSearchBox';
