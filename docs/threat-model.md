# SamePage — Threat Model (draft)

**Status:** Draft, started in Phase 0. It evolves as authentication (Phase 1),
uploads (Phase 3+), sync (Phase 8), and especially **secure remote access
(Phase 9)** are implemented. Phase 9 requires a dedicated, expanded version of
this document before any remote-access code is written.

## Assets to protect

- **Family content:** notes, transcriptions, photos/audio/documents (often
  sensitive — medical, financial, children, home address, schedules).
- **Provenance & activity history:** who did/approved what, and originals.
- **Credentials & secrets:** session cookies, password/passkey material,
  `SESSION_SECRET`, database credentials, any future adapter tokens.
- **Availability** of the home system for the two adults.

## Trust boundaries

1. **Browser (PWA) ↔ API** over the network (LAN now; secure remote in Phase 9).
2. **API ↔ PostgreSQL / local file storage** on the home server.
3. **API ↔ local AI engines** (subprocess/local HTTP) on the home server.
4. **API ↔ any optional external adapter** (off by default; opt-in only).

## Primary actors / threats (STRIDE-flavoured)

- **External network attacker.** Wants to reach the home server or intercept
  traffic. _Controls:_ no unauthenticated public exposure; HTTPS everywhere for
  remote access; authenticated sessions; rate limiting; secure headers. Casually
  opening a router port is explicitly forbidden (Phase 9 designs a mesh
  VPN / hardened reverse proxy with a full threat model first).
- **Unauthorized household access.** Someone without an account tries to read or
  modify data. _Controls:_ server-side authentication on every protected route;
  **household isolation enforced on every household-scoped query** (never only in
  the UI); session expiry and logout.
- **Cross-household data leakage** (once multiple households exist). _Controls:_
  every query scoped by household id server-side; tests assert isolation.
- **Malicious or malformed input** (including hostile file uploads and
  adversarial content in captured text/handwriting). _Controls:_ validate all
  untrusted input with Zod; MIME/type and size validation and path-traversal
  protection on uploads (Phase 3); sanitise rendered content; CSRF protection and
  secure cookie settings for state-changing requests; treat AI/OCR-extracted text
  as untrusted data, never as instructions.
- **Over-trusting AI output.** Model output could fabricate obligations, dates,
  or contacts, or be manipulated by content in a captured image. _Controls:_
  strict schema validation of every AI result; AI produces **proposals only**;
  human approval before authoritative records; negation respected; nothing
  invented; provenance retained. _These controls are realised in **Phase 5**,
  when AI proposal records are introduced. Phase 0 implements only the validated
  `AiResult` envelope and a deterministic fake provider — the proposal / approval
  enforcement does not exist yet._
- **Data loss / corruption.** Outage or disk failure destroys work. _Controls:_
  originals always preserved even when processing fails; offline changes queued,
  not lost (Phase 8); tested backup & restore (Phase 10); explicit, non-silent
  conflict handling on sync.
- **Secret exposure.** Secrets committed or logged. _Controls:_ `.env` never
  committed (only `.env.example`); secret-scanning check in CI; no sensitive
  content in logs; secrets provided via environment.
- **Supply chain.** Compromised dependency. _Controls:_ lockfile committed and
  `--frozen-lockfile` in CI; minimal dependencies; pnpm blocks package build
  scripts by default; security-conscious dependency review (deepened in Phase 10).

## Current posture (Phase 0)

Implemented now: secure response headers; Zod-validated configuration with safe
local-first defaults; no secrets in code; secret-scanning check; no external
network calls (the default AI provider is a local deterministic fake); no
analytics/telemetry.

**Not yet implemented (by design, later phases):** authentication & sessions and
server-side authorization (Phase 1); household-isolation enforcement and the
append-only audit / activity history (Phase 1); CSRF and rate limiting (Phase 1);
upload hardening (Phase 3); the **AI proposal → human approval → authoritative
record** enforcement that keeps model output out of authoritative tables
(introduced with AI proposal records in **Phase 5**); offline sync & conflict
handling (Phase 8); and secure remote access (Phase 9). Until Phase 5 the AI seam
is only a validated result envelope (`AiResult`) backed by a deterministic fake
provider; the proposal / approval control above is a **design commitment, not an
implemented safeguard**. These are tracked to their phases and this document is
updated as each lands.

## Explicit non-goals / rules

- No third-party cloud AI, analytics, ads, or tracking by default.
- No sensitive content (note bodies, transcriptions, tokens, passwords) in logs.
- No home server exposed to the public internet without the Phase 9 design,
  authentication, HTTPS, and the owner's explicit approval.
