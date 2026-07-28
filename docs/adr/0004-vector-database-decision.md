# ADR 0004 — Is a vector database justified yet?

- **Status:** Accepted (Phase 0) — **No vector database now**
- **Date:** 2026-07-27
- **Deciders:** SamePage maintainer
- **External review:** Approved 2026-07-28 — do not add a vector database or
  embeddings until a documented retrieval use case shows relational + PostgreSQL
  full-text search are insufficient.

## Context

AI-using products often reach for a vector database reflexively. The spec is
explicit that we must **not** add one "merely because the product uses AI," and
must first establish whether ordinary relational + full-text search suffice,
recording the decision here.

The continuity/retrieval features SamePage needs early — "Catch me up," "What's
happening with the dentist?", "What are we waiting on for the house?", "What
changed today?" — are, on inspection, **structured and keyword queries over
household-scoped records with strong metadata** (topic, person, status, dates,
source, timestamps, actor). They are answered by filtering and full-text search,
not by semantic nearest-neighbour retrieval.

## Decision

**Do not adopt a vector database (or embeddings) in the initial phases.**

- Retrieval and continuity are built on **PostgreSQL relational queries +
  full-text search** (`tsvector`/`GIN`), grounded in the activity/event history.
- "What Changed" (Phase 7) is grounded in recorded activity events, not
  generated recall — the AI may phrase a summary, but it may only summarise
  events that actually happened.
- If and when a **documented** use case appears that genuinely needs semantic
  retrieval beyond relational/full-text (e.g. "find notes that _mean_ something
  similar" across a large corpus), prefer **`pgvector` inside the existing
  PostgreSQL** over introducing a separate vector service — keeping the moving
  parts on the home server to a minimum. That change will get its own ADR
  documenting the use case, the embedding model (local, per privacy rules), and
  the measured benefit.

## Consequences

**Positive**

- No extra service to run, secure, back up, or keep in sync on the home server.
- No embedding model dependency (and its CPU cost) until there is proven value.
- Simpler, debuggable, deterministic retrieval that is easy to test.

**Negative / risks**

- Purely semantic queries are not supported yet. Accepted: no current feature
  needs them, and full-text + metadata covers the stated questions.

## Alternatives considered

- **Adopt pgvector / a vector DB now.** Rejected as premature per the spec and
  the analysis above.

## Revisit when

- A concrete, written feature requirement cannot be satisfied by relational +
  full-text search. At that point, evaluate `pgvector` first.
