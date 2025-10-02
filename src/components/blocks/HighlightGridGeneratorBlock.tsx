'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DevIndicator } from '@/components/dev/DevIndicator';
import { fixImageUrl } from '@/utils/imageUrl';
import HighlightOverlay from '@/components/blocks/HighlightOverlay';
import { AnimatePresence } from 'framer-motion';

interface HighlightGridGeneratorProps {
  headline: string;
  contentTypes: string[];
  filterTags?: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
  maxItems: number;
  sortBy: string;
  variant: 'withImages' | 'textOnly';
  // Server-side populated content
  generatedContent: {
    articles: any[];
    showcases: any[];
    totalCount: number;
  };
}

export default function HighlightGridGeneratorBlock({
  headline,
  contentTypes,
  filterTags,
  maxItems,
  sortBy,
  variant,
  generatedContent,
}: HighlightGridGeneratorProps) {
  const [selectedHighlight, setSelectedHighlight] = useState<any>(null);

  const { articles, showcases } = generatedContent;

  // Combine and sort content for mixed display
  const allContent = [
    ...articles.map(item => ({ ...item, _contentType: 'article' as const })),
    ...showcases.map(item => ({ ...item, _contentType: 'showcase' as const })),
  ];

  // Sort combined content if we have multiple types
  if (contentTypes.length > 1) {
    allContent.sort((a, b) => {
      if (sortBy === '-publishedDate' || sortBy === '-createdAt') {
        const dateA = a.publishedDate || a.createdAt;
        const dateB = b.publishedDate || b.createdAt;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      } else if (sortBy === 'publishedDate' || sortBy === 'createdAt') {
        const dateA = a.publishedDate || a.createdAt;
        const dateB = b.publishedDate || b.createdAt;
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === '-title') {
        return b.title.localeCompare(a.title);
      } else if (sortBy === 'year' || sortBy === '-year') {
        const yearA = a.year || 0;
        const yearB = b.year || 0;
        return sortBy === 'year' ? yearA - yearB : yearB - yearA;
      }
      return 0;
    });
  }

  // Limit results
  const displayContent = allContent.slice(0, maxItems);

  const handleHighlightClick = (highlightData: any) => {
    setSelectedHighlight(highlightData);
  };

  const handleClose = () => {
    setSelectedHighlight(null);
  };

  if (displayContent.length === 0) {
    return null;
  }

  return (
    <div className="my-8 relative">
      <DevIndicator componentName="HighlightGridGeneratorBlock" />

      <div className="pb-32 relative">
        <hr className="mx-2 my-2" />
        <div className="absolute left-1/2 top-2 bottom-2 w-px bg-text transform -translate-x-1/2"></div>

        {/* Headline */}
        <h2 className="text-center font-mono uppercase py-0.5 my-32 relative bg-bg">
          {headline}
        </h2>

        {/* Content Grid */}
        {variant === 'withImages' ? (
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
            {displayContent.map((item, index) => {
              // Get image from either showcase (featuredImage) or article (featuredImage)
              const image = item.featuredImage;

              if (!item || !image) {
                return null;
              }

              return (
                <button
                  key={`${item._contentType}-${item.id}-${index}`}
                  onClick={() => handleHighlightClick(item)}
                  className="basis-64 grow shrink-0 text-left w-full max-w-80"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <div className="relative">
                    {/* Image */}
                    <div className="relative aspect-[4/6] overflow-hidden">
                      <Image
                        src={fixImageUrl(image.url)}
                        alt={image.alt || item.title || 'Content image'}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="pt-1 leading-4">
                      <h3 className="uppercase">{item.title}</h3>
                      {item._contentType === 'showcase' && item.year && (
                        <p className="text-sm text-muted-foreground">
                          {item.year}
                        </p>
                      )}
                      {item._contentType === 'article' && item.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            <div className="basis-[1px] shrink-0 h-4"></div>
          </div>
        ) : (
          /* Text Only Variant */
          <div className="flex flex-col gap-4 items-center bg-bg pt-2 pb-1">
            {displayContent.map((item, index) => {
              if (!item) {
                return null;
              }

              return (
                <button
                  key={`${item._contentType}-${item.id}-${index}`}
                  onClick={() => handleHighlightClick(item)}
                  className="w-full max-w-2xl text-left p-4 border border-text rounded-sm hover:bg-accent transition-colors"
                >
                  <div className="space-y-2">
                    <h3 className="uppercase text-lg font-mono">
                      {item.title}
                    </h3>
                    {item._contentType === 'showcase' && item.year && (
                      <p className="text-sm text-muted-foreground">
                        Year: {item.year}
                      </p>
                    )}
                    {item._contentType === 'article' && item.excerpt && (
                      <p className="text-sm text-muted-foreground">
                        {item.excerpt}
                      </p>
                    )}
                    {item._contentType === 'article' && item.author && (
                      <p className="text-xs text-muted-foreground">
                        By{' '}
                        {typeof item.author === 'object'
                          ? item.author.firstName + ' ' + item.author.lastName
                          : item.author}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
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
}
