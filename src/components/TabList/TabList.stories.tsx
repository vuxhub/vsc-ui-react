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

export const DefaultTabs: Story = {
  name: 'Default Tabs',
  render: () => (
    <>
      <Section
        title="Default (28px)"
        description="Body1 typography, 20px icons."
      >
        <VscTabList defaultSelectedValue="general">
          <VscTab value="general">General</VscTab>
          <VscTab value="editor">Editor</VscTab>
          <VscTab value="terminal">Terminal</VscTab>
          <VscTab value="extensions">Extensions</VscTab>
        </VscTabList>
      </Section>
      <Section
        title="Small (22px)"
        description="Caption1 typography, 16px icons."
      >
        <VscTabList size="small" defaultSelectedValue="general">
          <VscTab value="general">General</VscTab>
          <VscTab value="editor">Editor</VscTab>
          <VscTab value="terminal">Terminal</VscTab>
          <VscTab value="extensions">Extensions</VscTab>
        </VscTabList>
      </Section>
    </>
  ),
};

/* ── With Disabled Tab ───────────────────────────────────────────── */

export const WithDisabledTab: Story = {
  name: 'With Disabled Tab',
  render: () => (
    <Section title="Disabled Tab">
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
  name: 'Vertical Tabs',
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

/* ── With Icons ──────────────────────────────────────────────────── */

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <>
      <Section title="Default with Icons" description="20px icons.">
        <VscTabList defaultSelectedValue="general">
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
      <Section title="Small with Icons" description="16px icons.">
        <VscTabList size="small" defaultSelectedValue="general">
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
    </>
  ),
};
