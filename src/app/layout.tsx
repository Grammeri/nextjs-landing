import type { Metadata } from 'next';
import './globals.css';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import CookieNotice from '@/components/cookie-notice/CookieNotice';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://software-forge.dev';
const siteName = 'Software Forge';
const defaultTitle = 'Software Forge — Production-ready SaaS foundations and developer products';
const titleTemplate = '%s | Software Forge';
const defaultDescription =
  'Software Forge builds production-ready SaaS foundations and developer products, including AuthForge and Starter, with a focus on modern architecture, security, and clean implementation.';
const ogImageAlt = 'Software Forge — Production-ready SaaS foundations and developer products';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: defaultTitle,
    template: titleTemplate,
  },

  description: defaultDescription,

  keywords: [
    'software forge',
    'saas starter',
    'nextjs starter',
    'auth starter',
    'authentication',
    'nextjs auth',
    'developer products',
    'saas boilerplate',
    'production-ready saas',
    'full-stack starter',
  ],

  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,

  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
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
