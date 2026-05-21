import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  DocsContainer as BaseContainer,
  type DocsContextProps,
} from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';

interface DocsContainerProps {
  context: DocsContextProps;
}

/**
 * Custom DocsContainer that switches the Storybook docs chrome theme
 * (toolbar, backgrounds, text) based on the scheme global.
 */
export const DocsContainer = ({
  children,
  context,
  ...rest
}: PropsWithChildren<DocsContainerProps>) => {
  // Read the current scheme from the first story's context
  let scheme = 'dark';
  try {
    const stories = context.componentStories();
    if (stories.length > 0) {
      const storyContext = context.getStoryContext(stories[0]);
      scheme = storyContext.globals?.scheme ?? 'dark';
    }
  } catch {
    // Falls back to dark
  }
  const docsTheme = scheme === 'dark' ? themes.dark : themes.light;

  return (
    <BaseContainer context={context} theme={docsTheme} {...rest}>
      {children}
    </BaseContainer>
  );
};
