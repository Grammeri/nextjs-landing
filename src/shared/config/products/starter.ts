import type { PricingCardProps } from '@/shared/ui/pricing-card';

export const STARTER_PRODUCT_COPY = {
  productId: 'starter',

  name: 'Next.js Professional Starter',

  shortDescription:
    'Clean, production-ready Next.js starter kit with App Router, TypeScript, ESLint, Prettier, Husky, conventional commits, and a CI-ready project structure',

  cardDescription:
    'Next.js Professional Starter gives you a polished project baseline for starting real applications, technical assignments, and learning-focused builds without spending hours wiring up the same tooling from scratch.\n\n' +
    'It combines a clean App Router setup, strict TypeScript configuration, predictable folder organization, formatting, linting, Git hooks, commit validation, and CI-ready structure.\n\n' +
    'The result is a starter kit that feels small enough to understand, but organized enough to grow into a serious project.',

  underDevelopment: {
    title: 'Next.js Professional Starter',
    subtitle: 'This product is currently under development.',
  },

  pricing: {
    price: '$5 — One-time license',

    features: [
      'License for 1 project',
      'Lifetime access to the source package',
      'Includes Next.js Professional Starter v1.0.0',
      'Clean App Router project structure',
      'Strict TypeScript configuration',
      'ESLint + Prettier setup',
      'Husky Git hooks',
      'Conventional commits',
      'CI-ready workflow included',
      'Useful for real projects and technical assignments',
    ],

    footerNote: 'Access instructions are sent by email after purchase.',
  },
} as const;

export const STARTER_PRICING_CARD: PricingCardProps = {
  title: STARTER_PRODUCT_COPY.name,
  description: STARTER_PRODUCT_COPY.shortDescription,
  price: STARTER_PRODUCT_COPY.pricing.price,
  features: STARTER_PRODUCT_COPY.pricing.features.map((text) => ({ text })),
  footerNote: STARTER_PRODUCT_COPY.pricing.footerNote,
};
