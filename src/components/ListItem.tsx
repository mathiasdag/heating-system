'use client';

import React from 'react';
import clsx from 'clsx';

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'outline' | 'background';
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  className,
  variant = 'outline',
}) => {
  const baseClasses = 'px-4 py-7 rounded-lg text-center';

  const variantClasses = {
    outline: 'border border-text',
    background: 'bg-surface',
  };

  return (
    <div className={clsx(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
};

export default ListItem;
