import Link from 'next/link';
import type { ProductGridItem } from '@/shared/config/products/catalog';
import { ProductCard } from '@/shared/ui/product-card/ProductCard';

type ProductsGridProps = {
  items: ProductGridItem[];
};

export function ProductsGrid({ items }: ProductsGridProps) {
  return (
    <>
      {items.map((item, index) => (
        <Link key={`${item.href}-${item.title}-${index}`} href={item.href}>
          <ProductCard interactive>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </ProductCard>
        </Link>
      ))}
    </>
  );
}
