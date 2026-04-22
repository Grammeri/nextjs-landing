import type { MarketingDictionary } from './types';

export const marketingEn: MarketingDictionary = {
  home: {
    hero: {
      headline: 'Ready-made solutions for SaaS and Next.js development',
      lead:
        'Software Forge builds ready-to-use solutions for teams shipping real products: secure authentication for SaaS applications and a clean Next.js project foundation designed for fast setup, maintainable development, and long-term product growth.',
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
