'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { DevIndicator } from '../DevIndicator';
import HighlightOverlay from './HighlightOverlay';

interface HighlightGridBlockProps {
  headline: string;
  highlights: Array<{
    relationTo: string;
    value: {
      id: string;
      title: string;
      slug: string;
      featuredImage?: {
        id: string;
        url: string;
        alt?: string;
        width?: number;
        height?: number;
      };
      client?: string;
      year?: number;
    };
  }>;
}

const HighlightGridBlock: React.FC<HighlightGridBlockProps> = ({
  headline,
  highlights,
}) => {
  const pathname = usePathname();
  const [selectedHighlight, setSelectedHighlight] = useState<
    HighlightGridBlockProps['highlights'][0]['value'] | null
  >(null);

  // Debug logging to see what data we're getting
  console.log('HighlightGridBlock - headline:', headline);
  console.log('HighlightGridBlock - highlights:', highlights);
  console.log('HighlightGridBlock - highlights length:', highlights?.length);

  return (
    <div className="mt-8 relative">
      <DevIndicator componentName="HighlightGridBlock" />

      <div className="">
        <hr className="mx-2 my-2" />
        {/* Headline */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {headline}
          </h2>
          <div className="w-24 h-px bg-white mx-auto"></div>
        </div>

        {/* Highlight Grid */}
        {!highlights || highlights.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No highlights available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map(highlight => {
              // Extract the actual highlight data from the relationship structure
              const highlightData = highlight.value;

              // Debug each highlight
              console.log('Highlight item:', highlight);
              console.log('Highlight data:', highlightData);
              console.log(
                'Highlight featuredImage:',
                highlightData?.featuredImage
              );

              // Check if highlight has required data
              if (!highlightData || !highlightData.featuredImage) {
                console.log('Skipping highlight - missing data:', {
                  highlightData,
                  featuredImage: highlightData?.featuredImage,
                });
                return null;
              }

              return (
                <button
                  key={highlightData.id}
                  onClick={() => setSelectedHighlight(highlightData)}
                  className="group block text-left w-full"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-900">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {highlightData.featuredImage?.url ? (
                        <Image
                          src={highlightData.featuredImage.url}
                          alt={
                            highlightData.featuredImage.alt ||
                            highlightData.title ||
                            'Highlight image'
                          }
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                        {highlightData.title}
                      </h3>

                      {(highlightData.client || highlightData.year) && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          {highlightData.client && (
                            <span>{highlightData.client}</span>
                          )}
                          {highlightData.client && highlightData.year && (
                            <span>•</span>
                          )}
                          {highlightData.year && (
                            <span>{highlightData.year}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Highlight Overlay */}
        {selectedHighlight && (
          <HighlightOverlay
            highlight={selectedHighlight}
            currentPath={pathname}
            onClose={() => setSelectedHighlight(null)}
          />
        )}
        <hr className="mx-2 my-2" />
      </div>
    </div>
  );
};

export default HighlightGridBlock;
