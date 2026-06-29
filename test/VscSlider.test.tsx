import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { describe, expect, it } from 'vitest';
import { VscSlider } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscSlider', () => {
  it('renders a slider element', () => {
    render(<VscSlider aria-label="Volume" defaultValue={50} />, { wrapper });
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeTruthy();
  });

  it('forwards ref to underlying input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<VscSlider ref={ref} aria-label="Ref Test" />, { wrapper });
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('merges custom className with generated classes', () => {
    render(<VscSlider aria-label="Merge" className="custom-class" />, {
      wrapper,
    });
    const slider = screen.getByRole('slider', { name: 'Merge' });
    const root = slider.closest('.custom-class');
    expect(root).toBeTruthy();
  });

  it('applies distinct classes per size', () => {
    render(
      <>
        <VscSlider aria-label="small" size="small" />
        <VscSlider aria-label="medium" size="medium" />
      </>,
      { wrapper },
    );
    const small = screen
      .getByRole('slider', { name: 'small' })
      .closest('.fui-Slider')!.className;
    const medium = screen
      .getByRole('slider', { name: 'medium' })
      .closest('.fui-Slider')!.className;
    expect(small).not.toBe(medium);
  });

  it('applies a disabled class when disabled', () => {
    render(
      <>
        <VscSlider aria-label="enabled" />
        <VscSlider aria-label="disabled" disabled />
      </>,
      { wrapper },
    );
    const enabled = screen
      .getByRole('slider', { name: 'enabled' })
      .closest('.fui-Slider')!.className;
    const disabled = screen
      .getByRole('slider', { name: 'disabled' })
      .closest('.fui-Slider')!.className;
    expect(enabled).not.toBe(disabled);
  });
});
