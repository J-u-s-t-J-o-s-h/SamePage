# Phase 0 Architecture Proposal and Test Plan

## Current state summary

- Docs-only repository existed (`AGENTS.md`, `README.md`, `docs/PRODUCT_SPEC.md`)
- Implementation environment is a Cursor Linux container, **not** the household MacBook
- Household deployment hardware details are unknown and must not be guessed

## Objectives (Phase 0 only)

Discovery, architecture documentation, repository initialization, toolchain, minimal runnable shell, health check.

## Assumptions

- Owner will eventually run SamePage on household-owned hardware (likely a MacBook/home computer)
- No paid cloud services may be introduced
- Phase 1+ features stay out of scope except foundational interfaces required to avoid rework (AI provider types only)

## Risks

| Risk                          | Mitigation                                         |
| ----------------------------- | -------------------------------------------------- |
| Sizing local AI from agent VM | Document unknown home hardware; fake adapters only |
| Premature backend split       | TypeScript modular monolith (ADR 0001)             |
| Secrets leakage               | `.env.example` only; secrets check script          |
| Scope creep into Phase 1      | Shell + health only; no auth/data model            |

## Implementation plan

1. Initialize Next.js + TypeScript app at repo root
2. Add Prettier, ESLint, `tsc`, Vitest, Playwright
3. Implement home shell + `/api/health`
4. Write PRD extract, diagrams, threat model, ADRs, discovery notes
5. Add `.env.example` and CI-friendly `pnpm test:phase0`
6. Run automated tests; fix failures; write completion report

## Automated acceptance tests

| Requirement          | Command / check       |
| -------------------- | --------------------- |
| Application builds   | `pnpm build`          |
| Formatting           | `pnpm format:check`   |
| Lint                 | `pnpm lint`           |
| Typecheck            | `pnpm typecheck`      |
| Unit tests           | `pnpm test`           |
| E2E home page        | `pnpm test:e2e`       |
| Health endpoint      | Covered by unit + e2e |
| No secrets committed | `pnpm test:secrets`   |
| Aggregate            | `pnpm test:phase0`    |

## Manual acceptance tests

1. Follow README on a clean machine: install pnpm deps, `pnpm dev`, open browser
2. Confirm home page shows SamePage and understandable status
3. Open `/api/health` and confirm JSON status is understandable
4. Skim architecture docs and confirm they match the implemented shell
