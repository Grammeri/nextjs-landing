'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import {
  AUTHFORGE_PRODUCT_COPY,
  AUTHFORGE_SUPPORT_EMAIL,
} from '@/shared/config/products/authforge';
import AuthForgePricingCard from '@/shared/ui/product-pricing/AuthForgePricingCard';
import { ProductHero, ProductSection } from '@/shared/ui/product';
import CopySupportEmail from './_components/CopySupportEmail';
import styles from './page.module.css';

export default function AuthForgeProductPage() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className={styles.page}>
      <div className="container-wide">
        <ProductHero
          title={AUTHFORGE_PRODUCT_COPY.name}
          subtitle={`${AUTHFORGE_PRODUCT_COPY.shortDescription}.`}
          trustTitle={AUTHFORGE_PRODUCT_COPY.hero.trustTitle}
          trustDescription={AUTHFORGE_PRODUCT_COPY.hero.trustDescription}
          secondaryAction={
            <div className={styles.heroActions}>
              <Button as="a" href="/demo" variant="secondary">
                {AUTHFORGE_PRODUCT_COPY.actions.viewDemo}
              </Button>
              <Button as="a" href="/docs/authforge/quick-start" variant="secondary">
                {AUTHFORGE_PRODUCT_COPY.actions.readDocs}
              </Button>
              <Button onClick={scrollToPricing} variant="primary">
                {AUTHFORGE_PRODUCT_COPY.actions.buyLicense}
              </Button>
            </div>
          }
        />
      </div>

      <div className="container">
        <ProductSection title={AUTHFORGE_PRODUCT_COPY.sectionTitles.audience}>
          <ul className={styles.audienceList}>
            {AUTHFORGE_PRODUCT_COPY.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ProductSection>
      </div>

      <div className="container-wide">
        <ProductSection title={AUTHFORGE_PRODUCT_COPY.sectionTitles.included}>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>
                {AUTHFORGE_PRODUCT_COPY.features.authentication.title}
              </h3>
              <ul className={styles.featureList}>
                {AUTHFORGE_PRODUCT_COPY.features.authentication.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>
                {AUTHFORGE_PRODUCT_COPY.features.sessionsAndSecurity.title}
              </h3>
              <ul className={styles.featureList}>
                {AUTHFORGE_PRODUCT_COPY.features.sessionsAndSecurity.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>
                {AUTHFORGE_PRODUCT_COPY.features.architecture.title}
              </h3>
              <ul className={styles.featureList}>
                {AUTHFORGE_PRODUCT_COPY.features.architecture.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ProductSection>
      </div>

      <div className="container">
        <ProductSection title={AUTHFORGE_PRODUCT_COPY.sectionTitles.howItWorks}>
          <ol className={styles.steps}>
            {AUTHFORGE_PRODUCT_COPY.howItWorks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </ProductSection>
      </div>

      <div className="container">
        <ProductSection title={AUTHFORGE_PRODUCT_COPY.sectionTitles.tryBeforeYouBuy}>
          <div className={styles.trustBlock}>
            <p className={styles.trustText}>{AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.description}</p>
            <ul className={styles.trustList}>
              <li>
                <Link href="/demo">{AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.links.demoLabel}</Link>
              </li>
              <li>
                <Link href="/docs/authforge/quick-start">
                  {AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.links.docsLabel}
                </Link>
              </li>
              <li>
                <Link href="/docs/authforge/architecture">
                  {AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.links.architectureLabel}
                </Link>
              </li>
              <li>
                {AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.contactPrefix}{' '}
                <span className={styles.supportInline}>
                  <span className={styles.supportEmail}>{AUTHFORGE_SUPPORT_EMAIL}</span>
                  <CopySupportEmail />
                </span>
              </li>
            </ul>
          </div>
        </ProductSection>
      </div>

      <div ref={pricingRef} className="container-wide">
        <div className={styles.pricingWrapper}>
          <AuthForgePricingCard />
        </div>
      </div>
    </main>
  );
}
