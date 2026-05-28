import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleRegular } from '@fluentui/react-icons';
import { VscBadge } from '.';
import type { VscBadgeAppearance, VscBadgeColor } from '.';
import { Inline, Row, Section } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Badge',
  component: VscBadge,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['filled', 'tint', 'outline', 'subtle'],
      description: 'Visual style of the badge.',
    },
    color: {
      control: 'select',
      options: ['blue', 'red', 'yellow', 'green', 'neutral', 'neutralContrast'],
      description: 'Semantic color of the badge.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
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
          'A pill-shaped badge styled to match VS Code. Supports six semantic colors, four appearances (filled, tint, outline, subtle), three sizes, and an optional prefix icon.',
      },
    },
  },
} satisfies Meta<typeof VscBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultIcon = <CircleRegular />;

const APPEARANCES: VscBadgeAppearance[] = [
  'filled',
  'tint',
  'outline',
  'subtle',
];

const COLORS: VscBadgeColor[] = [
  'blue',
  'red',
  'yellow',
  'green',
  'neutral',
  'neutralContrast',
];

const SIZES = ['small', 'medium', 'large'] as const;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    children: 'Badge',
    icon: defaultIcon,
  },
};

/* ── All Appearances ─────────────────────────────────────────────── */

export const AllAppearances: Story = {
  render: () => (
    <Row>
      {APPEARANCES.map((appearance) => (
        <VscBadge
          key={appearance}
          appearance={appearance}
          color="blue"
          icon={defaultIcon}
        >
          {appearance}
        </VscBadge>
      ))}
    </Row>
  ),
};

/* ── All Colors ──────────────────────────────────────────────────── */

export const AllColors: Story = {
  render: () => (
    <Row>
      {COLORS.map((color) => (
        <VscBadge key={color} color={color} icon={defaultIcon}>
          {color}
        </VscBadge>
      ))}
    </Row>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Row>
      {SIZES.map((size) => (
        <Inline key={size} label={size}>
          <VscBadge size={size} icon={defaultIcon}>
            Badge
          </VscBadge>
        </Inline>
      ))}
    </Row>
  ),
};

/* ── With Icon ───────────────────────────────────────────────────── */

export const WithIcon: Story = {
  render: () => (
    <VscBadge color="green" appearance="tint" icon={defaultIcon}>
      With icon
    </VscBadge>
  ),
};

/* ── Full Gallery ────────────────────────────────────────────────── */

export const FullGallery: Story = {
  render: () => (
    <>
      {COLORS.map((color) => (
        <Section
          key={color}
          title={color}
          description="Sizes (rows) × appearances (columns)"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '80px repeat(4, auto)',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <span />
            {APPEARANCES.map((a) => (
              <span
                key={a}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  opacity: 0.6,
                  textTransform: 'capitalize',
                }}
              >
                {a}
              </span>
            ))}
            {SIZES.map((size) => (
              <React.Fragment key={size}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    opacity: 0.6,
                    textTransform: 'capitalize',
                  }}
                >
                  {size}
                </span>
                {APPEARANCES.map((appearance) => (
                  <VscBadge
                    key={`${size}-${appearance}`}
                    color={color}
                    appearance={appearance}
                    size={size}
                    icon={defaultIcon}
                  >
                    Badge
                  </VscBadge>
                ))}
              </React.Fragment>
            ))}
          </div>
        </Section>
      ))}
    </>
  ),
};
