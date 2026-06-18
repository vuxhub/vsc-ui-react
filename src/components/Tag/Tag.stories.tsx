import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CircleRegular } from '@fluentui/react-icons';
import { VscTag } from '.';
import { Section, Row } from '../../stories/helpers/helpers';

const iconMap: Record<string, React.ReactNode> = {
  none: undefined,
  circle: <CircleRegular />,
};

const meta = {
  title: 'Components/Tag',
  component: VscTag,
  tags: ['autodocs'],
  args: {
    children: 'Primary text',
    icon: 'circle',
    onDismiss: fn(),
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['default', 'outline', 'brand'],
      description: 'Visual style variant.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the tag.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tag is disabled.',
    },
    children: {
      control: 'text',
      description: 'Primary text content.',
    },
    secondaryText: {
      control: 'text',
      description: 'Optional secondary text below primary. Large only.',
      if: {
        arg: 'size',
        eq: 'large',
      },
    },
    icon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Optional icon shown before text.',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Called when the dismiss button is clicked.',
      table: {
        category: 'Events',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A dismissible tag/chip styled to match VS Code. Supports three appearances (default, outline, brand), three sizes (small, medium, large), optional icons, and secondary text.',
      },
    },
  },
} satisfies Meta<typeof VscTag>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    children: 'Primary text',
    size: 'large',
  },
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Section title="Sizes">
      <Row label="Large">
        <VscTag size="large" icon={<CircleRegular />}>
          Primary text
        </VscTag>
      </Row>
      <Row label="Medium">
        <VscTag size="medium" icon={<CircleRegular />}>
          Primary text
        </VscTag>
      </Row>
      <Row label="Small">
        <VscTag size="small" icon={<CircleRegular />}>
          Primary text
        </VscTag>
      </Row>
    </Section>
  ),
};

/* ── Appearances ─────────────────────────────────────────────────── */

export const Appearances: Story = {
  render: () => (
    <Section title="Appearances">
      <Row label="Default">
        <VscTag appearance="default" size="large" icon={<CircleRegular />}>
          Primary text
        </VscTag>
        <VscTag appearance="default" size="medium" icon={<CircleRegular />}>
          Primary text
        </VscTag>
        <VscTag appearance="default" size="small" icon={<CircleRegular />}>
          Primary text
        </VscTag>
      </Row>
      <Row label="Outline">
        <VscTag appearance="outline" size="large" icon={<CircleRegular />}>
          Primary text
        </VscTag>
        <VscTag appearance="outline" size="medium" icon={<CircleRegular />}>
          Primary text
        </VscTag>
        <VscTag appearance="outline" size="small" icon={<CircleRegular />}>
          Primary text
        </VscTag>
      </Row>
      <Row label="Brand">
        <VscTag appearance="brand" size="large" icon={<CircleRegular />}>
          Primary text
        </VscTag>
        <VscTag appearance="brand" size="medium" icon={<CircleRegular />}>
          Primary text
        </VscTag>
        <VscTag appearance="brand" size="small" icon={<CircleRegular />}>
          Primary text
        </VscTag>
      </Row>
    </Section>
  ),
};

/* ── With Secondary Text ─────────────────────────────────────────── */

export const WithSecondaryText: Story = {
  render: () => (
    <Section title="With Secondary Text (Large only)">
      <Row label="Default">
        <VscTag
          appearance="default"
          size="large"
          icon={<CircleRegular />}
          secondaryText="Secondary"
        >
          Primary text
        </VscTag>
      </Row>
      <Row label="Outline">
        <VscTag
          appearance="outline"
          size="large"
          icon={<CircleRegular />}
          secondaryText="Secondary"
        >
          Primary text
        </VscTag>
      </Row>
      <Row label="Brand">
        <VscTag
          appearance="brand"
          size="large"
          icon={<CircleRegular />}
          secondaryText="Secondary"
        >
          Primary text
        </VscTag>
      </Row>
    </Section>
  ),
};

/* ── Disabled ────────────────────────────────────────────────────── */

export const Disabled: Story = {
  render: () => (
    <Section title="Disabled">
      <Row>
        <VscTag
          appearance="default"
          size="large"
          icon={<CircleRegular />}
          disabled
        >
          Primary text
        </VscTag>
        <VscTag
          appearance="outline"
          size="large"
          icon={<CircleRegular />}
          disabled
        >
          Primary text
        </VscTag>
        <VscTag
          appearance="brand"
          size="large"
          icon={<CircleRegular />}
          disabled
        >
          Primary text
        </VscTag>
      </Row>
    </Section>
  ),
};

/* ── All Variants Grid ───────────────────────────────────────────── */

export const AllVariants: Story = {
  render: () => (
    <Section title="All Variants">
      {(['default', 'outline', 'brand'] as const).map((appearance) => (
        <React.Fragment key={appearance}>
          <Row label={appearance}>
            {(['large', 'medium', 'small'] as const).map((size) => (
              <VscTag
                key={size}
                appearance={appearance}
                size={size}
                icon={<CircleRegular />}
              >
                Primary text
              </VscTag>
            ))}
          </Row>
        </React.Fragment>
      ))}
    </Section>
  ),
};
