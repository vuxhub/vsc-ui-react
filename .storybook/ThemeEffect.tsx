import { useEffect } from 'react';

export function ThemeEffect({ isDark }: { isDark: boolean }) {
  useEffect(() => {
    // Toggle body class so theme-tokens.css light overrides kick in
    document.body.className = isDark ? '' : 'light-mode';

    // Force the entire preview iframe background (canvas + docs wrapper)
    document.body.style.background = isDark ? '#1e1e1e' : '#ffffff';
    document.body.style.color = isDark ? '#cccccc' : '#424242';

    // Force docs wrapper backgrounds via CSS custom properties
    document.documentElement.style.setProperty(
      '--sb-docs-bg',
      isDark ? '#1e1e1e' : '#ffffff',
    );
    document.documentElement.style.setProperty(
      '--sb-docs-color',
      isDark ? '#cccccc' : '#424242',
    );

    document.documentElement.style.setProperty(
      '--vscode-font-family',
      '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    );
  }, [isDark]);

  return null;
}
