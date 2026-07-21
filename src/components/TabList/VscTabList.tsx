import {
  TabList,
  type TabListProps,
  Tab,
  type TabProps,
} from '@fluentui/react-components';
import { forwardRef } from 'react';

import {
  useVscTabListStyles,
  useVscTabStyles,
  type VscTabListAppearance,
} from './useTabListStyles';

export type { VscTabListAppearance };

export type VscTabListProps = Omit<TabListProps, 'appearance'> & {
  /**
   * Visual style of the tab strip.
   * - `default` – neutral VS Code panel/editor tabs.
   * - `primary` – the selected tab's icon and label use the VS Code accent
   *   blue, mirroring a primary button treatment.
   * @default 'default'
   */
  appearance?: VscTabListAppearance;
};

export const VscTabList = forwardRef<HTMLDivElement, VscTabListProps>(
  ({ className, size = 'medium', appearance = 'default', ...rest }, ref) => {
    const mergedClass = useVscTabListStyles({ size, appearance, className });

    return <TabList ref={ref} className={mergedClass} size={size} {...rest} />;
  },
);

VscTabList.displayName = 'VscTabList';

export type VscTabProps = TabProps;

export const VscTab = forwardRef<HTMLButtonElement, VscTabProps>(
  ({ className, ...rest }, ref) => {
    const mergedClass = useVscTabStyles(className);

    return <Tab ref={ref} className={mergedClass} {...rest} />;
  },
);

VscTab.displayName = 'VscTab';
