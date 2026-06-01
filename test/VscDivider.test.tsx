import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VscDivider } from '../src';

describe('VscDivider', () => {
  it('renders a separator element', () => {
    const { container } = render(<VscDivider />);
    expect(container.querySelector('[role="separator"]')).toBeInTheDocument();
  });

  it('renders children text', () => {
    const { getByText } = render(<VscDivider>Section Title</VscDivider>);
    expect(getByText('Section Title')).toBeInTheDocument();
  });

  it('forwards ref to underlying div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<VscDivider ref={ref}>Ref Test</VscDivider>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className', () => {
    const { container } = render(
      <VscDivider className="custom-class">Text</VscDivider>,
    );
    const el = container.querySelector('[role="separator"]')!;
    expect(el.className).toContain('custom-class');
  });

  it('sets aria-orientation to horizontal by default', () => {
    const { container } = render(<VscDivider />);
    const el = container.querySelector('[role="separator"]')!;
    expect(el).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('sets aria-orientation to vertical when specified', () => {
    const { container } = render(<VscDivider orientation="vertical" />);
    const el = container.querySelector('[role="separator"]')!;
    expect(el).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('produces distinct class names for different sizes', () => {
    const { container: smallContainer } = render(
      <VscDivider size="small">S</VscDivider>,
    );
    const { container: largeContainer } = render(
      <VscDivider size="large">L</VscDivider>,
    );

    const smallEl = smallContainer.querySelector('[role="separator"]')!;
    const largeEl = largeContainer.querySelector('[role="separator"]')!;
    expect(smallEl.className).not.toBe(largeEl.className);
  });

  it('produces distinct class names for different orientations', () => {
    const { container: hContainer } = render(
      <VscDivider orientation="horizontal" />,
    );
    const { container: vContainer } = render(
      <VscDivider orientation="vertical" />,
    );

    const hEl = hContainer.querySelector('[role="separator"]')!;
    const vEl = vContainer.querySelector('[role="separator"]')!;
    expect(hEl.className).not.toBe(vEl.className);
  });

  it('does not render text wrapper when no children provided', () => {
    const { container } = render(<VscDivider />);
    const el = container.querySelector('[role="separator"]')!;
    expect(el.querySelector('span')).toBeNull();
  });
});
