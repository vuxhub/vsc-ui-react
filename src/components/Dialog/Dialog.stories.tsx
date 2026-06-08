import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  VscDialog,
  VscDialogTrigger,
  VscDialogSurface,
  VscDialogBody,
  VscDialogTitle,
  VscDialogContent,
  VscDialogDescription,
  VscDialogSeparator,
  VscDialogActions,
} from '.';
import { VscButton } from '../Button';
import { VscField } from '../Field';
import { VscInput } from '../Input';
import { VscTextarea } from '../Textarea';
import { Section, Row } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A modal dialog styled to match VS Code. Composed from `VscDialog`, `VscDialogTrigger`, `VscDialogSurface`, `VscDialogBody`, `VscDialogTitle`, `VscDialogContent`, `VscDialogDescription`, `VscDialogSeparator`, and `VscDialogActions`. Surfaces support `wide` (600px) and `narrow` (320px) sizes, and the title renders a close button by default.',
      },
    },
  },
} satisfies Meta<typeof VscDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <VscDialog>
      <VscDialogTrigger>
        <VscButton appearance="primary">Open dialog</VscButton>
      </VscDialogTrigger>
      <VscDialogSurface size="wide">
        <VscDialogBody>
          <VscDialogTitle>Main question or action</VscDialogTitle>
          <VscDialogContent>
            <VscDialogDescription>
              This is a VS Code–styled dialog. Use it to confirm an action or
              gather a small amount of input from the user.
            </VscDialogDescription>
            <VscDialogSeparator />
            <VscTextarea
              rows={4}
              defaultValue="Provide more detail about what you'd like to do."
            />
          </VscDialogContent>
          <VscDialogActions size="wide">
            <VscButton appearance="primary">Confirm</VscButton>
            <VscDialogTrigger action="close">
              <VscButton>Cancel</VscButton>
            </VscDialogTrigger>
          </VscDialogActions>
        </VscDialogBody>
      </VscDialogSurface>
    </VscDialog>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Section
      title="Sizes"
      description="Surfaces support wide (600px) and narrow (320px) layouts."
    >
      <Row>
        {(['wide', 'narrow'] as const).map((size) => (
          <VscDialog key={size}>
            <VscDialogTrigger>
              <VscButton>Open {size} dialog</VscButton>
            </VscDialogTrigger>
            <VscDialogSurface size={size}>
              <VscDialogBody>
                <VscDialogTitle>Main question or action</VscDialogTitle>
                <VscDialogContent>
                  <VscDialogDescription>
                    The {size} surface keeps the same vertical rhythm while
                    adjusting its width and button stacking.
                  </VscDialogDescription>
                </VscDialogContent>
                <VscDialogActions size={size}>
                  <VscButton appearance="primary">Action</VscButton>
                  <VscDialogTrigger action="close">
                    <VscButton>Cancel</VscButton>
                  </VscDialogTrigger>
                </VscDialogActions>
              </VscDialogBody>
            </VscDialogSurface>
          </VscDialog>
        ))}
      </Row>
    </Section>
  ),
};

/* ── With Form ───────────────────────────────────────────────────── */

export const WithForm: Story = {
  render: () => (
    <VscDialog>
      <VscDialogTrigger>
        <VscButton>Open form dialog</VscButton>
      </VscDialogTrigger>
      <VscDialogSurface size="wide">
        <VscDialogBody>
          <VscDialogTitle>Add connection</VscDialogTitle>
          <VscDialogContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <VscField label="Name" required>
                <VscInput placeholder="Enter connection name" />
              </VscField>
              <VscField label="Endpoint" required>
                <VscInput placeholder="https://your-server.com" />
              </VscField>
            </div>
          </VscDialogContent>
          <VscDialogActions size="wide">
            <VscButton appearance="primary">Save</VscButton>
            <VscDialogTrigger action="close">
              <VscButton>Cancel</VscButton>
            </VscDialogTrigger>
          </VscDialogActions>
        </VscDialogBody>
      </VscDialogSurface>
    </VscDialog>
  ),
};

/* ── Without Close Button ────────────────────────────────────────── */

export const WithoutCloseButton: Story = {
  render: () => (
    <VscDialog>
      <VscDialogTrigger>
        <VscButton>Open dialog</VscButton>
      </VscDialogTrigger>
      <VscDialogSurface size="narrow">
        <VscDialogBody>
          <VscDialogTitle action={null}>Confirm delete</VscDialogTitle>
          <VscDialogContent>
            <VscDialogDescription>
              Pass <code>action=&#123;null&#125;</code> to the title to hide the
              default close control. This is useful for confirmation dialogs.
            </VscDialogDescription>
          </VscDialogContent>
          <VscDialogActions size="narrow">
            <VscButton appearance="primary">Delete</VscButton>
            <VscDialogTrigger action="close">
              <VscButton>Cancel</VscButton>
            </VscDialogTrigger>
          </VscDialogActions>
        </VscDialogBody>
      </VscDialogSurface>
    </VscDialog>
  ),
};
