import { PRICING_CARDS } from '@/shared/config/products/pricing';
import { PricingCard } from '@/shared/ui/pricing-card';
import styles from './page.module.css';

export default function PricingPage() {
  return (
    <section className={styles.page}>
      <div className={styles.grid}>
        {PRICING_CARDS.map((card) => (
          <div key={card.title} className={styles.card}>
            <PricingCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
}
