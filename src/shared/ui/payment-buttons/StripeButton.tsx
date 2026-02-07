import { SelectableItem } from '@/shared/ui/selection';
import styles from './PaymentButton.module.css';

type Props = {
  selected: boolean;
  onSelect: () => void;
};

export function StripeButton({ selected, onSelect }: Props) {
  return (
    <SelectableItem selected={selected} onSelect={onSelect} variant="stripe">
      <img
        src="/images/brands/stripe-logo.svg"
        alt="Stripe"
        className={styles['logo-stripe'] as string}
      />
    </SelectableItem>
  );
}
