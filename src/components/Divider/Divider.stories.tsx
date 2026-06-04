import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VscDivider } from '.';
import { Section, Row } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Divider',
  component: VscDivider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider line.',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size variant affecting text padding.',
    },
    alignContent: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Position of the text content along the divider.',
    },
    children: {
      control: 'text',
      description: 'Optional text content displayed on the divider.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A divider styled to match VS Code. Supports horizontal and vertical orientations, two sizes (small, large), and text aligned at start, center, or end.',
      },
    },
  },
} satisfies Meta<typeof VscDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    children: 'Text',
  },
};

/* ── Horizontal with text positions ──────────────────────────────── */

export const HorizontalAlignments: Story = {
  render: () => (
    <Section
      title="Horizontal – Text Alignment"
      description="Text can be positioned at start, center, or end."
    >
      <Row label="Large">
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <VscDivider alignContent="center" size="large">
            Text
          </VscDivider>
          <VscDivider alignContent="start" size="large">
            Text
          </VscDivider>
          <VscDivider alignContent="end" size="large">
            Text
          </VscDivider>
        </div>
      </Row>
      <Row label="Small">
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <VscDivider alignContent="center" size="small">
            Text
          </VscDivider>
          <VscDivider alignContent="start" size="small">
            Text
          </VscDivider>
          <VscDivider alignContent="end" size="small">
            Text
          </VscDivider>
        </div>
      </Row>
    </Section>
  ),
};

/* ── Vertical with text positions ────────────────────────────────── */

export const VerticalAlignments: Story = {
  render: () => (
    <Section
      title="Vertical – Text Alignment"
      description="Vertical dividers with text at start, center, and end."
    >
      <Row label="Large">
        <div style={{ display: 'flex', gap: 48, height: 200 }}>
          <VscDivider orientation="vertical" alignContent="start" size="large">
            Text
          </VscDivider>
          <VscDivider orientation="vertical" alignContent="center" size="large">
            Text
          </VscDivider>
          <VscDivider orientation="vertical" alignContent="end" size="large">
            Text
          </VscDivider>
        </div>
      </Row>
      <Row label="Small">
        <div style={{ display: 'flex', gap: 48, height: 200 }}>
          <VscDivider orientation="vertical" alignContent="start" size="small">
            Text
          </VscDivider>
          <VscDivider orientation="vertical" alignContent="center" size="small">
            Text
          </VscDivider>
          <VscDivider orientation="vertical" alignContent="end" size="small">
            Text
          </VscDivider>
        </div>
      </Row>
    </Section>
  ),
};

/* ── Without text ────────────────────────────────────────────────── */

export const NoText: Story = {
  render: () => (
    <Section title="No Text" description="Dividers without text content.">
      <Row label="Horizontal">
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <VscDivider />
          <VscDivider size="small" />
        </div>
      </Row>
      <Row label="Vertical">
        <div style={{ display: 'flex', gap: 48, height: 100 }}>
          <VscDivider orientation="vertical" />
          <VscDivider orientation="vertical" size="small" />
        </div>
      </Row>
    </Section>
  ),
};
