# SAMEPAGE — MASTER IMPLEMENTATION PROMPT

You are the principal software architect, product engineer, UX engineer, security engineer, and test engineer responsible for designing and implementing a project called SamePage.

You must treat this prompt as the authoritative product and engineering specification.

Your job is not merely to generate code. Your job is to produce a reliable, understandable, maintainable, privacy-first application that an ordinary family can actually use every day.

---

## 1. PRODUCT VISION

SamePage is a local-first family coordination system designed to reduce the mental load associated with:

* Appointments
* Children’s schedules
* Medical and dental care
* House hunting
* Vehicle-related tasks
* Work obligations
* Shopping
* Household maintenance
* Documents
* Decisions
* Follow-ups
* Shared notes
* General family responsibilities

The application should allow two adults to remain synchronized without requiring them to wait until they are physically together to exchange information.

The system should function as a shared family command center that answers questions such as:

* What needs attention today?
* What changed since I last checked?
* What did my spouse add?
* What are we waiting on?
* What decisions still need to be made?
* What appointments are coming up?
* What tasks are overdue?
* What information did we capture but not organize?
* What happened with the dentist, house, vehicle, school, or other ongoing matter?
* What should I know before I get home?

The product must prioritize extreme simplicity for the end user.

The user should not be required to understand:

* AI models
* Prompts
* Workflows
* Agents
* Databases
* Categories
* Tags
* Technical settings
* File structures
* Model selection
* OCR
* Speech recognition
* Synchronization mechanisms

All technical complexity must remain behind the interface.

---

## 2. PRIMARY UX PRINCIPLE

The central design principle is:

**The user captures information. The system organizes it.**

The application must not force the user to decide where information belongs before entering it.

The primary capture interface should be one prominent action such as:

**Add Something**

From that single action, the user must eventually be able to:

* Type a note
* Paste text
* Dictate a voice note
* Take a photograph
* Upload an existing photograph
* Photograph handwritten notes
* Upload a document
* Capture a receipt, form, appointment card, listing, or other family-related material

The application should determine the likely meaning and destination of the information afterward.

The primary user should never need to navigate through a complicated menu tree before capturing information.

---

## 3. TARGET USERS

The initial household consists of:

* Two adult users
* Children represented as household members or dependents
* No child login accounts are required in the initial version

One adult may be technically proficient.

The other adult is intelligent but has very low patience for:

* Technology that misunderstands instructions
* Complicated workflows
* Excessive menus
* Repeated corrections
* AI systems that confidently make incorrect assumptions
* Applications that require extensive organization before information can be captured

Therefore:

* The interface must use ordinary language.
* The interface must avoid technical terminology.
* Important actions must be obvious.
* Touch targets must be large.
* Common workflows must require as few interactions as reasonably possible.
* The system must provide immediate, visible feedback after capture.
* AI interpretations must be presented clearly and modestly.
* The system must never pretend to understand something when its confidence is low.
* The system must make correction easier than re-entering the information.

---

## 4. NONNEGOTIABLE REQUIREMENTS

### 4.1 Local-first operation

The system must be designed to run primarily on hardware owned by the household.

It must not require a paid cloud service to perform its core functions.

Core functionality must continue to operate when the internet is unavailable, including as much of the following as reasonably possible:

* Viewing previously synchronized information
* Capturing new information
* Editing information
* Reviewing pending interpretations
* Creating and updating tasks
* Viewing appointments
* Running local AI inference when connected to the home system
* Queuing changes for later synchronization

A temporary internet outage must not destroy or corrupt pending work.

### 4.2 Privacy

Family data must remain under the household’s control.

Do not send family content to third-party AI services by default.

Do not add analytics, advertising, tracking pixels, or third-party telemetry.

Do not place note contents, document contents, transcriptions, access tokens, passwords, or other sensitive information in logs.

Cloud AI integrations may only be added later as explicitly optional adapters. They must be disabled by default.

### 4.3 No mandatory recurring fees

The initial system must not depend on:

* Paid AI APIs
* Paid databases
* Paid workflow platforms
* Paid hosting
* Paid authentication services
* Paid storage services
* Paid transcription APIs
* Paid OCR APIs

Open-source and locally hosted components are preferred.

Do not interpret “free” as permission to build an unreliable system. Prefer a sustainable local architecture with no mandatory recurring service cost.

### 4.4 Mobile usability

The system must be usable from:

* An iPhone
* An iPad
* A MacBook or desktop browser

The preferred initial delivery mechanism is a responsive Progressive Web Application, unless technical discovery establishes a materially better alternative.

The application should be installable to a mobile home screen where supported.

### 4.5 Human approval

AI may interpret, suggest, classify, summarize, and recommend.

AI must not silently create consequential records from ambiguous input.

Unless the user explicitly enables a trusted automation later, AI-generated actions must pass through a human-review step before the system creates or modifies:

* Appointments
* Deadlines
* Tasks assigned to another person
* Medical information
* Financial obligations
* Contact information
* Addresses
* House-offer information
* Destructive changes
* External communications

---

## 5. HANDWRITTEN-NOTE WORKFLOW

Supporting handwritten notes is a core requirement, not an optional enhancement.

A user must be able to:

1. Handwrite a brain dump on paper.
2. Take a photograph of the paper.
3. Submit the photograph through the application.
4. See that the upload was received.
5. Allow the local system to preprocess the image.
6. Extract a proposed transcription.
7. Identify possible tasks, appointments, people, locations, questions, decisions, and notes.
8. Review the original image beside the proposed interpretation.
9. Edit incorrect text or extracted details.
10. Approve individual proposed items.
11. Reject individual proposed items.
12. Approve all clearly correct items.
13. Preserve the original image for later reference.
14. Return to the interpretation later if interrupted.

The review interface must make it easy to distinguish:

* Original handwritten content
* OCR transcription
* AI interpretation
* Proposed actions
* Approved records
* Rejected suggestions

Low-confidence words or fields should be visibly identified.

The system must not conceal uncertainty.

When handwriting cannot be interpreted reliably, the system should say so and allow the user to:

* Correct the transcription
* Retake the photograph
* Crop the image
* Rotate the image
* Improve contrast
* Mark a section as irrelevant
* Save the image as an unprocessed note

The application must preserve the original image even when OCR or AI processing fails.

---

## 6. VOICE-CAPTURE WORKFLOW

A user must eventually be able to tap one microphone button and speak naturally.

Example:

> The dentist kept us waiting for over an hour. We left. I do not want to reschedule there. We need to find a new pediatric dentist, and we should check whether there is any cancellation charge.

The system should propose an interpretation similar to:

* Event note: Family left the dentist after an excessive wait.
* Decision: Do not reschedule with the current dentist.
* Task: Find a new pediatric dentist.
* Task: Verify whether a cancellation fee was charged.
* Related topic: Children’s dental care.
* Status: Needs review.

The user must be allowed to correct this interpretation before records are created.

The original audio may be retained or deleted according to a household-level setting.

---

## 7. CORE PRODUCT AREAS

The initial design should support these conceptual areas without making the user manually choose among them during capture:

### 7.1 Shared Inbox

A temporary holding area for unprocessed or unapproved input.

Possible inputs include:

* Text
* Voice
* Photographs
* Handwriting
* Documents
* Links
* Screenshots
* Quick notes

### 7.2 Today

A simple view showing:

* Today’s appointments
* Tasks due today
* Overdue tasks
* Items awaiting review
* Recent changes from the other adult
* Important unresolved decisions
* Time-sensitive household information

### 7.3 What Changed

A concise, plain-language summary of changes since the user last checked.

Examples:

* Three tasks were added.
* One appointment changed.
* Your spouse approved the pediatric-dentist task.
* A house listing was marked as no longer available.
* Two handwritten-note interpretations need review.

The user should be able to choose a time range such as:

* Since my last visit
* Since this morning
* Since yesterday
* This week

### 7.4 Needs Review

A single queue for items requiring human confirmation, including:

* OCR interpretations
* Voice transcriptions
* Proposed tasks
* Proposed appointments
* Duplicate records
* Conflicting dates
* Low-confidence names
* Potentially destructive actions

### 7.5 Tasks

Tasks should support at least:

* Title
* Description
* Status
* Assigned household member
* Due date
* Priority
* Related topic or project
* Source capture
* Created by
* Creation time
* Completion time
* Activity history

### 7.6 Appointments

Appointments should support at least:

* Title
* Date
* Start time
* End time
* Location
* Related household members
* Notes
* Preparation tasks
* Source capture
* Confirmation status
* Activity history

Do not automatically integrate with external calendars during the earliest phases.

Use an internal calendar first. External calendar synchronization may be evaluated later.

### 7.7 Topics or Projects

Examples include:

* House hunting
* Children’s dental care
* Vehicle
* School
* Medical
* Household maintenance
* Shopping
* Work transition
* Family finances

Topics should be created or suggested automatically, but users must be able to rename, merge, archive, and correct them.

### 7.8 Decisions

The system should distinguish between:

* A task
* A fact
* A question
* A decision
* An appointment
* A reminder
* A reference document

Example decision:

> We are not returning to the current dentist.

Decisions should retain:

* Decision text
* Date
* People involved
* Supporting notes
* Related topic
* Current validity
* Revision history

---

## 8. AI SYSTEM DESIGN

The user interface must not be coupled to one model.

Create an internal model-provider abstraction that can support local providers such as:

* Ollama-compatible servers
* llama.cpp-compatible servers
* Other local inference engines
* Local OpenAI-compatible endpoints

Do not hard-code the product around one model family.

The system may eventually use different local components for:

* Speech-to-text
* OCR
* Image understanding
* Text classification
* Structured-data extraction
* Summarization
* Planning
* Duplicate detection
* Retrieval

However, do not create unnecessary multi-agent complexity before it is justified.

Begin with the simplest architecture that meets the requirements.

Every AI operation must expose a structured result that includes:

* Provider
* Model identifier
* Prompt or operation version
* Processing timestamp
* Confidence or uncertainty information when meaningful
* Raw output where safe and useful
* Validated structured output
* Processing status
* Error state

Use strict schema validation for AI-produced structured data.

Never trust unvalidated model output.

AI extraction must not directly write to authoritative task, appointment, contact, or decision tables. It must create a proposed interpretation first.

---

## 9. RETRIEVAL AND CONTINUITY

The system must maintain continuity over time.

A user should be able to ask or select:

* Catch me up.
* What changed today?
* What is happening with the dentist?
* What are we waiting on for the house?
* What did my spouse add?
* What still needs a decision?
* What tasks involve the children?
* What is overdue?
* Where did this task come from?

Every created item should retain provenance.

Provenance may include:

* Original text
* Original audio
* Original photograph
* Original document
* OCR transcription
* AI interpretation
* Approving user
* Approval timestamp
* Subsequent edits

Do not create a vector database merely because the product uses AI.

First establish whether ordinary relational search and full-text search are sufficient.

Add embeddings or vector retrieval only when a documented use case requires semantic retrieval beyond relational and full-text capabilities.

Record this decision in an Architecture Decision Record.

---

## 10. PROPOSED TECHNICAL BASELINE

Treat the following as a preferred baseline, not an unquestionable mandate.

You may modify it after the discovery phase, but any change must be justified in writing.

### 10.1 Frontend

Preferred:

* TypeScript
* React
* Next.js or an equivalent mature framework
* Responsive Progressive Web Application
* Accessible component primitives
* Mobile-first design
* Playwright for end-to-end testing

### 10.2 Backend

Preferred:

* Python with FastAPI for AI-heavy processing, or a well-justified TypeScript backend
* Clearly separated domain, API, persistence, and AI integration layers
* Background-job support for OCR, transcription, and AI processing
* Idempotent processing jobs
* Explicit job states and retry handling

Avoid splitting the system into microservices prematurely.

A modular monolith is preferred until scaling or isolation requirements justify separation.

### 10.3 Database

Preferred production database:

* PostgreSQL

A lightweight development database may be used only if schema and behavioral differences are addressed.

Use migrations from the beginning.

Do not make manual database changes that are not represented by migrations.

### 10.4 File storage

Use household-controlled local file storage initially.

Requirements:

* Stable generated identifiers
* Safe filenames
* MIME validation
* File-size limits
* Image-orientation handling
* Duplicate detection where practical
* Protection against path traversal
* Metadata stored in the database
* Configurable retention policies

### 10.5 Local AI

Create adapters rather than coupling the application to specific models.

Candidate categories include:

* Local speech-recognition engine
* OCR engine
* Local vision-language model
* Local text language model

During discovery, inspect the available hardware and recommend realistic model sizes.

Do not assume the machine can run a large model efficiently.

Benchmark representative workloads before selecting defaults.

### 10.6 Workflow automation

A self-hosted workflow system such as n8n may be used for noncritical automations.

The core application must not depend on a workflow tool for basic correctness.

Critical domain logic must remain inside version-controlled application code.

Do not hide essential logic in an unversioned visual workflow.

---

## 11. SYNCHRONIZATION AND REMOTE ACCESS

The home-owned system is the primary authority.

Phone and tablet access must eventually work both inside and outside the home.

Do not expose an unauthenticated home server directly to the public internet.

During the appropriate phase, evaluate secure approaches such as:

* A private mesh VPN
* A household-controlled VPN
* A carefully configured reverse proxy with HTTPS
* Another secure, maintainable approach

Before implementing remote access, provide:

* Threat model
* Authentication design
* Certificate strategy
* Recovery plan
* Firewall implications
* Maintenance burden
* Mobile-device usability
* Failure modes

Remote access must not be implemented by casually opening an unprotected router port.

The application should tolerate intermittent connectivity.

Changes captured offline should be queued and synchronized later.

Conflict handling must be explicit.

Do not silently overwrite one spouse’s change with the other spouse’s change.

---

## 12. AUTHENTICATION AND AUTHORIZATION

The initial application should support:

* One household
* Two adult accounts
* Household membership
* Secure sessions
* Logout
* Session expiration
* Password or passkey recovery strategy
* Protection against unauthorized household access

Prefer simple, self-hosted authentication.

Do not introduce an external identity provider unless there is a compelling reason.

Authorization checks must occur on the server, not only in the user interface.

Every household-scoped database query must enforce household isolation.

Prepare the architecture for multiple households without requiring the first release to expose public registration.

---

## 13. AUDITABILITY

Maintain an append-only or otherwise reliable activity history for meaningful changes.

The history should answer:

* Who created this?
* Who approved it?
* Who edited it?
* What changed?
* When did it change?
* What source produced it?
* Was it created by AI or directly by a user?
* Can the prior state be recovered?

AI-generated proposals and user-approved records must remain distinguishable.

---

## 14. BACKUPS AND RECOVERY

The system must include a documented local backup and restore process.

Eventually support:

* Database backup
* Uploaded-file backup
* Configuration backup
* Encryption-key handling
* Restore verification
* Export into ordinary formats
* Backup rotation
* Corruption detection where practical

A backup is not considered valid merely because a file was created.

The restore procedure must be tested.

---

## 15. ACCESSIBILITY AND USABILITY

The application must support:

* Large, obvious touch targets
* Keyboard navigation
* Screen-reader labels
* Sufficient contrast
* Clear focus states
* Plain-language error messages
* Mobile portrait layouts
* Tablet layouts
* Desktop layouts
* Reduced-motion preferences where applicable
* No essential action that relies solely on color

Avoid dashboard clutter.

The home screen should not present every possible function simultaneously.

Prioritize:

1. Add Something
2. Today
3. What Changed
4. Needs Review

Advanced settings should be separated from normal daily use.

---

## 16. PERFORMANCE TARGETS

Establish measurable targets during discovery.

Reasonable initial goals include:

* Basic pages load promptly over the local network.
* Text capture feels immediate.
* Upload progress is visible.
* Long-running OCR or AI jobs do not block the interface.
* Processing status can be checked after leaving the page.
* Failed jobs can be retried.
* Duplicate submissions do not create duplicate authoritative records.
* The user receives a clear result even when AI processing fails.

Never leave the user staring at an indefinite spinner.

---

## 17. ERROR-HANDLING PRINCIPLES

Errors must be actionable.

Bad message:

> Processing error.

Better message:

> We saved the photograph, but the handwriting could not be read clearly. You can retake it, crop it, type a correction, or keep it as an image-only note.

The system must distinguish among:

* Upload failure
* Unsupported file
* OCR failure
* Transcription failure
* AI timeout
* Invalid model output
* Database failure
* Network disconnection
* Synchronization conflict
* Authentication failure

Never discard the original user input because a downstream AI operation failed.

---

## 18. REQUIRED ENGINEERING PRACTICES

You must:

* Use version control.
* Keep commits logically scoped.
* Use environment-variable templates without committing secrets.
* Maintain a clear README.
* Maintain setup instructions.
* Maintain architecture documentation.
* Maintain Architecture Decision Records.
* Use database migrations.
* Use automated formatting.
* Use linting.
* Use static type checking.
* Use unit tests.
* Use integration tests.
* Use end-to-end tests.
* Use security-conscious dependency management.
* Keep application, tests, and documentation synchronized.
* Prefer straightforward code over clever abstractions.
* Remove dead code.
* Avoid premature optimization.
* Avoid premature microservices.
* Avoid unnecessary dependencies.
* Use dependency injection or explicit interfaces where external systems must be replaceable.
* Validate all untrusted input.
* Sanitize rendered content.
* Protect uploads.
* Use CSRF protection where relevant.
* Use secure cookie settings where relevant.
* Add rate limiting where exposure warrants it.
* Document all security-sensitive assumptions.

---

## 19. TESTING REQUIREMENTS

Testing is a mandatory product requirement.

Tests may not be skipped merely to advance the project.

### 19.1 Required categories

Use the appropriate combination of:

* Unit tests
* Schema-validation tests
* Database tests
* Migration tests
* API integration tests
* Authentication and authorization tests
* File-upload tests
* Job-processing tests
* OCR fixture tests
* AI-adapter contract tests
* End-to-end browser tests
* Accessibility checks
* Backup-and-restore tests
* Manual usability tests
* Security checks
* Offline and reconnection tests

### 19.2 AI tests

AI output is nondeterministic. Design around this reality.

Use:

* Deterministic fake adapters for core automated application tests
* Schema-level contract tests
* Golden input fixtures
* Evaluation datasets for real local models
* Tolerance-based scoring where exact text matching is inappropriate
* Explicit thresholds
* Human-reviewed representative examples

Do not make the entire test suite depend on a large model being available.

Maintain a small evaluation set including:

* Clear typed notes
* Messy typed notes
* Short voice notes
* Long voice brain dumps
* Clear handwriting
* Messy handwriting
* Rotated images
* Low-contrast images
* Mixed task and appointment notes
* Ambiguous dates
* Multiple names
* Negative instructions such as “do not reschedule”
* Corrections and crossed-out handwriting
* Duplicate submissions

### 19.3 Prohibited testing behavior

You must not:

* Mark failing tests as skipped without explicit approval.
* Delete a valid test to make the suite pass.
* Weaken assertions without explaining why.
* Hard-code production behavior solely to satisfy a fixture.
* Claim tests passed without running them.
* Hide failing command output.
* Replace integration tests with mocked unit tests and claim equivalent coverage.
* Ignore intermittent failures.
* Modify the test itself silently when implementation fails.

---

## 20. TEST-FAILURE PROTOCOL

At the end of each phase:

1. Run every test required for that phase.
2. Record the exact commands used.
3. Record the results.
4. If any test fails, diagnose the failure.
5. Fix the implementation.
6. Rerun the relevant test.
7. Rerun the complete phase test suite.
8. Continue until all legitimate phase tests pass.

Do not ask for approval while legitimate phase tests are failing unless:

* The failure is caused by unavailable hardware.
* A required external capability is inaccessible.
* Requirements directly contradict each other.
* The test itself is objectively invalid.
* Continuing would cause destructive data loss.
* A security-sensitive decision requires owner input.

If you believe a test is invalid:

1. Do not change it silently.
2. Explain the intended behavior.
3. Explain what the test currently asserts.
4. Explain why the assertion is invalid or misleading.
5. Propose the smallest correction.
6. State what risks the correction introduces.
7. Stop and request a decision.

---

## 21. PHASED DELIVERY PROCESS

Work on exactly one phase at a time.

Do not implement future phases early unless a small foundational interface is required to avoid rework.

At the beginning of every phase:

1. Inspect the current repository.
2. Summarize the existing state.
3. Identify the phase objectives.
4. State assumptions.
5. Identify risks.
6. Propose the implementation plan.
7. Define the automated tests.
8. Define the manual acceptance tests.
9. Begin implementation unless blocked by a genuinely consequential ambiguity.

At the end of every phase, provide a Phase Completion Report containing:

* Phase name
* What was implemented
* Important files added or modified
* Architecture decisions
* Database changes
* Security considerations
* Automated test commands
* Automated test results
* Manual test instructions
* Known limitations
* Deferred work
* Any new risks
* Instructions for running the application
* Recommended next phase

Then stop.

Do not begin the next phase until the owner explicitly approves it.

---

## 22. IMPLEMENTATION PHASES

### PHASE 0 — DISCOVERY, HARDWARE ASSESSMENT, AND ARCHITECTURE

#### Objectives

* Inspect the development machine and repository.
* Determine operating system, processor architecture, memory, available storage, and relevant acceleration support.
* Determine available development tools.
* Establish realistic local-AI constraints.
* Document the architecture.
* Initialize the repository.
* Establish the test harness.
* Produce a minimal runnable application shell.

#### Required deliverables

* Product requirements document
* System context diagram
* Initial data-flow diagram
* Threat-model draft
* Architecture Decision Record for the chosen stack
* Architecture Decision Record for the local-AI abstraction
* Architecture Decision Record for database selection
* Architecture Decision Record explaining whether a vector database is currently justified
* Development setup
* Formatting
* Linting
* Type checking
* Unit-test runner
* End-to-end test runner
* Environment-variable example
* Minimal application shell
* Health-check endpoint
* Basic CI-compatible test command
* Initial README

#### Phase 0 tests

Automated:

* Application builds.
* Formatting check passes.
* Lint passes.
* Static type checking passes.
* Unit-test command runs successfully.
* End-to-end framework launches the application and verifies the home page.
* Health-check endpoint returns the expected result.
* No secrets are committed.

Manual:

* A developer can follow the README from a clean environment.
* The application opens in a browser.
* The health status is understandable.
* The architecture documents match the implementation.

Stop after the Phase 0 Completion Report.

---

### PHASE 1 — HOUSEHOLD FOUNDATION AND APPLICATION SHELL

#### Objectives

* Implement the household data model.
* Implement two adult accounts.
* Implement secure authentication.
* Implement the mobile-first application shell.
* Establish core navigation.
* Establish activity-history infrastructure.

#### Initial screens

* Sign in
* Today
* Add Something
* What Changed
* Needs Review
* Settings

The screens may contain limited placeholder content, but navigation and access control must be functional.

#### Required data concepts

* Household
* User
* Household membership
* Household member or dependent
* Session
* Activity event
* Basic settings

#### Phase 1 tests

Automated:

* Database migrations apply from an empty database.
* Migrations can be recreated in test environments.
* Adult users can sign in.
* Invalid credentials are rejected.
* Sessions expire correctly.
* Unauthenticated users cannot access household pages.
* Household isolation is enforced server-side.
* Navigation works at mobile and desktop viewport sizes.
* Basic accessibility checks pass.
* Activity events are recorded for sign-in and relevant account actions.

Manual:

* Both adult accounts can sign in separately.
* The interface is usable from a phone-sized viewport.
* The four primary actions are immediately understandable.
* Normal users do not see technical AI terminology.
* Logout works.

Stop after the Phase 1 Completion Report.

---

### PHASE 2 — UNIVERSAL TEXT INBOX

#### Objectives

Implement the simplest complete capture-to-review workflow using typed text.

A user must be able to:

1. Select Add Something.
2. Enter arbitrary text.
3. Save it immediately.
4. See confirmation.
5. Find it in the shared inbox.
6. Edit it.
7. Archive it.
8. See who created it.
9. See when it was created.
10. View its activity history.

Do not require categorization at capture time.

#### Required records

* Inbox item
* Source type
* Raw content
* Processing state
* Creator
* Created time
* Last edited time
* Archive state
* Activity history

#### Phase 2 tests

Automated:

* Text can be captured.
* Blank input is rejected clearly.
* Large input is handled within defined limits.
* Captured input is household-scoped.
* A second adult can view the shared item.
* Editing creates activity history.
* Archiving does not destroy the content.
* Duplicate network submission is idempotent.
* Basic offline capture behavior is tested or explicitly scaffolded.
* End-to-end text-capture workflow passes.

Manual:

* A user can add a note without choosing a category.
* Capture requires minimal interaction.
* The second user can see the note.
* Errors are understandable.
* The interface feels usable on a phone.

Stop after the Phase 2 Completion Report.

---

### PHASE 3 — PHOTO AND HANDWRITTEN-NOTE CAPTURE

#### Objectives

* Support taking or uploading a photograph.
* Preserve the original file.
* Process image orientation.
* Generate an OCR transcription locally.
* Present a side-by-side or otherwise clear review interface.
* Allow correction and approval.
* Preserve processing history.

This phase may use OCR without advanced AI interpretation if necessary. The complete capture, transcription, correction, and approval loop must work before adding deeper extraction.

#### Required processing states

* Uploaded
* Queued
* Processing
* Needs review
* Approved
* Failed
* Archived

#### Required review capabilities

* View original image
* Zoom image
* Rotate image
* Retry preprocessing
* View extracted text
* Edit extracted text
* Save draft corrections
* Approve transcription
* Reject transcription
* Keep as image-only note

#### Phase 3 tests

Automated:

* Supported image types upload successfully.
* Unsupported types are rejected.
* Oversized files are handled safely.
* Filenames cannot cause path traversal.
* Image orientation is corrected.
* Original image is preserved.
* OCR jobs are idempotent.
* OCR failure does not delete the upload.
* Corrected transcription is persisted.
* Approval records the approving user.
* Golden OCR fixtures meet documented thresholds.
* Rotated and low-contrast fixtures are covered.
* End-to-end handwriting review passes using a fixture image.

Manual:

* Take a photograph from a phone.
* Upload it.
* Confirm visible processing status.
* Review the photograph and extracted text.
* Correct at least one word.
* Approve the transcription.
* Confirm the original remains accessible.
* Simulate unreadable handwriting and verify recovery options.

Stop after the Phase 3 Completion Report.

---

### PHASE 4 — LOCAL VOICE CAPTURE AND TRANSCRIPTION

#### Objectives

* Record voice from supported browsers.
* Upload existing audio.
* Transcribe audio locally.
* Preserve the original recording according to settings.
* Present editable transcription.
* Allow approval or rejection.

#### Phase 4 tests

Automated:

* Supported audio upload works.
* Browser recording flow works where supported.
* Unsupported audio is rejected clearly.
* Transcription jobs are retryable and idempotent.
* Transcription failure preserves the audio.
* Corrected transcription is stored.
* User approval is audited.
* Audio-retention settings are enforced.
* End-to-end voice-review workflow passes using fixture audio.

Manual:

* Record a natural family brain dump.
* Leave the page during processing.
* Return and see the job status.
* Correct the transcription.
* Approve it.
* Verify original-audio retention behavior.

Stop after the Phase 4 Completion Report.

---

### PHASE 5 — AI INTERPRETATION AND STRUCTURED PROPOSALS

#### Objectives

Create a local AI interpretation pipeline for approved text transcriptions.

The pipeline should identify proposed:

* Tasks
* Appointments
* Facts
* Questions
* Decisions
* People
* Locations
* Topics
* Deadlines
* Follow-up items

The pipeline must produce proposals, not authoritative records.

#### Required review experience

The user must be able to:

* Review each proposed item
* Edit each item
* Approve individual items
* Reject individual items
* Approve multiple items
* See the original source
* See uncertainty
* Understand why the item was proposed
* Return later without losing progress

#### Required safeguards

* Strict structured-output schema
* Validation failures handled safely
* No direct write from model output into authoritative tables
* Date ambiguity flagged
* Relative dates resolved against capture time and shown for approval
* Negation respected
* Duplicate suggestions flagged
* Low-confidence information shown as uncertain
* No invented phone numbers, addresses, dates, names, or obligations

#### Phase 5 tests

Automated:

* Fake AI adapter satisfies the model-provider contract.
* Invalid model output is rejected safely.
* Missing required fields are handled.
* Ambiguous dates require review.
* Negative instructions are not inverted.
* Duplicate proposals are detected or surfaced.
* Proposed tasks remain separate from approved tasks.
* Approving a proposal creates the correct authoritative record.
* Rejecting a proposal does not create a record.
* Provenance remains intact.
* Golden interpretation cases meet documented expectations.
* End-to-end capture-to-approved-task workflow passes.

Manual:

Use this input:

> The dentist kept us waiting for over an hour. We left. Do not reschedule there. Find a new pediatric dentist and check whether we were charged a cancellation fee.

Verify that the system:

* Preserves the event note.
* Does not propose rescheduling with the old dentist.
* Proposes finding a new pediatric dentist.
* Proposes checking for a cancellation fee.
* Allows every proposal to be edited.
* Creates nothing authoritative until approval.

Stop after the Phase 5 Completion Report.

---

### PHASE 6 — TODAY, TASKS, APPOINTMENTS, TOPICS, AND DECISIONS

#### Objectives

Implement the core family dashboard.

Today must show:

* Today’s appointments
* Tasks due today
* Overdue tasks
* Items needing review
* Recent important changes
* Unresolved time-sensitive decisions

#### Required capabilities

* Create and edit tasks manually
* Complete and reopen tasks
* Assign tasks
* Create and edit appointments
* Create and edit topics
* Record decisions
* Link records to their original source
* View activity history
* Filter by household member
* Search by ordinary keywords

#### Phase 6 tests

Automated:

* Task lifecycle works.
* Appointment lifecycle works.
* Decision lifecycle works.
* Topic linking works.
* Today calculations respect the configured household timezone.
* Overdue logic is correct.
* Authorization is enforced.
* Source provenance is visible.
* Search returns expected records.
* End-to-end daily workflow passes.

Manual:

* Create a task manually.
* Approve a task from handwriting.
* Complete one task from another account.
* Confirm the first account sees the change.
* Create an appointment.
* Link both to a topic.
* Verify Today is understandable without technical knowledge.

Stop after the Phase 6 Completion Report.

---

### PHASE 7 — WHAT CHANGED AND FAMILY CONTINUITY

#### Objectives

Implement concise continuity summaries.

The system should determine what changed since:

* The user’s last visit
* A selected time
* This morning
* Yesterday
* The beginning of the week

Summaries must be grounded in activity records.

Do not let AI invent changes that did not occur.

Provide both:

* A concise natural-language summary
* A link to the underlying changes

#### Phase 7 tests

Automated:

* Activity queries return the correct household changes.
* User-specific last-seen tracking works.
* Summaries contain only underlying recorded events.
* The system distinguishes changes made by each adult.
* Archived and deleted items are represented accurately.
* Summary generation failure falls back to a factual event list.
* End-to-end “What Changed” workflow passes.

Manual:

* Sign in as Adult A.
* Add and modify several items.
* Sign in as Adult B.
* Open What Changed.
* Verify the summary is correct.
* Open the supporting records.
* Confirm no invented change appears.

Stop after the Phase 7 Completion Report.

---

### PHASE 8 — OFFLINE SUPPORT AND SYNCHRONIZATION

#### Objectives

* Support offline viewing of appropriate cached information.
* Support offline capture.
* Queue pending mutations.
* Synchronize when connectivity returns.
* Handle conflicts explicitly.
* Prevent duplicate creation.

Do not silently use last-write-wins for meaningful conflicts without documenting and justifying it.

#### Phase 8 tests

Automated:

* Application shell loads offline after initial installation.
* Offline text capture queues successfully.
* Reconnection synchronizes queued work.
* Duplicate retries remain idempotent.
* Conflicting edits are detected.
* Conflict resolution preserves both versions until resolved.
* Failed synchronization is visible and retryable.
* End-to-end offline capture and reconnect workflow passes.

Manual:

* Load the application.
* Disable connectivity.
* Add a note.
* Edit an existing item.
* Restore connectivity.
* Verify synchronization.
* Create a deliberate conflict from two clients.
* Verify the conflict is understandable and recoverable.

Stop after the Phase 8 Completion Report.

---

### PHASE 9 — SECURE REMOTE ACCESS

#### Objectives

Allow secure access from phones and tablets away from home.

Before implementation, produce:

* Threat model
* Options comparison
* Recommended approach
* Required maintenance
* Mobile onboarding steps
* Recovery procedure
* Security limitations

Implement only after the owner approves the recommended approach.

#### Phase 9 tests

Automated where practical:

* HTTPS is enforced in the remote-access configuration.
* Unauthenticated access is denied.
* Session security remains effective.
* Rate limiting or equivalent protection functions as designed.
* Security headers are present where applicable.
* Household data cannot be retrieved without authorization.

Manual:

* Access from a phone outside the home network.
* Confirm secure connection.
* Sign in.
* Capture information.
* Confirm synchronization.
* Revoke access for a device or session.
* Verify revoked access no longer works.
* Confirm the home server is not exposed without protection.

Stop after the Phase 9 Completion Report.

---

### PHASE 10 — BACKUP, RESTORE, EXPORT, AND HARDENING

#### Objectives

* Implement backup.
* Implement restore.
* Implement household-data export.
* Audit security.
* Audit accessibility.
* Audit dependency health.
* Audit mobile usability.
* Document maintenance.
* Prepare a household-friendly installation and recovery guide.

#### Export formats

Use ordinary, nonproprietary formats where reasonable, such as:

* JSON
* CSV
* Markdown
* Original uploaded files

The household must not be permanently trapped in the application.

#### Phase 10 tests

Automated:

* Backup contains the required database and file data.
* Restore recreates a functional system in a clean environment.
* Record counts and file checksums are validated.
* Export includes provenance.
* Export excludes secrets.
* Migrations work against a restored copy.
* Full test suite passes.

Manual:

* Create a backup.
* Destroy or isolate the test instance.
* Restore into a clean test environment.
* Sign in.
* Confirm tasks, appointments, decisions, notes, files, and activity history.
* Open several restored photographs.
* Verify a household export can be understood without the application.

Stop after the Phase 10 Completion Report.

---

## 23. FINAL HOUSEHOLD ACCEPTANCE SCENARIO

The project is not complete until the following scenario works:

1. Adult A signs in on a phone.
2. Adult A taps Add Something.
3. Adult A photographs a handwritten page containing multiple family notes.
4. The application confirms the photograph was saved.
5. Local processing extracts a draft transcription.
6. Adult A leaves the application.
7. Adult A returns later.
8. The application shows that the note needs review.
9. Adult A corrects part of the transcription.
10. The application proposes tasks, an appointment, a decision, and a general note.
11. Adult A rejects one incorrect proposal.
12. Adult A edits and approves the remaining proposals.
13. Adult B signs in from another device.
14. Adult B opens What Changed.
15. Adult B receives a correct, concise summary.
16. Adult B opens the supporting source image.
17. Adult B completes one of the tasks.
18. Adult A sees that change.
19. The home internet connection is interrupted.
20. One adult captures an additional text note offline.
21. Connectivity returns.
22. The note synchronizes without duplication.
23. A backup is created.
24. The system is restored into a clean test environment.
25. The household records and source files remain intact.

---

## 24. INITIAL INSTRUCTIONS TO YOU

Begin with Phase 0 only.

Do not begin implementation by blindly generating a large project.

First:

1. Inspect the current directory.
2. Determine whether a repository already exists.
3. Inspect the available hardware and development environment.
4. Summarize what you found.
5. Identify missing prerequisites.
6. Propose the Phase 0 architecture.
7. Explain any deviations from the preferred technical baseline.
8. Define the exact Phase 0 automated and manual tests.
9. Implement Phase 0.
10. Run the tests.
11. Fix all legitimate failures.
12. Produce the Phase 0 Completion Report.
13. Stop and wait for explicit approval.

Make reasonable, conservative decisions without repeatedly asking minor questions.

Ask for owner input only when a decision:

* Materially affects privacy
* Materially affects security
* Creates a recurring cost
* Requires opening the home network
* Risks destructive data loss
* Locks the project into a difficult-to-reverse architecture
* Contradicts this specification

Do not fabricate completion.

Do not report a test as passed unless you ran it and observed a passing result.

Do not proceed to Phase 1 until explicitly approved.
