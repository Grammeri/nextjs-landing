import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import CookieNotice from '@/components/cookie-notice/CookieNotice';

import { PaywallModal } from '@/shared/ui/paywall-modal';
import { DocsLinkInterceptor } from '@/shared/ui/protected-link';

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

        <main>{children}</main>

        <Footer />
        <CookieNotice />

        {/* Global UI overlays */}
        <PaywallModal />

        {/* Docs client-side enhancers */}
        <DocsLinkInterceptor />
      </body>
    </html>
  );
}
