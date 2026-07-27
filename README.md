# SamePage

SamePage is a local-first family coordination system for a household of two adults. Capture notes, photos, and voice; the system helps organize them. Family data stays on hardware you control.

Authoritative requirements: [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md)

## Status

**Phase 0 complete pending owner approval.** Phase 1 has not started.

## Quick start (development)

Requirements:

- Node.js 20+
- [pnpm](https://pnpm.io/) 10+

```bash
pnpm install
pnpm dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). Health JSON: [http://127.0.0.1:3000/api/health](http://127.0.0.1:3000/api/health)

Optional: copy `.env.example` to `.env.local` (no secrets required for Phase 0).

## Scripts

| Command                     | Purpose                         |
| --------------------------- | ------------------------------- |
| `pnpm dev`                  | Development server              |
| `pnpm build` / `pnpm start` | Production build and serve      |
| `pnpm format:check`         | Prettier                        |
| `pnpm lint`                 | ESLint                          |
| `pnpm typecheck`            | TypeScript                      |
| `pnpm test`                 | Unit tests (Vitest)             |
| `pnpm test:e2e`             | Playwright end-to-end           |
| `pnpm test:secrets`         | Guard against committed secrets |
| `pnpm test:phase0`          | Full Phase 0 automated suite    |

First-time Playwright setup:

```bash
pnpm exec playwright install chromium
```

## Documentation

| Doc                                                                                    | Purpose                        |
| -------------------------------------------------------------------------------------- | ------------------------------ |
| [`AGENTS.md`](AGENTS.md)                                                               | Rules for coding agents        |
| [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md)                                         | Full product specification     |
| [`docs/PRODUCT_REQUIREMENTS.md`](docs/PRODUCT_REQUIREMENTS.md)                         | Phase 0 requirements extract   |
| [`docs/architecture/PHASE_0_DISCOVERY.md`](docs/architecture/PHASE_0_DISCOVERY.md)     | Environment/hardware discovery |
| [`docs/architecture/SYSTEM_CONTEXT.md`](docs/architecture/SYSTEM_CONTEXT.md)           | System context                 |
| [`docs/architecture/DATA_FLOW.md`](docs/architecture/DATA_FLOW.md)                     | Intended data flow             |
| [`docs/architecture/THREAT_MODEL.md`](docs/architecture/THREAT_MODEL.md)               | Threat model draft             |
| [`docs/adr/`](docs/adr/)                                                               | Architecture Decision Records  |
| [`docs/phases/PHASE_0_COMPLETION_REPORT.md`](docs/phases/PHASE_0_COMPLETION_REPORT.md) | Phase 0 completion report      |

## Important hardware note

Development may happen in a remote Cursor/Linux agent container. That environment is **not** the household MacBook or home server. Local AI defaults must wait for a real home-hardware inventory (see discovery notes).

## Privacy and cost

- No paid cloud services in the default architecture
- No third-party AI by default
- No analytics or advertising SDKs
