export type DocsProduct = 'authforge' | 'starter';

export type DocNavItem = {
  title: string;
  slug?: string;
  children?: DocNavItem[];
};

export type OutlineItem = {
  id: string;
  label: string;
};

export type DocMetadata = {
  title: string;
  description: string;
};

export type DocsProductConfig = {
  slug: DocsProduct;
  label: string;
  titleSuffix: string;
  defaultTitle: string;
  defaultDescription: string;
  sidebarTitle: string;
  sidebarAriaLabel: string;
  contentDir: string;
};
