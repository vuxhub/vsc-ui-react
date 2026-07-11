import { describe, expect, it } from 'vitest';
import {
  compareVersions,
  createVersionPlan,
  findVersionIntroduction,
  getChangedComponents,
  incrementVersion,
  parseVersion,
} from '../scripts/plan-release.mjs';

describe('release planning', () => {
  it('increments patch versions', () => {
    expect(incrementVersion('1.2.3', 'patch')).toBe('1.2.4');
  });

  it('increments minor versions and resets patch', () => {
    expect(incrementVersion('1.2.3', 'minor')).toBe('1.3.0');
  });

  it('compares semantic versions', () => {
    expect(compareVersions('1.2.3', '1.2.2')).toBeGreaterThan(0);
    expect(compareVersions('1.2.3', '1.3.0')).toBeLessThan(0);
    expect(compareVersions('1.2.3', '1.2.3')).toBe(0);
  });

  it('rejects invalid semantic versions', () => {
    expect(() => parseVersion('1.2')).toThrow('Invalid semantic version');
    expect(() => parseVersion('01.2.3')).toThrow('Invalid semantic version');
  });

  it('uses a patch bump for one changed component', () => {
    const plan = createVersionPlan('1.2.3', [
      'src/components/Button/VscButton.tsx',
      'src/components/Button/useButtonStyles.ts',
      'README.md',
    ]);

    expect(plan).toEqual({
      bump: 'patch',
      componentCount: 1,
      version: '1.2.4',
    });
  });

  it('uses a minor bump for multiple changed components', () => {
    const plan = createVersionPlan('1.2.3', [
      'src/components/Button/VscButton.tsx',
      'src/components/Input/VscInput.tsx',
    ]);

    expect(plan).toEqual({
      bump: 'minor',
      componentCount: 2,
      version: '1.3.0',
    });
  });

  it('normalizes Windows component paths', () => {
    expect(
      getChangedComponents([
        'src\\components\\Button\\VscButton.tsx',
        'src\\components\\Input\\VscInput.tsx',
      ]),
    ).toEqual(['Button', 'Input']);
  });

  it('does not bump when there are no changes', () => {
    expect(createVersionPlan('1.2.3', [])).toEqual({
      bump: 'none',
      componentCount: 0,
      version: '1.2.3',
    });
  });

  it('finds the commit that introduced a published version', () => {
    const history = [
      { commit: 'docs-change', version: '1.2.3' },
      { commit: 'release', version: '1.2.3' },
      { commit: 'previous-release', version: '1.2.2' },
      { commit: 'old-release', version: '1.2.3' },
    ];

    expect(findVersionIntroduction('1.2.3', history)).toBe('release');
  });
});
