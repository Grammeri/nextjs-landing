import type { MarketingDictionary } from './types';

export const marketingRu: MarketingDictionary = {
  home: {
    hero: {
      headline: 'Готовые решения для SaaS и разработки на Next.js',
      lead:
        'Software Forge создает готовые решения для команд, которые запускают реальные продукты: безопасную аутентификацию для SaaS-приложений и чистую базовую настройку проекта на Next.js для быстрого старта, удобной разработки и дальнейшего роста продукта.',
    },
    products: [
      {
        productId: 'authforge',
        href: '/products/authforge',
        title: 'AuthForge',
        description:
          'Готовая аутентификация для SaaS-приложений на Next.js: регистрация и вход по email и паролю, подтверждение email, сброс пароля, безопасные сессии, ограничение частоты запросов и пример реализации на Prisma + PostgreSQL.',
      },
      {
        productId: 'starter',
        href: '/products/starter',
        title: 'Next.js Professional Starter',
        description:
          'Профессиональная базовая настройка проекта на Next.js для реальных приложений и тестовых заданий: TypeScript, ESLint, Prettier, Husky и готовая к CI структура проекта для чистой и поддерживаемой разработки.',
      },
    ],
  },
};
