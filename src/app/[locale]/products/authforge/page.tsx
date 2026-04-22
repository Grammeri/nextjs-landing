'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PricingCardContainer from '@/app/(business)/pricing/_components/PricingCardContainer';
import { getDefaultDocRoute, getDocsRoute } from '@/app/[locale]/docs/_lib/products';
import { DEFAULT_LOCALE, isSupportedLocale } from '@/shared/config/i18n';
import { createPricingCard } from '@/shared/config/products/pricing';
import { getProductCopy } from '@/shared/lib/i18n/getProductCopy';
import { Button } from '@/shared/ui/button';
import { ProductHero, ProductSection } from '@/shared/ui/product';
import CopySupportEmail from '@/app/products/authforge/_components/CopySupportEmail';
import styles from '@/shared/ui/product-page/ProductPage.module.css';
import layoutStyles from '@/app/products/layout.module.css';

export default function AuthForgeProductPage() {
  const params = useParams<{ locale?: string }>();
  const rawLocale = typeof params.locale === 'string' ? params.locale : DEFAULT_LOCALE;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const productCopy = getProductCopy('authforge', locale);
  const pricingCard = createPricingCard('authforge', locale);
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
            title={productCopy.name}
            subtitle={`${productCopy.shortDescription}.`}
            trustTitle={productCopy.hero.trustTitle}
            trustDescription={productCopy.hero.trustDescription}
            secondaryAction={
              <div className={styles.heroActions}>
                <Button as="a" href="/demo" variant="secondary">
                  {productCopy.actions.viewDemo}
                </Button>
                <Button as="a" href={docsEntryHref} variant="secondary">
                  {productCopy.actions.readDocs}
                </Button>
                <Button onClick={scrollToPricing} variant="primary">
                  {productCopy.actions.buyLicense}
                </Button>
              </div>
            }
          />

          <ProductSection title={productCopy.sectionTitles.audience} align="center">
            <div className={`${styles.sectionContent} ${styles.sectionContentWide}`}>
              <ul className={styles.audienceList}>
                {productCopy.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </ProductSection>

          <ProductSection title={productCopy.sectionTitles.included}>
            <div className={styles.featureGrid}>
              {productCopy.featureGroups.map((group) => (
                <div key={group.title} className={styles.featureCard}>
                  <h3 className={styles.featureTitle}>{group.title}</h3>
                  <ul className={styles.featureList}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ProductSection>

          <ProductSection title={productCopy.sectionTitles.howItWorks} align="center">
            <div className={styles.contentNarrow}>
              <ol className={styles.steps}>
                {productCopy.howItWorks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </ProductSection>

          <ProductSection title={productCopy.sectionTitles.tryBeforeYouBuy}>
            <div className={`${styles.sectionContent} ${styles.sectionContentWide}`}>
              <div className={styles.trustBlock}>
                <p className={styles.trustText}>
                  {productCopy.tryBeforeYouBuy.description}
                </p>

                <ul className={styles.trustList}>
                  <li>
                    <Link href="/demo">
                      {productCopy.tryBeforeYouBuy.links[0]?.label}
                    </Link>
                  </li>

                  <li>
                    <Link href={docsEntryHref}>
                      {productCopy.tryBeforeYouBuy.links[1]?.label}
                    </Link>
                  </li>

                  <li>
                    <Link href={architectureHref}>
                      {productCopy.tryBeforeYouBuy.links[2]?.label}
                    </Link>
                  </li>
                </ul>

                <p className={styles.supportText}>
                  {productCopy.tryBeforeYouBuy.contactPrefix}{' '}
                  <span className={styles.contactLead}>
                    {productCopy.tryBeforeYouBuy.contactLead}
                  </span>{' '}
                  <span className={styles.supportInline}>
                    <span className={styles.supportEmail}>{productCopy.supportEmail}</span>
                    <CopySupportEmail />
                  </span>
                </p>
              </div>
            </div>
          </ProductSection>

          <div ref={pricingRef}>
            <div className={styles.pricingWrapper}>
              <PricingCardContainer productId="authforge" card={pricingCard} locale={locale} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
