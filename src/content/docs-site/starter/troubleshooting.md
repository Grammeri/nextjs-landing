# Troubleshooting

This document lists common issues that may occur when installing or running the project and provides standard resolution procedures.

The purpose of this document is to reduce setup friction and ensure predictable recovery from common environment problems.

---

## pnpm is not installed

If the system cannot locate the pnpm executable, the package manager is not installed or not available in the system PATH.

### Resolution

Install pnpm globally:

```bash
npm install -g pnpm
```

Alternatively, enable pnpm using Corepack:

```bash
corepack enable
corepack prepare pnpm@10.6.2 --activate
```

## Node.js version is too old

The project requires Node.js 20 or newer.

Using an older runtime may result in installation failures or build errors.

### Resolution

Verify the installed Node.js version:

```bash
node -v
```

If the version is lower than required, install the latest LTS version from the official Node.js distribution.

## Dependency installation fails

Dependency installation may fail due to corrupted local caches or inconsistent lockfiles.

### Resolution

Reinstall dependencies:

```bash
pnpm install --force
```

This procedure resolves most dependency graph inconsistencies.

## TypeScript errors after installation

TypeScript errors may appear if dependencies were installed incompletely or the environment configuration is inconsistent.

### Resolution

Run the project validation command:

```bash
pnpm check
```

This command performs:

- TypeScript validation
- ESLint analysis
- Prettier formatting verification

## Build fails

Build failures typically indicate configuration inconsistencies or unresolved type errors.

### Resolution

Run the build process manually:

```bash
pnpm build
```

If the build fails, verify the following conditions:

- Node.js version satisfies the project requirement
- Dependencies are installed successfully
- No TypeScript errors remain
- Project configuration files were not modified incorrectly

## Formatting issues

Formatting errors occur when code does not match the Prettier configuration.

These errors are typically reported by CI checks.

### Resolution

Run the formatter:

```bash
pnpm format
```

This command rewrites files to match the project formatting rules.

## Lint errors

Lint errors indicate violations of the ESLint configuration.

### Resolution

Run the lint command:

```bash
pnpm lint
```

Resolve the reported issues before committing changes.

## Husky hooks are not executed

Git hooks may stop working if dependencies were reinstalled or the repository state changed.

### Resolution

Reinstall Husky hooks:

```bash
pnpm prepare
```

This restores the Git hook configuration.

## Commit rejected by commitlint

Commits may be rejected if the commit message does not follow the Conventional Commits specification.

### Resolution

Use the correct commit message format.

Examples:

```text
Examples:

feat: add authentication middleware
fix: resolve build error
docs: update documentation
style: format code according to prettier rules
refactor: simplify authentication middleware
test: add unit tests for login service
chore: update dependencies
```

## Unresolved issues

If the described procedures do not resolve the issue, verify that the development environment matches the project requirements and review the documentation related to installation and development workflow.
