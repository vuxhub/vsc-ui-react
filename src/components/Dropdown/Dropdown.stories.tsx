import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VscField } from '../Field';
import {
  VscDropdown,
  VscCombobox,
  VscListbox,
  VscOption,
  VscOptionGroup,
} from '.';
import { Section, Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Dropdown',
  component: VscDropdown,
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
      description: 'Validation border state for the trigger.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the dropdown trigger.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A select-style dropdown with VS Code styling. This family also includes `VscCombobox` (editable with filtering), `VscListbox` (inline list), and supporting primitives like `VscOption`, `VscOptionGroup`, and `VscOptionSeparator`. Visual note: `Default`, `Disabled`, `Sizes`, and `Selection States` cover closed-trigger behavior; `Open State` and `Combobox Open State` are for popup/list visuals.',
      },
    },
  },
} satisfies Meta<typeof VscDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    placeholder: 'Select a theme',
    size: 'medium',
  },
  render: (args) => (
    <VscDropdown {...args}>
      <VscOption text="Dark+">Dark+</VscOption>
      <VscOption text="Light+">Light+</VscOption>
      <VscOption text="Monokai">Monokai</VscOption>
    </VscDropdown>
  ),
};

/* ── Disabled ────────────────────────────────────────────────────── */

export const Disabled: Story = {
  render: () => (
    <Section title="Disabled">
      <Row>
        <VscDropdown placeholder="Disabled" disabled>
          <VscOption text="Disabled">Disabled</VscOption>
        </VscDropdown>
      </Row>
    </Section>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Section title="Sizes">
      <Row>
        <Inline label="Small">
          <VscDropdown size="small" placeholder="Small">
            <VscOption text="A">A</VscOption>
            <VscOption text="B">B</VscOption>
          </VscDropdown>
        </Inline>
        <Inline label="Medium (default)">
          <VscDropdown placeholder="Medium">
            <VscOption text="A">A</VscOption>
            <VscOption text="B">B</VscOption>
          </VscDropdown>
        </Inline>
        <Inline label="Large">
          <VscDropdown size="large" placeholder="Large">
            <VscOption text="A">A</VscOption>
            <VscOption text="B">B</VscOption>
          </VscDropdown>
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
          <VscDropdown validationState="error" defaultValue="Required field">
            <VscOption text="Required field">Required field</VscOption>
          </VscDropdown>
        </Inline>
        <Inline label="Warning">
          <VscDropdown validationState="warning" defaultValue="Check value">
            <VscOption text="Check value">Check value</VscOption>
          </VscDropdown>
        </Inline>
        <Inline label="Info">
          <VscDropdown validationState="info" defaultValue="Optional">
            <VscOption text="Optional">Optional</VscOption>
          </VscDropdown>
        </Inline>
      </Row>
    </Section>
  ),
};

/* ── Selection States ───────────────────────────────────────────── */

export const SelectionStates: Story = {
  render: () => (
    <>
      <Section title="Selected Trigger Value">
        <Row>
          <VscDropdown defaultValue="Dark+ (default dark)">
            <VscOption text="Dark+ (default dark)">
              Dark+ (default dark)
            </VscOption>
            <VscOption text="Light+ (default light)">
              Light+ (default light)
            </VscOption>
            <VscOption text="Monokai">Monokai</VscOption>
          </VscDropdown>
        </Row>
      </Section>

      <Section
        title="Selected Option Styling (Inline Listbox)"
        description="Use Listbox for deterministic selected-option visuals without relying on popup behavior."
      >
        <div style={{ maxWidth: 320 }}>
          <VscListbox
            selectionIndicator="checkmark"
            selectedOptions={['dark-plus']}
          >
            <VscOption value="dark-plus" text="Dark+ (default dark)">
              Dark+ (default dark)
            </VscOption>
            <VscOption value="light-plus" text="Light+ (default light)">
              Light+ (default light)
            </VscOption>
            <VscOption value="monokai" text="Monokai">
              Monokai
            </VscOption>
          </VscListbox>
        </div>
      </Section>
    </>
  ),
};

/* ── Open State ─────────────────────────────────────────────────── */

export const OpenDropdown: Story = {
  name: 'Open State',
  render: () => (
    <Section
      title="Dropdown Open By Default"
      description="Useful for validating popup option, hover, and selection visuals in screenshots."
    >
      <div style={{ maxWidth: 320 }}>
        <VscDropdown
          open
          value="Dark+ (default dark)"
          onOpenChange={() => {
            // Keep story deterministic by leaving open state controlled.
          }}
        >
          <VscOption text="Dark+ (default dark)">
            Dark+ (default dark)
          </VscOption>
          <VscOption text="Light+ (default light)">
            Light+ (default light)
          </VscOption>
          <VscOption text="Monokai">Monokai</VscOption>
        </VscDropdown>
      </div>
    </Section>
  ),
};

/* ── Combobox ────────────────────────────────────────────────────── */

export const ComboboxStory: Story = {
  name: 'Combobox',
  render: () => (
    <Section
      title="Combobox"
      description="An editable dropdown with a text input."
    >
      <Row>
        <VscCombobox placeholder="Search languages...">
          <VscOption text="JavaScript">JavaScript</VscOption>
          <VscOption text="TypeScript">TypeScript</VscOption>
          <VscOption text="Python">Python</VscOption>
          <VscOption text="Rust">Rust</VscOption>
          <VscOption text="Go">Go</VscOption>
        </VscCombobox>
        <VscCombobox placeholder="Disabled" disabled>
          <VscOption text="Disabled">Disabled</VscOption>
        </VscCombobox>
      </Row>
    </Section>
  ),
};

export const OpenCombobox: Story = {
  name: 'Combobox Open State',
  render: () => (
    <Section
      title="Combobox Open By Default"
      description="Useful for validating popup option, hover, and selection visuals for editable triggers."
    >
      <div style={{ maxWidth: 320 }}>
        <VscCombobox
          open
          value="TypeScript"
          onOpenChange={() => {
            // Keep story deterministic by leaving open state controlled.
          }}
        >
          <VscOption text="JavaScript">JavaScript</VscOption>
          <VscOption text="TypeScript">TypeScript</VscOption>
          <VscOption text="Python">Python</VscOption>
          <VscOption text="Rust">Rust</VscOption>
          <VscOption text="Go">Go</VscOption>
        </VscCombobox>
      </div>
    </Section>
  ),
};

/* ── Listbox ─────────────────────────────────────────────────────── */

export const ListboxOptions: Story = {
  name: 'Listbox & Options',
  render: () => (
    <>
      <Section title="Basic Options">
        <div style={{ maxWidth: 280 }}>
          <VscListbox>
            <VscOption text="Dark+ (default dark)">
              Dark+ (default dark)
            </VscOption>
            <VscOption text="Light+ (default light)">
              Light+ (default light)
            </VscOption>
            <VscOption text="Monokai">Monokai</VscOption>
            <VscOption text="Solarized Dark">Solarized Dark</VscOption>
            <VscOption text="High Contrast" disabled>
              High Contrast (disabled)
            </VscOption>
          </VscListbox>
        </div>
      </Section>
      <Section title="Option Groups">
        <div style={{ maxWidth: 280 }}>
          <VscListbox>
            <VscOptionGroup label="Recent">
              <VscOption text="JavaScript">JavaScript</VscOption>
              <VscOption text="TypeScript">TypeScript</VscOption>
            </VscOptionGroup>
            <VscOptionGroup label="All Languages">
              <VscOption text="C++">C++</VscOption>
              <VscOption text="Python">Python</VscOption>
              <VscOption text="Rust">Rust</VscOption>
            </VscOptionGroup>
          </VscListbox>
        </div>
      </Section>
    </>
  ),
};

/* ── Full Example ────────────────────────────────────────────────── */

export const SettingsForm: Story = {
  name: 'Full Example — Settings Form',
  render: () => (
    <Section
      title="Settings Form"
      description="A settings-style form using dropdown + combobox."
    >
      <div style={{ width: '100%', maxWidth: 560 }}>
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
        <VscField label="Font Family">
          <VscCombobox defaultValue="Cascadia Code">
            <VscOption text="Cascadia Code">Cascadia Code</VscOption>
            <VscOption text="Fira Code">Fira Code</VscOption>
            <VscOption text="JetBrains Mono">JetBrains Mono</VscOption>
          </VscCombobox>
        </VscField>
      </div>
    </Section>
  ),
};
