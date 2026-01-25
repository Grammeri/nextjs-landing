import { PricingCard } from '@/shared/ui/pricing-card';

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
        <PricingCard
          title="AuthForge"
          description="Production-ready authentication system for modern SaaS products"
          price="$99 — One-time license"
          features={[
            { text: '1 project', included: true },
            { text: 'Lifetime access', included: true },
            { text: 'Updates included', included: true },
            {
              text: 'Refunds available within 14 days if access was not used',
              included: false,
            },
          ]}
          ctaLabel="Buy AuthForge"
          ctaHref="#"
          footerNote="Access instructions will be sent by email after purchase"
        />
      </div>
    </main>
  );
}
