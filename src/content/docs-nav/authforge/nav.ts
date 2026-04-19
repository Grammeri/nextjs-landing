type NavGroupConfig = {
  title: string;
  slugs: string[];
};

export const DOC_TITLES: Record<string, string> = {
  'getting-started': 'Getting Started',
  environment: 'Environment Variables',
  'demo-mode': 'Demo Mode',
  architecture: 'Architecture',
  security: 'Security',
  'ui-principles': 'UI Principles',
  'project-tree': 'Project Tree',
  'integration/after-login': 'After Login',
  'integration/auth-api': 'Auth API Contract',
  'integration/commands': 'Commands',
  'integration/development-setup': 'Development Setup',
  'integration/email': 'Email',
};

export const SECTION_TITLES: Record<string, string> = {};

export const ROOT_ORDER: string[] = [
  'getting-started',
  'environment',
  'demo-mode',
  'architecture',
  'security',
  'ui-principles',
  'project-tree',
  'integration/after-login',
  'integration/auth-api',
  'integration/commands',
  'integration/development-setup',
  'integration/email',
];

export const NAV_GROUPS: NavGroupConfig[] = [
  {
    title: 'Overview',
    slugs: [
      'getting-started',
      'environment',
      'demo-mode',
      'architecture',
      'security',
      'ui-principles',
      'project-tree',
    ],
  },
  {
    title: 'Integration',
    slugs: [
      'integration/after-login',
      'integration/auth-api',
      'integration/commands',
      'integration/development-setup',
      'integration/email',
    ],
  },
];

export const FLATTEN_SECTIONS: string[] = [];
