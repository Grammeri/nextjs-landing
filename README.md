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

Start development server:

pnpm dev

Open http://localhost:3000
 in your browser.

WSL Workflow

This repository should be developed and verified inside WSL.

Do not run project commands from Windows via UNC paths such as \\wsl.localhost\..., and do not use Windows pushd or cmd /c against the WSL project path.

Open the project in WSL:

cd ~/code/nextjs-landing

Install dependencies:

cd ~/code/nextjs-landing && pnpm install

Start the development server:

cd ~/code/nextjs-landing && pnpm dev

Run lint:

cd ~/code/nextjs-landing && pnpm lint

Run build:

cd ~/code/nextjs-landing && pnpm build

Run full verification:

cd ~/code/nextjs-landing && pnpm lint && pnpm build
Build

To build the production version:

pnpm build
Notes

This repository contains only the public-facing landing. Authentication, private dashboards, and backend logic are not included here.

Internal Documentation

docs/internal/ contains system-level developer documentation for contributors. It is not part of the public website.

Product model

Each product published on this landing is sold as a one-time purchase
with a single price per product.

Different products may have different prices.
Subscription plans and multi-tier pricing are not used.