'use client';

import * as React from 'react';
import { useAccess } from '@/shared/lib/access';
import { openPaywallModal } from '@/shared/ui/paywall-modal';

type ProtectedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ProtectedLink({ href, children, className }: ProtectedLinkProps) {
  const { hasAccess, loading } = useAccess();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (loading) return;

    if (!hasAccess) {
      openPaywallModal();
      return;
    }

    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
