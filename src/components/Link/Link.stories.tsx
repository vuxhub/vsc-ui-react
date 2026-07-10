import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OpenRegular } from '@fluentui/react-icons';
import { VscLink } from '.';
import { Row, Inline } from '../../stories/helpers/helpers';

const iconMap: Record<string, React.ReactNode> = {
  none: undefined,
  OpenRegular: <OpenRegular />,
};

const meta = {
  title: 'Components/Link',
  component: VscLink,
  tags: ['autodocs'],
  args: {
    children: 'Link',
    href: '#',
    icon: 'none',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    underline: { control: 'boolean' },
    disabled: { control: 'boolean' },
    icon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Optional icon shown after text.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A VS Code styled hyperlink built on Fluent UI `Link`. Supports three sizes, an optional rest-state underline, hover underline, double-underline focus, an optional trailing icon, and a disabled state.',
      },
    },
  },
} satisfies Meta<typeof VscLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    children: 'Link',
  },
};

/* ── With underline at rest ──────────────────────────────────────── */

export const Underline: Story = {
  args: {
    children: 'Link',
    underline: true,
  },
};

/* ── With icon ───────────────────────────────────────────────────── */

export const WithIcon: Story = {
  args: {
    children: 'Link',
    icon: <OpenRegular />,
  },
};

/* ── Disabled ────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    children: 'Link',
    disabled: true,
  },
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Row>
      <Inline label="Small (16px)">
        <VscLink href="#" size="small">
          Link
        </VscLink>
      </Inline>
      <Inline label="Medium (22px)">
        <VscLink href="#" size="medium">
          Link
        </VscLink>
      </Inline>
      <Inline label="Large (28px)">
        <VscLink href="#" size="large">
          Link
        </VscLink>
      </Inline>
    </Row>
  ),
};

/* ── States ──────────────────────────────────────────────────────── */

export const States: Story = {
  render: () => (
    <Row>
      <Inline label="Rest">
        <VscLink href="#">Link</VscLink>
      </Inline>
      <Inline label="Rest (underline)">
        <VscLink href="#" underline>
          Link
        </VscLink>
      </Inline>
      <Inline label="Disabled">
        <VscLink href="#" disabled>
          Link
        </VscLink>
      </Inline>
    </Row>
  ),
};

/* ── Gallery ─────────────────────────────────────────────────────── */

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['large', 'medium', 'small'] as const).map((size) => (
        <Row key={size} label={size}>
          <VscLink href="#" size={size} icon={<OpenRegular />}>
            Link
          </VscLink>
          <VscLink href="#" size={size} underline icon={<OpenRegular />}>
            Link
          </VscLink>
          <VscLink href="#" size={size}>
            Link
          </VscLink>
          <VscLink href="#" size={size} underline>
            Link
          </VscLink>
          <VscLink href="#" size={size} disabled icon={<OpenRegular />}>
            Link
          </VscLink>
        </Row>
      ))}
    </div>
  ),
};
