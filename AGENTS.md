# AGENTS.md

## Repository scope

This repository is `nextjs-landing`, a Next.js App Router marketing site and product delivery platform for Software Forge.

Key working areas:
- `src/app` — routes, layouts, metadata, sitemap, robots
- `src/components` — shared UI used by marketing and product pages
- `src/shared/config` — stable config, product config, pricing, future i18n dictionaries
- `src/shared/lib` — helper logic
- `src/lib` — billing and Prisma helpers
- `src/content` — docs navigation and docs markdown content

## Project rules

- Prefer minimal diffs over large rewrites.
- Do not change unrelated files.
- Do not commit, push, or create branches unless explicitly asked.
- Never push to remote without explicit user approval in the current conversation.
- Never commit changes automatically after editing files.
- Ask for review before changing architecture-heavy files.
- Keep English readable and commercial, but not keyword-stuffed.
- Preserve existing working billing, checkout, download, and internal admin flows.
- Do not change styles unless explicitly requested.
- Do not edit `.css`, `.module.css`, or visual layout structure unless the task explicitly requires it.
- Preserve the current visual appearance of pages during routing, i18n, SEO, and copy changes.

## Style safety rules

- Treat all styles as locked by default.
- Do not modify any `.css` or `.module.css` files unless explicitly asked.
- Do not rename CSS classes.
- Do not change spacing, typography, sizing, colors, or layout structure unless explicitly requested.
- Prefer reusing the existing UI and styles exactly as they are.

## High-risk areas — do not change unless explicitly requested

- `src/app/api/**`
- `src/app/checkout/**`
- `src/lib/billing/**`
- `prisma/**`
- license and download flow
- Stripe / PayPal integration logic

## Build and verification

Run project verification commands only inside WSL.

Do not run project commands from Windows via UNC paths, `pushd`, or `cmd /c` against `\\wsl.localhost\...`.

When using editor-integrated agents, always prefer WSL shell execution for verification commands.

Use these commands after changes unless the user says otherwise:

```bash
cd ~/code/nextjs-landing && pnpm lint
cd ~/code/nextjs-landing && pnpm build
```
If a single combined command is needed, use:

cd ~/code/nextjs-landing && pnpm lint && pnpm build