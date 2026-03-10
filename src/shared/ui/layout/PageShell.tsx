type Props = {
  children: React.ReactNode;
};

export function PageShell({ children }: Props) {
  return <main className="pageShell">{children}</main>;
}
