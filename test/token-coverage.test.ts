/**
 * Token coverage test.
 *
 * Ensures every `var(--vscode-*)` reference in component source and
 * Storybook config has a corresponding definition in the shared token
 * CSS file (playground/vscode-tokens.css).
 *
 * Catches typos like `--vscode-checkbox-selectBackgroud` (missing 'n')
 * and references to tokens that haven't been added to the CSS file yet.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(__dirname, '..');
const TOKEN_CSS = join(ROOT, 'playground', 'vscode-tokens.css');

/** Recursively collect all file paths under `dir` matching `extensions`. */
function walkFiles(dir: string, extensions: string[]): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      // Skip node_modules, dist, and hidden directories
      if (
        !entry.startsWith('.') &&
        entry !== 'node_modules' &&
        entry !== 'dist'
      ) {
        results.push(...walkFiles(full, extensions));
      }
    } else if (extensions.some((ext) => full.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

/** Extract all `--vscode-*` token names defined in a CSS file. */
function extractDefinitions(css: string): Set<string> {
  const tokens = new Set<string>();
  // Match property definitions like `--vscode-foreground: #ccc;`
  for (const match of css.matchAll(/(--vscode-[\w-]+)\s*:/g)) {
    tokens.add(match[1]);
  }
  return tokens;
}

/** Extract all `var(--vscode-*)` references from source code. */
function extractReferences(source: string): string[] {
  const refs: string[] = [];
  for (const match of source.matchAll(/var\((--vscode-[\w-]+)/g)) {
    refs.push(match[1]);
  }
  return [...new Set(refs)];
}

describe('Token coverage', () => {
  const cssContent = readFileSync(TOKEN_CSS, 'utf-8');
  const defined = extractDefinitions(cssContent);

  it('token CSS file defines at least 50 tokens', () => {
    expect(defined.size).toBeGreaterThanOrEqual(50);
  });

  const dirs = [
    { label: 'src/', path: join(ROOT, 'src') },
    { label: '.storybook/', path: join(ROOT, '.storybook') },
  ];
  const extensions = ['.ts', '.tsx'];

  for (const { label, path } of dirs) {
    it(`all var(--vscode-*) references in ${label} are defined in vscode-tokens.css`, () => {
      const files = walkFiles(path, extensions);
      const missing: { file: string; token: string }[] = [];

      for (const file of files) {
        const content = readFileSync(file, 'utf-8');
        const refs = extractReferences(content);
        for (const token of refs) {
          if (!defined.has(token)) {
            missing.push({
              file: file.replace(ROOT + '/', ''),
              token,
            });
          }
        }
      }

      if (missing.length > 0) {
        const lines = missing.map(
          ({ file, token }) => `  ${token}  (in ${file})`,
        );
        expect.fail(
          `Missing token definitions in playground/vscode-tokens.css:\n${lines.join('\n')}\n\n` +
            'Add these tokens to the :root and :root.theme-light blocks.',
        );
      }
    });
  }
});
