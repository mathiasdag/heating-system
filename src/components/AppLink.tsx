'use client';
import Link from 'next/link';
import React, { useState } from 'react';

interface AppActionProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'minimal';
  asButton?: boolean;
  className?: string;
  actionType?: 'link' | 'copy';
  onCopy?: () => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: string;
  rel?: string;
}

const baseStyles = {
  primary:
    'uppercase bg-text text-white mix-blend-multiply rounded-sm px-3 pt-[.6em] pb-2 block text-center max-w-full overflow-hidden text-ellipsis whitespace-nowrap',
  secondary:
    'uppercase bg-accent rounded-sm px-3 pt-[.6em] pb-2 block text-center max-w-full overflow-hidden text-ellipsis whitespace-nowrap',
  outline:
    'uppercase border border-text rounded-sm px-3 pt-[.6em] pb-2 inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap',
  minimal: 'block max-w-full overflow-hidden text-ellipsis whitespace-nowrap',
};

export const AppAction: React.FC<AppActionProps> = ({
  href,
  children,
  variant = 'primary',
  asButton = false,
  className = '',
  actionType = 'link',
  onCopy,
  ...rest
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopy = async () => {
    if (href) {
      try {
        await navigator.clipboard.writeText(href);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
        onCopy?.();
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const style = baseStyles[variant] + ' ' + className;

  // Handle copy action
  if (actionType === 'copy') {
    return (
      <>
        <button onClick={handleCopy} className={style} type="button">
          <div className="flex items-center gap-3 justify-center">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <div className="truncate min-w-0">{children}</div>
          </div>
        </button>
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-right duration-300">
            Kopierat!
          </div>
        )}
      </>
    );
  }

  // Handle link actions
  if (asButton) {
    return (
      <button className={style} type="button">
        {children}
      </button>
    );
  }

  if (!href) {
    return null;
  }

  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        className={style}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={style}>
      {children}
    </Link>
  );
};

// Keep the old name for backward compatibility
export const AppLink = AppAction;
