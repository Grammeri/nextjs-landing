# Documentation Rendering Architecture (Docs Engine for AuthForge)

This document records an architectural decision regarding the documentation rendering architecture used in the AuthForge landing application.

It formalizes the transition from page-per-document rendering to a unified documentation engine capable of rendering Markdown-based documentation dynamically.

---

## Context

The AuthForge landing application includes a developer documentation section.

Documentation content is stored as Markdown files within the repository:

```text
content/authforge/docs/site/
```

Current documents include:

- architecture
- security
- environment
- quick-start
- demo-mode
- project-tree
- ui-principles

Historically, documentation pages were implemented as individual Next.js pages, for example:

```text
/[locale]/docs/authforge/security/page.tsx
/[locale]/docs/authforge/architecture/page.tsx
/[locale]/docs/authforge/environment/page.tsx
```

Each page manually imported and rendered the corresponding Markdown document.

This approach is simple but introduces structural limitations:

- each document requires a dedicated page file
- navigation must be maintained manually
- documentation structure cannot scale easily
- adding new documents requires routing changes
- documentation cannot be treated as structured data

As the documentation grows, this model becomes difficult to maintain.

Modern developer documentation systems such as Stripe, Vercel, Supabase, and Prisma typically implement a centralized documentation rendering system where content files are treated as data and rendered through a shared engine.

## Decision

The documentation system adopts a dynamic documentation rendering architecture.

Instead of creating individual page files for each document, the application uses a single dynamic catch-all documentation route:

```text
/[locale]/docs/authforge/[...slug]
```

Documentation pages are rendered dynamically based on Markdown files stored in the repository.

Example mapping:

```text
/en/docs/authforge/security -> content/authforge/docs/site/security.md
/en/docs/authforge/architecture -> content/authforge/docs/site/architecture.md
/en/docs/authforge/quick-start -> content/authforge/docs/site/quick-start.md
```

The documentation system includes:

- centralized Markdown loader
- dynamic documentation router
- navigation configuration
- shared documentation layout
- internal documentation link validation
- automatic page outline generation

Documentation content remains stored as Markdown files.

The rendering engine is responsible for converting Markdown content into application pages.

## Implemented Capabilities

### Dynamic documentation routing

The application introduces a dynamic documentation route:

```text
src/app/[locale]/docs/authforge/[...slug]/page.tsx
```

The route resolves documentation files by slug:

```text
slug -> content/authforge/docs/site/${slug}.md
```

If the file exists, the document is rendered.

If the file does not exist, the route returns a 404.

### Markdown content rendering

Documentation files are rendered through a centralized Markdown renderer.

Responsibilities include:

- parsing Markdown content
- rendering headings
- rendering code blocks
- preserving formatting defined by documentation standards

Markdown files remain the source of truth for documentation content.

### Documentation layout

All documentation pages share a unified layout.

The layout provides:

- documentation container
- sidebar navigation
- consistent typography
- code block rendering
- responsive layout

This guarantees consistent presentation across all documentation pages.

### Navigation configuration

Documentation navigation is defined through a centralized navigation engine.

Navigation is resolved through:

```text
src/app/[locale]/docs/_engine/getNav.ts
```

Navigation defines:

- sidebar ordering
- section grouping
- display titles

Navigation configuration is separate from document content.

This allows:

- structural changes without modifying content
- grouping related documents
- controlling document ordering

### Internal documentation link validation

The documentation engine validates internal documentation links during rendering.

Relative Markdown links such as:

```text
./environment
../security
```

are resolved against the current documentation slug.

If a referenced documentation file does not exist, the engine reports a broken documentation link.

In development mode:

- broken links produce warnings in the console

In production mode:

- broken links throw an error during rendering

This mechanism prevents broken documentation navigation and ensures documentation integrity.

### Automatic page outline generation

The documentation engine extracts level-2 headings during Markdown parsing and generates a page outline.

This outline is used to render the right-side page navigation.

Example headings:

```text
## Installation
## Configuration
## Security
```

These headings automatically appear in the page outline navigation.

This mechanism guarantees that page navigation always reflects the actual document structure.

## Repository Content Model

Documentation remains stored inside the repository:

```text
content/authforge/docs/site/
```

Content files remain Markdown (.md).

This ensures:

- version control
- reviewability
- diff visibility
- documentation consistency with the codebase

This structure also allows documentation to be versioned together with product content and supports multi-product documentation within the Software-Forge ecosystem.

## Rationale

Treating documentation files as data rather than pages provides significant architectural advantages.

### Scalability

New documentation can be added simply by creating a Markdown file:

```text
content/authforge/docs/site/new-feature.md
```

No routing changes are required.

### Maintainability

A single rendering engine eliminates duplicated page logic and reduces maintenance overhead.

### Consistency

All documentation pages share identical layout and rendering behavior.

### Developer experience

Documentation updates require only editing Markdown files.

No framework-specific knowledge is required.

### Product positioning

Professional documentation systems are a strong signal of product maturity.

Adopting a documentation engine aligns the AuthForge documentation experience with industry standards used by major developer platforms.

### Reusability

The documentation engine itself becomes a reusable component.

Future products within the Software-Forge ecosystem may reuse the same system.

## Consequences

The documentation layer becomes an application subsystem rather than a collection of pages.

Changes introduced:

- documentation pages are generated dynamically
- routing is centralized
- layout is unified
- navigation becomes configurable
- documentation files become the canonical content source
- documentation links are automatically validated
- page outlines are generated automatically

This introduces moderate architectural complexity and significantly improves scalability and maintainability.

## Migration Strategy

Migration can be performed incrementally.

Steps:

1. Introduce dynamic route `/[locale]/docs/authforge/[...slug]`
2. Implement Markdown loader
3. Move existing documentation pages to Markdown files
4. Remove per-document page files
5. Introduce navigation configuration
6. Enable internal documentation link validation

Existing URLs remain unchanged.

For example:

```text
/en/docs/authforge/security
/en/docs/authforge/architecture
/en/docs/authforge/quick-start
```

continue to resolve correctly.

## Future Extensions

The documentation system may be extended with:

- MDX component support (callouts, warnings, embedded UI examples)
- automatic table of contents generation
- search integration
- documentation versioning
- API reference rendering
- documentation analytics

These capabilities can be introduced without replacing the core documentation engine.

## Status

Accepted.

The dynamic documentation rendering architecture becomes the foundation of the AuthForge documentation system and replaces page-per-document rendering.
