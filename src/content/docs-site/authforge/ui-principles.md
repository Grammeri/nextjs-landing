# UI Principles

This document defines the core UI rules used by AuthForge.

It establishes the token-based system for typography, spacing, radius, borders, and motion.

It is intended for engineers and contributors who implement or modify product UI.

It is not a branding guide, marketing style guide, or content writing guide.

These principles define the default UI system used by AuthForge.

---

## Scope

## Scope

These principles apply to all UI rendered by AuthForge.

They define system constraints and usage rules for visual implementation.

This document follows the rules it defines.

## Core principles

AuthForge UI is driven by design tokens.

Design tokens act as the API for visual styling.

Visual values must not be defined ad hoc in components.

All decisions are semantic, not aesthetic.

The system is intentionally constrained.

## Responsive design

AuthForge UI must be responsive by default.

Authentication screens must use a mobile-first layout.

Layouts must rely on flexible containers and vertical form composition.

Responsive behavior must remain consistent across mobile devices, tablets, and desktops.

Per-screen responsive exceptions must be documented when introduced.

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

H2 is used for sub-sections, logical grouping, and internal section titles within screens.

Tokens:

- `--text-h2`
- `--line-h2`

H3 is an internal heading.

H3 is used for minor sections, labeled groups, or small structural divisions inside larger sections.

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

Meta is used for hints, helper text, validation support text, secondary links, and minor labels.

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

These values may be defined inline or in component styles.

Non-tokenized values must not be used as substitutes for existing visual tokens.

If the same visual value starts repeating across multiple components, it should be evaluated for inclusion in the token system.

## Prohibited practices

The following practices are not allowed:

- Using arbitrary pixel values for visual styling outside the token system
- Introducing new design tokens without updating this document
- Making styling decisions based on appearance rather than semantic role
- Applying global overrides to semantic elements as a substitute for explicit UI roles
- Bypassing the token system for convenience

## Summary

AuthForge uses a constrained UI system.

Design tokens define the visual system.

These rules define how tokens are applied.

The system is intentionally limited to preserve stability and predictability.
