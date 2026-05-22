import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { VscTextarea } from '.';
import { Section, Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Textarea',
  component: VscTextarea,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'A multi-line text input with VS Code styling. Supports validation states, configurable resize behavior (none, vertical, horizontal, both), and read-only mode.',
      },
    },
  },
} satisfies Meta<typeof VscTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    placeholder: 'Describe your issue...',
    rows: 4,
  },
};

/* ── Validation States ───────────────────────────────────────────── */

export const ValidationStates: Story = {
  render: () => (
    <Section title="Validation States">
      <Row>
        <Inline label="Error">
          <VscTextarea
            validationState="error"
            defaultValue="Invalid content"
            rows={3}
            style={{ minWidth: 240 }}
          />
        </Inline>
        <Inline label="Warning">
          <VscTextarea
            validationState="warning"
            defaultValue="Check this content"
            rows={3}
            style={{ minWidth: 240 }}
          />
        </Inline>
      </Row>
    </Section>
  ),
};

/* ── Resizable ───────────────────────────────────────────────────── */

export const Resizable: Story = {
  render: () => (
    <Section title="Resize Behavior">
      <Row>
        <Inline label="Vertical">
          <VscTextarea
            resize="vertical"
            placeholder="Resizable vertically"
            rows={3}
            style={{ minWidth: 280 }}
          />
        </Inline>
        <Inline label="Both">
          <VscTextarea
            resize="both"
            placeholder="Resizable both directions"
            rows={3}
            style={{ minWidth: 280 }}
          />
        </Inline>
      </Row>
    </Section>
  ),
};
