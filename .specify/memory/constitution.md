<!--
Sync Impact Report
Version change: unversioned scaffold → 1.0.0 (initial constitution)
Modified principles: five unnamed scaffold slots → principles I–V below.
Added sections: Core Principles, Technology & Quality Standards,
Development Workflow, Governance (populated from scaffold).
Removed sections: None.
Follow-up TODOs: RATIFICATION_DATE — confirm the original adoption date.
This report is temporary review material; remove it before committing.
-->

# Audiobook Gen Lib Constitution

## Core Principles

### I. Library-First
Backend generation logic MUST live in independently testable modules within
`backend`, separate from HTTP handlers and UI concerns. Modules MUST have a clear,
single purpose. Generation functionality MUST be usable programmatically so that
API and UI changes do not require duplicating generation logic.

### II. API Contract Discipline
Backend functionality needed by the frontend MUST be exposed through explicit,
versioned FastAPI HTTP endpoints. Request/response schemas MUST be typed and
validated. The frontend MUST NOT depend on backend internals. Breaking public API
contract changes MUST increment the API major version and document a migration
path so existing consumers can transition independently of backend internals.

### III. Test-First (NON-NEGOTIABLE)
TDD is mandatory for backend library code: tests are written and approved first, then
observed to fail, then implementation proceeds (Red-Green-Refactor). No library
change lands without tests that exercise it. Frontend changes MUST include
component or integration coverage for non-trivial logic.

### IV. Integration Testing
Integration tests are REQUIRED for: new library contract surfaces, contract changes,
API endpoints, and any interaction with the TTS engine (`supertonic`) or file
generation pipeline. Tests MUST cover both success and failure paths at the
API boundary.

### V. Simplicity & Observability
Changes MUST NOT introduce abstractions without a documented current use case.
Every generation run MUST produce structured logs for pipeline stages and
actionable error messages through logs or API error responses; errors MUST NOT be
silently swallowed. Logs MUST NOT expose secrets or source manuscript content.
Added complexity MUST be justified in review to keep generation failures diagnosable.

## Technology & Quality Standards

- Backend: Python ≥3.13, FastAPI, managed with `uv` (dependencies pinned in
  `pyproject.toml` / `uv.lock`).
- Frontend: React 19 + TypeScript (strict), Vite, Tailwind CSS 4.
- Type safety: TypeScript strict mode MUST stay enabled; Python code MUST pass type
  checks where configured.
- Lint gates: `npm run lint` (frontend, eslint) and equivalent backend lint checks
  MUST pass before merge.
- Secrets and generated artifacts (audio files, `dist/`, virtualenvs) MUST NOT be
  committed to version control.

## Development Workflow

- All changes go through feature branches with review before merge to the main
  branch.
- Every PR MUST include: description, tests for changed behavior, and confirmation
  that lint/typecheck pass.
- Backend changes require both unit and (where applicable) integration tests;
  frontend changes require build (`tsc -b && vite build`) to succeed.
- Generation features (novel/audiobook pipelines) MUST include a reproducible
  end-to-end example or test.

## Governance

- This constitution supersedes all other practices, conventions, and ad-hoc
  decisions. Conflicts resolve in favor of the constitution.
- Amendments: any team member MAY propose an amendment via PR. Amendments MUST
  document the change, rationale, and migration plan; they require review approval.
- Versioning: MAJOR for incompatible governance/principle removals or redefinitions;
  MINOR for new principles or materially expanded guidance; PATCH for
  clarifications and non-semantic refinements.
- Compliance review: all PRs and reviews MUST verify constitution compliance;
  unresolvable complexity MUST be escalated rather than silently introduced.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm original adoption date | **Last Amended**: 2026-09-16
