# Getting Started

AuthForge is a production-ready authentication foundation built with **Next.js App Router**,
**TypeScript**, **Prisma**, and **PostgreSQL**.

This guide is for developers who want to run AuthForge locally and validate the default
authentication flows.

---

## Quick Start

Use this path if you want the fastest possible local setup in the default demo mode
configuration.

No external services or email providers are required.

### Enable demo mode in `.env`

Before running setup, make sure your `.env` file enables demo mode:

```env
AUTH_DEMO_MODE=true
```

### Run setup and start development

```bash
pnpm setup
pnpm dev
```

### Open the application

[http://localhost:3000](http://localhost:3000)

## Requirements

Make sure the following tools are installed:

- Node.js 20+ (tested against the current Active LTS release)
- pnpm
- Docker (required only for local development; Docker Desktop must be running)

## Step-by-step process

### Extract the project

Download the purchased ZIP file and extract it.

Open a terminal in the extracted project directory.

### Initialize a Git repository (optional)

AuthForge includes optional Git hooks powered by Husky.

If you want to enable development hooks, initialize a Git repository before installing dependencies:

```bash
git init
```

Git hooks help enforce formatting and commit message conventions but are not required for running the project.

## Environment Variables

AuthForge requires environment variables to run.

### Create a .env file

The minimal required variables for local development are documented in:
[Environment Variables](./environment)

Without correct environment variables, authentication will not work.

## Running Locally

### First-time setup

Before starting the development server, make sure Docker is running for local development.

### Run first-time setup

```bash
pnpm setup
```

This command will:

- install dependencies
- activate optional Git hooks (if the project is inside a Git repository)
- start the PostgreSQL Docker service for local development
- generate Prisma Client
- apply all database migrations

### Start the development server

```bash
pnpm dev
```

### Open the application

[http://localhost:3000](http://localhost:3000)

### Verify it works

Open the login or registration page and complete an authentication flow.

In demo mode:

- emails are not sent
- verification and reset links are returned in the API response
- most authentication logic works the same as in production

### Subsequent runs

For subsequent runs, you can start the application using:

```bash
pnpm dev
```

as long as the Docker daemon and the PostgreSQL container are running.

## Managing the Local Database

For local development, AuthForge runs PostgreSQL inside Docker.

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

## First Login (Demo Mode)

AuthForge can run in demo mode when `AUTH_DEMO_MODE=true`.

### Review demo mode behavior

In demo mode:

- email delivery is stubbed
- verification and password reset links are returned in the API response instead of being sent
- authentication flows work without external dependencies

Email delivery is intentionally delegated to the consuming application.

### Open demo mode reference

Demo behavior is described in:
[Demo Mode](./demo-mode)

## What’s Next

At this point, AuthForge should be running locally and authentication flows should work.
