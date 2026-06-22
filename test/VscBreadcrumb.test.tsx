import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import {
  VscBreadcrumb,
  VscBreadcrumbItem,
  VscBreadcrumbButton,
  VscBreadcrumbDivider,
} from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscBreadcrumb', () => {
  it('renders a nav element', () => {
    const { container } = render(
      <VscBreadcrumb>
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>Home</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    expect(container.querySelector('nav')).toBeTruthy();
  });

  it('forwards ref on Breadcrumb', () => {
    const ref = createRef<HTMLElement>();
    render(
      <VscBreadcrumb ref={ref}>
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>Home</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('merges custom className on Breadcrumb', () => {
    const { container } = render(
      <VscBreadcrumb className="my-breadcrumb">
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>Home</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    expect(container.querySelector('.my-breadcrumb')).toBeTruthy();
  });

  it('renders breadcrumb items', () => {
    render(
      <VscBreadcrumb>
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>Home</VscBreadcrumbButton>
        </VscBreadcrumbItem>
        <VscBreadcrumbDivider />
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>Page</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Page').length).toBeGreaterThan(0);
  });

  it('forwards ref on BreadcrumbButton', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <VscBreadcrumb>
        <VscBreadcrumbItem>
          <VscBreadcrumbButton ref={ref}>Home</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('merges custom className on BreadcrumbButton', () => {
    const { container } = render(
      <VscBreadcrumb>
        <VscBreadcrumbItem>
          <VscBreadcrumbButton className="my-btn">Home</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    expect(container.querySelector('.my-btn')).toBeTruthy();
  });

  it('applies current state styling class', () => {
    render(
      <VscBreadcrumb>
        <VscBreadcrumbItem>
          <VscBreadcrumbButton current>Current</VscBreadcrumbButton>
        </VscBreadcrumbItem>
        <VscBreadcrumbDivider />
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>Other</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    const currentButton = screen.getByText('Current').closest('button');
    const otherButton = screen.getByText('Other').closest('button');
    expect(currentButton?.className).not.toBe(otherButton?.className);
  });

  it('applies different classes for small vs medium size', () => {
    const { container: small } = render(
      <VscBreadcrumb size="small">
        <VscBreadcrumbItem>
          <VscBreadcrumbButton size="small">S</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    const { container: medium } = render(
      <VscBreadcrumb size="medium">
        <VscBreadcrumbItem>
          <VscBreadcrumbButton size="medium">M</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    const smallBtn = small.querySelector('button');
    const mediumBtn = medium.querySelector('button');
    expect(smallBtn?.className).not.toBe(mediumBtn?.className);
  });

  it('renders BreadcrumbDivider', () => {
    const { container } = render(
      <VscBreadcrumb>
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>A</VscBreadcrumbButton>
        </VscBreadcrumbItem>
        <VscBreadcrumbDivider />
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>B</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    // Fluent BreadcrumbDivider renders an li element
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBeGreaterThanOrEqual(3);
  });

  it('merges custom className on BreadcrumbDivider', () => {
    const { container } = render(
      <VscBreadcrumb>
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>A</VscBreadcrumbButton>
        </VscBreadcrumbItem>
        <VscBreadcrumbDivider className="my-divider" />
        <VscBreadcrumbItem>
          <VscBreadcrumbButton>B</VscBreadcrumbButton>
        </VscBreadcrumbItem>
      </VscBreadcrumb>,
      { wrapper },
    );
    expect(container.querySelector('.my-divider')).toBeTruthy();
  });
});
