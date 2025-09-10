'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';

interface HighlightOverlayProps {
  highlight: {
    id: string;
    title: string;
    slug: string;
    description?: any;
    featuredImage?: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    gallery?: Array<{
      id: string;
      image: {
        id: string;
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      };
      caption?: string;
    }>;
    client?: string;
    year?: number;
    tags?: Array<{
      id: string;
      tag: string;
    }>;
  };
  currentPath: string;
  onClose: () => void;
}

const HighlightOverlay: React.FC<HighlightOverlayProps> = ({
  highlight,
  currentPath,
  onClose,
}) => {
  const router = useRouter();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <DevIndicator componentName="HighlightOverlay" />

        <div className="h-full overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-64 md:h-80">
                {highlight.featuredImage?.url ? (
                  <Image
                    src={highlight.featuredImage.url}
                    alt={highlight.featuredImage.alt || highlight.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 6-12 12" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title and Meta */}
                <div className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {highlight.title}
                  </h1>
                  
                  {(highlight.client || highlight.year) && (
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      {highlight.client && (
                        <span className="font-medium">{highlight.client}</span>
                      )}
                      {highlight.year && (
                        <span>{highlight.year}</span>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {highlight.tags && highlight.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {highlight.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag.tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                {highlight.description && (
                  <div className="mb-8">
                    <RichText data={highlight.description} />
                  </div>
                )}

                {/* Gallery */}
                {highlight.gallery && highlight.gallery.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Gallery
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {highlight.gallery.map((item) => (
                        <div key={item.id} className="space-y-2">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                            <Image
                              src={item.image.url}
                              alt={item.image.alt || item.caption || ''}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {item.caption && (
                            <p className="text-sm text-gray-600">{item.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HighlightOverlay;
