import { Button } from '@/shared/ui/button';

type Props = {
  onClick?: () => void | Promise<void>;
};

export function PaypalButton({ onClick }: Props) {
  return (
    <Button variant="secondary" onClick={onClick}>
      Pay with PayPal
    </Button>
  );
}
