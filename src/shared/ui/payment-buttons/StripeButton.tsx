import { Button } from '@/shared/ui/button';

type Props = {
  onClick?: () => void | Promise<void>;
};

export function StripeButton({ onClick }: Props) {
  return (
    <Button variant="primary" onClick={onClick}>
      Pay with Stripe
    </Button>
  );
}
