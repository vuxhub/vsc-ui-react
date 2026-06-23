import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import {
  VscMessageBar,
  VscMessageBarActions,
  VscMessageBarBody,
  VscMessageBarTitle,
} from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscMessageBar', () => {
  it('renders body content', () => {
    const { getByText } = render(
      <VscMessageBar>
        <VscMessageBarBody>
          <VscMessageBarTitle>Title</VscMessageBarTitle>
          Body content
        </VscMessageBarBody>
      </VscMessageBar>,
      { wrapper },
    );
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Body content')).toBeTruthy();
  });

  it('forwards ref to the root div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <VscMessageBar ref={ref}>
        <VscMessageBarBody>Body</VscMessageBarBody>
      </VscMessageBar>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.classList.contains('fui-MessageBar')).toBe(true);
  });

  it('merges custom className with generated classes', () => {
    const { container } = render(
      <VscMessageBar className="custom-class">
        <VscMessageBarBody>Body</VscMessageBarBody>
      </VscMessageBar>,
      { wrapper },
    );
    expect(container.querySelector('.custom-class')).toBeTruthy();
  });

  it('produces distinct classes for different intents', () => {
    const { container: info } = render(
      <VscMessageBar intent="info">
        <VscMessageBarBody>i</VscMessageBarBody>
      </VscMessageBar>,
      { wrapper },
    );
    const { container: error } = render(
      <VscMessageBar intent="error">
        <VscMessageBarBody>e</VscMessageBarBody>
      </VscMessageBar>,
      { wrapper },
    );
    expect(info.firstElementChild!.className).not.toBe(
      error.firstElementChild!.className,
    );
  });

  it('renders a neutral default intent distinct from info', () => {
    const { container: def } = render(
      <VscMessageBar intent="default">
        <VscMessageBarBody>d</VscMessageBarBody>
      </VscMessageBar>,
      { wrapper },
    );
    const { container: info } = render(
      <VscMessageBar intent="info">
        <VscMessageBarBody>i</VscMessageBarBody>
      </VscMessageBar>,
      { wrapper },
    );
    const defEl = def.querySelector('.fui-MessageBar')!;
    expect(defEl.classList.contains('fui-MessageBar')).toBe(true);
    expect(def.firstElementChild!.className).not.toBe(
      info.firstElementChild!.className,
    );
  });

  it('applies square shape class', () => {
    const { container: rounded } = render(
      <VscMessageBar shape="rounded">
        <VscMessageBarBody>r</VscMessageBarBody>
      </VscMessageBar>,
      { wrapper },
    );
    const { container: square } = render(
      <VscMessageBar shape="square">
        <VscMessageBarBody>s</VscMessageBarBody>
      </VscMessageBar>,
      { wrapper },
    );
    expect(rounded.firstElementChild!.className).not.toBe(
      square.firstElementChild!.className,
    );
  });

  it('renders actions and container action', () => {
    const { getByText, getByLabelText } = render(
      <VscMessageBar>
        <VscMessageBarBody>Body</VscMessageBarBody>
        <VscMessageBarActions
          containerAction={
            <button type="button" aria-label="Dismiss">
              x
            </button>
          }
        >
          <button type="button">Action</button>
        </VscMessageBarActions>
      </VscMessageBar>,
      { wrapper },
    );
    expect(getByText('Action')).toBeTruthy();
    expect(getByLabelText('Dismiss')).toBeTruthy();
  });
});
