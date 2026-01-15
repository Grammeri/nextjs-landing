import Link from 'next/link';
import { ProductCard } from '@/shared/ui/product-card/ProductCard';

export function ProductsGrid() {
  return (
    <>
      <Link href="/products/authforge">
        <ProductCard interactive>
          <h3>AuthForge</h3>
          <p>
            Production-ready authentication boilerplate with sessions, roles, security best
            practices and clean architecture.
          </p>
        </ProductCard>
      </Link>

      <Link href="/products/nextjs-test-kit">
        <ProductCard interactive>
          <h3>Next.js Test Assignment Kit</h3>
          <p>
            Ready-to-use Next.js project for technical interviews and test assignments — with clean
            architecture, tooling, and real-world setup.
          </p>
        </ProductCard>
      </Link>

      <Link href="/products/coming-soon">
        <ProductCard interactive>
          <h3>Coming soon</h3>
          <p>This product is currently under development. Stay tuned.</p>
        </ProductCard>
      </Link>

      <Link href="/products/coming-soon">
        <ProductCard interactive>
          <h3>Coming soon</h3>
          <p>This product is currently under development. Stay tuned.</p>
        </ProductCard>
      </Link>
    </>
  );
}
