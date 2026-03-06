# SEO and Search Engine Indexing Strategy

This document records an architectural decision regarding the search engine indexing strategy used by the Software-Forge marketing website and the AuthForge documentation system.

The objective of this decision is to ensure that documentation pages and marketing pages are discoverable by search engines while maintaining a scalable and maintainable SEO architecture.

---

## Context

The Software-Forge platform includes a public marketing website and a developer documentation section for AuthForge.

Documentation pages are generated dynamically from Markdown files stored in the repository.

```text
content/authforge/docs/site/
```

Each Markdown file represents a documentation page rendered by the documentation engine.

Example mapping:

```text
content/authforge/docs/site/security.md
```

becomes

```text
/docs/authforge/security
```

Without a structured indexing mechanism, search engines may not discover all documentation pages automatically.

Modern developer platforms such as Stripe, Vercel, Supabase, and Prisma implement automated sitemap and crawler discovery systems to ensure that documentation pages are indexed.

To achieve similar scalability, the AuthForge platform requires a structured SEO architecture integrated directly into the application.

## Decision

The project adopts a dynamic SEO infrastructure implemented using the Next.js Metadata API.

SEO infrastructure is implemented as part of the application architecture rather than manual configuration.

The system includes:

* automatic sitemap generation
* robots.txt generation
* documentation-driven URL discovery
* centralized metadata configuration
* production domain configuration via environment variables

This architecture ensures that documentation growth automatically increases the number of indexable pages.

## Implementation

### Automatic sitemap generation

The application generates a sitemap dynamically using the Next.js Metadata API.

Implementation file:

```text
src/app/sitemap.ts
```

The sitemap includes static marketing pages and documentation pages.

Static pages include:

```text
/
/pricing
/products/authforge
```

Documentation pages are discovered automatically by scanning the documentation directory:

```text
content/authforge/docs/site/
```

Each Markdown file is converted into a documentation route and added to the sitemap.

Example:

```text
security.md → /docs/authforge/security
```

Adding a new Markdown document automatically exposes the corresponding page to search engines.

### Robots.txt generation

Search engine crawler rules are generated automatically.

Implementation file:

```text
src/app/robots.ts
```

The application exposes the route:

```text
/robots.txt
```

The robots configuration allows search engine crawlers to access public pages and provides a reference to the sitemap.

Example configuration:

```text
User-agent: *
Allow: /
Sitemap: /sitemap.xml
```

This allows crawlers to discover the full documentation structure.

### Documentation-driven indexing

The documentation system treats Markdown files as the canonical content source.

Architecture:

```text
Markdown documentation
        ↓
Next.js documentation engine
        ↓
/docs/authforge/{slug}
        ↓
automatic sitemap inclusion
        ↓
search engine indexing
```

This model ensures that adding documentation automatically increases the number of indexable pages.

### Development domain configuration

During development the sitemap uses the local domain.

```text
http://localhost:3000
```

This allows sitemap generation and crawler behavior to be tested locally.

## Planned Production Configuration

In production the base site URL will be configured through an environment variable.

Example:

```text
NEXT_PUBLIC_SITE_URL=https://software-forge.dev
```

The sitemap and robots configuration will reference this variable instead of a hardcoded domain.

This ensures that the application can be deployed to different environments without modifying the source code.

## Metadata Strategy

Each page in the marketing website and documentation system will define metadata using the Next.js Metadata API.

Metadata includes:

* page title
* page description
* OpenGraph metadata
* canonical URL

Documentation metadata may later be generated dynamically from Markdown content.

Consistent metadata improves search engine understanding of page content and improves link previews.

## Rationale

Treating SEO infrastructure as part of the application architecture provides several advantages.

Automation ensures that documentation pages are indexed without manual sitemap maintenance.

Scalability allows new documentation pages to appear in search engines automatically.

Maintainability keeps SEO configuration centralized within the application.

Documentation indexing also increases product discoverability for developers searching for authentication solutions.

## Consequences

The marketing website and documentation system gain a structured indexing infrastructure.

The system introduces:

* dynamic sitemap generation
* automatic robots configuration
* documentation-driven indexing
* centralized metadata management

This architecture reduces manual SEO maintenance and allows the documentation system to scale naturally.

## Future Extensions

The SEO architecture may later be extended with additional capabilities.

Possible extensions include:

* canonical URL enforcement
* last-modified values derived from Git history
* OpenGraph images for documentation pages
* structured data for product pages
* search engine verification
* multilingual hreflang support

These extensions can be implemented without replacing the existing SEO architecture.

## Status

Accepted.
The dynamic SEO infrastructure becomes the standard indexing mechanism for the Software-Forge marketing website and the AuthForge documentation system.
