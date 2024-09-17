interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className="max-w-4xl mx-auto p-10">{children}</div>;
};
