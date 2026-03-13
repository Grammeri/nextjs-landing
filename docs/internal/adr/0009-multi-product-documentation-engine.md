# Multi-Product Documentation Engine

This document records an architectural decision to extend the existing
documentation rendering system so that it can support multiple products
within the Software-Forge ecosystem.

This decision evolves the documentation architecture previously introduced
in ADR-0005 (Documentation Rendering Architecture).

---

## Context

ADR-0005 introduced a dynamic documentation rendering system for AuthForge.

Documentation pages are rendered from Markdown files stored inside the repository:

content/authforge/docs/site/

The documentation system includes:

- centralized Markdown loader
- dynamic documentation router
- navigation engine
- shared documentation layout
- internal documentation link validation
- automatic page outline generation

The system currently renders documentation under the route:

/[locale]/docs/authforge/[...slug]

Example:

/en/docs/authforge/security  
/en/docs/authforge/architecture  
/en/docs/authforge/quick-start  

While this architecture successfully replaced page-per-document rendering,
it remains scoped to a single product (AuthForge).

The Software-Forge ecosystem is expected to contain multiple developer
products, including:

- AuthForge
- Starter
- Next.js Test Kit
- future products

Each product may include its own documentation set.

Maintaining separate documentation engines for each product would introduce
unnecessary duplication and architectural fragmentation.

Modern developer platforms such as Stripe, Vercel, Supabase, and Prisma
implement documentation systems where a single documentation engine renders
documentation for multiple products.

---

## Decision

The documentation rendering architecture will be extended to support
multi-product documentation.

Instead of using a product-specific route:

/[locale]/docs/authforge/[...slug]

the system will adopt a product-parameterized route:

/[locale]/docs/[product]/[...slug]

Example mappings:

/en/docs/authforge/security  
→ content/authforge/docs/site/security.md

/en/docs/starter/getting-started  
→ content/starter/docs/site/getting-started.md

/en/docs/nextjs-test-kit/install  
→ content/nextjs-test-kit/docs/site/install.md

The documentation engine remains shared across all products.

Product-specific content is resolved dynamically based on the `product`
route parameter.

---

## Repository Content Model

Documentation for each product remains stored inside the repository.

Structure:

content/
  authforge/
    docs/site/
  starter/
    docs/site/
  nextjs-test-kit/
    docs/site/

Each product may maintain an independent documentation structure.

Markdown files remain the canonical content source.

---

## Documentation Engine Responsibilities

The documentation engine remains responsible for:

- resolving documentation files from the filesystem
- parsing Markdown content
- rendering documentation pages
- generating page outlines
- validating internal documentation links
- rendering documentation layout
- generating navigation structures

The engine becomes product-agnostic.

Product-specific behavior is determined through the product parameter.

---

## Navigation Strategy

Navigation remains filesystem-driven.

The navigation engine reads documentation files from:

content/{product}/docs/site/

Navigation ordering and grouping remain controlled by the navigation engine.

This ensures:

- consistent sidebar behavior
- deterministic ordering
- separation between navigation structure and content files

---

## URL Structure

Documentation URLs follow a consistent multi-product structure:

/docs/{product}/{document}

Examples:

/docs/authforge/security  
/docs/authforge/environment  
/docs/starter/getting-started  
/docs/nextjs-test-kit/install  

Existing AuthForge URLs remain unchanged and continue to resolve correctly.

---

## Rationale

Adopting a multi-product documentation architecture provides several advantages.

### Architectural reuse

A single documentation engine supports all products within the ecosystem.

### Scalability

New products can introduce documentation by adding a content directory:

content/new-product/docs/site/

No routing changes are required.

### Consistency

All products share identical documentation behavior, layout, and navigation.

### Maintainability

Documentation infrastructure is implemented once and reused across products.

### Ecosystem readiness

The Software-Forge platform can expand to additional developer tools
without redesigning the documentation architecture.

---

## Consequences

The documentation engine becomes a platform-level subsystem rather than
a product-specific implementation.

Changes introduced:

- documentation routing becomes product-parameterized
- documentation engine becomes product-agnostic
- content structure supports multiple products
- navigation becomes product-aware

This increases architectural flexibility while preserving the benefits
introduced by ADR-0005.

---

## Migration Strategy

Migration from the current AuthForge-specific route can be performed
incrementally.

Steps:

1. introduce route `/[locale]/docs/[product]/[...slug]`
2. make documentation engine product-aware
3. migrate AuthForge documentation to the new route
4. introduce documentation for additional products
5. ensure existing AuthForge URLs remain stable

---

## Status

Accepted.

The documentation system evolves from a single-product documentation
engine to a multi-product documentation platform capable of supporting
the Software-Forge ecosystem.