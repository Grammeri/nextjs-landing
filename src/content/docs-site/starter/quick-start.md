# Quick Start

Next.js Professional Starter is distributed as a downloadable ZIP archive.

This guide explains how to install dependencies and start the development server locally.

---

## System Requirements

The project requires a modern JavaScript development environment.

Minimum requirements:

- Node.js 20 or newer
- pnpm package manager

Node.js can be installed from:

https://nodejs.org

pnpm installation instructions are available at:

https://pnpm.io/installation

## Extract the Project

Download the starter ZIP archive and extract it to a local directory.

Example location:

```text
C:\Projects\nextjs-professional-starter
```

Avoid placing the project inside cloud-synchronized folders such as OneDrive or Dropbox.

These tools may silently modify files and cause formatting or Git inconsistencies.

## Install Dependencies

Open a terminal inside the project directory and install dependencies.

```bash
pnpm install
```

This command installs all required packages defined in `package.json`.

## Start the Development Server

Run the development server.

```bash
pnpm dev
```

After startup the application will be available at:

http://localhost:3000

The development server automatically reloads when source files change.

## Verify the Installation

To confirm that the environment is configured correctly, run the following checks.

TypeScript check:

```bash
pnpm tsc
```

Linting:

```bash
pnpm lint
```

Project build:

```bash
pnpm build
```

If these commands complete without errors, the starter environment is functioning correctly.

## Next Steps

The starter provides a professional engineering baseline for modern web applications.

The repository includes:

- project structure
- development tooling
- code quality checks
- project documentation

Application logic such as authentication, databases, or product features is intentionally not included.

Developers are expected to implement application-specific functionality on top of this baseline.
