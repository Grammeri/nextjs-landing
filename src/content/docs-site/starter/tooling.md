# Tooling

The Starter project uses a small and predictable set of developer tools
to enforce code quality, formatting consistency, and reliable development workflows.

These tools operate automatically where possible and require minimal
manual configuration.

---

## Package Manager

The project uses **pnpm** as the package manager.

pnpm provides deterministic dependency resolution and efficient disk
usage through a content-addressable store.

The project is configured for **pnpm 10.6.2**.

Typical development commands are executed using pnpm.

Example:

```bash
pnpm install
```

This command installs all project dependencies defined in `package.json`.

## TypeScript

The project uses TypeScript with strict type checking.

TypeScript helps detect type errors during development before the
application is executed.

Type checking can be executed manually.

```bash
pnpm tsc
```

This command verifies the codebase without emitting compiled files.

## ESLint

ESLint is used to enforce code quality and detect common programming
errors.

Linting rules are defined in the ESLint configuration file located in
the project root.

Run the linter manually:

```bash
pnpm lint
```

Linting helps maintain a consistent and predictable codebase.

## Prettier

Prettier enforces consistent formatting across the entire codebase.

Formatting rules are defined in the Prettier configuration file.

To automatically format files:

```bash
pnpm format
```

To verify formatting without modifying files:

```bash
pnpm format:check
```

Formatting verification is also used during automated checks.

## Husky Git Hooks

The project uses Husky to run automated checks during Git operations.

Git hooks ensure that code quality rules are applied before changes are
committed.

Typical commit-time checks include:

- staged file formatting
- staged file linting
- commit message validation

This helps prevent incorrectly formatted, invalid, or unchecked changes
from entering the repository.

## Commitlint

Commitlint enforces a consistent commit message format.

Commit messages are validated against the Conventional Commits
standard.

This ensures that the commit history remains structured and readable.

Commit validation is executed automatically during the commit process.

## Project Verification

The repository provides a combined verification command.

```bash
pnpm check
```

This command runs:

- TypeScript type checking
- ESLint static analysis
- Prettier formatting verification

The command is typically executed before pushing changes or preparing
a release.

## Continuous Integration

The repository includes a CI workflow configuration:

```text
.github/workflows/ci.yml
```

Continuous integration automatically runs verification checks when
changes are pushed to the repository.

The current CI workflow performs the following stages:

- dependency installation
- combined repository checks
- application build

The combined repository checks cover TypeScript validation, linting, and formatting verification.

Automated CI helps maintain repository stability and prevents
regressions.
