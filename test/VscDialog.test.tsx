import React, { createRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import {
  VscButton,
  VscDialog,
  VscDialogActions,
  VscDialogBody,
  VscDialogContent,
  VscDialogDescription,
  VscDialogSeparator,
  VscDialogSurface,
  VscDialogTitle,
  VscDialogTrigger,
} from '../src';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
);

function renderDialog(size: 'wide' | 'narrow' = 'wide') {
  return render(
    <VscDialog>
      <VscDialogTrigger>
        <VscButton>Open dialog</VscButton>
      </VscDialogTrigger>
      <VscDialogSurface size={size}>
        <VscDialogBody>
          <VscDialogTitle>Dialog title</VscDialogTitle>
          <VscDialogContent>
            <VscDialogDescription>Dialog description</VscDialogDescription>
            <VscDialogSeparator />
            Body content
          </VscDialogContent>
          <VscDialogActions size={size}>
            <VscButton appearance="primary">Primary</VscButton>
            <VscButton>Secondary</VscButton>
          </VscDialogActions>
        </VscDialogBody>
      </VscDialogSurface>
    </VscDialog>,
    { wrapper },
  );
}

describe('VscDialog', () => {
  afterEach(() => {
    cleanup();
  });

  it('opens when the trigger is clicked', () => {
    renderDialog();

    fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog title')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders optional description and separator', () => {
    render(
      <VscDialog defaultOpen>
        <VscDialogSurface>
          <VscDialogBody>
            <VscDialogTitle action={null}>Dialog title</VscDialogTitle>
            <VscDialogContent>
              <VscDialogDescription>Dialog description</VscDialogDescription>
              <VscDialogSeparator />
              Body content
            </VscDialogContent>
          </VscDialogBody>
        </VscDialogSurface>
      </VscDialog>,
      { wrapper },
    );

    expect(screen.getByText('Dialog description')).toBeInTheDocument();
    expect(document.querySelector('hr')).toBeInTheDocument();
  });

  it('closes when the close button is clicked', () => {
    render(
      <VscDialog defaultOpen>
        <VscDialogSurface>
          <VscDialogBody>
            <VscDialogTitle>Dialog title</VscDialogTitle>
            <VscDialogContent>Body content</VscDialogContent>
          </VscDialogBody>
        </VscDialogSurface>
      </VscDialog>,
      { wrapper },
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('applies distinct surface classes for wide vs narrow sizes', () => {
    const wideResult = renderDialog('wide');
    fireEvent.click(
      wideResult.container.querySelector('button') as HTMLButtonElement,
    );
    const wideSurface = document.querySelector('.fui-DialogSurface')!;
    const wideClass = wideSurface.className;

    wideResult.unmount();

    const narrowResult = renderDialog('narrow');
    fireEvent.click(
      narrowResult.container.querySelector('button') as HTMLButtonElement,
    );
    const narrowSurface = document.querySelector('.fui-DialogSurface')!;
    const narrowClass = narrowSurface.className;

    expect(wideClass).not.toBe(narrowClass);
  });

  it('merges custom className on surface', () => {
    render(
      <VscDialog defaultOpen>
        <VscDialogSurface className="custom-surface">
          <VscDialogBody>
            <VscDialogTitle action={null}>Title</VscDialogTitle>
            <VscDialogContent>Content</VscDialogContent>
          </VscDialogBody>
        </VscDialogSurface>
      </VscDialog>,
      { wrapper },
    );

    expect(document.querySelector('.fui-DialogSurface')).toHaveClass(
      'custom-surface',
    );
  });

  it('forwards ref on description', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<VscDialogDescription ref={ref}>Description</VscDialogDescription>);

    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('calls onOpenChange when dialog state changes', () => {
    const onOpenChange = vi.fn();

    render(
      <VscDialog onOpenChange={onOpenChange}>
        <VscDialogTrigger>
          <VscButton>Open</VscButton>
        </VscDialogTrigger>
        <VscDialogSurface>
          <VscDialogBody>
            <VscDialogTitle>Title</VscDialogTitle>
            <VscDialogContent>Content</VscDialogContent>
          </VscDialogBody>
        </VscDialogSurface>
      </VscDialog>,
      { wrapper },
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenChange).toHaveBeenCalled();
  });
});
