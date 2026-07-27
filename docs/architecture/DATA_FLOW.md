# Initial Data Flow — SamePage

```mermaid
flowchart TD
  Capture["User: Add Something\ntext / photo / voice / document"]
  Inbox["Shared Inbox item\nraw content + provenance"]
  Jobs["Background jobs\nOCR / transcription / interpretation"]
  Review["Needs Review\nhuman approval"]
  AuthRecords["Authoritative records\ntasks / appointments / decisions / topics"]
  Today["Today view"]
  Changed["What Changed"]

  Capture --> Inbox
  Inbox --> Jobs
  Jobs --> Review
  Review -->|"approve"| AuthRecords
  Review -->|"reject"| Inbox
  AuthRecords --> Today
  AuthRecords --> Changed
  Inbox --> Changed
```

## Phase 0 reality

Phase 0 does **not** implement this flow. It establishes the modular monolith shell and documents the intended path so later phases can add inbox, jobs, and review without rewriting the product shape.

## Provenance rule (future phases)

Original captures (text, images, audio) must be preserved even when downstream AI fails. AI output creates proposals first; authoritative writes happen only after human approval (unless a later trusted automation is explicitly enabled).
