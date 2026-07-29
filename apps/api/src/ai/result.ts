import { z } from 'zod';

/**
 * The structured envelope EVERY AI operation must return.
 *
 * Nothing in SamePage trusts raw model output: a provider runs an operation,
 * then wraps the outcome in this validated envelope. Operation-specific
 * payloads live in `data` and are validated by their own schemas before use.
 * Authoritative records (tasks, appointments, decisions, …) are NEVER written
 * directly from `data`; they always pass through a human-reviewed proposal.
 */
export const AiResultStatus = z.enum(['ok', 'invalid_output', 'error', 'unsupported']);
export type AiResultStatus = z.infer<typeof AiResultStatus>;

export const AiResultSchema = z.object({
  /** Provider name, e.g. "fake", "ollama". */
  provider: z.string().min(1),
  /** Concrete model identifier the provider used. */
  model: z.string().min(1),
  /** Operation name, e.g. "extract-tasks". */
  operation: z.string().min(1),
  /** Version of the prompt/operation contract, for reproducibility. */
  operationVersion: z.string().min(1),
  /** ISO 8601 timestamp of when processing completed. */
  processedAt: z.string().datetime(),
  status: AiResultStatus,
  /** Confidence in [0,1] when meaningful; null when not applicable. */
  confidence: z.number().min(0).max(1).nullable().default(null),
  /** Raw provider output, retained for provenance where safe; may be null. */
  raw: z.string().nullable().default(null),
  /** Validated, operation-specific structured output; null on failure. */
  data: z.unknown().nullable().default(null),
  /** Human-readable error message when status !== 'ok'. */
  error: z.string().nullable().default(null),
});

export type AiResult = z.infer<typeof AiResultSchema>;
