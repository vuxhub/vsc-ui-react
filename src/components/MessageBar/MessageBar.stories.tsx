import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Link } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

import {
  VscMessageBar,
  VscMessageBarActions,
  VscMessageBarBody,
  VscMessageBarGroup,
  VscMessageBarTitle,
} from '.';
import { VscButton } from '../Button';
import { Section } from '../../stories/helpers/helpers';

const INTENTS = ['default', 'info', 'success', 'warning', 'error'] as const;

const meta = {
  title: 'Components/MessageBar',
  component: VscMessageBar,
  tags: ['autodocs'],
  args: {
    intent: 'default',
    shape: 'rounded',
    layout: 'auto',
  },
  argTypes: {
    intent: {
      control: 'select',
      options: INTENTS,
      description: 'Announcement / design preset that drives icon and border.',
    },
    shape: {
      control: 'radio',
      options: ['rounded', 'square'],
      description: 'Rounded for component-level, square for page-level bars.',
    },
    layout: {
      control: 'radio',
      options: ['auto', 'singleline', 'multiline'],
      description: 'Reflow behaviour. `auto` wraps to multiline when needed.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A VS Code–styled message bar extended from Fluent UI. Supports four intents (info, success, warning, error), rounded/square shapes, and automatic reflow. The background is transparent so it blends with its surrounding surface.',
      },
    },
  },
} satisfies Meta<typeof VscMessageBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => (
    <VscMessageBar {...args}>
      <VscMessageBarBody>
        <VscMessageBarTitle>Descriptive title</VscMessageBarTitle>
        Message providing information to the user with actionable insights.{' '}
        <Link href="#">Link</Link>
      </VscMessageBarBody>
      <VscMessageBarActions
        containerAction={
          <VscButton
            appearance="transparent"
            aria-label="Dismiss"
            icon={<DismissRegular />}
            onClick={fn()}
          />
        }
      >
        <VscButton size="small">Action</VscButton>
        <VscButton size="small">Action</VscButton>
      </VscMessageBarActions>
    </VscMessageBar>
  ),
};

/* ── Intents ─────────────────────────────────────────────────────── */

export const Intents: Story = {
  render: () => (
    <Section title="Intents">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {INTENTS.map((intent) => (
          <VscMessageBar key={intent} intent={intent}>
            <VscMessageBarBody>
              <VscMessageBarTitle>Descriptive title</VscMessageBarTitle>
              Message providing information to the user with actionable
              insights. <Link href="#">Link</Link>
            </VscMessageBarBody>
            <VscMessageBarActions
              containerAction={
                <VscButton
                  appearance="transparent"
                  aria-label="Dismiss"
                  icon={<DismissRegular />}
                />
              }
            >
              <VscButton size="small">Action</VscButton>
              <VscButton size="small">Action</VscButton>
            </VscMessageBarActions>
          </VscMessageBar>
        ))}
      </div>
    </Section>
  ),
};

/* ── Multiline ───────────────────────────────────────────────────── */

export const Multiline: Story = {
  render: () => (
    <Section title="Multiline (long content reflows actions below)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {INTENTS.map((intent) => (
          <VscMessageBar key={intent} intent={intent} layout="multiline">
            <VscMessageBarBody>
              <VscMessageBarTitle>Descriptive title</VscMessageBarTitle>
              Message providing information to the user with actionable
              insights. Message providing information to the user with
              actionable insights. Message providing information to the user
              with actionable insights. <Link href="#">Link</Link>
            </VscMessageBarBody>
            <VscMessageBarActions
              containerAction={
                <VscButton
                  appearance="transparent"
                  aria-label="Dismiss"
                  icon={<DismissRegular />}
                />
              }
            >
              <VscButton size="small">Action</VscButton>
              <VscButton size="small">Action</VscButton>
            </VscMessageBarActions>
          </VscMessageBar>
        ))}
      </div>
    </Section>
  ),
};

/* ── Reflow ──────────────────────────────────────────────────────── */

export const Reflow: Story = {
  render: () => (
    <Section title="Reflow (drag the handle to resize)">
      <div
        style={{
          resize: 'horizontal',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          minWidth: 250,
          padding: 10,
          border: '1px dashed var(--vscode-panel-border)',
        }}
      >
        <VscMessageBar intent="info">
          <VscMessageBarBody>
            <VscMessageBarTitle>Descriptive title</VscMessageBarTitle>
            Message providing information to the user with actionable insights.{' '}
            <Link href="#">Link</Link>
          </VscMessageBarBody>
          <VscMessageBarActions
            containerAction={
              <VscButton
                appearance="transparent"
                aria-label="Dismiss"
                icon={<DismissRegular />}
              />
            }
          >
            <VscButton size="small">Action</VscButton>
            <VscButton size="small">Action</VscButton>
          </VscMessageBarActions>
        </VscMessageBar>
      </div>
    </Section>
  ),
};

/* ── Shapes ──────────────────────────────────────────────────────── */

export const Shapes: Story = {
  render: () => (
    <Section title="Shapes">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <VscMessageBar intent="info" shape="rounded">
          <VscMessageBarBody>
            <VscMessageBarTitle>Rounded</VscMessageBarTitle>
            Used for component-level message bars.
          </VscMessageBarBody>
        </VscMessageBar>
        <VscMessageBar intent="info" shape="square">
          <VscMessageBarBody>
            <VscMessageBarTitle>Square</VscMessageBarTitle>
            Used for page / app-level message bars.
          </VscMessageBarBody>
        </VscMessageBar>
      </div>
    </Section>
  ),
};

/* ── Group ───────────────────────────────────────────────────────── */

export const Group: Story = {
  render: () => (
    <Section title="MessageBarGroup">
      <VscMessageBarGroup>
        {INTENTS.map((intent) => (
          <VscMessageBar key={intent} intent={intent}>
            <VscMessageBarBody>
              <VscMessageBarTitle>Descriptive title</VscMessageBarTitle>
              Message providing information to the user with actionable
              insights.
            </VscMessageBarBody>
            <VscMessageBarActions
              containerAction={
                <VscButton
                  appearance="transparent"
                  aria-label="Dismiss"
                  icon={<DismissRegular />}
                />
              }
            />
          </VscMessageBar>
        ))}
      </VscMessageBarGroup>
    </Section>
  ),
};
