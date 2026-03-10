type Props = {
  children: React.ReactNode;
};

export function ContentSurface({ children }: Props) {
  return <div className="pageSurface">{children}</div>;
}
