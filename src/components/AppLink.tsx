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
  primary: 'uppercase bg-black text-white mix-blend-multiply rounded-sm px-3 pt-[.6em] pb-2 inline-block text-center',
  secondary: 'uppercase bg-orange rounded-sm px-3 pt-[.6em] pb-2 inline-block text-center',
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