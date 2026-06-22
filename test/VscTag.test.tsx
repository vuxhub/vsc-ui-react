import React, { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CircleRegular } from '@fluentui/react-icons';
import { VscTag } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscTag', () => {
  it('renders primary text', () => {
    const { getByText } = render(<VscTag>Tag label</VscTag>, { wrapper });
    expect(getByText('Tag label')).toBeTruthy();
  });

  it('forwards ref to underlying span element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <VscTag ref={ref} icon={<CircleRegular />}>
        Ref Test
      </VscTag>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('merges custom className with generated classes', () => {
    const { container } = render(
      <VscTag className="custom-class" icon={<CircleRegular />}>
        Merge
      </VscTag>,
      { wrapper },
    );
    const tag = container.querySelector('.custom-class');
    expect(tag).toBeTruthy();
  });

  it('produces distinct classes for different appearances', () => {
    const { container: defaultContainer } = render(
      <VscTag appearance="default">Default</VscTag>,
      { wrapper },
    );
    const { container: outlineContainer } = render(
      <VscTag appearance="outline">Outline</VscTag>,
      { wrapper },
    );
    const { container: brandContainer } = render(
      <VscTag appearance="brand">Brand</VscTag>,
      { wrapper },
    );
    const defaultEl = defaultContainer.firstElementChild!;
    const outlineEl = outlineContainer.firstElementChild!;
    const brandEl = brandContainer.firstElementChild!;
    expect(defaultEl.className).not.toBe(outlineEl.className);
    expect(defaultEl.className).not.toBe(brandEl.className);
  });

  it('produces distinct classes for different sizes', () => {
    const { container: smContainer } = render(
      <VscTag size="small">Small</VscTag>,
      { wrapper },
    );
    const { container: mdContainer } = render(
      <VscTag size="medium">Medium</VscTag>,
      { wrapper },
    );
    const { container: lgContainer } = render(
      <VscTag size="large">Large</VscTag>,
      { wrapper },
    );
    const sm = smContainer.firstElementChild!;
    const md = mdContainer.firstElementChild!;
    const lg = lgContainer.firstElementChild!;
    expect(sm.className).not.toBe(md.className);
    expect(md.className).not.toBe(lg.className);
  });

  it('handles disabled state', () => {
    const { container } = render(<VscTag disabled>Disabled</VscTag>, {
      wrapper,
    });
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button!.disabled).toBe(true);
  });

  it('renders dismiss button by default', () => {
    const { container } = render(<VscTag>Dismissible</VscTag>, { wrapper });
    const button = container.querySelector('button[aria-label="Dismiss"]');
    expect(button).toBeTruthy();
  });

  it('hides dismiss button when dismissible is false', () => {
    const { container } = render(
      <VscTag dismissible={false}>Not Dismissible</VscTag>,
      { wrapper },
    );
    const button = container.querySelector('button[aria-label="Dismiss"]');
    expect(button).toBeNull();
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    const { container } = render(
      <VscTag onDismiss={onDismiss}>Click Me</VscTag>,
      { wrapper },
    );
    const button = container.querySelector('button[aria-label="Dismiss"]')!;
    fireEvent.click(button);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders secondary text when provided', () => {
    const { getByText } = render(
      <VscTag secondaryText="Secondary">Primary</VscTag>,
      { wrapper },
    );
    expect(getByText('Secondary')).toBeTruthy();
  });

  it('renders icon when provided', () => {
    const { container } = render(
      <VscTag icon={<CircleRegular data-testid="icon" />}>With Icon</VscTag>,
      { wrapper },
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});
