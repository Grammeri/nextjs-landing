import type { MarketingDictionary } from './types';

export const marketingEn: MarketingDictionary = {
  home: {
    hero: {
      headline: 'Ready-made solutions for SaaS and Next.js development',
      lead:
        'Software Forge builds ready-to-use solutions for teams shipping real products: a Next.js authentication system for SaaS applications and a clean Next.js project setup for fast development, maintainable code, and long-term product growth.',
    },
    products: [
      {
        productId: 'authforge',
        href: '/products/authforge',
        title: 'AuthForge',
        description:
          'Production-ready Next.js authentication and authorization for SaaS apps: email/password sign-up, email verification, password reset, secure server sessions, and HttpOnly cookies.',
      },
      {
        productId: 'starter',
        href: '/products/starter',
        title: 'Next.js Professional Starter',
        description:
          'Ready-to-use Next.js project setup for real apps and technical assignments: App Router, TypeScript, ESLint, Prettier, Husky, and CI configuration.',
      },
    ],
  },
};
