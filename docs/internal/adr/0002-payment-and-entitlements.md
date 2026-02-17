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

The landing application **stores purchase and license (entitlement) data in its own database**
using **Prisma** as the ORM.

A dedicated License model represents product access and is linked one-to-one with an Order.

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
application database or entitlement engine.

Persisting billing and license data internally provides:

- **Idempotency guarantees**
  - webhook retries do not create duplicate orders or duplicate licenses

- **Clear separation of concerns**
  - `Order` represents financial lifecycle
  - `License` represents access lifecycle

- **Deterministic access control**
  - licenses are automatically revoked when an order is refunded
  - partial and full refunds are reflected in internal state

- **Operational control**
  - resend access emails
  - revoke or reissue licenses
  - manually adjust access if needed

- **Support tooling**
  - ability to answer customer support requests
  - inspect order status, refund state, and license state independently

- **Financial consistency**
  - cumulative refund tracking
  - lifecycle state enforcement (`PAID`, `PARTIALLY_REFUNDED`, `REFUNDED`)
  - database-level constraints prevent inconsistent billing states

- **Scalability**
  - future admin UI
  - bundles and cross-product licenses
  - upgrade paths
  - additional payment providers

- **Vendor independence**
  - ability to change or add payment providers without losing entitlement data

The AuthForge product already uses Prisma and a database-backed architecture.
Aligning the landing with the same persistence model reduces conceptual and
operational complexity while enabling long-term scalability.

---

## Consequences

The landing application:

- includes a database connection
- defines an `Order` table for financial state
- defines a `License` table for entitlement state

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
- - advanced license policies (expiration windows, seat limits)
- license transfer mechanisms

These features can be layered on top of the entitlement model without
architectural changes.

---

---

## Refund Handling and License Revocation Strategy (Amendment – 2026-02)

### Context

Stripe supports partial and full refunds.

Refund events are cumulative by nature (`charge.amount_refunded` represents
the total refunded amount, not the delta).

The system must:

- correctly track cumulative refunds
- avoid double counting
- preserve access during partial refunds
- automatically revoke access on full refund
- remain idempotent under webhook retries

---

### Decision

Refund state is derived from cumulative refunded amount:

- If `refundedAmount === 0` → status = `PAID`
- If `refundedAmount < order.amount` → status = `PARTIALLY_REFUNDED`
- If `refundedAmount === order.amount` → status = `REFUNDED`

License behavior:

- `PARTIALLY_REFUNDED` → license remains `ACTIVE`
- `REFUNDED` → license is automatically set to `REVOKED`
- `payment_intent.canceled` → treated as full refund → `REVOKED`

License revocation occurs only when the order reaches the `REFUNDED` state.

---

### Rationale

This strategy ensures:

- Correct handling of cumulative Stripe refunds
- Protection against duplicate webhook delivery
- Controlled entitlement lifecycle
- No premature license revocation during partial refunds
- Automatic prevention of access after full refund
- Consistent financial and entitlement state transitions

This enforces a deterministic order-to-license state machine.

---

### Tested Scenarios

The following cases were verified in development:

- Partial refund (10 USD of 99 USD)
  - Order → `PARTIALLY_REFUNDED`
  - License → `ACTIVE`

- Full refund (99 USD of 99 USD)
  - Order → `REFUNDED`
  - License → `REVOKED`

- Multiple webhook deliveries
  - No duplicate orders
  - No duplicate license issuance
  - No inconsistent refund accumulation

## Status

Accepted.

This decision remains valid until the system introduces:

- subscription-based billing
- multi-tenant license management
- cross-product entitlement inheritance
