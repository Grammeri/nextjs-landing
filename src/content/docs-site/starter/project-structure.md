# Project Structure

Next.js Professional Starter uses a simple and predictable directory structure.

The repository separates application source code, developer tooling,
documentation, and automation scripts.

This structure keeps the project easy to understand and adaptable for
different application types.

---

## Root Directory

The root directory contains project configuration, tooling configuration,
and metadata required for development.

Typical files include:

- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `next.config.ts`

These files configure the package manager, TypeScript compiler, and
Next.js build system.

Additional configuration files may include:

- ESLint configuration
- Prettier configuration
- Commitlint configuration
- CI workflow configuration

Keeping configuration files at the root improves discoverability and
avoids deep configuration hierarchies.

## Source Code

All application source code is located inside the `src` directory.

```text
src/
```

This keeps source code isolated from configuration, documentation,
and developer tooling.

The `src` directory contains the application router and application
implementation.

## Application Router

The Next.js App Router is located in:

```text
src/app
```

This directory defines the entry points for the application.

Typical contents include:

- page components
- layout components
- route segments
- global styles

The App Router is responsible for rendering the application UI
and handling routing.

## Documentation

Project documentation is stored in the `docs` directory.

```text
docs/
```

This directory contains the documentation structure used by the starter.

Typical contents include:

- `docs/nav.ts`
- `docs/site/`

Documentation inside this directory is not part of the runtime application.

## Developer Scripts

Automation scripts used during development are located in:

```text
scripts/
```

These scripts support developer workflows such as generating project
structure snapshots or performing repository maintenance tasks.

Scripts are intentionally small and focused.

## Structural Stability

The project structure is intended to remain stable over time.

This means:

- directories should not be renamed without strong justification
- new modules should follow existing conventions
- unrelated responsibilities should remain separated

Maintaining a stable structure reduces onboarding time and prevents
architectural drift as the project evolves.
