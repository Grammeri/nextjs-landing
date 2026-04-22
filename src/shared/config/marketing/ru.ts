import type { MarketingDictionary } from './types';

export const marketingRu: MarketingDictionary = {
  home: {
    hero: {
      headline: 'Production-ready SaaS auth starter and Next.js starter kit',
      lead:
        'Software Forge builds production-ready developer foundations for teams shipping real products: a secure authentication starter for SaaS apps and a clean Next.js starter kit designed for fast setup, maintainable code, and confident extension.',
    },
    products: [
      {
        productId: 'authforge',
        href: '/products/authforge',
        title: 'AuthForge',
        description:
          'A production-ready authentication starter for SaaS apps with email/password auth, email verification, password reset, secure sessions, rate limiting, and a Prisma + PostgreSQL reference implementation.',
      },
      {
        productId: 'starter',
        href: '/products/starter',
        title: 'Next.js Professional Starter',
        description:
          'A clean Next.js starter kit for real projects and technical assignments, with TypeScript, ESLint, Prettier, Husky, and a CI-ready project structure built for maintainable development.',
      },
    ],
  },
};
