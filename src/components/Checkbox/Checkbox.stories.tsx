import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { VscCheckbox } from '.';
import { Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Checkbox',
  component: VscCheckbox,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox with VS Code styling. Supports three sizes, mixed/indeterminate state, and optional label text.',
      },
    },
  },
} satisfies Meta<typeof VscCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    label: 'Accept terms',
  },
};

/* ── States ──────────────────────────────────────────────────────── */

export const States: Story = {
  render: () => (
    <Row>
      <VscCheckbox label="Unchecked" />
      <VscCheckbox label="Checked" defaultChecked />
      <VscCheckbox label="Disabled" disabled />
      <VscCheckbox label="Disabled checked" disabled defaultChecked />
    </Row>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Row>
      <Inline label="Small">
        <VscCheckbox size="small" label="Small" defaultChecked />
      </Inline>
      <Inline label="Medium (default)">
        <VscCheckbox label="Medium" defaultChecked />
      </Inline>
      <Inline label="Large">
        <VscCheckbox size="large" label="Large" defaultChecked />
      </Inline>
    </Row>
  ),
};

/* ── Indeterminate ───────────────────────────────────────────────── */

export const Indeterminate: Story = {
  render: () => (
    <Row>
      <VscCheckbox label="Indeterminate" checked="mixed" />
    </Row>
  ),
};

/* ── Without Label ───────────────────────────────────────────────── */

export const WithoutLabel: Story = {
  render: () => (
    <Row>
      <VscCheckbox aria-label="Standalone checkbox" />
      <VscCheckbox aria-label="Standalone checked" defaultChecked />
    </Row>
  ),
};
