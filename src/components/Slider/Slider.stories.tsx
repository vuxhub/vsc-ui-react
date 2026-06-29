import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { VscSlider } from '.';
import { Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Slider',
  component: VscSlider,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'Size variant.',
    },
    min: {
      control: 'number',
      description: 'Minimum value.',
    },
    max: {
      control: 'number',
      description: 'Maximum value.',
    },
    step: {
      control: 'number',
      description: 'Increment between selectable values.',
    },
    vertical: {
      control: 'boolean',
      description: 'Renders the slider in a vertical orientation.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the slider and prevents interaction.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A range slider with VS Code styling. Wraps Fluent UI’s `Slider` and re-points the rail, progress, and thumb colors at VS Code design tokens.',
      },
    },
  },
} satisfies Meta<typeof VscSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    defaultValue: 50,
  },
};

/* ── States ──────────────────────────────────────────────────────── */

export const States: Story = {
  render: () => (
    <Row>
      <Inline label="Zero">
        <VscSlider defaultValue={0} aria-label="Zero" />
      </Inline>
      <Inline label="Mid">
        <VscSlider defaultValue={50} aria-label="Mid" />
      </Inline>
      <Inline label="Full">
        <VscSlider defaultValue={100} aria-label="Full" />
      </Inline>
      <Inline label="Disabled">
        <VscSlider defaultValue={50} disabled aria-label="Disabled" />
      </Inline>
    </Row>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Row>
      <Inline label="Small">
        <VscSlider size="small" defaultValue={50} aria-label="Small" />
      </Inline>
      <Inline label="Medium (default)">
        <VscSlider defaultValue={50} aria-label="Medium" />
      </Inline>
    </Row>
  ),
};

/* ── Vertical ────────────────────────────────────────────────────── */

export const Vertical: Story = {
  render: () => (
    <Row>
      <VscSlider vertical defaultValue={25} aria-label="Vertical 25" />
      <VscSlider vertical defaultValue={50} aria-label="Vertical 50" />
      <VscSlider vertical defaultValue={75} aria-label="Vertical 75" />
    </Row>
  ),
};

/* ── Stepped ─────────────────────────────────────────────────────── */

export const Stepped: Story = {
  render: () => (
    <Row>
      <Inline label="Step 10">
        <VscSlider
          min={0}
          max={100}
          step={10}
          defaultValue={40}
          aria-label="Stepped"
        />
      </Inline>
    </Row>
  ),
};
