import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { ProductHero, ProductSection } from '@/shared/ui/product';
import { PricingCard } from '@/shared/ui/pricing-card';
import CopySupportEmail from './_components/CopySupportEmail';
import styles from './page.module.css';

export default function AuthForgeProductPage() {
  return (
    <main className={styles.page}>
      <div className="container-wide">
        <ProductHero
          title="AuthForge"
          subtitle="Production-ready authentication system for modern SaaS products."
          trustTitle="Built for real production use"
          trustDescription={
            'AuthForge is not a toy example. It is built using the same patterns and constraints found in real-world SaaS products.\n\n' +
            'AuthForge is database-agnostic by design. PostgreSQL is used as a production-ready reference setup via Prisma, not as a hard dependency. You can adapt AuthForge to other databases without changing core authentication logic.'
          }
          primaryAction={
            <Button as="a" href="/demo" variant="primary">
              View Demo
            </Button>
          }
          secondaryAction={
            <div className={styles.heroActions}>
              <Button as="a" href="/docs/authforge/quick-start" variant="secondary">
                Read Docs
              </Button>
              <Button as="a" href="/pricing#authforge" variant="secondary">
                Buy license
              </Button>
            </div>
          }
        />
      </div>

      <div className="container">
        <ProductSection title="Who is AuthForge for">
          <ul className={styles.audienceList}>
            <li>SaaS founders who don’t want to build authentication from scratch</li>
            <li>Developers shipping MVPs and production apps</li>
            <li>Teams that need a real-world auth reference</li>
            <li>Engineers learning modern authentication architecture</li>
          </ul>
        </ProductSection>
      </div>

      <div className="container-wide">
        <ProductSection title="What’s included">
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Authentication</h3>
              <ul className={styles.featureList}>
                <li>Email &amp; password authentication</li>
                <li>Email verification</li>
                <li>Password reset flows</li>
              </ul>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Sessions &amp; Security</h3>
              <ul className={styles.featureList}>
                <li>Access and refresh sessions</li>
                <li>HttpOnly cookies</li>
                <li>Secure session handling</li>
              </ul>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Architecture</h3>
              <ul className={styles.featureList}>
                <li>Database-agnostic authentication architecture</li>
                <li>Prisma-based reference implementation (PostgreSQL)</li>
                <li>Token-driven UI (use our tokens or plug in your own styling system)</li>
              </ul>
            </div>
          </div>
        </ProductSection>
      </div>

      <div className="container">
        <ProductSection title="How it works">
          <ol className={styles.steps}>
            <li>Clone the repository</li>
            <li>Configure environment variables</li>
            <li>Connect your database</li>
            <li>Run migrations</li>
            <li>Start building your product</li>
          </ol>
        </ProductSection>
      </div>

      <div className="container">
        <ProductSection title="Try before you buy">
          <div className={styles.trustBlock}>
            <p className={styles.trustText}>
              Before purchasing, you can explore the code, review the documentation, and see the
              authentication flows in action. AuthForge uses secure HttpOnly cookie-based sessions
              with server-side session storage by default, and the architecture can be adapted to
              other approaches if required.
            </p>
            <ul className={styles.trustList}>
              <li>
                <Link href="/demo">Live demo</Link>
              </li>
              <li>
                <Link href="/docs/authforge/quick-start">Full documentation</Link>
              </li>
              <li>
                <Link href="/docs/authforge/architecture">
                  Architecture overview (including token-driven UI design system)
                </Link>
              </li>
              <li>
                Questions before or after purchase? Contact us at{' '}
                <span className={styles.supportInline}>
                  <span className={styles.supportEmail}>support@authforge.dev</span>
                  <CopySupportEmail />
                </span>
              </li>
            </ul>
          </div>
        </ProductSection>
      </div>

      <div className="container-wide">
        <PricingCard
          title="AuthForge"
          description="Production-ready authentication system for modern SaaS products"
          price="$99 — One-time license"
          features={[
            { text: '1 project' },
            { text: 'Lifetime access' },
            { text: 'Updates included' },
            {
              text: '14-day refund if access was not used',
            },
            { text: 'Support via email (support@authforge.dev)' },
          ]}
          ctaLabel="Buy AuthForge"
          ctaHref="/pricing#authforge"
          footerNote="Access instructions will be sent by email after purchase"
        />
      </div>
    </main>
  );
}
