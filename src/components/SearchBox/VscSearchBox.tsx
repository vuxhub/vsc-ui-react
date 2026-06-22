import { SearchBox, type SearchBoxProps } from '@fluentui/react-components';
import { forwardRef } from 'react';

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

    return (
      <SearchBox
        ref={ref}
        size={size}
        disabled={disabled}
        className={mergedClass}
        {...rest}
      />
    );
  },
);

VscSearchBox.displayName = 'VscSearchBox';
