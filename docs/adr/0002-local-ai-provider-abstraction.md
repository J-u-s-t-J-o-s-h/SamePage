# ADR 0002 — Local AI provider abstraction

- **Status:** Accepted (Phase 0)
- **Date:** 2026-07-27
- **Deciders:** SamePage maintainer

## Context

SamePage must use AI (OCR, speech-to-text, text classification, structured
extraction, summarization) **without** coupling the product to any one model or
vendor, **without** sending family data to third-party clouds by default, and
**without** incurring recurring fees. The spec also demands that:

- every AI operation expose a structured result (provider, model, operation
  version, timestamp, confidence, raw + validated output, status, error);
- model output is never trusted unvalidated;
- AI output never writes directly to authoritative records — it produces a
  **proposal** that a human reviews.

The hardware is CPU-only, so model choices must stay modest and are deferred
until a real workload is benchmarked.

## Decision

Introduce, in Phase 0, a minimal **provider abstraction** that the whole
application is coded against — never a concrete model:

- `ModelProvider` interface (`apps/api/src/ai/provider.ts`): `name`, `model`,
  `isAvailable()`, and `run(request)`.
- `AiResult` envelope (`apps/api/src/ai/result.ts`): a **Zod-validated**
  structure carrying `provider`, `model`, `operation`, `operationVersion`,
  `processedAt`, `status` (`ok | invalid_output | error | unsupported`),
  `confidence`, `raw`, `data`, and `error`. Operation-specific payloads live in
  `data` and get their own schemas as they are introduced.
- `FakeModelProvider` (`apps/api/src/ai/fake-provider.ts`): a deterministic,
  dependency-free default. It is the privacy-safe default (no external calls)
  **and** the backbone of the automated test suite, so tests never depend on a
  large model being available.
- A **contract test** (`fake-provider.test.ts`) documents the behaviour every
  provider — fake or real — must satisfy. Real local providers (Ollama,
  llama.cpp, OpenAI-compatible local endpoints, OCR/speech binaries) will
  implement the same interface and reuse the contract.

Only the interface + envelope + fake + contract test are built now. Real
adapters arrive in their respective phases (OCR: 3, speech: 4, interpretation:
5). The **proposal-vs-authoritative-record boundary** — the pipeline that keeps
AI output out of authoritative tables until a human approves it — is realised in
**Phase 5**, when AI proposal records first exist. The earlier database design
(Phase 1) reserves a clean separation for it but does **not** implement that
enforcement, and Phase 0 ships neither: today the seam is only the validated
`AiResult` envelope and the deterministic fake. Building the seam now avoids
reworking call sites later.

## Consequences

**Positive**

- The UI and domain layers depend on a stable seam; models are swappable.
- Deterministic tests by default; no flaky, hardware-dependent AI in CI.
- The envelope makes provenance and uncertainty first-class from day one.

**Negative / risks**

- The envelope may need fields as real operations land (e.g. token counts,
  timings). It is versioned by `operationVersion` and centralised in one schema,
  so evolving it is low-risk.

## Alternatives considered

- **Call a model SDK directly at each site.** Rejected: couples the app to a
  vendor, defeats privacy defaults, and makes testing depend on a live model.
- **Build all adapters now.** Rejected as premature (no benchmarked workload,
  hardware not finalised); violates "begin with the simplest architecture."

## Revisit when

- The first real local engine is integrated (Phase 3) — validate the envelope
  against a real provider and extend if needed.
