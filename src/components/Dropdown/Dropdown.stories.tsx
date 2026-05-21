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
  parameters: {
    docs: {
      description: {
        component:
          'A select-style dropdown with VS Code styling. This family also includes `VscCombobox` (editable with filtering), `VscListbox` (inline list), and supporting primitives like `VscOption`, `VscOptionGroup`, and `VscOptionSeparator`.',
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
  },
  render: (args) => (
    <VscDropdown {...args}>
      <VscOption text="Dark+">Dark+</VscOption>
      <VscOption text="Light+">Light+</VscOption>
      <VscOption text="Monokai">Monokai</VscOption>
    </VscDropdown>
  ),
};

/* ── Dropdown ────────────────────────────────────────────────────── */

export const DropdownTrigger: Story = {
  name: 'Dropdown',
  render: () => (
    <>
      <Section title="Default Dropdown">
        <Row>
          <VscDropdown placeholder="Select a theme" defaultValue="Dark+">
            <VscOption text="Dark+">Dark+</VscOption>
            <VscOption text="Light+">Light+</VscOption>
            <VscOption text="Monokai">Monokai</VscOption>
          </VscDropdown>
          <VscDropdown placeholder="Disabled" disabled>
            <VscOption text="Disabled">Disabled</VscOption>
          </VscDropdown>
        </Row>
      </Section>
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
    </>
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
