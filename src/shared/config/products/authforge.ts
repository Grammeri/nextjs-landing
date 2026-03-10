import type { PricingCardProps } from '@/shared/ui/pricing-card';

export const AUTHFORGE_PRODUCT_COPY = {
  name: 'AuthForge',
  shortDescription: 'Production-ready authentication system for modern SaaS products',
  cardDescription:
    'Production-ready authentication boilerplate with sessions, roles, security best practices and clean architecture.',
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
      'AuthForge is not a toy example. It is built using the same patterns and constraints found in real-world SaaS products.\n\n' +
      'AuthForge is database-agnostic by design. PostgreSQL is used as a production-ready reference setup via Prisma, not as a hard dependency. You can adapt AuthForge to other databases without changing core authentication logic.',
  },

  audience: [
    'SaaS founders who don’t want to build authentication from scratch',
    'Developers shipping MVPs and production apps',
    'Teams that need a real-world auth reference',
    'Engineers learning modern authentication architecture',
  ],

  features: {
    authentication: {
      title: 'Authentication',
      items: ['Email & password authentication', 'Email verification', 'Password reset flows'],
    },
    sessionsAndSecurity: {
      title: 'Sessions & Security',
      items: ['Access and refresh sessions', 'HttpOnly cookies', 'Secure session handling'],
    },
    architecture: {
      title: 'Architecture',
      items: [
        'Database-agnostic authentication architecture',
        'Prisma-based reference implementation (PostgreSQL)',
        'Token-driven UI (use our tokens or plug in your own styling system)',
      ],
    },
  },

  howItWorks: [
    'Clone the repository',
    'Configure environment variables',
    'Connect your database',
    'Run migrations',
    'Start building your product',
  ],

  tryBeforeYouBuy: {
    description:
      'Before purchasing, you can explore the code, review the documentation, and see the authentication flows in action. AuthForge uses secure HttpOnly cookie-based sessions with server-side session storage by default, and the architecture can be adapted to other approaches if required.',
    links: {
      demoLabel: 'Live demo',
      docsLabel: 'Full documentation',
      architectureLabel: 'Architecture overview (including token-driven UI design system)',
    },
    contactPrefix: 'Questions before or after purchase? Contact us at',
  },

  pricing: {
    price: '$99 — One-time license',
    features: [
      '1 project',
      'Lifetime access',
      'Updates included',
      '14-day refund if access was not used',
      'Support via email',
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
