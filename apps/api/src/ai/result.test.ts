import { describe, expect, it } from 'vitest';
import { AiResultSchema } from './result';

const base = {
  provider: 'fake',
  model: 'fake-deterministic-1',
  operation: 'extract-tasks',
  operationVersion: 'fake-v1',
  processedAt: '2026-07-27T12:00:00.000Z',
  status: 'ok' as const,
};

describe('AiResultSchema', () => {
  it('accepts a valid envelope and applies safe defaults', () => {
    const parsed = AiResultSchema.parse(base);
    expect(parsed.confidence).toBeNull();
    expect(parsed.raw).toBeNull();
    expect(parsed.data).toBeNull();
    expect(parsed.error).toBeNull();
  });

  it('rejects a confidence outside [0, 1]', () => {
    expect(() => AiResultSchema.parse({ ...base, confidence: 1.5 })).toThrow();
  });

  it('rejects a non-ISO processedAt timestamp', () => {
    expect(() => AiResultSchema.parse({ ...base, processedAt: 'yesterday' })).toThrow();
  });

  it('rejects an unknown status value', () => {
    expect(() => AiResultSchema.parse({ ...base, status: 'maybe' })).toThrow();
  });

  it('rejects an empty provider', () => {
    expect(() => AiResultSchema.parse({ ...base, provider: '' })).toThrow();
  });
});
