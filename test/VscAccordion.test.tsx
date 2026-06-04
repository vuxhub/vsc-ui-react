import React, { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { describe, expect, it, vi } from 'vitest';
import { VscAccordion } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscAccordion', () => {
  it('renders a details element with summary', () => {
    render(<VscAccordion header="Test Header">Content</VscAccordion>, {
      wrapper,
    });
    const details = document.querySelector('details');
    expect(details).toBeTruthy();
    expect(screen.getByText('Test Header')).toBeTruthy();
  });

  it('forwards ref to the details element', () => {
    const ref = createRef<HTMLDetailsElement>();
    render(
      <VscAccordion ref={ref} header="Ref Test">
        Content
      </VscAccordion>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLDetailsElement);
  });

  it('merges custom className', () => {
    const { container } = render(
      <VscAccordion header="Merge" className="custom-class">
        Content
      </VscAccordion>,
      { wrapper },
    );
    const details = container.querySelector('details');
    expect(details?.classList.contains('custom-class')).toBe(true);
  });

  it('renders content when defaultOpen is true', () => {
    const { container } = render(
      <VscAccordion header="Open" defaultOpen>
        Visible content
      </VscAccordion>,
      { wrapper },
    );
    const details = container.querySelector('details');
    expect(details?.getAttribute('open')).not.toBeNull();
    expect(screen.getByText('Visible content')).toBeTruthy();
  });

  it('renders collapsed by default', () => {
    const { container } = render(
      <VscAccordion header="Closed">Hidden</VscAccordion>,
      { wrapper },
    );
    const details = container.querySelector('details');
    expect(details?.hasAttribute('open')).toBe(false);
  });

  it('produces distinct classes for different sizes', () => {
    const { container: smallContainer } = render(
      <VscAccordion header="Small" size="small">
        Content
      </VscAccordion>,
      { wrapper },
    );
    const { container: largeContainer } = render(
      <VscAccordion header="Large" size="extra-large">
        Content
      </VscAccordion>,
      { wrapper },
    );
    const smallSummary = smallContainer.querySelector('summary');
    const largeSummary = largeContainer.querySelector('summary');
    expect(smallSummary?.className).not.toBe(largeSummary?.className);
  });

  it('handles disabled state', () => {
    const { container } = render(
      <VscAccordion header="Disabled" disabled>
        Content
      </VscAccordion>,
      { wrapper },
    );
    const details = container.querySelector('details');
    expect(details?.getAttribute('aria-disabled')).toBe('true');
  });

  it('calls onToggle when toggled', () => {
    const onToggle = vi.fn();
    const { container } = render(
      <VscAccordion header="Toggle" onToggle={onToggle}>
        Content
      </VscAccordion>,
      { wrapper },
    );
    const details = container.querySelector('details')!;
    // Simulate the toggle event that browsers fire on <details>
    fireEvent(details, new Event('toggle'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('renders icon after when iconPosition is after', () => {
    const { container } = render(
      <VscAccordion header="After Icon" iconPosition="after">
        Content
      </VscAccordion>,
      { wrapper },
    );
    const summary = container.querySelector('summary')!;
    const spans = summary.querySelectorAll(':scope > span');
    // With "after", text span comes first, icon span comes second
    expect(spans.length).toBe(2);
    expect(spans[0].textContent).toBe('After Icon');
    expect(spans[1].querySelector('svg')).toBeTruthy();
  });

  it('renders icon before by default', () => {
    const { container } = render(
      <VscAccordion header="Before Icon">Content</VscAccordion>,
      { wrapper },
    );
    const summary = container.querySelector('summary')!;
    const spans = summary.querySelectorAll(':scope > span');
    // With "before", icon span comes first, text span comes second
    expect(spans.length).toBe(2);
    expect(spans[0].querySelector('svg')).toBeTruthy();
    expect(spans[1].textContent).toBe('Before Icon');
  });
});
