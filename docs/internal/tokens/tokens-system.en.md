# 🔗 Design Tokens System (Internal)

This project uses a design tokens system to control
visual styling and interaction behavior across the UI.

Design tokens are centralized CSS variables.

---

## 🧠 Architecture

Design tokens define:
- colors
- surfaces
- shadows
- motion and hover effects
- interaction behavior

The goal of this system is to ensure:
- visual consistency
- predictable UI behavior
- scalability
- safe changes without side effects

The token system is divided into logical layers.

### 1. Primitive tokens

Base atomic values.
Never used directly in components.

Examples:
```css
--color-red-500
--opacity-90
--scale-sm
```

### 2. Semantic tokens

Semantic tokens describe intent,
not physical values.

Used directly in components.

Examples:
- `--color-primary`
- `--surface-card`
- `--text-secondary`

### 3. Interaction tokens

Tokens describing interactive behavior.
Used for hover, focus, active, motion.

Examples:
- `--interaction-hover-opacity`
- `--interaction-hover-scale`
- `--interaction-hover-translate-y`

### 4. Alias tokens

Alias tokens map semantic and interaction tokens
to primitive values.

They allow system-wide changes
without touching components.

---

## 🔁 Workflow

How to add a new token (Checklist):

Identify the type:
- primitive
- semantic
- interaction

Validate:
- does a similar token exist
- is a new layer required

Add the token:
- in `globals.css`
- with clear naming

Use the token in components
instead of raw values.

---

## 🧠 Edge cases

### Interaction / Hover tokens

Interaction tokens exist to eliminate
magic numbers from hover styles.

❌ Bad example
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

✅ Good example
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

---

## 📌 Rules and constraints

❌ Forbidden:
- raw values in UI components
- random hover numbers
- duplicated interaction logic

✅ Allowed:
- semantic and interaction tokens only
- extending the system properly
- behavior overrides via aliases

---

## 🧪 Verification

CI and system integrity

The token system is part of the project architecture.

Any change must:
- preserve existing UI
- be reversible
- respect system principles

---

## 🏁 Summary

Design tokens are the foundation
of the visual architecture.

They:
- prevent UI chaos
- speed up development
- make changes safe

If you think a token is unnecessary —
it probably isn’t.
