Documentation Rendering Architecture (Docs Engine for AuthForge)

This document records an architectural decision regarding the documentation
rendering architecture used in the AuthForge landing application.

It formalizes the transition from page-per-document rendering to a unified
documentation engine capable of rendering Markdown-based documentation
dynamically.

---

## Context

The AuthForge landing application includes a developer documentation section.

Documentation content is stored as Markdown files within the repository:

docs/site/

Current documents include:

- architecture
- security
- environment
- quick-start
- demo-mode
- project-tree
- ui-principles

Historically, documentation pages were implemented as individual Next.js pages,
for example:

/docs/security/page.tsx  
/docs/architecture/page.tsx  
/docs/environment/page.tsx  

Each page manually imported and rendered the corresponding Markdown document.

This approach is simple but introduces structural limitations:

- each document requires a dedicated page file
- navigation must be maintained manually
- documentation structure cannot scale easily
- adding new documents requires routing changes
- documentation cannot be treated as structured data

As the documentation grows, this model becomes difficult to maintain.

Modern developer documentation systems (Stripe, Vercel, Supabase, Prisma)
typically implement a centralized documentation rendering system where content
files are treated as data and rendered through a shared engine.

## Decision

The documentation system adopts a dynamic documentation rendering architecture.

Instead of creating individual page files for each document, the application
uses a single dynamic route:

/docs/[slug]

Documentation pages are rendered dynamically based on Markdown files stored
in the repository.

Example mapping:

/docs/security -> docs/site/security.md  
/docs/architecture -> docs/site/architecture.md  
/docs/quick-start -> docs/site/quick-start.md  

The documentation system includes:

- centralized Markdown loader
- dynamic documentation router
- navigation configuration
- shared documentation layout

Documentation content remains stored as Markdown files.

The rendering engine is responsible for converting Markdown content into
application pages.

## Implemented Capabilities

### Dynamic documentation routing

The application introduces a dynamic documentation route:

src/app/docs/[slug]/page.tsx

The route resolves documentation files by slug:

slug -> docs/site/${slug}.md

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

Documentation navigation is defined through a centralized configuration file.

Example structure:

docs/navigation.ts

Navigation defines:

- sidebar ordering
- section grouping
- display titles

Navigation configuration is separate from document content.

This allows:

- structural changes without modifying content
- grouping related documents
- controlling document ordering

### Repository content model

Documentation remains stored inside the repository:

docs/site/

Content files remain Markdown (.md).

This ensures:

- version control
- reviewability
- diff visibility
- documentation consistency with the codebase

## Rationale

Treating documentation files as data rather than pages provides significant
architectural advantages.

Benefits include:

### Scalability

New documentation can be added simply by creating a Markdown file:

docs/site/new-feature.md

No routing changes are required.

### Maintainability

A single rendering engine eliminates duplicated page logic and reduces
maintenance overhead.

### Consistency

All documentation pages share identical layout and rendering behavior.

### Developer experience

Documentation updates require only editing Markdown files.

No framework-specific knowledge is required.

### Product positioning

Professional documentation systems are a strong signal of product maturity.

Adopting a documentation engine aligns the AuthForge documentation experience
with industry standards used by major developer platforms.

### Reusability

The documentation engine itself becomes a reusable component.

Future products within the Software-Forge ecosystem may reuse the same system.

## Consequences

The documentation layer becomes an application subsystem rather than a
collection of pages.

Changes introduced:

- documentation pages are generated dynamically
- routing is centralized
- layout is unified
- navigation becomes configurable
- documentation files become the canonical content source

This introduces moderate architectural complexity and significantly improves
scalability and maintainability.

## Migration Strategy

Migration can be performed incrementally.

Steps:

1. Introduce dynamic route /docs/[slug].
2. Implement Markdown loader.
3. Move existing documentation pages to Markdown files if not already present.
4. Remove per-document page files.
5. Introduce navigation configuration.

Existing URLs remain unchanged.

For example:

/docs/security  
/docs/architecture  
/docs/quick-start  

continue to resolve correctly.

## Future Extensions

The documentation system may be extended with:

- MDX component support (callouts, warnings, embedded UI examples)
- automatic table of contents generation
- search integration
- documentation versioning
- API reference rendering

These capabilities can be introduced without replacing the core documentation
engine.

## Status

Accepted.

The dynamic documentation rendering architecture becomes the foundation of the
AuthForge documentation system and replaces page-per-document rendering.