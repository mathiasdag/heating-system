'use client';

import React, { useState } from 'react';
import { DevIndicator } from '@/components/dev/DevIndicator';
import HighlightOverlay from '@/components/blocks/HighlightOverlay';
import { AnimatePresence } from 'framer-motion';
import { HorizontalScrollContainer } from '@/components/ui/HorizontalScrollContainer';
import {
  ShowcaseCard,
  ArticleCardWithImage,
  ArticleCardWithoutImage,
  findImageInAssets,
  type ContentItem,
} from './index';

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
  // Server-side populated content
  generatedContent: {
    articles: Record<string, unknown>[];
    showcases: Record<string, unknown>[];
    totalCount: number;
  };
}

export default function HighlightGridGeneratorBlock({
  headline,
  contentTypes,
  maxItems,
  sortBy,
  generatedContent,
}: HighlightGridGeneratorProps) {
  const [selectedHighlight, setSelectedHighlight] =
    useState<ContentItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const { articles, showcases } = generatedContent;

  // Combine and sort content for mixed display
  const allContent: ContentItem[] = [
    ...articles.map(
      item => ({ ...item, _contentType: 'article' as const }) as ContentItem
    ),
    ...showcases.map(
      item => ({ ...item, _contentType: 'showcase' as const }) as ContentItem
    ),
  ];

  // Sort combined content if we have multiple types
  if (contentTypes.length > 1) {
    allContent.sort((a, b) => {
      if (sortBy === '-publishedDate' || sortBy === '-createdAt') {
        const dateA = a.publishedDate || a.createdAt;
        const dateB = b.publishedDate || b.createdAt;
        if (!dateA || !dateB) return 0;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      } else if (sortBy === 'publishedDate' || sortBy === 'createdAt') {
        const dateA = a.publishedDate || a.createdAt;
        const dateB = b.publishedDate || b.createdAt;
        if (!dateA || !dateB) return 0;
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

  const handleHighlightClick = (highlightData: ContentItem) => {
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

      <div className="relative">
        <hr className="mx-2 my-2" />
        <div className="absolute left-1/2 top-2 bottom-2 w-px bg-text transform -translate-x-1/2"></div>

        {/* Headline */}
        <h2 className="text-center font-mono uppercase py-0.5 mb-32 mt-36 relative bg-bg">
          {headline}
        </h2>

        {/* Content Grid */}
        <HorizontalScrollContainer
          className="bg-bg mb-36 relative gap-2 pt-2 pb-2"
          enableOverflowDetection={false}
          leftSpacer="1px"
          rightSpacer="1px"
        >
          {displayContent.map((item, index) => {
            if (!item) {
              return null;
            }

            const cardId = `${item._contentType}-${item.id}-${index}`;
            const isHovered = hoveredCard === cardId;

            // Determine if item has an image
            let hasImage = false;
            if (item.featuredImage) {
              hasImage = true;
            } else if (item._contentType === 'showcase' && item.assets) {
              hasImage = !!findImageInAssets(item.assets);
            }

            // Render appropriate card component
            if (item._contentType === 'showcase' && hasImage) {
              return (
                <ShowcaseCard
                  key={cardId}
                  item={item}
                  index={index}
                  isHovered={isHovered}
                  onHoverStart={() => setHoveredCard(cardId)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => handleHighlightClick(item)}
                />
              );
            } else if (item._contentType === 'article' && hasImage) {
              return (
                <ArticleCardWithImage
                  key={cardId}
                  item={item}
                  index={index}
                  isHovered={isHovered}
                  onHoverStart={() => setHoveredCard(cardId)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => handleHighlightClick(item)}
                />
              );
            } else if (item._contentType === 'article' && !hasImage) {
              return (
                <ArticleCardWithoutImage
                  key={cardId}
                  item={item}
                  index={index}
                  onClick={() => handleHighlightClick(item)}
                />
              );
            }

            // Fallback for showcases without images (shouldn't happen)
            return null;
          })}
        </HorizontalScrollContainer>
        <hr className="mx-2 my-2" />
      </div>

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
