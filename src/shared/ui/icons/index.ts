import type { IconDefinition, IconNode } from './types';
import { LUCIDE_STROKE } from './lucide';

export { ExternalLinkIcon, externalLinkIconDefinition } from './external-link';
export { CheckIcon, checkIconDefinition } from './check';
export type { IconDefinition, IconNode, IconProps } from './types';

export const copyIconDefinition: IconDefinition = {
  viewBox: '0 0 24 24',
  nodes: [
    { tag: 'rect', attrs: { x: '9', y: '9', width: '11', height: '11', rx: '2' } },
    { tag: 'path', attrs: { d: 'M5 15V5a2 2 0 0 1 2-2h10' } },
  ],
};

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

export const appendCopyIcon = (button: HTMLElement) => {
  if (!button.querySelector('.docs-copy-icon')) {
    button.appendChild(createIconElement(copyIconDefinition, 'docs-copy-icon'));
  }
};
