# Commands

Next.js Professional Starter exposes a small set of developer commands
through the package manager.

These commands support development, verification, and maintenance
workflows.

---

## Development Server

Start the local development server.

```bash
pnpm dev
```

The application runs in development mode with automatic reload when
source files change.

## Build the Application

Create an optimized production build.

```bash
pnpm build
```

This command compiles the application and prepares the production output.

## Start Production Server

Run the production server using the built application.

```bash
pnpm start
```

This command starts the compiled production build.

## Lint the Codebase

Run static analysis using ESLint.

```bash
pnpm lint
```

Linting verifies that the codebase follows the configured quality rules.

## Format the Code

Format the repository using Prettier.

```bash
pnpm format
```

Formatting rewrites files to match the configured style rules.

## Check Code Formatting

Verify that files follow the formatting rules.

```bash
pnpm format:check
```

This command reports formatting issues without modifying files.

## Type Checking

Run TypeScript type checking.

```bash
pnpm tsc
```

This command validates the project types without generating build artifacts.

## Run Full Project Checks

Run all verification checks used by the project.

```bash
pnpm check
```

This command executes:

- TypeScript validation
- ESLint checks
- Prettier formatting verification

It is commonly used before committing or pushing changes.

## Generate Project Structure

Generate a project directory tree.

```bash
pnpm tree
```

This command runs a helper script that prints the repository structure.

It is useful for documentation, architecture discussions, and repository inspection.
