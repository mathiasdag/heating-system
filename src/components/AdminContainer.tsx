'use client';

import React from 'react';

interface AdminContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Admin Container Component
 *
 * A wrapper container for admin buttons positioned in the bottom-right corner.
 * Accepts children (buttons) to be displayed in a vertical stack.
 */
export const AdminContainer: React.FC<AdminContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`fixed bottom-11 left-2 sm:left-auto md:bottom-2 right-2 z-50 mix-blend-multiply bg-text text-bg flex flex-row rounded-md divide-x ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default AdminContainer;
