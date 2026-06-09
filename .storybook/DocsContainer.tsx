import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  DocsContainer as BaseContainer,
  type DocsContextProps,
} from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import { useGlobals } from '@storybook/preview-api';

interface DocsContainerProps {
  context: DocsContextProps;
}

/**
 * Custom DocsContainer that switches the Storybook docs chrome theme
 * (toolbar, backgrounds, text) based on the scheme global.
 *
 * useGlobals() subscribes to the Storybook globals channel so the component
 * re-renders whenever the user toggles the toolbar scheme, ensuring the
 * Storybook docs wrapper background (appContentBg) tracks the current theme.
 */
export const DocsContainer = ({
  children,
  context,
  ...rest
}: PropsWithChildren<DocsContainerProps>) => {
  const [globals] = useGlobals();
  const scheme = (globals?.scheme ?? 'dark') as string;
  const docsTheme = scheme === 'dark' ? themes.dark : themes.light;

  return (
    <BaseContainer context={context} theme={docsTheme} {...rest}>
      {children}
    </BaseContainer>
  );
};
