import React from 'react';
import { Title, Description, Primary, Stories, ArgTypes } from '@storybook/addon-docs/blocks';

/**
 * Custom Docs page — shows title, description, primary story, args table, and all stories.
 */
export const DocsPage = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <ArgTypes />
    <Stories />
  </>
);
