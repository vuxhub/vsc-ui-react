import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { describe, expect, it, vi } from 'vitest';
import { VscRadioGroup, VscRadio } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscRadioGroup', () => {
  it('renders a radiogroup role element', () => {
    const { container } = render(
      <VscRadioGroup>
        <VscRadio value="a" label="Render" />
      </VscRadioGroup>,
      { wrapper },
    );
    expect(container.querySelector('[role="radiogroup"]')).toBeTruthy();
  });

  it('renders radio inputs inside the group', () => {
    const { container } = render(
      <VscRadioGroup>
        <VscRadio value="a" label="Input A" />
        <VscRadio value="b" label="Input B" />
      </VscRadioGroup>,
      { wrapper },
    );
    expect(container.querySelectorAll('input[type="radio"]')).toHaveLength(2);
  });

  it('forwards ref on VscRadioGroup', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <VscRadioGroup ref={ref}>
        <VscRadio value="a" label="GroupRef" />
      </VscRadioGroup>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref on VscRadio', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <VscRadioGroup>
        <VscRadio ref={ref} value="a" label="RadioRef" />
      </VscRadioGroup>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('merges custom className on VscRadioGroup', () => {
    const { container } = render(
      <VscRadioGroup className="custom-group">
        <VscRadio value="a" label="MergeGroup" />
      </VscRadioGroup>,
      { wrapper },
    );
    const group = container.querySelector('[role="radiogroup"]')!;
    expect(group.className).toContain('custom-group');
  });

  it('merges custom className on VscRadio', () => {
    const { container } = render(
      <VscRadioGroup>
        <VscRadio value="a" label="MergeRadio" className="custom-radio" />
      </VscRadioGroup>,
      { wrapper },
    );
    const radio = container.querySelector('input[type="radio"]')!;
    const root = radio.closest('.custom-radio');
    expect(root).toBeTruthy();
  });

  it('produces distinct classes for different sizes', () => {
    const { container: smallContainer } = render(
      <VscRadioGroup>
        <VscRadio value="a" label="Small" size="small" />
      </VscRadioGroup>,
      { wrapper },
    );
    const { container: largeContainer } = render(
      <VscRadioGroup>
        <VscRadio value="a" label="Large" size="large" />
      </VscRadioGroup>,
      { wrapper },
    );
    const smallRoot = smallContainer.querySelector('.fui-Radio')!;
    const largeRoot = largeContainer.querySelector('.fui-Radio')!;
    expect(smallRoot.className).not.toBe(largeRoot.className);
  });

  it('handles disabled state on the group', () => {
    // Render enabled group to capture baseline class
    const { container: enabledContainer, unmount } = render(
      <VscRadioGroup>
        <VscRadio value="a" label="EnabledGroup" />
      </VscRadioGroup>,
      { wrapper },
    );
    const enabledClass = enabledContainer.querySelector(
      '[role="radiogroup"]',
    )!.className;
    unmount();

    // Render disabled group and verify distinct class
    const { container: disabledContainer } = render(
      <VscRadioGroup disabled>
        <VscRadio value="a" label="DisabledGroup" />
      </VscRadioGroup>,
      { wrapper },
    );
    const disabledClass = disabledContainer.querySelector(
      '[role="radiogroup"]',
    )!.className;
    expect(disabledClass).not.toBe(enabledClass);
  });

  it('handles disabled state on individual radio', () => {
    render(
      <VscRadioGroup>
        <VscRadio value="a" label="Enabled" />
        <VscRadio value="b" label="Disabled" disabled />
      </VscRadioGroup>,
      { wrapper },
    );
    expect(screen.getByRole('radio', { name: 'Enabled' })).not.toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Disabled' })).toBeDisabled();
  });

  it('fires onChange when a radio is selected', () => {
    const onChange = vi.fn();
    render(
      <VscRadioGroup onChange={onChange}>
        <VscRadio value="a" label="Change A" />
        <VscRadio value="b" label="Change B" />
      </VscRadioGroup>,
      { wrapper },
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Change B' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports controlled value', () => {
    render(
      <VscRadioGroup value="b" onChange={() => {}}>
        <VscRadio value="a" label="Ctrl A" />
        <VscRadio value="b" label="Ctrl B" />
      </VscRadioGroup>,
      { wrapper },
    );
    expect(screen.getByRole('radio', { name: 'Ctrl A' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Ctrl B' })).toBeChecked();
  });

  it('supports defaultValue', () => {
    render(
      <VscRadioGroup defaultValue="a">
        <VscRadio value="a" label="Default A" />
        <VscRadio value="b" label="Default B" />
      </VscRadioGroup>,
      { wrapper },
    );
    expect(screen.getByRole('radio', { name: 'Default A' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Default B' })).not.toBeChecked();
  });
});
