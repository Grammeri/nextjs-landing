'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { getDefaultDocRoute, getDocsRoute } from '@/app/[locale]/docs/_lib/products';
import { Button } from '@/shared/ui/button';
import {
  AUTHFORGE_PRODUCT_COPY,
  AUTHFORGE_SUPPORT_EMAIL,
} from '@/shared/config/products/authforge';
import { ProductHero, ProductSection } from '@/shared/ui/product';
import AuthForgePricingCard from '@/shared/ui/product-pricing/AuthForgePricingCard';
import CopySupportEmail from '@/app/products/authforge/_components/CopySupportEmail';
import styles from '@/shared/ui/product-page/ProductPage.module.css';
import layoutStyles from '@/app/products/layout.module.css';

export default function AuthForgeProductPage() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const docsEntryHref = getDefaultDocRoute('authforge');
  const architectureHref = getDocsRoute('authforge', 'architecture');

  return (
    <div className={layoutStyles.productLayout}>
      <div className={layoutStyles.productSurface}>
        <main className={styles.page}>
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
                <Button as="a" href={docsEntryHref} variant="secondary">
                  {AUTHFORGE_PRODUCT_COPY.actions.readDocs}
                </Button>
                <Button onClick={scrollToPricing} variant="primary">
                  {AUTHFORGE_PRODUCT_COPY.actions.buyLicense}
                </Button>
              </div>
            }
          />

          <ProductSection title={AUTHFORGE_PRODUCT_COPY.sectionTitles.audience} align="center">
            <div className={`${styles.sectionContent} ${styles.sectionContentWide}`}>
              <ul className={styles.audienceList}>
                {AUTHFORGE_PRODUCT_COPY.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </ProductSection>

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

          <ProductSection title={AUTHFORGE_PRODUCT_COPY.sectionTitles.howItWorks} align="center">
            <div className={styles.contentNarrow}>
              <ol className={styles.steps}>
                {AUTHFORGE_PRODUCT_COPY.howItWorks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </ProductSection>

          <ProductSection title={AUTHFORGE_PRODUCT_COPY.sectionTitles.tryBeforeYouBuy}>
            <div className={`${styles.sectionContent} ${styles.sectionContentWide}`}>
              <div className={styles.trustBlock}>
                <p className={styles.trustText}>
                  {AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.description}
                </p>

                <ul className={styles.trustList}>
                  <li>
                    <Link href="/demo">
                      {AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.links.demoLabel}
                    </Link>
                  </li>

                  <li>
                    <Link href={docsEntryHref}>
                      {AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.links.docsLabel}
                    </Link>
                  </li>

                  <li>
                    <Link href={architectureHref}>
                      {AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.links.architectureLabel}
                    </Link>
                  </li>
                </ul>

                <p className={styles.supportText}>
                  {AUTHFORGE_PRODUCT_COPY.tryBeforeYouBuy.contactPrefix}{' '}
                  <span className={styles.contactLead}>Contact us at</span>{' '}
                  <span className={styles.supportInline}>
                    <span className={styles.supportEmail}>{AUTHFORGE_SUPPORT_EMAIL}</span>
                    <CopySupportEmail />
                  </span>
                </p>
              </div>
            </div>
          </ProductSection>

          <div ref={pricingRef}>
            <div className={styles.pricingWrapper}>
              <AuthForgePricingCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
