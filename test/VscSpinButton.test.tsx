import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import { VscSpinButton } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscSpinButton', () => {
  it('renders an input element', () => {
    const { container } = render(<VscSpinButton defaultValue={0} />, {
      wrapper,
    });
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('applies the SpinButton root class', () => {
    const { container } = render(<VscSpinButton defaultValue={0} />, {
      wrapper,
    });
    expect(container.querySelector('.fui-SpinButton')).toBeTruthy();
  });

  it('renders increment and decrement buttons', () => {
    const { container } = render(<VscSpinButton defaultValue={0} />, {
      wrapper,
    });
    expect(
      container.querySelector('.fui-SpinButton__incrementButton'),
    ).toBeTruthy();
    expect(
      container.querySelector('.fui-SpinButton__decrementButton'),
    ).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<VscSpinButton ref={ref} defaultValue={0} />, { wrapper });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('merges a custom className onto the root', () => {
    const { container } = render(
      <VscSpinButton defaultValue={0} className="custom-class" />,
      { wrapper },
    );
    expect(
      container.querySelector('.fui-SpinButton.custom-class'),
    ).toBeTruthy();
  });

  it('produces distinct classes for small size', () => {
    const { container: smallContainer } = render(
      <VscSpinButton size="small" defaultValue={0} />,
      { wrapper },
    );
    const { container: defaultContainer } = render(
      <VscSpinButton defaultValue={0} />,
      { wrapper },
    );
    const smallRoot = smallContainer.querySelector('.fui-SpinButton')!;
    const defaultRoot = defaultContainer.querySelector('.fui-SpinButton')!;
    expect(smallRoot.className).not.toBe(defaultRoot.className);
  });

  it('produces distinct classes for large size', () => {
    const { container: largeContainer } = render(
      <VscSpinButton size="large" defaultValue={0} />,
      { wrapper },
    );
    const { container: defaultContainer } = render(
      <VscSpinButton defaultValue={0} />,
      { wrapper },
    );
    const largeRoot = largeContainer.querySelector('.fui-SpinButton')!;
    const defaultRoot = defaultContainer.querySelector('.fui-SpinButton')!;
    expect(largeRoot.className).not.toBe(defaultRoot.className);
  });

  it('produces distinct classes for validation states', () => {
    const { container: errorContainer } = render(
      <VscSpinButton validationState="error" defaultValue={0} />,
      { wrapper },
    );
    const { container: defaultContainer } = render(
      <VscSpinButton defaultValue={0} />,
      { wrapper },
    );
    const errorRoot = errorContainer.querySelector('.fui-SpinButton')!;
    const defaultRoot = defaultContainer.querySelector('.fui-SpinButton')!;
    expect(errorRoot.className).not.toBe(defaultRoot.className);
  });

  it('handles the disabled state', () => {
    const { container } = render(<VscSpinButton defaultValue={0} disabled />, {
      wrapper,
    });
    expect(container.querySelector('input')).toBeDisabled();
  });

  it('applies read-only styling without disabling the input', () => {
    const { container } = render(<VscSpinButton defaultValue={0} readOnly />, {
      wrapper,
    });
    const input = container.querySelector('input')!;
    expect(input).not.toBeDisabled();
  });
});
