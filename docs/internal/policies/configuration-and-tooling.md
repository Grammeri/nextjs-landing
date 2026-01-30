# Project Configuration and Tooling

This document defines how project configuration and developer tooling are structured and enforced in this repository.

It is a system-level internal document for maintainers and contributors.

---

## Philosophy

The project enforces consistent formatting, commit quality, and configuration safety.

This prevents accidental formatting noise, broken CI, inconsistent commits, and unintended configuration changes.

Configuration protection is intentional.

---

## Tooling Overview

### Prettier

Prettier provides consistent code formatting.

Configuration files:

```json
.prettierrc
.prettierignore


Prettier is executed via:

pnpm format


and through lint-staged on commit.

ESLint

ESLint enforces code quality and rule consistency.

Configuration:

eslint.config.mjs


It works with Prettier to avoid rule conflicts.

Husky

Husky manages git hooks.

Hooks:

.husky/pre-commit
.husky/commit-msg


Responsibilities:

running lint-staged

enforcing commit rules

protecting configuration files

Commitlint

Commitlint enforces Conventional Commits.

Allowed types:

feat
fix
chore
docs
refactor
test


Invalid messages are rejected.

Configuration Protection

Critical configuration files are protected from accidental commits.

Examples:

.prettierrc
.editorconfig
.gitattributes
next.config.ts
tsconfig.json
.github/workflows/
.husky/pre-commit


Commits modifying these files are blocked.

Intentional Configuration Changes

Intentional changes must use bypass:

ALLOW_CONFIG_CHANGES=true git commit -m "chore: update config"


This bypass must be used sparingly.

CI

CI is defined in:

.github/workflows/ci.yml


CI validates installation, linting, and build.

All commits must keep CI passing.

Best Practices

Configuration changes should be rare and deliberate.

Small, focused commits are preferred.

Configuration decisions are architectural decisions.

Summary

The configuration system exists to maintain stability and predictability.

Protection is preventive, not restrictive.


---
