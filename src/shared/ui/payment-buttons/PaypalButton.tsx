import { SelectableItem } from '@/shared/ui/selection';
import styles from './PaymentButton.module.css';

type Props = {
  selected: boolean;
  onSelect: () => void;
};

/**
 * PayPal is currently disabled for the initial Stripe-only launch.
 * This component is kept for future rollout and can be enabled
 * via the BILLING_PROVIDERS feature flag.
 */

export function PaypalButton({ selected, onSelect }: Props) {
  return (
    <SelectableItem selected={selected} onSelect={onSelect} variant="paypal">
      <img
        src="/images/brands/paypal-logo.svg"
        alt="PayPal"
        className={styles['logo-paypal'] as string}
      />
    </SelectableItem>
  );
}
