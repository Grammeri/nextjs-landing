# Development Setup

AuthForge is a production-ready project and enforces strict development rules by design.
These rules exist to ensure consistent code quality, predictable git history, and reliable CI pipelines.

AuthForge is validated against Node.js 24.x as the current project baseline.

If you are running or modifying AuthForge locally, following these rules is required.
Otherwise, commits or CI checks may fail.

---

## Why these rules exist

AuthForge is intended to be used as a real-world SaaS foundation, not a demo project.

The development setup ensures:

- consistent formatting across the codebase
- readable and structured git history
- predictable CI behavior
- fewer bugs caused by accidental formatting or unsafe changes

This mirrors the setup commonly used in production SaaS teams.

## Important: Windows & Cloud-Synced Folders (OneDrive)

AuthForge enforces strict formatting and Git hygiene rules.
On Windows systems, these rules may conflict with cloud-synced folders
such as **OneDrive**, **Dropbox**, or similar tools.

### The problem

If the project directory is located inside a cloud-synced folder
(e.g. `Documents/OneDrive/...`), the sync client may modify files silently.

Typical symptoms:

- files appearing as modified after a system restart
- line-ending-only changes detected by Git
- `git status` becoming dirty without intentional edits
- unexpected Prettier or CI failures

Even a clean working tree may appear changed after synchronization.

### Root cause

Cloud sync tools may:

- rewrite or normalize files during synchronization
- re-apply line endings
- update file metadata

This behavior conflicts with Git, Prettier, ESLint, and CI expectations.

### Recommended solution

**Do not place the AuthForge project inside a cloud-synced directory.**

Instead:

- move the repository to a local, non-synced path
  (for example: `C:\Projects\AuthForge`)
- ensure no background sync tools monitor the directory

After relocating the project:

- phantom file changes disappear
- `git status` remains stable
- Prettier and CI behave consistently

### Editor note

AuthForge is commonly developed using **VS Code** (including Cursor-based setups).
VS Code works reliably as long as the repository is located outside cloud-synced folders.

## Local Database (Optional)

AuthForge requires PostgreSQL for local development.

You may use:

- A locally installed PostgreSQL instance
- Docker (recommended for convenience and isolation)

### Using Docker

Docker configuration is provided in:

infra/docker/docker-compose.yml

To start the PostgreSQL container:

```bash
docker compose --env-file .env -f infra/docker/docker-compose.yml up -d
```

To stop the container:

```bash
docker compose --env-file .env -f infra/docker/docker-compose.yml down
```

Docker is provided as a convenience for local development only.
AuthForge does not require Docker-specific infrastructure.

Prisma commands are executed through the dedicated `packages/db` workspace to keep ORM tooling isolated from the application layer.

## Tooling Overview

The following tools are used:

- **Husky (optional)** — provides Git hooks for commit checks
- **Prettier** — enforces code formatting
- **ESLint** — enforces code quality rules
- **Commitlint** — enforces Conventional Commits
- **CI Pipeline** — validates everything on push and pull requests
- **Lint-staged** — runs formatting and linting only on staged files during pre-commit hooks

Lint-staged automatically formats staged JavaScript, TypeScript, JSON,
Markdown, and YAML files using Prettier and ESLint where applicable.

## Internal documentation tooling

AuthForge includes internal tooling to generate a consistent project file tree
for documentation, reviews, and architectural discussions.

This tooling is not part of the build, CI, or commit workflow.

It exists to support internal documentation accuracy and developer communication.

The standardized command is:

```bash
pnpm docs:tree
```

This command generates a local snapshot of the tracked file structure.

Generated artifacts are intended for local documentation use and should not be committed.

For details, see [Generate project structure tree](./commands#generate-project-structure-tree).

## Public Documentation Boundary

Public documentation rendered by the landing site is maintained inside the deployable landing repository.

This public documentation layer is intentionally separated from private product repositories.

The landing deployment must not require private Git submodules or private product repository contents in order to render public documentation pages.

Private product repositories may still keep their own internal or source documentation, but public website documentation is maintained as deployment-safe content inside the landing system.

This separation ensures that Preview and Production deployments can be built reliably on Vercel without build-time dependency on private product repository access.

## Husky (Git Hooks)

AuthForge includes a Husky configuration that provides optional Git hooks.

These hooks help enforce formatting, linting, and commit message conventions.

However, **Git hooks are optional and are not required for running or building the project.**

The project works correctly even if Husky hooks are not installed.

### Installing hooks

AuthForge attempts to install Git hooks automatically during dependency installation.

This happens through the `prepare` lifecycle script when running:

```bash
pnpm install
```

If the project is inside a Git repository, Husky hooks will be activated automatically.

If the repository was initialized after installing dependencies, you can activate hooks manually:

```bash
pnpm prepare
```

### Disabling hooks

Git hooks are optional and can be disabled during installation.

To install dependencies without activating Husky hooks:

```bash
HUSKY=0 pnpm install
```

This does not affect the runtime behavior of the application.

## Prettier (Code Formatting)

Prettier enforces a single formatting style across the entire project.

### Important notes

- formatting is mandatory
- if files are not formatted, commits will fail
- do not fight Prettier — let it format the code

### Recommended workflow

Before committing, run:

```bash
pnpm format
pnpm lint
```

Or configure your editor to format on save.

## ESLint (Code Quality)

ESLint helps prevent:

- unsafe patterns
- common bugs
- inconsistent practices

Some rules may feel strict — this is intentional.
If ESLint fails, fix the issue instead of disabling the rule.

## Commitlint & Conventional Commits

AuthForge requires commit messages to follow the Conventional Commits specification.

### Required format

<type>(optional-scope): short description

### Allowed commit types

AuthForge follows the Conventional Commits specification.

Allowed commit types include:

- feat — new feature
- fix — bug fix
- docs — documentation changes
- chore — tooling or configuration updates
- refactor — refactoring without behavior change
- test — test-related changes
- style — formatting changes that do not affect logic
- perf — performance improvements
- build — build system or dependency updates
- ci — CI pipeline changes

For the full specification, see the official Conventional Commits standard:

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)

### Valid commit examples

- feat(auth): add password reset flow
- fix(session): handle expired refresh tokens
- docs(authforge): update environment variables docs
- chore(ci): update lint configuration
- refactor(user): simplify user service logic

### Invalid examples

- update stuff
- fixed bug

These will be rejected by the commit-msg hook.

## CI Pipeline

Every push and pull request runs CI checks.

CI validates:

- formatting (Prettier)
- linting (ESLint)
- TypeScript correctness
- build integrity

If CI fails, the change must be fixed before merging.

## Generated Files (Next.js)

AuthForge uses Next.js, which automatically generates certain helper files.

### next-env.d.ts

The file `next-env.d.ts` is generated and maintained by Next.js.

Important:

- It must not be edited manually.
- It may change automatically after dependency updates or dev server runs.
- These changes are expected and do not indicate a project issue.

If this file appears modified after running `pnpm dev` or updating dependencies,
simply commit the change.

This behavior is part of the Next.js toolchain.

## Protected Configuration Files

AuthForge protects critical configuration files from accidental changes.

These files define global formatting rules, Git behavior, CI pipelines, and
project-wide constraints. Unintentional modifications can break tooling,
CI validation, or team workflows.

### Protected files

The following files and directories are protected by Git hooks:

- `.editorconfig`
- `.lintstagedrc.js`
- `eslint.config.mjs`
- `commitlint.config.cjs`
- `pnpm-workspace.yaml`
- `.husky/`
- `.github/workflows/`

If Git hooks are enabled, commits modifying these files may be blocked
to prevent accidental configuration changes.

If Husky hooks are not installed, these safeguards will only run in CI.

This is expected behavior.

### Intentional configuration changes

In rare cases, configuration changes may be required.

To explicitly allow such changes, set the `ALLOW_CONFIG_CHANGES` environment variable and re-run the commit.

Linux / macOS / Git Bash:

```bash
ALLOW_CONFIG_CHANGES=true git commit -m "chore(config): update tooling"
```

Windows PowerShell:

```powershell
$env:ALLOW_CONFIG_CHANGES="true"
git commit -m "chore(config): update tooling"
```

### Important

- Use this bypass sparingly
- Changes should be intentional and reviewed
- Commit messages must clearly indicate a configuration change

### CI enforcement

Configuration integrity is enforced primarily through CI validation.

If Husky hooks are enabled locally, additional safeguards run before commits.

CI is defined in:

- `.github/workflows/ci.yml`

If CI fails, the change must be fixed before merging.

## Non-blocking Build Warnings

During `pnpm build`, you may occasionally see advisory warnings.
These warnings do not indicate a build failure and do not block production builds.

## Common Issues

### husky commit-msg failed

If Git hooks are enabled, the commit message must follow
the Conventional Commits format.

The commit message does not follow Conventional Commits.
Fix the message and retry.

### prettier or eslint errors on commit

The code is not formatted or violates lint rules.

Run:

```bash
pnpm format
pnpm lint
```

Then commit again.

## Customization

The current development setup represents a balanced, production-ready baseline.

It is intentionally strict enough to ensure code quality and reliable CI,
while remaining lightweight for small teams and solo developers.

You are free to adapt or extend these rules to better match your internal
processes and workflows.

However, if you choose to relax or remove parts of the setup,
you take full responsibility for maintaining code quality and consistency.

## Summary

AuthForge enforces strict development rules on purpose.

These rules:

- protect code quality
- reduce long-term maintenance cost
- reflect real production workflows

Once the environment is set up correctly, they fade into the background and simply work.
