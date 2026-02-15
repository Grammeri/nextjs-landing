import { SelectableItem } from '@/shared/ui/selection';
import styles from './PaymentButton.module.css';

type Props = {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
};

export function StripeButton({ selected, onSelect, disabled = false }: Props) {
  return (
    <SelectableItem selected={selected} onSelect={onSelect} variant="stripe" disabled={disabled}>
      <img
        src="/images/brands/stripe-logo.svg"
        alt="Stripe"
        className={styles['logo-stripe'] as string}
      />
    </SelectableItem>
  );
}
