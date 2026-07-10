import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { VscLink } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscLink', () => {
  it('renders an anchor element', () => {
    const { container } = render(<VscLink href="#">Link</VscLink>, { wrapper });
    const anchor = container.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor?.textContent).toContain('Link');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <VscLink ref={ref} href="#">
        Ref
      </VscLink>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('merges custom className', () => {
    const { container } = render(
      <VscLink className="my-link" href="#">
        Custom
      </VscLink>,
      { wrapper },
    );
    expect(container.querySelector('.my-link')).toBeTruthy();
  });

  it('applies different classes for different sizes', () => {
    const { container: c1 } = render(
      <VscLink size="small" href="#">
        S
      </VscLink>,
      { wrapper },
    );
    const { container: c2 } = render(
      <VscLink size="large" href="#">
        L
      </VscLink>,
      { wrapper },
    );
    const cls1 = c1.querySelector('a')?.className;
    const cls2 = c2.querySelector('a')?.className;
    expect(cls1).not.toBe(cls2);
  });

  it('applies a distinct class when underline is set', () => {
    const { container: c1 } = render(<VscLink href="#">Rest</VscLink>, {
      wrapper,
    });
    const { container: c2 } = render(
      <VscLink href="#" underline>
        Underlined
      </VscLink>,
      { wrapper },
    );
    const cls1 = c1.querySelector('a')?.className;
    const cls2 = c2.querySelector('a')?.className;
    expect(cls1).not.toBe(cls2);
  });

  it('renders a trailing icon when icon is provided', () => {
    const { container } = render(
      <VscLink href="#" icon={<svg data-testid="icon" />}>
        Link
      </VscLink>,
      { wrapper },
    );
    expect(container.querySelector('[data-testid="icon"]')).toBeTruthy();
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it('does not render an icon when icon is not provided', () => {
    const { container } = render(<VscLink href="#">Link</VscLink>, { wrapper });
    expect(container.querySelector('[aria-hidden="true"]')).toBeFalsy();
  });

  it('handles disabled state', () => {
    const { container } = render(
      <VscLink href="#" disabled>
        Disabled
      </VscLink>,
      { wrapper },
    );
    const anchor = container.querySelector('a');
    expect(anchor?.getAttribute('aria-disabled')).toBe('true');
  });
});
