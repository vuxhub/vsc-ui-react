import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleRegular } from '@fluentui/react-icons';
import { VscBadge } from '.';
import type { VscBadgeAppearance, VscBadgeColor, VscBadgeSize } from '.';
import { Section, Row, Inline } from '../../stories/helpers/helpers';

const appearances: VscBadgeAppearance[] = [
  'filled',
  'tint',
  'outline',
  'subtle',
];

const colors: VscBadgeColor[] = [
  'blue',
  'red',
  'yellow',
  'green',
  'neutral',
  'neutralContrast',
];

const sizes: VscBadgeSize[] = ['small', 'medium', 'large'];

const meta = {
  title: 'Components/Badge',
  component: VscBadge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: appearances,
      description: 'Visual style of the badge.',
    },
    color: {
      control: 'select',
      options: colors,
      description: 'Semantic color of the badge.',
    },
    size: {
      control: 'radio',
      options: sizes,
      description: 'Size variant.',
    },
    children: {
      control: 'text',
      description: 'Badge label content.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A badge styled to match VS Code. Supports four appearances (filled, tint, outline, subtle), six colors, three sizes, and an optional leading icon.',
      },
    },
  },
} satisfies Meta<typeof VscBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    children: 'Badge',
    appearance: 'filled',
    color: 'blue',
    size: 'medium',
  },
};

/* ── Appearances ─────────────────────────────────────────────────── */

export const Appearances: Story = {
  render: (args) => (
    <Section
      title="Appearances"
      description="All four appearances at the default blue color."
    >
      <Row>
        {appearances.map((appearance) => (
          <Inline key={appearance} label={appearance}>
            <VscBadge {...args} appearance={appearance}>
              Badge
            </VscBadge>
          </Inline>
        ))}
      </Row>
    </Section>
  ),
};

/* ── Colors ──────────────────────────────────────────────────────── */

export const Colors: Story = {
  render: (args) => (
    <>
      {appearances.map((appearance) => (
        <Section key={appearance} title={appearance}>
          <Row>
            {colors.map((color) => (
              <Inline key={color} label={color}>
                <VscBadge {...args} appearance={appearance} color={color}>
                  Badge
                </VscBadge>
              </Inline>
            ))}
          </Row>
        </Section>
      ))}
    </>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: (args) => (
    <Section title="Sizes">
      <Row>
        {sizes.map((size) => (
          <Inline key={size} label={size}>
            <VscBadge {...args} size={size}>
              Badge
            </VscBadge>
          </Inline>
        ))}
      </Row>
    </Section>
  ),
};

/* ── With Icon ───────────────────────────────────────────────────── */

export const WithIcon: Story = {
  render: (args) => (
    <Section title="With Icon" description="Badges with a leading icon.">
      <Row>
        {appearances.map((appearance) => (
          <Inline key={appearance} label={appearance}>
            <VscBadge
              {...args}
              appearance={appearance}
              icon={<CircleRegular />}
            >
              Badge
            </VscBadge>
          </Inline>
        ))}
      </Row>
    </Section>
  ),
};
