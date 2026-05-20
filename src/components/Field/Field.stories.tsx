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
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <VscField {...args}>
        <VscInput placeholder="my-workspace" />
      </VscField>
    </div>
  ),
};

/* ── With Tooltip ────────────────────────────────────────────────── */

export const WithTooltip: Story = {
  name: 'With Tooltip',
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

/* ── Full Example ────────────────────────────────────────────────── */

export const SettingsForm: Story = {
  name: 'Full Example — Settings Form',
  render: () => (
    <Section
      title="Settings Form"
      description="A realistic form combining multiple input types."
    >
      <div style={{ width: '100%', maxWidth: 640 }}>
        <VscField
          label="Editor: Font Family"
          tooltipContent="Controls the font family. Accepts a comma-separated list."
          style={{ marginBottom: 16 }}
        >
          <VscInput defaultValue="'Cascadia Code', 'Fira Code', monospace" />
        </VscField>
        <VscField label="Editor: Font Size" style={{ marginBottom: 16 }}>
          <VscInput type="number" defaultValue="14" style={{ width: 80 }} />
        </VscField>
        <VscField label="Color Theme" style={{ marginBottom: 16 }}>
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
        <VscField label="Terminal: Shell Args">
          <VscTextarea defaultValue="--login" rows={2} />
        </VscField>
      </div>
    </Section>
  ),
};
