import { redirect } from 'next/navigation';

type AuthForgeDocsOverviewPageProps = {
  params: {
    locale: string;
  };
};

export default async function AuthForgeDocsOverviewPage({
  params,
}: AuthForgeDocsOverviewPageProps) {
  const { locale } = await Promise.resolve(params);
  redirect(`/${locale}/docs/authforge/quick-start`);
}
