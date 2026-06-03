import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { VscSearchBox } from '.';
import { Section, Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/SearchBox',
  component: VscSearchBox,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'A search-specific input with a built-in search icon and dismiss action, styled to match VS Code. Defaults to `small` size.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof VscSearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    placeholder: 'Search settings',
  },
};

/* ── Size Variants ───────────────────────────────────────────────── */

export const SizeVariants: Story = {
  render: () => (
    <Section title="Size Variants">
      <Row>
        <Inline label="Small (default)">
          <VscSearchBox placeholder="Search..." />
        </Inline>
        <Inline label="Medium">
          <VscSearchBox size="medium" placeholder="Search..." />
        </Inline>
        <Inline label="Large">
          <VscSearchBox size="large" placeholder="Search everything..." />
        </Inline>
      </Row>
    </Section>
  ),
};
