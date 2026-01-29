# Design Tokens System

This document defines the system-level standard for design tokens and is part of internal developer documentation that specifies architectural invariants. This document is read in the IDE.

It is not used for public documentation, marketing content, or onboarding guides.

---

## Purpose

The system ensures visual consistency, predictable UI behavior, scalability, and safe changes.

## Architecture

Design tokens define colors, surfaces, shadows, motion and hover effects, and interaction behavior.

The token system is divided into logical layers.

**Primitive tokens** are base atomic values and are never used directly in components.

Examples:
```css
--color-red-500
--opacity-90
--scale-sm
```

**Semantic tokens** describe intent, not physical values, and are used directly in components.

Examples:
- `--color-primary`
- `--surface-card`
- `--text-secondary`

**Interaction tokens** describe interactive behavior and are used for hover, focus, active, and motion.

Examples:
- `--interaction-hover-opacity`
- `--interaction-hover-scale`
- `--interaction-hover-translate-y`

**Alias tokens** map semantic and interaction tokens to primitive values and allow system-wide changes without touching components.

## Workflow

### Adding a new token

Checklist for adding a new token:

- Identify the token type: primitive, semantic, or interaction.
- Validate whether a similar token already exists.
- Confirm whether a new layer is required.
- Add the token in `globals.css` with clear naming.
- Use the token in components instead of raw values.

## Edge cases

Interaction tokens exist to eliminate magic numbers from hover styles.

Bad example:
```css
.button:hover {
  transform: scale(1.03);
  opacity: 0.9;
}
```

Problems:
- not reusable
- hard to change globally
- no semantic meaning

Good example:
```css
.button:hover {
  transform: scale(var(--interaction-hover-scale));
  opacity: var(--interaction-hover-opacity);
}
```

Benefits:
- consistent behavior
- centralized control
- safe refactoring

## Rules and constraints

Forbidden: raw values in UI components, random hover numbers, and duplicated interaction logic.

Allowed: semantic and interaction tokens only, extending the system properly, and behavior overrides via aliases.

## Verification

The token system is part of the project architecture.

Any change must preserve existing UI, be reversible, and respect system principles.

## Summary

Design tokens are the foundation of the visual architecture.
