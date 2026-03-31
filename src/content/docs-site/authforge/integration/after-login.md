# After Login Behavior

This document explains how to customize behavior that occurs after a successful login in
AuthForge.

It focuses on redirects, onboarding flows, and post-login side effects without modifying the
core authentication logic.

---

## Default Behavior

AuthForge does not enforce redirects inside the authentication domain or API routes.

After login:

- the authentication session is created
- the client receives a successful response
- navigation decisions are handled on the client side

## Customizing the Redirect

The provided `LoginForm` component performs a client-side redirect after successful login.

If different behavior is required, override the default `onSuccess` handler and perform the redirect there.

This design keeps authentication logic independent from application-specific UX decisions.

## Where Post-Login Logic Lives

Post-login behavior should be implemented outside the authentication domain.

Recommended locations include:

- application-level routing logic
- client-side navigation handlers
- feature-specific onboarding flows

Authentication logic itself should remain unchanged.

## Dependency Boundaries

Post-login behavior must depend on authentication state,
but the authentication domain must not depend on application-specific logic.

Dependencies should always flow outward from the auth domain.

## Redirecting After Login

Redirects after login are typically handled on the client side.

Common patterns include:

- redirecting to a dashboard
- redirecting to the last visited protected page
- conditional redirects based on user role or state

Redirect logic should rely on authentication state rather than be embedded inside the auth domain.

## Role-Based Navigation

If your application uses roles or permissions, post-login behavior can depend on them.

Examples:

- admins redirected to an admin panel
- regular users redirected to a dashboard
- first-time users redirected to onboarding

Role-based logic should be implemented at the application level using authenticated user data.

## Onboarding Flows

AuthForge does not enforce onboarding flows.

If onboarding is required:

- detect first-time logins using application state
- redirect users accordingly
- store onboarding completion status in your own domain

This keeps authentication focused on identity and access control only.

## Notifications and Side Effects

Post-login side effects may include:

- displaying welcome messages
- triggering analytics events
- initializing user-specific data

These effects should be implemented outside the authentication domain to avoid coupling auth
logic to application concerns.

## What Not to Do

Avoid the following patterns:

- hardcoding redirects inside authentication services
- embedding UI navigation logic in API routes
- mixing authentication rules with product-specific behavior

Such coupling makes the system harder to reason about and extend.

## Logout

AuthForge provides a built-in logout endpoint that invalidates the current session.

Logout is handled server-side to ensure that authentication cookies are properly cleared
and the session becomes invalid.

### API endpoint

```
POST /api/auth/logout
```

When called:

- the active session is invalidated
- the authentication cookie is cleared
- the user becomes unauthenticated

### Example usage

```ts
await fetch('/api/auth/logout', {
  method: 'POST',
  credentials: 'include',
```

In most applications, logout is triggered from a UI element such as a button in a navigation
menu or account panel.

Example:

```tsx
<button onClick={logout}>Logout</button>
```

AuthForge intentionally does not provide an application dashboard or built-in account UI.

Integrating logout into your application's navigation is the responsibility of the consuming
application.

## Summary

AuthForge intentionally keeps post-login behavior flexible and decoupled from core authentication logic.

Redirects, onboarding, and side effects should be implemented at the application layer, while
the authentication domain remains focused on identity, sessions, and security.
