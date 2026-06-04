import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { CircleRegular } from '@fluentui/react-icons';
import { VscBadge } from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

describe('VscBadge', () => {
  it('renders badge label', () => {
    const { getByText } = render(<VscBadge>Badge label</VscBadge>, {
      wrapper,
    });
    expect(getByText('Badge label')).toBeTruthy();
  });

  it('forwards ref to underlying div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <VscBadge ref={ref} icon={<CircleRegular />}>
        Ref Test
      </VscBadge>,
      { wrapper },
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className with generated classes', () => {
    const { container } = render(
      <VscBadge className="custom-class" icon={<CircleRegular />}>
        Merge
      </VscBadge>,
      { wrapper },
    );
    const badge = container.querySelector('.custom-class');
    expect(badge).toBeTruthy();
  });

  it('produces distinct classes for different colors', () => {
    const { container: blueContainer } = render(
      <VscBadge color="blue" icon={<CircleRegular />}>
        Blue
      </VscBadge>,
      { wrapper },
    );
    const { container: redContainer } = render(
      <VscBadge color="red" icon={<CircleRegular />}>
        Red
      </VscBadge>,
      { wrapper },
    );
    const blue = blueContainer.firstElementChild!;
    const red = redContainer.firstElementChild!;
    expect(blue.className).not.toBe(red.className);
  });

  it('produces distinct classes for neutralContrast filled variant', () => {
    const { container: neutralContainer } = render(
      <VscBadge color="neutral" appearance="filled" icon={<CircleRegular />}>
        Neutral
      </VscBadge>,
      { wrapper },
    );
    const { container: contrastContainer } = render(
      <VscBadge
        color="neutralContrast"
        appearance="filled"
        icon={<CircleRegular />}
      >
        Contrast
      </VscBadge>,
      { wrapper },
    );
    const neutral = neutralContainer.firstElementChild!;
    const contrast = contrastContainer.firstElementChild!;
    expect(contrast.className).not.toBe(neutral.className);
  });
});
