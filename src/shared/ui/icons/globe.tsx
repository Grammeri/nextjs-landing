import type { SVGProps } from 'react';

export function GlobeIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
            <path
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
            />
            <path
                d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.35 3.25 5.35 3.25 9S14.2 18.65 12 21M12 3C9.8 5.35 8.75 8.35 8.75 12S9.8 18.65 12 21"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.7"
            />
        </svg>
    );
}