import AuthForgePricingCard from '@/shared/ui/product-pricing/AuthForgePricingCard';

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
        <AuthForgePricingCard />
      </div>
    </main>
  );
}
