# Email Delivery

This document explains how to configure real email delivery in AuthForge and how it differs
from demo mode behavior.

It focuses on integrating external email providers without changing authentication domain
logic.

---

## Purpose

AuthForge defines email-based authentication flows such as:

- email verification
- password reset
- account-related notifications

Email delivery is treated as an **external integration**, not a core authentication concern.

This separation allows AuthForge to run in demo mode without email services and switch to real
providers for production deployments.

## Demo Mode Behavior

In demo mode:

- email delivery is stubbed
- verification and password reset links are returned in API responses
- no external email provider is required

AuthForge includes a minimal email provider abstraction layer inside the authentication feature.

The active provider implementation is selected at runtime based on the current environment configuration.

This behavior is intended for local development and evaluation only.

Demo mode must be disabled for production deployments.

For production deployments, AuthForge expects the consuming application to integrate
a real email delivery provider.

AuthForge does not implement email delivery internally and does not enforce
any specific provider, protocol, or service.

Email delivery is treated as an external infrastructure concern and is configured
by the consuming application via environment variables and provider-specific settings.

Switching from demo mode to production email delivery does not require changes
to the authentication domain logic. All authentication flows remain unchanged,
with email sending executed as a replaceable side effect.

## Supported Providers

## Configuration Overview

Email-related integration is configured via environment variables defined by the consuming application.

Typical variables include:

- sender email address
- provider-specific credentials
- demo mode toggle

Exact variable names and requirements depend on the active provider implementation.

Refer to Environment variables for the list of base variables.

## Email Provider Architecture

Email sending is abstracted behind a provider layer located in:

src/features/auth/email/

Provider implementations are located in:

src/features/auth/email/providers/

Typical providers include:

- `demo.provider.ts` — used when `AUTH_DEMO_MODE=true`
- `resend.provider.ts` — example production provider

The authentication domain interacts only with the provider interface,
not with provider implementations directly.

This allows switching providers without modifying authentication logic.

## Integration Principles

When integrating email delivery:

- keep provider-specific logic isolated
- avoid embedding email logic into authentication services
- treat email sending as a side effect, not a domain rule

Email failures should not compromise authentication correctness or session integrity.

## Customizing Email Content

Email templates and content can be customized without modifying authentication logic.

Common customization points include:

- subject lines
- email body templates
- branding and visual styling
- localization

Template rendering should remain decoupled from authentication rules.

## Error Handling

Email delivery errors should be handled gracefully.

Recommended approach:

- log email delivery failures
- return neutral responses to the client
- avoid leaking provider-specific errors to users

Authentication flows should remain deterministic even if email delivery fails.

## Security Considerations

When configuring email delivery:

- protect provider credentials
- avoid exposing secrets to the client
- ensure links contain secure, time-limited tokens

Email delivery should never bypass verification or security checks enforced by the domain
layer.

## Summary

AuthForge treats email delivery as an external concern.

Demo mode removes the need for email providers, while production deployments integrate real
services via configuration. This approach keeps authentication logic stable, testable, and
independent of infrastructure choices.
