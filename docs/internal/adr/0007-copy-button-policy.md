# ADR 0007 — Documentation Copy Button Policy

## Status

Accepted

## Context

The AuthForge documentation system automatically renders Markdown content into HTML
using a custom rendering pipeline.

Code blocks are commonly used in documentation pages to present commands, configuration
examples, or short snippets.

In many developer documentation systems (such as Stripe, Vercel, and Tailwind),
code blocks include a "Copy" button that allows users to quickly copy commands
or code snippets to the clipboard.

However, not all code blocks represent content that should be copied.

Examples include:

- short textual examples
- error message examples
- conceptual outputs
- illustrative values used in explanations

For example:


Invalid credentials


In such cases, a copy button provides no practical benefit and introduces unnecessary
UI elements that may distract from the content.

## Decision

The AuthForge documentation renderer supports **optional copy functionality** for code blocks.

The policy is defined as follows:

- Copy buttons are enabled for code blocks representing executable or reusable code.
- Copy buttons may be omitted for code blocks that represent conceptual examples.
- The presence of a programming language tag does not strictly determine whether
  a copy button is shown.

Typical behavior:

| Code Block Type | Copy Button |
|-----------------|-------------|
| `bash` commands | enabled |
| `ts` / `js` code examples | optional |
| configuration examples | enabled |
| textual example values | disabled |
| illustrative messages | disabled |

This allows documentation authors to avoid presenting unnecessary copy controls
for content that is not intended to be reused.

## Rationale

This decision improves documentation clarity by:

- reducing visual noise
- preventing meaningless copy actions
- keeping copy functionality focused on actionable code

The documentation system therefore prioritizes **author intent** over automatic
behavior tied to language identifiers.

## Consequences

The documentation renderer must support:

- copy buttons as an optional feature
- rendering code blocks without copy controls
- future extensibility for language-based behaviors

Documentation authors are responsible for deciding whether a given code block
represents actionable code or illustrative content.

## Notes

This decision applies only to the documentation rendering system and does not
affect application code or developer tooling.