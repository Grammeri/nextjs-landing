import { Button } from '@/shared/ui/button';
import { ProductCTA, ProductHero, ProductSection } from '@/shared/ui/product';
import styles from './page.module.css';

export default function AuthForgeProductPage() {
  return (
    <main className={styles.page}>
      <div className="container-wide">
        <ProductHero
          title="AuthForge"
          subtitle="Production-ready authentication system for modern SaaS products."
          trustTitle="Built for real production use"
          trustDescription="AuthForge is not a toy example. It is built using the same patterns and constraints found in real-world SaaS products."
          primaryAction={
            <Button as="a" href="/demo" variant="primary">
              View Demo
            </Button>
          }
          secondaryAction={
            <Button as="a" href="#" variant="secondary">
              Read Docs
            </Button>
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
                <li>Clean and scalable structure</li>
                <li>Prisma + PostgreSQL</li>
                <li>Production-ready setup</li>
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
              <li>Live demo</li>
              <li>Full documentation</li>
              <li>Architecture overview</li>
            </ul>
          </div>
        </ProductSection>
      </div>

      <div className="container-wide">
        <ProductCTA
          title="Ready to build with AuthForge?"
          description="AuthForge will be available as a one-time purchase with lifetime access."
          actions={
            <Button as="a" href="#" variant="primary">
              Coming soon
            </Button>
          }
        />
      </div>
    </main>
  );
}
