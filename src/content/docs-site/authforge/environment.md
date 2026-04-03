# Environment Variables

This document describes all environment variables used by AuthForge.

Environment variables define runtime behavior and are required to run the application
correctly. Missing or misconfigured variables may cause authentication flows to fail.

---

## Overview

AuthForge uses environment variables to control:

- application runtime behavior
- authentication and session settings
- database connection
- demo vs production mode behavior
- external integrations (such as email delivery)

Environment variables are loaded from a local `.env` file
or provided by the deployment platform.

## Runtime Contract

Environment variables form the runtime contract of AuthForge.

They define how the application behaves in a given environment
without modifying the source code.

Changing environment variables changes runtime behavior,
not the architecture.

## Required Variables

The following variables are required for the application runtime unless stated otherwise.

| Variable            | Required | Description                                                        |
| ------------------- | -------- | ------------------------------------------------------------------ |
| `APP_URL`           | yes      | Public application URL used to build verification and reset links  |
| `AUTH_TOKEN_PEPPER` | yes      | Secret used to harden token hashing (minimum length 32 characters) |

`DATABASE_URL` is also required for any environment that uses the database-backed authentication flow and Prisma runtime.

`NODE_ENV` is also used internally by the application runtime to distinguish development and production behavior.

In most setups, it is provided automatically by the Node.js / hosting environment and does not need to be defined manually in `.env`.

Runtime environment validation for the application layer is implemented in `src/shared/config/env.ts`.
Some infrastructure and database-related variables may also be required outside that file depending on the local or deployment setup.

AuthForge currently uses Prisma 6.x in the validated project baseline.

Starting with Prisma 7, Prisma introduces an adapter-based runtime model and a `prisma.config.ts` configuration file for datasource management (see [Prisma Upgrade Guides](https://www.prisma.io/docs/orm/more/upgrade-guides)).

The current AuthForge baseline intentionally retains the Prisma 6.x runtime model to ensure compatibility with traditional Node.js server deployments.

## Optional Variables

Some environment variables are optional and enable additional functionality.

| Variable                      | Required | Description                                                    |
| ----------------------------- | -------- | -------------------------------------------------------------- |
| `AUTH_DEMO_MODE`              | no       | Enables backend demo mode for local development                |
| `NEXT_PUBLIC_DEMO_MODE`       | no       | Enables frontend demo-only UI behavior                         |
| `NEXT_PUBLIC_DEMO_RETURN_URL` | no       | URL used by demo-only UI to return to the product landing page |
| `DATABASE_URL`                | depends  | Required for database-backed runtime and Prisma usage          |
| `POSTGRES_VERSION`            | no       | Local Docker PostgreSQL image version                          |
| `POSTGRES_PORT`               | no       | Local Docker PostgreSQL host port                              |
| `POSTGRES_DB`                 | no       | Local Docker PostgreSQL database name                          |
| `POSTGRES_USER`               | no       | Local Docker PostgreSQL username                               |
| `POSTGRES_PASSWORD`           | no       | Local Docker PostgreSQL password                               |

See also:

- [Email Configuration](#email-configuration-production) for email provider settings
- [Database Variables](#database-variables-local-docker) for local PostgreSQL container configuration

## Email Configuration (Production)

Email configuration is required when running AuthForge in production mode with real email delivery.

| Variable         | Required | Description                       |
| ---------------- | -------- | --------------------------------- |
| `EMAIL_FROM`     | yes      | Sender email address              |
| `RESEND_API_KEY` | yes      | API key for Resend email delivery |

### Resend Provider

For Resend-based email delivery, provide:

| Variable         | Required | Description    |
| ---------------- | -------- | -------------- |
| `RESEND_API_KEY` | yes      | Resend API key |

Additional provider-specific variables may be required depending on the email service used.
See [Email Delivery](./integration/email) for details.

## Database Variables (Local Docker)

These variables configure the local PostgreSQL container used for development.

They are used by the Docker configuration in `infra/docker/docker-compose.yml`.

| Variable            | Required | Description                                               |
| ------------------- | -------- | --------------------------------------------------------- |
| `POSTGRES_VERSION`  | no       | Docker image version for PostgreSQL container             |
| `POSTGRES_PORT`     | no       | Host port mapped to PostgreSQL container (default `5433`) |
| `POSTGRES_DB`       | no       | Default database name                                     |
| `POSTGRES_USER`     | no       | PostgreSQL username                                       |
| `POSTGRES_PASSWORD` | no       | PostgreSQL password                                       |

These variables are only used for the local development database container.
They are not required when connecting to an external PostgreSQL instance.

## Demo Mode Variables

These variables control demo mode behavior.

| Variable                      | Required | Description                                      |
| ----------------------------- | -------- | ------------------------------------------------ |
| `AUTH_DEMO_MODE`              | no       | Enables backend demo mode when set to `true`     |
| `NEXT_PUBLIC_DEMO_MODE`       | no       | Enables demo-only frontend UI behavior           |
| `NEXT_PUBLIC_DEMO_RETURN_URL` | no       | Return URL used by demo-only frontend navigation |

When backend demo mode is enabled:

- production email delivery is disabled
- registration may expose a demo verification link for development convenience
- password reset may expose a demo reset link for development convenience
- demo-friendly authentication behavior is enabled

Frontend demo variables control only demo-specific UI behavior and do not replace backend authentication rules.

Demo mode must be disabled in production environments.

## Environment Files

### Create a .env file

For local development, create a `.env` file in the project root.

### Example `.env` configuration

```env
# ============================================================
# Application
# ============================================================

APP_URL=http://localhost:3000


# ============================================================
# Database (PostgreSQL)
# ============================================================

# PostgreSQL Docker image version
POSTGRES_VERSION=15.15

# Local port where PostgreSQL container will be exposed
POSTGRES_PORT=5433

# Database configuration
POSTGRES_DB=authforge_demo
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Database connection string used by Prisma
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/authforge_demo


# ============================================================
# Authentication (Backend Demo Mode)
# ============================================================

# Enables demo mode for backend logic (fake email, relaxed flows, etc.)
AUTH_DEMO_MODE=true

# Secret used for authentication token hashing
# Must be at least 32 characters
# Replace with a secure random string in production
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AUTH_TOKEN_PEPPER=CHANGE_THIS_TO_A_LONG_RANDOM_SECRET_12345


# ============================================================
# Frontend Demo Mode (UI only)
# ============================================================

# Enables demo UI features (like "Back to product" button)
# Set to true only for demo-oriented UI deployments.
NEXT_PUBLIC_DEMO_MODE=false

# URL where user returns from demo (landing product page)
# Used only when demo UI mode is enabled.
# Example:
# https://your-domain.com/products/authforge
NEXT_PUBLIC_DEMO_RETURN_URL=


# ============================================================
# Email (production only)
# ============================================================

# API key for Resend email service
# Required only when AUTH_DEMO_MODE=false
RESEND_API_KEY=YOUR_RESEND_API_KEY_HERE

# Sender address used for transactional emails
EMAIL_FROM=AuthForge <support@your-domain.com>
```

Do not commit `.env` files to version control.

An example configuration is provided in `.env.example`.

## Production Notes

In production:

- environment variables must be provided by the hosting platform
- demo mode must be disabled
- secrets must be securely stored and never exposed to the client
- each deployment must use its own isolated secret values

Environment variables define the security posture of the application and must be managed
carefully.

## Project Structure Generation

AuthForge includes an automated project tree generator.

The script is located at `scripts/make-tree.mjs`.

### Generate the project tree snapshot

```bash
pnpm docs:tree
```

This generates an up-to-date file structure snapshot at `dev/tree.pretty.txt`.

The generated file is intended for documentation purposes only and must not be edited manually.

## Summary

AuthForge relies on explicit environment configuration to control runtime behavior.

Correctly configured environment variables ensure predictable and secure authentication behavior across development, demo, and production environments.
