import { Button } from '@/shared/ui/button';

export default function AuthForgeDemoPage() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xl)',
        alignItems: 'center',
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <h1>AuthForge Demo</h1>
        <p>Production-ready authentication system for SaaS</p>
      </header>
      <p>
        This is a live demonstration of AuthForge. You can explore authentication flows and
        dashboard behavior without installing or configuring anything.
      </p>

      <div
        style={{
          display: 'grid',
          gap: 'var(--spacing-sm)',
          textAlign: 'left',
          width: '100%',
          maxWidth: 'var(--container-width)',
        }}
      >
        <p>✅ Secure authentication flows</p>
        <p>✅ Email verification &amp; sessions</p>
        <p>✅ HttpOnly cookies</p>
        <p>✅ Production-ready architecture</p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
        <Button as="a" href="https://authforge-demo.vercel.app" variant="primary">
          Open Live Demo
        </Button>
        <Button as="a" href="/products/authforge" variant="secondary">
          Back to Product Overview
        </Button>
      </div>
      <small>Demo data is temporary and may be reset.</small>
    </section>
  );
}
