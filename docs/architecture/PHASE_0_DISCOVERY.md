# Phase 0 Discovery Notes

## Environments distinguished

SamePage has at least two different environments. They must not be conflated.

| Environment                                                                | Role                                                                                           | Status in Phase 0           |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------- |
| **Cursor cloud agent container**                                           | Remote Linux development/CI-like workspace used to implement and test Phase 0                  | Inspected below             |
| **Household deployment hardware** (intended: MacBook and/or home computer) | Future primary authority for local-first operation, local AI, file storage, and household data | **Unknown — not inspected** |

This Phase 0 work ran inside the Cursor agent environment. That environment is **not** the household’s deployment hardware. Do not size local models, storage, or always-on services based on the agent container alone.

## Cursor agent environment (inspected)

Observed on 2026-07-27 during Phase 0:

| Fact               | Value                                                               |
| ------------------ | ------------------------------------------------------------------- |
| Context markers    | `/.dockerenv` present; hostname `cursor`; `CURSOR_AGENT=1`          |
| OS                 | Ubuntu 24.04.4 LTS (Noble), Linux kernel 6.12.94+, x86_64           |
| Virtualization     | KVM guest (`Hypervisor vendor: KVM`)                                |
| CPU                | 4× Intel Xeon (virtualized); AVX-512 flags present                  |
| Memory             | ~15 GiB total; ~14 GiB available at inspection                      |
| Disk               | Overlay filesystem ~252G, ~236G available on `/`                    |
| GPU / acceleration | `nvidia-smi` unavailable; no `/dev/dri`; **no usable GPU observed** |
| Node.js            | v22.x                                                               |
| Package managers   | npm, pnpm, yarn available                                           |
| Python             | 3.12.3 + pip                                                        |
| Other tools        | git, ffmpeg, curl, make present                                     |
| Not observed       | Docker CLI, PostgreSQL client/server, Tesseract, Ollama, Redis      |

### Local-AI constraints implied by the agent environment

- Suitable for application development, automated tests, and fake/deterministic AI adapters
- **Not** a reliable proxy for household GPU or Apple Silicon Neural Engine capacity
- Do not choose default production model sizes from this container

## Household / MacBook hardware (unknown)

The following are **unknown** and must be recorded on the actual home machine before locking local-AI defaults:

- Exact MacBook / desktop model
- Chip (Apple Silicon generation vs Intel)
- Unified/system memory size
- Available free disk for models, uploads, and backups
- GPU / Neural Engine / Core ML availability
- Whether the home server will be the MacBook itself or a separate always-on machine
- Local network topology and whether Tailscale/VPN is already used
- Preferred install location for PostgreSQL data and file storage

**Action for owner (before Phase 3–5 model defaults):** run a short hardware inventory on the home computer and attach results to an ADR update. Until then, local AI remains adapter-only with fake providers in tests.

## Repository state before Phase 0 implementation

- Git repository: `J-u-s-t-J-o-s-h/SamePage`
- Existing files: `AGENTS.md`, `README.md`, `docs/PRODUCT_SPEC.md`
- No application code yet
- Branching: Phase 0 implemented on `cursor/phase-0-discovery-d172`

## Development tools chosen for Phase 0

| Concern         | Choice                                          |
| --------------- | ----------------------------------------------- |
| Runtime app     | Next.js 16 (App Router) + React 19 + TypeScript |
| Package manager | pnpm                                            |
| Format          | Prettier                                        |
| Lint            | ESLint (`eslint-config-next`)                   |
| Types           | `tsc --noEmit`                                  |
| Unit tests      | Vitest                                          |
| E2E tests       | Playwright                                      |
| Secrets guard   | `scripts/check-no-secrets.mjs`                  |
