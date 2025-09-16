'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DevIndicator } from '@/components/DevIndicator';

interface ReusableOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  componentName?: string;
}

const ReusableOverlay: React.FC<ReusableOverlayProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className = '',
  componentName = 'ReusableOverlay',
}) => {
  // Handle escape key and prevent scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scroll when overlay is open
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 bg-bg select-none ${className}`}
    >
      <DevIndicator componentName={componentName} />

      {/* Header */}
      {(title || subtitle) && (
        <div className="absolute top-0 left-0 p-2 flex gap-x-3 z-10">
          {title && <span className="uppercase">{title}</span>}
          {subtitle && <span>({subtitle})</span>}
        </div>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 z-20 hover:bg-gray-100 transition-colors"
      >
        Stäng
      </button>

      {/* Content */}
      {children}
    </motion.div>
  );
};

export default ReusableOverlay;
