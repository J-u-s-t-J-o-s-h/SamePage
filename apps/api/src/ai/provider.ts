import type { AiResult } from './result';

/**
 * A single AI operation request. `input` is the primary text to process;
 * `options` carries operation-specific parameters.
 */
export interface AiRequest {
  operation: string;
  input: string;
  options?: Record<string, unknown>;
}

/**
 * The provider abstraction the whole application is coded against.
 *
 * The UI and domain layers depend ONLY on this interface — never on a specific
 * model or vendor. Local engines (Ollama, llama.cpp, OpenAI-compatible local
 * endpoints, OCR/speech binaries) are introduced later as implementations of
 * this interface. A deterministic `FakeModelProvider` is the default and backs
 * the automated test suite so tests never depend on a large model being
 * available.
 */
export interface ModelProvider {
  readonly name: string;
  readonly model: string;
  /** Whether the underlying engine is reachable/usable right now. */
  isAvailable(): Promise<boolean>;
  /** Run an operation and return a validated structured result envelope. */
  run(request: AiRequest): Promise<AiResult>;
}
