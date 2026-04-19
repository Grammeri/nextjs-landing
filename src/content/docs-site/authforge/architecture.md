# Architecture

This document explains how AuthForge is structured and where authentication behavior can be safely modified or extended.

It focuses on architectural boundaries and responsibility separation rather than implementation details.

---

## Architectural Approach

AuthForge follows a layered internal architecture inspired by Feature-Sliced Design (FSD).

The goal is strict separation between:

- UI
- API handlers
- authentication business logic
- database layer

This makes the system predictable, testable, and safe to extend.

You do not need to adopt FSD in your own project. AuthForge can be integrated into any existing structure.

## High-Level Structure

Key project areas:

- `src/app/` for Next.js App Router routes, layouts, and API handlers
- `src/features/auth/` for the authentication domain
- `src/shared/` for shared utilities and UI components
- `packages/db/` for Prisma schema and database client
- `infra/` for local infrastructure and Docker configuration
- `docs/` for product documentation

Simplified structure:

```text
auth-forge/
├─ src/
│  ├─ app/
│  ├─ features/
│  └─ shared/
├─ packages/
│  └─ db/
├─ infra/
└─ docs/
```

Each area has a clearly defined responsibility.

## Public Documentation Boundary

Public documentation rendered through the public website is stored inside the deployable landing repository.

Public documentation delivery must not depend on private product repositories or private Git submodules at build time.

Product repositories may still keep their own internal or source documentation, but public documentation used by the website is maintained as deployment-safe content inside the landing system.

This separation ensures that Preview and Production deployments can be built on Vercel without requiring access to private product repository contents during the build.

## Dependency Direction

AuthForge enforces strict dependency flow:

UI → API → Authentication Domain → Database

Lower layers must never depend on higher layers.

This inward dependency direction guarantees long-term maintainability, predictable behavior, and safe refactoring.

## Environment Configuration

Environment variables are parsed and validated centrally in:

`src/shared/config/env.ts`

This ensures that required runtime configuration is validated
during application startup.

## Authentication Domain

All authentication business logic lives inside `src/features/auth/model/`.

This includes:

- validation schemas
- domain services
- authentication rules
- session handling logic

This directory is the source of truth for authentication behavior.

API routes and UI components must not contain business logic.

## Import Boundaries (Public API Enforcement)

AuthForge enforces strict module boundaries inside the `features` layer.

Each feature exposes public APIs through explicit entry points.

For example, the authentication feature exposes:

- `src/features/auth/public.ts`
- `src/features/auth/server.ts`

### Feature Entry Points

Features expose explicit entry points instead of a single barrel file.

For the authentication feature:

- `src/features/auth/public.ts` — UI-facing exports
- `src/features/auth/server.ts` — server-side domain functions

This separation prevents server logic from being accidentally imported
into client components.

External code must import features only through these entry points.

### Allowed

From `src/app/`, `src/shared/`, or other features:

```ts
import { LoginForm } from '@/features/auth/public';
import { registerUser } from '@/features/auth/server';
```

### Forbidden

Do not import internal feature files directly:

```ts
import { LoginForm } from '@/features/auth/ui/LoginForm/LoginForm';
```

## API Layer

Authentication API routes are located in `src/app/api/auth/*`.

API routes are thin adapters. Each route:

- validates input
- applies route-level security checks (where applicable)
- delegates logic to the authentication domain
- returns a normalized response

Authentication routes use a code-driven response contract:

- success responses use `{ success: true }`, optionally with demo-only fields
- error responses use `{ code, errors? }`

Route-level security checks include:

- in-memory rate limiting for selected auth routes
- breached password detection (HIBP Pwned Passwords) on `register` and `reset-password`

All business logic lives exclusively inside the authentication domain.

For the public authentication response contract, see [Auth API Contract](./integration/auth-api).

## UI Layer

Authentication UI components live in `src/features/auth/ui/`.

UI components:

- contain no authentication business logic
- primarily depend on the public APIs of the authentication feature
- may import shared schemas or validation utilities when required
- can be replaced or redesigned safely

Internal domain services and persistence logic must not be accessed directly from UI components.

## UI Design System

AuthForge uses a token-driven UI system for typography, spacing, borders, radius, and motion.

Design tokens provide a stable visual layer independent of business logic.

You may replace the styling system entirely (Tailwind, CSS Modules, and similar approaches) without affecting authentication rules.

## Session and Security Policy

Session behavior is defined inside the authentication domain.

This includes:

- access and refresh session handling
- TTL and expiration policies
- session revocation rules

AuthForge also applies baseline security policies at the API boundary:

- in-memory rate limiting for selected auth routes
- breached password detection (HIBP Pwned Passwords, k-anonymity model) during password creation and password reset

Environment differences are handled consistently. For example, breached password checks are disabled in local development by default to avoid external API dependencies and improve DX.

### Demo Mode Architecture

AuthForge supports a demo mode controlled by the environment variable:

`AUTH_DEMO_MODE`

When demo mode is enabled:

- email delivery is replaced by a demo provider
- successful registration may return `demoVerificationUrl` in the API response
- successful password reset requests may return `demoResetPasswordUrl` in the API response
- email verification requirements are relaxed for local testing

The demo mode flag is implemented in:

`src/shared/config/demo.ts`

## Database Layer

The database layer is located in `packages/db/`.

AuthForge uses Prisma as the ORM.

The current AuthForge baseline is validated against **Prisma 6.x**
for traditional Node.js and PostgreSQL server environments.

Major dependency upgrades (including future Prisma major versions)
may introduce architectural changes and should be evaluated carefully
before adoption.

Key principles:

- each installation uses its own isolated database
- migrations represent the complete schema history
- only the authentication domain interacts with persistence

### Auth Table Isolation

AuthForge stores authentication data in dedicated tables
prefixed with `auth_`.

Example tables:

- `auth_users`
- `auth_sessions`
- `auth_accounts`
- `auth_password_reset_tokens`
- `auth_email_verification_tokens`

This isolation provides several advantages:

- avoids naming conflicts with existing application tables
- allows AuthForge to be integrated into an existing database
- keeps authentication data clearly separated from business data
- simplifies future migrations or removal of the authentication system

AuthForge does **not require a dedicated database**.
It can safely operate inside an existing PostgreSQL database.

The database layer is considered an implementation detail and must not be accessed directly by UI or API layers.

## Extension Points

AuthForge is designed to be extended safely.

Common extension points:

- post-login behavior (redirects, onboarding)
- email delivery implementation
- session lifetime policies
- UI customization

Core architectural boundaries should remain intact when extending functionality.

## Summary

AuthForge enforces strict boundaries between:

- UI
- API handlers
- authentication business logic
- database layer

This structure keeps the system predictable, maintainable, and production-ready while allowing controlled extension and safe customization without compromising security boundaries.

The current release baseline is validated against Prisma 6.x.
