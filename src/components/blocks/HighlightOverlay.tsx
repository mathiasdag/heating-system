'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DevIndicator } from '../DevIndicator';
import ShowcaseCarousel from './ShowcaseCarousel';

interface HighlightOverlayProps {
  showcase: {
    id: string;
    title: string;
    slug: string;
    description?: unknown;
    featuredImage?: {
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    assets?: Array<{
      id: string;
      blockType: 'imageWithCaption' | 'videoWithCaption' | 'text';
      image?: {
        id: string;
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      };
      caption?: string;
      host?: string;
      playbackId?: string;
      autoplay?: boolean;
      controls?: boolean;
      title?: string;
      content?: unknown;
    }>;
    client?: string;
    year?: number;
    tags?: Array<{
      id: string;
      tag: string;
    }>;
  };
  onClose: () => void;
}

const HighlightOverlay: React.FC<HighlightOverlayProps> = ({
  showcase,
  onClose,
}) => {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentAsset, setCurrentAsset] = useState<any>(null);

  // Debug logging
  console.log('HighlightOverlay received showcase:', showcase);
  console.log('Showcase assets:', showcase.assets);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCurrentAssetChange = (index: number, asset: any) => {
    setCurrentAssetIndex(index);
    setCurrentAsset(asset);
  };
  // Handle escape key and prevent scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      console.log('HighlightOverlay: Key pressed:', e.key);
      if (e.key === 'Escape') {
        console.log('HighlightOverlay: Escape pressed - closing overlay');
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
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-bg select-none"
    >
      <DevIndicator componentName="HighlightOverlay" />

      <div className="absolute top-0 left-0 p-2 flex gap-x-3  z-10">
        <span className="uppercase">{showcase.title}</span>
        <span>({showcase.year})</span>
        {showcase.assets && showcase.assets.length > 0 && (
          <div className="flex gap-x-3 fixed bottom-2 left-2 sm:static">
            <span>
              {currentAssetIndex + 1}/{showcase.assets.length}
            </span>
            {(currentAsset?.caption ||
              (currentAsset?.blockType === 'text' && currentAsset?.title)) && (
              <span>{currentAsset.caption || currentAsset.title}</span>
            )}
          </div>
        )}
      </div>

      <button onClick={onClose} className="absolute top-0 right-0 p-2 z-20">
        Stäng
      </button>

      {/* Content */}
      {/* Assets Carousel */}
      {showcase.assets && showcase.assets.length > 0 && (
        <ShowcaseCarousel
          assets={showcase.assets}
          onCurrentAssetChange={handleCurrentAssetChange}
        />
      )}
    </motion.div>
  );
};

export default HighlightOverlay;
