import type { MarketingDictionary } from './types';

export const marketingRu: MarketingDictionary = {
  home: {
    hero: {
      headline: 'Production-ready auth-стартер для SaaS и стартовый комплект Next.js',
      lead:
        'Software Forge создает production-ready основы для команд, которые выпускают реальные продукты: безопасный стартер аутентификации для SaaS-приложений и чистый стартовый комплект Next.js для быстрого запуска, поддерживаемого кода и уверенного развития проекта.',
    },
    products: [
      {
        productId: 'authforge',
        href: '/products/authforge',
        title: 'AuthForge',
        description:
          'Production-ready стартер аутентификации для SaaS-приложений: вход по email и паролю, подтверждение email, сброс пароля, безопасные сессии, rate limiting и референсная реализация на Prisma + PostgreSQL.',
      },
      {
        productId: 'starter',
        href: '/products/starter',
        title: 'Next.js Professional Starter',
        description:
          'Чистый стартовый комплект Next.js для реальных проектов и технических заданий: TypeScript, ESLint, Prettier, Husky и готовая к CI структура проекта для поддерживаемой разработки.',
      },
    ],
  },
};
