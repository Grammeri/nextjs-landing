import { redirect } from 'next/navigation';

type PricingPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
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

  redirect(`/en/pricing${query.size ? `?${query.toString()}` : ''}`);
}
