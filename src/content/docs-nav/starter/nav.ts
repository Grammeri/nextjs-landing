type NavGroupConfig = {
  title: string;
  slugs: string[];
};

export const DOC_TITLES: Record<string, string> = {
  'ci-pipeline': 'CI Pipeline',
};

export const SECTION_TITLES: Record<string, string> = {};

export const ROOT_ORDER: string[] = [
  'quick-start',
  'development-setup',
  'commands',
  'project-structure',
  'tooling',
  'ci-pipeline',
  'troubleshooting',
];

export const NAV_GROUPS: NavGroupConfig[] = [
  {
    title: 'Getting Started',
    slugs: ['quick-start', 'development-setup', 'commands'],
  },
  {
    title: 'Architecture',
    slugs: ['project-structure'],
  },
  {
    title: 'Tooling',
    slugs: ['tooling', 'ci-pipeline'],
  },
  {
    title: 'Troubleshooting',
    slugs: ['troubleshooting'],
  },
];

export const FLATTEN_SECTIONS: string[] = [];
