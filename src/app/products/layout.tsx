import { ReactNode } from 'react';

type ProductsLayoutProps = {
  children: ReactNode;
};

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '64px 16px',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          padding: '48px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
