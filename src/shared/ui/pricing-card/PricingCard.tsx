import { CheckIcon } from '@/shared/ui/icons';
import { ProductCard } from '@/shared/ui/product-card/ProductCard';
import { PaypalButton } from '@/shared/ui/payment-buttons/PaypalButton';
import { StripeButton } from '@/shared/ui/payment-buttons/StripeButton';
import styles from './PricingCard.module.css';

export type PricingFeature = {
  text: string;
};

export type PricingCardProps = {
  title: string;
  description: string;
  price: string;
  features: PricingFeature[];
  paymentTitle?: string;
  onPayWithStripe?: () => void | Promise<void>;
  onPayWithPaypal?: () => void | Promise<void>;
  footerNote?: string;
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
}: PricingCardProps) {
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
        <div className={styles.paymentButtons}>
          {onPayWithStripe && <StripeButton onClick={onPayWithStripe} />}
          {onPayWithPaypal && <PaypalButton onClick={onPayWithPaypal} />}
        </div>
        {footerNote ? <p className={styles.footerNote}>{footerNote}</p> : null}
      </div>
    </ProductCard>
  );
}
