'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { getDefaultDocRoute, getDocsRoute } from '@/app/[locale]/docs/_lib/products';
import { Button } from '@/shared/ui/button';
import { STARTER_PRODUCT_COPY } from '@/shared/config/products/starter';
import { ProductHero, ProductSection } from '@/shared/ui/product';
import StarterPricingCard from '@/shared/ui/product-pricing/StarterPricingCard';
import styles from '@/shared/ui/product-page/ProductPage.module.css';

export default function StarterPage() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const docsEntryHref = getDefaultDocRoute('starter');
  const toolingHref = getDocsRoute('starter', 'tooling');
  const structureHref = getDocsRoute('starter', 'project-structure');

  return (
    <main className={styles.page}>
      <div className="container-wide">
        <ProductHero
          title={STARTER_PRODUCT_COPY.name}
          subtitle={`${STARTER_PRODUCT_COPY.shortDescription}.`}
          trustTitle="Built for clean project foundations"
          trustDescription={STARTER_PRODUCT_COPY.cardDescription}
          secondaryAction={
            <div className={styles.heroActions}>
              <Button as="a" href={docsEntryHref} variant="secondary">
                Read Docs
              </Button>

              <Button as="a" href={toolingHref} variant="secondary">
                View Tooling
              </Button>

              <Button onClick={scrollToPricing} variant="primary">
                Buy license
              </Button>
            </div>
          }
        />
      </div>

      <div className="container">
        <ProductSection title="Who is this starter for">
          <ul className={styles.audienceList}>
            <li>Developers starting a new Next.js project</li>
            <li>Students completing technical assignments</li>
            <li>Engineers who want a clean project baseline</li>
            <li>Developers learning modern tooling practices</li>
          </ul>
        </ProductSection>
      </div>

      <div className="container-wide">
        <ProductSection title="What’s included">
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Project structure</h3>
              <ul className={styles.featureList}>
                <li>Clean Next.js App Router setup</li>
                <li>Predictable folder organization</li>
                <li>Separation between application, components, and libraries</li>
              </ul>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Developer tooling</h3>
              <ul className={styles.featureList}>
                <li>TypeScript strict configuration</li>
                <li>ESLint for code quality</li>
                <li>Prettier for consistent formatting</li>
                <li>Husky Git hooks</li>
                <li>Conventional commit validation</li>
              </ul>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Automation</h3>
              <ul className={styles.featureList}>
                <li>Continuous integration workflow</li>
                <li>Automated repository verification</li>
                <li>Consistent development workflow</li>
              </ul>
            </div>
          </div>
        </ProductSection>
      </div>

      <div className="container">
        <ProductSection title="How it works">
          <ol className={styles.steps}>
            <li>Download the source package</li>
            <li>Install dependencies with pnpm</li>
            <li>Review the project structure and developer tooling</li>
            <li>Start building your own product or complete your assignment</li>
          </ol>
        </ProductSection>
      </div>

      <div className="container">
        <ProductSection title="Try before you buy">
          <div className={styles.trustBlock}>
            <p className={styles.trustText}>
              Before purchasing, you can review the documentation, inspect the project structure,
              and understand the tooling setup included in the starter. This gives you a clear view
              of how the repository is organized and how the development workflow is designed.
            </p>

            <ul className={styles.trustList}>
              <li>
                <Link href={docsEntryHref}>Starter documentation</Link>
              </li>

              <li>
                <Link href={toolingHref}>Tooling overview</Link>
              </li>

              <li>
                <Link href={structureHref}>Project structure overview</Link>
              </li>
            </ul>
          </div>
        </ProductSection>
      </div>

      <div ref={pricingRef} className="container-wide">
        <div className={styles.pricingWrapper}>
          <StarterPricingCard />
        </div>
      </div>
    </main>
  );
}
