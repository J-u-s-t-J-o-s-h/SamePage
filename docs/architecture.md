# SamePage — Architecture

This document describes the system as of **Phase 0** and the shape it grows into.
It is kept in sync with the code; where something is not built yet, it says so.

## Guiding principles

- **Local-first & private.** Runs on household-owned hardware. No third-party
  cloud AI, analytics, or telemetry by default. Family content never leaves the
  home system unless the owner explicitly enables an optional adapter later.
- **Capture first, organise later.** The user captures; the system proposes
  structure; a human approves before authoritative records are created.
- **Simplest thing that works.** A modular monolith, not microservices. New
  infrastructure is added only when a documented need justifies it.
- **Never trust model output.** Every AI result is schema-validated. Once AI
  proposals are introduced (Phase 5), model output can reach an authoritative
  record only through explicit human approval — never by writing to an
  authoritative table directly. Phase 0 builds only the validated result
  envelope, not that approval boundary.

## Stack (see ADR 0001)

| Concern            | Choice                                               |
| ------------------ | ---------------------------------------------------- |
| Language           | TypeScript everywhere                                |
| Web app            | Vite + React (mobile-first PWA)                      |
| API                | Hono on Node (modular monolith)                      |
| Validation         | Zod at every trust boundary                          |
| Database (Phase 1) | PostgreSQL + versioned migrations (ADR 0003)         |
| Vectors            | None yet; `pgvector` only if justified (ADR 0004)    |
| AI                 | `ModelProvider` abstraction; Fake default (ADR 0002) |
| Unit/integration   | Vitest                                               |
| End-to-end         | Playwright                                           |
| Tooling            | ESLint + Prettier + `tsc` (strict)                   |

## Repository layout

```
samepage/
├─ apps/
│  ├─ api/                 # Hono modular-monolith backend
│  │  └─ src/
│  │     ├─ ai/            # ModelProvider abstraction + Fake provider (ADR 0002)
│  │     ├─ health/        # Health domain (pure functions)
│  │     ├─ routes/        # HTTP routes (adapters over the domain)
│  │     ├─ app.ts         # Hono app factory (testable via app.request)
│  │     ├─ config.ts      # Zod-validated env config, safe defaults
│  │     └─ index.ts       # Node server entry; serves web in production
│  └─ web/                 # Vite + React PWA (mobile-first)
│     ├─ public/           # manifest + icons
│     └─ src/
│        ├─ lib/           # framework-free helpers (health, status wording)
│        ├─ App.tsx        # home shell
│        └─ main.tsx       # entry
├─ docs/
│  ├─ prd.md               # product requirements
│  ├─ architecture.md      # this file
│  ├─ threat-model.md      # threat model (draft, evolves through Phase 9)
│  └─ adr/                 # architecture decision records
├─ e2e/                    # Playwright end-to-end tests
├─ scripts/                # tooling (secret scan)
├─ docker-compose.yml      # local Postgres for Phase 1+ (not needed in Phase 0)
└─ (workspace + tooling config at root)
```

## System context (Phase 0 → target)

```mermaid
flowchart TB
  subgraph Devices["Household devices"]
    A["Adult A — phone / tablet / laptop (PWA)"]
    B["Adult B — phone / tablet / laptop (PWA)"]
  end

  subgraph Home["Home server (household-owned hardware)"]
    API["SamePage API (Hono)\n+ served web app"]
    DB[("PostgreSQL\n(Phase 1+)")]
    FS["Local file storage\n(originals: photos/audio/docs — Phase 3+)"]
    subgraph AI["Local AI engines (optional, off by default)"]
      OLL["LLM engine\n(Ollama / llama.cpp — Phase 5)"]
      OCR["OCR engine\n(tesseract — Phase 3)"]
      STT["Speech-to-text\n(whisper.cpp — Phase 4)"]
    end
  end

  A -- HTTPS --> API
  B -- HTTPS --> API
  API --> DB
  API --> FS
  API -- local HTTP/CLI --> OLL
  API -- local CLI --> OCR
  API -- local CLI --> STT

  X["Third-party cloud AI / analytics"]:::ext
  API -. "disabled by default (opt-in adapters only)" .-> X

  classDef ext stroke-dasharray: 5 5,color:#b42318,stroke:#b42318;
```

In **Phase 0**, only the API + served web app + the health endpoint exist; the
database, file storage, and AI engines are documented seams, not yet wired.

## Runtime topology

- **Development:** Vite serves the web app on `:5173` and proxies `/api/*` to the
  Hono API on `:8787`. Run both with `pnpm dev`.
- **Production (home server):** the web app is built to static assets and the
  Hono API serves them from the **same origin and port** alongside `/api/*`.
  One process, one port (`pnpm build && pnpm start`). This mirrors what the e2e
  suite exercises.

## Data flow — capture → review → authoritative record (target)

This is the core product loop; Phase 0 lays the seams, later phases fill it in.

```mermaid
sequenceDiagram
  autonumber
  actor U as Household adult
  participant W as Web PWA
  participant API as API (Hono)
  participant ST as File storage
  participant Q as Job queue (Phase 3+)
  participant AI as ModelProvider (Fake now; local engine later)
  participant DB as PostgreSQL

  U->>W: Add Something (text / photo / voice)
  W->>API: POST capture
  API->>ST: store original (photo/audio/doc)
  API->>DB: create Inbox item (state: uploaded) + activity event
  API-->>W: confirmation (item id, status)
  API->>Q: enqueue processing job (idempotent)
  Q->>AI: run operation (OCR / transcribe / extract)
  AI-->>Q: AiResult envelope (validated, with confidence)
  Q->>DB: store PROPOSAL (never an authoritative record)
  U->>W: open Needs Review
  W->>API: fetch proposals
  API-->>W: proposals + original + uncertainty
  U->>W: edit / approve / reject
  W->>API: approve item(s)
  API->>DB: create authoritative record(s) + activity event (who/when/source)
```

Key invariants, each enforced only when the phase that introduces its data
lands. **Phase 0 implements none of them yet — it lays the seams:**

- **Household isolation** — every household-scoped query is scoped server-side,
  never only in the UI. Established with persistence and authorization in
  **Phase 1**.
- **Audit / activity history** — who created, approved, or edited what, when, and
  from which source is recorded append-only. Infrastructure lands in **Phase 1**.
- The **original** capture is always preserved, even if downstream AI fails.
  Lands with uploads in **Phase 3**.
- Jobs are **idempotent**; duplicate submissions do not create duplicate
  authoritative records. Lands with the processing queue in **Phase 3**.
- AI produces **proposals**, never authoritative records; a task, appointment,
  decision, or contact is created only by an explicit human approval, recorded
  with provenance (who approved, when, from which source). This
  proposal-vs-approved boundary is realised when **AI proposal records are
  introduced, in Phase 5**; Phase 1's schema only reserves a clean separation for
  it and does not yet enforce it.

## Health & observability (Phase 0)

`GET /api/health` returns a structured report — overall status, service,
version, environment, timestamp, uptime, and a list of individual checks
(worst-status-wins roll-up). The web shell calls it and shows a plain-language
connection indicator ("Connected to your home system"). Domain logic lives in
pure functions (`health/health.ts`) so it is deterministic and unit-tested;
the route is a thin adapter. Checks (database, storage, AI availability) are
added as those subsystems come online.

## Security posture (Phase 0, grows through Phase 9)

- `hono/secure-headers` applies safe default response headers.
- Config is validated with Zod; the app runs with safe local-first defaults and
  no secrets in code. A secret-scanning check (`pnpm check:secrets`) guards
  commits.
- No family content, note bodies, transcriptions, or tokens are written to logs.
- **Phase 1** establishes persistence, authentication and server-side
  authorization, household-isolation enforcement, and the audit / activity-history
  infrastructure; CSRF and rate limiting arrive with it. The **AI proposal →
  approved-record** safety boundary is implemented when AI proposal records are
  introduced (**Phase 5**); the Phase 1 schema is designed to preserve that
  boundary cleanly but does not yet enforce it. Secure remote access is designed
  and gated in **Phase 9**. See `threat-model.md`.
