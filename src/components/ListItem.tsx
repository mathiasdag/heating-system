'use client';

import React from 'react';
import clsx from 'clsx';

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'outline' | 'background';
  size?: 'sm' | 'md' | 'lg';
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  className,
  variant = 'outline',
  size = 'md',
}) => {
  const baseClasses = 'rounded-lg text-center';

  const sizeClasses = {
    sm: 'px-4 py-4 text-sm',
    md: 'px-6 py-7 text-base',
    lg: 'px-6 py-10 text-lg',
  };

  const variantClasses = {
    outline: 'border border-text',
    background: 'bg-surface',
  };

  return (
    <div
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default ListItem;
