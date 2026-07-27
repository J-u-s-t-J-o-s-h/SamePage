# ADR 0003 — Database Selection

## Status

Accepted (selection now; implementation begins Phase 1).

## Context

The specification prefers PostgreSQL for production, with migrations from the beginning. Phase 0 does not yet persist household data.

## Decision

- **PostgreSQL** is the system of record for SamePage
- Schema changes will use versioned migrations starting in Phase 1
- Phase 0 application shell has **no database dependency** so the health endpoint and home page run without Postgres installed
- Lightweight alternate databases are not the default; if used in tests, behavioral parity must be documented

## Consequences

- Developers need Postgres before Phase 1 feature work
- Phase 0 remains easy to run in constrained agent environments
- Household install docs (later) must cover local Postgres setup without paid hosted DB services

## Alternatives considered

- SQLite-only: simpler installs, weaker concurrent write story for two adults + jobs
- Hosted Postgres (Neon, etc.): introduces paid/hosted dependency contrary to Phase 0 constraints
