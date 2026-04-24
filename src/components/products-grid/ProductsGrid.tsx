'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { ProductGridItem } from '@/shared/config/products/catalog';
import { getLocaleFromPathname, getLocalizedHref } from '@/shared/lib/i18n/localizedHref';
import { ProductCard } from '@/shared/ui/product-card/ProductCard';

type ProductsGridProps = {
  items: ProductGridItem[];
};

export function ProductsGrid({ items }: ProductsGridProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return (
    <>
      {items.map((item, index) => {
        const href = getLocalizedHref(locale, item.href);

        return (
          <Link key={`${item.href}-${item.title}-${index}`} href={href}>
            <ProductCard interactive>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </ProductCard>
          </Link>
        );
      })}
    </>
  );
}