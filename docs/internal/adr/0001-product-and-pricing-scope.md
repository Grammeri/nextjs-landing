# ADR-0001: Product and Pricing Scope

This document records an architectural decision regarding product structure,
pricing model, and scalability boundaries in the Next.js Landing repository.

It defines the current scope and explicitly documents which scalability concerns
are intentionally deferred.

---

## Context

The landing page currently serves a small number of standalone products.

Each product:
- is sold as a one-time license
- has a single fixed price
- is represented by a single pricing card

There are no subscriptions, no tiered plans, and no per-user billing.

At the same time, the system is expected to grow to support additional products
in the future.

This decision clarifies which scalability concerns are addressed now and which
are intentionally postponed.

## Decision

The system adopts a single-tier pricing model per product.

Each product:
- has exactly one price
- uses a single pricing card
- does not support plan variants or subscriptions

PricingCard is treated as an atomic UI component.

More complex pricing structures (multiple tiers, comparisons, tables) are
explicitly out of scope at this stage.

## Rationale

The current approach avoids premature abstraction.

Introducing pricing grids, product configuration layers, or plan comparison
logic is unnecessary while:
- the number of products is small
- each product has a single price
- pricing logic is static

The chosen structure keeps the codebase simple while preserving the ability
to evolve without breaking changes.

## Consequences

The following constraints are accepted:
- product data may be duplicated across pages
- pricing information is defined inline
- a single demo URL may exist per product

The following future changes are expected but deferred:
- centralized product configuration
- per-product demo configuration
- page-level metadata per product
- multi-tier or subscription pricing

These changes can be introduced incrementally without refactoring existing
components.

## Status

Accepted.

This decision remains valid until a product requires:
- multiple pricing tiers
- subscription-based billing
- plan comparison UI
