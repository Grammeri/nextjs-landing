'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { getDefaultDocRoute, getDocsRoute } from '@/app/[locale]/docs/_lib/products';
import { Button } from '@/shared/ui/button';
import { STARTER_PRODUCT_COPY } from '@/shared/config/products/starter';
import { ProductHero, ProductSection } from '@/shared/ui/product';
import StarterPricingCard from '@/shared/ui/product-pricing/StarterPricingCard';
import CopySupportEmail from '@/app/products/authforge/_components/CopySupportEmail';
import styles from '@/shared/ui/product-page/ProductPage.module.css';
import layoutStyles from '@/app/products/layout.module.css';

export default function StarterPage() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const docsEntryHref = getDefaultDocRoute('starter');
  const toolingHref = getDocsRoute('starter', 'tooling');
  const structureHref = getDocsRoute('starter', 'project-structure');

  return (
    <div className={layoutStyles.productLayout}>
      <div className={layoutStyles.productSurface}>
        <main className={styles.page}>
          <ProductHero
            title={STARTER_PRODUCT_COPY.name}
            subtitle={`${STARTER_PRODUCT_COPY.shortDescription}.`}
            trustTitle="Built for clean Next.js project foundations"
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

          <ProductSection title="Who is this starter for" align="center">
            <ul className={styles.audienceList}>
              <li>
                Developers starting a new Next.js project who want a clean, production-ready
                baseline
              </li>
              <li>Students completing technical assignments with a professional project structure</li>
              <li>Engineers who want TypeScript, linting, formatting, hooks, and CI already organized</li>
              <li>Developers learning modern Next.js tooling and maintainable project conventions</li>
            </ul>
          </ProductSection>

          <ProductSection title="What’s included">
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Project structure</h3>
                <ul className={styles.featureList}>
                  <li>Clean Next.js App Router setup</li>
                  <li>Predictable folder organization</li>
                  <li>Clear separation between app routes, components, shared UI, and libraries</li>
                </ul>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Developer tooling</h3>
                <ul className={styles.featureList}>
                  <li>Strict TypeScript configuration</li>
                  <li>ESLint for code quality</li>
                  <li>Prettier for consistent formatting</li>
                  <li>Husky Git hooks</li>
                  <li>Conventional commit validation</li>
                </ul>
              </div>

              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>Automation</h3>
                <ul className={styles.featureList}>
                  <li>CI-ready workflow structure</li>
                  <li>Automated repository checks</li>
                  <li>Repeatable development workflow for real projects and assignments</li>
                </ul>
              </div>
            </div>
          </ProductSection>

          <ProductSection title="How it works" align="center">
            <div className={styles.contentNarrow}>
              <ol className={styles.steps}>
                <li>Download the Next.js Professional Starter source package</li>
                <li>Install dependencies with pnpm</li>
                <li>Review the App Router structure and tooling setup</li>
                <li>Run the development workflow locally</li>
                <li>Start building your project or technical assignment on a clean foundation</li>
              </ol>
            </div>
          </ProductSection>

          <ProductSection title="Try before you buy">
            <div className={styles.trustBlock}>
              <p className={styles.trustText}>
                Before purchasing, you can review the documentation, inspect the project structure,
                and understand the tooling included in the starter. The package is designed to be
                easy to read, quick to set up, and practical for both real projects and technical
                assignments.
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

              <p className={styles.supportText}>
                Questions before or after purchase?{' '}
                <span className={styles.contactLead}>Contact us at</span>{' '}
                <span className={styles.supportInline}>
                  <span className={styles.supportEmail}>support@software-forge.dev</span>
                  <CopySupportEmail />
                </span>
              </p>
            </div>
          </ProductSection>

          <div ref={pricingRef}>
            <div className={styles.pricingWrapper}>
              <StarterPricingCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
