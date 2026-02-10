# ADR-0002: Payment Processing and Entitlement Storage

This document records an architectural decision regarding payment processing,
purchase tracking, and entitlement storage in the Next.js Landing repository.

It defines how Stripe is used, where purchase data is stored, and which
responsibilities belong to the landing versus the AuthForge product.

---

## Context

The landing application supports selling standalone digital products
(AuthForge, Next.js Test Assignment Kit, etc.) via one-time payments.

Stripe Checkout is used as the primary payment provider.

Payments are asynchronous by nature and rely on webhook-based confirmation.

At the same time, the system must support:

- reliable access delivery
- idempotent payment handling
- post-purchase email notifications
- future scalability (admin tools, refunds, resends, upgrades)

A decision is required regarding whether purchase and entitlement data should:

- rely solely on Stripe as the source of truth, or
- be persisted in a first-party database owned by the landing application.

---

## Decision

The landing application **stores purchase entitlements in its own database**
using **Prisma** as the ORM.

Stripe is treated as:

- the payment processor
- an external event source

The landing database is treated as:

- the authoritative source of entitlements
- the system of record for access control

Webhook events from Stripe are used to **create entitlements**, not to
replace internal state.

---

## Rationale

While Stripe provides reliable payment records, it is not designed to act as an
application database.

Persisting entitlements internally provides:

- **Idempotency guarantees**
  - webhook retries do not create duplicate access
- **Operational control**
  - resend access emails
  - revoke or reissue access
- **Support tooling**
  - ability to answer customer support requests
- **Scalability**
  - future admin UI
  - bundles, upgrades, refunds
- **Vendor independence**
  - ability to change or add payment providers without data loss

The AuthForge product already uses Prisma and a database-backed architecture.
Aligning the landing with the same persistence model reduces conceptual and
operational complexity.

---

## Consequences

The landing application:

- includes a database connection
- defines an `entitlement` (or `purchase`) table
- handles Stripe webhook idempotency internally

Stripe remains responsible only for:

- payment processing
- compliance
- payment event delivery

The following capabilities become possible:

- access resend
- entitlement revocation
- audit logging
- admin dashboards
- migration to additional payment providers

The added complexity of database management is accepted as a tradeoff for
control, reliability, and long-term scalability.

---

## Deferred Concerns

The following are explicitly out of scope at this stage:

- subscriptions
- recurring billing
- usage-based pricing
- complex license hierarchies
- customer self-service portals

These features can be layered on top of the entitlement model without
architectural changes.

---

## Status

Accepted.

This decision remains valid until the system introduces:

- subscription-based billing
- multi-tenant license management
- cross-product entitlement inheritance
