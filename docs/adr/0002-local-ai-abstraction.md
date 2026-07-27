# ADR 0002 — Local AI Abstraction

## Status

Accepted for Phase 0 (interfaces only; no live model binding).

## Context

SamePage must not couple the UI to one model family. Local providers (Ollama-compatible, llama.cpp-compatible, other local OpenAI-compatible endpoints) should be swappable. Cloud AI must remain optional and disabled by default. Household hardware capability is currently **unknown**.

## Decision

Define an internal **model-provider abstraction** with:

- Provider id + model id on every operation result
- Strict schema validation for structured outputs
- Explicit processing status / error states
- Deterministic **fake adapters** for automated tests
- No direct writes from model output into authoritative tables (proposals only)

Concrete engines for OCR, STT, and LLM will be selected after household hardware inventory (see `PHASE_0_DISCOVERY.md`). Phase 0 ships the architectural rule and test seam, not production model weights.

## Consequences

- Tests never require a large model
- Hardware-specific defaults remain open without blocking the app shell
- Adding Ollama/llama.cpp later does not require UI rewrites

## Alternatives considered

- Hard-coding Ollama now: rejects unknown hardware reality
- Calling hosted AI APIs in development: violates privacy/cost constraints
