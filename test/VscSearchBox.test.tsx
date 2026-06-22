import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { VscSearchBox } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscSearchBox', () => {
  it('renders a search input', () => {
    const { container } = render(<VscSearchBox />, { wrapper });
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('applies style classes to root', () => {
    const { container } = render(<VscSearchBox />, { wrapper });
    expect(container.querySelector('.fui-Input')).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<VscSearchBox ref={ref} />, { wrapper });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('produces distinct classes for medium size', () => {
    const { container: mediumContainer } = render(
      <VscSearchBox size="medium" />,
      { wrapper },
    );
    const { container: defaultContainer } = render(<VscSearchBox />, {
      wrapper,
    });
    const mediumRoot = mediumContainer.querySelector('.fui-Input')!;
    const defaultRoot = defaultContainer.querySelector('.fui-Input')!;
    expect(mediumRoot.className).not.toBe(defaultRoot.className);
  });

  it('produces distinct classes for large size', () => {
    const { container: largeContainer } = render(
      <VscSearchBox size="large" />,
      { wrapper },
    );
    const { container: defaultContainer } = render(<VscSearchBox />, {
      wrapper,
    });
    const largeRoot = largeContainer.querySelector('.fui-Input')!;
    const defaultRoot = defaultContainer.querySelector('.fui-Input')!;
    expect(largeRoot.className).not.toBe(defaultRoot.className);
  });

  it('renders disabled state', () => {
    const { container } = render(<VscSearchBox disabled />, { wrapper });
    expect(container.querySelector('input')).toBeDisabled();
  });

  it('merges custom className', () => {
    const { container } = render(<VscSearchBox className="custom" />, {
      wrapper,
    });
    expect(container.querySelector('.custom')).toBeTruthy();
  });

  it('produces distinct classes for outline vs transparent appearance', () => {
    const { container: outlineContainer } = render(
      <VscSearchBox appearance="outline" />,
      { wrapper },
    );
    const { container: transparentContainer } = render(
      <VscSearchBox appearance="transparent" />,
      { wrapper },
    );
    const outlineRoot = outlineContainer.querySelector('.fui-Input')!;
    const transparentRoot = transparentContainer.querySelector('.fui-Input')!;
    expect(outlineRoot.className).not.toBe(transparentRoot.className);
  });

  it('defaults to outline appearance', () => {
    const { container: defaultContainer } = render(<VscSearchBox />, {
      wrapper,
    });
    const { container: outlineContainer } = render(
      <VscSearchBox appearance="outline" />,
      { wrapper },
    );
    const defaultRoot = defaultContainer.querySelector('.fui-Input')!;
    const outlineRoot = outlineContainer.querySelector('.fui-Input')!;
    expect(defaultRoot.className).toBe(outlineRoot.className);
  });
});
