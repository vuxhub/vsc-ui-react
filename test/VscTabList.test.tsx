import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { VscTabList, VscTab } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscTabList', () => {
  it('renders tabs', () => {
    render(
      <VscTabList>
        <VscTab value="one">Tab One</VscTab>
        <VscTab value="two">Tab Two</VscTab>
      </VscTabList>,
      { wrapper },
    );
    expect(screen.getAllByText('Tab One').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Tab Two').length).toBeGreaterThan(0);
  });

  it('applies style classes to TabList', () => {
    const { container } = render(
      <VscTabList>
        <VscTab value="a">A</VscTab>
      </VscTabList>,
      { wrapper },
    );
    expect(container.querySelector('[role="tablist"]')).toBeTruthy();
  });

  it('applies style classes to Tab', () => {
    const { container } = render(
      <VscTabList>
        <VscTab value="a">A</VscTab>
      </VscTabList>,
      { wrapper },
    );
    expect(container.querySelector('[role="tab"]')).toBeTruthy();
  });

  it('forwards ref on TabList', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <VscTabList ref={ref}>
        <VscTab value="a">A</VscTab>
      </VscTabList>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className on TabList', () => {
    const { container } = render(
      <VscTabList className="my-tabs">
        <VscTab value="a">A</VscTab>
      </VscTabList>,
      { wrapper },
    );
    expect(container.querySelector('.my-tabs')).toBeTruthy();
  });

  it('merges custom className on Tab', () => {
    const { container } = render(
      <VscTabList>
        <VscTab value="a" className="my-tab">
          A
        </VscTab>
      </VscTabList>,
      { wrapper },
    );
    expect(container.querySelector('.my-tab')).toBeTruthy();
  });

  it('renders with default size', () => {
    const { container } = render(
      <VscTabList>
        <VscTab value="a">A</VscTab>
      </VscTabList>,
      { wrapper },
    );
    expect(container.querySelector('[role="tablist"]')).toBeTruthy();
  });

  it('marks selected tab with aria-selected', () => {
    const { container } = render(
      <VscTabList selectedValue="two">
        <VscTab value="one">One</VscTab>
        <VscTab value="two">Two</VscTab>
      </VscTabList>,
      { wrapper },
    );
    const selectedTab = container.querySelector(
      '[role="tab"][aria-selected="true"]',
    );
    expect(selectedTab).toBeTruthy();
  });

  it('applies a distinct class for the primary appearance', () => {
    const { container: defaultContainer } = render(
      <VscTabList>
        <VscTab value="a">A</VscTab>
      </VscTabList>,
      { wrapper },
    );
    const { container: primaryContainer } = render(
      <VscTabList appearance="primary">
        <VscTab value="a">A</VscTab>
      </VscTabList>,
      { wrapper },
    );

    const defaultClass = defaultContainer
      .querySelector('[role="tablist"]')
      ?.getAttribute('class');
    const primaryClass = primaryContainer
      .querySelector('[role="tablist"]')
      ?.getAttribute('class');

    expect(defaultClass).toBeTruthy();
    expect(primaryClass).toBeTruthy();
    expect(primaryClass).not.toEqual(defaultClass);
  });
});
