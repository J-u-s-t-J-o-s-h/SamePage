# ADR 0001 — Application Stack

## Status

Accepted for Phase 0.

## Context

SamePage needs a maintainable local-first modular monolith. The product specification prefers TypeScript/React/Next.js for the frontend PWA and allows either FastAPI (Python) for AI-heavy processing or a well-justified TypeScript backend. Microservices are discouraged early.

## Decision

Use a **TypeScript modular monolith** with:

- **Next.js 16 App Router** + **React 19** + **TypeScript**
- Route Handlers for HTTP APIs (starting with `/api/health`)
- pnpm, ESLint, Prettier, Vitest, Playwright
- Domain modules under `src/` with explicit interfaces for persistence and AI adapters

Defer a separate FastAPI/Python process until OCR, speech-to-text, or model-serving workloads justify process isolation. When introduced, it will sit behind the same AI-provider interfaces (see ADR 0002).

## Consequences

- One language/toolchain for Phase 0–2 reduces setup burden on the household developer
- AI-heavy native libraries may later require a sidecar; interfaces keep that reversible
- Next.js is suitable for a self-hosted PWA; we are **not** adopting paid Vercel hosting as a requirement

## Alternatives considered

- Next.js UI + FastAPI API from day one: stronger AI isolation, but premature split for an empty shell
- Separate SPA + API: more deployment complexity without Phase 0 benefit
