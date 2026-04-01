# Email Delivery

This document explains how email delivery is handled in AuthForge, how demo mode differs from
real provider-based delivery, and what was validated in the preview commerce flow.

Email sending is kept separate from authentication and purchase domain rules so that delivery
infrastructure can change without rewriting core business logic.

---

## Purpose

AuthForge includes email-driven flows such as:

- email verification
- password reset
- account-related notifications
- post-purchase access and download emails

Email delivery is treated as an infrastructure concern and a replaceable side effect,
not as part of the core authentication or purchase domain model.

This separation allows AuthForge to:

- run in demo mode without external email services
- switch to real providers in preview and production environments
- keep authentication and purchase logic stable while changing delivery infrastructure

## Demo Mode Behavior

In demo mode:

- email delivery can be stubbed
- verification and password reset links can be returned directly in API responses
- no external email provider is required

Demo mode is intended for local development, testing, and evaluation only.

Production and production-like preview validation should use a real email provider.

## Production Behavior

For production-style delivery, AuthForge uses a real provider integration configured through
environment variables.

AuthForge may include a small internal integration layer for sending emails, but provider
selection, credentials, sender identity, and delivery configuration remain infrastructure-level
concerns.

This means AuthForge does not hard-code delivery to a single provider and does not require
changes to authentication or purchase domain logic when email infrastructure changes.

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
- `NEXT_PUBLIC_SITE_URL`
- `AUTH_DEMO_MODE`

These values control:

- provider authentication
- sender identity
- absolute URL generation for verification, reset, or download links
- demo-mode behavior

Provider-specific requirements may vary, but the delivery integration should remain isolated
from authentication and purchase domain rules.

## Integration Principles

When integrating email delivery:

- keep provider-specific logic isolated
- avoid embedding provider logic directly into authentication services
- treat sending as a side effect, not as a domain rule
- generate links from environment-aware configuration
- keep delivery concerns replaceable

Email delivery failures should not corrupt authentication state, order state, or license state.

## Purchase Email Flow

AuthForge also supports transactional purchase emails for paid product delivery.

A typical purchase email flow includes:

- successful checkout
- webhook processing
- order creation
- license creation
- generation of a secure download link
- delivery of a product-specific access email

The email itself is part of post-purchase delivery, but the order and license lifecycle must
remain consistent even when the delivery provider changes.

## Preview Validation Status

The preview commerce flow validated real transactional delivery with:

- Stripe checkout
- webhook processing
- database persistence
- Resend-based email delivery
- secure download links built from `NEXT_PUBLIC_SITE_URL`

This validation confirmed that post-purchase emails can be sent successfully without changing
authentication or purchase domain logic.

## Customizing Email Content

Email templates and content can be customized without modifying domain rules.

Common customization points include:

- subject lines
- body templates
- branding and visual styling
- localization
- product-specific access instructions

Template rendering should remain decoupled from authentication and billing logic.

## Error Handling

Email delivery errors should be handled carefully and logged clearly.

Recommended approach:

- log delivery failures
- avoid leaking provider-specific errors to end users
- preserve correct authentication, order, and license state
- keep retry and operational handling outside the domain model where possible

Authentication and purchase behavior should remain deterministic even when email delivery fails.

## Security Considerations

When configuring email delivery:

- protect provider credentials
- never expose secrets to the client
- use absolute URLs from trusted environment configuration
- ensure verification, reset, and download links are secure
- ensure protected resources still require server-side validation

Email delivery must never bypass verification, entitlement checks, or other security rules
enforced by the server.

## Summary

AuthForge keeps email delivery decoupled from authentication and purchase domain logic.

Demo mode supports development without real providers, while preview and production deployments
can use real transactional delivery through provider configuration such as Resend.

This approach keeps core logic stable, testable, and independent of delivery infrastructure.
