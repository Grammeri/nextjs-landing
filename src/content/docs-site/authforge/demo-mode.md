# Demo Mode

Demo mode allows AuthForge to run without external dependencies while preserving the same
authentication architecture used in production.

It exists to let developers explore authentication flows, UI behavior, and system boundaries
without configuring email providers or third-party services.

Demo mode is intended for evaluation and local development only.

Demo mode can be enabled by setting `AUTH_DEMO_MODE=true`
in your environment configuration.

---

## What Demo Mode Is

Demo mode is a **controlled runtime configuration**, not a separate codebase.

When enabled:

- the same authentication flows are executed
- the same API routes and domain logic are used
- the same database schema and session handling apply

Only side effects that require external services are altered.

## What Changes in Demo Mode

When demo mode is enabled:

- email delivery is stubbed
- verification and password reset links are logged instead of being sent
- demo users or predefined credentials may be available
- security-sensitive behavior is preserved but simplified for local usage

AuthForge does not include a built-in email delivery provider.
Email sending is intentionally delegated to the consuming application.

In demo mode, email-related side effects are stubbed and logged locally instead of being sent via an external service.

The goal is to remove operational friction while preserving predictable behavior.

## What Does NOT Change

The following components behave exactly the same as in production:

- authentication domain logic
- API routes and request handling
- session and cookie strategy
- database schema and migrations
- UI components and user flows

Demo mode does not bypass authentication rules or weaken architectural boundaries.

## Domain Integrity

Demo mode does not alter domain invariants or authentication rules.

All validation logic, session policies, and security boundaries remain enforced exactly as in production.

Only external side effects are replaced with local stubs.

## Configuration

Demo mode is controlled via environment configuration.

### Open environment variables reference

The exact environment variables are documented in:

[Environment variables](./environment)

Demo-specific behavior is centralized and enforced consistently across the system.

Demo mode is enabled or disabled via environment variables.

### Enable demo mode

Example configuration:

```env
AUTH_DEMO_MODE=true
```

When this variable is enabled:

- email delivery is stubbed
- verification and password reset links are logged locally
- demo users or predefined credentials may be available
- security-sensitive behavior is preserved but simplified for local usage

### Disable demo mode for production

For production environments, demo mode must be disabled:

```env
AUTH_DEMO_MODE=false
```

When demo mode is disabled, the application is expected to use real
email delivery through the email integration configured by the
consuming application.

## Security Considerations

Demo mode is safe for local development but must never be enabled in publicly accessible environments, including production deployments.

Key principles:

- demo mode does not introduce shared users or shared databases
- demo credentials are local to the running instance
- sensitive operations are still validated by the domain layer

Production deployments must explicitly disable demo mode.

## Deployment Guidance

Use demo mode only for:

- local development
- evaluation after cloning the repository
- internal demos

When connecting AuthForge to a new database (for example Neon or Supabase),
ensure that the database schema matches the Prisma schema.

If the database was created manually or imported from a previous version,
column naming mismatches may occur (camelCase vs snake_case).

Demo mode is not designed for production use and must be explicitly disabled before deploying to any public environment.

## Summary

Demo mode provides a frictionless way to explore AuthForge without compromising its
architecture.

It simplifies external dependencies while preserving the same authentication flows and
system boundaries used in production.
