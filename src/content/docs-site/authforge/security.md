# Security Model

This document describes the security baseline implemented in AuthForge.

AuthForge is designed as a secure-by-default authentication foundation. The system ships with production-safe defaults and does not rely on optional configuration flags to enable security features.

Core authentication architecture remains the same in both demo and production modes, but some security checks are intentionally relaxed in demo mode for local development convenience.

Some operational behavior may differ in demo mode (for example, relaxed email verification checks) to simplify local development.

---

## Goal

AuthForge provides a secure-by-default authentication baseline for local development, demo environments, and production deployments.

## Authentication Security

AuthForge implements email and password authentication using strong hashing and strict validation rules.

Authentication guarantees:

- All input is validated using Zod schemas
- Passwords are hashed using bcrypt before storage
- Plain-text passwords are never stored
- Password comparison is performed using `bcrypt.compare(...)`

Optional breached password detection is supported via the Have I Been Pwned k-anonymity model.

If enabled, AuthForge checks whether a password appears in known data breaches without sending the full password to external services.

## Session Security

AuthForge uses server-managed session identifiers stored in cookies.

Session guarantees:

- Sessions are stored in the database
- Session identifiers are transmitted via HttpOnly cookies
- Cookies are inaccessible to client-side JavaScript
- Production cookies use the `secure` flag
- `sameSite=lax` reduces cross-site request risks
- Session expiration is enforced server-side

Session validation is enforced server-side through session lookup and expiration checks in the authentication model.

## Token Security

Authentication-related tokens are never stored in plain text.

Token guarantees:

- Verification tokens are stored as hashes
- Password reset tokens are stored as hashes
- Raw tokens are only visible at generation time
- Tokens cannot be reconstructed from the database

Tokens are hashed using a server-side secret (`AUTH_TOKEN_PEPPER`) which prevents token reconstruction even if the database is compromised.

If the database is compromised, raw tokens cannot be recovered.

## Input Validation

All external input is validated before reaching domain logic.

Validation guarantees:

- Zod schemas validate all API input
- Validation occurs before domain service execution
- Invalid input never reaches the persistence layer
- Validation rules remain centralized in schema files

Server-side validation remains centralized in schema files and route handling. Client-side form layers also use schema-based validation helpers for UX, but domain enforcement does not rely on client execution.

## Rate Limiting

Authentication endpoints are protected with request rate limiting.

Characteristics:

- Fixed-window strategy
- In-memory storage
- Keyed by IP address, and by email where available for the specific route

The current configuration uses a 15-minute rate-limit window. The exact attempt limit is defined in the auth rate-limit configuration.

Protected routes include:

- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/forgot-password`
- `/api/auth/reset-password`
- `/api/auth/verify-email`
- `/api/auth/resend-verification`

The rate limiter operates at the route layer and does not interact with the domain layer.

Distributed deployments may replace this implementation with a shared-store limiter.

## Error Disclosure Policy

AuthForge enforces strict authentication error disclosure rules.

Authentication flows are designed to avoid revealing:

- whether an account exists
- whether a password is incorrect

Token-related errors may return specific states (for example expired or invalid tokens) because token possession already implies prior authorization.

Authentication responses are intentionally generic to prevent enumeration attacks.

Example:

```
Invalid credentials
```

Authentication error disclosure remains intentionally constrained in both demo and production modes, although demo mode may expose additional operational convenience flows such as demo verification or reset links.

## Demo Mode Isolation

AuthForge supports a demo mode for local testing.

Demo mode:

- disables external side effects such as production email delivery
- keeps authentication logic active
- keeps database persistence active
- preserves the core authentication architecture while allowing local-development convenience flows

Demo mode preserves the core authentication model, but some operational behavior changes for local development convenience (for example demo verification and reset flows).

## Architectural Security Boundaries

AuthForge enforces strict architectural boundaries to prevent security regressions.

Architectural constraints include:

- keeping business logic outside route handlers
- keeping Prisma usage inside the domain layer
- avoiding secret access inside client components
- limiting public API exposure
- maintaining clear feature boundaries

These constraints reduce the risk of accidental security violations.

## Security Environment Variables

Certain environment variables are required to maintain security guarantees.

Important variables include:

- AUTH_TOKEN_PEPPER — server-side secret used for token hashing
- APP_URL — used when generating verification and reset links
- RESEND_API_KEY — required for Resend-based production email delivery
- EMAIL_FROM — sender address for authentication emails

These variables must never be exposed to client-side code.

When demo mode is disabled, these variables must be properly configured.

## Production Responsibility

AuthForge is a source-code product.

Production deployment security depends on proper infrastructure configuration.

Production environments should ensure:

- HTTPS termination
- secure secret storage
- protected database access
- proper environment variable management

AuthForge provides a secure application-layer baseline but does not manage infrastructure security.

## Summary

AuthForge security design focuses on:

- secure defaults
- minimal public surface
- deterministic behavior
- architectural isolation
- strong validation guarantees

Security mechanisms are implemented directly in the application architecture rather than relying solely on configuration discipline.
