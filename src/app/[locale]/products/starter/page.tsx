'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getDefaultDocRoute, getDocsRoute } from '@/app/[locale]/docs/_lib/products';
import { BILLING_PROVIDERS } from '@/shared/config/billing';
import { DEFAULT_LOCALE, isSupportedLocale } from '@/shared/config/i18n';
import { createPricingCard } from '@/shared/config/products/pricing';
import { getProductCopy } from '@/shared/lib/i18n/getProductCopy';
import { useCheckout } from '@/shared/lib/billing/useCheckout';
import { Button } from '@/shared/ui/button';
import { ProductHero, ProductSection } from '@/shared/ui/product';
import { PricingCard } from '@/shared/ui/pricing-card';
import { UI_TEXT } from '@/shared/config/ui';
import CopySupportEmail from '@/app/products/authforge/_components/CopySupportEmail';
import styles from '@/shared/ui/product-page/ProductPage.module.css';
import layoutStyles from '@/app/products/layout.module.css';

export default function StarterPage() {
  const params = useParams<{ locale?: string }>();
  const rawLocale = typeof params.locale === 'string' ? params.locale : DEFAULT_LOCALE;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const productCopy = getProductCopy('starter', locale);
  const pricingCard = createPricingCard('starter', locale);
  const { checkoutWithStripe, checkoutWithPaypal } = useCheckout('starter');
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
            title={productCopy.name}
            subtitle={`${productCopy.shortDescription}.`}
            trustTitle={productCopy.hero.trustTitle}
            trustDescription={productCopy.hero.trustDescription}
            secondaryAction={
              <div className={styles.heroActions}>
                <Button as="a" href={docsEntryHref} variant="secondary">
                  {productCopy.actions.readDocs}
                </Button>

                <Button as="a" href={toolingHref} variant="secondary">
                  {productCopy.actions.viewTooling}
                </Button>

                <Button onClick={scrollToPricing} variant="primary">
                  {productCopy.actions.buyLicense}
                </Button>
              </div>
            }
          />

          <ProductSection title={productCopy.sectionTitles.audience} align="center">
            <ul className={styles.audienceList}>
              {productCopy.audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
            <div className={styles.trustBlock}>
              <p className={styles.trustText}>{productCopy.tryBeforeYouBuy.description}</p>

              <ul className={styles.trustList}>
                <li>
                  <Link href={docsEntryHref}>{productCopy.tryBeforeYouBuy.links[0]?.label}</Link>
                </li>

                <li>
                  <Link href={toolingHref}>{productCopy.tryBeforeYouBuy.links[1]?.label}</Link>
                </li>

                <li>
                  <Link href={structureHref}>{productCopy.tryBeforeYouBuy.links[2]?.label}</Link>
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
          </ProductSection>

          <div ref={pricingRef}>
            <div className={styles.pricingWrapper}>
              <PricingCard
                {...pricingCard}
                paymentTitle={
                  BILLING_PROVIDERS.paypal ? UI_TEXT.payment.multiple : UI_TEXT.payment.single
                }
                onPayWithStripe={checkoutWithStripe}
                onPayWithPaypal={BILLING_PROVIDERS.paypal ? checkoutWithPaypal : undefined}
                footerNote="Access instructions will be sent by email after purchase"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
