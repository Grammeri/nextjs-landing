import { redirect } from 'next/navigation';

type CheckoutSuccessRedirectPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CheckoutSuccessRedirectPage({
  searchParams,
}: CheckoutSuccessRedirectPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params ?? {})) {
    if (typeof value === 'string') {
      query.set(key, value);
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    }
  }

  redirect(`/en/checkout/success${query.size ? `?${query.toString()}` : ''}`);
}
