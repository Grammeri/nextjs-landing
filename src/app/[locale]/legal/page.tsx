import type { Metadata } from 'next';

import LegalPage, { metadata as baseMetadata } from '@/app/(business)/legal/page';

export const metadata: Metadata = baseMetadata;

export default function LocalizedLegalPage() {
  return <LegalPage />;
}

