import { describe, expect, it } from 'vitest';
import { FakeModelProvider } from './fake-provider';
import { AiResultSchema } from './result';
import type { ModelProvider } from './provider';

/**
 * This doubles as the ModelProvider CONTRACT test: any provider (fake or real
 * local engine) must satisfy these expectations. Real-provider suites should
 * reuse the same assertions against a running local engine.
 */
function runContract(makeProvider: () => ModelProvider) {
  it('exposes a name and model identifier', () => {
    const provider = makeProvider();
    expect(provider.name.length).toBeGreaterThan(0);
    expect(provider.model.length).toBeGreaterThan(0);
  });

  it('reports availability', async () => {
    const provider = makeProvider();
    expect(typeof (await provider.isAvailable())).toBe('boolean');
  });

  it('returns a schema-valid AiResult envelope', async () => {
    const provider = makeProvider();
    const result = await provider.run({ operation: 'summarize', input: 'hello world' });
    // Must round-trip through the strict schema without throwing.
    expect(() => AiResultSchema.parse(result)).not.toThrow();
    expect(result.operation).toBe('summarize');
    expect(result.provider).toBe(provider.name);
    expect(result.model).toBe(provider.model);
  });
}

describe('FakeModelProvider (ModelProvider contract)', () => {
  runContract(() => new FakeModelProvider());

  it('uses the injected clock for deterministic timestamps', async () => {
    const now = new Date('2026-07-27T12:00:00.000Z');
    const provider = new FakeModelProvider({ now: () => now });
    const result = await provider.run({ operation: 'summarize', input: 'x' });
    expect(result.processedAt).toBe('2026-07-27T12:00:00.000Z');
  });

  it('reflects configured availability', async () => {
    const provider = new FakeModelProvider({ available: false });
    expect(await provider.isAvailable()).toBe(false);
  });

  it('uses a canned responder when provided', async () => {
    const provider = new FakeModelProvider({
      respond: (req) => ({ data: { length: req.input.length }, confidence: 0.9 }),
    });
    const result = await provider.run({ operation: 'measure', input: 'abcd' });
    expect(result.data).toEqual({ length: 4 });
    expect(result.confidence).toBe(0.9);
  });

  it('echoes the input by default', async () => {
    const provider = new FakeModelProvider({ now: () => new Date('2026-01-01T00:00:00.000Z') });
    const result = await provider.run({ operation: 'echo', input: 'ping' });
    expect(result.data).toEqual({ echo: 'ping' });
  });
});
