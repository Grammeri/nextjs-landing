import type { ProductCopy } from '@/shared/config/marketing/types';

export const starterEn: ProductCopy = {
  productId: 'starter',
  name: 'Next.js Professional Starter',
  shortDescription:
    'A clean Next.js starter kit for real projects and technical assignments, with TypeScript, ESLint, Prettier, Husky, and a CI-ready project structure built for maintainable development',
  supportEmail: 'support@software-forge.dev',
  actions: {
    readDocs: 'Read Docs',
    viewTooling: 'View Tooling',
    buyLicense: 'Buy license',
  },
  sectionTitles: {
    audience: 'Who is this starter for',
    included: 'What’s included',
    howItWorks: 'How it works',
    tryBeforeYouBuy: 'Try before you buy',
  },
  hero: {
    trustTitle: 'Built for clean Next.js project foundations',
    trustDescription:
      'Next.js Professional Starter gives you a polished project baseline for starting real applications, technical assignments, and learning-focused builds without spending hours wiring up the same tooling from scratch.\n\n' +
      'It combines a clean App Router setup, strict TypeScript configuration, predictable folder organization, formatting, linting, Git hooks, commit validation, and CI-ready structure.\n\n' +
      'The result is a starter kit that feels small enough to understand, but organized enough to grow into a serious project.',
  },
  audience: [
    'Developers starting a new Next.js project who want a clean, production-ready baseline',
    'Students completing technical assignments with a professional project structure',
    'Engineers who want TypeScript, linting, formatting, hooks, and CI already organized',
    'Developers learning modern Next.js tooling and maintainable project conventions',
  ],
  featureGroups: [
    {
      title: 'Project structure',
      items: [
        'Clean Next.js App Router setup',
        'Predictable folder organization',
        'Clear separation between app routes, components, shared UI, and libraries',
      ],
    },
    {
      title: 'Developer tooling',
      items: [
        'Strict TypeScript configuration',
        'ESLint for code quality',
        'Prettier for consistent formatting',
        'Husky Git hooks',
        'Conventional commit validation',
      ],
    },
    {
      title: 'Automation',
      items: [
        'CI-ready workflow structure',
        'Automated repository checks',
        'Repeatable development workflow for real projects and assignments',
      ],
    },
  ],
  howItWorks: [
    'Download the Next.js Professional Starter source package',
    'Install dependencies with pnpm',
    'Review the App Router structure and tooling setup',
    'Run the development workflow locally',
    'Start building your project or technical assignment on a clean foundation',
  ],
  tryBeforeYouBuy: {
    description:
      'Before purchasing, you can review the documentation, inspect the project structure, and understand the tooling included in the starter. The package is designed to be easy to read, quick to set up, and practical for both real projects and technical assignments.',
    links: [
      { key: 'docs', label: 'Starter documentation' },
      { key: 'tooling', label: 'Tooling overview' },
      { key: 'structure', label: 'Project structure overview' },
    ],
    contactPrefix: 'Questions before or after purchase?',
    contactLead: 'Contact us at',
  },
  pricing: {
    description:
      'Clean, production-ready Next.js starter kit with App Router, TypeScript, ESLint, Prettier, Husky, conventional commits, and a CI-ready project structure',
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
  underDevelopment: {
    title: 'Next.js Professional Starter',
    subtitle: 'This product is currently under development.',
  },
};
