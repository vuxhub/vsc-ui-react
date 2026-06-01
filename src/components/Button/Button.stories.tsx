import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  AddRegular,
  ArrowSyncRegular,
  EditRegular,
  FolderOpenRegular,
  InfoRegular,
  PlayRegular,
} from '@fluentui/react-icons';
import { VscButton } from '.';
import { VscSplitButton } from '.';
import { VscMenuButton } from '.';
import {
  Menu,
  MenuTrigger,
  VscMenuPopover,
  VscMenuList,
  VscMenuItem,
} from '../Menu';
import { Section, Row, Inline } from '../../stories/helpers/helpers';

/* ── Icon mapping for controls ────────────────────────────────────── */

const iconMap: Record<string, React.ReactNode> = {
  none: undefined,
  add: <AddRegular />,
  edit: <EditRegular />,
  folderOpen: <FolderOpenRegular />,
  info: <InfoRegular />,
  play: <PlayRegular />,
  sync: <ArrowSyncRegular />,
};

const meta = {
  title: 'Components/Button',
  component: VscButton,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'subtle', 'transparent'],
      description: 'Visual style of the button.',
    },
    size: {
      control: 'select',
      options: ['medium', 'small', 'compact'],
      description:
        'Size variant. Includes `compact` (15 px) in addition to Fluent built-in sizes.',
    },
    icon: {
      control: 'select',
      options: Object.keys(iconMap),
      mapping: iconMap,
      description: 'Optional leading icon element.',
    },
    iconPosition: {
      control: 'radio',
      options: ['before', 'after'],
      description: 'Position of the icon relative to the label.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button and prevents interaction.',
    },
    children: {
      control: 'text',
      description: 'Button label content.',
    },
    onClick: {
      description: 'Click handler.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A button styled to match VS Code. Supports five appearances (primary, secondary, outline, subtle, transparent), three sizes, and optional leading icons. Also available as `VscSplitButton` and `VscMenuButton` variants.',
      },
    },
  },
} satisfies Meta<typeof VscButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

/* ── Primary ─────────────────────────────────────────────────────── */

export const Primary: Story = {
  args: {
    children: 'Primary',
    appearance: 'primary',
  },
};

/* ── All Appearances ─────────────────────────────────────────────── */

export const AllAppearances: Story = {
  render: (args) => (
    <Section
      title="Button Appearances"
      description="All five button appearances at default size."
    >
      <Row>
        <VscButton {...args} appearance="primary">
          Primary
        </VscButton>
        <VscButton {...args} appearance="secondary">
          Secondary
        </VscButton>
        <VscButton {...args} appearance="outline">
          Outline
        </VscButton>
        <VscButton {...args} appearance="subtle">
          Subtle
        </VscButton>
        <VscButton {...args} appearance="transparent">
          Transparent
        </VscButton>
      </Row>
    </Section>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: (args) => (
    <>
      <Section title="Medium (default)">
        <Row>
          <VscButton {...args} appearance="primary">
            Medium
          </VscButton>
          <VscButton {...args} appearance="secondary">
            Medium
          </VscButton>
        </Row>
      </Section>
      <Section title="Small">
        <Row>
          <VscButton {...args} appearance="primary" size="small">
            Small
          </VscButton>
          <VscButton {...args} appearance="secondary" size="small">
            Small
          </VscButton>
        </Row>
      </Section>
      <Section title="Compact">
        <Row>
          <VscButton {...args} appearance="primary" size="compact">
            Compact
          </VscButton>
          <VscButton {...args} appearance="secondary" size="compact">
            Compact
          </VscButton>
        </Row>
      </Section>
    </>
  ),
};

/* ── Icon + Text ─────────────────────────────────────────────────── */

export const WithIcons: Story = {
  render: (args) => (
    <Section title="Icon + Text" description="Buttons with leading icons.">
      <Row>
        <VscButton {...args} appearance="primary" icon={<AddRegular />}>
          New File
        </VscButton>
        <VscButton
          {...args}
          appearance="secondary"
          icon={<FolderOpenRegular />}
        >
          Open Folder
        </VscButton>
        <VscButton {...args} appearance="outline" icon={<InfoRegular />}>
          Info
        </VscButton>
        <VscButton {...args} appearance="subtle" icon={<EditRegular />}>
          Edit
        </VscButton>
        <VscButton
          {...args}
          appearance="transparent"
          icon={<ArrowSyncRegular />}
        >
          Refresh
        </VscButton>
      </Row>
    </Section>
  ),
};

/* ── Icon Only ───────────────────────────────────────────────────── */

export const IconOnly: Story = {
  render: (args) => (
    <Section title="Icon-Only Buttons">
      <Row>
        <Inline label="Primary">
          <VscButton
            {...args}
            appearance="primary"
            icon={<AddRegular />}
            aria-label="Add"
          />
        </Inline>
        <Inline label="Secondary">
          <VscButton
            {...args}
            appearance="secondary"
            icon={<FolderOpenRegular />}
            aria-label="Open folder"
          />
        </Inline>
        <Inline label="Subtle">
          <VscButton
            {...args}
            appearance="subtle"
            icon={<EditRegular />}
            aria-label="Edit"
          />
        </Inline>
        <Inline label="Transparent">
          <VscButton
            {...args}
            appearance="transparent"
            icon={<ArrowSyncRegular />}
            aria-label="Refresh"
          />
        </Inline>
      </Row>
    </Section>
  ),
};

/* ── Disabled ────────────────────────────────────────────────────── */

export const Disabled: Story = {
  render: (args) => (
    <Section title="Disabled Buttons">
      <Row>
        <VscButton {...args} appearance="primary" disabled>
          Primary
        </VscButton>
        <VscButton {...args} appearance="secondary" disabled>
          Secondary
        </VscButton>
        <VscButton {...args} appearance="outline" disabled>
          Outline
        </VscButton>
        <VscButton {...args} appearance="subtle" disabled>
          Subtle
        </VscButton>
        <VscButton {...args} appearance="transparent" disabled>
          Transparent
        </VscButton>
      </Row>
    </Section>
  ),
};

/* ── Split Button ────────────────────────────────────────────────── */

export const SplitButtons: Story = {
  name: 'Split Button',
  render: () => (
    <Section
      title="Split Buttons"
      description="A primary action with a dropdown trigger for secondary actions."
    >
      <Row>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps) => (
              <VscSplitButton
                appearance="primary"
                icon={<PlayRegular />}
                menuButton={triggerProps}
              >
                Run
              </VscSplitButton>
            )}
          </MenuTrigger>
          <VscMenuPopover>
            <VscMenuList>
              <VscMenuItem>Run Without Debugging</VscMenuItem>
              <VscMenuItem>Run With Profiling</VscMenuItem>
            </VscMenuList>
          </VscMenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            {(triggerProps) => (
              <VscSplitButton
                appearance="secondary"
                icon={<FolderOpenRegular />}
                menuButton={triggerProps}
              >
                Open
              </VscSplitButton>
            )}
          </MenuTrigger>
          <VscMenuPopover>
            <VscMenuList>
              <VscMenuItem>Open File</VscMenuItem>
              <VscMenuItem>Open Folder</VscMenuItem>
            </VscMenuList>
          </VscMenuPopover>
        </Menu>
      </Row>
    </Section>
  ),
};

/* ── Menu Button ─────────────────────────────────────────────────── */

export const MenuButtons: Story = {
  name: 'Menu Button',
  render: () => (
    <Section
      title="Menu Buttons"
      description="A button that opens a menu — shows a chevron indicator."
    >
      <Row>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <VscMenuButton appearance="primary">Actions</VscMenuButton>
          </MenuTrigger>
          <VscMenuPopover>
            <VscMenuList>
              <VscMenuItem>Action One</VscMenuItem>
              <VscMenuItem>Action Two</VscMenuItem>
            </VscMenuList>
          </VscMenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <VscMenuButton appearance="secondary" icon={<FolderOpenRegular />}>
              Open Recent
            </VscMenuButton>
          </MenuTrigger>
          <VscMenuPopover>
            <VscMenuList>
              <VscMenuItem>project-alpha</VscMenuItem>
              <VscMenuItem>project-beta</VscMenuItem>
            </VscMenuList>
          </VscMenuPopover>
        </Menu>
      </Row>
    </Section>
  ),
};
