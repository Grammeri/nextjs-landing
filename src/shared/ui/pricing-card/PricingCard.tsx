'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { routes } from '@/shared/config/routes';
import { CheckIcon } from '@/shared/ui/icons';
import { StripeButton, PaypalButton } from '@/shared/ui/payment-buttons';
import { SelectableGroup } from '@/shared/ui/selection';
import { ProductCard } from '@/shared/ui/product-card/ProductCard';
import styles from './PricingCard.module.css';

export type PricingFeature = {
  text: string;
};

type PaymentProvider = 'stripe' | 'paypal';

export type PricingCardProps = {
  title: string;
  description: string;
  price: string;
  features: PricingFeature[];
  paymentTitle?: string;
  deliveryNotice?: string;
  termsPrefix?: string;
  termsLabel?: string;
  termsError?: string;
  onPayWithStripe?: (termsAccepted: boolean) => void | Promise<void>;
  onPayWithPaypal?: (termsAccepted: boolean) => void | Promise<void>;
  footerNote?: string;
  paymentLayout?: 'full' | 'centered';
};

export function PricingCard({
  title,
  description,
  price,
  features,
  paymentTitle,
  deliveryNotice,
  termsPrefix,
  termsLabel,
  termsError,
  onPayWithStripe,
  onPayWithPaypal,
  footerNote,
  paymentLayout = 'full',
}: PricingCardProps) {
  const shellRef = useRef<HTMLDivElement>(null);

  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isUnderHeader, setIsUnderHeader] = useState(false);

  useEffect(() => {
    const getHeaderHeight = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
        .trim();

      const value = Number.parseInt(raw, 10);

      return Number.isFinite(value) ? value : 72;
    };

    let raf = 0;

    const updateCardPosition = () => {
      raf = 0;

      const element = shellRef.current;

      if (!element) {
        setIsUnderHeader(false);
        return;
      }

      const rect = element.getBoundingClientRect();
      const headerHeight = getHeaderHeight();

      setIsUnderHeader(rect.top <= headerHeight && rect.bottom > headerHeight);
    };

    const scheduleUpdate = () => {
      if (raf) return;

      raf = window.requestAnimationFrame(updateCardPosition);
    };

    updateCardPosition();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);

      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <div
      ref={shellRef}
      className={`${styles.shell} ${isUnderHeader ? styles.shellUnderHeader : ''}`}
    >
      <ProductCard interactive={false}>
        <div className={styles.card}>
          <h3>{title}</h3>

          <p className={styles.description}>{description}</p>
          <p className={styles.price}>{price}</p>

          <ul className={styles.features}>
            {features.map((feature) => (
              <li key={feature.text} className={styles.feature}>
                <span className={styles.icon} aria-hidden="true">
                  <CheckIcon className={styles.iconSvg} />
                </span>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
          {paymentTitle && <p className={`${styles.paymentTitle} paymentTitle`}>{paymentTitle}</p>}
          <p className={styles.deliveryNotice}>{deliveryNotice}</p>

          <div
            className={paymentLayout === 'centered' ? styles.paymentCentered : styles.paymentFull}
          >
            <SelectableGroup>
              {onPayWithStripe && (
                <StripeButton
                  selected={selectedProvider === 'stripe'}
                  onSelect={() => {
                    setSelectedProvider('stripe');
                    if (!termsAccepted) {
                      setShowError(true);
                      return;
                    }

                    setShowError(false);
                    void onPayWithStripe(termsAccepted);
                  }}
                />
              )}

              {onPayWithPaypal && (
                <PaypalButton
                  selected={selectedProvider === 'paypal'}
                  onSelect={() => {
                    setSelectedProvider('paypal');
                    if (!termsAccepted) {
                      setShowError(true);
                      return;
                    }

                    setShowError(false);
                    void onPayWithPaypal(termsAccepted);
                  }}
                />
              )}
            </SelectableGroup>

            <div className={styles.consentWrapper}>
              <label className={styles.consentLabel}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  aria-invalid={showError}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (e.target.checked) {
                      setShowError(false);
                    }
                  }}
                  className={showError ? styles.checkboxError : undefined}
                />
                <span>
                  {termsPrefix}{' '}
                  <Link href={routes.legal} className={styles.termsLink}>
                    {termsLabel}
                  </Link>
                </span>
              </label>

              {showError && (
                <p className={styles.errorText}>
                  <span aria-hidden="true">⚠</span>
                  <span>{termsError}</span>
                </p>
              )}
            </div>
          </div>
          {footerNote ? <p className={styles.footerNote}>{footerNote}</p> : null}
        </div>
      </ProductCard>
    </div>
  );
}
