# Project Tree

This document provides a high-level overview of the current AuthForge repository structure.

It is intended to help buyers and contributors quickly understand where the main application,
documentation, infrastructure, database package, and shared layers are located.

---

```text
auth-forge/
├─ .editorconfig
├─ .env.example
├─ .gitattributes
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ .gitignore
├─ .husky/
│  ├─ commit-msg
│  └─ pre-commit
├─ .lintstagedrc.js
├─ .npmrc
├─ .nvmrc
├─ .prettierignore
├─ .prettierrc.js
├─ .vercelignore
├─ .vscode/
│  └─ settings.json
├─ CHANGELOG.md
├─ commitlint.config.cjs
├─ docs/
│  ├─ nav.ts
│  └─ site/
│     ├─ architecture.md
│     ├─ demo-mode.md
│     ├─ environment.md
│     ├─ getting-started.md
│     ├─ project-tree.md
│     ├─ security.md
│     ├─ ui-principles.md
│     └─ integration/
│        ├─ after-login.md
│        ├─ commands.md
│        ├─ development-setup.md
│        └─ email.md
├─ eslint.config.mjs
├─ infra/
│  └─ docker/
│     ├─ docker-compose.yml
│     └─ README.md
├─ internal/
│  └─ adr/
│     ├─ adr-001-project-boundaries.md
│     ├─ adr-002-rate-limiting.md
│     ├─ adr-003-authentication-error-policy.md
│     ├─ adr-004-form-validation-error-reset-policy.md
│     ├─ adr-005-internalization.md
│     ├─ adr-006-notifications-contract.md
│     ├─ adr-007-migration-strategy.md
│     ├─ adr-008-prisma-version-baseline-policy.md
│     ├─ adr-009-authentication-schema-stability-policy.md
│     ├─ adr-010-demo-mode-architecture-policy.md
│     ├─ adr-011-demo-db-cleanup-strategy.md
│     └─ adr-012-optional-git-hooks.md
├─ next-env.d.ts
├─ next.config.ts
├─ package.json
├─ packages/
│  └─ db/
│     ├─ package.json
│     ├─ prisma/
│     │  ├─ migrations/
│     │  │  ├─ 20260304140506_init/
│     │  │  │  └─ migration.sql
│     │  │  └─ migration_lock.toml
│     │  └─ schema.prisma
│     └─ src/
│        ├─ index.ts
│        └─ prisma.ts
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ README.md
├─ scripts/
│  └─ make-tree.mjs
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ (auth)/
│  │  │  │  ├─ forgot-password/
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ layout.module.css
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ login/
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ register/
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ reset-password/
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ verify-email/
│  │  │  │     └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ api/
│  │  │  └─ auth/
│  │  │     ├─ forgot-password/
│  │  │     │  └─ route.ts
│  │  │     ├─ login/
│  │  │     │  └─ route.ts
│  │  │     ├─ logout/
│  │  │     │  └─ route.ts
│  │  │     ├─ register/
│  │  │     │  └─ route.ts
│  │  │     ├─ resend-verification/
│  │  │     │  └─ route.ts
│  │  │     ├─ reset-password/
│  │  │     │  └─ route.ts
│  │  │     └─ verify-email/
│  │  │        └─ route.ts
│  │  ├─ docs/
│  │  │  ├─ _lib/
│  │  │  │  └─ docs.ts
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ providers.tsx
│  ├─ entities/
│  │  └─ .gitkeep
│  ├─ features/
│  │  └─ auth/
│  │     ├─ actions/
│  │     │  └─ logout.ts
│  │     ├─ api/
│  │     │  └─ auth.api.ts
│  │     ├─ config/
│  │     │  └─ auth.routes.ts
│  │     ├─ email/
│  │     │  ├─ email.provider.ts
│  │     │  ├─ email.types.ts
│  │     │  └─ providers/
│  │     │     ├─ demo.provider.ts
│  │     │     └─ resend.provider.ts
│  │     ├─ lib/
│  │     │  ├─ checkPasswordPwned.ts
│  │     │  ├─ getPasswordStrength.ts
│  │     │  └─ mapBackendError.ts
│  │     ├─ model/
│  │     │  ├─ auth.errors.ts
│  │     │  ├─ auth.service.ts
│  │     │  ├─ auth.session.ts
│  │     │  ├─ auth.tokens.ts
│  │     │  ├─ auth.types.ts
│  │     │  ├─ email.schema.ts
│  │     │  ├─ forgot-password.schema.ts
│  │     │  ├─ login.schema.ts
│  │     │  ├─ password.schema.ts
│  │     │  ├─ register.schema.ts
│  │     │  ├─ reset-password.schema.ts
│  │     │  └─ reset-password.server.schema.ts
│  │     ├─ public.ts
│  │     ├─ server.ts
│  │     └─ ui/
│  │        ├─ ForgotPasswordForm/
│  │        │  ├─ ForgotPasswordForm.module.css
│  │        │  └─ ForgotPasswordForm.tsx
│  │        ├─ hooks/
│  │        │  ├─ useForgotPasswordForm.ts
│  │        │  ├─ useLoginForm.ts
│  │        │  ├─ useRegisterForm.ts
│  │        │  └─ useResetPasswordForm.ts
│  │        ├─ LoginForm/
│  │        │  ├─ LoginForm.module.css
│  │        │  └─ LoginForm.tsx
│  │        ├─ PasswordStrengthBar/
│  │        │  ├─ PasswordStrengthBar.module.css
│  │        │  └─ PasswordStrengthBar.tsx
│  │        ├─ RegisterForm/
│  │        │  ├─ RegisterForm.module.css
│  │        │  └─ RegisterForm.tsx
│  │        └─ ResetPasswordForm/
│  │           ├─ ResetPasswordForm.module.css
│  │           └─ ResetPasswordForm.tsx
│  ├─ proxy.ts
│  └─ shared/
│     ├─ api/
│     │  └─ apiFetch.ts
│     ├─ config/
│     │  ├─ auth.constants.ts
│     │  ├─ demo.ts
│     │  ├─ env.ts
│     │  └─ fonts.ts
│     ├─ i18n/
│     │  ├─ config.ts
│     │  ├─ dict/
│     │  │  └─ en.ts
│     │  ├─ getDictionary.ts
│     │  └─ middleware.ts
│     ├─ lib/
│     │  └─ notify/
│     │     └─ notify.ts
│     ├─ security/
│     │  └─ rate-limit.ts
│     ├─ types/
│     │  └─ next-locale.ts
│     └─ ui/
│        ├─ AuthHeader/
│        │  ├─ AuthHeader.module.css
│        │  └─ AuthHeader.tsx
│        ├─ Button/
│        │  ├─ Button.module.css
│        │  └─ Button.tsx
│        ├─ DemoBackLink/
│        │  ├─ DemoBackLink.module.css
│        │  └─ DemoBackLink.tsx
│        ├─ Form/
│        │  └─ Form.tsx
│        ├─ FormError/
│        │  ├─ FormError.module.css
│        │  └─ FormError.tsx
│        ├─ FormFooter/
│        │  ├─ FormFooter.module.css
│        │  └─ FormFooter.tsx
│        ├─ FormLink/
│        │  ├─ FormLink.module.css
│        │  └─ FormLink.tsx
│        ├─ Input/
│        │  ├─ Input.module.css
│        │  └─ Input.tsx
│        └─ Spinner/
│           ├─ Spinner.module.css
│           └─ Spinner.tsx
├─ tsconfig.json
└─ VERSION.md
```
