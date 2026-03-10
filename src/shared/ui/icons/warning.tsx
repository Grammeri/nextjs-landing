import type { IconProps } from './types';
import { LUCIDE_STROKE } from './lucide';

export const warningIconDefinition = {
  viewBox: '0 0 24 24',
  nodes: [
    {
      tag: 'path' as const,
      attrs: {
        d: 'M12 2L22.5 21H1.5L12 2Z',
      },
    },
    {
      tag: 'path' as const,
      attrs: {
        d: 'M12 8V13.5',
      },
    },
    {
      tag: 'path' as const,
      attrs: {
        d: 'M12 17.25H12.01',
      },
    },
  ],
};

export function WarningIcon({ className, title }: IconProps) {
  const ariaHidden = title ? undefined : true;

  return (
    <svg
      viewBox={warningIconDefinition.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={LUCIDE_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
      role={title ? 'img' : undefined}
      focusable="false"
      className={className}
    >
      {title ? <title>{title}</title> : null}
      {warningIconDefinition.nodes.map((node, index) => {
        if (node.tag === 'path') {
          return <path key={index} {...node.attrs} />;
        }

        return <rect key={index} {...node.attrs} />;
      })}
    </svg>
  );
}
