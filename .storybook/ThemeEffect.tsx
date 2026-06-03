import { useLayoutEffect } from 'react';

export function ThemeEffect({ isDark }: { isDark: boolean }) {
  useLayoutEffect(() => {
    const root = document.documentElement;

    // Toggle :root class so vscode-tokens.css theme selectors apply.
    // All colors are driven by CSS custom properties — no imperative
    // style mutations needed.
    // useLayoutEffect ensures this runs before the browser paints,
    // preventing a flash when switching themes.
    root.classList.toggle('theme-dark', isDark);
    root.classList.toggle('theme-light', !isDark);
  }, [isDark]);

  return null;
}
