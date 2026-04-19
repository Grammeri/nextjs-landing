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
- successful registration may return `demoVerificationUrl` instead of sending a real email
- successful password reset requests may return `demoResetPasswordUrl` instead of sending a real email
- some security-sensitive behavior is preserved, while selected checks are simplified for local usage

AuthForge does not include a built-in email delivery provider.
Email sending is intentionally delegated to the consuming application.

In demo mode, email-related side effects are stubbed and logged locally instead of being sent via an external service.

The goal is to remove operational friction while preserving predictable behavior.

## What Does NOT Change

The following components retain the same overall architecture as in production:

- authentication domain structure
- API route surface
- session and cookie strategy
- database schema and migrations
- core UI flows

Authentication responses remain normalized in demo mode.

Successful responses still use the same `{ success: true }` contract, with optional demo-only fields where applicable.
Error responses remain code-driven.

Demo mode does not introduce a separate codebase or weaken architectural boundaries, but some authentication checks are intentionally relaxed for local-development convenience.

## Domain Integrity

Demo mode does not introduce a separate domain model.

Validation logic, session policies, and architectural boundaries remain active, but selected authentication checks may be relaxed for demo-mode usage.

External email-related side effects are replaced with local stub behavior.

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
- successful registration may return `demoVerificationUrl`
- successful password reset requests may return `demoResetPasswordUrl`
- selected authentication checks may be simplified for local-development usage

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

- demo mode does not introduce a separate shared demo account model
- sensitive operations are still validated by the domain layer
- frontend demo UI behavior remains separate from backend authentication rules

Production deployments must explicitly disable demo mode.

## Deployment Guidance

Use demo mode only for:

- local development
- evaluation after cloning the repository
- internal demos

When connecting AuthForge to a new database, ensure that the database schema matches the Prisma schema and current migrations.

Demo mode is not designed for production use and must be explicitly disabled before deploying to any public environment.

## Summary

Demo mode provides a frictionless way to explore AuthForge without compromising its
architecture.

It simplifies external dependencies while preserving the same authentication flows and
system boundaries used in production.
