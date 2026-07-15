import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { VscRadioGroup, VscRadio } from '.';
import { VscField } from './../Field';
import { Row, Inline } from '../../stories/helpers/helpers';

type RadioGroupStoryArgs = React.ComponentProps<typeof VscRadioGroup> & {
  /** Story-only control for piping text into the first VscRadio's subtext prop. */
  subtext?: string;
};

const meta = {
  title: 'Components/RadioGroup',
  component: VscRadioGroup,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'A radio group with VS Code styling. Supports three sizes, horizontal/vertical layout, and individual radio disabling.',
      },
    },
  },
  // TODO(v-dlachman): Consider a dedicated VscRadio story file so radio-specific
  // controls (like subtext) are documented without story-only args on RadioGroup.
  argTypes: {
    subtext: {
      control: 'text',
      description: 'Secondary description text for the first radio (demo only)',
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<RadioGroupStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithRadioArgs = StoryObj<RadioGroupStoryArgs>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: StoryWithRadioArgs = {
  render: (args) => {
    const { subtext, ...rest } = args;
    return (
      <VscRadioGroup {...rest}>
        <VscRadio value="apple" label="Apple" subtext={subtext} />
        <VscRadio value="banana" label="Banana" />
        <VscRadio value="cherry" label="Cherry" />
      </VscRadioGroup>
    );
  },
  args: {
    defaultValue: 'banana',
    subtext: 'Optional description text',
  },
};

/* ── States ──────────────────────────────────────────────────────── */

export const States: Story = {
  render: () => (
    <Row>
      <Inline label="Unselected">
        <VscRadioGroup>
          <VscRadio value="a" label="Option" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Selected">
        <VscRadioGroup value="a">
          <VscRadio value="a" label="Option" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Disabled">
        <VscRadioGroup disabled>
          <VscRadio value="a" label="Option" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Disabled selected">
        <VscRadioGroup value="a" disabled>
          <VscRadio value="a" label="Option" />
        </VscRadioGroup>
      </Inline>
    </Row>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <Row>
      <Inline label="Small">
        <VscRadioGroup defaultValue="a">
          <VscRadio value="a" label="Small" size="small" />
          <VscRadio value="b" label="Option B" size="small" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Medium">
        <VscRadioGroup defaultValue="a">
          <VscRadio value="a" label="Medium" size="medium" />
          <VscRadio value="b" label="Option B" size="medium" />
        </VscRadioGroup>
      </Inline>
      <Inline label="Large">
        <VscRadioGroup defaultValue="a">
          <VscRadio value="a" label="Large" size="large" />
          <VscRadio value="b" label="Option B" size="large" />
        </VscRadioGroup>
      </Inline>
    </Row>
  ),
};

/* ── Horizontal Layout ───────────────────────────────────────────── */

export const Horizontal: Story = {
  render: () => (
    <VscRadioGroup layout="horizontal" defaultValue="b">
      <VscRadio value="a" label="Left" />
      <VscRadio value="b" label="Center" />
      <VscRadio value="c" label="Right" />
    </VscRadioGroup>
  ),
};

/* ── Without Label ───────────────────────────────────────────────── */

export const WithoutLabel: Story = {
  render: () => (
    <Row>
      <VscRadioGroup defaultValue="a">
        <VscRadio value="a" aria-label="Option A" />
        <VscRadio value="b" aria-label="Option B" />
      </VscRadioGroup>
    </Row>
  ),
};

/* ── Subtext ─────────────────────────────────────────────────────── */

export const Subtext: Story = {
  render: () => (
    <>
      <VscRadioGroup defaultValue="large">
        <VscRadio
          value="large"
          label="Large button"
          subtext="This is a large button with subtext"
        />
      </VscRadioGroup>
      <VscRadioGroup defaultValue="medium">
        <VscRadio
          value="medium"
          label="Medium button"
          size="medium"
          subtext="This is a medium button with subtext"
        />
      </VscRadioGroup>
      <VscRadioGroup defaultValue="small">
        <VscRadio
          value="small"
          label="Small button"
          size="small"
          subtext="This is a small button with subtext"
        />
      </VscRadioGroup>
    </>
  ),
};

/* ── Individual Disabled ─────────────────────────────────────────── */

export const IndividualDisabled: Story = {
  render: () => (
    <VscRadioGroup defaultValue="a">
      <VscRadio value="a" label="Available" />
      <VscRadio value="b" label="Disabled option" disabled />
      <VscRadio value="c" label="Also available" />
    </VscRadioGroup>
  ),
};

/* ── Inside VscField ─────────────────────────────────────────────── */

export const InsideVscField: Story = {
  render: () => (
    <VscField
      label="Preferred environment"
      required
      tooltipContent="Environment is required to use this feature."
    >
      <VscRadioGroup defaultValue="dev">
        <VscRadio value="dev" label="Development" />
        <VscRadio value="test" label="Testing" />
        <VscRadio value="prod" label="Production" />
      </VscRadioGroup>
    </VscField>
  ),
};
