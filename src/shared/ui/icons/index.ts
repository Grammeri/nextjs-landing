import type { IconDefinition, IconNode } from './types';
import { LUCIDE_STROKE } from './lucide';

export { CopyIcon, copyIconDefinition } from './copy';
export { ExternalLinkIcon, externalLinkIconDefinition } from './external-link';
export { CheckIcon, checkIconDefinition } from './check';
export { CloseIcon, closeIconDefinition } from './close';
export type { IconDefinition, IconNode, IconProps } from './types';

const appendIconNodes = (svg: SVGSVGElement, nodes: IconNode[]) => {
  for (const node of nodes) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', node.tag);
    for (const [key, value] of Object.entries(node.attrs)) {
      el.setAttribute(key, value);
    }
    svg.appendChild(el);
  }
};

export const createIconElement = (definition: IconDefinition, className?: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', definition.viewBox);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', LUCIDE_STROKE);
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  if (className) {
    svg.setAttribute('class', className);
  }
  appendIconNodes(svg, definition.nodes);
  return svg;
};
