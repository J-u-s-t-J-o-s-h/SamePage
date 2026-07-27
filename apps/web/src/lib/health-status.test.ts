import { describe, expect, it } from 'vitest';
import { describeConnection } from './health-status';

describe('describeConnection', () => {
  it('describes the checking state as neutral', () => {
    expect(describeConnection('checking')).toEqual({
      label: 'Checking your home system…',
      tone: 'neutral',
    });
  });

  it('describes the online state as good with plain language', () => {
    const d = describeConnection('online');
    expect(d.tone).toBe('good');
    expect(d.label.toLowerCase()).toContain('connected');
  });

  it('describes the offline state as bad', () => {
    expect(describeConnection('offline').tone).toBe('bad');
  });
});
