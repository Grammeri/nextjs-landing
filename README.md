# Next.js Landing

Public-facing landing application for multiple products and services.

This repository contains only frontend marketing code for the landing.
It does not include application logic, authentication, or backend systems.

## Tech Stack

- Next.js
- React
- TypeScript
- CSS Modules
- ESLint
- Prettier

## Development

Install dependencies:

```bash
pnpm install
```

Start development server:

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

## WSL Workflow

This repository should be developed and verified inside WSL.

Do not run project commands from Windows via UNC paths such as `\\wsl.localhost\...`.
Do not use Windows `pushd` or `cmd /c` against the WSL project path.

Use a WSL shell from the project root:

```bash
cd ~/code/nextjs-landing
```

Run development commands inside WSL only:

```bash
pnpm install
pnpm dev
```

Run verification commands inside WSL only:

```bash
cd ~/code/nextjs-landing && pnpm lint
cd ~/code/nextjs-landing && pnpm build
```

If a single combined verification command is needed, use:

```bash
cd ~/code/nextjs-landing && pnpm lint && pnpm build
```

## Build

To build the production version:

```bash
pnpm build
```

## Notes

This repository contains only the public-facing landing. Authentication, private dashboards, and backend logic are not included here.

## Internal Documentation

`docs/internal/` contains system-level developer documentation for contributors.
It is not part of the public website.

## Product Model

Each product published on this landing is sold as a one-time purchase
with a single price per product.

Different products may have different prices.
Subscription plans and multi-tier pricing are not used.
