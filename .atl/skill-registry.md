# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | ~/.config/opencode/skills/branch-pr/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | ~/.config/opencode/skills/go-testing/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | ~/.config/opencode/skills/issue-creation/SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | judgment-day | ~/.config/opencode/skills/judgment-day/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | skill-creator | ~/.config/opencode/skills/skill-creator/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue (Closes/Fixes/Resolves #N) — no exceptions
- Branch naming: `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)\/[a-z0-9._-]+$`
- Conventional commits: `type(scope): description` — types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
- PR body MUST include: linked issue, exactly one type:* label, summary, changes table, test plan, contributor checklist
- Automated checks must pass before merge: issue reference, status:approved label, type:* label, shellcheck
- No `Co-Authored-By` or AI attribution trailers
- Run `shellcheck` on modified scripts before pushing

### go-testing
- Use table-driven tests for multiple test cases: `tests := []struct{name; input; expected; wantErr}`
- Test Bubbletea models directly by sending `tea.KeyMsg` via `Model.Update()`
- Use `teatest.NewTestModel()` for full TUI integration tests
- Golden file testing: compare output vs `testdata/*.golden` files with `-update` flag
- Pure functions → table-driven; side effects → mock dependencies; TUI state → Update() directly
- System exec: mock via interfaces; real commands → integration test with `-short` skip; files → `t.TempDir()`
- Error cases MUST be tested alongside success cases

### issue-creation
- Blank issues disabled — MUST use template (bug_report.yml or feature_request.yml)
- Every issue gets `status:needs-review` automatically on creation
- A maintainer MUST add `status:approved` before any PR can be opened
- Questions go to Discussions, NOT issues
- Bug report: title prefix `fix(scope):` — feature request: title prefix `feat(scope):`
- Search existing issues for duplicates before creating
- Labels: bug + status:needs-review (bug report); enhancement + status:needs-review (feature request)

### judgment-day
- Launch TWO blind judge sub-agents via `delegate` (async, parallel) — NEVER sequential
- Inject `## Project Standards (auto-resolved)` from skill registry into BOTH judge prompts
- Synthesize verdict: Confirmed (both found), Suspect A/B (one found), Contradiction (disagree)
- Classify warnings: REAL (causes bug in normal use) vs THEORETICAL (contrived scenario)
- Fix + re-judge cycle: max 2 iterations before asking user to continue or escalate
- After Round 1, only re-judge if confirmed CRITICALs exist. Real WARNINGs: fix inline, no re-judge
- APPROVED criteria: 0 confirmed CRITICALs + 0 confirmed real WARNINGs

### skill-creator
- Frontmatter MUST include: name, description (with Trigger:), license (Apache-2.0), metadata.author (gentleman-programming), metadata.version
- Structure: `skills/{name}/SKILL.md` (required), `assets/` (templates/schemas — optional), `references/` (local doc links — optional)
- DO include: critical patterns first, tables for decisions, minimal code examples, Commands section
- DON'T include: Keywords section, duplicated content, lengthy explanations, troubleshooting, web URLs in references
- After creation, register skill in `AGENTS.md` skill table
- Naming patterns: `{technology}`, `{project}-{component}`, `{project}-test-{component}`, `{action}-{target}`

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| (none) | — | No project-level convention files found |

No project-level convention files found. The global `~/.config/opencode/AGENTS.md` applies for general rules.
