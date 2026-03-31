# Quick Start

## Goal

This guide helps you run AuthForge locally in the fastest possible way
using the default demo mode configuration.

No external services or email providers are required.

---

## Prerequisites

Make sure the following tools are installed:

- Node.js Active LTS (recommended)
- pnpm
- Docker (required only for local development; Docker Desktop must be running)

Additional environment notes:

- AuthForge is tested against the current Active LTS release of Node.js
- For local development, AuthForge uses a PostgreSQL instance running inside Docker
- DDocker must be running before executing setup in the local development environment

## Setup

### Enable demo mode

Before running setup, ensure your `.env` file enables demo mode:

```env
AUTH_DEMO_MODE=true
```

### Run setup

From the project root, run:

```bash
pnpm setup
```

This command will:

- install dependencies
- start required Docker services
- generate the Prisma Client
- apply all database migrations

### Start the development server

```bash
pnpm dev
```

### Open the application

[http://localhost:3000](http://localhost:3000)

## Verify It Works

### Complete an authentication flow

Open the login or registration page and complete an authentication flow.

### Demo mode behavior

In demo mode:

- emails are not sent
- verification and reset links are returned in the API response
- most authentication logic works the same as in production

## Managing the Local Database

AuthForge uses Docker to run PostgreSQL locally.

### Start database manually

```bash
pnpm db:up
```

### Stop database

```bash
pnpm db:down
```

### Check running containers

```bash
docker ps
```

### Resolve database connection issues

If you encounter a database connection error, ensure Docker Desktop is running and the PostgreSQL container is active.

## Support

AuthForge includes email-based support for setup questions, bug reports, and clarification of documented behavior.

### Contact support

Support is provided via email: `support@software-forge.dev`.

### Not included

- custom development
- implementation services
- project-specific consulting
- feature requests or roadmap commitments
