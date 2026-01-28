export type IconNode = {
  tag: 'path' | 'rect';
  attrs: Record<string, string>;
};

export type IconDefinition = {
  viewBox: string;
  nodes: IconNode[];
};

export type IconProps = {
  className?: string;
  title?: string;
};
