import { Button } from '@/shared/ui/button';
import { CheckIcon, CloseIcon } from '@/shared/ui/icons';
import { ProductCard } from '@/shared/ui/product-card/ProductCard';
import styles from './PricingCard.module.css';

export type PricingFeature = {
  text: string;
  included: boolean;
};

export type PricingCardProps = {
  title: string;
  description: string;
  price: string;
  features: PricingFeature[];
  ctaLabel: string;
  ctaHref: string;
  footerNote?: string;
};

export function PricingCard({
  title,
  description,
  price,
  features,
  ctaLabel,
  ctaHref,
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
              <span
                className={`${styles.icon} ${!feature.included ? styles.iconExcluded : ''}`}
                aria-hidden="true"
              >
                {feature.included ? (
                  <CheckIcon className={styles.iconSvg} />
                ) : (
                  <CloseIcon className={styles.iconSvg} />
                )}
              </span>
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
        <Button as="a" href={ctaHref} variant="inverted">
          {ctaLabel}
        </Button>
        {footerNote ? <p className={styles.footerNote}>{footerNote}</p> : null}
      </div>
    </ProductCard>
  );
}
