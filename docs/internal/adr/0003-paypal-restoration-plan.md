# ADR-0003 — PayPal Restoration Plan
This document records an architectural decision regarding temporarily deferring PayPal support while keeping the integration code preserved and ready for restoration.

---

## Context
The project currently ships with Stripe as the only enabled payment provider.

PayPal integration code is intentionally preserved in the codebase but disabled.

Reasons:

- Stripe is sufficient for initial launch
- PayPal requires additional business verification and setup
- launch must remain minimal and stable
- removing PayPal completely would create unnecessary rework later

PayPal support is therefore treated as a deferred feature rather than deleted functionality.

## Decision
PayPal is disabled at the configuration level.

The implementation code remains present but is not exposed in the UI.

This approach guarantees:

- no broken imports
- no dead code removal risk
- fast restoration once PayPal becomes operational

## Current State (Stripe-only)
PayPal is currently disabled via the billing configuration.

File:

```ts
src/shared/config/billing.ts
```

Configuration:

```ts
export const BILLING_PROVIDERS = {
  stripe: true,
  paypal: false,
} as const;
```

All PayPal UI elements are conditionally rendered based on this flag.

## Restoration Plan (Re-enable PayPal)
PayPal support can be restored through a controlled configuration change.

### Step 1 — Enable provider flag
File:

```ts
src/shared/config/billing.ts
```

Change:

```ts
paypal: false;
```

To:

```ts
paypal: true;
```

### Step 2 — Re-enable PayPal button in pricing cards
File:

```ts
src/shared/ui/product-pricing/AuthForgePricingCard.tsx
```

Ensure PayPal is passed only when enabled:

```ts
onPayWithPaypal={BILLING_PROVIDERS.paypal ? checkoutWithPaypal : undefined}
```

Apply the same pattern in:

- `src/shared/ui/product-pricing/NextJsTestKitPricingCard.tsx`

### Step 3 — Ensure checkout API accepts PayPal
File:

```ts
src/app/api/billing/checkout/route.ts
```

Provider type must allow:

```ts
provider: 'stripe' | 'paypal';
```

PayPal catalog entries must also be valid.

### Step 4 — Restore PayPal billing implementation
File:

```ts
src/lib/billing/paypal.ts
```

Ensure the PayPal checkout creator is implemented and returns:

- `checkoutUrl`
- metadata support

### Step 5 — Restore webhook support (optional)
If PayPal webhook support is introduced later, implement:

- webhook verification
- purchase entitlement logic

File location:

```ts
src/app/api/billing/webhook/route.ts
```

## Status
Accepted (temporarily deferred).

Notes:

- PayPal is not removed, only hidden
- the codebase remains PayPal-ready
- Stripe launch remains clean and stable
- restoration requires minimal changes once PayPal becomes operational

Outcome:

The project ships with Stripe-only billing while preserving PayPal integration for a future release.