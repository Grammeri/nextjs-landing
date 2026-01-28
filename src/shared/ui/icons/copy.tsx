import type { IconDefinition, IconNode, IconProps } from './types';
import { LUCIDE_STROKE } from './lucide';

export const copyIconDefinition: IconDefinition = {
  viewBox: '0 0 24 24',
  nodes: [
    { tag: 'rect', attrs: { x: '9', y: '9', width: '11', height: '11', rx: '2' } },
    { tag: 'path', attrs: { d: 'M5 15V5a2 2 0 0 1 2-2h10' } },
  ],
};

const renderNodes = (nodes: IconNode[]) =>
  nodes.map((node, index) => {
    const Tag = node.tag;
    return <Tag key={index} {...node.attrs} />;
  });

export function CopyIcon({ className, title }: IconProps) {
  return (
    <svg
      className={className}
      viewBox={copyIconDefinition.viewBox}
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
      {renderNodes(copyIconDefinition.nodes)}
    </svg>
  );
}
