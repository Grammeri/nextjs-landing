# CI Pipeline

Next.js Professional Starter includes a continuous integration (CI)
pipeline that automatically verifies the repository on every push
and pull request.

The pipeline ensures that the codebase remains consistent and that
all engineering standards are enforced.

---

## Purpose of the CI Pipeline

The CI pipeline validates that the repository remains in a healthy state.

It prevents broken builds, formatting drift, and type errors from
entering the main branch.

CI acts as a final verification layer after local development checks.

## CI Environment

The pipeline runs in a clean environment and installs dependencies
before executing verification steps.

Typical steps include:

- dependency installation
- type checking
- linting
- formatting verification
- application build

These checks ensure that the repository can be built and validated
from a fresh environment.

## Validation Steps

The CI pipeline performs the same checks that developers can run locally.

TypeScript validation:

```bash
pnpm tsc
```

Linting:

```bash
pnpm lint
```

Formatting verification:

```bash
pnpm format:check
```

Application build:

```bash
pnpm build
```

If any of these steps fail, the CI job fails.

## Relationship with Local Development

Developers can run the same validation locally using:

```bash
pnpm check
```

Running these checks before pushing changes helps ensure that the CI
pipeline will succeed.

## CI Configuration

The CI workflow is defined in the repository configuration.

Typical configuration location:

```text
.github/workflows/ci.yml
```

This file defines the CI environment and the sequence of validation steps.

## Summary

The CI pipeline automatically verifies the repository on every push
and pull request.

It ensures that formatting rules, type safety, linting rules,
and build integrity remain consistent across the project.
