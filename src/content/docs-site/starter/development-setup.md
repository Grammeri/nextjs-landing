# Development Setup

Next.js Professional Starter enforces a small set of development tooling rules to ensure consistent code quality, predictable repository behavior, and reliable CI checks.

These tools operate automatically during development and commits.

Understanding the setup helps avoid common issues when working with the starter.

---

## Why strict tooling is used

The starter is designed as a professional engineering baseline rather than a minimal demo.

The development tooling ensures:

- consistent code formatting
- predictable commit history
- automated code quality checks
- reliable CI validation

These rules mirror the setup commonly used in production engineering teams.

## Windows and Cloud-Synced Folders

On Windows systems the project should not be placed inside cloud-synchronized directories such as OneDrive or Dropbox.

Cloud synchronization tools may silently modify files during background sync.

Typical symptoms include:

- files appearing modified after a restart
- line-ending changes detected by Git
- unexpected formatting changes

To avoid these issues, place the project in a normal local directory.

Example:

```text
C:\Projects\nextjs-professional-starter
```

## Tooling Overview

The starter includes the following development tools:

- **TypeScript** — static type checking
- **ESLint** — code quality rules
- **Prettier** — code formatting
- **Husky** — Git hooks
- **lint-staged** — formatting staged files
- **Commitlint** — Conventional Commit validation

These tools work together to maintain consistent code quality across the project.

## TypeScript

TypeScript provides static type checking during development.

To verify that the project compiles correctly run:

```bash
pnpm tsc
```

This command checks the entire project without generating build artifacts.

## ESLint

ESLint enforces code quality rules and helps prevent common mistakes.

To run lint checks manually:

```bash
pnpm lint
```

If ESLint reports errors they should be fixed before committing changes.

## Prettier

Prettier enforces a consistent formatting style across the project.

To format the repository:

```bash
pnpm format
```

To verify formatting without modifying files:

```bash
pnpm format:check
```

Formatting should normally be handled automatically by editor integrations or Git hooks.

## Husky

Husky provides Git hooks that run automated checks during commits.

The Starter source package includes the Husky hook files as part of the intended development baseline.

Hooks are installed automatically during dependency installation through the package lifecycle script.

```bash
pnpm install
```

The hooks help ensure that linting and formatting rules are applied before changes are committed.

Git hooks are optional and do not affect the runtime behavior of the project.

They are relevant only when the extracted package is used inside a Git working copy.

## lint-staged

lint-staged runs formatting and linting only on files that are staged for commit.

This keeps commit checks fast while still enforcing formatting rules.

For JavaScript and TypeScript files the following tools run automatically:

- ESLint with automatic fixes
- Prettier formatting

For JSON, Markdown, and CSS files Prettier formatting is applied.

## Commitlint

Commitlint enforces the Conventional Commits specification for commit messages.

The required format is:

```text
type(optional-scope): short description
```

Examples of valid commit messages:

- feat: add new page layout
- fix: resolve lint error in header
- docs: update quick start documentation
- style: format code according to prettier rules
- refactor: simplify authentication middleware
- test: add unit tests for login service
- chore: update tooling configuration

Commit messages that do not follow this format will be rejected by the commit hook.

## Combined Project Checks

The project includes a command that runs all important validation checks.

```bash
pnpm check
```

This command performs:

- TypeScript validation
- ESLint checks
- Prettier formatting verification

Running this command before committing helps ensure that CI will pass.

## Summary

The development setup enforces a lightweight but strict engineering baseline.

These tools help maintain code quality, consistent formatting, and predictable repository behavior while keeping the starter minimal and adaptable.
