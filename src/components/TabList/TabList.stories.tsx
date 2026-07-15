import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  SettingsRegular,
  CodeRegular,
  WindowRegular,
  PuzzlePieceRegular,
} from '@fluentui/react-icons';
import { VscTabList, VscTab } from '.';
import { Section } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/TabList',
  component: VscTabList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A tab strip container styled to match VS Code panels and editors. Supports horizontal and vertical orientations, two sizes (default 28px, small 22px), and optional icons. Use with `VscTab`.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    appearance: {
      control: 'radio',
      options: ['default', 'primary'],
    },
  },
} satisfies Meta<typeof VscTabList>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    defaultSelectedValue: 'general',
  },
  render: (args) => (
    <VscTabList {...args}>
      <VscTab value="general">General</VscTab>
      <VscTab value="editor">Editor</VscTab>
      <VscTab value="terminal">Terminal</VscTab>
      <VscTab value="extensions">Extensions</VscTab>
    </VscTabList>
  ),
};

/* ── Default Tabs ────────────────────────────────────────────────── */

export const SmallTabs: Story = {
  render: () => (
    <Section title="Small (12px text size)">
      <VscTabList size="small" defaultSelectedValue="general">
        <VscTab value="general">General</VscTab>
        <VscTab value="editor">Editor</VscTab>
        <VscTab value="terminal">Terminal</VscTab>
        <VscTab value="extensions">Extensions</VscTab>
      </VscTabList>
    </Section>
  ),
};

/* ── With Disabled Tab ───────────────────────────────────────────── */

export const WithDisabledTab: Story = {
  render: () => (
    <Section
      title="Disabled Tab"
      description="Use disabled prop to disable a tab"
    >
      <VscTabList defaultSelectedValue="problems">
        <VscTab value="problems">Problems</VscTab>
        <VscTab value="output">Output</VscTab>
        <VscTab value="logs" disabled>
          Logs (disabled)
        </VscTab>
      </VscTabList>
    </Section>
  ),
};

/* ── Vertical Tabs ───────────────────────────────────────────────── */

export const VerticalTabs: Story = {
  render: () => (
    <Section title="Vertical" description="TabList with vertical orientation.">
      <VscTabList vertical defaultSelectedValue="search">
        <VscTab value="explorer">Explorer</VscTab>
        <VscTab value="search">Search</VscTab>
        <VscTab value="git">Source Control</VscTab>
        <VscTab value="debug">Run and Debug</VscTab>
      </VscTabList>
    </Section>
  ),
};

/* ── With Icons – Default ────────────────────────────────────────── */

export const WithIconsDefault: Story = {
  args: {
    defaultSelectedValue: 'general',
  },
  render: (args) => (
    <Section
      title="With Icons – Default"
      description="Default appearance with 20px icons."
    >
      <VscTabList {...args}>
        <VscTab value="general" icon={<SettingsRegular />}>
          General
        </VscTab>
        <VscTab value="editor" icon={<CodeRegular />}>
          Editor
        </VscTab>
        <VscTab value="terminal" icon={<WindowRegular />}>
          Terminal
        </VscTab>
        <VscTab value="extensions" icon={<PuzzlePieceRegular />}>
          Extensions
        </VscTab>
      </VscTabList>
    </Section>
  ),
};

/* ── With Icons – Primary ────────────────────────────────────────── */

export const WithIconsPrimary: Story = {
  args: {
    appearance: 'primary',
    defaultSelectedValue: 'general',
  },
  render: (args) => (
    <Section
      title="With Icons – Primary"
      description="Primary appearance with 20px icons — the selected tab's icon and label use the VS Code accent blue."
    >
      <VscTabList {...args}>
        <VscTab value="general" icon={<SettingsRegular />}>
          General
        </VscTab>
        <VscTab value="editor" icon={<CodeRegular />}>
          Editor
        </VscTab>
        <VscTab value="terminal" icon={<WindowRegular />}>
          Terminal
        </VscTab>
        <VscTab value="extensions" icon={<PuzzlePieceRegular />}>
          Extensions
        </VscTab>
      </VscTabList>
    </Section>
  ),
};

/* ── Primary Appearance (text only) ──────────────────────────────── */

export const Primary: Story = {
  args: {
    appearance: 'primary',
    defaultSelectedValue: 'general',
  },
  render: (args) => (
    <Section
      title="Primary"
      description="Acts like a primary button — the selected tab's label uses the VS Code accent blue, with the standard active line indicator."
    >
      <VscTabList {...args}>
        <VscTab value="general">General</VscTab>
        <VscTab value="editor">Editor</VscTab>
        <VscTab value="terminal">Terminal</VscTab>
        <VscTab value="extensions" disabled>
          Extensions
        </VscTab>
      </VscTabList>
    </Section>
  ),
};
