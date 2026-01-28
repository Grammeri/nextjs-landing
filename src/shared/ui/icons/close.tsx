import type { IconDefinition, IconNode, IconProps } from './types';
import { LUCIDE_STROKE } from './lucide';

export const closeIconDefinition: IconDefinition = {
  viewBox: '0 0 24 24',
  nodes: [
    { tag: 'path', attrs: { d: 'M18 6L6 18' } },
    { tag: 'path', attrs: { d: 'M6 6l12 12' } },
  ],
};

const renderNodes = (nodes: IconNode[]) =>
  nodes.map((node, index) => {
    const Tag = node.tag;
    return <Tag key={index} {...node.attrs} />;
  });

export function CloseIcon({ className, title }: IconProps) {
  return (
    <svg
      className={className}
      viewBox={closeIconDefinition.viewBox}
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
      {renderNodes(closeIconDefinition.nodes)}
    </svg>
  );
}
