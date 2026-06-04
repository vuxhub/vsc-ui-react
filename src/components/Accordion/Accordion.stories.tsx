import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { VscAccordion } from '.';
import { Section, Row, Inline } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Accordion',
  component: VscAccordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A semantic accordion component using `<details>` and `<summary>` HTML elements with VS Code styling. Supports multiple sizes and icon positioning.',
      },
    },
  },
} satisfies Meta<typeof VscAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    header: 'Accordion Header',
    children: (
      <div style={{ padding: '8px 0' }}>
        This is the accordion content. It is only visible when expanded.
      </div>
    ),
  },
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  args: { header: 'Accordion' },
  render: () => (
    <Section title="Sizes">
      <Row>
        <Inline label="Small (20px)">
          <VscAccordion size="small" header="Small Accordion">
            <div>Small content</div>
          </VscAccordion>
        </Inline>
      </Row>
      <Row>
        <Inline label="Medium (20px)">
          <VscAccordion size="medium" header="Medium Accordion">
            <div>Medium content</div>
          </VscAccordion>
        </Inline>
      </Row>
      <Row>
        <Inline label="Large (22px)">
          <VscAccordion size="large" header="Large Accordion">
            <div>Large content</div>
          </VscAccordion>
        </Inline>
      </Row>
      <Row>
        <Inline label="Extra Large (28px)">
          <VscAccordion size="extra-large" header="Extra Large Accordion">
            <div>Extra large content</div>
          </VscAccordion>
        </Inline>
      </Row>
    </Section>
  ),
};

/* ── Icon Position ───────────────────────────────────────────────── */

export const IconPosition: Story = {
  args: { header: 'Accordion' },
  render: () => (
    <Section title="Icon Position">
      <Row>
        <Inline label="Before (default)">
          <VscAccordion iconPosition="before" header="Icon Before" defaultOpen>
            <div>Content with icon on the left</div>
          </VscAccordion>
        </Inline>
      </Row>
      <Row>
        <Inline label="After">
          <VscAccordion iconPosition="after" header="Icon After" defaultOpen>
            <div>Content with icon on the right</div>
          </VscAccordion>
        </Inline>
      </Row>
    </Section>
  ),
};

/* ── States ──────────────────────────────────────────────────────── */

export const States: Story = {
  args: { header: 'Accordion' },
  render: () => (
    <Section title="States">
      <Row>
        <Inline label="Collapsed">
          <VscAccordion header="Collapsed Accordion">
            <div>Hidden content</div>
          </VscAccordion>
        </Inline>
      </Row>
      <Row>
        <Inline label="Expanded">
          <VscAccordion header="Expanded Accordion" defaultOpen>
            <div>Visible content</div>
          </VscAccordion>
        </Inline>
      </Row>
      <Row>
        <Inline label="Disabled">
          <VscAccordion header="Disabled Accordion" disabled>
            <div>Cannot be toggled</div>
          </VscAccordion>
        </Inline>
      </Row>
    </Section>
  ),
};

/* ── All Sizes Expanded ──────────────────────────────────────────── */

export const AllSizesExpanded: Story = {
  args: { header: 'Accordion' },
  render: () => (
    <Section title="All Sizes — Expanded">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <VscAccordion size="small" header="Small" defaultOpen>
          <div>Small expanded content</div>
        </VscAccordion>
        <VscAccordion size="medium" header="Medium" defaultOpen>
          <div>Medium expanded content</div>
        </VscAccordion>
        <VscAccordion size="large" header="Large" defaultOpen>
          <div>Large expanded content</div>
        </VscAccordion>
        <VscAccordion size="extra-large" header="Extra Large" defaultOpen>
          <div>Extra large expanded content</div>
        </VscAccordion>
      </div>
    </Section>
  ),
};

/* ── Icon After with Sizes ───────────────────────────────────────── */

export const IconAfterSizes: Story = {
  args: { header: 'Accordion' },
  render: () => (
    <Section title="Icon After — All Sizes">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          maxWidth: 340,
        }}
      >
        <VscAccordion
          size="small"
          iconPosition="after"
          header="Small"
          defaultOpen
        >
          <div>Small content</div>
        </VscAccordion>
        <VscAccordion
          size="medium"
          iconPosition="after"
          header="Medium"
          defaultOpen
        >
          <div>Medium content</div>
        </VscAccordion>
        <VscAccordion
          size="large"
          iconPosition="after"
          header="Large"
          defaultOpen
        >
          <div>Large content</div>
        </VscAccordion>
        <VscAccordion
          size="extra-large"
          iconPosition="after"
          header="Extra Large"
          defaultOpen
        >
          <div>Extra large content</div>
        </VscAccordion>
      </div>
    </Section>
  ),
};
