import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CutRegular,
  CopyRegular,
  ClipboardPasteRegular,
  ArrowUndoRegular,
  ArrowRedoRegular,
  SelectAllOnRegular,
  DocumentRegular,
  FolderRegular,
  FolderOpenRegular,
  SettingsRegular,
} from '@fluentui/react-icons';
import { VscButton } from '../Button';
import {
  Menu,
  MenuTrigger,
  VscMenuPopover,
  VscMenuList,
  VscMenuItem,
  VscMenuItemCheckbox,
  VscMenuItemRadio,
  VscMenuDivider,
  VscMenuGroup,
  VscMenuGroupHeader,
} from '.';
import { Section } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Menu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Context menu and dropdown menu components styled to match VS Code. Includes `VscMenuItem`, `VscMenuItemCheckbox`, `VscMenuItemRadio`, `VscMenuDivider`, `VscMenuGroup`, and `VscMenuGroupHeader`. Wraps Fluent's `Menu` and `MenuTrigger` for positioning.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/* ── Basic Context Menu ──────────────────────────────────────────── */

export const BasicMenu: Story = {
  name: 'Basic Context Menu',
  render: () => (
    <Section
      title="Basic Context Menu"
      description="Right-click style menu with icons and keyboard shortcuts."
    >
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <VscButton appearance="outline">Right-click Menu</VscButton>
        </MenuTrigger>
        <VscMenuPopover>
          <VscMenuList>
            <VscMenuItem icon={<CutRegular />} secondaryContent="Ctrl+X">
              Cut
            </VscMenuItem>
            <VscMenuItem icon={<CopyRegular />} secondaryContent="Ctrl+C">
              Copy
            </VscMenuItem>
            <VscMenuItem
              icon={<ClipboardPasteRegular />}
              secondaryContent="Ctrl+V"
            >
              Paste
            </VscMenuItem>
            <VscMenuDivider />
            <VscMenuItem
              icon={<SelectAllOnRegular />}
              secondaryContent="Ctrl+A"
            >
              Select All
            </VscMenuItem>
          </VscMenuList>
        </VscMenuPopover>
      </Menu>
    </Section>
  ),
};

/* ── Edit Menu ───────────────────────────────────────────────────── */

export const EditMenu: Story = {
  render: () => (
    <Section title="Edit Menu" description="A full edit menu with undo/redo.">
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <VscButton appearance="outline">Edit</VscButton>
        </MenuTrigger>
        <VscMenuPopover>
          <VscMenuList>
            <VscMenuItem icon={<ArrowUndoRegular />} secondaryContent="Ctrl+Z">
              Undo
            </VscMenuItem>
            <VscMenuItem
              icon={<ArrowRedoRegular />}
              secondaryContent="Ctrl+Shift+Z"
            >
              Redo
            </VscMenuItem>
            <VscMenuDivider />
            <VscMenuItem icon={<CutRegular />} secondaryContent="Ctrl+X">
              Cut
            </VscMenuItem>
            <VscMenuItem icon={<CopyRegular />} secondaryContent="Ctrl+C">
              Copy
            </VscMenuItem>
            <VscMenuItem
              icon={<ClipboardPasteRegular />}
              secondaryContent="Ctrl+V"
            >
              Paste
            </VscMenuItem>
          </VscMenuList>
        </VscMenuPopover>
      </Menu>
    </Section>
  ),
};

/* ── With Groups ─────────────────────────────────────────────────── */

export const WithGroups: Story = {
  render: () => (
    <Section title="Grouped Menu" description="Items organized with headers.">
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <VscButton appearance="outline">File Menu</VscButton>
        </MenuTrigger>
        <VscMenuPopover>
          <VscMenuList>
            <VscMenuGroup>
              <VscMenuGroupHeader>New</VscMenuGroupHeader>
              <VscMenuItem icon={<DocumentRegular />}>New File</VscMenuItem>
              <VscMenuItem icon={<FolderRegular />}>New Folder</VscMenuItem>
            </VscMenuGroup>
            <VscMenuDivider />
            <VscMenuGroup>
              <VscMenuGroupHeader>Open</VscMenuGroupHeader>
              <VscMenuItem
                icon={<FolderOpenRegular />}
                secondaryContent="Ctrl+O"
              >
                Open File
              </VscMenuItem>
            </VscMenuGroup>
          </VscMenuList>
        </VscMenuPopover>
      </Menu>
    </Section>
  ),
};

/* ── Checkbox & Radio Items ──────────────────────────────────────── */

export const CheckboxAndRadio: Story = {
  render: () => (
    <Section title="Checkbox & Radio Menu Items">
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <VscButton appearance="outline" icon={<SettingsRegular />}>
            View Options
          </VscButton>
        </MenuTrigger>
        <VscMenuPopover>
          <VscMenuList checkedValues={{ view: ['minimap'], wordWrap: ['on'] }}>
            <VscMenuGroup>
              <VscMenuGroupHeader>Toggle</VscMenuGroupHeader>
              <VscMenuItemCheckbox name="view" value="minimap">
                Minimap
              </VscMenuItemCheckbox>
              <VscMenuItemCheckbox name="view" value="breadcrumbs">
                Breadcrumbs
              </VscMenuItemCheckbox>
            </VscMenuGroup>
            <VscMenuDivider />
            <VscMenuGroup>
              <VscMenuGroupHeader>Word Wrap</VscMenuGroupHeader>
              <VscMenuItemRadio name="wordWrap" value="off">
                Off
              </VscMenuItemRadio>
              <VscMenuItemRadio name="wordWrap" value="on">
                On
              </VscMenuItemRadio>
              <VscMenuItemRadio name="wordWrap" value="bounded">
                Bounded
              </VscMenuItemRadio>
            </VscMenuGroup>
          </VscMenuList>
        </VscMenuPopover>
      </Menu>
    </Section>
  ),
};

/* ── Disabled Items ──────────────────────────────────────────────── */

export const DisabledItems: Story = {
  render: () => (
    <Section title="Menu with Disabled Items">
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <VscButton appearance="outline">Actions</VscButton>
        </MenuTrigger>
        <VscMenuPopover>
          <VscMenuList>
            <VscMenuItem icon={<CutRegular />}>Cut</VscMenuItem>
            <VscMenuItem icon={<CopyRegular />}>Copy</VscMenuItem>
            <VscMenuItem icon={<ClipboardPasteRegular />} disabled>
              Paste (nothing on clipboard)
            </VscMenuItem>
          </VscMenuList>
        </VscMenuPopover>
      </Menu>
    </Section>
  ),
};
