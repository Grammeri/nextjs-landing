import DocContent from './DocContent';

type DocPageProps = {
  slug: string[];
};

export default function DocPage({ slug }: DocPageProps) {
  const slugPath = slug.join('/');

  return <DocContent slug={slugPath} />;
}
