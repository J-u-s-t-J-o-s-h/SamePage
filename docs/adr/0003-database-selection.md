# ADR 0003 — Database selection

- **Status:** Accepted (Phase 0); first schema lands in Phase 1
- **Date:** 2026-07-27
- **Deciders:** SamePage maintainer
- **External review:** Approved 2026-07-28 — keep PostgreSQL as the authoritative
  database; do not introduce SQLite as an alternate production path.

## Context

SamePage needs durable, relational storage for households, users, memberships,
sessions, activity events, inbox items, tasks, appointments, topics, decisions,
uploads, and AI proposals — with strict **household isolation**, an
append-only-style **activity history**, full-text search, and reliable
migrations from day one. It must run on household hardware with **no recurring
fees** and no mandatory cloud service. PostgreSQL 16 is already available in the
environment.

## Decision

Use **PostgreSQL** as the single production database.

- One relational store for all domain data. PostgreSQL comfortably covers our
  needs: transactions and foreign keys for integrity and household isolation,
  `tsvector`/`GIN` **full-text search** (Phase 6) without extra infrastructure,
  `JSONB` for AI proposal payloads and provenance, and — if and only if a
  documented semantic-search need appears — `pgvector` as an in-database option
  (see ADR 0004), avoiding a separate vector service.
- **Migrations from the start.** All schema changes are versioned migrations;
  no manual, unversioned database edits. The concrete migration tool/ORM
  (Drizzle is the leading candidate for its lightweight, SQL-first, strongly
  typed model) is finalised at the start of Phase 1 when the first tables are
  designed, and recorded there.
- **Local development** uses the same engine via `docker compose up -d db`
  (see `docker-compose.yml`), so dev and production behaviour match. We do **not**
  use SQLite for development: the spec allows a lightweight dev database only if
  schema/behaviour differences are addressed, and matching engines is simpler
  and safer than reconciling dialect differences for a data-integrity-critical
  app.

Phase 0 does **not** stand up the database: the app shell and its tests are
hermetic and require no external services. This ADR fixes the direction so
Phase 1 can implement it without rework.

**Phase boundaries.** The **Phase 1** schema establishes persistence,
authorization, server-side household isolation, and the append-only
activity / audit history. **AI proposal tables — and the enforced boundary that
keeps AI output out of authoritative records until a human approves it — are
introduced in Phase 5**, when AI proposals first exist. Phase 1's design reserves
a clean separation (distinct tables and states for proposals vs approved records)
so that boundary can be added without rework, but it does **not** implement or
claim that enforcement early.

## Consequences

**Positive**

- One dependable, free, self-hostable engine covers relational, full-text, JSON,
  and (potential) vector needs — minimising moving parts on the home server.
- Dev/prod parity avoids a class of "works on SQLite, breaks on Postgres" bugs.

**Negative / risks**

- Requires running Postgres on the home server (a Docker container). This is a
  modest, well-understood operational cost and is covered by the backup/restore
  work in Phase 10.

## Alternatives considered

- **SQLite (dev or prod).** Attractive for zero-ops single-file storage, but its
  concurrency model, weaker typing, and dialect differences are a poor fit for a
  two-writer, integrity-sensitive, full-text-searching app, and would force
  dev/prod divergence. Rejected.
- **A separate search engine (e.g. Elasticsearch) or vector DB now.** Rejected as
  premature infrastructure; Postgres covers Phase 6 search, and ADR 0004 defers
  vectors until justified.
