Stripe Order Lifecycle, Refund, and License Entitlement Model

This document records an architectural decision regarding Stripe order lifecycle,
refund handling, and billing state management in the Next.js Landing repository.

It formalizes implemented behavior and documents the planned extension path.

---

## Context

The landing application sells standalone digital products through one-time Stripe
Checkout payments.

The initial billing flow supported:

- checkout session handling
- order creation
- webhook confirmation
- basic refund processing

As refund logic evolved, the system required:

- partial refund support
- cumulative refund tracking
- explicit order lifecycle states
- financial consistency guarantees

The key decision was how Stripe refund events should update internal order state
without introducing double counting or inconsistent lifecycle transitions.

## Decision

The system adopts a state-driven `Order` lifecycle with cumulative refund
tracking.

Stripe is treated as:

- payment processor
- external event source

The application database is treated as:

- authoritative billing state
- lifecycle controller for order status

Refund events from Stripe (`charge.refunded`) are mapped to internal state
transitions. Refund totals are derived from Stripe cumulative values and clamped
to avoid overflow.

## Implemented Capabilities

### Checkout processing

Stripe Checkout creates an `Order` record and stores:

- `productId`
- `buyerEmail`
- `providerSessionId`
- `providerPaymentIntentId`
- `amount`
- `currency`
- legal consent metadata (`termsVersion`, IP, user agent)

Idempotency is enforced by `providerSessionId`.

### Order lifecycle states

`Order.status` supports:

- `PAID`
- `PARTIALLY_REFUNDED`
- `REFUNDED`

Status is computed from `refundedAmount` relative to `amount`:

- `refundedAmount = 0` -> `PAID`
- `0 < refundedAmount < amount` -> `PARTIALLY_REFUNDED`
- `refundedAmount >= amount` -> `REFUNDED`

### Partial refund support

The system supports:

- single partial refunds
- multiple partial refunds
- cumulative refund aggregation
- automatic status transitions

Stripe cumulative `charge.amount_refunded` is used as the source value:

- `refundedAmount = min(charge.amount_refunded, order.amount)`

### Refund safety guards

Two protection layers are applied:

- application guard: clamp refund totals to original order amount
- database guard: enforce `refundedAmount <= amount`

This guarantees financial integrity even if application logic changes.

### Supported webhook events

The billing webhook handles:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `charge.refunded`
- `payment_intent.canceled`

Webhook handling is idempotent and safe for duplicate delivery.

### License layer implementation

A dedicated `License` model is introduced to represent product entitlement.

Each `Order` may have exactly one associated `License`.

License characteristics:

- one-to-one relation with Order (`orderId` unique)
- productId reference
- customer email reference
- status-based lifecycle (`ACTIVE`, `REVOKED`)
- revocation timestamp
- optional `validUntil` support for future extensions

License issuance is performed during successful checkout processing.

The system uses an idempotent `upsert` operation to ensure:

- duplicate webhook delivery does not create duplicate licenses
- license status can be safely reactivated if needed

On refund or payment cancellation:

- all licenses linked to the order are marked `REVOKED`
- `revokedAt` timestamp is stored
- access revocation is deterministic and automatic

This formalizes entitlement as a first-class domain concept rather than
deriving access from order status alone.

## Rationale

Stripe is not used as the application state engine.

Persisting lifecycle state internally provides:

- deterministic refund tracking
- reliable order status transitions
- internal auditability
- future entitlement revocation support
- operational control for support tooling
- extension path for additional providers
- - separation of financial state from entitlement state
- deterministic product access enforcement

This follows event-driven architecture principles while preserving the database
as the source of truth for billing state.

## Consequences

The billing layer now:

- maintains lifecycle state internally
- supports partial and full refunds
- enforces refund consistency at the database level
- introduces a dedicated License (entitlement) layer
- automatically revokes access on refund
- separates external payment events from internal domain logic

This introduces moderate complexity and improves reliability and scalability.

## Planned Extensions

The following capabilities are planned and not yet implemented:

- BillingEvent audit log (store raw events, processing status, replay/debug support)
- Dispute handling (`charge.dispute.created`, `charge.dispute.closed`)
- Admin billing interface (orders, refunds, access revocation, resend emails)
- Invoice and VAT support (invoice numbers, PDF receipts, future EU readiness)

## Status

Accepted.

This decision formalizes Stripe lifecycle and partial refund support as a
foundation of the Billing Core. Future enhancements extend this model without
replacing it.