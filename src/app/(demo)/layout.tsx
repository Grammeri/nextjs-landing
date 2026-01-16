import type { ReactNode } from 'react';

type DemoLayoutProps = {
  children: ReactNode;
};

export default function DemoLayout({ children }: DemoLayoutProps) {
  return (
    <main
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-xl)',
        paddingTop: 'var(--spacing-xl)',
        paddingBottom: 'var(--spacing-xl)',
        textAlign: 'center',
      }}
    >
      <aside role="note" aria-live="polite">
        <strong>⚠️ This is a demo environment.</strong>
        <div>This demo shows how AuthForge works in production.</div>
      </aside>
      {children}
    </main>
  );
}
