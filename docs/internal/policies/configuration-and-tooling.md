# Project Configuration and Tooling

This document defines how project configuration and developer tooling are structured and enforced in this repository.

It is a system-level internal document for maintainers and contributors.

---

## Philosophy

The project enforces consistent formatting, commit quality, and configuration safety.

This prevents accidental formatting noise, broken CI, inconsistent commits, and unintended configuration changes.

Configuration protection is intentional.

## Tooling Overview

Prettier provides consistent code formatting.

Configuration files:

- `.prettierrc`
- `.prettierignore`

### Run formatter

```bash
pnpm format
```

Prettier also runs through lint-staged on commit.

ESLint enforces code quality and rule consistency.

Configuration file:

- `eslint.config.mjs`

ESLint works with Prettier to avoid rule conflicts.

Husky manages git hooks.

Hook files:

- `.husky/pre-commit`
- `.husky/commit-msg`

Husky responsibilities:

- running lint-staged
- enforcing commit rules
- protecting configuration files

Commitlint enforces Conventional Commits.

Allowed commit types:

- `feat`
- `fix`
- `chore`
- `docs`
- `refactor`
- `test`

Invalid messages are rejected.

## Configuration Protection

Critical configuration files are protected from accidental commits.

Protected examples:

- `.prettierrc`
- `.editorconfig`
- `.gitattributes`
- `next.config.ts`
- `tsconfig.json`
- `.github/workflows/`
- `.husky/pre-commit`

Commits modifying these files are blocked.

## Intentional Configuration Changes

Intentional changes must use a bypass flag.

### Commit with bypass

```bash
ALLOW_CONFIG_CHANGES=true git commit -m "chore: update config"
```

Use this bypass sparingly.

## CI

CI is defined in:

- `.github/workflows/ci.yml`

CI validates installation, linting, and build.

All commits must keep CI passing.

## CI Environment and pnpm Policy

The project uses:

- Node.js 20
- pnpm (declared via `packageManager` in `package.json`)
- Prisma
- GitHub Actions

## pnpm Version Source of Truth

The only allowed pnpm version declaration is inside:

- `package.json`

```json
{
  "packageManager": "pnpm@10.6.2"
}
```

CI must not declare a separate pnpm version inside GitHub Actions configuration.

Multiple version declarations cause:

- `ERR_PNPM_BAD_PM_VERSION`
- `"Multiple versions of pnpm specified"`
- inconsistent CI behavior

## Corepack Activation Requirement

CI must explicitly enable pnpm via Corepack.

Required pattern:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 20

- name: Enable pnpm via corepack
  run: |
    corepack enable
    corepack prepare pnpm@10.6.2 --activate
```

Using `cache: pnpm` without activating pnpm first causes:

- `Unable to locate executable file: pnpm`

This is expected behavior in GitHub Actions.

## Prisma Client Generation

If the project contains a `prisma/` directory, CI must generate Prisma Client before running TypeScript or build.

Required step:

```yaml
- name: Generate Prisma Client
  run: pnpm prisma generate
```

Failing to generate Prisma Client causes:

- `Module '@prisma/client' has no exported member 'PrismaClient'`

This is expected behavior when the client is not generated.

## Deterministic CI Guarantee

CI must follow this order:

- Setup Node
- Enable pnpm via Corepack
- Install dependencies
- Generate Prisma Client
- Run lint
- Run TypeScript
- Run build

This guarantees deterministic builds across:

- local development
- CI
- production environments

## Status

Validated on main branch after resolving:

- pnpm version conflicts
- pnpm executable resolution errors
- Prisma Client missing export errors

## Best Practices

Configuration changes should be rare and deliberate.

Small, focused commits are preferred.

Configuration decisions are architectural decisions.

## Summary

The configuration system exists to maintain stability and predictability.

Protection is preventive, not restrictive.
