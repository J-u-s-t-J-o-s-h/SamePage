# ADR 0001 — Technology stack

- **Status:** Accepted (Phase 0)
- **Date:** 2026-07-27
- **Deciders:** SamePage maintainer
- **External review:** Approved 2026-07-28 — keep the TypeScript modular monolith
  (Vite/React + Hono); do not switch to Next.js + Python/FastAPI unless later
  evidence shows a concrete need for an in-process Python service.

## Context

SamePage is a local-first, privacy-first family coordination system intended to
run on **household-owned hardware** and be maintained, in practice, by one or
two people. The discovery pass on the development machine found: Linux x86_64,
4 vCPU, ~15 GB RAM, **no GPU**, with Node 22, Python 3.11, Docker, and
PostgreSQL 16 available. Real home-server hardware is unknown but should be
assumed similarly modest and CPU-only.

The preferred baseline in the product spec is a **Next.js (TypeScript) frontend
with a Python/FastAPI backend**, and it explicitly permits "a well-justified
TypeScript backend" and "an equivalent mature framework" instead of Next.js.

The forces at play:

- **Maintainability by a very small team** is paramount. Two languages, two
  toolchains, two dependency ecosystems, and two deployment artifacts multiply
  ongoing maintenance and onboarding cost.
- The "AI-heavy processing" (OCR, speech-to-text, LLM inference) is, in this
  architecture, **delegated to external local processes** — Ollama over HTTP,
  and `tesseract`/`whisper.cpp` as subprocesses. The application's job is
  orchestration, strict validation, provenance, and human-in-the-loop review —
  not in-process numerical model execution.
- Offline-first PWA behaviour (Phase 8) needs **precise control of the service
  worker and app shell**.
- The system should deploy as **one artifact on one port** for a household.

## Decision

Build SamePage as a **single-language TypeScript modular monolith**:

- **Web (`apps/web`):** Vite + React + TypeScript, mobile-first PWA. Vite (via
  `vite-plugin-pwa`, added in Phase 8) gives first-class control of the service
  worker and offline app shell.
- **API (`apps/api`):** [Hono](https://hono.dev) on Node, a small, fast,
  well-tested TypeScript HTTP framework. Internal layering keeps domain, API
  routes, persistence (Phase 1+), and AI integration cleanly separated —
  a modular monolith, not microservices.
- **Shared language:** one toolchain (pnpm workspaces), one formatter
  (Prettier), one linter (ESLint), one type checker (`tsc`), one unit/integration
  runner (Vitest), one e2e runner (Playwright).
- **Validation:** [Zod](https://zod.dev) provides strict runtime schema
  validation at every trust boundary (environment, HTTP input, and — critically
  — all AI output), filling the role Pydantic plays in the FastAPI baseline.
- **Single deployable:** in production the API also serves the built web assets
  from the same origin and port. In development, Vite serves the web app and
  proxies `/api` to Hono.

## Consequences

**Positive**

- One language across the whole stack → dramatically lower cognitive and
  maintenance load for a household-run system; a clean, testable e2e story on a
  single port; trivial type sharing between layers over time.
- No Python runtime, virtualenv, or second dependency graph to maintain for the
  core app. Local AI engines remain external and swappable behind adapters
  (see ADR 0002), so we keep AI capability without coupling the app to Python.
- Zod gives Pydantic-equivalent strictness for the thing that matters most here:
  never trusting model output.

**Negative / risks**

- The mainstream "AI in Python" ecosystem (e.g. rich model-serving libraries) is
  not in-process. **Mitigation:** we only ever talk to local engines over
  HTTP/CLI, which is language-agnostic; if a future need genuinely requires
  in-process Python ML, it can be added as an isolated local sidecar behind the
  same adapter contract without changing the app.
- Background job processing in Node needs a deliberate design (a Postgres-backed
  queue is planned for Phase 3). **Mitigation:** documented and deferred to when
  first needed.
- Deviating from the stated Next.js + FastAPI baseline is a notable choice.
  **This is surfaced explicitly for owner ratification at the Phase 0 gate.**

## Alternatives considered

1. **Next.js + Python/FastAPI (the spec baseline).** Rejected for the initial
   build on maintainability grounds (two languages/toolchains/deployables for a
   one-maintainer, single-home-server system) and because the AI work is
   external orchestration rather than in-process ML. Remains a viable pivot if
   the owner prefers it.
2. **Next.js full-stack (TypeScript only).** A reasonable single-language option,
   but its offline/service-worker story is more awkward than Vite's for a
   fundamentally offline-first PWA, and its "magic" (App Router, server
   components) adds concepts a small maintainer must carry. Vite + Hono is
   simpler and more transparent.
3. **Vite + Express.** Express works, but Hono has a cleaner middleware model,
   first-class TypeScript types, a built-in `secure-headers` middleware, and a
   `app.request()` API that makes route integration tests trivial without a live
   socket.

## Revisit when

- The owner prefers the Python/FastAPI baseline.
- A concrete requirement needs in-process Python ML that cannot be served by a
  local HTTP/CLI engine.
