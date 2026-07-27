/**
 * Local AI provider abstraction (Phase 0 seam).
 * No live model calls are wired yet. See docs/adr/0002-local-ai-abstraction.md.
 */

export type AiProcessingStatus = "succeeded" | "failed" | "skipped";

export type AiOperationResult<T> = {
  provider: string;
  model: string;
  operationVersion: string;
  processedAt: string;
  status: AiProcessingStatus;
  confidence?: number;
  rawOutput?: unknown;
  data?: T;
  error?: string;
};

export interface TextModelProvider {
  readonly providerId: string;
  complete(input: {
    prompt: string;
    operationVersion: string;
  }): Promise<AiOperationResult<string>>;
}

/** Deterministic adapter for automated tests and Phase 0 shell. */
export class FakeTextModelProvider implements TextModelProvider {
  readonly providerId = "fake";

  async complete(input: {
    prompt: string;
    operationVersion: string;
  }): Promise<AiOperationResult<string>> {
    return {
      provider: this.providerId,
      model: "fake-echo-0",
      operationVersion: input.operationVersion,
      processedAt: new Date().toISOString(),
      status: "succeeded",
      confidence: 1,
      rawOutput: input.prompt,
      data: `echo:${input.prompt}`,
    };
  }
}
