import Link from 'next/link';
import { PRODUCTS_GRID_ITEMS } from '@/shared/config/products/catalog';
import { ProductCard } from '@/shared/ui/product-card/ProductCard';

export function ProductsGrid() {
  return (
    <>
      {PRODUCTS_GRID_ITEMS.map((item, index) => (
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
