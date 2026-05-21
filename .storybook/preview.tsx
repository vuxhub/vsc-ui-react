import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { FluentProvider } from '@fluentui/react-components';

/* ── Global CSS ─────────────────────────────────────────────────── */
import './theme-tokens.css';

import { darkTheme, lightTheme } from './themes';
import { DocsContainer } from './DocsContainer';
import { ThemeEffect } from './ThemeEffect';

/* ── FluentProvider decorator ───────────────────────────────────── */
const withFluent: Decorator = (Story, context) => {
  const scheme = (context.globals.scheme ?? 'dark') as 'dark' | 'light';
  const isDark = scheme === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <FluentProvider theme={theme}>
      <ThemeEffect isDark={isDark} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          padding: '24px',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    </FluentProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    scheme: {
      name: 'Color Scheme',
      description: 'Dark / Light mode',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    scheme: 'dark',
  },
  decorators: [withFluent],
  parameters: {
    layout: 'padded',
    backgrounds: { disabled: true },
    controls: { expanded: true },
    docs: {
      container: DocsContainer,
      story: { inline: true, height: 'auto' },
      source: { dark: true },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Design Language',
          ['Typography', 'Colors'],
          'Components',
          'Examples',
        ],
      },
    },
  },
};

export default preview;
