import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VscLabel } from '.';
import { Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Label',
  component: VscLabel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A standalone label with VS Code styling. Supports sizes, font weights, required indicator, and an optional info tooltip icon. For form fields, prefer `VscField` which includes a label automatically.',
      },
    },
  },
} satisfies Meta<typeof VscLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    children: 'Default label',
  },
};

/* ── Disabled ────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    children: 'Disabled label',
    disabled: true,
  },
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Row>
      <Inline label="Small">
        <VscLabel size="small">Small label</VscLabel>
      </Inline>
      <Inline label="Medium (default)">
        <VscLabel size="medium">Medium label</VscLabel>
      </Inline>
      <Inline label="Large">
        <VscLabel size="large">Large label</VscLabel>
      </Inline>
    </Row>
  ),
};

/* ── Weights ─────────────────────────────────────────────────────── */

export const Weights: Story = {
  render: () => (
    <Row>
      <Inline label="Regular">
        <VscLabel weight="regular">Regular weight</VscLabel>
      </Inline>
      <Inline label="Semibold">
        <VscLabel weight="semibold">Semibold weight</VscLabel>
      </Inline>
    </Row>
  ),
};

/* ── Required ────────────────────────────────────────────────────── */

export const Required: Story = {
  render: () => (
    <Row>
      <VscLabel required>Required field</VscLabel>
      <VscLabel required size="large" weight="semibold">
        Large required
      </VscLabel>
    </Row>
  ),
};

/* ── With Tooltip ────────────────────────────────────────────────── */

export const WithTooltip: Story = {
  render: () => (
    <Row>
      <VscLabel tooltipContent="This provides additional context">
        Label with info
      </VscLabel>
      <VscLabel required tooltipContent="This field is mandatory">
        Required with tooltip
      </VscLabel>
    </Row>
  ),
};
