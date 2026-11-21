import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges conditional and conflicting tailwind classes', () => {
    expect(cn('px-2 py-1', { hidden: false, flex: true }, 'px-4')).toBe('py-1 flex px-4');
  });
});
