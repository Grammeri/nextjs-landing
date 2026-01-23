import type { ReactNode } from 'react';
import Link from 'next/link';

type AuthForgeDocsLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default function AuthForgeDocsLayout({ children, params }: AuthForgeDocsLayoutProps) {
  const { locale } = params;

  return (
    <section className="container">
      <nav aria-label="AuthForge documentation">
        <ul>
          <li>
            <Link href={`/${locale}/docs/authforge/getting-started`}>Getting Started</Link>
          </li>
          <li>
            <Link href={`/${locale}/docs/authforge/architecture`}>Architecture</Link>
          </li>
          <li>
            <Link href={`/${locale}/docs/authforge/demo-mode`}>Demo Mode</Link>
          </li>
          <li>
            <Link href={`/${locale}/docs/authforge/environment`}>Environment</Link>
          </li>
          <li>
            <span>Adapting</span>
            <ul>
              <li>
                <Link href={`/${locale}/docs/authforge/adapting/after-login`}>After Login</Link>
              </li>
              <li>
                <Link href={`/${locale}/docs/authforge/adapting/email`}>Email</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </section>
  );
}
