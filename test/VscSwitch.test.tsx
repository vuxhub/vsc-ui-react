import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { describe, expect, it, vi } from 'vitest';
import { VscSwitch } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscSwitch', () => {
  it('renders a switch element', () => {
    render(<VscSwitch label="Toggle" />, { wrapper });
    expect(screen.getByRole('switch', { name: 'Toggle' })).toBeTruthy();
  });

  it('forwards ref to underlying input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<VscSwitch ref={ref} label="Ref Test" />, { wrapper });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('merges custom className with generated classes', () => {
    render(<VscSwitch label="Merge" className="custom-class" />, {
      wrapper,
    });
    const switchEl = screen.getByRole('switch', { name: 'Merge' });
    const root = switchEl.closest('.custom-class');
    expect(root).toBeTruthy();
  });

  it('applies distinct classes per size', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    render(
      <>
        <VscSwitch label="small" size="small" />
        <VscSwitch label="medium" size="medium" />
        <VscSwitch label="large" size="large" />
      </>,
      { wrapper },
    );
    const classNames = sizes.map(
      (size) =>
        screen.getByRole('switch', { name: size }).closest('.fui-Switch')!
          .className,
    );
    expect(new Set(classNames).size).toBe(3);
  });

  it('defaults to medium size when size is omitted', () => {
    render(
      <>
        <VscSwitch label="Default" />
        <VscSwitch label="Medium" size="medium" />
      </>,
      { wrapper },
    );
    const defaultSwitch = screen.getByRole('switch', { name: 'Default' });
    const mediumSwitch = screen.getByRole('switch', { name: 'Medium' });
    expect(defaultSwitch.closest('.fui-Switch')!.className).toBe(
      mediumSwitch.closest('.fui-Switch')!.className,
    );
  });

  it('handles disabled state', () => {
    render(<VscSwitch label="Disabled" disabled />, { wrapper });
    expect(screen.getByRole('switch', { name: 'Disabled' })).toBeDisabled();
  });

  it('supports checked and disabled together', () => {
    render(
      <VscSwitch label="Disabled on" checked disabled onChange={() => {}} />,
      { wrapper },
    );
    const switchEl = screen.getByRole('switch', { name: 'Disabled on' });
    expect(switchEl).toBeDisabled();
    expect(switchEl).toBeChecked();
  });

  it('fires onChange when clicked', () => {
    const onChange = vi.fn();
    render(<VscSwitch label="Click" onChange={onChange} />, { wrapper });
    fireEvent.click(screen.getByRole('switch', { name: 'Click' }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports checked state', () => {
    render(<VscSwitch label="Checked" checked onChange={() => {}} />, {
      wrapper,
    });
    expect(screen.getByRole('switch', { name: 'Checked' })).toBeChecked();
  });

  it('supports labelPosition above', () => {
    const { container } = render(
      <VscSwitch label="Above" labelPosition="above" />,
      { wrapper },
    );
    expect(container.firstElementChild).toBeTruthy();
  });
});
