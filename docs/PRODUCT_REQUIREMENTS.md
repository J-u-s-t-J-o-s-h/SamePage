# SamePage Product Requirements (Phase 0 Extract)

This document summarizes authoritative requirements from [`PRODUCT_SPEC.md`](./PRODUCT_SPEC.md) for Phase 0 discovery and architecture. It does not replace the full specification.

## Product

SamePage is a local-first family coordination system for two adults in one household. It reduces mental load around appointments, children’s schedules, medical care, house hunting, vehicles, work, shopping, maintenance, documents, decisions, follow-ups, and shared notes.

Central UX principle: **the user captures information; the system organizes it.**

Primary capture action: **Add Something**.

## Nonnegotiable constraints

- Local-first on household-owned hardware
- No paid cloud dependency for core functions
- Privacy: no third-party AI by default; no analytics/ads/telemetry
- No mandatory recurring fees
- Mobile-usable (iPhone, iPad, Mac/desktop browser); prefer responsive PWA
- Human approval before consequential AI-created records

## Out of scope for Phase 0

- Authentication and household data model (Phase 1)
- Inbox capture (Phase 2+)
- OCR, voice, AI interpretation (Phases 3–5)
- Remote access, offline sync, backups (Phases 8–10)

## Phase 0 success criteria

- Repository initialized with documented architecture
- Development toolchain (format, lint, types, unit, e2e) works
- Minimal runnable application shell with a health-check endpoint
- Hardware discovery distinguishes agent/dev environments from unknown household deployment hardware
- No secrets committed; no paid/hosted services introduced
