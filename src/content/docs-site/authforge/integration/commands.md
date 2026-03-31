# AuthForge Commands Reference

This document lists all available project commands.

These commands are intended for development and local environment management.

---

## Project Setup

### Install dependencies

```bash
pnpm install
```

### Run full project setup

```bash
pnpm setup
```

This command will:

- install dependencies
- start the PostgreSQL container
- apply database migrations

## Development

### Start development server

```bash
pnpm dev
```

Application runs at:
http://localhost:3000

## Database

### Start PostgreSQL container

```bash
pnpm db:up
```

### Stop PostgreSQL container

```bash
pnpm db:down
```

## Prisma

### Generate Prisma Client

```bash
pnpm prisma:generate
```

### Apply migrations

```bash
pnpm prisma:migrate
```

### Open Prisma Studio

```bash
pnpm studio
```

or

```bash
pnpm prisma:studio
```

### Detect unused exports

```bash
pnpm ts-prune
```

## Code Quality

### Run TypeScript checks

```bash
pnpm tsc
```

### Run ESLint

```bash
pnpm lint
```

### Run full code quality checks

```bash
pnpm check
```

Runs:

- TypeScript validation
- ESLint checks
- Prettier formatting check

### Format code with Prettier

```bash
pnpm format
```

### Check formatting without modifying files

```bash
pnpm format:check
```

## Build

### Create production build

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

## Development Utilities

### Run development environment setup only

```bash
pnpm dev:setup
```

This command will:

- start the PostgreSQL container
- apply database migrations

## Documentation

### Generate project structure tree

```bash
pnpm docs:tree
```

## Manual Docker Commands (optional)

Advanced users may run Docker commands directly.

### Start PostgreSQL with Docker Compose

```bash
docker compose --env-file .env -f infra/docker/docker-compose.yml up -d
```

### Stop PostgreSQL with Docker Compose

```bash
docker compose --env-file .env -f infra/docker/docker-compose.yml down
```

## Notes

AuthForge provides pnpm scripts for common development tasks.

Direct Docker and Prisma commands are optional and intended for advanced users.
