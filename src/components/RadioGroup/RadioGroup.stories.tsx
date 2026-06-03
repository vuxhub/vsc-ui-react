import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { VscRadioGroup, VscRadio } from '.';
import { Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/RadioGroup',
  component: VscRadioGroup,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'A radio group with VS Code styling. Supports three sizes, horizontal/vertical layout, and individual radio disabling.',
      },
    },
  },
} satisfies Meta<typeof VscRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => (
    <VscRadioGroup {...args}>
      <VscRadio value="apple" label="Apple" />
      <VscRadio value="banana" label="Banana" />
      <VscRadio value="cherry" label="Cherry" />
    </VscRadioGroup>
  ),
  args: {
    defaultValue: 'banana',
  },
};

/* ── States ──────────────────────────────────────────────────────── */

export const States: Story = {
  render: () => (
    <Row>
      <Inline label="Unselected">
        <VscRadioGroup>
          <VscRadio value="a" label="Option" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Selected">
        <VscRadioGroup value="a">
          <VscRadio value="a" label="Option" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Disabled">
        <VscRadioGroup disabled>
          <VscRadio value="a" label="Option" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Disabled selected">
        <VscRadioGroup value="a" disabled>
          <VscRadio value="a" label="Option" />
        </VscRadioGroup>
      </Inline>
    </Row>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Row>
      <Inline label="Small">
        <VscRadioGroup defaultValue="a">
          <VscRadio value="a" label="Small" size="small" />
          <VscRadio value="b" label="Option B" size="small" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Medium">
        <VscRadioGroup defaultValue="a">
          <VscRadio value="a" label="Medium" size="medium" />
          <VscRadio value="b" label="Option B" size="medium" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Large">
        <VscRadioGroup defaultValue="a">
          <VscRadio value="a" label="Large" size="large" />
          <VscRadio value="b" label="Option B" size="large" />
        </VscRadioGroup>
      </Inline>
    </Row>
  ),
};

/* ── Horizontal Layout ───────────────────────────────────────────── */

export const Horizontal: Story = {
  render: () => (
    <VscRadioGroup layout="horizontal" defaultValue="b">
      <VscRadio value="a" label="Left" />
      <VscRadio value="b" label="Center" />
      <VscRadio value="c" label="Right" />
    </VscRadioGroup>
  ),
};

/* ── Without Label ───────────────────────────────────────────────── */

export const WithoutLabel: Story = {
  render: () => (
    <Row>
      <VscRadioGroup defaultValue="a">
        <VscRadio value="a" aria-label="Option A" />
        <VscRadio value="b" aria-label="Option B" />
      </VscRadioGroup>
    </Row>
  ),
};

/* ── Individual Disabled ─────────────────────────────────────────── */

export const IndividualDisabled: Story = {
  render: () => (
    <VscRadioGroup defaultValue="a">
      <VscRadio value="a" label="Available" />
      <VscRadio value="b" label="Disabled option" disabled />
      <VscRadio value="c" label="Also available" />
    </VscRadioGroup>
  ),
};
