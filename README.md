# SamePage

**A calm, private family command center.** SamePage is a local-first,
privacy-first coordination system that helps two adults stay on the same page —
appointments, tasks, notes, and decisions — without waiting until they're
together. You **capture** things (type, paste, dictate, or photograph, including
handwriting); the system helps **organise** them, and a human always approves
before anything consequential is created.

- **Local-first & private** — runs on your own home hardware. No third-party
  cloud AI, analytics, or tracking by default. Your family's data stays yours.
- **No recurring fees** — built on open-source, self-hostable components.
- **Mobile-first PWA** — usable and installable on iPhone, iPad, and desktop.

> **Project status: Phase 0 (foundation).** This is the runnable application
> shell — a home screen, a health endpoint, the full test/tooling harness, and
> the core architecture. The capture → review → record features arrive in later
> phases. See [`docs/prd.md`](docs/prd.md) and the phase plan.

## Prerequisites

- **Node.js ≥ 20.11** (developed on Node 22)
- **pnpm 10** (`corepack enable` will provide it, or `npm i -g pnpm@10`)
- **Docker** (optional; only needed for PostgreSQL from Phase 1 onward)

No other services are required to run or test Phase 0.

## Quick start

```bash
# 1. Install dependencies
pnpm install

# 2. (optional) copy the environment template — the app runs fine with defaults
cp .env.example .env

# 3. Start the app in development (web on :5173, API on :8787)
pnpm dev
```

Then open **http://localhost:5173**. You should see the SamePage home screen and
a status pill that reads **"Connected to your home system."** The API's health
report is available at **http://localhost:8787/api/health**.

### Run it the way a household would (single server)

In production the API serves the built web app from one port:

```bash
pnpm build      # builds the web app
pnpm start      # serves web + API together on http://localhost:8787
```

## Project layout

```
apps/web    # Vite + React mobile-first PWA (the interface)
apps/api    # Hono API (modular-monolith backend): domain, routes, AI seam
docs        # PRD, architecture (+ diagrams), threat model, ADRs
e2e         # Playwright end-to-end tests
scripts     # tooling (secret scan)
```

See [`docs/architecture.md`](docs/architecture.md) for the full picture and
diagrams, and [`docs/adr/`](docs/adr/) for the decisions behind the stack.

## Everyday commands

| Command              | What it does                                                        |
| -------------------- | ------------------------------------------------------------------- |
| `pnpm dev`           | Run web + API in watch mode                                         |
| `pnpm build`         | Type-check the API and build the web app                            |
| `pnpm start`         | Serve the built app + API on one port (production mode)             |
| `pnpm test`          | Unit + integration tests (Vitest)                                   |
| `pnpm test:e2e`      | End-to-end browser tests (Playwright)                               |
| `pnpm typecheck`     | Strict TypeScript type checking                                     |
| `pnpm lint`          | ESLint                                                              |
| `pnpm format`        | Format with Prettier (`format:check` to verify only)                |
| `pnpm check:secrets` | Fast scan for accidentally committed secrets                        |
| `pnpm verify`        | Everything CI runs: format, lint, types, secrets, tests, build, e2e |

## Testing

- **Unit / integration** tests live next to the code as `*.test.ts` and run with
  Vitest. They are hermetic — no database or AI engine required.
- **End-to-end** tests (Playwright) build the web app and serve it via the API on
  one port, exactly like production, then drive a real browser. In this hosted
  environment Playwright uses the pre-installed Chromium automatically; in
  ordinary CI it installs its own (`pnpm exec playwright install chromium`).
- **AI is tested deterministically** via a built-in fake provider, so the suite
  never depends on a large model being available (see
  [ADR 0002](docs/adr/0002-local-ai-provider-abstraction.md)).

Run the whole gate locally with `pnpm verify`.

## Configuration

SamePage runs with **zero configuration** using safe local-first defaults. To
override anything, copy `.env.example` to `.env` and edit it. Never commit a real
`.env` — only `.env.example` is tracked, and `pnpm check:secrets` guards against
mistakes. Variables for later phases (database, sessions, uploads, local AI) are
documented in `.env.example` but unused in Phase 0.

## Privacy & security

By default, SamePage makes **no external network calls**, sends **no** family
data to any cloud, and includes **no** analytics or tracking. Any cloud AI is
strictly opt-in and off by default. See [`docs/threat-model.md`](docs/threat-model.md).

## License

To be determined by the household/owner. Not yet licensed for redistribution.
