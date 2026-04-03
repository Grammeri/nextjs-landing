# Email Delivery

This document explains how email delivery is handled in AuthForge and how demo mode differs from
real provider-based delivery.

Email sending is kept separate from authentication domain rules so that delivery
infrastructure can change without rewriting core business logic.

---

## Purpose

AuthForge includes email-driven flows such as:

- email verification
- password reset
- account-related notifications

Email delivery is treated as an infrastructure concern and a replaceable side effect,
not as part of the core authentication domain model.

This separation allows AuthForge to:

- run in demo mode without external email services
- switch to real providers in preview and production environments
- keep authentication logic stable while changing delivery infrastructure

## Demo Mode Behavior

In demo mode:

- email delivery is stubbed through the demo provider
- registration may expose a demo verification link
- password reset may expose a demo reset link
- no external email provider is required

Demo mode is intended for local development, testing, and evaluation only.

Production and production-like preview validation should use a real email provider.

## Production Behavior

For production-style delivery, AuthForge uses a real provider integration configured through
environment variables.

AuthForge includes a small internal integration layer for sending emails, with demo and Resend-based providers behind a replaceable provider boundary.

Provider credentials, sender identity, and delivery configuration remain infrastructure-level concerns.

This means AuthForge does not require changes to authentication domain logic when email infrastructure changes.

## Supported Provider Pattern

AuthForge is designed to support multiple provider implementations behind a replaceable sending
layer.

Typical examples include:

- demo delivery for local or evaluation mode
- Resend for real transactional delivery

The domain layer should never depend directly on provider-specific SDK behavior.

## Configuration Overview

Real email delivery is configured through environment variables.

Common variables include:

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `APP_URL`
- `AUTH_DEMO_MODE`

These values control:

- provider authentication
- sender identity
- absolute URL generation for verification and reset links
- demo-mode behavior

Provider-specific requirements may vary, but the delivery integration should remain isolated
from authentication domain rules.

## Integration Principles

When integrating email delivery:

- keep provider-specific logic isolated
- avoid embedding provider SDK logic directly into authentication services
- treat sending as a side effect, not as a domain rule
- generate links from environment-aware configuration
- keep delivery concerns replaceable

Email delivery failures should not corrupt authentication state.

## Authentication Email Flow

AuthForge currently uses email delivery for authentication-related flows such as verification, resend verification, and password reset.

A typical authentication email flow includes:

- user action that triggers an auth email flow
- token generation inside the authentication domain
- link generation from `APP_URL`
- provider-based delivery in production mode or demo-provider behavior in demo mode

The email itself is part of delivery infrastructure, while authentication state remains governed by the domain layer.

## Validation Status

The current AuthForge implementation includes:

- a demo email provider for local and evaluation flows
- a Resend-based provider for real transactional auth email delivery
- link generation built from `APP_URL`

This confirms that authentication-related emails can be delivered through a replaceable provider layer without changing core authentication domain logic.

## Customizing Email Content

Email templates and content can be customized without modifying domain rules.

Common customization points include:

- subject lines
- body templates
- branding and visual styling
- localization

Template rendering should remain decoupled from authentication logic.

## Error Handling

Email delivery errors should be handled carefully and logged clearly.

Recommended approach:

- log delivery failures
- avoid leaking provider-specific errors to end users
- preserve correct authentication state
- keep retry and operational handling outside the domain model where possible

Authentication behavior should remain deterministic even when email delivery fails.

## Security Considerations

When configuring email delivery:

- protect provider credentials
- never expose secrets to the client
- use absolute URLs from trusted environment configuration
- ensure verification and reset links are secure
- ensure protected resources still require server-side validation

Email delivery must never bypass verification or other security rules
enforced by the server.

## Summary

AuthForge keeps email delivery decoupled from authentication domain logic.

Demo mode supports development without real providers, while preview and production deployments
can use real transactional auth email delivery through provider configuration such as Resend.

This approach keeps core logic stable, testable, and independent of delivery infrastructure.
