'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { DevIndicator } from '../DevIndicator';

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
  const router = useRouter();

  if (!highlights || highlights.length === 0) return null;

  const handleShowcaseClick = (showcaseSlug: string) => {
    // Navigate to the showcase URL
    router.push(`${pathname}?showcase=${showcaseSlug}`);
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
        <div className="flex gap-2 justify-center bg-bg py-2 relative">
          {highlights.map(highlight => {
            // Extract the actual highlight data from the relationship structure
            const highlightData = highlight.value;
            if (!highlightData || !highlightData.featuredImage) {
              return null;
            }

            return (
              <button
                key={highlightData.id}
                onClick={() => handleShowcaseClick(highlightData.slug)}
                className="group text-left w-full"
              >
                <div className="relative">
                  {/* Image */}
                  <div className="relative aspect-[4/6] max-w-64 overflow-hidden">
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
                  </div>

                  {/* Content */}
                  <div className="py-1">
                    <h3 className="uppercase">{highlightData.title}</h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HighlightGridBlock;
