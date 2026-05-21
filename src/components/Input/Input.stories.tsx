import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SearchRegular } from '@fluentui/react-icons';
import { VscInput } from '.';
import { Section, Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Input',
  component: VscInput,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'A single-line text input with VS Code styling. Supports validation states (error, warning), inline validation messages, icon slots via `contentBefore`/`contentAfter`, and three sizes.',
      },
    },
  },
} satisfies Meta<typeof VscInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    placeholder: 'Enter a value...',
  },
};

/* ── With Icon ───────────────────────────────────────────────────── */

export const WithIcon: Story = {
  render: () => (
    <Section title="Input with Icon">
      <Row>
        <VscInput
          contentBefore={<SearchRegular />}
          withIcon
          placeholder="Filter by name..."
        />
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
          <VscInput validationState="error" defaultValue="bad-value" />
        </Inline>
        <Inline label="Warning">
          <VscInput validationState="warning" defaultValue="check this" />
        </Inline>
      </Row>
    </Section>
  ),
};

/* ── Validation with Message ─────────────────────────────────────── */

export const ValidationWithMessage: Story = {
  name: 'Validation with Message',
  render: () => (
    <Section
      title="Validation Messages"
      description="Validation state with a message box below the input."
    >
      <Row>
        <VscInput
          validationState="error"
          validationMessage="Port must be between 0 and 65535"
          defaultValue="-1"
        />
      </Row>
      <Row>
        <VscInput
          validationState="warning"
          validationMessage="This value may cause issues"
          defaultValue="8080"
        />
      </Row>
    </Section>
  ),
};
