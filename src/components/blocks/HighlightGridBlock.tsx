'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DevIndicator } from '@/components/dev/DevIndicator';
import HighlightOverlay from '@/components/blocks/HighlightOverlay';
import { AnimatePresence } from 'framer-motion';

interface HighlightGridBlockProps {
  headline: string;
  highlights: Array<{
    relationTo: string;
    value: {
      id: string;
      title: string;
      slug: string;
      // Showcase fields
      featuredImage?: {
        id: string;
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      };
      year?: number;
      // Article fields
      heroAsset?: {
        type?: 'image' | 'mux';
        image?: {
          id: string;
          url: string;
          alt?: string;
          width?: number;
          height?: number;
        };
      };
      excerpt?: string;
      publishedDate?: string;
    };
  }>;
}

const HighlightGridBlock: React.FC<HighlightGridBlockProps> = ({
  headline,
  highlights,
}) => {
  const [selectedHighlight, setSelectedHighlight] = useState<
    HighlightGridBlockProps['highlights'][0]['value'] | null
  >(null);

  if (!highlights || highlights.length === 0) return null;

  const handleShowcaseClick = (
    highlightData: HighlightGridBlockProps['highlights'][0]['value']
  ) => {
    setSelectedHighlight(highlightData);
  };

  const handleClose = () => {
    setSelectedHighlight(null);
  };

  return (
    <div className="mt-8 relative">
      <DevIndicator componentName="HighlightGridBlock" />

      <div className="pb-32">
        <hr className="mx-2 my-2" />
        <div className="absolute left-1/2 top-2 bottom-2 w-px bg-text transform -translate-x-1/2"></div>
        {/* Headline */}
        <h2 className="text-center font-mono uppercase py-0.5 my-32 relative bg-bg">
          {headline}
        </h2>

        {/* Highlight Grid */}
        <div
          className="flex gap-2 justify-center bg-bg pt-2 pb-1 relative overflow-x-auto scrollbar-none scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          }}
        >
          <div className="basis-[1px] shrink-0 h-4"></div>
          {highlights.map(highlight => {
            // Extract the actual highlight data from the relationship structure
            const highlightData = highlight.value;

            // Get image from either showcase (featuredImage) or article (heroAsset.image)
            const image =
              highlightData?.featuredImage ||
              (highlightData?.heroAsset?.type === 'image'
                ? highlightData.heroAsset.image
                : null);

            if (!highlightData || !image) {
              return null;
            }

            return (
              <button
                key={highlightData.id}
                onClick={() => handleShowcaseClick(highlightData)}
                className="basis-64 grow shrink-0 text-left w-full max-w-80"
                style={{ scrollSnapAlign: 'center' }}
              >
                <div className="relative">
                  {/* Image */}
                  <div className="relative aspect-[4/6] overflow-hidden">
                    <Image
                      src={image.url}
                      alt={
                        image.alt || highlightData.title || 'Highlight image'
                      }
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="pt-1 leading-4">
                    <h3 className="uppercase">{highlightData.title}</h3>
                  </div>
                </div>
              </button>
            );
          })}
          <div className="basis-[1px] shrink-0 h-4"></div>
        </div>
      </div>
      <hr className="mx-2 my-2" />

      {/* Showcase Overlay */}
      <AnimatePresence>
        {selectedHighlight && (
          <HighlightOverlay
            showcase={selectedHighlight}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HighlightGridBlock;
