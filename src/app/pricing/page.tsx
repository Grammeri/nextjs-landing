import { Button } from '@/shared/ui/button';
import { ProductCard } from '@/shared/ui/product-card/ProductCard';

export default function PricingPage() {
  return (
    <main
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 'var(--section-padding-top-compact)',
        paddingBottom: 'var(--section-padding-bottom-default)',
      }}
    >
      <div id="authforge" style={{ width: '100%', maxWidth: '520px' }}>
        <ProductCard interactive={false}>
          <h3>AuthForge</h3>
          <p>Production-ready authentication system for modern SaaS products</p>
          <p>
            <strong>$99</strong> — One-time license
          </p>
          <ul style={{ color: 'var(--color-on-image-primary)' }}>
            <li>
              <span style={{ color: 'var(--color-on-image-primary)' }}>✔</span> 1 project
            </li>
            <li>
              <span style={{ color: 'var(--color-on-image-primary)' }}>✔</span> Lifetime access
            </li>
            <li>
              <span style={{ color: 'var(--color-on-image-primary)' }}>✔</span> Updates included
            </li>
            <li>
              <span style={{ color: 'var(--color-error)' }}>✖</span> Refunds available within 14
              days if access was not used
            </li>
          </ul>
          <Button
            as="a"
            href="#"
            variant="primary"
            style={{
              background: 'var(--color-on-image-primary)',
              color: 'var(--color-product-text)',
            }}
          >
            Buy AuthForge
          </Button>
          <p style={{ color: 'var(--color-on-image-secondary)' }}>
            Access instructions will be sent by email after purchase
          </p>
        </ProductCard>
      </div>
    </main>
  );
}
