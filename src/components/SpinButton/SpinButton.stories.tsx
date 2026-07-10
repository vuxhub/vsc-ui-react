import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { VscSpinButton } from '.';
import { Section, Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/SpinButton',
  component: VscSpinButton,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'A numeric input with increment/decrement steppers, styled to match VS Code. Supports three sizes (small 24px, medium 26px, large 28px), validation intents (error, warning), and a read-only state. Wraps Fluent UI `SpinButton`.',
      },
    },
  },
} satisfies Meta<typeof VscSpinButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    defaultValue: 10,
    min: 0,
    max: 100,
  },
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Section title="Sizes">
      <Row>
        <Inline label="Small (24px)">
          <VscSpinButton size="small" defaultValue={10} />
        </Inline>
        <Inline label="Medium (26px)">
          <VscSpinButton size="medium" defaultValue={10} />
        </Inline>
        <Inline label="Large (28px)">
          <VscSpinButton size="large" defaultValue={10} />
        </Inline>
      </Row>
    </Section>
  ),
};

/* ── Validation States ───────────────────────────────────────────── */

export const ValidationStates: Story = {
  render: () => (
    <Section title="Validation States">
      <Row>
        <Inline label="Error">
          <VscSpinButton validationState="error" defaultValue={-1} />
        </Inline>
        <Inline label="Warning">
          <VscSpinButton validationState="warning" defaultValue={999} />
        </Inline>
      </Row>
    </Section>
  ),
};

/* ── States ──────────────────────────────────────────────────────── */

export const States: Story = {
  render: () => (
    <Section title="States">
      <Row>
        <Inline label="Default">
          <VscSpinButton defaultValue={10} />
        </Inline>
        <Inline label="Read only">
          <VscSpinButton defaultValue={10} readOnly />
        </Inline>
        <Inline label="Disabled">
          <VscSpinButton defaultValue={10} disabled />
        </Inline>
      </Row>
    </Section>
  ),
};
