import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VscField } from '.';
import { VscInput } from '../Input';
import { VscTextarea } from '../Textarea';
import { VscDropdown, VscOption } from '../Dropdown';
import { Section } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Field',
  component: VscField,
  tags: ['autodocs'],
  argTypes: {
    validationState: {
      control: 'radio',
      options: ['none', 'error', 'warning', 'info'],
      mapping: {
        none: undefined,
        error: 'error',
        warning: 'warning',
        info: 'info',
      },
      description:
        'Applies VS Code validation styling to the field and child input.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A form field wrapper that provides a label, optional info tooltip, required indicator, and validation message for any child input. Pairs with `VscInput`, `VscTextarea`, and `VscDropdown`.',
      },
    },
  },
} satisfies Meta<typeof VscField>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    label: 'Workspace Name',
    required: true,
  },
  render: (args) => {
    const validationMessages: Record<string, string> = {
      error: 'This field is required.',
      warning: 'This value may cause issues.',
      info: 'Optional — leave blank to use the default.',
    };
    const message = args.validationState
      ? validationMessages[args.validationState]
      : undefined;

    return (
      <div style={{ maxWidth: 360 }}>
        <VscField {...args} validationMessage={message}>
          <VscInput
            placeholder="my-workspace"
            validationState={
              args.validationState === 'info'
                ? undefined
                : (args.validationState as 'error' | 'warning' | undefined)
            }
          />
        </VscField>
      </div>
    );
  },
};

/* ── With Tooltip ────────────────────────────────────────────────── */

export const WithTooltip: Story = {
  render: () => (
    <Section
      title="Field with Tooltip"
      description="An info icon next to the label shows a tooltip on hover."
    >
      <div style={{ maxWidth: 360 }}>
        <VscField
          label="Editor: Font Size"
          tooltipContent="Controls the font size in pixels."
        >
          <VscInput type="number" defaultValue="14" style={{ width: 80 }} />
        </VscField>
      </div>
    </Section>
  ),
};

/* ── Validation States ────────────────────────────────────────────── */

export const ValidationStates: Story = {
  render: () => (
    <Section
      title="Validation States"
      description="Fields with error, warning, and info validation messages."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 360,
        }}
      >
        <VscField
          label="Username"
          validationState="error"
          validationMessage="Username is already taken."
        >
          <VscInput validationState="error" defaultValue="admin" />
        </VscField>
        <VscField
          label="Display Name"
          validationState="warning"
          validationMessage="Display name is very short."
        >
          <VscInput validationState="warning" defaultValue="A" />
        </VscField>
        <VscField
          label="Bio"
          validationState="info"
          validationMessage="Optional — leave blank to use the default."
        >
          <VscInput placeholder="Tell us about yourself" />
        </VscField>
      </div>
    </Section>
  ),
};

/* ── With Input ──────────────────────────────────────────────────── */

export const WithInput: Story = {
  render: () => (
    <Section title="Field with Input">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 360,
        }}
      >
        <VscField
          label="Editor: Font Family"
          tooltipContent="Controls the font family."
        >
          <VscInput defaultValue="'Cascadia Code', 'Fira Code', monospace" />
        </VscField>
        <VscField label="Editor: Font Size">
          <VscInput type="number" defaultValue="14" style={{ width: 80 }} />
        </VscField>
      </div>
    </Section>
  ),
};

/* ── With Textarea ───────────────────────────────────────────────── */

export const WithTextarea: Story = {
  render: () => (
    <Section title="Field with Textarea">
      <div style={{ maxWidth: 360 }}>
        <VscField label="Terminal: Shell Args">
          <VscTextarea defaultValue="--login" rows={3} />
        </VscField>
      </div>
    </Section>
  ),
};

/* ── With Dropdown ───────────────────────────────────────────────── */

export const WithDropdown: Story = {
  render: () => (
    <Section title="Field with Dropdown">
      <div style={{ maxWidth: 360 }}>
        <VscField label="Color Theme">
          <VscDropdown defaultValue="Dark+ (default dark)">
            <VscOption text="Dark+ (default dark)">
              Dark+ (default dark)
            </VscOption>
            <VscOption text="Light+ (default light)">
              Light+ (default light)
            </VscOption>
            <VscOption text="Monokai">Monokai</VscOption>
          </VscDropdown>
        </VscField>
      </div>
    </Section>
  ),
};
