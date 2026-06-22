import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { VscSwitch } from '.';
import { Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Switch',
  component: VscSwitch,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size variant.',
    },
    labelPosition: {
      control: 'radio',
      options: ['after', 'above'],
      description: 'Position of the label relative to the switch.',
    },
    label: {
      control: 'text',
      description: 'Label text.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch and prevents interaction.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A toggle switch with VS Code styling. Supports three sizes, label positioning (`after` / `above`), and disabled state.',
      },
    },
  },
} satisfies Meta<typeof VscSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    label: 'Enable feature',
  },
};

/* ── States ──────────────────────────────────────────────────────── */

export const States: Story = {
  render: () => (
    <Row>
      <VscSwitch label="Off" />
      <VscSwitch label="On" defaultChecked />
      <VscSwitch label="Disabled" disabled />
      <VscSwitch label="Disabled on" disabled defaultChecked />
    </Row>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Row>
      <Inline label="Small">
        <VscSwitch size="small" label="Small" defaultChecked />
      </Inline>
      <Inline label="Medium (default)">
        <VscSwitch label="Medium" defaultChecked />
      </Inline>
      <Inline label="Large">
        <VscSwitch size="large" label="Large" defaultChecked />
      </Inline>
    </Row>
  ),
};

/* ── Label Positions ─────────────────────────────────────────────── */

export const LabelPositions: Story = {
  render: () => (
    <Row>
      <Inline label="After (default)">
        <VscSwitch label="After label" labelPosition="after" defaultChecked />
      </Inline>
      <Inline label="Above">
        <VscSwitch label="Above label" labelPosition="above" defaultChecked />
      </Inline>
    </Row>
  ),
};

/* ── Without Label ───────────────────────────────────────────────── */

export const WithoutLabel: Story = {
  render: () => (
    <Row>
      <VscSwitch aria-label="Standalone switch" />
      <VscSwitch aria-label="Standalone switch on" defaultChecked />
    </Row>
  ),
};
