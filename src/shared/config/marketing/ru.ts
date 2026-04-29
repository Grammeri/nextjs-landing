import type { MarketingDictionary } from './types';

export const marketingRu: MarketingDictionary = {
  home: {
    hero: {
      headline: 'Готовые решения для SaaS и разработки на Next.js',
      lead:
        'Software Forge создает готовые решения для команд, которые запускают реальные продукты, включая готовую авторизацию для SaaS-приложений и готовую настройку проекта на Next.js для быстрого старта, удобной разработки и дальнейшего роста продукта.',
    },
    products: [
      {
        productId: 'authforge',
        title: 'AuthForge',
        description:
          'Готовая авторизация и аутентификация для SaaS-приложений на Next.js: регистрация, вход, подтверждение email, сброс пароля и безопасные серверные сессии.',
      },
      {
        productId: 'starter',
        title: 'Next.js Professional Starter',
        description:
          'Готовая настройка проекта на Next.js для реальных приложений и тестовых заданий: TypeScript, ESLint, Prettier, Husky и готовая конфигурация CI.',
      },
    ],
  },
};
