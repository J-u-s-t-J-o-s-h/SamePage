# ADR 0004 — Vector Database Justification

## Status

Accepted: **not justified in Phase 0**.

## Context

The specification requires continuity and retrieval (“what happened with the dentist?”) but forbids adding a vector database merely because the product uses AI. Relational and full-text search should be evaluated first.

## Decision

- Do **not** introduce a vector database or embedding index in Phase 0
- Prefer PostgreSQL relational queries and full-text search when search lands (Phase 6+)
- Revisit embeddings only with a documented use case that ordinary search cannot satisfy

## Consequences

- Simpler operations and backups
- No extra local service to maintain on household hardware
- Semantic retrieval remains a future, evidence-driven option

## Alternatives considered

- Adding pgvector immediately: speculative complexity without product evidence
- External vector SaaS: privacy and cost violations
