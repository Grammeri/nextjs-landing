import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>✅ Payment successful</h1>

      <p style={{ fontSize: 18, marginBottom: 32 }}>
        Thank you for purchasing <strong>AuthForge</strong>.
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
