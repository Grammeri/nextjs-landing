import { ProductCard } from '@/shared/ui/product-card/ProductCard';

export function PlaceholderProductCard() {
  return (
    <ProductCard variant="placeholder">
      <h3>Coming soon</h3>
      <p>This product is currently under development. Stay tuned.</p>
    </ProductCard>
  );
}
