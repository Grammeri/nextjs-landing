# UI Principles

This document defines the golden rules for UI design in AuthForge.

It establishes a strict, token-based system for typography, spacing, radius, borders, and motion.

The goal is to provide a stable, predictable UI foundation, prevent visual drift, and ensure long-term maintainability.

These principles describe the default UI system used by AuthForge. You may adapt or extend them, but doing so means you take responsibility for consistency and maintainability.

---

## Scope

These principles apply to all UI rendered by the application.

They define system constraints and usage rules for the UI.

The document itself follows the rules it defines.

## Core principles

AuthForge UI is driven by design tokens.

Design tokens act as the API for visual styling.

Visual values must not be defined ad hoc in components.

All decisions are semantic, not aesthetic.

The system is intentionally constrained.

## Responsive design

AuthForge UI is responsive by default.

Authentication screens use a mobile-first layout and adapt automatically to different screen sizes.

Layouts rely on flexible containers and vertical form composition, ensuring consistent behavior across mobile devices, tablets, and desktops.

No additional configuration is required for responsive behavior.

## Typography system

Typography is role-based, not appearance-based.

Text size is chosen by semantic meaning.

Only the predefined typography scale is allowed.

Display is used only for large marketing or hero sections.

Display is not allowed in authentication flows or forms.

Tokens:

- `--text-display`
- `--line-display`

H1 is the primary heading of a screen.

H1 is used for page-level titles and authentication form titles.

Requirements:

- Exactly one H1 per screen
- Applied explicitly
- No global element overrides

Tokens:

- `--text-h1`
- `--line-h1`

H2 is a secondary section heading.

H2 is used for sub-sections and logical grouping.

Tokens:

- `--text-h2`
- `--line-h2`

H3 is an internal heading.

H3 is used for minor sections or labeled groups.

Tokens:

- `--text-h3`
- `--line-h3`

Body is the default UI text size.

Body is used for descriptions, instructions, and general content.

Body is the baseline typography size.

Tokens:

- `--text-md`
- `--line-md`

Body text must never be scaled up to heading sizes.

Meta is secondary or supporting text.

Meta is used for hints, helper text, secondary links, and minor labels.

Meta text must use muted color tokens.

Tokens:

- `--text-sm`
- `--line-sm`

## Typography usage rules

Typography tokens must be applied explicitly where needed.

Browser defaults may exist but must not be relied upon as design intent.

If a new font size appears necessary, the typography role selection is incorrect.

Introducing additional font sizes is not allowed.

## Spacing system

Spacing defines vertical and horizontal rhythm.

Only spacing tokens may be used.

Arbitrary spacing values are not allowed.

Tokens:

- `--space-xs`
- `--space-sm`
- `--space-md`
- `--space-lg`
- `--space-xl`

Spacing must be consistent and proportional across the UI.

## Radius system

Radius tokens define component shape.

Only predefined radius tokens may be used.

Tokens:

- `--radius-sm`
- `--radius-md`
- `--radius-lg`

Components must not define custom border-radius values.

## Border system

Borders are part of the visual system.

Border width must be tokenized.

Tokens:

- `--border-width-none`
- `--border-width-sm`

Arbitrary border widths are not allowed.

## Motion system

Motion is used for feedback and state transitions.

Only predefined motion tokens may be used.

Tokens:

- `--motion-fast`
- `--motion-base`

Motion must be subtle and consistent.

## Non-tokenized values

Layout and behavior values are not tokenized.

Examples include:

- flex and grid configuration
- positioning
- width and height constraints
- text alignment
- cursor behavior

These values are allowed to be defined inline or in component styles.

## Prohibited practices

The following practices are not allowed:

- Arbitrary pixel values for visual styling
- Introducing new design tokens without updating the UI principles
- Visual-based styling decisions
- Global overrides of semantic elements
- Bypassing the token system for convenience

## Summary

AuthForge provides an opinionated UI foundation.

Design tokens define the visual system.

Golden rules define how tokens are used.

The system is intentionally limited to remain stable and predictable.
