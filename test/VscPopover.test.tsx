import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import { VscPopover, VscPopoverTrigger, VscPopoverSurface } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

function renderPopover(
  props: React.ComponentProps<typeof VscPopoverSurface> = {},
) {
  return render(
    <VscPopover open>
      <VscPopoverTrigger>
        <button>Open popover</button>
      </VscPopoverTrigger>
      <VscPopoverSurface {...props}>
        <div>Popover content</div>
      </VscPopoverSurface>
    </VscPopover>,
    { wrapper },
  );
}

describe('VscPopoverSurface', () => {
  it('renders the surface content when open', () => {
    renderPopover();
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('renders the fluent surface element', () => {
    const { baseElement } = renderPopover();
    expect(baseElement.querySelector('.fui-PopoverSurface')).toBeTruthy();
  });

  it('forwards ref to the surface element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <VscPopover open>
        <VscPopoverTrigger>
          <button>Open</button>
        </VscPopoverTrigger>
        <VscPopoverSurface ref={ref}>
          <div>Body</div>
        </VscPopoverSurface>
      </VscPopover>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('merges a custom className', () => {
    const { baseElement } = renderPopover({ className: 'custom-class' });
    expect(baseElement.querySelector('.custom-class')).toBeTruthy();
  });

  it('produces distinct class names for default and brand appearances', () => {
    render(
      <VscPopover open>
        <VscPopoverTrigger>
          <button>Open</button>
        </VscPopoverTrigger>
        <VscPopoverSurface appearance="default">
          <div>Default surface</div>
        </VscPopoverSurface>
      </VscPopover>,
      { wrapper },
    );
    render(
      <VscPopover open>
        <VscPopoverTrigger>
          <button>Open</button>
        </VscPopoverTrigger>
        <VscPopoverSurface appearance="brand">
          <div>Brand surface</div>
        </VscPopoverSurface>
      </VscPopover>,
      { wrapper },
    );

    const defaultClass =
      screen
        .getByText('Default surface')
        .closest('.fui-PopoverSurface')
        ?.getAttribute('class') ?? '';
    const brandClass =
      screen
        .getByText('Brand surface')
        .closest('.fui-PopoverSurface')
        ?.getAttribute('class') ?? '';

    expect(defaultClass).not.toBe('');
    expect(brandClass).not.toBe('');
    expect(defaultClass).not.toBe(brandClass);
  });
});
