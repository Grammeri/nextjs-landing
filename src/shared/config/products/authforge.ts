import type { PricingCardProps } from '@/shared/ui/pricing-card';

export const AUTHFORGE_PRODUCT_COPY = {
  name: 'AuthForge',
  shortDescription:
    'Production-ready authentication foundation with verified setup,\nsecure sessions, and clean architecture',
  cardDescription:
    'Production-ready authentication foundation with secure sessions, baseline abuse protection, and verified setup for modern SaaS.',
  supportEmail: 'support@software-forge.dev',

  actions: {
    viewDemo: 'View Demo',
    readDocs: 'Read Docs',
    buyLicense: 'Buy license',
  },

  sectionTitles: {
    audience: 'Who is AuthForge for',
    included: 'What’s included',
    howItWorks: 'How it works',
    tryBeforeYouBuy: 'Try before you buy',
  },

  hero: {
    trustTitle: 'Built for real production use',
    trustDescription:
      'AuthForge is a production-ready authentication foundation for modern SaaS products.\n\n' +
      'The package includes a verified setup and onboarding flow, validated through a clean-room installation check.\n\n' +
      'The baseline provides server-side sessions, HttpOnly cookies, route-level rate limiting, and breached password checks.\n\n' +
      'The authentication architecture is database-agnostic by design. The package includes a Prisma + PostgreSQL reference implementation for production-oriented deployments.',
  },

  audience: [
    'SaaS founders who do not want to build authentication from scratch',
    'Developers shipping MVPs and production apps',
    'Teams that need a real-world authentication foundation',
    'Engineers learning modern authentication architecture',
  ],

  features: {
    authentication: {
      title: 'Authentication',
      items: ['Email & password authentication', 'Email verification', 'Password reset flows'],
    },
    sessionsAndSecurity: {
      title: 'Sessions & Security',
      items: [
        'Server-side sessions',
        'HttpOnly cookies',
        'Rate limiting on auth routes',
        'Breached password checks',
        'Zod-based runtime validation',
      ],
    },
    architecture: {
      title: 'Architecture',
      items: [
        'Database-agnostic authentication architecture',
        'Prisma-based reference implementation (PostgreSQL)',
        'Token-driven UI styling approach (use our tokens or plug in your own styling system)',
      ],
    },
  },

  howItWorks: [
    'Download the source package',
    'Configure environment variables',
    'Start PostgreSQL and connect your database',
    'Run Prisma migrations',
    'Launch the app and build your product',
  ],

  tryBeforeYouBuy: {
    description:
      'Before purchasing, you can explore the documentation, review the architecture, and test a working demo environment. The setup flow and core authentication journey have been verified through a clean room onboarding check, including register, login, logout, password reset, secure cookie-based session handling, and demo-mode evaluation flows.',
    links: {
      demoLabel: 'Live demo',
      docsLabel: 'Full documentation',
      architectureLabel: 'Architecture overview (including the token-driven UI styling approach)',
    },
    contactPrefix: 'Questions before or after purchase?',
  },

  pricing: {
    price: '$99 — One-time license',
    features: [
      'License for 1 project',
      'Lifetime access',
      'Product updates included',
      '14-day refund if access was not used',
      'Email support',
    ],
    footerNote: 'Access instructions will be sent by email after purchase',
  },
} as const;

export const AUTHFORGE_SUPPORT_EMAIL = AUTHFORGE_PRODUCT_COPY.supportEmail;

export const AUTHFORGE_PRICING_CARD: PricingCardProps = {
  title: AUTHFORGE_PRODUCT_COPY.name,
  description: AUTHFORGE_PRODUCT_COPY.shortDescription,
  price: AUTHFORGE_PRODUCT_COPY.pricing.price,
  features: [
    { text: AUTHFORGE_PRODUCT_COPY.pricing.features[0] },
    { text: AUTHFORGE_PRODUCT_COPY.pricing.features[1] },
    { text: AUTHFORGE_PRODUCT_COPY.pricing.features[2] },
    { text: AUTHFORGE_PRODUCT_COPY.pricing.features[3] },
    { text: `${AUTHFORGE_PRODUCT_COPY.pricing.features[4]} (${AUTHFORGE_SUPPORT_EMAIL})` },
  ],
  footerNote: AUTHFORGE_PRODUCT_COPY.pricing.footerNote,
};
