import type { AiRequest, ModelProvider } from './provider';
import { AiResultSchema, type AiResult } from './result';

export interface FakeResponse {
  data?: unknown;
  confidence?: number | null;
  raw?: string | null;
}

export interface FakeModelProviderOptions {
  name?: string;
  model?: string;
  available?: boolean;
  /** Injectable clock for deterministic timestamps in tests. */
  now?: () => Date;
  /** Optional canned responder keyed off the request. */
  respond?: (request: AiRequest) => FakeResponse;
}

/**
 * Deterministic, dependency-free provider.
 *
 * It is the default provider (privacy-first: no external calls) and the
 * backbone of the automated test suite. Real local providers implement the
 * same `ModelProvider` contract; the contract test in `fake-provider.test.ts`
 * documents the behaviour every provider must satisfy.
 */
export class FakeModelProvider implements ModelProvider {
  readonly name: string;
  readonly model: string;
  private readonly available: boolean;
  private readonly now: () => Date;
  private readonly responder: ((request: AiRequest) => FakeResponse) | undefined;

  constructor(options: FakeModelProviderOptions = {}) {
    this.name = options.name ?? 'fake';
    this.model = options.model ?? 'fake-deterministic-1';
    this.available = options.available ?? true;
    this.now = options.now ?? (() => new Date());
    this.responder = options.respond;
  }

  isAvailable(): Promise<boolean> {
    return Promise.resolve(this.available);
  }

  run(request: AiRequest): Promise<AiResult> {
    const responded = this.responder ? this.responder(request) : {};
    const result = AiResultSchema.parse({
      provider: this.name,
      model: this.model,
      operation: request.operation,
      operationVersion: 'fake-v1',
      processedAt: this.now().toISOString(),
      status: 'ok',
      confidence: responded.confidence ?? null,
      raw: responded.raw ?? null,
      data: responded.data ?? { echo: request.input },
      error: null,
    } satisfies AiResult);
    return Promise.resolve(result);
  }
}
