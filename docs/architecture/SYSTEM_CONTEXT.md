# System Context — SamePage

```mermaid
flowchart LR
  subgraph HouseholdDevices["Household devices"]
    PhoneA["Adult A phone"]
    PhoneB["Adult B phone"]
    Tablet["Tablet"]
    Laptop["MacBook / desktop browser"]
  end

  subgraph HomeAuthority["Home-owned authority - future"]
    SamePageApp["SamePage app\nNext.js modular monolith"]
    Postgres["PostgreSQL"]
    Files["Local file storage"]
    LocalAI["Local AI adapters\nOCR / STT / LLM"]
  end

  PhoneA --> SamePageApp
  PhoneB --> SamePageApp
  Tablet --> SamePageApp
  Laptop --> SamePageApp

  SamePageApp --> Postgres
  SamePageApp --> Files
  SamePageApp --> LocalAI
```

## Phase 0 scope note

In Phase 0 only the **application shell** and **health-check** exist. PostgreSQL, file storage, authentication, and local AI engines are designed but not implemented.

## Trust boundary

- Family content stays on household-controlled systems by default.
- No third-party AI, analytics, or paid hosted services in the default path.
- Cursor/cloud development environments may build and test code but are not the production data plane.
