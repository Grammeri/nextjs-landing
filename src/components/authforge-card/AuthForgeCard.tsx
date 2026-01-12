import { ProductCard } from '@/shared/ui/product-card/ProductCard';

export function AuthForgeCard() {
  return (
    <ProductCard interactive={true}>
      <h3>AuthForge</h3>
      <p>
        Production-ready authentication boilerplate with sessions, roles, security best practices
        and clean architecture.
      </p>
    </ProductCard>
  );
}
