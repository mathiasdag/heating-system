'use client';
import Link from 'next/link';
import React from 'react';
import {
  routeLink,
  type LinkGroup,
  isExternalUrl,
  getExternalLinkAttributes,
} from '@/utils/linkRouter';
import { useNotification } from '@/hooks/useNotification';
import clsx from 'clsx';

interface AppActionProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  asButton?: boolean;
  className?: string;
  actionType?: 'link' | 'copy';
  onCopy?: () => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: string;
  rel?: string;
  // New prop for LinkGroup support
  link?: LinkGroup;
}

const sizeStyles = {
  sm: 'px-2 pt-[.4em] pb-1',
  md: 'px-4 py-2.5',
  lg: 'px-4 pt-[1.1em] pb-4',
};

const baseStyles = {
  primary:
    'uppercase bg-text text-white mix-blend-multiply rounded-md block text-center max-w-full overflow-hidden text-ellipsis whitespace-nowrap',
  secondary:
    'uppercase bg-accent rounded-md block text-center max-w-full overflow-hidden text-ellipsis whitespace-nowrap',
  outline:
    'uppercase border border-text rounded-md inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap',
  minimal: 'block max-w-full overflow-hidden text-ellipsis whitespace-nowrap',
};

export const AppAction: React.FC<AppActionProps> = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  asButton = false,
  className = '',
  actionType = 'link',
  onCopy,
  link,
}) => {
  const { showSuccess, showError } = useNotification();

  // Use link router if link prop is provided, otherwise fall back to legacy behavior
  const linkResult = link
    ? routeLink(link)
    : {
        href: href || '#',
        isExternal: href ? isExternalUrl(href) : false,
        isCopy: actionType === 'copy',
        shouldRenderAsButton: asButton || actionType === 'copy',
      };

  const handleCopy = async () => {
    const textToCopy = linkResult.href || href || '';
    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        showSuccess('Kopierat!', {
          duration: 5000,
        });
        onCopy?.();
      } catch (err) {
        console.error('Failed to copy:', err);
        showError('Kunde inte kopiera texten');
      }
    }
  };

  const style = clsx(
    baseStyles[variant],
    variant !== 'minimal' && sizeStyles[size],
    'transition-transform duration-75 ease-out active:scale-[0.99]',
    className
  );

  // Handle copy action
  if (linkResult.isCopy || actionType === 'copy') {
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
      </>
    );
  }

  // Handle button actions
  if (linkResult.shouldRenderAsButton || asButton) {
    return (
      <button className={style} type="button">
        {children}
      </button>
    );
  }

  if (!linkResult.href || linkResult.href === '#') {
    return null;
  }

  // Ensure href is always a string
  const safeHref = typeof linkResult.href === 'string' ? linkResult.href : '#';

  // Handle external links
  if (linkResult.isExternal) {
    const externalAttrs = getExternalLinkAttributes();
    return (
      <a
        href={safeHref}
        className={style}
        target={externalAttrs.target}
        rel={externalAttrs.rel}
      >
        {children}
      </a>
    );
  }

  // Handle internal links
  return (
    <Link href={safeHref} className={style}>
      {children}
    </Link>
  );
};

// Keep the old name for backward compatibility
export const AppLink = AppAction;
