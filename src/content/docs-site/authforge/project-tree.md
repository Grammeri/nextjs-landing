# Project Tree

---

```text
auth-forge/

├─ docs/
│  └─ site/
│     ├─ architecture.md
│     ├─ demo-mode.md
│     ├─ environment.md
│     ├─ getting-started.md
│     ├─ project-tree.md
│     ├─ quick-start.md
│     ├─ security.md
│     ├─ ui-principles.md
│     └─ integration/
│        ├─ after-login.md
│        ├─ commands.md
│        ├─ development-setup.md
│        └─ email.md
│
├─ infra/
│  └─ docker/
│     ├─ docker-compose.yml
│     └─ README.md
│
├─ packages/
│  └─ db/
│     ├─ prisma/
│     │  ├─ migrations/
│     │  └─ schema.prisma
│     └─ src/
│        ├─ index.ts
│        └─ prisma.ts
│
├─ scripts/
│  └─ make-tree.mjs
│
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  └─ auth/
│  │  │     ├─ forgot-password/
│  │  │     ├─ login/
│  │  │     ├─ logout/
│  │  │     ├─ register/
│  │  │     ├─ resend-verification/
│  │  │     ├─ reset-password/
│  │  │     └─ verify-email/
│  │  │
│  │  ├─ docs/
│  │  │  ├─ [slug]/
│  │  │  └─ _lib/
│  │  │
│  │  └─ [locale]/
│  │     └─ (auth)/
│  │        ├─ forgot-password/
│  │        ├─ login/
│  │        ├─ register/
│  │        ├─ reset-password/
│  │        └─ verify-email/
│  │
│  ├─ features/
│  │  └─ auth/
│  │     ├─ actions/
│  │     ├─ api/
│  │     ├─ config/
│  │     ├─ email/
│  │     │  └─ providers/
│  │     ├─ lib/
│  │     ├─ model/
│  │     └─ ui/
│  │
│  ├─ shared/
│  │  ├─ api/
│  │  ├─ config/
│  │  ├─ i18n/
│  │  │  └─ dict/
│  │  ├─ lib/
│  │  │  └─ notify/
│  │  ├─ security/
│  │  ├─ types/
│  │  └─ ui/
│  │
│  └─ entities/
│
├─ .env.example
├─ package.json
├─ pnpm-workspace.yaml
├─ next.config.ts
├─ prisma.config.ts
├─ tsconfig.json
└─ README.md
```
