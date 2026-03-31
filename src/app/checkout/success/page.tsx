import Link from 'next/link';

const PRODUCT_TITLES = {
  authforge: 'AuthForge',
  starter: 'Next.js Professional Starter',
} as const;

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    productId?: string;
  }>;
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { productId } = await searchParams;

  const productTitle =
    productId && productId in PRODUCT_TITLES
      ? PRODUCT_TITLES[productId as keyof typeof PRODUCT_TITLES]
      : 'your product';

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>✅ Payment successful</h1>

      <p style={{ fontSize: 18, marginBottom: 32 }}>
        Thank you for purchasing <strong>{productTitle}</strong>.
        <br />
        Access instructions have been sent to your email.
      </p>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <Link href="/docs">
          <button>Read documentation</button>
        </Link>

        <Link href="/pricing">
          <button>Back to pricing</button>
        </Link>
      </div>
    </main>
  );
}
