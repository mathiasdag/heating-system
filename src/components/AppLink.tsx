import Link from 'next/link';
import React from 'react';

interface AppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  asButton?: boolean;
  className?: string;
}

const baseStyles = {
  primary: 'px-6 py-2 border border-black rounded bg-black text-white hover:bg-white hover:text-black transition font-mono',
  secondary: 'px-6 py-2 border border-black rounded bg-white text-black hover:bg-black hover:text-white transition font-mono',
  outline: 'uppercase border border-black rounded-sm px-3 pt-[.6em] pb-2 inline-block',
};

export const AppLink: React.FC<AppLinkProps> = ({
  href,
  children,
  variant = 'primary',
  asButton = false,
  className = '',
  ...rest
}) => {
  const isExternal = href.startsWith('http');
  const style = baseStyles[variant] + ' ' + className;

  if (asButton) {
    return (
      <button className={style} {...rest}>
        {children}
      </button>
    );
  }

  if (isExternal) {
    return (
      <a href={href} className={style} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={style} {...rest}>
      {children}
    </Link>
  );
}; 