# Developer Documentation Standard

This document defines the gold standard for internal developer documentation
that lives inside the repository and is read in the IDE.

It is for developers and maintainers working on this codebase.

It is not used for public product documentation or marketing content.

---

## Scope

This standard applies only to internal developer documentation.

It does not apply to public docs, landing pages, or marketing content.

Documentation is treated as a system interface and must remain stable.

The document itself follows the rules it defines.

## Heading hierarchy

Requirements:

- Exactly one `#` heading per file
- Use `##` for main sections
- Use `###` only for actionable steps
- Do not skip heading levels

## Horizontal rules

Horizontal rules are allowed only as major semantic separators.

Requirements:

- One empty line before `---`
- One empty line after `---`
- Do not place `---` directly next to text or headings
- Do not insert `---` after every section

## Emoji usage

Emoji are optional and allowed only in headings.

Allowed set:

- 🌳 for structure
- 🛠 for tooling
- 🎯 for purpose
- ✅ for steps or process
- 🧾 for policy
- ⚠️ for warning
- 🏁 for summary

Restrictions:

- Do not use emoji in paragraphs
- Do not use emoji in code blocks
- Do not use emoji in tables or API descriptions

## Lists

Use lists only for real enumerations.

Do not use lists for prose.

## Code blocks

Requirements:

- Always use fenced code blocks
- Always add a language tag when applicable
- Commands must be copy-safe

## Tone

The tone must be neutral, technical, and system-oriented.

Avoid marketing language and hype.

Do not use emoji in body text.

## Separation rule

Sections must be visually separated with spacing and occasional horizontal rules.

Dense blocks without spacing are not allowed.
