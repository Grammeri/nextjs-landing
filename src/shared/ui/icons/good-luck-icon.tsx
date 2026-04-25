import type { SVGProps } from 'react';

export function GoodLuckIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <circle cx="10" cy="14" r="4.8" stroke="currentColor" strokeWidth="1.8" />

      <path
        d="M4.6 11.1L10.1 13.8L19.8 6.1"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}