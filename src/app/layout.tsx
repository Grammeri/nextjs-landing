import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import CookieNotice from '@/components/cookie-notice/CookieNotice';

export const metadata: Metadata = {
  metadataBase: new URL('https://authforge.dev'),

  title: {
    default: 'AuthForge — Production-ready authentication for modern SaaS',
    template: '%s | AuthForge',
  },

  description:
    'AuthForge is a production-ready authentication foundation for modern SaaS applications. Built with Next.js, TypeScript, Prisma, and secure best practices.',

  keywords: [
    'authentication',
    'nextjs auth',
    'saas authentication',
    'auth boilerplate',
    'nextjs authentication',
    'auth system',
    'saas security',
  ],

  authors: [{ name: 'AuthForge' }],
  creator: 'AuthForge',
  publisher: 'AuthForge',

  openGraph: {
    title: 'AuthForge — Production-ready authentication for modern SaaS',
    description:
      'Production-ready authentication foundation built with Next.js, TypeScript, and secure SaaS architecture.',
    url: 'https://authforge.dev',
    siteName: 'AuthForge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AuthForge — Production-ready authentication foundation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AuthForge — Production-ready authentication for modern SaaS',
    description:
      'Production-ready authentication foundation built with Next.js and secure SaaS architecture.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: '/favicon.ico',
  },

  robots: {
    index: true,
    follow: true,
  },
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
      </body>
    </html>
  );
}
