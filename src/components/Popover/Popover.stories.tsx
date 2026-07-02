import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DismissRegular } from '@fluentui/react-icons';
import { useRestoreFocusTarget } from '@fluentui/react-components';

import {
  VscPopover,
  VscPopoverTrigger,
  VscPopoverSurface,
  type VscPopoverAppearance,
} from '.';
import { VscButton } from '../Button';
import { VscInput } from '../Input';
import { Section, Row } from '../../stories/helpers/helpers';

const meta = {
  title: 'Components/Popover',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A VS Code–styled popover built on top of Fluent UI. Composed from `VscPopover`, `VscPopoverTrigger`, and `VscPopoverSurface`. The surface supports two appearances: `default` (neutral hover-widget background) and `brand` (VS Code accent background). Both include an ambient + key drop shadow to match VS Code widget elevation, and respond to the light/dark theme toggle.',
      },
    },
  },
} satisfies Meta<typeof VscPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Example content ─────────────────────────────────────────────── */

function ExamplePopover({ appearance }: { appearance: VscPopoverAppearance }) {
  const onBrand = appearance === 'brand';
  const mutedColor = onBrand
    ? 'var(--vscode-button-foreground)'
    : 'var(--vscode-descriptionForeground)';

  return (
    <VscPopover withArrow>
      <VscPopoverTrigger>
        <VscButton appearance={onBrand ? 'primary' : undefined}>
          Open popover
        </VscButton>
      </VscPopoverTrigger>
      <VscPopoverSurface appearance={appearance}>
        <div style={{ width: 280 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <strong style={{ fontSize: 13 }}>Your apps</strong>
            <button
              type="button"
              aria-label="Close"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                padding: 0,
                border: 'none',
                borderRadius: 4,
                background: 'transparent',
                color: 'inherit',
                cursor: 'pointer',
                lineHeight: 0,
              }}
            >
              <DismissRegular />
            </button>
          </div>
          <div
            style={{
              height: 96,
              borderRadius: 4,
              marginBottom: 8,
              background: onBrand
                ? 'rgba(0, 0, 0, 0.2)'
                : 'var(--vscode-editorWidget-background)',
            }}
          />
          <p style={{ margin: '0 0 12px', fontSize: 12, color: mutedColor }}>
            Expand the App Launcher to see all of your Microsoft 365 apps.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 12, color: mutedColor }}>1 of 6</span>
            <VscButton appearance={onBrand ? undefined : 'primary'}>
              Next
            </VscButton>
          </div>
        </div>
      </VscPopoverSurface>
    </VscPopover>
  );
}

/* ── Default ─────────────────────────────────────────────────────── */

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The basic popover: a trigger button that reveals a floating surface with contextual content anchored to it.',
      },
    },
  },
  render: () => (
    <VscPopover>
      <VscPopoverTrigger>
        <VscButton>Open popover</VscButton>
      </VscPopoverTrigger>
      <VscPopoverSurface>
        <div style={{ maxWidth: 260 }}>
          <strong style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
            Popover title
          </strong>
          <p style={{ margin: 0, fontSize: 12 }}>
            This is a VS Code–styled popover. Use it to reveal contextual
            content anchored to a trigger.
          </p>
        </div>
      </VscPopoverSurface>
    </VscPopover>
  ),
};

/* ── Appearances ─────────────────────────────────────────────────── */

export const Appearances: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of the `default` (neutral hover-widget) and `brand` (VS Code accent) surface appearances. Toggle the theme toolbar to preview the light and dark variants.',
      },
    },
  },
  render: () => (
    <Section
      title="Appearances"
      description="The surface supports default (neutral) and brand (accent) styles. Toggle the theme toolbar to preview light and dark variants."
    >
      <Row>
        <ExamplePopover appearance="default" />
        <ExamplePopover appearance="brand" />
      </Row>
    </Section>
  ),
};

/* ── With arrow ──────────────────────────────────────────────────── */

export const WithArrow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The `withArrow` prop renders a small arrow (beak) on the surface that points back to the trigger element.',
      },
    },
  },
  render: () => (
    <VscPopover withArrow>
      <VscPopoverTrigger>
        <VscButton>Open popover</VscButton>
      </VscPopoverTrigger>
      <VscPopoverSurface>
        <div style={{ maxWidth: 240 }}>
          <p style={{ margin: 0, fontSize: 12 }}>
            An arrow points back to the trigger element.
          </p>
        </div>
      </VscPopoverSurface>
    </VscPopover>
  ),
};

/* ── With arrow – autosize ───────────────────────────────────────── */

export const WithArrowAutosize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When using the arrow with the `autoSize` positioning feature, move the overflow from the surface to an inner element so the arrow is not clipped.',
      },
    },
  },
  render: () => (
    <VscPopover withArrow positioning={{ autoSize: true }}>
      <VscPopoverTrigger>
        <VscButton>Open popover</VscButton>
      </VscPopoverTrigger>
      <VscPopoverSurface>
        {/* Overflow lives on the inner element, not the surface. */}
        <div style={{ maxHeight: 200, overflowY: 'auto', maxWidth: 260 }}>
          <strong style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
            Tall content
          </strong>
          {Array.from({ length: 12 }).map((_, i) => (
            <p key={i} style={{ margin: '0 0 8px', fontSize: 12 }}>
              Line {i + 1} — the surface scrolls internally while the arrow
              stays anchored to the trigger.
            </p>
          ))}
        </div>
      </VscPopoverSurface>
    </VscPopover>
  ),
};

/* ── Trapping focus ──────────────────────────────────────────────── */

export const TrappingFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When a popover contains focusable elements, use `trapFocus` to apply the modal dialog pattern. Elements outside the trap are hidden from screen readers until the popover closes.',
      },
    },
  },
  render: () => (
    <VscPopover trapFocus>
      <VscPopoverTrigger>
        <VscButton>Open popover</VscButton>
      </VscPopoverTrigger>
      <VscPopoverSurface>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            width: 240,
          }}
        >
          <strong style={{ fontSize: 13 }}>Rename item</strong>
          <VscInput placeholder="New name" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <VscButton>Cancel</VscButton>
            <VscButton appearance="primary">Save</VscButton>
          </div>
        </div>
      </VscPopoverSurface>
    </VscPopover>
  ),
};

/* ── Controlling open and close ──────────────────────────────────── */

function ControlledPopover() {
  const [open, setOpen] = React.useState(false);

  return (
    <VscPopover open={open} onOpenChange={(_, data) => setOpen(data.open)}>
      <VscPopoverTrigger>
        <VscButton>{open ? 'Close' : 'Open'} popover</VscButton>
      </VscPopoverTrigger>
      <VscPopoverSurface>
        <div style={{ maxWidth: 240 }}>
          <p style={{ margin: '0 0 8px', fontSize: 12 }}>
            The open state is controlled with your own React state via
            <code> open</code> and <code> onOpenChange</code>.
          </p>
          <VscButton onClick={() => setOpen(false)}>Dismiss</VscButton>
        </div>
      </VscPopoverSurface>
    </VscPopover>
  );
}

export const ControllingOpenAndClose: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Drive the popover from your own React state using `open` and `onOpenChange`. Useful when the open state must be coordinated with other UI.',
      },
    },
  },
  render: () => <ControlledPopover />,
};

/* ── Motion disabled ─────────────────────────────────────────────── */

export const MotionDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'To disable the popover transition animation, set the `surfaceMotion` prop to `null`.',
      },
    },
  },
  render: () => (
    <VscPopover surfaceMotion={null}>
      <VscPopoverTrigger>
        <VscButton>Open popover</VscButton>
      </VscPopoverTrigger>
      <VscPopoverSurface>
        <div style={{ maxWidth: 240 }}>
          <p style={{ margin: 0, fontSize: 12 }}>
            This popover opens and closes without a transition animation.
          </p>
        </div>
      </VscPopoverSurface>
    </VscPopover>
  ),
};

/* ── Nested popovers ─────────────────────────────────────────────── */

export const NestedPopovers: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Popovers can be nested. Combine nesting with `trapFocus` for correct keyboard and screen-reader behaviour, and limit nesting to two levels.',
      },
    },
  },
  render: () => (
    <VscPopover trapFocus>
      <VscPopoverTrigger>
        <VscButton>Root trigger</VscButton>
      </VscPopoverTrigger>
      <VscPopoverSurface>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            maxWidth: 240,
          }}
        >
          <strong style={{ fontSize: 13 }}>Root popover</strong>
          <p style={{ margin: 0, fontSize: 12 }}>
            Open a nested popover from within this one.
          </p>
          <VscPopover trapFocus>
            <VscPopoverTrigger>
              <VscButton>Nested trigger</VscButton>
            </VscPopoverTrigger>
            <VscPopoverSurface appearance="brand">
              <div style={{ maxWidth: 220 }}>
                <p style={{ margin: 0, fontSize: 12 }}>
                  Nested popover content.
                </p>
              </div>
            </VscPopoverSurface>
          </VscPopover>
        </div>
      </VscPopoverSurface>
    </VscPopover>
  ),
};

/* ── Anchor to custom target ─────────────────────────────────────── */

function CustomTargetPopover() {
  const [target, setTarget] = React.useState<HTMLDivElement | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <VscPopover positioning={{ target }}>
        <VscPopoverTrigger>
          <VscButton>Popover trigger</VscButton>
        </VscPopoverTrigger>
        <VscPopoverSurface>
          <div style={{ maxWidth: 240 }}>
            <p style={{ margin: 0, fontSize: 12 }}>
              This popover is anchored to the custom target below rather than to
              its trigger.
            </p>
          </div>
        </VscPopoverSurface>
      </VscPopover>

      <div
        ref={setTarget}
        style={{
          alignSelf: 'flex-start',
          padding: '8px 12px',
          border: '1px dashed var(--vscode-widget-border)',
          borderRadius: 4,
          fontSize: 12,
          color: 'var(--vscode-descriptionForeground)',
        }}
      >
        Custom target
      </div>
    </div>
  );
}

export const AnchorToCustomTarget: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Anchor the surface to any DOM element via `positioning={{ target }}` instead of the trigger. Handy when a single popover instance is reused across different anchors.',
      },
    },
  },
  render: () => <CustomTargetPopover />,
};

/* ── Custom trigger ──────────────────────────────────────────────── */

const CustomTriggerButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button
    ref={ref}
    type="button"
    {...props}
    style={{
      padding: '4px 12px',
      border: '1px solid var(--vscode-button-border)',
      borderRadius: 2,
      background: 'var(--vscode-button-secondaryBackground)',
      color: 'var(--vscode-button-secondaryForeground)',
      fontFamily: 'inherit',
      fontSize: 13,
      cursor: 'pointer',
    }}
  >
    Custom trigger
  </button>
));
CustomTriggerButton.displayName = 'CustomTriggerButton';

export const CustomTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A custom React component can be used as the child of `VscPopoverTrigger` as long as it forwards its ref with `React.forwardRef`.',
      },
    },
  },
  render: () => (
    <VscPopover>
      <VscPopoverTrigger>
        <CustomTriggerButton />
      </VscPopoverTrigger>
      <VscPopoverSurface>
        <div style={{ maxWidth: 240 }}>
          <p style={{ margin: 0, fontSize: 12 }}>
            Opened from a custom trigger component.
          </p>
        </div>
      </VscPopoverSurface>
    </VscPopover>
  ),
};

/* ── Without trigger ─────────────────────────────────────────────── */

function TriggerlessPopover() {
  const [open, setOpen] = React.useState(false);
  const [target, setTarget] = React.useState<HTMLButtonElement | null>(null);
  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  return (
    <>
      <VscButton
        {...restoreFocusTargetAttributes}
        ref={setTarget}
        onClick={() => setOpen((prev) => !prev)}
      >
        Toggle popover
      </VscButton>
      <VscPopover
        open={open}
        onOpenChange={(_, data) => setOpen(data.open)}
        positioning={{ target }}
      >
        <VscPopoverSurface>
          <div style={{ maxWidth: 240 }}>
            <p style={{ margin: 0, fontSize: 12 }}>
              This popover has no <code>VscPopoverTrigger</code>. Focus is
              restored to the toggle button on close via
              <code> useRestoreFocusTarget</code>.
            </p>
          </div>
        </VscPopoverSurface>
      </VscPopover>
    </>
  );
}

export const WithoutTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the popover without a `VscPopoverTrigger`, toggling it from any element. Pair with `useRestoreFocusTarget` so focus returns to the toggle button on close.',
      },
    },
  },
  render: () => <TriggerlessPopover />,
};

/* ── Internal update content ─────────────────────────────────────── */

function UpdatingPopover() {
  const [count, setCount] = React.useState(0);

  return (
    <VscPopover>
      <VscPopoverTrigger>
        <VscButton>Popover trigger</VscButton>
      </VscPopoverTrigger>
      <VscPopoverSurface>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            maxWidth: 240,
          }}
        >
          <span style={{ fontSize: 12 }}>Count: {count}</span>
          <VscButton onClick={() => setCount((prev) => prev + 1)}>
            Increment
          </VscButton>
        </div>
      </VscPopoverSurface>
    </VscPopover>
  );
}

export const InternalUpdateContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The surface content can update from internal state while the popover stays open; it repositions automatically as its size changes.',
      },
    },
  },
  render: () => <UpdatingPopover />,
};
