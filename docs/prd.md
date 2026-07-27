# SamePage — Product Requirements

## Vision

SamePage is a **local-first family coordination system** — a calm, private
"command center" that reduces the mental load of running a household. It lets
two adults stay in sync without waiting until they are physically together, by
capturing appointments, children's schedules, medical/dental care, house
hunting, vehicle and work tasks, shopping, maintenance, documents, decisions,
follow-ups, and shared notes in one place.

It answers everyday questions such as: _What needs attention today? What changed
since I last checked? What did my spouse add? What are we waiting on? What still
needs a decision? What's happening with the dentist / house / vehicle / school?_

## Who it is for

- **Two adults** in one household. One may be technically proficient; the other
  is intelligent but has low patience for fiddly technology, confident-but-wrong
  AI, and apps that demand organisation before you can capture anything.
- **Children** are represented as household members/dependents — **no child
  logins** in the initial version.

## The central UX principle

> **The user captures information. The system organises it.**

One prominent action — **Add Something** — accepts a typed note, pasted text, a
dictated voice memo, or a photo (including handwriting, receipts, forms,
listings). The user **never** has to choose a category, tag, or destination
before capturing. The system proposes structure afterward; a human approves it.

The interface uses ordinary language, hides all technical complexity (models,
prompts, OCR, sync, databases), uses large touch targets, gives immediate
feedback, and makes **correcting** an interpretation easier than re-entering it.
It never pretends to understand something when confidence is low.

## Non-negotiable requirements

1. **Local-first.** Core functions run on household hardware and keep working
   offline (viewing synced data, capturing, editing, reviewing, queuing changes).
   A temporary outage never destroys pending work.
2. **Privacy.** Family data stays under household control. No third-party cloud
   AI by default; no analytics, ads, tracking, or third-party telemetry. No note
   contents, transcriptions, tokens, or passwords in logs. Cloud AI is only ever
   an explicitly opt-in, off-by-default adapter.
3. **No mandatory recurring fees.** No paid APIs, databases, workflow platforms,
   hosting, auth, storage, transcription, or OCR services required. Prefer
   open-source, locally hosted components — without sacrificing reliability.
4. **Mobile usability.** Usable from iPhone, iPad, and desktop browsers as a
   responsive, installable PWA.
5. **Human approval.** AI may interpret, suggest, classify, summarise, and
   recommend, but must not silently create consequential records (appointments,
   deadlines, tasks for others, medical/financial info, contacts, addresses,
   offers, destructive changes, external messages) from ambiguous input. These
   pass through human review unless the owner later enables trusted automation.

## Core product areas

- **Shared Inbox** — a holding area for unprocessed/unapproved input of any kind.
- **Today** — appointments, tasks due/overdue, items to review, recent changes
  from the other adult, unresolved time-sensitive decisions.
- **What Changed** — a concise, plain-language, _grounded_ summary since a chosen
  time (last visit / this morning / yesterday / this week), linked to the
  underlying changes. AI may phrase it but may not invent changes.
- **Needs Review** — one queue for anything awaiting human confirmation (OCR/voice
  transcriptions, proposed tasks/appointments, duplicates, ambiguous dates,
  low-confidence names, potentially destructive actions).
- **Tasks, Appointments, Topics/Projects, Decisions** — the authoritative records,
  each with provenance and activity history. The system distinguishes a task
  from a fact, a question, a decision, an appointment, a reminder, and a
  reference document.

## Capture workflows (highlights)

- **Handwriting** (core, not optional): photograph a page → confirm receipt →
  preprocess → OCR transcription → identify possible tasks/appointments/people/
  places/questions/decisions/notes → review original beside interpretation →
  edit → approve/reject per item → original image always preserved, even on
  failure; uncertainty is shown, never hidden; recovery options (retake, crop,
  rotate, improve contrast, keep as image-only note) are offered.
- **Voice**: one tap to record natural speech → local transcription → editable
  proposal (event note, decisions, tasks) → human approval; original audio kept
  or deleted per a household setting.

## AI system requirements

- The UI is **not coupled to one model**; a `ModelProvider` abstraction supports
  local engines (Ollama/llama.cpp/OpenAI-compatible local endpoints, plus OCR and
  speech binaries). Start simple; avoid premature multi-agent complexity.
- Every AI operation returns a **structured, validated** result: provider, model,
  operation version, timestamp, confidence/uncertainty, raw + validated output,
  status, error. Unvalidated output is never trusted, and never writes directly
  to authoritative tables — it becomes a proposal.
- Relative dates are resolved against capture time and shown for approval;
  ambiguous dates are flagged; **negation is respected** ("do not reschedule");
  duplicates are surfaced; nothing (phone numbers, addresses, dates, names,
  obligations) is invented.

## Continuity, provenance & auditability

- Every created item retains provenance: original text/audio/photo/document, OCR
  transcription, AI interpretation, approving user, approval time, later edits.
- A reliable, append-only-style activity history answers who created/approved/
  edited what, when, from which source, and whether it was AI- or human-made —
  with AI proposals and approved records always distinguishable.

## Accessibility & performance

- Large touch targets, keyboard navigation, screen-reader labels, sufficient
  contrast, clear focus, plain-language errors, portrait/tablet/desktop layouts,
  reduced-motion support, and **no essential action that relies on colour alone**.
- Pages load promptly on the local network; capture feels immediate; uploads show
  progress; long OCR/AI jobs run in the background and never block the UI or leave
  the user on an indefinite spinner; failed jobs are retryable; duplicate
  submissions never create duplicate authoritative records.

## Explicitly out of scope for early phases

- External calendar sync (use an internal calendar first).
- Cloud AI, multi-agent orchestration, and vector search (see ADR 0004) until a
  documented need justifies them.
- Public registration and multi-tenant onboarding (architecture is prepared for
  multiple households, but the first release does not expose public sign-up).

## Phasing

Delivery is strictly phased (0–10), one phase at a time, each ending in a
completion report and an explicit owner approval gate. This document covers the
product intent; per-phase objectives, tests, and acceptance criteria live in the
master specification and the phase completion reports.

## Definition of done (household acceptance)

The project is complete when the full acceptance scenario works end to end:
photograph a handwritten page on a phone → confirmation → local transcription →
leave and return → review flags it → correct the transcription → the system
proposes tasks + an appointment + a decision + a note → reject one, edit and
approve the rest → the other adult sees a correct "What Changed" summary and the
source image, completes a task → the first adult sees the change → capture a note
offline during an outage → it syncs without duplication on reconnect → a backup
is taken and restored into a clean environment with records and files intact.
