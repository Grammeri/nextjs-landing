'use client';

import { useState } from 'react';
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
  onPayWithStripe?: () => void | Promise<void>;
  onPayWithPaypal?: () => void | Promise<void>;
  footerNote?: string;
  paymentLayout?: 'full' | 'centered';
};

export function PricingCard({
  title,
  description,
  price,
  features,
  paymentTitle,
  onPayWithStripe,
  onPayWithPaypal,
  footerNote,
  paymentLayout = 'full',
}: PricingCardProps) {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
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

        {paymentTitle && <p className={styles.paymentTitle}>{paymentTitle}</p>}

        <div className={paymentLayout === 'centered' ? styles.paymentCentered : styles.paymentFull}>
          <SelectableGroup>
            {onPayWithStripe && (
              <StripeButton
                selected={selectedProvider === 'stripe'}
                onSelect={() => {
                  setSelectedProvider('stripe');
                  if (!isAccepted) {
                    setShowError(true);
                    return;
                  }

                  setShowError(false);
                  void onPayWithStripe();
                }}
              />
            )}

            {onPayWithPaypal && (
              <PaypalButton
                selected={selectedProvider === 'paypal'}
                onSelect={() => {
                  setSelectedProvider('paypal');
                  if (!isAccepted) {
                    setShowError(true);
                    return;
                  }

                  setShowError(false);
                  void onPayWithPaypal();
                }}
              />
            )}
          </SelectableGroup>

          <div className={styles.consentWrapper}>
            <label className={styles.consentLabel}>
              <input
                type="checkbox"
                checked={isAccepted}
                aria-invalid={showError}
                onChange={(e) => {
                  setIsAccepted(e.target.checked);
                  if (e.target.checked) {
                    setShowError(false);
                  }
                }}
                className={showError ? styles.checkboxError : undefined}
              />
              <span>
                I agree to the{' '}
                <a href="/legal" className={styles.termsLink}>
                  Terms & Conditions
                </a>
              </span>
            </label>

            {showError && (
              <p className={styles.errorText}>
                <span aria-hidden="true">⚠</span>
                <span>You must accept the Terms before proceeding.</span>
              </p>
            )}
          </div>
        </div>
        {footerNote ? <p className={styles.footerNote}>{footerNote}</p> : null}
      </div>
    </ProductCard>
  );
}
