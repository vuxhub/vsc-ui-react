import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoreHorizontalRegular } from '@fluentui/react-icons';
import {
  VscBreadcrumb,
  VscBreadcrumbItem,
  VscBreadcrumbButton,
  VscBreadcrumbDivider,
} from '.';
import { Row, Section } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Breadcrumb',
  component: VscBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A breadcrumb navigation component with VS Code styling. Supports small (22px) and medium (28px) sizes, with current/non-current item states.',
      },
    },
  },
} satisfies Meta<typeof VscBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <VscBreadcrumb>
      <VscBreadcrumbItem>
        <VscBreadcrumbButton>Text</VscBreadcrumbButton>
      </VscBreadcrumbItem>
      <VscBreadcrumbDivider />
      <VscBreadcrumbItem>
        <VscBreadcrumbButton>Text</VscBreadcrumbButton>
      </VscBreadcrumbItem>
      <VscBreadcrumbDivider />
      <VscBreadcrumbItem>
        <VscBreadcrumbButton>Text</VscBreadcrumbButton>
      </VscBreadcrumbItem>
      <VscBreadcrumbDivider />
      <VscBreadcrumbItem>
        <VscBreadcrumbButton current>Text</VscBreadcrumbButton>
      </VscBreadcrumbItem>
    </VscBreadcrumb>
  ),
};

/* ── Sizes ───────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <>
      <Section title="Small (22px)">
        <VscBreadcrumb size="small">
          <VscBreadcrumbItem>
            <VscBreadcrumbButton size="small">Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
          <VscBreadcrumbDivider size="small" />
          <VscBreadcrumbItem>
            <VscBreadcrumbButton size="small">Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
          <VscBreadcrumbDivider size="small" />
          <VscBreadcrumbItem>
            <VscBreadcrumbButton size="small" current>
              Text
            </VscBreadcrumbButton>
          </VscBreadcrumbItem>
        </VscBreadcrumb>
      </Section>

      <Section title="Medium (28px)">
        <VscBreadcrumb size="medium">
          <VscBreadcrumbItem>
            <VscBreadcrumbButton size="medium">Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
          <VscBreadcrumbDivider size="medium" />
          <VscBreadcrumbItem>
            <VscBreadcrumbButton size="medium">Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
          <VscBreadcrumbDivider size="medium" />
          <VscBreadcrumbItem>
            <VscBreadcrumbButton size="medium" current>
              Text
            </VscBreadcrumbButton>
          </VscBreadcrumbItem>
        </VscBreadcrumb>
      </Section>
    </>
  ),
};

/* ── With Overflow ───────────────────────────────────────────────── */

export const WithOverflow: Story = {
  render: () => (
    <Row>
      <VscBreadcrumb>
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>Text</VscBreadcrumbButton>
        </VscBreadcrumbItem>
        <VscBreadcrumbDivider />
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>Text</VscBreadcrumbButton>
        </VscBreadcrumbItem>
        <VscBreadcrumbDivider />
        <VscBreadcrumbItem>
          <VscBreadcrumbButton icon={<MoreHorizontalRegular />} />
        </VscBreadcrumbItem>
        <VscBreadcrumbDivider />
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>Text</VscBreadcrumbButton>
        </VscBreadcrumbItem>
        <VscBreadcrumbDivider />
        <VscBreadcrumbItem>
          <VscBreadcrumbButton current>Text</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>
    </Row>
  ),
};

/* ── Current States ──────────────────────────────────────────────── */

export const CurrentStates: Story = {
  render: () => (
    <>
      <Section title="Non-current items (muted)">
        <VscBreadcrumb>
          <VscBreadcrumbItem>
            <VscBreadcrumbButton>Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
          <VscBreadcrumbDivider />
          <VscBreadcrumbItem>
            <VscBreadcrumbButton>Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
          <VscBreadcrumbDivider />
          <VscBreadcrumbItem>
            <VscBreadcrumbButton>Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
        </VscBreadcrumb>
      </Section>

      <Section title="With current (last item bold white)">
        <VscBreadcrumb>
          <VscBreadcrumbItem>
            <VscBreadcrumbButton>Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
          <VscBreadcrumbDivider />
          <VscBreadcrumbItem>
            <VscBreadcrumbButton>Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
          <VscBreadcrumbDivider />
          <VscBreadcrumbItem>
            <VscBreadcrumbButton current>Text</VscBreadcrumbButton>
          </VscBreadcrumbItem>
        </VscBreadcrumb>
      </Section>
    </>
  ),
};
