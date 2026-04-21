import { getLocale } from '@/shared/lib/i18n/getLocale';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  getLocale(locale);

  return children;
}
