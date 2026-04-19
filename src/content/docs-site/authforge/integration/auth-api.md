# Auth API Contract

This document describes the normalized response contract used by AuthForge authentication API routes.

The goal of this contract is to keep authentication responses predictable, machine-readable, and easy to map to localized UI copy.

Client applications should treat authentication API responses as a stable integration boundary.

This document is for developers integrating with or extending AuthForge authentication HTTP routes. It is not a substitute for domain implementation details inside the authentication feature modules.

---

## Overview

Authentication API routes return one of two response shapes:

- success responses
- error responses

The contract is intentionally minimal.

AuthForge does not rely on backend-provided human-readable error text for UI rendering. Client applications should map authentication error codes to localized UI copy.

## Success responses

Successful authentication responses use a normalized success shape.

```json
{ "success": true }
```

Some flows may include additional fields when needed.

In demo mode, success responses may include extra fields for local development and evaluation.

Registration may return:

```json
{
  "success": true,
  "demoVerificationUrl": "http://localhost:3000/en/verify-email?token=..."
}
```

Forgot password may return:

```json
{
  "success": true,
  "demoResetPasswordUrl": "http://localhost:3000/en/reset-password?token=..."
}
```

These fields are optional and are intended for local development and evaluation flows.

## Error responses

Authentication API routes return normalized machine-readable error payloads.

Standard error shape:

```json
{ "code": "SOME_ERROR_CODE" }
```

Validation failures may include structured validation details. Issue objects may contain a `message` field describing the validation problem for that path; clients should still treat the top-level `code` as the primary signal and map it to localized copy for form-level messaging.

```json
{
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "path": ["email"],
      "message": "Invalid email address"
    }
  ]
}
```

## Code-driven errors

Client applications must rely on `code`, not on a top-level backend `message` field on the error JSON.

AuthForge keeps the public error contract code-driven so that:

- UI copy can be localized on the client
- backend error payloads remain stable
- presentation stays separate from domain and API concerns

## Auth error codes

The following authentication error codes are part of the current AuthForge contract:

- `EMAIL_ALREADY_EXISTS`
- `EMAIL_ALREADY_VERIFIED`
- `EMAIL_NOT_VERIFIED`
- `INVALID_CREDENTIALS`
- `INVALID_JSON_PAYLOAD`
- `INVALID_RESET_TOKEN`
- `INVALID_VERIFICATION_TOKEN`
- `PASSWORD_PWNED`
- `TOKEN_ALREADY_USED`
- `TOKEN_EXPIRED`
- `TOO_MANY_REQUESTS`
- `VALIDATION_ERROR`
- `UNKNOWN_ERROR`

These codes are defined centrally in the authentication domain.

## Recommended client handling

Client applications should:

- inspect the `code` field
- map `code` to localized UI copy
- use `errors` only for validation-specific handling when needed
- treat unknown codes as a generic authentication failure

Typical client-side pattern:

```ts
if (error.code === 'INVALID_CREDENTIALS') {
  // show localized invalid credentials message
}
```

AuthForge includes client-side mapping helpers for this purpose inside the authentication feature.

## Route-level normalization

Authentication API routes are intentionally thin adapters.

Each route is responsible for:

- parsing request input
- applying route-level checks such as rate limiting
- delegating business logic to the authentication domain
- returning normalized success or error payloads

This keeps the API surface stable while allowing domain internals to evolve.

## Demo mode

Demo mode does not change the normalized API contract. It only adds optional development-friendly success fields where applicable, such as `demoVerificationUrl` and `demoResetPasswordUrl`.

Error handling remains code-driven in both demo and production-style flows.

## Summary

AuthForge normalizes authentication API responses as:

- success: `{ success: true, ...optionalFields }`
- error: `{ code, errors? }`

Client applications should always map `code` values to localized UI messages and must not depend on backend-provided human-readable error text for the primary error experience.
