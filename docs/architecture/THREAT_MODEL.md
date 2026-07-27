# Threat Model Draft — SamePage (Phase 0)

Status: draft for Phase 0. Remote-access hardening is deferred to Phase 9.

## Assets

- Household notes, photos, audio, medical/school/house-hunting details
- Account credentials and session cookies
- Local AI models and derived transcriptions/interpretations
- Backups and exports (future)

## Actors

- Adult household members (authorized)
- Guests on the home network (semi-trusted)
- Remote internet attackers (untrusted)
- Compromised dependencies / supply chain
- Developers and CI agents (trusted for code, **not** for production family data)

## Trust assumptions (Phase 0)

- Development may occur on remote agent/CI machines that must not hold real family data
- Production data plane is household-owned hardware (details currently **unknown**)
- No public registration; one household initially

## Key threats

| ID  | Threat                                             | Initial mitigation direction                                          |
| --- | -------------------------------------------------- | --------------------------------------------------------------------- |
| T1  | Accidental upload of family data to third-party AI | Local adapters only by default; cloud AI disabled                     |
| T2  | Secrets in git                                     | `.env*` gitignored except `.env.example`; secrets check script        |
| T3  | Unauthenticated exposure of home server            | Do not open router ports; Phase 9 remote-access design required first |
| T4  | Cross-household data leak                          | Server-side household isolation from Phase 1                          |
| T5  | XSS via rendered notes                             | Sanitize rendered content in later capture phases                     |
| T6  | Upload path traversal / malware files              | MIME/size limits, safe storage paths (Phase 3+)                       |
| T7  | Session theft                                      | Secure cookies, HTTPS for remote access (Phases 1/9)                  |
| T8  | Silent destructive AI writes                       | Mandatory human review for consequential records                      |

## Out of scope for Phase 0 remediation

Implementing auth, uploads, remote access, and backup encryption. This draft informs ADRs and later phases.
