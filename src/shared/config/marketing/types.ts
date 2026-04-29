import type { ProductId } from '@/shared/config/products/types';

export type MarketingProductCardCopy = {
  productId: ProductId;
  title: string;
  description: string;
};

export type MarketingDictionary = {
  home: {
    hero: {
      headline: string;
      lead: string;
    };
    products: MarketingProductCardCopy[];
  };
};

export type ProductFeatureGroupCopy = {
  title: string;
  items: string[];
};

export type ProductLinkCopy = {
  key: string;
  label: string;
};

export type ProductCopy = {
  productId: ProductId;
  name: string;
  shortDescription: string;
  supportEmail: string;
  actions: Record<string, string>;
  sectionTitles: {
    audience: string;
    included: string;
    howItWorks: string;
    tryBeforeYouBuy: string;
  };
  hero: {
    trustTitle: string;
    trustDescription: string;
  };
  audience: string[];
  featureGroups: ProductFeatureGroupCopy[];
  howItWorks: string[];
  tryBeforeYouBuy: {
    description: string;
    links: ProductLinkCopy[];
    contactPrefix: string;
    contactLead: string;
  };
  pricing: {
    description: string;
    price: string;
    features: string[];
    footerNote: string;
  };
  underDevelopment?: {
    title: string;
    subtitle: string;
  };
};
