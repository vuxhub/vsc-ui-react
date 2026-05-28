import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { describe, expect, it, vi } from 'vitest';
import { VscCheckbox } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscCheckbox', () => {
  it('renders a checkbox element', () => {
    render(<VscCheckbox label="Accept" />, { wrapper });
    expect(screen.getByRole('checkbox', { name: 'Accept' })).toBeTruthy();
  });

  it('forwards ref to underlying input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<VscCheckbox ref={ref} label="Ref Test" />, { wrapper });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('merges custom className with generated classes', () => {
    render(<VscCheckbox label="Merge" className="custom-class" />, {
      wrapper,
    });
    const checkbox = screen.getByRole('checkbox', { name: 'Merge' });
    const root = checkbox.closest('.custom-class');
    expect(root).toBeTruthy();
  });

  it('produces distinct classes for large vs default size', () => {
    const { container: largeContainer } = render(
      <VscCheckbox label="Large" size="large" />,
      { wrapper },
    );
    const { container: defaultContainer } = render(
      <VscCheckbox label="Default" />,
      { wrapper },
    );
    const largeRoot = largeContainer.firstElementChild!;
    const defaultRoot = defaultContainer.firstElementChild!;
    expect(largeRoot.className).not.toBe(defaultRoot.className);
  });

  it('handles disabled state', () => {
    render(<VscCheckbox label="Disabled" disabled />, { wrapper });
    expect(screen.getByRole('checkbox', { name: 'Disabled' })).toBeDisabled();
  });

  it('fires onChange when clicked', () => {
    const onChange = vi.fn();
    render(<VscCheckbox label="Click" onChange={onChange} />, { wrapper });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Click' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders the checked indicator icon after click', () => {
    const { container } = render(<VscCheckbox label="Icon" />, { wrapper });

    expect(container.querySelector('.fui-Checkbox__indicator svg')).toBeNull();
    fireEvent.click(screen.getByRole('checkbox', { name: 'Icon' }));
    expect(
      container.querySelector('.fui-Checkbox__indicator svg'),
    ).toBeTruthy();
  });

  it('supports checked state', () => {
    const { container } = render(<VscCheckbox label="Checked" checked />, {
      wrapper,
    });
    expect(screen.getByRole('checkbox', { name: 'Checked' })).toBeChecked();
    expect(
      container.querySelector('.fui-Checkbox__indicator svg'),
    ).toBeTruthy();
  });

  it('supports mixed (indeterminate) state', () => {
    const { container } = render(
      <VscCheckbox label="Mixed" checked="mixed" />,
      {
        wrapper,
      },
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Mixed' });
    expect(checkbox).toHaveProperty('indeterminate', true);
    expect(
      container.querySelector('.fui-Checkbox__indicator svg'),
    ).toBeTruthy();
  });
});
