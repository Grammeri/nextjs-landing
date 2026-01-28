import type { IconDefinition, IconNode, IconProps } from './types';
import { LUCIDE_STROKE } from './lucide';

export const externalLinkIconDefinition: IconDefinition = {
  viewBox: '0 0 24 24',
  nodes: [
    { tag: 'path', attrs: { d: 'M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' } },
    { tag: 'path', attrs: { d: 'M15 3h6v6' } },
    { tag: 'path', attrs: { d: 'M10 14L21 3' } },
  ],
};

const renderNodes = (nodes: IconNode[]) =>
  nodes.map((node, index) => {
    const Tag = node.tag;
    return <Tag key={index} {...node.attrs} />;
  });

export function ExternalLinkIcon({ className, title }: IconProps) {
  return (
    <svg
      className={className}
      viewBox={externalLinkIconDefinition.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={LUCIDE_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      focusable="false"
      role={title ? 'img' : 'presentation'}
    >
      {title ? <title>{title}</title> : null}
      {renderNodes(externalLinkIconDefinition.nodes)}
    </svg>
  );
}
