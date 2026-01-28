import type { IconDefinition, IconNode, IconProps } from './types';
import { LUCIDE_STROKE } from './lucide';

export const checkIconDefinition: IconDefinition = {
  viewBox: '0 0 24 24',
  nodes: [{ tag: 'path', attrs: { d: 'M20 6L9 17l-5-5' } }],
};

const renderNodes = (nodes: IconNode[]) =>
  nodes.map((node, index) => {
    const Tag = node.tag;
    return <Tag key={index} {...node.attrs} />;
  });

export function CheckIcon({ className, title }: IconProps) {
  return (
    <svg
      className={className}
      viewBox={checkIconDefinition.viewBox}
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
      {renderNodes(checkIconDefinition.nodes)}
    </svg>
  );
}
