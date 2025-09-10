import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showcase: ReactNode;
}

export default function Layout({ children, showcase }: LayoutProps) {
  return (
    <>
      {children}
      {showcase}
    </>
  );
}
