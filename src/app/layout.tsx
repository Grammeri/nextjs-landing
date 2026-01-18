import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/Header';
import CookieNotice from '@/components/cookie-notice/CookieNotice';

export const metadata: Metadata = {
  title: 'Next.js Landing',
  description: 'Public marketing landing page for multiple products and services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
